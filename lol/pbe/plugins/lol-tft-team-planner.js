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
                        const i = e[a],
                            l = n._getValue(a, i);
                        l && l.then ? (l.then((function(e) {
                            e || console.warn("The promise for the key " + a + " resolved with a falsy value: ", e), n._addValue(a, e)
                        })), t.push(l)) : n._addValue(a, l)
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
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.PLUGIN_NAME = t.APP_NAME = void 0;
            t.PLUGIN_NAME = "rcp-fe-lol-tft-team-planner";
            t.APP_NAME = "tft-team-planner"
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                i = n(4),
                l = n(6),
                r = b(n(7)),
                s = b(n(10)),
                o = b(n(13)),
                c = b(n(16)),
                m = b(n(19)),
                p = b(n(23)),
                d = b(n(26)),
                u = b(n(29)),
                h = b(n(32)),
                f = b(n(35)),
                _ = b(n(38)),
                g = b(n(41)),
                v = b(n(42));

            function b(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            const y = a.dataBinding.bindTo(a.socket),
                x = "tft-team-planner",
                T = n(45);
            t.default = class {
                constructor() {
                    this._teamPlannerInstance = null, this._config = null, this._enabled = !1, this._registerComponents(), this._initObservers(), this.tftChampionsByAlias = i.tftChampionsByAlias, this.tftItemsByName = i.tftItemsByName, this.cssSheet = i.cssSheet, this.tftTraitsById = i.tftTraitsById, this.tftGameVariationsByAlias = i.tftGameVariationsByAlias, this.tftSets = i.tftSets, this.teamplannerSessionId = null, this.sessionStartTime_ms = 0, this.activatedFromSource = ""
                }
                _registerComponents() {
                    const e = {
                        tra: a.traService,
                        ComponentFactory: a.ComponentFactory,
                        TeamPlannerRootComponent: r.default.extend({
                            privateApi: this
                        }),
                        TiersListContainerComponent: s.default,
                        TeamContainerComponent: o.default,
                        TeamGridComponent: c.default,
                        TeamGridTileComponent: m.default,
                        TeamGridTileTraitIconComponent: p.default,
                        TeamTraitsContainerComponent: d.default,
                        TeamTraitComponent: u.default,
                        TierContainerComponent: h.default,
                        TierGridComponent: f.default,
                        TierGridTileComponent: _.default,
                        TeamPlannerService: g.default.extend({
                            privateApi: this
                        }),
                        RemindersToggleComponent: v.default
                    };
                    a.emberApplicationFactory.setFactoryDefinition(x, e)
                }
                _createTeamPlannerInstance() {
                    return this._componentState = a.Ember.Object.create({
                        isVisible: !1
                    }), this._teamPlannerInstance = a.ComponentFactory.create({
                        type: x,
                        data: this._componentState
                    }), this._teamPlannerInstance
                }
                _initObservers() {
                    y.addObserver("/lol-tft-team-planner/v1/config", this, (e => {
                        e && (this._config = e, this._enabled = e.enabled)
                    })), y.addObserver("/lol-tft-team-planner/v1/ftue/hasViewed", this, (e => {
                        this._isFTUE = !e
                    }))
                }
                show(e) {
                    if (this._enabled) {
                        if (this._teamPlannerInstance) {
                            if (this._componentState.get("isVisible")) return;
                            a.LayerManager.addLayer(this._teamPlannerInstance.domNode), this._componentState.set("isVisible", !0)
                        } else this._createTeamPlannerInstance().renderPromise.then((() => {
                            a.LayerManager.addLayer(this._teamPlannerInstance.domNode), this._componentState.set("isVisible", !0)
                        }));
                        l.SFX.openFlyout.play(), this.teamplannerSessionId = T(), this.activatedFromSource = e, this.sessionStartTime_ms = Date.now(), this.remindersClickedCount = 0
                    }
                }
                hide(e) {
                    if (!this._componentState.get("isVisible")) return;
                    this._componentState.set("isVisible", !1), a.LayerManager.removeLayer(this._teamPlannerInstance.domNode), l.SFX.closeFlyout.play();
                    const t = {
                        team_planner_activated_from: this.activatedFromSource,
                        team_planner_closed_from: e,
                        team_planner_session_duration_seconds: .001 * (Date.now() - this.sessionStartTime_ms),
                        team_planner_session_id: this.teamplannerSessionId
                    };
                    this._config.remindersEnabled && (t.team_planner_reminders_clicked_count = this.remindersClickedCount, t.team_planner_reminders_enabled = this.remindersEnabled), a.Telemetry.sendCustomData("TFT_team_planner_close", t), this.teamplannerSessionId = null, this.activatedFromSource = "", this.sessionStartTime_ms = 0
                }
                getEnabled() {
                    return this._enabled
                }
            }
        }, (e, t, n) => {
            "use strict";
            var a = n(1),
                i = n(5);
            const l = a.Ember.Object.extend(i.DataBindingMixin, i.FixDataBindingMixin, {
                    tftChampionsByAlias() {
                        return this.retrieveData("api.gameData", "/assets/v1/tftchampions-teamplanner.json").then((e => e.reduce(((e, t) => e.set(t.character_id, t)), a.Ember.Map.create())))
                    },
                    tftTraitsById() {
                        return this.retrieveData("api.gameData", "/assets/v1/tfttraits.json").then((e => e.reduce(((e, t) => e.set(t.trait_id, t)), a.Ember.Map.create())))
                    },
                    tftGameVariationsByAlias() {
                        return this.retrieveData("api.gameData", "/assets/v1/tftgamevariations.json").then((e => e.reduce(((e, t) => e.set(t.game_variation_decorated_name.toLowerCase(), t)), a.Ember.Map.create())))
                    },
                    tftSets() {
                        return this.retrieveData("api.gameData", "/assets/v1/tftsets.json").then((e => e.LCTFTModeData.mActiveSets))
                    },
                    tftItemsByName() {
                        return this.retrieveData("api.gameData", "/assets/v1/tftitems.json").then((e => this._indexEntitiesByName(e)))
                    },
                    cssSheet() {
                        return this.retrieveData("api.gameData", "/assets/v1/stylesheet.json").then((e => ({
                            iconTexture: e.iconTexture,
                            iconData: this._indexEntitiesByKey(e.iconData)
                        })))
                    },
                    _indexEntitiesByKey: e => a.Ember.isArray(e) ? e.reduce(((e, t) => e.set(t.key, t.value)), a.Ember.Map.create()) : a.Ember.Map.create(),
                    _indexEntitiesByName: e => a.Ember.isArray(e) ? e.reduce(((e, t) => e.set(t.nameId, t)), a.Ember.Map.create()) : a.Ember.Map.create(),
                    _indexEntities: e => a.Ember.isArray(e) ? e.reduce(((e, t) => e.set(t.id, t)), a.Ember.Map.create()) : a.Ember.Map.create()
                }),
                r = l.create();
            e.exports = {
                TftGameData: l,
                tftItemsByName: r.tftItemsByName(),
                cssSheet: r.cssSheet(),
                tftChampionsByAlias: r.tftChampionsByAlias(),
                tftTraitsById: r.tftTraitsById(),
                tftGameVariationsByAlias: r.tftGameVariationsByAlias(),
                tftSets: r.tftSets()
            }
        }, (e, t, n) => {
            "use strict";
            var a = n(1);
            const i = (0, a.EmberDataBinding)({
                    Ember: a.Ember,
                    logPrefix: "rcp-fe-lol-tft:mixins:data-binding",
                    basePaths: {
                        gameData: "/lol-game-data"
                    }
                }),
                l = a.Ember.Mixin.create({
                    retrieveData(e, t, n) {
                        return this.get(e).get(t, n).then((e => e ? Promise.resolve(e) : Promise.reject(void 0)))
                    }
                });
            e.exports = {
                FixDataBindingMixin: l,
                DataBindingMixin: i
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.SFX = void 0;
            const a = n(1).AudioPlugin.getChannel("sfx-ui");

            function i(e) {
                return a.createSound(e, {
                    allowConcurrency: !1
                })
            }
            const l = {
                closeClick: i("/fe/lol-static-assets/sounds/sfx-uikit-grid-click.ogg"),
                openFlyout: i("/fe/lol-static-assets/sounds/skin-viewer/sfx-uikit-button-flyout-open-click.ogg"),
                closeFlyout: i("/fe/lol-static-assets/sounds/skin-viewer/sfx-uikit-button-flyout-close-click.ogg"),
                hoverChampionTier: i("/fe/lol-static-assets/sounds/sfx-uikit-button-circlegold-hover.ogg"),
                addChampion: i("/fe/lol-static-assets/sounds/sfx-uikit-button-text-click.ogg"),
                failAddChampion: i("/fe/lol-static-assets/sounds/sfx-uikit-edit-click.ogg"),
                removeChampion: i("/fe/lol-static-assets/sounds/sfx-uikit-button-generic-click.ogg"),
                hoverChampionTeam: i("/fe/lol-static-assets/sounds/sfx-uikit-button-gold-hover.ogg"),
                tileMousedown: i("/fe/lol-static-assets/sounds/sfx-uikit-click-generic.ogg"),
                dragStart: i("/fe/lol-static-assets/sounds/sfx-uikit-grid-drag.ogg"),
                dragRelease: i("/fe/lol-uikit/sfx-uikit-dropdown-click.ogg"),
                hoverTrait: i("/fe/lol-static-assets/sounds/sfx-uikit-button-circlegold-hover.ogg"),
                clickTrait: i("/fe/lol-static-assets/sounds/sfx-uikit-button-circlegold-click.ogg"),
                hoverInfoButton: i("/fe/lol-static-assets/sounds/sfx-uikit-button-circlegold-hover.ogg"),
                hoverRemindersToggle: i("/fe/lol-static-assets/sounds/sfx-uikit-button-circlegold-hover.ogg"),
                toggleRemindersEnabled: i("/fe/lol-uikit/sfx-uikit-button-circlex-click.ogg"),
                clearTeamURL: "/fe/lol-static-assets/sounds/sfx-uikit-button-big-click.ogg"
            };
            t.SFX = l
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(8);
            var i = n(6),
                l = a.Ember.Component.extend({
                    layout: n(9),
                    classNames: ["team-planner-root-component"],
                    isLoading: !1,
                    teamPlannerService: a.Ember.inject.service("TeamPlanner"),
                    isVisible: a.Ember.computed.alias("teamPlannerService.isVisible"),
                    isFTUE: a.Ember.computed.alias("teamPlannerService.isFTUE"),
                    remindersTooltip: a.Ember.computed.alias("teamPlannerService.remindersTooltip"),
                    didInsertElement() {
                        this._super(...arguments), this.element.addEventListener("dialogFrameDismissed", (() => {
                            this.get("teamPlannerService").saveAndExit()
                        }));
                        const e = this.element.querySelector("lol-uikit-dialog-frame").shadowRoot.querySelector("lol-uikit-close-button");
                        e && (e.removeEventListener("click", e), e.addEventListener("mousedown", (e => {
                            i.SFX.closeClick.play()
                        })))
                    },
                    willDestroyElement() {
                        this._super(...arguments), this.element.removeEventListener("dialogFrameDismissed", (() => {
                            this.get("teamPlannerService").saveAndExit()
                        }));
                        const e = this.element.querySelector("lol-uikit-dialog-frame").shadowRoot.querySelector("lol-uikit-close-button");
                        e && e.removeEventListener("mousedown", (e => {
                            i.SFX.closeClick.play()
                        }))
                    },
                    didReceiveAttrs() {
                        this._super(...arguments);
                        const e = this.get("isVisible");
                        !this._prevIsVisible && e ? this._onVisible() : this._prevIsVisible && !e && this._onHidden(), this._prevIsVisible = e
                    },
                    _onVisible() {
                        this.set("_keyDown", this._handleKeyDown.bind(this)), document.addEventListener("keydown", this.get("_keyDown")), this.get("isFTUE") && this._onFTUE()
                    },
                    _onHidden() {
                        document.removeEventListener("keydown", this.get("_keyDown"))
                    },
                    _onFTUE() {
                        const e = this.get("remindersTooltip");
                        e && a.TooltipManager.show(e)
                    },
                    _handleKeyDown(e) {
                        "Escape" === e.key && (e.preventDefault(), this.get("teamPlannerService").saveAndExit())
                    },
                    actions: {
                        close() {
                            this.get("teamPlannerService").saveAndExit()
                        }
                    }
                });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "mS75qoCg",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\team-planner-root.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\team-planner-root.styl\\" js-path=\\"null\\" "],["text","\\n"],["block",["if"],["isVisible"],null,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","team-planner-root__content"],["flush-element"],["text","\\n            "],["append",["unknown",["tiers-list-container"]],false],["text","\\n            "],["append",["unknown",["team-container"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","team-planner-root__spinner"],["flush-element"],["text"," "],["append",["unknown",["uikit-spinner"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","lol-uikit-full-page-backdrop",[]],["static-attr","class","team-planner-backdrop"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","team-planner-backdrop__click-elem"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"close"],null],null],["flush-element"],["close-element"],["text","\\n    "],["open-element","lol-uikit-dialog-frame",[]],["static-attr","frame","bordered"],["static-attr","dismissable","true"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner-root"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isLoading"]]],null,1,0],["text","      "],["close-element"],["text"," \\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(11);
            var i = a.Ember.Component.extend({
                layout: n(12),
                classNames: ["team-planner__tiers-list-container-component"],
                teamPlannerService: a.Ember.inject.service("TeamPlanner"),
                tierListData: a.Ember.computed("teamPlannerService.tftChampionsByAlias", "tra", (function() {
                    const e = [],
                        t = [],
                        n = {};
                    return this.get("teamPlannerService").tftChampionsByAlias.forEach(((e, a) => {
                        const i = e.tier;
                        i in n || (n[i] = {
                            tierLevel: i,
                            tierCost: i,
                            unitListData: []
                        }, t.push(i)), n[i].unitListData.push(e)
                    })), t.sort(), t.forEach((t => {
                        const a = n[t];
                        a.unitListData.sort(((e, t) => e.character_id.localeCompare(t.character_id))), e.push(a)
                    })), e.forEach((e => {
                        e.tierTitle = this.get("tra").formatString("teamplanner_tier", {
                            tierLevel: e.tierLevel
                        })
                    })), e
                })),
                actions: {
                    onDrop(e) {
                        const t = e.dataTransfer.getData("srcTeamIndex");
                        "-1" !== t && this.get("teamPlannerService").removeChampionByIndex(t)
                    },
                    onDragOver(e) {
                        e.preventDefault(), e.dataTransfer.dropEffect = "copy"
                    }
                }
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "Gkprn0CK",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\tiers-list-container.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\tiers-list-container.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","team-planner__tiers-list-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","team-planner__header-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","team-planner__header-container__title"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","title_tft_teamplanner"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","team-planner__tiers-list-container__scrollable-content"],["flush-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","onDrop",["helper",["action"],[["get",[null]],"onDrop"],null],null],["dynamic-attr","onDragOver",["helper",["action"],[["get",[null]],"onDragOver"],null],null],["flush-element"],["text","\\n"],["block",["each"],[["get",["tierListData"]]],null,0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["helper",["tier-container"],null,[["tierData"],[["get",["tierData"]]]]],false],["text","\\n"]],"locals":["tierData"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(14);
            var i = n(6);
            const l = a.dataBinding.bindTo(a.socket);
            var r = a.Ember.Component.extend({
                layout: n(15),
                classNames: ["team-planner__team-container-component"],
                clearTeamSfxUrl: i.SFX.clearTeamURL,
                teamPlannerService: a.Ember.inject.service("TeamPlanner"),
                remindersFeatureEnabled: a.Ember.computed.alias("teamPlannerService.remindersFeatureEnabled"),
                actions: {
                    clearTeam() {
                        l.delete("/lol-tft-team-planner/v1/team/champions")
                    }
                }
            });
            t.default = r
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "O2ypWDtv",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\team-container.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\team-container.styl\\" js-path=\\"null\\" "],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","team-planner__team-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","team-planner__team-container-header"],["flush-element"],["text","\\n"],["block",["if"],[["get",["remindersFeatureEnabled"]]],null,0],["text","    "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","team-planner__team-container__clear-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"clearTeam"],null],null],["dynamic-attr","click-sfx-src",["unknown",["clearTeamSfxUrl"]],null],["flush-element"],["text","\\n      "],["append",["unknown",["tra","buttontext_teamplanner_clear_all"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["append",["unknown",["team-grid"]],false],["text","\\n  "],["append",["unknown",["team-traits-container"]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","team-planner__reminders"],["flush-element"],["text","\\n        "],["append",["unknown",["reminders-toggle"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(17);
            var i = a.Ember.Component.extend({
                layout: n(18),
                classNames: ["team-planner__team-grid-component"],
                teamPlannerService: a.Ember.inject.service("TeamPlanner"),
                teamCompData: a.Ember.computed("teamPlannerService.tftChampionsByAlias", "teamPlannerService.currentTeamMembers", (function() {
                    const e = this.get("teamPlannerService"),
                        t = e.currentTeamMembers,
                        n = e.tftChampionsByAlias,
                        i = a.Ember.A();
                    return t.forEach((e => {
                        "" === e ? i.push(a.Ember.Map.create()) : i.push(n.get(e))
                    })), i
                }))
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "i+V72e24",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\team-grid.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\team-grid.styl\\" js-path=\\"null\\" "],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","team-planner__team-grid"],["flush-element"],["text","\\n"],["block",["each"],[["get",["teamCompData"]]],null,0],["close-element"],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["team-grid-tile"],null,[["tileData","teamIndex"],[["get",["tileData"]],["get",["index"]]]]],false],["text","\\n"]],"locals":["tileData","index"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(20);
            var i = n(6);
            new Promise(((e, t) => {
                const a = new Image,
                    i = () => {
                        a.onload = a.onerror = null
                    };
                a.onload = () => {
                    i(), e()
                }, a.onerror = e => {
                    i(), t(e)
                }, a.src = n(21)
            }));
            var l = a.Ember.Component.extend({
                layout: n(22),
                classNames: ["team-planner__team-grid-tile-component"],
                teamPlannerService: a.Ember.inject.service("TeamPlanner"),
                isDragging: a.Ember.computed.alias("teamPlannerService.isDragging"),
                tileData: null,
                teamIndex: -1,
                hasChampion: a.Ember.computed("tileData.character_id", (function() {
                    return !!this.get("tileData.character_id")
                })),
                activeDropZone: "activeDropZone",
                actions: {
                    onClick() {
                        this.get("hasChampion") && this.get("teamPlannerService").removeChampionByIndex(this.get("teamIndex"))
                    },
                    onDragStart(e) {
                        this.element.classList.add("team-planner__team-grid-tile__dragging"), e.dataTransfer.effectAllowed = "copyMove";
                        const t = this.element.querySelector(".team-planner__team-grid-tile__image-overlay"),
                            n = .5 * t.offsetWidth,
                            a = .5 * t.offsetHeight;
                        e.dataTransfer.setDragImage(t, n, a), e.dataTransfer.setData("srcId", this.get("unitData.character_id")), e.dataTransfer.setData("srcTeamIndex", this.get("teamIndex")), this.set("activeDropZone", "inactiveDropZone"), this.set("isDragging", !0), i.SFX.dragStart.play()
                    },
                    onDragEnd(e) {
                        this.set("isDragging", !1), this.element.classList.remove("team-planner__team-grid-tile__dragging"), this.set("activeDropZone", "activeDropZone"), i.SFX.dragRelease.play()
                    },
                    onDragEnter(e) {
                        this.set("activeDropZone", "overDropZone")
                    },
                    onDragLeave(e) {
                        this.set("activeDropZone", "activeDropZone")
                    },
                    onDrop(e) {
                        const t = e.dataTransfer.getData("srcTeamIndex");
                        "-1" === t ? this.get("teamPlannerService").addChampionByIndex(this.get("teamIndex"), e.dataTransfer.getData("srcId")) : this.get("teamPlannerService").swapChampionsByIndex(t, this.get("teamIndex"))
                    },
                    onDragOver(e) {
                        e.preventDefault(), e.dataTransfer.dropEffect = "copy"
                    },
                    onMouseOver(e) {
                        this.get("hasChampion") && i.SFX.hoverChampionTeam.play()
                    },
                    onMouseDown(e) {
                        this.get("hasChampion") && i.SFX.tileMousedown.play()
                    }
                }
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            e.exports = n.p + "cTeamPlanner_ChampionHighlight_HoverSelector.png"
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "mKtia9af",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\team-grid-tile.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\team-grid-tile.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["team-planner__team-grid-tile ",["helper",["if"],[["get",["hasChampion"]],"team-grid-tile--enabled"],null]]]],["dynamic-attr","draggable",["unknown",["hasChampion"]],null],["dynamic-attr","onDragStart",["helper",["action"],[["get",[null]],"onDragStart"],null],null],["dynamic-attr","onDragEnd",["helper",["action"],[["get",[null]],"onDragEnd"],null],null],["dynamic-attr","onMouseOver",["helper",["action"],[["get",[null]],"onMouseOver"],null],null],["dynamic-attr","onMouseDown",["helper",["action"],[["get",[null]],"onMouseDown"],null],null],["modifier",["action"],[["get",[null]],"onClick"]],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasChampion"]]],null,4,3],["block",["if"],[["get",["tileData","tier"]]],null,2],["text","  "],["open-element","div",[]],["static-attr","class","team-planner__team-grid-tile__hover-state"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isDragging"]]],null,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["team-planner__team-grid-tile__drop-zone ",["unknown",["activeDropZone"]]]]],["dynamic-attr","onDragEnter",["helper",["action"],[["get",[null]],"onDragEnter"],null],null],["dynamic-attr","onDragLeave",["helper",["action"],[["get",[null]],"onDragLeave"],null],null],["dynamic-attr","onDrop",["helper",["action"],[["get",[null]],"onDrop"],null],null],["dynamic-attr","onDragOver",["helper",["action"],[["get",[null]],"onDragOver"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["helper",["team-grid-tile-trait-icon"],null,[["traitId"],[["get",["trait","id"]]]]],false],["text","\\n"]],"locals":["trait"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","team-planner__team-grid-tile__image-overlay"],["dynamic-attr","style",["concat",["background-image: url(/fe/lol-tft-team-planner/images/cTeamPlanner_Member_Tier",["unknown",["tileData","tier"]],".png);"]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner__team-grid-tile__champion-title"],["flush-element"],["text","\\n        "],["append",["unknown",["tileData","display_name"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner__team-grid-tile__trait-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["tileData","traits"]]],null,1],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","team-planner__team-grid-tile__image-overlay"],["static-attr","style","background-image: url(/fe/lol-tft-team-planner/images/cTeamPlanner_ChampionButton_Empty.png);"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","team-planner__team-grid-tile__champion-splash"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["tileData","squareSplashIconPath"]],");"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1);
            n(24), e.exports = a.Ember.Component.extend({
                layout: n(25),
                classNames: ["team-grid-tile-trait-icon-component"],
                teamPlannerService: a.Ember.inject.service("TeamPlanner"),
                traitId: null,
                trait: a.Ember.computed("teamPlannerService.tftTraitsById", "traitId", (function() {
                    const e = this.get("teamPlannerService"),
                        t = this.get("traitId");
                    if (void 0 === t) return;
                    return e.tftTraitsById.get(t)
                })),
                setlessTraitId: a.Ember.computed("traitId", (function() {
                    const e = this.get("traitId");
                    if (e) {
                        const t = e.split("_");
                        if (t.length > 0) return t[1]
                    }
                }))
            })
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "0kKw9a9T",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\team-grid-tile-trait-icon.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\team-grid-tile-trait-icon.styl\\" js-path=\\"null\\" "],["text","\\n"],["block",["if"],[["get",["trait","icon_path"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["team-planner__team-grid-tile-trait-icon__background ",["unknown",["setlessTraitId"]]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","team-planner__team-grid-tile-trait-icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["trait","icon_path"]],");"]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(27);
            var i = function(e, t) {
                if (!t && e && e.__esModule) return e;
                if (null === e || "object" != typeof e && "function" != typeof e) return {
                    default: e
                };
                var n = l(t);
                if (n && n.has(e)) return n.get(e);
                var a = {},
                    i = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var r in e)
                    if ("default" !== r && Object.prototype.hasOwnProperty.call(e, r)) {
                        var s = i ? Object.getOwnPropertyDescriptor(e, r) : null;
                        s && (s.get || s.set) ? Object.defineProperty(a, r, s) : a[r] = e[r]
                    } a.default = e, n && n.set(e, a);
                return a
            }(n(6));

            function l(e) {
                if ("function" != typeof WeakMap) return null;
                var t = new WeakMap,
                    n = new WeakMap;
                return (l = function(e) {
                    return e ? n : t
                })(e)
            }
            var r = a.Ember.Component.extend({
                layout: n(28),
                classNames: ["team-planner__team-traits-container-component"],
                teamPlannerService: a.Ember.inject.service("TeamPlanner"),
                traitData: a.Ember.computed.alias("teamPlannerService.currentTeamTraits"),
                isTeamEmpty: a.Ember.computed("traitData", (function() {
                    return !this.get("traitData.length")
                })),
                maxPages: a.Ember.computed("traitData", (function() {
                    return Math.trunc((this.get("traitData").length - 1) / 9)
                })),
                currentPage: a.Ember.computed("maxPages", {
                    get(e) {
                        const t = this.get("_currentPage");
                        return t > this.get("maxPages") ? (this.set("_currentPage", 0), 0) : t
                    },
                    set(e, t) {
                        return t > this.get("maxPages") ? (this.set("_currentPage", 0), 0) : (this.set("_currentPage", t), t)
                    }
                }),
                _currentPage: 0,
                visibleTraits: a.Ember.computed("traitData", "currentPage", (function() {
                    const e = this.get("traitData");
                    if (!e) return;
                    const t = 9 * this.get("currentPage"),
                        n = t + Math.min(e.length - t, 9),
                        a = [];
                    for (let i = t; i < n; ++i) a[i - t] = e[i];
                    for (let e = a.length; e < 9; ++e) a[e] = null;
                    return a
                })),
                hiddenTraitCount: a.Ember.computed("traitData", "currentPage", (function() {
                    const e = this.get("traitData.length");
                    return e ? e - Math.min(e - 9 * this.get("currentPage"), 9) : 0
                })),
                actions: {
                    onMouseOver() {
                        i.SFX.hoverTrait.play()
                    },
                    nextPage() {
                        this.set("currentPage", this.get("currentPage") + 1), i.SFX.clickTrait.play()
                    }
                }
            });
            t.default = r
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "ogWYGoSn",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\team-traits-container.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\team-traits-container.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","team-planner__team-traits-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isTeamEmpty"]]],null,4,3],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait-container__next-page-button__hide"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait-container__next-page-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"nextPage"],null],null],["dynamic-attr","onMouseOver",["helper",["action"],[["get",[null]],"onMouseOver"],null],null],["flush-element"],["text","\\n        "],["open-element","p",[]],["static-attr","class","team-planner__team-trait-container__text"],["flush-element"],["text","+"],["append",["unknown",["hiddenTraitCount"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["team-trait"],null,[["trait"],[["get",["tData"]]]]],false],["text","\\n"]],"locals":["tData"]},{"statements":[["block",["each"],[["get",["visibleTraits"]]],null,2],["block",["if"],[["get",["maxPages"]]],null,1,0]],"locals":[]},{"statements":[["text","    "],["open-element","p",[]],["static-attr","class","team-planner__team-trait-container__no-traits-text"],["flush-element"],["append",["unknown",["tra","teamplanner_traits_empty_message"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(30);
            var i = n(6),
                l = a.Ember.Component.extend({
                    layout: n(31),
                    classNames: ["team-planner__team-trait-component"],
                    trait: null,
                    isThreat: a.Ember.computed("trait", (function() {
                        return this.get("trait") && "kThreat" === this.get("trait.style")
                    })),
                    teamPlannerService: a.Ember.inject.service("TeamPlanner"),
                    traitChampsEnabled: a.Ember.computed.alias("teamPlannerService.traitTooltipChampsEnabled"),
                    championData: a.Ember.computed("teamPlannerService.tftChampionsByAlias", "trait", (function() {
                        const e = this.get("teamPlannerService").tftChampionsByAlias;
                        return this.get("trait").championsByTrait.map((t => e.get(t)))
                    })),
                    actions: {
                        onMouseEnter() {
                            i.SFX.hoverTrait.play()
                        }
                    }
                });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "uG9MZNTX",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\team-trait.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\team-trait.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","team-planner__team-trait"],["dynamic-attr","onMouseEnter",["helper",["if"],[["get",["trait"]],["helper",["action"],[["get",[null]],"onMouseEnter"],null]],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["trait"]]],null,6,0],["close-element"],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","team-planner__team-trait__background__empty"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait__background"],["dynamic-attr","style",["concat",["background-image: url(/fe/lol-tft-team-planner/images/cTeamPlanner_ActiveTrait_",["unknown",["trait","style"]],".png)"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait__icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["trait","icon_path"]],");  ",["helper",["if"],[["get",["trait","styleRank"]],"filter: brightness(0);"],null]]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait__hover-state"],["static-attr","style","background-image: url(/fe/lol-tft-team-planner/images/TFT_HUD_Trait_Hovered.png);"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait__text"],["flush-element"],["append",["unknown",["trait","currentCount"]],false],["text","/"],["append",["unknown",["trait","nextThreshold"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait__background__threat"],["dynamic-attr","style",["concat",["background-image: url(/fe/lol-tft-team-planner/images/cTeamPlanner_ActiveTrait_",["unknown",["trait","style"]],".png)"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait__icon__threat"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["trait","icon_path"]],");"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait__hover-state"],["static-attr","style","background-image: url(/fe/lol-tft-team-planner/images/TFT_HUD_Threat_Hovered.png);"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait__text"],["flush-element"],["append",["unknown",["trait","currentCount"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","trait-champion-tile"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","trait-champion-icon-border"],["dynamic-attr","style",["concat",["background-image: url(/fe/lol-tft-team-planner/images/cTeamPlanner_ChampionButton_Tier",["unknown",["champion","tier"]],".png);"]]],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","trait-champion-icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["champion","squareIconPath"]],");"]]],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":["champion"]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","trait-champions-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["championData"]]],null,3],["text","        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","padding","small"],["static-attr","type","dialog"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","trait-tooltip-icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["trait","icon_path"]],");"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","trait-title"],["flush-element"],["append",["unknown",["trait","displayName"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","trait-tooltip-line"],["flush-element"],["close-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","trait-label"],["flush-element"],["append",["unknown",["trait","tooltipText"]],true],["close-element"],["text","\\n"],["block",["if"],[["get",["traitChampsEnabled"]]],null,4],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","restrictArea","type"],["top","whole-window","system"]],5],["text","\\n"],["block",["if"],[["get",["isThreat"]]],null,2,1]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(33);
            var i = a.Ember.Component.extend({
                layout: n(34),
                classNames: ["team-planner__tier-container-component"],
                tierData: null
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "F3ely0Fo",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\tier-container.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\tier-container.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","team-planner__tier-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","team-planner__tier-container__header"],["flush-element"],["text","\\n    "],["open-element","p",[]],["static-attr","class","team-planner__tier-container__header__title"],["flush-element"],["append",["unknown",["tierData","tierTitle"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","team-planner__tier-container__header__cost"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/home/TFT_Icon_Coins.png"],["static-attr","class","team-planner__tier-container__header__cost__icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","team-planner__tier-container__header__cost__text"],["flush-element"],["append",["unknown",["tierData","tierCost"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["append",["helper",["tier-grid"],null,[["unitListData"],[["get",["tierData","unitListData"]]]]],false],["text","\\n"],["close-element"],["text","\\n\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(36);
            var i = a.Ember.Component.extend({
                layout: n(37),
                classNames: ["team-planner__tier-grid-component"],
                unitListData: null
            });
            t.default = i
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "A5vLItze",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\tier-grid.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\tier-grid.styl\\" js-path=\\"null\\" "],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","team-planner__tier-grid"],["flush-element"],["text","\\n"],["block",["each"],[["get",["unitListData"]]],null,0],["close-element"],["text","\\n\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["tier-grid-tile"],null,[["unitData"],[["get",["unitData"]]]]],false],["text","\\n"]],"locals":["unitData"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(39);
            var i = n(6),
                l = a.Ember.Component.extend({
                    layout: n(40),
                    classNames: ["team-planner__tier-grid-tile-component"],
                    teamPlannerService: a.Ember.inject.service("TeamPlanner"),
                    isDragging: a.Ember.computed.alias("teamPlannerService.isDragging"),
                    unitData: null,
                    unitId: a.Ember.computed.alias("unitData.name"),
                    isDraggable: a.Ember.computed("isEquipped", (function() {
                        return !this.get("isEquipped")
                    })),
                    isEquipped: a.Ember.computed("unitData", "teamPlannerService.currentTeamMembers", (function() {
                        return !!this.get("unitData") && this.get("teamPlannerService").hasTeamMember(this.get("unitData").character_id)
                    })),
                    actions: {
                        onClick() {
                            const e = this.get("unitData.character_id");
                            e && (this.get("isEquipped") ? this.get("teamPlannerService").removeChampionById(e) : this.get("teamPlannerService").addChampionById(e))
                        },
                        onMouseDown() {
                            i.SFX.tileMousedown.play()
                        },
                        onDragStart(e) {
                            this.set("isDragging", !0), this.element.classList.add("team-planner__tier-grid-tile__dragging"), e.dataTransfer.effectAllowed = "copyMove";
                            const t = this.element.querySelector(".team-planner__tier-grid-tile__portrait"),
                                n = .5 * t.offsetWidth,
                                a = .5 * t.offsetHeight;
                            e.dataTransfer.setDragImage(t, n, a), e.dataTransfer.setData("srcId", this.get("unitData.character_id")), e.dataTransfer.setData("srcTeamIndex", -1), i.SFX.dragStart.play()
                        },
                        onDragEnd(e) {
                            this.set("isDragging", !1), this.element.classList.remove("team-planner__tier-grid-tile__dragging"), i.SFX.dragRelease.play()
                        },
                        onMouseOver(e) {
                            i.SFX.hoverChampionTier.play()
                        }
                    }
                });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "kh8TaTha",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\tier-grid-tile.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\tier-grid-tile.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","team-planner__tier-grid-tile"],["dynamic-attr","draggable",["unknown",["isDraggable"]],null],["dynamic-attr","onDragStart",["helper",["action"],[["get",[null]],"onDragStart"],null],null],["dynamic-attr","onDragEnd",["helper",["action"],[["get",[null]],"onDragEnd"],null],null],["dynamic-attr","onMouseOver",["helper",["action"],[["get",[null]],"onMouseOver"],null],null],["dynamic-attr","onMouseDown",["helper",["action"],[["get",[null]],"onMouseDown"],null],null],["modifier",["action"],[["get",[null]],"onClick"]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","team-planner__tier-grid-tile__portrait"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["unitData","squareIconPath"]],");"]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","team-planner__tier-grid-tile__tierBorder"],["dynamic-attr","style",["concat",["background-image: url(/fe/lol-tft-team-planner/images/cTeamPlanner_ChampionButton_Tier",["unknown",["unitData","tier"]],".png);"]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isEquipped"]]],null,1],["text","  "],["open-element","div",[]],["static-attr","class","team-planner__tier-grid-tile__tooltip-container"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","restrictArea","type"],["right","whole-window","system"]],0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","padding","small"],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n        "],["open-element","p",[]],["static-attr","class","champion-label"],["flush-element"],["append",["unknown",["unitData","display_name"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","team-planner__tier-grid-tile__selected"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                i = n(6);
            const l = "/lol-matchmaking/v1/ready-check",
                r = "/lol-tft-team-planner/v1/team/dirty",
                s = "/lol-tft-team-planner/v1/ftue/hasViewed",
                o = "/lol-tft-team-planner/v1/team/championsById/",
                c = "/lol-tft-team-planner/v1/team/champions",
                m = "/lol-tft-team-planner/v1/team",
                p = "/lol-tft-team-planner/v1/config",
                d = "/lol-tft-team-planner/v1/team/reminders",
                u = a.dataBinding.bindTo(a.socket),
                h = "<br>",
                f = "<expandRow>",
                _ = "<row>",
                g = "</row>",
                v = "<tftActiveRank>",
                b = "<tftInactiveRank>",
                y = "</tftActiveRank>",
                x = "</tftInactiveRank>";
            var T = a.Ember.Service.extend({
                isDragging: !1,
                isVisible: a.Ember.computed.alias("privateApi._componentState.isVisible"),
                isFTUE: a.Ember.computed.alias("privateApi._isFTUE"),
                init() {
                    this._super(...arguments), this.set("tftChampionsByAlias", a.Ember.Map.create()), this.set("tftTraitsById", a.Ember.Map.create()), this.set("tftGameVariationsByAlias", a.Ember.Map.create()), this.set("tftSets", a.Ember.Map.create()), this.set("tftItemsByName", a.Ember.Map.create()), this.set("currentTeamMembers", a.Ember.A()), this.set("currentTeamTraits", a.Ember.A()), a.Ember.RSVP.hash({
                        tftChampionsByAlias: this.privateApi.tftChampionsByAlias,
                        tftTraitsById: this.privateApi.tftTraitsById,
                        tftGameVariationsByAlias: this.privateApi.tftGameVariationsByAlias,
                        tftSets: this.privateApi.tftSets,
                        tftItemsByName: this.privateApi.tftItemsByName,
                        cssSheet: this.privateApi.cssSheet
                    }).then((e => {
                        this.set("tftChampionsByAlias", e.tftChampionsByAlias), this.set("tftTraitsById", e.tftTraitsById), this.set("tftGameVariationsByAlias", e.tftGameVariationsByAlias), this.set("tftSets", e.tftSets), this.set("tftItemsByName", e.tftItemsByName), this.set("cssSheet", e.cssSheet), this.set("tftChampionsByTrait", this._mapTraitsToChampions(e.tftChampionsByAlias)), this._initObservers()
                    }))
                },
                willDestroy() {
                    this._super(...arguments), u.unobserve(r, this), u.unobserve(p, this)
                },
                hasTeamMember(e) {
                    return this.currentTeamMembers.find((t => t === e))
                },
                _initObservers() {
                    u.observe(r, this, (e => {
                        e && (this.set("rawDirtyTeam", e), this._handleLocalTeamChange(e))
                    })), u.observe(p, this, (e => {
                        e && (this.set("remindersFeatureEnabled", e.remindersEnabled), this.set("traitTooltipChampsEnabled", e.traitTooltipChampsEnabled))
                    })), u.observe(d, this, (e => {
                        void 0 !== e && (this.set("remindersEnabled", e), this.get("remindersFeatureEnabled") && (this.privateApi.remindersEnabled = e))
                    })), u.observe(l, this, (e => {
                        e && this.get("isVisible") && "Accepted" === e.playerResponse && this.saveAndExit("match-accept")
                    }))
                },
                _generateTraitCensus(e) {
                    const t = {};
                    return e.forEach((e => {
                        if (!e) return;
                        const n = this.get("tftChampionsByAlias").get(e);
                        n && n.traits.forEach((e => {
                            void 0 === t[e.id] && (t[e.id] = 0), t[e.id] += e.amount
                        }))
                    })), t
                },
                _mapTraitsToChampions(e) {
                    const t = {};
                    return e.forEach((e => {
                        e.traits.forEach((n => {
                            t[n.id] = n.id in t ? t[n.id].concat([e.character_id]) : [e.character_id]
                        }))
                    })), Object.values(t).forEach((e => {
                        e.sort(((e, t) => this.tftChampionsByAlias.get(e).tier - this.tftChampionsByAlias.get(t).tier))
                    })), t
                },
                _calculateTraitLevel(e, t, n) {
                    let a = "kNone",
                        i = 0,
                        l = -1;
                    if (e.conditional_trait_sets.forEach((e => {
                            t >= e.min_units ? (!e.max_units || t <= e.max_units) && (a = e.style_name, i = e.style_idx) : l < 0 && "kChromatic" !== e.style_name && (l = e.min_units)
                        })), -1 === l) {
                        for (let t = e.conditional_trait_sets.length - 1; t >= 0; t--) {
                            const n = e.conditional_trait_sets[t];
                            if ("kChromatic" !== n.style_name) {
                                l = n.min_units;
                                break
                            }
                        } - 1 === l && (l = 0)
                    }
                    n.style = a, n.styleRank = i, n.nextThreshold = l
                },
                _generateTraitData(e) {
                    const t = a.Ember.A(),
                        n = this.get("tftTraitsById"),
                        i = this.get("tftChampionsByTrait");
                    for (const l in e) {
                        const r = e[l],
                            s = n.get(l),
                            o = {};
                        o.id = l, o.displayName = s.display_name, o.icon_path = s.icon_path, o.tooltipText = this._replaceTokens(s.tooltip_text, s, r), o.currentCount = r, o.championsByTrait = i[l], this._calculateTraitLevel(s, r, o);
                        const c = a.Ember.Object.create(o);
                        t.pushObject(c)
                    }
                    return t
                },
                _sortTraitData(e) {
                    e.sort(((e, t) => {
                        if ("kUnique" === e.style && (e.styleRank = 4), "kUnique" === t.style && (t.styleRank = 4), e.styleRank !== t.styleRank) return e.styleRank < t.styleRank ? 1 : -1;
                        if (e.currentCount !== t.currentCount) return e.currentCount < t.currentCount ? 1 : -1;
                        const n = e.nextThreshold > 0 ? e.currentCount / e.nextThreshold : 0,
                            a = t.nextThreshold > 0 ? t.currentCount / t.nextThreshold : 0;
                        return Math.abs(n - a) > Number.EPSILON ? n < a ? 1 : -1 : e.displayName < t.displayName ? -1 : e.displayName > t.displayName ? 1 : 0
                    }))
                },
                _generateTokenSubstitutions(e, t) {
                    const n = {};
                    return n.MinUnits = e.min_units, e.effect_amounts && e.effect_amounts.forEach((e => {
                        n[e.name] = e.value
                    })), t.innate_trait_sets.forEach((e => {
                        e.effect_amounts.forEach((e => {
                            n[e.name] = e.value
                        }))
                    })), n
                },
                _replaceTokens(e, t, n) {
                    const a = e.split(h);
                    let i = "";
                    const l = t.conditional_trait_sets.reduce(((e, t) => {
                            let a = n >= t.min_units;
                            return t.max_units && (a = a && n <= t.max_units), a ? t : e
                        })),
                        r = this._generateTokenSubstitutions(l, t);
                    let s = 0;
                    for (a.forEach((e => {
                            if (0 === e.indexOf(f)) t.conditional_trait_sets.forEach((a => {
                                const l = this._generateTokenSubstitutions(a, t);
                                let r = e,
                                    s = this._replaceFirstToken(r, l);
                                for (; s.didReplace;) r = s.replacedString, s = this._replaceFirstToken(r, l);
                                let o = n >= a.min_units;
                                a.max_units && (o = o && n <= a.max_units), r = r.replace(f, o ? v : b), r = r.replace("</expandRow>", o ? y : x), i += r + h
                            }));
                            else if (0 === e.indexOf(_)) {
                                const a = t.conditional_trait_sets[s],
                                    l = this._generateTokenSubstitutions(a, t);
                                let r = this._replaceFirstToken(e, l);
                                for (; r.didReplace;) e = r.replacedString, r = this._replaceFirstToken(e, l);
                                let o = n >= a.min_units;
                                a.max_units && (o = o && n <= a.max_units), e = o ? (e = e.replace(_, v)).replace(g, y) : (e = e.replace(_, b)).replace(g, x), s++, i += e + h
                            } else {
                                let t = this._replaceFirstToken(e, r);
                                for (; t.didReplace;) e = t.replacedString, t = this._replaceFirstToken(e, r);
                                i += e + h
                            }
                            i = this._replaceAllIconTokens(i)
                        })), i = i.trim(); i.endsWith(h);) i = i.slice(0, i.length - 4), i = i.trim();
                    return i
                },
                _replaceFirstToken(e, t) {
                    const n = this._getTokenInfo(e);
                    if (!n) return {
                        replacedString: e,
                        didReplace: !1,
                        error: !1
                    };
                    let a = !1,
                        i = t[n.token],
                        l = "";
                    if (i) {
                        if (i *= n.multiplier, -1 === n.precision) {
                            n.precision = 2;
                            const e = Math.pow(10, n.precision);
                            let t = Math.floor(i * e);
                            for (; t % 10 == 0 && n.precision > 0;) t /= 10, n.precision -= 1
                        }
                        l = i.toFixed(n.precision)
                    } else a = !0;
                    return {
                        replacedString: e.slice(0, n.start) + l + e.slice(n.end + 1, e.end),
                        didReplace: !0,
                        error: a
                    }
                },
                _replaceAllIconTokens(e) {
                    let t = "",
                        n = this._getIconTokenInfo(e);
                    for (; null != n;) t += e.slice(0, n.start) + this._getCssIcon(n.token), e = e.slice(n.end + 1, e.end), n = this._getIconTokenInfo(e);
                    return t += e, t
                },
                _getCssIcon(e) {
                    const t = this.get("cssSheet"),
                        n = t.iconTexture,
                        a = t.iconData.get(e);
                    return a ? '<div class="cssIcon" style="width: ' + a.wh.x + "px; height: " + a.wh.y + "px; background-image: url(" + n + "); background-position: " + -a.xy.x + "px " + -a.xy.y + "px; margin-bottom: " + -a.yAdjustment + 'px; "></div>' : e
                },
                _getIconTokenInfo(e) {
                    const t = "%i:";
                    let n = -1,
                        a = -1,
                        i = 0;
                    for (i = 0; i < e.length; i++)
                        if (-1 === n) {
                            if (e.substring(i, i + 3) === t) {
                                n = i;
                                continue
                            }
                        } else if ("%" === e[i]) {
                        a = i;
                        break
                    }
                    return -1 === n || -1 === a ? null : {
                        start: n,
                        end: a,
                        token: e.substring(n + 3, i)
                    }
                },
                _getTokenInfo(e) {
                    const t = e.indexOf("@");
                    if (-1 === t) return null;
                    const n = e.slice(t + 1, e.length).indexOf("@") + t + 1;
                    if (-1 === n) return null;
                    let i = e.slice(t + 1, n);
                    const l = i.indexOf("*");
                    let r = 1;
                    if (-1 !== l) {
                        const t = i.slice(l + 1, i.length);
                        i = i.slice(0, l), r = Number(t), Number.isNaN(r) && (a.logger.warning("Found illegal multiplier " + t + " when parsing the first token of " + e), r = 1)
                    }
                    const s = i.indexOf(":");
                    let o;
                    o = s < 0 ? i.indexOf(".") : i.indexOf(".", s);
                    let c = -1;
                    if (-1 !== o) {
                        const t = i.slice(o + 1, i.length);
                        i = i.slice(0, o), c = Math.floor(parseFloat(t)), Number.isNaN(c) && (a.logger.warn("Found illegal precision " + t + " when parsing the first token of " + e), c = -1)
                    }
                    return {
                        start: t,
                        end: n,
                        precision: c,
                        multiplier: r,
                        token: i
                    }
                },
                _handleLocalTeamChange(e) {
                    const t = a.Ember.A();
                    e.champions.forEach((e => {
                        t.push(e.championId)
                    })), this.set("currentTeamMembers", t);
                    const n = this._generateTraitCensus(t),
                        i = this._generateTraitData(n);
                    this._sortTraitData(i), this.set("currentTeamTraits", i)
                },
                setRemindersTooltipElement(e) {
                    this.set("remindersTooltip", e)
                },
                addChampionById(e) {
                    e && u.post(o + e).then((() => {
                        i.SFX.addChampion.play()
                    })).catch((() => {
                        i.SFX.failAddChampion.play()
                    }))
                },
                removeChampionById(e) {
                    e && u.delete(o + e).then((() => {
                        i.SFX.removeChampion.play()
                    }))
                },
                addChampionByIndex(e, t) {
                    t && u.post(c + "/" + e, t).then((() => {
                        i.SFX.addChampion.play()
                    })).catch((() => {
                        i.SFX.failAddChampion.play()
                    }))
                },
                removeChampionByIndex(e) {
                    u.delete(c + "/" + e).then((() => {
                        i.SFX.removeChampion.play()
                    }))
                },
                swapChampionsByIndex(e, t) {
                    u.patch(c, [e, t])
                },
                setRemindersEnabled(e) {
                    u.patch(d, e)
                },
                saveAndExit(e = "tft-teamPlanner") {
                    this.get("remindersFeatureEnabled") && u.patch(s, !0), u.put(m), this.privateApi.hide(e)
                },
                incrementRemindersClickedCount() {
                    this.privateApi.remindersClickedCount++
                }
            });
            t.default = T
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(43);
            var i = n(6),
                l = a.Ember.Component.extend({
                    layout: n(44),
                    classNames: ["team-planner__reminders-toggle-component"],
                    teamPlannerService: a.Ember.inject.service("TeamPlanner"),
                    showRemindersOn: a.Ember.computed.alias("teamPlannerService.remindersEnabled"),
                    didInsertElement() {
                        const e = this.element.querySelector(".team-planner__header-container__tooltip-icon");
                        this.get("teamPlannerService").setRemindersTooltipElement(e)
                    },
                    actions: {
                        remindersToggleClick() {
                            i.SFX.toggleRemindersEnabled.play(), this.get("teamPlannerService").setRemindersEnabled(!this.get("showRemindersOn")), this.get("teamPlannerService").incrementRemindersClickedCount()
                        },
                        onMouseEnterInfoButton(e) {
                            i.SFX.hoverInfoButton.play()
                        },
                        onMouseEnterToggle(e) {
                            i.SFX.hoverRemindersToggle.play()
                        }
                    }
                });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "mhcUSiu3",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\reminders-toggle.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\reminders-toggle.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["team-planner__reminders-toggle ",["helper",["if"],[["get",["showRemindersOn"]],"on"],null]]]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-info-icon",[]],["static-attr","class","team-planner__header-container__tooltip-icon"],["dynamic-attr","onMouseEnter",["helper",["action"],[["get",[null]],"onMouseEnterInfoButton"],null],null],["static-attr","noClick","true"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["bottom"]],0],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","toggle-container animated"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"remindersToggleClick"],null],null],["dynamic-attr","onMouseEnter",["helper",["action"],[["get",[null]],"onMouseEnterToggle"],null],null],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","open"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","toggle-button animated"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","team-planner__tooltip-title"],["flush-element"],["append",["unknown",["tra","teamplanner_reminders_toggle_tooltip_title"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","team-planner__tooltip-body"],["flush-element"],["append",["unknown",["tra","teamplanner_reminders_toggle_tooltip_body"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            var a = n(46),
                i = n(47);
            e.exports = function(e, t, n) {
                var l = t && n || 0;
                "string" == typeof e && (t = "binary" === e ? new Array(16) : null, e = null);
                var r = (e = e || {}).random || (e.rng || a)();
                if (r[6] = 15 & r[6] | 64, r[8] = 63 & r[8] | 128, t)
                    for (var s = 0; s < 16; ++s) t[l + s] = r[s];
                return t || i(r)
            }
        }, e => {
            var t = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
            if (t) {
                var n = new Uint8Array(16);
                e.exports = function() {
                    return t(n), n
                }
            } else {
                var a = new Array(16);
                e.exports = function() {
                    for (var e, t = 0; t < 16; t++) 0 == (3 & t) && (e = 4294967296 * Math.random()), a[t] = e >>> ((3 & t) << 3) & 255;
                    return a
                }
            }
        }, e => {
            for (var t = [], n = 0; n < 256; ++n) t[n] = (n + 256).toString(16).substr(1);
            e.exports = function(e, n) {
                var a = n || 0,
                    i = t;
                return [i[e[a++]], i[e[a++]], i[e[a++]], i[e[a++]], "-", i[e[a++]], i[e[a++]], "-", i[e[a++]], i[e[a++]], "-", i[e[a++]], i[e[a++]], "-", i[e[a++]], i[e[a++]], i[e[a++]], i[e[a++]], i[e[a++]], i[e[a++]]].join("")
            }
        }, (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            t.default = class {
                constructor(e) {
                    this._privateApi = e
                }
                show(e) {
                    this._privateApi.show(e)
                }
                hide(e) {
                    this._privateApi.hide(e)
                }
                getEnabled() {
                    return this._privateApi.getEnabled()
                }
            }
        }],
        t = {};

    function n(a) {
        var i = t[a];
        if (void 0 !== i) return i.exports;
        var l = t[a] = {
            exports: {}
        };
        return e[a](l, l.exports, n), l.exports
    }
    n.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.p = "/fe/lol-tft-team-planner/", (() => {
        "use strict";
        var e, t = (e = n(1)) && e.__esModule ? e : {
                default: e
            },
            a = n(2);
        const i = document.currentScript.ownerDocument;
        const l = window.getPluginAnnounceEventName(a.PLUGIN_NAME);
        i.addEventListener(l, (function(e) {
            (0, e.registrationHandler)((async function(e) {
                await t.default.init(e, {
                    Audio: e => e.get("rcp-fe-audio"),
                    AudioPlugin: e => e.get("rcp-fe-audio"),
                    ComponentFactory: e => e.get("rcp-fe-common-libs").getComponentFactory("1"),
                    dataBinding: e => e.get("rcp-fe-common-libs").getDataBinding(a.PLUGIN_NAME),
                    emberApplicationFactory: e => e.get("rcp-fe-ember-libs").getEmberApplicationFactory(),
                    emberL10n: e => e.get("rcp-fe-ember-libs").getEmberL10n("1"),
                    Ember: e => e.get("rcp-fe-ember-libs").getEmber(),
                    EmberDataBinding: e => e.get("rcp-fe-ember-libs").getEmberDataBinding(a.PLUGIN_NAME),
                    LayerManager: e => e.get("rcp-fe-lol-uikit").getLayerManager(),
                    ModalManager: e => e.get("rcp-fe-lol-uikit").getModalManager(),
                    Navigation: e => e.get("rcp-fe-lol-navigation"),
                    SharedComponents: e => e.get("rcp-fe-lol-shared-components"),
                    socket: e => e.getSocket(),
                    Telemetry: e => e.get("rcp-fe-common-libs").getTelemetry("1"),
                    TooltipManager: e => e.get("rcp-fe-lol-uikit").getTooltipManager(),
                    UIKit: e => e.get("rcp-fe-lol-uikit")
                }).then((() => {
                    const n = e.get("rcp-fe-lol-l10n").tra().overlay("/fe/lol-tft-team-planner/trans.json"),
                        a = t.default.emberL10n(t.default.Ember, n);
                    return t.default.add({
                        db: t.default.dataBinding.bindTo(e.getSocket()),
                        EmberAddons: e => e.get("rcp-fe-ember-libs").getSharedEmberAddons(),
                        emberApplicationFactory: e => e.get("rcp-fe-ember-libs").getEmberApplicationFactory(),
                        tra: n,
                        traService: a
                    })
                }));
                const i = new(0, n(3).default);
                return new(0, n(48).default)(i)
            }))
        }), {
            once: !0
        })
    })()
})();