(() => {
  var e = [
      ,
      (e) => {
        "use strict";
        let t;
        function a() {
          return (
            t ||
            (console.error(
              "The `provider` object has not been set, please do so by calling the `init` method.",
            ),
            null)
          );
        }
        const n = {
          init: function (e, a) {
            return (t = e), this.add(a);
          },
          _getValue: function (e, a) {
            let n;
            return (
              "function" == typeof a
                ? ((n = a(t)),
                  n ||
                    console.warn(
                      "The function for key " + e + " returned a falsy value: ",
                      n,
                    ))
                : "string" == typeof a
                  ? ((n = t.get(a)),
                    n ||
                      console.warn(
                        "The provider `get` invocation for the key " +
                          e +
                          " returned a falsy value: ",
                        n,
                      ))
                  : "object" == typeof a && (n = a),
              n
            );
          },
          add: function (e) {
            e = e || {};
            const t = [],
              a = this;
            return (
              Object.keys(e).forEach(function (n) {
                const s = e[n],
                  l = a._getValue(n, s);
                l && l.then
                  ? (l.then(function (e) {
                      e ||
                        console.warn(
                          "The promise for the key " +
                            n +
                            " resolved with a falsy value: ",
                          e,
                        ),
                        a._addValue(n, e);
                    }),
                    t.push(l))
                  : a._addValue(n, l);
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
              a()
            );
          },
          getProvider: function () {
            return a();
          },
        };
        e.exports = n;
      },
      (e, t, a) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n,
          s = (n = a(1)) && n.__esModule ? n : { default: n };
        class l {
          constructor() {
            const e = s.default.getProvider();
            this.tra = e
              .get("rcp-fe-lol-l10n")
              .tra()
              .overlay("/fe/lol-l10n/trans.json")
              .overlay("/fe/lol-match-history/trans.json");
            const t = a(3);
            this.matchSummaryApi = t(e, this.tra);
            const n = a(42);
            this.matchDetailsApi = n(e, this.tra);
          }
          displayMatchSummary(e) {
            this.tra.ready().then(() => {
              this.matchSummaryApi.displayMatchSummary(e);
            });
          }
          hideMatchSummary(e) {
            this.matchSummaryApi.hideMatchSummary(e);
          }
          displayMatchDetails(e) {
            this.matchDetailsApi.displayMatchDetails(e);
          }
          hideMatchDetails() {
            this.matchDetailsApi.hideMatchDetails();
          }
        }
        t.default = () => new l();
      },
      (e, t, a) => {
        "use strict";
        var n,
          s = (n = a(41)) && n.__esModule ? n : { default: n },
          l = a(1);
        let i;
        class o {
          constructor(e, t) {
            const a = (0, s.default)(l.Ember, t);
            (this._tra = t), (this._traService = a), (this._provider = e);
          }
          displayMatchSummary(e = {}) {
            l.Telemetry.startTracingEvent("profile-match-history-rendered"),
              new Promise((e) => {
                Promise.resolve()
                  .then(
                    (() => {
                      e(a(4));
                    }).bind(null, a),
                  )
                  .catch(a.oe);
              }).then((t) => {
                const a = !(!e || !e.summonerId) && e.summonerId;
                t(this._provider, this._traService, a, e.rootElement).then(
                  (t) => (e.matchHistorySection.component = t),
                );
              });
          }
          hideMatchSummary(e = {}) {
            e.matchHistorySection.component &&
              e.rootElement &&
              (e.rootElement.removeChild(
                e.matchHistorySection.component.domNode,
              ),
              e.matchHistorySection.component.componentPromise.then((e) =>
                e.app.destroy(),
              ),
              (e.matchHistorySection.component = null));
          }
        }
        e.exports = function (e, t) {
          return void 0 === i && (i = new o(e, t)), i;
        };
      },
      (e, t, a) => {
        "use strict";
        var n = a(1),
          s = a(5);
        let l;
        e.exports = function (e, t, i, o) {
          return (
            n.logger.trace("Creating Match Summary Ember application"),
            (l = o),
            n.EmberApplicationFactory.setFactoryDefinition({
              name: "MatchSummaryRootComponent",
              tra: t,
              ComponentFactory: n.ComponentFactory,
              MatchSummaryRootComponent: a(7),
              MatchSummaryRecentlyPlayedChampionsComponent: a(20),
              MatchSummaryGeneralMatchSummaryComponent: a(25),
              TftMatchSummaryComponent: a(28),
              ChampRolePercentageTooltipComponent: a(31),
              ChampPortraitComponent: a(33),
              SpellItemIconComponent: a(35),
              RecentActivityComponent: a(37),
              MatchHistoryTooltipComponent: a(39).default,
              RenderTelemetrySenderComponent:
                n.SharedEmberComponents.RenderTelemetrySenderComponent,
              ChampPercentageDisplayHelper: a(23).champPercentageDisplayHelper,
              ChampionLevelHelper: a(23).championLevelHelper,
              RoleTitleHelper: a(23).roleTitleHelper,
            }),
            i
              ? n.logger.trace(`Updating match summary summoner ID to ${i}`)
              : (n.logger.trace("Updating match summary without summoner ID"),
                (i = !1)),
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
            }).then((e) => {
              const t = {
                  summonerId: i,
                  champions: e.champions,
                  championsByAlias: e.championsByAlias,
                  tftChampionsByAlias: e.tftChampionsByAlias,
                  tftTraitsById: e.tftTraitsById,
                  tftGameVariationsByAlias: e.tftGameVariationsByAlias,
                  items: e.items,
                  maps: e.maps,
                  queues: e.queues,
                  spells: e.spells,
                  tftItemsByName: e.tftItemsByName,
                  tftDefaultSet: e.tftDefaultSet,
                  tftSets: e.tftSets,
                },
                a = n.ComponentFactory.create("MatchSummaryRootComponent", t);
              return l.appendChild(a.domNode), a;
            })
          );
        };
      },
      (e, t, a) => {
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
                ).then((e) => this._indexEntities(e));
              },
              championsByAlias() {
                return this.retrieveData(
                  "api.gameData",
                  "/assets/v1/champion-summary.json",
                ).then((e) =>
                  e.reduce((e, t) => e.set(t.alias, t), n.Ember.Map.create()),
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
                    n.Ember.Map.create(),
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
                    n.Ember.Map.create(),
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
                    n.Ember.Map.create(),
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
                  () => n.Ember.Map.create(),
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
                  () => n.Ember.Map.create(),
                );
              },
              maps() {
                return this.retrieveData("api.maps", "/v2/maps").then((e) =>
                  n.Ember.A(e),
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
                n.Ember.isArray(e)
                  ? e.reduce((e, t) => e.set(t.nameId, t), n.Ember.Map.create())
                  : n.Ember.Map.create(),
              _indexEntities: (e) =>
                n.Ember.isArray(e)
                  ? e.reduce((e, t) => e.set(t.id, t), n.Ember.Map.create())
                  : n.Ember.Map.create(),
            },
          ),
          i = l.create();
        e.exports = {
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
      (e, t, a) => {
        "use strict";
        var n = a(1);
        const s = (0, n.EmberDataBinding)({
            Ember: n.Ember,
            websocket: (0, n.getProvider)().getSocket(),
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
              cosmetics: "/lol-cosmetics",
            },
            boundProperties: {
              matchHistoryWebURL: { api: "matchHistory", path: "/v1/web-url" },
              platformConfig: { api: "platformConfig", path: "/v1/namespaces" },
              session: { api: "login", path: "/v1/session" },
              myMasteries: {
                api: "collections",
                path: "/v1/inventories/{{session.puuid}}/champion-mastery",
              },
              mySummoner: {
                api: "summoner",
                path: "/v1/summoners/{{session.summonerId}}",
              },
              targetMasteries: {
                api: "collections",
                path: "/v1/inventories/{{puuid}}/champion-mastery",
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
            retrieveData(e, t, a) {
              return this.get(e)
                .get(t, a)
                .then((e) => (e ? Promise.resolve(e) : Promise.reject(void 0)));
            },
          });
        e.exports = { FixDataBindingMixin: l, DataBindingMixin: s };
      },
      (e, t, a) => {
        "use strict";
        var n = a(1),
          s = a(6),
          l = m(a(8)),
          i = m(a(9)),
          o = a(5),
          r = m(a(10)),
          c = a(14);
        function m(e) {
          return e && e.__esModule ? e : { default: e };
        }
        a(18);
        const { Component: p, RSVP: d, observer: h, computed: u } = n.Ember,
          g = "REMAKE",
          f = "EARLY_SURRENDER_LEAVER",
          y = "EARLY_SURRENDER_ACCOMPLICE",
          _ = "VICTORY";
        e.exports = p.extend(
          s.DataBindingMixin,
          s.FixDataBindingMixin,
          l.default,
          {
            classNames: ["match-history-main", "lol-match-history-bg"],
            layout: a(19),
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
            finalPointDrivenLevel: 5,
            acsAccountInfo: null,
            areAllGeneralMatchesLoaded: !1,
            allTftMatchesLoaded: u.gt("tftMatches.length", 0),
            isTftSelected: u.equal("activeMatchListName", "tft"),
            atLeastOneGeneralMatch: u.gt("gameCount", 0),
            atLeastOneMatchInCategory: u.gt("activeMatchList.length", 0),
            atLeastOneMatch: u.or(
              "atLeastOneGeneralMatch",
              "allTftMatchesLoaded",
            ),
            gameCount: u("generalMatches.[]", function () {
              const e = this.get("generalMatches");
              return e ? e.length : 0;
            }),
            maxChampMasteryLevel: u.readOnly(
              "platformConfig.ChampionMasteryConfig.MaxChampionLevel",
            ),
            isTftMatchHistoryEnabled: !0,
            isLoading: u.or("tftMatchesLoading", "generalMatchesLoading"),
            isThirdPersonView: u("summonerId", function () {
              return !!this.get("summonerId");
            }),
            fullMatchHistoryUrl: u(
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
            masteries: u(
              "isThirdPersonView",
              "targetMasteries",
              "myMasteries",
              function () {
                let e;
                return (
                  (e = this.get("isThirdPersonView")
                    ? this.get("targetMasteries")
                    : this.get("myMasteries")),
                  n.Lodash.keyBy(e, "championId")
                );
              },
            ),
            summoner: u(
              "isThirdPersonView",
              "targetSummoner",
              "mySummoner",
              function () {
                return this.get("isThirdPersonView")
                  ? this.get("targetSummoner")
                  : this.get("mySummoner");
              },
            ),
            activeMatchList: u(
              "activeMatchListName",
              "generalMatches.[]",
              "tftMatches.[]",
              function () {
                return "general" === this.get("activeMatchListName")
                  ? this.get("generalMatches")
                  : this.get("tftMatches");
              },
            ),
            championPortrait: u("participant.championId", function () {
              const e = this.get("participant.championId");
              return this.get("champions").get(e);
            }),
            thirdPersonAccessibleGameQueues: u.readOnly(
              "platformConfig.Replays.ThirdPersonAccessibleGameQueues",
            ),
            isTftReplaysEnabled: u.readOnly(
              "platformConfig.Replays.TftReplaysEnabled",
            ),
            puuid: u(
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
              const e = this.get("tftReplayButtons");
              if (0 === e.length) {
                const t = this.get("tftMatches");
                if (t.length > 0) {
                  const a = (
                    Boolean(this.get("thirdPersonAccessibleGameQueues"))
                      ? this.get("thirdPersonAccessibleGameQueues").split(",")
                      : []
                  ).map(function (e) {
                    return parseInt(e, 10);
                  });
                  this.$(".tft-player-history-accessory-game-action")
                    .toArray()
                    .forEach((s, l) => {
                      const i = t[l];
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
                        ? (this.$(s).html(o.domNode), e.push(o))
                        : n.logger.error(
                            "Unable to create replay button for match",
                            i,
                          );
                    });
                }
              }
            },
            _addGeneralReplaysButtons: function () {
              const e = this.get("replayButtons");
              if (!(e.length > 0))
                if (
                  n.Replays.isGeneralReplaysEnabled() &&
                  this.get("areAllGeneralMatchesLoaded") &&
                  this.get("atLeastOneMatch")
                ) {
                  const t = this.$(
                    ".player-history-accessory-game-action",
                  ).toArray();
                  if (t.length > 0) {
                    const a = this.get("allGeneralMatches"),
                      s = (
                        Boolean(this.get("thirdPersonAccessibleGameQueues"))
                          ? this.get("thirdPersonAccessibleGameQueues").split(
                              ",",
                            )
                          : []
                      ).map(function (e) {
                        return parseInt(e, 10);
                      });
                    t.forEach((t, l) => {
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
                        ? (this.$(t).html(o.domNode), e.push(o))
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
              n.Lodash.forEach(this.get("replayButtons"), (e) => e.destroy()),
                (this.get("replayButtons").length = 0),
                n.Lodash.forEach(this.get("tftReplayButtons"), (e) =>
                  e.destroy(),
                ),
                (this.get("tftReplayButtons").length = 0);
            },
            actions: {
              clickWebMatchHistory: function () {
                return c.SFX.genericClickSm.play(), !0;
              },
              setMatchListSource(e) {
                this.set("activeMatchListName", e), this.destroyReplayButtons();
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
                  .then((e) => {
                    null !== e && this.set("isTftMatchHistoryEnabled", e);
                    const t = this.get("puuid");
                    this.get("isTftMatchHistoryEnabled") && t
                      ? this._loadTftPlayerData(t)
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
              ).observe("/v1/state", this, (e) => {
                e &&
                  "BeforeEndOfGame" === e.state &&
                  (this.get("generalMatchesLoading") ||
                    this.get("isThirdPersonView") ||
                    this._loadCurrentPlayerData(
                      this.get("summoner.summonerId"),
                      !0,
                    ));
              });
            }),
            calculateMatchResult: function (e) {
              const t = n.Lodash.get(e, "participant.win"),
                a = n.Lodash.get(
                  e,
                  "participant.stats.gameEndedInEarlySurrender",
                ),
                s = n.Lodash.get(e, "participant.stats.causedEarlySurrender"),
                l = n.Lodash.get(
                  e,
                  "participant.stats.earlySurrenderAccomplice",
                ),
                i = n.Lodash.get(e, "participant.stats.teamEarlySurrendered");
              return a && !s && !l
                ? g
                : a && i && s
                  ? f
                  : a && l
                    ? y
                    : t
                      ? _
                      : "DEFEAT";
            },
            calculateTitleClass: function (e) {
              const t = "defeat";
              return e === g
                ? "earlySurrender"
                : e === f || e === y
                  ? t
                  : e === _
                    ? "victory"
                    : t;
            },
            calculateMatchResultTitle: function (e) {
              return e === g
                ? this.get("tra.MATCH_HISTORY_MATCH_RESULT_REMAKE")
                : e === f
                  ? this.get("tra.MATCH_HISTORY_MATCH_RESULT_REMAKE_LEAVER")
                  : e === y
                    ? this.get(
                        "tra.MATCH_HISTORY_MATCH_RESULT_REMAKE_RESTRICTED",
                      )
                    : e === _
                      ? this.get("tra.MATCH_HISTORY_MATCH_RESULT_VICTORY")
                      : this.get("tra.MATCH_HISTORY_MATCH_RESULT_DEFEAT");
            },
            _formatChampMasteryIpXpDescription(e) {
              const t = [];
              return (
                e.champMastery && t.push(e.champMastery),
                e.ipDelta &&
                  t.push(
                    e.ipDelta + " " + this.get("tra.postgame_progress_ip"),
                  ),
                e.xpDelta &&
                  t.push(
                    e.xpDelta + " " + this.get("tra.postgame_progress_xp"),
                  ),
                t.length > 0 ? t.join(" / ") : null
              );
            },
            _enrichSummary(e, t, a, s) {
              const l = this.calculateMatchResult(e);
              let r = "";
              if (e.gameType === o.CUSTOM_GAME_TYPE)
                r = this.get("tra.MATCH_HISTORY_QUEUE_MODE_CUSTOM");
              else {
                const t = a.get(n.Lodash.get(e, "queueId"));
                (r = n.Lodash.get(t, "detailedDescription")),
                  r || (r = n.Lodash.get(t, "description"));
              }
              (e.titleInfo = {
                title: this.calculateMatchResultTitle(l),
                titleClass: this.calculateTitleClass(l),
                subTitle: r,
              }),
                (e.additionalInfo = {
                  mapName: n.Lodash.get(t.findBy("id", e.mapId), "name"),
                  duration: n.l10nDuration.formatSeconds(e.gameDuration),
                  creationTime: i.default.formatDate(
                    e.gameCreation,
                    this.get("tra.MATCH_DETAILS_GAME_CREATION_DATE_FORMAT"),
                    this.get("tra"),
                  ),
                });
              const c = s.get(e.gameId);
              if (c && c.platformDelta) {
                n.Lodash.assign(e.additionalInfo, {
                  ipDelta: c.platformDelta.ipDelta,
                }),
                  n.Lodash.assign(e.additionalInfo, {
                    xpDelta: c.platformDelta.xpDelta,
                  }),
                  c.champMastery &&
                    n.Lodash.assign(e.additionalInfo, {
                      champMastery: c.champMastery.grade,
                    });
                const t = this._formatChampMasteryIpXpDescription(
                  e.additionalInfo,
                );
                n.Lodash.assign(e.additionalInfo, { champMasteryIpXpDesc: t });
              }
              return e;
            },
            _loadCurrentPlayerData(e, t = !1) {
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
                .then((e) => {
                  this.get("isDestroyed") ||
                    (t ||
                    "fulfilled" === e.matchListData.state ||
                    "fulfilled" === e.deltas.state
                      ? "fulfilled" === e.deltas.state &&
                        this._updateDeltas(e.deltas.value)
                      : 404 === e.matchListData.reason.status ||
                          404 === e.deltas.reason.status
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
                    this._updateMatches(e.matchListData.value),
                    e.matchListData.value &&
                      e.matchListData.value.platformId &&
                      this.set("acsAccountInfo", {
                        platformId: e.matchListData.value.platformId,
                        accountId: e.matchListData.value.accountId,
                      }),
                    this._updateMatchTypeSubnavigation(),
                    this.set("generalMatchesLoading", !1));
                });
            },
            _loadTftPlayerData(e, t = !1) {
              const a = this.get("tftDefaultSet"),
                n = a
                  ? `/v1/products/tft/${e}/matches?begin=0&count=20&tag=${a.SetCoreName}`
                  : `/v1/products/tft/${e}/matches?begin=0&count=20`;
              return d
                .hashSettled({
                  tftMatchListData: this.retrieveData("api.matchHistory", n, {
                    skipCache: !0,
                  }),
                })
                .then((e) => {
                  if (this.get("isDestroyed")) return;
                  if ("fulfilled" !== e.tftMatchListData.state)
                    return (
                      t ||
                        404 === e.tftMatchListData.reason.status ||
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
                    e.tftMatchListData.value.games,
                  );
                  this.set("tftMatches", a), this.set("tftMatchesLoading", !1);
                });
            },
            _enrichTftGames(e) {
              return (
                n.Lodash.forEach(e, (e) => {
                  e &&
                    e.json &&
                    e.json.participants &&
                    (this._enrichGameVariation(e),
                    n.Lodash.forEach(e.json.participants, (t) => {
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
                a = this.get("tftItemsByName"),
                s = this.get("championsByAlias");
              n.Lodash.forEach(e.units, (e) => {
                let l = t.get(e.character_id.toLowerCase());
                if (l)
                  l.character_record
                    ? ((e.iconPath = l.character_record.squareIconPath),
                      (e.championName = l.character_record.display_name))
                    : ((e.iconPath = l.squareIconPath),
                      (e.championName = l.display_name));
                else {
                  const t = e.name.replace("TFT_", "").replace("TFT2_", "");
                  (l = s.get(t)),
                    l
                      ? ((e.iconPath = l.squarePortraitPath),
                        (e.championName = l.name))
                      : n.logger.trace("Unknown champion: " + e);
                }
                n.Lodash.forEach(e.itemNames, (t) => {
                  const s = a.get(t);
                  s &&
                    (e.equippedItems || (e.equippedItems = n.Ember.A([])),
                    e.equippedItems.pushObject(s));
                });
              }),
                e.units.sort((e, t) =>
                  e.tier > t.tier
                    ? -1
                    : e.tier < t.tier
                      ? 1
                      : e.itemNames &&
                          (!t.itemNames ||
                            e.itemNames.length > t.itemNames.length)
                        ? -1
                        : t.itemNames &&
                            (!e.itemNames ||
                              e.itemNames.length < t.itemNames.length)
                          ? 1
                          : e.rarity > t.rarity
                            ? -1
                            : e.rarity < t.rarity
                              ? 1
                              : e.name.localeCompare(t.name),
                );
            },
            _enrichTraits(e, t) {
              const a = this.get("tftTraitsById");
              "object" == typeof t.traits &&
                t.traits.length &&
                (n.Lodash.forEach(t.traits, (t) => {
                  if ("object" == typeof t) {
                    const n = a.get(t.name.toLowerCase());
                    n &&
                      ((t.name = n.display_name), (t.iconPath = n.icon_path)),
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
              const a = t.get(e.json.game_variation.toLowerCase());
              a &&
                ((e.json.gameVariation = {}),
                (e.json.gameVariation.displayName =
                  a.game_variation_display_name),
                (e.json.gameVariation.iconPath = a.icon_path),
                (e.json.gameVariation.description =
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
                  (e) => {
                    this._updateMatches(e.matchListData),
                      this.set("acsAccountInfo", {
                        platformId: e.matchListData.platformId,
                        accountId: e.matchListData.accountId,
                      }),
                      this._updateMatchTypeSubnavigation(),
                      this.set("generalMatchesLoading", !1);
                  },
                  (e) => {
                    n.logger.error(
                      `Could not load your friend data because of ${JSON.stringify(
                        e,
                      )}`,
                    ),
                      404 !== e.status
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
            _updateDeltas(e) {
              const t = n.Lodash.get(e, "deltas", []).reduce(
                (e, t) => e.set(t.gameId, t),
                new Map(),
              );
              this.set("deltas", t),
                n.logger.trace(`Setting deltas to ${JSON.stringify(t)}`);
            },
            _updateMatches(e) {
              const t = this.get("maps"),
                a = this.get("queues"),
                s = this.get("deltas"),
                l = n.Lodash.get(e, "games.games", []),
                i = r.default
                  .create({ games: l })
                  .get("matchSummaries")
                  .map((e) => this._enrichSummary(e, t, a, s));
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
              this.get("allGeneralMatches").forEach((e) => {
                const { goldEarned: t } = e.participant,
                  a = this.get("tra.metadata.locale.id");
                e.participant.goldEarnedDisplay = i.default.formatGold(t, a);
              });
            },
          },
        );
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        e.exports = n.Ember.Mixin.create({
          ModalManager: (0, n.getProvider)()
            .get("rcp-fe-lol-uikit")
            .getModalManager(),
          showModal: function (e) {
            const t = this.get("ModalManager").add(e);
            return (
              n.Ember.get(t, "data.onOk") && t.okPromise
                ? t.okPromise.then(e.data.onOk)
                : t.acceptPromise &&
                  t.acceptPromise
                    .then(() => {
                      n.Ember.get(t, "data.onAccept") && t.data.onAccept();
                    })
                    .catch(() => {
                      n.Ember.get(t, "data.onDecline") && t.data.onDecline();
                    }),
              t
            );
          },
          removeModal: function (e) {
            this.get("ModalManager").remove(e);
          },
        });
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = {
          formatGold(e, t) {
            const a = t ? t.replace("_", "-") : "en-US",
              n = "ar-AE" === a ? "en-US" : a;
            return e.toLocaleString(n);
          },
          formatDate: (e, t, a) => a.moment(new Date(e)).format(t),
        };
        t.default = a;
      },
      (e, t, a) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n,
          s = a(1),
          l = (n = a(11)) && n.__esModule ? n : { default: n };
        var i = s.Ember.Object.extend({
          matchSummaries: s.Ember.A(),
          games: s.Ember.A(),
          init() {
            this._super(this, arguments);
            const e = this.get("games").map((e) => new l.default(e)),
              t = s.Lodash.orderBy(e, ["gameCreation"], ["desc"]);
            this.set("matchSummaries", s.Ember.A(t));
          },
        });
        t.default = i;
      },
      (e, t, a) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n,
          s = a(1),
          l = (n = a(12)) && n.__esModule ? n : { default: n };
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
            const e = arguments[0];
            this.set("gameId", e.gameId),
              this.set("gameCreation", e.gameCreation),
              this.set("gameDuration", e.gameDuration),
              this.set("queueId", e.queueId),
              this.set("mapId", e.mapId),
              this.set("seasonId", e.seasonId),
              this.set("gameVersion", e.gameVersion),
              this.set("gameMode", e.gameMode),
              this.set("gameType", e.gameType);
            const t = new l.default(
              e.participants[0],
              e.participantIdentities[0],
            );
            this.set("participant", t);
          },
        });
        t.default = i;
      },
      (e, t, a) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = a(1);
        const s = a(13);
        var l = n.Ember.Object.extend({
          spellIds: n.Ember.computed("spell1Id", "spell2Id", function () {
            const e = [];
            return (
              n.Lodash.range(1, 3).forEach((t) => {
                e.push(this.get("spell" + t + "Id"));
              }),
              n.Ember.A(e)
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
              const e = [];
              return (
                n.Lodash.range(0, 7).forEach((t) => {
                  e.push(this.get("item" + t));
                }),
                n.Ember.A(e)
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
              const [e, t] = arguments;
              this.set("puuid", e.puuid),
                this.set("participantId", e.participantId),
                this.set("teamId", e.teamId),
                this.set("championId", e.championId),
                this.set("spell1Id", e.spell1Id),
                this.set("spell2Id", e.spell2Id),
                this.set(
                  "highestAchievedSeasontier",
                  e.highestAchievedSeasontier,
                ),
                this.set("player", t.player);
              const a = n.Lodash.defaults({}, e.stats, s);
              n.Lodash.assign(this, a);
            } else
              n.logger.warning(
                `Could not create Participant instance - invalid arguments: ${arguments}`,
              );
          },
        });
        t.default = l;
      },
      (e) => {
        "use strict";
        e.exports = JSON.parse(
          '{"kills":"0","deaths":"0","assists":"0","largestKillingSpree":"0","largestMultiKill":"0","firstBloodKill":"0","totalDamageDealtToChampions":"0","physicalDamageDealtToChampions":"0","magicDamageDealtToChampions":"0","trueDamageDealtToChampions":"0","physicalDamageDealt":"0","totalDamageDealt":"0","magicDamageDealt":"0","trueDamageDealt":"0","largestCriticalStrike":"0","totalHeal":"0","totalHealsOnTeammates":"0","totalDamageShieldedOnTeammates":"0","totalDamageTaken":"0","physicalDamageTaken":"0","magicalDamageTaken":"0","trueDamageTaken":"0","damageSelfMitigated":"0","damageDealtToObjectives":"0","damageDealtToTurrets":"0","visionScore":"0","timeCCingOthers":"0","wardsPlaced":"0","wardsKilled":"0","sightWardsBoughtInGame":"0","visionWardsBoughtInGame":"0","goldEarned":"0","goldSpent":"0","totalMinionsKilled":"0","neutralMinionsKilled":"0","neutralMinionsKilledTeamJungle":"0","neutralMinionsKilledEnemyJungle":"0"}',
        );
      },
      (e, t, a) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.SFX = void 0);
        const n = a(1).AudioPlugin.getChannel("sfx-ui");
        function s(e) {
          return n.createSound(e, { allowConcurrency: !1 });
        }
        const l = {
          genericClickSm: s(a(15)),
          gridClick: s(a(16)),
          gridHover: s(a(17)),
        };
        t.SFX = l;
      },
      (e, t, a) => {
        "use strict";
        e.exports = a.p + "sfx-uikit-generic-click-small.ogg";
      },
      (e, t, a) => {
        "use strict";
        e.exports = a.p + "sfx-uikit-grid-click.ogg";
      },
      (e, t, a) => {
        "use strict";
        e.exports = a.p + "sfx-uikit-grid-hover.ogg";
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "TcTDBkTC",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-summary-root-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-summary-root-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-summary-root-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","match-history"],["flush-element"],["text","\\n\\n"],["block",["if"],[["get",["isLoading"]]],null,13,12],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["append",["helper",["match-summary-recently-played-champions"],null,[["puuid","atLeastOneMatch","gameCount","areAllMatchesLoaded","champions","matches","masteries"],[["get",["puuid"]],["get",["atLeastOneGeneralMatch"]],["get",["gameCount"]],["get",["areAllGeneralMatchesLoaded"]],["get",["champions"]],["get",["allGeneralMatches"]],["get",["masteries"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["atLeastOneGeneralMatch"]]],null,0]],"locals":[]},{"statements":[["text","          "],["comment"," NO-OP "],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["comment"," no games for this player "],["text","\\n          "],["open-element","div",[]],["static-attr","class","match-history-wrapper loading-fade-in"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","match-history-no-games-header"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_HEADER"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","match-history-no-games-reason-header"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_REASON_HEADER"]],false],["close-element"],["text","\\n            "],["open-element","ul",[]],["static-attr","class","match-history-no-games-reason"],["flush-element"],["text","\\n              "],["open-element","li",[]],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_REASON_1"]],false],["close-element"],["text","\\n              "],["open-element","li",[]],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_REASON_2"]],false],["close-element"],["text","\\n              "],["open-element","li",[]],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_NO_GAMES_REASON_3"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["append",["helper",["match-summary-general-match-summary"],null,[["champions","match","spells","items"],[["get",["champions"]],["get",["match"]],["get",["spells"]],["get",["items"]]]]],false],["text","\\n"]],"locals":["match"]},{"statements":[["block",["each"],[["get",["activeMatchList"]]],[["key"],["gameId"]],4]],"locals":[]},{"statements":[["text","                  "],["append",["helper",["tft-match-summary"],null,[["puuid","tftSets","companions","champions","match","spells","items","queues"],[["get",["puuid"]],["get",["tftSets"]],["get",["companions"]],["get",["champions"]],["get",["match"]],["get",["spells"]],["get",["items"]],["get",["queues"]]]]],false],["text","\\n"]],"locals":["match"]},{"statements":[["block",["each"],[["get",["activeMatchList"]]],[["key"],["gameId"]],6]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","match-history-wrapper loading-fade-in"],["flush-element"],["text","\\n"],["text","            "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","match-history-list"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isTftSelected"]]],null,7,5],["text","            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","lol-uikit-navigation-item",[]],["dynamic-attr","active",["unknown",["matchListType","defaultActive"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"setMatchListSource",["get",["matchListType","id"]]],null],null],["flush-element"],["append",["unknown",["matchListType","title"]],false],["close-element"],["text","\\n"]],"locals":["matchListType"]},{"statements":[["text","          "],["open-element","lol-uikit-navigation-bar",[]],["static-attr","type","tabbed"],["static-attr","selectedIndex","0"],["flush-element"],["text","\\n"],["block",["each"],[["get",["matchListTypes"]]],null,9],["text","          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","match-history-left"],["flush-element"],["text","\\n\\n\\n        "],["open-element","div",[]],["static-attr","class","match-history-left-title"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_RECENT_GAMES_LABEL"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["isTftMatchHistoryEnabled"]]],null,10],["text","\\n"],["block",["if"],[["get",["atLeastOneMatchInCategory"]]],null,8,3],["text","      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-history-right"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isTftSelected"]]],null,2,1],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["render-telemetry-sender"],null,[["renderEventName"],["profile-match-history-rendered"]],11]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-history-left-title"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_RECENT_GAMES_LABEL"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-history-loading-icon-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-history-loading-icon"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        a(21);
        var s,
          l = a(22),
          i = (s = a(23)) && s.__esModule ? s : { default: s };
        e.exports = n.Ember.Component.extend({
          layout: a(24),
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
              const e = this.get("lowSpecModeSettings");
              return !Boolean(e && e.data && !0 === e.data.potatoModeEnabled);
            },
          ),
          champRoles: n.Ember.computed("matches", function () {
            const e = this.get("matches"),
              t = new Map();
            return (
              e.forEach((e) => {
                const { championId: a } = e.participant,
                  s = this.get("champions").get(a);
                s
                  ? t[s.roles[0]]
                    ? t[s.roles[0]]++
                    : (t[s.roles[0]] = 1)
                  : n.logger.error("Cannot find champ summary for id " + a);
              }),
              t
            );
          }),
          recentlyPlayedChamps: n.Ember.computed(
            "masteries",
            "matches",
            "champions",
            "areAllMatchesLoaded",
            "atLeastOneMatch",
            function () {
              const e = this.get("matches"),
                t = this.get("masteries"),
                a = this.get("champions"),
                s = n.Lodash.keyBy(t, "championId");
              if (e && 0 !== e.length) {
                const t = {},
                  l = [];
                n.Lodash.forEach(e, (e) => {
                  const { championId: a } = e.participant;
                  if (t[a]) t[a].count++;
                  else {
                    const e = { champId: a, count: 1 };
                    (t[a] = e), l.push(e);
                  }
                });
                const o = (0, n.Lodash)(l)
                  .orderBy(["count"], ["desc"])
                  .take(3)
                  .map((t) => {
                    n.logger.trace(`Enriching champ ${JSON.stringify(t)}`);
                    return n.Lodash.assign({}, a.get(t.champId), {
                      id: t.champId,
                      percentage: (100 * t.count) / e.length,
                      mastery: n.Lodash.get(s, t.champId, {
                        championId: t.champId,
                        championLevel: 0,
                        championPoints: 0,
                        championPointsSinceLastLevel: 0,
                        championPointsUntilNextLevel: 0,
                      }),
                    });
                  })
                  .value();
                if (o.length < 3) {
                  const e = o.length;
                  (o.length = 3), o.fill({}, e, 3);
                }
                return o.map((e) =>
                  e.mastery
                    ? {
                        ...e,
                        championName: e.name,
                        roleTitle: i.default.roleTitle([e, this.get("tra")]),
                        score: i.default.scoreDisplay([
                          e,
                          this.get("finalPointDrivenLevel"),
                          this.get("tra"),
                        ]),
                        masteryProgress: i.default.masteryProgress([e]),
                        masteryLevel: i.default.championLevel([e]),
                      }
                    : e,
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
              const e = this.get("matches");
              return e && e.length > 0
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
              const e = this.get("champRoleList"),
                t = this.get("champRoles"),
                a = this.get("gameCount"),
                s = this.$(".recent-activity-item").toArray();
              e.forEach((e, i) => {
                const o = s[i],
                  r = (0, l.recentActivityData)(e, t, a),
                  c = {
                    tra: this.get("tra"),
                    roleName: e,
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
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e) => {
        "use strict";
        function t(e, t = new Map()) {
          if (e && t) {
            const a = t[e];
            return a || 0;
          }
          return 0;
        }
        function a(e = 0, t = 0) {
          return t > 0 ? Math.round((100 * e) / t) : 0;
        }
        e.exports = {
          roleGamesCount: t,
          rolePercentage: a,
          recentActivityData: function (e, n, s) {
            const l = t(e, n);
            return { roleCount: l, champRolePercentage: a(l, s) };
          },
        };
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        const { Helper: s } = n.Ember;
        function l(e) {
          const [t, a, n] = e,
            { mastery: s } = t;
          return n && n.formatString && s
            ? s.championLevel < a
              ? n.formatString(
                  "MATCH_HISTORY_SUMMARY_RECENT_MASTERY_TOOLTIP_POINTS",
                  {
                    current: s.championPoints,
                    next: s.championPoints + s.championPointsUntilNextLevel,
                  },
                )
              : n.formatString(
                  "MATCH_HISTORY_SUMMARY_RECENT_MASTERY_TOOLTIP_POINTS_MAX",
                  { points: s.championPoints },
                )
            : "";
        }
        function i(e) {
          const [t] = e;
          if (t.mastery)
            return Math.round(
              (t.mastery.championPointsSinceLastLevel /
                (t.mastery.championPointsSinceLastLevel +
                  t.mastery.championPointsUntilNextLevel)) *
                100,
            );
        }
        function o(e) {
          const [t] = e;
          return t && t.percentage ? +t.percentage.toFixed(0) : null;
        }
        function r(e) {
          const [t] = e;
          if (t && t.mastery) {
            const e = t.mastery.championLevel;
            return e || 0;
          }
          return 0;
        }
        function c(e) {
          const [t, a] = e;
          if (t && t.roles) {
            const e = t.roles[0],
              n = t.mastery.championLevel;
            return n > 0 ? a.get(`champion_mastery_role_title_${e}_${n}`) : "";
          }
          return "";
        }
        e.exports = {
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
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "hi0IO1Uq",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-summary-recently-played-champions-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-summary-recently-played-champions-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-summary-recently-played-champions-component\\\\index.js\\" "],["text","\\n\\n"],["block",["if"],[["get",["fullMatchHistoryUrl"]]],null,7],["text","  "],["open-element","div",[]],["static-attr","class","match-history-right-box"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","right-box-title"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_RECENTLY_PLAYED_CHAMPS_LABEL"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","recent-champs-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["recentlyPlayedChamps"]]],null,6],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","recent-champ-notes"],["flush-element"],["append",["unknown",["recentlyPlayedChampsBottomLabel"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","match-history-right-box second-box"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","right-box-title"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_RECENT_ACTIVITIES_LABEL"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","recent-activity-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["champRoleList"]]],null,0],["text","    "],["close-element"],["text","\\n  "],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["helper",["recent-activity"],null,[["roleName","index","champRoleMap","gameCount"],[["get",["roleName"]],["get",["index"]],["get",["champRoles"]],["get",["gameCount"]]]]],false],["text","\\n"]],"locals":["roleName","index"]},{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","recent-champ-percent"],["flush-element"],["text","\\n                "],["open-element","span",[]],["static-attr","class","recent-champ-percent-number"],["flush-element"],["append",["helper",["champ-percentage-display"],[["get",["champ"]]],null],false],["close-element"],["text","%\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","lol-uikit-champion-mastery-tooltip",[]],["dynamic-attr","name",["unknown",["champ","championName"]],null],["dynamic-attr","title",["unknown",["champ","roleTitle"]],null],["dynamic-attr","score",["unknown",["champ","score"]],null],["flush-element"],["text","\\n                    "],["open-element","lol-uikit-radial-progress",[]],["static-attr","slot","lol-uikit-radial-progress"],["static-attr","type","blue"],["dynamic-attr","percent",["unknown",["champ","masteryProgress"]],null],["flush-element"],["text","\\n                      "],["open-element","div",[]],["static-attr","slot","top"],["static-attr","class","top"],["flush-element"],["open-element","h4",[]],["flush-element"],["append",["unknown",["champ","masteryLevel"]],false],["close-element"],["close-element"],["text","\\n                    "],["close-element"],["text","\\n                  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipConfig"],[["get",["tooltipConfig"]]]],2]],"locals":[]},{"statements":[["text","                    "],["open-element","span",[]],["static-attr","class","recent-champ-placeholder"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["champ","squarePortraitPath"]]]]],["static-attr","alt",""],["static-attr","class","recent-champ-img"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["flush-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["recent-champ-item recent-champ-",["get",["champIndex"]]]]],["flush-element"],["text","\\n            "],["open-element","lol-uikit-champion-thumbnail",[]],["flush-element"],["text","\\n              "],["open-element","lol-uikit-champion-mastery-banner",[]],["static-attr","slot","lol-uikit-champion-mastery-banner"],["dynamic-attr","level",["concat",[["helper",["champion-level"],[["get",["champ"]]],null]]]],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","thumbnail-square"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","recent-champ-portrait"],["flush-element"],["text","\\n"],["block",["if"],[["get",["champ","squarePortraitPath"]]],null,5,4],["text","                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","recent-champ-tooltip-anchor"],["flush-element"],["text","\\n"],["block",["if"],[["get",["champ","mastery"]]],null,3],["text","            "],["close-element"],["text","\\n"],["block",["if"],[["get",["champ","percentage"]]],null,1],["text","          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["champ","champIndex"]},{"statements":[["text","    "],["open-element","a",[]],["dynamic-attr","href",["concat",[["unknown",["fullMatchHistoryUrl"]]]]],["static-attr","target","_new"],["static-attr","class","full-match-history-btn"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"clickWebMatchHistory"],null],null],["flush-element"],["text","\\n      "],["append",["unknown",["tra","MATCH_HISTORY_SUMMARY_FULL_MATCH_HISTORY_LABEL"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        a(26);
        var s = a(14);
        e.exports = n.Ember.Component.extend({
          layout: a(27),
          classNames: ["match-summary-general-match-summary-component"],
          actions: {
            displayMatchDetails(e) {
              if (e && e.gameId) {
                s.SFX.gridClick.play();
                const { gameId: t } = e,
                  { participant: a } = e,
                  { additionalInfo: l } = e;
                this.get("isThirdPersonView")
                  ? n.MatchApi.displayMatchDetails({
                      gameId: t,
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
                      closeModalCallback: (e) => {
                        this.isDestroying ||
                          this.isDestroyed ||
                          this.element.dispatchEvent(
                            new Event(e, { bubbles: !0 }),
                          );
                      },
                    })
                  : n.MatchApi.displayMatchDetails({
                      gameId: t,
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
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "PfOXV5rF",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-summary-general-match-summary-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-summary-general-match-summary-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-summary-general-match-summary-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["player-history-object-wrapper ",["helper",["if"],[["get",["showHighLightClass"]],"high-spec-highlight"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"displayMatchDetails",["get",["match"]]],null],null],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","player-history-champion"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-champion-icon"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-history-champion-icon-border"],["flush-element"],["close-element"],["text","\\n      "],["append",["helper",["champ-portrait"],null,[["champions","id"],[["get",["champions"]],["get",["match","participant","championId"]]]]],false],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-history-champion-frame"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-lv"],["flush-element"],["append",["unknown",["match","participant","champLevel"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","player-history-result"],["flush-element"],["text","\\n\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["player-history-result-text ",["unknown",["match","titleInfo","titleClass"]]]]],["flush-element"],["append",["unknown",["match","titleInfo","title"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-mode"],["flush-element"],["append",["unknown",["match","titleInfo","subTitle"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-team-name"],["flush-element"],["append",["unknown",["clubName"]],false],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","player-history-spells"],["flush-element"],["text","\\n"],["block",["each"],[["get",["match","participant","spellIds"]]],null,3],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","player-history-items"],["flush-element"],["text","\\n    "],["open-element","ul",[]],["static-attr","class","player-history-items-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["match","participant","itemIds"]]],null,2],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-stats"],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","player-history-stats-kills"],["flush-element"],["text","\\n        "],["open-element","span",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["match","participant","mostKills"]],"player-history-stats-highest-value"],null]]]],["flush-element"],["append",["unknown",["match","participant","kills"]],false],["close-element"],["text","\\n        /"],["open-element","span",[]],["flush-element"],["append",["unknown",["match","participant","deaths"]],false],["close-element"],["text","\\n        /"],["open-element","span",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["match","participant","mostAssists"]],"player-history-stats-highest-value"],null]]]],["flush-element"],["append",["unknown",["match","participant","assists"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","span",[]],["dynamic-attr","class",["concat",["player-history-stats-minions ",["helper",["if"],[["get",["match","participant","mostMinionKills"]],"player-history-stats-highest-value"],null]]]],["flush-element"],["append",["unknown",["match","participant","minionsPlusNeutralMonstersCount"]],false],["close-element"],["text","\\n      "],["open-element","span",[]],["dynamic-attr","class",["concat",["player-history-stats-gold ",["helper",["if"],[["get",["match","participant","mostGoldEarned"]],"player-history-stats-highest-value"],null]]]],["flush-element"],["append",["unknown",["match","participant","goldEarnedDisplay"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["match","additionalInfo"]]],null,1],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["open-element","div",[]],["static-attr","class","player-history-ip"],["flush-element"],["append",["unknown",["match","additionalInfo","champMasteryIpXpDesc"]],false],["close-element"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","player-history-others"],["flush-element"],["text","\\n      "],["block",["if"],[["get",["match","additionalInfo","champMasteryIpXpDesc"]]],null,0],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-history-map"],["flush-element"],["append",["unknown",["match","additionalInfo","mapName"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-history-date"],["flush-element"],["append",["unknown",["match","additionalInfo","duration"]],false],["open-element","span",[]],["static-attr","class","inline-bullet"],["flush-element"],["text","•"],["close-element"],["append",["unknown",["match","additionalInfo","creationTime"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-accessory-game-action"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","li",[]],["static-attr","class","player-history-item"],["flush-element"],["text","\\n          "],["append",["helper",["spell-item-icon"],null,[["ref","id","class"],[["get",["items"]],["get",["itemId"]],"player-history-item-pic"]]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["itemId"]},{"statements":[["text","        "],["append",["helper",["spell-item-icon"],null,[["ref","id","class"],[["get",["spells"]],["get",["spellId"]],"player-history-spell-pic"]]],false],["text","\\n"]],"locals":["spellId"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        a(29);
        e.exports = n.Ember.Component.extend({
          layout: a(30),
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
              const e = this.get("queues").get(this.get("matchData.queue_id"));
              if (e) return e.description;
              return this.get("metadata.tags").includes("ranked")
                ? this.get("tra.MATCH_HISTORY_TFT_RANKED")
                : this.get("tra.MATCH_HISTORY_TFT_NORMAL");
            },
          ),
          units: n.Ember.computed.alias("currentPlayer.units"),
          unitPlaceholders: n.Ember.computed("units.length", function () {
            const e = this.get("units.length");
            if (e >= 10) return n.Ember.A();
            const t = 10 - e,
              a = n.Ember.A();
            for (let e = 0; e < t; e++) a.push(e);
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
              const e = this.get("matchData.tft_set_core_name"),
                t = this.get("tftSets").find((t) => t.SetCoreName === e) || {};
              return {
                name: t.SetAugmentName || "",
                icon: t.SetAugmentContainer || "",
              };
            },
          ),
          matchLength: n.Ember.computed(
            "matchData.game_length",
            "matchData.game_datetime",
            function () {
              const e = this.get("matchData.game_length"),
                t = ~~(e / 3600),
                a = ~~((e % 3600) / 60),
                n = ~~e % 60;
              let s = "";
              return (
                t > 0 && (s += t + ":" + (a < 10 ? "0" : "")),
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
              const e = this.get("companions"),
                t = this.get("currentPlayer.companion.content_ID");
              if (!e || !t) return null;
              let a;
              return (
                e.groups.every((e) =>
                  e.items.every((e) =>
                    e.contentId === t
                      ? ((a = [e]), !1)
                      : ((a = e.upgrades.filter(function (e) {
                          return e.contentId === t;
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
              const e = this.get("matchData.participants"),
                t = this.get("puuid"),
                a = e.filter(function (e) {
                  return e.puuid === t;
                });
              return a.length > 0 ? a[0] : null;
            },
          ),
          actions: { displayMatchDetails(e) {} },
        });
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "MvUKBBqW",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\tft-match-summary-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\tft-match-summary-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\tft-match-summary-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["match-summary-little-legends-container placement_",["unknown",["placement"]]]]],["flush-element"],["text","\\n     "],["open-element","div",[]],["static-attr","class","player-history-champion"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-history-champion-icon"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","player-history-champion-icon-border"],["flush-element"],["close-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","match-summary-little-legends-img"],["dynamic-attr","src",["unknown",["companionIcon"]],null],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","player-history-champion-frame"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-history-lv"],["flush-element"],["append",["unknown",["currentPlayerLevel"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","match-summary-player-stats"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-summary-placement-display"],["flush-element"],["append",["unknown",["placementText"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-summary-details"],["flush-element"],["text","\\n        "],["append",["unknown",["modeText"]],false],["text"," ● "],["append",["unknown",["matchLength"]],false],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["matchData","gameVariation"]]],null,13],["text","    "],["open-element","div",[]],["static-attr","class","match-summary-details"],["flush-element"],["text","\\n        "],["append",["unknown",["matchDate"]],false],["text","\\n    "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["currentPlayer","augments"]]],null,10],["text","\\n"],["open-element","div",[]],["static-attr","class","match-summary-right"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-summary-champions-in-play"],["flush-element"],["text","\\n"],["block",["each"],[["get",["units"]]],[["key"],["name"]],6],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-summary-traits"],["flush-element"],["text","\\n"],["block",["each"],[["get",["currentPlayer","traits"]]],[["key"],["name"]],2],["text","    "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                            "],["open-element","p",[]],["flush-element"],["append",["unknown",["trait","name"]],false],["close-element"],["text","\\n                        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["dynamic-attr","class",["concat",["match-summary-trait-img-bg trait_level_",["unknown",["trait","rank"]]]]],["flush-element"],["text","\\n                    "],["open-element","img",[]],["dynamic-attr","class",["concat",["match-summary-trait-img ",["unknown",["trait","name"]]]]],["dynamic-attr","src",["unknown",["trait","iconPath"]],null],["flush-element"],["close-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-tft-trait-tooltip"]],0],["text","                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["trait","tier_current"]]],null,1]],"locals":["trait","index"]},{"statements":[["text","                                "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                                    "],["open-element","p",[]],["flush-element"],["append",["unknown",["item","name"]],false],["close-element"],["text","\\n                                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                        "],["open-element","div",[]],["static-attr","class","match-history-tft-player-piece-item"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["item","loadoutsIcon"]],");"]]],["flush-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-tft-champion-tooltip"]],3],["text","                        "],["close-element"],["text","\\n"]],"locals":["item"]},{"statements":[["text","                        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                            "],["open-element","p",[]],["flush-element"],["append",["unknown",["unit","championName"]],false],["close-element"],["text","\\n                        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["dynamic-attr","class",["concat",["tft-player-piece piece-level-",["unknown",["unit","tier"]]]]],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","piece-inner-border"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["unit","iconPath"]],");"]]],["flush-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-tft-champion-tooltip"]],5],["text","                "],["close-element"],["text","\\n\\n                 "],["open-element","div",[]],["static-attr","class","match-history-tft-player-piece-item-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["unit","equippedItems"]]],null,4],["text","                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n\\n\\n"]],"locals":["unit","index"]},{"statements":[["text","                        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                            "],["open-element","p",[]],["flush-element"],["append",["unknown",["augment","name"]],false],["close-element"],["text","\\n                        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","match-summary-augment-icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["augment","loadoutsIcon"]],");"]]],["flush-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-augment-tooltip"]],7],["text","                "],["close-element"],["text","\\n"]],"locals":["augment"]},{"statements":[["text","                "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                    "],["open-element","p",[]],["flush-element"],["append",["unknown",["augmentContainer","name"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-summary-augment"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-summary-augment-inner"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["augmentContainer","icon"]],");"]]],["flush-element"],["text","\\n"],["block",["match-history-tooltip"],null,[["direction","tooltipId"],["top","match-summary-augment-tooltip"]],9],["text","        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-summary-augment-icon-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["currentPlayer","augments"]]],null,8],["text","        "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","match-summary-tft-tooltip"],["flush-element"],["text","\\n                        "],["open-element","p",[]],["flush-element"],["append",["unknown",["matchData","gameVariation","description"]],false],["close-element"],["text","\\n                    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["match-history-tooltip"],null,[["direction","tooltipId"],["bottom","match-summary-tft-trait-tooltip"]],11]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","match-summary-details"],["flush-element"],["text","\\n            "],["append",["unknown",["matchData","gameVariation","displayName"]],false],["text","\\n            "],["open-element","lol-uikit-info-icon",[]],["static-attr","class","match-summary-set-mechanic-tooltip-icon"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["matchData","gameVariation","description"]]],null,12],["text","        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = (function (e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var a = s(t);
          if (a && a.has(e)) return a.get(e);
          var n = {},
            l = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in e)
            if ("default" !== i && Object.prototype.hasOwnProperty.call(e, i)) {
              var o = l ? Object.getOwnPropertyDescriptor(e, i) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(n, i, o)
                : (n[i] = e[i]);
            }
          (n.default = e), a && a.set(e, n);
          return n;
        })(a(1));
        function s(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            a = new WeakMap();
          return (s = function (e) {
            return e ? a : t;
          })(e);
        }
        const l = n.Ember.Component.extend({
          layout: a(32),
          classNames: ["champ-role-percentage-tooltip"],
          roleName: "",
          champRolePercentage: 0,
          localizedRoleName: n.Ember.computed(
            "tra.metadata",
            "roleName",
            function () {
              const e = this.get("roleName").toUpperCase();
              return this.get(`tra.MATCH_HISTORY_SUMMARY_RECENT_ROLE_${e}`);
            },
          ),
          localizedChampRolePercentage: n.Ember.computed(
            "tra.metadata",
            "champRolePercentage",
            function () {
              const e = this.get("champRolePercentage");
              return this.get("tra").formatString(
                "MATCH_HISTORY_SUMMARY_PLAYED_GAMES_PERCENTAGE",
                { percentage: e },
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
          (e.exports = l);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "6IBAR4Kp",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\champ-role-percentage-tooltip-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\champ-role-percentage-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n    "],["open-element","h6",[]],["flush-element"],["append",["unknown",["localizedRoleName"]],false],["close-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["append",["unknown",["localizedChampRolePercentage"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        e.exports = n.Ember.Component.extend({
          layout: a(34),
          champion: n.Ember.computed("champions", "id", function () {
            const e = this.get("champions"),
              t = this.get("id");
            return e && t ? e.get(t) : null;
          }),
        });
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "c5v28s+Q",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\champ-portrait-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\champ-portrait-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["champion"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","img",[]],["static-attr","class","no-champ-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["champion","squarePortraitPath"]]]]],["static-attr","alt",""],["static-attr","class","player-history-champion-pic"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        e.exports = n.Ember.Component.extend({
          layout: a(36),
          item: n.Ember.computed("ref", "id", function () {
            const e = this.get("ref"),
              t = this.get("id");
            return e && t ? e.get(t) : null;
          }),
        });
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "C+iuQnTv",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\spell-item-icon-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\spell-item-icon-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["item"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["item","iconPath"]]]]],["static-attr","alt",""],["dynamic-attr","class",["concat",[["unknown",["class"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1),
          s = a(22);
        e.exports = n.Ember.Component.extend({
          layout: a(38),
          champRolePercentage: n.Ember.computed(
            "roleName",
            "champRoleMap",
            "gameCount",
            function () {
              const e = this.get("roleName"),
                t = this.get("champRoleMap"),
                a = this.get("gameCount");
              return (0, s.recentActivityData)(e, t, a).champRolePercentage;
            },
          ),
        });
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "Eb/Q6JPH",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\recent-activity-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\recent-activity-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["recent-activity-item item-",["unknown",["index"]]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","recent-activity-bar"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","recent-activity-fill"],["dynamic-attr","style",["concat",["height: ",["unknown",["champRolePercentage"]],"%"]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["recent-activity-icon ",["unknown",["roleName"]],"-icon"]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
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
          layout: a(40),
          toolTipAttached: !1,
          tooltipOptions: s,
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
            const e = "bottom" === this.get("direction") ? l : s;
            n.TooltipManager.assign(
              this.tooltipHoverElement,
              this.tooltipElement,
              null,
              e,
            );
          },
          detachTooltip: function () {
            n.TooltipManager.unassign(this.tooltipHoverElement);
          },
        });
        t.default = i;
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "DcKILXFk",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-history-tooltip-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\summary\\\\match-history-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["dynamic-attr","id",["concat",["match-history-tooltip-",["unknown",["tooltipId"]]]]],["flush-element"],["text","\\n  "],["yield","default"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e) => {
        "use strict";
        function t(e) {
          const a = {};
          for (const n in e)
            "object" == typeof e[n] ? (a[n] = t(e[n])) : (a[n] = e[n]);
          return a;
        }
        function a(e, t, a) {
          const { regions: n, region: s, locale: l } = e.metadata();
          if ((a = a.get("metadata." + t)) && "region" === t && a.id !== s.id) {
            const t = n[a.id],
              s = t.defaultLocale
                ? t.defaultLocale.id
                : t.availableLocales[0].id;
            e.setLocale(s, a.id);
          } else a && "locale" === t && a.id !== l.id && e.setLocale(a.id);
        }
        e.exports = function (e, n, s) {
          let l;
          const i = { metadata: !0, moment: !0 };
          return (
            (n = n.observe(() => {
              if (l) {
                const e = t(n.metadata());
                l.set("metadata", e),
                  l.beginPropertyChanges(),
                  Object.keys(i).forEach((e) => {
                    l.propertyWillChange(e), l.propertyDidChange(e);
                  }),
                  l.endPropertyChanges();
              }
            })),
            (l = e.Service.extend({
              _tra: null,
              init() {
                this.wrapTra(n);
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
                return (i[e] = !0), this._tra.get(e);
              },
              willDestroy: () => this._tra.unregister(),
              addOverlays: function (e) {
                let t = this._tra;
                for (const a of e) t = t.overlay(a);
                t && this.wrapTra(t);
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
      (e, t, a) => {
        "use strict";
        var n,
          s = (n = a(41)) && n.__esModule ? n : { default: n },
          l = a(1);
        class i {
          constructor(e, t) {
            l.logger.trace("Creating Match Details Ember application");
            const a = t
                .overlay("/fe/lol-l10n/trans.json")
                .overlay("/fe/lol-shared-components/trans.json"),
              n = (0, s.default)(l.Ember, a);
            (this._tra = a), (this._traService = n), (this._provider = e);
          }
          displayMatchDetails(e) {
            this._matchDetailsApi
              ? this._matchDetailsApi.showMatchDetails(e)
              : this._initMatchDetailsApi((t) => t.showMatchDetails(e));
          }
          hideMatchDetails() {
            this._matchDetailsApi && this._matchDetailsApi.hideMatchDetails();
          }
          _initMatchDetailsApi(e) {
            if (this._matchDetailsApi)
              return e && e(this._matchDetailsApi), this._matchDetailsApi;
            new Promise((e) => {
              Promise.resolve()
                .then(
                  (() => {
                    e(a(43));
                  }).bind(null, a),
                )
                .catch(a.oe);
            }).then((t) => {
              (this._matchDetailsApi = new t(this._provider, this._traService)),
                e(this._matchDetailsApi);
            });
          }
        }
        let o;
        e.exports = function (e, t) {
          return void 0 === o && (o = new i(e, t)), o;
        };
      },
      (e, t, a) => {
        "use strict";
        var n,
          s = a(1),
          l = a(5),
          i = (n = a(44)) && n.__esModule ? n : { default: n };
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
          h,
          u = !1,
          g = !1;
        function f() {
          r.release(),
            p &&
              s.Lodash.isFunction(p) &&
              !g &&
              (p("closeButtonClick"), (g = !0)),
            c && c.onRemove();
        }
        function y() {
          r.release(),
            p &&
              s.Lodash.isFunction(p && !g) &&
              (p("closeMatchDetailModalOnly"), (g = !0));
        }
        e.exports = class {
          constructor(e, t) {
            s.logger.trace("Creating Match Details Ember application"),
              u ||
                (function (e, t) {
                  (r = s.Viewport.overlay().getScreenRoot(
                    "rcp-fe-lol-match-details-overlay",
                  )),
                    (d = r.getElement()),
                    (h = document.createElement("lol-uikit-full-page-modal")),
                    (h.className = "rcp-fe-lol-match-details-overlay-content"),
                    d.appendChild(h),
                    h.addEventListener("closeButtonClick", f),
                    h.addEventListener("closeMatchDetailModalOnly", y),
                    s.EmberApplicationFactory.setFactoryDefinition({
                      name: "MatchDetailsRootComponent",
                      ComponentFactory: s.ComponentFactory,
                      tra: t,
                      MatchDetailsRootComponent: a(45),
                      LayerHeaderComponent: a(49),
                      MatchOverviewComponent: a(52).OverviewComponent,
                      MatchDetailsTimelineChartComponent:
                        a(56).TimelineChartComponent,
                      MatchDetailsEventChartComponent: a(79),
                      MatchDetailsMapChartComponent: a(83),
                      MapTooltipComponent: a(97),
                      MatchScoreboardComponent: a(100),
                      MatchDetailsTeamDataComponent: a(107),
                      MatchDetailsTeamObjectivesComponent: a(111),
                      ScoreboardTooltipComponent: a(114),
                      ElementalTooltipComponent: a(116),
                      ItemTooltipComponent: a(119),
                      SpellTooltipComponent: a(122),
                      KeystoneTooltipComponent: a(125),
                      ChampIconComponent: a(128),
                      PlayerHistoryRowComponent: a(130),
                      MatchStatsComponent: a(134),
                      TeamAvatarsComponent: a(138),
                      TeamAvatarComponent: a(141),
                      StatsTableComponent: a(143),
                      StatsRowComponent: a(146),
                      StatsBgComponent: a(149),
                      MatchGraphComponent: a(152),
                      GraphCategoriesComponent: a(155),
                      GraphDisplayComponent: a(159),
                      MatchRunesComponent: a(162),
                      RunesRuneStatsComponent: a(165),
                      RunesPlayerStatsComponent: a(168),
                      PlayerNameComponent:
                        s.SharedEmberComponents.PlayerNameComponent,
                      GameIdClipboardCopyComponent:
                        s.SharedEmberComponents.GameIdClipboardCopyComponent,
                      StatsService: a(171),
                      PlayerReportsService: i.default,
                    }),
                    s.Viewport.main()
                      .getScreenRoot("rcp-fe-lol-profiles-main")
                      .on("hide", function () {
                        f();
                      }),
                    s.Viewport.overlay().on("remove", function (e, t) {
                      t &&
                        "rcp-fe-lol-match-details-overlay" === t.name &&
                        p &&
                        s.Lodash.isFunction(p) &&
                        !g &&
                        (p("closeButtonClick"), (g = !0));
                    }),
                    s.Navigation.on("navigate", () => {
                      f();
                    }),
                    (u = !0);
                })(0, t);
          }
          showMatchDetails(e) {
            this.hideMatchDetails(),
              (function (e) {
                let t = !1;
                e.closeModalCallback &&
                s.Lodash.isFunction(e.closeModalCallback)
                  ? ((p = e.closeModalCallback), (t = !0))
                  : (p = null);
                g = !1;
                const a = s.Lodash.get(e, "sections", []),
                  n = [];
                a.forEach((e) => n.push(o.get(e)));
                const i = s.Lodash.get(e, "defaultSection"),
                  d = s.Lodash.get(e, "dataSource", "eogStats");
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
                    `Displaying match details for gameId ${e.gameId} and summoner ${e.summonerId}`,
                  ),
                    c &&
                      (h.removeChild(h.childNodes[0]),
                      c.componentPromise.then(function (e) {
                        e.app.destroy();
                      })),
                    (m = {
                      dataSource: d,
                      hideHeader: e.hideHeader,
                      baseGameId: e.gameId,
                      baseSummonerId: e.summonerId,
                      additionalInfo: e.additionalInfo,
                      isThirdPersonView: t,
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
                  h.appendChild(l.domNode), (c = l), r.bump();
                });
              })(e);
          }
          hideMatchDetails() {
            r.release();
          }
        };
      },
      (e, t, a) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
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
              const e = this.get("gameId");
              e &&
                (this.playerReportSenderBinding.removeObserver(
                  this.get("playerReportSenderBasePath"),
                  this,
                ),
                this.playerReportSenderBinding.observe(
                  `/v1/reported-players/gameId/${e}`,
                  this,
                  this.handleReportedPlayersUpdate,
                ));
            }),
            handleReportedPlayersUpdate: function (e) {
              this.set("reportedPlayers", e);
            },
          });
        t.default = s;
      },
      (e, t, a) => {
        "use strict";
        var n = a(1),
          s = r(a(12)),
          l = r(a(8)),
          i = a(6),
          o = a(46);
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        a(47);
        const c = (0, n.EmberDataBinding)({
          Ember: n.Ember,
          websocket: (0, n.getProvider)().getSocket(),
          boundProperties: {
            potatoModeSetting: "/lol-settings/v2/local/lol-user-experience",
            currentSummoner: "/lol-summoner/v1/current-summoner",
          },
        });
        e.exports = n.Ember.Component.extend(
          c,
          i.DataBindingMixin,
          i.FixDataBindingMixin,
          l.default,
          {
            classNames: ["match-details-root-component"],
            classNameBindings: ["hideHeader:match-details-no-header"],
            layout: a(48),
            isLoading: !0,
            isTransitioning: !1,
            matchHistoryConfig: n.Ember.computed.alias(
              "platformConfig.NewMatchHistory",
            ),
            localPuuid: n.Ember.computed.alias("currentSummoner.puuid"),
            stats: n.Ember.inject.service(),
            playerReportsService: n.Ember.inject.service("player-reports"),
            getNameFallback(e, t) {
              return void 0 === e || "" === e
                ? this.get("tra.MATCH_DETAILS_SUMMONER_NAME") + t
                : e;
            },
            loadData() {
              const e = this.get("baseGameId"),
                t = this.get("playerReportsService");
              t && t.set("gameId", e);
              const a = this.retrieveData("api.matchHistory", `/v1/games/${e}`),
                l = this.retrieveData(
                  "api.matchHistory",
                  `/v1/game-timelines/${e}`,
                );
              return n.Ember.RSVP.hashSettled({
                gameData: a,
                gameTimeline: l,
              }).then(
                (e) => {
                  if (this.get("isDestroyed")) return;
                  const t = e.gameData.value;
                  if (
                    (t.participants &&
                      t.participantIdentities &&
                      (t.participantIdentities.forEach((e, a) => {
                        const {
                          summonerName: n,
                          gameName: s,
                          tagLine: l,
                        } = e.player;
                        let i;
                        (i =
                          s && l
                            ? this.get("_playerNames")?.formatPlayerName({
                                summonerName: n,
                                gameName: s,
                                tagLine: l,
                              })?.playerName
                            : n),
                          (t.participantIdentities[a].player.displayName = i);
                      }),
                      (t.participants = t.participants.map((e) => {
                        const a = n.Lodash.find(
                          t.participantIdentities,
                          (t) => t.participantId === e.participantId,
                        );
                        return (
                          (a.player.summonerName = this.getNameFallback(
                            a.player.summonerName,
                            e.participantId,
                          )),
                          (a.player.displayName = this.getNameFallback(
                            a.player.displayName,
                            e.participantId,
                          )),
                          n.Lodash.set(
                            a.player,
                            "participantId",
                            a.participantId,
                          ),
                          new s.default(e, a)
                        );
                      }))),
                    this.get("baseSummonerId"))
                  ) {
                    const e = n.Lodash.find(
                      t.participants,
                      (e) => e.player.summonerId === this.get("baseSummonerId"),
                    );
                    (t.participants = n.Lodash.sortBy(t.participants, [
                      "teamId",
                      function (t) {
                        return t.player.summonerId === e.player.summonerId
                          ? -1
                          : 0;
                      },
                    ])),
                      this.set("baseCurrentParticipant", e);
                  }
                  this.set("baseGameData", t),
                    "fulfilled" === e.gameTimeline.state
                      ? this.set("baseGameTimeline", e.gameTimeline.value)
                      : this.set("baseGameTimeline", null),
                    this.set("isLoading", !1);
                },
                (e) => {
                  404 !== e.status &&
                    (n.logger.error("Could not load match details data", e),
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
                    (e) => {
                      const t = e.detail.node;
                      this.showSection(t.dataset.name);
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
                const e = this.get("displaySections");
                let t = -1;
                return (
                  e.forEach(function (e, a) {
                    e.selected && (t = a);
                  }),
                  t
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
                let e = this.get("sections");
                const t = this.get("currentSelectedSectionName"),
                  a = this.get("matchHistoryConfig"),
                  s = [];
                let l = [];
                const i = this.get("gameData.gameMode");
                this.get("isGameModeWithSubteams") &&
                  (l = this.get("subteamGameModeData")[i].disabledSections),
                  (e = n.Lodash.sortBy(e, ["priority"]));
                let o = !1;
                return (
                  e.forEach((e) => {
                    const i = n.Ember.Object.create({}),
                      r = a && !1 === a[e.jmxEnabledKey],
                      c = a && !1 === a[e.jmxVisibleKey],
                      m = t === e.sectionName,
                      p = l.includes(e.sectionName);
                    m && (o = !0),
                      i.set("name", e.sectionName),
                      i.set("displayName", this.get(`tra.${e.locKey}`)),
                      i.set("selected", m),
                      i.set("disabled", !e.enabled || r),
                      i.set("display", (e.display || !c) && !p),
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
            showSection: function (e) {
              this.get("currentSelectedSectionName") === e ||
                this.get("isTransitioning") ||
                (this.set("currentSelectedSectionName", e),
                this.set("isTransitioning", !0));
            },
          },
        );
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.GAME_MODES_WITH_SUBTEAMS = void 0);
        t.GAME_MODES_WITH_SUBTEAMS = {
          CHERRY: { disabledSections: ["overview", "runes"] },
        };
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "7FFZRFtj",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\details\\\\match-details-root-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\details\\\\match-details-root-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\details\\\\match-details-root-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-navigation-bar",[]],["static-attr","class","rcp-fe-lol-match-details-overlay-sub-nav"],["static-attr","type","nav-bar-secondary"],["dynamic-attr","selectedindex",["unknown",["selectedSectionIndex"]],null],["flush-element"],["text","\\n"],["block",["each"],[["get",["displaySections"]]],null,4],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["isLoading"]]],null,2,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["layer-header"],null,[["gameData","additionalInfo","currentParticipant","isThirdPersonView","maps","queues","potatoModeSetting"],[["get",["gameData"]],["get",["additionalInfo"]],["get",["currentParticipant"]],["get",["isThirdPersonView"]],["get",["maps"]],["get",["queues"]],["get",["potatoModeSetting"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["unless"],[["get",["hideHeader"]]],null,0],["text","  "],["append",["helper",["component"],[["get",["sectionName"]]],[["isTransitioning","gameData","gameTimeline","currentParticipant","augments","champions","championsByAlias","items","runes","runesStyles","spells","localPuuid"],[["get",["isTransitioning"]],["get",["gameData"]],["get",["gameTimeline"]],["get",["currentParticipant"]],["get",["augments"]],["get",["champions"]],["get",["championsByAlias"]],["get",["items"]],["get",["runes"]],["get",["runesStyles"]],["get",["spells"]],["get",["localPuuid"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","match-details-loading-icon-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-details-loading-icon"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-navigation-item",[]],["dynamic-attr","data-name",["concat",[["unknown",["section","name"]]]]],["dynamic-attr","disabled",["unknown",["section","disabled"]],null],["dynamic-attr","active",["unknown",["section","selected"]],null],["flush-element"],["text","\\n        "],["append",["unknown",["section","displayName"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["section","display"]]],null,3]],"locals":["section"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1),
          s = a(6),
          l = a(5);
        a(50),
          (e.exports = n.Ember.Component.extend(s.DataBindingMixin, {
            layout: a(51),
            classNames: ["match-details-layer-header"],
            animationDisabled: n.Ember.computed.bool(
              "potatoModeSetting.data.potatoModeEnabled",
            ),
            map: n.Ember.computed(
              "maps",
              "gameData.mapId",
              "gameData.gameMode",
              function () {
                const e = n.Lodash.find(this.get("maps"), {
                  gameMode: this.get("gameData.gameMode"),
                  id: this.get("gameData.mapId"),
                });
                return (
                  e || n.Lodash.find(this.get("maps"), { id: l.DEFAULT_MAP_ID })
                );
              },
            ),
            createdAt: n.Ember.computed(
              "gameData",
              "tra.MATCH_DETAILS_GAME_CREATION_DATE_FORMAT",
              function () {
                const e = this.get("gameData").gameCreation;
                return (0, n.moment)(new Date(e)).format(
                  this.get("tra.MATCH_DETAILS_GAME_CREATION_DATE_FORMAT"),
                );
              },
            ),
            duration: n.Ember.computed("gameData", function () {
              const e = this.get("gameData").gameDuration;
              return n.l10nDuration.formatSeconds(e);
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
                const e = this.get("queues").get(this.get("gameData.queueId"));
                return e
                  ? e.detailedDescription
                    ? e.detailedDescription
                    : e.description
                  : "";
              },
            ),
            outcome: n.Ember.computed(
              "currentParticipant.win",
              "tra.postgame_progress_victory",
              "tra.postgame_progress_defeat",
              "tra.MATCH_HISTORY_MATCH_RESULT_REMAKE",
              "currentParticipant.stats.gameEndedInEarlySurrender",
              function () {
                const e = this.get("currentParticipant").win;
                return this.get(
                  "currentParticipant.stats.gameEndedInEarlySurrender",
                )
                  ? this.get("tra.MATCH_HISTORY_MATCH_RESULT_REMAKE")
                  : this.get(
                      "tra." +
                        (e
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
                const e = this.get("map");
                return this.get("animationDisabled")
                  ? this.get("currentParticipant.win")
                    ? n.Lodash.get(e, "assets.icon-victory")
                    : n.Lodash.get(e, "assets.icon-defeat")
                  : this.get("currentParticipant.win")
                    ? n.Lodash.get(e, "assets.icon-victory-video")
                    : n.Lodash.get(e, "assets.icon-defeat-video");
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
                    .map(function (e) {
                      return parseInt(e, 10);
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
                const e = this.get("gameData");
                return (
                  !(!e || !n.Replays.isGeneralReplaysEnabled()) &&
                  (!(
                    this.get("isThirdPersonView") &&
                    !this.get("whitelistedQueueIds").includes(e.queueId)
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
                const e = this.element
                  ? this.element.querySelector(".match-layer-header-replay")
                  : null;
                if (!e) return;
                const t = this.get("gameData"),
                  a = n.Replays.createReplayButton({
                    gameId: t.gameId,
                    gameVersion: t.gameVersion,
                    gameType: t.gameType,
                    queueId: t.queueId,
                    gameCreation: t.gameCreation,
                    gameDuration: t.gameDuration,
                  });
                if (a) {
                  for (; e.firstChild; ) e.removeChild(e.firstChild);
                  e.appendChild(a.domNode), this.set("replayButton", a);
                } else
                  n.logger.error("Unable to create replay button for match");
              },
            ),
            destroyReplayButton: n.Ember.on("willDestroyElement", function () {
              const e = this.get("replayButton");
              e && (e.destroy(), this.set("replayButton", null));
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
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "K5bWrZMG",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\details\\\\layer-header-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\details\\\\layer-header-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\details\\\\layer-header-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","match-layer-header-wrapper match_details_clearfix"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isThirdPersonView"]]],null,3],["block",["if"],[["get",["animationDisabled"]]],null,2,1],["text","  "],["open-element","div",[]],["static-attr","class","match-layer-header-right"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-layer-header-name"],["flush-element"],["append",["unknown",["outcome"]],false],["close-element"],["text","\\n    "],["open-element","ul",[]],["static-attr","class","match-layer-header-info-list match_details_clearfix"],["flush-element"],["text","\\n      "],["open-element","li",[]],["static-attr","class","match-layer-header-info-item"],["flush-element"],["append",["unknown",["map","name"]],false],["close-element"],["text","\\n      "],["open-element","li",[]],["static-attr","class","match-layer-header-info-item"],["flush-element"],["append",["unknown",["type"]],false],["close-element"],["text","\\n      "],["open-element","li",[]],["static-attr","class","match-layer-header-info-item"],["flush-element"],["append",["unknown",["duration"]],false],["close-element"],["text","\\n      "],["open-element","li",[]],["static-attr","class","match-layer-header-info-item"],["flush-element"],["append",["unknown",["createdAt"]],false],["close-element"],["text","\\n      "],["open-element","li",[]],["static-attr","class","match-layer-header-info-item"],["flush-element"],["append",["helper",["game-id-clipboard-copy"],null,[["gameId"],[["get",["gameId"]]]]],false],["close-element"],["text","\\n      "],["block",["if"],[["get",["additionalInfo","champMasteryIpXpDesc"]]],null,0],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","match-layer-header-replay"],["flush-element"],["text","\\n"],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["open-element","li",[]],["static-attr","class","match-layer-header-info-item"],["flush-element"],["append",["unknown",["additionalInfo","champMasteryIpXpDesc"]],false],["close-element"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-layer-header-icon"],["flush-element"],["text","\\n      "],["open-element","video",[]],["static-attr","class","match-layer-header-video"],["static-attr","autoplay","true"],["static-attr","loop","true"],["dynamic-attr","src",["concat",[["unknown",["mapIcon"]]]]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-layer-header-icon"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-layer-header-icon-img map-icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["mapIcon"]],")"]]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-layer-header-left"],["modifier",["action"],[["get",[null]],"backToMatchHistory"],[["on"],["click"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        a(53);
        var s,
          l = (s = a(54)) && s.__esModule ? s : { default: s };
        const i = ["DARKSTAR", "STARGUARDIAN"],
          o = n.Ember.Component.extend({
            classNames: ["match-details-overview-component"],
            layout: a(55),
            chartTitle: n.Ember.computed("displayedChart", function () {
              return this.get("tra").get(
                l.default.CHART_TITLES_KEYS[this.get("displayedChart")],
              );
            }),
            hasTimelineData: n.Ember.computed("gameTimeline", function () {
              const e = this.get("gameTimeline");
              return (
                e.frames &&
                e.frames.length > 0 &&
                !this.shouldSkipTimelineData()
              );
            }),
            shouldSkipTimelineData: function () {
              const e = this.get("gameData");
              return !(!e || !e.gameMode || -1 === i.indexOf(e.gameMode));
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
              selectTimelineChart: function (e) {
                this.set("displayed.teamGoldAdvantage", !1),
                  this.set("displayed.teamGold", !1),
                  this.set("displayed.championGold", !1),
                  this.set("displayed." + e, !0),
                  this.set("displayedChart", e);
              },
            },
            didInsertElement: function () {
              const e = n.Ember.$(this.element).find(
                ".match-details-overview-container",
              )[0];
              e.addEventListener("webkitAnimationEnd", function (t) {
                t.target === e &&
                  "fade-in" === t.animationName &&
                  e.classList.remove("match-details-loading-fade-in");
              });
            },
          });
        function r(e, t) {
          return e[t].teamId;
        }
        function c(e, t) {
          const a = {};
          return (
            n.Lodash.each(e.participants, (e) => {
              a[e.participantId] = n.Lodash.extend(e, {
                imgSrc: t.get(e.championId).squarePortraitPath,
              });
            }),
            a
          );
        }
        function m(e, t, a, s) {
          const l = n.Lodash.filter(
              e.participantIdentities,
              (e) => e.player.currentAccountId === a,
            )[0],
            i = c(e, s);
          return {
            participants: i,
            timelines: p(t.frames, i, l),
            mapId: e.mapId,
            ownerId: l ? l.participantId : null,
          };
        }
        function p(e, t, a) {
          const s = [],
            i = [],
            o = [],
            c = [],
            m = { championKills: [], championDeaths: [], buildingKills: [] },
            p = r(t, a.participantId),
            u = g(p);
          return (
            n.Lodash.each(e, (e) => {
              const { timestamp: r } = e,
                g = h(e, t);
              if (void 0 === g) return;
              const f = d(e.events, t, m, a),
                y = { timestamp: r };
              (y[l.default.TEAM_BLUE_ID] = g.teamGolds[l.default.TEAM_BLUE_ID]),
                (y[l.default.TEAM_RED_ID] = g.teamGolds[l.default.TEAM_RED_ID]),
                i.push({ gold: g.teamGolds[p] - g.teamGolds[u], timestamp: r }),
                s.push(y),
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
        function d(e, t, a, s) {
          const i = {},
            o = {};
          (i[l.default.TEAM_BLUE_ID] = i[l.default.TEAM_RED_ID] = 0),
            (o[l.default.TEAM_BLUE_ID] = o[l.default.TEAM_RED_ID] = null);
          let c = {};
          (c[l.default.TEAM_RED_ID] = {}), (c[l.default.TEAM_BLUE_ID] = {});
          const m = e.filter(
              (e) =>
                !!n.Lodash.includes(l.default.RELEVANT_EVENT_TYPES, e.type) &&
                (e.type !== l.default.CHAMP_KILL_EVENT_TYPE ||
                  0 !== e.victimId),
            ),
            p = r(t, s.participantId);
          n.Lodash.each(m, (e) => {
            const { killerId: n } = e;
            let s = u(e, t);
            (s = s === p ? 100 : 200), c[s][n] || (c[s][n] = []);
            const r = c[s][n];
            switch (e.type) {
              case l.default.CHAMP_KILL_EVENT_TYPE:
                const { victimId: c } = e,
                  m = t[c];
                i[s]++,
                  r.push({
                    isChampion: !0,
                    class: `champion-${m.championId}`,
                    imgSrc: m.imgSrc,
                  });
                const p = e.position;
                a.championKills.push({
                  playerId: n,
                  teamId: s,
                  position: p,
                  victimId: c,
                  timestamp: e.timestamp,
                }),
                  a.championDeaths.push({
                    playerId: c,
                    teamId: g(s),
                    position: p,
                    killerId: n,
                    timestamp: e.timestamp,
                    killerTeamId: s,
                  });
                break;
              case l.default.BUILD_KILL_EVENT_TYPE:
                const d = l.default.OBJECTIVE_TYPE_DISPLAY_MAP[e.buildingType];
                (o[s] = f(o[s], d, l.default.OBJECTIVE_GREATENESS_MAP)),
                  r.push({ isChampion: !1, class: `${d}-${g(s)}` }),
                  a.buildingKills.push({
                    display: d,
                    playerId: n,
                    killerTeamId: s,
                    timestamp: e.timestamp,
                    teamId: g(s),
                    position: e.position,
                  });
                break;
              case l.default.ELITE_MONSTER_KILL_TYPE:
                let h = l.default.OBJECTIVE_TYPE_DISPLAY_MAP[e.monsterType];
                (o[s] = f(o[s], h, l.default.OBJECTIVE_GREATENESS_MAP)),
                  e.monsterSubType &&
                    l.default.OBJECTIVE_TYPE_DISPLAY_MAP[e.monsterSubType] &&
                    (h =
                      l.default.OBJECTIVE_TYPE_DISPLAY_MAP[e.monsterSubType]),
                  r.push({ isChampion: !1, class: `${h}-${s}` });
            }
          });
          const d = n.Lodash.reduce(
              i,
              (e, t, a) => (t > 0 && e.push({ teamId: a, count: t }), e),
              [],
            ),
            h = n.Lodash.reduce(
              o,
              (e, t, a) => (t && e.push({ teamId: a, objective: t }), e),
              [],
            );
          return (
            (c = n.Lodash.fromPairs(
              n.Lodash.map(c, (e, a) => [
                a,
                {
                  isEmpty: n.Lodash.size(e) <= 0,
                  rows: n.Lodash.map(e, (e, n) => {
                    const s = n > 0,
                      l = s ? t[n].championId : null;
                    return {
                      killer: {
                        class: s ? `champion-${l}` : `minion-${a}`,
                        imgSrc: s ? t[n].imgSrc : null,
                        imgClass: s ? "" : `event-icon-minions-${a}`,
                      },
                      victims: e,
                    };
                  }),
                },
              ]),
            )),
            { kills: d, details: c, objectives: h }
          );
        }
        function h(e, t) {
          if (0 === n.Lodash.size(e.participantFrames)) return;
          const a = [],
            s = n.Lodash.reduce(
              e.participantFrames,
              (e, n) => {
                const { teamId: s } = t[n.participantId];
                return (
                  e.teamGolds[s] || ((e.teamGolds[s] = 0), a.push(s)),
                  (e.championGolds[n.participantId] = n.totalGold),
                  (e.teamGolds[s] += n.totalGold),
                  e
                );
              },
              { teamGolds: {}, championGolds: {} },
            );
          if (1 === a.length) {
            const e = g(a[0]);
            s.teamGolds[e] = 0;
          }
          return s;
        }
        function u(e, t) {
          switch (e.type) {
            case l.default.CHAMP_KILL_EVENT_TYPE:
              return g(t[e.victimId].teamId);
            case l.default.BUILD_KILL_EVENT_TYPE:
              return g(e.teamId);
            case l.default.ELITE_MONSTER_KILL_TYPE:
              return e.killerId <= 0 ? -1 : t[e.killerId].teamId;
            default:
              return (
                n.logger.warning("Cannot infer teamId from event: ", e), -1
              );
          }
        }
        function g(e) {
          return l.default.TEAM_BLUE_ID + l.default.TEAM_RED_ID - e;
        }
        function f(e, t, a) {
          return e && a[e] > a[t] ? e : t;
        }
        e.exports = {
          OverviewComponent: o,
          enrichGameDetails: m,
          prepareTimelineInfo: p,
          summarizeEventsInfo: d,
          summarizeGoldsTimeline: h,
          getTeamId: u,
          getOtherTeamId: g,
          getGreaterObjective: f,
          participantsByIdMap: c,
        };
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
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
              killDotsTransition: { y: (e) => e / 2.2 - 10 },
              objectiveIconTransition: { y: (e) => e / 2.2 - 40 },
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
        t.default = a;
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "hgLxLcYJ",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-overview-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-overview-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-overview-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["match-details-overview-container ",["helper",["if"],[["get",["isTransitioning"]],"match-details-loading-hide","match-details-loading-fade-in"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasTimelineData"]]],null,1,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-timeline-no-timeline-header"],["flush-element"],["append",["unknown",["tra","MATCH_HISTORY_OVERVIEW_TIMELINE_NO_TIMELINE"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-timeline-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-timeline-display"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["unless"],[["get",["displayed","teamGoldAdvantage"]],"chart-hidden"],null]]]],["flush-element"],["text","\\n          "],["append",["helper",["match-details-timeline-chart"],null,[["chartData","chartType","specs"],[["get",["overviewData"]],"teamGoldAdvantage",["get",["constants","TIMELINE_CHART_SPECS"]]]]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["unless"],[["get",["displayed","teamGold"]],"chart-hidden"],null]]]],["flush-element"],["text","\\n          "],["append",["helper",["match-details-timeline-chart"],null,[["chartData","chartType","specs"],[["get",["overviewData"]],"teamGold",["get",["constants","TIMELINE_CHART_SPECS"]]]]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["unless"],[["get",["displayed","championGold"]],"chart-hidden"],null]]]],["flush-element"],["text","\\n          "],["append",["helper",["match-details-timeline-chart"],null,[["chartData","chartType","specs"],[["get",["overviewData"]],"championGold",["get",["constants","TIMELINE_CHART_SPECS"]]]]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-details-timeline-display-posfix"],["flush-element"],["close-element"],["text","\\n        "],["append",["helper",["match-details-event-chart"],null,[["chartData","specs"],[["get",["overviewData"]],["get",["constants","EVENT_CHART_SPECS"]]]]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-timeline-header"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-flat-dropdown",[]],["static-attr","class","match-details-timeline-chart-dropdown"],["static-attr","direction","downward"],["flush-element"],["text","\\n          "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","class","match-details-timeline-selector-option"],["dynamic-attr","selected",["concat",[["helper",["if"],[["get",["displayed","teamGoldAdvantage"]],"true","false"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectTimelineChart","teamGoldAdvantage"],null],null],["flush-element"],["text","\\n            "],["append",["unknown",["tra","MATCH_HISTORY_OVERVIEW_TIMELINE_GOLD_ADVANTAGE_OPTION"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","class","match-details-timeline-selector-option"],["dynamic-attr","selected",["concat",[["helper",["if"],[["get",["displayed","teamGold"]],"true","false"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectTimelineChart","teamGold"],null],null],["flush-element"],["text","\\n            "],["append",["unknown",["tra","MATCH_HISTORY_OVERVIEW_TIMELINE_TEAM_GOLD_OPTION"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","class","match-details-timeline-selector-option"],["dynamic-attr","selected",["concat",[["helper",["if"],[["get",["displayed","championGold"]],"true","false"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectTimelineChart","championGold"],null],null],["flush-element"],["text","\\n            "],["append",["unknown",["tra","MATCH_HISTORY_OVERVIEW_TIMELINE_CHAMPION_GOLD_OPTION"]],false],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-details-map-container"],["flush-element"],["text","\\n      "],["append",["helper",["match-details-map-chart"],null,[["chartData","killType","playerId","specs"],[["get",["overviewData"]],["get",["killType"]],["get",["playerId"]],["get",["constants","MAP_CHART_SPECS"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        a(57);
        var s,
          l = (s = a(9)) && s.__esModule ? s : { default: s };
        const i = a(58),
          o = { teamGoldAdvantage: m, teamGold: p, championGold: d },
          r = n.Ember.Component.extend({
            classNames: ["match-details-timeline-chart-component"],
            layout: a(78),
            draw: function (e, t) {
              const a = e.timelines[t],
                s = this.get("specs"),
                l = this.get("tra.MATCH_HISTORY_THOUSANDS_SUFFIX"),
                i = this.get("tra.metadata.locale.id"),
                r = c(a, t, s, l, i),
                m = this.get("tra.formatString"),
                p = this.get(
                  "tra.MATCH_HISTORY_OVERVIEW_TIMELINE_GOLD_ADVANTAGE_TOOLTIP_TEAM_ONE",
                ),
                d = this.get(
                  "tra.MATCH_HISTORY_OVERVIEW_TIMELINE_GOLD_ADVANTAGE_TOOLTIP_TEAM_TWO",
                );
              (a.ownerId = e.ownerId + ""), (a.participants = e.participants);
              const h = n.d3
                .select(this.$().get(0))
                .append("svg:svg")
                .attr("width", r.w)
                .attr("height", r.h)
                .attr("class", "match-details-timeline-chart");
              h
                .append("svg:g")
                .attr("class", "match-details-timeline-axis-y")
                .attr("transform", _(r.margin.left, r.margin.top))
                .call(r.axis.y)
                .selectAll("g")
                .filter((e) => 0 === e)
                .classed("zero-line", !0),
                h
                  .append("svg:g")
                  .attr("class", "match-details-timeline-axis-x")
                  .attr("transform", _(r.margin.left, r.innerH + r.margin.top))
                  .call(r.axis.x);
              const u = h
                .append("svg:g")
                .attr("transform", _(r.margin.left, r.margin.top))
                .attr("class", "match-details-timeline-chart-interact");
              u
                .append("svg:line")
                .attr("class", "vertical-rule-sync")
                .attr("y1", 0)
                .attr("y2", r.innerH + r.margin.bottom)
                .style("display", "none"),
                u
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
                    const e = n.d3.mouse(this)[0];
                    n.d3
                      .selectAll(".vertical-rule-sync")
                      .attr("x1", e)
                      .attr("x2", e);
                  }),
                u
                  .append("svg:rect")
                  .attr("width", r.innerW)
                  .attr("height", r.innerH + r.margin.bottom)
                  .attr("class", "background-rect"),
                o[t]({
                  chartSvg: u,
                  outerSvg: h,
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
              const e = this.$("circle.timeline-data-point");
              n.Lodash.each(e, (e) => {
                n.TooltipManager.assign(
                  e,
                  i({ text: e.attributes.tooltip.value }),
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
              const e = this.get("chartData");
              if (e) {
                const t = this.get("chartData.ownerId"),
                  a = n.Lodash.find(e.participants, {
                    participantId: t,
                  }).teamId;
                let s = n.Lodash.sortBy(e.participants, function (e) {
                    return e.participantId === t ? -2 : e.teamId === a ? -1 : 1;
                  }),
                  l = 1;
                (s = n.Lodash.keyBy(s, () => l++)),
                  this.set("chartData.participants", s),
                  this.draw(e, this.get("chartType"));
              }
            },
          });
        function c(e, t, a, s, l) {
          const i = a.width,
            o = a.height,
            { margin: r } = a,
            c = o - r.top - r.bottom,
            m = i - r.left - r.right;
          let p,
            d = 0;
          if ("teamGoldAdvantage" === t)
            (p = Math.max(
              n.d3.max(e, (e) => e.gold),
              Math.abs(n.d3.min(e, (e) => e.gold)),
            )),
              (d = -p);
          else if ("teamGold" === t) {
            const t = e[e.length - 1];
            p = n.Lodash.max(n.Lodash.values(n.Lodash.omit(t, "timestamp")));
          } else
            "championGold" === t &&
              (p = n.Lodash.max(n.Lodash.values(e[e.length - 1].champions)));
          (p = 1e3 * Math.ceil(p / 1e3)), (d = 1e3 * Math.floor(d / 1e3));
          const h = n.d3.scale
              .linear()
              .range([0, m])
              .domain([0, e[e.length - 1].timestamp]),
            u = n.d3.scale.linear().range([c, 0]).domain([d, p]),
            g = n.d3.svg
              .axis()
              .scale(h)
              .ticks(a.ticks.x)
              .tickPadding(a.tickPadding.x)
              .tickSize(0)
              .tickFormat(n.l10nDuration.formatMilliseconds),
            f = n.d3.svg
              .axis()
              .scale(u)
              .orient("left")
              .tickSize(-m)
              .tickPadding(a.tickPadding.y)
              .tickFormat((e) => {
                let t = n.d3.format("s")(Math.abs(e)).replace("k", s);
                return "de_DE" === l && (t = t.replace(".", ",")), t;
              });
          return {
            w: i,
            h: o,
            innerW: m,
            innerH: c,
            margin: r,
            pointRarius: a.pointRarius,
            scale: { x: h, y: u },
            axis: { x: g, y: f },
          };
        }
        function m(e) {
          const {
              chartSvg: t,
              chart: a,
              data: s,
              traFormatString: l,
              locale: i,
              blue: o,
              red: r,
            } = e,
            c = u(s),
            m = t.append("svg:g");
          m
            .selectAll("line")
            .data(c)
            .enter()
            .append("line")
            .attr("class", (e) =>
              0 === e.y1 && 0 === e.y2
                ? "data-line data-stroke-even"
                : e.y1 > 0 || e.y2 > 0
                  ? "data-line data-stroke-100"
                  : "data-line data-stroke-200",
            )
            .attr("x1", (e) => a.scale.x(e.x1))
            .attr("y1", a.scale.y(0))
            .attr("x2", (e) => a.scale.x(e.x2))
            .attr("y2", a.scale.y(0)),
            m
              .selectAll("line")
              .data(c)
              .transition()
              .delay(200)
              .duration(430)
              .ease("cubic-out")
              .attr("y1", (e) => a.scale.y(e.y1))
              .attr("y2", (e) => a.scale.y(e.y2));
          const p = n.d3.svg
              .area()
              .interpolate("linear")
              .x((e) => a.scale.x(e.x))
              .y0(a.scale.y(0))
              .y1((e) => a.scale.y(e.y)),
            d = n.d3.svg
              .area()
              .interpolate("linear")
              .x((e) => a.scale.x(e.x))
              .y0(a.scale.y(0))
              .y1(a.scale.y(0)),
            h = g(c),
            y = t.append("svg:g");
          y
            .selectAll("path")
            .data(h)
            .enter()
            .append("path")
            .attr("class", (e) => "data-area data-fill-" + e.teamId)
            .attr("d", (e) => d(e.data)),
            y
              .selectAll("path")
              .data(h)
              .transition()
              .delay(200)
              .duration(430)
              .ease("cubic-out")
              .attr("d", (e) => p(e.data));
          const _ = t.append("svg:g");
          _.selectAll(".timeline-data-point")
            .data(s)
            .enter()
            .append("circle")
            .attr("class", (e) =>
              e.gold > 0
                ? "timeline-data-point data-fill-100"
                : e.gold < 0
                  ? "timeline-data-point data-fill-200"
                  : "timeline-data-point data-fill-even",
            )
            .attr("cx", (e) => a.scale.x(e.timestamp))
            .attr("cy", a.scale.y(0))
            .attr("r", () => a.pointRarius)
            .attr("tooltip", (e) => f(e, l, i, e.gold > 0 ? o : r)),
            _.selectAll(".timeline-data-point")
              .data(s)
              .transition()
              .delay(200)
              .duration(430)
              .ease("cubic-out")
              .attr("cy", (e) => a.scale.y(e.gold));
        }
        function p(e) {
          const {
              chartSvg: t,
              chart: a,
              data: s,
              traFormatString: l,
              locale: i,
            } = e,
            o = h(s);
          n.Lodash.each([100, 200], (e) => {
            const r = n.d3.svg
              .line()
              .x((e) => a.scale.x(e.timestamp))
              .y((t) => a.scale.y(t[e]))
              .interpolate("linear");
            t
              .append("svg:g")
              .selectAll(".data-line")
              .data([s])
              .enter()
              .append("svg:path")
              .attr(
                "class",
                "data-line data-stroke-" + (e === o ? "100" : "200"),
              )
              .attr("d", r(s)),
              t
                .append("svg:g")
                .selectAll(".timeline-data-point")
                .data(s)
                .enter()
                .append("svg:circle")
                .attr(
                  "class",
                  "timeline-data-point data-fill-" + (e === o ? "100" : "200"),
                )
                .attr("cx", (e) => a.scale.x(e.timestamp))
                .attr("cy", (t) => a.scale.y(t[e]))
                .attr("r", () => a.pointRarius)
                .attr("tooltip", (t) => y(t[e], t.timestamp, l, i));
          });
        }
        function d(e) {
          const {
              chartSvg: t,
              chart: a,
              data: s,
              traFormatString: l,
              locale: i,
              parentElement: o,
            } = e,
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
            u = h(s);
          n.Lodash.each(r, (e) => {
            const o = e.participantId + "" === s.ownerId,
              r = o ? "owner" : e.teamId === u ? "100" : "200",
              c = o ? "" : "none",
              m = t
                .append("svg:g")
                .attr("class", "data-champ-gold-" + e.participantId)
                .style("display", c)
                .selectAll(".data-champ-gold"),
              p = n.d3.svg
                .line()
                .x((e) => a.scale.x(e.timestamp))
                .y((t) => a.scale.y(t.champions[e.participantId]))
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
                .attr("cx", (e) => a.scale.x(e.timestamp))
                .attr("cy", (t) => a.scale.y(t.champions[e.participantId]))
                .attr("r", () => a.pointRarius)
                .attr("tooltip", (t) =>
                  y(t.champions[e.participantId], t.timestamp, l, i),
                );
            const h = d[e.teamId === u ? 100 : 200],
              g = document.createElement("div");
            g.classList.add(`gold-toggle-${r}`, "champ-gold-toggle-icon"),
              g.setAttribute("status", o ? "shown" : "hidden");
            const f = document.createElement("img");
            f.classList.add("champ-gold-toggle-img"),
              (f.src = e.imgSrc),
              g.appendChild(f),
              h.appendChild(g),
              g.addEventListener("click", () => {
                const a = t.select(".data-champ-gold-" + e.participantId),
                  n = "none" === a.style("display");
                a.style("display", n ? "" : "none"),
                  g.setAttribute("status", n ? "shown" : "hidden");
              });
          });
        }
        function h(e) {
          let t = 100;
          return (
            n.Lodash.each(e.participants, (a) => {
              a.participantId + "" === e.ownerId && (t = a.teamId);
            }),
            t
          );
        }
        function u(e) {
          return n.Lodash.reduce(
            e,
            (t, a, n) => {
              const s = e[n + 1];
              if (s)
                if (a.gold * s.gold < 0) {
                  const e =
                    a.timestamp +
                    Math.abs(
                      ((s.timestamp - a.timestamp) * a.gold) /
                        (s.gold - a.gold),
                    );
                  t.push({ x1: a.timestamp, y1: a.gold, x2: e, y2: 0 }),
                    t.push({ x1: e, y1: 0, x2: s.timestamp, y2: s.gold });
                } else
                  t.push({
                    x1: a.timestamp,
                    y1: a.gold,
                    x2: s.timestamp,
                    y2: s.gold,
                  });
              return t;
            },
            [],
          );
        }
        function g(e) {
          if (e.length) {
            const t = { x: e[0].x1, y: e[0].y1 };
            return n.Lodash.reduce(
              e,
              (e, t) => {
                const a = { x: t.x2, y: t.y2 };
                return (
                  a.y >= 0 && e[0].data.push(a),
                  a.y <= 0 && e[1].data.push(a),
                  e
                );
              },
              [
                { teamId: 100, data: [t] },
                { teamId: 200, data: [t] },
              ],
            );
          }
          return [
            { teamId: 100, data: [{ x: 0, y: 0 }] },
            { teamId: 200, data: [{ x: 0, y: 0 }] },
          ];
        }
        function f(e, t, a, s) {
          const i = n.l10nDuration.formatMilliseconds(e.timestamp);
          return 0 === e.gold
            ? t("MATCH_HISTORY_OVERVIEW_TIMELINE_GOLD_ADVANTAGE_TOOLTIP_EVEN", {
                time: i,
              })
            : t(
                "MATCH_HISTORY_OVERVIEW_TIMELINE_GOLD_ADVANTAGE_TOOLTIP_AHEAD",
                {
                  team: s,
                  gold: l.default.formatGold(Math.abs(e.gold), a),
                  time: i,
                },
              );
        }
        function y(e, t, a, s) {
          const i = n.l10nDuration.formatMilliseconds(t);
          return a("MATCH_HISTORY_OVERVIEW_TIMELINE_GOLD_TOOLTIP", {
            gold: l.default.formatGold(e, s),
            time: i,
          });
        }
        function _(e, t) {
          return `translate(${e},${t})`;
        }
        e.exports = {
          TimelineChartComponent: r,
          getChartBasicInfo: c,
          drawTeamGoldAdvantageSpecifics: m,
          drawTeamGoldSpecifics: p,
          drawChampionGoldSpecifics: d,
          getZeroYInterpolatedPoints: u,
          getTeamDataGroups: g,
          getTeamGoldAdvantageTooltip: f,
          getGoldTooltip: y,
          getTranslateAttr: _,
        };
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        var n = a(59);
        e.exports = (n.default || n).template({
          compiler: [7, ">= 4.0.0"],
          main: function (e, t, a, n, s) {
            var l;
            return (
              '<lol-uikit-tooltip>\r\n  <div class="match-details-timeline-tooltip">\r\n    <span class="match-details-timeline-tooltip-text">' +
              e.escapeExpression(
                "function" ==
                  typeof (l =
                    null != (l = a.text || (null != t ? t.text : t))
                      ? l
                      : a.helperMissing)
                  ? l.call(null != t ? t : e.nullContext || {}, {
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
      (e, t, a) => {
        e.exports = a(60).default;
      },
      (e, t, a) => {
        "use strict";
        function n(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function s(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var a in e)
              Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
          return (t.default = e), t;
        }
        t.__esModule = !0;
        var l = s(a(61)),
          i = n(a(75)),
          o = n(a(63)),
          r = s(a(62)),
          c = s(a(76)),
          m = n(a(77));
        function p() {
          var e = new l.HandlebarsEnvironment();
          return (
            r.extend(e, l),
            (e.SafeString = i.default),
            (e.Exception = o.default),
            (e.Utils = r),
            (e.escapeExpression = r.escapeExpression),
            (e.VM = c),
            (e.template = function (t) {
              return c.template(t, e);
            }),
            e
          );
        }
        var d = p();
        (d.create = p),
          m.default(d),
          (d.default = d),
          (t.default = d),
          (e.exports = t.default);
      },
      (e, t, a) => {
        "use strict";
        function n(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (t.__esModule = !0), (t.HandlebarsEnvironment = m);
        var s = a(62),
          l = n(a(63)),
          i = a(64),
          o = a(72),
          r = n(a(74));
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
        function m(e, t, a) {
          (this.helpers = e || {}),
            (this.partials = t || {}),
            (this.decorators = a || {}),
            i.registerDefaultHelpers(this),
            o.registerDefaultDecorators(this);
        }
        m.prototype = {
          constructor: m,
          logger: r.default,
          log: r.default.log,
          registerHelper: function (e, t) {
            if (s.toString.call(e) === c) {
              if (t)
                throw new l.default("Arg not supported with multiple helpers");
              s.extend(this.helpers, e);
            } else this.helpers[e] = t;
          },
          unregisterHelper: function (e) {
            delete this.helpers[e];
          },
          registerPartial: function (e, t) {
            if (s.toString.call(e) === c) s.extend(this.partials, e);
            else {
              if (void 0 === t)
                throw new l.default(
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
            if (s.toString.call(e) === c) {
              if (t)
                throw new l.default(
                  "Arg not supported with multiple decorators",
                );
              s.extend(this.decorators, e);
            } else this.decorators[e] = t;
          },
          unregisterDecorator: function (e) {
            delete this.decorators[e];
          },
        };
        var p = r.default.log;
        (t.log = p), (t.createFrame = s.createFrame), (t.logger = r.default);
      },
      (e, t) => {
        "use strict";
        (t.__esModule = !0),
          (t.extend = i),
          (t.indexOf = function (e, t) {
            for (var a = 0, n = e.length; a < n; a++) if (e[a] === t) return a;
            return -1;
          }),
          (t.escapeExpression = function (e) {
            if ("string" != typeof e) {
              if (e && e.toHTML) return e.toHTML();
              if (null == e) return "";
              if (!e) return e + "";
              e = "" + e;
            }
            if (!s.test(e)) return e;
            return e.replace(n, l);
          }),
          (t.isEmpty = function (e) {
            return (!e && 0 !== e) || !(!c(e) || 0 !== e.length);
          }),
          (t.createFrame = function (e) {
            var t = i({}, e);
            return (t._parent = e), t;
          }),
          (t.blockParams = function (e, t) {
            return (e.path = t), e;
          }),
          (t.appendContextPath = function (e, t) {
            return (e ? e + "." : "") + t;
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
        function l(e) {
          return a[e];
        }
        function i(e) {
          for (var t = 1; t < arguments.length; t++)
            for (var a in arguments[t])
              Object.prototype.hasOwnProperty.call(arguments[t], a) &&
                (e[a] = arguments[t][a]);
          return e;
        }
        var o = Object.prototype.toString;
        t.toString = o;
        var r = function (e) {
          return "function" == typeof e;
        };
        r(/x/) &&
          (t.isFunction = r =
            function (e) {
              return (
                "function" == typeof e && "[object Function]" === o.call(e)
              );
            }),
          (t.isFunction = r);
        var c =
          Array.isArray ||
          function (e) {
            return (
              !(!e || "object" != typeof e) && "[object Array]" === o.call(e)
            );
          };
        t.isArray = c;
      },
      (e, t) => {
        "use strict";
        t.__esModule = !0;
        var a = [
          "description",
          "fileName",
          "lineNumber",
          "message",
          "name",
          "number",
          "stack",
        ];
        function n(e, t) {
          var s = t && t.loc,
            l = void 0,
            i = void 0;
          s && (e += " - " + (l = s.start.line) + ":" + (i = s.start.column));
          for (
            var o = Error.prototype.constructor.call(this, e), r = 0;
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
          } catch (e) {}
        }
        (n.prototype = new Error()), (t.default = n), (e.exports = t.default);
      },
      (e, t, a) => {
        "use strict";
        function n(e) {
          return e && e.__esModule ? e : { default: e };
        }
        (t.__esModule = !0),
          (t.registerDefaultHelpers = function (e) {
            s.default(e),
              l.default(e),
              i.default(e),
              o.default(e),
              r.default(e),
              c.default(e),
              m.default(e);
          });
        var s = n(a(65)),
          l = n(a(66)),
          i = n(a(67)),
          o = n(a(68)),
          r = n(a(69)),
          c = n(a(70)),
          m = n(a(71));
      },
      (e, t, a) => {
        "use strict";
        t.__esModule = !0;
        var n = a(62);
        (t.default = function (e) {
          e.registerHelper("blockHelperMissing", function (t, a) {
            var s = a.inverse,
              l = a.fn;
            if (!0 === t) return l(this);
            if (!1 === t || null == t) return s(this);
            if (n.isArray(t))
              return t.length > 0
                ? (a.ids && (a.ids = [a.name]), e.helpers.each(t, a))
                : s(this);
            if (a.data && a.ids) {
              var i = n.createFrame(a.data);
              (i.contextPath = n.appendContextPath(a.data.contextPath, a.name)),
                (a = { data: i });
            }
            return l(t, a);
          });
        }),
          (e.exports = t.default);
      },
      (e, t, a) => {
        "use strict";
        t.__esModule = !0;
        var n,
          s = a(62),
          l = a(63),
          i = (n = l) && n.__esModule ? n : { default: n };
        (t.default = function (e) {
          e.registerHelper("each", function (e, t) {
            if (!t) throw new i.default("Must pass iterator to #each");
            var a = t.fn,
              n = t.inverse,
              l = 0,
              o = "",
              r = void 0,
              c = void 0;
            function m(t, n, l) {
              r &&
                ((r.key = t),
                (r.index = n),
                (r.first = 0 === n),
                (r.last = !!l),
                c && (r.contextPath = c + t)),
                (o += a(e[t], {
                  data: r,
                  blockParams: s.blockParams([e[t], t], [c + t, null]),
                }));
            }
            if (
              (t.data &&
                t.ids &&
                (c = s.appendContextPath(t.data.contextPath, t.ids[0]) + "."),
              s.isFunction(e) && (e = e.call(this)),
              t.data && (r = s.createFrame(t.data)),
              e && "object" == typeof e)
            )
              if (s.isArray(e))
                for (var p = e.length; l < p; l++)
                  l in e && m(l, l, l === e.length - 1);
              else {
                var d = void 0;
                for (var h in e)
                  e.hasOwnProperty(h) &&
                    (void 0 !== d && m(d, l - 1), (d = h), l++);
                void 0 !== d && m(d, l - 1, !0);
              }
            return 0 === l && (o = n(this)), o;
          });
        }),
          (e.exports = t.default);
      },
      (e, t, a) => {
        "use strict";
        t.__esModule = !0;
        var n,
          s = a(63),
          l = (n = s) && n.__esModule ? n : { default: n };
        (t.default = function (e) {
          e.registerHelper("helperMissing", function () {
            if (1 !== arguments.length)
              throw new l.default(
                'Missing helper: "' +
                  arguments[arguments.length - 1].name +
                  '"',
              );
          });
        }),
          (e.exports = t.default);
      },
      (e, t, a) => {
        "use strict";
        t.__esModule = !0;
        var n = a(62);
        (t.default = function (e) {
          e.registerHelper("if", function (e, t) {
            return (
              n.isFunction(e) && (e = e.call(this)),
              (!t.hash.includeZero && !e) || n.isEmpty(e)
                ? t.inverse(this)
                : t.fn(this)
            );
          }),
            e.registerHelper("unless", function (t, a) {
              return e.helpers.if.call(this, t, {
                fn: a.inverse,
                inverse: a.fn,
                hash: a.hash,
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
                var t = [void 0], a = arguments[arguments.length - 1], n = 0;
                n < arguments.length - 1;
                n++
              )
                t.push(arguments[n]);
              var s = 1;
              null != a.hash.level
                ? (s = a.hash.level)
                : a.data && null != a.data.level && (s = a.data.level),
                (t[0] = s),
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
      (e, t, a) => {
        "use strict";
        t.__esModule = !0;
        var n = a(62);
        (t.default = function (e) {
          e.registerHelper("with", function (e, t) {
            n.isFunction(e) && (e = e.call(this));
            var a = t.fn;
            if (n.isEmpty(e)) return t.inverse(this);
            var s = t.data;
            return (
              t.data &&
                t.ids &&
                ((s = n.createFrame(t.data)).contextPath = n.appendContextPath(
                  t.data.contextPath,
                  t.ids[0],
                )),
              a(e, {
                data: s,
                blockParams: n.blockParams([e], [s && s.contextPath]),
              })
            );
          });
        }),
          (e.exports = t.default);
      },
      (e, t, a) => {
        "use strict";
        (t.__esModule = !0),
          (t.registerDefaultDecorators = function (e) {
            l.default(e);
          });
        var n,
          s = a(73),
          l = (n = s) && n.__esModule ? n : { default: n };
      },
      (e, t, a) => {
        "use strict";
        t.__esModule = !0;
        var n = a(62);
        (t.default = function (e) {
          e.registerDecorator("inline", function (e, t, a, s) {
            var l = e;
            return (
              t.partials ||
                ((t.partials = {}),
                (l = function (s, l) {
                  var i = a.partials;
                  a.partials = n.extend({}, i, t.partials);
                  var o = e(s, l);
                  return (a.partials = i), o;
                })),
              (t.partials[s.args[0]] = s.fn),
              l
            );
          });
        }),
          (e.exports = t.default);
      },
      (e, t, a) => {
        "use strict";
        t.__esModule = !0;
        var n = a(62),
          s = {
            methodMap: ["debug", "info", "warn", "error"],
            level: "info",
            lookupLevel: function (e) {
              if ("string" == typeof e) {
                var t = n.indexOf(s.methodMap, e.toLowerCase());
                e = t >= 0 ? t : parseInt(e, 10);
              }
              return e;
            },
            log: function (e) {
              if (
                ((e = s.lookupLevel(e)),
                "undefined" != typeof console && s.lookupLevel(s.level) <= e)
              ) {
                var t = s.methodMap[e];
                console[t] || (t = "log");
                for (
                  var a = arguments.length, n = Array(a > 1 ? a - 1 : 0), l = 1;
                  l < a;
                  l++
                )
                  n[l - 1] = arguments[l];
                console[t].apply(console, n);
              }
            },
          };
        (t.default = s), (e.exports = t.default);
      },
      (e, t) => {
        "use strict";
        function a(e) {
          this.string = e;
        }
        (t.__esModule = !0),
          (a.prototype.toString = a.prototype.toHTML =
            function () {
              return "" + this.string;
            }),
          (t.default = a),
          (e.exports = t.default);
      },
      (e, t, a) => {
        "use strict";
        (t.__esModule = !0),
          (t.checkRevision = function (e) {
            var t = (e && e[0]) || 1,
              a = o.COMPILER_REVISION;
            if (t !== a) {
              if (t < a) {
                var n = o.REVISION_CHANGES[a],
                  s = o.REVISION_CHANGES[t];
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
                  e[1] +
                  ").",
              );
            }
          }),
          (t.template = function (e, t) {
            if (!t) throw new i.default("No environment passed to template");
            if (!e || !e.main)
              throw new i.default("Unknown template object: " + typeof e);
            (e.main.decorator = e.main_d), t.VM.checkRevision(e.compiler);
            var a = {
              strict: function (e, t) {
                if (!(t in e))
                  throw new i.default('"' + t + '" not defined in ' + e);
                return e[t];
              },
              lookup: function (e, t) {
                for (var a = e.length, n = 0; n < a; n++)
                  if (e[n] && null != e[n][t]) return e[n][t];
              },
              lambda: function (e, t) {
                return "function" == typeof e ? e.call(t) : e;
              },
              escapeExpression: s.escapeExpression,
              invokePartial: function (a, n, l) {
                l.hash &&
                  ((n = s.extend({}, n, l.hash)), l.ids && (l.ids[0] = !0)),
                  (a = t.VM.resolvePartial.call(this, a, n, l));
                var o = t.VM.invokePartial.call(this, a, n, l);
                if (
                  (null == o &&
                    t.compile &&
                    ((l.partials[l.name] = t.compile(a, e.compilerOptions, t)),
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
              fn: function (t) {
                var a = e[t];
                return (a.decorator = e[t + "_d"]), a;
              },
              programs: [],
              program: function (e, t, a, n, s) {
                var l = this.programs[e],
                  i = this.fn(e);
                return (
                  t || s || n || a
                    ? (l = r(this, e, i, t, a, n, s))
                    : l || (l = this.programs[e] = r(this, e, i)),
                  l
                );
              },
              data: function (e, t) {
                for (; e && t--; ) e = e._parent;
                return e;
              },
              merge: function (e, t) {
                var a = e || t;
                return e && t && e !== t && (a = s.extend({}, t, e)), a;
              },
              nullContext: Object.seal({}),
              noop: t.VM.noop,
              compilerInfo: e.compiler,
            };
            function n(t) {
              var s =
                  arguments.length <= 1 || void 0 === arguments[1]
                    ? {}
                    : arguments[1],
                l = s.data;
              n._setup(s),
                !s.partial &&
                  e.useData &&
                  (l = (function (e, t) {
                    (t && "root" in t) ||
                      ((t = t ? o.createFrame(t) : {}).root = e);
                    return t;
                  })(t, l));
              var i = void 0,
                r = e.useBlockParams ? [] : void 0;
              function c(t) {
                return "" + e.main(a, t, a.helpers, a.partials, l, r, i);
              }
              return (
                e.useDepths &&
                  (i = s.depths
                    ? t != s.depths[0]
                      ? [t].concat(s.depths)
                      : s.depths
                    : [t]),
                (c = m(e.main, c, a, s.depths || [], l, r))(t, s)
              );
            }
            return (
              (n.isTop = !0),
              (n._setup = function (n) {
                n.partial
                  ? ((a.helpers = n.helpers),
                    (a.partials = n.partials),
                    (a.decorators = n.decorators))
                  : ((a.helpers = a.merge(n.helpers, t.helpers)),
                    e.usePartial &&
                      (a.partials = a.merge(n.partials, t.partials)),
                    (e.usePartial || e.useDecorators) &&
                      (a.decorators = a.merge(n.decorators, t.decorators)));
              }),
              (n._child = function (t, n, s, l) {
                if (e.useBlockParams && !s)
                  throw new i.default("must pass block params");
                if (e.useDepths && !l)
                  throw new i.default("must pass parent depths");
                return r(a, t, e[t], n, 0, s, l);
              }),
              n
            );
          }),
          (t.wrapProgram = r),
          (t.resolvePartial = function (e, t, a) {
            e
              ? e.call || a.name || ((a.name = e), (e = a.partials[e]))
              : (e =
                  "@partial-block" === a.name
                    ? a.data["partial-block"]
                    : a.partials[a.name]);
            return e;
          }),
          (t.invokePartial = function (e, t, a) {
            var n = a.data && a.data["partial-block"];
            (a.partial = !0),
              a.ids && (a.data.contextPath = a.ids[0] || a.data.contextPath);
            var l = void 0;
            a.fn &&
              a.fn !== c &&
              (function () {
                a.data = o.createFrame(a.data);
                var e = a.fn;
                (l = a.data["partial-block"] =
                  function (t) {
                    var a =
                      arguments.length <= 1 || void 0 === arguments[1]
                        ? {}
                        : arguments[1];
                    return (
                      (a.data = o.createFrame(a.data)),
                      (a.data["partial-block"] = n),
                      e(t, a)
                    );
                  }),
                  e.partials &&
                    (a.partials = s.extend({}, a.partials, e.partials));
              })();
            void 0 === e && l && (e = l);
            if (void 0 === e)
              throw new i.default(
                "The partial " + a.name + " could not be found",
              );
            if (e instanceof Function) return e(t, a);
          }),
          (t.noop = c);
        var n,
          s = (function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
              for (var a in e)
                Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
            return (t.default = e), t;
          })(a(62)),
          l = a(63),
          i = (n = l) && n.__esModule ? n : { default: n },
          o = a(61);
        function r(e, t, a, n, s, l, i) {
          function o(t) {
            var s =
                arguments.length <= 1 || void 0 === arguments[1]
                  ? {}
                  : arguments[1],
              o = i;
            return (
              !i ||
                t == i[0] ||
                (t === e.nullContext && null === i[0]) ||
                (o = [t].concat(i)),
              a(
                e,
                t,
                e.helpers,
                e.partials,
                s.data || n,
                l && [s.blockParams].concat(l),
                o,
              )
            );
          }
          return (
            ((o = m(a, o, e, i, n, l)).program = t),
            (o.depth = i ? i.length : 0),
            (o.blockParams = s || 0),
            o
          );
        }
        function c() {
          return "";
        }
        function m(e, t, a, n, l, i) {
          if (e.decorator) {
            var o = {};
            (t = e.decorator(t, o, a, n && n[0], l, i, n)), s.extend(t, o);
          }
          return t;
        }
      },
      (e, t, a) => {
        "use strict";
        (t.__esModule = !0),
          (t.default = function (e) {
            var t = void 0 !== a.g ? a.g : window,
              n = t.Handlebars;
            e.noConflict = function () {
              return t.Handlebars === e && (t.Handlebars = n), e;
            };
          }),
          (e.exports = t.default);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "O2IaOv/m",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-timeline-chart-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-timeline-chart-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-timeline-chart-component\\\\index.js\\" "],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        a(80);
        const s = a(81);
        e.exports = n.Ember.Component.extend({
          classNames: ["match-details-event-chart-component"],
          layout: a(82),
          draw: function (e) {
            const { events: t } = e.timelines,
              a = this.get("specs"),
              s = (function (e, t) {
                const a = t.width,
                  s = t.height,
                  { margin: l } = t,
                  i = s - l.top - l.bottom,
                  o = a - l.left - l.right,
                  r = n.d3.max(e, (e) => {
                    const t = n.Lodash.map(e.kills, "count");
                    return t.length ? n.Lodash.max(t) : 0;
                  }),
                  c = n.d3.scale
                    .linear()
                    .range([0, o])
                    .domain([0, e[e.length - 1].timestamp]),
                  m = n.d3.scale
                    .linear()
                    .range([t.pointRadius.min, t.pointRadius.max])
                    .domain([0, r]);
                return {
                  w: a,
                  h: s,
                  innerW: o,
                  innerH: i,
                  frameW: o / e.length,
                  frameH: t.frameHeight,
                  margin: l,
                  scale: { x: c, radius: m },
                };
              })(t, a),
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
                  const e = n.d3.mouse(this)[0];
                  n.d3
                    .selectAll(".vertical-rule-sync")
                    .attr("x1", e)
                    .attr("x2", e);
                }),
              i
                .append("svg:rect")
                .attr("width", s.innerW)
                .attr("height", s.innerH)
                .attr("class", "background-rect");
            const o = i
              .append("svg:g")
              .selectAll(".match-details-event-frame")
              .data(t)
              .enter()
              .append("svg:g")
              .filter((e) => e.kills.length + e.objectives.length > 0)
              .attr("class", "match-details-event-frame")
              .attr(
                "transform",
                (e) => "translate(" + s.scale.x(e.timestamp) + ", 0)",
              )
              .attr("tooltipData", (e) => JSON.stringify(e.details))
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
                .data((e) => e.kills)
                .enter()
                .append("svg:circle")
                .attr(
                  "class",
                  (e) =>
                    "match-details-event-kills data-point data-fill-" +
                    e.teamId,
                )
                .attr("cx", 0)
                .attr("cy", (e) => a.killDotsTransition.y(e.teamId))
                .attr("r", (e) => s.scale.radius(e.count)),
              o
                .selectAll(".match-details-event-objectives")
                .data((e) => e.objectives)
                .enter()
                .append("svg:foreignObject")
                .attr("x", 0)
                .attr("y", (e) => a.objectiveIconTransition.y(e.teamId))
                .append("xhtml:div")
                .attr(
                  "class",
                  (e) =>
                    `match-details-event-objectives event-icon-${e.objective}-${e.teamId}`,
                );
            const r =
              this.get("tra.MATCH_HISTORY_OVERVIEW_EVENT_OBJECTIVES_LABEL") +
              " / " +
              this.get("tra.MATCH_HISTORY_OVERVIEW_EVENT_KILLS_LABEL");
            for (let e = 0; e < 4; e++)
              l.append("svg:text")
                .attr("x", a.textPositions.x)
                .attr("y", a.textPositions.y[e])
                .attr("class", "match-details-event-label")
                .text(e % 2 == 0 ? r : "");
            this.createTooltip();
          },
          createTooltip: function () {
            const e = this.$("g.match-details-event-frame");
            n.Lodash.each(e, (e) => {
              const t = JSON.parse(e.attributes.tooltipData.value);
              n.TooltipManager.assign(
                e,
                s({ data: t }),
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
            const e = this.get("chartData");
            e && this.draw(e);
          },
        });
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        var n = a(59);
        e.exports = (n.default || n).template({
          1: function (e, t, a, n, s, l) {
            var i;
            return null !=
              (i = a.unless.call(
                null != t ? t : e.nullContext || {},
                null != (i = l[0][0]) ? i.isEmpty : i,
                {
                  name: "unless",
                  hash: {},
                  fn: e.program(2, s, 0, l),
                  inverse: e.noop,
                  data: s,
                  blockParams: l,
                },
              ))
              ? i
              : "";
          },
          2: function (e, t, a, n, s, l) {
            var i,
              o,
              r = null != t ? t : e.nullContext || {},
              c = a.helperMissing,
              m = "function",
              p = e.escapeExpression;
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
                fn: e.program(3, s, 1, l),
                inverse: e.noop,
                data: s,
                blockParams: l,
              }))
                ? i
                : "") +
              "        </div>\r\n      </div>\r\n"
            );
          },
          3: function (e, t, a, n, s, l) {
            var i,
              o = e.lambda,
              r = e.escapeExpression;
            return (
              '          <div class="event-tooltip-row">\r\n            <div class="event-tooltip-icon event-tooltip-killer event-icon-' +
              r(
                o(
                  null != (i = null != (i = l[0][0]) ? i.killer : i)
                    ? i.class
                    : i,
                  t,
                ),
              ) +
              '">\r\n              <div class="event-tooltip-icon-champion">\r\n                <div class="event-tooltip-icon-cover">\r\n                  <img src="' +
              r(
                o(
                  null != (i = null != (i = l[0][0]) ? i.killer : i)
                    ? i.imgSrc
                    : i,
                  t,
                ),
              ) +
              '" class="event-tooltip-icon-img ' +
              r(
                o(
                  null != (i = null != (i = l[0][0]) ? i.killer : i)
                    ? i.imgClass
                    : i,
                  t,
                ),
              ) +
              '"></img>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class="event-tooltip-kill-sign"></div>\r\n' +
              (null !=
              (i = a.each.call(
                null != t ? t : e.nullContext || {},
                null != (i = l[0][0]) ? i.victims : i,
                {
                  name: "each",
                  hash: {},
                  fn: e.program(4, s, 1, l),
                  inverse: e.noop,
                  data: s,
                  blockParams: l,
                },
              ))
                ? i
                : "") +
              "          </div>\r\n"
            );
          },
          4: function (e, t, a, n, s, l) {
            var i;
            return (
              '              <div class="event-tooltip-icon event-tooltip-victim event-icon-' +
              e.escapeExpression(
                e.lambda(null != (i = l[0][0]) ? i.class : i, t),
              ) +
              '">\r\n' +
              (null !=
              (i = a.if.call(
                null != t ? t : e.nullContext || {},
                null != (i = l[0][0]) ? i.isChampion : i,
                {
                  name: "if",
                  hash: {},
                  fn: e.program(5, s, 0, l),
                  inverse: e.noop,
                  data: s,
                  blockParams: l,
                },
              ))
                ? i
                : "") +
              "              </div>\r\n"
            );
          },
          5: function (e, t, a, n, s, l) {
            var i;
            return (
              '                <div class="event-tooltip-icon-champion">\r\n                  <div class="event-tooltip-icon-cover">\r\n                    <img src="' +
              e.escapeExpression(
                e.lambda(null != (i = l[1][0]) ? i.imgSrc : i, t),
              ) +
              '" class="event-tooltip-icon-img"></img>\r\n                  </div>\r\n                </div>\r\n'
            );
          },
          compiler: [7, ">= 4.0.0"],
          main: function (e, t, a, n, s, l) {
            var i;
            return (
              '<lol-uikit-tooltip>\r\n  <div class="match-details-event-tooltip">\r\n' +
              (null !=
              (i = a.each.call(
                null != t ? t : e.nullContext || {},
                null != t ? t.data : t,
                {
                  name: "each",
                  hash: {},
                  fn: e.program(1, s, 1, l),
                  inverse: e.noop,
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
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "5g6cmdpz",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-event-chart-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-event-chart-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-event-chart-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","match-details-event-bg-100"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","match-details-event-bg-200"],["flush-element"],["close-element"],["text","\\n"],["open-element","svg",[]],["static-attr","id","match-details-svg-defs"],["flush-element"],["text","\\n  "],["open-element","defs",[]],["flush-element"],["text","\\n    "],["open-element","filter",[]],["static-attr","id","match-details-brightness-filter"],["flush-element"],["text","\\n      "],["open-element","feComponentTransfer",[]],["flush-element"],["text","\\n        "],["open-element","feFuncR",[]],["static-attr","type","linear"],["static-attr","slope","3"],["flush-element"],["close-element"],["text","\\n        "],["open-element","feFuncG",[]],["static-attr","type","linear"],["static-attr","slope","3"],["flush-element"],["close-element"],["text","\\n        "],["open-element","feFuncB",[]],["static-attr","type","linear"],["static-attr","slope","3"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        a(84);
        const s = {
            death: { 100: a(85), 200: a(86) },
            tower: { 100: a(87), 200: a(88) },
            inhibitor: { 100: a(89), 200: a(90) },
            nexus: { 100: a(91), 200: a(92) },
          },
          l = { 11: a(93), 12: a(94), 21: a(95) };
        function i(e, t, a, s, l) {
          n.TooltipManager.assign(
            e,
            "MapTooltip",
            { timestamp: t, killerImgSrc: a, victimImgSrc: s, killerTeam: l },
            {
              ComponentFactory: n.ComponentFactory,
              type: "system",
              targetAnchor: { x: "center", y: "top" },
              tooltipAnchor: { x: "center", y: "bottom" },
            },
          );
        }
        e.exports = n.Ember.Component.extend({
          classNames: ["match-details-map-chart-component"],
          layout: a(96),
          displayType: "champion",
          displayPlayer: null,
          playerImgSrcMap: n.Ember.computed("teams", function () {
            const e = {};
            return (
              this.get("teams").forEach((t) => {
                t.forEach((t) => {
                  e[t.participantId] = t.imgSrc;
                });
              }),
              e
            );
          }),
          mapBg: n.Ember.computed("chartData.mapId", function () {
            const e = this.get("chartData");
            return e && e.mapId in l ? l[e.mapId] : null;
          }),
          draw: function (e) {
            const { mapsInfo: t } = e.timelines,
              a = n.Lodash.extend(this.get("specs"), {
                mapBg: this.get("mapBg"),
                images: s,
              }),
              l = a.mapDomains[e.mapId],
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
                .data(t.championKills)
                .enter()
                .append("svg:circle")
                .attr(
                  "id",
                  (e) => "champkill_" + e.timestamp + "_" + e.victimId,
                )
                .attr("cx", (e) => o(e.position.x))
                .attr("cy", (e) => r(e.position.y))
                .attr("r", a.circleR)
                .attr(
                  "class",
                  (e) =>
                    `map-data champion-event champion-kill player-${e.playerId} data-fill-${e.teamId}`,
                )
                .attr("display", "none"),
              i
                .append("svg:g")
                .attr("class", "champion-deaths")
                .selectAll("champion-death")
                .data(t.championDeaths)
                .enter()
                .append("svg:image")
                .attr(
                  "id",
                  (e) => "championDeath_" + e.timestamp + "_" + e.playerId,
                )
                .attr("xlink:href", (e) => a.images.death[e.teamId])
                .attr("x", (e) => o(e.position.x) - a.iconW / 2)
                .attr("y", (e) => r(e.position.y) - a.iconH / 2)
                .attr("width", a.iconW)
                .attr("height", a.iconH)
                .attr(
                  "class",
                  (e) =>
                    `map-data champion-event champion-death player-${e.playerId}`,
                )
                .attr("display", "none"),
              i
                .append("svg:g")
                .attr("class", "building-kills")
                .selectAll("building-kill")
                .data(t.buildingKills)
                .enter()
                .append("svg:image")
                .attr(
                  "id",
                  (e) => "buildingKill_" + e.timestamp + "_" + e.playerId,
                )
                .attr("xlink:href", (e) => a.images[e.display][e.teamId])
                .attr("x", (e) => o(e.position.x) - a.iconW / 2)
                .attr("y", (e) => r(e.position.y) - a.iconH / 2)
                .attr("width", a.iconW)
                .attr("height", a.iconH)
                .attr(
                  "class",
                  (e) => `map-data building-kill player-${e.playerId}`,
                )
                .attr("display", "none"),
              this.addTooltips(t);
          },
          addTooltips: function (e) {
            const t = i.bind(this);
            e.championKills.forEach((e) => {
              const { timestamp: a } = e,
                { victimId: s } = e,
                l = this.get("playerImgSrcMap")[e.playerId],
                i = this.get("playerImgSrcMap")[e.victimId],
                o = this.$().find(`#champkill_${a}_${s}`)[0];
              t(o, e.timestamp, l, i, e.teamId), n.TooltipManager.disable(o);
            }),
              e.championDeaths.forEach((e) => {
                const { timestamp: a } = e,
                  { playerId: s } = e,
                  l = this.get("playerImgSrcMap")[e.killerId],
                  i = this.get("playerImgSrcMap")[e.playerId],
                  o = this.$().find(`#championDeath_${a}_${s}`)[0];
                t(o, e.timestamp, l, i, e.killerTeamId),
                  n.TooltipManager.disable(o);
              }),
              e.buildingKills.forEach((e) => {
                const { timestamp: a } = e,
                  { playerId: s } = e,
                  l = this.get("playerImgSrcMap")[e.playerId],
                  i = this.$().find(`#buildingKill_${a}_${s}`)[0];
                t(i, e.timestamp, l, void 0, e.killerTeamId),
                  n.TooltipManager.disable(i);
              });
          },
          resetVisibility: function () {
            const e = (function (e, t) {
                const a = "champion" === e;
                return t
                  ? `.player-${t}${a ? ".champion-event" : ".building-kill"}`
                  : a
                    ? ".champion-kill"
                    : ".building-kill";
              })(this.get("displayType"), this.get("displayPlayer")),
              t = this.$().find(".map-show");
            for (let e = 0; e < t.length; e++) n.TooltipManager.disable(t[e]);
            n.d3
              .selectAll(this.$(".map-show"))
              .classed("map-show", !1)
              .style("display", "none");
            const a = this.$().find(e);
            for (let e = 0; e < a.length; e++) n.TooltipManager.enable(a[e]);
            n.d3
              .selectAll(this.$(e))
              .classed("map-show", !0)
              .style("display", "inline");
          },
          actions: {
            selectMapChart: function (e) {
              this.set("displayType", e), this.resetVisibility();
            },
            toggleChampDisplay: function (e) {
              const t = this.get("displayPlayer") === e ? null : e;
              this.set("displayPlayer", t);
              const a = this.get("teams");
              n.Lodash.each(a, (e) => {
                n.Lodash.each(e, (e) => {
                  n.Ember.set(e, "disabled", t && e.participantId !== t);
                });
              }),
                this.resetVisibility();
            },
          },
          didInsertElement: function () {
            const e = this.get("chartData");
            if (e && this.get("mapBg")) {
              const t = this.get("chartData.ownerId");
              let a = n.Lodash.groupBy(e.participants, "teamId");
              (a = n.Lodash.sortBy(a, function (e) {
                return n.Lodash.find(e, (e) => e.participantId === t) ? -1 : 1;
              })),
                this.set("ownerTeamId", a[0][0].teamId),
                this.set("teams", a),
                this.draw(e),
                this.resetVisibility(),
                this.$(".map-type-selector")[0].refreshSelected();
            }
          },
        });
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        "use strict";
        e.exports = a.p + "dead_blue.png";
      },
      (e, t, a) => {
        "use strict";
        e.exports = a.p + "dead_red.png";
      },
      (e, t, a) => {
        "use strict";
        e.exports = a.p + "tower_building_blue.png";
      },
      (e, t, a) => {
        "use strict";
        e.exports = a.p + "tower_building_red.png";
      },
      (e, t, a) => {
        "use strict";
        e.exports = a.p + "inhibitor_building_blue.png";
      },
      (e, t, a) => {
        "use strict";
        e.exports = a.p + "inhibitor_building_red.png";
      },
      (e, t, a) => {
        "use strict";
        e.exports = a.p + "nexus_building_blue.png";
      },
      (e, t, a) => {
        "use strict";
        e.exports = a.p + "nexus_building_red.png";
      },
      (e, t, a) => {
        "use strict";
        e.exports = a.p + "map11.png";
      },
      (e, t, a) => {
        "use strict";
        e.exports = a.p + "map12.png";
      },
      (e, t, a) => {
        "use strict";
        e.exports = a.p + "map21.png";
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "tMfIdabI",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-map-chart-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-map-chart-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\match-details-map-chart-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["mapBg"]]],null,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","div",[]],["dynamic-attr","class",["concat",["map-champ-toggle team-",["get",["index"]]," ",["helper",["if"],[["get",["player","disabled"]],"map-toggle-disabled"],null]]]],["modifier",["action"],[["get",[null]],"toggleChampDisplay",["get",["player","participantId"]]]],["flush-element"],["text","\\n            "],["open-element","img",[]],["dynamic-attr","src",["unknown",["player","imgSrc"]],null],["static-attr","class","map-champ-toggle-img"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":["player"]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["map-champ-toggles team-",["get",["index"]]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["team"]]],null,0],["text","      "],["close-element"],["text","\\n"]],"locals":["index","team"]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","map-chart-header"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-flat-dropdown",[]],["static-attr","class","match-details-timeline-chart-dropdown map-type-selector"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","class","map-selector-option"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectMapChart","champion"],null],null],["flush-element"],["text","\\n        "],["append",["unknown",["tra","MATCH_HISTORY_OVERVIEW_MAP_CHAMPION_KILLS_OPTION"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","class","map-selector-option"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectMapChart","building"],null],null],["flush-element"],["text","\\n        "],["append",["unknown",["tra","MATCH_HISTORY_OVERVIEW_MAP_BUILDING_KILLS_OPTION"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","map-svg-wrapper"],["flush-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","map-champ-toggle-container"],["flush-element"],["text","\\n    "],["open-element","ul",[]],["flush-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["each"],[["helper",["-each-in"],[["get",["teams"]]],null]],null,1],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = (function (e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var a = s(t);
          if (a && a.has(e)) return a.get(e);
          var n = {},
            l = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in e)
            if ("default" !== i && Object.prototype.hasOwnProperty.call(e, i)) {
              var o = l ? Object.getOwnPropertyDescriptor(e, i) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(n, i, o)
                : (n[i] = e[i]);
            }
          (n.default = e), a && a.set(e, n);
          return n;
        })(a(1));
        function s(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            a = new WeakMap();
          return (s = function (e) {
            return e ? a : t;
          })(e);
        }
        a(98);
        const l = n.Ember.Component.extend({
          layout: a(99),
          classNames: ["map-tooltip"],
          victimTeam: n.Ember.computed("killerTeam", function () {
            return 300 - this.get("killerTeam");
          }),
          formattedTime: n.Ember.computed("timestamp", function () {
            const e = Math.floor(this.get("timestamp") / 6e4),
              t = ((this.get("timestamp") % 6e4) / 1e3).toFixed(0);
            return 60 === t
              ? e + 1 + ":00"
              : t < 10
                ? e + ":0" + t
                : e + ":" + t;
          }),
        });
        n.default &&
          n.default.EmberApplicationFactory.setFactoryDefinition({
            name: "MapTooltip",
            MapTooltipComponent: l,
            ComponentFactory: n.default.ComponentFactory,
          }),
          (e.exports = l);
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "jIABiFJQ",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\map-tooltip-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\map-tooltip-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\overview\\\\map-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","match-details-map-event-tooltip"],["flush-element"],["text","\\t  \\n    "],["open-element","div",[]],["static-attr","class","map-event-tooltip-row"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","map-event-tooltip-icon"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["map-event-tooltip-icon-champion map-event-team-color-",["unknown",["killerTeam"]]]]],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","map-event-tooltip-icon-cover"],["flush-element"],["text","\\n"],["block",["if"],[["get",["killerImgSrc"]]],null,3,2],["text","          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","map-event-tooltip-kill-sign"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["victimImgSrc"]]],null,1,0],["text","      "],["open-element","span",[]],["static-attr","class","map-event-tooltip-timestamp"],["flush-element"],["append",["unknown",["formattedTime"]],false],["close-element"],["text","\\n    "],["close-element"],["text","  \\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","span",[]],["dynamic-attr","class",["concat",["map-event-icon-tower-",["unknown",["victimTeam"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","map-event-tooltip-icon"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["map-event-tooltip-icon-champion map-event-team-color-",["unknown",["victimTeam"]]]]],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","map-event-tooltip-icon-cover"],["flush-element"],["text","\\n            "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["victimImgSrc"]]]]],["static-attr","class","map-event-tooltip-icon-img"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","img",[]],["dynamic-attr","class",["concat",["map-event-tooltip-icon-img map-event-icon-minions-",["unknown",["killerTeam"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["killerImgSrc"]]]]],["static-attr","class","map-event-tooltip-icon-img"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1),
          s = a(101),
          l = a(104);
        function i(e) {
          const t = {
            kills: 0,
            assists: 0,
            minionsPlusNeutralMonstersCount: 0,
            goldEarned: 0,
          };
          return (
            n.Lodash.each(e, (e) => {
              n.Lodash.each(
                [
                  "kills",
                  "assists",
                  "minionsPlusNeutralMonstersCount",
                  "goldEarned",
                ],
                (a) => {
                  e[a] > t[a] && (t[a] = e[a]);
                },
              );
            }),
            t
          );
        }
        a(105),
          (e.exports = n.Ember.Component.extend({
            classNames: ["match-details-scoreboard-component"],
            layout: a(106),
            subteams: n.Ember.computed(
              "currentParticipant",
              "gameData",
              "hasObjectives",
              function () {
                const e = this.get("champions"),
                  t = this.get("gameData"),
                  a = this.get("hasObjectives"),
                  o = this.get("currentParticipant"),
                  r = this.get("tra");
                n.logger.trace(`Loading teams for game ID ${t.gameId}`);
                let c = (0, s.buildTeamsFromSubteams)(t, e, o);
                return (
                  n.Lodash.each(c, (s) => {
                    (s.hasBansOrObjectives = s.hasBans || a),
                      (s.placementDisplayText = r.formatString(
                        l.MODE_PLACEMENT_TRA_KEY + s.placement,
                      ));
                    const o = l.GAME_MODES_WITH_SUBTEAMS[
                      t.gameMode
                    ].subteams.find((e) => e.subteamId === s.subteamId);
                    if (o) {
                      const e = o.display;
                      (s.teamNameDisplayText = r.get(e.label)),
                        (s.teamIcon = e.icon);
                    }
                    const c = i(s.participants);
                    n.Lodash.each(s.participants, (e) => {
                      (e.mostKills = e.kills === c.kills),
                        (e.mostAssists = e.assists === c.assists),
                        (e.mostMinionKills =
                          e.minionsPlusNeutralMonstersCount ===
                          c.minionsPlusNeutralMonstersCount),
                        (e.mostGoldEarned = e.goldEarned === c.goldEarned);
                    }),
                      n.Lodash.each(
                        s.bans,
                        (t) =>
                          (t.squarePortraitPath = e.get(
                            t.championId,
                          ).squarePortraitPath),
                      );
                  }),
                  (c = c.sort(function (e, t) {
                    return e.placement - t.placement;
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
                const e = this.get("champions"),
                  t = this.get("gameData"),
                  a = this.get("hasObjectives"),
                  l = this.get("currentParticipant");
                n.logger.trace(`Loading teams for game ID ${t.gameId}`);
                let o = (0, s.buildTeams)(t, e, l);
                return (
                  n.Lodash.each(o, (t) => {
                    t.hasBansOrObjectives = t.hasBans || a;
                    const s = i(t.participants);
                    n.Lodash.each(t.participants, (e) => {
                      (e.mostKills = e.kills === s.kills),
                        (e.mostAssists = e.assists === s.assists),
                        (e.mostMinionKills =
                          e.minionsPlusNeutralMonstersCount ===
                          s.minionsPlusNeutralMonstersCount),
                        (e.mostGoldEarned = e.goldEarned === s.goldEarned);
                    }),
                      n.Lodash.each(
                        t.bans,
                        (t) =>
                          (t.squarePortraitPath = e.get(
                            t.championId,
                          ).squarePortraitPath),
                      );
                  }),
                  (o = n.Lodash.sortBy(o, function (e) {
                    return e.teamId === l.teamId ? -1 : 0;
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
              const e = this.get("tra"),
                t = this.get("hasBans"),
                a = this.get("hasObjectives");
              let n = "";
              return (
                t && a
                  ? (n = "MATCH_DETAILS_BAN_AND_OBJECTIVES")
                  : a
                    ? (n = "MATCH_DETAILS_OBJECTIVES")
                    : t && (n = "MATCH_DETAILS_BAN"),
                e.get(n)
              );
            }),
            removeAnimationWhenDone: n.Ember.on(
              "didInsertElement",
              function () {
                const e = this.get("isHexakill")
                    ? ".match-details-team-container-hexakill"
                    : ".match-details-team-container",
                  t = n.Ember.$(this.element).find(e)[0];
                t.addEventListener("webkitAnimationEnd", function (e) {
                  e.target === t &&
                    "fade-in" === e.animationName &&
                    t.classList.remove("match-details-loading-fade-in");
                });
              },
            ),
          }));
      },
      (e, t, a) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.buildTeams = function (e, t, a) {
            const {
              gameId: s,
              teams: i,
              participants: o,
              participantIdentities: r,
            } = e;
            let c = [];
            i
              ? (c = i.map((e) => {
                  const n = (0, l.fromJson)(e, o, r, t);
                  return n.teamId === a.teamId && n.set("isFirstTeam", !0), n;
                }))
              : (n.logger.error(
                  `Could not load details for game ID ${s} - details are empty or incomplete`,
                ),
                n.logger.trace(
                  `Details fo game ID ${s}: ${JSON.stringify(e)}`,
                ));
            return (
              (c = c.filter((e) => e.participants.length > 0)), n.Ember.A(c)
            );
          }),
          (t.buildTeamsFromSubteams = function (e, t, a) {
            const {
              gameId: l,
              teams: i,
              participants: o,
              participantIdentities: r,
            } = e;
            let c = [];
            o
              ? (o.forEach(function (e) {
                  const t = e.playerSubteamId;
                  if (!c.find((t) => t.subteamId === e.playerSubteamId)) {
                    const a = {};
                    (a.subteamId = t),
                      (a.teamId = t),
                      (a.placement = e.subteamPlacement),
                      (a.hasBans = !1),
                      a.placement <= 1 &&
                        ((a.bans = i[0].bans), (a.hasBans = !0)),
                      c.push(a);
                  }
                }),
                (c = c.map((e) => {
                  const n = (0, s.fromJson)(e, o, r, t);
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
                  `Details fo game ID ${l}: ${JSON.stringify(e)}`,
                ));
            return (
              (c = c.filter((e) => e.participants.length > 0)), n.Ember.A(c)
            );
          });
        var n = a(1),
          s = a(102),
          l = a(103);
      },
      (e, t, a) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.fromJson = function (e, t, a, n) {
            const o = t
                .filter((t) => t.playerSubteamId === e.subteamId)
                .map((e) => {
                  const t = a.find((t) => t.participantId === e.participantId),
                    i = new l.default(e, t),
                    o = n.get(i.championId);
                  return (
                    (i.titleInfo = {
                      title: o.name,
                      subTitle: s.Lodash.get(t, "player.displayName", o.name),
                    }),
                    i
                  );
                }),
              r = e.bans ? e.bans.map((e) => s.Ember.Object.create(e)) : [];
            return i.create({
              participants: s.Ember.A(o),
              teamId: e.teamId,
              towerKills: e.towerKills,
              inhibitorKills: e.inhibitorKills,
              baronKills: e.baronKills,
              dragonKills: e.dragonKills,
              vilemawKills: e.vilemawKills,
              riftHeraldKills: e.riftHeraldKills,
              bans: s.Ember.A(r),
              victory: "Win" === e.win,
              subteamId: e.subteamId,
              placement: e.placement,
            });
          });
        var n,
          s = a(1),
          l = (n = a(12)) && n.__esModule ? n : { default: n };
        const i = s.Ember.Object.extend({
          teamId: 0,
          towerKills: 0,
          inhibitorKills: 0,
          baronKills: 0,
          dragonKills: 0,
          vilemawKills: 0,
          riftHeraldKills: 0,
          victory: !1,
          isFirstTeam: !1,
          participants: s.Ember.A(),
          bans: s.Ember.A(),
          color: s.Ember.computed("isFirstTeam", function () {
            return this.get("isFirstTeam") ? "blue" : "red";
          }),
          kills: s.Ember.computed("participants.[]", function () {
            return s.Lodash.sum(
              this.get("participants").map((e) => e.stats.kills),
            );
          }),
          deaths: s.Ember.computed("participants.[]", function () {
            return s.Lodash.sum(
              this.get("participants").map((e) => e.stats.deaths),
            );
          }),
          assists: s.Ember.computed("participants.[]", function () {
            return s.Lodash.sum(
              this.get("participants").map((e) => e.stats.assists),
            );
          }),
          gold: s.Ember.computed("participants.[]", function () {
            return s.Lodash.sum(
              this.get("participants").map((e) => e.stats.goldEarned),
            );
          }),
          hasBans: s.Ember.computed.gt("bans.length", 0),
        });
      },
      (e, t, a) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0),
          (t.fromJson = function (e, t, a, n) {
            const o = t
                .filter((t) => t.teamId === e.teamId)
                .map((e) => {
                  const t = a.find((t) => t.participantId === e.participantId),
                    i = new l.default(e, t),
                    o = n.get(i.championId);
                  return (
                    (i.titleInfo = {
                      title: o.name,
                      subTitle: s.Lodash.get(t, "player.displayName", o.name),
                    }),
                    i
                  );
                }),
              r = e.bans.map((e) => s.Ember.Object.create(e));
            return i.create({
              participants: s.Ember.A(o),
              teamId: e.teamId,
              towerKills: e.towerKills,
              inhibitorKills: e.inhibitorKills,
              baronKills: e.baronKills,
              dragonKills: e.dragonKills,
              vilemawKills: e.vilemawKills,
              riftHeraldKills: e.riftHeraldKills,
              bans: s.Ember.A(r),
              victory: "Win" === e.win,
            });
          });
        var n,
          s = a(1),
          l = (n = a(12)) && n.__esModule ? n : { default: n };
        const i = s.Ember.Object.extend({
          teamId: 0,
          towerKills: 0,
          inhibitorKills: 0,
          baronKills: 0,
          dragonKills: 0,
          vilemawKills: 0,
          riftHeraldKills: 0,
          victory: !1,
          isFirstTeam: !1,
          participants: s.Ember.A(),
          bans: s.Ember.A(),
          color: s.Ember.computed("isFirstTeam", function () {
            return this.get("isFirstTeam") ? "blue" : "red";
          }),
          kills: s.Ember.computed("participants.[]", function () {
            return s.Lodash.sum(
              this.get("participants").map((e) => e.stats.kills),
            );
          }),
          deaths: s.Ember.computed("participants.[]", function () {
            return s.Lodash.sum(
              this.get("participants").map((e) => e.stats.deaths),
            );
          }),
          assists: s.Ember.computed("participants.[]", function () {
            return s.Lodash.sum(
              this.get("participants").map((e) => e.stats.assists),
            );
          }),
          gold: s.Ember.computed("participants.[]", function () {
            return s.Lodash.sum(
              this.get("participants").map((e) => e.stats.goldEarned),
            );
          }),
          hasBans: s.Ember.computed.gt("bans.length", 0),
        });
        var o = i;
        t.default = o;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.MODE_PLACEMENT_TRA_KEY =
            t.GAME_MODES_WITH_SUBTEAMS =
            t.GAME_MODES_WITHOUT_OBJECTIVES =
              void 0);
        t.MODE_PLACEMENT_TRA_KEY = "MATCH_HISTORY_MODE_PLACEMENT_";
        t.GAME_MODES_WITH_SUBTEAMS = {
          CHERRY: {
            subteams: [
              {
                subteamId: 1,
                display: {
                  label: "MATCH_HISTORY_SUBTEAM_DISPLAY_NAME_PORO",
                  icon: "/fe/lol-match-history/images/subteams/poro.svg",
                },
              },
              {
                subteamId: 2,
                display: {
                  label: "MATCH_HISTORY_SUBTEAM_DISPLAY_NAME_MINION",
                  icon: "/fe/lol-match-history/images/subteams/minion.svg",
                },
              },
              {
                subteamId: 3,
                display: {
                  label: "MATCH_HISTORY_SUBTEAM_DISPLAY_NAME_SCUTTLE",
                  icon: "/fe/lol-match-history/images/subteams/scuttle.svg",
                },
              },
              {
                subteamId: 4,
                display: {
                  label: "MATCH_HISTORY_SUBTEAM_DISPLAY_NAME_KRUG",
                  icon: "/fe/lol-match-history/images/subteams/krug.svg",
                },
              },
            ],
          },
        };
        t.GAME_MODES_WITHOUT_OBJECTIVES = ["CHERRY"];
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "Htfktm4+",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\match-details-scoreboard-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\match-details-scoreboard-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\match-details-scoreboard-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["isHexakill"]],"match-details-team-container-hexakill","match-details-team-container"],null]," match_details_clearfix ",["helper",["if"],[["get",["isTransitioning"]],"match-details-loading-hide","match-details-loading-fade-in"],null]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["teams"]]],null,10],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["append",["helper",["match-details-team-objectives"],null,[["team","mapId","gameTimeline"],[["get",["t"]],["get",["gameData","mapId"]],["get",["gameTimeline"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","match-details-banned-item"],["flush-element"],["text","\\n                  "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["ban","squarePortraitPath"]]]]],["static-attr","alt",""],["static-attr","class","match-details-banned-img"],["flush-element"],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","match-details-banned-top"],["flush-element"],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","match-details-banned-btm"],["flush-element"],["close-element"],["text","\\n                "],["close-element"],["text","\\n"]],"locals":["ban"]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","match-details-banned-wrapper"],["flush-element"],["text","\\n"],["block",["each"],[["get",["t","bans"]]],[["key"],["championId"]],2,1],["text","            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["dynamic-attr","class",["concat",["match-details-right-title match_details_",["unknown",["t","color"]]]]],["flush-element"],["append",["unknown",["rightTitleText"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["t","hasBans"]]],null,3],["block",["if"],[["get",["hasObjectives"]]],null,0]],"locals":[]},{"statements":[["text","            "],["append",["helper",["player-history-row"],null,[["currentParticipant","participant","titleInfo","showSpellTooltip","showItemTooltip","team","augments","champions","items","spells","runes","displayTooltip","mapId","gameId","queueId","gameCreation","localPuuid"],[["get",["currentParticipant"]],["get",["p"]],["get",["p","titleInfo"]],true,true,["get",["t"]],["get",["augments"]],["get",["champions"]],["get",["items"]],["get",["spells"]],["get",["runes"]],true,["get",["gameData","mapId"]],["get",["gameData","gameId"]],["get",["gameData","queueId"]],["get",["gameData","gameCreation"]],["get",["localPuuid"]]]]],false],["text","\\n"]],"locals":["p"]},{"statements":[["text","            "],["append",["helper",["match-details-team-data"],null,[["team","gameMode","queueId"],[["get",["t"]],["get",["gameData","gameMode"]],["get",["gameData","queueId"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","match-details-subteam-data"],["flush-element"],["text","\\n              "],["append",["helper",["match-details-team-data"],null,[["team","gameMode","queueId"],[["get",["t"]],["get",["gameData","gameMode"]],["get",["gameData","queueId"]]]]],false],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","match-details-team-name"],["flush-element"],["text","\\n              "],["append",["helper",["if"],[["get",["t","isFirstTeam"]],["get",["tra","MATCH_HISTORY_MATCH_RESULT_TEAM_1_LABEL"]],["get",["tra","MATCH_HISTORY_MATCH_RESULT_TEAM_2_LABEL"]]],null],false],["text","\\n            "],["close-element"],["text","  \\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","match-details-subteam-container"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","match-details-subteam-placement"],["flush-element"],["text","\\n                "],["append",["unknown",["t","placementDisplayText"]],false],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","match-details-subteam-display-data"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","match-details-subteam-icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["t","teamIcon"]],")"]]],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","match-details-subteam-name"],["flush-element"],["text","\\n                  "],["append",["unknown",["t","teamNameDisplayText"]],false],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-team-wrapper"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-left-wrapper"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["match-details-team-header match_details_",["unknown",["t","color"]]," match_details_clearfix"]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["isGameModeWithSubteams"]]],null,9,8],["block",["if"],[["get",["isGameModeWithSubteams"]]],null,7,6],["text","        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-details-team-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["t","participants"]]],null,5],["text","        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["t","hasBansOrObjectives"]]],null,4],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["t"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        a(108);
        var s = i(a(9)),
          l = i(a(109));
        function i(e) {
          return e && e.__esModule ? e : { default: e };
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
        function p(e, t) {
          n.TooltipManager.assign(
            e,
            "ScoreboardTooltip",
            { traString: t, tra: this.get("tra") },
            {
              ComponentFactory: n.ComponentFactory,
              type: "system",
              targetAnchor: { x: "center", y: "top" },
              tooltipAnchor: { x: "center", y: "bottom" },
            },
          );
        }
        e.exports = n.Ember.Component.extend({
          classNames: ["match-details-team-data-component"],
          layout: a(110),
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
              const e = this.get("teamKdaOverride.scoreStat");
              if (!e) return;
              const t = this.get(`team.participants.0.stats.${e}`) || 0;
              return s.default.formatGold(
                t,
                this.get("tra.metadata.locale.id"),
              );
            },
          ),
          teamScoreGrade: n.Ember.computed(
            "team.participants.0.stats.playerScore1",
            "teamKdaOverride.gradeStat",
            function () {
              const e = this.get("teamKdaOverride.gradeStat");
              if (e) {
                const t =
                  this.get(`team.participants.0.stats.${e}`) || o.length;
                return o[t - 1];
              }
            },
          ),
          formattedTeamGold: n.Ember.computed(
            "team",
            "tra.metadata.locale.id",
            function () {
              const e = this.get("tra.metadata.locale.id"),
                t = this.get("team.gold");
              return s.default.formatGold(t, e);
            },
          ),
          setupTooltip: n.Ember.on("didInsertElement", function () {
            const e = p.bind(this);
            if (this.get("teamKdaOverride")) {
              e(
                n.Ember.$(this.element).find(
                  "." + this.get("teamKdaOverride.styleClass"),
                )[0],
                this.get("teamKdaOverride.traKey"),
              );
            } else {
              e(
                n.Ember.$(this.element).find(".match-details-team-kill")[0],
                "MATCH_HISTORY_SCOREBOARD_TEAM_KDA",
              );
            }
            const t = n.Ember.$(this.element).find(
                ".match-details-team-gold",
              )[0],
              a = n.Ember.$(this.element).find(
                ".match-details-team-kill-icon",
              )[0];
            if (this.get("playerCSOverride")) {
              e(
                n.Ember.$(this.element).find(
                  "." + this.get("playerCSOverride.styleClass"),
                ),
                this.get("playerCSOverride.traKey"),
              );
            } else {
              e(
                n.Ember.$(this.element).find(".match-details-team-cs-icon")[0],
                "MATCH_HISTORY_SCOREBOARD_CS_ICON",
              );
            }
            if (this.get("playerGoldOverride")) {
              e(
                n.Ember.$(this.element).find(
                  "." + this.get("playerGoldOverride.styleClass"),
                ),
                this.get("playerGoldOverride.traKey"),
              );
            } else {
              e(
                n.Ember.$(this.element).find(
                  ".match-details-team-gold-icon",
                )[0],
                "MATCH_HISTORY_SCOREBOARD_GOLD_ICON",
              );
            }
            e(t, "MATCH_HISTORY_SCOREBOARD_TEAM_GOLD"),
              e(a, "MATCH_HISTORY_SCOREBOARD_KDA_ICON");
          }),
        });
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        t.default = { GAME_MODES_WITHOUT_CS: ["CHERRY"] };
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "I+w7/1so",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\match-details-team-data-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\match-details-team-data-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\match-details-team-data-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","match-details-team-data"],["flush-element"],["text","\\n"],["block",["if"],[["get",["teamKdaOverride"]]],null,8,5],["text","  "],["open-element","div",[]],["static-attr","class","match-details-team-right"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-details-team-gold"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-details-team-gold-count"],["flush-element"],["append",["unknown",["formattedTeamGold"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-details-team-gold-coin"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["match-details-team-kill-icon ",["helper",["if"],[["get",["isGameModeWithCS"]],"","match-details-team-kill-icon-no-cs"],null]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isGameModeWithCS"]]],null,4],["block",["if"],[["get",["playerGoldOverride"]]],null,1,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","match-details-team-gold-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["unknown",["playerGoldOverride","styleClass"]],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","match-details-team-cs-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["unknown",["playerCSOverride","styleClass"]],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["playerCSOverride"]]],null,3,2]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-team-kill"],["flush-element"],["text","\\n      "],["append",["unknown",["team","kills"]],false],["open-element","span",[]],["static-attr","class","match-details-team-k-break"],["flush-element"],["text","/"],["close-element"],["append",["unknown",["team","deaths"]],false],["open-element","span",[]],["static-attr","class","match-details-team-k-break"],["flush-element"],["text","/"],["close-element"],["append",["unknown",["team","assists"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["unknown",["teamScore"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["unknown",["teamScoreGrade"]],false],["open-element","span",[]],["static-attr","class","match-details-team-score-break"],["flush-element"],["close-element"],["text","("],["append",["unknown",["teamScore"]],false],["text",")\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["unknown",["teamKdaOverride","styleClass"]],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["teamKdaOverride","gradeStat"]]],null,7,6],["text","    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        function s(e, t, a = "ScoreboardTooltip", s = null) {
          n.TooltipManager.assign(
            e,
            a,
            { traString: t, data: s, tra: this.get("tra") },
            {
              ComponentFactory: n.ComponentFactory,
              type: "system",
              targetAnchor: { x: "center", y: "top" },
              tooltipAnchor: { x: "center", y: "bottom" },
            },
          );
        }
        a(112);
        const l = {
          AIR_DRAGON: "air-dragon",
          EARTH_DRAGON: "earth-dragon",
          FIRE_DRAGON: "fire-dragon",
          WATER_DRAGON: "water-dragon",
          ELDER_DRAGON: "elder-dragon",
        };
        e.exports = n.Ember.Component.extend({
          classNames: ["match-details-team-objectives-component"],
          layout: a(113),
          showTower: !n.Ember.computed.equal("mapId", 30),
          showInhib: !n.Ember.computed.equal("mapId", 30),
          showBaron: n.Ember.computed.equal("mapId", 11),
          showDragon: n.Ember.computed.equal("mapId", 11),
          showVilemaw: n.Ember.computed.equal("mapId", 10),
          showRiftHerald: n.Ember.computed(
            "mapId",
            "team.riftHeraldKills",
            function () {
              return (
                11 === this.get("mapId") &&
                void 0 !== this.get("team.riftHeraldKills")
              );
            },
          ),
          participantMap: n.Ember.computed("team.participants", function () {
            const e = {};
            return (
              this.get("team.participants").forEach((t) => {
                e[t.participantId] = !0;
              }),
              e
            );
          }),
          elementalData: n.Ember.computed("gameTimeline", function () {
            const e = [];
            if (
              this.get("team.dragonKills") > 0 &&
              this.get("gameTimeline.frames")
            ) {
              const t = this.get("participantMap"),
                a = this.get("gameTimeline.frames");
              for (let n = 0; n < a.length; n++) {
                const { events: s } = a[n];
                if (s)
                  for (let a = 0; a < s.length; a++) {
                    const n = s[a];
                    l[n.monsterSubType] &&
                      t[n.killerId] &&
                      e.push(l[n.monsterSubType]);
                  }
              }
            }
            return e;
          }),
          setupTooltip: n.Ember.on("didInsertElement", function () {
            const e = s.bind(this);
            e(
              n.Ember.$(this.element).find(".tower-icon")[0],
              "MATCH_HISTORY_SCOREBOARD_OBJECTIVE_TOWER",
            );
            if (
              (e(
                n.Ember.$(this.element).find(".inhibitor-icon")[0],
                "MATCH_HISTORY_SCOREBOARD_OBJECTIVE_INHIBITOR",
              ),
              this.get("showBaron"))
            ) {
              e(
                n.Ember.$(this.element).find(".baron-icon")[0],
                "MATCH_HISTORY_SCOREBOARD_OBJECTIVE_BARON",
              );
            }
            if (this.get("showDragon")) {
              e(
                n.Ember.$(this.element).find(".dragon-icon")[0],
                "MATCH_HISTORY_SCOREBOARD_OBJECTIVE_DRAGON",
                "ElementalTooltip",
                this.get("elementalData"),
              );
            }
            if (this.get("showRiftHerald")) {
              e(
                n.Ember.$(this.element).find(".rift-herald-icon")[0],
                "MATCH_HISTORY_SCOREBOARD_OBJECTIVE_RIFT_HERALD",
              );
            }
            if (this.get("showVilemaw")) {
              e(
                n.Ember.$(this.element).find(".vilemaw-icon")[0],
                "MATCH_HISTORY_SCOREBOARD_OBJECTIVE_VILEMAW",
              );
            }
          }),
        });
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "maMsME6F",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\match-details-team-objectives-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\match-details-team-objectives-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\match-details-team-objectives-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","match-details-right-data"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showTower"]]],null,5],["block",["if"],[["get",["showInhib"]]],null,4],["block",["if"],[["get",["showBaron"]]],null,3],["block",["if"],[["get",["showDragon"]]],null,2],["block",["if"],[["get",["showRiftHerald"]]],null,1],["block",["if"],[["get",["showVilemaw"]]],null,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-right-data-item"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-icon vilemaw-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-text"],["flush-element"],["append",["unknown",["team","vilemawKills"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-right-data-item"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-icon rift-herald-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-text"],["flush-element"],["append",["unknown",["team","riftHeraldKills"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-right-data-item"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-icon dragon-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-text"],["flush-element"],["append",["unknown",["team","dragonKills"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-right-data-item"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-icon baron-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-text"],["flush-element"],["append",["unknown",["team","baronKills"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-right-data-item"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-icon inhibitor-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-text"],["flush-element"],["append",["unknown",["team","inhibitorKills"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-details-right-data-item"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-icon tower-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-details-right-data-text"],["flush-element"],["append",["unknown",["team","towerKills"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = (function (e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var a = s(t);
          if (a && a.has(e)) return a.get(e);
          var n = {},
            l = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in e)
            if ("default" !== i && Object.prototype.hasOwnProperty.call(e, i)) {
              var o = l ? Object.getOwnPropertyDescriptor(e, i) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(n, i, o)
                : (n[i] = e[i]);
            }
          (n.default = e), a && a.set(e, n);
          return n;
        })(a(1));
        function s(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            a = new WeakMap();
          return (s = function (e) {
            return e ? a : t;
          })(e);
        }
        const l = n.Ember.Component.extend({
          layout: a(115),
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
          (e.exports = l);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "pfZiGoGH",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\scoreboard-tooltip-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\scoreboard-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["append",["unknown",["text"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = (function (e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var a = s(t);
          if (a && a.has(e)) return a.get(e);
          var n = {},
            l = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in e)
            if ("default" !== i && Object.prototype.hasOwnProperty.call(e, i)) {
              var o = l ? Object.getOwnPropertyDescriptor(e, i) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(n, i, o)
                : (n[i] = e[i]);
            }
          (n.default = e), a && a.set(e, n);
          return n;
        })(a(1));
        function s(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            a = new WeakMap();
          return (s = function (e) {
            return e ? a : t;
          })(e);
        }
        a(117);
        const l = n.Ember.Component.extend({
          layout: a(118),
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
          (e.exports = l);
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "FOh9SQ6B",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\elemental-tooltip-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\elemental-tooltip-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\elemental-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["append",["unknown",["text"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["elementalData"]]],null,1],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","div",[]],["dynamic-attr","class",["concat",["match-details-elemental-icon ",["get",["d"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["d"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","match-details-elemental-data"],["flush-element"],["text","\\n"],["block",["each"],[["get",["elementalData"]]],null,0],["text","      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = (function (e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var a = s(t);
          if (a && a.has(e)) return a.get(e);
          var n = {},
            l = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in e)
            if ("default" !== i && Object.prototype.hasOwnProperty.call(e, i)) {
              var o = l ? Object.getOwnPropertyDescriptor(e, i) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(n, i, o)
                : (n[i] = e[i]);
            }
          (n.default = e), a && a.set(e, n);
          return n;
        })(a(1));
        function s(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            a = new WeakMap();
          return (s = function (e) {
            return e ? a : t;
          })(e);
        }
        a(120);
        const l = n.Ember.Component.extend({
          layout: a(121),
          classNames: ["item-tooltip"],
        });
        n.default &&
          n.default.EmberApplicationFactory.setFactoryDefinition({
            name: "ItemTooltip",
            ItemTooltipComponent: l,
            ComponentFactory: n.default.ComponentFactory,
          }),
          (e.exports = l);
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "HccEpr6G",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\item-tooltip-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\item-tooltip-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\item-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","match-history-item-tooltip"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-item-info"],["flush-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["item","iconPath"]]]]],["static-attr","class","match-item-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-item-right"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-history-tooltip-title"],["flush-element"],["append",["unknown",["item","name"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-item-price"],["flush-element"],["append",["unknown",["item","priceTotal"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["flush-element"],["text","\\n      "],["open-element","lol-uikit-game-data-markup",[]],["static-attr","type","item"],["dynamic-attr","markup",["concat",[["unknown",["item","description"]]]]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = (function (e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var a = s(t);
          if (a && a.has(e)) return a.get(e);
          var n = {},
            l = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in e)
            if ("default" !== i && Object.prototype.hasOwnProperty.call(e, i)) {
              var o = l ? Object.getOwnPropertyDescriptor(e, i) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(n, i, o)
                : (n[i] = e[i]);
            }
          (n.default = e), a && a.set(e, n);
          return n;
        })(a(1));
        function s(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            a = new WeakMap();
          return (s = function (e) {
            return e ? a : t;
          })(e);
        }
        a(123);
        const l = n.Ember.Component.extend({
          layout: a(124),
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
          (e.exports = l);
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "UjixWVq6",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\spell-tooltip-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\spell-tooltip-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\spell-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","match-history-item-tooltip"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-spell-icon-tooltip-header"],["flush-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["spell","iconPath"]]]]],["static-attr","class","match-spell-icon-tooltip-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-spell-icon-tooltip-name"],["flush-element"],["append",["unknown",["spell","name"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-spell-icon-tooltip-level"],["flush-element"],["append",["unknown",["spellLvlLbl"]],false],["text"," "],["append",["unknown",["spell","summonerLevel"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","match-spell-icon-description"],["flush-element"],["append",["unknown",["spell","description"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = (function (e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var a = s(t);
          if (a && a.has(e)) return a.get(e);
          var n = {},
            l = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var i in e)
            if ("default" !== i && Object.prototype.hasOwnProperty.call(e, i)) {
              var o = l ? Object.getOwnPropertyDescriptor(e, i) : null;
              o && (o.get || o.set)
                ? Object.defineProperty(n, i, o)
                : (n[i] = e[i]);
            }
          (n.default = e), a && a.set(e, n);
          return n;
        })(a(1));
        function s(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            a = new WeakMap();
          return (s = function (e) {
            return e ? a : t;
          })(e);
        }
        a(126);
        const l = n.Ember.Component.extend({
          layout: a(127),
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
          (e.exports = l);
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "ZLlPfOjS",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\keystone-tooltip-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\keystone-tooltip-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\keystone-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","match-history-item-tooltip"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","match-keystone-icon-tooltip-header"],["flush-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["keystone","iconPath"]]]]],["static-attr","class","match-keystone-icon-tooltip-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","match-keystone-icon-tooltip-name"],["flush-element"],["append",["helper",["sanitize"],[["get",["keystone","name"]]],[["config"],[["get",["sanitizeConfig"]]]]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","match-keystone-icon-description"],["flush-element"],["append",["helper",["sanitize"],[["get",["keystone","shortDesc"]]],[["config"],[["get",["sanitizeConfig"]]]]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        e.exports = n.Ember.Component.extend({
          layout: a(129),
          champIconClass: null,
          champ: n.Ember.computed("champId", function () {
            return this.get("champions").get(this.get("champId"));
          }),
        });
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "Yuxy5Tk/",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\champ-icon-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\champ-icon-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["champ"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","img",[]],["static-attr","class","no-champ-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["champ","squarePortraitPath"]]]]],["static-attr","alt",""],["dynamic-attr","class",["concat",[["unknown",["champIconClass"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n,
          s = a(1),
          l = a(6),
          i = (n = a(9)) && n.__esModule ? n : { default: n },
          o = a(131);
        a(132);
        const { Component: r, computed: c } = s.Ember,
          m = { 1e3: "playerScore0", 1001: "playerScore0" },
          p = { 1e3: "playerScore1", 1001: "playerScore1" };
        function d(e, t) {
          return function () {
            const a = this.get(e);
            return this.get(t).map((e) => a.get(e));
          };
        }
        e.exports = r.extend(l.DataBindingMixin, {
          layout: a(133),
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
              const e = this.get("participant.goldEarned"),
                t = this.get("tra.metadata.locale.id");
              return i.default.formatGold(e, t);
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
              const e = this.get("currentParticipant").player,
                { player: t } = this.get("participant");
              return e.summonerId === t.summonerId;
            },
          ),
          spellDTOs: c(
            "participant.spellIds.[]",
            d("spells", "participant.spellIds"),
          ),
          keystone: c("participant.perk0", function () {
            if (!this.get("participant.perk0")) return !1;
            const e = this.get("participant.perk0");
            return this.get("runes").get(e);
          }),
          itemDTOs: c(
            "participant.itemIds.[]",
            d("items", "participant.itemIds"),
          ),
          champion: c("participant.championId", function () {
            const e = this.get("participant.championId");
            return this.get("champions").get(e);
          }),
          summonerId: c.readOnly("participant.player.summonerId"),
          puuid: c.readOnly("participant.player.puuid"),
          summonerName: c.readOnly("participant.player.summonerName"),
          gameName: c.readOnly("participant.player.gameName"),
          tagLine: c.readOnly("participant.player.tagLine"),
          playerNames: c("summonerName", "gameName", "tagLine", function () {
            const e = this.get("summonerName"),
              t = this.get("gameName"),
              a = this.get("tagLine");
            return t && a
              ? this.get("_playerNames").formatPlayerName({
                  summonerName: e,
                  gameName: t,
                  tagLine: a,
                })
              : e;
          }),
          playerNameFull: c.readOnly("playerNames.playerNameFull"),
          squarePortraitPath: c(
            "champions",
            "participant.championId",
            function () {
              const e = this.get("champions"),
                t = this.get("participant.championId");
              return e && t ? e.get(t).squarePortraitPath : "";
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
              const e = this.get("lowSpecModeSettings");
              return !Boolean(e && e.data && !0 === e.data.potatoModeEnabled);
            },
          ),
          itemSetsEnabled: c.readOnly("platformConfig.ItemSets.EditorEnabled"),
          maxItemSets: c("platformConfig.ItemSets.MaxItemSets", function () {
            const e = this.get("platformConfig.ItemSets.MaxItemSets");
            return void 0 === e ? 20 : e;
          }),
          playerCSDisplay: c("queueId", "participant", function () {
            const e = p[this.get("queueId")];
            return e
              ? this.get(`participant.${e}`)
              : this.get("participant.minionsPlusNeutralMonstersCount");
          }),
          playerGoldDisplay: c("queueId", "goldEarnedDisplay", function () {
            const e = m[this.get("queueId")];
            return e
              ? this.get(`participant.${e}`)
              : this.get("goldEarnedDisplay");
          }),
          init() {
            this._super(...arguments), (this._playerNames = s.playerNames);
          },
          didInsertElement() {
            this._super(...arguments), this.addContextMenu();
          },
          addContextMenu() {
            this.$()[0].addEventListener("contextmenu", (e) => {
              const t = this.getMenuItemModel();
              t.length > 0 &&
                (s.ContextMenuManager.setMenuItems(t),
                s.ContextMenuManager.openAtEvent(e));
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
            const e = this.get("gameCreation");
            if (!e) return !0;
            const t = new Date(e);
            return new Date() - t > 432e6;
          }),
          isPlayerReported: c(
            "playerReportsService.reportedPlayers.[]",
            "participant.player.puuid",
            function () {
              const e = this.get("participant.player.puuid"),
                t = this.get("playerReportsService.reportedPlayers") || [];
              return !!(t && t.length > 0) && t.includes(e);
            },
          ),
          cannotReportPlayer: c(
            "hasGameReportWindowExpired",
            "isLocalPlayerInGame",
            "isPlayerReported",
            function () {
              const e = this.get("isLocalPlayerInGame"),
                t = this.get("hasGameReportWindowExpired");
              return this.get("isPlayerReported") || !e || t;
            },
          ),
          hasAugments: c("mapId", function () {
            return o.MAP_IDS_WITH_AUGMENTS.includes(this.get("mapId"));
          }),
          participantAugments: c("participant", "mapId", function () {
            const e = this.get("participant"),
              t = this.get("augments"),
              a = [];
            for (let n = 1; n <= o.NUMBER_OF_AUGMENTS; ++n) {
              const s = e[`playerAugment${n}`] || 0,
                l = t.get(s) || { id: 0, rarity: "none" };
              a.push(l);
            }
            return a;
          }),
          getMenuItemModel: function () {
            let e = [];
            const t = this.get("participant.player.puuid"),
              a = this.get("summonerName"),
              n = this.get("playerNameFull");
            if (this.get("itemSetsEnabled")) {
              const t = this.get("champion"),
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
                    this.confirmImportItemSet(t, n);
                  },
                };
              e.push(i);
            }
            const l = this.get("summonerId");
            let i;
            this.get("isSummonerBlocked")
              ? (i = this.get("blockedPlayers").findBy("summonerId", l).id)
              : this.get("isFriend") &&
                (i = this.get("friends").findBy("summonerId", l).id);
            const o = this.get("session.summonerId");
            if (l === o) return e;
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
              h = s.Ember.Object.create({
                summonerName: a,
                summonerId: l,
                gameId: this.get("gameId"),
                puuid: t,
              }),
              u = this.get("squarePortraitPath"),
              g = {
                label: this.get(
                  "tra.MATCH_HISTORY_SCOREBOARD_MENU_BLOCK_BTN_REPORT",
                ),
                target: this,
                disabled: this.get("cannotReportPlayer"),
                action: function () {
                  s.SharedReportModalApps.showReportModal(
                    h,
                    u,
                    "LOL",
                    "MATCH_HISTORY",
                  );
                },
              };
            return (
              (e = e.concat([
                r,
                this.get("isSummonerBlocked") ? m : c,
                this.get("isSummonerFriend") ? d : p,
                g,
              ])),
              e
            );
          },
          confirmBlockPlayer(e, t, a) {
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
                    summonerId: e,
                    name: t,
                  });
                })
                .catch(() => {});
          },
          confirmImportItemSet(e, t) {
            const a = {
              items: s.Lodash.compact(this.get("itemDTOs")).map((e) => e.id),
              name: this.get("tra").formatString(
                "MATCH_HISTORY_ITEM_SETS_IMPORT_NAME",
                { champion: e.name, summoner: t },
              ),
              maps: [this.get("mapId")],
              champions: [e.id],
              source: "match_history",
            };
            (0, s.getProvider)()
              .getOptional("rcp-fe-lol-collections")
              .then(
                (e) => e.getItemSetsApi().saveItemSet(a),
                (e) => s.logger.error("Provider getOptional failure", e),
              );
          },
          assignAllTooltips() {
            const e = this.get("spells"),
              t = this.get("items"),
              a = this.get("runes"),
              n = this.get("tra"),
              l = this.$(".player-history-spells img"),
              i = this.get("participant.spellIds");
            l.each(function (t) {
              const a = e.get(i[t]);
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
            o.each(function (e) {
              const t = a.get(r);
              t &&
                s.TooltipManager.assign(
                  this,
                  "KeystoneTooltip",
                  { keystone: t, tra: n },
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
              (c.each(function (e) {
                const a = t.get(m[e]);
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
              const e = this.$(".player-history-augment"),
                t = this.get("participantAugments");
              e.each(function (e) {
                const a = t[e];
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
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.NUMBER_OF_AUGMENTS =
            t.MAP_IDS_WITH_AUGMENTS =
            t.MAP_IDS_WITHOUT_CS =
              void 0);
        t.MAP_IDS_WITHOUT_CS = [30];
        t.MAP_IDS_WITH_AUGMENTS = [30];
        t.NUMBER_OF_AUGMENTS = 4;
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "mNLjlI32",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\player-history-row-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\player-history-row-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\scoreboard\\\\player-history-row-component\\\\index.js\\" "],["text","\\n"],["comment"," add class \\"me\\" to mark my profile to the parent div "],["text","\\n"],["open-element","div",[]],["static-attr","class","player-history-object-wrapper"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","player-history-champion"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-champion-icon"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-history-champion-icon-border"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["champion"]]],null,9,8],["text","      "],["open-element","div",[]],["static-attr","class","player-history-champion-frame"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-lv"],["flush-element"],["append",["unknown",["participant","champLevel"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","player-history-result"],["flush-element"],["text","\\n\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["player-history-result-text ",["unknown",["titleInfo","titleClass"]]]]],["flush-element"],["append",["unknown",["titleInfo","title"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-mode"],["flush-element"],["append",["unknown",["titleInfo","subTitle"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-history-team-name"],["flush-element"],["append",["unknown",["clubName"]],false],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","player-history-keystone"],["flush-element"],["text","\\n"],["block",["if"],[["get",["keystone","iconPath"]]],null,7],["text","    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","player-history-spells"],["flush-element"],["text","\\n"],["block",["each"],[["get",["spellDTOs"]]],null,6],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["player-history-items ",["helper",["if"],[["get",["hasAugments"]],"player-history-items-with-augments"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasAugments"]]],null,4],["text","    "],["open-element","ul",[]],["static-attr","class","player-history-items-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["itemDTOs"]]],null,2],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["mapHasMinions"]],"player-history-stats","player-history-stats-no-minions"],null]]]],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","player-history-stats-kills"],["flush-element"],["text","\\n        "],["open-element","span",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["participant","mostKills"]],"player-history-stats-highest-value"],null]]]],["flush-element"],["append",["unknown",["participant","kills"]],false],["close-element"],["text","\\n        /"],["open-element","span",[]],["flush-element"],["append",["unknown",["participant","deaths"]],false],["close-element"],["text","\\n        /"],["open-element","span",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["participant","mostAssists"]],"player-history-stats-highest-value"],null]]]],["flush-element"],["append",["unknown",["participant","assists"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"],["block",["if"],[["get",["mapHasMinions"]]],null,0],["text","      "],["open-element","span",[]],["dynamic-attr","class",["concat",["player-history-stats-gold ",["helper",["if"],[["get",["participant","mostGoldEarned"]],"player-history-stats-highest-value"],null]]]],["flush-element"],["append",["unknown",["playerGoldDisplay"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","span",[]],["dynamic-attr","class",["concat",["player-history-stats-minions ",["helper",["if"],[["get",["participant","mostMinionKills"]],"player-history-stats-highest-value"],null]]]],["flush-element"],["append",["unknown",["playerCSDisplay"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["item","iconPath"]]]]],["static-attr","alt",""],["static-attr","class","player-history-item-pic"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","li",[]],["static-attr","class","player-history-item"],["flush-element"],["text","\\n"],["block",["if"],[["get",["item","iconPath"]]],null,1],["text","        "],["close-element"],["text","\\n"]],"locals":["item"]},{"statements":[["text","          "],["open-element","div",[]],["dynamic-attr","class",["concat",["player-history-augment-border player-history-augment-rarity-",["unknown",["augment","rarity"]]]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","player-history-augment"],["dynamic-attr","style",["concat",["-webkit-mask-image: url(",["unknown",["augment","augmentSmallIconPath"]],");"]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":["augment"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","player-history-augment-wrapper"],["flush-element"],["text","\\n"],["block",["each"],[["get",["participantAugments"]]],null,3],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["spell","iconPath"]]]]],["static-attr","alt",""],["static-attr","class","player-history-spell-pic"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["spell","iconPath"]]],null,5]],"locals":["spell"]},{"statements":[["text","          "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["keystone","iconPath"]]]]],["static-attr","alt",""],["static-attr","class","player-history-keystone-pic"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","img",[]],["static-attr","class","no-champ-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["champion","squarePortraitPath"]]]]],["static-attr","alt",""],["static-attr","class","player-history-champion-pic"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        a(135),
          (e.exports = n.Ember.Component.extend({
            classNames: ["match-details-stats-component"],
            layout: a(136),
            stats: n.Ember.inject.service(),
            statsCurrentParticipant: n.Ember.computed(
              "stats.participants",
              "stats.currentSummonerId",
              function () {
                const e = this.get("stats.participants"),
                  t = this.get("stats.currentSummonerId");
                if (e) {
                  const a = e.find(function (e) {
                    return e.summonerId === t;
                  });
                  return a || e[0];
                }
              },
            ),
            myTeamId: n.Ember.computed.alias("statsCurrentParticipant.teamId"),
            otherTeamId: n.Ember.computed(
              "statsCurrentParticipant",
              function () {
                const e = this.get("statsCurrentParticipant");
                return e && 100 === e.teamId ? 200 : 100;
              },
            ),
            sortProperty: ["teamId"],
            sortedParticipants: n.Ember.computed.sort(
              "stats.participants",
              function (e, t) {
                const a = this.get("myTeamId");
                return e.teamId === a ? -1 : e.teamId === t.teamId ? 0 : 1;
              },
            ),
            mapId: n.Ember.computed.alias("gameData.mapId"),
            tabDescriptions: n.Ember.A(a(137)),
            removeAnimationWhenDone: n.Ember.on(
              "didInsertElement",
              function () {
                const e = n.Ember.$(this.element).find(
                  ".match-stats-container",
                )[0];
                e.addEventListener("webkitAnimationEnd", function (t) {
                  t.target === e &&
                    "fade-in" === t.animationName &&
                    e.classList.remove("match-details-loading-fade-in");
                });
              },
            ),
            hoverColumn(e) {
              n.Lodash.forEach(this.$(".match-history-stats-main"), (t) => {
                const a = t.querySelectorAll(".match-history-stats-bg-column");
                a[e] && a[e].classList.add("hover");
              });
              const t = this.$(".team-avatar-wrapper");
              t[e] && t[e].classList.add("hover");
            },
            removeHoverColumn(e) {
              n.Lodash.forEach(this.$(".match-history-stats-main"), (t) => {
                const a = t.querySelectorAll(".match-history-stats-bg-column");
                a[e] && a[e].classList.remove("hover");
              });
              const t = this.$(".team-avatar-wrapper");
              t[e] && t[e].classList.remove("hover");
            },
            didInsertElement() {
              this._super(...arguments),
                this.element.addEventListener("selectHoverColumnIndex", (e) => {
                  this.hoverColumn(e.columnIndex);
                }),
                this.element.addEventListener(
                  "deselectHoverColumnIndex",
                  (e) => {
                    this.removeHoverColumn(e.columnIndex);
                  },
                );
            },
            actions: { stopEventPropagation: function () {} },
          }));
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "dG1/+Wl8",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\match-details-stats-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\match-details-stats-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\match-details-stats-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["match-stats-container ",["helper",["if"],[["get",["isTransitioning"]],"match-details-loading-hide","match-details-loading-fade-in"],null]]]],["modifier",["action"],[["get",[null]],"stopEventPropagation"]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","match-stats-teams"],["flush-element"],["text","\\n"],["text","    "],["append",["helper",["team-avatars"],null,[["champions","participants","currentSummonerId","teamId","isMyTeam"],[["get",["champions"]],["get",["sortedParticipants"]],["get",["stats","currentSummonerId"]],["get",["myTeamId"]],true]]],false],["text","\\n    "],["append",["helper",["team-avatars"],null,[["champions","participants","currentSummonerId","teamId","isMyTeam"],[["get",["champions"]],["get",["sortedParticipants"]],["get",["stats","currentSummonerId"]],["get",["otherTeamId"]],false]]],false],["text","\\n    "],["open-element","div",[]],["static-attr","class","match_details_clearfix"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","match-stats-table-container"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["block",["each"],[["get",["tabDescriptions"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["stats-table"],null,[["tab","mapId","participants","currentSummonerId"],[["get",["tab"]],["get",["mapId"]],["get",["sortedParticipants"]],["get",["stats","currentSummonerId"]]]]],false],["text","\\n"]],"locals":["tab"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e) => {
        "use strict";
        e.exports = JSON.parse(
          '[{"name":"MATCH_HISTORY_STATS_TAB_COMBAT","attributes":[{"name":"MATCH_HISTORY_STATS_ATTR_KDA","key":["kills","deaths","assists"],"format":"concatKDA"},{"name":"MATCH_HISTORY_STATS_ATTR_LARGEST_KILLING_SPREE","key":"largestKillingSpree"},{"name":"MATCH_HISTORY_STATS_ATTR_LARGEST_MULTI_KILL","key":"largestMultiKill"},{"name":"MATCH_HISTORY_STATS_ATTR_TIME_CCING_OTHERS","key":"timeCCingOthers","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_FIRST_BLOOD","key":"firstBloodKill","format":"firstBloodFormatter"}]},{"name":"MATCH_HISTORY_STATS_TAB_DMG","attributes":[{"name":"MATCH_HISTORY_STATS_ATTR_DMG_CHAMPION_TOTAL","key":"totalDamageDealtToChampions","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_CHAMPION_PHYSICAL","key":"physicalDamageDealtToChampions","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_CHAMPION_MAGICAL","key":"magicDamageDealtToChampions","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_CHAMPION_TRUE","key":"trueDamageDealtToChampions","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_DEALT_TOTAL","key":"totalDamageDealt","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_DEALT_PHYSICAL","key":"physicalDamageDealt","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_DEALT_MAGICAL","key":"magicDamageDealt","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_DEALT_TRUE","key":"trueDamageDealt","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_LARGEST_CRITICAL_STRIKE","key":"largestCriticalStrike","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_DEALT_TOTAL_TURRETS","key":"damageDealtToTurrets","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_DEALT_TOTAL_OBJECTIVES","key":"damageDealtToObjectives","format":"number"}]},{"name":"MATCH_HISTORY_STATS_TAB_DMG_TAKEN_HEALED","attributes":[{"name":"MATCH_HISTORY_STATS_ATTR_DMG_HEALED","key":"totalHeal","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_TOTAL_HEAL_ON_TEAMMATES","key":"totalHealsOnTeammates","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_TOTAL_DAMAGE_SHIELDED_ON_TEAMMATES","key":"totalDamageShieldedOnTeammates","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_TAKEN_TOTAL","key":"totalDamageTaken","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_TAKEN_PHYSICAL","key":"physicalDamageTaken","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_TAKEN_MAGICAL","key":"magicalDamageTaken","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_TAKEN_TRUE","key":"trueDamageTaken","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_DMG_SELF_MITIGATED","key":"damageSelfMitigated","format":"number"}]},{"name":"MATCH_HISTORY_STATS_TAB_VISION","attributes":[{"name":"MATCH_HISTORY_STATS_ATTR_WARDS_VISION_SCORE","key":"visionScore"},{"name":"MATCH_HISTORY_STATS_ATTR_WARDS_PLACED","key":"wardsPlaced"},{"name":"MATCH_HISTORY_STATS_ATTR_WARDS_DESTROYED","key":"wardsKilled"},{"name":"MATCH_HISTORY_STATS_ATTR_WARDS_PURCHASED_VISION","key":"visionWardsBoughtInGame"}]},{"name":"MATCH_HISTORY_STATS_TAB_INCOME","attributes":[{"name":"MATCH_HISTORY_STATS_ATTR_GOLD_EARNED","key":"goldEarned","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_GOLD_SPENT","key":"goldSpent","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_KILLED_MINION","key":"totalMinionsKilled","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_KILLED_NEUTRAL","key":"neutralMinionsKilled","hideOnMurderBridge":true},{"name":"MATCH_HISTORY_STATS_ATTR_KILLED_NEUTRAL_JUNGLE_TEAM","key":"neutralMinionsKilledTeamJungle","hideOnMurderBridge":true},{"name":"MATCH_HISTORY_STATS_ATTR_KILLED_NEUTRAL_JUNGLE_ENEMY","key":"neutralMinionsKilledEnemyJungle","hideOnMurderBridge":true}]},{"name":"MATCH_HISTORY_STATS_TAB_MISC","attributes":[{"name":"MATCH_HISTORY_STATS_ATTR_MISC_TOWERS_DESTROYED","key":"turretKills"},{"name":"MATCH_HISTORY_STATS_ATTR_MISC_INHIBITORS_DESTROYED","key":"inhibitorKills"}]}]',
        );
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        a(139),
          (e.exports = n.Ember.Component.extend({
            layout: a(140),
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
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "dEnJj2vi",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\team-avatars-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\team-avatars-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\team-avatars-component\\\\index.js\\" "],["text","\\n"],["block",["each"],[["get",["validParticipants"]]],null,0],["open-element","div",[]],["static-attr","class","match_details_clearfix"],["flush-element"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["team-avatar"],null,[["champions","participant","participants","currentSummonerId","isHexakill"],[["get",["champions"]],["get",["participant"]],["get",["participants"]],["get",["currentSummonerId"]],["get",["isHexakill"]]]]],false],["text","\\n"]],"locals":["participant"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        e.exports = n.Ember.Component.extend({
          layout: a(142),
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
            const e = new Event("selectHoverColumnIndex", { bubbles: !0 });
            (e.columnIndex = this.get("currentParticipantIndex")),
              this.element.dispatchEvent(e);
          },
          mouseLeave: function () {
            const e = new Event("deselectHoverColumnIndex", { bubbles: !0 });
            (e.columnIndex = this.get("currentParticipantIndex")),
              this.element.dispatchEvent(e);
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
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "7h4N//uT",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\team-avatar\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\team-avatar\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["team-avatar-outer ",["helper",["if"],[["get",["isHexakill"]],"hexakill"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["team-avatar-border ",["helper",["if"],[["get",["isHexakill"]],"hexakill"],null]]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["team-avatar ",["helper",["if"],[["get",["isHexakill"]],"hexakill"],null]]]],["flush-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["avatarSrc"]]]]],["static-attr","alt",""],["dynamic-attr","class",["concat",["team-avatar-img ",["helper",["if"],[["get",["isHexakill"]],"hexakill"],null]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        a(144);
        var s = a(14);
        e.exports = n.Ember.Component.extend({
          layout: a(145),
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
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "L+emzZwd",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\stats-table-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\stats-table-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\stats-table-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","match-history-stats-header"],["modifier",["action"],[["get",[null]],"toggle"]],["flush-element"],["append",["unknown",["headerText"]],false],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","match-history-stats-main"],["flush-element"],["text","\\n  "],["append",["helper",["stats-bg"],null,[["currentSummonerId","players"],[["get",["currentSummonerId"]],["get",["participants"]]]]],false],["text","\\n\\n  "],["open-element","table",[]],["static-attr","class","match-history-stats-tb"],["static-attr","border","0"],["static-attr","cellspacing","0"],["static-attr","cellpadding","0"],["static-attr","ondragstart","return false;"],["static-attr","ondrop","return false;"],["flush-element"],["text","\\n"],["block",["each"],[["get",["tab","attributes"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["stats-row"],null,[["attr","mapId","participants","currentSummonerId"],[["get",["attr"]],["get",["mapId"]],["get",["participants"]],["get",["currentSummonerId"]]]]],false],["text","\\n"]],"locals":["attr"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1),
          s = i(a(147)),
          l = i(a(9));
        function i(e) {
          return e && e.__esModule ? e : { default: e };
        }
        e.exports = n.Ember.Component.extend({
          tagName: "tr",
          attr: null,
          localizedRowName: n.Ember.computed("attr.name", function () {
            return this.get("tra." + this.get("attr.name"));
          }),
          layout: a(148),
          index: null,
          participants: null,
          cellContents: n.Ember.computed(
            "participants",
            "tra.metadata.locale.id",
            function () {
              const e = this.get("attr.key"),
                t = this.get("attr.format"),
                a = this.get("tra.metadata.locale.id"),
                n = this.get("currentSummonerId");
              return this.get("participants").map(function (i) {
                let o = i.stats[e],
                  r = !1;
                switch (t) {
                  case "concatKDA":
                    o = s.default.concatKDA(
                      i.stats[e[0]],
                      i.stats[e[1]],
                      i.stats[e[2]],
                    );
                    break;
                  case "firstBloodFormatter":
                    (o = s.default.firstBloodFormatter(i.stats[e])), (r = !0);
                    break;
                  case "number":
                    o = l.default.formatGold(i.stats[e], a);
                    break;
                  default:
                    o = i.stats[e];
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
              const e = this.get("participants");
              return !(!e || (Array.isArray(e) && !e[0]));
            },
          ),
          isAttrWithData: n.Ember.computed(
            "attr",
            "isParticipantsPopulated",
            function () {
              if (!this.get("isParticipantsPopulated")) return !1;
              const e = this.get("attr"),
                t = this.get("participants");
              if (e && Array.isArray(e.key))
                e.key.forEach(function (e) {
                  if (void 0 === t[0].stats[e]) return !1;
                });
              else if (e && void 0 === t[0].stats[e.key]) return !1;
              return !0;
            },
          ),
          showStat: n.Ember.computed(
            "attr.hideOnMurderBridge",
            "mapId",
            function () {
              const e = this.get("mapId"),
                t = this.get("attr.hideOnMurderBridge");
              return void 0 === t || (!0 === t && 12 !== e && 14 !== e);
            },
          ),
          isVisible: n.Ember.computed.and("isAttrWithData", "showStat"),
          isHexakill: n.Ember.computed("participants", function () {
            return 12 === this.get("participants").length;
          }),
          actions: {
            columnHovered: function (e) {
              const t = new Event("selectHoverColumnIndex", { bubbles: !0 });
              (t.columnIndex = e), this.element.dispatchEvent(t);
            },
            columnLoseHover: function (e) {
              const t = new Event("deselectHoverColumnIndex", { bubbles: !0 });
              (t.columnIndex = e), this.element.dispatchEvent(t);
            },
          },
        });
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        t.default = {
          concatKDA: function (e, t, a) {
            return e + "/" + t + "/" + a;
          },
          firstBloodFormatter: function (e) {
            return e ? "yes" : "no";
          },
        };
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "JGtUXrLA",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\stats-row\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\stats-row\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["isVisible"]]],null,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["unknown",["cellContent","content"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","span",[]],["dynamic-attr","class",["concat",["stats-",["unknown",["cellContent","content"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","td",[]],["dynamic-attr","class",["concat",["stats-td-normal ",["helper",["if"],[["get",["isHexakill"]],"hexakill"],null]," ",["unknown",["cellContent","currentStyle"]]]]],["modifier",["action"],[["get",[null]],"columnHovered",["get",["index"]]],[["on"],["mouseEnter"]]],["modifier",["action"],[["get",[null]],"columnLoseHover",["get",["index"]]],[["on"],["mouseLeave"]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["cellContent","isFirstBlood"]]],null,1,0],["text","    "],["close-element"],["text","\\n"]],"locals":["cellContent","index"]},{"statements":[["text","  "],["open-element","td",[]],["static-attr","class","stats-td-normal stats-td-column-header"],["flush-element"],["append",["unknown",["localizedRowName"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["cellContents"]]],null,2]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        a(150),
          (e.exports = n.Ember.Component.extend({
            layout: a(151),
            classNames: ["match-history-stats-bg"],
            isHexakill: n.Ember.computed("players", function () {
              return 12 === this.get("players").length;
            }),
            statsCurrentParticipant: n.Ember.computed(
              "players",
              "currentSummonerId",
              function () {
                const e = this.get("players"),
                  t = this.get("currentSummonerId");
                if (e) {
                  const a = e.find(function (e) {
                    return e.summonerId === t;
                  });
                  return a || e[0];
                }
              },
            ),
            myTeamId: n.Ember.computed.alias("statsCurrentParticipant.teamId"),
            columnContents: n.Ember.computed(
              "players",
              "myTeamId",
              function () {
                const e = this.get("isHexakill"),
                  t = this.get("myTeamId");
                return this.get("players").map(function (a) {
                  return {
                    team: a.teamId === t ? "team_blue" : "team_red",
                    isHexakill: e,
                  };
                });
              },
            ),
            players: null,
          }));
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "9dwhwb8p",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\stats-bg\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\stats-bg\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\stats\\\\stats-bg\\\\index.js\\" "],["text","\\n"],["block",["each"],[["get",["columnContents"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["match-history-stats-bg-column ",["unknown",["column","team"]]," ",["helper",["if"],[["get",["column","isHexakill"]],"hexakill"],null]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["column"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        a(153),
          (e.exports = n.Ember.Component.extend({
            classNames: ["match-details-graph-component"],
            layout: a(154),
            selectedAttributes: n.Ember.A([]),
            mapId: n.Ember.computed.alias("gameData.mapId"),
            removeAnimationWhenDone: n.Ember.on(
              "didInsertElement",
              function () {
                const e = n.Ember.$(this.element).find(
                  ".match-graph-container",
                )[0];
                e.addEventListener("webkitAnimationEnd", function (t) {
                  t.target === e &&
                    "fade-in" === t.animationName &&
                    e.classList.remove("match-details-loading-fade-in");
                });
              },
            ),
          }));
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "l/Mx5C8y",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\graph\\\\match-details-graph-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\graph\\\\match-details-graph-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\graph\\\\match-details-graph-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["match-graph-container ",["helper",["if"],[["get",["isTransitioning"]],"match-details-loading-hide","match-details-loading-fade-in"],null]]]],["flush-element"],["text","\\n  "],["append",["helper",["graph-categories"],null,[["selectedAttributes","mapId"],[["get",["selectedAttributes"]],["get",["mapId"]]]]],false],["text","\\n  "],["append",["helper",["graph-display"],null,[["selectedAttributes"],[["get",["selectedAttributes"]]]]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        a(156);
        const s = a(157);
        e.exports = n.Ember.Component.extend({
          classNames: ["match-graph-categories"],
          layout: a(158),
          selectedAttributes: n.Ember.A([]),
          stats: n.Ember.inject.service(),
          mapId: null,
          statsCategories: n.Ember.computed(
            "tra.metadata",
            "stats.participants",
            "mapId",
            function () {
              const e = s,
                t = n.Ember.A([]),
                a = this.get("mapId");
              return (
                e.forEach((e) => {
                  const s = n.Ember.Object.create();
                  s.set("name", e.name),
                    s.set("selected", !1),
                    s.set("attributes", n.Ember.A([])),
                    s.set("locString", this.get(`tra.${e.name}`)),
                    e.attributes.forEach((e) => {
                      const t = n.Ember.Object.create();
                      t.set("name", e.name),
                        t.set("key", e.key),
                        t.set("locString", this.get(`tra.${e.name}`)),
                        t.set("selected", !1),
                        t.set("disabled", !1);
                      const l = e.hideOnMurderBridge;
                      (void 0 === l || (!0 === l && 12 !== a && 14 !== a)) &&
                        void 0 !==
                          this.get(`stats.participants.0.stats.${e.key}`) &&
                        s.attributes.push(t);
                    }),
                    t.push(s);
                }),
                t
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
            const e = this.get("statsCategories"),
              t = n.Ember.A([]);
            e.forEach(function (e) {
              e.get("attributes").forEach(function (e) {
                e.get("selected") && t.push(e);
              });
            }),
              this.set("selectedAttributes", t);
          },
          _setDisableValues: function () {
            let e = 0;
            const t = this.get("statsCategories");
            t.forEach(function (t) {
              t.attributes.forEach(function (t) {
                t.get("selected") && e++;
              });
            }),
              t.forEach(function (t) {
                t.attributes.forEach(function (t) {
                  const a = e >= 6;
                  !t.get("selected") && a
                    ? t.set("disabled", !0)
                    : t.set("disabled", !1);
                });
              });
          },
          actions: {
            selectCategory: function (e) {
              const t = this.get("statsCategories");
              e.selected
                ? t.forEach(function (t) {
                    t.name === e.name
                      ? (t.set("selected", !0),
                        t.attributes.forEach(function (e) {
                          e.set("selected", !0);
                        }))
                      : (t.set("selected", !1),
                        t.attributes.forEach(function (e) {
                          e.set("selected", !1);
                        }));
                  })
                : t.forEach(function (t) {
                    t.name === e.name &&
                      (t.set("selected", !1),
                      t.attributes.forEach(function (e) {
                        e.set("selected", !1), e.set("disabled", !1);
                      }));
                  }),
                this._setDisableValues(),
                this._setSelectedAttributes();
            },
            selectAttribute: function (e) {
              this.get("statsCategories").forEach(function (t) {
                let a = 0;
                t.attributes.forEach(function (n) {
                  n.name === e.get("name") &&
                    e.get("selected") &&
                    t.set("selected", !0),
                    n.get("selected") && a++;
                }),
                  0 === a && t.set("selected", !1);
              }),
                this._setDisableValues(),
                this._setSelectedAttributes();
            },
          },
        });
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e) => {
        "use strict";
        e.exports = JSON.parse(
          '[{"name":"MATCH_HISTORY_GRAPH_TAB_DAMAGE_DEALT_CHAMPIONS","attributes":[{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_CHAMPION_TOTAL","key":"totalDamageDealtToChampions"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_CHAMPION_PHYSICAL","key":"physicalDamageDealtToChampions"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_CHAMPION_MAGICAL","key":"magicDamageDealtToChampions"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_CHAMPION_TRUE","key":"trueDamageDealtToChampions"}]},{"name":"MATCH_HISTORY_GRAPH_TAB_TOTAL_DAMAGE_DEALT","attributes":[{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_DEALT_TOTAL_PHYSICAL","key":"physicalDamageDealt"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_DEALT_TOTAL_MAGICAL","key":"magicDamageDealt"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_DEALT_TOTAL_TRUE","key":"trueDamageDealt"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_DEALT_TOTAL_TURRET","key":"damageDealtToTurrets"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_DEALT_TOTAL_OBJECTIVES","key":"damageDealtToObjectives"}]},{"name":"MATCH_HISTORY_GRAPH_TAB_DAMAGE_TAKEN_HEALED","attributes":[{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_HEALED","key":"totalHeal"},{"name":"MATCH_HISTORY_STATS_ATTR_TOTAL_HEAL_ON_TEAMMATES","key":"totalHealsOnTeammates","format":"number"},{"name":"MATCH_HISTORY_STATS_ATTR_TOTAL_DAMAGE_SHIELDED_ON_TEAMMATES","key":"totalDamageShieldedOnTeammates","format":"number"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_TAKEN_TOTAL","key":"totalDamageTaken"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_TAKEN_PHYSICAL","key":"physicalDamageTaken"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_TAKEN_MAGICAL","key":"magicalDamageTaken"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_TAKEN_TRUE","key":"trueDamageTaken"},{"name":"MATCH_HISTORY_GRAPH_ATTR_DMG_SELF_MITIGATED","key":"damageSelfMitigated"}]},{"name":"MATCH_HISTORY_GRAPH_TAB_INCOME","attributes":[{"name":"MATCH_HISTORY_GRAPH_ATTR_GOLD_EARNED","key":"goldEarned"},{"name":"MATCH_HISTORY_GRAPH_ATTR_GOLD_SPENT","key":"goldSpent"}]},{"name":"MATCH_HISTORY_GRAPH_TAB_VISION","attributes":[{"name":"MATCH_HISTORY_GRAPH_ATTR_WARDS_VISION_SCORE","key":"visionScore"},{"name":"MATCH_HISTORY_GRAPH_ATTR_WARDS_PLACED","key":"wardsPlaced"},{"name":"MATCH_HISTORY_GRAPH_ATTR_WARDS_DESTROYED","key":"wardsKilled"},{"name":"MATCH_HISTORY_GRAPH_ATTR_WARDS_PURCHASED_VISION","key":"visionWardsBoughtInGame"}]},{"name":"MATCH_HISTORY_GRAPH_TAB_MONSTERS_MINIONS","attributes":[{"name":"MATCH_HISTORY_GRAPH_ATTR_KILLED_MINION","key":"totalMinionsKilled"},{"name":"MATCH_HISTORY_GRAPH_ATTR_KILLED_NEUTRAL","key":"neutralMinionsKilled","hideOnMurderBridge":true},{"name":"MATCH_HISTORY_GRAPH_ATTR_KILLED_NEUTRAL_JUNGLE_TEAM","key":"neutralMinionsKilledTeamJungle","hideOnMurderBridge":true},{"name":"MATCH_HISTORY_GRAPH_ATTR_KILLED_NEUTRAL_JUNGLE_ENEMY","key":"neutralMinionsKilledEnemyJungle","hideOnMurderBridge":true}]}]',
        );
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "93qlYCpX",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\graph\\\\graph-categories\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\graph\\\\graph-categories\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\graph\\\\graph-categories\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","class","match-graph-categories-scrollbar"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["block",["each"],[["get",["statsCategories"]]],null,1],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","match-graph-category-attribute"],["flush-element"],["text","\\n            "],["open-element","lol-uikit-flat-checkbox",[]],["dynamic-attr","class",["concat",["match-graph-attribute-checkbox ",["unknown",["statAttribute","name"]]]]],["modifier",["action"],[["get",[null]],"selectAttribute",["get",["statAttribute"]]]],["flush-element"],["text","\\n              "],["append",["helper",["input"],null,[["slot","class","type","id","checked","disabled","name"],["input","match-history-category-attribute-checkbox","checkbox",["get",["statAttribute","name"]],["get",["statAttribute","selected"]],["get",["statAttribute","disabled"]],["get",["statAttribute","name"]]]]],false],["text","\\n              "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","class","match-history-category-label"],["dynamic-attr","for",["concat",[["unknown",["statAttribute","name"]]]]],["flush-element"],["text","\\n                "],["open-element","span",[]],["static-attr","class","flat-checkbox-span"],["flush-element"],["close-element"],["text","\\n                "],["append",["unknown",["statAttribute","locString"]],false],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":["statAttribute"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","match-graph-category"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-flat-checkbox",[]],["dynamic-attr","class",["concat",["match-graph-category-checkbox ",["unknown",["statCategory","name"]]]]],["dynamic-attr","disabled",["unknown",["statCategory","disabled"]],null],["modifier",["action"],[["get",[null]],"selectCategory",["get",["statCategory"]]]],["flush-element"],["text","\\n        "],["append",["helper",["input"],null,[["slot","class","type","id","checked","name"],["input","match-history-category-checkbox","checkbox",["get",["statCategory","name"]],["get",["statCategory","selected"]],["get",["statCategory","name"]]]]],false],["text","\\n        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","class","match-history-category-label"],["dynamic-attr","for",["concat",[["unknown",["statCategory","name"]]]]],["flush-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","flat-checkbox-span"],["flush-element"],["close-element"],["text","\\n          "],["append",["unknown",["statCategory","locString"]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","match-graph-category-attributes"],["flush-element"],["text","\\n"],["block",["each"],[["get",["statCategory","attributes"]]],null,0],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["statCategory"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        a(160);
        var s = a(5);
        const l = "legs",
          i = "blue";
        e.exports = n.Ember.Component.extend({
          classNames: ["match-graph-display"],
          layout: a(161),
          stats: n.Ember.inject.service(),
          graphData: n.Ember.computed(
            "selectedAttributes",
            "stats.participants",
            "stats.currentSummonerId",
            function () {
              const e = this.get("selectedAttributes"),
                t = this.get("stats.currentSummonerId"),
                a = this.get("stats.participants"),
                n = [];
              let s = 1,
                l = !1;
              return a && 0 !== a.length
                ? (a.forEach(function (a) {
                    const i = {},
                      o = a.summonerId === t;
                    o && (l = !0),
                      (i.isCurrent = o),
                      (i.isLocalPlayer = o),
                      (i.teamId = a.teamId),
                      (i.championId = a.championId),
                      (i.graphYAxisIndex = s++),
                      (i.stats = []),
                      e.forEach(function (e) {
                        const t = {};
                        (t.id = e.key),
                          (t.value = a.stats[e.key]),
                          (t.name = e.locString),
                          (t.teamId = a.teamId),
                          i.stats.push(t);
                      }),
                      n.push(i);
                  }),
                  l || (n[0].isCurrent = !0),
                  this._applyTeamColors(n))
                : n;
            },
          ),
          fetchChampionData: n.Ember.on("didInsertElement", function () {
            s.champions.then((e) => this.set("championData", e));
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
            const e = this.get("graphData"),
              t = 20,
              a = 20,
              s = 20,
              i = 50,
              o = 700 - i - a,
              r = (this.get("stats.dataSource") === l ? 500 : 570) - t - s,
              c = n.d3.scale.linear().range([0, o]),
              m = n.d3.scale.ordinal().rangeBands([0, r], 0.4),
              p = n.d3.scale.ordinal(),
              d = n.d3.svg
                .axis()
                .scale(c)
                .orient("bottom")
                .tickFormat(n.d3.format("d"))
                .innerTickSize(-r)
                .outerTickSize(0),
              h = n.d3.svg.axis().scale(m).orient("left"),
              u = n.d3
                .select(".match-graph-display .match-main-graph")
                .append("svg")
                .attr("width", o + i + a)
                .attr("height", r + t + s),
              g = u
                .append("g")
                .attr("transform", "translate(" + i + "," + t + ")");
            c.domain([0, 0]),
              m.domain(
                e.map(function (e) {
                  return e.graphYAxisIndex;
                }),
              ),
              this._appendAxis(d, h, g, r),
              this._initialAvatarsRender(e, u, m),
              this.set("x", c),
              this.set("y0", m),
              this.set("y1", p),
              this.set("xAxis", d),
              this.set("yAxis", h),
              this.set("svg", g);
          },
          rerenderGraph: function () {
            const e = this.get("graphData"),
              t = this.get("x"),
              a = this.get("y0"),
              s = this.get("y1"),
              l = this.get("svg"),
              i = this.get("xAxis"),
              o = this._getStatsIds(e);
            t.domain([
              0,
              n.d3.max(e, function (e) {
                return n.d3.max(e.stats, function (e) {
                  return e.value;
                });
              }),
            ]),
              s.domain(o).rangeRoundBands([0, a.rangeBand()]),
              l.selectAll(".match-graph-x-axis").call(i);
            const r = l.selectAll(".match-graph-champion").data(e);
            this._renderChampions(r);
            const c = r.selectAll("rect").data(function (e) {
              return e.stats;
            });
            this._renderStats(c, o), this._applyTooltips(c, o);
          },
          _renderChampions: function (e) {
            const t = this.get("y0");
            e.enter()
              .append("g")
              .attr("class", "match-graph-champion")
              .attr("transform", function (e) {
                const a = e.teamColor === i ? 0 : 16;
                return `translate(0, ${t(e.graphYAxisIndex) + a - 8})`;
              });
          },
          _renderStats: function (e, t) {
            const a = n.d3.scale
                .ordinal()
                .range(["#1ba9bd", "#098c9e", "#06535d", "#04434a"]),
              s = n.d3.scale
                .ordinal()
                .range(["#ec2040", "#be1e37", "#8c1728", "#721220"]),
              l = this.get("y1"),
              o = this.get("x");
            e.enter().append("rect").attr("width", 0),
              e
                .attr("x", 1)
                .attr("id", function (e) {
                  return e.id;
                })
                .attr("class", function (e) {
                  return `match-graph-stat-bar ${e.id}`;
                })
                .attr("data-value", function (e) {
                  return e.value;
                })
                .style("fill", function (e, t) {
                  return e.teamColor === i ? a(t) : s(t);
                })
                .transition()
                .attr("y", function (e, a) {
                  const n = t.length > 1 ? 4 * a - 2 * t.length : 0,
                    s = l(t[a]) + n,
                    i = Math.round(l.rangeBand() / 2 - 15);
                  return l.rangeBand() > 30 ? s + i : s;
                })
                .attr("height", function () {
                  const e = l.rangeBand();
                  return e > 30 ? 30 : e;
                })
                .attr("width", function (e) {
                  return o(e.value);
                }),
              e.exit().transition().attr("width", 0).remove();
          },
          _applyTooltips: function (e) {
            e.on("mouseover", (e) => {
              this.$(`.${e.id}`).each((t, a) => {
                const n = this.get("stats.dataSource") === l ? 218 : 137,
                  s = this.$(a).offset(),
                  i = Math.abs(a.getAttribute("width")),
                  o = Math.abs(a.getAttribute("height")),
                  r = Math.abs(s.left) - 244 + i,
                  c = Math.abs(s.top) - n + o / 2 - 4,
                  m = a.getAttribute("data-value");
                this.$(".match-main-graph").append(
                  `\n          <div class="math-graph-tooltip ${e.id}-tooltip"\n            style="left: ${r}px; top: ${c}px;">\n            ${m}\n          </div>\n        `,
                );
              }),
                this.$(".match-main-graph").append(
                  `\n        <div class="match-main-graph-tooltip-hint">\n          ${e.name}\n        </div>\n      `,
                );
            }),
              e.on("mouseout", (e) => {
                this.$(`.${e.id}-tooltip`).remove(),
                  this.$(".match-main-graph-tooltip-hint").remove();
              });
          },
          _applyTeamColors: function (e) {
            const t = e.find((e) => e.isCurrent),
              a = [],
              n = [];
            return (
              t &&
                ((t.teamColor = i),
                t.stats.forEach((e) => (e.teamColor = i)),
                a.push(t)),
              e.forEach(function (e) {
                e.teamId === t.teamId && !e.isCurrent
                  ? ((e.teamColor = i),
                    e.stats.forEach((e) => (e.teamColor = i)),
                    a.push(e))
                  : e.isCurrent ||
                    ((e.teamColor = "red"),
                    e.stats.forEach((e) => (e.teamColor = "red")),
                    n.push(e));
              }),
              a.concat(n)
            );
          },
          _appendAxis(e, t, a, n) {
            a
              .append("g")
              .attr("class", "match-graph-axis match-graph-x-axis")
              .attr("transform", "translate(0," + n + ")")
              .classed("grid", !0)
              .call(e),
              a
                .append("g")
                .attr("class", "match-graph-axis match-graph-y-axis")
                .call(t);
          },
          _initialAvatarsRender: function (e, t, a) {
            t.select(".match-graph-y-axis").selectAll("text").remove(),
              t
                .append("clipPath")
                .attr("id", "avatar-clip")
                .append("circle")
                .attr("cx", 21)
                .attr("cy", 20)
                .attr("r", 13);
            const n = t
              .selectAll(".match-graph-y-axis")
              .selectAll(".tick")
              .data(e)
              .attr("class", function (e) {
                const t = e.isLocalPlayer ? "local-player" : "";
                return `tick team-${e.teamColor} ${t}`;
              })
              .attr("transform", function (e) {
                const t = e.teamColor === i ? 0 : 16;
                return `translate(0, ${
                  a(e.graphYAxisIndex) + t - 8 + a.rangeBand() / 2 - 15
                })`;
              });
            n.append("circle").attr("class", "avatar-border");
            const s = this.get("championData");
            n.append("svg:image")
              .attr("class", "avatar")
              .attr("xlink:href", function (e) {
                return s.get(e.championId).squarePortraitPath;
              })
              .attr("clip-path", "url(#avatar-clip)");
          },
          _getStatsIds: function (e) {
            return e[0].stats.map(function (e) {
              return e.id;
            });
          },
        });
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "gR1Cie5B",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\graph\\\\graph-display\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\graph\\\\graph-display\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\graph\\\\graph-display\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","match-main-graph"],["flush-element"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        a(163);
        e.exports = n.Ember.Component.extend({
          classNames: ["match-details-runes-component"],
          layout: a(164),
          selectedAttributes: n.Ember.A([]),
          stats: n.Ember.inject.service(),
          statsCurrentParticipant: n.Ember.computed(
            "stats.participants",
            "stats.currentSummonerId",
            "currentParticipant.summonerId",
            function () {
              const e = this.get("stats.participants"),
                t = this.get("currentParticipant"),
                a = this.get("stats.currentSummonerId");
              if (void 0 !== t.stats) return t;
              if (e) {
                const t = e.find(function (e) {
                  return e.summonerId === a;
                });
                return t || e[0];
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
              const e = this.get("playerStats.perkPrimaryStyle");
              return (this.get("runesStyles") || n.Ember.Map.create()).get(e);
            },
          ),
          runesSubStyle: n.Ember.computed(
            "playerStats.perkSubStyle",
            "runesStyles",
            function () {
              const e = this.get("playerStats.perkSubStyle");
              return (this.get("runesStyles") || n.Ember.Map.create()).get(e);
            },
          ),
          runesStats: n.Ember.computed("playerStats", "runes", function () {
            const e = this.get("playerStats"),
              t = this.get("runes");
            if (!e || !t) return [];
            const a = [];
            for (let n = 0; n < 6; n++) {
              const s = {},
                l = "perk" + n,
                i = e[l],
                o = t.get(i);
              if (o) {
                (s.rune = o), (s.vars = []);
                for (let t = 0; t < 3; t++) {
                  const a = l + "Var" + (t + 1);
                  s.vars.push(e[a]);
                }
                a.push(s);
              }
            }
            return a;
          }),
        });
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "7is4dF9f",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\runes\\\\match-details-runes-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\runes\\\\match-details-runes-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\runes\\\\match-details-runes-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["match-runes-container ",["helper",["if"],[["get",["isTransitioning"]],"match-details-loading-hide","match-details-loading-fade-in"],null]]]],["flush-element"],["text","\\n"],["text","  "],["append",["helper",["runes-player-stats"],null,[["participant","currentParticipant","champions","items","runes","spells","runesPrimaryStyle","runesSubStyle"],[["get",["statsCurrentParticipant"]],["get",["currentParticipant"]],["get",["champions"]],["get",["items"]],["get",["runes"]],["get",["spells"]],["get",["runesPrimaryStyle"]],["get",["runesSubStyle"]]]]],false],["text","\\n\\n"],["block",["each"],[["get",["runesStats"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["runes-rune-stats"],null,[["stats","index"],[["get",["stats"]],["get",["index"]]]]],false],["text","\\n"]],"locals":["stats","index"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n = a(1);
        a(166);
        const s = '<span class="statvalue">#</span>';
        e.exports = n.Ember.Component.extend({
          layout: a(167),
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
              const e = this.get("stats.vars") || [];
              let t = this.get("stats.rune.endOfGameStatDescs") || [];
              return (
                t.length <= 0 && (t = ["--"]),
                t.map((t) => this.fillInPlaceholders(t, e))
              );
            },
          ),
          fillInPlaceholders: function (e, t) {
            for (let a = 0; a < 3; a++) {
              const n = "@eogvar#@".replace("#", a + 1),
                l = t.length > a ? t[a] : "",
                i = new RegExp(n, "ig"),
                o = s.replace("#", l);
              e = e.replace(i, o);
            }
            return e;
          },
        });
      },
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "nVWoTzlZ",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\runes\\\\rune-stats\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\runes\\\\rune-stats\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\runes\\\\rune-stats\\\\index.js\\" "],["text","\\n"],["open-element","img",[]],["static-attr","class","match-history-runes-icon"],["dynamic-attr","src",["concat",[["unknown",["runeIconPath"]]]]],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","match-history-runes-name"],["flush-element"],["append",["unknown",["runeName"]],false],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","match-history-runes-stats-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["statStrings"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","span",[]],["static-attr","class","match-history-runes-stats-text"],["flush-element"],["append",["helper",["sanitize"],[["get",["statString"]]],null],false],["close-element"],["text","\\n"]],"locals":["statString"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
        "use strict";
        var n,
          s = a(1),
          l = a(6),
          i = (n = a(9)) && n.__esModule ? n : { default: n };
        a(169);
        const { Component: o, computed: r } = s.Ember;
        function c(e, t) {
          return function () {
            const a = this.get(e);
            return this.get(t).map((e) => a.get(e));
          };
        }
        e.exports = o.extend(l.DataBindingMixin, {
          layout: a(170),
          classNames: ["runes-player-stats"],
          goldEarnedDisplay: r(
            "participant.goldEarned",
            "tra.metadata.locale.id",
            function () {
              const e = this.get("participant.goldEarned"),
                t = this.get("tra.metadata.locale.id");
              return i.default.formatGold(e, t);
            },
          ),
          kdaDisplay: r(
            "participant.kills",
            "participant.deaths",
            "participant.assists",
            function () {
              return `${this.get("participant.kills")} / ${this.get(
                "participant.deaths",
              )} / ${this.get("participant.assists")}`;
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
            const e = this.get("participant.championId");
            return this.get("champions").get(e);
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
            const e = this.get("spells"),
              t = this.get("items"),
              a = this.get("tra"),
              n = this.$(".spells img"),
              l = this.get("participant.spellIds");
            n.each(function (t) {
              const n = e.get(l[t]);
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
            i.each(function (e) {
              const a = t.get(o[e]);
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
      (e, t, a) => {
        "use strict";
        a.r(t);
      },
      (e, t, a) => {
        const n = a(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "1+JWwP3O",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\runes\\\\player-stats\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\runes\\\\player-stats\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-match-history\\\\src\\\\components\\\\runes\\\\player-stats\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","spells"],["flush-element"],["text","\\n"],["block",["each"],[["get",["spellDTOs"]]],null,5],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","champion"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","champion-icon"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","champion-icon-border"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["champion"]]],null,3,2],["text","    "],["open-element","div",[]],["static-attr","class","champion-frame"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","champ-level"],["flush-element"],["append",["unknown",["participant","champLevel"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","player-info"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","name"],["flush-element"],["text","\\n    "],["append",["helper",["player-name"],null,[["format","puuid","summonerName","gameName","tagLine"],["short",["get",["puuid"]],["get",["summonerName"]],["get",["gameName"]],["get",["tagLine"]]]]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","styles"],["flush-element"],["append",["unknown",["runesPrimaryStyleName"]],false],["text"," / "],["append",["unknown",["runesSubStyleName"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","items-container"],["flush-element"],["text","\\n  "],["open-element","ul",[]],["static-attr","class","items-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["itemDTOs"]]],null,1],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","stats"],["flush-element"],["text","\\n  "],["open-element","span",[]],["static-attr","class","stats-kills"],["flush-element"],["append",["unknown",["kdaDisplay"]],false],["close-element"],["text","\\n  "],["open-element","span",[]],["static-attr","class","stats-minions"],["flush-element"],["append",["unknown",["participant","minionsPlusNeutralMonstersCount"]],false],["close-element"],["text","\\n  "],["open-element","span",[]],["static-attr","class","stats-gold"],["flush-element"],["append",["unknown",["goldEarnedDisplay"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["item","iconPath"]]]]],["static-attr","alt",""],["static-attr","class","item-pic"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","li",[]],["static-attr","class","item"],["flush-element"],["text","\\n"],["block",["if"],[["get",["item","iconPath"]]],null,0],["text","      "],["close-element"],["text","\\n"]],"locals":["item"]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","no-champ-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["champion","squarePortraitPath"]]]]],["static-attr","alt",""],["static-attr","class","champion-pic"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["spell","iconPath"]]]]],["static-attr","alt",""],["static-attr","class","player-history-spell-pic"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["spell","iconPath"]]],null,4]],"locals":["spell"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, a) => {
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
        e.exports = n.Ember.Service.extend(i, {
          _eogParticipants: n.Ember.computed("eogStatsBlock", function () {
            const e = this.get("eogStatsBlock");
            if (!e) return n.Ember.A([]);
            const t = e.teams[0].players.concat(e.teams[1].players);
            let a = n.Ember.A([]);
            t.forEach(function (e) {
              const t = {};
              (t.teamId = e.teamId),
                (t.championId = e.championId),
                (t.summonerId = e.summonerId),
                (t.champLevel = e.stats.LEVEL),
                (t.goldEarned = e.stats.GOLD_EARNED),
                (t.championId = e.championId),
                (t.player = {}),
                (t.player.summonerName = e.summonerName),
                (t.player.summonerId = e.summonerId),
                (t.spellIds = []),
                (t.spellIds[0] = e.spell1Id),
                (t.spellIds[1] = e.spell2Id),
                (t.itemIds = e.items),
                (t.stats = {}),
                Object.keys(s).forEach(function (a) {
                  t.stats[s[a]] = e.stats[a];
                }),
                Object.keys(l).forEach(function (a) {
                  t.stats[l[a]] = e.stats[a];
                }),
                (t.minionsPlusNeutralMonstersCount =
                  t.stats.totalMinionsKilled + t.stats.neutralMinionsKilled),
                (t.kills = t.stats.kills),
                (t.deaths = t.stats.deaths),
                (t.assists = t.stats.assists),
                a.push(t);
            });
            const i = this.get("currentSummonerId");
            return (
              (a = n.Lodash.sortBy(a, [
                "teamId",
                function (e) {
                  return e.summonerId === i ? -1 : 0;
                },
              ])),
              a
            );
          }),
          _legsParticipants: n.Ember.computed("legsGameData", function () {
            const e = this.get("legsGameData");
            if (!e) return n.Ember.A([]);
            const t = e.participants,
              a = n.Ember.A([]);
            return (
              t.forEach(function (t) {
                const n = {},
                  s = e.participantIdentities.find(
                    (e) => e.participantId === t.participantId,
                  );
                (n.summonerId = s.player.summonerId),
                  (n.teamId = t.teamId),
                  (n.championId = t.championId),
                  (n.stats = t.stats),
                  a.push(n);
              }),
              a
            );
          }),
          setSourceOptions: function (e) {
            if (this.get("dataSource"))
              throw "rcp-fe-lol-match-history: you should only use setSourceOptions once.";
            this.set("dataSource", e.dataSource),
              this.set("baseGameId", e.baseGameId),
              this.set("baseSummonerId", e.baseSummonerId);
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
    t = {};
  function a(n) {
    var s = t[n];
    if (void 0 !== s) return s.exports;
    var l = (t[n] = { exports: {} });
    return e[n](l, l.exports, a), l.exports;
  }
  (a.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) return window;
    }
  })()),
    (a.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (a.p = "/fe/lol-match-history/"),
    (() => {
      "use strict";
      var e,
        t = (e = a(1)) && e.__esModule ? e : { default: e };
      const n = "rcp-fe-lol-match-history",
        s = document.currentScript.ownerDocument;
      const l = window.getPluginAnnounceEventName(n);
      s.addEventListener(
        l,
        function (e) {
          (0, e.registrationHandler)(function (e) {
            return t.default
              .init(e, {
                AudioPlugin: (e) => e.get("rcp-fe-audio"),
                ComponentFactory: (e) =>
                  e.get("rcp-fe-common-libs").getComponentFactory(1),
                ContextMenuManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getContextMenuManager(),
                d3: (e) => e.get("rcp-fe-common-libs").getD3("3"),
                dataBinding: (e) =>
                  e
                    .get("rcp-fe-common-libs")
                    .getDataBinding("rcp-fe-lol-match-history"),
                Ember: (e) => e.get("rcp-fe-ember-libs").getEmber(),
                EmberDataBinding: (e) =>
                  e
                    .get("rcp-fe-ember-libs")
                    .getEmberDataBinding("rcp-fe-lol-match-history"),
                l10nDuration: (e) => e.get("rcp-fe-lol-l10n").duration(),
                Lodash: (e) => e.get("rcp-fe-common-libs").getLodash("4"),
                logger: (e) => e.get("rcp-fe-common-libs").logging.create(n),
                ModalManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getModalManager(),
                moment: (e) => e.get("rcp-fe-lol-l10n").moment(),
                Navigation: (e) => e.get("rcp-fe-lol-navigation"),
                playerNames: (e) => e.get("rcp-fe-common-libs").playerNames,
                Replays: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Replays(),
                SharedReportModalApps: (e) =>
                  e
                    .get("rcp-fe-lol-shared-components")
                    .getApi_SharedReportModalApps(),
                SharedEmberComponents: (e) =>
                  e
                    .get("rcp-fe-lol-shared-components")
                    .getSharedEmberComponents(),
                Telemetry: (e) => e.get("rcp-fe-common-libs").getTelemetry(),
                TooltipManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getTooltipManager(),
                Viewport: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Viewport(),
                socket: (e) => e.getSocket(),
              })
              .then(() =>
                t.default.add({
                  EmberApplicationFactory: (e) =>
                    e.get("rcp-fe-ember-libs").getEmberApplicationFactory(),
                }),
              )
              .then(() => {
                const e = a(2).default();
                return t.default.add({ MatchApi: () => e }), e;
              });
          });
        },
        { once: !0 },
      );
    })();
})();
