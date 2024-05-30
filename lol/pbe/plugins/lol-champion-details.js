(() => {
  var e = [
      ,
      (e) => {
        "use strict";
        let t;
        function n() {
          return (
            t ||
            (console.error(
              "The `provider` object has not been set, please do so by calling the `init` method.",
            ),
            null)
          );
        }
        const o = {
          init: function (e, n) {
            return (t = e), this.add(n);
          },
          _getValue: function (e, n) {
            let o;
            return (
              "function" == typeof n
                ? ((o = n(t)),
                  o ||
                    console.warn(
                      "The function for key " + e + " returned a falsy value: ",
                      o,
                    ))
                : "string" == typeof n
                  ? ((o = t.get(n)),
                    o ||
                      console.warn(
                        "The provider `get` invocation for the key " +
                          e +
                          " returned a falsy value: ",
                        o,
                      ))
                  : "object" == typeof n && (o = n),
              o
            );
          },
          add: function (e) {
            e = e || {};
            const t = [],
              n = this;
            return (
              Object.keys(e).forEach(function (o) {
                const s = e[o],
                  i = n._getValue(o, s);
                i && i.then
                  ? (i.then(function (e) {
                      e ||
                        console.warn(
                          "The promise for the key " +
                            o +
                            " resolved with a falsy value: ",
                          e,
                        ),
                        n._addValue(o, e);
                    }),
                    t.push(i))
                  : n._addValue(o, i);
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
              n()
            );
          },
          getProvider: function () {
            return n();
          },
        };
        e.exports = o;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        t.default = class {
          constructor(e) {
            this._api = e;
          }
          show(e) {
            this.enabled() && this._api.createChampionDetailsComponent(e);
          }
          hide() {
            this._api.destroyChampionDetailsComponent();
          }
          enabled() {
            return this._api.enabled;
          }
          addConfigObserver(e) {
            this._api.addPlatformConfigListener(e);
          }
          removeConfigObserver(e) {
            this._api.removePlatformConfigListener(e);
          }
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var o = n(1),
          s = a(n(4)),
          i = a(n(5));
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        t.default = class {
          constructor() {
            (this.enabled = !1),
              (this.pluginName = "rcp-fe-lol-champion-details"),
              this.registerChampionDetailsComponent(this.traService()),
              (this.platformConfig = null),
              (this.platformConfigListeners = new Set()),
              (this.platformConfigBinding = (0, o.DataBinding)(
                "/lol-platform-config",
                (0, o.getProvider)().getSocket(),
              )),
              (this.clientConfigBinding = (0, o.DataBinding)(
                "/lol-client-config",
                (0, o.getProvider)().getSocket(),
              )),
              (this.loginSessionBinding = (0, o.DataBinding)(
                "/lol-login",
                (0, o.getProvider)().getSocket(),
              )),
              (this.championsBinding = (0, o.DataBinding)(
                "/lol-champions",
                (0, o.getProvider)().getSocket(),
              )),
              this.platformConfigBinding.observe(
                "/v1/namespaces/Eternals/Enabled",
                (e) => {
                  this.eternalsEnabled = e || !1;
                },
              ),
              this.platformConfigBinding.observe(
                "/v1/namespaces/LcuChampionDetails",
                (e) => {
                  if (e) {
                    (this.platformConfig = e),
                      (this.enabled =
                        void 0 === e.Enabled ||
                        null === e.Enabled ||
                        e.Enabled);
                    for (const t of this.platformConfigListeners) t(e);
                  } else this.enabled = !0;
                },
              ),
              this.clientConfigBinding.observe(
                "/v3/client-config/lol.client_settings.champ_mastery.lcm_enabled",
                (e) => {
                  this.legendaryChampionMasteryEnabled = !!e;
                },
              );
          }
          createChampionDetailsComponent({
            championId: e,
            section: t,
            skinId: n,
            displayType: s,
            onCloseCallback: i,
          }) {
            return (
              (this.onCloseCallback = i),
              this.destroyChampionDetailsComponent(),
              this.loginSessionBinding.get("/v1/session").then((i) => {
                const { summonerId: a, puuid: r } = i;
                this.championsBinding
                  .get(`/v1/inventories/${a}/champions/${e}`)
                  .then((i) => {
                    let a = !1;
                    i &&
                      i.ownership &&
                      i.ownership.owned &&
                      (a = i.ownership.owned);
                    const l = {
                      puuid: r,
                      championId: e,
                      championOwned: a,
                      section: t,
                      skinId: n,
                      cdpPlatformConfig: this.platformConfig,
                      eternalsEnabled: this.eternalsEnabled,
                      legendaryChampionMasteryEnabled:
                        this.legendaryChampionMasteryEnabled,
                      destroyComponent:
                        this.destroyChampionDetailsComponent.bind(this),
                      displayType: s || "FULL_PAGE_MODAL",
                    };
                    this.component = o.ComponentFactory.create(
                      this.pluginName,
                      l,
                    );
                  });
              })
            );
          }
          destroyChampionDetailsComponent() {
            this.component &&
              this.component.onRemove &&
              (this.component.onRemove(),
              (this.component = null),
              "function" == typeof this.onCloseCallback &&
                (this.onCloseCallback(), (this.onCloseCallback = null)));
          }
          addPlatformConfigListener(e) {
            "function" == typeof e &&
              (this.platformConfigListeners.add(e),
              e({ Enabled: this.enabled }));
          }
          removePlatformConfigListener(e) {
            this.platformConfigListeners.delete(e);
          }
          traService() {
            const e = (0, o.getProvider)()
              .get("rcp-fe-lol-l10n")
              .tra()
              .overlay("/fe/lol-l10n/trans.json")
              .overlay("/fe/lol-champion-details/trans.json")
              .overlay("/fe/lol-shared-components/trans-champion-mastery.json");
            return (0, i.default)(o.Ember, e);
          }
          registerChampionDetailsComponent(e) {
            const {
                GradeDisplayComponent: t,
                MasteryTooltipComponent: i,
                MilestoneTooltipComponent: a,
                MasteryCrestComponent: r,
              } = o.SharedComponents.getApi_SharedChampionMasteryComponents(),
              l = {
                name: this.pluginName,
                tra: e,
                ComponentFactory: o.ComponentFactory,
                ChampionDetailsRootComponent: n(6),
                ChampionBackdropComponent: n(24),
                TitleLockupLcmComponent: n(27),
                ProgressionSectionComponent: n(31),
                ProgressionSeriesComponent: n(34),
                ProgressionShowcaseComponent: n(37),
                SeriesInfoComponent: n(40),
                StatstoneInfoComponent: n(62),
                ShowcaseItemComponent: n(66),
                OverviewSectionComponent: n(69),
                DetailsSectionComponent: n(72),
                TacticalInfoComponent: n(75),
                PlaystyleInfoComponent: n(78),
                AbilitiesSectionComponent: n(81),
                AbilityPickerComponent: n(84),
                AbilityVideoComponent: n(87),
                AbilityDescriptionComponent: n(90),
                SkinsSectionComponent: n(94),
                SkinsCarouselComponent: n(98),
                TieredTransformationsComponent: n(101),
                MasterySectionComponent: n(104),
                MasteryCrestDisplayComponent: n(107),
                MasteryInfoModalComponent: n(110),
                MasteryMilestoneProgressComponent: n(113),
                MilestoneTrackComponent: n(116),
                MilestoneRequirementsComponent: n(119),
                SeasonInfoComponent: n(122),
                GradeDisplayComponent: t,
                MasteryTooltipComponent: i,
                MilestoneTooltipComponent: a,
                MasteryCrestComponent: r,
                CatalogService: n(126),
                ChampionService: n(127),
                CollectionsService: n(128),
                StatstonesService: n(129),
                UxSettingsService: n(130),
                ClientConfigService: n(131),
                EventHubService: n(132),
                ChampionMasteryService: n(133),
                DynamicTraHelper:
                  o.SharedComponents.getApi_traTemplateHelpers().DynamicTra,
                EqHelper: s.default,
              },
              c = {
                name: "ProgressionFeatureFlyoutComponent",
                tra: e,
                ComponentFactory: o.ComponentFactory,
                ProgressionFeatureFlyoutComponent: n(134),
                StatstonesService: n(129),
              },
              u = {
                name: "QuestFormsPopup",
                tra: e,
                ComponentFactory: o.ComponentFactory,
                QuestFormsPopupComponent: n(137).default,
                ConcatTraHelper:
                  o.SharedComponents.getApi_traTemplateHelpers().ConcatTra,
                EqHelper: s.default,
              };
            o.EmberApplicationFactory.setFactoryDefinition(l),
              o.EmberApplicationFactory.setFactoryDefinition(c),
              o.EmberApplicationFactory.setFactoryDefinition(u);
          }
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var o = n(1).Ember.Helper.helper((e) => e[0] === e[1]);
        t.default = o;
      },
      (e) => {
        "use strict";
        function t(e) {
          const n = {};
          for (const o in e)
            "object" == typeof e[o] ? (n[o] = t(e[o])) : (n[o] = e[o]);
          return n;
        }
        function n(e, t, n) {
          const { regions: o, region: s, locale: i } = e.metadata();
          if ((n = n.get("metadata." + t)) && "region" === t && n.id !== s.id) {
            const t = o[n.id],
              s = t.defaultLocale
                ? t.defaultLocale.id
                : t.availableLocales[0].id;
            e.setLocale(s, n.id);
          } else n && "locale" === t && n.id !== i.id && e.setLocale(n.id);
        }
        e.exports = function (e, o, s) {
          let i;
          const a = { metadata: !0, moment: !0 };
          return (
            (o = o.observe(() => {
              if (i) {
                const e = t(o.metadata());
                i.set("metadata", e),
                  i.beginPropertyChanges(),
                  Object.keys(a).forEach((e) => {
                    i.propertyWillChange(e), i.propertyDidChange(e);
                  }),
                  i.endPropertyChanges();
              }
            })),
            (i = e.Service.extend({
              _tra: null,
              init() {
                this.wrapTra(o);
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
                return (a[e] = !0), this._tra.get(e);
              },
              willDestroy: () => this._tra.unregister(),
              addOverlays: function (e) {
                let t = this._tra;
                for (const n of e) t = t.overlay(n);
                t && this.wrapTra(t);
              },
            }).create()),
            i.set("service", i),
            i.addObserver("metadata.region", n.bind(null, o, "region")),
            i.addObserver("metadata.locale", n.bind(null, o, "locale")),
            s &&
              (console.warning(
                "deprecated: pass a traService as a property of your Ember application definition",
              ),
              s.register("tra:main", i, { instantiate: !1 }),
              s.inject("component", "tra", "tra:main"),
              s.inject("controller", "tra", "tra:main"),
              s.inject("view", "tra", "tra:main"),
              s.inject("model", "tra", "tra:main"),
              s.inject("route", "tra", "tra:main"),
              s.inject("service", "tra", "tra:main")),
            i
          );
        };
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          s = n(7),
          i = n(21);
        n(22);
        const a = "progression",
          r = "overview",
          l = "abilities",
          c = "skins",
          u = "mastery",
          p = [a, r, l, c, u];
        e.exports = o.Ember.Component.extend({
          classNames: ["rcp-fe-lol-champion-details"],
          classNameBindings: ["isDialogFrame:is-dialog-frame"],
          layout: n(23),
          championService: o.Ember.inject.service("champion"),
          championId: null,
          championOwned: null,
          section: null,
          skinId: null,
          cdpPlatformConfig: null,
          destroyComponent: null,
          displayType: null,
          puuid: null,
          champion: o.Ember.computed.alias("championService.champion"),
          championClass: o.Ember.computed("champion", function () {
            const e = this.get("champion");
            return e ? e.name.toLowerCase() : "";
          }),
          isDialogFrame: o.Ember.computed("displayType", function () {
            const e = this.get("displayType");
            return "DIALOG_FRAME" === e || "DIALOG_FRAME_ABOVE_VIGNETTE" === e;
          }),
          abilitiesDisabled: o.Ember.computed(
            "cdpPlatformConfig.AbilitiesSectionEnabled",
            function () {
              let e = this.get("cdpPlatformConfig.AbilitiesSectionEnabled");
              return null == e && (e = !0), !e;
            },
          ),
          skinsDisabled: o.Ember.computed(
            "cdpPlatformConfig.SkinsSectionEnabled",
            function () {
              let e = this.get("cdpPlatformConfig.SkinsSectionEnabled");
              return null == e && (e = !0), !e;
            },
          ),
          storyDisabled: o.Ember.computed(
            "cdpPlatformConfig.StorySectionEnabled",
            function () {
              let e = this.get("cdpPlatformConfig.StorySectionEnabled");
              return null == e && (e = !0), !e;
            },
          ),
          progressionEnabled: o.Ember.computed.alias("eternalsEnabled"),
          progressionDisabled: o.Ember.computed.not("progressionEnabled"),
          showStoreButton: o.Ember.computed(
            "cdpPlatformConfig.StoreButtonEnabled",
            "championService.storeCustomerEnabled",
            "isDialogFrame",
            function () {
              const e = this.get("cdpPlatformConfig"),
                t = this.get("championService.storeCustomerEnabled"),
                n = this.get("isDialogFrame");
              return (
                t && !n && (0, i.getSettingValue)("StoreButtonEnabled", e, !0)
              );
            },
          ),
          progressionShouldLoad: o.Ember.computed.alias("progressionEnabled"),
          overviewShouldLoad: o.Ember.computed.not("progressionShouldLoad"),
          abilitiesShouldLoad: !1,
          skinsShouldLoad: !1,
          onInit: o.Ember.on("init", function () {
            o.logger.trace(
              "Open CDP Modal for champion " + this.get("championId"),
            ),
              this.set("abilitiesSectionShown", !1),
              this.set("championService.championId", this.get("championId")),
              o.Ember.run.scheduleOnce("afterRender", this, function () {
                this.$(".cdp-abilities-section-container").on(
                  "elementWillShow",
                  () => {
                    this.set("abilitiesSectionShown", !0);
                  },
                ),
                  this.$(".cdp-abilities-section-container").on(
                    "elementHide",
                    () => {
                      this.set("abilitiesSectionShown", !1);
                    },
                  );
                const e = this.get("element").querySelector(
                    "lol-uikit-navigation-bar",
                  ),
                  t = this.get("element").querySelector(
                    "lol-uikit-section-controller",
                  ),
                  n = new s.NavigationBarMediator({
                    TooltipManager: o.TooltipManager,
                    TemplateHelper: o.TemplateHelper,
                    component: e,
                  }),
                  i = new s.SectionControllerMediator({ component: t }),
                  p = this.get("displayType");
                let m = null;
                if ("DIALOG_FRAME_ABOVE_VIGNETTE" === p) {
                  const e = {
                    "layer-position": "above-vignette",
                    dismissable: "",
                    "dismissable-type": "outside",
                  };
                  m = new s.DialogFrameMediator({
                    UIKit: o.UIKit,
                    dialogFrameClassName: "champion-details-dialog-frame",
                    attributes: e,
                  });
                } else if ("DIALOG_FRAME" === p) {
                  const e = {
                    "layer-position": "default",
                    dismissable: "",
                    "dismissable-type": "outside",
                  };
                  m = new s.DialogFrameMediator({
                    UIKit: o.UIKit,
                    dialogFrameClassName: "champion-details-dialog-frame",
                    attributes: e,
                  });
                } else
                  m = new s.FullPageModalMediator({ Navigation: o.Navigation });
                const d = new s.SubnavigationApi([n, i, m]);
                this.set("subnavigationApi", d);
                m.getScreenNode().appendChild(this.get("element"));
                let h = "cdp_overview";
                const f = this.get("section");
                f &&
                  (f === a
                    ? (h = "cdp_progression")
                    : f === r
                      ? (h = "cdp_overview")
                      : f === l && !1 === this.get("abilitiesDisabled")
                        ? (h = "cdp_abilities")
                        : f === c && !1 === this.get("skinsDisabled")
                          ? (h = "cdp_skins")
                          : f === u && (h = "cdp_mastery")),
                  d.show(h),
                  d.addEventListener("screenHidden", () => {
                    this.get("destroyComponent")();
                  }),
                  this.sendTelemetryEvent(h),
                  d.addEventListener("subnavigationSubsectionSelected", (e) => {
                    this.sendTelemetryEvent(e);
                  });
              });
          }),
          willDestroyElement() {
            this.$(".cdp-abilities-section-container").off(),
              o.logger.trace(
                "Close CDP Modal for champion " + this.get("championId"),
              ),
              this.get("subnavigationApi").destroy(),
              this.get("destroyComponent")(),
              this._super(...arguments);
          },
          navigationTooltipObserver: o.Ember.observer(
            "subnavigationApi",
            "tra.feature_not_implemented_generic",
            "abilitiesDisabled",
            "skinsDisabled",
            "storyDisabled",
            function () {
              o.Ember.run.scheduleOnce(
                "afterRender",
                this,
                "updateNavigationTooltips",
              );
            },
          ),
          updateNavigationTooltips() {
            const e = this.get("subnavigationApi");
            if (!e) return;
            const t = this.get("tra.feature_not_implemented_generic");
            this.$("lol-uikit-navigation-item").each(function () {
              const n = this.getAttribute("item-id");
              "true" === this.getAttribute("disabled")
                ? e.setTooltip(n, t)
                : e.setTooltip(n, null);
            });
          },
          sendTelemetryEvent(e) {
            o.Telemetry.sendCustomData("cdp_section_view", {
              puuid: this.get("puuid"),
              section: e,
            });
          },
          actions: {
            sectionLoaded(e) {
              const t = p.indexOf(e) + 1,
                n = p[t];
              this.get(`${n}Disabled`)
                ? this.send("sectionLoaded", n)
                : n && this.set(`${n}ShouldLoad`, !0);
            },
            setBackdropFadeout(e) {
              e
                ? this.element
                    .querySelector("lol-uikit-section.progression")
                    .classList.add("showfadeout")
                : this.element
                    .querySelector("lol-uikit-section.progression")
                    .classList.remove("showfadeout");
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var o = c(n(8)),
          s = c(n(14)),
          i = c(n(15)),
          a = c(n(18)),
          r = c(n(19)),
          l = c(n(20));
        function c(e) {
          return e && e.__esModule ? e : { default: e };
        }
        e.exports = {
          SubnavigationApi: o.default,
          NavigationBarMediator: s.default,
          SectionControllerMediator: i.default,
          FullPageModalMediator: a.default,
          DialogFrameMediator: r.default,
          MainNavigationMediator: l.default,
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var o = t[n];
                (o.enumerable = o.enumerable || !1),
                  (o.configurable = !0),
                  "value" in o && (o.writable = !0),
                  Object.defineProperty(e, o.key, o);
              }
            }
            return function (t, n, o) {
              return n && e(t.prototype, n), o && e(t, o), t;
            };
          })(),
          s = c(n(9)),
          i = c(n(10)),
          a = c(n(12)),
          r = n(13),
          l = n(11);
        function c(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var u = "riotclient-lib-subnavigation",
          p = (function (e) {
            function t(e) {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t);
              var n = (function (e, t) {
                if (!e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !t || ("object" != typeof t && "function" != typeof t)
                  ? e
                  : t;
              })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
              return (
                (n._mediators = n._validateMediators(e)),
                n._mediators &&
                  n._mediators.forEach(function (e) {
                    e.setLibraryReference(n);
                  }),
                (n._showParameters = null),
                (n._screenShown = !1),
                n._registerEventListeners(),
                n
              );
            }
            return (
              (function (e, t) {
                if ("function" != typeof t && null !== t)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof t,
                  );
                (e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  t &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(e, t)
                      : (e.__proto__ = t));
              })(t, e),
              o(t, [
                {
                  key: "_registerEventListeners",
                  value: function () {
                    this.addEventListener(
                      l.EVENT_IN_SUBNAVIGATION_SUBSECTION_SELECTED,
                      this._onSpecificSectionSelected.bind(this),
                    ),
                      this.addEventListener(
                        l.EVENT_IN_RENDER_SUBSECTION_SELECTED,
                        this._onSpecificSectionSelected.bind(this),
                      ),
                      this.addEventListener(
                        l.EVENT_IN_MAIN_NAVIGATION_SELECTED,
                        this._onFirstSectionEnabledSeleced.bind(this),
                      ),
                      this.addEventListener(
                        l.EVENT_IN_SECTION_WILL_SHOW,
                        this._onSectionWillShow.bind(this),
                      ),
                      this.addEventListener(
                        l.EVENT_IN_SECTION_SHOW,
                        this._onSectionShow.bind(this),
                      ),
                      this.addEventListener(
                        l.EVENT_IN_SECTION_WILL_HIDE,
                        this._onSectionWillHide.bind(this),
                      ),
                      this.addEventListener(
                        l.EVENT_IN_SECTION_HIDE,
                        this._onSectionHide.bind(this),
                      ),
                      this.addEventListener(
                        l.EVENT_IN_SCREEN_SHOWN,
                        this._onScreenShow.bind(this),
                      ),
                      this.addEventListener(
                        l.EVENT_IN_SCREEN_HIDDEN,
                        this._onScreenHide.bind(this),
                      );
                  },
                },
                {
                  key: "_onSectionWillShow",
                  value: function (e) {
                    this.dispatchEvent(
                      l.EVENT_OUT_SECTION_WILL_SHOW,
                      e,
                      this._showParameters,
                    );
                  },
                },
                {
                  key: "_onSectionShow",
                  value: function (e) {
                    this.dispatchEvent(
                      l.EVENT_OUT_SECTION_SHOW,
                      e,
                      this._showParameters,
                    );
                  },
                },
                {
                  key: "_onSectionWillHide",
                  value: function (e) {
                    this.dispatchEvent(
                      l.EVENT_OUT_SECTION_WILL_HIDE,
                      e,
                      this._showParameters,
                    );
                  },
                },
                {
                  key: "_onSectionHide",
                  value: function (e) {
                    this.dispatchEvent(
                      l.EVENT_OUT_SECTION_HIDE,
                      e,
                      this._showParameters,
                    );
                  },
                },
                {
                  key: "_onScreenShow",
                  value: function () {
                    (this._screenShown = !0),
                      this.dispatchEvent(l.EVENT_OUT_SCREEN_SHOWN);
                  },
                },
                {
                  key: "_onScreenHide",
                  value: function () {
                    (this._screenShown = !1),
                      this.dispatchEvent(l.EVENT_OUT_SCREEN_HIDDEN);
                  },
                },
                {
                  key: "_validateMediators",
                  value: function (e) {
                    if (e) {
                      if (Array.isArray(e))
                        return (
                          e.forEach(function (e) {
                            if (!(e instanceof i.default))
                              throw new Error(
                                u +
                                  " _validateMediators: Expected mediator to be an instance of Mediator",
                              );
                          }),
                          e
                        );
                      if (!(e instanceof i.default))
                        throw new Error(
                          u +
                            " _validateMediators: Expected mediator to be an instance of Mediator",
                        );
                      return [e];
                    }
                  },
                },
                {
                  key: "registerSection",
                  value: function (e) {
                    if (!e)
                      throw new Error(
                        u + " registerSection: properties is mandatory",
                      );
                    if (
                      (e.hasOwnProperty("id") ||
                        (console.warn(
                          u +
                            " registerSection: properties.id is mandatory. Using properties.title in it's place",
                        ),
                        (e.id = e.title.replace(" ", "_"))),
                      !e.hasOwnProperty("title"))
                    )
                      throw new Error(
                        u + " registerSection: properties.title is mandatory",
                      );
                    if (!e.hasOwnProperty("render"))
                      throw new Error(
                        u + " registerSection: properties.render is mandatory",
                      );
                    return (
                      (e.priority = (0, r.sanitizeInteger)(
                        e.priority,
                        Number.MAX_SAFE_INTEGER,
                      )),
                      (e.enabled = (0, r.sanitizeBoolean)(e.enabled, !0)),
                      this.dispatchEvent(l.EVENT_OUT_REGISTER_SUBSECTION, e),
                      new a.default(this, e.id)
                    );
                  },
                },
                {
                  key: "setEnabled",
                  value: function (e, t) {
                    e &&
                      this.dispatchEvent(
                        l.EVENT_OUT_SET_ENABLE_SUBSECTION,
                        e,
                        t,
                      );
                  },
                },
                {
                  key: "setTitle",
                  value: function (e, t) {
                    e &&
                      this.dispatchEvent(
                        l.EVENT_OUT_SET_TITLE_SUBSECTION,
                        e,
                        t,
                      );
                  },
                },
                {
                  key: "setTooltip",
                  value: function (e, t) {
                    e &&
                      this.dispatchEvent(
                        l.EVENT_OUT_SET_TOOLTIP_SUBSECTION,
                        e,
                        t,
                      );
                  },
                },
                {
                  key: "setShowAlert",
                  value: function (e, t) {
                    e &&
                      this.dispatchEvent(
                        l.EVENT_OUT_SET_SHOW_ALERT_SUBSECTION,
                        e,
                        t,
                      );
                  },
                },
                {
                  key: "show",
                  value: function (e, t) {
                    e &&
                      (this._screenShown ||
                        this.dispatchEvent(l.EVENT_OUT_SCREEN_SHOWN),
                      (this._screenShown = !0),
                      (this._showParameters = t),
                      this._onSpecificSectionSelected(e));
                  },
                },
                {
                  key: "destroy",
                  value: function () {
                    (this._showParameters = null),
                      (this._mediators = null),
                      this.dispatchEvent(l.EVENT_OUT_DESTROY),
                      this.clearEventListeners();
                  },
                },
                {
                  key: "_onSpecificSectionSelected",
                  value: function (e) {
                    e &&
                      this.dispatchEvent(
                        l.EVENT_OUT_SHOW_SUBSECTION,
                        e,
                        this._showParameters,
                      );
                  },
                },
                {
                  key: "_onFirstSectionEnabledSeleced",
                  value: function () {
                    this.dispatchEvent(
                      l.EVENT_OUT_SHOW_FIRST_SUBSECTION_ENABLED,
                    );
                  },
                },
              ]),
              t
            );
          })(s.default);
        t.default = p;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var n = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                "value" in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o);
            }
          }
          return function (t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t;
          };
        })();
        var o = (function () {
          function e() {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, e),
              (this._listeners = new Map());
          }
          return (
            n(e, [
              {
                key: "addEventListener",
                value: function (e, t) {
                  this._listeners.has(e) || this._listeners.set(e, []),
                    this._listeners.get(e).push(t);
                },
              },
              {
                key: "removeEventListener",
                value: function (e, t) {
                  var n = this._listeners.get(e),
                    o = void 0;
                  return (
                    !!(n && n.length && (o = n.indexOf(t)) > -1) &&
                    (n.splice(o, 1), this._listeners.set(e, n), !0)
                  );
                },
              },
              {
                key: "clearEventListeners",
                value: function () {
                  this._listeners.clear();
                },
              },
              {
                key: "dispatchEvent",
                value: function (e) {
                  for (
                    var t = arguments.length,
                      n = Array(t > 1 ? t - 1 : 0),
                      o = 1;
                    o < t;
                    o++
                  )
                    n[o - 1] = arguments[o];
                  var s = this._listeners.get(e);
                  return (
                    !(!s || !s.length) &&
                    (s.forEach(function (e) {
                      e.apply(void 0, n);
                    }),
                    !0)
                  );
                },
              },
            ]),
            e
          );
        })();
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o,
          s = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var o = t[n];
                (o.enumerable = o.enumerable || !1),
                  (o.configurable = !0),
                  "value" in o && (o.writable = !0),
                  Object.defineProperty(e, o.key, o);
              }
            }
            return function (t, n, o) {
              return n && e(t.prototype, n), o && e(t, o), t;
            };
          })(),
          i = n(9),
          a = (o = i) && o.__esModule ? o : { default: o },
          r = n(11);
        var l = (function () {
          function e(t) {
            if (
              ((function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, e),
              t && !(t instanceof Element))
            )
              throw new Error(
                "Mediator expects the component to be an instance of Element",
              );
            (this._component = t),
              (this._library = null),
              this._setComponentListeners();
          }
          return (
            s(e, [
              {
                key: "setLibraryReference",
                value: function (e) {
                  var t = this;
                  if (!(e instanceof a.default))
                    throw new Error(
                      "Mediator expects lib to be an instance of Evented",
                    );
                  (this._library = e),
                    this._library.addEventListener(
                      r.EVENT_OUT_SHOW_SUBSECTION,
                      function () {
                        return t._onApiShowSubsection.apply(t, arguments);
                      },
                    ),
                    this._library.addEventListener(
                      r.EVENT_OUT_REGISTER_SUBSECTION,
                      function () {
                        var e = (
                          (arguments.length <= 0 ? void 0 : arguments[0]) || {}
                        ).registerWithMediators;
                        (Array.isArray(e) && !e.includes(t.constructor.name)) ||
                          t._onApiRegisterSubsection.apply(t, arguments);
                      },
                    ),
                    this._library.addEventListener(
                      r.EVENT_OUT_SET_ENABLE_SUBSECTION,
                      function () {
                        return t._onApiSetEnableSubsection.apply(t, arguments);
                      },
                    ),
                    this._library.addEventListener(
                      r.EVENT_OUT_SET_TITLE_SUBSECTION,
                      function () {
                        return t._onApiSetTitleSubsection.apply(t, arguments);
                      },
                    ),
                    this._library.addEventListener(
                      r.EVENT_OUT_SET_TOOLTIP_SUBSECTION,
                      function () {
                        return t._onApiSetTooltipSubsection.apply(t, arguments);
                      },
                    ),
                    this._library.addEventListener(
                      r.EVENT_OUT_SET_SHOW_ALERT_SUBSECTION,
                      function () {
                        return t._onApiSetShowAlertSubsection.apply(
                          t,
                          arguments,
                        );
                      },
                    ),
                    this._library.addEventListener(
                      r.EVENT_OUT_SCREEN_SHOWN,
                      function () {
                        return t._onApiScreenShow.apply(t, arguments);
                      },
                    ),
                    this._library.addEventListener(
                      r.EVENT_OUT_DESTROY,
                      function () {
                        return t._onDestroy.apply(t, arguments);
                      },
                    );
                },
              },
              { key: "_setComponentListeners", value: function () {} },
              { key: "_onApiShowSubsection", value: function () {} },
              { key: "_onApiRegisterSubsection", value: function () {} },
              { key: "_onApiSetEnableSubsection", value: function () {} },
              { key: "_onApiSetTitleSubsection", value: function () {} },
              { key: "_onApiSetTooltipSubsection", value: function () {} },
              { key: "_onApiSetShowAlertSubsection", value: function () {} },
              { key: "_onApiScreenShow", value: function () {} },
              {
                key: "_onDestroy",
                value: function () {
                  (this._component = null), (this._library = null);
                },
              },
            ]),
            e
          );
        })();
        t.default = l;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        (t.EVENT_IN_SUBNAVIGATION_SUBSECTION_SELECTED =
          "subnavigationSubsectionSelected"),
          (t.EVENT_IN_RENDER_SUBSECTION_SELECTED = "renderSubsectionSelected"),
          (t.EVENT_IN_MAIN_NAVIGATION_SELECTED = "mainNavigationSelected"),
          (t.EVENT_IN_MAIN_NAVIGATION_HIDDEN = "mainNavigationHidden"),
          (t.EVENT_IN_SCREEN_HIDDEN = "inScreenHidden"),
          (t.EVENT_IN_SCREEN_SHOWN = "inScreenShown"),
          (t.EVENT_IN_SECTION_WILL_SHOW = "sectionControllerWillShow"),
          (t.EVENT_IN_SECTION_SHOW = "sectionControllerShow"),
          (t.EVENT_IN_SECTION_WILL_HIDE = "sectionControllerWillHide"),
          (t.EVENT_IN_SECTION_HIDE = "sectionControllerHide"),
          (t.EVENT_OUT_SHOW_SUBSECTION = "showSubsection"),
          (t.EVENT_OUT_REGISTER_SUBSECTION = "registerSubsection"),
          (t.EVENT_OUT_SET_ENABLE_SUBSECTION = "setEnableSubsection"),
          (t.EVENT_OUT_SET_TITLE_SUBSECTION = "setTitleSubsection"),
          (t.EVENT_OUT_SET_TOOLTIP_SUBSECTION = "setTooltipSubsection"),
          (t.EVENT_OUT_SET_SHOW_ALERT_SUBSECTION = "setShowAlertSubsection"),
          (t.EVENT_OUT_SECTION_WILL_SHOW = "sectionWillShow"),
          (t.EVENT_OUT_SECTION_SHOW = "sectionShow"),
          (t.EVENT_OUT_SECTION_WILL_HIDE = "sectionWillHide"),
          (t.EVENT_OUT_SECTION_HIDE = "sectionHide"),
          (t.EVENT_OUT_SCREEN_HIDDEN = "screenHidden"),
          (t.EVENT_OUT_SCREEN_SHOWN = "screenShown"),
          (t.EVENT_OUT_DESTROY = "destroy");
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var o = t[n];
                (o.enumerable = o.enumerable || !1),
                  (o.configurable = !0),
                  "value" in o && (o.writable = !0),
                  Object.defineProperty(e, o.key, o);
              }
            }
            return function (t, n, o) {
              return n && e(t.prototype, n), o && e(t, o), t;
            };
          })(),
          s = r(n(9)),
          i = r(n(8)),
          a = n(11);
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var l = "riotclient-lib-subnavigation",
          c = (function (e) {
            function t(e, n) {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t);
              var o = (function (e, t) {
                if (!e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !t || ("object" != typeof t && "function" != typeof t)
                  ? e
                  : t;
              })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
              if (!e)
                throw new Error(l + " SubsectionAPI - libRef is mandatory");
              if (!n)
                throw new Error(l + " SubsectionAPI - sectionId is mandatory");
              if (!(e instanceof i.default))
                throw new Error(
                  l + " SubsectionAPI - libRef should be an instance of API",
                );
              return (
                (o._libRef = e),
                (o._sectionId = n),
                (o._showing = !1),
                o._libRef.addEventListener(
                  a.EVENT_OUT_SHOW_SUBSECTION,
                  o._showSubsection.bind(o),
                ),
                o._libRef.addEventListener(
                  a.EVENT_OUT_SCREEN_HIDDEN,
                  o._deselected.bind(o),
                ),
                o._libRef.addEventListener(
                  a.EVENT_OUT_SECTION_WILL_SHOW,
                  o._sectionWillShow.bind(o),
                ),
                o._libRef.addEventListener(
                  a.EVENT_OUT_SECTION_SHOW,
                  o._sectionShow.bind(o),
                ),
                o._libRef.addEventListener(
                  a.EVENT_OUT_SECTION_WILL_HIDE,
                  o._sectionWillHide.bind(o),
                ),
                o._libRef.addEventListener(
                  a.EVENT_OUT_SECTION_HIDE,
                  o._sectionHide.bind(o),
                ),
                o._libRef.addEventListener(
                  a.EVENT_OUT_DESTROY,
                  o._onDestroy.bind(o),
                ),
                o
              );
            }
            return (
              (function (e, t) {
                if ("function" != typeof t && null !== t)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof t,
                  );
                (e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  t &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(e, t)
                      : (e.__proto__ = t));
              })(t, e),
              o(t, [
                {
                  key: "_onDestroy",
                  value: function () {
                    this.clearEventListeners(), (this._libRef = null);
                  },
                },
                {
                  key: "_sectionWillShow",
                  value: function (e, t) {
                    this._dispatchMyEvent(e, "willShow", t);
                  },
                },
                {
                  key: "_sectionShow",
                  value: function (e, t) {
                    this._dispatchMyEvent(e, "show", t);
                  },
                },
                {
                  key: "_sectionWillHide",
                  value: function (e, t) {
                    this._dispatchMyEvent(e, "willHide", t);
                  },
                },
                {
                  key: "_sectionHide",
                  value: function (e, t) {
                    this._dispatchMyEvent(e, "hide", t);
                  },
                },
                {
                  key: "_showSubsection",
                  value: function (e, t) {
                    e !== this._sectionId || this._showing
                      ? e !== this._sectionId && this._deselected()
                      : ((this._showing = !0),
                        this.dispatchEvent("selected", t));
                  },
                },
                {
                  key: "_deselected",
                  value: function () {
                    this._showing &&
                      ((this._showing = !1), this.dispatchEvent("deselected"));
                  },
                },
                {
                  key: "_dispatchMyEvent",
                  value: function (e, t, n) {
                    e === this._sectionId && this.dispatchEvent(t, n);
                  },
                },
                {
                  key: "setEnabled",
                  value: function (e) {
                    this._libRef.setEnabled(this._sectionId, e);
                  },
                },
                {
                  key: "setTitle",
                  value: function (e) {
                    this._libRef.setTitle(this._sectionId, e);
                  },
                },
                {
                  key: "setTooltip",
                  value: function (e) {
                    this._libRef.setTooltip(this._sectionId, e);
                  },
                },
                {
                  key: "setShowAlert",
                  value: function (e) {
                    this._libRef.setShowAlert(this._sectionId, e);
                  },
                },
                {
                  key: "show",
                  value: function (e) {
                    this._libRef.show(this._sectionId, e);
                  },
                },
                {
                  key: "set",
                  value: function (e, t) {
                    var n = e[0].toUpperCase() + e.slice(1);
                    console.warn(
                      "SubsectionAPI.set(key, value) is deprecated. Please use set" +
                        n +
                        " instead, if supported",
                    ),
                      "enabled" === e
                        ? this.setEnabled(t)
                        : "title" === e
                          ? this.setTitle(t)
                          : "tooltip" === e && this.setTooltip(t);
                  },
                },
              ]),
              t
            );
          })(s.default);
        t.default = c;
      },
      (e, t) => {
        "use strict";
        function n(e, t) {
          return e ? (isNaN(e) ? t : parseInt(e, 10)) : t;
        }
        function o(e, t) {
          return null == e ? t : !0 === e;
        }
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.sanitizeInteger = n),
          (t.sanitizeBoolean = o);
        var s = { sanitizeInteger: n, sanitizeBoolean: o };
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.NAVIGATION_BAR_INDEX_ATTR =
            t.NAVIGATION_ITEM_ATTR_ALERT =
            t.NAVIGATION_ITEM_ATTR_DISABLED =
            t.NAVIGATION_ITEM_ATTR_PRIORITY =
            t.NAVIGATION_ITEM_ATTR_ID =
            t.EVENT_NAVIGATION_CLICKED =
              void 0);
        var o,
          s = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var o = t[n];
                (o.enumerable = o.enumerable || !1),
                  (o.configurable = !0),
                  "value" in o && (o.writable = !0),
                  Object.defineProperty(e, o.key, o);
              }
            }
            return function (t, n, o) {
              return n && e(t.prototype, n), o && e(t, o), t;
            };
          })(),
          i = function e(t, n, o) {
            null === t && (t = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === s) {
              var i = Object.getPrototypeOf(t);
              return null === i ? void 0 : e(i, n, o);
            }
            if ("value" in s) return s.value;
            var a = s.get;
            return void 0 !== a ? a.call(o) : void 0;
          },
          a = n(10),
          r = (o = a) && o.__esModule ? o : { default: o },
          l = n(11),
          c = n(13);
        var u = (t.EVENT_NAVIGATION_CLICKED =
            "lol-uikit-navigation-item-click-event"),
          p = (t.NAVIGATION_ITEM_ATTR_ID = "item-id"),
          m = (t.NAVIGATION_ITEM_ATTR_PRIORITY = "priority"),
          d = (t.NAVIGATION_ITEM_ATTR_DISABLED = "disabled"),
          h = (t.NAVIGATION_ITEM_ATTR_ALERT = "alert"),
          f = (t.NAVIGATION_BAR_INDEX_ATTR = "selectedindex"),
          _ = (function (e) {
            function t() {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t);
              var n = e.component;
              if ("LOL-UIKIT-NAVIGATION-BAR" !== n.tagName)
                throw new Error(
                  "NavigationBarMediator expects the component to be a tag lol-uikit-navigation-bar",
                );
              var o = (function (e, t) {
                if (!e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !t || ("object" != typeof t && "function" != typeof t)
                  ? e
                  : t;
              })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n));
              return (o._options = e), o;
            }
            return (
              (function (e, t) {
                if ("function" != typeof t && null !== t)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof t,
                  );
                (e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  t &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(e, t)
                      : (e.__proto__ = t));
              })(t, e),
              s(t, [
                {
                  key: "_onNavigationItemClicked",
                  value: function (e) {
                    var t = e.target.getAttribute(p);
                    t &&
                      this._library.dispatchEvent(
                        l.EVENT_IN_SUBNAVIGATION_SUBSECTION_SELECTED,
                        t,
                      );
                  },
                },
                {
                  key: "_setComponentListeners",
                  value: function () {
                    var e = this;
                    this._component.addEventListener(u, function (t) {
                      return e._onNavigationItemClicked(t);
                    });
                  },
                },
                {
                  key: "_getSectionDataById",
                  value: function (e) {
                    var t = Array.prototype.slice.call(
                      this._component.childNodes,
                    );
                    t = t.filter(function (e) {
                      return "LOL-UIKIT-NAVIGATION-ITEM" === e.tagName;
                    });
                    for (var n = 0; n < t.length; n++) {
                      var o = t[n];
                      if (o.getAttribute(p) === e)
                        return { element: o, index: n };
                    }
                  },
                },
                {
                  key: "_onApiShowSubsection",
                  value: function (e) {
                    var t = this._getSectionDataById(e);
                    t
                      ? this._component.setAttribute(f, t.index)
                      : this._component.setAttribute(f, -1);
                  },
                },
                {
                  key: "_onApiRegisterSubsection",
                  value: function (e) {
                    var t = document.createElement("lol-uikit-navigation-item");
                    t.setAttribute(p, e.id),
                      t.setAttribute(m, e.priority),
                      (t.innerHTML = e.title),
                      !1 === e.enabled && t.setAttribute(d, "");
                    for (
                      var n = this._component.childNodes, o = 0;
                      o < n.length;
                      o++
                    ) {
                      var s = n[o];
                      if ("LOL-UIKIT-NAVIGATION-ITEM" === s.tagName)
                        if (
                          (0, c.sanitizeInteger)(s.getAttribute(m), 1) >
                          e.priority
                        )
                          return void this._component.insertBefore(t, s);
                    }
                    this._component.appendChild(t);
                  },
                },
                {
                  key: "_onApiSetEnableSubsection",
                  value: function (e, t) {
                    var n = this._getSectionDataById(e);
                    n &&
                      (t
                        ? n.element.removeAttribute(d)
                        : n.element.setAttribute(d, ""));
                  },
                },
                {
                  key: "_onApiSetTitleSubsection",
                  value: function (e, t) {
                    var n = this._getSectionDataById(e);
                    n && (n.element.innerHTML = t);
                  },
                },
                {
                  key: "_onApiSetTooltipSubsection",
                  value: function (e, t) {
                    var n = this._options,
                      o = n.TooltipManager,
                      s = n.TemplateHelper;
                    if (o && s) {
                      var i = this._getSectionDataById(e);
                      if (i)
                        if ("string" == typeof t && t.length > 0) {
                          var a = s.contentBlockTooltipSystem(t),
                            r = document.createElement("lol-uikit-tooltip");
                          r.appendChild(a);
                          o.assign(i.element, r, null, {
                            type: "system",
                            targetAnchor: { x: "center", y: "bottom" },
                            tooltipAnchor: { x: "center", y: "top" },
                          });
                        } else o.unassign(i.element);
                    } else
                      console.warn(
                        "NavigationBarMediator requires TooltipManager and TemplateHelper dependencies to run setTooltip",
                      );
                  },
                },
                {
                  key: "_onApiSetShowAlertSubsection",
                  value: function (e, t) {
                    var n = this._getSectionDataById(e);
                    n &&
                      (t
                        ? n.element.setAttribute(h, "")
                        : n.element.removeAttribute(h));
                  },
                },
                {
                  key: "_onDestroy",
                  value: function () {
                    i(
                      t.prototype.__proto__ ||
                        Object.getPrototypeOf(t.prototype),
                      "_onDestroy",
                      this,
                    ).call(this),
                      (this._options = null);
                  },
                },
              ]),
              t
            );
          })(r.default);
        t.default = _;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.SECTION_ATTR_ID =
            t.SECTION_ATTR_DISABLED =
            t.SECTION_CONTROLLER_ATTR_SELECTED_ITEM =
            t.EVENT_SECTION_HIDE =
            t.EVENT_SECTION_WILL_HIDE =
            t.EVENT_SECTION_SHOW =
            t.EVENT_SECTION_WILL_SHOW =
              void 0);
        var o = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var o = t[n];
                (o.enumerable = o.enumerable || !1),
                  (o.configurable = !0),
                  "value" in o && (o.writable = !0),
                  Object.defineProperty(e, o.key, o);
              }
            }
            return function (t, n, o) {
              return n && e(t.prototype, n), o && e(t, o), t;
            };
          })(),
          s = function e(t, n, o) {
            null === t && (t = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === s) {
              var i = Object.getPrototypeOf(t);
              return null === i ? void 0 : e(i, n, o);
            }
            if ("value" in s) return s.value;
            var a = s.get;
            return void 0 !== a ? a.call(o) : void 0;
          },
          i = l(n(10)),
          a = l(n(16)),
          r = n(11);
        function l(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var c = (t.EVENT_SECTION_WILL_SHOW = "elementWillShow"),
          u = (t.EVENT_SECTION_SHOW = "elementShow"),
          p = (t.EVENT_SECTION_WILL_HIDE = "elementWillHide"),
          m = (t.EVENT_SECTION_HIDE = "elementHide"),
          d = (t.SECTION_CONTROLLER_ATTR_SELECTED_ITEM = "selected-item"),
          h = (t.SECTION_ATTR_DISABLED = "disabled"),
          f = (t.SECTION_ATTR_ID = "section-id"),
          _ = (function (e) {
            function t() {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t);
              var n = e.component;
              if ("LOL-UIKIT-SECTION-CONTROLLER" !== n.tagName)
                throw new Error(
                  "SectionControllerMediator expected component with tag lol-uikit-section-controller",
                );
              var o = (function (e, t) {
                if (!e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !t || ("object" != typeof t && "function" != typeof t)
                  ? e
                  : t;
              })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n));
              return (
                (o._options = e),
                (o.sectionsRenders = {}),
                (o._currentSectionId = o._component.getAttribute(d)),
                o
              );
            }
            return (
              (function (e, t) {
                if ("function" != typeof t && null !== t)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof t,
                  );
                (e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  t &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(e, t)
                      : (e.__proto__ = t));
              })(t, e),
              o(t, [
                {
                  key: "_getSectionById",
                  value: function (e) {
                    return this._component.querySelector(
                      "[section-id='" + e + "']",
                    );
                  },
                },
                {
                  key: "_onDestroy",
                  value: function () {
                    s(
                      t.prototype.__proto__ ||
                        Object.getPrototypeOf(t.prototype),
                      "_onDestroy",
                      this,
                    ).call(this),
                      (this._options = null),
                      (this._currentSectionId = null),
                      (this.sectionsRenders = null);
                  },
                },
                {
                  key: "_onSectionWillShow",
                  value: function () {
                    var e = this._component.getAttribute(d);
                    e &&
                      ((this._currentSectionId = e),
                      this._library.dispatchEvent(
                        r.EVENT_IN_SECTION_WILL_SHOW,
                        e,
                      ));
                  },
                },
                {
                  key: "_onSectionShow",
                  value: function () {
                    var e = this._component.getAttribute(d);
                    e &&
                      ((this._currentSectionId = e),
                      this._library.dispatchEvent(r.EVENT_IN_SECTION_SHOW, e));
                  },
                },
                {
                  key: "_onSectionWillHide",
                  value: function () {
                    this._currentSectionId &&
                      this._library.dispatchEvent(
                        r.EVENT_IN_SECTION_WILL_HIDE,
                        this._currentSectionId,
                      );
                  },
                },
                {
                  key: "_onSectionHide",
                  value: function () {
                    this._currentSectionId &&
                      this._library.dispatchEvent(
                        r.EVENT_IN_SECTION_HIDE,
                        this._currentSectionId,
                      );
                  },
                },
                {
                  key: "_setComponentListeners",
                  value: function () {
                    this._component.addEventListener(
                      c,
                      this._onSectionWillShow.bind(this),
                    ),
                      this._component.addEventListener(
                        u,
                        this._onSectionShow.bind(this),
                      ),
                      this._component.addEventListener(
                        p,
                        this._onSectionWillHide.bind(this),
                      ),
                      this._component.addEventListener(
                        m,
                        this._onSectionHide.bind(this),
                      );
                  },
                },
                {
                  key: "_renderSection",
                  value: function (e, t, n) {
                    for (
                      var o = this.sectionsRenders[t],
                        s = a.default.create(o, n),
                        i = a.default.getDOMNode(s);
                      e.firstChild;

                    )
                      e.removeChild(e.firstChild);
                    e.appendChild(i);
                  },
                },
                {
                  key: "_onApiShowSubsection",
                  value: function (e, t) {
                    if (this._component.getAttribute(d) !== e) {
                      var n = this._getSectionById(e);
                      if (n)
                        this.sectionsRenders.hasOwnProperty(e) &&
                          !this._options.preload &&
                          this._renderSection(n, e, t),
                          this._component.setAttribute(d, e);
                    }
                  },
                },
                {
                  key: "_onApiRegisterSubsection",
                  value: function (e) {
                    var t = document.createElement("lol-uikit-section");
                    t.setAttribute(f, e.id),
                      e.enabled || t.setAttribute(h, ""),
                      (this.sectionsRenders[e.id] = e.render),
                      this._options.preload &&
                        this._renderSection(t, e.id, e.params || {}),
                      this._component.appendChild(t);
                  },
                },
                {
                  key: "_onApiSetEnableSubsection",
                  value: function (e, t) {
                    var n = this._getSectionById(e);
                    n && (t ? n.removeAttribute(h) : n.setAttribute(h, ""));
                  },
                },
              ]),
              t
            );
          })(i.default);
        t.default = _;
      },
      (e, t, n) => {
        "use strict";
        const o = n(17);
        e.exports = new o();
      },
      (e) => {
        "use strict";
        const t = "use_public_only",
          n = new WeakMap();
        function o(e) {
          return n.has(e) || n.set(e, {}), n.get(e);
        }
        function s(e) {
          return null !== e && "object" == typeof e;
        }
        const i = function () {
          this.factories = {};
        };
        (i.prototype.setFactory = function (e, t) {
          if (s(e)) {
            const n = "Component";
            let o = e.name ? e.name : Object.keys(e)[0];
            (t = e.create ? e.create : e[o]),
              -1 !== o.indexOf(n, o.length - n.length) &&
                (o = o.substring(0, o.length - n.length)),
              (e = o);
          } else if ("function" == typeof e) {
            throw new Error(
              "ComponentFactory.setFactory: type needs to be an object or a string, not a function!",
            );
          }
          this.factories[e] = t;
        }),
          (i.prototype.setPrivateFactory = function (e, t) {
            o(this)[e] = t;
          }),
          (i.prototype.getFactory = function (e) {
            const t = this.getPublicFactory(e);
            return t || this.getPrivateFactory(e);
          }),
          (i.prototype.getPublicFactory = function (e) {
            e instanceof Object && (e = e.type);
            return this.factories[e];
          }),
          (i.prototype.getPrivateFactory = function (e) {
            e instanceof Object && (e = e.type);
            return o(this)[e];
          }),
          (i.prototype.getFactories = function () {
            return Object.assign({}, this.factories);
          }),
          (i.prototype.setUpstreamComponentFactory = function (e) {
            const t = e.getFactories();
            Object.keys(t).forEach(
              function (e) {
                this.setPrivateFactory(e, t[e]);
              }.bind(this),
            );
          }),
          (i.prototype.create = function (e, t, n) {
            if ("string" == typeof e) return this.createByName(e, t, n);
            if ("function" == typeof e) return e(t);
            if (
              (s((o = e)) && o instanceof HTMLElement && 1 === o.nodeType) ||
              e.domNode
            )
              return e;
            var o;
            const i = this.create(e.type, t || e.data);
            return (
              (e.domNode = this.getDOMNode(i)),
              e.classNames &&
                e.classNames.forEach(function (t) {
                  e.domNode.classList.add(t);
                }),
              i
            );
          }),
          (i.prototype.createByName = function (e, t, n) {
            const o = this.findFactory(e, n);
            return o ? this.create(o, t) : this.buildDummy(e);
          }),
          (i.prototype.findFactory = function (e, n) {
            return n === t ? this.getPublicFactory(e) : this.getFactory(e);
          }),
          (i.prototype.buildDummy = function (e) {
            let t = document.createElement("div");
            return (
              (t.innerHTML = "not found: " + e),
              1 === t.children.length && (t = t.children[0]),
              t
            );
          }),
          (i.prototype.getDOMNode = function (e) {
            if (e)
              return e instanceof HTMLElement || e instanceof Node
                ? e
                : e instanceof Object
                  ? e.domNode
                  : void 0;
          }),
          (i.prototype.exportable = function () {
            const e = this;
            return {
              create: function (n, o) {
                return e.create(n, o, t);
              },
              getFactories: function () {
                return e.getFactories.apply(e, arguments);
              },
            };
          }),
          (i.prototype.reset = function () {
            this.factories = {};
          }),
          (e.exports = i);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o,
          s = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var o = t[n];
                (o.enumerable = o.enumerable || !1),
                  (o.configurable = !0),
                  "value" in o && (o.writable = !0),
                  Object.defineProperty(e, o.key, o);
              }
            }
            return function (t, n, o) {
              return n && e(t.prototype, n), o && e(t, o), t;
            };
          })(),
          i = function e(t, n, o) {
            null === t && (t = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === s) {
              var i = Object.getPrototypeOf(t);
              return null === i ? void 0 : e(i, n, o);
            }
            if ("value" in s) return s.value;
            var a = s.get;
            return void 0 !== a ? a.call(o) : void 0;
          },
          a = n(10),
          r = (o = a) && o.__esModule ? o : { default: o },
          l = n(11);
        var c = ["Navigation"],
          u = (function (e) {
            function t() {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t);
              var n = (function (e, t) {
                if (!e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !t || ("object" != typeof t && "function" != typeof t)
                  ? e
                  : t;
              })(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, null),
              );
              return (
                c.forEach(function (t) {
                  if (!e.hasOwnProperty(t))
                    throw new Error(
                      "FullPageModalMediator options[" + t + "] is mandatory",
                    );
                }),
                (n._options = e),
                (n.screenNode = document.createElement("span")),
                (n._fullPageModal = null),
                (n._dispatchScreenHidden = function () {
                  n._library.dispatchEvent(l.EVENT_IN_SCREEN_HIDDEN);
                }),
                n
              );
            }
            return (
              (function (e, t) {
                if ("function" != typeof t && null !== t)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof t,
                  );
                (e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  t &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(e, t)
                      : (e.__proto__ = t));
              })(t, e),
              s(t, [
                {
                  key: "getScreenNode",
                  value: function () {
                    return this.screenNode;
                  },
                },
                {
                  key: "_onApiScreenShow",
                  value: function () {
                    var e = this._options.Navigation;
                    (this._fullPageModal = e
                      .getFullPageModalManager()
                      .open({ data: { contents: this.screenNode } })),
                      this._fullPageModal.domNode.addEventListener(
                        "close",
                        this._dispatchScreenHidden,
                      );
                  },
                },
                {
                  key: "_onDestroy",
                  value: function () {
                    if (
                      (i(
                        t.prototype.__proto__ ||
                          Object.getPrototypeOf(t.prototype),
                        "_onDestroy",
                        this,
                      ).call(this),
                      this._fullPageModal)
                    ) {
                      var e = this._fullPageModal.domNode;
                      e.removeEventListener(
                        "close",
                        this._dispatchScreenHidden,
                      ),
                        e.dispatchEvent(
                          new Event("close-modal", { bubbles: !0 }),
                        );
                    }
                    (this._options = null),
                      (this.screenNode = null),
                      (this._fullPageModal = null),
                      (this._dispatchScreenHidden = null);
                  },
                },
              ]),
              t
            );
          })(r.default);
        t.default = u;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o,
          s = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var o = t[n];
                (o.enumerable = o.enumerable || !1),
                  (o.configurable = !0),
                  "value" in o && (o.writable = !0),
                  Object.defineProperty(e, o.key, o);
              }
            }
            return function (t, n, o) {
              return n && e(t.prototype, n), o && e(t, o), t;
            };
          })(),
          i = function e(t, n, o) {
            null === t && (t = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === s) {
              var i = Object.getPrototypeOf(t);
              return null === i ? void 0 : e(i, n, o);
            }
            if ("value" in s) return s.value;
            var a = s.get;
            return void 0 !== a ? a.call(o) : void 0;
          },
          a = n(10),
          r = (o = a) && o.__esModule ? o : { default: o },
          l = n(11);
        var c = ["UIKit"],
          u = (function (e) {
            function t() {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t);
              var n = (function (e, t) {
                if (!e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !t || ("object" != typeof t && "function" != typeof t)
                  ? e
                  : t;
              })(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, null),
              );
              return (
                c.forEach(function (t) {
                  if (!e.hasOwnProperty(t))
                    throw new Error(
                      "DialogFrameMediator options[" + t + "] is mandatory",
                    );
                }),
                (n._options = e),
                (n.dialogFrame = n._buildDialogFrame()),
                (n._dispatchScreenHidden = function () {
                  n._library.dispatchEvent(l.EVENT_IN_SCREEN_HIDDEN);
                }),
                n
              );
            }
            return (
              (function (e, t) {
                if ("function" != typeof t && null !== t)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof t,
                  );
                (e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  t &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(e, t)
                      : (e.__proto__ = t));
              })(t, e),
              s(t, [
                {
                  key: "getScreenNode",
                  value: function () {
                    return this.dialogFrame;
                  },
                },
                {
                  key: "_onApiScreenShow",
                  value: function () {
                    this._options.UIKit.getLayerManager().addLayer(
                      this.dialogFrame,
                    ),
                      this.dialogFrame.addEventListener(
                        "dialogFrameDismissed",
                        this._dispatchScreenHidden,
                      );
                  },
                },
                {
                  key: "_onDestroy",
                  value: function () {
                    i(
                      t.prototype.__proto__ ||
                        Object.getPrototypeOf(t.prototype),
                      "_onDestroy",
                      this,
                    ).call(this);
                    var e = this._options.UIKit;
                    this.dialogFrame &&
                      (e.getLayerManager().removeLayer(this.dialogFrame),
                      this.dialogFrame.removeEventListener(
                        "dialogFrameDismissed",
                        this._dispatchScreenHidden,
                      )),
                      (this._options = null),
                      (this.dialogFrame = null),
                      (this._dispatchScreenHidden = null);
                  },
                },
                {
                  key: "_buildDialogFrame",
                  value: function () {
                    var e = document.createElement("lol-uikit-dialog-frame"),
                      t = this._options.attributes || {};
                    for (var n in t)
                      t.hasOwnProperty(n) && e.setAttribute(n, t[n]);
                    return (
                      this._options.dialogFrameClassName &&
                        e.classList.add(this._options.dialogFrameClassName),
                      e
                    );
                  },
                },
              ]),
              t
            );
          })(r.default);
        t.default = u;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o,
          s = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var o = t[n];
                (o.enumerable = o.enumerable || !1),
                  (o.configurable = !0),
                  "value" in o && (o.writable = !0),
                  Object.defineProperty(e, o.key, o);
              }
            }
            return function (t, n, o) {
              return n && e(t.prototype, n), o && e(t, o), t;
            };
          })(),
          i = function e(t, n, o) {
            null === t && (t = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === s) {
              var i = Object.getPrototypeOf(t);
              return null === i ? void 0 : e(i, n, o);
            }
            if ("value" in s) return s.value;
            var a = s.get;
            return void 0 !== a ? a.call(o) : void 0;
          },
          a = n(10),
          r = (o = a) && o.__esModule ? o : { default: o },
          l = n(11);
        var c = [
            "screenName",
            "displayPriority",
            "displayNameLocKey",
            "Viewport",
            "Navigation",
          ],
          u = (function (e) {
            function t() {
              var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t);
              var n = (function (e, t) {
                if (!e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !t || ("object" != typeof t && "function" != typeof t)
                  ? e
                  : t;
              })(
                this,
                (t.__proto__ || Object.getPrototypeOf(t)).call(this, null),
              );
              c.forEach(function (t) {
                if (!e.hasOwnProperty(t))
                  throw new Error(
                    "MainNavigationMediator options[" + t + "] is mandatory",
                  );
              }),
                (n._options = Object.assign({ alignment: "left" }, e));
              var o = e.Viewport,
                s = e.Navigation;
              return (
                e.defaultSectionIdOnShow &&
                  (n.defaultSectionIdOnShow = e.defaultSectionIdOnShow),
                (n.screenRoot = o.main().getScreenRoot(e.screenName)),
                (n.screenNode = n.screenRoot.getElement()),
                (n.navigationItem = s.addItem(
                  {
                    show: n._onMainNavigationShow.bind(n),
                    hide: n._onMainNavigationHide.bind(n),
                  },
                  {
                    id: e.screenName,
                    priority: e.displayPriority,
                    alignment: n._options.alignment,
                    iconPath: n._options.iconPath,
                    iconClickVideo: n._options.iconClickVideo,
                    displayNameLocKey: n._options.displayNameLocKey,
                    disabled: n._options.disabled,
                    tooltipRenderer: n._options.tooltipRenderer,
                  },
                )),
                n.screenRoot.on("willShow", function () {
                  var e = void 0;
                  n._library &&
                    (n.defaultSectionIdOnShow
                      ? ((e = n.defaultSectionIdOnShow),
                        "function" == typeof n.defaultSectionIdOnShow &&
                          (e = n.defaultSectionIdOnShow()))
                      : n.subsectionToShow && (e = n.subsectionToShow.id),
                    e &&
                      (n._library.dispatchEvent(l.EVENT_IN_SCREEN_SHOWN),
                      n._library.dispatchEvent(
                        l.EVENT_IN_SUBNAVIGATION_SUBSECTION_SELECTED,
                        e,
                      )));
                }),
                n.screenRoot.on("hide", function () {
                  n._library &&
                    n._library.dispatchEvent(l.EVENT_IN_SCREEN_HIDDEN);
                }),
                n
              );
            }
            return (
              (function (e, t) {
                if ("function" != typeof t && null !== t)
                  throw new TypeError(
                    "Super expression must either be null or a function, not " +
                      typeof t,
                  );
                (e.prototype = Object.create(t && t.prototype, {
                  constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                  t &&
                    (Object.setPrototypeOf
                      ? Object.setPrototypeOf(e, t)
                      : (e.__proto__ = t));
              })(t, e),
              s(t, [
                {
                  key: "getScreenNode",
                  value: function () {
                    return this.screenNode;
                  },
                },
                {
                  key: "getMainNavigationItem",
                  value: function () {
                    return this.navigationItem;
                  },
                },
                {
                  key: "_onMainNavigationShow",
                  value: function () {
                    this.screenRoot.bump();
                  },
                },
                {
                  key: "_onMainNavigationHide",
                  value: function () {
                    this.screenRoot.release();
                  },
                },
                {
                  key: "_onDestroy",
                  value: function () {
                    i(
                      t.prototype.__proto__ ||
                        Object.getPrototypeOf(t.prototype),
                      "_onDestroy",
                      this,
                    ).call(this),
                      (this._options = null),
                      (this.screenNode = null),
                      (this.screenRoot = null);
                  },
                },
                {
                  key: "_onApiRegisterSubsection",
                  value: function (e) {
                    (!this.subsectionToShow ||
                      this.subsectionToShow.priority > e.priority) &&
                      (this.subsectionToShow = e);
                  },
                },
              ]),
              t
            );
          })(r.default);
        t.default = u;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.getSettingValue = function (e, t, n) {
            if (t && Object.hasOwnProperty.call(t, e) && null !== t[e])
              return t[e];
            return n;
          });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "L/EbvJAi",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\root\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\root\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\root\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-section-controller",[]],["dynamic-attr","class",["concat",["cdp-section-controller ",["unknown",["championClass"]]]]],["static-attr","animation","crossfade"],["flush-element"],["text","\\n"],["text","  "],["open-element","lol-uikit-section",[]],["static-attr","section-id","cdp_overview"],["static-attr","class","cdp-section-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["overviewShouldLoad"]]],null,7],["text","  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-section",[]],["static-attr","section-id","cdp_progression"],["static-attr","class","cdp-section-container progression"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["progressionDisabled"]]],null,6],["text","  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-section",[]],["static-attr","section-id","cdp_abilities"],["static-attr","class","cdp-abilities-section-container"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["abilitiesDisabled"]]],null,4],["text","  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-section",[]],["static-attr","section-id","cdp_skins"],["static-attr","class","cdp-section-container cdp-skins-section-container"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["skinsDisabled"]]],null,2],["text","  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-section",[]],["static-attr","section-id","cdp_mastery"],["static-attr","class","cdp-mastery-section-container mastery"],["flush-element"],["text","\\n"],["block",["if"],[["get",["masteryShouldLoad"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","lol-uikit-navigation-bar",[]],["static-attr","class","cdp-nav-bar-lcm"],["static-attr","type","nav-bar-secondary"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-navigation-item",[]],["static-attr","item-id","cdp_overview"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","cdp_navigation_overview"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-navigation-item",[]],["static-attr","item-id","cdp_abilities"],["dynamic-attr","disabled",["unknown",["abilitiesDisabled"]],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","cdp_navigation_abilities"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-navigation-item",[]],["static-attr","item-id","cdp_mastery"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","cdp_navigation_mastery"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-navigation-item",[]],["static-attr","item-id","cdp_progression"],["dynamic-attr","disabled",["unknown",["progressionDisabled"]],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","cdp_navigation_progression_eternals"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-navigation-item",[]],["static-attr","item-id","cdp_skins"],["dynamic-attr","disabled",["unknown",["skinsDisabled"]],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","cdp_navigation_skins"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["append",["unknown",["title-lockup-lcm"]],false],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["mastery-section"],null,[["sectionLoaded"],[["helper",["action"],[["get",[null]],"sectionLoaded"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["skins-section"],null,[["showStoreButton","sectionLoaded","destroyComponent","inputSkinId"],[["get",["showStoreButton"]],["helper",["action"],[["get",[null]],"sectionLoaded"],null],["get",["destroyComponent"]],["get",["skinId"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["skinsShouldLoad"]]],null,1]],"locals":[]},{"statements":[["text","        "],["append",["helper",["abilities-section"],null,[["abilitiesSectionShown","sectionLoaded"],[["get",["abilitiesSectionShown"]],["helper",["action"],[["get",[null]],"sectionLoaded"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["abilitiesShouldLoad"]]],null,3]],"locals":[]},{"statements":[["text","        "],["append",["helper",["champion-backdrop"],null,[["sectionLoaded","section"],[["helper",["action"],[["get",[null]],"sectionLoaded"],null],"progression"]]],false],["text","\\n        "],["append",["helper",["progression-section"],null,[["sectionLoaded","setBackdropFadeout","destroyComponent"],[["helper",["action"],[["get",[null]],"sectionLoaded"],null],["helper",["action"],[["get",[null]],"setBackdropFadeout"],null],["get",["destroyComponent"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["progressionShouldLoad"]]],null,5]],"locals":[]},{"statements":[["text","      "],["append",["helper",["champion-backdrop"],null,[["sectionLoaded","section"],[["helper",["action"],[["get",[null]],"sectionLoaded"],null],"overview"]]],false],["text","\\n      "],["append",["helper",["overview-section"],null,[["showStoreButton","sectionLoaded","destroyComponent"],[["get",["showStoreButton"]],["helper",["action"],[["get",[null]],"sectionLoaded"],null],["get",["destroyComponent"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(25),
          (e.exports = o.Ember.Component.extend({
            classNames: ["cdp-backdrop-component"],
            layout: n(26),
            championService: o.Ember.inject.service("champion"),
            section: null,
            champion: o.Ember.computed.alias("championService.champion"),
            didInsertElement: o.Ember.on("didInsertElement", function () {
              const e = this.get("element").querySelector("img"),
                t = () => this.sendAction("sectionLoaded", "overview");
              e.complete ? t() : (e.onload = t);
            }),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "22HQBE3g",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\shared\\\\champion-backdrop\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\shared\\\\champion-backdrop\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\shared\\\\champion-backdrop\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-backdrop ",["unknown",["section"]]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-backdrop-img-overlay"],["flush-element"],["close-element"],["text","\\n  "],["open-element","img",[]],["static-attr","class","cdp-backdrop-img"],["dynamic-attr","src",["concat",[["unknown",["champion","skins","0","splashPath"]]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          s = n(28);
        n(29),
          (e.exports = o.Ember.Component.extend({
            classNames: ["lcm-cdp-title-lockup-component"],
            layout: n(30),
            championService: o.Ember.inject.service("champion"),
            champion: o.Ember.computed.alias("championService.champion"),
            primaryRole: o.Ember.computed("champion.roles", function () {
              const e = this.get("champion.roles");
              if (e && e[0]) return e[0];
            }),
            primaryRoleString: o.Ember.computed(
              "primaryRole",
              "tra.cdp_role_assassin",
              "tra.cdp_role_fighter",
              "tra.cdp_role_mage",
              "tra.cdp_role_marksman",
              "tra.cdp_role_support",
              "tra.cdp_role_tank",
              function () {
                const e = this.get("primaryRole");
                return e ? (0, s.translate)(this, `cdp_role_${e}`) : "";
              },
            ),
          }));
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.translate = function (e, t, n) {
            const o = e.get("tra");
            return o.get("formatString")(t, n);
          });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "oy4BC6PU",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\shared\\\\title-lockup-lcm\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\shared\\\\title-lockup-lcm\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\shared\\\\title-lockup-lcm\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","title-lockup-background"],["flush-element"],["text","\\n  "],["open-element","svg",[]],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["static-attr","width","316"],["static-attr","height","48"],["static-attr","viewBox","0 0 316 48"],["static-attr","fill","none"],["flush-element"],["text","\\n    "],["open-element","path",[]],["static-attr","d","M-9 1.00024H313.735L271.785 47.0002H-9V1.00024Z"],["static-attr","fill","#010A13"],["static-attr","stroke","#463714"],["static-attr","stroke-width","2"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","champion-role-icon-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","champion-role-icon-background"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["champion-role-icon ",["unknown",["primaryRole"]]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["primaryRoleString"]]],null,1],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","champion-info"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lockup-champion-name"],["flush-element"],["text","\\n    "],["append",["unknown",["champion","name"]],false],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","lockup-champion-title"],["flush-element"],["text","\\n    "],["append",["unknown",["champion","title"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","class","cdp-role-tooltip"],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["primaryRoleString"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["bottom","system"]],0]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(32),
          (e.exports = o.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-progression-section"],
            layout: n(33),
            championService: o.Ember.inject.service("champion"),
            statstonesService: o.Ember.inject.service("statstones"),
            champion: o.Ember.computed.alias("championService.champion"),
            onInit: o.Ember.on("didRender", function () {
              this.sendAction("sectionLoaded", "progression");
            }),
            hoveredStatstone: null,
            playerRecord: o.Ember.computed.alias(
              "hoveredStatstone.playerRecord",
            ),
            showHoverPanel: o.Ember.computed.notEmpty("hoveredStatstone"),
            hasFeatured: o.Ember.computed.notEmpty(
              "statstonesService.featuredStatstones",
            ),
            hoveredClassName: o.Ember.computed("showHoverPanel", function () {
              return this.get("showHoverPanel") ? "hovered" : "";
            }),
            isOwned: o.Ember.computed.and(
              "playerRecord",
              "playerRecord.entitled",
            ),
            setFadeout: o.Ember.computed("showHoverPanel", function () {
              return (
                this.get("showHoverPanel")
                  ? this.sendAction("setBackdropFadeout", !0)
                  : this.sendAction("setBackdropFadeout", !1),
                0
              );
            }),
            baseStatstoneImagePath: o.Ember.computed(
              "hoveredStatstone",
              "hoveredStatstone.category",
              function () {
                if (null === this.get("hoveredStatstone")) return "";
                return `/lol-game-data/assets/ASSETS/Loadouts/StatStones/Categories/LCU/SS_Icon_${this.get("hoveredStatstone.category")}`;
              },
            ),
            statstonePatronName: o.Ember.computed(
              "hoveredStatstone",
              "tra.cdp_progression_statstones_warrior",
              "tra.cdp_progression_statstones_warden",
              "tra.cdp_progression_statstones_guardian",
              "tra.cdp_progression_statstones_trickster",
              "tra.cdp_progression_statstones_guide",
              "tra.cdp_progression_statstones_empress",
              function () {
                const e = this.get("hoveredStatstone");
                return null === e
                  ? ""
                  : "Offense" === e.category
                    ? this.get("tra.cdp_progression_statstones_warrior")
                    : "CC" === e.category
                      ? this.get("tra.cdp_progression_statstones_warden")
                      : "Defense" === e.category
                        ? this.get("tra.cdp_progression_statstones_guardian")
                        : "Style" === e.category
                          ? this.get("tra.cdp_progression_statstones_trickster")
                          : "Support" === e.category
                            ? this.get("tra.cdp_progression_statstones_guide")
                            : this.get(
                                "tra.cdp_progression_statstones_empress",
                              );
              },
            ),
            actions: {
              launchInfoLink: function () {
                o.EternalsApi.showFirstTouchModal();
              },
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "yPle8h+x",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\root\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\root\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\root\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-content-left ",["unknown",["setFadeout"]]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression-header"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-progression-title"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstone_title_text"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-eternals-info"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-info-icon",[]],["static-attr","class","cdp-eternals-info-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"launchInfoLink"],null],null],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression"],["flush-element"],["text","\\n    "],["append",["helper",["progression-series"],null,[["hoveredStatstone"],[["get",["hoveredStatstone"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-content-right ",["unknown",["hoveredClassName"]]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["showHoverPanel"]]],null,6,1],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","cdp-progression-section-title"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-progression-divider title"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-content-divider-line-end"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-content-divider-line"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","cdp-progression-section-title-text"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_featured_title"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-progression-divider title"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-content-divider-line"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-content-divider-line-end"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["append",["unknown",["progression-showcase"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["hasFeatured"]]],null,0]],"locals":[]},{"statements":[["text","              "],["append",["unknown",["tra","cdp_progression_statstones_rarity_common"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["unknown",["tra","cdp_progression_statstones_rarity_unique"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-title"],["flush-element"],["text","\\n            "],["append",["unknown",["hoveredStatstone","name"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-rarity"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hoveredStatstone","isEpic"]]],null,3,2],["text","          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-blurb"],["flush-element"],["text","\\n            "],["append",["unknown",["hoveredStatstone","description"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-image-panel"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-image"],["dynamic-attr","style",["concat",["background-image: url(\\"",["unknown",["baseStatstoneImagePath"]],"_1.png\\");"]]],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-image"],["dynamic-attr","style",["concat",["background-image: url(\\"",["unknown",["baseStatstoneImagePath"]],"_2.png\\");"]]],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-image"],["dynamic-attr","style",["concat",["background-image: url(\\"",["unknown",["baseStatstoneImagePath"]],"_3.png\\");"]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-reward-text"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","cdp_progression_statstones_hover_rewards"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-reward-section"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-reward-section personal-best"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-image"],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-title"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_hover_personal_best"]],false],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-description"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_hover_personal_best_desc"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-reward-section mastery-emote"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-image"],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-title"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_hover_mastery_emote"]],false],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-description"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_hover_mastery_emote_desc"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["details-section"],null,[["statstone"],[["get",["hoveredStatstone"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","cdp-right-hover-panel"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isOwned"]]],null,5,4],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(35);
        const { RunMixin: s } = o.EmberAddons.EmberLifeline;
        e.exports = o.Ember.Component.extend(s, {
          classNames: ["rcp-fe-lol-champion-details-series-component"],
          classNameBindings: ["hasEternals:has-eternals:no-eternals"],
          layout: n(36),
          statstonesService: o.Ember.inject.service("statstones"),
          hoveredStatstone: null,
          isTimeout: !1,
          statstonesSeries: o.Ember.computed.alias(
            "statstonesService.statstoneData",
          ),
          hasStatstoneData: o.Ember.computed("statstonesSeries", function () {
            return null !== this.get("statstonesSeries");
          }),
          hasNoStatstones: o.Ember.computed("statstonesSeries", function () {
            return 0 === this.get("statstonesSeries").length;
          }),
          init: function () {
            this._super(...arguments),
              this.runTask(() => {
                this.set("isTimeout", !0);
              }, 4e3);
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "4D7st6hu",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-series-info-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasStatstoneData"]]],null,6,2],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["uikit-spinner"],null,[["class"],["cdp-series-info-spinner"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","cdp-series-timeout-message"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_load_error"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isTimeout"]]],null,1,0]],"locals":[]},{"statements":[["text","        "],["append",["helper",["series-info"],null,[["series","hoveredStatstone"],[["get",["series"]],["get",["hoveredStatstone"]]]]],false],["text","\\n"]],"locals":["series"]},{"statements":[["text","    "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","cdp-series-scrollable"],["static-attr","overflow-masks","bottom"],["flush-element"],["text","\\n"],["block",["each"],[["get",["statstonesSeries"]]],null,3],["text","    "],["close-element"],["text","\\n    "],["append",["unknown",["hover"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","cdp-series-no-statstones"],["flush-element"],["append",["unknown",["tra","cdp_progression_no_statstones_for_champ"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["hasNoStatstones"]]],null,5,4]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(38),
          (e.exports = o.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-showcase-section"],
            layout: n(39),
            statstonesService: o.Ember.inject.service("statstones"),
            featuredStatstones: o.Ember.computed.alias(
              "statstonesService.featuredStatstones",
            ),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "0kD6rXnw",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\showcase-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\showcase-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\showcase-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-progression-showcase-component"],["flush-element"],["text","\\n"],["block",["each"],[["get",["featuredStatstones"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["showcase-item"],null,[["showcaseItem"],[["get",["showcaseItem"]]]]],false],["text","\\n"]],"locals":["showcaseItem"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(41),
          s = n(1),
          i = n(59);
        n(60),
          (e.exports = s.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-series-info-component"],
            layout: n(61),
            catalogService: s.Ember.inject.service("catalog"),
            statstonesService: s.Ember.inject.service("statstones"),
            series: null,
            hoveredStatstone: null,
            seriesLength: s.Ember.computed.alias("series.statstones.length"),
            statstonesOwned: s.Ember.computed.alias("series.stonesOwned"),
            ownedFromPacks: s.Ember.computed.alias("series.ownedFromPacks"),
            milestonesPassed: s.Ember.computed.alias("series.milestonesPassed"),
            setCompleted: s.Ember.computed(
              "totalMilestones",
              "milestonesPassed",
              function () {
                const e = this.get("totalMilestones");
                return this.get("milestonesPassed") >= e;
              },
            ),
            totalMilestones: s.Ember.computed("seriesLength", function () {
              return i.MILESTONE_COMPLETION_LEVEL * this.get("seriesLength");
            }),
            seriesCompleted: s.Ember.computed(
              "statstonesCompleted",
              "seriesLength",
              function () {
                return (
                  this.get("statstonesCompleted") === this.get("seriesLength")
                );
              },
            ),
            seriesOwned: s.Ember.computed(
              "seriesLength",
              "statstonesOwned",
              function () {
                const e = this.get("seriesLength");
                return this.get("statstonesOwned") === e;
              },
            ),
            showUnlockAllButton: s.Ember.computed(
              "seriesLength",
              "statstonesOwned",
              function () {
                const e = this.get("seriesLength");
                return this.get("statstonesOwned") < e;
              },
            ),
            shouldRenderSale: s.Ember.computed(
              "series",
              "catalogService.salesData.[]",
              function () {
                const e = this.get("series"),
                  t = this.get("catalogService.salesData");
                if (!(e && Array.isArray(e.statstones) && t && t.length))
                  return !1;
                const n = this.getPackId(e),
                  o = this.get("catalogService").getIsItemOnSale(parseInt(n));
                return (
                  this.get("catalogService").getIsItemOnSale(e.itemId) || o
                );
              },
            ),
            showStatstonesCompleted: s.Ember.computed.not(
              "showUnlockAllButton",
            ),
            showPAWChoiceModal() {
              const e = this.get("series"),
                t = this.getPackId(e),
                n = [e.itemId];
              t && n.push(t),
                s.PawPlugin.createPAWChoiceModal(
                  { itemIds: n, inventoryType: e.inventoryType },
                  i.CDP_PAW_ID,
                  o.PAW.MODAL_TYPES.CHAMPION_MODAL,
                  this.element,
                );
            },
            getPackId(e) {
              return this.get("statstonesService").getContainingPackItemId(
                e.itemId,
              );
            },
            actions: {
              unlockAll: function () {
                this.showPAWChoiceModal();
              },
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "PAW", {
            enumerable: !0,
            get: function () {
              return o.default;
            },
          }),
          Object.defineProperty(t, "PROFILE_PRIVACY", {
            enumerable: !0,
            get: function () {
              return l.default;
            },
          }),
          Object.defineProperty(t, "QUEUES", {
            enumerable: !0,
            get: function () {
              return s.default;
            },
          }),
          Object.defineProperty(t, "REWARD_TRACKER", {
            enumerable: !0,
            get: function () {
              return i.default;
            },
          }),
          Object.defineProperty(t, "SETTINGS", {
            enumerable: !0,
            get: function () {
              return r.default;
            },
          }),
          Object.defineProperty(t, "SOCIAL", {
            enumerable: !0,
            get: function () {
              return a.default;
            },
          }),
          Object.defineProperty(t, "TIME", {
            enumerable: !0,
            get: function () {
              return c.default;
            },
          });
        var o = u(n(42)),
          s = u(n(53)),
          i = u(n(54)),
          a = u(n(55)),
          r = u(n(56)),
          l = u(n(57)),
          c = u(n(58));
        function u(e) {
          return e && e.__esModule ? e : { default: e };
        }
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var o = d(n(43)),
          s = d(n(44)),
          i = d(n(45)),
          a = d(n(46)),
          r = d(n(47)),
          l = d(n(48)),
          c = d(n(49)),
          u = d(n(50)),
          p = d(n(51)),
          m = d(n(52));
        function d(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var h = {
          COMPONENT_TYPES: o.default,
          CURRENCY_TYPES: s.default,
          INVENTORY_TYPES: i.default,
          MEDIA_TYPES: a.default,
          MEDIA_LOAD_TYPES: r.default,
          MODAL_TYPES: l.default,
          OFFER_PURCHASE_STATES: c.default,
          OFFER_VALIDATION_STATES: u.default,
          SCROLL_LIST_DISPLAY_TYPES: p.default,
          TEMPLATE_TYPES: m.default,
        };
        t.default = h;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = {
          TEXT: "TEXT",
          TITLE_SUBTITLE: "TITLE_SUBTITLE",
          PURCHASE: "PURCHASE",
          MEDIA: "MEDIA",
          IMAGE_CAROUSEL: "IMAGE_CAROUSEL",
          SCROLL_LIST: "SCROLL_LIST",
          VERTICAL_LIST: "VERTICAL_LIST",
        };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = { RP: "RP", IP: "IP", BE: "lol_blue_essence" };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = {
          CHAMPION: "CHAMPION",
          CHAMPION_SKIN: "CHAMPION_SKIN",
          WARD_SKIN: "WARD_SKIN",
          BATTLE_BOOST: "BATTLE_BOOST",
          GIFT: "GIFT",
          MYSTERY: "MYSTERY",
          BUNDLES: "BUNDLES",
          SUMMONER_ICON: "SUMMONER_ICON",
          STATSTONE: "STATSTONE",
        };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = { SVG: "SVG", IMAGE: "IMAGE", VIDEO: "VIDEO" };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = {
          LOCAL_ASSET: "LOCAL_ASSET",
          EXTERNAL_URL: "EXTERNAL_URL",
          GAME_DATA: "GAME_DATA",
        };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = {
          CHAMPION_MODAL: "CHAMPION_MODAL",
          SKIN_VIEWER_MODAL: "SKIN_VIEWER_MODAL",
          MULTIPLE_PURCHASE_MODAL: "MULTIPLE_PURCHASE_MODAL",
          CHROMA_MODAL: "CHROMA_MODAL",
          CHROMA_BUNDLE_MODAL: "CHROMA_BUNDLE_MODAL",
          SUMMONER_ICON_MODAL: "SUMMONER_ICON_MODAL",
          WARD_SKIN_MODAL: "WARD_SKIN_MODAL",
          SKIN_WITH_DEPENDENCY_MODAL: "SKIN_WITH_DEPENDENCY_MODAL",
          PAW_GENERIC_MODAL: "PAW_GENERIC_MODAL",
        };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = {
          NOT_STARTED: "NOT_STARTED",
          IN_PROGRESS: "IN_PROGRESS",
          SUCCESS: "SUCCESS",
          FAIL: "FAIL",
        };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = {
          NOT_STARTED: "NOT_STARTED",
          IN_PROGRESS: "IN_PROGRESS",
          COMPLETED: "COMPLETED",
        };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = {
          EXPANDED: "EXPANDED",
          COMPACT: "COMPACT",
          DETAILED: "DETAILED",
        };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = { LARGE_TWO_COLUMN_LANDSCAPE: "LARGE_TWO_COLUMN_LANDSCAPE" };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        const n = "RANKED_SOLO_5x5",
          o = "RANKED_FLEX_SR",
          s = "RANKED_FLEX_TT",
          i = "CHERRY",
          a = "RANKED_TFT",
          r = "RANKED_TFT_DOUBLE_UP",
          l = "RANKED_TFT_TURBO",
          c = "RANKED_TFT_PAIRS",
          u = [n, o],
          p = [...u, s],
          m = [i],
          d = [a, r],
          h = [l, c],
          f = [...d, ...h],
          _ = [...p, ...d],
          g = [...h, ...m];
        var v = {
          RANKED_SOLO_5x5_QUEUE_TYPE: n,
          RANKED_FLEX_SR_QUEUE_TYPE: o,
          RANKED_FLEX_TT_QUEUE_TYPE: s,
          RANKED_CHERRY_QUEUE_TYPE: i,
          RANKED_TFT_QUEUE_TYPE: a,
          RANKED_TFT_DOUBLE_UP_QUEUE_TYPE: r,
          RANKED_TFT_TURBO_QUEUE_TYPE: l,
          RANKED_TFT_PAIRS_QUEUE_TYPE: c,
          RANKED_LOL_QUEUE_TYPES: p,
          RANKED_SR_QUEUE_TYPES: u,
          RANKED_TFT_QUEUE_TYPES: d,
          RATED_TFT_QUEUE_TYPES: h,
          RANKED_AND_RATED_TFT_QUEUE_TYPES: f,
          ALL_RANKED_QUEUE_TYPES: _,
          ALL_RATED_QUEUE_TYPES: g,
          ALL_RANKED_AND_RATED_QUEUE_TYPES: [..._, ...g],
        };
        t.default = v;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = {
          REWARD_TAGS: {
            INSTANT: "Instant",
            RARE: "Rare",
            CHOICE: "Choice",
            MULTIPLE: "Multiple",
          },
          MILESTONE_STAGES: {
            COMPLETED: "completed",
            CURRENT: "current",
            FUTURE: "future",
            HOVERING_COMPLETED: "future-completed",
          },
          REWARD_STATE: {
            LOCKED: "Locked",
            UNLOCKED: "Unlocked",
            UNSELECTED: "Unselected",
            SELECTED: "Selected",
          },
          TRACKER_SIZE: {
            SMALL: "tracker-size-small",
            MEDIUM: "tracker-size-medium",
          },
          REWARD_OPTION_HEADER_TYPE: {
            FREE: "FREE",
            PREMIUM: "PREMIUM",
            NONE: "NONE",
          },
        };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = { DEFAULT_SUMMONER_ICON_ID: 29 };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = { AUTO: "auto", ALWAYS: "always", NEVER: "never" };
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        const n = {
            UNKNOWN: "UNKNOWN",
            ENABLED: "ENABLED",
            DISABLED: "DISABLED",
          },
          o = { PRIVATE: "PRIVATE", PUBLIC: "PUBLIC" };
        var s = {
          ProfilePrivacyEnabledState: n,
          ProfilePrivacySetting: o,
          DEFAULT_PROFILE_PRIVACY: {
            enabledState: n.UNKNOWN,
            setting: o.PUBLIC,
          },
        };
        t.default = s;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = t.TIME_UNITS = t.TIME_CONVERSIONS = void 0);
        const n = {
          MILLISECONDS: "milliseconds",
          SECONDS: "seconds",
          MINUTES: "minutes",
          HOURS: "hours",
          DAYS: "days",
          WEEKS: "weeks",
          MONTHS: "months",
          YEARS: "years",
        };
        t.TIME_UNITS = n;
        const o = 36e5,
          s = 864e5,
          i = 6048e5,
          a = {
            MILLISECONDS_IN_A_SECOND: 1e3,
            MILLISECONDS_IN_A_MINUTE: 6e4,
            MILLISECONDS_IN_A_HOUR: o,
            MILLISECONDS_IN_A_DAY: s,
            MILLISECONDS_IN_A_WEEK: i,
            MILLISECONDS_IN_A_YEAR: 314496e5,
          };
        t.TIME_CONVERSIONS = a;
        var r = { TIME_UNITS: n, TIME_CONVERSIONS: a };
        t.default = r;
      },
      (e) => {
        "use strict";
        e.exports = {
          MILESTONE_COMPLETION_LEVEL: 5,
          PROGRESS_BAR_WIDTH: 272,
          UNIQUE_NAME: "Unique",
          COMMON_NAME: "Common",
          CDP_PAW_ID: "cdp",
          CDP_UNIQUE_PACK_ID: "66700001",
          CDP_COMMON_PACK_ID: "66700002",
        };
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "6hpmItQy",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\series-info\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\series-info\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\series-info\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-progression-series-component"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression-series-header"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showUnlockAllButton"]]],null,10,8],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression-series-overview"],["flush-element"],["text","\\n"],["block",["each"],[["get",["series","statstones"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["statstone-info"],null,[["statstone","hoveredStatstone"],[["get",["statstoneData"]],["get",["hoveredStatstone"]]]]],false],["text","\\n"]],"locals":["statstoneData"]},{"statements":[["text","              "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-logo"],["flush-element"],["close-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","cdp-progression-statstones-completed"],["flush-element"],["append",["unknown",["milestonesPassed"]],false],["text"," / "],["append",["unknown",["totalMilestones"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-logo"],["flush-element"],["close-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","cdp-progression-statstones-completed"],["flush-element"],["append",["unknown",["milestonesPassed"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n                  "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_progression_passed_milestones_tooltip"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n                    "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_progression_mastery_upgraded_tooltip"]],false],["close-element"],["text","\\n                  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","span",[]],["static-attr","class","cdp-progression-mastery-upgrade"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],4],["text","              "],["close-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","cdp-progression-separator"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["static-attr","class","style-tooltip"],["flush-element"],["text","\\n                    "],["open-element","p",[]],["flush-element"],["append",["helper",["dynamic-tra"],["cdp_progression_series_pass_tooltip",["get",["pack","name"]]],null],false],["close-element"],["text","\\n                  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","cdp-progression-owned-from-packs"],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","src","/fe/lol-champion-details/series-ticket.png"],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","class"],["top","tooltip"]],6],["text","              "],["close-element"],["text","\\n"]],"locals":["pack"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-progression-series-info"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-series-content"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-progression-series-left"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-progression-series-name"],["flush-element"],["append",["unknown",["series","name"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["ownedFromPacks"]]],null,7],["text","          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-progression-series-right"],["flush-element"],["text","\\n"],["block",["if"],[["get",["setCompleted"]]],null,5],["text","            "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-milestone-progression"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],3],["block",["if"],[["get",["setCompleted"]]],null,2,1],["text","            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-series-border"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","cdp-progression-series-sale"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","cdp-progression-series-sale-label"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_sale_flag_text"]],false],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","sale-box sale-blur"],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","sale-box"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-progression-series-info incomplete"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-series-name"],["flush-element"],["append",["unknown",["series","name"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-series-border"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldRenderSale"]]],null,9],["text","      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-progression-series-unlock-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"unlockAll"],null],null],["flush-element"],["text","\\n        "],["append",["unknown",["tra","cdp_progression_statstones_series_unlock"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          s = n(59),
          i = n(63);
        n(64);
        const { RunMixin: a } = o.EmberAddons.EmberLifeline;
        e.exports = o.Ember.Component.extend(a, {
          classNames: ["rcp-fe-lol-champion-details-statstone-component"],
          layout: n(65),
          statstonesService: o.Ember.inject.service("statstones"),
          didRender() {
            this._super(...arguments);
            const e = this.get("completionPercent"),
              t = this.element.querySelector(
                ".cdp-progression-statstone-milestone-bar-fill",
              );
            this.runTask(() => {
              t && (t.style.width = `${e}px`);
            }, 500);
          },
          statstone: null,
          hoveredStatstone: null,
          isFeatured: o.Ember.computed.alias("statstone.isFeatured"),
          isRetired: o.Ember.computed.alias("statstone.isRetired"),
          isNotRetired: o.Ember.computed.not("isRetired"),
          playerRecord: o.Ember.computed.alias("statstone.playerRecord"),
          isOwned: o.Ember.computed.and(
            "playerRecord",
            "playerRecord.entitled",
          ),
          isStatstoneNotCompleted: o.Ember.computed.not("isStatstoneCompleted"),
          milestoneCompletionLevel: o.Ember.computed.alias(
            "statstonesService.milestoneCompletionLevel",
          ),
          milestoneLevel: o.Ember.computed.alias("playerRecord.milestoneLevel"),
          featuredStatstones: o.Ember.computed.alias(
            "statstonesService.featuredStatstones",
          ),
          isFlyoutOpen: !1,
          createFlyout() {
            const e = this.element,
              t = {
                showEvent: "show",
                hideEvent: "hide",
                targetAnchor: { x: "right", y: "center" },
                tooltipAnchor: { x: "left", y: "center" },
                offset: { x: 10, y: -57 },
                orientation: "right",
                caretOffset: 14,
                animated: "true",
                ComponentFactory: o.ComponentFactory,
              },
              n = {
                featured: this.get("featuredStatstones"),
                selection: this.get("statstone"),
                caller: this.element,
              };
            e.addEventListener("willHide", this.handleHideEvent),
              o.FlyoutManager.assignFlyout(
                e,
                "ProgressionFeatureFlyoutComponent",
                n,
                t,
              );
          },
          init() {
            this._super(...arguments),
              (this.handleHideEvent = this.handleHideEvent.bind(this));
          },
          handleHideEvent() {
            this.set("isFlyoutOpen", !1);
          },
          willDestroyElement() {
            this._super(...arguments),
              this.element.removeEventListener(
                "willHide",
                this.handleHideEvent,
              );
          },
          isMilestonesCompleted: o.Ember.computed(
            "playerRecord.milestoneLevel",
            function () {
              const e = this.get("playerRecord.milestoneLevel");
              return this.get("statstonesService").isMilestonesCompleted(e);
            },
          ),
          isStatstoneCompleted: o.Ember.computed.or(
            "isMilestonesCompleted",
            "isRetired",
          ),
          milestoneProgressStyleList: o.Ember.computed(
            "milestoneLevel",
            "milestoneCompletionLevel",
            function () {
              const e = [],
                t = this.get("milestoneLevel"),
                n = this.get("milestoneCompletionLevel");
              for (let o = 0; o < n; o++) e[o] = o < t ? "filled" : "empty";
              return e;
            },
          ),
          statstoneCategoryLower: o.Ember.computed(
            "statstone.category",
            function () {
              const e = this.get("statstone.category");
              return this.get("statstonesService")
                .stripRarityFromCategory(e)
                .toLowerCase();
            },
          ),
          completionPercent: o.Ember.computed(
            "statstone.completionValue",
            function () {
              const e =
                this.get("statstone.completionValue") * s.PROGRESS_BAR_WIDTH;
              return Math.min(e, s.PROGRESS_BAR_WIDTH);
            },
          ),
          statstoneRarity: o.Ember.computed(
            "statstone.isEpic",
            "tra.cdp_progression_statstones_rarity_unique",
            "tra.cdp_progression_statstones_rarity_common",
            function () {
              if (null === this.get("statstone")) return "";
              const e = this.get("statstone.isEpic"),
                t = this.get("statstonesService")
                  .statstoneRarity(e)
                  .toLowerCase();
              return this.get(`tra.cdp_progression_statstones_rarity_${t}`);
            },
          ),
          ownedClassName: o.Ember.computed("isOwned", function () {
            return this.get("isOwned") ? "owned" : "notowned";
          }),
          actions: {
            toggleFeaturedFlyout: function () {
              this.get("isFlyoutOpen")
                ? (o.FlyoutManager.sendEvent(this.element, "hide"),
                  this.runTask(() => {
                    o.FlyoutManager.unassignFlyout(this.element);
                  }, 133),
                  this.set("isFlyoutOpen", !1))
                : (this.createFlyout(),
                  o.FlyoutManager.sendEvent(this.element, "show"),
                  this.set("isFlyoutOpen", !0));
            },
            onMouseEnter: function (e) {
              i.SFX.gridHover.play(), this.set("hoveredStatstone", e);
            },
            onMouseLeave: function () {
              this.set("hoveredStatstone", null);
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), (t.SFX = void 0);
        var o = n(1);
        const s = o.AudioPlugin.getChannel("sfx-ui"),
          i = o.AudioPlugin.getChannel("sfx-ambience");
        function a(e) {
          return s.createSound(e, { allowConcurrency: !1 });
        }
        function r(e) {
          return i.createSound(e, { isLoop: !0 });
        }
        const l = {
          buttonGoldClick: a(
            "/fe/lol-champion-details/audio/sfx-uikit-button-gold-click.ogg",
          ),
          buttonGoldHover: a(
            "/fe/lol-champion-details/audio/sfx-uikit-button-gold-hover.ogg",
          ),
          gridClick: a(
            "/fe/lol-static-assets/sounds/skin-viewer/sfx-uikit-grid-click.ogg",
          ),
          gridHover: a(
            "/fe/lol-static-assets/sounds/skin-viewer/sfx-uikit-grid-hover.ogg",
          ),
          flyoutOpenClick: a(
            "/fe/lol-static-assets/sounds/skin-viewer/sfx-uikit-button-flyout-open-click.ogg",
          ),
          flyoutCloseClick: a(
            "/fe/lol-static-assets/sounds/skin-viewer/sfx-uikit-button-flyout-close-click.ogg",
          ),
          commonState1: r(
            "/fe/lol-champion-details/audio/sfx-eternals-cdp-common-state1-hover.ogg",
          ),
          commonState2: r(
            "/fe/lol-champion-details/audio/sfx-eternals-cdp-common-state2-hover.ogg",
          ),
          commonState3: r(
            "/fe/lol-champion-details/audio/sfx-eternals-cdp-common-state3-hover.ogg",
          ),
          uniqueState1: r(
            "/fe/lol-champion-details/audio/sfx-eternals-cdp-unique-state1-hover.ogg",
          ),
          uniqueState2: r(
            "/fe/lol-champion-details/audio/sfx-eternals-cdp-unique-state2-hover.ogg",
          ),
          uniqueState3: r(
            "/fe/lol-champion-details/audio/sfx-eternals-cdp-unique-state3-hover.ogg",
          ),
        };
        t.SFX = l;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "xwFwyD1L",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\series-info\\\\statstone\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\series-info\\\\statstone\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\series-info\\\\statstone\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-progression-statstone ",["unknown",["ownedClassName"]]]]],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"onMouseEnter",["get",["statstone"]]],null],null],["dynamic-attr","onmouseleave",["helper",["action"],[["get",[null]],"onMouseLeave"],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["isOwned"]]],null,8],["text","  "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-wrapper"],["flush-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","cdp-progression-statstone-image"],["dynamic-attr","src",["concat",[["unknown",["statstone","imageUrl"]]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isRetired"]]],null,7],["text","    "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-description"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isOwned"]]],null,6,1],["text","    "],["close-element"],["text","\\n"],["block",["unless"],[["get",["isOwned"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","statstone-locked"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-name"],["flush-element"],["append",["unknown",["statstone","name"]],false],["close-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-rarity"],["flush-element"],["append",["unknown",["statstoneRarity"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["dynamic-attr","class",["concat",["progress-marker ",["get",["progress"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["progress"]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-logo milestone-progress"],["flush-element"],["close-element"],["text","\\n            "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-milestone-progress"],["flush-element"],["text","\\n"],["block",["each"],[["get",["milestoneProgressStyleList"]]],null,2],["text","            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-milestone"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-milestone-bar"],["flush-element"],["text","\\n            "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-progression-statstone-milestone-bar-fill statstone-",["unknown",["statstoneCategoryLower"]]]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"],["block",["if"],[["get",["isStatstoneNotCompleted"]]],null,3],["text","        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-value-info"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-milestones-passed"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-logo milestones-passed"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-milestones-passed-value"],["flush-element"],["append",["unknown",["statstone","formattedMilestoneLevel"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-personal-best"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-personal-best-icon"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-personal-best-value"],["flush-element"],["append",["unknown",["statstone","formattedPersonalBest"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-header"],["flush-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-value"],["flush-element"],["append",["unknown",["statstone","formattedValue"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-name-info"],["flush-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-name-owned"],["flush-element"],["append",["unknown",["statstone","name"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["isStatstoneCompleted"]]],null,5],["text","        "],["close-element"],["text","\\n"],["block",["if"],[["get",["isNotRetired"]]],null,4],["text","        "],["open-element","div",[]],["dynamic-attr","class",["concat",["series-featured ",["helper",["if"],[["get",["isFeatured"]],"selected"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"toggleFeaturedFlyout"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-progression-retired-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-progression-magic-mograph-wrapper statstone-",["unknown",["statstoneCategoryLower"]]]]],["flush-element"],["text","\\n      "],["open-element","uikit-video",[]],["static-attr","class","cdp-progression-owned-magic-mograph"],["static-attr","src","/fe/lol-champion-details/video/champion-detail-owned-magic.webm"],["static-attr","cache-name","rcp-fe-lol-champion-details"],["static-attr","preload",""],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(67),
          (e.exports = o.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-showcase-item"],
            layout: n(68),
            statstonesService: o.Ember.inject.service("statstones"),
            showcaseItem: null,
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "9GIAYmdQ",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\showcase-component\\\\showcase-item\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\showcase-component\\\\showcase-item\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\showcase-component\\\\showcase-item\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-progression-showcase-item"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression-showcase-item-logo"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-progression-showcase-star"],["flush-element"],["close-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","cdp-progression-showcase-item-image"],["dynamic-attr","src",["concat",[["unknown",["showcaseItem","imageUrl"]]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["showcaseItem","isRetired"]]],null,0],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression-showcase-item-value"],["flush-element"],["append",["unknown",["showcaseItem","formattedValue"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression-showcase-item-name"],["flush-element"],["append",["unknown",["showcaseItem","name"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-progression-retired-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(70),
          (e.exports = o.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-overview-section"],
            layout: n(71),
            championService: o.Ember.inject.service("champion"),
            champion: o.Ember.computed.alias("championService.champion"),
            locale: o.Ember.computed.alias(
              "championService.regionLocale.locale",
            ),
            championOwned: o.Ember.computed.bool(
              "championService.summonerChampion.ownership.owned",
            ),
            shortBio: o.Ember.computed("champion.shortBio", function () {
              const e = this.get("champion.shortBio");
              return "string" != typeof e ? "" : e.replace(/''/g, '"');
            }),
            actions: {
              learnMore(e, t) {
                o.Telemetry.sendEvent("cdp-universe-champion-page-opened", e),
                  window.open(
                    "https://universe.leagueoflegends.com/" +
                      t +
                      "/champion/" +
                      e +
                      "/",
                    "_blank",
                  );
              },
              unlockChampion(e) {
                this.get("championService").enterChampionPurchaseFlow(e);
              },
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "mB/j+7S0",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\root\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\root\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\root\\\\index.js\\" "],["text","\\n"],["open-element","section",[]],["static-attr","class","cdp-content-column"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-overview-stats"],["flush-element"],["text","\\n    "],["append",["unknown",["tactical-info"]],false],["text","\\n    "],["append",["unknown",["playstyle-info"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","class","cdp-overview-description"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","cdp-overview-short-bio"],["flush-element"],["append",["helper",["sanitize"],[["get",["shortBio"]]],null],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","cdp-button-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showStoreButton"]]],null,2],["text","  "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-learn-more-button"],["static-attr","type","external"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"learnMore",["get",["champion","alias"]],["get",["locale"]]],null],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","cdp_actions_learn_more"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"unlockChampion",["get",["champion","id"]]],null],null],["flush-element"],["text","\\n        "],["append",["unknown",["tra","cdp_actions_unlock"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n        "],["append",["unknown",["tra","cdp_store_owned_message"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["championOwned"]]],null,1,0]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(73),
          (e.exports = o.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-details-section"],
            layout: n(74),
            statstonesService: o.Ember.inject.service("statstones"),
            UXSettings: o.Ember.inject.service("ux-settings"),
            statstone: null,
            didRender() {
              this._super(...arguments);
              const e = this.get("sfxString");
              this.get("statstonesService").playSoundForStatstone(e);
            },
            willDestroyElement() {
              this._super(...arguments);
              const e = this.get("sfxString");
              this.get("statstonesService").pauseSoundForStatstone(e);
            },
            playerRecord: o.Ember.computed.alias("statstone.playerRecord"),
            isNotRetired: o.Ember.computed.not("statstone.isRetired"),
            statstoneCategoryLower: o.Ember.computed(
              "statstone.category",
              function () {
                const e = this.get("statstone.category");
                return this.get("statstonesService")
                  .stripRarityFromCategory(e)
                  .toLowerCase();
              },
            ),
            statstoneRarityLower: o.Ember.computed(
              "statstoneRarity",
              function () {
                return this.get("statstoneRarity").toLowerCase();
              },
            ),
            statstoneRarity: o.Ember.computed("statstone.isEpic", function () {
              const e = this.get("statstone.isEpic");
              return this.get("statstonesService").statstoneRarity(e);
            }),
            formattedDate: o.Ember.computed(
              "playerRecord.dateAcquired",
              function () {
                const e = this.get("playerRecord.dateAcquired"),
                  t = new Date(e);
                return this.get("tra")
                  .moment(t)
                  .format(
                    this.get("tra.cdp_progression_statstones_date_format"),
                  );
              },
            ),
            sfxString: o.Ember.computed(
              "completionLevel",
              "statstoneRarityLower",
              function () {
                const e = this.get("completionLevel");
                return `${this.get("statstoneRarityLower")}State${e}`;
              },
            ),
            completionLevel: o.Ember.computed(
              "playerRecord.milestoneLevel",
              function () {
                const e = this.get("playerRecord.milestoneLevel");
                return this.get(
                  "statstonesService",
                ).getStatstoneCompletionLevel(e);
              },
            ),
            completionLevelString: o.Ember.computed(
              "completionLevel",
              function () {
                switch (this.get("completionLevel")) {
                  case 0:
                  default:
                    return "zero";
                  case 1:
                    return "one";
                  case 2:
                    return "two";
                  case 3:
                    return "three";
                }
              },
            ),
            completionLevelArray: o.Ember.computed(
              "completionLevel",
              function () {
                const e = this.get("completionLevel"),
                  t = [];
                for (let n = 0; n < e; n++) t.push(n);
                return t;
              },
            ),
            isMilestonesCompleted: o.Ember.computed(
              "playerRecord.milestoneLevel",
              function () {
                const e = this.get("playerRecord.milestoneLevel");
                return this.get("statstonesService").isMilestonesCompleted(e);
              },
            ),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "N/AEodt0",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\details-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\details-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\details-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-right-component"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-right-eternal-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["UXSettings","largeAreaAnimationsEnabled"]]],null,13,7],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-right-eternal-info"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-right-description"],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","cdp-right-statstone-value"],["flush-element"],["append",["unknown",["statstone","formattedValue"]],false],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","cdp-right-statstone-name"],["flush-element"],["append",["unknown",["statstone","name"]],false],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","cdp-right-statstone-rarity"],["flush-element"],["text","\\n"],["block",["if"],[["get",["statstone","isEpic"]]],null,4,3],["text","      "],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","cdp-right-statstone-purchase-date"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_date_acquired_text"]],false],["text"," "],["append",["unknown",["formattedDate"]],false],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","cdp-right-statstone-description"],["flush-element"],["append",["unknown",["statstone","description"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-progression-content-divider-line"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-right-progression-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isNotRetired"]]],null,2],["text","      "],["open-element","div",[]],["static-attr","class","cdp-right-progression"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","cdp-right-progression-header"],["flush-element"],["append",["unknown",["tra","cdp_progression_passed_milestones"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-right-value-wrapper"],["flush-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","cdp-right-milestone-icon"],["flush-element"],["close-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","cdp-right-progression-value"],["flush-element"],["append",["unknown",["statstone","formattedMilestoneLevel"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-right-progression"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isMilestonesCompleted"]]],null,1,0],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n  \\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","span",[]],["static-attr","class","cdp-right-progression-header"],["flush-element"],["append",["unknown",["tra","cdp_progression_personal_best"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-right-personal-best-description"],["flush-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","cdp-right-lock-icon"],["flush-element"],["close-element"],["text","\\n              "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_progression_unlock_personal_best"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","span",[]],["static-attr","class","cdp-right-progression-header"],["flush-element"],["append",["unknown",["tra","cdp_progression_personal_best"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-right-progression-value"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","cdp-right-personal-best-icon"],["flush-element"],["close-element"],["text","\\n              "],["open-element","span",[]],["flush-element"],["append",["unknown",["statstone","formattedPersonalBest"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-right-progression"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","cdp-right-progression-header"],["flush-element"],["append",["unknown",["tra","cdp_progression_next_milestone"]],false],["close-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","cdp-right-progression-value"],["flush-element"],["append",["unknown",["statstone","nextMilestone"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["unknown",["tra","cdp_progression_statstones_rarity_common"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["unknown",["tra","cdp_progression_statstones_rarity_unique"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","cdp-right-eternal-image common"],["dynamic-attr","src",["concat",[["unknown",["statstone","imageUrl"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","cdp-right-eternal-image"],["dynamic-attr","src",["concat",[["unknown",["statstone","imageUrl"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["statstone","isEpic"]]],null,6,5]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","cdp-right-eternal-background"],["flush-element"],["text","\\n          "],["open-element","uikit-video",[]],["dynamic-attr","class",["concat",["cdp-right-eternal-background-mograph statstone-",["unknown",["statstoneCategoryLower"]]]]],["static-attr","src","/fe/lol-champion-details/video/champion-detail-statstone-common-particle.webm"],["static-attr","preload",""],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","cdp-right-eternal-image common"],["dynamic-attr","src",["concat",["/fe/lol-champion-details/",["unknown",["statstoneCategoryLower"]],"-",["unknown",["statstoneRarityLower"]],"-bg-",["unknown",["completionLevel"]],".png"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-right-eternal-flame common ",["unknown",["statstoneCategoryLower"]]]]],["flush-element"],["text","\\n        "],["open-element","uikit-video",[]],["dynamic-attr","class",["concat",["cdp-right-eternal-flame-mograph statstone-",["unknown",["statstoneCategoryLower"]]]]],["dynamic-attr","src",["concat",["/fe/lol-champion-details/video/champion-detail-statstone-common-flame-",["unknown",["completionLevel"]],".webm"]]],["static-attr","preload",""],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","cdp-right-eternal-image common"],["dynamic-attr","src",["concat",["/fe/lol-champion-details/",["unknown",["statstoneCategoryLower"]],"-",["unknown",["statstoneRarityLower"]],"-object-",["unknown",["completionLevel"]],".png"]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isMilestonesCompleted"]]],null,8]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","cdp-right-eternal-background"],["flush-element"],["text","\\n          "],["open-element","uikit-video",[]],["dynamic-attr","class",["concat",["cdp-right-eternal-background-mograph statstone-",["unknown",["statstoneCategoryLower"]]]]],["static-attr","src","/fe/lol-champion-details/video/champion-detail-statstone-background.webm"],["static-attr","preload",""],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-right-orb statstone-",["unknown",["statstoneCategoryLower"]]," ",["unknown",["completionLevelString"]],"-orb"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["iterate"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-right-orb-rings"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-right-orb-wrapper"],["flush-element"],["text","\\n"],["block",["each"],[["get",["completionLevelArray"]]],null,11],["text","      "],["close-element"],["text","\\n"],["block",["if"],[["get",["isMilestonesCompleted"]]],null,10],["text","      "],["open-element","img",[]],["static-attr","class","cdp-right-eternal-image"],["dynamic-attr","src",["concat",["/fe/lol-champion-details/",["unknown",["statstoneCategoryLower"]],"-",["unknown",["statstoneRarityLower"]],"-",["unknown",["completionLevel"]],".png"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-right-eternal-flame ",["unknown",["statstoneCategoryLower"]]]]],["flush-element"],["text","\\n        "],["open-element","uikit-video",[]],["dynamic-attr","class",["concat",["cdp-right-eternal-flame-mograph statstone-",["unknown",["statstoneCategoryLower"]]]]],["dynamic-attr","src",["concat",["/fe/lol-champion-details/video/champion-detail-statstone-flame-",["unknown",["completionLevel"]],".webm"]]],["static-attr","preload",""],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["statstone","isEpic"]]],null,12,9]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          s = n(28);
        n(76),
          (e.exports = o.Ember.Component.extend({
            layout: n(77),
            classNames: ["cdp-tactical-info-component"],
            championService: o.Ember.inject.service("champion"),
            champion: o.Ember.computed.alias("championService.champion"),
            damageType: o.Ember.computed(
              "champion.tacticalInfo.damageType",
              function () {
                let e = this.get("champion.tacticalInfo.damageType");
                return e
                  ? ((e = e.toLowerCase()),
                    e.startsWith("k") && (e = e.substring(1)),
                    (0, s.translate)(this, `cdp_tactical_damage_${e}`))
                  : "";
              },
            ),
            stylePercent: o.Ember.computed(
              "champion.tacticalInfo.style",
              function () {
                const e = this.get("champion.tacticalInfo.style");
                if (e) {
                  return (e - 1) * (100 / 9);
                }
                return 0;
              },
            ),
            abilityIconClass: o.Ember.computed("stylePercent", function () {
              return this.get("stylePercent") >= 50
                ? "abilities-icon"
                : "abilities-icon-grey";
            }),
            attacksIconClass: o.Ember.computed("stylePercent", function () {
              return this.get("stylePercent") <= 50
                ? "attacks-icon"
                : "attacks-icon-grey";
            }),
            difficultyLevel: o.Ember.computed.alias(
              "champion.tacticalInfo.difficulty",
            ),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "Ik8+Gpit",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\tactical-info\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\tactical-info\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\tactical-info\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","tactical-info-damage"],["flush-element"],["text","\\n  "],["open-element","h6",[]],["static-attr","class","damage-label"],["flush-element"],["append",["unknown",["tra","cdp_tactical_damage_tooltip_title"]],false],["text",":"],["close-element"],["text","\\n  "],["open-element","p",[]],["static-attr","class","damage-value"],["flush-element"],["append",["unknown",["damageType"]],false],["close-element"],["text","\\n\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","class"],["right","tooltip"]],2],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","tactical-info-style"],["flush-element"],["text","\\n  "],["open-element","h6",[]],["static-attr","class","style-label"],["flush-element"],["append",["unknown",["tra","cdp_tactical_style_tooltip_title"]],false],["text",":"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","continuum-graph-container"],["flush-element"],["text","\\n    "],["open-element","span",[]],["dynamic-attr","class",["concat",["continuum-graph-icon ",["unknown",["attacksIconClass"]]]]],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","continuum-graph"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","continuum-graph-pip-container"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","continuum-graph-pip"],["dynamic-attr","style",["concat",["left:",["unknown",["stylePercent"]],"%"]]],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","span",[]],["dynamic-attr","class",["concat",["continuum-graph-icon ",["unknown",["abilityIconClass"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","class"],["right","tooltip"]],1],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","tactical-info-difficulty"],["flush-element"],["text","\\n  "],["open-element","h6",[]],["static-attr","class","difficulty-label"],["flush-element"],["append",["unknown",["tra","cdp_tactical_difficulty_tooltip_title"]],false],["text",":"],["close-element"],["text","\\n  "],["open-element","span",[]],["dynamic-attr","class",["concat",["difficulty-graph difficulty-level-",["unknown",["difficultyLevel"]]]]],["flush-element"],["close-element"],["text","\\n\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","class"],["right","tooltip"]],0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","difficulty-tooltip"],["flush-element"],["text","\\n      "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_tactical_difficulty_tooltip_title"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_tactical_difficulty_tooltip"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","style-tooltip"],["flush-element"],["text","\\n      "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_tactical_style_tooltip_title"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_tactical_style_tooltip"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","damage-tooltip"],["flush-element"],["text","\\n      "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_tactical_damage_tooltip_title"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_tactical_damage_tooltip"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(79),
          (e.exports = o.Ember.Component.extend({
            classNames: ["cdp-playstyle-info-component"],
            layout: n(80),
            championService: o.Ember.inject.service("champion"),
            champion: o.Ember.computed.alias("championService.champion"),
            onDidInsertElement: o.Ember.on("didInsertElement", function () {
              this.$(".hover-event-mask").each((e, t) => {
                const n = this.$(t).parent().find(".tooltip")[0];
                this.$(t).mouseenter(() => {
                  this.$(t).parent().addClass("hover"),
                    n.dispatchEvent(new Event("show", { bubbles: !0 }));
                }),
                  this.$(t).mouseleave(() => {
                    this.$(t).parent().removeClass("hover"),
                      n.dispatchEvent(new Event("hide", { bubbles: !0 }));
                  });
              });
            }),
            willDestroyElement() {
              this._super(...arguments), this.$(".hover-event-mask").off();
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "mzVPU+C+",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\playstyle-info\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\playstyle-info\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\playstyle-info\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-graph-background"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","stat-segment damage"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tooltip-anchor"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","showEvent","hideEvent","class"],["top","show","hide","tooltip"]],4],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hover-event-mask"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["segment-fill level-",["unknown",["champion","playstyleInfo","damage"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","stat-segment toughness"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tooltip-anchor"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","showEvent","hideEvent","class"],["top","show","hide","tooltip"]],3],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hover-event-mask"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["segment-fill level-",["unknown",["champion","playstyleInfo","durability"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","stat-segment crowd-control"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tooltip-anchor"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","showEvent","hideEvent","class"],["bottom","show","hide","tooltip"]],2],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hover-event-mask"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["segment-fill level-",["unknown",["champion","playstyleInfo","crowdControl"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","stat-segment mobility"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tooltip-anchor"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","showEvent","hideEvent","class"],["bottom","show","hide","tooltip"]],1],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hover-event-mask"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["segment-fill level-",["unknown",["champion","playstyleInfo","mobility"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","stat-segment utility"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tooltip-anchor"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","showEvent","hideEvent","class"],["top","show","hide","tooltip"]],0],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hover-event-mask"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["segment-fill level-",["unknown",["champion","playstyleInfo","utility"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","utility-tt"],["flush-element"],["text","\\n          "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_utility_tooltip_title"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_utility_tooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","mobility-tt"],["flush-element"],["text","\\n          "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_mobility_tooltip_title"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_mobility_tooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","crowd-control-tt"],["flush-element"],["text","\\n          "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_crowd_control_tooltip_title"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_crowd_control_tooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","toughness-tt"],["flush-element"],["text","\\n          "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_toughness_tooltip_title"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_toughness_tooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","damage-tt"],["flush-element"],["text","\\n          "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_damage_tooltip_title"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_damage_tooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(82);
        const s = [
          { spellKey: "q", preload: "champion.spells.0.preload" },
          { spellKey: "w", preload: "champion.spells.1.preload" },
          { spellKey: "e", preload: "champion.spells.2.preload" },
          { spellKey: "r", preload: "champion.spells.3.preload" },
          { spellKey: "p", preload: "champion.passive.preload" },
        ];
        e.exports = o.Ember.Component.extend({
          layout: n(83),
          activeAbility: "ability_q",
          championService: o.Ember.inject.service("champion"),
          champion: o.Ember.computed.alias("championService.champion"),
          spellbookOverride: o.Ember.computed(
            "champion.spellbookOverride",
            "champion.spells",
            function () {
              const e = this.get("champion.spellbookOverride"),
                t = this.get("champion.spells");
              return (
                t.forEach((t) => {
                  const n = "qwer".indexOf(t.spellKey);
                  null != e &&
                    n >= 0 &&
                    null != e[n] &&
                    t.set("hasOverride", !0);
                }),
                e
              );
            },
          ),
          onInit: o.Ember.on("init", function () {
            o.Ember.run.scheduleOnce("afterRender", () =>
              this.sendAction("sectionLoaded", "abilities"),
            );
          }),
          actions: {
            changeAbility(e) {
              this.set("activeAbility", `ability_${e}`);
            },
            videoPreloadDone(e) {
              for (let t = 0; t < s.length - 1; t++)
                s[t].spellKey === e && this.set(s[t + 1].preload, "auto");
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "YA/9emd0",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\root\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\root\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\root\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["champion","spells"]]],null,4]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","lol-uikit-section",[]],["dynamic-attr","section-id",["concat",["ability_",["unknown",["ability","spellKey"]]]]],["static-attr","class","cdp-ability-section-container"],["flush-element"],["text","\\n                "],["append",["helper",["ability-video"],null,[["ability","videoPreloadDone"],[["get",["ability"]],["helper",["action"],[["get",[null]],"videoPreloadDone"],null]]]],false],["text","\\n                "],["append",["helper",["ability-description"],null,[["ability","isOverride"],[["get",["ability"]],true]]],false],["text","\\n            "],["close-element"],["text","\\n"]],"locals":["ability"]},{"statements":[["block",["each"],[["get",["abilityOverride"]]],null,0]],"locals":["abilityOverride"]},{"statements":[["block",["each"],[["get",["spellbookOverride"]]],null,1]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-section",[]],["dynamic-attr","section-id",["concat",["ability_",["unknown",["ability","spellKey"]]]]],["static-attr","class","cdp-ability-section-container"],["flush-element"],["text","\\n        "],["append",["helper",["ability-video"],null,[["ability","videoPreloadDone"],[["get",["ability"]],["helper",["action"],[["get",[null]],"videoPreloadDone"],null]]]],false],["text","\\n        "],["append",["helper",["ability-description"],null,[["ability","isOverride"],[["get",["ability"]],["get",["ability","hasOverride"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["ability"]},{"statements":[["open-element","lol-uikit-section-controller",[]],["dynamic-attr","selected-item",["concat",[["unknown",["activeAbility"]]]]],["static-attr","class","cdp-abilities-section-controller"],["static-attr","animation","crossfade"],["flush-element"],["text","\\n"],["block",["each"],[["get",["champion","spells"]]],null,3],["block",["if"],[["get",["spellbookOverride"]]],null,2],["text","\\n    "],["open-element","lol-uikit-section",[]],["static-attr","section-id","ability_p"],["static-attr","class","cdp-ability-section-container"],["flush-element"],["text","\\n        "],["append",["helper",["ability-video"],null,[["ability","videoPreloadDone"],[["get",["champion","passive"]],["helper",["action"],[["get",[null]],"videoPreloadDone"],null]]]],false],["text","\\n        "],["append",["helper",["ability-description"],null,[["ability"],[["get",["champion","passive"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n  "],["append",["helper",["ability-picker"],null,[["changeAbility","abilitiesSectionShown"],[["helper",["action"],[["get",[null]],"changeAbility"],null],["get",["abilitiesSectionShown"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          s = n(28);
        n(85);
        const i = { q: 0, w: 1, e: 2, r: 3 };
        e.exports = o.Ember.Component.extend({
          classNames: ["rcp-fe-lol-champion-details-ability-picker"],
          layout: n(86),
          championService: o.Ember.inject.service("champion"),
          champion: o.Ember.computed.alias("championService.champion"),
          defaultAbility: "q",
          activeAbility: "q",
          videoProgress: 0,
          videoProgressPoller: null,
          videoReadyTimeout: null,
          abilitiesPickerState: o.Ember.computed(
            "abilitiesSectionShown",
            function () {
              return this.get("abilitiesSectionShown")
                ? (this.send("selectAbility", this.get("defaultAbility")),
                  "section-visible")
                : (this.resetState(), "section-hidden");
            },
          ),
          willDestroyElement() {
            this._super(...arguments),
              clearInterval(this.get("videoProgressPoller")),
              clearTimeout(this.get("videoReadyTimeout"));
          },
          spellbookOverride: o.Ember.computed(
            "champion.spellbookOverride",
            "activeAbility",
            function () {
              const e = this.get("champion.spellbookOverride"),
                t = this.get("activeAbility"),
                n = this.getOverridesForSpellbook(t, e);
              return (
                null !== n &&
                  n.forEach((e) => {
                    e.spellKeyTra = (0, s.translate)(
                      this,
                      `cdp_ability_key_${e.spellKey[1]}`,
                    );
                  }),
                n
              );
            },
          ),
          abilities: o.Ember.computed(
            "champion.spells",
            "tra.cdp_ability_key_q",
            "tra.cdp_ability_key_w",
            "tra.cdp_ability_key_e",
            "tra.cdp_ability_key_r",
            function () {
              const e = this.get("champion.spells");
              if (e)
                return (
                  e.forEach((e) => {
                    e.spellKeyTra = (0, s.translate)(
                      this,
                      `cdp_ability_key_${e.spellKey}`,
                    );
                  }),
                  e
                );
            },
          ),
          getOverridesForSpellbook(e, t) {
            const n = i[e];
            return null != t && n >= 0 && null != t[n] ? t[n] : null;
          },
          resetState() {
            const e = this.get("activeAbility"),
              t = this.get("champion.passive"),
              n = this.get("abilities"),
              o = this.get("champion.spellbookOverride");
            t.set("active", !1),
              n.setEach("active", !1),
              null != o &&
                o.forEach((e) => {
                  e.setEach("active", !1);
                }),
              this.resetVideoProperties(e);
          },
          getVideoElement: (e) => document.querySelector(`.ability-video-${e}`),
          resetVideoProperties(e) {
            clearInterval(this.get("videoProgressPoller")),
              this.set("videoProgressPoller", null),
              this.set("videoProgress", 0);
            const t = this.getVideoElement(e);
            t && (t.pause(), (t.currentTime = 0));
          },
          startVideo(e) {
            const t = this.getVideoElement(e);
            if (!t) return;
            clearTimeout(this.get("videoReadyTimeout"));
            const n = document.querySelector(
              `[section-id=ability_${e}] .cdp-ability-video`,
            );
            if (t && t.readyState > 0) {
              n.classList.remove("loading"),
                n.classList.add("loaded"),
                t.play();
              const o = setInterval(() => {
                const t = this.getVideoElement(e);
                if (t)
                  if (t.ended) this.resetVideoProperties(e);
                  else {
                    const e = (t.currentTime / t.duration) * 100;
                    this.set("videoProgress", e);
                  }
              }, 50);
              this.set("videoProgressPoller", o);
            } else {
              n.classList.remove("loaded"), n.classList.add("loading");
              const t = setTimeout(() => {
                this.startVideo(e);
              }, 50);
              this.set("videoReadyTimeout", t);
            }
          },
          actions: {
            selectAbility(e) {
              this.resetState(), this.sendAction("changeAbility", e);
              const t = this.get("champion.passive"),
                n = this.get("abilities");
              "p" === e
                ? (t.set("active", !0), this.set("activeAbility", "p"))
                : (n.findBy("spellKey", e).set("active", !0),
                  this.set("activeAbility", e)),
                this.startVideo(e);
            },
            selectAbilityOverride(e) {
              this.resetState(), this.sendAction("changeAbility", e);
              const t = this.get("activeAbility"),
                n = this.get("champion.spellbookOverride"),
                o = this.get("abilities"),
                s = this.getOverridesForSpellbook(t, n),
                i = e.substring(0, 1);
              s.findBy("spellKey", e).set("active", !0),
                s.findBy("spellKey", e).set("preload", "auto"),
                o.findBy("spellKey", i).set("active", !0),
                this.startVideo(e);
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "yXUDRh7j",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-picker\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-picker\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-picker\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","spellbook-wrapper"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","spellbook"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",[["unknown",["abilitiesPickerState"]]," ability ability-passive ",["helper",["if"],[["get",["champion","passive","active"]],"active"],null]]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","ability-icon-wrapper"],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","class","ability-icon"],["dynamic-attr","src",["concat",[["unknown",["champion","passive","abilityIconPath"]]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectAbility","p"],null],null],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["champion","passive","active"]]],null,4],["text","\\n            "],["open-element","div",[]],["static-attr","class","ability-key"],["flush-element"],["append",["unknown",["tra","cdp_ability_key_passive"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n\\n"],["block",["each"],[["get",["abilities"]]],null,3],["text","    "],["close-element"],["text","\\n\\n\\n"],["block",["if"],[["get",["spellbookOverride"]]],null,1],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["concat",["ability ability-",["unknown",["abilityOverride","spellKey"]]," ",["helper",["if"],[["get",["abilityOverride","active"]],"active"],null]]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","ability-icon-wrapper"],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","class","ability-icon"],["dynamic-attr","src",["concat",[["unknown",["abilityOverride","abilityIconPath"]]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectAbilityOverride",["get",["abilityOverride","spellKey"]]],null],null],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","ability-key"],["flush-element"],["append",["unknown",["abilityOverride","spellKeyTra"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["abilityOverride"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","spellbookOverride"],["flush-element"],["text","\\n"],["block",["each"],[["get",["spellbookOverride"]]],null,0],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","ability-video-progress"],["dynamic-attr","style",["concat",["width:",["unknown",["videoProgress"]],"%"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["concat",["ability ability-",["unknown",["ability","spellKey"]]," ",["helper",["if"],[["get",["ability","active"]],"active"],null]]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","ability-icon-wrapper"],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","class","ability-icon"],["dynamic-attr","src",["concat",[["unknown",["ability","abilityIconPath"]]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectAbility",["get",["ability","spellKey"]]],null],null],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["ability","active"]]],null,2],["text","\\n            "],["open-element","div",[]],["static-attr","class","ability-key"],["flush-element"],["append",["unknown",["ability","spellKeyTra"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["ability"]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","ability-video-progress"],["dynamic-attr","style",["concat",["width:",["unknown",["videoProgress"]],"%"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(88);
        const s = "https://d28xe8vt774jo5.cloudfront.net/";
        e.exports = o.Ember.Component.extend({
          classNames: ["rcp-fe-lol-champion-details-ability-video"],
          layout: n(89),
          championService: o.Ember.inject.service("champion"),
          webAssetsBasePath: o.Ember.computed.alias(
            "championService.webAssetsBasePath",
          ),
          audioVolume: o.Ember.computed(
            "championService.audioSettings.data.masterSoundEnabled",
            "championService.audioSettings.data.masterVolume",
            "championService.audioSettings.data.sfxEnabled",
            "championService.audioSettings.data.sfxVolume",
            function () {
              const e = 100,
                t = this.get(
                  "championService.audioSettings.data.masterSoundEnabled",
                ),
                n = this.get("championService.audioSettings.data.sfxEnabled");
              let o = this.get(
                  "championService.audioSettings.data.masterVolume",
                ),
                s = this.get("championService.audioSettings.data.sfxVolume");
              const i = !1 === t || !1 === n;
              void 0 === o && (o = e), void 0 === s && (s = e);
              const a = parseFloat((o / e) * (s / e));
              return i ? 0 : a;
            },
          ),
          regionLocale: o.Ember.computed.alias("championService.regionLocale"),
          locale: o.Ember.computed.alias("regionLocale.locale"),
          onDidInsertElement: o.Ember.on("didInsertElement", function () {
            const e = this.get("ability.spellKey") || "p";
            if (this.get("ability.abilityVideoPath")) {
              const t = this.$(".cdp-ability-video video");
              t.on("progress", () => {
                this.isDestroyed ||
                  1 !== t.get(0).networkState ||
                  (t.off(), this.sendAction("videoPreloadDone", e));
              });
            } else this.sendAction("videoPreloadDone", e);
          }),
          willDestroyElement() {
            this._super(...arguments);
            let e = this.$(".cdp-ability-video video");
            e.off(), e.attr("src", ""), e.load(), (e = null);
          },
          abilityVideoBasePath: o.Ember.computed(
            "webAssetsBasePath",
            "locale",
            function () {
              const e = this.get("webAssetsBasePath"),
                t = this.get("locale");
              return e
                ? "string" == typeof e
                  ? e
                  : e[t]
                    ? e[t]
                    : e.default
                      ? e.default
                      : s
                : s;
            },
          ),
          preloadVideo: o.Ember.computed("ability.preload", function () {
            return "q" === this.get("ability.spellKey")
              ? "auto"
              : this.get("ability.preload") || "none";
          }),
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "LbtwzyDb",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-video\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-video\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-video\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["ability","abilityVideoPath"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["append",["unknown",["champion-backdrop"]],false],["text","\\n"]],"locals":[]},{"statements":[["open-element","div",[]],["static-attr","class","cdp-ability-video"],["flush-element"],["text","\\n  "],["open-element","video",[]],["dynamic-attr","class",["concat",["ability-video-",["helper",["if"],[["get",["ability","spellKey"]],["get",["ability","spellKey"]],"p"],null]]]],["dynamic-attr","preload",["concat",[["unknown",["preloadVideo"]]]]],["dynamic-attr","src",["concat",[["unknown",["abilityVideoBasePath"]],["unknown",["ability","abilityVideoPath"]]]]],["dynamic-attr","poster",["concat",[["unknown",["abilityVideoBasePath"]],["unknown",["ability","abilityVideoImagePath"]]]]],["static-attr","width","100%"],["static-attr","height","100%"],["dynamic-attr","volume",["unknown",["audioVolume"]],null],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","loading-spinner"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.slashifyArray = r);
        var o = n(1),
          s = n(28);
        n(91);
        var i,
          a = (i = n(92)) && i.__esModule ? i : { default: i };
        function r(e) {
          return e.every((t) => t === e[0]) ? e[0].toString() : e.join("/");
        }
        e.exports = o.Ember.Component.extend({
          classNames: ["rcp-fe-lol-champion-details-ability-description"],
          classNameBindings: ["isOverride"],
          layout: n(93),
          isPassive: o.Ember.computed.empty("ability.spellKey"),
          ability: null,
          isOverride: null,
          formatAbilityTokenValues(e) {
            let t = this.get("ability.maxLevel");
            return void 0 === t && (t = 5), r((e = e.slice(0, t)));
          },
          replaceHTML: (e) =>
            (e = (e = (e = (e = e.replace(
              /( size|size) ?= ?('|")\d+('|")/gi,
              "",
            )).replace(
              /<onlyShowInGame>(?!onlyShowInGame).*<\/onlyShowInGame>/gi,
              "",
            )).replace(/<mainText>/gi, "")).replace(/<\/mainText>/gi, "")),
          replaceEffectAmounts(e) {
            const t = this.get("ability.effectAmounts");
            return (e = e.replace(
              /@\s?(Effect[0-9]+Amount)(\*(-?[0-9]*\.?[0-9]+))?\s?@/g,
              (e, n, o, s) => {
                if (s && t[n]) {
                  s = parseFloat(s);
                  let e = t[n];
                  return (
                    (e = e.slice(1).map((e) => Math.round(e * s))),
                    this.formatAbilityTokenValues(e)
                  );
                }
                if (t[n]) {
                  const e = t[n];
                  return this.formatAbilityTokenValues(e.slice(1));
                }
                return e;
              },
            ));
          },
          replaceCoefficients(e) {
            const t = this.get("ability.coefficients");
            return (
              a.default.forOwn(t, (t, n) => {
                const o = (e, n, o, s = 1) => {
                  s = parseFloat(s);
                  return this.prettyFloat(t * s * 100) + "%";
                };
                if ("coefficient1" === n) {
                  const t =
                    /@\s?(CharAbilityPower|CharBonusPhysical|CharTotalPhysical)(\*(-?[0-9]*\.?[0-9]+))?\s?@/g;
                  e = e.replace(t, o);
                }
                if ("coefficient2" === n) {
                  const t =
                    /@\s?(CharAbilityPower|CharBonusPhysical|CharTotalPhysical)2(\*(-?[0-9]*\.?[0-9]+))?\s?@/g;
                  e = e.replace(t, o);
                }
              }),
              e
            );
          },
          prettyFloat: (e) => ((e = e.toFixed(2)), parseFloat(e)),
          replaceFormula(e, t, n, o) {
            const s = this.get("ability.effectAmounts");
            let i;
            if (/^Effect[0-9]+$/.test(t)) {
              const e = s[`${t}Amount`];
              e && (t = this.formatAbilityTokenValues(e.slice(1)));
            }
            if (t.includes("/"))
              i = t
                .split("/")
                .map((e) => this.prettyFloat(parseFloat(e) * n))
                .join("/");
            else {
              if (isNaN(parseFloat(t))) return o;
              i = this.prettyFloat(parseFloat(t) * n);
            }
            return i;
          },
          replaceFormulas(e) {
            const t = this.get("ability.formulas") || {};
            return (e = e.replace(
              /@\s?(f[0-9]+)(\*(-?[0-9]*\.?[0-9]+))?\s?@%?/g,
              (e, n, o, i = 1) => {
                const a = t[n];
                if (!a || "" === a.link || "" === a.coefficient) return "0";
                i = parseFloat(i);
                const { link: r, coefficient: l } = t[n];
                if ("@" === r[0]) return this.replaceFormula(r, l, i, e);
                {
                  const t = this.replaceFormula(r, l, 100 * i, e);
                  return (0, s.translate)(this, `cdp_ability_formula_${r}`, {
                    value: t,
                  });
                }
              },
            ));
          },
          replaceFormulaExpression(e, t, n, o, s) {
            const i = /Effect[0-9]+/.exec(t);
            if (!i) return t;
            const a = i[0] + "Amount",
              r = s[a];
            if (r) {
              const e = this.formatAbilityTokenValues(r.slice(1))
                .split("/")
                .map((e) => this.prettyFloat(parseFloat(e) * n))
                .join("/");
              return t.replace("@" + a + "@", e);
            }
          },
          replaceFormulaExpressions(e) {
            if (/@(f[0-9])@/.test(e)) {
              const t = this.get("ability.formulas") || {},
                n = this.get("ability.effectAmounts");
              e = e.replace(
                /@\s?(f[0-9]+)(\*(-?[0-9]*\.?[0-9]+))?\s?@%?/g,
                (e, o, s, i = 1) => {
                  i = parseFloat(i);
                  const { link: a, coefficient: r } = t[o];
                  let l;
                  return (
                    (l = this.replaceFormulaExpression(a, r, i, e, n)),
                    /@(f[0-9])@/.test(l) && (l = this.replaceFormulas(l)),
                    l
                  );
                },
              );
            }
            return e;
          },
          replaceAmmo(e) {
            const t = this.get("ability.ammo");
            if (!t) return e;
            let { ammoRechargeTime: n, maxAmmo: o } = t;
            return (
              (n = this.formatAbilityTokenValues(n)),
              (o = this.formatAbilityTokenValues(o)),
              (e = (e = e.replace(/@AmmoRechargeTime@/g, n)).replace(
                /@MaxAmmo@/g,
                o,
              ))
            );
          },
          replaceCost(e) {
            const t = this.get("ability.costCoefficients");
            if (!t) return e;
            const n = this.formatAbilityTokenValues(t);
            return (e = e.replace(/@Cost@/g, n));
          },
          replaceTokens(e) {
            return (
              (e = this.replaceHTML(e)),
              (e = this.replaceEffectAmounts(e)),
              (e = this.replaceCoefficients(e)),
              (e = this.replaceFormulas(e)),
              (e = this.replaceFormulaExpressions(e)),
              (e = this.replaceAmmo(e)),
              (e = this.replaceCost(e))
            );
          },
          costString: o.Ember.computed(
            "ability.cost",
            "ability.costCoefficients",
            "ability.spellKey",
            "ability.effectAmounts",
            "ability.coefficients",
            "ability.formulas",
            "ability.maxLevel",
            "ability.ammo",
            "tra.cdp_ability_formula_bonusattackdamage",
            "tra.cdp_ability_formula_attackdamage",
            "tra.cdp_ability_formula_bonushealth",
            "tra.cdp_ability_formula_health",
            "tra.cdp_ability_formula_abilitypower",
            "tra.cdp_ability_formula_bonusarmor",
            "tra.cdp_ability_formula_armor",
            "tra.cdp_ability_formula_bonusspellblock",
            "tra.cdp_ability_formula_spellblock",
            "tra.cdp_ability_formula_bonusmovespeed",
            "tra.cdp_ability_formula_movespeed",
            "tra.cdp_ability_formula_bonusmana",
            "tra.cdp_ability_formula_mana",
            function () {
              let e = this.get("ability.cost");
              return (e = this.replaceTokens(e)), e;
            },
          ),
          rangeString: o.Ember.computed(
            "ability.range",
            "ability.spellKey",
            function () {
              return this.formatAbilityTokenValues(this.get("ability.range"));
            },
          ),
          cooldownString: o.Ember.computed(
            "ability.cooldown",
            "ability.cooldownCoefficients",
            "ability.spellKey",
            "ability.effectAmounts",
            "ability.coefficients",
            "ability.formulas",
            "ability.maxLevel",
            "ability.ammo",
            "tra.cdp_ability_formula_bonusattackdamage",
            "tra.cdp_ability_formula_attackdamage",
            "tra.cdp_ability_formula_bonushealth",
            "tra.cdp_ability_formula_health",
            "tra.cdp_ability_formula_abilitypower",
            "tra.cdp_ability_formula_bonusarmor",
            "tra.cdp_ability_formula_armor",
            "tra.cdp_ability_formula_bonusspellblock",
            "tra.cdp_ability_formula_spellblock",
            "tra.cdp_ability_formula_bonusmovespeed",
            "tra.cdp_ability_formula_movespeed",
            "tra.cdp_ability_formula_bonusmana",
            "tra.cdp_ability_formula_mana",
            function () {
              let e = this.get("ability.cooldown");
              const t = this.formatAbilityTokenValues(
                this.get("ability.cooldownCoefficients"),
              );
              return (
                (e = this.replaceTokens(e)),
                (e = e.replace(/@Cooldown@/g, t)),
                e
              );
            },
          ),
          descriptionString: o.Ember.computed(
            "ability.description",
            "ability.dynamicDescription",
            "ability.effectAmounts",
            "ability.coefficients",
            "ability.spellKey",
            "ability.formulas",
            "ability.maxLevel",
            "ability.ammo",
            "tra.cdp_ability_formula_bonusattackdamage",
            "tra.cdp_ability_formula_attackdamage",
            "tra.cdp_ability_formula_bonushealth",
            "tra.cdp_ability_formula_health",
            "tra.cdp_ability_formula_abilitypower",
            "tra.cdp_ability_formula_bonusarmor",
            "tra.cdp_ability_formula_armor",
            "tra.cdp_ability_formula_bonusspellblock",
            "tra.cdp_ability_formula_spellblock",
            "tra.cdp_ability_formula_bonusmovespeed",
            "tra.cdp_ability_formula_movespeed",
            "tra.cdp_ability_formula_bonusmana",
            "tra.cdp_ability_formula_mana",
            function () {
              let e =
                this.get("ability.dynamicDescription") ||
                this.get("ability.description");
              return e ? ((e = this.replaceTokens(e)), e) : "";
            },
          ),
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      function (e, t, n) {
        var o;
        (e = n.nmd(e)),
          function () {
            var s,
              i = "Expected a function",
              a = "__lodash_hash_undefined__",
              r = "__lodash_placeholder__",
              l = 16,
              c = 32,
              u = 64,
              p = 128,
              m = 256,
              d = 1 / 0,
              h = 9007199254740991,
              f = NaN,
              _ = 4294967295,
              g = [
                ["ary", p],
                ["bind", 1],
                ["bindKey", 2],
                ["curry", 8],
                ["curryRight", l],
                ["flip", 512],
                ["partial", c],
                ["partialRight", u],
                ["rearg", m],
              ],
              v = "[object Arguments]",
              y = "[object Array]",
              b = "[object Boolean]",
              E = "[object Date]",
              k = "[object Error]",
              x = "[object Function]",
              S = "[object GeneratorFunction]",
              w = "[object Map]",
              C = "[object Number]",
              T = "[object Object]",
              I = "[object Promise]",
              O = "[object RegExp]",
              A = "[object Set]",
              N = "[object String]",
              L = "[object Symbol]",
              M = "[object WeakMap]",
              P = "[object ArrayBuffer]",
              D = "[object DataView]",
              R = "[object Float32Array]",
              j = "[object Float64Array]",
              B = "[object Int8Array]",
              F = "[object Int16Array]",
              U = "[object Int32Array]",
              V = "[object Uint8Array]",
              H = "[object Uint8ClampedArray]",
              W = "[object Uint16Array]",
              q = "[object Uint32Array]",
              K = /\b__p \+= '';/g,
              $ = /\b(__p \+=) '' \+/g,
              G = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
              Y = /&(?:amp|lt|gt|quot|#39);/g,
              z = /[&<>"']/g,
              Q = RegExp(Y.source),
              X = RegExp(z.source),
              Z = /<%-([\s\S]+?)%>/g,
              J = /<%([\s\S]+?)%>/g,
              ee = /<%=([\s\S]+?)%>/g,
              te = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
              ne = /^\w*$/,
              oe =
                /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
              se = /[\\^$.*+?()[\]{}|]/g,
              ie = RegExp(se.source),
              ae = /^\s+|\s+$/g,
              re = /^\s+/,
              le = /\s+$/,
              ce = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
              ue = /\{\n\/\* \[wrapped with (.+)\] \*/,
              pe = /,? & /,
              me = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
              de = /\\(\\)?/g,
              he = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
              fe = /\w*$/,
              _e = /^[-+]0x[0-9a-f]+$/i,
              ge = /^0b[01]+$/i,
              ve = /^\[object .+?Constructor\]$/,
              ye = /^0o[0-7]+$/i,
              be = /^(?:0|[1-9]\d*)$/,
              Ee = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
              ke = /($^)/,
              xe = /['\n\r\u2028\u2029\\]/g,
              Se = "\\ud800-\\udfff",
              we = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff",
              Ce = "\\u2700-\\u27bf",
              Te = "a-z\\xdf-\\xf6\\xf8-\\xff",
              Ie = "A-Z\\xc0-\\xd6\\xd8-\\xde",
              Oe = "\\ufe0e\\ufe0f",
              Ae =
                "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
              Ne = "['’]",
              Le = "[" + Se + "]",
              Me = "[" + Ae + "]",
              Pe = "[" + we + "]",
              De = "\\d+",
              Re = "[" + Ce + "]",
              je = "[" + Te + "]",
              Be = "[^" + Se + Ae + De + Ce + Te + Ie + "]",
              Fe = "\\ud83c[\\udffb-\\udfff]",
              Ue = "[^" + Se + "]",
              Ve = "(?:\\ud83c[\\udde6-\\uddff]){2}",
              He = "[\\ud800-\\udbff][\\udc00-\\udfff]",
              We = "[" + Ie + "]",
              qe = "\\u200d",
              Ke = "(?:" + je + "|" + Be + ")",
              $e = "(?:" + We + "|" + Be + ")",
              Ge = "(?:['’](?:d|ll|m|re|s|t|ve))?",
              Ye = "(?:['’](?:D|LL|M|RE|S|T|VE))?",
              ze = "(?:" + Pe + "|" + Fe + ")" + "?",
              Qe = "[" + Oe + "]?",
              Xe =
                Qe +
                ze +
                ("(?:" +
                  qe +
                  "(?:" +
                  [Ue, Ve, He].join("|") +
                  ")" +
                  Qe +
                  ze +
                  ")*"),
              Ze = "(?:" + [Re, Ve, He].join("|") + ")" + Xe,
              Je = "(?:" + [Ue + Pe + "?", Pe, Ve, He, Le].join("|") + ")",
              et = RegExp(Ne, "g"),
              tt = RegExp(Pe, "g"),
              nt = RegExp(Fe + "(?=" + Fe + ")|" + Je + Xe, "g"),
              ot = RegExp(
                [
                  We +
                    "?" +
                    je +
                    "+" +
                    Ge +
                    "(?=" +
                    [Me, We, "$"].join("|") +
                    ")",
                  $e + "+" + Ye + "(?=" + [Me, We + Ke, "$"].join("|") + ")",
                  We + "?" + Ke + "+" + Ge,
                  We + "+" + Ye,
                  "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
                  "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
                  De,
                  Ze,
                ].join("|"),
                "g",
              ),
              st = RegExp("[" + qe + Se + we + Oe + "]"),
              it =
                /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
              at = [
                "Array",
                "Buffer",
                "DataView",
                "Date",
                "Error",
                "Float32Array",
                "Float64Array",
                "Function",
                "Int8Array",
                "Int16Array",
                "Int32Array",
                "Map",
                "Math",
                "Object",
                "Promise",
                "RegExp",
                "Set",
                "String",
                "Symbol",
                "TypeError",
                "Uint8Array",
                "Uint8ClampedArray",
                "Uint16Array",
                "Uint32Array",
                "WeakMap",
                "_",
                "clearTimeout",
                "isFinite",
                "parseInt",
                "setTimeout",
              ],
              rt = -1,
              lt = {};
            (lt[R] =
              lt[j] =
              lt[B] =
              lt[F] =
              lt[U] =
              lt[V] =
              lt[H] =
              lt[W] =
              lt[q] =
                !0),
              (lt[v] =
                lt[y] =
                lt[P] =
                lt[b] =
                lt[D] =
                lt[E] =
                lt[k] =
                lt[x] =
                lt[w] =
                lt[C] =
                lt[T] =
                lt[O] =
                lt[A] =
                lt[N] =
                lt[M] =
                  !1);
            var ct = {};
            (ct[v] =
              ct[y] =
              ct[P] =
              ct[D] =
              ct[b] =
              ct[E] =
              ct[R] =
              ct[j] =
              ct[B] =
              ct[F] =
              ct[U] =
              ct[w] =
              ct[C] =
              ct[T] =
              ct[O] =
              ct[A] =
              ct[N] =
              ct[L] =
              ct[V] =
              ct[H] =
              ct[W] =
              ct[q] =
                !0),
              (ct[k] = ct[x] = ct[M] = !1);
            var ut = {
                "\\": "\\",
                "'": "'",
                "\n": "n",
                "\r": "r",
                "\u2028": "u2028",
                "\u2029": "u2029",
              },
              pt = parseFloat,
              mt = parseInt,
              dt =
                "object" == typeof n.g && n.g && n.g.Object === Object && n.g,
              ht =
                "object" == typeof self &&
                self &&
                self.Object === Object &&
                self,
              ft = dt || ht || Function("return this")(),
              _t = t && !t.nodeType && t,
              gt = _t && e && !e.nodeType && e,
              vt = gt && gt.exports === _t,
              yt = vt && dt.process,
              bt = (function () {
                try {
                  var e = gt && gt.require && gt.require("util").types;
                  return e || (yt && yt.binding && yt.binding("util"));
                } catch (e) {}
              })(),
              Et = bt && bt.isArrayBuffer,
              kt = bt && bt.isDate,
              xt = bt && bt.isMap,
              St = bt && bt.isRegExp,
              wt = bt && bt.isSet,
              Ct = bt && bt.isTypedArray;
            function Tt(e, t, n) {
              switch (n.length) {
                case 0:
                  return e.call(t);
                case 1:
                  return e.call(t, n[0]);
                case 2:
                  return e.call(t, n[0], n[1]);
                case 3:
                  return e.call(t, n[0], n[1], n[2]);
              }
              return e.apply(t, n);
            }
            function It(e, t, n, o) {
              for (var s = -1, i = null == e ? 0 : e.length; ++s < i; ) {
                var a = e[s];
                t(o, a, n(a), e);
              }
              return o;
            }
            function Ot(e, t) {
              for (
                var n = -1, o = null == e ? 0 : e.length;
                ++n < o && !1 !== t(e[n], n, e);

              );
              return e;
            }
            function At(e, t) {
              for (
                var n = null == e ? 0 : e.length;
                n-- && !1 !== t(e[n], n, e);

              );
              return e;
            }
            function Nt(e, t) {
              for (var n = -1, o = null == e ? 0 : e.length; ++n < o; )
                if (!t(e[n], n, e)) return !1;
              return !0;
            }
            function Lt(e, t) {
              for (
                var n = -1, o = null == e ? 0 : e.length, s = 0, i = [];
                ++n < o;

              ) {
                var a = e[n];
                t(a, n, e) && (i[s++] = a);
              }
              return i;
            }
            function Mt(e, t) {
              return !!(null == e ? 0 : e.length) && Wt(e, t, 0) > -1;
            }
            function Pt(e, t, n) {
              for (var o = -1, s = null == e ? 0 : e.length; ++o < s; )
                if (n(t, e[o])) return !0;
              return !1;
            }
            function Dt(e, t) {
              for (
                var n = -1, o = null == e ? 0 : e.length, s = Array(o);
                ++n < o;

              )
                s[n] = t(e[n], n, e);
              return s;
            }
            function Rt(e, t) {
              for (var n = -1, o = t.length, s = e.length; ++n < o; )
                e[s + n] = t[n];
              return e;
            }
            function jt(e, t, n, o) {
              var s = -1,
                i = null == e ? 0 : e.length;
              for (o && i && (n = e[++s]); ++s < i; ) n = t(n, e[s], s, e);
              return n;
            }
            function Bt(e, t, n, o) {
              var s = null == e ? 0 : e.length;
              for (o && s && (n = e[--s]); s--; ) n = t(n, e[s], s, e);
              return n;
            }
            function Ft(e, t) {
              for (var n = -1, o = null == e ? 0 : e.length; ++n < o; )
                if (t(e[n], n, e)) return !0;
              return !1;
            }
            var Ut = Gt("length");
            function Vt(e, t, n) {
              var o;
              return (
                n(e, function (e, n, s) {
                  if (t(e, n, s)) return (o = n), !1;
                }),
                o
              );
            }
            function Ht(e, t, n, o) {
              for (var s = e.length, i = n + (o ? 1 : -1); o ? i-- : ++i < s; )
                if (t(e[i], i, e)) return i;
              return -1;
            }
            function Wt(e, t, n) {
              return t == t
                ? (function (e, t, n) {
                    var o = n - 1,
                      s = e.length;
                    for (; ++o < s; ) if (e[o] === t) return o;
                    return -1;
                  })(e, t, n)
                : Ht(e, Kt, n);
            }
            function qt(e, t, n, o) {
              for (var s = n - 1, i = e.length; ++s < i; )
                if (o(e[s], t)) return s;
              return -1;
            }
            function Kt(e) {
              return e != e;
            }
            function $t(e, t) {
              var n = null == e ? 0 : e.length;
              return n ? Qt(e, t) / n : f;
            }
            function Gt(e) {
              return function (t) {
                return null == t ? s : t[e];
              };
            }
            function Yt(e) {
              return function (t) {
                return null == e ? s : e[t];
              };
            }
            function zt(e, t, n, o, s) {
              return (
                s(e, function (e, s, i) {
                  n = o ? ((o = !1), e) : t(n, e, s, i);
                }),
                n
              );
            }
            function Qt(e, t) {
              for (var n, o = -1, i = e.length; ++o < i; ) {
                var a = t(e[o]);
                a !== s && (n = n === s ? a : n + a);
              }
              return n;
            }
            function Xt(e, t) {
              for (var n = -1, o = Array(e); ++n < e; ) o[n] = t(n);
              return o;
            }
            function Zt(e) {
              return function (t) {
                return e(t);
              };
            }
            function Jt(e, t) {
              return Dt(t, function (t) {
                return e[t];
              });
            }
            function en(e, t) {
              return e.has(t);
            }
            function tn(e, t) {
              for (var n = -1, o = e.length; ++n < o && Wt(t, e[n], 0) > -1; );
              return n;
            }
            function nn(e, t) {
              for (var n = e.length; n-- && Wt(t, e[n], 0) > -1; );
              return n;
            }
            var on = Yt({
                À: "A",
                Á: "A",
                Â: "A",
                Ã: "A",
                Ä: "A",
                Å: "A",
                à: "a",
                á: "a",
                â: "a",
                ã: "a",
                ä: "a",
                å: "a",
                Ç: "C",
                ç: "c",
                Ð: "D",
                ð: "d",
                È: "E",
                É: "E",
                Ê: "E",
                Ë: "E",
                è: "e",
                é: "e",
                ê: "e",
                ë: "e",
                Ì: "I",
                Í: "I",
                Î: "I",
                Ï: "I",
                ì: "i",
                í: "i",
                î: "i",
                ï: "i",
                Ñ: "N",
                ñ: "n",
                Ò: "O",
                Ó: "O",
                Ô: "O",
                Õ: "O",
                Ö: "O",
                Ø: "O",
                ò: "o",
                ó: "o",
                ô: "o",
                õ: "o",
                ö: "o",
                ø: "o",
                Ù: "U",
                Ú: "U",
                Û: "U",
                Ü: "U",
                ù: "u",
                ú: "u",
                û: "u",
                ü: "u",
                Ý: "Y",
                ý: "y",
                ÿ: "y",
                Æ: "Ae",
                æ: "ae",
                Þ: "Th",
                þ: "th",
                ß: "ss",
                Ā: "A",
                Ă: "A",
                Ą: "A",
                ā: "a",
                ă: "a",
                ą: "a",
                Ć: "C",
                Ĉ: "C",
                Ċ: "C",
                Č: "C",
                ć: "c",
                ĉ: "c",
                ċ: "c",
                č: "c",
                Ď: "D",
                Đ: "D",
                ď: "d",
                đ: "d",
                Ē: "E",
                Ĕ: "E",
                Ė: "E",
                Ę: "E",
                Ě: "E",
                ē: "e",
                ĕ: "e",
                ė: "e",
                ę: "e",
                ě: "e",
                Ĝ: "G",
                Ğ: "G",
                Ġ: "G",
                Ģ: "G",
                ĝ: "g",
                ğ: "g",
                ġ: "g",
                ģ: "g",
                Ĥ: "H",
                Ħ: "H",
                ĥ: "h",
                ħ: "h",
                Ĩ: "I",
                Ī: "I",
                Ĭ: "I",
                Į: "I",
                İ: "I",
                ĩ: "i",
                ī: "i",
                ĭ: "i",
                į: "i",
                ı: "i",
                Ĵ: "J",
                ĵ: "j",
                Ķ: "K",
                ķ: "k",
                ĸ: "k",
                Ĺ: "L",
                Ļ: "L",
                Ľ: "L",
                Ŀ: "L",
                Ł: "L",
                ĺ: "l",
                ļ: "l",
                ľ: "l",
                ŀ: "l",
                ł: "l",
                Ń: "N",
                Ņ: "N",
                Ň: "N",
                Ŋ: "N",
                ń: "n",
                ņ: "n",
                ň: "n",
                ŋ: "n",
                Ō: "O",
                Ŏ: "O",
                Ő: "O",
                ō: "o",
                ŏ: "o",
                ő: "o",
                Ŕ: "R",
                Ŗ: "R",
                Ř: "R",
                ŕ: "r",
                ŗ: "r",
                ř: "r",
                Ś: "S",
                Ŝ: "S",
                Ş: "S",
                Š: "S",
                ś: "s",
                ŝ: "s",
                ş: "s",
                š: "s",
                Ţ: "T",
                Ť: "T",
                Ŧ: "T",
                ţ: "t",
                ť: "t",
                ŧ: "t",
                Ũ: "U",
                Ū: "U",
                Ŭ: "U",
                Ů: "U",
                Ű: "U",
                Ų: "U",
                ũ: "u",
                ū: "u",
                ŭ: "u",
                ů: "u",
                ű: "u",
                ų: "u",
                Ŵ: "W",
                ŵ: "w",
                Ŷ: "Y",
                ŷ: "y",
                Ÿ: "Y",
                Ź: "Z",
                Ż: "Z",
                Ž: "Z",
                ź: "z",
                ż: "z",
                ž: "z",
                Ĳ: "IJ",
                ĳ: "ij",
                Œ: "Oe",
                œ: "oe",
                ŉ: "'n",
                ſ: "s",
              }),
              sn = Yt({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
              });
            function an(e) {
              return "\\" + ut[e];
            }
            function rn(e) {
              return st.test(e);
            }
            function ln(e) {
              var t = -1,
                n = Array(e.size);
              return (
                e.forEach(function (e, o) {
                  n[++t] = [o, e];
                }),
                n
              );
            }
            function cn(e, t) {
              return function (n) {
                return e(t(n));
              };
            }
            function un(e, t) {
              for (var n = -1, o = e.length, s = 0, i = []; ++n < o; ) {
                var a = e[n];
                (a !== t && a !== r) || ((e[n] = r), (i[s++] = n));
              }
              return i;
            }
            function pn(e, t) {
              return "__proto__" == t ? s : e[t];
            }
            function mn(e) {
              var t = -1,
                n = Array(e.size);
              return (
                e.forEach(function (e) {
                  n[++t] = e;
                }),
                n
              );
            }
            function dn(e) {
              var t = -1,
                n = Array(e.size);
              return (
                e.forEach(function (e) {
                  n[++t] = [e, e];
                }),
                n
              );
            }
            function hn(e) {
              return rn(e)
                ? (function (e) {
                    var t = (nt.lastIndex = 0);
                    for (; nt.test(e); ) ++t;
                    return t;
                  })(e)
                : Ut(e);
            }
            function fn(e) {
              return rn(e)
                ? (function (e) {
                    return e.match(nt) || [];
                  })(e)
                : (function (e) {
                    return e.split("");
                  })(e);
            }
            var _n = Yt({
              "&amp;": "&",
              "&lt;": "<",
              "&gt;": ">",
              "&quot;": '"',
              "&#39;": "'",
            });
            var gn = (function e(t) {
              var n,
                o = (t =
                  null == t ? ft : gn.defaults(ft.Object(), t, gn.pick(ft, at)))
                  .Array,
                Se = t.Date,
                we = t.Error,
                Ce = t.Function,
                Te = t.Math,
                Ie = t.Object,
                Oe = t.RegExp,
                Ae = t.String,
                Ne = t.TypeError,
                Le = o.prototype,
                Me = Ce.prototype,
                Pe = Ie.prototype,
                De = t["__core-js_shared__"],
                Re = Me.toString,
                je = Pe.hasOwnProperty,
                Be = 0,
                Fe = (n = /[^.]+$/.exec(
                  (De && De.keys && De.keys.IE_PROTO) || "",
                ))
                  ? "Symbol(src)_1." + n
                  : "",
                Ue = Pe.toString,
                Ve = Re.call(Ie),
                He = ft._,
                We = Oe(
                  "^" +
                    Re.call(je)
                      .replace(se, "\\$&")
                      .replace(
                        /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                        "$1.*?",
                      ) +
                    "$",
                ),
                qe = vt ? t.Buffer : s,
                Ke = t.Symbol,
                $e = t.Uint8Array,
                Ge = qe ? qe.allocUnsafe : s,
                Ye = cn(Ie.getPrototypeOf, Ie),
                ze = Ie.create,
                Qe = Pe.propertyIsEnumerable,
                Xe = Le.splice,
                Ze = Ke ? Ke.isConcatSpreadable : s,
                Je = Ke ? Ke.iterator : s,
                nt = Ke ? Ke.toStringTag : s,
                st = (function () {
                  try {
                    var e = di(Ie, "defineProperty");
                    return e({}, "", {}), e;
                  } catch (e) {}
                })(),
                ut = t.clearTimeout !== ft.clearTimeout && t.clearTimeout,
                dt = Se && Se.now !== ft.Date.now && Se.now,
                ht = t.setTimeout !== ft.setTimeout && t.setTimeout,
                _t = Te.ceil,
                gt = Te.floor,
                yt = Ie.getOwnPropertySymbols,
                bt = qe ? qe.isBuffer : s,
                Ut = t.isFinite,
                Yt = Le.join,
                vn = cn(Ie.keys, Ie),
                yn = Te.max,
                bn = Te.min,
                En = Se.now,
                kn = t.parseInt,
                xn = Te.random,
                Sn = Le.reverse,
                wn = di(t, "DataView"),
                Cn = di(t, "Map"),
                Tn = di(t, "Promise"),
                In = di(t, "Set"),
                On = di(t, "WeakMap"),
                An = di(Ie, "create"),
                Nn = On && new On(),
                Ln = {},
                Mn = Bi(wn),
                Pn = Bi(Cn),
                Dn = Bi(Tn),
                Rn = Bi(In),
                jn = Bi(On),
                Bn = Ke ? Ke.prototype : s,
                Fn = Bn ? Bn.valueOf : s,
                Un = Bn ? Bn.toString : s;
              function Vn(e) {
                if (tr(e) && !qa(e) && !(e instanceof Kn)) {
                  if (e instanceof qn) return e;
                  if (je.call(e, "__wrapped__")) return Fi(e);
                }
                return new qn(e);
              }
              var Hn = (function () {
                function e() {}
                return function (t) {
                  if (!er(t)) return {};
                  if (ze) return ze(t);
                  e.prototype = t;
                  var n = new e();
                  return (e.prototype = s), n;
                };
              })();
              function Wn() {}
              function qn(e, t) {
                (this.__wrapped__ = e),
                  (this.__actions__ = []),
                  (this.__chain__ = !!t),
                  (this.__index__ = 0),
                  (this.__values__ = s);
              }
              function Kn(e) {
                (this.__wrapped__ = e),
                  (this.__actions__ = []),
                  (this.__dir__ = 1),
                  (this.__filtered__ = !1),
                  (this.__iteratees__ = []),
                  (this.__takeCount__ = _),
                  (this.__views__ = []);
              }
              function $n(e) {
                var t = -1,
                  n = null == e ? 0 : e.length;
                for (this.clear(); ++t < n; ) {
                  var o = e[t];
                  this.set(o[0], o[1]);
                }
              }
              function Gn(e) {
                var t = -1,
                  n = null == e ? 0 : e.length;
                for (this.clear(); ++t < n; ) {
                  var o = e[t];
                  this.set(o[0], o[1]);
                }
              }
              function Yn(e) {
                var t = -1,
                  n = null == e ? 0 : e.length;
                for (this.clear(); ++t < n; ) {
                  var o = e[t];
                  this.set(o[0], o[1]);
                }
              }
              function zn(e) {
                var t = -1,
                  n = null == e ? 0 : e.length;
                for (this.__data__ = new Yn(); ++t < n; ) this.add(e[t]);
              }
              function Qn(e) {
                var t = (this.__data__ = new Gn(e));
                this.size = t.size;
              }
              function Xn(e, t) {
                var n = qa(e),
                  o = !n && Wa(e),
                  s = !n && !o && Ya(e),
                  i = !n && !o && !s && cr(e),
                  a = n || o || s || i,
                  r = a ? Xt(e.length, Ae) : [],
                  l = r.length;
                for (var c in e)
                  (!t && !je.call(e, c)) ||
                    (a &&
                      ("length" == c ||
                        (s && ("offset" == c || "parent" == c)) ||
                        (i &&
                          ("buffer" == c ||
                            "byteLength" == c ||
                            "byteOffset" == c)) ||
                        bi(c, l))) ||
                    r.push(c);
                return r;
              }
              function Zn(e) {
                var t = e.length;
                return t ? e[Qo(0, t - 1)] : s;
              }
              function Jn(e, t) {
                return Di(Ns(e), lo(t, 0, e.length));
              }
              function eo(e) {
                return Di(Ns(e));
              }
              function to(e, t, n) {
                ((n !== s && !Ua(e[t], n)) || (n === s && !(t in e))) &&
                  ao(e, t, n);
              }
              function no(e, t, n) {
                var o = e[t];
                (je.call(e, t) && Ua(o, n) && (n !== s || t in e)) ||
                  ao(e, t, n);
              }
              function oo(e, t) {
                for (var n = e.length; n--; ) if (Ua(e[n][0], t)) return n;
                return -1;
              }
              function so(e, t, n, o) {
                return (
                  ho(e, function (e, s, i) {
                    t(o, e, n(e), i);
                  }),
                  o
                );
              }
              function io(e, t) {
                return e && Ls(t, Nr(t), e);
              }
              function ao(e, t, n) {
                "__proto__" == t && st
                  ? st(e, t, {
                      configurable: !0,
                      enumerable: !0,
                      value: n,
                      writable: !0,
                    })
                  : (e[t] = n);
              }
              function ro(e, t) {
                for (
                  var n = -1, i = t.length, a = o(i), r = null == e;
                  ++n < i;

                )
                  a[n] = r ? s : Cr(e, t[n]);
                return a;
              }
              function lo(e, t, n) {
                return (
                  e == e &&
                    (n !== s && (e = e <= n ? e : n),
                    t !== s && (e = e >= t ? e : t)),
                  e
                );
              }
              function co(e, t, n, o, i, a) {
                var r,
                  l = 1 & t,
                  c = 2 & t,
                  u = 4 & t;
                if ((n && (r = i ? n(e, o, i, a) : n(e)), r !== s)) return r;
                if (!er(e)) return e;
                var p = qa(e);
                if (p) {
                  if (
                    ((r = (function (e) {
                      var t = e.length,
                        n = new e.constructor(t);
                      t &&
                        "string" == typeof e[0] &&
                        je.call(e, "index") &&
                        ((n.index = e.index), (n.input = e.input));
                      return n;
                    })(e)),
                    !l)
                  )
                    return Ns(e, r);
                } else {
                  var m = _i(e),
                    d = m == x || m == S;
                  if (Ya(e)) return ws(e, l);
                  if (m == T || m == v || (d && !i)) {
                    if (((r = c || d ? {} : vi(e)), !l))
                      return c
                        ? (function (e, t) {
                            return Ls(e, fi(e), t);
                          })(
                            e,
                            (function (e, t) {
                              return e && Ls(t, Lr(t), e);
                            })(r, e),
                          )
                        : (function (e, t) {
                            return Ls(e, hi(e), t);
                          })(e, io(r, e));
                  } else {
                    if (!ct[m]) return i ? e : {};
                    r = (function (e, t, n) {
                      var o = e.constructor;
                      switch (t) {
                        case P:
                          return Cs(e);
                        case b:
                        case E:
                          return new o(+e);
                        case D:
                          return (function (e, t) {
                            var n = t ? Cs(e.buffer) : e.buffer;
                            return new e.constructor(
                              n,
                              e.byteOffset,
                              e.byteLength,
                            );
                          })(e, n);
                        case R:
                        case j:
                        case B:
                        case F:
                        case U:
                        case V:
                        case H:
                        case W:
                        case q:
                          return Ts(e, n);
                        case w:
                          return new o();
                        case C:
                        case N:
                          return new o(e);
                        case O:
                          return (function (e) {
                            var t = new e.constructor(e.source, fe.exec(e));
                            return (t.lastIndex = e.lastIndex), t;
                          })(e);
                        case A:
                          return new o();
                        case L:
                          return (s = e), Fn ? Ie(Fn.call(s)) : {};
                      }
                      var s;
                    })(e, m, l);
                  }
                }
                a || (a = new Qn());
                var h = a.get(e);
                if (h) return h;
                if ((a.set(e, r), ar(e)))
                  return (
                    e.forEach(function (o) {
                      r.add(co(o, t, n, o, e, a));
                    }),
                    r
                  );
                if (nr(e))
                  return (
                    e.forEach(function (o, s) {
                      r.set(s, co(o, t, n, s, e, a));
                    }),
                    r
                  );
                var f = p ? s : (u ? (c ? ai : ii) : c ? Lr : Nr)(e);
                return (
                  Ot(f || e, function (o, s) {
                    f && (o = e[(s = o)]), no(r, s, co(o, t, n, s, e, a));
                  }),
                  r
                );
              }
              function uo(e, t, n) {
                var o = n.length;
                if (null == e) return !o;
                for (e = Ie(e); o--; ) {
                  var i = n[o],
                    a = t[i],
                    r = e[i];
                  if ((r === s && !(i in e)) || !a(r)) return !1;
                }
                return !0;
              }
              function po(e, t, n) {
                if ("function" != typeof e) throw new Ne(i);
                return Ni(function () {
                  e.apply(s, n);
                }, t);
              }
              function mo(e, t, n, o) {
                var s = -1,
                  i = Mt,
                  a = !0,
                  r = e.length,
                  l = [],
                  c = t.length;
                if (!r) return l;
                n && (t = Dt(t, Zt(n))),
                  o
                    ? ((i = Pt), (a = !1))
                    : t.length >= 200 && ((i = en), (a = !1), (t = new zn(t)));
                e: for (; ++s < r; ) {
                  var u = e[s],
                    p = null == n ? u : n(u);
                  if (((u = o || 0 !== u ? u : 0), a && p == p)) {
                    for (var m = c; m--; ) if (t[m] === p) continue e;
                    l.push(u);
                  } else i(t, p, o) || l.push(u);
                }
                return l;
              }
              (Vn.templateSettings = {
                escape: Z,
                evaluate: J,
                interpolate: ee,
                variable: "",
                imports: { _: Vn },
              }),
                (Vn.prototype = Wn.prototype),
                (Vn.prototype.constructor = Vn),
                (qn.prototype = Hn(Wn.prototype)),
                (qn.prototype.constructor = qn),
                (Kn.prototype = Hn(Wn.prototype)),
                (Kn.prototype.constructor = Kn),
                ($n.prototype.clear = function () {
                  (this.__data__ = An ? An(null) : {}), (this.size = 0);
                }),
                ($n.prototype.delete = function (e) {
                  var t = this.has(e) && delete this.__data__[e];
                  return (this.size -= t ? 1 : 0), t;
                }),
                ($n.prototype.get = function (e) {
                  var t = this.__data__;
                  if (An) {
                    var n = t[e];
                    return n === a ? s : n;
                  }
                  return je.call(t, e) ? t[e] : s;
                }),
                ($n.prototype.has = function (e) {
                  var t = this.__data__;
                  return An ? t[e] !== s : je.call(t, e);
                }),
                ($n.prototype.set = function (e, t) {
                  var n = this.__data__;
                  return (
                    (this.size += this.has(e) ? 0 : 1),
                    (n[e] = An && t === s ? a : t),
                    this
                  );
                }),
                (Gn.prototype.clear = function () {
                  (this.__data__ = []), (this.size = 0);
                }),
                (Gn.prototype.delete = function (e) {
                  var t = this.__data__,
                    n = oo(t, e);
                  return (
                    !(n < 0) &&
                    (n == t.length - 1 ? t.pop() : Xe.call(t, n, 1),
                    --this.size,
                    !0)
                  );
                }),
                (Gn.prototype.get = function (e) {
                  var t = this.__data__,
                    n = oo(t, e);
                  return n < 0 ? s : t[n][1];
                }),
                (Gn.prototype.has = function (e) {
                  return oo(this.__data__, e) > -1;
                }),
                (Gn.prototype.set = function (e, t) {
                  var n = this.__data__,
                    o = oo(n, e);
                  return (
                    o < 0 ? (++this.size, n.push([e, t])) : (n[o][1] = t), this
                  );
                }),
                (Yn.prototype.clear = function () {
                  (this.size = 0),
                    (this.__data__ = {
                      hash: new $n(),
                      map: new (Cn || Gn)(),
                      string: new $n(),
                    });
                }),
                (Yn.prototype.delete = function (e) {
                  var t = pi(this, e).delete(e);
                  return (this.size -= t ? 1 : 0), t;
                }),
                (Yn.prototype.get = function (e) {
                  return pi(this, e).get(e);
                }),
                (Yn.prototype.has = function (e) {
                  return pi(this, e).has(e);
                }),
                (Yn.prototype.set = function (e, t) {
                  var n = pi(this, e),
                    o = n.size;
                  return n.set(e, t), (this.size += n.size == o ? 0 : 1), this;
                }),
                (zn.prototype.add = zn.prototype.push =
                  function (e) {
                    return this.__data__.set(e, a), this;
                  }),
                (zn.prototype.has = function (e) {
                  return this.__data__.has(e);
                }),
                (Qn.prototype.clear = function () {
                  (this.__data__ = new Gn()), (this.size = 0);
                }),
                (Qn.prototype.delete = function (e) {
                  var t = this.__data__,
                    n = t.delete(e);
                  return (this.size = t.size), n;
                }),
                (Qn.prototype.get = function (e) {
                  return this.__data__.get(e);
                }),
                (Qn.prototype.has = function (e) {
                  return this.__data__.has(e);
                }),
                (Qn.prototype.set = function (e, t) {
                  var n = this.__data__;
                  if (n instanceof Gn) {
                    var o = n.__data__;
                    if (!Cn || o.length < 199)
                      return o.push([e, t]), (this.size = ++n.size), this;
                    n = this.__data__ = new Yn(o);
                  }
                  return n.set(e, t), (this.size = n.size), this;
                });
              var ho = Ds(ko),
                fo = Ds(xo, !0);
              function _o(e, t) {
                var n = !0;
                return (
                  ho(e, function (e, o, s) {
                    return (n = !!t(e, o, s));
                  }),
                  n
                );
              }
              function go(e, t, n) {
                for (var o = -1, i = e.length; ++o < i; ) {
                  var a = e[o],
                    r = t(a);
                  if (null != r && (l === s ? r == r && !lr(r) : n(r, l)))
                    var l = r,
                      c = a;
                }
                return c;
              }
              function vo(e, t) {
                var n = [];
                return (
                  ho(e, function (e, o, s) {
                    t(e, o, s) && n.push(e);
                  }),
                  n
                );
              }
              function yo(e, t, n, o, s) {
                var i = -1,
                  a = e.length;
                for (n || (n = yi), s || (s = []); ++i < a; ) {
                  var r = e[i];
                  t > 0 && n(r)
                    ? t > 1
                      ? yo(r, t - 1, n, o, s)
                      : Rt(s, r)
                    : o || (s[s.length] = r);
                }
                return s;
              }
              var bo = Rs(),
                Eo = Rs(!0);
              function ko(e, t) {
                return e && bo(e, t, Nr);
              }
              function xo(e, t) {
                return e && Eo(e, t, Nr);
              }
              function So(e, t) {
                return Lt(t, function (t) {
                  return Xa(e[t]);
                });
              }
              function wo(e, t) {
                for (var n = 0, o = (t = Es(t, e)).length; null != e && n < o; )
                  e = e[ji(t[n++])];
                return n && n == o ? e : s;
              }
              function Co(e, t, n) {
                var o = t(e);
                return qa(e) ? o : Rt(o, n(e));
              }
              function To(e) {
                return null == e
                  ? e === s
                    ? "[object Undefined]"
                    : "[object Null]"
                  : nt && nt in Ie(e)
                    ? (function (e) {
                        var t = je.call(e, nt),
                          n = e[nt];
                        try {
                          e[nt] = s;
                          var o = !0;
                        } catch (e) {}
                        var i = Ue.call(e);
                        o && (t ? (e[nt] = n) : delete e[nt]);
                        return i;
                      })(e)
                    : (function (e) {
                        return Ue.call(e);
                      })(e);
              }
              function Io(e, t) {
                return e > t;
              }
              function Oo(e, t) {
                return null != e && je.call(e, t);
              }
              function Ao(e, t) {
                return null != e && t in Ie(e);
              }
              function No(e, t, n) {
                for (
                  var i = n ? Pt : Mt,
                    a = e[0].length,
                    r = e.length,
                    l = r,
                    c = o(r),
                    u = 1 / 0,
                    p = [];
                  l--;

                ) {
                  var m = e[l];
                  l && t && (m = Dt(m, Zt(t))),
                    (u = bn(m.length, u)),
                    (c[l] =
                      !n && (t || (a >= 120 && m.length >= 120))
                        ? new zn(l && m)
                        : s);
                }
                m = e[0];
                var d = -1,
                  h = c[0];
                e: for (; ++d < a && p.length < u; ) {
                  var f = m[d],
                    _ = t ? t(f) : f;
                  if (
                    ((f = n || 0 !== f ? f : 0), !(h ? en(h, _) : i(p, _, n)))
                  ) {
                    for (l = r; --l; ) {
                      var g = c[l];
                      if (!(g ? en(g, _) : i(e[l], _, n))) continue e;
                    }
                    h && h.push(_), p.push(f);
                  }
                }
                return p;
              }
              function Lo(e, t, n) {
                var o = null == (e = Oi(e, (t = Es(t, e)))) ? e : e[ji(Qi(t))];
                return null == o ? s : Tt(o, e, n);
              }
              function Mo(e) {
                return tr(e) && To(e) == v;
              }
              function Po(e, t, n, o, i) {
                return (
                  e === t ||
                  (null == e || null == t || (!tr(e) && !tr(t))
                    ? e != e && t != t
                    : (function (e, t, n, o, i, a) {
                        var r = qa(e),
                          l = qa(t),
                          c = r ? y : _i(e),
                          u = l ? y : _i(t),
                          p = (c = c == v ? T : c) == T,
                          m = (u = u == v ? T : u) == T,
                          d = c == u;
                        if (d && Ya(e)) {
                          if (!Ya(t)) return !1;
                          (r = !0), (p = !1);
                        }
                        if (d && !p)
                          return (
                            a || (a = new Qn()),
                            r || cr(e)
                              ? oi(e, t, n, o, i, a)
                              : (function (e, t, n, o, s, i, a) {
                                  switch (n) {
                                    case D:
                                      if (
                                        e.byteLength != t.byteLength ||
                                        e.byteOffset != t.byteOffset
                                      )
                                        return !1;
                                      (e = e.buffer), (t = t.buffer);
                                    case P:
                                      return !(
                                        e.byteLength != t.byteLength ||
                                        !i(new $e(e), new $e(t))
                                      );
                                    case b:
                                    case E:
                                    case C:
                                      return Ua(+e, +t);
                                    case k:
                                      return (
                                        e.name == t.name &&
                                        e.message == t.message
                                      );
                                    case O:
                                    case N:
                                      return e == t + "";
                                    case w:
                                      var r = ln;
                                    case A:
                                      var l = 1 & o;
                                      if (
                                        (r || (r = mn), e.size != t.size && !l)
                                      )
                                        return !1;
                                      var c = a.get(e);
                                      if (c) return c == t;
                                      (o |= 2), a.set(e, t);
                                      var u = oi(r(e), r(t), o, s, i, a);
                                      return a.delete(e), u;
                                    case L:
                                      if (Fn) return Fn.call(e) == Fn.call(t);
                                  }
                                  return !1;
                                })(e, t, c, n, o, i, a)
                          );
                        if (!(1 & n)) {
                          var h = p && je.call(e, "__wrapped__"),
                            f = m && je.call(t, "__wrapped__");
                          if (h || f) {
                            var _ = h ? e.value() : e,
                              g = f ? t.value() : t;
                            return a || (a = new Qn()), i(_, g, n, o, a);
                          }
                        }
                        if (!d) return !1;
                        return (
                          a || (a = new Qn()),
                          (function (e, t, n, o, i, a) {
                            var r = 1 & n,
                              l = ii(e),
                              c = l.length,
                              u = ii(t),
                              p = u.length;
                            if (c != p && !r) return !1;
                            var m = c;
                            for (; m--; ) {
                              var d = l[m];
                              if (!(r ? d in t : je.call(t, d))) return !1;
                            }
                            var h = a.get(e);
                            if (h && a.get(t)) return h == t;
                            var f = !0;
                            a.set(e, t), a.set(t, e);
                            var _ = r;
                            for (; ++m < c; ) {
                              var g = e[(d = l[m])],
                                v = t[d];
                              if (o)
                                var y = r
                                  ? o(v, g, d, t, e, a)
                                  : o(g, v, d, e, t, a);
                              if (
                                !(y === s ? g === v || i(g, v, n, o, a) : y)
                              ) {
                                f = !1;
                                break;
                              }
                              _ || (_ = "constructor" == d);
                            }
                            if (f && !_) {
                              var b = e.constructor,
                                E = t.constructor;
                              b == E ||
                                !("constructor" in e) ||
                                !("constructor" in t) ||
                                ("function" == typeof b &&
                                  b instanceof b &&
                                  "function" == typeof E &&
                                  E instanceof E) ||
                                (f = !1);
                            }
                            return a.delete(e), a.delete(t), f;
                          })(e, t, n, o, i, a)
                        );
                      })(e, t, n, o, Po, i))
                );
              }
              function Do(e, t, n, o) {
                var i = n.length,
                  a = i,
                  r = !o;
                if (null == e) return !a;
                for (e = Ie(e); i--; ) {
                  var l = n[i];
                  if (r && l[2] ? l[1] !== e[l[0]] : !(l[0] in e)) return !1;
                }
                for (; ++i < a; ) {
                  var c = (l = n[i])[0],
                    u = e[c],
                    p = l[1];
                  if (r && l[2]) {
                    if (u === s && !(c in e)) return !1;
                  } else {
                    var m = new Qn();
                    if (o) var d = o(u, p, c, e, t, m);
                    if (!(d === s ? Po(p, u, 3, o, m) : d)) return !1;
                  }
                }
                return !0;
              }
              function Ro(e) {
                return (
                  !(!er(e) || ((t = e), Fe && Fe in t)) &&
                  (Xa(e) ? We : ve).test(Bi(e))
                );
                var t;
              }
              function jo(e) {
                return "function" == typeof e
                  ? e
                  : null == e
                    ? ol
                    : "object" == typeof e
                      ? qa(e)
                        ? Wo(e[0], e[1])
                        : Ho(e)
                      : ml(e);
              }
              function Bo(e) {
                if (!wi(e)) return vn(e);
                var t = [];
                for (var n in Ie(e))
                  je.call(e, n) && "constructor" != n && t.push(n);
                return t;
              }
              function Fo(e) {
                if (!er(e))
                  return (function (e) {
                    var t = [];
                    if (null != e) for (var n in Ie(e)) t.push(n);
                    return t;
                  })(e);
                var t = wi(e),
                  n = [];
                for (var o in e)
                  ("constructor" != o || (!t && je.call(e, o))) && n.push(o);
                return n;
              }
              function Uo(e, t) {
                return e < t;
              }
              function Vo(e, t) {
                var n = -1,
                  s = $a(e) ? o(e.length) : [];
                return (
                  ho(e, function (e, o, i) {
                    s[++n] = t(e, o, i);
                  }),
                  s
                );
              }
              function Ho(e) {
                var t = mi(e);
                return 1 == t.length && t[0][2]
                  ? Ti(t[0][0], t[0][1])
                  : function (n) {
                      return n === e || Do(n, e, t);
                    };
              }
              function Wo(e, t) {
                return ki(e) && Ci(t)
                  ? Ti(ji(e), t)
                  : function (n) {
                      var o = Cr(n, e);
                      return o === s && o === t ? Tr(n, e) : Po(t, o, 3);
                    };
              }
              function qo(e, t, n, o, i) {
                e !== t &&
                  bo(
                    t,
                    function (a, r) {
                      if (er(a))
                        i || (i = new Qn()),
                          (function (e, t, n, o, i, a, r) {
                            var l = pn(e, n),
                              c = pn(t, n),
                              u = r.get(c);
                            if (u) return void to(e, n, u);
                            var p = a ? a(l, c, n + "", e, t, r) : s,
                              m = p === s;
                            if (m) {
                              var d = qa(c),
                                h = !d && Ya(c),
                                f = !d && !h && cr(c);
                              (p = c),
                                d || h || f
                                  ? qa(l)
                                    ? (p = l)
                                    : Ga(l)
                                      ? (p = Ns(l))
                                      : h
                                        ? ((m = !1), (p = ws(c, !0)))
                                        : f
                                          ? ((m = !1), (p = Ts(c, !0)))
                                          : (p = [])
                                  : sr(c) || Wa(c)
                                    ? ((p = l),
                                      Wa(l)
                                        ? (p = gr(l))
                                        : (!er(l) || (o && Xa(l))) &&
                                          (p = vi(c)))
                                    : (m = !1);
                            }
                            m && (r.set(c, p), i(p, c, o, a, r), r.delete(c));
                            to(e, n, p);
                          })(e, t, r, n, qo, o, i);
                      else {
                        var l = o ? o(pn(e, r), a, r + "", e, t, i) : s;
                        l === s && (l = a), to(e, r, l);
                      }
                    },
                    Lr,
                  );
              }
              function Ko(e, t) {
                var n = e.length;
                if (n) return bi((t += t < 0 ? n : 0), n) ? e[t] : s;
              }
              function $o(e, t, n) {
                var o = -1;
                t = Dt(t.length ? t : [ol], Zt(ui()));
                var s = Vo(e, function (e, n, s) {
                  var i = Dt(t, function (t) {
                    return t(e);
                  });
                  return { criteria: i, index: ++o, value: e };
                });
                return (function (e, t) {
                  var n = e.length;
                  for (e.sort(t); n--; ) e[n] = e[n].value;
                  return e;
                })(s, function (e, t) {
                  return (function (e, t, n) {
                    var o = -1,
                      s = e.criteria,
                      i = t.criteria,
                      a = s.length,
                      r = n.length;
                    for (; ++o < a; ) {
                      var l = Is(s[o], i[o]);
                      if (l) return o >= r ? l : l * ("desc" == n[o] ? -1 : 1);
                    }
                    return e.index - t.index;
                  })(e, t, n);
                });
              }
              function Go(e, t, n) {
                for (var o = -1, s = t.length, i = {}; ++o < s; ) {
                  var a = t[o],
                    r = wo(e, a);
                  n(r, a) && ts(i, Es(a, e), r);
                }
                return i;
              }
              function Yo(e, t, n, o) {
                var s = o ? qt : Wt,
                  i = -1,
                  a = t.length,
                  r = e;
                for (e === t && (t = Ns(t)), n && (r = Dt(e, Zt(n))); ++i < a; )
                  for (
                    var l = 0, c = t[i], u = n ? n(c) : c;
                    (l = s(r, u, l, o)) > -1;

                  )
                    r !== e && Xe.call(r, l, 1), Xe.call(e, l, 1);
                return e;
              }
              function zo(e, t) {
                for (var n = e ? t.length : 0, o = n - 1; n--; ) {
                  var s = t[n];
                  if (n == o || s !== i) {
                    var i = s;
                    bi(s) ? Xe.call(e, s, 1) : ds(e, s);
                  }
                }
                return e;
              }
              function Qo(e, t) {
                return e + gt(xn() * (t - e + 1));
              }
              function Xo(e, t) {
                var n = "";
                if (!e || t < 1 || t > h) return n;
                do {
                  t % 2 && (n += e), (t = gt(t / 2)) && (e += e);
                } while (t);
                return n;
              }
              function Zo(e, t) {
                return Li(Ii(e, t, ol), e + "");
              }
              function Jo(e) {
                return Zn(Ur(e));
              }
              function es(e, t) {
                var n = Ur(e);
                return Di(n, lo(t, 0, n.length));
              }
              function ts(e, t, n, o) {
                if (!er(e)) return e;
                for (
                  var i = -1, a = (t = Es(t, e)).length, r = a - 1, l = e;
                  null != l && ++i < a;

                ) {
                  var c = ji(t[i]),
                    u = n;
                  if (i != r) {
                    var p = l[c];
                    (u = o ? o(p, c, l) : s) === s &&
                      (u = er(p) ? p : bi(t[i + 1]) ? [] : {});
                  }
                  no(l, c, u), (l = l[c]);
                }
                return e;
              }
              var ns = Nn
                  ? function (e, t) {
                      return Nn.set(e, t), e;
                    }
                  : ol,
                os = st
                  ? function (e, t) {
                      return st(e, "toString", {
                        configurable: !0,
                        enumerable: !1,
                        value: el(t),
                        writable: !0,
                      });
                    }
                  : ol;
              function ss(e) {
                return Di(Ur(e));
              }
              function is(e, t, n) {
                var s = -1,
                  i = e.length;
                t < 0 && (t = -t > i ? 0 : i + t),
                  (n = n > i ? i : n) < 0 && (n += i),
                  (i = t > n ? 0 : (n - t) >>> 0),
                  (t >>>= 0);
                for (var a = o(i); ++s < i; ) a[s] = e[s + t];
                return a;
              }
              function as(e, t) {
                var n;
                return (
                  ho(e, function (e, o, s) {
                    return !(n = t(e, o, s));
                  }),
                  !!n
                );
              }
              function rs(e, t, n) {
                var o = 0,
                  s = null == e ? o : e.length;
                if ("number" == typeof t && t == t && s <= 2147483647) {
                  for (; o < s; ) {
                    var i = (o + s) >>> 1,
                      a = e[i];
                    null !== a && !lr(a) && (n ? a <= t : a < t)
                      ? (o = i + 1)
                      : (s = i);
                  }
                  return s;
                }
                return ls(e, t, ol, n);
              }
              function ls(e, t, n, o) {
                t = n(t);
                for (
                  var i = 0,
                    a = null == e ? 0 : e.length,
                    r = t != t,
                    l = null === t,
                    c = lr(t),
                    u = t === s;
                  i < a;

                ) {
                  var p = gt((i + a) / 2),
                    m = n(e[p]),
                    d = m !== s,
                    h = null === m,
                    f = m == m,
                    _ = lr(m);
                  if (r) var g = o || f;
                  else
                    g = u
                      ? f && (o || d)
                      : l
                        ? f && d && (o || !h)
                        : c
                          ? f && d && !h && (o || !_)
                          : !h && !_ && (o ? m <= t : m < t);
                  g ? (i = p + 1) : (a = p);
                }
                return bn(a, 4294967294);
              }
              function cs(e, t) {
                for (var n = -1, o = e.length, s = 0, i = []; ++n < o; ) {
                  var a = e[n],
                    r = t ? t(a) : a;
                  if (!n || !Ua(r, l)) {
                    var l = r;
                    i[s++] = 0 === a ? 0 : a;
                  }
                }
                return i;
              }
              function us(e) {
                return "number" == typeof e ? e : lr(e) ? f : +e;
              }
              function ps(e) {
                if ("string" == typeof e) return e;
                if (qa(e)) return Dt(e, ps) + "";
                if (lr(e)) return Un ? Un.call(e) : "";
                var t = e + "";
                return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
              }
              function ms(e, t, n) {
                var o = -1,
                  s = Mt,
                  i = e.length,
                  a = !0,
                  r = [],
                  l = r;
                if (n) (a = !1), (s = Pt);
                else if (i >= 200) {
                  var c = t ? null : Xs(e);
                  if (c) return mn(c);
                  (a = !1), (s = en), (l = new zn());
                } else l = t ? [] : r;
                e: for (; ++o < i; ) {
                  var u = e[o],
                    p = t ? t(u) : u;
                  if (((u = n || 0 !== u ? u : 0), a && p == p)) {
                    for (var m = l.length; m--; ) if (l[m] === p) continue e;
                    t && l.push(p), r.push(u);
                  } else s(l, p, n) || (l !== r && l.push(p), r.push(u));
                }
                return r;
              }
              function ds(e, t) {
                return (
                  null == (e = Oi(e, (t = Es(t, e)))) || delete e[ji(Qi(t))]
                );
              }
              function hs(e, t, n, o) {
                return ts(e, t, n(wo(e, t)), o);
              }
              function fs(e, t, n, o) {
                for (
                  var s = e.length, i = o ? s : -1;
                  (o ? i-- : ++i < s) && t(e[i], i, e);

                );
                return n
                  ? is(e, o ? 0 : i, o ? i + 1 : s)
                  : is(e, o ? i + 1 : 0, o ? s : i);
              }
              function _s(e, t) {
                var n = e;
                return (
                  n instanceof Kn && (n = n.value()),
                  jt(
                    t,
                    function (e, t) {
                      return t.func.apply(t.thisArg, Rt([e], t.args));
                    },
                    n,
                  )
                );
              }
              function gs(e, t, n) {
                var s = e.length;
                if (s < 2) return s ? ms(e[0]) : [];
                for (var i = -1, a = o(s); ++i < s; )
                  for (var r = e[i], l = -1; ++l < s; )
                    l != i && (a[i] = mo(a[i] || r, e[l], t, n));
                return ms(yo(a, 1), t, n);
              }
              function vs(e, t, n) {
                for (
                  var o = -1, i = e.length, a = t.length, r = {};
                  ++o < i;

                ) {
                  var l = o < a ? t[o] : s;
                  n(r, e[o], l);
                }
                return r;
              }
              function ys(e) {
                return Ga(e) ? e : [];
              }
              function bs(e) {
                return "function" == typeof e ? e : ol;
              }
              function Es(e, t) {
                return qa(e) ? e : ki(e, t) ? [e] : Ri(vr(e));
              }
              var ks = Zo;
              function xs(e, t, n) {
                var o = e.length;
                return (n = n === s ? o : n), !t && n >= o ? e : is(e, t, n);
              }
              var Ss =
                ut ||
                function (e) {
                  return ft.clearTimeout(e);
                };
              function ws(e, t) {
                if (t) return e.slice();
                var n = e.length,
                  o = Ge ? Ge(n) : new e.constructor(n);
                return e.copy(o), o;
              }
              function Cs(e) {
                var t = new e.constructor(e.byteLength);
                return new $e(t).set(new $e(e)), t;
              }
              function Ts(e, t) {
                var n = t ? Cs(e.buffer) : e.buffer;
                return new e.constructor(n, e.byteOffset, e.length);
              }
              function Is(e, t) {
                if (e !== t) {
                  var n = e !== s,
                    o = null === e,
                    i = e == e,
                    a = lr(e),
                    r = t !== s,
                    l = null === t,
                    c = t == t,
                    u = lr(t);
                  if (
                    (!l && !u && !a && e > t) ||
                    (a && r && c && !l && !u) ||
                    (o && r && c) ||
                    (!n && c) ||
                    !i
                  )
                    return 1;
                  if (
                    (!o && !a && !u && e < t) ||
                    (u && n && i && !o && !a) ||
                    (l && n && i) ||
                    (!r && i) ||
                    !c
                  )
                    return -1;
                }
                return 0;
              }
              function Os(e, t, n, s) {
                for (
                  var i = -1,
                    a = e.length,
                    r = n.length,
                    l = -1,
                    c = t.length,
                    u = yn(a - r, 0),
                    p = o(c + u),
                    m = !s;
                  ++l < c;

                )
                  p[l] = t[l];
                for (; ++i < r; ) (m || i < a) && (p[n[i]] = e[i]);
                for (; u--; ) p[l++] = e[i++];
                return p;
              }
              function As(e, t, n, s) {
                for (
                  var i = -1,
                    a = e.length,
                    r = -1,
                    l = n.length,
                    c = -1,
                    u = t.length,
                    p = yn(a - l, 0),
                    m = o(p + u),
                    d = !s;
                  ++i < p;

                )
                  m[i] = e[i];
                for (var h = i; ++c < u; ) m[h + c] = t[c];
                for (; ++r < l; ) (d || i < a) && (m[h + n[r]] = e[i++]);
                return m;
              }
              function Ns(e, t) {
                var n = -1,
                  s = e.length;
                for (t || (t = o(s)); ++n < s; ) t[n] = e[n];
                return t;
              }
              function Ls(e, t, n, o) {
                var i = !n;
                n || (n = {});
                for (var a = -1, r = t.length; ++a < r; ) {
                  var l = t[a],
                    c = o ? o(n[l], e[l], l, n, e) : s;
                  c === s && (c = e[l]), i ? ao(n, l, c) : no(n, l, c);
                }
                return n;
              }
              function Ms(e, t) {
                return function (n, o) {
                  var s = qa(n) ? It : so,
                    i = t ? t() : {};
                  return s(n, e, ui(o, 2), i);
                };
              }
              function Ps(e) {
                return Zo(function (t, n) {
                  var o = -1,
                    i = n.length,
                    a = i > 1 ? n[i - 1] : s,
                    r = i > 2 ? n[2] : s;
                  for (
                    a = e.length > 3 && "function" == typeof a ? (i--, a) : s,
                      r && Ei(n[0], n[1], r) && ((a = i < 3 ? s : a), (i = 1)),
                      t = Ie(t);
                    ++o < i;

                  ) {
                    var l = n[o];
                    l && e(t, l, o, a);
                  }
                  return t;
                });
              }
              function Ds(e, t) {
                return function (n, o) {
                  if (null == n) return n;
                  if (!$a(n)) return e(n, o);
                  for (
                    var s = n.length, i = t ? s : -1, a = Ie(n);
                    (t ? i-- : ++i < s) && !1 !== o(a[i], i, a);

                  );
                  return n;
                };
              }
              function Rs(e) {
                return function (t, n, o) {
                  for (var s = -1, i = Ie(t), a = o(t), r = a.length; r--; ) {
                    var l = a[e ? r : ++s];
                    if (!1 === n(i[l], l, i)) break;
                  }
                  return t;
                };
              }
              function js(e) {
                return function (t) {
                  var n = rn((t = vr(t))) ? fn(t) : s,
                    o = n ? n[0] : t.charAt(0),
                    i = n ? xs(n, 1).join("") : t.slice(1);
                  return o[e]() + i;
                };
              }
              function Bs(e) {
                return function (t) {
                  return jt(Xr(Wr(t).replace(et, "")), e, "");
                };
              }
              function Fs(e) {
                return function () {
                  var t = arguments;
                  switch (t.length) {
                    case 0:
                      return new e();
                    case 1:
                      return new e(t[0]);
                    case 2:
                      return new e(t[0], t[1]);
                    case 3:
                      return new e(t[0], t[1], t[2]);
                    case 4:
                      return new e(t[0], t[1], t[2], t[3]);
                    case 5:
                      return new e(t[0], t[1], t[2], t[3], t[4]);
                    case 6:
                      return new e(t[0], t[1], t[2], t[3], t[4], t[5]);
                    case 7:
                      return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
                  }
                  var n = Hn(e.prototype),
                    o = e.apply(n, t);
                  return er(o) ? o : n;
                };
              }
              function Us(e) {
                return function (t, n, o) {
                  var i = Ie(t);
                  if (!$a(t)) {
                    var a = ui(n, 3);
                    (t = Nr(t)),
                      (n = function (e) {
                        return a(i[e], e, i);
                      });
                  }
                  var r = e(t, n, o);
                  return r > -1 ? i[a ? t[r] : r] : s;
                };
              }
              function Vs(e) {
                return si(function (t) {
                  var n = t.length,
                    o = n,
                    a = qn.prototype.thru;
                  for (e && t.reverse(); o--; ) {
                    var r = t[o];
                    if ("function" != typeof r) throw new Ne(i);
                    if (a && !l && "wrapper" == li(r)) var l = new qn([], !0);
                  }
                  for (o = l ? o : n; ++o < n; ) {
                    var c = li((r = t[o])),
                      u = "wrapper" == c ? ri(r) : s;
                    l =
                      u && xi(u[0]) && 424 == u[1] && !u[4].length && 1 == u[9]
                        ? l[li(u[0])].apply(l, u[3])
                        : 1 == r.length && xi(r)
                          ? l[c]()
                          : l.thru(r);
                  }
                  return function () {
                    var e = arguments,
                      o = e[0];
                    if (l && 1 == e.length && qa(o)) return l.plant(o).value();
                    for (var s = 0, i = n ? t[s].apply(this, e) : o; ++s < n; )
                      i = t[s].call(this, i);
                    return i;
                  };
                });
              }
              function Hs(e, t, n, i, a, r, l, c, u, m) {
                var d = t & p,
                  h = 1 & t,
                  f = 2 & t,
                  _ = 24 & t,
                  g = 512 & t,
                  v = f ? s : Fs(e);
                return function p() {
                  for (var y = arguments.length, b = o(y), E = y; E--; )
                    b[E] = arguments[E];
                  if (_)
                    var k = ci(p),
                      x = (function (e, t) {
                        for (var n = e.length, o = 0; n--; ) e[n] === t && ++o;
                        return o;
                      })(b, k);
                  if (
                    (i && (b = Os(b, i, a, _)),
                    r && (b = As(b, r, l, _)),
                    (y -= x),
                    _ && y < m)
                  ) {
                    var S = un(b, k);
                    return zs(e, t, Hs, p.placeholder, n, b, S, c, u, m - y);
                  }
                  var w = h ? n : this,
                    C = f ? w[e] : e;
                  return (
                    (y = b.length),
                    c
                      ? (b = (function (e, t) {
                          var n = e.length,
                            o = bn(t.length, n),
                            i = Ns(e);
                          for (; o--; ) {
                            var a = t[o];
                            e[o] = bi(a, n) ? i[a] : s;
                          }
                          return e;
                        })(b, c))
                      : g && y > 1 && b.reverse(),
                    d && u < y && (b.length = u),
                    this &&
                      this !== ft &&
                      this instanceof p &&
                      (C = v || Fs(C)),
                    C.apply(w, b)
                  );
                };
              }
              function Ws(e, t) {
                return function (n, o) {
                  return (function (e, t, n, o) {
                    return (
                      ko(e, function (e, s, i) {
                        t(o, n(e), s, i);
                      }),
                      o
                    );
                  })(n, e, t(o), {});
                };
              }
              function qs(e, t) {
                return function (n, o) {
                  var i;
                  if (n === s && o === s) return t;
                  if ((n !== s && (i = n), o !== s)) {
                    if (i === s) return o;
                    "string" == typeof n || "string" == typeof o
                      ? ((n = ps(n)), (o = ps(o)))
                      : ((n = us(n)), (o = us(o))),
                      (i = e(n, o));
                  }
                  return i;
                };
              }
              function Ks(e) {
                return si(function (t) {
                  return (
                    (t = Dt(t, Zt(ui()))),
                    Zo(function (n) {
                      var o = this;
                      return e(t, function (e) {
                        return Tt(e, o, n);
                      });
                    })
                  );
                });
              }
              function $s(e, t) {
                var n = (t = t === s ? " " : ps(t)).length;
                if (n < 2) return n ? Xo(t, e) : t;
                var o = Xo(t, _t(e / hn(t)));
                return rn(t) ? xs(fn(o), 0, e).join("") : o.slice(0, e);
              }
              function Gs(e) {
                return function (t, n, i) {
                  return (
                    i && "number" != typeof i && Ei(t, n, i) && (n = i = s),
                    (t = dr(t)),
                    n === s ? ((n = t), (t = 0)) : (n = dr(n)),
                    (function (e, t, n, s) {
                      for (
                        var i = -1, a = yn(_t((t - e) / (n || 1)), 0), r = o(a);
                        a--;

                      )
                        (r[s ? a : ++i] = e), (e += n);
                      return r;
                    })(t, n, (i = i === s ? (t < n ? 1 : -1) : dr(i)), e)
                  );
                };
              }
              function Ys(e) {
                return function (t, n) {
                  return (
                    ("string" == typeof t && "string" == typeof n) ||
                      ((t = _r(t)), (n = _r(n))),
                    e(t, n)
                  );
                };
              }
              function zs(e, t, n, o, i, a, r, l, p, m) {
                var d = 8 & t;
                (t |= d ? c : u), 4 & (t &= ~(d ? u : c)) || (t &= -4);
                var h = [
                    e,
                    t,
                    i,
                    d ? a : s,
                    d ? r : s,
                    d ? s : a,
                    d ? s : r,
                    l,
                    p,
                    m,
                  ],
                  f = n.apply(s, h);
                return xi(e) && Ai(f, h), (f.placeholder = o), Mi(f, e, t);
              }
              function Qs(e) {
                var t = Te[e];
                return function (e, n) {
                  if (((e = _r(e)), (n = null == n ? 0 : bn(hr(n), 292)))) {
                    var o = (vr(e) + "e").split("e");
                    return +(
                      (o = (vr(t(o[0] + "e" + (+o[1] + n))) + "e").split(
                        "e",
                      ))[0] +
                      "e" +
                      (+o[1] - n)
                    );
                  }
                  return t(e);
                };
              }
              var Xs =
                In && 1 / mn(new In([, -0]))[1] == d
                  ? function (e) {
                      return new In(e);
                    }
                  : ll;
              function Zs(e) {
                return function (t) {
                  var n = _i(t);
                  return n == w
                    ? ln(t)
                    : n == A
                      ? dn(t)
                      : (function (e, t) {
                          return Dt(t, function (t) {
                            return [t, e[t]];
                          });
                        })(t, e(t));
                };
              }
              function Js(e, t, n, a, d, h, f, _) {
                var g = 2 & t;
                if (!g && "function" != typeof e) throw new Ne(i);
                var v = a ? a.length : 0;
                if (
                  (v || ((t &= -97), (a = d = s)),
                  (f = f === s ? f : yn(hr(f), 0)),
                  (_ = _ === s ? _ : hr(_)),
                  (v -= d ? d.length : 0),
                  t & u)
                ) {
                  var y = a,
                    b = d;
                  a = d = s;
                }
                var E = g ? s : ri(e),
                  k = [e, t, n, a, d, y, b, h, f, _];
                if (
                  (E &&
                    (function (e, t) {
                      var n = e[1],
                        o = t[1],
                        s = n | o,
                        i = s < 131,
                        a =
                          (o == p && 8 == n) ||
                          (o == p && n == m && e[7].length <= t[8]) ||
                          (384 == o && t[7].length <= t[8] && 8 == n);
                      if (!i && !a) return e;
                      1 & o && ((e[2] = t[2]), (s |= 1 & n ? 0 : 4));
                      var l = t[3];
                      if (l) {
                        var c = e[3];
                        (e[3] = c ? Os(c, l, t[4]) : l),
                          (e[4] = c ? un(e[3], r) : t[4]);
                      }
                      (l = t[5]) &&
                        ((c = e[5]),
                        (e[5] = c ? As(c, l, t[6]) : l),
                        (e[6] = c ? un(e[5], r) : t[6]));
                      (l = t[7]) && (e[7] = l);
                      o & p && (e[8] = null == e[8] ? t[8] : bn(e[8], t[8]));
                      null == e[9] && (e[9] = t[9]);
                      (e[0] = t[0]), (e[1] = s);
                    })(k, E),
                  (e = k[0]),
                  (t = k[1]),
                  (n = k[2]),
                  (a = k[3]),
                  (d = k[4]),
                  !(_ = k[9] =
                    k[9] === s ? (g ? 0 : e.length) : yn(k[9] - v, 0)) &&
                    24 & t &&
                    (t &= -25),
                  t && 1 != t)
                )
                  x =
                    8 == t || t == l
                      ? (function (e, t, n) {
                          var i = Fs(e);
                          return function a() {
                            for (
                              var r = arguments.length,
                                l = o(r),
                                c = r,
                                u = ci(a);
                              c--;

                            )
                              l[c] = arguments[c];
                            var p =
                              r < 3 && l[0] !== u && l[r - 1] !== u
                                ? []
                                : un(l, u);
                            return (r -= p.length) < n
                              ? zs(
                                  e,
                                  t,
                                  Hs,
                                  a.placeholder,
                                  s,
                                  l,
                                  p,
                                  s,
                                  s,
                                  n - r,
                                )
                              : Tt(
                                  this && this !== ft && this instanceof a
                                    ? i
                                    : e,
                                  this,
                                  l,
                                );
                          };
                        })(e, t, _)
                      : (t != c && 33 != t) || d.length
                        ? Hs.apply(s, k)
                        : (function (e, t, n, s) {
                            var i = 1 & t,
                              a = Fs(e);
                            return function t() {
                              for (
                                var r = -1,
                                  l = arguments.length,
                                  c = -1,
                                  u = s.length,
                                  p = o(u + l),
                                  m =
                                    this && this !== ft && this instanceof t
                                      ? a
                                      : e;
                                ++c < u;

                              )
                                p[c] = s[c];
                              for (; l--; ) p[c++] = arguments[++r];
                              return Tt(m, i ? n : this, p);
                            };
                          })(e, t, n, a);
                else
                  var x = (function (e, t, n) {
                    var o = 1 & t,
                      s = Fs(e);
                    return function t() {
                      return (
                        this && this !== ft && this instanceof t ? s : e
                      ).apply(o ? n : this, arguments);
                    };
                  })(e, t, n);
                return Mi((E ? ns : Ai)(x, k), e, t);
              }
              function ei(e, t, n, o) {
                return e === s || (Ua(e, Pe[n]) && !je.call(o, n)) ? t : e;
              }
              function ti(e, t, n, o, i, a) {
                return (
                  er(e) &&
                    er(t) &&
                    (a.set(t, e), qo(e, t, s, ti, a), a.delete(t)),
                  e
                );
              }
              function ni(e) {
                return sr(e) ? s : e;
              }
              function oi(e, t, n, o, i, a) {
                var r = 1 & n,
                  l = e.length,
                  c = t.length;
                if (l != c && !(r && c > l)) return !1;
                var u = a.get(e);
                if (u && a.get(t)) return u == t;
                var p = -1,
                  m = !0,
                  d = 2 & n ? new zn() : s;
                for (a.set(e, t), a.set(t, e); ++p < l; ) {
                  var h = e[p],
                    f = t[p];
                  if (o) var _ = r ? o(f, h, p, t, e, a) : o(h, f, p, e, t, a);
                  if (_ !== s) {
                    if (_) continue;
                    m = !1;
                    break;
                  }
                  if (d) {
                    if (
                      !Ft(t, function (e, t) {
                        if (!en(d, t) && (h === e || i(h, e, n, o, a)))
                          return d.push(t);
                      })
                    ) {
                      m = !1;
                      break;
                    }
                  } else if (h !== f && !i(h, f, n, o, a)) {
                    m = !1;
                    break;
                  }
                }
                return a.delete(e), a.delete(t), m;
              }
              function si(e) {
                return Li(Ii(e, s, Ki), e + "");
              }
              function ii(e) {
                return Co(e, Nr, hi);
              }
              function ai(e) {
                return Co(e, Lr, fi);
              }
              var ri = Nn
                ? function (e) {
                    return Nn.get(e);
                  }
                : ll;
              function li(e) {
                for (
                  var t = e.name + "",
                    n = Ln[t],
                    o = je.call(Ln, t) ? n.length : 0;
                  o--;

                ) {
                  var s = n[o],
                    i = s.func;
                  if (null == i || i == e) return s.name;
                }
                return t;
              }
              function ci(e) {
                return (je.call(Vn, "placeholder") ? Vn : e).placeholder;
              }
              function ui() {
                var e = Vn.iteratee || sl;
                return (
                  (e = e === sl ? jo : e),
                  arguments.length ? e(arguments[0], arguments[1]) : e
                );
              }
              function pi(e, t) {
                var n,
                  o,
                  s = e.__data__;
                return (
                  "string" == (o = typeof (n = t)) ||
                  "number" == o ||
                  "symbol" == o ||
                  "boolean" == o
                    ? "__proto__" !== n
                    : null === n
                )
                  ? s["string" == typeof t ? "string" : "hash"]
                  : s.map;
              }
              function mi(e) {
                for (var t = Nr(e), n = t.length; n--; ) {
                  var o = t[n],
                    s = e[o];
                  t[n] = [o, s, Ci(s)];
                }
                return t;
              }
              function di(e, t) {
                var n = (function (e, t) {
                  return null == e ? s : e[t];
                })(e, t);
                return Ro(n) ? n : s;
              }
              var hi = yt
                  ? function (e) {
                      return null == e
                        ? []
                        : ((e = Ie(e)),
                          Lt(yt(e), function (t) {
                            return Qe.call(e, t);
                          }));
                    }
                  : fl,
                fi = yt
                  ? function (e) {
                      for (var t = []; e; ) Rt(t, hi(e)), (e = Ye(e));
                      return t;
                    }
                  : fl,
                _i = To;
              function gi(e, t, n) {
                for (var o = -1, s = (t = Es(t, e)).length, i = !1; ++o < s; ) {
                  var a = ji(t[o]);
                  if (!(i = null != e && n(e, a))) break;
                  e = e[a];
                }
                return i || ++o != s
                  ? i
                  : !!(s = null == e ? 0 : e.length) &&
                      Ja(s) &&
                      bi(a, s) &&
                      (qa(e) || Wa(e));
              }
              function vi(e) {
                return "function" != typeof e.constructor || wi(e)
                  ? {}
                  : Hn(Ye(e));
              }
              function yi(e) {
                return qa(e) || Wa(e) || !!(Ze && e && e[Ze]);
              }
              function bi(e, t) {
                var n = typeof e;
                return (
                  !!(t = null == t ? h : t) &&
                  ("number" == n || ("symbol" != n && be.test(e))) &&
                  e > -1 &&
                  e % 1 == 0 &&
                  e < t
                );
              }
              function Ei(e, t, n) {
                if (!er(n)) return !1;
                var o = typeof t;
                return (
                  !!("number" == o
                    ? $a(n) && bi(t, n.length)
                    : "string" == o && t in n) && Ua(n[t], e)
                );
              }
              function ki(e, t) {
                if (qa(e)) return !1;
                var n = typeof e;
                return (
                  !(
                    "number" != n &&
                    "symbol" != n &&
                    "boolean" != n &&
                    null != e &&
                    !lr(e)
                  ) ||
                  ne.test(e) ||
                  !te.test(e) ||
                  (null != t && e in Ie(t))
                );
              }
              function xi(e) {
                var t = li(e),
                  n = Vn[t];
                if ("function" != typeof n || !(t in Kn.prototype)) return !1;
                if (e === n) return !0;
                var o = ri(n);
                return !!o && e === o[0];
              }
              ((wn && _i(new wn(new ArrayBuffer(1))) != D) ||
                (Cn && _i(new Cn()) != w) ||
                (Tn && _i(Tn.resolve()) != I) ||
                (In && _i(new In()) != A) ||
                (On && _i(new On()) != M)) &&
                (_i = function (e) {
                  var t = To(e),
                    n = t == T ? e.constructor : s,
                    o = n ? Bi(n) : "";
                  if (o)
                    switch (o) {
                      case Mn:
                        return D;
                      case Pn:
                        return w;
                      case Dn:
                        return I;
                      case Rn:
                        return A;
                      case jn:
                        return M;
                    }
                  return t;
                });
              var Si = De ? Xa : _l;
              function wi(e) {
                var t = e && e.constructor;
                return e === (("function" == typeof t && t.prototype) || Pe);
              }
              function Ci(e) {
                return e == e && !er(e);
              }
              function Ti(e, t) {
                return function (n) {
                  return null != n && n[e] === t && (t !== s || e in Ie(n));
                };
              }
              function Ii(e, t, n) {
                return (
                  (t = yn(t === s ? e.length - 1 : t, 0)),
                  function () {
                    for (
                      var s = arguments,
                        i = -1,
                        a = yn(s.length - t, 0),
                        r = o(a);
                      ++i < a;

                    )
                      r[i] = s[t + i];
                    i = -1;
                    for (var l = o(t + 1); ++i < t; ) l[i] = s[i];
                    return (l[t] = n(r)), Tt(e, this, l);
                  }
                );
              }
              function Oi(e, t) {
                return t.length < 2 ? e : wo(e, is(t, 0, -1));
              }
              var Ai = Pi(ns),
                Ni =
                  ht ||
                  function (e, t) {
                    return ft.setTimeout(e, t);
                  },
                Li = Pi(os);
              function Mi(e, t, n) {
                var o = t + "";
                return Li(
                  e,
                  (function (e, t) {
                    var n = t.length;
                    if (!n) return e;
                    var o = n - 1;
                    return (
                      (t[o] = (n > 1 ? "& " : "") + t[o]),
                      (t = t.join(n > 2 ? ", " : " ")),
                      e.replace(ce, "{\n/* [wrapped with " + t + "] */\n")
                    );
                  })(
                    o,
                    (function (e, t) {
                      return (
                        Ot(g, function (n) {
                          var o = "_." + n[0];
                          t & n[1] && !Mt(e, o) && e.push(o);
                        }),
                        e.sort()
                      );
                    })(
                      (function (e) {
                        var t = e.match(ue);
                        return t ? t[1].split(pe) : [];
                      })(o),
                      n,
                    ),
                  ),
                );
              }
              function Pi(e) {
                var t = 0,
                  n = 0;
                return function () {
                  var o = En(),
                    i = 16 - (o - n);
                  if (((n = o), i > 0)) {
                    if (++t >= 800) return arguments[0];
                  } else t = 0;
                  return e.apply(s, arguments);
                };
              }
              function Di(e, t) {
                var n = -1,
                  o = e.length,
                  i = o - 1;
                for (t = t === s ? o : t; ++n < t; ) {
                  var a = Qo(n, i),
                    r = e[a];
                  (e[a] = e[n]), (e[n] = r);
                }
                return (e.length = t), e;
              }
              var Ri = (function (e) {
                var t = Pa(e, function (e) {
                    return 500 === n.size && n.clear(), e;
                  }),
                  n = t.cache;
                return t;
              })(function (e) {
                var t = [];
                return (
                  46 === e.charCodeAt(0) && t.push(""),
                  e.replace(oe, function (e, n, o, s) {
                    t.push(o ? s.replace(de, "$1") : n || e);
                  }),
                  t
                );
              });
              function ji(e) {
                if ("string" == typeof e || lr(e)) return e;
                var t = e + "";
                return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
              }
              function Bi(e) {
                if (null != e) {
                  try {
                    return Re.call(e);
                  } catch (e) {}
                  try {
                    return e + "";
                  } catch (e) {}
                }
                return "";
              }
              function Fi(e) {
                if (e instanceof Kn) return e.clone();
                var t = new qn(e.__wrapped__, e.__chain__);
                return (
                  (t.__actions__ = Ns(e.__actions__)),
                  (t.__index__ = e.__index__),
                  (t.__values__ = e.__values__),
                  t
                );
              }
              var Ui = Zo(function (e, t) {
                  return Ga(e) ? mo(e, yo(t, 1, Ga, !0)) : [];
                }),
                Vi = Zo(function (e, t) {
                  var n = Qi(t);
                  return (
                    Ga(n) && (n = s),
                    Ga(e) ? mo(e, yo(t, 1, Ga, !0), ui(n, 2)) : []
                  );
                }),
                Hi = Zo(function (e, t) {
                  var n = Qi(t);
                  return (
                    Ga(n) && (n = s), Ga(e) ? mo(e, yo(t, 1, Ga, !0), s, n) : []
                  );
                });
              function Wi(e, t, n) {
                var o = null == e ? 0 : e.length;
                if (!o) return -1;
                var s = null == n ? 0 : hr(n);
                return s < 0 && (s = yn(o + s, 0)), Ht(e, ui(t, 3), s);
              }
              function qi(e, t, n) {
                var o = null == e ? 0 : e.length;
                if (!o) return -1;
                var i = o - 1;
                return (
                  n !== s &&
                    ((i = hr(n)), (i = n < 0 ? yn(o + i, 0) : bn(i, o - 1))),
                  Ht(e, ui(t, 3), i, !0)
                );
              }
              function Ki(e) {
                return (null == e ? 0 : e.length) ? yo(e, 1) : [];
              }
              function $i(e) {
                return e && e.length ? e[0] : s;
              }
              var Gi = Zo(function (e) {
                  var t = Dt(e, ys);
                  return t.length && t[0] === e[0] ? No(t) : [];
                }),
                Yi = Zo(function (e) {
                  var t = Qi(e),
                    n = Dt(e, ys);
                  return (
                    t === Qi(n) ? (t = s) : n.pop(),
                    n.length && n[0] === e[0] ? No(n, ui(t, 2)) : []
                  );
                }),
                zi = Zo(function (e) {
                  var t = Qi(e),
                    n = Dt(e, ys);
                  return (
                    (t = "function" == typeof t ? t : s) && n.pop(),
                    n.length && n[0] === e[0] ? No(n, s, t) : []
                  );
                });
              function Qi(e) {
                var t = null == e ? 0 : e.length;
                return t ? e[t - 1] : s;
              }
              var Xi = Zo(Zi);
              function Zi(e, t) {
                return e && e.length && t && t.length ? Yo(e, t) : e;
              }
              var Ji = si(function (e, t) {
                var n = null == e ? 0 : e.length,
                  o = ro(e, t);
                return (
                  zo(
                    e,
                    Dt(t, function (e) {
                      return bi(e, n) ? +e : e;
                    }).sort(Is),
                  ),
                  o
                );
              });
              function ea(e) {
                return null == e ? e : Sn.call(e);
              }
              var ta = Zo(function (e) {
                  return ms(yo(e, 1, Ga, !0));
                }),
                na = Zo(function (e) {
                  var t = Qi(e);
                  return Ga(t) && (t = s), ms(yo(e, 1, Ga, !0), ui(t, 2));
                }),
                oa = Zo(function (e) {
                  var t = Qi(e);
                  return (
                    (t = "function" == typeof t ? t : s),
                    ms(yo(e, 1, Ga, !0), s, t)
                  );
                });
              function sa(e) {
                if (!e || !e.length) return [];
                var t = 0;
                return (
                  (e = Lt(e, function (e) {
                    if (Ga(e)) return (t = yn(e.length, t)), !0;
                  })),
                  Xt(t, function (t) {
                    return Dt(e, Gt(t));
                  })
                );
              }
              function ia(e, t) {
                if (!e || !e.length) return [];
                var n = sa(e);
                return null == t
                  ? n
                  : Dt(n, function (e) {
                      return Tt(t, s, e);
                    });
              }
              var aa = Zo(function (e, t) {
                  return Ga(e) ? mo(e, t) : [];
                }),
                ra = Zo(function (e) {
                  return gs(Lt(e, Ga));
                }),
                la = Zo(function (e) {
                  var t = Qi(e);
                  return Ga(t) && (t = s), gs(Lt(e, Ga), ui(t, 2));
                }),
                ca = Zo(function (e) {
                  var t = Qi(e);
                  return (
                    (t = "function" == typeof t ? t : s), gs(Lt(e, Ga), s, t)
                  );
                }),
                ua = Zo(sa);
              var pa = Zo(function (e) {
                var t = e.length,
                  n = t > 1 ? e[t - 1] : s;
                return (
                  (n = "function" == typeof n ? (e.pop(), n) : s), ia(e, n)
                );
              });
              function ma(e) {
                var t = Vn(e);
                return (t.__chain__ = !0), t;
              }
              function da(e, t) {
                return t(e);
              }
              var ha = si(function (e) {
                var t = e.length,
                  n = t ? e[0] : 0,
                  o = this.__wrapped__,
                  i = function (t) {
                    return ro(t, e);
                  };
                return !(t > 1 || this.__actions__.length) &&
                  o instanceof Kn &&
                  bi(n)
                  ? ((o = o.slice(n, +n + (t ? 1 : 0))).__actions__.push({
                      func: da,
                      args: [i],
                      thisArg: s,
                    }),
                    new qn(o, this.__chain__).thru(function (e) {
                      return t && !e.length && e.push(s), e;
                    }))
                  : this.thru(i);
              });
              var fa = Ms(function (e, t, n) {
                je.call(e, n) ? ++e[n] : ao(e, n, 1);
              });
              var _a = Us(Wi),
                ga = Us(qi);
              function va(e, t) {
                return (qa(e) ? Ot : ho)(e, ui(t, 3));
              }
              function ya(e, t) {
                return (qa(e) ? At : fo)(e, ui(t, 3));
              }
              var ba = Ms(function (e, t, n) {
                je.call(e, n) ? e[n].push(t) : ao(e, n, [t]);
              });
              var Ea = Zo(function (e, t, n) {
                  var s = -1,
                    i = "function" == typeof t,
                    a = $a(e) ? o(e.length) : [];
                  return (
                    ho(e, function (e) {
                      a[++s] = i ? Tt(t, e, n) : Lo(e, t, n);
                    }),
                    a
                  );
                }),
                ka = Ms(function (e, t, n) {
                  ao(e, n, t);
                });
              function xa(e, t) {
                return (qa(e) ? Dt : Vo)(e, ui(t, 3));
              }
              var Sa = Ms(
                function (e, t, n) {
                  e[n ? 0 : 1].push(t);
                },
                function () {
                  return [[], []];
                },
              );
              var wa = Zo(function (e, t) {
                  if (null == e) return [];
                  var n = t.length;
                  return (
                    n > 1 && Ei(e, t[0], t[1])
                      ? (t = [])
                      : n > 2 && Ei(t[0], t[1], t[2]) && (t = [t[0]]),
                    $o(e, yo(t, 1), [])
                  );
                }),
                Ca =
                  dt ||
                  function () {
                    return ft.Date.now();
                  };
              function Ta(e, t, n) {
                return (
                  (t = n ? s : t),
                  (t = e && null == t ? e.length : t),
                  Js(e, p, s, s, s, s, t)
                );
              }
              function Ia(e, t) {
                var n;
                if ("function" != typeof t) throw new Ne(i);
                return (
                  (e = hr(e)),
                  function () {
                    return (
                      --e > 0 && (n = t.apply(this, arguments)),
                      e <= 1 && (t = s),
                      n
                    );
                  }
                );
              }
              var Oa = Zo(function (e, t, n) {
                  var o = 1;
                  if (n.length) {
                    var s = un(n, ci(Oa));
                    o |= c;
                  }
                  return Js(e, o, t, n, s);
                }),
                Aa = Zo(function (e, t, n) {
                  var o = 3;
                  if (n.length) {
                    var s = un(n, ci(Aa));
                    o |= c;
                  }
                  return Js(t, o, e, n, s);
                });
              function Na(e, t, n) {
                var o,
                  a,
                  r,
                  l,
                  c,
                  u,
                  p = 0,
                  m = !1,
                  d = !1,
                  h = !0;
                if ("function" != typeof e) throw new Ne(i);
                function f(t) {
                  var n = o,
                    i = a;
                  return (o = a = s), (p = t), (l = e.apply(i, n));
                }
                function _(e) {
                  var n = e - u;
                  return u === s || n >= t || n < 0 || (d && e - p >= r);
                }
                function g() {
                  var e = Ca();
                  if (_(e)) return v(e);
                  c = Ni(
                    g,
                    (function (e) {
                      var n = t - (e - u);
                      return d ? bn(n, r - (e - p)) : n;
                    })(e),
                  );
                }
                function v(e) {
                  return (c = s), h && o ? f(e) : ((o = a = s), l);
                }
                function y() {
                  var e = Ca(),
                    n = _(e);
                  if (((o = arguments), (a = this), (u = e), n)) {
                    if (c === s)
                      return (function (e) {
                        return (p = e), (c = Ni(g, t)), m ? f(e) : l;
                      })(u);
                    if (d) return (c = Ni(g, t)), f(u);
                  }
                  return c === s && (c = Ni(g, t)), l;
                }
                return (
                  (t = _r(t) || 0),
                  er(n) &&
                    ((m = !!n.leading),
                    (r = (d = "maxWait" in n) ? yn(_r(n.maxWait) || 0, t) : r),
                    (h = "trailing" in n ? !!n.trailing : h)),
                  (y.cancel = function () {
                    c !== s && Ss(c), (p = 0), (o = u = a = c = s);
                  }),
                  (y.flush = function () {
                    return c === s ? l : v(Ca());
                  }),
                  y
                );
              }
              var La = Zo(function (e, t) {
                  return po(e, 1, t);
                }),
                Ma = Zo(function (e, t, n) {
                  return po(e, _r(t) || 0, n);
                });
              function Pa(e, t) {
                if (
                  "function" != typeof e ||
                  (null != t && "function" != typeof t)
                )
                  throw new Ne(i);
                var n = function () {
                  var o = arguments,
                    s = t ? t.apply(this, o) : o[0],
                    i = n.cache;
                  if (i.has(s)) return i.get(s);
                  var a = e.apply(this, o);
                  return (n.cache = i.set(s, a) || i), a;
                };
                return (n.cache = new (Pa.Cache || Yn)()), n;
              }
              function Da(e) {
                if ("function" != typeof e) throw new Ne(i);
                return function () {
                  var t = arguments;
                  switch (t.length) {
                    case 0:
                      return !e.call(this);
                    case 1:
                      return !e.call(this, t[0]);
                    case 2:
                      return !e.call(this, t[0], t[1]);
                    case 3:
                      return !e.call(this, t[0], t[1], t[2]);
                  }
                  return !e.apply(this, t);
                };
              }
              Pa.Cache = Yn;
              var Ra = ks(function (e, t) {
                  var n = (t =
                    1 == t.length && qa(t[0])
                      ? Dt(t[0], Zt(ui()))
                      : Dt(yo(t, 1), Zt(ui()))).length;
                  return Zo(function (o) {
                    for (var s = -1, i = bn(o.length, n); ++s < i; )
                      o[s] = t[s].call(this, o[s]);
                    return Tt(e, this, o);
                  });
                }),
                ja = Zo(function (e, t) {
                  var n = un(t, ci(ja));
                  return Js(e, c, s, t, n);
                }),
                Ba = Zo(function (e, t) {
                  var n = un(t, ci(Ba));
                  return Js(e, u, s, t, n);
                }),
                Fa = si(function (e, t) {
                  return Js(e, m, s, s, s, t);
                });
              function Ua(e, t) {
                return e === t || (e != e && t != t);
              }
              var Va = Ys(Io),
                Ha = Ys(function (e, t) {
                  return e >= t;
                }),
                Wa = Mo(
                  (function () {
                    return arguments;
                  })(),
                )
                  ? Mo
                  : function (e) {
                      return (
                        tr(e) && je.call(e, "callee") && !Qe.call(e, "callee")
                      );
                    },
                qa = o.isArray,
                Ka = Et
                  ? Zt(Et)
                  : function (e) {
                      return tr(e) && To(e) == P;
                    };
              function $a(e) {
                return null != e && Ja(e.length) && !Xa(e);
              }
              function Ga(e) {
                return tr(e) && $a(e);
              }
              var Ya = bt || _l,
                za = kt
                  ? Zt(kt)
                  : function (e) {
                      return tr(e) && To(e) == E;
                    };
              function Qa(e) {
                if (!tr(e)) return !1;
                var t = To(e);
                return (
                  t == k ||
                  "[object DOMException]" == t ||
                  ("string" == typeof e.message &&
                    "string" == typeof e.name &&
                    !sr(e))
                );
              }
              function Xa(e) {
                if (!er(e)) return !1;
                var t = To(e);
                return (
                  t == x ||
                  t == S ||
                  "[object AsyncFunction]" == t ||
                  "[object Proxy]" == t
                );
              }
              function Za(e) {
                return "number" == typeof e && e == hr(e);
              }
              function Ja(e) {
                return "number" == typeof e && e > -1 && e % 1 == 0 && e <= h;
              }
              function er(e) {
                var t = typeof e;
                return null != e && ("object" == t || "function" == t);
              }
              function tr(e) {
                return null != e && "object" == typeof e;
              }
              var nr = xt
                ? Zt(xt)
                : function (e) {
                    return tr(e) && _i(e) == w;
                  };
              function or(e) {
                return "number" == typeof e || (tr(e) && To(e) == C);
              }
              function sr(e) {
                if (!tr(e) || To(e) != T) return !1;
                var t = Ye(e);
                if (null === t) return !0;
                var n = je.call(t, "constructor") && t.constructor;
                return (
                  "function" == typeof n && n instanceof n && Re.call(n) == Ve
                );
              }
              var ir = St
                ? Zt(St)
                : function (e) {
                    return tr(e) && To(e) == O;
                  };
              var ar = wt
                ? Zt(wt)
                : function (e) {
                    return tr(e) && _i(e) == A;
                  };
              function rr(e) {
                return "string" == typeof e || (!qa(e) && tr(e) && To(e) == N);
              }
              function lr(e) {
                return "symbol" == typeof e || (tr(e) && To(e) == L);
              }
              var cr = Ct
                ? Zt(Ct)
                : function (e) {
                    return tr(e) && Ja(e.length) && !!lt[To(e)];
                  };
              var ur = Ys(Uo),
                pr = Ys(function (e, t) {
                  return e <= t;
                });
              function mr(e) {
                if (!e) return [];
                if ($a(e)) return rr(e) ? fn(e) : Ns(e);
                if (Je && e[Je])
                  return (function (e) {
                    for (var t, n = []; !(t = e.next()).done; ) n.push(t.value);
                    return n;
                  })(e[Je]());
                var t = _i(e);
                return (t == w ? ln : t == A ? mn : Ur)(e);
              }
              function dr(e) {
                return e
                  ? (e = _r(e)) === d || e === -1 / 0
                    ? 17976931348623157e292 * (e < 0 ? -1 : 1)
                    : e == e
                      ? e
                      : 0
                  : 0 === e
                    ? e
                    : 0;
              }
              function hr(e) {
                var t = dr(e),
                  n = t % 1;
                return t == t ? (n ? t - n : t) : 0;
              }
              function fr(e) {
                return e ? lo(hr(e), 0, _) : 0;
              }
              function _r(e) {
                if ("number" == typeof e) return e;
                if (lr(e)) return f;
                if (er(e)) {
                  var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                  e = er(t) ? t + "" : t;
                }
                if ("string" != typeof e) return 0 === e ? e : +e;
                e = e.replace(ae, "");
                var n = ge.test(e);
                return n || ye.test(e)
                  ? mt(e.slice(2), n ? 2 : 8)
                  : _e.test(e)
                    ? f
                    : +e;
              }
              function gr(e) {
                return Ls(e, Lr(e));
              }
              function vr(e) {
                return null == e ? "" : ps(e);
              }
              var yr = Ps(function (e, t) {
                  if (wi(t) || $a(t)) Ls(t, Nr(t), e);
                  else for (var n in t) je.call(t, n) && no(e, n, t[n]);
                }),
                br = Ps(function (e, t) {
                  Ls(t, Lr(t), e);
                }),
                Er = Ps(function (e, t, n, o) {
                  Ls(t, Lr(t), e, o);
                }),
                kr = Ps(function (e, t, n, o) {
                  Ls(t, Nr(t), e, o);
                }),
                xr = si(ro);
              var Sr = Zo(function (e, t) {
                  e = Ie(e);
                  var n = -1,
                    o = t.length,
                    i = o > 2 ? t[2] : s;
                  for (i && Ei(t[0], t[1], i) && (o = 1); ++n < o; )
                    for (
                      var a = t[n], r = Lr(a), l = -1, c = r.length;
                      ++l < c;

                    ) {
                      var u = r[l],
                        p = e[u];
                      (p === s || (Ua(p, Pe[u]) && !je.call(e, u))) &&
                        (e[u] = a[u]);
                    }
                  return e;
                }),
                wr = Zo(function (e) {
                  return e.push(s, ti), Tt(Pr, s, e);
                });
              function Cr(e, t, n) {
                var o = null == e ? s : wo(e, t);
                return o === s ? n : o;
              }
              function Tr(e, t) {
                return null != e && gi(e, t, Ao);
              }
              var Ir = Ws(function (e, t, n) {
                  null != t &&
                    "function" != typeof t.toString &&
                    (t = Ue.call(t)),
                    (e[t] = n);
                }, el(ol)),
                Or = Ws(function (e, t, n) {
                  null != t &&
                    "function" != typeof t.toString &&
                    (t = Ue.call(t)),
                    je.call(e, t) ? e[t].push(n) : (e[t] = [n]);
                }, ui),
                Ar = Zo(Lo);
              function Nr(e) {
                return $a(e) ? Xn(e) : Bo(e);
              }
              function Lr(e) {
                return $a(e) ? Xn(e, !0) : Fo(e);
              }
              var Mr = Ps(function (e, t, n) {
                  qo(e, t, n);
                }),
                Pr = Ps(function (e, t, n, o) {
                  qo(e, t, n, o);
                }),
                Dr = si(function (e, t) {
                  var n = {};
                  if (null == e) return n;
                  var o = !1;
                  (t = Dt(t, function (t) {
                    return (t = Es(t, e)), o || (o = t.length > 1), t;
                  })),
                    Ls(e, ai(e), n),
                    o && (n = co(n, 7, ni));
                  for (var s = t.length; s--; ) ds(n, t[s]);
                  return n;
                });
              var Rr = si(function (e, t) {
                return null == e
                  ? {}
                  : (function (e, t) {
                      return Go(e, t, function (t, n) {
                        return Tr(e, n);
                      });
                    })(e, t);
              });
              function jr(e, t) {
                if (null == e) return {};
                var n = Dt(ai(e), function (e) {
                  return [e];
                });
                return (
                  (t = ui(t)),
                  Go(e, n, function (e, n) {
                    return t(e, n[0]);
                  })
                );
              }
              var Br = Zs(Nr),
                Fr = Zs(Lr);
              function Ur(e) {
                return null == e ? [] : Jt(e, Nr(e));
              }
              var Vr = Bs(function (e, t, n) {
                return (t = t.toLowerCase()), e + (n ? Hr(t) : t);
              });
              function Hr(e) {
                return Qr(vr(e).toLowerCase());
              }
              function Wr(e) {
                return (e = vr(e)) && e.replace(Ee, on).replace(tt, "");
              }
              var qr = Bs(function (e, t, n) {
                  return e + (n ? "-" : "") + t.toLowerCase();
                }),
                Kr = Bs(function (e, t, n) {
                  return e + (n ? " " : "") + t.toLowerCase();
                }),
                $r = js("toLowerCase");
              var Gr = Bs(function (e, t, n) {
                return e + (n ? "_" : "") + t.toLowerCase();
              });
              var Yr = Bs(function (e, t, n) {
                return e + (n ? " " : "") + Qr(t);
              });
              var zr = Bs(function (e, t, n) {
                  return e + (n ? " " : "") + t.toUpperCase();
                }),
                Qr = js("toUpperCase");
              function Xr(e, t, n) {
                return (
                  (e = vr(e)),
                  (t = n ? s : t) === s
                    ? (function (e) {
                        return it.test(e);
                      })(e)
                      ? (function (e) {
                          return e.match(ot) || [];
                        })(e)
                      : (function (e) {
                          return e.match(me) || [];
                        })(e)
                    : e.match(t) || []
                );
              }
              var Zr = Zo(function (e, t) {
                  try {
                    return Tt(e, s, t);
                  } catch (e) {
                    return Qa(e) ? e : new we(e);
                  }
                }),
                Jr = si(function (e, t) {
                  return (
                    Ot(t, function (t) {
                      (t = ji(t)), ao(e, t, Oa(e[t], e));
                    }),
                    e
                  );
                });
              function el(e) {
                return function () {
                  return e;
                };
              }
              var tl = Vs(),
                nl = Vs(!0);
              function ol(e) {
                return e;
              }
              function sl(e) {
                return jo("function" == typeof e ? e : co(e, 1));
              }
              var il = Zo(function (e, t) {
                  return function (n) {
                    return Lo(n, e, t);
                  };
                }),
                al = Zo(function (e, t) {
                  return function (n) {
                    return Lo(e, n, t);
                  };
                });
              function rl(e, t, n) {
                var o = Nr(t),
                  s = So(t, o);
                null != n ||
                  (er(t) && (s.length || !o.length)) ||
                  ((n = t), (t = e), (e = this), (s = So(t, Nr(t))));
                var i = !(er(n) && "chain" in n && !n.chain),
                  a = Xa(e);
                return (
                  Ot(s, function (n) {
                    var o = t[n];
                    (e[n] = o),
                      a &&
                        (e.prototype[n] = function () {
                          var t = this.__chain__;
                          if (i || t) {
                            var n = e(this.__wrapped__);
                            return (
                              (n.__actions__ = Ns(this.__actions__)).push({
                                func: o,
                                args: arguments,
                                thisArg: e,
                              }),
                              (n.__chain__ = t),
                              n
                            );
                          }
                          return o.apply(e, Rt([this.value()], arguments));
                        });
                  }),
                  e
                );
              }
              function ll() {}
              var cl = Ks(Dt),
                ul = Ks(Nt),
                pl = Ks(Ft);
              function ml(e) {
                return ki(e)
                  ? Gt(ji(e))
                  : (function (e) {
                      return function (t) {
                        return wo(t, e);
                      };
                    })(e);
              }
              var dl = Gs(),
                hl = Gs(!0);
              function fl() {
                return [];
              }
              function _l() {
                return !1;
              }
              var gl = qs(function (e, t) {
                  return e + t;
                }, 0),
                vl = Qs("ceil"),
                yl = qs(function (e, t) {
                  return e / t;
                }, 1),
                bl = Qs("floor");
              var El,
                kl = qs(function (e, t) {
                  return e * t;
                }, 1),
                xl = Qs("round"),
                Sl = qs(function (e, t) {
                  return e - t;
                }, 0);
              return (
                (Vn.after = function (e, t) {
                  if ("function" != typeof t) throw new Ne(i);
                  return (
                    (e = hr(e)),
                    function () {
                      if (--e < 1) return t.apply(this, arguments);
                    }
                  );
                }),
                (Vn.ary = Ta),
                (Vn.assign = yr),
                (Vn.assignIn = br),
                (Vn.assignInWith = Er),
                (Vn.assignWith = kr),
                (Vn.at = xr),
                (Vn.before = Ia),
                (Vn.bind = Oa),
                (Vn.bindAll = Jr),
                (Vn.bindKey = Aa),
                (Vn.castArray = function () {
                  if (!arguments.length) return [];
                  var e = arguments[0];
                  return qa(e) ? e : [e];
                }),
                (Vn.chain = ma),
                (Vn.chunk = function (e, t, n) {
                  t = (n ? Ei(e, t, n) : t === s) ? 1 : yn(hr(t), 0);
                  var i = null == e ? 0 : e.length;
                  if (!i || t < 1) return [];
                  for (var a = 0, r = 0, l = o(_t(i / t)); a < i; )
                    l[r++] = is(e, a, (a += t));
                  return l;
                }),
                (Vn.compact = function (e) {
                  for (
                    var t = -1, n = null == e ? 0 : e.length, o = 0, s = [];
                    ++t < n;

                  ) {
                    var i = e[t];
                    i && (s[o++] = i);
                  }
                  return s;
                }),
                (Vn.concat = function () {
                  var e = arguments.length;
                  if (!e) return [];
                  for (var t = o(e - 1), n = arguments[0], s = e; s--; )
                    t[s - 1] = arguments[s];
                  return Rt(qa(n) ? Ns(n) : [n], yo(t, 1));
                }),
                (Vn.cond = function (e) {
                  var t = null == e ? 0 : e.length,
                    n = ui();
                  return (
                    (e = t
                      ? Dt(e, function (e) {
                          if ("function" != typeof e[1]) throw new Ne(i);
                          return [n(e[0]), e[1]];
                        })
                      : []),
                    Zo(function (n) {
                      for (var o = -1; ++o < t; ) {
                        var s = e[o];
                        if (Tt(s[0], this, n)) return Tt(s[1], this, n);
                      }
                    })
                  );
                }),
                (Vn.conforms = function (e) {
                  return (function (e) {
                    var t = Nr(e);
                    return function (n) {
                      return uo(n, e, t);
                    };
                  })(co(e, 1));
                }),
                (Vn.constant = el),
                (Vn.countBy = fa),
                (Vn.create = function (e, t) {
                  var n = Hn(e);
                  return null == t ? n : io(n, t);
                }),
                (Vn.curry = function e(t, n, o) {
                  var i = Js(t, 8, s, s, s, s, s, (n = o ? s : n));
                  return (i.placeholder = e.placeholder), i;
                }),
                (Vn.curryRight = function e(t, n, o) {
                  var i = Js(t, l, s, s, s, s, s, (n = o ? s : n));
                  return (i.placeholder = e.placeholder), i;
                }),
                (Vn.debounce = Na),
                (Vn.defaults = Sr),
                (Vn.defaultsDeep = wr),
                (Vn.defer = La),
                (Vn.delay = Ma),
                (Vn.difference = Ui),
                (Vn.differenceBy = Vi),
                (Vn.differenceWith = Hi),
                (Vn.drop = function (e, t, n) {
                  var o = null == e ? 0 : e.length;
                  return o
                    ? is(e, (t = n || t === s ? 1 : hr(t)) < 0 ? 0 : t, o)
                    : [];
                }),
                (Vn.dropRight = function (e, t, n) {
                  var o = null == e ? 0 : e.length;
                  return o
                    ? is(
                        e,
                        0,
                        (t = o - (t = n || t === s ? 1 : hr(t))) < 0 ? 0 : t,
                      )
                    : [];
                }),
                (Vn.dropRightWhile = function (e, t) {
                  return e && e.length ? fs(e, ui(t, 3), !0, !0) : [];
                }),
                (Vn.dropWhile = function (e, t) {
                  return e && e.length ? fs(e, ui(t, 3), !0) : [];
                }),
                (Vn.fill = function (e, t, n, o) {
                  var i = null == e ? 0 : e.length;
                  return i
                    ? (n &&
                        "number" != typeof n &&
                        Ei(e, t, n) &&
                        ((n = 0), (o = i)),
                      (function (e, t, n, o) {
                        var i = e.length;
                        for (
                          (n = hr(n)) < 0 && (n = -n > i ? 0 : i + n),
                            (o = o === s || o > i ? i : hr(o)) < 0 && (o += i),
                            o = n > o ? 0 : fr(o);
                          n < o;

                        )
                          e[n++] = t;
                        return e;
                      })(e, t, n, o))
                    : [];
                }),
                (Vn.filter = function (e, t) {
                  return (qa(e) ? Lt : vo)(e, ui(t, 3));
                }),
                (Vn.flatMap = function (e, t) {
                  return yo(xa(e, t), 1);
                }),
                (Vn.flatMapDeep = function (e, t) {
                  return yo(xa(e, t), d);
                }),
                (Vn.flatMapDepth = function (e, t, n) {
                  return (n = n === s ? 1 : hr(n)), yo(xa(e, t), n);
                }),
                (Vn.flatten = Ki),
                (Vn.flattenDeep = function (e) {
                  return (null == e ? 0 : e.length) ? yo(e, d) : [];
                }),
                (Vn.flattenDepth = function (e, t) {
                  return (null == e ? 0 : e.length)
                    ? yo(e, (t = t === s ? 1 : hr(t)))
                    : [];
                }),
                (Vn.flip = function (e) {
                  return Js(e, 512);
                }),
                (Vn.flow = tl),
                (Vn.flowRight = nl),
                (Vn.fromPairs = function (e) {
                  for (
                    var t = -1, n = null == e ? 0 : e.length, o = {};
                    ++t < n;

                  ) {
                    var s = e[t];
                    o[s[0]] = s[1];
                  }
                  return o;
                }),
                (Vn.functions = function (e) {
                  return null == e ? [] : So(e, Nr(e));
                }),
                (Vn.functionsIn = function (e) {
                  return null == e ? [] : So(e, Lr(e));
                }),
                (Vn.groupBy = ba),
                (Vn.initial = function (e) {
                  return (null == e ? 0 : e.length) ? is(e, 0, -1) : [];
                }),
                (Vn.intersection = Gi),
                (Vn.intersectionBy = Yi),
                (Vn.intersectionWith = zi),
                (Vn.invert = Ir),
                (Vn.invertBy = Or),
                (Vn.invokeMap = Ea),
                (Vn.iteratee = sl),
                (Vn.keyBy = ka),
                (Vn.keys = Nr),
                (Vn.keysIn = Lr),
                (Vn.map = xa),
                (Vn.mapKeys = function (e, t) {
                  var n = {};
                  return (
                    (t = ui(t, 3)),
                    ko(e, function (e, o, s) {
                      ao(n, t(e, o, s), e);
                    }),
                    n
                  );
                }),
                (Vn.mapValues = function (e, t) {
                  var n = {};
                  return (
                    (t = ui(t, 3)),
                    ko(e, function (e, o, s) {
                      ao(n, o, t(e, o, s));
                    }),
                    n
                  );
                }),
                (Vn.matches = function (e) {
                  return Ho(co(e, 1));
                }),
                (Vn.matchesProperty = function (e, t) {
                  return Wo(e, co(t, 1));
                }),
                (Vn.memoize = Pa),
                (Vn.merge = Mr),
                (Vn.mergeWith = Pr),
                (Vn.method = il),
                (Vn.methodOf = al),
                (Vn.mixin = rl),
                (Vn.negate = Da),
                (Vn.nthArg = function (e) {
                  return (
                    (e = hr(e)),
                    Zo(function (t) {
                      return Ko(t, e);
                    })
                  );
                }),
                (Vn.omit = Dr),
                (Vn.omitBy = function (e, t) {
                  return jr(e, Da(ui(t)));
                }),
                (Vn.once = function (e) {
                  return Ia(2, e);
                }),
                (Vn.orderBy = function (e, t, n, o) {
                  return null == e
                    ? []
                    : (qa(t) || (t = null == t ? [] : [t]),
                      qa((n = o ? s : n)) || (n = null == n ? [] : [n]),
                      $o(e, t, n));
                }),
                (Vn.over = cl),
                (Vn.overArgs = Ra),
                (Vn.overEvery = ul),
                (Vn.overSome = pl),
                (Vn.partial = ja),
                (Vn.partialRight = Ba),
                (Vn.partition = Sa),
                (Vn.pick = Rr),
                (Vn.pickBy = jr),
                (Vn.property = ml),
                (Vn.propertyOf = function (e) {
                  return function (t) {
                    return null == e ? s : wo(e, t);
                  };
                }),
                (Vn.pull = Xi),
                (Vn.pullAll = Zi),
                (Vn.pullAllBy = function (e, t, n) {
                  return e && e.length && t && t.length
                    ? Yo(e, t, ui(n, 2))
                    : e;
                }),
                (Vn.pullAllWith = function (e, t, n) {
                  return e && e.length && t && t.length ? Yo(e, t, s, n) : e;
                }),
                (Vn.pullAt = Ji),
                (Vn.range = dl),
                (Vn.rangeRight = hl),
                (Vn.rearg = Fa),
                (Vn.reject = function (e, t) {
                  return (qa(e) ? Lt : vo)(e, Da(ui(t, 3)));
                }),
                (Vn.remove = function (e, t) {
                  var n = [];
                  if (!e || !e.length) return n;
                  var o = -1,
                    s = [],
                    i = e.length;
                  for (t = ui(t, 3); ++o < i; ) {
                    var a = e[o];
                    t(a, o, e) && (n.push(a), s.push(o));
                  }
                  return zo(e, s), n;
                }),
                (Vn.rest = function (e, t) {
                  if ("function" != typeof e) throw new Ne(i);
                  return Zo(e, (t = t === s ? t : hr(t)));
                }),
                (Vn.reverse = ea),
                (Vn.sampleSize = function (e, t, n) {
                  return (
                    (t = (n ? Ei(e, t, n) : t === s) ? 1 : hr(t)),
                    (qa(e) ? Jn : es)(e, t)
                  );
                }),
                (Vn.set = function (e, t, n) {
                  return null == e ? e : ts(e, t, n);
                }),
                (Vn.setWith = function (e, t, n, o) {
                  return (
                    (o = "function" == typeof o ? o : s),
                    null == e ? e : ts(e, t, n, o)
                  );
                }),
                (Vn.shuffle = function (e) {
                  return (qa(e) ? eo : ss)(e);
                }),
                (Vn.slice = function (e, t, n) {
                  var o = null == e ? 0 : e.length;
                  return o
                    ? (n && "number" != typeof n && Ei(e, t, n)
                        ? ((t = 0), (n = o))
                        : ((t = null == t ? 0 : hr(t)),
                          (n = n === s ? o : hr(n))),
                      is(e, t, n))
                    : [];
                }),
                (Vn.sortBy = wa),
                (Vn.sortedUniq = function (e) {
                  return e && e.length ? cs(e) : [];
                }),
                (Vn.sortedUniqBy = function (e, t) {
                  return e && e.length ? cs(e, ui(t, 2)) : [];
                }),
                (Vn.split = function (e, t, n) {
                  return (
                    n && "number" != typeof n && Ei(e, t, n) && (t = n = s),
                    (n = n === s ? _ : n >>> 0)
                      ? (e = vr(e)) &&
                        ("string" == typeof t || (null != t && !ir(t))) &&
                        !(t = ps(t)) &&
                        rn(e)
                        ? xs(fn(e), 0, n)
                        : e.split(t, n)
                      : []
                  );
                }),
                (Vn.spread = function (e, t) {
                  if ("function" != typeof e) throw new Ne(i);
                  return (
                    (t = null == t ? 0 : yn(hr(t), 0)),
                    Zo(function (n) {
                      var o = n[t],
                        s = xs(n, 0, t);
                      return o && Rt(s, o), Tt(e, this, s);
                    })
                  );
                }),
                (Vn.tail = function (e) {
                  var t = null == e ? 0 : e.length;
                  return t ? is(e, 1, t) : [];
                }),
                (Vn.take = function (e, t, n) {
                  return e && e.length
                    ? is(e, 0, (t = n || t === s ? 1 : hr(t)) < 0 ? 0 : t)
                    : [];
                }),
                (Vn.takeRight = function (e, t, n) {
                  var o = null == e ? 0 : e.length;
                  return o
                    ? is(
                        e,
                        (t = o - (t = n || t === s ? 1 : hr(t))) < 0 ? 0 : t,
                        o,
                      )
                    : [];
                }),
                (Vn.takeRightWhile = function (e, t) {
                  return e && e.length ? fs(e, ui(t, 3), !1, !0) : [];
                }),
                (Vn.takeWhile = function (e, t) {
                  return e && e.length ? fs(e, ui(t, 3)) : [];
                }),
                (Vn.tap = function (e, t) {
                  return t(e), e;
                }),
                (Vn.throttle = function (e, t, n) {
                  var o = !0,
                    s = !0;
                  if ("function" != typeof e) throw new Ne(i);
                  return (
                    er(n) &&
                      ((o = "leading" in n ? !!n.leading : o),
                      (s = "trailing" in n ? !!n.trailing : s)),
                    Na(e, t, { leading: o, maxWait: t, trailing: s })
                  );
                }),
                (Vn.thru = da),
                (Vn.toArray = mr),
                (Vn.toPairs = Br),
                (Vn.toPairsIn = Fr),
                (Vn.toPath = function (e) {
                  return qa(e) ? Dt(e, ji) : lr(e) ? [e] : Ns(Ri(vr(e)));
                }),
                (Vn.toPlainObject = gr),
                (Vn.transform = function (e, t, n) {
                  var o = qa(e),
                    s = o || Ya(e) || cr(e);
                  if (((t = ui(t, 4)), null == n)) {
                    var i = e && e.constructor;
                    n = s
                      ? o
                        ? new i()
                        : []
                      : er(e) && Xa(i)
                        ? Hn(Ye(e))
                        : {};
                  }
                  return (
                    (s ? Ot : ko)(e, function (e, o, s) {
                      return t(n, e, o, s);
                    }),
                    n
                  );
                }),
                (Vn.unary = function (e) {
                  return Ta(e, 1);
                }),
                (Vn.union = ta),
                (Vn.unionBy = na),
                (Vn.unionWith = oa),
                (Vn.uniq = function (e) {
                  return e && e.length ? ms(e) : [];
                }),
                (Vn.uniqBy = function (e, t) {
                  return e && e.length ? ms(e, ui(t, 2)) : [];
                }),
                (Vn.uniqWith = function (e, t) {
                  return (
                    (t = "function" == typeof t ? t : s),
                    e && e.length ? ms(e, s, t) : []
                  );
                }),
                (Vn.unset = function (e, t) {
                  return null == e || ds(e, t);
                }),
                (Vn.unzip = sa),
                (Vn.unzipWith = ia),
                (Vn.update = function (e, t, n) {
                  return null == e ? e : hs(e, t, bs(n));
                }),
                (Vn.updateWith = function (e, t, n, o) {
                  return (
                    (o = "function" == typeof o ? o : s),
                    null == e ? e : hs(e, t, bs(n), o)
                  );
                }),
                (Vn.values = Ur),
                (Vn.valuesIn = function (e) {
                  return null == e ? [] : Jt(e, Lr(e));
                }),
                (Vn.without = aa),
                (Vn.words = Xr),
                (Vn.wrap = function (e, t) {
                  return ja(bs(t), e);
                }),
                (Vn.xor = ra),
                (Vn.xorBy = la),
                (Vn.xorWith = ca),
                (Vn.zip = ua),
                (Vn.zipObject = function (e, t) {
                  return vs(e || [], t || [], no);
                }),
                (Vn.zipObjectDeep = function (e, t) {
                  return vs(e || [], t || [], ts);
                }),
                (Vn.zipWith = pa),
                (Vn.entries = Br),
                (Vn.entriesIn = Fr),
                (Vn.extend = br),
                (Vn.extendWith = Er),
                rl(Vn, Vn),
                (Vn.add = gl),
                (Vn.attempt = Zr),
                (Vn.camelCase = Vr),
                (Vn.capitalize = Hr),
                (Vn.ceil = vl),
                (Vn.clamp = function (e, t, n) {
                  return (
                    n === s && ((n = t), (t = s)),
                    n !== s && (n = (n = _r(n)) == n ? n : 0),
                    t !== s && (t = (t = _r(t)) == t ? t : 0),
                    lo(_r(e), t, n)
                  );
                }),
                (Vn.clone = function (e) {
                  return co(e, 4);
                }),
                (Vn.cloneDeep = function (e) {
                  return co(e, 5);
                }),
                (Vn.cloneDeepWith = function (e, t) {
                  return co(e, 5, (t = "function" == typeof t ? t : s));
                }),
                (Vn.cloneWith = function (e, t) {
                  return co(e, 4, (t = "function" == typeof t ? t : s));
                }),
                (Vn.conformsTo = function (e, t) {
                  return null == t || uo(e, t, Nr(t));
                }),
                (Vn.deburr = Wr),
                (Vn.defaultTo = function (e, t) {
                  return null == e || e != e ? t : e;
                }),
                (Vn.divide = yl),
                (Vn.endsWith = function (e, t, n) {
                  (e = vr(e)), (t = ps(t));
                  var o = e.length,
                    i = (n = n === s ? o : lo(hr(n), 0, o));
                  return (n -= t.length) >= 0 && e.slice(n, i) == t;
                }),
                (Vn.eq = Ua),
                (Vn.escape = function (e) {
                  return (e = vr(e)) && X.test(e) ? e.replace(z, sn) : e;
                }),
                (Vn.escapeRegExp = function (e) {
                  return (e = vr(e)) && ie.test(e) ? e.replace(se, "\\$&") : e;
                }),
                (Vn.every = function (e, t, n) {
                  var o = qa(e) ? Nt : _o;
                  return n && Ei(e, t, n) && (t = s), o(e, ui(t, 3));
                }),
                (Vn.find = _a),
                (Vn.findIndex = Wi),
                (Vn.findKey = function (e, t) {
                  return Vt(e, ui(t, 3), ko);
                }),
                (Vn.findLast = ga),
                (Vn.findLastIndex = qi),
                (Vn.findLastKey = function (e, t) {
                  return Vt(e, ui(t, 3), xo);
                }),
                (Vn.floor = bl),
                (Vn.forEach = va),
                (Vn.forEachRight = ya),
                (Vn.forIn = function (e, t) {
                  return null == e ? e : bo(e, ui(t, 3), Lr);
                }),
                (Vn.forInRight = function (e, t) {
                  return null == e ? e : Eo(e, ui(t, 3), Lr);
                }),
                (Vn.forOwn = function (e, t) {
                  return e && ko(e, ui(t, 3));
                }),
                (Vn.forOwnRight = function (e, t) {
                  return e && xo(e, ui(t, 3));
                }),
                (Vn.get = Cr),
                (Vn.gt = Va),
                (Vn.gte = Ha),
                (Vn.has = function (e, t) {
                  return null != e && gi(e, t, Oo);
                }),
                (Vn.hasIn = Tr),
                (Vn.head = $i),
                (Vn.identity = ol),
                (Vn.includes = function (e, t, n, o) {
                  (e = $a(e) ? e : Ur(e)), (n = n && !o ? hr(n) : 0);
                  var s = e.length;
                  return (
                    n < 0 && (n = yn(s + n, 0)),
                    rr(e)
                      ? n <= s && e.indexOf(t, n) > -1
                      : !!s && Wt(e, t, n) > -1
                  );
                }),
                (Vn.indexOf = function (e, t, n) {
                  var o = null == e ? 0 : e.length;
                  if (!o) return -1;
                  var s = null == n ? 0 : hr(n);
                  return s < 0 && (s = yn(o + s, 0)), Wt(e, t, s);
                }),
                (Vn.inRange = function (e, t, n) {
                  return (
                    (t = dr(t)),
                    n === s ? ((n = t), (t = 0)) : (n = dr(n)),
                    (function (e, t, n) {
                      return e >= bn(t, n) && e < yn(t, n);
                    })((e = _r(e)), t, n)
                  );
                }),
                (Vn.invoke = Ar),
                (Vn.isArguments = Wa),
                (Vn.isArray = qa),
                (Vn.isArrayBuffer = Ka),
                (Vn.isArrayLike = $a),
                (Vn.isArrayLikeObject = Ga),
                (Vn.isBoolean = function (e) {
                  return !0 === e || !1 === e || (tr(e) && To(e) == b);
                }),
                (Vn.isBuffer = Ya),
                (Vn.isDate = za),
                (Vn.isElement = function (e) {
                  return tr(e) && 1 === e.nodeType && !sr(e);
                }),
                (Vn.isEmpty = function (e) {
                  if (null == e) return !0;
                  if (
                    $a(e) &&
                    (qa(e) ||
                      "string" == typeof e ||
                      "function" == typeof e.splice ||
                      Ya(e) ||
                      cr(e) ||
                      Wa(e))
                  )
                    return !e.length;
                  var t = _i(e);
                  if (t == w || t == A) return !e.size;
                  if (wi(e)) return !Bo(e).length;
                  for (var n in e) if (je.call(e, n)) return !1;
                  return !0;
                }),
                (Vn.isEqual = function (e, t) {
                  return Po(e, t);
                }),
                (Vn.isEqualWith = function (e, t, n) {
                  var o = (n = "function" == typeof n ? n : s) ? n(e, t) : s;
                  return o === s ? Po(e, t, s, n) : !!o;
                }),
                (Vn.isError = Qa),
                (Vn.isFinite = function (e) {
                  return "number" == typeof e && Ut(e);
                }),
                (Vn.isFunction = Xa),
                (Vn.isInteger = Za),
                (Vn.isLength = Ja),
                (Vn.isMap = nr),
                (Vn.isMatch = function (e, t) {
                  return e === t || Do(e, t, mi(t));
                }),
                (Vn.isMatchWith = function (e, t, n) {
                  return (
                    (n = "function" == typeof n ? n : s), Do(e, t, mi(t), n)
                  );
                }),
                (Vn.isNaN = function (e) {
                  return or(e) && e != +e;
                }),
                (Vn.isNative = function (e) {
                  if (Si(e))
                    throw new we(
                      "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",
                    );
                  return Ro(e);
                }),
                (Vn.isNil = function (e) {
                  return null == e;
                }),
                (Vn.isNull = function (e) {
                  return null === e;
                }),
                (Vn.isNumber = or),
                (Vn.isObject = er),
                (Vn.isObjectLike = tr),
                (Vn.isPlainObject = sr),
                (Vn.isRegExp = ir),
                (Vn.isSafeInteger = function (e) {
                  return Za(e) && e >= -9007199254740991 && e <= h;
                }),
                (Vn.isSet = ar),
                (Vn.isString = rr),
                (Vn.isSymbol = lr),
                (Vn.isTypedArray = cr),
                (Vn.isUndefined = function (e) {
                  return e === s;
                }),
                (Vn.isWeakMap = function (e) {
                  return tr(e) && _i(e) == M;
                }),
                (Vn.isWeakSet = function (e) {
                  return tr(e) && "[object WeakSet]" == To(e);
                }),
                (Vn.join = function (e, t) {
                  return null == e ? "" : Yt.call(e, t);
                }),
                (Vn.kebabCase = qr),
                (Vn.last = Qi),
                (Vn.lastIndexOf = function (e, t, n) {
                  var o = null == e ? 0 : e.length;
                  if (!o) return -1;
                  var i = o;
                  return (
                    n !== s &&
                      (i = (i = hr(n)) < 0 ? yn(o + i, 0) : bn(i, o - 1)),
                    t == t
                      ? (function (e, t, n) {
                          for (var o = n + 1; o--; ) if (e[o] === t) return o;
                          return o;
                        })(e, t, i)
                      : Ht(e, Kt, i, !0)
                  );
                }),
                (Vn.lowerCase = Kr),
                (Vn.lowerFirst = $r),
                (Vn.lt = ur),
                (Vn.lte = pr),
                (Vn.max = function (e) {
                  return e && e.length ? go(e, ol, Io) : s;
                }),
                (Vn.maxBy = function (e, t) {
                  return e && e.length ? go(e, ui(t, 2), Io) : s;
                }),
                (Vn.mean = function (e) {
                  return $t(e, ol);
                }),
                (Vn.meanBy = function (e, t) {
                  return $t(e, ui(t, 2));
                }),
                (Vn.min = function (e) {
                  return e && e.length ? go(e, ol, Uo) : s;
                }),
                (Vn.minBy = function (e, t) {
                  return e && e.length ? go(e, ui(t, 2), Uo) : s;
                }),
                (Vn.stubArray = fl),
                (Vn.stubFalse = _l),
                (Vn.stubObject = function () {
                  return {};
                }),
                (Vn.stubString = function () {
                  return "";
                }),
                (Vn.stubTrue = function () {
                  return !0;
                }),
                (Vn.multiply = kl),
                (Vn.nth = function (e, t) {
                  return e && e.length ? Ko(e, hr(t)) : s;
                }),
                (Vn.noConflict = function () {
                  return ft._ === this && (ft._ = He), this;
                }),
                (Vn.noop = ll),
                (Vn.now = Ca),
                (Vn.pad = function (e, t, n) {
                  e = vr(e);
                  var o = (t = hr(t)) ? hn(e) : 0;
                  if (!t || o >= t) return e;
                  var s = (t - o) / 2;
                  return $s(gt(s), n) + e + $s(_t(s), n);
                }),
                (Vn.padEnd = function (e, t, n) {
                  e = vr(e);
                  var o = (t = hr(t)) ? hn(e) : 0;
                  return t && o < t ? e + $s(t - o, n) : e;
                }),
                (Vn.padStart = function (e, t, n) {
                  e = vr(e);
                  var o = (t = hr(t)) ? hn(e) : 0;
                  return t && o < t ? $s(t - o, n) + e : e;
                }),
                (Vn.parseInt = function (e, t, n) {
                  return (
                    n || null == t ? (t = 0) : t && (t = +t),
                    kn(vr(e).replace(re, ""), t || 0)
                  );
                }),
                (Vn.random = function (e, t, n) {
                  if (
                    (n && "boolean" != typeof n && Ei(e, t, n) && (t = n = s),
                    n === s &&
                      ("boolean" == typeof t
                        ? ((n = t), (t = s))
                        : "boolean" == typeof e && ((n = e), (e = s))),
                    e === s && t === s
                      ? ((e = 0), (t = 1))
                      : ((e = dr(e)),
                        t === s ? ((t = e), (e = 0)) : (t = dr(t))),
                    e > t)
                  ) {
                    var o = e;
                    (e = t), (t = o);
                  }
                  if (n || e % 1 || t % 1) {
                    var i = xn();
                    return bn(
                      e + i * (t - e + pt("1e-" + ((i + "").length - 1))),
                      t,
                    );
                  }
                  return Qo(e, t);
                }),
                (Vn.reduce = function (e, t, n) {
                  var o = qa(e) ? jt : zt,
                    s = arguments.length < 3;
                  return o(e, ui(t, 4), n, s, ho);
                }),
                (Vn.reduceRight = function (e, t, n) {
                  var o = qa(e) ? Bt : zt,
                    s = arguments.length < 3;
                  return o(e, ui(t, 4), n, s, fo);
                }),
                (Vn.repeat = function (e, t, n) {
                  return (
                    (t = (n ? Ei(e, t, n) : t === s) ? 1 : hr(t)), Xo(vr(e), t)
                  );
                }),
                (Vn.replace = function () {
                  var e = arguments,
                    t = vr(e[0]);
                  return e.length < 3 ? t : t.replace(e[1], e[2]);
                }),
                (Vn.result = function (e, t, n) {
                  var o = -1,
                    i = (t = Es(t, e)).length;
                  for (i || ((i = 1), (e = s)); ++o < i; ) {
                    var a = null == e ? s : e[ji(t[o])];
                    a === s && ((o = i), (a = n)), (e = Xa(a) ? a.call(e) : a);
                  }
                  return e;
                }),
                (Vn.round = xl),
                (Vn.runInContext = e),
                (Vn.sample = function (e) {
                  return (qa(e) ? Zn : Jo)(e);
                }),
                (Vn.size = function (e) {
                  if (null == e) return 0;
                  if ($a(e)) return rr(e) ? hn(e) : e.length;
                  var t = _i(e);
                  return t == w || t == A ? e.size : Bo(e).length;
                }),
                (Vn.snakeCase = Gr),
                (Vn.some = function (e, t, n) {
                  var o = qa(e) ? Ft : as;
                  return n && Ei(e, t, n) && (t = s), o(e, ui(t, 3));
                }),
                (Vn.sortedIndex = function (e, t) {
                  return rs(e, t);
                }),
                (Vn.sortedIndexBy = function (e, t, n) {
                  return ls(e, t, ui(n, 2));
                }),
                (Vn.sortedIndexOf = function (e, t) {
                  var n = null == e ? 0 : e.length;
                  if (n) {
                    var o = rs(e, t);
                    if (o < n && Ua(e[o], t)) return o;
                  }
                  return -1;
                }),
                (Vn.sortedLastIndex = function (e, t) {
                  return rs(e, t, !0);
                }),
                (Vn.sortedLastIndexBy = function (e, t, n) {
                  return ls(e, t, ui(n, 2), !0);
                }),
                (Vn.sortedLastIndexOf = function (e, t) {
                  if (null == e ? 0 : e.length) {
                    var n = rs(e, t, !0) - 1;
                    if (Ua(e[n], t)) return n;
                  }
                  return -1;
                }),
                (Vn.startCase = Yr),
                (Vn.startsWith = function (e, t, n) {
                  return (
                    (e = vr(e)),
                    (n = null == n ? 0 : lo(hr(n), 0, e.length)),
                    (t = ps(t)),
                    e.slice(n, n + t.length) == t
                  );
                }),
                (Vn.subtract = Sl),
                (Vn.sum = function (e) {
                  return e && e.length ? Qt(e, ol) : 0;
                }),
                (Vn.sumBy = function (e, t) {
                  return e && e.length ? Qt(e, ui(t, 2)) : 0;
                }),
                (Vn.template = function (e, t, n) {
                  var o = Vn.templateSettings;
                  n && Ei(e, t, n) && (t = s),
                    (e = vr(e)),
                    (t = Er({}, t, o, ei));
                  var i,
                    a,
                    r = Er({}, t.imports, o.imports, ei),
                    l = Nr(r),
                    c = Jt(r, l),
                    u = 0,
                    p = t.interpolate || ke,
                    m = "__p += '",
                    d = Oe(
                      (t.escape || ke).source +
                        "|" +
                        p.source +
                        "|" +
                        (p === ee ? he : ke).source +
                        "|" +
                        (t.evaluate || ke).source +
                        "|$",
                      "g",
                    ),
                    h =
                      "//# sourceURL=" +
                      ("sourceURL" in t
                        ? t.sourceURL
                        : "lodash.templateSources[" + ++rt + "]") +
                      "\n";
                  e.replace(d, function (t, n, o, s, r, l) {
                    return (
                      o || (o = s),
                      (m += e.slice(u, l).replace(xe, an)),
                      n && ((i = !0), (m += "' +\n__e(" + n + ") +\n'")),
                      r && ((a = !0), (m += "';\n" + r + ";\n__p += '")),
                      o &&
                        (m +=
                          "' +\n((__t = (" + o + ")) == null ? '' : __t) +\n'"),
                      (u = l + t.length),
                      t
                    );
                  }),
                    (m += "';\n");
                  var f = t.variable;
                  f || (m = "with (obj) {\n" + m + "\n}\n"),
                    (m = (a ? m.replace(K, "") : m)
                      .replace($, "$1")
                      .replace(G, "$1;")),
                    (m =
                      "function(" +
                      (f || "obj") +
                      ") {\n" +
                      (f ? "" : "obj || (obj = {});\n") +
                      "var __t, __p = ''" +
                      (i ? ", __e = _.escape" : "") +
                      (a
                        ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n"
                        : ";\n") +
                      m +
                      "return __p\n}");
                  var _ = Zr(function () {
                    return Ce(l, h + "return " + m).apply(s, c);
                  });
                  if (((_.source = m), Qa(_))) throw _;
                  return _;
                }),
                (Vn.times = function (e, t) {
                  if ((e = hr(e)) < 1 || e > h) return [];
                  var n = _,
                    o = bn(e, _);
                  (t = ui(t)), (e -= _);
                  for (var s = Xt(o, t); ++n < e; ) t(n);
                  return s;
                }),
                (Vn.toFinite = dr),
                (Vn.toInteger = hr),
                (Vn.toLength = fr),
                (Vn.toLower = function (e) {
                  return vr(e).toLowerCase();
                }),
                (Vn.toNumber = _r),
                (Vn.toSafeInteger = function (e) {
                  return e ? lo(hr(e), -9007199254740991, h) : 0 === e ? e : 0;
                }),
                (Vn.toString = vr),
                (Vn.toUpper = function (e) {
                  return vr(e).toUpperCase();
                }),
                (Vn.trim = function (e, t, n) {
                  if ((e = vr(e)) && (n || t === s)) return e.replace(ae, "");
                  if (!e || !(t = ps(t))) return e;
                  var o = fn(e),
                    i = fn(t);
                  return xs(o, tn(o, i), nn(o, i) + 1).join("");
                }),
                (Vn.trimEnd = function (e, t, n) {
                  if ((e = vr(e)) && (n || t === s)) return e.replace(le, "");
                  if (!e || !(t = ps(t))) return e;
                  var o = fn(e);
                  return xs(o, 0, nn(o, fn(t)) + 1).join("");
                }),
                (Vn.trimStart = function (e, t, n) {
                  if ((e = vr(e)) && (n || t === s)) return e.replace(re, "");
                  if (!e || !(t = ps(t))) return e;
                  var o = fn(e);
                  return xs(o, tn(o, fn(t))).join("");
                }),
                (Vn.truncate = function (e, t) {
                  var n = 30,
                    o = "...";
                  if (er(t)) {
                    var i = "separator" in t ? t.separator : i;
                    (n = "length" in t ? hr(t.length) : n),
                      (o = "omission" in t ? ps(t.omission) : o);
                  }
                  var a = (e = vr(e)).length;
                  if (rn(e)) {
                    var r = fn(e);
                    a = r.length;
                  }
                  if (n >= a) return e;
                  var l = n - hn(o);
                  if (l < 1) return o;
                  var c = r ? xs(r, 0, l).join("") : e.slice(0, l);
                  if (i === s) return c + o;
                  if ((r && (l += c.length - l), ir(i))) {
                    if (e.slice(l).search(i)) {
                      var u,
                        p = c;
                      for (
                        i.global || (i = Oe(i.source, vr(fe.exec(i)) + "g")),
                          i.lastIndex = 0;
                        (u = i.exec(p));

                      )
                        var m = u.index;
                      c = c.slice(0, m === s ? l : m);
                    }
                  } else if (e.indexOf(ps(i), l) != l) {
                    var d = c.lastIndexOf(i);
                    d > -1 && (c = c.slice(0, d));
                  }
                  return c + o;
                }),
                (Vn.unescape = function (e) {
                  return (e = vr(e)) && Q.test(e) ? e.replace(Y, _n) : e;
                }),
                (Vn.uniqueId = function (e) {
                  var t = ++Be;
                  return vr(e) + t;
                }),
                (Vn.upperCase = zr),
                (Vn.upperFirst = Qr),
                (Vn.each = va),
                (Vn.eachRight = ya),
                (Vn.first = $i),
                rl(
                  Vn,
                  ((El = {}),
                  ko(Vn, function (e, t) {
                    je.call(Vn.prototype, t) || (El[t] = e);
                  }),
                  El),
                  { chain: !1 },
                ),
                (Vn.VERSION = "4.17.10"),
                Ot(
                  [
                    "bind",
                    "bindKey",
                    "curry",
                    "curryRight",
                    "partial",
                    "partialRight",
                  ],
                  function (e) {
                    Vn[e].placeholder = Vn;
                  },
                ),
                Ot(["drop", "take"], function (e, t) {
                  (Kn.prototype[e] = function (n) {
                    n = n === s ? 1 : yn(hr(n), 0);
                    var o =
                      this.__filtered__ && !t ? new Kn(this) : this.clone();
                    return (
                      o.__filtered__
                        ? (o.__takeCount__ = bn(n, o.__takeCount__))
                        : o.__views__.push({
                            size: bn(n, _),
                            type: e + (o.__dir__ < 0 ? "Right" : ""),
                          }),
                      o
                    );
                  }),
                    (Kn.prototype[e + "Right"] = function (t) {
                      return this.reverse()[e](t).reverse();
                    });
                }),
                Ot(["filter", "map", "takeWhile"], function (e, t) {
                  var n = t + 1,
                    o = 1 == n || 3 == n;
                  Kn.prototype[e] = function (e) {
                    var t = this.clone();
                    return (
                      t.__iteratees__.push({ iteratee: ui(e, 3), type: n }),
                      (t.__filtered__ = t.__filtered__ || o),
                      t
                    );
                  };
                }),
                Ot(["head", "last"], function (e, t) {
                  var n = "take" + (t ? "Right" : "");
                  Kn.prototype[e] = function () {
                    return this[n](1).value()[0];
                  };
                }),
                Ot(["initial", "tail"], function (e, t) {
                  var n = "drop" + (t ? "" : "Right");
                  Kn.prototype[e] = function () {
                    return this.__filtered__ ? new Kn(this) : this[n](1);
                  };
                }),
                (Kn.prototype.compact = function () {
                  return this.filter(ol);
                }),
                (Kn.prototype.find = function (e) {
                  return this.filter(e).head();
                }),
                (Kn.prototype.findLast = function (e) {
                  return this.reverse().find(e);
                }),
                (Kn.prototype.invokeMap = Zo(function (e, t) {
                  return "function" == typeof e
                    ? new Kn(this)
                    : this.map(function (n) {
                        return Lo(n, e, t);
                      });
                })),
                (Kn.prototype.reject = function (e) {
                  return this.filter(Da(ui(e)));
                }),
                (Kn.prototype.slice = function (e, t) {
                  e = hr(e);
                  var n = this;
                  return n.__filtered__ && (e > 0 || t < 0)
                    ? new Kn(n)
                    : (e < 0 ? (n = n.takeRight(-e)) : e && (n = n.drop(e)),
                      t !== s &&
                        (n = (t = hr(t)) < 0 ? n.dropRight(-t) : n.take(t - e)),
                      n);
                }),
                (Kn.prototype.takeRightWhile = function (e) {
                  return this.reverse().takeWhile(e).reverse();
                }),
                (Kn.prototype.toArray = function () {
                  return this.take(_);
                }),
                ko(Kn.prototype, function (e, t) {
                  var n = /^(?:filter|find|map|reject)|While$/.test(t),
                    o = /^(?:head|last)$/.test(t),
                    i = Vn[o ? "take" + ("last" == t ? "Right" : "") : t],
                    a = o || /^find/.test(t);
                  i &&
                    (Vn.prototype[t] = function () {
                      var t = this.__wrapped__,
                        r = o ? [1] : arguments,
                        l = t instanceof Kn,
                        c = r[0],
                        u = l || qa(t),
                        p = function (e) {
                          var t = i.apply(Vn, Rt([e], r));
                          return o && m ? t[0] : t;
                        };
                      u &&
                        n &&
                        "function" == typeof c &&
                        1 != c.length &&
                        (l = u = !1);
                      var m = this.__chain__,
                        d = !!this.__actions__.length,
                        h = a && !m,
                        f = l && !d;
                      if (!a && u) {
                        t = f ? t : new Kn(this);
                        var _ = e.apply(t, r);
                        return (
                          _.__actions__.push({
                            func: da,
                            args: [p],
                            thisArg: s,
                          }),
                          new qn(_, m)
                        );
                      }
                      return h && f
                        ? e.apply(this, r)
                        : ((_ = this.thru(p)),
                          h ? (o ? _.value()[0] : _.value()) : _);
                    });
                }),
                Ot(
                  ["pop", "push", "shift", "sort", "splice", "unshift"],
                  function (e) {
                    var t = Le[e],
                      n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru",
                      o = /^(?:pop|shift)$/.test(e);
                    Vn.prototype[e] = function () {
                      var e = arguments;
                      if (o && !this.__chain__) {
                        var s = this.value();
                        return t.apply(qa(s) ? s : [], e);
                      }
                      return this[n](function (n) {
                        return t.apply(qa(n) ? n : [], e);
                      });
                    };
                  },
                ),
                ko(Kn.prototype, function (e, t) {
                  var n = Vn[t];
                  if (n) {
                    var o = n.name + "";
                    (Ln[o] || (Ln[o] = [])).push({ name: t, func: n });
                  }
                }),
                (Ln[Hs(s, 2).name] = [{ name: "wrapper", func: s }]),
                (Kn.prototype.clone = function () {
                  var e = new Kn(this.__wrapped__);
                  return (
                    (e.__actions__ = Ns(this.__actions__)),
                    (e.__dir__ = this.__dir__),
                    (e.__filtered__ = this.__filtered__),
                    (e.__iteratees__ = Ns(this.__iteratees__)),
                    (e.__takeCount__ = this.__takeCount__),
                    (e.__views__ = Ns(this.__views__)),
                    e
                  );
                }),
                (Kn.prototype.reverse = function () {
                  if (this.__filtered__) {
                    var e = new Kn(this);
                    (e.__dir__ = -1), (e.__filtered__ = !0);
                  } else (e = this.clone()).__dir__ *= -1;
                  return e;
                }),
                (Kn.prototype.value = function () {
                  var e = this.__wrapped__.value(),
                    t = this.__dir__,
                    n = qa(e),
                    o = t < 0,
                    s = n ? e.length : 0,
                    i = (function (e, t, n) {
                      var o = -1,
                        s = n.length;
                      for (; ++o < s; ) {
                        var i = n[o],
                          a = i.size;
                        switch (i.type) {
                          case "drop":
                            e += a;
                            break;
                          case "dropRight":
                            t -= a;
                            break;
                          case "take":
                            t = bn(t, e + a);
                            break;
                          case "takeRight":
                            e = yn(e, t - a);
                        }
                      }
                      return { start: e, end: t };
                    })(0, s, this.__views__),
                    a = i.start,
                    r = i.end,
                    l = r - a,
                    c = o ? r : a - 1,
                    u = this.__iteratees__,
                    p = u.length,
                    m = 0,
                    d = bn(l, this.__takeCount__);
                  if (!n || (!o && s == l && d == l))
                    return _s(e, this.__actions__);
                  var h = [];
                  e: for (; l-- && m < d; ) {
                    for (var f = -1, _ = e[(c += t)]; ++f < p; ) {
                      var g = u[f],
                        v = g.iteratee,
                        y = g.type,
                        b = v(_);
                      if (2 == y) _ = b;
                      else if (!b) {
                        if (1 == y) continue e;
                        break e;
                      }
                    }
                    h[m++] = _;
                  }
                  return h;
                }),
                (Vn.prototype.at = ha),
                (Vn.prototype.chain = function () {
                  return ma(this);
                }),
                (Vn.prototype.commit = function () {
                  return new qn(this.value(), this.__chain__);
                }),
                (Vn.prototype.next = function () {
                  this.__values__ === s && (this.__values__ = mr(this.value()));
                  var e = this.__index__ >= this.__values__.length;
                  return {
                    done: e,
                    value: e ? s : this.__values__[this.__index__++],
                  };
                }),
                (Vn.prototype.plant = function (e) {
                  for (var t, n = this; n instanceof Wn; ) {
                    var o = Fi(n);
                    (o.__index__ = 0),
                      (o.__values__ = s),
                      t ? (i.__wrapped__ = o) : (t = o);
                    var i = o;
                    n = n.__wrapped__;
                  }
                  return (i.__wrapped__ = e), t;
                }),
                (Vn.prototype.reverse = function () {
                  var e = this.__wrapped__;
                  if (e instanceof Kn) {
                    var t = e;
                    return (
                      this.__actions__.length && (t = new Kn(this)),
                      (t = t.reverse()).__actions__.push({
                        func: da,
                        args: [ea],
                        thisArg: s,
                      }),
                      new qn(t, this.__chain__)
                    );
                  }
                  return this.thru(ea);
                }),
                (Vn.prototype.toJSON =
                  Vn.prototype.valueOf =
                  Vn.prototype.value =
                    function () {
                      return _s(this.__wrapped__, this.__actions__);
                    }),
                (Vn.prototype.first = Vn.prototype.head),
                Je &&
                  (Vn.prototype[Je] = function () {
                    return this;
                  }),
                Vn
              );
            })();
            (ft._ = gn),
              (o = function () {
                return gn;
              }.call(t, n, t, e)) === s || (e.exports = o);
          }.call(this);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "N2u3H6aA",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-description\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-description\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-description\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-content-column"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-ability-description-wrapper"],["flush-element"],["text","\\n      "],["open-element","h4",[]],["static-attr","class","cdp-ability-name"],["flush-element"],["append",["unknown",["ability","name"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-ability-info-wrapper"],["flush-element"],["text","\\n"],["text","      "],["close-element"],["text","\\n\\n      "],["open-element","lol-uikit-content-block",[]],["static-attr","class","cdp-ability-description"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["text","          "],["open-element","p",[]],["static-attr","class","cdp-ability-dynamic-desc"],["flush-element"],["append",["helper",["sanitize"],[["get",["ability","description"]]],null],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          s = n(95),
          i = n(63);
        n(96);
        const { RunMixin: a } = o.EmberAddons.EmberLifeline,
          r = o.UIKit.getFlyoutManager(),
          l = (0, o.EmberDataBinding)({
            Ember: o.Ember,
            websocket: (0, o.getProvider)().getSocket(),
            boundProperties: {
              disabledChampionSkins:
                "/lol-platform-config/v1/namespaces/DisabledChampionSkins/DisabledChampionSkins",
              skinInfo: "/lol-store/v1/skins/{{activeSkinObject.id}}",
            },
          });
        e.exports = o.Ember.Component.extend(a, l, {
          classNames: ["cdp-skins-section"],
          layout: n(97),
          eventHubService: o.Ember.inject.service("event-hub"),
          skinsFromActiveEvents: o.Ember.computed.alias(
            "eventHubService.skinsFromActiveEvents",
          ),
          selectedQuestFormIndex: null,
          flyoutComponentName: "QuestFormsPopup",
          flyoutTargetClass: ".quest-forms",
          championService: o.Ember.inject.service("champion"),
          champion: o.Ember.computed.alias("championService.champion"),
          championOwned: o.Ember.computed.alias(
            "championService.summonerChampion.ownership.owned",
          ),
          animationsEnabled: o.Ember.computed.not(
            "championService.potatoModeSetting.data.potatoModeEnabled",
          ),
          onInit: o.Ember.on("init", function () {
            o.Ember.run.scheduleOnce("afterRender", () =>
              this.sendAction("sectionLoaded", "skins"),
            ),
              this.set("flyoutComponents", new Map()),
              this.set("registeredFlyoutTargets", new Set()),
              (this._uxSettingsObserver = (e) => {
                this.set("uxSettings", e);
              }),
              o.UXSettings.addObserver(this._uxSettingsObserver);
          }),
          willDestroyElement() {
            o.UXSettings.removeObserver(this._uxSettingsObserver),
              this._super(...arguments);
          },
          ownedSkinAugmentsById: o.Ember.computed(
            "championService.augmentsInventory",
            function () {
              const e = this.get("championService.augmentsInventory") ?? [],
                t = {};
              return (
                e.forEach((e) => {
                  t[e.uuid] = e.owned;
                }),
                t
              );
            },
          ),
          skins: o.Ember.computed(
            "championService.summonerChampion",
            "champion",
            "disabledChampionSkins",
            function () {
              const e = this.get("disabledChampionSkins") || [];
              let t = this.get("championService.summonerChampion.skins");
              const n = this.get("champion.skins");
              return t && n
                ? ((t = t.filter((t) => !e.includes(t.id))),
                  o.Ember.set(t[0], "isBase", n[0].isBase),
                  t)
                : o.Ember.A([]);
            },
          ),
          activeSkinIndex: o.Ember.computed(
            "skins",
            "inputSkinId",
            function () {
              const e = this.get("skins"),
                t = this.get("inputSkinId");
              if (t && e) {
                const n = e.findIndex((e) => e.id === t);
                if (n >= 0) return (e[n].isViewed = !0), n;
              }
              return e && e.length > 0 && (e[0].isViewed = !0), 0;
            },
          ),
          activeSkin: o.Ember.computed("activeSkinIndex", function () {
            return `skin_${this.get("activeSkinIndex")}`;
          }),
          activeSkinObject: o.Ember.computed(
            "skins",
            "activeSkinIndex",
            function () {
              const e = this.get("activeSkinIndex"),
                t = this.get("skins");
              return t && t[e];
            },
          ),
          activeSkinSplashPath: o.Ember.computed.alias(
            "activeSkinObject.uncenteredSplashPath",
          ),
          currentSkinSplashVideoPath: o.Ember.computed(
            "activeSkinObject.collectionSplashVideoPath",
            "activeSkinObject.skinSplashVideoOverride",
            "hasQuestForms",
            function () {
              const e = this.get("activeSkinObject.collectionSplashVideoPath"),
                t = this.get("activeSkinObject.skinSplashVideoOverride"),
                n = this.get("hasQuestForms");
              return t || (n ? null : e);
            },
          ),
          currentSkinDescription: o.Ember.computed(
            "activeSkinObject.featuresText",
            "activeSkinObject.questSkinInfo.collectionDescription",
            "activeSkinObject.skinDescriptionOverride",
            function () {
              const e = this.get(
                  "activeSkinObject.questSkinInfo.collectionDescription",
                ),
                t = this.get("activeSkinObject.featuresText"),
                n = this.get("activeSkinObject.skinDescriptionOverride");
              return n || e || t;
            },
          ),
          shouldShowVideoForSkin: o.Ember.computed.and(
            "animationsEnabled",
            "currentSkinSplashVideoPath",
          ),
          ownedSkinAugments: o.Ember.computed(
            "ownedSkinAugmentsById",
            "activeSkinObject.skinAugments",
            "activeSkinObject.skinAugmentsOverride",
            function () {
              const e = this.get("ownedSkinAugmentsById");
              let t = [];
              return (
                (t = this.get("activeSkinObject.skinAugmentsOverride")
                  ? this.get("activeSkinObject.skinAugmentsOverride")
                  : this.get("selectedSkinTier.skinAugments.augments")
                    ? this.get("selectedSkinTier.skinAugments.augments")
                    : this.get("activeSkinObject.skinAugments.augments")),
                t
                  .filter((t) => e[t.contentId])
                  .map((e) => e.overlays?.[0]?.uncenteredLCOverlayPath)
              );
            },
          ),
          currentBackgroundPath: o.Ember.computed(
            "activeSkinSplashPath",
            "shouldShowVideoForSkin",
            "activeSkinObject.skinSplashOverride",
            "hasQuestForms",
            "activeSkinObject",
            function () {
              if (this.get("shouldShowVideoForSkin"))
                return this.get("currentSkinSplashVideoPath");
              {
                const e = this.get("activeSkinObject.skinSplashOverride");
                return (
                  e ||
                  (this.get("hasQuestForms")
                    ? this.get(
                        "activeSkinObject.questSkinInfo.uncenteredSplashPath",
                      )
                    : this.get("activeSkinSplashPath"))
                );
              }
            },
          ),
          skinOwned: o.Ember.computed.alias("activeSkinObject.ownership.owned"),
          isPurchasable: o.Ember.computed(
            "skinInfo",
            "skinInfo.itemId",
            function () {
              return (
                this.get("skinInfo") &&
                this.get("skinInfo.prices") &&
                this.get("skinInfo.prices").length
              );
            },
          ),
          chromas: o.Ember.computed.alias("activeSkinObject.chromas"),
          hasChromas: o.Ember.computed.notEmpty("chromas"),
          questSkinInfo: o.Ember.computed.alias(
            "activeSkinObject.questSkinInfo",
          ),
          questSkinTiers: o.Ember.computed.alias("questSkinInfo.tiers"),
          hasQuestForms: o.Ember.computed.notEmpty("questSkinInfo.tiers"),
          lastSelectedSkinIndex: null,
          isTieredSkin: o.Ember.computed.equal(
            "questSkinInfo.productType",
            "kTieredSkin",
          ),
          isSkinEventActive: o.Ember.computed(
            "activeSkinObject.id",
            "skinsFromActiveEvents",
            function () {
              return !!this.get("skinsFromActiveEvents")?.[
                this.get("activeSkinObject.id")
              ];
            },
          ),
          isTieredSkinEventPurchased: o.Ember.computed(
            "activeSkinObject.id",
            "skinsFromActiveEvents",
            function () {
              return !!this.get("skinsFromActiveEvents")?.[
                this.get("activeSkinObject.id")
              ]?.isPassPurchased;
            },
          ),
          selectedSkinTier: o.Ember.computed(
            "questSkinTiers",
            "selectedQuestFormIndex",
            function () {
              return this.get("questSkinTiers")[
                this.get("selectedQuestFormIndex")
              ];
            },
          ),
          isTieredSkinWithEventOn: o.Ember.computed.and(
            "hasQuestForms",
            "isSkinEventActive",
            "isTieredSkin",
          ),
          isTieredSkinWithEventOff: o.Ember.computed(
            "hasQuestForms",
            "isSkinEventActive",
            "isTieredSkin",
            function () {
              return (
                this.get("hasQuestForms") &&
                !this.get("isSkinEventActive") &&
                this.get("isTieredSkin")
              );
            },
          ),
          showTieredSkinEventPurchaseButton: o.Ember.computed.or(
            "isTieredSkinWithEventOff",
            "isTieredSkinWithEventOn",
          ),
          isSkinEventPurchasable: o.Ember.computed(
            "isSkinEventActive",
            "isPurchasable",
            "selectedSkinTier",
            "activeSkinObject",
            "isTieredSkin",
            function () {
              return (
                this.get("isSkinEventActive") &&
                ((this.get("isTieredSkin") &&
                  !this.get("selectedSkinTier")?.ownership?.owned) ||
                  (!this.get("isTieredSkin") &&
                    this.get("activeSkinObject")?.ownership?.owned))
              );
            },
          ),
          setTieredSkinInitialState: o.Ember.observer(
            "activeSkinObject",
            function () {
              if (this.get("isTieredSkin")) {
                const e = this.get("questSkinTiers").reduce(
                    (e, t, n) => (t.ownership.owned ? n : e),
                    0,
                  ),
                  t = this.get("questSkinTiers")[e];
                this.setLastSelectedSkin(t),
                  this.setSelectedQuestForm(e),
                  this.overrideSplashPath(t.uncenteredSplashPath),
                  this.overrideSkinName(t.name),
                  this.overrideSkinDescription(t.description),
                  this.overrideSplashVideoPath(t.collectionSplashVideoPath),
                  this.overrideAugments(t.skinAugments.augments);
              }
            },
          ),
          sendTelemetryEvent(e, t) {
            o.Telemetry.sendCustomData("cdp_skins_section_event", {
              puuid: this.get("puuid"),
              event: e,
              ...t,
            });
          },
          createFlyoutComponent(e, t) {
            const n = o.ComponentFactory.create(e, t);
            return this.get("flyoutComponents").set(e, n), n;
          },
          assignFlyout(e, t) {
            this.set(
              "lastSelectedSkinIndex",
              this.get("selectedQuestFormIndex"),
            );
            const n = o.Ember.Object.create({
                caller: this.element,
                skinTiers: this.get("questSkinTiers"),
                showcaseComponent: this,
                isTieredSkin: this.get("isTieredSkin"),
              }),
              s = {
                showEvent: "show",
                hideEvent: "hide",
                targetAnchor: { x: "center", y: "top" },
                tooltipAnchor: { x: "center", y: "bottom" },
                offset: { x: 0, y: -20 },
                backdropCutout: null,
                orientation: "top",
                animated: !0,
                ComponentFactory: o.ComponentFactory,
              };
            r.assignFlyout(e, t, n, s),
              this.get("registeredFlyoutTargets").add(e);
          },
          setSelectedQuestForm(e) {
            this.set("selectedQuestFormIndex", e),
              this.set("lastSelectedSkinIndex", e);
          },
          setLastSelectedSkin(e) {
            this.set("lastSelectedSkinIndex", e);
          },
          hideFlyoutModal() {
            const e = this.element.querySelector(this.get("flyoutTargetClass"));
            r.sendEvent(e, "hide"),
              this.runTask(() => {
                r.unassignFlyout(e);
              }, 133),
              i.SFX.flyoutCloseClick.play();
          },
          onHideFlyout() {
            const e = this.get("flyoutTargetClass"),
              t = this.element.querySelector(e);
            t.removeEventListener("willHide", this.onHideFlyout.bind(this)),
              this.runTask(() => {
                r.unassignFlyout(t);
              }, 133);
          },
          showCDPQuestFormsFlyout() {
            const e = this.get("flyoutComponentName"),
              t = this.get("flyoutTargetClass"),
              n = this.element.querySelector(t);
            n.addEventListener("willHide", this.onHideFlyout.bind(this)),
              this.assignFlyout(n, e),
              r.sendEvent(n, "show"),
              i.SFX.flyoutOpenClick.play();
          },
          overrideSkinName(e) {
            this.set("activeSkinObject.skinNameOverride", e);
          },
          overrideSplashPath(e) {
            this.set("activeSkinObject.skinSplashOverride", e);
          },
          overrideSplashVideoPath(e) {
            this.set("activeSkinObject.skinSplashVideoOverride", e);
          },
          overrideSkinDescription(e) {
            this.set("activeSkinObject.skinDescriptionOverride", e);
          },
          overrideAugments(e) {
            this.set("activeSkinObject.skinAugmentsOverride", e ?? []);
          },
          resetSkinOverrides() {
            this.set("activeSkinObject.skinSplashOverride", null),
              this.set("activeSkinObject.skinNameOverride", null),
              this.set("activeSkinObject.skinSplashVideoOverride", null),
              this.set("activeSkinObject.skinDescriptionOverride", null),
              this.set("activeSkinObject.skinAugmentsOverride", null),
              this.set("selectedQuestFormIndex", null);
          },
          actions: {
            updateActiveSkin(e, t) {
              this.resetSkinOverrides(),
                this.set(`skins.${e}.isViewed`, !1),
                this.set(`skins.${t}.isViewed`, !0),
                this.set("activeSkinIndex", t);
              const n = document.querySelector(
                `.cdp-skin-overlay-container[section-id="skin_${t}"] video`,
              );
              n && ((n.currentTime = 0), n.play());
            },
            unlockChampion(e) {
              this.get("championService").enterChampionPurchaseFlow(e);
            },
            unlockSkin(e) {
              this.get("championService").enterSkinPurchaseFlow(e);
            },
            toggleFlyout() {
              r.isActive()
                ? this.hideFlyoutModal()
                : (this.showCDPQuestFormsFlyout(),
                  this.sendTelemetryEvent(
                    s.TELEMETRY_EVENTS.CLICK_ON_QUEST_FORMS_FLYOUT,
                  ));
            },
            navigateToCurrentEvent() {
              this.sendTelemetryEvent(
                s.TELEMETRY_EVENTS.NAVIGATE_TO_EVENT_HUB,
                {
                  eventId: this.get("skinsFromActiveEvents")?.[
                    this.get("activeSkinObject.id")
                  ]?.eventId,
                  skinId: this.get("activeSkinObject.id"),
                },
              ),
                o.Router.navigateTo("rcp-fe-lol-event-hub", {
                  openPassPurchase: !0,
                });
            },
          },
        });
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.ConfigureFlyout = function () {}),
          (t.CreateSkinViewFlyoutData = function (e, t, o) {
            return n[e].call(this, t, o);
          }),
          (t.GetFlyoutType = function (e) {
            if (Object.values(this.SkinViewFlyoutTypes).includes(e))
              for (const [t, n] of Object.entries(this.SkinViewFlyoutTypes))
                if (n === e) return t;
            return null;
          }),
          (t.GetTelemetryEventData = function (e) {}),
          (t.TELEMETRY_EVENTS =
            t.StoreSkinTypes =
            t.SkinViewFlyoutTypes =
              void 0);
        const n = {
          questSkin: function () {},
          chroma: function () {},
          skinLine: function () {},
        };
        t.SkinViewFlyoutTypes = {
          QUEST_SKIN: "questSkin",
          CHROMA: "chroma",
          SKIN_LINE: "skinLine",
        };
        t.StoreSkinTypes = { QUEST_SKIN_TAG: "quest-skin" };
        t.TELEMETRY_EVENTS = {
          CLICK_ON_CHROMA_FLYOUT: "clickOnChromaFlyout",
          CLICK_ON_THEME_FLYOUT: "clickOnThemeFlyout",
          CLICK_ON_QUEST_FORMS_FLYOUT: "clickOnQuestFormsFlyout",
          NAVIGATE_TO_EVENT_HUB: "navigateToEventHub",
        };
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "/AB5qHzW",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\root\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\root\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\root\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["skins"]]],null,23],["text","\\n\\n\\n"],["block",["if"],[["get",["showTieredSkinEventPurchaseButton"]]],null,16,9]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_actions_unavailable"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"unlockSkin",["get",["skinInfo"]]],null],null],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_actions_unlock"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isPurchasable"]]],null,1,0]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_store_owned_message"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["skinOwned"]]],null,3,2]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"unlockChampion",["get",["champion","id"]]],null],null],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_actions_unlock"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_store_owned_message"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["championOwned"]]],null,6,5]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","cdp-unlock-button-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["activeSkinObject","isBase"]]],null,7,4],["text","  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["showStoreButton"]]],null,8]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_actions_unavailable"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_store_owned_message"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["selectedSkinTier","ownership","owned"]]],null,11,10]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_store_owned_message"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"navigateToCurrentEvent"],null],null],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-unlock-button-content"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","cdp_actions_unlock"]],false],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isSkinEventPurchasable"]]],null,14,13]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","cdp-unlock-button-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isSkinEventActive"]]],null,15,12],["text","  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["tiered-transformations"],null,[["showcaseComponent","skinTiers"],[["get",[null]],["get",["questSkinTiers"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","class",["concat",["quest-forms ",["helper",["unless"],[["get",["hasQuestForms"]],"hidden"],null]," ",["helper",["if"],[["get",["isTieredSkin"]],"hidden"],null]]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"toggleFlyout"],null],null],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","icon"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","quest-forms"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"toggleFlyout"],null],null],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","icon tiered"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","h4",[]],["flush-element"],["append",["unknown",["tra","cdp_theme_features"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","theme-features"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["static-attr","class","scroll-text"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["isTieredSkin"]]],null,20],["text","          "],["append",["helper",["sanitize"],[["get",["currentSkinDescription"]]],null],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-section",[]],["dynamic-attr","section-id",["concat",["skin_",["get",["index"]]]]],["static-attr","class","cdp-skin-overlay-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["currentSkinDescription"]]],null,21],["text","    "],["close-element"],["text","\\n"]],"locals":["skin","index"]},{"statements":[["text","  "],["append",["helper",["uikit-background-switcher"],null,[["src","overlays"],[["get",["currentBackgroundPath"]],["get",["ownedSkinAugments"]]]]],false],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-skin-overlay"],["flush-element"],["close-element"],["text","\\n  "],["open-element","lol-uikit-section-controller",[]],["dynamic-attr","selected-item",["concat",[["unknown",["activeSkin"]]]]],["static-attr","animation","crossfade"],["static-attr","class","cdp-skins-section-controller"],["flush-element"],["text","\\n"],["block",["each"],[["get",["skins"]]],null,22],["text","  "],["close-element"],["text","\\n\\n  "],["append",["helper",["skins-carousel"],null,[["storeSkinInfo","champion","championSkins","activeSkinIndex","updateActiveSkin","ownedSkinAugmentsById"],[["get",["skinInfo"]],["get",["champion"]],["get",["skins"]],["get",["activeSkinIndex"]],["helper",["action"],[["get",[null]],"updateActiveSkin"],null],["get",["ownedSkinAugmentsById"]]]]],false],["text","\\n  "],["open-element","div",[]],["static-attr","class","related"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isTieredSkinWithEventOff"]]],null,19,18],["text","  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isTieredSkinWithEventOn"]]],null,17]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(99);
        const s = 97,
          i =
            "/fe/lol-champion-details/audio/sfx-champselect-button-arrowback-click.ogg",
          a =
            "/fe/lol-champion-details/audio/sfx-champselect-button-arrowfwd-click.ogg",
          r =
            "/lol-client-config/v3/client-config/lol.client_settings.navigation.enableRewardsProgram",
          l = o.DataBinding.bindTo((0, o.getProvider)().getSocket());
        e.exports = o.Ember.Component.extend({
          classNames: ["cdp-skins-carousel-container"],
          layout: n(100),
          didInsertElement() {
            this._super(...arguments);
            const e = this.get("activeSkinIndex");
            this.moveCarousel(e, "right");
          },
          init() {
            this._super(...arguments), this.initDataBindings();
          },
          initDataBindings() {
            l.observe(r, this, function (e) {
              this.set("isRewardsProgramEnabled", e);
            });
          },
          willDestroy() {
            l.unobserve(r);
          },
          isRewardsProgramEnabled: null,
          moveCarousel(e, t) {
            const n = this.get("activeSkinIndex");
            this.send("changeActiveSkin", n, e);
            const o = this.get("skins.length");
            if (o < 3) return;
            const s = this.get("initialOffset");
            let i = this.get("offset");
            "right" === t && e < n
              ? ((i -= -97 * o), this.resetCarousel(i))
              : "left" === t &&
                e > n &&
                ((i += -97 * o), this.resetCarousel(i));
            const a = s + -97 * e;
            this.set("offset", a);
            const r = 0.9 * -(i - a),
              l = { duration: 70, fill: "forwards" },
              c = { duration: 400, fill: "forwards" },
              u = {
                first: [
                  {
                    transform: `translateX(${i}px)`,
                    easing: "cubic-bezier(1, 0, 1, 1)",
                  },
                  { transform: `translateX(${i + r}px)` },
                ],
                second: [
                  {
                    transform: `translateX(${i + r}px)`,
                    easing: "cubic-bezier(0, 0, 0, 1)",
                  },
                  { transform: `translateX(${a}px)` },
                ],
              },
              p = document.querySelector(".cdp-skins-section .carousel-track");
            p.animate(u.first, l).onfinish = () => {
              p.animate(u.second, c);
            };
          },
          resetCarousel(e) {
            this.$(".carousel-track")
              .addClass("no-transition")
              .css("transform", `translateX(${e}px)`),
              this.$(".carousel-track")[0].offsetHeight,
              this.$(".carousel-track").removeClass("no-transition"),
              this.set("offset", e);
          },
          activeSkin: o.Ember.computed("skins", "activeSkinIndex", function () {
            const e = this.get("skins"),
              t = this.get("activeSkinIndex");
            return e ? e[t] : null;
          }),
          activeSkinName: o.Ember.computed(
            "activeSkinIndex",
            "activeSkin.skinNameOverride",
            function () {
              const e = this.get("activeSkin");
              return "kTieredSkin" === e.questSkinInfo?.productType &&
                e.skinNameOverride
                ? e.skinNameOverride
                : e.name ?? "";
            },
          ),
          activeSkinEmblems: o.Ember.computed(
            "skins",
            "activeSkinIndex",
            function () {
              const e = this.get("skins"),
                t = this.get("activeSkinIndex");
              return e ? e[t].emblems : null;
            },
          ),
          skins: o.Ember.computed(
            "championSkins",
            "isRewardsProgramEnabled",
            function () {
              const e = this.get("championSkins");
              return e
                ? (e.forEach((e) => {
                    const t =
                      e.ownership.owned ||
                      e.ownership.loyaltyReward ||
                      e.ownership.rental.rented;
                    o.Ember.set(e, "playable", t);
                    let n = "";
                    if (e.questSkinInfo)
                      if ("kQuestSkin" === e.questSkinInfo.productType)
                        o.Ember.set(
                          e,
                          "customTilePath",
                          e.questSkinInfo.tilePath,
                        );
                      else {
                        const t = e.questSkinInfo?.tiers?.reduce(
                            (e, t) => (t?.ownership?.owned ? t : e),
                            e.questSkinInfo?.tiers?.[0],
                          ),
                          n = t?.tilePath;
                        o.Ember.set(e, "customTilePath", n);
                      }
                    this.get("isRewardsProgramEnabled") &&
                    e.ownership.loyaltyReward
                      ? (n = "loyalty-reward rewards-program")
                      : e.ownership.loyaltyReward
                        ? (n = "loyalty-reward")
                        : e.ownership.rental.rented && (n = "rental"),
                      o.Ember.set(e, "ftpStyleClassName", n);
                  }),
                  e)
                : [];
            },
          ),
          isBaseSkin: o.Ember.computed("skins", "activeSkinIndex", function () {
            const e = this.get("skins"),
              t = this.get("activeSkinIndex"),
              n = this.get("champion");
            return !e || e[t].name === n;
          }),
          initialOffset: o.Ember.computed("skins", function () {
            const e = this.get("skins");
            let t;
            return (
              (t = e.length > 3 ? -194 : 3 === e.length ? -97 : 0),
              this.set("offset", t),
              t
            );
          }),
          carouselWidth: o.Ember.computed("skins", function () {
            const e = this.get("skins.length");
            return e > 5 ? 513 : 125 + (e - 1) * s;
          }),
          longCarousel: o.Ember.computed.gt("skins.length", 5),
          bufferSize: o.Ember.computed("skins.length", function () {
            const e = this.get("skins.length");
            return e >= 5 ? 4 : e - 1;
          }),
          leftCarouselBuffer: o.Ember.computed("skins", function () {
            const e = this.get("skins"),
              t = this.get("bufferSize"),
              n = e.slice().splice(-t, t);
            return 2 === e.length ? [] : n;
          }),
          rightCarouselBuffer: o.Ember.computed("skins", function () {
            const e = this.get("skins"),
              t = this.get("bufferSize"),
              n = e.slice().splice(0, t);
            return 2 === e.length ? [] : n;
          }),
          actions: {
            changeActiveSkin: function (e, t) {
              this.sendAction("updateActiveSkin", e, t);
            },
            prevSkin: function () {
              const e = this.get("activeSkinIndex"),
                t = this.get("skins.length"),
                n = (e + t - 1) % t;
              this.moveCarousel(n, "left");
            },
            nextSkin: function () {
              const e =
                (this.get("activeSkinIndex") + 1) % this.get("skins.length");
              this.moveCarousel(e, "right");
            },
            skinPipClicked: function (e) {
              const t = this.get("activeSkinIndex");
              t < e
                ? (o.AudioPlugin.getChannel("sfx-ui").playSound(a),
                  this.moveCarousel(e, "right"))
                : t > e &&
                  (o.AudioPlugin.getChannel("sfx-ui").playSound(i),
                  this.moveCarousel(e, "left"));
            },
            skinThumbnailClicked: function (e, t) {
              const n = this.get("activeSkinIndex");
              let s,
                r,
                l = e;
              if ("right" === t) (s = "right"), (r = a);
              else if ("left" === t) {
                const t = this.get("bufferSize");
                (l = this.get("skins.length") - t + e), (s = "left"), (r = i);
              } else if (n < e) (s = "right"), (r = a);
              else {
                if (!(n > e)) return;
                (s = "left"), (r = i);
              }
              o.AudioPlugin.getChannel("sfx-ui").playSound(r),
                this.moveCarousel(l, s);
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "laJTdjkv",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\skins-carousel\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\skins-carousel\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\skins-carousel\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-emblem-overlay"],["flush-element"],["text","\\n"],["block",["if"],[["get",["activeSkinEmblems"]]],null,10],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["champion-skin-name ",["helper",["if"],[["get",["isBaseSkin"]],"base-skin","skin-name"],null]]]],["flush-element"],["text","\\n  "],["append",["unknown",["activeSkinName"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","skins-carousel"],["flush-element"],["text","\\n"],["block",["if"],[["get",["longCarousel"]]],null,8],["text","\\n  "],["open-element","div",[]],["static-attr","class","carousel-track-container"],["dynamic-attr","style",["concat",["width:",["unknown",["carouselWidth"]],"px"]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","carousel-track"],["dynamic-attr","style",["concat",["transform: translateX(",["unknown",["initialOffset"]],"px)"]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["leftCarouselBuffer"]]],null,7],["text","\\n"],["block",["each"],[["get",["skins"]]],null,5],["text","\\n"],["block",["each"],[["get",["rightCarouselBuffer"]]],null,3],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["longCarousel"]]],null,1],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","skin-selection-indicator"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","line line-left"],["flush-element"],["close-element"],["text","\\n  "],["open-element","ul",[]],["static-attr","class","skin-selection-indicator-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["skins"]]],null,0],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","line line-right"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","li",[]],["dynamic-attr","class",["concat",["skin-pip ",["helper",["if"],[["get",["skin","isViewed"]],"skin-pip-selected"],null]]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"skinPipClicked",["get",["index"]]],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":["skin","index"]},{"statements":[["text","    "],["open-element","lol-uikit-arrow-button",[]],["static-attr","direction","right"],["static-attr","class","next-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"nextSkin"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","cdp-skin-thumbnail-gem-overlay"],["flush-element"],["text","\\n            "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["skin","rarityGemPath"]]]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["buffer-wrapper\\n        ",["helper",["if"],[["get",["skin","ownership","owned"]],"owned"],null],"\\n        ",["helper",["unless"],[["get",["skin","ownership","owned"]],"not-owned"],null],"\\n        ",["unknown",["skin","ftpStyleClassName"]],"\\n        ",["helper",["if"],[["get",["skin","isViewed"]],"active-buffer"],null]]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","skin-thumbnail-buffer"],["dynamic-attr","style",["concat",["background-image:url(",["helper",["if"],[["get",["skin","customTilePath"]],["get",["skin","customTilePath"]],["get",["skin","tilePath"]]],null],")"]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"skinThumbnailClicked",["get",["index"]],"right"],null],null],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["skin","rarityGemPath"]]],null,2],["text","      "],["close-element"],["text","\\n"]],"locals":["skin","index"]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","cdp-skin-thumbnail-gem-overlay"],["flush-element"],["text","\\n            "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["skin","rarityGemPath"]]]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["thumbnail-wrapper\\n        ",["helper",["if"],[["get",["skin","ownership","owned"]],"owned"],null],"\\n        ",["helper",["unless"],[["get",["skin","ownership","owned"]],"not-owned"],null],"\\n        ",["unknown",["skin","ftpStyleClassName"]],"\\n        ",["helper",["if"],[["get",["skin","isViewed"]],"active-skin"],null]]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-skin-thumbnail-img"],["dynamic-attr","style",["concat",["background-image:url(",["helper",["if"],[["get",["skin","customTilePath"]],["get",["skin","customTilePath"]],["get",["skin","tilePath"]]],null],")"]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"skinThumbnailClicked",["get",["index"]],"center"],null],null],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["skin","rarityGemPath"]]],null,4],["text","      "],["close-element"],["text","\\n"]],"locals":["skin","index"]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","cdp-skin-thumbnail-gem-overlay"],["flush-element"],["text","\\n            "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["skin","rarityGemPath"]]]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["buffer-wrapper\\n        ",["helper",["unless"],[["get",["skin","playable"]],"not-owned"],null],"\\n        ",["unknown",["skin","ftpStyleClassName"]],"\\n        ",["helper",["if"],[["get",["skin","isViewed"]],"active-buffer"],null]]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","skin-thumbnail-buffer"],["dynamic-attr","style",["concat",["background-image:url(",["helper",["if"],[["get",["skin","customTilePath"]],["get",["skin","customTilePath"]],["get",["skin","tilePath"]]],null],")"]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"skinThumbnailClicked",["get",["index"]],"left"],null],null],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["skin","rarityGemPath"]]],null,6],["text","      "],["close-element"],["text","\\n"]],"locals":["skin","index"]},{"statements":[["text","    "],["open-element","lol-uikit-arrow-button",[]],["static-attr","direction","left"],["static-attr","class","prev-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"prevSkin"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["emblem","emblemPath","large"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["emblem"]},{"statements":[["block",["each"],[["get",["activeSkinEmblems"]]],null,9]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          s = n(63);
        n(102),
          (e.exports = o.Ember.Component.extend({
            classNames: ["tiered-transformations"],
            layout: n(103),
            showcaseComponent: null,
            selectedSkinIndex: o.Ember.computed.alias(
              "showcaseComponent.selectedQuestFormIndex",
            ),
            actions: {
              tierClicked(e) {
                s.SFX.gridClick.play(),
                  this.get("showcaseComponent").setSelectedQuestForm(e);
              },
              onMouseEnterTier(e) {
                const t = this.get("skinTiers");
                this.get("showcaseComponent").overrideSplashPath(
                  t[e].uncenteredSplashPath,
                ),
                  this.get("showcaseComponent").overrideSkinName(t[e].name),
                  this.get("showcaseComponent").overrideSkinDescription(
                    t[e].description,
                  ),
                  this.get("showcaseComponent").overrideSplashVideoPath(
                    t[e].collectionSplashVideoPath,
                  ),
                  this.get("showcaseComponent").overrideAugments(
                    t[e].skinAugments?.augments,
                  );
              },
              onMouseLeaveTier() {
                const e =
                  this.get("skinTiers")[
                    this.get("showcaseComponent.lastSelectedSkinIndex")
                  ];
                this.get("showcaseComponent").overrideSplashPath(
                  e.uncenteredSplashPath,
                ),
                  this.get("showcaseComponent").overrideSkinName(e.name),
                  this.get("showcaseComponent").overrideSkinDescription(
                    e.description,
                  ),
                  this.get("showcaseComponent").overrideSplashVideoPath(
                    e.collectionSplashVideoPath,
                  ),
                  this.get("showcaseComponent").overrideAugments(
                    e.skinAugments?.augments,
                  );
              },
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "I20RlByZ",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\tiered-transformations\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\tiered-transformations\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\tiered-transformations\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","tiered-transformations__container"],["flush-element"],["text","\\n  "],["open-element","hr",[]],["static-attr","class","tiered-transformations__bar"],["flush-element"],["close-element"],["text","\\n"],["block",["each"],[["get",["skinTiers"]]],null,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","tiered-transformations__item"],["flush-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["image ",["helper",["if"],[["get",["tier","ownership","owned"]]," obtained"],null]," ",["helper",["if"],[["helper",["eq"],[["get",["selectedSkinIndex"]],["get",["index"]]],null],"selected"],null]]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"tierClicked",["get",["index"]]],null],null],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"onMouseEnterTier",["get",["index"]]],null],null],["dynamic-attr","onmouseleave",["helper",["action"],[["get",[null]],"onMouseLeaveTier"],null],null],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":["tier","index"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(105);
        e.exports = o.Ember.Component.extend({
          classNames: ["rcp-fe-lol-champion-details-mastery-section"],
          layout: n(106),
          championMasteryService: o.Ember.inject.service("champion-mastery"),
          UXSettings: o.Ember.inject.service("ux-settings"),
          milestoneRewardsData: o.Ember.computed.alias(
            "championMasteryService.seasonMilestoneRequireAndRewards",
          ),
          currentMasteryData: o.Ember.computed.alias(
            "championMasteryService.currentChampionMasteryData",
          ),
          customRewards: o.Ember.computed.alias(
            "championMasteryService.customRewards",
          ),
          championCountByMilestone: o.Ember.computed.alias(
            "championMasteryService.championCountByMilestone",
          ),
          showInfoModal: !1,
          onInit: o.Ember.on("init", function () {
            o.Ember.run.scheduleOnce("afterRender", () =>
              this.sendAction("sectionLoaded", "mastery"),
            );
          }),
          milestoneProgressMap: o.Ember.computed(
            "currentMasteryData",
            "milestoneRewardsData",
            function () {
              const e = this.get("currentMasteryData"),
                t = this.get("milestoneRewardsData");
              if (!t || !Object.keys(t).length) return {};
              const n = this._getRequiredGradeOrDefault(e, t);
              return o.SharedChampionMasteryConstants.calculateGradeRequirements(
                e?.milestoneGrades || [],
                n,
              );
            },
          ),
          currentChampionMarks: o.Ember.computed(
            "currentMasteryData.tokensEarned",
            function () {
              return (
                this.get("currentMasteryData.tokensEarned") ||
                o.SharedChampionMasteryConstants.MINIMUM_MARKS
              );
            },
          ),
          marksRequired: o.Ember.computed(
            "currentMasteryData.markRequiredForNextLevel",
            function () {
              return (
                this.get("currentMasteryData.markRequiredForNextLevel") || 0
              );
            },
          ),
          shouldShowMarkCountContainer: o.Ember.computed(
            "currentChampionMarks",
            function () {
              const e = this.get("currentChampionMarks"),
                t = this.get("marksRequired");
              return e > 0 && e > t;
            },
          ),
          _isDefaultMastery: (e) =>
            e &&
            0 === e.lastPlayTime &&
            0 === e.championPoints &&
            0 === e.championId,
          _getRequiredGradeOrDefault(e, t) {
            return e && !this._isDefaultMastery(e)
              ? e.nextSeasonMilestone.requireGradeCounts
              : t[1].requireGradeCounts;
          },
          actions: {
            showInfoModal() {
              this.set("showInfoModal", !0);
            },
            closeInfoModal() {
              this.set("showInfoModal", !1);
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "p7pITKeZ",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\root\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\root\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\root\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["UXSettings","largeAreaAnimationsEnabled"]]],null,3],["open-element","div",[]],["static-attr","class","cdp-overview"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","crest-container"],["flush-element"],["text","\\n    "],["append",["helper",["mastery-crest-display"],null,[["masteryData","customRewards","masteryRewardData","isAnimationsEnabled"],[["get",["currentMasteryData"]],["get",["customRewards"]],["get",["milestoneRewardsData"]],["get",["UXSettings","largeAreaAnimationsEnabled"]]]]],false],["text","\\n"],["block",["if"],[["get",["shouldShowMarkCountContainer"]]],null,2],["text","    "],["open-element","div",[]],["static-attr","class","info-modal-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showInfoModal"],null],null],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","info-modal-icon"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","mastery-footer"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","footer-right"],["flush-element"],["text","\\n      "],["append",["helper",["milestone-track"],null,[["masteryRewardData","masteryData","customRewards","milestoneProgressMap","championCountByMilestone"],[["get",["milestoneRewardsData"]],["get",["currentMasteryData"]],["get",["customRewards"]],["get",["milestoneProgressMap"]],["get",["championCountByMilestone"]]]]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","footer-left"],["flush-element"],["text","\\n      "],["append",["helper",["milestone-requirements"],null,[["masteryRewardData","seasonalMilestoneLevel","milestoneProgressMap","customRewards"],[["get",["milestoneRewardsData"]],["get",["currentMasteryData","championSeasonMilestone"]],["get",["milestoneProgressMap"]],["get",["customRewards"]]]]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  \\n"],["close-element"],["text","\\n"],["block",["if"],[["get",["showInfoModal"]]],null,0],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["mastery-info-modal"],null,[["masteryRewardData","customRewards","closedModal"],[["get",["milestoneRewardsData"]],["get",["customRewards"]],["helper",["action"],[["get",[null]],"closeInfoModal"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["static-attr","class","mark-count-container-tooltip"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","mark-tooltip-text"],["flush-element"],["text","\\n              "],["append",["unknown",["tra","cdp_mark_container_tooltip"]],false],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","mark-count-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","mark-icon"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","mark-count"],["flush-element"],["text","x "],["append",["unknown",["currentChampionMarks"]],false],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],1],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","uikit-video",[]],["static-attr","class","cdp-background-video"],["static-attr","src","/fe/lol-static-assets/videos/champion-mastery/cm-background-loop.webm"],["static-attr","loop",""],["static-attr","preload",""],["static-attr","autoplay",""],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(108),
          (e.exports = o.Ember.Component.extend({
            classNames: ["mastery-section-crest-display"],
            layout: n(109),
            masteryData: {},
            masteryRewardData: {},
            customRewards: [],
            isAnimationsEnabled: !0,
            locale: o.Ember.computed("tra.metadata.locale.id", function () {
              return (this.get("tra.metadata.locale.id") || "en_US").replace(
                "_",
                "-",
              );
            }),
            milestoneLevel: o.Ember.computed.alias(
              "masteryData.championSeasonMilestone",
            ),
            masteryLevel: o.Ember.computed(
              "masteryData.championLevel",
              function () {
                return (
                  this.get("masteryData.championLevel") ||
                  o.SharedChampionMasteryConstants.MINIMUM_MASTERY_LEVEL
                );
              },
            ),
            currentMilestoneRequirements: o.Ember.computed(
              "milestoneLevel",
              "seasonMilestoneRequireAndRewards",
              function () {
                const e = this.get("milestoneLevel"),
                  t = this.get("seasonMilestoneRequireAndRewards");
                return e && t ? t[e] : {};
              },
            ),
            isAuroraEnabled: o.Ember.computed(
              "customRewards",
              "milestoneLevel",
              function () {
                return (
                  this.get("milestoneLevel") >=
                  (
                    (this.get("customRewards") || []).find(
                      (e) =>
                        e.type ===
                          o.SharedChampionMasteryConstants.MASTERY_LEVEL_TYPES
                            .MILESTONE &&
                        e.rewardValue ===
                          o.SharedChampionMasteryConstants.MASTERY_REWARD_TYPES
                            .AURORA,
                    ) || {}
                  ).level
                );
              },
            ),
            masterylevelText: o.Ember.computed("masteryLevel", function () {
              const e = this.get("masteryLevel");
              return this.get("tra").formatString("cdp_mastery_mastery_level", {
                level: e,
              });
            }),
            currentPoints: o.Ember.computed(
              "masteryData.championPoints",
              function () {
                return this.get("masteryData.championPoints");
              },
            ),
            currentThreshold: o.Ember.computed(
              "masteryData.championPoints",
              "masteryData.championPointsSinceLastLevel",
              function () {
                return (
                  this.get("masteryData.championPoints") -
                  this.get("masteryData.championPointsSinceLastLevel")
                );
              },
            ),
            nextThreshold: o.Ember.computed(
              "masteryData.championPoints",
              "masteryData.championPointsUntilNextLevel",
              function () {
                const e =
                    this.get("masteryData.championPointsUntilNextLevel") || 0,
                  t = this.get("masteryData.championPoints") || 0;
                return Math.abs(t + e);
              },
            ),
            currentPointsDisplayText: o.Ember.computed(
              "currentPoints",
              "locale",
              function () {
                const e = this.get("currentPoints") || 0,
                  t = this.get("locale");
                return e.toLocaleString(t);
              },
            ),
            nextThresholdDisplayText: o.Ember.computed(
              "nextThreshold",
              "locale",
              function () {
                const e = this.get("nextThreshold") || 0,
                  t = this.get("locale");
                return e.toLocaleString(t);
              },
            ),
            marksRequired: o.Ember.computed(
              "masteryData.markRequiredForNextLevel",
              function () {
                return this.get("masteryData.markRequiredForNextLevel") || 0;
              },
            ),
            marksDisplayList: o.Ember.computed(
              "marksRequired",
              "masteryData.tokensEarned",
              function () {
                const e = this.get("masteryData.tokensEarned") || 0,
                  t = this.get("marksRequired"),
                  n = [];
                let o = e;
                for (let e = 0; e < t; e++) n.push({ isCompleted: o-- > 0 });
                return n;
              },
            ),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "zbfV5eEM",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\crest-display\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\crest-display\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\crest-display\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","crest-image"],["flush-element"],["text","\\n  "],["append",["helper",["mastery-crest"],null,[["masteryLevel","isAuroraEnabled","isLevelPlateEnabled","isAnimationsEnabled"],[["get",["masteryLevel"]],["get",["isAuroraEnabled"]],true,["get",["isAnimationsEnabled"]]]]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","mastery-info-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","mastery-level"],["flush-element"],["append",["unknown",["masterylevelText"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","mastery-xp-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","mastery-current-xp"],["flush-element"],["append",["unknown",["currentPointsDisplayText"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","mastery-next-xp"],["flush-element"],["text","/"],["append",["unknown",["nextThresholdDisplayText"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","mastery-marks-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","marks-hover-area"],["flush-element"],["text","\\n"],["block",["each"],[["get",["marksDisplayList"]]],null,1],["block",["uikit-tooltip"],null,[["tooltipPosition","offsetX"],["right",10]],0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","class","marks-hover-area-tooltip"],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","marks-hover-area-tooltip-desc"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","cdp_marks_required_tooltip"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["mark-icon ",["helper",["if"],[["get",["mark","isCompleted"]],"completed"],null]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["mark"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(111),
          (e.exports = o.Ember.Component.extend({
            layout: n(112),
            masteryRewardData: null,
            customRewards: [],
            milestoneRewardList: o.Ember.computed(
              "tra",
              "masteryRewardData",
              "customRewards",
              function () {
                const e = this.get("masteryRewardData"),
                  t = this.get("customRewards"),
                  n = this.get("tra");
                if (!e || !n) return [];
                const s = [];
                for (const [i, a] of Object.entries(e))
                  s.push({
                    milestoneText: this.generateMilestoneText(a.bonus, i),
                    rewards:
                      o.SharedChampionMasteryConstants.generateMilestoneRewards(
                        n,
                        i,
                        a,
                        t,
                      ),
                  });
                return s;
              },
            ),
            generateMilestoneText(e, t = "0") {
              const n = this.get("tra");
              if (e) return n.get("cdp_info_modal_bonus_milestones");
              {
                const e =
                  o.SharedChampionMasteryConstants.convertNumberToRoman(t);
                return n.formatString("cdp_milestone_level", { level: e });
              }
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "On8HQQ+L",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\info-modal\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\info-modal\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\info-modal\\\\index.js\\" "],["text","\\n\\n\\n"],["block",["uikit-modal"],null,[["show","primaryButton","dismissible","okText","type","dismissibleType","onClose"],["true",true,true,["get",["tra","cdp_info_modal_okay_botton"]],"DialogAlert","inside",["get",["closedModal"]]]],2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                            "],["open-element","div",[]],["static-attr","class","reward-boarder"],["flush-element"],["text","\\n                                "],["open-element","img",[]],["dynamic-attr","class",["concat",["reward-image ",["unknown",["reward","rewardType"]]]]],["dynamic-attr","src",["concat",[["unknown",["reward","iconPath"]]]]],["flush-element"],["close-element"],["text","\\n                                "],["open-element","div",[]],["static-attr","class","reward-amount-text"],["flush-element"],["append",["unknown",["reward","rewardQuantityString"]],false],["close-element"],["text","\\n                            "],["close-element"],["text","\\n"]],"locals":["reward"]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","rewards-container-row"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","milestone-text"],["flush-element"],["append",["unknown",["data","milestoneText"]],false],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","reward-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["data","rewards"]]],null,0],["text","                    "],["close-element"],["text","\\n                "],["close-element"],["text","\\n"]],"locals":["data"]},{"statements":[["open-element","div",[]],["static-attr","class","cdp-info-modal"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","header-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","title-flare"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","modal-title main"],["flush-element"],["append",["unknown",["tra","cdp_info_modal_title"]],false],["close-element"],["text","\\n         "],["open-element","div",[]],["static-attr","class","title-flare reverse"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","info-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","rewards-container"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","modal-title"],["flush-element"],["append",["unknown",["tra","cdp_info_modal_reward_title"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["milestoneRewardList"]]],null,1],["text","        "],["close-element"],["text","\\n\\n        "],["open-element","div",[]],["static-attr","class","how-it-works-container"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","modal-title"],["flush-element"],["append",["unknown",["tra","cdp_info_modal_how_title"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","how-description main"],["flush-element"],["append",["unknown",["tra","cdp_info_modal_how_description"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","how-container"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","how-row"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","how-icon mastery"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","how-description"],["flush-element"],["append",["unknown",["tra","cdp_info_modal_how_mastery_description"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","how-row"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","how-icon mark"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","how-description"],["flush-element"],["append",["unknown",["tra","cdp_info_modal_how_mark_description"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","how-row"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","how-icon level-up"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","how-description"],["flush-element"],["append",["unknown",["tra","cdp_info_modal_how_levelup_description"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","how-row"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","how-icon champion-title"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","how-description"],["flush-element"],["append",["unknown",["tra","cdp_info_modal_how_champion_title_description"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","how-description footer"],["flush-element"],["append",["unknown",["tra","cdp_info_modal_how_footer_description"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(114),
          (e.exports = o.Ember.Component.extend({
            classNames: ["mastery-section-milestone-progress"],
            layout: n(115),
            masteryData: {},
            currentPoints: o.Ember.computed.alias(
              "masteryData.championSeasonPoints",
            ),
            nextPoints: o.Ember.computed.alias(
              "masteryData.championPointsRequiredForNextSeasonMilestone",
            ),
            pointsTxt: o.Ember.computed(
              "currentPoints",
              "nextPoints",
              function () {
                return `${this.get("currentPoints")} / ${this.get("nextPoints")}`;
              },
            ),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "KpCh3+Q2",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\milestone-progress\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\milestone-progress\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\milestone-progress\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","mastery-milestone-points-container"],["flush-element"],["text","\\n  "],["append",["unknown",["pointsTxt"]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(117);
        e.exports = o.Ember.Component.extend({
          classNames: ["mastery-footer-milestone-track"],
          layout: n(118),
          masteryRewardData: {},
          masteryData: {},
          milestoneProgressMap: {},
          customRewards: [],
          championCountByMilestone: {},
          hasRewardData: o.Ember.computed.notEmpty("masteryRewardData"),
          shouldShowBonusMilestone: o.Ember.computed.gte(
            "masteryData.championSeasonMilestone",
            o.SharedChampionMasteryConstants.BONUS_MILESTONE_THRESHOLD,
          ),
          currentMilestoneLevel: o.Ember.computed.alias(
            "masteryData.championSeasonMilestone",
          ),
          milestoneList: o.Ember.computed(
            "masteryRewardData",
            "masteryData",
            "milestoneProgressMap",
            "customRewards",
            "championCountByMilestone",
            function () {
              const e = this.get("masteryRewardData"),
                t = this.get("tra");
              if (!e || !t) return [];
              const n = this.get("customRewards"),
                s = this.get("championCountByMilestone"),
                i = this.get("masteryData"),
                a = i
                  ? i.championSeasonMilestone
                  : o.SharedChampionMasteryConstants
                      .MINIMUM_MASTERY_MILESTONE_LEVEL,
                r = [],
                l = { 0: {}, ...e };
              return (
                Object.entries(l).forEach(([e, i]) => {
                  if (!i.bonus) {
                    const l = Number(e),
                      c = this._generateProgressMapForMilestone(i, a, l),
                      u =
                        l ===
                        o.SharedChampionMasteryConstants
                          .MINIMUM_MASTERY_MILESTONE_LEVEL +
                          1
                          ? 94
                          : 136,
                      p = a >= l;
                    r.push({
                      seasonMilestone: l,
                      rewardsInMilestone:
                        o.SharedChampionMasteryConstants.generateMilestoneRewards(
                          t,
                          l,
                          i,
                          n,
                          s,
                        ),
                      milestoneProgressMap: c,
                      milestoneRomanDisplay: `${o.SharedChampionMasteryConstants.convertNumberToRoman(e)}`,
                      milestoneProgressCssPercent:
                        this._calculateMilestoneProgress(c) * (u / 100),
                      isCompleted: p,
                      isMinimumMilestone:
                        l ===
                        o.SharedChampionMasteryConstants
                          .MINIMUM_MASTERY_MILESTONE_LEVEL,
                      progressBarWidth: u,
                    });
                  }
                }),
                r
              );
            },
          ),
          bonusMilestone: o.Ember.computed(
            "shouldShowBonusMilestone",
            "masteryRewardData",
            "masteryData",
            function () {
              const e = this.get("shouldShowBonusMilestone"),
                t = this.get("masteryRewardData");
              if (!e || !t) return {};
              const n = Object.values(t).find((e) => e.bonus) || {},
                s = this.get("masteryData.championSeasonMilestone") || 0;
              return {
                iconPath:
                  o.SharedChampionMasteryConstants.REWARD_TO_ASSET_PATH.MARK,
                rewardString: n.rewardMarks > 1 ? `x${n.rewardMarks}` : "",
                completedCount: Math.abs(
                  o.SharedChampionMasteryConstants.BONUS_MILESTONE_THRESHOLD -
                    s,
                ),
              };
            },
          ),
          bonusMilestoneNextLevel: o.Ember.computed(
            "currentMilestoneLevel",
            function () {
              return (
                (this.get("currentMilestoneLevel") ||
                  o.SharedChampionMasteryConstants
                    .MINIMUM_MASTERY_MILESTONE_LEVEL) + 1
              );
            },
          ),
          _generateProgressMapForMilestone(e, t, n) {
            const o = t + 1 === n,
              s = t >= n,
              { requireGradeCounts: i } = e;
            return o
              ? this.get("milestoneProgressMap")
              : this._generateGradeCompletionMap(i, s);
          },
          _calculateMilestoneProgress(e) {
            if (!e || !Object.keys(e).length) return 100;
            const t = Object.values(e).reduce(
                (e, t) => e + t.requiredGradeCount,
                0,
              ),
              n = Object.values(e).reduce(
                (e, t) => e + t.completedGradeCount,
                0,
              );
            return 0 !== t ? 100 * Math.min(n / t, 1) : 0;
          },
          _generateGradeCompletionMap: (e, t) =>
            e
              ? Object.fromEntries(
                  Object.entries(e).map(([e, n]) => [
                    e,
                    { requiredGradeCount: n, completedGradeCount: t ? n : 0 },
                  ]),
                )
              : {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "e5IJVDXL",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\progression-footer\\\\milestone-track\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\progression-footer\\\\milestone-track\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\progression-footer\\\\milestone-track\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["hasRewardData"]]],null,10]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                  "],["append",["helper",["milestone-tooltip"],null,[["masteryRewardData","customRewards","milestoneProgressMap","seasonMilestone","showNextMilestoneRewards","championCountByMilestone"],[["get",["masteryRewardData"]],["get",["customRewards"]],["get",["milestone","milestoneProgressMap"]],["get",["milestone","seasonMilestone"]],false,["get",["championCountByMilestone"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                          "],["open-element","div",[]],["static-attr","class","completed-overlay"],["flush-element"],["close-element"],["text","\\n                          "],["open-element","img",[]],["static-attr","class","completed-check-pip"],["static-attr","src","/fe/lol-static-assets/images/champion-mastery/reward-completed.png"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                      "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward-boarder ",["helper",["if"],[["get",["milestone","isCompleted"]],"completed"],null]]]],["flush-element"],["text","\\n                        "],["open-element","img",[]],["dynamic-attr","class",["concat",["reward-image ",["unknown",["reward","rewardType"]]]]],["dynamic-attr","src",["concat",[["unknown",["reward","iconPath"]]]]],["flush-element"],["close-element"],["text","\\n                        "],["open-element","div",[]],["static-attr","class","reward-amount-text"],["flush-element"],["append",["unknown",["reward","rewardQuantityString"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["milestone","isCompleted"]]],null,1],["text","                      "],["close-element"],["text","\\n"]],"locals":["reward"]},{"statements":[["text","                  "],["open-element","div",[]],["static-attr","class","reward-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["milestone","rewardsInMilestone"]]],null,2],["text","                  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","milestone-progress-bar"],["flush-element"],["text","\\n                "],["open-element","svg",[]],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["dynamic-attr","width",["concat",[["unknown",["milestone","progressBarWidth"]]]]],["static-attr","height","8"],["dynamic-attr","viewBox",["concat",["0 0 ",["unknown",["milestone","progressBarWidth"]]," 8"]]],["static-attr","fill","none"],["flush-element"],["text","\\n                    "],["open-element","rect",[]],["static-attr","opacity","0.5"],["static-attr","x","0"],["static-attr","y","0.5"],["dynamic-attr","width",["concat",[["unknown",["milestone","progressBarWidth"]]]]],["static-attr","height","7"],["static-attr","stroke","#010A13"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","rect",[]],["static-attr","x","0"],["static-attr","y","1"],["dynamic-attr","width",["concat",[["unknown",["milestone","progressBarWidth"]]]]],["static-attr","height","6"],["static-attr","fill","#1E2328"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","rect",[]],["static-attr","opacity","0.3"],["static-attr","x","2"],["static-attr","y","2"],["dynamic-attr","width",["concat",[["unknown",["milestone","progressBarWidth"]]]]],["static-attr","height","4"],["static-attr","stroke","#010A13"],["static-attr","stroke-width","2"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","rect",[]],["static-attr","x","0"],["static-attr","y","1.5"],["dynamic-attr","width",["concat",[["unknown",["milestone","progressBarWidth"]]]]],["static-attr","height","5"],["static-attr","stroke","#3C3C41"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","rect",[]],["static-attr","x","0"],["static-attr","y","3"],["dynamic-attr","width",["concat",[["unknown",["milestone","milestoneProgressCssPercent"]]]]],["static-attr","height","2"],["static-attr","fill","#0A96AA"],["flush-element"],["close-element"],["text","\\n                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","milestone-container"],["flush-element"],["text","\\n                "],["open-element","div",[]],["dynamic-attr","class",["concat",["milestone-plate ",["helper",["if"],[["get",["milestone","isCompleted"]],"completed"],null]]]],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["dynamic-attr","class",["concat",["milestone-background ",["helper",["if"],[["get",["milestone","isCompleted"]],"completed"],null]]]],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["dynamic-attr","class",["concat",["milestone-text ",["helper",["if"],[["get",["milestone","isCompleted"]],"completed"],null]]]],["flush-element"],["append",["unknown",["milestone","milestoneRomanDisplay"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["milestone","rewardsInMilestone"]]],null,3],["block",["uikit-tooltip"],null,[["type","tooltipPosition","offsetY"],["system","top",-65]],0],["text","            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","starting-milestone"],["flush-element"],["text","\\n                  "],["open-element","svg",[]],["static-attr","class","reward-star-icon"],["static-attr","width","12"],["static-attr","height","11"],["static-attr","viewBox","0 0 12 11"],["static-attr","fill","none"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["flush-element"],["text","\\n                  "],["open-element","path",[]],["static-attr","d","M5.9999 0.400024L7.5999 4.40002H11.5999L8.3999 6.80002L9.2915 10.8L5.9999 8.40002L2.70831 10.8L3.5999 6.80002L0.399902 4.40002H4.3999L5.9999 0.400024Z"],["flush-element"],["close-element"],["text","\\n                  "],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["milestone","isMinimumMilestone"]]],null,5,4]],"locals":["milestone"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","milestone-progress-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["milestoneList"]]],null,6],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["milestone-tooltip"],null,[["masteryRewardData","customRewards","milestoneProgressMap","seasonMilestone"],[["get",["masteryRewardData"]],["get",["customRewards"]],["get",["milestoneProgressMap"]],["get",["bonusMilestoneNextLevel"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","bonus-milestone-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","reward-boarder"],["flush-element"],["text","\\n          "],["open-element","img",[]],["static-attr","class","reward-image"],["dynamic-attr","src",["concat",[["unknown",["bonusMilestone","iconPath"]]]]],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","bonus-milestone-counter"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","bonus-milestone-pill"],["flush-element"],["text","\\n              "],["open-element","svg",[]],["static-attr","class","repeatable-arrow"],["static-attr","viewBox","0 0 10 7"],["flush-element"],["text","\\n                  "],["open-element","path",[]],["static-attr","class","repeatable-arrow path"],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M6.38908 1.77185V0.399902L3.9833 2.31037L6.38956 4.22084V2.85168C6.81026 2.85942 7.21055 3.02847 7.50237 3.32164C7.79419 3.61481 7.95364 4.00809 7.94565 4.41496C7.93765 4.82183 7.76286 5.20897 7.45972 5.4912C7.15659 5.77343 6.74995 5.92765 6.32925 5.91991H3.33337C2.91248 5.91991 2.50883 5.75821 2.21121 5.47037C1.9136 5.18254 1.7464 4.79215 1.7464 4.3851C1.7464 3.97804 1.9136 3.58765 2.21121 3.29982C2.50883 3.01199 2.91248 2.85028 3.33337 2.85028V1.77045C2.61636 1.77045 1.92872 2.04593 1.42171 2.53627C0.914713 3.02661 0.629883 3.69165 0.629883 4.3851C0.629883 5.07854 0.914713 5.74359 1.42171 6.23393C1.92872 6.72427 2.61636 6.99974 3.33337 6.99974H6.32925C6.68409 7.00357 7.03623 6.93977 7.36557 6.81198C7.69491 6.68419 7.995 6.49492 8.24871 6.25496C8.50242 6.01501 8.70477 5.72907 8.84422 5.41349C8.98367 5.0979 9.05748 4.75884 9.06144 4.41566C9.0654 4.07249 8.99943 3.73192 8.8673 3.4134C8.73517 3.09488 8.53947 2.80465 8.29136 2.55928C8.04325 2.31391 7.7476 2.1182 7.42129 1.98334C7.09498 1.84847 6.7444 1.77708 6.38956 1.77325L6.38908 1.77185Z"],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","count"],["flush-element"],["append",["unknown",["bonusMilestone","completedCount"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition","offsetY"],["system","top",-10]],8],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text"," \\n"],["block",["if"],[["get",["shouldShowBonusMilestone"]]],null,9,7]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(120),
          (e.exports = o.Ember.Component.extend({
            classNames: ["mastery-footer-milestone-requirements"],
            layout: n(121),
            masteryRewardData: {},
            customRewards: [],
            seasonalMilestoneLevel: null,
            milestoneProgressMap: null,
            milestoneLevelText: o.Ember.computed(
              "seasonalMilestoneLevel",
              "tra",
              function () {
                const e =
                  this.get("seasonalMilestoneLevel") ||
                  o.SharedChampionMasteryConstants
                    .MINIMUM_MASTERY_MILESTONE_LEVEL;
                if (
                  e ===
                  o.SharedChampionMasteryConstants
                    .MINIMUM_MASTERY_MILESTONE_LEVEL
                )
                  return this.get("tra").get("cdp_minimum_milestone");
                if (
                  e >=
                  o.SharedChampionMasteryConstants.BONUS_MILESTONE_THRESHOLD
                )
                  return this.get("tra").get("cdp_bonus_milestone");
                {
                  const t =
                    o.SharedChampionMasteryConstants.convertNumberToRoman(e);
                  return this.get("tra").formatString("cdp_milestone_level", {
                    level: t,
                  });
                }
              },
            ),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "Cqrut+w8",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\progression-footer\\\\milestone-requirements\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\progression-footer\\\\milestone-requirements\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\progression-footer\\\\milestone-requirements\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","milestone-season-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","milestone-level-text"],["flush-element"],["append",["unknown",["milestoneLevelText"]],false],["close-element"],["text","\\n    "],["append",["unknown",["season-info"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","grade-tooltip-area"],["flush-element"],["text","\\n    "],["append",["helper",["grade-display"],null,[["milestoneProgressMap"],[["get",["milestoneProgressMap"]]]]],false],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["milestone-tooltip"],null,[["masteryRewardData","milestoneProgressMap","seasonMilestone","customRewards","hideTitle","hideNextLevelRewards"],[["get",["masteryRewardData"]],["get",["milestoneProgressMap"]],["get",["seasonalMilestoneLevel"]],["get",["customRewards"]],true,true]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          s = n(123);
        n(124),
          (e.exports = o.Ember.Component.extend({
            classNames: ["mastery-footer-season-info"],
            layout: n(125),
            championMasteryService: o.Ember.inject.service("champion-mastery"),
            currentSeason: o.Ember.computed.readOnly(
              "championMasteryService.currentSeason",
            ),
            hasSeasonData: o.Ember.computed.notEmpty("currentSeason"),
            seasonInfo: o.Ember.computed("tra", "currentSeason", function () {
              const e = this.get("currentSeason");
              if (e) {
                const { seasonEnd: t } = e,
                  { currentSplit: n } = e.metadata,
                  o = this.get("tra").formatString("cdp_season_split_string", {
                    splitNumber: n,
                  }),
                  { datePortionText: i = "", timePortionText: a = "" } = (0,
                  s.convertDateStringToFullDisplayFormat)(t, this.get("tra"));
                return {
                  splitNumberTra: o,
                  seasonEndTra: this.get("tra").formatString(
                    "cdp_season_split_tooltip_end_data_time",
                    { datePortionText: i, timePortionText: a },
                  ),
                };
              }
            }),
          }));
      },
      (e, t) => {
        "use strict";
        function n(e = "en_US") {
          return (
            "ar_AE" === e && (e = "ar-tn"), e.toLowerCase().replace("_", "-")
          );
        }
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.convertDateStringToFullDisplayFormat = function (e, t) {
            const o = n((t && t.metadata.locale.id) || void 0),
              s = new Date(e),
              i = s.toLocaleDateString(o, { dateStyle: "medium" }),
              a = s.toLocaleTimeString(o, {
                timeZoneName: "short",
                hour: "numeric",
                minute: "numeric",
              });
            return { datePortionText: i, timePortionText: a };
          }),
          (t.formatLocaleString = n);
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "d/XvhVGF",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\progression-footer\\\\season-info\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\progression-footer\\\\season-info\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\progression-footer\\\\season-info\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["hasSeasonData"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["static-attr","padding","small"],["static-attr","class","season-info-tooltip"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","season-tooltip-text title"],["flush-element"],["append",["unknown",["tra","cdp_season_split_tooltip_title"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","season-tooltip-text data-time"],["flush-element"],["append",["unknown",["seasonInfo","seasonEndTra"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","season-tooltip-text description"],["flush-element"],["append",["unknown",["tra","cdp_season_split_tooltip_description"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","season-split-text"],["flush-element"],["append",["unknown",["seasonInfo","splitNumberTra"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","season-clock"],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","left"]],0]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        const s = "/lol-store",
          i = "v1/catalog/sales",
          a = o.DataBinding.bindTo((0, o.getProvider)().getSocket());
        e.exports = o.Ember.Service.extend({
          init: function () {
            this._super(...arguments),
              this.set("salesData", []),
              this.observeSalesData();
          },
          willDestroy() {
            this._super(...arguments), a.removeObserver(`${s}/${i}`, this);
          },
          observeSalesData: function () {
            a.observe(`${s}/${i}`, this, (e) => {
              Array.isArray(e) && this.set("salesData", e);
            });
          },
          getIsItemOnSale: function (e) {
            return this.getItemOnSale(e).hasOwnProperty("prices");
          },
          getItemOnSale: function (e) {
            const t = this.get("salesData").find(
              (t) => t.item.itemId === e,
              this,
            );
            return t && t.hasOwnProperty("sale") ? t.sale : {};
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          s = n(59),
          i = n(95),
          a = n(41);
        const r = (0, o.EmberDataBinding)({
          Ember: o.Ember,
          websocket: (0, o.getProvider)().getSocket(),
          boundProperties: {
            champion: "/lol-game-data/assets/v1/champions/{{championId}}.json",
            regionLocale: "/riotclient/region-locale",
            webAssetsBasePath:
              "/data-store/v1/system-settings/web_assets_base_path",
            session: "/lol-login/v1/session",
            summoner: "/lol-summoner/v1/current-summoner",
            augmentsInventory: "/lol-inventory/v2/inventory/SKIN_AUGMENT",
            summonerChampion:
              "/lol-champions/v1/inventories/{{session.summonerId}}/champions/{{championId}}",
            audioSettings: "/lol-settings/v1/local/lol-audio",
            potatoModeSetting: "/lol-settings/v2/local/lol-user-experience",
            storeCustomerEnabled:
              "/lol-platform-config/v1/namespaces/ClientSystemStates/storeCustomerEnabled",
            jmxConfig: "/lol-platform-config/v1/namespaces/LcuChampionDetails",
          },
        });
        e.exports = o.Ember.Service.extend(r, {
          enterChampionPurchaseFlow(e) {
            this.get("jmxConfig.PawEnabled")
              ? this.openPawChampionModal(e)
              : this.openStoreForChampion(e);
          },
          enterSkinPurchaseFlow(e) {
            this.get("jmxConfig.PawEnabled")
              ? e.tags && e.tags.includes(i.StoreSkinTypes.QUEST_SKIN_TAG)
                ? this.openPawTemplateModal(e)
                : this.openPawSkinModal(e.itemId)
              : this.openStoreForSkin(e.itemId);
          },
          openStoreForChampion(e) {
            o.Router.navigateTo("rcp-fe-lol-store", {
              items: [{ inventoryType: "CHAMPION", itemId: e }],
              page: "champions",
            }).then(() => {
              this.get("destroyComponent")();
            });
          },
          openStoreForSkin(e) {
            o.Router.navigateTo("rcp-fe-lol-store", {
              items: [{ inventoryType: "CHAMPION_SKIN", itemId: e }],
              page: "skins",
            }).then(() => {
              this.get("destroyComponent")();
            });
          },
          openPawChampionModal(e) {
            o.PawPlugin.createPAWModal(
              { itemId: e, inventoryType: a.PAW.INVENTORY_TYPES.CHAMPION },
              s.CDP_PAW_ID,
              a.PAW.MODAL_TYPES.CHAMPION_MODAL,
              this.element,
            );
          },
          openPawTemplateModal(e) {
            const t = {
              templateType: a.PAW.TEMPLATE_TYPES.LARGE_TWO_COLUMN_LANDSCAPE,
            };
            o.PawPlugin.createPawTemplateModalAsync(
              e.offerId,
              t,
              s.CDP_PAW_ID,
            ).then(() => {
              o.PawPlugin.getBaseSkinLineData(e.offerId).then((e) => {
                o.PawPlugin.populatePawTemplateModal(e);
              });
            });
          },
          openPawSkinModal(e) {
            o.PawPlugin.createPAWModal(
              { itemId: e, inventoryType: a.PAW.INVENTORY_TYPES.CHAMPION_SKIN },
              s.CDP_PAW_ID,
              a.PAW.MODAL_TYPES.SKIN_VIEWER_MODAL,
              this.element,
            );
          },
          willDestroy() {
            this._super(...arguments),
              this.set("api", null),
              this.set("champion", null),
              this.set("regionLocale", null),
              this.set("webAssetsBasePath", null),
              this.set("session", null),
              this.set("summoner", null),
              this.set("skins", null),
              this.set("audioSettings", null),
              this.set("animationSettings", null);
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        const s = (0, o.EmberDataBinding)({
          Ember: o.Ember,
          websocket: (0, o.getProvider)().getSocket(),
          logPrefix: "service:collections",
          basePaths: {
            collections: "/lol-collections",
            summoner: "/lol-summoner",
          },
          boundProperties: {
            localSummonerData: { api: "summoner", path: "v1/current-summoner" },
            championMasteryInfo: {
              api: "collections",
              path: "v1/inventories/{{localPlayerPuuid}}/champion-mastery",
            },
          },
        });
        e.exports = o.Ember.Service.extend(s, {
          championService: o.Ember.inject.service("champion"),
          champion: o.Ember.computed.alias("championService.champion"),
          localPlayerPuuid: o.Ember.computed.alias("localSummonerData.puuid"),
          currentChampionMasteries: o.Ember.computed(
            "championMasteryInfo",
            "champion",
            function () {
              const e = this.get("championMasteryInfo"),
                t = this.get("champion");
              if (!e || !t) return null;
              for (let n = 0; n < e.length; n++) {
                const o = e.objectAt(n);
                if (o.championId === t.id) return o;
              }
            },
          ),
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          s = n(59),
          i = n(63);
        const a = "/lol-statstones",
          r = "v2/player-statstones-self",
          l = "v1/featured-champion-statstones";
        e.exports = o.Ember.Service.extend({
          championService: o.Ember.inject.service("champion"),
          championId: o.Ember.computed.alias("championService.championId"),
          milestoneCompletionLevel: s.MILESTONE_COMPLETION_LEVEL,
          statstoneData: null,
          featuredStatstones: null,
          packItemIdToContainingPackItemId: null,
          init: function () {
            this._super(...arguments),
              (this.binding = o.DataBinding.bindTo(
                (0, o.getProvider)().getSocket(),
              )),
              this.initDataBindings();
          },
          willDestroy() {
            this._super(...arguments);
            const e = this.get("championId");
            this.binding.removeObserver(`${a}/${r}/${e}`, this),
              this.binding.removeObserver(`${a}/${l}/${e}`, this),
              (this.binding = null);
          },
          initDataBindings: function () {
            this.initEternalsData(),
              this.initFeaturedData(),
              this.initPackMappings(),
              this.observeEternalsData(),
              this.observeFeaturedStatstones();
          },
          initEternalsData: function () {
            const e = this.get("championId");
            if (e)
              return this.binding
                .get(`${a}/${r}/${e}`, { skipCache: !0 })
                .then((e) => {
                  this.set("statstoneData", e);
                });
          },
          initFeaturedData: function () {
            const e = this.get("championId");
            if (e)
              return this.binding
                .get(`${a}/${l}/${e}`, { skipCache: !0 })
                .then((e) => {
                  this.set("featuredStatstones", e);
                });
          },
          initPackMappings: function () {
            if (!this.get("packItemIdToContainingPackItemId"))
              return this.binding
                .get("/lol-game-data/assets/v1/statstones.json")
                .then((e) => {
                  this.set(
                    "packItemIdToContainingPackItemId",
                    e.packItemIdToContainingPackItemId,
                  );
                });
          },
          observeEternalsData: function () {
            const e = this.get("championId");
            e &&
              this.binding.observe(`${a}/${r}/${e}`, this, (e) => {
                this.set("statstoneData", e), this.initFeaturedData();
              });
          },
          observeFeaturedStatstones: function () {
            const e = this.get("championId");
            e &&
              this.binding.observe(`${a}/${l}/${e}`, this, (e) => {
                this.set("featuredStatstones", e);
              });
          },
          setFeaturedStatstone(e, t, n) {
            const s = { index: n, existingFeatured: e };
            return (
              this.binding
                .get("/lol-summoner/v1/current-summoner")
                .then((e) => {
                  const s = {
                    puuid: e.puuid,
                    statstoneId: t.statstoneId,
                    index: n,
                    type: "eternal_featured",
                  };
                  o.Telemetry.sendCustomData("eternals_telemetry_event", s);
                }),
              this.binding.post(
                `${a}/${l}/${t.boundChampionItemId}/${t.statstoneId}`,
                s,
              )
            );
          },
          stripRarityFromCategory(e) {
            const t = e.indexOf("_");
            return -1 !== t && (e = e.substring(0, t)), e;
          },
          isMilestonesCompleted: (e) => e >= s.MILESTONE_COMPLETION_LEVEL,
          playSoundForStatstone(e) {
            i.SFX[e].play();
          },
          pauseSoundForStatstone(e) {
            i.SFX[e].stop();
          },
          getStatstoneCompletionLevel(e) {
            switch (e) {
              case 0:
              case 1:
              case 2:
                return 1;
              case 3:
              case 4:
                return 2;
              default:
                return 3;
            }
          },
          statstoneRarity: function (e) {
            return e ? s.UNIQUE_NAME : s.COMMON_NAME;
          },
          getContainingPackItemId: function (e) {
            const t = this.get("packItemIdToContainingPackItemId")[e];
            return t ? t[0] : null;
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        e.exports = o.Ember.Service.extend({
          largeAreaAnimationsEnabled: o.Ember.computed.alias(
            "UXSettings.largeAreaAnimationsEnabled",
          ),
          onInit: o.Ember.on("init", function () {
            (this._uxSettingsListener = this._uxSettingsObserver.bind(this)),
              o.UXSettings.addObserver(this._uxSettingsListener);
          }),
          onWillDestroy: o.Ember.on("willDestroy", function () {
            o.UXSettings.removeObserver(this._uxSettingsListener);
          }),
          _uxSettingsObserver: function (e) {
            this.set("UXSettings", e);
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        const s = [
          {
            name: "tieredSkins",
            path: "lol.client_settings.tieredSkins",
            default: {},
          },
        ];
        e.exports = o.Ember.Service.extend({
          init: function () {
            this._super(...arguments),
              (this.clientConfigDataBinding = (0, o.DataBinding)(
                "/lol-client-config",
                o.socket,
              )),
              s.forEach((e) => {
                const t = `v3/client-config/${e.path}`;
                this.clientConfigDataBinding.observe(t, this, (t) =>
                  this.setProperty(e, t),
                );
              });
          },
          setProperty(e, t) {
            let n = e.default;
            "" !== t && (n = t), this.set(e.name, n);
          },
          willDestroy() {
            this._super(...arguments),
              s.forEach((e) => {
                const t = `v3/client-config/${e.path}`;
                this.clientConfigDataBinding.unobserve(t, this);
              });
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        const s = "v1/skins";
        e.exports = o.Ember.Service.extend({
          init: function () {
            this._super(...arguments),
              (this.eventHubDataBinding = (0, o.DataBinding)(
                "/lol-event-hub",
                o.socket,
              )),
              this.eventHubDataBinding.observe(s, this, (e) => {
                this.set("skinsFromActiveEvents", e);
              });
          },
          willDestroy() {
            this._super(...arguments),
              this.eventHubDataBinding.unobserve(s, this);
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        const s = (0, o.EmberDataBinding)({
          Ember: o.Ember,
          websocket: (0, o.getProvider)().getSocket(),
          logPrefix: "service:collections",
          basePaths: {
            championMastery: "/lol-champion-mastery",
            seasons: "/lol-seasons",
          },
          boundProperties: {
            championMasteryInfo: {
              api: "championMastery",
              path: "/v1/local-player/champion-mastery-sets-and-rewards",
            },
            currentLoLSeason: {
              api: "seasons",
              path: "/v1/season/product/LOL",
            },
          },
        });
        e.exports = o.Ember.Service.extend(s, {
          championService: o.Ember.inject.service("champion"),
          championId: o.Ember.computed.alias("championService.championId"),
          championMasteries: o.Ember.computed.alias(
            "championMasteryInfo.championMasteries",
          ),
          seasonMilestoneRequireAndRewards: o.Ember.computed.alias(
            "championMasteryInfo.seasonMilestoneRequireAndRewards",
          ),
          defaultChampionMasteryData: o.Ember.computed.alias(
            "championMasteryInfo.defaultChampionMastery",
          ),
          customRewards: o.Ember.computed.alias(
            "championMasteryInfo.customRewards",
          ),
          championCountByMilestone: o.Ember.computed.alias(
            "championMasteryInfo.championCountByMilestone",
          ),
          currentChampionMasteryData: o.Ember.computed(
            "championMasteries.[]",
            "championId",
            "defaultChampionMasteryData",
            function () {
              const e = this.get("championMasteries") || [],
                t = this.get("championId"),
                n = this.get("defaultChampionMasteryData");
              return (e && t && e.find((e) => e.championId === t)) || n;
            },
          ),
          currentSeason: o.Ember.computed("currentLoLSeason", function () {
            return this.get("currentLoLSeason");
          }),
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          s = n(63);
        n(135),
          (e.exports = o.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-featured-statstones"],
            layout: n(136),
            statstonesService: o.Ember.inject.service("statstones"),
            featured: null,
            selection: null,
            caller: null,
            featuredStatstones: o.Ember.computed.alias("featured"),
            selectedStatsone: o.Ember.computed.alias("selection"),
            createFeatureErrorToast() {
              const e = o.TemplateHelper.contentBlockNotification(
                this.get("tra.cdp_progression_statstones_feature_error"),
                "lol-eternals-feature-failure",
              );
              o.ToastManager.add({
                type: "DialogToast",
                data: { contents: e, dismissable: !0 },
                timing: "slow",
              });
            },
            actions: {
              setFeatured(e) {
                const t = this.get("selectedStatsone"),
                  n = this.get("featuredStatstones"),
                  i = this.get("caller");
                return (
                  s.SFX.buttonGoldClick.play(),
                  this.get("statstonesService")
                    .setFeaturedStatstone(n, t, e)
                    .catch((e) => {
                      this.createFeatureErrorToast();
                    })
                    .finally(() => {
                      o.FlyoutManager.sendEvent(i, "hide");
                    })
                );
              },
              mouseOver() {
                s.SFX.gridHover.play();
              },
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "3ro+7aG+",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\feature-flyout\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\feature-flyout\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\feature-flyout\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-dialog-frame",[]],["static-attr","class","cdp-feature-flyout"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","class","cdp-feature-flyout-content"],["flush-element"],["text","\\n  "],["open-element","h5",[]],["static-attr","class","cdp-feature-flyout-title"],["flush-element"],["append",["unknown",["tra","cdp_statstones_feature_title"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["featuredStatstones"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","cdp-feature-flyout-item"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"setFeatured",["get",["index"]]],null],null],["dynamic-attr","onmouseover",["helper",["action"],[["get",[null]],"mouseOver"],null],null],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-feature-flyout-statstone-image"],["flush-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","cdp-feature-flyout-statstone-statue"],["dynamic-attr","src",["unknown",["statstone","imageUrl"]],null],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-feature-flyout-featured"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-feature-flyout-statstone-info"],["flush-element"],["text","\\n        "],["open-element","h5",[]],["static-attr","class","cdp-feature-flyout-statstone-value"],["flush-element"],["append",["unknown",["statstone","formattedValue"]],false],["close-element"],["text","\\n        "],["open-element","p",[]],["static-attr","class","cdp-feature-flyout-statstone-name"],["flush-element"],["append",["unknown",["statstone","name"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-feature-flyout-statstone-slot-numbner"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["statstone","index"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var o = n(1),
          s = n(63);
        n(138);
        const i = o.UIKit.getFlyoutManager();
        var a = o.Ember.Component.extend({
          classNames: ["quest-forms-flyout"],
          isShow: !1,
          layout: n(139),
          selectedSkinIndex: o.Ember.computed.alias(
            "showcaseComponent.selectedQuestFormIndex",
          ),
          skinTiers: null,
          caller: null,
          showcaseComponent: null,
          isTieredSkin: !1,
          overrideTargetSplashPath(e) {
            const t = this.get("skinTiers");
            this.get("showcaseComponent").overrideSplashPath(
              t[e].uncenteredSplashPath,
            ),
              this.get("showcaseComponent").overrideSkinName(t[e].name),
              this.get("showcaseComponent").overrideSkinDescription(
                t[e].description,
              ),
              this.get("showcaseComponent").overrideSplashVideoPath(
                t[e].collectionSplashVideoPath,
              ),
              this.get("showcaseComponent").overrideAugments(
                t[e].skinAugments?.augments,
              );
          },
          actions: {
            tierClicked(e) {
              if (
                !this.get("skinTiers")[e].ownership.owned &&
                !this.get("isTieredSkin")
              )
                return;
              s.SFX.gridClick.play();
              const t = this.get("caller");
              i.sendEvent(t, "hide"),
                this.get("showcaseComponent").setSelectedQuestForm(e),
                this.get("showcaseComponent").hideFlyoutModal();
            },
            onMouseEnterTier(e) {
              this.overrideTargetSplashPath(e), s.SFX.gridHover.play();
            },
            onMouseLeaveTier() {
              const e =
                this.get("skinTiers")[
                  this.get("showcaseComponent.lastSelectedSkinIndex")
                ] ?? this.get("showcaseComponent.questSkinInfo");
              this.get("showcaseComponent").overrideSplashPath(
                e.uncenteredSplashPath,
              ),
                this.get("showcaseComponent").overrideSkinName(e.name),
                this.get("showcaseComponent").overrideSkinDescription(
                  e.description,
                ),
                this.get("showcaseComponent").overrideSplashVideoPath(
                  e.collectionSplashVideoPath,
                ),
                this.get("showcaseComponent").overrideAugments(
                  e.skinAugments?.augments,
                );
            },
          },
        });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "DFlNYJEI",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\quest-forms-popup\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\quest-forms-popup\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\quest-forms-popup\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["quest-forms ",["helper",["if"],[["get",["isTieredSkin"]],"tiered"],null]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["skinTiers"]]],null,4],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","span",[]],["static-attr","class","quest-form-tier-lock"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","span",[]],["static-attr","class","quest-form-tier-number"],["flush-element"],["append",["helper",["concat-tra"],["cdp_skins_quest_form_stage_",["get",["tier","stage"]]],null],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["tier","ownership","owned"]]],null,1,0]],"locals":[]},{"statements":[["text","            "],["open-element","span",[]],["static-attr","class","quest-form-tier-emblem"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["quest-form-tier form-",["get",["index"]],"  ",["helper",["if"],[["helper",["eq"],[["get",["selectedSkinIndex"]],["get",["index"]]],null],"selected"],null]," ",["helper",["if"],[["get",["tier","ownership","owned"]],"unlocked"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"tierClicked",["get",["index"]]],null],null],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"onMouseEnterTier",["get",["index"]]],null],null],["dynamic-attr","onmouseleave",["helper",["action"],[["get",[null]],"onMouseLeaveTier"],null],null],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","quest-form-tier-name"],["flush-element"],["append",["unknown",["tier","shortName"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["isTieredSkin"]]],null,3,2],["text","      "],["close-element"],["text","\\n"]],"locals":["tier","index"]}],"hasPartials":false}',
          meta: {},
        });
      },
    ],
    t = {};
  function n(o) {
    var s = t[o];
    if (void 0 !== s) return s.exports;
    var i = (t[o] = { id: o, loaded: !1, exports: {} });
    return e[o].call(i.exports, i, i.exports, n), (i.loaded = !0), i.exports;
  }
  (n.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) return window;
    }
  })()),
    (n.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (() => {
      "use strict";
      var e,
        t = (e = n(1)) && e.__esModule ? e : { default: e };
      const o = "rcp-fe-lol-champion-details",
        s = document.currentScript.ownerDocument;
      const i = window.getPluginAnnounceEventName(o);
      s.addEventListener(
        i,
        function (e) {
          (0, e.registrationHandler)(function (e) {
            return t.default
              .init(e, {
                AudioPlugin: (e) => e.get("rcp-fe-audio"),
                ComponentFactory: (e) =>
                  e.get("rcp-fe-common-libs").getComponentFactory("1"),
                DataBinding: (e) =>
                  e
                    .get("rcp-fe-common-libs")
                    .getDataBinding("rcp-fe-lol-champion-details"),
                Ember: (e) => e.get("rcp-fe-ember-libs").getEmber(),
                EmberDataBinding: (e) =>
                  e
                    .get("rcp-fe-ember-libs")
                    .getEmberDataBinding("rcp-fe-lol-champion-details"),
                EternalsApi: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Eternals(),
                FlyoutManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getFlyoutManager(),
                HomeRegistry: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_HomeRegistry(),
                logger: (e) => e.get("rcp-fe-common-libs").logging.create(o),
                Navigation: (e) => e.get("rcp-fe-lol-navigation"),
                PawPlugin: (e) => e.get("rcp-fe-lol-paw"),
                Router: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Router(),
                SharedComponents: (e) => e.get("rcp-fe-lol-shared-components"),
                SharedChampionMasteryConstants: (e) =>
                  e
                    .get("rcp-fe-lol-shared-components")
                    .getApi_SharedChampionMasteryConstants(),
                socket: (e) => e.getSocket(),
                Telemetry: (e) => e.get("rcp-fe-common-libs").getTelemetry(1),
                TemplateHelper: (e) =>
                  e.get("rcp-fe-lol-uikit").getTemplateHelper(),
                ToastManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getToastManager(),
                TooltipManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getTooltipManager(),
                UIKit: (e) => e.get("rcp-fe-lol-uikit"),
                UXSettings: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_UXSettings(),
              })
              .then(() =>
                t.default.add({
                  EmberAddons: (e) =>
                    e.get("rcp-fe-ember-libs").getSharedEmberAddons(),
                  EmberApplicationFactory: e
                    .get("rcp-fe-ember-libs")
                    .getEmberApplicationFactory(),
                }),
              )
              .then(function () {
                const e = new (0, n(2).default)(new (0, n(3).default)());
                return (
                  t.default.HomeRegistry.resolveChampionDetailsHandler((t) =>
                    e.show(t),
                  ),
                  e
                );
              });
          });
        },
        { once: !0 },
      );
    })();
})();
