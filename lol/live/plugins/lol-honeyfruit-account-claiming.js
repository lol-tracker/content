(() => {
    var e = [, e => {
            "use strict";
            let t;

            function n() {
                return t || (console.error("The `provider` object has not been set, please do so by calling the `init` method."), null)
            }
            const l = {
                init: function(e, n) {
                    return t = e, this.add(n)
                },
                _getValue: function(e, n) {
                    let l;
                    return "function" == typeof n ? (l = n(t), l || console.warn("The function for key " + e + " returned a falsy value: ", l)) : "string" == typeof n ? (l = t.get(n), l || console.warn("The provider `get` invocation for the key " + e + " returned a falsy value: ", l)) : "object" == typeof n && (l = n), l
                },
                add: function(e) {
                    e = e || {};
                    const t = [],
                        n = this;
                    return Object.keys(e).forEach((function(l) {
                        const a = e[l],
                            s = n._getValue(l, a);
                        s && s.then ? (s.then((function(e) {
                            e || console.warn("The promise for the key " + l + " resolved with a falsy value: ", e), n._addValue(l, e)
                        })), t.push(s)) : n._addValue(l, s)
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
            e.exports = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.EMBER_APP_NAME = void 0, t.default = function(e) {
                return function(e) {
                    const t = n(3);
                    return Object.assign(t, {
                        name: s,
                        rootElement: e,
                        tra: l.traService,
                        ComponentFactory: l.componentFactory
                    })
                }(e)
            }, t.pluginName = void 0;
            var l = n(1);
            const a = "rcp-fe-lol-honeyfruit-account-claiming";
            t.pluginName = a;
            const s = a;
            t.EMBER_APP_NAME = s
        }, (e, t, n) => {
            "use strict";
            e.exports = {
                Router: n(4).default,
                ApplicationController: n(5).default,
                ErrorMigrationController: n(6).default,
                IndexController: n(7).default,
                LinkCompleteController: n(8).default,
                LinkOnWebController: n(9).default,
                MigrationCompleteController: n(10).default,
                MigrationInProgressController: n(11).default,
                ReviewAccountChangesController: n(12).default,
                WelcomeToLeagueController: n(14).default,
                WelcomeController: n(15).default,
                AccountLinkSummaryComponent: n(16).default,
                AuthFailureOptionComponent: n(17).default,
                AuthFailureOptionsComponent: n(18).default,
                BlankTemplateComponent: n(20).default,
                ButtonBrowserRedirectComponent: n(21).default,
                DashedHeaderComponent: n(22).default,
                EmberFlatButtonComponent: n(23).default,
                EmberModalComponent: n(24).default,
                HeaderDashLeftComponent: n(25).default,
                HeaderDashRightComponent: n(26).default,
                KbaQOptionComponent: n(27).default,
                KbaQuestionComponent: n(28).default,
                LinkToButtonComponent: n(29).default,
                MigrateStatusComponent: n(30).default,
                ModalAnotherAuthMethodComponent: n(31).default,
                ModalComeBackLaterComponent: n(32).default,
                NextBackButtonsComponent: n(33).default,
                ReviewAccountChangeBoxComponent: n(34).default,
                WhatsNextComponent: n(35).default,
                DevCheatsComponent: n(36).default,
                DevTabComponent: n(37).default,
                SwaggerHelpersTabComponent: n(38).default,
                HappStateService: n(39).default,
                HoneyfruitPluginService: n(40).default,
                LeagueClientService: n(41).default,
                MigrationService: n(42).default,
                RouterService: n(43).default,
                ApplicationRoute: n(44).default,
                ContactPlayerSupportRoute: n(45).default,
                ErrorMigrationRoute: n(46).default,
                IndexRoute: n(47).default,
                LinkCompleteRoute: n(48).default,
                LinkOnWebRoute: n(49).default,
                LinkRoute: n(50).default,
                MigrationCompleteRoute: n(51).default,
                MigrationInProgressRoute: n(52).default,
                ReviewAccountChangesRoute: n(53).default,
                WelcomeRoute: n(54).default,
                InvokeActionHelper: n(55).default,
                SummonerNameHelper: n(56).default,
                TEMPLATES: {
                    application: n(57),
                    "error-migration": n(58),
                    index: n(59),
                    "link-complete": n(60),
                    "link-on-web": n(61),
                    loading: n(62),
                    "migration-complete": n(63),
                    "migration-in-progress": n(64),
                    "review-account-changes": n(65),
                    "welcome-to-league": n(66),
                    welcome: n(67),
                    "account-changes/index": n(68),
                    "components/account-link-summary": n(69),
                    "components/auth-failure-option": n(70),
                    "components/auth-failure-options": n(71),
                    "components/blank-template": n(72),
                    "components/button-browser-redirect": n(73),
                    "components/dashed-header": n(74),
                    "components/ember-flat-button": n(75),
                    "components/ember-modal": n(76),
                    "components/header-dash-left": n(77),
                    "components/header-dash-right": n(78),
                    "components/kba-q-option": n(79),
                    "components/kba-question": n(80),
                    "components/link-to-button": n(81),
                    "components/migrate-status": n(82),
                    "components/modal-another-auth-method": n(83),
                    "components/modal-come-back-later": n(84),
                    "components/next-back-buttons": n(85),
                    "components/review-account-change-box": n(86),
                    "components/whats-next": n(87),
                    "review-account-changes/error": n(88),
                    "components/dev-cheats": n(89),
                    "components/dev-tab": n(90),
                    "components/swagger-helpers-tab": n(91)
                }
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            const l = n(1).Ember.Router.extend({
                location: "none"
            });
            l.map((function() {
                this.route("welcome"), this.route("welcome-to-league"), this.route("link-on-web"), this.route("link-complete"), this.route("review-account-changes", (function() {
                    this.route("error")
                })), this.route("migration-in-progress"), this.route("migration-complete"), this.route("error-migration")
            }));
            var a = l;
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1).Ember.Controller.extend({
                RIOT_PUBLIC: Boolean(!0)
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Controller.extend({
                    leagueClient: l.Ember.inject.service(),
                    actions: {
                        hideHApp() {
                            l.honeyfruitAccountClaiming.hide()
                        },
                        exitLeagueClient() {
                            this.get("leagueClient").exit()
                        }
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1).Ember.Controller.extend({});
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Controller.extend({
                    happState: l.Ember.inject.service(),
                    tra: l.Ember.inject.service(),
                    account: l.Ember.computed.alias("happState.garenaRegionLeagueAccount"),
                    init() {
                        this._super(...arguments)
                    },
                    successBodyString: l.Ember.computed("account.summoner_name", (function() {
                        const e = this.get("tra"),
                            t = this.get("account.summoner_name");
                        return e.formatString("account_claim_success_body", {
                            name: t
                        })
                    }))
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1);
            var a = l.Ember.Controller.extend({
                pageBodyLocKey: "link_on_web_body_1",
                region: null,
                isLinked: l.Ember.computed("model", (function() {
                    const {
                        eligible: e,
                        reason_code: t
                    } = this.get("model");
                    return !1 === e && "ALREADY_LINKED" === t
                })),
                init() {
                    this._super(...arguments), this._updateBody(), l.dataBinding.get("/riotclient/region-locale").then((e => {
                        this.set("region", e.region)
                    }))
                },
                _updateBody() {
                    this.set("pageBodyLocKey", "link_on_web_body_1"), setTimeout((() => {
                        this.set("pageBodyLocKey", "link_on_web_body_2")
                    }), 36e4)
                },
                pageBody: l.Ember.computed("pageBodyLocKey", (function() {
                    return this.get("tra." + this.pageBodyLocKey)
                })),
                garenaId: l.Ember.computed("model.account_details", (function() {
                    const e = this.get("model.account_details.garenaId");
                    return e || "???"
                })),
                migrationGuideUrl: l.Ember.computed("region", (function() {
                    let e = "en-us";
                    switch (this.get("region")) {
                        case "TH2":
                            e = "th";
                            break;
                        case "VN2":
                            e = "vi";
                            break;
                        case "TW2":
                            e = "zh-tw"
                    }
                    return `https://support-leagueoflegends.riotgames.com/hc/${e}/articles/10864896283667`
                }))
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Controller.extend({
                    leagueClient: l.Ember.inject.service(),
                    actions: {
                        exitLeagueClient() {
                            this.get("leagueClient").exit()
                        }
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1);
            var a = l.Ember.Controller.extend({
                isSummonerNameInUse: !1,
                migrationTextIndex: 0,
                init() {
                    this._super(...arguments), this._migrationTextInterval = setInterval((() => {
                        const e = this.get("migrationTextIndex") || 0,
                            t = this.get("migrationTextList");
                        this.set("migrationTextIndex", e < t.length - 1 ? e + 1 : 0)
                    }), 2500)
                },
                migrationTextList: l.Ember.computed("tra", (function() {
                    return [this.get("tra.data_migration_in_progress_sub_title_1"), this.get("tra.data_migration_in_progress_sub_title_2"), this.get("tra.data_migration_in_progress_sub_title_3"), this.get("tra.data_migration_in_progress_sub_title_4"), this.get("tra.data_migration_in_progress_sub_title_5"), this.get("tra.data_migration_in_progress_sub_title_6")]
                })),
                migrationText: l.Ember.computed("migrationTextIndex", (function() {
                    const e = this.get("migrationTextIndex");
                    return this.get("migrationTextList")[e]
                })),
                actions: {
                    modalOkayPressed() {
                        this.get("model").startMigrationComplete.then((() => {
                            l.logger.trace("Migration complete and summoner-name in-use acknowledged."), this.transitionToRoute("migration-complete")
                        }))
                    }
                }
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l, a = n(1),
                s = (l = n(13)) && l.__esModule ? l : {
                    default: l
                };
            const o = s.default.REVIEW_ACCOUNT_CHANGE_BOXES,
                i = s.default.REVIEW_ACCOUNT_CHANGE_WARNINGS;
            var r = a.Ember.Controller.extend({
                happState: a.Ember.inject.service(),
                account: a.Ember.computed.alias("happState.garenaRegionLeagueAccount"),
                hasPlayedAGame: a.Ember.computed.alias("happState.garenaRegionLeagueAccount.has_played_a_game"),
                isReservedSummonerName: a.Ember.computed.alias("happState.garenaRegionLeagueAccount.is_reserved_summoner_name"),
                importedItems: a.Ember.computed("hasPlayedAGame", "isReservedSummonerName", (function() {
                    const e = this.get("hasPlayedAGame"),
                        t = this.get("isReservedSummonerName");
                    return t ? e ? [this.buildBox(o.PROGRESS_AND_RANKED_HISTORY, i.OVERWRITTEN), this.buildBox(o.IDENTITY_AND_FRIENDS, i.OVERWRITTEN), this.buildBox(o.LOOT_INVENTORY, i.OVERWRITTEN)] : [this.buildBox(o.PROGRESS_AND_RANKED_HISTORY), this.buildBox(o.IDENTITY_AND_FRIENDS), this.buildBox(o.LOOT_INVENTORY), this.buildBox(o.CONTENT), this.buildBox(o.RP_BALANCE), this.buildBox(o.ESSENCE_BALANCES)] : t ? [] : e ? [this.buildBox(o.PROGRESS_AND_RANKED_HISTORY, i.OVERWRITTEN), this.buildBox(o.IDENTITY_AND_FRIENDS, i.NOT_GUARANTEED), this.buildBox(o.LOOT_INVENTORY, i.OVERWRITTEN)] : [this.buildBox(o.PROGRESS_AND_RANKED_HISTORY), this.buildBox(o.IDENTITY_AND_FRIENDS, i.NOT_GUARANTEED), this.buildBox(o.LOOT_INVENTORY), this.buildBox(o.CONTENT), this.buildBox(o.RP_BALANCE), this.buildBox(o.ESSENCE_BALANCES)]
                })),
                buildBox: (e, t = null) => ({
                    type: e,
                    warning: t
                }),
                mergedItems: a.Ember.computed("hasPlayedAGame", "isReservedSummonerName", (function() {
                    return this.get("hasPlayedAGame") ? [this.buildBox(o.RP_BALANCE), this.buildBox(o.ESSENCE_BALANCES), this.buildBox(o.CONTENT, i.POSSIBLE_DUPLICATES)] : []
                })),
                changedItems: a.Ember.computed("hasPlayedAGame", "isReservedSummonerName", (function() {
                    return [this.buildBox(o.NEW_SEASON_START), this.buildBox(o.FRESH_MATCH_HISTORY)]
                }))
            });
            t.default = r
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            t.default = {
                REVIEW_ACCOUNT_CHANGE_BOXES: {
                    PROGRESS_AND_RANKED_HISTORY: "PROGRESS_AND_RANKED_HISTORY",
                    IDENTITY_AND_FRIENDS: "IDENTITY_AND_FRIENDS",
                    LOOT_INVENTORY: "LOOT_INVENTORY",
                    CONTENT: "CONTENT",
                    RP_BALANCE: "RP_BALANCE",
                    ESSENCE_BALANCES: "ESSENCE_BALANCES",
                    NEW_SEASON_START: "NEW_SEASON_START",
                    FRESH_MATCH_HISTORY: "FRESH_MATCH_HISTORY"
                },
                REVIEW_ACCOUNT_CHANGE_WARNINGS: {
                    OVERWRITTEN: "OVERWRITTEN",
                    POSSIBLE_DUPLICATES: "POSSIBLE_DUPLICATES",
                    NOT_GUARANTEED: "NOT_GUARANTEED"
                },
                REVIEW_ACCOUNT_COLUMNS: {
                    IMPORT: "IMPORTED",
                    MERGE: "MERGED"
                },
                MIGRATION_RESULT_CODE: {
                    COMPLETED_SUCCESSFULLY: "COMPLETED_SUCCESSFULLY",
                    READY: "READY",
                    IN_PROGRESS: "IN_PROGRESS",
                    SUCCESS: "SUCCESS",
                    FAILURE: "FAILURE"
                },
                LINKING_STATUS: {
                    ALREADY_LINKED: "ALREADY_LINKED",
                    ACCESS_TOKEN_EXPIRED: "ACCESS_TOKEN_EXPIRED",
                    BAD_AUTHORIZATION_PARAM: "BAD_AUTHORIZATION_PARAM",
                    DEGRADED: "DEGRADED",
                    DISABLED: "DISABLED",
                    NOT_LINKED: "NOT_LINKED",
                    REQUEST_FAILURE: "REQUEST_FAILURE",
                    UNHANDLED_SERVER_SIDE_ERROR: "UNHANDLED_SERVER_SIDE_ERROR"
                }
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Controller.extend({
                    actions: {
                        closeHApp() {
                            l.honeyfruitAccountClaiming.confirmIsNewPlayer(), l.honeyfruitAccountClaiming.hide()
                        }
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1).Ember.Controller.extend({});
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Component.extend({
                    classNames: ["account-link-summary"],
                    linked: !1,
                    email: "",
                    garenaId: null,
                    summonerName: "",
                    platformId: "",
                    summonerIconId: null,
                    region: l.Ember.computed("platformId", (function() {
                        const e = this.get("platformId");
                        if (!e) return "??";
                        const t = e.match(/_(.*)/);
                        return t && t[1] ? t[1] : e
                    })),
                    summonerIconUrl: l.Ember.computed("summonerIconId", (function() {
                        const e = this.get("summonerIconId");
                        return l.summonerIconManager.getIconUrlById(e)
                    }))
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1).Ember.Component.extend({
                classNames: ["auth-failure-option"],
                classNameBindings: ["isHover:border-yellow-200", "isHover:bg-yellow-100", "isSelected:bg-gray-100", "isDisabled:disabled"],
                selectThis: null,
                isSelected: !1,
                isDisabled: !1,
                isHover: !1,
                mouseEnter() {
                    this.set("isHover", !this.get("isHover"))
                },
                mouseLeave() {
                    this.set("isHover", !this.get("isHover"))
                },
                click() {
                    this.get("isDisabled") || this.selectThis()
                }
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = n(19),
                s = l.Ember.Component.extend({
                    classNames: ["auth-failure-options"],
                    ACTIONS_NAMES: a.ACTIONS_NAMES,
                    selectAction: null,
                    tryAgainDisabled: !1,
                    comeBackLaterDisabled: !1,
                    startOverDisabled: !1,
                    selectedActionName: null,
                    isTryAgainSelected: l.Ember.computed.equal("selectedActionName", a.ACTIONS_NAMES.TRY_AGAIN),
                    isComeBackSelected: l.Ember.computed.equal("selectedActionName", a.ACTIONS_NAMES.COME_BACK_LATER),
                    isStartOverSelected: l.Ember.computed.equal("selectedActionName", a.ACTIONS_NAMES.START_OVER),
                    actions: {
                        optionClicked(e) {
                            this.set("selectedActionName", e), this.selectAction(e)
                        }
                    }
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.QUESTION_TYPES = t.DEV_STATES = t.ACTIONS_NAMES = void 0, t.fetchAccountStatus = function(e) {
                if (a) return o(a, e);
                const t = "/lol-summoner/v1/current-summoner";
                let n;
                const i = function(r) {
                    r.puuid && (l.dataBinding.unobserve(t, i), a = r.puuid, s || (s = !0, o(a, e).then((function(e) {
                        n(e)
                    }))))
                };
                return new Promise((function(e) {
                    n = e, l.dataBinding.observe(t, i)
                }))
            }, t.setTimeoutPromise = function(e) {
                return new Promise((function(t) {
                    setTimeout(t, e)
                }))
            };
            var l = n(1);
            t.DEV_STATES = {
                NEVER_LOAD: "never load",
                ERROR: "error",
                DATA_LOADED: "data loaded"
            };
            t.ACTIONS_NAMES = {
                TRY_AGAIN: "try again",
                COME_BACK_LATER: "come back later",
                START_OVER: "start over"
            };
            let a;
            t.QUESTION_TYPES = {
                SUMMONER_NAME: "SUMMONER_NAME",
                MULTIPLE_CHOICE: "MULTIPLE_CHOICE"
            };
            let s = !1;

            function o(e, t) {
                const n = "/lol-honeyfruit/v1/account-claim/account-status/" + e;
                return l.dataBinding.get(n, t)
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1).Ember.Component.extend({
                tagName: ""
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Component.extend({
                    tagName: "span",
                    classNames: ["browser-redirect"],
                    didInsertElement() {
                        this._super(...arguments), this._launchBrowser()
                    },
                    _launchBrowser() {
                        l.dataBinding.post("/lol-honeyfruit/v1/account-claim/linking-redirect")
                    },
                    click() {
                        this._launchBrowser()
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1).Ember.Component.extend({
                tagName: "h1",
                classNames: ["dashed-header"]
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Component.extend({
                    tagName: "",
                    clickAction: null,
                    routeName: null,
                    disabled: !1,
                    title: "",
                    actions: {
                        buttonClick() {
                            const e = this.get("clickAction");
                            e && e();
                            const t = this.get("routeName"),
                                n = this.get("routeModel");
                            if (t) {
                                const e = l.Ember.getOwner(this).lookup("controller:application");
                                n ? e.transitionToRoute(t, n) : e.transitionToRoute(t)
                            }
                        }
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Component.extend({
                    classNames: ["ember-modal"],
                    tagName: "span",
                    isOpen: null,
                    isClose: null,
                    isToggle: null,
                    modalClass: "",
                    okAction: null,
                    closeAction: null,
                    modalRoot: null,
                    _isOpen: !1,
                    shouldOpen: l.Ember.computed("isOpen", "isToggle", (function() {
                        const e = this.get("isOpen"),
                            t = this.get("isToggle");
                        return this._shouldOpen(e, t)
                    })),
                    _shouldOpen(e, t) {
                        return !!this.modalRoot && (null !== e ? e : !0 === t)
                    },
                    shouldClose: l.Ember.computed("isClose", "isToggle", (function() {
                        if (!this.modalRoot) return !1;
                        const e = this.get("isClose");
                        if (null !== e) return e;
                        return !1 === this.get("isToggle")
                    })),
                    modalRootClassName: l.Ember.computed("modalClass", (function() {
                        return "happ-modal-root " + this.get("modalClass")
                    })),
                    modalRootSelector: l.Ember.computed("modalRootClassName", (function() {
                        return "." + this.get("modalRootClassName").trim().split(" ").join(".")
                    })),
                    didInsertElement() {
                        this._super(...arguments);
                        const e = this.get("modalRootSelector");
                        if (this.modalRoot = this.element.querySelector(e), !this.modalRoot) throw new Error("Could not find a DOM root for the modal.");
                        this.element.removeChild(this.modalRoot);
                        const t = this.get("modalRootClassName");
                        this.modalRoot.className = t;
                        const n = this.get("isOpen"),
                            l = this.get("isToggle");
                        this._shouldOpen(n, l) && this._open()
                    },
                    _hide() {
                        this.modalRoot && this.modalRoot.parentElement && document.querySelector(".rcp-fe-viewport-overlay").removeChild(this.modalRoot)
                    },
                    _open() {
                        (this.element || this.modalRoot) && document.querySelector(".rcp-fe-viewport-overlay").appendChild(this.modalRoot)
                    },
                    actions: {
                        open() {
                            this._open()
                        },
                        ok() {
                            const e = this.get("okAction");
                            e && e(), this._hide()
                        },
                        close() {
                            const e = this.get("closeAction");
                            e && e(), this._hide()
                        }
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1).Ember.Component.extend({
                tagName: ""
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1).Ember.Component.extend({
                tagName: ""
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Component.extend({
                    classNames: ["kba-question-option"],
                    classNameBindings: ["isSelected:selected"],
                    option: null,
                    selectedAnswer: null,
                    selectAnswer: null,
                    isSelected: l.Ember.computed("option", "selectedAnswer", (function() {
                        return this.get("option") === this.get("selectedAnswer")
                    })),
                    click() {
                        const e = this.get("option");
                        this.get("selectAnswer")(e)
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = n(19),
                s = l.Ember.Component.extend({
                    question: null,
                    selectedAnswer: null,
                    selectAnswer: null,
                    isSummonerNameQuestion: l.Ember.computed.equal("question.questionType", a.QUESTION_TYPES.SUMMONER_NAME),
                    init() {
                        this._super(...arguments);
                        this.get("isSummonerNameQuestion") && this._redefineSelectAnswer()
                    },
                    _redefineSelectAnswer() {
                        const e = this.get("selectAnswer");
                        this.set("selectAnswer", (() => {
                            const t = this.get("answerSummonerName");
                            e(t)
                        }))
                    },
                    answerSummonerName: null
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            const l = n(1).Ember.Component.extend({
                tagName: "",
                disabled: !1,
                primary: !1
            });
            l.reopenClass({
                positionalParams: ["route", "model"]
            });
            var a = l;
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Component.extend({
                    classNames: ["migrate-status"],
                    classNameBindings: ["type"],
                    happState: l.Ember.inject.service(),
                    icon: null,
                    type: "",
                    title: null
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Component.extend({
                    tagName: "",
                    features: l.Ember.inject.service()
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Component.extend({
                    tagName: "",
                    leagueClient: l.Ember.inject.service(),
                    redirectUrl: "",
                    redirectUrlText: l.Ember.computed("redirectUrl", (function() {
                        return this.get("redirectUrl").replace(/^https:\/\//, "")
                    })),
                    init() {
                        this._super(...arguments);
                        l.dataBinding.observe("/lol-client-config/v3/client-config/lol.client_settings.honeyfruit.redirect_url", (e => {
                            this.set("redirectUrl", e)
                        }))
                    },
                    actions: {
                        exitLeagueClient: function() {
                            this.get("leagueClient").exit()
                        }
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1);
            var a = l.Ember.Component.extend({
                classNames: ["next-back-buttons"],
                backRoute: null,
                backModel: null,
                nextRoute: null,
                nextModel: null,
                backDisabled: l.Ember.computed.not("backRoute"),
                nextDisabled: l.Ember.computed.not("nextRoute")
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l, a = n(1),
                s = (l = n(13)) && l.__esModule ? l : {
                    default: l
                };
            s.default.REVIEW_ACCOUNT_CHANGE_BOXES;
            const o = s.default.REVIEW_ACCOUNT_CHANGE_WARNINGS,
                i = s.default.REVIEW_ACCOUNT_COLUMNS,
                r = {
                    PROGRESS_AND_RANKED_HISTORY: {
                        icon: "fe/lol-static-assets/images/npe-rewards-xp-boost.png",
                        boxTitle: "tooltip_progress_and_ranked_history_title",
                        tooltipBody: "tooltip_progress_and_ranked_history_body",
                        tooltipList: [{
                            icon: "fe/lol-static-assets/images/red-warning.png",
                            text: "label_ranked_history"
                        }, {
                            icon: "fe/lol-static-assets/images/npe-rewards-champion.png",
                            text: "label_mastery_and_eternerals_progress"
                        }, {
                            icon: "fe/lol-static-assets/images/npe-rewards-xp-boost.png",
                            text: "label_level"
                        }, {
                            icon: "fe/lol-static-assets/images/challenges-shared/icon-map-classic.svg",
                            text: "label_mmr_per_queue"
                        }]
                    },
                    IDENTITY_AND_FRIENDS: {
                        icon: "fe/lol-static-assets/images/nav-icon-profile.svg",
                        boxTitle: "tooltip_identity_and_friends_title",
                        tooltipBody: "tooltip_identity_body",
                        tooltipList: [{
                            icon: "fe/lol-static-assets/images/nav-icon-profile.svg",
                            text: "label_summoner_name"
                        }, {
                            icon: "fe/lol-static-assets/images/challenges-shared/icon_people.svg",
                            text: "label_friends_list"
                        }]
                    },
                    LOOT_INVENTORY: {
                        icon: "fe/lol-static-assets/images/nav-icon-loot.svg",
                        boxTitle: "tooltip_loot_inventory_title",
                        tooltipBody: "tooltip_loot_inventory_body"
                    },
                    CONTENT: {
                        icon: "fe/lol-static-assets/images/nav-icon-collections.svg",
                        boxTitle: "tooltip_content_title",
                        tooltipBody: "tooltip_content_body"
                    },
                    RP_BALANCE: {
                        icon: "/fe/lol-static-assets/images/icon-rp-24.png",
                        boxTitle: "tooltip_rp_balance_title"
                    },
                    ESSENCE_BALANCES: {
                        icon: "fe/lol-static-assets/images/npe-rewards-essence-white.png",
                        boxTitle: "tooltip_essence_balances_title"
                    },
                    NEW_SEASON_START: {
                        icon: "fe/lol-static-assets/images/red-warning.png",
                        boxTitle: "tooltip_new_season_start_title",
                        tooltipBody: "tooltip_new_season_start_body"
                    },
                    FRESH_MATCH_HISTORY: {
                        icon: "fe/lol-static-assets/images/npe-rewards-champion.png",
                        boxTitle: "tooltip_match_history_title",
                        tooltipBody: "tooltip_match_history_body"
                    }
                },
                c = {
                    PROGRESS_AND_RANKED_HISTORY: {
                        [o.OVERWRITTEN]: {
                            tooltipBody: "tooltip_progress_and_ranked_history_body_overwritten"
                        }
                    },
                    IDENTITY_AND_FRIENDS: {
                        [o.OVERWRITTEN]: {
                            tooltipBody: "topoltip_identity_body_overwritten"
                        },
                        [o.NOT_GUARANTEED]: {
                            tooltipBody: "tooltip_identity_body_not_guaranteed"
                        }
                    },
                    LOOT_INVENTORY: {
                        [o.OVERWRITTEN]: {
                            tooltipBody: "tooltip_loot_inventory_body_overwritten"
                        }
                    },
                    CONTENT: {
                        [o.POSSIBLE_DUPLICATES]: {
                            tooltipBody: "tooltip_content_body_possible_duplicates"
                        }
                    }
                },
                u = {
                    RP_BALANCE: {
                        [i.IMPORT]: {
                            tooltipBody: "tooltip_rp_balance_body_import"
                        },
                        [i.MERGE]: {
                            tooltipBody: "tooltip_rp_balance_body_merge"
                        }
                    },
                    ESSENCE_BALANCES: {
                        [i.IMPORT]: {
                            tooltipBody: "tooltip_essence_balances_body_import"
                        },
                        [i.MERGE]: {
                            tooltipBody: "tooltip_essence_balances_body_merge"
                        }
                    }
                };
            var m = a.Ember.Component.extend({
                classNames: ["review-account-change-box"],
                type: null,
                warning: null,
                column: null,
                init() {
                    this._super(...arguments);
                    const e = this.get("type"),
                        t = r[e];
                    t ? this._setBoxData(t) : a.logger.error(`Type [${e}] is not a valid type to create a ReviewAccountChangeBoxComponent`)
                },
                overwritten: a.Ember.computed.equal("warning", o.OVERWRITTEN),
                notGuaranteed: a.Ember.computed.equal("warning", o.NOT_GUARANTEED),
                possibleDupes: a.Ember.computed.equal("warning", o.POSSIBLE_DUPLICATES),
                hasWarning: a.Ember.computed.or("overwritten", "notGuaranteed", "possibleDupes"),
                warningOverrides: a.Ember.computed("warning", (function() {
                    const e = this.get("type"),
                        t = this.get("warning");
                    return c[e] && c[e][t] ? c[e][t] : null
                })),
                hasWarningOverrides: a.Ember.computed.bool("warningOverrides"),
                warningMessage: a.Ember.computed("warning", "hasWarning", (function() {
                    return this.buildWarningMessage("label_overwritten")
                })),
                buildWarningMessage(e) {
                    const t = this.get("tra"),
                        n = this.get("hasWarning"),
                        l = this.get("warning");
                    if (!n) return "";
                    switch (l) {
                        case o.OVERWRITTEN:
                            return t.get(e);
                        case o.NOT_GUARANTEED:
                            return t.get("label_not_guaranteed");
                        case o.POSSIBLE_DUPLICATES:
                            return t.get("label_possible_duplicates")
                    }
                },
                tooltipWarningMessage: a.Ember.computed("warning", "hasWarning", (function() {
                    return this.buildWarningMessage("label_overwrites_existing_data")
                })),
                columnOverride: a.Ember.computed("column", (function() {
                    const e = this.get("type"),
                        t = this.get("column");
                    return u[e] && u[e][t] ? u[e][t] : null
                })),
                hasColumnOverride: a.Ember.computed.bool("columnOverride"),
                _setBoxData(e) {
                    this.set("icon", "/fe/lol-static-assets/images/icon-rp-24.png"), this._loadData(e), this.get("hasWarningOverrides") && this._loadData(this.get("warningOverrides")), this.get("hasColumnOverride") && this._loadData(this.get("columnOverride"))
                },
                _loadData(e) {
                    const t = this.get("tra");
                    for (const [n, l] of Object.entries(e))
                        if ("icon" === n) this.set(n, l);
                        else if ("tooltipList" === n) {
                        const e = [];
                        l.forEach((n => e.push({
                            icon: n.icon,
                            text: t.get(n.text)
                        }))), this.set(n, e)
                    } else this.set(n, t.get(l))
                }
            });
            t.default = m
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1).Ember.Component.extend({
                tagName: ""
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Component.extend({
                    classNames: ["dev-cheats"],
                    classNameBindings: ["show:dev-cheats-show"],
                    show: !1,
                    selectedTab: "dev-tab",
                    actions: {
                        toggle: function() {
                            this.set("show", !this.get("show"))
                        },
                        selectTab(e) {
                            this.set("selectedTab", e)
                        },
                        closeHApp() {
                            l.honeyfruitAccountClaiming.hide()
                        }
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Component.extend({
                    classNames: "dev-tab",
                    honeyfruitPlugin: l.Ember.inject.service(),
                    happState: l.Ember.inject.service(),
                    mockGarenaRegionLeagueAccount: {
                        garena_id: 1e6,
                        puuid: 2e6,
                        platform_id: "ci2_CI2",
                        summoner_name: "sixteen charctrs",
                        summoner_level: 30,
                        summoner_icon_id: 1,
                        is_reserved_summoner_name: !0,
                        has_played_a_game: !0
                    },
                    actions: {
                        hideHapp() {
                            l.honeyfruitAccountClaiming.hide()
                        },
                        setMockHAppState(e, t) {
                            const n = this.get("mockGarenaRegionLeagueAccount");
                            this.set("mockGarenaRegionLeagueAccount.is_reserved_summoner_name", e), this.set("mockGarenaRegionLeagueAccount.has_played_a_game", t);
                            const l = this.get("happState");
                            l.set("garenaRegionLeagueAccount", n), l.set("email", "dev*****@rio*******.com")
                        }
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Component.extend({
                    classNames: "dev-swagger-helpers",
                    loggedInPuuid: null,
                    rsoToken: null,
                    rsoUserInfoToken: null,
                    accountStatus: null,
                    loltransferPwd: null,
                    link_type: "FULL",
                    accountsString: "lcudev_16614467243_ci1\tlcudev_16614467243_ci2\t5a893223-327e-52a5-bce4-f6c3bd0c1873\t17cc1dd1-12aa-5a34-a1e2-92d047ea011a\t3052435555943770\t3052435726566750\tci1\tci2\taccountcreation@riotgames.com\t2022TestHF02!!",
                    s2sHost: "10.11.136.70:8080",
                    happState: l.Ember.inject.service(),
                    honeyfruitPlugin: l.Ember.inject.service(),
                    xRiotAuthPayload: l.Ember.computed("rsoToken", (function() {
                        const e = this.get("rsoToken");
                        return e ? e.split(".")[1] : ""
                    })),
                    s2sAuthorization: l.Ember.computed("loltransferPwd", (function() {
                        const e = this.get("loltransferPwd");
                        if (!e) return null;
                        return "Basic " + btoa(`loltransfer:${e}`)
                    })),
                    isS2SDisabled: l.Ember.computed("s2sAuthorization", (function() {
                        return !this.get("s2sAuthorization")
                    })),
                    init() {
                        this._super(...arguments), l.dataBinding.get("/lol-summoner/v1/current-summoner").then((e => {
                            e && this.set("loggedInPuuid", e.puuid)
                        })), this._getRsoToken(), this._getRsoUserInfoToken()
                    },
                    _getRsoToken() {
                        return l.dataBinding.get("/lol-rso-auth/v1/authorization/access-token").then((e => {
                            this.set("rsoToken", e.token)
                        }))
                    },
                    _getRsoUserInfoToken() {
                        return l.dataBinding.get("/lol-rso-auth/v1/authorization/userinfo").then((e => {
                            e.userInfo && this.set("rsoUserInfoToken", e.userInfo)
                        }))
                    },
                    _getStatus() {
                        this.get("honeyfruitPlugin").fetchAccountStatus({
                            skipCache: !0
                        }).then((e => {
                            const t = e.linking_status;
                            l.logger.info("accountStatus", t), this.set("accountStatus", t)
                        }))
                    },
                    accountStringList: l.Ember.computed("accountsString", (function() {
                        return (this.get("accountsString") || "").replaceAll(/\s+/g, " ").split(" ")
                    })),
                    puuid_dst: l.Ember.computed("accountStringList", (function() {
                        return this.get("accountStringList")[3]
                    })),
                    puuid_src: l.Ember.computed("accountStringList", (function() {
                        return this.get("accountStringList")[2]
                    })),
                    region_src: l.Ember.computed("accountStringList", (function() {
                        return this.get("accountStringList")[6]
                    })),
                    account_id_src: l.Ember.computed("accountStringList", (function() {
                        return this.get("accountStringList")[4]
                    })),
                    actions: {
                        getStatus() {
                            this._getStatus()
                        },
                        async refreshRsoToken() {
                            await this._getRsoToken()
                        }
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Service.extend({
                    garenaRegionLeagueAccount: null,
                    email: null,
                    summonerIconUrl: l.Ember.computed("garenaRegionLeagueAccount.summoner_icon_id", (function() {
                        const e = this.get("garenaRegionLeagueAccount.summoner_icon_id");
                        return l.summonerIconManager.getIconUrlById(e)
                    })),
                    reset() {
                        this.set("garenaRegionLeagueAccount", null), this.set("email", null)
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l, a = n(1),
                s = (l = n(13)) && l.__esModule ? l : {
                    default: l
                },
                o = n(19);
            const {
                MIGRATION_RESULT_CODE: i
            } = s.default;
            var r = a.Ember.Service.extend({
                accountClaimDetails: null,
                fetchAccountStatus: e => (0, o.fetchAccountStatus)(e),
                isAccountMigrated() {
                    return this.fetchAccountStatus().then((e => {
                        const {
                            migration_status: t
                        } = e;
                        return t === i.COMPLETED_SUCCESSFULLY
                    }))
                },
                isAccountEligible(e) {
                    return e ? this._isAccountEligible(e) : this.fetchAccountStatus().then((e => this._isAccountEligible(e.linking_status)))
                },
                observeUntilLinked: () => new Promise((e => {
                    const t = "/lol-honeyfruit/v1/account-claim/account-status",
                        n = l => {
                            const s = l && l.linking_status ? l.linking_status.account_details : null;
                            if (!s) return null;
                            a.dataBinding.unobserve(t, n), e(s)
                        };
                    a.dataBinding.observe(t, n)
                })),
                _isAccountEligible(e) {
                    if (!e) {
                        return !0
                    }
                    const {
                        reason_code: t,
                        eligible: n
                    } = e;
                    return n || a.logger.info(`linking status eligibility: <${n}> reason: <${t}>`), n
                }
            });
            t.default = r
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Service.extend({
                    exit() {
                        window.riotInvoke ? window.riotInvoke({
                            request: JSON.stringify({
                                name: "RiotClient.Exit",
                                params: []
                            })
                        }) : l.logger.trace("`window.riotInvoke` was not available.")
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = n(19),
                s = l.Ember.Service.extend({
                    migrationStatus: null,
                    getUXTimer: function() {
                        return (0, a.setTimeoutPromise)(2500)
                    },
                    _migrationInProgress: null,
                    _waitForMigrationComplete: () => l.dataBinding.post("/lol-honeyfruit/v1/account-claim/migration").then((function() {
                        return new Promise((function(e, t) {
                            l.dataBinding.observe("/lol-honeyfruit/v1/account-claim/migration", (n => {
                                switch (l.logger.warning("waitForMigrationComplete, Migration status updated:", n), l.dataBinding.unobserve("/lol-honeyfruit/v1/account-claim/migration"), n) {
                                    case "SUCCESS":
                                        return void e(n);
                                    case "FAILURE":
                                        return void t(n);
                                    default:
                                        l.logger.warning("waitForMigrationComplete, Migration still pending")
                                }
                            }))
                        }))
                    })),
                    waitForMigrationComplete() {
                        return this._migrationInProgress || (this._migrationInProgress = this._waitForMigrationComplete(), this._migrationInProgress.finally((() => {
                            this._migrationInProgress = null
                        }))), this._migrationInProgress
                    },
                    startTransfer() {
                        return Promise.all([this.waitForMigrationComplete(), this.getUXTimer()])
                    }
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1);
            const {
                Service: a,
                computed: s
            } = l.Ember, {
                readOnly: o,
                or: i
            } = s;
            (function(e, t) {
                const n = e.split(".");
                return `${n.shift()}.${n.shift()}` >= t
            })(l.Ember.VERSION, 2.15) && l.logger.error(`services/router :: this version of ember (${l.Ember.VERSION}) now supports services.router, please remove this file`);
            const r = a.extend({
                currentRouteName: o("_router.currentRouteName"),
                currentURL: i("_router.currentURL", "_router.url"),
                location: o("_router.location"),
                rootURL: o("_router.rootURL"),
                _router: null,
                transitionTo(...e) {
                    let t;
                    const n = e[0];
                    if ("string" == typeof(l = n) && ("" === l || "/" === l[0])) return this._router._doURLTransition("transitionTo", n);
                    var l;
                    const a = e[e.length - 1];
                    t = a && a.hasOwnProperty("queryParams") ? e.pop().queryParams : {};
                    const s = e.shift(),
                        o = this._router._doTransition(s, e, t, !0);
                    return o._keepDefaultQueryParamValues = !0, o
                },
                replaceWith() {
                    return this.transitionTo(...arguments).method("replace")
                },
                urlFor() {
                    return this._router.generate(...arguments)
                },
                isActive() {
                    const {
                        routeName: e,
                        models: t,
                        queryParams: n
                    } = this._extractArguments(...arguments), l = this._router._routerMicrolib || this._router.router, a = l.state;
                    if (!l.isActiveIntent(e, t, null)) return !1;
                    return !(Object.keys(n).length > 0) || (this._router._prepareQueryParams(e, t, n, !0), function(e, t) {
                        let n;
                        for (n in e)
                            if (e.hasOwnProperty(n) && e[n] !== t[n]) return !1;
                        for (n in t)
                            if (t.hasOwnProperty(n) && e[n] !== t[n]) return !1;
                        return !0
                    }(n, a.queryParams))
                },
                _extractArguments(e, ...t) {
                    const n = t[t.length - 1];
                    let l = {};
                    if (n && n.hasOwnProperty("queryParams")) {
                        l = t.pop().queryParams
                    }
                    return {
                        routeName: e,
                        models: t,
                        queryParams: l
                    }
                }
            });
            l.Ember.Application.reopenClass({
                buildRegistry() {
                    const e = this._super(...arguments);
                    return e.register("service:router", r), e.injection("service:router", "_router", "router:main"), e
                }
            });
            var c = r;
            t.default = c
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1).Ember.Route.extend({});
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1).Ember.Route.extend({});
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1).Ember.Route.extend({});
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1).Ember.Route.extend({});
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Route.extend({
                    migration: l.Ember.inject.service(),
                    honeyfruitPlugin: l.Ember.inject.service(),
                    model() {
                        return this.get("honeyfruitPlugin").isAccountMigrated().then((e => {
                            e && this.transitionTo("migration-complete")
                        }))
                    },
                    actions: {
                        didTransition() {
                            this.get("migration").startTransfer()
                        }
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Route.extend({
                    honeyfruitPlugin: l.Ember.inject.service(),
                    happState: l.Ember.inject.service(),
                    model() {
                        const e = this.get("honeyfruitPlugin");
                        return e.fetchAccountStatus().then((t => {
                            (t = t.linking_status) || this.transitionTo("index");
                            const {
                                email: n,
                                account_details: l
                            } = t, a = this.get("happState");
                            return a.set("garenaRegionLeagueAccount", l), a.set("email", n), e.isAccountEligible(t) || this.transitionTo("link-complete"), t
                        }))
                    },
                    activate() {
                        this.get("honeyfruitPlugin").observeUntilLinked().then((e => {
                            if (!e) return;
                            this.get("happState").set("garenaRegionLeagueAccount", e), this.transitionTo("link-complete")
                        }))
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1).Ember.Route.extend({
                model: e => e
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1).Ember.Route.extend({});
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = l.Ember.Route.extend({
                    happState: l.Ember.inject.service(),
                    migration: l.Ember.inject.service(),
                    _migrationTextInterval: null,
                    actions: {
                        didTransition() {
                            this.get("migration").startTransfer().then((() => {
                                this.transitionTo("migration-complete")
                            })).catch((() => {
                                this.transitionTo("error-migration")
                            })).finally((() => {
                                clearInterval(this._migrationTextInterval)
                            }))
                        }
                    }
                });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1).Ember.Route.extend({});
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1).Ember.Route.extend({});
            t.default = l
        }, (e, t, n) => {
            "use strict";

            function l(e) {
                const t = e[0];
                t && "function" == typeof t && t()
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0, t.invokeAction = l;
            var a = n(1).Ember.Helper.helper(l);
            t.default = a
        }, (e, t, n) => {
            "use strict";

            function l(e) {
                return `<span class="summoner-name">${e[0]} (${e[1]})</span>`
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0, t.summonerName = l;
            var a = n(1).Ember.Helper.helper(l);
            t.default = a
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "UG+Rveai",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\application.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["text","\\n"],["block",["unless"],[["get",["RIOT_PUBLIC"]]],null,0],["text","\\n"],["append",["unknown",["outlet"]],false],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["unknown",["dev-cheats"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "vIAAHVBa",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\error-migration.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["block",["migrate-status"],null,[["type","icon","title"],["failure","/fe/lol-static-assets/images/red-warning.png",["get",["tra","data_migration_failure_title"]]]],0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","error"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","data_migration_failure_sorry_it_failed_subtitle"]],false],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["flush-element"],["text","\\n    "],["append",["helper",["sanitize"],[["get",["tra","data_migration_failure_body_1"]]],null],false],["text","\\n    "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n    "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n    "],["append",["helper",["sanitize"],[["get",["tra","data_migration_failure_body_2"]]],null],false],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","controls"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"exitLeagueClient"],null],null],["static-attr","class",""],["flush-element"],["text","\\n      "],["append",["unknown",["tra","button_exit_for_now"]],false],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"hideHApp"],null],null],["static-attr","class",""],["flush-element"],["text","\\n      "],["append",["unknown",["tra","button_play_anyway"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "OJcygnZn",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\index.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","eligibility-question"],["flush-element"],["text","\\n  "],["open-element","h1",[]],["flush-element"],["text","\\n    "],["append",["unknown",["header-dash-left"]],false],["text","\\n    "],["open-element","span",[]],["flush-element"],["text","\\n      "],["append",["unknown",["tra","eligibility_question_1_title"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["append",["unknown",["header-dash-right"]],false],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","yes-no-buttons"],["flush-element"],["text","\\n"],["block",["link-to-button"],["welcome"],null,1],["text","\\n"],["block",["link-to-button"],["welcome-to-league"],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["unknown",["tra","eligibilty_question_1_no"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["tra","eligibility_question_1_yes"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "2Bv9jWvm",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\link-complete.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\styles\\\\link-complete.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","link-complete"],["flush-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","success"],["flush-element"],["text","\\n    "],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/happ_success_checkmark.png"],["flush-element"],["close-element"],["text","\\n\\n    "],["open-element","h1",[]],["flush-element"],["text","\\n      "],["append",["unknown",["header-dash-left"]],false],["text","\\n\\n      "],["open-element","span",[]],["flush-element"],["text","\\n        "],["append",["unknown",["tra","account_claim_success_title"]],false],["text","\\n      "],["close-element"],["text","\\n\\n      "],["append",["unknown",["header-dash-right"]],false],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","h2",[]],["flush-element"],["text","\\n      "],["append",["helper",["sanitize"],[["get",["successBodyString"]]],null],false],["text","\\n    "],["close-element"],["text","\\n\\n    "],["append",["helper",["account-link-summary"],null,[["linked","email","garenaId","summonerName","platformId","summonerIconId"],[true,["get",["happState","email"]],["get",["account","garena_id"]],["get",["account","summoner_name"]],["get",["account","platform_id"]],["get",["account","summoner_icon_id"]]]]],false],["text","\\n\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","ls-footer"],["flush-element"],["text","\\n"],["block",["link-to-button"],["review-account-changes"],null,0],["text","  "],["close-element"],["text","\\n\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["unknown",["tra","button_next"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "18NDPhvh",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\link-on-web.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\styles\\\\link-on-web.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","link-on-web"],["flush-element"],["text","\\n  "],["open-element","h1",[]],["flush-element"],["text","\\n    "],["append",["unknown",["header-dash-left"]],false],["text","\\n    "],["open-element","span",[]],["flush-element"],["text","\\n      "],["append",["unknown",["uikit-spinner"]],false],["text","\\n      "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n      "],["append",["unknown",["tra","link_on_web_title"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["append",["unknown",["header-dash-right"]],false],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","h2",[]],["flush-element"],["text","\\n    "],["append",["unknown",["pageBody"]],false],["text","\\n    "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n    "],["append",["unknown",["button-browser-redirect"]],false],["text","\\n  "],["close-element"],["text","\\n\\n  "],["append",["helper",["account-link-summary"],null,[["linked","email","garenaId","summonerName","platformId","summonerIconId"],[["get",["isLinked"]],["get",["model","email"]],["get",["garenaId"]],["get",["model","account_details","summoner_name"]],["get",["model","account_details","platform_id"]],["get",["model","account_details","summoner_icon_id"]]]]],false],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","lw-footer"],["flush-element"],["text","\\n    "],["append",["unknown",["modal-come-back-later"]],false],["text","\\n\\n    "],["open-element","a",[]],["dynamic-attr","href",["unknown",["migrationGuideUrl"]],null],["static-attr","target","_blank"],["static-attr","class","ext-link"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","link_learn_why_we_are_doing_this"]],false],["open-element","img",[]],["static-attr","class","ext-link-icon"],["static-attr","src","/fe/lol-static-assets/images/happ-external-link.png"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "kymbFUYa",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\loading.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","h1",[]],["static-attr","class",""],["flush-element"],["text","\\n  Loading...\\n  "],["append",["unknown",["uikit-spinner"]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "wNXcV0nZ",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\migration-complete.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["block",["migrate-status"],null,[["type","icon","title"],["success","/fe/lol-static-assets/images/icon-checkmark.png",["get",["tra","data_migration_complete_title"]]]],0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["flush-element"],["text","\\n    "],["append",["helper",["sanitize"],[["get",["tra","data_migration_complete_body"]]],null],false],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"exitLeagueClient"],null],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","button_exit"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "qR8+vBMk",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\migration-in-progress.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["block",["migrate-status"],null,[["type","title"],["in-progress",["get",["tra","data_migration_in_progress_title"]]]],3],["text","\\n"],["block",["ember-modal"],null,[["modalClass","isOpen","okAction"],["modal-name-in-use",["get",["isSummonerNameInUse"]],["helper",["action"],[["get",[null]],"modalOkayPressed"],null]]],2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["unknown",["tra","button_got_it"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["append",["unknown",["tra","tooltip_summoner_name_in_use_title"]],false],["close-element"],["text","\\n\\n    "],["open-element","hr",[]],["static-attr","class","line"],["flush-element"],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","text"],["flush-element"],["append",["helper",["sanitize"],[["get",["tra","tooltip_summoner_name_in_use_body"]]],null],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["m","content"],null,null,1],["text","\\n"],["block",["m","okButton"],null,null,0]],"locals":["m"]},{"statements":[["text","  "],["append",["unknown",["migrationText"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "uyOF4nfB",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\review-account-changes.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\styles\\\\review-account-changes.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","link-review-account-changes"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","link_review_account_changes"]],false],["text","\\n\\n"],["block",["dashed-header"],null,null,6],["text","  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","changes"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","changes-column"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","header"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","link_imported"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","description"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","garena_review_account_changes_imported_body"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","things-changing"],["flush-element"],["text","\\n"],["block",["each"],[["get",["importedItems"]]],null,5],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","changes-column"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","header"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","link_merged"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","description"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","garena_review_account_changes_merged_body"]],false],["text","\\n      "],["close-element"],["text","\\n"],["block",["if"],[["get",["mergedItems"]]],null,4,2],["text","    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","changes-column"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","header"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","link_changes"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","description"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","garena_review_account_changes_changes_body"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","things-changing"],["flush-element"],["text","\\n"],["block",["each"],[["get",["changedItems"]]],null,1],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text"," "],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","rac-footer"],["flush-element"],["text","\\n"],["block",["link-to-button"],["migration-in-progress"],null,0],["text","  "],["close-element"],["text","\\n\\n"],["close-element"],["text"," "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["unknown",["tra","button_next"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["helper",["review-account-change-box"],null,[["type","warning","column"],[["get",["changed","type"]],["get",["changed","warning"]],"CHANGED"]]],false],["text","\\n"]],"locals":["changed"]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","empty"],["flush-element"],["text","\\n          "],["append",["unknown",["tra","label_no_data_to_merge"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["append",["helper",["review-account-change-box"],null,[["type","warning","column"],[["get",["merged","type"]],["get",["merged","warning"]],"MERGED"]]],false],["text","\\n"]],"locals":["merged"]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","things-changing"],["flush-element"],["text","\\n"],["block",["each"],[["get",["mergedItems"]]],null,3],["text","        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["helper",["review-account-change-box"],null,[["type","warning","column"],[["get",["imported","type"]],["get",["imported","warning"]],"IMPORTED"]]],false],["text","\\n"]],"locals":["imported"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","summoner-icon"],["flush-element"],["text","\\n        "],["open-element","img",[]],["dynamic-attr","src",["unknown",["happState","summonerIconUrl"]],null],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n\\n      "],["append",["helper",["sanitize"],[["helper",["summoner-name"],[["get",["account","summoner_name"]],["get",["account","platform_id"]]],null]],null],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "wd67Msjx",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\welcome-to-league.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","welcome-to-league"],["flush-element"],["text","\\n  "],["open-element","h1",[]],["flush-element"],["text","\\n    "],["append",["unknown",["header-dash-left"]],false],["text","\\n    "],["open-element","span",[]],["flush-element"],["text","\\n      "],["append",["helper",["sanitize"],[["get",["tra","fresh_start_title"]]],null],false],["text","\\n    "],["close-element"],["text","\\n    "],["append",["unknown",["header-dash-right"]],false],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","h2",[]],["flush-element"],["text","\\n    "],["append",["unknown",["tra","fresh_start_body"]],false],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","yes-no-buttons"],["flush-element"],["text","\\n"],["text","    "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"closeHApp"],null],null],["flush-element"],["text","\\n        "],["append",["unknown",["tra","button_lets_do_it"]],false],["text","\\n    "],["close-element"],["text","\\n\\n"],["block",["link-to-button"],["index"],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["unknown",["tra","button_go_back"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "7Rn+9YBo",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\welcome.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","welcome-screen"],["flush-element"],["text","\\n  "],["open-element","h1",[]],["flush-element"],["text","\\n    "],["append",["unknown",["header-dash-left"]],false],["text","\\n    "],["open-element","span",[]],["flush-element"],["text","\\n      "],["append",["helper",["sanitize"],[["get",["tra","welcome_back_title"]]],null],false],["text","\\n    "],["close-element"],["text","\\n    "],["append",["unknown",["header-dash-right"]],false],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","h2",[]],["flush-element"],["text","\\n    "],["append",["unknown",["tra","welcome_back_body"]],false],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","yes-no-buttons"],["flush-element"],["text","\\n"],["block",["link-to-button"],["link-on-web"],null,1],["text","\\n"],["block",["link-to-button"],["index"],[["class"],[""]],0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["unknown",["tra","button_go_back"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["tra","button_lets_do_it"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "V7L5LfP0",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\account-changes\\\\index.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "vLg5gVWn",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\account-link-summary.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\components\\\\account-link-summary.js\\" "],["text","\\n\\n"],["block",["if"],[["get",["linked"]]],null,3,2],["text","\\n"],["open-element","div",[]],["static-attr","class","summoner"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","summoner-icon"],["flush-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","src",["unknown",["summonerIconUrl"]],null],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","summoner-name"],["flush-element"],["text","\\n"],["block",["if"],[["get",["summonerName"]]],null,1,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","identity"],["flush-element"],["text","\\n  RIOT:\\n  "],["open-element","span",[]],["flush-element"],["text","\\n    "],["append",["unknown",["email"]],false],["text"," ("],["append",["unknown",["region"]],false],["text",")\\n"],["close-element"],["text","\\n  "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n  GARENA:\\n  "],["open-element","span",[]],["flush-element"],["text","\\n    "],["append",["unknown",["garenaId"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["unknown",["tra","summoner_name_not_specified"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["sanitize"],[["helper",["summonerName"],[["get",["summonerName"]],["get",["region"]]],null]],null],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","not-linked"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","link_not_linked"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","linked"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","link_linked"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "yEHAlFYd",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\auth-failure-option.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\components\\\\auth-failure-option.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class",""],["flush-element"],["text","\\n  "],["open-element","span",[]],["static-attr","class","title"],["flush-element"],["text","\\n    "],["yield","default",[["helper",["hash"],null,[["title"],[["helper",["component"],["blank-template"],null]]]]]],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","p",[]],["static-attr","class","description"],["flush-element"],["text","\\n    "],["yield","default",[["helper",["hash"],null,[["description"],[["helper",["component"],["blank-template"],null]]]]]],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","meta"],["flush-element"],["text","\\n  "],["yield","default",[["helper",["hash"],null,[["meta"],[["helper",["component"],["blank-template"],null]]]]]],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "18vtnLlZ",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\auth-failure-options.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\components\\\\auth-failure-options.js\\" "],["text","\\n"],["block",["auth-failure-option"],null,[["isSelected","isDisabled","selectThis"],[["get",["isTryAgainSelected"]],["get",["tryAgainDisabled"]],["helper",["action"],[["get",[null]],"optionClicked",["get",["ACTIONS_NAMES","TRY_AGAIN"]]],null]]],11],["text","\\n"],["block",["auth-failure-option"],null,[["isSelected","isDisabled","selectThis"],[["get",["isComeBackSelected"]],["get",["comeBackLaterDisabled"]],["helper",["action"],[["get",[null]],"optionClicked",["get",["ACTIONS_NAMES","COME_BACK_LATER"]]],null]]],7],["text","\\n"],["block",["auth-failure-option"],null,[["isSelected","isDisabled","selectThis"],[["get",["isStartOverSelected"]],["get",["startOverDisabled"]],["helper",["action"],[["get",[null]],"optionClicked",["get",["ACTIONS_NAMES","START_OVER"]]],null]]],3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[],"locals":[]},{"statements":[["text","    "],["append",["unknown",["tra","kba_failed_start_over_body"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["tra","kba_failed_start_over_title"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["o","title"],null,null,2],["text","\\n"],["block",["o","description"],null,null,1],["text","\\n"],["block",["o","meta"],null,null,0]],"locals":["o"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","meta-blue"],["flush-element"],["append",["unknown",["tra","kba_failed_verification_methods_may_change"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","meta-green"],["flush-element"],["append",["unknown",["tra","kba_failed_methods_available"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["sanitize"],[["get",["tra","kba_failed_come_back_later_body"]]],null],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["tra","kba_failed_come_back_later_title"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["o","title"],null,null,6],["text","\\n"],["block",["o","description"],null,null,5],["text","\\n"],["block",["o","meta"],null,null,4]],"locals":["o"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","meta-blue"],["flush-element"],["append",["unknown",["tra","whats_next_kba_attempts_remaining"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["tra","kba_failed_try_again_body"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["tra","button_try_again_now"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["o","title"],null,null,10],["text","\\n"],["block",["o","description"],null,null,9],["text","\\n"],["block",["o","meta"],null,null,8]],"locals":["o"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "zqYWva5g",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\blank-template.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["yield","default"],["text","\\n"]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "KQlPeKmo",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\button-browser-redirect.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\components\\\\button-browser-redirect.js\\" "],["text","\\n"],["append",["unknown",["tra","link_launch_browser"]],false],["open-element","img",[]],["static-attr","class","ext-link-icon"],["static-attr","src","/fe/lol-static-assets/images/happ-external-link.png"],["flush-element"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "ekYVACK7",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\dashed-header.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\components\\\\dashed-header.js\\" "],["text","\\n"],["append",["unknown",["header-dash-left"]],false],["text","\\n  "],["open-element","span",[]],["static-attr","class","title"],["flush-element"],["text","\\n    "],["yield","default"],["text","\\n  "],["close-element"],["text","\\n"],["append",["unknown",["header-dash-right"]],false]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "qjTstA5a",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\ember-flat-button.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\components\\\\ember-flat-button.js\\" "],["text","\\n"],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"buttonClick"],null],null],["dynamic-attr","disabled",["unknown",["disabled"]],null],["dynamic-attr","title",["unknown",["title"]],null],["flush-element"],["text","\\n  "],["yield","default"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "Q+h8f7eA",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\ember-modal.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\components\\\\ember-modal.js\\" "],["text","\\n"],["yield","default",[["helper",["hash"],null,[["display","open"],[["helper",["component"],["blank-template"],null],["helper",["action"],[["get",[null]],"open"],null]]]]]],["text","\\n\\n"],["block",["if"],[["get",["shouldOpen"]]],null,1],["text","\\n"],["block",["if"],[["get",["shouldClose"]]],null,0],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["hidden ",["unknown",["modalRootClassName"]]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","backdrop"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","content-root"],["flush-element"],["text","\\n\\n      "],["open-element","div",[]],["static-attr","class","content"],["flush-element"],["text","\\n        "],["yield","default",[["helper",["hash"],null,[["content","close"],[["helper",["component"],["blank-template"],null],["helper",["action"],[["get",[null]],"close"],null]]]]]],["text","\\n      "],["close-element"],["text","\\n\\n      "],["open-element","div",[]],["static-attr","class","controls"],["flush-element"],["text","\\n        "],["yield","default",[["helper",["hash"],null,[["closeButton","okButton"],[["helper",["component"],["ember-flat-button"],[["clickAction"],[["helper",["action"],[["get",[null]],"close"],null]]]],["helper",["component"],["ember-flat-button"],[["clickAction"],[["helper",["action"],[["get",[null]],"ok"],null]]]]]]]]],["text","\\n      "],["close-element"],["text","\\n\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":["default"],"blocks":[{"statements":[["text","  "],["append",["helper",["invoke-action"],[["helper",["action"],[["get",[null]],"close"],null]],null],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["append",["helper",["invoke-action"],[["helper",["action"],[["get",[null]],"open"],null]],null],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "RHBkNYGm",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\header-dash-left.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\components\\\\header-dash-left.js\\" "],["text","\\n"],["open-element","svg",[]],["static-attr","class","left"],["static-attr","width","172"],["static-attr","height","8"],["static-attr","viewBox","0 0 172 8"],["static-attr","fill","none"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["flush-element"],["text","\\n  "],["open-element","path",[]],["static-attr","d","M40.6924 1H170.4V7H-8.96454e-05"],["static-attr","stroke","url(#paint0_linear_796_15775)"],["flush-element"],["close-element"],["text","\\n  "],["open-element","defs",[]],["flush-element"],["text","\\n    "],["open-element","linearGradient",[]],["static-attr","id","paint0_linear_796_15775"],["static-attr","x1","130.979"],["static-attr","y1","11.2"],["static-attr","x2","127.627"],["static-attr","y2","-3.00917"],["static-attr","gradientUnits","userSpaceOnUse"],["flush-element"],["text","\\n      "],["open-element","stop",[]],["static-attr","stop-color","#CDBE91"],["flush-element"],["close-element"],["text","\\n      "],["open-element","stop",[]],["static-attr","offset","1"],["static-attr","stop-color","#CDBE91"],["static-attr","stop-opacity","0"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "CWbiyW/E",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\header-dash-right.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\components\\\\header-dash-right.js\\" "],["text","\\n"],["open-element","svg",[]],["static-attr","class","right"],["static-attr","width","172"],["static-attr","height","8"],["static-attr","viewBox","0 0 172 8"],["static-attr","fill","none"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["flush-element"],["text","\\n  "],["open-element","path",[]],["static-attr","d","M130.704 1H0.996094V7H171.396"],["static-attr","stroke","url(#paint0_linear_796_15773)"],["flush-element"],["close-element"],["text","\\n  "],["open-element","defs",[]],["flush-element"],["text","\\n    "],["open-element","linearGradient",[]],["static-attr","id","paint0_linear_796_15773"],["static-attr","x1","40.417"],["static-attr","y1","11.2"],["static-attr","x2","43.7692"],["static-attr","y2","-3.00917"],["static-attr","gradientUnits","userSpaceOnUse"],["flush-element"],["text","\\n      "],["open-element","stop",[]],["static-attr","stop-color","#CDBE91"],["flush-element"],["close-element"],["text","\\n      "],["open-element","stop",[]],["static-attr","offset","1"],["static-attr","stop-color","#CDBE91"],["static-attr","stop-opacity","0"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "/s2MuWNE",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\kba-q-option.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\components\\\\kba-q-option.js\\" "],["text","\\n"],["append",["unknown",["option"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "oGXLvNMs",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\kba-question.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\components\\\\kba-question.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","kba-question"],["flush-element"],["text","\\n  "],["append",["unknown",["question","question"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["isSummonerNameQuestion"]]],null,2,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["kba-q-option"],null,[["option","selectedAnswer","selectAnswer"],[["get",["option"]],["get",["selectedAnswer"]],["get",["selectAnswer"]]]]],false],["text","\\n"]],"locals":["option"]},{"statements":[["text","\\n"],["block",["each"],[["get",["question","answers"]]],null,0],["text","\\n"]],"locals":[]},{"statements":[["text","\\n  "],["append",["helper",["input"],null,[["placeholder","value","key-press"],[["get",["tra","label_summoner_name"]],["get",["answerSummonerName"]],["get",["selectAnswer"]]]]],false],["text","\\n\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "t4w0hown",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\link-to-button.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\components\\\\link-to-button.js\\" "],["text","\\n"],["block",["if"],[["get",["model"]]],null,3,1]],"locals":[],"named":[],"yields":["default"],"blocks":[{"statements":[["open-element","lol-uikit-flat-button",[]],["dynamic-attr","class",["concat",[["unknown",["class"]]]]],["dynamic-attr","disabled",["unknown",["disabled"]],null],["dynamic-attr","primary",["unknown",["primary"]],null],["flush-element"],["text","\\n      "],["yield","default"],["text","\\n    "],["close-element"]],"locals":[]},{"statements":[["text","\\n"],["block",["link-to"],[["get",["route"]]],[["disabledWhen"],[["get",["disabled"]]]],0],["text","\\n"]],"locals":[]},{"statements":[["open-element","lol-uikit-flat-button",[]],["dynamic-attr","class",["concat",[["unknown",["class"]]]]],["dynamic-attr","disabled",["unknown",["disabled"]],null],["dynamic-attr","primary",["unknown",["primary"]],null],["flush-element"],["text","\\n      "],["yield","default"],["text","\\n    "],["close-element"]],"locals":[]},{"statements":[["text","\\n"],["block",["link-to"],[["get",["route"]],["get",["model"]]],[["disabledWhen"],[["get",["disabled"]]]],2],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "h1zURRsa",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\migrate-status.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\components\\\\migrate-status.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","visual-icon"],["flush-element"],["text","\\n"],["block",["if"],[["get",["icon"]]],null,2,1],["close-element"],["text","\\n\\n"],["block",["dashed-header"],null,[["class"],["h1"]],0],["text","\\n"],["open-element","div",[]],["static-attr","class","summoner-icon"],["flush-element"],["text","\\n  "],["open-element","img",[]],["dynamic-attr","src",["unknown",["happState","summonerIconUrl"]],null],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","summoner-name"],["flush-element"],["text","\\n  "],["append",["helper",["sanitize"],[["helper",["summoner-name"],[["get",["happState","garenaRegionLeagueAccount","summoner_name"]],["get",["happState","garenaRegionLeagueAccount","platform_id"]]],null]],null],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","body"],["flush-element"],["text","\\n  "],["yield","default"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":["default"],"blocks":[{"statements":[["text","  "],["append",["unknown",["title"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["uikit-spinner"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","img",[]],["dynamic-attr","src",["unknown",["icon"]],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "J1UNzx9V",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\modal-another-auth-method.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\components\\\\modal-another-auth-method.js\\" "],["text","\\n"],["block",["ember-modal"],null,[["modalClass"],["modal-another-auth-method"]],4]],"locals":[],"named":[],"yields":["default"],"blocks":[{"statements":[["text","    TRY SOMETHING ELSE\\n"]],"locals":[]},{"statements":[["text","    STAY HERE\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","p",[]],["static-attr","class","title"],["flush-element"],["text","\\n      TRY ANOTHER AUTHENTICATION METHOD?\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","line"],["flush-element"],["close-element"],["text","\\n\\n    "],["open-element","p",[]],["static-attr","class","text"],["flush-element"],["text","\\n      If you aren\'t comfortable with this one or something isn\'t working, we can try something else for you.\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","span",[]],["static-attr","class","display"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],["get",["m","open"]]],null],null],["flush-element"],["text","\\n      "],["yield","default",[["helper",["hash"],null,[["display"],[["helper",["component"],["blank-template"],null]]]]]],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","\\n"],["block",["m","display"],null,null,3],["text","\\n"],["block",["m","content"],null,null,2],["text","\\n"],["block",["m","closeButton"],null,null,1],["text","\\n"],["block",["m","okButton"],null,[["routeName"],["link.try-something-else"]],0],["text","\\n"]],"locals":["m"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "tjpcfiuV",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\modal-come-back-later.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\components\\\\modal-come-back-later.js\\" "],["text","\\n"],["block",["ember-modal"],null,[["modalClass"],["modal-come-back-later"]],4]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["unknown",["tra","button_exit_link_later"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["tra","button_link_now"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["append",["unknown",["tra","garena_come_back_to_this_later_title"]],false],["close-element"],["text","\\n\\n    "],["open-element","hr",[]],["static-attr","class","line"],["flush-element"],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","text"],["flush-element"],["append",["helper",["sanitize"],[["get",["tra","garena_come_back_to_this_later_body_1"]]],null],false],["close-element"],["text","\\n\\n    "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","text"],["flush-element"],["text","\\n      "],["append",["helper",["sanitize"],[["get",["tra","garena_come_back_to_this_later_body_2"]]],null],false],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n\\n      "],["open-element","a",[]],["dynamic-attr","href",["unknown",["redirectUrl"]],null],["static-attr","target","_blank"],["static-attr","class","ext-link"],["flush-element"],["text","\\n        "],["append",["unknown",["redirectUrlText"]],false],["open-element","img",[]],["static-attr","class","ext-link-icon"],["static-attr","src","/fe/lol-static-assets/images/happ-external-link.png"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","span",[]],["static-attr","class","link-looks"],["dynamic-attr","title",["concat",[["unknown",["tra","kba_failed_close_tool"]]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],["get",["m","open"]]],null],null],["flush-element"],["text","\\n      "],["append",["unknown",["tra","link_later"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","\\n"],["block",["m","display"],null,null,3],["text","\\n"],["block",["m","content"],null,null,2],["text","\\n"],["block",["m","okButton"],null,null,1],["text","\\n"],["block",["m","closeButton"],null,[["clickAction"],[["helper",["action"],[["get",[null]],"exitLeagueClient"],null]]],0],["text","\\n"]],"locals":["m"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "uKDk93SI",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\next-back-buttons.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\components\\\\next-back-buttons.js\\" "],["text","\\n"],["block",["link-to-button"],[["get",["backRoute"]],["get",["backModel"]]],[["class","disabled"],["back",["get",["backDisabled"]]]],1],["block",["link-to-button"],[["get",["nextRoute"]],["get",["nextModel"]]],[["disabled","class","primary"],[["get",["nextDisabled"]],"next",true]],0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["unknown",["tra","button_next"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  <\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "k/YPzLnb",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\review-account-change-box.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\components\\\\review-account-change-box.js\\" "],["text","\\n  "],["open-element","div",[]],["static-attr","class","inner-box"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","icon"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","icon"],["dynamic-attr","src",["unknown",["icon"]],null],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","box-title"],["flush-element"],["append",["unknown",["boxTitle"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","class"],["right","box-tooltip"]],4],["text","\\n"],["block",["if"],[["get",["hasWarning"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","warning-message"],["flush-element"],["text","\\n    "],["append",["unknown",["warningMessage"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","list-entry"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","list-icon"],["flush-element"],["open-element","img",[]],["static-attr","class","icon"],["dynamic-attr","src",["unknown",["item","icon"]],null],["flush-element"],["close-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","list-text"],["flush-element"],["append",["unknown",["item","text"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":["item"]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","data-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["tooltipList"]]],null,1],["text","          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","warning-message"],["flush-element"],["append",["unknown",["tooltipWarningMessage"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","class","happ-review-account-changes-box-tooltip-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["append",["unknown",["boxTitle"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["flush-element"],["open-element","hr",[]],["flush-element"],["close-element"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["hasWarning"]]],null,3],["text","\\n"],["block",["if"],[["get",["tooltipList"]]],null,2],["text","\\n        "],["open-element","div",[]],["static-attr","class","body"],["flush-element"],["text","\\n          "],["append",["helper",["sanitize"],[["get",["tooltipBody"]]],null],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "ublxGZ+y",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\components\\\\whats-next.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\components\\\\whats-next.js\\" "],["text","\\n"],["text","\\n"],["open-element","div",[]],["static-attr","class","main-heading"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","main-title"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","whats_next_title"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","main-description"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","whats_next_body"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n\\n\\n"],["open-element","div",[]],["static-attr","class","whats-next"],["flush-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","whats-next-item-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","number"],["flush-element"],["text","\\n      1\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","item-row-text"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["text","\\n        "],["yield","default",[["helper",["hash"],null,[["s1_title"],[["helper",["component"],["blank-template"],null]]]]]],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","description"],["flush-element"],["text","\\n        "],["yield","default",[["helper",["hash"],null,[["s1_description"],[["helper",["component"],["blank-template"],null]]]]]],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","whats-next-item-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","number"],["flush-element"],["text","\\n      2\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","item-row-text"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["text","\\n        "],["yield","default",[["helper",["hash"],null,[["s2_title"],[["helper",["component"],["blank-template"],null]]]]]],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","description"],["flush-element"],["text","\\n        "],["yield","default",[["helper",["hash"],null,[["s2_description"],[["helper",["component"],["blank-template"],null]]]]]],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","whats-next-item-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","number"],["flush-element"],["text","\\n      3\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","item-row-text"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["text","\\n        "],["yield","default",[["helper",["hash"],null,[["s3_title"],[["helper",["component"],["blank-template"],null]]]]]],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","description"],["flush-element"],["text","\\n        "],["yield","default",[["helper",["hash"],null,[["s3_description"],[["helper",["component"],["blank-template"],null]]]]]],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "ktXjOYMR",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\app\\\\templates\\\\review-account-changes\\\\error.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n\\n"],["open-element","p",[]],["flush-element"],["text","\\n  "],["append",["unknown",["tra","review_account_changes_error_body"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","p",[]],["flush-element"],["text","\\n  "],["append",["unknown",["tra","review_account_changes_know_more"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["link-to-button"],["migration-in-progress"],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["unknown",["tra","button_next"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "cYDtEWjq",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\lib\\\\dev-cheats-panel\\\\addon\\\\templates\\\\components\\\\dev-cheats.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\lib\\\\dev-cheats-panel\\\\addon\\\\components\\\\dev-cheats.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","button-wrapper"],["flush-element"],["text","\\n  "],["open-element","button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"toggle"],null],null],["flush-element"],["text","\\n    HApp Dev Cheats\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["show"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectTab","dev-tab"],null],null],["flush-element"],["text","\\n    Routes\\n  "],["close-element"],["text","\\n\\n  "],["open-element","button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectTab","swagger-helpers-tab"],null],null],["flush-element"],["text","\\n    Swagger helpers\\n  "],["close-element"],["text","\\n\\n  "],["open-element","hr",[]],["flush-element"],["close-element"],["text","\\n\\n  "],["open-element","button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"closeHApp"],null],null],["flush-element"],["text","\\n    Close HApp\\n  "],["close-element"],["text","\\n\\n  "],["open-element","hr",[]],["flush-element"],["close-element"],["text","\\n\\n  "],["append",["helper",["component"],[["get",["selectedTab"]]],null],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "dL+pIQzE",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\lib\\\\dev-cheats-panel\\\\addon\\\\templates\\\\components\\\\dev-tab.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\lib\\\\dev-cheats-panel\\\\addon\\\\components\\\\dev-tab.js\\" "],["text","\\n"],["open-element","small",[]],["flush-element"],["text","\\n  Routes:\\n"],["close-element"],["text","\\n\\n"],["open-element","ul",[]],["flush-element"],["text","\\n  "],["open-element","li",[]],["flush-element"],["text","\\n    "],["block",["link-to"],["index"],null,10],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","li",[]],["flush-element"],["text","\\n    "],["block",["link-to"],["welcome"],null,9],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","li",[]],["flush-element"],["text","\\n    "],["block",["link-to"],["welcome-to-league"],null,8],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","li",[]],["flush-element"],["text","\\n    "],["block",["link-to"],["link-on-web"],null,7],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","li",[]],["flush-element"],["text","\\n    "],["block",["link-to"],["link-complete"],null,6],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","li",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"setMockHAppState",false,true],null],null],["flush-element"],["text","\\n    "],["block",["link-to"],["link-complete"],null,5],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","li",[]],["flush-element"],["text","\\n    "],["block",["link-to"],["review-account-changes"],null,4],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","li",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"setMockHAppState",false,true],null],null],["flush-element"],["text","\\n    "],["block",["link-to"],["review-account-changes"],null,3],["text","\\n  "],["close-element"],["text","\\n  \\n  "],["open-element","li",[]],["flush-element"],["text","\\n    "],["open-element","ul",[]],["flush-element"],["text","\\n      "],["open-element","li",[]],["flush-element"],["text","\\n        "],["block",["link-to"],["migration-in-progress"],null,2],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","li",[]],["flush-element"],["text","\\n        "],["block",["link-to"],["migration-complete"],null,1],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","li",[]],["flush-element"],["text","\\n        "],["block",["link-to"],["error-migration"],null,0],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","error-migration"]],"locals":[]},{"statements":[["text","migration-complete"]],"locals":[]},{"statements":[["text","migration-in-progress"]],"locals":[]},{"statements":[["text","review-account-changes (mock data)"]],"locals":[]},{"statements":[["text","review-account-changes"]],"locals":[]},{"statements":[["text","link complete (mock data)"]],"locals":[]},{"statements":[["text","link complete"]],"locals":[]},{"statements":[["text","link on web"]],"locals":[]},{"statements":[["text","welcome to league"]],"locals":[]},{"statements":[["text","welcome"]],"locals":[]},{"statements":[["text","index"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "IfLeNUGi",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\lib\\\\dev-cheats-panel\\\\addon\\\\templates\\\\components\\\\swagger-helpers-tab.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\lib\\\\dev-cheats-panel\\\\addon\\\\components\\\\swagger-helpers-tab.js\\" "],["text","\\n"],["open-element","section",[]],["flush-element"],["text","\\n  "],["open-element","button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"getStatus"],null],null],["flush-element"],["text","\\n    get status\\n  "],["close-element"],["text","\\n  "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n  eligible: "],["append",["unknown",["accountStatus","eligible"]],false],["text","\\n  "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n  reason_code: "],["append",["unknown",["accountStatus","reason_code"]],false],["text","\\n  "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n  \\n"],["close-element"],["text","\\n\\n"],["open-element","section",[]],["flush-element"],["text","\\n  S2S\\n  "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n\\n  http://"],["append",["helper",["input"],null,[["value","placeholder","size"],[["get",["s2sHost"]],"service IP address and port",50]]],false],["text","\\n  "],["open-element","a",[]],["static-attr","href","http://10.94.16.10:28080/ui/cluster/globalqa.aws-usw2-dev.stage/riotsignon.rso-honeyfruit-link.html?"],["static-attr","target","_blank"],["flush-element"],["text","account linking service hosts"],["close-element"],["text","\\n\\n  "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n\\n  loltransfer password:\\n  "],["append",["helper",["input"],null,[["value","size","placeholder"],[["get",["loltransferPwd"]],40,"get it from fling.riotgames.com"]]],false],["text","\\n  "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n  authorization header:\\n  "],["open-element","input",[]],["dynamic-attr","value",["unknown",["s2sAuthorization"]],null],["static-attr","size","40"],["static-attr","placeholder","fill in the password field above"],["static-attr","disabled","true"],["flush-element"],["close-element"],["text","\\n\\n  "],["open-element","section",[]],["flush-element"],["text","\\n    Account linking\\n    "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n    "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n      "],["open-element","small",[]],["flush-element"],["text","\\n        Only works with a BE build that turns on LCU_HF_ACCOUNT_CLAIMING_ENABLED. \\n        Account linking has now been removed; link status can still be viewed.\\n      "],["close-element"],["text","\\n    "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n    "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n    accounts string "],["append",["helper",["input"],null,[["value"],[["get",["accountsString"]]]]],false],["text","\\n    "],["open-element","a",[]],["static-attr","href","https://docs.google.com/spreadsheets/d/1e9yyGTXxsUzoNXwfwa-hBteixEjCBkTgn0TSyBpkBu8/edit#gid=0"],["flush-element"],["text","more accounts"],["close-element"],["text","\\n    \\n    "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n\\n    "],["open-element","a",[]],["static-attr","href","https://gh.riotgames.com/lolservices/migration-extravaganza-service/blob/master/loadtest/generate-account/README.md"],["flush-element"],["text","\\n      how to create accounts\\n    "],["close-element"],["text","\\n    "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n    puuid_dst "],["append",["unknown",["puuid_dst"]],false],["text","\\n    "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n    puuid_src "],["append",["unknown",["puuid_src"]],false],["text","\\n    "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n    region_src "],["append",["unknown",["region_src"]],false],["text","\\n    "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n    account_id_src "],["append",["unknown",["account_id_src"]],false],["text","\\n    "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n    link_type "],["append",["unknown",["link_type"]],false],["text","\\n    "],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["isS2SDisabled"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","section",[]],["flush-element"],["text","\\n  logged in puuid: "],["append",["helper",["input"],null,[["class","value","size"],["id-input",["get",["loggedInPuuid"]],33]]],false],["text","\\n\\n  "],["open-element","table",[]],["flush-element"],["text","\\n    "],["open-element","tr",[]],["flush-element"],["text","\\n      "],["open-element","td",[]],["flush-element"],["text","\\n        x-riot-auth-payload\\n      "],["close-element"],["text","\\n      "],["open-element","td",[]],["flush-element"],["text","\\n        "],["open-element","input",[]],["dynamic-attr","value",["unknown",["xRiotAuthPayload"]],null],["static-attr","size","40"],["flush-element"],["close-element"],["text","\\n        "],["open-element","button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"refreshRsoToken"],null],null],["flush-element"],["text","fetch again"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","tr",[]],["flush-element"],["text","\\n      "],["open-element","td",[]],["flush-element"],["text","\\n        rso token\\n      "],["close-element"],["text","\\n      "],["open-element","td",[]],["flush-element"],["text","\\n        "],["open-element","input",[]],["dynamic-attr","value",["unknown",["rsoToken"]],null],["static-attr","size","40"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","tr",[]],["flush-element"],["text","\\n      "],["open-element","td",[]],["flush-element"],["text","\\n        rso user info token\\n      "],["close-element"],["text","\\n      "],["open-element","td",[]],["flush-element"],["text","\\n        "],["open-element","input",[]],["dynamic-attr","value",["unknown",["rsoUserInfoToken"]],null],["static-attr","size","40"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["close-element"],["text","\\n\\n"],["open-element","section",[]],["flush-element"],["text","\\n  "],["open-element","a",[]],["static-attr","target","_blank"],["static-attr","href","http://10.94.16.10:28080/ui/cluster/lolqa.aws-usw2-dev.ci2/migration-extravaganza.service.html"],["flush-element"],["text","Migration service discoverous"],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","small",[]],["flush-element"],["text","\\n        you need an authorization header, see S2S in the section above\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
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
            var l = n(1),
                a = n(94);
            t.default = class {
                _privateApi = null;
                _destructor = null;
                _linkingStatus = null;
                constructor(e, t) {
                    this._screenRoot = e, this._privateApi = t, this._rootElement = e.getElement()
                }
                show() {
                    this._privateApi.createEmberApp(), this._screenRoot.bump(), l.navigation.hide(), l.navigation.hidePlayButton(), l.navigation.hideHome()
                }
                hide() {
                    this._screenRoot.release(), l.navigation.show(), l.navigation.showPlayButton(), l.navigation.showHome()
                }
                confirmIsNewPlayer() {
                    this._privateApi.confirmIsNewPlayer()
                }
                reset() {
                    this._privateApi.createEmberApp().then((function(e) {
                        e.__container__.lookup("service:happ-state").reset();
                        e.__container__.lookup("route:application").transitionTo("index")
                    }))
                }
                clearMockedLinkingStatus() {
                    return this._privateApi.clearMockedLinkingStatus()
                }
                async mockLinkingStatus({
                    state: e = a.LinkingState.HIDDEN,
                    error: t = a.LinkingStatusError.NO_ERROR,
                    linked_account: n = "",
                    url: l = ""
                }) {
                    if (!this.getPossibleStates().includes(e)) throw new Error(`Invalid linking status state: ${e}`);
                    if (!this.getPossibleErrors().includes(t)) throw new Error(`Invalid linking status error: ${t}`);
                    return await this._privateApi.mockLinkingStatus({
                        error: t,
                        linked_account: n,
                        state: e,
                        url: l
                    })
                }
                getPossibleStates() {
                    return Object.values(a.LinkingState)
                }
                getPossibleErrors() {
                    return Object.values(a.LinkingStatusError)
                }
                observeLinkingStatus(e) {
                    return this._privateApi.observeLinkingStatus(e)
                }
                getLinkingStatus() {
                    return this._privateApi.linkingStatus
                }
                getGlobalComponent() {
                    return "vng-age-rating"
                }
                registerGlobalComponent(e) {
                    e.HoneyfruitService = this._privateApi.emberHoneyfruitService(), e.VngAgeRatingComponent = n(95).default, e.TEMPLATES["components/vng-age-rating"] = n(97)
                }
                getSettingsComponent() {
                    return "honeyfruit-settings"
                }
                registerComponents(e) {
                    return e.addComponent("HoneyfruitSettings", n(98).default).addComponent("HoneyfruitSettingsError", n(99).default).addComponent("LinkingSettings", n(101).default).addComponent("VngPublisherSettings", n(103).default).addService("Honeyfruit", this._privateApi.emberHoneyfruitService()).addService("HoneyfruitLogger", this._privateApi.emberLoggerService()).addTemplate("components/honeyfruit-settings", n(105)).addTemplate("components/honeyfruit-settings-error", n(106)).addTemplate("components/linking-settings", n(107)).addTemplate("components/vng-publisher-settings", n(108)).addTranslations("/fe/lol-honeyfruit-account-claiming/trans-addon.json")
                }
            }
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.pluginName = t.linkingVisibleStates = t.defaultVNGPublisherSettings = t.defaultLinkingStatus = t.TelemetryEventNames = t.LinkingStatusError = t.LinkingState = t.LinkingModalState = t.ActionType = void 0;
            t.pluginName = "rcp-fe-lol-honeyfruit-account-claiming";
            const n = {
                HIDDEN: "hidden",
                SNOOZED: "snoozed",
                PROMPT: "prompt",
                CONFIRM_SNOOZE: "confirm_snooze",
                ERROR: "error",
                IN_PROGRESS: "in_progress",
                LINKING_COMPLETE: "linking_complete",
                LINKED: "linked"
            };
            t.LinkingState = n;
            t.ActionType = {
                DISMISS: "dismiss",
                DISMISS_TEMPORARILY: "dismiss_temporarily",
                DiSMISS_PERMANENTLY: "dismiss_permanently",
                LINK: "link",
                LINK_OPENED: "link_opened"
            };
            const l = {
                NO_ERROR: "no_error",
                NO_SIGNED_IN: "not_signed_in",
                SERVICE_UNAVAILBLED: "service_unavailable",
                UNKNOWN_ERROR: "unknown_error"
            };
            t.LinkingStatusError = l;
            const a = {
                error: l.NO_ERROR,
                linked_account: "",
                state: n.HIDDEN
            };
            t.defaultLinkingStatus = a;
            t.LinkingModalState = {
                ERROR: "honeyfruit-linking-error",
                PROMPT: "honeyfruit-linking-prompt",
                IN_PROGRESS: "honeyfruit-linking-in-progress",
                COMPLETE: "honeyfruit-linking-complete",
                CONFIRM: "honeyfruit-linking-confirm"
            };
            const s = new Set([n.PROMPT, n.CONFIRM_SNOOZE, n.ERROR, n.IN_PROGRESS, n.LINKING_COMPLETE]);
            t.linkingVisibleStates = s;
            t.TelemetryEventNames = {
                directLinkingPromptModalDisplayed: "direct-linking-prompt-modal-displayed",
                directLinkingConfirmSnoozeModalDisplayed: "direct-linking-confirm-snooze-modal-displayed",
                directLinkingInProgressModalDisplayed: "direct-linking-in-progress-modal-displayed",
                directLinkingConfirmSnoozeModalLinkLaterClicked: "direct-linking-confirm-snooze-modal-link-later-clicked",
                directLinkingConfirmSnoozeModalDoNotShowMeAgainChecked: "direct-linking-confirm-snooze-modal-do-not-show-me-again-checked",
                directLinkingInProgressModalContinueWithoutLinkingClicked: "direct-linking-in-progress-modal-continue-without-linking-clicked",
                directLinkingPromptModalLinkLaterClicked: "direct-linking-prompt-modal-link-later-clicked",
                directLinkingConfirmSnoozeModalLinkNowClicked: "direct-linking-confirm-snooze-modal-link-now-clicked",
                directLinkingPromptModalLinkNowClicked: "direct-linking-prompt-modal-link-now-clicked"
            };
            t.defaultVNGPublisherSettings = {
                isVisible: !1
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1);
            n(96);
            var a = l.Ember.Component.extend({
                classNames: ["vng-age-rating"],
                honeyfruit: l.Ember.inject.service("honeyfruit"),
                init() {
                    this._super(...arguments), this.initializeProperties()
                },
                initializeProperties() {
                    this.setProperties({
                        overlayScreenRoot: l.Viewport.overlay().getScreenRoot("lol-vng-rating-overlay"),
                        fullScreenViewport: l.Viewport.fullScreen(),
                        updateOverlayBound: this.updateOverlay.bind(this)
                    })
                },
                isVisible: l.Ember.computed("honeyfruit.vngPublisherSettings.visible", (function() {
                    const e = this.get("honeyfruit.vngPublisherSettings.visible");
                    return this.updateFullScreenViewportListeners(e), e
                })),
                updateFullScreenViewportListeners(e) {
                    const t = this.get("fullScreenViewport");
                    t.off("remove", this.updateOverlayBound), t.off("push", this.updateOverlayBound), e && (t.on("remove", this.updateOverlayBound), t.on("push", this.updateOverlayBound))
                },
                didRender() {
                    this._super(...arguments);
                    const e = this.get("isVisible");
                    this.get("wasVisible") !== e && (this.set("wasVisible", e), this.prepareOverlayElement(), this.updateOverlayBound())
                },
                prepareOverlayElement() {
                    this.get("overlayScreenRoot").getElement().replaceChildren(this.element.cloneNode(!0))
                },
                updateOverlay() {
                    const e = this.get("fullScreenViewport");
                    this.get("isVisible") && !e.isEmpty() ? this.get("overlayScreenRoot").bump() : this.get("overlayScreenRoot").release()
                },
                willDestroyElement: function() {
                    this._super(...arguments), this.updateFullScreenViewportListeners(!1)
                }
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "3wv2MF0c",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\lib\\\\addon\\\\templates\\\\vng-age-rating.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\lib\\\\addon\\\\styles\\\\vng-age-rating.styl\\" js-path=\\"null\\" "],["text","\\n"],["block",["if"],[["get",["isVisible"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["open-element","svg",[]],["static-attr","viewBox","0 0 253 45"],["static-attr","class","vng-age-rating-container"],["flush-element"],["text","\\n  "],["open-element","path",[]],["static-attr","class","vng-age-rating-1"],["static-attr","d","M67.828,22.089H318.67V68.911H67.828V22.089Z"],["static-attr","transform","translate(-67.313 -21.594)"],["flush-element"],["close-element"],["text","\\n  "],["open-element","rect",[]],["static-attr","class","vng-age-rating-2"],["static-attr","x","57.688"],["static-attr","y","5.406"],["static-attr","width","1"],["static-attr","height","36"],["flush-element"],["close-element"],["text","\\n  "],["open-element","path",[]],["static-attr","class","vng-age-rating-3"],["static-attr","d","M138.587,39.674a2.147,2.147,0,0,1-.584,1.37,2.007,2.007,0,0,1-1.376.412,1.722,1.722,0,0,1-1.52-.762,3.928,3.928,0,0,1-.519-2.213V37.687a3.7,3.7,0,0,1,.556-2.173,1.814,1.814,0,0,1,1.557-.741,1.858,1.858,0,0,1,1.324.427,2.211,2.211,0,0,1,.562,1.391h1.548a3.353,3.353,0,0,0-1.051-2.27,3.456,3.456,0,0,0-2.383-.8,3.59,3.59,0,0,0-1.938.522,3.38,3.38,0,0,0-1.287,1.486,5.235,5.235,0,0,0-.448,2.23v0.835a5.191,5.191,0,0,0,.461,2.168,3.318,3.318,0,0,0,1.256,1.44,3.485,3.485,0,0,0,1.882.507,3.6,3.6,0,0,0,2.451-.8,3.23,3.23,0,0,0,1.057-2.233h-1.548Zm4.263-6.523h-1.493v9.435h1.493V37.838a1.438,1.438,0,0,1,1.339-.8,1.218,1.218,0,0,1,.875.286,1.311,1.311,0,0,1,.3.974v4.287h1.493V38.243q-0.031-2.426-2.156-2.426a2.335,2.335,0,0,0-1.849.848V33.151Zm5.233,6.124a3.573,3.573,0,0,0,.848,2.506,2.891,2.891,0,0,0,2.242.928,3.1,3.1,0,0,0,1.624-.424,2.783,2.783,0,0,0,1.088-1.2,3.965,3.965,0,0,0,.377-1.757V39.152a3.919,3.919,0,0,0-.4-1.738,1.534,1.534,0,0,0,.9-0.777,3.1,3.1,0,0,0,.27-1.373H154.01a2.652,2.652,0,0,1-.147,1.026,0.8,0.8,0,0,1-.473.442,2.9,2.9,0,0,0-2.23-.915,3.064,3.064,0,0,0-1.609.421,2.813,2.813,0,0,0-1.084,1.2,3.934,3.934,0,0,0-.384,1.766v0.074ZM150,37.6a1.371,1.371,0,0,1,1.161-.581,1.391,1.391,0,0,1,1.177.581,2.64,2.64,0,0,1,.433,1.606,2.961,2.961,0,0,1-.421,1.726,1.364,1.364,0,0,1-1.176.59,1.379,1.379,0,0,1-1.18-.581,2.681,2.681,0,0,1-.424-1.606A2.906,2.906,0,0,1,150,37.6Zm7.212-1.655h-1.493v6.646h1.493V35.94Zm-1.367-1.164a0.829,0.829,0,0,0,.623.224,0.84,0.84,0,0,0,.627-0.224,0.769,0.769,0,0,0,.221-0.562,0.788,0.788,0,0,0-.221-0.571,0.834,0.834,0,0,0-.627-0.227,0.823,0.823,0,0,0-.623.227,0.794,0.794,0,0,0-.218.571A0.775,0.775,0,0,0,155.844,34.776Zm6.563,7a2.293,2.293,0,0,0,1.91.931,2.228,2.228,0,0,0,1.7-.688v3.12h1.492v-9.2h-1.326l-0.086.657a2.178,2.178,0,0,0-1.763-.78,2.315,2.315,0,0,0-1.929.915,3.927,3.927,0,0,0-.713,2.475A4.112,4.112,0,0,0,162.407,41.778Zm1.183-4.192a1.3,1.3,0,0,1,1.121-.571,1.416,1.416,0,0,1,1.3.725v3.022a1.415,1.415,0,0,1-1.315.755,1.284,1.284,0,0,1-1.115-.581,2.775,2.775,0,0,1-.4-1.6A3.02,3.02,0,0,1,163.59,37.586Zm9.585,5h1.406V35.94h-1.492v4.773a1.475,1.475,0,0,1-1.468.78,1.034,1.034,0,0,1-1.051-1.265V35.94h-1.492v4.306a2.69,2.69,0,0,0,.556,1.83,2.062,2.062,0,0,0,1.637.633,2.315,2.315,0,0,0,1.867-.774Zm8.421,0v-0.1a3.4,3.4,0,0,1-.252-1.431v-3a2.093,2.093,0,0,0-.712-1.649,2.792,2.792,0,0,0-1.862-.587,3.467,3.467,0,0,0-1.391.27,2.422,2.422,0,0,0-.986.746,1.66,1.66,0,0,0-.362,1.023h1.493a0.789,0.789,0,0,1,.325-0.648,1.317,1.317,0,0,1,.836-0.255,1.144,1.144,0,0,1,.878.31,1.166,1.166,0,0,1,.289.826v0.436h-0.916a3.826,3.826,0,0,0-2.257.568,1.887,1.887,0,0,0-.789,1.631,1.83,1.83,0,0,0,.632,1.413,2.512,2.512,0,0,0,3.379-.172,2.28,2.28,0,0,0,.172.62H181.6Zm-3.928-1.33a0.874,0.874,0,0,1-.286-0.685,0.934,0.934,0,0,1,.418-0.817,2.2,2.2,0,0,1,1.247-.289h0.805v1.253a1.443,1.443,0,0,1-.587.577,1.7,1.7,0,0,1-.832.215A1.1,1.1,0,0,1,177.668,41.256Zm0.4-6.247,1.2,0,1.7-1.861h-1.7Zm11.923-1.4H189.8L186.307,34.9v1.253L188.5,35.4v7.185h1.487V33.612Zm8,0.577a3.3,3.3,0,0,0-3.986,0A2.325,2.325,0,0,0,193.267,36a2.093,2.093,0,0,0,.334,1.17,2.335,2.335,0,0,0,.912.808,2.449,2.449,0,0,0-1.068.878,2.272,2.272,0,0,0-.381,1.29,2.345,2.345,0,0,0,.8,1.867,3.622,3.622,0,0,0,4.26,0,2.345,2.345,0,0,0,.8-1.87,2.246,2.246,0,0,0-.378-1.278,2.553,2.553,0,0,0-1.078-.891,2.341,2.341,0,0,0,.921-0.808,2.073,2.073,0,0,0,.338-1.17A2.328,2.328,0,0,0,197.99,34.189Zm-0.937,6.947a1.636,1.636,0,0,1-2.113-.012,1.438,1.438,0,0,1-.384-1.05A1.482,1.482,0,0,1,194.947,39a1.377,1.377,0,0,1,1.041-.405,1.392,1.392,0,0,1,1.047.409,1.475,1.475,0,0,1,.4,1.072A1.443,1.443,0,0,1,197.053,41.136Zm-0.147-4.1a1.314,1.314,0,0,1-1.812,0,1.6,1.6,0,0,1,0-1.956,1.3,1.3,0,0,1,1.812.018A1.563,1.563,0,0,1,196.906,37.033Zm9.168,0.24a4.663,4.663,0,0,0-.741-2.813,3.008,3.008,0,0,0-4.391.025,4.8,4.8,0,0,0-.722,2.893v1.548a4.671,4.671,0,0,0,.752,2.829,2.583,2.583,0,0,0,2.184.955,2.549,2.549,0,0,0,2.2-.98,4.878,4.878,0,0,0,.722-2.908V37.273Zm-1.493,1.9a3.64,3.64,0,0,1-.363,1.778,1.154,1.154,0,0,1-1.062.568,1.177,1.177,0,0,1-1.1-.614,3.887,3.887,0,0,1-.35-1.867V37.009a3.5,3.5,0,0,1,.363-1.735,1.314,1.314,0,0,1,2.168.031,3.788,3.788,0,0,1,.344,1.846v2.021Zm11.861,0.068a4.061,4.061,0,0,0-.691-2.515,2.267,2.267,0,0,0-1.907-.906,2.193,2.193,0,0,0-1.788.8L212,35.94h-1.376v9.2h1.492V41.99a2.433,2.433,0,0,0,3.631-.2,3.962,3.962,0,0,0,.7-2.46V39.238Zm-1.889,1.7a1.286,1.286,0,0,1-1.115.574,1.388,1.388,0,0,1-1.327-.774V37.795a1.375,1.375,0,0,1,1.315-.756,1.288,1.288,0,0,1,1.133.584,2.773,2.773,0,0,1,.4,1.579A3.053,3.053,0,0,1,214.553,40.943Zm4.622-7.792h-1.492v9.435h1.492V37.838a1.438,1.438,0,0,1,1.339-.8,1.22,1.22,0,0,1,.876.286,1.315,1.315,0,0,1,.3.974v4.287h1.492V38.243q-0.03-2.426-2.156-2.426a2.338,2.338,0,0,0-1.849.848V33.151Zm9.576,9.435h1.407V35.94h-1.493v4.773a1.475,1.475,0,0,1-1.468.78,1.034,1.034,0,0,1-1.05-1.265V35.94h-1.493v4.306a2.7,2.7,0,0,0,.556,1.83,2.063,2.063,0,0,0,1.637.633,2.314,2.314,0,0,0,1.867-.774Zm-2.088-7.577,1.2,0,1.7-1.861h-1.7Zm5.393-.685V35.94h-1.093v1.106h1.093v3.765a1.6,1.6,0,0,0,1.72,1.9,3.679,3.679,0,0,0,.983-0.141V41.413a2.31,2.31,0,0,1-.523.061,0.7,0.7,0,0,1-.537-0.169,0.819,0.819,0,0,1-.15-0.55v-3.71h1.173V35.94h-1.173V34.324h-1.493Zm6.935,1.615v6.646h1.492V37.77a1.315,1.315,0,0,1,1.272-.731,1.065,1.065,0,0,1,1.2,1.173v4.373h1.492l-0.006-4.558a1.441,1.441,0,0,1,.451-0.716,1.245,1.245,0,0,1,.833-0.273,1.209,1.209,0,0,1,.915.295,1.323,1.323,0,0,1,.276.928v4.324h1.493V38.219a2.673,2.673,0,0,0-.55-1.794,2.072,2.072,0,0,0-1.637-.608,2.357,2.357,0,0,0-2.039,1.02,1.838,1.838,0,0,0-1.824-1.02,2.393,2.393,0,0,0-1.917.817L240.4,35.94h-1.406Zm10.669,3.335a3.588,3.588,0,0,0,.845,2.5,2.882,2.882,0,0,0,2.251.937,3.082,3.082,0,0,0,1.624-.424,2.8,2.8,0,0,0,1.082-1.2,3.965,3.965,0,0,0,.377-1.757l-0.006-.35a3.406,3.406,0,0,0-.906-2.3,2.9,2.9,0,0,0-2.183-.866,3.065,3.065,0,0,0-1.61.421,2.825,2.825,0,0,0-1.087,1.2,3.919,3.919,0,0,0-.387,1.76v0.074Zm1.923-1.68a1.369,1.369,0,0,1,1.161-.581,1.383,1.383,0,0,1,1.176.59,2.641,2.641,0,0,1,.433,1.6,2.954,2.954,0,0,1-.421,1.726,1.363,1.363,0,0,1-1.176.59,1.379,1.379,0,0,1-1.18-.581,2.682,2.682,0,0,1-.423-1.606A2.9,2.9,0,0,1,251.583,37.6Zm1.578-3.879h-0.9l-1.83,1.453,1.185,0,1.094-.872,1.1,0.872,1.186,0Zm0.59-1.56a0.442,0.442,0,0,1-.135.314,0.405,0.405,0,0,1-.3.14,1.47,1.47,0,0,1-.624-0.2,1.488,1.488,0,0,0-.648-0.2,0.846,0.846,0,0,0-.641.3,0.985,0.985,0,0,0-.274.692l0.553,0.148a0.431,0.431,0,0,1,.126-0.3,0.388,0.388,0,0,1,.292-0.135,1.392,1.392,0,0,1,.6.2,1.462,1.462,0,0,0,.678.2,0.856,0.856,0,0,0,.648-0.293,0.96,0.96,0,0,0,.274-0.676Zm4.938,3.784H257.2v6.646h1.492V35.94Zm-1.366-1.164a0.829,0.829,0,0,0,.623.224,0.843,0.843,0,0,0,.627-0.224,0.769,0.769,0,0,0,.221-0.562,0.788,0.788,0,0,0-.221-0.571,0.837,0.837,0,0,0-.627-0.227,0.823,0.823,0,0,0-.623.227,0.79,0.79,0,0,0-.218.571A0.771,0.771,0,0,0,257.323,34.776Zm6.1,1.164v6.646h1.493v-4.73a1.438,1.438,0,0,1,1.345-.817,1.151,1.151,0,0,1,.894.3,1.37,1.37,0,0,1,.273.937v4.306h1.493V38.194q-0.037-2.377-2.113-2.377a2.389,2.389,0,0,0-1.935.891l-0.043-.768h-1.407Zm7.5,5.841a2.329,2.329,0,0,0,1.907.928,2.2,2.2,0,0,0,1.72-.719v0.448a1.541,1.541,0,0,1-.43,1.182,1.65,1.65,0,0,1-1.173.4,2.132,2.132,0,0,1-1.7-.817l-0.707.9a2.541,2.541,0,0,0,1.06.8,3.541,3.541,0,0,0,1.428.3,3.1,3.1,0,0,0,2.2-.755,2.68,2.68,0,0,0,.814-2.064V35.94H274.7l-0.068.669a2.189,2.189,0,0,0-1.787-.792,2.336,2.336,0,0,0-1.932.925,3.883,3.883,0,0,0-.728,2.472A4.01,4.01,0,0,0,270.922,41.781Zm1.155-4.158a1.318,1.318,0,0,1,1.145-.584,1.416,1.416,0,0,1,1.327.756v2.924a1.437,1.437,0,0,1-1.339.774,1.313,1.313,0,0,1-1.133-.574,2.67,2.67,0,0,1-.409-1.575A2.991,2.991,0,0,1,272.077,37.623Zm10.992,4.963v-0.1a3.4,3.4,0,0,1-.252-1.431v-3A2.094,2.094,0,0,0,282.1,36.4a2.789,2.789,0,0,0-1.861-.587,3.46,3.46,0,0,0-1.391.27,2.416,2.416,0,0,0-.986.746,1.654,1.654,0,0,0-.362,1.023H279a0.79,0.79,0,0,1,.326-0.648,1.314,1.314,0,0,1,.835-0.255,1.143,1.143,0,0,1,.878.31,1.162,1.162,0,0,1,.289.826v0.436h-0.915a3.823,3.823,0,0,0-2.257.568,1.886,1.886,0,0,0-.79,1.631A1.827,1.827,0,0,0,278,42.138a2.51,2.51,0,0,0,3.378-.172,2.317,2.317,0,0,0,.172.62h1.524Zm-3.928-1.33a0.87,0.87,0,0,1-.286-0.685,0.934,0.934,0,0,1,.418-0.817,2.2,2.2,0,0,1,1.247-.289h0.8v1.253a1.435,1.435,0,0,1-.586.577,1.7,1.7,0,0,1-.833.215A1.1,1.1,0,0,1,279.141,41.256Zm0.734-8.1h-1.7l1.659,1.861,1.24,0Zm5.331,2.789H283.6l2.334,6.61-0.215.571a1.369,1.369,0,0,1-.451.691,1.456,1.456,0,0,1-.851.206L284.131,44v1.16a2.663,2.663,0,0,0,.719.111,2.148,2.148,0,0,0,2.064-1.677l2.641-7.653h-1.591l-1.351,4.509ZM136.584,56.987a1.505,1.505,0,0,1-.9.224,1.552,1.552,0,0,1-.977-0.286,1.049,1.049,0,0,1-.4-0.814h-1.45a1.922,1.922,0,0,0,.356,1.112,2.4,2.4,0,0,0,1,.811,3.441,3.441,0,0,0,1.456.295,3.166,3.166,0,0,0,1.947-.556,1.731,1.731,0,0,0,.744-1.453,1.635,1.635,0,0,0-.243-0.909,1.959,1.959,0,0,0-.743-0.642A5.538,5.538,0,0,0,136,54.309a3.958,3.958,0,0,1-1.167-.384,0.6,0.6,0,0,1-.289-0.534,0.716,0.716,0,0,1,.31-0.608,1.324,1.324,0,0,1,.8-0.227,1.223,1.223,0,0,1,.847.286,0.92,0.92,0,0,1,.32.716h1.492a1.869,1.869,0,0,0-.734-1.53,2.98,2.98,0,0,0-1.925-.59,2.865,2.865,0,0,0-1.843.577,1.77,1.77,0,0,0-.725,1.437,1.7,1.7,0,0,0,1.118,1.566,5.609,5.609,0,0,0,1.272.405,3.5,3.5,0,0,1,1.09.368,0.677,0.677,0,0,1,.329.608A0.694,0.694,0,0,1,136.584,56.987Zm7.5,1.014a2.681,2.681,0,0,0,1.066-.924l-0.8-.768a2.021,2.021,0,0,1-1.67.829,1.652,1.652,0,0,1-1.214-.479,2,2,0,0,1-.549-1.3h4.342v-0.6a3.659,3.659,0,0,0-.74-2.451,2.607,2.607,0,0,0-2.1-.866,2.847,2.847,0,0,0-1.548.436,2.922,2.922,0,0,0-1.078,1.219,3.987,3.987,0,0,0-.384,1.778v0.184a3.244,3.244,0,0,0,.881,2.38,3.09,3.09,0,0,0,2.3.894A3.336,3.336,0,0,0,144.081,58Zm-0.7-4.981a1.818,1.818,0,0,1,.4,1.133v0.111h-2.844a2.238,2.238,0,0,1,.482-1.2A1.388,1.388,0,0,1,143.378,53.019Zm0.264-4.186a0.645,0.645,0,0,1-.166.464,0.528,0.528,0,0,1-.4.175,1.788,1.788,0,0,1-.814-0.276,1.813,1.813,0,0,0-.844-0.277,1.224,1.224,0,0,0-.974.461,1.7,1.7,0,0,0-.39,1.136l0.915,0.049a0.643,0.643,0,0,1,.163-0.458,0.519,0.519,0,0,1,.4-0.175,1.081,1.081,0,0,1,.292.037,2.466,2.466,0,0,1,.454.221,2.62,2.62,0,0,0,.5.236,1.462,1.462,0,0,0,.415.052,1.242,1.242,0,0,0,.979-0.448,1.651,1.651,0,0,0,.39-1.124Zm11.394,9.373V58.1a3.4,3.4,0,0,1-.252-1.431v-3a2.09,2.09,0,0,0-.712-1.649,2.789,2.789,0,0,0-1.861-.587,3.469,3.469,0,0,0-1.392.27,2.412,2.412,0,0,0-.985.746,1.655,1.655,0,0,0-.363,1.023h1.493a0.789,0.789,0,0,1,.325-0.648,1.317,1.317,0,0,1,.836-0.255,1.143,1.143,0,0,1,.878.31,1.162,1.162,0,0,1,.289.826v0.436h-0.915a3.827,3.827,0,0,0-2.258.568,1.887,1.887,0,0,0-.789,1.631,1.827,1.827,0,0,0,.633,1.413,2.511,2.511,0,0,0,3.378-.172,2.28,2.28,0,0,0,.172.62h1.523Zm-3.928-1.33a0.873,0.873,0,0,1-.285-0.685,0.936,0.936,0,0,1,.417-0.817,2.2,2.2,0,0,1,1.247-.289h0.805v1.253a1.437,1.437,0,0,1-.587.577,1.7,1.7,0,0,1-.832.215A1.106,1.106,0,0,1,151.108,56.877Zm1.711-6.41V50.043a1.159,1.159,0,0,0,.682-0.3,0.826,0.826,0,0,0,.239-0.608,0.97,0.97,0,0,0-.525-0.86,3.058,3.058,0,0,0-1.563-.319l-0.043.755q0.921,0,.921.442a0.3,0.3,0,0,1-.2.3,2.138,2.138,0,0,1-.648.117l0.043,0.9h1.094Zm3.507,1.093v6.646h1.493v-4.73a1.438,1.438,0,0,1,1.345-.817,1.152,1.152,0,0,1,.894.3,1.37,1.37,0,0,1,.273.937v4.306h1.493V53.815q-0.038-2.377-2.113-2.377a2.389,2.389,0,0,0-1.935.891l-0.043-.768h-1.407Zm8.489-2.789h-1.493v9.435h1.493V53.459a1.438,1.438,0,0,1,1.339-.8,1.216,1.216,0,0,1,.875.286,1.311,1.311,0,0,1,.3.974v4.287h1.493V53.864q-0.031-2.426-2.156-2.426a2.335,2.335,0,0,0-1.849.848V48.772Zm10.116,0h-1.492v9.435h1.492V53.459a1.439,1.439,0,0,1,1.34-.8,1.219,1.219,0,0,1,.875.286,1.315,1.315,0,0,1,.3.974v4.287h1.492V53.864q-0.03-2.426-2.156-2.426a2.338,2.338,0,0,0-1.849.848V48.772ZM186.8,51.014l-0.013.467a1.031,1.031,0,0,1-.23.67,1.016,1.016,0,0,1-.642.246V51.561h-1.492v4.773a1.476,1.476,0,0,1-1.469.78,1.034,1.034,0,0,1-1.05-1.265V51.561h-1.492v4.306a2.7,2.7,0,0,0,.555,1.831,2.065,2.065,0,0,0,1.637.633,2.317,2.317,0,0,0,1.868-.774l0.037,0.651h1.406V53.188a2,2,0,0,0,1.434-.574,2.408,2.408,0,0,0,.44-1.6H186.8Zm1.142,3.882a3.573,3.573,0,0,0,.848,2.506,2.891,2.891,0,0,0,2.242.928,3.1,3.1,0,0,0,1.624-.424,2.783,2.783,0,0,0,1.088-1.2,3.965,3.965,0,0,0,.377-1.757V54.773a3.919,3.919,0,0,0-.4-1.738,1.533,1.533,0,0,0,.9-0.777,3.1,3.1,0,0,0,.27-1.373h-1.025a2.648,2.648,0,0,1-.148,1.026,0.8,0.8,0,0,1-.473.442,2.9,2.9,0,0,0-2.23-.915,3.064,3.064,0,0,0-1.609.421,2.813,2.813,0,0,0-1.084,1.2,3.934,3.934,0,0,0-.384,1.766V54.9Zm1.917-1.68a1.368,1.368,0,0,1,1.16-.581,1.391,1.391,0,0,1,1.177.581,2.64,2.64,0,0,1,.433,1.606,2.961,2.961,0,0,1-.421,1.726,1.364,1.364,0,0,1-1.176.59,1.379,1.379,0,0,1-1.18-.581,2.682,2.682,0,0,1-.423-1.606A2.9,2.9,0,0,1,189.858,53.216Zm1.713-2.749V50.043a1.159,1.159,0,0,0,.682-0.3,0.823,0.823,0,0,0,.24-0.608,0.969,0.969,0,0,0-.526-0.86,3.058,3.058,0,0,0-1.563-.319l-0.043.755q0.921,0,.922.442a0.3,0.3,0,0,1-.2.3,2.138,2.138,0,0,1-.648.117l0.043,0.9h1.093Zm3.888,1.093v6.646h1.493v-4.73a1.438,1.438,0,0,1,1.345-.817,1.15,1.15,0,0,1,.894.3,1.37,1.37,0,0,1,.273.937v4.306h1.493V53.815q-0.038-2.377-2.113-2.377a2.389,2.389,0,0,0-1.935.891l-0.043-.768h-1.407Zm7.5,5.841a2.331,2.331,0,0,0,1.907.928,2.2,2.2,0,0,0,1.72-.719v0.448a1.541,1.541,0,0,1-.43,1.182,1.647,1.647,0,0,1-1.173.4,2.133,2.133,0,0,1-1.695-.817l-0.707.9a2.54,2.54,0,0,0,1.06.8,3.541,3.541,0,0,0,1.428.3,3.1,3.1,0,0,0,2.2-.755A2.677,2.677,0,0,0,208.076,58V51.561h-1.345l-0.068.669a2.189,2.189,0,0,0-1.787-.792,2.336,2.336,0,0,0-1.932.924,3.889,3.889,0,0,0-.728,2.472A4.016,4.016,0,0,0,202.956,57.4Zm1.155-4.158a1.318,1.318,0,0,1,1.146-.584,1.414,1.414,0,0,1,1.326.756v2.924a1.436,1.436,0,0,1-1.339.774,1.313,1.313,0,0,1-1.133-.574,2.678,2.678,0,0,1-.408-1.575A3,3,0,0,1,204.111,53.244Zm9.776-1.683H212.24l2.027,3.274-2.1,3.372h1.658l1.321-2.273,1.327,2.273h1.646l-2.1-3.372,2.033-3.274h-1.658l-1.266,2.187Zm10.675,6.646V58.1a3.4,3.4,0,0,1-.252-1.431v-3a2.093,2.093,0,0,0-.712-1.649,2.789,2.789,0,0,0-1.861-.587,3.469,3.469,0,0,0-1.392.27,2.412,2.412,0,0,0-.985.746A1.655,1.655,0,0,0,219,53.477h1.493a0.789,0.789,0,0,1,.325-0.648,1.317,1.317,0,0,1,.836-0.255,1.144,1.144,0,0,1,.878.31,1.166,1.166,0,0,1,.289.826v0.436H221.9a3.826,3.826,0,0,0-2.257.568,1.887,1.887,0,0,0-.789,1.631,1.827,1.827,0,0,0,.633,1.413,2.511,2.511,0,0,0,3.378-.172,2.28,2.28,0,0,0,.172.62h1.523Zm-3.928-1.33a0.874,0.874,0,0,1-.286-0.685,0.937,0.937,0,0,1,.418-0.817,2.2,2.2,0,0,1,1.247-.289h0.805v1.253a1.437,1.437,0,0,1-.587.577,1.7,1.7,0,0,1-.832.215A1.106,1.106,0,0,1,220.634,56.877ZM219.5,50.618l1.308,0,0.977-.872,0.976,0.872,1.3,0-1.788-1.533h-0.989Zm4.1-.971,0.964,0,1.327-1.64h-1.364Zm6.333,8.56h1.406V51.561h-1.492v4.773a1.475,1.475,0,0,1-1.468.78,1.035,1.035,0,0,1-1.051-1.265V51.561H225.84v4.306A2.69,2.69,0,0,0,226.4,57.7a2.062,2.062,0,0,0,1.637.633,2.315,2.315,0,0,0,1.867-.774Zm12.678-8.562H241.54V48.772h-1.493v0.872h-1.542v1.044h1.542v1.486a2.168,2.168,0,0,0-1.707-.737,2.284,2.284,0,0,0-1.911.931,3.951,3.951,0,0,0-.712,2.466,4.09,4.09,0,0,0,.722,2.555,2.268,2.268,0,0,0,1.888.94,2.2,2.2,0,0,0,1.788-.811l0.073,0.688h1.352V50.688h1.075V49.644Zm-5.013,3.59a1.276,1.276,0,0,1,1.118-.574,1.387,1.387,0,0,1,1.327.8V56.3a1.409,1.409,0,0,1-1.339.817,1.266,1.266,0,0,1-1.109-.568,2.767,2.767,0,0,1-.39-1.582A3.082,3.082,0,0,1,237.6,53.234ZM248.164,58a2.681,2.681,0,0,0,1.066-.924l-0.8-.768a2.02,2.02,0,0,1-1.67.829,1.648,1.648,0,0,1-1.213-.479,1.993,1.993,0,0,1-.55-1.3h4.342v-0.6a3.659,3.659,0,0,0-.74-2.451,2.607,2.607,0,0,0-2.1-.866,2.849,2.849,0,0,0-1.548.436,2.922,2.922,0,0,0-1.078,1.219,3.987,3.987,0,0,0-.384,1.778v0.184a3.244,3.244,0,0,0,.881,2.38,3.09,3.09,0,0,0,2.3.894A3.333,3.333,0,0,0,248.164,58Zm-0.7-4.981a1.818,1.818,0,0,1,.4,1.133v0.111h-2.844a2.231,2.231,0,0,1,.483-1.2A1.387,1.387,0,0,1,247.461,53.019Zm-3.36-2.4,1.308,0,0.977-.872,0.977,0.872,1.3,0-1.787-1.533h-0.989Zm4.1-.971,0.965,0,1.326-1.64h-1.363Zm2.267,1.913v6.646h1.492v-4.73a1.44,1.44,0,0,1,1.346-.817,1.149,1.149,0,0,1,.893.3,1.365,1.365,0,0,1,.274.937v4.306h1.492V53.815q-0.036-2.377-2.113-2.377a2.392,2.392,0,0,0-1.935.891l-0.043-.768h-1.406Zm13.568,5.427a1.505,1.505,0,0,1-.9.224,1.552,1.552,0,0,1-.977-0.286,1.049,1.049,0,0,1-.4-0.814h-1.45a1.922,1.922,0,0,0,.356,1.112,2.4,2.4,0,0,0,1,.811,3.441,3.441,0,0,0,1.456.295,3.166,3.166,0,0,0,1.947-.556,1.731,1.731,0,0,0,.744-1.453,1.635,1.635,0,0,0-.243-0.909,1.959,1.959,0,0,0-.743-0.642,5.538,5.538,0,0,0-1.379-.461,3.958,3.958,0,0,1-1.167-.384,0.6,0.6,0,0,1-.289-0.534,0.716,0.716,0,0,1,.31-0.608,1.324,1.324,0,0,1,.8-0.227,1.223,1.223,0,0,1,.847.286,0.92,0.92,0,0,1,.32.716h1.492a1.869,1.869,0,0,0-.734-1.53,2.98,2.98,0,0,0-1.925-.59,2.865,2.865,0,0,0-1.843.577,1.77,1.77,0,0,0-.725,1.437,1.7,1.7,0,0,0,1.118,1.566,5.609,5.609,0,0,0,1.272.405,3.5,3.5,0,0,1,1.09.368,0.677,0.677,0,0,1,.329.608A0.694,0.694,0,0,1,264.039,56.987Zm9.429-5.973-0.012.467a1.036,1.036,0,0,1-.231.67,1.015,1.015,0,0,1-.641.246V51.561h-1.493v4.773a1.475,1.475,0,0,1-1.468.78,1.034,1.034,0,0,1-1.05-1.265V51.561H267.08v4.306a2.69,2.69,0,0,0,.556,1.831,2.062,2.062,0,0,0,1.637.633,2.315,2.315,0,0,0,1.867-.774l0.037,0.651h1.407V53.188a2,2,0,0,0,1.434-.574,2.414,2.414,0,0,0,.439-1.6h-0.989Zm-4.324-.261,1.2,0,1.7-1.861h-1.7Zm7.349,5.854a2.724,2.724,0,0,1-.39-1.612v-0.24a2.68,2.68,0,0,1,.4-1.594,1.314,1.314,0,0,1,1.118-.525,1.256,1.256,0,0,1,.931.369,1.368,1.368,0,0,1,.39.94h1.407a2.476,2.476,0,0,0-.784-1.815,2.728,2.728,0,0,0-1.931-.691,2.81,2.81,0,0,0-2.212.912,3.524,3.524,0,0,0-.81,2.429v0.154a3.584,3.584,0,0,0,.816,2.494,2.835,2.835,0,0,0,2.212.9,2.931,2.931,0,0,0,1.339-.313,2.546,2.546,0,0,0,.983-0.851,2.2,2.2,0,0,0,.387-1.158h-1.407a1.113,1.113,0,0,1-.393.8,1.35,1.35,0,0,1-.928.326A1.313,1.313,0,0,1,276.493,56.607Zm12.245,1.6h1.726l-2.733-3.876,2.469-2.77h-1.794l-1.836,2.07-0.467.584V48.772H284.61v9.435H286.1V56.038l0.663-.682Zm3.907-9.435h-1.493v9.435h1.493V53.459a1.437,1.437,0,0,1,1.339-.8,1.218,1.218,0,0,1,.875.286,1.311,1.311,0,0,1,.3.974v4.287h1.492V53.864q-0.03-2.426-2.156-2.426a2.335,2.335,0,0,0-1.848.848V48.772Zm5.233,6.124a3.583,3.583,0,0,0,.845,2.5,2.882,2.882,0,0,0,2.251.937,3.085,3.085,0,0,0,1.624-.424,2.786,2.786,0,0,0,1.081-1.2,3.951,3.951,0,0,0,.378-1.757l-0.006-.35a3.406,3.406,0,0,0-.906-2.3,2.9,2.9,0,0,0-2.184-.866,3.064,3.064,0,0,0-1.609.421,2.825,2.825,0,0,0-1.087,1.2,3.919,3.919,0,0,0-.387,1.76V54.9Zm1.923-1.68a1.368,1.368,0,0,1,1.16-.581,1.384,1.384,0,0,1,1.177.59,2.648,2.648,0,0,1,.433,1.6,2.961,2.961,0,0,1-.421,1.726,1.364,1.364,0,0,1-1.176.59,1.379,1.379,0,0,1-1.18-.581,2.682,2.682,0,0,1-.423-1.606A2.9,2.9,0,0,1,299.8,53.216Zm1.689-2.749V50.043a1.159,1.159,0,0,0,.682-0.3,0.826,0.826,0,0,0,.239-0.608,0.97,0.97,0,0,0-.525-0.86,3.058,3.058,0,0,0-1.563-.319l-0.043.755q0.921,0,.921.442a0.3,0.3,0,0,1-.2.3,2.138,2.138,0,0,1-.648.117l0.043,0.9h1.094ZM309.742,58a2.688,2.688,0,0,0,1.066-.924L310,56.309a2.021,2.021,0,0,1-1.671.829,1.652,1.652,0,0,1-1.213-.479,2,2,0,0,1-.55-1.3h4.343v-0.6a3.665,3.665,0,0,0-.74-2.451,2.61,2.61,0,0,0-2.1-.866,2.852,2.852,0,0,0-1.548.436,2.928,2.928,0,0,0-1.078,1.219,4,4,0,0,0-.383,1.778v0.184a3.24,3.24,0,0,0,.881,2.38,3.088,3.088,0,0,0,2.3.894A3.337,3.337,0,0,0,309.742,58Zm-0.7-4.981a1.818,1.818,0,0,1,.4,1.133v0.111h-2.844a2.23,2.23,0,0,1,.482-1.2A1.388,1.388,0,0,1,309.039,53.019Z"],["static-attr","transform","translate(-67.313 -21.594)"],["flush-element"],["close-element"],["text","\\n  "],["open-element","path",[]],["static-attr","class","vng-age-rating-5"],["static-attr","d","M81.252,59.693h5.515V30.471H82.322a5.413,5.413,0,0,1-1.914,2.922,5.221,5.221,0,0,1-3.19.988H76.766V39.69h0.617a8.693,8.693,0,0,0,2.161-.268,4.07,4.07,0,0,0,1.708-.844V59.693Zm23.933-17.9a5.781,5.781,0,0,0,.762-3.087V36.645a6.42,6.42,0,0,0-2.038-5.062,8.16,8.16,0,0,0-5.618-1.811,9.536,9.536,0,0,0-3.149.494,7.059,7.059,0,0,0-2.428,1.4,6.2,6.2,0,0,0-1.564,2.2,7.3,7.3,0,0,0-.556,2.9v1.893a7.383,7.383,0,0,0,.885,3.828,6.413,6.413,0,0,0,2.614,2.387,6.466,6.466,0,0,0-2.881,2.161,5.539,5.539,0,0,0-.988,3.313v2.428a7.17,7.17,0,0,0,2.14,5.577,8.585,8.585,0,0,0,6.009,1.955,8.337,8.337,0,0,0,5.926-2.037,7.209,7.209,0,0,0,2.182-5.536v-2.3a7.828,7.828,0,0,0-.906-4.054A6.527,6.527,0,0,0,102.7,43.93,6.192,6.192,0,0,0,105.185,41.789Zm-9.2-5.268q0-2.922,2.3-2.922t2.3,2.963v2.675a4.337,4.337,0,0,1-.37,1.935,3.028,3.028,0,0,1-1.194,1.235l-0.453-.165a4.96,4.96,0,0,1-1.955-1.194,2.825,2.825,0,0,1-.638-1.976V36.521Zm4.9,16.546q0,3.087-2.469,3.087-2.593,0-2.593-3.128v-3.21a4.659,4.659,0,0,1,.412-2.12,3.2,3.2,0,0,1,1.441-1.338l0.494,0.206a5.213,5.213,0,0,1,2.119,1.276,3.24,3.24,0,0,1,.6,2.14v3.087Z"],["static-attr","transform","translate(-67.313 -21.594)"],["flush-element"],["close-element"],["text","\\n  "],["open-element","path",[]],["static-attr","class","vng-age-rating-6"],["static-attr","d","M120.012,34.414H116.2v-3.9h-3.053v3.9H109.4v2.908h3.751v4.217H116.2V37.322h3.81V34.414Z"],["static-attr","transform","translate(-67.313 -21.594)"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = n(94),
                s = l.Ember.Component.extend({
                    honeyfruit: l.Ember.inject.service("honeyfruit"),
                    isLinkingVisible: l.Ember.computed("honeyfruit.linkingStatus.state", "honeyfruit.linkingSettingsButtonAvailable", (function() {
                        const e = this.get("honeyfruit.linkingStatus.state");
                        return this.get("honeyfruit.linkingSettingsButtonAvailable") || e !== a.LinkingState.HIDDEN
                    }))
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1);
            n(100);
            var a = l.Ember.Component.extend({
                classNames: ["honeyfruit-settings__error"]
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l, a = n(1),
                s = n(94),
                o = (l = n(93)) && l.__esModule ? l : {
                    default: l
                };
            n(102);
            var i = a.Ember.Component.extend({
                classNames: ["linking-settings"],
                honeyfruit: a.Ember.inject.service("honeyfruit"),
                isAlreadyLinked: a.Ember.computed("linkingState", (function() {
                    return this.get("linkingState") === s.LinkingState.LINKED
                })),
                isDisabled: a.Ember.computed.or("isAlreadyLinked", "isLoading"),
                isError: a.Ember.computed("honeyfruit.linkingStatus.error", "isLoading", (function() {
                    return !this.get("isLoading") && this.get("honeyfruit.linkingStatus.error") !== s.LinkingStatusError.NO_ERROR
                })),
                isLoading: !1,
                linkingState: a.Ember.computed.alias("honeyfruit.linkingStatus.state"),
                logger: a.Ember.inject.service("honeyfruit-logger"),
                isLinkingVisible: a.Ember.computed("honeyfruit.linkingStatus.state", (function() {
                    return this.get("honeyfruit.linkingStatus.state") !== s.LinkingState.HIDDEN
                })),
                isGarenaLinkingVisible: a.Ember.computed("honeyfruit.linkingSettingsButtonAvailable", (function() {
                    return this.get("honeyfruit.linkingSettingsButtonAvailable")
                })),
                actions: {
                    async launchModal(e) {
                        if (!this.get("isDisabled")) try {
                            this.set("isLoading", !0), await this.get("honeyfruit").putAction(s.ActionType.LINK, e), this.set("isLoading", !1)
                        } catch (e) {
                            this.get("logger").error(`Error launching honeyfruit linking ${e.message}`), this.set("isLoading", !1)
                        }
                    },
                    launchModalGarena(e) {
                        if (!this.get("isDisabled")) try {
                            this.set("isLoading", !0), o.default.show(), this.set("isLoading", !1)
                        } catch (e) {
                            this.get("logger").error(`Error launching honeyfruit linking ${e.message}`), this.set("isLoading", !1)
                        }
                    }
                }
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1);
            n(104);
            var a = l.Ember.Component.extend({
                classNames: ["vng-publisher-settings"],
                honeyfruit: l.Ember.inject.service("honeyfruit"),
                isError: !1,
                isHidden: l.Ember.computed.not("honeyfruit.vngPublisherSettings.isVisible"),
                isLoading: !1,
                logger: l.Ember.inject.service("honeyfruit-logger"),
                actions: {
                    async handleButtonClick(e) {
                        if (e.preventDefault(), !this.get("isLoading")) {
                            this.set("isLoading", !0), this.set("isError", !1);
                            try {
                                await this.get("honeyfruit").postVNGSettingsAction(), this.set("isLoading", !1)
                            } catch (e) {
                                this.get("logger").error(`Error launching vng account settings ${e.message}`), this.set("isLoading", !1), this.set("isError", !0)
                            }
                        }
                    }
                }
            });
            t.default = a
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "bc+3HR+1",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\lib\\\\addon\\\\templates\\\\honeyfruit-settings.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["block",["if"],[["get",["isLinkingVisible"]]],null,1],["block",["if"],[["get",["honeyfruit","vngPublisherSettings","visible"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["unknown",["vng-publisher-settings"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["append",["unknown",["linking-settings"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "YyBGK2+w",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\lib\\\\addon\\\\templates\\\\honeyfruit-settings-error.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\lib\\\\addon\\\\styles\\\\honeyfruit-settings-error.styl\\" js-path=\\"null\\" "],["text","\\n"],["append",["unknown",["tra","honeyfruit_settings_error"]],false],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "fho1mN4y",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\lib\\\\addon\\\\templates\\\\linking-settings.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\lib\\\\addon\\\\styles\\\\linking-settings.styl\\" js-path=\\"null\\" "],["text","\\n"],["block",["if"],[["get",["isLinkingVisible"]]],null,9],["text","\\n"],["block",["if"],[["get",["isGarenaLinkingVisible"]]],null,4]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","√"]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["tra","honeyfruit_settings_link_a_garena_account"]],false],["text"," "],["block",["if"],[["get",["isAlreadyLinked"]]],null,0],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["uikit-spinner"],null,[["width","height"],["12px","12px"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["honeyfruit-settings-error"]],false],["text","\\n"]],"locals":[]},{"statements":[["open-element","div",[]],["static-attr","class","lol-settings-general-row"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-general-title"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","honeyfruit_settings_garena_account"]],false],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isError"]]],null,3],["text","  "],["open-element","lol-uikit-flat-button-secondary",[]],["static-attr","class","linking-settings__button"],["dynamic-attr","disabled",["unknown",["isDisabled"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"launchModalGarena","link_account_button"],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["isLoading"]]],null,2,1],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","√"]],"locals":[]},{"statements":[["text","      "],["append",["unknown",["tra","honeyfruit_settings_link_a_riot_account"]],false],["text"," "],["block",["if"],[["get",["isAlreadyLinked"]]],null,5],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["uikit-spinner"],null,[["width","height"],["12px","12px"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["honeyfruit-settings-error"]],false],["text","\\n"]],"locals":[]},{"statements":[["open-element","div",[]],["static-attr","class","lol-settings-general-row"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-general-title"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","honeyfruit_settings_riot_account"]],false],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isError"]]],null,8],["text","  "],["open-element","lol-uikit-flat-button-secondary",[]],["static-attr","class","linking-settings__button"],["dynamic-attr","disabled",["unknown",["isDisabled"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"launchModal","link_account_button"],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["isLoading"]]],null,7,6],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            const l = n(1).Ember;
            e.exports = l.HTMLBars.template({
                id: "YVfOcyN0",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\lib\\\\addon\\\\templates\\\\vng-publisher-settings.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_23\\\\LeagueClientContent_Release\\\\15680\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honeyfruit-account-claiming\\\\src\\\\lib\\\\addon\\\\styles\\\\vng-publisher-settings.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-general-row"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-general-title"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","vng_settings_account"]],false],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isError"]]],null,0],["text","  "],["open-element","a",[]],["static-attr","class","vng-publisher-settings__button"],["static-attr","href","#"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"handleButtonClick"],null],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","vng_settings_edit_profile"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["unknown",["honeyfruit-settings-error"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var l = n(1),
                a = n(94),
                s = function(e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || "object" != typeof e && "function" != typeof e) return {
                        default: e
                    };
                    var n = o(t);
                    if (n && n.has(e)) return n.get(e);
                    var l = {},
                        a = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var s in e)
                        if ("default" !== s && Object.prototype.hasOwnProperty.call(e, s)) {
                            var i = a ? Object.getOwnPropertyDescriptor(e, s) : null;
                            i && (i.get || i.set) ? Object.defineProperty(l, s, i) : l[s] = e[s]
                        } l.default = e, n && n.set(e, l);
                    return l
                }(n(2));

            function o(e) {
                if ("function" != typeof WeakMap) return null;
                var t = new WeakMap,
                    n = new WeakMap;
                return (o = function(e) {
                    return e ? n : t
                })(e)
            }
            t.default = class {
                honeyfruitDataBinding = null;
                linkingStatus = a.defaultLinkingStatus;
                linkingSettingsButtonAvailable = !1;
                constructor({
                    rootElement: e
                }) {
                    this.honeyfruitDataBinding = l.dataBinding.dataBinding("/lol-honeyfruit", l.websocket), this._rootElement = e
                }
                createEmberApp() {
                    return this._emberApp || (this._emberApp = this._createEmberApp(this._rootElement), this._rootElement = void 0), this._emberApp
                }
                confirmIsNewPlayer() {
                    this.honeyfruitDataBinding.put("/v1/account-claim/auto-dismiss", !0)
                }
                _createEmberApp(e) {
                    const t = (0, s.default)(e);
                    l.emberApplicationFactory.setFactoryDefinition(s.EMBER_APP_NAME, t, {
                        EMBER_CLI_COMPAT: !0
                    }, l.tra);
                    return l.componentFactory.create(s.EMBER_APP_NAME).emberAppInstancePromise
                }
                onVNGSettingsUpdated(e) {
                    l.logger.trace("onVNGSettingsUpdated", e)
                }
                clearMockedLinkingStatus() {
                    return this.honeyfruitDataBinding.delete("/v1/debug-linking-status")
                }
                mockLinkingStatus(e) {
                    return this.honeyfruitDataBinding.put("/v1/debug-linking-status", e)
                }
                observeLinkingStatus(e) {
                    return this.honeyfruitDataBinding.observe("/v1/linking-status", e), () => this.honeyfruitDataBinding.unobserve("/v1/linking-status", e)
                }
                emberHoneyfruitService() {
                    return (0, l.getDataBoundEmberService)({
                        dataBindingInstance: this.honeyfruitDataBinding,
                        propertiesToBind: [{
                            propertyName: "linkingStatus",
                            defaultValue: a.defaultLinkingStatus,
                            observedPath: "/v1/linking-status"
                        }, {
                            propertyName: "vngPublisherSettings",
                            defaultValue: a.defaultVNGPublisherSettings,
                            observedPath: "/v1/vng-publisher-settings"
                        }, {
                            propertyName: "linkingSettingsButtonAvailable",
                            defaultValue: !1,
                            observedPath: "/v1/linking-settings-button-available"
                        }],
                        serviceMethods: {
                            putAction: (e, t) => this.honeyfruitDataBinding.put("/v1/linking-status", {
                                action: e,
                                target: t
                            }),
                            postVNGSettingsAction: () => this.honeyfruitDataBinding.post("/v1/vng-publisher-settings")
                        }
                    })
                }
                emberLoggerService() {
                    return l.Ember.Service.extend({
                        always: e => l.logger.always(e),
                        error: e => l.logger.error(e),
                        warning: e => l.logger.warning(e),
                        info: e => l.logger.trace(e),
                        trace: e => l.logger.trace(e)
                    })
                }
                getLogger() {
                    return l.logger
                }
            }
        }],
        t = {};

    function n(l) {
        var a = t[l];
        if (void 0 !== a) return a.exports;
        var s = t[l] = {
            exports: {}
        };
        return e[l](s, s.exports, n), s.exports
    }
    n.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, (() => {
        "use strict";
        var e = a(n(1)),
            t = n(2),
            l = a(n(13));

        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        n(92);
        const {
            MIGRATION_RESULT_CODE: s,
            LINKING_STATUS: o
        } = l.default, i = document.currentScript.ownerDocument;
        const r = window.getPluginAnnounceEventName(t.pluginName);
        i.addEventListener(r, (function(l) {
            (0, l.registrationHandler)((function(l) {
                const a = l.get("rcp-fe-lol-uikit");
                return e.default.init(l, {
                    audio: e => e.get("rcp-fe-audio"),
                    componentFactory: e => e.get("rcp-fe-common-libs").getComponentFactory("1"),
                    dataBinding: e => e.get("rcp-fe-common-libs").getDataBinding(t.pluginName),
                    Ember: e => e.get("rcp-fe-ember-libs").getEmber(),
                    emberl10n: e => e.get("rcp-fe-ember-libs").getEmberL10n(1),
                    getDataBoundEmberService: e => e.get("rcp-fe-lol-shared-components").getDataBoundEmberService,
                    l10n: e => e.get("rcp-fe-lol-l10n"),
                    logger: e => e.get("rcp-fe-common-libs").logging.create(t.pluginName),
                    navigation: e => e.get("rcp-fe-lol-navigation"),
                    sharedComponents: e => e.get("rcp-fe-lol-shared-components"),
                    telemetry: e => e.get("rcp-fe-common-libs").getTelemetry("1"),
                    tra: e => e.get("rcp-fe-lol-l10n").tra(),
                    uikit: a,
                    summonerIconManager: a.getSummonerIconManager(),
                    Viewport: e => e.get("rcp-fe-lol-shared-components").getApi_Viewport(),
                    websocket: e => e.getSocket()
                }).then((() => {
                    const t = l.get("rcp-fe-lol-l10n").tra().overlay("/fe/lol-l10n/trans.json").overlay("/fe/lol-honeyfruit-account-claiming/trans.json"),
                        n = e.default.emberl10n(e.default.Ember, t);
                    return e.default.add({
                        dataBinding: e.default.dataBinding.bindTo(e.default.websocket),
                        tra: t,
                        traService: n
                    })
                })).then((() => e.default.tra.ready())).then((function() {
                    return e.default.add({
                        emberApplicationFactory: e => e.get("rcp-fe-ember-libs").getEmberApplicationFactory()
                    })
                })).then((function() {
                    const l = n(93).default,
                        a = n(109).default,
                        i = e.default.Viewport.getApiKey(`${t.pluginName} key`),
                        r = `${t.pluginName}-screen`,
                        c = e.default.Viewport.fullScreen().getScreenRoot(i, r),
                        u = c.getElement(),
                        m = new l(c, new a({
                            rootElement: u
                        }));
                    e.default.add({
                        honeyfruitAccountClaiming: m
                    });
                    const p = "/lol-client-config/v3/client-config/lol.client_settings.honeyfruit.account_claiming_enabled",
                        d = e.default.dataBinding,
                        h = n(19).fetchAccountStatus,
                        g = function(e) {
                            e && (d.unobserve(p, g), h().then((async function(e) {
                                const {
                                    linking_status: t,
                                    migration_status: n
                                } = e, l = t && t.eligible;
                                if (n === s.COMPLETED_SUCCESSFULLY || n === s.SUCCESS);
                                else {
                                    if (!l && t.reason_code === o.ALREADY_LINKED) m.show();
                                    else {
                                        await new Promise((function(e) {
                                            const t = "/lol-honeyfruit/v1/account-claim/auto-dismiss",
                                                n = function(l) {
                                                    null !== l && (d.unobserve(t, n), e(l))
                                                };
                                            d.observe(t, n)
                                        })) || m.show()
                                    }
                                }
                            })))
                        };
                    return d.observe(p, g), m
                }))
            }))
        }), {
            once: !0
        })
    })()
})();