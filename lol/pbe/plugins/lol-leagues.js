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
                            i = n._getValue(a, s);
                        i && i.then ? (i.then((function(e) {
                            e || console.warn("The promise for the key " + a + " resolved with a falsy value: ", e), n._addValue(a, e)
                        })), t.push(i)) : n._addValue(a, i)
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
        }, e => {
            "use strict";

            function t(e) {
                const n = {};
                for (const a in e) "object" == typeof e[a] ? n[a] = t(e[a]) : n[a] = e[a];
                return n
            }

            function n(e, t, n) {
                const {
                    regions: a,
                    region: s,
                    locale: i
                } = e.metadata();
                if ((n = n.get("metadata." + t)) && "region" === t && n.id !== s.id) {
                    const t = a[n.id],
                        s = t.defaultLocale ? t.defaultLocale.id : t.availableLocales[0].id;
                    e.setLocale(s, n.id)
                } else n && "locale" === t && n.id !== i.id && e.setLocale(n.id)
            }
            e.exports = function(e, a, s) {
                let i;
                const o = {
                    metadata: !0,
                    moment: !0
                };
                return a = a.observe((() => {
                    if (i) {
                        const e = t(a.metadata());
                        i.set("metadata", e), i.beginPropertyChanges(), Object.keys(o).forEach((e => {
                            i.propertyWillChange(e), i.propertyDidChange(e)
                        })), i.endPropertyChanges()
                    }
                })), i = e.Service.extend({
                    _tra: null,
                    init() {
                        this.wrapTra(a)
                    },
                    wrapTra(e) {
                        e && (this._tra = e, this.set("metadata", t(this._tra.metadata())), this.setLocale = this._tra.setLocale.bind(this._tra), this.formatString = this._tra.formatString.bind(this._tra), this.moment = this._tra.moment.bind(this._tra), this.ready = this._tra.ready.bind(this._tra), this.exists = this._tra.exists.bind(this._tra), this.getAsync = this._tra.getAsync.bind(this._tra), this.existsAsync = this._tra.existsAsync.bind(this._tra), this.numeral = this._tra.numeral.bind(this._tra))
                    },
                    unknownProperty(e) {
                        return o[e] = !0, this._tra.get(e)
                    },
                    willDestroy: () => this._tra.unregister(),
                    addOverlays: function(e) {
                        let t = this._tra;
                        for (const n of e) t = t.overlay(n);
                        t && this.wrapTra(t)
                    }
                }).create(), i.set("service", i), i.addObserver("metadata.region", n.bind(null, a, "region")), i.addObserver("metadata.locale", n.bind(null, a, "locale")), s && (console.warning("deprecated: pass a traService as a property of your Ember application definition"), s.register("tra:main", i, {
                    instantiate: !1
                }), s.inject("component", "tra", "tra:main"), s.inject("controller", "tra", "tra:main"), s.inject("view", "tra", "tra:main"), s.inject("model", "tra", "tra:main"), s.inject("route", "tra", "tra:main"), s.inject("service", "tra", "tra:main")), i
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = function(e, t, a) {
                const {
                    SharedEmberComponents: i,
                    ProfilesAPI: o,
                    RewardTrackerEmberComponents: l
                } = s.default, r = o.getRankedReferenceButton(), {
                    PlayerNameComponent: c
                } = i;
                t.setFactoryDefinition({
                    name: "LeaguesRootComponent",
                    tra: a,
                    ComponentFactory: e,
                    LeaguesRootComponent: n(4),
                    LeaguesCountdownsComponent: n(27),
                    MiniseriesResultsComponent: n(30),
                    PlayerNameComponent: c,
                    RankedBannerComponent: n(33),
                    RankedIntroComponent: n(36),
                    RankStandingComponent: n(39),
                    RankStandingHeaderButtonComponent: n(42),
                    RankStandingHeaderComponent: n(45),
                    RankStandingListComponent: n(48),
                    RankStandingRowComponent: n(52),
                    RankQueueDropdownComponent: n(75),
                    RankedRewardsComponent: n(78),
                    RankedRewardItemComponent: n(81),
                    RatedBadgeComponent: n(84),
                    ...l,
                    CountdownTimerComponent: n(87),
                    RenderTelemetrySenderComponent: i.RenderTelemetrySenderComponent,
                    SpectatorService: n(90),
                    ...i.EmberCollectionApi.registerToFactoryDefinition({}),
                    RankedReferenceModalButtonComponent: r.RankedReferenceModalButtonComponent
                }), t.setFactoryDefinition({
                    name: "LeaguesPromotionVignetteV2Component",
                    tra: a,
                    ComponentFactory: e,
                    LeaguesPromotionVignetteV2Component: n(91)
                }), t.setFactoryDefinition({
                    name: "LeaguesRewardVignetteComponent",
                    tra: a,
                    ComponentFactory: e,
                    LeaguesRewardVignetteComponent: n(95)
                }), t.setFactoryDefinition({
                    name: "RatedPromotionVignetteComponent",
                    tra: a,
                    ComponentFactory: e,
                    LeaguesPromotionVignetteComponent: n(98)
                }), t.setFactoryDefinition({
                    name: "CherryRatedPromotionVignetteComponent",
                    tra: a,
                    ComponentFactory: e,
                    LeaguesPromotionVignetteComponent: n(101)
                }), t.setFactoryDefinition({
                    name: "LeaguesNotificationsApp",
                    tra: a,
                    ComponentFactory: e,
                    NotificationsRootComponent: n(113),
                    SeasonStartModalComponent: n(115),
                    SplitNotificationsComponent: n(118),
                    SplitStartModalComponent: n(121),
                    EosNotificationsComponent: n(124),
                    SeasonMemorialModalComponent: n(127),
                    LeaguesDialogsComponent: n(130),
                    RewardsService: n(133),
                    CareerStatsService: s.default.CareerStatsAPI.getCareerStatsService()
                })
            };
            var a, s = (a = n(1)) && a.__esModule ? a : {
                default: a
            }
        }, (e, t, n) => {
            "use strict";
            var a = n(1),
                s = n(5),
                i = function(e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || "object" != typeof e && "function" != typeof e) return {
                        default: e
                    };
                    var n = l(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = {},
                        s = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var i in e)
                        if ("default" !== i && Object.prototype.hasOwnProperty.call(e, i)) {
                            var o = s ? Object.getOwnPropertyDescriptor(e, i) : null;
                            o && (o.get || o.set) ? Object.defineProperty(a, i, o) : a[i] = e[i]
                        } a.default = e, n && n.set(e, a);
                    return a
                }(n(23)),
                o = n(24);

            function l(e) {
                if ("function" != typeof WeakMap) return null;
                var t = new WeakMap,
                    n = new WeakMap;
                return (l = function(e) {
                    return e ? n : t
                })(e)
            }
            n(25);
            const r = 864e5,
                c = 36e5,
                u = (0, a.emberDataBinding)({
                    Ember: a.Ember,
                    websocket: (0, a.getProvider)().getSocket(),
                    basePaths: {
                        summoner: "/lol-summoner",
                        ranked: "/lol-ranked",
                        chat: "/lol-chat",
                        honor: "/lol-honor-v2",
                        seasons: "/lol-seasons",
                        platformConfig: "/lol-platform-config",
                        gameData: "/lol-game-data",
                        clientConfig: "/lol-client-config"
                    },
                    boundProperties: {
                        summonerReady: {
                            api: "summoner",
                            path: "/v1/summoner-requests-ready"
                        },
                        currentSummoner: {
                            api: "summoner",
                            path: "/v1/current-summoner"
                        },
                        myRankedStats: {
                            api: "ranked",
                            path: "/v1/current-ranked-stats"
                        },
                        honorProfile: {
                            api: "honor",
                            path: "/v1/profile"
                        },
                        splitsConfig: {
                            api: "ranked",
                            path: "/v1/splits-config"
                        },
                        currentSeason: {
                            api: "seasons",
                            path: "/v1/season/product/LOL"
                        },
                        challengerLaddersEnabled: {
                            api: "ranked",
                            path: "/v1/challenger-ladders-enabled"
                        },
                        topRatedLaddersEnabled: {
                            api: "ranked",
                            path: "/v1/top-rated-ladders-enabled"
                        },
                        uxSettings: "/lol-settings/v2/local/lol-user-experience",
                        tftSets: {
                            api: "gameData",
                            path: "/assets/v1/tftsets.json"
                        },
                        spectateBySummonerIdEnabled: {
                            api: "clientConfig",
                            path: "/v3/client-config/lol.client_settings.spectator.spectateBySummonerIdEnabled"
                        }
                    }
                });
            e.exports = a.Ember.Component.extend(u, {
                classNames: ["leagues-root-component"],
                layout: n(26),
                leagues: null,
                leaguesQueueOrders: i.SUMMONER_QUEUE_ORDER,
                leaguesQueues: s.QUEUES.ALL_RANKED_AND_RATED_QUEUE_TYPES,
                isLoading: !0,
                selectedState: null,
                spectatableSummonerNames: [],
                spectatableSummonerIds: [],
                leagueTierNames: a.LeagueTierNames,
                leagueTypeSelected: "summoner",
                honorLevel: 0,
                rankedService: (0, a.dataBinding)("/lol-ranked", (0, a.getProvider)().getSocket()),
                chatService: (0, a.dataBinding)("/lol-chat", (0, a.getProvider)().getSocket()),
                spectatorService: a.Ember.inject.service("spectator"),
                init: function() {
                    this._super(...arguments);
                    const e = this.get("chatService");
                    this.set("leagues", a.Ember.Object.create({
                        apexQueueInfoByQueueAndTier: {}
                    })), this.set("ratedLadderByQueueType", a.Ember.Object.create({})), this.set("selectedState", a.Ember.Object.create()), e.observe("/v1/friends", this, this._handleFriendsData)
                },
                didInsertElement: function() {
                    this._super(...arguments), this.set("animationClass", "popup");
                    const e = this.$("div.lol-leagues-display-area");
                    e && this.set("displayArea", e.last())
                },
                willDestroyElement: function() {
                    this._super(...arguments);
                    const e = this.get("rankedService"),
                        t = this.get("chatService");
                    e.unobserve(this), t.unobserve(this)
                },
                summonerReadyChanged: a.Ember.observer("summonerReady", (function() {
                    const e = this.get("summonerReady"),
                        t = this.get("summonerId"),
                        n = this.get("honorProfile"),
                        a = this.get("puuid"),
                        s = this.get("rankedService"),
                        i = `/v1/league-ladders/${a}`;
                    if (!e) return;
                    const o = this.get("currentSummoner");
                    this.set("viewerId", o.summonerId), n && this.set("honorLevel", n.honorLevel), t && o.summonerId !== t ? s.observe(i, this, this._handleSummonerLeaguesData) : (this.set("summonerId", o.summonerId), this.set("puuid", o.puuid), s.observe("/v1/current-ranked-stats", this, this._handleCurrentRankedStatsUpdate))
                })),
                _handleCurrentRankedStatsUpdate: function(e) {
                    if (!e) return;
                    this.set("rewardsProgress", e.splitsProgress);
                    const t = this.get("rankedService"),
                        n = `/v1/league-ladders/${this.get("puuid")}`,
                        a = this._handleSummonerLeaguesData.bind(this);
                    t.get(n, {
                        skipCache: !0
                    }).then((e => {
                        a(e)
                    }))
                },
                _handleSummonerLeaguesData: function(e) {
                    if (!e) return;
                    if (!this.get("isViewingLocalSummoner") && this.leagueTierNames.isApexForQueue(e[0])) {
                        let t = e[0];
                        this._cacheApexQueueInfo(t, t.queueType, t.tier), t = this._getCachedApexLeagues(t.queueType)
                    }
                    const t = this.enrichSummonerLeaguesData(e);
                    e && e[0].queueType && this.set("highestRankedQueueType", e[0].queueType), this.set("leagues.summonerLeagues", t), this.set("isLoading", !1)
                },
                _handleApexQueueInfoData: function(e, t, n) {
                    return e ? (this._cacheApexQueueInfo(e, t, n), e.divisions = this._getCachedApexLeagues(t), Promise.resolve(this.enrichSummonerLeaguesData([e], !0)).then((e => e))) : Promise.resolve()
                },
                _cacheApexQueueInfo: function(e, t, n) {
                    if (this.get(`leagues.apexQueueInfoByQueueAndTier.${t}`)) this.set(`leagues.apexQueueInfoByQueueAndTier.${t}.${n}`, e);
                    else {
                        const a = {};
                        a[n] = e, this.set(`leagues.apexQueueInfoByQueueAndTier.${t}`, a)
                    }
                },
                _getCachedApexLeagues: function(e) {
                    const t = this.get(`leagues.apexQueueInfoByQueueAndTier.${e}`);
                    return Object.keys(t).map((e => (t[e].divisions || []).find((t => t && t.tier === e))))
                },
                _handleFriendsData: function(e) {
                    e && this.set("friendsIdSet", new Set(a.Lodash.map(e, (e => e.summonerId))))
                },
                defaultLeagueObserver: a.Ember.observer("isLoading", "leagues.summonerLeagues", (function() {
                    if (this.get("isLoading")) return;
                    const e = this.get("leagues.summonerLeagues"),
                        t = this.get("highestRankedQueueType") || this.get("leaguesQueues.0"),
                        n = a.Lodash.find(e, {
                            queueType: t
                        });
                    n && this._selectLeague(n)
                })),
                _selectLeague: function(e, t) {
                    this.set("spectatableSummonerNames", []), this.set("spectatableSummonerIds", []);
                    const n = e && this.leagueTierNames.isApexForQueue(e),
                        a = this._selectDivisionFromLeague(e, n),
                        s = this._selectStandingFromDivision(a);
                    this.get("selectedState").setProperties({
                        league: e,
                        division: a,
                        standing: s,
                        isViewingTopPlayers: t || n && !this.get("isViewingLocalSummoner"),
                        isViewingApexTier: n,
                        isViewingRatedLadder: !1
                    }), this._animateLeagueChange()
                },
                _selectDivisionFromLeague: function(e, t) {
                    let n;
                    return n = t ? a.Lodash.find(e.divisions, {
                        tier: e.requestedRankedEntry && e.requestedRankedEntry.tier || e.tier
                    }) : a.Lodash.find(e.divisions, {
                        division: e.requestedRankedEntry && e.requestedRankedEntry.division
                    }), n || (n = e.divisions[0]), n
                },
                _selectStandingFromDivision: function(e) {
                    if (!e || !e.standings) return null;
                    const t = this.get("summonerId"),
                        n = a.Lodash.find(e.standings, (e => e.summonerId === t));
                    return n || e.standings[0]
                },
                _applyRelationshipsToQueuesStandings: function(e) {
                    e && a.Lodash.forEach(e, (e => {
                        a.Lodash.forEach(e.divisions, (e => {
                            a.Lodash.forEach(e.standings, (e => {
                                this._applyRelationship(e)
                            }))
                        }))
                    }))
                },
                _applyRelationship: function(e) {
                    const t = e.summonerId,
                        n = this.get("viewerId"),
                        a = this.get("friendsIdSet");
                    let s = null;
                    a && a.has(t) && (s = i.StandingRelationship.FRIEND), e.set("relationship", n === t ? i.StandingRelationship.SELF : s)
                },
                _fillInDivisions: function(e, t) {
                    const n = [];
                    let s, i;
                    return t ? (s = a.LeaguesConsts.APEX_TIERS.slice(), i = "tier") : (s = a.LeaguesConsts.DIVISIONS.slice(), i = "division"), s.forEach((s => {
                        let o, l, r = a.Lodash.filter(e.divisions, (e => e && e[i] === s))[0];
                        t ? (l = s, o = "I") : (l = e.tier, o = s), r || (r = {
                            division: o,
                            tier: l,
                            standings: []
                        }), n.push(r)
                    })), n
                },
                enrichSummonerLeaguesData: function(e, t) {
                    const n = this.get("leaguesQueueOrders"),
                        s = a.Lodash.sortBy(e, (e => n[e.queueType])),
                        i = a.Lodash.each(s, (e => {
                            const n = this.leagueTierNames.isApexForQueue(e);
                            if (e.queueTypeDisplay = t ? this.get("tra").formatString("LEAGUES_DROPDOWN_APEX", {
                                    queueType: this.leagueTierNames.getRankedQueueName(e.queueType)
                                }) : this.leagueTierNames.getRankedQueueName(e.queueType), e.divisions) {
                                e.divisions = this._fillInDivisions(e, n);
                                for (let t = 0; t < e.divisions.length; t++) {
                                    const n = e.divisions[t];
                                    n.position = t, n.standings = this.arrayToEmberObjects(n.standings), n.standings.forEach((e => {
                                        e.division = n.division || "NONE", e.tier = n.tier
                                    }))
                                }
                            }
                        }));
                    return this._applyRelationshipsToQueuesStandings(e), i
                },
                arrayToEmberObjects: e => a.Lodash.map(e, (e => a.Ember.Object.create(e))),
                _getSummonerStandingsForSpecificApexTier: function(e, t) {
                    return a.Lodash.find(e, (e => e.tier === t)).standings
                },
                _enrichSpectateAvailability: function(e) {
                    const t = this._getSummonerStandingsForSpecificApexTier(e.divisions, e.tier);
                    this.get("spectateBySummonerIdEnabled") ? this.get("spectatorService").availableForSpectateBySummonerIds(t.map((e => e.summonerId))).then((t => {
                        const n = this.get("selectedState");
                        n.league.queueType === e.queueType && n.league.tier === e.tier && this.set("spectatableSummonerIds", t)
                    })) : this.get("spectatorService").availableForSpectateBySummonerNames(t.map((e => e.summonerName))).then((t => {
                        const n = this.get("selectedState");
                        n.league.queueType === e.queueType && n.league.tier === e.tier && this.set("spectatableSummonerNames", t)
                    }))
                },
                _translate: function(e, t) {
                    return this.get("tra.formatString")(e, t)
                },
                _animateLeagueChange: function() {
                    const e = this.get("displayArea");
                    e && (this.set("animationClass", "popup"), e.on("animationend", (() => {
                        e.off("animationend"), this.set("animationClass", "")
                    })))
                },
                isAnimationEnabled: a.Ember.computed("uxSettings.data.potatoModeEnabled", (function() {
                    return !this.get("uxSettings.data.potatoModeEnabled")
                })),
                bannerProperties: a.Ember.computed("selectedState.standing.puuid", "selectedState.league.queueType", "selectedState.standing.wins", "selectedState.standing.losses", "selectedState.division.division", "selectedState.division.tier", "selectedState.standing.division", "selectedState.standing.tier", "selectedState.league.tier", "selectedState.league.provisionalGameThreshold", "selectedState.standing.provisionalGamesRemaining", "selectedState.standing.isProvisional", "selectedState.standing.points", "selectedState.standing.position", (function() {
                    const e = this.get("selectedState.standing.wins") + this.get("selectedState.standing.losses"),
                        t = this.get("selectedState.standing.isProvisional"),
                        n = this.get("selectedState.standing.tier") || this.get("selectedState.division.tier") || this.get("selectedState.league.tier");
                    return {
                        puuid: this.get("selectedState.standing.puuid"),
                        queueType: this.get("selectedState.league.queueType"),
                        tier: n,
                        division: this.get("selectedState.standing.division") || this.get("selectedState.division.division"),
                        leaguePoints: this.get("selectedState.standing.leaguePoints"),
                        miniseries: this.get("selectedState.standing.miniseriesResults"),
                        ladderRank: this.get("selectedState.standing.position"),
                        games: e,
                        isProvisional: t,
                        provisionalGameThreshold: this.get("selectedState.league.provisionalGameThreshold"),
                        provisionalGamesRemaining: this.get("selectedState.standing.provisionalGamesRemaining")
                    }
                })),
                showingPlayerNotRanked: a.Ember.computed("selectedState.league", "selectedState.isViewingTopPlayers", "selectedState.isViewingRatedLadder", (function() {
                    if (this.get("selectedState.isViewingRatedLadder")) return !1;
                    const e = this.get("selectedState.league"),
                        t = this.get("selectedState.isViewingTopPlayers");
                    return !e || !this.get("selectedState.league.requestedRankedEntry") && !t
                })),
                showingRewards: a.Ember.computed("isViewingLocalSummoner", "splitsConfig.currentSplit", "rewardsProgress", "isViewingCherry", (function() {
                    const e = this.get("isViewingLocalSummoner"),
                        t = !!this.get("splitsConfig.currentSplit"),
                        n = null !== this.get("rewardsProgress");
                    return e && t && n && !this.get("isViewingCherry")
                })),
                isShowingLol: a.Ember.computed("isViewingTft", "isViewingCherry", (function() {
                    return !this.get("isViewingTft") && !this.get("isViewingCherry")
                })),
                isShowingSplitEndCountdown: a.Ember.computed("showingRewards", "isViewingTft", (function() {
                    return this.get("showingRewards") && !this.get("isViewingTft")
                })),
                splitTimeRemainingText: a.Ember.computed("splitsConfig.currentSplit.endTimeMillis", (function() {
                    const e = this.get("splitsConfig.currentSplit.endTimeMillis") - Date.now(),
                        t = this.get("tra");
                    if (!t) return "";
                    const n = Math.floor(e / r),
                        a = Math.floor(e % r / c),
                        s = Math.floor(e % c / 6e4);
                    return t.formatString("RANK_REWARDS_SPLIT_COUNTDOWN", {
                        daysRemaining: n,
                        hoursRemaining: a,
                        minutesRemaining: s
                    })
                })),
                isViewingTft: a.Ember.computed("selectedState.league", (function() {
                    return (0, o.isTftQueueType)(this.get("selectedState.league.queueType"))
                })),
                isViewingCherry: a.Ember.computed("selectedState.league", (function() {
                    return "CHERRY" === this.get("selectedState.league.queueType")
                })),
                nextUpdateMillis: a.Ember.computed("selectedState.league.nextApexUpdateMillis", "selectedState.league.nextRatedUpdateMillis", (function() {
                    const e = this.get("selectedState.league") || {};
                    return e.nextApexUpdateMillis || e.nextRatedUpdateMillis
                })),
                currentSeasonYear: a.Ember.computed("currentSeason.seasonStart", (function() {
                    const e = this.get("currentSeason.seasonStart");
                    return e ? new Date(e).getFullYear() : (new Date).getFullYear()
                })),
                seasonNameText: a.Ember.computed("isViewingCherry", "isViewingTft", "tftSets", "currentSeasonYear", "currentSeason.metadata.currentSplit", (function() {
                    const e = this.get("tra");
                    if (this.get("isViewingCherry")) return this.get("tra.QUEUE_NAME_CHERRY");
                    if (this.get("isViewingTft")) return this.get("tftSets").LCTFTModeData.mDefaultSet.SetDisplayName;
                    {
                        const t = this.get("currentSeasonYear"),
                            n = this.get("currentSeason.metadata.currentSplit");
                        return e.formatString("LEAGUES_PROFILE_SEASON_NAME_HEADER", {
                            currentSeasonYear: t,
                            splitNumber: n
                        })
                    }
                })),
                viewedSummonerId: a.Ember.computed("summonerId", "currentSummoner.summonerId", (function() {
                    return this.get("summonerId") || this.get("currentSummoner.summonerId")
                })),
                isViewingLocalSummoner: a.Ember.computed("currentSummoner.summonerId", "summonerId", (function() {
                    return this.get("currentSummoner.summonerId") === this.get("summonerId")
                })),
                _selectStanding: function(e) {
                    this.get("selectedState").set("standing", e)
                },
                _selectDivision: function(e) {
                    const t = this.get("selectedState.league"),
                        n = this._selectStandingFromDivision(e);
                    this.get("selectedState").setProperties({
                        summonerId: this.get("summonerId"),
                        league: t,
                        division: e,
                        standing: n
                    })
                },
                _selectLeagueType: function(e, t) {
                    switch (this.get("leagueTypeSelected") !== e && this.set("leagueTypeSelected", e), e) {
                        case "unranked":
                            this._selectUnranked();
                            break;
                        case "rated":
                            this._selectRated(t);
                            break;
                        case "summoner": {
                            const e = this.get("leagues.summonerLeagues").find((e => e.queueType === t));
                            this._selectLeague(e);
                            break
                        }
                        default:
                            this._requestAndSelectApexLeague(t, "CHALLENGER")
                    }
                },
                _selectUnranked: function() {
                    this.get("selectedState").setProperties({
                        league: null,
                        division: null,
                        standing: null
                    })
                },
                _requestApexData: function(e, t) {
                    const n = this.get(`leagues.apexQueueInfoByQueueAndTier.${e}.${t}`);
                    return n ? Promise.resolve(this._handleApexQueueInfoData(n, e, t)) : this.rankedService.get(`/v1/apex-leagues/${e}/${t}`, {
                        skipCache: !0
                    }).then((n => this._handleApexQueueInfoData(n, e, t)))
                },
                _requestAndSelectApexLeague: function(e = "RANKED_SOLO_5x5", t = "CHALLENGER") {
                    return this._requestApexData(e, t).then((t => {
                        const n = a.Lodash.find(t, (t => t.queueType === e));
                        this._selectLeague(n, !0), window.requestAnimationFrame((() => {
                            this._enrichSpectateAvailability(n)
                        }))
                    }))
                },
                _handleRatedLadderInfo(e, t) {
                    if (!e) return;
                    this.set(`ratedLadderByQueueType.${t}`, e);
                    this.get("selectedState").setProperties({
                        league: e,
                        division: null,
                        standing: null,
                        isViewingTopPlayers: !1,
                        isViewingApexTier: !1,
                        isViewingRatedLadder: !0
                    })
                },
                _requestRatedLadderInfo: function(e) {
                    const t = this.get(`ratedLadderByQueueType.${e}`),
                        n = t && t.nextRatedUpdateMillis - (new Date).getTime();
                    n && n > 0 ? this._handleRatedLadderInfo(t, e) : this.rankedService.get(`/v1/rated-ladder/${e}`, {
                        skipCache: !0
                    }).then((t => {
                        const n = (new Date).getTime();
                        t.nextRatedUpdateMillis = n + (i.RATED_LADDER_REFRESH_TIME_MILLIS - n % i.RATED_LADDER_REFRESH_TIME_MILLIS), this._handleRatedLadderInfo(t, e)
                    }))
                },
                _selectRated: function(e) {
                    this._requestRatedLadderInfo(e)
                },
                faqText: a.Ember.computed("isViewingTft", (function() {
                    return this.get("isViewingTft") ? this.get("tra.LEAGUES_FAQ_LINK_LABEL_TFT") : this.get("tra.LEAGUES_FAQ_LINK_LABEL")
                })),
                faqUrl: a.Ember.computed("isViewingTft", (function() {
                    return this.get("isViewingTft") ? this.get("tra.LEAGUES_FAQ_LINK_URL_TFT") : this.get("tra.LEAGUES_FAQ_LINK_URL")
                })),
                actions: {
                    selectLeagueType: function(e, t) {
                        this._selectLeagueType(e, t)
                    },
                    selectStanding: function(e) {
                        this._selectStanding(e)
                    },
                    selectDivision: function(e) {
                        this._selectDivision(e)
                    },
                    selectApexLeague: function(e, t = "CHALLENGER") {
                        return this._requestAndSelectApexLeague(e, t)
                    },
                    refreshRankings: function() {
                        const e = this.get("leagueTypeSelected"),
                            t = this.get("selectedState.league.queueType");
                        this._selectLeagueType(e, t)
                    }
                }
            })
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
                    return r.default
                }
            }), Object.defineProperty(t, "QUEUES", {
                enumerable: !0,
                get: function() {
                    return s.default
                }
            }), Object.defineProperty(t, "REWARD_TRACKER", {
                enumerable: !0,
                get: function() {
                    return i.default
                }
            }), Object.defineProperty(t, "SETTINGS", {
                enumerable: !0,
                get: function() {
                    return l.default
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
            var a = u(n(6)),
                s = u(n(17)),
                i = u(n(18)),
                o = u(n(19)),
                l = u(n(20)),
                r = u(n(21)),
                c = u(n(22));

            function u(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = m(n(7)),
                s = m(n(8)),
                i = m(n(9)),
                o = m(n(10)),
                l = m(n(11)),
                r = m(n(12)),
                c = m(n(13)),
                u = m(n(14)),
                d = m(n(15)),
                p = m(n(16));

            function m(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            var g = {
                COMPONENT_TYPES: a.default,
                CURRENCY_TYPES: s.default,
                INVENTORY_TYPES: i.default,
                MEDIA_TYPES: o.default,
                MEDIA_LOAD_TYPES: l.default,
                MODAL_TYPES: r.default,
                OFFER_PURCHASE_STATES: c.default,
                OFFER_VALIDATION_STATES: u.default,
                SCROLL_LIST_DISPLAY_TYPES: d.default,
                TEMPLATE_TYPES: p.default
            };
            t.default = g
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
                i = "CHERRY",
                o = "RANKED_TFT",
                l = "RANKED_TFT_DOUBLE_UP",
                r = "RANKED_TFT_TURBO",
                c = "RANKED_TFT_PAIRS",
                u = [n, a],
                d = [...u, s],
                p = [i],
                m = [o, l],
                g = [r, c],
                h = [...m, ...g],
                f = [...d, ...m],
                _ = [...g, ...p];
            var E = {
                RANKED_SOLO_5x5_QUEUE_TYPE: n,
                RANKED_FLEX_SR_QUEUE_TYPE: a,
                RANKED_FLEX_TT_QUEUE_TYPE: s,
                RANKED_CHERRY_QUEUE_TYPE: i,
                RANKED_TFT_QUEUE_TYPE: o,
                RANKED_TFT_DOUBLE_UP_QUEUE_TYPE: l,
                RANKED_TFT_TURBO_QUEUE_TYPE: r,
                RANKED_TFT_PAIRS_QUEUE_TYPE: c,
                RANKED_LOL_QUEUE_TYPES: d,
                RANKED_SR_QUEUE_TYPES: u,
                RANKED_TFT_QUEUE_TYPES: m,
                RATED_TFT_QUEUE_TYPES: g,
                RANKED_AND_RATED_TFT_QUEUE_TYPES: h,
                ALL_RANKED_QUEUE_TYPES: f,
                ALL_RATED_QUEUE_TYPES: _,
                ALL_RANKED_AND_RATED_QUEUE_TYPES: [...f, ..._]
            };
            t.default = E
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
                i = 6048e5,
                o = {
                    MILLISECONDS_IN_A_SECOND: 1e3,
                    MILLISECONDS_IN_A_MINUTE: 6e4,
                    MILLISECONDS_IN_A_HOUR: a,
                    MILLISECONDS_IN_A_DAY: s,
                    MILLISECONDS_IN_A_WEEK: i,
                    MILLISECONDS_IN_A_YEAR: 314496e5
                };
            t.TIME_CONVERSIONS = o;
            var l = {
                TIME_UNITS: n,
                TIME_CONVERSIONS: o
            };
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.StandingRelationship = t.SUMMONER_QUEUE_ORDER = t.SUMMONER_ICON_REWARD_TYPE = t.SEASON_YEAR_BASE = t.RATED_LADDER_REFRESH_TIME_MILLIS = t.PROMOTE_COUNTDOWN_INTERVAL_MS = t.PROFILE_STATS_SUBSECTION_ID = t.PROFILE_RANKED_SUBSECTION_ID = t.LP_SPLASH_LOSS_SCORE_REASON = t.LP_SPLASH_BONUS_REASONS = t.LOTTIE_JSON_PATH = t.EOS_NOTIFICATION_TYPES = t.ASSET_PATH = void 0;
            var a = n(5);
            t.ASSET_PATH = "fe/lol-static-assets/";
            t.LOTTIE_JSON_PATH = "fe/lol-leagues/";
            t.PROMOTE_COUNTDOWN_INTERVAL_MS = 1e3;
            t.SEASON_YEAR_BASE = 2010;
            const s = {
                [a.QUEUES.RANKED_SOLO_5x5_QUEUE_TYPE]: 10,
                [a.QUEUES.RANKED_FLEX_SR_QUEUE_TYPE]: 20,
                [a.QUEUES.RANKED_FLEX_TT_QUEUE_TYPE]: 30,
                [a.QUEUES.RANKED_TFT_QUEUE_TYPE]: 40,
                [a.QUEUES.RANKED_TFT_DOUBLE_UP_QUEUE_TYPE]: 50,
                [a.QUEUES.RANKED_TFT_TURBO_QUEUE_TYPE]: 60,
                [a.QUEUES.RANKED_TFT_PAIRS_QUEUE_TYPE]: 70
            };
            t.SUMMONER_QUEUE_ORDER = s;
            t.RATED_LADDER_REFRESH_TIME_MILLIS = 3e5;
            t.StandingRelationship = {
                NONE: "NONE",
                SELF: "SELF",
                FRIEND: "FRIEND"
            };
            t.LP_SPLASH_BONUS_REASONS = ["SPLASHING_SECONDARY_WIN", "SPLASHING_FILL_WIN", "SPLASHING_AUTOFILL_WIN"];
            t.LP_SPLASH_LOSS_SCORE_REASON = "SPLASHING_LOSS_SCORE_LOSS";
            t.PROFILE_RANKED_SUBSECTION_ID = "profile_subsection_leagues";
            t.PROFILE_STATS_SUBSECTION_ID = "profile_subsection_career_stats";
            t.EOS_NOTIFICATION_TYPES = {
                FIRST_WARNING: "FIRST_WARNING",
                SECOND_WARNING: "SECOND_WARNING",
                SEASON_ENDED: "SEASON_ENDED"
            };
            t.SUMMONER_ICON_REWARD_TYPE = "SUMMONER_ICON"
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.isTftQueueType = function(e) {
                return a.QUEUES.RANKED_AND_RATED_TFT_QUEUE_TYPES.includes(e)
            };
            var a = n(5)
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "RXL7bDSN",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-root-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-root-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-root-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["loading-spinner ",["helper",["unless"],[["get",["isLoading"]],"loading-fade-out"],null]]]],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["smoke-background-container ",["helper",["if"],[["get",["showingPlayerNotRanked"]],"removed"],null]]]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-parallax-background",[]],["dynamic-attr","animated",["concat",[["unknown",["isAnimationEnabled"]]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["ranked-intro-background ",["helper",["unless"],[["get",["showingPlayerNotRanked"]],"removed"],null]]]],["flush-element"],["close-element"],["text","\\n"],["block",["render-telemetry-sender"],null,[["renderEventName"],["profile-ranked-rendered"]],7]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["ranked-rewards"],null,[["rewardsProgress","honorLevel","splitsConfig","hidingRewards","myRankedStats","victoriousSkinItemInstanceId"],[["get",["rewardsProgress"]],["get",["honorLevel"]],["get",["splitsConfig"]],["get",["isViewingTft"]],["get",["myRankedStats"]],["get",["splitsConfig","currentSplit","victoriousSkinRewardGroup","itemInstanceId"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["helper",["ranked-banner"],null,[["puuid","queueType","tier","division","ladderRank","leaguePoints","miniseries","games","isAnimationEnabled","provisionalGameThreshold","provisionalGamesRemaining","isProvisional"],[["get",["bannerProperties","puuid"]],["get",["bannerProperties","queueType"]],["get",["bannerProperties","tier"]],["get",["bannerProperties","division"]],["get",["bannerProperties","ladderRank"]],["get",["bannerProperties","leaguePoints"]],["get",["bannerProperties","miniseries"]],["get",["bannerProperties","games"]],["get",["isAnimationEnabled"]],["get",["bannerProperties","provisionalGameThreshold"]],["get",["bannerProperties","provisionalGamesRemaining"]],["get",["bannerProperties","isProvisional"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["helper",["rated-badge"],null,[["puuid","summoner","queueType"],[["get",["puuid"]],["get",["currentSummoner"]],["get",["selectedState","league","queueType"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-wrapper"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","lol-leagues-left-container"],["flush-element"],["text","\\n            "],["append",["helper",["rank-standing"],null,[["selectedState","selectDivision","selectStanding","spectatableSummonerNames","spectatableSummonerIds","showingRewards","spectateBySummonerIdEnabled","onSelectApexLeague"],[["get",["selectedState"]],"selectDivision",["helper",["action"],[["get",[null]],"selectStanding"],null],["get",["spectatableSummonerNames"]],["get",["spectatableSummonerIds"]],["get",["showingRewards"]],["get",["spectateBySummonerIdEnabled"]],["helper",["action"],[["get",[null]],"selectApexLeague"],null]]]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","lol-leagues-right-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["selectedState","isViewingRatedLadder"]]],null,2,1],["text","          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["ranked-intro"],null,[["league"],[["get",["selectedState","league"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","lol-leagues-header-split-info-remaining-time-container"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","lol-leagues-header-split-info-remaining-time-icon"],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","lol-leagues-header-split-info-remaining-time"],["flush-element"],["append",["unknown",["splitTimeRemainingText"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","ranked-reference-modal-button-container"],["flush-element"],["text","\\n                    "],["append",["helper",["ranked-reference-modal-button"],null,[["queueType"],[["get",["selectedState","league","queueType"]]]]],false],["text","\\n                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["lol-leagues-container ",["helper",["if"],[["get",["isLoading"]],"loading-hidden","loading-fade-in"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["lol-leagues-display-area ",["unknown",["animationClass"]]]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-info-header-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","lol-leagues-info-season-header"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","lol-leagues-season-info-container"],["flush-element"],["text","\\n            "],["append",["unknown",["seasonNameText"]],false],["text","\\n"],["block",["if"],[["get",["isShowingLol"]]],null,6],["text","          "],["close-element"],["text","\\n"],["block",["if"],[["get",["isShowingSplitEndCountdown"]]],null,5],["text","        "],["close-element"],["text","\\n        "],["append",["helper",["leagues-countdowns"],null,[["league","myRankedStats","nextUpdateMillis","isViewingApexTier","isViewingRatedLadder","onRefresh"],[["get",["selectedState","league"]],["get",["myRankedStats"]],["get",["nextUpdateMillis"]],["get",["selectedState","isViewingApexTier"]],["get",["selectedState","isViewingRatedLadder"]],["helper",["action"],[["get",[null]],"refreshRankings"],null]]]],false],["text","\\n      "],["close-element"],["text","\\n"],["block",["if"],[["get",["showingPlayerNotRanked"]]],null,4,3],["text","    "],["close-element"],["text","\\n"],["block",["if"],[["get",["showingRewards"]]],null,0],["text","    "],["append",["helper",["rank-queue-dropdown"],null,[["overlayMode","selectedLeague","leagues","leagueTypeSelected","challengerLaddersEnabled","topRatedLaddersEnabled","tooltipMessages","onSelectLeagueType"],[["get",["overlayMode"]],["get",["selectedState","league"]],["get",["leagues"]],["get",["leagueTypeSelected"]],["get",["challengerLaddersEnabled"]],["get",["topRatedLaddersEnabled"]],["get",["tooltipMessages"]],"selectLeagueType"]]],false],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-faq-right"],["flush-element"],["text","\\n      "],["open-element","a",[]],["dynamic-attr","href",["concat",[["unknown",["faqUrl"]]]]],["static-attr","target","_new"],["static-attr","class","lol-leagues-faq-btn"],["flush-element"],["append",["unknown",["faqText"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1);
            n(28), e.exports = a.Ember.Component.extend({
                classNames: ["leagues-countdowns-component"],
                layout: n(29),
                leagueTierNames: a.LeagueTierNames,
                isValidDaysUntilDecay: a.Ember.computed("daysUntilDecay", (function() {
                    const e = this.get("daysUntilDecay");
                    return null != e && e >= -1
                })),
                daysUntilDecay: a.Ember.computed("league", "myRankedStats", "isViewingApexTier", (function() {
                    const e = this.get("league"),
                        t = this.get("myRankedStats"),
                        n = this.get("isViewingApexTier");
                    if (!e || !t || !t.queues) return null;
                    const {
                        queueType: a
                    } = e;
                    for (const e of t.queues)
                        if (e.queueType === a && this.leagueTierNames.isApexForQueue(e) === n && e.warnings) return e.warnings.daysUntilDecay;
                    return null
                })),
                shouldDisplayDecayWarningInDays: a.Ember.computed("isValidDaysUntilDecay", "shouldDisplayDecayWarningInCountdownTimer", (function() {
                    const e = this.get("isValidDaysUntilDecay"),
                        t = this.get("shouldDisplayDecayWarningInCountdownTimer");
                    return e && !t
                })),
                decayWarningText: a.Ember.computed("daysUntilDecay", "isViewingApexTier", (function() {
                    const e = this.get("daysUntilDecay");
                    return this.get("isViewingApexTier") && e <= 0 ? this.get("tra.RANKED_DECAY_NEXT_UPDATE") : this.get("tra.RANKED_DECAY_GENERIC")
                })),
                decayWarningDaysRemaining: a.Ember.computed("daysUntilDecay", (function() {
                    const e = this.get("daysUntilDecay");
                    return e > 0 ? this.get("tra").formatString("RANKED_DAYS", {
                        days: e
                    }) : ""
                })),
                shouldDisplayDecayWarningInCountdownTimer: a.Ember.computed("isValidDaysUntilDecay", "daysUntilDecay", "isViewingApexTier", (function() {
                    const e = this.get("isValidDaysUntilDecay"),
                        t = this.get("daysUntilDecay"),
                        n = this.get("isViewingApexTier");
                    return e && !n && (0 === t || -1 === t)
                })),
                countdownLabel: a.Ember.computed("shouldDisplayDecayWarningInCountdownTimer", "decayWarningText", (function() {
                    return this.get("shouldDisplayDecayWarningInCountdownTimer") ? this.get("decayWarningText") : this.get("tra.RANKED_NEXT_LADDER_UPDATE_COUNTDOWN_LABEL")
                })),
                isDecayUrgent: a.Ember.computed("isValidDaysUntilDecay", "daysUntilDecay", (function() {
                    const e = this.get("isValidDaysUntilDecay"),
                        t = this.get("daysUntilDecay");
                    return e && t <= 0
                })),
                shouldCountdownTimerBeUrgent: a.Ember.computed("isDecayUrgent", "shouldDisplayDecayWarningInCountdownTimer", (function() {
                    const e = this.get("isDecayUrgent"),
                        t = this.get("shouldDisplayDecayWarningInCountdownTimer");
                    return e && t
                })),
                shouldDisplayCountdownTimer: a.Ember.computed("isViewingApexTier", "isViewingRatedLadder", "shouldDisplayDecayWarningInCountdownTimer", "nextUpdateMillis", (function() {
                    const e = this.get("isViewingApexTier"),
                        t = this.get("isViewingRatedLadder"),
                        n = this.get("shouldDisplayDecayWarningInCountdownTimer"),
                        a = this.get("nextUpdateMillis");
                    return (n || e || t) && a > 0
                }))
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "SYCIU8S1",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-countdowns\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-countdowns\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-countdowns\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-leagues-info-leagues-countdowns-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["shouldDisplayDecayWarningInDays"]]],null,5],["block",["if"],[["get",["shouldDisplayCountdownTimer"]]],null,2],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["text","\\n              "],["append",["helper",["sanitize"],[["get",["tra","RANKED_DECAY_TOOLTIP"]]],null],false],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-info-icon",[]],["static-attr","class","ranked-reference-modal-question-mark"],["flush-element"],["text","\\n        "],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["right"]],0]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-countdown-timer-wrapper"],["flush-element"],["text","\\n      "],["append",["helper",["countdown-timer"],null,[["countdownLabel","countdownToTime","isUrgent","onRefresh"],[["get",["countdownLabel"]],["get",["nextUpdateMillis"]],["get",["shouldCountdownTimerBeUrgent"]],["helper",["action"],[["get",[null]],["get",["onRefresh"]]],null]]]],false],["text","\\n"],["block",["if"],[["get",["shouldDisplayDecayWarningInCountdownTimer"]]],null,1],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["text","\\n            "],["append",["helper",["sanitize"],[["get",["tra","RANKED_DECAY_TOOLTIP"]]],null],false],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","         \\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["lol-leagues-decay-warning-countdown ",["helper",["if"],[["get",["isDecayUrgent"]],"decay-urgent"],null]]]],["flush-element"],["text","\\n          "],["append",["unknown",["decayWarningDaysRemaining"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["lol-leagues-decay-warning ",["helper",["if"],[["get",["isDecayUrgent"]],"decay-urgent"],null]]]],["flush-element"],["text","\\n      "],["append",["unknown",["decayWarningText"]],false],["text","\\n"],["block",["if"],[["get",["decayWarningDaysRemaining"]]],null,4],["text","      "],["open-element","lol-uikit-info-icon",[]],["static-attr","class","ranked-reference-modal-question-mark"],["flush-element"],["text","\\n      "],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["right"]],3],["text","    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1);
            n(31), e.exports = a.Ember.Component.extend({
                classNames: ["miniseries-results-component"],
                layout: n(32)
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "ivri3ZcO",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\miniseries-results\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\miniseries-results\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\miniseries-results\\\\index.js\\" "],["text","\\n"],["open-element","ul",[]],["static-attr","class","lol-leagues-miniseries-status-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["results"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","li",[]],["dynamic-attr","class",["concat",["lol-leagues-miniseries-status-item ",["get",["result"]]," ",["unknown",["showingAsSelf"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["result"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1);
            n(34), e.exports = a.Ember.Component.extend({
                classNames: ["ranked-banner-component"],
                classNameBindings: ["isProvisional:provisional", "isAnimationEnabled::low-spec"],
                leagueTierNames: a.LeagueTierNames,
                displayedPuuid: null,
                displayedQueueType: null,
                displayedTier: null,
                displayedDivision: null,
                displayedRegaliaLevel: 0,
                displayedPreviousTier: "",
                rankedService: (0, a.dataBinding)("/lol-ranked", (0, a.getProvider)().getSocket()),
                init: function() {
                    this._super(...arguments);
                    this.get("rankedService").observe("/v1/current-ranked-stats", this, this.fetchRankedData)
                },
                didReceiveAttrs: function() {
                    this._super(...arguments);
                    const e = this.get("puuid"),
                        t = this.get("queueType");
                    e ? this.get("displayedPuuid") === e && this.get("displayedQueueType") === t || (this.set("displayedPuuid", e), this.set("displayedQueueType", t), this.fetchRankedData()) : (this.set("displayedPuuid", e), this.set("displayedQueueType", t), this.set("displayedTier", this.get("tier")), this.set("displayedDivision", this.get("division")), this.set("displayedRegaliaLevel", 0), this.set("displayedPreviousTier", ""))
                },
                willDestroyElement: function() {
                    this._super(...arguments);
                    this.get("rankedService").unobserve(this)
                },
                fetchRankedData() {
                    const e = this.get("displayedPuuid"),
                        t = this.get("displayedQueueType");
                    e && t && (0, a.dataBinding)("lol-ranked").get(`/v1/ranked-stats/${e}`, {
                        skipCache: !0
                    }).then((n => {
                        this.setRankedData(e, t, n)
                    }))
                },
                setRankedData(e, t, n) {
                    e && t && n && this.get("displayedPuuid") === e && this.get("displayedQueueType") === t && (n && n.rankedRegaliaLevel ? this.set("displayedRegaliaLevel", n.rankedRegaliaLevel) : this.set("displayedRegaliaLevel", 0), n.queueMap && n.queueMap[t] && n.queueMap[t].previousSeasonAchievedTier && n.queueMap[t].previousSeasonAchievedTier !== a.LeaguesConsts.TIER_NAME_NONE ? this.set("displayedPreviousTier", n.queueMap[t].previousSeasonAchievedTier) : this.set("displayedPreviousTier", ""), n.queueMap && n.queueMap[t] && n.queueMap[t].tier && n.queueMap[t].tier !== a.LeaguesConsts.TIER_NAME_NONE ? this.set("displayedTier", n.queueMap[t].tier) : this.set("displayedTier", ""), n.queueMap && n.queueMap[t] && n.queueMap[t].division ? this.set("displayedDivision", n.queueMap[t].division) : this.set("displayedDivision", ""))
                },
                layout: n(35),
                unranked: a.Ember.computed("tier", "displayedTier", (function() {
                    const e = this.get("tier"),
                        t = this.get("displayedTier");
                    return !e || e === a.LeaguesConsts.TIER_NAME_UNRANKED || e === a.LeaguesConsts.TIER_NAME_NONE || !t || t === a.LeaguesConsts.TIER_NAME_UNRANKED || t === a.LeaguesConsts.TIER_NAME_NONE
                })),
                hasApexLadderRank: a.Ember.computed("tier", "ladderRank", (function() {
                    return a.LeaguesConsts.APEX_TIERS.includes(this.get("tier")) && this.get("ladderRank")
                })),
                isProvisional: a.Ember.computed("isProvisional", (function() {
                    return this.get("isProvisional")
                })),
                provisionalGamesProgressText: a.Ember.computed("provisionalGameThreshold", "provisionalGamesRemaining", (function() {
                    const e = this.get("tra");
                    if (e) {
                        const t = this.get("provisionalGamesRemaining"),
                            n = this.get("provisionalGameThreshold");
                        return e.formatString("PROVISIONAL_GAMES_PLAYED", {
                            gamesPlayed: n - t,
                            gamesRequired: n
                        })
                    }
                    return ""
                })),
                apexLadderRank: a.Ember.computed("tra", "hasApexLadderRank", "ladderRank", (function() {
                    return this.get("tra").formatString("LEAGUES_BANNER_APEX_LADDER_RANK", {
                        ladderRank: this.get("ladderRank")
                    })
                })),
                showLeaguePoints: a.Ember.computed("unranked", "leaguePoints", (function() {
                    return "number" == typeof this.get("leaguePoints") && !this.get("unranked")
                })),
                leaguePointsString: a.Ember.computed("leaguePoints", "tier", (function() {
                    const e = a.LeaguesConsts.APEX_TIERS.includes(this.get("tier")) ? this.get("leaguePoints") : Math.min(100, this.get("leaguePoints"));
                    return this.leagueTierNames.getLpLoc(e)
                })),
                tierDivisionLabel: a.Ember.computed("tier", "division", (function() {
                    const e = this.get("tier"),
                        t = this.get("division");
                    return this.leagueTierNames.getFullTierDivisionName(e, t)
                }))
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "augRUsB9",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-banner\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-banner\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-banner\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["isProvisional"]]],null,7],["text","\\n"],["open-element","lol-regalia-ranked-banner-v2-element",[]],["static-attr","animations","false"],["static-attr","banner-type","lastSeasonHighestRank"],["dynamic-attr","banner-rank",["concat",[["unknown",["displayedPreviousTier"]]]]],["static-attr","animation-config","{\\"topFadeEnd\\": 1, \\"topFadeStart\\": 0.15}"],["flush-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","ranked-banner-contents-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","banner-spacer"],["flush-element"],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","banner-ranked-emblem-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","banner-regalia-crest-sizer"],["flush-element"],["text","\\n        "],["open-element","lol-regalia-emblem-element",[]],["dynamic-attr","ranked-tier",["helper",["if"],[["get",["unranked"]],"unranked",["get",["displayedTier"]]],null],null],["flush-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["isProvisional"]]],null,4,3],["text","\\n    "],["open-element","div",[]],["static-attr","class","banner-tier-division-label"],["flush-element"],["text","\\n        "],["append",["unknown",["tierDivisionLabel"]],false],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["banner-league-points-display ",["helper",["unless"],[["get",["showLeaguePoints"]],"hidden"],null]]]],["flush-element"],["text","\\n        "],["append",["unknown",["leaguePointsString"]],false],["text","\\n    "],["close-element"],["text","\\n\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","banner-apex-ladder-rank"],["flush-element"],["text","\\n        "],["append",["unknown",["apexLadderRank"]],false],["text","\\n      "],["close-element"],["text","\\n    "]],"locals":[]},{"statements":[["block",["if"],[["get",["hasApexLadderRank"]]],null,0]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","banner-miniseries-progress"],["flush-element"],["text","\\n        "],["append",["helper",["miniseries-results"],null,[["results","showingAsSelf"],[["get",["miniseries"]],true]]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["miniseries"]]],null,2,1]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","banner-provisional-text-container"],["flush-element"],["text","\\n        "],["append",["unknown",["provisionalGamesProgressText"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","provisional-banner-static"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","uikit-video",[]],["static-attr","id","provisional-banner-loop"],["static-attr","src","/fe/lol-static-assets/videos/provisional-banner-loop.webm"],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isAnimationEnabled"]]],null,6,5]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1),
                s = n(23);
            n(37);
            const i = {
                RANKED_SOLO_5x5: 420,
                RANKED_FLEX_SR: 440,
                RANKED_FLEX_TT: 470
            };
            e.exports = a.Ember.Component.extend({
                classNames: ["ranked-intro-component"],
                layout: n(38),
                parties: a.Parties,
                queueType: a.Ember.computed("league.queueType", (function() {
                    return this.get("league.queueType")
                })),
                queueTypeQueueId: a.Ember.computed("queueType", (function() {
                    return i[this.get("queueType")] || 0
                })),
                hideQueueUpButton: a.Ember.computed("queueTypeQueueId", (function() {
                    return 0 === this.get("queueTypeQueueId")
                })),
                rankedIntroSections: a.Ember.computed("queueType", "league.isPositionRanks", "tra", "tra.RANKED_INTRO_RANKED_SOLO_5x5_SECTION_1_TITLE", "tra.RANKED_INTRO_RANKED_SOLO_5x5_SECTION_1_BODY", "tra.RANKED_INTRO_RANKED_FLEX_SR_SECTION_1_TITLE", "tra.RANKED_INTRO_RANKED_FLEX_SR_SECTION_1_BODY", "tra.RANKED_INTRO_RANKED_FLEX_TT_SECTION_1_TITLE", "tra.RANKED_INTRO_RANKED_FLEX_TT_SECTION_1_BODY", "tra.RANKED_INTRO_SECTION_2_TITLE", "tra.RANKED_INTRO_SECTION_2_BODY", "tra.RANKED_INTRO_SECTION_3_TITLE", "tra.RANKED_INTRO_SECTION_3_BODY", (function() {
                    const e = this.get("queueType");
                    return [{
                        titleString: this.get(`tra.RANKED_INTRO_${e}_SECTION_1_TITLE`),
                        bodyString: this.get(`tra.RANKED_INTRO_${e}_SECTION_1_BODY`),
                        imageSource: s.ASSET_PATH + "images/ranked-intro-squad-up.jpg"
                    }, {
                        titleString: this.get("tra.RANKED_INTRO_SECTION_2_TITLE"),
                        bodyString: this.get("tra.RANKED_INTRO_SECTION_2_BODY"),
                        imageSource: s.ASSET_PATH + "images/ranked-intro-earn-rank.png"
                    }, {
                        titleString: this.get("tra.RANKED_INTRO_SECTION_3_TITLE"),
                        bodyString: this.get("tra.RANKED_INTRO_SECTION_3_BODY"),
                        imageSource: s.ASSET_PATH + "images/ranked-intro-epic-loot.jpg"
                    }]
                })),
                queueUpButtonText: a.Ember.computed("tra", (function() {
                    return this.get("tra.RANKED_INTRO_QUEUE_UP")
                })),
                actions: {
                    createPartyLobby: function() {
                        this.parties.createLobby(this.get("queueTypeQueueId"))
                    }
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "73XsyPVS",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-intro\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-intro\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-intro\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","ranked-intro-page-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ranked-intro-section-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["rankedIntroSections"]]],null,0],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["ranked-intro-footer-container ",["helper",["if"],[["get",["hideQueueUpButton"]],"hidden"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","queue-up-hype left"],["flush-element"],["close-element"],["text","\\n    "],["open-element","lol-uikit-flat-button-group",[]],["static-attr","class","queue-up-button-container"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-flat-button",[]],["static-attr","type","next"],["static-attr","class","queue-up-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"createPartyLobby"],null],null],["flush-element"],["append",["unknown",["queueUpButtonText"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","queue-up-hype right"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","ranked-intro-section"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","ranked-intro-section-image-frame"],["flush-element"],["text","\\n          "],["open-element","img",[]],["static-attr","class","ranked-intro-section-image"],["dynamic-attr","src",["unknown",["section","imageSource"]],null],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","ranked-intro-section-title"],["flush-element"],["append",["unknown",["section","titleString"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","ranked-intro-section-body"],["flush-element"],["append",["unknown",["section","bodyString"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":["section"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1);
            n(40), e.exports = a.Ember.Component.extend({
                classNames: ["rank-standing-component"],
                layout: n(41),
                selectedState: null,
                league: a.Ember.computed.alias("selectedState.league"),
                activeTabIndex: a.Ember.computed("selectedState.division.position", (function() {
                    const e = this.get("selectedState.division.position");
                    return e || 0
                })),
                leagueStandings: a.Ember.computed.readOnly("selectedState.division.standings"),
                isViewingRatedLadder: a.Ember.computed.readOnly("selectedState.isViewingRatedLadder"),
                ratedLadderStandings: a.Ember.computed.readOnly("selectedState.league.standings"),
                displayedStandings: a.Ember.computed("leagueStandings", "isViewingRatedLadder", "ratedLadderStandings", (function() {
                    return this.get("isViewingRatedLadder") ? this.get("ratedLadderStandings") : this.get("leagueStandings")
                })),
                _divisionAtIndex: function(e) {
                    const t = this.get("league.divisions");
                    for (let n = 0; n < t.length; n++)
                        if (t[n].position === e) return t[n];
                    return t[0]
                },
                isLoading: !0,
                didInsertElement: function() {
                    this._super(...arguments), this.set("isLoading", !1)
                },
                _activateTab: function(e) {
                    const t = this.get("activeTabIndex");
                    if (t !== e) {
                        const n = this.$(".rank-standing-list-container").last();
                        this.set("animationClass", t > e ? "left-to-right-fade-out" : "right-to-left-fade-out"), n.on("animationend", (() => {
                            const a = this._divisionAtIndex(e);
                            this.sendAction("selectDivision", a), n.off("animationend"), this.set("animationClass", t > e ? "left-to-right-fade-in" : "right-to-left-fade-in")
                        }))
                    }
                },
                actions: {
                    activateTab: function(e) {
                        this._activateTab(e)
                    }
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "D5RdkY5n",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\index.js\\" "],["text","\\n"],["append",["helper",["rank-standing-header"],null,[["league","activateTab","selectedState","onSelectApexLeague"],[["get",["league"]],["helper",["action"],[["get",[null]],"activateTab"],null],["get",["selectedState"]],["get",["onSelectApexLeague"]]]]],false],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["rank-standing-list-container ",["helper",["if"],[["get",["showingRewards"]],"showing-rewards"],null]," ",["unknown",["animationClass"]]]]],["flush-element"],["text","\\n  "],["append",["helper",["rank-standing-list"],null,[["leagueContext","selectedState","standings","spectatableSummonerNames","spectatableSummonerIds","spectateBySummonerIdEnabled","selectStanding"],[["get",["selectedState","league"]],["get",["selectedState"]],["get",["displayedStandings"]],["get",["spectatableSummonerNames"]],["get",["spectatableSummonerIds"]],["get",["spectateBySummonerIdEnabled"]],["get",["selectStanding"]]]]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1),
                s = n(23);
            n(43), e.exports = a.Ember.Component.extend({
                tagName: "li",
                classNames: ["lol-leagues-division-item"],
                layout: n(44),
                containsPlayer: a.Ember.computed("leagueDivisionInfo.standings", (function() {
                    return !a.Lodash.isEmpty(a.Lodash.find(this.get("leagueDivisionInfo.standings"), {
                        relationship: s.StandingRelationship.SELF
                    }))
                })),
                activeIndex: null,
                selectedDivision: null,
                text: a.Ember.computed("tra", "leagueDivisionInfo.tier", "leagueDivisionInfo.division", (function() {
                    return a.LeaguesConsts.APEX_TIERS.includes(this.get("leagueDivisionInfo.tier")) ? a.LeagueTierNames.getTierName(this.get("leagueDivisionInfo.tier")) : a.LeagueTierNames.getDivisionName(this.get("leagueDivisionInfo.division"))
                })),
                isActive: a.Ember.computed("activeIndex", "btnIndex", (function() {
                    return this.get("activeIndex") === this.get("btnIndex")
                })),
                activeStyle: a.Ember.computed("isActive", (function() {
                    return this.get("isActive") ? "active" : null
                })),
                playerDivisionStyle: a.Ember.computed("containsPlayer", (function() {
                    return this.get("containsPlayer") ? "player-division" : null
                })),
                selectedStateDidChange: a.Ember.on("init", a.Ember.observer("selectedDivision", (function() {
                    this.get("leagueDivisionInfo") && this.set("activeIndex", this.get("selectedDivision.position"))
                }))),
                click: function() {
                    this.get("isViewingTopPlayers") ? (this.sendAction("playClickAudio"), this.get("onSelectApexLeague")(this.get("queueType"), this.get("leagueDivisionInfo.tier"))) : this.sendAction("onBtnClick", this.get("btnIndex"))
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "teUyO/3l",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-header\\\\rank-standing-header-button\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-header\\\\rank-standing-header-button\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-header\\\\rank-standing-header-button\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["lol-leagues-division-btn division-",["unknown",["leagueDivisionInfo","division"]]," ",["unknown",["activeStyle"]]," ",["unknown",["playerDivisionStyle"]]]]],["flush-element"],["append",["unknown",["text"]],false],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1),
                s = n(23);
            n(46);
            let i = null;
            if (a.AudioPlugin) {
                const e = a.AudioPlugin.getChannel("sfx-ui");
                i = e.createSound(`${s.ASSET_PATH}sounds/sfx-uikit-button-text-click.ogg`)
            }
            e.exports = a.Ember.Component.extend({
                classNames: ["rank-standing-header-component", "lol-leagues-division-wrapper"],
                layout: n(47),
                activeIndex: null,
                hasDivision: a.Ember.computed("league.tier", (function() {
                    return !a.LeaguesConsts.APEX_TIERS.includes(this.get("league.tier"))
                })),
                divisionExistenceObserver: a.Ember.observer("hasDivision", (function() {
                    this.get("hasDivision") || this._activateButton(0)
                })),
                topRatedTier: a.Ember.computed("league.queueType", (function() {
                    const e = this.get("league.queueType");
                    return this.get(`tra.${e}_tier_label_ORANGE`)
                })),
                localizedTier: a.Ember.computed("selectedState.league.tier", (function() {
                    return a.LeagueTierNames.getTierName(this.get("selectedState.league.tier"))
                })),
                _activateButton: function(e) {
                    this.set("activeIndex", e), this.attrs.activateTab(e)
                },
                actions: {
                    activateButton: function(e) {
                        i && i.play(), this._activateButton(e)
                    },
                    playClickAudio: function() {
                        i && i.play()
                    }
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "Ip5vtGm8",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-header\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-header\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-header\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["lol-leagues-division-tier ",["helper",["if"],[["get",["selectedState","isViewingApexTier"]],"removed"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["selectedState","isViewingRatedLadder"]]],null,2,1],["close-element"],["text","\\n"],["open-element","ul",[]],["dynamic-attr","class",["concat",["lol-leagues-division-list ",["helper",["if"],[["get",["selectedState","isViewingRatedLadder"]],"removed"],null]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["league","divisions"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["rank-standing-header-button"],null,[["leagueDivisionInfo","btnIndex","activeIndex","onBtnClick","selectedDivision","contentSize","isViewingTopPlayers","queueType","onSelectApexLeague","playClickAudio"],[["get",["l"]],["get",["l","position"]],["get",["activeIndex"]],"activateButton",["get",["selectedState","division"]],["get",["league","divisions","length"]],["get",["selectedState","isViewingTopPlayers"]],["get",["league","queueType"]],["get",["onSelectApexLeague"]],"playClickAudio"]]],false],["text","\\n"]],"locals":["l","index"]},{"statements":[["text","    "],["append",["unknown",["localizedTier"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["topRatedTier"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1);
            n(49);
            var s = n(50),
                i = n(24),
                o = n(5);
            e.exports = a.Ember.Component.extend({
                classNames: ["rank-standing-list-component", "lol-leagues-list-wrapper"],
                layout: n(51),
                hasFirstHeader: a.Ember.computed.bool("headerData"),
                hasSecondHeader: a.Ember.computed.bool("secondaryHeaderData"),
                scrollTop: 0,
                ROW_WIDTH: 606,
                ROW_HEIGHT: 32,
                OFFSET_TO_CENTER_PLAYER: 160,
                isRatedQueue: a.Ember.computed("selectedState.league.queueType", (function() {
                    return o.QUEUES.ALL_RATED_QUEUE_TYPES.includes(this.get("selectedState.league.queueType"))
                })),
                didReceiveAttrs: function() {
                    this._super(...arguments), this.scrollToPlayerStanding()
                },
                divisionIsEmpty: a.Ember.computed("standings", (function() {
                    return 0 === this.get("standings.length")
                })),
                isApexTierNotMaxSize: a.Ember.computed("selectedState.isViewingApexTier", "standings.[]", "selectedState.division.maxLeagueSize", (function() {
                    const e = this.get("selectedState.isViewingApexTier"),
                        t = this.get("selectedState.division.topNumberOfPlayers") > 0,
                        n = this.get("standings.length") < this.get("selectedState.division.maxLeagueSize");
                    return e && t && n
                })),
                isEmptyDivisionOrNotFullApexTier: a.Ember.computed.or("divisionIsEmpty", "isApexTierNotMaxSize"),
                hasApexUnlockTimeInTheFuture: a.Ember.computed("selectedState.division.apexUnlockTimeMillis", (function() {
                    return this.get("selectedState.division.apexUnlockTimeMillis") > Date.now()
                })),
                divisionOrTierEmptyText: a.Ember.computed("divisionIsEmpty", "selectedState.isViewingApexTier", "selectedState.division.tier", "selectedState.division.apexUnlockTimeMillis", "selectedState.division.minLpForApexTier", "selectedState.division.topNumberOfPlayers", (function() {
                    if (!this.get("selectedState.isViewingApexTier")) return this.get("tra.LEAGUES_DIVISION_EMPTY_MSG");
                    const e = this.get("selectedState.division.apexUnlockTimeMillis"),
                        t = this.get("selectedState.division.minLpForApexTier"),
                        n = this.get("selectedState.division.topNumberOfPlayers"),
                        i = Date.now(),
                        o = this.get("tra"),
                        l = this.get("selectedState.division.tier"),
                        r = a.LeagueTierNames.getTierName(l);
                    if (e > i) {
                        const t = (0, s.timeInMillisToDays)(e - i);
                        return o.formatString("LEAGUES_APEX_TIER_LOCKED_UNTIL", {
                            tier: r,
                            daysUntilUnlock: t
                        })
                    }
                    return t && n ? o.formatString("LEAGUES_APEX_TIER_UNLOCKED_EMPTY_MIN_LP", {
                        minLpForTier: t,
                        topNumberOfPlayers: n
                    }) : n ? o.formatString("LEAGUES_APEX_TIER_UNLOCKED_EMPTY_TOP_NUMBER_OF_PLAYERS", {
                        topNumberOfPlayers: n
                    }) : o.formatString("LEAGUES_APEX_TIER_UNLOCKED_EMPTY", {
                        tier: r
                    })
                })),
                rows: a.Ember.computed("standings", "downOneTierStandings", "upOneTierStandings", "leagueContext.tier", "selectedState.division.division", "selectedState.isViewingApexTier", (function() {
                    const e = this.get("selectedState.isViewingApexTier");
                    let t = this.get("standings").slice();
                    if (e) t = this.addPromotionDemotionCutoffs(t), t.splice(0, 0, a.Ember.Object.create({
                        isHeader: !0
                    }));
                    else {
                        const e = a.Lodash.findIndex(t, (e => !a.Lodash.get(e, "miniseriesResults.length") > 0));
                        e < 0 ? t.splice(0, 0, a.Ember.Object.create({
                            isHeader: !0
                        })) : 0 === e ? t.splice(0, 0, a.Ember.Object.create({
                            isSecondHeader: !0
                        })) : (t.splice(0, 0, a.Ember.Object.create({
                            isHeader: !0
                        })), t.splice(e + 1, 0, a.Ember.Object.create({
                            isSecondHeader: !0
                        })))
                    }
                    return t
                })),
                addPromotionDemotionCutoffs(e) {
                    const {
                        hasPromotionCutoff: t,
                        promotionCutoffIndex: n
                    } = this.findPromotionCutoffIndex(e);
                    if (t) {
                        const t = this.get("tra.LEAGUES_PROFILE_TABLE_HEADER_PROMOTION_CUTOFF");
                        e.splice(n + 1, 0, a.Ember.Object.create({
                            isApexTierCutoff: !0,
                            apexCutoffText: t
                        }))
                    }
                    const {
                        hasDemotionCutoff: s,
                        demotionCutoffIndex: i
                    } = this.findDemotionCutoffIndex(e);
                    if (s) {
                        const t = this.get("tra.LEAGUES_PROFILE_TABLE_HEADER_DEMOTION_CUTOFF");
                        e.splice(i, 0, a.Ember.Object.create({
                            isApexTierCutoff: !0,
                            apexCutoffText: t
                        }))
                    }
                    return e
                },
                findPromotionCutoffIndex(e) {
                    let t = !1,
                        n = 0;
                    for (let a = 0; a < e.length && e[a].pendingPromotion; a++) t = !0, n = a;
                    return {
                        hasPromotionCutoff: t,
                        promotionCutoffIndex: n
                    }
                },
                findDemotionCutoffIndex(e) {
                    let t = !1,
                        n = e.length;
                    for (let a = e.length - 1; a >= 0 && e[a].pendingDemotion; a--) t = !0, n = a;
                    return {
                        hasDemotionCutoff: t,
                        demotionCutoffIndex: n
                    }
                },
                displayedRows: a.Ember.computed("rows", (function() {
                    return this.get("rows").slice(1)
                })),
                hasRowsToDisplay: a.Ember.computed("displayedRows", (function() {
                    return this.get("displayedRows")?.length > 0
                })),
                headerData: a.Ember.computed("rows", (function() {
                    return a.Lodash.find(this.get("rows"), {
                        isHeader: !0
                    })
                })),
                secondaryHeaderData: a.Ember.computed("rows", (function() {
                    return a.Lodash.find(this.get("rows"), {
                        isSecondHeader: !0
                    })
                })),
                playerHeaderText: a.Ember.computed("isTft", (function() {
                    return this.get("isTft") ? this.get("tra.LEAGUES_PROFILE_TABLE_HEADER_TACTICIANS") : this.get("tra.LEAGUES_PROFILE_TABLE_HEADER_SUMMONERS")
                })),
                isTft: a.Ember.computed("leagueContext.queueType", (function() {
                    return (0, i.isTftQueueType)(this.get("leagueContext.queueType"))
                })),
                scrollToPlayerStanding: function() {
                    this.set("scrollTop", 0);
                    const e = this.get("selectedState.standing");
                    if (!e) return;
                    const t = this.get("standings");
                    if (!t?.length) return;
                    if (this.get("leagueContext.tier") !== e.tier) return;
                    const n = e.position - t[0].position,
                        a = this.ROW_HEIGHT * n - this.OFFSET_TO_CENTER_PLAYER;
                    this.set("scrollTop", a)
                },
                actions: {
                    onRowClick: function(e) {
                        this.get("selectStanding")(e)
                    }
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.convertDateMillisToString = function(e, t, n = {
                month: "long",
                day: "numeric",
                year: "numeric"
            }) {
                const a = (t && t.locale || "en_US").replace("_", "-");
                return new Date(e).toLocaleString(a, n)
            }, t.getDaysBetweenDateMillis = function(e, t) {
                return (t - e) / n
            }, t.timeInMillisToDays = function(e) {
                if (!e) return 0;
                return Math.ceil(e / n)
            };
            const n = 864e5
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "VwzKoDhp",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-list\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-list\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-list\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-leagues-headers-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasFirstHeader"]]],null,22],["text","\\n"],["block",["if"],[["get",["hasSecondHeader"]]],null,15],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["lol-leagues-list-container ",["helper",["if"],[["get",["isEmptyDivisionOrNotFullApexTier"]],"show-division-or-tier-message"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasRowsToDisplay"]]],null,6],["block",["if"],[["get",["isEmptyDivisionOrNotFullApexTier"]]],null,4],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","LEAGUES_APEX_TIER_UNLOCKED_NOT_FULL"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","shocked-poro-icon"],["flush-element"],["close-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","LEAGUES_APEX_TIER_UNLOCKED_EMPTY_CHECK_BACK_LATER"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-empty-content"],["flush-element"],["text","\\n"],["block",["if"],[["get",["divisionIsEmpty"]]],null,1,0],["text","          "],["open-element","p",[]],["flush-element"],["append",["helper",["if"],[["get",["selectedState","division","topNumberOfPlayers"]],["get",["divisionOrTierEmptyText"]]],null],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-empty-content locked"],["flush-element"],["text","\\n          "],["append",["unknown",["divisionOrTierEmptyText"]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","p",[]],["static-attr","class","lol-leagues-list-apex-locked-check-back"],["flush-element"],["append",["unknown",["tra","LEAGUE_APEX_TIER_LOCKED_CHECK_BACK"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-empty"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasApexUnlockTimeInTheFuture"]]],null,3,2],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["rank-standing-row"],null,[["data","leagueContext","leagueDivisionInfo","rowIndex","onRowClick","summonerId","spectatableSummonerNames","spectatableSummonerIds","spectateBySummonerIdEnabled","selectedStanding"],[["get",["row"]],["get",["leagueContext"]],["get",["selectedState","division"]],["get",["index"]],["helper",["action"],[["get",[null]],"onRowClick"],null],["get",["selectedState","summonerId"]],["get",["spectatableSummonerNames"]],["get",["spectatableSummonerIds"]],["get",["spectateBySummonerIdEnabled"]],["get",["selectedState","standing"]]]]],false],["text","\\n"]],"locals":["row","index"]},{"statements":[["block",["ember-collection"],null,[["class","items","cell-layout","scroll-top"],["lol-leagues-list",["get",["displayedRows"]],["helper",["fixed-grid-layout"],[["get",["ROW_WIDTH"]],["get",["ROW_HEIGHT"]]],null],["get",["scrollTop"]]]],5]],"locals":[]},{"statements":[["text","          "],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_POINTS"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_RATING"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_WINS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_TFT_WINS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-1 lol-leagues-list-col"],["flush-element"],["text","#"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-2 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-3 lol-leagues-list-col"],["flush-element"],["append",["unknown",["playerHeaderText"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-4 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-5 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isTft"]]],null,10,9],["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-7 lol-leagues-list-col"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isRatedQueue"]]],null,8,7],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_WIN_LOSE"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_TFT_WINS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-1 lol-leagues-list-col"],["flush-element"],["text","#"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-2 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-3 lol-leagues-list-col"],["flush-element"],["append",["unknown",["secondaryHeaderData","headerText"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-4 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-5 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isTft"]]],null,13,12],["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-7 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_POINTS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-header second-header"],["flush-element"],["text","\\n"],["block",["if"],[["get",["secondaryHeaderData","isApexTier"]]],null,14,11],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_WINS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_TFT_WINS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-1 lol-leagues-list-col"],["flush-element"],["text","#"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-2 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-3 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_UP_FOR_PROMO"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-4 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-5 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isTft"]]],null,17,16],["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-7 lol-leagues-list-col"],["flush-element"],["append",["unknown",["miniseriesLengthDisplay"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_WIN_LOSE"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_TFT_WINS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-1 lol-leagues-list-col"],["flush-element"],["text","#"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-2 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-3 lol-leagues-list-col"],["flush-element"],["append",["unknown",["playerHeaderText"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-4 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-5 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isTft"]]],null,20,19],["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-7 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_POINTS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-header"],["flush-element"],["text","\\n"],["block",["if"],[["get",["selectedState","isViewingApexTier"]]],null,21,18],["text","    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1),
                s = n(23),
                i = n(24);
            n(53);
            const o = n(54);
            let l = null;
            if (a.AudioPlugin) {
                const e = a.AudioPlugin.getChannel("sfx-ui");
                l = e.createSound(`${s.ASSET_PATH}sounds/sfx-uikit-click-generic.ogg`)
            }
            e.exports = a.Ember.Component.extend({
                tagName: "li",
                classNames: ["rank-standing-row-component", "lol-leagues-list-item"],
                classNameBindings: ["headerStyle", "secondaryHeaderStyle", "selfStyle", "currentStyle", "data.isApexTierCutoff:apex-cutoff"],
                tooltipManager: a.TooltipManager,
                contextMenuManager: a.ContextMenuManager,
                layout: n(74),
                modalManager: a.ModalManager,
                spectatorService: a.Ember.inject.service("spectator"),
                data: null,
                rowIndex: null,
                leagueContext: null,
                leagueDivisionInfo: null,
                summonerId: null,
                selectedStanding: null,
                didInsertElement: function() {
                    this._super(...arguments), this._setupContextMenu()
                },
                isHeader: a.Ember.computed("data.isHeader", (function() {
                    return Boolean(this.get("data.isHeader"))
                })),
                headerStyle: a.Ember.computed("isHeader", (function() {
                    return this.get("isHeader") ? "lol-leagues-list-header" : null
                })),
                isSecondaryHeader: a.Ember.computed("data.isSecondHeader", (function() {
                    return Boolean(this.get("data.isSecondHeader"))
                })),
                secondaryHeaderStyle: a.Ember.computed("isSecondaryHeader", (function() {
                    return this.get("isSecondaryHeader") ? "lol-leagues-list-header second-header" : null
                })),
                shouldShowMiniseries: a.Ember.computed("isTopSummoner", (function() {
                    return this.get("isTopSummoner")
                })),
                currentStyle: a.Ember.computed("selectedStanding.summonerId", "data.summonerId", (function() {
                    if (this.get("selectedStanding.summonerId") === this.get("data.summonerId")) return "current"
                })),
                isTopSummoner: a.Ember.computed("data.miniseriesResults", "data.summonerName", "isViewingApexTier", (function() {
                    return this.get("data.miniseriesResults.length") > 0 && Boolean(this.get("data.summonerName")) && !this.get("isViewingApexTier")
                })),
                isViewingApexTier: a.Ember.computed("leagueDivisionInfo.tier", (function() {
                    return a.LeaguesConsts.APEX_TIERS.includes(this.get("leagueDivisionInfo.tier"))
                })),
                isTopTierStandingRow: a.Ember.computed("isViewingApexTier", "isHeader", "isSecondaryHeader", "data.isApexTierCutoff", (function() {
                    return this.get("isViewingApexTier") && !this.get("isHeader") && !this.get("isSecondaryHeader") && !this.get("data.isApexTierCutoff")
                })),
                isNonTopTierStandingRow: a.Ember.computed("data.puuid", "isTopSummoner", "isViewingApexTier", (function() {
                    return Boolean(this.get("data.puuid")) && !this.get("isTopSummoner") && !this.get("isViewingApexTier")
                })),
                showContextMenu: a.Ember.computed("data.summonerId", (function() {
                    return this.get("data.summonerId")
                })),
                hasPositionDelta: a.Ember.computed("data.positionDelta", (function() {
                    return this.get("data.positionDelta") && 0 !== this.get("data.positionDelta")
                })),
                divisionChangeStyle: a.Ember.computed("data.pendingDemotion", "data.pendingPromotion", (function() {
                    return this.get("data.pendingDemotion") ? "lol-leagues-icon-demotion" : this.get("data.pendingPromotion") ? "lol-leagues-icon-promotion" : ""
                })),
                positionDeltaStyle: a.Ember.computed("data.positionDelta", (function() {
                    return this.get("data.positionDelta") > 0 ? "lol-leagues-list-up" : this.get("data.positionDelta") < 0 ? "lol-leagues-list-down" : void 0
                })),
                positionDeltaAbs: a.Ember.computed("data.positionDelta", (function() {
                    return Math.abs(this.get("data.positionDelta"))
                })),
                isAvailableForSpectate: a.Ember.computed("data.summonerName", "spectatableSummonerNames", "spectatableSummonerIds", "spectateBySummonerIdEnabled", "spectatorService.spectateEnabled", (function() {
                    if (!this.get("spectatorService.spectateEnabled")) return !1;
                    if (this.get("spectateBySummonerIdEnabled")) {
                        const e = this.get("spectatableSummonerIds");
                        return e && e.includes && e.includes(this.get("data.summonerId"))
                    } {
                        const e = this.get("spectatableSummonerNames");
                        return e && e.includes && e.includes(this.get("data.summonerName"))
                    }
                })),
                isFriend: a.Ember.computed("data.relationship", (function() {
                    return this.get("data.relationship") === s.StandingRelationship.FRIEND
                })),
                isSelf: a.Ember.computed("data.relationship", (function() {
                    return this.get("data.relationship") === s.StandingRelationship.SELF
                })),
                isSelectedSummoner: a.Ember.computed("data.summonerId", "summonerId", (function() {
                    const e = this.get("summonerId");
                    return this.get("data.summonerId") === e
                })),
                selfStyle: a.Ember.computed("data.relationship", (function() {
                    if (this.get("data.relationship") === s.StandingRelationship.SELF) return "me"
                })),
                miniseriesStyles: a.Ember.computed("data.miniseriesResults", (function() {
                    return a.Lodash.map(this.get("data.miniseriesResults"), (e => `lol-leagues-list-best-${e}`))
                })),
                isTft: a.Ember.computed("leagueContext.queueType", (function() {
                    return (0, i.isTftQueueType)(this.get("leagueContext.queueType"))
                })),
                _showErrorDialog: function() {
                    this.get("modalManager").add({
                        type: "DialogAlert",
                        data: {
                            contents: o({
                                title: this.get("tra.LEAGUES_SPECTATE_IS_NOT_AVAILABLE_TITLE"),
                                message: this.get("tra.LEAGUES_SPECTATE_IS_NOT_AVAILABLE")
                            }),
                            okText: this.get("tra.lib_ui_dialog_alert_ok")
                        }
                    }).okPromise.then((() => {}))
                },
                click: function() {
                    this.get("isSecondaryHeader") || this.get("isHeader") || (l && l.play(), this.sendAction("onRowClick", this.get("data")))
                },
                _setupContextMenu: function() {
                    this.get("showContextMenu") && this.$().on("contextmenu", (e => {
                        const t = this.get("contextMenuManager");
                        t.setMenuItems([{
                            label: this.get("tra.LEAGUES_CONTEXT_MENU_ADD_FRIEND"),
                            disabled: this.get("isFriend") || this.get("isSelf"),
                            target: this,
                            action: function() {
                                (0, a.dataBinding)("/lol-chat").post("/v2/friend-requests", {
                                    puuid: this.get("data.puuid")
                                })
                            }
                        }, {
                            label: this.get("tra.LEAGUES_CONTEXT_MENU_VIEW_PROFILE"),
                            target: this,
                            disabled: this.get("isSelf") || this.get("isSelectedSummoner"),
                            action: function() {
                                a.ProfilesAPI.showOverlay({
                                    summonerId: this.get("data.summonerId")
                                })
                            }
                        }, {
                            label: this.get("tra.LEAGUES_CONTEXT_MENU_SPECTATE_GAME"),
                            target: this,
                            disabled: !this.get("isAvailableForSpectate"),
                            action: async function() {
                                const e = this.get("data.summonerId"),
                                    t = this.get("data.summonerName");
                                await a.ProfilesAPI.hasPrivateProfile(e) ? a.ProfilesAPI.showAlertSummonerIsPrivate(t) : this.get("spectatorService").spectateGame(this.get("data.summonerName"), this.get("data.puuid"), this.leagueContext.queueType).then((e => {
                                    e && "OK" !== e.status && this._showErrorDialog()
                                })).catch((() => this._showErrorDialog()))
                            }
                        }]), t.openAtEvent(e)
                    }))
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            var a = n(55);
            e.exports = (a.default || a).template({
                compiler: [7, ">= 4.0.0"],
                main: function(e, t, n, a, s) {
                    var i, o = null != t ? t : e.nullContext || {},
                        l = n.helperMissing,
                        r = "function",
                        c = e.escapeExpression;
                    return "<div>\r\n  <h4>" + c(typeof(i = null != (i = n.title || (null != t ? t.title : t)) ? i : l) === r ? i.call(o, {
                        name: "title",
                        hash: {},
                        data: s
                    }) : i) + '</h4>\r\n  <hr class="heading-spacer" />\r\n  <p>' + c(typeof(i = null != (i = n.message || (null != t ? t.message : t)) ? i : l) === r ? i.call(o, {
                        name: "message",
                        hash: {},
                        data: s
                    }) : i) + "</p>\r\n</div>\r\n\r\n"
                },
                useData: !0
            })
        }, (e, t, n) => {
            e.exports = n(56).default
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
            var i = s(n(57)),
                o = a(n(71)),
                l = a(n(59)),
                r = s(n(58)),
                c = s(n(72)),
                u = a(n(73));

            function d() {
                var e = new i.HandlebarsEnvironment;
                return r.extend(e, i), e.SafeString = o.default, e.Exception = l.default, e.Utils = r, e.escapeExpression = r.escapeExpression, e.VM = c, e.template = function(t) {
                    return c.template(t, e)
                }, e
            }
            var p = d();
            p.create = d, u.default(p), p.default = p, t.default = p, e.exports = t.default
        }, (e, t, n) => {
            "use strict";

            function a(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            t.__esModule = !0, t.HandlebarsEnvironment = u;
            var s = n(58),
                i = a(n(59)),
                o = n(60),
                l = n(68),
                r = a(n(70));
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

            function u(e, t, n) {
                this.helpers = e || {}, this.partials = t || {}, this.decorators = n || {}, o.registerDefaultHelpers(this), l.registerDefaultDecorators(this)
            }
            u.prototype = {
                constructor: u,
                logger: r.default,
                log: r.default.log,
                registerHelper: function(e, t) {
                    if (s.toString.call(e) === c) {
                        if (t) throw new i.default("Arg not supported with multiple helpers");
                        s.extend(this.helpers, e)
                    } else this.helpers[e] = t
                },
                unregisterHelper: function(e) {
                    delete this.helpers[e]
                },
                registerPartial: function(e, t) {
                    if (s.toString.call(e) === c) s.extend(this.partials, e);
                    else {
                        if (void 0 === t) throw new i.default('Attempting to register a partial called "' + e + '" as undefined');
                        this.partials[e] = t
                    }
                },
                unregisterPartial: function(e) {
                    delete this.partials[e]
                },
                registerDecorator: function(e, t) {
                    if (s.toString.call(e) === c) {
                        if (t) throw new i.default("Arg not supported with multiple decorators");
                        s.extend(this.decorators, e)
                    } else this.decorators[e] = t
                },
                unregisterDecorator: function(e) {
                    delete this.decorators[e]
                }
            };
            var d = r.default.log;
            t.log = d, t.createFrame = s.createFrame, t.logger = r.default
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
                return e.replace(a, i)
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

            function i(e) {
                return n[e]
            }

            function o(e) {
                for (var t = 1; t < arguments.length; t++)
                    for (var n in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], n) && (e[n] = arguments[t][n]);
                return e
            }
            var l = Object.prototype.toString;
            t.toString = l;
            var r = function(e) {
                return "function" == typeof e
            };
            r(/x/) && (t.isFunction = r = function(e) {
                return "function" == typeof e && "[object Function]" === l.call(e)
            }), t.isFunction = r;
            var c = Array.isArray || function(e) {
                return !(!e || "object" != typeof e) && "[object Array]" === l.call(e)
            };
            t.isArray = c
        }, (e, t) => {
            "use strict";
            t.__esModule = !0;
            var n = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];

            function a(e, t) {
                var s = t && t.loc,
                    i = void 0,
                    o = void 0;
                s && (e += " - " + (i = s.start.line) + ":" + (o = s.start.column));
                for (var l = Error.prototype.constructor.call(this, e), r = 0; r < n.length; r++) this[n[r]] = l[n[r]];
                Error.captureStackTrace && Error.captureStackTrace(this, a);
                try {
                    s && (this.lineNumber = i, Object.defineProperty ? Object.defineProperty(this, "column", {
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
                s.default(e), i.default(e), o.default(e), l.default(e), r.default(e), c.default(e), u.default(e)
            };
            var s = a(n(61)),
                i = a(n(62)),
                o = a(n(63)),
                l = a(n(64)),
                r = a(n(65)),
                c = a(n(66)),
                u = a(n(67))
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var a = n(58);
            t.default = function(e) {
                e.registerHelper("blockHelperMissing", (function(t, n) {
                    var s = n.inverse,
                        i = n.fn;
                    if (!0 === t) return i(this);
                    if (!1 === t || null == t) return s(this);
                    if (a.isArray(t)) return t.length > 0 ? (n.ids && (n.ids = [n.name]), e.helpers.each(t, n)) : s(this);
                    if (n.data && n.ids) {
                        var o = a.createFrame(n.data);
                        o.contextPath = a.appendContextPath(n.data.contextPath, n.name), n = {
                            data: o
                        }
                    }
                    return i(t, n)
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var a, s = n(58),
                i = n(59),
                o = (a = i) && a.__esModule ? a : {
                    default: a
                };
            t.default = function(e) {
                e.registerHelper("each", (function(e, t) {
                    if (!t) throw new o.default("Must pass iterator to #each");
                    var n = t.fn,
                        a = t.inverse,
                        i = 0,
                        l = "",
                        r = void 0,
                        c = void 0;

                    function u(t, a, i) {
                        r && (r.key = t, r.index = a, r.first = 0 === a, r.last = !!i, c && (r.contextPath = c + t)), l += n(e[t], {
                            data: r,
                            blockParams: s.blockParams([e[t], t], [c + t, null])
                        })
                    }
                    if (t.data && t.ids && (c = s.appendContextPath(t.data.contextPath, t.ids[0]) + "."), s.isFunction(e) && (e = e.call(this)), t.data && (r = s.createFrame(t.data)), e && "object" == typeof e)
                        if (s.isArray(e))
                            for (var d = e.length; i < d; i++) i in e && u(i, i, i === e.length - 1);
                        else {
                            var p = void 0;
                            for (var m in e) e.hasOwnProperty(m) && (void 0 !== p && u(p, i - 1), p = m, i++);
                            void 0 !== p && u(p, i - 1, !0)
                        } return 0 === i && (l = a(this)), l
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var a, s = n(59),
                i = (a = s) && a.__esModule ? a : {
                    default: a
                };
            t.default = function(e) {
                e.registerHelper("helperMissing", (function() {
                    if (1 !== arguments.length) throw new i.default('Missing helper: "' + arguments[arguments.length - 1].name + '"')
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var a = n(58);
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
            var a = n(58);
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
                i.default(e)
            };
            var a, s = n(69),
                i = (a = s) && a.__esModule ? a : {
                    default: a
                }
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var a = n(58);
            t.default = function(e) {
                e.registerDecorator("inline", (function(e, t, n, s) {
                    var i = e;
                    return t.partials || (t.partials = {}, i = function(s, i) {
                        var o = n.partials;
                        n.partials = a.extend({}, o, t.partials);
                        var l = e(s, i);
                        return n.partials = o, l
                    }), t.partials[s.args[0]] = s.fn, i
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var a = n(58),
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
                            for (var n = arguments.length, a = Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) a[i - 1] = arguments[i];
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
                    n = l.COMPILER_REVISION;
                if (t !== n) {
                    if (t < n) {
                        var a = l.REVISION_CHANGES[n],
                            s = l.REVISION_CHANGES[t];
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
                    invokePartial: function(n, a, i) {
                        i.hash && (a = s.extend({}, a, i.hash), i.ids && (i.ids[0] = !0)), n = t.VM.resolvePartial.call(this, n, a, i);
                        var l = t.VM.invokePartial.call(this, n, a, i);
                        if (null == l && t.compile && (i.partials[i.name] = t.compile(n, e.compilerOptions, t), l = i.partials[i.name](a, i)), null != l) {
                            if (i.indent) {
                                for (var r = l.split("\n"), c = 0, u = r.length; c < u && (r[c] || c + 1 !== u); c++) r[c] = i.indent + r[c];
                                l = r.join("\n")
                            }
                            return l
                        }
                        throw new o.default("The partial " + i.name + " could not be compiled when running in runtime-only mode")
                    },
                    fn: function(t) {
                        var n = e[t];
                        return n.decorator = e[t + "_d"], n
                    },
                    programs: [],
                    program: function(e, t, n, a, s) {
                        var i = this.programs[e],
                            o = this.fn(e);
                        return t || s || a || n ? i = r(this, e, o, t, n, a, s) : i || (i = this.programs[e] = r(this, e, o)), i
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
                        i = s.data;
                    a._setup(s), !s.partial && e.useData && (i = function(e, t) {
                        t && "root" in t || ((t = t ? l.createFrame(t) : {}).root = e);
                        return t
                    }(t, i));
                    var o = void 0,
                        r = e.useBlockParams ? [] : void 0;

                    function c(t) {
                        return "" + e.main(n, t, n.helpers, n.partials, i, r, o)
                    }
                    return e.useDepths && (o = s.depths ? t != s.depths[0] ? [t].concat(s.depths) : s.depths : [t]), (c = u(e.main, c, n, s.depths || [], i, r))(t, s)
                }
                return a.isTop = !0, a._setup = function(a) {
                    a.partial ? (n.helpers = a.helpers, n.partials = a.partials, n.decorators = a.decorators) : (n.helpers = n.merge(a.helpers, t.helpers), e.usePartial && (n.partials = n.merge(a.partials, t.partials)), (e.usePartial || e.useDecorators) && (n.decorators = n.merge(a.decorators, t.decorators)))
                }, a._child = function(t, a, s, i) {
                    if (e.useBlockParams && !s) throw new o.default("must pass block params");
                    if (e.useDepths && !i) throw new o.default("must pass parent depths");
                    return r(n, t, e[t], a, 0, s, i)
                }, a
            }, t.wrapProgram = r, t.resolvePartial = function(e, t, n) {
                e ? e.call || n.name || (n.name = e, e = n.partials[e]) : e = "@partial-block" === n.name ? n.data["partial-block"] : n.partials[n.name];
                return e
            }, t.invokePartial = function(e, t, n) {
                var a = n.data && n.data["partial-block"];
                n.partial = !0, n.ids && (n.data.contextPath = n.ids[0] || n.data.contextPath);
                var i = void 0;
                n.fn && n.fn !== c && function() {
                    n.data = l.createFrame(n.data);
                    var e = n.fn;
                    i = n.data["partial-block"] = function(t) {
                        var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                        return n.data = l.createFrame(n.data), n.data["partial-block"] = a, e(t, n)
                    }, e.partials && (n.partials = s.extend({}, n.partials, e.partials))
                }();
                void 0 === e && i && (e = i);
                if (void 0 === e) throw new o.default("The partial " + n.name + " could not be found");
                if (e instanceof Function) return e(t, n)
            }, t.noop = c;
            var a, s = function(e) {
                    if (e && e.__esModule) return e;
                    var t = {};
                    if (null != e)
                        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                    return t.default = e, t
                }(n(58)),
                i = n(59),
                o = (a = i) && a.__esModule ? a : {
                    default: a
                },
                l = n(57);

            function r(e, t, n, a, s, i, o) {
                function l(t) {
                    var s = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                        l = o;
                    return !o || t == o[0] || t === e.nullContext && null === o[0] || (l = [t].concat(o)), n(e, t, e.helpers, e.partials, s.data || a, i && [s.blockParams].concat(i), l)
                }
                return (l = u(n, l, e, o, a, i)).program = t, l.depth = o ? o.length : 0, l.blockParams = s || 0, l
            }

            function c() {
                return ""
            }

            function u(e, t, n, a, i, o) {
                if (e.decorator) {
                    var l = {};
                    t = e.decorator(t, l, n, a && a[0], i, o, a), s.extend(t, l)
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
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "t3+NOKwt",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-row\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-row\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-row\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["shouldShowMiniseries"]]],null,16],["text","\\n"],["block",["if"],[["get",["isSecondaryHeader"]]],null,13],["text","\\n"],["block",["if"],[["get",["data","isApexTierCutoff"]]],null,6],["text","\\n"],["block",["if"],[["get",["isNonTopTierStandingRow"]]],null,5],["text","\\n"],["block",["if"],[["get",["isTopTierStandingRow"]]],null,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["data","wins"]],false],["text","/"],["append",["unknown",["data","losses"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["data","wins"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","span",[]],["dynamic-attr","class",["concat",[["unknown",["positionDeltaStyle"]]]]],["flush-element"],["append",["unknown",["positionDeltaAbs"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-1 lol-leagues-list-col"],["flush-element"],["append",["unknown",["data","position"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-2 lol-leagues-list-col"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasPositionDelta"]]],null,2],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-3 lol-leagues-list-col"],["flush-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","lol-leagues-list-summoner-name"],["flush-element"],["text","\\n      "],["append",["helper",["player-name"],null,[["format","puuid","summonerName","batch"],["tooltip",["get",["data","puuid"]],["get",["data","summonerName"]],true]]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","lol-leagues-list-friend"],["dynamic-attr","visible",["concat",[["unknown",["isFriend"]]]]],["flush-element"],["close-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","lol-leagues-list-spectate"],["dynamic-attr","visible",["concat",[["unknown",["isAvailableForSpectate"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-4 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-5 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isTft"]]],null,1,0],["text","  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-7 lol-leagues-list-col"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-league-points"],["flush-element"],["text","\\n        "],["append",["unknown",["data","leaguePoints"]],false],["open-element","div",[]],["dynamic-attr","class",["concat",[["unknown",["divisionChangeStyle"]]]]],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","span",[]],["dynamic-attr","class",["concat",[["unknown",["positionDeltaStyle"]]]]],["flush-element"],["append",["unknown",["positionDeltaAbs"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-1 lol-leagues-list-col"],["flush-element"],["append",["unknown",["data","position"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-2 lol-leagues-list-col"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasPositionDelta"]]],null,4],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-3 lol-leagues-list-col"],["flush-element"],["text","\\n    "],["append",["helper",["player-name"],null,[["format","puuid","summonerName","batch"],["tooltip",["get",["data","puuid"]],["get",["data","summonerName"]],true]]],false],["text","\\n    "],["open-element","span",[]],["static-attr","class","lol-leagues-list-friend"],["dynamic-attr","visible",["concat",[["unknown",["isFriend"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-4 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-5 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["data","wins"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-7 lol-leagues-list-col"],["flush-element"],["text","\\n    "],["append",["unknown",["data","leaguePoints"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-apex-cutoff-container"],["flush-element"],["text","\\n    "],["open-element","hr",[]],["static-attr","class","lol-leagues-apex-cutoff-hr"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-apex-cutoff-title"],["flush-element"],["append",["unknown",["data","apexCutoffText"]],false],["close-element"],["text","\\n    "],["open-element","hr",[]],["static-attr","class","lol-leagues-apex-cutoff-hr"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_WINS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_TFT_WINS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-1 lol-leagues-list-col"],["flush-element"],["text","#"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-2 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-3 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_SUMMONERS"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-4 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-5 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isTft"]]],null,8,7],["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-7 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_POINTS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_WIN_LOSE"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_TFT_WINS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-1 lol-leagues-list-col"],["flush-element"],["text","#"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-2 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-3 lol-leagues-list-col"],["flush-element"],["append",["unknown",["data","headerText"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-4 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-5 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isTft"]]],null,11,10],["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-7 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_POINTS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["data","isApexTier"]]],null,12,9]],"locals":[]},{"statements":[["text","      "],["open-element","span",[]],["dynamic-attr","class",["concat",["lol-leagues-list-best-status ",["get",["msStyle"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["msStyle","index"]},{"statements":[["text","      "],["open-element","span",[]],["dynamic-attr","class",["concat",[["unknown",["positionDeltaStyle"]]]]],["flush-element"],["append",["unknown",["positionDeltaAbs"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-1 lol-leagues-list-col"],["flush-element"],["append",["unknown",["data","position"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-2 lol-leagues-list-col"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasPositionDelta"]]],null,15],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-3 lol-leagues-list-col"],["flush-element"],["text","\\n    "],["append",["helper",["player-name"],null,[["format","puuid","summonerName","batch"],["tooltip",["get",["data","puuid"]],["get",["data","summonerName"]],true]]],false],["text","\\n    "],["open-element","span",[]],["static-attr","class","lol-leagues-list-friend"],["dynamic-attr","visible",["concat",[["unknown",["isFriend"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-4 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-5 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["data","wins"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-7 lol-leagues-list-col"],["flush-element"],["text","\\n"],["block",["each"],[["get",["miniseriesStyles"]]],null,14],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1),
                s = n(24);
            n(76), e.exports = a.Ember.Component.extend({
                classNames: ["rank-queue-dropdown-component"],
                classNameBindings: ["wrapperStyle"],
                layout: n(77),
                leagues: a.Ember.A(),
                wrapperStyle: a.Ember.computed("isPlayerUnranked", (function() {
                    return this.get("isPlayerUnranked") ? "lol-leagues-empty-filter-wrapper" : "lol-leagues-filter-wrapper"
                })),
                didInsertElement: function() {
                    this._super(...arguments), this.$("lol-uikit-flat-dropdown")[0].addEventListener("selected", (e => {
                        this._onSelected(e)
                    }))
                },
                challengerQueues: a.Ember.computed("challengerLaddersEnabled", (function() {
                    const e = this,
                        t = e.get("challengerLaddersEnabled");
                    if (!t) return a.Ember.A([]);
                    return a.Lodash.map(t, (t => ({
                        queueType: t,
                        queueTypeDisplay: e.get("tra").formatString("LEAGUES_DROPDOWN_APEX", {
                            queueType: a.LeagueTierNames.getRankedQueueName(t)
                        })
                    })))
                })),
                summonerLeagues: a.Ember.computed("selectedLeague.queueType", "leagues", (function() {
                    const e = this.get("leagues.summonerLeagues"),
                        t = this.get("selectedLeague.queueType");
                    if (!e) return null;
                    return a.Lodash.map(e, (e => ({
                        queue: e,
                        isSelected: "summoner" === this.get("leagueTypeSelected") && t === e.queueType
                    }))).filter((function(e) {
                        const t = e.tier && e.tier !== a.LeaguesConsts.TIER_NAME_NONE;
                        return !(0, s.isTftQueueType)(e.queueType) || t
                    }))
                })),
                topRatedLadderQueues: a.Ember.computed("topRatedLaddersEnabled", (function() {
                    const e = this,
                        t = e.get("topRatedLaddersEnabled");
                    if (!t) return a.Ember.A([]);
                    return a.Lodash.map(t, (t => ({
                        queueType: t,
                        queueTypeDisplay: e.get("tra").formatString("LEAGUES_DROPDOWN_APEX", {
                            queueType: a.LeagueTierNames.getRankedQueueName(t)
                        })
                    })))
                })),
                _onSelected: function(e) {
                    const t = e.selected.dataset.leaguetype,
                        n = e.selected.dataset.queuetype;
                    this.sendAction("onSelectLeagueType", t, n)
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "82QeIMb9",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-queue-dropdown\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-queue-dropdown\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-queue-dropdown\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-flat-dropdown",[]],["static-attr","class","rank-queue-dropdown-container"],["static-attr","direction","downwards"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-dropdown-optgroup",[]],["static-attr","slot","lol-uikit-dropdown-optgroup"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-uikit-dropdown-optgroup-header"],["static-attr","slot","lol-uikit-dropdown-optgroup-header"],["flush-element"],["append",["unknown",["tra","LEAGUES_DROPDOWN_GROUP_MY_LEAGUES"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["leagues","summonerLeagues"]]],null,5,3],["text","  "],["close-element"],["text","\\n"],["block",["unless"],[["get",["overlayMode"]]],null,2],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","data-leaguetype","rated"],["dynamic-attr","data-queuetype",["unknown",["l","queueType"]],null],["flush-element"],["append",["unknown",["l","queueTypeDisplay"]],false],["close-element"],["text","\\n"]],"locals":["l","index"]},{"statements":[["text","      "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","data-leaguetype","apex"],["dynamic-attr","data-queuetype",["unknown",["l","queueType"]],null],["flush-element"],["append",["unknown",["l","queueTypeDisplay"]],false],["close-element"],["text","\\n"]],"locals":["l","index"]},{"statements":[["text","  "],["open-element","lol-uikit-dropdown-optgroup",[]],["static-attr","slot","lol-uikit-dropdown-optgroup"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-uikit-dropdown-optgroup-header"],["static-attr","slot","lol-uikit-dropdown-optgroup-header"],["flush-element"],["append",["unknown",["tra","LEAGUES_DROPDOWN_GROUP_CHALLENGER_TIER"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["challengerQueues"]]],null,1],["block",["each"],[["get",["topRatedLadderQueues"]]],null,0],["text","  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","data-leaguetype","unranked"],["flush-element"],["append",["unknown",["tra","LEAGUES_QUEUE_NAME_UNRANKED"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","selected",["unknown",["l","isSelected"]],null],["static-attr","data-leaguetype","summoner"],["dynamic-attr","data-queuetype",["concat",[["unknown",["l","queue","queueType"]]]]],["flush-element"],["text","\\n        "],["append",["unknown",["l","queue","queueTypeDisplay"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":["l","index"]},{"statements":[["block",["each"],[["get",["summonerLeagues"]]],null,4]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1);
            n(79);
            e.exports = a.Ember.Component.extend({
                classNames: ["ranked-rewards-component"],
                classNameBindings: ["hidingRewards:hidden"],
                layout: n(80),
                animationDelayProgressBarFirstTime: 1250,
                animationDelayRewardDropPerReward: 200,
                animationDurationProgressBar: 1e3,
                animationDurationRewardDrop: 200,
                honorLevel: 0,
                didInsertElement: function() {
                    this._super(...arguments), window.requestAnimationFrame((() => this.positionElements())), a.Ember.run.later(this, (function() {
                        this.animateSplitNavigation(!0)
                    }), this.animationDelayProgressBarFirstTime)
                },
                didUpdateAttrs: function() {
                    this._super(...arguments);
                    const e = this.get("victoriousSkinItemInstanceId");
                    e !== this.prevVictoriousSkinId && a.LeagueTierNames.asyncGetRewardImage(e, "splashPath").then((e => {
                        this.set("victoriousSkinSplashPath", e)
                    })), this.prevVictoriousSkinId = e
                },
                victoriousSkinBackgroundStyle: a.Ember.computed("victoriousSkinSplashPath", (function() {
                    const e = this.get("victoriousSkinSplashPath");
                    return this.get("victoriousSkinSplashPath") ? `background-image: radial-gradient(54.18% 78.51% at 52.44% 21.49%, rgba(0, 0, 0, 0) 0%, #1A1C21 100%), url(${e})` : "background-image: url('/fe/lol-static-assets/victorious_before_reveal_background.png')"
                })),
                animateSplitNavigation: function(e) {
                    this.setProgressBarScale(e)
                },
                setProgressBarScale: function(e) {
                    const t = this.element.querySelector(".ranked-rewards-progress-bar"),
                        n = this.get("currentSplit.rewardTrack"),
                        a = this.get("currentSplit.splitId"),
                        s = this.get("splitsRewardPositionData"),
                        i = a && s && s[a - 1],
                        o = this.get("spacingSize");
                    if (!(n && t && i && o)) return;
                    const l = this.get("lastEarnedReward"),
                        r = this.get("nextReward"),
                        c = this.calculateProgressBarPercentWidth(i, o, l, r);
                    e ? this.animateProgressBar(t, c) : t.style.transform = `scaleX(${c})`
                },
                calculateProgressBarPercentWidth: function(e, t, n, a) {
                    if (a) {
                        if (n) {
                            const s = a.splitPoints - n.splitPoints,
                                i = e[a.splitPoints],
                                o = this.get("playerPoints");
                            if (!i || !o) return 0;
                            const l = a.splitPoints - o;
                            return (i.left - l * t / s) / 836
                        }
                        return 0
                    }
                    return 1
                },
                animateProgressBar: function(e, t) {
                    const n = [{
                            transform: "scaleX(0)"
                        }, {
                            transform: `scaleX(${t})`
                        }],
                        a = {
                            duration: this.animationDurationProgressBar,
                            easing: "cubic-bezier(0,.35,0,1)"
                        };
                    e.animate(n, a), e.style.transform = `scaleX(${t})`
                },
                positionElements: function() {
                    const e = this.element.querySelector(".ranked-rewards-bar-container");
                    if (!e) return;
                    const t = [];
                    e.style.width = "836px";
                    const n = this.getRewardElements(),
                        a = this.get("currentSplit.rewardTrack") || [];
                    if (!n || !a) return;
                    const s = {};
                    let i = 0;
                    for (let e = 0; e < a.length; e++) {
                        const t = a[e],
                            n = this.getRewardSize(t);
                        0 === e || e === a.length - 1 ? i += n / 2 : i += n, s[t.splitPoints] = {
                            size: n
                        }
                    }
                    const o = a.length - 1,
                        l = Math.floor((836 - i) / o);
                    this.set("spacingSize", l);
                    let r = 0;
                    for (let e = 0; e < n.length; e++) {
                        const t = n[e],
                            a = t.getAttribute("data-required-points"),
                            i = s[a].size;
                        0 === e && (r -= Math.floor(i / 2)), s[a].left = r, t.style.left = `${r}px`, r += i + l
                    }
                    t.push(s), this.set("splitsRewardPositionData", t)
                },
                playerPoints: a.Ember.computed("currentSplit.splitId", "rewardsProgress", (function() {
                    const e = this.get("currentSplit.splitId"),
                        t = this.get("rewardsProgress");
                    return t && t[e] || 0
                })),
                getRewardElements: function() {
                    return [...this.element.querySelectorAll(".ranked-reward-item-component")]
                },
                flattenedSplitRewards: a.Ember.computed("currentSplit.rewardTrack.[]", (function() {
                    return (this.get("currentSplit.rewardTrack") || []).map((e => ({
                        reward: e,
                        is52px: 52 === this.getRewardSize(e)
                    })))
                })),
                lastEarnedReward: a.Ember.computed("currentSplit.rewardTrack.[]", "playerPoints", (function() {
                    const e = this.get("currentSplit.rewardTrack") || [],
                        t = this.get("playerPoints");
                    return [...e].sort(((e, t) => t.splitPoints - e.splitPoints)).find((e => e.splitPoints <= t))
                })),
                nextReward: a.Ember.computed("currentReward.rewardTrack.[]", "playerPoints", (function() {
                    const e = this.get("currentSplit.rewardTrack") || [],
                        t = this.get("playerPoints");
                    return e.sort(((e, t) => e.splitPoints - t.splitPoints)), e.find((e => e.splitPoints > t))
                })),
                getRewardSize: function(e) {
                    const t = a.LeagueTierNames.getConstants().REWARD_TYPES,
                        n = e && e.rewards && e.rewards[0] && e.rewards[0].rewardType || t.HEXTECH_KEY;
                    return n === t.EMOTE || n === t.SUMMONER_ICON || n === t.CHAMPION_TOKEN || n === t.MASTERWORK_CHEST ? 52 : 32
                },
                currentSplit: a.Ember.computed.alias("splitsConfig.currentSplit"),
                getVictoriousPointsNeededForTier: (e, t) => t && e && e.victoriousSkinRewardGroup && e.victoriousSkinRewardGroup.splitPointsByHighestAchievedTier && e.victoriousSkinRewardGroup.splitPointsByHighestAchievedTier[t] || 1600,
                isVictoriousSkinUnlocked: a.Ember.computed("victoriousPointsPercentageEarned", (function() {
                    return 100 === this.get("victoriousPointsPercentageEarned")
                })),
                victoriousPointsPercentageEarned: a.Ember.computed("currentSplit", "myRankedStats", "playerPoints", (function() {
                    const e = this.get("currentSplit"),
                        t = this.get("myRankedStats"),
                        n = this.get("playerPoints");
                    if (!e || !t || !n) return 0;
                    const a = this.getVictoriousPointsNeededForTier(e, t.highestCurrentSeasonReachedTierSR);
                    return a ? 100 * Math.min(n / a, 1) : 0
                })),
                victoriousPointsSilverBelow: a.Ember.computed("victoriousPointsNeededSilverBelow", "playerPoints", "myRankedStats.highestCurrentSeasonReachedTierSR", (function() {
                    const e = this.get("myRankedStats.highestCurrentSeasonReachedTierSR");
                    return e && a.LeagueTierNames.getConstants().TIERS.indexOf(e) <= 2 ? `${this.get("playerPoints")} / ${this.get("victoriousPointsNeededSilverBelow")}` : `${this.get("victoriousPointsNeededSilverBelow")} / ${this.get("victoriousPointsNeededSilverBelow")}`
                })),
                victoriousPointsNeededSilverBelow: a.Ember.computed("currentSplit", (function() {
                    return this.getVictoriousPointsNeededForTier(this.get("currentSplit"), a.LeagueTierNames.getConstants().TIERS[2])
                })),
                victoriousPointsNeededGoldAbove: a.Ember.computed("currentSplit", (function() {
                    return this.getVictoriousPointsNeededForTier(this.get("currentSplit"), a.LeagueTierNames.getConstants().TIERS[3])
                })),
                showHonorWarning: a.Ember.computed("honorLevel", "isVictoriousSkinUnlocked", (function() {
                    return this.get("honorLevel") < 2 && !this.get("isVictoriousSkinUnlocked")
                }))
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "Fr4Ri/5N",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-rewards\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-rewards\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-rewards\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","ranked-victorious-progress-wrapper"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["top"]],6],["text","  "],["open-element","lol-uikit-radial-progress",[]],["static-attr","class","ranked-victorious-progress"],["static-attr","type","custom"],["dynamic-attr","percent",["unknown",["victoriousPointsPercentageEarned"]],null],["static-attr","start-angle","235"],["static-attr","end-angle","-55"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","slot","middle"],["static-attr","class","ranked-victorious-progress-middle"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ranked-victorious-progress-border"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ranked-victorious-icon-border"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ranked-victorious-icon"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["showHonorWarning"]]],null,2],["block",["if"],[["get",["isVictoriousSkinUnlocked"]]],null,1],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","ranked-rewards-divider"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","ranked-rewards-bar-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ranked-rewards-bar"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ranked-rewards-progress-bar"],["flush-element"],["close-element"],["text","\\n"],["block",["each"],[["get",["flattenedSplitRewards"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["ranked-reward-item"],null,[["reward","playerPoints","nextReward","is52px"],[["get",["reward","reward"]],["get",["playerPoints"]],["get",["nextReward"]],["get",["reward","is52px"]]]]],false],["text","\\n"]],"locals":["reward"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","ranked-victorious-icon-pip-slot"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","ranked-victorious-icon-checkmark"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","ranked-victorious-icon-warning"],["flush-element"],["text","\\n      "],["open-element","svg",[]],["static-attr","class","ranked-victorious-icon-warning-icon"],["static-attr","width","20"],["static-attr","height","20"],["static-attr","viewBox","0 0 21 20"],["static-attr","fill","none"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["flush-element"],["text","\\n        "],["open-element","path",[]],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M11.3889 3L18.5 15.25L17.6111 17H3.38889L2.5 15.25L9.61111 3H11.3889ZM9.61111 11.75L8.72222 7.375L10.5 6.5L12.2778 7.375L11.3889 11.75H9.61111ZM12.2778 14.375L10.5 16.125L8.72222 14.375L10.5 12.625L12.2778 14.375Z"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-rank-info"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-icons"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-icon iron"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-icon bronze"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-icon silver"],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-header"],["flush-element"],["append",["unknown",["tra","RANK_REWARDS_VICTORIOUS_TOOLTIP_IRON_TO_SILVER"]],false],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-points-wrapper"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-points-required"],["flush-element"],["append",["unknown",["victoriousPointsSilverBelow"]],false],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-points-text"],["flush-element"],["append",["unknown",["tra","RANK_REWARDS_VICTORIOUS_TOOLTIP_SP"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-divider"],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-rank-info"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-icons"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-icon gold-above"],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-header"],["flush-element"],["append",["unknown",["tra","RANK_REWARDS_VICTORIOUS_TOOLTIP_GOLD_ABOVE"]],false],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-points-wrapper"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-points-required"],["flush-element"],["append",["unknown",["victoriousPointsNeededGoldAbove"]],false],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-points-text"],["flush-element"],["append",["unknown",["tra","RANK_REWARDS_VICTORIOUS_TOOLTIP_SP"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","ranked-victorious-skin-earned"],["flush-element"],["append",["unknown",["tra","RANK_REWARDS_VICTORIOUS_TOOLTIP_SKIN_EARNED"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-honor-level-warning"],["flush-element"],["text","\\n            "],["open-element","svg",[]],["static-attr","class","honor-level-warning-icon"],["static-attr","width","21"],["static-attr","height","20"],["static-attr","viewBox","0 0 21 20"],["static-attr","fill","none"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["flush-element"],["text","\\n              "],["open-element","path",[]],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M11.3889 3L18.5 15.25L17.6111 17H3.38889L2.5 15.25L9.61111 3H11.3889ZM9.61111 11.75L8.72222 7.375L10.5 6.5L12.2778 7.375L11.3889 11.75H9.61111ZM12.2778 14.375L10.5 16.125L8.72222 14.375L10.5 12.625L12.2778 14.375Z"],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["append",["unknown",["tra","RANK_REWARDS_VICTORIOUS_TOOLTIP_HONOR_LEVEL_WARNING"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","class","ranked-victorious-tooltip"],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-background before-reveal"],["dynamic-attr","style",["unknown",["victoriousSkinBackgroundStyle"]],null],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-info"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-header"],["flush-element"],["append",["unknown",["tra","RANK_REWARDS_VICTORIOUS_TOOLTIP_HEADER"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-description"],["flush-element"],["append",["unknown",["tra","RANK_REWARDS_VICTORIOUS_TOOLTIP_DESCRIPTION"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["showHonorWarning"]]],null,5],["block",["if"],[["get",["isVictoriousSkinUnlocked"]]],null,4,3],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1);
            n(82);
            const s = "Unlocked",
                i = "Selected";
            e.exports = a.Ember.Component.extend({
                classNames: ["ranked-reward-item-component"],
                classNameBindings: ["unlocked:unlocked:future-reward", "is32px:is-32-px", "is52px:is-52-px"],
                attributeBindings: ["reward.splitPoints:data-required-points"],
                layout: n(83),
                iconPath: null,
                previousRewardId: null,
                rewardId: a.Ember.computed.readOnly("reward.rewards.0.id"),
                rewardItemTooltipTitle: null,
                rewardType: a.Ember.computed.readOnly("reward.rewards.0.rewardType"),
                didReceiveAttrs: function() {
                    this._super(...arguments);
                    const e = this.get("rewardId");
                    e !== this.get("previousRewardId") && (this.set("previousRewardId", e), this.updateIconPath(e), this.updateRewardItemTooltipTitle(e))
                },
                updateIconPath(e) {
                    a.LeagueTierNames.asyncGetRewardImage(e).then((e => {
                        this.set("iconPath", e)
                    }))
                },
                updateRewardItemTooltipTitle(e) {
                    a.LeagueTierNames.asyncGetSplitRewardLocalization(e).then((e => {
                        this.set("rewardItemTooltipTitle", e)
                    }))
                },
                pointsRequiredTooltipMessage: a.Ember.computed("tra", "unlocked", "tra.RANK_REWARDS_ITEM_POINTS_REQUIRED", "playerPoints", "reward.splitPoints", (function() {
                    const e = this.get("tra");
                    return this.get("unlocked") ? "" : e.formatString("RANK_REWARDS_ITEM_POINTS_REQUIRED", {
                        currentPoints: this.get("playerPoints"),
                        pointsRequired: this.get("reward.splitPoints")
                    })
                })),
                unlocked: a.Ember.computed("playerPoints", "reward.splitPoints", (function() {
                    return this.get("playerPoints") >= this.get("reward.splitPoints")
                })),
                unlockedString: a.Ember.computed("tra.RANK_REWARDS_UNLOCKED", "unlocked", (function() {
                    return this.get("unlocked") ? this.get("tra.RANK_REWARDS_UNLOCKED") : ""
                })),
                nextRewardPointsRequired: a.Ember.computed("nextReward.splitPoints", (function() {
                    return this.get("nextReward.splitPoints") || 0
                })),
                pointsNeededText: a.Ember.computed("isNextReward", "reward.splitPoints", "playerPoints", (function() {
                    const e = this.get("isNextReward"),
                        t = this.get("reward.splitPoints"),
                        n = this.get("tra");
                    return e ? n.formatString("RANK_REWARDS_IN_PROGRESS_POINTS_REQUIRED", {
                        pointsRequired: t
                    }) : n.formatString("RANK_REWARDS_POINTS_REQUIRED", {
                        pointsRequired: t
                    })
                })),
                shouldShowPointProgress: a.Ember.computed.or("isNextReward", "isHovered"),
                rewardOptionIsDisabled: a.Ember.computed.alias("unlocked"),
                rewardOptionState: a.Ember.computed("unlocked", (function() {
                    return this.get("unlocked") ? i : s
                })),
                isNextReward: a.Ember.computed("nextRewardPointsRequired", "reward.splitPoints", (function() {
                    return this.get("nextRewardPointsRequired") === this.get("reward.splitPoints")
                })),
                hasBorder: a.Ember.computed("rewardType", (function() {
                    const e = this.get("rewardType"),
                        t = a.LeagueTierNames.getConstants().REWARD_TYPES;
                    return e === t.SUMMONER_ICON || e === t.CHAMPION_TOKEN
                })),
                is32px: a.Ember.computed.not("is52px"),
                actions: {
                    rewardHovered() {
                        this.set("isHovered", !0)
                    },
                    rewardClicked() {
                        this.set("isClicked", !0)
                    },
                    rewardUnhovered() {
                        this.set("isHovered", !1), this.set("isClicked", !1)
                    },
                    rewardUnclicked() {
                        this.set("isClicked", !1)
                    }
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "/VYx9lho",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-reward-item\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-reward-item\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-reward-item\\\\index.js\\" "],["text","\\n"],["append",["helper",["reward-option"],null,[["is32px","is52px","thumbIconPath","state","isDisabled","isHovered","isClicked"],[["get",["is32px"]],["get",["is52px"]],["get",["iconPath"]],["get",["rewardOptionState"]],["get",["rewardOptionIsDisabled"]],["get",["isHovered"]],["get",["isClicked"]]]]],false],["text","\\n"],["block",["if"],[["get",["shouldShowPointProgress"]]],null,3],["open-element","div",[]],["static-attr","class","ranked-reward-hitbox"],["dynamic-attr","onmousedown",["helper",["action"],[["get",[null]],"rewardClicked"],null],null],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"rewardHovered"],null],null],["dynamic-attr","onmouseleave",["helper",["action"],[["get",[null]],"rewardUnhovered"],null],null],["dynamic-attr","onmouseup",["helper",["action"],[["get",[null]],"rewardUnclicked"],null],null],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["class","tooltipPosition"],["my-tooltip","top"]],1],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","lock-overlay"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","lock-icon"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","class","ranked-reward-tooltip"],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ranked-reward-image-sizer"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["ranked-reward-image-border ",["unknown",["rewardType"]]," ",["helper",["if"],[["get",["hasBorder"]],"border"],null]]]],["flush-element"],["text","\\n          "],["open-element","img",[]],["dynamic-attr","class",["concat",["ranked-reward-image ",["unknown",["rewardType"]]]]],["dynamic-attr","src",["unknown",["iconPath"]],null],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"],["block",["unless"],[["get",["unlocked"]]],null,0],["text","      "],["close-element"],["text","\\n      "],["open-element","hr",[]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ranked-reward-title"],["flush-element"],["append",["unknown",["rewardItemTooltipTitle"]],false],["close-element"],["text","\\n      "],["open-element","h6",[]],["flush-element"],["append",["unknown",["unlockedString"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["pointsRequiredTooltipMessage"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","ranked-reward-point-progress-text current-points"],["flush-element"],["append",["unknown",["playerPoints"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","ranked-reward-point-progress"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isNextReward"]]],null,2],["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["ranked-reward-point-progress-text points-needed ",["helper",["if"],[["get",["unlocked"]],"unlocked"],null]]]],["flush-element"],["append",["unknown",["pointsNeededText"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1),
                s = n(24);
            n(85), e.exports = a.Ember.Component.extend({
                classNames: ["rated-badge-component"],
                layout: n(86),
                queue: null,
                summoner: null,
                rankedService: (0, a.dataBinding)("/lol-ranked", (0, a.getProvider)().getSocket()),
                init: function() {
                    this._super(...arguments);
                    this.get("rankedService").observe("/v1/current-ranked-stats", this, this.fetchRatedData)
                },
                didReceiveAttrs: function() {
                    this._super(...arguments), this.fetchRatedData()
                },
                willDestroyElement: function() {
                    this._super(...arguments);
                    this.get("rankedService").unobserve(this)
                },
                isTft: a.Ember.computed("queueType", (function() {
                    return (0, s.isTftQueueType)(this.get("queueType"))
                })),
                ratedTier: a.Ember.computed("queue", "isTft", (function() {
                    const e = this.get("isTft"),
                        t = this.get("queue");
                    return t && t.ratedTier ? t.ratedTier : e ? a.LeagueTierNames.getConstants().LOWEST_TFT_RATED_TIER : a.LeagueTierNames.getConstants().LOWEST_CHERRY_RATED_TIER
                })),
                isUnrated: a.Ember.computed("ratedTier", (function() {
                    return a.LeagueTierNames.isUnrated(this.get("ratedTier"))
                })),
                ratedTierImagePath: a.Ember.computed("ratedTier", "queueType", (function() {
                    const e = this.get("ratedTier"),
                        t = this.get("queueType");
                    return e ? a.LeagueTierNames.getRatedPostgameBadge(e, t) : ""
                })),
                displayedRatedRating: a.Ember.computed("queue", "ratedTier", "isUnrated", (function() {
                    const e = this.get("ratedTier"),
                        t = this.get("isUnrated"),
                        n = this.get("queue");
                    return n && e && !t ? n.ratedRating : "---"
                })),
                fetchRatedData() {
                    const e = this.get("summoner.puuid"),
                        t = this.get("queueType");
                    e && t && (0, a.dataBinding)("lol-ranked").get(`/v1/ranked-stats/${e}`, {
                        skipCache: !0
                    }).then((e => {
                        this._setRatedData(e, t)
                    }))
                },
                _setRatedData(e, t) {
                    const n = e.queues.find((e => e.queueType === t));
                    this.set("queue", n)
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "ZidMx1yC",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rated-badge\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rated-badge\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rated-badge\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rated-badge-container"],["flush-element"],["text","\\n  "],["open-element","img",[]],["static-attr","class","rated-badge-icon"],["dynamic-attr","src",["concat",[["unknown",["ratedTierImagePath"]]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isTft"]]],null,0],["text","\\n  "],["open-element","div",[]],["static-attr","class","rated-badge-rating-text"],["flush-element"],["text","\\n    "],["append",["unknown",["displayedRatedRating"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rated-badge-divider"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rated-badge-player-container"],["flush-element"],["text","\\n    "],["open-element","lol-social-avatar-icon",[]],["dynamic-attr","icon-id",["unknown",["summoner","profileIconId"]],null],["static-attr","availability","online"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","rated-badge-player-name"],["flush-element"],["text","\\n      "],["append",["unknown",["summoner","displayName"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-lottie",[]],["static-attr","class","rated-badge-highlight"],["static-attr","image-path","/fe/lol-static-assets/lottie/tft-rated/images/"],["static-attr","src","/fe/lol-static-assets/lottie/tft-rated/Badge_Highlight_EOG.json"],["static-attr","resize-to-fit","true"],["static-attr","loop","true"],["static-attr","autoplay","true"],["flush-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1),
                s = n(23);

            function i(e) {
                return e < 10 ? "0" + e : e
            }
            n(88), e.exports = a.Ember.Component.extend({
                classNames: ["countdown-timer-component"],
                layout: n(89),
                getCurrentTime: function() {
                    return (new Date).getTime()
                },
                hasTimeLeft: a.Ember.computed("nextCountdown", (function() {
                    return this.get("nextCountdown") >= 1e3
                })),
                countdownChanged: a.Ember.observer("countdownToTime", (function() {
                    const e = this.get("countdownToTime") - this.getCurrentTime();
                    var t;
                    this.set("nextCountdown", Math.max(e, 0)), this.clearTimer(), this.set("countdownTimer", setInterval((t = this, () => {
                        let e = t.get("nextCountdown");
                        e >= s.PROMOTE_COUNTDOWN_INTERVAL_MS ? (e -= s.PROMOTE_COUNTDOWN_INTERVAL_MS, t.set("nextCountdown", e)) : t.clearTimer()
                    }), s.PROMOTE_COUNTDOWN_INTERVAL_MS))
                })),
                countdownTimeLeft: a.Ember.computed("nextCountdown", (function() {
                    const e = this.get("nextCountdown"),
                        t = a.moment.duration(e);
                    return `${i(t.hours())}:${i(t.minutes())}:${i(t.seconds())}`
                })),
                clearTimer: function() {
                    const e = this.get("countdownTimer");
                    e && clearInterval(e)
                },
                didInsertElement: function() {
                    this.notifyPropertyChange("countdownToTime")
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "+yYn7mP4",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\countdown-timer-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\countdown-timer-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\countdown-timer-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["countdown-label ",["helper",["if"],[["get",["isUrgent"]],"urgent"],null]]]],["flush-element"],["text","\\n  "],["append",["unknown",["countdownLabel"]],false],["text"," \\n"],["close-element"],["text","\\n \\n"],["block",["if"],[["get",["hasTimeLeft"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["unknown",["onRefresh"]],null],["static-attr","class","countdown-refresh-button"],["flush-element"],["text","\\n  "],["append",["unknown",["tra","RANKED_REFRESH_LABEL"]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["open-element","div",[]],["dynamic-attr","class",["concat",["countdown-time-left ",["helper",["if"],[["get",["isUrgent"]],"urgent"],null]]]],["flush-element"],["text","\\n  "],["append",["unknown",["countdownTimeLeft"]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1);
            const s = (0, a.emberDataBinding)({
                Ember: a.Ember,
                websocket: (0, a.getProvider)().getSocket(),
                basePaths: {
                    spectator: "/lol-spectator",
                    gameflow: "/lol-gameflow",
                    platformConfig: "/lol-platform-config",
                    clash: "/lol-clash"
                },
                boundProperties: {
                    leagueSpectateToggleJMX: {
                        api: "platformConfig",
                        path: "/v1/namespaces/LcuLeagueSpectate"
                    },
                    clashPlaymodeRestricted: {
                        api: "clash",
                        path: "/v2/playmode-restricted"
                    }
                }
            });
            e.exports = a.Ember.Service.extend(s, {
                spectateEnabled: a.Ember.computed("leagueSpectateToggleJMX.Enabled", "clashPlaymodeRestricted.isRestricted", (function() {
                    const e = this.get("leagueSpectateToggleJMX.Enabled"),
                        t = this.get("clashPlaymodeRestricted.isRestricted");
                    return !1 !== e && !t
                })),
                spectateGame: function(e, t, n) {
                    return this.get("spectateEnabled") ? this.get("api.spectator").post("v1/spectate/launch", {
                        dropInSpectateGameId: e,
                        gameQueueType: n,
                        allowObserveMode: "ALL",
                        puuid: t
                    }) : Promise.resolve({
                        status: "ERROR",
                        message: "SPECTATE_IS_NOT_ENABLED"
                    })
                },
                availableForSpectateBySummonerNames: function(e) {
                    return this.get("spectateEnabled") ? this.get("api.spectator").post("v1/buddy/spectate", e, {
                        skipCache: !0
                    }).then((e => e.availableForWatching ? e.availableForWatching : []), (() => {})) : Promise.resolve([])
                },
                availableForSpectateBySummonerIds: function(e) {
                    return this.get("spectateEnabled") ? this.get("api.spectator").post("v2/buddy/spectate", e, {
                        skipCache: !0
                    }).then((e => e.availableForWatching ? e.availableForWatching : []), (() => {})) : Promise.resolve([])
                }
            })
        }, (e, t, n) => {
            "use strict";
            var a, s = n(1),
                i = n(23),
                o = (a = n(92)) && a.__esModule ? a : {
                    default: a
                };
            n(93);
            const l = (0, s.emberDataBinding)({
                Ember: s.Ember,
                websocket: (0, s.getProvider)().getSocket(),
                boundProperties: {
                    currentSummoner: "/lol-summoner/v1/current-summoner"
                }
            });
            e.exports = s.Ember.Component.extend(l, o.default, {
                classNames: ["leagues-promotion-vignette-v2-component"],
                layout: n(94),
                animationStarted: !1,
                audioObject: null,
                queueType: s.Ember.computed.alias("notification.queueType"),
                currentTier: s.Ember.computed.alias("notification.tier"),
                previousTier: s.Ember.computed("currentTier", "isTierPromotion", "tiers.[]", (function() {
                    const e = this.get("currentTier");
                    if (!this.get("isTierPromotion")) return e;
                    const t = this.get("tiers") || [],
                        n = Math.max(t.indexOf(e) - 1, 0);
                    return t[n]
                })),
                didUpdateAttrs: function() {
                    this._super(...arguments), this.get("shouldAnimate") && this.get("introVideoPath") && this.get("outroVideoPath") && this.startAnimation()
                },
                willDestroyElement: function() {
                    this._super(...arguments);
                    const e = this.get("audioObject");
                    e && e.isPlaying && e.isPlaying() && e.fadeOut(void 0, {
                        stop: !0
                    })
                },
                isAnimationEnabled: s.Ember.computed("isLowSpec", (function() {
                    return !this.get("isLowSpec")
                })),
                shouldAnimate: s.Ember.computed("isLowSpec", "isShowing", "animationStarted", (function() {
                    return !this.get("isLowSpec") && this.get("isShowing") && !this.get("animationStarted")
                })),
                introVideoPath: s.Ember.computed("previousTier", "isCompletedProvisionals", (function() {
                    if (this.get("isCompletedProvisionals")) return `${i.ASSET_PATH}videos/ranked/tier-promotion-from-unranked.webm`;
                    const e = this.get("previousTier");
                    return e ? `${i.ASSET_PATH}videos/ranked/tier-promotion-from-${e.toLowerCase()}.webm` : ""
                })),
                outroVideoPath: s.Ember.computed("currentTier", (function() {
                    const e = this.get("currentTier");
                    return e ? `${i.ASSET_PATH}videos/ranked/tier-promotion-to-${e.toLowerCase()}.webm` : ""
                })),
                introAudioPath: s.Ember.computed("previousTier", "isCompletedProvisionals", (function() {
                    if (this.get("isCompletedProvisionals")) return `${i.ASSET_PATH}sounds/ranked/sfx-tier-wings-promotion-from-unranked.ogg`;
                    const e = this.get("previousTier");
                    return e ? `${i.ASSET_PATH}sounds/ranked/sfx-tier-wings-promotion-from-${e.toLowerCase()}.ogg` : ""
                })),
                outroAudioPath: s.Ember.computed("currentTier", (function() {
                    const e = this.get("currentTier");
                    return e ? `${i.ASSET_PATH}sounds/ranked/sfx-tier-wings-promotion-to-${e.toLowerCase()}.ogg` : ""
                })),
                outroImagePath: s.Ember.computed("currentTier", (function() {
                    const e = this.get("currentTier");
                    return e ? `${i.ASSET_PATH}images/ranked-emblem/emblem-${e.toLowerCase()}.png` : ""
                })),
                startAnimation: function() {
                    const e = document.getElementById("ceremony-intro"),
                        t = document.getElementById("ceremony-outro"),
                        n = document.querySelector(".leagues-promotion-emblem");
                    if (!e || !t) return;
                    const a = this.get("introAudioPath"),
                        s = this.createSound(a),
                        i = this.get("outroAudioPath"),
                        o = this.createSound(i);
                    this.set("animationStarted", !0), e.addEventListener("signal", (() => {
                        t.play(), this.playAudio(o)
                    })), t.addEventListener("signal", (() => {
                        n.classList.remove("hidden")
                    })), e.play(), this.playAudio(s)
                },
                playAudio: function(e) {
                    !this.get("isLowSpec") && e && (e.play(), this.set("audioObject", e))
                },
                division: s.Ember.computed.alias("notification.division"),
                leaguePoints: s.Ember.computed.alias("notification.leaguePoints"),
                isApex: s.Ember.computed("tierUpperCase", (function() {
                    return s.LeaguesConsts.APEX_TIERS.includes(this.get("tierUpperCase"))
                })),
                isTierPromotion: s.Ember.computed("isCompletedProvisionals", "isApex", "division", (function() {
                    const e = this.get("isCompletedProvisionals"),
                        t = this.get("isApex"),
                        n = this.get("division");
                    return !e && (t || n === s.LeaguesConsts.DIVISIONS[0])
                })),
                isCompletedProvisionals: s.Ember.computed("notification.notifyReason", (function() {
                    return "COMPLETED_PROVISIONALS" === this.get("notification.notifyReason")
                })),
                tierUpperCase: s.Ember.computed("notification.tier", (function() {
                    const e = this.get("notification.tier");
                    return e ? e.toUpperCase() : ""
                })),
                tierLowerCase: s.Ember.computed("notification.tier", (function() {
                    const e = this.get("notification.tier");
                    return e ? e.toLowerCase() : ""
                })),
                headerText: s.Ember.computed("isCompletedProvisionals", "fullTierLoc", "tierUpperCase", "division", "leaguePoints", (function() {
                    return this.get("isCompletedProvisionals") ? this.get("tra").formatString("LEAGUES_COMPLETED_PROVISIONALS_VIGNETTE_HEADER", {
                        tierDivisionLpLoc: s.LeagueTierNames.getTierDivisionLpLoc(this.get("tierUpperCase"), this.get("division"), this.get("leaguePoints"))
                    }) : this.get("tra").formatString("LEAGUES_PROMOTION_VIGNETTE_HEADER", {
                        tierDivisionLoc: s.LeagueTierNames.getFullTierDivisionName(this.get("tierUpperCase"), this.get("division"))
                    })
                })),
                subheaderText: s.Ember.computed("isCompletedProvisionals", "queueType", (function() {
                    const e = this.get("queueType"),
                        t = s.LeagueTierNames.getRankedQueueName(e);
                    return this.get("isCompletedProvisionals") ? this.get("tra").formatString("LEAGUES_COMPLETED_PROVISIONALS_VIGNETTE_SUBHEADER", {
                        queueType: t
                    }) : this.get("tra").formatString("LEAGUES_PROMOTION_VIGNETTE_SUBHEADER", {
                        queueType: t
                    })
                })),
                labelText: s.Ember.computed("currentSummoner.displayName", (function() {
                    return this.get("currentSummoner.displayName")
                })),
                shouldShowProfileIcon: s.Ember.computed("profileIconPath", (function() {
                    return !!this.get("profileIconPath")
                })),
                profileIconPath: s.Ember.computed("currentSummoner.profileIconId", (function() {
                    const e = this.get("currentSummoner.profileIconId");
                    return e ? `/lol-game-data/assets/v1/profile-icons/${e}.jpg` : null
                }))
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1);
            const s = "sfx-ui",
                i = "music-ambience";
            e.exports = a.Ember.Mixin.create({
                createSound: function(e) {
                    if (!1 === e) return;
                    return a.AudioPlugin.getChannel(s).createSound(e)
                },
                createAmbience: function(e) {
                    if (!1 === e) return;
                    return a.AudioPlugin.getChannel(i).createSound(e, {
                        isLoop: !0,
                        fadeIn: !0
                    })
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "0ukx6krI",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-promotion-vignette-v2-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-promotion-vignette-v2-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-promotion-vignette-v2-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["leagues-vignette-parallax-background ",["unknown",["vignetteSize"]]]]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-parallax-background",[]],["dynamic-attr","animated",["concat",[["unknown",["isAnimationEnabled"]]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","leagues-promotion-vignette-header"],["flush-element"],["text","\\n  "],["append",["unknown",["headerText"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","leagues-promotion-vignette-subheader"],["flush-element"],["text","\\n  "],["append",["helper",["sanitize"],[["get",["subheaderText"]]],null],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["leagues-promotion-vignette-label ",["helper",["unless"],[["get",["isLowSpec"]],"animated"],null]," ",["helper",["if"],[["get",["isCompletedProvisionals"]],"provisional"],null]," ",["helper",["if"],[["get",["isTierPromotion"]],"tier"],null]," ",["unknown",["tierLowerCase"]]," ",["helper",["if"],[["get",["animationStarted"]],"fadeIn"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["shouldShowProfileIcon"]]],null,2],["text","  "],["append",["unknown",["labelText"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["isLowSpec"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","\\n  "],["open-element","img",[]],["static-attr","class","leagues-promotion-emblem hidden"],["dynamic-attr","src",["unknown",["outroImagePath"]],null],["flush-element"],["close-element"],["text","\\n  "],["open-element","lol-uikit-video",[]],["static-attr","class","ceremony-video"],["static-attr","id","ceremony-intro"],["static-attr","fade-in","250"],["static-attr","fade-out","0"],["static-attr","signal-before-end","0.1"],["dynamic-attr","src",["unknown",["introVideoPath"]],null],["flush-element"],["close-element"],["text","\\n  "],["open-element","lol-uikit-video",[]],["static-attr","class","ceremony-video"],["static-attr","id","ceremony-outro"],["static-attr","fade-in","0"],["static-attr","fade-out","0"],["static-attr","signal-before-end","0.15"],["dynamic-attr","src",["unknown",["outroVideoPath"]],null],["flush-element"],["close-element"],["text","\\n\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","img",[]],["static-attr","class","leagues-promotion-emblem"],["dynamic-attr","src",["unknown",["outroImagePath"]],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","span",[]],["static-attr","class","leagues-promotion-vignette-profile-icon-border"],["flush-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["profileIconPath"]]]]],["static-attr","class","leagues-promotion-vignette-profile-icon"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1);
            n(96), e.exports = a.Ember.Component.extend({
                classNames: ["leagues-reward-vignette-component"],
                layout: n(97),
                imagePath: null,
                subheaderText: null,
                init: function() {
                    this._super(...arguments)
                },
                headerText: a.Ember.computed((function() {
                    return this.get("tra").get("LEAGUES_REWARD_VIGNETTE_HEADER")
                })),
                isAnimationEnabled: a.Ember.computed("isLowSpec", (function() {
                    return !this.get("isLowSpec")
                })),
                showChromaBackground: a.Ember.computed("notification.rewardEarnedType", (function() {
                    return this.get("notification.rewardEarnedType") === a.LeagueTierNames.getConstants().REWARD_TYPES.CHAMPION_SKIN_CHROMA
                })),
                showGoldBackgroundGlow: a.Ember.computed("notification.rewardEarnedType", (function() {
                    const e = this.get("notification.rewardEarnedType"),
                        t = a.LeagueTierNames.getConstants().REWARD_TYPES;
                    return e === t.SUMMONER_ICON || e === t.CHAMPION_TOKEN
                }))
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "LAanb+Da",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-reward-vignette-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-reward-vignette-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-reward-vignette-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["leagues-vignette-parallax-background ",["unknown",["vignetteSize"]]]]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-parallax-background",[]],["dynamic-attr","animated",["concat",[["unknown",["isAnimationEnabled"]]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","leagues-reward-vignette-header"],["flush-element"],["text","\\n  "],["append",["unknown",["headerText"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","leagues-reward-vignette-subheader"],["flush-element"],["text","\\n  "],["append",["helper",["sanitize"],[["get",["notification","subheaderText"]]],null],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["leagues-reward-vignette-container ",["helper",["if"],[["get",["showChromaBackground"]],"chromabackground"],null]," ",["helper",["if"],[["get",["showGoldBackgroundGlow"]],"glow"],null]]]],["flush-element"],["text","\\n  "],["open-element","img",[]],["static-attr","class","leagues-reward-vignette-image"],["dynamic-attr","src",["concat",[["unknown",["notification","imagePath"]]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a, s = n(1),
                i = n(23),
                o = (a = n(92)) && a.__esModule ? a : {
                    default: a
                };
            n(99);
            const l = {
                GRAY: "01-Gray",
                GREEN: "02-GrayToGreen",
                BLUE: "03-GreenToBlue",
                PURPLE: "04-BlueToPurple",
                ORANGE: "05-PurpleToOrange"
            };
            e.exports = s.Ember.Component.extend(o.default, {
                classNames: ["rated-promotion-vignette-component"],
                layout: n(100),
                animationStarted: !1,
                didUpdateAttrs: function() {
                    if (this._super(...arguments), this.get("isShowing") && !this.get("animationStarted")) {
                        const e = this.createSound(this.get("audioPath"));
                        this.set("animationStarted", !0), e && e.play()
                    }
                },
                ratedTier: s.Ember.computed.readOnly("notification.ratedTier"),
                tierText: s.Ember.computed("ratedTier", "notification.queueType", (function() {
                    const e = this.get("ratedTier"),
                        t = this.get("notification.queueType");
                    return this.get(`tra.${t}_tier_label_${e}`)
                })),
                audioPath: s.Ember.computed("ratedTier", (function() {
                    return "GRAY" === this.get("ratedTier") ? `${i.ASSET_PATH}sounds/tft-rated/sfx-celebrate-tft-rated-grayrating.ogg` : `${i.ASSET_PATH}sounds/tft-rated/sfx-celebrate-tft-rated-promote.ogg`
                })),
                lottiePath: s.Ember.computed("ratedTier", "notification.queueType", (function() {
                    const e = l[this.get("ratedTier")],
                        t = this.get("notification.queueType");
                    return `${i.ASSET_PATH}lottie/tft-rated/${e}-${t}.json`
                })),
                lottieImagePath: i.ASSET_PATH + "lottie/tft-rated/images/"
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "AtI7Jaal",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rated-promotion-vignette-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rated-promotion-vignette-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rated-promotion-vignette-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rated-promotion-vignette-header"],["flush-element"],["text","\\n  "],["append",["unknown",["tra","rated_promotion_vignette_header"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","rated-vignette-lottie-frame"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rated-vignette-lottie-container"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-lottie",[]],["dynamic-attr","src",["concat",[["unknown",["lottiePath"]]]]],["dynamic-attr","image-path",["concat",[["unknown",["lottieImagePath"]]]]],["dynamic-attr","text-tierlabel",["concat",[["unknown",["tierText"]]]]],["static-attr","autoplay","true"],["flush-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a, s = n(1),
                i = (a = n(92)) && a.__esModule ? a : {
                    default: a
                };
            n(102);
            const o = {
                    GRAY: void 0,
                    GREEN: n(103),
                    BLUE: n(104),
                    PURPLE: n(105),
                    ORANGE: n(106)
                },
                l = {
                    GRAY: void 0,
                    GREEN: n(107),
                    BLUE: n(108),
                    PURPLE: n(109),
                    ORANGE: n(110)
                };
            e.exports = s.Ember.Component.extend(i.default, {
                classNames: ["cherry-rated-promotion-vignette-component"],
                layout: n(111),
                videoStarted: !1,
                backgroundSrc: n(112),
                didInsertElement() {
                    this._super(...arguments);
                    this.element.querySelector("uikit-video").addStateChangedHandler(this.playAudioOnVideoPlay.bind(this), "Playing")
                },
                playAudioOnVideoPlay: function() {
                    if (!this.get("videoStarted")) {
                        const e = this.createSound(this.get("audioPath"));
                        this.set("videoStarted", !0), e && setTimeout((() => e.play()), 500)
                    }
                },
                cherryRatingVideoSrc: s.Ember.computed("ratedTier", "notification.queueType", (function() {
                    return o[this.get("ratedTier")]
                })),
                ratedTier: s.Ember.computed.readOnly("notification.ratedTier"),
                tierText: s.Ember.computed("ratedTier", (function() {
                    const e = {
                        GREEN: "tra.CHERRY_tier_label_GREEN",
                        BLUE: "tra.CHERRY_tier_label_BLUE",
                        PURPLE: "tra.CHERRY_tier_label_PURPLE",
                        ORANGE: "tra.CHERRY_tier_label_ORANGE"
                    } [this.get("ratedTier")];
                    return e ? this.get(e) : ""
                })),
                audioPath: s.Ember.computed("ratedTier", (function() {
                    return l[this.get("ratedTier")]
                }))
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            e.exports = n.p + "bronze_celebration.webm"
        }, (e, t, n) => {
            "use strict";
            e.exports = n.p + "silver_celebration.webm"
        }, (e, t, n) => {
            "use strict";
            e.exports = n.p + "gold_celebration.webm"
        }, (e, t, n) => {
            "use strict";
            e.exports = n.p + "gladiator_celebration.webm"
        }, (e, t, n) => {
            "use strict";
            e.exports = n.p + "sfx-promotion-arena-bronze.ogg"
        }, (e, t, n) => {
            "use strict";
            e.exports = n.p + "sfx-promotion-arena-silver.ogg"
        }, (e, t, n) => {
            "use strict";
            e.exports = n.p + "sfx-promotion-arena-gold.ogg"
        }, (e, t, n) => {
            "use strict";
            e.exports = n.p + "sfx-promotion-arena-gladiator.ogg"
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "UTmNo7/5",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\cherry-rated-promotion-vignette-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\cherry-rated-promotion-vignette-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\cherry-rated-promotion-vignette-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cherry-rated-promotion-vignette-header"],["flush-element"],["text","\\n  "],["append",["unknown",["tra","rated_promotion_vignette_header"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","cherry-promotion-vignette-body"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cherry-promotion-vignette-video-container"],["flush-element"],["text","\\n        "],["open-element","uikit-video",[]],["static-attr","preload",""],["dynamic-attr","src",["unknown",["cherryRatingVideoSrc"]],null],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","cherry-promotion-vignette-background"],["dynamic-attr","src",["concat",[["unknown",["backgroundSrc"]]]]],["static-attr","alt",""],["static-attr","role","presentation"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","cherry-rated-promotion-tier-text"],["flush-element"],["text","\\n    "],["append",["unknown",["tierText"]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            e.exports = n.p + "cherry-promotion-vignette-background.png"
        }, (e, t, n) => {
            "use strict";
            var a = n(1);
            const s = (0, a.emberDataBinding)({
                Ember: a.Ember,
                websocket: (0, a.getProvider)().getSocket(),
                basePaths: {
                    login: "/lol-login",
                    platform: "/lol-platform-config",
                    settings: "/lol-settings",
                    ranked: "/lol-ranked",
                    summoner: "/lol-summoner",
                    riotclient: "/riotclient"
                },
                boundProperties: {
                    session: {
                        api: "login",
                        path: "/v1/session",
                        default: {}
                    },
                    accountLeaguesSettings: {
                        api: "settings",
                        path: "/v2/account/LCUPreferences/lol-leagues",
                        default: {}
                    },
                    settingsReady: {
                        api: "settings",
                        path: "/v2/ready",
                        default: !1
                    },
                    splitsConfig: {
                        api: "ranked",
                        path: "/v1/splits-config",
                        default: {}
                    },
                    currentRankedStats: {
                        api: "ranked",
                        path: "/v1/current-ranked-stats",
                        default: {}
                    },
                    regionLocale: {
                        api: "riotclient",
                        path: "/region-locale",
                        default: {}
                    },
                    currentSummoner: {
                        api: "summoner",
                        path: "/v1/current-summoner",
                        default: {}
                    },
                    currentSeason: {
                        api: "platform",
                        path: "/v1/namespaces/ClientSystemStates/currentSeason",
                        default: -1
                    }
                }
            });
            e.exports = a.Ember.Component.extend(s, {
                classNames: ["notifications-root"],
                layout: n(114),
                isDependenciesInitialized: a.Ember.computed("session", "session.state", "accountLeaguesSettings", "settingsReady", "splitsConfig", "currentRankedStats", "regionLocale", "currentSummoner", "currentSeason", (function() {
                    const e = this.get("session"),
                        t = this.get("accountLeaguesSettings"),
                        n = this.get("splitsConfig"),
                        a = this.get("settingsReady"),
                        s = this.get("currentRankedStats"),
                        i = this.get("regionLocale"),
                        o = this.get("currentSummoner"),
                        l = this.get("currentSeason");
                    this.get("isPreseason");
                    return !this._isLoginSessionInvalid(e) && this._isNamedSummoner(o) && l && n && a && t && s && i
                })),
                _isLoginSessionInvalid: e => !e || "SUCCEEDED" !== e.state,
                _isNamedSummoner: e => e && !e.unnamed && !e.nameChangeFlag
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "+h8WoPQa",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\notifications-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\notifications-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["isDependenciesInitialized"]]],null,0],["text","\\n"],["append",["unknown",["leagues-dialogs"]],false],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["split-notifications"],null,[["accountLeaguesSettings","currentSummoner","splitsConfig","currentRankedStats","currentSeason","regionLocale"],[["get",["accountLeaguesSettings"]],["get",["currentSummoner"]],["get",["splitsConfig"]],["get",["currentRankedStats"]],["get",["currentSeason"]],["get",["regionLocale"]]]]],false],["text","\\n  "],["append",["helper",["split-start-modal"],null,[["accountLeaguesSettings","currentSummoner","splitsConfig","currentRankedStats","currentSeason","regionLocale"],[["get",["accountLeaguesSettings"]],["get",["currentSummoner"]],["get",["splitsConfig"]],["get",["currentRankedStats"]],["get",["currentSeason"]],["get",["regionLocale"]]]]],false],["text","\\n  "],["append",["helper",["eos-notifications"],null,[["regionLocale","splitsConfig"],[["get",["regionLocale"]],["get",["splitsConfig"]]]]],false],["text","\\n  "],["append",["helper",["season-memorial-modal"],null,[["accountLeaguesSettings","currentSummoner","splitsConfig","currentRankedStats","currentSeason","isPreseason","currentSplitId","regionLocale"],[["get",["accountLeaguesSettings"]],["get",["currentSummoner"]],["get",["splitsConfig"]],["get",["currentRankedStats"]],13,true,1,["get",["regionLocale"]]]]],false],["text","\\n  "],["append",["helper",["season-start-modal"],null,[["currentSeason"],[["get",["currentSeason"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a, s = n(1),
                i = (a = n(116)) && a.__esModule ? a : {
                    default: a
                },
                o = n(23);
            n(117);
            const l = (0, s.emberDataBinding)({
                    Ember: s.Ember,
                    websocket: (0, s.getProvider)().getSocket(),
                    basePaths: {
                        platform: "/lol-platform-config",
                        settings: "/lol-settings"
                    },
                    boundProperties: {
                        seasonModalEnabled: {
                            api: "platform",
                            path: "/v1/namespaces/LeagueConfig/SeasonModalEnabled",
                            default: null
                        },
                        accountLeaguesSettings: {
                            api: "settings",
                            path: "/v2/account/LCUPreferences/lol-leagues"
                        }
                    }
                }),
                r = "season-start-takeover";
            e.exports = s.Ember.Component.extend(l, {
                currentSeason: null,
                platformConfigObserver: s.Ember.observer("currentSeason", "accountLeaguesSettings", "seasonModalEnabled", (function() {
                    const e = this.get("accountLeaguesSettings"),
                        t = this.get("currentSeason");
                    this.get("seasonModalEnabled") && void 0 !== e && this._displayTakeovers(t, e)
                })),
                _displayTakeovers(e, t) {
                    const n = r,
                        a = t && t.data ? t.data[n] : null;
                    a && e <= a.season || this._showSeasonStartToast(e)
                },
                _showSeasonStartToast(e) {
                    const t = {
                        titleKey: "ranked_notification_season_start_title",
                        detailKey: "ranked_notification_season_start_detail",
                        iconUrl: "/fe/lol-static-assets/images/ranked-emblem.png",
                        data: {
                            seasonYear: (o.SEASON_YEAR_BASE + e).toString()
                        }
                    };
                    (0, s.dataBinding)("/player-notifications").post("/v1/notifications", t), i.default.saveAccountSetting(r, {
                        season: e
                    })
                }
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            var s = {
                saveLocalSetting: (e, t) => {
                    const n = {
                        [e]: t
                    };
                    return (0, a.dataBinding)("/lol-settings").patch("/v1/local/lol-leagues", {
                        data: n,
                        schemaVersion: 1
                    })
                },
                saveAccountSetting: (e, t) => {
                    const n = {
                        [e]: t
                    };
                    return (0, a.dataBinding)("/lol-settings").patch("/v2/account/LCUPreferences/lol-leagues", {
                        data: n,
                        schemaVersion: 1
                    })
                }
            };
            t.default = s
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            var a, s = n(1),
                i = n(23),
                o = n(50),
                l = (a = n(116)) && a.__esModule ? a : {
                    default: a
                };
            n(119);
            const r = n(120),
                c = (0, s.emberDataBinding)({
                    Ember: s.Ember,
                    websocket: (0, s.getProvider)().getSocket(),
                    basePaths: {
                        careerStats: "/lol-career-stats",
                        gameData: "/lol-game-data",
                        collections: "/lol-collections",
                        platform: "/lol-platform-config"
                    },
                    boundProperties: {
                        isSplitStartModalEnabled: {
                            api: "platform",
                            path: "/v1/namespaces/LeagueConfig/IsSplitStartModalEnabled",
                            default: null
                        }
                    }
                }),
                u = "ranked",
                d = "split_end",
                p = "ranked_notification_splits_split_end_title",
                m = "ranked_notification_splits_split_end_detail",
                g = "last-split-end-notification";
            e.exports = s.Ember.Component.extend(c, {
                classNames: ["split-notifications"],
                accountLeaguesSettings: null,
                currentSummoner: {},
                splitsConfig: {},
                currentRankedStats: {},
                currentSeason: null,
                regionLocale: {},
                isModalCreated: !1,
                isPlayerNotificationsInitialized: !1,
                hasSplitEndNotificationSentThisSession: !1,
                hasSplitStartModalShownThisSession: !1,
                rewardsService: s.Ember.inject.service("rewards"),
                careerStatsService: s.Ember.inject.service("careerStats"),
                careerStatsAPI: s.CareerStatsAPI,
                init: function() {
                    this._super(...arguments);
                    this.get("isPlayerNotificationsInitialized") || this._initPlayerNotifications()
                },
                currentSplit: s.Ember.computed("splitsConfig", "splitsConfig.currentSplitId", (function() {
                    return this._getCurrentSplitData(this.get("splitsConfig"))
                })),
                platformConfigObserver: s.Ember.observer("splitsConfig", "splitsConfig.currentSplitId", "currentRankedStats", "currentRankedStats.queues", "rewardsService", "rewardsService.emoteCatalog", "rewardsService.summonerIconCatalog", "isSplitStartModalEnabled", "careerStatsService", (function() {
                    const e = this.get("accountLeaguesSettings"),
                        t = this.get("currentSeason"),
                        n = this.get("regionLocale"),
                        a = this.get("hasSplitEndNotificationSentThisSession"),
                        s = this.get("currentSplit");
                    if (!s) return;
                    const i = parseFloat(t + "." + s.splitId),
                        l = (0, o.getDaysBetweenDateMillis)(Date.now(), s.endTimeMillis);
                    this._shouldDisplaySplitEndNotification(i, l, e, a) && this._displaySplitEndNotification(i, s, n)
                })),
                _shouldDisplaySplitEndNotification: function(e, t, n, a) {
                    const s = n.data && n.data[g] >= e;
                    return !a && !s && !(t <= 0) && t <= 14
                },
                _displaySplitEndNotification: function(e, t, n) {
                    const a = {
                        source: u,
                        type: d,
                        titleKey: p,
                        detailKey: m,
                        iconUrl: "/fe/lol-static-assets/images/ranked-emblem.png",
                        data: {
                            splitId: String(t.splitId),
                            endDate: (0, o.convertDateMillisToString)(t.endTimeMillis - 1, n, {
                                month: "long",
                                day: "numeric"
                            })
                        }
                    };
                    (0, s.dataBinding)("player-notifications").post("/v1/notifications", a), l.default.saveAccountSetting(g, e), this.set("hasSplitEndNotificationSentThisSession", !0)
                },
                _renderSplitEndNotification: function(e) {
                    const t = document.createElement("div"),
                        n = this.get("regionLocale"),
                        a = isNaN(e.data.endDate) ? e.data.endDate : (0, o.convertDateMillisToString)(e.data.endDate - 1, n, {
                            month: "long",
                            day: "numeric"
                        }),
                        s = r({
                            title: this.get("tra").formatString(p, {
                                splitId: e.data.splitId,
                                endDate: a
                            }),
                            detail: this.get("tra").formatString(m, {
                                endDate: a
                            })
                        });
                    return t.innerHTML = s, t.classList.add("split-end-notification"), t
                },
                _initPlayerNotifications() {
                    s.Social.playerNotifications().registerToastRenderer(u, d, this._renderSplitEndNotification.bind(this)), s.Social.playerNotifications().on(u, d, "click", this._navigateToProfileSubsection.bind(this, i.PROFILE_RANKED_SUBSECTION_ID)), this.set("isPlayerNotificationsInitialized", !0)
                },
                _getCurrentSplitData: function(e) {
                    if (!e || !e.currentSplitId) return null;
                    const t = e.currentSplitId,
                        n = s.Lodash.find(e.splits, (e => e.splitId === t));
                    return n || null
                },
                _navigateToProfileSubsection: function(e) {
                    return s.ProfilesAPI.setActive(!0), s.ProfilesAPI.mainSection().show(e), !0
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            var a = n(55);
            e.exports = (a.default || a).template({
                compiler: [7, ">= 4.0.0"],
                main: function(e, t, n, a, s) {
                    var i, o = null != t ? t : e.nullContext || {},
                        l = n.helperMissing,
                        r = "function",
                        c = e.escapeExpression;
                    return '<div class="title">' + c(typeof(i = null != (i = n.title || (null != t ? t.title : t)) ? i : l) === r ? i.call(o, {
                        name: "title",
                        hash: {},
                        data: s
                    }) : i) + '</div>\r\n<div class="detail">' + c(typeof(i = null != (i = n.detail || (null != t ? t.detail : t)) ? i : l) === r ? i.call(o, {
                        name: "detail",
                        hash: {},
                        data: s
                    }) : i) + "</div>"
                },
                useData: !0
            })
        }, (e, t, n) => {
            "use strict";
            var a, s = n(1),
                i = n(5),
                o = n(23),
                l = n(50),
                r = (a = n(116)) && a.__esModule ? a : {
                    default: a
                },
                c = n(24);
            n(122);
            const u = n(123),
                d = (0, s.emberDataBinding)({
                    Ember: s.Ember,
                    websocket: (0, s.getProvider)().getSocket(),
                    basePaths: {
                        careerStats: "/lol-career-stats",
                        gameData: "/lol-game-data",
                        collections: "/lol-collections",
                        platform: "/lol-platform-config"
                    },
                    boundProperties: {
                        isSplitStartModalEnabled: {
                            api: "platform",
                            path: "/v1/namespaces/LeagueConfig/IsSplitStartModalEnabled",
                            default: !1
                        },
                        allowSplitStartModalMockCareerStatsData: {
                            api: "platform",
                            path: "/v1/namespaces/LeagueConfig/AllowSplitStartModalMockCareerStatsData",
                            default: !1
                        }
                    }
                }),
                p = "last-split-start-modal",
                m = "ranked",
                g = "normals";
            e.exports = s.Ember.Component.extend(d, {
                classNames: ["split-start-modal"],
                accountLeaguesSettings: null,
                currentSummoner: {},
                splitsConfig: {},
                currentRankedStats: {},
                currentSeason: null,
                regionLocale: {},
                showModalWithNullCareerStatsData: !1,
                isModalCreated: !1,
                isPlayerNotificationsInitialized: !1,
                hasSplitEndNotificationSentThisSession: !1,
                hasSplitStartModalShownThisSession: !1,
                rewardsService: s.Ember.inject.service("rewards"),
                careerStatsService: s.Ember.inject.service("careerStats"),
                careerStatsAPI: s.CareerStatsAPI,
                init: function() {
                    this._super(...arguments)
                },
                currentSplit: s.Ember.computed("splitsConfig", "splitsConfig.currentSplitId", (function() {
                    return this._getCurrentSplitData(this.get("splitsConfig"))
                })),
                platformConfigObserver: s.Ember.observer("splitsConfig", "splitsConfig.currentSplitId", "currentRankedStats", "currentRankedStats.queues", "isSplitStartModalEnabled", "careerStatsService", (function() {
                    const e = this.get("accountLeaguesSettings"),
                        t = this.get("currentSeason"),
                        n = this.get("currentRankedStats"),
                        a = this.get("regionLocale"),
                        s = this.get("currentSummoner"),
                        i = this.get("careerStatsService"),
                        o = this.get("hasSplitStartModalShownThisSession"),
                        r = this.get("isSplitStartModalEnabled"),
                        c = this.get("currentSplit");
                    if (!c) return;
                    const u = parseFloat(t + "." + c.splitId),
                        d = (0, l.getDaysBetweenDateMillis)(Date.now(), c.endTimeMillis),
                        p = this._getHighestRankedNonTFTEntryQueue(n);
                    this._shouldTryToDisplaySplitStartModal(u, d, e, p, s, i, r, o) && (this.set("hasSplitStartModalShownThisSession", !0), i.loadCurrentSeasonStatsGames(s.puuid).then((e => {
                        this._tryToDisplaySplitStartModal(u, c, n, p, a, i, t, e, s.puuid)
                    })))
                })),
                _shouldTryToDisplaySplitStartModal(e, t, n, a, s, i, o, l) {
                    const r = t <= 14,
                        c = n.data && n.data[p] >= e,
                        u = Boolean(a),
                        d = Boolean(s),
                        m = Boolean(i);
                    return o && !l && u && !r && !c && d && m
                },
                _tryToDisplaySplitStartModal: function(e, t, n, a, s, i, o, l, r) {
                    const c = this.get("allowSplitStartModalMockCareerStatsData");
                    if ((!l || !l.games || l.games.length < 10) && !c) return;
                    const u = this._getBestChampionStatsPanelData(l.games, n, a, i, o, r, c);
                    u && u.then((i => {
                        this._displaySplitStartModal(e, t, n, a, i, s)
                    }))
                },
                _displaySplitStartModal: function(e, t, n, a, i, l) {
                    const c = this._getSplitStartModalRewardsInfoPromise(t),
                        d = s.LeagueTierNames.getTiersForQueue(a.queueType);
                    return Promise.all([c, d]).then((c => {
                        const d = c[0],
                            m = c[1];
                        return s.ModalManager.add({
                            type: "DialogConfirm",
                            data: {
                                contents: this._renderSplitStartModal(u, t, d, n, a, i, l, m),
                                acceptText: this.get("tra.SPLIT_START_TAKEOVER_SEE_STATS_BUTTON_TEXT"),
                                declineText: this.get("tra.SPLIT_START_TAKEOVER_CLOSE_BUTTON_TEXT"),
                                closeButton: !0,
                                acceptHandler: this._navigateToProfileSubsection.bind(this, o.PROFILE_STATS_SUBSECTION_ID)
                            }
                        }), r.default.saveAccountSetting(p, e)
                    }))
                },
                _renderSplitStartModal: function(e, t, n, a, s, i, o, l) {
                    const r = {
                        titlesInfo: this._getSplitStartModalTitlesInfo(t, o),
                        rewardsInfo: n,
                        rankInfo: this._getSplitStartModalRankInfo(a, s, l),
                        statsInfo: this._getSplitStartModalStatsInfo(i, o)
                    };
                    return this._renderModal(e, r)
                },
                _getSplitStartModalTitlesInfo: function(e, t) {
                    return {
                        seasonTitle: this.get("tra").formatString("SPLIT_START_TAKEOVER_SEASON_TITLE", {
                            seasonYear: (0, l.convertDateMillisToString)(e.endTimeMillis, t, {
                                year: "numeric"
                            })
                        }),
                        splitTitle: this.get("tra").formatString("SPLIT_START_TAKEOVER_SPLIT_TITLE", {
                            split: e.splitId
                        }),
                        splitDurationTitle: this.get("tra").formatString("SPLIT_START_TAKEOVER_SPLIT_DURATION_TITLE", {
                            splitStartString: (0, l.convertDateMillisToString)(e.startTimeMillis, t),
                            splitEndString: (0, l.convertDateMillisToString)(e.endTimeMillis - 1, t)
                        }),
                        rewardsTitle: this.get("tra.SPLIT_START_TAKEOVER_REWARDS_TITLE")
                    }
                },
                _getSplitStartModalRewardsInfoPromise: function(e) {
                    const t = [],
                        n = e.rewardTrack,
                        a = {},
                        i = s.LeagueTierNames.getConstants().REWARD_TYPES,
                        o = [];
                    return s.Lodash.forEach(n, (e => {
                        s.Lodash.forEach(e.rewards, (e => {
                            const n = e.rewardType;
                            if (!a[e.id]) {
                                const l = this.get(`tra.REWARD_TYPE_${n}_DESCRIPTION`),
                                    r = `reward-image-${n.toLowerCase()}`,
                                    c = {
                                        description: this.get("tra").formatString("SPLIT_START_TAKEOVER_REWARD_DESCRIPTION", {
                                            rewardTypeDescription: l
                                        }),
                                        cssClass: r
                                    };
                                n === i.EMOTE || n === i.CHAMPION_TOKEN || n === i.SUMMONER_ICON ? (t.unshift(c), o.unshift(s.LeagueTierNames.asyncGetRewardImage(e.id))) : (t.push(c), o.push(s.LeagueTierNames.asyncGetRewardImage(e.id))), a[e.id] = !0
                            }
                        }))
                    })), Promise.all(o).then((e => {
                        for (let n = 0; n < t.length; n++) t[n].imagePath = e[n];
                        return t
                    }))
                },
                _getSplitStartModalRankInfo: function(e, t, n) {
                    const a = t.tier,
                        i = t.division,
                        o = s.LeagueTierNames.getUpOneDivision(a, i, n),
                        l = o ? o.tier : null,
                        r = o ? o.division : null;
                    return {
                        currentRankTitle: this.get("tra.SPLIT_START_TAKEOVER_CURRENT_RANK_TEXT"),
                        currentRankTier: a,
                        currentRankDivision: i,
                        currentRankText: s.LeagueTierNames.getFullTierDivisionName(a, i),
                        nextRankTitle: this.get("tra").formatString("SPLIT_START_TAKEOVER_NEXT_RANK_TEXT", {
                            nextRank: s.LeagueTierNames.getFullTierDivisionName(l, r)
                        }),
                        nextRankTier: l,
                        nextRankDivision: r,
                        queueTypeText: this.get("tra").formatString("SPLIT_START_TAKEOVER_QUEUE_TYPE_TEXT", {
                            queueType: s.LeagueTierNames.getRankedQueueName(t.queueType)
                        }),
                        rankedRegaliaLevel: e.rankedRegaliaLevel,
                        isInPlacements: t.isProvisional,
                        placementsProgressText: this.get("tra").formatString("SPLIT_START_TAKEOVER_PLACEMENTS_PROGRESS_TEXT", {
                            placementGamesThreshold: t.provisionalGameThreshold,
                            placementGamesDone: t.provisionalGameThreshold - t.provisionalGamesRemaining
                        }),
                        placementsText: this.get("tra.SPLIT_START_TAKEOVER_PLACEMENTS_TEXT"),
                        lpProgressText: this.get("tra").formatString("SPLIT_START_TAKEOVER_LP_PROGRESS_TEXT", {
                            lpToGo: s.LeaguesConsts.LP_PER_DIVISION - t.leaguePoints
                        }),
                        isInApex: s.LeagueTierNames.isApexForQueue(t),
                        lpText: this.get("tra").formatString("SPLIT_START_TAKEOVER_LP_TEXT", {
                            lp: t.leaguePoints
                        }),
                        isInMiniSeries: Boolean(t.miniSeriesProgress),
                        miniSeriesProgressText: this.get("tra").formatString("SPLIT_START_TAKEOVER_MINI_SERIES_PROGRESS_TEXT", {
                            miniSeriesWinsNeeded: this._getMiniSeriesWinsNeeded(t.miniSeriesProgress)
                        }),
                        miniSeriesText: this.get("tra.SPLIT_START_TAKEOVER_MINI_SERIES_TEXT")
                    }
                },
                _getSplitStartModalStatsInfo: function(e, t) {
                    let n;
                    const a = this.get("showModalWithNullCareerStatsData");
                    if (null == e && a) return null;
                    if (e.dataType === m || e.dataType === g) {
                        const t = this.get("careerStatsService.careerStatsTra");
                        n = {
                            statsTitle: this.get("tra").formatString("SPLIT_START_TAKEOVER_STATS_TITLE", {
                                statsTitleAddition: e.dataType === m ? this.get("tra.SPLIT_START_TAKEOVER_STATS_RANKED_TITLE_ADDITION") : this.get("tra.SPLIT_START_TAKEOVER_STATS_NORMALS_TITLE_ADDITION")
                            }),
                            statsFooter: e.dataType === m ? this.get("tra.SPLIT_START_TAKEOVER_STATS_RANKED_FOOTER") : this.get("tra.SPLIT_START_TAKEOVER_STATS_NONRANKED_FOOTER"),
                            statsData: [e.championGrades.combat, e.championGrades.income, e.championGrades.macro],
                            statsText: [t.get("career_stats_play_style_category_combat"), t.get("career_stats_play_style_category_income"), t.get("career_stats_play_style_category_macro")],
                            statContainerCSSClass: "stat-container-grades"
                        }
                    } else n = {
                        statsTitle: this.get("tra.SPLIT_START_TAKEOVER_STATS_CHAMP_MASTERY_TITLE"),
                        statsFooter: this.get("tra.SPLIT_START_TAKEOVER_STATS_NONRANKED_FOOTER"),
                        statsData: [e.championMastery.championLevel, this._formatNumber(e.championMastery.championPoints, t), e.championMastery.highestGrade ? e.championMastery.highestGrade : this.get("tra.SPLIT_START_TAKEOVER_STATS_CHAMP_MASTERY_NO_GRADE_DATA")],
                        statsText: [this.get("tra.SPLIT_START_TAKEOVER_STATS_CHAMP_MASTERY_LEVEL_TEXT"), this.get("tra.SPLIT_START_TAKEOVER_STATS_CHAMP_MASTERY_POINTS_TEXT"), this.get("tra.SPLIT_START_TAKEOVER_STATS_CHAMP_MASTERY_GRADE_TEXT")],
                        statContainerCSSClass: "stat-container-mastery"
                    };
                    return n.championName = e.championGameAssets.name, n.championImagePath = e.championGameAssets.skins[0].uncenteredSplashPath, n
                },
                _getBestChampionStatsPanelData(e, t, n, a, s, i, o) {
                    if ((!e || e && e.length < 10) && o) return this._getChampionGameAssets(200).then((e => ({
                        dataType: m,
                        championGrades: {
                            combat: "F",
                            income: "F",
                            macro: "F"
                        },
                        championGameAssets: e
                    })));
                    let l = this._getBestChampionInfoForRanked(e, t, n),
                        r = m;
                    return l || (l = this._getBestChampionInfoForNormals(e), r = g), l ? this._getStatsPanelDataForChampion(l, a, s, r) : this._getStatsPanelDataForChampionMastery(i)
                },
                _getBestChampionInfoForRanked(e, t, n) {
                    const a = n.queueType;
                    let i = this._getBestChampionInfoForQueue(e, a, n.tier);
                    return i || s.Lodash.forEach(t.queues, (t => {
                        const n = t.queueType;
                        if (n !== a && this._isRankedQueueValid(t) && this._isRankedQueueSR(t)) {
                            const a = this._getBestChampionInfoForQueue(e, n, t.tier);
                            a && (!i || a.winrate > i.winrate || a.winrate === i.winrate && a.games.length > i.games.length) && (i = a)
                        }
                    })), i
                },
                _getBestChampionInfoForNormals(e) {
                    let t = null;
                    return s.Lodash.forEach(this.careerStatsAPI.getNormalGamesQueueTypes(), (n => {
                        const a = this._getBestChampionInfoForQueue(e, n, this.careerStatsAPI.getAllRanks());
                        a && (!t || a.winrate > t.winrate || a.winrate === t.winrate && a.games.length > t.games.length) && (t = a)
                    })), t
                },
                _getBestChampionInfoForQueue(e, t, n) {
                    const a = this._makeFilterParams(t),
                        s = this.careerStatsAPI.filterGames(e, a);
                    return this._getBestChampionInfoForFilteredQueueGames(s, t, n)
                },
                _getBestChampionInfoForFilteredQueueGames(e, t, n) {
                    const a = {};
                    s.Lodash.forEach(e, (e => {
                        const t = this.careerStatsAPI.inferPosition(e);
                        a[e.championId] && a[e.championId][t] ? a[e.championId][t].push(e) : a[e.championId] && !a[e.championId][t] ? a[e.championId][t] = [e] : a[e.championId] = {
                            [t]: [e]
                        }
                    }));
                    let i = null;
                    for (const [e, o] of s.Lodash.entries(a))
                        for (const [a, l] of s.Lodash.entries(o)) {
                            const s = l.length,
                                o = this.careerStatsAPI.getWinrate(l);
                            s >= this.careerStatsAPI.getMinGamesToUnlockStats() && (!i || i.winrate <= o) && (i = {
                                championId: parseInt(e),
                                position: a,
                                winrate: o,
                                queueType: t,
                                rankTier: n,
                                games: l
                            })
                        }
                    return i
                },
                _getStatsPanelDataForChampion(e, t, n, a) {
                    const s = this.careerStatsAPI.getCareerStatsQueueType(e.queueType);
                    return t.getChampionStatPercentiles(e.championId, [{
                        position: e.position,
                        rankTier: e.rankTier,
                        queueType: s,
                        season: n
                    }]).then((t => this._getChampionGameAssets(e.championId).then((n => ({
                        championGameAssets: n,
                        championGrades: this.careerStatsAPI.getGradesForChampion(e.games, e.position, s, t),
                        dataType: a
                    })))))
                },
                _getStatsPanelDataForChampionMastery(e) {
                    return this._getBestChampionMastery(e).then((e => this._getChampionGameAssets(e.championId).then((t => ({
                        championGameAssets: t,
                        championMastery: e,
                        dataType: "championMastery"
                    })))))
                },
                _makeFilterParams(e) {
                    return {
                        queueFilter: {
                            queueTypes: [this.careerStatsAPI.getCareerStatsQueueType(e)]
                        }
                    }
                },
                _getBestChampionMastery: function(e) {
                    return this.get("api.collections").get(`/v1/inventories/${e}/champion-mastery/top?limit=1`).then((e => e.masteries[0]))
                },
                _getChampionGameAssets: function(e) {
                    return this.get("api.gameData").get("/assets/v1/champions/" + e + ".json")
                },
                _getHighestRankedNonTFTEntryQueue: function(e) {
                    if (e && e.queues) {
                        const t = s.Lodash.find(e.queues, (e => this._isRankedQueueValid(e) && !this._isRankedQueueTFT(e)));
                        if (t) return t
                    }
                    return null
                },
                _isRankedQueueSR: function(e) {
                    return Boolean(e) && Boolean(e.queueType) && i.QUEUES.RANKED_SR_QUEUE_TYPES.includes(e.queueType)
                },
                _isRankedQueueTFT: function(e) {
                    return Boolean(e) && Boolean(e.queueType) && (0, c.isTftQueueType)(e.queueType)
                },
                _isRankedQueueValid: function(e) {
                    return Boolean(e) && Boolean(e.queueType) && Boolean(e.tier) && e.tier !== s.LeaguesConsts.TIER_NAME_NONE
                },
                _getCurrentSplitData: function(e) {
                    if (!e || !e.currentSplitId) return null;
                    const t = e.currentSplitId,
                        n = s.Lodash.find(e.splits, (e => e.splitId === t));
                    return n || null
                },
                _getMiniSeriesWinsNeeded: function(e) {
                    if (e) {
                        let t = 0;
                        return s.Lodash.forEach(e, (e => {
                            "W" === e && t++
                        })), Math.ceil(e.length / 2) - t
                    }
                    return 0
                },
                _navigateToProfileSubsection: function(e) {
                    return s.ProfilesAPI.setActive(!0), s.ProfilesAPI.mainSection().show(e), !0
                },
                _formatNumber: function(e, t) {
                    const n = (t.locale || "en_US").replace("_", "-");
                    return e.toLocaleString(n)
                },
                _renderModal(e, t) {
                    const n = e(t),
                        a = document.createElement("div");
                    a.innerHTML = n;
                    const s = a.querySelector(".rewards-container"),
                        i = a.querySelector("#rewards-scroll-container");
                    return s.addEventListener("wheel", (e => {
                        Math.abs(e.deltaX) < 100 && (e.deltaY > 0 ? i.scrollLeft += 80 : e.deltaY < 0 && (i.scrollLeft -= 80))
                    })), a
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            var a = n(55);
            e.exports = (a.default || a).template({
                1: function(e, t, n, a, s, i) {
                    var o, l = e.lambda,
                        r = e.escapeExpression;
                    return '            <div class="reward-column">\r\n                <img src="' + r(l(null != (o = i[0][0]) ? o.imagePath : o, t)) + '" class="reward-image ' + r(l(null != (o = i[0][0]) ? o.cssClass : o, t)) + '">\r\n                <div class="reward-description">' + r(l(null != (o = i[0][0]) ? o.description : o, t)) + "</div>\r\n            </div>\r\n"
                },
                3: function(e, t, n, a, s) {
                    var i, o = e.lambda,
                        l = e.escapeExpression;
                    return '                <div class="champion-background-image-container">\r\n                    <div class="champion-image-container">\r\n                        <img src=' + l(o(null != (i = null != t ? t.statsInfo : t) ? i.championImagePath : i, t)) + ' class="champion-image">\r\n                    </div>\r\n                    <div class="champion-overlay"></div>\r\n                </div>\r\n                <div class="stats-content-container">\r\n                    <div class="stats-display">\r\n                        <div class="stats-title">' + l(o(null != (i = null != t ? t.statsInfo : t) ? i.statsTitle : i, t)) + '</div>\r\n                        <div class="stats-champion-name">' + l(o(null != (i = null != t ? t.statsInfo : t) ? i.championName : i, t)) + '</div>\r\n                        <div class="stats-divider"></div>\r\n                        <div class=' + l(o(null != (i = null != t ? t.statsInfo : t) ? i.statContainerCSSClass : i, t)) + '>\r\n                            <div class="stat-text">' + l(o(null != (i = null != (i = null != t ? t.statsInfo : t) ? i.statsText : i) ? i[0] : i, t)) + '</div>\r\n                            <div class="stat-data">' + l(o(null != (i = null != (i = null != t ? t.statsInfo : t) ? i.statsData : i) ? i[0] : i, t)) + '</div>\r\n                        </div>\r\n                        <div class="stats-divider"></div>\r\n                        <div class=' + l(o(null != (i = null != t ? t.statsInfo : t) ? i.statContainerCSSClass : i, t)) + '>\r\n                            <div class="stat-text">' + l(o(null != (i = null != (i = null != t ? t.statsInfo : t) ? i.statsText : i) ? i[1] : i, t)) + '</div>\r\n                            <div class="stat-data">' + l(o(null != (i = null != (i = null != t ? t.statsInfo : t) ? i.statsData : i) ? i[1] : i, t)) + '</div>\r\n                        </div>\r\n                        <div class="stats-divider"></div>\r\n                        <div class=' + l(o(null != (i = null != t ? t.statsInfo : t) ? i.statContainerCSSClass : i, t)) + '>\r\n                            <div class="stat-text">' + l(o(null != (i = null != (i = null != t ? t.statsInfo : t) ? i.statsText : i) ? i[2] : i, t)) + '</div>\r\n                            <div class="stat-data">' + l(o(null != (i = null != (i = null != t ? t.statsInfo : t) ? i.statsData : i) ? i[2] : i, t)) + '</div>\r\n                        </div>\r\n                        <div class="stats-divider"></div>\r\n                    </div>\r\n                    <div class="stats-footer">' + l(o(null != (i = null != t ? t.statsInfo : t) ? i.statsFooter : i, t)) + "</div>\r\n                </div>\r\n"
                },
                5: function(e, t, n, a, s) {
                    var i;
                    return '                        <lol-uikit-resizing-text-field class="current-rank-title" data-max-width="200">\r\n                            ' + e.escapeExpression(e.lambda(null != (i = null != t ? t.rankInfo : t) ? i.currentRankTitle : i, t)) + "\r\n"
                },
                7: function(e, t, n, a, s) {
                    var i;
                    return '                        <lol-uikit-resizing-text-field class="next-rank-title" data-max-width="200">\r\n                            ' + e.escapeExpression(e.lambda(null != (i = null != t ? t.rankInfo : t) ? i.nextRankTitle : i, t)) + "\r\n"
                },
                9: function(e, t, n, a, s) {
                    var i;
                    return '                    <div class="rank-text-wrapper">\r\n                        <lol-uikit-resizing-text-field class="current-rank-text" data-max-width="200">\r\n                            ' + e.escapeExpression(e.lambda(null != (i = null != t ? t.rankInfo : t) ? i.currentRankText : i, t)) + "\r\n                        </lol-uikit-resizing-text-field>\r\n                    </div>\r\n"
                },
                11: function(e, t, n, a, s) {
                    var i;
                    return "                ranked-tier=" + e.escapeExpression(e.lambda(null != (i = null != t ? t.rankInfo : t) ? i.currentRankTier : i, t)) + "\r\n"
                },
                13: function(e, t, n, a, s) {
                    var i;
                    return "                ranked-tier=" + e.escapeExpression(e.lambda(null != (i = null != t ? t.rankInfo : t) ? i.nextRankTier : i, t)) + "\r\n                "
                },
                15: function(e, t, n, a, s) {
                    var i, o = e.lambda,
                        l = e.escapeExpression;
                    return '                    <div class="rank-text-wrapper">\r\n                        <lol-uikit-resizing-text-field class="placements-progress-text" data-max-width="200">' + l(o(null != (i = null != t ? t.rankInfo : t) ? i.placementsProgressText : i, t)) + '</lol-uikit-resizing-text-field>\r\n                    </div>\r\n                    <div class="rank-text-wrapper">\r\n                        <lol-uikit-resizing-text-field class="placements-text" data-max-width="200">' + l(o(null != (i = null != t ? t.rankInfo : t) ? i.placementsText : i, t)) + "</lol-uikit-resizing-text-field>\r\n                    </div>\r\n"
                },
                17: function(e, t, n, a, s) {
                    var i;
                    return null != (i = n.if.call(null != t ? t : e.nullContext || {}, null != (i = null != t ? t.rankInfo : t) ? i.isInMiniSeries : i, {
                        name: "if",
                        hash: {},
                        fn: e.program(18, s, 0),
                        inverse: e.program(20, s, 0),
                        data: s
                    })) ? i : ""
                },
                18: function(e, t, n, a, s) {
                    var i, o = e.lambda,
                        l = e.escapeExpression;
                    return '                    <div class="rank-text-wrapper">\r\n                        <lol-uikit-resizing-text-field class="mini-series-progress-text" data-max-width="200">' + l(o(null != (i = null != t ? t.rankInfo : t) ? i.miniSeriesProgressText : i, t)) + '</lol-uikit-resizing-text-field>\r\n                    </div>\r\n                    <div class="rank-text-wrapper">\r\n                        <lol-uikit-resizing-text-field class="mini-series-text" data-max-width="200">' + l(o(null != (i = null != t ? t.rankInfo : t) ? i.miniSeriesText : i, t)) + "</lol-uikit-resizing-text-field>\r\n                    </div>\r\n"
                },
                20: function(e, t, n, a, s) {
                    var i;
                    return null != (i = n.if.call(null != t ? t : e.nullContext || {}, null != (i = null != t ? t.rankInfo : t) ? i.isInApex : i, {
                        name: "if",
                        hash: {},
                        fn: e.program(21, s, 0),
                        inverse: e.program(23, s, 0),
                        data: s
                    })) ? i : ""
                },
                21: function(e, t, n, a, s) {
                    var i;
                    return '                    <div class="rank-text-wrapper">\r\n                        <lol-uikit-resizing-text-field class="lp-text" data-max-width="200">' + e.escapeExpression(e.lambda(null != (i = null != t ? t.rankInfo : t) ? i.lpText : i, t)) + "</lol-uikit-resizing-text-field>\r\n                    </div>\r\n"
                },
                23: function(e, t, n, a, s) {
                    var i;
                    return '                    <div class="rank-text-wrapper">\r\n                        <lol-uikit-resizing-text-field class="lp-progress-text" data-max-width="200">' + e.escapeExpression(e.lambda(null != (i = null != t ? t.rankInfo : t) ? i.lpProgressText : i, t)) + "</lol-uikit-resizing-text-field>\r\n                    </div>\r\n                "
                },
                compiler: [7, ">= 4.0.0"],
                main: function(e, t, n, a, s, i) {
                    var o, l = null != t ? t : e.nullContext || {},
                        r = e.lambda,
                        c = e.escapeExpression;
                    return '<div class="split-start-modal">\r\n    <div class="rewards-container">\r\n        <lol-uikit-scrollable id="rewards-scroll-container">\r\n        <div class="reward-columns-container">\r\n' + (null != (o = n.each.call(l, null != t ? t.rewardsInfo : t, {
                        name: "each",
                        hash: {},
                        fn: e.program(1, s, 1, i),
                        inverse: e.noop,
                        data: s,
                        blockParams: i
                    })) ? o : "") + '        </div>\r\n        </lol-uikit-scrollable>\r\n    </div>\r\n    <div class="titles-container">\r\n        <div class="season-title">' + c(r(null != (o = null != t ? t.titlesInfo : t) ? o.seasonTitle : o, t)) + '</div>\r\n        <div class="split-title">' + c(r(null != (o = null != t ? t.titlesInfo : t) ? o.splitTitle : o, t)) + '</div>\r\n        <div class="split-duration-title">' + c(r(null != (o = null != t ? t.titlesInfo : t) ? o.splitDurationTitle : o, t)) + '</div>\r\n        <div class="rewards-title-container">\r\n            <div class="rewards-title-ornament"></div>\r\n            <div class="rewards-title">' + c(r(null != (o = null != t ? t.titlesInfo : t) ? o.rewardsTitle : o, t)) + '</div>\r\n            <div class="flipped rewards-title-ornament"></div>\r\n        </div>\r\n    </div>\r\n    <div class="stats-and-rank-panels-container">\r\n        <div class="stats-panel">\r\n' + (null != (o = n.if.call(l, null != t ? t.statsInfo : t, {
                        name: "if",
                        hash: {},
                        fn: e.program(3, s, 0, i),
                        inverse: e.noop,
                        data: s,
                        blockParams: i
                    })) ? o : "") + '        </div>\r\n        <div class="rank-panel">\r\n            <div class="rank-headers">\r\n                <div class="rank-text-wrapper">\r\n' + (null != (o = n.if.call(l, null != (o = null != t ? t.rankInfo : t) ? o.isInApex : o, {
                        name: "if",
                        hash: {},
                        fn: e.program(5, s, 0, i),
                        inverse: e.program(7, s, 0, i),
                        data: s,
                        blockParams: i
                    })) ? o : "") + "                    </lol-uikit-resizing-text-field>\r\n                </div>\r\n" + (null != (o = n.if.call(l, null != (o = null != t ? t.rankInfo : t) ? o.isInApex : o, {
                        name: "if",
                        hash: {},
                        fn: e.program(9, s, 0, i),
                        inverse: e.noop,
                        data: s,
                        blockParams: i
                    })) ? o : "") + '                <lol-uikit-resizing-text-field class="queue-type-text" data-max-width="200">' + c(r(null != (o = null != t ? t.rankInfo : t) ? o.queueTypeText : o, t)) + '</lol-uikit-resizing-text-field>\r\n            </div>\r\n            <div class="rank-crest-container">\r\n                <lol-regalia-emblem-element\r\n' + (null != (o = n.if.call(l, null != (o = null != t ? t.rankInfo : t) ? o.isInApex : o, {
                        name: "if",
                        hash: {},
                        fn: e.program(11, s, 0, i),
                        inverse: e.program(13, s, 0, i),
                        data: s,
                        blockParams: i
                    })) ? o : "") + '></lol-regalia-emblem-element>\r\n            </div>\r\n            <div class="rank-progress-footnote">\r\n' + (null != (o = n.if.call(l, null != (o = null != t ? t.rankInfo : t) ? o.isInPlacements : o, {
                        name: "if",
                        hash: {},
                        fn: e.program(15, s, 0, i),
                        inverse: e.program(17, s, 0, i),
                        data: s,
                        blockParams: i
                    })) ? o : "") + "            </div>\r\n        </div>\r\n    </div>\r\n</div>"
                },
                useData: !0,
                useBlockParams: !0
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1);
            n(125);
            var s = n(50),
                i = n(24),
                o = n(23);
            const l = n(126),
                r = "ranked-eos",
                c = 36e5;
            e.exports = a.Ember.Component.extend({
                classNames: ["eos-notifications"],
                regionLocale: {},
                splitsConfig: {},
                isPlayerNotificationsInitialized: !1,
                shownNotifications: [],
                init() {
                    this._super(...arguments), this._initPlayerNotifications(), this._initDataBindings()
                },
                currentSplit: a.Ember.computed("splitsConfig", "splitsConfig.currentSplitId", (function() {
                    return this.get("splitsConfig.currentSplitId")
                })),
                previousSplit: a.Ember.computed("splitsConfig.splits.@each.endTimeMillis", (function() {
                    const e = this.get("splitsConfig.splits");
                    if (!e) return null;
                    for (let t = e.length - 1; t >= 0; t--)
                        if (e[t].endTimeMillis < Date.now()) return e[t];
                    return null
                })),
                willDestroy() {
                    this._super(...arguments), this.rankedDataBinding.unobserve("/lol-ranked/v1/eos-notifications", this)
                },
                _initPlayerNotifications() {
                    a.Social.playerNotifications().registerToastRenderer(r, "eos", this._renderEosNotification.bind(this)), this.set("isPlayerNotificationsInitialized", !0)
                },
                _initDataBindings() {
                    this.rankedDataBinding = (0, a.dataBinding)("/lol-ranked", (0, a.getProvider)().getSocket()), this.rankedDataBinding.observe("/v1/eos-notifications", this._handleEoSNotifications.bind(this))
                },
                _handleEoSNotifications(e) {
                    e && e.length && e.forEach((e => {
                        this._displayEosNotification(e)
                    }))
                },
                _displayEosNotification(e) {
                    if (!e) return;
                    const t = e.notificationName,
                        n = this.get("shownNotifications") || [];
                    if (!t || n.includes(t)) return;
                    const l = this.get("regionLocale"),
                        u = e.notificationType,
                        d = e.queue || "DEFAULT",
                        p = e.tier || "DEFAULT",
                        m = e.division || "NA";
                    let g = "",
                        h = "",
                        f = null;
                    const _ = (0, i.isTftQueueType)(d) ? "TFT" : "SR";
                    switch (u) {
                        case o.EOS_NOTIFICATION_TYPES.FIRST_WARNING:
                        case o.EOS_NOTIFICATION_TYPES.SECOND_WARNING:
                            g = `ranked_eos_notification_last_day_warning_${_}_title`, h = `ranked_eos_notification_last_day_warning_${_}_description`;
                            break;
                        case o.EOS_NOTIFICATION_TYPES.SEASON_ENDED:
                            g = `ranked_eos_notification_ended_${_}_title`, h = e.tier && "DEFAULT" !== e.tier ? "ranked_eos_notification_ended_description" : "ranked_eos_notification_ended_tier_DEFAULT", (0, i.isTftQueueType)(d) || (f = this.get("previousSplit"));
                            break;
                        default:
                            return
                    }
                    let E = null,
                        S = null;
                    if (f ? (E = f.splitId, S = f.startTimeMillis) : (E = this.get("currentSplit"), S = e.seasonStartTime - c), !E && !(0, i.isTftQueueType)(d)) return;
                    const T = e.seasonEndTime - c,
                        v = {
                            source: r,
                            type: "eos",
                            titleKey: g,
                            detailKey: h,
                            iconUrl: "/fe/lol-static-assets/images/ranked-emblem.png",
                            data: {
                                date: (0, s.convertDateMillisToString)(T, l, {
                                    month: "long",
                                    day: "numeric"
                                }),
                                year: (0, s.convertDateMillisToString)(S, l, {
                                    year: "numeric"
                                }),
                                split: E ? E.toString() : "",
                                rank: a.LeagueTierNames.getFullTierDivisionName(p, m),
                                queue: a.LeagueTierNames.getRankedQueueName(d)
                            }
                        };
                    n.push(t), (0, a.dataBinding)("player-notifications").post("/v1/notifications", v), (0, a.dataBinding)("lol-ranked").post(`/v1/eos-notifications/${t}/acknowledge`, {})
                },
                _renderEosNotification(e) {
                    const t = document.createElement("div"),
                        n = e.queue || "DEFAULT";
                    let a = "";
                    return a = (0, i.isTftQueueType)(n) ? this.get("tra").formatString(e.titleKey, {
                        year: e.data.year
                    }) : this.get("tra").formatString(e.titleKey, {
                        year: e.data.year,
                        split: e.data.split
                    }), t.innerHTML = l({
                        title: a,
                        detail: this.get("tra").formatString(e.detailKey, {
                            date: e.data.date,
                            rank: e.data.rank,
                            queue: e.data.queue
                        })
                    }), t.classList.add("eos-notification"), t
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            var a = n(55);
            e.exports = (a.default || a).template({
                compiler: [7, ">= 4.0.0"],
                main: function(e, t, n, a, s) {
                    var i, o = null != t ? t : e.nullContext || {},
                        l = n.helperMissing,
                        r = "function",
                        c = e.escapeExpression;
                    return '<div class="title">' + c(typeof(i = null != (i = n.title || (null != t ? t.title : t)) ? i : l) === r ? i.call(o, {
                        name: "title",
                        hash: {},
                        data: s
                    }) : i) + '</div>\r\n<div class="detail">' + c(typeof(i = null != (i = n.detail || (null != t ? t.detail : t)) ? i : l) === r ? i.call(o, {
                        name: "detail",
                        hash: {},
                        data: s
                    }) : i) + "</div>"
                },
                useData: !0
            })
        }, (e, t, n) => {
            "use strict";
            var a, s = n(1),
                i = n(5),
                o = n(23),
                l = n(50),
                r = (a = n(116)) && a.__esModule ? a : {
                    default: a
                },
                c = n(24);
            n(128);
            const u = n(129),
                d = (0, s.emberDataBinding)({
                    Ember: s.Ember,
                    websocket: (0, s.getProvider)().getSocket(),
                    basePaths: {
                        honor: "/lol-honor-v2",
                        careerStats: "/lol-career-stats",
                        gameData: "/lol-game-data",
                        collections: "/lol-collections",
                        platform: "/lol-platform-config",
                        ranked: "/lol-ranked"
                    },
                    boundProperties: {
                        gameflowSession: "/lol-gameflow/v1/session",
                        isSeasonMemorialModalEnabled: {
                            api: "platform",
                            path: "/v1/namespaces/LeagueConfig/IsSeasonMemorialModalEnabled",
                            default: !0
                        },
                        seasonMemorialModalMinHonorLevel: {
                            api: "platform",
                            path: "/v1/namespaces/LeagueConfig/SeasonMemorialModalMinHonorLevel",
                            default: 2
                        },
                        eosRewardsConfig: {
                            api: "ranked",
                            path: "/v1/eos-rewards",
                            default: void 0
                        },
                        eosSkinEligibilityMinimumTier: {
                            api: "platform",
                            path: "/v1/namespaces/LeagueConfig/EosSkinEligibilityMinimumTier",
                            default: "GOLD"
                        },
                        eosChromaEligibilityMinimumTier: {
                            api: "platform",
                            path: "/v1/namespaces/LeagueConfig/EosSkinEligibilityMinimumTier",
                            default: "PLATINUM"
                        },
                        eosChromaEligibilityMaximumTier: {
                            api: "platform",
                            path: "/v1/namespaces/LeagueConfig/EosSkinEligibilityMaximumTier",
                            default: "CHALLENGER"
                        },
                        honorConfig: {
                            api: "honor",
                            path: "/v1/config"
                        },
                        honorProfile: {
                            api: "honor",
                            path: "/v1/profile"
                        }
                    }
                }),
                p = "season-memorial-modal",
                m = "ranked",
                g = "normals",
                h = "CHAMPION_SKIN",
                f = new Map;
            f.set("RANKED_FLEX_SR", "FLEX"), f.set("RANKED_SOLO_5x5", "SOLODUO"), e.exports = s.Ember.Component.extend(d, {
                classNames: ["season-memorial-modal"],
                accountLeaguesSettings: {},
                currentSummoner: {},
                splitsConfig: {},
                currentRankedStats: {},
                currentSeason: null,
                regionLocale: {},
                isModalCreated: !1,
                hasSeasonMemorialModalShownThisSession: !1,
                rewardsService: s.Ember.inject.service("rewards"),
                careerStatsService: s.Ember.inject.service("careerStats"),
                careerStatsAPI: s.CareerStatsAPI,
                init() {
                    this._super(...arguments), this.get("isConfigReady")
                },
                splits: s.Ember.computed("splitsConfig", "splitsConfig.splits.[]", (function() {
                    let e = this.get("splitsConfig.splits");
                    if (e && e.length) return e = s.Lodash.cloneDeep(e), e.sort(((e, t) => parseInt(e.splitId) - parseInt(t.splitId))), e
                })),
                highestRankedNonTFTEntryQueue: s.Ember.computed.alias("currentRankedStats.highestRankedEntrySR"),
                eligibleNonTFTQueues: s.Ember.computed("currentRankedStats", "currentRankedStats.queues.[]", (function() {
                    return this._getAllEligibleNonTFTQueues(this.get("currentRankedStats"))
                })),
                isGameflowPhaseValid: s.Ember.computed("gameflowSession", "gameflowSession.phase", (function() {
                    const e = this.get("gameflowSession.phase");
                    if (e) switch (e) {
                        case "Matchmaking":
                        case "ReadyCheck":
                        case "ChampSelect":
                        case "GameStart":
                        case "FailedToLaunch":
                        case "InProgress":
                        case "Reconnect":
                        case "WaitingForStats":
                        case "PreEndOfGame":
                        case "EndOfGame":
                        case "TerminatedInError":
                            return !1;
                        default:
                            return !0
                    }
                    return !0
                })),
                isConfigReady: s.Ember.computed("rewardsService", "rewardsService.championSkinCatalog.[]", "rewardsService.emoteCatalog.[]", "rewardsService.summonerIconCatalog.[]", "careerStatsService", "isSeasonMemorialModalEnabled", "isPreseason", "eosRewardsConfig", "hasSeasonMemorialModalShownThisSession", "honorProfile", "honorProfile.honorLevel", "honorConfig", "isGameflowPhaseValid", (function() {
                    return this._isReady()
                })),
                isConfigReadyObserver: s.Ember.observer("isConfigReady", (function() {
                    this.get("isConfigReady") && this._initializeModal()
                })),
                isHonorEligible: s.Ember.computed("honorConfig.Enabled", "honorProfile.honorLevel", (function() {
                    return this.get("honorConfig.Enabled") && this.get("honorProfile.honorLevel") >= this.get("seasonMemorialModalMinHonorLevel")
                })),
                _isReady() {
                    const e = this.get("accountLeaguesSettings"),
                        t = this.get("currentSeason"),
                        n = this.get("currentSummoner"),
                        a = this.get("careerStatsService"),
                        s = this.get("hasSeasonMemorialModalShownThisSession"),
                        i = this.get("isSeasonMemorialModalEnabled"),
                        o = this.get("isPreseason"),
                        l = this.get("rewardsService"),
                        r = this.get("rewardsService.championSkinCatalog"),
                        c = this.get("rewardsService.emoteCatalog"),
                        u = this.get("rewardsService.summonerIconCatalog"),
                        d = this.get("highestRankedNonTFTEntryQueue"),
                        m = this.get("eosRewardsConfig"),
                        g = this.get("honorConfig"),
                        h = this.get("honorProfile"),
                        f = this.get("isGameflowPhaseValid"),
                        _ = e.data && e.data[p] >= t,
                        E = Boolean(d),
                        S = l && c && c.length && u && u.length && r && r.length,
                        T = Boolean(n),
                        v = Boolean(a);
                    return i && !s && !_ && f && o && E && S && T && v && void 0 !== m && g && h && h.honorLevel >= 0
                },
                _initializeModal() {
                    const e = this.get("currentSummoner");
                    this.get("careerStatsService").loadCurrentSeasonStatsGames(e.puuid).then((e => {
                        this._tryToDisplaySeasonMemorialModal(e), this.set("hasSeasonMemorialModalShownThisSession", !0)
                    }))
                },
                _tryToDisplaySeasonMemorialModal: function(e) {
                    const t = this.get("currentSeason"),
                        n = this.get("currentRankedStats"),
                        a = this.get("careerStatsService"),
                        s = this.get("highestRankedNonTFTEntryQueue"),
                        i = this.get("currentSummoner"),
                        o = this._getBestChampionStatsPanelData(e.games, n, s, a, t, i.puuid);
                    o && o.then((e => {
                        this._displaySeasonMemorialModal(e)
                    }))
                },
                _displaySeasonMemorialModal: function(e) {
                    const t = this.get("currentSeason");
                    this._getSeasonMemorialModalRewardsInfoPromise().then((n => {
                        s.ModalManager.add({
                            type: "DialogConfirm",
                            data: {
                                contents: this._renderSeasonMemorialModal(e, n),
                                acceptText: this.get("tra.SPLIT_START_TAKEOVER_SEE_STATS_BUTTON_TEXT"),
                                declineText: this.get("tra.SPLIT_START_TAKEOVER_CLOSE_BUTTON_TEXT"),
                                closeButton: !1,
                                acceptHandler: this._navigateToProfileSubsection.bind(this, o.PROFILE_STATS_SUBSECTION_ID)
                            }
                        }), r.default.saveAccountSetting(p, t)
                    }))
                },
                _renderSeasonMemorialModal: function(e, t) {
                    const n = this._getSeasonMemorialModalTitlesInfo(),
                        a = this._getSeasonMemorialModalRankInfo(),
                        s = this._getSeasonMemorialModalHonorInfo(),
                        i = {
                            titlesInfo: n,
                            rewardsInfo: t,
                            rankInfo: a,
                            statsInfo: this._getSeasonMemorialModalStatsInfo(e),
                            honorInfo: s
                        };
                    return t.length <= 4 && (i.spaceRewardsCss = "space-around"), this._renderModal(u, i)
                },
                _getSeasonMemorialModalTitlesInfo: function() {
                    const e = this.get("regionLocale"),
                        t = this.get("splits"),
                        n = this.get("currentSplitId"),
                        a = t.find((e => e.splitId === n));
                    if (a) return {
                        seasonTitle: this.get("tra").formatString("SPLIT_START_TAKEOVER_SEASON_TITLE", {
                            seasonYear: (0, l.convertDateMillisToString)(a.endTimeMillis, e, {
                                year: "numeric"
                            })
                        }),
                        splitTitle: `${this.get("tra").formatString("SPLIT_START_TAKEOVER_SEASON_TITLE",{seasonYear:(0,l.convertDateMillisToString)(a.endTimeMillis,e,{year:"numeric"})})} - ${this.get("tra").formatString("SEASON_MEMORIAL_TAKEOVER_SPLIT_NAME",{splitNumber:a.splitId})}`,
                        splitDurationTitle: this.get("tra").formatString("SPLIT_START_TAKEOVER_SPLIT_DURATION_TITLE", {
                            splitStartString: (0, l.convertDateMillisToString)(a.startTimeMillis, e),
                            splitEndString: (0, l.convertDateMillisToString)(a.endTimeMillis - 1, e)
                        }),
                        rewardsTitle: this.get("tra").formatString("SEASON_MEMORIAL_TAKEOVER_REWARDS_TITLE", {
                            seasonYear: (0, l.convertDateMillisToString)(a.endTimeMillis, e, {
                                year: "numeric"
                            })
                        })
                    }
                },
                _getSeasonMemorialModalRewardsInfoPromise: function() {
                    const e = this.get("currentSeason"),
                        t = this.get("currentRankedStats"),
                        n = (this.get("splits"), this.get("eosRewardsConfig")),
                        a = this.get("highestRankedNonTFTEntryQueue"),
                        i = this.get("eligibleNonTFTQueues"),
                        l = this.get("eosSkinEligibilityMinimumTier"),
                        r = (t.splitsProgress, []),
                        c = [],
                        u = n.seasons[e],
                        d = u ? u.rewards : null,
                        p = s.LeaguesConsts.TIER_NAME_TO_ORDINAL[a.previousSeasonAchievedTier];
                    if (d) {
                        const e = s.LeaguesConsts.TIER_NAME_TO_ORDINAL[l];
                        if (p >= e) {
                            const e = d.VICTORIOUS_SKIN,
                                t = e ? e.id : null;
                            if (t) {
                                const e = h,
                                    n = {
                                        description: this.get(`tra.REWARD_TYPE_${e}_DESCRIPTION`),
                                        cssClass: `reward-image-${e}`
                                    };
                                c.push(s.LeagueTierNames.asyncGetRewardImage(t)), r.push(n)
                            }
                        }
                        const t = this.get("eosChromaEligibilityMinimumTier"),
                            n = this.get("eosChromaEligibilityMaximumTier"),
                            a = s.LeaguesConsts.TIER_NAME_TO_ORDINAL[t],
                            u = s.LeaguesConsts.TIER_NAME_TO_ORDINAL[n];
                        i && i.length && i.forEach((e => {
                            if (a && u && p >= a)
                                for (let e = a; e <= p; e++) {
                                    const t = s.LeaguesConsts.TIERS[e],
                                        n = d[`VICTORIOUS_CHROMA_${t}`],
                                        a = n ? n.id : null;
                                    if (a) {
                                        const e = h,
                                            t = {
                                                description: this.get("tra.REWARD_TYPE_CHROMA_DESCRIPTION"),
                                                cssClass: `reward-image-${e}`
                                            };
                                        c.push(s.LeagueTierNames.asyncGetRewardImage(a)), r.push(t)
                                    }
                                }
                            const t = d[`SUMMONER_ICON_${f.get(e.queueType)}_${e.previousSeasonAchievedTier}`],
                                n = t ? t.id : null;
                            if (n) {
                                const t = o.SUMMONER_ICON_REWARD_TYPE,
                                    a = {
                                        description: this.get(`tra.SEASON_MEMORIAL_TAKEOVER_REWARD_TYPE_${t}_${e.queueType}_DESCRIPTION`),
                                        cssClass: `reward-image-${t}`
                                    };
                                c.push(s.LeagueTierNames.asyncGetRewardImage(n)), r.push(a)
                            }
                        }))
                    }
                    return Promise.all(c).then((e => {
                        for (let t = 0; t < r.length; t++) r[t].imagePath = e[t];
                        return r
                    }))
                },
                _getSeasonMemorialModalRankInfo: function() {
                    const e = this.get("currentRankedStats"),
                        t = this.get("highestRankedNonTFTEntryQueue"),
                        n = t.previousSeasonAchievedTier,
                        a = t.previousSeasonAchievedDivision;
                    return {
                        currentRankTitle: this.get("tra.SEASON_MEMORIAL_TAKEOVER_FINAL_RANK_TEXT"),
                        currentRankTier: n,
                        currentRankDivision: a,
                        currentRankText: s.LeagueTierNames.getFullTierDivisionName(n, a),
                        queueTypeText: this.get("tra").formatString("SPLIT_START_TAKEOVER_QUEUE_TYPE_TEXT", {
                            queueType: s.LeagueTierNames.getRankedQueueName(t.queueType)
                        }),
                        rankedRegaliaLevel: e.rankedRegaliaLevel,
                        isInPlacements: t.isProvisional,
                        placementsProgressText: this.get("tra").formatString("SPLIT_START_TAKEOVER_PLACEMENTS_PROGRESS_TEXT", {
                            placementGamesThreshold: t.provisionalGameThreshold,
                            placementGamesDone: t.provisionalGameThreshold - t.provisionalGamesRemaining
                        }),
                        placementsText: this.get("tra.SPLIT_START_TAKEOVER_PLACEMENTS_TEXT"),
                        lpProgressText: this.get("tra").formatString("SPLIT_START_TAKEOVER_LP_PROGRESS_TEXT", {
                            lpToGo: 100 - t.leaguePoints
                        }),
                        isInApex: s.LeagueTierNames.isApexForQueue(t),
                        lpText: this.get("tra").formatString("SPLIT_START_TAKEOVER_LP_TEXT", {
                            lp: t.leaguePoints
                        }),
                        isInMiniSeries: Boolean(t.miniSeriesProgress),
                        miniSeriesProgressText: this.get("tra").formatString("SPLIT_START_TAKEOVER_MINI_SERIES_PROGRESS_TEXT", {
                            miniSeriesWinsNeeded: this._getMiniSeriesWinsNeeded(t.miniSeriesProgress)
                        }),
                        miniSeriesText: this.get("tra.SPLIT_START_TAKEOVER_MINI_SERIES_TEXT"),
                        winsText: this.get("tra").formatString("SEASON_MEMORIAL_TAKEOVER_WINS_TEXT", {
                            wins: t.wins
                        })
                    }
                },
                _getSeasonMemorialModalHonorInfo: function() {
                    const e = this.get("isHonorEligible"),
                        t = this.get("seasonMemorialModalMinHonorLevel");
                    return {
                        isHonorEligible: e,
                        rewardsContainerCss: e ? "" : "restricted",
                        honorIneligibleText: this.get("tra").formatString("SEASON_MEMORIAL_TAKEOVER_HONOR_INELIGIBLE", {
                            level: t
                        })
                    }
                },
                _getSeasonMemorialModalStatsInfo: function(e) {
                    const t = this.get("regionLocale");
                    let n;
                    if (e.dataType === m || e.dataType === g) {
                        const t = this.get("careerStatsService.careerStatsTra");
                        n = {
                            statsTitle: this.get("tra").formatString("SPLIT_START_TAKEOVER_STATS_TITLE", {
                                statsTitleAddition: e.dataType === m ? this.get("tra.SPLIT_START_TAKEOVER_STATS_RANKED_TITLE_ADDITION") : this.get("tra.SPLIT_START_TAKEOVER_STATS_NORMALS_TITLE_ADDITION")
                            }),
                            statsFooter: e.dataType === m ? this.get("tra.SPLIT_START_TAKEOVER_STATS_RANKED_FOOTER") : this.get("tra.SPLIT_START_TAKEOVER_STATS_NONRANKED_FOOTER"),
                            statsData: [e.championGrades.combat, e.championGrades.income, e.championGrades.macro],
                            statsText: [t.get("career_stats_play_style_category_combat"), t.get("career_stats_play_style_category_income"), t.get("career_stats_play_style_category_macro")],
                            statContainerCSSClass: "stat-container-grades"
                        }
                    } else n = {
                        statsTitle: this.get("tra.SPLIT_START_TAKEOVER_STATS_CHAMP_MASTERY_TITLE"),
                        statsFooter: this.get("tra.SPLIT_START_TAKEOVER_STATS_NONRANKED_FOOTER"),
                        statsData: [e.championMastery ? e.championMastery.championLevel : 1, this._formatNumber(e.championMastery ? e.championMastery.championPoints : 0, t), e.championMastery && e.championMastery.highestGrade ? e.championMastery.highestGrade : this.get("tra.SPLIT_START_TAKEOVER_STATS_CHAMP_MASTERY_NO_GRADE_DATA")],
                        statsText: [this.get("tra.SPLIT_START_TAKEOVER_STATS_CHAMP_MASTERY_LEVEL_TEXT"), this.get("tra.SPLIT_START_TAKEOVER_STATS_CHAMP_MASTERY_POINTS_TEXT"), this.get("tra.SPLIT_START_TAKEOVER_STATS_CHAMP_MASTERY_GRADE_TEXT")],
                        statContainerCSSClass: "stat-container-mastery"
                    };
                    return e.championGameAssets && (n.championName = e.championGameAssets.name, n.championImagePath = e.championGameAssets.skins[0].uncenteredSplashPath), n
                },
                _getBestChampionStatsPanelData(e, t, n, a, s, i) {
                    let o = this._getBestChampionInfoForRanked(e, t, n),
                        l = m;
                    return o || (o = this._getBestChampionInfoForNormals(e), l = g), o ? this._getStatsPanelDataForChampion(o, a, s, l) : this._getStatsPanelDataForChampionMastery(i)
                },
                _getBestChampionInfoForRanked(e, t, n) {
                    const a = n.queueType;
                    let i = this._getBestChampionInfoForQueue(e, a, n.previousSeasonAchievedTier);
                    return i || s.Lodash.forEach(t.queues, (t => {
                        const n = t.queueType;
                        if (n !== a && this._isRankedQueueValid(t) && this._isRankedQueueSR(t)) {
                            const a = this._getBestChampionInfoForQueue(e, n, t.previousSeasonAchievedTier);
                            a && (!i || a.winrate > i.winrate || a.winrate === i.winrate && a.games.length > i.games.length) && (i = a)
                        }
                    })), i
                },
                _getBestChampionInfoForNormals(e) {
                    let t = null;
                    return s.Lodash.forEach(this.careerStatsAPI.getNormalGamesQueueTypes(), (n => {
                        const a = this._getBestChampionInfoForQueue(e, n, this.careerStatsAPI.getAllRanks());
                        a && (!t || a.winrate > t.winrate || a.winrate === t.winrate && a.games.length > t.games.length) && (t = a)
                    })), t
                },
                _getBestChampionInfoForQueue(e, t, n) {
                    const a = this._makeFilterParams(t),
                        s = this.careerStatsAPI.filterGames(e, a);
                    return this._getBestChampionInfoForFilteredQueueGames(s, t, n)
                },
                _getBestChampionInfoForFilteredQueueGames(e, t, n) {
                    const a = {};
                    s.Lodash.forEach(e, (e => {
                        const t = this.careerStatsAPI.inferPosition(e);
                        a[e.championId] && a[e.championId][t] ? a[e.championId][t].push(e) : a[e.championId] && !a[e.championId][t] ? a[e.championId][t] = [e] : a[e.championId] = {
                            [t]: [e]
                        }
                    }));
                    let i = null;
                    for (const [e, o] of s.Lodash.entries(a))
                        for (const [a, l] of s.Lodash.entries(o)) {
                            const s = l.length,
                                o = this.careerStatsAPI.getWinrate(l);
                            s >= this.careerStatsAPI.getMinGamesToUnlockStats() && (!i || i.winrate <= o) && (i = {
                                championId: parseInt(e),
                                position: a,
                                winrate: o,
                                queueType: t,
                                rankTier: n,
                                games: l
                            })
                        }
                    return i
                },
                _getStatsPanelDataForChampion(e, t, n, a) {
                    const s = this.careerStatsAPI.getCareerStatsQueueType(e.queueType);
                    return t.getChampionStatPercentiles(e.championId, [{
                        position: e.position,
                        rankTier: e.rankTier,
                        queueType: s,
                        season: n
                    }]).then((t => this._getChampionGameAssets(e.championId).then((n => ({
                        championGameAssets: n,
                        championGrades: this.careerStatsAPI.getGradesForChampion(e.games, e.position, s, t),
                        dataType: a
                    })))))
                },
                _getStatsPanelDataForChampionMastery(e) {
                    return this._getBestChampionMastery(e).then((e => {
                        const t = e ? e.championId : 1;
                        return this._getChampionGameAssets(t).then((t => ({
                            championGameAssets: t,
                            championMastery: e,
                            dataType: "championMastery"
                        })))
                    }))
                },
                _makeFilterParams(e) {
                    return {
                        queueFilter: {
                            queueTypes: [this.careerStatsAPI.getCareerStatsQueueType(e)]
                        }
                    }
                },
                _getBestChampionMastery: function(e) {
                    return this.get("api.collections").get(`/v1/inventories/${e}/champion-mastery/top?limit=1`).then((e => e && e.masteries ? e.masteries[0] : {}))
                },
                _getChampionGameAssets: function(e) {
                    return this.get("api.gameData").get("/assets/v1/champions/" + e + ".json")
                },
                _getRankedSeasonEndTime(e) {
                    if (e && e.seasons) {
                        const t = Object.keys(e.seasons);
                        for (let n = 0; n < t.length; n++) {
                            const a = t[n];
                            if (!(0, c.isTftQueueType)(a)) return e.seasons[a].currentSeasonEnd
                        }
                    }
                    return null
                },
                _getAllEligibleNonTFTQueues(e) {
                    const t = [];
                    return e && e.queues && e.queues.forEach((e => {
                        this._isRankedQueueValid(e) && !this._isRankedQueueTFT(e) && t.push(e)
                    })), t
                },
                _isRankedQueueSR: function(e) {
                    return Boolean(e) && Boolean(e.queueType) && i.QUEUES.RANKED_SR_QUEUE_TYPES.includes(e.queueType)
                },
                _isRankedQueueTFT: function(e) {
                    return Boolean(e) && Boolean(e.queueType) && (0, c.isTftQueueType)(e.queueType)
                },
                _isRankedQueueValid: function(e) {
                    return Boolean(e) && Boolean(e.queueType) && Boolean(e.previousSeasonAchievedTier) && e.previousSeasonAchievedTier !== s.LeaguesConsts.TIER_NAME_NONE
                },
                _getMiniSeriesWinsNeeded: function(e) {
                    if (e) {
                        let t = 0;
                        return s.Lodash.forEach(e, (e => {
                            "W" === e && t++
                        })), Math.ceil(e.length / 2) - t
                    }
                    return 0
                },
                _navigateToProfileSubsection: function(e) {
                    return s.ProfilesAPI.setActive(!0), s.ProfilesAPI.mainSection().show(e), !0
                },
                _formatNumber: function(e, t) {
                    const n = (t.locale || "en_US").replace("_", "-");
                    return (e || 0).toLocaleString(n)
                },
                _renderModal(e, t) {
                    const n = e(t),
                        a = document.createElement("div");
                    a.innerHTML = n;
                    const s = a.querySelector(".rewards-container"),
                        i = a.querySelector("#rewards-scroll-container");
                    return s.addEventListener("wheel", (e => {
                        e.deltaY > 0 ? i.scrollLeft += 80 : i.scrollLeft -= 80
                    })), a
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            var a = n(55);
            e.exports = (a.default || a).template({
                1: function(e, t, n, a, s) {
                    var i;
                    return '      <div class="rewards-container-restricted">\r\n        <div class="honor-ineligible-panel">\r\n            <div class="honor-ineligible-text">' + e.escapeExpression(e.lambda(null != (i = null != t ? t.honorInfo : t) ? i.honorIneligibleText : i, t)) + "</div>\r\n        </div>\r\n      </div>\r\n"
                },
                3: function(e, t, n, a, s, i) {
                    var o, l = e.lambda,
                        r = e.escapeExpression;
                    return '          <div class="rewards-container-column">\r\n              <img src="' + r(l(null != (o = i[0][0]) ? o.imagePath : o, t)) + '" class="rewards-image ' + r(l(null != (o = i[0][0]) ? o.cssClass : o, t)) + '">\r\n              <div class="reward-description">' + r(l(null != (o = i[0][0]) ? o.description : o, t)) + "</div>\r\n          </div>\r\n"
                },
                compiler: [7, ">= 4.0.0"],
                main: function(e, t, n, a, s, i) {
                    var o, l, r = null != t ? t : e.nullContext || {},
                        c = e.lambda,
                        u = e.escapeExpression;
                    return '<div class="season-memorial-modal">\r\n  <div class="rewards-container">\r\n' + (null != (o = n.unless.call(r, null != (o = null != t ? t.honorInfo : t) ? o.isHonorEligible : o, {
                        name: "unless",
                        hash: {},
                        fn: e.program(1, s, 0, i),
                        inverse: e.noop,
                        data: s,
                        blockParams: i
                    })) ? o : "") + '    <lol-uikit-scrollable id="rewards-scroll-container" class="' + u(c(null != (o = null != t ? t.honorInfo : t) ? o.rewardsContainerCss : o, t)) + '">\r\n      <div class="rewards-images-container ' + u("function" == typeof(l = null != (l = n.spaceRewardsCss || (null != t ? t.spaceRewardsCss : t)) ? l : n.helperMissing) ? l.call(r, {
                        name: "spaceRewardsCss",
                        hash: {},
                        data: s,
                        blockParams: i
                    }) : l) + '">\r\n' + (null != (o = n.each.call(r, null != t ? t.rewardsInfo : t, {
                        name: "each",
                        hash: {},
                        fn: e.program(3, s, 1, i),
                        inverse: e.noop,
                        data: s,
                        blockParams: i
                    })) ? o : "") + '      </div>\r\n    </lol-uikit-scrollable>\r\n  </div>\r\n    <div class="titles-container">\r\n        <div class="season-title">' + u(c(null != (o = null != t ? t.titlesInfo : t) ? o.seasonTitle : o, t)) + '</div>\r\n        <div class="split-title">' + u(c(null != (o = null != t ? t.titlesInfo : t) ? o.splitTitle : o, t)) + '</div>\r\n        <div class="split-duration-title">' + u(c(null != (o = null != t ? t.titlesInfo : t) ? o.splitDurationTitle : o, t)) + '</div>\r\n        <div class="rewards-title-container">\r\n            <div class="rewards-title-ornament"></div>\r\n            <div class="rewards-title">' + u(c(null != (o = null != t ? t.titlesInfo : t) ? o.rewardsTitle : o, t)) + '</div>\r\n            <div class="flipped rewards-title-ornament"></div>\r\n        </div>\r\n    </div>\r\n    <div class="stats-and-rank-panels-container">\r\n        <div class="stats-panel">\r\n            <div class="champion-background-image-container">\r\n                <div class="champion-image-container">\r\n                    <img src="' + u(c(null != (o = null != t ? t.statsInfo : t) ? o.championImagePath : o, t)) + '" class="champion-image">\r\n                </div>\r\n                <div class="champion-overlay"></div>\r\n            </div>\r\n            <div class="stats-content-container">\r\n                <div class="stats-display">\r\n                    <div class="stats-title">' + u(c(null != (o = null != t ? t.statsInfo : t) ? o.statsTitle : o, t)) + '</div>\r\n                    <div class="stats-champion-name">' + u(c(null != (o = null != t ? t.statsInfo : t) ? o.championName : o, t)) + '</div>\r\n                    <div class="stats-divider"></div>\r\n                    <div class=' + u(c(null != (o = null != t ? t.statsInfo : t) ? o.statContainerCSSClass : o, t)) + '>\r\n                        <div class="stat-text">' + u(c(null != (o = null != (o = null != t ? t.statsInfo : t) ? o.statsText : o) ? o[0] : o, t)) + '</div>\r\n                        <div class="stat-data">' + u(c(null != (o = null != (o = null != t ? t.statsInfo : t) ? o.statsData : o) ? o[0] : o, t)) + '</div>\r\n                    </div>\r\n                    <div class="stats-divider"></div>\r\n                    <div class=' + u(c(null != (o = null != t ? t.statsInfo : t) ? o.statContainerCSSClass : o, t)) + '>\r\n                        <div class="stat-text">' + u(c(null != (o = null != (o = null != t ? t.statsInfo : t) ? o.statsText : o) ? o[1] : o, t)) + '</div>\r\n                        <div class="stat-data">' + u(c(null != (o = null != (o = null != t ? t.statsInfo : t) ? o.statsData : o) ? o[1] : o, t)) + '</div>\r\n                    </div>\r\n                    <div class="stats-divider"></div>\r\n                    <div class=' + u(c(null != (o = null != t ? t.statsInfo : t) ? o.statContainerCSSClass : o, t)) + '>\r\n                        <div class="stat-text">' + u(c(null != (o = null != (o = null != t ? t.statsInfo : t) ? o.statsText : o) ? o[2] : o, t)) + '</div>\r\n                        <div class="stat-data">' + u(c(null != (o = null != (o = null != t ? t.statsInfo : t) ? o.statsData : o) ? o[2] : o, t)) + '</div>\r\n                    </div>\r\n                    <div class="stats-divider"></div>\r\n                </div>\r\n                <div class="stats-footer">' + u(c(null != (o = null != t ? t.statsInfo : t) ? o.statsFooter : o, t)) + '</div>\r\n            </div>\r\n        </div>\r\n        <div class="rank-panel">\r\n            <div class="rank-headers">\r\n                <div class="rank-text-wrapper">\r\n                    <lol-uikit-resizing-text-field class="current-rank-title" data-max-width="200">\r\n                        ' + u(c(null != (o = null != t ? t.rankInfo : t) ? o.currentRankTitle : o, t)) + '\r\n                    </lol-uikit-resizing-text-field>\r\n                </div>\r\n                <div class="rank-text-wrapper">\r\n                    <lol-uikit-resizing-text-field class="current-rank-text" data-max-width="200">\r\n                        ' + u(c(null != (o = null != t ? t.rankInfo : t) ? o.currentRankText : o, t)) + '\r\n                    </lol-uikit-resizing-text-field>\r\n                </div>\r\n                <lol-uikit-resizing-text-field class="queue-type-text" data-max-width="200">' + u(c(null != (o = null != t ? t.rankInfo : t) ? o.queueTypeText : o, t)) + '</lol-uikit-resizing-text-field>\r\n            </div>\r\n                <div class="rank-crest-container">\r\n                    <div class="crest">\r\n                        <div class="crest-sizer">\r\n                            <lol-regalia-emblem-element\r\n                            animations="false"\r\n                            ranked-tier="' + u(c(null != (o = null != t ? t.rankInfo : t) ? o.currentRankTier : o, t)) + '">\r\n                            </lol-regalia-emblem-element>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            <div class="rank-progress-footnote">\r\n              <div class="rank-text-wrapper">\r\n                <lol-uikit-resizing-text-field class="lp-text" data-max-width="200">' + u(c(null != (o = null != t ? t.rankInfo : t) ? o.lpText : o, t)) + '</lol-uikit-resizing-text-field>\r\n              </div>\r\n              <div class="rank-text-wrapper">\r\n                <lol-uikit-resizing-text-field class="wins-text" data-max-width="200">' + u(c(null != (o = null != t ? t.rankInfo : t) ? o.winsText : o, t)) + "</lol-uikit-resizing-text-field>\r\n              </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"
                },
                useData: !0,
                useBlockParams: !0
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1),
                s = n(5),
                i = n(50);
            n(131);
            var o;
            (o = n(116)) && o.__esModule;
            const l = n(132),
                r = (0, a.emberDataBinding)({
                    Ember: a.Ember,
                    websocket: (0, a.getProvider)().getSocket(),
                    basePaths: {
                        platformConfig: "/lol-platform-config",
                        summoner: "/lol-summoner",
                        riotclient: "/riotclient"
                    },
                    boundProperties: {
                        leaguesDecayMessagingEnabled: {
                            api: "platformConfig",
                            path: "/v1/namespaces/ClientSystemStates/leaguesDecayMessagingEnabled"
                        },
                        regionLocale: {
                            api: "riotclient",
                            path: "/region-locale",
                            default: {}
                        },
                        uxSettings: "/lol-settings/v2/local/lol-user-experience"
                    }
                }),
                c = "COMPLETED_PROVISIONALS",
                u = "LEAGUE_REWARD",
                d = "LEAGUE_PROMOTED",
                p = "LEAGUE_DEMOTED",
                m = "INACTIVITY",
                g = "FIRST_CHALLENGER_OF_SEASON",
                h = "FINAL_RANK_ONE_OF_SEASON",
                f = "RATED_SEEDED",
                _ = "RATED_TIER_PROMOTED",
                E = "CHERRY_RATED_TIER_PROMOTED",
                S = {
                    [c]: "LeaguesPromotionVignetteV2Component",
                    [u]: "LeaguesRewardVignetteComponent",
                    [d]: "LeaguesPromotionVignetteV2Component",
                    [f]: "RatedPromotionVignetteComponent",
                    [_]: "RatedPromotionVignetteComponent",
                    [E]: "CherryRatedPromotionVignetteComponent"
                },
                T = {
                    [c]: 500,
                    [u]: 1e3,
                    [d]: 500,
                    [f]: 1e3,
                    [_]: 1e3,
                    [E]: 1e3
                },
                v = {
                    [c]: "LARGE",
                    [u]: "SMALL",
                    [d]: "LARGE",
                    [f]: "LARGE",
                    [_]: "LARGE",
                    [E]: "LARGE"
                };
            e.exports = a.Ember.Component.extend(r, {
                displayedNotificationsIds: new Set,
                displayedGlobalNotifications: new Set,
                classNames: ["leagues-dialogs-spawner"],
                rankedService: (0, a.dataBinding)("/lol-ranked", (0, a.getProvider)().getSocket()),
                settingsService: (0, a.dataBinding)("/lol-settings", (0, a.getProvider)().getSocket()),
                modalManager: a.ModalManager,
                toastCelebrationManager: a.ToastCelebrationManager,
                loadedRankedStats: !1,
                init: function() {
                    this._super.apply(this, arguments), this.get("rankedService").observe("/v1/current-ranked-stats", this, this._processRankedStats), this.get("settingsService").observe("/v2/ready", this, this._handleSettingsReady)
                },
                willDestroyElement: function() {
                    this._super(...arguments), this.get("rankedService").unobserve(this), this.get("settingsService").unobserve(this)
                },
                _handleSettingsReady: function(e) {
                    e && this.settingsService.get("/v2/account/LCUPreferences/lol-leagues").then((e => {
                        this.set("accountLeaguesSettings", e)
                    })).then((() => {
                        this.rankedService.observe("/v1/global-notifications", this, this._processGlobalNotifications)
                    }))
                },
                _processRankedStats: function(e) {
                    e && (this.set("rankedStats", e), this.get("loadedRankedStats") || (this.get("rankedService").observe("/v1/notifications", this, this._processNotifications), this.set("loadedRankedStats", !0)))
                },
                _processNotifications: function(e) {
                    if (e)
                        for (let t = 0; t < e.length; t++) {
                            const n = e[t],
                                a = this.get("displayedNotificationsIds");
                            a.has(n.id) || (a.add(n.id), this._waitForUnlock(this._showNotification, n)), this.set("displayedNotificationsIds", a)
                        }
                },
                _processGlobalNotifications: function(e) {
                    if (!e) return;
                    const t = [],
                        n = this.get("displayedGlobalNotifications");
                    for (let a = 0; a < e.length; a++) {
                        const s = e[a],
                            i = this._getSeasonId(s.queueType);
                        if (!i || !s.notifyReason || !s.queueType) continue;
                        const o = `${s.notifyReason}-${s.queueType}`;
                        n.has(o) || t[o] && !(t[o] < i) || (n.add(o), this._waitForUnlock(this._showGlobalNotification, s)), this.set("displayedGlobalNotifications", n)
                    }
                },
                _showGlobalNotification: function(e) {
                    const t = document.createElement("div");
                    t.style.height = "100%", t.style.width = "100%", t.style.transform = "scale(1)";
                    const n = document.createElement("lol-regalia-emblem-element");
                    n.setAttribute("ranked-tier", e.tier), t.appendChild(n), a.Ember.run.later((() => {
                        this._getDisplayNames([e.participantId]).then((n => {
                            let s = "";
                            if (Array.isArray(n) && n[0]) {
                                const e = n[0];
                                s = a.playerNames.isUsingAlias ? `${e.gameName} #${e.tagLine}` : e.displayName
                            }
                            const [i, o] = this._getGlobalNotificationText(e, s);
                            this.toastCelebrationManager.add({
                                data: {
                                    title: i,
                                    details: o,
                                    iconElement: t
                                },
                                timing: "slow",
                                onClick: this._handleGlobalNotificationClicked.bind(this, e)
                            })
                        })), this._sendGlobalNotificationShownTelemetry(e)
                    }), 1e3)
                },
                _getGlobalNotificationText(e, t) {
                    let n = "",
                        a = "";
                    const i = this.get("tra"),
                        o = e.queueType || s.QUEUES.RANKED_SOLO_5x5_QUEUE_TYPE;
                    return e.notifyReason === g ? (n = i.formatString("TOAST_FIRST_CHALLENGER_HEADER", {
                        name: t
                    }), a = i.formatString("TOAST_FIRST_CHALLENGER_BODY", {
                        queue: i.get(`QUEUE_NAME_${o}`),
                        name: t
                    })) : e.notifyReason === h && (n = i.formatString("TOAST_FINAL_RANK_ONE_HEADER", {
                        seasonYear: this._getSeasonYear(o)
                    }), a = i.formatString("TOAST_FINAL_RANK_ONE_BODY", {
                        queue: i.get(`QUEUE_NAME_${o}`),
                        name: t
                    })), [n, a]
                },
                _handleGlobalNotificationClicked(e) {
                    e.notifyReason === g ? a.Telemetry.sendEvent("leagues-first-challenger-toast-clicked") : e.notifyReason === h && a.Telemetry.sendEvent("leagues-final-rank-one-toast-clicked")
                },
                _sendGlobalNotificationShownTelemetry(e) {
                    e.notifyReason === g ? a.Telemetry.sendEvent("leagues-first-challenger-toast-shown") : e.notifyReason === h && a.Telemetry.sendEvent("leagues-final-rank-one-toast-shown")
                },
                _showNotification: function(e) {
                    "TOAST" === e.displayType ? this._showToastNotification(e) : "VIGNETTE" === e.displayType ? e.notifyReason === u && e.rewardEarnedId ? this._showVignetteNotificationAfterLoadingRewardAssets(e) : this._showVignetteNotification(e) : "MODAL" === e.displayType && this._showModalNotification(e)
                },
                _showVignetteNotificationAfterLoadingRewardAssets: function(e) {
                    const t = e.rewardEarnedId;
                    a.LeagueTierNames.asyncGetSplitRewardLocalization(t).then((n => {
                        e.subheaderText = n;
                        const s = e.rewardOverrideImagePath;
                        s ? (e.imagePath = s, this._showVignetteNotification(e)) : a.LeagueTierNames.asyncGetRewardImage(t).then((t => {
                            e.imagePath = t, this._showVignetteNotification(e)
                        }))
                    }))
                },
                _showVignetteNotification: function(e) {
                    const t = this.get("tra"),
                        n = JSON.parse(JSON.stringify(e)),
                        i = n.notifyReason,
                        o = this._acknowledgeNotification.bind(this),
                        l = v[i];
                    return a.LeagueTierNames.getTiersForQueue(e.queueType).then((r => {
                        const c = a.Ember.Object.create({
                                notification: n,
                                vignetteSize: l,
                                isShowing: !1,
                                isLowSpec: this.get("isLowSpec"),
                                rankedStats: this.get("rankedStats"),
                                tiers: r
                            }),
                            u = e.notifyReason === _ && e.queueType === s.QUEUES.RANKED_CHERRY_QUEUE_TYPE;
                        if (e.notifyReason === f && e.queueType === s.QUEUES.RANKED_CHERRY_QUEUE_TYPE) return void o(e);
                        const d = u ? S.CHERRY_RATED_TIER_PROMOTED : S[i],
                            p = a.componentFactory.create({
                                type: d,
                                data: c
                            }),
                            m = {
                                type: "VignetteCelebration",
                                data: {
                                    nextButtonText: t.get("LEAGUES_VIGNETTE_OK_BUTTON")
                                },
                                height: l,
                                timing: "INFINITE",
                                content: p,
                                onClick: function() {
                                    a.VignetteCelebrationManager.remove(this), a.Ember.run.later((() => {
                                        o(e)
                                    }), 1e3)
                                },
                                onRemove: function() {
                                    a.Ember.run.later((() => {
                                        p && p.onRemove && p.onRemove()
                                    }), 500)
                                },
                                onShow: function() {
                                    a.Ember.run.later((() => {
                                        c.set("isShowing", !0)
                                    }), T[i])
                                }
                            };
                        a.VignetteCelebrationManager.add(m)
                    }))
                },
                _showModalNotification: function(e) {
                    const [t, n, a] = this._getModalNotificationText(e);
                    if (!t && !n) return void this._acknowledgeNotification(e);
                    const s = l({
                            header: t,
                            body: n
                        }),
                        i = document.createElement("div");
                    i.classList.add("leagues-modal-notification"), i.innerHTML = s;
                    const o = {
                        contents: i.outerHTML,
                        okText: a
                    };
                    this.get("modalManager").add({
                        type: "DialogAlert",
                        data: o
                    }).okPromise.then((() => {
                        this._acknowledgeNotification(e)
                    }))
                },
                _getModalNotificationText: function(e) {
                    const t = this.get("tra");
                    let n = "",
                        a = "",
                        s = t.get("lib_ui_dialog_alert_ok");
                    const o = e.notifyReason,
                        l = e.changeReason,
                        r = this._getQueueLoc(e);
                    if (o === p) l === m ? (n = t.get("LEAGUES_SYSTEM_DECAY_DEMOTION_TITLE"), a = t.formatString("LEAGUES_SYSTEM_DECAY_DEMOTION", {
                        tierDivisionLoc: this._getTierDivisionLoc(e),
                        queueType: r
                    })) : !0 === e.eligibleForPromoHelper ? (n = t.get("LEAGUES_GENERAL_LEAGUE_UPDATE_TITLE"), a = t.formatString("LEAGUES_MESSAGE_PROMOHELPER_LEAGUE_DEMOTED", {
                        tierDivisionLoc: this._getTierDivisionLoc(e),
                        queueType: r
                    })) : (n = t.get("LEAGUES_GENERAL_LEAGUE_UPDATE_TITLE"), a = t.formatString("LEAGUES_MESSAGE_LEAGUE_DEMOTED", {
                        tierDivisionLoc: this._getTierDivisionLoc(e),
                        queueType: r
                    }));
                    else if ("MINISERIES_START" === o) n = t.get("LEAGUES_GENERAL_LEAGUE_MINISERIES_TITLE"), a = t.formatString("LEAGUES_MESSAGE_MINISERIES_START", {
                        miniseriesWins: e.miniseriesWins,
                        queueType: r
                    });
                    else if ("MINISERIES_LOST" === o) !0 === e.eligibleForPromoHelper ? (n = t.get("LEAGUES_GENERAL_LEAGUE_MINISERIES_TITLE"), a = t.formatString("LEAGUES_MESSAGE_PROMOHELPER_MINISERIES_LOST", {
                        queueType: r
                    })) : (n = t.get("LEAGUES_GENERAL_LEAGUE_MINISERIES_TITLE"), a = t.formatString("LEAGUES_MESSAGE_MINISERIES_LOST", {
                        queueType: r
                    }));
                    else if ("MINISERIES_CANCEL" === o) l === m ? (n = t.get("LEAGUES_SYSTEM_SERIES_ENDED_TITLE"), a = t.formatString("LEAGUES_SYSTEM_SERIES_ENDED_DECAY", {
                        queueType: r
                    })) : (n = t.get("LEAGUES_SYSTEM_SERIES_ENDED_TITLE"), a = t.formatString("LEAGUES_SYSTEM_SERIES_ENDED", {
                        queueType: r
                    }));
                    else if ("LEAGUE_DECAY_WARNING" === o) n = t.get("LEAGUES_SYSTEM_DECAY_SOON_TITLE"), a = t.formatString("LEAGUES_SYSTEM_DECAY_SOON", {
                        timeUntilInactivityStatusChangesDays: (0, i.timeInMillisToDays)(e.timeUntilInactivityStatusChanges),
                        queueType: r
                    });
                    else if ("MINISERIES_DECAY_WARNING" === o) n = t.get("LEAGUES_SYSTEM_PROMOTION_SERIES_DECAY_SOON_TITLE"), a = t.formatString("LEAGUES_SYSTEM_SERIES_INACTIVITY", {
                        timeUntilInactivityStatusChangesDays: (0, i.timeInMillisToDays)(e.timeUntilInactivityStatusChanges),
                        queueType: r
                    });
                    else if (l === m) n = t.get("LEAGUES_SYSTEM_DECAY_TITLE"), a = t.formatString("LEAGUES_SYSTEM_DECAY", {
                        queueType: r
                    });
                    else {
                        const i = e.afkLpPenaltyAmount,
                            o = e.afkLpPenaltyLevel;
                        e.wasAfkOrLeaver && i < 0 && o > 0 && (n = t.get("player_behavior_afk_lp_penalty_notification_header"), a = o > 1 ? t.formatString("player_behavior_afk_lp_penalty_notification_body", {
                            numGamesRemaining: o - 1
                        }) : this.get("tra.player_behavior_afk_lp_penalty_notification_no_games_remaining_body"), s = t.get("player_behavior_afk_lp_penalty_notification_cta"))
                    }
                    return [n, a, s]
                },
                _showToastNotification: function(e) {
                    const [t, n] = this._getToastNotificationText(e), s = this._isToastMuted(e), i = document.createElement("div");
                    i.style.height = "100%", i.style.width = "100%", i.style.transform = "scale(1)";
                    const o = document.createElement("lol-regalia-emblem-element");
                    o.setAttribute("ranked-tier", e.tier), i.appendChild(o), a.Ember.run.later((() => {
                        this.toastCelebrationManager.add({
                            data: {
                                title: t,
                                details: n,
                                iconElement: i,
                                isMuted: s
                            },
                            timing: "slow"
                        })
                    }), 1e3), this._acknowledgeNotification(e)
                },
                _getToastNotificationText: function(e) {
                    let t = "",
                        n = "";
                    const a = this.get("tra"),
                        s = e.notifyReason,
                        i = this._getQueueLoc(e);
                    return "LEAGUE_SEEDED" === s ? (t = this._getTierDivisionLpLoc(e), n = a.formatString("TOAST_PROVISIONAL_START_BODY", {
                        queueType: i
                    })) : s === d ? (t = a.formatString("TOAST_DIVISION_PROMOTION_HEADER", {
                        tierDivisionLoc: this._getTierDivisionLoc(e)
                    }), n = a.formatString("TOAST_DIVISION_PROMOTION_BODY", {
                        queueType: i
                    })) : s === p && (t = a.formatString("TOAST_DEMOTION_HEADER", {
                        tierDivisionLoc: this._getTierDivisionLoc(e)
                    }), n = a.formatString("TOAST_DEMOTION_BODY", {
                        queueType: i,
                        leaguePoints: e.leaguePoints
                    })), [t, n]
                },
                _isToastMuted: function(e) {
                    return e && e.notifyReason === p
                },
                _acknowledgeNotification: function(e) {
                    this.get("rankedService").post(`/v1/notifications/${e.id}/acknowledge`);
                    const t = this.get("displayedNotificationsIds");
                    t.delete(e.id), this.set("displayedNotificationsIds", t)
                },
                _getTierDivisionLoc: e => a.LeagueTierNames.getFullTierDivisionName(e.tier, e.division),
                _getTierDivisionLpLoc: e => a.LeagueTierNames.getTierDivisionLpLoc(e.tier, e.division, e.leaguePoints),
                _getQueueLoc: e => a.LeagueTierNames.getRankedQueueName(e.queueType),
                _getSeasonId(e) {
                    const t = this.get("rankedStats");
                    return t && t.seasons && t.seasons[e] ? t.seasons[e].currentSeasonId : null
                },
                _getSeasonYear(e) {
                    const t = this.get("rankedStats");
                    return t && t.seasons && t.seasons[e] ? (0, i.convertDateMillisToString)(t.seasons[e].currentSeasonEnd, this.get("regionLocale"), {
                        year: "numeric"
                    }) : null
                },
                _getDisplayNames(e) {
                    return this.get("api.summoner").get(`/v2/summoners?ids=${JSON.stringify(e)}`)
                },
                _translate: function(e, t) {
                    return this.get("tra.formatString")(e, t)
                },
                isLowSpec: a.Ember.computed("uxSettings", "uxSettings.data", "uxSettings.data.potatoModeEnabled", (function() {
                    return !!this.get("uxSettings.data.potatoModeEnabled")
                })),
                _waitForUnlock: function(e, t) {
                    const n = e.bind(this);
                    if (a.LockAndLoad.getLockState()) {
                        const e = function() {
                            a.LockAndLoad.removeEventListener("unlock", e), setTimeout((function() {
                                n(t)
                            }), 5e3)
                        };
                        a.LockAndLoad.addEventListener("unlock", e)
                    } else n(t)
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            var a = n(55);
            e.exports = (a.default || a).template({
                compiler: [7, ">= 4.0.0"],
                main: function(e, t, n, a, s) {
                    var i, o = null != t ? t : e.nullContext || {},
                        l = n.helperMissing,
                        r = "function",
                        c = e.escapeExpression;
                    return "<h4>" + c(typeof(i = null != (i = n.header || (null != t ? t.header : t)) ? i : l) === r ? i.call(o, {
                        name: "header",
                        hash: {},
                        data: s
                    }) : i) + '</h4>\r\n<hr class="heading-spacer" />\r\n<p>' + c(typeof(i = null != (i = n.body || (null != t ? t.body : t)) ? i : l) === r ? i.call(o, {
                        name: "body",
                        hash: {},
                        data: s
                    }) : i) + "</p>\r\n"
                },
                useData: !0
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1),
                s = n(23);
            const i = (0, a.emberDataBinding)({
                Ember: a.Ember,
                websocket: (0, a.getProvider)().getSocket(),
                boundProperties: {
                    championSkinCatalog: "/lol-catalog/v1/items/CHAMPION_SKIN",
                    emoteCatalog: "/lol-catalog/v1/items/EMOTE",
                    summonerIconCatalog: "/lol-catalog/v1/items/SUMMONER_ICON",
                    splitsConfig: "/lol-ranked/v1/splits-config",
                    myRankedStats: "/lol-ranked/v1/current-ranked-stats"
                }
            });
            e.exports = a.Ember.Service.extend(i, {
                getRewardData: function(e, t, n) {
                    if (e === s.CHAMPION_REWARD_TYPE) return this.getRewardFromCatalog(e, t, this.get("championSkinCatalog"));
                    if (e === s.EMOTE_REWARD_TYPE) return this.getRewardFromCatalog(e, t, this.get("emoteCatalog"));
                    if (e === s.SUMMONER_ICON_REWARD_TYPE) return this.getRewardFromCatalog(e, t, this.get("summonerIconCatalog"));
                    if (e === s.REGALIA_REWARD_TYPE) return this.getRegalia(e, t, n);
                    if (e === s.ETERNALS_CAPSULE_REWARD_TYPE) return this.getEternalsCapsule(e);
                    const i = this.getSplitNumber(t);
                    return {
                        imagePath: a.SummonerIconManager.getIconUrlById(3898),
                        split: i,
                        loc: this.getRewardLoc(e, i)
                    }
                },
                getRewardFromCatalog: function(e, t, n) {
                    if (!n) return null;
                    let a = n.find((function(e) {
                        return e.itemInstanceId === t
                    }));
                    a || (a = {});
                    const {
                        imagePath: s
                    } = a, i = this.getSplitNumber(t);
                    return {
                        imagePath: s,
                        split: i,
                        loc: this.getRewardLoc(e, i)
                    }
                },
                getRegalia: function(e, t, n) {
                    const a = this.getRegaliaLevelToShow(t);
                    this.getSplitNumber(t);
                    let i;
                    return i = n && n.transparent ? `${s.ASSET_PATH}images/Split_Reward_Level_${a}_Transparent.png` : n && n.small ? `${s.ASSET_PATH}images/Split_Reward_Level_${a}_Small.png` : `${s.ASSET_PATH}images/Split_Reward_Level_${a}.jpg`, {
                        imagePath: i,
                        loc: this.getRewardLoc(e, a)
                    }
                },
                getEternalsCapsule(e) {
                    return {
                        imagePath: "/lol-game-data/assets/ASSETS/Loot/Eternals/capsule.png",
                        loc: this.getRewardLoc(e)
                    }
                },
                getRewardLoc: function(e, t) {
                    let n = "LEAGUES_REWARD_ICON";
                    return e === s.EMOTE_REWARD_TYPE ? n = "LEAGUES_REWARD_EMOTE" : e === s.REGALIA_REWARD_TYPE ? n = "LEAGUES_REWARD_REGALIA" : e === s.ETERNALS_CAPSULE_REWARD_TYPE && (n = "LEAGUES_ETERNALS_CAPSULE"), this.get("tra").formatString(n, {
                        number: t
                    })
                },
                getSplitNumber: function(e) {
                    const t = this.get("splitsConfig.rewardInfoByRewardId");
                    return t && t[e] ? t[e].splitId : 0
                },
                getRegaliaLevelToShow: function(e) {
                    const t = this.get("numberOfNotEarnedRegalia"),
                        n = this.get(`splitsConfig.rewardInfoByRewardId.${e}`);
                    return t && void 0 !== t[n.splitId - 1] ? n.splitId - t[n.splitId - 1] : 0
                },
                regaliaRewards: a.Ember.computed("splitsConfig.rewardInfoByRewardId", (function() {
                    const e = this.get("splitsConfig.rewardInfoByRewardId");
                    return e ? Object.keys(e).map((t => e[t])).filter((e => e.rewardType === s.REGALIA_REWARD_TYPE)) : []
                })),
                numberOfNotEarnedRegalia: a.Ember.computed("myRankedStats.splitsProgress", "regaliaRewards.[]", "splitsConfig.currentSplitId", (function() {
                    const e = this.get("myRankedStats.splitsProgress"),
                        t = this.get("splitsConfig.currentSplitId"),
                        n = this.get("regaliaRewards");
                    if (!t || !e) return;
                    const a = [0];
                    for (let s = 0; s < n.length; s++) {
                        const i = n[s],
                            {
                                splitId: o
                            } = i,
                            l = e[o] || 0;
                        o < t && l < i.pointsRequired ? a[o] = a[o - 1] + 1 : a[o] = a[o - 1]
                    }
                    return a
                }))
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = function(e, t, n) {
                const s = document.createElement("div");
                s.className = "lol-leagues lol-leagues-full", s.type = "LeaguesRootComponent";
                const u = document.createElement("div");
                u.className = "lol-leagues lol-leagues-modal", u.type = "LeaguesRootComponent";
                const d = e.get("rcp-fe-lol-profiles").mainSection(),
                    p = e.get("rcp-fe-lol-profiles").overlaySection(),
                    m = c(d, s, n),
                    g = c(p, u, n),
                    h = a.Ember.Object.create();
                r(m, s, t, !1, null, h), r(g, u, t, !0), f = p, _ = g, f.addEventListener("showSubsection", ((e, t) => {
                    if (!t || !t.puuid) return;
                    const n = o + t.puuid;
                    (0, a.dataBinding)(i, (0, a.getProvider)().getSocket()).get(n).then((e => {
                        const t = null !== e && e.length > 0;
                        _.setEnabled(t), _.setTooltip(t ? null : a.Tra.get(l))
                    }))
                })), a.Tra.observe((() => {
                    _.tooltip && _.setTooltip(a.Tra.get(l))
                })), t.create("LeaguesNotificationsApp");
                var f, _
            };
            var a = n(1),
                s = n(23);
            const i = "/lol-ranked",
                o = "/v1/league-ladders/",
                l = "LEAGUES_UNRANKED_FRIEND";

            function r(e, t, n, s, i, o) {
                e.addEventListener("selected", (l => {
                    let r = null,
                        c = null;
                    if (a.Telemetry.startTracingEvent("profile-ranked-rendered"), !l || !l.summonerId) return o && o.set("refreshTopChamps", !0), i || (i = n.create("LeaguesRootComponent", o)), void i.componentPromise.then((() => {
                        t.appendChild(i.domNode)
                    }));
                    r = l.summonerId, c = l.puuid;
                    const u = n.create("LeaguesRootComponent", l ? a.Ember.Object.create({
                        summonerId: r,
                        puuid: c,
                        overlayMode: s
                    }) : a.Ember.Object.create());
                    t.appendChild(u.domNode), e.lastDisplayedLeagueComponent = u
                })), e.addEventListener("deselected", (() => function(e, t) {
                    if (e.lastDisplayedLeagueComponent) {
                        const {
                            lastDisplayedLeagueComponent: n
                        } = e;
                        t.removeChild(n.domNode), n.onRemove(), delete e.lastDisplayedLeagueComponent
                    }
                }(e, t)))
            }

            function c(e, t, n) {
                const i = e.registerSection({
                    id: s.PROFILE_RANKED_SUBSECTION_ID,
                    title: "RANKED",
                    priority: 3,
                    render: () => t,
                    enabled: !0
                });
                n.observe((() => {
                    i && i.setTitle(n.get("LEAGUES_PROFILE_SECTION_NAME"))
                }));
                let o = !1,
                    l = !1;
                (0, a.dataBinding)("/lol-platform-config", (0, a.getProvider)().getSocket()).observe("v1/namespaces/ClientSystemStates", (e => {
                    o = !e || e.leagueServiceEnabled, u(i, o, l, n)
                }));
                return (0, a.dataBinding)("/lol-ranked", (0, a.getProvider)().getSocket()).observe("v1/signed-ranked-stats", (e => {
                    l = Boolean(e), u(i, o, l, n)
                })), i
            }

            function u(e, t, n, a) {
                const s = t && n;
                e && (e.setEnabled(s), e.setTooltip(s ? null : a.get("LEAGUES_SERVICE_UNAVAILABLE")))
            }
        }],
        t = {};

    function n(a) {
        var s = t[a];
        if (void 0 !== s) return s.exports;
        var i = t[a] = {
            exports: {}
        };
        return e[a](i, i.exports, n), i.exports
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
    }, n.p = "/fe/lol-leagues/", (() => {
        "use strict";
        var e = a(n(1)),
            t = a(n(2));

        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        const s = "rcp-fe-lol-leagues",
            i = document.currentScript.ownerDocument;
        const o = window.getPluginAnnounceEventName(s);
        i.addEventListener(o, (function(a) {
            (0, a.registrationHandler)((function(a) {
                const i = a.get("rcp-fe-lol-l10n").tra().overlay("/fe/lol-l10n/trans.json").overlay("/fe/lol-leagues/trans.json").overlay("/fe/lol-social/trans.json");
                return e.default.init(a, {
                    AudioPlugin: e => e.get("rcp-fe-audio"),
                    CareerStatsAPI: e => e.get("rcp-fe-lol-career-stats"),
                    componentFactory: e => e.get("rcp-fe-common-libs").getComponentFactory("1"),
                    ContextMenuManager: e => e.get("rcp-fe-lol-uikit").getContextMenuManager(),
                    ContextualNotificationManager: e => e.get("rcp-fe-lol-uikit").getContextualNotificationManager(),
                    dataBinding: e => e.get("rcp-fe-common-libs").getDataBinding("rcp-fe-lol-leagues"),
                    Ember: e => e.get("rcp-fe-ember-libs").getEmber(),
                    emberDataBinding: e => e.get("rcp-fe-ember-libs").getEmberDataBinding("rcp-fe-lol-leagues"),
                    LeaguesConsts: e => e.get("rcp-fe-lol-shared-components").getApi_LeagueTierNames().getConstants(),
                    LeagueTierNames: e => e.get("rcp-fe-lol-shared-components").getApi_LeagueTierNames(),
                    LockAndLoad: e => e.get("rcp-fe-lol-lock-and-load"),
                    Lodash: e => e.get("rcp-fe-common-libs").getLodash("4"),
                    logger: e => e.get("rcp-fe-common-libs").logging.create(s),
                    lottie: e => e.get("rcp-fe-common-libs").getLottie("1"),
                    ModalManager: e => e.get("rcp-fe-lol-uikit").getModalManager(),
                    moment: e => e.get("rcp-fe-lol-l10n").moment(),
                    Parties: e => e.get("rcp-fe-lol-parties"),
                    playerNames: e => e.get("rcp-fe-common-libs").playerNames,
                    ProfilesAPI: e => e.get("rcp-fe-lol-profiles"),
                    RewardTrackerEmberComponents: e => e.get("rcp-fe-lol-shared-components").getRewardTrackerEmberComponents(),
                    SharedEmberComponents: e => e.get("rcp-fe-lol-shared-components").getSharedEmberComponents(),
                    Social: e => e.get("rcp-fe-lol-social"),
                    SummonerIconManager: e => e.get("rcp-fe-lol-uikit").getSummonerIconManager(),
                    Telemetry: e => e.get("rcp-fe-common-libs").getTelemetry("1"),
                    ToastCelebrationManager: e => e.get("rcp-fe-lol-uikit").getToastCelebrationManager(),
                    TooltipManager: e => e.get("rcp-fe-lol-uikit").getTooltipManager(),
                    Tra: i,
                    UIKit: e => e.get("rcp-fe-lol-uikit"),
                    VignetteCelebrationManager: e => e.get("rcp-fe-lol-uikit").getVignetteCelebrationManager()
                }).then((() => e.default.add({
                    emberApplicationFactory: e => e.get("rcp-fe-ember-libs").getEmberApplicationFactory()
                }))).then((() => {
                    const {
                        Ember: a
                    } = e.default, {
                        emberApplicationFactory: s,
                        componentFactory: o
                    } = e.default, l = (0, t.default)(a, i);
                    e.default.tra = i;
                    const r = n(3).default,
                        c = n(134).default;
                    return r(o, s, l), c(e.default.getProvider(), o, i), {}
                }))
            }))
        }), {
            once: !0
        })
    })()
})();