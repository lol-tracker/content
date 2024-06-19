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
        const s = {
          init: function (e, n) {
            return (t = e), this.add(n);
          },
          _getValue: function (e, n) {
            let s;
            return (
              "function" == typeof n
                ? ((s = n(t)),
                  s ||
                    console.warn(
                      "The function for key " + e + " returned a falsy value: ",
                      s,
                    ))
                : "string" == typeof n
                  ? ((s = t.get(n)),
                    s ||
                      console.warn(
                        "The provider `get` invocation for the key " +
                          e +
                          " returned a falsy value: ",
                        s,
                      ))
                  : "object" == typeof n && (s = n),
              s
            );
          },
          add: function (e) {
            e = e || {};
            const t = [],
              n = this;
            return (
              Object.keys(e).forEach(function (s) {
                const o = e[s],
                  i = n._getValue(s, o);
                i && i.then
                  ? (i.then(function (e) {
                      e ||
                        console.warn(
                          "The promise for the key " +
                            s +
                            " resolved with a falsy value: ",
                          e,
                        ),
                        n._addValue(s, e);
                    }),
                    t.push(i))
                  : n._addValue(s, i);
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
        e.exports = s;
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
        var s = n(1),
          o = a(n(4)),
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
              (this.platformConfigBinding = (0, s.DataBinding)(
                "/lol-platform-config",
                (0, s.getProvider)().getSocket(),
              )),
              (this.clientConfigBinding = (0, s.DataBinding)(
                "/lol-client-config",
                (0, s.getProvider)().getSocket(),
              )),
              (this.loginSessionBinding = (0, s.DataBinding)(
                "/lol-login",
                (0, s.getProvider)().getSocket(),
              )),
              (this.championsBinding = (0, s.DataBinding)(
                "/lol-champions",
                (0, s.getProvider)().getSocket(),
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
              );
          }
          createChampionDetailsComponent({
            championId: e,
            section: t,
            skinId: n,
            displayType: o,
            onCloseCallback: i,
          }) {
            return (
              (this.onCloseCallback = i),
              this.destroyChampionDetailsComponent(),
              this.loginSessionBinding.get("/v1/session").then((i) => {
                const { summonerId: a, puuid: l } = i;
                this.championsBinding
                  .get(`/v1/inventories/${a}/champions/${e}`)
                  .then((i) => {
                    let a = !1;
                    i &&
                      i.ownership &&
                      i.ownership.owned &&
                      (a = i.ownership.owned);
                    const r = {
                      puuid: l,
                      championId: e,
                      championOwned: a,
                      section: t,
                      skinId: n,
                      cdpPlatformConfig: this.platformConfig,
                      eternalsEnabled: this.eternalsEnabled,
                      destroyComponent:
                        this.destroyChampionDetailsComponent.bind(this),
                      displayType: o || "FULL_PAGE_MODAL",
                    };
                    this.component = s.ComponentFactory.create(
                      this.pluginName,
                      r,
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
            const e = (0, s.getProvider)()
              .get("rcp-fe-lol-l10n")
              .tra()
              .overlay("/fe/lol-l10n/trans.json")
              .overlay("/fe/lol-champion-details/trans.json")
              .overlay("/fe/lol-shared-components/trans-champion-mastery.json");
            return (0, i.default)(s.Ember, e);
          }
          registerChampionDetailsComponent(e) {
            const {
                GradeDisplayComponent: t,
                MasteryTooltipComponent: i,
                MilestoneTooltipComponent: a,
                MasteryCrestComponent: l,
              } = s.SharedComponents.getApi_SharedChampionMasteryComponents(),
              r = {
                name: this.pluginName,
                tra: e,
                ComponentFactory: s.ComponentFactory,
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
                MasteryCrestComponent: l,
                CatalogService: n(126),
                ChampionService: n(127),
                CollectionsService: n(128),
                StatstonesService: n(129),
                UxSettingsService: n(130),
                ClientConfigService: n(131),
                EventHubService: n(132),
                ChampionMasteryService: n(133),
                DynamicTraHelper:
                  s.SharedComponents.getApi_traTemplateHelpers().DynamicTra,
                EqHelper: o.default,
              },
              c = {
                name: "ProgressionFeatureFlyoutComponent",
                tra: e,
                ComponentFactory: s.ComponentFactory,
                ProgressionFeatureFlyoutComponent: n(134),
                StatstonesService: n(129),
              },
              u = {
                name: "QuestFormsPopup",
                tra: e,
                ComponentFactory: s.ComponentFactory,
                QuestFormsPopupComponent: n(137).default,
                ConcatTraHelper:
                  s.SharedComponents.getApi_traTemplateHelpers().ConcatTra,
                EqHelper: o.default,
              };
            s.EmberApplicationFactory.setFactoryDefinition(r),
              s.EmberApplicationFactory.setFactoryDefinition(c),
              s.EmberApplicationFactory.setFactoryDefinition(u);
          }
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1).Ember.Helper.helper((e) => e[0] === e[1]);
        t.default = s;
      },
      (e) => {
        "use strict";
        function t(e) {
          const n = {};
          for (const s in e)
            "object" == typeof e[s] ? (n[s] = t(e[s])) : (n[s] = e[s]);
          return n;
        }
        function n(e, t, n) {
          const { regions: s, region: o, locale: i } = e.metadata();
          if ((n = n.get("metadata." + t)) && "region" === t && n.id !== o.id) {
            const t = s[n.id],
              o = t.defaultLocale
                ? t.defaultLocale.id
                : t.availableLocales[0].id;
            e.setLocale(o, n.id);
          } else n && "locale" === t && n.id !== i.id && e.setLocale(n.id);
        }
        e.exports = function (e, s, o) {
          let i;
          const a = { metadata: !0, moment: !0 };
          return (
            (s = s.observe(() => {
              if (i) {
                const e = t(s.metadata());
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
                this.wrapTra(s);
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
            i.addObserver("metadata.region", n.bind(null, s, "region")),
            i.addObserver("metadata.locale", n.bind(null, s, "locale")),
            o &&
              (console.warning(
                "deprecated: pass a traService as a property of your Ember application definition",
              ),
              o.register("tra:main", i, { instantiate: !1 }),
              o.inject("component", "tra", "tra:main"),
              o.inject("controller", "tra", "tra:main"),
              o.inject("view", "tra", "tra:main"),
              o.inject("model", "tra", "tra:main"),
              o.inject("route", "tra", "tra:main"),
              o.inject("service", "tra", "tra:main")),
            i
          );
        };
      },
      (e, t, n) => {
        "use strict";
        var s = n(1),
          o = n(7),
          i = n(21);
        n(22);
        const a = "progression",
          l = "overview",
          r = "abilities",
          c = "skins",
          u = "mastery",
          p = [a, l, r, c, u];
        e.exports = s.Ember.Component.extend({
          classNames: ["rcp-fe-lol-champion-details"],
          classNameBindings: ["isDialogFrame:is-dialog-frame"],
          layout: n(23),
          championService: s.Ember.inject.service("champion"),
          championId: null,
          championOwned: null,
          section: null,
          skinId: null,
          cdpPlatformConfig: null,
          destroyComponent: null,
          displayType: null,
          puuid: null,
          champion: s.Ember.computed.alias("championService.champion"),
          championClass: s.Ember.computed("champion", function () {
            const e = this.get("champion");
            return e ? e.name.toLowerCase() : "";
          }),
          isDialogFrame: s.Ember.computed("displayType", function () {
            const e = this.get("displayType");
            return "DIALOG_FRAME" === e || "DIALOG_FRAME_ABOVE_VIGNETTE" === e;
          }),
          abilitiesDisabled: s.Ember.computed(
            "cdpPlatformConfig.AbilitiesSectionEnabled",
            function () {
              let e = this.get("cdpPlatformConfig.AbilitiesSectionEnabled");
              return null == e && (e = !0), !e;
            },
          ),
          skinsDisabled: s.Ember.computed(
            "cdpPlatformConfig.SkinsSectionEnabled",
            function () {
              let e = this.get("cdpPlatformConfig.SkinsSectionEnabled");
              return null == e && (e = !0), !e;
            },
          ),
          storyDisabled: s.Ember.computed(
            "cdpPlatformConfig.StorySectionEnabled",
            function () {
              let e = this.get("cdpPlatformConfig.StorySectionEnabled");
              return null == e && (e = !0), !e;
            },
          ),
          progressionEnabled: s.Ember.computed.alias("eternalsEnabled"),
          progressionDisabled: s.Ember.computed.not("progressionEnabled"),
          showStoreButton: s.Ember.computed(
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
          progressionShouldLoad: s.Ember.computed.alias("progressionEnabled"),
          overviewShouldLoad: s.Ember.computed.not("progressionShouldLoad"),
          abilitiesShouldLoad: !1,
          skinsShouldLoad: !1,
          onInit: s.Ember.on("init", function () {
            s.logger.trace(
              "Open CDP Modal for champion " + this.get("championId"),
            ),
              this.set("abilitiesSectionShown", !1),
              this.set("championService.championId", this.get("championId")),
              s.Ember.run.scheduleOnce("afterRender", this, function () {
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
                  n = new o.NavigationBarMediator({
                    TooltipManager: s.TooltipManager,
                    TemplateHelper: s.TemplateHelper,
                    component: e,
                  }),
                  i = new o.SectionControllerMediator({ component: t }),
                  p = this.get("displayType");
                let m = null;
                if ("DIALOG_FRAME_ABOVE_VIGNETTE" === p) {
                  const e = {
                    "layer-position": "above-vignette",
                    dismissable: "",
                    "dismissable-type": "outside",
                  };
                  m = new o.DialogFrameMediator({
                    UIKit: s.UIKit,
                    dialogFrameClassName: "champion-details-dialog-frame",
                    attributes: e,
                  });
                } else if ("DIALOG_FRAME" === p) {
                  const e = {
                    "layer-position": "default",
                    dismissable: "",
                    "dismissable-type": "outside",
                  };
                  m = new o.DialogFrameMediator({
                    UIKit: s.UIKit,
                    dialogFrameClassName: "champion-details-dialog-frame",
                    attributes: e,
                  });
                } else
                  m = new o.FullPageModalMediator({ Navigation: s.Navigation });
                const d = new o.SubnavigationApi([n, i, m]);
                this.set("subnavigationApi", d);
                m.getScreenNode().appendChild(this.get("element"));
                let h = "cdp_overview";
                const f = this.get("section");
                f &&
                  (f === a
                    ? (h = "cdp_progression")
                    : f === l
                      ? (h = "cdp_overview")
                      : f === r && !1 === this.get("abilitiesDisabled")
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
              s.logger.trace(
                "Close CDP Modal for champion " + this.get("championId"),
              ),
              this.get("subnavigationApi").destroy(),
              this.get("destroyComponent")(),
              this._super(...arguments);
          },
          navigationTooltipObserver: s.Ember.observer(
            "subnavigationApi",
            "tra.feature_not_implemented_generic",
            "abilitiesDisabled",
            "skinsDisabled",
            "storyDisabled",
            function () {
              s.Ember.run.scheduleOnce(
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
            s.Telemetry.sendCustomData("cdp_section_view", {
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
        var s = c(n(8)),
          o = c(n(14)),
          i = c(n(15)),
          a = c(n(18)),
          l = c(n(19)),
          r = c(n(20));
        function c(e) {
          return e && e.__esModule ? e : { default: e };
        }
        e.exports = {
          SubnavigationApi: s.default,
          NavigationBarMediator: o.default,
          SectionControllerMediator: i.default,
          FullPageModalMediator: a.default,
          DialogFrameMediator: l.default,
          MainNavigationMediator: r.default,
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var s = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var s = t[n];
                (s.enumerable = s.enumerable || !1),
                  (s.configurable = !0),
                  "value" in s && (s.writable = !0),
                  Object.defineProperty(e, s.key, s);
              }
            }
            return function (t, n, s) {
              return n && e(t.prototype, n), s && e(t, s), t;
            };
          })(),
          o = c(n(9)),
          i = c(n(10)),
          a = c(n(12)),
          l = n(13),
          r = n(11);
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
              s(t, [
                {
                  key: "_registerEventListeners",
                  value: function () {
                    this.addEventListener(
                      r.EVENT_IN_SUBNAVIGATION_SUBSECTION_SELECTED,
                      this._onSpecificSectionSelected.bind(this),
                    ),
                      this.addEventListener(
                        r.EVENT_IN_RENDER_SUBSECTION_SELECTED,
                        this._onSpecificSectionSelected.bind(this),
                      ),
                      this.addEventListener(
                        r.EVENT_IN_MAIN_NAVIGATION_SELECTED,
                        this._onFirstSectionEnabledSeleced.bind(this),
                      ),
                      this.addEventListener(
                        r.EVENT_IN_SECTION_WILL_SHOW,
                        this._onSectionWillShow.bind(this),
                      ),
                      this.addEventListener(
                        r.EVENT_IN_SECTION_SHOW,
                        this._onSectionShow.bind(this),
                      ),
                      this.addEventListener(
                        r.EVENT_IN_SECTION_WILL_HIDE,
                        this._onSectionWillHide.bind(this),
                      ),
                      this.addEventListener(
                        r.EVENT_IN_SECTION_HIDE,
                        this._onSectionHide.bind(this),
                      ),
                      this.addEventListener(
                        r.EVENT_IN_SCREEN_SHOWN,
                        this._onScreenShow.bind(this),
                      ),
                      this.addEventListener(
                        r.EVENT_IN_SCREEN_HIDDEN,
                        this._onScreenHide.bind(this),
                      );
                  },
                },
                {
                  key: "_onSectionWillShow",
                  value: function (e) {
                    this.dispatchEvent(
                      r.EVENT_OUT_SECTION_WILL_SHOW,
                      e,
                      this._showParameters,
                    );
                  },
                },
                {
                  key: "_onSectionShow",
                  value: function (e) {
                    this.dispatchEvent(
                      r.EVENT_OUT_SECTION_SHOW,
                      e,
                      this._showParameters,
                    );
                  },
                },
                {
                  key: "_onSectionWillHide",
                  value: function (e) {
                    this.dispatchEvent(
                      r.EVENT_OUT_SECTION_WILL_HIDE,
                      e,
                      this._showParameters,
                    );
                  },
                },
                {
                  key: "_onSectionHide",
                  value: function (e) {
                    this.dispatchEvent(
                      r.EVENT_OUT_SECTION_HIDE,
                      e,
                      this._showParameters,
                    );
                  },
                },
                {
                  key: "_onScreenShow",
                  value: function () {
                    (this._screenShown = !0),
                      this.dispatchEvent(r.EVENT_OUT_SCREEN_SHOWN);
                  },
                },
                {
                  key: "_onScreenHide",
                  value: function () {
                    (this._screenShown = !1),
                      this.dispatchEvent(r.EVENT_OUT_SCREEN_HIDDEN);
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
                      (e.priority = (0, l.sanitizeInteger)(
                        e.priority,
                        Number.MAX_SAFE_INTEGER,
                      )),
                      (e.enabled = (0, l.sanitizeBoolean)(e.enabled, !0)),
                      this.dispatchEvent(r.EVENT_OUT_REGISTER_SUBSECTION, e),
                      new a.default(this, e.id)
                    );
                  },
                },
                {
                  key: "setEnabled",
                  value: function (e, t) {
                    e &&
                      this.dispatchEvent(
                        r.EVENT_OUT_SET_ENABLE_SUBSECTION,
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
                        r.EVENT_OUT_SET_TITLE_SUBSECTION,
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
                        r.EVENT_OUT_SET_TOOLTIP_SUBSECTION,
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
                        r.EVENT_OUT_SET_SHOW_ALERT_SUBSECTION,
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
                        this.dispatchEvent(r.EVENT_OUT_SCREEN_SHOWN),
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
                      this.dispatchEvent(r.EVENT_OUT_DESTROY),
                      this.clearEventListeners();
                  },
                },
                {
                  key: "_onSpecificSectionSelected",
                  value: function (e) {
                    e &&
                      this.dispatchEvent(
                        r.EVENT_OUT_SHOW_SUBSECTION,
                        e,
                        this._showParameters,
                      );
                  },
                },
                {
                  key: "_onFirstSectionEnabledSeleced",
                  value: function () {
                    this.dispatchEvent(
                      r.EVENT_OUT_SHOW_FIRST_SUBSECTION_ENABLED,
                    );
                  },
                },
              ]),
              t
            );
          })(o.default);
        t.default = p;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var n = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var s = t[n];
              (s.enumerable = s.enumerable || !1),
                (s.configurable = !0),
                "value" in s && (s.writable = !0),
                Object.defineProperty(e, s.key, s);
            }
          }
          return function (t, n, s) {
            return n && e(t.prototype, n), s && e(t, s), t;
          };
        })();
        var s = (function () {
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
                    s = void 0;
                  return (
                    !!(n && n.length && (s = n.indexOf(t)) > -1) &&
                    (n.splice(s, 1), this._listeners.set(e, n), !0)
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
                      s = 1;
                    s < t;
                    s++
                  )
                    n[s - 1] = arguments[s];
                  var o = this._listeners.get(e);
                  return (
                    !(!o || !o.length) &&
                    (o.forEach(function (e) {
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
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var s,
          o = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var s = t[n];
                (s.enumerable = s.enumerable || !1),
                  (s.configurable = !0),
                  "value" in s && (s.writable = !0),
                  Object.defineProperty(e, s.key, s);
              }
            }
            return function (t, n, s) {
              return n && e(t.prototype, n), s && e(t, s), t;
            };
          })(),
          i = n(9),
          a = (s = i) && s.__esModule ? s : { default: s },
          l = n(11);
        var r = (function () {
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
            o(e, [
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
                      l.EVENT_OUT_SHOW_SUBSECTION,
                      function () {
                        return t._onApiShowSubsection.apply(t, arguments);
                      },
                    ),
                    this._library.addEventListener(
                      l.EVENT_OUT_REGISTER_SUBSECTION,
                      function () {
                        var e = (
                          (arguments.length <= 0 ? void 0 : arguments[0]) || {}
                        ).registerWithMediators;
                        (Array.isArray(e) && !e.includes(t.constructor.name)) ||
                          t._onApiRegisterSubsection.apply(t, arguments);
                      },
                    ),
                    this._library.addEventListener(
                      l.EVENT_OUT_SET_ENABLE_SUBSECTION,
                      function () {
                        return t._onApiSetEnableSubsection.apply(t, arguments);
                      },
                    ),
                    this._library.addEventListener(
                      l.EVENT_OUT_SET_TITLE_SUBSECTION,
                      function () {
                        return t._onApiSetTitleSubsection.apply(t, arguments);
                      },
                    ),
                    this._library.addEventListener(
                      l.EVENT_OUT_SET_TOOLTIP_SUBSECTION,
                      function () {
                        return t._onApiSetTooltipSubsection.apply(t, arguments);
                      },
                    ),
                    this._library.addEventListener(
                      l.EVENT_OUT_SET_SHOW_ALERT_SUBSECTION,
                      function () {
                        return t._onApiSetShowAlertSubsection.apply(
                          t,
                          arguments,
                        );
                      },
                    ),
                    this._library.addEventListener(
                      l.EVENT_OUT_SCREEN_SHOWN,
                      function () {
                        return t._onApiScreenShow.apply(t, arguments);
                      },
                    ),
                    this._library.addEventListener(
                      l.EVENT_OUT_DESTROY,
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
        t.default = r;
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
        var s = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var s = t[n];
                (s.enumerable = s.enumerable || !1),
                  (s.configurable = !0),
                  "value" in s && (s.writable = !0),
                  Object.defineProperty(e, s.key, s);
              }
            }
            return function (t, n, s) {
              return n && e(t.prototype, n), s && e(t, s), t;
            };
          })(),
          o = l(n(9)),
          i = l(n(8)),
          a = n(11);
        function l(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var r = "riotclient-lib-subnavigation",
          c = (function (e) {
            function t(e, n) {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t);
              var s = (function (e, t) {
                if (!e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !t || ("object" != typeof t && "function" != typeof t)
                  ? e
                  : t;
              })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
              if (!e)
                throw new Error(r + " SubsectionAPI - libRef is mandatory");
              if (!n)
                throw new Error(r + " SubsectionAPI - sectionId is mandatory");
              if (!(e instanceof i.default))
                throw new Error(
                  r + " SubsectionAPI - libRef should be an instance of API",
                );
              return (
                (s._libRef = e),
                (s._sectionId = n),
                (s._showing = !1),
                s._libRef.addEventListener(
                  a.EVENT_OUT_SHOW_SUBSECTION,
                  s._showSubsection.bind(s),
                ),
                s._libRef.addEventListener(
                  a.EVENT_OUT_SCREEN_HIDDEN,
                  s._deselected.bind(s),
                ),
                s._libRef.addEventListener(
                  a.EVENT_OUT_SECTION_WILL_SHOW,
                  s._sectionWillShow.bind(s),
                ),
                s._libRef.addEventListener(
                  a.EVENT_OUT_SECTION_SHOW,
                  s._sectionShow.bind(s),
                ),
                s._libRef.addEventListener(
                  a.EVENT_OUT_SECTION_WILL_HIDE,
                  s._sectionWillHide.bind(s),
                ),
                s._libRef.addEventListener(
                  a.EVENT_OUT_SECTION_HIDE,
                  s._sectionHide.bind(s),
                ),
                s._libRef.addEventListener(
                  a.EVENT_OUT_DESTROY,
                  s._onDestroy.bind(s),
                ),
                s
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
          })(o.default);
        t.default = c;
      },
      (e, t) => {
        "use strict";
        function n(e, t) {
          return e ? (isNaN(e) ? t : parseInt(e, 10)) : t;
        }
        function s(e, t) {
          return null == e ? t : !0 === e;
        }
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.sanitizeInteger = n),
          (t.sanitizeBoolean = s);
        var o = { sanitizeInteger: n, sanitizeBoolean: s };
        t.default = o;
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
        var s,
          o = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var s = t[n];
                (s.enumerable = s.enumerable || !1),
                  (s.configurable = !0),
                  "value" in s && (s.writable = !0),
                  Object.defineProperty(e, s.key, s);
              }
            }
            return function (t, n, s) {
              return n && e(t.prototype, n), s && e(t, s), t;
            };
          })(),
          i = function e(t, n, s) {
            null === t && (t = Function.prototype);
            var o = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === o) {
              var i = Object.getPrototypeOf(t);
              return null === i ? void 0 : e(i, n, s);
            }
            if ("value" in o) return o.value;
            var a = o.get;
            return void 0 !== a ? a.call(s) : void 0;
          },
          a = n(10),
          l = (s = a) && s.__esModule ? s : { default: s },
          r = n(11),
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
              var s = (function (e, t) {
                if (!e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !t || ("object" != typeof t && "function" != typeof t)
                  ? e
                  : t;
              })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n));
              return (s._options = e), s;
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
                  key: "_onNavigationItemClicked",
                  value: function (e) {
                    var t = e.target.getAttribute(p);
                    t &&
                      this._library.dispatchEvent(
                        r.EVENT_IN_SUBNAVIGATION_SUBSECTION_SELECTED,
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
                      var s = t[n];
                      if (s.getAttribute(p) === e)
                        return { element: s, index: n };
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
                      var n = this._component.childNodes, s = 0;
                      s < n.length;
                      s++
                    ) {
                      var o = n[s];
                      if ("LOL-UIKIT-NAVIGATION-ITEM" === o.tagName)
                        if (
                          (0, c.sanitizeInteger)(o.getAttribute(m), 1) >
                          e.priority
                        )
                          return void this._component.insertBefore(t, o);
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
                      s = n.TooltipManager,
                      o = n.TemplateHelper;
                    if (s && o) {
                      var i = this._getSectionDataById(e);
                      if (i)
                        if ("string" == typeof t && t.length > 0) {
                          var a = o.contentBlockTooltipSystem(t),
                            l = document.createElement("lol-uikit-tooltip");
                          l.appendChild(a);
                          s.assign(i.element, l, null, {
                            type: "system",
                            targetAnchor: { x: "center", y: "bottom" },
                            tooltipAnchor: { x: "center", y: "top" },
                          });
                        } else s.unassign(i.element);
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
          })(l.default);
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
        var s = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var s = t[n];
                (s.enumerable = s.enumerable || !1),
                  (s.configurable = !0),
                  "value" in s && (s.writable = !0),
                  Object.defineProperty(e, s.key, s);
              }
            }
            return function (t, n, s) {
              return n && e(t.prototype, n), s && e(t, s), t;
            };
          })(),
          o = function e(t, n, s) {
            null === t && (t = Function.prototype);
            var o = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === o) {
              var i = Object.getPrototypeOf(t);
              return null === i ? void 0 : e(i, n, s);
            }
            if ("value" in o) return o.value;
            var a = o.get;
            return void 0 !== a ? a.call(s) : void 0;
          },
          i = r(n(10)),
          a = r(n(16)),
          l = n(11);
        function r(e) {
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
              var s = (function (e, t) {
                if (!e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !t || ("object" != typeof t && "function" != typeof t)
                  ? e
                  : t;
              })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n));
              return (
                (s._options = e),
                (s.sectionsRenders = {}),
                (s._currentSectionId = s._component.getAttribute(d)),
                s
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
                    o(
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
                        l.EVENT_IN_SECTION_WILL_SHOW,
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
                      this._library.dispatchEvent(l.EVENT_IN_SECTION_SHOW, e));
                  },
                },
                {
                  key: "_onSectionWillHide",
                  value: function () {
                    this._currentSectionId &&
                      this._library.dispatchEvent(
                        l.EVENT_IN_SECTION_WILL_HIDE,
                        this._currentSectionId,
                      );
                  },
                },
                {
                  key: "_onSectionHide",
                  value: function () {
                    this._currentSectionId &&
                      this._library.dispatchEvent(
                        l.EVENT_IN_SECTION_HIDE,
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
                      var s = this.sectionsRenders[t],
                        o = a.default.create(s, n),
                        i = a.default.getDOMNode(o);
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
        const s = n(17);
        e.exports = new s();
      },
      (e) => {
        "use strict";
        const t = "use_public_only",
          n = new WeakMap();
        function s(e) {
          return n.has(e) || n.set(e, {}), n.get(e);
        }
        function o(e) {
          return null !== e && "object" == typeof e;
        }
        const i = function () {
          this.factories = {};
        };
        (i.prototype.setFactory = function (e, t) {
          if (o(e)) {
            const n = "Component";
            let s = e.name ? e.name : Object.keys(e)[0];
            (t = e.create ? e.create : e[s]),
              -1 !== s.indexOf(n, s.length - n.length) &&
                (s = s.substring(0, s.length - n.length)),
              (e = s);
          } else if ("function" == typeof e) {
            throw new Error(
              "ComponentFactory.setFactory: type needs to be an object or a string, not a function!",
            );
          }
          this.factories[e] = t;
        }),
          (i.prototype.setPrivateFactory = function (e, t) {
            s(this)[e] = t;
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
            return s(this)[e];
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
              (o((s = e)) && s instanceof HTMLElement && 1 === s.nodeType) ||
              e.domNode
            )
              return e;
            var s;
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
            const s = this.findFactory(e, n);
            return s ? this.create(s, t) : this.buildDummy(e);
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
              create: function (n, s) {
                return e.create(n, s, t);
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
        var s,
          o = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var s = t[n];
                (s.enumerable = s.enumerable || !1),
                  (s.configurable = !0),
                  "value" in s && (s.writable = !0),
                  Object.defineProperty(e, s.key, s);
              }
            }
            return function (t, n, s) {
              return n && e(t.prototype, n), s && e(t, s), t;
            };
          })(),
          i = function e(t, n, s) {
            null === t && (t = Function.prototype);
            var o = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === o) {
              var i = Object.getPrototypeOf(t);
              return null === i ? void 0 : e(i, n, s);
            }
            if ("value" in o) return o.value;
            var a = o.get;
            return void 0 !== a ? a.call(s) : void 0;
          },
          a = n(10),
          l = (s = a) && s.__esModule ? s : { default: s },
          r = n(11);
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
                  n._library.dispatchEvent(r.EVENT_IN_SCREEN_HIDDEN);
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
              o(t, [
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
          })(l.default);
        t.default = u;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var s,
          o = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var s = t[n];
                (s.enumerable = s.enumerable || !1),
                  (s.configurable = !0),
                  "value" in s && (s.writable = !0),
                  Object.defineProperty(e, s.key, s);
              }
            }
            return function (t, n, s) {
              return n && e(t.prototype, n), s && e(t, s), t;
            };
          })(),
          i = function e(t, n, s) {
            null === t && (t = Function.prototype);
            var o = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === o) {
              var i = Object.getPrototypeOf(t);
              return null === i ? void 0 : e(i, n, s);
            }
            if ("value" in o) return o.value;
            var a = o.get;
            return void 0 !== a ? a.call(s) : void 0;
          },
          a = n(10),
          l = (s = a) && s.__esModule ? s : { default: s },
          r = n(11);
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
                  n._library.dispatchEvent(r.EVENT_IN_SCREEN_HIDDEN);
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
              o(t, [
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
          })(l.default);
        t.default = u;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var s,
          o = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var s = t[n];
                (s.enumerable = s.enumerable || !1),
                  (s.configurable = !0),
                  "value" in s && (s.writable = !0),
                  Object.defineProperty(e, s.key, s);
              }
            }
            return function (t, n, s) {
              return n && e(t.prototype, n), s && e(t, s), t;
            };
          })(),
          i = function e(t, n, s) {
            null === t && (t = Function.prototype);
            var o = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === o) {
              var i = Object.getPrototypeOf(t);
              return null === i ? void 0 : e(i, n, s);
            }
            if ("value" in o) return o.value;
            var a = o.get;
            return void 0 !== a ? a.call(s) : void 0;
          },
          a = n(10),
          l = (s = a) && s.__esModule ? s : { default: s },
          r = n(11);
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
              var s = e.Viewport,
                o = e.Navigation;
              return (
                e.defaultSectionIdOnShow &&
                  (n.defaultSectionIdOnShow = e.defaultSectionIdOnShow),
                (n.screenRoot = s.main().getScreenRoot(e.screenName)),
                (n.screenNode = n.screenRoot.getElement()),
                (n.navigationItem = o.addItem(
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
                      (n._library.dispatchEvent(r.EVENT_IN_SCREEN_SHOWN),
                      n._library.dispatchEvent(
                        r.EVENT_IN_SUBNAVIGATION_SUBSECTION_SELECTED,
                        e,
                      )));
                }),
                n.screenRoot.on("hide", function () {
                  n._library &&
                    n._library.dispatchEvent(r.EVENT_IN_SCREEN_HIDDEN);
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
              o(t, [
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
          })(l.default);
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
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "Cj1d5THP",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\root\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\root\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\root\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-section-controller",[]],["dynamic-attr","class",["concat",["cdp-section-controller ",["unknown",["championClass"]]]]],["static-attr","animation","crossfade"],["flush-element"],["text","\\n"],["text","  "],["open-element","lol-uikit-section",[]],["static-attr","section-id","cdp_overview"],["static-attr","class","cdp-section-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["overviewShouldLoad"]]],null,7],["text","  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-section",[]],["static-attr","section-id","cdp_progression"],["static-attr","class","cdp-section-container progression"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["progressionDisabled"]]],null,6],["text","  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-section",[]],["static-attr","section-id","cdp_abilities"],["static-attr","class","cdp-abilities-section-container"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["abilitiesDisabled"]]],null,4],["text","  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-section",[]],["static-attr","section-id","cdp_skins"],["static-attr","class","cdp-section-container cdp-skins-section-container"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["skinsDisabled"]]],null,2],["text","  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-section",[]],["static-attr","section-id","cdp_mastery"],["static-attr","class","cdp-mastery-section-container mastery"],["flush-element"],["text","\\n"],["block",["if"],[["get",["masteryShouldLoad"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","lol-uikit-navigation-bar",[]],["static-attr","class","cdp-nav-bar-lcm"],["static-attr","type","nav-bar-secondary"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-navigation-item",[]],["static-attr","item-id","cdp_overview"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","cdp_navigation_overview"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-navigation-item",[]],["static-attr","item-id","cdp_abilities"],["dynamic-attr","disabled",["unknown",["abilitiesDisabled"]],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","cdp_navigation_abilities"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-navigation-item",[]],["static-attr","item-id","cdp_mastery"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","cdp_navigation_mastery"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-navigation-item",[]],["static-attr","item-id","cdp_progression"],["dynamic-attr","disabled",["unknown",["progressionDisabled"]],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","cdp_navigation_progression_eternals"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-navigation-item",[]],["static-attr","item-id","cdp_skins"],["dynamic-attr","disabled",["unknown",["skinsDisabled"]],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","cdp_navigation_skins"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["append",["unknown",["title-lockup-lcm"]],false],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["mastery-section"],null,[["sectionLoaded"],[["helper",["action"],[["get",[null]],"sectionLoaded"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["skins-section"],null,[["showStoreButton","sectionLoaded","destroyComponent","inputSkinId"],[["get",["showStoreButton"]],["helper",["action"],[["get",[null]],"sectionLoaded"],null],["get",["destroyComponent"]],["get",["skinId"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["skinsShouldLoad"]]],null,1]],"locals":[]},{"statements":[["text","        "],["append",["helper",["abilities-section"],null,[["abilitiesSectionShown","sectionLoaded"],[["get",["abilitiesSectionShown"]],["helper",["action"],[["get",[null]],"sectionLoaded"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["abilitiesShouldLoad"]]],null,3]],"locals":[]},{"statements":[["text","        "],["append",["helper",["champion-backdrop"],null,[["sectionLoaded","section"],[["helper",["action"],[["get",[null]],"sectionLoaded"],null],"progression"]]],false],["text","\\n        "],["append",["helper",["progression-section"],null,[["sectionLoaded","setBackdropFadeout","destroyComponent"],[["helper",["action"],[["get",[null]],"sectionLoaded"],null],["helper",["action"],[["get",[null]],"setBackdropFadeout"],null],["get",["destroyComponent"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["progressionShouldLoad"]]],null,5]],"locals":[]},{"statements":[["text","      "],["append",["helper",["champion-backdrop"],null,[["sectionLoaded","section"],[["helper",["action"],[["get",[null]],"sectionLoaded"],null],"overview"]]],false],["text","\\n      "],["append",["helper",["overview-section"],null,[["showStoreButton","sectionLoaded","destroyComponent"],[["get",["showStoreButton"]],["helper",["action"],[["get",[null]],"sectionLoaded"],null],["get",["destroyComponent"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(25),
          (e.exports = s.Ember.Component.extend({
            classNames: ["cdp-backdrop-component"],
            layout: n(26),
            championService: s.Ember.inject.service("champion"),
            section: null,
            champion: s.Ember.computed.alias("championService.champion"),
            didInsertElement: s.Ember.on("didInsertElement", function () {
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
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "f3A9SNi2",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\shared\\\\champion-backdrop\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\shared\\\\champion-backdrop\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\shared\\\\champion-backdrop\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-backdrop ",["unknown",["section"]]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-backdrop-img-overlay"],["flush-element"],["close-element"],["text","\\n  "],["open-element","img",[]],["static-attr","class","cdp-backdrop-img"],["dynamic-attr","src",["concat",[["unknown",["champion","skins","0","splashPath"]]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1),
          o = n(28);
        n(29),
          (e.exports = s.Ember.Component.extend({
            classNames: ["lcm-cdp-title-lockup-component"],
            layout: n(30),
            championService: s.Ember.inject.service("champion"),
            champion: s.Ember.computed.alias("championService.champion"),
            primaryRole: s.Ember.computed("champion.roles", function () {
              const e = this.get("champion.roles");
              if (e && e[0]) return e[0];
            }),
            primaryRoleString: s.Ember.computed(
              "primaryRole",
              "tra.cdp_role_assassin",
              "tra.cdp_role_fighter",
              "tra.cdp_role_mage",
              "tra.cdp_role_marksman",
              "tra.cdp_role_support",
              "tra.cdp_role_tank",
              function () {
                const e = this.get("primaryRole");
                return e ? (0, o.translate)(this, `cdp_role_${e}`) : "";
              },
            ),
          }));
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.translate = function (e, t, n) {
            const s = e.get("tra");
            return s.get("formatString")(t, n);
          });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "Qj3QgBwT",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\shared\\\\title-lockup-lcm\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\shared\\\\title-lockup-lcm\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\shared\\\\title-lockup-lcm\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","title-lockup-background"],["flush-element"],["text","\\n  "],["open-element","svg",[]],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["static-attr","width","316"],["static-attr","height","48"],["static-attr","viewBox","0 0 316 48"],["static-attr","fill","none"],["flush-element"],["text","\\n    "],["open-element","path",[]],["static-attr","d","M-9 1.00024H313.735L271.785 47.0002H-9V1.00024Z"],["static-attr","fill","#010A13"],["static-attr","stroke","#463714"],["static-attr","stroke-width","2"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","champion-role-icon-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","champion-role-icon-background"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["champion-role-icon ",["unknown",["primaryRole"]]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["primaryRoleString"]]],null,1],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","champion-info"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lockup-champion-name"],["flush-element"],["text","\\n    "],["append",["unknown",["champion","name"]],false],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","lockup-champion-title"],["flush-element"],["text","\\n    "],["append",["unknown",["champion","title"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","class","cdp-role-tooltip"],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["primaryRoleString"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["bottom","system"]],0]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(32),
          (e.exports = s.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-progression-section"],
            layout: n(33),
            championService: s.Ember.inject.service("champion"),
            statstonesService: s.Ember.inject.service("statstones"),
            champion: s.Ember.computed.alias("championService.champion"),
            onInit: s.Ember.on("didRender", function () {
              this.sendAction("sectionLoaded", "progression");
            }),
            hoveredStatstone: null,
            playerRecord: s.Ember.computed.alias(
              "hoveredStatstone.playerRecord",
            ),
            showHoverPanel: s.Ember.computed.notEmpty("hoveredStatstone"),
            hasFeatured: s.Ember.computed.notEmpty(
              "statstonesService.featuredStatstones",
            ),
            hoveredClassName: s.Ember.computed("showHoverPanel", function () {
              return this.get("showHoverPanel") ? "hovered" : "";
            }),
            isOwned: s.Ember.computed.and(
              "playerRecord",
              "playerRecord.entitled",
            ),
            setFadeout: s.Ember.computed("showHoverPanel", function () {
              return (
                this.get("showHoverPanel")
                  ? this.sendAction("setBackdropFadeout", !0)
                  : this.sendAction("setBackdropFadeout", !1),
                0
              );
            }),
            baseStatstoneImagePath: s.Ember.computed(
              "hoveredStatstone",
              "hoveredStatstone.category",
              function () {
                if (null === this.get("hoveredStatstone")) return "";
                return `/lol-game-data/assets/ASSETS/Loadouts/StatStones/Categories/LCU/SS_Icon_${this.get("hoveredStatstone.category")}`;
              },
            ),
            statstonePatronName: s.Ember.computed(
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
                s.EternalsApi.showFirstTouchModal();
              },
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "y+S1xyVy",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\root\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\root\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\root\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-content-left ",["unknown",["setFadeout"]]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression-header"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-progression-title"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstone_title_text"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-eternals-info"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-info-icon",[]],["static-attr","class","cdp-eternals-info-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"launchInfoLink"],null],null],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression"],["flush-element"],["text","\\n    "],["append",["helper",["progression-series"],null,[["hoveredStatstone"],[["get",["hoveredStatstone"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-content-right ",["unknown",["hoveredClassName"]]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["showHoverPanel"]]],null,6,1],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","cdp-progression-section-title"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-progression-divider title"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-content-divider-line-end"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-content-divider-line"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","cdp-progression-section-title-text"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_featured_title"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-progression-divider title"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-content-divider-line"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-content-divider-line-end"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["append",["unknown",["progression-showcase"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["hasFeatured"]]],null,0]],"locals":[]},{"statements":[["text","              "],["append",["unknown",["tra","cdp_progression_statstones_rarity_common"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["unknown",["tra","cdp_progression_statstones_rarity_unique"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-title"],["flush-element"],["text","\\n            "],["append",["unknown",["hoveredStatstone","name"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-rarity"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hoveredStatstone","isEpic"]]],null,3,2],["text","          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-blurb"],["flush-element"],["text","\\n            "],["append",["unknown",["hoveredStatstone","description"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-image-panel"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-image"],["dynamic-attr","style",["concat",["background-image: url(\\"",["unknown",["baseStatstoneImagePath"]],"_1.png\\");"]]],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-image"],["dynamic-attr","style",["concat",["background-image: url(\\"",["unknown",["baseStatstoneImagePath"]],"_2.png\\");"]]],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-image"],["dynamic-attr","style",["concat",["background-image: url(\\"",["unknown",["baseStatstoneImagePath"]],"_3.png\\");"]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-reward-text"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","cdp_progression_statstones_hover_rewards"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-reward-section"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-reward-section personal-best"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-image"],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-title"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_hover_personal_best"]],false],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-description"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_hover_personal_best_desc"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-reward-section mastery-emote"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-image"],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-title"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_hover_mastery_emote"]],false],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-description"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_hover_mastery_emote_desc"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["details-section"],null,[["statstone"],[["get",["hoveredStatstone"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","cdp-right-hover-panel"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isOwned"]]],null,5,4],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(35);
        const { RunMixin: o } = s.EmberAddons.EmberLifeline;
        e.exports = s.Ember.Component.extend(o, {
          classNames: ["rcp-fe-lol-champion-details-series-component"],
          classNameBindings: ["hasEternals:has-eternals:no-eternals"],
          layout: n(36),
          statstonesService: s.Ember.inject.service("statstones"),
          hoveredStatstone: null,
          isTimeout: !1,
          statstonesSeries: s.Ember.computed.alias(
            "statstonesService.statstoneData",
          ),
          hasStatstoneData: s.Ember.computed("statstonesSeries", function () {
            return null !== this.get("statstonesSeries");
          }),
          hasNoStatstones: s.Ember.computed("statstonesSeries", function () {
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
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "V76dB1dm",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-series-info-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasStatstoneData"]]],null,6,2],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["uikit-spinner"],null,[["class"],["cdp-series-info-spinner"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","cdp-series-timeout-message"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_load_error"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isTimeout"]]],null,1,0]],"locals":[]},{"statements":[["text","        "],["append",["helper",["series-info"],null,[["series","hoveredStatstone"],[["get",["series"]],["get",["hoveredStatstone"]]]]],false],["text","\\n"]],"locals":["series"]},{"statements":[["text","    "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","cdp-series-scrollable"],["static-attr","overflow-masks","bottom"],["flush-element"],["text","\\n"],["block",["each"],[["get",["statstonesSeries"]]],null,3],["text","    "],["close-element"],["text","\\n    "],["append",["unknown",["hover"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","cdp-series-no-statstones"],["flush-element"],["append",["unknown",["tra","cdp_progression_no_statstones_for_champ"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["hasNoStatstones"]]],null,5,4]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(38),
          (e.exports = s.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-showcase-section"],
            layout: n(39),
            statstonesService: s.Ember.inject.service("statstones"),
            featuredStatstones: s.Ember.computed.alias(
              "statstonesService.featuredStatstones",
            ),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "me3XNkta",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\showcase-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\showcase-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\showcase-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-progression-showcase-component"],["flush-element"],["text","\\n"],["block",["each"],[["get",["featuredStatstones"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["showcase-item"],null,[["showcaseItem"],[["get",["showcaseItem"]]]]],false],["text","\\n"]],"locals":["showcaseItem"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(41),
          o = n(1),
          i = n(59);
        n(60),
          (e.exports = o.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-series-info-component"],
            layout: n(61),
            catalogService: o.Ember.inject.service("catalog"),
            statstonesService: o.Ember.inject.service("statstones"),
            series: null,
            hoveredStatstone: null,
            seriesLength: o.Ember.computed.alias("series.statstones.length"),
            statstonesOwned: o.Ember.computed.alias("series.stonesOwned"),
            ownedFromPacks: o.Ember.computed.alias("series.ownedFromPacks"),
            milestonesPassed: o.Ember.computed.alias("series.milestonesPassed"),
            setCompleted: o.Ember.computed(
              "totalMilestones",
              "milestonesPassed",
              function () {
                const e = this.get("totalMilestones");
                return this.get("milestonesPassed") >= e;
              },
            ),
            totalMilestones: o.Ember.computed("seriesLength", function () {
              return i.MILESTONE_COMPLETION_LEVEL * this.get("seriesLength");
            }),
            seriesCompleted: o.Ember.computed(
              "statstonesCompleted",
              "seriesLength",
              function () {
                return (
                  this.get("statstonesCompleted") === this.get("seriesLength")
                );
              },
            ),
            seriesOwned: o.Ember.computed(
              "seriesLength",
              "statstonesOwned",
              function () {
                const e = this.get("seriesLength");
                return this.get("statstonesOwned") === e;
              },
            ),
            showUnlockAllButton: o.Ember.computed(
              "seriesLength",
              "statstonesOwned",
              function () {
                const e = this.get("seriesLength");
                return this.get("statstonesOwned") < e;
              },
            ),
            shouldRenderSale: o.Ember.computed(
              "series",
              "catalogService.salesData.[]",
              function () {
                const e = this.get("series"),
                  t = this.get("catalogService.salesData");
                if (!(e && Array.isArray(e.statstones) && t && t.length))
                  return !1;
                const n = this.getPackId(e),
                  s = this.get("catalogService").getIsItemOnSale(parseInt(n));
                return (
                  this.get("catalogService").getIsItemOnSale(e.itemId) || s
                );
              },
            ),
            showStatstonesCompleted: o.Ember.computed.not(
              "showUnlockAllButton",
            ),
            showPAWChoiceModal() {
              const e = this.get("series"),
                t = this.getPackId(e),
                n = [e.itemId];
              t && n.push(t),
                o.PawPlugin.createPAWChoiceModal(
                  { itemIds: n, inventoryType: e.inventoryType },
                  i.CDP_PAW_ID,
                  s.PAW.MODAL_TYPES.CHAMPION_MODAL,
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
              return s.default;
            },
          }),
          Object.defineProperty(t, "PROFILE_PRIVACY", {
            enumerable: !0,
            get: function () {
              return r.default;
            },
          }),
          Object.defineProperty(t, "QUEUES", {
            enumerable: !0,
            get: function () {
              return o.default;
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
              return l.default;
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
        var s = u(n(42)),
          o = u(n(53)),
          i = u(n(54)),
          a = u(n(55)),
          l = u(n(56)),
          r = u(n(57)),
          c = u(n(58));
        function u(e) {
          return e && e.__esModule ? e : { default: e };
        }
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = d(n(43)),
          o = d(n(44)),
          i = d(n(45)),
          a = d(n(46)),
          l = d(n(47)),
          r = d(n(48)),
          c = d(n(49)),
          u = d(n(50)),
          p = d(n(51)),
          m = d(n(52));
        function d(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var h = {
          COMPONENT_TYPES: s.default,
          CURRENCY_TYPES: o.default,
          INVENTORY_TYPES: i.default,
          MEDIA_TYPES: a.default,
          MEDIA_LOAD_TYPES: l.default,
          MODAL_TYPES: r.default,
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
          s = "RANKED_FLEX_SR",
          o = "RANKED_FLEX_TT",
          i = "CHERRY",
          a = "RANKED_TFT",
          l = "RANKED_TFT_DOUBLE_UP",
          r = "RANKED_TFT_TURBO",
          c = "RANKED_TFT_PAIRS",
          u = [n, s],
          p = [...u, o],
          m = [i],
          d = [a, l],
          h = [r, c],
          f = [...d, ...h],
          _ = [...p, ...d],
          g = [...h, ...m];
        var v = {
          RANKED_SOLO_5x5_QUEUE_TYPE: n,
          RANKED_FLEX_SR_QUEUE_TYPE: s,
          RANKED_FLEX_TT_QUEUE_TYPE: o,
          RANKED_CHERRY_QUEUE_TYPE: i,
          RANKED_TFT_QUEUE_TYPE: a,
          RANKED_TFT_DOUBLE_UP_QUEUE_TYPE: l,
          RANKED_TFT_TURBO_QUEUE_TYPE: r,
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
          s = { PRIVATE: "PRIVATE", PUBLIC: "PUBLIC" };
        var o = {
          ProfilePrivacyEnabledState: n,
          ProfilePrivacySetting: s,
          DEFAULT_PROFILE_PRIVACY: {
            enabledState: n.UNKNOWN,
            setting: s.PUBLIC,
          },
        };
        t.default = o;
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
        const s = 36e5,
          o = 864e5,
          i = 6048e5,
          a = {
            MILLISECONDS_IN_A_SECOND: 1e3,
            MILLISECONDS_IN_A_MINUTE: 6e4,
            MILLISECONDS_IN_A_HOUR: s,
            MILLISECONDS_IN_A_DAY: o,
            MILLISECONDS_IN_A_WEEK: i,
            MILLISECONDS_IN_A_YEAR: 314496e5,
          };
        t.TIME_CONVERSIONS = a;
        var l = { TIME_UNITS: n, TIME_CONVERSIONS: a };
        t.default = l;
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
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "IAk47ZQ3",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\series-info\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\series-info\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\series-info\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-progression-series-component"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression-series-header"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showUnlockAllButton"]]],null,10,8],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression-series-overview"],["flush-element"],["text","\\n"],["block",["each"],[["get",["series","statstones"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["statstone-info"],null,[["statstone","hoveredStatstone"],[["get",["statstoneData"]],["get",["hoveredStatstone"]]]]],false],["text","\\n"]],"locals":["statstoneData"]},{"statements":[["text","              "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-logo"],["flush-element"],["close-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","cdp-progression-statstones-completed"],["flush-element"],["append",["unknown",["milestonesPassed"]],false],["text"," / "],["append",["unknown",["totalMilestones"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-logo"],["flush-element"],["close-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","cdp-progression-statstones-completed"],["flush-element"],["append",["unknown",["milestonesPassed"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n                  "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_progression_passed_milestones_tooltip"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n                    "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_progression_mastery_upgraded_tooltip"]],false],["close-element"],["text","\\n                  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","span",[]],["static-attr","class","cdp-progression-mastery-upgrade"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],4],["text","              "],["close-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","cdp-progression-separator"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["static-attr","class","style-tooltip"],["flush-element"],["text","\\n                    "],["open-element","p",[]],["flush-element"],["append",["helper",["dynamic-tra"],["cdp_progression_series_pass_tooltip",["get",["pack","name"]]],null],false],["close-element"],["text","\\n                  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","cdp-progression-owned-from-packs"],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","src","/fe/lol-champion-details/series-ticket.png"],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","class"],["top","tooltip"]],6],["text","              "],["close-element"],["text","\\n"]],"locals":["pack"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-progression-series-info"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-series-content"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-progression-series-left"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-progression-series-name"],["flush-element"],["append",["unknown",["series","name"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["ownedFromPacks"]]],null,7],["text","          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-progression-series-right"],["flush-element"],["text","\\n"],["block",["if"],[["get",["setCompleted"]]],null,5],["text","            "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-milestone-progression"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],3],["block",["if"],[["get",["setCompleted"]]],null,2,1],["text","            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-series-border"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","cdp-progression-series-sale"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","cdp-progression-series-sale-label"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_sale_flag_text"]],false],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","sale-box sale-blur"],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","sale-box"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-progression-series-info incomplete"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-series-name"],["flush-element"],["append",["unknown",["series","name"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-series-border"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldRenderSale"]]],null,9],["text","      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-progression-series-unlock-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"unlockAll"],null],null],["flush-element"],["text","\\n        "],["append",["unknown",["tra","cdp_progression_statstones_series_unlock"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1),
          o = n(59),
          i = n(63);
        n(64);
        const { RunMixin: a } = s.EmberAddons.EmberLifeline;
        e.exports = s.Ember.Component.extend(a, {
          classNames: ["rcp-fe-lol-champion-details-statstone-component"],
          layout: n(65),
          statstonesService: s.Ember.inject.service("statstones"),
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
          isFeatured: s.Ember.computed.alias("statstone.isFeatured"),
          isRetired: s.Ember.computed.alias("statstone.isRetired"),
          isNotRetired: s.Ember.computed.not("isRetired"),
          playerRecord: s.Ember.computed.alias("statstone.playerRecord"),
          isOwned: s.Ember.computed.and(
            "playerRecord",
            "playerRecord.entitled",
          ),
          isStatstoneNotCompleted: s.Ember.computed.not("isStatstoneCompleted"),
          milestoneCompletionLevel: s.Ember.computed.alias(
            "statstonesService.milestoneCompletionLevel",
          ),
          milestoneLevel: s.Ember.computed.alias("playerRecord.milestoneLevel"),
          featuredStatstones: s.Ember.computed.alias(
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
                ComponentFactory: s.ComponentFactory,
              },
              n = {
                featured: this.get("featuredStatstones"),
                selection: this.get("statstone"),
                caller: this.element,
              };
            e.addEventListener("willHide", this.handleHideEvent),
              s.FlyoutManager.assignFlyout(
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
          isMilestonesCompleted: s.Ember.computed(
            "playerRecord.milestoneLevel",
            function () {
              const e = this.get("playerRecord.milestoneLevel");
              return this.get("statstonesService").isMilestonesCompleted(e);
            },
          ),
          isStatstoneCompleted: s.Ember.computed.or(
            "isMilestonesCompleted",
            "isRetired",
          ),
          milestoneProgressStyleList: s.Ember.computed(
            "milestoneLevel",
            "milestoneCompletionLevel",
            function () {
              const e = [],
                t = this.get("milestoneLevel"),
                n = this.get("milestoneCompletionLevel");
              for (let s = 0; s < n; s++) e[s] = s < t ? "filled" : "empty";
              return e;
            },
          ),
          statstoneCategoryLower: s.Ember.computed(
            "statstone.category",
            function () {
              const e = this.get("statstone.category");
              return this.get("statstonesService")
                .stripRarityFromCategory(e)
                .toLowerCase();
            },
          ),
          completionPercent: s.Ember.computed(
            "statstone.completionValue",
            function () {
              const e =
                this.get("statstone.completionValue") * o.PROGRESS_BAR_WIDTH;
              return Math.min(e, o.PROGRESS_BAR_WIDTH);
            },
          ),
          statstoneRarity: s.Ember.computed(
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
          ownedClassName: s.Ember.computed("isOwned", function () {
            return this.get("isOwned") ? "owned" : "notowned";
          }),
          actions: {
            toggleFeaturedFlyout: function () {
              this.get("isFlyoutOpen")
                ? (s.FlyoutManager.sendEvent(this.element, "hide"),
                  this.runTask(() => {
                    s.FlyoutManager.unassignFlyout(this.element);
                  }, 133),
                  this.set("isFlyoutOpen", !1))
                : (this.createFlyout(),
                  s.FlyoutManager.sendEvent(this.element, "show"),
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
        var s = n(1);
        const o = s.AudioPlugin.getChannel("sfx-ui"),
          i = s.AudioPlugin.getChannel("sfx-ambience");
        function a(e) {
          return o.createSound(e, { allowConcurrency: !1 });
        }
        function l(e) {
          return i.createSound(e, { isLoop: !0 });
        }
        const r = {
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
          commonState1: l(
            "/fe/lol-champion-details/audio/sfx-eternals-cdp-common-state1-hover.ogg",
          ),
          commonState2: l(
            "/fe/lol-champion-details/audio/sfx-eternals-cdp-common-state2-hover.ogg",
          ),
          commonState3: l(
            "/fe/lol-champion-details/audio/sfx-eternals-cdp-common-state3-hover.ogg",
          ),
          uniqueState1: l(
            "/fe/lol-champion-details/audio/sfx-eternals-cdp-unique-state1-hover.ogg",
          ),
          uniqueState2: l(
            "/fe/lol-champion-details/audio/sfx-eternals-cdp-unique-state2-hover.ogg",
          ),
          uniqueState3: l(
            "/fe/lol-champion-details/audio/sfx-eternals-cdp-unique-state3-hover.ogg",
          ),
        };
        t.SFX = r;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "9VgRgSpE",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\series-info\\\\statstone\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\series-info\\\\statstone\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\series-info\\\\statstone\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-progression-statstone ",["unknown",["ownedClassName"]]]]],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"onMouseEnter",["get",["statstone"]]],null],null],["dynamic-attr","onmouseleave",["helper",["action"],[["get",[null]],"onMouseLeave"],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["isOwned"]]],null,8],["text","  "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-wrapper"],["flush-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","cdp-progression-statstone-image"],["dynamic-attr","src",["concat",[["unknown",["statstone","imageUrl"]]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isRetired"]]],null,7],["text","    "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-description"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isOwned"]]],null,6,1],["text","    "],["close-element"],["text","\\n"],["block",["unless"],[["get",["isOwned"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","statstone-locked"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-name"],["flush-element"],["append",["unknown",["statstone","name"]],false],["close-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-rarity"],["flush-element"],["append",["unknown",["statstoneRarity"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["dynamic-attr","class",["concat",["progress-marker ",["get",["progress"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["progress"]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-logo milestone-progress"],["flush-element"],["close-element"],["text","\\n            "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-milestone-progress"],["flush-element"],["text","\\n"],["block",["each"],[["get",["milestoneProgressStyleList"]]],null,2],["text","            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-milestone"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-milestone-bar"],["flush-element"],["text","\\n            "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-progression-statstone-milestone-bar-fill statstone-",["unknown",["statstoneCategoryLower"]]]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"],["block",["if"],[["get",["isStatstoneNotCompleted"]]],null,3],["text","        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-value-info"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-milestones-passed"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-logo milestones-passed"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-milestones-passed-value"],["flush-element"],["append",["unknown",["statstone","formattedMilestoneLevel"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-personal-best"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-personal-best-icon"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-personal-best-value"],["flush-element"],["append",["unknown",["statstone","formattedPersonalBest"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-header"],["flush-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-value"],["flush-element"],["append",["unknown",["statstone","formattedValue"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-name-info"],["flush-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-name-owned"],["flush-element"],["append",["unknown",["statstone","name"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["isStatstoneCompleted"]]],null,5],["text","        "],["close-element"],["text","\\n"],["block",["if"],[["get",["isNotRetired"]]],null,4],["text","        "],["open-element","div",[]],["dynamic-attr","class",["concat",["series-featured ",["helper",["if"],[["get",["isFeatured"]],"selected"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"toggleFeaturedFlyout"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-progression-retired-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-progression-magic-mograph-wrapper statstone-",["unknown",["statstoneCategoryLower"]]]]],["flush-element"],["text","\\n      "],["open-element","uikit-video",[]],["static-attr","class","cdp-progression-owned-magic-mograph"],["static-attr","src","/fe/lol-champion-details/video/champion-detail-owned-magic.webm"],["static-attr","cache-name","rcp-fe-lol-champion-details"],["static-attr","preload",""],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(67),
          (e.exports = s.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-showcase-item"],
            layout: n(68),
            statstonesService: s.Ember.inject.service("statstones"),
            showcaseItem: null,
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "yP5q6V17",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\showcase-component\\\\showcase-item\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\showcase-component\\\\showcase-item\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\showcase-component\\\\showcase-item\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-progression-showcase-item"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression-showcase-item-logo"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-progression-showcase-star"],["flush-element"],["close-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","cdp-progression-showcase-item-image"],["dynamic-attr","src",["concat",[["unknown",["showcaseItem","imageUrl"]]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["showcaseItem","isRetired"]]],null,0],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression-showcase-item-value"],["flush-element"],["append",["unknown",["showcaseItem","formattedValue"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression-showcase-item-name"],["flush-element"],["append",["unknown",["showcaseItem","name"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-progression-retired-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(70),
          (e.exports = s.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-overview-section"],
            layout: n(71),
            championService: s.Ember.inject.service("champion"),
            champion: s.Ember.computed.alias("championService.champion"),
            locale: s.Ember.computed.alias(
              "championService.regionLocale.locale",
            ),
            championOwned: s.Ember.computed.bool(
              "championService.summonerChampion.ownership.owned",
            ),
            shortBio: s.Ember.computed("champion.shortBio", function () {
              const e = this.get("champion.shortBio");
              return "string" != typeof e ? "" : e.replace(/''/g, '"');
            }),
            actions: {
              learnMore(e, t) {
                s.Telemetry.sendEvent("cdp-universe-champion-page-opened", e),
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
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "58XxsjK2",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\root\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\root\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\root\\\\index.js\\" "],["text","\\n"],["open-element","section",[]],["static-attr","class","cdp-content-column"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-overview-stats"],["flush-element"],["text","\\n    "],["append",["unknown",["tactical-info"]],false],["text","\\n    "],["append",["unknown",["playstyle-info"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","class","cdp-overview-description"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","cdp-overview-short-bio"],["flush-element"],["append",["helper",["sanitize"],[["get",["shortBio"]]],null],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","cdp-button-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showStoreButton"]]],null,2],["text","  "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-learn-more-button"],["static-attr","type","external"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"learnMore",["get",["champion","alias"]],["get",["locale"]]],null],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","cdp_actions_learn_more"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"unlockChampion",["get",["champion","id"]]],null],null],["flush-element"],["text","\\n        "],["append",["unknown",["tra","cdp_actions_unlock"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n        "],["append",["unknown",["tra","cdp_store_owned_message"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["championOwned"]]],null,1,0]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(73),
          (e.exports = s.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-details-section"],
            layout: n(74),
            statstonesService: s.Ember.inject.service("statstones"),
            UXSettings: s.Ember.inject.service("ux-settings"),
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
            playerRecord: s.Ember.computed.alias("statstone.playerRecord"),
            isNotRetired: s.Ember.computed.not("statstone.isRetired"),
            statstoneCategoryLower: s.Ember.computed(
              "statstone.category",
              function () {
                const e = this.get("statstone.category");
                return this.get("statstonesService")
                  .stripRarityFromCategory(e)
                  .toLowerCase();
              },
            ),
            statstoneRarityLower: s.Ember.computed(
              "statstoneRarity",
              function () {
                return this.get("statstoneRarity").toLowerCase();
              },
            ),
            statstoneRarity: s.Ember.computed("statstone.isEpic", function () {
              const e = this.get("statstone.isEpic");
              return this.get("statstonesService").statstoneRarity(e);
            }),
            formattedDate: s.Ember.computed(
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
            sfxString: s.Ember.computed(
              "completionLevel",
              "statstoneRarityLower",
              function () {
                const e = this.get("completionLevel");
                return `${this.get("statstoneRarityLower")}State${e}`;
              },
            ),
            completionLevel: s.Ember.computed(
              "playerRecord.milestoneLevel",
              function () {
                const e = this.get("playerRecord.milestoneLevel");
                return this.get(
                  "statstonesService",
                ).getStatstoneCompletionLevel(e);
              },
            ),
            completionLevelString: s.Ember.computed(
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
            completionLevelArray: s.Ember.computed(
              "completionLevel",
              function () {
                const e = this.get("completionLevel"),
                  t = [];
                for (let n = 0; n < e; n++) t.push(n);
                return t;
              },
            ),
            isMilestonesCompleted: s.Ember.computed(
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
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "dFGaBSnN",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\details-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\details-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\details-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-right-component"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-right-eternal-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["UXSettings","largeAreaAnimationsEnabled"]]],null,13,7],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-right-eternal-info"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-right-description"],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","cdp-right-statstone-value"],["flush-element"],["append",["unknown",["statstone","formattedValue"]],false],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","cdp-right-statstone-name"],["flush-element"],["append",["unknown",["statstone","name"]],false],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","cdp-right-statstone-rarity"],["flush-element"],["text","\\n"],["block",["if"],[["get",["statstone","isEpic"]]],null,4,3],["text","      "],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","cdp-right-statstone-purchase-date"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_date_acquired_text"]],false],["text"," "],["append",["unknown",["formattedDate"]],false],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","cdp-right-statstone-description"],["flush-element"],["append",["unknown",["statstone","description"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-progression-content-divider-line"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-right-progression-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isNotRetired"]]],null,2],["text","      "],["open-element","div",[]],["static-attr","class","cdp-right-progression"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","cdp-right-progression-header"],["flush-element"],["append",["unknown",["tra","cdp_progression_passed_milestones"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-right-value-wrapper"],["flush-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","cdp-right-milestone-icon"],["flush-element"],["close-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","cdp-right-progression-value"],["flush-element"],["append",["unknown",["statstone","formattedMilestoneLevel"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-right-progression"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isMilestonesCompleted"]]],null,1,0],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n  \\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","span",[]],["static-attr","class","cdp-right-progression-header"],["flush-element"],["append",["unknown",["tra","cdp_progression_personal_best"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-right-personal-best-description"],["flush-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","cdp-right-lock-icon"],["flush-element"],["close-element"],["text","\\n              "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_progression_unlock_personal_best"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","span",[]],["static-attr","class","cdp-right-progression-header"],["flush-element"],["append",["unknown",["tra","cdp_progression_personal_best"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-right-progression-value"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","cdp-right-personal-best-icon"],["flush-element"],["close-element"],["text","\\n              "],["open-element","span",[]],["flush-element"],["append",["unknown",["statstone","formattedPersonalBest"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-right-progression"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","cdp-right-progression-header"],["flush-element"],["append",["unknown",["tra","cdp_progression_next_milestone"]],false],["close-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","cdp-right-progression-value"],["flush-element"],["append",["unknown",["statstone","nextMilestone"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["unknown",["tra","cdp_progression_statstones_rarity_common"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["unknown",["tra","cdp_progression_statstones_rarity_unique"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","cdp-right-eternal-image common"],["dynamic-attr","src",["concat",[["unknown",["statstone","imageUrl"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","cdp-right-eternal-image"],["dynamic-attr","src",["concat",[["unknown",["statstone","imageUrl"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["statstone","isEpic"]]],null,6,5]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","cdp-right-eternal-background"],["flush-element"],["text","\\n          "],["open-element","uikit-video",[]],["dynamic-attr","class",["concat",["cdp-right-eternal-background-mograph statstone-",["unknown",["statstoneCategoryLower"]]]]],["static-attr","src","/fe/lol-champion-details/video/champion-detail-statstone-common-particle.webm"],["static-attr","preload",""],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","cdp-right-eternal-image common"],["dynamic-attr","src",["concat",["/fe/lol-champion-details/",["unknown",["statstoneCategoryLower"]],"-",["unknown",["statstoneRarityLower"]],"-bg-",["unknown",["completionLevel"]],".png"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-right-eternal-flame common ",["unknown",["statstoneCategoryLower"]]]]],["flush-element"],["text","\\n        "],["open-element","uikit-video",[]],["dynamic-attr","class",["concat",["cdp-right-eternal-flame-mograph statstone-",["unknown",["statstoneCategoryLower"]]]]],["dynamic-attr","src",["concat",["/fe/lol-champion-details/video/champion-detail-statstone-common-flame-",["unknown",["completionLevel"]],".webm"]]],["static-attr","preload",""],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","cdp-right-eternal-image common"],["dynamic-attr","src",["concat",["/fe/lol-champion-details/",["unknown",["statstoneCategoryLower"]],"-",["unknown",["statstoneRarityLower"]],"-object-",["unknown",["completionLevel"]],".png"]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isMilestonesCompleted"]]],null,8]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","cdp-right-eternal-background"],["flush-element"],["text","\\n          "],["open-element","uikit-video",[]],["dynamic-attr","class",["concat",["cdp-right-eternal-background-mograph statstone-",["unknown",["statstoneCategoryLower"]]]]],["static-attr","src","/fe/lol-champion-details/video/champion-detail-statstone-background.webm"],["static-attr","preload",""],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-right-orb statstone-",["unknown",["statstoneCategoryLower"]]," ",["unknown",["completionLevelString"]],"-orb"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["iterate"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-right-orb-rings"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-right-orb-wrapper"],["flush-element"],["text","\\n"],["block",["each"],[["get",["completionLevelArray"]]],null,11],["text","      "],["close-element"],["text","\\n"],["block",["if"],[["get",["isMilestonesCompleted"]]],null,10],["text","      "],["open-element","img",[]],["static-attr","class","cdp-right-eternal-image"],["dynamic-attr","src",["concat",["/fe/lol-champion-details/",["unknown",["statstoneCategoryLower"]],"-",["unknown",["statstoneRarityLower"]],"-",["unknown",["completionLevel"]],".png"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-right-eternal-flame ",["unknown",["statstoneCategoryLower"]]]]],["flush-element"],["text","\\n        "],["open-element","uikit-video",[]],["dynamic-attr","class",["concat",["cdp-right-eternal-flame-mograph statstone-",["unknown",["statstoneCategoryLower"]]]]],["dynamic-attr","src",["concat",["/fe/lol-champion-details/video/champion-detail-statstone-flame-",["unknown",["completionLevel"]],".webm"]]],["static-attr","preload",""],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["statstone","isEpic"]]],null,12,9]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1),
          o = n(28);
        n(76),
          (e.exports = s.Ember.Component.extend({
            layout: n(77),
            classNames: ["cdp-tactical-info-component"],
            championService: s.Ember.inject.service("champion"),
            champion: s.Ember.computed.alias("championService.champion"),
            damageType: s.Ember.computed(
              "champion.tacticalInfo.damageType",
              function () {
                let e = this.get("champion.tacticalInfo.damageType");
                return e
                  ? ((e = e.toLowerCase()),
                    e.startsWith("k") && (e = e.substring(1)),
                    (0, o.translate)(this, `cdp_tactical_damage_${e}`))
                  : "";
              },
            ),
            stylePercent: s.Ember.computed(
              "champion.tacticalInfo.style",
              function () {
                const e = this.get("champion.tacticalInfo.style");
                if (e) {
                  return (e - 1) * (100 / 9);
                }
                return 0;
              },
            ),
            abilityIconClass: s.Ember.computed("stylePercent", function () {
              return this.get("stylePercent") >= 50
                ? "abilities-icon"
                : "abilities-icon-grey";
            }),
            attacksIconClass: s.Ember.computed("stylePercent", function () {
              return this.get("stylePercent") <= 50
                ? "attacks-icon"
                : "attacks-icon-grey";
            }),
            difficultyLevel: s.Ember.computed.alias(
              "champion.tacticalInfo.difficulty",
            ),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "J7LeTs8K",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\tactical-info\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\tactical-info\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\tactical-info\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","tactical-info-damage"],["flush-element"],["text","\\n  "],["open-element","h6",[]],["static-attr","class","damage-label"],["flush-element"],["append",["unknown",["tra","cdp_tactical_damage_tooltip_title"]],false],["text",":"],["close-element"],["text","\\n  "],["open-element","p",[]],["static-attr","class","damage-value"],["flush-element"],["append",["unknown",["damageType"]],false],["close-element"],["text","\\n\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","class"],["right","tooltip"]],2],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","tactical-info-style"],["flush-element"],["text","\\n  "],["open-element","h6",[]],["static-attr","class","style-label"],["flush-element"],["append",["unknown",["tra","cdp_tactical_style_tooltip_title"]],false],["text",":"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","continuum-graph-container"],["flush-element"],["text","\\n    "],["open-element","span",[]],["dynamic-attr","class",["concat",["continuum-graph-icon ",["unknown",["attacksIconClass"]]]]],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","continuum-graph"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","continuum-graph-pip-container"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","continuum-graph-pip"],["dynamic-attr","style",["concat",["left:",["unknown",["stylePercent"]],"%"]]],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","span",[]],["dynamic-attr","class",["concat",["continuum-graph-icon ",["unknown",["abilityIconClass"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","class"],["right","tooltip"]],1],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","tactical-info-difficulty"],["flush-element"],["text","\\n  "],["open-element","h6",[]],["static-attr","class","difficulty-label"],["flush-element"],["append",["unknown",["tra","cdp_tactical_difficulty_tooltip_title"]],false],["text",":"],["close-element"],["text","\\n  "],["open-element","span",[]],["dynamic-attr","class",["concat",["difficulty-graph difficulty-level-",["unknown",["difficultyLevel"]]]]],["flush-element"],["close-element"],["text","\\n\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","class"],["right","tooltip"]],0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","difficulty-tooltip"],["flush-element"],["text","\\n      "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_tactical_difficulty_tooltip_title"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_tactical_difficulty_tooltip"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","style-tooltip"],["flush-element"],["text","\\n      "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_tactical_style_tooltip_title"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_tactical_style_tooltip"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","damage-tooltip"],["flush-element"],["text","\\n      "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_tactical_damage_tooltip_title"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_tactical_damage_tooltip"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(79),
          (e.exports = s.Ember.Component.extend({
            classNames: ["cdp-playstyle-info-component"],
            layout: n(80),
            championService: s.Ember.inject.service("champion"),
            champion: s.Ember.computed.alias("championService.champion"),
            onDidInsertElement: s.Ember.on("didInsertElement", function () {
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
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "6mzbYxkQ",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\playstyle-info\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\playstyle-info\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\playstyle-info\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-graph-background"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","stat-segment damage"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tooltip-anchor"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","showEvent","hideEvent","class"],["top","show","hide","tooltip"]],4],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hover-event-mask"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["segment-fill level-",["unknown",["champion","playstyleInfo","damage"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","stat-segment toughness"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tooltip-anchor"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","showEvent","hideEvent","class"],["top","show","hide","tooltip"]],3],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hover-event-mask"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["segment-fill level-",["unknown",["champion","playstyleInfo","durability"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","stat-segment crowd-control"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tooltip-anchor"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","showEvent","hideEvent","class"],["bottom","show","hide","tooltip"]],2],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hover-event-mask"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["segment-fill level-",["unknown",["champion","playstyleInfo","crowdControl"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","stat-segment mobility"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tooltip-anchor"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","showEvent","hideEvent","class"],["bottom","show","hide","tooltip"]],1],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hover-event-mask"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["segment-fill level-",["unknown",["champion","playstyleInfo","mobility"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","stat-segment utility"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tooltip-anchor"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","showEvent","hideEvent","class"],["top","show","hide","tooltip"]],0],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hover-event-mask"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["segment-fill level-",["unknown",["champion","playstyleInfo","utility"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","utility-tt"],["flush-element"],["text","\\n          "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_utility_tooltip_title"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_utility_tooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","mobility-tt"],["flush-element"],["text","\\n          "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_mobility_tooltip_title"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_mobility_tooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","crowd-control-tt"],["flush-element"],["text","\\n          "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_crowd_control_tooltip_title"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_crowd_control_tooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","toughness-tt"],["flush-element"],["text","\\n          "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_toughness_tooltip_title"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_toughness_tooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","damage-tt"],["flush-element"],["text","\\n          "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_damage_tooltip_title"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_damage_tooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(82);
        const o = [
          { spellKey: "q", preload: "champion.spells.0.preload" },
          { spellKey: "w", preload: "champion.spells.1.preload" },
          { spellKey: "e", preload: "champion.spells.2.preload" },
          { spellKey: "r", preload: "champion.spells.3.preload" },
          { spellKey: "p", preload: "champion.passive.preload" },
        ];
        e.exports = s.Ember.Component.extend({
          layout: n(83),
          activeAbility: "ability_q",
          championService: s.Ember.inject.service("champion"),
          champion: s.Ember.computed.alias("championService.champion"),
          spellbookOverride: s.Ember.computed(
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
          onInit: s.Ember.on("init", function () {
            s.Ember.run.scheduleOnce("afterRender", () =>
              this.sendAction("sectionLoaded", "abilities"),
            );
          }),
          actions: {
            changeAbility(e) {
              this.set("activeAbility", `ability_${e}`);
            },
            videoPreloadDone(e) {
              for (let t = 0; t < o.length - 1; t++)
                o[t].spellKey === e && this.set(o[t + 1].preload, "auto");
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "ze18IEnk",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\root\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\root\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\root\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["champion","spells"]]],null,4]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","lol-uikit-section",[]],["dynamic-attr","section-id",["concat",["ability_",["unknown",["ability","spellKey"]]]]],["static-attr","class","cdp-ability-section-container"],["flush-element"],["text","\\n                "],["append",["helper",["ability-video"],null,[["ability","videoPreloadDone"],[["get",["ability"]],["helper",["action"],[["get",[null]],"videoPreloadDone"],null]]]],false],["text","\\n                "],["append",["helper",["ability-description"],null,[["ability","isOverride"],[["get",["ability"]],true]]],false],["text","\\n            "],["close-element"],["text","\\n"]],"locals":["ability"]},{"statements":[["block",["each"],[["get",["abilityOverride"]]],null,0]],"locals":["abilityOverride"]},{"statements":[["block",["each"],[["get",["spellbookOverride"]]],null,1]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-section",[]],["dynamic-attr","section-id",["concat",["ability_",["unknown",["ability","spellKey"]]]]],["static-attr","class","cdp-ability-section-container"],["flush-element"],["text","\\n        "],["append",["helper",["ability-video"],null,[["ability","videoPreloadDone"],[["get",["ability"]],["helper",["action"],[["get",[null]],"videoPreloadDone"],null]]]],false],["text","\\n        "],["append",["helper",["ability-description"],null,[["ability","isOverride"],[["get",["ability"]],["get",["ability","hasOverride"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["ability"]},{"statements":[["open-element","lol-uikit-section-controller",[]],["dynamic-attr","selected-item",["concat",[["unknown",["activeAbility"]]]]],["static-attr","class","cdp-abilities-section-controller"],["static-attr","animation","crossfade"],["flush-element"],["text","\\n"],["block",["each"],[["get",["champion","spells"]]],null,3],["block",["if"],[["get",["spellbookOverride"]]],null,2],["text","\\n    "],["open-element","lol-uikit-section",[]],["static-attr","section-id","ability_p"],["static-attr","class","cdp-ability-section-container"],["flush-element"],["text","\\n        "],["append",["helper",["ability-video"],null,[["ability","videoPreloadDone"],[["get",["champion","passive"]],["helper",["action"],[["get",[null]],"videoPreloadDone"],null]]]],false],["text","\\n        "],["append",["helper",["ability-description"],null,[["ability"],[["get",["champion","passive"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n  "],["append",["helper",["ability-picker"],null,[["changeAbility","abilitiesSectionShown"],[["helper",["action"],[["get",[null]],"changeAbility"],null],["get",["abilitiesSectionShown"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1),
          o = n(28);
        n(85);
        const i = { q: 0, w: 1, e: 2, r: 3 };
        e.exports = s.Ember.Component.extend({
          classNames: ["rcp-fe-lol-champion-details-ability-picker"],
          layout: n(86),
          championService: s.Ember.inject.service("champion"),
          champion: s.Ember.computed.alias("championService.champion"),
          defaultAbility: "q",
          activeAbility: "q",
          videoProgress: 0,
          videoProgressPoller: null,
          videoReadyTimeout: null,
          abilitiesPickerState: s.Ember.computed(
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
          spellbookOverride: s.Ember.computed(
            "champion.spellbookOverride",
            "activeAbility",
            function () {
              const e = this.get("champion.spellbookOverride"),
                t = this.get("activeAbility"),
                n = this.getOverridesForSpellbook(t, e);
              return (
                null !== n &&
                  n.forEach((e) => {
                    e.spellKeyTra = (0, o.translate)(
                      this,
                      `cdp_ability_key_${e.spellKey[1]}`,
                    );
                  }),
                n
              );
            },
          ),
          abilities: s.Ember.computed(
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
                    e.spellKeyTra = (0, o.translate)(
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
              s = this.get("champion.spellbookOverride");
            t.set("active", !1),
              n.setEach("active", !1),
              null != s &&
                s.forEach((e) => {
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
              const s = setInterval(() => {
                const t = this.getVideoElement(e);
                if (t)
                  if (t.ended) this.resetVideoProperties(e);
                  else {
                    const e = (t.currentTime / t.duration) * 100;
                    this.set("videoProgress", e);
                  }
              }, 50);
              this.set("videoProgressPoller", s);
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
                s = this.get("abilities"),
                o = this.getOverridesForSpellbook(t, n),
                i = e.substring(0, 1);
              o.findBy("spellKey", e).set("active", !0),
                o.findBy("spellKey", e).set("preload", "auto"),
                s.findBy("spellKey", i).set("active", !0),
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
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "nKbFjdKF",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-picker\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-picker\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-picker\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","spellbook-wrapper"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","spellbook"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",[["unknown",["abilitiesPickerState"]]," ability ability-passive ",["helper",["if"],[["get",["champion","passive","active"]],"active"],null]]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","ability-icon-wrapper"],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","class","ability-icon"],["dynamic-attr","src",["concat",[["unknown",["champion","passive","abilityIconPath"]]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectAbility","p"],null],null],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["champion","passive","active"]]],null,4],["text","\\n            "],["open-element","div",[]],["static-attr","class","ability-key"],["flush-element"],["append",["unknown",["tra","cdp_ability_key_passive"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n\\n"],["block",["each"],[["get",["abilities"]]],null,3],["text","    "],["close-element"],["text","\\n\\n\\n"],["block",["if"],[["get",["spellbookOverride"]]],null,1],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["concat",["ability ability-",["unknown",["abilityOverride","spellKey"]]," ",["helper",["if"],[["get",["abilityOverride","active"]],"active"],null]]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","ability-icon-wrapper"],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","class","ability-icon"],["dynamic-attr","src",["concat",[["unknown",["abilityOverride","abilityIconPath"]]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectAbilityOverride",["get",["abilityOverride","spellKey"]]],null],null],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","ability-key"],["flush-element"],["append",["unknown",["abilityOverride","spellKeyTra"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["abilityOverride"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","spellbookOverride"],["flush-element"],["text","\\n"],["block",["each"],[["get",["spellbookOverride"]]],null,0],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","ability-video-progress"],["dynamic-attr","style",["concat",["width:",["unknown",["videoProgress"]],"%"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["concat",["ability ability-",["unknown",["ability","spellKey"]]," ",["helper",["if"],[["get",["ability","active"]],"active"],null]]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","ability-icon-wrapper"],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","class","ability-icon"],["dynamic-attr","src",["concat",[["unknown",["ability","abilityIconPath"]]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectAbility",["get",["ability","spellKey"]]],null],null],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["ability","active"]]],null,2],["text","\\n            "],["open-element","div",[]],["static-attr","class","ability-key"],["flush-element"],["append",["unknown",["ability","spellKeyTra"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["ability"]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","ability-video-progress"],["dynamic-attr","style",["concat",["width:",["unknown",["videoProgress"]],"%"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(88);
        const o = "https://d28xe8vt774jo5.cloudfront.net/";
        e.exports = s.Ember.Component.extend({
          classNames: ["rcp-fe-lol-champion-details-ability-video"],
          layout: n(89),
          championService: s.Ember.inject.service("champion"),
          webAssetsBasePath: s.Ember.computed.alias(
            "championService.webAssetsBasePath",
          ),
          audioVolume: s.Ember.computed(
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
              let s = this.get(
                  "championService.audioSettings.data.masterVolume",
                ),
                o = this.get("championService.audioSettings.data.sfxVolume");
              const i = !1 === t || !1 === n;
              void 0 === s && (s = e), void 0 === o && (o = e);
              const a = parseFloat((s / e) * (o / e));
              return i ? 0 : a;
            },
          ),
          regionLocale: s.Ember.computed.alias("championService.regionLocale"),
          locale: s.Ember.computed.alias("regionLocale.locale"),
          onDidInsertElement: s.Ember.on("didInsertElement", function () {
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
          abilityVideoBasePath: s.Ember.computed(
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
                      : o
                : o;
            },
          ),
          preloadVideo: s.Ember.computed("ability.preload", function () {
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
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "f0I44jkE",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-video\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-video\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-video\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["ability","abilityVideoPath"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["append",["unknown",["champion-backdrop"]],false],["text","\\n"]],"locals":[]},{"statements":[["open-element","div",[]],["static-attr","class","cdp-ability-video"],["flush-element"],["text","\\n  "],["open-element","video",[]],["dynamic-attr","class",["concat",["ability-video-",["helper",["if"],[["get",["ability","spellKey"]],["get",["ability","spellKey"]],"p"],null]]]],["dynamic-attr","preload",["concat",[["unknown",["preloadVideo"]]]]],["dynamic-attr","src",["concat",[["unknown",["abilityVideoBasePath"]],["unknown",["ability","abilityVideoPath"]]]]],["dynamic-attr","poster",["concat",[["unknown",["abilityVideoBasePath"]],["unknown",["ability","abilityVideoImagePath"]]]]],["static-attr","width","100%"],["static-attr","height","100%"],["dynamic-attr","volume",["unknown",["audioVolume"]],null],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","loading-spinner"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.slashifyArray = l);
        var s = n(1),
          o = n(28);
        n(91);
        var i,
          a = (i = n(92)) && i.__esModule ? i : { default: i };
        function l(e) {
          return e.every((t) => t === e[0]) ? e[0].toString() : e.join("/");
        }
        e.exports = s.Ember.Component.extend({
          classNames: ["rcp-fe-lol-champion-details-ability-description"],
          classNameBindings: ["isOverride"],
          layout: n(93),
          isPassive: s.Ember.computed.empty("ability.spellKey"),
          ability: null,
          isOverride: null,
          formatAbilityTokenValues(e) {
            let t = this.get("ability.maxLevel");
            return void 0 === t && (t = 5), l((e = e.slice(0, t)));
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
              (e, n, s, o) => {
                if (o && t[n]) {
                  o = parseFloat(o);
                  let e = t[n];
                  return (
                    (e = e.slice(1).map((e) => Math.round(e * o))),
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
                const s = (e, n, s, o = 1) => {
                  o = parseFloat(o);
                  return this.prettyFloat(t * o * 100) + "%";
                };
                if ("coefficient1" === n) {
                  const t =
                    /@\s?(CharAbilityPower|CharBonusPhysical|CharTotalPhysical)(\*(-?[0-9]*\.?[0-9]+))?\s?@/g;
                  e = e.replace(t, s);
                }
                if ("coefficient2" === n) {
                  const t =
                    /@\s?(CharAbilityPower|CharBonusPhysical|CharTotalPhysical)2(\*(-?[0-9]*\.?[0-9]+))?\s?@/g;
                  e = e.replace(t, s);
                }
              }),
              e
            );
          },
          prettyFloat: (e) => ((e = e.toFixed(2)), parseFloat(e)),
          replaceFormula(e, t, n, s) {
            const o = this.get("ability.effectAmounts");
            let i;
            if (/^Effect[0-9]+$/.test(t)) {
              const e = o[`${t}Amount`];
              e && (t = this.formatAbilityTokenValues(e.slice(1)));
            }
            if (t.includes("/"))
              i = t
                .split("/")
                .map((e) => this.prettyFloat(parseFloat(e) * n))
                .join("/");
            else {
              if (isNaN(parseFloat(t))) return s;
              i = this.prettyFloat(parseFloat(t) * n);
            }
            return i;
          },
          replaceFormulas(e) {
            const t = this.get("ability.formulas") || {};
            return (e = e.replace(
              /@\s?(f[0-9]+)(\*(-?[0-9]*\.?[0-9]+))?\s?@%?/g,
              (e, n, s, i = 1) => {
                const a = t[n];
                if (!a || "" === a.link || "" === a.coefficient) return "0";
                i = parseFloat(i);
                const { link: l, coefficient: r } = t[n];
                if ("@" === l[0]) return this.replaceFormula(l, r, i, e);
                {
                  const t = this.replaceFormula(l, r, 100 * i, e);
                  return (0, o.translate)(this, `cdp_ability_formula_${l}`, {
                    value: t,
                  });
                }
              },
            ));
          },
          replaceFormulaExpression(e, t, n, s, o) {
            const i = /Effect[0-9]+/.exec(t);
            if (!i) return t;
            const a = i[0] + "Amount",
              l = o[a];
            if (l) {
              const e = this.formatAbilityTokenValues(l.slice(1))
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
                (e, s, o, i = 1) => {
                  i = parseFloat(i);
                  const { link: a, coefficient: l } = t[s];
                  let r;
                  return (
                    (r = this.replaceFormulaExpression(a, l, i, e, n)),
                    /@(f[0-9])@/.test(r) && (r = this.replaceFormulas(r)),
                    r
                  );
                },
              );
            }
            return e;
          },
          replaceAmmo(e) {
            const t = this.get("ability.ammo");
            if (!t) return e;
            let { ammoRechargeTime: n, maxAmmo: s } = t;
            return (
              (n = this.formatAbilityTokenValues(n)),
              (s = this.formatAbilityTokenValues(s)),
              (e = (e = e.replace(/@AmmoRechargeTime@/g, n)).replace(
                /@MaxAmmo@/g,
                s,
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
          costString: s.Ember.computed(
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
          rangeString: s.Ember.computed(
            "ability.range",
            "ability.spellKey",
            function () {
              return this.formatAbilityTokenValues(this.get("ability.range"));
            },
          ),
          cooldownString: s.Ember.computed(
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
          descriptionString: s.Ember.computed(
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
        var s;
        (e = n.nmd(e)),
          function () {
            var o,
              i = "Expected a function",
              a = "__lodash_hash_undefined__",
              l = "__lodash_placeholder__",
              r = 16,
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
                ["curryRight", r],
                ["flip", 512],
                ["partial", c],
                ["partialRight", u],
                ["rearg", m],
              ],
              v = "[object Arguments]",
              y = "[object Array]",
              b = "[object Boolean]",
              E = "[object Date]",
              x = "[object Error]",
              k = "[object Function]",
              S = "[object GeneratorFunction]",
              w = "[object Map]",
              C = "[object Number]",
              T = "[object Object]",
              I = "[object Promise]",
              O = "[object RegExp]",
              R = "[object Set]",
              L = "[object String]",
              A = "[object Symbol]",
              P = "[object WeakMap]",
              N = "[object ArrayBuffer]",
              M = "[object DataView]",
              D = "[object Float32Array]",
              j = "[object Float64Array]",
              F = "[object Int8Array]",
              B = "[object Int16Array]",
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
              se =
                /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
              oe = /[\\^$.*+?()[\]{}|]/g,
              ie = RegExp(oe.source),
              ae = /^\s+|\s+$/g,
              le = /^\s+/,
              re = /\s+$/,
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
              xe = /($^)/,
              ke = /['\n\r\u2028\u2029\\]/g,
              Se = "\\ud800-\\udfff",
              we = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff",
              Ce = "\\u2700-\\u27bf",
              Te = "a-z\\xdf-\\xf6\\xf8-\\xff",
              Ie = "A-Z\\xc0-\\xd6\\xd8-\\xde",
              Oe = "\\ufe0e\\ufe0f",
              Re =
                "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
              Le = "['’]",
              Ae = "[" + Se + "]",
              Pe = "[" + Re + "]",
              Ne = "[" + we + "]",
              Me = "\\d+",
              De = "[" + Ce + "]",
              je = "[" + Te + "]",
              Fe = "[^" + Se + Re + Me + Ce + Te + Ie + "]",
              Be = "\\ud83c[\\udffb-\\udfff]",
              Ue = "[^" + Se + "]",
              Ve = "(?:\\ud83c[\\udde6-\\uddff]){2}",
              He = "[\\ud800-\\udbff][\\udc00-\\udfff]",
              We = "[" + Ie + "]",
              qe = "\\u200d",
              Ke = "(?:" + je + "|" + Fe + ")",
              $e = "(?:" + We + "|" + Fe + ")",
              Ge = "(?:['’](?:d|ll|m|re|s|t|ve))?",
              Ye = "(?:['’](?:D|LL|M|RE|S|T|VE))?",
              ze = "(?:" + Ne + "|" + Be + ")" + "?",
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
              Ze = "(?:" + [De, Ve, He].join("|") + ")" + Xe,
              Je = "(?:" + [Ue + Ne + "?", Ne, Ve, He, Ae].join("|") + ")",
              et = RegExp(Le, "g"),
              tt = RegExp(Ne, "g"),
              nt = RegExp(Be + "(?=" + Be + ")|" + Je + Xe, "g"),
              st = RegExp(
                [
                  We +
                    "?" +
                    je +
                    "+" +
                    Ge +
                    "(?=" +
                    [Pe, We, "$"].join("|") +
                    ")",
                  $e + "+" + Ye + "(?=" + [Pe, We + Ke, "$"].join("|") + ")",
                  We + "?" + Ke + "+" + Ge,
                  We + "+" + Ye,
                  "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
                  "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
                  Me,
                  Ze,
                ].join("|"),
                "g",
              ),
              ot = RegExp("[" + qe + Se + we + Oe + "]"),
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
              lt = -1,
              rt = {};
            (rt[D] =
              rt[j] =
              rt[F] =
              rt[B] =
              rt[U] =
              rt[V] =
              rt[H] =
              rt[W] =
              rt[q] =
                !0),
              (rt[v] =
                rt[y] =
                rt[N] =
                rt[b] =
                rt[M] =
                rt[E] =
                rt[x] =
                rt[k] =
                rt[w] =
                rt[C] =
                rt[T] =
                rt[O] =
                rt[R] =
                rt[L] =
                rt[P] =
                  !1);
            var ct = {};
            (ct[v] =
              ct[y] =
              ct[N] =
              ct[M] =
              ct[b] =
              ct[E] =
              ct[D] =
              ct[j] =
              ct[F] =
              ct[B] =
              ct[U] =
              ct[w] =
              ct[C] =
              ct[T] =
              ct[O] =
              ct[R] =
              ct[L] =
              ct[A] =
              ct[V] =
              ct[H] =
              ct[W] =
              ct[q] =
                !0),
              (ct[x] = ct[k] = ct[P] = !1);
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
              xt = bt && bt.isDate,
              kt = bt && bt.isMap,
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
            function It(e, t, n, s) {
              for (var o = -1, i = null == e ? 0 : e.length; ++o < i; ) {
                var a = e[o];
                t(s, a, n(a), e);
              }
              return s;
            }
            function Ot(e, t) {
              for (
                var n = -1, s = null == e ? 0 : e.length;
                ++n < s && !1 !== t(e[n], n, e);

              );
              return e;
            }
            function Rt(e, t) {
              for (
                var n = null == e ? 0 : e.length;
                n-- && !1 !== t(e[n], n, e);

              );
              return e;
            }
            function Lt(e, t) {
              for (var n = -1, s = null == e ? 0 : e.length; ++n < s; )
                if (!t(e[n], n, e)) return !1;
              return !0;
            }
            function At(e, t) {
              for (
                var n = -1, s = null == e ? 0 : e.length, o = 0, i = [];
                ++n < s;

              ) {
                var a = e[n];
                t(a, n, e) && (i[o++] = a);
              }
              return i;
            }
            function Pt(e, t) {
              return !!(null == e ? 0 : e.length) && Wt(e, t, 0) > -1;
            }
            function Nt(e, t, n) {
              for (var s = -1, o = null == e ? 0 : e.length; ++s < o; )
                if (n(t, e[s])) return !0;
              return !1;
            }
            function Mt(e, t) {
              for (
                var n = -1, s = null == e ? 0 : e.length, o = Array(s);
                ++n < s;

              )
                o[n] = t(e[n], n, e);
              return o;
            }
            function Dt(e, t) {
              for (var n = -1, s = t.length, o = e.length; ++n < s; )
                e[o + n] = t[n];
              return e;
            }
            function jt(e, t, n, s) {
              var o = -1,
                i = null == e ? 0 : e.length;
              for (s && i && (n = e[++o]); ++o < i; ) n = t(n, e[o], o, e);
              return n;
            }
            function Ft(e, t, n, s) {
              var o = null == e ? 0 : e.length;
              for (s && o && (n = e[--o]); o--; ) n = t(n, e[o], o, e);
              return n;
            }
            function Bt(e, t) {
              for (var n = -1, s = null == e ? 0 : e.length; ++n < s; )
                if (t(e[n], n, e)) return !0;
              return !1;
            }
            var Ut = Gt("length");
            function Vt(e, t, n) {
              var s;
              return (
                n(e, function (e, n, o) {
                  if (t(e, n, o)) return (s = n), !1;
                }),
                s
              );
            }
            function Ht(e, t, n, s) {
              for (var o = e.length, i = n + (s ? 1 : -1); s ? i-- : ++i < o; )
                if (t(e[i], i, e)) return i;
              return -1;
            }
            function Wt(e, t, n) {
              return t == t
                ? (function (e, t, n) {
                    var s = n - 1,
                      o = e.length;
                    for (; ++s < o; ) if (e[s] === t) return s;
                    return -1;
                  })(e, t, n)
                : Ht(e, Kt, n);
            }
            function qt(e, t, n, s) {
              for (var o = n - 1, i = e.length; ++o < i; )
                if (s(e[o], t)) return o;
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
                return null == t ? o : t[e];
              };
            }
            function Yt(e) {
              return function (t) {
                return null == e ? o : e[t];
              };
            }
            function zt(e, t, n, s, o) {
              return (
                o(e, function (e, o, i) {
                  n = s ? ((s = !1), e) : t(n, e, o, i);
                }),
                n
              );
            }
            function Qt(e, t) {
              for (var n, s = -1, i = e.length; ++s < i; ) {
                var a = t(e[s]);
                a !== o && (n = n === o ? a : n + a);
              }
              return n;
            }
            function Xt(e, t) {
              for (var n = -1, s = Array(e); ++n < e; ) s[n] = t(n);
              return s;
            }
            function Zt(e) {
              return function (t) {
                return e(t);
              };
            }
            function Jt(e, t) {
              return Mt(t, function (t) {
                return e[t];
              });
            }
            function en(e, t) {
              return e.has(t);
            }
            function tn(e, t) {
              for (var n = -1, s = e.length; ++n < s && Wt(t, e[n], 0) > -1; );
              return n;
            }
            function nn(e, t) {
              for (var n = e.length; n-- && Wt(t, e[n], 0) > -1; );
              return n;
            }
            var sn = Yt({
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
              on = Yt({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
              });
            function an(e) {
              return "\\" + ut[e];
            }
            function ln(e) {
              return ot.test(e);
            }
            function rn(e) {
              var t = -1,
                n = Array(e.size);
              return (
                e.forEach(function (e, s) {
                  n[++t] = [s, e];
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
              for (var n = -1, s = e.length, o = 0, i = []; ++n < s; ) {
                var a = e[n];
                (a !== t && a !== l) || ((e[n] = l), (i[o++] = n));
              }
              return i;
            }
            function pn(e, t) {
              return "__proto__" == t ? o : e[t];
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
              return ln(e)
                ? (function (e) {
                    var t = (nt.lastIndex = 0);
                    for (; nt.test(e); ) ++t;
                    return t;
                  })(e)
                : Ut(e);
            }
            function fn(e) {
              return ln(e)
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
                s = (t =
                  null == t ? ft : gn.defaults(ft.Object(), t, gn.pick(ft, at)))
                  .Array,
                Se = t.Date,
                we = t.Error,
                Ce = t.Function,
                Te = t.Math,
                Ie = t.Object,
                Oe = t.RegExp,
                Re = t.String,
                Le = t.TypeError,
                Ae = s.prototype,
                Pe = Ce.prototype,
                Ne = Ie.prototype,
                Me = t["__core-js_shared__"],
                De = Pe.toString,
                je = Ne.hasOwnProperty,
                Fe = 0,
                Be = (n = /[^.]+$/.exec(
                  (Me && Me.keys && Me.keys.IE_PROTO) || "",
                ))
                  ? "Symbol(src)_1." + n
                  : "",
                Ue = Ne.toString,
                Ve = De.call(Ie),
                He = ft._,
                We = Oe(
                  "^" +
                    De.call(je)
                      .replace(oe, "\\$&")
                      .replace(
                        /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                        "$1.*?",
                      ) +
                    "$",
                ),
                qe = vt ? t.Buffer : o,
                Ke = t.Symbol,
                $e = t.Uint8Array,
                Ge = qe ? qe.allocUnsafe : o,
                Ye = cn(Ie.getPrototypeOf, Ie),
                ze = Ie.create,
                Qe = Ne.propertyIsEnumerable,
                Xe = Ae.splice,
                Ze = Ke ? Ke.isConcatSpreadable : o,
                Je = Ke ? Ke.iterator : o,
                nt = Ke ? Ke.toStringTag : o,
                ot = (function () {
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
                bt = qe ? qe.isBuffer : o,
                Ut = t.isFinite,
                Yt = Ae.join,
                vn = cn(Ie.keys, Ie),
                yn = Te.max,
                bn = Te.min,
                En = Se.now,
                xn = t.parseInt,
                kn = Te.random,
                Sn = Ae.reverse,
                wn = di(t, "DataView"),
                Cn = di(t, "Map"),
                Tn = di(t, "Promise"),
                In = di(t, "Set"),
                On = di(t, "WeakMap"),
                Rn = di(Ie, "create"),
                Ln = On && new On(),
                An = {},
                Pn = Fi(wn),
                Nn = Fi(Cn),
                Mn = Fi(Tn),
                Dn = Fi(In),
                jn = Fi(On),
                Fn = Ke ? Ke.prototype : o,
                Bn = Fn ? Fn.valueOf : o,
                Un = Fn ? Fn.toString : o;
              function Vn(e) {
                if (tl(e) && !qa(e) && !(e instanceof Kn)) {
                  if (e instanceof qn) return e;
                  if (je.call(e, "__wrapped__")) return Bi(e);
                }
                return new qn(e);
              }
              var Hn = (function () {
                function e() {}
                return function (t) {
                  if (!el(t)) return {};
                  if (ze) return ze(t);
                  e.prototype = t;
                  var n = new e();
                  return (e.prototype = o), n;
                };
              })();
              function Wn() {}
              function qn(e, t) {
                (this.__wrapped__ = e),
                  (this.__actions__ = []),
                  (this.__chain__ = !!t),
                  (this.__index__ = 0),
                  (this.__values__ = o);
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
                  var s = e[t];
                  this.set(s[0], s[1]);
                }
              }
              function Gn(e) {
                var t = -1,
                  n = null == e ? 0 : e.length;
                for (this.clear(); ++t < n; ) {
                  var s = e[t];
                  this.set(s[0], s[1]);
                }
              }
              function Yn(e) {
                var t = -1,
                  n = null == e ? 0 : e.length;
                for (this.clear(); ++t < n; ) {
                  var s = e[t];
                  this.set(s[0], s[1]);
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
                  s = !n && Wa(e),
                  o = !n && !s && Ya(e),
                  i = !n && !s && !o && cl(e),
                  a = n || s || o || i,
                  l = a ? Xt(e.length, Re) : [],
                  r = l.length;
                for (var c in e)
                  (!t && !je.call(e, c)) ||
                    (a &&
                      ("length" == c ||
                        (o && ("offset" == c || "parent" == c)) ||
                        (i &&
                          ("buffer" == c ||
                            "byteLength" == c ||
                            "byteOffset" == c)) ||
                        bi(c, r))) ||
                    l.push(c);
                return l;
              }
              function Zn(e) {
                var t = e.length;
                return t ? e[zs(0, t - 1)] : o;
              }
              function Jn(e, t) {
                return Mi(Lo(e), rs(t, 0, e.length));
              }
              function es(e) {
                return Mi(Lo(e));
              }
              function ts(e, t, n) {
                ((n !== o && !Ua(e[t], n)) || (n === o && !(t in e))) &&
                  as(e, t, n);
              }
              function ns(e, t, n) {
                var s = e[t];
                (je.call(e, t) && Ua(s, n) && (n !== o || t in e)) ||
                  as(e, t, n);
              }
              function ss(e, t) {
                for (var n = e.length; n--; ) if (Ua(e[n][0], t)) return n;
                return -1;
              }
              function os(e, t, n, s) {
                return (
                  ds(e, function (e, o, i) {
                    t(s, e, n(e), i);
                  }),
                  s
                );
              }
              function is(e, t) {
                return e && Ao(t, Ll(t), e);
              }
              function as(e, t, n) {
                "__proto__" == t && ot
                  ? ot(e, t, {
                      configurable: !0,
                      enumerable: !0,
                      value: n,
                      writable: !0,
                    })
                  : (e[t] = n);
              }
              function ls(e, t) {
                for (
                  var n = -1, i = t.length, a = s(i), l = null == e;
                  ++n < i;

                )
                  a[n] = l ? o : Cl(e, t[n]);
                return a;
              }
              function rs(e, t, n) {
                return (
                  e == e &&
                    (n !== o && (e = e <= n ? e : n),
                    t !== o && (e = e >= t ? e : t)),
                  e
                );
              }
              function cs(e, t, n, s, i, a) {
                var l,
                  r = 1 & t,
                  c = 2 & t,
                  u = 4 & t;
                if ((n && (l = i ? n(e, s, i, a) : n(e)), l !== o)) return l;
                if (!el(e)) return e;
                var p = qa(e);
                if (p) {
                  if (
                    ((l = (function (e) {
                      var t = e.length,
                        n = new e.constructor(t);
                      t &&
                        "string" == typeof e[0] &&
                        je.call(e, "index") &&
                        ((n.index = e.index), (n.input = e.input));
                      return n;
                    })(e)),
                    !r)
                  )
                    return Lo(e, l);
                } else {
                  var m = _i(e),
                    d = m == k || m == S;
                  if (Ya(e)) return wo(e, r);
                  if (m == T || m == v || (d && !i)) {
                    if (((l = c || d ? {} : vi(e)), !r))
                      return c
                        ? (function (e, t) {
                            return Ao(e, fi(e), t);
                          })(
                            e,
                            (function (e, t) {
                              return e && Ao(t, Al(t), e);
                            })(l, e),
                          )
                        : (function (e, t) {
                            return Ao(e, hi(e), t);
                          })(e, is(l, e));
                  } else {
                    if (!ct[m]) return i ? e : {};
                    l = (function (e, t, n) {
                      var s = e.constructor;
                      switch (t) {
                        case N:
                          return Co(e);
                        case b:
                        case E:
                          return new s(+e);
                        case M:
                          return (function (e, t) {
                            var n = t ? Co(e.buffer) : e.buffer;
                            return new e.constructor(
                              n,
                              e.byteOffset,
                              e.byteLength,
                            );
                          })(e, n);
                        case D:
                        case j:
                        case F:
                        case B:
                        case U:
                        case V:
                        case H:
                        case W:
                        case q:
                          return To(e, n);
                        case w:
                          return new s();
                        case C:
                        case L:
                          return new s(e);
                        case O:
                          return (function (e) {
                            var t = new e.constructor(e.source, fe.exec(e));
                            return (t.lastIndex = e.lastIndex), t;
                          })(e);
                        case R:
                          return new s();
                        case A:
                          return (o = e), Bn ? Ie(Bn.call(o)) : {};
                      }
                      var o;
                    })(e, m, r);
                  }
                }
                a || (a = new Qn());
                var h = a.get(e);
                if (h) return h;
                if ((a.set(e, l), al(e)))
                  return (
                    e.forEach(function (s) {
                      l.add(cs(s, t, n, s, e, a));
                    }),
                    l
                  );
                if (nl(e))
                  return (
                    e.forEach(function (s, o) {
                      l.set(o, cs(s, t, n, o, e, a));
                    }),
                    l
                  );
                var f = p ? o : (u ? (c ? ai : ii) : c ? Al : Ll)(e);
                return (
                  Ot(f || e, function (s, o) {
                    f && (s = e[(o = s)]), ns(l, o, cs(s, t, n, o, e, a));
                  }),
                  l
                );
              }
              function us(e, t, n) {
                var s = n.length;
                if (null == e) return !s;
                for (e = Ie(e); s--; ) {
                  var i = n[s],
                    a = t[i],
                    l = e[i];
                  if ((l === o && !(i in e)) || !a(l)) return !1;
                }
                return !0;
              }
              function ps(e, t, n) {
                if ("function" != typeof e) throw new Le(i);
                return Li(function () {
                  e.apply(o, n);
                }, t);
              }
              function ms(e, t, n, s) {
                var o = -1,
                  i = Pt,
                  a = !0,
                  l = e.length,
                  r = [],
                  c = t.length;
                if (!l) return r;
                n && (t = Mt(t, Zt(n))),
                  s
                    ? ((i = Nt), (a = !1))
                    : t.length >= 200 && ((i = en), (a = !1), (t = new zn(t)));
                e: for (; ++o < l; ) {
                  var u = e[o],
                    p = null == n ? u : n(u);
                  if (((u = s || 0 !== u ? u : 0), a && p == p)) {
                    for (var m = c; m--; ) if (t[m] === p) continue e;
                    r.push(u);
                  } else i(t, p, s) || r.push(u);
                }
                return r;
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
                  (this.__data__ = Rn ? Rn(null) : {}), (this.size = 0);
                }),
                ($n.prototype.delete = function (e) {
                  var t = this.has(e) && delete this.__data__[e];
                  return (this.size -= t ? 1 : 0), t;
                }),
                ($n.prototype.get = function (e) {
                  var t = this.__data__;
                  if (Rn) {
                    var n = t[e];
                    return n === a ? o : n;
                  }
                  return je.call(t, e) ? t[e] : o;
                }),
                ($n.prototype.has = function (e) {
                  var t = this.__data__;
                  return Rn ? t[e] !== o : je.call(t, e);
                }),
                ($n.prototype.set = function (e, t) {
                  var n = this.__data__;
                  return (
                    (this.size += this.has(e) ? 0 : 1),
                    (n[e] = Rn && t === o ? a : t),
                    this
                  );
                }),
                (Gn.prototype.clear = function () {
                  (this.__data__ = []), (this.size = 0);
                }),
                (Gn.prototype.delete = function (e) {
                  var t = this.__data__,
                    n = ss(t, e);
                  return (
                    !(n < 0) &&
                    (n == t.length - 1 ? t.pop() : Xe.call(t, n, 1),
                    --this.size,
                    !0)
                  );
                }),
                (Gn.prototype.get = function (e) {
                  var t = this.__data__,
                    n = ss(t, e);
                  return n < 0 ? o : t[n][1];
                }),
                (Gn.prototype.has = function (e) {
                  return ss(this.__data__, e) > -1;
                }),
                (Gn.prototype.set = function (e, t) {
                  var n = this.__data__,
                    s = ss(n, e);
                  return (
                    s < 0 ? (++this.size, n.push([e, t])) : (n[s][1] = t), this
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
                    s = n.size;
                  return n.set(e, t), (this.size += n.size == s ? 0 : 1), this;
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
                    var s = n.__data__;
                    if (!Cn || s.length < 199)
                      return s.push([e, t]), (this.size = ++n.size), this;
                    n = this.__data__ = new Yn(s);
                  }
                  return n.set(e, t), (this.size = n.size), this;
                });
              var ds = Mo(Es),
                hs = Mo(xs, !0);
              function fs(e, t) {
                var n = !0;
                return (
                  ds(e, function (e, s, o) {
                    return (n = !!t(e, s, o));
                  }),
                  n
                );
              }
              function _s(e, t, n) {
                for (var s = -1, i = e.length; ++s < i; ) {
                  var a = e[s],
                    l = t(a);
                  if (null != l && (r === o ? l == l && !rl(l) : n(l, r)))
                    var r = l,
                      c = a;
                }
                return c;
              }
              function gs(e, t) {
                var n = [];
                return (
                  ds(e, function (e, s, o) {
                    t(e, s, o) && n.push(e);
                  }),
                  n
                );
              }
              function vs(e, t, n, s, o) {
                var i = -1,
                  a = e.length;
                for (n || (n = yi), o || (o = []); ++i < a; ) {
                  var l = e[i];
                  t > 0 && n(l)
                    ? t > 1
                      ? vs(l, t - 1, n, s, o)
                      : Dt(o, l)
                    : s || (o[o.length] = l);
                }
                return o;
              }
              var ys = Do(),
                bs = Do(!0);
              function Es(e, t) {
                return e && ys(e, t, Ll);
              }
              function xs(e, t) {
                return e && bs(e, t, Ll);
              }
              function ks(e, t) {
                return At(t, function (t) {
                  return Xa(e[t]);
                });
              }
              function Ss(e, t) {
                for (var n = 0, s = (t = Eo(t, e)).length; null != e && n < s; )
                  e = e[ji(t[n++])];
                return n && n == s ? e : o;
              }
              function ws(e, t, n) {
                var s = t(e);
                return qa(e) ? s : Dt(s, n(e));
              }
              function Cs(e) {
                return null == e
                  ? e === o
                    ? "[object Undefined]"
                    : "[object Null]"
                  : nt && nt in Ie(e)
                    ? (function (e) {
                        var t = je.call(e, nt),
                          n = e[nt];
                        try {
                          e[nt] = o;
                          var s = !0;
                        } catch (e) {}
                        var i = Ue.call(e);
                        s && (t ? (e[nt] = n) : delete e[nt]);
                        return i;
                      })(e)
                    : (function (e) {
                        return Ue.call(e);
                      })(e);
              }
              function Ts(e, t) {
                return e > t;
              }
              function Is(e, t) {
                return null != e && je.call(e, t);
              }
              function Os(e, t) {
                return null != e && t in Ie(e);
              }
              function Rs(e, t, n) {
                for (
                  var i = n ? Nt : Pt,
                    a = e[0].length,
                    l = e.length,
                    r = l,
                    c = s(l),
                    u = 1 / 0,
                    p = [];
                  r--;

                ) {
                  var m = e[r];
                  r && t && (m = Mt(m, Zt(t))),
                    (u = bn(m.length, u)),
                    (c[r] =
                      !n && (t || (a >= 120 && m.length >= 120))
                        ? new zn(r && m)
                        : o);
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
                    for (r = l; --r; ) {
                      var g = c[r];
                      if (!(g ? en(g, _) : i(e[r], _, n))) continue e;
                    }
                    h && h.push(_), p.push(f);
                  }
                }
                return p;
              }
              function Ls(e, t, n) {
                var s = null == (e = Oi(e, (t = Eo(t, e)))) ? e : e[ji(Qi(t))];
                return null == s ? o : Tt(s, e, n);
              }
              function As(e) {
                return tl(e) && Cs(e) == v;
              }
              function Ps(e, t, n, s, i) {
                return (
                  e === t ||
                  (null == e || null == t || (!tl(e) && !tl(t))
                    ? e != e && t != t
                    : (function (e, t, n, s, i, a) {
                        var l = qa(e),
                          r = qa(t),
                          c = l ? y : _i(e),
                          u = r ? y : _i(t),
                          p = (c = c == v ? T : c) == T,
                          m = (u = u == v ? T : u) == T,
                          d = c == u;
                        if (d && Ya(e)) {
                          if (!Ya(t)) return !1;
                          (l = !0), (p = !1);
                        }
                        if (d && !p)
                          return (
                            a || (a = new Qn()),
                            l || cl(e)
                              ? si(e, t, n, s, i, a)
                              : (function (e, t, n, s, o, i, a) {
                                  switch (n) {
                                    case M:
                                      if (
                                        e.byteLength != t.byteLength ||
                                        e.byteOffset != t.byteOffset
                                      )
                                        return !1;
                                      (e = e.buffer), (t = t.buffer);
                                    case N:
                                      return !(
                                        e.byteLength != t.byteLength ||
                                        !i(new $e(e), new $e(t))
                                      );
                                    case b:
                                    case E:
                                    case C:
                                      return Ua(+e, +t);
                                    case x:
                                      return (
                                        e.name == t.name &&
                                        e.message == t.message
                                      );
                                    case O:
                                    case L:
                                      return e == t + "";
                                    case w:
                                      var l = rn;
                                    case R:
                                      var r = 1 & s;
                                      if (
                                        (l || (l = mn), e.size != t.size && !r)
                                      )
                                        return !1;
                                      var c = a.get(e);
                                      if (c) return c == t;
                                      (s |= 2), a.set(e, t);
                                      var u = si(l(e), l(t), s, o, i, a);
                                      return a.delete(e), u;
                                    case A:
                                      if (Bn) return Bn.call(e) == Bn.call(t);
                                  }
                                  return !1;
                                })(e, t, c, n, s, i, a)
                          );
                        if (!(1 & n)) {
                          var h = p && je.call(e, "__wrapped__"),
                            f = m && je.call(t, "__wrapped__");
                          if (h || f) {
                            var _ = h ? e.value() : e,
                              g = f ? t.value() : t;
                            return a || (a = new Qn()), i(_, g, n, s, a);
                          }
                        }
                        if (!d) return !1;
                        return (
                          a || (a = new Qn()),
                          (function (e, t, n, s, i, a) {
                            var l = 1 & n,
                              r = ii(e),
                              c = r.length,
                              u = ii(t),
                              p = u.length;
                            if (c != p && !l) return !1;
                            var m = c;
                            for (; m--; ) {
                              var d = r[m];
                              if (!(l ? d in t : je.call(t, d))) return !1;
                            }
                            var h = a.get(e);
                            if (h && a.get(t)) return h == t;
                            var f = !0;
                            a.set(e, t), a.set(t, e);
                            var _ = l;
                            for (; ++m < c; ) {
                              var g = e[(d = r[m])],
                                v = t[d];
                              if (s)
                                var y = l
                                  ? s(v, g, d, t, e, a)
                                  : s(g, v, d, e, t, a);
                              if (
                                !(y === o ? g === v || i(g, v, n, s, a) : y)
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
                          })(e, t, n, s, i, a)
                        );
                      })(e, t, n, s, Ps, i))
                );
              }
              function Ns(e, t, n, s) {
                var i = n.length,
                  a = i,
                  l = !s;
                if (null == e) return !a;
                for (e = Ie(e); i--; ) {
                  var r = n[i];
                  if (l && r[2] ? r[1] !== e[r[0]] : !(r[0] in e)) return !1;
                }
                for (; ++i < a; ) {
                  var c = (r = n[i])[0],
                    u = e[c],
                    p = r[1];
                  if (l && r[2]) {
                    if (u === o && !(c in e)) return !1;
                  } else {
                    var m = new Qn();
                    if (s) var d = s(u, p, c, e, t, m);
                    if (!(d === o ? Ps(p, u, 3, s, m) : d)) return !1;
                  }
                }
                return !0;
              }
              function Ms(e) {
                return (
                  !(!el(e) || ((t = e), Be && Be in t)) &&
                  (Xa(e) ? We : ve).test(Fi(e))
                );
                var t;
              }
              function Ds(e) {
                return "function" == typeof e
                  ? e
                  : null == e
                    ? sr
                    : "object" == typeof e
                      ? qa(e)
                        ? Hs(e[0], e[1])
                        : Vs(e)
                      : mr(e);
              }
              function js(e) {
                if (!wi(e)) return vn(e);
                var t = [];
                for (var n in Ie(e))
                  je.call(e, n) && "constructor" != n && t.push(n);
                return t;
              }
              function Fs(e) {
                if (!el(e))
                  return (function (e) {
                    var t = [];
                    if (null != e) for (var n in Ie(e)) t.push(n);
                    return t;
                  })(e);
                var t = wi(e),
                  n = [];
                for (var s in e)
                  ("constructor" != s || (!t && je.call(e, s))) && n.push(s);
                return n;
              }
              function Bs(e, t) {
                return e < t;
              }
              function Us(e, t) {
                var n = -1,
                  o = $a(e) ? s(e.length) : [];
                return (
                  ds(e, function (e, s, i) {
                    o[++n] = t(e, s, i);
                  }),
                  o
                );
              }
              function Vs(e) {
                var t = mi(e);
                return 1 == t.length && t[0][2]
                  ? Ti(t[0][0], t[0][1])
                  : function (n) {
                      return n === e || Ns(n, e, t);
                    };
              }
              function Hs(e, t) {
                return xi(e) && Ci(t)
                  ? Ti(ji(e), t)
                  : function (n) {
                      var s = Cl(n, e);
                      return s === o && s === t ? Tl(n, e) : Ps(t, s, 3);
                    };
              }
              function Ws(e, t, n, s, i) {
                e !== t &&
                  ys(
                    t,
                    function (a, l) {
                      if (el(a))
                        i || (i = new Qn()),
                          (function (e, t, n, s, i, a, l) {
                            var r = pn(e, n),
                              c = pn(t, n),
                              u = l.get(c);
                            if (u) return void ts(e, n, u);
                            var p = a ? a(r, c, n + "", e, t, l) : o,
                              m = p === o;
                            if (m) {
                              var d = qa(c),
                                h = !d && Ya(c),
                                f = !d && !h && cl(c);
                              (p = c),
                                d || h || f
                                  ? qa(r)
                                    ? (p = r)
                                    : Ga(r)
                                      ? (p = Lo(r))
                                      : h
                                        ? ((m = !1), (p = wo(c, !0)))
                                        : f
                                          ? ((m = !1), (p = To(c, !0)))
                                          : (p = [])
                                  : ol(c) || Wa(c)
                                    ? ((p = r),
                                      Wa(r)
                                        ? (p = gl(r))
                                        : (!el(r) || (s && Xa(r))) &&
                                          (p = vi(c)))
                                    : (m = !1);
                            }
                            m && (l.set(c, p), i(p, c, s, a, l), l.delete(c));
                            ts(e, n, p);
                          })(e, t, l, n, Ws, s, i);
                      else {
                        var r = s ? s(pn(e, l), a, l + "", e, t, i) : o;
                        r === o && (r = a), ts(e, l, r);
                      }
                    },
                    Al,
                  );
              }
              function qs(e, t) {
                var n = e.length;
                if (n) return bi((t += t < 0 ? n : 0), n) ? e[t] : o;
              }
              function Ks(e, t, n) {
                var s = -1;
                t = Mt(t.length ? t : [sr], Zt(ui()));
                var o = Us(e, function (e, n, o) {
                  var i = Mt(t, function (t) {
                    return t(e);
                  });
                  return { criteria: i, index: ++s, value: e };
                });
                return (function (e, t) {
                  var n = e.length;
                  for (e.sort(t); n--; ) e[n] = e[n].value;
                  return e;
                })(o, function (e, t) {
                  return (function (e, t, n) {
                    var s = -1,
                      o = e.criteria,
                      i = t.criteria,
                      a = o.length,
                      l = n.length;
                    for (; ++s < a; ) {
                      var r = Io(o[s], i[s]);
                      if (r) return s >= l ? r : r * ("desc" == n[s] ? -1 : 1);
                    }
                    return e.index - t.index;
                  })(e, t, n);
                });
              }
              function $s(e, t, n) {
                for (var s = -1, o = t.length, i = {}; ++s < o; ) {
                  var a = t[s],
                    l = Ss(e, a);
                  n(l, a) && eo(i, Eo(a, e), l);
                }
                return i;
              }
              function Gs(e, t, n, s) {
                var o = s ? qt : Wt,
                  i = -1,
                  a = t.length,
                  l = e;
                for (e === t && (t = Lo(t)), n && (l = Mt(e, Zt(n))); ++i < a; )
                  for (
                    var r = 0, c = t[i], u = n ? n(c) : c;
                    (r = o(l, u, r, s)) > -1;

                  )
                    l !== e && Xe.call(l, r, 1), Xe.call(e, r, 1);
                return e;
              }
              function Ys(e, t) {
                for (var n = e ? t.length : 0, s = n - 1; n--; ) {
                  var o = t[n];
                  if (n == s || o !== i) {
                    var i = o;
                    bi(o) ? Xe.call(e, o, 1) : mo(e, o);
                  }
                }
                return e;
              }
              function zs(e, t) {
                return e + gt(kn() * (t - e + 1));
              }
              function Qs(e, t) {
                var n = "";
                if (!e || t < 1 || t > h) return n;
                do {
                  t % 2 && (n += e), (t = gt(t / 2)) && (e += e);
                } while (t);
                return n;
              }
              function Xs(e, t) {
                return Ai(Ii(e, t, sr), e + "");
              }
              function Zs(e) {
                return Zn(Ul(e));
              }
              function Js(e, t) {
                var n = Ul(e);
                return Mi(n, rs(t, 0, n.length));
              }
              function eo(e, t, n, s) {
                if (!el(e)) return e;
                for (
                  var i = -1, a = (t = Eo(t, e)).length, l = a - 1, r = e;
                  null != r && ++i < a;

                ) {
                  var c = ji(t[i]),
                    u = n;
                  if (i != l) {
                    var p = r[c];
                    (u = s ? s(p, c, r) : o) === o &&
                      (u = el(p) ? p : bi(t[i + 1]) ? [] : {});
                  }
                  ns(r, c, u), (r = r[c]);
                }
                return e;
              }
              var to = Ln
                  ? function (e, t) {
                      return Ln.set(e, t), e;
                    }
                  : sr,
                no = ot
                  ? function (e, t) {
                      return ot(e, "toString", {
                        configurable: !0,
                        enumerable: !1,
                        value: er(t),
                        writable: !0,
                      });
                    }
                  : sr;
              function so(e) {
                return Mi(Ul(e));
              }
              function oo(e, t, n) {
                var o = -1,
                  i = e.length;
                t < 0 && (t = -t > i ? 0 : i + t),
                  (n = n > i ? i : n) < 0 && (n += i),
                  (i = t > n ? 0 : (n - t) >>> 0),
                  (t >>>= 0);
                for (var a = s(i); ++o < i; ) a[o] = e[o + t];
                return a;
              }
              function io(e, t) {
                var n;
                return (
                  ds(e, function (e, s, o) {
                    return !(n = t(e, s, o));
                  }),
                  !!n
                );
              }
              function ao(e, t, n) {
                var s = 0,
                  o = null == e ? s : e.length;
                if ("number" == typeof t && t == t && o <= 2147483647) {
                  for (; s < o; ) {
                    var i = (s + o) >>> 1,
                      a = e[i];
                    null !== a && !rl(a) && (n ? a <= t : a < t)
                      ? (s = i + 1)
                      : (o = i);
                  }
                  return o;
                }
                return lo(e, t, sr, n);
              }
              function lo(e, t, n, s) {
                t = n(t);
                for (
                  var i = 0,
                    a = null == e ? 0 : e.length,
                    l = t != t,
                    r = null === t,
                    c = rl(t),
                    u = t === o;
                  i < a;

                ) {
                  var p = gt((i + a) / 2),
                    m = n(e[p]),
                    d = m !== o,
                    h = null === m,
                    f = m == m,
                    _ = rl(m);
                  if (l) var g = s || f;
                  else
                    g = u
                      ? f && (s || d)
                      : r
                        ? f && d && (s || !h)
                        : c
                          ? f && d && !h && (s || !_)
                          : !h && !_ && (s ? m <= t : m < t);
                  g ? (i = p + 1) : (a = p);
                }
                return bn(a, 4294967294);
              }
              function ro(e, t) {
                for (var n = -1, s = e.length, o = 0, i = []; ++n < s; ) {
                  var a = e[n],
                    l = t ? t(a) : a;
                  if (!n || !Ua(l, r)) {
                    var r = l;
                    i[o++] = 0 === a ? 0 : a;
                  }
                }
                return i;
              }
              function co(e) {
                return "number" == typeof e ? e : rl(e) ? f : +e;
              }
              function uo(e) {
                if ("string" == typeof e) return e;
                if (qa(e)) return Mt(e, uo) + "";
                if (rl(e)) return Un ? Un.call(e) : "";
                var t = e + "";
                return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
              }
              function po(e, t, n) {
                var s = -1,
                  o = Pt,
                  i = e.length,
                  a = !0,
                  l = [],
                  r = l;
                if (n) (a = !1), (o = Nt);
                else if (i >= 200) {
                  var c = t ? null : Xo(e);
                  if (c) return mn(c);
                  (a = !1), (o = en), (r = new zn());
                } else r = t ? [] : l;
                e: for (; ++s < i; ) {
                  var u = e[s],
                    p = t ? t(u) : u;
                  if (((u = n || 0 !== u ? u : 0), a && p == p)) {
                    for (var m = r.length; m--; ) if (r[m] === p) continue e;
                    t && r.push(p), l.push(u);
                  } else o(r, p, n) || (r !== l && r.push(p), l.push(u));
                }
                return l;
              }
              function mo(e, t) {
                return (
                  null == (e = Oi(e, (t = Eo(t, e)))) || delete e[ji(Qi(t))]
                );
              }
              function ho(e, t, n, s) {
                return eo(e, t, n(Ss(e, t)), s);
              }
              function fo(e, t, n, s) {
                for (
                  var o = e.length, i = s ? o : -1;
                  (s ? i-- : ++i < o) && t(e[i], i, e);

                );
                return n
                  ? oo(e, s ? 0 : i, s ? i + 1 : o)
                  : oo(e, s ? i + 1 : 0, s ? o : i);
              }
              function _o(e, t) {
                var n = e;
                return (
                  n instanceof Kn && (n = n.value()),
                  jt(
                    t,
                    function (e, t) {
                      return t.func.apply(t.thisArg, Dt([e], t.args));
                    },
                    n,
                  )
                );
              }
              function go(e, t, n) {
                var o = e.length;
                if (o < 2) return o ? po(e[0]) : [];
                for (var i = -1, a = s(o); ++i < o; )
                  for (var l = e[i], r = -1; ++r < o; )
                    r != i && (a[i] = ms(a[i] || l, e[r], t, n));
                return po(vs(a, 1), t, n);
              }
              function vo(e, t, n) {
                for (
                  var s = -1, i = e.length, a = t.length, l = {};
                  ++s < i;

                ) {
                  var r = s < a ? t[s] : o;
                  n(l, e[s], r);
                }
                return l;
              }
              function yo(e) {
                return Ga(e) ? e : [];
              }
              function bo(e) {
                return "function" == typeof e ? e : sr;
              }
              function Eo(e, t) {
                return qa(e) ? e : xi(e, t) ? [e] : Di(vl(e));
              }
              var xo = Xs;
              function ko(e, t, n) {
                var s = e.length;
                return (n = n === o ? s : n), !t && n >= s ? e : oo(e, t, n);
              }
              var So =
                ut ||
                function (e) {
                  return ft.clearTimeout(e);
                };
              function wo(e, t) {
                if (t) return e.slice();
                var n = e.length,
                  s = Ge ? Ge(n) : new e.constructor(n);
                return e.copy(s), s;
              }
              function Co(e) {
                var t = new e.constructor(e.byteLength);
                return new $e(t).set(new $e(e)), t;
              }
              function To(e, t) {
                var n = t ? Co(e.buffer) : e.buffer;
                return new e.constructor(n, e.byteOffset, e.length);
              }
              function Io(e, t) {
                if (e !== t) {
                  var n = e !== o,
                    s = null === e,
                    i = e == e,
                    a = rl(e),
                    l = t !== o,
                    r = null === t,
                    c = t == t,
                    u = rl(t);
                  if (
                    (!r && !u && !a && e > t) ||
                    (a && l && c && !r && !u) ||
                    (s && l && c) ||
                    (!n && c) ||
                    !i
                  )
                    return 1;
                  if (
                    (!s && !a && !u && e < t) ||
                    (u && n && i && !s && !a) ||
                    (r && n && i) ||
                    (!l && i) ||
                    !c
                  )
                    return -1;
                }
                return 0;
              }
              function Oo(e, t, n, o) {
                for (
                  var i = -1,
                    a = e.length,
                    l = n.length,
                    r = -1,
                    c = t.length,
                    u = yn(a - l, 0),
                    p = s(c + u),
                    m = !o;
                  ++r < c;

                )
                  p[r] = t[r];
                for (; ++i < l; ) (m || i < a) && (p[n[i]] = e[i]);
                for (; u--; ) p[r++] = e[i++];
                return p;
              }
              function Ro(e, t, n, o) {
                for (
                  var i = -1,
                    a = e.length,
                    l = -1,
                    r = n.length,
                    c = -1,
                    u = t.length,
                    p = yn(a - r, 0),
                    m = s(p + u),
                    d = !o;
                  ++i < p;

                )
                  m[i] = e[i];
                for (var h = i; ++c < u; ) m[h + c] = t[c];
                for (; ++l < r; ) (d || i < a) && (m[h + n[l]] = e[i++]);
                return m;
              }
              function Lo(e, t) {
                var n = -1,
                  o = e.length;
                for (t || (t = s(o)); ++n < o; ) t[n] = e[n];
                return t;
              }
              function Ao(e, t, n, s) {
                var i = !n;
                n || (n = {});
                for (var a = -1, l = t.length; ++a < l; ) {
                  var r = t[a],
                    c = s ? s(n[r], e[r], r, n, e) : o;
                  c === o && (c = e[r]), i ? as(n, r, c) : ns(n, r, c);
                }
                return n;
              }
              function Po(e, t) {
                return function (n, s) {
                  var o = qa(n) ? It : os,
                    i = t ? t() : {};
                  return o(n, e, ui(s, 2), i);
                };
              }
              function No(e) {
                return Xs(function (t, n) {
                  var s = -1,
                    i = n.length,
                    a = i > 1 ? n[i - 1] : o,
                    l = i > 2 ? n[2] : o;
                  for (
                    a = e.length > 3 && "function" == typeof a ? (i--, a) : o,
                      l && Ei(n[0], n[1], l) && ((a = i < 3 ? o : a), (i = 1)),
                      t = Ie(t);
                    ++s < i;

                  ) {
                    var r = n[s];
                    r && e(t, r, s, a);
                  }
                  return t;
                });
              }
              function Mo(e, t) {
                return function (n, s) {
                  if (null == n) return n;
                  if (!$a(n)) return e(n, s);
                  for (
                    var o = n.length, i = t ? o : -1, a = Ie(n);
                    (t ? i-- : ++i < o) && !1 !== s(a[i], i, a);

                  );
                  return n;
                };
              }
              function Do(e) {
                return function (t, n, s) {
                  for (var o = -1, i = Ie(t), a = s(t), l = a.length; l--; ) {
                    var r = a[e ? l : ++o];
                    if (!1 === n(i[r], r, i)) break;
                  }
                  return t;
                };
              }
              function jo(e) {
                return function (t) {
                  var n = ln((t = vl(t))) ? fn(t) : o,
                    s = n ? n[0] : t.charAt(0),
                    i = n ? ko(n, 1).join("") : t.slice(1);
                  return s[e]() + i;
                };
              }
              function Fo(e) {
                return function (t) {
                  return jt(Xl(Wl(t).replace(et, "")), e, "");
                };
              }
              function Bo(e) {
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
                    s = e.apply(n, t);
                  return el(s) ? s : n;
                };
              }
              function Uo(e) {
                return function (t, n, s) {
                  var i = Ie(t);
                  if (!$a(t)) {
                    var a = ui(n, 3);
                    (t = Ll(t)),
                      (n = function (e) {
                        return a(i[e], e, i);
                      });
                  }
                  var l = e(t, n, s);
                  return l > -1 ? i[a ? t[l] : l] : o;
                };
              }
              function Vo(e) {
                return oi(function (t) {
                  var n = t.length,
                    s = n,
                    a = qn.prototype.thru;
                  for (e && t.reverse(); s--; ) {
                    var l = t[s];
                    if ("function" != typeof l) throw new Le(i);
                    if (a && !r && "wrapper" == ri(l)) var r = new qn([], !0);
                  }
                  for (s = r ? s : n; ++s < n; ) {
                    var c = ri((l = t[s])),
                      u = "wrapper" == c ? li(l) : o;
                    r =
                      u && ki(u[0]) && 424 == u[1] && !u[4].length && 1 == u[9]
                        ? r[ri(u[0])].apply(r, u[3])
                        : 1 == l.length && ki(l)
                          ? r[c]()
                          : r.thru(l);
                  }
                  return function () {
                    var e = arguments,
                      s = e[0];
                    if (r && 1 == e.length && qa(s)) return r.plant(s).value();
                    for (var o = 0, i = n ? t[o].apply(this, e) : s; ++o < n; )
                      i = t[o].call(this, i);
                    return i;
                  };
                });
              }
              function Ho(e, t, n, i, a, l, r, c, u, m) {
                var d = t & p,
                  h = 1 & t,
                  f = 2 & t,
                  _ = 24 & t,
                  g = 512 & t,
                  v = f ? o : Bo(e);
                return function p() {
                  for (var y = arguments.length, b = s(y), E = y; E--; )
                    b[E] = arguments[E];
                  if (_)
                    var x = ci(p),
                      k = (function (e, t) {
                        for (var n = e.length, s = 0; n--; ) e[n] === t && ++s;
                        return s;
                      })(b, x);
                  if (
                    (i && (b = Oo(b, i, a, _)),
                    l && (b = Ro(b, l, r, _)),
                    (y -= k),
                    _ && y < m)
                  ) {
                    var S = un(b, x);
                    return zo(e, t, Ho, p.placeholder, n, b, S, c, u, m - y);
                  }
                  var w = h ? n : this,
                    C = f ? w[e] : e;
                  return (
                    (y = b.length),
                    c
                      ? (b = (function (e, t) {
                          var n = e.length,
                            s = bn(t.length, n),
                            i = Lo(e);
                          for (; s--; ) {
                            var a = t[s];
                            e[s] = bi(a, n) ? i[a] : o;
                          }
                          return e;
                        })(b, c))
                      : g && y > 1 && b.reverse(),
                    d && u < y && (b.length = u),
                    this &&
                      this !== ft &&
                      this instanceof p &&
                      (C = v || Bo(C)),
                    C.apply(w, b)
                  );
                };
              }
              function Wo(e, t) {
                return function (n, s) {
                  return (function (e, t, n, s) {
                    return (
                      Es(e, function (e, o, i) {
                        t(s, n(e), o, i);
                      }),
                      s
                    );
                  })(n, e, t(s), {});
                };
              }
              function qo(e, t) {
                return function (n, s) {
                  var i;
                  if (n === o && s === o) return t;
                  if ((n !== o && (i = n), s !== o)) {
                    if (i === o) return s;
                    "string" == typeof n || "string" == typeof s
                      ? ((n = uo(n)), (s = uo(s)))
                      : ((n = co(n)), (s = co(s))),
                      (i = e(n, s));
                  }
                  return i;
                };
              }
              function Ko(e) {
                return oi(function (t) {
                  return (
                    (t = Mt(t, Zt(ui()))),
                    Xs(function (n) {
                      var s = this;
                      return e(t, function (e) {
                        return Tt(e, s, n);
                      });
                    })
                  );
                });
              }
              function $o(e, t) {
                var n = (t = t === o ? " " : uo(t)).length;
                if (n < 2) return n ? Qs(t, e) : t;
                var s = Qs(t, _t(e / hn(t)));
                return ln(t) ? ko(fn(s), 0, e).join("") : s.slice(0, e);
              }
              function Go(e) {
                return function (t, n, i) {
                  return (
                    i && "number" != typeof i && Ei(t, n, i) && (n = i = o),
                    (t = dl(t)),
                    n === o ? ((n = t), (t = 0)) : (n = dl(n)),
                    (function (e, t, n, o) {
                      for (
                        var i = -1, a = yn(_t((t - e) / (n || 1)), 0), l = s(a);
                        a--;

                      )
                        (l[o ? a : ++i] = e), (e += n);
                      return l;
                    })(t, n, (i = i === o ? (t < n ? 1 : -1) : dl(i)), e)
                  );
                };
              }
              function Yo(e) {
                return function (t, n) {
                  return (
                    ("string" == typeof t && "string" == typeof n) ||
                      ((t = _l(t)), (n = _l(n))),
                    e(t, n)
                  );
                };
              }
              function zo(e, t, n, s, i, a, l, r, p, m) {
                var d = 8 & t;
                (t |= d ? c : u), 4 & (t &= ~(d ? u : c)) || (t &= -4);
                var h = [
                    e,
                    t,
                    i,
                    d ? a : o,
                    d ? l : o,
                    d ? o : a,
                    d ? o : l,
                    r,
                    p,
                    m,
                  ],
                  f = n.apply(o, h);
                return ki(e) && Ri(f, h), (f.placeholder = s), Pi(f, e, t);
              }
              function Qo(e) {
                var t = Te[e];
                return function (e, n) {
                  if (((e = _l(e)), (n = null == n ? 0 : bn(hl(n), 292)))) {
                    var s = (vl(e) + "e").split("e");
                    return +(
                      (s = (vl(t(s[0] + "e" + (+s[1] + n))) + "e").split(
                        "e",
                      ))[0] +
                      "e" +
                      (+s[1] - n)
                    );
                  }
                  return t(e);
                };
              }
              var Xo =
                In && 1 / mn(new In([, -0]))[1] == d
                  ? function (e) {
                      return new In(e);
                    }
                  : rr;
              function Zo(e) {
                return function (t) {
                  var n = _i(t);
                  return n == w
                    ? rn(t)
                    : n == R
                      ? dn(t)
                      : (function (e, t) {
                          return Mt(t, function (t) {
                            return [t, e[t]];
                          });
                        })(t, e(t));
                };
              }
              function Jo(e, t, n, a, d, h, f, _) {
                var g = 2 & t;
                if (!g && "function" != typeof e) throw new Le(i);
                var v = a ? a.length : 0;
                if (
                  (v || ((t &= -97), (a = d = o)),
                  (f = f === o ? f : yn(hl(f), 0)),
                  (_ = _ === o ? _ : hl(_)),
                  (v -= d ? d.length : 0),
                  t & u)
                ) {
                  var y = a,
                    b = d;
                  a = d = o;
                }
                var E = g ? o : li(e),
                  x = [e, t, n, a, d, y, b, h, f, _];
                if (
                  (E &&
                    (function (e, t) {
                      var n = e[1],
                        s = t[1],
                        o = n | s,
                        i = o < 131,
                        a =
                          (s == p && 8 == n) ||
                          (s == p && n == m && e[7].length <= t[8]) ||
                          (384 == s && t[7].length <= t[8] && 8 == n);
                      if (!i && !a) return e;
                      1 & s && ((e[2] = t[2]), (o |= 1 & n ? 0 : 4));
                      var r = t[3];
                      if (r) {
                        var c = e[3];
                        (e[3] = c ? Oo(c, r, t[4]) : r),
                          (e[4] = c ? un(e[3], l) : t[4]);
                      }
                      (r = t[5]) &&
                        ((c = e[5]),
                        (e[5] = c ? Ro(c, r, t[6]) : r),
                        (e[6] = c ? un(e[5], l) : t[6]));
                      (r = t[7]) && (e[7] = r);
                      s & p && (e[8] = null == e[8] ? t[8] : bn(e[8], t[8]));
                      null == e[9] && (e[9] = t[9]);
                      (e[0] = t[0]), (e[1] = o);
                    })(x, E),
                  (e = x[0]),
                  (t = x[1]),
                  (n = x[2]),
                  (a = x[3]),
                  (d = x[4]),
                  !(_ = x[9] =
                    x[9] === o ? (g ? 0 : e.length) : yn(x[9] - v, 0)) &&
                    24 & t &&
                    (t &= -25),
                  t && 1 != t)
                )
                  k =
                    8 == t || t == r
                      ? (function (e, t, n) {
                          var i = Bo(e);
                          return function a() {
                            for (
                              var l = arguments.length,
                                r = s(l),
                                c = l,
                                u = ci(a);
                              c--;

                            )
                              r[c] = arguments[c];
                            var p =
                              l < 3 && r[0] !== u && r[l - 1] !== u
                                ? []
                                : un(r, u);
                            return (l -= p.length) < n
                              ? zo(
                                  e,
                                  t,
                                  Ho,
                                  a.placeholder,
                                  o,
                                  r,
                                  p,
                                  o,
                                  o,
                                  n - l,
                                )
                              : Tt(
                                  this && this !== ft && this instanceof a
                                    ? i
                                    : e,
                                  this,
                                  r,
                                );
                          };
                        })(e, t, _)
                      : (t != c && 33 != t) || d.length
                        ? Ho.apply(o, x)
                        : (function (e, t, n, o) {
                            var i = 1 & t,
                              a = Bo(e);
                            return function t() {
                              for (
                                var l = -1,
                                  r = arguments.length,
                                  c = -1,
                                  u = o.length,
                                  p = s(u + r),
                                  m =
                                    this && this !== ft && this instanceof t
                                      ? a
                                      : e;
                                ++c < u;

                              )
                                p[c] = o[c];
                              for (; r--; ) p[c++] = arguments[++l];
                              return Tt(m, i ? n : this, p);
                            };
                          })(e, t, n, a);
                else
                  var k = (function (e, t, n) {
                    var s = 1 & t,
                      o = Bo(e);
                    return function t() {
                      return (
                        this && this !== ft && this instanceof t ? o : e
                      ).apply(s ? n : this, arguments);
                    };
                  })(e, t, n);
                return Pi((E ? to : Ri)(k, x), e, t);
              }
              function ei(e, t, n, s) {
                return e === o || (Ua(e, Ne[n]) && !je.call(s, n)) ? t : e;
              }
              function ti(e, t, n, s, i, a) {
                return (
                  el(e) &&
                    el(t) &&
                    (a.set(t, e), Ws(e, t, o, ti, a), a.delete(t)),
                  e
                );
              }
              function ni(e) {
                return ol(e) ? o : e;
              }
              function si(e, t, n, s, i, a) {
                var l = 1 & n,
                  r = e.length,
                  c = t.length;
                if (r != c && !(l && c > r)) return !1;
                var u = a.get(e);
                if (u && a.get(t)) return u == t;
                var p = -1,
                  m = !0,
                  d = 2 & n ? new zn() : o;
                for (a.set(e, t), a.set(t, e); ++p < r; ) {
                  var h = e[p],
                    f = t[p];
                  if (s) var _ = l ? s(f, h, p, t, e, a) : s(h, f, p, e, t, a);
                  if (_ !== o) {
                    if (_) continue;
                    m = !1;
                    break;
                  }
                  if (d) {
                    if (
                      !Bt(t, function (e, t) {
                        if (!en(d, t) && (h === e || i(h, e, n, s, a)))
                          return d.push(t);
                      })
                    ) {
                      m = !1;
                      break;
                    }
                  } else if (h !== f && !i(h, f, n, s, a)) {
                    m = !1;
                    break;
                  }
                }
                return a.delete(e), a.delete(t), m;
              }
              function oi(e) {
                return Ai(Ii(e, o, Ki), e + "");
              }
              function ii(e) {
                return ws(e, Ll, hi);
              }
              function ai(e) {
                return ws(e, Al, fi);
              }
              var li = Ln
                ? function (e) {
                    return Ln.get(e);
                  }
                : rr;
              function ri(e) {
                for (
                  var t = e.name + "",
                    n = An[t],
                    s = je.call(An, t) ? n.length : 0;
                  s--;

                ) {
                  var o = n[s],
                    i = o.func;
                  if (null == i || i == e) return o.name;
                }
                return t;
              }
              function ci(e) {
                return (je.call(Vn, "placeholder") ? Vn : e).placeholder;
              }
              function ui() {
                var e = Vn.iteratee || or;
                return (
                  (e = e === or ? Ds : e),
                  arguments.length ? e(arguments[0], arguments[1]) : e
                );
              }
              function pi(e, t) {
                var n,
                  s,
                  o = e.__data__;
                return (
                  "string" == (s = typeof (n = t)) ||
                  "number" == s ||
                  "symbol" == s ||
                  "boolean" == s
                    ? "__proto__" !== n
                    : null === n
                )
                  ? o["string" == typeof t ? "string" : "hash"]
                  : o.map;
              }
              function mi(e) {
                for (var t = Ll(e), n = t.length; n--; ) {
                  var s = t[n],
                    o = e[s];
                  t[n] = [s, o, Ci(o)];
                }
                return t;
              }
              function di(e, t) {
                var n = (function (e, t) {
                  return null == e ? o : e[t];
                })(e, t);
                return Ms(n) ? n : o;
              }
              var hi = yt
                  ? function (e) {
                      return null == e
                        ? []
                        : ((e = Ie(e)),
                          At(yt(e), function (t) {
                            return Qe.call(e, t);
                          }));
                    }
                  : fr,
                fi = yt
                  ? function (e) {
                      for (var t = []; e; ) Dt(t, hi(e)), (e = Ye(e));
                      return t;
                    }
                  : fr,
                _i = Cs;
              function gi(e, t, n) {
                for (var s = -1, o = (t = Eo(t, e)).length, i = !1; ++s < o; ) {
                  var a = ji(t[s]);
                  if (!(i = null != e && n(e, a))) break;
                  e = e[a];
                }
                return i || ++s != o
                  ? i
                  : !!(o = null == e ? 0 : e.length) &&
                      Ja(o) &&
                      bi(a, o) &&
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
                if (!el(n)) return !1;
                var s = typeof t;
                return (
                  !!("number" == s
                    ? $a(n) && bi(t, n.length)
                    : "string" == s && t in n) && Ua(n[t], e)
                );
              }
              function xi(e, t) {
                if (qa(e)) return !1;
                var n = typeof e;
                return (
                  !(
                    "number" != n &&
                    "symbol" != n &&
                    "boolean" != n &&
                    null != e &&
                    !rl(e)
                  ) ||
                  ne.test(e) ||
                  !te.test(e) ||
                  (null != t && e in Ie(t))
                );
              }
              function ki(e) {
                var t = ri(e),
                  n = Vn[t];
                if ("function" != typeof n || !(t in Kn.prototype)) return !1;
                if (e === n) return !0;
                var s = li(n);
                return !!s && e === s[0];
              }
              ((wn && _i(new wn(new ArrayBuffer(1))) != M) ||
                (Cn && _i(new Cn()) != w) ||
                (Tn && _i(Tn.resolve()) != I) ||
                (In && _i(new In()) != R) ||
                (On && _i(new On()) != P)) &&
                (_i = function (e) {
                  var t = Cs(e),
                    n = t == T ? e.constructor : o,
                    s = n ? Fi(n) : "";
                  if (s)
                    switch (s) {
                      case Pn:
                        return M;
                      case Nn:
                        return w;
                      case Mn:
                        return I;
                      case Dn:
                        return R;
                      case jn:
                        return P;
                    }
                  return t;
                });
              var Si = Me ? Xa : _r;
              function wi(e) {
                var t = e && e.constructor;
                return e === (("function" == typeof t && t.prototype) || Ne);
              }
              function Ci(e) {
                return e == e && !el(e);
              }
              function Ti(e, t) {
                return function (n) {
                  return null != n && n[e] === t && (t !== o || e in Ie(n));
                };
              }
              function Ii(e, t, n) {
                return (
                  (t = yn(t === o ? e.length - 1 : t, 0)),
                  function () {
                    for (
                      var o = arguments,
                        i = -1,
                        a = yn(o.length - t, 0),
                        l = s(a);
                      ++i < a;

                    )
                      l[i] = o[t + i];
                    i = -1;
                    for (var r = s(t + 1); ++i < t; ) r[i] = o[i];
                    return (r[t] = n(l)), Tt(e, this, r);
                  }
                );
              }
              function Oi(e, t) {
                return t.length < 2 ? e : Ss(e, oo(t, 0, -1));
              }
              var Ri = Ni(to),
                Li =
                  ht ||
                  function (e, t) {
                    return ft.setTimeout(e, t);
                  },
                Ai = Ni(no);
              function Pi(e, t, n) {
                var s = t + "";
                return Ai(
                  e,
                  (function (e, t) {
                    var n = t.length;
                    if (!n) return e;
                    var s = n - 1;
                    return (
                      (t[s] = (n > 1 ? "& " : "") + t[s]),
                      (t = t.join(n > 2 ? ", " : " ")),
                      e.replace(ce, "{\n/* [wrapped with " + t + "] */\n")
                    );
                  })(
                    s,
                    (function (e, t) {
                      return (
                        Ot(g, function (n) {
                          var s = "_." + n[0];
                          t & n[1] && !Pt(e, s) && e.push(s);
                        }),
                        e.sort()
                      );
                    })(
                      (function (e) {
                        var t = e.match(ue);
                        return t ? t[1].split(pe) : [];
                      })(s),
                      n,
                    ),
                  ),
                );
              }
              function Ni(e) {
                var t = 0,
                  n = 0;
                return function () {
                  var s = En(),
                    i = 16 - (s - n);
                  if (((n = s), i > 0)) {
                    if (++t >= 800) return arguments[0];
                  } else t = 0;
                  return e.apply(o, arguments);
                };
              }
              function Mi(e, t) {
                var n = -1,
                  s = e.length,
                  i = s - 1;
                for (t = t === o ? s : t; ++n < t; ) {
                  var a = zs(n, i),
                    l = e[a];
                  (e[a] = e[n]), (e[n] = l);
                }
                return (e.length = t), e;
              }
              var Di = (function (e) {
                var t = Na(e, function (e) {
                    return 500 === n.size && n.clear(), e;
                  }),
                  n = t.cache;
                return t;
              })(function (e) {
                var t = [];
                return (
                  46 === e.charCodeAt(0) && t.push(""),
                  e.replace(se, function (e, n, s, o) {
                    t.push(s ? o.replace(de, "$1") : n || e);
                  }),
                  t
                );
              });
              function ji(e) {
                if ("string" == typeof e || rl(e)) return e;
                var t = e + "";
                return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
              }
              function Fi(e) {
                if (null != e) {
                  try {
                    return De.call(e);
                  } catch (e) {}
                  try {
                    return e + "";
                  } catch (e) {}
                }
                return "";
              }
              function Bi(e) {
                if (e instanceof Kn) return e.clone();
                var t = new qn(e.__wrapped__, e.__chain__);
                return (
                  (t.__actions__ = Lo(e.__actions__)),
                  (t.__index__ = e.__index__),
                  (t.__values__ = e.__values__),
                  t
                );
              }
              var Ui = Xs(function (e, t) {
                  return Ga(e) ? ms(e, vs(t, 1, Ga, !0)) : [];
                }),
                Vi = Xs(function (e, t) {
                  var n = Qi(t);
                  return (
                    Ga(n) && (n = o),
                    Ga(e) ? ms(e, vs(t, 1, Ga, !0), ui(n, 2)) : []
                  );
                }),
                Hi = Xs(function (e, t) {
                  var n = Qi(t);
                  return (
                    Ga(n) && (n = o), Ga(e) ? ms(e, vs(t, 1, Ga, !0), o, n) : []
                  );
                });
              function Wi(e, t, n) {
                var s = null == e ? 0 : e.length;
                if (!s) return -1;
                var o = null == n ? 0 : hl(n);
                return o < 0 && (o = yn(s + o, 0)), Ht(e, ui(t, 3), o);
              }
              function qi(e, t, n) {
                var s = null == e ? 0 : e.length;
                if (!s) return -1;
                var i = s - 1;
                return (
                  n !== o &&
                    ((i = hl(n)), (i = n < 0 ? yn(s + i, 0) : bn(i, s - 1))),
                  Ht(e, ui(t, 3), i, !0)
                );
              }
              function Ki(e) {
                return (null == e ? 0 : e.length) ? vs(e, 1) : [];
              }
              function $i(e) {
                return e && e.length ? e[0] : o;
              }
              var Gi = Xs(function (e) {
                  var t = Mt(e, yo);
                  return t.length && t[0] === e[0] ? Rs(t) : [];
                }),
                Yi = Xs(function (e) {
                  var t = Qi(e),
                    n = Mt(e, yo);
                  return (
                    t === Qi(n) ? (t = o) : n.pop(),
                    n.length && n[0] === e[0] ? Rs(n, ui(t, 2)) : []
                  );
                }),
                zi = Xs(function (e) {
                  var t = Qi(e),
                    n = Mt(e, yo);
                  return (
                    (t = "function" == typeof t ? t : o) && n.pop(),
                    n.length && n[0] === e[0] ? Rs(n, o, t) : []
                  );
                });
              function Qi(e) {
                var t = null == e ? 0 : e.length;
                return t ? e[t - 1] : o;
              }
              var Xi = Xs(Zi);
              function Zi(e, t) {
                return e && e.length && t && t.length ? Gs(e, t) : e;
              }
              var Ji = oi(function (e, t) {
                var n = null == e ? 0 : e.length,
                  s = ls(e, t);
                return (
                  Ys(
                    e,
                    Mt(t, function (e) {
                      return bi(e, n) ? +e : e;
                    }).sort(Io),
                  ),
                  s
                );
              });
              function ea(e) {
                return null == e ? e : Sn.call(e);
              }
              var ta = Xs(function (e) {
                  return po(vs(e, 1, Ga, !0));
                }),
                na = Xs(function (e) {
                  var t = Qi(e);
                  return Ga(t) && (t = o), po(vs(e, 1, Ga, !0), ui(t, 2));
                }),
                sa = Xs(function (e) {
                  var t = Qi(e);
                  return (
                    (t = "function" == typeof t ? t : o),
                    po(vs(e, 1, Ga, !0), o, t)
                  );
                });
              function oa(e) {
                if (!e || !e.length) return [];
                var t = 0;
                return (
                  (e = At(e, function (e) {
                    if (Ga(e)) return (t = yn(e.length, t)), !0;
                  })),
                  Xt(t, function (t) {
                    return Mt(e, Gt(t));
                  })
                );
              }
              function ia(e, t) {
                if (!e || !e.length) return [];
                var n = oa(e);
                return null == t
                  ? n
                  : Mt(n, function (e) {
                      return Tt(t, o, e);
                    });
              }
              var aa = Xs(function (e, t) {
                  return Ga(e) ? ms(e, t) : [];
                }),
                la = Xs(function (e) {
                  return go(At(e, Ga));
                }),
                ra = Xs(function (e) {
                  var t = Qi(e);
                  return Ga(t) && (t = o), go(At(e, Ga), ui(t, 2));
                }),
                ca = Xs(function (e) {
                  var t = Qi(e);
                  return (
                    (t = "function" == typeof t ? t : o), go(At(e, Ga), o, t)
                  );
                }),
                ua = Xs(oa);
              var pa = Xs(function (e) {
                var t = e.length,
                  n = t > 1 ? e[t - 1] : o;
                return (
                  (n = "function" == typeof n ? (e.pop(), n) : o), ia(e, n)
                );
              });
              function ma(e) {
                var t = Vn(e);
                return (t.__chain__ = !0), t;
              }
              function da(e, t) {
                return t(e);
              }
              var ha = oi(function (e) {
                var t = e.length,
                  n = t ? e[0] : 0,
                  s = this.__wrapped__,
                  i = function (t) {
                    return ls(t, e);
                  };
                return !(t > 1 || this.__actions__.length) &&
                  s instanceof Kn &&
                  bi(n)
                  ? ((s = s.slice(n, +n + (t ? 1 : 0))).__actions__.push({
                      func: da,
                      args: [i],
                      thisArg: o,
                    }),
                    new qn(s, this.__chain__).thru(function (e) {
                      return t && !e.length && e.push(o), e;
                    }))
                  : this.thru(i);
              });
              var fa = Po(function (e, t, n) {
                je.call(e, n) ? ++e[n] : as(e, n, 1);
              });
              var _a = Uo(Wi),
                ga = Uo(qi);
              function va(e, t) {
                return (qa(e) ? Ot : ds)(e, ui(t, 3));
              }
              function ya(e, t) {
                return (qa(e) ? Rt : hs)(e, ui(t, 3));
              }
              var ba = Po(function (e, t, n) {
                je.call(e, n) ? e[n].push(t) : as(e, n, [t]);
              });
              var Ea = Xs(function (e, t, n) {
                  var o = -1,
                    i = "function" == typeof t,
                    a = $a(e) ? s(e.length) : [];
                  return (
                    ds(e, function (e) {
                      a[++o] = i ? Tt(t, e, n) : Ls(e, t, n);
                    }),
                    a
                  );
                }),
                xa = Po(function (e, t, n) {
                  as(e, n, t);
                });
              function ka(e, t) {
                return (qa(e) ? Mt : Us)(e, ui(t, 3));
              }
              var Sa = Po(
                function (e, t, n) {
                  e[n ? 0 : 1].push(t);
                },
                function () {
                  return [[], []];
                },
              );
              var wa = Xs(function (e, t) {
                  if (null == e) return [];
                  var n = t.length;
                  return (
                    n > 1 && Ei(e, t[0], t[1])
                      ? (t = [])
                      : n > 2 && Ei(t[0], t[1], t[2]) && (t = [t[0]]),
                    Ks(e, vs(t, 1), [])
                  );
                }),
                Ca =
                  dt ||
                  function () {
                    return ft.Date.now();
                  };
              function Ta(e, t, n) {
                return (
                  (t = n ? o : t),
                  (t = e && null == t ? e.length : t),
                  Jo(e, p, o, o, o, o, t)
                );
              }
              function Ia(e, t) {
                var n;
                if ("function" != typeof t) throw new Le(i);
                return (
                  (e = hl(e)),
                  function () {
                    return (
                      --e > 0 && (n = t.apply(this, arguments)),
                      e <= 1 && (t = o),
                      n
                    );
                  }
                );
              }
              var Oa = Xs(function (e, t, n) {
                  var s = 1;
                  if (n.length) {
                    var o = un(n, ci(Oa));
                    s |= c;
                  }
                  return Jo(e, s, t, n, o);
                }),
                Ra = Xs(function (e, t, n) {
                  var s = 3;
                  if (n.length) {
                    var o = un(n, ci(Ra));
                    s |= c;
                  }
                  return Jo(t, s, e, n, o);
                });
              function La(e, t, n) {
                var s,
                  a,
                  l,
                  r,
                  c,
                  u,
                  p = 0,
                  m = !1,
                  d = !1,
                  h = !0;
                if ("function" != typeof e) throw new Le(i);
                function f(t) {
                  var n = s,
                    i = a;
                  return (s = a = o), (p = t), (r = e.apply(i, n));
                }
                function _(e) {
                  var n = e - u;
                  return u === o || n >= t || n < 0 || (d && e - p >= l);
                }
                function g() {
                  var e = Ca();
                  if (_(e)) return v(e);
                  c = Li(
                    g,
                    (function (e) {
                      var n = t - (e - u);
                      return d ? bn(n, l - (e - p)) : n;
                    })(e),
                  );
                }
                function v(e) {
                  return (c = o), h && s ? f(e) : ((s = a = o), r);
                }
                function y() {
                  var e = Ca(),
                    n = _(e);
                  if (((s = arguments), (a = this), (u = e), n)) {
                    if (c === o)
                      return (function (e) {
                        return (p = e), (c = Li(g, t)), m ? f(e) : r;
                      })(u);
                    if (d) return (c = Li(g, t)), f(u);
                  }
                  return c === o && (c = Li(g, t)), r;
                }
                return (
                  (t = _l(t) || 0),
                  el(n) &&
                    ((m = !!n.leading),
                    (l = (d = "maxWait" in n) ? yn(_l(n.maxWait) || 0, t) : l),
                    (h = "trailing" in n ? !!n.trailing : h)),
                  (y.cancel = function () {
                    c !== o && So(c), (p = 0), (s = u = a = c = o);
                  }),
                  (y.flush = function () {
                    return c === o ? r : v(Ca());
                  }),
                  y
                );
              }
              var Aa = Xs(function (e, t) {
                  return ps(e, 1, t);
                }),
                Pa = Xs(function (e, t, n) {
                  return ps(e, _l(t) || 0, n);
                });
              function Na(e, t) {
                if (
                  "function" != typeof e ||
                  (null != t && "function" != typeof t)
                )
                  throw new Le(i);
                var n = function () {
                  var s = arguments,
                    o = t ? t.apply(this, s) : s[0],
                    i = n.cache;
                  if (i.has(o)) return i.get(o);
                  var a = e.apply(this, s);
                  return (n.cache = i.set(o, a) || i), a;
                };
                return (n.cache = new (Na.Cache || Yn)()), n;
              }
              function Ma(e) {
                if ("function" != typeof e) throw new Le(i);
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
              Na.Cache = Yn;
              var Da = xo(function (e, t) {
                  var n = (t =
                    1 == t.length && qa(t[0])
                      ? Mt(t[0], Zt(ui()))
                      : Mt(vs(t, 1), Zt(ui()))).length;
                  return Xs(function (s) {
                    for (var o = -1, i = bn(s.length, n); ++o < i; )
                      s[o] = t[o].call(this, s[o]);
                    return Tt(e, this, s);
                  });
                }),
                ja = Xs(function (e, t) {
                  var n = un(t, ci(ja));
                  return Jo(e, c, o, t, n);
                }),
                Fa = Xs(function (e, t) {
                  var n = un(t, ci(Fa));
                  return Jo(e, u, o, t, n);
                }),
                Ba = oi(function (e, t) {
                  return Jo(e, m, o, o, o, t);
                });
              function Ua(e, t) {
                return e === t || (e != e && t != t);
              }
              var Va = Yo(Ts),
                Ha = Yo(function (e, t) {
                  return e >= t;
                }),
                Wa = As(
                  (function () {
                    return arguments;
                  })(),
                )
                  ? As
                  : function (e) {
                      return (
                        tl(e) && je.call(e, "callee") && !Qe.call(e, "callee")
                      );
                    },
                qa = s.isArray,
                Ka = Et
                  ? Zt(Et)
                  : function (e) {
                      return tl(e) && Cs(e) == N;
                    };
              function $a(e) {
                return null != e && Ja(e.length) && !Xa(e);
              }
              function Ga(e) {
                return tl(e) && $a(e);
              }
              var Ya = bt || _r,
                za = xt
                  ? Zt(xt)
                  : function (e) {
                      return tl(e) && Cs(e) == E;
                    };
              function Qa(e) {
                if (!tl(e)) return !1;
                var t = Cs(e);
                return (
                  t == x ||
                  "[object DOMException]" == t ||
                  ("string" == typeof e.message &&
                    "string" == typeof e.name &&
                    !ol(e))
                );
              }
              function Xa(e) {
                if (!el(e)) return !1;
                var t = Cs(e);
                return (
                  t == k ||
                  t == S ||
                  "[object AsyncFunction]" == t ||
                  "[object Proxy]" == t
                );
              }
              function Za(e) {
                return "number" == typeof e && e == hl(e);
              }
              function Ja(e) {
                return "number" == typeof e && e > -1 && e % 1 == 0 && e <= h;
              }
              function el(e) {
                var t = typeof e;
                return null != e && ("object" == t || "function" == t);
              }
              function tl(e) {
                return null != e && "object" == typeof e;
              }
              var nl = kt
                ? Zt(kt)
                : function (e) {
                    return tl(e) && _i(e) == w;
                  };
              function sl(e) {
                return "number" == typeof e || (tl(e) && Cs(e) == C);
              }
              function ol(e) {
                if (!tl(e) || Cs(e) != T) return !1;
                var t = Ye(e);
                if (null === t) return !0;
                var n = je.call(t, "constructor") && t.constructor;
                return (
                  "function" == typeof n && n instanceof n && De.call(n) == Ve
                );
              }
              var il = St
                ? Zt(St)
                : function (e) {
                    return tl(e) && Cs(e) == O;
                  };
              var al = wt
                ? Zt(wt)
                : function (e) {
                    return tl(e) && _i(e) == R;
                  };
              function ll(e) {
                return "string" == typeof e || (!qa(e) && tl(e) && Cs(e) == L);
              }
              function rl(e) {
                return "symbol" == typeof e || (tl(e) && Cs(e) == A);
              }
              var cl = Ct
                ? Zt(Ct)
                : function (e) {
                    return tl(e) && Ja(e.length) && !!rt[Cs(e)];
                  };
              var ul = Yo(Bs),
                pl = Yo(function (e, t) {
                  return e <= t;
                });
              function ml(e) {
                if (!e) return [];
                if ($a(e)) return ll(e) ? fn(e) : Lo(e);
                if (Je && e[Je])
                  return (function (e) {
                    for (var t, n = []; !(t = e.next()).done; ) n.push(t.value);
                    return n;
                  })(e[Je]());
                var t = _i(e);
                return (t == w ? rn : t == R ? mn : Ul)(e);
              }
              function dl(e) {
                return e
                  ? (e = _l(e)) === d || e === -1 / 0
                    ? 17976931348623157e292 * (e < 0 ? -1 : 1)
                    : e == e
                      ? e
                      : 0
                  : 0 === e
                    ? e
                    : 0;
              }
              function hl(e) {
                var t = dl(e),
                  n = t % 1;
                return t == t ? (n ? t - n : t) : 0;
              }
              function fl(e) {
                return e ? rs(hl(e), 0, _) : 0;
              }
              function _l(e) {
                if ("number" == typeof e) return e;
                if (rl(e)) return f;
                if (el(e)) {
                  var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                  e = el(t) ? t + "" : t;
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
              function gl(e) {
                return Ao(e, Al(e));
              }
              function vl(e) {
                return null == e ? "" : uo(e);
              }
              var yl = No(function (e, t) {
                  if (wi(t) || $a(t)) Ao(t, Ll(t), e);
                  else for (var n in t) je.call(t, n) && ns(e, n, t[n]);
                }),
                bl = No(function (e, t) {
                  Ao(t, Al(t), e);
                }),
                El = No(function (e, t, n, s) {
                  Ao(t, Al(t), e, s);
                }),
                xl = No(function (e, t, n, s) {
                  Ao(t, Ll(t), e, s);
                }),
                kl = oi(ls);
              var Sl = Xs(function (e, t) {
                  e = Ie(e);
                  var n = -1,
                    s = t.length,
                    i = s > 2 ? t[2] : o;
                  for (i && Ei(t[0], t[1], i) && (s = 1); ++n < s; )
                    for (
                      var a = t[n], l = Al(a), r = -1, c = l.length;
                      ++r < c;

                    ) {
                      var u = l[r],
                        p = e[u];
                      (p === o || (Ua(p, Ne[u]) && !je.call(e, u))) &&
                        (e[u] = a[u]);
                    }
                  return e;
                }),
                wl = Xs(function (e) {
                  return e.push(o, ti), Tt(Nl, o, e);
                });
              function Cl(e, t, n) {
                var s = null == e ? o : Ss(e, t);
                return s === o ? n : s;
              }
              function Tl(e, t) {
                return null != e && gi(e, t, Os);
              }
              var Il = Wo(function (e, t, n) {
                  null != t &&
                    "function" != typeof t.toString &&
                    (t = Ue.call(t)),
                    (e[t] = n);
                }, er(sr)),
                Ol = Wo(function (e, t, n) {
                  null != t &&
                    "function" != typeof t.toString &&
                    (t = Ue.call(t)),
                    je.call(e, t) ? e[t].push(n) : (e[t] = [n]);
                }, ui),
                Rl = Xs(Ls);
              function Ll(e) {
                return $a(e) ? Xn(e) : js(e);
              }
              function Al(e) {
                return $a(e) ? Xn(e, !0) : Fs(e);
              }
              var Pl = No(function (e, t, n) {
                  Ws(e, t, n);
                }),
                Nl = No(function (e, t, n, s) {
                  Ws(e, t, n, s);
                }),
                Ml = oi(function (e, t) {
                  var n = {};
                  if (null == e) return n;
                  var s = !1;
                  (t = Mt(t, function (t) {
                    return (t = Eo(t, e)), s || (s = t.length > 1), t;
                  })),
                    Ao(e, ai(e), n),
                    s && (n = cs(n, 7, ni));
                  for (var o = t.length; o--; ) mo(n, t[o]);
                  return n;
                });
              var Dl = oi(function (e, t) {
                return null == e
                  ? {}
                  : (function (e, t) {
                      return $s(e, t, function (t, n) {
                        return Tl(e, n);
                      });
                    })(e, t);
              });
              function jl(e, t) {
                if (null == e) return {};
                var n = Mt(ai(e), function (e) {
                  return [e];
                });
                return (
                  (t = ui(t)),
                  $s(e, n, function (e, n) {
                    return t(e, n[0]);
                  })
                );
              }
              var Fl = Zo(Ll),
                Bl = Zo(Al);
              function Ul(e) {
                return null == e ? [] : Jt(e, Ll(e));
              }
              var Vl = Fo(function (e, t, n) {
                return (t = t.toLowerCase()), e + (n ? Hl(t) : t);
              });
              function Hl(e) {
                return Ql(vl(e).toLowerCase());
              }
              function Wl(e) {
                return (e = vl(e)) && e.replace(Ee, sn).replace(tt, "");
              }
              var ql = Fo(function (e, t, n) {
                  return e + (n ? "-" : "") + t.toLowerCase();
                }),
                Kl = Fo(function (e, t, n) {
                  return e + (n ? " " : "") + t.toLowerCase();
                }),
                $l = jo("toLowerCase");
              var Gl = Fo(function (e, t, n) {
                return e + (n ? "_" : "") + t.toLowerCase();
              });
              var Yl = Fo(function (e, t, n) {
                return e + (n ? " " : "") + Ql(t);
              });
              var zl = Fo(function (e, t, n) {
                  return e + (n ? " " : "") + t.toUpperCase();
                }),
                Ql = jo("toUpperCase");
              function Xl(e, t, n) {
                return (
                  (e = vl(e)),
                  (t = n ? o : t) === o
                    ? (function (e) {
                        return it.test(e);
                      })(e)
                      ? (function (e) {
                          return e.match(st) || [];
                        })(e)
                      : (function (e) {
                          return e.match(me) || [];
                        })(e)
                    : e.match(t) || []
                );
              }
              var Zl = Xs(function (e, t) {
                  try {
                    return Tt(e, o, t);
                  } catch (e) {
                    return Qa(e) ? e : new we(e);
                  }
                }),
                Jl = oi(function (e, t) {
                  return (
                    Ot(t, function (t) {
                      (t = ji(t)), as(e, t, Oa(e[t], e));
                    }),
                    e
                  );
                });
              function er(e) {
                return function () {
                  return e;
                };
              }
              var tr = Vo(),
                nr = Vo(!0);
              function sr(e) {
                return e;
              }
              function or(e) {
                return Ds("function" == typeof e ? e : cs(e, 1));
              }
              var ir = Xs(function (e, t) {
                  return function (n) {
                    return Ls(n, e, t);
                  };
                }),
                ar = Xs(function (e, t) {
                  return function (n) {
                    return Ls(e, n, t);
                  };
                });
              function lr(e, t, n) {
                var s = Ll(t),
                  o = ks(t, s);
                null != n ||
                  (el(t) && (o.length || !s.length)) ||
                  ((n = t), (t = e), (e = this), (o = ks(t, Ll(t))));
                var i = !(el(n) && "chain" in n && !n.chain),
                  a = Xa(e);
                return (
                  Ot(o, function (n) {
                    var s = t[n];
                    (e[n] = s),
                      a &&
                        (e.prototype[n] = function () {
                          var t = this.__chain__;
                          if (i || t) {
                            var n = e(this.__wrapped__);
                            return (
                              (n.__actions__ = Lo(this.__actions__)).push({
                                func: s,
                                args: arguments,
                                thisArg: e,
                              }),
                              (n.__chain__ = t),
                              n
                            );
                          }
                          return s.apply(e, Dt([this.value()], arguments));
                        });
                  }),
                  e
                );
              }
              function rr() {}
              var cr = Ko(Mt),
                ur = Ko(Lt),
                pr = Ko(Bt);
              function mr(e) {
                return xi(e)
                  ? Gt(ji(e))
                  : (function (e) {
                      return function (t) {
                        return Ss(t, e);
                      };
                    })(e);
              }
              var dr = Go(),
                hr = Go(!0);
              function fr() {
                return [];
              }
              function _r() {
                return !1;
              }
              var gr = qo(function (e, t) {
                  return e + t;
                }, 0),
                vr = Qo("ceil"),
                yr = qo(function (e, t) {
                  return e / t;
                }, 1),
                br = Qo("floor");
              var Er,
                xr = qo(function (e, t) {
                  return e * t;
                }, 1),
                kr = Qo("round"),
                Sr = qo(function (e, t) {
                  return e - t;
                }, 0);
              return (
                (Vn.after = function (e, t) {
                  if ("function" != typeof t) throw new Le(i);
                  return (
                    (e = hl(e)),
                    function () {
                      if (--e < 1) return t.apply(this, arguments);
                    }
                  );
                }),
                (Vn.ary = Ta),
                (Vn.assign = yl),
                (Vn.assignIn = bl),
                (Vn.assignInWith = El),
                (Vn.assignWith = xl),
                (Vn.at = kl),
                (Vn.before = Ia),
                (Vn.bind = Oa),
                (Vn.bindAll = Jl),
                (Vn.bindKey = Ra),
                (Vn.castArray = function () {
                  if (!arguments.length) return [];
                  var e = arguments[0];
                  return qa(e) ? e : [e];
                }),
                (Vn.chain = ma),
                (Vn.chunk = function (e, t, n) {
                  t = (n ? Ei(e, t, n) : t === o) ? 1 : yn(hl(t), 0);
                  var i = null == e ? 0 : e.length;
                  if (!i || t < 1) return [];
                  for (var a = 0, l = 0, r = s(_t(i / t)); a < i; )
                    r[l++] = oo(e, a, (a += t));
                  return r;
                }),
                (Vn.compact = function (e) {
                  for (
                    var t = -1, n = null == e ? 0 : e.length, s = 0, o = [];
                    ++t < n;

                  ) {
                    var i = e[t];
                    i && (o[s++] = i);
                  }
                  return o;
                }),
                (Vn.concat = function () {
                  var e = arguments.length;
                  if (!e) return [];
                  for (var t = s(e - 1), n = arguments[0], o = e; o--; )
                    t[o - 1] = arguments[o];
                  return Dt(qa(n) ? Lo(n) : [n], vs(t, 1));
                }),
                (Vn.cond = function (e) {
                  var t = null == e ? 0 : e.length,
                    n = ui();
                  return (
                    (e = t
                      ? Mt(e, function (e) {
                          if ("function" != typeof e[1]) throw new Le(i);
                          return [n(e[0]), e[1]];
                        })
                      : []),
                    Xs(function (n) {
                      for (var s = -1; ++s < t; ) {
                        var o = e[s];
                        if (Tt(o[0], this, n)) return Tt(o[1], this, n);
                      }
                    })
                  );
                }),
                (Vn.conforms = function (e) {
                  return (function (e) {
                    var t = Ll(e);
                    return function (n) {
                      return us(n, e, t);
                    };
                  })(cs(e, 1));
                }),
                (Vn.constant = er),
                (Vn.countBy = fa),
                (Vn.create = function (e, t) {
                  var n = Hn(e);
                  return null == t ? n : is(n, t);
                }),
                (Vn.curry = function e(t, n, s) {
                  var i = Jo(t, 8, o, o, o, o, o, (n = s ? o : n));
                  return (i.placeholder = e.placeholder), i;
                }),
                (Vn.curryRight = function e(t, n, s) {
                  var i = Jo(t, r, o, o, o, o, o, (n = s ? o : n));
                  return (i.placeholder = e.placeholder), i;
                }),
                (Vn.debounce = La),
                (Vn.defaults = Sl),
                (Vn.defaultsDeep = wl),
                (Vn.defer = Aa),
                (Vn.delay = Pa),
                (Vn.difference = Ui),
                (Vn.differenceBy = Vi),
                (Vn.differenceWith = Hi),
                (Vn.drop = function (e, t, n) {
                  var s = null == e ? 0 : e.length;
                  return s
                    ? oo(e, (t = n || t === o ? 1 : hl(t)) < 0 ? 0 : t, s)
                    : [];
                }),
                (Vn.dropRight = function (e, t, n) {
                  var s = null == e ? 0 : e.length;
                  return s
                    ? oo(
                        e,
                        0,
                        (t = s - (t = n || t === o ? 1 : hl(t))) < 0 ? 0 : t,
                      )
                    : [];
                }),
                (Vn.dropRightWhile = function (e, t) {
                  return e && e.length ? fo(e, ui(t, 3), !0, !0) : [];
                }),
                (Vn.dropWhile = function (e, t) {
                  return e && e.length ? fo(e, ui(t, 3), !0) : [];
                }),
                (Vn.fill = function (e, t, n, s) {
                  var i = null == e ? 0 : e.length;
                  return i
                    ? (n &&
                        "number" != typeof n &&
                        Ei(e, t, n) &&
                        ((n = 0), (s = i)),
                      (function (e, t, n, s) {
                        var i = e.length;
                        for (
                          (n = hl(n)) < 0 && (n = -n > i ? 0 : i + n),
                            (s = s === o || s > i ? i : hl(s)) < 0 && (s += i),
                            s = n > s ? 0 : fl(s);
                          n < s;

                        )
                          e[n++] = t;
                        return e;
                      })(e, t, n, s))
                    : [];
                }),
                (Vn.filter = function (e, t) {
                  return (qa(e) ? At : gs)(e, ui(t, 3));
                }),
                (Vn.flatMap = function (e, t) {
                  return vs(ka(e, t), 1);
                }),
                (Vn.flatMapDeep = function (e, t) {
                  return vs(ka(e, t), d);
                }),
                (Vn.flatMapDepth = function (e, t, n) {
                  return (n = n === o ? 1 : hl(n)), vs(ka(e, t), n);
                }),
                (Vn.flatten = Ki),
                (Vn.flattenDeep = function (e) {
                  return (null == e ? 0 : e.length) ? vs(e, d) : [];
                }),
                (Vn.flattenDepth = function (e, t) {
                  return (null == e ? 0 : e.length)
                    ? vs(e, (t = t === o ? 1 : hl(t)))
                    : [];
                }),
                (Vn.flip = function (e) {
                  return Jo(e, 512);
                }),
                (Vn.flow = tr),
                (Vn.flowRight = nr),
                (Vn.fromPairs = function (e) {
                  for (
                    var t = -1, n = null == e ? 0 : e.length, s = {};
                    ++t < n;

                  ) {
                    var o = e[t];
                    s[o[0]] = o[1];
                  }
                  return s;
                }),
                (Vn.functions = function (e) {
                  return null == e ? [] : ks(e, Ll(e));
                }),
                (Vn.functionsIn = function (e) {
                  return null == e ? [] : ks(e, Al(e));
                }),
                (Vn.groupBy = ba),
                (Vn.initial = function (e) {
                  return (null == e ? 0 : e.length) ? oo(e, 0, -1) : [];
                }),
                (Vn.intersection = Gi),
                (Vn.intersectionBy = Yi),
                (Vn.intersectionWith = zi),
                (Vn.invert = Il),
                (Vn.invertBy = Ol),
                (Vn.invokeMap = Ea),
                (Vn.iteratee = or),
                (Vn.keyBy = xa),
                (Vn.keys = Ll),
                (Vn.keysIn = Al),
                (Vn.map = ka),
                (Vn.mapKeys = function (e, t) {
                  var n = {};
                  return (
                    (t = ui(t, 3)),
                    Es(e, function (e, s, o) {
                      as(n, t(e, s, o), e);
                    }),
                    n
                  );
                }),
                (Vn.mapValues = function (e, t) {
                  var n = {};
                  return (
                    (t = ui(t, 3)),
                    Es(e, function (e, s, o) {
                      as(n, s, t(e, s, o));
                    }),
                    n
                  );
                }),
                (Vn.matches = function (e) {
                  return Vs(cs(e, 1));
                }),
                (Vn.matchesProperty = function (e, t) {
                  return Hs(e, cs(t, 1));
                }),
                (Vn.memoize = Na),
                (Vn.merge = Pl),
                (Vn.mergeWith = Nl),
                (Vn.method = ir),
                (Vn.methodOf = ar),
                (Vn.mixin = lr),
                (Vn.negate = Ma),
                (Vn.nthArg = function (e) {
                  return (
                    (e = hl(e)),
                    Xs(function (t) {
                      return qs(t, e);
                    })
                  );
                }),
                (Vn.omit = Ml),
                (Vn.omitBy = function (e, t) {
                  return jl(e, Ma(ui(t)));
                }),
                (Vn.once = function (e) {
                  return Ia(2, e);
                }),
                (Vn.orderBy = function (e, t, n, s) {
                  return null == e
                    ? []
                    : (qa(t) || (t = null == t ? [] : [t]),
                      qa((n = s ? o : n)) || (n = null == n ? [] : [n]),
                      Ks(e, t, n));
                }),
                (Vn.over = cr),
                (Vn.overArgs = Da),
                (Vn.overEvery = ur),
                (Vn.overSome = pr),
                (Vn.partial = ja),
                (Vn.partialRight = Fa),
                (Vn.partition = Sa),
                (Vn.pick = Dl),
                (Vn.pickBy = jl),
                (Vn.property = mr),
                (Vn.propertyOf = function (e) {
                  return function (t) {
                    return null == e ? o : Ss(e, t);
                  };
                }),
                (Vn.pull = Xi),
                (Vn.pullAll = Zi),
                (Vn.pullAllBy = function (e, t, n) {
                  return e && e.length && t && t.length
                    ? Gs(e, t, ui(n, 2))
                    : e;
                }),
                (Vn.pullAllWith = function (e, t, n) {
                  return e && e.length && t && t.length ? Gs(e, t, o, n) : e;
                }),
                (Vn.pullAt = Ji),
                (Vn.range = dr),
                (Vn.rangeRight = hr),
                (Vn.rearg = Ba),
                (Vn.reject = function (e, t) {
                  return (qa(e) ? At : gs)(e, Ma(ui(t, 3)));
                }),
                (Vn.remove = function (e, t) {
                  var n = [];
                  if (!e || !e.length) return n;
                  var s = -1,
                    o = [],
                    i = e.length;
                  for (t = ui(t, 3); ++s < i; ) {
                    var a = e[s];
                    t(a, s, e) && (n.push(a), o.push(s));
                  }
                  return Ys(e, o), n;
                }),
                (Vn.rest = function (e, t) {
                  if ("function" != typeof e) throw new Le(i);
                  return Xs(e, (t = t === o ? t : hl(t)));
                }),
                (Vn.reverse = ea),
                (Vn.sampleSize = function (e, t, n) {
                  return (
                    (t = (n ? Ei(e, t, n) : t === o) ? 1 : hl(t)),
                    (qa(e) ? Jn : Js)(e, t)
                  );
                }),
                (Vn.set = function (e, t, n) {
                  return null == e ? e : eo(e, t, n);
                }),
                (Vn.setWith = function (e, t, n, s) {
                  return (
                    (s = "function" == typeof s ? s : o),
                    null == e ? e : eo(e, t, n, s)
                  );
                }),
                (Vn.shuffle = function (e) {
                  return (qa(e) ? es : so)(e);
                }),
                (Vn.slice = function (e, t, n) {
                  var s = null == e ? 0 : e.length;
                  return s
                    ? (n && "number" != typeof n && Ei(e, t, n)
                        ? ((t = 0), (n = s))
                        : ((t = null == t ? 0 : hl(t)),
                          (n = n === o ? s : hl(n))),
                      oo(e, t, n))
                    : [];
                }),
                (Vn.sortBy = wa),
                (Vn.sortedUniq = function (e) {
                  return e && e.length ? ro(e) : [];
                }),
                (Vn.sortedUniqBy = function (e, t) {
                  return e && e.length ? ro(e, ui(t, 2)) : [];
                }),
                (Vn.split = function (e, t, n) {
                  return (
                    n && "number" != typeof n && Ei(e, t, n) && (t = n = o),
                    (n = n === o ? _ : n >>> 0)
                      ? (e = vl(e)) &&
                        ("string" == typeof t || (null != t && !il(t))) &&
                        !(t = uo(t)) &&
                        ln(e)
                        ? ko(fn(e), 0, n)
                        : e.split(t, n)
                      : []
                  );
                }),
                (Vn.spread = function (e, t) {
                  if ("function" != typeof e) throw new Le(i);
                  return (
                    (t = null == t ? 0 : yn(hl(t), 0)),
                    Xs(function (n) {
                      var s = n[t],
                        o = ko(n, 0, t);
                      return s && Dt(o, s), Tt(e, this, o);
                    })
                  );
                }),
                (Vn.tail = function (e) {
                  var t = null == e ? 0 : e.length;
                  return t ? oo(e, 1, t) : [];
                }),
                (Vn.take = function (e, t, n) {
                  return e && e.length
                    ? oo(e, 0, (t = n || t === o ? 1 : hl(t)) < 0 ? 0 : t)
                    : [];
                }),
                (Vn.takeRight = function (e, t, n) {
                  var s = null == e ? 0 : e.length;
                  return s
                    ? oo(
                        e,
                        (t = s - (t = n || t === o ? 1 : hl(t))) < 0 ? 0 : t,
                        s,
                      )
                    : [];
                }),
                (Vn.takeRightWhile = function (e, t) {
                  return e && e.length ? fo(e, ui(t, 3), !1, !0) : [];
                }),
                (Vn.takeWhile = function (e, t) {
                  return e && e.length ? fo(e, ui(t, 3)) : [];
                }),
                (Vn.tap = function (e, t) {
                  return t(e), e;
                }),
                (Vn.throttle = function (e, t, n) {
                  var s = !0,
                    o = !0;
                  if ("function" != typeof e) throw new Le(i);
                  return (
                    el(n) &&
                      ((s = "leading" in n ? !!n.leading : s),
                      (o = "trailing" in n ? !!n.trailing : o)),
                    La(e, t, { leading: s, maxWait: t, trailing: o })
                  );
                }),
                (Vn.thru = da),
                (Vn.toArray = ml),
                (Vn.toPairs = Fl),
                (Vn.toPairsIn = Bl),
                (Vn.toPath = function (e) {
                  return qa(e) ? Mt(e, ji) : rl(e) ? [e] : Lo(Di(vl(e)));
                }),
                (Vn.toPlainObject = gl),
                (Vn.transform = function (e, t, n) {
                  var s = qa(e),
                    o = s || Ya(e) || cl(e);
                  if (((t = ui(t, 4)), null == n)) {
                    var i = e && e.constructor;
                    n = o
                      ? s
                        ? new i()
                        : []
                      : el(e) && Xa(i)
                        ? Hn(Ye(e))
                        : {};
                  }
                  return (
                    (o ? Ot : Es)(e, function (e, s, o) {
                      return t(n, e, s, o);
                    }),
                    n
                  );
                }),
                (Vn.unary = function (e) {
                  return Ta(e, 1);
                }),
                (Vn.union = ta),
                (Vn.unionBy = na),
                (Vn.unionWith = sa),
                (Vn.uniq = function (e) {
                  return e && e.length ? po(e) : [];
                }),
                (Vn.uniqBy = function (e, t) {
                  return e && e.length ? po(e, ui(t, 2)) : [];
                }),
                (Vn.uniqWith = function (e, t) {
                  return (
                    (t = "function" == typeof t ? t : o),
                    e && e.length ? po(e, o, t) : []
                  );
                }),
                (Vn.unset = function (e, t) {
                  return null == e || mo(e, t);
                }),
                (Vn.unzip = oa),
                (Vn.unzipWith = ia),
                (Vn.update = function (e, t, n) {
                  return null == e ? e : ho(e, t, bo(n));
                }),
                (Vn.updateWith = function (e, t, n, s) {
                  return (
                    (s = "function" == typeof s ? s : o),
                    null == e ? e : ho(e, t, bo(n), s)
                  );
                }),
                (Vn.values = Ul),
                (Vn.valuesIn = function (e) {
                  return null == e ? [] : Jt(e, Al(e));
                }),
                (Vn.without = aa),
                (Vn.words = Xl),
                (Vn.wrap = function (e, t) {
                  return ja(bo(t), e);
                }),
                (Vn.xor = la),
                (Vn.xorBy = ra),
                (Vn.xorWith = ca),
                (Vn.zip = ua),
                (Vn.zipObject = function (e, t) {
                  return vo(e || [], t || [], ns);
                }),
                (Vn.zipObjectDeep = function (e, t) {
                  return vo(e || [], t || [], eo);
                }),
                (Vn.zipWith = pa),
                (Vn.entries = Fl),
                (Vn.entriesIn = Bl),
                (Vn.extend = bl),
                (Vn.extendWith = El),
                lr(Vn, Vn),
                (Vn.add = gr),
                (Vn.attempt = Zl),
                (Vn.camelCase = Vl),
                (Vn.capitalize = Hl),
                (Vn.ceil = vr),
                (Vn.clamp = function (e, t, n) {
                  return (
                    n === o && ((n = t), (t = o)),
                    n !== o && (n = (n = _l(n)) == n ? n : 0),
                    t !== o && (t = (t = _l(t)) == t ? t : 0),
                    rs(_l(e), t, n)
                  );
                }),
                (Vn.clone = function (e) {
                  return cs(e, 4);
                }),
                (Vn.cloneDeep = function (e) {
                  return cs(e, 5);
                }),
                (Vn.cloneDeepWith = function (e, t) {
                  return cs(e, 5, (t = "function" == typeof t ? t : o));
                }),
                (Vn.cloneWith = function (e, t) {
                  return cs(e, 4, (t = "function" == typeof t ? t : o));
                }),
                (Vn.conformsTo = function (e, t) {
                  return null == t || us(e, t, Ll(t));
                }),
                (Vn.deburr = Wl),
                (Vn.defaultTo = function (e, t) {
                  return null == e || e != e ? t : e;
                }),
                (Vn.divide = yr),
                (Vn.endsWith = function (e, t, n) {
                  (e = vl(e)), (t = uo(t));
                  var s = e.length,
                    i = (n = n === o ? s : rs(hl(n), 0, s));
                  return (n -= t.length) >= 0 && e.slice(n, i) == t;
                }),
                (Vn.eq = Ua),
                (Vn.escape = function (e) {
                  return (e = vl(e)) && X.test(e) ? e.replace(z, on) : e;
                }),
                (Vn.escapeRegExp = function (e) {
                  return (e = vl(e)) && ie.test(e) ? e.replace(oe, "\\$&") : e;
                }),
                (Vn.every = function (e, t, n) {
                  var s = qa(e) ? Lt : fs;
                  return n && Ei(e, t, n) && (t = o), s(e, ui(t, 3));
                }),
                (Vn.find = _a),
                (Vn.findIndex = Wi),
                (Vn.findKey = function (e, t) {
                  return Vt(e, ui(t, 3), Es);
                }),
                (Vn.findLast = ga),
                (Vn.findLastIndex = qi),
                (Vn.findLastKey = function (e, t) {
                  return Vt(e, ui(t, 3), xs);
                }),
                (Vn.floor = br),
                (Vn.forEach = va),
                (Vn.forEachRight = ya),
                (Vn.forIn = function (e, t) {
                  return null == e ? e : ys(e, ui(t, 3), Al);
                }),
                (Vn.forInRight = function (e, t) {
                  return null == e ? e : bs(e, ui(t, 3), Al);
                }),
                (Vn.forOwn = function (e, t) {
                  return e && Es(e, ui(t, 3));
                }),
                (Vn.forOwnRight = function (e, t) {
                  return e && xs(e, ui(t, 3));
                }),
                (Vn.get = Cl),
                (Vn.gt = Va),
                (Vn.gte = Ha),
                (Vn.has = function (e, t) {
                  return null != e && gi(e, t, Is);
                }),
                (Vn.hasIn = Tl),
                (Vn.head = $i),
                (Vn.identity = sr),
                (Vn.includes = function (e, t, n, s) {
                  (e = $a(e) ? e : Ul(e)), (n = n && !s ? hl(n) : 0);
                  var o = e.length;
                  return (
                    n < 0 && (n = yn(o + n, 0)),
                    ll(e)
                      ? n <= o && e.indexOf(t, n) > -1
                      : !!o && Wt(e, t, n) > -1
                  );
                }),
                (Vn.indexOf = function (e, t, n) {
                  var s = null == e ? 0 : e.length;
                  if (!s) return -1;
                  var o = null == n ? 0 : hl(n);
                  return o < 0 && (o = yn(s + o, 0)), Wt(e, t, o);
                }),
                (Vn.inRange = function (e, t, n) {
                  return (
                    (t = dl(t)),
                    n === o ? ((n = t), (t = 0)) : (n = dl(n)),
                    (function (e, t, n) {
                      return e >= bn(t, n) && e < yn(t, n);
                    })((e = _l(e)), t, n)
                  );
                }),
                (Vn.invoke = Rl),
                (Vn.isArguments = Wa),
                (Vn.isArray = qa),
                (Vn.isArrayBuffer = Ka),
                (Vn.isArrayLike = $a),
                (Vn.isArrayLikeObject = Ga),
                (Vn.isBoolean = function (e) {
                  return !0 === e || !1 === e || (tl(e) && Cs(e) == b);
                }),
                (Vn.isBuffer = Ya),
                (Vn.isDate = za),
                (Vn.isElement = function (e) {
                  return tl(e) && 1 === e.nodeType && !ol(e);
                }),
                (Vn.isEmpty = function (e) {
                  if (null == e) return !0;
                  if (
                    $a(e) &&
                    (qa(e) ||
                      "string" == typeof e ||
                      "function" == typeof e.splice ||
                      Ya(e) ||
                      cl(e) ||
                      Wa(e))
                  )
                    return !e.length;
                  var t = _i(e);
                  if (t == w || t == R) return !e.size;
                  if (wi(e)) return !js(e).length;
                  for (var n in e) if (je.call(e, n)) return !1;
                  return !0;
                }),
                (Vn.isEqual = function (e, t) {
                  return Ps(e, t);
                }),
                (Vn.isEqualWith = function (e, t, n) {
                  var s = (n = "function" == typeof n ? n : o) ? n(e, t) : o;
                  return s === o ? Ps(e, t, o, n) : !!s;
                }),
                (Vn.isError = Qa),
                (Vn.isFinite = function (e) {
                  return "number" == typeof e && Ut(e);
                }),
                (Vn.isFunction = Xa),
                (Vn.isInteger = Za),
                (Vn.isLength = Ja),
                (Vn.isMap = nl),
                (Vn.isMatch = function (e, t) {
                  return e === t || Ns(e, t, mi(t));
                }),
                (Vn.isMatchWith = function (e, t, n) {
                  return (
                    (n = "function" == typeof n ? n : o), Ns(e, t, mi(t), n)
                  );
                }),
                (Vn.isNaN = function (e) {
                  return sl(e) && e != +e;
                }),
                (Vn.isNative = function (e) {
                  if (Si(e))
                    throw new we(
                      "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",
                    );
                  return Ms(e);
                }),
                (Vn.isNil = function (e) {
                  return null == e;
                }),
                (Vn.isNull = function (e) {
                  return null === e;
                }),
                (Vn.isNumber = sl),
                (Vn.isObject = el),
                (Vn.isObjectLike = tl),
                (Vn.isPlainObject = ol),
                (Vn.isRegExp = il),
                (Vn.isSafeInteger = function (e) {
                  return Za(e) && e >= -9007199254740991 && e <= h;
                }),
                (Vn.isSet = al),
                (Vn.isString = ll),
                (Vn.isSymbol = rl),
                (Vn.isTypedArray = cl),
                (Vn.isUndefined = function (e) {
                  return e === o;
                }),
                (Vn.isWeakMap = function (e) {
                  return tl(e) && _i(e) == P;
                }),
                (Vn.isWeakSet = function (e) {
                  return tl(e) && "[object WeakSet]" == Cs(e);
                }),
                (Vn.join = function (e, t) {
                  return null == e ? "" : Yt.call(e, t);
                }),
                (Vn.kebabCase = ql),
                (Vn.last = Qi),
                (Vn.lastIndexOf = function (e, t, n) {
                  var s = null == e ? 0 : e.length;
                  if (!s) return -1;
                  var i = s;
                  return (
                    n !== o &&
                      (i = (i = hl(n)) < 0 ? yn(s + i, 0) : bn(i, s - 1)),
                    t == t
                      ? (function (e, t, n) {
                          for (var s = n + 1; s--; ) if (e[s] === t) return s;
                          return s;
                        })(e, t, i)
                      : Ht(e, Kt, i, !0)
                  );
                }),
                (Vn.lowerCase = Kl),
                (Vn.lowerFirst = $l),
                (Vn.lt = ul),
                (Vn.lte = pl),
                (Vn.max = function (e) {
                  return e && e.length ? _s(e, sr, Ts) : o;
                }),
                (Vn.maxBy = function (e, t) {
                  return e && e.length ? _s(e, ui(t, 2), Ts) : o;
                }),
                (Vn.mean = function (e) {
                  return $t(e, sr);
                }),
                (Vn.meanBy = function (e, t) {
                  return $t(e, ui(t, 2));
                }),
                (Vn.min = function (e) {
                  return e && e.length ? _s(e, sr, Bs) : o;
                }),
                (Vn.minBy = function (e, t) {
                  return e && e.length ? _s(e, ui(t, 2), Bs) : o;
                }),
                (Vn.stubArray = fr),
                (Vn.stubFalse = _r),
                (Vn.stubObject = function () {
                  return {};
                }),
                (Vn.stubString = function () {
                  return "";
                }),
                (Vn.stubTrue = function () {
                  return !0;
                }),
                (Vn.multiply = xr),
                (Vn.nth = function (e, t) {
                  return e && e.length ? qs(e, hl(t)) : o;
                }),
                (Vn.noConflict = function () {
                  return ft._ === this && (ft._ = He), this;
                }),
                (Vn.noop = rr),
                (Vn.now = Ca),
                (Vn.pad = function (e, t, n) {
                  e = vl(e);
                  var s = (t = hl(t)) ? hn(e) : 0;
                  if (!t || s >= t) return e;
                  var o = (t - s) / 2;
                  return $o(gt(o), n) + e + $o(_t(o), n);
                }),
                (Vn.padEnd = function (e, t, n) {
                  e = vl(e);
                  var s = (t = hl(t)) ? hn(e) : 0;
                  return t && s < t ? e + $o(t - s, n) : e;
                }),
                (Vn.padStart = function (e, t, n) {
                  e = vl(e);
                  var s = (t = hl(t)) ? hn(e) : 0;
                  return t && s < t ? $o(t - s, n) + e : e;
                }),
                (Vn.parseInt = function (e, t, n) {
                  return (
                    n || null == t ? (t = 0) : t && (t = +t),
                    xn(vl(e).replace(le, ""), t || 0)
                  );
                }),
                (Vn.random = function (e, t, n) {
                  if (
                    (n && "boolean" != typeof n && Ei(e, t, n) && (t = n = o),
                    n === o &&
                      ("boolean" == typeof t
                        ? ((n = t), (t = o))
                        : "boolean" == typeof e && ((n = e), (e = o))),
                    e === o && t === o
                      ? ((e = 0), (t = 1))
                      : ((e = dl(e)),
                        t === o ? ((t = e), (e = 0)) : (t = dl(t))),
                    e > t)
                  ) {
                    var s = e;
                    (e = t), (t = s);
                  }
                  if (n || e % 1 || t % 1) {
                    var i = kn();
                    return bn(
                      e + i * (t - e + pt("1e-" + ((i + "").length - 1))),
                      t,
                    );
                  }
                  return zs(e, t);
                }),
                (Vn.reduce = function (e, t, n) {
                  var s = qa(e) ? jt : zt,
                    o = arguments.length < 3;
                  return s(e, ui(t, 4), n, o, ds);
                }),
                (Vn.reduceRight = function (e, t, n) {
                  var s = qa(e) ? Ft : zt,
                    o = arguments.length < 3;
                  return s(e, ui(t, 4), n, o, hs);
                }),
                (Vn.repeat = function (e, t, n) {
                  return (
                    (t = (n ? Ei(e, t, n) : t === o) ? 1 : hl(t)), Qs(vl(e), t)
                  );
                }),
                (Vn.replace = function () {
                  var e = arguments,
                    t = vl(e[0]);
                  return e.length < 3 ? t : t.replace(e[1], e[2]);
                }),
                (Vn.result = function (e, t, n) {
                  var s = -1,
                    i = (t = Eo(t, e)).length;
                  for (i || ((i = 1), (e = o)); ++s < i; ) {
                    var a = null == e ? o : e[ji(t[s])];
                    a === o && ((s = i), (a = n)), (e = Xa(a) ? a.call(e) : a);
                  }
                  return e;
                }),
                (Vn.round = kr),
                (Vn.runInContext = e),
                (Vn.sample = function (e) {
                  return (qa(e) ? Zn : Zs)(e);
                }),
                (Vn.size = function (e) {
                  if (null == e) return 0;
                  if ($a(e)) return ll(e) ? hn(e) : e.length;
                  var t = _i(e);
                  return t == w || t == R ? e.size : js(e).length;
                }),
                (Vn.snakeCase = Gl),
                (Vn.some = function (e, t, n) {
                  var s = qa(e) ? Bt : io;
                  return n && Ei(e, t, n) && (t = o), s(e, ui(t, 3));
                }),
                (Vn.sortedIndex = function (e, t) {
                  return ao(e, t);
                }),
                (Vn.sortedIndexBy = function (e, t, n) {
                  return lo(e, t, ui(n, 2));
                }),
                (Vn.sortedIndexOf = function (e, t) {
                  var n = null == e ? 0 : e.length;
                  if (n) {
                    var s = ao(e, t);
                    if (s < n && Ua(e[s], t)) return s;
                  }
                  return -1;
                }),
                (Vn.sortedLastIndex = function (e, t) {
                  return ao(e, t, !0);
                }),
                (Vn.sortedLastIndexBy = function (e, t, n) {
                  return lo(e, t, ui(n, 2), !0);
                }),
                (Vn.sortedLastIndexOf = function (e, t) {
                  if (null == e ? 0 : e.length) {
                    var n = ao(e, t, !0) - 1;
                    if (Ua(e[n], t)) return n;
                  }
                  return -1;
                }),
                (Vn.startCase = Yl),
                (Vn.startsWith = function (e, t, n) {
                  return (
                    (e = vl(e)),
                    (n = null == n ? 0 : rs(hl(n), 0, e.length)),
                    (t = uo(t)),
                    e.slice(n, n + t.length) == t
                  );
                }),
                (Vn.subtract = Sr),
                (Vn.sum = function (e) {
                  return e && e.length ? Qt(e, sr) : 0;
                }),
                (Vn.sumBy = function (e, t) {
                  return e && e.length ? Qt(e, ui(t, 2)) : 0;
                }),
                (Vn.template = function (e, t, n) {
                  var s = Vn.templateSettings;
                  n && Ei(e, t, n) && (t = o),
                    (e = vl(e)),
                    (t = El({}, t, s, ei));
                  var i,
                    a,
                    l = El({}, t.imports, s.imports, ei),
                    r = Ll(l),
                    c = Jt(l, r),
                    u = 0,
                    p = t.interpolate || xe,
                    m = "__p += '",
                    d = Oe(
                      (t.escape || xe).source +
                        "|" +
                        p.source +
                        "|" +
                        (p === ee ? he : xe).source +
                        "|" +
                        (t.evaluate || xe).source +
                        "|$",
                      "g",
                    ),
                    h =
                      "//# sourceURL=" +
                      ("sourceURL" in t
                        ? t.sourceURL
                        : "lodash.templateSources[" + ++lt + "]") +
                      "\n";
                  e.replace(d, function (t, n, s, o, l, r) {
                    return (
                      s || (s = o),
                      (m += e.slice(u, r).replace(ke, an)),
                      n && ((i = !0), (m += "' +\n__e(" + n + ") +\n'")),
                      l && ((a = !0), (m += "';\n" + l + ";\n__p += '")),
                      s &&
                        (m +=
                          "' +\n((__t = (" + s + ")) == null ? '' : __t) +\n'"),
                      (u = r + t.length),
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
                  var _ = Zl(function () {
                    return Ce(r, h + "return " + m).apply(o, c);
                  });
                  if (((_.source = m), Qa(_))) throw _;
                  return _;
                }),
                (Vn.times = function (e, t) {
                  if ((e = hl(e)) < 1 || e > h) return [];
                  var n = _,
                    s = bn(e, _);
                  (t = ui(t)), (e -= _);
                  for (var o = Xt(s, t); ++n < e; ) t(n);
                  return o;
                }),
                (Vn.toFinite = dl),
                (Vn.toInteger = hl),
                (Vn.toLength = fl),
                (Vn.toLower = function (e) {
                  return vl(e).toLowerCase();
                }),
                (Vn.toNumber = _l),
                (Vn.toSafeInteger = function (e) {
                  return e ? rs(hl(e), -9007199254740991, h) : 0 === e ? e : 0;
                }),
                (Vn.toString = vl),
                (Vn.toUpper = function (e) {
                  return vl(e).toUpperCase();
                }),
                (Vn.trim = function (e, t, n) {
                  if ((e = vl(e)) && (n || t === o)) return e.replace(ae, "");
                  if (!e || !(t = uo(t))) return e;
                  var s = fn(e),
                    i = fn(t);
                  return ko(s, tn(s, i), nn(s, i) + 1).join("");
                }),
                (Vn.trimEnd = function (e, t, n) {
                  if ((e = vl(e)) && (n || t === o)) return e.replace(re, "");
                  if (!e || !(t = uo(t))) return e;
                  var s = fn(e);
                  return ko(s, 0, nn(s, fn(t)) + 1).join("");
                }),
                (Vn.trimStart = function (e, t, n) {
                  if ((e = vl(e)) && (n || t === o)) return e.replace(le, "");
                  if (!e || !(t = uo(t))) return e;
                  var s = fn(e);
                  return ko(s, tn(s, fn(t))).join("");
                }),
                (Vn.truncate = function (e, t) {
                  var n = 30,
                    s = "...";
                  if (el(t)) {
                    var i = "separator" in t ? t.separator : i;
                    (n = "length" in t ? hl(t.length) : n),
                      (s = "omission" in t ? uo(t.omission) : s);
                  }
                  var a = (e = vl(e)).length;
                  if (ln(e)) {
                    var l = fn(e);
                    a = l.length;
                  }
                  if (n >= a) return e;
                  var r = n - hn(s);
                  if (r < 1) return s;
                  var c = l ? ko(l, 0, r).join("") : e.slice(0, r);
                  if (i === o) return c + s;
                  if ((l && (r += c.length - r), il(i))) {
                    if (e.slice(r).search(i)) {
                      var u,
                        p = c;
                      for (
                        i.global || (i = Oe(i.source, vl(fe.exec(i)) + "g")),
                          i.lastIndex = 0;
                        (u = i.exec(p));

                      )
                        var m = u.index;
                      c = c.slice(0, m === o ? r : m);
                    }
                  } else if (e.indexOf(uo(i), r) != r) {
                    var d = c.lastIndexOf(i);
                    d > -1 && (c = c.slice(0, d));
                  }
                  return c + s;
                }),
                (Vn.unescape = function (e) {
                  return (e = vl(e)) && Q.test(e) ? e.replace(Y, _n) : e;
                }),
                (Vn.uniqueId = function (e) {
                  var t = ++Fe;
                  return vl(e) + t;
                }),
                (Vn.upperCase = zl),
                (Vn.upperFirst = Ql),
                (Vn.each = va),
                (Vn.eachRight = ya),
                (Vn.first = $i),
                lr(
                  Vn,
                  ((Er = {}),
                  Es(Vn, function (e, t) {
                    je.call(Vn.prototype, t) || (Er[t] = e);
                  }),
                  Er),
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
                    n = n === o ? 1 : yn(hl(n), 0);
                    var s =
                      this.__filtered__ && !t ? new Kn(this) : this.clone();
                    return (
                      s.__filtered__
                        ? (s.__takeCount__ = bn(n, s.__takeCount__))
                        : s.__views__.push({
                            size: bn(n, _),
                            type: e + (s.__dir__ < 0 ? "Right" : ""),
                          }),
                      s
                    );
                  }),
                    (Kn.prototype[e + "Right"] = function (t) {
                      return this.reverse()[e](t).reverse();
                    });
                }),
                Ot(["filter", "map", "takeWhile"], function (e, t) {
                  var n = t + 1,
                    s = 1 == n || 3 == n;
                  Kn.prototype[e] = function (e) {
                    var t = this.clone();
                    return (
                      t.__iteratees__.push({ iteratee: ui(e, 3), type: n }),
                      (t.__filtered__ = t.__filtered__ || s),
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
                  return this.filter(sr);
                }),
                (Kn.prototype.find = function (e) {
                  return this.filter(e).head();
                }),
                (Kn.prototype.findLast = function (e) {
                  return this.reverse().find(e);
                }),
                (Kn.prototype.invokeMap = Xs(function (e, t) {
                  return "function" == typeof e
                    ? new Kn(this)
                    : this.map(function (n) {
                        return Ls(n, e, t);
                      });
                })),
                (Kn.prototype.reject = function (e) {
                  return this.filter(Ma(ui(e)));
                }),
                (Kn.prototype.slice = function (e, t) {
                  e = hl(e);
                  var n = this;
                  return n.__filtered__ && (e > 0 || t < 0)
                    ? new Kn(n)
                    : (e < 0 ? (n = n.takeRight(-e)) : e && (n = n.drop(e)),
                      t !== o &&
                        (n = (t = hl(t)) < 0 ? n.dropRight(-t) : n.take(t - e)),
                      n);
                }),
                (Kn.prototype.takeRightWhile = function (e) {
                  return this.reverse().takeWhile(e).reverse();
                }),
                (Kn.prototype.toArray = function () {
                  return this.take(_);
                }),
                Es(Kn.prototype, function (e, t) {
                  var n = /^(?:filter|find|map|reject)|While$/.test(t),
                    s = /^(?:head|last)$/.test(t),
                    i = Vn[s ? "take" + ("last" == t ? "Right" : "") : t],
                    a = s || /^find/.test(t);
                  i &&
                    (Vn.prototype[t] = function () {
                      var t = this.__wrapped__,
                        l = s ? [1] : arguments,
                        r = t instanceof Kn,
                        c = l[0],
                        u = r || qa(t),
                        p = function (e) {
                          var t = i.apply(Vn, Dt([e], l));
                          return s && m ? t[0] : t;
                        };
                      u &&
                        n &&
                        "function" == typeof c &&
                        1 != c.length &&
                        (r = u = !1);
                      var m = this.__chain__,
                        d = !!this.__actions__.length,
                        h = a && !m,
                        f = r && !d;
                      if (!a && u) {
                        t = f ? t : new Kn(this);
                        var _ = e.apply(t, l);
                        return (
                          _.__actions__.push({
                            func: da,
                            args: [p],
                            thisArg: o,
                          }),
                          new qn(_, m)
                        );
                      }
                      return h && f
                        ? e.apply(this, l)
                        : ((_ = this.thru(p)),
                          h ? (s ? _.value()[0] : _.value()) : _);
                    });
                }),
                Ot(
                  ["pop", "push", "shift", "sort", "splice", "unshift"],
                  function (e) {
                    var t = Ae[e],
                      n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru",
                      s = /^(?:pop|shift)$/.test(e);
                    Vn.prototype[e] = function () {
                      var e = arguments;
                      if (s && !this.__chain__) {
                        var o = this.value();
                        return t.apply(qa(o) ? o : [], e);
                      }
                      return this[n](function (n) {
                        return t.apply(qa(n) ? n : [], e);
                      });
                    };
                  },
                ),
                Es(Kn.prototype, function (e, t) {
                  var n = Vn[t];
                  if (n) {
                    var s = n.name + "";
                    (An[s] || (An[s] = [])).push({ name: t, func: n });
                  }
                }),
                (An[Ho(o, 2).name] = [{ name: "wrapper", func: o }]),
                (Kn.prototype.clone = function () {
                  var e = new Kn(this.__wrapped__);
                  return (
                    (e.__actions__ = Lo(this.__actions__)),
                    (e.__dir__ = this.__dir__),
                    (e.__filtered__ = this.__filtered__),
                    (e.__iteratees__ = Lo(this.__iteratees__)),
                    (e.__takeCount__ = this.__takeCount__),
                    (e.__views__ = Lo(this.__views__)),
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
                    s = t < 0,
                    o = n ? e.length : 0,
                    i = (function (e, t, n) {
                      var s = -1,
                        o = n.length;
                      for (; ++s < o; ) {
                        var i = n[s],
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
                    })(0, o, this.__views__),
                    a = i.start,
                    l = i.end,
                    r = l - a,
                    c = s ? l : a - 1,
                    u = this.__iteratees__,
                    p = u.length,
                    m = 0,
                    d = bn(r, this.__takeCount__);
                  if (!n || (!s && o == r && d == r))
                    return _o(e, this.__actions__);
                  var h = [];
                  e: for (; r-- && m < d; ) {
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
                  this.__values__ === o && (this.__values__ = ml(this.value()));
                  var e = this.__index__ >= this.__values__.length;
                  return {
                    done: e,
                    value: e ? o : this.__values__[this.__index__++],
                  };
                }),
                (Vn.prototype.plant = function (e) {
                  for (var t, n = this; n instanceof Wn; ) {
                    var s = Bi(n);
                    (s.__index__ = 0),
                      (s.__values__ = o),
                      t ? (i.__wrapped__ = s) : (t = s);
                    var i = s;
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
                        thisArg: o,
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
                      return _o(this.__wrapped__, this.__actions__);
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
              (s = function () {
                return gn;
              }.call(t, n, t, e)) === o || (e.exports = s);
          }.call(this);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "pLTswToQ",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-description\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-description\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-description\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-content-column"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-ability-description-wrapper"],["flush-element"],["text","\\n      "],["open-element","h4",[]],["static-attr","class","cdp-ability-name"],["flush-element"],["append",["unknown",["ability","name"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-ability-info-wrapper"],["flush-element"],["text","\\n"],["text","      "],["close-element"],["text","\\n\\n      "],["open-element","lol-uikit-content-block",[]],["static-attr","class","cdp-ability-description"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["text","          "],["open-element","p",[]],["static-attr","class","cdp-ability-dynamic-desc"],["flush-element"],["append",["helper",["sanitize"],[["get",["ability","description"]]],null],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1),
          o = n(95),
          i = n(63);
        n(96);
        const { RunMixin: a } = s.EmberAddons.EmberLifeline,
          l = s.UIKit.getFlyoutManager(),
          r = (0, s.EmberDataBinding)({
            Ember: s.Ember,
            websocket: (0, s.getProvider)().getSocket(),
            boundProperties: {
              disabledChampionSkins:
                "/lol-platform-config/v1/namespaces/DisabledChampionSkins/DisabledChampionSkins",
              skinInfo: "/lol-store/v1/skins/{{activeSkinObject.id}}",
            },
          });
        e.exports = s.Ember.Component.extend(a, r, {
          classNames: ["cdp-skins-section"],
          layout: n(97),
          eventHubService: s.Ember.inject.service("event-hub"),
          skinsFromActiveEvents: s.Ember.computed.alias(
            "eventHubService.skinsFromActiveEvents",
          ),
          selectedQuestFormIndex: null,
          flyoutComponentName: "QuestFormsPopup",
          flyoutTargetClass: ".quest-forms",
          championService: s.Ember.inject.service("champion"),
          champion: s.Ember.computed.alias("championService.champion"),
          championOwned: s.Ember.computed.alias(
            "championService.summonerChampion.ownership.owned",
          ),
          animationsEnabled: s.Ember.computed.not(
            "championService.potatoModeSetting.data.potatoModeEnabled",
          ),
          onInit: s.Ember.on("init", function () {
            s.Ember.run.scheduleOnce("afterRender", () =>
              this.sendAction("sectionLoaded", "skins"),
            ),
              this.set("flyoutComponents", new Map()),
              this.set("registeredFlyoutTargets", new Set()),
              (this._uxSettingsObserver = (e) => {
                this.set("uxSettings", e);
              }),
              s.UXSettings.addObserver(this._uxSettingsObserver);
          }),
          willDestroyElement() {
            s.UXSettings.removeObserver(this._uxSettingsObserver),
              this._super(...arguments);
          },
          ownedSkinAugmentsById: s.Ember.computed(
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
          skins: s.Ember.computed(
            "championService.summonerChampion",
            "champion",
            "disabledChampionSkins",
            function () {
              const e = this.get("disabledChampionSkins") || [];
              let t = this.get("championService.summonerChampion.skins");
              const n = this.get("champion.skins");
              return t && n
                ? ((t = t.filter((t) => !e.includes(t.id))),
                  s.Ember.set(t[0], "isBase", n[0].isBase),
                  t)
                : s.Ember.A([]);
            },
          ),
          activeSkinIndex: s.Ember.computed(
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
          activeSkin: s.Ember.computed("activeSkinIndex", function () {
            return `skin_${this.get("activeSkinIndex")}`;
          }),
          activeSkinObject: s.Ember.computed(
            "skins",
            "activeSkinIndex",
            function () {
              const e = this.get("activeSkinIndex"),
                t = this.get("skins");
              return t && t[e];
            },
          ),
          activeSkinSplashPath: s.Ember.computed.alias(
            "activeSkinObject.uncenteredSplashPath",
          ),
          currentSkinSplashVideoPath: s.Ember.computed(
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
          currentSkinDescription: s.Ember.computed(
            "activeSkinObject.featuresText",
            "activeSkinObject.questSkinInfo.collectionDescription",
            function () {
              const e = this.get(
                  "activeSkinObject.questSkinInfo.collectionDescription",
                ),
                t = this.get("activeSkinObject.featuresText");
              return e || t;
            },
          ),
          shouldShowVideoForSkin: s.Ember.computed.and(
            "animationsEnabled",
            "currentSkinSplashVideoPath",
          ),
          ownedSkinAugments: s.Ember.computed(
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
          currentBackgroundPath: s.Ember.computed(
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
          skinOwned: s.Ember.computed.alias("activeSkinObject.ownership.owned"),
          isPurchasable: s.Ember.computed(
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
          chromas: s.Ember.computed.alias("activeSkinObject.chromas"),
          hasChromas: s.Ember.computed.notEmpty("chromas"),
          questSkinInfo: s.Ember.computed.alias(
            "activeSkinObject.questSkinInfo",
          ),
          questSkinTiers: s.Ember.computed.alias("questSkinInfo.tiers"),
          hasQuestForms: s.Ember.computed.notEmpty("questSkinInfo.tiers"),
          lastSelectedSkinIndex: null,
          isTieredSkin: s.Ember.computed.equal(
            "questSkinInfo.productType",
            "kTieredSkin",
          ),
          isSkinEventActive: s.Ember.computed(
            "activeSkinObject.id",
            "skinsFromActiveEvents",
            function () {
              return !!this.get("skinsFromActiveEvents")?.[
                this.get("activeSkinObject.id")
              ];
            },
          ),
          isTieredSkinEventPurchased: s.Ember.computed(
            "activeSkinObject.id",
            "skinsFromActiveEvents",
            function () {
              return !!this.get("skinsFromActiveEvents")?.[
                this.get("activeSkinObject.id")
              ]?.isPassPurchased;
            },
          ),
          selectedSkinTier: s.Ember.computed(
            "questSkinTiers",
            "selectedQuestFormIndex",
            function () {
              return this.get("questSkinTiers")[
                this.get("selectedQuestFormIndex")
              ];
            },
          ),
          isTieredSkinWithEventOn: s.Ember.computed.and(
            "hasQuestForms",
            "isSkinEventActive",
            "isTieredSkin",
          ),
          isTieredSkinWithEventOff: s.Ember.computed(
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
          showTieredSkinEventPurchaseButton: s.Ember.computed.or(
            "isTieredSkinWithEventOff",
            "isTieredSkinWithEventOn",
          ),
          isSkinEventPurchasable: s.Ember.computed(
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
          setTieredSkinInitialState: s.Ember.observer(
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
                  this.overrideSplashVideoPath(t.collectionSplashVideoPath),
                  this.overrideAugments(t.skinAugments.augments);
              }
            },
          ),
          sendTelemetryEvent(e, t) {
            s.Telemetry.sendCustomData(
              o.TELEMETRY_EVENTS.CDP_SKINS_TABLE_NAME,
              { puuid: this.get("puuid"), event: e, ...t },
            );
          },
          createFlyoutComponent(e, t) {
            const n = s.ComponentFactory.create(e, t);
            return this.get("flyoutComponents").set(e, n), n;
          },
          assignFlyout(e, t) {
            this.set(
              "lastSelectedSkinIndex",
              this.get("selectedQuestFormIndex"),
            );
            const n = s.Ember.Object.create({
                caller: this.element,
                skinTiers: this.get("questSkinTiers"),
                showcaseComponent: this,
                isTieredSkin: this.get("isTieredSkin"),
              }),
              o = {
                showEvent: "show",
                hideEvent: "hide",
                targetAnchor: { x: "center", y: "top" },
                tooltipAnchor: { x: "center", y: "bottom" },
                offset: { x: 0, y: -20 },
                backdropCutout: null,
                orientation: "top",
                animated: !0,
                ComponentFactory: s.ComponentFactory,
              };
            l.assignFlyout(e, t, n, o),
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
            l.sendEvent(e, "hide"),
              this.runTask(() => {
                l.unassignFlyout(e);
              }, 133),
              i.SFX.flyoutCloseClick.play();
          },
          onHideFlyout() {
            const e = this.get("flyoutTargetClass"),
              t = this.element.querySelector(e);
            t.removeEventListener("willHide", this.onHideFlyout.bind(this)),
              this.runTask(() => {
                l.unassignFlyout(t);
              }, 133);
          },
          showCDPQuestFormsFlyout() {
            const e = this.get("flyoutComponentName"),
              t = this.get("flyoutTargetClass"),
              n = this.element.querySelector(t);
            n.addEventListener("willHide", this.onHideFlyout.bind(this)),
              this.assignFlyout(n, e),
              l.sendEvent(n, "show"),
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
          overrideAugments(e) {
            this.set("activeSkinObject.skinAugmentsOverride", e ?? []);
          },
          resetSkinOverrides() {
            this.set("activeSkinObject.skinSplashOverride", null),
              this.set("activeSkinObject.skinNameOverride", null),
              this.set("activeSkinObject.skinSplashVideoOverride", null),
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
              l.isActive()
                ? this.hideFlyoutModal()
                : (this.showCDPQuestFormsFlyout(),
                  this.sendTelemetryEvent(
                    o.TELEMETRY_EVENTS.CLICK_ON_QUEST_FORMS_FLYOUT,
                  ));
            },
            navigateToCurrentEvent() {
              this.sendTelemetryEvent(
                o.TELEMETRY_EVENTS.NAVIGATE_TO_EVENT_HUB,
                {
                  eventId: this.get("skinsFromActiveEvents")?.[
                    this.get("activeSkinObject.id")
                  ]?.eventId,
                  skinId: this.get("activeSkinObject.id"),
                },
              ),
                s.Router.navigateTo("rcp-fe-lol-event-hub", {
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
          (t.CreateSkinViewFlyoutData = function (e, t, s) {
            return n[e].call(this, t, s);
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
          CDP_SKINS_TABLE_NAME: "cdp_skins_section_event",
          VIEWED_TIERED_SKINS_EVENT: "viewed_tiered_skins",
        };
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "31ElBabZ",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\root\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\root\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\root\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["skins"]]],null,23],["text","\\n\\n\\n"],["block",["if"],[["get",["showTieredSkinEventPurchaseButton"]]],null,16,9]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_actions_unavailable"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"unlockSkin",["get",["skinInfo"]]],null],null],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_actions_unlock"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isPurchasable"]]],null,1,0]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_store_owned_message"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["skinOwned"]]],null,3,2]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"unlockChampion",["get",["champion","id"]]],null],null],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_actions_unlock"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_store_owned_message"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["championOwned"]]],null,6,5]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","cdp-unlock-button-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["activeSkinObject","isBase"]]],null,7,4],["text","  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["showStoreButton"]]],null,8]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_actions_unavailable"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_store_owned_message"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["selectedSkinTier","ownership","owned"]]],null,11,10]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_store_owned_message"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"navigateToCurrentEvent"],null],null],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-unlock-button-content"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","cdp_actions_unlock"]],false],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isSkinEventPurchasable"]]],null,14,13]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","cdp-unlock-button-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isSkinEventActive"]]],null,15,12],["text","  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["tiered-transformations"],null,[["showcaseComponent","skinTiers"],[["get",[null]],["get",["questSkinTiers"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","class",["concat",["quest-forms ",["helper",["unless"],[["get",["hasQuestForms"]],"hidden"],null]," ",["helper",["if"],[["get",["isTieredSkin"]],"hidden"],null]]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"toggleFlyout"],null],null],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","icon"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","quest-forms"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"toggleFlyout"],null],null],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","icon tiered"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","h4",[]],["flush-element"],["append",["unknown",["tra","cdp_theme_features"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","theme-features"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["static-attr","class","scroll-text"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["isTieredSkin"]]],null,20],["text","          "],["append",["helper",["sanitize"],[["get",["currentSkinDescription"]]],null],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-section",[]],["dynamic-attr","section-id",["concat",["skin_",["get",["index"]]]]],["static-attr","class","cdp-skin-overlay-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["currentSkinDescription"]]],null,21],["text","    "],["close-element"],["text","\\n"]],"locals":["skin","index"]},{"statements":[["text","  "],["append",["helper",["uikit-background-switcher"],null,[["src","overlays"],[["get",["currentBackgroundPath"]],["get",["ownedSkinAugments"]]]]],false],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-skin-overlay"],["flush-element"],["close-element"],["text","\\n  "],["open-element","lol-uikit-section-controller",[]],["dynamic-attr","selected-item",["concat",[["unknown",["activeSkin"]]]]],["static-attr","animation","crossfade"],["static-attr","class","cdp-skins-section-controller"],["flush-element"],["text","\\n"],["block",["each"],[["get",["skins"]]],null,22],["text","  "],["close-element"],["text","\\n\\n  "],["append",["helper",["skins-carousel"],null,[["storeSkinInfo","champion","championSkins","activeSkinIndex","updateActiveSkin","ownedSkinAugmentsById"],[["get",["skinInfo"]],["get",["champion"]],["get",["skins"]],["get",["activeSkinIndex"]],["helper",["action"],[["get",[null]],"updateActiveSkin"],null],["get",["ownedSkinAugmentsById"]]]]],false],["text","\\n  "],["open-element","div",[]],["static-attr","class","related"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isTieredSkinWithEventOff"]]],null,19,18],["text","  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isTieredSkinWithEventOn"]]],null,17]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(99);
        const o = 97,
          i =
            "/fe/lol-champion-details/audio/sfx-champselect-button-arrowback-click.ogg",
          a =
            "/fe/lol-champion-details/audio/sfx-champselect-button-arrowfwd-click.ogg",
          l =
            "/lol-client-config/v3/client-config/lol.client_settings.navigation.enableRewardsProgram",
          r = s.DataBinding.bindTo((0, s.getProvider)().getSocket());
        e.exports = s.Ember.Component.extend({
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
            r.observe(l, this, function (e) {
              this.set("isRewardsProgramEnabled", e);
            });
          },
          willDestroy() {
            r.unobserve(l);
          },
          isRewardsProgramEnabled: null,
          moveCarousel(e, t) {
            const n = this.get("activeSkinIndex");
            this.send("changeActiveSkin", n, e);
            const s = this.get("skins.length");
            if (s < 3) return;
            const o = this.get("initialOffset");
            let i = this.get("offset");
            "right" === t && e < n
              ? ((i -= -97 * s), this.resetCarousel(i))
              : "left" === t &&
                e > n &&
                ((i += -97 * s), this.resetCarousel(i));
            const a = o + -97 * e;
            this.set("offset", a);
            const l = 0.9 * -(i - a),
              r = { duration: 70, fill: "forwards" },
              c = { duration: 400, fill: "forwards" },
              u = {
                first: [
                  {
                    transform: `translateX(${i}px)`,
                    easing: "cubic-bezier(1, 0, 1, 1)",
                  },
                  { transform: `translateX(${i + l}px)` },
                ],
                second: [
                  {
                    transform: `translateX(${i + l}px)`,
                    easing: "cubic-bezier(0, 0, 0, 1)",
                  },
                  { transform: `translateX(${a}px)` },
                ],
              },
              p = document.querySelector(".cdp-skins-section .carousel-track");
            p.animate(u.first, r).onfinish = () => {
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
          activeSkin: s.Ember.computed("skins", "activeSkinIndex", function () {
            const e = this.get("skins"),
              t = this.get("activeSkinIndex");
            return e ? e[t] : null;
          }),
          activeSkinName: s.Ember.computed(
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
          activeSkinEmblems: s.Ember.computed(
            "skins",
            "activeSkinIndex",
            function () {
              const e = this.get("skins"),
                t = this.get("activeSkinIndex");
              return e ? e[t].emblems : null;
            },
          ),
          skins: s.Ember.computed(
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
                    s.Ember.set(e, "playable", t);
                    let n = "";
                    if (e.questSkinInfo)
                      if ("kQuestSkin" === e.questSkinInfo.productType)
                        s.Ember.set(
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
                        s.Ember.set(e, "customTilePath", n);
                      }
                    this.get("isRewardsProgramEnabled") &&
                    e.ownership.loyaltyReward
                      ? (n = "loyalty-reward rewards-program")
                      : e.ownership.loyaltyReward
                        ? (n = "loyalty-reward")
                        : e.ownership.rental.rented && (n = "rental"),
                      s.Ember.set(e, "ftpStyleClassName", n);
                  }),
                  e)
                : [];
            },
          ),
          isBaseSkin: s.Ember.computed("skins", "activeSkinIndex", function () {
            const e = this.get("skins"),
              t = this.get("activeSkinIndex"),
              n = this.get("champion");
            return !e || e[t].name === n;
          }),
          initialOffset: s.Ember.computed("skins", function () {
            const e = this.get("skins");
            let t;
            return (
              (t = e.length > 3 ? -194 : 3 === e.length ? -97 : 0),
              this.set("offset", t),
              t
            );
          }),
          carouselWidth: s.Ember.computed("skins", function () {
            const e = this.get("skins.length");
            return e > 5 ? 513 : 125 + (e - 1) * o;
          }),
          longCarousel: s.Ember.computed.gt("skins.length", 5),
          bufferSize: s.Ember.computed("skins.length", function () {
            const e = this.get("skins.length");
            return e >= 5 ? 4 : e - 1;
          }),
          leftCarouselBuffer: s.Ember.computed("skins", function () {
            const e = this.get("skins"),
              t = this.get("bufferSize"),
              n = e.slice().splice(-t, t);
            return 2 === e.length ? [] : n;
          }),
          rightCarouselBuffer: s.Ember.computed("skins", function () {
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
                ? (s.AudioPlugin.getChannel("sfx-ui").playSound(a),
                  this.moveCarousel(e, "right"))
                : t > e &&
                  (s.AudioPlugin.getChannel("sfx-ui").playSound(i),
                  this.moveCarousel(e, "left"));
            },
            skinThumbnailClicked: function (e, t) {
              const n = this.get("activeSkinIndex");
              let o,
                l,
                r = e;
              if ("right" === t) (o = "right"), (l = a);
              else if ("left" === t) {
                const t = this.get("bufferSize");
                (r = this.get("skins.length") - t + e), (o = "left"), (l = i);
              } else if (n < e) (o = "right"), (l = a);
              else {
                if (!(n > e)) return;
                (o = "left"), (l = i);
              }
              s.AudioPlugin.getChannel("sfx-ui").playSound(l),
                this.moveCarousel(r, o);
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "w+LZRfX4",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\skins-carousel\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\skins-carousel\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\skins-carousel\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-emblem-overlay"],["flush-element"],["text","\\n"],["block",["if"],[["get",["activeSkinEmblems"]]],null,10],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["champion-skin-name ",["helper",["if"],[["get",["isBaseSkin"]],"base-skin","skin-name"],null]]]],["flush-element"],["text","\\n  "],["append",["unknown",["activeSkinName"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","skins-carousel"],["flush-element"],["text","\\n"],["block",["if"],[["get",["longCarousel"]]],null,8],["text","\\n  "],["open-element","div",[]],["static-attr","class","carousel-track-container"],["dynamic-attr","style",["concat",["width:",["unknown",["carouselWidth"]],"px"]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","carousel-track"],["dynamic-attr","style",["concat",["transform: translateX(",["unknown",["initialOffset"]],"px)"]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["leftCarouselBuffer"]]],null,7],["text","\\n"],["block",["each"],[["get",["skins"]]],null,5],["text","\\n"],["block",["each"],[["get",["rightCarouselBuffer"]]],null,3],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["longCarousel"]]],null,1],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","skin-selection-indicator"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","line line-left"],["flush-element"],["close-element"],["text","\\n  "],["open-element","ul",[]],["static-attr","class","skin-selection-indicator-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["skins"]]],null,0],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","line line-right"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","li",[]],["dynamic-attr","class",["concat",["skin-pip ",["helper",["if"],[["get",["skin","isViewed"]],"skin-pip-selected"],null]]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"skinPipClicked",["get",["index"]]],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":["skin","index"]},{"statements":[["text","    "],["open-element","lol-uikit-arrow-button",[]],["static-attr","direction","right"],["static-attr","class","next-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"nextSkin"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","cdp-skin-thumbnail-gem-overlay"],["flush-element"],["text","\\n            "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["skin","rarityGemPath"]]]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["buffer-wrapper\\n        ",["helper",["if"],[["get",["skin","ownership","owned"]],"owned"],null],"\\n        ",["helper",["unless"],[["get",["skin","ownership","owned"]],"not-owned"],null],"\\n        ",["unknown",["skin","ftpStyleClassName"]],"\\n        ",["helper",["if"],[["get",["skin","isViewed"]],"active-buffer"],null]]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","skin-thumbnail-buffer"],["dynamic-attr","style",["concat",["background-image:url(",["helper",["if"],[["get",["skin","customTilePath"]],["get",["skin","customTilePath"]],["get",["skin","tilePath"]]],null],")"]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"skinThumbnailClicked",["get",["index"]],"right"],null],null],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["skin","rarityGemPath"]]],null,2],["text","      "],["close-element"],["text","\\n"]],"locals":["skin","index"]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","cdp-skin-thumbnail-gem-overlay"],["flush-element"],["text","\\n            "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["skin","rarityGemPath"]]]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["thumbnail-wrapper\\n        ",["helper",["if"],[["get",["skin","ownership","owned"]],"owned"],null],"\\n        ",["helper",["unless"],[["get",["skin","ownership","owned"]],"not-owned"],null],"\\n        ",["unknown",["skin","ftpStyleClassName"]],"\\n        ",["helper",["if"],[["get",["skin","isViewed"]],"active-skin"],null]]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-skin-thumbnail-img"],["dynamic-attr","style",["concat",["background-image:url(",["helper",["if"],[["get",["skin","customTilePath"]],["get",["skin","customTilePath"]],["get",["skin","tilePath"]]],null],")"]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"skinThumbnailClicked",["get",["index"]],"center"],null],null],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["skin","rarityGemPath"]]],null,4],["text","      "],["close-element"],["text","\\n"]],"locals":["skin","index"]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","cdp-skin-thumbnail-gem-overlay"],["flush-element"],["text","\\n            "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["skin","rarityGemPath"]]]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["buffer-wrapper\\n        ",["helper",["unless"],[["get",["skin","playable"]],"not-owned"],null],"\\n        ",["unknown",["skin","ftpStyleClassName"]],"\\n        ",["helper",["if"],[["get",["skin","isViewed"]],"active-buffer"],null]]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","skin-thumbnail-buffer"],["dynamic-attr","style",["concat",["background-image:url(",["helper",["if"],[["get",["skin","customTilePath"]],["get",["skin","customTilePath"]],["get",["skin","tilePath"]]],null],")"]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"skinThumbnailClicked",["get",["index"]],"left"],null],null],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["skin","rarityGemPath"]]],null,6],["text","      "],["close-element"],["text","\\n"]],"locals":["skin","index"]},{"statements":[["text","    "],["open-element","lol-uikit-arrow-button",[]],["static-attr","direction","left"],["static-attr","class","prev-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"prevSkin"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["emblem","emblemPath","large"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["emblem"]},{"statements":[["block",["each"],[["get",["activeSkinEmblems"]]],null,9]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1),
          o = n(63),
          i = n(95);
        n(102),
          (e.exports = s.Ember.Component.extend({
            classNames: ["tiered-transformations"],
            layout: n(103),
            showcaseComponent: null,
            selectedSkinIndex: s.Ember.computed.alias(
              "showcaseComponent.selectedQuestFormIndex",
            ),
            init() {
              this._super(...arguments), (this.viewedCountBySkinId = {});
            },
            willDestroyElement() {
              s.Telemetry.sendCustomData(
                i.TELEMETRY_EVENTS.CDP_SKINS_TABLE_NAME,
                {
                  eventName: i.TELEMETRY_EVENTS.VIEWED_TIERED_SKINS_EVENT,
                  viewedCountBySkinId: JSON.stringify(
                    this.get("viewedCountBySkinId"),
                  ),
                },
              );
            },
            actions: {
              tierClicked(e) {
                o.SFX.gridClick.play(),
                  this.get("showcaseComponent").setSelectedQuestForm(e);
              },
              onMouseEnterTier(e) {
                const t = this.get("skinTiers"),
                  n = t[e].id;
                this.get("showcaseComponent").overrideSplashPath(
                  t[e].uncenteredSplashPath,
                ),
                  this.get("showcaseComponent").overrideSkinName(t[e].name),
                  this.get("showcaseComponent").overrideSplashVideoPath(
                    t[e].collectionSplashVideoPath,
                  ),
                  this.get("showcaseComponent").overrideAugments(
                    t[e].skinAugments?.augments,
                  ),
                  this.get("viewedCountBySkinId").hasOwnProperty(n)
                    ? this.get("viewedCountBySkinId")[n]++
                    : (this.get("viewedCountBySkinId")[n] = 1);
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
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "MUmNCH5P",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\tiered-transformations\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\tiered-transformations\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\tiered-transformations\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","tiered-transformations__container"],["flush-element"],["text","\\n  "],["open-element","hr",[]],["static-attr","class","tiered-transformations__bar"],["flush-element"],["close-element"],["text","\\n"],["block",["each"],[["get",["skinTiers"]]],null,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","tiered-transformations__item"],["flush-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["image ",["helper",["if"],[["get",["tier","ownership","owned"]]," obtained"],null]," ",["helper",["if"],[["helper",["eq"],[["get",["selectedSkinIndex"]],["get",["index"]]],null],"selected"],null]]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"tierClicked",["get",["index"]]],null],null],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"onMouseEnterTier",["get",["index"]]],null],null],["dynamic-attr","onmouseleave",["helper",["action"],[["get",[null]],"onMouseLeaveTier"],null],null],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":["tier","index"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(105);
        e.exports = s.Ember.Component.extend({
          classNames: ["rcp-fe-lol-champion-details-mastery-section"],
          layout: n(106),
          championMasteryService: s.Ember.inject.service("champion-mastery"),
          UXSettings: s.Ember.inject.service("ux-settings"),
          milestoneRewardsData: s.Ember.computed.alias(
            "championMasteryService.seasonMilestoneRequireAndRewards",
          ),
          currentMasteryData: s.Ember.computed.alias(
            "championMasteryService.currentChampionMasteryData",
          ),
          customRewards: s.Ember.computed.alias(
            "championMasteryService.customRewards",
          ),
          championCountByMilestone: s.Ember.computed.alias(
            "championMasteryService.championCountByMilestone",
          ),
          showInfoModal: !1,
          onInit: s.Ember.on("init", function () {
            s.Ember.run.scheduleOnce("afterRender", () =>
              this.sendAction("sectionLoaded", "mastery"),
            );
          }),
          milestoneProgressMap: s.Ember.computed(
            "currentMasteryData",
            "milestoneRewardsData",
            function () {
              const e = this.get("currentMasteryData"),
                t = this.get("milestoneRewardsData");
              if (!t || !Object.keys(t).length) return {};
              const n = this._getRequiredGradeOrDefault(e, t);
              return s.SharedChampionMasteryConstants.calculateGradeRequirements(
                e?.milestoneGrades || [],
                n,
              );
            },
          ),
          currentChampionMarks: s.Ember.computed(
            "currentMasteryData.tokensEarned",
            function () {
              return (
                this.get("currentMasteryData.tokensEarned") ||
                s.SharedChampionMasteryConstants.MINIMUM_MARKS
              );
            },
          ),
          marksRequired: s.Ember.computed(
            "currentMasteryData.markRequiredForNextLevel",
            function () {
              return (
                this.get("currentMasteryData.markRequiredForNextLevel") || 0
              );
            },
          ),
          shouldShowMarkCountContainer: s.Ember.computed(
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
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "XepgG/Gh",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\root\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\root\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\root\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["UXSettings","largeAreaAnimationsEnabled"]]],null,3],["open-element","div",[]],["static-attr","class","cdp-overview"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","crest-container"],["flush-element"],["text","\\n    "],["append",["helper",["mastery-crest-display"],null,[["masteryData","customRewards","masteryRewardData","isAnimationsEnabled"],[["get",["currentMasteryData"]],["get",["customRewards"]],["get",["milestoneRewardsData"]],["get",["UXSettings","largeAreaAnimationsEnabled"]]]]],false],["text","\\n"],["block",["if"],[["get",["shouldShowMarkCountContainer"]]],null,2],["text","    "],["open-element","div",[]],["static-attr","class","info-modal-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showInfoModal"],null],null],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","info-modal-icon"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","mastery-footer"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","footer-right"],["flush-element"],["text","\\n      "],["append",["helper",["milestone-track"],null,[["masteryRewardData","masteryData","customRewards","milestoneProgressMap","championCountByMilestone"],[["get",["milestoneRewardsData"]],["get",["currentMasteryData"]],["get",["customRewards"]],["get",["milestoneProgressMap"]],["get",["championCountByMilestone"]]]]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","footer-left"],["flush-element"],["text","\\n      "],["append",["helper",["milestone-requirements"],null,[["masteryRewardData","seasonalMilestoneLevel","milestoneProgressMap","customRewards"],[["get",["milestoneRewardsData"]],["get",["currentMasteryData","championSeasonMilestone"]],["get",["milestoneProgressMap"]],["get",["customRewards"]]]]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  \\n"],["close-element"],["text","\\n"],["block",["if"],[["get",["showInfoModal"]]],null,0],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["mastery-info-modal"],null,[["masteryRewardData","customRewards","closedModal"],[["get",["milestoneRewardsData"]],["get",["customRewards"]],["helper",["action"],[["get",[null]],"closeInfoModal"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["static-attr","class","mark-count-container-tooltip"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","mark-tooltip-text"],["flush-element"],["text","\\n              "],["append",["unknown",["tra","cdp_mark_container_tooltip"]],false],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","mark-count-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","mark-icon"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","mark-count"],["flush-element"],["text","x "],["append",["unknown",["currentChampionMarks"]],false],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],1],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","uikit-video",[]],["static-attr","class","cdp-background-video"],["static-attr","src","/fe/lol-static-assets/videos/champion-mastery/cm-background-loop.webm"],["static-attr","loop",""],["static-attr","preload",""],["static-attr","autoplay",""],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(108),
          (e.exports = s.Ember.Component.extend({
            classNames: ["mastery-section-crest-display"],
            layout: n(109),
            masteryData: {},
            masteryRewardData: {},
            customRewards: [],
            isAnimationsEnabled: !0,
            locale: s.Ember.computed("tra.metadata.locale.id", function () {
              return (this.get("tra.metadata.locale.id") || "en_US").replace(
                "_",
                "-",
              );
            }),
            formatter: s.Ember.computed("locale", function () {
              return Intl.NumberFormat(this.get("locale")?.toLowerCase(), {
                numberingSystem: "latn",
              });
            }),
            milestoneLevel: s.Ember.computed.alias(
              "masteryData.championSeasonMilestone",
            ),
            masteryLevel: s.Ember.computed(
              "masteryData.championLevel",
              function () {
                return (
                  this.get("masteryData.championLevel") ||
                  s.SharedChampionMasteryConstants.MINIMUM_MASTERY_LEVEL
                );
              },
            ),
            currentMilestoneRequirements: s.Ember.computed(
              "milestoneLevel",
              "seasonMilestoneRequireAndRewards",
              function () {
                const e = this.get("milestoneLevel"),
                  t = this.get("seasonMilestoneRequireAndRewards");
                return e && t ? t[e] : {};
              },
            ),
            isAuroraEnabled: s.Ember.computed(
              "customRewards",
              "milestoneLevel",
              function () {
                return (
                  this.get("milestoneLevel") >=
                  (
                    (this.get("customRewards") || []).find(
                      (e) =>
                        e.type ===
                          s.SharedChampionMasteryConstants.MASTERY_LEVEL_TYPES
                            .MILESTONE &&
                        e.rewardValue ===
                          s.SharedChampionMasteryConstants.MASTERY_REWARD_TYPES
                            .AURORA,
                    ) || {}
                  ).level
                );
              },
            ),
            masterylevelText: s.Ember.computed("masteryLevel", function () {
              const e = this.get("masteryLevel");
              return this.get("tra").formatString("cdp_mastery_mastery_level", {
                level: e,
              });
            }),
            currentPoints: s.Ember.computed(
              "masteryData.championPoints",
              function () {
                return this.get("masteryData.championPoints");
              },
            ),
            currentThreshold: s.Ember.computed(
              "masteryData.championPoints",
              "masteryData.championPointsSinceLastLevel",
              function () {
                return (
                  this.get("masteryData.championPoints") -
                  this.get("masteryData.championPointsSinceLastLevel")
                );
              },
            ),
            nextThreshold: s.Ember.computed(
              "masteryData.championPoints",
              "masteryData.championPointsUntilNextLevel",
              function () {
                const e =
                    this.get("masteryData.championPointsUntilNextLevel") || 0,
                  t = this.get("masteryData.championPoints") || 0;
                return Math.abs(t + e);
              },
            ),
            currentPointsDisplayText: s.Ember.computed(
              "currentPoints",
              "locale",
              function () {
                const e = this.get("currentPoints") || 0;
                return this.get("formatter")?.format(e);
              },
            ),
            nextThresholdDisplayText: s.Ember.computed(
              "nextThreshold",
              "locale",
              function () {
                const e = this.get("nextThreshold") || 0;
                return this.get("formatter")?.format(e);
              },
            ),
            marksRequired: s.Ember.computed(
              "masteryData.markRequiredForNextLevel",
              function () {
                return this.get("masteryData.markRequiredForNextLevel") || 0;
              },
            ),
            marksDisplayList: s.Ember.computed(
              "marksRequired",
              "masteryData.tokensEarned",
              function () {
                const e = this.get("masteryData.tokensEarned") || 0,
                  t = this.get("marksRequired"),
                  n = [];
                let s = e;
                for (let e = 0; e < t; e++) n.push({ isCompleted: s-- > 0 });
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
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "ldGGClFf",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\crest-display\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\crest-display\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\crest-display\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","crest-image"],["flush-element"],["text","\\n  "],["append",["helper",["mastery-crest"],null,[["masteryLevel","isAuroraEnabled","isLevelPlateEnabled","isAnimationsEnabled"],[["get",["masteryLevel"]],["get",["isAuroraEnabled"]],true,["get",["isAnimationsEnabled"]]]]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","mastery-info-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","mastery-level"],["flush-element"],["append",["unknown",["masterylevelText"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","mastery-xp-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","mastery-current-xp"],["flush-element"],["append",["unknown",["currentPointsDisplayText"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","mastery-next-xp"],["flush-element"],["text","/"],["append",["unknown",["nextThresholdDisplayText"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","mastery-marks-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","marks-hover-area"],["flush-element"],["text","\\n"],["block",["each"],[["get",["marksDisplayList"]]],null,1],["block",["uikit-tooltip"],null,[["tooltipPosition","offsetX"],["right",10]],0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","class","marks-hover-area-tooltip"],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","marks-hover-area-tooltip-desc"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","cdp_marks_required_tooltip"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["mark-icon ",["helper",["if"],[["get",["mark","isCompleted"]],"completed"],null]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["mark"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(111),
          (e.exports = s.Ember.Component.extend({
            layout: n(112),
            masteryRewardData: null,
            customRewards: [],
            milestoneRewardList: s.Ember.computed(
              "tra",
              "masteryRewardData",
              "customRewards",
              function () {
                const e = this.get("masteryRewardData"),
                  t = this.get("customRewards"),
                  n = this.get("tra");
                if (!e || !n) return [];
                const o = [];
                for (const [i, a] of Object.entries(e))
                  o.push({
                    milestoneText: this.generateMilestoneText(a.bonus, i),
                    rewards:
                      s.SharedChampionMasteryConstants.generateMilestoneRewards(
                        n,
                        i,
                        a,
                        t,
                      ),
                  });
                return o;
              },
            ),
            generateMilestoneText(e, t = "0") {
              const n = this.get("tra");
              if (e) return n.get("cdp_info_modal_bonus_milestones");
              {
                const e =
                  s.SharedChampionMasteryConstants.convertNumberToRoman(t);
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
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "RqbsJFVy",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\info-modal\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\info-modal\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\info-modal\\\\index.js\\" "],["text","\\n\\n\\n"],["block",["uikit-modal"],null,[["show","primaryButton","dismissible","okText","type","dismissibleType","onClose"],["true",true,true,["get",["tra","cdp_info_modal_okay_botton"]],"DialogAlert","inside",["get",["closedModal"]]]],2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                            "],["open-element","div",[]],["static-attr","class","reward-boarder"],["flush-element"],["text","\\n                                "],["open-element","img",[]],["dynamic-attr","class",["concat",["reward-image ",["unknown",["reward","rewardType"]]]]],["dynamic-attr","src",["concat",[["unknown",["reward","iconPath"]]]]],["flush-element"],["close-element"],["text","\\n                                "],["open-element","div",[]],["static-attr","class","reward-amount-text"],["flush-element"],["append",["unknown",["reward","rewardQuantityString"]],false],["close-element"],["text","\\n                            "],["close-element"],["text","\\n"]],"locals":["reward"]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","rewards-container-row"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","milestone-text"],["flush-element"],["append",["unknown",["data","milestoneText"]],false],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","reward-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["data","rewards"]]],null,0],["text","                    "],["close-element"],["text","\\n                "],["close-element"],["text","\\n"]],"locals":["data"]},{"statements":[["open-element","div",[]],["static-attr","class","cdp-info-modal"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","header-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","title-flare"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","modal-title main"],["flush-element"],["append",["unknown",["tra","cdp_info_modal_title"]],false],["close-element"],["text","\\n         "],["open-element","div",[]],["static-attr","class","title-flare reverse"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","info-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","rewards-container"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","modal-title"],["flush-element"],["append",["unknown",["tra","cdp_info_modal_reward_title"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["milestoneRewardList"]]],null,1],["text","        "],["close-element"],["text","\\n\\n        "],["open-element","div",[]],["static-attr","class","how-it-works-container"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","modal-title"],["flush-element"],["append",["unknown",["tra","cdp_info_modal_how_title"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","how-description main"],["flush-element"],["append",["unknown",["tra","cdp_info_modal_how_description"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","how-container"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","how-row"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","how-icon mastery"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","how-description"],["flush-element"],["append",["unknown",["tra","cdp_info_modal_how_mastery_description"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","how-row"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","how-icon mark"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","how-description"],["flush-element"],["append",["unknown",["tra","cdp_info_modal_how_mark_description"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","how-row"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","how-icon level-up"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","how-description"],["flush-element"],["append",["unknown",["tra","cdp_info_modal_how_levelup_description"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","how-row"],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","how-icon champion-title"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","how-description"],["flush-element"],["append",["unknown",["tra","cdp_info_modal_how_champion_title_description"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","how-description"],["flush-element"],["append",["unknown",["tra","cdp_info_modal_how_footer_description"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(114),
          (e.exports = s.Ember.Component.extend({
            classNames: ["mastery-section-milestone-progress"],
            layout: n(115),
            masteryData: {},
            currentPoints: s.Ember.computed.alias(
              "masteryData.championSeasonPoints",
            ),
            nextPoints: s.Ember.computed.alias(
              "masteryData.championPointsRequiredForNextSeasonMilestone",
            ),
            pointsTxt: s.Ember.computed(
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
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "6HphMdHi",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\milestone-progress\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\milestone-progress\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\milestone-progress\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","mastery-milestone-points-container"],["flush-element"],["text","\\n  "],["append",["unknown",["pointsTxt"]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(117);
        e.exports = s.Ember.Component.extend({
          classNames: ["mastery-footer-milestone-track"],
          layout: n(118),
          masteryRewardData: {},
          masteryData: {},
          milestoneProgressMap: {},
          customRewards: [],
          championCountByMilestone: {},
          hasRewardData: s.Ember.computed.notEmpty("masteryRewardData"),
          shouldShowBonusMilestone: s.Ember.computed.gte(
            "masteryData.championSeasonMilestone",
            s.SharedChampionMasteryConstants.BONUS_MILESTONE_THRESHOLD,
          ),
          currentMilestoneLevel: s.Ember.computed.alias(
            "masteryData.championSeasonMilestone",
          ),
          milestoneList: s.Ember.computed(
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
                o = this.get("championCountByMilestone"),
                i = this.get("masteryData"),
                a = i
                  ? i.championSeasonMilestone
                  : s.SharedChampionMasteryConstants
                      .MINIMUM_MASTERY_MILESTONE_LEVEL,
                l = [],
                r = { 0: {}, ...e };
              return (
                Object.entries(r).forEach(([e, i]) => {
                  if (!i.bonus) {
                    const r = Number(e),
                      c = this._generateProgressMapForMilestone(i, a, r),
                      u =
                        r ===
                        s.SharedChampionMasteryConstants
                          .MINIMUM_MASTERY_MILESTONE_LEVEL +
                          1
                          ? 94
                          : 136,
                      p = a >= r;
                    l.push({
                      seasonMilestone: r,
                      rewardsInMilestone:
                        s.SharedChampionMasteryConstants.generateMilestoneRewards(
                          t,
                          r,
                          i,
                          n,
                          o,
                        ),
                      milestoneProgressMap: c,
                      milestoneRomanDisplay: `${s.SharedChampionMasteryConstants.convertNumberToRoman(e)}`,
                      milestoneProgressCssPercent:
                        this._calculateMilestoneProgress(c) * (u / 100),
                      isCompleted: p,
                      isMinimumMilestone:
                        r ===
                        s.SharedChampionMasteryConstants
                          .MINIMUM_MASTERY_MILESTONE_LEVEL,
                      progressBarWidth: u,
                    });
                  }
                }),
                l
              );
            },
          ),
          bonusMilestone: s.Ember.computed(
            "shouldShowBonusMilestone",
            "masteryRewardData",
            "masteryData",
            function () {
              const e = this.get("shouldShowBonusMilestone"),
                t = this.get("masteryRewardData");
              if (!e || !t) return {};
              const n = Object.values(t).find((e) => e.bonus) || {},
                o = this.get("masteryData.championSeasonMilestone") || 0;
              return {
                iconPath:
                  s.SharedChampionMasteryConstants.REWARD_TO_ASSET_PATH.MARK,
                rewardString: n.rewardMarks > 1 ? `x${n.rewardMarks}` : "",
                completedCount: Math.abs(
                  s.SharedChampionMasteryConstants.BONUS_MILESTONE_THRESHOLD -
                    o,
                ),
              };
            },
          ),
          bonusMilestoneNextLevel: s.Ember.computed(
            "currentMilestoneLevel",
            function () {
              return (
                (this.get("currentMilestoneLevel") ||
                  s.SharedChampionMasteryConstants
                    .MINIMUM_MASTERY_MILESTONE_LEVEL) + 1
              );
            },
          ),
          _generateProgressMapForMilestone(e, t, n) {
            const s = t + 1 === n,
              o = t >= n,
              { requireGradeCounts: i } = e;
            return s
              ? this.get("milestoneProgressMap")
              : this._generateGradeCompletionMap(i, o);
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
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "PnYxqgfR",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\progression-footer\\\\milestone-track\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\progression-footer\\\\milestone-track\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\progression-footer\\\\milestone-track\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["hasRewardData"]]],null,10]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                  "],["append",["helper",["milestone-tooltip"],null,[["masteryRewardData","customRewards","milestoneProgressMap","seasonMilestone","showNextMilestoneRewards","championCountByMilestone"],[["get",["masteryRewardData"]],["get",["customRewards"]],["get",["milestone","milestoneProgressMap"]],["get",["milestone","seasonMilestone"]],false,["get",["championCountByMilestone"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                          "],["open-element","div",[]],["static-attr","class","completed-overlay"],["flush-element"],["close-element"],["text","\\n                          "],["open-element","img",[]],["static-attr","class","completed-check-pip"],["static-attr","src","/fe/lol-static-assets/images/champion-mastery/reward-completed.png"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                      "],["open-element","div",[]],["dynamic-attr","class",["concat",["reward-boarder ",["helper",["if"],[["get",["milestone","isCompleted"]],"completed"],null]]]],["flush-element"],["text","\\n                        "],["open-element","img",[]],["dynamic-attr","class",["concat",["reward-image ",["unknown",["reward","rewardType"]]]]],["dynamic-attr","src",["concat",[["unknown",["reward","iconPath"]]]]],["flush-element"],["close-element"],["text","\\n                        "],["open-element","div",[]],["static-attr","class","reward-amount-text"],["flush-element"],["append",["unknown",["reward","rewardQuantityString"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["milestone","isCompleted"]]],null,1],["text","                      "],["close-element"],["text","\\n"]],"locals":["reward"]},{"statements":[["text","                  "],["open-element","div",[]],["static-attr","class","reward-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["milestone","rewardsInMilestone"]]],null,2],["text","                  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","milestone-progress-bar"],["flush-element"],["text","\\n                "],["open-element","svg",[]],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["dynamic-attr","width",["concat",[["unknown",["milestone","progressBarWidth"]]]]],["static-attr","height","8"],["dynamic-attr","viewBox",["concat",["0 0 ",["unknown",["milestone","progressBarWidth"]]," 8"]]],["static-attr","fill","none"],["flush-element"],["text","\\n                    "],["open-element","rect",[]],["static-attr","opacity","0.5"],["static-attr","x","0"],["static-attr","y","0.5"],["dynamic-attr","width",["concat",[["unknown",["milestone","progressBarWidth"]]]]],["static-attr","height","7"],["static-attr","stroke","#010A13"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","rect",[]],["static-attr","x","0"],["static-attr","y","1"],["dynamic-attr","width",["concat",[["unknown",["milestone","progressBarWidth"]]]]],["static-attr","height","6"],["static-attr","fill","#1E2328"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","rect",[]],["static-attr","opacity","0.3"],["static-attr","x","2"],["static-attr","y","2"],["dynamic-attr","width",["concat",[["unknown",["milestone","progressBarWidth"]]]]],["static-attr","height","4"],["static-attr","stroke","#010A13"],["static-attr","stroke-width","2"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","rect",[]],["static-attr","x","0"],["static-attr","y","1.5"],["dynamic-attr","width",["concat",[["unknown",["milestone","progressBarWidth"]]]]],["static-attr","height","5"],["static-attr","stroke","#3C3C41"],["flush-element"],["close-element"],["text","\\n                    "],["open-element","rect",[]],["static-attr","x","0"],["static-attr","y","3"],["dynamic-attr","width",["concat",[["unknown",["milestone","milestoneProgressCssPercent"]]]]],["static-attr","height","2"],["static-attr","fill","#0A96AA"],["flush-element"],["close-element"],["text","\\n                "],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","milestone-container"],["flush-element"],["text","\\n                "],["open-element","div",[]],["dynamic-attr","class",["concat",["milestone-plate ",["helper",["if"],[["get",["milestone","isCompleted"]],"completed"],null]]]],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["dynamic-attr","class",["concat",["milestone-background ",["helper",["if"],[["get",["milestone","isCompleted"]],"completed"],null]]]],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["dynamic-attr","class",["concat",["milestone-text ",["helper",["if"],[["get",["milestone","isCompleted"]],"completed"],null]]]],["flush-element"],["append",["unknown",["milestone","milestoneRomanDisplay"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["milestone","rewardsInMilestone"]]],null,3],["block",["uikit-tooltip"],null,[["type","tooltipPosition","offsetY"],["system","top",-65]],0],["text","            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","starting-milestone"],["flush-element"],["text","\\n                  "],["open-element","svg",[]],["static-attr","class","reward-star-icon"],["static-attr","width","12"],["static-attr","height","11"],["static-attr","viewBox","0 0 12 11"],["static-attr","fill","none"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["flush-element"],["text","\\n                  "],["open-element","path",[]],["static-attr","d","M5.9999 0.400024L7.5999 4.40002H11.5999L8.3999 6.80002L9.2915 10.8L5.9999 8.40002L2.70831 10.8L3.5999 6.80002L0.399902 4.40002H4.3999L5.9999 0.400024Z"],["flush-element"],["close-element"],["text","\\n                  "],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["milestone","isMinimumMilestone"]]],null,5,4]],"locals":["milestone"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","milestone-progress-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["milestoneList"]]],null,6],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["milestone-tooltip"],null,[["masteryRewardData","customRewards","milestoneProgressMap","seasonMilestone"],[["get",["masteryRewardData"]],["get",["customRewards"]],["get",["milestoneProgressMap"]],["get",["bonusMilestoneNextLevel"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","bonus-milestone-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","reward-boarder"],["flush-element"],["text","\\n          "],["open-element","img",[]],["static-attr","class","reward-image"],["dynamic-attr","src",["concat",[["unknown",["bonusMilestone","iconPath"]]]]],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","bonus-milestone-counter"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","bonus-milestone-pill"],["flush-element"],["text","\\n              "],["open-element","svg",[]],["static-attr","class","repeatable-arrow"],["static-attr","viewBox","0 0 10 7"],["flush-element"],["text","\\n                  "],["open-element","path",[]],["static-attr","class","repeatable-arrow path"],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M6.38908 1.77185V0.399902L3.9833 2.31037L6.38956 4.22084V2.85168C6.81026 2.85942 7.21055 3.02847 7.50237 3.32164C7.79419 3.61481 7.95364 4.00809 7.94565 4.41496C7.93765 4.82183 7.76286 5.20897 7.45972 5.4912C7.15659 5.77343 6.74995 5.92765 6.32925 5.91991H3.33337C2.91248 5.91991 2.50883 5.75821 2.21121 5.47037C1.9136 5.18254 1.7464 4.79215 1.7464 4.3851C1.7464 3.97804 1.9136 3.58765 2.21121 3.29982C2.50883 3.01199 2.91248 2.85028 3.33337 2.85028V1.77045C2.61636 1.77045 1.92872 2.04593 1.42171 2.53627C0.914713 3.02661 0.629883 3.69165 0.629883 4.3851C0.629883 5.07854 0.914713 5.74359 1.42171 6.23393C1.92872 6.72427 2.61636 6.99974 3.33337 6.99974H6.32925C6.68409 7.00357 7.03623 6.93977 7.36557 6.81198C7.69491 6.68419 7.995 6.49492 8.24871 6.25496C8.50242 6.01501 8.70477 5.72907 8.84422 5.41349C8.98367 5.0979 9.05748 4.75884 9.06144 4.41566C9.0654 4.07249 8.99943 3.73192 8.8673 3.4134C8.73517 3.09488 8.53947 2.80465 8.29136 2.55928C8.04325 2.31391 7.7476 2.1182 7.42129 1.98334C7.09498 1.84847 6.7444 1.77708 6.38956 1.77325L6.38908 1.77185Z"],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","count"],["flush-element"],["append",["unknown",["bonusMilestone","completedCount"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition","offsetY"],["system","top",-10]],8],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text"," \\n"],["block",["if"],[["get",["shouldShowBonusMilestone"]]],null,9,7]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        n(120),
          (e.exports = s.Ember.Component.extend({
            classNames: ["mastery-footer-milestone-requirements"],
            layout: n(121),
            masteryRewardData: {},
            customRewards: [],
            seasonalMilestoneLevel: null,
            milestoneProgressMap: null,
            milestoneLevelText: s.Ember.computed(
              "seasonalMilestoneLevel",
              "tra",
              function () {
                const e =
                  this.get("seasonalMilestoneLevel") ||
                  s.SharedChampionMasteryConstants
                    .MINIMUM_MASTERY_MILESTONE_LEVEL;
                if (
                  e ===
                  s.SharedChampionMasteryConstants
                    .MINIMUM_MASTERY_MILESTONE_LEVEL
                )
                  return this.get("tra").get("cdp_minimum_milestone");
                if (
                  e >=
                  s.SharedChampionMasteryConstants.BONUS_MILESTONE_THRESHOLD
                )
                  return this.get("tra").get("cdp_bonus_milestone");
                {
                  const t =
                    s.SharedChampionMasteryConstants.convertNumberToRoman(e);
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
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "sHPTglyB",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\progression-footer\\\\milestone-requirements\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\progression-footer\\\\milestone-requirements\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\progression-footer\\\\milestone-requirements\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","milestone-season-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","milestone-level-text"],["flush-element"],["append",["unknown",["milestoneLevelText"]],false],["close-element"],["text","\\n    "],["append",["unknown",["season-info"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","grade-tooltip-area"],["flush-element"],["text","\\n    "],["append",["helper",["grade-display"],null,[["milestoneProgressMap"],[["get",["milestoneProgressMap"]]]]],false],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["milestone-tooltip"],null,[["masteryRewardData","milestoneProgressMap","seasonMilestone","customRewards","hideTitle","hideNextLevelRewards"],[["get",["masteryRewardData"]],["get",["milestoneProgressMap"]],["get",["seasonalMilestoneLevel"]],["get",["customRewards"]],true,true]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1),
          o = n(123);
        n(124),
          (e.exports = s.Ember.Component.extend({
            classNames: ["mastery-footer-season-info"],
            layout: n(125),
            championMasteryService: s.Ember.inject.service("champion-mastery"),
            currentSeason: s.Ember.computed.readOnly(
              "championMasteryService.currentSeason",
            ),
            hasSeasonData: s.Ember.computed.notEmpty("currentSeason"),
            seasonInfo: s.Ember.computed("tra", "currentSeason", function () {
              const e = this.get("currentSeason");
              if (e) {
                const { seasonEnd: t } = e,
                  { currentSplit: n } = e.metadata,
                  s = this.get("tra").formatString("cdp_season_split_string", {
                    splitNumber: n,
                  }),
                  { datePortionText: i = "", timePortionText: a = "" } = (0,
                  o.convertDateStringToFullDisplayFormat)(t, this.get("tra"));
                return {
                  splitNumberTra: s,
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
            const s = n((t && t.metadata.locale.id) || void 0),
              o = new Date(e),
              i = o.toLocaleDateString(s, { dateStyle: "medium" }),
              a = o.toLocaleTimeString(s, {
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
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "zRZZiv1j",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\progression-footer\\\\season-info\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\progression-footer\\\\season-info\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\mastery-section\\\\progression-footer\\\\season-info\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["hasSeasonData"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["static-attr","padding","small"],["static-attr","class","season-info-tooltip"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","season-tooltip-text title"],["flush-element"],["append",["unknown",["tra","cdp_season_split_tooltip_title"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","season-tooltip-text data-time"],["flush-element"],["append",["unknown",["seasonInfo","seasonEndTra"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","season-tooltip-text description"],["flush-element"],["append",["unknown",["tra","cdp_season_split_tooltip_description"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","season-split-text"],["flush-element"],["append",["unknown",["seasonInfo","splitNumberTra"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","season-clock"],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","left"]],0]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        const o = "/lol-store",
          i = "v1/catalog/sales",
          a = s.DataBinding.bindTo((0, s.getProvider)().getSocket());
        e.exports = s.Ember.Service.extend({
          init: function () {
            this._super(...arguments),
              this.set("salesData", []),
              this.observeSalesData();
          },
          willDestroy() {
            this._super(...arguments), a.removeObserver(`${o}/${i}`, this);
          },
          observeSalesData: function () {
            a.observe(`${o}/${i}`, this, (e) => {
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
        var s = n(1),
          o = n(59),
          i = n(95),
          a = n(41);
        const l = (0, s.EmberDataBinding)({
          Ember: s.Ember,
          websocket: (0, s.getProvider)().getSocket(),
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
        e.exports = s.Ember.Service.extend(l, {
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
            s.Router.navigateTo("rcp-fe-lol-store", {
              items: [{ inventoryType: "CHAMPION", itemId: e }],
              page: "champions",
            }).then(() => {
              this.get("destroyComponent")();
            });
          },
          openStoreForSkin(e) {
            s.Router.navigateTo("rcp-fe-lol-store", {
              items: [{ inventoryType: "CHAMPION_SKIN", itemId: e }],
              page: "skins",
            }).then(() => {
              this.get("destroyComponent")();
            });
          },
          openPawChampionModal(e) {
            s.PawPlugin.createPAWModal(
              { itemId: e, inventoryType: a.PAW.INVENTORY_TYPES.CHAMPION },
              o.CDP_PAW_ID,
              a.PAW.MODAL_TYPES.CHAMPION_MODAL,
              this.element,
            );
          },
          openPawTemplateModal(e) {
            const t = {
              templateType: a.PAW.TEMPLATE_TYPES.LARGE_TWO_COLUMN_LANDSCAPE,
            };
            s.PawPlugin.createPawTemplateModalAsync(
              e.offerId,
              t,
              o.CDP_PAW_ID,
            ).then(() => {
              s.PawPlugin.getBaseSkinLineData(e.offerId).then((e) => {
                s.PawPlugin.populatePawTemplateModal(e);
              });
            });
          },
          openPawSkinModal(e) {
            s.PawPlugin.createPAWModal(
              { itemId: e, inventoryType: a.PAW.INVENTORY_TYPES.CHAMPION_SKIN },
              o.CDP_PAW_ID,
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
        var s = n(1);
        const o = (0, s.EmberDataBinding)({
          Ember: s.Ember,
          websocket: (0, s.getProvider)().getSocket(),
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
        e.exports = s.Ember.Service.extend(o, {
          championService: s.Ember.inject.service("champion"),
          champion: s.Ember.computed.alias("championService.champion"),
          localPlayerPuuid: s.Ember.computed.alias("localSummonerData.puuid"),
          currentChampionMasteries: s.Ember.computed(
            "championMasteryInfo",
            "champion",
            function () {
              const e = this.get("championMasteryInfo"),
                t = this.get("champion");
              if (!e || !t) return null;
              for (let n = 0; n < e.length; n++) {
                const s = e.objectAt(n);
                if (s.championId === t.id) return s;
              }
            },
          ),
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1),
          o = n(59),
          i = n(63);
        const a = "/lol-statstones",
          l = "v2/player-statstones-self",
          r = "v1/featured-champion-statstones";
        e.exports = s.Ember.Service.extend({
          championService: s.Ember.inject.service("champion"),
          championId: s.Ember.computed.alias("championService.championId"),
          milestoneCompletionLevel: o.MILESTONE_COMPLETION_LEVEL,
          statstoneData: null,
          featuredStatstones: null,
          packItemIdToContainingPackItemId: null,
          init: function () {
            this._super(...arguments),
              (this.binding = s.DataBinding.bindTo(
                (0, s.getProvider)().getSocket(),
              )),
              this.initDataBindings();
          },
          willDestroy() {
            this._super(...arguments);
            const e = this.get("championId");
            this.binding.removeObserver(`${a}/${l}/${e}`, this),
              this.binding.removeObserver(`${a}/${r}/${e}`, this),
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
                .get(`${a}/${l}/${e}`, { skipCache: !0 })
                .then((e) => {
                  this.set("statstoneData", e);
                });
          },
          initFeaturedData: function () {
            const e = this.get("championId");
            if (e)
              return this.binding
                .get(`${a}/${r}/${e}`, { skipCache: !0 })
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
              this.binding.observe(`${a}/${l}/${e}`, this, (e) => {
                this.set("statstoneData", e), this.initFeaturedData();
              });
          },
          observeFeaturedStatstones: function () {
            const e = this.get("championId");
            e &&
              this.binding.observe(`${a}/${r}/${e}`, this, (e) => {
                this.set("featuredStatstones", e);
              });
          },
          setFeaturedStatstone(e, t, n) {
            const o = { index: n, existingFeatured: e };
            return (
              this.binding
                .get("/lol-summoner/v1/current-summoner")
                .then((e) => {
                  const o = {
                    puuid: e.puuid,
                    statstoneId: t.statstoneId,
                    index: n,
                    type: "eternal_featured",
                  };
                  s.Telemetry.sendCustomData("eternals_telemetry_event", o);
                }),
              this.binding.post(
                `${a}/${r}/${t.boundChampionItemId}/${t.statstoneId}`,
                o,
              )
            );
          },
          stripRarityFromCategory(e) {
            const t = e.indexOf("_");
            return -1 !== t && (e = e.substring(0, t)), e;
          },
          isMilestonesCompleted: (e) => e >= o.MILESTONE_COMPLETION_LEVEL,
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
            return e ? o.UNIQUE_NAME : o.COMMON_NAME;
          },
          getContainingPackItemId: function (e) {
            const t = this.get("packItemIdToContainingPackItemId")[e];
            return t ? t[0] : null;
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        e.exports = s.Ember.Service.extend({
          largeAreaAnimationsEnabled: s.Ember.computed.alias(
            "UXSettings.largeAreaAnimationsEnabled",
          ),
          onInit: s.Ember.on("init", function () {
            (this._uxSettingsListener = this._uxSettingsObserver.bind(this)),
              s.UXSettings.addObserver(this._uxSettingsListener);
          }),
          onWillDestroy: s.Ember.on("willDestroy", function () {
            s.UXSettings.removeObserver(this._uxSettingsListener);
          }),
          _uxSettingsObserver: function (e) {
            this.set("UXSettings", e);
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        const o = [
          {
            name: "tieredSkins",
            path: "lol.client_settings.tieredSkins",
            default: {},
          },
        ];
        e.exports = s.Ember.Service.extend({
          init: function () {
            this._super(...arguments),
              (this.clientConfigDataBinding = (0, s.DataBinding)(
                "/lol-client-config",
                s.socket,
              )),
              o.forEach((e) => {
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
              o.forEach((e) => {
                const t = `v3/client-config/${e.path}`;
                this.clientConfigDataBinding.unobserve(t, this);
              });
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        const o = "v1/skins";
        e.exports = s.Ember.Service.extend({
          init: function () {
            this._super(...arguments),
              (this.eventHubDataBinding = (0, s.DataBinding)(
                "/lol-event-hub",
                s.socket,
              )),
              this.eventHubDataBinding.observe(o, this, (e) => {
                this.set("skinsFromActiveEvents", e);
              });
          },
          willDestroy() {
            this._super(...arguments),
              this.eventHubDataBinding.unobserve(o, this);
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1);
        const o = (0, s.EmberDataBinding)({
          Ember: s.Ember,
          websocket: (0, s.getProvider)().getSocket(),
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
        e.exports = s.Ember.Service.extend(o, {
          championService: s.Ember.inject.service("champion"),
          championId: s.Ember.computed.alias("championService.championId"),
          championMasteries: s.Ember.computed.alias(
            "championMasteryInfo.championMasteries",
          ),
          seasonMilestoneRequireAndRewards: s.Ember.computed.alias(
            "championMasteryInfo.seasonMilestoneRequireAndRewards",
          ),
          defaultChampionMasteryData: s.Ember.computed.alias(
            "championMasteryInfo.defaultChampionMastery",
          ),
          customRewards: s.Ember.computed.alias(
            "championMasteryInfo.customRewards",
          ),
          championCountByMilestone: s.Ember.computed.alias(
            "championMasteryInfo.championCountByMilestone",
          ),
          currentChampionMasteryData: s.Ember.computed(
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
          currentSeason: s.Ember.computed("currentLoLSeason", function () {
            return this.get("currentLoLSeason");
          }),
        });
      },
      (e, t, n) => {
        "use strict";
        var s = n(1),
          o = n(63);
        n(135),
          (e.exports = s.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-featured-statstones"],
            layout: n(136),
            statstonesService: s.Ember.inject.service("statstones"),
            featured: null,
            selection: null,
            caller: null,
            featuredStatstones: s.Ember.computed.alias("featured"),
            selectedStatsone: s.Ember.computed.alias("selection"),
            createFeatureErrorToast() {
              const e = s.TemplateHelper.contentBlockNotification(
                this.get("tra.cdp_progression_statstones_feature_error"),
                "lol-eternals-feature-failure",
              );
              s.ToastManager.add({
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
                  o.SFX.buttonGoldClick.play(),
                  this.get("statstonesService")
                    .setFeaturedStatstone(n, t, e)
                    .catch((e) => {
                      this.createFeatureErrorToast();
                    })
                    .finally(() => {
                      s.FlyoutManager.sendEvent(i, "hide");
                    })
                );
              },
              mouseOver() {
                o.SFX.gridHover.play();
              },
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "icUZ2HI6",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\feature-flyout\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\feature-flyout\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\feature-flyout\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-dialog-frame",[]],["static-attr","class","cdp-feature-flyout"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","class","cdp-feature-flyout-content"],["flush-element"],["text","\\n  "],["open-element","h5",[]],["static-attr","class","cdp-feature-flyout-title"],["flush-element"],["append",["unknown",["tra","cdp_statstones_feature_title"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["featuredStatstones"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","cdp-feature-flyout-item"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"setFeatured",["get",["index"]]],null],null],["dynamic-attr","onmouseover",["helper",["action"],[["get",[null]],"mouseOver"],null],null],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-feature-flyout-statstone-image"],["flush-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","cdp-feature-flyout-statstone-statue"],["dynamic-attr","src",["unknown",["statstone","imageUrl"]],null],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-feature-flyout-featured"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-feature-flyout-statstone-info"],["flush-element"],["text","\\n        "],["open-element","h5",[]],["static-attr","class","cdp-feature-flyout-statstone-value"],["flush-element"],["append",["unknown",["statstone","formattedValue"]],false],["close-element"],["text","\\n        "],["open-element","p",[]],["static-attr","class","cdp-feature-flyout-statstone-name"],["flush-element"],["append",["unknown",["statstone","name"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-feature-flyout-statstone-slot-numbner"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["statstone","index"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var s = n(1),
          o = n(63);
        n(138);
        const i = s.UIKit.getFlyoutManager();
        var a = s.Ember.Component.extend({
          classNames: ["quest-forms-flyout"],
          isShow: !1,
          layout: n(139),
          selectedSkinIndex: s.Ember.computed.alias(
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
              o.SFX.gridClick.play();
              const t = this.get("caller");
              i.sendEvent(t, "hide"),
                this.get("showcaseComponent").setSelectedQuestForm(e),
                this.get("showcaseComponent").hideFlyoutModal();
            },
            onMouseEnterTier(e) {
              this.overrideTargetSplashPath(e), o.SFX.gridHover.play();
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
        const s = n(1).Ember;
        e.exports = s.HTMLBars.template({
          id: "wgfALo60",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\quest-forms-popup\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\quest-forms-popup\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_13\\\\LeagueClientContent_Release\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\quest-forms-popup\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["quest-forms ",["helper",["if"],[["get",["isTieredSkin"]],"tiered"],null]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["skinTiers"]]],null,4],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","span",[]],["static-attr","class","quest-form-tier-lock"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","span",[]],["static-attr","class","quest-form-tier-number"],["flush-element"],["append",["helper",["concat-tra"],["cdp_skins_quest_form_stage_",["get",["tier","stage"]]],null],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["tier","ownership","owned"]]],null,1,0]],"locals":[]},{"statements":[["text","            "],["open-element","span",[]],["static-attr","class","quest-form-tier-emblem"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["quest-form-tier form-",["get",["index"]],"  ",["helper",["if"],[["helper",["eq"],[["get",["selectedSkinIndex"]],["get",["index"]]],null],"selected"],null]," ",["helper",["if"],[["get",["tier","ownership","owned"]],"unlocked"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"tierClicked",["get",["index"]]],null],null],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"onMouseEnterTier",["get",["index"]]],null],null],["dynamic-attr","onmouseleave",["helper",["action"],[["get",[null]],"onMouseLeaveTier"],null],null],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","quest-form-tier-name"],["flush-element"],["append",["unknown",["tier","shortName"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["isTieredSkin"]]],null,3,2],["text","      "],["close-element"],["text","\\n"]],"locals":["tier","index"]}],"hasPartials":false}',
          meta: {},
        });
      },
    ],
    t = {};
  function n(s) {
    var o = t[s];
    if (void 0 !== o) return o.exports;
    var i = (t[s] = { id: s, loaded: !1, exports: {} });
    return e[s].call(i.exports, i, i.exports, n), (i.loaded = !0), i.exports;
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
      const s = "rcp-fe-lol-champion-details",
        o = document.currentScript.ownerDocument;
      const i = window.getPluginAnnounceEventName(s);
      o.addEventListener(
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
                logger: (e) => e.get("rcp-fe-common-libs").logging.create(s),
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
