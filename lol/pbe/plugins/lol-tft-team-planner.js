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
                        const l = e[a],
                            s = n._getValue(a, l);
                        s && s.then ? (s.then((function(e) {
                            e || console.warn("The promise for the key " + a + " resolved with a falsy value: ", e), n._addValue(a, e)
                        })), t.push(s)) : n._addValue(a, s)
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
                l = n(4),
                s = n(6),
                r = y(n(7)),
                i = y(n(10)),
                o = y(n(13)),
                c = y(n(16)),
                m = y(n(19)),
                p = y(n(22)),
                d = y(n(26)),
                u = y(n(29)),
                h = y(n(32)),
                f = y(n(35)),
                g = y(n(38)),
                _ = y(n(41)),
                v = y(n(44)),
                b = y(n(45));

            function y(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            const x = a.dataBinding.bindTo(a.socket),
                k = "tft-team-planner",
                T = n(48);
            t.default = class {
                constructor() {
                    this._teamPlannerInstance = null, this._config = null, this._enabled = !1, this._registerComponents(), this._initObservers(), this.tftChampionsByAlias = l.tftChampionsByAlias, this.tftItemsByName = l.tftItemsByName, this.cssSheet = l.cssSheet, this.tftTraitsById = l.tftTraitsById, this.tftGameVariationsByAlias = l.tftGameVariationsByAlias, this.tftSets = l.tftSets, this.teamplannerSessionId = null, this.sessionStartTime_ms = 0, this.activatedFromSource = ""
                }
                _registerComponents() {
                    const e = {
                        tra: a.traService,
                        ComponentFactory: a.ComponentFactory,
                        TeamPlannerRootComponent: r.default.extend({
                            privateApi: this
                        }),
                        HeaderContainerComponent: i.default,
                        TiersListContainerComponent: o.default,
                        TeamContainerComponent: c.default,
                        TeamGridComponent: m.default,
                        TeamGridTileComponent: p.default,
                        TeamGridTileTraitIconComponent: d.default,
                        TeamTraitsContainerComponent: u.default,
                        TeamTraitComponent: h.default,
                        TierContainerComponent: f.default,
                        TierGridComponent: g.default,
                        TierGridTileComponent: _.default,
                        TeamPlannerService: v.default.extend({
                            privateApi: this
                        }),
                        RemindersToggleComponent: b.default
                    };
                    a.emberApplicationFactory.setFactoryDefinition(k, e)
                }
                _createTeamPlannerInstance() {
                    return this._componentState = a.Ember.Object.create({
                        isVisible: !1
                    }), this._teamPlannerInstance = a.ComponentFactory.create({
                        type: k,
                        data: this._componentState
                    }), this._teamPlannerInstance
                }
                _initObservers() {
                    x.addObserver("/lol-tft-team-planner/v1/config", this, (e => {
                        e && (this._config = e, this._enabled = e.enabled)
                    })), x.addObserver("/lol-tft-team-planner/v1/ftue/hasViewed", this, (e => {
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
                        s.SFX.openFlyout.play(), this.teamplannerSessionId = T(), this.activatedFromSource = e, this.sessionStartTime_ms = Date.now(), this.remindersClickedCount = 0
                    }
                }
                hide(e) {
                    if (!this._componentState.get("isVisible")) return;
                    this._componentState.set("isVisible", !1), a.LayerManager.removeLayer(this._teamPlannerInstance.domNode), s.SFX.closeFlyout.play();
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
                l = n(5);
            const s = a.Ember.Object.extend(l.DataBindingMixin, l.FixDataBindingMixin, {
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
                r = s.create();
            e.exports = {
                TftGameData: s,
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
            const l = (0, a.EmberDataBinding)({
                    Ember: a.Ember,
                    logPrefix: "rcp-fe-lol-tft:mixins:data-binding",
                    basePaths: {
                        gameData: "/lol-game-data"
                    }
                }),
                s = a.Ember.Mixin.create({
                    retrieveData(e, t, n) {
                        return this.get(e).get(t, n).then((e => e ? Promise.resolve(e) : Promise.reject(void 0)))
                    }
                });
            e.exports = {
                FixDataBindingMixin: s,
                DataBindingMixin: l
            }
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.SFX = void 0;
            const a = n(1).AudioPlugin.getChannel("sfx-ui");

            function l(e) {
                return a.createSound(e, {
                    allowConcurrency: !1
                })
            }
            const s = {
                closeClick: l("/fe/lol-static-assets/sounds/sfx-uikit-grid-click.ogg"),
                openFlyout: l("/fe/lol-static-assets/sounds/skin-viewer/sfx-uikit-button-flyout-open-click.ogg"),
                closeFlyout: l("/fe/lol-static-assets/sounds/skin-viewer/sfx-uikit-button-flyout-close-click.ogg"),
                hoverChampionTier: l("/fe/lol-static-assets/sounds/sfx-uikit-button-circlegold-hover.ogg"),
                addChampion: l("/fe/lol-static-assets/sounds/sfx-uikit-button-text-click.ogg"),
                failAddChampion: l("/fe/lol-static-assets/sounds/sfx-uikit-edit-click.ogg"),
                removeChampion: l("/fe/lol-static-assets/sounds/sfx-uikit-button-generic-click.ogg"),
                hoverChampionTeam: l("/fe/lol-static-assets/sounds/sfx-uikit-button-gold-hover.ogg"),
                tileMousedown: l("/fe/lol-static-assets/sounds/sfx-uikit-click-generic.ogg"),
                dragStart: l("/fe/lol-static-assets/sounds/sfx-uikit-grid-drag.ogg"),
                dragRelease: l("/fe/lol-uikit/sfx-uikit-dropdown-click.ogg"),
                hoverTrait: l("/fe/lol-static-assets/sounds/sfx-uikit-button-circlegold-hover.ogg"),
                clickTrait: l("/fe/lol-static-assets/sounds/sfx-uikit-button-circlegold-click.ogg"),
                hoverInfoButton: l("/fe/lol-static-assets/sounds/sfx-uikit-button-circlegold-hover.ogg"),
                hoverRemindersToggle: l("/fe/lol-static-assets/sounds/sfx-uikit-button-circlegold-hover.ogg"),
                toggleRemindersEnabled: l("/fe/lol-uikit/sfx-uikit-button-circlex-click.ogg"),
                clearTeamURL: "/fe/lol-static-assets/sounds/sfx-uikit-button-big-click.ogg"
            };
            t.SFX = s
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(8);
            var l = n(6),
                s = a.Ember.Component.extend({
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
                            l.SFX.closeClick.play()
                        })))
                    },
                    willDestroyElement() {
                        this._super(...arguments), this.element.removeEventListener("dialogFrameDismissed", (() => {
                            this.get("teamPlannerService").saveAndExit()
                        }));
                        const e = this.element.querySelector("lol-uikit-dialog-frame").shadowRoot.querySelector("lol-uikit-close-button");
                        e && e.removeEventListener("mousedown", (e => {
                            l.SFX.closeClick.play()
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
            t.default = s
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "714BkZVS",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\team-planner-root.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\team-planner-root.styl\\" js-path=\\"null\\" "],["text","\\n"],["block",["if"],["isVisible"],null,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","team-planner-root__content"],["flush-element"],["text","\\n            "],["append",["unknown",["tiers-list-container"]],false],["text","\\n            "],["append",["unknown",["team-container"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","team-planner-root__spinner"],["flush-element"],["text"," "],["append",["unknown",["uikit-spinner"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","lol-uikit-full-page-backdrop",[]],["static-attr","class","team-planner-backdrop"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","team-planner-backdrop__click-elem"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"close"],null],null],["flush-element"],["close-element"],["text","\\n    "],["open-element","lol-uikit-dialog-frame",[]],["static-attr","frame","bordered"],["static-attr","dismissable","true"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner-root"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isLoading"]]],null,1,0],["text","      "],["close-element"],["text"," \\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(11);
            var l = a.Ember.Component.extend({
                layout: n(12),
                classNames: ["team-planner__header-container-component"],
                teamPlannerService: a.Ember.inject.service("TeamPlanner"),
                remindersFeatureEnabled: a.Ember.computed.alias("teamPlannerService.remindersFeatureEnabled"),
                championCount: a.Ember.computed("teamPlannerService.tftChampionsByAlias", (function() {
                    return this.get("teamPlannerService").tftChampionsByAlias.size
                }))
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "kDMf6EPe",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\header-container.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\header-container.styl\\" js-path=\\"null\\" "],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","team-planner__header-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","team-planner__header-container__title"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","title_tft_teamplanner"]],false],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["remindersFeatureEnabled"]]],null,0],["close-element"],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","team-planner__header-container__reminders"],["flush-element"],["text","\\n      "],["append",["unknown",["reminders-toggle"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(14);
            var l = a.Ember.Component.extend({
                layout: n(15),
                classNames: ["team-planner__tiers-list-container-component"],
                teamPlannerService: a.Ember.inject.service("TeamPlanner"),
                tierListData: a.Ember.computed("teamPlannerService.tftChampionsByAlias", "tra", (function() {
                    const e = [],
                        t = [],
                        n = {};
                    return this.get("teamPlannerService").tftChampionsByAlias.forEach(((e, a) => {
                        const l = e.tier;
                        l in n || (n[l] = {
                            tierLevel: l,
                            tierCost: l,
                            unitListData: []
                        }, t.push(l)), n[l].unitListData.push(e)
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
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "GcpiIoME",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\tiers-list-container.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\tiers-list-container.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","team-planner__tiers-list-container"],["flush-element"],["text","\\n  "],["append",["unknown",["header-container"]],false],["text","\\n  "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","team-planner__tiers-list-container__scrollable-content"],["flush-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","onDrop",["helper",["action"],[["get",[null]],"onDrop"],null],null],["dynamic-attr","onDragOver",["helper",["action"],[["get",[null]],"onDragOver"],null],null],["flush-element"],["text","\\n"],["block",["each"],[["get",["tierListData"]]],null,0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["helper",["tier-container"],null,[["tierData"],[["get",["tierData"]]]]],false],["text","\\n"]],"locals":["tierData"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(17);
            var l = n(6);
            const s = a.dataBinding.bindTo(a.socket);
            var r = a.Ember.Component.extend({
                layout: n(18),
                classNames: ["team-planner__team-container-component"],
                clearTeamSfxUrl: l.SFX.clearTeamURL,
                actions: {
                    clearTeam() {
                        s.delete("/lol-tft-team-planner/v1/team/champions")
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
                id: "7wUR/0lw",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\team-container.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\team-container.styl\\" js-path=\\"null\\" "],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","team-planner__team-container"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","team-planner__team-container__clear-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"clearTeam"],null],null],["dynamic-attr","click-sfx-src",["unknown",["clearTeamSfxUrl"]],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","buttontext_teamplanner_clear_all"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["append",["unknown",["team-grid"]],false],["text","\\n  "],["append",["unknown",["team-traits-container"]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(20);
            var l = a.Ember.Component.extend({
                layout: n(21),
                classNames: ["team-planner__team-grid-component"],
                teamPlannerService: a.Ember.inject.service("TeamPlanner"),
                teamCompData: a.Ember.computed("teamPlannerService.tftChampionsByAlias", "teamPlannerService.currentTeamMembers", (function() {
                    const e = this.get("teamPlannerService"),
                        t = e.currentTeamMembers,
                        n = e.tftChampionsByAlias,
                        l = a.Ember.A();
                    return t.forEach((e => {
                        "" === e ? l.push(a.Ember.Map.create()) : l.push(n.get(e))
                    })), l
                }))
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "QU9SHWFx",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\team-grid.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\team-grid.styl\\" js-path=\\"null\\" "],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","team-planner__team-grid"],["flush-element"],["text","\\n"],["block",["each"],[["get",["teamCompData"]]],null,0],["close-element"],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["team-grid-tile"],null,[["tileData","teamIndex"],[["get",["tileData"]],["get",["index"]]]]],false],["text","\\n"]],"locals":["tileData","index"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(23);
            var l = n(6);
            new Promise(((e, t) => {
                const a = new Image,
                    l = () => {
                        a.onload = a.onerror = null
                    };
                a.onload = () => {
                    l(), e()
                }, a.onerror = e => {
                    l(), t(e)
                }, a.src = n(24)
            }));
            var s = a.Ember.Component.extend({
                layout: n(25),
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
                        e.dataTransfer.setDragImage(t, n, a), e.dataTransfer.setData("srcId", this.get("unitData.character_id")), e.dataTransfer.setData("srcTeamIndex", this.get("teamIndex")), this.set("activeDropZone", "inactiveDropZone"), this.set("isDragging", !0), l.SFX.dragStart.play()
                    },
                    onDragEnd(e) {
                        this.set("isDragging", !1), this.element.classList.remove("team-planner__team-grid-tile__dragging"), this.set("activeDropZone", "activeDropZone"), l.SFX.dragRelease.play()
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
                        this.get("hasChampion") && l.SFX.hoverChampionTeam.play()
                    },
                    onMouseDown(e) {
                        this.get("hasChampion") && l.SFX.tileMousedown.play()
                    }
                }
            });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            "use strict";
            e.exports = n.p + "cTeamPlanner_ChampionHighlight_HoverSelector.png"
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "7Mmo8fYZ",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\team-grid-tile.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\team-grid-tile.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["team-planner__team-grid-tile ",["helper",["if"],[["get",["hasChampion"]],"team-grid-tile--enabled"],null]]]],["dynamic-attr","draggable",["unknown",["hasChampion"]],null],["dynamic-attr","onDragStart",["helper",["action"],[["get",[null]],"onDragStart"],null],null],["dynamic-attr","onDragEnd",["helper",["action"],[["get",[null]],"onDragEnd"],null],null],["dynamic-attr","onMouseOver",["helper",["action"],[["get",[null]],"onMouseOver"],null],null],["dynamic-attr","onMouseDown",["helper",["action"],[["get",[null]],"onMouseDown"],null],null],["modifier",["action"],[["get",[null]],"onClick"]],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasChampion"]]],null,4,3],["block",["if"],[["get",["tileData","tier"]]],null,2],["text","  "],["open-element","div",[]],["static-attr","class","team-planner__team-grid-tile__hover-state"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isDragging"]]],null,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["team-planner__team-grid-tile__drop-zone ",["unknown",["activeDropZone"]]]]],["dynamic-attr","onDragEnter",["helper",["action"],[["get",[null]],"onDragEnter"],null],null],["dynamic-attr","onDragLeave",["helper",["action"],[["get",[null]],"onDragLeave"],null],null],["dynamic-attr","onDrop",["helper",["action"],[["get",[null]],"onDrop"],null],null],["dynamic-attr","onDragOver",["helper",["action"],[["get",[null]],"onDragOver"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["helper",["team-grid-tile-trait-icon"],null,[["traitId"],[["get",["trait","id"]]]]],false],["text","\\n"]],"locals":["trait"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","team-planner__team-grid-tile__image-overlay"],["dynamic-attr","style",["concat",["background-image: url(/fe/lol-tft-team-planner/images/cTeamPlanner_Member_Tier",["unknown",["tileData","tier"]],".png);"]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner__team-grid-tile__champion-title"],["flush-element"],["text","\\n        "],["append",["unknown",["tileData","display_name"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner__team-grid-tile__trait-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["tileData","traits"]]],null,1],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","team-planner__team-grid-tile__image-overlay"],["static-attr","style","background-image: url(/fe/lol-tft-team-planner/images/cTeamPlanner_ChampionButton_Empty.png);"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","team-planner__team-grid-tile__image-overlay"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["tileData","squareSplashIconPath"]],");"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            var a = n(1);
            n(27), e.exports = a.Ember.Component.extend({
                layout: n(28),
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
                id: "st6XV8SG",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\team-grid-tile-trait-icon.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\team-grid-tile-trait-icon.styl\\" js-path=\\"null\\" "],["text","\\n"],["block",["if"],[["get",["trait","icon_path"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["team-planner__team-grid-tile-trait-icon__background ",["unknown",["setlessTraitId"]]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","team-planner__team-grid-tile-trait-icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["trait","icon_path"]],");"]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(30);
            var l = function(e, t) {
                if (!t && e && e.__esModule) return e;
                if (null === e || "object" != typeof e && "function" != typeof e) return {
                    default: e
                };
                var n = s(t);
                if (n && n.has(e)) return n.get(e);
                var a = {},
                    l = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var r in e)
                    if ("default" !== r && Object.prototype.hasOwnProperty.call(e, r)) {
                        var i = l ? Object.getOwnPropertyDescriptor(e, r) : null;
                        i && (i.get || i.set) ? Object.defineProperty(a, r, i) : a[r] = e[r]
                    } a.default = e, n && n.set(e, a);
                return a
            }(n(6));

            function s(e) {
                if ("function" != typeof WeakMap) return null;
                var t = new WeakMap,
                    n = new WeakMap;
                return (s = function(e) {
                    return e ? n : t
                })(e)
            }
            var r = a.Ember.Component.extend({
                layout: n(31),
                classNames: ["team-planner__team-traits-container-component"],
                teamPlannerService: a.Ember.inject.service("TeamPlanner"),
                traitData: a.Ember.computed.alias("teamPlannerService.currentTeamTraits"),
                isTeamEmpty: a.Ember.computed("traitData", (function() {
                    return !this.get("traitData.length")
                })),
                maxPages: a.Ember.computed("traitData", (function() {
                    return Math.trunc((this.get("traitData").length - 1) / 6)
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
                    const t = 6 * this.get("currentPage"),
                        n = t + Math.min(e.length - t, 6),
                        a = [];
                    for (let l = t; l < n; ++l) a[l - t] = e[l];
                    for (let e = a.length; e < 6; ++e) a[e] = null;
                    return a
                })),
                hiddenTraitCount: a.Ember.computed("traitData", "currentPage", (function() {
                    const e = this.get("traitData.length");
                    return e ? e - Math.min(e - 6 * this.get("currentPage"), 6) : 0
                })),
                actions: {
                    onMouseOver() {
                        l.SFX.hoverTrait.play()
                    },
                    nextPage() {
                        this.set("currentPage", this.get("currentPage") + 1), l.SFX.clickTrait.play()
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
                id: "3j1d8LNk",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\team-traits-container.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\team-traits-container.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","team-planner__team-traits-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isTeamEmpty"]]],null,4,3],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait-container__next-page-button__hide"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait-container__next-page-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"nextPage"],null],null],["dynamic-attr","onMouseOver",["helper",["action"],[["get",[null]],"onMouseOver"],null],null],["flush-element"],["text","\\n        "],["open-element","p",[]],["static-attr","class","team-planner__team-trait-container__text"],["flush-element"],["text","+"],["append",["unknown",["hiddenTraitCount"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["team-trait"],null,[["trait"],[["get",["tData"]]]]],false],["text","\\n"]],"locals":["tData"]},{"statements":[["block",["each"],[["get",["visibleTraits"]]],null,2],["block",["if"],[["get",["maxPages"]]],null,1,0]],"locals":[]},{"statements":[["text","    "],["open-element","p",[]],["static-attr","class","team-planner__team-trait-container__no-traits-text"],["flush-element"],["append",["unknown",["tra","teamplanner_traits_empty_message"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(33);
            var l = n(6),
                s = a.Ember.Component.extend({
                    layout: n(34),
                    classNames: ["team-planner__team-trait-component"],
                    trait: null,
                    isThreat: a.Ember.computed("trait", (function() {
                        return this.get("trait") && "kThreat" === this.get("trait.style")
                    })),
                    actions: {
                        onMouseEnter() {
                            l.SFX.hoverTrait.play()
                        }
                    }
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "rlTiQLRe",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\team-trait.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\team-trait.styl\\" js-path=\\"null\\" "],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","team-planner__team-trait"],["dynamic-attr","onMouseEnter",["helper",["if"],[["get",["trait"]],["helper",["action"],[["get",[null]],"onMouseEnter"],null]],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["trait"]]],null,4,0],["close-element"],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","team-planner__team-trait__background__empty"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait__background"],["dynamic-attr","style",["concat",["background-image: url(/fe/lol-tft-team-planner/images/cTeamPlanner_ActiveTrait_",["unknown",["trait","style"]],".png)"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait__icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["trait","icon_path"]],");  ",["helper",["if"],[["get",["trait","styleRank"]],"filter: brightness(0);"],null]]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait__hover-state"],["static-attr","style","background-image: url(/fe/lol-tft-team-planner/images/TFT_HUD_Trait_Hovered.png);"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait__text"],["flush-element"],["append",["unknown",["trait","currentCount"]],false],["text","/"],["append",["unknown",["trait","nextThreshold"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait__background__threat"],["dynamic-attr","style",["concat",["background-image: url(/fe/lol-tft-team-planner/images/cTeamPlanner_ActiveTrait_",["unknown",["trait","style"]],".png)"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait__icon__threat"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["trait","icon_path"]],");"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait__hover-state"],["static-attr","style","background-image: url(/fe/lol-tft-team-planner/images/TFT_HUD_Threat_Hovered.png);"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-planner__team-trait__text"],["flush-element"],["append",["unknown",["trait","currentCount"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","padding","small"],["static-attr","type","dialog"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","trait-tooltip-icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["trait","icon_path"]],");"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","trait-title"],["flush-element"],["append",["unknown",["trait","displayName"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","trait-tooltip-line"],["flush-element"],["close-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","trait-label"],["flush-element"],["append",["unknown",["trait","tooltipText"]],true],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","restrictArea","type"],["top","whole-window","system"]],3],["text","\\n"],["block",["if"],[["get",["isThreat"]]],null,2,1]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(36);
            var l = a.Ember.Component.extend({
                layout: n(37),
                classNames: ["team-planner__tier-container-component"],
                tierData: null
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "jh44r5Xx",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\tier-container.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\tier-container.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","team-planner__tier-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","team-planner__tier-container__header"],["flush-element"],["text","\\n    "],["open-element","p",[]],["static-attr","class","team-planner__tier-container__header__title"],["flush-element"],["append",["unknown",["tierData","tierTitle"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","team-planner__tier-container__header__cost"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","src","/fe/lol-tft/images/home/TFT_Icon_Coins.png"],["static-attr","class","team-planner__tier-container__header__cost__icon"],["flush-element"],["close-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","team-planner__tier-container__header__cost__text"],["flush-element"],["append",["unknown",["tierData","tierCost"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["append",["helper",["tier-grid"],null,[["unitListData"],[["get",["tierData","unitListData"]]]]],false],["text","\\n"],["close-element"],["text","\\n\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(39);
            var l = a.Ember.Component.extend({
                layout: n(40),
                classNames: ["team-planner__tier-grid-component"],
                unitListData: null
            });
            t.default = l
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "dFgrrwCg",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\tier-grid.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\tier-grid.styl\\" js-path=\\"null\\" "],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","team-planner__tier-grid"],["flush-element"],["text","\\n"],["block",["each"],[["get",["unitListData"]]],null,0],["close-element"],["text","\\n\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["tier-grid-tile"],null,[["unitData"],[["get",["unitData"]]]]],false],["text","\\n"]],"locals":["unitData"]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(42);
            var l = n(6),
                s = a.Ember.Component.extend({
                    layout: n(43),
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
                            l.SFX.tileMousedown.play()
                        },
                        onDragStart(e) {
                            this.set("isDragging", !0), this.element.classList.add("team-planner__tier-grid-tile__dragging"), e.dataTransfer.effectAllowed = "copyMove";
                            const t = this.element.querySelector(".team-planner__tier-grid-tile__portrait"),
                                n = .5 * t.offsetWidth,
                                a = .5 * t.offsetHeight;
                            e.dataTransfer.setDragImage(t, n, a), e.dataTransfer.setData("srcId", this.get("unitData.character_id")), e.dataTransfer.setData("srcTeamIndex", -1), l.SFX.dragStart.play()
                        },
                        onDragEnd(e) {
                            this.set("isDragging", !1), this.element.classList.remove("team-planner__tier-grid-tile__dragging"), l.SFX.dragRelease.play()
                        },
                        onMouseOver(e) {
                            l.SFX.hoverChampionTier.play()
                        }
                    }
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "PxgKDK2Z",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\tier-grid-tile.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\tier-grid-tile.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","team-planner__tier-grid-tile"],["dynamic-attr","draggable",["unknown",["isDraggable"]],null],["dynamic-attr","onDragStart",["helper",["action"],[["get",[null]],"onDragStart"],null],null],["dynamic-attr","onDragEnd",["helper",["action"],[["get",[null]],"onDragEnd"],null],null],["dynamic-attr","onMouseOver",["helper",["action"],[["get",[null]],"onMouseOver"],null],null],["dynamic-attr","onMouseDown",["helper",["action"],[["get",[null]],"onMouseDown"],null],null],["modifier",["action"],[["get",[null]],"onClick"]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","team-planner__tier-grid-tile__portrait"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["unitData","squareIconPath"]],");"]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","team-planner__tier-grid-tile__tierBorder"],["dynamic-attr","style",["concat",["background-image: url(/fe/lol-tft-team-planner/images/cTeamPlanner_ChampionButton_Tier",["unknown",["unitData","tier"]],".png);"]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isEquipped"]]],null,1],["text","  "],["open-element","div",[]],["static-attr","class","team-planner__tier-grid-tile__tooltip-container"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","restrictArea","type"],["right","whole-window","system"]],0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","padding","small"],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n        "],["open-element","p",[]],["static-attr","class","champion-label"],["flush-element"],["append",["unknown",["unitData","display_name"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","team-planner__tier-grid-tile__selected"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1),
                l = n(6);
            const s = "/lol-matchmaking/v1/ready-check",
                r = "/lol-tft-team-planner/v1/team/dirty",
                i = "/lol-tft-team-planner/v1/ftue/hasViewed",
                o = "/lol-tft-team-planner/v1/team/championsById/",
                c = "/lol-tft-team-planner/v1/team/champions",
                m = "/lol-tft-team-planner/v1/team",
                p = "/lol-tft-team-planner/v1/config",
                d = "/lol-tft-team-planner/v1/team/reminders",
                u = a.dataBinding.bindTo(a.socket),
                h = "<br>",
                f = "<expandRow>",
                g = "<row>",
                _ = "</row>",
                v = "<tftActiveRank>",
                b = "<tftInactiveRank>",
                y = "</tftActiveRank>",
                x = "</tftInactiveRank>";
            var k = a.Ember.Service.extend({
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
                        this.set("tftChampionsByAlias", e.tftChampionsByAlias), this.set("tftTraitsById", e.tftTraitsById), this.set("tftGameVariationsByAlias", e.tftGameVariationsByAlias), this.set("tftSets", e.tftSets), this.set("tftItemsByName", e.tftItemsByName), this.set("cssSheet", e.cssSheet), this._initObservers()
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
                        e && this.set("remindersFeatureEnabled", e.remindersEnabled)
                    })), u.observe(d, this, (e => {
                        void 0 !== e && (this.set("remindersEnabled", e), this.get("remindersFeatureEnabled") && (this.privateApi.remindersEnabled = e))
                    })), u.observe(s, this, (e => {
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
                _calculateTraitLevel(e, t, n) {
                    let a = "kNone",
                        l = 0,
                        s = -1;
                    if (e.conditional_trait_sets.forEach((e => {
                            t >= e.min_units ? (!e.max_units || t <= e.max_units) && (a = e.style_name, l = e.style_idx) : s < 0 && "kChromatic" !== e.style_name && (s = e.min_units)
                        })), -1 === s) {
                        for (let t = e.conditional_trait_sets.length - 1; t >= 0; t--) {
                            const n = e.conditional_trait_sets[t];
                            if ("kChromatic" !== n.style_name) {
                                s = n.min_units;
                                break
                            }
                        } - 1 === s && (s = 0)
                    }
                    n.style = a, n.styleRank = l, n.nextThreshold = s
                },
                _generateTraitData(e) {
                    const t = a.Ember.A(),
                        n = this.get("tftTraitsById");
                    for (const l in e) {
                        const s = e[l],
                            r = n.get(l),
                            i = {};
                        i.id = l, i.displayName = r.display_name, i.icon_path = r.icon_path, i.tooltipText = this._replaceTokens(r.tooltip_text, r, s), i.currentCount = s, this._calculateTraitLevel(r, s, i);
                        const o = a.Ember.Object.create(i);
                        t.pushObject(o)
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
                    let l = "";
                    const s = t.conditional_trait_sets.reduce(((e, t) => {
                            let a = n >= t.min_units;
                            return t.max_units && (a = a && n <= t.max_units), a ? t : e
                        })),
                        r = this._generateTokenSubstitutions(s, t);
                    let i = 0;
                    for (a.forEach((e => {
                            if (0 === e.indexOf(f)) t.conditional_trait_sets.forEach((a => {
                                const s = this._generateTokenSubstitutions(a, t);
                                let r = e,
                                    i = this._replaceFirstToken(r, s);
                                for (; i.didReplace;) r = i.replacedString, i = this._replaceFirstToken(r, s);
                                let o = n >= a.min_units;
                                a.max_units && (o = o && n <= a.max_units), r = r.replace(f, o ? v : b), r = r.replace("</expandRow>", o ? y : x), l += r + h
                            }));
                            else if (0 === e.indexOf(g)) {
                                const a = t.conditional_trait_sets[i],
                                    s = this._generateTokenSubstitutions(a, t);
                                let r = this._replaceFirstToken(e, s);
                                for (; r.didReplace;) e = r.replacedString, r = this._replaceFirstToken(e, s);
                                let o = n >= a.min_units;
                                a.max_units && (o = o && n <= a.max_units), e = o ? (e = e.replace(g, v)).replace(_, y) : (e = e.replace(g, b)).replace(_, x), i++, l += e + h
                            } else {
                                let t = this._replaceFirstToken(e, r);
                                for (; t.didReplace;) e = t.replacedString, t = this._replaceFirstToken(e, r);
                                l += e + h
                            }
                            l = this._replaceAllIconTokens(l)
                        })), l = l.trim(); l.endsWith(h);) l = l.slice(0, l.length - 4), l = l.trim();
                    return l
                },
                _replaceFirstToken(e, t) {
                    const n = this._getTokenInfo(e);
                    if (!n) return {
                        replacedString: e,
                        didReplace: !1,
                        error: !1
                    };
                    let a = !1,
                        l = t[n.token],
                        s = "";
                    if (l) {
                        if (l *= n.multiplier, -1 === n.precision) {
                            n.precision = 2;
                            const e = Math.pow(10, n.precision);
                            let t = Math.floor(l * e);
                            for (; t % 10 == 0 && n.precision > 0;) t /= 10, n.precision -= 1
                        }
                        s = l.toFixed(n.precision)
                    } else a = !0;
                    return {
                        replacedString: e.slice(0, n.start) + s + e.slice(n.end + 1, e.end),
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
                        l = 0;
                    for (l = 0; l < e.length; l++)
                        if (-1 === n) {
                            if (e.substring(l, l + 3) === t) {
                                n = l;
                                continue
                            }
                        } else if ("%" === e[l]) {
                        a = l;
                        break
                    }
                    return -1 === n || -1 === a ? null : {
                        start: n,
                        end: a,
                        token: e.substring(n + 3, l)
                    }
                },
                _getTokenInfo(e) {
                    const t = e.indexOf("@");
                    if (-1 === t) return null;
                    const n = e.slice(t + 1, e.length).indexOf("@") + t + 1;
                    if (-1 === n) return null;
                    let l = e.slice(t + 1, n);
                    const s = l.indexOf("*");
                    let r = 1;
                    if (-1 !== s) {
                        const t = l.slice(s + 1, l.length);
                        l = l.slice(0, s), r = Number(t), Number.isNaN(r) && (a.logger.warning("Found illegal multiplier " + t + " when parsing the first token of " + e), r = 1)
                    }
                    const i = l.indexOf(":");
                    let o;
                    o = i < 0 ? l.indexOf(".") : l.indexOf(".", i);
                    let c = -1;
                    if (-1 !== o) {
                        const t = l.slice(o + 1, l.length);
                        l = l.slice(0, o), c = Math.floor(parseFloat(t)), Number.isNaN(c) && (a.logger.warn("Found illegal precision " + t + " when parsing the first token of " + e), c = -1)
                    }
                    return {
                        start: t,
                        end: n,
                        precision: c,
                        multiplier: r,
                        token: l
                    }
                },
                _handleLocalTeamChange(e) {
                    const t = a.Ember.A();
                    e.champions.forEach((e => {
                        t.push(e.championId)
                    })), this.set("currentTeamMembers", t);
                    const n = this._generateTraitCensus(t),
                        l = this._generateTraitData(n);
                    this._sortTraitData(l), this.set("currentTeamTraits", l)
                },
                setRemindersTooltipElement(e) {
                    this.set("remindersTooltip", e)
                },
                addChampionById(e) {
                    e && u.post(o + e).then((() => {
                        l.SFX.addChampion.play()
                    })).catch((() => {
                        l.SFX.failAddChampion.play()
                    }))
                },
                removeChampionById(e) {
                    e && u.delete(o + e).then((() => {
                        l.SFX.removeChampion.play()
                    }))
                },
                addChampionByIndex(e, t) {
                    t && u.post(c + "/" + e, t).then((() => {
                        l.SFX.addChampion.play()
                    })).catch((() => {
                        l.SFX.failAddChampion.play()
                    }))
                },
                removeChampionByIndex(e) {
                    u.delete(c + "/" + e).then((() => {
                        l.SFX.removeChampion.play()
                    }))
                },
                swapChampionsByIndex(e, t) {
                    u.patch(c, [e, t])
                },
                setRemindersEnabled(e) {
                    u.patch(d, e)
                },
                saveAndExit(e = "tft-teamPlanner") {
                    this.get("remindersFeatureEnabled") && u.patch(i, !0), u.put(m), this.privateApi.hide(e)
                },
                incrementRemindersClickedCount() {
                    this.privateApi.remindersClickedCount++
                }
            });
            t.default = k
        }, (e, t, n) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var a = n(1);
            n(46);
            var l = n(6),
                s = a.Ember.Component.extend({
                    layout: n(47),
                    classNames: ["team-planner__reminders-toggle-component"],
                    teamPlannerService: a.Ember.inject.service("TeamPlanner"),
                    showRemindersOn: a.Ember.computed.alias("teamPlannerService.remindersEnabled"),
                    didInsertElement() {
                        const e = this.element.querySelector(".team-planner__header-container__tooltip-icon");
                        this.get("teamPlannerService").setRemindersTooltipElement(e)
                    },
                    actions: {
                        remindersToggleClick() {
                            l.SFX.toggleRemindersEnabled.play(), this.get("teamPlannerService").setRemindersEnabled(!this.get("showRemindersOn")), this.get("teamPlannerService").incrementRemindersClickedCount()
                        },
                        onMouseEnterInfoButton(e) {
                            l.SFX.hoverInfoButton.play()
                        },
                        onMouseEnterToggle(e) {
                            l.SFX.hoverRemindersToggle.play()
                        }
                    }
                });
            t.default = s
        }, (e, t, n) => {
            "use strict";
            n.r(t)
        }, (e, t, n) => {
            const a = n(1).Ember;
            e.exports = a.HTMLBars.template({
                id: "Gqf3BlUo",
                block: '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\templates\\\\reminders-toggle.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_1\\\\LeagueClientContent_Release\\\\15693\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-tft-team-planner\\\\src\\\\app\\\\styles\\\\reminders-toggle.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["team-planner__reminders-toggle ",["helper",["if"],[["get",["showRemindersOn"]],"on"],null]]]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-info-icon",[]],["static-attr","class","team-planner__header-container__tooltip-icon"],["dynamic-attr","onMouseEnter",["helper",["action"],[["get",[null]],"onMouseEnterInfoButton"],null],null],["static-attr","noClick","true"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["bottom"]],0],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","toggle-container animated"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"remindersToggleClick"],null],null],["dynamic-attr","onMouseEnter",["helper",["action"],[["get",[null]],"onMouseEnterToggle"],null],null],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","open"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","toggle-button animated"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","team-planner__header-container__tooltip-title"],["flush-element"],["append",["unknown",["tra","teamplanner_reminders_toggle_tooltip_title"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","team-planner__header-container__tooltip-body"],["flush-element"],["append",["unknown",["tra","teamplanner_reminders_toggle_tooltip_body"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
                meta: {}
            })
        }, (e, t, n) => {
            var a = n(49),
                l = n(50);
            e.exports = function(e, t, n) {
                var s = t && n || 0;
                "string" == typeof e && (t = "binary" === e ? new Array(16) : null, e = null);
                var r = (e = e || {}).random || (e.rng || a)();
                if (r[6] = 15 & r[6] | 64, r[8] = 63 & r[8] | 128, t)
                    for (var i = 0; i < 16; ++i) t[s + i] = r[i];
                return t || l(r)
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
                    l = t;
                return [l[e[a++]], l[e[a++]], l[e[a++]], l[e[a++]], "-", l[e[a++]], l[e[a++]], "-", l[e[a++]], l[e[a++]], "-", l[e[a++]], l[e[a++]], "-", l[e[a++]], l[e[a++]], l[e[a++]], l[e[a++]], l[e[a++]], l[e[a++]]].join("")
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
        var l = t[a];
        if (void 0 !== l) return l.exports;
        var s = t[a] = {
            exports: {}
        };
        return e[a](s, s.exports, n), s.exports
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
        const l = document.currentScript.ownerDocument;
        const s = window.getPluginAnnounceEventName(a.PLUGIN_NAME);
        l.addEventListener(s, (function(e) {
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
                const l = new(0, n(3).default);
                return new(0, n(51).default)(l)
            }))
        }), {
            once: !0
        })
    })()
})();