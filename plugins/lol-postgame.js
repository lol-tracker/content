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
                            o = n._getValue(a, s);
                        o && o.then ? (o.then((function(e) {
                            e || console.warn("The promise for the key " + a + " resolved with a falsy value: ", e), n._addValue(a, e)
                        })), t.push(o)) : n._addValue(a, o)
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
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(3);
            t.default = class {
                constructor(e) {
                    this.progressionComponentPriorityQueue = [], this.applicationInjector = e
                }
                getProgressionComponents() {
                    return this.progressionComponentPriorityQueue
                }
                addProgressionComponent(e, t, n, s, o) {
                    this.addInternalProgressionComponent(e, n, s, o), this.applicationInjector.setComponent(a.POSTGAME_EMBER_APP_NAME, e, t)
                }
                addInternalProgressionComponent(e, t, n, a) {
                    this.hasProgressionComponent(e) && this.removeProgressionComponent(e), this.progressionComponentPriorityQueue.push({
                        componentName: e,
                        priority: t,
                        hasAnimation: Boolean(n),
                        isFixed: Boolean(a)
                    }), this.progressionComponentPriorityQueue.sort((function(e, t) {
                        return e.priority - t.priority
                    }))
                }
                hasProgressionComponent(e) {
                    return this.progressionComponentPriorityQueue.some((t => t.componentName === e))
                }
                removeProgressionComponent(e) {
                    let t = this.progressionComponentPriorityQueue.length;
                    for (; t--;) this.progressionComponentPriorityQueue[t].componentName === e && this.progressionComponentPriorityQueue.splice(t, 1);
                    this.applicationInjector.setComponent(a.POSTGAME_EMBER_APP_NAME, e, null)
                }
            }
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.TFT_MAX_BENCH_SLOTS = t.TFT_GAME_MODE = t.SUBTEAM_PLACEMENT_LONG_TRA_KEY = t.STAT_SWITCHER_STATS = t.REWARD_CELEBRATION_NAME = t.POSTGAME_PLAYER_HONOR_NAME = t.POSTGAME_EMBER_APP_NAME = t.PLAYER_STATUS_TO_ORDER_MAP = t.PARTY_STATUS = t.MODAL_CATEGORY = t.LOTTIE_RADIAL_UNITS = t.HONOR_VIDEO_PATH = t.HONOR_CATEGORY_DATA = t.HONOR_ASSET_PATH = t.GAME_MODES_WITH_SUBTEAMS = t.FULL_LIST_ERROR = t.DEFAULT_CHERRY_TEAM_SIZE = t.CONVERSATION_TYPE_POSTGAME = t.CHERRY_PLACEMENT_TRA_KEY = t.CHERRY_GAME_MODE = void 0;
            t.POSTGAME_EMBER_APP_NAME = "rcp-fe-lol-postgame-ember";
            t.CHERRY_GAME_MODE = "CHERRY";
            t.TFT_GAME_MODE = "TFT";
            t.TFT_MAX_BENCH_SLOTS = 9;
            t.FULL_LIST_ERROR = "max_roster_size_sender";
            t.REWARD_CELEBRATION_NAME = "PostgameRewardComponent";
            t.DEFAULT_CHERRY_TEAM_SIZE = 4;
            t.HONOR_ASSET_PATH = "/fe/lol-postgame/";
            t.HONOR_VIDEO_PATH = "/fe/lol-static-assets/videos/honor/";
            t.POSTGAME_PLAYER_HONOR_NAME = "postgame-scoreboard-player-honor-flair";
            t.CONVERSATION_TYPE_POSTGAME = "postGame";
            t.HONOR_CATEGORY_DATA = {
                COOL: {
                    header: "honor_category_prompt_header_cool",
                    body: "honor_category_prompt_body_cool",
                    tooltip: "honor_postgame_category_tooltip_cool",
                    tooltipBySummoner: "honor_postgame_category_tooltip_cool_by_summoner",
                    iconUnselected: "Cool_Unselected.png",
                    iconSelected: "Cool_Selected.png",
                    postgameIcon: "Cool_MiniIcon.png",
                    eog1: "EOG_Cool_1-2.webm",
                    eog2: "EOG_Cool_1-2.webm",
                    eog3: "EOG_Cool_3.webm",
                    eog4: "EOG_Cool_4.webm",
                    eog5: "EOG_Cool_4.webm",
                    index: 1
                },
                SHOTCALLER: {
                    header: "honor_category_prompt_header_shotcaller",
                    body: "honor_category_prompt_body_shotcaller",
                    tooltip: "honor_postgame_category_tooltip_shotcaller",
                    tooltipBySummoner: "honor_postgame_category_tooltip_shotcaller_by_summoner",
                    iconUnselected: "Shotcaller_Unselected.png",
                    iconSelected: "Shotcaller_Selected.png",
                    postgameIcon: "Shotcaller_MiniIcon.png",
                    eog1: "EOG_Shotcaller_1-2.webm",
                    eog2: "EOG_Shotcaller_1-2.webm",
                    eog3: "EOG_Shotcaller_3.webm",
                    eog4: "EOG_Shotcaller_4.webm",
                    eog5: "EOG_Shotcaller_4.webm",
                    index: 2
                },
                HEART: {
                    header: "honor_category_prompt_header_heart",
                    body: "honor_category_prompt_body_heart",
                    tooltip: "honor_postgame_category_tooltip_heart",
                    tooltipBySummoner: "honor_postgame_category_tooltip_heart_by_summoner",
                    iconUnselected: "Heart_Unselected.png",
                    iconSelected: "Heart_Selected.png",
                    postgameIcon: "Heart_MiniIcon.png",
                    eog1: "EOG_Heart_1-2.webm",
                    eog2: "EOG_Heart_1-2.webm",
                    eog3: "EOG_Heart_3.webm",
                    eog4: "EOG_Heart_4.webm",
                    eog5: "EOG_Heart_4.webm",
                    index: 3
                }
            };
            t.STAT_SWITCHER_STATS = {
                DAMAGE_DEALT: "TOTAL_DAMAGE_DEALT_TO_CHAMPIONS",
                DAMAGE_TAKEN: "TOTAL_DAMAGE_TAKEN",
                CC_SCORE: "TIME_CCING_OTHERS",
                CREEP_SCORE: "MINIONS_KILLED",
                GOLD: "GOLD_EARNED",
                INDIVIDUAL_KDA: "INDIVIDUAL_KDA",
                VISION_SCORE: "VISION_SCORE",
                NEUTRAL_MINIONS_SLAIN: "NEUTRAL_MINIONS_KILLED"
            };
            t.MODAL_CATEGORY = {
                CHALLENGES: "challenges",
                ETERNALS: "eternals"
            };
            t.LOTTIE_RADIAL_UNITS = 75;
            const n = {
                DEFAULT_WAITING_STATUS: "waiting",
                READY_STATUS: "ready",
                LEFT_PARTY_STATUS: "left"
            };
            t.PARTY_STATUS = n;
            const a = {
                [n.READY_STATUS]: -1,
                [n.DEFAULT_WAITING_STATUS]: 0,
                [n.LEFT_PARTY_STATUS]: 1
            };
            t.PLAYER_STATUS_TO_ORDER_MAP = a;
            t.CHERRY_PLACEMENT_TRA_KEY = "cherry_placement_";
            t.SUBTEAM_PLACEMENT_LONG_TRA_KEY = "subteam_placement_long_";
            t.GAME_MODES_WITH_SUBTEAMS = {
                CHERRY: {
                    subteams: [{
                        subteamId: 1,
                        display: {
                            label: "cherry_subteam_display_name_poro",
                            icon: "/fe/lol-postgame/subteams/poro.svg"
                        }
                    }, {
                        subteamId: 2,
                        display: {
                            label: "cherry_subteam_display_name_minion",
                            icon: "/fe/lol-postgame/subteams/minion.svg"
                        }
                    }, {
                        subteamId: 3,
                        display: {
                            label: "cherry_subteam_display_name_scuttle",
                            icon: "/fe/lol-postgame/subteams/scuttle.svg"
                        }
                    }, {
                        subteamId: 4,
                        display: {
                            label: "cherry_subteam_display_name_krug",
                            icon: "/fe/lol-postgame/subteams/krug.svg"
                        }
                    }]
                }
            }
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            t.default = class {
                constructor(e) {
                    this.runtimeComponents = {}, this.factoryDefinitions = {}, this.emberApplicationFactory = e
                }
                hasComponent(e) {
                    return Boolean(this.runtimeComponents[e])
                }
                getComponent(e) {
                    return this.hasComponent(e) ? this.runtimeComponents[e].definition : null
                }
                setComponent(e, t, n) {
                    if (n) {
                        this.runtimeComponents[t] = {
                            parent: e,
                            definition: n
                        };
                        const a = this.getFactoryDefinition(e);
                        a && (this._modifyFactoryDefinition(a, n), this._setFactoryDefinition(a))
                    } else delete this.runtimeComponents[t]
                }
                getFactoryDefinition(e) {
                    return this.factoryDefinitions[e]
                }
                setFactoryDefinition(e) {
                    this.factoryDefinitions[e.name] = e, this._retroactivelyModifyFactoryDefinition(e)
                }
                _modifyFactoryDefinition(e, t) {
                    if (e)
                        for (const n in t) e[n] = t[n]
                }
                _retroactivelyModifyFactoryDefinition(e) {
                    let t = !1;
                    for (const n in this.runtimeComponents) {
                        const a = this.runtimeComponents[n];
                        a.parent === e.name && (this._modifyFactoryDefinition(e, a.definition), t = !0)
                    }
                    t && this._setFactoryDefinition(e)
                }
                _setFactoryDefinition(e) {
                    this.emberApplicationFactory.setFactoryDefinition(e)
                }
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = function() {
                c || (c = new r);
                return c
            };
            var a = n(1),
                s = n(3),
                o = n(6),
                l = n(7),
                i = n(15);
            class r {
                constructor() {
                    a.extEmberModel.set("isPostgameShowing", !1), this._registerApplication();
                    const e = a.Viewport.main().getScreenRoot("rcp-fe-lol-postgame"),
                        t = (0, a.getProvider)().getSocket();
                    this._show = this._show.bind(this), this._handleGameflowData = this._handleGameflowData.bind(this), this._catchAndHide = this._catchAndHide.bind(this), this._application = null, this._screenRoot = e, this._telemetryBinding = (0, a.dataBinding)("/telemetry"), this._gameflowBinding = (0, a.dataBinding)("/lol-gameflow", t), this._createGameFlowObserver()
                }
                _registerApplication() {
                    this._isAppRegistered || ((0, l.registerEmberApplication)(), this._isAppRegistered = !0)
                }
                _show() {
                    return this._screenRoot.bump().then((() => (this._application || (this._application = (0, l.createEmberApplication)()), this._application.emberAppInstancePromise))).then((() => {
                        a.extEmberModel.get("isPostgameShowing") || (this._screenRoot.getElement().appendChild(this._application.domNode), a.extEmberModel.set("isPostgameShowing", !0), this._startSessionTime = new Date)
                    })).catch(this._catchAndHide)
                }
                _hide() {
                    if (!a.extEmberModel.get("isPostgameShowing") || !this._application) return;
                    a.extEmberModel.set("isPostgameShowing", !1);
                    const e = this._screenRoot.getElement();
                    for (; e.hasChildNodes();) e.removeChild(e.lastChild);
                    this._startSessionTime = null, this._screenRoot.release()
                }
                _catchAndHide(e = {}) {
                    a.logger.error("There was a problem creating the ember application", e), this._hide()
                }
                _createGameFlowObserver() {
                    this._gameflowBinding.observe("/v1/session", this._handleGameflowData)
                }
                _handleGameflowData(e) {
                    const t = Object.keys(o.GAMEFLOW_PHASES).map((e => o.GAMEFLOW_PHASES[e]));
                    e && t.includes(e.phase) ? (a.Telemetry.startTracingEvent(i.TELEMETRY_EVENT_NAMES.RENDER_POST_GAME), this._show()) : this._hide()
                }
                sendTelemetryEvent(e, t) {
                    const n = new Date - this._startSessionTime;
                    t = Object.assign(t, {
                        plugin: "rcp-fe-lol-postgame",
                        sessionTime: n.toString()
                    }), this._telemetryBinding.post(`/v1/events/${e}`, t)
                }
                setPlayerHonorComponent(e) {
                    a.ApplicationInjector.setComponent(s.POSTGAME_EMBER_APP_NAME, s.POSTGAME_PLAYER_HONOR_NAME, e)
                }
                addProgressionComponent(e, t, n, s, o) {
                    a.ProgressionComponentHelper.addProgressionComponent(e, t, n, s, o)
                }
                removeProgressionComponent(e) {
                    a.ProgressionComponentHelper.removeProgressionComponent(e)
                }
                setGameSpecificPlayAgainOverride(e, t, n) {
                    a.extEmberModel.set("playAgainOverride", {
                        gameflowGameId: e,
                        confirmButtonText: t,
                        navigationCallback: n
                    })
                }
            }
            let c
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.TIER_NAME_UNRANKED = t.TIER_NAME_NONE = t.SECOND_IN_MS = t.REWARD_CELEBRATION_NAME = t.PROGRESS_BAR_MAX_WIDTH = t.PROGRESS_BAR_END_OFFSET = t.PLUGIN_NAME = t.PLAY_BUTTON_STATE_MACHINE_SELECTOR = t.PLAYFLOW_VIDEO_SOURCE_STATE = t.PLAYFLOW_VIDEO_SOURCE_PATH = t.PLAYFLOW_VIDEOS_ROOT = t.PARTY_STATUS_STATE_MACHINE_SELECTOR = t.NUMBER_AUGMENTS_TO_RENDER = t.MISSION_STATUS_REWARDS_PENDING = t.MISSION_STATUS_IN_PROGRESS = t.MISSION_STATUS_ELIGIBLE = t.MISSION_STATUS_COMPLETE = t.MISSION_STATUS_CLAIMABLE = t.MINUTE_IN_MS = t.MAX_ORB_LEVEL = t.MAIN_NAVIGATION_ITEM_TRA_KEY = t.LENGTH_OF_MILESTONES = t.HOUR_IN_MS = t.GAMEFLOW_PHASES = t.DEFAULT_REWARD_IMG_URL = t.DEFAULT_RANKED_STATS = t.DAY_IN_MS = t.APEX_TIERS = void 0;
            const n = "rcp-fe-lol-postgame";
            t.PLUGIN_NAME = n;
            const a = n + "reward-celebration";
            t.REWARD_CELEBRATION_NAME = a;
            t.MAIN_NAVIGATION_ITEM_TRA_KEY = "navbar_tft";
            t.SECOND_IN_MS = 1e3;
            t.MINUTE_IN_MS = 6e4;
            const s = 36e5;
            t.HOUR_IN_MS = s;
            t.DAY_IN_MS = 864e5;
            t.PROGRESS_BAR_MAX_WIDTH = 124;
            t.PROGRESS_BAR_END_OFFSET = 8;
            t.LENGTH_OF_MILESTONES = 9;
            t.MAX_ORB_LEVEL = 5;
            t.MISSION_STATUS_IN_PROGRESS = "IN_PROGRESS";
            t.MISSION_STATUS_CLAIMABLE = "SELECT_REWARDS";
            t.MISSION_STATUS_ELIGIBLE = "REWARDS_ELIGIBLE";
            t.MISSION_STATUS_REWARDS_PENDING = "REWARDS_PENDING";
            t.MISSION_STATUS_COMPLETE = "COMPLETE";
            t.NUMBER_AUGMENTS_TO_RENDER = 4;
            t.DEFAULT_REWARD_IMG_URL = "/fe/lol-loot/assets/videos/low_spec_images/open_cm_image.png";
            t.DEFAULT_RANKED_STATS = {
                tier: "UNRANKED",
                division: "NA",
                leaguePoints: 0,
                provisionalGameThreshold: 10,
                provisionalGamesRemaining: 0,
                isProvisional: !1
            };
            t.APEX_TIERS = ["CHALLENGER", "GRANDMASTER", "MASTER"];
            t.TIER_NAME_UNRANKED = "UNRANKED";
            t.TIER_NAME_NONE = "NONE";
            t.GAMEFLOW_PHASES = {
                PreEndOfGame: "PreEndOfGame",
                WaitingForStats: "WaitingForStats",
                EndOfGame: "EndOfGame"
            };
            const o = "/fe/lol-static-assets/videos";
            t.PLAYFLOW_VIDEOS_ROOT = o;
            const l = {
                intro: `${o}/find-match-button-intro.webm`,
                active: `${o}/find-match-button-active.webm`,
                idle: `${o}/find-match-button-idle.webm`,
                hover: `${o}/find-match-button-hover.webm`,
                pulse: `${o}/find-match-button-pulse.webm`,
                allReturned: `${o}/find-match-button-all-returned.webm`
            };
            t.PLAYFLOW_VIDEO_SOURCE_PATH = l;
            t.PLAYFLOW_VIDEO_SOURCE_STATE = {
                intro: "intro",
                idle: "idle",
                active: "active",
                hover: "hover",
                pulse: "pulse",
                allReturned: "all-returned"
            };
            t.PLAY_BUTTON_STATE_MACHINE_SELECTOR = ".postgame-button-vsm";
            t.PARTY_STATUS_STATE_MACHINE_SELECTOR = ".postgame-return-button-vsm"
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.createEmberApplication = function() {
                return a.ComponentFactory.create(s.POSTGAME_EMBER_APP_NAME)
            }, t.registerEmberApplication = function() {
                const e = {
                    name: s.POSTGAME_EMBER_APP_NAME,
                    ComponentFactory: a.ComponentFactory,
                    Router: o.default,
                    IndexRoute: l.default,
                    PostgameRoute: i.default,
                    PostgameController: r.default,
                    PostgameCommonComponent: c.default,
                    PostgameHeaderComponent: m.default,
                    PostgameGameInfoComponent: p.default,
                    PostgameGameInfoIconsComponent: d.default,
                    PostgameGameResultComponent: u.default,
                    PostgameGameResultIconComponent: g.default,
                    PostgameScoreboardComponent: h.default,
                    PostgameScoreboardPlayerAugmentComponent: f.default,
                    PostgameScoreboardPlayerKeystoneIconComponent: b.default,
                    PostgameScoreboardPlayerButtonsComponent: y.default,
                    PostgameScoreboardPlayerItemComponent: _.default,
                    PostgameScoreboardProgressionComponent: E.default,
                    PostgameScoreboardProgressionNumberReelsComponent: v.default,
                    PostgameScoreboardBreakdownComponent: x.default,
                    PostgameScoreboardProgressionRankedComponent: k.default,
                    PostgameScoreboardProgressionRatedComponent: C.default,
                    PostgameScoreboardReplayButtonComponent: A.default,
                    TftHeaderComponent: L.default,
                    TftPartnerGroupPlacementComponent: M.default,
                    TftPlayerComponent: I.default,
                    TftTooltipComponent: N.default,
                    PostgameSecondaryProgressionComponent: R.default,
                    PostgamePartyStatusComponent: w.default,
                    ArrowFooterComponent: At,
                    HextechLoadingAnimationComponent: Rt,
                    GenericButtonComponent: Te.default,
                    RenderTimerComponent: ve.default,
                    EternalsTokenComponent: xe.default,
                    PostgameRootComponent: Se.default,
                    PostgameSubNavigationComponent: Pe.default,
                    PostgameProgressionComponent: Ce.default,
                    PrestigeProgressionComponent: Ae.default,
                    PrestigeProgressionTooltipComponent: Re.default,
                    MasteryProgressionComponent: we.default,
                    CherryProgressionComponent: Le.default,
                    RankedProgressionComponent: Ie.default,
                    RatingChangeComponent: Me.default,
                    RankedRewardProgressionComponent: Ne.default,
                    MiniseriesProgressComponent: Oe.default,
                    ChallengeUpdateContainerComponent: De.default,
                    ChallengeUpdatesTooltipComponent: Be.default,
                    EternalsUpdatesTooltipComponent: Ge.default,
                    PostgamePartyStatusV2Component: Ue.default,
                    ProgressionModalComponent: He.default,
                    CherryScoreboardHeaderComponent: Fe.default,
                    ScoreboardHeaderComponent: je.default,
                    ScoreboardHonorFlairComponent: Ve.default,
                    ScoreboardRootComponent: qe.default,
                    CherryScoreboardRowComponent: We.default,
                    ScoreboardRowComponent: Ye.default,
                    ScoreboardRowActionsMenuComponent: Ke.default,
                    ScoreboardRowStatDisplayComponent: Xe.default,
                    ScoreboardStatSwitcherComponent: $e.default,
                    AnimatedPlayButtonComponent: ke.default,
                    ScoreboardSpellComponent: Qe.default,
                    PostgameReportModal: Mt,
                    GameIdClipboardCopyComponent: wt,
                    PlayerNameComponent: Lt,
                    ChallengeCardHeaderComponent: It,
                    ChallengeCardComponent: Nt,
                    ChallengeItemFooterComponent: Ot,
                    ChallengeItemTooltipComponent: Dt,
                    ChallengeItemComponent: Bt,
                    EternalsItemTooltipComponent: Gt,
                    EternalsItemComponent: Ut,
                    IdentityCustomizerTokenComponent: Vt,
                    PostgameScoreboardPlayerHonorFlairComponent: S.default,
                    PostgameScoreboardProgressionHonorNotificationComponent: P.default,
                    PostgameScoreboardProgressionHonorCategoryIconComponent: T.default,
                    tra: a.traService,
                    PostgameService: O.default,
                    PostgameRankedService: D.default,
                    PartiesService: B.default,
                    GameclientPostgameService: G.default,
                    GameflowService: U.default,
                    ChatMessagesService: H.default,
                    EternalsService: F.default,
                    EndOfGameService: W.default,
                    HonorService: j.default,
                    ChallengesService: V.default,
                    PerksService: q.default,
                    GameDataService: Ht,
                    RiotclientService: Ft,
                    SummonerService: jt,
                    PlayerActionsService: Y.default,
                    RenderTelemetrySenderComponent: a.default.SharedEmberComponents.RenderTelemetrySenderComponent,
                    TEMPLATES: {
                        application: K.default,
                        postgame: X.default,
                        "components/postgame-common": $.default,
                        "components/postgame-header": Q.default,
                        "components/postgame-game-info": z.default,
                        "components/postgame-game-info-icons": Z.default,
                        "components/postgame-game-result": J.default,
                        "components/postgame-game-result-icon": ee.default,
                        "components/postgame-scoreboard": te.default,
                        "components/postgame-scoreboard-player-augment": ne.default,
                        "components/postgame-scoreboard-player-keystone-icon": ae.default,
                        "components/postgame-scoreboard-player-buttons": se.default,
                        "components/postgame-scoreboard-player-item": oe.default,
                        "components/postgame-scoreboard-progression": le.default,
                        "components/postgame-scoreboard-progression-number-reels": ie.default,
                        "components/postgame-scoreboard-breakdown": re.default,
                        "components/postgame-scoreboard-progression-ranked": ce.default,
                        "components/postgame-scoreboard-progression-rated": me.default,
                        "components/postgame-secondary-progression": pe.default,
                        "components/postgame-party-status": de.default,
                        "components/postgame-scoreboard-player-honor-flair": ue.default,
                        "components/postgame-scoreboard-progression-honor-notification": ge.default,
                        "components/postgame-scoreboard-progression-honor-category-icon": he.default,
                        "components/render-timer": ze.default,
                        "components/eternals-token": Ze.default,
                        "components/postgame-root": Je.default,
                        "components/postgame-sub-navigation": et.default,
                        "components/postgame-progression": tt.default,
                        "components/prestige-progression": nt.default,
                        "components/prestige-progression-tooltip": at.default,
                        "components/mastery-progression": st.default,
                        "components/cherry-progression": ot.default,
                        "components/ranked-progression": lt.default,
                        "components/rating-change": it.default,
                        "components/ranked-reward-progression": rt.default,
                        "components/miniseries-progress": ct.default,
                        "components/challenge-update-container": mt.default,
                        "components/challenge-updates-tooltip": pt.default,
                        "components/eternals-updates-tooltip": dt.default,
                        "components/progression-modal": gt.default,
                        "components/cherry-scoreboard-header": ht.default,
                        "components/scoreboard-header": ft.default,
                        "components/scoreboard-honor-flair": bt.default,
                        "components/scoreboard-root": yt.default,
                        "components/cherry-scoreboard-row": _t.default,
                        "components/scoreboard-row": Et.default,
                        "components/scoreboard-row-actions-menu": vt.default,
                        "components/scoreboard-row-stat-display": xt.default,
                        "components/scoreboard-stat-switcher": St.default,
                        "components/postgame-party-status-v2": ut.default,
                        "components/animated-play-button": Pt.default,
                        "components/scoreboard-spell": Tt.default,
                        "components/tft-header": fe.default,
                        "components/tft-partner-group-placement": be.default,
                        "components/tft-player": ye.default,
                        "components/tft-tooltip": _e.default
                    }
                };
                a.ApplicationInjector.setFactoryDefinition(e), a.emberApplicationFactory.setFactoryDefinition(s.POSTGAME_EMBER_APP_NAME, e, {
                    EMBER_CLI_COMPAT: !0
                }), a.ProgressionComponentHelper.addInternalProgressionComponent("postgame-scoreboard-progression-ranked", 10, !0, !1), a.ProgressionComponentHelper.addInternalProgressionComponent("postgame-scoreboard-progression-rated", 15, !1, !1), a.ProgressionComponentHelper.addInternalProgressionComponent("postgame-scoreboard-progression-ranked-rewards", 20, !0, !1), a.ProgressionComponentHelper.addInternalProgressionComponent("postgame-scoreboard-progression-mastery-meter", 30, !0, !1), a.ProgressionComponentHelper.addInternalProgressionComponent("postgame-scoreboard-progression-xp-meter", 40, !0, !1), a.ProgressionComponentHelper.addInternalProgressionComponent("postgame-scoreboard-progression-honor-notification", 60, !1, !0), a.emberApplicationFactory.setFactoryDefinition({
                    name: s.REWARD_CELEBRATION_NAME,
                    ComponentFactory: a.ComponentFactory,
                    tra: a.traService,
                    RewardCelebrationComponent: Ee.default
                })
            };
            var a = function(e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || "object" != typeof e && "function" != typeof e) return {
                        default: e
                    };
                    var n = Ct(t);
                    if (n && n.has(e)) return n.get(e);
                    var a = {},
                        s = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var o in e)
                        if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
                            var l = s ? Object.getOwnPropertyDescriptor(e, o) : null;
                            l && (l.get || l.set) ? Object.defineProperty(a, o, l) : a[o] = e[o]
                        } a.default = e, n && n.set(e, a);
                    return a
                }(n(1)),
                s = n(3),
                o = kt(n(8)),
                l = kt(n(9)),
                i = kt(n(11)),
                r = kt(n(12)),
                c = kt(n(13)),
                m = kt(n(16)),
                p = kt(n(17)),
                d = kt(n(36)),
                u = kt(n(37)),
                g = kt(n(38)),
                h = kt(n(39)),
                f = kt(n(40)),
                b = kt(n(41)),
                y = kt(n(42)),
                _ = kt(n(43)),
                E = kt(n(44)),
                v = kt(n(45)),
                x = kt(n(46)),
                S = kt(n(47)),
                P = kt(n(48)),
                T = kt(n(49)),
                k = kt(n(50)),
                C = kt(n(51)),
                A = kt(n(52)),
                R = kt(n(53)),
                w = kt(n(54)),
                L = kt(n(55)),
                M = kt(n(56)),
                I = kt(n(57)),
                N = kt(n(58)),
                O = kt(n(59)),
                D = kt(n(60)),
                B = kt(n(61)),
                G = kt(n(62)),
                U = kt(n(63)),
                H = kt(n(64)),
                F = kt(n(65)),
                j = kt(n(66)),
                V = kt(n(67)),
                q = kt(n(68)),
                W = kt(n(69)),
                Y = kt(n(70)),
                K = kt(n(71)),
                X = kt(n(72)),
                $ = kt(n(73)),
                Q = kt(n(74)),
                z = kt(n(75)),
                Z = kt(n(76)),
                J = kt(n(77)),
                ee = kt(n(78)),
                te = kt(n(79)),
                ne = kt(n(80)),
                ae = kt(n(81)),
                se = kt(n(82)),
                oe = kt(n(83)),
                le = kt(n(84)),
                ie = kt(n(85)),
                re = kt(n(86)),
                ce = kt(n(87)),
                me = kt(n(88)),
                pe = kt(n(89)),
                de = kt(n(90)),
                ue = kt(n(91)),
                ge = kt(n(92)),
                he = kt(n(93)),
                fe = kt(n(94)),
                be = kt(n(95)),
                ye = kt(n(96)),
                _e = kt(n(97)),
                Ee = kt(n(98)),
                ve = kt(n(101)),
                xe = kt(n(102)),
                Se = kt(n(103)),
                Pe = kt(n(104)),
                Te = kt(n(105)),
                ke = kt(n(109)),
                Ce = kt(n(110)),
                Ae = kt(n(113)),
                Re = kt(n(114)),
                we = kt(n(115)),
                Le = kt(n(116)),
                Me = kt(n(117)),
                Ie = kt(n(118)),
                Ne = kt(n(119)),
                Oe = kt(n(120)),
                De = kt(n(121)),
                Be = kt(n(122)),
                Ge = kt(n(123)),
                Ue = kt(n(124)),
                He = kt(n(125)),
                Fe = kt(n(127)),
                je = kt(n(129)),
                Ve = kt(n(130)),
                qe = kt(n(131)),
                We = kt(n(132)),
                Ye = kt(n(134)),
                Ke = kt(n(135)),
                Xe = kt(n(136)),
                $e = kt(n(137)),
                Qe = kt(n(138)),
                ze = kt(n(139)),
                Ze = kt(n(140)),
                Je = kt(n(141)),
                et = kt(n(142)),
                tt = kt(n(143)),
                nt = kt(n(144)),
                at = kt(n(145)),
                st = kt(n(146)),
                ot = kt(n(147)),
                lt = kt(n(148)),
                it = kt(n(149)),
                rt = kt(n(150)),
                ct = kt(n(151)),
                mt = kt(n(152)),
                pt = kt(n(153)),
                dt = kt(n(154)),
                ut = kt(n(155)),
                gt = kt(n(156)),
                ht = kt(n(157)),
                ft = kt(n(158)),
                bt = kt(n(159)),
                yt = kt(n(160)),
                _t = kt(n(161)),
                Et = kt(n(162)),
                vt = kt(n(163)),
                xt = kt(n(164)),
                St = kt(n(165)),
                Pt = kt(n(166)),
                Tt = kt(n(167));

            function kt(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function Ct(e) {
                if ("function" != typeof WeakMap) return null;
                var t = new WeakMap,
                    n = new WeakMap;
                return (Ct = function(e) {
                    return e ? n : t
                })(e)
            }
            const {
                ArrowFooterComponent: At,
                HextechLoadingAnimationComponent: Rt,
                GameIdClipboardCopyComponent: wt,
                PlayerNameComponent: Lt,
                PostgameReportModal: Mt
            } = a.SharedComponents.getSharedEmberComponents(), {
                ChallengeCardHeaderComponent: It,
                ChallengeCardComponent: Nt,
                ChallengeItemFooterComponent: Ot,
                ChallengeItemTooltipComponent: Dt,
                ChallengeItemComponent: Bt,
                EternalsItemTooltipComponent: Gt,
                EternalsItemComponent: Ut,
                GameDataService: Ht,
                RiotclientService: Ft,
                SummonerService: jt,
                IdentityCustomizerTokenComponent: Vt
            } = a.SharedComponents.getApi_SharedChallengesComponents()
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            const a = n(1).Ember.Router.extend({
                location: "none"
            });
            a.map((function() {
                this.route("postgame")
            }));
            var s = a;
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(10);
            var s = a.Ember.Route.extend({
                beforeModel() {
                    this.replaceWith("postgame")
                }
            });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1).Ember.Route.extend({
                model() {}
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(6);
            var o = a.Ember.Controller.extend({
                gameflow: a.Ember.inject.service(),
                postgame: a.Ember.inject.service(),
                gameclientPostgame: a.Ember.inject.service(),
                backgroundImgPath: a.Ember.computed.alias("gameflow.backgroundImgPath"),
                backgroundImgPathDark: a.Ember.computed.alias("gameflow.backgroundImgPathDark"),
                showPostgameV2: a.Ember.computed.not("gameflow.isTFT"),
                haveEOGStatsBlock: a.Ember.computed.bool("postgame.eogStatsBlock"),
                haveGameClientStatsBlock: a.Ember.computed.bool("gameclientPostgame.gameClientStats"),
                isTFTReadyToShow: a.Ember.computed.and("gameflow.isTFT", "haveGameClientStatsBlock"),
                haveLoLGameClientStatsBlock: a.Ember.computed.bool("gameclientPostgame.lolGameClientStats"),
                isCherryReadyToShow: a.Ember.computed.and("gameflow.isCherry", "haveLoLGameClientStatsBlock"),
                isSRReadyToShow: a.Ember.computed.and("haveEOGStatsBlock", "isEoGPhase"),
                isWaitingForStats: a.Ember.computed.equal("gameflow.phase", s.GAMEFLOW_PHASES.WaitingForStats),
                isEoGPhase: a.Ember.computed.equal("gameflow.phase", s.GAMEFLOW_PHASES.EndOfGame),
                isCustomGame: a.Ember.computed.equal("gameflow.isCustomGame"),
                isPostgameReady: a.Ember.computed.or("isSRReadyToShow", "isCherryReadyToShow", "isTFTReadyToShow", "isCustomGame"),
                skipWaitingForStatsWaitMs: 5e3,
                actions: {
                    skipWaitingForStats: () => (0, a.dataBinding)("/lol-end-of-game").post("/v1/state/dismiss-stats")
                }
            });
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = r(n(5)),
                o = r(n(14)),
                l = n(6),
                i = n(15);

            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            const {
                RunMixin: c
            } = a.EmberAddons.EmberLifeline;
            var m = a.Ember.Component.extend(c, o.default, {
                classNames: ["postgame-component"],
                parties: a.Ember.inject.service(),
                postgame: a.Ember.inject.service(),
                gameflow: a.Ember.inject.service(),
                gameclientPostgame: a.Ember.inject.service(),
                _battleBoostCelebratedGameIds: [],
                isLocalPlayerInTraditionalGame: a.Ember.computed.alias("postgame.isLocalPlayerInGame"),
                isLocalPlayerInTFTGame: a.Ember.computed.and("gameflow.isTFT", "gameClientPostgame.isLocalPlayerInGame"),
                isLocalPlayerInGame: a.Ember.computed.or("isLocalPlayerInTraditionalGame", "isLocalPlayerInTFTGame"),
                backgroundMusic: a.Ember.computed.alias("gameflow.map.assets.postgame-ambience-loop-sound"),
                init() {
                    this._super(...arguments), this.set("extEmberModel", a.extEmberModel)
                },
                didInsertElement() {
                    this._super(...arguments), a.Telemetry.endTracingEvent(i.TELEMETRY_EVENT_NAMES.RENDER_POST_GAME)
                },
                onDidInsertElementPlayMusic: a.Ember.on("didInsertElement", a.Ember.observer("backgroundMusic", (function() {
                    this.get("backgroundMusic") && !this.get("_music") && this.set("_music", this.playBackgroundMusic(this.get("backgroundMusic")))
                }))),
                battleBoostCelebrationObserver: a.Ember.observer("postgame.eogStatsBlock.battleBoostIpEarned", "gameflow.phase", (function() {
                    const e = this.get("postgame.eogStatsBlock.battleBoostIpEarned"),
                        t = this.get("gameflow.phase") === l.GAMEFLOW_PHASES.EndOfGame,
                        n = this.get("postgame.eogStatsBlock.teamBoost.summonerName"),
                        a = this.get("postgame.eogStatsBlock.gameId");
                    e <= 0 || !t || !n || !a || this._battleBoostCelebratedGameIds.includes(a) || (this._showBattleBoostCelebrationToast(n, e, a), this._battleBoostCelebratedGameIds.push(a))
                })),
                _showBattleBoostCelebrationToast: function(e, t, n) {
                    const a = this.get("ToastCelebrationManager");
                    if (!a) return;
                    const s = this.get("tra").formatString("postgame_battle_boost_celebration_title", {
                            blueEssenceAmount: t
                        }),
                        o = e === this.get("postgame.player.summonerName") ? this.get("tra.postgame_battle_boost_celebration_self") : this.get("tra").formatString("postgame_battle_boost_celebration_other", {
                            playerName: e
                        });
                    a.add({
                        type: "DialogToastCelebration",
                        data: {
                            title: s,
                            details: o,
                            iconUrl: "/fe/lol-postgame/images/toast-blue-essence.png",
                            id: n,
                            animationsEnabled: this.get("postgame.largeAreaAnimationsEnabled") || !1
                        },
                        timing: "slow"
                    })
                },
                onWillDestroyElement: a.Ember.on("willDestroyElement", (function() {
                    const e = this.get("_music");
                    e && e.fadeOut(void 0, {
                        stop: !0
                    })
                })),
                _sendScoreboardIdleError: function() {
                    (0, s.default)().sendTelemetryEvent("feature_error", {
                        id: "POSTGAME_IDLE_STATE_AFTER_SCOREBOARD",
                        message: "trapped in an idle state, gameflow not called hide() after we deleted stats",
                        severity: "blocker"
                    })
                },
                actions: {
                    leavePostgame: function(e = !1) {
                        e && this.get("parties").declinePlayAgain(), this.get("postgame").dismissStats(), this.runTask(this._sendScoreboardIdleError, 1e4)
                    }
                }
            });
            t.default = m
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            const s = "rcp-fe-lol-uikit",
                o = "sfx-ui",
                l = "music-ambience";
            var i = a.Ember.Mixin.create({
                ModalManager: (0, a.getProvider)().get(s).getModalManager(),
                ContextMenuManager: (0, a.getProvider)().get(s).getContextMenuManager(),
                ToastCelebrationManager: (0, a.getProvider)().get(s).getToastCelebrationManager(),
                audioPlugin: (0, a.getProvider)().get("rcp-fe-audio"),
                duration: (0, a.getProvider)().get("rcp-fe-lol-l10n").duration(),
                showModal: function(e) {
                    const t = this.get("ModalManager").add(e);
                    return a.Ember.get(t, "data.onOk") && t.okPromise ? t.okPromise.then(e.onOk) : t.acceptPromise && t.acceptPromise.then((() => {
                        a.Ember.get(t, "data.onAccept") && t.data.onAccept()
                    })).catch((() => {
                        a.Ember.get(t, "data.onDecline") && t.data.onDecline()
                    })), t
                },
                removeModal: function(e) {
                    this.get("ModalManager").remove(e)
                },
                assignTooltip: function(e, t, n) {
                    this.get("TooltipManager").assign(e, t, null, n)
                },
                assignContextMenu: function(e, t) {
                    const n = this.get("ContextMenuManager");
                    if (e.removeEventListener("contextmenu", this.get("_contextMenuEventHandler")), t) {
                        const a = e => {
                            n.setMenuItems(t), n.openAtEvent(e), e.preventDefault()
                        };
                        e.addEventListener("contextmenu", a), this.set("_contextMenuEventHandler", a)
                    }
                },
                getAssetPath: function(e) {
                    return "/fe/lol-postgame/" + e
                },
                getLottieAssetPath: function(e) {
                    return "/fe/lol-static-assets/lottie/postgame/" + e
                },
                playSound: function(e) {
                    const t = this.getAssetPath(e),
                        n = this.get("audioPlugin").getChannel(o).createSound(t);
                    return n.play(), n
                },
                playBackgroundMusic: function(e) {
                    const t = this.get("audioPlugin").getChannel(l).createSound(e, {
                        isLoop: !0,
                        fadeIn: !0
                    });
                    return t.play(), t
                }
            });
            t.default = i
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.TELEMETRY_EVENT_NAMES = void 0;
            t.TELEMETRY_EVENT_NAMES = {
                RENDER_POST_GAME: "eog-post-game",
                RENDER_PROGRESSION_SCREEN: "postgame-progression-render",
                TIME_ON_PROGRESSION_SCREEN: "eog-time-on-progression-screen",
                TIME_ON_SCOREBOARD_SCREEN: "eog-time-on-scoreboard-screen",
                TIME_ON_EOG: "eog-time-on-post-game"
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            var l = s.Ember.Component.extend(o.default, {
                classNames: ["postgame-header"],
                postgame: s.Ember.inject.service(),
                postgameRanked: s.Ember.inject.service(),
                isEogInvalid: s.Ember.computed.equal("postgame.eogStatsBlock.invalid", !0),
                isLeaver: s.Ember.computed.readOnly("postgame.player.leaver"),
                isVictory: s.Ember.computed.readOnly("postgame.playerTeam.isWinningTeam"),
                isLossForgiven: s.Ember.computed("isEogInvalid", "isVictory", (function() {
                    return this.get("isEogInvalid") && !this.get("isVictory")
                })),
                isDefeat: s.Ember.computed.not("isVictory"),
                isURFDefeat: s.Ember.computed.and("isDefeat", "isURF"),
                isURF: s.Ember.computed.equal("postgame.eogStatsBlock.gameMode", "URF")
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = (a = n(14)) && a.__esModule ? a : {
                    default: a
                },
                l = n(18);
            var i = s.Ember.Component.extend(o.default, {
                classNames: ["postgame-game-info"],
                gameclientPostgame: s.Ember.inject.service(),
                postgame: s.Ember.inject.service(),
                postgameRanked: s.Ember.inject.service(),
                gameflow: s.Ember.inject.service(),
                leagueNotification: s.Ember.computed.readOnly("postgameRanked.currentLpChangeNotification"),
                gameLength: s.Ember.computed("postgame.eogStatsBlock.gameLength", "gameclientPostgame.lolGameClientStats.statsBlock.gameLengthSeconds", (function() {
                    let e = this.get("postgame.eogStatsBlock.gameLength");
                    return e || (e = this.get("gameclientPostgame.lolGameClientStats.statsBlock.gameLengthSeconds")), this.duration.formatSeconds(e)
                })),
                queueDescription: s.Ember.computed("gameflow.map", "gameflow.queue.detailedDescription", "gameflow.queue.description", "gameflow.isCustomGame", (function() {
                    if (this.get("gameflow.isCustomGame")) return this.get("tra.postgame_tagline_custom");
                    const e = this.get("gameflow.queue");
                    if (!e) return "";
                    return e.detailedDescription ? e.detailedDescription : e.description
                })),
                rankedPlayerWinLoss: s.Ember.computed("leagueNotification.wins", "leagueNotification.losses", (function() {
                    const e = this.get("leagueNotification.wins") || 0,
                        t = this.get("leagueNotification.losses") || 0;
                    return this.get("tra").formatString("postgame_rank_tagline_win_loss", {
                        winCount: e,
                        lossCount: t
                    })
                })),
                nonRankedPlayerWinLoss: s.Ember.computed("postgame.player.wins", "postgame.player.losses", (function() {
                    const e = this.get("postgame.player.wins") || 0,
                        t = this.get("postgame.player.losses") || 0;
                    return this.get("tra").formatString("postgame_rank_tagline_win_loss", {
                        winCount: e,
                        lossCount: t
                    })
                })),
                playerWinLoss: s.Ember.computed("leagueNotification.queueType", "nonRankedPlayerWinLoss", "rankedPlayerWinLoss", (function() {
                    return Boolean(this.get("leagueNotification")) && this._isRankedQueueSR(this.get("leagueNotification.queueType")) ? this.get("rankedPlayerWinLoss") : this.get("nonRankedPlayerWinLoss")
                })),
                _isRankedQueueSR: e => Boolean(e) && l.QUEUES.RANKED_SR_QUEUE_TYPES.includes(e)
            });
            t.default = i
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
                    return o.default
                }
            }), Object.defineProperty(t, "SETTINGS", {
                enumerable: !0,
                get: function() {
                    return i.default
                }
            }), Object.defineProperty(t, "SOCIAL", {
                enumerable: !0,
                get: function() {
                    return l.default
                }
            }), Object.defineProperty(t, "TIME", {
                enumerable: !0,
                get: function() {
                    return c.default
                }
            });
            var a = m(n(19)),
                s = m(n(30)),
                o = m(n(31)),
                l = m(n(32)),
                i = m(n(33)),
                r = m(n(34)),
                c = m(n(35));

            function m(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = u(n(20)),
                s = u(n(21)),
                o = u(n(22)),
                l = u(n(23)),
                i = u(n(24)),
                r = u(n(25)),
                c = u(n(26)),
                m = u(n(27)),
                p = u(n(28)),
                d = u(n(29));

            function u(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            var g = {
                COMPONENT_TYPES: a.default,
                CURRENCY_TYPES: s.default,
                INVENTORY_TYPES: o.default,
                MEDIA_TYPES: l.default,
                MEDIA_LOAD_TYPES: i.default,
                MODAL_TYPES: r.default,
                OFFER_PURCHASE_STATES: c.default,
                OFFER_VALIDATION_STATES: m.default,
                SCROLL_LIST_DISPLAY_TYPES: p.default,
                TEMPLATE_TYPES: d.default
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
                o = "CHERRY",
                l = "RANKED_TFT",
                i = "RANKED_TFT_DOUBLE_UP",
                r = "RANKED_TFT_TURBO",
                c = "RANKED_TFT_PAIRS",
                m = [n, a],
                p = [...m, s],
                d = [o],
                u = [l, i],
                g = [r, c],
                h = [...u, ...g],
                f = [...p, ...u],
                b = [...g, ...d];
            var y = {
                RANKED_SOLO_5x5_QUEUE_TYPE: n,
                RANKED_FLEX_SR_QUEUE_TYPE: a,
                RANKED_FLEX_TT_QUEUE_TYPE: s,
                RANKED_CHERRY_QUEUE_TYPE: o,
                RANKED_TFT_QUEUE_TYPE: l,
                RANKED_TFT_DOUBLE_UP_QUEUE_TYPE: i,
                RANKED_TFT_TURBO_QUEUE_TYPE: r,
                RANKED_TFT_PAIRS_QUEUE_TYPE: c,
                RANKED_LOL_QUEUE_TYPES: p,
                RANKED_SR_QUEUE_TYPES: m,
                RANKED_TFT_QUEUE_TYPES: u,
                RATED_TFT_QUEUE_TYPES: g,
                RANKED_AND_RATED_TFT_QUEUE_TYPES: h,
                ALL_RANKED_QUEUE_TYPES: f,
                ALL_RATED_QUEUE_TYPES: b,
                ALL_RANKED_AND_RATED_QUEUE_TYPES: [...f, ...b]
            };
            t.default = y
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
                o = 6048e5,
                l = {
                    MILLISECONDS_IN_A_SECOND: 1e3,
                    MILLISECONDS_IN_A_MINUTE: 6e4,
                    MILLISECONDS_IN_A_HOUR: a,
                    MILLISECONDS_IN_A_DAY: s,
                    MILLISECONDS_IN_A_WEEK: o,
                    MILLISECONDS_IN_A_YEAR: 314496e5
                };
            t.TIME_CONVERSIONS = l;
            var i = {
                TIME_UNITS: n,
                TIME_CONVERSIONS: l
            };
            t.default = i
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            var l = s.Ember.Component.extend(o.default, {
                classNames: ["postgame-game-info-icons"],
                postgame: s.Ember.inject.service(),
                rerollData: s.Ember.computed.readOnly("postgame.eogStatsBlock.rerollData"),
                pointChangeFromGameplay: s.Ember.computed.readOnly("rerollData.pointChangeFromGameplay"),
                pointChangeFromChampionsOwned: s.Ember.computed.readOnly("rerollData.pointChangeFromChampionsOwned"),
                rerollCount: s.Ember.computed.readOnly("rerollData.rerollCount"),
                rerollPointsEarned: s.Ember.computed("pointChangeFromGameplay", "pointChangeFromChampionsOwned", (function() {
                    return this.get("pointChangeFromGameplay") + this.get("pointChangeFromChampionsOwned") || 0
                })),
                rerollPointsTagline: s.Ember.computed("postgame_reroll_points_tagline", "rerollCount", "rerollPointsEarned", (function() {
                    return this.get("tra").formatString("postgame_reroll_points_tagline", {
                        rerollPointsEarned: this.get("rerollPointsEarned"),
                        currentRerolls: this.get("rerollCount"),
                        maxRerolls: 2
                    })
                })),
                areRerollPointsAvailable: s.Ember.computed.gt("rerollPointsEarned", 0)
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = (a = n(14)) && a.__esModule ? a : {
                    default: a
                },
                l = n(3);
            var i = s.Ember.Component.extend(o.default, {
                classNames: ["postgame-game-result"],
                classNameBindings: ["isVictory:postgame-victory", "isDefeat:postgame-defeat", "isLeaver:postgame-leaver"],
                gameclientPostgame: s.Ember.inject.service(),
                gameflow: s.Ember.inject.service(),
                postgame: s.Ember.inject.service(),
                postgameRanked: s.Ember.inject.service(),
                gameMode: s.Ember.computed.alias("gameflow.gameflowSession.gameData.queue.gameMode"),
                rankedStats: s.Ember.computed.alias("postgameRanked.currentRankedStats"),
                rankedNotification: s.Ember.computed.alias("postgameRanked.currentLpChangeNotification"),
                isEarlySurrenderBystander: s.Ember.computed.readOnly("postgame.isEarlySurrenderBystander"),
                isEarlySurrenderCauser: s.Ember.computed("postgame.eogStatsBlock.gameEndedInEarlySurrender", "postgame.eogStatsBlock.teamEarlySurrendered", "postgame.eogStatsBlock.causedEarlySurrender", (function() {
                    return this.get("postgame.eogStatsBlock.gameEndedInEarlySurrender") && this.get("postgame.eogStatsBlock.teamEarlySurrendered") && this.get("postgame.eogStatsBlock.causedEarlySurrender")
                })),
                isEarlySurrenderAccomplice: s.Ember.computed("postgame.eogStatsBlock.gameEndedInEarlySurrender", "postgame.eogStatsBlock.teamEarlySurrendered", "postgame.eogStatsBlock.isEarlySurrenderAccomplice", (function() {
                    return this.get("postgame.eogStatsBlock.gameEndedInEarlySurrender") && this.get("postgame.eogStatsBlock.teamEarlySurrendered") && this.get("postgame.eogStatsBlock.isEarlySurrenderAccomplice")
                })),
                isGameModeWithSubteams: s.Ember.computed("gameMode", (function() {
                    return !!l.GAME_MODES_WITH_SUBTEAMS[this.get("gameMode")]
                })),
                subteamPlacementString: s.Ember.computed("postgame.eogStatsBlock", "gameclientPostgame.lolGameClientStats", (function() {
                    let e = this.get("postgame.eogStatsBlock");
                    return e || (e = this.get("gameclientPostgame.lolGameClientStats")), e.localPlayer && e.localPlayer.stats && this.get("tra").get(l.SUBTEAM_PLACEMENT_LONG_TRA_KEY + e.localPlayer.stats.PLAYER_SUBTEAM_PLACEMENT) || ""
                })),
                shouldShowPlacements: s.Ember.computed("postgameRanked.isProvisional", "postgame.isEarlySurrenderBystander", "provisionalGameThreshold", (function() {
                    return !this.get("postgame.isEarlySurrenderBystander") && this.get("postgameRanked.isProvisional") && this.get("provisionalGameThreshold")
                })),
                provisionalGameThreshold: s.Ember.computed("rankedStats.queueMap", "rankedNotification.queueType", (function() {
                    const e = this.get("rankedNotification.queueType"),
                        t = this.get("rankedStats.queueMap");
                    if (t && t[e]) return t[e].provisionalGameThreshold
                })),
                placementGamesString: s.Ember.computed("rankedNotification.provisionalGamesRemaining", "provisionalGameThreshold", "tra.postgame_rank_tagline_placement_game", (function() {
                    const e = this.get("provisionalGameThreshold"),
                        t = this.get("rankedNotification.provisionalGamesRemaining");
                    return this.get("tra").formatString("postgame_rank_tagline_placement_game", {
                        gameCount: e - t || 1,
                        provisionalGameThreshold: e || 1
                    })
                })),
                tierDivisionString: s.Ember.computed("rankedNotification.division", "rankedNotification.tier", (function() {
                    const e = this.get("rankedNotification.division"),
                        t = this.get("rankedNotification.tier");
                    return s.leagueTierNames.getFullTierDivisionName(t, e)
                })),
                rankedInfoTagline: s.Ember.computed("rankedNotification.notifyReason", "tierDivisionString", "tra.postgame_rank_tagline_LEAGUE_PROMOTED", (function() {
                    switch (this.get("rankedNotification.notifyReason")) {
                        case "LEAGUE_DEMOTED":
                            return this.get("tra").formatString("postgame_rank_tagline_LEAGUE_DEMOTED", {
                                newRank: this.get("tierDivisionString")
                            });
                        case "LEAGUE_PROMOTED":
                            return this.get("tra").formatString("postgame_rank_tagline_LEAGUE_PROMOTED", {
                                newRank: this.get("tierDivisionString")
                            });
                        case "LEAGUE_SEEDED":
                            return this.get("tra").formatString("postgame_rank_tagline_LEAGUE_SEEDED", {
                                newRank: this.get("tierDivisionString")
                            });
                        case "MINISERIES_CANCEL":
                            return this.get("tra.postgame_rank_tagline_MINISERIES_CANCEL");
                        case "MINISERIES_LOST":
                            return this.get("tra.postgame_rank_tagline_MINISERIES_LOST");
                        case "MINISERIES_START":
                            return this.get("tra.postgame_rank_tagline_MINISERIES_START");
                        default:
                            return ""
                    }
                }))
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Component.extend({
                    classNames: ["postgame-game-result-icon"],
                    gameflow: a.Ember.inject.service(),
                    icon: a.Ember.computed("isLossForgiven", "isLeaver", "isVictory", "isTop4", "gameflow.map.assets.icon-victory", "gameflow.map.assets.icon-defeat", "gameflow.map.assets.icon-leaver", "gameflow.map.assets.icon-empty", (function() {
                        return this.get("isLossForgiven") ? this.get("gameflow.map.assets.icon-loss-forgiven-v2") : this.get("isLeaver") ? this.get("gameflow.map.assets.icon-leaver-v2") : this.get("isVictory") || this.get("isTop4") ? this.get("gameflow.map.assets.icon-victory") : this.get("gameflow.map.assets.icon-defeat")
                    }))
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = l(n(14)),
                o = l(n(5));

            function l(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            const {
                RunMixin: i
            } = a.EmberAddons.EmberLifeline;
            var r = a.Ember.Component.extend(i, s.default, {
                classNames: ["postgame-scoreboard-component"],
                classNameBindings: ["isTFT:postgame-tft-scoreboard"],
                postgame: a.Ember.inject.service(),
                parties: a.Ember.inject.service(),
                gameflow: a.Ember.inject.service(),
                gameclientPostgame: a.Ember.inject.service(),
                isTFT: a.Ember.computed.alias("gameflow.isTFT"),
                isLocalPlayerInGame: a.Ember.computed.or("gameclientPostgame.isLocalPlayerInGame", "postgame.isLocalPlayerInGame"),
                init() {
                    this._super(...arguments), this.set("extEmberModel", a.extEmberModel)
                },
                teams: a.Ember.computed.alias("postgame.eogStatsBlock.teams"),
                populatedTeams: a.Ember.computed.filter("teams", (function(e) {
                    return e.players && e.players.length
                })),
                isFooterDisabled: !1,
                canNotPlayAgain: a.Ember.computed("gameflow.canPlayAgain", "gameId", "extEmberModel.playAgainOverride", "isTFT", "parties.partyGameMode", (function() {
                    let e = this.get("gameflow.canPlayAgain");
                    return this.get("gameId") && this.hasPlayAgainOverride() ? e = !0 : this.get("isTFT") && (e = !!this.get("parties.partyGameMode")), !e
                })),
                isPlayAgainDisabled: a.Ember.computed.or("canNotPlayAgain", "isFooterDisabled"),
                backButtonDisabled: !0,
                isDetailsTabOpen: !1,
                gameId: a.Ember.computed.alias("gameflow.gameId"),
                confirmButtonText: a.Ember.computed("parties.confirmButtonText", "gameId", "extEmberModel.playAgainOverride", (function() {
                    let e = this.get("parties.confirmButtonText");
                    if (this.get("gameId") && this.hasPlayAgainOverride()) {
                        e = this.get("extEmberModel.playAgainOverride").confirmButtonText
                    }
                    return e || ""
                })),
                closeButtonText: a.Ember.computed.alias("tra.postgame_scoreboard_button_nav_quit"),
                tftPlayers: a.Ember.computed.alias("gameclientPostgame.players"),
                tftPartnerGroupsByPlacement: a.Ember.computed("tftPlayers", (function() {
                    const e = (this.get("gameclientPostgame.players") || []).map((e => e.partnerGroupId));
                    return [...new Set(e)]
                })),
                hasPartnerGroups: a.Ember.computed.gt("tftPartnerGroupsByPlacement.0", 0),
                isPlaybookEnabled: a.Ember.computed.alias("gameclientPostgame.isPlaybookEnabled"),
                hasPlayAgainOverride: function() {
                    const e = this.get("extEmberModel.playAgainOverride");
                    return e && e.gameflowGameId && e.navigationCallback && e.gameflowGameId === this.get("gameId")
                },
                lockFooterButtons: function() {
                    this.set("isFooterDisabled", !0), this.runTask((() => {
                        this.set("isFooterDisabled", !1)
                    }), 3e4)
                },
                lockFooterAndLeavePostgame: function() {
                    this.lockFooterButtons(), this.sendAction("leavePostgame", !0)
                },
                actions: {
                    goToHome: function() {
                        const e = this.get("gameflow.lastQueuedMemberSummonerIds"),
                            t = this.get("parties.hasActiveParty");
                        if (e && e.length > 1 && t) {
                            this.showModal({
                                type: "DialogConfirm",
                                data: {
                                    contents: this.get("tra.parties_leave_confirm_message"),
                                    acceptText: this.get("tra.parties_leave_confirm_accept"),
                                    declineText: this.get("tra.parties_leave_confirm_decline"),
                                    closeButton: !1
                                }
                            }).acceptPromise.then((() => {
                                this.lockFooterAndLeavePostgame()
                            }), (() => {}))
                        } else this.lockFooterAndLeavePostgame()
                    },
                    playAgain: function() {
                        if (this.lockFooterButtons(), this.hasPlayAgainOverride()) {
                            this.get("extEmberModel.playAgainOverride").navigationCallback()
                        } else this.get("parties").playAgain().then((() => {
                            this.sendAction("leavePostgame", !1)
                        })).catch((() => {
                            this.sendAction("leavePostgame", !1), (0, o.default)().sendTelemetryEvent("feature_error", {
                                id: "POSTGAME_PLAY_AGAIN_FAILURE",
                                message: "play again clicked, but failed to create new lobby",
                                severity: "critical"
                            })
                        }))
                    },
                    displayAdvancedDetails: function() {
                        const e = () => this.set("isDetailsTabOpen", !1);
                        (0, a.getProvider)().getOptional("rcp-fe-lol-match-history").then((t => {
                            t.displayMatchDetails({
                                sections: ["stats", "graph", "runes"],
                                defaultSection: "stats",
                                dataSource: "eogStats",
                                hideHeader: !0,
                                closeModalCallback: e
                            })
                        }), (e => a.logger.error("Provider getOptional failure", e))), this.set("isDetailsTabOpen", !0), this.get("postgame").trigger("advancedDetailsDisplayed")
                    }
                }
            });
            t.default = r
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Component.extend({
                    classNames: ["postgame-player-augment-border"],
                    classNameBindings: ["rarityClass"],
                    postgame: a.Ember.inject.service(),
                    augmentData: a.Ember.computed("augmentId", "postgame.augmentsMap", (function() {
                        return this.get("postgame.augmentsMap")[this.get("augmentId")]
                    })),
                    rarityClass: a.Ember.computed("augmentData", (function() {
                        return `postgame-player-augment-rarity-${this.get("augmentData.rarity")||"none"}`
                    }))
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Component.extend({
                    classNames: ["postgame-player-keystone-icon"],
                    classNameBindings: ["circleIconHolder", "isSubStyle"],
                    postgame: a.Ember.inject.service(),
                    sanitizeConfig: {
                        allowedTags: ["p", "em", "i", "br", "b", "strong", "hr", "h1", "h2", "h3", "a", "h4", "h5", "strike", "code", "ul", "ol", "li", "blockquote", "lol-uikit-tooltipped-keyword"],
                        allowedAttributes: {
                            "lol-uikit-tooltipped-keyword": ["key"]
                        }
                    },
                    keystone: a.Ember.computed("keystoneId", "isSubStyle", "postgame.perkStyles", "postgame.runesMap", (function() {
                        const e = this.get("keystoneId"),
                            t = this.get("postgame.runesMap"),
                            n = this.get("isSubStyle"),
                            a = this.get("postgame.perkStyles") || [];
                        return e && t ? n ? a.find((t => t.id === e)) : t[e] : {}
                    }))
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1).Ember.Component.extend({
                classNames: ["postgame-player-buttons"],
                showInviteButton: !0,
                actions: {
                    sendFriendRequest: function(e) {
                        this.sendAction("sendFriendRequest", e)
                    },
                    showReportDialog: function(e) {
                        this.sendAction("showReportDialog", e)
                    },
                    inviteToParty: function(e) {
                        this.sendAction("inviteToParty", e), this.set("isInviteDisabled", !0), this.$(".postgame-player-invite-to-party").addClass("invited")
                    }
                }
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Component.extend({
                    classNames: ["postgame-player-item"],
                    attributeBindings: ["style"],
                    postgame: a.Ember.inject.service(),
                    itemData: a.Ember.computed("itemId", "postgame.itemsMap", (function() {
                        return this.get("postgame.itemsMap")[this.get("itemId")]
                    })),
                    style: a.Ember.computed("itemData", (function() {
                        return "background-image: url(" + this.get("itemData.iconPath") + ");"
                    }))
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            var s = a.Ember.Component.extend({
                classNames: ["postgame-progression"],
                classNameBindings: ["isClassicMode:postgame-progression-classic-mode:postgame-progression-aram-mode", "componentSharedData.animationSequence"],
                postgame: a.Ember.inject.service(),
                gameflow: a.Ember.inject.service(),
                isClassicMode: a.Ember.computed.equal("postgame.eogStatsBlock.gameMode", "CLASSIC"),
                progressionComponents: [],
                onDidInsertElement: a.Ember.on("didInsertElement", (function() {
                    const e = a.ProgressionComponentHelper.getProgressionComponents(),
                        t = this._setupAnimationPromises(e);
                    this.set("progressionComponents", t)
                })),
                scrollableComponents: a.Ember.computed("progressionComponents", (function() {
                    return this.get("progressionComponents").filter((e => !e.isFixed))
                })),
                fixedComponents: a.Ember.computed("progressionComponents", (function() {
                    return this.get("progressionComponents").filter((e => e.isFixed))
                })),
                animationTimeout: 5e3,
                animationInitialDelay: 2500,
                _setupAnimationPromises: function(e) {
                    const t = [];
                    for (let n = -1; n < e.length; n++) {
                        const a = n < 0,
                            s = e && e[n] && e[n].hasAnimation;
                        a || s ? this._appendNewAnimationPromise(t) : this._appendPreviousAnimationPromise(t)
                    }
                    for (let n = 0; n < e.length; n++) e[n].previousAnimationPromise = t[n].promise, e[n].resolveAnimationPromise = t[n + 1].resolve, this._setupAnimationPromiseTimeout(t[n].promise, t[n + 1].resolve);
                    return setTimeout(t[0].resolve, this.get("animationInitialDelay")), e
                },
                _appendNewAnimationPromise: function(e) {
                    let t = null;
                    const n = new Promise((function(e) {
                        t = e
                    }));
                    e.push({
                        promise: n,
                        resolve: t
                    })
                },
                _appendPreviousAnimationPromise: function(e) {
                    e.push({
                        promise: e[e.length - 1].promise,
                        resolve: function() {}
                    })
                },
                _setupAnimationPromiseTimeout: function(e, t) {
                    const n = this.get("animationTimeout");
                    e.then((() => {
                        setTimeout(t, n)
                    }))
                }
            });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Component.extend({
                    classNames: ["postgame-progression-number-reels"],
                    postgame: a.Ember.inject.service(),
                    totalFormatted: a.Ember.computed("total", "addPlus", (function() {
                        const e = this.get("total") || 0;
                        return this.get("addPlus") ? `+${e}` : e
                    }))
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1).Ember.Component.extend({
                classNames: ["postgame-breakdown"]
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = n(3),
                l = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            const i = s.dataBinding.bindTo((0, s.getProvider)().getSocket()),
                {
                    RunMixin: r
                } = s.EmberAddons.EmberLifeline;
            var c = s.Ember.Component.extend(r, l.default, {
                classNames: ["postgame-scoreboard-player-honor-flair"],
                honor: s.Ember.inject.service(),
                gameName: null,
                tagLine: null,
                summonerName: null,
                displayName: s.Ember.computed("gameName", "tagLine", "summonerName", (function() {
                    return this._playerNames.isUsingAlias ? `${this.get("gameName")} #${this.get("tagLine")}` : this.get("summonerName")
                })),
                isLowSpec: null,
                uxSettings: s.Ember.computed.readOnly("honor.uxSettings"),
                teamChoices: s.Ember.computed.readOnly("honor.teamChoices"),
                hasCelebrated: !1,
                chatCelebrationSent: !1,
                conversations: s.Ember.computed.readOnly("honor.conversations"),
                init: function() {
                    this._super(...arguments), this._playerNames = s.playerNames
                },
                observersOnInit: s.Ember.on("init", (function() {
                    this.addObserver("conversationId", this, "processChatCelebration"), this.addObserver("hasCelebrated", this, "processChatCelebration"), this.processChatCelebration()
                })),
                observersOnWillDestroy: s.Ember.on("willDestroyElement", (function() {
                    this.removeObserver("conversationId", this, "processChatCelebration"), this.removeObserver("hasCelebrated", this, "processChatCelebration"), this.removeObserver("uxSettings.data.potatoModeEnabled", this, "lowSpecHandler"), this.removeObserver("teamChoices.[]", this, "processRecipients");
                    const e = this.$(".honor-postgame-celebration-video");
                    e && e.attr("src", "")
                })),
                observersOnDidInsertElement: s.Ember.on("didInsertElement", (function() {
                    this.addObserver("uxSettings.data.potatoModeEnabled", this, "lowSpecHandler"), this.addObserver("teamChoices.[]", this, "processRecipients"), this.lowSpecHandler(), this.processRecipients()
                })),
                lowSpecHandler: function() {
                    this.get("hasCelebrated") || this.set("isLowSpec", this.get("uxSettings.data.potatoModeEnabled"))
                },
                hideTooltipClassName: s.Ember.computed("hasCelebrated", (function() {
                    return this.get("hasCelebrated") ? "" : "hidden"
                })),
                processRecipients: function() {
                    const e = this.get("puuid"),
                        t = this.get("teamChoices");
                    if (!this.get("hasCelebrated") && t && t.includes(e)) {
                        this.set("hasCelebrated", !0);
                        this.celebrateHonors.bind(this)()
                    }
                },
                celebrateHonors: function() {
                    const e = ".postgame-player-identity-content",
                        t = this.$().parents(e).find(".postgame-player-name"),
                        n = this.$().parents(e).find(".postgame-player-buttons");
                    t.css("transition", "all 0.5s"), t.css("transform", "translateX(21px)"), n.css("transition", "all 0.5s"), n.css("transform", "translateX(21px)");
                    const a = this.$(".honor-postgame-celebration-video");
                    a && a[0] && a[0].play(), this.playSound("sfx-honor-scoreboard-team-choice.ogg")
                },
                tooltipText: s.Ember.computed("isLocalPlayer", "displayName", (function() {
                    return this.get("isLocalPlayer") ? this.get("tra").formatString("honor_postgame_most_honorable_player_tooltip") : this.get("tra").formatString("honor_postgame_most_honorable_player_tooltip_other", {
                        playerName: this.get("displayName")
                    })
                })),
                teamChoiceMograph: o.HONOR_VIDEO_PATH + "EOG_TeamChoice_Intro.webm",
                teamChoiceIconPath: s.Ember.computed((function() {
                    return this.getAssetPath("Honor_Scoreboard_Leaf.png")
                })),
                processChatCelebration: function() {
                    const e = this.get("conversationId"),
                        t = this.get("hasCelebrated"),
                        n = this.get("chatCelebrationSent");
                    e && t && !n && (this.set("chatCelebrationSent", !0), this.createChatCelebration(e))
                },
                createChatCelebration: function(e) {
                    let t;
                    t = this.get("isLocalPlayer") ? this.get("tra").formatString("honor_postgame_most_honorable_player_chat_celebration") : this.get("isPlayerTeam") ? this.get("tra").formatString("honor_postgame_most_honorable_player_chat_celebration_teammate", {
                        playerName: this.get("displayName")
                    }) : this.get("tra").formatString("honor_postgame_most_honorable_player_chat_celebration_other", {
                        playerName: this.get("displayName")
                    }), this.runTask((() => {
                        i.post(`/lol-chat/v1/conversations/${encodeURIComponent(e)}/messages`, {
                            body: t,
                            type: "celebration"
                        })
                    }), 1e3)
                },
                conversationId: s.Ember.computed("conversations.@each.id", (function() {
                    const e = this.get("conversations");
                    let t = null;
                    return e && e.some((function(e) {
                        if (e.type === o.CONVERSATION_TYPE_POSTGAME) return t = e.id, !0
                    })), t
                }))
            });
            t.default = c
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = n(3),
                l = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            const i = s.dataBinding.bindTo((0, s.getProvider)().getSocket()),
                {
                    RunMixin: r
                } = s.EmberAddons.EmberLifeline;
            var c = s.Ember.Component.extend(r, l.default, {
                postgame: s.Ember.inject.service(),
                honor: s.Ember.inject.service(),
                classNameBindings: ["postgameNotificationClassName", "isActiveClass"],
                postgameNotificationClassName: "postgame-scoreboard-progression-honor-notification-component",
                transitionLock: 2,
                displayedHonors: [],
                displayedFlairEarned: 0,
                honorCategories: o.CATEGORY_DATA,
                showedFullTeamVote: !1,
                hexakillClass: "",
                animationInitialDelay: 2500,
                receivedHonors: s.Ember.computed.readOnly("honor.receivedHonors"),
                honorProfile: s.Ember.computed.readOnly("honor.honorProfile"),
                voteCompletion: s.Ember.computed.readOnly("honor.voteCompletion"),
                conversations: s.Ember.computed.readOnly("honor.conversations"),
                eogData: s.Ember.computed.readOnly("postgame.eogStatsBlock"),
                uxSettings: s.Ember.computed.readOnly("honor.uxSettings"),
                init: function() {
                    this._super(...arguments), i.observe("/lol-honor-v2/v1/latest-eligible-game", this, this.handleLatestEligibleGame), this.addObserver("conversationId", this, "processFullTeamVote"), this.addObserver("voteCompleted", this, "processFullTeamVote"), this.addObserver("voteCompletion.fullTeamVote", this, "processFullTeamVote"), this.processFullTeamVote(), this.set("previousAnimationPromise", new Promise((e => {
                        setTimeout(e, this.get("animationInitialDelay"))
                    }))), this.set("resolveAnimationPromise", (() => {}))
                },
                didInsertElement: function() {
                    this._super(...arguments);
                    const e = this.send.bind(this),
                        t = this.get("resolveAnimationPromise");
                    this.runTask((function() {
                        e("decrementTransitionLock")
                    }), 500), this.get("previousAnimationPromise").then((function() {
                        e("decrementTransitionLock"), t()
                    })), this.addObserver("receivedHonors.[]", this, "processNotifications"), this.addObserver("transitionLock", this, "processNotifications"), this.processNotifications()
                },
                willDestroyElement: function() {
                    this._super(...arguments), this.removeObserver("conversationId", this, "processFullTeamVote"), this.removeObserver("voteCompleted", this, "processFullTeamVote"), this.removeObserver("voteCompletion.fullTeamVote", this, "processFullTeamVote"), this.removeObserver("receivedHonors.[]", this, "processNotifications"), this.removeObserver("transitionLock", this, "processNotifications"), i.unobserve("/lol-honor-v2/v1/latest-eligible-game", this)
                },
                handleLatestEligibleGame: function(e) {
                    this.isDestroying || this.isDestroyed || this.set("latestHonorEligibleGame", e)
                },
                isActiveClass: s.Ember.computed("voteCompleted", "receivedHonors.[]", "currentGameIsHonorEligible", "honor.enabled", (function() {
                    return this.get("honor.enabled") && this.get("currentGameIsHonorEligible") && (!this.get("voteCompleted") || this.get("receivedHonors") && 0 !== this.get("receivedHonors.length")) ? "active" : ""
                })),
                headerText: s.Ember.computed((function() {
                    return this.get("tra").get("honor-postgame-received-header")
                })),
                headerProgressText: s.Ember.computed((function() {
                    return this.get("tra").get("honor-postgame-received-header-progress")
                })),
                headerVisibilityClass: s.Ember.computed("voteCompleted", "receivedHonors.[]", (function() {
                    return this.get("voteCompleted") && this.get("receivedHonors.length") > 0 ? "active" : ""
                })),
                headerProgressVisibilityClass: s.Ember.computed("voteCompleted", "receivedHonors.[]", (function() {
                    return this.get("voteCompleted") && this.get("receivedHonors.length") > 0 ? "" : "active"
                })),
                headerTooltipIsVisible: s.Ember.computed("isHiddenClass", (function() {
                    return !this.get("isHiddenClass")
                })),
                headerTooltip: s.Ember.computed("honor.recallRewardEnabled", (function() {
                    return this.get("honor.recallRewardEnabled") ? this.get("tra").get("honor-postgame-received-header-recall-tooltip") : this.get("tra").get("honor-postgame-received-header-tooltip")
                })),
                processNotifications: function() {
                    let e = this.get("displayedHonors");
                    const t = this.get("receivedHonors");
                    !t || this.isTransitionLocked() || t.length <= e.length || (this.send("incrementTransitionLock"), e = t.slice(0, Math.min(e.length + 1, 5)), e.length > 4 && this.set("hexakillClass", "hexakill"), this.set("displayedHonors", e), this.processFlairEarned(e))
                },
                isTransitionLocked: function() {
                    return this.get("transitionLock") > 0
                },
                processFlairEarned: function(e) {
                    e.find((e => "STRANGER" === e.voterRelationship)) ? this.set("displayedFlairEarned", 2) : e.length >= 2 ? this.set("displayedFlairEarned", 1) : this.set("displayedFlairEarned", 0)
                },
                strangerFlairIcon: s.Ember.computed("honorProfile.honorLevel", (function() {
                    const e = this.get("honorProfile.honorLevel");
                    return 3 === e ? o.HONOR_ASSET_PATH + "Level3_Stranger.png" : 4 === e ? o.HONOR_ASSET_PATH + "Level4_Stranger.png" : 5 === e ? o.HONOR_ASSET_PATH + "Level5_Stranger.png" : ""
                })),
                premadeFlairIcon: s.Ember.computed("honorProfile.honorLevel", (function() {
                    const e = this.get("honorProfile.honorLevel");
                    return 3 === e ? o.HONOR_ASSET_PATH + "Level3_Premade.png" : 4 === e ? o.HONOR_ASSET_PATH + "Level4_Premade.png" : 5 === e ? o.HONOR_ASSET_PATH + "Level5_Premade.png" : ""
                })),
                strangerFlairVisibilityClass: s.Ember.computed("honorProfile.honorLevel", "displayedFlairEarned", (function() {
                    return 2 === this.get("displayedFlairEarned") && this.get("honorProfile.honorLevel") >= 3 ? "visible" : ""
                })),
                premadeFlairVisibilityClass: s.Ember.computed("displayedFlairEarned", "honorProfile.honorLevel", (function() {
                    return 1 === this.get("displayedFlairEarned") && this.get("honorProfile.honorLevel") >= 3 ? "visible" : ""
                })),
                flairTooltipIsVisible: s.Ember.computed("displayedFlairEarned", "honorProfile.honorLevel", (function() {
                    return 0 !== this.get("displayedFlairEarned") && this.get("honorProfile.honorLevel") >= 3
                })),
                flairTooltip: s.Ember.computed("displayedFlairEarned", "honor.recallRewardEnabled", (function() {
                    const e = this.get("displayedFlairEarned"),
                        t = this.get("honor.recallRewardEnabled");
                    return 1 === e ? t ? this.get("tra").get("honor_postgame_premade_flair_recall_tooltip") : this.get("tra").get("honor_postgame_premade_flair_tooltip") : 2 === e ? t ? this.get("tra").get("honor_postgame_stranger_flair_recall_tooltip") : this.get("tra").get("honor_postgame_stranger_flair_tooltip") : ""
                })),
                processFullTeamVote: function() {
                    const e = this.get("conversationId"),
                        t = this.get("showedFullTeamVote"),
                        n = this.get("voteCompleted"),
                        a = this.get("voteCompletion.fullTeamVote");
                    e && !t && n && a && (this.set("showedFullTeamVote", !0), this.createChatCelebration(e))
                },
                voteCompleted: s.Ember.computed("eogData.reportGameId", "voteCompletion.gameId", (function() {
                    return this.get("eogData.reportGameId") === this.get("voteCompletion.gameId")
                })),
                progressVisibilityClass: s.Ember.computed("voteCompleted", (function() {
                    return this.get("voteCompleted") ? "hidden" : ""
                })),
                progressIndicator: o.HONOR_ASSET_PATH + "Voting_Progress_Indicator.png",
                currentGameIsHonorEligible: s.Ember.computed("latestHonorEligibleGame", "eogData.reportGameId", (function() {
                    const e = this.get("latestHonorEligibleGame"),
                        t = this.get("eogData.reportGameId");
                    return e && t && e === t
                })),
                createChatCelebration: function(e) {
                    const t = this.get("tra").get("honor_postgame_full_team_vote");
                    t && i.post(`/lol-chat/v1/conversations/${encodeURIComponent(e)}/messages`, {
                        body: t,
                        type: "celebration"
                    })
                },
                conversationId: s.Ember.computed("conversations.@each.id", (function() {
                    const e = this.get("conversations");
                    let t = null;
                    return e && e.some((function(e) {
                        if (e.type === o.CONVERSATION_TYPE_POSTGAME) return t = e.id, !0
                    })), t
                })),
                isLowSpec: s.Ember.computed("uxSettings", "uxSettings.data", "uxSettings.data.potatoModeEnabled", (function() {
                    return !!this.get("uxSettings.data.potatoModeEnabled")
                })),
                actions: {
                    incrementTransitionLock: function() {
                        this.set("transitionLock", this.get("transitionLock") + 1)
                    },
                    decrementTransitionLock: function() {
                        this.set("transitionLock", Math.max(this.get("transitionLock") - 1, 0))
                    }
                }
            });
            t.default = c
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = n(3),
                l = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            const {
                RunMixin: i
            } = s.EmberAddons.EmberLifeline;
            var r = s.Ember.Component.extend(i, l.default, {
                classNameBindings: ["postgameNotificationClassName", "honorTypeClassName", "positionClassName", "hexakillClass"],
                honor: s.Ember.inject.service(),
                postgameNotificationClassName: "postgame-scoreboard-progression-honor-category-icon",
                honorSenderDisplayName: "",
                init: function() {
                    this._super(...arguments), this._playerNames = s.playerNames
                },
                didInsertElement() {
                    this._super(...arguments), this.getHonorSenderDisplayName()
                },
                audioMap: {
                    0: "sfx-honor-receive-1-2.ogg",
                    1: "sfx-honor-receive-1-2.ogg",
                    2: "sfx-honor-receive-3.ogg",
                    3: "sfx-honor-receive-4.ogg",
                    4: "sfx-honor-receive-4.ogg"
                },
                positionClassName: s.Ember.computed("honorIndex", (function() {
                    return "position" + this.get("honorIndex")
                })),
                honorTypeClassName: s.Ember.computed("honorType", (function() {
                    return "honorType" + this.get("honorType")
                })),
                honorType: s.Ember.computed("displayedHonor.honorCategory", (function() {
                    return this.get("displayedHonor.honorCategory")
                })),
                honorSenderPuuid: s.Ember.computed("displayedHonor.senderPuuid", (function() {
                    return this.get("displayedHonor.senderPuuid")
                })),
                getHonorSenderDisplayName: function() {
                    const e = this.get("honorSenderPuuid");
                    this._playerNames.getDisplayNameByPUUID(e).then((e => {
                        e?.playerNameFull && this.set("honorSenderDisplayName", e.playerNameFull)
                    }))
                },
                categoryIconUrl: s.Ember.computed("honorType", (function() {
                    const e = this.get("honorType");
                    if (e && o.HONOR_CATEGORY_DATA[e]) {
                        const t = o.HONOR_CATEGORY_DATA[e].postgameIcon;
                        return o.HONOR_ASSET_PATH + t
                    }
                    return ""
                })),
                categoryVideoUrl: s.Ember.computed("honorType", "honorIndex", (function() {
                    const e = this.get("honorType"),
                        t = "eog" + (this.get("honorIndex") + 1);
                    if (e && o.HONOR_CATEGORY_DATA[e] && o.HONOR_CATEGORY_DATA[e][t]) {
                        const n = o.HONOR_CATEGORY_DATA[e][t];
                        return o.HONOR_VIDEO_PATH + `${n}`
                    }
                    return ""
                })),
                categoryVideoClass: s.Ember.computed("honorIndex", (function() {
                    return `honor-postgame-notification-video${this.get("honorIndex")}`
                })),
                categoryBeamUrl: o.HONOR_VIDEO_PATH + "EOG_Sidebar_Beam.webm",
                categoryIconTooltip: s.Ember.computed("honorType", "honorSenderDisplayName", "honor.honorVisibilityEnabled", (function() {
                    const e = this.get("honorType"),
                        t = this.get("honorSenderDisplayName"),
                        n = this.get("honor.honorVisibilityEnabled");
                    if (e && o.HONOR_CATEGORY_DATA[e]) {
                        if (n && t) {
                            const t = o.HONOR_CATEGORY_DATA[e].tooltipBySummoner;
                            return this.get("tra").formatString(t, {
                                playerName: this.get("honorSenderDisplayName")
                            })
                        } {
                            const t = o.HONOR_CATEGORY_DATA[e].tooltip;
                            return this.get("tra").formatString(t)
                        }
                    }
                    return ""
                })),
                animateIntroHandler: s.Ember.on("didInsertElement", (function() {
                    const e = this.get("honorIndex"),
                        t = this.get("audioMap"),
                        n = e;
                    t[n] && this.playSound(t[n]), this.runTask((function() {
                        this.$("uikit-state-machine").attr("state", "initial")
                    }), 1), this.runTask((function() {
                        this.sendAction("decrementTransitionLock")
                    }), 1500)
                })),
                assetsReady: s.Ember.computed("categoryVideoClass", "categoryVideoUrl", "categoryIconUrl", (function() {
                    return !!(this.get("categoryVideoClass") && this.get("categoryVideoUrl") && this.get("categoryIconUrl"))
                })),
                shouldBeam: s.Ember.computed("honorIndex", (function() {
                    return this.get("honorIndex") > 1
                })),
                onWillDestroyElement: s.Ember.on("willDestroyElement", (function() {
                    const e = this.$(".honor-postgame-category-beam");
                    e && e.attr("src", "");
                    const t = this.$(".honor-postgame-category-icon");
                    t && t.attr("src", "")
                }))
            });
            t.default = r
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            const {
                RunMixin: l
            } = s.EmberAddons.EmberLifeline, i = 33;
            var r = s.Ember.Component.extend(l, o.default, {
                classNames: ["postgame-ranked-component"],
                classNameBindings: ["shouldShow::removed"],
                leagueTierNames: s.leagueTierNames,
                uxSettings: s.UXSettings,
                displayedTier: null,
                displayedDivision: null,
                displayedLp: null,
                triggeredAnimation: !1,
                triggeredLpModificationAnimation: !1,
                largeAreaAnimationsEnabled: !1,
                inGracePeriod: !0,
                unloadSpinner: !1,
                postgame: s.Ember.inject.service(),
                postgameRanked: s.Ember.inject.service(),
                gameflow: s.Ember.inject.service(),
                observerReference: null,
                lpIncreaseTickSound: null,
                init: function() {
                    this._super(...arguments), this.set("observerReference", (e => {
                        this.set("largeAreaAnimationsEnabled", e.largeAreaAnimationsEnabled)
                    })), this.get("uxSettings").addObserver(this.get("observerReference"));
                    let e = null;
                    const t = new Promise((function(t) {
                        e = t
                    }));
                    this.set("resolveDataPromise", e), t.then((() => {
                        const e = this.get("notification.queueType");
                        return this.leagueTierNames.getTiersForQueue(e).then((e => {
                            this.set("rankedQueueTiers", e || []), this.initializeStartingDisplay()
                        }))
                    }));
                    const n = this.get("previousAnimationPromise");
                    n && n.then((() => {
                        t.then((() => {
                            this.startMainAnimation()
                        })), this.get("isRanked") ? (this.runTask((() => {
                            this.set("inGracePeriod", !1), this.get("haveData") || this.resolveAnimation()
                        }), 5e3), this.runTask((() => {
                            this.set("unloadSpinner", !0)
                        }), 7e3)) : this.resolveAnimation()
                    }))
                },
                willDestroyElement: function() {
                    this._super(...arguments), this.get("uxSettings").removeObserver(this.get("observerReference"))
                },
                notification: s.Ember.computed.readOnly("postgameRanked.currentLpChangeNotification"),
                isRanked: s.Ember.computed.readOnly("postgameRanked.isRanked"),
                isRated: s.Ember.computed.readOnly("postgameRanked.isRated"),
                isEogInvalid: s.Ember.computed.equal("postgame.eogStatsBlock.invalid", !0),
                isVictory: s.Ember.computed.readOnly("postgame.playerTeam.isWinningTeam"),
                isLossForgiven: s.Ember.computed("isEogInvalid", "isVictory", (function() {
                    return this.get("isEogInvalid") && !this.get("isVictory")
                })),
                isEarlySurrenderBystander: s.Ember.computed.readOnly("postgame.isEarlySurrenderBystander"),
                isTFT: s.Ember.computed.readOnly("gameflow.isTFT"),
                leaguePointsDelta: s.Ember.computed.readOnly("notification.leaguePointsDelta"),
                leaguePointsTotal: s.Ember.computed.readOnly("notification.leaguePoints"),
                consolationLpUsed: s.Ember.computed.readOnly("notification.consolationLpUsed"),
                miniseriesProgress: s.Ember.computed.readOnly("notification.miniseriesProgress"),
                notifyReason: s.Ember.computed.readOnly("notification.notifyReason"),
                division: s.Ember.computed.readOnly("notification.division"),
                tier: s.Ember.computed.readOnly("notification.tier"),
                provisionalGamesRemaining: s.Ember.computed.readOnly("notification.provisionalGamesRemaining"),
                numberOfPromotions: s.Ember.computed.readOnly("notification.numberOfPromotions"),
                afkLpPenaltyAmount: s.Ember.computed.readOnly("notification.afkLpPenaltyAmount"),
                afkLpPenaltyLevel: s.Ember.computed.readOnly("notification.afkLpPenaltyLevel"),
                haveData: s.Ember.computed("notification", "notification.gameId", (function() {
                    const e = this.get("notification"),
                        t = e && 0 !== e.gameId,
                        n = this.get("resolveDataPromise");
                    return t && n && n(), !!t
                })),
                shouldShow: s.Ember.computed("isRanked", "haveData", "isRated", (function() {
                    return (this.get("isRanked") || this.get("haveData")) && !this.get("isRated")
                })),
                spinnerIsVisible: s.Ember.computed("haveData", "inGracePeriod", (function() {
                    return !this.get("haveData") && this.get("inGracePeriod")
                })),
                errorIsVisible: s.Ember.computed("haveData", "inGracePeriod", (function() {
                    return !this.get("haveData") && !this.get("inGracePeriod")
                })),
                initializeStartingDisplay: function() {
                    let e = this.get("tier"),
                        t = this.get("division"),
                        n = this.get("leaguePointsTotal");
                    if (!this.get("isBeingPromotedOrDemoted") && this.get("isGainingLp")) {
                        const a = this.get("rankedQueueTiers"),
                            s = this.leagueTierNames.rankSubtract(e, t, n, this.get("leaguePointsDelta"), a);
                        e = s.tier, t = s.division, n = s.lp
                    }
                    this.set("displayedTier", e), this.set("displayedDivision", t), this.set("displayedLp", n)
                },
                startMainAnimation: function() {
                    this.set("triggeredAnimation", !1), this.set("triggeredLpModificationAnimation", !1), this.get("isBeingPromotedOrDemoted") ? this.promotionDemotionAnimation() : this.get("isInMiniseries") ? this.miniseriesAnimation() : this.get("isGainingLp") ? this.get("afkLpPenaltyApplied") ? this.lpModifierAnimation() : this.gainLpAnimation(this.get("leaguePointsDelta")) : this.get("isLosingLp") ? this.get("consolationLpWasApplied") || this.get("afkLpPenaltyApplied") ? this.lpModifierAnimation() : this.loseLpAnimation() : this.noChangeLpAnimation()
                },
                resolveAnimation: function() {
                    const e = this.get("resolveAnimationPromise");
                    e && e()
                },
                gainLpAnimation: function(e) {
                    let t = 1,
                        n = 1;
                    e <= 2 ? t = 6 : e <= 4 ? t = 4 : e <= 6 ? t = 3 : e <= 8 ? t = 2 : e <= 16 || (n = e <= 32 ? 2 : e <= 64 ? 4 : 8);
                    const a = this.get("rankedQueueTiers"),
                        s = this.leagueTierNames.rankAdd(this.get("displayedTier"), this.get("displayedDivision"), this.get("displayedLp"), n, a);
                    this.set("displayedTier", s.tier), this.set("displayedDivision", s.division), this.set("displayedLp", s.lp), e -= n, this.lpIncreaseTickSound ? this.lpIncreaseTickSound.play() : this.lpIncreaseTickSound = this.playSound("sfx-ranked-ui-lp-increase-tick.ogg"), e > 0 ? this.runTask((() => {
                        this.gainLpAnimation(e)
                    }), i * t) : this.runTask((() => {
                        this.set("triggeredAnimation", !0), this.playSound("sfx-ranked-ui-lp-increase-final-tick.ogg"), this.resolveAnimation()
                    }), 132)
                },
                lpModifierAnimation: function() {
                    if (this.get("largeAreaAnimationsEnabled")) {
                        let e;
                        const t = this.element.querySelector(".delta-lp-modifier-video");
                        e = this.get("afkLpPenaltyApplied") ? "sfx-uikit-afkleaver-stinger.ogg" : "sfx-uikit-consolation-stinger.ogg", t.currentTime = 0, t.style.visibility = "visible", this.runTask((() => {
                            this.playSound(e)
                        }), 330), this.runTask((() => {
                            t.play()
                        }), 330)
                    }
                    this.runTask((() => {
                        this.set("triggeredLpModificationAnimation", !0)
                    }), 990), this.runTask((() => {
                        this.get("isGainingLp") ? this.gainLpAnimation(this.get("leaguePointsDelta")) : this.loseLpAnimation()
                    }), 2178)
                },
                loseLpAnimation: function() {
                    this.set("triggeredAnimation", !0), this.runTask((() => {
                        this.playSound("sfx-ranked-ui-lp-decrease.ogg")
                    }), 167), this.runTask((() => {
                        this.resolveAnimation()
                    }), 333)
                },
                noChangeLpAnimation: function() {
                    this.set("triggeredAnimation", !0), this.runTask((() => {
                        this.resolveAnimation()
                    }), 333)
                },
                miniseriesAnimation: function() {
                    this.set("triggeredAnimation", !0), this.runTask((() => {
                        const e = this.get("miniseriesData");
                        e && e.forEach((e => {
                            e.animate && ("W" === e.result ? this.playSound("sfx-ranked-ui-promo-win.ogg") : "L" === e.result && this.playSound("sfx-ranked-ui-promo-loss.ogg"))
                        }))
                    }), 67), this.runTask((() => {
                        this.resolveAnimation()
                    }), 333)
                },
                promotionDemotionAnimation: function() {
                    this.runTask((function() {
                        this.resolveAnimation()
                    }), 333)
                },
                errorText: s.Ember.computed("tra", (function() {
                    return this.get("tra").get("postgame_ranked_error")
                })),
                errorTooltipHeader: s.Ember.computed("tra", (function() {
                    return this.get("tra").get("postgame_ranked_error_tooltip_header")
                })),
                errorTooltipBody: s.Ember.computed("tra", "isTFT", (function() {
                    return this.get("isTFT") ? this.get("tra").get("postgame_ranked_error_tooltip_tft_body") : this.get("tra").get("postgame_ranked_error_tooltip_body")
                })),
                isUnranked: s.Ember.computed("tier", (function() {
                    return !this.get("tier") || this.get("tier") === s.leaguesConsts.TIER_NAME_UNRANKED
                })),
                previousLp: s.Ember.computed("leaguePointsTotal", "leaguePointsDelta", (function() {
                    return Math.max(this.get("leaguePointsTotal") - this.get("leaguePointsDelta"), 0)
                })),
                consolationLpWasApplied: s.Ember.computed("consolationLpUsed", (function() {
                    return this.get("consolationLpUsed") > 0
                })),
                consolationLpWasAppliedText: s.Ember.computed("tra", (function() {
                    return this.get("tra.postgame_ranked_loss_consolation_applied")
                })),
                consolationTooltipBody: s.Ember.computed("tra", "consolationLpUsed", (function() {
                    return this.get("tra").formatString("postgame_ranked_loss_consolation_applied_tooltip", {
                        consolationLpUsed: this.get("consolationLpUsed")
                    })
                })),
                lpDeltaString: s.Ember.computed("leaguePointsDelta", "isVictory", "isInMiniseries", "isTFT", (function() {
                    const e = this.get("leaguePointsDelta");
                    return e > 0 ? "+" + this.leagueTierNames.getLpLoc(e) : e < 0 ? this.leagueTierNames.getLpLoc(e) : 0 === e ? this.get("isTFT") ? "" : this.get("isVictory") ? "+" + this.leagueTierNames.getLpLoc(e) : "-" + this.leagueTierNames.getLpLoc(e) : ""
                })),
                winStreakString: s.Ember.computed("notification.winStreak", (function() {
                    const e = this.get("notification.winStreak");
                    return e >= 3 && "RANKED_TFT_DOUBLE_UP" === this.get("notification.queueType") ? this.get("tra").formatString("postgame_win_streak", {
                        wins: e
                    }) : ""
                })),
                headerString: s.Ember.computed("isBeingPromotedOrDemoted", "isInMiniseries", "isVictory", "lpDeltaString", "isNoLpChange", "isTFT", "tra", (function() {
                    const e = this.get("isNoLpChange"),
                        t = !this.get("isBeingPromotedOrDemoted") && !this.get("isInMiniseries"),
                        n = this.get("isVictory"),
                        a = this.get("isTFT");
                    return t ? this.get("lpDeltaString") : a ? void 0 : e ? this.get("tra").get("postgame_ranked_tie_short") : n ? this.get("tra").get("postgame_ranked_win_short") : this.get("tra").get("postgame_ranked_loss_short")
                })),
                consolationHeaderString: s.Ember.computed("isBeingPromotedOrDemoted", "isInMiniseries", "isVictory", "leaguePointsDelta", "consolationLpUsed", (function() {
                    if (!this.get("isBeingPromotedOrDemoted") && !this.get("isInMiniseries")) {
                        const e = this.get("leaguePointsDelta");
                        if (e > 0) return "+" + this.leagueTierNames.getLpLoc(e);
                        if (e < 0) {
                            const t = this.get("consolationLpUsed");
                            return t > 0 ? this.leagueTierNames.getLpLoc(e - t) : this.leagueTierNames.getLpLoc(e)
                        }
                        return 0 === e ? this.get("isVictory") ? "+" + this.leagueTierNames.getLpLoc(e) : "-" + this.leagueTierNames.getLpLoc(e) : ""
                    }
                })),
                totalLPString: s.Ember.computed("leaguePointsTotal", (function() {
                    const e = this.get("leaguePointsTotal");
                    return this.leagueTierNames.getLpLoc(e)
                })),
                promotionStatusString: s.Ember.computed("isBeingPromoted", "isBeingDemoted", "tra", (function() {
                    return this.get("isBeingPromoted") ? this.get("tra").get("postgame_ranked_promoted_short") : this.get("isBeingDemoted") ? this.get("tra").get("postgame_ranked_demoted_short") : ""
                })),
                numberOfTimesPromotedString: s.Ember.computed("isBeingPromoted", "numberOfPromotions", "tra.postgame_ranked_promoted_multiple_promotions", (function() {
                    const e = this.get("numberOfPromotions");
                    return this.get("isBeingPromoted") && e > 1 ? this.get("tra").formatString("postgame_ranked_promoted_multiple_promotions", {
                        numberOfPromotions: e
                    }) : ""
                })),
                isPromotedMultipleTimes: s.Ember.computed("numberOfPromotions", (function() {
                    return this.get("numberOfPromotions") > 1
                })),
                isInMiniseries: s.Ember.computed("miniseriesProgress.length", (function() {
                    return this.get("miniseriesProgress.length") > 0
                })),
                startedMiniseries: s.Ember.computed("notifyReason", (function() {
                    return "MINISERIES_START" === this.get("notifyReason")
                })),
                isBeingPromoted: s.Ember.computed("notifyReason", (function() {
                    return "LEAGUE_PROMOTED" === this.get("notifyReason")
                })),
                isBeingDemoted: s.Ember.computed("notifyReason", (function() {
                    return "LEAGUE_DEMOTED" === this.get("notifyReason")
                })),
                isConsideredVictory: s.Ember.computed("isVictory", "isGainingLp", "isTFT", (function() {
                    return this.get("isTFT") ? this.get("isGainingLp") : this.get("isVictory")
                })),
                isGainingLp: s.Ember.computed("leaguePointsDelta", (function() {
                    return this.get("leaguePointsDelta") > 0
                })),
                isLosingLp: s.Ember.computed("leaguePointsDelta", (function() {
                    return this.get("leaguePointsDelta") < 0
                })),
                isNoLpChange: s.Ember.computed("isEarlySurrenderBystander", "isLossForgiven", (function() {
                    return this.get("isEarlySurrenderBystander") || this.get("isLossForgiven")
                })),
                isBeingPromotedOrDemoted: s.Ember.computed("isBeingPromoted", "isBeingDemoted", "isProvisional", (function() {
                    return !this.get("isProvisional") && (this.get("isBeingPromoted") || this.get("isBeingDemoted"))
                })),
                showDemotionProtected: s.Ember.computed("isTFT", "isBeingPromoted", "notification", "leaguePointsTotal", (function() {
                    return !(!this.get("isTFT") || this.get("notification.canDemoteFromTier") || !["IV", "NA"].includes(this.get("notification.division")) || !this.get("isBeingPromoted") && 0 !== this.get("leaguePointsTotal"))
                })),
                isProvisional: s.Ember.computed("provisionalGamesRemaining", (function() {
                    return this.get("provisionalGamesRemaining") > 0
                })),
                miniseriesData: s.Ember.computed("notifyReason", "miniseriesProgress", "isNoLpChange", (function() {
                    const e = "MINISERIES_START" === this.get("notifyReason"),
                        t = this.get("miniseriesProgress"),
                        n = this.get("isNoLpChange"),
                        a = [];
                    let s = !1;
                    for (let o = t.length - 1; o >= 0; o--) {
                        const l = t[o],
                            i = "W" === l || "L" === l,
                            r = !s && i && !e && !n;
                        a.unshift({
                            result: l,
                            animate: r
                        }), s = i
                    }
                    return a
                })),
                miniseriesWinCount: s.Ember.computed("miniseriesProgress", (function() {
                    const e = this.get("miniseriesProgress");
                    if (!e) return 0;
                    let t = 0;
                    return e.forEach((function(e) {
                        "W" === e && t++
                    })), t
                })),
                displayedLpText: s.Ember.computed("displayedLp", (function() {
                    const e = this.get("displayedLp");
                    if (null !== e) return this.get("tra").formatString("postgame_ranked_modifiable_lp", {
                        leaguePoints: e
                    })
                })),
                displayedTierDivisionLabel: s.Ember.computed("displayedTier", "displayedDivision", (function() {
                    const e = this.get("displayedTier"),
                        t = this.get("displayedDivision");
                    if (e && t) return this.leagueTierNames.getFullTierDivisionName(e, t)
                })),
                afkLpPenaltyApplied: s.Ember.computed("afkLpPenaltyAmount", (function() {
                    return this.get("afkLpPenaltyAmount") < 0
                })),
                afkLpPenaltyAppliedText: s.Ember.computed("tra", "afkLpPenaltyAmount", (function() {
                    return this.get("tra").formatString("postgame_ranked_afk_penalty_applied", {
                        afkLpPenaltyAmount: this.get("afkLpPenaltyAmount")
                    })
                })),
                afkLpPenaltyAppliedTooltip: s.Ember.computed("tra", "afkLpPenaltyLevel", (function() {
                    const e = this.get("afkLpPenaltyLevel") - 1;
                    return 0 === e ? this.get("tra.postgame_ranked_afk_penalty_applied_tooltip_no_games_remaining") : 1 === e ? this.get("tra.postgame_ranked_afk_penalty_applied_tooltip_singular") : this.get("tra").formatString("postgame_ranked_afk_penalty_applied_tooltip_plural", {
                        afkLpPenaltyLevel: e
                    })
                }))
            });
            t.default = r
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            const {
                RunMixin: l
            } = s.EmberAddons.EmberLifeline;
            var i = s.Ember.Component.extend(l, o.default, {
                classNames: ["postgame-rated-component"],
                classNameBindings: ["shouldShow::removed"],
                leagueTierNames: s.leagueTierNames,
                displayedRatedRating: "---",
                displayedRatedRatingDelta: "",
                postgame: s.Ember.inject.service(),
                postgameRanked: s.Ember.inject.service(),
                gameflow: s.Ember.inject.service(),
                init: function() {
                    this._super(...arguments);
                    let e = null;
                    const t = new Promise((function(t) {
                        e = t
                    }));
                    this.set("resolveDataPromise", e), t.then((() => {
                        this.initializeStartingDisplay()
                    }));
                    const n = this.get("previousAnimationPromise");
                    n && n.then((() => {
                        this.get("resolveAnimationPromise")()
                    }))
                },
                notification: s.Ember.computed.readOnly("postgameRanked.currentLpChangeNotification"),
                isRated: s.Ember.computed.readOnly("postgameRanked.isRated"),
                ratedTier: s.Ember.computed.readOnly("notification.ratedTier"),
                ratedRating: s.Ember.computed.readOnly("notification.ratedRating"),
                ratedRatingDelta: s.Ember.computed.readOnly("notification.ratedRatingDelta"),
                isPositiveRatingDelta: s.Ember.computed.gte("ratedRatingDelta", 0),
                ratedTierImagePath: s.Ember.computed("ratedTier", "notification.queueType", (function() {
                    let e = this.get("ratedTier");
                    return s.leagueTierNames.isUnrated(e) && (e = s.leagueTierNames.getConstants().LOWEST_TFT_RATED_TIER), s.leagueTierNames.getTFTRatedPostgameBadge(e, this.get("notification.queueType"))
                })),
                ratedLoadingPath: s.Ember.computed("notification.queueType", (function() {
                    return s.leagueTierNames.getTFTRatedLoadingBadge(this.get("notification.queueType"))
                })),
                initializeStartingDisplay: function() {
                    let e = this.get("ratedTier");
                    const t = this.get("ratedRating"),
                        n = this.get("ratedRatingDelta");
                    e && e !== s.leagueTierNames.getConstants().RATED_TIER_NAME_NONE || (e = s.leagueTierNames.getConstants().LOWEST_TFT_RATED_TIER);
                    const a = this.get("postgameRanked.gameClientStats.queueType") || "RANKED_TFT_TURBO";
                    this.set("ratedTierImagePath", s.leagueTierNames.getTFTRatedPostgameBadge(e, a)), this.set("ratedLoadingPath", s.leagueTierNames.getTFTRatedLoadingBadge(a));
                    this.$(".postgame-rated-progression-tier-badge")[0].animate([{
                        opacity: 0,
                        transform: "scale(1.2, 1.2)"
                    }, {
                        opacity: 1,
                        transform: "scale(1, 1)"
                    }], {
                        duration: 500,
                        fill: "forwards",
                        easing: "cubic-bezier(0.7, 0, 0.84, 0)"
                    }).onfinish = () => {
                        const e = this.$(".postgame-rated-badge-highlight")[0];
                        this.playSound("sfx-celebrate-tft_turbo-badge-glint.ogg"), e.style.opacity = 1, e && e.animation && e.animation.play(), this.set("displayedRatedRating", t), n >= 0 ? this.set("displayedRatedRatingDelta", "+" + n) : this.set("displayedRatedRatingDelta", n)
                    }
                },
                haveData: s.Ember.computed("notification", "notification.gameId", (function() {
                    const e = this.get("notification"),
                        t = e && 0 !== e.gameId,
                        n = this.get("resolveDataPromise");
                    return t && n && n(), !!t
                })),
                shouldShow: s.Ember.computed.readOnly("isRated"),
                resolveAnimation: function() {
                    const e = this.get("resolveAnimationPromise");
                    e && e()
                },
                willDestroyElement: function() {
                    this._super(...arguments);
                    const e = this.element.querySelector(".postgame-rated-badge-highlight");
                    e && e.animation && e.animation.stop()
                }
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Component.extend({
                    classNames: ["postgame-replay-button"],
                    postgame: a.Ember.inject.service(),
                    gameflow: a.Ember.inject.service(),
                    gameId: a.Ember.computed("postgame.eogStatsBlock.reportGameId", "postgame.eogStatsBlock.gameId", (function() {
                        return this.get("postgame.eogStatsBlock.reportGameId") || this.get("postgame.eogStatsBlock.gameId")
                    })),
                    replayButton: null,
                    onDidInsertElement: a.Ember.on("didInsertElement", (function() {
                        this.createReplayButton()
                    })),
                    onWillDestroyElement: a.Ember.on("willDestroyElement", (function() {
                        this.get("replayButton") && (this.get("replayButton").destroy(), this.set("replayButton", null))
                    })),
                    createReplayButton: function() {
                        if (!a.Replays.isPostgameReplaysEnabled() || this.get("replayButton")) return !1;
                        if (this.get("isDestroying") || this.get("isDestroyed")) return !1;
                        const e = a.Replays.createReplayButtonForEndOfGame({
                            gameId: this.get("gameId"),
                            gameType: this.get("gameflow.queue.type"),
                            queueId: this.get("gameflow.queue.id")
                        });
                        return !!e && (this.set("replayButton", e), this.$().append(e.domNode), !0)
                    }
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            const {
                RunMixin: l
            } = s.EmberAddons.EmberLifeline;
            var i = s.Ember.Component.extend(l, o.default, {
                classNames: ["secondary-progression-component"],
                classNameBindings: ["index"],
                postgame: s.Ember.inject.service(),
                hasCenterText: s.Ember.computed.bool("centerText"),
                hasCenterImage: s.Ember.computed.bool("centerImage"),
                hasTooltip: s.Ember.computed.bool("tooltipComponentName"),
                currentlyDisplayedValue: 0,
                currentNumberFrame: 0,
                doneAnimating: !1,
                lottiePath: s.Ember.computed((function() {
                    return this.getLottieAssetPath("secondary-meter-animation.json")
                })),
                init: function() {
                    this._super(...arguments);
                    let e = null;
                    const t = new Promise((function(t) {
                        e = t
                    }));
                    this.set("resolveDataPromise", e);
                    const n = this.get("previousAnimationPromise");
                    n && this.runTask((() => {
                        n && n.then((() => {
                            t.then((() => {
                                this.startAnimation(), this.incrementCurrentlyDisplayedValueTime()
                            }))
                        }))
                    }), 250)
                },
                haveData: s.Ember.computed("oldPercent", "newPercent", (function() {
                    const e = this.get("oldPercent"),
                        t = this.get("newPercent"),
                        n = "number" == typeof e && !isNaN(e) && "number" == typeof t && !isNaN(t),
                        a = this.get("resolveDataPromise");
                    return n && a && a(), !!n
                })),
                startAnimation: function() {
                    this.$("lol-uikit-lottie")[0] && (this.playSound("sfx-ranked-ui-circle-meter-fill-small.ogg"), this.$("lol-uikit-lottie")[0].animation.play()), this.get("isLevelUp") && this.runTask((() => {
                        this.playSound("sfx-ranked-ui-circle-meter-level-up.ogg")
                    }), 900), this.runTask((() => {
                        this.resolveAnimation()
                    }), 500)
                },
                resolveAnimation: function() {
                    this.get("resolveAnimationPromise")()
                },
                incrementCurrentlyDisplayedValueTime: function() {
                    const e = this.get("currentNumberFrame") + 1,
                        t = this.get("numberValue") || 0;
                    this.set("currentlyDisplayedValue", Math.floor(t * e / 45)), this.set("currentNumberFrame", e), e < 45 ? this.runTask((() => {
                        this.incrementCurrentlyDisplayedValueTime()
                    }), 33) : this.set("doneAnimating", !0)
                },
                gainedValue: s.Ember.computed("numberValue", (function() {
                    return this.get("numberValue") > 0
                })),
                newDisplayedPercent: s.Ember.computed("isLevelUp", "oldPercent", "newPercent", (function() {
                    return this.get("isLevelUp") ? this.get("newPercent") : this.get("oldPercent") + this.get("newPercent")
                })),
                displayedHeaderText: s.Ember.computed("headerText", "hasLevelUpText", "headerLevelUpText", "doneAnimating", (function() {
                    return this.get("hasLevelUpText") && this.get("doneAnimating") ? this.get("headerLevelUpText") : this.get("headerText")
                })),
                hasLevelUpText: s.Ember.computed("isLevelUp", "headerLevelUpText", (function() {
                    return this.get("isLevelUp") && this.get("headerLevelUpText")
                })),
                centerTextLengthClass: s.Ember.computed("hasCenterText", "centerText", (function() {
                    return this.get("hasCenterText") ? "length" + this.get("centerText").toString().length : ""
                }))
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            const l = s.Ember.Object.extend(s.Ember.PromiseProxyMixin),
                i = (0, s.emberDataBinding)({
                    Ember: s.Ember,
                    websocket: s.socket,
                    logPrefix: "component:postgame-scoreboard-party-status",
                    basePaths: {
                        lobby: "/lol-lobby"
                    },
                    boundProperties: {
                        partyStatus: {
                            api: "lobby",
                            path: "/v2/party/eog-status"
                        }
                    }
                });
            var r = s.Ember.Component.extend(i, o.default, s.Ember.Evented, {
                classNames: ["postgame-party-status"],
                _oldPlayersReady: 0,
                readyPlayers: s.Ember.computed.alias("partyStatus.readyPlayers"),
                leftPlayers: s.Ember.computed.alias("partyStatus.leftPlayers"),
                eogPlayers: s.Ember.computed.alias("partyStatus.eogPlayers"),
                partySize: s.Ember.computed.alias("partyStatus.partySize"),
                numPlayersReady: s.Ember.computed.alias("readyPlayers.length"),
                numPlayersLeft: s.Ember.computed.alias("leftPlayers.length"),
                showMouseOverHeader: s.Ember.computed.gt("numPlayersReady", 0),
                summonerService: s.Ember.inject.service("summoner"),
                readyPlayersSummonersProxy: s.Ember.computed("readyPlayers", "readyPlayers.[]", (function() {
                    const e = this.get("readyPlayers");
                    if (!e || 0 === e.length) return null;
                    const t = this._playerNames.getDisplayNamesByPUUIDs(e);
                    return l.create({
                        promise: t
                    })
                })),
                readyPlayersNames: s.Ember.computed.readOnly("readyPlayersSummonersProxy.content"),
                init: function() {
                    this._super(...arguments), this._playerNames = s.playerNames
                },
                showComponent: s.Ember.computed("readyPlayers", "eogPlayers", "leftPlayers", "readyPlayers.[]", "eogPlayers.[]", "leftPlayers.[]", (function() {
                    return !!(this.get("readyPlayers") && this.get("eogPlayers") && this.get("leftPlayers")) && this.get("readyPlayers.length") + this.get("eogPlayers.length") + this.get("leftPlayers.length") > 1
                })),
                playerIconOrder: s.Ember.computed("readyPlayers", "numPlayersReady", (function() {
                    const e = s.Ember.A(),
                        t = this.get("numPlayersReady");
                    for (; e.length < t;) e.pushObject(e.length);
                    return t > this._oldPlayersReady && this.get("showComponent") && this.playSound("sfx-parties-notif-playagain.ogg"), this._oldPlayersReady = t, e
                })),
                leftIconOrder: s.Ember.computed("leftPlayers", "numPlayersLeft", "leftIconOrder", (function() {
                    const e = s.Ember.A(),
                        t = this.get("numPlayersLeft");
                    for (; e.length < t;) e.pushObject(e.length);
                    return e
                })),
                mouseOverText: s.Ember.computed("readyPlayersNames", (function() {
                    const e = this.get("readyPlayersNames");
                    if (!e) return this.get("tra.postgame_party_status_players_not_waiting");
                    const t = Object.entries(e);
                    if (!t || 0 === t.length) return this.get("tra.postgame_party_status_players_not_waiting");
                    const n = t.map((([e, t]) => t?.playerNameFull)).filter((e => e)).join(", ");
                    return this.get("tra").formatString("postgame_party_status_players_waiting", {
                        players: n
                    })
                }))
            });
            t.default = r
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            var l = s.Ember.Component.extend(o.default, {
                classNames: ["postgame-header"],
                gameflow: s.Ember.inject.service(),
                gameclientPostgame: s.Ember.inject.service(),
                postgameRanked: s.Ember.inject.service(),
                rankedStats: s.Ember.computed.alias("postgameRanked.currentRankedStats"),
                rankedNotification: s.Ember.computed.alias("postgameRanked.currentLpChangeNotification"),
                localPlayerRank: s.Ember.computed.alias("gameclientPostgame.localPlayer.rank"),
                isVictory: s.Ember.computed.equal("localPlayerRank", 1),
                isTop4: s.Ember.computed.lte("localPlayerRank", 4),
                playerRankText: s.Ember.computed("localPlayerRank", "gameclientPostgame.localPlayer.partnerGroupId", (function() {
                    const e = this.get("gameclientPostgame.localPlayer.partnerGroupId") > 0 ? Math.ceil(this.get("localPlayerRank") / 2) : this.get("localPlayerRank");
                    if (!e) return "";
                    switch (e) {
                        case 1:
                            return this.get("tra.postgame_progress_place_first");
                        case 2:
                            return this.get("tra.postgame_progress_place_second");
                        case 3:
                            return this.get("tra.postgame_progress_place_third");
                        case 4:
                            return this.get("tra.postgame_progress_place_fourth");
                        case 5:
                            return this.get("tra.postgame_progress_place_fifth");
                        case 6:
                            return this.get("tra.postgame_progress_place_sixth");
                        case 7:
                            return this.get("tra.postgame_progress_place_seventh");
                        case 8:
                            return this.get("tra.postgame_progress_place_eighth");
                        default:
                            return this.get("tra.postgame_progress_game_complete")
                    }
                })),
                gameLength: s.Ember.computed("gameclientPostgame.gameClientStats.gameLength", (function() {
                    return this.duration.formatSeconds(this.get("gameclientPostgame.gameClientStats.gameLength"))
                })),
                queueDescription: s.Ember.computed.readOnly("gameflow.queue.description"),
                shouldShowPlacements: s.Ember.computed.alias("postgameRanked.isProvisional"),
                provisionalGameThreshold: s.Ember.computed("rankedStats.queueMap", "rankedNotification.queueType", (function() {
                    const e = this.get("rankedNotification.queueType"),
                        t = this.get("rankedStats.queueMap");
                    if (t && t[e]) return t[e].provisionalGameThreshold
                })),
                placementGamesString: s.Ember.computed("rankedNotification.provisionalGamesRemaining", "provisionalGameThreshold", "tra.postgame_rank_tagline_placement_game", (function() {
                    const e = this.get("provisionalGameThreshold"),
                        t = this.get("rankedNotification.provisionalGamesRemaining");
                    return this.get("tra").formatString("postgame_rank_tagline_placement_game", {
                        gameCount: e - t || 1,
                        provisionalGameThreshold: e || 1
                    })
                }))
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            const s = (0, a.emberDataBinding)({
                Ember: a.Ember,
                websocket: a.socket,
                boundProperties: {
                    partnerGroupColorData: "/lol-game-data/assets/v1/tftuxtunables.json"
                }
            });
            var o = a.Ember.Component.extend(s, {
                classNames: ["tft-partner-group-placement"],
                placementDisplay: a.Ember.computed("placement", (function() {
                    return this.get("placement") + 1
                })),
                partnerGroupColorCode: a.Ember.computed("partnerGroupColorData", "partnerGroup", (function() {
                    const e = this.get("partnerGroupColorData");
                    if (e) {
                        const t = e[0].TFTPartnerGroupColors[this.get("partnerGroup") - 1];
                        return `rgb(${t.r}, ${t.g}, ${t.b})`
                    }
                    return "rgb(255, 255, 255)"
                }))
            });
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = n(3),
                l = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            var i = s.Ember.Component.extend(l.default, {
                classNames: ["postgame-tft-player"],
                classNameBindings: ["isLocalPlayer:postgame-tft-player-local", "shouldShowButtons:show-player-buttons", "isInPartnerGroup:postgame-tft-player-partner-group"],
                postgame: s.Ember.inject.service(),
                gameclientPostgame: s.Ember.inject.service(),
                player: null,
                isPlaybookEnabled: !1,
                isLocalPlayer: s.Ember.computed.alias("player.isLocalPlayer"),
                isNotLocalPlayer: s.Ember.computed.not("isLocalPlayer"),
                isInteractable: s.Ember.computed.alias("player.isInteractable"),
                isNotInteractable: s.Ember.computed.not("isInteractable"),
                isInPartnerGroup: s.Ember.computed.gt("player.playerGroupId", 0),
                shouldShowButtons: s.Ember.computed.and("isNotLocalPlayer", "gameclientPostgame.isLocalPlayerInGame"),
                maxBenchSlots: s.Ember.computed("isPlaybookEnabled", (function() {
                    if (this.get("isPlaybookEnabled")) {
                        const e = this.get("playbook");
                        if (e && e.name) return o.TFT_MAX_BENCH_SLOTS - 1
                    }
                    return o.TFT_MAX_BENCH_SLOTS
                })),
                pieces: s.Ember.computed.alias("player.boardPieces"),
                piecePlaceholders: s.Ember.computed("pieces.length", "maxBenchSlots", (function() {
                    const e = this.get("pieces.length"),
                        t = this.get("maxBenchSlots");
                    if (e >= t) return s.Ember.A();
                    const n = t - e,
                        a = s.Ember.A();
                    for (let e = 0; e < n; e++) a.push(e);
                    return a
                })),
                augments: s.Ember.computed.alias("player.augments"),
                playbook: s.Ember.computed.alias("player.playbook"),
                isInviteDisabled: !0,
                showInviteButton: !1,
                isReportDisabled: s.Ember.computed.or("hasBeenReported", "isNotInteractable"),
                hasBeenReported: s.Ember.computed("postgame.reportedPlayers.[]", (function() {
                    const e = this.get("postgame.reportedPlayers") || [],
                        t = this.get("player.puuid");
                    return e.includes(t)
                })),
                hasSentFriendRequest: !1,
                hasFriendData: s.Ember.computed("postgame.friendsList.[]", (function() {
                    const e = this.get("player.summonerName"),
                        t = this.get("postgame.friendsList");
                    return !!t && t.some((t => t.name === e))
                })),
                isFriendRequestDisabled: s.Ember.computed.or("hasSentFriendRequest", "hasFriendData", "isNotInteractable"),
                augmentContainer: s.Ember.computed("postgame.tftSets.LCTFTModeData.mDefaultSet", "player.customAugmentContainer", (function() {
                    const e = this.get("player.customAugmentContainer");
                    if (e) return {
                        name: `${e.displayName}: ${e.description}`,
                        icon: e.iconPath
                    };
                    const t = this.get("postgame.tftSets.LCTFTModeData.mDefaultSet") || {};
                    return {
                        name: t.SetAugmentName || "",
                        icon: t.SetAugmentContainer || ""
                    }
                })),
                _friendRequestSuccess: function(e, t) {
                    const n = t.contentBlockNotification(this.get("tra.postgame_friend_request_sent"), "postgame-friend-request-toast");
                    e.getToastManager().add({
                        type: "DialogToast",
                        data: {
                            contents: n
                        },
                        timing: "fast"
                    })
                },
                _friendRequestFail: function(e, t, n) {
                    let a;
                    a = n.includes(o.FULL_LIST_ERROR) ? t.contentBlockNotification(this.get("tra.postgame_friend_request_error_self_full"), "postgame-friend-request-toast-error") : t.contentBlockNotification(this.get("tra.postgame_friend_request_error"), "postgame-friend-request-toast-error"), e.getToastManager().add({
                        type: "DialogToast",
                        data: {
                            contents: a
                        }
                    })
                },
                scrollable: !1,
                scrollStart: 0,
                mouseDown(e) {
                    this.set("scrollable", !0), this.set("scrollStart", e.pageX)
                },
                mouseUp() {
                    this.set("scrollable", !1)
                },
                mouseLeave() {
                    this.set("scrollable", !1)
                },
                mouseMove(e) {
                    s.Ember.run.throttle(this, "handleScroll", {
                        event: e
                    }, 100)
                },
                handleScroll: s.Ember.observer("scrollable", "scrollStart", (function({
                    event: e
                }) {
                    if (this.get("scrollable") && e && e.pageX) {
                        const t = this.$(".tft-player-pieces-container"),
                            n = t.scrollLeft();
                        t.scrollLeft(n - (this.get("scrollStart") - e.pageX)), t.toggleClass("fade-left", t.scrollLeft() > 0), t.toggleClass("fade-right", t[0].scrollWidth - t.scrollLeft() - t.width() > 0)
                    }
                })),
                actions: {
                    sendFriendRequest: function() {
                        if (this.get("player.summonerId")) {
                            const e = (0, s.getProvider)().get("rcp-fe-lol-uikit"),
                                t = e.getTemplateHelper(),
                                n = {
                                    direction: "out",
                                    name: this.get("player.summonerName")
                                };
                            this.set("hasSentFriendRequest", !0), (0, s.dataBinding)("/lol-chat").post("/v1/friend-requests", n).then((() => {
                                this._friendRequestSuccess(e, t)
                            })).catch((n => {
                                if (405 === n.status) this._showAddBlockedFriendDialog();
                                else {
                                    const a = n.data.message;
                                    this._friendRequestFail(e, t, a), this.set("hasSentFriendRequest", !1)
                                }
                            })), this.playSound("sfx-uikit-click-generic.ogg")
                        }
                    },
                    showReportDialog: function() {
                        const e = s.Ember.Object.create({
                            summonerName: this.get("player.summonerName"),
                            summonerId: this.get("player.summonerId"),
                            gameId: this.get("gameclientPostgame.gameId"),
                            puuid: this.get("player.puuid")
                        });
                        s.SharedReportModalApps.showReportModal(e, "", "TFT"), this.playSound("sfx-uikit-click-generic.ogg")
                    }
                }
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            const s = a.UIKit.getTooltipManager();
            var o = a.Ember.Component.extend({
                classNames: ["tft-tooltip"],
                toolTipAttached: !1,
                tooltipOptions: {
                    targetAnchor: {
                        x: "center",
                        y: "top"
                    },
                    tooltipAnchor: {
                        x: "center",
                        y: "bottom"
                    },
                    tooltipDirection: "top"
                },
                tooltipSetup() {
                    const e = this.toolTipAttached;
                    if (this.tooltipHoverElement = this.element.parentElement, !e && this.tooltipHoverElement) {
                        const e = this.get("tooltipId");
                        this.tooltipElement = this.element.querySelector(`#tft-tooltip-${e}`), this.attachTooltip(), this.toolTipAttached = !0
                    }
                },
                didInsertElement() {
                    this._super(...arguments), this.tooltipSetup()
                },
                willDestroyElement() {
                    this._super(...arguments), this.detachTooltip()
                },
                attachTooltip: function() {
                    s.assign(this.tooltipHoverElement, this.tooltipElement, null, this.get("tooltipOptions"))
                },
                detachTooltip: function() {
                    s.unassign(this.tooltipHoverElement)
                }
            });
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            const s = (0, a.emberDataBinding)({
                Ember: a.Ember,
                websocket: (0, a.getProvider)().getSocket(),
                logPrefix: "service:postgame:end-of-game",
                basePaths: {
                    endofgame: "/lol-end-of-game",
                    chat: "/lol-chat"
                },
                boundProperties: {
                    eogStatsBlock: "/lol-end-of-game/v1/eog-stats-block",
                    championMasteryUpdates: "/lol-end-of-game/v1/champion-mastery-updates",
                    lastQueuedLobby: "/lol-lobby/v1/last-queued-lobby",
                    loginWallet: "/lol-login/v1/wallet",
                    augments: "/lol-game-data/assets/v1/cherry-augments.json",
                    championSummary: "/lol-game-data/assets/v1/champion-summary.json",
                    items: "/lol-game-data/assets/v1/items.json",
                    summonerSpells: "/lol-game-data/assets/v1/summoner-spells.json",
                    runes: "/lol-game-data/assets/v1/perks.json",
                    regionLocale: "/riotclient/region-locale",
                    configIsLoaded: "/lol-platform-config/v1/initial-configuration-complete",
                    championMasteryConfig: "/lol-platform-config/v1/namespaces/ChampionMasteryConfig",
                    itemSetJmxConfig: "/lol-platform-config/v1/namespaces/ItemSets",
                    showPositionDetectionEnabled: "/lol-platform-config/v1/namespaces/Postgame/ShowPositionDetectionEnabled",
                    disableEogAnimations: {
                        path: "/lol-platform-config/v1/namespaces/Challenges/DisableEogAnimations",
                        default: !1
                    },
                    friendsList: "/lol-chat/v1/friends",
                    playerMutes: "/lol-chat/v1/player-mutes",
                    localSummoner: "/lol-summoner/v1/current-summoner",
                    postgameChallengesEnabled: {
                        path: "/lol-platform-config/v1/namespaces/Challenges/PostgameChallengesEnabled",
                        default: !0
                    },
                    postgameChampionMasteryEnabled: {
                        path: "/lol-platform-config/v1/namespaces/ChampionMasteryConfig/PostgameChampionMasteryEnabled",
                        default: !0
                    },
                    currentSplit: {
                        path: "/lol-platform-config/v1/namespaces/LeagueConfig/CurrentSplit",
                        default: 1
                    },
                    tftSets: "/lol-game-data/assets/v1/tftsets.json"
                }
            });
            var o = a.Ember.Service.extend(s, a.Ember.Evented, {
                largeAreaAnimationsEnabled: a.Ember.computed.alias("uxSettings.largeAreaAnimationsEnabled"),
                isItemSetsDisabled: a.Ember.computed.not("itemSetJmxConfig.EditorEnabled"),
                playerMuteStatus: {},
                playerNames: a.playerNames,
                init: function() {
                    this._super(...arguments), this._setPlayerNamesForTeam = this._setPlayerNamesForTeam.bind(this), this._uxSettingsListener = this._uxSettingsObserver.bind(this), a.UXSettings.addObserver(this._uxSettingsListener), this.binding = a.dataBinding.bindTo((0, a.getProvider)().getSocket()), this.binding.observe("/lol-chat/v1/player-mutes", this, this.handlePlayerMuteStatusUpdate), this.getPerkStyles(this.binding), this.set("alreadyFriendRequestedList", [])
                },
                onWillDestroy: a.Ember.on("willDestroy", (function() {
                    a.UXSettings.removeObserver(this._uxSettingsListener)
                })),
                _uxSettingsObserver: function(e) {
                    this.set("uxSettings", e)
                },
                _setPlayerNamesForTeam: function(e) {
                    if (this.get("playerNames").isUsingSummonerName) return void e.players.map((e => {
                        e.set("displayName", {
                            playerName: e.summonerName || "",
                            playerNameFull: e.summonerName || ""
                        })
                    }));
                    const t = e.players.reduce(((e, t) => (e.push(t.puuid), e)), []);
                    this.get("playerNames").postAliasesByPUUID(t).then((t => {
                        e.players.map((e => {
                            const n = t[e.puuid];
                            try {
                                const t = this.get("playerNames").formatPlayerName({
                                    ...n,
                                    displayName: e.summonerName
                                });
                                e.set("displayName", t)
                            } catch (t) {
                                a.logger.error(`Failed getting displayName, falling back to summonerName with error: ${t.message}`), e.set("displayName", {
                                    playerName: e.summonerName || "",
                                    playerNameFull: e.summonerName || ""
                                })
                            }
                        }))
                    })).catch((e => {
                        a.logger.error(`Team playerName fetch failed with error: ${e.message}`)
                    }))
                },
                getPerkStyles: function(e) {
                    return e.get("/lol-game-data/assets/v1/perkstyles.json").then((e => {
                        e && this.set("perkStyles", (e.styles || []).map((e => ({
                            id: e.id,
                            tooltip: e.tooltip,
                            name: e.name,
                            iconPath: e.iconPath
                        }))))
                    }))
                },
                isCustomGame: a.Ember.computed.equal("eogStatsBlock.gameType", "CUSTOM_GAME"),
                isClash: a.Ember.computed.equal("eogStatsBlock.queueType", "CLASH"),
                playerTeam: a.Ember.computed("eogStatsBlock.teams", (function() {
                    const e = this.get("eogStatsBlock.teams");
                    if (!e) return null;
                    for (const t of e) this._setPlayerNamesForTeam(t);
                    return e.find((e => e.isPlayerTeam))
                })),
                player: a.Ember.computed("playerTeam", "localSummoner.summonerId", (function() {
                    const e = this.get("playerTeam.players"),
                        t = this.get("localSummoner.summonerId");
                    return e && t ? a.Ember.A(e).findBy("summonerId", t) : null
                })),
                isLocalPlayerInGame: a.Ember.computed.notEmpty("player"),
                isLocalPlayerNotInGame: a.Ember.computed.not("isLocalPlayerInGame"),
                locale: a.Ember.computed("locale", (function() {
                    return (this.get("regionLocale.locale") || "en_US").replace("_", "-")
                })),
                dismissStats: function() {
                    this.get("api.endofgame").post("/v1/state/dismiss-stats")
                },
                handlePlayerMuteStatusUpdate: function(e) {
                    e && this.set("playerMuteStatus", e)
                },
                isEarlySurrenderBystander: a.Ember.computed("eogStatsBlock.gameEndedInEarlySurrender", "eogStatsBlock.causedEarlySurrender", "eogStatsBlock.isEarlySurrenderAccomplice", (function() {
                    return this.get("eogStatsBlock.gameEndedInEarlySurrender") && !this.get("eogStatsBlock.causedEarlySurrender") && !this.get("eogStatsBlock.isEarlySurrenderAccomplice")
                })),
                runesMap: a.Ember.computed("runes.[]", (function() {
                    const e = this.get("runes");
                    return e ? e.reduce(((e, t) => (t && t.id && (e[t.id] = t), e)), {}) : {}
                })),
                itemsMap: a.Ember.computed("items.[]", (function() {
                    const e = this.get("items");
                    if (e) {
                        const t = {};
                        return e.forEach((e => {
                            e && e.id && (t[e.id] = e)
                        })), t
                    }
                    return {}
                })),
                augmentsMap: a.Ember.computed("augments.[]", (function() {
                    const e = this.get("augments");
                    if (e) {
                        const t = {};
                        return e.forEach((e => {
                            e && e.id && (t[e.id] = e)
                        })), t
                    }
                    return {}
                })),
                gameclientPostgame: a.Ember.inject.service(),
                shouldShowGameClientStats: a.Ember.computed("gameclientPostgame.lolGameClientStats", "eogStatsBlock", (function() {
                    return this.get("gameclientPostgame.lolGameClientStats") && !this.get("eogStatsBlock")
                })),
                cherryTeams: a.Ember.computed("eogStatsBlock.teams", (function() {
                    const e = [];
                    return this.get("eogStatsBlock.teams").forEach((t => t.players.forEach((function(t) {
                        const n = t.stats.PLAYER_SUBTEAM - 1;
                        e[n] = e[n] || {}, t.augments = this.buildPlayerAugmentsFromStats(t), e[n].players = e[n].players || [], e[n].players.push(t), e[n].isPlayerTeam = t.isLocalPlayer && t.stats.PLAYER_SUBTEAM - 1 === n
                    }), this)), this), e.forEach((t => t.players.forEach((function(t) {
                        const n = t.stats.PLAYER_SUBTEAM - 1;
                        e[n].stats ? e[n].stats = this.sumStatsByKey(e[n].stats, t.stats) : e[n].stats = Object.assign({}, t.stats)
                    }), this)), this), e.sort((function(e, t) {
                        return e.stats.PLAYER_SUBTEAM_PLACEMENT - t.stats.PLAYER_SUBTEAM_PLACEMENT
                    })), e
                })),
                buildPlayerAugmentsFromStats: function(e) {
                    const t = [];
                    return Object.keys(e.stats).map((function(n) {
                        n.includes("PLAYER_AUGMENT") && t.push(e.stats[n])
                    })), t
                },
                sumStatsByKey: function(e, t) {
                    return Object.keys(t).forEach((function(n) {
                        n.includes("PLAYER_SUBTEAM") || (e[n] = e[n] + t[n])
                    })), e
                }
            });
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(18);
            const o = (0, a.emberDataBinding)({
                Ember: a.Ember,
                websocket: (0, a.getProvider)().getSocket(),
                logPrefix: "service:postgame:gameflow",
                boundProperties: {
                    gameClientStats: "/lol-end-of-game/v1/tft-eog-stats",
                    eogStatsBlock: "/lol-end-of-game/v1/eog-stats-block",
                    currentLpChangeNotification: "/lol-ranked/v1/current-lp-change-notification",
                    currentRankedStats: "/lol-ranked/v1/current-ranked-stats"
                }
            });
            var l = a.Ember.Service.extend(o, {
                isRanked: a.Ember.computed("eogStatsBlock.ranked", "eogStatsBlock.queueType", "gameClientStats.isRanked", (function() {
                    const e = this.get("eogStatsBlock.ranked") && "CLASH" !== this.get("eogStatsBlock.queueType"),
                        t = this.get("gameClientStats.isRanked");
                    return Boolean(e || t)
                })),
                isRated: a.Ember.computed("queueType", (function() {
                    const e = this.get("queueType");
                    return s.QUEUES.ALL_RATED_QUEUE_TYPES.includes(e)
                })),
                queueType: a.Ember.computed("eogStatsBlock.queueType", "gameClientStats.queueType", (function() {
                    const e = this.get("gameClientStats.queueType");
                    return e || this.get("eogStatsBlock.queueType")
                })),
                isProvisional: a.Ember.computed("currentLpChangeNotification.provisionalGamesRemaining", (function() {
                    return this.get("currentLpChangeNotification.provisionalGamesRemaining") > 0
                }))
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            const s = (0, a.emberDataBinding)({
                Ember: a.Ember,
                websocket: (0, a.getProvider)().getSocket(),
                logPrefix: "service:postgame:parties",
                basePaths: {
                    lobby: "/lol-lobby",
                    platformConfig: "/lol-platform-config"
                },
                boundProperties: {
                    lobby: {
                        api: "lobby",
                        path: "/v2/lobby"
                    },
                    partiesEnabled: {
                        api: "platformConfig",
                        path: "/v1/namespaces/Parties/Enabled"
                    },
                    enabledForTeamBuilderQueues: {
                        api: "platformConfig",
                        path: "/v1/namespaces/Parties/EnabledForTeamBuilderQueues"
                    },
                    commsMembers: {
                        api: "lobby",
                        path: "/v2/comms/members"
                    },
                    hasActiveParty: {
                        api: "lobby",
                        path: "/v2/party-active"
                    },
                    partyGameMode: {
                        api: "lobby",
                        path: "/v1/parties/gamemode"
                    }
                }
            });
            var o = a.Ember.Service.extend(s, {
                playAgain: function() {
                    return this.get("api.lobby").post("/v2/play-again")
                },
                declinePlayAgain: function() {
                    return this.get("api.lobby").post("/v2/play-again-decline")
                },
                confirmButtonText: a.Ember.computed("tra.postgame_scoreboard_button_nav_play_again", (function() {
                    return this.get("tra.postgame_scoreboard_button_nav_play_again")
                })),
                invitePlayerToParty: function(e) {
                    return e && e.summonerId ? this.get("api.lobby").post("/v2/eog-invitations", [{
                        toSummonerId: e.summonerId
                    }]) : Promise.reject()
                },
                enabled: a.Ember.computed.and("partiesEnabled", "enabledForTeamBuilderQueues")
            });
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            const s = (0, a.emberDataBinding)({
                Ember: a.Ember,
                websocket: (0, a.getProvider)().getSocket(),
                logPrefix: "service:postgame:end-of-game",
                basePaths: {
                    endofgame: "/lol-end-of-game",
                    clientconfig: "/lol-client-config"
                },
                boundProperties: {
                    gameClientStats: {
                        api: "endofgame",
                        path: "/v1/tft-eog-stats"
                    },
                    playbookConfig: {
                        api: "clientconfig",
                        path: "/v3/client-config/lol.client_settings.tft.tft_playbook"
                    },
                    lolGameClientStats: {
                        api: "endofgame",
                        path: "/v1/gameclient-eog-stats-block"
                    }
                }
            });
            var o = a.Ember.Service.extend(s, {
                gameId: a.Ember.computed.alias("gameClientStats.gameId"),
                players: a.Ember.computed.alias("gameClientStats.players"),
                localPlayer: a.Ember.computed.alias("gameClientStats.localPlayer"),
                isLocalPlayerInGame: a.Ember.computed.bool("gameClientStats.localPlayer"),
                isPlaybookEnabled: a.Ember.computed.bool("playbookConfig.enabled")
            });
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(3);
            const o = (0, a.emberDataBinding)({
                Ember: a.Ember,
                websocket: (0, a.getProvider)().getSocket(),
                logPrefix: "service:postgame:gameflow",
                boundProperties: {
                    gameflowSession: "/lol-gameflow/v1/session",
                    gameflowState: "/lol-gameflow/v1/availability",
                    gameflowPlayerStatus: "/lol-gameflow/v1/gameflow-metadata/player-status"
                }
            });
            var l = a.Ember.Service.extend(o, {
                map: a.Ember.computed.alias("gameflowSession.map"),
                gameId: a.Ember.computed.alias("gameflowSession.gameData.gameId"),
                queue: a.Ember.computed.alias("gameflowSession.gameData.queue"),
                isCustomGame: a.Ember.computed.alias("gameflowSession.gameData.isCustomGame"),
                phase: a.Ember.computed.alias("gameflowSession.phase"),
                canPlayAgain: a.Ember.computed.bool("gameflowPlayerStatus.lastQueuedLobbyStatus.allowedPlayAgain"),
                canInviteOthersAtEog: a.Ember.computed.bool("gameflowPlayerStatus.canInviteOthersAtEog"),
                lastQueuedMemberSummonerIds: a.Ember.computed.alias("gameflowPlayerStatus.lastQueuedLobbyStatus.memberSummonerIds"),
                gameMode: a.Ember.computed.alias("gameflowSession.gameData.queue.gameMode"),
                isTFT: a.Ember.computed.equal("gameMode", s.TFT_GAME_MODE),
                isCherry: a.Ember.computed.equal("gameMode", s.CHERRY_GAME_MODE),
                backgroundImgPath: a.Ember.computed.alias("gameflowSession.map.assets.gameflow-background"),
                backgroundImgPathDark: a.Ember.computed.alias("gameflowSession.map.assets.gameflow-background-dark"),
                showKeystone: a.Ember.computed.not("gameflowSession.map.properties.suppressRunesMasteriesPerks")
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            const s = (0, a.emberDataBinding)({
                    Ember: a.Ember,
                    websocket: (0, a.getProvider)().getSocket(),
                    logPrefix: "service:postgame:chat-messages",
                    basePaths: {
                        chat: "/lol-chat"
                    },
                    boundProperties: {
                        conversations: "/lol-chat/v1/conversations",
                        lootGrantNotifications: "/lol-loot/v1/loot-grants",
                        chatParticipants: "/lol-chat/v1/conversations/{{encodedConversationId}}/participants",
                        playerMutes: "/lol-chat/v1/player-mutes"
                    }
                }),
                o = [],
                l = [];
            var i = a.Ember.Service.extend(s, {
                postgame: a.Ember.inject.service(),
                eternals: a.Ember.inject.service(),
                gameflow: a.Ember.inject.service(),
                teamPlayers: a.Ember.computed.readOnly("postgame.playerTeam.players"),
                selfPlayer: a.Ember.computed.readOnly("postgame.player"),
                championMasteryUpdates: a.Ember.computed.readOnly("postgame.championMasteryUpdates"),
                memberGrades: a.Ember.computed.readOnly("championMasteryUpdates.memberGrades"),
                levelUpList: a.Ember.computed.readOnly("championMasteryUpdates.levelUpList"),
                gameId: a.Ember.computed.readOnly("postgame.eogStatsBlock.gameId"),
                eternalsEoGNotification: a.Ember.computed.readOnly("eternals.eogNotification"),
                eternalsEnabledQueues: a.Ember.computed.readOnly("eternals.enabledQueues"),
                initializeValues: a.Ember.on("init", (function() {
                    this.get("conversationId"), this.get("decoratedMemberGrades"), this.get("levelUpList"), this.get("championMasteryUpdates.id"), this.get("teamBoost")
                })),
                championMasteryUpdatesObserver: a.Ember.on("init", a.Ember.observer("conversationId", "championMasteryUpdates.id", "decoratedMemberGrades.[]", "postgame.championSummary", (function() {
                    a.Ember.run.once(this, "processChampionMasteryUpdates")
                }))),
                lootGrantNotificationObserver: a.Ember.on("init", a.Ember.observer("currentGameLootGrants.@each.id", "conversationId", (function() {
                    a.Ember.run.once(this, "processLootGrantNotifications")
                }))),
                eternalsEoGNotificationObserver: a.Ember.observer("eternalsEoGNotification", "eternals", "gameflow.queue.id", (function() {
                    this.get("eternals").enabledForQueue(this.get("gameflow.queue.id")) && this.get("eternalsEoGNotification") && a.Ember.run.once(this, "processEternalsNotification")
                })),
                currentGameLootGrants: a.Ember.computed("gameId", "lootGrantNotifications.@each.gameId", (function() {
                    const e = this.get("gameId"),
                        t = this.get("lootGrantNotifications");
                    if (e && t) return t.filter((t => t.gameId === e))
                })),
                processLootGrantNotifications: function() {
                    const e = this.get("conversationId"),
                        t = this.get("currentGameLootGrants");
                    t && e && t.forEach((t => {
                        if (!o.includes(t.id)) {
                            switch (t.messageKey) {
                                case "UNOWNED_CHAMPION":
                                    this._sendSystemChatMessage(this.get("tra.postgame_chat_message_unowned_champion"), e), (0, a.dataBinding)("/lol-loot").delete(`/v1/loot-grants/${t.id}`);
                                    break;
                                case "GAME_LEAVER":
                                    this._sendSystemChatMessage(this.get("tra.postgame_chat_message_game_leaver"), e), (0, a.dataBinding)("/lol-loot").delete(`/v1/loot-grants/${t.id}`)
                            }
                            o.push(t.id)
                        }
                    }))
                },
                conversationId: a.Ember.computed("conversations.@each.id", (function() {
                    const e = this.get("conversations");
                    let t;
                    return e && e.some((function(e) {
                        if ("postGame" === e.type) return t = e.id, !0
                    })), t
                })),
                encodedConversationId: a.Ember.computed("conversationId", (function() {
                    return encodeURIComponent(this.get("conversationId"))
                })),
                summonerIdsInChat: a.Ember.computed("chatParticipants", "chatParticipants.[]", (function() {
                    return a._.map(this.get("chatParticipants"), "summonerId")
                })),
                eternalsEnabled: a.Ember.computed("eternals", "gameflow.queue.id", (function() {
                    return this.get("eternals").enabledForQueue(this.get("gameflow.queue.id"))
                })),
                decoratedMemberGrades: a.Ember.computed("memberGrades.[]", "teamPlayers.[]", "selfPlayer", "postgame.championSummary", (function() {
                    const e = this.get("memberGrades"),
                        t = this.get("teamPlayers"),
                        n = this.get("selfPlayer"),
                        a = this.get("postgame.championSummary");
                    if (this.get("memberGrades.length") && this.get("teamPlayers.length") && n && a) return e.forEach((function(e) {
                        e.championName = a.find((t => t.id === e.championId)).name, e.puuid === n.puuid ? (e.isSelfPlayer = !0, e.displayName = n.displayName?.playerName || e.summonerName) : t.forEach((function(t) {
                            e.puuid === t.puuid && (e.isTeamPlayer = !0, e.displayName = t.displayName?.playerName || e.summonerName)
                        }))
                    })), e
                })),
                allPlayersPersonalBests: a.Ember.computed("eternalsEoGNotification.selfPersonalBests", "eternalsEoGNotification.otherPersonalBests", (function() {
                    const e = this.get("eternalsEoGNotification");
                    if (e) return a._.union(e.selfPersonalBests || [], e.otherPersonalBests || [])
                })),
                processChampionMasteryUpdates: function() {
                    const e = this.get("conversationId"),
                        t = this.get("championMasteryUpdates.id"),
                        n = this.get("decoratedMemberGrades.length"),
                        a = l.includes(t),
                        s = this.get("postgame.championSummary");
                    n && e && t && s && !a && (this._displayMemberGradeMessages(), this._displayLevelUpMessages(), l.push(t))
                },
                processEternalsNotification: function() {
                    const e = this.get("conversationId");
                    this.get("eternalsEoGNotification") && e && this._displayStatstonePersonalBestMessages()
                },
                updatePlayerMute: function(e, t, n) {
                    const a = this.get("conversationId");
                    this.get("api.chat").post("/v1/player-mutes", {
                        puuids: [e],
                        isMuted: n
                    });
                    const s = this.get("tra");
                    let o = "";
                    o = n ? s.formatString("postgame_system_message_player_muted", {
                        summonerName: t
                    }) : s.formatString("postgame_system_message_player_unmuted", {
                        summonerName: t
                    }), this._sendSystemChatMessage(o, a)
                },
                _displayMemberGradeMessages: function() {
                    const e = this.get("decoratedMemberGrades"),
                        t = this.get("conversationId");
                    e.forEach((e => {
                        e.isSelfPlayer ? this._sendSystemChatMessage(this.get("tra").formatString("postgame_chat_message_s_grade_self", {
                            grade: e.grade,
                            championName: e.championName
                        }), t) : e.isTeamPlayer && this._sendSystemChatMessage(this.get("tra").formatString("postgame_chat_message_s_grade_other", {
                            grade: e.grade,
                            summonerName: e.displayName,
                            championName: e.championName
                        }), t)
                    }))
                },
                _displayStatstonePersonalBestMessages: function() {
                    const e = this.get("allPlayersPersonalBests"),
                        t = this.get("conversationId");
                    e && e.forEach((e => {
                        this._sendSystemChatMessage(this.get("tra").formatString("postgame_eternals_personal_best_chat_message", {
                            summonerName: e.summoner.displayName,
                            personalBest: e.personalBest,
                            statstoneName: e.statstoneName
                        }), t)
                    }))
                },
                _displayLevelUpMessages: function() {
                    const e = this.get("championMasteryUpdates.levelUpList"),
                        t = this.get("conversationId"),
                        n = this.get("selfPlayer"),
                        a = this.get("teamPlayers"),
                        s = this.get("postgame.championSummary");
                    e.forEach((e => {
                        const o = s.find((t => t.id === e.championId)),
                            l = o.name,
                            i = o.roles[0],
                            r = e.championLevel || 5;
                        let c = "";
                        if (i && (c = this.get(`tra.champion_mastery_role_title_${i.toLowerCase()}_${r}`)), e.playerId === n.summonerId) this._sendSystemChatMessage(this.get("tra").formatString("postgame_chat_message_champion_mastery_level_self", {
                            masteryLevel: r,
                            masteryTitle: c,
                            championName: l
                        }), t);
                        else {
                            const n = a.find((t => e.playerId === t.summonerId));
                            if (n) {
                                const e = n && (n.displayName?.playerName || n.summonerName);
                                this._sendSystemChatMessage(this.get("tra").formatString("postgame_chat_message_champion_mastery_level_other", {
                                    summonerName: e,
                                    masteryLevel: r,
                                    masteryTitle: c,
                                    championName: l
                                }), t)
                            }
                        }
                    }))
                },
                _sendSystemChatMessage: function(e, t) {
                    this.get("api.chat").post(`/v1/conversations/${encodeURIComponent(t)}/messages`, {
                        body: e,
                        type: "celebration"
                    })
                }
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            const s = "/lol-statstones/v1/statstones-enabled-queue-ids",
                o = "/lol-statstones/v1/eog-notifications",
                l = "/lol-platform-config/v1/namespaces/Eternals/Enabled",
                i = "/lol-end-of-game/v1/eog-stats-block",
                r = "/lol-end-of-game/v1/gameclient-eog-stats-block";
            var c = a.Ember.Service.extend({
                init: function() {
                    this._super(...arguments), this._prevGameId = 0, this.set("enabledQueues", []), this.set("notifications", []), this.binding = a.dataBinding.bindTo((0, a.getProvider)().getSocket()), this.initDataBindings()
                },
                willDestroy: function() {
                    this._super(...arguments), this.binding.unobserve(l, this), this.binding.unobserve(s, this), this.binding.unobserve(i, this), this.binding.unobserve(r, this), this._prevGameId && this.binding.unobserve(`${o}/${this._prevGameId}`, this), this.binding = null
                },
                initDataBindings: function() {
                    this.binding.observe(i, this, this.handleEoGStatsBlock), this.binding.observe(r, this, this.handleEoGStatsBlock), this.binding.observe(l, this, (e => {
                        const t = !!e;
                        this.set("enabled", t), this.observeEternalsResources(t)
                    }))
                },
                handleEoGStatsBlock: function(e) {
                    if (!e) return;
                    const {
                        gameId: t
                    } = e;
                    if (this._prevGameId && this.binding.unobserve(`${o}/${this._prevGameId}`, this), t && (this._prevGameId = t), this.get("enabled") && t) {
                        const e = `${o}/${this._prevGameId}`;
                        this.binding.observe(e, this, this.handleEternalsUpdate)
                    }
                },
                handleEternalsUpdate: function(e) {
                    e || (e = {}), this.set("eogNotification", e)
                },
                observeEternalsResources: function(e) {
                    if (this.binding && !this.isDestroyed && !this.isDestroying)
                        if (e) {
                            if (this.binding.observe(s, this, (e => {
                                    e || (e = []), this.set("enabledQueues", e)
                                })), this._prevGameId) {
                                const e = `${o}/${this._prevGameId}`;
                                this.binding.observe(e, this, this.handleEternalsUpdate)
                            }
                        } else this.set("enabledQueues", []), this.set("eogNotification", {}), this.binding.unobserve(s, this), this._prevGameId && this.binding.unobserve(`${o}/${this._prevGameId}`, this)
                },
                enabledForQueue: function(e) {
                    return (this.get("enabledQueues") || []).includes(e)
                },
                selfProgression: a.Ember.computed("eogNotification.selfStatstoneProgress.[]", "eogNotification.selfMilestoneProgress.[]", (function() {
                    const e = this.get("eogNotification.selfStatstoneProgress") || [],
                        t = this.get("eogNotification.selfMilestoneProgress") || [];
                    return this.addMilestoneToProgressData(e, t)
                })),
                addMilestoneToProgressData: function(e, t) {
                    return t.forEach((t => {
                        const n = e.find((e => e.statstoneId === t.statstoneId));
                        n && (n.isMilestone = !0)
                    })), e
                }
            });
            t.default = c
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            var s = a.Ember.Service.extend({
                enabled: a.Ember.computed.alias("honorConfig.Enabled"),
                recallRewardEnabled: a.Ember.computed.alias("honorConfig.RecallRewardEnabled"),
                honorVisibilityEnabled: a.Ember.computed.alias("honorConfig.HonorVisibilityEnabled"),
                init: function() {
                    this._super(...arguments), this.binding = a.dataBinding.bindTo((0, a.getProvider)().getSocket()), this.initDataBindingObservers()
                },
                willDestroy: function() {
                    this._super(...arguments), this.tearDownDataBindingObservers()
                },
                initDataBindingObservers() {
                    this._observers = [], this._observers.push(this._addObservedProperty("/lol-honor-v2/v1/config", "honorConfig")), this._observers.push(this._addObservedProperty("/lol-settings/v2/local/lol-user-experience", "uxSettings")), this._observers.push(this._addObservedProperty("/lol-chat/v1/conversations", "conversations")), this._observers.push(this._addObservedProperty("/lol-honor-v2/v1/team-choices", "teamChoices")), this._observers.push(this._addObservedProperty("/lol-honor-v2/v1/recognition", "receivedHonors")), this._observers.push(this._addObservedProperty("/lol-honor-v2/v1/profile", "honorProfile")), this._observers.push(this._addObservedProperty("/lol-honor-v2/v1/vote-completion", "voteCompletion"))
                },
                tearDownDataBindingObservers() {
                    this._observers && this._observers.forEach((e => this.binding.unobserve(e, this))), this._observers = []
                },
                _setPropertyValue(e, t) {
                    this.isDestroying || this.isDestroyed || this.set(e, t)
                },
                _addObservedProperty(e, t) {
                    return this.binding.observe(e, this, (e => {
                        this._setPropertyValue(t, e)
                    })), e
                }
            });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            var a = n(1);
            e.exports = a.Ember.Service.extend({
                init: function() {
                    this._super(...arguments), this._binding = a.dataBinding.bindTo(a.socket), this._binding.observe("/lol-challenges/v1/challenges/local-player", this, this.handleLocalPlayerChallenges)
                },
                handleLocalPlayerChallenges(e) {
                    this.set("localPlayerChallengesData", e)
                }
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Service.extend({
                    init: function() {
                        this._super(...arguments), this.initPerksDataBindings()
                    },
                    initPerksDataBindings() {
                        this.databinding = (0, a.dataBinding)("/lol-perks", a.socket), this.databinding.observe("/v1/inventory", this, this.handlePerksInventory), this.databinding.observe("/v1/currentpage", this, this.handleCurrentPage)
                    },
                    handlePerksInventory(e) {
                        this.set("canAddCustomPage", e && e.canAddCustomPage), this.set("isCustomPageCreationUnlocked", e && e.isCustomPageCreationUnlocked)
                    },
                    handleCurrentPage(e) {
                        this.set("currentPage", e), this.set("isCurrentPageTemporary", e && e.isTemporary)
                    },
                    createPerksPage: function() {
                        const e = this.get("currentPage");
                        return e.isTemporary = !1, this.databinding.post("/v1/pages", e)
                    }
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Service.extend({
                    championMasteryUpdates: null,
                    summonerBasePath: "/lol-summoner",
                    currentSummonerPath: "/v1/current-summoner",
                    endOfGameBasePath: "/lol-end-of-game",
                    endOfGameStatsBlockPath: "v1/eog-stats-block",
                    championMasteryUpdatesPath: "v1/champion-mastery-updates",
                    platformConfigBasePath: "/lol-platform-config",
                    championMasteryConfigPath: "/v1/namespaces/ChampionMasteryConfig",
                    playerReportSenderBasePath: "/lol-player-report-sender",
                    init() {
                        this._super(...arguments), this.initDataBindings(), this.initObservers()
                    },
                    willDestroy() {
                        this.removeObservers(), this.removeDataBindings()
                    },
                    initDataBindings() {
                        this.summonerBinding = (0, a.dataBinding)(this.get("summonerBasePath"), a.socket), this.endOfGameBinding = (0, a.dataBinding)(this.get("endOfGameBasePath"), a.socket), this.platformConfigBinding = (0, a.dataBinding)(this.get("platformConfigBasePath"), a.socket), this.playerReportSenderBinding = (0, a.dataBinding)(this.get("playerReportSenderBasePath"), a.socket)
                    },
                    initObservers() {
                        this.summonerBinding.observe(this.get("currentSummonerPath"), this, this.handleCurrentSummonerUpdate.bind(this)), this.endOfGameBinding.observe(this.get("championMasteryUpdatesPath"), this, this.handleChampionMasteryUpdate.bind(this)), this.endOfGameBinding.observe(this.get("endOfGameStatsBlockPath"), this, this.handleEOGStatsBlockUpdate.bind(this)), this.platformConfigBinding.observe(this.get("championMasteryConfigPath"), this, this.handleChampionMasteryConfigUpdate.bind(this))
                    },
                    removeDataBindings() {
                        this.summonerBinding = null, this.endOfGameBinding = null, this.platformConfigBinding = null, this.playerReportSenderBinding = null
                    },
                    removeObservers() {
                        this.summonerBinding.removeObserver(this.get("currentSummonerPath"), this), this.endOfGameBinding.removeObserver(this.get("championMasteryUpdatesPath"), this), this.endOfGameBinding.removeObserver(this.get("endOfGameStatsBlockPath"), this), this.platformConfigBinding.removeObserver(this.get("championMasteryConfigPath"), this), this.playerReportSenderBinding.removeObserver(this.get("playerReportSenderBasePath"), this)
                    },
                    handleChampionMasteryUpdate(e) {
                        this.set("championMasteryUpdates", e)
                    },
                    handleEOGStatsBlockUpdate(e) {
                        if (this.set("eogStatsBlock", e), e && e.gameId) {
                            const t = e.gameId;
                            this.playerReportSenderBinding.observe(`/v1/reported-players/gameId/${t}`, this, this.handleReportedPlayersUpdate)
                        }
                    },
                    handleReportedPlayersUpdate(e) {
                        this.set("reportedPlayers", e)
                    },
                    handleCurrentSummonerUpdate(e) {
                        this.set("currentSummoner", e)
                    },
                    handleChampionMasteryConfigUpdate(e) {
                        this.set("championMasteryConfig", e)
                    },
                    playerTeam: a.Ember.computed("eogStatsBlock.teams", (function() {
                        const e = this.get("eogStatsBlock.teams");
                        return e ? e.find((e => e.isPlayerTeam)) : null
                    })),
                    player: a.Ember.computed("playerTeam", "currentSummoner.summonerId", (function() {
                        const e = this.get("playerTeam.players"),
                            t = this.get("currentSummoner.summonerId");
                        return e && t ? a.Ember.A(e).findBy("summonerId", t) : null
                    }))
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(3);
            const o = {
                type: "DialogToast"
            };
            var l = a.Ember.Service.extend({
                templateHelper: a.UIKit.getTemplateHelper(),
                toastManager: a.UIKit.getToastManager(),
                modalManager: a.UIKit.getModalManager(),
                profilePlugin: a.profilePlugin,
                parties: a.Ember.inject.service(),
                init() {
                    this._super(...arguments), this.set("alreadyFriendRequestedList", []), this.binding = a.dataBinding.bindTo(a.socket), this.binding.observe("/lol-gameflow/v1/session", this, this.handleGameflowSession), this.binding.observe("/lol-chat/v1/blocked-players", this, this.handleBlockedPlayers)
                },
                handleGameflowSession(e) {
                    const t = a.Ember.get(e, "map.id");
                    this.set("currentMapId", t)
                },
                handleBlockedPlayers(e) {
                    this.set("blockedPlayersList", e || [])
                },
                showToast(e, t, n) {
                    const a = Object.assign({}, o, n);
                    return a.data = {
                        contents: this.templateHelper.contentBlockNotification(e, t)
                    }, this.toastManager.add(a)
                },
                showFriendRequestSuccessToast() {
                    const e = this.get("tra.postgame_friend_request_sent");
                    return this.showToast(e, "postgame-friend-request-toast", {
                        timing: "fast"
                    })
                },
                showFriendRequestFailToast(e) {
                    const t = e.includes(s.FULL_LIST_ERROR) ? this.get("tra.postgame_friend_request_error_self_full") : this.get("tra.postgame_friend_request_error");
                    return this.showToast(t, "postgame-friend-request-toast-error", {})
                },
                showConfirmDialog(e) {
                    const {
                        title: t,
                        body: n,
                        className: a,
                        acceptText: s,
                        declineText: o
                    } = e, l = this.templateHelper.contentBlockDialog(t, n, "dialog-medium", a);
                    return this.modalManager.add({
                        type: "DialogConfirm",
                        data: {
                            contents: l,
                            acceptText: s,
                            declineText: o,
                            closeButton: !1
                        }
                    })
                },
                _showAddBlockedFriendDialog: function(e, t, n) {
                    this.showConfirmDialog({
                        title: this.get("tra.postgame_add_blocked_friend_title"),
                        body: this.get("tra").formatString("postgame_add_blocked_friend_description", {
                            name: t || e
                        }),
                        className: "confirm-blocked-friend-actions",
                        acceptText: this.get("tra.postgame_add_blocked_friend_confirm"),
                        declineText: this.get("tra.postgame_add_blocked_friend_cancel")
                    }).acceptPromise.then((() => {
                        this._unblockAndAddFriend(e, t, n)
                    })).catch((() => {}))
                },
                _unblockAndAddFriend: function(e, t, n) {
                    return (0, a.dataBinding)("/lol-chat").get("/v1/blocked-players").then((s => {
                        const o = s.find((e => e.summonerId === n));
                        o ? (0, a.dataBinding)("/lol-chat").delete(`/v1/blocked-players/${encodeURIComponent(o.id)}`).then((() => {
                            this.sendFriendRequest(e, t, n)
                        })) : this.sendFriendRequest(e, t, n)
                    }))
                },
                importItemSet: function(e) {
                    const t = e.championName,
                        n = e.championId,
                        s = {
                            source: "eog",
                            items: (e.items || []).slice(),
                            name: this.get("tra").formatString("postgame_item_sets_import_name", {
                                champion: t,
                                summoner: e.summonerName
                            }),
                            maps: [this.get("currentMapId")],
                            champions: [n]
                        };
                    (0, a.getProvider)().getOptional("rcp-fe-lol-collections").then((e => e.getItemSetsApi().saveItemSet(s)), (e => a.logger.error("Provider getOptional failure", e)))
                },
                inviteToParty: function(e) {
                    e && this.get("parties").invitePlayerToParty(e)
                },
                sendFriendRequest: function(e, t, n) {
                    const s = {
                        direction: "out",
                        name: e
                    };
                    return (0, a.dataBinding)("/lol-chat").post("/v1/friend-requests", s).then((() => {
                        const e = this.get("alreadyFriendRequestedList").slice();
                        e.push(n), this.set("alreadyFriendRequestedList", e), this.showFriendRequestSuccessToast()
                    })).catch((a => {
                        if (405 === a.status) this._showAddBlockedFriendDialog(e, t, n);
                        else {
                            const e = a.data.message;
                            this.showFriendRequestFailToast(e)
                        }
                    }))
                },
                confirmBlockPlayer(e, t) {
                    const n = this.templateHelper.contentBlockDialog(this.get("tra.postgame_roster_confirm_block_title"), this.get("tra").formatString("postgame_roster_confirm_block_text", {
                            name: e
                        }), "dialog-medium", "confirm-friend-actions"),
                        s = this.modalManager.add({
                            type: "DialogConfirm",
                            data: {
                                contents: n,
                                acceptText: this.get("tra.postgame_roster_confirm_block"),
                                declineText: this.get("tra.postgame_roster_confirm_cancel"),
                                closeButton: !1
                            }
                        }),
                        o = s.domNode.querySelector(".confirm-friend-actions");
                    o.style.width = "360px", o.querySelector("p").style.textAlign = "left", s.acceptPromise.then((() => {
                        (0, a.dataBinding)("/lol-chat").post("/v1/blocked-players", {
                            summonerId: t
                        })
                    })).catch((() => {}))
                },
                viewProfile(e) {
                    this.profilePlugin.showOverlay({
                        summonerId: e
                    })
                }
            });
            t.default = l
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "UiDr3vz2",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\application.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","postgame-application"],["flush-element"],["text","\\n  "],["append",["unknown",["outlet"]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "FYORDdVP",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\postgame.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["block",["if"],[["get",["isPostgameReady"]]],null,5,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","skip-waiting-for-stats-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"skipWaitingForStats"],null],null],["flush-element"],["text","\\n            "],["append",["unknown",["tra","postgame_skip_waiting_for_stats"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["render-timer"],null,[["renderAfterMs"],[["get",["skipWaitingForStatsWaitMs"]]]],0]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","postgame-waiting-for-stats-container"],["flush-element"],["text","\\n    "],["append",["unknown",["hextech-loading-animation"]],false],["text","\\n    "],["open-element","div",[]],["static-attr","class","postgame-skip-waiting-for-stats-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isWaitingForStats"]]],null,1],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","postgame-background-image"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["backgroundImgPath"]],")"]]],["flush-element"],["close-element"],["text","\\n    "],["append",["unknown",["postgame-common"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","postgame-background-image"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["backgroundImgPathDark"]],")"]]],["flush-element"],["close-element"],["text","\\n    "],["append",["unknown",["postgame-root"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["showPostgameV2"]]],null,4,3]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "lmokogXL",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-common.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-common.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-common.js\\" "],["text","\\n"],["block",["if"],[["get",["extEmberModel","isPostgameShowing"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","postgame-chat-box"],["flush-element"],["text","\\n          "],["open-element","lol-social-chat-room",[]],["static-attr","type","postGame"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","postgame-content"],["flush-element"],["text","\\n      "],["append",["helper",["postgame-scoreboard"],null,[["leavePostgame"],["leavePostgame"]]],false],["text","\\n\\n"],["block",["if"],[["get",["isLocalPlayerInGame"]]],null,0],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "SYhV/D9u",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-header.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-header.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-header.js\\" "],["text","\\n"],["append",["helper",["postgame-game-result-icon"],null,[["isLeaver","isVictory","isLossForgiven"],[["get",["isLeaver"]],["get",["isVictory"]],["get",["isLossForgiven"]]]]],false],["text","\\n"],["open-element","div",[]],["static-attr","class","postgame-header-wrapper"],["flush-element"],["text","\\n  "],["append",["helper",["postgame-game-result"],null,[["isLeaver","isVictory","isLossForgiven","isDefeat","isURFDefeat"],[["get",["isLeaver"]],["get",["isVictory"]],["get",["isLossForgiven"]],["get",["isDefeat"]],["get",["isURFDefeat"]]]]],false],["text","\\n  "],["append",["helper",["postgame-game-info"],null,[["gameId"],[["get",["gameId"]]]]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "xIJ2Chbk",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-game-info.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-game-info.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-game-info.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","postgame-map-info"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","postgame-map-info-item-game-mode"],["flush-element"],["append",["unknown",["queueDescription"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["postgame","isLocalPlayerInGame"]]],null,0],["text","  "],["open-element","div",[]],["static-attr","class","postgame-map-info-item-game-length"],["flush-element"],["append",["unknown",["gameLength"]],false],["close-element"],["text","\\n  "],["append",["helper",["game-id-clipboard-copy"],null,[["gameId"],[["get",["gameId"]]]]],false],["text","\\n"],["close-element"],["text","\\n"],["append",["unknown",["postgame-game-info-icons"]],false]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","postgame-map-info-item-win-loss"],["flush-element"],["append",["unknown",["playerWinLoss"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "qzr3txJz",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-game-info-icons.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-game-info-icons.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-game-info-icons.js\\" "],["text","\\n"],["block",["if"],[["get",["areRerollPointsAvailable"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","postgame-game-info-icons-tooltip"],["flush-element"],["append",["unknown",["rerollPointsTagline"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","postgame-game-info-icons-item-aram-reroll"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],0],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "TRWr0/AN",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-game-result.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-game-result.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-game-result.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","postgame-outcome"],["flush-element"],["text","\\n"],["block",["if"],[["get",["rankedInfoTagline"]]],null,18,17],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["shouldShowPlacements"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","postgame-game-result-placement-games"],["flush-element"],["append",["unknown",["placementGamesString"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["tra","postgame_progress_defeat"]],false],["text","\\n    "]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["tra","postgame_progress_defeat_urf"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isURFDefeat"]]],null,2,1]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["tra","postgame_progress_victory"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isVictory"]]],null,4,3]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["subteamPlacementString"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isGameModeWithSubteams"]]],null,6,5]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["tra","postgame_progress_leaver"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isLeaver"]]],null,8,7]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["tra","postgame_progress_remake"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isEarlySurrenderBystander"]]],null,10,9]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["tra","postgame_progress_remake_restricted"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isEarlySurrenderAccomplice"]]],null,12,11]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["tra","postgame_progress_remake_leaver"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isEarlySurrenderCauser"]]],null,14,13]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["tra","postgame_progress_loss_forgiven"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isLossForgiven"]]],null,16,15]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["rankedInfoTagline"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "fU5kiWNx",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-game-result-icon.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-game-result-icon.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-game-result-icon.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","postgame-map-icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["icon"]],");"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "fFSA1B+s",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-scoreboard.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-scoreboard.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-scoreboard.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","postgame-scoreboard-header"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isTFT"]]],null,9,8],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","postgame-scoreboard-body"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","postgame-tft-players"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","postgame-tft-player tft-player-header-row"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tft-player-left-column"],["flush-element"],["text","\\n        "],["open-element","h3",[]],["flush-element"],["append",["unknown",["tra","postgame_scoreboard_tft_header_placement_shortened"]],false],["close-element"],["text","\\n        "],["open-element","h3",[]],["flush-element"],["append",["unknown",["tra","postgame_scoreboard_tft_header_player"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["hasPartnerGroups"]]],null,5],["block",["each"],[["get",["tftPlayers"]]],null,3],["text","  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["isLocalPlayerInGame"]]],null,2,1],["close-element"],["text","\\n\\n"],["append",["unknown",["postgame-party-status"]],false],["text","\\n\\n"],["append",["helper",["arrow-footer"],null,[["confirmButtonDisabled","closeButtonDisabled","confirmButtonText","closeButtonText","closeButtonHoverSound","closeButtonClickSound","confirmButtonHoverSound","confirmButtonClickSound","closeButtonType","confirmButtonClicked","closeButtonClicked"],[["get",["isPlayAgainDisabled"]],["get",["isFooterDisabled"]],["get",["confirmButtonText"]],["get",["closeButtonText"]],"/fe/lol-postgame/sfx-uikit-button-gold-hover.ogg","/fe/lol-postgame/sfx-uikit-button-gold-click.ogg","/fe/lol-postgame/sfx-nav-button-play-hover.ogg","/fe/lol-postgame/sfx-nav-button-play-click.ogg","close","playAgain","goToHome"]]],false],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["unknown",["postgame-scoreboard-progression"]],false],["text","\\n  "]],"locals":[]},{"statements":[["block",["if"],[["get",["gameclientPostgame","isLocalPlayerInGame"]]],null,0]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["postgame-scoreboard-progression"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["tft-player"],null,[["player","showPlacementBanner","isPlaybookEnabled"],[["get",["player"]],["helper",["if"],[["get",["hasPartnerGroups"]],false,true],null],["get",["isPlaybookEnabled"]]]]],false],["text","\\n"]],"locals":["player"]},{"statements":[["text","          "],["append",["helper",["tft-partner-group-placement"],null,[["partnerGroup","placement"],[["get",["partnerGroup"]],["get",["index"]]]]],false],["text","\\n"]],"locals":["partnerGroup","index"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","postgame-tft-partner-group-placements"],["flush-element"],["text","\\n"],["block",["each"],[["get",["tftPartnerGroupsByPlacement"]]],null,4],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","postgame-match-history-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"displayAdvancedDetails"],null],null],["flush-element"],["text","\\n            "],["append",["unknown",["tra","postgame_scoreboard_view_advanced_details"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["unknown",["postgame-scoreboard-replay-button"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["postgame-header"],null,[["gameId"],[["get",["gameId"]]]]],false],["text","\\n    "],["open-element","div",[]],["static-attr","class","postgame-scoreboard-header-button-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["postgame","isLocalPlayerInGame"]]],null,7],["block",["unless"],[["get",["isDetailsTabOpen"]]],null,6],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["tft-header"],null,[["gameId"],[["get",["gameId"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "x+WM2ccC",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-scoreboard-player-augment.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-scoreboard-player-augment.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-scoreboard-player-augment.js\\" "],["text","\\n"],["block",["if"],[["get",["augmentId"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","scoreboard-header-stat-icon-tooltip"],["flush-element"],["text","\\n      "],["append",["unknown",["augmentData","nameTRA"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","postgame-player-augment"],["dynamic-attr","style",["concat",["-webkit-mask-image: url(",["unknown",["augmentData","augmentSmallIconPath"]],");"]]],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["top"]],0]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "SiAGm+59",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-scoreboard-player-keystone-icon.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-scoreboard-player-keystone-icon.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-scoreboard-player-keystone-icon.js\\" "],["text","\\n"],["block",["if"],[["get",["circleIconHolder"]]],null,4,3],["text","\\n"],["block",["uikit-tooltip"],null,[["targetAnchorX","targetAnchorY","tooltipAnchorX","tooltipAnchorY","offsetX","offsetY","restrictArea"],["left","bottom","left","top",-18,5,"whole-window"]],2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","postgame-player-keystone-icon-description"],["flush-element"],["append",["helper",["sanitize"],[["get",["keystone","shortDesc"]]],[["config"],[["get",["sanitizeConfig"]]]]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","postgame-player-keystone-icon-description"],["flush-element"],["append",["helper",["sanitize"],[["get",["keystone","tooltip"]]],[["config"],[["get",["sanitizeConfig"]]]]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","postgame-player-keystone-icon-tooltip"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","postgame-player-keystone-icon-tooltip-header"],["flush-element"],["text","\\n      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["keystone","iconPath"]]]]],["static-attr","class","postgame-player-keystone-icon-tooltip-icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","postgame-player-keystone-icon-tooltip-name"],["flush-element"],["append",["helper",["sanitize"],[["get",["keystone","name"]]],[["config"],[["get",["sanitizeConfig"]]]]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["isSubStyle"]]],null,1,0],["text","  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["keystone","iconPath"]]]]],["static-attr","class","postgame-player-keystone-icon-img"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["keystone","iconPath"]]]]],["static-attr","class","postgame-player-keystone-icon-img"],["flush-element"],["close-element"],["text","  \\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "JdhJFqGx",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-scoreboard-player-buttons.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-scoreboard-player-buttons.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-scoreboard-player-buttons.js\\" "],["text","\\n"],["open-element","button",[]],["static-attr","class","postgame-player-button-add-friend"],["dynamic-attr","disabled",["unknown",["isFriendRequestDisabled"]],null],["modifier",["action"],[["get",[null]],"sendFriendRequest",["get",["player"]]]],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition","disabled"],["system","top",["get",["isFriendRequestDisabled"]]]],3],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["showInviteButton"]]],null,2],["text","\\n"],["open-element","button",[]],["static-attr","class","postgame-player-button-report"],["dynamic-attr","disabled",["unknown",["isReportDisabled"]],null],["modifier",["action"],[["get",[null]],"showReportDialog",["get",["player"]]]],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition","disabled"],["system","top",["get",["isReportDisabled"]]]],0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","postgame-player-button-tooltip"],["flush-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","postgame_scorecard_harassment_report_player"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","postgame-player-button-tooltip"],["flush-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","postgame_scorecard_invite_to_party"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["open-element","button",[]],["static-attr","class","postgame-player-invite-to-party"],["dynamic-attr","disabled",["unknown",["isInviteDisabled"]],null],["modifier",["action"],[["get",[null]],"inviteToParty",["get",["player"]]]],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition","disabled"],["system","top",["get",["isInviteDisabled"]]]],1],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","postgame-player-button-tooltip"],["flush-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","postgame_scoreboard_add_friend"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "DIHzSqr9",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-scoreboard-player-item.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-scoreboard-player-item.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-scoreboard-player-item.js\\" "],["text","\\n"],["block",["if"],[["get",["itemId"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","postgame-player-item-tooltip"],["flush-element"],["text","\\n\\n      "],["open-element","div",[]],["static-attr","class","postgame-player-item-tooltip-header"],["flush-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","postgame-player-item-tooltip-icon"],["dynamic-attr","src",["concat",[["unknown",["itemData","iconPath"]]]]],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","postgame-player-item-tooltip-name"],["flush-element"],["append",["unknown",["itemData","name"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","postgame-player-item-tooltip-price"],["flush-element"],["append",["unknown",["itemData","priceTotal"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n\\n      "],["open-element","div",[]],["static-attr","class","postgame-player-item-tooltip-description"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-game-data-markup",[]],["static-attr","type","item"],["dynamic-attr","markup",["concat",[["unknown",["itemData","description"]]]]],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition"],["right"]],0]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "uG7Mt6zF",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-scoreboard-progression.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-scoreboard-progression.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-scoreboard-progression.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","progression-body"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","progression-scroll-container"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","disabled"],["static-attr","class","progression-components"],["flush-element"],["text","\\n"],["block",["each"],[["get",["scrollableComponents"]]],null,1],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  \\n"],["block",["each"],[["get",["fixedComponents"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["component"],[["get",["fixedComponent","componentName"]]],[["sharedData","previousAnimationPromise","resolveAnimationPromise"],[["get",["componentSharedData"]],["get",["fixedComponent","previousAnimationPromise"]],["get",["fixedComponent","resolveAnimationPromise"]]]]],false],["text","\\n"]],"locals":["fixedComponent"]},{"statements":[["text","        "],["append",["helper",["component"],[["get",["scrollableComponent","componentName"]]],[["sharedData","previousAnimationPromise","resolveAnimationPromise"],[["get",["componentSharedData"]],["get",["scrollableComponent","previousAnimationPromise"]],["get",["scrollableComponent","resolveAnimationPromise"]]]]],false],["text","\\n"]],"locals":["scrollableComponent"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "xuyIjbsu",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-scoreboard-progression-number-reels.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-scoreboard-progression-number-reels.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-scoreboard-progression-number-reels.js\\" "],["text","\\n"],["append",["unknown",["totalFormatted"]],false],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "OvYRw7kH",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-scoreboard-breakdown.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-scoreboard-breakdown.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-scoreboard-breakdown.js\\" "],["text","\\n"],["open-element","table",[]],["static-attr","class","lol-uikit-list-table postgame-breakdown-table"],["flush-element"],["text","\\n"],["block",["each"],[["get",["breakdownValues"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","tr",[]],["static-attr","class","postgame-breakdown-entry"],["dynamic-attr","disabled",["unknown",["breakdownValue","isDisabled"]],null],["flush-element"],["text","\\n      "],["open-element","td",[]],["static-attr","class","postgame-breakdown-amount"],["flush-element"],["open-element","span",[]],["static-attr","class","lol-typekit-value"],["flush-element"],["text","+"],["append",["unknown",["breakdownValue","amount"]],false],["close-element"],["close-element"],["text","\\n      "],["open-element","td",[]],["static-attr","class","postgame-breakdown-name"],["flush-element"],["open-element","span",[]],["static-attr","class","lol-typekit-label"],["flush-element"],["append",["unknown",["breakdownValue","name"]],false],["close-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["breakdownValue"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "5tpIGEt0",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-scoreboard-progression-ranked.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-scoreboard-progression-ranked.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-scoreboard-progression-ranked.js\\" "],["text","\\n"],["block",["if"],[["get",["shouldShow"]]],null,27]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-lottie",[]],["static-attr","src","fe/lol-static-assets/lottie/postgame/tft_EOG_WinStreak_LabelVFX.json"],["static-attr","image-path","fe/lol-static-assets/lottie/postgame/images/"],["static-attr","class","postgame-win-streak"],["dynamic-attr","text-winstreak",["concat",[["unknown",["winStreakString"]]]]],["static-attr","autoplay","true"],["static-attr","fixed-width","true"],["static-attr","loop","true"],["flush-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","postgame-demotion-protection"],["flush-element"],["append",["unknown",["tra","postgame_demotion_protection"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","uikit-video",[]],["static-attr","class","delta-lp-modifier-video"],["static-attr","src","/fe/lol-static-assets/videos/lp_returned_effect.webm"],["static-attr","perf-flags","largeAreaAnimationsEnabled"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","uikit-video",[]],["static-attr","class","delta-lp-modifier-video"],["static-attr","src","/fe/lol-static-assets/videos/lp_penalty_effect.webm"],["static-attr","perf-flags","largeAreaAnimationsEnabled"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["afkLpPenaltyAppliedTooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition"],["bottom"]],4]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["consolationTooltipBody"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition"],["bottom"]],6]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","postgame-ranked-error-tooltip"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","postgame-ranked-error-tooltip-header"],["flush-element"],["append",["unknown",["errorTooltipHeader"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","postgame-ranked-error-tooltip-body"],["flush-element"],["append",["unknown",["errorTooltipBody"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition"],["left"]],8]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["postgame-ranked-pending ",["helper",["if"],[["get",["spinnerIsVisible"]],"visible"],null]]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","postgame-ranked-pending-spinner"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","postgame-ranked-body-no-change"],["flush-element"],["text","\\n            "],["append",["helper",["sanitize"],[["get",["displayedLpText"]]],null],false],["text","\\n          "],["close-element"],["text","\\n        "]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","postgame-ranked-body"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","postgame-ranked-overflow-box"],["flush-element"],["text","\\n              "],["open-element","span",[]],["dynamic-attr","class",["concat",["lp-loss-scroll-area ",["helper",["if"],[["get",["triggeredAnimation"]],"active"],null]]]],["flush-element"],["text","\\n                "],["append",["helper",["sanitize"],[["get",["displayedLpText"]]],null],false],["text","\\n                "],["open-element","div",[]],["static-attr","class","lp-loss-scroll-container"],["flush-element"],["text","\\n                  "],["append",["unknown",["leaguePointsTotal"]],false],["text","\\n                  "],["open-element","div",[]],["static-attr","class","lp-loss-scroll new"],["flush-element"],["text","\\n                    "],["append",["unknown",["leaguePointsTotal"]],false],["text","\\n                  "],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","lp-loss-scroll previous"],["flush-element"],["text","\\n                    "],["append",["unknown",["previousLp"]],false],["text","\\n                  "],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","lp-loss-flash"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","lp-loss-flash-2"],["flush-element"],["text","\\n                      "],["append",["unknown",["leaguePointsTotal"]],false],["text","\\n                    "],["close-element"],["text","\\n                  "],["close-element"],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isLosingLp"]]],null,12,11]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","postgame-ranked-body"],["flush-element"],["text","\\n            "],["open-element","span",[]],["static-attr","class","lp-win-container"],["flush-element"],["text","\\n              "],["append",["helper",["sanitize"],[["get",["displayedLpText"]]],null],false],["text","\\n              "],["open-element","div",[]],["dynamic-attr","class",["concat",["lp-win-flash ",["helper",["if"],[["get",["triggeredAnimation"]],"active"],null]]]],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","lp-win-flash-2"],["flush-element"],["text","\\n                  "],["append",["unknown",["leaguePointsTotal"]],false],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isGainingLp"]]],null,14,13]],"locals":[]},{"statements":[["text","                  "],["open-element","span",[]],["static-attr","class","miniseries-placeholder"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","span",[]],["dynamic-attr","class",["concat",["miniseries-container ",["helper",["if"],[["get",["triggeredAnimation"]],"active"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["miniseriesGame","animate"]]],null,16],["text","                "],["open-element","span",[]],["dynamic-attr","class",["concat",["miniseries-result-wrapper ",["helper",["if"],[["get",["miniseriesGame","animate"]],"animate"],null]]]],["flush-element"],["text","\\n                  "],["open-element","span",[]],["dynamic-attr","class",["concat",["miniseries-result ",["unknown",["miniseriesGame","result"]]," ",["helper",["if"],[["get",["miniseriesGame","animate"]],"animate"],null]]]],["flush-element"],["close-element"],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":["miniseriesGame"]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","postgame-ranked-body-miniseries"],["flush-element"],["text","\\n"],["block",["each"],[["get",["miniseriesData"]]],null,17],["text","          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isInMiniseries"]]],null,18,15]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["dynamic-attr","class",["concat",["postgame-ranked-body-promotion-demotion ",["helper",["if"],[["get",["isPromotedMultipleTimes"]],"multiple-promotions"],null]]]],["flush-element"],["text","\\n            "],["append",["unknown",["promotionStatusString"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","postgame-ranked-body-promoted-number"],["flush-element"],["text","\\n            "],["append",["unknown",["numberOfTimesPromotedString"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","break"],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","afk-penalty-message"],["flush-element"],["text","\\n              "],["append",["unknown",["afkLpPenaltyAppliedText"]],false],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","delta"],["flush-element"],["text","\\n              "],["append",["unknown",["headerString"]],false],["text","\\n            "],["close-element"],["text","\\n          "]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","postgame-ranked-delta-body"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","postgame-ranked-delta-overflow-box"],["flush-element"],["text","\\n                "],["open-element","div",[]],["dynamic-attr","class",["concat",["lp-loss-delta-scroll-area ",["helper",["if"],[["get",["triggeredLpModificationAnimation"]],"active"],null]]]],["flush-element"],["text","\\n                  "],["open-element","span",[]],["flush-element"],["append",["unknown",["consolationHeaderString"]],false],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","lp-loss-delta-scroll-container"],["flush-element"],["text","\\n                    "],["append",["unknown",["headerString"]],false],["text","\\n                    "],["open-element","div",[]],["static-attr","class","lp-loss-delta-scroll new"],["flush-element"],["text","\\n                      "],["append",["unknown",["headerString"]],false],["text","\\n                    "],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","lp-loss-delta-scroll previous"],["flush-element"],["text","\\n                      "],["append",["unknown",["consolationHeaderString"]],false],["text","\\n                    "],["close-element"],["text","\\n                  "],["close-element"],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","break"],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["dynamic-attr","class",["concat",["delta-consolation-msg ",["helper",["if"],[["get",["triggeredLpModificationAnimation"]],"visible"],null]]]],["flush-element"],["text","\\n              "],["append",["unknown",["consolationLpWasAppliedText"]],false],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["consolationLpWasApplied"]]],null,23,22]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","delta is-win"],["flush-element"],["text","\\n              "],["append",["unknown",["headerString"]],false],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","postgame-ranked-progression-contents"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","postgame-ranked-header"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isConsideredVictory"]]],null,25,24],["block",["if"],[["get",["afkLpPenaltyApplied"]]],null,21],["text","        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","postgame-ranked-footer"],["flush-element"],["append",["unknown",["displayedTierDivisionLabel"]],false],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["isBeingPromotedOrDemoted"]]],null,20,19],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","postgame-ranked-progression-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["haveData"]]],null,26],["block",["unless"],[["get",["unloadSpinner"]]],null,10],["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["postgame-ranked-error-contents ",["helper",["if"],[["get",["errorIsVisible"]],"visible"],null]]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","postgame-ranked-error-header"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","postgame-ranked-error-body"],["flush-element"],["text","\\n        - - -\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","postgame-ranked-error-footer"],["flush-element"],["text","\\n        "],["append",["unknown",["errorText"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["errorIsVisible"]]],null,9],["block",["if"],[["get",["consolationLpWasApplied"]]],null,7],["block",["if"],[["get",["afkLpPenaltyApplied"]]],null,5],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["postgame-ranked-lp-divider ",["helper",["if"],[["get",["isTFT"]],"hidden"],null]]]],["flush-element"],["close-element"],["text","\\n    "],["open-element","user-experience-perf-switch",[]],["static-attr","visible-state","delta-lp-modifier-video-switch"],["static-attr","default-visibility","hidden"],["static-attr","class","delta-lp-modifier-video-switch"],["flush-element"],["text","\\n"],["block",["if"],[["get",["afkLpPenaltyApplied"]]],null,3,2],["text","      "],["open-element","span",[]],["static-attr","class","hidden"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["showDemotionProtected"]]],null,1],["block",["if"],[["get",["winStreakString"]]],null,0]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "Wp1v+gL4",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-scoreboard-progression-rated.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-scoreboard-progression-rated.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-scoreboard-progression-rated.js\\" "],["text","\\n"],["block",["if"],[["get",["shouldShow"]]],null,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","rated-rating-total-text"],["flush-element"],["text","---"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","rated-rating-total-text"],["flush-element"],["append",["unknown",["displayedRatedRating"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["rated-rating-delta-text ",["helper",["if"],[["get",["isPositiveRatingDelta"]],"positive-rating-delta"],null]]]],["flush-element"],["append",["unknown",["displayedRatedRatingDelta"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","postgame-rated-progression-container"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-lottie",[]],["static-attr","class","postgame-rated-badge-loading"],["static-attr","image-path","/fe/lol-static-assets/lottie/tft-rated/images/"],["dynamic-attr","src",["unknown",["ratedLoadingPath"]],null],["static-attr","resize-to-fit","true"],["static-attr","loop","true"],["static-attr","autoplay","true"],["flush-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","postgame-rated-progression-tier-badge"],["dynamic-attr","src",["concat",[["unknown",["ratedTierImagePath"]]]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","lol-uikit-lottie",[]],["static-attr","class","postgame-rated-badge-highlight"],["static-attr","image-path","/fe/lol-static-assets/lottie/tft-rated/images/"],["static-attr","src","/fe/lol-static-assets/lottie/tft-rated/Badge_Highlight_EOG.json"],["static-attr","resize-to-fit","true"],["static-attr","loop","true"],["static-attr","autoplay","false"],["flush-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","postgame-rated-progression-footer"],["flush-element"],["text","\\n"],["block",["if"],[["get",["haveData"]]],null,1,0],["text","      "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "Ey4HyLY2",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-secondary-progression.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-secondary-progression.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-secondary-progression.js\\" "],["text","\\n"],["block",["if"],[["get",["haveData"]]],null,7]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","span",[]],["dynamic-attr","class",["concat",["flash ",["helper",["if"],[["get",["doneAnimating"]],"active"],null]]]],["flush-element"],["append",["unknown",["headerLevelUpText"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["component"],[["get",["tooltipComponentName"]]],[["tooltipData"],[["get",["tooltipData"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition"],["left"]],1]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["secondary-progression-center-text ",["unknown",["centerTextLengthClass"]]]]],["flush-element"],["text","\\n        "],["append",["unknown",["centerText"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","secondary-progression-lottie-container"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-lottie",[]],["dynamic-attr","src",["concat",[["unknown",["lottiePath"]]]]],["static-attr","autoplay","false"],["dynamic-attr","param-current-exp",["unknown",["oldPercent"]],null],["dynamic-attr","param-new-exp",["unknown",["newDisplayedPercent"]],null],["dynamic-attr","param-level-up",["concat",[["unknown",["isLevelUp"]]]]],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","secondary-progression-full-meter"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","secondary-progression-full-frame"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","secondary-progression-center-image"],["flush-element"],["text","\\n        "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["centerImage"]]]]],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","secondary-progression-radial"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","secondary-progression-full-frame-background"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["hasCenterImage"]]],null,6],["text","\\n"],["block",["if"],[["get",["isFull"]]],null,5,4],["text","\\n"],["block",["if"],[["get",["hasCenterText"]]],null,3],["text","\\n"],["block",["if"],[["get",["hasTooltip"]]],null,2],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","secondary-progression-details"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","secondary-progression-header"],["flush-element"],["text","\\n      "],["append",["unknown",["displayedHeaderText"]],false],["text","\\n"],["block",["if"],[["get",["hasLevelUpText"]]],null,0],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","secondary-progression-body"],["flush-element"],["text","\\n      +"],["append",["unknown",["currentlyDisplayedValue"]],false],["text"," "],["append",["unknown",["unitText"]],false],["text","\\n        "],["open-element","span",[]],["dynamic-attr","class",["concat",["flash ",["helper",["if"],[["get",["doneAnimating"]],"active"],null]," ",["helper",["if"],[["get",["gainedValue"]],"gained"],null]]]],["flush-element"],["text","+"],["append",["unknown",["numberValue"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "dbtDQiqY",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-party-status.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-party-status.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-party-status.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","postgame-party-status-icons"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showComponent"]]],null,5],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","postgame-party-status-player"],["static-attr","player-status","left"],["dynamic-attr","style",["concat",["order:",["get",["player"]],";"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["player"]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","postgame-party-status-player"],["static-attr","player-status","eog"],["flush-element"],["close-element"],["text","\\n"]],"locals":["player"]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","postgame-party-status-player"],["static-attr","player-status","ready"],["dynamic-attr","style",["concat",["order:",["get",["player"]],";"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["player"]},{"statements":[["text","                    "],["open-element","div",[]],["static-attr","class","postgame-party-status-mouseover-header"],["flush-element"],["text","\\n                        "],["append",["unknown",["tra","postgame_party_status_players_header"]],false],["text"," ("],["append",["unknown",["numPlayersReady"]],false],["text","/"],["append",["unknown",["partySize"]],false],["text",")\\n                    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showMouseOverHeader"]]],null,3],["text","                "],["open-element","div",[]],["static-attr","class","postgame-party-status-mouseover-text"],["flush-element"],["text","\\n                    "],["append",["unknown",["mouseOverText"]],false],["text","\\n                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],4],["text","        "],["open-element","div",[]],["static-attr","class","postgame-party-status-decorator"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","postgame-party-status-ready-players"],["flush-element"],["text","\\n"],["block",["each"],[["get",["playerIconOrder"]]],null,2],["text","        "],["close-element"],["text","\\n"],["block",["each"],[["get",["eogPlayers"]]],null,1],["text","        "],["open-element","div",[]],["static-attr","class","postgame-party-status-left-players"],["flush-element"],["text","\\n"],["block",["each"],[["get",["leftIconOrder"]]],null,0],["text","        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","postgame-party-status-decorator"],["static-attr","position","right"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "NyQ2WRnf",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-scoreboard-player-honor-flair.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-scoreboard-player-honor-flair.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-scoreboard-player-honor-flair.js\\" "],["text","\\n"],["block",["unless"],[["get",["isBot"]]],null,3],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["tooltipText"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","uikit-video",[]],["static-attr","class","honor-postgame-celebration-video"],["dynamic-attr","src",["concat",[["unknown",["teamChoiceMograph"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","img",[]],["dynamic-attr","class",["concat",["honor-postgame-celebration-icon ",["helper",["if"],[["get",["hasCelebrated"]],"visible"],null]]]],["dynamic-attr","src",["concat",[["unknown",["teamChoiceIconPath"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isLowSpec"]]],null,2,1],["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["honor-postgame-celebration-tooltip-container ",["unknown",["hideTooltipClassName"]]]]],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","bottom"]],0],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "rKmPNFy7",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-scoreboard-progression-honor-notification.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-scoreboard-progression-honor-notification.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-scoreboard-progression-honor-notification.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","honor-postgame-notification-header"],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["honor-postgame-notification-header-text ",["unknown",["headerProgressVisibilityClass"]]]]],["flush-element"],["text","\\n    "],["append",["unknown",["headerProgressText"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["honor-postgame-notification-header-text ",["unknown",["headerVisibilityClass"]]]]],["flush-element"],["text","\\n    "],["append",["unknown",["headerText"]],false],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["headerTooltipIsVisible"]]],null,4],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","honor-postgame-notification-contents"],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["honor-postgame-notification-progress-container ",["unknown",["progressVisibilityClass"]]]]],["flush-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","honor-postgame-notification-progress-indicator top"],["dynamic-attr","src",["concat",[["unknown",["progressIndicator"]]]]],["flush-element"],["close-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","honor-postgame-notification-progress-indicator bottom"],["dynamic-attr","src",["concat",[["unknown",["progressIndicator"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","honor-postgame-notification-flair-container"],["flush-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","class",["concat",["honor-postgame-notification-flair-icon ",["unknown",["strangerFlairVisibilityClass"]]]]],["dynamic-attr","src",["concat",[["unknown",["strangerFlairIcon"]]]]],["flush-element"],["close-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","class",["concat",["honor-postgame-notification-flair-icon ",["unknown",["premadeFlairVisibilityClass"]]]]],["dynamic-attr","src",["concat",[["unknown",["premadeFlairIcon"]]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["flairTooltipIsVisible"]]],null,2],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","honor-postgame-notification-emblem-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["displayedHonors"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["postgame-scoreboard-progression-honor-category-icon"],null,[["displayedHonor","honorIndex","hexakillClass","isLowSpec","decrementTransitionLock"],[["get",["displayedHonor"]],["get",["index"]],["get",["hexakillClass"]],["get",["isLowSpec"]],"decrementTransitionLock"]]],false],["text","\\n"]],"locals":["displayedHonor","index"]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["flairTooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","bottom"]],1]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["headerTooltip"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],3]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "UcYMyHR8",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\postgame-scoreboard-progression-honor-category-icon.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\postgame-scoreboard-progression-honor-category-icon.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\postgame-scoreboard-progression-honor-category-icon.js\\" "],["text","\\n"],["open-element","uikit-state-machine",[]],["dynamic-attr","assets-ready",["concat",[["unknown",["assetsReady"]]]]],["dynamic-attr","should-beam",["concat",[["unknown",["shouldBeam"]]]]],["flush-element"],["text","\\n  "],["open-element","uikit-states",[]],["flush-element"],["text","\\n    "],["open-element","uikit-state",[]],["static-attr","name","initial"],["flush-element"],["text","\\n      "],["open-element","uikit-behavior-media",[]],["static-attr","selector","#intro"],["static-attr","preloading",""],["flush-element"],["close-element"],["text","\\n      "],["open-element","uikit-behavior-media",[]],["static-attr","selector","#beam"],["static-attr","preloading",""],["flush-element"],["close-element"],["text","\\n      "],["open-element","uikit-transition",[]],["static-attr","next-state","intro"],["flush-element"],["text","\\n        "],["open-element","uikit-condition-parameter",[]],["static-attr","name","assets-ready"],["static-attr","value","true"],["flush-element"],["close-element"],["text","\\n        "],["open-element","uikit-condition-parameter",[]],["static-attr","name","should-beam"],["static-attr","value","false"],["flush-element"],["close-element"],["text","\\n        "],["open-element","uikit-condition-media",[]],["static-attr","selector","#intro"],["static-attr","can-play",""],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","uikit-transition",[]],["static-attr","next-state","beam"],["flush-element"],["text","\\n        "],["open-element","uikit-condition-delay",[]],["static-attr","duration","50"],["flush-element"],["close-element"],["text","\\n        "],["open-element","uikit-condition-parameter",[]],["static-attr","name","assets-ready"],["static-attr","value","true"],["flush-element"],["close-element"],["text","\\n        "],["open-element","uikit-condition-parameter",[]],["static-attr","name","should-beam"],["static-attr","value","true"],["flush-element"],["close-element"],["text","\\n        "],["open-element","uikit-condition-media",[]],["static-attr","selector","#intro"],["static-attr","can-play",""],["flush-element"],["close-element"],["text","\\n        "],["open-element","uikit-condition-media",[]],["static-attr","selector","#beam"],["static-attr","can-play",""],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","uikit-state",[]],["static-attr","name","intro"],["flush-element"],["text","\\n      "],["open-element","uikit-behavior-media",[]],["static-attr","selector","#intro"],["static-attr","playing",""],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","uikit-state",[]],["static-attr","name","beam"],["flush-element"],["text","\\n      "],["open-element","uikit-behavior-media",[]],["static-attr","selector","#intro"],["static-attr","playing",""],["flush-element"],["close-element"],["text","\\n      "],["open-element","uikit-behavior-media",[]],["static-attr","selector","#beam"],["static-attr","playing",""],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","user-experience-perf-switch",[]],["static-attr","id","beam"],["static-attr","visible-state","beam"],["static-attr","default-visibility","hidden"],["flush-element"],["text","\\n    "],["open-element","uikit-video",[]],["static-attr","class","honor-postgame-category-beam"],["dynamic-attr","src",["concat",[["unknown",["categoryBeamUrl"]]]]],["static-attr","perf-flags","largeAreaAnimationsEnabled"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","user-experience-perf-switch",[]],["static-attr","id","intro"],["static-attr","visible-state","intro,beam"],["static-attr","default-visibility","hidden"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isLowSpec"]]],null,2,1],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","bottom"]],0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["append",["unknown",["categoryIconTooltip"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","uikit-video",[]],["dynamic-attr","class",["concat",["honor-postgame-notification-video ",["unknown",["positionClassName"]]]]],["dynamic-attr","src",["concat",[["unknown",["categoryVideoUrl"]]]]],["static-attr","perf-flags","largeAreaAnimationsEnabled"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","honor-postgame-category-icon-group"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["honor-postgame-category-low-spec-glow ",["unknown",["positionClassName"]]]]],["flush-element"],["close-element"],["text","\\n        "],["open-element","img",[]],["dynamic-attr","class",["concat",["honor-postgame-category-icon ",["unknown",["positionClassName"]]]]],["dynamic-attr","src",["concat",[["unknown",["categoryIconUrl"]]]]],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "5RN+7WMG",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\tft-header.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\tft-header.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\tft-header.js\\" "],["text","\\n"],["append",["helper",["postgame-game-result-icon"],null,[["isVictory","isTop4"],[["get",["isVictory"]],["get",["isTop4"]]]]],false],["text","\\n"],["open-element","div",[]],["static-attr","class","postgame-header-wrapper"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","postgame-outcome"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","postgame-game-result"],["flush-element"],["text","\\n      "],["append",["unknown",["playerRankText"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldShowPlacements"]]],null,0],["text","  "],["open-element","div",[]],["static-attr","class","postgame-game-info"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","postgame-map-info"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","postgame-map-info-item-game-mode"],["flush-element"],["append",["unknown",["tra","tft_header_mode_text"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","postgame-map-info-item-queue-type"],["flush-element"],["append",["unknown",["queueDescription"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","postgame-map-info-item-game-length"],["flush-element"],["append",["unknown",["gameLength"]],false],["close-element"],["text","\\n      "],["append",["helper",["game-id-clipboard-copy"],null,[["gameId"],[["get",["gameId"]]]]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","postgame-game-result-placement-games"],["flush-element"],["append",["unknown",["placementGamesString"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "7/jIt0Vb",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\tft-partner-group-placement.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\tft-partner-group-placement.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\tft-partner-group-placement.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["tft-partner-group-rank tft-partner-group-rank-place-",["unknown",["placement"]]]]],["flush-element"],["append",["unknown",["placementDisplay"]],false],["close-element"],["text","\\n"],["open-element","svg",[]],["static-attr","class","tft-partner-group-banner"],["dynamic-attr","style",["concat",["fill: ",["unknown",["partnerGroupColorCode"]],";"]]],["static-attr","version","1.1"],["static-attr","id","Layer_1"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["static-attr","xmlns:xlink","http://www.w3.org/1999/xlink","http://www.w3.org/2000/xmlns/"],["static-attr","x","0px"],["static-attr","y","0px"],["static-attr","viewBox","0 0 13 98"],["static-attr","style","enable-background:new 0 0 13 98;"],["static-attr","xml:space","preserve","http://www.w3.org/XML/1998/namespace"],["flush-element"],["text","\\n    "],["open-element","linearGradient",[]],["static-attr","id","SVGID_1_"],["static-attr","gradientUnits","userSpaceOnUse"],["static-attr","x1","6.5"],["static-attr","y1","98"],["static-attr","x2","6.5"],["static-attr","y2","18"],["static-attr","gradientTransform","matrix(1 0 0 -1 0 100)"],["flush-element"],["text","\\n        "],["open-element","stop",[]],["static-attr","offset","0.1649"],["static-attr","style","stop-color:#1C32FF"],["flush-element"],["close-element"],["text","\\n        "],["open-element","stop",[]],["static-attr","offset","1"],["static-attr","style","stop-color:#1221A7"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","path",[]],["static-attr","d","M2,6.6c0-0.4,0.2-0.8,0.6-0.9l7-3.1C10.3,2.3,11,2.8,11,3.5v90.9c0,0.7-0.7,1.2-1.4,0.9l-7-3.1\\n        C2.2,92.1,2,91.7,2,91.4V6.6z"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "mG9euEio",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\tft-player.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\styles\\\\components\\\\tft-player.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\tft-player.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","tft-player-left-column"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showPlacementBanner"]]],null,14],["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["tft-player-icon ",["helper",["if"],[["get",["showPlacementBanner"]],"","tft-player-icon-no-banner"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tft-companion-icon-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tft-companion-icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["player","companion","icon"]],");"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ring"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","tft-player-identity"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tft-player-name-section"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","tft-player-name"],["flush-element"],["text","\\n        "],["append",["helper",["player-name"],null,[["format","puuid","summonerName","gameName","tagLine"],["short",["get",["player","puuid"]],["get",["player","summonerName"]],["get",["player","riotIdGameName"]],["get",["player","riotIdTagLine"]]]]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldShowButtons"]]],null,13],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["block",["if"],[["get",["isPlaybookEnabled"]]],null,12],["open-element","div",[]],["static-attr","class","tft-player-piece tft-player-augment"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["augmentContainer","icon"]],");"]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","piece-inner-border"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","tft-player-piece-item-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["augments"]]],null,8],["text","  "],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["top"]],7],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","tft-player-pieces-container fade-right"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","tft-player-pieces"],["flush-element"],["text","\\n"],["block",["each"],[["get",["pieces"]]],null,5],["block",["each"],[["get",["piecePlaceholders"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","tft-player-piece tft-player-piece-placeholder"],["flush-element"],["close-element"],["text","\\n"]],"locals":["placeholder"]},{"statements":[["text","            "],["open-element","p",[]],["static-attr","class","postgame-tft-piece-tooltip-item"],["flush-element"],["append",["unknown",["item","name"]],false],["close-element"],["text","\\n"]],"locals":["item"]},{"statements":[["text","                "],["append",["helper",["if"],[["get",["traitIndex"]]," : "],null],false],["text","\\n                "],["append",["unknown",["trait","name"]],false],["text","\\n"]],"locals":["trait","traitIndex"]},{"statements":[["text","          "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","postgame-tft-piece-tooltip"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","postgame-tft-piece-tooltip-champ"],["flush-element"],["append",["unknown",["piece","name"]],false],["close-element"],["text","\\n            "],["open-element","p",[]],["static-attr","class","postgame-tft-piece-tooltip-traits"],["flush-element"],["text","\\n"],["block",["each"],[["get",["piece","traits"]]],null,2],["text","            "],["close-element"],["text","\\n"],["block",["each"],[["get",["piece","items"]]],null,1],["text","          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","tft-player-piece-item"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["item","icon"]],");"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["item"]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["tft-player-piece piece-level-",["unknown",["piece","level"]]]]],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["piece","icon"]],");"]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","piece-inner-border"],["flush-element"],["close-element"],["text","\\n\\n        "],["open-element","div",[]],["static-attr","class","tft-player-piece-item-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["piece","items"]]],null,4],["text","        "],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["top"]],3],["text","      "],["close-element"],["text","\\n"]],"locals":["piece"]},{"statements":[["text","        "],["open-element","p",[]],["static-attr","class","postgame-tft-piece-tooltip-item"],["flush-element"],["append",["unknown",["augment","name"]],false],["close-element"],["text","\\n"]],"locals":["augment"]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","postgame-tft-piece-tooltip postgame-tft-augment-tooltip"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","postgame-tft-piece-tooltip-champ"],["flush-element"],["append",["unknown",["augmentContainer","name"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["augments"]]],null,6],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","tft-player-piece-item"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["augment","icon"]],");"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["augment"]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","postgame-tft-piece-tooltip postgame-tft-player-tooltip"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","postgame-tft-piece-tooltip-champ"],["flush-element"],["append",["unknown",["playbook","name"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","tft-player-piece tft-player-playbook"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","tft-player-playbook-container"],["dynamic-attr","src",["unknown",["playbook","iconSmall"]],null],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["top"]],9],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["playbook","name"]]],null,10]],"locals":[]},{"statements":[["block",["if"],[["get",["playbook"]]],null,11]],"locals":[]},{"statements":[["text","      "],["append",["helper",["postgame-scoreboard-player-buttons"],null,[["isFriendRequestDisabled","isReportDisabled","sendFriendRequest","showReportDialog","isInviteDisabled","showInviteButton"],[["get",["isFriendRequestDisabled"]],["get",["isReportDisabled"]],"sendFriendRequest","showReportDialog",["get",["isInviteDisabled"]],["get",["showInviteButton"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["tft-player-rank tft-rank-place-",["unknown",["player","rank"]]]]],["flush-element"],["append",["unknown",["player","rank"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "MTm3NU9P",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\tft-tooltip.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\components\\\\tft-tooltip.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["dynamic-attr","id",["concat",["tft-tooltip-",["unknown",["tooltipId"]]]]],["flush-element"],["text","\\n  "],["yield","default"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = n(6),
                l = (a = n(99)) && a.__esModule ? a : {
                    default: a
                };
            n(100);
            const i = s.UIKit.getVignetteCelebrationManager();
            var r = s.Ember.Component.extend({
                classNames: [`${o.PLUGIN_NAME}-reward-celebration`],
                layout: l.default,
                selectedReward: null,
                softSelectionMade: !1,
                didDestroyElement() {
                    null !== this.get("selectedReward") && this.set("selectedReward", null)
                },
                actions: {
                    selectReward(e, t) {
                        t.target.disabled || (null !== this.get("selectedReward") && this.set("selectedReward.isSelected", !1), this.set("selectedReward", e), this.set("selectedReward.isSelected", !0), this.set("softSelectionMade", !0), i.update({
                            id: this.id,
                            data: {
                                nextButtonEnabled: !0
                            }
                        }))
                    }
                }
            });
            t.default = r
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "Miw85R9Q",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\lib\\\\reward-celebration\\\\addon\\\\templates\\\\reward-celebration.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\lib\\\\reward-celebration\\\\addon\\\\styles\\\\reward-celebration.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","rewards-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["rewards"]]],null,2],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","reward-select"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectReward",["get",["reward"]]],null],null],["static-attr","class","reward-select-button"],["dynamic-attr","disabled",["unknown",["reward","isSelected"]],null],["flush-element"],["text","\\n        "],["append",["unknown",["tra","celebration_select_text"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["dimming-filter ",["helper",["if"],[["get",["reward","isSelected"]],"selected"],null]," ",["helper",["if"],[["get",["softSelectionMade"]],"dimmed"],null]]]],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","radial-glow"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward ",["helper",["if"],[["get",["selectable"]],"selectable"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["selectable"]]],null,1],["text","    "],["open-element","img",[]],["static-attr","class","reward-icon"],["dynamic-attr","src",["unknown",["reward","iconUrl"]],null],["flush-element"],["close-element"],["text","\\n    "],["open-element","span",[]],["static-attr","class","reward-description"],["flush-element"],["append",["unknown",["reward","description"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["selectable"]]],null,0],["text","  "],["close-element"],["text","\\n"]],"locals":["reward"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            const {
                RunMixin: s
            } = a.EmberAddons.EmberLifeline;
            var o = a.Ember.Component.extend(s, {
                classNames: ["render-timer-component"],
                didInsertElement: function() {
                    this._super(...arguments);
                    const e = this.get("renderAfterMs");
                    e && (this._renderAfterTimer = this.runTask((() => this.set("isTimeToShow", !0)), e));
                    const t = this.get("renderForMs");
                    t && (this.set("isTimeToShow", !0), this._renderForTimer = this.runTask((() => this.set("isTimeToShow", !1)), t))
                },
                willDestroyElement: function() {
                    this._super(...arguments), this.cancelTask(this._renderAfterTimer), this.cancelTask(this._renderForTimer)
                }
            });
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Component.extend({
                    classNames: ["progression-modal-eternals-token-container"],
                    index: null,
                    isNewMilestone: a.Ember.computed.bool("eternal.isMilestone"),
                    eternalLevel: a.Ember.computed.alias("eternal.level"),
                    isLevelFiveOrGreater: a.Ember.computed("eternalLevel", (function() {
                        return (this.get("eternalLevel") || 0) >= a.SharedChallengesConstants.REKINDLED_MILESTONE_MARKER
                    })),
                    isPersonalBest: a.Ember.computed.and("eternal.isNewBest", "isLevelFiveOrGreater"),
                    headerValue: a.Ember.computed("isLevelFiveOrGreater", "eternalLevel", (function() {
                        const e = this.get("eternalLevel");
                        return this.get("isLevelFiveOrGreater") ? e : `${e}/${a.SharedChallengesConstants.REKINDLED_MILESTONE_MARKER}`
                    }))
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(15);
            const {
                RunMixin: o
            } = a.EmberAddons.EmberLifeline, l = "/lol-summoner/v1/current-summoner", i = "/lol-lobby/v2/party/eog-status", r = "PROGRESSION", c = "SCOREBOARD";
            var m = a.Ember.Component.extend(o, {
                classNames: ["postgame-root-component"],
                classNameBindings: ["willAnimate:animating"],
                parties: a.Ember.inject.service(),
                postgame: a.Ember.inject.service(),
                gameflow: a.Ember.inject.service(),
                eternals: a.Ember.inject.service(),
                gameclientPostgame: a.Ember.inject.service(),
                gameDataService: a.Ember.inject.service("game-data"),
                perks: a.Ember.inject.service(),
                hasScoreboardAnimationPlayed: !1,
                hasCelebratedHonor: !1,
                isContinueButtonClicked: !1,
                eogStats: a.Ember.computed.alias("postgame.eogStatsBlock"),
                isCustomGame: a.Ember.computed.alias("postgame.isCustomGame"),
                shouldShowGameClientStats: a.Ember.computed("gameclientPostgame.lolGameClientStats", "postgame.eogStatsBlock", (function() {
                    return this.get("gameclientPostgame.lolGameClientStats") && !this.get("postgame.eogStatsBlock")
                })),
                gameId: a.Ember.computed("eogStats.gameId", "gameclientPostgame.lolGameClientStats.statsBlock.gameId", (function() {
                    let e = this.get("eogStats.gameId");
                    return e || (e = this.get("gameclientPostgame.lolGameClientStats.gameId")), e
                })),
                gameClientStats: a.Ember.computed("gameclientPostgame", "postgame.localSummoner.puuid", (function() {
                    const e = this.get("postgame.localSummoner.puuid"),
                        t = [],
                        n = this.get("gameclientPostgame.lolGameClientStats");
                    return this.get("gameclientPostgame.lolGameClientStats.statsBlock.players").forEach((function(e) {
                        const n = e.subteamId - 1;
                        t[n] = t[n] || {}, e.stats = e.stats || {}, e.stats.PLAYER_SUBTEAM = e.subteamId, e.stats.PLAYER_SUBTEAM_PLACEMENT = e.subteamStanding, e.stats.TOTAL_DAMAGE_TAKEN = e.damageTaken, e.stats.TOTAL_DAMAGE_DEALT_TO_CHAMPIONS = e.damageDealtToChampions, e.stats.GOLD_EARNED = e.goldEarned, e.stats.CHAMPIONS_KILLED = e.playerKills, e.stats.NUM_DEATHS = e.playerDeaths, e.stats.ASSISTS = e.playerAssists, e.items = e.itemIds, e.level = e.championLevel, e.spell1Id = e.summonerSpell1, e.spell2Id = e.summonerSpell2, e.skinSplashPath = "/lol-game-data/assets/v1/champion-splashes/" + e.championId.toString() + "/" + this.generateChampionDataId(e.championId, e.championSkinId).toString() + ".jpg", e.skinTilePath = "/lol-game-data/assets/v1/champion-tiles/" + e.championId.toString() + "/" + this.generateChampionDataId(e.championId, e.championSkinId).toString() + ".jpg", e.augments = e.augmentPlatformIds || [], t[n].players = t[n].players || [], t[n].players.push(e)
                    }), this), t.forEach((a => a.players.forEach((function(a) {
                        const s = a.subteamId - 1;
                        t[s].stats = t[s].stats || {}, t[s].stats.PLAYER_SUBTEAM = a.subteamId, t[s].stats.PLAYER_SUBTEAM_PLACEMENT = a.subteamStanding, t[s].stats ? t[s].stats = this.sumStatsByKey(t[s].stats, a.stats) : t[s].stats = Object.assign({}, a.stats), e === a.PUUID && (n.localPlayer = a)
                    }), this)), this), t.sort((function(e, t) {
                        return e.stats.PLAYER_SUBTEAM_PLACEMENT - t.stats.PLAYER_SUBTEAM_PLACEMENT
                    })), n.teams = t, n
                })),
                isDetailsTabOpen: !1,
                tabDefinitions: [{
                    name: "progression",
                    value: r
                }, {
                    name: "scoreboard",
                    value: c
                }],
                tabs: a.Ember.computed("selectedTab", (function() {
                    const e = [],
                        t = this.get("selectedTab"),
                        n = this.get("tabDefinitions"),
                        a = this.get("isCustomGame");
                    return n.forEach((n => {
                        a && n.value === r || e.push({
                            name: this.get(`tra.career_postgame_tab_${n.name}_name`),
                            value: n.value,
                            selected: n.value === t
                        })
                    })), e
                })),
                selectedTab: a.Ember.computed("isCustomGame", (function() {
                    return this.get("isCustomGame") ? c : r
                })),
                isProgressionTabSelected: a.Ember.computed.equal("selectedTab", r),
                isScoreboardTabSelected: a.Ember.computed.equal("selectedTab", c),
                forwardButtonText: a.Ember.computed("selectedTab", "postgame.isClash", (function() {
                    const e = this.get("isProgressionTabSelected"),
                        t = this.get("postgame.isClash");
                    return e || t ? this.get("tra.career_postgame_button_continue") : this.get("tra.career_postgame_button_play_again")
                })),
                forwardHoverSound: "/fe/lol-postgame/sfx-nav-button-play-hover.ogg",
                forwardClickSound: "/fe/lol-postgame/sfx-nav-button-play-click.ogg",
                init() {
                    this._super(...arguments), this.binding = a.dataBinding.bindTo(a.socket), this.binding.observe(l, this, this._handleCurrentSummoner), this.binding.observe(i, this, this._handlePartyStatus), this.set("extEmberModel", a.extEmberModel)
                },
                didInsertElement() {
                    this._super(...arguments), this._startCountdown(), a.Telemetry.startTracingEvent(s.TELEMETRY_EVENT_NAMES.TIME_ON_EOG)
                },
                willDestroyElement() {
                    this._super(...arguments), this.cancelTask(this._proceedToScoreboardTimer), a.Telemetry.endTracingEvent(s.TELEMETRY_EVENT_NAMES.TIME_ON_EOG), this._observedUpdateChallengesPath && this.binding.unobserve(this._observedUpdateChallengesPath, this), this.binding.unobserve(l, this), this.binding.unobserve(i, this)
                },
                sumStatsByKey: function(e, t) {
                    return Object.keys(t).forEach((function(n) {
                        n.includes("PLAYER_SUBTEAM") || (e[n] = e[n] || 0, e[n] = e[n] + t[n])
                    })), e
                },
                generateChampionDataId: function(e, t) {
                    return 1e3 * e + t
                },
                gameIdObserver: a.Ember.on("init", a.Ember.observer("eogStats.gameId", (function() {
                    const e = this.get("eogStats.gameId");
                    e && (this._observedUpdateChallengesPath && (this.binding.unobserve(this._observedUpdateChallengesPath, this), this._observedUpdateChallengesPath = null), this._observedUpdateChallengesPath = `/lol-challenges/v1/my-updated-challenges/${e}`, this.binding.observe(this._observedUpdateChallengesPath, this, this._handleUpdatedChallenges))
                }))),
                _handleUpdatedChallenges(e) {
                    this.set("updatedChallenges", e)
                },
                _handlePartyStatus(e) {
                    this.set("partyStatus", e)
                },
                _handleCurrentSummoner(e) {
                    const t = e.profileIconId || 0;
                    this.get("gameDataService").getSummonerIcon(t).then((e => {
                        const {
                            iconPath: t
                        } = e;
                        this.set("summonerIconPath", t)
                    }))
                },
                hasIntroAnimationPlayed: !1,
                animationsEnabled: a.Ember.computed("postgame.largeAreaAnimationsEnabled", "postgame.disableEogAnimations", (function() {
                    return this.get("postgame.largeAreaAnimationsEnabled") && !this.get("postgame.disableEogAnimations")
                })),
                willAnimate: a.Ember.computed("hasIntroAnimationPlayed", "animationsEnabled", (function() {
                    return !this.get("hasIntroAnimationPlayed") && this.get("animationsEnabled")
                })),
                animationObserver: a.Ember.on("didInsertElement", a.Ember.observer("animationsEnabled", "isProgressionTabSelected", (function() {
                    this.get("animationsEnabled") ? this.get("isProgressionTabSelected") && (this.get("hasIntroAnimationPlayed") || a.Ember.run.scheduleOnce("afterRender", this, this._playIntroAnimation)) : this.set("hasIntroAnimationPlayed", !1)
                }))),
                _playIntroAnimation() {
                    const e = new a.gsap.TimelineMax({
                        paused: !0
                    });
                    e.add((() => {
                        this.set("isAnimating", !0)
                    }), "start+=0.5"), e.add((() => {
                        this.set("hasIntroAnimationPlayed", !0)
                    }), "start+=4.0"), e.add((() => {
                        this.set("isAnimating", !1)
                    }), "start+=4.3"), e.play()
                },
                _playOutlineAnimation() {
                    const e = this.element.querySelector("#lottie-outline-anim");
                    e && e.animation && (e.animation.stop(), e.animation.play())
                },
                _selectTab(e) {
                    this.set("selectedTab", e)
                },
                timer: null,
                hasTimer: a.Ember.computed("timer", (function() {
                    return null !== this.get("timer")
                })),
                _startCountdown() {
                    this._proceedToScoreboardTimer && this.cancelTask(this._proceedToScoreboardTimer), this.get("isCustomGame") || (this._proceedToScoreboardTimer = this.runTask((() => {
                        this._selectTab(c), this._stopCountdown()
                    }), 12e4), this.set("timer", !0), this._animateCountdownMeter(119.75))
                },
                _stopCountdown() {
                    this._proceedToScoreboardTimer && this.cancelTask(this._proceedToScoreboardTimer), this.set("timer", null)
                },
                _animateCountdownMeter(e) {
                    const t = this.element.querySelector(".career-postgame-countdown-meter");
                    let n = this.get("timeAnimationTween");
                    n ? n.play(0) : (n = a.gsap.TweenLite.to(t, e, {
                        css: {
                            scaleX: 0
                        },
                        ease: "Linear.easeNone"
                    }), this.set("timeAnimationTween", n))
                },
                showAddPerksPageButton: a.Ember.computed("perks.isCurrentPageTemporary", "perks.isCustomPageCreationUnlocked", "hasAddedTempPage", (function() {
                    const e = this.get("perks.isCurrentPageTemporary"),
                        t = this.get("perks.isCustomPageCreationUnlocked"),
                        n = this.get("hasAddedTempPage");
                    return t && (e || n)
                })),
                isTempPageNotAdded: a.Ember.computed.not("hasAddedTempPage"),
                addPerksPageButtonEnabled: a.Ember.computed.and("perks.canAddCustomPage", "isTempPageNotAdded"),
                addRunePageButtonDisabledText: a.Ember.computed("perks.canAddCustomPage", "hasAddedTempPage", (function() {
                    return this.get("hasAddedTempPage") ? this.get("tra.perks_add_rune_page_button_disabled_already_added") : this.get("tra.perks_add_rune_page_button_disabled_max_pages")
                })),
                hasPlayAgainOverride: a.Ember.computed("extEmberModel.playAgainOverride", "eogStats.gameId", (function() {
                    const e = this.get("extEmberModel.playAgainOverride"),
                        t = this.get("eogStats.gameId");
                    return !!t && e && e.gameflowGameId && e.navigationCallback && e.gameflowGameId === t
                })),
                _playAgain() {
                    if (this.get("hasPlayAgainOverride")) {
                        return this.get("extEmberModel.playAgainOverride").navigationCallback(), Promise.resolve()
                    }
                    return this.get("parties").playAgain()
                },
                _leavePostgame() {
                    (0, a.dataBinding)("/lol-end-of-game", a.socket).post("/v1/state/dismiss-stats")
                },
                actions: {
                    exitPostgame() {
                        this._leavePostgame()
                    },
                    onButtonClick() {
                        this.get("isProgressionTabSelected") ? (this.set("isContinueButtonClicked", !0), this._selectTab(c), this._stopCountdown()) : this._playAgain().catch((() => {
                            this._leavePostgame()
                        }))
                    },
                    handleTabSelected(e) {
                        e && e.value && (this.get("selectedTab") !== e.value && this._selectTab(e.value), e.value === c && this._stopCountdown())
                    },
                    displayAdvancedDetails: function() {
                        const e = () => this.set("isDetailsTabOpen", !1);
                        (0, a.getProvider)().getOptional("rcp-fe-lol-match-history").then((t => {
                            t.displayMatchDetails({
                                sections: ["stats", "graph", "runes"],
                                defaultSection: "stats",
                                dataSource: "eogStats",
                                hideHeader: !0,
                                closeModalCallback: e
                            })
                        }), (e => a.logger.error("Provider getOptional failure", e))), this.set("isDetailsTabOpen", !0), this.get("postgame").trigger("advancedDetailsDisplayed")
                    },
                    playOutlineAnimation() {
                        this._playOutlineAnimation()
                    },
                    updateScoreboardAnimation(e) {
                        this.set("hasScoreboardAnimationPlayed", e)
                    },
                    updateHonorCelebrationAnimation(e) {
                        this.set("hasCelebratedHonor", e)
                    },
                    addPerksPage: function() {
                        return this.get("perks").createPerksPage().then((() => {
                            this.set("hasAddedTempPage", !0)
                        }))
                    }
                }
            });
            t.default = m
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1).Ember.Component.extend({
                classNames: ["career-postgame-sub-navigation-component"],
                tabs: [],
                actions: {
                    selectTab(e) {
                        const t = this.get("onSelect");
                        if (t) {
                            const n = this.get("tabs");
                            n && e >= 0 && e < n.length && t(n[e])
                        }
                    }
                }
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            var a = n(1),
                s = n(106);
            n(107);
            const o = "sfx-ui",
                l = a.Ember.Component.extend({
                    classNames: ["clash-generic-button"],
                    classNameBindings: ["matchHeight:match-h", "matchWidth:match-w", "isImgFlippedX:flip-x", "isImgFlippedY:flip-y"],
                    layout: n(108),
                    canBeSelected: !1,
                    triggerSelected: !1,
                    selectionGroup: null,
                    isEnabled: !0,
                    text: null,
                    baseBgPath: null,
                    upBgPath: null,
                    overBgPath: null,
                    downBgPath: null,
                    disabledBgPath: null,
                    baseImgPath: null,
                    upImgPath: null,
                    overImgPath: null,
                    downImgPath: null,
                    disabledImgPath: null,
                    noDisabledBg: !1,
                    isImgFlippedX: !1,
                    isImgFlippedY: !1,
                    useCustomContent: !1,
                    iconSizeModifier: 1,
                    matchHeight: !0,
                    matchWidth: !0,
                    tooltipText: null,
                    tooltipPosition: "bottom",
                    tooltipType: "system",
                    disabledTooltipText: null,
                    disabledTooltipPosition: "bottom",
                    disabledTooltipType: "system",
                    onHoverSound: null,
                    onClickSound: null,
                    onClickReleaseSound: null,
                    currentState: null,
                    isClickTarget: !1,
                    isSelected: !1,
                    onInit: a.Ember.on("init", (function() {
                        this._changeState(s.ButtonState.UP)
                    })),
                    upBgPathInternal: a.Ember.computed.or("upBgPath", "baseBgPath"),
                    overBgPathInternal: a.Ember.computed.or("overBgPath", "baseBgPath"),
                    downBgPathInternal: a.Ember.computed.or("downBgPath", "baseBgPath"),
                    disabledBgPathInternal: a.Ember.computed("disabledBgPath", "baseBgPath", "noDisabledBg", (function() {
                        return this.get("noDisabledBg") ? "" : this.get("disabledBgPath") || this.get("baseBgPath")
                    })),
                    upImgPathInternal: a.Ember.computed.or("upImgPath", "baseImgPath"),
                    overImgPathInternal: a.Ember.computed.or("overImgPath", "baseImgPath"),
                    downImgPathInternal: a.Ember.computed.or("downImgPath", "baseImgPath"),
                    disabledImgPathInternal: a.Ember.computed.or("disabledImgPath", "baseImgPath"),
                    customContentUp: {
                        isUp: !0,
                        isAny: !0
                    },
                    customContentOver: {
                        isOver: !0,
                        isAny: !0
                    },
                    customContentDown: {
                        isDown: !0,
                        isAny: !0
                    },
                    customContentDisabled: {
                        isDisabled: !0,
                        isAny: !0
                    },
                    iconSizeModifierStyle: a.Ember.computed("iconSizeModifier", (function() {
                        const e = this.get("iconSizeModifier");
                        if (1 === e) return null;
                        const t = 100 * Math.max(e, 0),
                            n = this.get("matchHeight");
                        let a = "";
                        return this.get("matchWidth") && (a += `width: ${t}%;`), n && (a += `height: ${t}%`), a
                    })),
                    triggerSelectedObserver: a.Ember.computed("triggerSelected", (function() {
                        this.get("triggerSelected") && (this._setSelected(!0), a.Ember.run.next((() => {
                            this.set("triggerSelected", !1)
                        })))
                    })),
                    isEnabledObserver: a.Ember.computed("isEnabled", (function() {
                        const e = this.get("currentState") !== s.ButtonState.DISABLED,
                            t = this.get("isEnabled");
                        e && !t ? this._changeState(s.ButtonState.DISABLED) : !e && t && this._changeState(s.ButtonState.UP)
                    })),
                    _changeState(e) {
                        const t = this.get("currentState"),
                            n = this.get("isClickTarget");
                        e === s.ButtonState.OVER && (this.get("onHoverSound") && a.Audio.getChannel(o).playSound(this.get("onHoverSound")), n && (e = s.ButtonState.DOWN)), this.set("isState_" + t, !1), this.set("isState_" + e, !0), this.set("currentState", e)
                    },
                    _processClick() {
                        this.attrs.onClick && this.attrs.onClick();
                        const e = this.get("selectionGroup"),
                            t = this.get("isSelected");
                        e && t || this._setSelected(!t)
                    },
                    _setSelected(e) {
                        if (!this.get("canBeSelected")) return;
                        const t = this.get("isSelected");
                        if (t !== e) {
                            if (e) {
                                const e = this.get("selectionGroup");
                                l.setSelection(e, this)
                            }
                            t && this.attrs.onDeselected ? this.attrs.onDeselected() : e && this.attrs.onSelected && this.attrs.onSelected(), this.set("isSelected", e)
                        }
                    },
                    actions: {
                        changeState(e) {
                            this.get("currentState") !== s.ButtonState.DISABLED && this._changeState(e)
                        },
                        beginClick() {
                            if (this.get("currentState") === s.ButtonState.DISABLED) return;
                            this.get("onClickSound") && a.Audio.getChannel(o).playSound(this.get("onClickSound")), this._changeState(s.ButtonState.DOWN), this.set("isClickTarget", !0);
                            const e = () => {
                                this.set("isClickTarget", !1), document.removeEventListener("mouseup", e)
                            };
                            document.addEventListener("mouseup", e)
                        },
                        endClick() {
                            if (this.get("currentState") === s.ButtonState.DISABLED) return;
                            this.get("isClickTarget") && (this.get("onClickReleaseSound") && a.Audio.getChannel(o).playSound(this.get("onClickReleaseSound")), this._processClick(), this.set("isClickTarget", !1), this._changeState(s.ButtonState.OVER))
                        },
                        onHover() {
                            this.get("currentState") !== s.ButtonState.DISABLED && (this._changeState(s.ButtonState.OVER), this.attrs.onHover && this.attrs.onHover())
                        },
                        onHoverLeave() {
                            this.get("currentState") !== s.ButtonState.DISABLED && (this._changeState(s.ButtonState.UP), this.attrs.onHoverLeave && this.attrs.onHoverLeave())
                        }
                    }
                });
            l.reopenClass({
                currentSelectionMap: {},
                setSelection(e, t) {
                    if (!e || !t || !t.get("canBeSelected")) return;
                    const n = l.currentSelectionMap[e];
                    n && n._setSelected(!1), l.currentSelectionMap[e] = t
                }
            }), e.exports = l
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.ButtonState = void 0;
            const n = Object.freeze({
                UP: "up",
                OVER: "over",
                DOWN: "down",
                DISABLED: "disabled"
            });
            t.ButtonState = n
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "2be/ZX3E",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\lib\\\\generic-button\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\lib\\\\generic-button\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\lib\\\\generic-button\\\\index.js\\" "],["text","\\n"],["append",["unknown",["isEnabledObserver"]],false],["text","\\n"],["append",["unknown",["triggerSelectedObserver"]],false],["text","\\n"],["open-element","div",[]],["static-attr","class","clash-generic-button-root"],["modifier",["action"],[["get",[null]],"onHoverLeave"],[["on"],["mouseLeave"]]],["modifier",["action"],[["get",[null]],"onHover"],[["on"],["mouseEnter"]]],["modifier",["action"],[["get",[null]],"beginClick"],[["on"],["mouseDown"]]],["modifier",["action"],[["get",[null]],"endClick"],[["on"],["mouseUp"]]],["flush-element"],["text","\\n\\n"],["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["clash-generic-button-state up ",["helper",["if"],[["get",["isSelected"]],"selected"],null]," ",["helper",["if"],[["get",["isState_up"]],"active"],null]]]],["dynamic-attr","style",["unknown",["upStyle"]],null],["flush-element"],["text","\\n    "],["block",["if"],[["get",["upBgPathInternal"]]],null,27],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["clash-generic-button-primary-img-container ",["helper",["if"],[["get",["upBgPathInternal"]],"has-bg"],null]]]],["flush-element"],["text","\\n      "],["block",["if"],[["get",["upImgPathInternal"]]],null,26],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["text"]]],null,25,24],["text","    "],["block",["if"],[["get",["useCustomContent"]]],null,22],["text","\\n  "],["close-element"],["text","\\n\\n"],["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["clash-generic-button-state over ",["helper",["if"],[["get",["isSelected"]],"selected"],null]," ",["helper",["if"],[["get",["isState_over"]],"active"],null]]]],["dynamic-attr","style",["unknown",["overStyle"]],null],["flush-element"],["text","\\n    "],["block",["if"],[["get",["overBgPathInternal"]]],null,21],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["clash-generic-button-primary-img-container ",["helper",["if"],[["get",["overBgPathInternal"]],"has-bg"],null]]]],["flush-element"],["text","\\n      "],["block",["if"],[["get",["overImgPathInternal"]]],null,20],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["text"]]],null,19,18],["text","    "],["block",["if"],[["get",["useCustomContent"]]],null,16],["text","\\n"],["block",["if"],[["get",["tooltipText"]]],null,15],["text","  "],["close-element"],["text","\\n\\n"],["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["clash-generic-button-state down ",["helper",["if"],[["get",["isSelected"]],"selected"],null]," ",["helper",["if"],[["get",["isState_down"]],"active"],null]]]],["dynamic-attr","style",["unknown",["downStyle"]],null],["flush-element"],["text","\\n    "],["block",["if"],[["get",["downBgPathInternal"]]],null,13],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["clash-generic-button-primary-img-container ",["helper",["if"],[["get",["downBgPathInternal"]],"has-bg"],null]]]],["flush-element"],["text","\\n      "],["block",["if"],[["get",["downImgPathInternal"]]],null,12],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["text"]]],null,11,10],["text","    "],["block",["if"],[["get",["useCustomContent"]]],null,8],["text","\\n  "],["close-element"],["text","\\n\\n"],["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["clash-generic-button-state disabled ",["helper",["if"],[["get",["isSelected"]],"selected"],null]," ",["helper",["if"],[["get",["isState_disabled"]],"active"],null]]]],["dynamic-attr","style",["unknown",["disabledStyle"]],null],["flush-element"],["text","\\n    "],["block",["if"],[["get",["disabledBgPathInternal"]]],null,7],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["clash-generic-button-primary-img-container ",["helper",["if"],[["get",["disabledBgPathInternal"]],"has-bg"],null]]]],["flush-element"],["text","\\n      "],["block",["if"],[["get",["disabledImgPathInternal"]]],null,6],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["text"]]],null,5,4],["text","    "],["block",["if"],[["get",["useCustomContent"]]],null,2],["text","\\n"],["block",["if"],[["get",["disabledTooltipText"]]],null,1],["text","  "],["close-element"],["text","\\n\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":["default"],"blocks":[{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["disabledTooltipText"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","type"],[["get",["disabledTooltipPosition"]],["get",["disabledTooltipType"]]]],0]],"locals":[]},{"statements":[["open-element","div",[]],["static-attr","class","clash-generic-button-custom-content"],["flush-element"],["yield","default",[["get",["customContentDisabled"]]]],["close-element"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","clash-generic-button-text"],["flush-element"],["append",["unknown",["disabledText"]],false],["close-element"],["text","\\n    "]],"locals":[]},{"statements":[["block",["if"],[["get",["disabledText"]]],null,3]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","clash-generic-button-text"],["flush-element"],["append",["unknown",["text"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["disabledImgPathInternal"]]]]],["dynamic-attr","style",["unknown",["iconSizeModifierStyle"]],null],["flush-element"],["close-element"]],"locals":[]},{"statements":[["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["disabledBgPathInternal"]]]]],["flush-element"],["close-element"]],"locals":[]},{"statements":[["open-element","div",[]],["static-attr","class","clash-generic-button-custom-content"],["flush-element"],["yield","default",[["get",["customContentDown"]]]],["close-element"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","clash-generic-button-text"],["flush-element"],["append",["unknown",["downText"]],false],["close-element"],["text","\\n    "]],"locals":[]},{"statements":[["block",["if"],[["get",["downText"]]],null,9]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","clash-generic-button-text"],["flush-element"],["append",["unknown",["text"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["downImgPathInternal"]]]]],["dynamic-attr","style",["unknown",["iconSizeModifierStyle"]],null],["flush-element"],["close-element"]],"locals":[]},{"statements":[["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["downBgPathInternal"]]]]],["flush-element"],["close-element"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tooltipText"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","type"],[["get",["tooltipPosition"]],["get",["tooltipType"]]]],14]],"locals":[]},{"statements":[["open-element","div",[]],["static-attr","class","clash-generic-button-custom-content"],["flush-element"],["yield","default",[["get",["customContentOver"]]]],["close-element"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","clash-generic-button-text"],["flush-element"],["append",["unknown",["overText"]],false],["close-element"],["text","\\n    "]],"locals":[]},{"statements":[["block",["if"],[["get",["overText"]]],null,17]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","clash-generic-button-text"],["flush-element"],["append",["unknown",["text"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["overImgPathInternal"]]]]],["dynamic-attr","style",["unknown",["iconSizeModifierStyle"]],null],["flush-element"],["close-element"]],"locals":[]},{"statements":[["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["overBgPathInternal"]]]]],["flush-element"],["close-element"]],"locals":[]},{"statements":[["open-element","div",[]],["static-attr","class","clash-generic-button-custom-content"],["flush-element"],["yield","default",[["get",["customContentUp"]]]],["close-element"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","clash-generic-button-text"],["flush-element"],["append",["unknown",["upText"]],false],["close-element"],["text","\\n    "]],"locals":[]},{"statements":[["block",["if"],[["get",["upText"]]],null,23]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","clash-generic-button-text"],["flush-element"],["append",["unknown",["text"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["upImgPathInternal"]]]]],["dynamic-attr","style",["unknown",["iconSizeModifierStyle"]],null],["flush-element"],["close-element"]],"locals":[]},{"statements":[["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["upBgPathInternal"]]]]],["flush-element"],["close-element"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1),
                s = n(106),
                o = n(6);
            const {
                RunMixin: l
            } = a.EmberAddons.EmberLifeline, i = "sfx-ui";
            e.exports = a.Ember.Component.extend(l, {
                classNames: ["postgame-button-wrapper"],
                _oldPlayersReady: 0,
                currentState: s.ButtonState.UP,
                onHoverSound: null,
                onClickSound: null,
                hasIntroAnimationPlayed: !1,
                baseImgPath: null,
                overImgPath: null,
                downImgPath: null,
                partyStatus: null,
                buttonText: "",
                readyPlayers: a.Ember.computed.alias("partyStatus.readyPlayers"),
                partySize: a.Ember.computed.alias("partyStatus.partySize"),
                numPlayersReady: a.Ember.computed.alias("readyPlayers.length"),
                videoSourceState: o.PLAYFLOW_VIDEO_SOURCE_STATE.intro,
                videoSource: {
                    intro: o.PLAYFLOW_VIDEO_SOURCE_PATH.intro,
                    active: o.PLAYFLOW_VIDEO_SOURCE_PATH.active,
                    idle: o.PLAYFLOW_VIDEO_SOURCE_PATH.idle,
                    hover: o.PLAYFLOW_VIDEO_SOURCE_PATH.hover,
                    pulse: o.PLAYFLOW_VIDEO_SOURCE_PATH.pulse,
                    allReturned: o.PLAYFLOW_VIDEO_SOURCE_PATH.allReturned
                },
                currentImgPath: a.Ember.computed("currentState", (function() {
                    switch (this.get("currentState")) {
                        case s.ButtonState.UP:
                            return this.get("baseImgPath");
                        case s.ButtonState.DOWN:
                            return this.get("downImgPath");
                        case s.ButtonState.OVER:
                            return this.get("overImgPath");
                        default:
                            return this.get("baseImgPath")
                    }
                })),
                didInsertElement() {
                    this._super(...arguments), this._updateVideoStateMachine(o.PLAYFLOW_VIDEO_SOURCE_STATE.idle, o.PLAY_BUTTON_STATE_MACHINE_SELECTOR)
                },
                didUpdateAttrs() {
                    this._super(...arguments);
                    const e = this.get("_oldPlayersReady"),
                        t = this.get("hasIntroAnimationPlayed"),
                        n = this.get("numPlayersReady"),
                        s = this.get("partySize"),
                        l = 1 === s;
                    if (t && this._updateVideoStateMachine(o.PLAYFLOW_VIDEO_SOURCE_STATE.intro, o.PLAY_BUTTON_STATE_MACHINE_SELECTOR), this._updateVideoStateMachine(o.PLAYFLOW_VIDEO_SOURCE_STATE.idle, o.PLAY_BUTTON_STATE_MACHINE_SELECTOR), e < n) {
                        if (!this.get("readyPlayers") || l) return;
                        n >= 1 && n < s && n > e && (s >= 2 && n === s - 1 ? this._updateVideoStateMachine(o.PLAYFLOW_VIDEO_SOURCE_STATE.allReturned, o.PARTY_STATUS_STATE_MACHINE_SELECTOR) : this._updateVideoStateMachine(o.PLAYFLOW_VIDEO_SOURCE_STATE.pulse, o.PARTY_STATUS_STATE_MACHINE_SELECTOR), a.Audio.getChannel(i).playSound("/fe/lol-static-assets/sounds/sfx-eog-lobby-player-returned.ogg")), this.set("_oldPlayersReady", n)
                    }
                },
                _updatePlayButtonState(e) {
                    this.set("currentState", e)
                },
                _updateVideoStateMachine(e, t) {
                    const n = this.element.querySelector(t);
                    n && n.isAttached && n.dispatchEvent(new Event(e))
                },
                mouseUp(e) {
                    e.preventDefault();
                    const t = this.get("onClickReleaseSound");
                    t && a.Audio.getChannel(i).playSound(t), this._updatePlayButtonState(s.ButtonState.OVER), this._updateVideoStateMachine(o.PLAYFLOW_VIDEO_SOURCE_STATE.idle, o.PLAY_BUTTON_STATE_MACHINE_SELECTOR), this.sendAction("onClick")
                },
                mouseDown(e) {
                    e.preventDefault();
                    const t = this.get("onClickSound");
                    t && a.Audio.getChannel(i).playSound(t), this._updatePlayButtonState(s.ButtonState.DOWN), this._updateVideoStateMachine(o.PLAYFLOW_VIDEO_SOURCE_STATE.active, o.PLAY_BUTTON_STATE_MACHINE_SELECTOR)
                },
                mouseEnter() {
                    const e = this.get("onHoverSound");
                    e && a.Audio.getChannel(i).playSound(e), this._updatePlayButtonState(s.ButtonState.OVER), this._updateVideoStateMachine(o.PLAYFLOW_VIDEO_SOURCE_STATE.hover, o.PLAY_BUTTON_STATE_MACHINE_SELECTOR)
                },
                mouseLeave() {
                    this._updatePlayButtonState(s.ButtonState.UP), this._updateVideoStateMachine(o.PLAYFLOW_VIDEO_SOURCE_STATE.idle, o.PLAY_BUTTON_STATE_MACHINE_SELECTOR)
                }
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = n(111),
                l = n(15),
                i = n(112),
                r = n(3),
                c = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            const m = "/lol-ranked/v1/current-lp-change-notification";
            var p = s.Ember.Component.extend(c.default, {
                classNames: ["career-postgame-progression-component"],
                renderEventName: l.TELEMETRY_EVENT_NAMES.RENDER_PROGRESSION_SCREEN,
                shouldSendTelemetry: !1,
                showProgressionModal: !1,
                showProgressedEternalsData: !1,
                showProgressedChallengeData: !1,
                eternals: s.Ember.inject.service(),
                endOfGameService: s.Ember.inject.service("end-of-game"),
                isRanked: s.Ember.computed.alias("eogStats.ranked"),
                isCherry: s.Ember.computed("eogStats.queueType", (function() {
                    const e = this.get("eogStats.queueType");
                    return "CHERRY" === e || "CHERRY_UNRANKED" === e
                })),
                championMasteryUpdates: s.Ember.computed.readOnly("endOfGameService.championMasteryUpdates"),
                willAnimate: !1,
                didAnimate: !1,
                isAnimating: !1,
                init() {
                    this._super(...arguments), this.boundKeydown = this._handleKeyDown.bind(this), this.binding = s.dataBinding.bindTo(s.socket), this.binding.observe(m, this, this.handleLeaguesNotification), s.Telemetry.invokeWithLowProbability((() => {
                        this.set("shouldSendTelemetry", !0), s.Telemetry.startTracingEvent(this.renderEventName)
                    })), s.Telemetry.startTracingEvent(l.TELEMETRY_EVENT_NAMES.TIME_ON_PROGRESSION_SCREEN)
                },
                didUpdateAttrs() {
                    this._super(...arguments), !this.get("willAnimate") || this.get("didAnimate") || this.get("isAnimating") || s.Ember.run.scheduleOnce("afterRender", this, this._playIntroAnimation)
                },
                didInsertElement() {
                    this._super(...arguments), document.addEventListener("keydown", this.boundKeydown)
                },
                willDestroyElement() {
                    this._super(...arguments), document.removeEventListener("keydown", this.boundKeydown), this.binding.unobserve(m, this), s.Telemetry.endTracingEvent(l.TELEMETRY_EVENT_NAMES.TIME_ON_PROGRESSION_SCREEN);
                    const e = this.get("animationTimeline");
                    e && e.kill()
                },
                _playIntroAnimation() {
                    const e = this.element.querySelector(".progression-screen-header"),
                        t = this.element.querySelector(".postgame-champion-background");
                    s.gsapCustomEase.create("backgroundCB", "0.32,-0.94,0.6,1");
                    const n = new s.gsap.TimelineMax({
                        paused: !0,
                        onComplete: () => {
                            this.set("didAnimate", !0), this.set("isAnimating", !1)
                        }
                    });
                    t && n.fromTo(t, 1, {
                        css: {
                            scaleX: .95,
                            scaleY: .95,
                            opacity: 0
                        }
                    }, {
                        css: {
                            scaleX: 1,
                            scaleY: 1,
                            opacity: 1
                        },
                        ease: "backgroundCB"
                    }, "start"), e && n.fromTo(e, .33, {
                        opacity: 0
                    }, {
                        opacity: 1
                    }, "start+=0.2"), this.set("animationTimeline", n), n.play(), this.set("isAnimating", !0)
                },
                handleLeaguesNotification(e) {
                    this.set("leaguesNotification", e)
                },
                shouldShowMasteryProgression: s.Ember.computed("eogStats", "championMasteryUpdates.level", (function() {
                    return this.get("eogStats") && this.get("championMasteryUpdates.level")
                })),
                shouldShowPrestigeProgression: s.Ember.computed("shouldHidePrestigeProgression", "eogStats", (function() {
                    return !this.get("shouldHidePrestigeProgression") && this.get("eogStats")
                })),
                shouldShowRankedRewardProgression: s.Ember.computed("leaguesNotification", "leaguesNotification.rewardEarnedId", "leaguesNotification.splitPointsNotification.nextRewardId", "isCherry", (function() {
                    if (this.get("isCherry")) return !1;
                    const e = this.get("leaguesNotification"),
                        t = this.get("leaguesNotification.rewardEarnedId"),
                        n = this.get("leaguesNotification.splitPointsNotification.nextRewardId");
                    return e && (t || n)
                })),
                isPrestigeProgressionLarge: s.Ember.computed("eogStats.ranked", "isCherry", (function() {
                    return this.get("isCherry") || !this.get("eogStats.ranked")
                })),
                playerTeam: s.Ember.computed("eogStats.teams.@each.isPlayerTeam", (function() {
                    return (this.get("eogStats.teams") || []).find((e => e.isPlayerTeam))
                })),
                isLossPrevented: s.Ember.computed("eogStats.invalid", "isWin", (function() {
                    return this.get("eogStats.invalid") && !this.get("isWin")
                })),
                isWin: s.Ember.computed("playerTeam.isWinningTeam", "isCherryWin", "isCherry", (function() {
                    return this.get("isCherry") ? this.get("isCherryWin") : this.get("playerTeam.isWinningTeam")
                })),
                isCherryWin: s.Ember.computed("eogStats.localPlayer.subteamStanding", "eogStats.teams", (function() {
                    const e = this.get("eogStats.localPlayer.subteamStanding") || 1,
                        t = this.get("eogStats.teams");
                    return e <= (t ? t.length : r.DEFAULT_CHERRY_TEAM_SIZE) / 2
                })),
                showcasedEoGUpdateSlots: s.Ember.computed("eternals.selfProgression.[]", "updatedChallenges", (function() {
                    const e = this.get("eternals.selfProgression") || [],
                        t = this.get("updatedChallenges") || {},
                        n = Object.values(t).filter((e => !e.isCapstone));
                    return (0, o.calculateEoGChallengeSlots)(n, [...e], 5)
                })),
                allChallengeUpdates: s.Ember.computed("updatedChallenges", (function() {
                    const e = this.get("updatedChallenges") || {};
                    return Object.values(e).filter((e => !e.isCapstone)).sort(o.sortChallengeUpdatesDesc)
                })),
                allEternalsUpdates: s.Ember.computed("eternals.selfProgression.[]", (function() {
                    const e = (this.get("eternals.selfProgression") || []).sort(o.sortEternalUpdatesDesc);
                    return s.logger.always(`EoG Eternals updates length: ${e.length}`), e
                })),
                groupedChallenges: s.Ember.computed("updatedChallenges", (function() {
                    const e = this.get("updatedChallenges") || {},
                        t = Object.values(e).filter((e => !e.isCapstone)).sort(o.sortGroupedChallengeUpdates),
                        n = (0, i.groupChallengesByProgression)(t),
                        a = new Map([...n].sort().reverse());
                    return this._flattenGroups(a)
                })),
                groupedEternals: s.Ember.computed("eternals.selfProgression.[]", (function() {
                    const e = (this.get("eternals.selfProgression") || []).sort(o.sortEternalUpdatesDesc),
                        t = (0, i.groupEternalsByMilestone)(e);
                    return this._flattenGroups(t)
                })),
                eternalsMap: s.Ember.computed("eternals.selfProgression.[]", (function() {
                    const e = (this.get("eternals.selfProgression") || []).sort(o.sortEternalUpdatesDesc);
                    return (0, i.groupEternalsByMilestone)(e)
                })),
                challengesMap: s.Ember.computed("updatedChallenges", (function() {
                    const e = this.get("updatedChallenges") || {},
                        t = Object.values(e).filter((e => !e.isCapstone)).sort(o.sortChallengeUpdatesDesc);
                    return (0, i.groupChallengesByProgression)(t)
                })),
                _flattenGroups(e) {
                    let t = [];
                    return e && e.forEach(((e, n) => {
                        if (!e.length) return;
                        const a = {
                            id: "header",
                            isHeader: !0,
                            groupName: this.get("tra").get(`postgame_updates_grouping_${n}`)
                        };
                        t.push(a), t = t.concat(e)
                    })), t
                },
                _handleKeyDown(e) {
                    "Escape" === e.key && (e.preventDefault(), this.get("actions").closeModal.call(this))
                },
                actions: {
                    openModal(e) {
                        e === r.MODAL_CATEGORY.CHALLENGES ? (this.set("showProgressedEternalsData", !1), this.set("showProgressedChallengeData", !0), this.set("showProgressionModal", !0)) : e === r.MODAL_CATEGORY.ETERNALS && (this.set("showProgressedChallengeData", !1), this.set("showProgressedEternalsData", !0), this.set("showProgressionModal", !0))
                    },
                    closeModal() {
                        this.set("showProgressedEternalsData", !1), this.set("showProgressedChallengeData", !1), this.set("showProgressionModal", !1)
                    },
                    playOutlineAnimation() {
                        this.sendAction("playOutlineAnimation")
                    }
                }
            });
            t.default = p
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.calculateEoGChallengeSlots = function(e, t, n) {
                const a = [...Array(n).map((e => null))];
                if (!e.length && !t.length) return a;
                for (let s = 0; s < n; s++) {
                    if (s === n - 1) {
                        a[s] = t.length >= 1 ? g(t) : h(e, s) || null;
                        break
                    }
                    a[s] = h(e, s) || null
                }
                return a
            }, t.getFirstChallengeSlotScore = h, t.sortChallengeUpdatesDesc = function(e, t) {
                const n = d(e);
                return d(t) - n
            }, t.sortEternalUpdatesDesc = function(e, t) {
                const n = p(e);
                return p(t) - n
            }, t.sortGroupedChallengeUpdates = function(e, t) {
                const n = i[t.currentLevel] - i[e.currentLevel],
                    a = u(t) - u(e),
                    s = d(t) - d(e),
                    o = e.id - t.id;
                return n || a || s || o
            };
            var a = n(1);
            const s = 10,
                o = 50,
                l = 100,
                i = a.SharedChallengesConstants.CHALLENGE_LEVEL_TO_ORDINAL,
                r = {
                    NONE: 1,
                    IRON: 2,
                    BRONZE: 3,
                    SILVER: 5,
                    GOLD: 8,
                    PLATINUM: 13,
                    DIAMOND: 21,
                    MASTER: 1,
                    GRANDMASTER: 1,
                    CHALLENGER: 1
                },
                c = [{
                    TEAMWORK: 10,
                    EXPERTISE: 5,
                    IMAGINATION: 3,
                    VETERANCY: 1
                }, {
                    EXPERTISE: 10,
                    TEAMWORK: 5,
                    IMAGINATION: 3,
                    VETERANCY: 1
                }, {
                    IMAGINATION: 10,
                    EXPERTISE: 5,
                    TEAMWORK: 3,
                    VETERANCY: 1
                }, {
                    VETERANCY: 13,
                    EXPERTISE: 8,
                    TEAMWORK: 5,
                    IMAGINATION: 3
                }, {
                    TEAMWORK: 10,
                    EXPERTISE: 8,
                    IMAGINATION: 6,
                    VETERANCY: 3
                }],
                m = [1, 3, 5, 8, 13];

            function p(e) {
                let t = 0;
                const n = e.level >= m.length ? 1 : m[e.level],
                    a = 1 + (parseFloat(e.newProgressPercent) || 0) / 100,
                    s = Boolean(e.isMilestone),
                    i = Boolean(e.isNewBest);
                return t = s ? n * a * o : n * a, i ? t * l : t
            }

            function d(e, t = null) {
                let n = 0;
                const a = null !== t ? c[t][e.category] : 1,
                    o = r[e.currentLevel],
                    l = e.nextThreshold - e.currentThreshold,
                    i = 1 + (e.currentValue - e.currentThreshold) / l;
                n = e.currentLevel !== e.previousLevel ? a * o * s : a * o * i;
                return (e.priority || 1) * n
            }

            function u(e) {
                const t = e.currentLevel !== e.previousLevel,
                    n = e.nextThreshold - e.currentThreshold,
                    a = e.currentValue - e.currentThreshold;
                return t ? 0 : 1 + a / n
            }

            function g(e) {
                return e.sort(((e, t) => {
                    const n = p(e);
                    return p(t) - n
                })).shift()
            }

            function h(e, t) {
                return e.sort(((e, n) => {
                    const a = d(e, t);
                    return d(n, t) - a
                })).shift()
            }
        }, (e, t) => {
            "use strict";

            function n(e, t) {
                const n = new Map;
                return e.forEach((e => {
                    const a = t(e);
                    n.has(a) ? n.get(a).push(e) : n.set(a, [e])
                })), n
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.groupChallengesByProgression = function(e) {
                return n(e, (e => e.currentLevel !== e.previousLevel ? "upgraded" : "progressed"))
            }, t.groupEternalsByMilestone = function(e) {
                return n(e, (e => e.isNewBest ? "new_personal_best" : Boolean(e.isMilestone) ? "new_milestone" : "progressed"))
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = (a = n(14)) && a.__esModule ? a : {
                    default: a
                },
                l = n(3);
            const i = ["boostXpEarned", "globalBoostXpEarned", "loyaltyBoostXpEarned", "xbgpBoostXpEarned", "missionsXpEarned"];
            var r = s.Ember.Component.extend(o.default, {
                classNames: ["prestige-progression-component"],
                classNameBindings: ["isLarge"],
                eogStats: {},
                isRanked: !1,
                isCherry: !1,
                summonerIconPath: "",
                playerLevel: s.Ember.computed.alias("eogStats.currentLevel"),
                leveledUp: s.Ember.computed.alias("eogStats.leveledUp"),
                xpTotal: s.Ember.computed.alias("eogStats.experienceTotal"),
                xpEarned: s.Ember.computed.alias("eogStats.experienceEarned"),
                nextLevelXpRequired: s.Ember.computed.alias("eogStats.nextLevelXp"),
                prevLevelXp: s.Ember.computed.alias("eogStats.preLevelUpExperienceTotal"),
                prevLevelXpRequired: s.Ember.computed.alias("eogStats.preLevelUpNextLevelXp"),
                boostXpEarned: s.Ember.computed.alias("eogStats.boostXpEarned"),
                globalBoostXpEarned: s.Ember.computed.alias("eogStats.globalBoostXpEarned"),
                loyaltyBoostXpEarned: s.Ember.computed.alias("eogStats.loyaltyBoostXpEarned"),
                xbgpBoostXpEarned: s.Ember.computed.alias("eogStats.xbgpBoostXpEarned"),
                missionsXpEarned: s.Ember.computed.alias("eogStats.missionsXpEarned"),
                willAnimate: !1,
                didAnimate: !1,
                showAnimatedElements: s.Ember.computed.or("willAnimate", "didAnimate"),
                didUpdateAttrs() {
                    this._super(...arguments), this.get("willAnimate") && !this.get("didAnimate") && s.Ember.run.scheduleOnce("afterRender", this, this._playIntroAnimation)
                },
                willDestroyElement() {
                    this._super(...arguments);
                    const e = this.get("animationTimeline");
                    e && e.kill()
                },
                lottieBarFillPath: s.Ember.computed("leveledUp", (function() {
                    return this.get("leveledUp") ? "/fe/lol-static-assets/lottie/challenges/challenges-progress-bar-levelup.json" : "/fe/lol-static-assets/lottie/challenges/challenges-progress-bar.json"
                })),
                _playIntroAnimation() {
                    const e = this.get("tra"),
                        t = this.get("xpEarned"),
                        n = this.get("isRanked"),
                        a = this.get("leveledUp"),
                        o = {
                            amount: 0
                        },
                        l = this.element.querySelector(".points-gained-spark-small-video"),
                        i = this.element.querySelector(".points-gained-spark-medium-video"),
                        r = this.element.querySelector(".lottie-radial-fill"),
                        c = new s.gsap.TimelineMax({
                            paused: !0,
                            onComplete: () => {
                                this.set("didAnimate", !0)
                            }
                        });
                    c.add(s.gsap.TweenLite.to(o, .25, {
                        amount: t,
                        onUpdate: () => {
                            this.set("animatedPointsText", e.formatString("career_postgame_progress_xp_gain_pts", {
                                xpEarned: Math.round(o.amount)
                            }))
                        },
                        onComplete: () => {
                            a && this.set("animatedPointsText", this.get("playerXpGainLoc"))
                        }
                    }), "start+=0.2"), r && c.add((() => {
                        r.play()
                    }), "start"), n || c.add((() => {
                        this.playSound("sfx-eog-ui-exp-burst.ogg")
                    }), "start+=0.2");
                    const m = a ? i : l;
                    c.add((() => {
                        m && m.play()
                    }), "start+=0.35"), this.set("animationTimeline", c), c.play()
                },
                playerXpGainLoc: s.Ember.computed("xpEarned", "leveledUp", (function() {
                    return this.get("leveledUp") ? this.get("tra.career_postgame_progress_xp_level_up") : this.get("tra").formatString("career_postgame_progress_xp_gain_pts", {
                        xpEarned: this.get("xpEarned")
                    })
                })),
                xpPercentageNew: s.Ember.computed("leveledUp", "xpTotal", "nextLevelXpRequired", "xpEarned", (function() {
                    return 0 === this.get("nextLevelXpRequired") ? 0 : this.get("leveledUp") ? this.get("xpTotal") / this.get("nextLevelXpRequired") * 100 : this.get("xpEarned") / this.get("nextLevelXpRequired") * 100
                })),
                xpPercentageOld: s.Ember.computed("leveledUp", "nextLevelXpRequired", "xpTotal", "xpEarned", (function() {
                    return this.get("leveledUp") ? 0 : this.get("nextLevelXpRequired") ? 100 * (this.get("xpTotal") - this.get("xpEarned")) / this.get("nextLevelXpRequired") : 100
                })),
                radialProgressPercent: s.Ember.computed("xpPercentageNew", "xpPercentageOld", (function() {
                    return this.get("xpPercentageNew") + this.get("xpPercentageOld")
                })),
                lottieRadialNewPercent: s.Ember.computed("xpPercentageNew", (function() {
                    return this.get("xpPercentageNew") * l.LOTTIE_RADIAL_UNITS / 100
                })),
                lottieRadialOldPercent: s.Ember.computed("xpPercentageOld", (function() {
                    return this.get("xpPercentageOld") * l.LOTTIE_RADIAL_UNITS / 100
                })),
                nonBoostXpEarned: s.Ember.computed("xpEarned", "boostXpEarned", "globalBoostXpEarned", "loyaltyBoostXpEarned", "xbgpBoostXpEarned", "missionsXpEarned", (function() {
                    return this.get("xpEarned") - i.reduce(((e, t) => e + (this.get(t) || 0)), 0)
                })),
                xpSources: s.Ember.computed("nonBoostXpEarned", "boostXpEarned", "globalBoostXpEarned", "loyaltyBoostXpEarned", "xbgpBoostXpEarned", "missionsXpEarned", (function() {
                    const e = i.map((e => {
                        const t = this.get(e);
                        return {
                            shouldShow: t > 0,
                            valueLoc: this.get("tra").formatString("career_postgame_progress_xp_gain_pts", {
                                xpEarned: t
                            }),
                            typeLoc: this.get(`tra.career_postgame_progress_tooltip_source_${e}`)
                        }
                    }));
                    return [{
                        shouldShow: !0,
                        valueLoc: this.get("tra").formatString("career_postgame_progress_xp_gain_pts", {
                            xpEarned: this.get("nonBoostXpEarned")
                        }),
                        typeLoc: this.get("tra.career_postgame_progress_tooltip_source_xpEarned")
                    }].concat(e)
                }))
            });
            t.default = r
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Component.extend({
                    classNames: ["prestige-progression-tooltip-component"],
                    summonerLevelLoc: a.Ember.computed("level", (function() {
                        return this.get("tra").formatString("career_postgame_progress_tooltip_level", {
                            level: this.get("level")
                        })
                    })),
                    xpTotalLoc: a.Ember.computed("xpTotal", "nextLevelXpRequired", (function() {
                        return this.get("tra").formatString("career_postgame_progress_tooltip_xp_out_of_total", {
                            currentXp: this.get("xpTotal"),
                            nextLevelRequiredXp: this.get("nextLevelXpRequired")
                        })
                    }))
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(3);
            const o = ["RANKED_SOLO_5x5", "RANKED_TEAM_5x5", "CAP_5x5", "NORMAL"];
            var l = a.Ember.Component.extend({
                classNames: ["mastery-progression-component"],
                classNameBindings: ["isSmall"],
                endOfGameService: a.Ember.inject.service("end-of-game"),
                postgame: a.Ember.inject.service("postgame"),
                gameflowService: a.Ember.inject.service("gameflow"),
                championMasteryUpdates: {},
                dataIsLoaded: a.Ember.computed.bool("championMasteryUpdates"),
                masteryLevel: a.Ember.computed.readOnly("championMasteryUpdates.level"),
                hasLeveledUp: a.Ember.computed.readOnly("championMasteryUpdates.hasLeveledUp"),
                pointsGained: a.Ember.computed.readOnly("championMasteryUpdates.pointsGained"),
                pointsBeforeGame: a.Ember.computed.readOnly("championMasteryUpdates.pointsBeforeGame"),
                grade: a.Ember.computed.readOnly("championMasteryUpdates.grade"),
                isLastLevelReached: a.Ember.computed.equal("championMasteryUpdates.pointsUntilNextLevelAfterGame", 0),
                pointsUntilNextLevelAfterGame: a.Ember.computed.readOnly("championMasteryUpdates.pointsUntilNextLevelAfterGame"),
                pointsUntilNextLevelBeforeGame: a.Ember.computed.readOnly("championMasteryUpdates.pointsUntilNextLevelBeforeGame"),
                pointsSinceLastLevelBeforeGame: a.Ember.computed.readOnly("championMasteryUpdates.pointsSinceLastLevelBeforeGame"),
                achievedMastery5: a.Ember.computed.gte("masteryLevel", 5),
                isMastery5: a.Ember.computed.equal("masteryLevel", 5),
                isMastery6: a.Ember.computed.equal("masteryLevel", 6),
                isMastery5or6: a.Ember.computed.or("isMastery5", "isMastery6"),
                tokensEarned: a.Ember.computed.readOnly("championMasteryUpdates.tokensEarned"),
                tokenEarnedAfterGame: a.Ember.computed.bool("championMasteryUpdates.tokenEarnedAfterGame"),
                isCustomGame: a.Ember.computed.equal("endOfGameService.eogStatsBlock.gameType", "CUSTOM_GAME"),
                isNotCustomGame: a.Ember.computed.not("isCustomGame"),
                willAnimate: !1,
                animationPending: !1,
                animationObserver: a.Ember.on("didInsertElement", a.Ember.observer("willAnimate", "dataIsLoaded", (function() {
                    this.get("didAnimate") || (this.get("willAnimate") && this.set("animationPending", !0), this.get("animationPending") && this.get("dataIsLoaded") && (a.Ember.run.scheduleOnce("afterRender", this, this._playIntroAnimation), this.set("animationPending", !1)))
                }))),
                showAnimatedElements: a.Ember.computed.or("willAnimate", "didAnimate"),
                lottieBarFillPath: a.Ember.computed("hasLeveledUp", (function() {
                    return this.get("hasLeveledUp") ? "/fe/lol-static-assets/lottie/challenges/challenges-progress-bar-levelup.json" : "/fe/lol-static-assets/lottie/challenges/challenges-progress-bar.json"
                })),
                _playIntroAnimation() {
                    const e = this.get("tra"),
                        t = this.get("pointsGained") || 0,
                        n = this.get("hasLeveledUp"),
                        s = {
                            amount: 0
                        },
                        o = this.element.querySelector(".points-gained-spark-small-video"),
                        l = this.element.querySelector(".points-gained-spark-medium-video"),
                        i = this.element.querySelector(".lottie-radial-fill"),
                        r = new a.gsap.TimelineMax({
                            paused: !0,
                            onComplete: () => {
                                this.set("didAnimate", !0)
                            }
                        });
                    r.add(a.gsap.TweenLite.to(s, .25, {
                        amount: t,
                        onUpdate: () => {
                            this.set("animatedPointsText", e.formatString("career_postgame_mastery_progress_points_gained", {
                                pointsGained: Math.round(s.amount)
                            }))
                        }
                    }), "start+=0.2"), i && r.add((() => {
                        i.play()
                    }), "start");
                    const c = n ? l : o;
                    r.add((() => {
                        c && c.play()
                    }), "start+=0.35"), r.play()
                },
                totalMasteryPoints: a.Ember.computed("pointsGained", "pointsBeforeGame", (function() {
                    return (this.get("pointsGained") || 0) + (this.get("pointsBeforeGame") || 0)
                })),
                tokenList: a.Ember.computed("tokensEarned", (function() {
                    const e = [],
                        t = this.get("tokensEarned") || 0;
                    for (let n = 0; n < t; n++) e.push(0);
                    return e
                })),
                tokensRemainingToBeEarned: a.Ember.computed("isMastery5", "isMastery6", "tokensEarned", (function() {
                    const e = this.get("tokensEarned") || 0;
                    let t = 0;
                    return this.get("isMastery5") ? t = 2 - e : this.get("isMastery6") && (t = 3 - e), t
                })),
                checkboxList: a.Ember.computed("tokensRemainingToBeEarned", (function() {
                    const e = [],
                        t = this.get("tokensRemainingToBeEarned") || 0;
                    for (let n = 0; n < t; n++) e.push(0);
                    return e
                })),
                showMastery5or6Text: a.Ember.computed("tokenEarnedAfterGame", "tokensRemainingToBeEarned", "isMastery5or6", (function() {
                    const e = this.get("isMastery5or6"),
                        t = this.get("tokensRemainingToBeEarned"),
                        n = this.get("tokenEarnedAfterGame");
                    return e && (0 === t || n)
                })),
                mastery5or6Text: a.Ember.computed("tra.career_postgame_token_earned", "tra.career_postgame_upgrade_ready", "tokensRemainingToBeEarned", (function() {
                    return 0 === (this.get("tokensRemainingToBeEarned") || 0) ? this.get("tra.career_postgame_upgrade_ready") : this.get("tra.career_postgame_token_earned")
                })),
                masteryLevelText: a.Ember.computed("tra.ready", "tra.career_postgame_mastery_progress_level", "masteryLevel", (function() {
                    const e = this.get("tra");
                    return e ? e.formatString("career_postgame_mastery_progress_level", {
                        masteryLevel: this.get("masteryLevel")
                    }) : ""
                })),
                pointsGainedText: a.Ember.computed("tra.ready", "tra.career_postgame_mastery_progress_points_gained", "pointsGained", (function() {
                    const e = this.get("tra");
                    return e ? e.formatString("career_postgame_mastery_progress_points_gained", {
                        pointsGained: this.get("pointsGained")
                    }) : ""
                })),
                championPointQueueTypesArray: a.Ember.computed("endOfGameService.championMasteryConfig.ChampionPointQueueTypes", (function() {
                    const e = this.get("endOfGameService.championMasteryConfig.ChampionPointQueueTypes");
                    let t = [];
                    return t = e || "" === e ? e.split(",") : o, t
                })),
                isQueueSupportedForChampionMastery: a.Ember.computed("championPointQueueTypesArray", "gameflowService.gameflowSession.gameData.queue.type", (function() {
                    const e = this.get("gameflowService.gameflowSession.gameData.queue.type");
                    return this.get("championPointQueueTypesArray").indexOf(e) > -1
                })),
                isPlayerLevelSupportedForChampionMastery: a.Ember.computed("endOfGameService.championMasteryConfig.MinSummonerLevel", "endOfGameService.player.level", (function() {
                    return this.get("endOfGameService.player.level") >= this.get("endOfGameService.championMasteryConfig.MinSummonerLevel")
                })),
                isChampionMasteryEnabled: a.Ember.computed.bool("endOfGameService.championMasteryConfig.Enabled"),
                isPostgameChampionMasteryEnabled: a.Ember.computed.bool("postgame.postgameChampionMasteryEnabled"),
                isChampionMasteryAvailable: a.Ember.computed.and("isQueueSupportedForChampionMastery", "isPlayerLevelSupportedForChampionMastery", "isChampionMasteryEnabled", "isNotCustomGame", "dataIsLoaded", "isPostgameChampionMasteryEnabled"),
                masteryRadialProgressPercent: a.Ember.computed("isLastLevelReached", "nextLevelPercentFill", "currentLevelPercentFill", "hasLeveledUp", (function() {
                    return this.get("isLastLevelReached") ? 100 : this.get("hasLeveledUp") ? this.get("nextLevelPercentFill") : this.get("currentLevelPercentFill") + this.get("beforeMatchPercentFill")
                })),
                lottieRadialNewPercent: a.Ember.computed("hasLeveledUp", "isLastLevelReached", "nextLevelPercentFill", "currentLevelPercentFill", (function() {
                    if (this.get("isLastLevelReached")) return 0;
                    let e = this.get("hasLeveledUp") ? this.get("nextLevelPercentFill") : this.get("currentLevelPercentFill");
                    return e = e || 0, e * s.LOTTIE_RADIAL_UNITS / 100
                })),
                lottieRadialCurrentPercent: a.Ember.computed("beforeMatchPercentFill", "isLastLevelReached", (function() {
                    if (this.get("isLastLevelReached")) return 100;
                    return (this.get("beforeMatchPercentFill") || 0) * s.LOTTIE_RADIAL_UNITS / 100
                })),
                currentLevelTotalMasteryPoints: a.Ember.computed("pointsSinceLastLevelBeforeGame", "pointsUntilNextLevelBeforeGame", (function() {
                    return this.get("pointsSinceLastLevelBeforeGame") + this.get("pointsUntilNextLevelBeforeGame")
                })),
                beforeMatchPercentFill: a.Ember.computed("pointsSinceLastLevelBeforeGame", "currentLevelTotalMasteryPoints", (function() {
                    return this.get("pointsSinceLastLevelBeforeGame") / this.get("currentLevelTotalMasteryPoints") * 100
                })),
                currentLevelPercentFill: a.Ember.computed("pointsGained", "currentLevelTotalMasteryPoints", (function() {
                    return this.get("pointsGained") / this.get("currentLevelTotalMasteryPoints") * 100
                })),
                spilloverMasteryPoints: a.Ember.computed("pointsGained", "pointsUntilNextLevelBeforeGame", (function() {
                    return this.get("pointsGained") - this.get("pointsUntilNextLevelBeforeGame")
                })),
                nextLevelTotalMasteryPoints: a.Ember.computed("pointsUntilNextLevelAfterGame", "spilloverMasteryPoints", (function() {
                    return this.get("pointsUntilNextLevelAfterGame") + this.get("spilloverMasteryPoints")
                })),
                nextLevelPercentFill: a.Ember.computed("nextLevelTotalMasteryPoints", "spilloverMasteryPoints", (function() {
                    const e = this.get("nextLevelTotalMasteryPoints");
                    return this.get("spilloverMasteryPoints") / e * 100
                }))
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            var l = s.Ember.Component.extend(o.default, {
                classNames: ["cherry-progression-component"],
                classNameBindings: ["isWin::is-loss", "isLossPrevented", "leftSpacing:left-spacing:"],
                willAnimate: !1,
                getRatedRatingChangeLoc: function(e) {
                    const t = s.leagueTierNames.getCherryRatedRatingLoc(e);
                    return e < 0 ? t : `+${t}`
                },
                currentRatedTierLoc: s.Ember.computed("ratedTier", (function() {
                    return s.leagueTierNames.getCherryRatedTierNameLoc(this.get("ratedTier"))
                })),
                currentRatedRatingLoc: s.Ember.computed("ratedRating", (function() {
                    return s.leagueTierNames.getCherryRatedRatingLoc(this.get("ratedRating")) || ""
                })),
                isBeingPromoted: s.Ember.computed("notifyReason", (function() {
                    return "RATED_TIER_PROMOTED" === this.get("notifyReason")
                })),
                cherryRatedMedallion: s.Ember.computed("ratedTier", (function() {
                    return s.leagueTierNames.getCherryRatedMedallion(this.get("ratedTier"))
                }))
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            var l = s.Ember.Component.extend(o.default, {
                classNames: ["rating-change-component"],
                classNameBindings: ["isWin::is-loss"],
                isBeingPromoted: !1,
                isBeingDemoted: !1,
                isInMiniseries: !1,
                isLossPrevented: !1,
                willAnimate: !1,
                didAnimate: !1,
                showAnimatedElements: s.Ember.computed.or("willAnimate", "didAnimate"),
                isPromotedOrDemoted: s.Ember.computed.or("isBeingPromoted", "isBeingDemoted"),
                shouldShowAnimatedRatingDeltaString: s.Ember.computed("isInMiniseries", "isPromotedOrDemoted", "isLossPrevented", "willAnimate", (function() {
                    return !this.get("isInMiniseries") && !this.get("isPromotedOrDemoted") && !this.get("isLossPrevented") && this.get("willAnimate")
                })),
                willDestroyElement() {
                    this._super(...arguments);
                    const e = this.get("animationTimeline");
                    e && e.kill()
                },
                _playIntroAnimation() {
                    const e = this.get("ratingDelta"),
                        t = this.get("isWin"),
                        n = this.get("shouldShowAnimatedRatingDeltaString"),
                        a = {
                            amount: 0
                        },
                        o = this.element.querySelector(".points-gained-spark-video"),
                        l = new s.gsap.TimelineMax({
                            paused: !0,
                            onComplete: () => {
                                this.set("didAnimate", !0)
                            }
                        });
                    l.add(s.gsap.TweenLite.to(a, .3, {
                        amount: e,
                        onUpdate: () => {
                            this.set("animatedPointsText", this.get("getLocForRatingChange")(Math.round(a.amount)))
                        }
                    }), "start+=0.2"), n && t ? (l.add((() => {
                        this.playSound("sfx-eog-ui-exp-burst.ogg")
                    }), "start+=0.2"), o && l.add((() => {
                        o.play()
                    }), "start+=0.4")) : t || l.add((() => {
                        this.playSound("sfx-eog-ui-exp-burst-negative.ogg")
                    }), "start+=0.2"), this.set("animationTimeline", l), l.play()
                },
                didUpdateAttrs() {
                    this._super(...arguments), this.get("willAnimate") && !this.get("didAnimate") && s.Ember.run.scheduleOnce("afterRender", this, this._playIntroAnimation)
                },
                ratingChangeLoc: s.Ember.computed("ratingDelta", "getLocForRatingChange", (function() {
                    const e = this.get("getLocForRatingChange");
                    return e ? e(this.get("ratingDelta")) : ""
                })),
                updateResultLoc: s.Ember.computed("ratingChangeLoc", "isPromotedOrDemoted", "isInMiniseries", "isWin", "isLossPrevented", (function() {
                    const e = this.get("isWin");
                    return this.get("isInMiniseries") ? e ? this.get("tra.career_postgame_ranked_win_short") : this.get("tra.career_postgame_ranked_loss_short") : this.get("isPromotedOrDemoted") ? e ? this.get("tra.career_postgame_ranked_promoted_short") : this.get("tra.career_postgame_ranked_demoted_short") : this.get("isLossPrevented") ? this.get("tra.career_postgame_ranked_loss_prevented") : this.get("ratingChangeLoc")
                }))
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            var l = s.Ember.Component.extend(o.default, {
                classNames: ["ranked-progression-component"],
                classNameBindings: ["isWin::is-loss", "isLossPrevented", "consolationLpApplied", "leaverPenaltyApplied", "isRankProvisional"],
                willAnimate: !1,
                getLocForLpChange: function(e) {
                    const t = s.leagueTierNames.getLpLoc(e);
                    return e < 0 ? t : `+${t}`
                },
                tierRankLoc: s.Ember.computed("tier", "division", (function() {
                    return s.leagueTierNames.getFullTierDivisionName(this.get("tier"), this.get("division"))
                })),
                lpChangeLoc: s.Ember.computed("leaguePointsDelta", (function() {
                    return this.getLocForLpChange(this.get("leaguePointsDelta"))
                })),
                lpConsolationLoc: s.Ember.computed("consolationLpUsed", (function() {
                    return this.getLocForLpChange(this.get("consolationLpUsed"))
                })),
                leaverPenaltyLoc: s.Ember.computed("afkLpPenaltyAmount", (function() {
                    return this.getLocForLpChange(this.get("afkLpPenaltyAmount"))
                })),
                consolationLpApplied: s.Ember.computed.gt("consolationLpUsed", 0),
                leaverPenaltyApplied: s.Ember.computed.lt("afkLpPenaltyAmount", 0),
                isRankProvisional: s.Ember.computed.gt("provisionalGamesRemaining", 0),
                updateResultStatusText: s.Ember.computed("tierRankLoc", "consolationLpApplied", "lpConsolationLoc", "leaverPenaltyApplied", "leaverPenaltyLoc", (function() {
                    return this.get("consolationLpApplied") ? this.get("tra").formatString("career_postgame_ranked_loss_mitigated_consolation_lp_used", {
                        consolationLpUsed: this.get("lpConsolationLoc")
                    }) : this.get("leaverPenaltyApplied") ? this.get("tra").formatString("career_postgame_ranked_afk_penalty_applied", {
                        afkLpPenaltyAmount: this.get("leaverPenaltyLoc")
                    }) : this.get("tierRankLoc")
                })),
                currentLpLoc: s.Ember.computed("leaguePoints", (function() {
                    return s.leagueTierNames.getLpLoc(this.get("leaguePoints")) || ""
                })),
                isInMiniseries: s.Ember.computed("miniseriesProgress.length", (function() {
                    return this.get("miniseriesProgress.length") > 0
                })),
                isBeingPromoted: s.Ember.computed("notifyReason", (function() {
                    return "LEAGUE_PROMOTED" === this.get("notifyReason")
                })),
                isBeingDemoted: s.Ember.computed("notifyReason", (function() {
                    return "LEAGUE_DEMOTED" === this.get("notifyReason")
                }))
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = n(3),
                l = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            const i = 100;
            var r = s.Ember.Component.extend(l.default, {
                classNames: ["ranked-reward-progression-component"],
                postgame: s.Ember.inject.service(),
                isElementInserted: !1,
                isRewardDataLoaded: !1,
                leagueTierNames: s.leagueTierNames,
                didAnimate: !1,
                willAnimate: !1,
                showAnimatedElements: s.Ember.computed.or("willAnimate", "didAnimate"),
                splitPointsNotification: s.Ember.computed.alias("leaguesNotification.splitPointsNotification"),
                splitPointProgressBeforeGamePercent: s.Ember.computed("splitPointsNotification.previousSplitPointsRequired", "splitPointsNotification.splitPointsRequired", "splitPointsNotification.splitPointsBeforeGame", (function() {
                    const e = this.get("splitPointsNotification.previousSplitPointsRequired"),
                        t = this.get("splitPointsNotification.splitPointsRequired"),
                        n = this.get("splitPointsNotification.splitPointsBeforeGame");
                    return e === t ? 0 : Math.max(0, (n - e) / (t - e) * i)
                })),
                shouldSplitPointsGainedTextAnimate: s.Ember.computed("willAnimate", "isRewardDataLoaded", "isRewardEarned", (function() {
                    return this.get("willAnimate") && this.get("isRewardDataLoaded") && !this.get("isRewardEarned")
                })),
                splitPointProgressAfterGamePercent: s.Ember.computed("splitPointsNotification.previousSplitPointsRequired", "splitPointsNotification.splitPointsRequired", "splitPointsNotification.splitPointsAfterGame", "noMoreRewardsToEarn", (function() {
                    const e = this.get("splitPointsNotification.previousSplitPointsRequired"),
                        t = this.get("splitPointsNotification.splitPointsRequired"),
                        n = this.get("splitPointsNotification.splitPointsAfterGame");
                    return this.get("noMoreRewardsToEarn") || e === t ? i : (n - e) / (t - e) * i
                })),
                noMoreRewardsToEarn: s.Ember.computed.not("splitPointsNotification.nextRewardId"),
                splitPointProgressGainedPercent: s.Ember.computed("splitPointProgressBeforeGamePercent", "splitPointProgressAfterGamePercent", (function() {
                    const e = this.get("splitPointProgressBeforeGamePercent");
                    return this.get("splitPointProgressAfterGamePercent") - e
                })),
                unanimatedSplitPointsGainedText: s.Ember.computed("isRewardEarned", "splitPointsNotification.splitPointsDelta", (function() {
                    if (this.get("isRewardEarned")) {
                        return this.get("tra").get("postgame_ranked_reward_progression_unlocked")
                    } {
                        const e = this.get("splitPointsNotification.splitPointsDelta");
                        return this._getFormattedSplitPointsGainedText(e)
                    }
                })),
                currentSplitText: s.Ember.computed("postgame.currentSplit", (function() {
                    const e = this.get("tra"),
                        t = this.get("postgame.currentSplit");
                    return t && 2 === parseInt(t) ? e.get("postgame_ranked_reward_progression_split_two") : e.get("postgame_ranked_reward_progression_split_one")
                })),
                _getFormattedSplitPointsGainedText(e) {
                    return this.get("tra").formatString("postgame_ranked_reward_progression_sp_gained", {
                        splitPointsGained: e
                    })
                },
                didReceiveAttrs() {
                    this._super(...arguments), this.setReward(), this._checkIfShouldPlayIntroAnimation()
                },
                didInsertElement() {
                    this._super(...arguments), this.set("isElementInserted", !0), this._checkIfShouldPlayIntroAnimation()
                },
                _checkIfShouldPlayIntroAnimation() {
                    this.get("isElementInserted") && this.get("isRewardDataLoaded") && this.get("willAnimate") && !this.get("didAnimate") && this._playIntroAnimation()
                },
                setReward() {
                    const e = this.get("leaguesNotification");
                    if (!e) return;
                    const t = this.get("isRewardDataLoaded"),
                        n = e.rewardEarnedId || e.splitPointsNotification && e.splitPointsNotification.nextRewardId;
                    if (n && !t) {
                        this.leagueTierNames.asyncGetRewardImage(n).then((e => {
                            this.set("rewardImagePath", e)
                        }));
                        const t = !!e.rewardEarnedId,
                            a = e.rewardEarnedType || e.splitPointsNotification && e.splitPointsNotification.nextRewardType;
                        this.set("isRewardDataLoaded", !0), this.set("rewardType", a), this.set("isRewardEarned", t)
                    }
                },
                _playIntroAnimation() {
                    this.get("tra");
                    const e = this.get("splitPointsNotification.splitPointsDelta") || 0,
                        t = {
                            amount: 0
                        },
                        n = this.element.querySelector(".ranked-reward-progression-points-gained-spark-video"),
                        a = this.element.querySelector(".ranked-reward-progression-lottie-radial-fill"),
                        o = new s.gsap.TimelineMax({
                            paused: !0,
                            onComplete: () => {
                                this.set("didAnimate", !0)
                            }
                        });
                    o.add(s.gsap.TweenLite.to(t, .25, {
                        amount: e,
                        onUpdate: () => {
                            this.set("animatedSplitPointsGainedText", this._getFormattedSplitPointsGainedText(Math.round(t.amount)))
                        }
                    }), "start+=0.2"), a && o.add((() => {
                        a.play()
                    }), "start"), o.add((() => {
                        n && n.play()
                    }), "start+=0.35"), o.play()
                },
                lottieBarFillPath: s.Ember.computed("hasLeveledUp", (function() {
                    return this.get("hasLeveledUp") ? "/fe/lol-static-assets/lottie/challenges/challenges-progress-bar-levelup.json" : "/fe/lol-static-assets/lottie/challenges/challenges-progress-bar.json"
                })),
                lottieSplitPointProgressGainedPercent: s.Ember.computed("splitPointProgressGainedPercent", (function() {
                    return this.get("splitPointProgressGainedPercent") * o.LOTTIE_RADIAL_UNITS / i
                })),
                lottieSplitPointProgressBeforeGamePercent: s.Ember.computed("splitPointProgressBeforeGamePercent", (function() {
                    return this.get("splitPointProgressBeforeGamePercent") * o.LOTTIE_RADIAL_UNITS / i
                }))
            });
            t.default = r
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Component.extend({
                    classNames: ["miniseries-progress-component"],
                    miniseriesResultArray: a.Ember.computed("miniseriesProgress", (function() {
                        const e = [],
                            t = this.get("miniseriesProgress") || "";
                        for (let n = 0; n < t.length; n++) e.push(t.charAt(n));
                        return e
                    }))
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = n(3),
                l = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            const i = "/lol-challenges/v1/penalty",
                r = .9;
            var c = s.Ember.Component.extend(l.default, {
                classNames: ["challenge-update-container-component"],
                classNameBindings: ["willAnimate:is-animating"],
                renderEventName: "challenge-container-render",
                shouldSendTelemetry: !1,
                postgame: s.Ember.inject.service(),
                gameflow: s.Ember.inject.service(),
                eternalsUpdatesCount: s.Ember.computed.alias("eternals.length"),
                challengeUpdatesCount: s.Ember.computed.alias("challenges.length"),
                hasNoEternalsUpdates: s.Ember.computed.equal("eternalsUpdatesCount", 0),
                hasNoChallengeUpdates: s.Ember.computed.equal("challengeUpdatesCount", 0),
                willAnimate: !1,
                didAnimate: !1,
                isAnimationQueued: !1,
                showAnimatedElements: s.Ember.computed.or("willAnimate", "didAnimate"),
                animationsEnabled: s.Ember.computed.alias("postgame.largeAreaAnimationsEnabled"),
                isWaitingForChallengesUpdate: s.Ember.computed("items.[]", "hasWarning", (function() {
                    const e = this.get("items") || [];
                    return !(this.get("hasWarning") || e && e[0])
                })),
                isPostgameChallengesDisabled: s.Ember.computed.not("postgame.postgameChallengesEnabled"),
                init() {
                    this._super(...arguments), this.binding = s.dataBinding.bindTo(s.socket), this.binding.observe(i, this, this._handleChallengesPenalty.bind(this)), this.binding.observe("/lol-challenges/v1/available-queue-ids", this, this._handleChallengesQueues.bind(this)), this.set("elementWidth", this.get("elementWidthOverride") || 197)
                },
                didUpdateAttrs() {
                    this._super(...arguments), !this.get("willAnimate") || this.get("didAnimate") || this.get("isAnimationQueued") || this.get("hasWarning") || s.Ember.run.scheduleOnce("afterRender", this, this._queueIntroAnimation), !this.get("isWaitingForChallengesUpdate") && this.get("isAnimationQueued") && this._dequeueIntroAnimation()
                },
                willDestroyElement() {
                    this._super(...arguments), this.binding.unobserve(i, this);
                    const e = this.get("animationTimeline");
                    e && e.kill()
                },
                _queueIntroAnimation() {
                    this.get("isAnimationQueued") || (this.get("isWaitingForChallengesUpdate") ? (s.Ember.run.later((() => {
                        this._cancelIntroAnimation()
                    }), 5e3), this.set("isAnimationQueued", !0)) : this._playIntroAnimation())
                },
                _dequeueIntroAnimation() {
                    this.get("isAnimationQueued") && (s.Ember.run.scheduleOnce("afterRender", this, this._playIntroAnimation), this.set("isAnimationQueued", !1))
                },
                _cancelIntroAnimation() {
                    this.set("isAnimationQueued", !1)
                },
                _playIntroAnimation() {
                    const e = this.element.querySelectorAll(".container-item"),
                        t = this.element.querySelectorAll(".container-item-contents"),
                        n = this.element.querySelector(".challenge-progression-top"),
                        a = this.get("hasWarning"),
                        o = new s.gsap.TimelineMax({
                            paused: !0,
                            onComplete: () => {
                                this.set("didAnimate", !0)
                            }
                        });
                    for (let e = 0; e < t.length; e++) o.fromTo(t[e], .33, {
                        opacity: 0
                    }, {
                        opacity: 1
                    }, "start+=" + (.5 * e + 1));
                    for (let t = 0; t < e.length; t++) {
                        const n = e[t],
                            s = n.getAttribute("anim-data-challenge-level");
                        if (!n.hasAttribute("anim-data-is-empty") && !a)
                            if (s) {
                                const e = n.hasAttribute("anim-data-is-levelup"),
                                    a = n.querySelector(".lottie-card-outline");
                                a && (o.add((() => {
                                    a.play()
                                }), `start+=${.5*t+r}`), o.to(a, .3, {
                                    opacity: 0
                                }, `start+=${.5*t+r+1}`));
                                const l = n.querySelector(".lottie-card-sheen");
                                if (l && (o.add((() => {
                                        l.play()
                                    }), `start+=${.5*t+r}`), o.to(l, .3, {
                                        opacity: 0
                                    }, `start+=${.5*t+r+1}`)), e) {
                                    const e = n.querySelector(".anim-card-intro");
                                    e && (o.add((() => {
                                        e.play()
                                    }), "start+=" + (.5 * t + r - .1)), o.to(e, .3, {
                                        opacity: 0
                                    }, `start+=${.5*t+r+1}`)), o.add((() => {
                                        this.playSound(`sfx-eog-ui-${s.toLowerCase()}-burst.ogg`)
                                    }), `start+=${.5*t+r}`)
                                } else o.add((() => {
                                    this.playSound("sfx-eog-ui-neutral-burst.ogg")
                                }), `start+=${.5*t+r}`)
                            } else {
                                const e = n.hasAttribute("anim-data-is-milestone"),
                                    a = n.querySelector(".lottie-card-outline");
                                if (a && (o.add((() => {
                                        a.play()
                                    }), `start+=${.5*t+r}`), o.to(a, .3, {
                                        opacity: 0
                                    }, `start+=${.5*t+r+1}`)), e) {
                                    const e = n.querySelector(".anim-card-intro");
                                    e && (o.add((() => {
                                        e.play()
                                    }), "start+=" + (.5 * t + r - .1)), o.to(e, .3, {
                                        opacity: 0
                                    }, `start+=${.5*t+r+1}`)), o.add((() => {
                                        this.playSound("sfx-eog-eternals-burst.ogg")
                                    }), `start+=${.5*t+r}`)
                                }
                            }
                    }
                    o.add((() => {
                        this.sendAction("playOutlineAnimation"), this.playSound("sfx-eog-ui-edge-flare.ogg")
                    }), "start+=3"), n && o.fromTo(n, .33, {
                        opacity: 0
                    }, {
                        opacity: 1
                    }, "start+=3.2"), this.set("animationTimeline", o), o.play()
                },
                _handleChallengesPenalty(e) {
                    e && this.set("challengesPenaltyReason", e.reason)
                },
                _handleChallengesQueues(e) {
                    this.set("challengesQueues", e)
                },
                isAfker: s.Ember.computed("postgame.player.stats.WAS_AFK", (function() {
                    return this.get("postgame.player.stats.WAS_AFK")
                })),
                isChallengesLeaver: s.Ember.computed.equal("challengesPenaltyReason", "leaver"),
                isPostgameLeaver: s.Ember.computed.alias("postgame.player.leaver"),
                isLeaver: s.Ember.computed.or("isChallengesLeaver", "isPostgameLeaver", "isAfker"),
                hasWarning: s.Ember.computed.or("isLeaver", "isRemake", "isNotChallengesProgressQueue", "isPostgameChallengesDisabled"),
                isRemake: s.Ember.computed.or("postgame.isEarlySurrenderBystander", "isEarlySurrenderCauser", "isEarlySurrenderAccomplice"),
                isEarlySurrenderCauser: s.Ember.computed.and("postgame.eogStatsBlock.gameEndedInEarlySurrender", "postgame.eogStatsBlock.teamEarlySurrendered", "postgame.eogStatsBlock.causedEarlySurrender"),
                isEarlySurrenderAccomplice: s.Ember.computed.and("postgame.eogStatsBlock.gameEndedInEarlySurrender", "postgame.eogStatsBlock.teamEarlySurrendered", "postgame.eogStatsBlock.isEarlySurrenderAccomplice"),
                isNotChallengesProgressQueue: s.Ember.computed("challengesQueues.[]", "gameflow.queue.id", (function() {
                    const e = this.get("gameflow.queue.id");
                    return !(this.get("challengesQueues") || []).includes(e)
                })),
                cards: s.Ember.computed("items.[]", (function() {
                    return (this.get("items") || []).map(((e, t) => e ? e.currentLevel ? this._decorateChallengeCard(e, t) : this._decorateEternalsCard(e, t) : {
                        isEmpty: !0
                    }))
                })),
                _decorateChallengeCard(e, t) {
                    const {
                        currentValue: n,
                        previousValue: a,
                        currentThreshold: s
                    } = e, o = Math.abs(n - a), l = Math.abs(n - s);
                    return e.isLevelUp = o > l, e.animateStartDelay = .5 * t + r - .2, e
                },
                _decorateEternalsCard: (e, t) => (e.animateStartDelay = .5 * t + r - .2, e),
                actions: {
                    openChallengesModal() {
                        this.get("hasNoChallengeUpdates") || this.sendAction("openModal", o.MODAL_CATEGORY.CHALLENGES)
                    },
                    openEternalsModal() {
                        this.get("hasNoEternalsUpdates") || this.sendAction("openModal", o.MODAL_CATEGORY.ETERNALS)
                    }
                }
            });
            t.default = c
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Component.extend({
                    classNames: ["challenge-updates-tooltip-container"],
                    upgradedChallenges: a.Ember.computed("challengeUpdates", (function() {
                        const e = this.get("challengeUpdates");
                        if (e && e.get("upgraded")) {
                            const t = e.get("upgraded");
                            return {
                                upgraded: t,
                                count: t.length
                            }
                        }
                        return null
                    })),
                    progressedChallenges: a.Ember.computed("challengeUpdates", (function() {
                        const e = this.get("challengeUpdates");
                        if (e && e.get("progressed")) {
                            const t = e.get("progressed");
                            return {
                                progressed: t,
                                count: t.length
                            }
                        }
                        return null
                    }))
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Component.extend({
                    classNames: ["eternals-updates-tooltip-container"],
                    newMilestoneText: a.Ember.computed("tra", "eternalsUpdates", "newMilestoneEternals", (function() {
                        const e = this.get("newMilestoneEternals");
                        return e && e.count > 1 ? this.get("tra").get("postgame_eternals_tooltip_new_milestones") : this.get("tra").get("postgame_eternals_tooltip_new_milestone")
                    })),
                    newPersonalBestEternals: a.Ember.computed("eternalsUpdates", (function() {
                        const e = this.get("eternalsUpdates");
                        if (e && e.get("new_personal_best")) {
                            const t = e.get("new_personal_best");
                            return {
                                newPersonalBest: t,
                                count: t.length
                            }
                        }
                        return null
                    })),
                    newMilestoneEternals: a.Ember.computed("eternalsUpdates", (function() {
                        const e = this.get("eternalsUpdates");
                        if (e && e.get("new_milestone")) {
                            const t = e.get("new_milestone");
                            return {
                                milestones: t,
                                count: t.length
                            }
                        }
                        return null
                    })),
                    progressedEternals: a.Ember.computed("eternalsUpdates", (function() {
                        const e = this.get("eternalsUpdates");
                        if (e && e.get("progressed")) {
                            const t = e.get("progressed");
                            return {
                                progressed: t,
                                count: t.length
                            }
                        }
                        return null
                    }))
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = n(3),
                l = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            var i = s.Ember.Component.extend(l.default, s.Ember.Evented, {
                classNames: ["postgame-party-status-v2"],
                animationsEnabled: !0,
                partyStatus: null,
                readyPlayers: s.Ember.computed.alias("partyStatus.readyPlayers"),
                leftPlayers: s.Ember.computed.alias("partyStatus.leftPlayers"),
                eogPlayers: s.Ember.computed.alias("partyStatus.eogPlayers"),
                partySize: s.Ember.computed.alias("partyStatus.partySize"),
                numPlayersLeft: s.Ember.computed.alias("leftPlayers.length"),
                numPlayersReady: s.Ember.computed.alias("readyPlayers.length"),
                summonerService: s.Ember.inject.service("summoner"),
                gameDataService: s.Ember.inject.service("game-data"),
                animationTimeline: null,
                partyGroupData: null,
                init: function() {
                    this._super(...arguments), this._playerNames = s.playerNames;
                    const e = this.get("eogPlayers");
                    e && this._fetchSummonerDataAndIcon(e)
                },
                partyStatusToolTip: s.Ember.computed("partyGroupData", "readyPlayers.[]", "leftPlayers.[]", (function() {
                    const e = this.get("partyGroupData"),
                        t = this.get("readyPlayers"),
                        n = this.get("leftPlayers");
                    if (e && t && n) {
                        const t = [];
                        return e.forEach((e => {
                            t.push({
                                profileIconPath: e.profileIconPath,
                                displayName: e.displayName,
                                puuid: e.puuid,
                                partyStatus: this._getPartyStatusString(e.puuid)
                            })
                        })), this._sortPartyGroupByRowOrder(t), t
                    }
                })),
                numPlayersReadyChangedObserver: s.Ember.observer("numPlayersReady", "animationsEnabled", (function() {
                    this.get("animationsEnabled") && s.Ember.run.once(this, "_playReturnToLobbyIconAnimation")
                })),
                showComponent: s.Ember.computed("readyPlayers", "eogPlayers", "leftPlayers", "readyPlayers.[]", "eogPlayers.[]", "leftPlayers.[]", (function() {
                    return !!(this.get("readyPlayers") && this.get("eogPlayers") && this.get("leftPlayers")) && this.get("readyPlayers.length") + this.get("eogPlayers.length") + this.get("leftPlayers.length") > 1
                })),
                showPartyStatusTooltipOnHover: s.Ember.computed("partyGroupData.[]", (function() {
                    return !!this.get("partyGroupData") && this.get("partyGroupData.length") > 0
                })),
                willDestroyElement() {
                    this._super(...arguments);
                    const e = this.get("animationTimeline");
                    e && e.kill()
                },
                _playReturnToLobbyIconAnimation() {
                    let e = this.get("animationTimeline");
                    if (e && e.isActive()) return e.seek(e.totalDuration(), !0), void e.restart();
                    const t = this.element.querySelector(".postgame-party-status-v2-icon");
                    e = new s.gsap.TimelineMax({
                        paused: !0
                    }), t && (e.to(t, .2, {
                        scaleX: 1.8,
                        scaleY: 1.8,
                        ease: "cubic-bezier(0, 0, 0, 1)"
                    }, "start"), e.to(t, .2, {
                        scaleX: 1,
                        scaleY: 1,
                        ease: "cubic-bezier(1, 0, 1, 1)"
                    }, "start+=0.3")), this.set("animationTimeline", e), e.play()
                },
                _getPartyStatusString(e) {
                    const t = this.get("readyPlayers"),
                        n = this.get("leftPlayers"),
                        a = t && t.includes(e),
                        s = n && n.includes(e);
                    return a ? o.PARTY_STATUS.READY_STATUS : s ? o.PARTY_STATUS.LEFT_PARTY_STATUS : o.PARTY_STATUS.DEFAULT_WAITING_STATUS
                },
                _fetchSummonerDataAndIcon(e) {
                    const t = this._playerNames.isUsingAlias;
                    this.get("summonerService").getSummonersByPuuid(e).then((e => {
                        const n = [];
                        e.forEach((e => {
                            e && n.push(this.get("gameDataService").getSummonerIcon(e.profileIconId))
                        })), Promise.all(n).then((n => {
                            if (n) {
                                const a = [];
                                e.forEach(((e, s) => {
                                    const o = t ? `${e.gameName} #${e.tagLine}` : e.displayName;
                                    n[s] && a.push({
                                        puuid: e.puuid,
                                        displayName: o,
                                        profileIconPath: n[s].iconPath
                                    })
                                })), this.set("partyGroupData", a)
                            }
                        }))
                    }))
                },
                _sortPartyGroupByRowOrder(e) {
                    e && e.sort(((e, t) => o.PLAYER_STATUS_TO_ORDER_MAP[e.partyStatus] - o.PLAYER_STATUS_TO_ORDER_MAP[t.partyStatus]))
                }
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(126);
            var s = a.Ember.Component.extend({
                classNames: ["progression-modal-root-component"],
                challenges: [],
                eternals: [],
                showEternalsData: a.Ember.computed.bool("showEternalsData"),
                showChallengesData: a.Ember.computed.bool("showChallengessData"),
                actions: {
                    closeModal() {
                        this.sendAction("closeModal")
                    }
                }
            });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(128),
                o = n(3),
                l = a.Ember.Component.extend({
                    classNames: ["scoreboard-header-component"],
                    classNameBindings: ["team.isPlayerTeam"],
                    gameflow: a.Ember.inject.service(),
                    showScoreboardColumnIcons: a.Ember.computed.equal("index", 0),
                    gameMode: a.Ember.computed.alias("gameflow.gameflowSession.gameData.queue.gameMode"),
                    teamGoldLoc: a.Ember.computed("team.stats.GOLD_EARNED", "locale", (function() {
                        return (this.get("team.stats.GOLD_EARNED") || 0).toLocaleString(this.get("locale"))
                    })),
                    teamPlacementLoc: a.Ember.computed((function() {
                        return this.get("tra").formatString(o.CHERRY_PLACEMENT_TRA_KEY + this.get("team.stats.PLAYER_SUBTEAM_PLACEMENT")) || ""
                    })),
                    teamIcon: a.Ember.computed((function() {
                        const e = this.get("team.stats.PLAYER_SUBTEAM"),
                            t = this._getSubteamData(e);
                        if (t) return t.display.icon
                    })),
                    teamNameLoc: a.Ember.computed("index", "tra.ready", (function() {
                        const e = this.get("team.stats.PLAYER_SUBTEAM"),
                            t = this._getSubteamData(e),
                            n = this.get("tra");
                        if (t) return n.formatString(t.display.label, {
                            teamNumber: e
                        })
                    })),
                    kdaLoc: a.Ember.computed("team.stats.CHAMPIONS_KILLED", "team.stats.NUM_DEATHS", "team.stats.ASSISTS", "tra.ready", (function() {
                        const e = this.get("tra"),
                            t = this.get("team.stats");
                        return (0, s.getKdaFull)(t, e)
                    })),
                    actions: {
                        selectStat: function(e, t) {
                            this.sendAction("setSelectedStat", e, t)
                        }
                    },
                    _getSubteamData: function(e) {
                        const t = o.GAME_MODES_WITH_SUBTEAMS,
                            n = this.get("gameMode");
                        if (t && n) return t[n].subteams.find((t => t.subteamId === e))
                    }
                });
            t.default = l
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getKdaDecimal = function(e, t) {
                if (e) {
                    const n = e.CHAMPIONS_KILLED || 0,
                        a = e.NUM_DEATHS || 1,
                        s = ((n + (e.ASSISTS || 0)) / a).toFixed(1);
                    return t.formatString("postgame_scoreboard_row_kda_decimal", {
                        kda: s
                    })
                }
                return ""
            }, t.getKdaFull = function(e, t) {
                if (e) {
                    const n = e.CHAMPIONS_KILLED || 0,
                        a = e.NUM_DEATHS || 0,
                        s = e.ASSISTS || 0;
                    return t.formatString("postgame_scoreboard_row_kda_full", {
                        kills: n,
                        deaths: a,
                        assists: s
                    })
                }
                return ""
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(128),
                o = a.Ember.Component.extend({
                    classNames: ["scoreboard-header-component"],
                    classNameBindings: ["team.isPlayerTeam"],
                    showScoreboardColumnIcons: a.Ember.computed.equal("index", 0),
                    teamGoldLoc: a.Ember.computed("team.stats.GOLD_EARNED", "locale", (function() {
                        return (this.get("team.stats.GOLD_EARNED") || 0).toLocaleString(this.get("locale"))
                    })),
                    teamNameLoc: a.Ember.computed("index", "tra.ready", (function() {
                        const e = this.get("index") + 1;
                        return this.get("tra").formatString("postgame_scoreboard_header_team_label", {
                            teamNumber: e
                        })
                    })),
                    kdaLoc: a.Ember.computed("team.stats.CHAMPIONS_KILLED", "team.stats.NUM_DEATHS", "team.stats.ASSISTS", "tra.ready", (function() {
                        const e = this.get("tra"),
                            t = this.get("team.stats");
                        return (0, s.getKdaFull)(t, e)
                    })),
                    actions: {
                        selectStat: function(e, t) {
                            this.sendAction("setSelectedStat", e, t)
                        }
                    }
                });
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = n(3),
                l = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            const i = s.dataBinding.bindTo((0, s.getProvider)().getSocket()),
                {
                    RunMixin: r
                } = s.EmberAddons.EmberLifeline;
            var c = s.Ember.Component.extend(r, l.default, {
                classNames: ["scoreboard-honor-flair-component"],
                honor: s.Ember.inject.service(),
                gameName: null,
                tagLine: null,
                summonerName: null,
                displayName: s.Ember.computed("gameName", "tagLine", "summonerName", (function() {
                    return this._playerNames.isUsingAlias ? `${this.get("gameName")} #${this.get("tagLine")}` : this.get("summonerName")
                })),
                isLowSpec: !1,
                chatCelebrationSent: !1,
                teamChoiceIconPath: o.HONOR_ASSET_PATH + "Honor-Leaf.svg",
                teamChoiceMograph: o.HONOR_VIDEO_PATH + "EOG_ScoreBoard_Honor.webm",
                hasScoreboardAnimationPlayed: !1,
                hasCelebrated: !1,
                uxSettings: s.Ember.computed.readOnly("honor.uxSettings"),
                teamChoices: s.Ember.computed.readOnly("honor.teamChoices"),
                conversations: s.Ember.computed.readOnly("honor.conversations"),
                init() {
                    this._super(...arguments), this._playerNames = s.playerNames, this.addObserver("conversationId", this, "processChatCelebration"), this.addObserver("hasCelebrated", this, "processChatCelebration"), this.get("hasCelebrated") && !this.get("hasScoreboardAnimationPlayed") && this.processChatCelebration()
                },
                willDestroyElement() {
                    this._super(...arguments), this.removeObserver("conversationId", this, "processChatCelebration"), this.removeObserver("hasCelebrated", this, "processChatCelebration"), this.removeObserver("uxSettings.data.potatoModeEnabled", this, "lowSpecHandler"), this.removeObserver("teamChoices.[]", this, "processRecipients");
                    const e = this.$(".honor-flair-video");
                    e && e.attr("src", "");
                    const t = this.get("animationTimeline");
                    t && t.kill()
                },
                didInsertElement() {
                    this._super(...arguments), this.addObserver("uxSettings.data.potatoModeEnabled", this, "lowSpecHandler"), this.addObserver("teamChoices.[]", this, "processRecipients"), this.lowSpecHandler(), this.processRecipients()
                },
                lowSpecHandler: function() {
                    this.get("hasCelebrated") || this.set("isLowSpec", this.get("uxSettings.data.potatoModeEnabled"))
                },
                processRecipients: function() {
                    const e = this.get("puuid"),
                        t = this.get("teamChoices");
                    !this.get("hasCelebrated") && t && t.includes(e) && this._playHonorAnimation()
                },
                celebrateHonors: function() {
                    const e = this.$(".honor-flair-video");
                    e && e[0] && e[0].play(), this.playSound("sfx-honor-scoreboard-team-choice.ogg")
                },
                _playHonorAnimation() {
                    let e = this.get("animationTimeline");
                    e && e.isActive() && e.kill(), e = new s.gsap.TimelineMax({
                        paused: !0,
                        onComplete: () => {
                            this.sendAction("updateHonorCelebrationAnimation", !0)
                        }
                    }), e.add((() => {
                        this.celebrateHonors.bind(this)()
                    }), "start+=2.0"), this.set("animationTimeline", e), e.play()
                },
                willAnimate: s.Ember.computed("isLowSpec", "hasCelebated", (function() {
                    return !this.get("isLowSpec") && !this.get("hasCelebrated")
                })),
                tooltipText: s.Ember.computed("isLocalPlayer", "tra.ready", "displayName", (function() {
                    return this.get("isLocalPlayer") ? this.get("tra").formatString("honor_postgame_most_honorable_player_tooltip") : this.get("tra").formatString("honor_postgame_most_honorable_player_tooltip_other", {
                        playerName: this.get("displayName")
                    })
                })),
                processChatCelebration: function() {
                    const e = this.get("conversationId"),
                        t = this.get("hasCelebrated"),
                        n = this.get("chatCelebrationSent");
                    e && t && !n && (this.set("chatCelebrationSent", !0), this.createChatCelebration(e))
                },
                createChatCelebration: function(e) {
                    let t;
                    t = this.get("isLocalPlayer") ? this.get("tra").formatString("honor_postgame_most_honorable_player_chat_celebration") : this.get("isPlayerTeam") ? this.get("tra").formatString("honor_postgame_most_honorable_player_chat_celebration_teammate", {
                        playerName: this.get("displayName")
                    }) : this.get("tra").formatString("honor_postgame_most_honorable_player_chat_celebration_other", {
                        playerName: this.get("displayName")
                    }), this.runTask((() => {
                        i.post(`/lol-chat/v1/conversations/${encodeURIComponent(e)}/messages`, {
                            body: t,
                            type: "celebration"
                        })
                    }), 1e3)
                },
                conversationId: s.Ember.computed("conversations.@each.id", (function() {
                    const e = this.get("conversations");
                    let t = null;
                    return e && e.some((function(e) {
                        if (e.type === o.CONVERSATION_TYPE_POSTGAME) return t = e.id, !0
                    })), t
                }))
            });
            t.default = c
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = n(3),
                l = n(15),
                i = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            var r = s.Ember.Component.extend(i.default, {
                classNames: ["scoreboard-root-component"],
                gameflow: s.Ember.inject.service(),
                postgame: s.Ember.inject.service(),
                hasScoreboardAnimationPlayed: !1,
                hasCelebratedHonor: !1,
                isContinueButtonClicked: !1,
                showTeamIntroAnimation: !1,
                backgroundMusic: s.Ember.computed.alias("gameflow.map.assets.postgame-ambience-loop-sound"),
                isCherry: s.Ember.computed.alias("gameflow.isCherry"),
                init() {
                    this._super(...arguments), this.set("statSwitcherStatName1", o.STAT_SWITCHER_STATS.DAMAGE_DEALT), this.set("statSwitcherStatName2", o.STAT_SWITCHER_STATS.GOLD), s.Telemetry.startTracingEvent(l.TELEMETRY_EVENT_NAMES.TIME_ON_SCOREBOARD_SCREEN)
                },
                didInsertElement() {
                    this._super(...arguments), this.get("hasScoreboardAnimationPlayed") || s.Ember.run.scheduleOnce("afterRender", this, this._playScoreboardAnimation), this.addObserver("backgroundMusic", this, "_handleBackgroundMusic"), this._handleBackgroundMusic()
                },
                willDestroyElement() {
                    this._super(...arguments);
                    const e = this.get("animationTimeline");
                    e && e.kill(), s.Telemetry.endTracingEvent(l.TELEMETRY_EVENT_NAMES.TIME_ON_SCOREBOARD_SCREEN);
                    const t = this.get("_bgMusic");
                    t && t.fadeOut(void 0, {
                        stop: !0
                    }), this.removeObserver("backgroundMusic", this, "_handleBackgroundMusic")
                },
                addNonZeroStatOptions: (e, t, n) => t.concat(e.filter((e => !!n[e]))),
                animationsEnabled: s.Ember.computed("postgame.largeAreaAnimationsEnabled", "postgame.disableEogAnimations", (function() {
                    return this.get("postgame.largeAreaAnimationsEnabled") && !this.get("postgame.disableEogAnimations")
                })),
                statSwitcher1Options: s.Ember.computed("highestStatValueByStatMap", (function() {
                    const e = this.get("highestStatValueByStatMap");
                    return this.addNonZeroStatOptions([o.STAT_SWITCHER_STATS.CC_SCORE], [o.STAT_SWITCHER_STATS.DAMAGE_DEALT, o.STAT_SWITCHER_STATS.DAMAGE_TAKEN], e)
                })),
                statSwitcher2Options: s.Ember.computed("highestStatValueByStatMap", (function() {
                    const e = this.get("highestStatValueByStatMap");
                    return this.addNonZeroStatOptions([o.STAT_SWITCHER_STATS.VISION_SCORE], [o.STAT_SWITCHER_STATS.GOLD, o.STAT_SWITCHER_STATS.CREEP_SCORE], e)
                })),
                highestStatValueByStatMap: s.Ember.computed("eogStats.teams.players.@each.stats", (function() {
                    const e = {};
                    return this.get("eogStats.teams").forEach((t => {
                        t.players.forEach((t => {
                            t.stats && Object.values(o.STAT_SWITCHER_STATS).forEach((n => {
                                e[n] = Math.max(e[n] || 0, t.stats[n] || 0)
                            }))
                        }))
                    })), e
                })),
                _handleBackgroundMusic() {
                    this.get("backgroundMusic") && !this.get("_bgMusic") && this.set("_bgMusic", this.playBackgroundMusic(this.get("backgroundMusic")))
                },
                _playScoreboardAnimation() {
                    const e = this.$(".scoreboard-root-content-container"),
                        t = s.gsap.Linear.easeNone;
                    if (this.get("animationsEnabled")) {
                        let n = this.get("animationTimeline");
                        n && n.isActive() && n.kill(), n = new s.gsap.TimelineMax({
                            paused: !0,
                            onComplete: () => {
                                this.sendAction("updateScoreboardAnimation", !0)
                            }
                        }), e && n.fromTo(e, .33, {
                            css: {
                                opacity: 0
                            },
                            ease: t
                        }, {
                            css: {
                                opacity: 1
                            }
                        }, "start+=0"), this.set("animationTimeline", n), n.play(), this.set("showTeamIntroAnimation", !0);
                        this.get("isContinueButtonClicked") || this.playSound("sfx-eog-chaos-order.ogg")
                    }
                },
                actions: {
                    setSelectedStat: function(e, t) {
                        this.set(`statSwitcherStatName${t}`, e)
                    },
                    updateHonorCelebrationAnimation(e) {
                        this.sendAction("updateHonorCelebrationAnimation", e)
                    }
                }
            });
            t.default = r
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = n(111),
                l = n(133),
                i = (a = n(14)) && a.__esModule ? a : {
                    default: a
                },
                r = n(6);
            var c = s.Ember.Component.extend(i.default, {
                classNames: ["scoreboard-row-component"],
                classNameBindings: ["player.isLocalPlayer", "player.leaver", "team.isPlayerTeam:is-ally", "showNotInChat:not-in-chat"],
                endOfGameService: s.Ember.inject.service("end-of-game"),
                postgame: s.Ember.inject.service(),
                parties: s.Ember.inject.service(),
                gameflow: s.Ember.inject.service(),
                playerActions: s.Ember.inject.service(),
                chatMessages: s.Ember.inject.service(),
                honor: s.Ember.inject.service(),
                challenges: s.Ember.inject.service(),
                currentLevel: s.Ember.computed.alias("topMostProgressedChallenge.currentLevel"),
                nextLevel: s.Ember.computed.alias("topMostProgressedChallenge.nextLevel"),
                isLeaver: s.Ember.computed.bool("player.leaver"),
                teamChoices: s.Ember.computed.readOnly("honor.teamChoices"),
                localPlayerChallengesData: s.Ember.computed.readOnly("challenges.localPlayerChallengesData"),
                isRowInitialized: !1,
                hasScoreboardAnimationPlayed: !1,
                hasCelebratedHonor: !1,
                animationsEnabled: !0,
                init: function() {
                    this._super(...arguments), this.challengesBinding = (0, s.dataBinding)("/lol-challenges", s.socket), this.setupUpdatedChallengeListener(this.get("player")), this._initializeAnimationData()
                },
                willDestroyElement: function() {
                    this._super(...arguments), this.challengesBinding.unobserve(this.updatedChallengesPath, this)
                },
                setupUpdatedChallengeListener(e) {
                    return (0, s.dataBinding)("/lol-summoner").get(`/v1/summoners/${e.summonerId}`).then((e => {
                        if (e) {
                            const {
                                puuid: t,
                                gameName: n,
                                tagLine: a
                            } = e;
                            this.set("puuid", t), this.set("gameName", n), this.set("tagLine", a);
                            const s = this.get("gameId");
                            this.updatedChallengePath = `/lol-challenges/v1/updated-challenges/${s}/${t}`, this.challengesBinding.observe(`/v1/updated-challenges/${s}/${t}`, this, this.handleUpdatedChallenge)
                        }
                    }))
                },
                handleUpdatedChallenge(e) {
                    this.set("updatedChallenges", e)
                },
                isPlayerMuted: s.Ember.computed("postgame.playerMuteStatus", "player.puuid", (function() {
                    return this._getMuteStatus(l.MUTE_TYPES.isPlayerMuted)
                })),
                isSettingsMuted: s.Ember.computed("postgame.playerMuteStatus", "player.puuid", (function() {
                    return this._getMuteStatus(l.MUTE_TYPES.isSettingsMuted)
                })),
                isSystemMuted: s.Ember.computed("postgame.playerMuteStatus", "player.puuid", (function() {
                    return this._getMuteStatus(l.MUTE_TYPES.isSystemMuted)
                })),
                isPlayerMuteNotToggleable: s.Ember.computed.or("isSettingsMuted", "isSystemMuted"),
                isPlayerMuteToggleable: s.Ember.computed.not("isPlayerMuteNotToggleable"),
                showPlayerMute: s.Ember.computed("isPlayerMuted", "isSettingsMuted", (function() {
                    const e = this.get("isPlayerMuted"),
                        t = this.get("isSettingsMuted"),
                        n = this.get("isSystemMuted"),
                        a = t || e || n;
                    return this.animateMuteStatusUpdate(a), a
                })),
                topMostProgressedChallenge: s.Ember.computed("updatedChallenges", (function() {
                    const e = this.get("updatedChallenges") || {},
                        t = Object.values(e).filter((e => !e.isCapstone));
                    return (0, o.getFirstChallengeSlotScore)(t)
                })),
                showChallengeTooltipComparison: s.Ember.computed("localPlayerChallengesData", "isLocalPlayer", (function() {
                    const e = this.get("isLocalPlayer");
                    return this.get("localPlayerChallengesData") && !e
                })),
                updatedChallengeIcon: s.Ember.computed("topMostProgressedChallenge.levelToIconPath", "currentLevel", "nextLevel", (function() {
                    const e = this.get("topMostProgressedChallenge.levelToIconPath") || {},
                        t = this.get("currentLevel");
                    return e[t !== s.SharedChallengesConstants.CHALLENGE_LEVELS.NONE ? t : this.get("nextLevel")] || ""
                })),
                isInChatRoom: s.Ember.computed("chatMessages.summonerIdsInChat", "player.summonerId", (function() {
                    const e = this.get("player.summonerId");
                    return (this.get("chatMessages.summonerIdsInChat") || []).includes(e)
                })),
                showNotInChat: s.Ember.computed("isInChatRoom", "postgame.isLocalPlayerInGame", (function() {
                    const e = this.get("isInChatRoom"),
                        t = this.get("postgame.isLocalPlayerInGame");
                    return !e && t
                })),
                displayedPosition: s.Ember.computed("player.detectedPosition", "player.selectedPosition", (function() {
                    const e = this.get("player.detectedPosition"),
                        t = this.get("player.selectedPosition"),
                        n = (e || t || "").toLowerCase();
                    return "none" === n ? "" : n
                })),
                displayedPositionTranslatedText: s.Ember.computed("tra", "displayedPosition", (function() {
                    const e = this.get("displayedPosition");
                    return e ? this.get("tra").get(`postgame_scoreboard_lane_position_name_${e}`) : ""
                })),
                skinSplashStyle: s.Ember.computed("player.skinSplashPath", (function() {
                    return `background-image: url(${this.get("player.skinSplashPath")})`
                })),
                displayedAugments: s.Ember.computed("player.augments", (function() {
                    const e = this.get("player.augments") || [],
                        t = [];
                    for (let n = 0; n < r.NUMBER_AUGMENTS_TO_RENDER; ++n) {
                        const a = e[n] || 0;
                        t.push(a)
                    }
                    return t
                })),
                shouldShowButtons: s.Ember.computed("player.botPlayer", "player.isLocalPlayer", (function() {
                    return !this.get("player.botPlayer") && !this.get("player.isLocalPlayer")
                })),
                isFriendRequestDisabled: s.Ember.computed("player.summondId", "postgame.friendsList.[]", "playerActions.alreadyFriendRequestedList.[]", (function() {
                    const e = this.get("player.summonerId"),
                        t = this.get("playerActions.alreadyFriendRequestedList") || [],
                        n = this.get("postgame.friendsList") || [],
                        a = Boolean(n.find((t => t.summonerId === e))),
                        s = Boolean(t.find((t => t.summonerId === e)));
                    return a || s
                })),
                isReportDisabled: s.Ember.computed("player.puuid", "endOfGameService.reportedPlayers.[]", (function() {
                    const e = this.get("player.puuid");
                    return (this.get("endOfGameService.reportedPlayers") || []).includes(e)
                })),
                isInviteDisabled: s.Ember.computed("team.isPlayerTeam", "parties.enabled", "gameflow.canInviteOthersAtEog", "gameflow.lastQueuedMemberSummonerIds.[]", "player.summonerId", (function() {
                    return !(this.get("team.isPlayerTeam") && this.get("parties.enabled") && this.get("gameflow.canInviteOthersAtEog") && this.get("gameflow.lastQueuedMemberSummonerIds") && -1 === this.get("gameflow.lastQueuedMemberSummonerIds").indexOf(this.get("player.summonerId")))
                })),
                isPlayerBlocked: s.Ember.computed("playerActions.blockedPlayersList", "player.summonerId", (function() {
                    const e = this.get("playerActions.blockedPlayerList") || [],
                        t = this.get("player.summonerId");
                    return Boolean(e.find((e => e.summonerId === t)))
                })),
                flyoutOptions: s.Ember.computed("player", (function() {
                    return {
                        targetAnchor: {
                            x: "center",
                            y: "center"
                        },
                        tooltipAnchor: {
                            x: "center",
                            y: "center"
                        },
                        offset: {
                            x: -30,
                            y: 110
                        },
                        backdropCutout: null,
                        orientation: "right",
                        animated: !1,
                        caretless: !0,
                        closeWhenInsideClicked: !0
                    }
                })),
                shouldShowPlayerHonorComponent: s.Ember.computed("postgame.isLocalPlayerInGame", "honor.enabled", "isLeaver", "teamChoices.[]", "player.summonerId", (function() {
                    const e = this.get("teamChoices"),
                        t = this.get("player.puuid"),
                        n = this.get("postgame.isLocalPlayerInGame"),
                        a = this.get("honor.enabled"),
                        s = this.get("isLeaver");
                    return e && e.includes(t) && n && a && !s
                })),
                _initializeAnimationData() {
                    s.gsapCustomEase.create("muteIn", " M 0,0 C0.11,-0.56 0.18,1.11 0.5,1.11 0.61,1.06 0.68,1 1,1"), s.gsapCustomEase.create("muteOut", "M 0,0 C0.66,0 0.86,0 1,1")
                },
                animateMuteStatusUpdate(e) {
                    const t = this.element.querySelector("#mute-indicator");
                    if (!t) return;
                    this.get("isRowInitialized") ? this.animateMuteStatusToggle(e, t) : this.animateMuteStatusInit(e, t), this.set("prevIsPlayerMuted", e)
                },
                animateMuteStatusInit(e, t) {
                    this.set("isRowInitialized", !0), e ? s.gsap.to(t, 0, {
                        scale: 1
                    }) : s.gsap.to(t, 0, {
                        scale: 0
                    })
                },
                animateMuteStatusToggle(e, t) {
                    this.get("prevIsPlayerMuted") !== e && (e ? s.gsap.fromTo(t, .3, {
                        scale: 0
                    }, {
                        ease: "muteIn",
                        scale: 1
                    }) : s.gsap.fromTo(t, .3, {
                        scale: 1
                    }, {
                        ease: "muteOut",
                        scale: 0
                    }))
                },
                _getMuteStatus(e) {
                    const t = this.get("player.puuid"),
                        n = this.get("postgame.playerMuteStatus");
                    return !(!n || !(t in n)) && n[t][e]
                },
                actions: {
                    showPlayerActionsMenu: function() {
                        this.set("isPlayerActionsMenuOpen", !0)
                    },
                    hidePlayerActionsMenu: function() {
                        this.set("isPlayerActionsMenuOpen", !1)
                    },
                    sendFriendRequest: function(e) {
                        this.get("playerActions").sendFriendRequest(e.summonerName, e.displayName.playerNameFull, e.summonerId), this.playSound("sfx-uikit-click-generic.ogg")
                    },
                    inviteToParty: function(e) {
                        this.get("playerActions").inviteToParty(e)
                    },
                    showReportDialog: function(e) {
                        s.SharedReportModalApps.showReportModal(e, e.championSquarePortraitPath), this.playSound("sfx-uikit-click-generic.ogg")
                    },
                    confirmBlockPlayer: function(e) {
                        this.get("playerActions").confirmBlockPlayer(e.displayName.playerNameFull, e.summonerId)
                    },
                    viewProfile: function(e) {
                        this.get("playerActions").viewProfile(e.summonerId)
                    },
                    importItemSet: function(e) {
                        this.get("playerActions").importItemSet(e)
                    },
                    togglePlayerMute: function(e) {
                        const t = this.get("isPlayerMuted") || !1,
                            n = this.get("chatMessages"),
                            a = e.displayName.playerNameFull,
                            s = e.puuid;
                        n.updatePlayerMute(s, a, !t)
                    },
                    updateHonorCelebrationAnimation(e) {
                        this.sendAction("updateHonorCelebrationAnimation", e)
                    }
                }
            });
            t.default = c
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.MUTE_TYPES = void 0;
            t.MUTE_TYPES = {
                isPlayerMuted: "isPlayerMuted",
                isSettingsMuted: "isSettingsMuted",
                isSystemMuted: "isSystemMuted"
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a, s = n(1),
                o = n(111),
                l = n(133),
                i = (a = n(14)) && a.__esModule ? a : {
                    default: a
                };
            var r = s.Ember.Component.extend(i.default, {
                classNames: ["scoreboard-row-component"],
                classNameBindings: ["player.isLocalPlayer", "player.leaver", "team.isPlayerTeam:is-ally", "showNotInChat:not-in-chat"],
                endOfGameService: s.Ember.inject.service("end-of-game"),
                postgame: s.Ember.inject.service(),
                parties: s.Ember.inject.service(),
                gameflow: s.Ember.inject.service(),
                playerActions: s.Ember.inject.service(),
                chatMessages: s.Ember.inject.service(),
                honor: s.Ember.inject.service(),
                challenges: s.Ember.inject.service(),
                currentLevel: s.Ember.computed.alias("topMostProgressedChallenge.currentLevel"),
                nextLevel: s.Ember.computed.alias("topMostProgressedChallenge.nextLevel"),
                isLeaver: s.Ember.computed.bool("player.leaver"),
                teamChoices: s.Ember.computed.readOnly("honor.teamChoices"),
                localPlayerChallengesData: s.Ember.computed.readOnly("challenges.localPlayerChallengesData"),
                isRowInitialized: !1,
                hasScoreboardAnimationPlayed: !1,
                hasCelebratedHonor: !1,
                animationsEnabled: !0,
                init: function() {
                    this._super(...arguments), this.challengesBinding = (0, s.dataBinding)("/lol-challenges", s.socket), this.setupUpdatedChallengeListener(this.get("player")), this._initializeAnimationData()
                },
                willDestroyElement: function() {
                    this._super(...arguments), this.challengesBinding.unobserve(this.updatedChallengesPath, this)
                },
                setupUpdatedChallengeListener(e) {
                    return (0, s.dataBinding)("/lol-summoner").get(`/v1/summoners/${e.summonerId}`).then((e => {
                        if (e) {
                            const {
                                puuid: t,
                                gameName: n,
                                tagLine: a
                            } = e;
                            this.set("puuid", t), this.set("gameName", n), this.set("tagLine", a);
                            const s = this.get("gameId");
                            this.updatedChallengePath = `/lol-challenges/v1/updated-challenges/${s}/${t}`, this.challengesBinding.observe(`/v1/updated-challenges/${s}/${t}`, this, this.handleUpdatedChallenge)
                        }
                    }))
                },
                handleUpdatedChallenge(e) {
                    this.set("updatedChallenges", e)
                },
                isPlayerMuted: s.Ember.computed("postgame.playerMuteStatus", "player.puuid", (function() {
                    return this._getMuteStatus(l.MUTE_TYPES.isPlayerMuted)
                })),
                isSettingsMuted: s.Ember.computed("postgame.playerMuteStatus", "player.puuid", (function() {
                    return this._getMuteStatus(l.MUTE_TYPES.isSettingsMuted)
                })),
                isSystemMuted: s.Ember.computed("postgame.playerMuteStatus", "player.puuid", (function() {
                    return this._getMuteStatus(l.MUTE_TYPES.isSystemMuted)
                })),
                isPlayerMuteNotToggleable: s.Ember.computed.or("isSettingsMuted", "isSystemMuted"),
                isPlayerMuteToggleable: s.Ember.computed.not("isPlayerMuteNotToggleable"),
                showPlayerMute: s.Ember.computed("isPlayerMuted", "isSettingsMuted", (function() {
                    const e = this.get("isPlayerMuted"),
                        t = this.get("isSettingsMuted"),
                        n = this.get("isSystemMuted"),
                        a = t || e || n;
                    return this.animateMuteStatusUpdate(a), a
                })),
                topMostProgressedChallenge: s.Ember.computed("updatedChallenges", (function() {
                    const e = this.get("updatedChallenges") || {},
                        t = Object.values(e).filter((e => !e.isCapstone));
                    return (0, o.getFirstChallengeSlotScore)(t)
                })),
                showChallengeTooltipComparison: s.Ember.computed("localPlayerChallengesData", "isLocalPlayer", (function() {
                    const e = this.get("isLocalPlayer");
                    return this.get("localPlayerChallengesData") && !e
                })),
                updatedChallengeIcon: s.Ember.computed("topMostProgressedChallenge.levelToIconPath", "currentLevel", "nextLevel", (function() {
                    const e = this.get("topMostProgressedChallenge.levelToIconPath") || {},
                        t = this.get("currentLevel");
                    return e[t !== s.SharedChallengesConstants.CHALLENGE_LEVELS.NONE ? t : this.get("nextLevel")] || ""
                })),
                isInChatRoom: s.Ember.computed("chatMessages.summonerIdsInChat", "player.summonerId", (function() {
                    const e = this.get("player.summonerId");
                    return (this.get("chatMessages.summonerIdsInChat") || []).includes(e)
                })),
                showNotInChat: s.Ember.computed("isInChatRoom", "postgame.isLocalPlayerInGame", (function() {
                    const e = this.get("isInChatRoom"),
                        t = this.get("postgame.isLocalPlayerInGame");
                    return !e && t
                })),
                displayedPosition: s.Ember.computed("player.detectedPosition", "player.selectedPosition", (function() {
                    const e = this.get("player.detectedPosition"),
                        t = this.get("player.selectedPosition"),
                        n = (e || t || "").toLowerCase();
                    return "none" === n ? "" : n
                })),
                displayedPositionTranslatedText: s.Ember.computed("tra", "displayedPosition", (function() {
                    const e = this.get("displayedPosition");
                    return e ? this.get("tra").get(`postgame_scoreboard_lane_position_name_${e}`) : ""
                })),
                skinSplashStyle: s.Ember.computed("player.skinSplashPath", (function() {
                    return `background-image: url(${this.get("player.skinSplashPath")})`
                })),
                shouldShowButtons: s.Ember.computed("player.botPlayer", "player.isLocalPlayer", (function() {
                    return !this.get("player.botPlayer") && !this.get("player.isLocalPlayer")
                })),
                isFriendRequestDisabled: s.Ember.computed("player.summondId", "postgame.friendsList.[]", "playerActions.alreadyFriendRequestedList.[]", (function() {
                    const e = this.get("player.summonerId"),
                        t = this.get("playerActions.alreadyFriendRequestedList") || [],
                        n = this.get("postgame.friendsList") || [],
                        a = Boolean(n.find((t => t.summonerId === e))),
                        s = Boolean(t.find((t => t.summonerId === e)));
                    return a || s
                })),
                isReportDisabled: s.Ember.computed("gameflow.isCustomGame", "player.puuid", "endOfGameService.reportedPlayers.[]", (function() {
                    if (this.get("gameflow.isCustomGame")) return !0;
                    const e = this.get("player.puuid");
                    return (this.get("endOfGameService.reportedPlayers") || []).includes(e)
                })),
                isInviteDisabled: s.Ember.computed("team.isPlayerTeam", "parties.enabled", "gameflow.canInviteOthersAtEog", "gameflow.lastQueuedMemberSummonerIds.[]", "player.summonerId", (function() {
                    return !(this.get("team.isPlayerTeam") && this.get("parties.enabled") && this.get("gameflow.canInviteOthersAtEog") && this.get("gameflow.lastQueuedMemberSummonerIds") && -1 === this.get("gameflow.lastQueuedMemberSummonerIds").indexOf(this.get("player.summonerId")))
                })),
                isPlayerBlocked: s.Ember.computed("playerActions.blockedPlayersList", "player.summonerId", (function() {
                    const e = this.get("playerActions.blockedPlayerList") || [],
                        t = this.get("player.summonerId");
                    return Boolean(e.find((e => e.summonerId === t)))
                })),
                flyoutOptions: s.Ember.computed("player", (function() {
                    return {
                        targetAnchor: {
                            x: "center",
                            y: "center"
                        },
                        tooltipAnchor: {
                            x: "center",
                            y: "center"
                        },
                        offset: {
                            x: -30,
                            y: 110
                        },
                        backdropCutout: null,
                        orientation: "right",
                        animated: !1,
                        caretless: !0,
                        closeWhenInsideClicked: !0
                    }
                })),
                shouldShowPlayerHonorComponent: s.Ember.computed("postgame.isLocalPlayerInGame", "honor.enabled", "isLeaver", "teamChoices.[]", "player.summonerId", (function() {
                    const e = this.get("teamChoices"),
                        t = this.get("player.puuid"),
                        n = this.get("postgame.isLocalPlayerInGame"),
                        a = this.get("honor.enabled"),
                        s = this.get("isLeaver");
                    return e && e.includes(t) && n && a && !s
                })),
                _initializeAnimationData() {
                    s.gsapCustomEase.create("muteIn", " M 0,0 C0.11,-0.56 0.18,1.11 0.5,1.11 0.61,1.06 0.68,1 1,1"), s.gsapCustomEase.create("muteOut", "M 0,0 C0.66,0 0.86,0 1,1")
                },
                animateMuteStatusUpdate(e) {
                    const t = this.element.querySelector("#mute-indicator");
                    if (!t) return;
                    this.get("isRowInitialized") ? this.animateMuteStatusToggle(e, t) : this.animateMuteStatusInit(e, t), this.set("prevIsPlayerMuted", e)
                },
                animateMuteStatusInit(e, t) {
                    this.set("isRowInitialized", !0), e ? s.gsap.to(t, 0, {
                        scale: 1
                    }) : s.gsap.to(t, 0, {
                        scale: 0
                    })
                },
                animateMuteStatusToggle(e, t) {
                    this.get("prevIsPlayerMuted") !== e && (e ? s.gsap.fromTo(t, .3, {
                        scale: 0
                    }, {
                        ease: "muteIn",
                        scale: 1
                    }) : s.gsap.fromTo(t, .3, {
                        scale: 1
                    }, {
                        ease: "muteOut",
                        scale: 0
                    }))
                },
                _getMuteStatus(e) {
                    const t = this.get("player.puuid"),
                        n = this.get("postgame.playerMuteStatus");
                    return !(!n || !(t in n)) && n[t][e]
                },
                actions: {
                    showPlayerActionsMenu: function() {
                        this.set("isPlayerActionsMenuOpen", !0)
                    },
                    hidePlayerActionsMenu: function() {
                        this.set("isPlayerActionsMenuOpen", !1)
                    },
                    sendFriendRequest: function(e) {
                        this.get("playerActions").sendFriendRequest(e.summonerName, e.displayName.playerNameFull, e.summonerId), this.playSound("sfx-uikit-click-generic.ogg")
                    },
                    inviteToParty: function(e) {
                        this.get("playerActions").inviteToParty(e)
                    },
                    showReportDialog: function(e) {
                        s.SharedReportModalApps.showReportModal(e, e.championSquarePortraitPath), this.playSound("sfx-uikit-click-generic.ogg")
                    },
                    confirmBlockPlayer: function(e) {
                        this.get("playerActions").confirmBlockPlayer(e.displayName.playerNameFull, e.summonerId)
                    },
                    viewProfile: function(e) {
                        this.get("playerActions").viewProfile(e.summonerId)
                    },
                    importItemSet: function(e) {
                        this.get("playerActions").importItemSet(e)
                    },
                    togglePlayerMute: function(e) {
                        const t = this.get("isPlayerMuted") || !1,
                            n = this.get("chatMessages"),
                            a = e.displayName.playerNameFull,
                            s = e.puuid;
                        n.updatePlayerMute(s, a, !t)
                    },
                    updateHonorCelebrationAnimation(e) {
                        this.sendAction("updateHonorCelebrationAnimation", e)
                    }
                }
            });
            t.default = r
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            const s = "togglePlayerMuteOff",
                o = "togglePlayerMuteOn";
            var l = a.Ember.Component.extend({
                classNames: ["scoreboard-row-actions-menu-component"],
                actionOptions: a.Ember.computed("isItemSetsDisabled", "isFriendRequestDisabled", "isPlayerBlocked", "isReportDisabled", "isPlayerMuted", "isPlayerMuteToggleable", (function() {
                    const e = this.get("isPlayerMuted") || !1,
                        t = e ? s : o,
                        n = e ? this.get("tra.postgame_context_menu_unmute") : this.get("tra.postgame_context_menu_mute"),
                        a = this.get("isPlayerMuteToggleable");
                    return [{
                        actionName: "inviteToParty",
                        label: this.get("tra.postgame_scorecard_invite_to_party"),
                        disabled: this.get("isPlayerBlocked")
                    }, {
                        actionName: "sendFriendRequest",
                        label: this.get("tra.postgame_context_menu_add_friend"),
                        disabled: this.get("isFriendRequestDisabled")
                    }, {
                        actionName: "viewProfile",
                        label: this.get("tra.postgame_context_menu_view_profile")
                    }, {
                        actionName: "importItemSet",
                        label: this.get("tra.postgame_context_menu_import_item_set"),
                        disabled: this.get("isItemSetsDisabled")
                    }, {
                        actionName: t,
                        label: n,
                        disabled: !a
                    }, {
                        actionName: "confirmBlockPlayer",
                        label: this.get("tra.postgame_context_menu_block"),
                        disabled: this.get("isPlayerBlocked")
                    }, {
                        actionName: "showReportDialog",
                        label: this.get("tra.postgame_context_menu_report"),
                        disabled: this.get("isReportDisabled")
                    }]
                })),
                actions: {
                    handleButtonClick(e, t) {
                        e.actionName === s || e.actionName === o ? this.sendAction("togglePlayerMute", t) : this.sendAction(e.actionName, t)
                    }
                }
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = n(3),
                o = n(128);
            const l = [s.STAT_SWITCHER_STATS.DAMAGE_DEALT, s.STAT_SWITCHER_STATS.DAMAGE_TAKEN, s.STAT_SWITCHER_STATS.CC_SCORE],
                i = [s.STAT_SWITCHER_STATS.GOLD, s.STAT_SWITCHER_STATS.CREEP_SCORE, s.STAT_SWITCHER_STATS.VISION_SCORE],
                r = [s.STAT_SWITCHER_STATS.GOLD, s.STAT_SWITCHER_STATS.DAMAGE_DEALT],
                c = {};
            c[s.STAT_SWITCHER_STATS.CREEP_SCORE] = 1, c[s.STAT_SWITCHER_STATS.VISION_SCORE] = 1;
            var m = a.Ember.Component.extend({
                classNames: ["scoreboard-row-stat-display-component"],
                classNameBindings: ["statName"],
                hasScoreboardAnimationPlayed: !1,
                animationsEnabled: !0,
                animatedStatLinePrimary: "0",
                showStatAnimations: !1,
                didInsertElement() {
                    this._super(...arguments), !this.get("hasScoreboardAnimationPlayed") && this.get("animationsEnabled") && a.Ember.run.scheduleOnce("afterRender", this, this._playIntroStatAnimation)
                },
                willDestroyElement() {
                    this._super(...arguments);
                    const e = this.get("animationTimeline");
                    e && e.kill()
                },
                showStatNumberAnimation: a.Ember.computed("statName", "player.stats", "showStatAnimations", (function() {
                    const e = this.get("statName") || "",
                        t = this.get("player.stats");
                    return !(!e || !t) && (r.includes(e) && this.get("showStatAnimations"))
                })),
                primaryStatValue: a.Ember.computed("statName", "player.stats", "tra.ready", (function() {
                    const e = this.get("statName") || "",
                        t = this.get("player.stats");
                    let n = 0;
                    return e && t ? e === s.STAT_SWITCHER_STATS.INDIVIDUAL_KDA ? (0, o.getKdaFull)(t, this.get("tra")) : (n = e === s.STAT_SWITCHER_STATS.CREEP_SCORE ? t[e] + t[s.STAT_SWITCHER_STATS.NEUTRAL_MINIONS_SLAIN] || 0 : t[e] || 0, n) : 0
                })),
                statLinePrimary: a.Ember.computed("primaryStatValue", (function() {
                    return this.get("primaryStatValue").toLocaleString(this.get("locale"))
                })),
                statLineSecondary: a.Ember.computed("statName", "player.stats", "gameLengthSeconds", "tra.ready", (function() {
                    const e = this.get("statName"),
                        t = this.get("player.stats");
                    if (e && t) {
                        if (e === s.STAT_SWITCHER_STATS.INDIVIDUAL_KDA) return (0, o.getKdaDecimal)(t, this.get("tra"));
                        if (i.includes(e)) {
                            const n = Math.max((this.get("gameLengthSeconds") || 0) / 60, 1),
                                a = this.get("tra"),
                                o = c[e] || 0;
                            let l = t[e] || 0;
                            return e === s.STAT_SWITCHER_STATS.CREEP_SCORE && (l += t[s.STAT_SWITCHER_STATS.NEUTRAL_MINIONS_SLAIN] || 0), a.formatString("postgame_scoreboard_stat_display_stat_per_minute", {
                                statValue: Number((l / n).toFixed(o))
                            })
                        }
                        return t[e]
                    }
                    return ""
                })),
                showHighestStatValueAchiever: a.Ember.computed.and("isHighestStatValueAchiever", "isSecondaryDisplayLineGraph"),
                isHighestStatValueAchiever: a.Ember.computed("highestStatValue", "player.stats", "statName", (function() {
                    const e = this.get("statName");
                    return this.get("highestStatValue") === this.get(`player.stats.${e}`) && 0 !== this.get("highestStatValue")
                })),
                highestStatValue: a.Ember.computed("highestStatValueByStatMap", "statName", (function() {
                    const e = this.get("statName");
                    return this.get(`highestStatValueByStatMap.${e}`) || 0
                })),
                teamHighestStatValue: a.Ember.computed("statName", "team.players.@each.stats", (function() {
                    let e = 0;
                    const t = this.get("statName");
                    return (this.get("team.players") || []).forEach((n => {
                        const s = a.Ember.get(n, `stats.${t}`) || 0;
                        e = Math.max(e, s)
                    })), e
                })),
                barScaleValue: a.Ember.computed("statName", "teamHighestStatValue", "player.stats", (function() {
                    const e = this.get("statName"),
                        t = this.get(`player.stats.${e}`) || 0,
                        n = this.get("teamHighestStatValue");
                    let a = 0;
                    return n > 0 && (a = Math.max(t / n, .1)), a
                })),
                graphFillStyle: a.Ember.computed("barScaleValue", (function() {
                    return `transform: scaleX(${this.get("barScaleValue")})`
                })),
                selectedStatLoc: a.Ember.computed("tra.isReady", "statName", (function() {
                    const e = this.get("statName");
                    return this.get(`tra.postgame_scoreboard_stat_display_tooltip_${e}`)
                })),
                isSecondaryDisplayLineGraph: a.Ember.computed("statName", (function() {
                    return l.includes(this.get("statName"))
                })),
                _playIntroStatAnimation() {
                    const e = this.get("primaryStatValue"),
                        t = this.get("barScaleValue"),
                        n = {
                            amount: 0
                        },
                        s = a.gsapCustomEase.create("custom", "M 0,0 C1,0 0,1 1,1"),
                        o = this.$(".scoreboard-row-stat-graph-fill");
                    let l = this.get("animationTimeline");
                    l && l.isActive() && l.kill(), l = new a.gsap.TimelineMax({
                        paused: !0
                    }), l.to(n, .43, {
                        amount: e,
                        ease: s,
                        onUpdate: () => {
                            this.set("animatedStatLinePrimary", Math.round(n.amount).toLocaleString(this.get("locale")))
                        },
                        onComplete: () => {
                            this.set("showStatAnimations", !1)
                        }
                    }, "start+=0.90"), o && l.fromTo(o, .43, {
                        css: {
                            scaleX: 0
                        },
                        ease: s
                    }, {
                        css: {
                            scaleX: t
                        }
                    }, "start+=0.90"), this.set("animationTimeline", l), this.set("showStatAnimations", !0), l.play()
                }
            });
            t.default = m
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Component.extend({
                    classNames: ["scoreboard-stat-switcher-component"],
                    classNameBindings: ["selectedStat"],
                    init: function() {
                        this._super(...arguments), this.set("currentIndex", 0)
                    },
                    selectedStatLoc: a.Ember.computed("tra.isReady", "selectedStat", (function() {
                        const e = this.get("selectedStat");
                        return this.get(`tra.postgame_scoreboard_stat_display_tooltip_${e}`)
                    })),
                    getNewSelectedStat(e) {
                        const t = this.get("options") || [];
                        if (!(e >= t.length)) return t[e]
                    },
                    actions: {
                        scroll(e) {
                            const t = this.get("currentIndex"),
                                n = this.get("options.length"),
                                a = (t + e + n) % n,
                                s = this.getNewSelectedStat(a);
                            this.set("currentIndex", a), this.sendAction("selectStat", s, this.get("ordinal"))
                        }
                    }
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                s = a.Ember.Component.extend({
                    classNames: ["scoreboard-spell-component"],
                    classNameBindings: ["isSmall"],
                    postgame: a.Ember.inject.service(),
                    spellData: a.Ember.computed("spellId", "postgame.summonerSpells", (function() {
                        return (this.get("postgame.summonerSpells") || []).find((e => e.id === this.get("spellId")))
                    }))
                });
            t.default = s
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "4VI1xlqF",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\render-timer.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["block",["if"],[["get",["isTimeToShow"]]],null,0]],"locals":[],"named":[],"yields":["default"],"blocks":[{"statements":[["text","  "],["yield","default"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "W2TQpbde",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\eternals-token.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type","pseudoPartSelector"],["right","system","eternals-item-tooltip"]],3],["open-element","div",[]],["static-attr","class","progression-modal-eternals-token-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","progression-modal-eternals-token"],["flush-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","eternals-token-img"],["dynamic-attr","src",["unknown",["eternal","imageUrl"]],null],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["isPersonalBest"]]],null,2,1],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","progresion-modal-eternals-footer"],["flush-element"],["text","\\n            "],["open-element","img",[]],["static-attr","class","eternals-icon"],["static-attr","src","/fe/lol-postgame/icon-milestone.svg"],["flush-element"],["close-element"],["text","\\n            "],["append",["unknown",["eternal","level"]],false],["text","\\n        "],["close-element"],["text","\\n    "]],"locals":[]},{"statements":[["block",["if"],[["get",["isNewMilestone"]]],null,0]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","progresion-modal-eternals-footer"],["flush-element"],["text","\\n            "],["open-element","img",[]],["static-attr","class","eternals-icon"],["static-attr","src","/fe/lol-postgame/icon-target.svg"],["flush-element"],["close-element"],["text","\\n            "],["append",["unknown",["eternal","value"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["eternals-item-tooltip"],null,[["eternal","index","isLevelFiveOrGreater","leftHeaderValue"],[["get",["eternal"]],["get",["index"]],["get",["isLevelFiveOrGreater"]],["get",["headerValue"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "j23WM+wr",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\postgame-root.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","postgame-contents"],["flush-element"],["text","\\n"],["block",["if"],[["get",["shouldShowGameClientStats"]]],null,13,9],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["postgame-header-section ",["helper",["if"],[["get",["isProgressionTabSelected"]],"progression-tab"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","postgame-header-background"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","postgame-header-container"],["flush-element"],["text","\\n    "],["append",["helper",["postgame-header"],null,[["gameId"],[["get",["gameId"]]]]],false],["text","\\n    "],["open-element","div",[]],["static-attr","class","postgame-header-button-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showAddPerksPageButton"]]],null,5],["block",["if"],[["get",["postgame","isLocalPlayerInGame"]]],null,4],["block",["unless"],[["get",["shouldShowGameClientStats"]]],null,3],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","postgame-footer"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","left-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","chat-container"],["flush-element"],["text","\\n      "],["open-element","lol-social-chat-room",[]],["static-attr","class","scoreboard-v2"],["static-attr","type","postGame"],["dynamic-attr","placeholder",["concat",[["unknown",["tra","postgame_chat_placeholder"]]]]],["static-attr","can-hide-player-messages",""],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","center-container"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-close-button",[]],["static-attr","class","postgame-footer-exit-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"exitPostgame"],null],null],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","find-match-button-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","find-match-button-decoration find-match-button-decoration-left"],["flush-element"],["close-element"],["text","\\n"],["block",["unless"],[["get",["animationsEnabled"]]],null,1,0],["text","      "],["open-element","div",[]],["static-attr","class","find-match-button-decoration find-match-button-decoration-right"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["career-postgame-countdown-meter-container ",["helper",["if"],[["get",["hasTimer"]],"visible"],null]]]],["flush-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","career-postgame-countdown-meter-background"],["static-attr","src","/fe/lol-postgame/countdown_meter_bg.svg"],["flush-element"],["close-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","career-postgame-countdown-meter"],["static-attr","src","/fe/lol-postgame/countdown_meter.svg"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["append",["helper",["postgame-party-status-v2"],null,[["partyStatus","animationsEnabled"],[["get",["partyStatus"]],["get",["animationsEnabled"]]]]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","right-container"],["flush-element"],["text","\\n    "],["append",["unknown",["postgame-scoreboard-progression-honor-notification"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["append",["helper",["postgame-sub-navigation"],null,[["tabs","onSelect"],[["get",["tabs"]],["helper",["action"],[["get",[null]],"handleTabSelected"],null]]]],false],["text","\\n"],["open-element","div",[]],["static-attr","class","postgame-progression-lottie-outline"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-lottie",[]],["static-attr","id","lottie-outline-anim"],["static-attr","src","/fe/lol-static-assets/lottie/postgame/postgame-screen-border.json"],["static-attr","autoplay","false"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["helper",["animated-play-button"],null,[["onClick","hasIntroAnimationPlayed","buttonText","baseImgPath","overImgPath","downImgPath","onHoverSound","onClickSound","clickedStyle","partyStatus"],[["helper",["action"],[["get",[null]],"onButtonClick"],null],["get",["hasIntroAnimationPlayed"]],["get",["forwardButtonText"]],"/fe/lol-static-assets/images/buttons/find_match_default.png","/fe/lol-static-assets/images/buttons/find_match_hover.png","/fe/lol-static-assets/images/buttons/find_match_active.png",["get",["forwardHoverSound"]],["get",["forwardClickSound"]],"color: #005A82",["get",["partyStatus"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["generic-button"],null,[["onClick","baseImgPath","overImgPath","downImgPath","upText","overText","downText","onHoverSound","onClickSound"],[["helper",["action"],[["get",[null]],"onButtonClick"],null],"/fe/lol-postgame/button-find-match.png","/fe/lol-postgame/button-find-match-over.png","/fe/lol-postgame/button-find-match-down.png",["get",["forwardButtonText"]],["get",["forwardButtonText"]],["get",["forwardButtonText"]],["get",["forwardHoverSound"]],["get",["forwardClickSound"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","postgame-match-history-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"displayAdvancedDetails"],null],null],["flush-element"],["text","\\n            "],["append",["unknown",["tra","postgame_scoreboard_view_advanced_details"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["unless"],[["get",["isDetailsTabOpen"]]],null,2]],"locals":[]},{"statements":[["text","        "],["append",["unknown",["postgame-scoreboard-replay-button"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","add-perks-page-button-container"],["flush-element"],["text","\\n          "],["append",["helper",["generic-button"],null,[["onClick","baseImgPath","overImgPath","downImgPath","disabledImgPath","tooltipText","disabledTooltipText","isEnabled","onHoverSound","onClickSound"],[["helper",["action"],[["get",[null]],"addPerksPage"],null],"/fe/lol-postgame/add-rune-page.png","/fe/lol-postgame/add-rune-page.png","/fe/lol-postgame/add-rune-page-disabled.png","/fe/lol-postgame/add-rune-page-disabled.png",["get",["tra","perks_add_rune_page_button"]],["get",["addRunePageButtonDisabledText"]],["get",["addPerksPageButtonEnabled"]],["get",["forwardHoverSound"]],["get",["forwardClickSound"]]]]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["scoreboard-root"],null,[["eogStats","showKeystone","hasScoreboardAnimationPlayed","hasCelebratedHonor","isContinueButtonClicked","updateHonorCelebrationAnimation","updateScoreboardAnimation"],[["get",["eogStats"]],["get",["gameflow","showKeystone"]],["get",["hasScoreboardAnimationPlayed"]],["get",["hasCelebratedHonor"]],["get",["isContinueButtonClicked"]],["helper",["action"],[["get",[null]],"updateHonorCelebrationAnimation"],null],["helper",["action"],[["get",[null]],"updateScoreboardAnimation"],null]]]],false],["text","\\n    "]],"locals":[]},{"statements":[["block",["if"],[["get",["isScoreboardTabSelected"]]],null,6]],"locals":[]},{"statements":[["text","      "],["append",["helper",["postgame-progression"],null,[["eogStats","updatedChallenges","summonerIconPath","willAnimate","playOutlineAnimation"],[["get",["eogStats"]],["get",["updatedChallenges"]],["get",["summonerIconPath"]],["get",["isAnimating"]],["helper",["action"],[["get",[null]],"playOutlineAnimation"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isProgressionTabSelected"]]],null,8,7]],"locals":[]},{"statements":[["text","      "],["append",["helper",["scoreboard-root"],null,[["eogStats","showKeystone","hasScoreboardAnimationPlayed","hasCelebratedHonor","isContinueButtonClicked","updateHonorCelebrationAnimation","updateScoreboardAnimation"],[["get",["gameClientStats"]],["get",["gameflow","showKeystone"]],["get",["hasScoreboardAnimationPlayed"]],["get",["hasCelebratedHonor"]],["get",["isContinueButtonClicked"]],["helper",["action"],[["get",[null]],"updateHonorCelebrationAnimation"],null],["helper",["action"],[["get",[null]],"updateScoreboardAnimation"],null]]]],false],["text","    \\n    "]],"locals":[]},{"statements":[["block",["if"],[["get",["isScoreboardTabSelected"]]],null,10]],"locals":[]},{"statements":[["text","      "],["append",["helper",["postgame-progression"],null,[["eogStats","updatedChallenges","summonerIconPath","willAnimate","playOutlineAnimation","shouldHidePrestigeProgression"],[["get",["gameClientStats"]],["get",["updatedChallenges"]],["get",["summonerIconPath"]],["get",["isAnimating"]],["helper",["action"],[["get",[null]],"playOutlineAnimation"],null],["get",["shouldShowGameClientStats"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isProgressionTabSelected"]]],null,12,11]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "lVMsx9Ap",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\postgame-sub-navigation.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","lol-uikit-navigation-bar",[]],["static-attr","type","nav-bar-secondary"],["static-attr","class","postgame-sub-navigation-container"],["flush-element"],["text","\\n"],["block",["each"],[["helper",["-each-in"],[["get",["tabs"]]],null]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["modifier",["action"],[["get",[null]],"selectTab",["get",["index"]]]],["flush-element"],["text","\\n    "],["open-element","lol-uikit-navigation-item",[]],["dynamic-attr","active",["concat",[["helper",["if"],[["get",["tab","selected"]],"true"],null]]]],["flush-element"],["text","\\n      "],["append",["unknown",["tab","name"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["index","tab"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "3doy971S",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\postgame-progression.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["block",["render-telemetry-sender"],null,[["renderEventName","shouldSendTelemetry"],[["get",["renderEventName"]],["get",["shouldSendTelemetry"]]]],9]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lc-modal",[]],["dynamic-attr","open",["unknown",["showProgressionModal"]],null],["dynamic-attr","onHide",["helper",["action"],[["get",[null]],"closeModal"],null],null],["flush-element"],["text","\\n      "],["open-element","lc-modal-content",[]],["flush-element"],["text","\\n        "],["append",["helper",["progression-modal"],null,[["challenges","eternals","groupedChallenges","groupedEternals","showEternalsData","showChallengesData","closeModal"],[["get",["allChallengeUpdates"]],["get",["allEternalsUpdates"]],["get",["groupedChallenges"]],["get",["groupedEternals"]],["get",["showProgressedEternalsData"]],["get",["showProgressedChallengesData"]],["helper",["action"],[["get",[null]],"closeModal"],null]]]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["challenge-update-container"],null,[["challenges","eternals","groupedChallenges","groupedEternals","items","willAnimate","openModal","playOutlineAnimation"],[["get",["allChallengeUpdates"]],["get",["allEternalsUpdates"]],["get",["challengesMap"]],["get",["eternalsMap"]],["get",["showcasedEoGUpdateSlots"]],["get",["willAnimate"]],["helper",["action"],[["get",[null]],"openModal"],null],["helper",["action"],[["get",[null]],"playOutlineAnimation"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["mastery-progression"],null,[["championMasteryUpdates","isSmall","willAnimate"],[["get",["championMasteryUpdates"]],["get",["eogStats","ranked"]],["get",["willAnimate"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["ranked-progression"],null,[["tier","division","leaguePointsDelta","leaguePoints","consolationLpUsed","afkLpPenaltyAmount","miniseriesProgress","notifyReason","isLossPrevented","isWin","provisionalGamesRemaining","willAnimate"],[["get",["leaguesNotification","tier"]],["get",["leaguesNotification","division"]],["get",["leaguesNotification","leaguePointsDelta"]],["get",["leaguesNotification","leaguePoints"]],["get",["leaguesNotification","consolationLpUsed"]],["get",["leaguesNotification","afkLpPenaltyAmount"]],["get",["leaguesNotification","miniseriesProgress"]],["get",["leaguesNotification","notifyReason"]],["get",["isLossPrevented"]],["get",["isWin"]],["get",["leaguesNotification","provisionalGamesRemaining"]],["get",["willAnimate"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["cherry-progression"],null,[["ratedTier","ratedRating","ratedRatingDelta","notifyReason","isLossPrevented","isWin","willAnimate","leftSpacing"],[["get",["leaguesNotification","ratedTier"]],["get",["leaguesNotification","ratedRating"]],["get",["leaguesNotification","ratedRatingDelta"]],["get",["leaguesNotification","notifyReason"]],["get",["isLossPrevented"]],["get",["isWin"]],["get",["willAnimate"]],["get",["shouldShowPrestigeProgression"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isCherry"]]],null,4,3]],"locals":[]},{"statements":[["text","      "],["append",["helper",["prestige-progression"],null,[["isLarge","eogStats","summonerIconPath","isRanked","isCherry","willAnimate"],[["get",["isPrestigeProgressionLarge"]],["get",["eogStats"]],["get",["summonerIconPath"]],["get",["isRanked"]],["get",["isCherry"]],["get",["willAnimate"]]]]],false],["text","\\n    "]],"locals":[]},{"statements":[["block",["if"],[["get",["shouldShowPrestigeProgression"]]],null,6]],"locals":[]},{"statements":[["text","      "],["append",["helper",["ranked-reward-progression"],null,[["willAnimate","leaguesNotification"],[["get",["willAnimate"]],["get",["leaguesNotification"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","postgame-champion-background-wrapper"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","postgame-champion-background-mask"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","postgame-champion-background"],["dynamic-attr","src",["concat",[["unknown",["eogStats","localPlayer","skinSplashPath"]]]]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","progression-screen-header"],["flush-element"],["text","\\n"],["block",["if"],[["get",["shouldShowRankedRewardProgression"]]],null,8,7],["block",["if"],[["get",["leaguesNotification"]]],null,5],["block",["if"],[["get",["shouldShowMasteryProgression"]]],null,2],["text","  "],["close-element"],["text","\\n"],["block",["if"],[["get",["showcasedEoGUpdateSlots"]]],null,1],["block",["if"],[["get",["showProgressionModal"]]],null,0]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "ttdFAxs+",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\prestige-progression.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","prestige-progression-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["animated-radial ",["helper",["if"],[["get",["showAnimatedElements"]],"visible"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","radial-fill"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-lottie",[]],["static-attr","class","lottie-radial-fill"],["dynamic-attr","src",["unknown",["lottieBarFillPath"]],null],["dynamic-attr","param-current-exp",["unknown",["lottieRadialOldPercent"]],null],["dynamic-attr","param-new-exp",["unknown",["lottieRadialNewPercent"]],null],["static-attr","autoplay","false"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["unless"],[["get",["showAnimatedElements"]]],null,3],["text","  "],["open-element","div",[]],["static-attr","class","summoner-icon-container"],["flush-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","summoner-icon"],["dynamic-attr","src",["unknown",["summonerIconPath"]],null],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","summoner-icon-frame"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","summoner-level-plate"],["flush-element"],["append",["unknown",["playerLevel"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["right","system"]],2],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","prestige-progression-details"],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["prestige-progression-xp-gained ",["helper",["if"],[["get",["isCherry"]],"align-higher"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["willAnimate"]]],null,1,0],["text","    "],["open-element","lol-uikit-video",[]],["static-attr","class","points-gained-spark-small-video"],["static-attr","src","/fe/lol-static-assets/videos/challenges/postgame/postgame-spark-small.webm"],["static-attr","fade-in","0"],["static-attr","fade-out","0"],["static-attr","perf-flags","largeAreaAnimationsEnabled"],["flush-element"],["close-element"],["text","\\n    "],["open-element","lol-uikit-video",[]],["static-attr","class","points-gained-spark-medium-video"],["static-attr","src","/fe/lol-static-assets/videos/challenges/postgame/postgame-spark-medium.webm"],["static-attr","fade-in","0"],["static-attr","fade-out","0"],["static-attr","perf-flags","largeAreaAnimationsEnabled"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","prestige-progression-level-label"],["flush-element"],["append",["unknown",["tra","career_postgame_progress_xp_level_label"]],false],["close-element"],["text","\\n\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["unknown",["playerXpGainLoc"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["animatedPointsText"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["prestige-progression-tooltip"],null,[["xpSources","xpEarned","xpTotal","nextLevelXpRequired","level"],[["get",["xpSources"]],["get",["xpEarned"]],["get",["xpTotal"]],["get",["nextLevelXpRequired"]],["get",["playerLevel"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-radial-progress",[]],["static-attr","class","prestige-progression-radial-progress"],["static-attr","type","custom"],["dynamic-attr","percent",["concat",[["unknown",["radialProgressPercent"]]]]],["static-attr","start-angle","-135"],["static-attr","end-angle","-405"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","slot","bottom"],["static-attr","class","prestige-progression-radial radial-bottom "],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","slot","middle"],["static-attr","class","prestige-progression-radial radial-middle"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "N7geYRZT",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\prestige-progression-tooltip.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","prestige-progression-tooltip-header"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","prestige-progression-summoner-level"],["flush-element"],["append",["unknown",["summonerLevelLoc"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","prestige-progression-xp-total"],["flush-element"],["append",["unknown",["xpTotalLoc"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","hr",[]],["static-attr","class","prestige-progression-tooltip-divider"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","prestige-progression-tooltip-sources-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","prestige-progression-tooltip-sources-label"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","career_postgame_progress_tooltip_sources_header_label"]],false],["text","\\n  "],["close-element"],["text","\\n"],["block",["each"],[["get",["xpSources"]]],null,1],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","prestige-progression-source-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","prestige-progression-source-value"],["flush-element"],["append",["unknown",["xpSource","valueLoc"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","prestige-progression-source-type-loc"],["flush-element"],["append",["unknown",["xpSource","typeLoc"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["xpSource","shouldShow"]]],null,0]],"locals":["xpSource"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "fZIPLWsM",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\mastery-progression.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["mastery-progression-container ",["helper",["if"],[["get",["isChampionMasteryAvailable"]],"visible"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","mastery-progression-main"],["flush-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["animated-radial ",["helper",["if"],[["get",["showAnimatedElements"]],"visible"],null]]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","radial-fill"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-lottie",[]],["static-attr","class","lottie-radial-fill"],["dynamic-attr","src",["unknown",["lottieBarFillPath"]],null],["dynamic-attr","param-current-exp",["unknown",["lottieRadialCurrentPercent"]],null],["dynamic-attr","param-new-exp",["unknown",["lottieRadialNewPercent"]],null],["static-attr","autoplay","false"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["unless"],[["get",["showAnimatedElements"]]],null,8],["text","    "],["open-element","div",[]],["static-attr","class","mastery-progression-icon-wrapper"],["flush-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["mastery-progression-icon mastery-level-",["unknown",["masteryLevel"]]]]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","mastery-progression-details"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","mastery-progression-grade"],["flush-element"],["append",["unknown",["grade"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["isMastery5or6"]]],null,7],["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["mastery-experience-gained ",["helper",["if"],[["get",["isMastery5or6"]],"isMastery5or6"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["willAnimate"]]],null,4,3],["text","      "],["open-element","lol-uikit-video",[]],["static-attr","class","points-gained-spark-small-video"],["static-attr","src","/fe/lol-static-assets/videos/challenges/postgame/postgame-spark-small.webm"],["static-attr","fade-in","0"],["static-attr","fade-out","0"],["static-attr","preload",""],["static-attr","perf-flags","largeAreaAnimationsEnabled"],["flush-element"],["close-element"],["text","\\n      "],["open-element","lol-uikit-video",[]],["static-attr","class","points-gained-spark-medium-video"],["static-attr","src","/fe/lol-static-assets/videos/challenges/postgame/postgame-spark-medium.webm"],["static-attr","fade-in","0"],["static-attr","fade-out","0"],["static-attr","preload",""],["static-attr","perf-flags","largeAreaAnimationsEnabled"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["showMastery5or6Text"]]],null,2,1],["block",["if"],[["get",["achievedMastery5"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","mastery-progression-mastery-points"],["flush-element"],["append",["unknown",["totalMasteryPoints"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","mastery-experience-meta-info"],["flush-element"],["append",["unknown",["masteryLevelText"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","mastery-5-or-6-status"],["flush-element"],["append",["unknown",["mastery5or6Text"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["unknown",["pointsGainedText"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["unknown",["animatedPointsText"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","mastery-token isCheckbox"],["flush-element"],["close-element"],["text","\\n"]],"locals":["checkbox"]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","mastery-token isCheckmark"],["flush-element"],["close-element"],["text","\\n"]],"locals":["token"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","mastery-tokens-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["tokenList"]]],null,6],["block",["each"],[["get",["checkboxList"]]],null,5],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-radial-progress",[]],["static-attr","class","mastery-progression-radial-progress"],["static-attr","type","custom"],["dynamic-attr","percent",["unknown",["masteryRadialProgressPercent"]],null],["static-attr","start-angle","-135"],["static-attr","end-angle","-405"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","slot","bottom"],["static-attr","class","mastery-progression-radial radial-bottom "],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","slot","middle"],["static-attr","class","mastery-progression-radial radial-middle"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "U2OTvaN9",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\cherry-progression.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cherry-progression-medallion-container"],["flush-element"],["text","\\n  "],["open-element","img",[]],["static-attr","class","cherry-rating-medallion"],["dynamic-attr","src",["unknown",["cherryRatedMedallion"]],null],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","cherry-progression-details"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cherry-progression-update-result-container"],["flush-element"],["text","\\n    "],["append",["helper",["rating-change"],null,[["ratingDelta","willAnimate","isWin","isBeingPromoted","isLossPrevented","getLocForRatingChange"],[["get",["ratedRatingDelta"]],["get",["willAnimate"]],["get",["isWin"]],["get",["isBeingPromoted"]],["get",["isLossPrevented"]],["get",["getRatedRatingChangeLoc"]]]]],false],["text","\\n    "],["open-element","lol-uikit-video",[]],["static-attr","class","points-gained-spark-video"],["static-attr","src","/fe/lol-static-assets/videos/challenges/postgame/postgame-spark-large.webm"],["static-attr","fade-in","0"],["static-attr","fade-out","0"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cherry-progression-update-result-status-text"],["flush-element"],["append",["unknown",["currentRatedTierLoc"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cherry-progression-total-rating-container"],["flush-element"],["append",["unknown",["currentRatedRatingLoc"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "uTNak+Ep",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\ranked-progression.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","ranked-progression-ranked-emblem-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ranked-progression-ranked-emblem-sizer"],["flush-element"],["text","\\n    "],["open-element","lol-regalia-emblem-element",[]],["dynamic-attr","ranked-tier",["unknown",["tier"]],null],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","ranked-progression-details"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ranked-progression-update-result-container"],["flush-element"],["text","\\n    "],["append",["helper",["rating-change"],null,[["ratingDelta","willAnimate","isWin","isBeingPromoted","isBeingDemoted","isInMiniseries","isLossPrevented","getLocForRatingChange"],[["get",["leaguePointsDelta"]],["get",["willAnimate"]],["get",["isWin"]],["get",["isBeingPromoted"]],["get",["isBeingDemoted"]],["get",["isInMiniseries"]],["get",["isLossPrevented"]],["get",["getLocForLpChange"]]]]],false],["text","\\n    "],["open-element","lol-uikit-video",[]],["static-attr","class","points-gained-spark-video"],["static-attr","src","/fe/lol-static-assets/videos/challenges/postgame/postgame-spark-large.webm"],["static-attr","fade-in","0"],["static-attr","fade-out","0"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ranked-progression-update-result-status-text"],["flush-element"],["append",["unknown",["updateResultStatusText"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["isInMiniseries"]]],null,1,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","ranked-progression-total-lp-container"],["flush-element"],["append",["unknown",["currentLpLoc"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["miniseries-progress"],null,[["miniseriesProgress"],[["get",["miniseriesProgress"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "CzMNNVNz",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\rating-change.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["block",["if"],[["get",["shouldShowAnimatedRatingDeltaString"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["unknown",["updateResultLoc"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["append",["unknown",["animatedPointsText"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "vh+hXqiv",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\ranked-reward-progression.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","ranked-reward-progression-container visible"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ranked-reward-progression-main"],["flush-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["ranked-reward-progression-animated-radial ",["helper",["if"],[["get",["showAnimatedElements"]],"visible"],null]]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ranked-reward-progression-radial-fill"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-lottie",[]],["static-attr","class","ranked-reward-progression-lottie-radial-fill"],["dynamic-attr","src",["unknown",["lottieBarFillPath"]],null],["dynamic-attr","param-current-exp",["unknown",["lottieSplitPointProgressBeforeGamePercent"]],null],["dynamic-attr","param-new-exp",["unknown",["lottieSplitPointProgressGainedPercent"]],null],["static-attr","autoplay","false"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["unless"],[["get",["showAnimatedElements"]]],null,4],["block",["if"],[["get",["rewardImagePath"]]],null,3],["text","    "],["open-element","div",[]],["static-attr","class","ranked-reward-progression-border"],["flush-element"],["text","\\n    "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["isRewardEarned"]]],null,2],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ranked-reward-progression-details"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","ranked-reward-progression-split-points-gained-text"],["flush-element"],["text","\\n"],["block",["if"],[["get",["shouldSplitPointsGainedTextAnimate"]]],null,1,0],["text","      "],["open-element","lol-uikit-video",[]],["static-attr","class","ranked-reward-progression-points-gained-spark-video"],["static-attr","src","/fe/lol-static-assets/videos/challenges/postgame/postgame-spark-small.webm"],["static-attr","fade-in","0"],["static-attr","fade-out","0"],["static-attr","preload",""],["static-attr","perf-flags","largeAreaAnimationsEnabled"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ranked-reward-progression-split-text"],["flush-element"],["append",["unknown",["currentSplitText"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["unknown",["unanimatedSplitPointsGainedText"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["unknown",["animatedSplitPointsGainedText"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","ranked-reward-progression-earned-pip-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","ranked-reward-progression-earned-pip-checkmark"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","img",[]],["dynamic-attr","class",["concat",["ranked-reward-progression-item ",["unknown",["rewardType"]]]]],["dynamic-attr","src",["unknown",["rewardImagePath"]],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-radial-progress",[]],["static-attr","class","ranked-reward-progression-radial-progress"],["static-attr","type","custom"],["dynamic-attr","percent",["unknown",["splitPointProgressAfterGamePercent"]],null],["static-attr","start-angle","-135"],["static-attr","end-angle","-405"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","slot","bottom"],["static-attr","class","ranked-reward-progression-radial radial-bottom "],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","slot","middle"],["static-attr","class","ranked-reward-progression-radial radial-middle"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "ks/aPkA+",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\miniseries-progress.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["block",["each"],[["get",["miniseriesResultArray"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","img",[]],["static-attr","class","miniseries-progress-result-icon"],["dynamic-attr","src",["concat",["/fe/lol-postgame/miniseries-progress-",["get",["miniseriesResult"]],".png"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["miniseriesResult"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "AV0xKc7k",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\challenge-update-container.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["block",["render-telemetry-sender"],null,[["renderEventName","shouldSendTelemetry"],[["get",["renderEventName"]],["get",["shouldSendTelemetry"]]]],26]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","loading-state"],["flush-element"],["text","\\n      "],["append",["unknown",["hextech-loading-animation"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","challenge-update-warning"],["flush-element"],["text","\\n          "],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/red-info-icon.svg"],["flush-element"],["close-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","challenge-update-warning-title"],["flush-element"],["append",["unknown",["tra","challenge_cards_revoked_title"]],false],["close-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","challenge-update-warning-msg"],["flush-element"],["append",["unknown",["tra","challenge_cards_revoked_msg"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "]],"locals":[]},{"statements":[["block",["if"],[["get",["isLeaver"]]],null,1]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","challenge-update-warning"],["flush-element"],["text","\\n          "],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/yellow-info-icon.svg"],["flush-element"],["close-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","challenge-update-warning-title"],["flush-element"],["append",["unknown",["tra","challenge_cards_remake_title"]],false],["close-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","challenge-update-warning-msg"],["flush-element"],["append",["unknown",["tra","challenge_cards_remake_msg"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isRemake"]]],null,3,2]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","challenge-update-warning"],["flush-element"],["text","\\n          "],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/yellow-info-icon.svg"],["flush-element"],["close-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","challenge-update-warning-msg"],["flush-element"],["append",["unknown",["tra","challenge_cards_no_progress_in_queue"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isNotChallengesProgressQueue"]]],null,5,4]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","challenge-update-warning"],["flush-element"],["text","\\n          "],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/yellow-info-icon.svg"],["flush-element"],["close-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","challenge-update-warning-msg"],["flush-element"],["append",["unknown",["tra","challenge_cards_temporarily_disabled"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","lol-uikit-video",[]],["dynamic-attr","class",["concat",["anim-card-intro eternals ",["unknown",["card","category"]]]]],["static-attr","fade-in","0"],["static-attr","fade-out","0"],["static-attr","src","/fe/lol-static-assets/videos/challenges/postgame/postgame-eternals-card-intro.webm"],["flush-element"],["close-element"],["text","\\n                "]],"locals":[]},{"statements":[["block",["if"],[["get",["card","statstoneName"]]],null,8]],"locals":[]},{"statements":[["text","                  "],["open-element","lol-uikit-video",[]],["dynamic-attr","class",["concat",["anim-card-intro challenges ",["unknown",["card","currentLevel"]]]]],["static-attr","fade-in","0"],["static-attr","fade-out","0"],["static-attr","src","/fe/lol-static-assets/videos/challenges/postgame/postgame-challenges-card-intro.webm"],["flush-element"],["close-element"],["text","\\n                  "],["open-element","lol-uikit-lottie",[]],["static-attr","class","lottie-card-sheen"],["static-attr","src","/fe/lol-static-assets/lottie/postgame/postgame-challenges-card-sheen.json"],["static-attr","autoplay","false"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                      "],["append",["helper",["challenge-card"],null,[["isEmpty"],[true]]],false],["text","\\n                  "]],"locals":[]},{"statements":[["text","                      "],["append",["helper",["eternals-item"],null,[["eternal","animationsEnabled","willAnimate","animateStartDelay"],[["get",["card"]],["get",["animationsEnabled"]],["get",["willAnimate"]],["get",["card","animateStartDelay"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["card","statstoneName"]]],null,12,11]],"locals":[]},{"statements":[["text","                      "],["append",["helper",["challenge-item"],null,[["challengeData","isEoGUpdate","animationsEnabled","willAnimate","animateStartDelay"],[["get",["card"]],true,["get",["animationsEnabled"]],["get",["willAnimate"]],["get",["card","animateStartDelay"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["card","currentLevel"]]],null,14,13]],"locals":[]},{"statements":[["text","                  "],["append",["helper",["challenge-card"],null,[["isEmpty"],[true]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","lol-uikit-lottie",[]],["static-attr","class","lottie-card-outline"],["static-attr","src","/fe/lol-static-assets/lottie/postgame/postgame-eternals-card-intro.json"],["static-attr","autoplay","false"],["flush-element"],["close-element"],["text","\\n                "]],"locals":[]},{"statements":[["block",["if"],[["get",["card","statstoneName"]]],null,17]],"locals":[]},{"statements":[["text","                  "],["open-element","lol-uikit-lottie",[]],["static-attr","class","lottie-card-outline"],["static-attr","src","/fe/lol-static-assets/lottie/postgame/postgame-challenges-card-intro.json"],["static-attr","autoplay","false"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","container-item"],["dynamic-attr","anim-data-challenge-level",["unknown",["card","currentLevel"]],null],["dynamic-attr","anim-data-is-levelup",["unknown",["card","isLevelUp"]],null],["dynamic-attr","anim-data-is-milestone",["unknown",["card","isMilestone"]],null],["dynamic-attr","anim-data-is-empty",["unknown",["card","isEmpty"]],null],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","container-anim-contents"],["flush-element"],["text","\\n"],["block",["if"],[["get",["card","currentLevel"]]],null,19,18],["text","              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","container-item-contents"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasWarning"]]],null,16,15],["text","              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","container-anim-contents"],["flush-element"],["text","\\n"],["block",["if"],[["get",["card","currentLevel"]]],null,10,9],["text","              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":["card"]},{"statements":[["text","              "],["append",["helper",["eternals-updates-tooltip"],null,[["eternalsUpdates"],[["get",["groupedEternals"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],21]],"locals":[]},{"statements":[["text","              "],["append",["helper",["challenge-updates-tooltip"],null,[["challengeUpdates"],[["get",["groupedChallenges"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],23]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","challenge-progression-top"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","postgame_progression_pills_label"]],false],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["challenge-progression-pill ",["helper",["if"],[["get",["hasNoChallengeUpdates"]],"disabled"],null]]]],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","challenges-progressed"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"openChallengesModal"],null],null],["flush-element"],["text","\\n            "],["open-element","img",[]],["static-attr","class","challenges-progressed-logo"],["static-attr","src","/fe/lol-postgame/scoreboard-challenge-crystal-icon.svg"],["flush-element"],["close-element"],["text","\\n            "],["append",["unknown",["challengeUpdatesCount"]],false],["text","\\n          "],["close-element"],["text","\\n"],["block",["unless"],[["get",["hasNoChallengeUpdates"]]],null,24],["text","        "],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["challenge-progression-pill ",["helper",["if"],[["get",["hasNoEternalsUpdates"]],"disabled"],null]]]],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","eternals-progressed"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"openEternalsModal"],null],null],["flush-element"],["text","\\n            "],["open-element","img",[]],["static-attr","class","eternals-progressed-logo"],["static-attr","src","/fe/lol-postgame/eternals-icon.svg"],["flush-element"],["close-element"],["text","\\n            "],["append",["unknown",["eternalsUpdatesCount"]],false],["text","\\n          "],["close-element"],["text","\\n"],["block",["unless"],[["get",["hasNoEternalsUpdates"]]],null,22],["text","        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["challenge-container ",["helper",["if"],[["get",["isAnimationQueued"]],"hidden"],null]]]],["flush-element"],["text","\\n"],["block",["unless"],[["get",["hasWarning"]]],null,25],["text","    "],["open-element","div",[]],["static-attr","class","challenge-update-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","container-items-page"],["flush-element"],["text","\\n"],["block",["each"],[["get",["cards"]]],null,20],["text","      "],["close-element"],["text","\\n"],["block",["if"],[["get",["isPostgameChallengesDisabled"]]],null,7,6],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isAnimationQueued"]]],null,0]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "e+NdBI7U",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\challenge-updates-tooltip.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","challenge-updates-tooltip-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","challenge-updates-tooltip-header"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","postgame_challenges_tooltip_heading"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","challenge-updates-tooltip-content"],["flush-element"],["text","\\n"],["block",["if"],[["get",["upgradedChallenges"]]],null,1],["block",["if"],[["get",["progressedChallenges"]]],null,0],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","challenge-updates-tooltip-footer"],["flush-element"],["append",["unknown",["tra","postgame_progression_tooltip_footer"]],false],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","challenge-update-text"],["flush-element"],["text","\\n                "],["open-element","span",[]],["flush-element"],["text","\\n                    "],["open-element","b",[]],["flush-element"],["append",["unknown",["progressedChallenges","count"]],false],["close-element"],["text","\\n                    "],["append",["unknown",["tra","postgame_challenges_tooltip_progressed"]],false],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","challenge-update-icon"],["flush-element"],["text","\\n                    "],["open-element","img",[]],["static-attr","src","/fe/lol-postgame/icon-progressed.svg"],["flush-element"],["close-element"],["text","\\n                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","challenge-update-text"],["flush-element"],["text","\\n                "],["open-element","span",[]],["flush-element"],["text","\\n                    "],["open-element","b",[]],["flush-element"],["append",["unknown",["upgradedChallenges","count"]],false],["close-element"],["text","\\n                    "],["append",["unknown",["tra","postgame_challenges_tooltip_upgraded"]],false],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","challenge-update-icon"],["flush-element"],["text","\\n                    "],["open-element","img",[]],["static-attr","src","/fe/lol-postgame/icon-crystal.svg"],["flush-element"],["close-element"],["text","\\n                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "RTQemBCw",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\eternals-updates-tooltip.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","eternals-updates-tooltip-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","eternals-updates-tooltip-header"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","postgame_eternals_tooltip_heading"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","eternals-updates-tooltip-content"],["flush-element"],["text","\\n"],["block",["if"],[["get",["newPersonalBestEternals"]]],null,2],["block",["if"],[["get",["newMilestoneEternals"]]],null,1],["block",["if"],[["get",["progressedEternals"]]],null,0],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","eternals-updates-tooltip-footer"],["flush-element"],["append",["unknown",["tra","postgame_progression_tooltip_footer"]],false],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","eternals-update-text"],["flush-element"],["text","\\n                "],["open-element","span",[]],["flush-element"],["text","\\n                    "],["open-element","b",[]],["flush-element"],["append",["unknown",["progressedEternals","count"]],false],["close-element"],["text","\\n                    "],["append",["unknown",["tra","postgame_eternals_tooltip_progressed"]],false],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","eternals-update-icon"],["flush-element"],["text","\\n                    "],["open-element","img",[]],["static-attr","src","/fe/lol-postgame/icon-progressed.svg"],["flush-element"],["close-element"],["text","\\n                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","eternals-update-text"],["flush-element"],["text","\\n                "],["open-element","span",[]],["flush-element"],["text","\\n                    "],["open-element","b",[]],["flush-element"],["append",["unknown",["newMilestoneEternals","count"]],false],["close-element"],["text","\\n                    "],["append",["unknown",["newMilestoneText"]],false],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","eternals-update-icon"],["flush-element"],["text","\\n                    "],["open-element","img",[]],["static-attr","src","/fe/lol-postgame/icon-milestone.svg"],["flush-element"],["close-element"],["text","\\n                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","eternals-update-text"],["flush-element"],["text","\\n                "],["open-element","span",[]],["flush-element"],["text","\\n                    "],["open-element","b",[]],["flush-element"],["append",["unknown",["newPersonalBestEternals","count"]],false],["close-element"],["text","\\n                    "],["append",["unknown",["tra","postgame_eternals_tooltip_new_personal_best"]],false],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","eternals-update-icon"],["flush-element"],["text","\\n                    "],["open-element","img",[]],["static-attr","src","/fe/lol-postgame/icon-target.svg"],["flush-element"],["close-element"],["text","\\n                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "E6GAPEj4",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\postgame-party-status-v2.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","postgame-party-status-v2-display"],["dynamic-attr","showHover",["concat",[["unknown",["showPartyStatusTooltipOnHover"]]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["showComponent"]]],null,3],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","tooltip-row-container"],["flush-element"],["text","\\n            "],["open-element","div",[]],["flush-element"],["text","\\n              "],["open-element","img",[]],["static-attr","class","icon"],["dynamic-attr","src",["concat",[["unknown",["summoner","profileIconPath"]]]]],["dynamic-attr","player-status",["concat",[["unknown",["summoner","partyStatus"]]]]],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","ring"],["dynamic-attr","player-status",["concat",[["unknown",["summoner","partyStatus"]]]]],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","postgame-party-status-v2-tooltip-name"],["dynamic-attr","player-status",["concat",[["unknown",["summoner","partyStatus"]]]]],["flush-element"],["text","\\n"],["text","              "],["append",["unknown",["summoner","displayName"]],false],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","tooltip-status-icon-container"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","tooltip-status-icon-ready-or-left"],["dynamic-attr","player-status",["concat",[["unknown",["summoner","partyStatus"]]]]],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","dot-container"],["dynamic-attr","player-status",["concat",[["unknown",["summoner","partyStatus"]]]]],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","dot"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","dot"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","dot"],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":["summoner"]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","postgame-party-status-v2-mouseover-header"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","postgame_party_status_players_header"]],false],["text","\\n          "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","postgame-party-status-v2-tooltip"],["flush-element"],["text","\\n"],["block",["each"],[["get",["partyStatusToolTip"]]],null,0],["text","        "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],1]],"locals":[]},{"statements":[["block",["if"],[["get",["showPartyStatusTooltipOnHover"]]],null,2],["text","    "],["open-element","div",[]],["static-attr","class","postgame-party-status-v2-icon"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","postgame-party-status-v2-counts"],["flush-element"],["append",["unknown",["numPlayersReady"]],false],["text","/"],["append",["unknown",["partySize"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "A7XW2HAl",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\progression-modal.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","progression-modal-root-component"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","backdrop-click"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"closeModal"],null],null],["flush-element"],["close-element"],["text","\\n  "],["open-element","lol-uikit-dialog-frame",[]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","progression-modal-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"closeModal"],null],null],["static-attr","class","update-icon-close-btn"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["showEternalsData"]]],null,9,8],["text","      "],["open-element","div",[]],["static-attr","class","progresion-modal-content"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showEternalsData"]]],null,7,3],["text","        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                  "],["open-element","div",[]],["static-attr","class","progression-modal-challenge-token-container"],["dynamic-attr","id",["concat",["token-id-",["unknown",["challenge","id"]]]]],["flush-element"],["text","\\n                    "],["append",["helper",["identity-customizer-token"],null,[["challengeData","isTooltipEnabled","isShowIdentityPoints","isSelectable"],[["get",["challenge"]],true,true,false]]],false],["text","\\n                  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","div",[]],["static-attr","class","progression-modal-content-header"],["flush-element"],["append",["unknown",["challenge","groupName"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["challenge","isHeader"]]],null,1,0]],"locals":["challenge"]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","progression-modal-content-grid"],["flush-element"],["text","\\n"],["block",["each"],[["get",["groupedChallenges"]]],null,2],["text","            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["append",["helper",["eternals-token"],null,[["eternal","index"],[["get",["eternal"]],["get",["index"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","div",[]],["static-attr","class","progression-modal-content-header"],["flush-element"],["append",["unknown",["eternal","groupName"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["eternal","isHeader"]]],null,5,4]],"locals":["eternal","index"]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","progression-modal-content-grid"],["flush-element"],["text","\\n"],["block",["each"],[["get",["groupedEternals"]]],null,6],["text","            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","progression-modal-header"],["flush-element"],["append",["unknown",["tra","postgame_challenges_modal_heading"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","progression-modal-header"],["flush-element"],["append",["unknown",["tra","postgame_eternals_modal_heading"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "6GzFDeUn",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\cherry-scoreboard-header.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","scoreboard-header-content"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-header-subteam-placement"],["flush-element"],["append",["unknown",["teamPlacementLoc"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-header-separator-icon"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-header-team-icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["teamIcon"]],");"]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-header-team-name"],["flush-element"],["append",["unknown",["teamNameLoc"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-header-separator-icon"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-header-stat-container"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],3],["text","    "],["open-element","div",[]],["static-attr","class","scoreboard-header-icon small kda"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","scoreboard-header-stat-label"],["flush-element"],["append",["unknown",["kdaLoc"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-header-separator-icon"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-header-stat-container"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],2],["text","    "],["open-element","div",[]],["static-attr","class","scoreboard-header-icon small gold"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","scoreboard-header-stat-label"],["flush-element"],["append",["unknown",["teamGoldLoc"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","scoreboard-header-spacer"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["showScoreboardColumnIcons"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","scoreboard-header-stat-icon-tooltip"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","postgame_scoreboard_stat_display_tooltip_INDIVIDUAL_KDA"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","scoreboard-column-icons-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","scoreboard-header-icon-spacer"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","scoreboard-header-icon kda"],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],0],["text","      "],["close-element"],["text","\\n      "],["append",["helper",["scoreboard-stat-switcher"],null,[["options","selectedStat","ordinal","selectStat"],[["get",["statSwitcher1Options"]],["get",["statSwitcherStatName1"]],1,"selectStat"]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","scoreboard-header-stat-icon-tooltip"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","postgame_scoreboard_stat_display_tooltip_TEAM_GOLD_EARNED"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","scoreboard-header-stat-icon-tooltip"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","postgame_scoreboard_stat_display_tooltip_KILL_DEATH_ASSIST"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "X3F+uamQ",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\scoreboard-header.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","scoreboard-header-content"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-header-team-name"],["flush-element"],["append",["unknown",["teamNameLoc"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-header-separator-icon"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-header-stat-container"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],4],["text","    "],["open-element","div",[]],["static-attr","class","scoreboard-header-icon small kda"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","scoreboard-header-stat-label"],["flush-element"],["append",["unknown",["kdaLoc"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-header-separator-icon"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-header-stat-container"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],3],["text","    "],["open-element","div",[]],["static-attr","class","scoreboard-header-icon small gold"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","scoreboard-header-stat-label"],["flush-element"],["append",["unknown",["teamGoldLoc"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","scoreboard-header-spacer"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["showScoreboardColumnIcons"]]],null,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","scoreboard-header-stat-icon-tooltip"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","postgame_scoreboard_most_progressed_challenge_column_tooltip"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","scoreboard-header-stat-icon-tooltip"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","postgame_scoreboard_stat_display_tooltip_INDIVIDUAL_KDA"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","scoreboard-column-icons-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","scoreboard-header-icon-spacer"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","scoreboard-header-icon kda"],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],1],["text","      "],["close-element"],["text","\\n      "],["append",["helper",["scoreboard-stat-switcher"],null,[["options","selectedStat","ordinal","selectStat"],[["get",["statSwitcher1Options"]],["get",["statSwitcherStatName1"]],1,"selectStat"]]],false],["text","\\n      "],["append",["helper",["scoreboard-stat-switcher"],null,[["options","selectedStat","ordinal","selectStat"],[["get",["statSwitcher2Options"]],["get",["statSwitcherStatName2"]],2,"selectStat"]]],false],["text","\\n      "],["open-element","div",[]],["static-attr","class","scoreboard-header-challenge-icon-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","scoreboard-header-icon challenge-crystal"],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],0],["text","      "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","scoreboard-header-stat-icon-tooltip"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","postgame_scoreboard_stat_display_tooltip_TEAM_GOLD_EARNED"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","scoreboard-header-stat-icon-tooltip"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","postgame_scoreboard_stat_display_tooltip_KILL_DEATH_ASSIST"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "7/CnMijH",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\scoreboard-honor-flair.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["block",["unless"],[["get",["isBot"]]],null,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tooltipText"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","img",[]],["static-attr","class","honor-flair-icon-static"],["dynamic-attr","src",["concat",[["unknown",["teamChoiceIconPath"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","img",[]],["dynamic-attr","class",["concat",["honor-flair-icon ",["helper",["if"],[["get",["hasCelebrated"]],"visible"],null]]]],["dynamic-attr","src",["concat",[["unknown",["teamChoiceIconPath"]]]]],["flush-element"],["close-element"],["text","\\n    "],["open-element","uikit-video",[]],["static-attr","class","honor-flair-video"],["dynamic-attr","src",["concat",[["unknown",["teamChoiceMograph"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["willAnimate"]]],null,2,1],["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["honor-flair-tooltip-container  ",["helper",["unless"],[["get",["hasCelebrated"]],"hidden"],null]]]],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","right"]],0],["text","    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "WC7ravRu",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\scoreboard-root.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["block",["if"],[["get",["isCherry"]]],null,12,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","video",[]],["dynamic-attr","class",["concat",["scoreboard-team-intro-animation ",["helper",["unless"],[["get",["team","isPlayerTeam"]],"scoreboard-team-intro-animation-enemy"],null]]]],["static-attr","src","/fe/lol-postgame/EOG_Scoreboard_Team_Color.webm"],["static-attr","type","video/webm"],["static-attr","autoplay",""],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","scoreboard-row-separator top"],["flush-element"],["close-element"],["text","\\n            "],["append",["helper",["scoreboard-row"],null,[["player","team","showKeystone","statSwitcherStatName1","statSwitcherStatName2","gameLengthSeconds","highestStatValueByStatMap","gameId","hasScoreboardAnimationPlayed","hasCelebratedHonor","animationsEnabled","updateHonorCelebrationAnimation"],[["get",["player"]],["get",["team"]],["get",["showKeystone"]],["get",["statSwitcherStatName1"]],["get",["statSwitcherStatName2"]],["get",["eogStats","gameLength"]],["get",["highestStatValueByStatMap"]],["get",["eogStats","gameId"]],["get",["hasScoreboardAnimationPlayed"]],["get",["hasCelebratedHonor"]],["get",["animationsEnabled"]],["helper",["action"],[["get",[null]],"updateHonorCelebrationAnimation"],null]]]],false],["text","\\n"]],"locals":["player"]},{"statements":[["text","      "],["append",["helper",["scoreboard-header"],null,[["team","index","setSelectedStat","statSwitcherStatName1","statSwitcher1Options","statSwitcherStatName2","statSwitcher2Options","locale"],[["get",["team"]],["get",["index"]],"setSelectedStat",["get",["statSwitcherStatName1"]],["get",["statSwitcher1Options"]],["get",["statSwitcherStatName2"]],["get",["statSwitcher2Options"]],["get",["postgame","locale"]]]]],false],["text","\\n      "],["open-element","div",[]],["static-attr","class","scoreboard-team-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","scoreboard-team"],["flush-element"],["text","\\n"],["block",["each"],[["get",["team","players"]]],null,1],["text","          "],["open-element","div",[]],["static-attr","class","scoreboard-row-separator bottom"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"],["block",["if"],[["get",["showTeamIntroAnimation"]]],null,0],["text","      "],["close-element"],["text","\\n"]],"locals":["team","index"]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","scoreboard-root-content-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["postgame","eogStatsBlock","teams"]]],null,2],["text","  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","video",[]],["dynamic-attr","class",["concat",["scoreboard-team-intro-animation ",["helper",["unless"],[["get",["team","isPlayerTeam"]],"scoreboard-team-intro-animation-enemy"],null]]]],["static-attr","src","/fe/lol-postgame/EOG_Scoreboard_Team_Color.webm"],["static-attr","type","video/webm"],["static-attr","autoplay",""],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","scoreboard-row-separator top"],["flush-element"],["close-element"],["text","\\n            "],["append",["helper",["cherry-scoreboard-row"],null,[["player","team","showKeystone","statSwitcherStatName1","gameLengthSeconds","highestStatValueByStatMap","gameId","hasScoreboardAnimationPlayed","hasCelebratedHonor","animationsEnabled","updateHonorCelebrationAnimation"],[["get",["player"]],["get",["team"]],["get",["showKeystone"]],["get",["statSwitcherStatName1"]],["get",["eogStats","gameLength"]],["get",["highestStatValueByStatMap"]],["get",["eogStats","gameId"]],["get",["hasScoreboardAnimationPlayed"]],["get",["hasCelebratedHonor"]],["get",["animationsEnabled"]],["helper",["action"],[["get",[null]],"updateHonorCelebrationAnimation"],null]]]],false],["text","\\n"]],"locals":["player"]},{"statements":[["text","      "],["append",["helper",["cherry-scoreboard-header"],null,[["team","index","setSelectedStat","statSwitcherStatName1","statSwitcher1Options","locale"],[["get",["team"]],["get",["index"]],"setSelectedStat",["get",["statSwitcherStatName1"]],["get",["statSwitcher1Options"]],["get",["postgame","locale"]]]]],false],["text","\\n      "],["open-element","div",[]],["static-attr","class","scoreboard-team-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","scoreboard-team"],["flush-element"],["text","\\n"],["block",["each"],[["get",["team","players"]]],null,5],["text","          "],["open-element","div",[]],["static-attr","class","scoreboard-row-separator bottom"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"],["block",["if"],[["get",["showTeamIntroAnimation"]]],null,4],["text","      "],["close-element"],["text","\\n"]],"locals":["team","index"]},{"statements":[["block",["each"],[["get",["postgame","cherryTeams"]]],null,6]],"locals":[]},{"statements":[["text","          "],["open-element","video",[]],["dynamic-attr","class",["concat",["scoreboard-team-intro-animation ",["helper",["unless"],[["get",["team","isPlayerTeam"]],"scoreboard-team-intro-animation-enemy"],null]]]],["static-attr","src","/fe/lol-postgame/EOG_Scoreboard_Team_Color.webm"],["static-attr","type","video/webm"],["static-attr","autoplay",""],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","scoreboard-row-separator top"],["flush-element"],["close-element"],["text","\\n            "],["append",["helper",["cherry-scoreboard-row"],null,[["player","team","showKeystone","statSwitcherStatName1","gameLengthSeconds","highestStatValueByStatMap","gameId","hasScoreboardAnimationPlayed","hasCelebratedHonor","animationsEnabled","updateHonorCelebrationAnimation"],[["get",["player"]],["get",["team"]],["get",["showKeystone"]],["get",["statSwitcherStatName1"]],["get",["eogStats","gameLength"]],["get",["highestStatValueByStatMap"]],["get",["eogStats","gameId"]],["get",["hasScoreboardAnimationPlayed"]],["get",["hasCelebratedHonor"]],["get",["animationsEnabled"]],["helper",["action"],[["get",[null]],"updateHonorCelebrationAnimation"],null]]]],false],["text","\\n"]],"locals":["player"]},{"statements":[["text","      "],["append",["helper",["cherry-scoreboard-header"],null,[["team","index","setSelectedStat","statSwitcherStatName1","statSwitcher1Options","locale"],[["get",["team"]],["get",["index"]],"setSelectedStat",["get",["statSwitcherStatName1"]],["get",["statSwitcher1Options"]],["get",["postgame","locale"]]]]],false],["text","\\n        "],["open-element","div",[]],["static-attr","class","scoreboard-team-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","scoreboard-team"],["flush-element"],["text","\\n"],["block",["each"],[["get",["team","players"]]],null,9],["text","          "],["open-element","div",[]],["static-attr","class","scoreboard-row-separator bottom"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"],["block",["if"],[["get",["showTeamIntroAnimation"]]],null,8],["text","      "],["close-element"],["text","\\n"]],"locals":["team","index"]},{"statements":[["block",["each"],[["get",["eogStats","teams"]]],null,10]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","cherry-scoreboard-root-content-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["postgame","shouldShowGameClientStats"]]],null,11,7],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "oaGd9sYM",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\cherry-scoreboard-row.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","scoreboard-row-content-container centered-flex-box"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isLeaver"]]],null,13],["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["scoreboard-row-color-bar ",["unknown",["playerColorBarClass"]]]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-row-player-details-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","scoreboard-row-skin-background"],["dynamic-attr","style",["unknown",["skinSplashStyle"]],null],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","scoreboard-row-skin-overlay"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","scoreboard-row-skin-overlay secondary"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","scoreboard-row-details-content horizontal-flex-box"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","scoreboard-row-position-level-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["displayedPosition"]]],null,12],["text","        "],["open-element","div",[]],["static-attr","class","scoreboard-row-in-game-level centered-flex-box"],["flush-element"],["append",["unknown",["player","stats","LEVEL"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","scoreboard-row-spacer"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","scoreboard-row-name-and-champ-container vertical-flex-box"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","scoreboard-row-player-name"],["flush-element"],["text","\\n          "],["append",["helper",["player-name"],null,[["format","puuid","summonerName","gameName","tagLine"],["short",["get",["player","puuid"]],["get",["player","summonerName"]],["get",["gameName"]],["get",["tagLine"]]]]],false],["text","\\n        "],["close-element"],["text","\\n"],["block",["if"],[["get",["player","leaver"]]],null,10,9],["text","      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","scoreboard-row-actions-button-container centered-flex-box"],["flush-element"],["text","\\n"],["block",["if"],[["get",["shouldShowButtons"]]],null,6],["text","      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","id","mute-indicator"],["static-attr","class","scoreboard-row-mute-indicator"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldShowPlayerHonorComponent"]]],null,5],["text","  "],["open-element","div",[]],["static-attr","class","scoreboard-row-pike"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-row-summoner-spells-container vertical-flex-box centered-flex-box"],["flush-element"],["text","\\n"],["block",["if"],[["get",["player","botPlayer"]]],null,4,3],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-row-augments-container centered-flex-box"],["flush-element"],["text","\\n"],["block",["each"],[["get",["displayedAugments"]]],null,2],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-row-items-container centered-flex-box"],["flush-element"],["text","\\n"],["block",["each"],[["get",["player","items"]]],null,1],["text","  "],["close-element"],["text","\\n  "],["append",["helper",["scoreboard-row-stat-display"],null,[["statName","player","team","gameLengthSeconds","hasScoreboardAnimationPlayed","animationsEnabled"],["INDIVIDUAL_KDA",["get",["player"]],["get",["team"]],["get",["gameLengthSeconds"]],["get",["hasScoreboardAnimationPlayed"]],["get",["animationsEnabled"]]]]],false],["text","\\n  "],["append",["helper",["scoreboard-row-stat-display"],null,[["statName","player","team","gameLengthSeconds","highestStatValueByStatMap","locale","hasScoreboardAnimationPlayed","animationsEnabled"],[["get",["statSwitcherStatName1"]],["get",["player"]],["get",["team"]],["get",["gameLengthSeconds"]],["get",["highestStatValueByStatMap"]],["get",["postgame","locale"]],["get",["hasScoreboardAnimationPlayed"]],["get",["animationsEnabled"]]]]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","scoreboard-row-hover-overlay"],["flush-element"],["text","\\n"],["block",["if"],[["get",["shouldShowButtons"]]],null,0],["text","  "],["open-element","lc-flyout",[]],["dynamic-attr","open",["unknown",["isPlayerActionsMenuOpen"]],null],["dynamic-attr","onHide",["helper",["action"],[["get",[null]],"hidePlayerActionsMenu"],null],null],["dynamic-attr","uiKitOptionOverrides",["unknown",["flyoutOptions"]],null],["flush-element"],["text","\\n    "],["open-element","lc-flyout-content",[]],["flush-element"],["text","\\n      "],["append",["helper",["scoreboard-row-actions-menu"],null,[["data","isItemSetsDisabled","isFriendRequestDisabled","isPlayerBlocked","isReportDisabled","isPlayerMuted","sendFriendRequest","inviteToParty","showReportDialog","confirmBlockPlayer","viewProfile","importItemSet","togglePlayerMute","isPlayerMuteToggleable"],[["get",["player"]],["get",["postgame","isItemSetsDisabled"]],["get",["isFriendRequestDisabled"]],["get",["isPlayerBlocked"]],["get",["isReportDisabled"]],["get",["showPlayerMute"]],"sendFriendRequest","inviteToParty","showReportDialog","confirmBlockPlayer","viewProfile","importItemSet","togglePlayerMute",["get",["isPlayerMuteToggleable"]]]]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","scoreboard-row-player-controls-container"],["flush-element"],["text","\\n      "],["append",["helper",["postgame-scoreboard-player-buttons"],null,[["player","isFriendRequestDisabled","isReportDisabled","isPlayerTeam","isInviteDisabled","sendFriendRequest","showReportDialog","inviteToParty","togglePlayerMute","isPlayerMuted"],[["get",["player"]],["get",["isFriendRequestDisabled"]],["get",["isReportDisabled"]],["get",["team","isPlayerTeam"]],["get",["isInviteDisabled"]],"sendFriendRequest","showReportDialog","inviteToParty","togglePlayerMute",["get",["isPlayerMuted"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["postgame-scoreboard-player-item"],null,[["itemId"],[["get",["itemId"]]]]],false],["text","\\n"]],"locals":["itemId"]},{"statements":[["text","      "],["append",["helper",["postgame-scoreboard-player-augment"],null,[["augmentId"],[["get",["augmentId"]]]]],false],["text","\\n"]],"locals":["augmentId"]},{"statements":[["text","      "],["append",["helper",["scoreboard-spell"],null,[["spellId","isSmall"],[["get",["player","spell1Id"]],true]]],false],["text","\\n      "],["append",["helper",["scoreboard-spell"],null,[["spellId","isSmall"],[["get",["player","spell2Id"]],true]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","scoreboard-row-spell-icon-placeholder"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","scoreboard-row-spell-icon-placeholder"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["scoreboard-honor-flair"],null,[["isLocalPlayer","isPlayerTeam","isBot","summonerId","summonerName","gameName","tagLine","hasScoreboardAnimationPlayed","hasCelebrated","updateHonorCelebrationAnimation"],[["get",["player","isLocalPlayer"]],["get",["team","isPlayerTeam"]],["get",["player","botPlayer"]],["get",["player","summonerId"]],["get",["player","summonerName"]],["get",["gameName"]],["get",["tagLine"]],["get",["hasScoreboardAnimationPlayed"]],["get",["hasCelebratedHonor"]],["helper",["action"],[["get",[null]],"updateHonorCelebrationAnimation"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","scoreboard-row-actions-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showPlayerActionsMenu"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","scoreboard-row-champ-name"],["flush-element"],["append",["unknown",["player","championName"]],false],["close-element"],["text","\\n        "]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","scoreboard-row-is-system-muted"],["flush-element"],["append",["unknown",["tra","postgame_system_muted_scoreboard"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isSystemMuted"]]],null,8,7]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","scoreboard-row-leaver-text"],["flush-element"],["append",["unknown",["tra","postgame_afk_penalty_applied_scoreboard"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","lol-uikit-content-block",[]],["static-attr","class","scoreboard-row-lane-position-tooltip"],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","scoreboard-row-lane-position-tooltip-header"],["flush-element"],["append",["unknown",["displayedPositionTranslatedText"]],false],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","scoreboard-row-lane-position-tooltip-description"],["flush-element"],["append",["unknown",["tra","postgame_scoreboard_lane_position_tooltip_description"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","scoreboard-row-position-icon-wrapper centered-flex-box"],["flush-element"],["text","\\n            "],["open-element","img",[]],["static-attr","class","scoreboard-row-position-icon"],["dynamic-attr","src",["concat",["/fe/lol-parties/icon-position-",["unknown",["displayedPosition"]],"-hover.png"]]],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["top"]],11],["text","          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","embellishment-icon-container"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","cancel-icon"],["static-attr","src","/fe/lol-postgame/icon-cancel.svg"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "H3inXjtP",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\scoreboard-row.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","scoreboard-row-content-container centered-flex-box"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isLeaver"]]],null,17],["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["scoreboard-row-color-bar ",["unknown",["playerColorBarClass"]]]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-row-player-details-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","scoreboard-row-skin-background"],["dynamic-attr","style",["unknown",["skinSplashStyle"]],null],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","scoreboard-row-skin-overlay"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","scoreboard-row-skin-overlay secondary"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","scoreboard-row-details-content horizontal-flex-box"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","scoreboard-row-position-level-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["displayedPosition"]]],null,16],["text","        "],["open-element","div",[]],["static-attr","class","scoreboard-row-in-game-level centered-flex-box"],["flush-element"],["append",["unknown",["player","stats","LEVEL"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","scoreboard-row-spacer"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","scoreboard-row-name-and-champ-container vertical-flex-box"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","scoreboard-row-player-name"],["flush-element"],["text","\\n          "],["append",["helper",["player-name"],null,[["format","puuid","summonerName","gameName","tagLine"],["short",["get",["player","puuid"]],["get",["player","summonerName"]],["get",["gameName"]],["get",["tagLine"]]]]],false],["text","\\n        "],["close-element"],["text","\\n"],["block",["if"],[["get",["player","leaver"]]],null,14,13],["text","      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","scoreboard-row-actions-button-container centered-flex-box"],["flush-element"],["text","\\n"],["block",["if"],[["get",["shouldShowButtons"]]],null,10],["text","      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","id","mute-indicator"],["static-attr","class","scoreboard-row-mute-indicator"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldShowPlayerHonorComponent"]]],null,9],["text","  "],["open-element","div",[]],["static-attr","class","scoreboard-row-pike"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-row-keystone-container centered-flex-box"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","scoreboard-row-keystone-alignment-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showKeystone"]]],null,8],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-row-summoner-spells-container vertical-flex-box centered-flex-box"],["flush-element"],["text","\\n"],["block",["if"],[["get",["player","botPlayer"]]],null,6,5],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-row-items-container centered-flex-box"],["flush-element"],["text","\\n"],["block",["each"],[["get",["player","items"]]],null,4],["text","  "],["close-element"],["text","\\n  "],["append",["helper",["scoreboard-row-stat-display"],null,[["statName","player","team","gameLengthSeconds","hasScoreboardAnimationPlayed","animationsEnabled"],["INDIVIDUAL_KDA",["get",["player"]],["get",["team"]],["get",["gameLengthSeconds"]],["get",["hasScoreboardAnimationPlayed"]],["get",["animationsEnabled"]]]]],false],["text","\\n  "],["append",["helper",["scoreboard-row-stat-display"],null,[["statName","player","team","gameLengthSeconds","highestStatValueByStatMap","locale","hasScoreboardAnimationPlayed","animationsEnabled"],[["get",["statSwitcherStatName1"]],["get",["player"]],["get",["team"]],["get",["gameLengthSeconds"]],["get",["highestStatValueByStatMap"]],["get",["postgame","locale"]],["get",["hasScoreboardAnimationPlayed"]],["get",["animationsEnabled"]]]]],false],["text","\\n  "],["append",["helper",["scoreboard-row-stat-display"],null,[["statName","player","team","gameLengthSeconds","highestStatValueByStatMap","locale","hasScoreboardAnimationPlayed","animationsEnabled"],[["get",["statSwitcherStatName2"]],["get",["player"]],["get",["team"]],["get",["gameLengthSeconds"]],["get",["highestStatValueByStatMap"]],["get",["postgame","locale"]],["get",["hasScoreboardAnimationPlayed"]],["get",["animationsEnabled"]]]]],false],["text","\\n  "],["open-element","div",[]],["static-attr","class","scoreboard-updated-challenge-component"],["flush-element"],["text","\\n"],["block",["if"],[["get",["topMostProgressedChallenge"]]],null,3,1],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","scoreboard-row-hover-overlay"],["flush-element"],["text","\\n"],["block",["if"],[["get",["shouldShowButtons"]]],null,0],["text","  "],["open-element","lc-flyout",[]],["dynamic-attr","open",["unknown",["isPlayerActionsMenuOpen"]],null],["dynamic-attr","onHide",["helper",["action"],[["get",[null]],"hidePlayerActionsMenu"],null],null],["dynamic-attr","uiKitOptionOverrides",["unknown",["flyoutOptions"]],null],["flush-element"],["text","\\n    "],["open-element","lc-flyout-content",[]],["flush-element"],["text","\\n      "],["append",["helper",["scoreboard-row-actions-menu"],null,[["data","isItemSetsDisabled","isFriendRequestDisabled","isPlayerBlocked","isReportDisabled","isPlayerMuted","sendFriendRequest","inviteToParty","showReportDialog","confirmBlockPlayer","viewProfile","importItemSet","togglePlayerMute","isPlayerMuteToggleable"],[["get",["player"]],["get",["postgame","isItemSetsDisabled"]],["get",["isFriendRequestDisabled"]],["get",["isPlayerBlocked"]],["get",["isReportDisabled"]],["get",["showPlayerMute"]],"sendFriendRequest","inviteToParty","showReportDialog","confirmBlockPlayer","viewProfile","importItemSet","togglePlayerMute",["get",["isPlayerMuteToggleable"]]]]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","scoreboard-row-player-controls-container"],["flush-element"],["text","\\n      "],["append",["helper",["postgame-scoreboard-player-buttons"],null,[["player","isFriendRequestDisabled","isReportDisabled","isPlayerTeam","isInviteDisabled","sendFriendRequest","showReportDialog","inviteToParty","togglePlayerMute","isPlayerMuted"],[["get",["player"]],["get",["isFriendRequestDisabled"]],["get",["isReportDisabled"]],["get",["team","isPlayerTeam"]],["get",["isInviteDisabled"]],"sendFriendRequest","showReportDialog","inviteToParty","togglePlayerMute",["get",["isPlayerMuted"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","scoreboard-updated-challenge-icon"],["static-attr","src","/fe/lol-static-assets/images/challenges-shared/icon_background.png"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["challenge-item-tooltip"],null,[["puuid","challengeData","isLocalPlayer","isComparable","localPlayerChallengesData"],[["get",["puuid"]],["get",["topMostProgressedChallenge"]],["get",["player","isLocalPlayer"]],["get",["showChallengeTooltipComparison"]],["get",["localPlayerChallengesData"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","scoreboard-updated-challenge-icon"],["dynamic-attr","src",["unknown",["updatedChallengeIcon"]],null],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type","pseudoPartSelector"],["right","system","challenge-item-tooltip"]],2]],"locals":[]},{"statements":[["text","      "],["append",["helper",["postgame-scoreboard-player-item"],null,[["itemId"],[["get",["itemId"]]]]],false],["text","\\n"]],"locals":["itemId"]},{"statements":[["text","      "],["append",["helper",["scoreboard-spell"],null,[["spellId","isSmall"],[["get",["player","spell1Id"]],true]]],false],["text","\\n      "],["append",["helper",["scoreboard-spell"],null,[["spellId","isSmall"],[["get",["player","spell2Id"]],true]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","scoreboard-row-spell-icon-placeholder"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","scoreboard-row-spell-icon-placeholder"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["helper",["postgame-scoreboard-player-keystone-icon"],null,[["keystoneId","isSubStyle","circleIconHolder"],[["get",["player","stats","PERK_SUB_STYLE"]],true,true]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["postgame-scoreboard-player-keystone-icon"],null,[["keystoneId","circleIconHolder"],[["get",["player","stats","PERK0"]],true]]],false],["text","\\n"],["block",["if"],[["get",["player","stats","PERK_SUB_STYLE"]]],null,7]],"locals":[]},{"statements":[["text","    "],["append",["helper",["scoreboard-honor-flair"],null,[["isLocalPlayer","isPlayerTeam","isBot","puuid","summonerName","gameName","tagLine","hasScoreboardAnimationPlayed","hasCelebrated","updateHonorCelebrationAnimation"],[["get",["player","isLocalPlayer"]],["get",["team","isPlayerTeam"]],["get",["player","botPlayer"]],["get",["player","puuid"]],["get",["player","summonerName"]],["get",["gameName"]],["get",["tagLine"]],["get",["hasScoreboardAnimationPlayed"]],["get",["hasCelebratedHonor"]],["helper",["action"],[["get",[null]],"updateHonorCelebrationAnimation"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","scoreboard-row-actions-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showPlayerActionsMenu"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","scoreboard-row-champ-name"],["flush-element"],["append",["unknown",["player","championName"]],false],["close-element"],["text","\\n        "]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","scoreboard-row-is-system-muted"],["flush-element"],["append",["unknown",["tra","postgame_system_muted_scoreboard"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isSystemMuted"]]],null,12,11]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","scoreboard-row-leaver-text"],["flush-element"],["append",["unknown",["tra","postgame_afk_penalty_applied_scoreboard"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","lol-uikit-content-block",[]],["static-attr","class","scoreboard-row-lane-position-tooltip"],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","scoreboard-row-lane-position-tooltip-header"],["flush-element"],["append",["unknown",["displayedPositionTranslatedText"]],false],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","scoreboard-row-lane-position-tooltip-description"],["flush-element"],["append",["unknown",["tra","postgame_scoreboard_lane_position_tooltip_description"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","scoreboard-row-position-icon-wrapper centered-flex-box"],["flush-element"],["text","\\n            "],["open-element","img",[]],["static-attr","class","scoreboard-row-position-icon"],["dynamic-attr","src",["concat",["/fe/lol-parties/icon-position-",["unknown",["displayedPosition"]],"-hover.png"]]],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["top"]],15],["text","          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","embellishment-icon-container"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","cancel-icon"],["static-attr","src","/fe/lol-postgame/icon-cancel.svg"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "f/4cIaGT",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\scoreboard-row-actions-menu.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","player-actions-menu-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["actionOptions"]]],null,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["player-action-container ",["unknown",["actionItem","actionName"]]," ",["helper",["if"],[["get",["actionItem","disabled"]],"disabled"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"handleButtonClick",["get",["actionItem"]],["get",["data"]]],null],null],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","player-action-icon"],["dynamic-attr","src",["unknown",["actionItem","iconPath"]],null],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","player-action-label"],["flush-element"],["append",["unknown",["actionItem","label"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["player-actions-divider index-",["get",["index"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["actionItem","index"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "eswVWwHc",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\scoreboard-row-stat-display.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],5],["open-element","div",[]],["static-attr","class","scoreboard-row-stat-sizer centered-flex-box"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showHighestStatValueAchiever"]]],null,4],["text","  "],["open-element","div",[]],["static-attr","class","scoreboard-row-stat-line-primary"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showStatNumberAnimation"]]],null,3,2],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","scoreboard-row-stat-sizer centered-flex-box"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isSecondaryDisplayLineGraph"]]],null,1,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","scoreboard-row-stat-line-secondary"],["flush-element"],["append",["unknown",["statLineSecondary"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","scoreboard-row-stat-graph-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["scoreboard-row-stat-graph-fill ",["helper",["unless"],[["get",["showStatAnimations"]],"css-animate"],null]," ",["helper",["if"],[["get",["player","isLocalPlayer"]],"is-local-player"],null]]]],["dynamic-attr","style",["unknown",["graphFillStyle"]],null],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["statLinePrimary"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["animatedStatLinePrimary"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","scoreboard-row-stat-highest-achiever-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","scoreboard-header-stat-icon-tooltip"],["flush-element"],["text","\\n    "],["append",["unknown",["selectedStatLoc"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "ia862TNQ",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\scoreboard-stat-switcher.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","scoreboard-stat-switcher-arrow left"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"scroll",-1],null],null],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","scoreboard-stat-switcher-icon"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],0],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","scoreboard-stat-switcher-arrow right"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"scroll",1],null],null],["flush-element"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","scoreboard-header-stat-icon-tooltip"],["flush-element"],["text","\\n      "],["append",["unknown",["selectedStatLoc"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "LX8DqmGX",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\v2\\\\animated-play-button.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","postgame-button"],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["postgame-state ",["unknown",["currentState"]]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","img-container"],["flush-element"],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["currentImgPath"]]]]],["flush-element"],["close-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n    "],["open-element","lol-uikit-video-state-machine",[]],["static-attr","class","postgame-button-vsm"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-video-group",[]],["static-attr","class","postgame-button-video"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-video-state",[]],["static-attr","state","intro"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-video",[]],["static-attr","type","intro"],["dynamic-attr","src",["unknown",["videoSource","intro"]],null],["static-attr","preload",""],["flush-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-video-state",[]],["static-attr","state","idle"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-video",[]],["static-attr","type","idle"],["dynamic-attr","src",["unknown",["videoSource","idle"]],null],["flush-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-video-state",[]],["static-attr","state","active"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-video",[]],["static-attr","type","intro"],["dynamic-attr","src",["unknown",["videoSource","active"]],null],["flush-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-video-state",[]],["static-attr","state","hover"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-video",[]],["static-attr","type","idle"],["dynamic-attr","src",["unknown",["videoSource","hover"]],null],["flush-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-video-state-machine",[]],["static-attr","class","postgame-return-button-vsm"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-video-group",[]],["static-attr","class","postgame-return-button-video"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-video-state",[]],["static-attr","state","pulse"],["static-attr","no-preserve-state",""],["flush-element"],["text","\\n        "],["open-element","lol-uikit-video",[]],["static-attr","type","outro"],["dynamic-attr","src",["unknown",["videoSource","pulse"]],null],["flush-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-video-state",[]],["static-attr","state","all-returned"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-video",[]],["static-attr","type","idle"],["dynamic-attr","src",["unknown",["videoSource","allReturned"]],null],["flush-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["button-text ",["unknown",["currentState"]]]]],["flush-element"],["append",["unknown",["buttonText"]],false],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "fRdznux+",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-postgame\\\\src\\\\app\\\\templates\\\\components\\\\shared\\\\scoreboard-spell.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","postgame-player-spell-icon-container"],["flush-element"],["text","\\n  "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["spellData","iconPath"]]]]],["static-attr","class","postgame-player-spell-icon"],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["targetAnchorX","targetAnchorY","tooltipAnchorX","tooltipAnchorY","offsetX","offsetY","restrictArea"],["left","bottom","left","top",-18,5,"whole-window"]],0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","postgame-player-spell-icon-tooltip"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","postgame-player-spell-icon-tooltip-header"],["flush-element"],["text","\\n        "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["spellData","iconPath"]]]]],["static-attr","class","postgame-player-spell-icon-tooltip-icon"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","postgame-player-spell-icon-tooltip-name"],["flush-element"],["append",["unknown",["spellData","name"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","postgame-player-spell-icon-tooltip-level"],["flush-element"],["append",["unknown",["tra","postgame_summoner_spell_level"]],false],["text"," "],["append",["unknown",["spellData","summonerLevel"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","postgame-player-spell-icon-description"],["flush-element"],["append",["unknown",["spellData","description"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }],
        t = {};

    function n(a) {
        var s = t[a];
        if (void 0 !== s) return s.exports;
        var o = t[a] = {
            exports: {}
        };
        return e[a](o, o.exports, n), o.exports
    }
    n.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, (() => {
        "use strict";
        var e, t = (e = n(1)) && e.__esModule ? e : {
            default: e
        };
        const a = "rcp-fe-lol-postgame",
            s = document.currentScript.ownerDocument;
        const o = window.getPluginAnnounceEventName(a);
        s.addEventListener(o, (function(e) {
            (0, e.registrationHandler)((e => t.default.init(e, {
                Audio: e => e.get("rcp-fe-audio"),
                ComponentFactory: e => e.get("rcp-fe-common-libs").getComponentFactory("1"),
                dataBinding: e => e.get("rcp-fe-common-libs").getDataBinding("rcp-fe-lol-postgame"),
                Ember: e => e.get("rcp-fe-ember-libs").getEmber(),
                EmberAddons: e => e.get("rcp-fe-ember-libs").getSharedEmberAddons(),
                emberDataBinding: e => e.get("rcp-fe-ember-libs").getEmberDataBinding("rcp-fe-lol-postgame"),
                emberL10n: e => e.get("rcp-fe-ember-libs").getEmberL10n(1),
                gsap: e => e.get("rcp-fe-common-libs").getGsap("1"),
                gsapCustomEase: e => e.get("rcp-fe-common-libs").getGsapCustomEase("1"),
                leaguesConsts: e => e.get("rcp-fe-lol-shared-components").getApi_LeagueTierNames().getConstants(),
                leagueTierNames: e => e.get("rcp-fe-lol-shared-components").getApi_LeagueTierNames(),
                logger: e => e.get("rcp-fe-common-libs").logging.create(a),
                lottie: e => e.get("rcp-fe-common-libs").getLottie("1"),
                playerNames: e => e.get("rcp-fe-common-libs").playerNames,
                profilePlugin: e => e.get("rcp-fe-lol-profiles"),
                Replays: e => e.get("rcp-fe-lol-shared-components").getApi_Replays(),
                SharedChallengesComponents: e => e.get("rcp-fe-lol-shared-components").getApi_SharedChallengesComponents(),
                SharedChallengesConstants: e => e.get("rcp-fe-lol-shared-components").getApi_SharedChallengesConstants(),
                SharedReportModalApps: e => e.get("rcp-fe-lol-shared-components").getApi_SharedReportModalApps(),
                SharedComponents: e => e.get("rcp-fe-lol-shared-components"),
                SharedEmberComponents: e => e.get("rcp-fe-lol-shared-components").getSharedEmberComponents(),
                socket: e => e.getSocket(),
                Telemetry: e => e.get("rcp-fe-common-libs").getTelemetry("1"),
                UIKit: e => e.get("rcp-fe-lol-uikit"),
                UXSettings: e => e.get("rcp-fe-lol-shared-components").getApi_UXSettings(),
                Viewport: e => e.get("rcp-fe-lol-shared-components").getApi_Viewport(),
                _: e => e.get("rcp-fe-common-libs").getLodash(4)
            }).then((() => {
                const n = e.get("rcp-fe-lol-l10n").tra().overlay("/fe/lol-l10n/trans.json").overlay("/fe/lol-postgame/trans.json").overlay("/fe/lol-shared-components/trans.json").overlay("/fe/lol-shared-components/trans-challenges.json"),
                    a = t.default.emberL10n(t.default.Ember, n);
                return t.default.add({
                    tra: n,
                    traService: a,
                    extEmberModel: t.default.Ember.Object.create({}),
                    emberApplicationFactory: e => e.get("rcp-fe-ember-libs").getEmberApplicationFactory()
                })
            })).then((() => {
                const e = n(2).default,
                    a = new(0, n(4).default)(t.default.emberApplicationFactory),
                    s = new e(a);
                return t.default.add({
                    ApplicationInjector: a,
                    ProgressionComponentHelper: s
                })
            })).then((() => (0, n(5).default)()))))
        }), {
            once: !0
        })
    })()
})();