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
                            i = n._getValue(s, a);
                        i && i.then ? (i.then((function(e) {
                            e || console.warn("The promise for the key " + s + " resolved with a falsy value: ", e), n._addValue(s, e)
                        })), t.push(i)) : n._addValue(s, i)
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
        }, e => {
            "use strict";

            function t(e) {
                const n = {};
                for (const s in e) "object" == typeof e[s] ? n[s] = t(e[s]) : n[s] = e[s];
                return n
            }

            function n(e, t, n) {
                const {
                    regions: s,
                    region: a,
                    locale: i
                } = e.metadata();
                if ((n = n.get("metadata." + t)) && "region" === t && n.id !== a.id) {
                    const t = s[n.id],
                        a = t.defaultLocale ? t.defaultLocale.id : t.availableLocales[0].id;
                    e.setLocale(a, n.id)
                } else n && "locale" === t && n.id !== i.id && e.setLocale(n.id)
            }
            e.exports = function(e, s, a) {
                let i;
                const o = {
                    metadata: !0,
                    moment: !0
                };
                return s = s.observe((() => {
                    if (i) {
                        const e = t(s.metadata());
                        i.set("metadata", e), i.beginPropertyChanges(), Object.keys(o).forEach((e => {
                            i.propertyWillChange(e), i.propertyDidChange(e)
                        })), i.endPropertyChanges()
                    }
                })), i = e.Service.extend({
                    _tra: null,
                    init() {
                        this.wrapTra(s)
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
                }).create(), i.set("service", i), i.addObserver("metadata.region", n.bind(null, s, "region")), i.addObserver("metadata.locale", n.bind(null, s, "locale")), a && (console.warning("deprecated: pass a traService as a property of your Ember application definition"), a.register("tra:main", i, {
                    instantiate: !1
                }), a.inject("component", "tra", "tra:main"), a.inject("controller", "tra", "tra:main"), a.inject("view", "tra", "tra:main"), a.inject("model", "tra", "tra:main"), a.inject("route", "tra", "tra:main"), a.inject("service", "tra", "tra:main")), i
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = function(e, t, s) {
                const {
                    SharedEmberComponents: i,
                    ProfilesAPI: o,
                    RewardTrackerEmberComponents: l
                } = a.default, r = o.getRankedReferenceButton(), {
                    PlayerNameComponent: c
                } = i;
                t.setFactoryDefinition({
                    name: "LeaguesRootComponent",
                    tra: s,
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
                    tra: s,
                    ComponentFactory: e,
                    LeaguesPromotionVignetteV2Component: n(91)
                }), t.setFactoryDefinition({
                    name: "LeaguesRewardVignetteComponent",
                    tra: s,
                    ComponentFactory: e,
                    LeaguesRewardVignetteComponent: n(95)
                }), t.setFactoryDefinition({
                    name: "RatedPromotionVignetteComponent",
                    tra: s,
                    ComponentFactory: e,
                    LeaguesPromotionVignetteComponent: n(98)
                }), t.setFactoryDefinition({
                    name: "CherryRatedPromotionVignetteComponent",
                    tra: s,
                    ComponentFactory: e,
                    LeaguesPromotionVignetteComponent: n(101)
                }), t.setFactoryDefinition({
                    name: "LeaguesNotificationsApp",
                    tra: s,
                    ComponentFactory: e,
                    NotificationsRootComponent: n(113),
                    SeasonStartModalComponent: n(115),
                    SplitNotificationsComponent: n(118),
                    SplitStartModalComponent: n(121),
                    EosNotificationsComponent: n(124),
                    SeasonMemorialModalComponent: n(127),
                    LeaguesDialogsComponent: n(130),
                    RewardsService: n(133),
                    CareerStatsService: a.default.CareerStatsAPI.getCareerStatsService()
                })
            };
            var s, a = (s = n(1)) && s.__esModule ? s : {
                default: s
            }
        }, (e, t, n) => {
            "use strict";
            var s = n(1),
                a = n(5),
                i = function(e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || "object" != typeof e && "function" != typeof e) return {
                        default: e
                    };
                    var n = l(t);
                    if (n && n.has(e)) return n.get(e);
                    var s = {},
                        a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var i in e)
                        if ("default" !== i && Object.prototype.hasOwnProperty.call(e, i)) {
                            var o = a ? Object.getOwnPropertyDescriptor(e, i) : null;
                            o && (o.get || o.set) ? Object.defineProperty(s, i, o) : s[i] = e[i]
                        } s.default = e, n && n.set(e, s);
                    return s
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
                u = (0, s.emberDataBinding)({
                    Ember: s.Ember,
                    websocket: (0, s.getProvider)().getSocket(),
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
            e.exports = s.Ember.Component.extend(u, {
                classNames: ["leagues-root-component"],
                layout: n(26),
                leagues: null,
                leaguesQueueOrders: i.SUMMONER_QUEUE_ORDER,
                leaguesQueues: a.QUEUES.ALL_RANKED_AND_RATED_QUEUE_TYPES,
                isLoading: !0,
                selectedState: null,
                spectatableSummonerNames: [],
                spectatableSummonerIds: [],
                leagueTierNames: s.LeagueTierNames,
                leagueTypeSelected: "summoner",
                honorLevel: 0,
                rankedService: (0, s.dataBinding)("/lol-ranked", (0, s.getProvider)().getSocket()),
                chatService: (0, s.dataBinding)("/lol-chat", (0, s.getProvider)().getSocket()),
                spectatorService: s.Ember.inject.service("spectator"),
                init: function() {
                    this._super(...arguments);
                    const e = this.get("chatService");
                    this.set("leagues", s.Ember.Object.create({
                        apexQueueInfoByQueueAndTier: {}
                    })), this.set("ratedLadderByQueueType", s.Ember.Object.create({})), this.set("selectedState", s.Ember.Object.create()), e.observe("/v1/friends", this, this._handleFriendsData)
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
                summonerReadyChanged: s.Ember.observer("summonerReady", (function() {
                    const e = this.get("summonerReady"),
                        t = this.get("summonerId"),
                        n = this.get("honorProfile"),
                        s = this.get("puuid"),
                        a = this.get("rankedService"),
                        i = `/v1/league-ladders/${s}`;
                    if (!e) return;
                    const o = this.get("currentSummoner");
                    this.set("viewerId", o.summonerId), n && this.set("honorLevel", n.honorLevel), t && o.summonerId !== t ? a.observe(i, this, this._handleSummonerLeaguesData) : (this.set("summonerId", o.summonerId), this.set("puuid", o.puuid), a.observe("/v1/current-ranked-stats", this, this._handleCurrentRankedStatsUpdate))
                })),
                _handleCurrentRankedStatsUpdate: function(e) {
                    if (!e) return;
                    this.set("rewardsProgress", e.splitsProgress);
                    const t = this.get("rankedService"),
                        n = `/v1/league-ladders/${this.get("puuid")}`,
                        s = this._handleSummonerLeaguesData.bind(this);
                    t.get(n, {
                        skipCache: !0
                    }).then((e => {
                        s(e)
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
                        const s = {};
                        s[n] = e, this.set(`leagues.apexQueueInfoByQueueAndTier.${t}`, s)
                    }
                },
                _getCachedApexLeagues: function(e) {
                    const t = this.get(`leagues.apexQueueInfoByQueueAndTier.${e}`);
                    return Object.keys(t).map((e => (t[e].divisions || []).find((t => t && t.tier === e))))
                },
                _handleFriendsData: function(e) {
                    e && this.set("friendsIdSet", new Set(s.Lodash.map(e, (e => e.summonerId))))
                },
                defaultLeagueObserver: s.Ember.observer("isLoading", "leagues.summonerLeagues", (function() {
                    if (this.get("isLoading")) return;
                    const e = this.get("leagues.summonerLeagues"),
                        t = this.get("highestRankedQueueType") || this.get("leaguesQueues.0"),
                        n = s.Lodash.find(e, {
                            queueType: t
                        });
                    n && this._selectLeague(n)
                })),
                _selectLeague: function(e, t) {
                    this.set("spectatableSummonerNames", []), this.set("spectatableSummonerIds", []);
                    const n = e && this.leagueTierNames.isApexForQueue(e),
                        s = this._selectDivisionFromLeague(e, n),
                        a = this._selectStandingFromDivision(s);
                    this.get("selectedState").setProperties({
                        league: e,
                        division: s,
                        standing: a,
                        isViewingTopPlayers: t || n && !this.get("isViewingLocalSummoner"),
                        isViewingApexTier: n,
                        isViewingRatedLadder: !1
                    }), this._animateLeagueChange()
                },
                _selectDivisionFromLeague: function(e, t) {
                    let n;
                    return n = t ? s.Lodash.find(e.divisions, {
                        tier: e.requestedRankedEntry && e.requestedRankedEntry.tier || e.tier
                    }) : s.Lodash.find(e.divisions, {
                        division: e.requestedRankedEntry && e.requestedRankedEntry.division
                    }), n || (n = e.divisions[0]), n
                },
                _selectStandingFromDivision: function(e) {
                    if (!e || !e.standings) return null;
                    const t = this.get("summonerId"),
                        n = s.Lodash.find(e.standings, (e => e.summonerId === t));
                    return n || e.standings[0]
                },
                _applyRelationshipsToQueuesStandings: function(e) {
                    e && s.Lodash.forEach(e, (e => {
                        s.Lodash.forEach(e.divisions, (e => {
                            s.Lodash.forEach(e.standings, (e => {
                                this._applyRelationship(e)
                            }))
                        }))
                    }))
                },
                _applyRelationship: function(e) {
                    const t = e.summonerId,
                        n = this.get("viewerId"),
                        s = this.get("friendsIdSet");
                    let a = null;
                    s && s.has(t) && (a = i.StandingRelationship.FRIEND), e.set("relationship", n === t ? i.StandingRelationship.SELF : a)
                },
                _fillInDivisions: function(e, t) {
                    const n = [];
                    let a, i;
                    return t ? (a = s.LeaguesConsts.APEX_TIERS.slice(), i = "tier") : (a = s.LeaguesConsts.DIVISIONS.slice(), i = "division"), a.forEach((a => {
                        let o, l, r = s.Lodash.filter(e.divisions, (e => e && e[i] === a))[0];
                        t ? (l = a, o = "I") : (l = e.tier, o = a), r || (r = {
                            division: o,
                            tier: l,
                            standings: []
                        }), n.push(r)
                    })), n
                },
                enrichSummonerLeaguesData: function(e, t) {
                    const n = this.get("leaguesQueueOrders"),
                        a = s.Lodash.sortBy(e, (e => n[e.queueType])),
                        i = s.Lodash.each(a, (e => {
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
                arrayToEmberObjects: e => s.Lodash.map(e, (e => s.Ember.Object.create(e))),
                _getSummonerStandingsForSpecificApexTier: function(e, t) {
                    return s.Lodash.find(e, (e => e.tier === t)).standings
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
                isAnimationEnabled: s.Ember.computed("uxSettings.data.potatoModeEnabled", (function() {
                    return !this.get("uxSettings.data.potatoModeEnabled")
                })),
                bannerProperties: s.Ember.computed("selectedState.standing.puuid", "selectedState.league.queueType", "selectedState.standing.wins", "selectedState.standing.losses", "selectedState.division.division", "selectedState.division.tier", "selectedState.standing.division", "selectedState.standing.tier", "selectedState.league.tier", "selectedState.league.provisionalGameThreshold", "selectedState.standing.provisionalGamesRemaining", "selectedState.standing.isProvisional", "selectedState.standing.points", "selectedState.standing.position", (function() {
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
                showingPlayerNotRanked: s.Ember.computed("selectedState.league", "selectedState.isViewingTopPlayers", "selectedState.isViewingRatedLadder", (function() {
                    if (this.get("selectedState.isViewingRatedLadder")) return !1;
                    const e = this.get("selectedState.league"),
                        t = this.get("selectedState.isViewingTopPlayers");
                    return !e || !this.get("selectedState.league.requestedRankedEntry") && !t
                })),
                showingRewards: s.Ember.computed("isViewingLocalSummoner", "splitsConfig.currentSplit", "rewardsProgress", "isViewingCherry", (function() {
                    const e = this.get("isViewingLocalSummoner"),
                        t = !!this.get("splitsConfig.currentSplit"),
                        n = null !== this.get("rewardsProgress");
                    return e && t && n && !this.get("isViewingCherry")
                })),
                isShowingLol: s.Ember.computed("isViewingTft", "isViewingCherry", (function() {
                    return !this.get("isViewingTft") && !this.get("isViewingCherry")
                })),
                isShowingSplitEndCountdown: s.Ember.computed("showingRewards", "isViewingTft", (function() {
                    return this.get("showingRewards") && !this.get("isViewingTft")
                })),
                splitTimeRemainingText: s.Ember.computed("splitsConfig.currentSplit.endTimeMillis", (function() {
                    const e = this.get("splitsConfig.currentSplit.endTimeMillis") - Date.now(),
                        t = this.get("tra");
                    if (!t) return "";
                    const n = Math.floor(e / r),
                        s = Math.floor(e % r / c),
                        a = Math.floor(e % c / 6e4);
                    return t.formatString("RANK_REWARDS_SPLIT_COUNTDOWN", {
                        daysRemaining: n,
                        hoursRemaining: s,
                        minutesRemaining: a
                    })
                })),
                isViewingTft: s.Ember.computed("selectedState.league", (function() {
                    return (0, o.isTftQueueType)(this.get("selectedState.league.queueType"))
                })),
                isViewingCherry: s.Ember.computed("selectedState.league", (function() {
                    return "CHERRY" === this.get("selectedState.league.queueType")
                })),
                nextUpdateMillis: s.Ember.computed("selectedState.league.nextApexUpdateMillis", "selectedState.league.nextRatedUpdateMillis", (function() {
                    const e = this.get("selectedState.league") || {};
                    return e.nextApexUpdateMillis || e.nextRatedUpdateMillis
                })),
                currentSeasonYear: s.Ember.computed("currentSeason.seasonStart", (function() {
                    const e = this.get("currentSeason.seasonStart");
                    return e ? new Date(e).getFullYear() : (new Date).getFullYear()
                })),
                seasonNameText: s.Ember.computed("isViewingCherry", "isViewingTft", "tftSets", "currentSeasonYear", "currentSeason.metadata.currentSplit", (function() {
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
                viewedSummonerId: s.Ember.computed("summonerId", "currentSummoner.summonerId", (function() {
                    return this.get("summonerId") || this.get("currentSummoner.summonerId")
                })),
                isViewingLocalSummoner: s.Ember.computed("currentSummoner.summonerId", "summonerId", (function() {
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
                        const n = s.Lodash.find(t, (t => t.queueType === e));
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
                faqText: s.Ember.computed("isViewingTft", (function() {
                    return this.get("isViewingTft") ? this.get("tra.LEAGUES_FAQ_LINK_LABEL_TFT") : this.get("tra.LEAGUES_FAQ_LINK_LABEL")
                })),
                faqUrl: s.Ember.computed("isViewingTft", (function() {
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
                    return s.default
                }
            }), Object.defineProperty(t, "PROFILE_PRIVACY", {
                enumerable: !0,
                get: function() {
                    return r.default
                }
            }), Object.defineProperty(t, "QUEUES", {
                enumerable: !0,
                get: function() {
                    return a.default
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
            var s = u(n(6)),
                a = u(n(17)),
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
            var s = m(n(7)),
                a = m(n(8)),
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
                COMPONENT_TYPES: s.default,
                CURRENCY_TYPES: a.default,
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
                s = "RANKED_FLEX_SR",
                a = "RANKED_FLEX_TT",
                i = "CHERRY",
                o = "RANKED_TFT",
                l = "RANKED_TFT_DOUBLE_UP",
                r = "RANKED_TFT_TURBO",
                c = "RANKED_TFT_PAIRS",
                u = [n, s],
                d = [...u, a],
                p = [i],
                m = [o, l],
                g = [r, c],
                h = [...m, ...g],
                f = [...d, ...m],
                _ = [...g, ...p];
            var E = {
                RANKED_SOLO_5x5_QUEUE_TYPE: n,
                RANKED_FLEX_SR_QUEUE_TYPE: s,
                RANKED_FLEX_TT_QUEUE_TYPE: a,
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
                s = {
                    PRIVATE: "PRIVATE",
                    PUBLIC: "PUBLIC"
                };
            var a = {
                ProfilePrivacyEnabledState: n,
                ProfilePrivacySetting: s,
                DEFAULT_PROFILE_PRIVACY: {
                    enabledState: n.UNKNOWN,
                    setting: s.PUBLIC
                }
            };
            t.default = a
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
            const s = 36e5,
                a = 864e5,
                i = 6048e5,
                o = {
                    MILLISECONDS_IN_A_SECOND: 1e3,
                    MILLISECONDS_IN_A_MINUTE: 6e4,
                    MILLISECONDS_IN_A_HOUR: s,
                    MILLISECONDS_IN_A_DAY: a,
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
            var s = n(5);
            t.ASSET_PATH = "fe/lol-static-assets/";
            t.LOTTIE_JSON_PATH = "fe/lol-leagues/";
            t.PROMOTE_COUNTDOWN_INTERVAL_MS = 1e3;
            t.SEASON_YEAR_BASE = 2010;
            const a = {
                [s.QUEUES.RANKED_SOLO_5x5_QUEUE_TYPE]: 10,
                [s.QUEUES.RANKED_FLEX_SR_QUEUE_TYPE]: 20,
                [s.QUEUES.RANKED_FLEX_TT_QUEUE_TYPE]: 30,
                [s.QUEUES.RANKED_TFT_QUEUE_TYPE]: 40,
                [s.QUEUES.RANKED_TFT_DOUBLE_UP_QUEUE_TYPE]: 50,
                [s.QUEUES.RANKED_TFT_TURBO_QUEUE_TYPE]: 60,
                [s.QUEUES.RANKED_TFT_PAIRS_QUEUE_TYPE]: 70
            };
            t.SUMMONER_QUEUE_ORDER = a;
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
                return s.QUEUES.RANKED_AND_RATED_TFT_QUEUE_TYPES.includes(e)
            };
            var s = n(5)
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "RXL7bDSN",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-root-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-root-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-root-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["loading-spinner ",["helper",["unless"],[["get",["isLoading"]],"loading-fade-out"],null]]]],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["smoke-background-container ",["helper",["if"],[["get",["showingPlayerNotRanked"]],"removed"],null]]]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-parallax-background",[]],["dynamic-attr","animated",["concat",[["unknown",["isAnimationEnabled"]]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["ranked-intro-background ",["helper",["unless"],[["get",["showingPlayerNotRanked"]],"removed"],null]]]],["flush-element"],["close-element"],["text","\\n"],["block",["render-telemetry-sender"],null,[["renderEventName"],["profile-ranked-rendered"]],7]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["ranked-rewards"],null,[["rewardsProgress","honorLevel","splitsConfig","hidingRewards","myRankedStats","victoriousSkinItemInstanceId"],[["get",["rewardsProgress"]],["get",["honorLevel"]],["get",["splitsConfig"]],["get",["isViewingTft"]],["get",["myRankedStats"]],["get",["splitsConfig","currentSplit","victoriousSkinRewardGroup","itemInstanceId"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["helper",["ranked-banner"],null,[["puuid","queueType","tier","division","ladderRank","leaguePoints","miniseries","games","isAnimationEnabled","provisionalGameThreshold","provisionalGamesRemaining","isProvisional"],[["get",["bannerProperties","puuid"]],["get",["bannerProperties","queueType"]],["get",["bannerProperties","tier"]],["get",["bannerProperties","division"]],["get",["bannerProperties","ladderRank"]],["get",["bannerProperties","leaguePoints"]],["get",["bannerProperties","miniseries"]],["get",["bannerProperties","games"]],["get",["isAnimationEnabled"]],["get",["bannerProperties","provisionalGameThreshold"]],["get",["bannerProperties","provisionalGamesRemaining"]],["get",["bannerProperties","isProvisional"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["helper",["rated-badge"],null,[["puuid","summoner","queueType"],[["get",["puuid"]],["get",["currentSummoner"]],["get",["selectedState","league","queueType"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-wrapper"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","lol-leagues-left-container"],["flush-element"],["text","\\n            "],["append",["helper",["rank-standing"],null,[["selectedState","selectDivision","selectStanding","spectatableSummonerNames","spectatableSummonerIds","showingRewards","spectateBySummonerIdEnabled","onSelectApexLeague"],[["get",["selectedState"]],"selectDivision",["helper",["action"],[["get",[null]],"selectStanding"],null],["get",["spectatableSummonerNames"]],["get",["spectatableSummonerIds"]],["get",["showingRewards"]],["get",["spectateBySummonerIdEnabled"]],["helper",["action"],[["get",[null]],"selectApexLeague"],null]]]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","lol-leagues-right-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["selectedState","isViewingRatedLadder"]]],null,2,1],["text","          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["ranked-intro"],null,[["league"],[["get",["selectedState","league"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","lol-leagues-header-split-info-remaining-time-container"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","lol-leagues-header-split-info-remaining-time-icon"],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","lol-leagues-header-split-info-remaining-time"],["flush-element"],["append",["unknown",["splitTimeRemainingText"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","ranked-reference-modal-button-container"],["flush-element"],["text","\\n                    "],["append",["helper",["ranked-reference-modal-button"],null,[["queueType"],[["get",["selectedState","league","queueType"]]]]],false],["text","\\n                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["lol-leagues-container ",["helper",["if"],[["get",["isLoading"]],"loading-hidden","loading-fade-in"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["lol-leagues-display-area ",["unknown",["animationClass"]]]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-info-header-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","lol-leagues-info-season-header"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","lol-leagues-season-info-container"],["flush-element"],["text","\\n            "],["append",["unknown",["seasonNameText"]],false],["text","\\n"],["block",["if"],[["get",["isShowingLol"]]],null,6],["text","          "],["close-element"],["text","\\n"],["block",["if"],[["get",["isShowingSplitEndCountdown"]]],null,5],["text","        "],["close-element"],["text","\\n        "],["append",["helper",["leagues-countdowns"],null,[["league","myRankedStats","nextUpdateMillis","isViewingApexTier","isViewingRatedLadder","onRefresh"],[["get",["selectedState","league"]],["get",["myRankedStats"]],["get",["nextUpdateMillis"]],["get",["selectedState","isViewingApexTier"]],["get",["selectedState","isViewingRatedLadder"]],["helper",["action"],[["get",[null]],"refreshRankings"],null]]]],false],["text","\\n      "],["close-element"],["text","\\n"],["block",["if"],[["get",["showingPlayerNotRanked"]]],null,4,3],["text","    "],["close-element"],["text","\\n"],["block",["if"],[["get",["showingRewards"]]],null,0],["text","    "],["append",["helper",["rank-queue-dropdown"],null,[["overlayMode","selectedLeague","leagues","leagueTypeSelected","challengerLaddersEnabled","topRatedLaddersEnabled","tooltipMessages","onSelectLeagueType"],[["get",["overlayMode"]],["get",["selectedState","league"]],["get",["leagues"]],["get",["leagueTypeSelected"]],["get",["challengerLaddersEnabled"]],["get",["topRatedLaddersEnabled"]],["get",["tooltipMessages"]],"selectLeagueType"]]],false],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-faq-right"],["flush-element"],["text","\\n      "],["open-element","a",[]],["dynamic-attr","href",["concat",[["unknown",["faqUrl"]]]]],["static-attr","target","_new"],["static-attr","class","lol-leagues-faq-btn"],["flush-element"],["append",["unknown",["faqText"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1);
            n(28), e.exports = s.Ember.Component.extend({
                classNames: ["leagues-countdowns-component"],
                layout: n(29),
                leagueTierNames: s.LeagueTierNames,
                isValidDaysUntilDecay: s.Ember.computed("daysUntilDecay", (function() {
                    const e = this.get("daysUntilDecay");
                    return null != e && e >= -1
                })),
                daysUntilDecay: s.Ember.computed("league", "myRankedStats", "isViewingApexTier", (function() {
                    const e = this.get("league"),
                        t = this.get("myRankedStats"),
                        n = this.get("isViewingApexTier");
                    if (!e || !t || !t.queues) return null;
                    const {
                        queueType: s
                    } = e;
                    for (const e of t.queues)
                        if (e.queueType === s && this.leagueTierNames.isApexForQueue(e) === n && e.warnings) return e.warnings.daysUntilDecay;
                    return null
                })),
                shouldDisplayDecayWarningInDays: s.Ember.computed("isValidDaysUntilDecay", "shouldDisplayDecayWarningInCountdownTimer", (function() {
                    const e = this.get("isValidDaysUntilDecay"),
                        t = this.get("shouldDisplayDecayWarningInCountdownTimer");
                    return e && !t
                })),
                decayWarningText: s.Ember.computed("daysUntilDecay", "isViewingApexTier", (function() {
                    const e = this.get("daysUntilDecay");
                    return this.get("isViewingApexTier") && e <= 0 ? this.get("tra.RANKED_DECAY_NEXT_UPDATE") : this.get("tra.RANKED_DECAY_GENERIC")
                })),
                decayWarningDaysRemaining: s.Ember.computed("daysUntilDecay", (function() {
                    const e = this.get("daysUntilDecay");
                    return e > 0 ? this.get("tra").formatString("RANKED_DAYS", {
                        days: e
                    }) : ""
                })),
                shouldDisplayDecayWarningInCountdownTimer: s.Ember.computed("isValidDaysUntilDecay", "daysUntilDecay", "isViewingApexTier", (function() {
                    const e = this.get("isValidDaysUntilDecay"),
                        t = this.get("daysUntilDecay"),
                        n = this.get("isViewingApexTier");
                    return e && !n && (0 === t || -1 === t)
                })),
                countdownLabel: s.Ember.computed("shouldDisplayDecayWarningInCountdownTimer", "decayWarningText", (function() {
                    return this.get("shouldDisplayDecayWarningInCountdownTimer") ? this.get("decayWarningText") : this.get("tra.RANKED_NEXT_LADDER_UPDATE_COUNTDOWN_LABEL")
                })),
                isDecayUrgent: s.Ember.computed("isValidDaysUntilDecay", "daysUntilDecay", (function() {
                    const e = this.get("isValidDaysUntilDecay"),
                        t = this.get("daysUntilDecay");
                    return e && t <= 0
                })),
                shouldCountdownTimerBeUrgent: s.Ember.computed("isDecayUrgent", "shouldDisplayDecayWarningInCountdownTimer", (function() {
                    const e = this.get("isDecayUrgent"),
                        t = this.get("shouldDisplayDecayWarningInCountdownTimer");
                    return e && t
                })),
                shouldDisplayCountdownTimer: s.Ember.computed("isViewingApexTier", "isViewingRatedLadder", "shouldDisplayDecayWarningInCountdownTimer", "nextUpdateMillis", (function() {
                    const e = this.get("isViewingApexTier"),
                        t = this.get("isViewingRatedLadder"),
                        n = this.get("shouldDisplayDecayWarningInCountdownTimer"),
                        s = this.get("nextUpdateMillis");
                    return (n || e || t) && s > 0
                }))
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "SYCIU8S1",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-countdowns\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-countdowns\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-countdowns\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-leagues-info-leagues-countdowns-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["shouldDisplayDecayWarningInDays"]]],null,5],["block",["if"],[["get",["shouldDisplayCountdownTimer"]]],null,2],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["text","\\n              "],["append",["helper",["sanitize"],[["get",["tra","RANKED_DECAY_TOOLTIP"]]],null],false],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-info-icon",[]],["static-attr","class","ranked-reference-modal-question-mark"],["flush-element"],["text","\\n        "],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["right"]],0]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-countdown-timer-wrapper"],["flush-element"],["text","\\n      "],["append",["helper",["countdown-timer"],null,[["countdownLabel","countdownToTime","isUrgent","onRefresh"],[["get",["countdownLabel"]],["get",["nextUpdateMillis"]],["get",["shouldCountdownTimerBeUrgent"]],["helper",["action"],[["get",[null]],["get",["onRefresh"]]],null]]]],false],["text","\\n"],["block",["if"],[["get",["shouldDisplayDecayWarningInCountdownTimer"]]],null,1],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["text","\\n            "],["append",["helper",["sanitize"],[["get",["tra","RANKED_DECAY_TOOLTIP"]]],null],false],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","         \\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["lol-leagues-decay-warning-countdown ",["helper",["if"],[["get",["isDecayUrgent"]],"decay-urgent"],null]]]],["flush-element"],["text","\\n          "],["append",["unknown",["decayWarningDaysRemaining"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["lol-leagues-decay-warning ",["helper",["if"],[["get",["isDecayUrgent"]],"decay-urgent"],null]]]],["flush-element"],["text","\\n      "],["append",["unknown",["decayWarningText"]],false],["text","\\n"],["block",["if"],[["get",["decayWarningDaysRemaining"]]],null,4],["text","      "],["open-element","lol-uikit-info-icon",[]],["static-attr","class","ranked-reference-modal-question-mark"],["flush-element"],["text","\\n      "],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["right"]],3],["text","    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1);
            n(31), e.exports = s.Ember.Component.extend({
                classNames: ["miniseries-results-component"],
                layout: n(32)
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "ivri3ZcO",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\miniseries-results\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\miniseries-results\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\miniseries-results\\\\index.js\\" "],["text","\\n"],["open-element","ul",[]],["static-attr","class","lol-leagues-miniseries-status-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["results"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","li",[]],["dynamic-attr","class",["concat",["lol-leagues-miniseries-status-item ",["get",["result"]]," ",["unknown",["showingAsSelf"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["result"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1);
            n(34), e.exports = s.Ember.Component.extend({
                classNames: ["ranked-banner-component"],
                classNameBindings: ["isProvisional:provisional", "isAnimationEnabled::low-spec"],
                leagueTierNames: s.LeagueTierNames,
                displayedPuuid: null,
                displayedQueueType: null,
                displayedTier: null,
                displayedDivision: null,
                displayedRegaliaLevel: 0,
                displayedPreviousTier: "",
                rankedService: (0, s.dataBinding)("/lol-ranked", (0, s.getProvider)().getSocket()),
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
                    e && t && (0, s.dataBinding)("lol-ranked").get(`/v1/ranked-stats/${e}`, {
                        skipCache: !0
                    }).then((n => {
                        this.setRankedData(e, t, n)
                    }))
                },
                setRankedData(e, t, n) {
                    e && t && n && this.get("displayedPuuid") === e && this.get("displayedQueueType") === t && (n && n.rankedRegaliaLevel ? this.set("displayedRegaliaLevel", n.rankedRegaliaLevel) : this.set("displayedRegaliaLevel", 0), n.queueMap && n.queueMap[t] && n.queueMap[t].previousSeasonEndTier && n.queueMap[t].previousSeasonEndTier !== s.LeaguesConsts.TIER_NAME_NONE ? this.set("displayedPreviousTier", n.queueMap[t].previousSeasonEndTier) : this.set("displayedPreviousTier", ""), n.queueMap && n.queueMap[t] && n.queueMap[t].tier && n.queueMap[t].tier !== s.LeaguesConsts.TIER_NAME_NONE ? this.set("displayedTier", n.queueMap[t].tier) : this.set("displayedTier", ""), n.queueMap && n.queueMap[t] && n.queueMap[t].division ? this.set("displayedDivision", n.queueMap[t].division) : this.set("displayedDivision", ""))
                },
                layout: n(35),
                unranked: s.Ember.computed("tier", "displayedTier", (function() {
                    const e = this.get("tier"),
                        t = this.get("displayedTier");
                    return !e || e === s.LeaguesConsts.TIER_NAME_UNRANKED || e === s.LeaguesConsts.TIER_NAME_NONE || !t || t === s.LeaguesConsts.TIER_NAME_UNRANKED || t === s.LeaguesConsts.TIER_NAME_NONE
                })),
                hasApexLadderRank: s.Ember.computed("tier", "ladderRank", (function() {
                    return s.LeaguesConsts.APEX_TIERS.includes(this.get("tier")) && this.get("ladderRank")
                })),
                isProvisional: s.Ember.computed("isProvisional", (function() {
                    return this.get("isProvisional")
                })),
                provisionalGamesProgressText: s.Ember.computed("provisionalGameThreshold", "provisionalGamesRemaining", (function() {
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
                apexLadderRank: s.Ember.computed("tra", "hasApexLadderRank", "ladderRank", (function() {
                    return this.get("tra").formatString("LEAGUES_BANNER_APEX_LADDER_RANK", {
                        ladderRank: this.get("ladderRank")
                    })
                })),
                showLeaguePoints: s.Ember.computed("unranked", "leaguePoints", (function() {
                    return "number" == typeof this.get("leaguePoints") && !this.get("unranked")
                })),
                leaguePointsString: s.Ember.computed("leaguePoints", "tier", (function() {
                    const e = s.LeaguesConsts.APEX_TIERS.includes(this.get("tier")) ? this.get("leaguePoints") : Math.min(100, this.get("leaguePoints"));
                    return this.leagueTierNames.getLpLoc(e)
                })),
                tierDivisionLabel: s.Ember.computed("tier", "division", (function() {
                    const e = this.get("tier"),
                        t = this.get("division");
                    return this.leagueTierNames.getFullTierDivisionName(e, t)
                }))
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "augRUsB9",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-banner\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-banner\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-banner\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["isProvisional"]]],null,7],["text","\\n"],["open-element","lol-regalia-ranked-banner-v2-element",[]],["static-attr","animations","false"],["static-attr","banner-type","lastSeasonHighestRank"],["dynamic-attr","banner-rank",["concat",[["unknown",["displayedPreviousTier"]]]]],["static-attr","animation-config","{\\"topFadeEnd\\": 1, \\"topFadeStart\\": 0.15}"],["flush-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","ranked-banner-contents-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","banner-spacer"],["flush-element"],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","banner-ranked-emblem-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","banner-regalia-crest-sizer"],["flush-element"],["text","\\n        "],["open-element","lol-regalia-emblem-element",[]],["dynamic-attr","ranked-tier",["helper",["if"],[["get",["unranked"]],"unranked",["get",["displayedTier"]]],null],null],["flush-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["isProvisional"]]],null,4,3],["text","\\n    "],["open-element","div",[]],["static-attr","class","banner-tier-division-label"],["flush-element"],["text","\\n        "],["append",["unknown",["tierDivisionLabel"]],false],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["banner-league-points-display ",["helper",["unless"],[["get",["showLeaguePoints"]],"hidden"],null]]]],["flush-element"],["text","\\n        "],["append",["unknown",["leaguePointsString"]],false],["text","\\n    "],["close-element"],["text","\\n\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","banner-apex-ladder-rank"],["flush-element"],["text","\\n        "],["append",["unknown",["apexLadderRank"]],false],["text","\\n      "],["close-element"],["text","\\n    "]],"locals":[]},{"statements":[["block",["if"],[["get",["hasApexLadderRank"]]],null,0]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","banner-miniseries-progress"],["flush-element"],["text","\\n        "],["append",["helper",["miniseries-results"],null,[["results","showingAsSelf"],[["get",["miniseries"]],true]]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["miniseries"]]],null,2,1]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","banner-provisional-text-container"],["flush-element"],["text","\\n        "],["append",["unknown",["provisionalGamesProgressText"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","provisional-banner-static"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","uikit-video",[]],["static-attr","id","provisional-banner-loop"],["static-attr","src","/fe/lol-static-assets/videos/provisional-banner-loop.webm"],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isAnimationEnabled"]]],null,6,5]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1),
                a = n(23);
            n(37);
            const i = {
                RANKED_SOLO_5x5: 420,
                RANKED_FLEX_SR: 440,
                RANKED_FLEX_TT: 470
            };
            e.exports = s.Ember.Component.extend({
                classNames: ["ranked-intro-component"],
                layout: n(38),
                parties: s.Parties,
                queueType: s.Ember.computed("league.queueType", (function() {
                    return this.get("league.queueType")
                })),
                queueTypeQueueId: s.Ember.computed("queueType", (function() {
                    return i[this.get("queueType")] || 0
                })),
                hideQueueUpButton: s.Ember.computed("queueTypeQueueId", (function() {
                    return 0 === this.get("queueTypeQueueId")
                })),
                rankedIntroSections: s.Ember.computed("queueType", "league.isPositionRanks", "tra", "tra.RANKED_INTRO_RANKED_SOLO_5x5_SECTION_1_TITLE", "tra.RANKED_INTRO_RANKED_SOLO_5x5_SECTION_1_BODY", "tra.RANKED_INTRO_RANKED_FLEX_SR_SECTION_1_TITLE", "tra.RANKED_INTRO_RANKED_FLEX_SR_SECTION_1_BODY", "tra.RANKED_INTRO_RANKED_FLEX_TT_SECTION_1_TITLE", "tra.RANKED_INTRO_RANKED_FLEX_TT_SECTION_1_BODY", "tra.RANKED_INTRO_SECTION_2_TITLE", "tra.RANKED_INTRO_SECTION_2_BODY", "tra.RANKED_INTRO_SECTION_3_TITLE", "tra.RANKED_INTRO_SECTION_3_BODY", (function() {
                    const e = this.get("queueType");
                    return [{
                        titleString: this.get(`tra.RANKED_INTRO_${e}_SECTION_1_TITLE`),
                        bodyString: this.get(`tra.RANKED_INTRO_${e}_SECTION_1_BODY`),
                        imageSource: a.ASSET_PATH + "images/ranked-intro-squad-up.jpg"
                    }, {
                        titleString: this.get("tra.RANKED_INTRO_SECTION_2_TITLE"),
                        bodyString: this.get("tra.RANKED_INTRO_SECTION_2_BODY"),
                        imageSource: a.ASSET_PATH + "images/ranked-intro-earn-rank.png"
                    }, {
                        titleString: this.get("tra.RANKED_INTRO_SECTION_3_TITLE"),
                        bodyString: this.get("tra.RANKED_INTRO_SECTION_3_BODY"),
                        imageSource: a.ASSET_PATH + "images/ranked-intro-epic-loot.jpg"
                    }]
                })),
                queueUpButtonText: s.Ember.computed("tra", (function() {
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
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "73XsyPVS",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-intro\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-intro\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-intro\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","ranked-intro-page-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ranked-intro-section-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["rankedIntroSections"]]],null,0],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["ranked-intro-footer-container ",["helper",["if"],[["get",["hideQueueUpButton"]],"hidden"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","queue-up-hype left"],["flush-element"],["close-element"],["text","\\n    "],["open-element","lol-uikit-flat-button-group",[]],["static-attr","class","queue-up-button-container"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-flat-button",[]],["static-attr","type","next"],["static-attr","class","queue-up-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"createPartyLobby"],null],null],["flush-element"],["append",["unknown",["queueUpButtonText"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","queue-up-hype right"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","ranked-intro-section"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","ranked-intro-section-image-frame"],["flush-element"],["text","\\n          "],["open-element","img",[]],["static-attr","class","ranked-intro-section-image"],["dynamic-attr","src",["unknown",["section","imageSource"]],null],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","ranked-intro-section-title"],["flush-element"],["append",["unknown",["section","titleString"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","ranked-intro-section-body"],["flush-element"],["append",["unknown",["section","bodyString"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":["section"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1);
            n(40), e.exports = s.Ember.Component.extend({
                classNames: ["rank-standing-component"],
                layout: n(41),
                selectedState: null,
                league: s.Ember.computed.alias("selectedState.league"),
                activeTabIndex: s.Ember.computed("selectedState.division.position", (function() {
                    const e = this.get("selectedState.division.position");
                    return e || 0
                })),
                leagueStandings: s.Ember.computed.readOnly("selectedState.division.standings"),
                isViewingRatedLadder: s.Ember.computed.readOnly("selectedState.isViewingRatedLadder"),
                ratedLadderStandings: s.Ember.computed.readOnly("selectedState.league.standings"),
                displayedStandings: s.Ember.computed("leagueStandings", "isViewingRatedLadder", "ratedLadderStandings", (function() {
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
                            const s = this._divisionAtIndex(e);
                            this.sendAction("selectDivision", s), n.off("animationend"), this.set("animationClass", t > e ? "left-to-right-fade-in" : "right-to-left-fade-in")
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
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "D5RdkY5n",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\index.js\\" "],["text","\\n"],["append",["helper",["rank-standing-header"],null,[["league","activateTab","selectedState","onSelectApexLeague"],[["get",["league"]],["helper",["action"],[["get",[null]],"activateTab"],null],["get",["selectedState"]],["get",["onSelectApexLeague"]]]]],false],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["rank-standing-list-container ",["helper",["if"],[["get",["showingRewards"]],"showing-rewards"],null]," ",["unknown",["animationClass"]]]]],["flush-element"],["text","\\n  "],["append",["helper",["rank-standing-list"],null,[["leagueContext","selectedState","standings","spectatableSummonerNames","spectatableSummonerIds","spectateBySummonerIdEnabled","selectStanding"],[["get",["selectedState","league"]],["get",["selectedState"]],["get",["displayedStandings"]],["get",["spectatableSummonerNames"]],["get",["spectatableSummonerIds"]],["get",["spectateBySummonerIdEnabled"]],["get",["selectStanding"]]]]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1),
                a = n(23);
            n(43), e.exports = s.Ember.Component.extend({
                tagName: "li",
                classNames: ["lol-leagues-division-item"],
                layout: n(44),
                containsPlayer: s.Ember.computed("leagueDivisionInfo.standings", (function() {
                    return !s.Lodash.isEmpty(s.Lodash.find(this.get("leagueDivisionInfo.standings"), {
                        relationship: a.StandingRelationship.SELF
                    }))
                })),
                activeIndex: null,
                selectedDivision: null,
                text: s.Ember.computed("tra", "leagueDivisionInfo.tier", "leagueDivisionInfo.division", (function() {
                    return s.LeaguesConsts.APEX_TIERS.includes(this.get("leagueDivisionInfo.tier")) ? s.LeagueTierNames.getTierName(this.get("leagueDivisionInfo.tier")) : s.LeagueTierNames.getDivisionName(this.get("leagueDivisionInfo.division"))
                })),
                isActive: s.Ember.computed("activeIndex", "btnIndex", (function() {
                    return this.get("activeIndex") === this.get("btnIndex")
                })),
                activeStyle: s.Ember.computed("isActive", (function() {
                    return this.get("isActive") ? "active" : null
                })),
                playerDivisionStyle: s.Ember.computed("containsPlayer", (function() {
                    return this.get("containsPlayer") ? "player-division" : null
                })),
                selectedStateDidChange: s.Ember.on("init", s.Ember.observer("selectedDivision", (function() {
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
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "teUyO/3l",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-header\\\\rank-standing-header-button\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-header\\\\rank-standing-header-button\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-header\\\\rank-standing-header-button\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["lol-leagues-division-btn division-",["unknown",["leagueDivisionInfo","division"]]," ",["unknown",["activeStyle"]]," ",["unknown",["playerDivisionStyle"]]]]],["flush-element"],["append",["unknown",["text"]],false],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1),
                a = n(23);
            n(46);
            let i = null;
            if (s.AudioPlugin) {
                const e = s.AudioPlugin.getChannel("sfx-ui");
                i = e.createSound(`${a.ASSET_PATH}sounds/sfx-uikit-button-text-click.ogg`)
            }
            e.exports = s.Ember.Component.extend({
                classNames: ["rank-standing-header-component", "lol-leagues-division-wrapper"],
                layout: n(47),
                activeIndex: null,
                hasDivision: s.Ember.computed("league.tier", (function() {
                    return !s.LeaguesConsts.APEX_TIERS.includes(this.get("league.tier"))
                })),
                divisionExistenceObserver: s.Ember.observer("hasDivision", (function() {
                    this.get("hasDivision") || this._activateButton(0)
                })),
                topRatedTier: s.Ember.computed("league.queueType", (function() {
                    const e = this.get("league.queueType");
                    return this.get(`tra.${e}_tier_label_ORANGE`)
                })),
                localizedTier: s.Ember.computed("selectedState.league.tier", (function() {
                    return s.LeagueTierNames.getTierName(this.get("selectedState.league.tier"))
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
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "Ip5vtGm8",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-header\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-header\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-header\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["lol-leagues-division-tier ",["helper",["if"],[["get",["selectedState","isViewingApexTier"]],"removed"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["selectedState","isViewingRatedLadder"]]],null,2,1],["close-element"],["text","\\n"],["open-element","ul",[]],["dynamic-attr","class",["concat",["lol-leagues-division-list ",["helper",["if"],[["get",["selectedState","isViewingRatedLadder"]],"removed"],null]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["league","divisions"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["rank-standing-header-button"],null,[["leagueDivisionInfo","btnIndex","activeIndex","onBtnClick","selectedDivision","contentSize","isViewingTopPlayers","queueType","onSelectApexLeague","playClickAudio"],[["get",["l"]],["get",["l","position"]],["get",["activeIndex"]],"activateButton",["get",["selectedState","division"]],["get",["league","divisions","length"]],["get",["selectedState","isViewingTopPlayers"]],["get",["league","queueType"]],["get",["onSelectApexLeague"]],"playClickAudio"]]],false],["text","\\n"]],"locals":["l","index"]},{"statements":[["text","    "],["append",["unknown",["localizedTier"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["topRatedTier"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1);
            n(49);
            var a = n(50),
                i = n(24),
                o = n(5);
            e.exports = s.Ember.Component.extend({
                classNames: ["rank-standing-list-component", "lol-leagues-list-wrapper"],
                layout: n(51),
                hasFirstHeader: s.Ember.computed.bool("headerData"),
                hasSecondHeader: s.Ember.computed.bool("secondaryHeaderData"),
                scrollTop: 0,
                ROW_WIDTH: 606,
                ROW_HEIGHT: 32,
                OFFSET_TO_CENTER_PLAYER: 160,
                isRatedQueue: s.Ember.computed("selectedState.league.queueType", (function() {
                    return o.QUEUES.ALL_RATED_QUEUE_TYPES.includes(this.get("selectedState.league.queueType"))
                })),
                didReceiveAttrs: function() {
                    this._super(...arguments), this.scrollToPlayerStanding()
                },
                divisionIsEmpty: s.Ember.computed("standings", (function() {
                    return 0 === this.get("standings.length")
                })),
                isApexTierNotMaxSize: s.Ember.computed("selectedState.isViewingApexTier", "standings.[]", "selectedState.division.maxLeagueSize", (function() {
                    const e = this.get("selectedState.isViewingApexTier"),
                        t = this.get("selectedState.division.topNumberOfPlayers") > 0,
                        n = this.get("standings.length") < this.get("selectedState.division.maxLeagueSize");
                    return e && t && n
                })),
                isEmptyDivisionOrNotFullApexTier: s.Ember.computed.or("divisionIsEmpty", "isApexTierNotMaxSize"),
                hasApexUnlockTimeInTheFuture: s.Ember.computed("selectedState.division.apexUnlockTimeMillis", (function() {
                    return this.get("selectedState.division.apexUnlockTimeMillis") > Date.now()
                })),
                divisionOrTierEmptyText: s.Ember.computed("divisionIsEmpty", "selectedState.isViewingApexTier", "selectedState.division.tier", "selectedState.division.apexUnlockTimeMillis", "selectedState.division.minLpForApexTier", "selectedState.division.topNumberOfPlayers", (function() {
                    if (!this.get("selectedState.isViewingApexTier")) return this.get("tra.LEAGUES_DIVISION_EMPTY_MSG");
                    const e = this.get("selectedState.division.apexUnlockTimeMillis"),
                        t = this.get("selectedState.division.minLpForApexTier"),
                        n = this.get("selectedState.division.topNumberOfPlayers"),
                        i = Date.now(),
                        o = this.get("tra"),
                        l = this.get("selectedState.division.tier"),
                        r = s.LeagueTierNames.getTierName(l);
                    if (e > i) {
                        const t = (0, a.timeInMillisToDays)(e - i);
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
                rows: s.Ember.computed("standings", "downOneTierStandings", "upOneTierStandings", "leagueContext.tier", "selectedState.division.division", "selectedState.isViewingApexTier", (function() {
                    const e = this.get("selectedState.isViewingApexTier");
                    let t = this.get("standings").slice();
                    if (e) t = this.addPromotionDemotionCutoffs(t), t.splice(0, 0, s.Ember.Object.create({
                        isHeader: !0
                    }));
                    else {
                        const e = s.Lodash.findIndex(t, (e => !s.Lodash.get(e, "miniseriesResults.length") > 0));
                        e < 0 ? t.splice(0, 0, s.Ember.Object.create({
                            isHeader: !0
                        })) : 0 === e ? t.splice(0, 0, s.Ember.Object.create({
                            isSecondHeader: !0
                        })) : (t.splice(0, 0, s.Ember.Object.create({
                            isHeader: !0
                        })), t.splice(e + 1, 0, s.Ember.Object.create({
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
                        e.splice(n + 1, 0, s.Ember.Object.create({
                            isApexTierCutoff: !0,
                            apexCutoffText: t
                        }))
                    }
                    const {
                        hasDemotionCutoff: a,
                        demotionCutoffIndex: i
                    } = this.findDemotionCutoffIndex(e);
                    if (a) {
                        const t = this.get("tra.LEAGUES_PROFILE_TABLE_HEADER_DEMOTION_CUTOFF");
                        e.splice(i, 0, s.Ember.Object.create({
                            isApexTierCutoff: !0,
                            apexCutoffText: t
                        }))
                    }
                    return e
                },
                findPromotionCutoffIndex(e) {
                    let t = !1,
                        n = 0;
                    for (let s = 0; s < e.length && e[s].pendingPromotion; s++) t = !0, n = s;
                    return {
                        hasPromotionCutoff: t,
                        promotionCutoffIndex: n
                    }
                },
                findDemotionCutoffIndex(e) {
                    let t = !1,
                        n = e.length;
                    for (let s = e.length - 1; s >= 0 && e[s].pendingDemotion; s--) t = !0, n = s;
                    return {
                        hasDemotionCutoff: t,
                        demotionCutoffIndex: n
                    }
                },
                displayedRows: s.Ember.computed("rows", (function() {
                    return this.get("rows").slice(1)
                })),
                hasRowsToDisplay: s.Ember.computed("displayedRows", (function() {
                    return this.get("displayedRows")?.length > 0
                })),
                headerData: s.Ember.computed("rows", (function() {
                    return s.Lodash.find(this.get("rows"), {
                        isHeader: !0
                    })
                })),
                secondaryHeaderData: s.Ember.computed("rows", (function() {
                    return s.Lodash.find(this.get("rows"), {
                        isSecondHeader: !0
                    })
                })),
                playerHeaderText: s.Ember.computed("isTft", (function() {
                    return this.get("isTft") ? this.get("tra.LEAGUES_PROFILE_TABLE_HEADER_TACTICIANS") : this.get("tra.LEAGUES_PROFILE_TABLE_HEADER_SUMMONERS")
                })),
                isTft: s.Ember.computed("leagueContext.queueType", (function() {
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
                        s = this.ROW_HEIGHT * n - this.OFFSET_TO_CENTER_PLAYER;
                    this.set("scrollTop", s)
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
                const s = (t && t.locale || "en_US").replace("_", "-");
                return new Date(e).toLocaleString(s, n)
            }, t.getDaysBetweenDateMillis = function(e, t) {
                return (t - e) / n
            }, t.timeInMillisToDays = function(e) {
                if (!e) return 0;
                return Math.ceil(e / n)
            };
            const n = 864e5
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "VwzKoDhp",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-list\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-list\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-list\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-leagues-headers-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasFirstHeader"]]],null,22],["text","\\n"],["block",["if"],[["get",["hasSecondHeader"]]],null,15],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["lol-leagues-list-container ",["helper",["if"],[["get",["isEmptyDivisionOrNotFullApexTier"]],"show-division-or-tier-message"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasRowsToDisplay"]]],null,6],["block",["if"],[["get",["isEmptyDivisionOrNotFullApexTier"]]],null,4],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","LEAGUES_APEX_TIER_UNLOCKED_NOT_FULL"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","shocked-poro-icon"],["flush-element"],["close-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","LEAGUES_APEX_TIER_UNLOCKED_EMPTY_CHECK_BACK_LATER"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-empty-content"],["flush-element"],["text","\\n"],["block",["if"],[["get",["divisionIsEmpty"]]],null,1,0],["text","          "],["open-element","p",[]],["flush-element"],["append",["helper",["if"],[["get",["selectedState","division","topNumberOfPlayers"]],["get",["divisionOrTierEmptyText"]]],null],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-empty-content locked"],["flush-element"],["text","\\n          "],["append",["unknown",["divisionOrTierEmptyText"]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","p",[]],["static-attr","class","lol-leagues-list-apex-locked-check-back"],["flush-element"],["append",["unknown",["tra","LEAGUE_APEX_TIER_LOCKED_CHECK_BACK"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-empty"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasApexUnlockTimeInTheFuture"]]],null,3,2],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["rank-standing-row"],null,[["data","leagueContext","leagueDivisionInfo","rowIndex","onRowClick","summonerId","spectatableSummonerNames","spectatableSummonerIds","spectateBySummonerIdEnabled","selectedStanding"],[["get",["row"]],["get",["leagueContext"]],["get",["selectedState","division"]],["get",["index"]],["helper",["action"],[["get",[null]],"onRowClick"],null],["get",["selectedState","summonerId"]],["get",["spectatableSummonerNames"]],["get",["spectatableSummonerIds"]],["get",["spectateBySummonerIdEnabled"]],["get",["selectedState","standing"]]]]],false],["text","\\n"]],"locals":["row","index"]},{"statements":[["block",["ember-collection"],null,[["class","items","cell-layout","scroll-top"],["lol-leagues-list",["get",["displayedRows"]],["helper",["fixed-grid-layout"],[["get",["ROW_WIDTH"]],["get",["ROW_HEIGHT"]]],null],["get",["scrollTop"]]]],5]],"locals":[]},{"statements":[["text","          "],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_POINTS"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_RATING"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_WINS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_TFT_WINS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-1 lol-leagues-list-col"],["flush-element"],["text","#"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-2 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-3 lol-leagues-list-col"],["flush-element"],["append",["unknown",["playerHeaderText"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-4 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-5 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isTft"]]],null,10,9],["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-7 lol-leagues-list-col"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isRatedQueue"]]],null,8,7],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_WIN_LOSE"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_TFT_WINS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-1 lol-leagues-list-col"],["flush-element"],["text","#"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-2 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-3 lol-leagues-list-col"],["flush-element"],["append",["unknown",["secondaryHeaderData","headerText"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-4 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-5 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isTft"]]],null,13,12],["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-7 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_POINTS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-header second-header"],["flush-element"],["text","\\n"],["block",["if"],[["get",["secondaryHeaderData","isApexTier"]]],null,14,11],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_WINS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_TFT_WINS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-1 lol-leagues-list-col"],["flush-element"],["text","#"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-2 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-3 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_UP_FOR_PROMO"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-4 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-5 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isTft"]]],null,17,16],["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-7 lol-leagues-list-col"],["flush-element"],["append",["unknown",["miniseriesLengthDisplay"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_WIN_LOSE"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_TFT_WINS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-1 lol-leagues-list-col"],["flush-element"],["text","#"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-2 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-3 lol-leagues-list-col"],["flush-element"],["append",["unknown",["playerHeaderText"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-4 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-5 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isTft"]]],null,20,19],["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-7 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_POINTS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-header"],["flush-element"],["text","\\n"],["block",["if"],[["get",["selectedState","isViewingApexTier"]]],null,21,18],["text","    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1),
                a = n(23),
                i = n(24);
            n(53);
            const o = n(54);
            let l = null;
            if (s.AudioPlugin) {
                const e = s.AudioPlugin.getChannel("sfx-ui");
                l = e.createSound(`${a.ASSET_PATH}sounds/sfx-uikit-click-generic.ogg`)
            }
            e.exports = s.Ember.Component.extend({
                tagName: "li",
                classNames: ["rank-standing-row-component", "lol-leagues-list-item"],
                classNameBindings: ["headerStyle", "secondaryHeaderStyle", "selfStyle", "currentStyle", "data.isApexTierCutoff:apex-cutoff"],
                tooltipManager: s.TooltipManager,
                contextMenuManager: s.ContextMenuManager,
                layout: n(74),
                modalManager: s.ModalManager,
                spectatorService: s.Ember.inject.service("spectator"),
                data: null,
                rowIndex: null,
                leagueContext: null,
                leagueDivisionInfo: null,
                summonerId: null,
                selectedStanding: null,
                didInsertElement: function() {
                    this._super(...arguments), this._setupContextMenu()
                },
                isHeader: s.Ember.computed("data.isHeader", (function() {
                    return Boolean(this.get("data.isHeader"))
                })),
                headerStyle: s.Ember.computed("isHeader", (function() {
                    return this.get("isHeader") ? "lol-leagues-list-header" : null
                })),
                isSecondaryHeader: s.Ember.computed("data.isSecondHeader", (function() {
                    return Boolean(this.get("data.isSecondHeader"))
                })),
                secondaryHeaderStyle: s.Ember.computed("isSecondaryHeader", (function() {
                    return this.get("isSecondaryHeader") ? "lol-leagues-list-header second-header" : null
                })),
                shouldShowMiniseries: s.Ember.computed("isTopSummoner", (function() {
                    return this.get("isTopSummoner")
                })),
                currentStyle: s.Ember.computed("selectedStanding.summonerId", "data.summonerId", (function() {
                    if (this.get("selectedStanding.summonerId") === this.get("data.summonerId")) return "current"
                })),
                isTopSummoner: s.Ember.computed("data.miniseriesResults", "data.summonerName", "isViewingApexTier", (function() {
                    return this.get("data.miniseriesResults.length") > 0 && Boolean(this.get("data.summonerName")) && !this.get("isViewingApexTier")
                })),
                isViewingApexTier: s.Ember.computed("leagueDivisionInfo.tier", (function() {
                    return s.LeaguesConsts.APEX_TIERS.includes(this.get("leagueDivisionInfo.tier"))
                })),
                isTopTierStandingRow: s.Ember.computed("isViewingApexTier", "isHeader", "isSecondaryHeader", "data.isApexTierCutoff", (function() {
                    return this.get("isViewingApexTier") && !this.get("isHeader") && !this.get("isSecondaryHeader") && !this.get("data.isApexTierCutoff")
                })),
                isNonTopTierStandingRow: s.Ember.computed("data.puuid", "isTopSummoner", "isViewingApexTier", (function() {
                    return Boolean(this.get("data.puuid")) && !this.get("isTopSummoner") && !this.get("isViewingApexTier")
                })),
                showContextMenu: s.Ember.computed("data.summonerId", (function() {
                    return this.get("data.summonerId")
                })),
                hasPositionDelta: s.Ember.computed("data.positionDelta", (function() {
                    return this.get("data.positionDelta") && 0 !== this.get("data.positionDelta")
                })),
                divisionChangeStyle: s.Ember.computed("data.pendingDemotion", "data.pendingPromotion", (function() {
                    return this.get("data.pendingDemotion") ? "lol-leagues-icon-demotion" : this.get("data.pendingPromotion") ? "lol-leagues-icon-promotion" : ""
                })),
                positionDeltaStyle: s.Ember.computed("data.positionDelta", (function() {
                    return this.get("data.positionDelta") > 0 ? "lol-leagues-list-up" : this.get("data.positionDelta") < 0 ? "lol-leagues-list-down" : void 0
                })),
                positionDeltaAbs: s.Ember.computed("data.positionDelta", (function() {
                    return Math.abs(this.get("data.positionDelta"))
                })),
                isAvailableForSpectate: s.Ember.computed("data.summonerName", "spectatableSummonerNames", "spectatableSummonerIds", "spectateBySummonerIdEnabled", "spectatorService.spectateEnabled", (function() {
                    if (!this.get("spectatorService.spectateEnabled")) return !1;
                    if (this.get("spectateBySummonerIdEnabled")) {
                        const e = this.get("spectatableSummonerIds");
                        return e && e.includes && e.includes(this.get("data.summonerId"))
                    } {
                        const e = this.get("spectatableSummonerNames");
                        return e && e.includes && e.includes(this.get("data.summonerName"))
                    }
                })),
                isFriend: s.Ember.computed("data.relationship", (function() {
                    return this.get("data.relationship") === a.StandingRelationship.FRIEND
                })),
                isSelf: s.Ember.computed("data.relationship", (function() {
                    return this.get("data.relationship") === a.StandingRelationship.SELF
                })),
                isSelectedSummoner: s.Ember.computed("data.summonerId", "summonerId", (function() {
                    const e = this.get("summonerId");
                    return this.get("data.summonerId") === e
                })),
                selfStyle: s.Ember.computed("data.relationship", (function() {
                    if (this.get("data.relationship") === a.StandingRelationship.SELF) return "me"
                })),
                miniseriesStyles: s.Ember.computed("data.miniseriesResults", (function() {
                    return s.Lodash.map(this.get("data.miniseriesResults"), (e => `lol-leagues-list-best-${e}`))
                })),
                isTft: s.Ember.computed("leagueContext.queueType", (function() {
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
                                (0, s.dataBinding)("/lol-chat").post("/v2/friend-requests", {
                                    puuid: this.get("data.puuid")
                                })
                            }
                        }, {
                            label: this.get("tra.LEAGUES_CONTEXT_MENU_VIEW_PROFILE"),
                            target: this,
                            disabled: this.get("isSelf") || this.get("isSelectedSummoner"),
                            action: function() {
                                s.ProfilesAPI.showOverlay({
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
                                await s.ProfilesAPI.hasPrivateProfile(e) ? s.ProfilesAPI.showAlertSummonerIsPrivate(t) : this.get("spectatorService").spectateGame(this.get("data.summonerName"), this.get("data.puuid"), this.leagueContext.queueType).then((e => {
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
            var s = n(55);
            e.exports = (s.default || s).template({
                compiler: [7, ">= 4.0.0"],
                main: function(e, t, n, s, a) {
                    var i, o = null != t ? t : e.nullContext || {},
                        l = n.helperMissing,
                        r = "function",
                        c = e.escapeExpression;
                    return "<div>\r\n  <h4>" + c(typeof(i = null != (i = n.title || (null != t ? t.title : t)) ? i : l) === r ? i.call(o, {
                        name: "title",
                        hash: {},
                        data: a
                    }) : i) + '</h4>\r\n  <hr class="heading-spacer" />\r\n  <p>' + c(typeof(i = null != (i = n.message || (null != t ? t.message : t)) ? i : l) === r ? i.call(o, {
                        name: "message",
                        hash: {},
                        data: a
                    }) : i) + "</p>\r\n</div>\r\n\r\n"
                },
                useData: !0
            })
        }, (e, t, n) => {
            e.exports = n(56).default
        }, (e, t, n) => {
            "use strict";

            function s(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e) {
                if (e && e.__esModule) return e;
                var t = {};
                if (null != e)
                    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t.default = e, t
            }
            t.__esModule = !0;
            var i = a(n(57)),
                o = s(n(71)),
                l = s(n(59)),
                r = a(n(58)),
                c = a(n(72)),
                u = s(n(73));

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

            function s(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            t.__esModule = !0, t.HandlebarsEnvironment = u;
            var a = n(58),
                i = s(n(59)),
                o = n(60),
                l = n(68),
                r = s(n(70));
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
                    if (a.toString.call(e) === c) {
                        if (t) throw new i.default("Arg not supported with multiple helpers");
                        a.extend(this.helpers, e)
                    } else this.helpers[e] = t
                },
                unregisterHelper: function(e) {
                    delete this.helpers[e]
                },
                registerPartial: function(e, t) {
                    if (a.toString.call(e) === c) a.extend(this.partials, e);
                    else {
                        if (void 0 === t) throw new i.default('Attempting to register a partial called "' + e + '" as undefined');
                        this.partials[e] = t
                    }
                },
                unregisterPartial: function(e) {
                    delete this.partials[e]
                },
                registerDecorator: function(e, t) {
                    if (a.toString.call(e) === c) {
                        if (t) throw new i.default("Arg not supported with multiple decorators");
                        a.extend(this.decorators, e)
                    } else this.decorators[e] = t
                },
                unregisterDecorator: function(e) {
                    delete this.decorators[e]
                }
            };
            var d = r.default.log;
            t.log = d, t.createFrame = a.createFrame, t.logger = r.default
        }, (e, t) => {
            "use strict";
            t.__esModule = !0, t.extend = o, t.indexOf = function(e, t) {
                for (var n = 0, s = e.length; n < s; n++)
                    if (e[n] === t) return n;
                return -1
            }, t.escapeExpression = function(e) {
                if ("string" != typeof e) {
                    if (e && e.toHTML) return e.toHTML();
                    if (null == e) return "";
                    if (!e) return e + "";
                    e = "" + e
                }
                if (!a.test(e)) return e;
                return e.replace(s, i)
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
                s = /[&<>"'`=]/g,
                a = /[&<>"'`=]/;

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

            function s(e, t) {
                var a = t && t.loc,
                    i = void 0,
                    o = void 0;
                a && (e += " - " + (i = a.start.line) + ":" + (o = a.start.column));
                for (var l = Error.prototype.constructor.call(this, e), r = 0; r < n.length; r++) this[n[r]] = l[n[r]];
                Error.captureStackTrace && Error.captureStackTrace(this, s);
                try {
                    a && (this.lineNumber = i, Object.defineProperty ? Object.defineProperty(this, "column", {
                        value: o,
                        enumerable: !0
                    }) : this.column = o)
                } catch (e) {}
            }
            s.prototype = new Error, t.default = s, e.exports = t.default
        }, (e, t, n) => {
            "use strict";

            function s(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            t.__esModule = !0, t.registerDefaultHelpers = function(e) {
                a.default(e), i.default(e), o.default(e), l.default(e), r.default(e), c.default(e), u.default(e)
            };
            var a = s(n(61)),
                i = s(n(62)),
                o = s(n(63)),
                l = s(n(64)),
                r = s(n(65)),
                c = s(n(66)),
                u = s(n(67))
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var s = n(58);
            t.default = function(e) {
                e.registerHelper("blockHelperMissing", (function(t, n) {
                    var a = n.inverse,
                        i = n.fn;
                    if (!0 === t) return i(this);
                    if (!1 === t || null == t) return a(this);
                    if (s.isArray(t)) return t.length > 0 ? (n.ids && (n.ids = [n.name]), e.helpers.each(t, n)) : a(this);
                    if (n.data && n.ids) {
                        var o = s.createFrame(n.data);
                        o.contextPath = s.appendContextPath(n.data.contextPath, n.name), n = {
                            data: o
                        }
                    }
                    return i(t, n)
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var s, a = n(58),
                i = n(59),
                o = (s = i) && s.__esModule ? s : {
                    default: s
                };
            t.default = function(e) {
                e.registerHelper("each", (function(e, t) {
                    if (!t) throw new o.default("Must pass iterator to #each");
                    var n = t.fn,
                        s = t.inverse,
                        i = 0,
                        l = "",
                        r = void 0,
                        c = void 0;

                    function u(t, s, i) {
                        r && (r.key = t, r.index = s, r.first = 0 === s, r.last = !!i, c && (r.contextPath = c + t)), l += n(e[t], {
                            data: r,
                            blockParams: a.blockParams([e[t], t], [c + t, null])
                        })
                    }
                    if (t.data && t.ids && (c = a.appendContextPath(t.data.contextPath, t.ids[0]) + "."), a.isFunction(e) && (e = e.call(this)), t.data && (r = a.createFrame(t.data)), e && "object" == typeof e)
                        if (a.isArray(e))
                            for (var d = e.length; i < d; i++) i in e && u(i, i, i === e.length - 1);
                        else {
                            var p = void 0;
                            for (var m in e) e.hasOwnProperty(m) && (void 0 !== p && u(p, i - 1), p = m, i++);
                            void 0 !== p && u(p, i - 1, !0)
                        } return 0 === i && (l = s(this)), l
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var s, a = n(59),
                i = (s = a) && s.__esModule ? s : {
                    default: s
                };
            t.default = function(e) {
                e.registerHelper("helperMissing", (function() {
                    if (1 !== arguments.length) throw new i.default('Missing helper: "' + arguments[arguments.length - 1].name + '"')
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var s = n(58);
            t.default = function(e) {
                e.registerHelper("if", (function(e, t) {
                    return s.isFunction(e) && (e = e.call(this)), !t.hash.includeZero && !e || s.isEmpty(e) ? t.inverse(this) : t.fn(this)
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
                    for (var t = [void 0], n = arguments[arguments.length - 1], s = 0; s < arguments.length - 1; s++) t.push(arguments[s]);
                    var a = 1;
                    null != n.hash.level ? a = n.hash.level : n.data && null != n.data.level && (a = n.data.level), t[0] = a, e.log.apply(e, t)
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
            var s = n(58);
            t.default = function(e) {
                e.registerHelper("with", (function(e, t) {
                    s.isFunction(e) && (e = e.call(this));
                    var n = t.fn;
                    if (s.isEmpty(e)) return t.inverse(this);
                    var a = t.data;
                    return t.data && t.ids && ((a = s.createFrame(t.data)).contextPath = s.appendContextPath(t.data.contextPath, t.ids[0])), n(e, {
                        data: a,
                        blockParams: s.blockParams([e], [a && a.contextPath])
                    })
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0, t.registerDefaultDecorators = function(e) {
                i.default(e)
            };
            var s, a = n(69),
                i = (s = a) && s.__esModule ? s : {
                    default: s
                }
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var s = n(58);
            t.default = function(e) {
                e.registerDecorator("inline", (function(e, t, n, a) {
                    var i = e;
                    return t.partials || (t.partials = {}, i = function(a, i) {
                        var o = n.partials;
                        n.partials = s.extend({}, o, t.partials);
                        var l = e(a, i);
                        return n.partials = o, l
                    }), t.partials[a.args[0]] = a.fn, i
                }))
            }, e.exports = t.default
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0;
            var s = n(58),
                a = {
                    methodMap: ["debug", "info", "warn", "error"],
                    level: "info",
                    lookupLevel: function(e) {
                        if ("string" == typeof e) {
                            var t = s.indexOf(a.methodMap, e.toLowerCase());
                            e = t >= 0 ? t : parseInt(e, 10)
                        }
                        return e
                    },
                    log: function(e) {
                        if (e = a.lookupLevel(e), "undefined" != typeof console && a.lookupLevel(a.level) <= e) {
                            var t = a.methodMap[e];
                            console[t] || (t = "log");
                            for (var n = arguments.length, s = Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) s[i - 1] = arguments[i];
                            console[t].apply(console, s)
                        }
                    }
                };
            t.default = a, e.exports = t.default
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
                        var s = l.REVISION_CHANGES[n],
                            a = l.REVISION_CHANGES[t];
                        throw new o.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + s + ") or downgrade your runtime to an older version (" + a + ").")
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
                        for (var n = e.length, s = 0; s < n; s++)
                            if (e[s] && null != e[s][t]) return e[s][t]
                    },
                    lambda: function(e, t) {
                        return "function" == typeof e ? e.call(t) : e
                    },
                    escapeExpression: a.escapeExpression,
                    invokePartial: function(n, s, i) {
                        i.hash && (s = a.extend({}, s, i.hash), i.ids && (i.ids[0] = !0)), n = t.VM.resolvePartial.call(this, n, s, i);
                        var l = t.VM.invokePartial.call(this, n, s, i);
                        if (null == l && t.compile && (i.partials[i.name] = t.compile(n, e.compilerOptions, t), l = i.partials[i.name](s, i)), null != l) {
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
                    program: function(e, t, n, s, a) {
                        var i = this.programs[e],
                            o = this.fn(e);
                        return t || a || s || n ? i = r(this, e, o, t, n, s, a) : i || (i = this.programs[e] = r(this, e, o)), i
                    },
                    data: function(e, t) {
                        for (; e && t--;) e = e._parent;
                        return e
                    },
                    merge: function(e, t) {
                        var n = e || t;
                        return e && t && e !== t && (n = a.extend({}, t, e)), n
                    },
                    nullContext: Object.seal({}),
                    noop: t.VM.noop,
                    compilerInfo: e.compiler
                };

                function s(t) {
                    var a = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                        i = a.data;
                    s._setup(a), !a.partial && e.useData && (i = function(e, t) {
                        t && "root" in t || ((t = t ? l.createFrame(t) : {}).root = e);
                        return t
                    }(t, i));
                    var o = void 0,
                        r = e.useBlockParams ? [] : void 0;

                    function c(t) {
                        return "" + e.main(n, t, n.helpers, n.partials, i, r, o)
                    }
                    return e.useDepths && (o = a.depths ? t != a.depths[0] ? [t].concat(a.depths) : a.depths : [t]), (c = u(e.main, c, n, a.depths || [], i, r))(t, a)
                }
                return s.isTop = !0, s._setup = function(s) {
                    s.partial ? (n.helpers = s.helpers, n.partials = s.partials, n.decorators = s.decorators) : (n.helpers = n.merge(s.helpers, t.helpers), e.usePartial && (n.partials = n.merge(s.partials, t.partials)), (e.usePartial || e.useDecorators) && (n.decorators = n.merge(s.decorators, t.decorators)))
                }, s._child = function(t, s, a, i) {
                    if (e.useBlockParams && !a) throw new o.default("must pass block params");
                    if (e.useDepths && !i) throw new o.default("must pass parent depths");
                    return r(n, t, e[t], s, 0, a, i)
                }, s
            }, t.wrapProgram = r, t.resolvePartial = function(e, t, n) {
                e ? e.call || n.name || (n.name = e, e = n.partials[e]) : e = "@partial-block" === n.name ? n.data["partial-block"] : n.partials[n.name];
                return e
            }, t.invokePartial = function(e, t, n) {
                var s = n.data && n.data["partial-block"];
                n.partial = !0, n.ids && (n.data.contextPath = n.ids[0] || n.data.contextPath);
                var i = void 0;
                n.fn && n.fn !== c && function() {
                    n.data = l.createFrame(n.data);
                    var e = n.fn;
                    i = n.data["partial-block"] = function(t) {
                        var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                        return n.data = l.createFrame(n.data), n.data["partial-block"] = s, e(t, n)
                    }, e.partials && (n.partials = a.extend({}, n.partials, e.partials))
                }();
                void 0 === e && i && (e = i);
                if (void 0 === e) throw new o.default("The partial " + n.name + " could not be found");
                if (e instanceof Function) return e(t, n)
            }, t.noop = c;
            var s, a = function(e) {
                    if (e && e.__esModule) return e;
                    var t = {};
                    if (null != e)
                        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                    return t.default = e, t
                }(n(58)),
                i = n(59),
                o = (s = i) && s.__esModule ? s : {
                    default: s
                },
                l = n(57);

            function r(e, t, n, s, a, i, o) {
                function l(t) {
                    var a = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                        l = o;
                    return !o || t == o[0] || t === e.nullContext && null === o[0] || (l = [t].concat(o)), n(e, t, e.helpers, e.partials, a.data || s, i && [a.blockParams].concat(i), l)
                }
                return (l = u(n, l, e, o, s, i)).program = t, l.depth = o ? o.length : 0, l.blockParams = a || 0, l
            }

            function c() {
                return ""
            }

            function u(e, t, n, s, i, o) {
                if (e.decorator) {
                    var l = {};
                    t = e.decorator(t, l, n, s && s[0], i, o, s), a.extend(t, l)
                }
                return t
            }
        }, (e, t, n) => {
            "use strict";
            t.__esModule = !0, t.default = function(e) {
                var t = void 0 !== n.g ? n.g : window,
                    s = t.Handlebars;
                e.noConflict = function() {
                    return t.Handlebars === e && (t.Handlebars = s), e
                }
            }, e.exports = t.default
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "t3+NOKwt",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-row\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-row\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-standing\\\\rank-standing-row\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["shouldShowMiniseries"]]],null,16],["text","\\n"],["block",["if"],[["get",["isSecondaryHeader"]]],null,13],["text","\\n"],["block",["if"],[["get",["data","isApexTierCutoff"]]],null,6],["text","\\n"],["block",["if"],[["get",["isNonTopTierStandingRow"]]],null,5],["text","\\n"],["block",["if"],[["get",["isTopTierStandingRow"]]],null,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["data","wins"]],false],["text","/"],["append",["unknown",["data","losses"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["data","wins"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","span",[]],["dynamic-attr","class",["concat",[["unknown",["positionDeltaStyle"]]]]],["flush-element"],["append",["unknown",["positionDeltaAbs"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-1 lol-leagues-list-col"],["flush-element"],["append",["unknown",["data","position"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-2 lol-leagues-list-col"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasPositionDelta"]]],null,2],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-3 lol-leagues-list-col"],["flush-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","lol-leagues-list-summoner-name"],["flush-element"],["text","\\n      "],["append",["helper",["player-name"],null,[["format","puuid","summonerName","batch"],["tooltip",["get",["data","puuid"]],["get",["data","summonerName"]],true]]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","lol-leagues-list-friend"],["dynamic-attr","visible",["concat",[["unknown",["isFriend"]]]]],["flush-element"],["close-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","lol-leagues-list-spectate"],["dynamic-attr","visible",["concat",[["unknown",["isAvailableForSpectate"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-4 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-5 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isTft"]]],null,1,0],["text","  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-7 lol-leagues-list-col"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-leagues-league-points"],["flush-element"],["text","\\n        "],["append",["unknown",["data","leaguePoints"]],false],["open-element","div",[]],["dynamic-attr","class",["concat",[["unknown",["divisionChangeStyle"]]]]],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","span",[]],["dynamic-attr","class",["concat",[["unknown",["positionDeltaStyle"]]]]],["flush-element"],["append",["unknown",["positionDeltaAbs"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-1 lol-leagues-list-col"],["flush-element"],["append",["unknown",["data","position"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-2 lol-leagues-list-col"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasPositionDelta"]]],null,4],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-3 lol-leagues-list-col"],["flush-element"],["text","\\n    "],["append",["helper",["player-name"],null,[["format","puuid","summonerName","batch"],["tooltip",["get",["data","puuid"]],["get",["data","summonerName"]],true]]],false],["text","\\n    "],["open-element","span",[]],["static-attr","class","lol-leagues-list-friend"],["dynamic-attr","visible",["concat",[["unknown",["isFriend"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-4 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-5 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["data","wins"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-7 lol-leagues-list-col"],["flush-element"],["text","\\n    "],["append",["unknown",["data","leaguePoints"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-apex-cutoff-container"],["flush-element"],["text","\\n    "],["open-element","hr",[]],["static-attr","class","lol-leagues-apex-cutoff-hr"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-apex-cutoff-title"],["flush-element"],["append",["unknown",["data","apexCutoffText"]],false],["close-element"],["text","\\n    "],["open-element","hr",[]],["static-attr","class","lol-leagues-apex-cutoff-hr"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_WINS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_TFT_WINS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-1 lol-leagues-list-col"],["flush-element"],["text","#"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-2 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-3 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_SUMMONERS"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-4 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-5 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isTft"]]],null,8,7],["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-7 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_POINTS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_WIN_LOSE"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_TFT_WINS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-1 lol-leagues-list-col"],["flush-element"],["text","#"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-2 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-3 lol-leagues-list-col"],["flush-element"],["append",["unknown",["data","headerText"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-4 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-5 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isTft"]]],null,11,10],["text","    "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-7 lol-leagues-list-col"],["flush-element"],["append",["unknown",["tra","LEAGUES_PROFILE_TABLE_HEADER_POINTS"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["data","isApexTier"]]],null,12,9]],"locals":[]},{"statements":[["text","      "],["open-element","span",[]],["dynamic-attr","class",["concat",["lol-leagues-list-best-status ",["get",["msStyle"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["msStyle","index"]},{"statements":[["text","      "],["open-element","span",[]],["dynamic-attr","class",["concat",[["unknown",["positionDeltaStyle"]]]]],["flush-element"],["append",["unknown",["positionDeltaAbs"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-1 lol-leagues-list-col"],["flush-element"],["append",["unknown",["data","position"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-2 lol-leagues-list-col"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasPositionDelta"]]],null,15],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-3 lol-leagues-list-col"],["flush-element"],["text","\\n    "],["append",["helper",["player-name"],null,[["format","puuid","summonerName","batch"],["tooltip",["get",["data","puuid"]],["get",["data","summonerName"]],true]]],false],["text","\\n    "],["open-element","span",[]],["static-attr","class","lol-leagues-list-friend"],["dynamic-attr","visible",["concat",[["unknown",["isFriend"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-4 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-5 lol-leagues-list-col"],["flush-element"],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-6 lol-leagues-list-col"],["flush-element"],["append",["unknown",["data","wins"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-leagues-list-col-7 lol-leagues-list-col"],["flush-element"],["text","\\n"],["block",["each"],[["get",["miniseriesStyles"]]],null,14],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1),
                a = n(24);
            n(76), e.exports = s.Ember.Component.extend({
                classNames: ["rank-queue-dropdown-component"],
                classNameBindings: ["wrapperStyle"],
                layout: n(77),
                leagues: s.Ember.A(),
                wrapperStyle: s.Ember.computed("isPlayerUnranked", (function() {
                    return this.get("isPlayerUnranked") ? "lol-leagues-empty-filter-wrapper" : "lol-leagues-filter-wrapper"
                })),
                didInsertElement: function() {
                    this._super(...arguments), this.$("lol-uikit-flat-dropdown")[0].addEventListener("selected", (e => {
                        this._onSelected(e)
                    }))
                },
                challengerQueues: s.Ember.computed("challengerLaddersEnabled", (function() {
                    const e = this,
                        t = e.get("challengerLaddersEnabled");
                    if (!t) return s.Ember.A([]);
                    return s.Lodash.map(t, (t => ({
                        queueType: t,
                        queueTypeDisplay: e.get("tra").formatString("LEAGUES_DROPDOWN_APEX", {
                            queueType: s.LeagueTierNames.getRankedQueueName(t)
                        })
                    })))
                })),
                summonerLeagues: s.Ember.computed("selectedLeague.queueType", "leagues", (function() {
                    const e = this.get("leagues.summonerLeagues"),
                        t = this.get("selectedLeague.queueType");
                    if (!e) return null;
                    return s.Lodash.map(e, (e => ({
                        queue: e,
                        isSelected: "summoner" === this.get("leagueTypeSelected") && t === e.queueType
                    }))).filter((function(e) {
                        const t = e.tier && e.tier !== s.LeaguesConsts.TIER_NAME_NONE;
                        return !(0, a.isTftQueueType)(e.queueType) || t
                    }))
                })),
                topRatedLadderQueues: s.Ember.computed("topRatedLaddersEnabled", (function() {
                    const e = this,
                        t = e.get("topRatedLaddersEnabled");
                    if (!t) return s.Ember.A([]);
                    return s.Lodash.map(t, (t => ({
                        queueType: t,
                        queueTypeDisplay: e.get("tra").formatString("LEAGUES_DROPDOWN_APEX", {
                            queueType: s.LeagueTierNames.getRankedQueueName(t)
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
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "82QeIMb9",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-queue-dropdown\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-queue-dropdown\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rank-queue-dropdown\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-flat-dropdown",[]],["static-attr","class","rank-queue-dropdown-container"],["static-attr","direction","downwards"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-dropdown-optgroup",[]],["static-attr","slot","lol-uikit-dropdown-optgroup"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-uikit-dropdown-optgroup-header"],["static-attr","slot","lol-uikit-dropdown-optgroup-header"],["flush-element"],["append",["unknown",["tra","LEAGUES_DROPDOWN_GROUP_MY_LEAGUES"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["leagues","summonerLeagues"]]],null,5,3],["text","  "],["close-element"],["text","\\n"],["block",["unless"],[["get",["overlayMode"]]],null,2],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","data-leaguetype","rated"],["dynamic-attr","data-queuetype",["unknown",["l","queueType"]],null],["flush-element"],["append",["unknown",["l","queueTypeDisplay"]],false],["close-element"],["text","\\n"]],"locals":["l","index"]},{"statements":[["text","      "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","data-leaguetype","apex"],["dynamic-attr","data-queuetype",["unknown",["l","queueType"]],null],["flush-element"],["append",["unknown",["l","queueTypeDisplay"]],false],["close-element"],["text","\\n"]],"locals":["l","index"]},{"statements":[["text","  "],["open-element","lol-uikit-dropdown-optgroup",[]],["static-attr","slot","lol-uikit-dropdown-optgroup"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-uikit-dropdown-optgroup-header"],["static-attr","slot","lol-uikit-dropdown-optgroup-header"],["flush-element"],["append",["unknown",["tra","LEAGUES_DROPDOWN_GROUP_CHALLENGER_TIER"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["challengerQueues"]]],null,1],["block",["each"],[["get",["topRatedLadderQueues"]]],null,0],["text","  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","data-leaguetype","unranked"],["flush-element"],["append",["unknown",["tra","LEAGUES_QUEUE_NAME_UNRANKED"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","selected",["unknown",["l","isSelected"]],null],["static-attr","data-leaguetype","summoner"],["dynamic-attr","data-queuetype",["concat",[["unknown",["l","queue","queueType"]]]]],["flush-element"],["text","\\n        "],["append",["unknown",["l","queue","queueTypeDisplay"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":["l","index"]},{"statements":[["block",["each"],[["get",["summonerLeagues"]]],null,4]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1);
            n(79);
            e.exports = s.Ember.Component.extend({
                classNames: ["ranked-rewards-component"],
                classNameBindings: ["hidingRewards:hidden"],
                layout: n(80),
                animationDelayProgressBarFirstTime: 1250,
                animationDelayRewardDropPerReward: 200,
                animationDurationProgressBar: 1e3,
                animationDurationRewardDrop: 200,
                honorLevel: 0,
                didInsertElement: function() {
                    this._super(...arguments), window.requestAnimationFrame((() => this.positionElements())), s.Ember.run.later(this, (function() {
                        this.animateSplitNavigation(!0)
                    }), this.animationDelayProgressBarFirstTime)
                },
                didUpdateAttrs: function() {
                    this._super(...arguments);
                    const e = this.get("victoriousSkinItemInstanceId");
                    e !== this.prevVictoriousSkinId && s.LeagueTierNames.asyncGetRewardImage(e, "splashPath").then((e => {
                        this.set("victoriousSkinSplashPath", e)
                    })), this.prevVictoriousSkinId = e
                },
                victoriousSkinBackgroundStyle: s.Ember.computed("victoriousSkinSplashPath", (function() {
                    const e = this.get("victoriousSkinSplashPath");
                    return this.get("victoriousSkinSplashPath") ? `background-image: radial-gradient(54.18% 78.51% at 52.44% 21.49%, rgba(0, 0, 0, 0) 0%, #1A1C21 100%), url(${e})` : "background-image: url('/fe/lol-static-assets/victorious_before_reveal_background.png')"
                })),
                animateSplitNavigation: function(e) {
                    this.setProgressBarScale(e)
                },
                setProgressBarScale: function(e) {
                    const t = this.element.querySelector(".ranked-rewards-progress-bar"),
                        n = this.get("currentSplit.rewardTrack"),
                        s = this.get("currentSplit.splitId"),
                        a = this.get("splitsRewardPositionData"),
                        i = s && a && a[s - 1],
                        o = this.get("spacingSize");
                    if (!(n && t && i && o)) return;
                    const l = this.get("lastEarnedReward"),
                        r = this.get("nextReward"),
                        c = this.calculateProgressBarPercentWidth(i, o, l, r);
                    e ? this.animateProgressBar(t, c) : t.style.transform = `scaleX(${c})`
                },
                calculateProgressBarPercentWidth: function(e, t, n, s) {
                    if (s) {
                        if (n) {
                            const a = s.splitPoints - n.splitPoints,
                                i = e[s.splitPoints],
                                o = this.get("playerPoints");
                            if (!i || !o) return 0;
                            const l = s.splitPoints - o;
                            return (i.left - l * t / a) / 836
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
                        s = {
                            duration: this.animationDurationProgressBar,
                            easing: "cubic-bezier(0,.35,0,1)"
                        };
                    e.animate(n, s), e.style.transform = `scaleX(${t})`
                },
                positionElements: function() {
                    const e = this.element.querySelector(".ranked-rewards-bar-container");
                    if (!e) return;
                    const t = [];
                    e.style.width = "836px";
                    const n = this.getRewardElements(),
                        s = this.get("currentSplit.rewardTrack") || [];
                    if (!n || !s) return;
                    const a = {};
                    let i = 0;
                    for (let e = 0; e < s.length; e++) {
                        const t = s[e],
                            n = this.getRewardSize(t);
                        0 === e || e === s.length - 1 ? i += n / 2 : i += n, a[t.splitPoints] = {
                            size: n
                        }
                    }
                    const o = s.length - 1,
                        l = Math.floor((836 - i) / o);
                    this.set("spacingSize", l);
                    let r = 0;
                    for (let e = 0; e < n.length; e++) {
                        const t = n[e],
                            s = t.getAttribute("data-required-points"),
                            i = a[s].size;
                        0 === e && (r -= Math.floor(i / 2)), a[s].left = r, t.style.left = `${r}px`, r += i + l
                    }
                    t.push(a), this.set("splitsRewardPositionData", t)
                },
                playerPoints: s.Ember.computed("currentSplit.splitId", "rewardsProgress", (function() {
                    const e = this.get("currentSplit.splitId"),
                        t = this.get("rewardsProgress");
                    return t && t[e] || 0
                })),
                getRewardElements: function() {
                    return [...this.element.querySelectorAll(".ranked-reward-item-component")]
                },
                flattenedSplitRewards: s.Ember.computed("currentSplit.rewardTrack.[]", (function() {
                    return (this.get("currentSplit.rewardTrack") || []).map((e => ({
                        reward: e,
                        is52px: 52 === this.getRewardSize(e)
                    })))
                })),
                lastEarnedReward: s.Ember.computed("currentSplit.rewardTrack.[]", "playerPoints", (function() {
                    const e = this.get("currentSplit.rewardTrack") || [],
                        t = this.get("playerPoints");
                    return [...e].sort(((e, t) => t.splitPoints - e.splitPoints)).find((e => e.splitPoints <= t))
                })),
                nextReward: s.Ember.computed("currentReward.rewardTrack.[]", "playerPoints", (function() {
                    const e = this.get("currentSplit.rewardTrack") || [],
                        t = this.get("playerPoints");
                    return e.sort(((e, t) => e.splitPoints - t.splitPoints)), e.find((e => e.splitPoints > t))
                })),
                getRewardSize: function(e) {
                    const t = s.LeagueTierNames.getConstants().REWARD_TYPES,
                        n = e && e.rewards && e.rewards[0] && e.rewards[0].rewardType || t.HEXTECH_KEY;
                    return n === t.EMOTE || n === t.SUMMONER_ICON || n === t.CHAMPION_TOKEN || n === t.MASTERWORK_CHEST ? 52 : 32
                },
                currentSplit: s.Ember.computed.alias("splitsConfig.currentSplit"),
                getVictoriousPointsNeededForTier: (e, t) => t && e && e.victoriousSkinRewardGroup && e.victoriousSkinRewardGroup.splitPointsByHighestAchievedTier && e.victoriousSkinRewardGroup.splitPointsByHighestAchievedTier[t] || 1600,
                isVictoriousSkinUnlocked: s.Ember.computed("victoriousPointsPercentageEarned", (function() {
                    return 100 === this.get("victoriousPointsPercentageEarned")
                })),
                victoriousPointsPercentageEarned: s.Ember.computed("currentSplit", "myRankedStats", "playerPoints", (function() {
                    const e = this.get("currentSplit"),
                        t = this.get("myRankedStats"),
                        n = this.get("playerPoints");
                    if (!e || !t || !n) return 0;
                    const s = this.getVictoriousPointsNeededForTier(e, t.highestCurrentSeasonReachedTierSR);
                    return s ? 100 * Math.min(n / s, 1) : 0
                })),
                victoriousPointsSilverBelow: s.Ember.computed("victoriousPointsNeededSilverBelow", "playerPoints", "myRankedStats.highestCurrentSeasonReachedTierSR", (function() {
                    const e = this.get("myRankedStats.highestCurrentSeasonReachedTierSR");
                    return e && s.LeagueTierNames.getConstants().TIERS.indexOf(e) <= 2 ? `${this.get("playerPoints")} / ${this.get("victoriousPointsNeededSilverBelow")}` : `${this.get("victoriousPointsNeededSilverBelow")} / ${this.get("victoriousPointsNeededSilverBelow")}`
                })),
                victoriousPointsNeededSilverBelow: s.Ember.computed("currentSplit", (function() {
                    return this.getVictoriousPointsNeededForTier(this.get("currentSplit"), s.LeagueTierNames.getConstants().TIERS[2])
                })),
                victoriousPointsNeededGoldAbove: s.Ember.computed("currentSplit", (function() {
                    return this.getVictoriousPointsNeededForTier(this.get("currentSplit"), s.LeagueTierNames.getConstants().TIERS[3])
                })),
                showHonorWarning: s.Ember.computed("honorLevel", "isVictoriousSkinUnlocked", (function() {
                    return this.get("honorLevel") < 2 && !this.get("isVictoriousSkinUnlocked")
                }))
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "Fr4Ri/5N",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-rewards\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-rewards\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-rewards\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","ranked-victorious-progress-wrapper"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["top"]],6],["text","  "],["open-element","lol-uikit-radial-progress",[]],["static-attr","class","ranked-victorious-progress"],["static-attr","type","custom"],["dynamic-attr","percent",["unknown",["victoriousPointsPercentageEarned"]],null],["static-attr","start-angle","235"],["static-attr","end-angle","-55"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","slot","middle"],["static-attr","class","ranked-victorious-progress-middle"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ranked-victorious-progress-border"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ranked-victorious-icon-border"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ranked-victorious-icon"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["showHonorWarning"]]],null,2],["block",["if"],[["get",["isVictoriousSkinUnlocked"]]],null,1],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","ranked-rewards-divider"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","ranked-rewards-bar-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ranked-rewards-bar"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ranked-rewards-progress-bar"],["flush-element"],["close-element"],["text","\\n"],["block",["each"],[["get",["flattenedSplitRewards"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["ranked-reward-item"],null,[["reward","playerPoints","nextReward","is52px"],[["get",["reward","reward"]],["get",["playerPoints"]],["get",["nextReward"]],["get",["reward","is52px"]]]]],false],["text","\\n"]],"locals":["reward"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","ranked-victorious-icon-pip-slot"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","ranked-victorious-icon-checkmark"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","ranked-victorious-icon-warning"],["flush-element"],["text","\\n      "],["open-element","svg",[]],["static-attr","class","ranked-victorious-icon-warning-icon"],["static-attr","width","20"],["static-attr","height","20"],["static-attr","viewBox","0 0 21 20"],["static-attr","fill","none"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["flush-element"],["text","\\n        "],["open-element","path",[]],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M11.3889 3L18.5 15.25L17.6111 17H3.38889L2.5 15.25L9.61111 3H11.3889ZM9.61111 11.75L8.72222 7.375L10.5 6.5L12.2778 7.375L11.3889 11.75H9.61111ZM12.2778 14.375L10.5 16.125L8.72222 14.375L10.5 12.625L12.2778 14.375Z"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-rank-info"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-icons"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-icon iron"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-icon bronze"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-icon silver"],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-header"],["flush-element"],["append",["unknown",["tra","RANK_REWARDS_VICTORIOUS_TOOLTIP_IRON_TO_SILVER"]],false],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-points-wrapper"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-points-required"],["flush-element"],["append",["unknown",["victoriousPointsSilverBelow"]],false],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-points-text"],["flush-element"],["append",["unknown",["tra","RANK_REWARDS_VICTORIOUS_TOOLTIP_SP"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-divider"],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-rank-info"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-icons"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-icon gold-above"],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-header"],["flush-element"],["append",["unknown",["tra","RANK_REWARDS_VICTORIOUS_TOOLTIP_GOLD_ABOVE"]],false],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-points-wrapper"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-points-required"],["flush-element"],["append",["unknown",["victoriousPointsNeededGoldAbove"]],false],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-split-point-info-points-text"],["flush-element"],["append",["unknown",["tra","RANK_REWARDS_VICTORIOUS_TOOLTIP_SP"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","ranked-victorious-skin-earned"],["flush-element"],["append",["unknown",["tra","RANK_REWARDS_VICTORIOUS_TOOLTIP_SKIN_EARNED"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-honor-level-warning"],["flush-element"],["text","\\n            "],["open-element","svg",[]],["static-attr","class","honor-level-warning-icon"],["static-attr","width","21"],["static-attr","height","20"],["static-attr","viewBox","0 0 21 20"],["static-attr","fill","none"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["flush-element"],["text","\\n              "],["open-element","path",[]],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M11.3889 3L18.5 15.25L17.6111 17H3.38889L2.5 15.25L9.61111 3H11.3889ZM9.61111 11.75L8.72222 7.375L10.5 6.5L12.2778 7.375L11.3889 11.75H9.61111ZM12.2778 14.375L10.5 16.125L8.72222 14.375L10.5 12.625L12.2778 14.375Z"],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["append",["unknown",["tra","RANK_REWARDS_VICTORIOUS_TOOLTIP_HONOR_LEVEL_WARNING"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","class","ranked-victorious-tooltip"],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-background before-reveal"],["dynamic-attr","style",["unknown",["victoriousSkinBackgroundStyle"]],null],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-info"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-header"],["flush-element"],["append",["unknown",["tra","RANK_REWARDS_VICTORIOUS_TOOLTIP_HEADER"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","ranked-victorious-tooltip-description"],["flush-element"],["append",["unknown",["tra","RANK_REWARDS_VICTORIOUS_TOOLTIP_DESCRIPTION"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["showHonorWarning"]]],null,5],["block",["if"],[["get",["isVictoriousSkinUnlocked"]]],null,4,3],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1);
            n(82);
            const a = "Unlocked",
                i = "Selected";
            e.exports = s.Ember.Component.extend({
                classNames: ["ranked-reward-item-component"],
                classNameBindings: ["unlocked:unlocked:future-reward", "is32px:is-32-px", "is52px:is-52-px"],
                attributeBindings: ["reward.splitPoints:data-required-points"],
                layout: n(83),
                iconPath: null,
                previousRewardId: null,
                rewardId: s.Ember.computed.readOnly("reward.rewards.0.id"),
                rewardItemTooltipTitle: null,
                rewardType: s.Ember.computed.readOnly("reward.rewards.0.rewardType"),
                didReceiveAttrs: function() {
                    this._super(...arguments);
                    const e = this.get("rewardId");
                    e !== this.get("previousRewardId") && (this.set("previousRewardId", e), this.updateIconPath(e), this.updateRewardItemTooltipTitle(e))
                },
                updateIconPath(e) {
                    s.LeagueTierNames.asyncGetRewardImage(e).then((e => {
                        this.set("iconPath", e)
                    }))
                },
                updateRewardItemTooltipTitle(e) {
                    s.LeagueTierNames.asyncGetSplitRewardLocalization(e).then((e => {
                        this.set("rewardItemTooltipTitle", e)
                    }))
                },
                pointsRequiredTooltipMessage: s.Ember.computed("tra", "unlocked", "tra.RANK_REWARDS_ITEM_POINTS_REQUIRED", "playerPoints", "reward.splitPoints", (function() {
                    const e = this.get("tra");
                    return this.get("unlocked") ? "" : e.formatString("RANK_REWARDS_ITEM_POINTS_REQUIRED", {
                        currentPoints: this.get("playerPoints"),
                        pointsRequired: this.get("reward.splitPoints")
                    })
                })),
                unlocked: s.Ember.computed("playerPoints", "reward.splitPoints", (function() {
                    return this.get("playerPoints") >= this.get("reward.splitPoints")
                })),
                unlockedString: s.Ember.computed("tra.RANK_REWARDS_UNLOCKED", "unlocked", (function() {
                    return this.get("unlocked") ? this.get("tra.RANK_REWARDS_UNLOCKED") : ""
                })),
                nextRewardPointsRequired: s.Ember.computed("nextReward.splitPoints", (function() {
                    return this.get("nextReward.splitPoints") || 0
                })),
                pointsNeededText: s.Ember.computed("isNextReward", "reward.splitPoints", "playerPoints", (function() {
                    const e = this.get("isNextReward"),
                        t = this.get("reward.splitPoints"),
                        n = this.get("tra");
                    return e ? n.formatString("RANK_REWARDS_IN_PROGRESS_POINTS_REQUIRED", {
                        pointsRequired: t
                    }) : n.formatString("RANK_REWARDS_POINTS_REQUIRED", {
                        pointsRequired: t
                    })
                })),
                shouldShowPointProgress: s.Ember.computed.or("isNextReward", "isHovered"),
                rewardOptionIsDisabled: s.Ember.computed.alias("unlocked"),
                rewardOptionState: s.Ember.computed("unlocked", (function() {
                    return this.get("unlocked") ? i : a
                })),
                isNextReward: s.Ember.computed("nextRewardPointsRequired", "reward.splitPoints", (function() {
                    return this.get("nextRewardPointsRequired") === this.get("reward.splitPoints")
                })),
                hasBorder: s.Ember.computed("rewardType", (function() {
                    const e = this.get("rewardType"),
                        t = s.LeagueTierNames.getConstants().REWARD_TYPES;
                    return e === t.SUMMONER_ICON || e === t.CHAMPION_TOKEN
                })),
                is32px: s.Ember.computed.not("is52px"),
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
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "/VYx9lho",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-reward-item\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-reward-item\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\ranked-reward-item\\\\index.js\\" "],["text","\\n"],["append",["helper",["reward-option"],null,[["is32px","is52px","thumbIconPath","state","isDisabled","isHovered","isClicked"],[["get",["is32px"]],["get",["is52px"]],["get",["iconPath"]],["get",["rewardOptionState"]],["get",["rewardOptionIsDisabled"]],["get",["isHovered"]],["get",["isClicked"]]]]],false],["text","\\n"],["block",["if"],[["get",["shouldShowPointProgress"]]],null,3],["open-element","div",[]],["static-attr","class","ranked-reward-hitbox"],["dynamic-attr","onmousedown",["helper",["action"],[["get",[null]],"rewardClicked"],null],null],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"rewardHovered"],null],null],["dynamic-attr","onmouseleave",["helper",["action"],[["get",[null]],"rewardUnhovered"],null],null],["dynamic-attr","onmouseup",["helper",["action"],[["get",[null]],"rewardUnclicked"],null],null],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["class","tooltipPosition"],["my-tooltip","top"]],1],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","lock-overlay"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","lock-icon"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","class","ranked-reward-tooltip"],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ranked-reward-image-sizer"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["ranked-reward-image-border ",["unknown",["rewardType"]]," ",["helper",["if"],[["get",["hasBorder"]],"border"],null]]]],["flush-element"],["text","\\n          "],["open-element","img",[]],["dynamic-attr","class",["concat",["ranked-reward-image ",["unknown",["rewardType"]]]]],["dynamic-attr","src",["unknown",["iconPath"]],null],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"],["block",["unless"],[["get",["unlocked"]]],null,0],["text","      "],["close-element"],["text","\\n      "],["open-element","hr",[]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ranked-reward-title"],["flush-element"],["append",["unknown",["rewardItemTooltipTitle"]],false],["close-element"],["text","\\n      "],["open-element","h6",[]],["flush-element"],["append",["unknown",["unlockedString"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["pointsRequiredTooltipMessage"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","ranked-reward-point-progress-text current-points"],["flush-element"],["append",["unknown",["playerPoints"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","ranked-reward-point-progress"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isNextReward"]]],null,2],["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["ranked-reward-point-progress-text points-needed ",["helper",["if"],[["get",["unlocked"]],"unlocked"],null]]]],["flush-element"],["append",["unknown",["pointsNeededText"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1),
                a = n(24);
            n(85), e.exports = s.Ember.Component.extend({
                classNames: ["rated-badge-component"],
                layout: n(86),
                queue: null,
                summoner: null,
                rankedService: (0, s.dataBinding)("/lol-ranked", (0, s.getProvider)().getSocket()),
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
                isTft: s.Ember.computed("queueType", (function() {
                    return (0, a.isTftQueueType)(this.get("queueType"))
                })),
                ratedTier: s.Ember.computed("queue", "isTft", (function() {
                    const e = this.get("isTft"),
                        t = this.get("queue");
                    return t && t.ratedTier ? t.ratedTier : e ? s.LeagueTierNames.getConstants().LOWEST_TFT_RATED_TIER : s.LeagueTierNames.getConstants().LOWEST_CHERRY_RATED_TIER
                })),
                isUnrated: s.Ember.computed("ratedTier", (function() {
                    return s.LeagueTierNames.isUnrated(this.get("ratedTier"))
                })),
                ratedTierImagePath: s.Ember.computed("ratedTier", "queueType", (function() {
                    const e = this.get("ratedTier"),
                        t = this.get("queueType");
                    return e ? s.LeagueTierNames.getRatedPostgameBadge(e, t) : ""
                })),
                displayedRatedRating: s.Ember.computed("queue", "ratedTier", "isUnrated", (function() {
                    const e = this.get("ratedTier"),
                        t = this.get("isUnrated"),
                        n = this.get("queue");
                    return n && e && !t ? n.ratedRating : "---"
                })),
                fetchRatedData() {
                    const e = this.get("summoner.puuid"),
                        t = this.get("queueType");
                    e && t && (0, s.dataBinding)("lol-ranked").get(`/v1/ranked-stats/${e}`, {
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
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "ZidMx1yC",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rated-badge\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rated-badge\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rated-badge\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rated-badge-container"],["flush-element"],["text","\\n  "],["open-element","img",[]],["static-attr","class","rated-badge-icon"],["dynamic-attr","src",["concat",[["unknown",["ratedTierImagePath"]]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isTft"]]],null,0],["text","\\n  "],["open-element","div",[]],["static-attr","class","rated-badge-rating-text"],["flush-element"],["text","\\n    "],["append",["unknown",["displayedRatedRating"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rated-badge-divider"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rated-badge-player-container"],["flush-element"],["text","\\n    "],["open-element","lol-social-avatar-icon",[]],["dynamic-attr","icon-id",["unknown",["summoner","profileIconId"]],null],["static-attr","availability","online"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","rated-badge-player-name"],["flush-element"],["text","\\n      "],["append",["unknown",["summoner","displayName"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-lottie",[]],["static-attr","class","rated-badge-highlight"],["static-attr","image-path","/fe/lol-static-assets/lottie/tft-rated/images/"],["static-attr","src","/fe/lol-static-assets/lottie/tft-rated/Badge_Highlight_EOG.json"],["static-attr","resize-to-fit","true"],["static-attr","loop","true"],["static-attr","autoplay","true"],["flush-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1),
                a = n(23);

            function i(e) {
                return e < 10 ? "0" + e : e
            }
            n(88), e.exports = s.Ember.Component.extend({
                classNames: ["countdown-timer-component"],
                layout: n(89),
                getCurrentTime: function() {
                    return (new Date).getTime()
                },
                hasTimeLeft: s.Ember.computed("nextCountdown", (function() {
                    return this.get("nextCountdown") >= 1e3
                })),
                countdownChanged: s.Ember.observer("countdownToTime", (function() {
                    const e = this.get("countdownToTime") - this.getCurrentTime();
                    var t;
                    this.set("nextCountdown", Math.max(e, 0)), this.clearTimer(), this.set("countdownTimer", setInterval((t = this, () => {
                        let e = t.get("nextCountdown");
                        e >= a.PROMOTE_COUNTDOWN_INTERVAL_MS ? (e -= a.PROMOTE_COUNTDOWN_INTERVAL_MS, t.set("nextCountdown", e)) : t.clearTimer()
                    }), a.PROMOTE_COUNTDOWN_INTERVAL_MS))
                })),
                countdownTimeLeft: s.Ember.computed("nextCountdown", (function() {
                    const e = this.get("nextCountdown"),
                        t = s.moment.duration(e);
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
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "+yYn7mP4",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\countdown-timer-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\countdown-timer-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\countdown-timer-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["countdown-label ",["helper",["if"],[["get",["isUrgent"]],"urgent"],null]]]],["flush-element"],["text","\\n  "],["append",["unknown",["countdownLabel"]],false],["text"," \\n"],["close-element"],["text","\\n \\n"],["block",["if"],[["get",["hasTimeLeft"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["unknown",["onRefresh"]],null],["static-attr","class","countdown-refresh-button"],["flush-element"],["text","\\n  "],["append",["unknown",["tra","RANKED_REFRESH_LABEL"]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["open-element","div",[]],["dynamic-attr","class",["concat",["countdown-time-left ",["helper",["if"],[["get",["isUrgent"]],"urgent"],null]]]],["flush-element"],["text","\\n  "],["append",["unknown",["countdownTimeLeft"]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1);
            const a = (0, s.emberDataBinding)({
                Ember: s.Ember,
                websocket: (0, s.getProvider)().getSocket(),
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
            e.exports = s.Ember.Service.extend(a, {
                spectateEnabled: s.Ember.computed("leagueSpectateToggleJMX.Enabled", "clashPlaymodeRestricted.isRestricted", (function() {
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
            var s, a = n(1),
                i = n(23),
                o = (s = n(92)) && s.__esModule ? s : {
                    default: s
                };
            n(93);
            const l = (0, a.emberDataBinding)({
                Ember: a.Ember,
                websocket: (0, a.getProvider)().getSocket(),
                boundProperties: {
                    currentSummoner: "/lol-summoner/v1/current-summoner"
                }
            });
            e.exports = a.Ember.Component.extend(l, o.default, {
                classNames: ["leagues-promotion-vignette-v2-component"],
                layout: n(94),
                animationStarted: !1,
                audioObject: null,
                queueType: a.Ember.computed.alias("notification.queueType"),
                currentTier: a.Ember.computed.alias("notification.tier"),
                previousTier: a.Ember.computed("currentTier", "isTierPromotion", "tiers.[]", (function() {
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
                isAnimationEnabled: a.Ember.computed("isLowSpec", (function() {
                    return !this.get("isLowSpec")
                })),
                shouldAnimate: a.Ember.computed("isLowSpec", "isShowing", "animationStarted", (function() {
                    return !this.get("isLowSpec") && this.get("isShowing") && !this.get("animationStarted")
                })),
                introVideoPath: a.Ember.computed("previousTier", "isCompletedProvisionals", (function() {
                    if (this.get("isCompletedProvisionals")) return `${i.ASSET_PATH}videos/ranked/tier-promotion-from-unranked.webm`;
                    const e = this.get("previousTier");
                    return e ? `${i.ASSET_PATH}videos/ranked/tier-promotion-from-${e.toLowerCase()}.webm` : ""
                })),
                outroVideoPath: a.Ember.computed("currentTier", (function() {
                    const e = this.get("currentTier");
                    return e ? `${i.ASSET_PATH}videos/ranked/tier-promotion-to-${e.toLowerCase()}.webm` : ""
                })),
                introAudioPath: a.Ember.computed("previousTier", "isCompletedProvisionals", (function() {
                    if (this.get("isCompletedProvisionals")) return `${i.ASSET_PATH}sounds/ranked/sfx-tier-wings-promotion-from-unranked.ogg`;
                    const e = this.get("previousTier");
                    return e ? `${i.ASSET_PATH}sounds/ranked/sfx-tier-wings-promotion-from-${e.toLowerCase()}.ogg` : ""
                })),
                outroAudioPath: a.Ember.computed("currentTier", (function() {
                    const e = this.get("currentTier");
                    return e ? `${i.ASSET_PATH}sounds/ranked/sfx-tier-wings-promotion-to-${e.toLowerCase()}.ogg` : ""
                })),
                outroImagePath: a.Ember.computed("currentTier", (function() {
                    const e = this.get("currentTier");
                    return e ? `${i.ASSET_PATH}images/ranked-emblem/emblem-${e.toLowerCase()}.png` : ""
                })),
                startAnimation: function() {
                    const e = document.getElementById("ceremony-intro"),
                        t = document.getElementById("ceremony-outro"),
                        n = document.querySelector(".leagues-promotion-emblem");
                    if (!e || !t) return;
                    const s = this.get("introAudioPath"),
                        a = this.createSound(s),
                        i = this.get("outroAudioPath"),
                        o = this.createSound(i);
                    this.set("animationStarted", !0), e.addEventListener("signal", (() => {
                        t.play(), this.playAudio(o)
                    })), t.addEventListener("signal", (() => {
                        n.classList.remove("hidden")
                    })), e.play(), this.playAudio(a)
                },
                playAudio: function(e) {
                    !this.get("isLowSpec") && e && (e.play(), this.set("audioObject", e))
                },
                division: a.Ember.computed.alias("notification.division"),
                leaguePoints: a.Ember.computed.alias("notification.leaguePoints"),
                isApex: a.Ember.computed("tierUpperCase", (function() {
                    return a.LeaguesConsts.APEX_TIERS.includes(this.get("tierUpperCase"))
                })),
                isTierPromotion: a.Ember.computed("isCompletedProvisionals", "isApex", "division", (function() {
                    const e = this.get("isCompletedProvisionals"),
                        t = this.get("isApex"),
                        n = this.get("division");
                    return !e && (t || n === a.LeaguesConsts.DIVISIONS[0])
                })),
                isCompletedProvisionals: a.Ember.computed("notification.notifyReason", (function() {
                    return "COMPLETED_PROVISIONALS" === this.get("notification.notifyReason")
                })),
                tierUpperCase: a.Ember.computed("notification.tier", (function() {
                    const e = this.get("notification.tier");
                    return e ? e.toUpperCase() : ""
                })),
                tierLowerCase: a.Ember.computed("notification.tier", (function() {
                    const e = this.get("notification.tier");
                    return e ? e.toLowerCase() : ""
                })),
                headerText: a.Ember.computed("isCompletedProvisionals", "fullTierLoc", "tierUpperCase", "division", "leaguePoints", (function() {
                    return this.get("isCompletedProvisionals") ? this.get("tra").formatString("LEAGUES_COMPLETED_PROVISIONALS_VIGNETTE_HEADER", {
                        tierDivisionLpLoc: a.LeagueTierNames.getTierDivisionLpLoc(this.get("tierUpperCase"), this.get("division"), this.get("leaguePoints"))
                    }) : this.get("tra").formatString("LEAGUES_PROMOTION_VIGNETTE_HEADER", {
                        tierDivisionLoc: a.LeagueTierNames.getFullTierDivisionName(this.get("tierUpperCase"), this.get("division"))
                    })
                })),
                subheaderText: a.Ember.computed("isCompletedProvisionals", "queueType", (function() {
                    const e = this.get("queueType"),
                        t = a.LeagueTierNames.getRankedQueueName(e);
                    return this.get("isCompletedProvisionals") ? this.get("tra").formatString("LEAGUES_COMPLETED_PROVISIONALS_VIGNETTE_SUBHEADER", {
                        queueType: t
                    }) : this.get("tra").formatString("LEAGUES_PROMOTION_VIGNETTE_SUBHEADER", {
                        queueType: t
                    })
                })),
                labelText: a.Ember.computed("currentSummoner.displayName", (function() {
                    return this.get("currentSummoner.displayName")
                })),
                shouldShowProfileIcon: a.Ember.computed("profileIconPath", (function() {
                    return !!this.get("profileIconPath")
                })),
                profileIconPath: a.Ember.computed("currentSummoner.profileIconId", (function() {
                    const e = this.get("currentSummoner.profileIconId");
                    return e ? `/lol-game-data/assets/v1/profile-icons/${e}.jpg` : null
                }))
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1);
            const a = "sfx-ui",
                i = "music-ambience";
            e.exports = s.Ember.Mixin.create({
                createSound: function(e) {
                    if (!1 === e) return;
                    return s.AudioPlugin.getChannel(a).createSound(e)
                },
                createAmbience: function(e) {
                    if (!1 === e) return;
                    return s.AudioPlugin.getChannel(i).createSound(e, {
                        isLoop: !0,
                        fadeIn: !0
                    })
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "0ukx6krI",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-promotion-vignette-v2-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-promotion-vignette-v2-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-promotion-vignette-v2-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["leagues-vignette-parallax-background ",["unknown",["vignetteSize"]]]]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-parallax-background",[]],["dynamic-attr","animated",["concat",[["unknown",["isAnimationEnabled"]]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","leagues-promotion-vignette-header"],["flush-element"],["text","\\n  "],["append",["unknown",["headerText"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","leagues-promotion-vignette-subheader"],["flush-element"],["text","\\n  "],["append",["helper",["sanitize"],[["get",["subheaderText"]]],null],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["leagues-promotion-vignette-label ",["helper",["unless"],[["get",["isLowSpec"]],"animated"],null]," ",["helper",["if"],[["get",["isCompletedProvisionals"]],"provisional"],null]," ",["helper",["if"],[["get",["isTierPromotion"]],"tier"],null]," ",["unknown",["tierLowerCase"]]," ",["helper",["if"],[["get",["animationStarted"]],"fadeIn"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["shouldShowProfileIcon"]]],null,2],["text","  "],["append",["unknown",["labelText"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["isLowSpec"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","\\n  "],["open-element","img",[]],["static-attr","class","leagues-promotion-emblem hidden"],["dynamic-attr","src",["unknown",["outroImagePath"]],null],["flush-element"],["close-element"],["text","\\n  "],["open-element","lol-uikit-video",[]],["static-attr","class","ceremony-video"],["static-attr","id","ceremony-intro"],["static-attr","fade-in","250"],["static-attr","fade-out","0"],["static-attr","signal-before-end","0.1"],["dynamic-attr","src",["unknown",["introVideoPath"]],null],["flush-element"],["close-element"],["text","\\n  "],["open-element","lol-uikit-video",[]],["static-attr","class","ceremony-video"],["static-attr","id","ceremony-outro"],["static-attr","fade-in","0"],["static-attr","fade-out","0"],["static-attr","signal-before-end","0.15"],["dynamic-attr","src",["unknown",["outroVideoPath"]],null],["flush-element"],["close-element"],["text","\\n\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","img",[]],["static-attr","class","leagues-promotion-emblem"],["dynamic-attr","src",["unknown",["outroImagePath"]],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","span",[]],["static-attr","class","leagues-promotion-vignette-profile-icon-border"],["flush-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["profileIconPath"]]]]],["static-attr","class","leagues-promotion-vignette-profile-icon"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1);
            n(96), e.exports = s.Ember.Component.extend({
                classNames: ["leagues-reward-vignette-component"],
                layout: n(97),
                imagePath: null,
                subheaderText: null,
                init: function() {
                    this._super(...arguments)
                },
                headerText: s.Ember.computed((function() {
                    return this.get("tra").get("LEAGUES_REWARD_VIGNETTE_HEADER")
                })),
                isAnimationEnabled: s.Ember.computed("isLowSpec", (function() {
                    return !this.get("isLowSpec")
                })),
                showChromaBackground: s.Ember.computed("notification.rewardEarnedType", (function() {
                    return this.get("notification.rewardEarnedType") === s.LeagueTierNames.getConstants().REWARD_TYPES.CHAMPION_SKIN_CHROMA
                })),
                showGoldBackgroundGlow: s.Ember.computed("notification.rewardEarnedType", (function() {
                    const e = this.get("notification.rewardEarnedType"),
                        t = s.LeagueTierNames.getConstants().REWARD_TYPES;
                    return e === t.SUMMONER_ICON || e === t.CHAMPION_TOKEN
                }))
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "LAanb+Da",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-reward-vignette-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-reward-vignette-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\leagues-reward-vignette-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["leagues-vignette-parallax-background ",["unknown",["vignetteSize"]]]]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-parallax-background",[]],["dynamic-attr","animated",["concat",[["unknown",["isAnimationEnabled"]]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","leagues-reward-vignette-header"],["flush-element"],["text","\\n  "],["append",["unknown",["headerText"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","leagues-reward-vignette-subheader"],["flush-element"],["text","\\n  "],["append",["helper",["sanitize"],[["get",["notification","subheaderText"]]],null],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["leagues-reward-vignette-container ",["helper",["if"],[["get",["showChromaBackground"]],"chromabackground"],null]," ",["helper",["if"],[["get",["showGoldBackgroundGlow"]],"glow"],null]]]],["flush-element"],["text","\\n  "],["open-element","img",[]],["static-attr","class","leagues-reward-vignette-image"],["dynamic-attr","src",["concat",[["unknown",["notification","imagePath"]]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s, a = n(1),
                i = n(23),
                o = (s = n(92)) && s.__esModule ? s : {
                    default: s
                };
            n(99);
            const l = {
                GRAY: "01-Gray",
                GREEN: "02-GrayToGreen",
                BLUE: "03-GreenToBlue",
                PURPLE: "04-BlueToPurple",
                ORANGE: "05-PurpleToOrange"
            };
            e.exports = a.Ember.Component.extend(o.default, {
                classNames: ["rated-promotion-vignette-component"],
                layout: n(100),
                animationStarted: !1,
                didUpdateAttrs: function() {
                    if (this._super(...arguments), this.get("isShowing") && !this.get("animationStarted")) {
                        const e = this.createSound(this.get("audioPath"));
                        this.set("animationStarted", !0), e && e.play()
                    }
                },
                ratedTier: a.Ember.computed.readOnly("notification.ratedTier"),
                tierText: a.Ember.computed("ratedTier", "notification.queueType", (function() {
                    const e = this.get("ratedTier"),
                        t = this.get("notification.queueType");
                    return this.get(`tra.${t}_tier_label_${e}`)
                })),
                audioPath: a.Ember.computed("ratedTier", (function() {
                    return "GRAY" === this.get("ratedTier") ? `${i.ASSET_PATH}sounds/tft-rated/sfx-celebrate-tft-rated-grayrating.ogg` : `${i.ASSET_PATH}sounds/tft-rated/sfx-celebrate-tft-rated-promote.ogg`
                })),
                lottiePath: a.Ember.computed("ratedTier", "notification.queueType", (function() {
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
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "AtI7Jaal",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rated-promotion-vignette-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rated-promotion-vignette-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\rated-promotion-vignette-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rated-promotion-vignette-header"],["flush-element"],["text","\\n  "],["append",["unknown",["tra","rated_promotion_vignette_header"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","rated-vignette-lottie-frame"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","rated-vignette-lottie-container"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-lottie",[]],["dynamic-attr","src",["concat",[["unknown",["lottiePath"]]]]],["dynamic-attr","image-path",["concat",[["unknown",["lottieImagePath"]]]]],["dynamic-attr","text-tierlabel",["concat",[["unknown",["tierText"]]]]],["static-attr","autoplay","true"],["flush-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s, a = n(1),
                i = (s = n(92)) && s.__esModule ? s : {
                    default: s
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
            e.exports = a.Ember.Component.extend(i.default, {
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
                cherryRatingVideoSrc: a.Ember.computed("ratedTier", "notification.queueType", (function() {
                    return o[this.get("ratedTier")]
                })),
                ratedTier: a.Ember.computed.readOnly("notification.ratedTier"),
                tierText: a.Ember.computed("ratedTier", (function() {
                    const e = {
                        GREEN: "tra.CHERRY_tier_label_GREEN",
                        BLUE: "tra.CHERRY_tier_label_BLUE",
                        PURPLE: "tra.CHERRY_tier_label_PURPLE",
                        ORANGE: "tra.CHERRY_tier_label_ORANGE"
                    } [this.get("ratedTier")];
                    return e ? this.get(e) : ""
                })),
                audioPath: a.Ember.computed("ratedTier", (function() {
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
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "UTmNo7/5",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\cherry-rated-promotion-vignette-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\cherry-rated-promotion-vignette-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\cherry-rated-promotion-vignette-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cherry-rated-promotion-vignette-header"],["flush-element"],["text","\\n  "],["append",["unknown",["tra","rated_promotion_vignette_header"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","cherry-promotion-vignette-body"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cherry-promotion-vignette-video-container"],["flush-element"],["text","\\n        "],["open-element","uikit-video",[]],["static-attr","preload",""],["dynamic-attr","src",["unknown",["cherryRatingVideoSrc"]],null],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","cherry-promotion-vignette-background"],["dynamic-attr","src",["concat",[["unknown",["backgroundSrc"]]]]],["static-attr","alt",""],["static-attr","role","presentation"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","cherry-rated-promotion-tier-text"],["flush-element"],["text","\\n    "],["append",["unknown",["tierText"]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            e.exports = n.p + "cherry-promotion-vignette-background.png"
        }, (e, t, n) => {
            "use strict";
            var s = n(1);
            e.exports = s.Ember.Component.extend({
                classNames: ["notifications-root"],
                layout: n(114),
                init() {
                    this._super(...arguments), this._dataBinding = s.dataBinding.bindTo((0, s.getProvider)().getSocket()), this._dataBinding.observe("/lol-login/v1/session", this, this.handleLoginSession), this._dataBinding.observe("/lol-settings/v2/ready", this, this.handleSettingsReady), this._dataBinding.observe("/lol-seasons/v1/season/product/LOL", this, this.handleCurrentSeason), this._dataBinding.observe("/lol-ranked/v1/splits-config", this, this.handleSplitsConfig), this._dataBinding.observe("/lol-ranked/v1/current-ranked-stats", this, this.handleRankedStats), this._dataBinding.observe("/riotclient/region-locale", this, this.handleRegionLocale), this._dataBinding.observe("/lol-summoner/v1/current-summoner", this, this.handleCurrentSummoner)
                },
                willDestroyElement() {
                    this._super(...arguments), this._dataBinding.unobserve(this)
                },
                handleAccountLeaguesSettings(e) {
                    this.set("accountLeaguesSettings", e)
                },
                handleLoginSession(e) {
                    this.set("session", e)
                },
                handleSettingsReady(e) {
                    e && this._dataBinding.observe("/lol-settings/v2/account/LCUPreferences/lol-leagues", this, this.handleAccountLeaguesSettings), this.set("settingsReady", e)
                },
                handleCurrentSeason(e) {
                    this.set("currentSeason", e), this.get("recentSeasons") || this._dataBinding.post("/lol-seasons/v1/allSeasons/product/LOL", {
                        lastNYears: 2
                    }).then((e => {
                        this.set("recentSeasons", e)
                    }))
                },
                handleSplitsConfig(e) {
                    this.set("splitsConfig", e)
                },
                handleRankedStats(e) {
                    this.set("currentRankedStats", e)
                },
                handleRegionLocale(e) {
                    this.set("regionLocale", e)
                },
                handleCurrentSummoner(e) {
                    this.set("currentSummoner", e)
                },
                previousSeason: s.Ember.computed("recentSeasons.@each.seasonEnd", (function() {
                    const e = this.get("recentSeasons") || [];
                    e.sort(((e, t) => t.seasonEnd - e.seasonEnd));
                    const t = Date.now();
                    return e.find((e => t > e.seasonEnd))
                })),
                previousSplit: s.Ember.computed("splitsConfig.splits.@each.seasonId", "previousSeason.seasonId", (function() {
                    const e = this.get("splitsConfig.splits") || [],
                        t = this.get("previousSeason.seasonId");
                    return e.find((e => e.seasonId === t))
                })),
                isDependenciesInitialized: s.Ember.computed("session.state", "currentSummoner.unnamed", "currentSummoner.nameChangeFlag", "currentSeason", "previousSeason", "previousSplit", "splitsConfig", "currentRankedStats", "settingsReady", "accountLeaguesSettings", "regionLocale", (function() {
                    const e = this.get("session.state"),
                        t = this.get("currentSummoner"),
                        n = this.get("currentSeason"),
                        s = this.get("previousSeason"),
                        a = this.get("previousSplit"),
                        i = this.get("splitsConfig"),
                        o = this.get("currentRankedStats"),
                        l = this.get("settingsReady"),
                        r = this.get("accountLeaguesSettings"),
                        c = this.get("regionLocale");
                    return !this._isLoginSessionInvalid(e) && this._isNamedSummoner(t) && n && s && a && i && o && l && r && c
                })),
                _isLoginSessionInvalid: e => "SUCCEEDED" !== e,
                _isNamedSummoner: e => e && !e.unnamed && !e.nameChangeFlag
            })
        }, (e, t, n) => {
            const s = n(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "c35nUZL0",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\notifications-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-leagues\\\\src\\\\app\\\\notifications-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["isDependenciesInitialized"]]],null,0],["text","\\n"],["append",["unknown",["leagues-dialogs"]],false],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["split-notifications"],null,[["accountLeaguesSettings","currentSummoner","splitsConfig","currentRankedStats","currentSeason","regionLocale"],[["get",["accountLeaguesSettings"]],["get",["currentSummoner"]],["get",["splitsConfig"]],["get",["currentRankedStats"]],["get",["currentSeason","seasonId"]],["get",["regionLocale"]]]]],false],["text","\\n  "],["append",["helper",["split-start-modal"],null,[["accountLeaguesSettings","currentSummoner","splitsConfig","currentRankedStats","currentSeason","previousSeasonId","regionLocale"],[["get",["accountLeaguesSettings"]],["get",["currentSummoner"]],["get",["splitsConfig"]],["get",["currentRankedStats"]],["get",["currentSeason","seasonId"]],["get",["previousSeason","seasonId"]],["get",["regionLocale"]]]]],false],["text","\\n  "],["append",["helper",["eos-notifications"],null,[["regionLocale","splitsConfig"],[["get",["regionLocale"]],["get",["splitsConfig"]]]]],false],["text","\\n  "],["append",["helper",["season-memorial-modal"],null,[["accountLeaguesSettings","currentSummoner","currentRankedStats","previousSeason","previousSplit","regionLocale"],[["get",["accountLeaguesSettings"]],["get",["currentSummoner"]],["get",["currentRankedStats"]],["get",["previousSeason"]],["get",["previousSplit"]],["get",["regionLocale"]]]]],false],["text","\\n  "],["append",["helper",["season-start-modal"],null,[["currentSeason"],[["get",["currentSeason","seasonId"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var s, a = n(1),
                i = (s = n(116)) && s.__esModule ? s : {
                    default: s
                },
                o = n(23);
            n(117);
            const l = (0, a.emberDataBinding)({
                    Ember: a.Ember,
                    websocket: (0, a.getProvider)().getSocket(),
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
            e.exports = a.Ember.Component.extend(l, {
                currentSeason: null,
                platformConfigObserver: a.Ember.observer("currentSeason", "accountLeaguesSettings", "seasonModalEnabled", (function() {
                    const e = this.get("accountLeaguesSettings"),
                        t = this.get("currentSeason");
                    this.get("seasonModalEnabled") && void 0 !== e && this._displayTakeovers(t, e)
                })),
                _displayTakeovers(e, t) {
                    const n = r,
                        s = t && t.data ? t.data[n] : null;
                    s && e <= s.season || this._showSeasonStartToast(e)
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
                    (0, a.dataBinding)("/player-notifications").post("/v1/notifications", t), i.default.saveAccountSetting(r, {
                        season: e
                    })
                }
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = n(1);
            var a = {
                saveLocalSetting: (e, t) => {
                    const n = {
                        [e]: t
                    };
                    return (0, s.dataBinding)("/lol-settings").patch("/v1/local/lol-leagues", {
                        data: n,
                        schemaVersion: 1
                    })
                },
                saveAccountSetting: (e, t) => {
                    const n = {
                        [e]: t
                    };
                    return (0, s.dataBinding)("/lol-settings").patch("/v2/account/LCUPreferences/lol-leagues", {
                        data: n,
                        schemaVersion: 1
                    })
                }
            };
            t.default = a
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            var s, a = n(1),
                i = n(23),
                o = n(50),
                l = (s = n(116)) && s.__esModule ? s : {
                    default: s
                };
            n(119);
            const r = n(120),
                c = (0, a.emberDataBinding)({
                    Ember: a.Ember,
                    websocket: (0, a.getProvider)().getSocket(),
                    basePaths: {
                        careerStats: "/lol-career-stats",
                        gameData: "/lol-game-data",
                        collections: "/lol-collections",
                        platform: "/lol-platform-config"
                    },
                    boundProperties: {
                        EosNotificationsEnabled: {
                            api: "platform",
                            path: "/v1/namespaces/LeagueConfig/EosNotificationsEnabled",
                            default: null
                        }
                    }
                }),
                u = "ranked",
                d = "split_end",
                p = "ranked_notification_splits_split_end_title",
                m = "ranked_notification_splits_split_end_detail",
                g = "last-split-end-notification";
            e.exports = a.Ember.Component.extend(c, {
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
                rewardsService: a.Ember.inject.service("rewards"),
                careerStatsService: a.Ember.inject.service("careerStats"),
                careerStatsAPI: a.CareerStatsAPI,
                init: function() {
                    this._super(...arguments);
                    this.get("isPlayerNotificationsInitialized") || this._initPlayerNotifications()
                },
                currentSplit: a.Ember.computed("splitsConfig", "splitsConfig.currentSplitId", (function() {
                    return this._getCurrentSplitData(this.get("splitsConfig"))
                })),
                platformConfigObserver: a.Ember.observer("splitsConfig", "splitsConfig.currentSplitId", "currentRankedStats", "currentRankedStats.queues", "rewardsService", "rewardsService.emoteCatalog", "rewardsService.summonerIconCatalog", "EosNotificationsEnabled", "careerStatsService", (function() {
                    const e = this.get("accountLeaguesSettings"),
                        t = this.get("currentSeason"),
                        n = this.get("regionLocale"),
                        s = this.get("hasSplitEndNotificationSentThisSession"),
                        a = this.get("EosNotificationsEnabled"),
                        i = this.get("currentSplit");
                    if (!i || !a) return;
                    const l = parseFloat(t + "." + i.splitId),
                        r = (0, o.getDaysBetweenDateMillis)(Date.now(), i.endTimeMillis);
                    this._shouldDisplaySplitEndNotification(l, r, e, s) && this._displaySplitEndNotification(l, i, n)
                })),
                _shouldDisplaySplitEndNotification: function(e, t, n, s) {
                    const a = n.data && n.data[g] >= e;
                    return !s && !a && !(t <= 0) && t <= 14
                },
                _displaySplitEndNotification: function(e, t, n) {
                    const s = {
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
                    (0, a.dataBinding)("player-notifications").post("/v1/notifications", s), l.default.saveAccountSetting(g, e), this.set("hasSplitEndNotificationSentThisSession", !0)
                },
                _renderSplitEndNotification: function(e) {
                    const t = document.createElement("div"),
                        n = this.get("regionLocale"),
                        s = isNaN(e.data.endDate) ? e.data.endDate : (0, o.convertDateMillisToString)(e.data.endDate - 1, n, {
                            month: "long",
                            day: "numeric"
                        }),
                        a = r({
                            title: this.get("tra").formatString(p, {
                                splitId: e.data.splitId,
                                endDate: s
                            }),
                            detail: this.get("tra").formatString(m, {
                                endDate: s
                            })
                        });
                    return t.innerHTML = a, t.classList.add("split-end-notification"), t
                },
                _initPlayerNotifications() {
                    a.Social.playerNotifications().registerToastRenderer(u, d, this._renderSplitEndNotification.bind(this)), a.Social.playerNotifications().on(u, d, "click", this._navigateToProfileSubsection.bind(this, i.PROFILE_RANKED_SUBSECTION_ID)), this.set("isPlayerNotificationsInitialized", !0)
                },
                _getCurrentSplitData: function(e) {
                    if (!e || !e.currentSplitId) return null;
                    const t = e.currentSplitId,
                        n = a.Lodash.find(e.splits, (e => e.splitId === t));
                    return n || null
                },
                _navigateToProfileSubsection: function(e) {
                    return a.ProfilesAPI.setActive(!0), a.ProfilesAPI.mainSection().show(e), !0
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            var s = n(55);
            e.exports = (s.default || s).template({
                compiler: [7, ">= 4.0.0"],
                main: function(e, t, n, s, a) {
                    var i, o = null != t ? t : e.nullContext || {},
                        l = n.helperMissing,
                        r = "function",
                        c = e.escapeExpression;
                    return '<div class="title">' + c(typeof(i = null != (i = n.title || (null != t ? t.title : t)) ? i : l) === r ? i.call(o, {
                        name: "title",
                        hash: {},
                        data: a
                    }) : i) + '</div>\r\n<div class="detail">' + c(typeof(i = null != (i = n.detail || (null != t ? t.detail : t)) ? i : l) === r ? i.call(o, {
                        name: "detail",
                        hash: {},
                        data: a
                    }) : i) + "</div>"
                },
                useData: !0
            })
        }, (e, t, n) => {
            "use strict";
            var s, a = n(1),
                i = n(5),
                o = n(23),
                l = n(50),
                r = (s = n(116)) && s.__esModule ? s : {
                    default: s
                },
                c = n(24);
            n(122);
            const u = n(123),
                d = (0, a.emberDataBinding)({
                    Ember: a.Ember,
                    websocket: (0, a.getProvider)().getSocket(),
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
            e.exports = a.Ember.Component.extend(d, {
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
                rewardsService: a.Ember.inject.service("rewards"),
                careerStatsService: a.Ember.inject.service("careerStats"),
                careerStatsAPI: a.CareerStatsAPI,
                init: function() {
                    this._super(...arguments)
                },
                currentSplit: a.Ember.computed("splitsConfig", "splitsConfig.currentSplitId", (function() {
                    return this._getCurrentSplitData(this.get("splitsConfig"))
                })),
                platformConfigObserver: a.Ember.observer("splitsConfig", "splitsConfig.currentSplitId", "currentRankedStats", "currentRankedStats.queues", "isSplitStartModalEnabled", "careerStatsService", (function() {
                    const e = this.get("accountLeaguesSettings"),
                        t = this.get("currentSeason"),
                        n = this.get("currentRankedStats"),
                        s = this.get("regionLocale"),
                        a = this.get("currentSummoner"),
                        i = this.get("careerStatsService"),
                        o = this.get("hasSplitStartModalShownThisSession"),
                        r = this.get("isSplitStartModalEnabled"),
                        c = this.get("currentSplit");
                    if (!c) return;
                    const u = parseFloat(t + "." + c.splitId),
                        d = (0, l.getDaysBetweenDateMillis)(Date.now(), c.endTimeMillis),
                        p = this._getHighestRankedNonTFTEntryQueue(n);
                    if (this._shouldTryToDisplaySplitStartModal(u, d, e, p, a, i, r, o)) {
                        this.set("hasSplitStartModalShownThisSession", !0);
                        const e = this.get("previousSeasonId");
                        i.loadPreviousSeasonStatsGames(a.puuid, e).then((e => {
                            this._tryToDisplaySplitStartModal(u, c, n, p, s, i, t, e, a.puuid)
                        }))
                    }
                })),
                _shouldTryToDisplaySplitStartModal(e, t, n, s, a, i, o, l) {
                    const r = t <= 14,
                        c = n.data && n.data[p] >= e,
                        u = Boolean(s),
                        d = Boolean(a),
                        m = Boolean(i);
                    return o && !l && u && !r && !c && d && m
                },
                _tryToDisplaySplitStartModal: function(e, t, n, s, a, i, o, l, r) {
                    const c = this.get("allowSplitStartModalMockCareerStatsData");
                    if ((!l || !l.games || l.games.length < 10) && !c) return;
                    const u = this._getBestChampionStatsPanelData(l.games, n, s, i, o, r, c);
                    u && u.then((i => {
                        this._displaySplitStartModal(e, t, n, s, i, a)
                    }))
                },
                _displaySplitStartModal: function(e, t, n, s, i, l) {
                    const c = this._getSplitStartModalRewardsInfoPromise(t),
                        d = a.LeagueTierNames.getTiersForQueue(s.queueType);
                    return Promise.all([c, d]).then((c => {
                        const d = c[0],
                            m = c[1];
                        return a.ModalManager.add({
                            type: "DialogConfirm",
                            data: {
                                contents: this._renderSplitStartModal(u, t, d, n, s, i, l, m),
                                acceptText: this.get("tra.SPLIT_START_TAKEOVER_SEE_STATS_BUTTON_TEXT"),
                                declineText: this.get("tra.SPLIT_START_TAKEOVER_CLOSE_BUTTON_TEXT"),
                                closeButton: !0,
                                acceptHandler: this._navigateToProfileSubsection.bind(this, o.PROFILE_STATS_SUBSECTION_ID)
                            }
                        }), r.default.saveAccountSetting(p, e)
                    }))
                },
                _renderSplitStartModal: function(e, t, n, s, a, i, o, l) {
                    const r = {
                        titlesInfo: this._getSplitStartModalTitlesInfo(t, o),
                        rewardsInfo: n,
                        rankInfo: this._getSplitStartModalRankInfo(s, a, l),
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
                        s = {},
                        i = a.LeagueTierNames.getConstants().REWARD_TYPES,
                        o = [];
                    return a.Lodash.forEach(n, (e => {
                        a.Lodash.forEach(e.rewards, (e => {
                            const n = e.rewardType;
                            if (!s[e.id]) {
                                const l = this.get(`tra.REWARD_TYPE_${n}_DESCRIPTION`),
                                    r = `reward-image-${n.toLowerCase()}`,
                                    c = {
                                        description: this.get("tra").formatString("SPLIT_START_TAKEOVER_REWARD_DESCRIPTION", {
                                            rewardTypeDescription: l
                                        }),
                                        cssClass: r
                                    };
                                n === i.EMOTE || n === i.CHAMPION_TOKEN || n === i.SUMMONER_ICON ? (t.unshift(c), o.unshift(a.LeagueTierNames.asyncGetRewardImage(e.id))) : (t.push(c), o.push(a.LeagueTierNames.asyncGetRewardImage(e.id))), s[e.id] = !0
                            }
                        }))
                    })), Promise.all(o).then((e => {
                        for (let n = 0; n < t.length; n++) t[n].imagePath = e[n];
                        return t
                    }))
                },
                _getSplitStartModalRankInfo: function(e, t, n) {
                    const s = t.tier,
                        i = t.division,
                        o = a.LeagueTierNames.getUpOneDivision(s, i, n),
                        l = o ? o.tier : null,
                        r = o ? o.division : null;
                    return {
                        currentRankTitle: this.get("tra.SPLIT_START_TAKEOVER_CURRENT_RANK_TEXT"),
                        currentRankTier: s,
                        currentRankDivision: i,
                        currentRankText: a.LeagueTierNames.getFullTierDivisionName(s, i),
                        nextRankTitle: this.get("tra").formatString("SPLIT_START_TAKEOVER_NEXT_RANK_TEXT", {
                            nextRank: a.LeagueTierNames.getFullTierDivisionName(l, r)
                        }),
                        nextRankTier: l,
                        nextRankDivision: r,
                        queueTypeText: this.get("tra").formatString("SPLIT_START_TAKEOVER_QUEUE_TYPE_TEXT", {
                            queueType: a.LeagueTierNames.getRankedQueueName(t.queueType)
                        }),
                        rankedRegaliaLevel: e.rankedRegaliaLevel,
                        isInPlacements: t.isProvisional,
                        placementsProgressText: this.get("tra").formatString("SPLIT_START_TAKEOVER_PLACEMENTS_PROGRESS_TEXT", {
                            placementGamesThreshold: t.provisionalGameThreshold,
                            placementGamesDone: t.provisionalGameThreshold - t.provisionalGamesRemaining
                        }),
                        placementsText: this.get("tra.SPLIT_START_TAKEOVER_PLACEMENTS_TEXT"),
                        lpProgressText: this.get("tra").formatString("SPLIT_START_TAKEOVER_LP_PROGRESS_TEXT", {
                            lpToGo: a.LeaguesConsts.LP_PER_DIVISION - t.leaguePoints
                        }),
                        isInApex: a.LeagueTierNames.isApexForQueue(t),
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
                    const s = this.get("showModalWithNullCareerStatsData");
                    if (null == e && s) return null;
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
                _getBestChampionStatsPanelData(e, t, n, s, a, i, o) {
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
                    return l || (l = this._getBestChampionInfoForNormals(e), r = g), l ? this._getStatsPanelDataForChampion(l, s, a, r) : this._getStatsPanelDataForChampionMastery(i)
                },
                _getBestChampionInfoForRanked(e, t, n) {
                    const s = n.queueType;
                    let i = this._getBestChampionInfoForQueue(e, s, n.tier);
                    return i || a.Lodash.forEach(t.queues, (t => {
                        const n = t.queueType;
                        if (n !== s && this._isRankedQueueValid(t) && this._isRankedQueueSR(t)) {
                            const s = this._getBestChampionInfoForQueue(e, n, t.tier);
                            s && (!i || s.winrate > i.winrate || s.winrate === i.winrate && s.games.length > i.games.length) && (i = s)
                        }
                    })), i
                },
                _getBestChampionInfoForNormals(e) {
                    let t = null;
                    return a.Lodash.forEach(this.careerStatsAPI.getNormalGamesQueueTypes(), (n => {
                        const s = this._getBestChampionInfoForQueue(e, n, this.careerStatsAPI.getAllRanks());
                        s && (!t || s.winrate > t.winrate || s.winrate === t.winrate && s.games.length > t.games.length) && (t = s)
                    })), t
                },
                _getBestChampionInfoForQueue(e, t, n) {
                    const s = this._makeFilterParams(t),
                        a = this.careerStatsAPI.filterGames(e, s);
                    return this._getBestChampionInfoForFilteredQueueGames(a, t, n)
                },
                _getBestChampionInfoForFilteredQueueGames(e, t, n) {
                    const s = {};
                    a.Lodash.forEach(e, (e => {
                        const t = this.careerStatsAPI.inferPosition(e);
                        s[e.championId] && s[e.championId][t] ? s[e.championId][t].push(e) : s[e.championId] && !s[e.championId][t] ? s[e.championId][t] = [e] : s[e.championId] = {
                            [t]: [e]
                        }
                    }));
                    let i = null;
                    for (const [e, o] of a.Lodash.entries(s))
                        for (const [s, l] of a.Lodash.entries(o)) {
                            const a = l.length,
                                o = this.careerStatsAPI.getWinrate(l);
                            a >= this.careerStatsAPI.getMinGamesToUnlockStats() && (!i || i.winrate <= o) && (i = {
                                championId: parseInt(e),
                                position: s,
                                winrate: o,
                                queueType: t,
                                rankTier: n,
                                games: l
                            })
                        }
                    return i
                },
                _getStatsPanelDataForChampion(e, t, n, s) {
                    const a = this.careerStatsAPI.getCareerStatsQueueType(e.queueType);
                    return t.getChampionStatPercentiles(e.championId, [{
                        position: e.position,
                        rankTier: e.rankTier,
                        queueType: a,
                        season: n
                    }]).then((t => this._getChampionGameAssets(e.championId).then((n => ({
                        championGameAssets: n,
                        championGrades: this.careerStatsAPI.getGradesForChampion(e.games, e.position, a, t),
                        dataType: s
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
                        const t = a.Lodash.find(e.queues, (e => this._isRankedQueueValid(e) && !this._isRankedQueueTFT(e)));
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
                    return Boolean(e) && Boolean(e.queueType) && Boolean(e.tier) && e.tier !== a.LeaguesConsts.TIER_NAME_NONE
                },
                _getCurrentSplitData: function(e) {
                    if (!e || !e.currentSplitId) return null;
                    const t = e.currentSplitId,
                        n = a.Lodash.find(e.splits, (e => e.splitId === t));
                    return n || null
                },
                _getMiniSeriesWinsNeeded: function(e) {
                    if (e) {
                        let t = 0;
                        return a.Lodash.forEach(e, (e => {
                            "W" === e && t++
                        })), Math.ceil(e.length / 2) - t
                    }
                    return 0
                },
                _navigateToProfileSubsection: function(e) {
                    return a.ProfilesAPI.setActive(!0), a.ProfilesAPI.mainSection().show(e), !0
                },
                _formatNumber: function(e, t) {
                    const n = (t.locale || "en_US").replace("_", "-");
                    return e.toLocaleString(n)
                },
                _renderModal(e, t) {
                    const n = e(t),
                        s = document.createElement("div");
                    s.innerHTML = n;
                    const a = s.querySelector(".rewards-container"),
                        i = s.querySelector("#rewards-scroll-container");
                    return a.addEventListener("wheel", (e => {
                        Math.abs(e.deltaX) < 100 && (e.deltaY > 0 ? i.scrollLeft += 80 : e.deltaY < 0 && (i.scrollLeft -= 80))
                    })), s
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            var s = n(55);
            e.exports = (s.default || s).template({
                1: function(e, t, n, s, a, i) {
                    var o, l = e.lambda,
                        r = e.escapeExpression;
                    return '            <div class="reward-column">\r\n                <img src="' + r(l(null != (o = i[0][0]) ? o.imagePath : o, t)) + '" class="reward-image ' + r(l(null != (o = i[0][0]) ? o.cssClass : o, t)) + '">\r\n                <div class="reward-description">' + r(l(null != (o = i[0][0]) ? o.description : o, t)) + "</div>\r\n            </div>\r\n"
                },
                3: function(e, t, n, s, a) {
                    var i, o = e.lambda,
                        l = e.escapeExpression;
                    return '                <div class="champion-background-image-container">\r\n                    <div class="champion-image-container">\r\n                        <img src=' + l(o(null != (i = null != t ? t.statsInfo : t) ? i.championImagePath : i, t)) + ' class="champion-image">\r\n                    </div>\r\n                    <div class="champion-overlay"></div>\r\n                </div>\r\n                <div class="stats-content-container">\r\n                    <div class="stats-display">\r\n                        <div class="stats-title">' + l(o(null != (i = null != t ? t.statsInfo : t) ? i.statsTitle : i, t)) + '</div>\r\n                        <div class="stats-champion-name">' + l(o(null != (i = null != t ? t.statsInfo : t) ? i.championName : i, t)) + '</div>\r\n                        <div class="stats-divider"></div>\r\n                        <div class=' + l(o(null != (i = null != t ? t.statsInfo : t) ? i.statContainerCSSClass : i, t)) + '>\r\n                            <div class="stat-text">' + l(o(null != (i = null != (i = null != t ? t.statsInfo : t) ? i.statsText : i) ? i[0] : i, t)) + '</div>\r\n                            <div class="stat-data">' + l(o(null != (i = null != (i = null != t ? t.statsInfo : t) ? i.statsData : i) ? i[0] : i, t)) + '</div>\r\n                        </div>\r\n                        <div class="stats-divider"></div>\r\n                        <div class=' + l(o(null != (i = null != t ? t.statsInfo : t) ? i.statContainerCSSClass : i, t)) + '>\r\n                            <div class="stat-text">' + l(o(null != (i = null != (i = null != t ? t.statsInfo : t) ? i.statsText : i) ? i[1] : i, t)) + '</div>\r\n                            <div class="stat-data">' + l(o(null != (i = null != (i = null != t ? t.statsInfo : t) ? i.statsData : i) ? i[1] : i, t)) + '</div>\r\n                        </div>\r\n                        <div class="stats-divider"></div>\r\n                        <div class=' + l(o(null != (i = null != t ? t.statsInfo : t) ? i.statContainerCSSClass : i, t)) + '>\r\n                            <div class="stat-text">' + l(o(null != (i = null != (i = null != t ? t.statsInfo : t) ? i.statsText : i) ? i[2] : i, t)) + '</div>\r\n                            <div class="stat-data">' + l(o(null != (i = null != (i = null != t ? t.statsInfo : t) ? i.statsData : i) ? i[2] : i, t)) + '</div>\r\n                        </div>\r\n                        <div class="stats-divider"></div>\r\n                    </div>\r\n                    <div class="stats-footer">' + l(o(null != (i = null != t ? t.statsInfo : t) ? i.statsFooter : i, t)) + "</div>\r\n                </div>\r\n"
                },
                5: function(e, t, n, s, a) {
                    var i;
                    return '                        <lol-uikit-resizing-text-field class="current-rank-title" data-max-width="200">\r\n                            ' + e.escapeExpression(e.lambda(null != (i = null != t ? t.rankInfo : t) ? i.currentRankTitle : i, t)) + "\r\n"
                },
                7: function(e, t, n, s, a) {
                    var i;
                    return '                        <lol-uikit-resizing-text-field class="next-rank-title" data-max-width="200">\r\n                            ' + e.escapeExpression(e.lambda(null != (i = null != t ? t.rankInfo : t) ? i.nextRankTitle : i, t)) + "\r\n"
                },
                9: function(e, t, n, s, a) {
                    var i;
                    return '                    <div class="rank-text-wrapper">\r\n                        <lol-uikit-resizing-text-field class="current-rank-text" data-max-width="200">\r\n                            ' + e.escapeExpression(e.lambda(null != (i = null != t ? t.rankInfo : t) ? i.currentRankText : i, t)) + "\r\n                        </lol-uikit-resizing-text-field>\r\n                    </div>\r\n"
                },
                11: function(e, t, n, s, a) {
                    var i;
                    return "                ranked-tier=" + e.escapeExpression(e.lambda(null != (i = null != t ? t.rankInfo : t) ? i.currentRankTier : i, t)) + "\r\n"
                },
                13: function(e, t, n, s, a) {
                    var i;
                    return "                ranked-tier=" + e.escapeExpression(e.lambda(null != (i = null != t ? t.rankInfo : t) ? i.nextRankTier : i, t)) + "\r\n                "
                },
                15: function(e, t, n, s, a) {
                    var i, o = e.lambda,
                        l = e.escapeExpression;
                    return '                    <div class="rank-text-wrapper">\r\n                        <lol-uikit-resizing-text-field class="placements-progress-text" data-max-width="200">' + l(o(null != (i = null != t ? t.rankInfo : t) ? i.placementsProgressText : i, t)) + '</lol-uikit-resizing-text-field>\r\n                    </div>\r\n                    <div class="rank-text-wrapper">\r\n                        <lol-uikit-resizing-text-field class="placements-text" data-max-width="200">' + l(o(null != (i = null != t ? t.rankInfo : t) ? i.placementsText : i, t)) + "</lol-uikit-resizing-text-field>\r\n                    </div>\r\n"
                },
                17: function(e, t, n, s, a) {
                    var i;
                    return null != (i = n.if.call(null != t ? t : e.nullContext || {}, null != (i = null != t ? t.rankInfo : t) ? i.isInMiniSeries : i, {
                        name: "if",
                        hash: {},
                        fn: e.program(18, a, 0),
                        inverse: e.program(20, a, 0),
                        data: a
                    })) ? i : ""
                },
                18: function(e, t, n, s, a) {
                    var i, o = e.lambda,
                        l = e.escapeExpression;
                    return '                    <div class="rank-text-wrapper">\r\n                        <lol-uikit-resizing-text-field class="mini-series-progress-text" data-max-width="200">' + l(o(null != (i = null != t ? t.rankInfo : t) ? i.miniSeriesProgressText : i, t)) + '</lol-uikit-resizing-text-field>\r\n                    </div>\r\n                    <div class="rank-text-wrapper">\r\n                        <lol-uikit-resizing-text-field class="mini-series-text" data-max-width="200">' + l(o(null != (i = null != t ? t.rankInfo : t) ? i.miniSeriesText : i, t)) + "</lol-uikit-resizing-text-field>\r\n                    </div>\r\n"
                },
                20: function(e, t, n, s, a) {
                    var i;
                    return null != (i = n.if.call(null != t ? t : e.nullContext || {}, null != (i = null != t ? t.rankInfo : t) ? i.isInApex : i, {
                        name: "if",
                        hash: {},
                        fn: e.program(21, a, 0),
                        inverse: e.program(23, a, 0),
                        data: a
                    })) ? i : ""
                },
                21: function(e, t, n, s, a) {
                    var i;
                    return '                    <div class="rank-text-wrapper">\r\n                        <lol-uikit-resizing-text-field class="lp-text" data-max-width="200">' + e.escapeExpression(e.lambda(null != (i = null != t ? t.rankInfo : t) ? i.lpText : i, t)) + "</lol-uikit-resizing-text-field>\r\n                    </div>\r\n"
                },
                23: function(e, t, n, s, a) {
                    var i;
                    return '                    <div class="rank-text-wrapper">\r\n                        <lol-uikit-resizing-text-field class="lp-progress-text" data-max-width="200">' + e.escapeExpression(e.lambda(null != (i = null != t ? t.rankInfo : t) ? i.lpProgressText : i, t)) + "</lol-uikit-resizing-text-field>\r\n                    </div>\r\n                "
                },
                compiler: [7, ">= 4.0.0"],
                main: function(e, t, n, s, a, i) {
                    var o, l = null != t ? t : e.nullContext || {},
                        r = e.lambda,
                        c = e.escapeExpression;
                    return '<div class="split-start-modal">\r\n    <div class="rewards-container">\r\n        <lol-uikit-scrollable id="rewards-scroll-container">\r\n        <div class="reward-columns-container">\r\n' + (null != (o = n.each.call(l, null != t ? t.rewardsInfo : t, {
                        name: "each",
                        hash: {},
                        fn: e.program(1, a, 1, i),
                        inverse: e.noop,
                        data: a,
                        blockParams: i
                    })) ? o : "") + '        </div>\r\n        </lol-uikit-scrollable>\r\n    </div>\r\n    <div class="titles-container">\r\n        <div class="season-title">' + c(r(null != (o = null != t ? t.titlesInfo : t) ? o.seasonTitle : o, t)) + '</div>\r\n        <div class="split-title">' + c(r(null != (o = null != t ? t.titlesInfo : t) ? o.splitTitle : o, t)) + '</div>\r\n        <div class="split-duration-title">' + c(r(null != (o = null != t ? t.titlesInfo : t) ? o.splitDurationTitle : o, t)) + '</div>\r\n        <div class="rewards-title-container">\r\n            <div class="rewards-title-ornament"></div>\r\n            <div class="rewards-title">' + c(r(null != (o = null != t ? t.titlesInfo : t) ? o.rewardsTitle : o, t)) + '</div>\r\n            <div class="flipped rewards-title-ornament"></div>\r\n        </div>\r\n    </div>\r\n    <div class="stats-and-rank-panels-container">\r\n        <div class="stats-panel">\r\n' + (null != (o = n.if.call(l, null != t ? t.statsInfo : t, {
                        name: "if",
                        hash: {},
                        fn: e.program(3, a, 0, i),
                        inverse: e.noop,
                        data: a,
                        blockParams: i
                    })) ? o : "") + '        </div>\r\n        <div class="rank-panel">\r\n            <div class="rank-headers">\r\n                <div class="rank-text-wrapper">\r\n' + (null != (o = n.if.call(l, null != (o = null != t ? t.rankInfo : t) ? o.isInApex : o, {
                        name: "if",
                        hash: {},
                        fn: e.program(5, a, 0, i),
                        inverse: e.program(7, a, 0, i),
                        data: a,
                        blockParams: i
                    })) ? o : "") + "                    </lol-uikit-resizing-text-field>\r\n                </div>\r\n" + (null != (o = n.if.call(l, null != (o = null != t ? t.rankInfo : t) ? o.isInApex : o, {
                        name: "if",
                        hash: {},
                        fn: e.program(9, a, 0, i),
                        inverse: e.noop,
                        data: a,
                        blockParams: i
                    })) ? o : "") + '                <lol-uikit-resizing-text-field class="queue-type-text" data-max-width="200">' + c(r(null != (o = null != t ? t.rankInfo : t) ? o.queueTypeText : o, t)) + '</lol-uikit-resizing-text-field>\r\n            </div>\r\n            <div class="rank-crest-container">\r\n                <lol-regalia-emblem-element\r\n' + (null != (o = n.if.call(l, null != (o = null != t ? t.rankInfo : t) ? o.isInApex : o, {
                        name: "if",
                        hash: {},
                        fn: e.program(11, a, 0, i),
                        inverse: e.program(13, a, 0, i),
                        data: a,
                        blockParams: i
                    })) ? o : "") + '></lol-regalia-emblem-element>\r\n            </div>\r\n            <div class="rank-progress-footnote">\r\n' + (null != (o = n.if.call(l, null != (o = null != t ? t.rankInfo : t) ? o.isInPlacements : o, {
                        name: "if",
                        hash: {},
                        fn: e.program(15, a, 0, i),
                        inverse: e.program(17, a, 0, i),
                        data: a,
                        blockParams: i
                    })) ? o : "") + "            </div>\r\n        </div>\r\n    </div>\r\n</div>"
                },
                useData: !0,
                useBlockParams: !0
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1);
            n(125);
            var a = n(50),
                i = n(24),
                o = n(23);
            const l = n(126),
                r = "ranked-eos",
                c = 36e5;
            e.exports = s.Ember.Component.extend({
                classNames: ["eos-notifications"],
                regionLocale: {},
                splitsConfig: {},
                isPlayerNotificationsInitialized: !1,
                shownNotifications: [],
                init() {
                    this._super(...arguments), this._initPlayerNotifications(), this._initDataBindings()
                },
                currentSplit: s.Ember.computed("splitsConfig", "splitsConfig.currentSplitId", (function() {
                    return this.get("splitsConfig.currentSplitId")
                })),
                previousSplit: s.Ember.computed("splitsConfig.splits.@each.endTimeMillis", (function() {
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
                    s.Social.playerNotifications().registerToastRenderer(r, "eos", this._renderEosNotification.bind(this)), this.set("isPlayerNotificationsInitialized", !0)
                },
                _initDataBindings() {
                    this.rankedDataBinding = (0, s.dataBinding)("/lol-ranked", (0, s.getProvider)().getSocket()), this.rankedDataBinding.observe("/v1/eos-notifications", this._handleEoSNotifications.bind(this))
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
                                date: (0, a.convertDateMillisToString)(T, l, {
                                    month: "long",
                                    day: "numeric"
                                }),
                                year: (0, a.convertDateMillisToString)(S, l, {
                                    year: "numeric"
                                }),
                                split: E ? E.toString() : "",
                                rank: s.LeagueTierNames.getFullTierDivisionName(p, m),
                                queue: s.LeagueTierNames.getRankedQueueName(d)
                            }
                        };
                    n.push(t), (0, s.dataBinding)("player-notifications").post("/v1/notifications", v), (0, s.dataBinding)("lol-ranked").post(`/v1/eos-notifications/${t}/acknowledge`, {})
                },
                _renderEosNotification(e) {
                    const t = document.createElement("div"),
                        n = e.queue || "DEFAULT";
                    let s = "";
                    return s = (0, i.isTftQueueType)(n) ? this.get("tra").formatString(e.titleKey, {
                        year: e.data.year
                    }) : this.get("tra").formatString(e.titleKey, {
                        year: e.data.year,
                        split: e.data.split
                    }), t.innerHTML = l({
                        title: s,
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
            var s = n(55);
            e.exports = (s.default || s).template({
                compiler: [7, ">= 4.0.0"],
                main: function(e, t, n, s, a) {
                    var i, o = null != t ? t : e.nullContext || {},
                        l = n.helperMissing,
                        r = "function",
                        c = e.escapeExpression;
                    return '<div class="title">' + c(typeof(i = null != (i = n.title || (null != t ? t.title : t)) ? i : l) === r ? i.call(o, {
                        name: "title",
                        hash: {},
                        data: a
                    }) : i) + '</div>\r\n<div class="detail">' + c(typeof(i = null != (i = n.detail || (null != t ? t.detail : t)) ? i : l) === r ? i.call(o, {
                        name: "detail",
                        hash: {},
                        data: a
                    }) : i) + "</div>"
                },
                useData: !0
            })
        }, (e, t, n) => {
            "use strict";
            var s, a = n(1),
                i = n(5),
                o = n(23),
                l = n(50),
                r = (s = n(116)) && s.__esModule ? s : {
                    default: s
                };
            n(128);
            const c = n(129),
                u = (0, a.emberDataBinding)({
                    Ember: a.Ember,
                    websocket: (0, a.getProvider)().getSocket(),
                    basePaths: {
                        honor: "/lol-honor-v2",
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
                d = "season-memorial-modal",
                p = "ranked",
                m = "normals",
                g = new Map;
            g.set("RANKED_FLEX_SR", "FLEX"), g.set("RANKED_SOLO_5x5", "SOLODUO"), e.exports = a.Ember.Component.extend(u, {
                classNames: ["season-memorial-modal"],
                accountLeaguesSettings: {},
                currentSummoner: {},
                currentRankedStats: {},
                previousSeason: null,
                regionLocale: {},
                hasSeasonMemorialModalShownThisSession: !1,
                careerStatsService: a.Ember.inject.service("careerStats"),
                careerStatsAPI: a.CareerStatsAPI,
                init() {
                    this._super(...arguments), this.get("isConfigReady"), this._dataBinding = a.dataBinding.bindTo((0, a.getProvider)().getSocket())
                },
                previousSeasonRankedSRQueues: a.Ember.computed("currentRankedStats.queues.@each.queueType", "currentRankedStats.queues.@each.previousSeasonEndTier", (function() {
                    return (this.get("currentRankedStats.queues") || []).filter((e => {
                        const t = e.previousSeasonEndTier && e.previousSeasonEndTier !== a.LeaguesConsts.TIER_NAME_NONE,
                            n = i.QUEUES.RANKED_SR_QUEUE_TYPES.includes(e.queueType);
                        return t && n
                    }))
                })),
                previousSeasonHighestRankedSRQueue: a.Ember.computed("previousSeasonRankedSRQueues.@each.previousSeasonEndTier", (function() {
                    const e = this.get("previousSeasonRankedSRQueues") || [];
                    let t = e[0];
                    return e.forEach((e => {
                        a.LeaguesConsts.TIER_NAME_TO_ORDINAL[e.previousSeasonEndTier] > a.LeaguesConsts.TIER_NAME_TO_ORDINAL[t.previousSeasonEndTier] && (t = e)
                    })), t
                })),
                eosRewardsMap: a.Ember.computed("eosRewardsConfig.seasons.[]", "previousSeason.seasonId", (function() {
                    const e = this.get("eosRewardsConfig.seasons") || {},
                        t = this.get("previousSeason.seasonId");
                    return e[t] ? e[t].rewards : {}
                })),
                isGameflowPhaseValid: a.Ember.computed("gameflowSession", "gameflowSession.phase", (function() {
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
                isConfigReady: a.Ember.computed("careerStatsService", "isSeasonMemorialModalEnabled", "eosRewardsConfig", "hasSeasonMemorialModalShownThisSession", "honorProfile.honorLevel", "honorConfig", "isGameflowPhaseValid", (function() {
                    return this._isReady()
                })),
                isConfigReadyObserver: a.Ember.observer("isConfigReady", (function() {
                    this.get("isConfigReady") && this._initializeModal()
                })),
                isHonorEligible: a.Ember.computed("honorConfig.Enabled", "honorProfile.honorLevel", (function() {
                    return this.get("honorConfig.Enabled") && this.get("honorProfile.honorLevel") >= this.get("seasonMemorialModalMinHonorLevel")
                })),
                _isReady() {
                    const e = this.get("accountLeaguesSettings"),
                        t = this.get("previousSeason.seasonId"),
                        n = this.get("currentSummoner"),
                        s = this.get("careerStatsService"),
                        a = this.get("hasSeasonMemorialModalShownThisSession"),
                        i = this.get("isSeasonMemorialModalEnabled"),
                        o = this.get("previousSeasonHighestRankedSRQueue"),
                        l = this.get("eosRewardsMap"),
                        r = this.get("honorConfig"),
                        c = this.get("honorProfile.honorLevel"),
                        u = this.get("isGameflowPhaseValid"),
                        p = e.data && e.data[d] >= t,
                        m = Boolean(o),
                        g = Boolean(n),
                        h = Boolean(s);
                    return i && !a && !p && u && m && g && h && l && r && c >= 0
                },
                _initializeModal() {
                    const e = this.get("currentSummoner.puuid"),
                        t = this.get("careerStatsService"),
                        n = this.get("previousSeason.seasonId");
                    t.loadPreviousSeasonStatsGames(e, n).then((t => {
                        this._tryToDisplaySeasonMemorialModal(t, e), this.set("hasSeasonMemorialModalShownThisSession", !0)
                    }))
                },
                _tryToDisplaySeasonMemorialModal: function(e, t) {
                    const n = this.get("previousSeason.seasonId"),
                        s = this.get("previousSeasonRankedSRQueues"),
                        a = this.get("careerStatsService"),
                        i = this.get("previousSeasonHighestRankedSRQueue"),
                        o = this._getBestChampionStatsPanelData(e.games, s, i, a, n, t);
                    o && o.then((e => this._displaySeasonMemorialModal(e)))
                },
                _displaySeasonMemorialModal: function(e) {
                    const t = this.get("previousSeason.seasonId");
                    return this._getSeasonMemorialModalRewardsInfoPromise().then((n => (a.ModalManager.add({
                        type: "DialogConfirm",
                        data: {
                            contents: this._renderSeasonMemorialModal(e, n),
                            acceptText: this.get("tra.SPLIT_START_TAKEOVER_SEE_STATS_BUTTON_TEXT"),
                            declineText: this.get("tra.SPLIT_START_TAKEOVER_CLOSE_BUTTON_TEXT"),
                            closeButton: !1,
                            acceptHandler: this._navigateToProfileSubsection.bind(this, o.PROFILE_STATS_SUBSECTION_ID)
                        }
                    }), r.default.saveAccountSetting(d, t))))
                },
                _renderSeasonMemorialModal: function(e, t) {
                    const n = this._getSeasonMemorialModalTitlesInfo(),
                        s = this._getSeasonMemorialModalRankInfo(),
                        a = this._getSeasonMemorialModalHonorInfo(),
                        i = {
                            titlesInfo: n,
                            rewardsInfo: t,
                            rankInfo: s,
                            statsInfo: this._getSeasonMemorialModalStatsInfo(e),
                            honorInfo: a
                        };
                    return t.length <= 4 && (i.spaceRewardsCss = "space-around"), this._renderModal(c, i)
                },
                _getSeasonMemorialModalTitlesInfo: function() {
                    const e = this.get("regionLocale"),
                        t = this.get("previousSplit") || {};
                    if (t) return {
                        seasonTitle: this.get("tra").formatString("SPLIT_START_TAKEOVER_SEASON_TITLE", {
                            seasonYear: (0, l.convertDateMillisToString)(t.endTimeMillis, e, {
                                year: "numeric"
                            })
                        }),
                        splitTitle: `${this.get("tra").formatString("SPLIT_START_TAKEOVER_SEASON_TITLE",{seasonYear:(0,l.convertDateMillisToString)(t.endTimeMillis,e,{year:"numeric"})})} - ${this.get("tra").formatString("SEASON_MEMORIAL_TAKEOVER_SPLIT_NAME",{splitNumber:t.splitId})}`,
                        splitDurationTitle: this.get("tra").formatString("SPLIT_START_TAKEOVER_SPLIT_DURATION_TITLE", {
                            splitStartString: (0, l.convertDateMillisToString)(t.startTimeMillis, e),
                            splitEndString: (0, l.convertDateMillisToString)(t.endTimeMillis - 1, e)
                        }),
                        rewardsTitle: this.get("tra").formatString("SEASON_MEMORIAL_TAKEOVER_REWARDS_TITLE", {
                            seasonYear: (0, l.convertDateMillisToString)(t.endTimeMillis, e, {
                                year: "numeric"
                            })
                        })
                    }
                },
                _getRewardImageInfoPromise: e => e.overrideImagePath ? Promise.resolve(e.overrideImagePath) : a.LeagueTierNames.asyncGetRewardImage(e.id),
                _getSeasonMemorialModalRewardsInfoPromise: function() {
                    const e = [],
                        t = [],
                        n = this.get("eosRewardsMap") || {},
                        s = n.ETERNALS_CAPSULE;
                    if (s) {
                        const n = {
                            description: this.get("tra.REWARD_TYPE_ETERNALS_CAPSULE_DESCRIPTION"),
                            cssClass: "reward-image-ETERNALS_CAPSULE"
                        };
                        t.push(this._getRewardImageInfoPromise(s)), e.push(n)
                    }
                    const i = this.get("previousSeasonHighestRankedSRQueue.previousSeasonEndTier"),
                        l = (this.get("previousSplit.victoriousSkinRewardGroup.splitPointsByHighestAchievedTier") || {})[i],
                        r = this.get("currentRankedStats.previousSeasonSplitPoints");
                    if (r >= l) {
                        const s = n.VICTORIOUS_SKIN;
                        if (s ? s.id : null) {
                            const n = {
                                description: this.get("tra.REWARD_TYPE_CHAMPION_SKIN_DESCRIPTION"),
                                cssClass: `reward-image-${s.type}`
                            };
                            t.push(this._getRewardImageInfoPromise(s)), e.push(n)
                        }
                        const o = a.LeaguesConsts.TIER_NAME_TO_ORDINAL[i];
                        a.LeaguesConsts.TIERS.forEach((s => {
                            const i = a.LeaguesConsts.TIER_NAME_TO_ORDINAL[s];
                            if (o >= i) {
                                const a = n[`VICTORIOUS_CHROMA_${s}`];
                                if (a ? a.id : null) {
                                    const n = {
                                        description: this.get("tra.REWARD_TYPE_CHROMA_DESCRIPTION"),
                                        cssClass: `reward-image-${a.type}`
                                    };
                                    t.push(this._getRewardImageInfoPromise(a)), e.push(n)
                                }
                            }
                        }))
                    }(this.get("previousSeasonRankedSRQueues") || []).forEach((s => {
                        const a = n[`SUMMONER_ICON_${g.get(s.queueType)}_${s.previousSeasonEndTier}`];
                        if (a ? a.id : null) {
                            const n = o.SUMMONER_ICON_REWARD_TYPE,
                                i = {
                                    description: this.get(`tra.SEASON_MEMORIAL_TAKEOVER_REWARD_TYPE_${n}_${s.queueType}_DESCRIPTION`),
                                    cssClass: `reward-image-${n}`
                                };
                            t.push(this._getRewardImageInfoPromise(a)), e.push(i)
                        }
                    }));
                    const c = this.get("previousSplit") || {};
                    if (c) {
                        (c.rewardTrack || []).forEach((n => {
                            if (parseInt(n.splitPoints) < r) {
                                (n.rewards || []).forEach((n => {
                                    const s = n.rewardType,
                                        i = this.get("tra").formatString("SEASON_MEMORIAL_TAKEOVER_SPLIT_NAME", {
                                            splitNumber: c.splitId
                                        }),
                                        o = {
                                            description: this.get("tra").formatString("SEASON_MEMORIAL_TAKEOVER_REWARD_DESCRIPTION", {
                                                splitName: i,
                                                rewardTypeDescription: this.get(`tra.REWARD_TYPE_${s}_DESCRIPTION`)
                                            }),
                                            cssClass: `reward-image-${s}`
                                        };
                                    t.push(a.LeagueTierNames.asyncGetRewardImage(n.id)), e.push(o)
                                }))
                            }
                        }))
                    }
                    return Promise.all(t).then((t => {
                        for (let n = 0; n < e.length; n++) e[n].imagePath = t[n];
                        return e
                    }))
                },
                _getSeasonMemorialModalRankInfo: function() {
                    const e = this.get("previousSeasonHighestRankedSRQueue"),
                        t = e.previousSeasonEndTier,
                        n = e.previousSeasonEndDivision;
                    return {
                        currentRankTitle: this.get("tra.SEASON_MEMORIAL_TAKEOVER_FINAL_RANK_TEXT"),
                        currentRankTier: t,
                        currentRankDivision: n,
                        currentRankText: a.LeagueTierNames.getFullTierDivisionName(t, n),
                        queueTypeText: this.get("tra").formatString("SPLIT_START_TAKEOVER_QUEUE_TYPE_TEXT", {
                            queueType: a.LeagueTierNames.getRankedQueueName(e.queueType)
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
                    if (e.dataType === p || e.dataType === m) {
                        const t = this.get("careerStatsService.careerStatsTra");
                        n = {
                            statsTitle: this.get("tra").formatString("SPLIT_START_TAKEOVER_STATS_TITLE", {
                                statsTitleAddition: e.dataType === p ? this.get("tra.SPLIT_START_TAKEOVER_STATS_RANKED_TITLE_ADDITION") : this.get("tra.SPLIT_START_TAKEOVER_STATS_NORMALS_TITLE_ADDITION")
                            }),
                            statsFooter: e.dataType === p ? this.get("tra.SPLIT_START_TAKEOVER_STATS_RANKED_FOOTER") : this.get("tra.SPLIT_START_TAKEOVER_STATS_NONRANKED_FOOTER"),
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
                _getBestChampionStatsPanelData(e, t, n, s, a, i) {
                    let o = this._getBestChampionInfoForRanked(e, t, n),
                        l = p;
                    return o || (o = this._getBestChampionInfoForNormals(e), l = m), o ? this._getStatsPanelDataForChampion(o, s, a, l) : this._getStatsPanelDataForChampionMastery(i)
                },
                _getBestChampionInfoForRanked(e, t, n) {
                    const s = n.queueType;
                    let a = this._getBestChampionInfoForQueue(e, s, n.previousSeasonEndTier);
                    return a || t.forEach((t => {
                        const n = t.queueType;
                        if (n !== s) {
                            const s = this._getBestChampionInfoForQueue(e, n, t.previousSeasonEndTier);
                            s && (!a || s.winrate > a.winrate || s.winrate === a.winrate && s.games.length > a.games.length) && (a = s)
                        }
                    })), a
                },
                _getBestChampionInfoForNormals(e) {
                    let t = null;
                    return a.Lodash.forEach(this.careerStatsAPI.getNormalGamesQueueTypes(), (n => {
                        const s = this._getBestChampionInfoForQueue(e, n, this.careerStatsAPI.getAllRanks());
                        s && (!t || s.winrate > t.winrate || s.winrate === t.winrate && s.games.length > t.games.length) && (t = s)
                    })), t
                },
                _getBestChampionInfoForQueue(e, t, n) {
                    const s = this._makeFilterParams(t),
                        a = this.careerStatsAPI.filterGames(e, s);
                    return this._getBestChampionInfoForFilteredQueueGames(a, t, n)
                },
                _getBestChampionInfoForFilteredQueueGames(e, t, n) {
                    const s = {};
                    a.Lodash.forEach(e, (e => {
                        const t = this.careerStatsAPI.inferPosition(e);
                        s[e.championId] && s[e.championId][t] ? s[e.championId][t].push(e) : s[e.championId] && !s[e.championId][t] ? s[e.championId][t] = [e] : s[e.championId] = {
                            [t]: [e]
                        }
                    }));
                    let i = null;
                    for (const [e, o] of a.Lodash.entries(s))
                        for (const [s, l] of a.Lodash.entries(o)) {
                            const a = l.length,
                                o = this.careerStatsAPI.getWinrate(l);
                            a >= this.careerStatsAPI.getMinGamesToUnlockStats() && (!i || i.winrate <= o) && (i = {
                                championId: parseInt(e),
                                position: s,
                                winrate: o,
                                queueType: t,
                                rankTier: n,
                                games: l
                            })
                        }
                    return i
                },
                _getStatsPanelDataForChampion(e, t, n, s) {
                    const a = this.careerStatsAPI.getCareerStatsQueueType(e.queueType);
                    return t.getChampionStatPercentiles(e.championId, [{
                        position: e.position,
                        rankTier: e.rankTier,
                        queueType: a,
                        season: n
                    }]).then((t => this._getChampionGameAssets(e.championId).then((n => ({
                        championGameAssets: n,
                        championGrades: this.careerStatsAPI.getGradesForChampion(e.games, e.position, a, t),
                        dataType: s
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
                    return this._dataBinding.get(`/lol-collections/v1/inventories/${e}/champion-mastery/top?limit=1`).then((e => e && e.masteries ? e.masteries[0] : {}))
                },
                _getChampionGameAssets: function(e) {
                    return this._dataBinding.get("/lol-game-data/assets/v1/champions/" + e + ".json")
                },
                _navigateToProfileSubsection: function(e) {
                    return a.ProfilesAPI.setActive(!0), a.ProfilesAPI.mainSection().show(e), !0
                },
                _formatNumber: function(e, t) {
                    const n = (t.locale || "en_US").replace("_", "-");
                    return (e || 0).toLocaleString(n)
                },
                _renderModal(e, t) {
                    const n = e(t),
                        s = document.createElement("div");
                    s.innerHTML = n;
                    const a = s.querySelector(".rewards-container"),
                        i = s.querySelector("#rewards-scroll-container");
                    return a.addEventListener("wheel", (e => {
                        e.deltaY > 0 ? i.scrollLeft += 80 : i.scrollLeft -= 80
                    })), s
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            var s = n(55);
            e.exports = (s.default || s).template({
                1: function(e, t, n, s, a) {
                    var i;
                    return '      <div class="rewards-container-restricted">\r\n        <div class="honor-ineligible-panel">\r\n            <div class="honor-ineligible-text">' + e.escapeExpression(e.lambda(null != (i = null != t ? t.honorInfo : t) ? i.honorIneligibleText : i, t)) + "</div>\r\n        </div>\r\n      </div>\r\n"
                },
                3: function(e, t, n, s, a, i) {
                    var o, l = e.lambda,
                        r = e.escapeExpression;
                    return '          <div class="reward-container-column">\r\n            <div class="reward-image-container">\r\n              <img src="' + r(l(null != (o = i[0][0]) ? o.imagePath : o, t)) + '" class="rewards-image ' + r(l(null != (o = i[0][0]) ? o.cssClass : o, t)) + '">\r\n            </div>\r\n            <div class="reward-description">' + r(l(null != (o = i[0][0]) ? o.description : o, t)) + "</div>\r\n          </div>\r\n"
                },
                compiler: [7, ">= 4.0.0"],
                main: function(e, t, n, s, a, i) {
                    var o, l, r = null != t ? t : e.nullContext || {},
                        c = e.lambda,
                        u = e.escapeExpression;
                    return '<div class="season-memorial-modal">\r\n  <div class="rewards-container">\r\n' + (null != (o = n.unless.call(r, null != (o = null != t ? t.honorInfo : t) ? o.isHonorEligible : o, {
                        name: "unless",
                        hash: {},
                        fn: e.program(1, a, 0, i),
                        inverse: e.noop,
                        data: a,
                        blockParams: i
                    })) ? o : "") + '    <lol-uikit-scrollable id="rewards-scroll-container" class="' + u(c(null != (o = null != t ? t.honorInfo : t) ? o.rewardsContainerCss : o, t)) + '">\r\n      <div class="rewards-images-container ' + u("function" == typeof(l = null != (l = n.spaceRewardsCss || (null != t ? t.spaceRewardsCss : t)) ? l : n.helperMissing) ? l.call(r, {
                        name: "spaceRewardsCss",
                        hash: {},
                        data: a,
                        blockParams: i
                    }) : l) + '">\r\n' + (null != (o = n.each.call(r, null != t ? t.rewardsInfo : t, {
                        name: "each",
                        hash: {},
                        fn: e.program(3, a, 1, i),
                        inverse: e.noop,
                        data: a,
                        blockParams: i
                    })) ? o : "") + '      </div>\r\n    </lol-uikit-scrollable>\r\n  </div>\r\n  <div class="titles-container">\r\n    <div class="season-title">' + u(c(null != (o = null != t ? t.titlesInfo : t) ? o.seasonTitle : o, t)) + '</div>\r\n    <div class="split-title">' + u(c(null != (o = null != t ? t.titlesInfo : t) ? o.splitTitle : o, t)) + '</div>\r\n    <div class="split-duration-title">' + u(c(null != (o = null != t ? t.titlesInfo : t) ? o.splitDurationTitle : o, t)) + '</div>\r\n    <div class="rewards-title-container">\r\n      <div class="rewards-title-ornament"></div>\r\n      <div class="rewards-title">' + u(c(null != (o = null != t ? t.titlesInfo : t) ? o.rewardsTitle : o, t)) + '</div>\r\n      <div class="flipped rewards-title-ornament"></div>\r\n    </div>\r\n  </div>\r\n  <div class="stats-and-rank-panels-container">\r\n    <div class="stats-panel">\r\n      <div class="champion-background-image-container">\r\n        <div class="champion-image-container">\r\n          <img src="' + u(c(null != (o = null != t ? t.statsInfo : t) ? o.championImagePath : o, t)) + '" class="champion-image">\r\n        </div>\r\n        <div class="champion-overlay"></div>\r\n      </div>\r\n      <div class="stats-content-container">\r\n        <div class="stats-display">\r\n          <div class="stats-title">' + u(c(null != (o = null != t ? t.statsInfo : t) ? o.statsTitle : o, t)) + '</div>\r\n          <div class="stats-champion-name">' + u(c(null != (o = null != t ? t.statsInfo : t) ? o.championName : o, t)) + '</div>\r\n          <div class="stats-divider"></div>\r\n          <div class=' + u(c(null != (o = null != t ? t.statsInfo : t) ? o.statContainerCSSClass : o, t)) + '>\r\n            <div class="stat-text">' + u(c(null != (o = null != (o = null != t ? t.statsInfo : t) ? o.statsText : o) ? o[0] : o, t)) + '</div>\r\n            <div class="stat-data">' + u(c(null != (o = null != (o = null != t ? t.statsInfo : t) ? o.statsData : o) ? o[0] : o, t)) + '</div>\r\n          </div>\r\n          <div class="stats-divider"></div>\r\n          <div class=' + u(c(null != (o = null != t ? t.statsInfo : t) ? o.statContainerCSSClass : o, t)) + '>\r\n            <div class="stat-text">' + u(c(null != (o = null != (o = null != t ? t.statsInfo : t) ? o.statsText : o) ? o[1] : o, t)) + '</div>\r\n            <div class="stat-data">' + u(c(null != (o = null != (o = null != t ? t.statsInfo : t) ? o.statsData : o) ? o[1] : o, t)) + '</div>\r\n          </div>\r\n          <div class="stats-divider"></div>\r\n          <div class=' + u(c(null != (o = null != t ? t.statsInfo : t) ? o.statContainerCSSClass : o, t)) + '>\r\n            <div class="stat-text">' + u(c(null != (o = null != (o = null != t ? t.statsInfo : t) ? o.statsText : o) ? o[2] : o, t)) + '</div>\r\n            <div class="stat-data">' + u(c(null != (o = null != (o = null != t ? t.statsInfo : t) ? o.statsData : o) ? o[2] : o, t)) + '</div>\r\n          </div>\r\n          <div class="stats-divider"></div>\r\n        </div>\r\n        <div class="stats-footer">' + u(c(null != (o = null != t ? t.statsInfo : t) ? o.statsFooter : o, t)) + '</div>\r\n      </div>\r\n    </div>\r\n    <div class="rank-panel">\r\n      <div class="rank-headers">\r\n        <div class="rank-text-wrapper">\r\n          <lol-uikit-resizing-text-field class="current-rank-title" data-max-width="200">\r\n              ' + u(c(null != (o = null != t ? t.rankInfo : t) ? o.currentRankTitle : o, t)) + '\r\n          </lol-uikit-resizing-text-field>\r\n        </div>\r\n        <div class="rank-text-wrapper">\r\n          <lol-uikit-resizing-text-field class="current-rank-text" data-max-width="200">\r\n              ' + u(c(null != (o = null != t ? t.rankInfo : t) ? o.currentRankText : o, t)) + '\r\n          </lol-uikit-resizing-text-field>\r\n        </div>\r\n        <lol-uikit-resizing-text-field class="queue-type-text" data-max-width="200">' + u(c(null != (o = null != t ? t.rankInfo : t) ? o.queueTypeText : o, t)) + '</lol-uikit-resizing-text-field>\r\n      </div>\r\n      <div class="rank-crest-container">\r\n        <div class="crest">\r\n          <div class="crest-sizer">\r\n              <lol-regalia-emblem-element\r\n              animations="false"\r\n              ranked-tier="' + u(c(null != (o = null != t ? t.rankInfo : t) ? o.currentRankTier : o, t)) + '">\r\n              </lol-regalia-emblem-element>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>'
                },
                useData: !0,
                useBlockParams: !0
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1),
                a = n(5),
                i = n(50);
            n(131);
            var o;
            (o = n(116)) && o.__esModule;
            const l = n(132),
                r = (0, s.emberDataBinding)({
                    Ember: s.Ember,
                    websocket: (0, s.getProvider)().getSocket(),
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
            e.exports = s.Ember.Component.extend(r, {
                displayedNotificationsIds: new Set,
                displayedGlobalNotifications: new Set,
                classNames: ["leagues-dialogs-spawner"],
                rankedService: (0, s.dataBinding)("/lol-ranked", (0, s.getProvider)().getSocket()),
                settingsService: (0, s.dataBinding)("/lol-settings", (0, s.getProvider)().getSocket()),
                modalManager: s.ModalManager,
                toastCelebrationManager: s.ToastCelebrationManager,
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
                                s = this.get("displayedNotificationsIds");
                            s.has(n.id) || (s.add(n.id), this._waitForUnlock(this._showNotification, n)), this.set("displayedNotificationsIds", s)
                        }
                },
                _processGlobalNotifications: function(e) {
                    if (!e) return;
                    const t = [],
                        n = this.get("displayedGlobalNotifications");
                    for (let s = 0; s < e.length; s++) {
                        const a = e[s],
                            i = this._getSeasonId(a.queueType);
                        if (!i || !a.notifyReason || !a.queueType) continue;
                        const o = `${a.notifyReason}-${a.queueType}`;
                        n.has(o) || t[o] && !(t[o] < i) || (n.add(o), this._waitForUnlock(this._showGlobalNotification, a)), this.set("displayedGlobalNotifications", n)
                    }
                },
                _showGlobalNotification: function(e) {
                    const t = document.createElement("div");
                    t.style.height = "100%", t.style.width = "100%", t.style.transform = "scale(1)";
                    const n = document.createElement("lol-regalia-emblem-element");
                    n.setAttribute("ranked-tier", e.tier), t.appendChild(n), s.Ember.run.later((() => {
                        this._getDisplayNames([e.participantId]).then((n => {
                            let a = "";
                            if (Array.isArray(n) && n[0]) {
                                const e = n[0];
                                a = s.playerNames.isUsingAlias ? `${e.gameName} #${e.tagLine}` : e.displayName
                            }
                            const [i, o] = this._getGlobalNotificationText(e, a);
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
                        s = "";
                    const i = this.get("tra"),
                        o = e.queueType || a.QUEUES.RANKED_SOLO_5x5_QUEUE_TYPE;
                    return e.notifyReason === g ? (n = i.formatString("TOAST_FIRST_CHALLENGER_HEADER", {
                        name: t
                    }), s = i.formatString("TOAST_FIRST_CHALLENGER_BODY", {
                        queue: i.get(`QUEUE_NAME_${o}`),
                        name: t
                    })) : e.notifyReason === h && (n = i.formatString("TOAST_FINAL_RANK_ONE_HEADER", {
                        seasonYear: this._getSeasonYear(o)
                    }), s = i.formatString("TOAST_FINAL_RANK_ONE_BODY", {
                        queue: i.get(`QUEUE_NAME_${o}`),
                        name: t
                    })), [n, s]
                },
                _handleGlobalNotificationClicked(e) {
                    e.notifyReason === g ? s.Telemetry.sendEvent("leagues-first-challenger-toast-clicked") : e.notifyReason === h && s.Telemetry.sendEvent("leagues-final-rank-one-toast-clicked")
                },
                _sendGlobalNotificationShownTelemetry(e) {
                    e.notifyReason === g ? s.Telemetry.sendEvent("leagues-first-challenger-toast-shown") : e.notifyReason === h && s.Telemetry.sendEvent("leagues-final-rank-one-toast-shown")
                },
                _showNotification: function(e) {
                    "TOAST" === e.displayType ? this._showToastNotification(e) : "VIGNETTE" === e.displayType ? e.notifyReason === u && e.rewardEarnedId ? this._showVignetteNotificationAfterLoadingRewardAssets(e) : this._showVignetteNotification(e) : "MODAL" === e.displayType && this._showModalNotification(e)
                },
                _showVignetteNotificationAfterLoadingRewardAssets: function(e) {
                    const t = e.rewardEarnedId;
                    s.LeagueTierNames.asyncGetSplitRewardLocalization(t).then((n => {
                        e.subheaderText = n;
                        const a = e.rewardOverrideImagePath;
                        a ? (e.imagePath = a, this._showVignetteNotification(e)) : s.LeagueTierNames.asyncGetRewardImage(t).then((t => {
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
                    return s.LeagueTierNames.getTiersForQueue(e.queueType).then((r => {
                        const c = s.Ember.Object.create({
                                notification: n,
                                vignetteSize: l,
                                isShowing: !1,
                                isLowSpec: this.get("isLowSpec"),
                                rankedStats: this.get("rankedStats"),
                                tiers: r
                            }),
                            u = e.notifyReason === _ && e.queueType === a.QUEUES.RANKED_CHERRY_QUEUE_TYPE;
                        if (e.notifyReason === f && e.queueType === a.QUEUES.RANKED_CHERRY_QUEUE_TYPE) return void o(e);
                        const d = u ? S.CHERRY_RATED_TIER_PROMOTED : S[i],
                            p = s.componentFactory.create({
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
                                    s.VignetteCelebrationManager.remove(this), s.Ember.run.later((() => {
                                        o(e)
                                    }), 1e3)
                                },
                                onRemove: function() {
                                    s.Ember.run.later((() => {
                                        p && p.onRemove && p.onRemove()
                                    }), 500)
                                },
                                onShow: function() {
                                    s.Ember.run.later((() => {
                                        c.set("isShowing", !0)
                                    }), T[i])
                                }
                            };
                        s.VignetteCelebrationManager.add(m)
                    }))
                },
                _showModalNotification: function(e) {
                    const [t, n, s] = this._getModalNotificationText(e);
                    if (!t && !n) return void this._acknowledgeNotification(e);
                    const a = l({
                            header: t,
                            body: n
                        }),
                        i = document.createElement("div");
                    i.classList.add("leagues-modal-notification"), i.innerHTML = a;
                    const o = {
                        contents: i.outerHTML,
                        okText: s
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
                        s = "",
                        a = t.get("lib_ui_dialog_alert_ok");
                    const o = e.notifyReason,
                        l = e.changeReason,
                        r = this._getQueueLoc(e);
                    if (o === p) l === m ? (n = t.get("LEAGUES_SYSTEM_DECAY_DEMOTION_TITLE"), s = t.formatString("LEAGUES_SYSTEM_DECAY_DEMOTION", {
                        tierDivisionLoc: this._getTierDivisionLoc(e),
                        queueType: r
                    })) : !0 === e.eligibleForPromoHelper ? (n = t.get("LEAGUES_GENERAL_LEAGUE_UPDATE_TITLE"), s = t.formatString("LEAGUES_MESSAGE_PROMOHELPER_LEAGUE_DEMOTED", {
                        tierDivisionLoc: this._getTierDivisionLoc(e),
                        queueType: r
                    })) : (n = t.get("LEAGUES_GENERAL_LEAGUE_UPDATE_TITLE"), s = t.formatString("LEAGUES_MESSAGE_LEAGUE_DEMOTED", {
                        tierDivisionLoc: this._getTierDivisionLoc(e),
                        queueType: r
                    }));
                    else if ("MINISERIES_START" === o) n = t.get("LEAGUES_GENERAL_LEAGUE_MINISERIES_TITLE"), s = t.formatString("LEAGUES_MESSAGE_MINISERIES_START", {
                        miniseriesWins: e.miniseriesWins,
                        queueType: r
                    });
                    else if ("MINISERIES_LOST" === o) !0 === e.eligibleForPromoHelper ? (n = t.get("LEAGUES_GENERAL_LEAGUE_MINISERIES_TITLE"), s = t.formatString("LEAGUES_MESSAGE_PROMOHELPER_MINISERIES_LOST", {
                        queueType: r
                    })) : (n = t.get("LEAGUES_GENERAL_LEAGUE_MINISERIES_TITLE"), s = t.formatString("LEAGUES_MESSAGE_MINISERIES_LOST", {
                        queueType: r
                    }));
                    else if ("MINISERIES_CANCEL" === o) l === m ? (n = t.get("LEAGUES_SYSTEM_SERIES_ENDED_TITLE"), s = t.formatString("LEAGUES_SYSTEM_SERIES_ENDED_DECAY", {
                        queueType: r
                    })) : (n = t.get("LEAGUES_SYSTEM_SERIES_ENDED_TITLE"), s = t.formatString("LEAGUES_SYSTEM_SERIES_ENDED", {
                        queueType: r
                    }));
                    else if ("LEAGUE_DECAY_WARNING" === o) n = t.get("LEAGUES_SYSTEM_DECAY_SOON_TITLE"), s = t.formatString("LEAGUES_SYSTEM_DECAY_SOON", {
                        timeUntilInactivityStatusChangesDays: (0, i.timeInMillisToDays)(e.timeUntilInactivityStatusChanges),
                        queueType: r
                    });
                    else if ("MINISERIES_DECAY_WARNING" === o) n = t.get("LEAGUES_SYSTEM_PROMOTION_SERIES_DECAY_SOON_TITLE"), s = t.formatString("LEAGUES_SYSTEM_SERIES_INACTIVITY", {
                        timeUntilInactivityStatusChangesDays: (0, i.timeInMillisToDays)(e.timeUntilInactivityStatusChanges),
                        queueType: r
                    });
                    else if (l === m) n = t.get("LEAGUES_SYSTEM_DECAY_TITLE"), s = t.formatString("LEAGUES_SYSTEM_DECAY", {
                        queueType: r
                    });
                    else {
                        const i = e.afkLpPenaltyAmount,
                            o = e.afkLpPenaltyLevel;
                        e.wasAfkOrLeaver && i < 0 && o > 0 && (n = t.get("player_behavior_afk_lp_penalty_notification_header"), s = o > 1 ? t.formatString("player_behavior_afk_lp_penalty_notification_body", {
                            numGamesRemaining: o - 1
                        }) : this.get("tra.player_behavior_afk_lp_penalty_notification_no_games_remaining_body"), a = t.get("player_behavior_afk_lp_penalty_notification_cta"))
                    }
                    return [n, s, a]
                },
                _showToastNotification: function(e) {
                    const [t, n] = this._getToastNotificationText(e), a = this._isToastMuted(e), i = document.createElement("div");
                    i.style.height = "100%", i.style.width = "100%", i.style.transform = "scale(1)";
                    const o = document.createElement("lol-regalia-emblem-element");
                    o.setAttribute("ranked-tier", e.tier), i.appendChild(o), s.Ember.run.later((() => {
                        this.toastCelebrationManager.add({
                            data: {
                                title: t,
                                details: n,
                                iconElement: i,
                                isMuted: a
                            },
                            timing: "slow"
                        })
                    }), 1e3), this._acknowledgeNotification(e)
                },
                _getToastNotificationText: function(e) {
                    let t = "",
                        n = "";
                    const s = this.get("tra"),
                        a = e.notifyReason,
                        i = this._getQueueLoc(e);
                    return "LEAGUE_SEEDED" === a ? (t = this._getTierDivisionLpLoc(e), n = s.formatString("TOAST_PROVISIONAL_START_BODY", {
                        queueType: i
                    })) : a === d ? (t = s.formatString("TOAST_DIVISION_PROMOTION_HEADER", {
                        tierDivisionLoc: this._getTierDivisionLoc(e)
                    }), n = s.formatString("TOAST_DIVISION_PROMOTION_BODY", {
                        queueType: i
                    })) : a === p && (t = s.formatString("TOAST_DEMOTION_HEADER", {
                        tierDivisionLoc: this._getTierDivisionLoc(e)
                    }), n = s.formatString("TOAST_DEMOTION_BODY", {
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
                _getTierDivisionLoc: e => s.LeagueTierNames.getFullTierDivisionName(e.tier, e.division),
                _getTierDivisionLpLoc: e => s.LeagueTierNames.getTierDivisionLpLoc(e.tier, e.division, e.leaguePoints),
                _getQueueLoc: e => s.LeagueTierNames.getRankedQueueName(e.queueType),
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
                isLowSpec: s.Ember.computed("uxSettings", "uxSettings.data", "uxSettings.data.potatoModeEnabled", (function() {
                    return !!this.get("uxSettings.data.potatoModeEnabled")
                })),
                _waitForUnlock: function(e, t) {
                    const n = e.bind(this);
                    if (s.LockAndLoad.getLockState()) {
                        const e = function() {
                            s.LockAndLoad.removeEventListener("unlock", e), setTimeout((function() {
                                n(t)
                            }), 5e3)
                        };
                        s.LockAndLoad.addEventListener("unlock", e)
                    } else n(t)
                }
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            var s = n(55);
            e.exports = (s.default || s).template({
                compiler: [7, ">= 4.0.0"],
                main: function(e, t, n, s, a) {
                    var i, o = null != t ? t : e.nullContext || {},
                        l = n.helperMissing,
                        r = "function",
                        c = e.escapeExpression;
                    return "<h4>" + c(typeof(i = null != (i = n.header || (null != t ? t.header : t)) ? i : l) === r ? i.call(o, {
                        name: "header",
                        hash: {},
                        data: a
                    }) : i) + '</h4>\r\n<hr class="heading-spacer" />\r\n<p>' + c(typeof(i = null != (i = n.body || (null != t ? t.body : t)) ? i : l) === r ? i.call(o, {
                        name: "body",
                        hash: {},
                        data: a
                    }) : i) + "</p>\r\n"
                },
                useData: !0
            })
        }, (e, t, n) => {
            "use strict";
            var s = n(1),
                a = n(23);
            const i = (0, s.emberDataBinding)({
                Ember: s.Ember,
                websocket: (0, s.getProvider)().getSocket(),
                boundProperties: {
                    championSkinCatalog: "/lol-catalog/v1/items/CHAMPION_SKIN",
                    emoteCatalog: "/lol-catalog/v1/items/EMOTE",
                    summonerIconCatalog: "/lol-catalog/v1/items/SUMMONER_ICON",
                    splitsConfig: "/lol-ranked/v1/splits-config",
                    myRankedStats: "/lol-ranked/v1/current-ranked-stats"
                }
            });
            e.exports = s.Ember.Service.extend(i, {
                getRewardData: function(e, t, n) {
                    if (e === a.CHAMPION_REWARD_TYPE) return this.getRewardFromCatalog(e, t, this.get("championSkinCatalog"));
                    if (e === a.EMOTE_REWARD_TYPE) return this.getRewardFromCatalog(e, t, this.get("emoteCatalog"));
                    if (e === a.SUMMONER_ICON_REWARD_TYPE) return this.getRewardFromCatalog(e, t, this.get("summonerIconCatalog"));
                    if (e === a.REGALIA_REWARD_TYPE) return this.getRegalia(e, t, n);
                    if (e === a.ETERNALS_CAPSULE_REWARD_TYPE) return this.getEternalsCapsule(e);
                    const i = this.getSplitNumber(t);
                    return {
                        imagePath: s.SummonerIconManager.getIconUrlById(3898),
                        split: i,
                        loc: this.getRewardLoc(e, i)
                    }
                },
                getRewardFromCatalog: function(e, t, n) {
                    if (!n) return null;
                    let s = n.find((function(e) {
                        return e.itemInstanceId === t
                    }));
                    s || (s = {});
                    const {
                        imagePath: a
                    } = s, i = this.getSplitNumber(t);
                    return {
                        imagePath: a,
                        split: i,
                        loc: this.getRewardLoc(e, i)
                    }
                },
                getRegalia: function(e, t, n) {
                    const s = this.getRegaliaLevelToShow(t);
                    this.getSplitNumber(t);
                    let i;
                    return i = n && n.transparent ? `${a.ASSET_PATH}images/Split_Reward_Level_${s}_Transparent.png` : n && n.small ? `${a.ASSET_PATH}images/Split_Reward_Level_${s}_Small.png` : `${a.ASSET_PATH}images/Split_Reward_Level_${s}.jpg`, {
                        imagePath: i,
                        loc: this.getRewardLoc(e, s)
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
                    return e === a.EMOTE_REWARD_TYPE ? n = "LEAGUES_REWARD_EMOTE" : e === a.REGALIA_REWARD_TYPE ? n = "LEAGUES_REWARD_REGALIA" : e === a.ETERNALS_CAPSULE_REWARD_TYPE && (n = "LEAGUES_ETERNALS_CAPSULE"), this.get("tra").formatString(n, {
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
                regaliaRewards: s.Ember.computed("splitsConfig.rewardInfoByRewardId", (function() {
                    const e = this.get("splitsConfig.rewardInfoByRewardId");
                    return e ? Object.keys(e).map((t => e[t])).filter((e => e.rewardType === a.REGALIA_REWARD_TYPE)) : []
                })),
                numberOfNotEarnedRegalia: s.Ember.computed("myRankedStats.splitsProgress", "regaliaRewards.[]", "splitsConfig.currentSplitId", (function() {
                    const e = this.get("myRankedStats.splitsProgress"),
                        t = this.get("splitsConfig.currentSplitId"),
                        n = this.get("regaliaRewards");
                    if (!t || !e) return;
                    const s = [0];
                    for (let a = 0; a < n.length; a++) {
                        const i = n[a],
                            {
                                splitId: o
                            } = i,
                            l = e[o] || 0;
                        o < t && l < i.pointsRequired ? s[o] = s[o - 1] + 1 : s[o] = s[o - 1]
                    }
                    return s
                }))
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = function(e, t, n) {
                const a = document.createElement("div");
                a.className = "lol-leagues lol-leagues-full", a.type = "LeaguesRootComponent";
                const u = document.createElement("div");
                u.className = "lol-leagues lol-leagues-modal", u.type = "LeaguesRootComponent";
                const d = e.get("rcp-fe-lol-profiles").mainSection(),
                    p = e.get("rcp-fe-lol-profiles").overlaySection(),
                    m = c(d, a, n),
                    g = c(p, u, n),
                    h = s.Ember.Object.create();
                r(m, a, t, !1, null, h), r(g, u, t, !0), f = p, _ = g, f.addEventListener("showSubsection", ((e, t) => {
                    if (!t || !t.puuid) return;
                    const n = o + t.puuid;
                    (0, s.dataBinding)(i, (0, s.getProvider)().getSocket()).get(n).then((e => {
                        const t = null !== e && e.length > 0;
                        _.setEnabled(t), _.setTooltip(t ? null : s.Tra.get(l))
                    }))
                })), s.Tra.observe((() => {
                    _.tooltip && _.setTooltip(s.Tra.get(l))
                })), t.create("LeaguesNotificationsApp");
                var f, _
            };
            var s = n(1),
                a = n(23);
            const i = "/lol-ranked",
                o = "/v1/league-ladders/",
                l = "LEAGUES_UNRANKED_FRIEND";

            function r(e, t, n, a, i, o) {
                e.addEventListener("selected", (l => {
                    let r = null,
                        c = null;
                    if (s.Telemetry.startTracingEvent("profile-ranked-rendered"), !l || !l.summonerId) return o && o.set("refreshTopChamps", !0), i || (i = n.create("LeaguesRootComponent", o)), void i.componentPromise.then((() => {
                        t.appendChild(i.domNode)
                    }));
                    r = l.summonerId, c = l.puuid;
                    const u = n.create("LeaguesRootComponent", l ? s.Ember.Object.create({
                        summonerId: r,
                        puuid: c,
                        overlayMode: a
                    }) : s.Ember.Object.create());
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
                    id: a.PROFILE_RANKED_SUBSECTION_ID,
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
                (0, s.dataBinding)("/lol-platform-config", (0, s.getProvider)().getSocket()).observe("v1/namespaces/ClientSystemStates", (e => {
                    o = !e || e.leagueServiceEnabled, u(i, o, l, n)
                }));
                return (0, s.dataBinding)("/lol-ranked", (0, s.getProvider)().getSocket()).observe("v1/signed-ranked-stats", (e => {
                    l = Boolean(e), u(i, o, l, n)
                })), i
            }

            function u(e, t, n, s) {
                const a = t && n;
                e && (e.setEnabled(a), e.setTooltip(a ? null : s.get("LEAGUES_SERVICE_UNAVAILABLE")))
            }
        }],
        t = {};

    function n(s) {
        var a = t[s];
        if (void 0 !== a) return a.exports;
        var i = t[s] = {
            exports: {}
        };
        return e[s](i, i.exports, n), i.exports
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
        var e = s(n(1)),
            t = s(n(2));

        function s(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        const a = "rcp-fe-lol-leagues",
            i = document.currentScript.ownerDocument;
        const o = window.getPluginAnnounceEventName(a);
        i.addEventListener(o, (function(s) {
            (0, s.registrationHandler)((function(s) {
                const i = s.get("rcp-fe-lol-l10n").tra().overlay("/fe/lol-l10n/trans.json").overlay("/fe/lol-leagues/trans.json").overlay("/fe/lol-social/trans.json");
                return e.default.init(s, {
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
                    logger: e => e.get("rcp-fe-common-libs").logging.create(a),
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
                        Ember: s
                    } = e.default, {
                        emberApplicationFactory: a,
                        componentFactory: o
                    } = e.default, l = (0, t.default)(s, i);
                    e.default.tra = i;
                    const r = n(3).default,
                        c = n(134).default;
                    return r(o, a, l), c(e.default.getProvider(), o, i), {}
                }))
            }))
        }), {
            once: !0
        })
    })()
})();