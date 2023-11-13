(() => {
    var e = [, e => {
            "use strict";
            let t;

            function n() {
                return t || (console.error("The `provider` object has not been set, please do so by calling the `init` method."), null)
            }
            const i = {
                init: function(e, n) {
                    return t = e, this.add(n)
                },
                _getValue: function(e, n) {
                    let i;
                    return "function" == typeof n ? (i = n(t), i || console.warn("The function for key " + e + " returned a falsy value: ", i)) : "string" == typeof n ? (i = t.get(n), i || console.warn("The provider `get` invocation for the key " + e + " returned a falsy value: ", i)) : "object" == typeof n && (i = n), i
                },
                add: function(e) {
                    e = e || {};
                    const t = [],
                        n = this;
                    return Object.keys(e).forEach((function(i) {
                        const o = e[i],
                            r = n._getValue(i, o);
                        r && r.then ? (r.then((function(e) {
                            e || console.warn("The promise for the key " + i + " resolved with a falsy value: ", e), n._addValue(i, e)
                        })), t.push(r)) : n._addValue(i, r)
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
            e.exports = i
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = new class {
                constructor() {
                    this.subDoc = document
                }
                set(e) {
                    this.subDoc = e
                }
                get() {
                    return this.subDoc
                }
            };
            t.default = n
        }, (e, t, n) => {
            "use strict";
            var i;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            const o = new(((i = n(4)) && i.__esModule ? i : {
                default: i
            }).default);
            var r = class {
                constructor() {
                    o.initialise()
                }
                destroy() {
                    o.destroy()
                }
                removeCallbacks() {
                    o.removeCallbacks()
                }
                selectSkin(e, t, n) {
                    o.selectSkin(e, t, n)
                }
            };
            t.default = r
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var i, o = n(1),
                r = (i = n(5)) && i.__esModule ? i : {
                    default: i
                };
            const s = o.UiKitPlugin.getModalManager();
            var a = class {
                constructor(e) {
                    this._isObservingJmxToggle = !1, this._rootElement = e, this._isSkinsPickerEnabled = !1, this._hasOngoingSession = !1, this._hasInitialised = !1
                }
                initialise() {
                    this._dataBinding = o.DataBinding.bindTo((0, o.getProvider)().getSocket()), this._loginSessionCallback = this._handleLoginSession.bind(this, this._dataBinding), this._dataBinding.addObserver("/lol-login/v1/session", this._loginSessionCallback), this._emberApplicationModel = o.Ember.Object.create(), this._hasInitialised = !0
                }
                getEmberApplication() {
                    if (!this._isSkinsPickerEnabled) throw new Error("Skin Picker is not enabled");
                    return this._application || (this._application = this._createEmberApplication()), this._application
                }
                selectSkin(e, t, n) {
                    if (!this._isSkinsPickerEnabled) return void o.logger.error("Skin Picker is not enabled");
                    if ([e, t, n].some((e => "function" != typeof e))) throw new TypeError("selectSkin callbacks should be functions");
                    this._emberApplicationModel.set("onSkinSelected", e), this._emberApplicationModel.set("onDefault", t), this._emberApplicationModel.set("selectedSkinId", null), this._emberApplicationModel.set("onCloseButtonClicked", this._onCloseButtonClicked.bind(this));
                    const i = o.ComponentFactory.getDOMNode(this.getEmberApplication());
                    this.getEmberApplication().renderPromise.then((() => {
                        this._modal = s.add({
                            type: "DialogConfirm",
                            data: {
                                contents: i,
                                acceptText: this._tra.get("flyout_title_set_dynamic_background"),
                                declineText: this._tra.get("mastery_page_save_label"),
                                defaultTabIndex: 2
                            },
                            show: !0
                        }), this._modal.acceptPromise.then((() => {
                            t(), this.removeCallbacks(), this._endTelemetrySession()
                        }), (() => {
                            const t = this._emberApplicationModel.get("selectedSkinId");
                            Number.isInteger(t) && e(t), this.removeCallbacks(), this._endTelemetrySession()
                        })), n(), this._hasOngoingSession = !0, r.default.startTelemetrySession()
                    }))
                }
                removeCallbacks() {
                    this._emberApplicationModel && (this._emberApplicationModel.set("onSkinSelected", null), this._emberApplicationModel.set("onDefault", null), this._emberApplicationModel.set("selectedSkinId", null), this._emberApplicationModel.set("onCloseButtonClicked", null))
                }
                destroy() {
                    this._hasInitialised || o.logger.warning("Trying to destroy an uninitialised API instance"), this._application && (this._application.onRemove(), delete this._application), this.removeCallbacks(), this._dataBinding.removeObserver("/lol-login/v1/session", this._loginSessionCallback)
                }
                _endTelemetrySession() {
                    this._hasOngoingSession && r.default.endTelemetrySession(), this._hasOngoingSession = !1
                }
                _handleLoginSession(e, t) {
                    const n = t && "SUCCEEDED" === t.state,
                        i = t && t.summonerId;
                    n && i && !this._isObservingJmxToggle && (this._isObservingJmxToggle = !0, e.addObserver("/lol-platform-config/v1/namespaces/Profiles/SkinsPickerEnabled", this._handleJmxToggle.bind(this)))
                }
                _handleJmxToggle(e) {
                    !1 !== e && (this._isSkinsPickerEnabled = !0, this._onPluginInit())
                }
                _onPluginInit() {
                    this._tra = o.l10n.tra().overlay("/fe/lol-l10n/trans.json").overlay("/fe/lol-skins-picker/trans.json"), this._tra.ready().then((() => this._traService = (0, o.EmberL10n)(o.Ember, this._tra)), (() => o.logger.error("Could not initialize l10n!"))).then((() => {
                        if (this._setEmberFactoryDefinitions(this._traService), this._rootElement) {
                            const e = this.getEmberApplication();
                            this._rootElement.appendChild(o.ComponentFactory.getDOMNode(e))
                        }
                    }), (() => o.logger.error("Could not initialize Ember factory!")))
                }
                _setEmberFactoryDefinitions(e) {
                    o.EmberApplicationFactory.setFactoryDefinition({
                        name: "Flyout",
                        tra: e,
                        ComponentFactory: o.ComponentFactory,
                        FlyoutComponent: n(7).default,
                        ControlPanelComponent: n(10).default,
                        SkinsGridComponent: n(20).default,
                        SkinsStoreService: n(32).default
                    })
                }
                _createEmberApplication() {
                    return o.ComponentFactory.create("Flyout", {
                        model: this._emberApplicationModel
                    })
                }
                _handleModalClose() {
                    this.destroy()
                }
                _onCloseButtonClicked() {
                    s.remove(this._modal, (() => this.removeCallbacks()))
                }
            };
            t.default = a
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var i = n(1),
                o = n(6);
            const r = `/v1/events/${o.TELEMETRY_EVENT_NAME}`;
            var s = new class {
                constructor() {
                    this._dataBinding = (0, i.DataBinding)("/telemetry", (0, i.getProvider)().getSocket()), this._sessionStartTime = 0, this._userActivities = {}
                }
                startTelemetrySession() {
                    this._sessionStartTime = Date.now(), this._userActivities = {}, this.sendEvent(o.TELEMETRY_EVENT_ID.SKINS_PICKER_SHOW, o.TELEMETRY_EVENT_SOURCE.SKINS_PICKER)
                }
                endTelemetrySession() {
                    this._sessionStartTime > 0 ? this.sendEvent(o.TELEMETRY_EVENT_ID.SKINS_PICKER_HIDE, o.TELEMETRY_EVENT_SOURCE.SKINS_PICKER, this._userActivities) : i.logger.warning("Tried to end a telemetry session without having started it."), this._sessionStartTime = 0, this._userActivities = {}
                }
                sendEvent(e, t, n) {
                    if (!o.TELEMETRY_EVENT_ID_SET.has(e)) return i.logger.warning(`Invalid telemetry event id ${e}`), Promise.reject(`Invalid telemetry event id ${e}`);
                    if (!o.TELEMETRY_EVENT_SOURCE_SET.has(t)) return i.logger.warning(`Invalid telemetry event source ${t}`), Promise.reject(`Invalid telemetry event source ${t}`);
                    const s = Object.assign({
                        id: e,
                        source: t,
                        sessionId: this._sessionStartTime,
                        sessionTimestamp: this._getSessionTimestamp()
                    }, n);
                    this._dataBinding.post(r, s)
                }
                addUserBehaviorCount(e, t) {
                    this._userActivities.hasOwnProperty(e) || (this._userActivities[e] = {
                        count: 0
                    });
                    const n = this._userActivities[e];
                    n.count++, null != t && (n.hasOwnProperty(t) ? n[t]++ : n[t] = 1)
                }
                addUserBehaviorValue(e, t) {
                    this._userActivities.hasOwnProperty(e) || (this._userActivities[e] = []);
                    const n = this._userActivities[e];
                    n.push(t), n.length > o.MAX_VALUE_FOR_SAME_USER_BEHAVIOR && n.splice(0, n.length - o.MAX_VALUE_FOR_SAME_USER_BEHAVIOR)
                }
                setUserBehaviorValue(e, t) {
                    this._userActivities[e] = t
                }
                _getSessionTimestamp() {
                    return this._sessionStartTime ? Date.now() - this._sessionStartTime : 0
                }
            };
            t.default = s
        }, (e, t) => {
            "use strict";

            function n(e) {
                const t = new Set;
                for (const n in e) t.add(e[n]);
                return t
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.USER_ACTIVITIES = t.TELEMETRY_EVENT_SOURCE_SET = t.TELEMETRY_EVENT_SOURCE = t.TELEMETRY_EVENT_NAME = t.TELEMETRY_EVENT_ID_SET = t.TELEMETRY_EVENT_ID = t.MAX_VALUE_FOR_SAME_USER_BEHAVIOR = void 0, t.getAllValues = n;
            t.TELEMETRY_EVENT_NAME = "profile__skins_picker_event";
            const i = {
                SKINS_PICKER_SHOW: "skins_picker_show",
                SKINS_PICKER_HIDE: "skins_picker_hide"
            };
            t.TELEMETRY_EVENT_ID = i;
            const o = n(i);
            t.TELEMETRY_EVENT_ID_SET = o;
            const r = {
                SKINS_PICKER: "skins_picker"
            };
            t.TELEMETRY_EVENT_SOURCE = r;
            const s = n(r);
            t.TELEMETRY_EVENT_SOURCE_SET = s;
            t.USER_ACTIVITIES = {
                PREVIEW_SKIN: "previewSkin",
                SET_BACKGROUND_SKIN_ID: "setBackgroundSkinId",
                RESET_BACKGROUND_SKIN: "resetBackgroundSkin",
                SWITCH_GROUPING: "switchGrouping",
                SWITCH_SORTING: "switchSorting"
            };
            t.MAX_VALUE_FOR_SAME_USER_BEHAVIOR = 20
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var i = n(1);
            const {
                computed: o,
                Component: r,
                isArray: s,
                get: a,
                set: l,
                run: _,
                inject: {
                    service: c
                }
            } = i.Ember;
            i.Ember.A;
            var u = r.extend({
                classNames: ["flyout-component"],
                layout: n(8),
                style: n(9),
                skinsStore: c(),
                groupingSortingState: o.alias("skinsStore.groupingSortingState"),
                actions: {
                    setNameFilter(e) {
                        a(this, "skinsStore").setNameFilter(e)
                    },
                    setGroupingAndSorting(e, t) {
                        a(this, "skinsStore").setGroupingAndSorting(e, t)
                    },
                    updateSelectedSkinId(e) {
                        a(this, "model.onSkinSelected")
                    },
                    closeFlyout() {
                        const e = a(this, "model.onCloseButtonClicked");
                        e && e()
                    }
                }
            });
            t.default = u
        }, (e, t, n) => {
            const i = n(1).Ember;
            e.exports = i.HTMLBars.template({
                id: "5H8MZYKj",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-skins-picker\\\\src\\\\components\\\\flyout-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-skins-picker\\\\src\\\\components\\\\flyout-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-skins-picker\\\\src\\\\components\\\\flyout-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","flyout-title"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","flyout-title-label"],["flush-element"],["append",["unknown",["tra","flyout_title_label"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","flyout-title-close"],["modifier",["action"],[["get",[null]],"closeFlyout"]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","flyout-control-panel"],["flush-element"],["text","\\n  "],["append",["helper",["control-panel"],null,[["groupingSortingState","setNameFilter","setGroupingAndSorting"],[["get",["groupingSortingState"]],["helper",["action"],[["get",[null]],"setNameFilter"],null],["helper",["action"],[["get",[null]],"setGroupingAndSorting"],null]]]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","skins-grid"],["flush-element"],["text","\\n  "],["append",["helper",["skins-grid"],null,[["selectedSkinId","filteredSkins","onSkinSelected"],[["get",["model","selectedSkinId"]],["get",["skinsStore","filteredSkins"]],["helper",["action"],[["get",[null]],"updateSelectedSkinId"],null]]]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
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
            var i, o = n(1),
                r = n(11),
                s = (i = n(5)) && i.__esModule ? i : {
                    default: i
                },
                a = n(6);
            const {
                computed: l,
                Component: _,
                observer: c,
                get: u,
                run: p,
                set: d
            } = o.Ember, g = o.Ember.A;
            class E {}
            var S = _.extend({
                classNames: ["control-panel-component"],
                layout: n(18),
                style: n(19),
                availableGroupList: r.CONTROL_PANEL_GROUP_DROPDOWN_OPTIONS,
                onNameFilterChange: c("nameFilter", (function() {
                    const e = u(this, "nameFilter");
                    u(this, "setNameFilter")(e)
                })),
                init() {
                    this._super(...arguments), d(this, "tracker", new E)
                },
                availableGroups: l("groupingSortingState.grouping", (function() {
                    const e = u(this, "groupingSortingState.grouping"),
                        t = u(this, "tra");
                    return Object.entries(u(this, "availableGroupList")).map((function(n) {
                        const i = n[1];
                        return {
                            name: t.get(i.traKey),
                            isSelected: e.key === i.key,
                            groupKey: i.key
                        }
                    }))
                })),
                availableSorts: l("groupingSortingState.grouping", "groupingSortingState.groupSortOrder", (function() {
                    const e = u(this, "groupingSortingState.grouping"),
                        t = u(this, "groupingSortingState.groupSortOrder");
                    if (e) {
                        const n = u(this, "tra"),
                            i = e.sortOptions;
                        return Object.entries(i).map((e => {
                            const i = e[1];
                            return {
                                name: i.name,
                                label: n.get(i.traKey),
                                selected: t === i.name
                            }
                        }))
                    }
                    return g()
                })),
                actions: {
                    setSortOrder(e) {
                        d(this, "sortOrder", e);
                        const t = u(this, "groupingSortingState.grouping").sortOptions[e.name];
                        d(this, "groupingSortingState.groupSortOrder", t.name);
                        u(this, "setGroupingAndSorting")(t.groupingConfig, t.sortingConfig), s.default.addUserBehaviorCount(a.USER_ACTIVITIES.SWITCH_SORTING, e.name)
                    },
                    setGroupingKey(e) {
                        const t = u(this, "availableGroupList")[e];
                        t && this.send("setGrouping", t)
                    },
                    setGrouping(e) {
                        if (u(this, "groupingSortingState.grouping") === e) return;
                        d(this, "groupingSortingState.grouping", e);
                        const t = e.sortOptions[e.defaultSortOptionName],
                            n = t.groupingConfig,
                            i = t.sortingConfig;
                        d(this, "groupingSortingState.groupSortOrder", t.name), p.scheduleOnce("afterRender", (() => this._selectSortOption.bind(this)(i.name)));
                        u(this, "setGroupingAndSorting")(n, i), s.default.addUserBehaviorCount(a.USER_ACTIVITIES.SWITCH_GROUPING, e.key)
                    }
                },
                _selectSortOption(e) {
                    const t = this.$(`[value='${e}']`);
                    t.length && t[0].setAttribute("selected", !0)
                }
            });
            t.default = S
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.TIER_GROUPING_TYPE = t.DEFAULT_CONTROL_PANEL_SORTING = t.DEFAULT_CONTROL_PANEL_DROPDOWN_OPTION = t.CONTROL_PANEL_GROUP_DROPDOWN_OPTIONS = t.COLLECTION_GRID_NO_SKIN_SORTING_CONFIG = t.COLLECTION_GRID_NO_SKIN_DROPDOWN_OPTION = void 0;
            var i = n(12),
                o = n(14);
            const r = {
                    groupingByMyCollectionPurchaseDateDescending: {
                        name: "purchaseDateDescending",
                        traKey: "control_panel_sorting_purchase_date_descending",
                        groupingConfig: i.GROUPING_CONFIGS.BY_ACQUIRE_YEAR_AND_RECENT_DATE,
                        sortingConfig: i.GROUPING_CONFIGS.BY_ACQUIRE_YEAR_AND_RECENT_DATE.supportedSortingConfigs.recentAcquireFirst
                    },
                    groupingByMyCollectionReleaseDateDescending: {
                        name: "releaseDateDescending",
                        traKey: "control_panel_sorting_release_date_descending",
                        groupingConfig: i.GROUPING_CONFIGS.BY_RELEASE_YEAR_OWNED_ONLY,
                        sortingConfig: i.GROUPING_CONFIGS.BY_RELEASE_YEAR_OWNED_ONLY.supportedSortingConfigs.releaseYearDescending
                    },
                    groupingByMyCollectionAlphaAscending: {
                        name: "alphaAscending",
                        traKey: "control_panel_sorting_alphabetical_ascending",
                        groupingConfig: i.GROUPING_CONFIGS.BY_SKIN_NAME_FIRST_LETTER,
                        sortingConfig: i.GROUPING_CONFIGS.BY_SKIN_NAME_FIRST_LETTER.supportedSortingConfigs.groupKeyAscending
                    },
                    groupingByAllSkinsReleaseDateDescending: {
                        name: "releaseDateDescending",
                        traKey: "control_panel_sorting_release_date_descending",
                        groupingConfig: i.GROUPING_CONFIGS.BY_RELEASE_YEAR,
                        sortingConfig: i.GROUPING_CONFIGS.BY_RELEASE_YEAR.supportedSortingConfigs.releaseYearDescending
                    },
                    groupingByAllSkinsAlphaAscending: {
                        name: "alphaAscending",
                        traKey: "control_panel_sorting_alphabetical_ascending",
                        groupingConfig: i.GROUPING_CONFIGS.BY_CHAMPION_NAME_FIRST_LETTER,
                        sortingConfig: i.GROUPING_CONFIGS.BY_CHAMPION_NAME_FIRST_LETTER.supportedSortingConfigs.groupKeyAscending
                    },
                    groupingByChampionMasteryDescending: {
                        name: "masteryDescending",
                        traKey: "control_panel_sorting_mastery_descending",
                        groupingConfig: i.GROUPING_CONFIGS.BY_CHAMPION_ID,
                        sortingConfig: i.GROUPING_CONFIGS.BY_CHAMPION_ID.supportedSortingConfigs.championMasteryDescending
                    },
                    groupingByChampionOwnedSkinCountDescending: {
                        name: "ownedSkinCountDescending",
                        traKey: "control_panel_sorting_most_owned",
                        groupingConfig: i.GROUPING_CONFIGS.BY_CHAMPION_ID,
                        sortingConfig: i.GROUPING_CONFIGS.BY_CHAMPION_ID.supportedSortingConfigs.ownedSkinCountDescending
                    },
                    groupingByChampionCompletionPercentageDescending: {
                        name: "completionPercentageDescending",
                        traKey: "control_panel_sorting_most_complete_percentage",
                        groupingConfig: i.GROUPING_CONFIGS.BY_CHAMPION_ID,
                        sortingConfig: i.GROUPING_CONFIGS.BY_CHAMPION_ID.supportedSortingConfigs.completionPercentageDescending
                    },
                    groupingByChampionGroupTitleAscending: {
                        name: "groupTitleAscending",
                        traKey: "control_panel_sorting_alphabetical_ascending",
                        groupingConfig: i.GROUPING_CONFIGS.BY_CHAMPION_ID,
                        sortingConfig: i.GROUPING_CONFIGS.BY_CHAMPION_ID.supportedSortingConfigs.championNameAscending
                    },
                    groupingBySetOwnedSkinCountDescending: {
                        name: "ownedSkinCountDescending",
                        traKey: "control_panel_sorting_most_owned",
                        groupingConfig: i.GROUPING_CONFIGS.BY_SKIN_LINE,
                        sortingConfig: i.GROUPING_CONFIGS.BY_SKIN_LINE.supportedSortingConfigs.ownedSkinCountDescending
                    },
                    groupingBySetCompletionPercentageDescending: {
                        name: "completionPercentageDescending",
                        traKey: "control_panel_sorting_most_complete_percentage",
                        groupingConfig: i.GROUPING_CONFIGS.BY_SKIN_LINE,
                        sortingConfig: i.GROUPING_CONFIGS.BY_SKIN_LINE.supportedSortingConfigs.completionPercentageDescending
                    },
                    groupingBySetGroupTitleAscending: {
                        name: "groupTitleAscending",
                        traKey: "control_panel_sorting_alphabetical_ascending",
                        groupingConfig: i.GROUPING_CONFIGS.BY_SKIN_LINE,
                        sortingConfig: i.GROUPING_CONFIGS.BY_SKIN_LINE.supportedSortingConfigs.skinLineNameAscending
                    },
                    groupingByUniverseNameAscending: {
                        name: "universeNameAscending",
                        traKey: "control_panel_sorting_universe_title_alpha_ascending",
                        groupingConfig: i.GROUPING_CONFIGS.BY_UNIVERSE,
                        sortingConfig: i.GROUPING_CONFIGS.BY_UNIVERSE.supportedSortingConfigs.universeNameAscending
                    },
                    groupingByTierGroupIdDescending: {
                        name: "groupIdDescending",
                        traKey: "control_panel_sorting_rarity_descending",
                        groupingConfig: i.GROUPING_CONFIGS.BY_RARITY,
                        sortingConfig: i.GROUPING_CONFIGS.BY_RARITY.supportedSortingConfigs.rarityOrderDescending
                    }
                },
                s = {
                    myCollection: {
                        key: "myCollection",
                        traKey: "control_panel_grouping_my_collection",
                        showUnownedFilter: !1,
                        sortOptions: {
                            purchaseDateDescending: r.groupingByMyCollectionPurchaseDateDescending,
                            alphaAscending: r.groupingByMyCollectionAlphaAscending
                        },
                        defaultSortOptionName: "purchaseDateDescending"
                    },
                    groupByChampion: {
                        key: "groupByChampion",
                        traKey: "control_panel_grouping_by_champion",
                        showUnownedFilter: !0,
                        sortOptions: {
                            masteryDescending: r.groupingByChampionMasteryDescending,
                            ownedSkinCountDescending: r.groupingByChampionOwnedSkinCountDescending,
                            groupTitleAscending: r.groupingByChampionGroupTitleAscending
                        },
                        defaultSortOptionName: "masteryDescending"
                    },
                    groupBySet: {
                        key: "groupBySet",
                        traKey: "control_panel_grouping_by_skinline",
                        showUnownedFilter: !0,
                        sortOptions: {
                            ownedSkinCountDescending: r.groupingBySetOwnedSkinCountDescending,
                            groupTitleAscending: r.groupingBySetGroupTitleAscending
                        },
                        defaultSortOptionName: "ownedSkinCountDescending"
                    },
                    groupByTier: {
                        key: "groupByTier",
                        traKey: "control_panel_grouping_by_tier",
                        showUnownedFilter: !0,
                        sortOptions: {
                            groupIdDescending: r.groupingByTierGroupIdDescending
                        },
                        defaultSortOptionName: "groupIdDescending"
                    }
                };
            t.CONTROL_PANEL_GROUP_DROPDOWN_OPTIONS = s;
            const a = s.myCollection;
            t.DEFAULT_CONTROL_PANEL_DROPDOWN_OPTION = a;
            const l = a.sortOptions[a.defaultSortOptionName];
            t.DEFAULT_CONTROL_PANEL_SORTING = l;
            const _ = s.groupByChampion;
            t.COLLECTION_GRID_NO_SKIN_DROPDOWN_OPTION = _;
            const c = _.sortOptions[_.defaultSortOptionName];
            t.COLLECTION_GRID_NO_SKIN_SORTING_CONFIG = c;
            const u = o.GROUPING_TYPES.GROUP_BY_RARITY;
            t.TIER_GROUPING_TYPE = u
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.GROUPING_CONFIGS = void 0;
            var i = n(13),
                o = n(15),
                r = n(17);
            const s = {
                BY_ACQUIRE_YEAR_AND_RECENT_DATE: {
                    ownershipFilter: r.COLLECTION_GRID_OWNERSHIP_FILTERS.OWNED,
                    filters: [r.OWNED_SKIN_FILTER],
                    groupingStrategy: i.GROUPING_STRATEGIES.BY_OWNERSHIP_OWNED_ONLY,
                    subGroupingConfigs: [{
                        groupingStrategy: i.GROUPING_STRATEGIES.BY_ACQUIRE_YEAR
                    }],
                    supportedSortingConfigs: {
                        recentAcquireFirst: o.SORTING_CONFIGS.ACQUIRE_YEAR_AND_RECENT_DATE_SORTING
                    }
                },
                BY_SKIN_NAME_FIRST_LETTER: {
                    ownershipFilter: r.COLLECTION_GRID_OWNERSHIP_FILTERS.OWNED,
                    filters: [r.OWNED_SKIN_FILTER],
                    groupingStrategy: i.GROUPING_STRATEGIES.BY_SKIN_NAME_FIRST_LETTER,
                    supportedSortingConfigs: {
                        groupKeyAscending: o.SORTING_CONFIGS.SKIN_NAME_FIRST_LETTER_ASCENDING
                    }
                },
                BY_RELEASE_YEAR_OWNED_ONLY: {
                    ownershipFilter: r.COLLECTION_GRID_OWNERSHIP_FILTERS.OWNED,
                    filters: [r.OWNED_SKIN_FILTER],
                    groupingStrategy: i.GROUPING_STRATEGIES.BY_RELEASE_YEAR,
                    supportedSortingConfigs: {
                        releaseYearDescending: o.SORTING_CONFIGS.RELEASE_YEAR_DESCENDING
                    }
                },
                BY_RELEASE_YEAR: {
                    ownershipFilter: r.COLLECTION_GRID_OWNERSHIP_FILTERS.OWNED,
                    groupingStrategy: i.GROUPING_STRATEGIES.BY_RELEASE_YEAR,
                    supportedSortingConfigs: {
                        releaseYearDescending: o.SORTING_CONFIGS.RELEASE_YEAR_DESCENDING
                    }
                },
                BY_CHAMPION_NAME_FIRST_LETTER: {
                    ownershipFilter: r.COLLECTION_GRID_OWNERSHIP_FILTERS.OWNED,
                    groupingStrategy: i.GROUPING_STRATEGIES.BY_CHAMPION_NAME_FIRST_LETTER,
                    supportedSortingConfigs: {
                        groupKeyAscending: o.SORTING_CONFIGS.CHAMPION_NAME_FIRST_LETTER_ASCENDING
                    }
                },
                BY_CHAMPION_ID: {
                    ownershipFilter: r.COLLECTION_GRID_OWNERSHIP_FILTERS.OWNED,
                    groupingStrategy: i.GROUPING_STRATEGIES.BY_CHAMPION_ID,
                    supportedSortingConfigs: {
                        championNameAscending: o.SORTING_CONFIGS.CHAMPION_NAME_ASCENDING,
                        championMasteryDescending: o.SORTING_CONFIGS.CHAMPION_MASTERY_DESCENDING,
                        ownedSkinCountDescending: o.SORTING_CONFIGS.CHAMPION_GROUP_OWNED_SKIN_COUNT_DESCENDING,
                        completionPercentageDescending: o.SORTING_CONFIGS.CHAMPION_GROUP_COMPLETION_PERCENTAGE_DESCENDING
                    }
                },
                BY_RARITY: {
                    ownershipFilter: r.COLLECTION_GRID_OWNERSHIP_FILTERS.OWNED,
                    groupingStrategy: i.GROUPING_STRATEGIES.BY_RARITY,
                    supportedSortingConfigs: {
                        rarityOrderDescending: o.SORTING_CONFIGS.RARITY_ORDER_DESCENDING
                    }
                },
                BY_SKIN_LINE: {
                    ownershipFilter: r.COLLECTION_GRID_OWNERSHIP_FILTERS.OWNED,
                    filters: [r.SKIN_WITH_SKINLINE_FILTER],
                    groupingStrategy: i.GROUPING_STRATEGIES.BY_SKIN_LINE,
                    supportedSortingConfigs: {
                        ownedSkinCountDescending: o.SORTING_CONFIGS.SKIN_LINE_GROUP_OWNED_SKIN_COUNT_DESCENDING,
                        completionPercentageDescending: o.SORTING_CONFIGS.SKIN_LINE_GROUP_COMPLETION_PERCENTAGE_DESCENDING,
                        skinLineNameAscending: o.SORTING_CONFIGS.SKIN_LINE_NAME_ASCENDING
                    }
                },
                BY_UNIVERSE: {
                    ownershipFilter: r.COLLECTION_GRID_OWNERSHIP_FILTERS.OWNED,
                    filters: [r.SKIN_WITH_SKINLINE_FILTER],
                    groupingStrategy: i.GROUPING_STRATEGIES.BY_UNIVERSE,
                    subGroupingConfigs: [{
                        groupingStrategy: i.GROUPING_STRATEGIES.BY_SKIN_LINE
                    }],
                    supportedSortingConfigs: {
                        universeNameAscending: o.SORTING_CONFIGS.UNIVERSE_NAME_ASCENDING
                    }
                }
            };
            t.GROUPING_CONFIGS = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.GROUPING_STRATEGIES = void 0, t.getFirstLetter = s, t.getOwnedSkinCount = r;
            var i = n(1),
                o = n(14);

            function r(e) {
                return i.lodash.filter(e, "ownership.owned").length
            }

            function s(e) {
                const t = e.match(/[\u00C0-\u1FFF\u2C00-\uD7FF\w]/);
                return t ? t[0] : null
            }
            const a = {
                BY_CHAMPION_ID: {
                    groupingType: o.GROUPING_TYPES.GROUP_BY_CHAMPION_ID,
                    getGroupKeys: e => e.ownership.owned ? [e.championId] : [],
                    getGroupMetaData(e, t, n) {
                        const i = e,
                            o = n.championsById[i],
                            s = t.length,
                            a = r(t),
                            l = s <= 0 ? 0 : a / s;
                        return {
                            groupId: i,
                            championId: i,
                            championName: o ? o.name : null,
                            masteryPoint: t[0] ? t[0].championPoints : null,
                            totalSkinCount: s,
                            ownedSkinCount: a,
                            ownedSkinPercentage: l
                        }
                    }
                },
                BY_RARITY: {
                    groupingType: o.GROUPING_TYPES.GROUP_BY_RARITY,
                    getGroupKeys: e => e.ownership.owned ? [e.rarity] : [],
                    getGroupMetaData(e, t) {
                        const n = t.length,
                            i = r(t),
                            o = e;
                        return {
                            groupId: o ? o.order : null,
                            rarity: o,
                            totalSkinCount: n,
                            ownedSkinCount: i
                        }
                    }
                },
                BY_SKIN_LINE: {
                    groupingType: o.GROUPING_TYPES.GROUP_BY_SKIN_LINE,
                    getGroupKeys: (e, t) => e.ownership.owned && e.skinLines ? e.skinLines.reduce(((e, n) => (n && t.skinLinesById[n.id] && e.push(t.skinLinesById[n.id]), e)), []) : [],
                    getGroupMetaData(e, t) {
                        const n = t.length,
                            i = r(t),
                            o = n <= 0 ? 0 : i / n,
                            s = e;
                        return {
                            groupId: s.id,
                            skinLine: s,
                            totalSkinCount: n,
                            ownedSkinCount: i,
                            ownedSkinPercentage: o
                        }
                    }
                },
                BY_RELEASE_YEAR: {
                    groupingType: o.GROUPING_TYPES.GROUP_BY_RELEASE_YEAR,
                    getGroupKeys: e => [e.releaseDate ? new Date(e.releaseDate).getFullYear() : null],
                    getGroupMetaData: e => ({
                        groupId: e,
                        releaseYear: e
                    })
                },
                BY_CHAMPION_NAME_FIRST_LETTER: {
                    groupingType: o.GROUPING_TYPES.GROUP_BY_CHAMPION_NAME_FIRST_LETTER,
                    getGroupKeys(e, t) {
                        const n = t.championsById[e.championId];
                        return e.ownership.owned ? [s(n.name)] : []
                    },
                    getGroupMetaData: e => ({
                        groupId: e,
                        championNameFirstLetter: e
                    })
                },
                BY_ACQUIRE_YEAR: {
                    groupingType: o.GROUPING_TYPES.GROUP_BY_ACQUIRE_YEAR,
                    getGroupKeys(e) {
                        if (i.lodash.get(e, "ownership.owned")) {
                            const t = i.lodash.get(e, "ownership.rental.purchaseDate");
                            return [t && t > 0 ? new Date(t).getFullYear() : null]
                        }
                        return []
                    },
                    getGroupMetaData: e => ({
                        groupId: e,
                        acquireYear: e
                    })
                },
                BY_SKIN_NAME_FIRST_LETTER: {
                    groupingType: o.GROUPING_TYPES.GROUP_BY_SKIN_NAME_FIST_LETTER,
                    getGroupKeys: e => e.ownership.owned ? [s(e.name.toLocaleLowerCase())] : [],
                    getGroupMetaData: e => ({
                        groupId: e,
                        skinNameFirstLetter: e
                    })
                },
                BY_OWNERSHIP_OWNED_ONLY: {
                    groupingType: o.GROUPING_TYPES.GROUP_BY_OWNERSHIP_OWNED_ONLY,
                    getGroupKeys: e => e.ownership.owned ? [1] : [],
                    getGroupMetaData: () => ({})
                },
                BY_UNIVERSE: {
                    groupingType: o.GROUPING_TYPES.GROUP_BY_UNIVERSE,
                    getGroupKeys(e, t) {
                        const {
                            universeBySkinlineId: n
                        } = t, i = e.skinLines ? e.skinLines[0].id : null;
                        return n && i ? [n.get(i)] : []
                    },
                    getGroupMetaData(e) {
                        const t = e;
                        return {
                            groupId: t ? t.id : null,
                            universeInfo: t,
                            universeName: t ? t.name : null
                        }
                    }
                }
            };
            t.GROUPING_STRATEGIES = a
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.GROUPING_TYPES = void 0;
            t.GROUPING_TYPES = {
                GROUP_BY_CHAMPION_ID: "groupByChampionId",
                GROUP_BY_CHAMPION_NAME_FIRST_LETTER: "groupByChampionNameFirstLetter",
                GROUP_BY_SKIN_LINE: "groupBySkinLine",
                GROUP_BY_ACQUIRE_YEAR: "groupByAcquireYear",
                GROUP_BY_RARITY: "groupByRarity",
                GROUP_BY_RELEASE_YEAR: "groupByReleaseYear",
                GROUP_BY_SKIN_NAME_FIST_LETTER: "groupBySkinNameFirstLetter",
                GROUP_BY_OWNERSHIP_OWNED_ONLY: "groupByOwnershipOwnedOnly",
                GROUP_BY_UNIVERSE: "groupByUniverse"
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.SORTING_CONFIGS = void 0;
            var i = n(16);
            const o = {
                CHAMPION_NAME_ASCENDING: {
                    groupSortingStrategy: i.GROUP_SORTING_STRATEGIES.CHAMPION_NAME_ASCENDING,
                    contentSortingStrategy: i.CONTENT_SORTING_STRATEGIES.OWNED_BASE_RARITY_RELEASE_DATE_NAME_DESCENDING
                },
                CHAMPION_MASTERY_DESCENDING: {
                    groupSortingStrategy: i.GROUP_SORTING_STRATEGIES.CHAMPION_MASTERY_DESCENDING_AND_CHAMPION_NAME_ASCENDING,
                    contentSortingStrategy: i.CONTENT_SORTING_STRATEGIES.OWNED_BASE_RARITY_RELEASE_DATE_NAME_DESCENDING
                },
                CHAMPION_GROUP_OWNED_SKIN_COUNT_DESCENDING: {
                    groupSortingStrategy: i.GROUP_SORTING_STRATEGIES.OWNED_SKIN_COUNT_DESCENDING_AND_CHAMPION_NAME_ASCENDING,
                    contentSortingStrategy: i.CONTENT_SORTING_STRATEGIES.OWNED_BASE_RARITY_RELEASE_DATE_NAME_DESCENDING
                },
                CHAMPION_GROUP_COMPLETION_PERCENTAGE_DESCENDING: {
                    groupSortingStrategy: i.GROUP_SORTING_STRATEGIES.COMPLETION_PERCENTAGE_DESCENDING_AND_CHAMPION_NAME_ASCENDING,
                    contentSortingStrategy: i.CONTENT_SORTING_STRATEGIES.OWNED_BASE_RARITY_RELEASE_DATE_NAME_DESCENDING
                },
                RARITY_ORDER_DESCENDING: {
                    groupSortingStrategy: i.GROUP_SORTING_STRATEGIES.RARITY_ORDER_DESCENDING,
                    contentSortingStrategy: i.CONTENT_SORTING_STRATEGIES.OWNED_MASTERY_RELEASE_DATE_NAME_DESCENDING
                },
                SKIN_LINE_NAME_ASCENDING: {
                    groupSortingStrategy: i.GROUP_SORTING_STRATEGIES.SKIN_LINE_NAME_ASCENDING,
                    contentSortingStrategy: i.CONTENT_SORTING_STRATEGIES.OWNED_RARITY_RELEASE_DATE_NAME_DESCENDING
                },
                SKIN_LINE_GROUP_OWNED_SKIN_COUNT_DESCENDING: {
                    groupSortingStrategy: i.GROUP_SORTING_STRATEGIES.OWNED_SKIN_COUNT_DESCENDING_AND_SKIN_LINE_NAME_ASCENDING,
                    contentSortingStrategy: i.CONTENT_SORTING_STRATEGIES.OWNED_RARITY_RELEASE_DATE_NAME_DESCENDING
                },
                SKIN_LINE_GROUP_COMPLETION_PERCENTAGE_DESCENDING: {
                    groupSortingStrategy: i.GROUP_SORTING_STRATEGIES.COMPLETION_PERCENTAGE_DESCENDING_AND_SKIN_LINE_NAME_ASCENDING,
                    contentSortingStrategy: i.CONTENT_SORTING_STRATEGIES.OWNED_RARITY_RELEASE_DATE_NAME_DESCENDING
                },
                RELEASE_YEAR_DESCENDING: {
                    groupSortingStrategy: i.GROUP_SORTING_STRATEGIES.RELEASE_YEAR_DESCENDING,
                    contentSortingStrategy: i.CONTENT_SORTING_STRATEGIES.ALL_RELEASE_DATE_DESCENDING
                },
                CHAMPION_NAME_FIRST_LETTER_ASCENDING: {
                    groupSortingStrategy: i.GROUP_SORTING_STRATEGIES.GROUP_KEY_ASCENDING,
                    contentSortingStrategy: i.CONTENT_SORTING_STRATEGIES.OWNED_CHAMPION_NAME_ASCENDING
                },
                ACQUIRE_YEAR_AND_RECENT_DATE_SORTING: {
                    groupSortingStrategy: i.NON_SORTING_STRATEGY,
                    subGroupSortingConfigs: [{
                        groupSortingStrategy: i.GROUP_SORTING_STRATEGIES.GROUP_KEY_DESCENDING,
                        contentSortingStrategy: i.CONTENT_SORTING_STRATEGIES.OWNED_PURCHASE_DATE_DESCENDING
                    }]
                },
                SKIN_NAME_FIRST_LETTER_ASCENDING: {
                    groupSortingStrategy: i.GROUP_SORTING_STRATEGIES.GROUP_KEY_ASCENDING,
                    contentSortingStrategy: i.CONTENT_SORTING_STRATEGIES.OWNED_ALPHABETICAL_ASCENDING
                },
                UNIVERSE_NAME_ASCENDING: {
                    groupSortingStrategy: i.GROUP_SORTING_STRATEGIES.UNIVERSE_NAME_ASCENDING,
                    subGroupSortingConfigs: [{
                        groupSortingStrategy: i.GROUP_SORTING_STRATEGIES.SKIN_LINE_NAME_ASCENDING,
                        contentSortingStrategy: i.CONTENT_SORTING_STRATEGIES.OWNED_RARITY_RELEASE_DATE_NAME_DESCENDING
                    }]
                }
            };
            t.SORTING_CONFIGS = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.NULL_VALUE_TRAILING = t.NULL_VALUE_LEADING = t.NON_SORTING_STRATEGY = t.GROUP_SORTING_STRATEGIES = t.DEFAULT_NULL_SORT_VALUE = t.CONTENT_SORTING_STRATEGIES = void 0, t.compareBool = r, t.compareData = s, t.compareValue = a, t.getCurrentLocale = _, t.getPropertiesSortingStrategy = c, t.smartSort = l;
            var i = n(1);
            t.NULL_VALUE_TRAILING = 1;
            t.NULL_VALUE_LEADING = -1;
            const o = 1;

            function r(e, t) {
                return e === t ? 0 : e ? -1 : 1
            }

            function s(e, t, n) {
                return i.lodash.isNumber(e) ? e - t : i.lodash.isBoolean(e) ? r(e, t) : i.lodash.isString(e) ? n.compare(e, t) : 0
            }

            function a(e, t, n, i = o, r) {
                let a;
                return e === t ? a = 0 : null == e ? a = i : null == t ? a = -i : (a = s(e, t, r), a = !1 === n ? -a : a), a
            }

            function l(e, t, n) {
                if (!e || !t) return e;
                return e.sort(((e, r) => {
                    let s = 0;
                    for (let l = 0; l < t.length; l++) {
                        const _ = t[l];
                        if (s = a(i.lodash.get(e, _.property), i.lodash.get(r, _.property), _.ascending, _.nullValue ? _.nullValue : o, n), 0 !== s) break
                    }
                    return s
                }))
            }

            function _(e) {
                return e.locale ? e.locale : "en"
            }

            function c(e) {
                return {
                    sort(t, n) {
                        const i = new Intl.Collator(_(n));
                        l(t, e, i)
                    }
                }
            }
            t.DEFAULT_NULL_SORT_VALUE = o;
            const u = {
                sort() {}
            };
            t.NON_SORTING_STRATEGY = u;
            const p = {
                CHAMPION_NAME_ASCENDING: c([{
                    property: "groupMetaData.championName",
                    ascending: !0
                }]),
                CHAMPION_MASTERY_DESCENDING_AND_CHAMPION_NAME_ASCENDING: c([{
                    property: "groupMetaData.masteryPoint",
                    ascending: !1
                }, {
                    property: "groupMetaData.championName",
                    ascending: !0
                }]),
                OWNED_SKIN_COUNT_DESCENDING_AND_CHAMPION_NAME_ASCENDING: c([{
                    property: "groupMetaData.ownedSkinCount",
                    ascending: !1
                }, {
                    property: "groupMetaData.championName",
                    ascending: !0
                }]),
                COMPLETION_PERCENTAGE_DESCENDING_AND_CHAMPION_NAME_ASCENDING: c([{
                    property: "groupMetaData.ownedSkinPercentage",
                    ascending: !1
                }, {
                    property: "groupMetaData.championName",
                    ascending: !0
                }]),
                RARITY_ORDER_DESCENDING: c([{
                    property: "groupMetaData.rarity.order",
                    ascending: !1
                }]),
                SKIN_LINE_NAME_ASCENDING: c([{
                    property: "groupMetaData.skinLine.name",
                    ascending: !0
                }]),
                OWNED_SKIN_COUNT_DESCENDING_AND_SKIN_LINE_NAME_ASCENDING: c([{
                    property: "groupMetaData.ownedSkinCount",
                    ascending: !1
                }, {
                    property: "groupMetaData.skinLine.name",
                    ascending: !0
                }]),
                COMPLETION_PERCENTAGE_DESCENDING_AND_SKIN_LINE_NAME_ASCENDING: c([{
                    property: "groupMetaData.ownedSkinPercentage",
                    ascending: !1
                }, {
                    property: "groupMetaData.skinLine.name",
                    ascending: !0
                }]),
                UNIVERSE_NAME_ASCENDING: c([{
                    property: "groupMetaData.universeName",
                    ascending: !0
                }]),
                RELEASE_YEAR_DESCENDING: c([{
                    property: "groupMetaData.releaseYear",
                    ascending: !1,
                    nullValue: 1
                }]),
                GROUP_KEY_ASCENDING: c([{
                    property: "groupKey",
                    ascending: !0,
                    nullValue: 1
                }]),
                GROUP_KEY_DESCENDING: c([{
                    property: "groupKey",
                    ascending: !1,
                    nullValue: 1
                }])
            };
            t.GROUP_SORTING_STRATEGIES = p;
            const d = {
                OWNED_RARITY_RELEASE_DATE_NAME_DESCENDING: c([{
                    property: "ownership.owned",
                    ascending: !0
                }, {
                    property: "rarity.order",
                    ascending: !1
                }, {
                    property: "releaseDate",
                    ascending: !1
                }, {
                    property: "name",
                    ascending: !0
                }]),
                OWNED_BASE_RARITY_RELEASE_DATE_NAME_DESCENDING: c([{
                    property: "ownership.owned",
                    ascending: !0
                }, {
                    property: "isBase",
                    ascending: !0
                }, {
                    property: "rarity.order",
                    ascending: !1
                }, {
                    property: "releaseDate",
                    ascending: !1
                }, {
                    property: "name",
                    ascending: !0
                }]),
                OWNED_MASTERY_RELEASE_DATE_NAME_DESCENDING: c([{
                    property: "ownership.owned",
                    ascending: !0
                }, {
                    property: "championPoints",
                    ascending: !1
                }, {
                    property: "releaseDate",
                    ascending: !1
                }, {
                    property: "name",
                    ascending: !0
                }]),
                ALL_RELEASE_DATE_DESCENDING: c([{
                    property: "ownership.owned",
                    ascending: !0
                }, {
                    property: "releaseDate",
                    ascending: !1
                }, {
                    property: "skinLines[0].id",
                    ascending: !0
                }, {
                    property: "name",
                    ascending: !0
                }]),
                OWNED_CHAMPION_NAME_ASCENDING: c([{
                    property: "ownership.owned",
                    ascending: !0
                }, {
                    property: "championName",
                    ascending: !0
                }, {
                    property: "name",
                    ascending: !0
                }]),
                OWNED_PURCHASE_DATE_DESCENDING: c([{
                    property: "ownership.owned",
                    ascending: !0
                }, {
                    property: "ownership.rental.purchaseDate",
                    ascending: !1
                }, {
                    property: "name",
                    ascending: !0
                }]),
                OWNED_ALPHABETICAL_ASCENDING: c([{
                    property: "ownership.owned",
                    ascending: !0
                }, {
                    property: "name",
                    ascending: !0
                }])
            };
            t.CONTENT_SORTING_STRATEGIES = d
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.UNOWNED_SKIN_FILTER = t.ULTIMATE_SKIN_RARITIES = t.THUMBNAIL_PER_ROW = t.TENCENT_REGION_NAME = t.SPLASH_VIDEO_CONFIG = t.SORT_ORDER = t.SKIN_WITH_SKINLINE_FILTER = t.SKIN_UNLOCK_TRANSACTION_TYPE = t.SKIN_RARITIES = t.SKIN_BORDER_RARITIES = t.SKINS_VIEWER_PAW_SOURCE = t.SKINS_VIEWER_LOC_KEY_IN_COLLECTIONS = t.SKINS_VIEWER_ASSET_BASE_PATH = t.SHOWCASE_VIEW_VIDEO_BASE_PATH = t.PARSEINT_DEFAULT_RADIX = t.OWNED_SKIN_FILTER = t.NO_SKINLINE_ID = t.GEM_BASE_PATH = t.DEFAULT_LOCALE = t.COUNTING_STEPS = t.COUNTING_INTERVAL = t.COLLECTION_VIEW_VIDEO_BASE_PATH = t.COLLECTION_GRID_WIDTH = t.COLLECTION_GRID_SEPARATOR_ROW_HEIGHTS = t.COLLECTION_GRID_ROW_TYPES = t.COLLECTION_GRID_OWNERSHIP_FILTERS = t.COLLECTION_GRID_LAST_PURCHASES_GROUP_ID = t.COLLECTION_GRID_HEIGHT = t.COLLECTION_GRID = t.CN_SKIN_RARITIES = t.CN_RARITY_TRA_KEY_PREFIX = t.CLIENT_RECT_PROPERTY = t.CANNOT_PURCHASE_REASONS = t.ALL_SKINLINE_ID = void 0, t.generateCNSkinRarityObject = d, t.generateSkinRarityObject = a, t.getCNGemIcon = c, t.getCNRarityTooltipTraKey = p, t.getCNRarityTraKey = u, t.getGemIcon = o, t.getRarityTooltipTraKey = s, t.getRarityTraKey = r;
            t.DEFAULT_LOCALE = "en";
            t.THUMBNAIL_PER_ROW = 4;
            t.NO_SKINLINE_ID = 0;
            t.ALL_SKINLINE_ID = -1;
            t.SORT_ORDER = {
                ASCENDING: "asc",
                DESCENDING: "desc"
            };
            t.COLLECTION_GRID = {};
            t.COLLECTION_GRID_OWNERSHIP_FILTERS = {
                ALL: "none",
                OWNED: "owned",
                UNOWNED: "unowned"
            };
            t.OWNED_SKIN_FILTER = e => e.ownership.owned;
            t.UNOWNED_SKIN_FILTER = e => !e.ownership.owned;
            t.SKIN_WITH_SKINLINE_FILTER = e => e.skinLineId && 0 !== e.skinLineId;
            t.COLLECTION_GRID_LAST_PURCHASES_GROUP_ID = "LAST-PURCHASES";
            const n = {
                ULTIMATE: "ultimate",
                MYTHIC: "mythic",
                LEGENDARY: "legendary",
                EPIC: "epic",
                OTHER: "other"
            };
            t.SKIN_BORDER_RARITIES = n;
            const i = "/lol-game-data/assets/v1/rarity-gem-icons";

            function o(e) {
                return `${i}/${e}.png`
            }

            function r(e) {
                return `skin_grid_rarity_${e}`
            }

            function s(e) {
                return e
            }

            function a(e, t, i = !0) {
                return {
                    order: e,
                    gemIcon: i ? o(t) : null,
                    borderRarity: n[t.toUpperCase()],
                    traKey: r(t),
                    tooltipType: i ? t : null
                }
            }
            t.GEM_BASE_PATH = i;
            const l = {
                kNoRarity: a(0, "other", !1),
                kEpic: a(1, "epic"),
                kLegendary: a(2, "legendary"),
                kMythic: a(3, "mythic"),
                kUltimate: a(4, "ultimate")
            };
            t.SKIN_RARITIES = l;
            const _ = "skin_grid_cn_rarity_";

            function c(e) {
                return `${i}/cn-gem-${e}.png`
            }

            function u(e) {
                return `${_}${e}`
            }

            function p(e) {
                return `cn_rarity_${e}`
            }

            function d(e, t, i = !0) {
                return {
                    order: e,
                    gemIcon: i ? c(e) : null,
                    borderRarity: n[t.toUpperCase()],
                    traKey: u(e),
                    tooltipType: i ? p(e) : null
                }
            }
            t.CN_RARITY_TRA_KEY_PREFIX = _;
            const g = {
                0: d(0, "other", !1),
                1: d(1, "epic"),
                2: d(2, "epic"),
                3: d(3, "epic"),
                4: d(4, "legendary"),
                5: d(5, "legendary"),
                7: d(7, "mythic"),
                8: d(8, "mythic"),
                9: d(9, "ultimate")
            };
            t.CN_SKIN_RARITIES = g;
            const E = [l.kUltimate, g[9]];
            t.ULTIMATE_SKIN_RARITIES = E;
            t.COUNTING_STEPS = 35;
            t.COUNTING_INTERVAL = 20;
            t.PARSEINT_DEFAULT_RADIX = 10;
            t.CLIENT_RECT_PROPERTY = {
                top: "top",
                bottom: "bottom",
                left: "left",
                right: "right",
                width: "width",
                height: "height"
            };
            t.CANNOT_PURCHASE_REASONS = {
                NEED_OWN_CHAMPION_FIRST: {
                    traKey: "purchase_cant_purchase_reason_need_champion"
                },
                CANNOT_PURCHASE_DIRECTLY: {
                    traKey: "purchase_cant_purchase_reason_cant_purchase_directly"
                },
                CANNOT_PURCHASE_LEGACY: {
                    traKey: "purchase_cant_purchase_reason_cant_purchase_legacy_skin"
                },
                CANNOT_GET_INFO_FROM_STORE: {
                    traKey: "purchase_cant_purchase_reason_cant_get_info_from_store"
                }
            };
            t.SKIN_UNLOCK_TRANSACTION_TYPE = {
                PURCHASE: {
                    key: "PURCHASE",
                    traKey: "purchase"
                },
                LOOT: {
                    key: "LOOT",
                    traKey: "loot"
                },
                GIFT: {
                    key: "GIFT",
                    traKey: "gift"
                },
                REWARD: {
                    key: "REWARD",
                    traKey: "reward"
                }
            };
            t.COLLECTION_GRID_WIDTH = 760;
            t.COLLECTION_GRID_HEIGHT = 478;
            t.COLLECTION_GRID_ROW_TYPES = {
                GROUP: {
                    id: "GROUP",
                    height: 38
                },
                SKINS: {
                    id: "SKINS",
                    height: 216
                },
                UNIVERSE_TITLE_ROW: {
                    id: "universeTitleRow",
                    height: 127
                },
                SEPARATOR: {
                    id: "SEPARATOR"
                }
            };
            t.COLLECTION_GRID_SEPARATOR_ROW_HEIGHTS = {
                GROUP_SEPARATOR_HEIGHT: 15,
                UNIVERSE_SEPARATOR_HEIGHT: 10,
                UNKNOWN_UNIVERSE_SEPARATOR_HEIGHT: 58
            };
            const S = "/fe/lol-skins-viewer";
            t.SKINS_VIEWER_ASSET_BASE_PATH = S;
            const I = `${S}/video/collection`;
            t.COLLECTION_VIEW_VIDEO_BASE_PATH = I;
            const N = `${S}/video/showcase`;
            t.SHOWCASE_VIEW_VIDEO_BASE_PATH = N;
            const h = {
                37006: {
                    collectionView: {
                        loopVideoPath: `${I}/37006.webm`,
                        loopVideoPosition: "height: 236px; left: 0px; top: 0px"
                    },
                    showcaseView: {
                        loopVideoPath: `${N}/37006.webm`
                    }
                },
                99007: {
                    collectionView: {
                        loopVideoPath: `${I}/99007.webm`,
                        loopVideoPosition: "height: 235px; left: 0px; top: 0px"
                    },
                    showcaseView: {
                        loopVideoPath: `${N}/99007.webm`
                    }
                },
                81005: {
                    collectionView: {
                        startVideoPath: `${I}/81005_start.webm`,
                        startVideoPosition: "height: 256px; left: -7px; top: -12px;",
                        loopVideoPath: `${I}/81005_loop.webm`,
                        loopVideoPosition: "height: 255px; left: -6px; top: -11px;"
                    },
                    showcaseView: {
                        loopVideoPath: `${N}/81005.webm`
                    }
                },
                77003: {
                    collectionView: {
                        loopVideoPath: `${I}/77003.webm`,
                        loopVideoPosition: "height: 236px; left: 0px; top: -5px"
                    },
                    showcaseView: {
                        loopVideoPath: `${N}/77003.webm`
                    }
                },
                21016: {
                    collectionView: {
                        loopVideoPath: `${I}/21016.webm`,
                        loopVideoPosition: "height: 248px; left: 0px; top: 0px"
                    },
                    showcaseView: {
                        loopVideoPath: `${N}/21016.webm`
                    }
                }
            };
            t.SPLASH_VIDEO_CONFIG = h;
            t.TENCENT_REGION_NAME = "TENCENT";
            t.SKINS_VIEWER_PAW_SOURCE = "skinsViewer";
            t.SKINS_VIEWER_LOC_KEY_IN_COLLECTIONS = "collections_sub_nav_skins_viewer"
        }, (e, t, n) => {
            const i = n(1).Ember;
            e.exports = i.HTMLBars.template({
                id: "TV036R0F",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-skins-picker\\\\src\\\\components\\\\control-panel-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-skins-picker\\\\src\\\\components\\\\control-panel-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-skins-picker\\\\src\\\\components\\\\control-panel-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","control-panel-text-filter"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-flat-input",[]],["flush-element"],["text","\\n    "],["append",["helper",["input"],null,[["type","maxlength","class","value","placeholder"],["search","50","control-panel-search-text",["get",["nameFilter"]],["get",["tra","control_panel_search_placeholder"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","lol-uikit-framed-dropdown",[]],["static-attr","class","control-panel-grouping-options"],["flush-element"],["text","\\n"],["block",["each"],[["get",["availableGroups"]]],null,1],["close-element"],["text","\\n\\n"],["open-element","lol-uikit-framed-dropdown",[]],["static-attr","class","control-panel-sort-options"],["flush-element"],["text","\\n"],["block",["each"],[["get",["availableSorts"]]],[["key"],["name"]],0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","selected",["unknown",["sort","selected"]],null],["dynamic-attr","value",["unknown",["sort","name"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"setSortOrder",["get",["sort"]]],null],null],["flush-element"],["append",["unknown",["sort","label"]],false],["close-element"],["text","\\n"]],"locals":["sort"]},{"statements":[["text","    "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"setGroupingKey",["get",["group","groupKey"]]],null],null],["dynamic-attr","selected",["unknown",["group","isSelected"]],null],["flush-element"],["append",["unknown",["group","name"]],false],["close-element"],["text","\\n"]],"locals":["group"]}],"hasPartials":false}',
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
            var i = n(1),
                o = n(21),
                r = n(17),
                s = p(n(24)),
                a = p(n(26)),
                l = p(n(28)),
                _ = p(n(29)),
                c = p(n(5)),
                u = n(6);

            function p(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            const {
                Component: d,
                get: g,
                observer: E,
                set: S
            } = i.Ember, I = "lol-collectibles-libs-virtual-list";
            var N = d.extend({
                classNames: ["skins-grid-component"],
                layout: n(30),
                style: n(31),
                onFilteredSkinsChange: E("filteredSkins", (function() {
                    const e = g(this, "filteredSkins");
                    this._refreshSkinsGroupingResult(e)
                })),
                onSkinsDataChange: E("groupsAndSkinsRows", (function() {
                    this._refreshSkinRows()
                })),
                init() {
                    this._super(...arguments), S(this, "rowRendererMap", new Map), S(this, "skinTileClickCallback", this._skinTileClickCallback.bind(this))
                },
                didInsertElement() {
                    const e = g(this, "element");
                    if (e) {
                        const t = e.querySelector(".skins-grid-content");
                        S(this, "skinGridScrollElement", t);
                        const n = this._initialiseVirtualList(t);
                        S(this, "virtualList", n), this._refreshSkinRows()
                    }
                },
                willDestroy() {
                    const e = g(this, "virtualList");
                    e && (S(this, "virtualList", null), e.destroy())
                },
                _skinTileClickCallback(e) {
                    const t = g(this, "selectedSkinId"),
                        n = g(this, "virtualList");
                    if (e && e !== t) {
                        const t = g(this, "onSkinSelected");
                        t && (t(e), S(this, "selectedSkinId", e), n.refresh()), c.default.addUserBehaviorValue(u.USER_ACTIVITIES.PREVIEW_SKIN, e), c.default.setUserBehaviorValue(u.USER_ACTIVITIES.SET_BACKGROUND_SKIN_ID, e)
                    }
                },
                _refreshSkinsGroupingResult(e) {
                    const t = (0, o.generateRowDataFromGroupingResult)(e, g(this, "tra"));
                    S(this, "groupsAndSkinsRows", t)
                },
                _refreshSkinRows() {
                    const e = g(this, "groupsAndSkinsRows"),
                        t = g(this, "virtualList");
                    e && t && (this._scrollToTop(), t.data = e)
                },
                _scrollToTop() {
                    const e = g(this, "skinGridScrollElement");
                    e && (e.scrollTop = 0)
                },
                _initialiseVirtualList(e) {
                    let t = e.querySelector(I);
                    return t || (t = document.createElement(I), t.container = e, t.containerHeightPx = r.COLLECTION_GRID_HEIGHT, t.createElement = this._createRow.bind(this), t.updateElement = this._updateRow.bind(this), t.resetElement = this._resetRow.bind(this), t.deleteElement = this._deleteRow.bind(this), e.appendChild(t)), t
                },
                _createRow(e) {
                    return this._getRowRenderer(e.type).createRow(e)
                },
                _updateRow(e, t) {
                    this._getRowRenderer(t.type).updateRow(t, e)
                },
                _resetRow(e, t) {
                    this._getRowRenderer(t.type).resetRow(e)
                },
                _deleteRow(e, t) {
                    this._getRowRenderer(t).deleteRow(e)
                },
                _getRowRenderer(e) {
                    const t = g(this, "rowRendererMap");
                    if (!t.has(e)) {
                        const n = this._createRowRenderer(e);
                        t.set(e, n)
                    }
                    return t.get(e)
                },
                _createRowRenderer(e) {
                    switch (e) {
                        case r.COLLECTION_GRID_ROW_TYPES.GROUP.id:
                            return new s.default(this);
                        case r.COLLECTION_GRID_ROW_TYPES.SKINS.id:
                            return new a.default(this);
                        case r.COLLECTION_GRID_ROW_TYPES.UNIVERSE_TITLE_ROW.id:
                            return new l.default;
                        case r.COLLECTION_GRID_ROW_TYPES.SEPARATOR.id:
                            return new _.default;
                        default:
                            throw new Error(`No row renderer registered for row type ${e}`)
                    }
                }
            });
            t.default = N
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t._generateGroupTitleObject = p, t._generateGroupTitleRowData = d, t._generateSkinThumbnailRows = g, t.generateRowDataFromGroupingResult = I;
            var i, o = n(14),
                r = n(17),
                s = n(22),
                a = (i = n(23)) && i.__esModule ? i : {
                    default: i
                };
            const l = {
                groupTitle: "",
                groupSubtitle: "",
                ownedSkinCount: 0,
                totalSkinCount: 0,
                showCompleteSet: !1,
                completeSetIcon: null,
                groupingType: null,
                originGroupId: null,
                isSubGroup: !1
            };

            function _(e) {
                return null == e
            }
            const c = new a.default({
                    type: r.COLLECTION_GRID_ROW_TYPES.SEPARATOR.id,
                    height: r.COLLECTION_GRID_SEPARATOR_ROW_HEIGHTS.GROUP_SEPARATOR_HEIGHT,
                    data: {
                        separatorClass: "group-separator"
                    }
                }),
                u = new a.default({
                    type: r.COLLECTION_GRID_ROW_TYPES.SEPARATOR.id,
                    height: r.COLLECTION_GRID_SEPARATOR_ROW_HEIGHTS.UNIVERSE_SEPARATOR_HEIGHT,
                    data: {
                        separatorClass: "universe-separator"
                    }
                });

            function p(e) {
                return Object.assign({}, l, e)
            }

            function d(e, t, n) {
                if (!e) throw new Error(`groupTitleObject is null for group node ${t}`);
                let i = [];
                if (t.subGroups.length > 0 ? t.subGroups.forEach((e => i = i.concat(I(e, n)))) : i = i.concat(g(t.filteredGroupMembers)), i.length > 0) {
                    const n = new a.default({
                        type: r.COLLECTION_GRID_ROW_TYPES.GROUP.id,
                        height: r.COLLECTION_GRID_ROW_TYPES.GROUP.height,
                        data: e,
                        groupingType: t.groupingType,
                        groupId: t.groupMetaData.groupId
                    });
                    i.unshift(n), i.push(c)
                }
                return i
            }

            function g(e) {
                const t = [],
                    n = Array.from(e);
                for (; n.length;) t.push(new a.default({
                    data: n.splice(0, r.THUMBNAIL_PER_ROW),
                    height: r.COLLECTION_GRID_ROW_TYPES.SKINS.height,
                    type: r.COLLECTION_GRID_ROW_TYPES.SKINS.id,
                    groupingType: null,
                    groupId: null
                }));
                return t
            }

            function E(e, t) {
                let n = [];
                return e.subGroups.forEach((e => {
                    n = n.concat(I(e, t))
                })), n
            }
            const S = new Map;

            function I(e, t) {
                let n = [];
                return e.groupNodes.forEach((e => {
                    if (e.filteredGroupMembers && e.filteredGroupMembers.length > 0) {
                        const i = function(e, t) {
                            const n = S.get(e.groupingType);
                            if (!n) throw new Error(`No row generator registered for grouping type ${e.groupingType}`);
                            return n(e, t)
                        }(e, t);
                        i && (n = n.concat(i))
                    }
                })), n
            }
            S.set(s.EMPTY_GROUPING_TYPE, E), S.set(o.GROUPING_TYPES.GROUP_BY_OWNERSHIP_OWNED_ONLY, E), S.set(o.GROUPING_TYPES.GROUP_BY_RECENT_ACQUIRE, (function(e, t) {
                const n = p({
                    groupTitle: t.get("skin_grid_purchase_year_most_recent")
                });
                return e.filteredGroupMembers = e.filteredGroupMembers.slice(0, 10), d(n, e, t)
            })), S.set(o.GROUPING_TYPES.GROUP_BY_ACQUIRE_YEAR, (function(e, t) {
                const {
                    acquireYear: n
                } = e.groupMetaData;
                return d(p({
                    groupTitle: _(n) ? t.get("skin_grid_acquire_year_none") : `${t.get("skin_grid_acquire_year_header")} ${n}`
                }), e, t)
            })), S.set(o.GROUPING_TYPES.GROUP_BY_RELEASE_YEAR, (function(e, t) {
                const {
                    releaseYear: n
                } = e.groupMetaData;
                return d(p({
                    groupTitle: _(n) ? t.get("skin_grid_acquire_year_none") : `${t.get("skin_grid_acquire_year_header")} ${n}`
                }), e, t)
            })), S.set(o.GROUPING_TYPES.GROUP_BY_SKIN_NAME_FIST_LETTER, (function(e, t) {
                const {
                    skinNameFirstLetter: n
                } = e.groupMetaData;
                return d(p({
                    groupTitle: n
                }), e, t)
            })), S.set(o.GROUPING_TYPES.GROUP_BY_CHAMPION_ID, (function(e, t) {
                const n = e.groupMetaData;
                return d(p({
                    groupTitle: n.championName,
                    groupSubtitle: `${n.ownedSkinCount} / ${n.totalSkinCount}`,
                    ownedSkinCount: n.ownedSkinCount,
                    totalSkinCount: n.totalSkinCount,
                    showCompleteSet: !0,
                    completeSetIcon: "/fe/lol-skins-viewer/images/control-pane/icon-champion.png",
                    groupingType: e.groupingType,
                    originGroupId: n.championId
                }), e, t)
            })), S.set(o.GROUPING_TYPES.GROUP_BY_CHAMPION_NAME_FIRST_LETTER, (function(e, t) {
                return d(p({
                    groupTitle: e.groupMetaData.championNameFirstLetter
                }), e, t)
            })), S.set(o.GROUPING_TYPES.GROUP_BY_RARITY, (function(e, t) {
                const n = e.groupMetaData;
                return d(p({
                    groupTitle: _(n.rarity) ? t.get("skin_grid_rarity_none") : t.get(n.rarity.traKey),
                    groupSubtitle: `${n.ownedSkinCount} / ${n.totalSkinCount}`,
                    ownedSkinCount: n.ownedSkinCount,
                    totalSkinCount: n.totalSkinCount
                }), e, t)
            })), S.set(o.GROUPING_TYPES.GROUP_BY_SKIN_LINE, (function(e, t) {
                const n = e.groupMetaData;
                return d(p({
                    groupTitle: n.skinLine.name,
                    groupSubtitle: `${n.ownedSkinCount} / ${n.totalSkinCount}`,
                    ownedSkinCount: n.ownedSkinCount,
                    totalSkinCount: n.totalSkinCount,
                    showCompleteSet: !0,
                    completeSetIcon: "/fe/lol-skins-viewer/images/control-pane/icon-skin.png",
                    groupingType: e.groupingType,
                    originGroupId: n.skinLine.id
                }), e, t)
            })), S.set(o.GROUPING_TYPES.GROUP_BY_UNIVERSE, (function(e) {
                const t = e.groupMetaData,
                    {
                        universeInfo: n
                    } = t;
                let i = [];
                if (e.subGroups.forEach((t => {
                        t.groupNodes.forEach((t => {
                            if (t.filteredGroupMembers.length > 0) {
                                const o = g(t.filteredGroupMembers),
                                    s = t.groupMetaData,
                                    l = p({
                                        groupTitle: s.skinLine.name,
                                        groupSubtitle: `${s.ownedSkinCount} / ${s.totalSkinCount}`,
                                        ownedSkinCount: s.ownedSkinCount,
                                        totalSkinCount: s.totalSkinCount,
                                        showCompleteSet: !0,
                                        completeSetIcon: "/fe/lol-skins-viewer/images/control-pane/icon-skin.png",
                                        groupingType: e.groupingType,
                                        originGroupId: s.skinLine.id,
                                        isSubGroup: !0,
                                        universeInfo: n
                                    }),
                                    _ = new a.default({
                                        type: r.COLLECTION_GRID_ROW_TYPES.GROUP.id,
                                        height: r.COLLECTION_GRID_ROW_TYPES.GROUP.height,
                                        data: l,
                                        groupingType: t.groupingType,
                                        groupId: t.groupMetaData.groupId
                                    });
                                o.unshift(_), i = i.concat(o)
                            }
                        }))
                    })), i.length > 0) {
                    if (n) {
                        const o = new a.default({
                            type: r.COLLECTION_GRID_ROW_TYPES.UNIVERSE_TITLE_ROW.id,
                            height: r.COLLECTION_GRID_ROW_TYPES.UNIVERSE_TITLE_ROW.height,
                            data: n,
                            groupingType: e.groupingType,
                            groupId: t.groupId
                        });
                        i.unshift(o)
                    } else {
                        const e = new a.default({
                            type: r.COLLECTION_GRID_ROW_TYPES.SEPARATOR.id,
                            height: r.COLLECTION_GRID_SEPARATOR_ROW_HEIGHTS.UNKNOWN_UNIVERSE_SEPARATOR_HEIGHT,
                            data: {
                                separatorClass: "non-universe-separator"
                            }
                        });
                        i.unshift(e)
                    }
                    i.push(u)
                }
                return i
            }))
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.GroupingResult = t.GroupNode = t.EMPTY_GROUPING_TYPE = t.EMPTY_GROUPING_STRATEGY = void 0, t.group = function e(t, n, s) {
                if (!t) throw new Error("Grouping configuration should not be null");
                if (!n || !Array.isArray(n)) throw new Error("Data for grouping must be an array.");
                const a = function(e, t, n) {
                    if (!e) throw new Error("Grouping strategy is null.");
                    if (!e.groupingType || !e.getGroupKeys || !e.getGroupMetaData) throw new Error(`Invalid grouping strategy. Grouping strategy needs to have valid groupType, getGroupKeys method and getGroupMetaData method. Group type: ${e.groupingType}, getGroupKeys: ${e.getGroupKeys} and getGroupMetaData: ${e.getGroupMetaData}`);
                    const {
                        groupingType: s
                    } = e, a = new r(s);
                    if (e === i) a.appendGroupNode(new o(s, 1, {}, t));
                    else {
                        const i = new Map;
                        t.forEach((t => {
                            const o = e.getGroupKeys(t, n);
                            o && Array.isArray(o) && o.forEach((e => {
                                if (i.has(e)) i.get(e).push(t);
                                else {
                                    const n = [t];
                                    i.set(e, n)
                                }
                            }))
                        })), i.forEach(((t, i) => {
                            const r = e.getGroupMetaData(i, t, n);
                            a.appendGroupNode(new o(s, i, r, t))
                        }))
                    }
                    return a
                }(t.groupingStrategy, n, s);
                t.subGroupingConfigs && Array.isArray(t.subGroupingConfigs) && a.groupNodes.forEach((n => {
                    t.subGroupingConfigs.forEach((t => {
                        n.subGroups.push(e(t, n.groupMembers, s))
                    }))
                }));
                return a
            }, t.sortGroupResult = function e(t, n, i) {
                if (!t) throw new Error("Sorting configuration could not be null.");
                if (!n) throw new Error("Grouping result is null.");
                t.groupSortingStrategy.sort(n.groupNodes, i), n.groupNodes.forEach((n => {
                    if (n.subGroups && n.subGroups.length > 0) n.subGroups.forEach(((o, r) => {
                        if (r >= t.subGroupSortingConfigs.length) throw new Error(`No sub group sorting strategy for group with type ${n.groupingType}. Sub group index ${r}`);
                        e(t.subGroupSortingConfigs[r], o, i)
                    }));
                    else {
                        if (!t.contentSortingStrategy) throw new Error(`No content sorting strategy for group with type ${n.groupingType} and key ${n.groupKey}`);
                        t.contentSortingStrategy.sort(n.groupMembers, i)
                    }
                }))
            };
            const n = "NONE_GROUPING";
            t.EMPTY_GROUPING_TYPE = n;
            const i = {
                groupingType: n,
                getGroupKeys: () => [1],
                getGroupMetaData: () => ({})
            };
            t.EMPTY_GROUPING_STRATEGY = i;
            class o {
                constructor(e, t, n, i) {
                    this.groupingType = e, this.groupKey = t, this.groupMetaData = n, this.groupMembers = i, this.subGroups = []
                }
                get filteredGroupMembers() {
                    return this._filteredGroupMembers ? this._filteredGroupMembers : this.groupMembers
                }
                set filteredGroupMembers(e) {
                    if (!e || !Array.isArray(e)) throw new Error(`FilteredGroupMembers must be an array. Get ${e}`);
                    this._filteredGroupMembers = e
                }
            }
            t.GroupNode = o;
            class r {
                constructor(e) {
                    this.groupingType = e, this.groupNodes = []
                }
                appendGroupNode(e) {
                    this.groupNodes.push(e)
                }
            }
            t.GroupingResult = r
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = class {
                constructor(e) {
                    const {
                        type: t,
                        height: n,
                        data: i,
                        groupingType: o,
                        groupId: r
                    } = e;
                    if (!t || !Number.isFinite(n) || !i) throw new Error(`Grid row data must contains valid type, valid float height and no null data. Get type: ${t}, height ${n} and data ${i}`);
                    this.type = t, this.height = n, this.data = i, this.groupingType = o, this.groupId = r
                }
            };
            t.default = n
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var i, o = n(1),
                r = (i = n(25)) && i.__esModule ? i : {
                    default: i
                };
            const {
                getWithDefault: s
            } = o.Ember;
            class a extends r.default {
                constructor(e) {
                    super(), this._renderContext = e
                }
                setRenderContext(e) {
                    this._renderContext = e
                }
                createRow(e) {
                    const t = e.data,
                        n = document.createElement("div");
                    n.style.position = "absolute", n.dataset.groupId = t.groupId;
                    const i = document.createElement("div");
                    i.classList.add("group-title-wrapper");
                    const o = this._createGroupTitleElement(t);
                    return i.appendChild(o), n.appendChild(i), n
                }
                updateRow(e, t) {
                    const n = t.children[0],
                        i = e.data,
                        o = t.querySelector(".group-title-wrapper");
                    i.isSubGroup ? o.classList.add("subtitle") : o.classList.remove("subtitle");
                    const r = n.querySelector(".group-title");
                    r && (r.textContent = i.groupTitle);
                    const s = n.querySelector(".group-subtitle");
                    s && (s.textContent = i.groupSubtitle)
                }
                _isLowSpecModeEnabled() {
                    return s(this._renderContext, "isPotatoModeEnabled", !1)
                }
                _createGroupTitleElement(e) {
                    const t = document.createElement("div");
                    return t.classList.add("group-title"), t.textContent = e.groupTitle, t
                }
            }
            var l = a;
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            n(1);
            var i = class {
                createRow() {}
                updateRow() {}
                deleteRow() {}
                resetRow() {}
                setRenderContext() {}
            };
            t.default = i
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var i = n(1),
                o = n(17),
                r = n(27);
            const {
                get: s,
                getWithDefault: a
            } = i.Ember;
            var l = class {
                constructor(e) {
                    this._renderContext = e, this._skinTileClickHandler = this._onSkinTileClick.bind(this), this._skinTileHoverHandler = this._onMouseEnter.bind(this)
                }
                setRenderContext(e) {
                    this._renderContext = e
                }
                createRow(e) {
                    const t = document.createElement("div");
                    return t.style.position = "absolute", e.data.forEach(((e, n) => {
                        const i = this._createSkinTile(e);
                        t.appendChild(i)
                    })), t
                }
                updateRow(e, t) {
                    this._balancingTileCount(e, t);
                    Array.from(t.children).forEach(((t, n) => {
                        this._updateSkinTile(t, e.data[n])
                    }))
                }
                deleteRow(e) {
                    Array.from(e.children).forEach((e => {
                        this._removeSkinTileListener(e)
                    }))
                }
                resetRow(e) {
                    Array.from(e.children).forEach((e => {
                        this._resetSkinTile(e)
                    }))
                }
                _isLowSpecModeEnabled() {
                    return a(this._renderContext, "isPotatoModeEnabled", !1)
                }
                _getMaxRowWidth() {
                    return a(this._renderContext, "maxRowWidth", o.COLLECTION_GRID_WIDTH)
                }
                _getNumThumbnailPerRow() {
                    return a(this._renderContext, "numThumbnailPerRow", o.THUMBNAIL_PER_ROW)
                }
                _getThumbnailClickCallback() {
                    return s(this._renderContext, "skinTileClickCallback")
                }
                _getTileOffsetX(e) {
                    return this._getMaxRowWidth() / this._getNumThumbnailPerRow() * e
                }
                _balancingTileCount(e, t) {
                    const n = e.data;
                    if (n.length < t.children.length)
                        for (; n.length < t.children.length;) this._removeSkinTileListener(t.children[n.length]), t.removeChild(t.children[n.length]);
                    else if (n.length > t.children.length)
                        for (let e = t.children.length; n.length > e; e++) t.appendChild(this._createSkinTile(n[e]))
                }
                _createSkinTile(e) {
                    const t = document.createElement("div");
                    t.classList.add("single-skin-wrapper"), t.dataset.skinId = e.id;
                    const n = document.createElement("div");
                    n.classList.add("skin-tile");
                    n.appendChild(document.createElement("img")).classList.add("tile-image"), n.dataset.skinId = e.id, n.addEventListener("click", this._skinTileClickHandler), n.addEventListener("mouseenter", this._skinTileHoverHandler), t.appendChild(n);
                    const i = document.createElement("div");
                    i.classList.add("tile-name");
                    const o = document.createElement("div");
                    return o.classList.add("tile-label"), o.textContent = e.name, i.appendChild(o), n.appendChild(i), t
                }
                _updateSkinTile(e, t) {
                    const n = e.querySelector(".skin-tile");
                    n.dataset.skinId = t.id, t.id === this._renderContext.get("selectedSkinId") ? n.classList.add("selected") : n.classList.remove("selected");
                    n.querySelector("img").setAttribute("src", t.tilePath), e.dataset.skinId = t.id;
                    n.querySelector(".tile-label").textContent = t.name
                }
                _resetSkinTile(e) {
                    const t = e.querySelector(".skin-tile");
                    t.classList.remove("selected");
                    t.querySelector(".tile-image").setAttribute("src", "");
                    t.querySelector(".tile-label").textContent = ""
                }
                _onSkinTileClick(e) {
                    const t = e.currentTarget;
                    this._getThumbnailClickCallback() && this._getThumbnailClickCallback()(parseInt(t.dataset.skinId, o.PARSEINT_DEFAULT_RADIX)), r.SFX.skinTileSelectSound.play()
                }
                _onMouseEnter() {
                    r.SFX.gridHover.play()
                }
                _removeSkinTileListener(e) {
                    const t = e.querySelector(".skin-tile");
                    t && (t.removeEventListener("click", this._skinTileClickHandler), t.removeEventListener("mouseenter", this._skinTileHoverHandler))
                }
            };
            t.default = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.SFX = void 0;
            const i = n(1).AudioPlugin.getChannel("sfx-ui");

            function o(e) {
                return i.createSound(e, {
                    allowConcurrency: !1
                })
            }
            const r = {
                gridHover: o("/fe/lol-skins-picker/audio/sfx-uikit-grid-hover.ogg"),
                skinTileSelectSound: o("/fe/lol-skins-picker/audio/sfx-skin-tile-select.ogg")
            };
            t.SFX = r
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            n(1);
            var i, o = (i = n(25)) && i.__esModule ? i : {
                default: i
            };
            class r extends o.default {
                createRow() {
                    const e = document.createElement("div");
                    e.style.position = "absolute";
                    const t = document.createElement("div");
                    t.classList.add("universe-title-wrapper");
                    const n = document.createElement("div");
                    n.classList.add("universe-background"), t.appendChild(n);
                    const i = document.createElement("div");
                    i.classList.add("universe-title"), i.appendChild(this._createArrowIcon()), i.appendChild(document.createElement("span")), i.appendChild(this._createArrowIcon()), t.appendChild(i);
                    const o = this._createSubtitleElement();
                    return t.appendChild(o), e.appendChild(t), e
                }
                updateRow(e, t) {
                    const n = e.data;
                    t.querySelector(".universe-title span").textContent = n ? n.name : "";
                    t.querySelector(".universe-subtitle").textContent = n ? n.description : "";
                    t.querySelector(".universe-background").style.backgroundImage = n && n.imagePath ? `url(${n.imagePath})` : "none"
                }
                _createArrowIcon() {
                    const e = document.createElement("img");
                    return e.classList.add("icon"), e.src = "/fe/lol-skins-viewer/images/universe/arrow-slider.png", e
                }
                _createSubtitleElement() {
                    const e = document.createElement("div");
                    e.classList.add("universe-subtitle-wrapper");
                    const t = document.createElement("div");
                    return t.classList.add("universe-subtitle"), e.appendChild(t), e
                }
            }
            var s = r;
            t.default = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            n(1);
            var i, o = (i = n(25)) && i.__esModule ? i : {
                default: i
            };
            class r extends o.default {
                createRow() {
                    const e = document.createElement("div");
                    e.style.position = "absolute";
                    const t = document.createElement("div");
                    return t.classList.add("separator-div"), e.appendChild(t), e
                }
                updateRow(e, t) {
                    const n = e.data.separatorClass,
                        i = t.querySelector(".separator-div");
                    i && !i.classList.contains(n) && (i.className = "", i.classList.add("separator-div", n))
                }
            }
            var s = r;
            t.default = s
        }, (e, t, n) => {
            const i = n(1).Ember;
            e.exports = i.HTMLBars.template({
                id: "U8U09PpT",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-skins-picker\\\\src\\\\components\\\\skins-grid-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-skins-picker\\\\src\\\\components\\\\skins-grid-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_22\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-skins-picker\\\\src\\\\components\\\\skins-grid-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","class","skins-grid-content"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
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
            var i = n(1),
                o = n(17),
                r = n(33),
                s = p(n(34)),
                a = function(e, t) {
                    if (!t && e && e.__esModule) return e;
                    if (null === e || "object" != typeof e && "function" != typeof e) return {
                        default: e
                    };
                    var n = u(t);
                    if (n && n.has(e)) return n.get(e);
                    var i = {},
                        o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                    for (var r in e)
                        if ("default" !== r && Object.prototype.hasOwnProperty.call(e, r)) {
                            var s = o ? Object.getOwnPropertyDescriptor(e, r) : null;
                            s && (s.get || s.set) ? Object.defineProperty(i, r, s) : i[r] = e[r]
                        } i.default = e, n && n.set(e, i);
                    return i
                }(n(35)),
                l = p(n(37)),
                _ = n(22),
                c = n(11);

            function u(e) {
                if ("function" != typeof WeakMap) return null;
                var t = new WeakMap,
                    n = new WeakMap;
                return (u = function(e) {
                    return e ? n : t
                })(e)
            }

            function p(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            const d = i.DataBinding.bindTo((0, i.getProvider)().getSocket()),
                g = i.Ember.A,
                {
                    computed: E,
                    Service: S,
                    isArray: I,
                    get: N,
                    set: h,
                    run: R
                } = i.Ember;
            var T = S.extend(s.default, {
                isLoading: !0,
                groupingSortingState: l.default.create(),
                allStoreSkins: null,
                isPotatoModeEnabled: E.bool("userExperience.data.potatoModeEnabled"),
                disableAllTelemetry: E.bool("jmxSettings.SkinsViewer.DisableAllTelemetry"),
                showLegacyInfo: E.not("isTencentRegion"),
                currentRegion: E.alias("locale.region"),
                isTencentRegion: E("currentRegion", (function() {
                    const e = N(this, "currentRegion");
                    return !!e && e.toUpperCase() === o.TENCENT_REGION_NAME
                })),
                skinRarities: E("isTencentRegion", (function() {
                    return N(this, "isTencentRegion") ? o.CN_SKIN_RARITIES : o.SKIN_RARITIES
                })),
                platformSettings: E("disableAllTelemetry", (function() {
                    return {
                        disableAllTelemetry: N(this, "disableAllTelemetry")
                    }
                })),
                init() {
                    this._super(...arguments), this._initFilters(), this._setDefaultGrouping(), h(this, "purchasedSkins", g()), h(this, "champions", g()), this._initSkinSearch(), d.addObserver("/lol-game-data/assets/v1/champion-summary.json", this, this._updateChampionsData)
                },
                skinFilter: E("nameFilter", "unownedFilter", "groupingConfig", (function() {
                    const e = [],
                        t = N(this, "nameFilter");
                    if (t && t.length > 0) {
                        const n = N(this, "skinSearchTermManager");
                        e.push((0, a.getSkinNameFilter)(t, n, N(this, "currentLocale")))
                    }
                    const n = N(this, "groupingConfig"),
                        i = N(this, "unownedFilter");
                    return i === o.COLLECTION_GRID_OWNERSHIP_FILTERS.OWNED ? e.push(o.OWNED_SKIN_FILTER) : i === o.COLLECTION_GRID_OWNERSHIP_FILTERS.UNOWNED && e.push(o.UNOWNED_SKIN_FILTER), n.filters && e.push(...n.filters), new a.SkinFilter(e)
                })),
                currentLocale: E("tra.metadata.locale.id", (function() {
                    const e = this.get("tra.metadata.locale.id"),
                        t = e ? e.substr(0, 2).toLowerCase() : "en",
                        n = "cs" === t ? "en" : t;
                    this.get("skinSearch").locale = n;
                    const i = this.get("skinSearchTermManager");
                    return i && i.setLocale(n), n
                })),
                playerSkinInfo: E("playerChampionFullInfo", (function() {
                    const e = [],
                        t = this.get("playerChampionFullInfo");
                    return t && t.forEach((t => {
                        t.skins.forEach((n => {
                            n.champOwnership = t.ownership, n.championId = t.id, n.questSkinInfo && n.questSkinInfo.tiers.forEach((i => {
                                n.id !== i.id && (i.champOwnership = t.ownership, i.championId = t.id, e.push(i))
                            })), e.push(n)
                        }))
                    })), e
                })),
                skinData: E("playerSkinInfo", "playerChampionInfo", "skinsGameData", "championsById", "allStoreSkins", (function() {
                    const e = this.get("playerSkinInfo"),
                        t = this.get("playerChampionInfo"),
                        n = this.get("championsById"),
                        i = this.get("skinsGameData");
                    let o = [];
                    const s = {
                        playerSkinInfo: e,
                        skinsGameData: i,
                        playerChampionInfo: t,
                        championsById: n
                    };
                    if (this._dataInitReady(s)) {
                        const s = N(this, "isTencentRegion");
                        o = e.map((0, r.addSkinStaticData)({
                            playerChampionInfo: t,
                            skinsGameData: i,
                            championsById: n,
                            isTencentRegion: s
                        })), this._handleDataReady(o)
                    }
                    return o
                })),
                championsById: E("champions", "playerChampionMastery", (function() {
                    const e = this.get("champions"),
                        t = this.get("playerChampionMastery");
                    if (I(e) && I(t)) {
                        const n = i.lodash.keyBy(t, "championId");
                        return e.reduce(((e, t) => {
                            const o = i.lodash.assign({}, t, n[t.id]);
                            return o.championPoints || (o.championPoints = 0), delete o.championId, e[o.id] = o, e
                        }), {})
                    }
                    return {}
                })),
                skinsById: E("skinData", (function() {
                    const e = this.get("skinData");
                    if (I(e)) {
                        return i.lodash.keyBy(e, "id")
                    }
                    return {}
                })),
                skinlines: E("skinData", "skinlinesInfo", (function() {
                    const e = this.get("skinData"),
                        t = this.get("skinlinesInfo");
                    if (!e || !t) return null;
                    this._assignSkinsToSkinLine(e, t);
                    const n = t.filter((e => e.id !== o.NO_SKINLINE_ID));
                    return n.sort(((e, t) => e.name.localeCompare(t.name))), n
                })),
                skinLinesById: E("skinlines", (function() {
                    const e = this.get("skinlines");
                    return i.lodash.keyBy(e, "id")
                })),
                universeBySkinlineId: E("skinUniverseInfo", (function() {
                    const e = N(this, "skinUniverseInfo"),
                        t = new Map;
                    return e && e.forEach((e => {
                        e.skinSets && e.skinSets.forEach((n => {
                            t.has(n) ? i.logger.error(`Ignoring linking skinline ${n} to universe ${t.get(n)}.It's been already linked to universe (${e.id}).`) : t.set(n, e)
                        }))
                    })), t
                })),
                groupedSkins: E("groupingConfig", "skinData", "championsById", "skinLinesById", "currentLocale", (function() {
                    const e = N(this, "groupingConfig"),
                        t = N(this, "skinData"),
                        n = N(this, "championsById"),
                        i = N(this, "skinLinesById"),
                        o = N(this, "currentLocale"),
                        r = N(this, "universeBySkinlineId");
                    return (0, _.group)(e, t, {
                        championsById: n,
                        skinLinesById: i,
                        locale: o,
                        universeBySkinlineId: r
                    })
                })),
                sortedSkins: E("sortingConfig", "groupedSkins", (function() {
                    const e = N(this, "sortingConfig"),
                        t = N(this, "groupedSkins"),
                        n = N(this, "currentLocale");
                    return (0, _.sortGroupResult)(e, t, {
                        locale: n
                    }), t
                })),
                filteredSkins: E("skinFilter", "sortedSkins", (function() {
                    const e = N(this, "sortedSkins"),
                        t = N(this, "skinFilter");
                    return this._filterGroupingResult(e, t), i.Ember.Object.create(e)
                })),
                willDestroy() {
                    d.unobserve("/lol-game-data/assets/v1/champion-summary.json", this), this._super(...arguments)
                },
                setNameFilter(e) {
                    this.get("nameFilter") !== e && h(this, "nameFilter", e)
                },
                setGroupingAndSorting(e, t) {
                    this._updateGroupingAndSortingConfig(e, t)
                },
                actions: {},
                _initFilters() {
                    h(this, "nameFilter", ""), h(this, "skinLineId", void 0), h(this, "chromaFilter", !1), h(this, "legacyFilter", !1), h(this, "showBaseSkin", !1), h(this, "unownedFilter", o.COLLECTION_GRID_OWNERSHIP_FILTERS.OWNED)
                },
                _setUnownedFilter(e, t = !0) {
                    this.get("unownedFilter") !== e && h(this, "unownedFilter", e)
                },
                _getAllSkinsInGroupResult(e, t, n) {
                    e.groupNodes.forEach((e => this._getAllSkinsInGroupNode(e, t, n)))
                },
                _getAllSkinsInGroupNode(e, t, n) {
                    e.subGroups.length > 0 ? e.subGroups.forEach((e => this._getAllSkinsInGroupResult(e, t, n))) : e.filteredGroupMembers.forEach((e => {
                        n.has(e.id) || (n.add(e.id), t.push(e))
                    }))
                },
                _updateControlPanelGroupingAndSortingOption(e, t, n = !0) {
                    h(this, "groupingSortingState.grouping", e), h(this, "groupingSortingState.groupSortOrder", t.name), this._updateGroupingAndSortingConfig(t.groupingConfig, t.sortingConfig, n)
                },
                _updateGroupingAndSortingConfig(e, t, n = !0) {
                    N(this, "groupingConfig") !== e && this._setUnownedFilter(e.ownershipFilter, n), h(this, "groupingConfig", e), h(this, "sortingConfig", t)
                },
                _filterGroupingResult(e, t) {
                    e.groupNodes.forEach((e => {
                        this._filterGroupNode(e, t)
                    }))
                },
                _filterGroupNode(e, t) {
                    e.filteredGroupMembers = t.filterSkins(e.groupMembers), e.subGroups.forEach((e => {
                        this._filterGroupingResult(e, t)
                    }))
                },
                _setDefaultGrouping() {
                    this._updateControlPanelGroupingAndSortingOption(c.DEFAULT_CONTROL_PANEL_DROPDOWN_OPTION, c.DEFAULT_CONTROL_PANEL_SORTING, !1)
                },
                _initSkinSearch() {
                    const e = N(this, "tra"),
                        t = new a.default;
                    t.tra = e, h(this, "skinSearch", t);
                    const n = new a.SkinSearchTermManager(e);
                    h(this, "skinSearchTermManager", n)
                },
                _handleDataReady(e) {
                    h(this, "isLoading", !1)
                },
                _assignSkinsToSkinLine(e, t) {
                    const n = i.lodash.keyBy(t, "id");
                    for (const t in e)
                        if (e.hasOwnProperty(t)) {
                            const i = e[t];
                            i.skinLines && i.skinLines.forEach((e => {
                                const t = n[e.id];
                                let o = t.skins;
                                void 0 === o && (o = [], t.skins = o), o.find((e => e.id === i.id)) || o.push(i)
                            }))
                        }
                },
                _dataInitReady(e) {
                    const t = [e.playerSkinInfo, e.playerChampionInfo],
                        n = [e.skinsGameData, e.championsById];
                    return t.every((e => Array.isArray(e) && e.length > 0)) && n.every((e => e))
                },
                _updateChampionsData(e) {
                    h(this, "champions", e)
                }
            });
            t.default = T
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.addUsageData = t.addSkinlineData = t.addSkinStaticData = t.addReleaseData = t.addPurchaseData = t.addProvenanceData = t.addOwnershipForBaseSkin = t.addMasteryData = t.addLootableProperty = void 0, t.getSkinRarity = c;
            var i = n(1),
                o = n(17);
            const {
                set: r,
                get: s
            } = i.Ember, a = function(e) {
                e.skinLineId = o.NO_SKINLINE_ID, e.skinLines && (e.skinLineId = e.skinLines[0].id)
            };
            t.addSkinlineData = a;
            t.addUsageData = function(e) {
                e.usage = Math.floor(e.id / 100)
            };
            t.addPurchaseData = function(e, t) {
                if (i.lodash.keyBy(t, "id")[e.id] && s(e, "ownership") && !s(e, "ownership.owned") && (r(e, "ownership.owned", !0), r(e, "ownership.rental.purchaseDate", Date.now())), s(e, "ownership.rental"))
                    if (e.ownership.rental.purchaseDate > 0) {
                        const t = new Date(e.ownership.rental.purchaseDate);
                        e.ownership.rental.purchaseYear = t.getFullYear()
                    } else e.ownership.rental.purchaseYear = 0
            };
            t.addProvenanceData = function(e) {
                e.ownership && e.ownership.owned && (e.id === parseInt(`${e.championId}002`) ? e.transactionType = o.SKIN_UNLOCK_TRANSACTION_TYPE.GIFT : e.id === parseInt(`${e.championId}003`) ? e.transactionType = o.SKIN_UNLOCK_TRANSACTION_TYPE.LOOT : e.transactionType = o.SKIN_UNLOCK_TRANSACTION_TYPE.PURCHASE)
            };
            t.addReleaseData = function(e, t) {
                const n = e.id;
                if (t.has(n)) {
                    const i = t.get(n),
                        o = new Date(i.releaseDate),
                        r = o.getTime();
                    e.releaseYear = isNaN(r) || 0 === r ? 0 : o.getFullYear(), e.releaseDate = isNaN(r) ? 0 : r
                } else e.releaseDate = 0, e.releaseYear = 0
            };
            const l = function(e, t) {
                const n = t[e.championId];
                e.championPoints = n ? n.championPoints : 0, e.championName = n ? n.name : void 0
            };
            t.addMasteryData = l;
            const _ = function(e, t) {
                if (t) {
                    const n = i.lodash.keyBy(t, "id")[e.championId];
                    n && n.ownership && (e.champOwnership = n.ownership, e.isBase && (e.ownership.owned = n.ownership.owned, e.ownership.rental.purchaseDate = n.ownership.rental.purchaseDate))
                }
            };
            t.addOwnershipForBaseSkin = _;
            t.addLootableProperty = function(e, t) {
                e.lootable = !!t && t.isLootable(e.id)
            };

            function c(e, t) {
                let n;
                return n = t ? o.CN_SKIN_RARITIES[e.regionRarityId] : o.SKIN_RARITIES[e.rarity], n || o.SKIN_RARITIES.kNoRarity
            }
            t.addSkinStaticData = function({
                playerChampionInfo: e,
                skinsGameData: t,
                championsById: n,
                isTencentRegion: i
            }) {
                return t && n ? o => {
                    const r = t[o.id];
                    return r ? (o.skinLines = r.skinLines, o.isLegacy = r.isLegacy, o.rarity = c(r, i), o.description = r.description, a(o), l(o, n), _(o, e), o) : o
                } : e => e
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var i = n(1);
            var o = (0, i.EmberDataBinding)({
                Ember: i.Ember,
                websocket: (0, i.getProvider)().getSocket(),
                basePaths: {
                    login: "/lol-login",
                    platformConfig: "/lol-platform-config",
                    collections: "/lol-collections",
                    champions: "/lol-champions",
                    gameData: "/lol-game-data",
                    store: "/lol-store",
                    riotclient: "/riotclient"
                },
                boundProperties: {
                    session: {
                        api: "login",
                        path: "/v1/session"
                    },
                    playerChampionFullInfo: {
                        api: "champions",
                        path: "/v1/inventories/{{session.summonerId}}/champions"
                    },
                    playerChampionInfo: {
                        api: "champions",
                        path: "/v1/inventories/{{session.summonerId}}/champions-minimal"
                    },
                    playerChampionMastery: {
                        api: "collections",
                        path: "/v1/inventories/{{session.puuid}}/champion-mastery"
                    },
                    skinsGameData: {
                        api: "gameData",
                        path: "/assets/v1/skins.json"
                    },
                    skinlinesInfo: {
                        api: "gameData",
                        path: "/assets/v1/skinlines.json"
                    },
                    skinUniverseInfo: {
                        api: "gameData",
                        path: "/assets/v1/universes.json"
                    },
                    jmxSettings: {
                        api: "platformConfig",
                        path: "/v1/namespaces"
                    },
                    locale: {
                        api: "riotclient",
                        path: "/region-locale"
                    }
                }
            });
            t.default = o
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = t.SkinSearchTermManager = t.SkinFilter = void 0, t.getSkinNameFilter = function(e, t, n, i = !1) {
                return function(o) {
                    const s = t.getSkinSearchTerms(o);
                    return function(e, t, n, i = !1) {
                        if (!e) return !0;
                        const o = e.toLocaleLowerCase(n);
                        if (i) return r.filter(o, t).length > 0;
                        return t.filter((e => e.includes(o))).length > 0
                    }(e, s, n, i)
                }
            };
            var i = n(1),
                o = n(17);
            const r = n(36);
            var s = class {
                constructor() {
                    this._filter = "", this._locale = o.DEFAULT_LOCALE, this._ownership = o.COLLECTION_GRID_OWNERSHIP_FILTERS.ALL, this._hasChroma = !1, this._skinLineId = 0, this._useFuzzy = !1, this._showBaseSkin = !0
                }
                set filter(e) {
                    this._filter = e
                }
                set locale(e) {
                    this._locale = e
                }
                get tra() {
                    return this._tra
                }
                set tra(e) {
                    this._tra = e
                }
                set ownership(e) {
                    this._ownership = e
                }
                set hasChroma(e) {
                    this._hasChroma = e
                }
                set legacyOnly(e) {
                    this._legacyOnly = e
                }
                set skinLineId(e) {
                    this._skinLineId = e
                }
                set useFuzzy(e) {
                    this._useFuzzy = e
                }
                set showBaseSkin(e) {
                    this._showBaseSkin = e
                }
                filterSkins(e) {
                    if (e) {
                        return this._filterSkins(e)
                    }
                    return []
                }
                _filterSkins(e) {
                    let t = e;
                    return this._skinLineId && (t = this._skinLineId === o.ALL_SKINLINE_ID ? t.filter((e => e.skinLineId && e.skinLineId !== o.NO_SKINLINE_ID)) : t.filter((e => e.skinLineId === this._skinLineId))), this._ownership === o.COLLECTION_GRID_OWNERSHIP_FILTERS.OWNED ? t = t.filter((e => e.ownership.owned)) : this._ownership === o.COLLECTION_GRID_OWNERSHIP_FILTERS.UNOWNED && (t = t.filter((e => !e.ownership.owned))), this._hasChroma && (t = t.filter((e => e.chromaPath))), this._legacyOnly && (t = t.filter((e => e.isLegacy))), this._showBaseSkin || (t = t.filter((e => !e.isBase))), t = t.filter((e => {
                        const t = `champion_local_search_colloq_${e.championId}`,
                            n = this._tra.exists(t) ? this._tra.get(t) : "";
                        return this._isValidInFullTextSearch(this._filter, this._buildSearchTerms(n, e.name))
                    })), t
                }
                _isValidInFullTextSearch(e, t) {
                    if (!e) return !0;
                    const n = e.toLocaleLowerCase();
                    return this._useFuzzy ? r.filter(n, t).length > 0 : t.filter((e => e.includes(n))).length > 0
                }
                _buildSearchTerms(e, t) {
                    const n = (0, i.lodash)(e.split(";")).filter((e => e.length > 0)).map((e => e.toLocaleLowerCase())).value(),
                        o = t.toLocaleLowerCase();
                    return i.lodash.includes(n, o) || n.push(o), n
                }
            };
            t.default = s;
            t.SkinFilter = class {
                constructor(e) {
                    this._filters = e
                }
                filterSkins(e) {
                    let t = [];
                    return e && Array.isArray(e) && (t = e, this._filters && this._filters.length > 0 && (t = this._filters.reduce(((e, t) => e.filter(t)), t))), t
                }
            };
            t.SkinSearchTermManager = class {
                constructor(e) {
                    if (!e) throw new Error("Tra service could not be null or undefined.");
                    this._tra = e, this._championSearchTermMap = new Map, this._skinSearchTermMap = new Map
                }
                setLocale(e) {
                    this._locale && e !== this._locale && (this._championSearchTermMap.clear(), this._skinSearchTermMap.clear()), this._locale = e
                }
                getSkinSearchTerms(e) {
                    return this._skinSearchTermMap.has(e.id) || this._buildSkinSearchTerms(e), this._skinSearchTermMap.get(e.id)
                }
                _buildSkinSearchTerms(e) {
                    this._championSearchTermMap.has(e.championId) || this._buildChampionSearchTerms(e.championId);
                    const t = this._championSearchTermMap.get(e.championId),
                        n = e.name.toLocaleLowerCase(this._locale),
                        o = t.slice();
                    i.lodash.includes(o, n) || o.push(n), this._skinSearchTermMap.set(e.id, o)
                }
                _buildChampionSearchTerms(e) {
                    const t = `champion_local_search_colloq_${e}`,
                        n = this._tra.exists(t) ? this._tra.get(t) : "",
                        o = (0, i.lodash)(n.split(";")).filter((e => e.length > 0)).map((e => e.toLocaleLowerCase(this._locale))).value();
                    this._championSearchTermMap.set(e, o)
                }
            }
        }, e => {
            var t;
            t = {}, e.exports = t, t.simpleFilter = function(e, n) {
                return n.filter((function(n) {
                    return t.test(e, n)
                }))
            }, t.test = function(e, n) {
                return null !== t.match(e, n)
            }, t.match = function(e, t, n) {
                n = n || {};
                var i, o = 0,
                    r = [],
                    s = t.length,
                    a = 0,
                    l = 0,
                    _ = n.pre || "",
                    c = n.post || "",
                    u = n.caseSensitive && t || t.toLowerCase();
                e = n.caseSensitive && e || e.toLowerCase();
                for (var p = 0; p < s; p++) i = t[p], u[p] === e[o] ? (i = _ + i + c, o += 1, l += 1 + l) : l = 0, a += l, r[r.length] = i;
                return o === e.length ? (a = u === e ? 1 / 0 : a, {
                    rendered: r.join(""),
                    score: a
                }) : null
            }, t.filter = function(e, n, i) {
                return n && 0 !== n.length ? "string" != typeof e ? n : (i = i || {}, n.reduce((function(n, o, r, s) {
                    var a = o;
                    i.extract && (a = i.extract(o));
                    var l = t.match(e, a, i);
                    return null != l && (n[n.length] = {
                        string: l.rendered,
                        score: l.score,
                        index: r,
                        original: o
                    }), n
                }), []).sort((function(e, t) {
                    var n = t.score - e.score;
                    return n || e.index - t.index
                }))) : []
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var i = n(1).Ember.Object.extend({
                grouping: void 0,
                groupSortOrder: void 0,
                groupContentSortOrder: void 0,
                nameFilter: ""
            });
            t.default = i
        }],
        t = {};

    function n(i) {
        var o = t[i];
        if (void 0 !== o) return o.exports;
        var r = t[i] = {
            exports: {}
        };
        return e[i](r, r.exports, n), r.exports
    }
    n.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, (() => {
        "use strict";
        var e = i(n(1)),
            t = i(n(2));

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        const o = "rcp-fe-lol-skins-picker",
            r = document.currentScript.ownerDocument;
        t.default.set(r);
        const s = window.getPluginAnnounceEventName(o);
        r.addEventListener(s, (function(t) {
            (0, t.registrationHandler)((t => e.default.init(t, {
                AudioPlugin: e => e.get("rcp-fe-audio"),
                bluebird: e => e.get("rcp-fe-common-libs").getBluebird(3),
                ComponentFactory: e => e.get("rcp-fe-common-libs").getComponentFactory(1),
                DataBinding: e => e.get("rcp-fe-common-libs").getDataBinding("rcp-fe-lol-skins-picker"),
                Ember: e => e.get("rcp-fe-ember-libs").getEmber(),
                EmberApplicationFactory: e => e.get("rcp-fe-ember-libs").getEmberApplicationFactory(),
                EmberDataBinding: e => e.get("rcp-fe-ember-libs").getEmberDataBinding("rcp-fe-lol-skins-picker"),
                EmberL10n: e => e.get("rcp-fe-ember-libs").getEmberL10n(1),
                l10n: e => e.get("rcp-fe-lol-l10n"),
                lodash: e => e.get("rcp-fe-common-libs").getLodash("4"),
                logger: e => e.get("rcp-fe-common-libs").logging.create(o),
                UiKitPlugin: e => e.get("rcp-fe-lol-uikit")
            }).then((() => e.default.add({
                EmberHelpers: e => e.get("rcp-fe-ember-libs").getEmberHelpers()
            }))).then((() => new(0, n(3).default)))))
        }), {
            once: !0
        })
    })()
})();