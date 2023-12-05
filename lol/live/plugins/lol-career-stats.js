(() => {
    var e = [, e => {
            "use strict";
            let t;

            function a() {
                return t || (console.error("The `provider` object has not been set, please do so by calling the `init` method."), null)
            }
            const s = {
                init: function(e, a) {
                    return t = e, this.add(a)
                },
                _getValue: function(e, a) {
                    let s;
                    return "function" == typeof a ? (s = a(t), s || console.warn("The function for key " + e + " returned a falsy value: ", s)) : "string" == typeof a ? (s = t.get(a), s || console.warn("The provider `get` invocation for the key " + e + " returned a falsy value: ", s)) : "object" == typeof a && (s = a), s
                },
                add: function(e) {
                    e = e || {};
                    const t = [],
                        a = this;
                    return Object.keys(e).forEach((function(s) {
                        const n = e[s],
                            o = a._getValue(s, n);
                        o && o.then ? (o.then((function(e) {
                            e || console.warn("The promise for the key " + s + " resolved with a falsy value: ", e), a._addValue(s, e)
                        })), t.push(o)) : a._addValue(s, o)
                    })), Promise.all(t)
                },
                _addValue: function(e, t) {
                    this[e] = t
                },
                provider: function() {
                    return console.error("The function `provider` has been deprecated, please use `getProvider`", (new Error).stack), a()
                },
                getProvider: function() {
                    return a()
                }
            };
            e.exports = s
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = i(a(3)),
                n = i(a(60)),
                o = a(1),
                l = a(11),
                r = a(12);

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            t.default = class {
                constructor(e) {
                    this._privateApi = (0, s.default)(e), this._tra = e;
                    const t = (0, o.dataBinding)("/lol-login", (0, o.getProvider)().getSocket()),
                        a = (0, o.dataBinding)("/entitlements", (0, o.getProvider)().getSocket()),
                        n = (0, o.dataBinding)("/lol-platform-config", (0, o.getProvider)().getSocket());
                    this._entitlementsEndpoint = a, this._platformConfigEndpoint = n, this._profileRegistered = !1, this._entitlementsEnabled = !1, this._jmxConfigEnabled = !1, t.observe("/v1/session", this, (e => {
                        e && "SUCCEEDED" === e.state && (t.unobserve(this), a.observe("/v1/token", this, this._entitlementsChangeHandler), n.observe("/v1/namespaces/CareerStats", this, this._platformConfigChangeHandler))
                    }))
                }
                showCareerStatsModal(e, t = !0) {
                    o.Lodash.set(e, "fullReload", t), this._privateApi.showCareerStatsModal(e)
                }
                hideCareerStatsModal(e) {
                    this._privateApi.hideCareerStatsModal(e)
                }
                _entitlementsChangeHandler(e) {
                    this._entitlementsEnabled = o.Lodash.includes(o.Lodash.get(e, "entitlements"), "urn:entitlement:rpgriot.riot.rioter"), this._checkProfileRegistration()
                }
                _platformConfigChangeHandler(e) {
                    this._jmxConfigEnabled = o.Lodash.get(e, "StatsEnabled"), this._checkProfileRegistration()
                }
                _checkProfileRegistration() {
                    this._profileRegistered || !this._entitlementsEnabled && !this._jmxConfigEnabled || (this._profileRegistered = !0, this._entitlementsEndpoint.unobserve(this), this._platformConfigEndpoint.unobserve(this), (0, n.default)(this._tra))
                }
                filterGames(e, t) {
                    return (0, l.filterGames)(e, t)
                }
                inferPosition(e) {
                    return (0, l.inferPosition)(e)
                }
                getMinGamesToUnlockStats() {
                    return r.MIN_GAMES_TO_UNLOCK_STATS
                }
                getCareerStatsQueueType(e) {
                    return e in r.RANKED_QUEUE_TYPE_MAPPINGS ? r.RANKED_QUEUE_TYPE_MAPPINGS[e] : e
                }
                getGradesForChampion(e, t, a, s) {
                    const n = (0, l.calculateStatsTrends)(e),
                        r = o.Lodash.get(s, a + "." + t),
                        i = (0, l.calculateCategoryPercentilesWithStatsTrends)(n, r);
                    return (0, l.calculateGradesAndBestPlaystyle)(i).categoryGrades
                }
                getWinrate(e) {
                    return (0, l.getWinrate)(e)
                }
                getCareerStatsService() {
                    return a(33).default
                }
                getNormalGamesQueueTypes() {
                    return r.NORMAL_GAMES_QUEUE_TYPES
                }
                getAllRanks() {
                    return r.ALL_RANKS
                }
            }
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = function(e) {
                void 0 === r && (r = new l(e));
                return r
            };
            var s, n = a(1),
                o = (s = a(35)) && s.__esModule ? s : {
                    default: s
                };
            class l {
                constructor(e) {
                    const t = (0, o.default)(n.Ember, e);
                    this._tra = e, this._traService = t, this._registerComponents(t)
                }
                showCareerStatsModal(e) {
                    this._careerStatsModalApp ? this._careerStatsModalApp.show(e) : this._initCareerStatsModalApp().then((t => t.show(e)))
                }
                hideCareerStatsModal(e) {
                    this._careerStatsModalApp && this._careerStatsModalApp.hide(e)
                }
                _initCareerStatsModalApp() {
                    return this._careerStatsModalApp ? Promise.resolve(this._careerStatsModalApp) : new Promise((e => {
                        Promise.resolve().then((() => {
                            e(a(4).default)
                        }).bind(null, a)).catch(a.oe)
                    })).then((e => (this._careerStatsModalApp = new e(this._traService), this._careerStatsModalApp)))
                }
                _registerComponents(e) {
                    const {
                        PlayerNameComponent: t
                    } = n.SharedEmberComponents;
                    n.emberApplicationFactory.setFactoryDefinition({
                        name: "CareerStatsRootComponent",
                        tra: e,
                        ComponentFactory: n.componentFactory,
                        CareerStatsRootComponent: a(36).default,
                        CareerStatsOverviewComponent: a(39).default,
                        PlaystyleSummaryGraphComponent: a(42).default,
                        OverviewBreakdownComponent: a(45).default,
                        CareerStatsService: a(33).default
                    }), n.emberApplicationFactory.setFactoryDefinition({
                        name: "StatsComparisonSelectorModalComponent",
                        tra: e,
                        ComponentFactory: n.componentFactory,
                        StatsComparisonSelectorModalComponent: a(48).default,
                        ExpertListComponent: a(51).default,
                        SeasonCompareListComponent: a(54).default,
                        PlayerNameComponent: t,
                        CareerStatsService: a(33).default
                    }), n.emberApplicationFactory.setFactoryDefinition({
                        name: "CareerStatsWelcomeModalComponent",
                        ComponentFactory: n.componentFactory,
                        tra: e,
                        CareerStatsFlyoutMenuComponent: a(57).default
                    })
                }
            }
            let r
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = a(1);
            const n = (0, s.dataBinding)("/lol-gameflow", (0, s.getProvider)().getSocket()),
                o = new CustomEvent("screenBumped"),
                l = new CustomEvent("screenReleased");
            t.default = class {
                constructor(e) {
                    this._init(e)
                }
                show(e) {
                    if (this._screenRoot.release(), this._component) this._componentParams.setProperties(e);
                    else {
                        e.beforeHide || (e.beforeHide = Promise.resolve()), this._componentParams.setProperties(e);
                        const t = s.componentFactory.create("CareerStatsModalRootComponent", this._componentParams);
                        this._contentElement.appendChild(t.domNode), this._component = t
                    }
                    this._screenRoot.bump(), this._component.domNode.dispatchEvent(o)
                }
                hide(e) {
                    if (e && e.forceHide) this._screenRoot.release();
                    else {
                        const e = this._componentParams.get("beforeHide");
                        (e instanceof Function ? e() : Promise.resolve()).then((() => {
                            this._screenRoot.release(), this._component.domNode.dispatchEvent(l)
                        })).catch((e => {
                            s.logger.warning("Error in before hide promise for career stats modal", e), this._screenRoot.release()
                        }))
                    }
                }
                _init(e) {
                    const {
                        PlayerNameComponent: t
                    } = s.SharedEmberComponents, n = s.Viewport.getApiKey("rcp-fe-lol-career-stats_api_key");
                    this._screenRoot = s.Viewport.overlay().getScreenRoot(n, "rcp-fe-lol-career-stats-modal"), this._contentElement = document.createElement("lol-uikit-full-page-modal"), this._contentElement.className = "rcp-fe-lol-career-stats-modal-content", this._screenRoot.getElement().appendChild(this._contentElement), this._contentElement.addEventListener("close-modal", (() => this.hide())), s.emberApplicationFactory.setFactoryDefinition({
                        name: "CareerStatsModalRootComponent",
                        tra: e,
                        ComponentFactory: s.componentFactory,
                        CareerStatsModalRootComponent: a(5).default,
                        StatsCategorySummaryGraphComponent: a(17).default,
                        StatsTrendGraphComponent: a(20).default,
                        PlayerNameComponent: t,
                        CareerStatsService: a(33).default
                    }), this._componentParams = s.Ember.Object.create(), this._subscribeNavigationEvents()
                }
                _subscribeNavigationEvents() {
                    s.NavigationPlugin.playButtonSubscribe((() => {
                        this.hide()
                    })), s.NavigationPlugin.lobbyButtonSubscribe((() => {
                        this.hide()
                    }));
                    s.Viewport.main().getScreenRoot("rcp-fe-lol-profiles-main").on("hide", (() => {
                        this.hide()
                    })), n.observe("/v1/session", this, (e => {
                        const t = e && e.phase,
                            a = this._gameFlowPhase;
                        "ChampSelect" === t && "ChampSelect" !== a && this.hide(), this._gameFlowPhase = t
                    })), s.NavigationPlugin.on("navigate", (() => {
                        this.hide()
                    }))
                }
            }
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = a(1),
                n = a(6),
                o = a(7),
                l = m(a(8)),
                r = m(a(9));
            a(10);
            var i = a(11),
                c = a(12);

            function m(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            const p = [{
                key: "self",
                image: a(14),
                width: 13,
                height: 24
            }, {
                key: "selfHover",
                image: a(15),
                width: 13,
                height: 24
            }, {
                key: "other",
                image: a(16),
                width: 13,
                height: 24
            }];
            var d = s.Ember.Component.extend({
                classNames: ["career-stats-modal-root-component"],
                classNameBindings: ["fullReload", "isSeasonSettingLoaded"],
                layout: r.default,
                careerStatsService: s.Ember.inject.service("careerStats"),
                earliestSeason: s.Ember.computed.readOnly("careerStatsService.earliestSeason"),
                currentSeason: s.Ember.computed.readOnly("careerStatsService.currentSeason"),
                isSeasonSettingLoaded: s.Ember.computed.readOnly("careerStatsService.isSeasonSettingLoaded"),
                smootheningRequiredSize: c.SMOOTHENING_REQUIRED_SIZE,
                rollingAverageWindowSize: c.ROLLING_AVERAGE_WINDOW_SIZE,
                maxDataPoints: c.MAX_DATA_POINTS,
                screenBumped: !0,
                screenReleased: !0,
                showingPositionDetails: s.Ember.computed.equal("screen", "position"),
                showingChampionDetails: s.Ember.computed.equal("screen", "champion"),
                backdropImgSrc: null,
                isLoadingMatchSummary: !1,
                errorLoadingMatchSummary: !1,
                pinnedGame: s.Ember.Object.create({}),
                pinnedGameChanged: s.Ember.on("init", s.Ember.observer("pinnedGame.index", "relevantGames", (function() {
                    const e = this.get("pinnedGame.index"),
                        t = this.get("relevantGames." + (e + this.get("currentRollingWindowSize") - 1));
                    if (s.Lodash.isNumber(e) && t && t.gameId) {
                        this.set("isLoadingMatchSummary", !0);
                        const {
                            participantId: e
                        } = t.stats[c.CAREER_STATS_KEY];
                        this.get("careerStatsService").loadMatchSummary(t.gameId, e).then((e => {
                            null === e ? this.set("errorLoadingMatchSummary", !0) : (this.set("errorLoadingMatchSummary", !1), this.set("pinnedMatchSummary", e)), this.set("isLoadingMatchSummary", !1)
                        }))
                    } else this.set("pinnedMatchSummary", null)
                }))),
                calculateGradesAndBestPlaystyle: i.calculateGradesAndBestPlaystyle,
                currentSelectedPosition: s.Ember.computed("showingChampionDetails", "data.position", "positionFilter", (function() {
                    if (this.get("showingChampionDetails")) {
                        const e = this.get("positionFilter");
                        return e ? e.name : this.get("data.position")
                    }
                    return this.get("data.position")
                })),
                currentSelectedSeason: s.Ember.computed("timeFilter.season", "data.season", (function() {
                    return this.get("timeFilter.season") || this.get("data.season")
                })),
                fullReloadObserver: s.Ember.on("init", s.Ember.observer("fullReload", "isSeasonSettingLoaded", (function() {
                    this.get("fullReload") && this.get("isSeasonSettingLoaded") && this._fullReloadStatsDetails().then((() => {
                        const e = this.get("data.queueType");
                        this.set("data.queueFilter", {
                            queueTypes: [e],
                            traKey: e
                        }), this.set("fullReload", !1)
                    }))
                }))),
                backdropObserver: s.Ember.on("init", s.Ember.observer("data.championId", "showingChampionDetails", (function() {
                    if (this.get("showingChampionDetails")) {
                        const e = this.get("data.championId");
                        e && this.get("careerStatsService").loadChampionSplashPath(e).then((e => {
                            this.set("backdropImgSrc", e)
                        }))
                    } else this.set("backdropImgSrc", "/lol-game-data/assets/content/src/LeagueClient/GameModeAssets/Classic_SRU/img/parties-background.jpg")
                }))),
                puuid: s.Ember.computed.alias("data.summoner.puuid"),
                summonerName: s.Ember.computed.alias("data.summoner.displayName"),
                gameName: s.Ember.computed.alias("data.summoner.gameName"),
                tagLine: s.Ember.computed.alias("data.summoner.tagLine"),
                secondaryTitleDisplay: s.Ember.computed("showingPositionDetails", "showingChampionDetails", "champion", "data.position", "tra", (function() {
                    return this.get("showingChampionDetails") ? this.get("champion.name") : this.get("tra").get(`career_stats_position_name_${this.get("data.position")}`)
                })),
                validQueues: s.Ember.computed("showingChampionDetails", "data.championOverview", "data.championId", "data.position", "data.positionQueuesMap", (function() {
                    const e = [];
                    if (this.get("showingChampionDetails")) {
                        const t = s.Lodash.get(this.get("data.championOverview"), this.get("data.championId"));
                        s.Lodash.each(t, ((t, a) => {
                            s.Lodash.find(s.Lodash.values(t), (e => e >= c.MIN_GAMES_TO_UNLOCK_STATS)) && e.push(a)
                        }))
                    } else {
                        const t = s.Lodash.get(this.get("data.positionQueuesMap"), this.get("data.position"));
                        s.Lodash.each(t, ((t, a) => {
                            t >= c.MIN_GAMES_TO_UNLOCK_STATS && e.push(a)
                        }))
                    }
                    return e
                })),
                queueFilters: s.Ember.computed("tra", "validQueues", (function() {
                    const e = this.get("validQueues");
                    return s.Ember.A(s.Lodash.map(c.QUEUE_FILTERS, (t => s.Ember.Object.create(s.Lodash.assign({
                        displayName: this.get("tra").get(`career_stats_queue_filter_${t.traKey}`),
                        selected: !1,
                        disabled: !s.Lodash.includes(e, t.queueTypes[0])
                    }, t)))))
                })),
                defaultTimeFilterForCurrentSeason: "past-10",
                timeFilters: s.Ember.computed("tra", "earliestSeason", "currentSeason", "isSeasonSettingLoaded", (function() {
                    if (!this.get("isSeasonSettingLoaded")) return s.Ember.A();
                    const e = this.get("earliestSeason"),
                        t = this.get("currentSeason"),
                        a = this.get("tra"),
                        n = s.Lodash.map(c.TIME_FILTERS, (e => s.Ember.Object.create(s.Lodash.assign({
                            displayName: e.includeAll ? a.get(`career_stats_time_filter_${e.traKey}`) : a.formatString(`career_stats_time_filter_${e.traKey}`, {
                                length: e.length
                            }),
                            season: t,
                            selected: !1
                        }, e)))),
                        o = this.get("careerStatsService");
                    for (let a = t - 1; a >= e; a--) n.push(s.Ember.Object.create({
                        key: `previous-${a}`,
                        season: a,
                        displayName: o.getSeasonDisplayTra(a),
                        selected: !1,
                        includeAll: !0
                    }));
                    return s.Ember.A(n)
                })),
                currentSeasonName: s.Ember.computed("currentSelectedSeason", "isSeasonSettingLoaded", (function() {
                    const e = this.get("currentSelectedSeason"),
                        t = this.get("careerStatsService"),
                        a = this.get("isSeasonSettingLoaded");
                    return e && a ? t.getSeasonDisplayTra(e) : ""
                })),
                presetSeasonChanged: s.Ember.on("init", s.Ember.observer("data.season", "timeFilters", (function() {
                    !this.get("timeFilter") && this.get("timeFilters.length") > 0 && (this.set("loadedSeason", this.get("data.season")), this._selectDefaultTimeFilter())
                }))),
                positionFilters: s.Ember.computed("tra", "showingChampionDetails", "data.championOverview", "data.championId", "queueFilter.queueTypes.0", "currentSelectedPosition", (function() {
                    const e = this.get("showingChampionDetails"),
                        t = this.get("currentSelectedPosition");
                    let a = c.POSITIONS;
                    if (e) {
                        const e = s.Lodash.get(this.get("data.championOverview"), this.get("data.championId")),
                            t = this.get("queueFilter.queueTypes.0"),
                            n = s.Lodash.get(e, t);
                        a = c.POSITIONS.filter((e => s.Lodash.gte(s.Lodash.get(n, e), c.MIN_GAMES_TO_UNLOCK_STATS)))
                    }
                    return s.Ember.A(s.Lodash.map(a, (e => s.Ember.Object.create({
                        name: e,
                        displayName: this.get("tra").get(`career_stats_position_filter_${e}`),
                        selected: e === t
                    }))))
                })),
                currentPercentiles: s.Ember.computed("percentileMap", "data.percentileMap", "currentSelectedPosition", "queueFilter", (function() {
                    const e = this.get("percentileMap") || this.get("data.percentileMap"),
                        t = this.get("queueFilter.queueTypes.0"),
                        a = this.get("currentSelectedPosition");
                    return s.Lodash.get(e, `${t}.${a}`)
                })),
                statsRanges: s.Ember.computed("currentPercentiles", (function() {
                    const e = this.get("currentPercentiles");
                    if (e) {
                        return s.Lodash.reduce(e, ((e, t, a) => (e[a] = [t[c.NORMAL_STAT_RANGE_MIN_PERCENTILE], t[c.NORMAL_STAT_RANGE_MAX_PERCENTILE]], e)), {})
                    }
                    return c.DEFAULT_STATS_RANGES
                })),
                letterGrades: s.Ember.computed("statsTrends", "currentPercentiles", (function() {
                    const e = this.get("statsTrends"),
                        t = this.get("currentPercentiles");
                    if (t) {
                        const a = (0, i.calculateCategoryPercentilesWithStatsTrends)(e, t);
                        return this.calculateGradesAndBestPlaystyle(a)
                    }
                    return null
                })),
                overallGradeDisplay: s.Ember.computed("letterGrades.overallGrade", (function() {
                    return this.get("letterGrades.overallGrade") || c.UNAVAILABLE_GRADE
                })),
                letterOnlyGrade: s.Ember.computed("overallGradeDisplay", (function() {
                    return this.get("overallGradeDisplay")[0]
                })),
                overallGradeTooltip: s.Ember.computed("overallGradeDisplay", "tra", (function() {
                    const e = this.get("overallGradeDisplay");
                    return this.get("tra").get(e === c.UNAVAILABLE_GRADE ? "career_stats_tooltip_grade_unavailable" : "career_stats_tooltip_grade_overall")
                })),
                categoryGradeDisplays: s.Ember.computed("letterGrades.categoryGrades", "tra.career_stats_play_style_category_combat", "tra.career_stats_play_style_category_income", "tra.career_stats_play_style_category_macro", "currentCategory", (function() {
                    const e = this.get("letterGrades.categoryGrades"),
                        t = this.get("currentCategory"),
                        a = this.get("tra");
                    return s.Ember.A(["macro", "income", "combat"].map((n => ({
                        category: n,
                        grade: s.Lodash.get(e, n) || c.UNAVAILABLE_GRADE,
                        description: a.get(`career_stats_play_style_category_${n}`),
                        selected: n === t,
                        tooltip: a.get(`career_stats_play_style_category_description_${n}`)
                    }))))
                })),
                compareOptions: s.Ember.computed("tra", "currentCompareTarget", "showingChampionDetails", "champion.name", "currentSelectedPosition", (function() {
                    const e = this.get("tra"),
                        t = this.get("currentCompareTarget"),
                        a = [];
                    return s.Lodash.each(c.STATS_COMPARE_PLAYER_GROUP_OPTIONS, (n => {
                        a.push(s.Lodash.assign({
                            displayName: this._formatCompareOptionDisplayName(n, e),
                            selected: s.Lodash.get(t, "traKey") === n.traKey
                        }, n))
                    })), s.Ember.A(a)
                })),
                chooseComparisonOption: c.COMPARE_OPTION_OPEN_DIALOG,
                currentCompareTargetDisplay: s.Ember.computed("tra", "currentCompareTarget", "showingChampionDetails", "champion.name", "currentSelectedPosition", (function() {
                    const e = this.get("tra"),
                        t = this.get("currentCompareTarget");
                    return t ? this._formatCompareOptionDisplayName(t, e) : null
                })),
                champion: s.Ember.computed("careerStatsService.indexedChampions", "data.championId", (function() {
                    return this.get(`careerStatsService.indexedChampions.${this.get("data.championId")}`)
                })),
                indexedGameCounts: s.Ember.computed("data.games", (function() {
                    return s.Lodash.reduce(this.get("data.games"), ((e, t) => {
                        const {
                            championId: a
                        } = t, n = (0, i.inferPosition)(t), {
                            queueType: o
                        } = t, l = `${o}.${n}`;
                        s.Lodash.get(e, l) || s.Lodash.set(e, l, []);
                        const r = s.Lodash.get(e, l);
                        let c = r.find((e => e.championId === a));
                        return c || (c = {
                            championId: a,
                            gameCount: 0
                        }, r.push(c)), c.gameCount++, e
                    }), {})
                })),
                mostPlayedChampions: s.Ember.computed("tra", "indexedGameCounts", "currentSelectedPosition", "queueFilter.queueTypes.0", (function() {
                    const e = `${this.get("queueFilter.queueTypes.0")}.${this.get("currentSelectedPosition")}`,
                        t = this.get("tra"),
                        a = this.get(`indexedGameCounts.${e}`);
                    if (!a) return s.Ember.A();
                    const n = a.reduce(((e, t) => e += t.gameCount), 0),
                        o = s.Lodash.sortBy(a, "gameCount").reverse().map((e => (e.playRate = Math.floor(100 * e.gameCount / n), e.unlocked = e.gameCount >= c.MIN_GAMES_TO_UNLOCK_STATS, e.tooltip = e.unlocked ? t.get("career_stats_details_tooltip_click_to_see_champion") : t.formatString("career_stats_tooltip_champion_locked", {
                            number: c.MIN_GAMES_TO_UNLOCK_STATS - e.gameCount
                        }), e))).slice(0, c.MOST_PLAYED_SHOW_LIMIT);
                    return s.Ember.A(o)
                })),
                currentCategory: "combat",
                summonerRankTier: s.Ember.computed("data.rankedTiers", "queueFilter", (function() {
                    return (0, i.getValidRank)(s.Lodash.get(this.get("data.rankedTiers"), this.get("queueFilter.queueTypes.0")))
                })),
                statsTrends: s.Ember.computed("data.championId", "showingChampionDetails", "queueFilter", "timeFilter", "currentSelectedPosition", "data.games", (function() {
                    const e = this.get("data.games"),
                        t = this.get("data.championId"),
                        a = this.get("queueFilter"),
                        n = this.get("timeFilter"),
                        o = this.get("currentSelectedPosition"),
                        l = this.get("showingChampionDetails"),
                        r = this.get("rollingAverageWindowSize"),
                        c = this.get("smootheningRequiredSize"),
                        m = this.get("maxDataPoints"),
                        p = (0, i.filterGames)(e, {
                            championId: l && t,
                            position: o,
                            queueFilter: a,
                            timeFilter: n
                        }).reverse(),
                        d = (0, i.getRollingAverageWindowSize)(p, r, c, m),
                        u = (0, i.calculateRollingAverage)(p, d);
                    return s.Ember.run.next((() => {
                        !this || this.isDestroyed || this.isDestroying || (this.set("pinnedGame.index", null), this.set("currentRollingWindowSize", d), this.set("relevantGames", p))
                    })), u
                })),
                hasEnoughGames: s.Ember.computed("relevantGames.length", (function() {
                    return s.Lodash.gte(this.get("relevantGames.length"), c.MIN_GAMES_TO_UNLOCK_STATS)
                })),
                hasNotEnoughGames: s.Ember.computed.not("hasEnoughGames"),
                gamesPlayedDisplay: s.Ember.computed("relevantGames", "timeFilter", "tra", "currentSelectedSeason", "earliestSeason", (function() {
                    const e = this.get("relevantGames"),
                        t = this.get("timeFilter"),
                        a = s.Lodash.get(t, "includeAll"),
                        n = c.SEASON_2018_NUM === this.get("currentSelectedSeason");
                    return this.get("tra").formatString(a ? "career_stats_details_summary_games_played_season" + (n ? "_2018" : "") : "career_stats_details_summary_games_played_recent", {
                        number: s.Lodash.get(e, "length")
                    })
                })),
                winrateDisplay: s.Ember.computed("relevantGames", (function() {
                    const e = this.get("relevantGames"),
                        t = (0, i.getWinRateDisplay)(e && e.length > 0 ? (0, i.getWinrate)(e) : 0, 0);
                    return this.get("tra").formatString("career_stats_details_summary_win_rate", {
                        number: t
                    })
                })),
                percentilesForCurrentPlayer: s.Ember.computed("statsTrends", "statsAverages", "currentPercentiles", (function() {
                    const e = this.get("currentPercentiles") || c.DEFAULT_STATS_PERCENTILES,
                        t = this.get("statsTrends"),
                        a = this.get("statsAverages");
                    return s.Lodash.reduce(t, ((t, n, o) => {
                        const l = {
                            self: [],
                            other: []
                        };
                        return s.Lodash.each(n, ((t, n) => {
                            const o = e[n];
                            l.self.push({
                                axis: n,
                                value: s.Lodash.sortedIndex(o, t.average)
                            }), a && l.other.push({
                                axis: n,
                                value: s.Lodash.sortedIndex(o, a[n])
                            })
                        })), t[o] = [{
                            owner: "other",
                            axes: l.other
                        }, {
                            owner: "self",
                            axes: l.self
                        }], t
                    }), {})
                })),
                percentilesForCurrentCategory: s.Ember.computed("percentilesForCurrentPlayer", "currentCategory", (function() {
                    return s.Lodash.filter(s.Lodash.get(this.get("percentilesForCurrentPlayer"), this.get("currentCategory")), (e => e.axes.length > 0))
                })),
                currentStatsTrendDisplays: s.Ember.computed("statsTrends", "currentCategory", "statsAverages", "statsRanges", (function() {
                    const e = s.Lodash.get(this.get("statsTrends"), this.get("currentCategory")),
                        t = this.get("statsAverages"),
                        a = this.get("statsRanges");
                    return e && a ? s.Ember.A(s.Lodash.map(e, ((e, n) => s.Lodash.assign({
                        name: n,
                        compareValue: s.Lodash.get(t, n),
                        normalRange: s.Lodash.get(a, n)
                    }, e)))) : s.Ember.A()
                })),
                presetPositionChanged: s.Ember.on("init", s.Ember.observer("data.position", "showingChampionDetails", (function() {
                    const e = this.get("data.position");
                    e && this.get("showingChampionDetails") && this.send("selectPositionFilter", this.get("positionFilters").find((t => t.name === e)))
                }))),
                presetQueueFilterChanged: s.Ember.on("init", s.Ember.observer("data.queueFilter.traKey", "queueFilters", (function() {
                    const e = this.get("data.queueFilter.traKey"),
                        t = this.get("queueFilters").find((t => t.traKey === e));
                    this.send("selectQueueFilter", t)
                }))),
                championChanged: s.Ember.on("init", s.Ember.observer("data.championId", "careerStatsService", (function() {
                    const e = this.get("showingChampionDetails"),
                        t = this.get("data.championId"),
                        a = this.get(`data.championOverview.${t}`),
                        s = this.get("data.rankedTiers"),
                        n = this.get("careerStatsService");
                    e && a && s && n && this._retrieveChampionPercentiles(t, a, s, n).then((e => {
                        this.set("percentileMap", e)
                    }))
                }))),
                resetAveragesObserver: s.Ember.on("init", s.Ember.observer("showingChampionDetails", "currentSelectedPosition", "data.championId", "queueFilter.queueTypes.0", "currentSelectedSeason", "isSeasonSettingLoaded", (function() {
                    const e = this.get("showingChampionDetails"),
                        t = this.get("currentSelectedPosition"),
                        a = this.get("data.championId"),
                        s = this.get("queueFilter.queueTypes.0"),
                        n = this.get("currentSelectedSeason"),
                        o = this.get("isSeasonSettingLoaded");
                    if (t && (!e || a) && s && o && n) {
                        if (e) {
                            const e = this.get("positionFilters");
                            if (!e.find((e => e.name === t))) return void this.send("selectPositionFilter", e[0])
                        }
                        this._setDefaultComparison()
                    }
                }))),
                compareTargetChanged: s.Ember.on("init", s.Ember.observer("currentCompareTarget", (function() {
                    const e = this.get("currentCompareTarget");
                    e && this._setCompareAverages(e)
                }))),
                summonerSelfAveragesTooltip: s.Ember.computed("data.isThirdPersonView", "data.summoner.displayName", "data.summoner.gameName", "tra.career_stats_tooltip_your_own_averages", "tra.career_stats_tooltip_compared_against_averages", (function() {
                    const e = this.get("tra");
                    if (this.get("data.isThirdPersonView")) {
                        const {
                            playerName: t
                        } = this.get("_playerNames").formatPlayerName(this.get("data.summoner"));
                        return e.formatString("career_stats_tooltip_compared_against_averages", {
                            target: t
                        })
                    }
                    return e.get("career_stats_tooltip_your_own_averages")
                })),
                comparedAgainstAveragesTooltip: s.Ember.computed("tra.career_stats_tooltip_compared_against_averages", "currentCompareTargetDisplay", (function() {
                    return this.get("tra").formatString("career_stats_tooltip_compared_against_averages", {
                        target: this.get("currentCompareTargetDisplay")
                    })
                })),
                compareWithChampionAverage(e, t) {
                    const a = this.get("careerStatsService.indexedChampions");
                    this._closeComparisonSelectorModal();
                    const s = this.get("data.games"),
                        n = this.get("queueFilter"),
                        o = this.get("timeFilter"),
                        l = (0, i.filterGames)(s, {
                            championId: e,
                            position: t,
                            queueFilter: n,
                            timeFilter: o
                        });
                    this.set("currentCompareTarget", {
                        type: "ownChampion",
                        traKey: "career_stats_compare_own_champion",
                        name: a[e].name,
                        averages: this._calculateAveragesOnly(l)
                    })
                },
                compareWithSummonerGames(e, t) {
                    this._closeComparisonSelectorModal();
                    const {
                        displayName: a,
                        gameName: s,
                        tagLine: n,
                        summonerId: o
                    } = e;
                    return this.set("currentCompareTarget", {
                        type: "summoner",
                        summonerName: a,
                        gameName: s,
                        tagLine: n,
                        averages: (0, i.calculateCareerStatsFromRawTotals)(t)
                    }), this.get("careerStatsService").setRecentlyComparedSummoner(o)
                },
                compareWithSeason(e) {
                    this._closeComparisonSelectorModal(), this.set("currentCompareTarget", {
                        type: "season",
                        name: s.Lodash.get(e, "seasonName"),
                        averages: (0, i.calculateCareerStatsFromRawTotals)(e.stats)
                    })
                },
                compareWithChampionExpert(e, t, a) {
                    this._closeComparisonSelectorModal();
                    const {
                        summonerName: s,
                        displayName: o,
                        gameName: r,
                        tagLine: i,
                        summonerId: c,
                        statsSummary: m
                    } = e;
                    return l.default.sendEvent(n.TELEMETRY_EVENT_ID.CHAMPION_EXPERT_COMPARE, n.TELEMETRY_EVENT_SOURCE.STATS_MODAL, {
                        summonerName: s,
                        championId: t,
                        position: a
                    }), this.set("currentCompareTarget", {
                        type: "expert",
                        summonerName: o,
                        gameName: r,
                        tagLine: i,
                        summonerId: c,
                        championId: t,
                        position: a,
                        stats: m
                    }), this.get("careerStatsService").setRecentlyComparedSummoner(c)
                },
                compareWithPositionExpert(e, t) {
                    this._closeComparisonSelectorModal();
                    const {
                        summonerName: a,
                        displayName: s,
                        gameName: o,
                        tagLine: r,
                        summonerId: i,
                        statsSummary: c
                    } = e;
                    return l.default.sendEvent(n.TELEMETRY_EVENT_ID.POSITION_EXPERT_COMPARE, n.TELEMETRY_EVENT_SOURCE.STATS_MODAL, {
                        expert: a,
                        position: t
                    }), this.set("currentCompareTarget", {
                        type: "expert",
                        summonerName: s,
                        gameName: o,
                        tagLine: r,
                        summonerId: i,
                        position: t,
                        stats: c
                    }), this.get("careerStatsService").setRecentlyComparedSummoner(i)
                },
                showExpertProfile(e) {
                    this._closeComparisonSelectorModal(), s.CareerStatsApi.hideCareerStatsModal({});
                    const {
                        summonerName: t,
                        summonerId: a
                    } = e;
                    return l.default.sendEvent(n.TELEMETRY_EVENT_ID.SHOW_EXPERT_PROFILE, n.TELEMETRY_EVENT_SOURCE.STATS_MODAL, {
                        expert: t
                    }), s.ProfilesApi.showOverlay({
                        summonerId: a
                    })
                },
                statsIconStatusChanged: s.Ember.on("init", s.Ember.observer("fullReload", "isSeasonSettingLoaded", (function() {
                    if (!this.get("fullReload") && this.get("isSeasonSettingLoaded")) {
                        if (this.element) {
                            const e = this.element.querySelector(".stats-details-main"),
                                t = a => {
                                    "opacity" === a.propertyName && (this.set("showCategoryStatIcons", !0), e && e.removeEventListener("transitionend", t))
                                };
                            e && e.addEventListener("transitionend", t)
                        }
                    } else this.set("showCategoryStatIcons", !1)
                }))),
                _setCompareAverages(e) {
                    const t = this.get("showingChampionDetails"),
                        a = this.get("currentSelectedPosition"),
                        n = this.get("data.championId"),
                        o = this.get("queueFilter.queueTypes.0"),
                        l = this.get("careerStatsService"),
                        r = this.get("currentSelectedSeason");
                    if (t && !n || !a) return Promise.resolve();
                    let m;
                    switch (this.set("isLoadingAverages", !0), e.type) {
                        case "playerGroup": {
                            const s = this.get("queueFilter.isRanked") ? o : c.EXPERT_GAME_QUEUE;
                            m = t ? l.getChampionAverages(n, a, e.rank, s, r) : l.getPositionAverages(a, e.rank, s, r);
                            break
                        }
                        case "summoner":
                        case "ownChampion":
                        case "season":
                            m = Promise.resolve(e.averages);
                            break;
                        case "expert":
                            m = l.loadStatsSummaryFromSummonerId(e.summonerId, r, c.EXPERT_GAME_QUEUE, e.position, e.championId).then((e => null === e ? null : (0, i.calculateCareerStatsFromRawTotals)(e)));
                            break;
                        case "otherChampion":
                            m = l.getChampionAverages(e.championId, a, c.ALL_RANKS, o, r);
                            break;
                        default:
                            s.logger.warning("unknown compare target type: " + e.type), m = Promise.resolve()
                    }
                    return m.then((e => {
                        this.set("statsAverages", e), this.set("isLoadingAverages", !1)
                    }))
                },
                _formatCompareOptionDisplayName(e, t) {
                    const {
                        name: a,
                        summonerName: s,
                        gameName: n,
                        tagLine: o,
                        type: l,
                        traKey: r
                    } = e;
                    if (["summoner", "expert"].includes(l)) {
                        const {
                            playerNameFull: e
                        } = this.get("_playerNames").formatPlayerName({
                            gameName: n,
                            tagLine: o,
                            summonerName: s
                        });
                        return e
                    }
                    if ("playerGroup" === l) {
                        const e = this.get("currentSelectedPosition"),
                            a = t.get(`career_stats_position_name_${e}`),
                            s = this.get("showingChampionDetails"),
                            n = this.get("champion.name"),
                            o = s ? n : "";
                        return t.formatString(`career_stats_compare_option_${r}`, {
                            position: a,
                            champion: o
                        })
                    }
                    return "season" === l ? a : t.formatString(r, {
                        name: a
                    })
                },
                _calculateAveragesOnly: i.calculateStatsAveragesFromGames,
                _selectDropdownOption: function(e, t) {
                    if (!t || t.get("disabled")) return;
                    const a = this.get(e);
                    a && a.set("selected", !1), t && t.set("selected", !0), this.set(e, t)
                },
                _retrievePositionPercentiles(e, t, a, n, o) {
                    const l = s.Lodash.reduce(e.season.queues, ((e, o, l) => (s.Lodash.each(o.positions, ((s, o) => {
                        if (o === a) {
                            const a = (0, i.getValidRank)(t[l]);
                            e.push({
                                position: o,
                                queueType: l,
                                rankTier: a,
                                season: n
                            })
                        }
                    })), e)), []);
                    return l.length > 0 ? o.getPositionStatPercentiles(l) : Promise.resolve()
                },
                _retrieveChampionPercentiles(e, t, a, n) {
                    const o = this.get("currentSelectedSeason"),
                        l = [];
                    return s.Lodash.each(t, ((e, t) => {
                        s.Lodash.each(e, ((e, s) => {
                            if (e >= c.MIN_GAMES_TO_UNLOCK_STATS) {
                                const e = (0, i.getValidRank)(a[t]);
                                l.push({
                                    position: s,
                                    queueType: t,
                                    rankTier: e,
                                    season: o
                                })
                            }
                        }))
                    })), l.length > 0 ? n.getChampionStatPercentiles(e, l) : Promise.resolve()
                },
                _openComparisonSelectorModal() {
                    const e = s.Ember.Object.create({
                            championId: this.get("data.championId"),
                            position: this.get("currentSelectedPosition"),
                            queueFilter: this.get("queueFilter"),
                            summoner: this.get("data.summoner"),
                            summonerName: this.get("summonerName"),
                            gameName: this.get("gameName"),
                            tagLine: this.get("tagLine"),
                            indexedGameCounts: this.get("indexedGameCounts"),
                            fromChampionDetails: this.get("showingChampionDetails"),
                            seasonName: this.get("currentSeasonName"),
                            season: this.get("currentSelectedSeason"),
                            parentComponent: this
                        }),
                        t = s.componentFactory.create("StatsComparisonSelectorModalComponent", e),
                        a = s.ModalManager.add({
                            type: "DialogAlert",
                            data: {
                                contents: t.domNode,
                                dismissible: !0,
                                enterEnabled: !1
                            }
                        });
                    this.set("comparisonModal", a), this.set("comparisonModalComponent", t)
                },
                _closeComparisonSelectorModal() {
                    const e = this.get("comparisonModal"),
                        t = this.get("comparisonModalComponent");
                    t && (t.componentPromise.then((e => {
                        e.app.destroy()
                    })), e && s.ModalManager.remove(e), this.set("comparisonModal", null), this.set("comparisonModalComponent", null))
                },
                _setupSvgDefs() {
                    s.d3.select(this.element).select("svg.stats-modal-svg-defs").remove();
                    const e = s.d3.select(this.element).append("svg:svg").attr("width", 0).attr("height", 0).attr("class", "stats-modal-svg-defs").append("svg:defs");
                    s.Lodash.each(p, (t => {
                        e.append("svg:pattern").attr("id", "avg-tag-mid-" + t.key).attr("width", t.width).attr("height", t.height).attr("patternUnits", "userSpaceOnUse").append("svg:image").attr("xlink:href", t.image).attr("width", t.width).attr("height", t.height).attr("x", 0).attr("y", 0)
                    }))
                },
                _fullReloadStatsDetails() {
                    let e = this.get("data.summoner.puuid");
                    const t = this.get("currentSelectedSeason"),
                        a = this.get("careerStatsService");
                    this.set("queuePositionPercentiles", null);
                    const n = this.get("currentSeason");
                    return (e ? Promise.resolve() : a.loadSummonerById(this.get("data.summonerId")).then((t => {
                        this.set("data.summoner", t), e = t.puuid
                    }))).then((() => Promise.all([t === n ? a.loadCurrentSeasonStatsGames(e) : a.loadPreviousSeasonStatsGames(e, t), a.loadSummonerRankedTiers(e)]))).then((e => {
                        const o = e[0],
                            l = t === n ? e[1] : {};
                        if (s.Lodash.get(o, "error")) return this.set("serverError", !0), Promise.resolve();
                        this.set("serverError", !1), this.set("data.games", o.games), this.set("data.championOverview", o.season.champions), this.set("data.positionQueuesMap", s.Lodash.reduce(o.season.queues, ((e, t, a) => (s.Lodash.each(t.positions, ((t, n) => {
                            const o = `${n}.${a}`;
                            s.Lodash.set(e, o, s.Lodash.add(s.Lodash.get(e, o), t.gamePlayed))
                        })), e)), {})), this.set("data.rankedTiers", l);
                        const r = this.get("currentSelectedPosition"),
                            i = this.get("data.championId");
                        return this.get("showingPositionDetails") ? this._retrievePositionPercentiles(o, l, r, t, a) : this._retrieveChampionPercentiles(i, o.season.champions[i], l, a)
                    })).then((e => {
                        this.set("percentileMap", e), this.set("loadedSeason", t)
                    }))
                },
                _setDefaultComparison() {
                    this.set("currentCompareTarget", null);
                    const e = this.get("compareOptions");
                    let t = e.find((e => e.rank === this.get("summonerRankTier") && !s.Lodash.get(e, "disabled")));
                    t || (t = e[0]), s.Ember.run.next((() => {
                        !this || this.isDestroyed || this.isDestroying || this.send("selectCompareOption", t)
                    }))
                },
                _selectDefaultTimeFilter() {
                    const e = this.get("currentSeason"),
                        t = this.get("data.season"),
                        a = this.get("timeFilters").find((a => e === t ? a.key === this.get("defaultTimeFilterForCurrentSeason") : a.season === t));
                    this.send("selectTimeFilter", a)
                },
                init() {
                    this._super(...arguments), this._playerNames = s.playerNames
                },
                didInsertElement: function() {
                    this._super(...arguments);
                    const e = s.emberApplicationFactory.getRootDOMNode(this.element);
                    this.set("rootDOMNode", e), this.set("screenBumpedListener", (() => {
                        this.toggleProperty("screenBumped")
                    })), this.set("screenReleasedListener", (() => {
                        this.toggleProperty("screenReleased")
                    })), e.addEventListener("screenBumped", this.get("screenBumpedListener")), e.addEventListener("screenReleased", this.get("screenReleasedListener")), this._setupSvgDefs()
                },
                willDestroyElement: function() {
                    this._super(...arguments);
                    const e = this.get("rootDOMNode");
                    e.removeEventListener("screenBumped", this.get("screenBumpedListener")), e.removeEventListener("screenReleased", this.get("screenReleasedListener"))
                },
                _screenReleaseCleanupObserver: s.Ember.observer("screenReleased", (function() {
                    this.set("data", null), this.set("positionFilter", null), this.set("percentileMap", null), this.set("statsAverages", null), this.set("pinnedGame", s.Ember.Object.create({})), this.set("pinnedMatchSummary", null), this.set("errorLoadingMatchSummary", !1), this.set("currentCategory", "combat");
                    const e = this.get("timeFilter");
                    e && e.set("selected", !1), this.set("timeFilter", null), this.set("fullReload", !1), this.set("loadedSeason", null), this._closeComparisonSelectorModal()
                })),
                actions: {
                    switchToChampion(e) {
                        this.get("showingPositionDetails") && e.unlocked && (this.set("data.championId", e.championId), this.set("screen", "champion"))
                    },
                    selectCategory: function(e) {
                        l.default.addUserBehavior(n.USER_ACTIVITIES.CATEGORY_CHANGE, e), this.set("currentCategory", e)
                    },
                    selectQueueFilter: function(e) {
                        l.default.addUserBehavior(n.USER_ACTIVITIES.FILTER_BY_QUEUE_CHANGE, s.Lodash.get(e, "queueTypes[0]")), this._selectDropdownOption("queueFilter", e)
                    },
                    selectTimeFilter: function(e) {
                        const t = s.Lodash.get(e, "season"),
                            a = this.get("loadedSeason");
                        l.default.addUserBehavior(n.USER_ACTIVITIES.FILTER_BY_TIME_CHANGE, s.Lodash.get(e, "key")), this._selectDropdownOption("timeFilter", e), t !== a && this.set("fullReload", !0)
                    },
                    selectPositionFilter: function(e) {
                        l.default.addUserBehavior(n.USER_ACTIVITIES.FILTER_BY_POSITION_CHANGE, s.Lodash.get(e, "name")), this._selectDropdownOption("positionFilter", e)
                    },
                    selectCompareOption: function(e, t) {
                        if (t && o.SFX.gridClick.play(), l.default.addUserBehavior(n.USER_ACTIVITIES.COMPARE_OPTION_CHANGE, s.Lodash.get(e, "rank")), s.Lodash.get(e, "openDialog")) return this._openComparisonSelectorModal();
                        e.selected || this.set("currentCompareTarget", e)
                    },
                    compareAgainstWinRateBasedChampion(e) {
                        l.default.sendEvent(n.TELEMETRY_EVENT_ID.CHAMPION_WINRATE_COMPARE, n.TELEMETRY_EVENT_SOURCE.STATS_MODAL, {
                            championId: e
                        });
                        const t = this.get("careerStatsService");
                        this.set("currentCompareTarget", {
                            type: "otherChampion",
                            traKey: "career_stats_compare_other_champion_all_players",
                            name: t.get("indexedChampions")[e].name,
                            championId: e
                        })
                    },
                    showMatchHistory(e, t) {
                        (0, s.getProvider)().getOptional("rcp-fe-lol-match-history").then((a => {
                            a.displayMatchDetails({
                                gameId: e,
                                summonerId: t,
                                defaultSection: "scoreboard",
                                sections: ["overview", "scoreboard", "stats", "graph", "runes"],
                                dataSource: "legs",
                                closeModalCallback: e => {
                                    this.isDestroying || this.isDestroyed || this.element.dispatchEvent(new Event(e, {
                                        bubbles: !0
                                    }))
                                }
                            })
                        }), (e => s.logger.error("Provider getOptional failure", e)))
                    }
                }
            });
            t.default = d
        }, (e, t) => {
            "use strict";

            function a(e) {
                const t = new Set;
                for (const a in e) t.add(e[a]);
                return t
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.USER_ACTIVITIES_SET = t.USER_ACTIVITIES = t.TELEMETRY_EVENT_SOURCE_SET = t.TELEMETRY_EVENT_SOURCE = t.TELEMETRY_EVENT_NAME = t.TELEMETRY_EVENT_ID_SET = t.TELEMETRY_EVENT_ID = void 0;
            t.TELEMETRY_EVENT_NAME = "career_stats__career_stats_event";
            const s = {
                STATS_ENTER: "stats_enter",
                STATS_EXIT: "stats_exit",
                STATS_SHOW_FIRST_PERSON: "stats_show_first_person",
                STATS_SHOW_THIRD_PERSON: "stats_show_third_person",
                STATS_HIDE: "stats_hide",
                DATA_LOADED: "data_loaded",
                POSITION_GRADES_CALCULATED: "position_grades_calculated",
                POSITION_EXPERT_COMPARE: "position_expert_compare",
                CHAMPION_EXPERT_COMPARE: "champion_expert_compare",
                CHAMPION_WINRATE_COMPARE: "champion_winrate_compare",
                SUMMONER_COMPARE: "summoner_compare",
                CHAMPION_COMPARE: "champion_compare",
                SHOW_EXPERT_PROFILE: "view_expert_profile"
            };
            t.TELEMETRY_EVENT_ID = s;
            const n = a(s);
            t.TELEMETRY_EVENT_ID_SET = n;
            const o = {
                STATS_OVERVIEW: "stats_overview",
                STATS_MODAL: "stats_modal",
                COMPARISON_SELECTOR: "comparison_selector"
            };
            t.TELEMETRY_EVENT_SOURCE = o;
            const l = a(o);
            t.TELEMETRY_EVENT_SOURCE_SET = l;
            const r = {
                CHAMPION_ICON_HOVER: "champion_icon_hover",
                CHAMPION_ICON_CLICK: "champion_icon_click",
                POSITION_COLLAPSE_STATE_TOGGLE: "position_collapse_state_toggle",
                POSITION_DETAIL_BUTTON_CLICK: "position_detail_button_click",
                GRAPH_MOUSE_ENTER: "graph_mouse_enter",
                GRAPH_MOUSE_CLICK: "graph_mouse_click",
                FILTER_BY_QUEUE_CHANGE: "filter_by_queue_change",
                FILTER_BY_TIME_CHANGE: "filter_by_time_change",
                FILTER_BY_POSITION_CHANGE: "filter_by_position_change",
                SORT_BY_CHANGE: "sort_by_change",
                COMPARE_OPTION_CHANGE: "compare_option_change",
                CATEGORY_CHANGE: "category_change",
                TAB_CHANGE: "tab_change"
            };
            t.USER_ACTIVITIES = r;
            const i = a(r);
            t.USER_ACTIVITIES_SET = i
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.SFX = void 0;
            const s = a(1).Audio.getChannel("sfx-ui");

            function n(e) {
                return s.createSound(e, {
                    allowConcurrency: !1
                })
            }
            const o = {
                gridClick: n("/fe/lol-career-stats/audio/sfx-uikit-grid-click.ogg"),
                gridHover: n("/fe/lol-career-stats/audio/sfx-uikit-grid-hover.ogg")
            };
            t.SFX = o
        }, (e, t, a) => {
            "use strict";
            var s = a(1),
                n = a(6);
            const o = `/v1/events/${n.TELEMETRY_EVENT_NAME}`;
            const l = new class {
                constructor() {
                    this._sessionStartTimes = [], this._userActivities = {}
                }
                startTelemetrySession(e) {
                    this._sessionStartTimes.push(Date.now()), 1 === this._getActiveSessionCount() && (this._userActivities = {}, this.sendEvent(n.TELEMETRY_EVENT_ID.STATS_ENTER, n.TELEMETRY_EVENT_SOURCE.STATS_OVERVIEW)), this.sendEvent(e ? n.TELEMETRY_EVENT_ID.STATS_SHOW_THIRD_PERSON : n.TELEMETRY_EVENT_ID.STATS_SHOW_FIRST_PERSON, n.TELEMETRY_EVENT_SOURCE.STATS_OVERVIEW)
                }
                endTelemetrySession() {
                    if (this.sendEvent(n.TELEMETRY_EVENT_ID.STATS_HIDE, n.TELEMETRY_EVENT_SOURCE.STATS_OVERVIEW), 1 === this._getActiveSessionCount()) {
                        const e = this._getSessionTimestamp(),
                            t = Object.assign({
                                sessionLength: e
                            }, this._userActivities);
                        this.sendEvent(n.TELEMETRY_EVENT_ID.STATS_EXIT, n.TELEMETRY_EVENT_SOURCE.STATS_OVERVIEW, t), this._userActivities = {}
                    }
                    this._sessionStartTimes.pop(), this._getActiveSessionCount() < 0 && s.logger.error(`Invalid telemetry active session count ${this._getActiveSessionCount()}`)
                }
                sendEvent(e, t, a) {
                    if (!n.TELEMETRY_EVENT_ID_SET.has(e)) return s.logger.warning(`Invalid telemetry event id ${e}`), Promise.reject(`Invalid telemetry event id ${e}`);
                    if (!n.TELEMETRY_EVENT_SOURCE_SET.has(t)) return s.logger.warning(`Invalid telemetry event source ${t}`), Promise.reject(`Invalid telemetry event source ${t}`);
                    try {
                        this._dataBinding || (this._dataBinding = (0, s.dataBinding)("/telemetry", (0, s.getProvider)().getSocket()));
                        const n = Object.assign({
                            id: e,
                            source: t,
                            sessionId: this._sessionStartTimes[0],
                            sessionTimestamp: this._getSessionTimestamp()
                        }, a);
                        this._dataBinding.post(o, n)
                    } catch (e) {
                        s.logger.error(`Error sending telemetry ${e}`)
                    }
                }
                addUserBehavior(e, t) {
                    if (!n.USER_ACTIVITIES_SET.has(e)) return void s.logger.warning(`Invalid telemetry user activity ${e}`);
                    if (t === Object(t)) return void s.logger.warning("Only primitive values allowed in addUserBehavior");
                    this._userActivities.hasOwnProperty(e) || (this._userActivities[e] = {
                        count: 0
                    });
                    const a = this._userActivities[e];
                    a.count++, null != t && (a.hasOwnProperty(t) ? a[t]++ : a[t] = 1)
                }
                _getActiveSessionCount() {
                    return this._sessionStartTimes.length
                }
                _getSessionTimestamp() {
                    this._sessionStartTimes && 0 !== this._sessionStartTimes.length || s.logger.error("Telemetry session has not been started");
                    const e = this._sessionStartTimes[0];
                    return Date.now() - e
                }
            };
            e.exports = l
        }, (e, t, a) => {
            const s = a(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "ZOHOUy88",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\career-stats-modal-root-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\career-stats-modal-root-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\career-stats-modal-root-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","stats-modal-loading-spinner"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["career-stats-details-backdrop ",["helper",["if"],[["get",["showingChampionDetails"]],"dark"],null]]]],["flush-element"],["text","\\n  "],["append",["helper",["uikit-background-switcher"],null,[["src"],[["get",["backdropImgSrc"]]]]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","stats-details-main"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","stats-details-top"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","stats-details-identity"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","stats-details-icon"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["champion-icon ",["helper",["if"],[["get",["showingPositionDetails"]],"hidden"],null]]]],["flush-element"],["text","\\n          "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["champion","squarePortraitPath"]]]]],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["position-icon ",["unknown",["data","position"]]," ",["helper",["if"],[["get",["showingChampionDetails"]],"hidden"],null]]]],["flush-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n\\n      "],["open-element","div",[]],["static-attr","class","stats-detail-titles"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","stats-detail-title primary"],["flush-element"],["text","\\n          "],["append",["helper",["player-name"],null,[["format","puuid","gameName","tagLine","summonerName"],["short",["get",["puuid"]],["get",["gameName"]],["get",["tagLine"]],["get",["summonerName"]]]]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","stats-detail-title secondary"],["flush-element"],["text","\\n          "],["append",["unknown",["secondaryTitleDisplay"]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","summary season"],["flush-element"],["append",["unknown",["currentSeasonName"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","summary games-played"],["flush-element"],["append",["unknown",["gamesPlayedDisplay"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","summary win-rate"],["flush-element"],["append",["unknown",["winrateDisplay"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["overall-grade-display grade-",["unknown",["letterOnlyGrade"]]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","grade-badge"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["right","system"]],22],["text","      "],["open-element","div",[]],["static-attr","class","grade"],["flush-element"],["append",["unknown",["overallGradeDisplay"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","stats-detail-filters"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-framed-dropdown",[]],["static-attr","class","dropdown-filter queue-filter"],["static-attr","direction","downward"],["dynamic-attr","disabled",["unknown",["hasNotEnoughGames"]],null],["flush-element"],["text","\\n"],["block",["each"],[["get",["queueFilters"]]],null,21],["text","    "],["close-element"],["text","\\n\\n    "],["open-element","lol-uikit-framed-dropdown",[]],["static-attr","class","dropdown-filter time-filter"],["static-attr","direction","downward"],["flush-element"],["text","\\n"],["block",["each"],[["get",["timeFilters"]]],null,18],["text","    "],["close-element"],["text","\\n\\n    "],["open-element","lol-uikit-framed-dropdown",[]],["dynamic-attr","class",["concat",["dropdown-filter position-filter ",["helper",["if"],[["get",["showingPositionDetails"]],"hidden"],null]]]],["static-attr","direction","downward"],["dynamic-attr","disabled",["unknown",["hasNotEnoughGames"]],null],["flush-element"],["text","\\n"],["block",["each"],[["get",["positionFilters"]]],null,17],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["category-grade-headers ",["helper",["unless"],[["get",["hasEnoughGames"]],"hidden"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","category-grade-tabs"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-navigation-bar",[]],["static-attr","class","category-grade-displays"],["static-attr","type","tabbed"],["static-attr","direction","right"],["flush-element"],["text","\\n"],["block",["each"],[["get",["categoryGradeDisplays"]]],null,16],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","compare-option-buttons"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","current-compare-display"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","label"],["flush-element"],["append",["unknown",["tra","career_stats_compare_current_target_label"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["target ",["helper",["if"],[["get",["isLoadingAverages"]],"hidden"],null]]]],["flush-element"],["append",["unknown",["currentCompareTargetDisplay"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["loading-spinner ",["helper",["unless"],[["get",["isLoadingAverages"]],"hidden"],null]]]],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["no-data-warning ",["helper",["if"],[["get",["isLoadingAverages"]],"hidden"],null]," ",["helper",["if"],[["get",["statsAverages"]],"hidden"],null]]]],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],14],["text","        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"],["block",["each"],[["get",["compareOptions"]]],null,13],["text","      "],["open-element","lol-uikit-close-button",[]],["static-attr","button-type","compare"],["static-attr","class","choose-comparison-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectCompareOption",["get",["chooseComparisonOption"]],false],null],null],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],11],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["stats-details-container ",["helper",["unless"],[["get",["hasEnoughGames"]],"hidden"],null]," ",["helper",["if"],[["get",["showCategoryStatIcons"]],"show-category-stat-icons"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","category-trend-graphs"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","grid-frames"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","grid-frame vertical left"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","grid-frame vertical right"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","grid-frame horizontal"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["append",["helper",["stats-category-summary-graph"],null,[["data"],[["get",["percentilesForCurrentCategory"]]]]],false],["text","\\n"],["block",["each"],[["get",["currentStatsTrendDisplays"]]],null,10],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","sidebar-frame"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","pinned-match-display"],["flush-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["title ",["helper",["unless"],[["get",["pinnedMatchSummary"]],"transparent"],null]]]],["flush-element"],["append",["unknown",["tra","career_stats_pin_match_title"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["errorLoadingMatchSummary"]]],null,9,8],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["stats-empty-message ",["helper",["if"],[["get",["hasEnoughGames"]],"hidden"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","stats-empty-icon"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","stats-empty-msgs"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","career_stats_details_not_enough_games"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","instructions"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","instruction line-1"],["flush-element"],["append",["unknown",["tra","career_stats_pin_match_instruction_line_1"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","instruction line-2"],["flush-element"],["append",["unknown",["tra","career_stats_pin_match_instruction_line_2"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "]],"locals":[]},{"statements":[["text","                  "],["append",["unknown",["tra","career_stats_pin_match_result_defeat"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["append",["unknown",["tra","career_stats_pin_match_result_victory"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["append",["unknown",["tra","career_stats_pin_match_result_defeat"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["append",["unknown",["tra","career_stats_pin_match_result_victory"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","match-summary player"],["flush-element"],["text","\\n            "],["open-element","div",[]],["dynamic-attr","class",["concat",["champion-display champion-",["unknown",["pinnedMatchSummary","player","championId"]]," player"]]],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","champion-icon"],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","class","icon"],["dynamic-attr","src",["concat",[["unknown",["pinnedMatchSummary","player","championIconPath"]]]]],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","champion-level"],["flush-element"],["append",["unknown",["pinnedMatchSummary","player","level"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","match-info"],["flush-element"],["text","\\n              "],["open-element","div",[]],["dynamic-attr","class",["concat",["match-result ",["helper",["if"],[["get",["pinnedMatchSummary","player","victory"]],"victory"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["pinnedMatchSummary","player","victory"]]],null,4,3],["text","              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","kda player"],["flush-element"],["append",["unknown",["pinnedMatchSummary","player","kda"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","gold-comparison"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","gold player"],["flush-element"],["append",["unknown",["pinnedMatchSummary","player","gold"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","vs"],["flush-element"],["append",["unknown",["tra","career_stats_pin_match_gold_versus"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","gold opponent"],["flush-element"],["append",["unknown",["pinnedMatchSummary","opponent","gold"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","match-summary opponent"],["flush-element"],["text","\\n            "],["open-element","div",[]],["dynamic-attr","class",["concat",["champion-display champion-",["unknown",["pinnedMatchSummary","opponent","championId"]]," opponent"]]],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","champion-icon"],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","class","icon"],["dynamic-attr","src",["concat",[["unknown",["pinnedMatchSummary","opponent","championIconPath"]]]]],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","champion-level"],["flush-element"],["append",["unknown",["pinnedMatchSummary","opponent","level"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","match-info"],["flush-element"],["text","\\n              "],["open-element","div",[]],["dynamic-attr","class",["concat",["match-result ",["helper",["if"],[["get",["pinnedMatchSummary","opponent","victory"]],"victory"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["pinnedMatchSummary","opponent","victory"]]],null,2,1],["text","              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","kda opponent"],["flush-element"],["append",["unknown",["pinnedMatchSummary","opponent","kda"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showMatchHistory",["get",["pinnedMatchSummary","gameId"]],["get",["pinnedMatchSummary","playerSummonerId"]]],null],null],["static-attr","class","show-full-history-button"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","career_stats_pin_match_check_full_match_history"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["pinnedMatchSummary"]]],null,5,0]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","spinner"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isLoadingMatchSummary"]]],null,7,6]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","error"],["flush-element"],["append",["unknown",["tra","career_stats_pin_match_load_error"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["stats-trend-graph"],null,[["data","pinnedGame","summonerSelfAveragesTooltip","comparedAgainstAveragesTooltip"],[["get",["display"]],["get",["pinnedGame"]],["get",["summonerSelfAveragesTooltip"]],["get",["comparedAgainstAveragesTooltip"]]]]],false],["text","\\n"]],"locals":["display"]},{"statements":[["text","          "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n            "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","career_stats_compare_option_choose_comparison"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n              "],["open-element","p",[]],["flush-element"],["append",["unknown",["option","displayName"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["concat",["option-button ",["helper",["if"],[["get",["option","selected"]],"selected"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectCompareOption",["get",["option"]],true],null],null],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],12],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["option-icon ",["unknown",["option","traKey"]]]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","option-shadow"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","option-selected"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["option"]},{"statements":[["text","            "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n              "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","career_stats_tooltip_compare_against_no_data"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","career-stats-stat-tooltip"],["flush-element"],["text","\\n                  "],["open-element","p",[]],["flush-element"],["append",["unknown",["display","tooltip"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","lol-uikit-navigation-item",[]],["dynamic-attr","class",["concat",["category-grade-display ",["unknown",["display","category"]]]]],["dynamic-attr","active",["unknown",["display","selected"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectCategory",["get",["display","category"]]],null],null],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["right","system"]],15],["text","            "],["open-element","div",[]],["static-attr","class","grade"],["flush-element"],["append",["unknown",["display","grade"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","description"],["flush-element"],["append",["unknown",["display","description"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":["display"]},{"statements":[["text","        "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","selected",["unknown",["filter","selected"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectPositionFilter",["get",["filter"]]],null],null],["flush-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["dropdown-filter-text position-",["unknown",["filter","name"]]]]],["flush-element"],["append",["unknown",["filter","displayName"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["filter"]},{"statements":[["text","        "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","selected",["unknown",["filter","selected"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectTimeFilter",["get",["filter"]]],null],null],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","dropdown-filter-text"],["flush-element"],["append",["unknown",["filter","displayName"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["filter"]},{"statements":[["text","              "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n                "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","career_stats_tooltip_queue_locked"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["right","system"]],19]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","selected",["unknown",["filter","selected"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectQueueFilter",["get",["filter"]]],null],null],["dynamic-attr","disabled",["unknown",["filter","disabled"]],null],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","dropdown-filter-text"],["flush-element"],["append",["unknown",["filter","displayName"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["filter","disabled"]]],null,20],["text","        "],["close-element"],["text","\\n"]],"locals":["filter"]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["overallGradeTooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, a) => {
            "use strict";
            a.r(t)
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.mergeStatsResult = t.inferPosition = t.getWinrate = t.getWinRateDisplay = t.getValidRank = t.getRollingAverageWindowSize = t.getGradeFromPercentile = t.filterGames = t.convertPercentilesToQueuePositionMap = t.calculateStatsTrends = t.calculateStatsAveragesFromGames = t.calculateRollingAverage = t.calculateGradesAndBestPlaystyle = t.calculateCategoryPercentilesWithStatsTrends = t.calculateCategoryPercentiles = t.calculateCareerStatsFromRawTotals = t.abvNumberWithSuffix = void 0;
            var s = a(1),
                n = a(12);
            const o = a(13),
                l = ["", "kilo", "mega", "giga", "tera", "peta", "exa"];
            t.abvNumberWithSuffix = function(e) {
                const t = Math.log10(e) / 3 | 0;
                if (0 === t) return {
                    num: e
                };
                const a = l[t];
                return {
                    num: (e / Math.pow(10, 3 * t)).toFixed(1),
                    suffix: a
                }
            };
            const r = function(e) {
                const t = e.stats[n.CAREER_STATS_KEY].position;
                return s.Lodash.isNumber(t) ? n.POSITION_ID_MAP[t] : "DUO_SUPPORT" === e.role ? "SUPPORT" : e.lane
            };
            t.inferPosition = r;
            t.filterGames = function(e, t) {
                let a, n = e;
                return t.championName ? a = s.Lodash.filter(t.championSummary, (e => o.filter(t.championName, e.searchTerms).length > 0)).map((e => e.id)) : t.championId && (a = [t.championId]), n = s.Lodash.filter(n, (e => !(t.queueFilter && !t.queueFilter.queueTypes.includes(e.queueType)) && (!(a && !a.includes(e.championId)) && (!t.position || t.position === r(e))))), t.timeFilter && (t.timeFilter.includeAll || t.timeFilter.length && t.timeFilter.length >= 0) && (n = t.timeFilter.includeAll ? n : n.slice(0, t.timeFilter.length)), n
            };
            const i = function(e, t) {
                const a = e.timePlayed / 6e4,
                    o = a / 60,
                    l = {
                        kda: (e.kills + e.assists) / s.Lodash.max([1, e.deaths]),
                        killParticipation: (e.kills + e.assists) / s.Lodash.max([1, e.teamKills]),
                        utilityScore: e.ccScore / o / 1.5 + e.healsOnTeammates / a / 3 + e.damageShieldedOnTeammates / a / 1.5,
                        damagePerDeath: e.damage / s.Lodash.max([1, e.deaths]),
                        damageShare: e.damage / s.Lodash.max([1, e.teamDamage]),
                        damagePerGold: e.damage / s.Lodash.max([1, e.goldEarned]),
                        goldDiffAtLaningEnd: e.goldDiffAtLaningEnd / e.gamePlayed,
                        csDiffAtLaningEnd: e.csDiffAtLaningEnd / e.gamePlayed,
                        csPerMinute: e.csScore / a,
                        objectiveControlRatio: e.objectiveTakenInvolved / s.Lodash.max([1, e.teamObjectivesTaken]),
                        visionScorePerHour: e.visionScore / o,
                        roamDominanceScore: e.roamDominanceScore / e.gamePlayed,
                        killConversionRatio: e.convertedKillAndAssists / s.Lodash.max([1, e.kills + e.assists])
                    };
                if (!t) return l;
                const r = {};
                return s.Lodash.each(l, ((e, t) => {
                    s.Lodash.set(r, `${n.STAT_TO_CATEGORY_MAP[t]}.${t}`, e)
                })), r
            };
            t.calculateCareerStatsFromRawTotals = i;
            t.calculateStatsAveragesFromGames = function(e) {
                const t = e.reduce(((e, t) => (s.Lodash.each(t.stats[n.CAREER_STATS_KEY], ((t, a) => {
                    e[a] = s.Lodash.add(e[a], t)
                })), e)), {});
                return i(t, !1)
            };
            t.calculateCategoryPercentiles = function(e, t) {
                const a = {};
                return s.Lodash.each(n.PLAY_STYLES, (e => a[e] = [])), s.Lodash.each(t, ((t, o) => {
                    n.STAT_TO_CATEGORY_MAP[o] && a[n.STAT_TO_CATEGORY_MAP[o]].push(s.Lodash.sortedIndex(t, e[o]))
                })), s.Lodash.map(a, ((e, t) => ({
                    category: t,
                    percentile: e && e.length ? e.reduce(((e, t) => e + t), 0) / e.length : 0
                })))
            };
            t.calculateCategoryPercentilesWithStatsTrends = function(e, t) {
                return s.Lodash.map(e, ((e, a) => ({
                    category: a,
                    percentile: s.Lodash.reduce(e, ((e, a, n) => e + (t[n] ? s.Lodash.sortedIndex(t[n], a.average) : 0)), 0) / s.Lodash.keys(e).length
                })))
            };
            const c = function(e) {
                return "number" != typeof e || isNaN(e) ? n.UNAVAILABLE_GRADE : n.PERFORMANCE_GRADES[s.Lodash.max([0, s.Lodash.sortedIndex(n.GRADE_MIN_PERCENTILES, e) - 1])]
            };
            t.getGradeFromPercentile = c;
            t.calculateGradesAndBestPlaystyle = function(e) {
                let t, a = 0,
                    o = -1;
                const l = {
                    categoryGrades: {}
                };
                return s.Lodash.each(e, (e => {
                    a += e.percentile, e.percentile > o && (o = e.percentile, t = e.category), l.categoryGrades[e.category] = c(e.percentile)
                })), l.bestPlaystyle = t, l.overallGrade = e.length ? c(a / e.length) : n.UNAVAILABLE_GRADE, l
            };
            t.convertPercentilesToQueuePositionMap = function(e) {
                const t = {};
                return s.Lodash.each(e, (e => {
                    t[e.queueType] || (t[e.queueType] = {}), t[e.queueType][e.position] = e.stats
                })), t
            };
            t.getWinRateDisplay = function(e, t = 1) {
                return (100 * e).toFixed(t)
            };
            t.getValidRank = function(e) {
                return e && e !== n.TIER_NAME_NONE ? e : n.ALL_RANKS
            };
            const m = function(e, t) {
                s.Lodash.each(t, ((t, a) => {
                    s.Lodash.each(t, ((t, n) => {
                        const o = `${a}.${n}.stats`;
                        s.Lodash.get(e, o) || s.Lodash.set(e, o, []), s.Lodash.get(e, o).push(t)
                    }))
                }))
            };
            t.mergeStatsResult = m;
            const p = function(e, t) {
                const a = {},
                    o = {};
                for (let l = 0; l <= e.length - t; l++) {
                    const r = {};
                    for (let a = l; a < l + t; a++) s.Lodash.each(e[a].stats[n.CAREER_STATS_KEY], ((e, t) => {
                        r[t] = s.Lodash.add(r[t], e)
                    }));
                    s.Lodash.each(e[l].stats[n.CAREER_STATS_KEY], ((e, t) => {
                        o[t] = s.Lodash.add(o[t], e)
                    }));
                    const c = i(r, !0);
                    m(a, c)
                }
                for (let a = e.length - t + 1; a < e.length; a++) s.Lodash.each(e[a].stats[n.CAREER_STATS_KEY], ((e, t) => {
                    o[t] = s.Lodash.add(o[t], e)
                }));
                const l = i(o, !0);
                return s.Lodash.each(a, ((e, t) => {
                    s.Lodash.each(e, ((a, s) => {
                        e[s].stats = a.stats, e[s].average = l[t][s]
                    }))
                })), a
            };
            t.calculateRollingAverage = p;
            const d = function(e, t = n.ROLLING_AVERAGE_WINDOW_SIZE, a = n.SMOOTHENING_REQUIRED_SIZE, o = n.MAX_DATA_POINTS) {
                let l = e.length > a ? t : 1;
                const r = s.Lodash.max([0, e.length - o + 1]);
                return r > l && (l = r), l
            };
            t.getRollingAverageWindowSize = d;
            t.calculateStatsTrends = function(e) {
                e.reverse();
                const t = d(e);
                return p(e, t)
            };
            t.getWinrate = function(e) {
                return e.length > 0 ? s.Lodash.filter(e, (e => e.stats[n.CAREER_STATS_KEY].victory)).length / e.length : 0
            }
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.UNAVAILABLE_GRADE = t.TIME_FILTERS = t.TIER_NAME_NONE = t.STAT_TO_CATEGORY_MAP = t.STATS_FORMAT_MAPPING = t.STATS_COMPARE_PLAYER_GROUP_OPTIONS = t.SORT_OPTIONS = t.SMOOTHENING_REQUIRED_SIZE = t.SEASON_2018_NUM = t.ROLLING_AVERAGE_WINDOW_SIZE = t.RANKED_QUEUE_TYPE_MAPPINGS = t.QUEUE_FILTERS = t.POSITION_ID_MAP = t.POSITIONS = t.PLAY_STYLES = t.PERFORMANCE_GRADES = t.OVERVIEW_CHAMPIONS_PER_ROW = t.NUM_OF_MATCH_UPS = t.NO_DIVISION_TIERS = t.NORMAL_STAT_RANGE_MIN_PERCENTILE = t.NORMAL_STAT_RANGE_MAX_PERCENTILE = t.NORMAL_GAMES_QUEUE_TYPES = t.MOST_PLAYED_SHOW_LIMIT = t.MIN_GAMES_TO_UNLOCK_STATS = t.MILLIS_IN_A_DAY = t.MILLIS_IN_AN_HOUR = t.MAX_RECENTLY_PLAYED_WITH_SUMMONERS = t.MAX_RECENTLY_COMPARED_SUMMONERS = t.MAX_GRADE_VALUE = t.MAX_DATA_POINTS = t.LEAGUES_QUEUE_TYPE_MAP = t.INVALID_EARLIEST_SEASON = t.INVALID_CURRENT_SEASON = t.GRADE_MIN_PERCENTILES = t.EXPERT_GAME_QUEUE = t.DEFAULT_STATS_RANGES = t.DEFAULT_STATS_PERCENTILES = t.DEFAULT_PREV_SEASON_YEAR_COUNT = t.COMPARE_OPTION_OPEN_DIALOG = t.COMPARABLE_RANK_TIER_FORWARD = t.CHAMPION_ID_FOR_POSITION_STATS = t.CATEGORY_TO_STATS_MAP = t.CAREER_STATS_KEY = t.ALL_RANKS = void 0;
            t.MILLIS_IN_A_DAY = 864e5;
            t.MILLIS_IN_AN_HOUR = 36e5;
            const a = ["quickplay5", "draft5"];
            t.NORMAL_GAMES_QUEUE_TYPES = a;
            const s = [{
                queueTypes: ["rank5solo"],
                traKey: "rank5solo",
                isRanked: !0
            }, {
                queueTypes: ["rank5flex"],
                traKey: "rank5flex",
                isRanked: !0
            }, {
                queueTypes: [a[0]],
                traKey: a[0],
                isRanked: !1
            }, {
                queueTypes: [a[1]],
                traKey: a[1],
                isRanked: !1
            }];
            t.QUEUE_FILTERS = s;
            t.TIME_FILTERS = [{
                key: "this_season",
                traKey: "this_season",
                includeAll: !0
            }, {
                key: "past-25",
                traKey: "past_x_games",
                includeAll: !1,
                length: 25
            }, {
                key: "past-10",
                traKey: "past_x_games",
                includeAll: !1,
                length: 10
            }];
            t.SORT_OPTIONS = [{
                traKey: "most_played",
                field: "gamesPlayed"
            }, {
                traKey: "recently_played",
                field: "lastPlayTime"
            }, {
                traKey: "champion_mastery",
                field: "championPoints"
            }, {
                traKey: "name",
                field: "name"
            }];
            t.POSITIONS = ["TOP", "JUNGLE", "MID", "BOTTOM", "SUPPORT"];
            t.MIN_GAMES_TO_UNLOCK_STATS = 3;
            t.MAX_GRADE_VALUE = 100;
            t.CAREER_STATS_KEY = "CareerStats.js";
            t.MOST_PLAYED_SHOW_LIMIT = 8;
            t.TIER_NAME_NONE = "NONE";
            t.ALL_RANKS = "ALL";
            const n = [{
                traKey: "all_players",
                type: "playerGroup",
                rank: "ALL"
            }, {
                traKey: "iron_players",
                type: "playerGroup",
                rank: "IRON",
                rankedOnly: !0
            }, {
                traKey: "bronze_players",
                type: "playerGroup",
                rank: "BRONZE",
                rankedOnly: !0
            }, {
                traKey: "silver_players",
                type: "playerGroup",
                rank: "SILVER",
                rankedOnly: !0
            }, {
                traKey: "gold_players",
                type: "playerGroup",
                rank: "GOLD",
                rankedOnly: !0
            }, {
                traKey: "platinum_players",
                type: "playerGroup",
                rank: "PLATINUM",
                rankedOnly: !0
            }, {
                traKey: "emerald_players",
                type: "playerGroup",
                rank: "EMERALD",
                rankedOnly: !0
            }, {
                traKey: "diamond_players",
                type: "playerGroup",
                rank: "DIAMOND",
                rankedOnly: !0
            }, {
                traKey: "master_players",
                type: "playerGroup",
                rank: "MASTER",
                rankedOnly: !0
            }, {
                traKey: "grandmaster_players",
                type: "playerGroup",
                rank: "GRANDMASTER",
                rankedOnly: !0
            }, {
                traKey: "challenger_players",
                type: "playerGroup",
                rank: "CHALLENGER",
                rankedOnly: !0
            }];
            t.STATS_COMPARE_PLAYER_GROUP_OPTIONS = n;
            t.COMPARE_OPTION_OPEN_DIALOG = {
                traKey: "choose_comparison",
                openDialog: !0
            };
            t.COMPARABLE_RANK_TIER_FORWARD = 10;
            t.STATS_FORMAT_MAPPING = {
                default: {
                    fixedPoints: 2,
                    tickFixedPoint: 2,
                    isPercentage: !1
                },
                kda: {
                    fixedPoints: 2,
                    tickFixedPoint: 1,
                    isPercentage: !1
                },
                killParticipation: {
                    fixedPoints: 1,
                    tickFixedPoint: 0,
                    isPercentage: !0
                },
                utilityScore: {
                    fixedPoints: 1,
                    tickFixedPoint: 0,
                    isPercentage: !1
                },
                damagePerDeath: {
                    fixedPoints: 0,
                    tickFixedPoint: 0,
                    isPercentage: !1,
                    byThousand: !0
                },
                damageShare: {
                    fixedPoints: 1,
                    tickFixedPoint: 0,
                    isPercentage: !0
                },
                damagePerGold: {
                    fixedPoints: 2,
                    tickFixedPoint: 1,
                    isPercentage: !1
                },
                goldDiffAtLaningEnd: {
                    fixedPoints: 0,
                    tickFixedPoint: 0,
                    isPercentage: !1,
                    byThousand: !0
                },
                csDiffAtLaningEnd: {
                    fixedPoints: 1,
                    tickFixedPoint: 1,
                    isPercentage: !1
                },
                csPerMinute: {
                    fixedPoints: 1,
                    tickFixedPoint: 1,
                    isPercentage: !1
                },
                objectiveControlRatio: {
                    fixedPoints: 1,
                    tickFixedPoint: 0,
                    isPercentage: !0
                },
                visionScorePerHour: {
                    fixedPoints: 1,
                    tickFixedPoint: 0,
                    isPercentage: !1
                },
                roamDominanceScore: {
                    fixedPoints: 2,
                    tickFixedPoint: 1,
                    isPercentage: !1
                },
                killConversionRatio: {
                    fixedPoints: 1,
                    tickFixedPoint: 0,
                    isPercentage: !0
                }
            };
            t.PERFORMANCE_GRADES = ["D-", "D", "D+", "C-", "C", "C+", "B-", "B", "B+", "A-", "A", "A+", "S-", "S", "S+"];
            t.GRADE_MIN_PERCENTILES = [0, 1, 2, 7, 15, 23, 31, 39, 47, 55, 63, 71, 79, 87, 95];
            t.PLAY_STYLES = ["combat", "income", "macro"];
            t.OVERVIEW_CHAMPIONS_PER_ROW = 6;
            t.RANKED_QUEUE_TYPE_MAPPINGS = {
                RANKED_SOLO_5x5: "rank5solo",
                RANKED_FLEX_SR: "rank5flex",
                RANKED_FLEX_TT: "rank3flex"
            };
            t.CATEGORY_TO_STATS_MAP = {
                combat: ["kda", "killParticipation", "utilityScore", "damagePerDeath", "damageShare"],
                income: ["damagePerGold", "goldDiffAtLaningEnd", "csDiffAtLaningEnd", "csPerMinute"],
                macro: ["objectiveControlRatio", "visionScorePerHour", "roamDominanceScore", "killConversionRatio"]
            };
            t.STAT_TO_CATEGORY_MAP = {
                kda: "combat",
                killParticipation: "combat",
                utilityScore: "combat",
                damagePerDeath: "combat",
                damageShare: "combat",
                damagePerGold: "income",
                goldDiffAtLaningEnd: "income",
                csDiffAtLaningEnd: "income",
                csPerMinute: "income",
                objectiveControlRatio: "macro",
                visionScorePerHour: "macro",
                roamDominanceScore: "macro",
                killConversionRatio: "macro"
            };
            t.UNAVAILABLE_GRADE = "-";
            t.CHAMPION_ID_FOR_POSITION_STATS = -1;
            t.DEFAULT_STATS_RANGES = {
                kda: [0, 10],
                killParticipation: [0, .8],
                damagePerDeath: [500, 15e3],
                damageShare: [.05, .4],
                utilityScore: [5, 500],
                damagePerGold: [.5, 2.5],
                goldDiffAtLaningEnd: [-2500, 2500],
                csDiffAtLaningEnd: [-50, 50],
                csPerMinute: [1, 9],
                objectiveControlRatio: [0, 1],
                visionScorePerHour: [10, 100],
                roamDominanceScore: [-2, 4],
                killConversionRatio: [0, .65]
            };
            t.DEFAULT_STATS_PERCENTILES = {
                kda: [.7037, .8421, .9429, 1, 1.083, 1.143, 1.191, 1.24, 1.286, 1.324, 1.364, 1.4, 1.435, 1.469, 1.5, 1.532, 1.563, 1.592, 1.621, 1.65, 1.68, 1.706, 1.733, 1.762, 1.788, 1.813, 1.84, 1.865, 1.89, 1.917, 1.942, 1.964, 2, 2, 2.043, 2.067, 2.091, 2.118, 2.143, 2.167, 2.192, 2.217, 2.241, 2.267, 2.294, 2.318, 2.348, 2.375, 2.4, 2.429, 2.455, 2.481, 2.502, 2.538, 2.568, 2.6, 2.625, 2.656, 2.688, 2.718, 2.75, 2.783, 2.818, 2.85, 2.886, 2.923, 2.953, 3, 3.038, 3.071, 3.111, 3.155, 3.2, 3.25, 3.294, 3.333, 3.392, 3.444, 3.5, 3.56, 3.621, 3.689, 3.75, 3.828, 3.905, 4, 4.079, 4.179, 4.289, 4.412, 4.545, 4.694, 4.875, 5.085, 5.333, 5.68, 6.133, 6.833, 8.2],
                killParticipation: [.2031, .2353, .2547, .2698, .2818, .292, .3008, .3092, .3162, .323, .3289, .3333, .3402, .3453, .3504, .355, .3594, .3636, .3676, .3717, .3755, .3793, .383, .3866, .39, .3934, .3968, .4, .4033, .4063, .4094, .4124, .4153, .4183, .4211, .4239, .4268, .4296, .4323, .4349, .4375, .4403, .443, .4457, .4483, .4508, .4535, .456, .4587, .4611, .4638, .4664, .4688, .4715, .4741, .4767, .4793, .4819, .4845, .487, .4896, .4924, .4948, .4981, .5, .5036, .506, .5089, .5117, .5146, .5175, .5204, .5235, .5264, .5295, .5328, .5361, .5395, .5429, .5464, .55, .5537, .5574, .5615, .5657, .5699, .5745, .5794, .5846, .59, .596, .6023, .6091, .6167, .6255, .6358, .6489, .6667, .6935],
                damagePerDeath: [729.3, 870.6, 973.4, 1055, 1132, 1194, 1253, 1308, 1360, 1409, 1454, 1500, 1544, 1586, 1628, 1670, 1710, 1750, 1787, 1825, 1863, 1901, 1937, 1972, 2010, 2043, 2078, 2115, 2151, 2185, 2219, 2253, 2288, 2321, 2355, 2390, 2424, 2459, 2493, 2527, 2562, 2599, 2632, 2666, 2702, 2739, 2772, 2809, 2846, 2882, 2921, 2958, 2995, 3033, 3070, 3110, 3149, 3191, 3234, 3273, 3314, 3357, 3404, 3447, 3493, 3541, 3589, 3641, 3688, 3740, 3794, 3849, 3906, 3970, 4030, 4089, 4155, 4225, 4296, 4369, 4447, 4534, 4617, 4710, 4811, 4912, 5033, 5151, 5293, 5432, 5602, 5807, 6004, 6268, 6566, 6964, 7469, 8297, 9793],
                damageShare: [.05683, .06703, .07444, .08049, .08501, .08924, .09333, .09727, .1007, .1041, .1076, .1109, .1141, .1173, .1205, .1234, .1265, .1294, .1323, .1351, .1377, .1405, .1432, .1458, .1484, .1508, .1532, .1556, .1579, .1602, .1625, .1647, .1669, .169, .1711, .1731, .1751, .1771, .1791, .1811, .183, .185, .1869, .1889, .1906, .1925, .1943, .1962, .198, .1998, .2017, .2036, .2054, .2072, .209, .2108, .2127, .2147, .2165, .2184, .2202, .2221, .224, .2259, .2278, .2298, .2317, .2337, .2357, .2378, .2398, .2419, .2441, .2464, .2484, .2507, .253, .2554, .2578, .2604, .2629, .2658, .2686, .2715, .2746, .2778, .2811, .2848, .2888, .2931, .2975, .3022, .3079, .3144, .3212, .3298, .34, .3555, .3789],
                utilityScore: [1.89, 2.908, 3.63, 4.192, 4.733, 5.267, 5.762, 6.268, 6.75, 7.24, 7.708, 8.209, 8.707, 9.258, 9.815, 10.44, 11.02, 11.68, 12.32, 13, 13.66, 14.31, 14.88, 15.47, 16.05, 16.59, 17.15, 17.69, 18.22, 18.74, 19.24, 19.8, 20.33, 20.85, 21.37, 21.86, 22.35, 22.86, 23.36, 23.86, 24.35, 24.88, 25.38, 25.91, 26.44, 26.93, 27.46, 27.94, 28.47, 29.01, 29.52, 30.05, 30.6, 31.16, 31.75, 32.34, 32.96, 33.59, 34.25, 34.89, 35.62, 36.36, 37.13, 37.93, 38.79, 39.67, 40.61, 41.59, 42.64, 43.72, 44.88, 45.99, 47.28, 48.58, 49.93, 51.36, 52.9, 54.57, 56.35, 58.19, 60.24, 62.59, 65.35, 68.39, 71.84, 75.87, 80.27, 85.08, 90.49, 96.21, 103, 110.9, 119.2, 129.4, 141.8, 155.5, 173.4, 194.8, 225.8],
                damagePerGold: [.5494, .6318, .6893, .7327, .7695, .8007, .8301, .8559, .8792, .9013, .9222, .9432, .9621, .9808, .9975, 1.014, 1.029, 1.045, 1.061, 1.076, 1.091, 1.104, 1.119, 1.132, 1.146, 1.159, 1.172, 1.185, 1.197, 1.21, 1.222, 1.233, 1.245, 1.257, 1.27, 1.281, 1.292, 1.304, 1.315, 1.326, 1.338, 1.349, 1.36, 1.371, 1.383, 1.393, 1.405, 1.415, 1.427, 1.438, 1.448, 1.459, 1.471, 1.482, 1.493, 1.504, 1.516, 1.527, 1.539, 1.55, 1.562, 1.573, 1.584, 1.597, 1.609, 1.621, 1.633, 1.645, 1.658, 1.671, 1.684, 1.697, 1.711, 1.725, 1.739, 1.753, 1.767, 1.782, 1.798, 1.814, 1.831, 1.847, 1.866, 1.884, 1.904, 1.924, 1.946, 1.968, 1.993, 2.019, 2.048, 2.079, 2.112, 2.15, 2.196, 2.25, 2.312, 2.402, 2.56],
                goldDiffAtLaningEnd: [-1864, -1593, -1444, -1322, -1231, -1151, -1085, -1022, -968.3, -916, -870.8, -830.2, -790.3, -751.5, -719.8, -686.3, -655.3, -624.7, -594.6, -566.8, -538.3, -512.3, -487.7, -462.2, -437.8, -413.7, -391, -368, -346, -324.3, -302.5, -282, -260.8, -241, -221.2, -200.7, -180.7, -161, -141.5, -122.8, -103.8, -84.67, -65.5, -46.25, -27.67, -8.667, 9.538, 28.33, 47.67, 65.33, 84, 102.3, 121.8, 140.3, 161, 180, 198.8, 218, 237.1, 257.8, 277, 297.5, 317.1, 337.8, 359.7, 381.3, 402.7, 424.7, 447.3, 469.9, 492.8, 517.6, 540.8, 565.7, 592, 617.4, 644.3, 672, 702, 730.6, 761.7, 793.3, 827.8, 866.5, 901, 939.5, 982, 1026, 1076, 1126, 1181, 1243, 1315, 1391, 1479, 1587, 1733, 1918, 2258],
                csDiffAtLaningEnd: [-43.2, -37.33, -33.71, -30.9, -28.75, -27, -25.33, -24, -22.75, -21.67, -20.65, -19.67, -18.73, -18, -17, -16.33, -15.67, -15, -14.33, -13.67, -13.09, -12.56, -12, -11.33, -10.95, -10.33, -9.8, -9.333, -8.833, -8.333, -8, -7.4, -7, -6.5, -6, -5.667, -5.156, -4.667, -4.263, -3.75, -3.333, -3, -2.4, -2, -1.6, -1, -.6667, -.25, .25, .6667, 1, 1.6, 2, 2.417, 3, 3.333, 3.824, 4.333, 4.75, 5.267, 5.667, 6.222, 6.667, 7.125, 7.667, 8, 8.667, 9, 9.667, 10.05, 10.67, 11.21, 11.69, 12.33, 12.89, 13.42, 14, 14.67, 15.33, 16, 16.67, 17.33, 18.17, 19, 19.69, 20.67, 21.67, 22.63, 23.67, 24.75, 26, 27.33, 29, 30.67, 32.67, 35.07, 38, 42, 48.33],
                csPerMinute: [.3358, .422, .4999, .5766, .6672, .7787, .8955, 1.013, 1.124, 1.231, 1.333, 1.429, 1.524, 1.621, 1.725, 1.838, 1.971, 2.158, 2.432, 2.792, 3.079, 3.299, 3.473, 3.611, 3.728, 3.832, 3.934, 4.021, 4.105, 4.179, 4.248, 4.317, 4.384, 4.442, 4.507, 4.563, 4.621, 4.678, 4.736, 4.79, 4.839, 4.893, 4.944, 4.996, 5.047, 5.095, 5.145, 5.193, 5.245, 5.295, 5.34, 5.388, 5.434, 5.481, 5.531, 5.575, 5.621, 5.669, 5.715, 5.759, 5.804, 5.849, 5.896, 5.943, 5.988, 6.035, 6.08, 6.126, 6.169, 6.217, 6.264, 6.311, 6.36, 6.404, 6.452, 6.503, 6.551, 6.599, 6.651, 6.703, 6.753, 6.808, 6.865, 6.92, 6.98, 7.043, 7.101, 7.167, 7.241, 7.311, 7.39, 7.47, 7.562, 7.662, 7.777, 7.917, 8.069, 8.285, 8.619],
                objectiveControlRatio: [.05714, .1053, .1321, .15, .1667, .1795, .1905, .2, .2083, .2174, .2222, .2308, .2381, .2487, .25, .2564, .2619, .2667, .2727, .2778, .2825, .2857, .2917, .2958, .3, .3043, .3077, .3125, .3158, .32, .3243, .3333, .3333, .3333, .3333, .3429, .3462, .35, .3529, .3571, .36, .3636, .3673, .3704, .375, .3774, .381, .3846, .3878, .3913, .3945, .4, .4, .4044, .4077, .4118, .4147, .4183, .4211, .4251, .4286, .4324, .4359, .44, .4444, .4466, .45, .4545, .4583, .4615, .4667, .4706, .4737, .4783, .4821, .4865, .4955, .5, .5, .5, .5078, .5152, .52, .5251, .5313, .5368, .5431, .55, .5556, .5646, .5714, .5816, .5909, .6, .6154, .6296, .6477, .6667, .7143],
                visionScorePerHour: [4.678, 7.691, 10.01, 11.82, 13.34, 14.63, 15.81, 16.82, 17.79, 18.64, 19.51, 20.25, 20.94, 21.64, 22.3, 22.92, 23.53, 24.11, 24.7, 25.24, 25.77, 26.28, 26.78, 27.26, 27.78, 28.24, 28.71, 29.17, 29.61, 30.06, 30.51, 30.97, 31.4, 31.83, 32.26, 32.7, 33.13, 33.56, 34, 34.43, 34.87, 35.29, 35.74, 36.15, 36.61, 37.06, 37.51, 38, 38.43, 38.91, 39.37, 39.84, 40.34, 40.82, 41.35, 41.84, 42.39, 42.93, 43.44, 43.99, 44.58, 45.13, 45.73, 46.34, 47, 47.62, 48.3, 49.02, 49.69, 50.45, 51.22, 52.05, 52.95, 53.81, 54.77, 55.7, 56.79, 57.91, 59.14, 60.44, 61.89, 63.46, 65.19, 67.06, 69.2, 71.39, 73.75, 76.29, 79.08, 82.12, 85, 88, 91.47, 95.04, 98.76, 103.2, 108.2, 114.3, 125.2],
                roamDominanceScore: [-.6667, -.5, -.3333, -.3333, -.3333, -.25, -.2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .1538, .2, .2069, .25, .25, .25, .3333, .3333, .3333, .3333, .3333, .3333, .3333, .3333, .4, .4, .5, .5, .5, .5, .5862, .6, .6667, .6667, .6667, .6667, .6667, .6667, .6667, .75, .75, .75, .8, .8571, 1, 1, 1, 1, 1, 1, 1, 1, 1.063, 1.182, 1.25, 1.25, 1.333, 1.333, 1.333, 1.333, 1.4, 1.5, 1.5, 1.6, 1.667, 1.667, 1.667, 1.75, 1.8, 2, 2, 2, 2, 2.2, 2.25, 2.333, 2.333, 2.5, 2.667, 2.667, 2.8, 3, 3, 3.25, 3.333, 3.667, 3.8, 4, 4.5, 5.053],
                killConversionRatio: [0, .02985, .04348, .05556, .06522, .07407, .08163, .08833, .09524, .1, .1062, .1111, .1163, .1208, .125, .129, .1333, .137, .1406, .1429, .1478, .1509, .1538, .1579, .1606, .1633, .1667, .1695, .1724, .175, .1778, .1803, .1831, .1856, .1881, .1905, .1935, .1957, .2, .2, .2031, .2052, .2076, .2105, .2122, .2143, .2174, .2195, .2222, .2241, .2264, .2286, .2308, .2333, .2358, .2381, .2407, .2432, .2454, .25, .25, .2533, .2558, .2581, .2609, .2632, .2661, .2687, .2714, .2745, .2772, .28, .283, .2857, .289, .2922, .2955, .2986, .3023, .3056, .3095, .3132, .3172, .3214, .3256, .3333, .3333, .3404, .3456, .3514, .3571, .3649, .3725, .3814, .3913, .404, .4189, .44, .4737]
            };
            t.NORMAL_STAT_RANGE_MIN_PERCENTILE = 20;
            t.NORMAL_STAT_RANGE_MAX_PERCENTILE = 80;
            t.EXPERT_GAME_QUEUE = "rank5solo";
            t.MAX_RECENTLY_COMPARED_SUMMONERS = 5;
            t.MAX_RECENTLY_PLAYED_WITH_SUMMONERS = 18;
            t.NUM_OF_MATCH_UPS = 4;
            const o = new Set(["challenger", "master"]);
            t.NO_DIVISION_TIERS = o;
            t.LEAGUES_QUEUE_TYPE_MAP = {
                rank5solo: 1,
                rank5flex: 3
            };
            t.POSITION_ID_MAP = {
                0: "TOP",
                1: "JUNGLE",
                2: "MID",
                3: "BOTTOM",
                4: "SUPPORT"
            };
            t.DEFAULT_PREV_SEASON_YEAR_COUNT = 2;
            const l = Number.MAX_SAFE_INTEGER;
            t.INVALID_EARLIEST_SEASON = l;
            const r = Number.MIN_SAFE_INTEGER;
            t.INVALID_CURRENT_SEASON = r;
            t.SEASON_2018_NUM = 8;
            t.SMOOTHENING_REQUIRED_SIZE = 50;
            t.ROLLING_AVERAGE_WINDOW_SIZE = 10;
            t.MAX_DATA_POINTS = 100
        }, e => {
            var t;
            t = {}, e.exports = t, t.simpleFilter = function(e, a) {
                return a.filter((function(a) {
                    return t.test(e, a)
                }))
            }, t.test = function(e, a) {
                return null !== t.match(e, a)
            }, t.match = function(e, t, a) {
                a = a || {};
                var s, n = 0,
                    o = [],
                    l = t.length,
                    r = 0,
                    i = 0,
                    c = a.pre || "",
                    m = a.post || "",
                    p = a.caseSensitive && t || t.toLowerCase();
                e = a.caseSensitive && e || e.toLowerCase();
                for (var d = 0; d < l; d++) s = t[d], p[d] === e[n] ? (s = c + s + m, n += 1, i += 1 + i) : i = 0, r += i, o[o.length] = s;
                return n === e.length ? (r = p === e ? 1 / 0 : r, {
                    rendered: o.join(""),
                    score: r
                }) : null
            }, t.filter = function(e, a, s) {
                return a && 0 !== a.length ? "string" != typeof e ? a : (s = s || {}, a.reduce((function(a, n, o, l) {
                    var r = n;
                    s.extract && (r = s.extract(n));
                    var i = t.match(e, r, s);
                    return null != i && (a[a.length] = {
                        string: i.rendered,
                        score: i.score,
                        index: o,
                        original: n
                    }), a
                }), []).sort((function(e, t) {
                    var a = t.score - e.score;
                    return a || e.index - t.index
                }))) : []
            }
        }, (e, t, a) => {
            "use strict";
            e.exports = a.p + "average_tag_self_middle.png"
        }, (e, t, a) => {
            "use strict";
            e.exports = a.p + "average_tag_self_middle_hover.png"
        }, (e, t, a) => {
            "use strict";
            e.exports = a.p + "average_tag_other_middle.png"
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = a(1);
            a(18);
            var n = a(12),
                o = s.Ember.Component.extend({
                    layout: a(19),
                    classNames: ["stats-category-summary-graph-component"],
                    dataChanged: s.Ember.on("init", s.Ember.observer("data", (function() {
                        const e = this.get("data");
                        e && e.length > 0 && this.draw(5 === e[0].axes.length ? this._rearrangeDataForPentagonGraph(e) : e, this.get("chartSpecs"))
                    }))),
                    chartSpecs: s.Ember.computed("data", (function() {
                        const e = this.get("data");
                        if (!e) return null;
                        const t = e[0].axes.length;
                        return {
                            width: 111,
                            height: 111,
                            margin: {
                                top: 50,
                                bottom: 50,
                                left: 50,
                                right: 50
                            },
                            positionOffset: {
                                x: 125,
                                y: 103
                            },
                            maxValue: n.MAX_GRADE_VALUE,
                            labelValue: 1.4 * n.MAX_GRADE_VALUE,
                            angleOffSet: t % 2 == 1 ? -Math.PI / t : 0,
                            numOfAxis: t,
                            levels: 3,
                            axisLabelWidth: 60,
                            iconSize: 18
                        }
                    })),
                    draw(e, t) {
                        s.d3.select(this.element).select("svg").remove();
                        const a = s.d3.select(this.element).append("svg:svg").attr("width", t.width + t.margin.left + t.margin.right).attr("height", t.height + t.margin.top + t.margin.bottom).attr("class", "category-summary-graph").append("g").attr("transform", `translate(${t.positionOffset.x},${t.positionOffset.y})`),
                            n = s.d3.scale.linear().range([0, Math.min(t.width / 2, t.height / 2)]).domain([0, t.maxValue]),
                            o = 2 * Math.PI / t.numOfAxis,
                            l = s.d3.svg.line.radial().interpolate("linear-closed").radius((e => n(e.value))).angle(((e, a) => a * o + t.angleOffSet));
                        this._drawAxes(e, t, a, l, n, o);
                        const r = a.selectAll(".radar-wrapper").data(e).enter().append("g").attr("class", (e => "radar-wrapper " + e.owner));
                        r.append("path").attr("class", "radar-area").attr("d", (e => l(e.axes))), r.append("path").attr("class", "radar-stroke").attr("d", (e => l(e.axes)))
                    },
                    _drawAxes(e, t, a, s, n, o) {
                        const l = e[0].axes.map((e => e.axis)),
                            r = a.selectAll(".axis").data(l).enter().append("g").attr("class", "axis");
                        r.append("line").attr("class", "axis-line").attr("x1", 0).attr("y1", 0).attr("x2", ((e, a) => n(t.maxValue) * Math.cos(o * a - Math.PI / 2 + t.angleOffSet))).attr("y2", ((e, a) => n(t.maxValue) * Math.sin(o * a - Math.PI / 2 + t.angleOffSet))), r.append("g").attr("transform", ((e, a) => "translate(" + (n(t.labelValue) * Math.cos(o * a - Math.PI / 2 + t.angleOffSet) - t.iconSize / 2) + "," + (n(t.labelValue) * Math.sin(o * a - Math.PI / 2 + t.angleOffSet) - t.iconSize / 2) + ")")).call(this._assignTooltips.bind(this)).append("svg:foreignObject").attr("x", 0).attr("y", 0).attr("class", "stats-icon-container").append("xhtml:div").attr("class", (e => "category-stats-icon stats-icon " + e))
                    },
                    _assignTooltips(e) {
                        const t = this.get("tra");
                        e.each(((a, s, n) => {
                            this._assignTooltip(e[n][s], a, t)
                        }))
                    },
                    _assignTooltip(e, t, a) {
                        s.TooltipManager.unassign(e);
                        const n = document.createElement("lol-uikit-tooltip"),
                            o = document.createElement("lol-uikit-content-block");
                        o.innerHTML = "<p>" + a.get("career_stats_detail_stat_name_" + t) + "</p>", o.setAttribute("type", "tooltip-system"), n.appendChild(o), s.TooltipManager.assign(e, n, {}, {
                            targetAnchor: {
                                x: "center",
                                y: "top"
                            },
                            tooltipAnchor: {
                                x: "center",
                                y: "bottom"
                            },
                            offset: {
                                x: 0,
                                y: 0
                            }
                        })
                    },
                    _rearrangeDataForPentagonGraph(e) {
                        const t = JSON.parse(JSON.stringify(e));
                        for (const e of t)
                            if (e.axes.length) {
                                const t = e.axes[2];
                                e.axes[2] = e.axes[4], e.axes[4] = t
                            } return t
                    }
                });
            t.default = o
        }, (e, t, a) => {
            "use strict";
            a.r(t)
        }, (e, t, a) => {
            const s = a(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "Cisdu4HF",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\stats-category-summary-graph-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\stats-category-summary-graph-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\stats-category-summary-graph-component\\\\index.js\\" "],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = a(1);
            a(21);
            var n = a(12),
                o = i(a(22)),
                l = a(6),
                r = i(a(8));

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            var c = s.Ember.Component.extend({
                layout: a(32),
                classNames: ["stats-trend-graph-component"],
                careerStatsService: s.Ember.inject.service("careerStats"),
                chartSpecs: o.default,
                isCompareValueAvailable: s.Ember.computed("data.compareValue", (function() {
                    return s.Lodash.isNumber(this.get("data.compareValue"))
                })),
                statsNameDisplay: s.Ember.computed("tra", "data.name", (function() {
                    return this.get("tra").get(`career_stats_detail_stat_name_${this.get("data.name")}`)
                })),
                statsDescriptionTooltipTitle: s.Ember.computed("tra", "data.name", (function() {
                    return this.get("tra").get(`career_stats_detail_stat_description_title_${this.get("data.name")}`)
                })),
                statsDescriptionTooltipContent: s.Ember.computed("tra", "data.name", (function() {
                    return this.get("tra").get(`career_stats_detail_stat_description_content_${this.get("data.name")}`)
                })),
                selfStatsAverageDisplay: s.Ember.computed("data.name", "data.average", "careerStatsService.formatNumber", (function() {
                    const e = n.STATS_FORMAT_MAPPING[this.get("data.name")] || n.STATS_FORMAT_MAPPING.default;
                    return this.get("careerStatsService").formatNumber(this.get("data.average"), e.fixedPoints, e.isPercentage)
                })),
                againstStatsAverageDisplay: s.Ember.computed("data.name", "data.compareValue", "careerStatsService.formatNumber", (function() {
                    const e = n.STATS_FORMAT_MAPPING[this.get("data.name")] || n.STATS_FORMAT_MAPPING.default;
                    return this.get("careerStatsService").formatNumber(this.get("data.compareValue"), e.fixedPoints, e.isPercentage)
                })),
                draw(e, t) {
                    const a = e.stats.map(((e, t) => ({
                            index: t,
                            stat: e
                        }))),
                        o = e.compareValue,
                        l = this.get("careerStatsService"),
                        r = n.STATS_FORMAT_MAPPING[e.name] || n.STATS_FORMAT_MAPPING.default;
                    s.d3.select(this.element).select("svg.stats-trend-graph").remove();
                    const i = s.d3.select(this.element).append("svg:svg").attr("width", t.width + t.margin.left + t.margin.right).attr("height", t.height + t.margin.top + t.margin.bottom).attr("class", "stats-trend-graph"),
                        c = i.append("g").attr("transform", `translate(${t.margin.left},${t.margin.top})`),
                        m = this._calculateYRange(e.normalRange, e.stats, o, e.average),
                        p = {
                            x: s.d3.scale.linear().range([0, t.width]).domain([0, e.stats.length - 1]),
                            y: s.d3.scale.linear().range([t.height, 0]).domain([m.min, m.max])
                        };
                    this._drawAxes(i, t, p, m, l, r), this._drawStatsLine(i, c, t, p, m, a, l, r), this._drawAverageBar(i, t, "self", e.average, p), this._drawAverageBar(i, t, "selfHover", e.average, p), void 0 !== o && this._drawAverageBar(i, t, "other", o, p), this._drawAverageTag(i, t, "self", e.average, this.get("selfStatsAverageDisplay"), p), this._drawAverageTag(i, t, "selfHover", e.average, this.get("selfStatsAverageDisplay"), p), void 0 !== o && this._drawAverageTag(i, t, "other", o, this.get("againstStatsAverageDisplay"), p), this._setUpMouseOverEffects(i, t, p), this._updatePinnedLabel(this.get("pinnedGame.index"))
                },
                pinnedGameChanged: s.Ember.on("init", s.Ember.observer("pinnedGame.index", (function() {
                    this._updatePinnedLabel(this.get("pinnedGame.index"))
                }))),
                didInsertElement: function() {
                    this._super(...arguments);
                    const e = this.get("data"),
                        t = this.get("chartSpecs");
                    this.draw(e, t)
                },
                _calculateYRange(e, t, a, n) {
                    let o = s.Lodash.min([e[0], a || n, n]),
                        l = s.Lodash.max([e[1], a || n, n]);
                    return s.Lodash.each(t, (e => {
                        e < o ? o = e : e > l && (l = e)
                    })), {
                        min: o,
                        max: l
                    }
                },
                _drawAxes(e, t, a, n, o, l) {
                    const r = s.d3.svg.axis().scale(a.x).tickValues(a.x.domain()).tickSize(t.axis.x.tickSize).orient("top").tickFormat((() => ""));
                    e.append("svg:g").attr("class", "axis-x").attr("transform", `translate(${t.margin.left+t.axis.x.padding.x},${t.height+t.margin.top+t.axis.x.padding.y})`).call(r);
                    const i = s.d3.svg.axis().scale(a.y).tickValues(a.y.domain()).tickSize(t.axis.y.tickSize).orient("left").tickFormat((e => o.formatNumber(e, l.tickFixedPoint, l.isPercentage, l.byThousand).replace("-", "–")));
                    e.append("svg:g").attr("class", "axis-y").attr("transform", `translate(${t.margin.left+t.axis.y.padding.x},${t.margin.top+t.axis.y.padding.y})`).call(i);
                    const c = (n.max - n.min) / t.axis.y.gridLines,
                        m = [];
                    for (let e = 1; e <= t.axis.y.gridLines; e++) m.push(n.min + c * e);
                    const p = s.d3.svg.axis().scale(a.y).tickValues(m).innerTickSize(-t.width).outerTickSize(0).orient("left").tickFormat((() => ""));
                    e.append("svg:g").attr("class", "axis-grid").attr("transform", `translate(${t.margin.left+t.axis.y.padding.x},${t.margin.top+t.axis.y.padding.y})`).call(p)
                },
                _drawStatsLine(e, t, a, n, o, l, r, i) {
                    const c = s.d3.svg.line().x((e => n.x(e.index))).y((e => n.y(e.stat))).interpolate("monotone");
                    t.selectAll(".data-line").data([l]).enter().append("svg:path").attr("class", "data-line").attr("d", c(l)), e.append("linearGradient").attr("id", "area-gradient").attr("gradientUnits", "userSpaceOnUse").attr("x1", 0).attr("y1", n.y(o.min)).attr("x2", 0).attr("y2", n.y(o.max)).selectAll("stop").data(a.areaGradientStops).enter().append("stop").attr("offset", (e => e.offset)).attr("stop-color", (e => e.color)).attr("stop-opacity", (e => e.opacity));
                    const m = s.d3.svg.area().interpolate("monotone").x((e => n.x(e.index))).y0(a.height).y1((e => n.y(e.stat)));
                    t.selectAll(".area-under-line").data([l]).enter().append("svg:path").attr("class", "area-under-line").attr("d", m).style("fill", "url(#area-gradient)");
                    const p = t.selectAll(".data-label").data(l).enter().append("svg:g").attr("class", (e => `data-label x-${e.index}`)).attr("transform", (e => `translate(${n.x(e.index)},${n.y(e.stat)})`));
                    p.append("circle").attr("class", "data-dot").attr("r", a.label.dotSize), p.append("text").attr("class", "data-dot-text shadow").attr("x", a.label.textOffset.x).attr("y", a.label.textOffset.y).text((e => r.formatNumber(e.stat, i.fixedPoints, i.isPercentage).replace("-", "–"))), p.append("text").attr("class", "data-dot-text").attr("x", a.label.textOffset.x).attr("y", a.label.textOffset.y).text((e => r.formatNumber(e.stat, i.fixedPoints, i.isPercentage).replace("-", "–")))
                },
                _drawAverageBar(e, t, a, s, n) {
                    const o = t.averageBars[a];
                    e.selectAll(`.average-bar.${a}`).data([s]).enter().append("svg:image").attr("xlink:href", (() => o.image)).attr("x", (() => t.margin.left + o.offset.x)).attr("y", (e => n.y(e) + t.margin.top + o.offset.y)).attr("width", o.width).attr("height", o.height).attr("class", (() => `average-bar ${a}`))
                },
                _drawAverageTag(e, t, a, s, n, o) {
                    const l = n.replace("-", "–");
                    let r = l.length;
                    l.includes(".") && (r -= .5);
                    const i = t.averageTags[a],
                        c = r * t.averageTags.textWidth,
                        m = "right" === i.offset.from ? t.width - i.offset.x - c : i.offset.x,
                        p = e.append("svg:g").attr("class", `average-tag ${a}`).attr("transform", `translate(${m},${o.y(s)+t.margin.top+i.offset.y})`),
                        d = i.images.left;
                    p.append("svg:image").attr("class", "tag-left").attr("xlink:href", (() => d.src)).attr("x", (() => d.offset.x)).attr("y", (() => d.offset.y)).attr("width", d.width).attr("height", d.height);
                    const u = i.images.middle;
                    p.append("svg:rect").attr("x", (() => u.offset.x)).attr("y", (() => u.offset.y)).attr("class", "tag-mid").attr("width", c).attr("height", u.height).attr("fill", `url(#avg-tag-mid-${a})`);
                    const h = i.images.right;
                    p.append("svg:image").attr("class", "tag-right").attr("xlink:href", (() => h.src)).attr("x", (() => c + h.offset.x)).attr("y", (() => h.offset.y)).attr("width", h.width).attr("height", h.height), p.append("svg:text").attr("class", `tag-text ${a}`).attr("text-anchor", "middle").attr("x", (c + h.offset.x + h.width) / 2).attr("y", i.textOffset.y).text(l)
                },
                _setUpMouseOverEffects(e, t, a) {
                    const n = this.get("pinnedGame"),
                        o = e.append("svg:g").attr("class", "mouse-overs").attr("transform", `translate(${t.margin.left},${t.margin.top})`);
                    o.append("path").attr("class", "mouse-line").style("opacity", "0"), o.append("svg:rect").attr("class", "overlay-mask").attr("width", t.width).attr("height", t.height).on("mouseenter", (function() {
                        s.d3.selectAll(".average-bar.self, .average-bar.other").transition().duration(t.transitionTime).style("opacity", t.averageBars.fadeToOpacity), e.selectAll(".average-bar.selfHover").transition().duration(t.transitionTime).style("opacity", t.averageBars.fadeToOpacity), s.d3.selectAll(".average-tag").transition().duration(t.transitionTime).style("opacity", t.averageTags.fadeToOpacity), s.d3.selectAll(".mouse-line").style("opacity", 1), r.default.addUserBehavior(l.USER_ACTIVITIES.GRAPH_MOUSE_ENTER)
                    })).on("mouseout", (function() {
                        s.d3.selectAll(".average-bar, .average-tag").transition().duration(t.transitionTime).style("opacity", null), s.d3.selectAll(".mouse-line").style("opacity", 0);
                        const e = s.d3.selectAll(".data-label.show");
                        e.length && e.classed("show", !1)
                    })).on("mousemove", (function() {
                        const e = s.d3.mouse(this);
                        s.d3.selectAll(".mouse-line").attr("d", (() => `M${e[0]},${t.height} ${e[0]},0`));
                        const n = s.Lodash.round(a.x.invert(e[0])),
                            o = s.d3.selectAll(".data-label.show");
                        o.length && o.classed("show", !1), s.d3.selectAll(`.data-label.x-${n}`).classed("show", !0)
                    })).on("click", (function() {
                        const e = s.d3.mouse(this),
                            t = s.Lodash.round(a.x.invert(e[0]));
                        n.set("index", n.get("index") === t ? null : t), r.default.addUserBehavior(l.USER_ACTIVITIES.GRAPH_MOUSE_CLICK)
                    }))
                },
                _updatePinnedLabel(e) {
                    const t = s.d3.selectAll(".data-label.pinned");
                    t.length && t.classed("pinned", !1), "number" == typeof e && s.d3.selectAll(`.data-label.x-${e}`).classed("pinned", !0)
                }
            });
            t.default = c
        }, (e, t, a) => {
            "use strict";
            a.r(t)
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = {
                width: 185,
                height: 95,
                margin: {
                    left: 38,
                    right: 20,
                    top: 65,
                    bottom: 10
                },
                label: {
                    dotSize: 3,
                    textOffset: {
                        x: 0,
                        y: -8
                    }
                },
                axis: {
                    x: {
                        padding: {
                            x: -1,
                            y: 1
                        },
                        tickSize: 5
                    },
                    y: {
                        padding: {
                            x: -2,
                            y: 0
                        },
                        tickSize: 0,
                        gridLines: 1
                    }
                },
                areaGradientStops: [{
                    offset: "0%",
                    color: "#36b8ca",
                    opacity: .1
                }, {
                    offset: "100%",
                    color: "#36b8ca",
                    opacity: .7
                }],
                averageBars: {
                    self: {
                        image: a(23),
                        width: 202,
                        height: 24,
                        offset: {
                            x: -5,
                            y: -9
                        }
                    },
                    selfHover: {
                        image: a(24),
                        width: 202,
                        height: 24,
                        offset: {
                            x: -5,
                            y: -9
                        }
                    },
                    other: {
                        image: a(25),
                        width: 202,
                        height: 24,
                        offset: {
                            x: -5,
                            y: -9
                        }
                    },
                    fadeToOpacity: 0
                },
                averageTags: {
                    textWidth: 8,
                    self: {
                        images: {
                            left: {
                                src: a(26),
                                width: 9,
                                height: 24,
                                offset: {
                                    x: 0,
                                    y: 0
                                }
                            },
                            middle: {
                                width: 50,
                                height: 24,
                                offset: {
                                    x: 9,
                                    y: 0
                                }
                            },
                            right: {
                                src: a(27),
                                width: 9,
                                height: 24,
                                offset: {
                                    x: 9,
                                    y: 0
                                }
                            }
                        },
                        offset: {
                            x: 60,
                            y: -11.5
                        },
                        textOffset: {
                            x: 0,
                            y: 16
                        }
                    },
                    selfHover: {
                        images: {
                            left: {
                                src: a(28),
                                width: 9,
                                height: 24,
                                offset: {
                                    x: 0,
                                    y: 0
                                }
                            },
                            middle: {
                                width: 50,
                                height: 24,
                                offset: {
                                    x: 9,
                                    y: 0
                                }
                            },
                            right: {
                                src: a(29),
                                width: 9,
                                height: 24,
                                offset: {
                                    x: 9,
                                    y: 0
                                }
                            }
                        },
                        offset: {
                            x: 60,
                            y: -11.5
                        },
                        textOffset: {
                            x: 0,
                            y: 16
                        }
                    },
                    other: {
                        images: {
                            left: {
                                src: a(30),
                                width: 9,
                                height: 24,
                                offset: {
                                    x: 0,
                                    y: 0
                                }
                            },
                            middle: {
                                width: 50,
                                height: 24,
                                offset: {
                                    x: 9,
                                    y: 0
                                }
                            },
                            right: {
                                src: a(31),
                                width: 9,
                                height: 24,
                                offset: {
                                    x: 9,
                                    y: 0
                                }
                            }
                        },
                        offset: {
                            x: -5,
                            y: -11.5,
                            from: "right"
                        },
                        textOffset: {
                            x: 0,
                            y: 16
                        }
                    },
                    fadeToOpacity: 0
                },
                transitionTime: 400
            };
            t.default = s
        }, (e, t, a) => {
            "use strict";
            e.exports = a.p + "average_bar_self.png"
        }, (e, t, a) => {
            "use strict";
            e.exports = a.p + "average_bar_self_hover.png"
        }, (e, t, a) => {
            "use strict";
            e.exports = a.p + "average_bar_other.png"
        }, (e, t, a) => {
            "use strict";
            e.exports = a.p + "average_tag_self_left.png"
        }, (e, t, a) => {
            "use strict";
            e.exports = a.p + "average_tag_self_right.png"
        }, (e, t, a) => {
            "use strict";
            e.exports = a.p + "average_tag_self_left_hover.png"
        }, (e, t, a) => {
            "use strict";
            e.exports = a.p + "average_tag_self_right_hover.png"
        }, (e, t, a) => {
            "use strict";
            e.exports = a.p + "average_tag_other_left.png"
        }, (e, t, a) => {
            "use strict";
            e.exports = a.p + "average_tag_other_right.png"
        }, (e, t, a) => {
            const s = a(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "KMp/5zUi",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\stats-trend-graph-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\stats-trend-graph-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\stats-trend-graph-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","stats-title"],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["stats-icon ",["unknown",["data","name"]]]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","span",[]],["static-attr","class","stats-name"],["flush-element"],["append",["unknown",["statsNameDisplay"]],false],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],3],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","stats-average-compare"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","stats-average self"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],2],["text","    "],["append",["unknown",["selfStatsAverageDisplay"]],false],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isCompareValueAvailable"]]],null,1],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["comparedAgainstAveragesTooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","compare-vs"],["flush-element"],["append",["unknown",["tra","career_stats_trend_graph_title_compare"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","stats-average against"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],0],["text","      "],["append",["unknown",["againstStatsAverageDisplay"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["summonerSelfAveragesTooltip"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","career-stats-stat-tooltip"],["flush-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["statsDescriptionTooltipContent"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = a(1),
                n = a(12),
                o = a(11),
                l = a(34);
            const r = (0, s.emberDataBinding)({
                Ember: s.Ember,
                websocket: (0, s.getProvider)().getSocket(),
                basePaths: {
                    summoner: "/lol-summoner",
                    chat: "/lol-chat",
                    champions: "/lol-champions",
                    collections: "/lol-collections",
                    gameData: "/lol-game-data",
                    careerStats: "/lol-career-stats",
                    settings: "/lol-settings",
                    platformConfig: "/lol-platform-config",
                    ranked: "/lol-ranked",
                    matchHistory: "/lol-match-history",
                    lolSeasons: "/lol-seasons"
                },
                boundProperties: {
                    currentSummoner: {
                        api: "summoner",
                        path: "/v1/current-summoner"
                    },
                    userExperience: {
                        api: "settings",
                        path: "/v2/local/lol-user-experience"
                    }
                }
            });
            var i = s.Ember.Service.extend(r, {
                earliestSeason: n.INVALID_EARLIEST_SEASON,
                currentSeason: n.INVALID_CURRENT_SEASON,
                isGameDataLoaded: !1,
                isSeasonSettingLoaded: !1,
                minGamesToUnlockStats: n.MIN_GAMES_TO_UNLOCK_STATS,
                maxRecentlyComparedSummoners: n.MAX_RECENTLY_COMPARED_SUMMONERS,
                maxRecentlyPlayedWithSummoners: n.MAX_RECENTLY_PLAYED_WITH_SUMMONERS,
                careerStatsTra: s.tra,
                seasonDataMap: new Map,
                init: function() {
                    this._super.apply(this, arguments), this._loadGameData(), this._loadSeasonAndSplitSettings()
                },
                currentLocale: s.Ember.computed("careerStatsTra.metadata", (function() {
                    const e = this.get("careerStatsTra.metadata"),
                        t = e && "function" == typeof e && e() && e().locale && e().locale.id || "en_US";
                    let a = t.substr(0, 2).toLowerCase();
                    return "cs" === a && (a = "en"), {
                        short: a,
                        full: t
                    }
                })),
                formatDurationFromMillis(e, t = !1) {
                    const a = Math.floor(e / n.MILLIS_IN_A_DAY),
                        s = Math.round(t ? e / n.MILLIS_IN_AN_HOUR : e / n.MILLIS_IN_AN_HOUR % 24),
                        o = t ? "career_stats_time_played_display_hours_only" : "career_stats_time_played_display";
                    return this.get("careerStatsTra").formatString(o, t ? {
                        hours: s
                    } : {
                        days: a,
                        hours: s
                    })
                },
                formatNumber(e, t = 0, a = !1, s = !1) {
                    const n = this.get("currentLocale").full.replace("_", "-"),
                        o = s ? e / 1e3 : e,
                        l = s ? this.get("careerStatsTra").get("career_stats_thousand_suffix") : "",
                        r = {
                            minimumFractionDigits: t,
                            maximumFractionDigits: t
                        };
                    a && (r.style = "percent");
                    return o.toLocaleString(n, r) + l
                },
                loadCurrentSeasonStatsGames(e) {
                    return this.get("api.careerStats").get(`/v1/summoner-games/${e}`, {
                        skipCache: !0
                    }).then((e => this._enrichStatsData(e))).catch((e => this._handleHttpError(e, "career stats games")), e)
                },
                loadPreviousSeasonStatsGames(e, t) {
                    return this.get("api.careerStats").get(`/v1/summoner-games/${e}/season/${t}`).then((e => this._enrichStatsData(e))).catch((e => this._handleHttpError(e, `season ${t} career stats games`)), e)
                },
                loadSummonerRankedTiers(e, t = !0) {
                    return this.get("api.ranked").get(`/v1/ranked-stats/${e}`, {
                        skipCache: !0
                    }).then((e => {
                        if (e && e.queues) {
                            return s.Lodash.reduce(e.queues, ((e, a) => (e[n.RANKED_QUEUE_TYPE_MAPPINGS[a.queueType] || a.queueType] = t ? s.Ember.get(a, "tier") : a, e)), {})
                        }
                        return {}
                    })).catch((t => (s.logger.warning(`Error loading summoner ranked tiers for puuid ${e}: ${t}`), {})))
                },
                loadChampionMasteries(e) {
                    return this.get("api.collections").get(`/v1/inventories/${e}/champion-mastery`).then((e => s.Lodash.reduce(e, ((e, t) => (e[t.championId] = t, e)), {})))
                },
                loadFriendList() {
                    return this.get("api.chat").get("/v1/friends").then((e => this._loadSummonerIcons(s.Lodash.map(e, "summonerId")).then((t => s.Lodash.map(e, (e => ({
                        puuid: e.puuid,
                        summonerId: e.summonerId,
                        displayName: e.name,
                        gameName: e.gameName,
                        tagLine: e.gameTag,
                        profileIconId: s.Lodash.get(t, `${e.summonerId}.profileIconId`)
                    })))))))
                },
                getPositionAverages(e, t, a, n) {
                    const o = this.get("api.careerStats"),
                        l = this.get("currentSeason"),
                        r = n && n !== l ? `/season/${n}` : "";
                    return o.get(`/v1/position-averages${r}/${e}/${t}/${a}`).then((e => s.Lodash.get(e, "stats")))
                },
                getChampionAverages(e, t, a, n, o) {
                    const l = this.get("api.careerStats"),
                        r = this.get("currentSeason"),
                        i = o && o !== r ? `/season/${o}` : "";
                    return l.get(`/v1/champion-averages${i}/${e}/${t}/${a}/${n}`).then((e => s.Lodash.get(e, "stats")))
                },
                getChampionMatchups(e, t) {
                    return this.get("api.careerStats").get(`/v1/champion-matchups/${e}/${t}`).then((a => {
                        if (a && a.length < 2 * n.NUM_OF_MATCH_UPS) return s.logger.warning(`not enough match ups for championId ${e} and position ${t} ` + JSON.stringify(a)), null;
                        const o = s.Lodash.sortBy(a, "matchupWinRate");
                        return {
                            strongAgainst: s.Lodash.takeRight(o, n.NUM_OF_MATCH_UPS).reverse(),
                            weakAgainst: s.Lodash.take(o, n.NUM_OF_MATCH_UPS)
                        }
                    }))
                },
                loadStatsSummaryFromSummonerId(e, t, a, s, n) {
                    return this.get("api.summoner").get(`/v1/summoners/${e}`).then((e => this.loadStatsSummary(e.puuid, t, a, s, n)))
                },
                loadCurrentSeasonStatsSummary(e, t, a, s) {
                    return this.loadStatsSummary(e, this.get("currentSeason"), t, a, s)
                },
                loadStatsSummary(e, t, a, o, l) {
                    return this.get("api.careerStats").get(`/v1/summoner-stats/${e}/${t}/${a}/${o}` + (l ? `?championId=${l}` : "")).then((e => {
                        const r = `seasonSummary.${t}.${a}.positionSummaries.${o}.` + (l ? `championSummary.${l}` : "positionSummary");
                        return s.Lodash.get(e, r).stats[n.CAREER_STATS_KEY]
                    })).catch((n => (s.logger.warning(`cannot load career stats summary of season for ${e}(season ${t}, queue ${a}, position ${o}, champId ${l}): ${n}`), null)))
                },
                getChampionExperts(e, t, a) {
                    return this._loadExperts(t, e, a)
                },
                getPositionExperts(e, t) {
                    return this._loadExperts(e, null, t)
                },
                getPositionStatPercentiles(e) {
                    return this.get("api.careerStats").post("/v1/position-stats-percentiles", e).then((e => (0, o.convertPercentilesToQueuePositionMap)(e)))
                },
                getChampionStatPercentiles(e, t) {
                    return this.get("api.careerStats").post("/v1/champion-stats-percentiles", s.Lodash.map(t, (t => s.Lodash.assign({
                        championId: e
                    }, t)))).then((e => (0, o.convertPercentilesToQueuePositionMap)(e)))
                },
                searchSummonerBySummonerName(e) {
                    return this.get("api.summoner").get(`/v1/summoners?name=${encodeURIComponent(e)}`)
                },
                searchSummonerByPuuid(e) {
                    return this.get("api.summoner").get(`/v2/summoners/puuid/${e}`)
                },
                searchSummonersByAliases(e) {
                    return this.get("api.summoner").post("/v1/summoners/aliases", e)
                },
                loadSummonerById(e) {
                    return this.get("api.summoner").get(`/v1/summoners/${e}`)
                },
                loadChampionSplashPath(e) {
                    return this.get("api.gameData").get(`/assets/v1/champions/${e}.json`).then((e => {
                        const {
                            skins: t
                        } = e;
                        if (t) return t[0].splashPath
                    }))
                },
                loadRecentlyPlayedWithSummoners() {
                    const e = this.get("maxRecentlyPlayedWithSummoners");
                    return this.get("api.matchHistory").get("v1/recently-played-summoners").then((t => {
                        const a = s.Lodash.take(s.Lodash.sortBy(t, "gameId").reverse(), e);
                        return this._loadSummonerIcons(s.Lodash.map(a, "summonerId")).then((e => s.Lodash.map(a, (t => ({
                            puuid: t.puuid,
                            summonerId: t.summonerId,
                            displayName: t.summonerName,
                            gameName: t.gameName,
                            tagLine: t.tagLine,
                            profileIconId: s.Lodash.get(e, `${t.summonerId}.profileIconId`)
                        })))))
                    }))
                },
                loadRecentlyComparedSummoners() {
                    return this._loadRecentlyComparedSummonerIds().then((e => this._loadSummoners(e, !1)))
                },
                setRecentlyComparedSummoner(e) {
                    const t = this.get("api.settings"),
                        a = this.get("maxRecentlyComparedSummoners");
                    return this._loadRecentlyComparedSummonerIds().then((n => {
                        let o = n || [];
                        return o = s.Lodash.take(s.Lodash.without(o, e), a - 1), o.splice(0, 0, e), t.patch("/v1/account/career-stats-settings", {
                            schemaVersion: 1,
                            data: {
                                recentlyComparedSummoners: o
                            }
                        })
                    }))
                },
                loadMatchSummary(e, t) {
                    const a = this.get("indexedChampions"),
                        n = this.get("api.matchHistory");
                    return Promise.all([n.get(`/v1/games/${e}`).catch((e => (s.logger.warning("Error loading match history", e), null))), n.get(`/v1/game-timelines/${e}`).catch((e => (s.logger.warning("Error loading game timelines", e), null)))]).then((n => {
                        const o = n[0],
                            l = n[1];
                        if (!o || !l) return s.logger.warning(`Error loading match history gameId ${e}`), null;
                        const r = s.Lodash.find(o.participants, (e => e.participantId === t)),
                            i = this._findOpponentParticipantId(o, l, t),
                            c = s.Lodash.find(o.participants, (e => e.participantId === i));
                        let m, p;
                        return s.Lodash.each(o.participantIdentities, (e => {
                            e.participantId === r.participantId && (m = e.player.summonerId), e.participantId === c.participantId && (p = e.player.summonerId)
                        })), {
                            gameId: e,
                            playerSummonerId: m,
                            opponentSummonerId: p,
                            player: this._getPlayerMatchSummary(r, a),
                            opponent: this._getPlayerMatchSummary(c, a)
                        }
                    }))
                },
                checkWelcomeModalStatus() {
                    const e = this.get("api.settings"),
                        t = this.get("currentSeason"),
                        a = this.get("earliestSeason");
                    return e.get("/v1/account/career-stats-settings").then((e => {
                        let n = s.Lodash.get(e, "data.welcomedSeason");
                        return !n && s.Lodash.get(e, "data.initialVisited") && (n = a), n !== t
                    }))
                },
                setWelcomedSeason(e) {
                    if (e !== n.INVALID_CURRENT_SEASON) {
                        return this.get("api.settings").patch("/v1/account/career-stats-settings", {
                            schemaVersion: 1,
                            data: {
                                welcomedSeason: e
                            }
                        })
                    }
                },
                getSeasonDisplayTra(e) {
                    const t = this.get("seasonDataMap").get(e);
                    if (!t) return "";
                    const {
                        seasonYear: a,
                        currentSplit: s
                    } = t, n = t.currentSplit + t.totalSplit > 0, o = this.get("careerStatsTra");
                    return n ? o.formatString("career_stats_split_season", {
                        seasonYear: a,
                        splitNumber: s
                    }) : o.formatString("career_stats_no_split_season", {
                        seasonYear: a
                    })
                },
                _loadGameData() {
                    return Promise.all([this.get("api.gameData").get("/assets/v1/champion-summary.json").then((e => {
                        const t = e,
                            a = this.get("careerStatsTra");
                        t.forEach((e => {
                            const t = `champion_local_search_colloq_${e.id}`,
                                n = a.exists(t) ? a.get(t) : "",
                                o = (0, s.Lodash)(n.split(";")).filter((e => e.length > 0)).map((e => e.toLocaleLowerCase())).value(),
                                l = e.name.toLocaleLowerCase();
                            s.Lodash.includes(o, l) || o.push(l), s.Lodash.assign(e, {
                                searchTerms: o
                            })
                        })), this.set("championSummary", t), this.set("indexedChampions", s.Lodash.reduce(t, ((e, t) => (e[t.id] = t, e)), {}))
                    })), this.get("api.gameData").get("/assets/v1/queues.json").then((e => {
                        this.set("queues", e)
                    }))]).then((() => {
                        this.set("isGameDataLoaded", !0)
                    }))
                },
                _loadSeasonAndSplitSettings() {
                    const e = this.get("api.platformConfig"),
                        t = this.get("api.lolSeasons");
                    return e.get("/v1/namespaces/CareerStats").then((e => {
                        const a = e && s.Lodash.get(e, "YearsAllowedToQuerySeasonData") || n.DEFAULT_PREV_SEASON_YEAR_COUNT;
                        t.post("/v1/allSeasons/product/LOL", {
                            lastNYears: a
                        }).then((e => {
                            this._populateSeasonDataMap(e), this._calculateEarliestAndCurrentSeason(), this.set("isSeasonSettingLoaded", !0)
                        }))
                    }))
                },
                _handleHttpError: (e, t, a) => 404 === s.Lodash.get(e, "status") ? null : (s.logger.warning(`cannot load ${t} for ${a}: ${e}`), {
                    error: !0
                }),
                _loadSummoners(e) {
                    return this.get("api.summoner").get(`/v2/summoners?ids=${JSON.stringify(e)}`)
                },
                _loadSummonerIcons(e) {
                    return this.get("api.summoner").get(`/v2/summoner-icons?ids=${JSON.stringify(e)}`).then((e => s.Lodash.keyBy(e, "summonerId")))
                },
                _loadExperts(e, t, a) {
                    const o = this.get("api.careerStats"),
                        l = this.get("currentSeason"),
                        r = a && a !== l ? `/season/${a}` : "",
                        i = (t ? "champion" : "position") + "-experts",
                        c = `${t?t+"/":""}${e}`;
                    return o.get(`/v1/${i}${r}/${c}`).then((e => {
                        if (!s.Lodash.get(e, "length")) return Promise.resolve([]);
                        const t = s.Lodash.map(e, "summonerId");
                        return Promise.all([this._loadSummonerIcons(t), this._loadSummonersRankedInfo(t, n.EXPERT_GAME_QUEUE), this._loadSummoners(t)]).then((t => {
                            const a = t[0],
                                s = t[1],
                                n = t[2].reduce(((e, t) => (e[t.summonerId] = t, e)), {});
                            return this._enrichExperts(a, e, s, n)
                        }))
                    }))
                },
                _loadRecentlyComparedSummonerIds() {
                    return this.get("api.settings").get("/v1/account/career-stats-settings").then((e => s.Lodash.get(e, "data.recentlyComparedSummoners") || []))
                },
                _loadSummonersRankedInfo(e, t) {
                    const a = n.LEAGUES_QUEUE_TYPE_MAP[t];
                    return this.get("api.ranked").get(`/v2/tiers?summonerIds=${JSON.stringify(e)}&queueTypes=[${a}]`).then((e => s.Lodash.keyBy(s.Lodash.map(e, (e => s.Lodash.assign({
                        summonerId: e.summonerId
                    }, e.achievedTiers[0]))), "summonerId")))
                },
                _enrichExperts(e, t, a, n) {
                    const l = this.get("careerStatsTra");
                    return s.Lodash.sortBy(s.Lodash.map(t, (t => {
                        const r = t.summonerId,
                            i = s.Lodash.get(a, r),
                            c = s.Lodash.get(i, "tier"),
                            m = s.Lodash.get(i, "division"),
                            p = s.LeagueTierNames.getFullTierDivisionName(c, m),
                            d = n[r],
                            {
                                gameName: u,
                                tagLine: h,
                                puuid: g
                            } = d;
                        return s.Lodash.assign(t, {
                            rank: i,
                            rankDisplay: p,
                            summonerId: r,
                            puuid: g,
                            displayName: t.summonerName,
                            gameName: u,
                            tagLine: h,
                            profileIconId: s.Lodash.get(e, `${r}.profileIconId`),
                            subtitles: {
                                numOfGamesDisplay: l.formatString("career_stats_expert_subtitle_games_played", {
                                    number: t.numOfGames
                                }),
                                winRateDisplay: this.get("careerStatsTra").formatString("career_stats_win_rate_percent", {
                                    number: (0, o.getWinRateDisplay)(t.winRate, 0)
                                })
                            }
                        })
                    })), "expertRank")
                },
                _enrichStatsData(e) {
                    const t = e.filter((e => e.stats[n.CAREER_STATS_KEY] && s.Lodash.includes(n.POSITIONS, (0, o.inferPosition)(e))));
                    t.sort(((e, t) => t.timestamp - e.timestamp));
                    const a = {
                        games: t,
                        season: {
                            queues: {},
                            champions: {}
                        }
                    };
                    return s.Lodash.each(t, (e => {
                        this._addSeasonStats(a.season, e)
                    })), a
                },
                _addSeasonStats(e, t) {
                    const {
                        queueType: a,
                        championId: l
                    } = t, r = (0, o.inferPosition)(t), i = t.stats[n.CAREER_STATS_KEY];
                    s.Lodash.each(i, ((t, a) => {
                        e[a] = s.Lodash.add(e[a], t)
                    })), e.queues[a] || (e.queues[a] = {
                        queue: a,
                        positions: {
                            ALL: {}
                        }
                    });
                    const c = e.queues[a];
                    c.timePlayed = s.Lodash.add(c.timePlayed, i.timePlayed), c.wins = s.Lodash.add(c.wins, i.victory), c.losses = s.Lodash.add(c.losses, i.defeat), c.positions[r] || (c.positions[r] = {});
                    const m = c.positions[r];
                    s.Lodash.each(i, ((e, t) => {
                        m[t] = s.Lodash.add(m[t], e), c.positions.ALL[t] = s.Lodash.add(c.positions.ALL[t], e)
                    })), this._addToChampionOverviews(e.champions, l, a, r)
                },
                _addToChampionOverviews(e, t, a, n) {
                    e[t] || (e[t] = {}), e[t][a] || (e[t][a] = {}), e[t][a][n] = s.Lodash.add(e[t][a][n], 1)
                },
                _findOpponentParticipantId: (e, t, a) => (0, l.findOpponentParticipants)(e, t)[a],
                _getPlayerMatchSummary(e, t) {
                    return {
                        championId: e.championId,
                        championIconPath: t[e.championId].squarePortraitPath,
                        level: e.stats.champLevel,
                        kda: `${e.stats.kills} / ${e.stats.deaths} / ${e.stats.assists}`,
                        gold: this.formatNumber(e.stats.goldEarned),
                        victory: e.stats.win
                    }
                },
                _populateSeasonDataMap(e) {
                    const t = new Map;
                    e && e.map((e => {
                        const a = {
                            seasonStart: e.seasonStart,
                            seasonEnd: e.seasonEnd,
                            currentSplit: e.metadata.currentSplit,
                            totalSplit: e.metadata.totalSplit,
                            seasonYear: this._getSeasonYear(e)
                        };
                        t.set(e.seasonId, a)
                    })), this.set("seasonDataMap", t)
                },
                _calculateEarliestAndCurrentSeason() {
                    const e = this.get("seasonDataMap");
                    if (e && 0 !== e.size) {
                        const t = [...e.keys()];
                        this.set("currentSeason", Math.max(...t)), this.set("earliestSeason", Math.min(...t))
                    }
                },
                _getSeasonYear(e) {
                    if (e) {
                        const {
                            currentSplit: t,
                            totalSplit: a,
                            year: s
                        } = e.metadata;
                        return t + a > 0 ? s || new Date(e.seasonStart).getFullYear() : new Date(e.seasonEnd).getFullYear()
                    }
                }
            });
            t.default = i
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.findOpponentParticipants = void 0;
            var s = a(1);
            const n = ["TOP", "JUNGLE", "MID", "BOTTOM", "SUPPORT"],
                o = {
                    BOTTOM: {
                        100: {
                            distanceP50: [12314.9, 12107.8, 11921.8, 11733.4, 11966.5, 11718.6, 11697.1, 11750.2],
                            distanceStd: [1388.5, 2225.9, 2850.7, 3117.8, 3013.3, 3198.4, 3190.9, 3252.7],
                            angleP25: [.152, .136, .138, .138, .143, .141, .14, .143],
                            angleStd: [.16, .167, .174, .179, .175, .185, .193, .206],
                            angleP75: [.189, .228, .229, .234, .223, .239, .249, .248],
                            minionsP50: [2, 10, 18, 25, 32, 39, 47, 53],
                            minionsStd: [1.34, 3.95, 5.71, 7.48, 9.09, 10.73, 12.44, 14.12],
                            monstersP50: [0, 0, 0, 0, 0, 0, 0, 0],
                            monstersStd: [.52, 1.05, 1.48, 1.83, 2.18, 2.52, 2.98, 3.39]
                        },
                        200: {
                            distanceP50: [12253.5, 12200.5, 11861.5, 11518.1, 11774.9, 11613.6, 11507.9, 11649.3],
                            distanceStd: [1256.8, 2289, 2866.6, 3098.2, 3016.7, 3193.1, 3180.4, 3248.3],
                            angleP25: [.14, .12, .119, .115, .124, .121, .119, .124],
                            angleStd: [.147, .16, .168, .174, .17, .178, .185, .2],
                            angleP75: [.18, .213, .21, .211, .201, .218, .227, .229],
                            minionsP50: [2, 11, 18, 25, 32, 40, 47, 54],
                            minionsStd: [1.41, 3.99, 5.74, 7.48, 9.09, 10.74, 12.43, 14.11],
                            monstersP50: [0, 0, 0, 0, 0, 0, 0, 0],
                            monstersStd: [.52, 1.05, 1.48, 1.85, 2.22, 2.56, 2.98, 3.41]
                        }
                    },
                    JUNGLE: {
                        100: {
                            distanceP50: [8796.2, 9713.3, 9156.8, 8987.5, 9196.4, 8774, 9037.3, 9391.2],
                            distanceStd: [1748.3, 2327, 2870.2, 2997.4, 3010.7, 2708.2, 2793.1, 2894],
                            angleP25: [.638, .933, .569, .326, .399, .435, .453, .564],
                            angleStd: [.273, .282, .362, .359, .367, .337, .367, .363],
                            angleP75: [1.078, 1.22, 1.173, .959, 1.041, .904, 1.105, 1.165],
                            minionsP50: [0, 0, 0, 0, 0, 1, 2, 2],
                            minionsStd: [.55, 1.92, 3.28, 4.62, 5.92, 7.2, 8.44, 9.66],
                            monstersP50: [4, 12, 16, 20, 24, 28, 35, 40],
                            monstersStd: [1.74, 4.11, 5.3, 6.16, 7.03, 8.16, 9.43, 10.54]
                        },
                        200: {
                            distanceP50: [8500.6, 9252.3, 8880.2, 8736.7, 9146.1, 8745.9, 8754.6, 9043.2],
                            distanceStd: [1767.3, 2428.9, 2840.7, 3012, 2958.3, 2757.1, 2793.4, 2888.4],
                            angleP25: [.369, .731, .514, .419, .426, .403, .396, .489],
                            angleStd: [.306, .31, .374, .379, .369, .36, .367, .371],
                            angleP75: [.935, 1.13, 1.178, 1.035, 1.008, .993, 1.039, 1.117],
                            minionsP50: [0, 0, 0, 0, 0, 1, 2, 2],
                            minionsStd: [.54, 1.96, 3.32, 4.68, 6.01, 7.31, 8.58, 9.81],
                            monstersP50: [4, 12, 16, 20, 24, 28, 32, 39],
                            monstersStd: [1.99, 4.01, 5.21, 6.08, 7.1, 8.08, 9.21, 10.47]
                        }
                    },
                    MID: {
                        100: {
                            distanceP50: [10108.2, 9970.6, 9838, 9806.4, 9826.8, 9877.9, 9877.9, 9833.7],
                            distanceStd: [987.8, 1947.3, 2663.8, 2724, 2565.5, 2900.7, 2756.9, 2725.4],
                            angleP25: [.78, .778, .772, .768, .766, .746, .745, .758],
                            angleStd: [.116, .132, .14, .145, .153, .184, .207, .211],
                            angleP75: [.814, .82, .817, .815, .816, .814, .827, .836],
                            minionsP50: [4, 11, 18, 25, 33, 40, 47, 54],
                            minionsStd: [1.57, 3.56, 5.31, 6.91, 8.54, 9.95, 11.51, 13.13],
                            monstersP50: [0, 0, 0, 0, 0, 0, 0, 0],
                            monstersStd: [.6, 1.36, 1.94, 2.4, 2.84, 3.3, 4, 4.66]
                        },
                        200: {
                            distanceP50: [9979.5, 9896, 9715.9, 9687.3, 9722, 9632, 9775.5, 9830.2],
                            distanceStd: [985.9, 1906, 2634, 2691.5, 2558.8, 2807.2, 2724.7, 2761.7],
                            angleP25: [.748, .751, .745, .741, .74, .666, .682, .721],
                            angleStd: [.119, .132, .143, .146, .154, .194, .205, .21],
                            angleP75: [.786, .794, .791, .788, .788, .784, .787, .794],
                            minionsP50: [4, 11, 18, 26, 33, 40, 47, 54],
                            minionsStd: [1.57, 3.59, 5.34, 6.95, 8.56, 9.97, 11.55, 13.19],
                            monstersP50: [0, 0, 0, 0, 0, 0, 0, 0],
                            monstersStd: [.63, 1.35, 1.93, 2.39, 2.85, 3.35, 4.14, 4.71]
                        }
                    },
                    TOP: {
                        100: {
                            distanceP50: [12548.9, 12264.5, 11892.4, 11725.5, 12020.5, 11708.8, 11699, 11967.7],
                            distanceStd: [1194.8, 2259.4, 3093.6, 3129.4, 2972.7, 3357.2, 3241.2, 3236.3],
                            angleP25: [1.383, 1.338, 1.336, 1.335, 1.345, 1.324, 1.313, 1.308],
                            angleStd: [.172, .18, .201, .207, .203, .225, .228, .238],
                            angleP75: [1.423, 1.437, 1.441, 1.446, 1.436, 1.436, 1.438, 1.429],
                            minionsP50: [2, 10, 17, 24, 31, 39, 46, 53],
                            minionsStd: [1.29, 3.51, 4.94, 6.65, 8.23, 9.71, 11.35, 12.94],
                            monstersP50: [0, 0, 0, 0, 0, 0, 0, 0],
                            monstersStd: [.48, 1.13, 1.6, 1.99, 2.36, 2.75, 3.27, 3.72]
                        },
                        200: {
                            distanceP50: [12270.4, 11914.2, 11667.6, 11660.7, 11926.2, 11555.2, 11498.6, 11731.5],
                            distanceStd: [1180.6, 2287.3, 3038.9, 3086.1, 2914.2, 3324.8, 3212.5, 3174.7],
                            angleP25: [1.382, 1.336, 1.331, 1.326, 1.339, 1.321, 1.312, 1.312],
                            angleStd: [.185, .193, .213, .216, .211, .234, .24, .248],
                            angleP75: [1.422, 1.439, 1.44, 1.442, 1.432, 1.435, 1.438, 1.431],
                            minionsP50: [2, 10, 16, 24, 31, 38, 46, 53],
                            minionsStd: [1.29, 3.47, 4.94, 6.69, 8.26, 9.74, 11.38, 12.95],
                            monstersP50: [0, 0, 0, 0, 0, 0, 0, 0],
                            monstersStd: [.53, 1.14, 1.62, 2.02, 2.44, 2.82, 3.28, 3.76]
                        }
                    },
                    SUPPORT: {
                        100: {
                            distanceP50: [12332.3, 12155, 11920.5, 11690.2, 11886.5, 11623.6, 11629.3, 11571.8],
                            distanceStd: [1492.9, 2245.1, 2973.8, 3269.1, 3199.4, 3341.2, 3275.1, 3403.3],
                            angleP25: [.143, .131, .135, .138, .142, .142, .143, .145],
                            angleStd: [.148, .151, .168, .179, .183, .194, .202, .227],
                            angleP75: [.194, .226, .232, .242, .236, .252, .264, .272],
                            minionsP50: [0, 1, 2, 4, 5, 6, 8, 9],
                            minionsStd: [.9, 2.34, 3.76, 5.16, 6.51, 7.93, 9.34, 10.68],
                            monstersP50: [0, 0, 0, 0, 0, 0, 0, 0],
                            monstersStd: [.47, .9, 1.25, 1.55, 1.82, 2.12, 2.49, 2.84]
                        },
                        200: {
                            distanceP50: [12296.9, 12248.3, 11853.9, 11476.6, 11699.8, 11524, 11425.6, 11477],
                            distanceStd: [1437.9, 2289.7, 2953.4, 3233.6, 3203.7, 3317.8, 3269.1, 3397.9],
                            angleP25: [.129, .116, .117, .117, .122, .122, .123, .127],
                            angleStd: [.142, .146, .163, .173, .179, .189, .198, .224],
                            angleP75: [.186, .211, .212, .219, .215, .233, .245, .257],
                            minionsP50: [0, 1, 3, 4, 5, 6, 8, 9],
                            minionsStd: [.98, 2.38, 3.81, 5.18, 6.54, 7.98, 9.38, 10.73],
                            monstersP50: [0, 0, 0, 0, 0, 0, 0, 0],
                            monstersStd: [.44, .85, 1.18, 1.47, 1.76, 2.03, 2.36, 2.71]
                        }
                    }
                },
                l = function(e, t, a, s) {
                    return Math.abs(e - t) / (a * s * 4 + .01)
                };
            t.findOpponentParticipants = function(e, t) {
                const a = s.Lodash.keyBy(e.participants, "participantId"),
                    r = function(e, t) {
                        const a = s.Lodash.reduce(e, ((t, a) => (t[a.participantId] = {
                            participantId: a.participantId,
                            teamId: e[a.participantId].teamId
                        }, s.Lodash.each(n, (e => {
                            t[a.participantId][e] = 0
                        })), t)), {});
                        return s.Lodash.each(t.frames, ((t, r) => {
                            r >= 2 && r <= 9 && s.Lodash.each(t.participantFrames, (t => {
                                if (!t.position) return;
                                const i = r - 2,
                                    {
                                        teamId: c
                                    } = e[t.participantId],
                                    m = 100 === c,
                                    p = m ? t.position.x : 14820 - t.position.x,
                                    d = m ? t.position.y : 14881 - t.position.y,
                                    u = Math.sqrt(p * p + d * d),
                                    h = m ? Math.atan(d / p) : Math.PI / 2 - Math.atan(d / p),
                                    g = t.minionsKilled,
                                    _ = t.jungleMinionsKilled;
                                s.Lodash.each(n, (e => {
                                    const s = o[e][c];
                                    a[t.participantId][e] += l(s.distanceP50[i], u, s.distanceStd[i], r) + l(s.minionsP50[i], g, s.minionsStd[i], r) + l(s.monstersP50[i], _, s.monstersStd[i], r) + l(s.angleP25[i], h, s.angleStd[i], r) + l(s.angleP75[i], h, s.angleStd[i], r)
                                }))
                            }))
                        })), a
                    }(a, t),
                    i = function(e, t) {
                        const a = s.Lodash.sortBy(s.Lodash.reduce(t, ((e, t) => (s.Lodash.each(n, (a => {
                                e.push({
                                    participantId: t.participantId,
                                    teamId: t.teamId,
                                    position: a,
                                    score: t[a]
                                })
                            })), e)), []), "score"),
                            o = {
                                100: {},
                                200: {},
                                participants: {}
                            },
                            l = [];
                        let r = 0;
                        for (; l.length < s.Lodash.keys(e).length && r < a.length;) {
                            const {
                                teamId: e,
                                participantId: t,
                                position: n
                            } = a[r];
                            o[e][n] || s.Lodash.includes(l, t) || (o[e][n] = t, o.participants[t] = n, l.push(t)), r++
                        }
                        return o
                    }(a, r),
                    c = {};
                return s.Lodash.each(i.participants, ((e, t) => {
                    const s = 300 - a[t].teamId;
                    c[t] = i[s][e]
                })), c
            }
        }, e => {
            "use strict";

            function t(e) {
                const a = {};
                for (const s in e) "object" == typeof e[s] ? a[s] = t(e[s]) : a[s] = e[s];
                return a
            }

            function a(e, t, a) {
                const {
                    regions: s,
                    region: n,
                    locale: o
                } = e.metadata();
                if ((a = a.get("metadata." + t)) && "region" === t && a.id !== n.id) {
                    const t = s[a.id],
                        n = t.defaultLocale ? t.defaultLocale.id : t.availableLocales[0].id;
                    e.setLocale(n, a.id)
                } else a && "locale" === t && a.id !== o.id && e.setLocale(a.id)
            }
            e.exports = function(e, s, n) {
                let o;
                const l = {
                    metadata: !0,
                    moment: !0
                };
                return s = s.observe((() => {
                    if (o) {
                        const e = t(s.metadata());
                        o.set("metadata", e), o.beginPropertyChanges(), Object.keys(l).forEach((e => {
                            o.propertyWillChange(e), o.propertyDidChange(e)
                        })), o.endPropertyChanges()
                    }
                })), o = e.Service.extend({
                    _tra: null,
                    init() {
                        this.wrapTra(s)
                    },
                    wrapTra(e) {
                        e && (this._tra = e, this.set("metadata", t(this._tra.metadata())), this.setLocale = this._tra.setLocale.bind(this._tra), this.formatString = this._tra.formatString.bind(this._tra), this.moment = this._tra.moment.bind(this._tra), this.ready = this._tra.ready.bind(this._tra), this.exists = this._tra.exists.bind(this._tra), this.getAsync = this._tra.getAsync.bind(this._tra), this.existsAsync = this._tra.existsAsync.bind(this._tra), this.numeral = this._tra.numeral.bind(this._tra))
                    },
                    unknownProperty(e) {
                        return l[e] = !0, this._tra.get(e)
                    },
                    willDestroy: () => this._tra.unregister(),
                    addOverlays: function(e) {
                        let t = this._tra;
                        for (const a of e) t = t.overlay(a);
                        t && this.wrapTra(t)
                    }
                }).create(), o.set("service", o), o.addObserver("metadata.region", a.bind(null, s, "region")), o.addObserver("metadata.locale", a.bind(null, s, "locale")), n && (console.warning("deprecated: pass a traService as a property of your Ember application definition"), n.register("tra:main", o, {
                    instantiate: !1
                }), n.inject("component", "tra", "tra:main"), n.inject("controller", "tra", "tra:main"), n.inject("view", "tra", "tra:main"), n.inject("model", "tra", "tra:main"), n.inject("route", "tra", "tra:main"), n.inject("service", "tra", "tra:main")), o
            }
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = a(1);
            a(37);
            var n = a(12);
            const o = (0, s.emberDataBinding)({
                Ember: s.Ember,
                websocket: (0, s.getProvider)().getSocket(),
                basePaths: {
                    summoner: "/lol-summoner"
                }
            });
            var l = s.Ember.Component.extend(o, {
                layout: a(38),
                classNames: ["career-stats-root-component"],
                classNameBindings: ["isThirdPersonView"],
                careerStatsService: s.Ember.inject.service("careerStats"),
                earliestSeason: s.Ember.computed.readOnly("careerStatsService.earliestSeason"),
                currentSeason: s.Ember.computed.readOnly("careerStatsService.currentSeason"),
                isSeasonSettingLoaded: s.Ember.computed.readOnly("careerStatsService.isSeasonSettingLoaded"),
                profileReenterred: !0,
                welcomeModalObserver: s.Ember.on("init", s.Ember.observer("isThirdPersonView", "isSeasonSettingLoaded", (function() {
                    const e = this.get("isThirdPersonView"),
                        t = this.get("isSeasonSettingLoaded"),
                        a = this.get("careerStatsService"),
                        s = a.get("earliestSeason"),
                        o = a.get("currentSeason");
                    !e && t && o !== n.INVALID_CURRENT_SEASON && a.checkWelcomeModalStatus().then((e => {
                        e && (this._showWelcomeModal(o, s), a.setWelcomedSeason(o))
                    }))
                }))),
                init: function() {
                    this._super.apply(this, arguments);
                    const e = this.get("overlayMode"),
                        t = this.get("summonerId");
                    this.set("isThirdPersonView", e), this.get("api.summoner").get(e ? `/v1/summoners/${t}` : "/v1/current-summoner").then((e => {
                        this.set("summoner", e)
                    }))
                },
                didInsertElement: function() {
                    this._super(...arguments);
                    const e = s.emberApplicationFactory.getRootDOMNode(this.element);
                    this.set("rootDOMNode", e), this.set("profileReenterredListener", (() => {
                        this.toggleProperty("profileReenterred")
                    })), e.addEventListener("profileReentered", this.get("profileReenterredListener"))
                },
                willDestroyElement: function() {
                    this._super(...arguments);
                    this.get("rootDOMNode").removeEventListener("profileReentered", this.get("profileReenterredListener"))
                },
                _showWelcomeModal(e, t) {
                    const a = e === t,
                        n = this.get("careerStatsService"),
                        o = this.get("tra"),
                        l = s.componentFactory.create("CareerStatsWelcomeModalComponent", {
                            season: e,
                            isEarliestSeason: a,
                            careerStatsService: n
                        }),
                        r = s.ModalManager.add({
                            type: "DialogAlert",
                            data: {
                                contents: l.domNode,
                                dismissible: !1,
                                enterEnabled: !1,
                                okText: a ? o.get("career_stats_welcome_modal_ok_text") : o.formatString("career_stats_welcome_modal_ok_text_new_season", {
                                    season: n.getSeasonDisplayTra(e)
                                })
                            }
                        });
                    r.okPromise.then((() => {
                        s.ModalManager.remove(r), s.Telemetry.invokeWithLowProbability((function() {
                            s.Telemetry.recordNonTimingTracingEvent("career-stats-seen", 1, "click")
                        })), l && l.componentPromise && l.componentPromise.then((e => s.Ember.run((() => {
                            e.app.destroy()
                        }))))
                    })).catch((() => {}))
                }
            });
            t.default = l
        }, (e, t, a) => {
            "use strict";
            a.r(t)
        }, (e, t, a) => {
            const s = a(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "XWz2juFZ",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\career-stats-root-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\career-stats-root-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\career-stats-root-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","stats-backdrop"],["flush-element"],["close-element"],["text","\\n"],["append",["helper",["career-stats-overview"],null,[["summoner","isThirdPersonView","profileReenterred"],[["get",["summoner"]],["get",["isThirdPersonView"]],["get",["profileReenterred"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = a(1);
            a(40);
            var n, o = a(12),
                l = a(6),
                r = (n = a(8)) && n.__esModule ? n : {
                    default: n
                },
                i = a(11);
            var c = s.Ember.Component.extend({
                layout: a(41),
                classNames: ["career-stats-overview-component"],
                classNameBindings: ["isStatsLoaded", "isThirdPersonView"],
                careerStatsService: s.Ember.inject.service("careerStats"),
                earliestSeason: s.Ember.computed.readOnly("careerStatsService.earliestSeason"),
                currentSeason: s.Ember.computed.readOnly("careerStatsService.currentSeason"),
                isSeasonSettingLoaded: s.Ember.computed.readOnly("careerStatsService.isSeasonSettingLoaded"),
                isCurrentSeason: s.Ember.computed("currentSeason", "currentTimeFilter.season", (function() {
                    return this.get("currentSeason") === this.get("currentTimeFilter.season")
                })),
                isCurrentSeason2018: s.Ember.computed("currentTimeFilter.season", (function() {
                    return this.get("currentTimeFilter.season") === o.SEASON_2018_NUM
                })),
                calculateCareerStatsFromRawTotals: i.calculateCareerStatsFromRawTotals,
                calculateCategoryPercentiles: i.calculateCategoryPercentiles,
                calculateGradesAndBestPlaystyle: i.calculateGradesAndBestPlaystyle,
                isStatsEmpty: !0,
                isStatsLoaded: !0,
                serverError: !1,
                queueFilters: s.Ember.computed("tra", "statsOverview.season.queues", (function() {
                    const e = s.Lodash.keys(this.get("statsOverview.season.queues"));
                    return s.Ember.A(s.Lodash.map(o.QUEUE_FILTERS, (t => s.Ember.Object.create(s.Lodash.assign({
                        displayName: this.get("tra").get(`career_stats_queue_filter_${t.traKey}`),
                        selected: !1,
                        disabled: !s.Lodash.includes(e, t.queueTypes[0])
                    }, t)))))
                })),
                timeFilters: s.Ember.computed("tra", "earliestSeason", "currentSeason", "isSeasonSettingLoaded", (function() {
                    if (!this.get("isSeasonSettingLoaded")) return s.Ember.A();
                    const e = this.get("earliestSeason"),
                        t = this.get("currentSeason"),
                        a = this.get("tra"),
                        n = s.Lodash.map(o.TIME_FILTERS, (e => s.Ember.Object.create(s.Lodash.assign({
                            displayName: e.includeAll ? a.get(`career_stats_time_filter_${e.traKey}`) : a.formatString(`career_stats_time_filter_${e.traKey}`, {
                                length: e.length
                            }),
                            season: t === o.INVALID_CURRENT_SEASON ? void 0 : t,
                            selected: !1
                        }, e))));
                    for (let a = t === e ? e : t - 1; a >= e; a--) n.push(s.Ember.Object.create({
                        key: `previous-${a}`,
                        season: a,
                        displayName: this.get("careerStatsService").getSeasonDisplayTra(a),
                        selected: !1,
                        includeAll: !0
                    }));
                    const l = s.Ember.A(n);
                    return s.Ember.run.next((() => {
                        this.send("selectTimeFilter", l[0])
                    })), l
                })),
                currentSeasonName: s.Ember.computed("currentTimeFilter.season", "tra", (function() {
                    const e = this.get("currentTimeFilter.season");
                    return e ? this.get("careerStatsService").getSeasonDisplayTra(e) : ""
                })),
                emptyStatsMessage: s.Ember.computed("isCurrentSeason2018", "tra.career_stats_empty_stats_message_line_1_2018", "tra.career_stats_empty_stats_message_line_1", (function() {
                    return this.get("tra").get(this.get("isCurrentSeason2018") ? "career_stats_empty_stats_message_line_1_2018" : "career_stats_empty_stats_message_line_1")
                })),
                legacyTooltipDisplays: s.Ember.computed("currentSeasonName", "tra.career_stats_tooltip_season_games_played", "tra.career_stats_tooltip_season_time_played", "tra.career_stats_tooltip_season_multi_kills", (function() {
                    const e = this.get("currentSeasonName"),
                        t = this.get("tra");
                    return {
                        gamesPlayed: t.formatString("career_stats_tooltip_season_games_played", {
                            season: e
                        }),
                        timePlayed: t.formatString("career_stats_tooltip_season_time_played", {
                            season: e
                        }),
                        multiKills: t.formatString("career_stats_tooltip_season_multi_kills", {
                            season: e
                        })
                    }
                })),
                sortOptions: s.Ember.computed("tra", (function() {
                    return s.Ember.A(s.Lodash.map(o.SORT_OPTIONS, (e => s.Ember.Object.create(s.Lodash.assign({
                        displayName: this.get("tra").get(`career_stats_sort_option_${e.traKey}`),
                        selected: !1
                    }, e)))))
                })),
                profileReenterredObserver: s.Ember.observer("profileReenterred", (function() {
                    this._loadSummonerStats()
                })),
                summonerObserver: s.Ember.on("init", s.Ember.observer("summoner.puuid", (function() {
                    this._loadSummonerStats()
                }))),
                positionGradesObserver: s.Ember.on("init", s.Ember.observer("positionGrades", (function() {
                    s.Ember.run.once(this, "_onPositionGradesChanged")
                }))),
                playStyleSummary: s.Ember.computed("queuePositionPercentiles", "currentQueueFilter.queueTypes.0", "statsOverview", (function() {
                    const e = this.get("currentQueueFilter.queueTypes.0"),
                        t = this.get("queuePositionPercentiles"),
                        a = s.Lodash.get(this.get("statsOverview"), `season.queues.${e}.positions.ALL`);
                    if (!e || !t || !a) return [];
                    const n = this.calculateCareerStatsFromRawTotals(a);
                    return this.calculateCategoryPercentiles(n, s.Lodash.get(t, `${e}.ALL`))
                })),
                positionGrades: s.Ember.computed("queuePositionPercentiles", "currentQueueFilter.queueTypes.0", "statsOverview", (function() {
                    const e = this.get("currentQueueFilter.queueTypes.0"),
                        t = this.get("queuePositionPercentiles"),
                        a = s.Lodash.get(this.get("statsOverview"), `season.queues.${e}.positions`);
                    if (!(e && t && t[e] && a)) return null;
                    const n = {};
                    return s.Lodash.each(a, ((a, o) => {
                        const l = this.calculateCareerStatsFromRawTotals(a),
                            r = this.calculateCategoryPercentiles(l, t[e][o]);
                        n[o] = s.Lodash.assign({
                            winRate: a.victory / a.gamePlayed
                        }, this.calculateGradesAndBestPlaystyle(r))
                    })), n
                })),
                seasonTimePlayedDisplay: s.Ember.computed("statsOverview.season.timePlayed", (function() {
                    return this.get("careerStatsService").formatDurationFromMillis(this.get("statsOverview.season.timePlayed"))
                })),
                seasonKdaRatioDisplay: s.Ember.computed("statsOverview.season.kills", "statsOverview.season.deaths", "statsOverview.season.assists", "tra.career_stats_kda_display_perfect", "tra.career_stats_stats_unavailable_number", "isStatsEmpty", (function() {
                    const e = this.get("tra");
                    if (this.get("isStatsEmpty")) return e.get("career_stats_stats_unavailable_number");
                    const t = this.get("statsOverview.season.kills"),
                        a = this.get("statsOverview.season.deaths"),
                        s = this.get("statsOverview.season.assists");
                    return 0 === a ? e.get("career_stats_kda_display_perfect") : this.get("careerStatsService").formatNumber((t + s) / a, 2)
                })),
                gamesPlayedBreakdown: s.Ember.computed("statsOverview.season.queues", (function() {
                    const e = this.get("statsOverview.season.queues");
                    return s.Ember.A(s.Lodash.map(e, (e => s.Ember.Object.create({
                        primary: this.get("tra.formatString")("career_stats_tooltip_games_played_breakdown_row", {
                            winRate: this.get("careerStatsService").formatNumber(e.wins / (e.wins + e.losses), 0, !0),
                            wins: e.wins,
                            losses: e.losses
                        }),
                        secondary: this.get("tra").get(`career_stats_queue_name_${e.queue}`)
                    }))))
                })),
                timePlayedBreakdown: s.Ember.computed("statsOverview.season.queues", (function() {
                    const e = this.get("statsOverview.season.queues");
                    return s.Ember.A(s.Lodash.map(e, (e => s.Ember.Object.create({
                        primary: this.get("careerStatsService").formatDurationFromMillis(e.timePlayed, !0),
                        secondary: this.get("tra").get(`career_stats_queue_name_${e.queue}`)
                    }))))
                })),
                didInsertElement: function() {
                    this._super(...arguments), this.send("selectSortOption", this.get("sortOptions.0"))
                },
                _loadSummonerStats: function() {
                    const e = this.get("summoner.puuid"),
                        t = this.get("currentTimeFilter.season");
                    if (this.get("isStatsLoaded") && e && t) {
                        const a = this.get("careerStatsService");
                        this.set("isStatsLoaded", !1), this.set("queuePositionPercentiles", null);
                        const n = this.get("currentSeason");
                        Promise.all([t === n ? a.loadCurrentSeasonStatsGames(e) : a.loadPreviousSeasonStatsGames(e, t), a.loadSummonerRankedTiers(e)]).then((e => {
                            const o = e[0],
                                l = t === n ? e[1] : {};
                            if (!s.Lodash.get(o, "games.length")) return this.set("isStatsEmpty", !0), s.Lodash.get(o, "error") && this.set("serverError", !0), Promise.resolve();
                            this.set("isStatsEmpty", !1), this.set("serverError", !1), this.set("statsOverview", o), this.set("rankedTiers", l);
                            const r = this._getPositionPercentileRequests(o, l, t);
                            return a.getPositionStatPercentiles(r)
                        })).then((e => {
                            this.get("isStatsEmpty") || (this.set("queuePositionPercentiles", e), this._selectDefaultQueueFilter()), this.set("isStatsLoaded", !0), r.default.sendEvent(l.TELEMETRY_EVENT_ID.DATA_LOADED, l.TELEMETRY_EVENT_SOURCE.STATS_OVERVIEW, this._summarizeOverviewForTelemetry(this.get("statsOverview")))
                        }))
                    }
                },
                _onPositionGradesChanged: function() {
                    const e = this.get("positionGrades"),
                        t = this.get("currentQueueFilter.queueTypes.0");
                    if (!e || !t) return null;
                    const a = {
                        queueType: t
                    };
                    a.gradeSummary = s.Lodash.mapValues(e, (function(e) {
                        return e.overallGrade
                    })), r.default.sendEvent(l.TELEMETRY_EVENT_ID.POSITION_GRADES_CALCULATED, l.TELEMETRY_EVENT_SOURCE.STATS_OVERVIEW, a)
                },
                _summarizeOverviewForTelemetry: function(e) {
                    let t = 0;
                    const a = new Set;
                    s.Lodash.each(s.Lodash.get(e, "season.champions"), (e => {
                        s.Lodash.each(e, (e => {
                            s.Lodash.each(e, ((e, s) => {
                                e >= 3 && (t++, a.add(s))
                            }))
                        }))
                    }));
                    return {
                        numGames: s.Lodash.get(e, "games.length", 0),
                        numPositions: a.size,
                        numChampPositions: t
                    }
                },
                _selectDropdownOption: function(e, t) {
                    if (!t || t.get("disabled")) return;
                    const a = this.get(e);
                    a && a.set("selected", !1), t.set("selected", !0), this.set(e, t)
                },
                _getPositionPercentileRequests(e, t, a) {
                    const n = [];
                    return s.Lodash.each(e.season.queues, ((e, o) => {
                        s.Lodash.each(e.positions, ((e, s) => {
                            const l = (0, i.getValidRank)(t[o]);
                            n.push({
                                position: s,
                                queueType: o,
                                rankTier: l,
                                season: a
                            })
                        }))
                    })), n
                },
                _selectDefaultQueueFilter() {
                    const e = this.get("statsOverview.season.queues"),
                        t = s.Lodash.maxBy(s.Lodash.keys(e), (t => e[t].timePlayed)),
                        a = this.get("queueFilters");
                    let n = a.find((e => e.queueTypes[0] === t && !e.disabled));
                    n || (s.logger.warning(`could not find queue filter for ${t}, will use the first enabled queue`), n = a.find((e => !e.disabled)), n || s.logger.warning("all queues disabled, should lock the stats instead")), this.send("selectQueueFilter", n)
                },
                actions: {
                    selectQueueFilter: function(e) {
                        this._selectDropdownOption("currentQueueFilter", e), r.default.addUserBehavior(l.USER_ACTIVITIES.FILTER_BY_QUEUE_CHANGE, s.Lodash.get(e, "queueTypes[0]"))
                    },
                    selectTimeFilter: function(e) {
                        const t = s.Lodash.get(e, "season"),
                            a = this.get("currentTimeFilter.season");
                        this._selectDropdownOption("currentTimeFilter", e), r.default.addUserBehavior(l.USER_ACTIVITIES.FILTER_BY_TIME_CHANGE, s.Lodash.get(e, "key")), t !== a && this._loadSummonerStats()
                    },
                    selectSortOption: function(e) {
                        this._selectDropdownOption("currentSortOption", e), r.default.addUserBehavior(l.USER_ACTIVITIES.FILTER_BY_POSITION_CHANGE, s.Lodash.get(e, "field"))
                    }
                }
            });
            t.default = c
        }, (e, t, a) => {
            "use strict";
            a.r(t)
        }, (e, t, a) => {
            const s = a(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "go3cwIAm",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\career-stats-overview-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\career-stats-overview-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\career-stats-overview-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","stats-overview-loading-spinner"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","overview-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","overview-display-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["display-left ",["helper",["if"],[["get",["isStatsEmpty"]],"stats-empty"],null]]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","playstyle-graph-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","play-style-graph-text"],["flush-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","line1"],["flush-element"],["append",["unknown",["tra","career_stats_overview_playstyle_summary_line_1"]],false],["close-element"],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","line2"],["flush-element"],["append",["unknown",["tra","career_stats_overview_playstyle_summary_line_2"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["append",["helper",["playstyle-summary-graph"],null,[["playStyleSummary"],[["get",["playStyleSummary"]]]]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","legacy-data-displays"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","season-num"],["flush-element"],["append",["unknown",["currentSeasonName"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","legacy-data-display primary games-played"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["isStatsEmpty"]]],null,26],["text","          "],["open-element","div",[]],["static-attr","class","display-number"],["flush-element"],["block",["if"],[["get",["isStatsEmpty"]]],null,23,22],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","display-label"],["flush-element"],["append",["unknown",["tra","career_stats_overview_legacy_games_played_label"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","secondary-legacy-data"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","legacy-data-display secondary time-played"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["isStatsEmpty"]]],null,21],["text","            "],["open-element","div",[]],["static-attr","class","display-number"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isStatsEmpty"]]],null,18,17],["text","            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","display-label"],["flush-element"],["text","\\n              "],["append",["unknown",["tra","career_stats_overview_legacy_time_played_label"]],false],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","separator"],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","legacy-data-display secondary kda-ratio"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["isStatsEmpty"]]],null,16],["text","            "],["open-element","div",[]],["static-attr","class","display-number"],["flush-element"],["append",["unknown",["seasonKdaRatioDisplay"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","display-label"],["flush-element"],["append",["unknown",["tra","career_stats_overview_legacy_kda_ratio_label"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","overview-filters"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-flat-input",[]],["static-attr","class","text-filter champion-filter"],["flush-element"],["text","\\n          "],["append",["helper",["input"],null,[["type","class","value","disabled","placeholder","maxlength"],["search","filter-input",["get",["champFilter"]],["get",["isStatsEmpty"]],["get",["tra","career_stats_overview_filter_champion_placeholder"]],30]]],false],["text","\\n        "],["close-element"],["text","\\n\\n        "],["open-element","lol-uikit-framed-dropdown",[]],["static-attr","class","dropdown-filter queue-filter"],["static-attr","direction","upward"],["dynamic-attr","disabled",["unknown",["isStatsEmpty"]],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["isStatsEmpty"]]],null,14,13],["text","        "],["close-element"],["text","\\n\\n        "],["open-element","lol-uikit-framed-dropdown",[]],["static-attr","class","dropdown-filter time-filter"],["static-attr","direction","upward"],["flush-element"],["text","\\n"],["block",["each"],[["get",["timeFilters"]]],null,9],["text","        "],["close-element"],["text","\\n\\n        "],["open-element","lol-uikit-framed-dropdown",[]],["static-attr","class","dropdown-filter sort-options"],["static-attr","direction","upward"],["dynamic-attr","disabled",["unknown",["isStatsEmpty"]],null],["flush-element"],["text","\\n"],["block",["each"],[["get",["sortOptions"]]],null,8],["text","        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","display-right"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isStatsEmpty"]]],null,7,0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["helper",["overview-breakdown"],null,[["summoner","games","positionGrades","queuePositionPercentiles","rankedTiers","seasonOverview","champFilter","queueFilter","timeFilter","sortOption","isThirdPersonView","isCurrentSeason"],[["get",["summoner"]],["get",["statsOverview","games"]],["get",["positionGrades"]],["get",["queuePositionPercentiles"]],["get",["rankedTiers"]],["get",["statsOverview","season"]],["get",["champFilter"]],["get",["currentQueueFilter"]],["get",["currentTimeFilter"]],["get",["currentSortOption"]],["get",["isThirdPersonView"]],["get",["isCurrentSeason"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["append",["unknown",["tra","career_stats_empty_stats_message_line_2"]],false]],"locals":[]},{"statements":[["text","              "],["block",["if"],[["get",["isCurrentSeason"]]],null,1],["text","\\n            "]],"locals":[]},{"statements":[["block",["unless"],[["get",["isThirdPersonView"]]],null,2]],"locals":[]},{"statements":[["text","              "],["append",["unknown",["tra","career_stats_server_error_message_line_2"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["unknown",["emptyStatsMessage"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["unknown",["tra","career_stats_server_error_message_line_1"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","stats-empty-icon"],["flush-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","stats-empty-msgs"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","stats-empty-msg line-1"],["flush-element"],["text","\\n"],["block",["if"],[["get",["serverError"]]],null,6,5],["text","          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","stats-empty-msg line-2"],["flush-element"],["text","\\n"],["block",["if"],[["get",["serverError"]]],null,4,3],["text","          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","selected",["unknown",["option","selected"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectSortOption",["get",["option"]]],null],null],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","dropdown-filter-text"],["flush-element"],["append",["unknown",["option","displayName"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":["option"]},{"statements":[["text","            "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","selected",["unknown",["filter","selected"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectTimeFilter",["get",["filter"]]],null],null],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","dropdown-filter-text"],["flush-element"],["append",["unknown",["filter","displayName"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":["filter"]},{"statements":[["text","                    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n                      "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","career_stats_tooltip_queue_locked"]],false],["close-element"],["text","\\n                    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["right","system"]],10]],"locals":[]},{"statements":[["text","              "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","selected",["unknown",["filter","selected"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectQueueFilter",["get",["filter"]]],null],null],["dynamic-attr","disabled",["unknown",["filter","disabled"]],null],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","dropdown-filter-text"],["flush-element"],["append",["unknown",["filter","displayName"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["filter","disabled"]]],null,11],["text","              "],["close-element"],["text","\\n"]],"locals":["filter"]},{"statements":[["block",["each"],[["get",["queueFilters"]]],null,12]],"locals":[]},{"statements":[["text","             "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["flush-element"],["append",["unknown",["tra","career_stats_queues_missing"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","career-stats-legacy-tooltip multi-kills"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","tooltip-title"],["flush-element"],["append",["unknown",["legacyTooltipDisplays","multiKills"]],false],["close-element"],["text","\\n                    "],["open-element","table",[]],["static-attr","class","tooltip-table"],["flush-element"],["text","\\n                      "],["open-element","tr",[]],["static-attr","class","tooltip-row"],["flush-element"],["text","\\n                        "],["open-element","td",[]],["static-attr","class","primary align-right digit-only"],["flush-element"],["append",["unknown",["statsOverview","season","doubleKills"]],false],["close-element"],["text","\\n                        "],["open-element","td",[]],["static-attr","class","secondary align-vertical-bottom"],["flush-element"],["append",["unknown",["tra","career_stats_multi_kills_name_double"]],false],["close-element"],["text","\\n                      "],["close-element"],["text","\\n                      "],["open-element","tr",[]],["static-attr","class","tooltip-row"],["flush-element"],["text","\\n                        "],["open-element","td",[]],["static-attr","class","primary align-right digit-only"],["flush-element"],["append",["unknown",["statsOverview","season","tripleKills"]],false],["close-element"],["text","\\n                        "],["open-element","td",[]],["static-attr","class","secondary align-vertical-bottom"],["flush-element"],["append",["unknown",["tra","career_stats_multi_kills_name_triple"]],false],["close-element"],["text","\\n                      "],["close-element"],["text","\\n                      "],["open-element","tr",[]],["static-attr","class","tooltip-row"],["flush-element"],["text","\\n                        "],["open-element","td",[]],["static-attr","class","primary align-right digit-only"],["flush-element"],["append",["unknown",["statsOverview","season","quadraKills"]],false],["close-element"],["text","\\n                        "],["open-element","td",[]],["static-attr","class","secondary align-vertical-bottom"],["flush-element"],["append",["unknown",["tra","career_stats_multi_kills_name_quadra"]],false],["close-element"],["text","\\n                      "],["close-element"],["text","\\n                      "],["open-element","tr",[]],["static-attr","class","tooltip-row"],["flush-element"],["text","\\n                        "],["open-element","td",[]],["static-attr","class","primary align-right digit-only"],["flush-element"],["append",["unknown",["statsOverview","season","pentaKills"]],false],["close-element"],["text","\\n                        "],["open-element","td",[]],["static-attr","class","secondary align-vertical-bottom"],["flush-element"],["append",["unknown",["tra","career_stats_multi_kills_name_penta"]],false],["close-element"],["text","\\n                      "],["close-element"],["text","\\n                    "],["close-element"],["text","\\n                  "],["close-element"],["text","\\n                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["right","system"]],15]],"locals":[]},{"statements":[["text","                "],["append",["unknown",["seasonTimePlayedDisplay"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["append",["unknown",["tra","career_stats_stats_unavailable_number"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                        "],["open-element","tr",[]],["static-attr","class","tooltip-row"],["flush-element"],["text","\\n                          "],["open-element","td",[]],["static-attr","class","primary align-right"],["flush-element"],["append",["unknown",["queue","primary"]],false],["close-element"],["text","\\n                          "],["open-element","td",[]],["static-attr","class","secondary"],["flush-element"],["append",["unknown",["queue","secondary"]],false],["close-element"],["text","\\n                        "],["close-element"],["text","\\n"]],"locals":["queue"]},{"statements":[["text","                "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","career-stats-legacy-tooltip time-played"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","tooltip-title"],["flush-element"],["append",["unknown",["legacyTooltipDisplays","timePlayed"]],false],["close-element"],["text","\\n                    "],["open-element","table",[]],["static-attr","class","tooltip-table"],["flush-element"],["text","\\n"],["block",["each"],[["get",["timePlayedBreakdown"]]],null,19],["text","                    "],["close-element"],["text","\\n                  "],["close-element"],["text","\\n                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["right","system"]],20]],"locals":[]},{"statements":[["append",["unknown",["statsOverview","season","gamePlayed"]],false]],"locals":[]},{"statements":[["append",["unknown",["tra","career_stats_stats_unavailable_number"]],false]],"locals":[]},{"statements":[["text","                      "],["open-element","tr",[]],["static-attr","class","tooltip-row"],["flush-element"],["text","\\n                        "],["open-element","td",[]],["static-attr","class","primary"],["flush-element"],["append",["unknown",["queue","primary"]],false],["close-element"],["text","\\n                        "],["open-element","td",[]],["static-attr","class","secondary"],["flush-element"],["append",["unknown",["queue","secondary"]],false],["close-element"],["text","\\n                      "],["close-element"],["text","\\n"]],"locals":["queue"]},{"statements":[["text","              "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","career-stats-legacy-tooltip games-played"],["flush-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","tooltip-title"],["flush-element"],["append",["unknown",["legacyTooltipDisplays","gamesPlayed"]],false],["close-element"],["text","\\n                  "],["open-element","table",[]],["static-attr","class","tooltip-table"],["flush-element"],["text","\\n"],["block",["each"],[["get",["gamesPlayedBreakdown"]]],null,24],["text","                  "],["close-element"],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","type","offsetX","offsetY"],["right","system",-55,-10]],25]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = a(1);
            a(43);
            var n = a(12),
                o = s.Ember.Component.extend({
                    layout: a(44),
                    classNames: ["playstyle-summary-graph-component"],
                    playStyleSummaryChanged: s.Ember.on("init", s.Ember.observer("playStyleSummary", (function() {
                        const e = this.get("playStyleSummary");
                        e && this.draw([e.map((e => ({
                            axis: e.category,
                            value: e.percentile
                        })))], this.get("chartSpecs"))
                    }))),
                    chartSpecs: {
                        width: 192,
                        height: 192,
                        margin: {
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0
                        },
                        positionOffset: {
                            x: 96,
                            y: 96
                        },
                        maxValue: n.MAX_GRADE_VALUE,
                        angleOffSet: -Math.PI / 3
                    },
                    draw(e, t) {
                        const a = e[0].length;
                        s.d3.select(this.element).select("svg").remove();
                        const n = s.d3.select(this.element).append("svg:svg").attr("width", t.width + t.margin.left + t.margin.right).attr("height", t.height + t.margin.top + t.margin.bottom).attr("class", "play-style-summary-graph").append("g").attr("transform", `translate(${t.positionOffset.x},${t.positionOffset.y})`),
                            o = s.d3.scale.linear().range([0, Math.min(t.width / 2, t.height / 2)]).domain([0, t.maxValue]),
                            l = 2 * Math.PI / a,
                            r = s.d3.svg.line.radial().interpolate("linear-closed").radius((e => o(e.value))).angle(((e, a) => a * l + t.angleOffSet)),
                            i = n.selectAll(".radar-wrapper").data(e).enter().append("g").attr("class", "radar-wrapper");
                        i.append("path").attr("class", "radar-area").attr("d", (e => r(e))), i.append("path").attr("class", "radar-stroke").attr("d", (e => r(e))).style("fill", "none")
                    }
                });
            t.default = o
        }, (e, t, a) => {
            "use strict";
            a.r(t)
        }, (e, t, a) => {
            const s = a(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "+gGA6DQO",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\playstyle-summary-graph-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\playstyle-summary-graph-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\playstyle-summary-graph-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","playstyle-icon combat"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],2],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","playstyle-icon income"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],1],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","playstyle-icon macro"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["bottom","system"]],0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","career-stats-stat-tooltip"],["flush-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","title"],["flush-element"],["append",["unknown",["tra","career_stats_play_style_category_macro"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","playstyle-content"],["flush-element"],["append",["unknown",["tra","career_stats_play_style_category_description_macro"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","career-stats-stat-tooltip"],["flush-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","title"],["flush-element"],["append",["unknown",["tra","career_stats_play_style_category_income"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","playstyle-content"],["flush-element"],["append",["unknown",["tra","career_stats_play_style_category_description_income"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","career-stats-stat-tooltip"],["flush-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","title"],["flush-element"],["append",["unknown",["tra","career_stats_play_style_category_combat"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","playstyle-content"],["flush-element"],["append",["unknown",["tra","career_stats_play_style_category_description_combat"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = a(1);
            a(46);
            var n, o = a(12),
                l = a(11),
                r = a(7),
                i = a(6),
                c = (n = a(8)) && n.__esModule ? n : {
                    default: n
                };
            var m = s.Ember.Component.extend({
                layout: a(47),
                classNames: ["overview-breakdown-component"],
                classNameBindings: ["isThirdPersonView"],
                careerStatsService: s.Ember.inject.service("careerStats"),
                currentSeason: s.Ember.computed.readOnly("careerStatsService.currentSeason"),
                minGamesToUnlockStats: o.MIN_GAMES_TO_UNLOCK_STATS,
                championsPerRow: o.OVERVIEW_CHAMPIONS_PER_ROW,
                expandedPositions: s.Ember.A([]),
                summonerChanged: s.Ember.on("init", s.Ember.observer("summoner.puuid", (function() {
                    const e = this.get("summoner.puuid");
                    e && this.get("careerStatsService").loadChampionMasteries(e).then((e => {
                        this.set("championMasteries", e)
                    })).catch((e => {
                        s.logger.error("champion masteries failed to load", e), this.set("championMasteries", {})
                    }))
                }))),
                positionOverviewDisplays: s.Ember.computed("championMasteries", "games", "champFilter", "queueFilter", "timeFilter", "sortOption", "expandedPositions.length", "minGamesToUnlockStats", "championsPerRow", "positionGrades", "isCurrentSeason", (function() {
                    const e = this.get("championMasteries"),
                        t = this.get("games"),
                        a = this.get("champFilter"),
                        n = this.get("queueFilter"),
                        o = this.get("timeFilter"),
                        r = this.get("sortOption"),
                        i = this.get("expandedPositions"),
                        c = this.get("minGamesToUnlockStats"),
                        m = this.get("championsPerRow"),
                        p = this.get("positionGrades"),
                        d = this.get("isCurrentSeason");
                    if (!e || !p) return s.Ember.A();
                    const u = this._getLockedChampionsAndPositions((0, l.filterGames)(t, {
                            queueFilter: n
                        }), c),
                        h = (0, l.filterGames)(t, {
                            championName: a,
                            queueFilter: n,
                            timeFilter: o,
                            championSummary: this.get("careerStatsService.championSummary")
                        });
                    return this._createDisplays(h, r, e, i, u, m, p, d)
                })),
                positionQueuesMap: s.Ember.computed("seasonOverview.queues", (function() {
                    const e = this.get("seasonOverview.queues"),
                        t = {};
                    return s.Lodash.each(e, ((e, a) => {
                        s.Lodash.each(e.positions, ((e, n) => {
                            const o = `${n}.${a}`;
                            s.Lodash.set(t, o, s.Lodash.add(s.Lodash.get(t, o), e.gamePlayed))
                        }))
                    })), t
                })),
                _getLockedChampionsAndPositions(e, t) {
                    const a = {};
                    return s.Lodash.each(e, (e => {
                        const t = (0, l.inferPosition)(e),
                            n = `${t}-${e.championId}`;
                        a[n] = s.Lodash.add(a[n], 1), a[t] = s.Lodash.add(a[t], 1)
                    })), s.Lodash.each(a, ((e, n) => {
                        a[n] = s.Lodash.max([0, t - e])
                    })), a
                },
                _createDisplays(e, t, a, n, o, r, i, c) {
                    const m = {},
                        p = this.get("careerStatsService.indexedChampions"),
                        d = this.get("tra");
                    e.forEach((e => {
                        const t = (0, l.inferPosition)(e),
                            {
                                championId: n
                            } = e,
                            r = p[n],
                            i = s.Lodash.find(a, (e => e.championId === n)) || {
                                lastPlayTime: 0,
                                championPoints: 0
                            };
                        m[t] || (m[t] = {
                            name: t,
                            displayName: d.get(`career_stats_position_name_${t}`),
                            championPoints: 0,
                            lastPlayTime: 0,
                            gamesPlayed: 0,
                            champions: {}
                        });
                        const u = m[t];
                        u.lastPlayTime = s.Lodash.max([u.lastPlayTime, i.lastPlayTime]), u.gamesPlayed += 1, u.champions[n] || (u.championPoints += i.championPoints, u.champions[n] = {
                            championId: n,
                            displayName: r.name,
                            iconPath: r.squarePortraitPath,
                            championPoints: i.championPoints,
                            lastPlayTime: i.lastPlayTime,
                            gamesPlayed: 0,
                            locked: !0
                        });
                        const h = u.champions[n];
                        h.gamesPlayed += 1;
                        const g = o[`${t}-${n}`];
                        h.locked = g > 0;
                        const _ = h.locked ? c ? "career_stats_tooltip_champion_locked" : "career_stats_tooltip_stats_locked_previous_season" : "career_stats_overview_champion_games_played",
                            f = h.locked ? g : h.gamesPlayed;
                        h.tooltip = d.formatString(_, {
                            number: f
                        })
                    })), s.Lodash.each(m, (e => {
                        const t = i[e.name];
                        e.gradeDisplay = t.overallGrade, e.gradeClass = t.overallGrade[0], e.winRateDisplay = this.get("tra").formatString("career_stats_win_rate_percent", {
                            number: (0, l.getWinRateDisplay)(t.winRate, 0)
                        }), e.playStyle = t.bestPlaystyle, e.expanded = n.includes(e.name);
                        const a = o[e.name];
                        e.locked = a > 0;
                        const s = e.locked ? c ? "career_stats_tooltip_position_locked" : "career_stats_tooltip_stats_locked_previous_season" : "career_stats_overview_champion_games_played",
                            r = e.locked ? a : e.gamesPlayed;
                        e.tooltip = d.formatString(s, {
                            number: r
                        })
                    }));
                    const u = s.Lodash.map(m, (e => (e.champions = this._sortPositionOrChampion(s.Lodash.values(e.champions), t), e.championsToExpand = s.Lodash.max([0, e.champions.length - r]), e.expandable = e.champions.length > r, e))),
                        h = this._sortPositionOrChampion(u, t);
                    return s.Ember.A(h)
                },
                _sortPositionOrChampion(e, t) {
                    const a = this.get("careerStatsService.currentLocale").short;
                    return "name" === t.field ? e.sort(((e, t) => e.displayName.localeCompare(t.displayName, a))) : e.sort(((e, a) => a[t.field] - e[t.field]))
                },
                actions: {
                    showPositionDetail: function(e) {
                        e.locked || (r.SFX.gridClick.play(), c.default.addUserBehavior(i.USER_ACTIVITIES.POSITION_DETAIL_BUTTON_CLICK, s.Lodash.get(e, "name")), s.CareerStatsApi.showCareerStatsModal({
                            screen: "position",
                            data: {
                                position: e.name,
                                games: this.get("games"),
                                queueFilter: this.get("queueFilter"),
                                rankedTiers: this.get("rankedTiers"),
                                percentileMap: this.get("queuePositionPercentiles"),
                                positionQueuesMap: this.get("positionQueuesMap"),
                                championOverview: this.get("seasonOverview.champions"),
                                summoner: this.get("summoner"),
                                season: this.get("timeFilter.season"),
                                isThirdPersonView: this.get("isThirdPersonView")
                            }
                        }, !1))
                    },
                    showChampionDetail: function(e, t) {
                        e.locked || (r.SFX.gridClick.play(), c.default.addUserBehavior(i.USER_ACTIVITIES.CHAMPION_ICON_CLICK, s.Lodash.get(e, "championId")), s.CareerStatsApi.showCareerStatsModal({
                            screen: "champion",
                            data: s.Ember.Object.create({
                                championId: e.championId,
                                position: t,
                                games: this.get("games"),
                                queueFilter: this.get("queueFilter"),
                                rankedTiers: this.get("rankedTiers"),
                                championOverview: this.get("seasonOverview.champions"),
                                summoner: this.get("summoner"),
                                season: this.get("timeFilter.season"),
                                isThirdPersonView: this.get("isThirdPersonView")
                            })
                        }, !1))
                    },
                    hoverChampionOrPositionDetail: function() {
                        r.SFX.gridHover.play(), c.default.addUserBehavior(i.USER_ACTIVITIES.CHAMPION_ICON_HOVER)
                    },
                    togglePositionCollapseState(e) {
                        r.SFX.gridClick.play(), c.default.addUserBehavior(i.USER_ACTIVITIES.POSITION_COLLAPSE_STATE_TOGGLE, e);
                        const t = this.get("expandedPositions");
                        t.includes(e) ? t.removeObject(e) : t.addObject(e)
                    }
                }
            });
            t.default = m
        }, (e, t, a) => {
            "use strict";
            a.r(t)
        }, (e, t, a) => {
            const s = a(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "uswdZt94",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\overview-breakdown-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\overview-breakdown-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\overview-breakdown-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","class","overview-breakdown-container"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["block",["each"],[["get",["positionOverviewDisplays"]]],null,8],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n              "],["open-element","p",[]],["flush-element"],["append",["unknown",["champ","tooltip"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-champion-thumbnail",[]],["dynamic-attr","name",["unknown",["champ","displayName"]],null],["dynamic-attr","class",["concat",["position-champ champ-",["unknown",["champ","championId"]]," ",["helper",["if"],[["get",["champ","locked"]],"locked"],null]," games-played-",["unknown",["champ","gamesPlayed"]]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showChampionDetail",["get",["champ"]],["get",["position","name"]]],null],null],["dynamic-attr","onmouseover",["helper",["action"],[["get",[null]],"hoverChampionOrPositionDetail"],null],null],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","lol-uikit-thumbnail"],["static-attr","slot","lol-uikit-thumbnail"],["flush-element"],["text","\\n            "],["open-element","img",[]],["dynamic-attr","src",["unknown",["champ","iconPath"]],null],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],0],["text","        "],["close-element"],["text","\\n"]],"locals":["champ"]},{"statements":[["text","              "],["append",["unknown",["tra","career_stats_overview_position_button_show_more_champions"]],false],["text"," +"],["append",["unknown",["position","championsToExpand"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["unknown",["tra","career_stats_overview_position_button_show_less_champions"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["append",["unknown",["tra","career_stats_tooltip_overview_expand"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["append",["unknown",["tra","career_stats_tooltip_overview_collapse"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n                "],["open-element","p",[]],["flush-element"],["text","\\n"],["block",["if"],[["get",["position","expanded"]]],null,5,4],["text","                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["dynamic-attr","class",["concat",["career-stats-overview-position-button-tooltip ",["helper",["if"],[["get",["position","locked"]],"locked"],null]]]],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","position-name"],["flush-element"],["append",["unknown",["position","displayName"]],false],["close-element"],["text","\\n                "],["open-element","p",[]],["flush-element"],["append",["unknown",["position","tooltip"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["position-header header-",["get",["positionIndex"]]]]],["static-attr","sticky",""],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","position-title"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","diamond"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","title-frame left"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","position-name"],["flush-element"],["append",["unknown",["position","displayName"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","title-frame right"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","diamond"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","position-controls"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["position-summary ",["helper",["if"],[["get",["position","locked"]],"locked"],null]]]],["flush-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["grade-banner grade-",["unknown",["position","gradeClass"]]]]],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["position-button grade-",["unknown",["position","gradeClass"]]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showPositionDetail",["get",["position"]]],null],null],["dynamic-attr","onmouseover",["helper",["action"],[["get",[null]],"hoverChampionOrPositionDetail"],null],null],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],7],["text","            "],["open-element","div",[]],["dynamic-attr","class",["concat",["position-icon ",["unknown",["position","name"]]]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","grade-display"],["flush-element"],["append",["unknown",["position","gradeDisplay"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","win-rate-display"],["flush-element"],["append",["unknown",["position","winRateDisplay"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","win-rate-label"],["flush-element"],["append",["unknown",["tra","career_stats_overview_position_detial_win_rate"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["expand-toggle ",["helper",["unless"],[["get",["position","expandable"]],"hidden"],null]]]],["flush-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["toggle-btn ",["helper",["if"],[["get",["position","expanded"]],"reverse"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"togglePositionCollapseState",["get",["position","name"]]],null],null],["dynamic-attr","onmouseover",["helper",["action"],[["get",[null]],"hoverChampionOrPositionDetail"],null],null],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],6],["text","          "],["close-element"],["text","\\n\\n          "],["open-element","div",[]],["static-attr","class","more-text"],["flush-element"],["text","\\n"],["block",["if"],[["get",["position","expanded"]]],null,3,2],["text","          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["position-champions ",["helper",["unless"],[["get",["position","expanded"]],"collapsed"],null]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["position","champions"]]],null,1],["text","    "],["close-element"],["text","\\n"]],"locals":["position","positionIndex"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = a(1);
            a(49);
            var n, o = a(12),
                l = a(6),
                r = (n = a(8)) && n.__esModule ? n : {
                    default: n
                };
            const i = a(13);
            var c = s.Ember.Component.extend({
                layout: a(50),
                classNames: ["stats-comparison-selector-modal-component"],
                careerStatsService: s.Ember.inject.service("careerStats"),
                minGamesToUnlockStats: o.MIN_GAMES_TO_UNLOCK_STATS,
                currentSeason: s.Ember.computed.readOnly("careerStatsService.currentSeason"),
                earliestSeason: s.Ember.computed.readOnly("careerStatsService.earliestSeason"),
                isSeasonSettingLoaded: s.Ember.computed.readOnly("careerStatsService.isSeasonSettingLoaded"),
                isCurrentSeason: s.Ember.computed("currentSeason", "season", (function() {
                    return this.get("currentSeason") === this.get("season")
                })),
                isEarliestSeason: s.Ember.computed("earliestSeason", "season", (function() {
                    return this.get("earliestSeason") === this.get("season")
                })),
                hasPreviousSeasons: s.Ember.computed("earliestSeason", "currentSeason", (function() {
                    return this.get("currentSeason") > this.get("earliestSeason")
                })),
                compareChampionOrPositionDisplay: s.Ember.computed("fromChampionDetails", "championId", "position", "careerStatsService.indexedChampions", "tra.career_stats_compare_stats_modal_compare_title", (function() {
                    const e = this.get("fromChampionDetails"),
                        t = this.get("championId"),
                        a = this.get("position"),
                        n = this.get("tra"),
                        o = this.get("careerStatsService.indexedChampions");
                    return e ? n.formatString("career_stats_compare_stats_modal_compare_title", {
                        champion: s.Lodash.get(o, `${t}.name`),
                        position: n.get(`career_stats_position_name_${a}`)
                    }) : n.get(`career_stats_position_name_${a}`)
                })),
                currentTab: "experts",
                showingExperts: s.Ember.computed.equal("currentTab", "experts"),
                showingPlayers: s.Ember.computed.equal("currentTab", "players"),
                showingChampions: s.Ember.computed.equal("currentTab", "champions"),
                showingSeasons: s.Ember.computed.equal("currentTab", "seasons"),
                playerNameToSearch: "",
                isCompareDisabled: !0,
                isSearchingSummoner: !1,
                displayChanged: s.Ember.on("init", s.Ember.observer("fromChampionDetails", "championId", "position", "indexedGameCounts", "careerStatsService.indexedChampions", "queueFilter.queueTypes.0", (function() {
                    const e = this.get("championId"),
                        t = this.get("position"),
                        a = this.get("indexedGameCounts"),
                        n = this.get("careerStatsService.indexedChampions"),
                        o = this.get("queueFilter.queueTypes.0");
                    if (this.get("fromChampionDetails") && !e || !t || !a || !n || !o) return;
                    const l = this._getChampionCompareDisplays(a?.[o]?.[t], e, t, n);
                    this.set("championCompareDisplays", l);
                    const r = this.get("careerStatsService"),
                        i = r.loadRecentlyComparedSummoners().then((e => (this.set("recentlyComparedSummoners", s.Ember.A(e)), e))),
                        c = r.loadRecentlyPlayedWithSummoners().then((e => (this.set("recentlyPlayedWithSummoners", s.Ember.A(e)), e))),
                        m = r.loadFriendList().then((e => {
                            const t = e.filter((e => e && e.summonerId > 0));
                            return this.set("friends", s.Ember.A(t)), t
                        }));
                    Promise.all([i, c, m]).then((e => {
                        this.fillFilterableEntitiesWithPlayerNames(e)
                    }))
                }))),
                async fillFilterableEntitiesWithPlayerNames(e) {
                    if (!this.get("_playerNames").isUsingAlias) return;
                    e = e.map((e => Array.isArray(e) ? e : []));
                    const [t, a, n] = e, o = new Set([...t, ...a, ...n].map((({
                        puuid: e
                    }) => e))), l = await this.get("_playerNames").getDisplayNamesByPUUIDs([...o]), r = e => {
                        e.gameNameAndTagLine = l[e.puuid].playerNameFull
                    };
                    t.forEach(r), a.forEach(r), n.forEach(r), this.set("recentlyComparedSummoners", s.Ember.A(t)), this.set("recentlyPlayedWithSummoners", s.Ember.A(a)), this.set("friends", s.Ember.A(n))
                },
                filteredRecentlyComparedSummoners: s.Ember.computed("playerNameToSearch", "recentlyComparedSummoners", (function() {
                    return this._filterBySearchValueHelper("recentlyComparedSummoners")
                })),
                filteredRecentlyPlayedWithSummoners: s.Ember.computed("playerNameToSearch", "recentlyPlayedWithSummoners", (function() {
                    return this._filterBySearchValueHelper("recentlyPlayedWithSummoners")
                })),
                filteredFriends: s.Ember.computed("playerNameToSearch", "friends", (function() {
                    return this._filterBySearchValueHelper("friends")
                })),
                _filterBySearchValueHelper(e) {
                    const t = this.get("playerNameToSearch"),
                        a = this.get(e),
                        s = this.get("_playerNames").isUsingAlias;
                    return t ? i.filter(t, a, {
                        extract: e => s ? e.gameNameAndTagLine : e.displayName
                    }).map((e => e.original)) : a
                },
                _getChampionCompareDisplays(e, t, a, n) {
                    const o = this.get("minGamesToUnlockStats"),
                        l = e.filter((e => e.championId !== t && e.gameCount >= o)).sort(((e, t) => t.gameCount - e.gameCount));
                    return s.Ember.A(l.map((e => s.Ember.Object.create({
                        id: e.championId,
                        name: n[e.championId].name,
                        iconPath: n[e.championId].squarePortraitPath,
                        gamesPlayedDisplay: this.get("tra.formatString")("career_stats_compare_stats_modal_games_played", {
                            number: e.gameCount,
                            positionOrChampion: this.get("tra").get(`career_stats_position_name_${a}`)
                        })
                    }))))
                },
                _showSummonerNotExistModal(e) {
                    return s.ModalManager.add({
                        type: "DialogAlert",
                        data: {
                            okText: this.get("tra.career_stats_modal_dialog_accept_text"),
                            contents: this.get("tra.formatString")("career_stats_summoner_name_does_not_exist", {
                                name: e
                            })
                        },
                        show: !0,
                        closeButton: !0
                    }).okPromise
                },
                _showSummonerGamesNotEnoughModal(e, t, a, n) {
                    const o = `career_stats_summoner_not_enough_${n?"champion":"position"}_game_this_season`;
                    return s.ModalManager.add({
                        type: "DialogAlert",
                        data: {
                            okText: this.get("tra.career_stats_modal_dialog_accept_text"),
                            contents: this.get("tra.formatString")(o, {
                                name: e,
                                champion: t,
                                position: a
                            })
                        },
                        show: !0,
                        closeButton: !0
                    }).okPromise
                },
                async _checkSummonerStatsForComparison(e) {
                    const t = this.get("championId"),
                        a = this.get("position"),
                        n = this.get("fromChampionDetails"),
                        o = this.get("minGamesToUnlockStats"),
                        l = this.get("queueFilter.queueTypes.0"),
                        r = this.get("season"),
                        {
                            summonerId: i
                        } = e;
                    let c;
                    try {
                        c = await this.get("careerStatsService").loadStatsSummaryFromSummonerId(i, r, l, a, t)
                    } catch (e) {
                        throw s.logger.error("Failed to load stats summary from summonerId", e), e
                    }
                    const {
                        playerNameFull: m
                    } = this.get("_playerNames").formatPlayerName(e);
                    return !c || c.gamePlayed < o ? this._showSummonerGamesNotEnoughModal(m, this.get("careerStatsService.indexedChampions")?.[t]?.name, this.get("tra").get(`career_stats_position_name_${a}`), n) : this.get("parentComponent").compareWithSummonerGames(e, c)
                },
                async handleSearchSummonerByAlias(e) {
                    if ("string" != typeof e) return this.handlePlayerNameIsNotAnAlias(e, "playerName is an empty string");
                    const t = e.replace(/\s/g, "").split("#");
                    if (t.length < 2) return this.handlePlayerNameIsNotAValidAlias(e, "playerName doesn't have a gameName and tagLine");
                    if (t.length > 2) return this.handlePlayerNameIsNotAValidAlias(e, "playerName has more than one # in it");
                    const [a, s] = t, n = await this.get("careerStatsService").searchSummonersByAliases([{
                        gameName: a,
                        tagLine: s
                    }]);
                    return 1 !== n.length ? this.handlePlayerNameIsNotAValidAlias(e, "couldn't find a summoner by this alias") : n[0]
                },
                async handlePlayerNameIsNotAValidAlias(e, t) {
                    throw await this._showSummonerNotExistModal(e), this.set("isSearchingSummoner", !1), new Error(t)
                },
                init() {
                    this._super(...arguments), this._playerNames = s.playerNames
                },
                didInsertElement: function() {
                    this._super(...arguments)
                },
                actions: {
                    selectTab: function(e) {
                        r.default.addUserBehavior(l.USER_ACTIVITIES.TAB_CHANGE, e), this.set("currentTab", e)
                    },
                    compareWithSummonerByName: async function(e) {
                        if (this.get("isSearchingSummoner")) return;
                        this.set("isSearchingSummoner", !0);
                        const t = "string" == typeof e ? e : this.get("playerNameToSearch");
                        let a;
                        r.default.sendEvent(l.TELEMETRY_EVENT_ID.SUMMONER_COMPARE, l.TELEMETRY_EVENT_SOURCE.COMPARISON_SELECTOR, {
                            summonerName: t
                        });
                        try {
                            a = this.get("_playerNames").isUsingAlias ? await this.handleSearchSummonerByAlias(t) : await this.get("careerStatsService").searchSummonerBySummonerName(t)
                        } catch (e) {
                            throw s.logger.error("Error fetching summoner by name.", e), this.set("isSearchingSummoner", !1), e
                        }
                        try {
                            a ? await this._checkSummonerStatsForComparison(a) : await this._showSummonerNotExistModal(t)
                        } catch (e) {}
                        this.set("isSearchingSummoner", !1)
                    },
                    compareWithSummonerByPuuid: async function(e) {
                        if (this.get("isSearchingSummoner")) return;
                        let t;
                        this.set("isSearchingSummoner", !0), r.default.sendEvent(l.TELEMETRY_EVENT_ID.SUMMONER_COMPARE, l.TELEMETRY_EVENT_SOURCE.COMPARISON_SELECTOR, {
                            puuid: e
                        });
                        try {
                            t = await this.get("careerStatsService").searchSummonerByPuuid(e)
                        } catch (e) {
                            throw s.logger.error("Error fetching summoner from career stats service.", e), this.set("isSearchingSummoner", !1), e
                        }
                        try {
                            t && await this._checkSummonerStatsForComparison(t)
                        } catch (e) {}
                        this.set("isSearchingSummoner", !1)
                    },
                    compareWithChampion: function(e) {
                        r.default.sendEvent(l.TELEMETRY_EVENT_ID.POSITION_EXPERT_COMPARE, l.TELEMETRY_EVENT_SOURCE.COMPARISON_SELECTOR, {
                            championId: e
                        }), this.get("parentComponent").compareWithChampionAverage(e, this.get("position"))
                    },
                    compareWithChampionExpert: function(e, t, a) {
                        return this.get("parentComponent").compareWithChampionExpert(e, t, a)
                    },
                    compareWithPositionExpert: function(e, t) {
                        return this.get("parentComponent").compareWithPositionExpert(e, t)
                    },
                    showExpertProfile: function(e) {
                        return this.get("parentComponent").showExpertProfile(e)
                    },
                    compareWithSeason: function(e) {
                        return this.get("parentComponent").compareWithSeason(e)
                    }
                }
            });
            t.default = c
        }, (e, t, a) => {
            "use strict";
            a.r(t)
        }, (e, t, a) => {
            const s = a(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "eH3BJ6Z/",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\stats-comparison-selector-modal-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\stats-comparison-selector-modal-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\stats-comparison-selector-modal-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","compare-title"],["flush-element"],["text","\\n  "],["append",["unknown",["tra","career_stats_compare_stats_modal_title"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","compare-subtitle"],["flush-element"],["text","\\n  "],["append",["helper",["player-name"],null,[["format","gameName","tagLine","summonerName"],["full",["get",["gameName"]],["get",["tagLine"]],["get",["summonerName"]]]]],false],["text"," ♦ "],["append",["unknown",["seasonName"]],false],["text"," ♦ "],["append",["unknown",["compareChampionOrPositionDisplay"]],false],["text"," ♦ "],["append",["unknown",["queueFilter","displayName"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","lol-uikit-navigation-bar",[]],["static-attr","class","compare-tab-navs"],["static-attr","type","tabbed"],["static-attr","direction","right"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasPreviousSeasons"]]],null,15],["block",["if"],[["get",["fromChampionDetails"]]],null,14],["text","  "],["open-element","lol-uikit-navigation-item",[]],["dynamic-attr","class",["concat",["compare-tab-nav other-players ",["helper",["if"],[["get",["fromChampionDetails"]],"champ-view"],null]," ",["helper",["if"],[["get",["hasPreviousSeasons"]],"has-prev-seasons"],null]]]],["dynamic-attr","active",["unknown",["showingPlayers"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectTab","players"],null],null],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tab-text"],["flush-element"],["append",["unknown",["tra","career_stats_compare_stats_modal_tab_other_players"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-navigation-item",[]],["dynamic-attr","class",["concat",["compare-tab-nav experts ",["helper",["if"],[["get",["fromChampionDetails"]],"champ-view"],null]," ",["helper",["if"],[["get",["hasPreviousSeasons"]],"has-prev-seasons"],null]]]],["dynamic-attr","active",["unknown",["showingExperts"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectTab","experts"],null],null],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tab-text"],["flush-element"],["append",["unknown",["tra","career_stats_compare_stats_modal_tab_experts"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","compare-details"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showingPlayers"]]],null,13,7],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","compare-list seasons"],["flush-element"],["text","\\n      "],["append",["helper",["season-compare-list"],null,[["championId","position","season","queueFilter","summoner","earliestSeason","currentSeason","compareWithSeason"],[["get",["championId"]],["get",["position"]],["get",["season"]],["get",["queueFilter"]],["get",["summoner"]],["get",["earliestSeason"]],["get",["currentSeason"]],"compareWithSeason"]]],false],["text","\\n    "],["close-element"],["text","\\n  "]],"locals":[]},{"statements":[["block",["if"],[["get",["showingSeasons"]]],null,0]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","compare-list experts"],["flush-element"],["text","\\n      "],["append",["helper",["expert-list"],null,[["isChampionScreen","championId","position","season","isCurrentSeason","isSeasonSettingLoaded","compareWithChampionExpert","compareWithPositionExpert","showExpertProfile"],[["get",["fromChampionDetails"]],["get",["championId"]],["get",["position"]],["get",["season"]],["get",["isCurrentSeason"]],["get",["isSeasonSettingLoaded"]],"compareWithChampionExpert","compareWithPositionExpert","showExpertProfile"]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["showingExperts"]]],null,2,1]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","no-other-champ-msg"],["flush-element"],["append",["unknown",["tra","career_stats_compare_stats_modal_no_other_champions_on_position"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","compare-display champion-compare"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"compareWithChampion",["get",["champion","id"]]],null],null],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","avatar-icon"],["flush-element"],["text","\\n            "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["champion","iconPath"]]]]],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","icon-ring-s"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","row-details"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","name-display champion-name"],["flush-element"],["append",["unknown",["champion","name"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","games-played"],["flush-element"],["append",["unknown",["champion","gamesPlayedDisplay"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["champion"]},{"statements":[["text","    "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","compare-list my-champions"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["block",["each"],[["get",["championCompareDisplays"]]],null,5],["block",["unless"],[["get",["championCompareDisplays","length"]]],null,4],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["showingChampions"]]],null,6,3]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","compare-display"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"compareWithSummonerByPuuid",["get",["friend","puuid"]]],null],null],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","avatar-icon"],["flush-element"],["text","\\n              "],["open-element","img",[]],["dynamic-attr","src",["concat",["/lol-game-data/assets/v1/profile-icons/",["unknown",["friend","profileIconId"]],".jpg"]]],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","icon-ring-s"],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","row-details"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","name-display summoner-name"],["flush-element"],["text","\\n                "],["append",["helper",["player-name"],null,[["format","gameName","tagLine","summonerName"],["full",["get",["friend","gameName"]],["get",["friend","tagLine"]],["get",["friend","displayName"]]]]],false],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":["friend"]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","compare-display"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"compareWithSummonerByPuuid",["get",["recentlyPlayedWith","puuid"]]],null],null],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","avatar-icon"],["flush-element"],["text","\\n              "],["open-element","img",[]],["dynamic-attr","src",["concat",["/lol-game-data/assets/v1/profile-icons/",["unknown",["recentlyPlayedWith","profileIconId"]],".jpg"]]],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","icon-ring-s"],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","row-details"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","name-display summoner-name"],["flush-element"],["text","\\n                "],["append",["helper",["player-name"],null,[["format","gameName","tagLine","summonerName"],["full",["get",["recentlyPlayedWith","gameName"]],["get",["recentlyPlayedWith","tagLine"]],["get",["recentlyPlayedWith","displayName"]]]]],false],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":["recentlyPlayedWith"]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","compare-display"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"compareWithSummonerByPuuid",["get",["recentlyCompared","puuid"]]],null],null],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","avatar-icon"],["flush-element"],["text","\\n              "],["open-element","img",[]],["dynamic-attr","src",["concat",["/lol-game-data/assets/v1/profile-icons/",["unknown",["recentlyCompared","profileIconId"]],".jpg"]]],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","icon-ring-s"],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","row-details"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","name-display summoner-name"],["flush-element"],["text","\\n                "],["append",["helper",["player-name"],null,[["format","gameName","tagLine","summonerName"],["full",["get",["recentlyCompared","gameName"]],["get",["recentlyCompared","tagLine"]],["get",["recentlyCompared","displayName"]]]]],false],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":["recentlyCompared"]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","career_stats_feature_disabled"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["bottom","system"]],11]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","search-and-compare"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isCompareDisabled"]]],null,12],["text","      "],["open-element","lol-uikit-flat-input",[]],["static-attr","class","summoner-search"],["flush-element"],["text","\\n        "],["append",["helper",["input"],null,[["type","class","enter","value","placeholder","maxlength","disabled"],["search","search-input","compareWithSummonerByName",["get",["summonerNameToSearch"]],["get",["tra","career_stats_overview_compare_stats_modal_placeholder_summoner_search"]],20,["get",["isCompareDisabled"]]]]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","disabled",["unknown",["isCompareDisabled"]],null],["dynamic-attr","onclick",["helper",["unless"],[["get",["isCompareDisabled"]],["get",["action"]],"compareWithSummonerByName"],null],null],["static-attr","class","compare-btn"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","career_stats_compare_stats_modal_compare_button"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","compare-list summoner-list"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","summoner-group recently-compared"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["group-title ",["helper",["unless"],[["get",["recentlyComparedSummoners","length"]],"hidden"],null]]]],["flush-element"],["append",["unknown",["tra","career_stats_compare_summoner_group_recently_compared"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["filteredRecentlyComparedSummoners"]]],null,10],["text","      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","summoner-group recently-played-with"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["group-title ",["helper",["unless"],[["get",["recentlyPlayedWithSummoners","length"]],"hidden"],null]]]],["flush-element"],["append",["unknown",["tra","career_stats_compare_summoner_group_recently_played_with"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["filteredRecentlyPlayedWithSummoners"]]],null,9],["text","      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","summoner-group friend-compare"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["group-title ",["helper",["unless"],[["get",["friends","length"]],"hidden"],null]]]],["flush-element"],["append",["unknown",["tra","career_stats_compare_summoner_group_friends"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["filteredFriends"]]],null,8],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-navigation-item",[]],["dynamic-attr","class",["concat",["compare-tab-nav my-champions champ-view ",["helper",["if"],[["get",["hasPreviousSeasons"]],"has-prev-seasons"],null]]]],["dynamic-attr","active",["unknown",["showingChampions"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectTab","champions"],null],null],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tab-text"],["flush-element"],["append",["unknown",["tra","career_stats_compare_stats_modal_tab_other_champions"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-navigation-item",[]],["dynamic-attr","class",["concat",["compare-tab-nav my-seasons ",["helper",["if"],[["get",["fromChampionDetails"]],"champ-view"],null]," has-prev-seasons"]]],["dynamic-attr","active",["unknown",["showingSeasons"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectTab","seasons"],null],null],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tab-text"],["flush-element"],["append",["unknown",["tra","career_stats_compare_stats_modal_tab_seasons"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = a(1);
            a(52);
            var n = s.Ember.Component.extend({
                layout: a(53),
                classNames: ["expert-list-component"],
                careerStatsService: s.Ember.inject.service("careerStats"),
                isPositionScreen: s.Ember.computed.not("isChampionScreen"),
                _loadChampionExperts: function(e, t) {
                    this.set("isExpertListLoaded", !1), this.get("careerStatsService").getChampionExperts(e, t, this.get("season")).then((e => {
                        this.set("expertSummoners", s.Ember.A(e)), this.set("isExpertListLoaded", !0)
                    }))
                },
                _loadPositionExperts: function(e) {
                    this.set("isExpertListLoaded", !1), this.get("careerStatsService").getPositionExperts(e, this.get("season")).then((e => {
                        this.set("expertSummoners", s.Ember.A(e)), this.set("isExpertListLoaded", !0)
                    }))
                },
                expertSummoners: s.Ember.A([]),
                expertSummonersObserver: s.Ember.on("init", s.Ember.observer("careerStatsService", "championId", "position", "isPositionScreen", "isChampionScreen", "isSeasonSettingLoaded", "isCurrentSeason", (function() {
                    const e = this.get("championId"),
                        t = this.get("position"),
                        a = this.get("isSeasonSettingLoaded"),
                        s = this.get("isCurrentSeason");
                    a && s ? this.get("isPositionScreen") && t ? this._loadPositionExperts(t) : this.get("isChampionScreen") && e && t && this._loadChampionExperts(e, t) : this.set("isExpertListLoaded", !0)
                }))),
                actions: {
                    compareWithExpert(e) {
                        const t = this.get("isChampionScreen"),
                            a = this.get("championId"),
                            s = this.get("position");
                        t ? this.sendAction("compareWithChampionExpert", e, a, s) : this.sendAction("compareWithPositionExpert", e, s)
                    },
                    showExpertProfile(e) {
                        this.sendAction("showExpertProfile", e)
                    }
                }
            });
            t.default = n
        }, (e, t, a) => {
            "use strict";
            a.r(t)
        }, (e, t, a) => {
            const s = a(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "iNMwN5JK",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\expert-list-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\expert-list-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\expert-list-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","expert-summoner-list"],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["stats-experts-loading-spinner ",["helper",["if"],[["get",["isExpertListLoaded"]],"hidden"],null]]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["expert-summoner-items ",["helper",["unless"],[["get",["isExpertListLoaded"]],"transparent"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["expertSummoners","length"]]],null,6,2],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["append",["unknown",["tra","career_stats_expert_explanations_previous_season"]],false]],"locals":[]},{"statements":[["append",["unknown",["tra","career_stats_champion_no_expert_yet"]],false]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","not-enough-summoner-msg"],["flush-element"],["text","\\n        "],["block",["if"],[["get",["isCurrentSeason"]]],null,1,0],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n                      "],["open-element","p",[]],["flush-element"],["append",["unknown",["summoner","rankDisplay"]],false],["close-element"],["text","\\n                    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n                    "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","career_stats_expert_table_tooltip_expert_profile"]],false],["close-element"],["text","\\n                  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","tr",[]],["static-attr","class","expert-table-row"],["flush-element"],["text","\\n              "],["open-element","td",[]],["static-attr","class","expert-table-cell profile-info"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showExpertProfile",["get",["summoner"]]],null],null],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","restrictArea"],["left","whole-window"]],4],["text","                "],["open-element","div",[]],["static-attr","class","stats-avatar"],["flush-element"],["text","\\n                  "],["open-element","img",[]],["dynamic-attr","src",["concat",["/lol-game-data/assets/v1/profile-icons/",["helper",["if"],[["get",["summoner","profileIconId"]],["get",["summoner","profileIconId"]],"1"],null],".jpg"]]],["flush-element"],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","icon-ring-s"],["flush-element"],["close-element"],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","summoner-info"],["flush-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","summoner-name"],["flush-element"],["text","\\n                    "],["append",["helper",["player-name"],null,[["format","gameName","tagLine","summonerName"],["full",["get",["summoner","gameName"]],["get",["summoner","tagLine"]],["get",["summoner","displayName"]]]]],false],["text","\\n                  "],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","subtitle"],["flush-element"],["append",["unknown",["summoner","subtitles","numOfGamesDisplay"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","td",[]],["static-attr","class","expert-table-cell win-rate"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","win-rate"],["flush-element"],["append",["unknown",["summoner","subtitles","winRateDisplay"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","td",[]],["static-attr","class","expert-table-cell rank"],["flush-element"],["text","\\n                "],["open-element","div",[]],["dynamic-attr","class",["concat",["solo-duo-rank ranked-crest-image ",["unknown",["summoner","rank","tier"]],"_players"]]],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type","offsetY"],["top","system",5]],3],["text","                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","td",[]],["static-attr","class","expert-table-cell action-buttons"],["flush-element"],["text","\\n                "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"compareWithExpert",["get",["summoner"]]],null],null],["static-attr","class","action-button compare"],["flush-element"],["text","\\n                  "],["append",["unknown",["tra","career_stats_compare_stats_modal_compare_button"]],false],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":["summoner"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","expert-explanation"],["flush-element"],["append",["unknown",["tra","career_stats_expert_explanations"]],false],["close-element"],["text","\\n      "],["open-element","table",[]],["static-attr","class","expert-summoner-table"],["flush-element"],["text","\\n        "],["open-element","thead",[]],["static-attr","class","expert-table-header"],["flush-element"],["text","\\n          "],["open-element","tr",[]],["flush-element"],["text","\\n            "],["open-element","th",[]],["static-attr","class","expert-table-cell header profile"],["flush-element"],["append",["unknown",["tra","career_stats_expert_table_header_expert_name"]],false],["close-element"],["text","\\n            "],["open-element","th",[]],["static-attr","class","expert-table-cell header"],["flush-element"],["append",["unknown",["tra","career_stats_expert_table_header_expert_win_rate"]],false],["close-element"],["text","\\n            "],["open-element","th",[]],["static-attr","class","expert-table-cell header"],["flush-element"],["append",["unknown",["tra","career_stats_expert_table_header_expert_solo_duo_rank"]],false],["close-element"],["text","\\n            "],["open-element","th",[]],["static-attr","class","expert-table-cell header"],["flush-element"],["append",["unknown",["tra","career_stats_expert_table_header_expert_action"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","tbody",[]],["flush-element"],["text","\\n"],["block",["each"],[["get",["expertSummoners"]]],null,5],["text","        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = a(1),
                n = a(12),
                o = a(11);
            a(55);
            var l = s.Ember.Component.extend({
                layout: a(56),
                classNames: ["season-compare-list-component"],
                careerStatsService: s.Ember.inject.service("careerStats"),
                isSeasonSummaryLoaded: !1,
                minGamesToUnlockStats: n.MIN_GAMES_TO_UNLOCK_STATS,
                init: function() {
                    this._super.apply(this, arguments), this._loadSeasonSummary()
                },
                _loadSeasonSummary() {
                    const e = this.get("season"),
                        t = this.get("currentSeason"),
                        a = this.get("earliestSeason"),
                        n = this.get("careerStatsService"),
                        l = this.get("championId"),
                        r = this.get("position"),
                        i = this.get("queueFilter.queueTypes.0"),
                        c = this.get("summoner.puuid"),
                        m = this.get("minGamesToUnlockStats"),
                        p = this.get("tra"),
                        d = [];
                    for (let e = a; e <= t; e++) d.push(n.loadStatsSummary(c, e, i, r, l).then((t => ({
                        season: e,
                        stats: t
                    }))));
                    return Promise.all(d).then((t => {
                        this.set("seasonCompareOptions", s.Ember.A(s.Lodash.reverse(s.Lodash.map(t, (t => {
                            const a = s.Lodash.get(t, "stats.gamePlayed") || 0;
                            return {
                                seasonName: this.get("careerStatsService").getSeasonDisplayTra(t.season),
                                gamesPlayed: a,
                                winRate: a > 0 ? (0, o.getWinRateDisplay)(t.stats.victory / a, 0) + "%" : p.get("career_stats_stats_unavailable_number"),
                                disabled: e === t.season || a < m,
                                buttonTooltip: p.get("career_stats_compare_season_" + (e !== t.season ? a >= m ? "normal" : "not_enough_games" : "same_season")),
                                stats: t.stats
                            }
                        }))))), this.set("isSeasonSummaryLoaded", !0)
                    }))
                },
                actions: {
                    compareWithSeason(e) {
                        e.disabled || this.sendAction("compareWithSeason", e)
                    }
                }
            });
            t.default = l
        }, (e, t, a) => {
            "use strict";
            a.r(t)
        }, (e, t, a) => {
            const s = a(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "XDDXrfI5",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\season-compare-list-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\season-compare-list-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\season-compare-list-component\\\\index.js\\" "],["text","\\n"],["open-element","table",[]],["static-attr","class","season-compare-option-table"],["flush-element"],["text","\\n  "],["open-element","thead",[]],["flush-element"],["text","\\n    "],["open-element","tr",[]],["flush-element"],["text","\\n      "],["open-element","th",[]],["flush-element"],["append",["unknown",["tra","career_stats_previous_season_table_header_season"]],false],["close-element"],["text","\\n      "],["open-element","th",[]],["flush-element"],["append",["unknown",["tra","career_stats_previous_season_table_header_games"]],false],["close-element"],["text","\\n      "],["open-element","th",[]],["flush-element"],["append",["unknown",["tra","career_stats_previous_season_table_header_win_rate"]],false],["close-element"],["text","\\n      "],["open-element","th",[]],["flush-element"],["append",["unknown",["tra","career_stats_previous_season_table_header_action"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","tbody",[]],["flush-element"],["text","\\n"],["block",["each"],[["get",["seasonCompareOptions"]]],null,1],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n              "],["open-element","p",[]],["flush-element"],["append",["unknown",["season","buttonTooltip"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","tr",[]],["flush-element"],["text","\\n      "],["open-element","td",[]],["flush-element"],["append",["unknown",["season","seasonName"]],false],["close-element"],["text","\\n      "],["open-element","td",[]],["flush-element"],["append",["unknown",["season","gamesPlayed"]],false],["close-element"],["text","\\n      "],["open-element","td",[]],["flush-element"],["append",["unknown",["season","winRate"]],false],["close-element"],["text","\\n      "],["open-element","td",[]],["flush-element"],["text","\\n        "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"compareWithSeason",["get",["season"]]],null],null],["static-attr","class","compare-button"],["dynamic-attr","disabled",["unknown",["season","disabled"]],null],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","restrictArea"],["top","whole-window"]],0],["text","          "],["append",["unknown",["tra","career_stats_compare_stats_modal_compare_button"]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["season"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var s = a(1),
                n = a(12);
            a(58);
            var o = s.Ember.Component.extend({
                layout: a(59),
                classNames: ["career-stats-welcome-modal-component"],
                welcomeTitle: s.Ember.computed("tra", "season", "isEarliestSeason", "tra.career_stats_welcome_modal_title", "tra.career_stats_welcome_modal_title_new_season", (function() {
                    const e = this.get("tra"),
                        t = this.get("season");
                    return this.get("isEarliestSeason") ? e.get("career_stats_welcome_modal_title") : e.formatString("career_stats_welcome_modal_title_new_season", {
                        season: this.get("careerStatsService").getSeasonDisplayTra(t)
                    })
                })),
                dropdownOptions: s.Ember.computed("tra", (function() {
                    const e = this.get("tra");
                    return s.Ember.A(s.Lodash.map(n.TIME_FILTERS, (t => t.includeAll ? e.get(`career_stats_time_filter_${t.traKey}`) : e.formatString(`career_stats_time_filter_${t.traKey}`, {
                        length: t.length
                    }))))
                })),
                previousSeasonName: s.Ember.computed("tra", "season", (function() {
                    const e = this.get("season");
                    return this.get("careerStatsService").getSeasonDisplayTra(e - 1)
                })),
                numberDisplays: s.Ember.computed("tra.metadata.locale.id", (function() {
                    const e = (this.get("tra.metadata.locale.id") || "en_US").replace("_", "-");
                    return {
                        selfKda: 2.83.toLocaleString(e),
                        otherKda: 2.77.toLocaleString(e),
                        axisMin: 2.5.toLocaleString(e),
                        axismax: 2.9.toLocaleString(e)
                    }
                }))
            });
            t.default = o
        }, (e, t, a) => {
            "use strict";
            a.r(t)
        }, (e, t, a) => {
            const s = a(1).Ember;
            e.exports = s.HTMLBars.template({
                id: "AmlAXrs+",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\career-stats-welcome-modal-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\career-stats-welcome-modal-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-career-stats\\\\src\\\\app\\\\components\\\\career-stats-welcome-modal-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["append",["unknown",["welcomeTitle"]],false],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","subtitle"],["flush-element"],["block",["if"],[["get",["isEarliestSeason"]]],null,4,3],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","sections"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","section click"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","image click"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","section-title"],["flush-element"],["append",["unknown",["tra","career_stats_welcome_modal_section_click_title"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","section-description"],["flush-element"],["append",["unknown",["tra","career_stats_welcome_modal_section_click_description"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isEarliestSeason"]]],null,2,1],["text","  "],["open-element","div",[]],["static-attr","class","section compare"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","image compare"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","section-title"],["flush-element"],["append",["unknown",["tra","career_stats_welcome_modal_section_compare_title"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","section-description"],["flush-element"],["append",["unknown",["tra","career_stats_welcome_modal_section_compare_description"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","img",[]],["static-attr","class","button-glow"],["static-attr","src","/fe/lol-career-stats/images/glow-01.png"],["flush-element"],["close-element"],["text","\\n"],["open-element","img",[]],["static-attr","class","button-glow delayed"],["static-attr","src","/fe/lol-career-stats/images/glow-02.png"],["flush-element"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["loc-text filter-option index-",["get",["index"]]]]],["flush-element"],["append",["get",["option"]],false],["close-element"],["text","\\n"]],"locals":["option","index"]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","section prev-season"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","image prev-season"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","section-title"],["flush-element"],["append",["unknown",["tra","career_stats_welcome_modal_section_prev_season_title"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","section-description"],["flush-element"],["append",["unknown",["tra","career_stats_welcome_modal_section_prev_season_description"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["dropdownOptions"]]],null,0],["text","    "],["open-element","div",[]],["static-attr","class","loc-text prev-season"],["flush-element"],["append",["unknown",["previousSeasonName"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","section analyze"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","image analyze"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","section-title"],["flush-element"],["append",["unknown",["tra","career_stats_welcome_modal_section_analyze_title"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","section-description"],["flush-element"],["append",["unknown",["tra","career_stats_welcome_modal_section_analyze_description"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","loc-text stat-name"],["flush-element"],["append",["unknown",["tra","career_stats_detail_stat_name_kda"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","loc-text vs"],["flush-element"],["append",["unknown",["tra","career_stats_trend_graph_title_compare"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","loc-text avg-title self"],["flush-element"],["append",["unknown",["numberDisplays","selfKda"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","loc-text avg-title other"],["flush-element"],["append",["unknown",["numberDisplays","otherKda"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","loc-text avg-bar self"],["flush-element"],["append",["unknown",["numberDisplays","selfKda"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","loc-text avg-bar other"],["flush-element"],["append",["unknown",["numberDisplays","otherKda"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","loc-text axis-label min"],["flush-element"],["append",["unknown",["numberDisplays","axisMin"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","loc-text axis-label max"],["flush-element"],["append",["unknown",["numberDisplays","axismax"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["append",["unknown",["tra","career_stats_welcome_modal_subtitle_new_season"]],false]],"locals":[]},{"statements":[["append",["unknown",["tra","career_stats_welcome_modal_subtitle"]],false]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, a) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = function(e) {
                e.ready().then((() => {
                    const t = document.createElement("div");
                    t.className = "lol-career-stats profiles-full", t.type = "CareerStatsRootComponent";
                    const a = function(e, t, a) {
                        const s = e.registerSection({
                            id: "profile_subsection_career_stats",
                            title: a.get("career_stats_section_name"),
                            priority: 6,
                            render: () => t,
                            enabled: !0
                        });
                        return s
                    }(n.ProfilesApi.mainSection(), t, e);
                    var s, m, p;
                    m = t, p = !0, (s = a).addEventListener("selected", (e => {
                        ! function(e, t) {
                            e && c && (n.ProfilesApi.setShowAlert(!1), t.setShowAlert(!1), c = !1, (0, n.dataBinding)("/lol-settings", (0, n.getProvider)().getSocket()).patch("/v1/account/career-stats-settings", {
                                schemaVersion: 1,
                                data: {
                                    initialVisited: !0
                                }
                            }))
                        }(p, s);
                        let t = null;
                        if (!e || !e.summonerId) return r ? i && (r.domNode.dispatchEvent(l), i = !1) : r = n.componentFactory.create("CareerStatsRootComponent"), r.componentPromise.then((() => {
                            m.appendChild(r.domNode)
                        })), void o.default.startTelemetrySession(!1);
                        t = e.summonerId;
                        const a = n.componentFactory.create("CareerStatsRootComponent", e ? n.Ember.Object.create({
                            summonerId: t,
                            overlayMode: !1
                        }) : n.Ember.Object.create());
                        m.appendChild(a.domNode), s.lastDisplayedCareerStatsComponent = a, o.default.startTelemetrySession(!0)
                    })), s.addEventListener("deselected", (() => {
                        if (s.lastDisplayedCareerStatsComponent) {
                            const {
                                lastDisplayedCareerStatsComponent: e
                            } = s;
                            m.removeChild(e.domNode), e.onRemove(), delete s.lastDisplayedCareerStatsComponent
                        }
                        o.default.endTelemetrySession()
                    }));
                    (0, n.dataBinding)("/lol-platform-config", (0, n.getProvider)().getSocket()).observe("v1/namespaces/CareerStats", (function(e) {
                        let t = !0;
                        t = !e || !1 !== e.StatsEnabled, a.setEnabled(t)
                    }));
                    (0, n.dataBinding)("/lol-end-of-game", (0, n.getProvider)().getSocket()).observe("/v1/state", (() => {
                            i = !0
                        })),
                        function(e) {
                            const t = (0, n.dataBinding)("/lol-settings", (0, n.getProvider)().getSocket()),
                                a = {};
                            t.observe("/v2/ready", a, (s => {
                                s && (t.unobserve("/v2/ready", a), t.get("/v1/account/career-stats-settings").then((t => {
                                    n.Lodash.get(t, "data.initialVisited") || (n.ProfilesApi.setShowAlert(!0), e.setShowAlert(!0), c = !0)
                                })))
                            }))
                        }(a)
                }))
            };
            var s, n = a(1),
                o = (s = a(8)) && s.__esModule ? s : {
                    default: s
                };
            const l = new CustomEvent("profileReentered");
            let r = null,
                i = !1,
                c = !1
        }],
        t = {};

    function a(s) {
        var n = t[s];
        if (void 0 !== n) return n.exports;
        var o = t[s] = {
            exports: {}
        };
        return e[s](o, o.exports, a), o.exports
    }
    a.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, a.p = "/fe/lol-career-stats/", (() => {
        "use strict";
        var e, t = (e = a(1)) && e.__esModule ? e : {
            default: e
        };
        const s = "rcp-fe-lol-career-stats",
            n = document.currentScript.ownerDocument;
        const o = window.getPluginAnnounceEventName(s);
        n.addEventListener(o, (function(e) {
            (0, e.registrationHandler)((function(e) {
                const n = e.get("rcp-fe-lol-l10n").tra().overlay("/fe/lol-l10n/trans.json").overlay("/fe/lol-career-stats/trans.json");
                return t.default.init(e, {
                    Audio: e => e.get("rcp-fe-audio"),
                    bluebird: e => e.get("rcp-fe-common-libs").getBluebird(3),
                    componentFactory: e => e.get("rcp-fe-common-libs").getComponentFactory("1"),
                    d3: e => e.get("rcp-fe-common-libs").getD3(3),
                    dataBinding: e => e.get("rcp-fe-common-libs").getDataBinding("rcp-fe-lol-career-stats"),
                    Ember: e => e.get("rcp-fe-ember-libs").getEmber(),
                    emberDataBinding: e => e.get("rcp-fe-ember-libs").getEmberDataBinding("rcp-fe-lol-career-stats"),
                    FlyoutManager: e => e.get("rcp-fe-lol-uikit").getFlyoutManager(),
                    l10n: e => e.get("rcp-fe-lol-l10n"),
                    LeagueTierNames: e => e.get("rcp-fe-lol-shared-components").getApi_LeagueTierNames(),
                    Lodash: e => e.get("rcp-fe-common-libs").getLodash(4),
                    logger: e => e.get("rcp-fe-common-libs").logging.create(s),
                    ModalManager: e => e.get("rcp-fe-lol-uikit").getModalManager(),
                    NavigationPlugin: e => e.get("rcp-fe-lol-navigation"),
                    playerNames: e => e.get("rcp-fe-common-libs").playerNames,
                    ProfilesApi: e => e.get("rcp-fe-lol-profiles"),
                    SharedEmberComponents: e => e.get("rcp-fe-lol-shared-components").getSharedEmberComponents(),
                    Telemetry: e => e.get("rcp-fe-common-libs").getTelemetry(1),
                    TooltipManager: e => e.get("rcp-fe-lol-uikit").getTooltipManager(),
                    tra: n,
                    UIKit: e => e.get("rcp-fe-lol-uikit"),
                    Viewport: e => e.get("rcp-fe-lol-shared-components").getApi_Viewport()
                }).then((() => t.default.add({
                    emberApplicationFactory: e => e.get("rcp-fe-ember-libs").getEmberApplicationFactory()
                }))).then((() => {
                    const e = new(0, a(2).default)(n);
                    return t.default.add({
                        CareerStatsApi: e
                    }), e
                }))
            }))
        }), {
            once: !0
        })
    })()
})();