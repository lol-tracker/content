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
                const i = e[o],
                  s = n._getValue(o, i);
                s && s.then
                  ? (s.then(function (e) {
                      e ||
                        console.warn(
                          "The promise for the key " +
                            o +
                            " resolved with a falsy value: ",
                          e,
                        ),
                        n._addValue(o, e);
                    }),
                    t.push(s))
                  : n._addValue(o, s);
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
          i = a(n(4)),
          s = a(n(5));
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
              );
          }
          createChampionDetailsComponent({
            championId: e,
            section: t,
            skinId: n,
            displayType: i,
            onCloseCallback: s,
          }) {
            return (
              (this.onCloseCallback = s),
              this.destroyChampionDetailsComponent(),
              this.loginSessionBinding.get("/v1/session").then((s) => {
                const { summonerId: a, puuid: r } = s;
                this.championsBinding
                  .get(`/v1/inventories/${a}/champions/${e}`)
                  .then((s) => {
                    let a = !1;
                    s &&
                      s.ownership &&
                      s.ownership.owned &&
                      (a = s.ownership.owned);
                    const l = {
                      puuid: r,
                      championId: e,
                      championOwned: a,
                      section: t,
                      skinId: n,
                      cdpPlatformConfig: this.platformConfig,
                      eternalsEnabled: this.eternalsEnabled,
                      destroyComponent:
                        this.destroyChampionDetailsComponent.bind(this),
                      displayType: i || "FULL_PAGE_MODAL",
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
              .overlay("/fe/lol-champion-details/trans.json");
            return (0, s.default)(o.Ember, e);
          }
          registerChampionDetailsComponent(e) {
            const t = {
                name: this.pluginName,
                tra: e,
                ComponentFactory: o.ComponentFactory,
                ChampionDetailsRootComponent: n(6),
                ChampionBackdropComponent: n(24),
                TitleLockupComponent: n(27),
                ProgressionSectionComponent: n(31),
                ProgressionMasteryComponent: n(34),
                ProgressionSeriesComponent: n(37),
                ProgressionShowcaseComponent: n(40),
                SeriesInfoComponent: n(43),
                StatstoneInfoComponent: n(65),
                ShowcaseItemComponent: n(69),
                OverviewSectionComponent: n(72),
                DetailsSectionComponent: n(75),
                TacticalInfoComponent: n(78),
                PlaystyleInfoComponent: n(81),
                AbilitiesSectionComponent: n(84),
                AbilityPickerComponent: n(87),
                AbilityVideoComponent: n(90),
                AbilityDescriptionComponent: n(93),
                SkinsSectionComponent: n(97),
                SkinsCarouselComponent: n(101),
                TieredTransformationsComponent: n(104),
                CatalogService: n(107),
                ChampionService: n(108),
                CollectionsService: n(109),
                StatstonesService: n(110),
                UxSettingsService: n(111),
                ClientConfigService: n(112),
                DynamicTraHelper:
                  o.SharedComponents.getApi_traTemplateHelpers().DynamicTra,
                EqHelper: i.default,
              },
              s = {
                name: "ProgressionFeatureFlyoutComponent",
                tra: e,
                ComponentFactory: o.ComponentFactory,
                ProgressionFeatureFlyoutComponent: n(113),
                StatstonesService: n(110),
              },
              a = {
                name: "QuestFormsPopup",
                tra: e,
                ComponentFactory: o.ComponentFactory,
                QuestFormsPopupComponent: n(116).default,
                ConcatTraHelper:
                  o.SharedComponents.getApi_traTemplateHelpers().ConcatTra,
                EqHelper: i.default,
              };
            o.EmberApplicationFactory.setFactoryDefinition(t),
              o.EmberApplicationFactory.setFactoryDefinition(s),
              o.EmberApplicationFactory.setFactoryDefinition(a);
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
          const { regions: o, region: i, locale: s } = e.metadata();
          if ((n = n.get("metadata." + t)) && "region" === t && n.id !== i.id) {
            const t = o[n.id],
              i = t.defaultLocale
                ? t.defaultLocale.id
                : t.availableLocales[0].id;
            e.setLocale(i, n.id);
          } else n && "locale" === t && n.id !== s.id && e.setLocale(n.id);
        }
        e.exports = function (e, o, i) {
          let s;
          const a = { metadata: !0, moment: !0 };
          return (
            (o = o.observe(() => {
              if (s) {
                const e = t(o.metadata());
                s.set("metadata", e),
                  s.beginPropertyChanges(),
                  Object.keys(a).forEach((e) => {
                    s.propertyWillChange(e), s.propertyDidChange(e);
                  }),
                  s.endPropertyChanges();
              }
            })),
            (s = e.Service.extend({
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
            s.set("service", s),
            s.addObserver("metadata.region", n.bind(null, o, "region")),
            s.addObserver("metadata.locale", n.bind(null, o, "locale")),
            i &&
              (console.warning(
                "deprecated: pass a traService as a property of your Ember application definition",
              ),
              i.register("tra:main", s, { instantiate: !1 }),
              i.inject("component", "tra", "tra:main"),
              i.inject("controller", "tra", "tra:main"),
              i.inject("view", "tra", "tra:main"),
              i.inject("model", "tra", "tra:main"),
              i.inject("route", "tra", "tra:main"),
              i.inject("service", "tra", "tra:main")),
            s
          );
        };
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          i = n(7),
          s = n(21);
        n(22);
        const a = "progression",
          r = "overview",
          l = "abilities",
          c = "skins",
          u = [a, r, l, c];
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
                t && !n && (0, s.getSettingValue)("StoreButtonEnabled", e, !0)
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
                  n = new i.NavigationBarMediator({
                    TooltipManager: o.TooltipManager,
                    TemplateHelper: o.TemplateHelper,
                    component: e,
                  }),
                  s = new i.SectionControllerMediator({ component: t }),
                  u = this.get("displayType");
                let p = null;
                if ("DIALOG_FRAME_ABOVE_VIGNETTE" === u) {
                  const e = {
                    "layer-position": "above-vignette",
                    dismissable: "",
                    "dismissable-type": "outside",
                  };
                  p = new i.DialogFrameMediator({
                    UIKit: o.UIKit,
                    dialogFrameClassName: "champion-details-dialog-frame",
                    attributes: e,
                  });
                } else if ("DIALOG_FRAME" === u) {
                  const e = {
                    "layer-position": "default",
                    dismissable: "",
                    "dismissable-type": "outside",
                  };
                  p = new i.DialogFrameMediator({
                    UIKit: o.UIKit,
                    dialogFrameClassName: "champion-details-dialog-frame",
                    attributes: e,
                  });
                } else
                  p = new i.FullPageModalMediator({ Navigation: o.Navigation });
                const d = new i.SubnavigationApi([n, s, p]);
                this.set("subnavigationApi", d);
                p.getScreenNode().appendChild(this.get("element"));
                const m = this.get("championOwned");
                let f =
                  this.get("progressionShouldLoad") && m
                    ? "cdp_progression"
                    : "cdp_overview";
                const h = this.get("section");
                h &&
                  (h === a
                    ? (f = "cdp_progression")
                    : h === r
                      ? (f = "cdp_overview")
                      : h === l && !1 === this.get("abilitiesDisabled")
                        ? (f = "cdp_abilities")
                        : h === c &&
                          !1 === this.get("skinsDisabled") &&
                          (f = "cdp_skins")),
                  d.show(f),
                  d.addEventListener("screenHidden", () => {
                    this.get("destroyComponent")();
                  }),
                  this.sendTelemetryEvent(f),
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
              const t = u.indexOf(e) + 1,
                n = u[t];
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
          i = c(n(14)),
          s = c(n(15)),
          a = c(n(18)),
          r = c(n(19)),
          l = c(n(20));
        function c(e) {
          return e && e.__esModule ? e : { default: e };
        }
        e.exports = {
          SubnavigationApi: o.default,
          NavigationBarMediator: i.default,
          SectionControllerMediator: s.default,
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
          i = c(n(9)),
          s = c(n(10)),
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
                            if (!(e instanceof s.default))
                              throw new Error(
                                u +
                                  " _validateMediators: Expected mediator to be an instance of Mediator",
                              );
                          }),
                          e
                        );
                      if (!(e instanceof s.default))
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
          })(i.default);
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
                  var i = this._listeners.get(e);
                  return (
                    !(!i || !i.length) &&
                    (i.forEach(function (e) {
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
          i = (function () {
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
          s = n(9),
          a = (o = s) && o.__esModule ? o : { default: o },
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
            i(e, [
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
          i = r(n(9)),
          s = r(n(8)),
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
              if (!(e instanceof s.default))
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
          })(i.default);
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
        var i = { sanitizeInteger: n, sanitizeBoolean: o };
        t.default = i;
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
          i = (function () {
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
            var i = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === i) {
              var s = Object.getPrototypeOf(t);
              return null === s ? void 0 : e(s, n, o);
            }
            if ("value" in i) return i.value;
            var a = i.get;
            return void 0 !== a ? a.call(o) : void 0;
          },
          a = n(10),
          r = (o = a) && o.__esModule ? o : { default: o },
          l = n(11),
          c = n(13);
        var u = (t.EVENT_NAVIGATION_CLICKED =
            "lol-uikit-navigation-item-click-event"),
          p = (t.NAVIGATION_ITEM_ATTR_ID = "item-id"),
          d = (t.NAVIGATION_ITEM_ATTR_PRIORITY = "priority"),
          m = (t.NAVIGATION_ITEM_ATTR_DISABLED = "disabled"),
          f = (t.NAVIGATION_ITEM_ATTR_ALERT = "alert"),
          h = (t.NAVIGATION_BAR_INDEX_ATTR = "selectedindex"),
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
              i(t, [
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
                      ? this._component.setAttribute(h, t.index)
                      : this._component.setAttribute(h, -1);
                  },
                },
                {
                  key: "_onApiRegisterSubsection",
                  value: function (e) {
                    var t = document.createElement("lol-uikit-navigation-item");
                    t.setAttribute(p, e.id),
                      t.setAttribute(d, e.priority),
                      (t.innerHTML = e.title),
                      !1 === e.enabled && t.setAttribute(m, "");
                    for (
                      var n = this._component.childNodes, o = 0;
                      o < n.length;
                      o++
                    ) {
                      var i = n[o];
                      if ("LOL-UIKIT-NAVIGATION-ITEM" === i.tagName)
                        if (
                          (0, c.sanitizeInteger)(i.getAttribute(d), 1) >
                          e.priority
                        )
                          return void this._component.insertBefore(t, i);
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
                        ? n.element.removeAttribute(m)
                        : n.element.setAttribute(m, ""));
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
                      i = n.TemplateHelper;
                    if (o && i) {
                      var s = this._getSectionDataById(e);
                      if (s)
                        if ("string" == typeof t && t.length > 0) {
                          var a = i.contentBlockTooltipSystem(t),
                            r = document.createElement("lol-uikit-tooltip");
                          r.appendChild(a);
                          o.assign(s.element, r, null, {
                            type: "system",
                            targetAnchor: { x: "center", y: "bottom" },
                            tooltipAnchor: { x: "center", y: "top" },
                          });
                        } else o.unassign(s.element);
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
                        ? n.element.setAttribute(f, "")
                        : n.element.removeAttribute(f));
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
          i = function e(t, n, o) {
            null === t && (t = Function.prototype);
            var i = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === i) {
              var s = Object.getPrototypeOf(t);
              return null === s ? void 0 : e(s, n, o);
            }
            if ("value" in i) return i.value;
            var a = i.get;
            return void 0 !== a ? a.call(o) : void 0;
          },
          s = l(n(10)),
          a = l(n(16)),
          r = n(11);
        function l(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var c = (t.EVENT_SECTION_WILL_SHOW = "elementWillShow"),
          u = (t.EVENT_SECTION_SHOW = "elementShow"),
          p = (t.EVENT_SECTION_WILL_HIDE = "elementWillHide"),
          d = (t.EVENT_SECTION_HIDE = "elementHide"),
          m = (t.SECTION_CONTROLLER_ATTR_SELECTED_ITEM = "selected-item"),
          f = (t.SECTION_ATTR_DISABLED = "disabled"),
          h = (t.SECTION_ATTR_ID = "section-id"),
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
                (o._currentSectionId = o._component.getAttribute(m)),
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
                    i(
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
                    var e = this._component.getAttribute(m);
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
                    var e = this._component.getAttribute(m);
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
                        d,
                        this._onSectionHide.bind(this),
                      );
                  },
                },
                {
                  key: "_renderSection",
                  value: function (e, t, n) {
                    for (
                      var o = this.sectionsRenders[t],
                        i = a.default.create(o, n),
                        s = a.default.getDOMNode(i);
                      e.firstChild;

                    )
                      e.removeChild(e.firstChild);
                    e.appendChild(s);
                  },
                },
                {
                  key: "_onApiShowSubsection",
                  value: function (e, t) {
                    if (this._component.getAttribute(m) !== e) {
                      var n = this._getSectionById(e);
                      if (n)
                        this.sectionsRenders.hasOwnProperty(e) &&
                          !this._options.preload &&
                          this._renderSection(n, e, t),
                          this._component.setAttribute(m, e);
                    }
                  },
                },
                {
                  key: "_onApiRegisterSubsection",
                  value: function (e) {
                    var t = document.createElement("lol-uikit-section");
                    t.setAttribute(h, e.id),
                      e.enabled || t.setAttribute(f, ""),
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
                    n && (t ? n.removeAttribute(f) : n.setAttribute(f, ""));
                  },
                },
              ]),
              t
            );
          })(s.default);
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
        function i(e) {
          return null !== e && "object" == typeof e;
        }
        const s = function () {
          this.factories = {};
        };
        (s.prototype.setFactory = function (e, t) {
          if (i(e)) {
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
          (s.prototype.setPrivateFactory = function (e, t) {
            o(this)[e] = t;
          }),
          (s.prototype.getFactory = function (e) {
            const t = this.getPublicFactory(e);
            return t || this.getPrivateFactory(e);
          }),
          (s.prototype.getPublicFactory = function (e) {
            e instanceof Object && (e = e.type);
            return this.factories[e];
          }),
          (s.prototype.getPrivateFactory = function (e) {
            e instanceof Object && (e = e.type);
            return o(this)[e];
          }),
          (s.prototype.getFactories = function () {
            return Object.assign({}, this.factories);
          }),
          (s.prototype.setUpstreamComponentFactory = function (e) {
            const t = e.getFactories();
            Object.keys(t).forEach(
              function (e) {
                this.setPrivateFactory(e, t[e]);
              }.bind(this),
            );
          }),
          (s.prototype.create = function (e, t, n) {
            if ("string" == typeof e) return this.createByName(e, t, n);
            if ("function" == typeof e) return e(t);
            if (
              (i((o = e)) && o instanceof HTMLElement && 1 === o.nodeType) ||
              e.domNode
            )
              return e;
            var o;
            const s = this.create(e.type, t || e.data);
            return (
              (e.domNode = this.getDOMNode(s)),
              e.classNames &&
                e.classNames.forEach(function (t) {
                  e.domNode.classList.add(t);
                }),
              s
            );
          }),
          (s.prototype.createByName = function (e, t, n) {
            const o = this.findFactory(e, n);
            return o ? this.create(o, t) : this.buildDummy(e);
          }),
          (s.prototype.findFactory = function (e, n) {
            return n === t ? this.getPublicFactory(e) : this.getFactory(e);
          }),
          (s.prototype.buildDummy = function (e) {
            let t = document.createElement("div");
            return (
              (t.innerHTML = "not found: " + e),
              1 === t.children.length && (t = t.children[0]),
              t
            );
          }),
          (s.prototype.getDOMNode = function (e) {
            if (e)
              return e instanceof HTMLElement || e instanceof Node
                ? e
                : e instanceof Object
                  ? e.domNode
                  : void 0;
          }),
          (s.prototype.exportable = function () {
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
          (s.prototype.reset = function () {
            this.factories = {};
          }),
          (e.exports = s);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var o,
          i = (function () {
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
            var i = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === i) {
              var s = Object.getPrototypeOf(t);
              return null === s ? void 0 : e(s, n, o);
            }
            if ("value" in i) return i.value;
            var a = i.get;
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
              i(t, [
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
                      (s(
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
          i = (function () {
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
            var i = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === i) {
              var s = Object.getPrototypeOf(t);
              return null === s ? void 0 : e(s, n, o);
            }
            if ("value" in i) return i.value;
            var a = i.get;
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
              i(t, [
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
                    s(
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
          i = (function () {
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
            var i = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === i) {
              var s = Object.getPrototypeOf(t);
              return null === s ? void 0 : e(s, n, o);
            }
            if ("value" in i) return i.value;
            var a = i.get;
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
                i = e.Navigation;
              return (
                e.defaultSectionIdOnShow &&
                  (n.defaultSectionIdOnShow = e.defaultSectionIdOnShow),
                (n.screenRoot = o.main().getScreenRoot(e.screenName)),
                (n.screenNode = n.screenRoot.getElement()),
                (n.navigationItem = i.addItem(
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
              i(t, [
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
                    s(
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
          id: "00dxEdLf",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\root\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\root\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\root\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-section-controller",[]],["dynamic-attr","class",["concat",["cdp-section-controller ",["unknown",["championClass"]]]]],["static-attr","animation","crossfade"],["flush-element"],["text","\\n"],["text","  "],["open-element","lol-uikit-section",[]],["static-attr","section-id","cdp_overview"],["static-attr","class","cdp-section-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["overviewShouldLoad"]]],null,6],["text","  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-section",[]],["static-attr","section-id","cdp_progression"],["static-attr","class","cdp-section-container progression"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["progressionDisabled"]]],null,5],["text","  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-section",[]],["static-attr","section-id","cdp_abilities"],["static-attr","class","cdp-abilities-section-container"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["abilitiesDisabled"]]],null,3],["text","  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-section",[]],["static-attr","section-id","cdp_skins"],["static-attr","class","cdp-section-container cdp-skins-section-container"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["skinsDisabled"]]],null,1],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","lol-uikit-navigation-bar",[]],["static-attr","class","cdp-nav-bar"],["static-attr","type","nav-bar-secondary"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-navigation-item",[]],["static-attr","item-id","cdp_progression"],["dynamic-attr","disabled",["unknown",["progressionDisabled"]],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","cdp_navigation_progression"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-navigation-item",[]],["static-attr","item-id","cdp_overview"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","cdp_navigation_overview"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-navigation-item",[]],["static-attr","item-id","cdp_abilities"],["dynamic-attr","disabled",["unknown",["abilitiesDisabled"]],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","cdp_navigation_abilities"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-navigation-item",[]],["static-attr","item-id","cdp_skins"],["dynamic-attr","disabled",["unknown",["skinsDisabled"]],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","cdp_navigation_skins"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["append",["unknown",["title-lockup"]],false],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["helper",["skins-section"],null,[["showStoreButton","sectionLoaded","destroyComponent","inputSkinId"],[["get",["showStoreButton"]],["helper",["action"],[["get",[null]],"sectionLoaded"],null],["get",["destroyComponent"]],["get",["skinId"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["skinsShouldLoad"]]],null,0]],"locals":[]},{"statements":[["text","        "],["append",["helper",["abilities-section"],null,[["abilitiesSectionShown","sectionLoaded"],[["get",["abilitiesSectionShown"]],["helper",["action"],[["get",[null]],"sectionLoaded"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["abilitiesShouldLoad"]]],null,2]],"locals":[]},{"statements":[["text","        "],["append",["helper",["champion-backdrop"],null,[["sectionLoaded","section"],[["helper",["action"],[["get",[null]],"sectionLoaded"],null],"progression"]]],false],["text","\\n        "],["append",["helper",["progression-section"],null,[["sectionLoaded","setBackdropFadeout","destroyComponent"],[["helper",["action"],[["get",[null]],"sectionLoaded"],null],["helper",["action"],[["get",[null]],"setBackdropFadeout"],null],["get",["destroyComponent"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["progressionShouldLoad"]]],null,4]],"locals":[]},{"statements":[["text","      "],["append",["helper",["champion-backdrop"],null,[["sectionLoaded","section"],[["helper",["action"],[["get",[null]],"sectionLoaded"],null],"overview"]]],false],["text","\\n      "],["append",["helper",["overview-section"],null,[["showStoreButton","sectionLoaded","destroyComponent"],[["get",["showStoreButton"]],["helper",["action"],[["get",[null]],"sectionLoaded"],null],["get",["destroyComponent"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
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
          id: "YtEktZ0s",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\shared\\\\champion-backdrop\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\shared\\\\champion-backdrop\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\shared\\\\champion-backdrop\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-backdrop ",["unknown",["section"]]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-backdrop-img-overlay"],["flush-element"],["close-element"],["text","\\n  "],["open-element","img",[]],["static-attr","class","cdp-backdrop-img"],["dynamic-attr","src",["concat",[["unknown",["champion","skins","0","splashPath"]]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          i = n(28);
        n(29),
          (e.exports = o.Ember.Component.extend({
            classNames: ["cdp-title-lockup-component"],
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
                return e ? (0, i.translate)(this, `cdp_role_${e}`) : "";
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
          id: "Vmbd+P2q",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\shared\\\\title-lockup\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\shared\\\\title-lockup\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\shared\\\\title-lockup\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","title-lockup-column"],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["champion-role-icon ",["unknown",["primaryRole"]]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["primaryRoleString"]]],null,1],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","title-lockup-column champion-info"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lockup-champion-name"],["flush-element"],["text","\\n    "],["append",["unknown",["champion","name"]],false],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","lockup-champion-title"],["flush-element"],["text","\\n    "],["append",["unknown",["champion","title"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","class","cdp-role-tooltip"],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["primaryRoleString"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["bottom","system"]],0]],"locals":[]}],"hasPartials":false}',
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
                return `/lol-game-data/assets/ASSETS/Loadouts/StatStones/Categories/LCU/SS_Icon_${this.get(
                  "hoveredStatstone.category",
                )}`;
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
          id: "zxeKFyA9",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\root\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\root\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\root\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-content-left ",["unknown",["setFadeout"]]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression-header"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-progression-title"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstone_title_text"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-eternals-info"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-info-icon",[]],["static-attr","class","cdp-eternals-info-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"launchInfoLink"],null],null],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression"],["flush-element"],["text","\\n    "],["append",["helper",["progression-series"],null,[["hoveredStatstone"],[["get",["hoveredStatstone"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-content-right ",["unknown",["hoveredClassName"]]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["showHoverPanel"]]],null,6,1],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","cdp-progression-section-title"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-progression-divider title"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-content-divider-line-end"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-content-divider-line"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","cdp-progression-section-title-text"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_featured_title"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-progression-divider title"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-content-divider-line"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-content-divider-line-end"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["append",["unknown",["progression-showcase"]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["hasFeatured"]]],null,0],["text","  "],["open-element","div",[]],["static-attr","class","cdp-progression-divider"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-progression-content-divider-line-end"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-progression-content-divider-line"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-progression-content-divider-line-end"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["append",["helper",["progression-mastery"],null,[["champion"],[["get",["champion"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["unknown",["tra","cdp_progression_statstones_rarity_common"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["unknown",["tra","cdp_progression_statstones_rarity_unique"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-title"],["flush-element"],["text","\\n            "],["append",["unknown",["hoveredStatstone","name"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-rarity"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hoveredStatstone","isEpic"]]],null,3,2],["text","          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-blurb"],["flush-element"],["text","\\n            "],["append",["unknown",["hoveredStatstone","description"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-image-panel"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-image"],["dynamic-attr","style",["concat",["background-image: url(\\"",["unknown",["baseStatstoneImagePath"]],"_1.png\\");"]]],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-image"],["dynamic-attr","style",["concat",["background-image: url(\\"",["unknown",["baseStatstoneImagePath"]],"_2.png\\");"]]],["flush-element"],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-image"],["dynamic-attr","style",["concat",["background-image: url(\\"",["unknown",["baseStatstoneImagePath"]],"_3.png\\");"]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-reward-text"],["flush-element"],["text","\\n            "],["append",["unknown",["tra","cdp_progression_statstones_hover_rewards"]],false],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-right-hover-unowned-reward-section"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-reward-section personal-best"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-image"],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-title"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_hover_personal_best"]],false],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-description"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_hover_personal_best_desc"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-reward-section mastery-emote"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-image"],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-title"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_hover_mastery_emote"]],false],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-description"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_hover_mastery_emote_desc"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["details-section"],null,[["statstone"],[["get",["hoveredStatstone"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","cdp-right-hover-panel"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isOwned"]]],null,5,4],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(35);
        e.exports = o.Ember.Component.extend({
          classNames: ["rcp-fe-lol-champion-details-mastery-component"],
          layout: n(36),
          collectionsService: o.Ember.inject.service("collections"),
          champion: null,
          championIconPath: o.Ember.computed("champion", function () {
            const e = this.get("champion");
            if (e)
              return (
                "/lol-game-data/assets/v1/champion-icons/" +
                e.id.toString() +
                ".png"
              );
          }),
          masteryData: o.Ember.computed.alias(
            "collectionsService.currentChampionMasteries",
          ),
          masteryLevelSafe: o.Ember.computed(
            "masteryData.championLevel",
            function () {
              const e = this.get("masteryData.championLevel");
              return e || 0;
            },
          ),
          showMastery: o.Ember.computed.gt("masteryLevelSafe", 0),
          bannerClass: o.Ember.computed("masteryLevelSafe", function () {
            const e = this.get("masteryLevelSafe");
            return e && e <= 7 ? "m" + e.toString() : "m0";
          }),
          showPoints: o.Ember.computed("masteryLevelSafe", function () {
            const e = this.get("masteryLevelSafe");
            return e && e >= 1 && e <= 4;
          }),
          showTokens: o.Ember.computed.not("showPoints"),
          rightPanelMode: o.Ember.computed(
            "showPoints",
            "showMastery",
            function () {
              return this.get("showPoints") || !this.get("showMastery")
                ? "points"
                : "tokens";
            },
          ),
          totalPoints: o.Ember.computed(
            "masteryData.championPointsSinceLastLevel",
            "masteryData.championPointsUntilNextLevel",
            function () {
              return (
                this.get("masteryData.championPointsSinceLastLevel") +
                this.get("masteryData.championPointsUntilNextLevel")
              );
            },
          ),
          gradientWidth: o.Ember.computed(
            "totalPoints",
            "masteryData.championPointsSinceLastLevel",
            function () {
              const e = this.get("totalPoints"),
                t = this.get("masteryData.championPointsSinceLastLevel");
              return e && t ? (t / e) * 362 : 0;
            },
          ),
          requiredTokenScore: o.Ember.computed(
            "masteryLevelSafe",
            "tra.cdp_progression_mastery_rating_s",
            "tra.cdp_progression_mastery_rating_s_minus",
            function () {
              const e = this.get("masteryLevelSafe");
              return e && 6 === e
                ? this.get("tra.cdp_progression_mastery_rating_s")
                : this.get("tra.cdp_progression_mastery_rating_s_minus");
            },
          ),
          tokens: o.Ember.computed(
            "masteryLevelSafe",
            "masteryData.tokensEarned",
            function () {
              const e = this.get("masteryLevelSafe"),
                t = this.get("masteryData.tokensEarned");
              let n = 0;
              n = 6 === e ? 3 : 2;
              const i = o.Ember.A();
              for (let e = 0; e < t; e++) {
                const t = {
                  completed: !0,
                  last: e === n - 1,
                  iconClass: "complete",
                };
                i.addObject(t);
              }
              for (let e = 0; e + t < n; e++) {
                const o = {
                  completed: !1,
                  last: e + t === n - 1,
                  iconClass: "incomplete",
                };
                i.addObject(o);
              }
              return i;
            },
          ),
          readyToForge: o.Ember.computed(
            "masteryData.tokensEarned",
            "tokens",
            function () {
              const e = this.get("tokens"),
                t = this.get("masteryData.tokensEarned");
              return e && t && t === e.length;
            },
          ),
          nextLevel: o.Ember.computed("masteryLevelSafe", function () {
            const e = this.get("masteryLevelSafe");
            return e ? e + 1 : 0;
          }),
          isMaxLevel: o.Ember.computed.equal("masteryLevelSafe", 7),
          masteryLevelString: o.Ember.computed(
            "masteryLevelSafe",
            "tra.cdp_progression_mastery_mastery_level",
            function () {
              return this.get("tra.formatString")(
                "cdp_progression_mastery_mastery_level",
                { masteryLevel: this.get("masteryLevelSafe") },
              );
            },
          ),
          gainTokensString: o.Ember.computed(
            "readyToForge",
            "nextLevel",
            "tra.cdp_progression_mastery_gain_tokens",
            "tra.cdp_progression_mastery_forge_tokens",
            function () {
              const e = this.get("tra.formatString");
              return this.get("readyToForge")
                ? e("cdp_progression_mastery_forge_tokens", {
                    nextLevel: this.get("nextLevel"),
                  })
                : e("cdp_progression_mastery_gain_tokens", {
                    nextLevel: this.get("nextLevel"),
                  });
            },
          ),
          actions: {
            showLoot: function () {
              o.Router.navigateTo("rcp-fe-lol-loot").then(() => {
                this.get("destroyComponent")();
              });
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
          id: "nSqGFW/T",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\mastery-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\mastery-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\mastery-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component"],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-progression-mastery-component-banner ",["unknown",["bannerClass"]]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-level-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-level"],["flush-element"],["text","\\n        "],["append",["unknown",["masteryLevelSafe"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-progression-mastery-component-right-panel ",["unknown",["rightPanelMode"]]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["showMastery"]]],null,14,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-mastery-zero-panel"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-header"],["flush-element"],["text","\\n          "],["append",["unknown",["masteryLevelString"]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-text"],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_progression_mastery_mastery_zero"]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","show-loot-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"showLoot"],null],null],["flush-element"],["text","\\n                  "],["append",["unknown",["tra","cdp_progression_mastery_tokens_upgrade"]],false],["text","\\n                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-token-divider"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                        "],["append",["unknown",["requiredTokenScore"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-token"],["flush-element"],["text","\\n                  "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-progression-mastery-component-token-background ",["unknown",["token","iconClass"]]]]],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["championIconPath"]],")"]]],["flush-element"],["close-element"],["text","\\n                  "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-progression-mastery-component-token-border ",["unknown",["bannerClass"]]]]],["flush-element"],["text","\\n                    "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-token-rating"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["token","completed"]]],null,3],["text","                    "],["close-element"],["text","\\n                  "],["close-element"],["text","\\n                "],["close-element"],["text","\\n"],["block",["unless"],[["get",["token","last"]]],null,2]],"locals":["token"]},{"statements":[["text","                "],["append",["unknown",["tra","cdp_progression_mastery_tokens_completed"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-tokens-header"],["flush-element"],["text","\\n"],["block",["if"],[["get",["readyToForge"]]],null,5],["text","            "],["close-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-progression-mastery-component-tokens ",["unknown",["readyToForge"]]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["tokens"]]],null,4],["text","            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-loot-button"],["flush-element"],["text","\\n"],["block",["if"],[["get",["readyToForge"]]],null,1],["text","            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-points-right"],["flush-element"],["text","\\n              "],["append",["unknown",["masteryData","formattedChampionPoints"]],false],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-points-right-label"],["flush-element"],["text","\\n              "],["append",["unknown",["tra","cdp_progression_mastery_mastery_points"]],false],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["unknown",["gainTokensString"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["unknown",["tra","cdp_progression_mastery_max_level"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["unknown",["masteryLevelString"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["append",["unknown",["tra","cdp_progression_mastery_ready_to_forge"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-tokens-left"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-header"],["flush-element"],["text","\\n"],["block",["if"],[["get",["readyToForge"]]],null,11,10],["text","          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-text"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isMaxLevel"]]],null,9,8],["text","          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-tokens-right"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isMaxLevel"]]],null,7,6],["text","        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-header"],["flush-element"],["text","\\n          "],["append",["unknown",["masteryLevelString"]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-points"],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_progression_mastery_mastery_title"]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-bar"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-gradient"],["dynamic-attr","style",["concat",["width: ",["unknown",["gradientWidth"]],"px;"]]],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-mastery-component-points-count"],["flush-element"],["text","\\n          "],["append",["unknown",["masteryData","formattedChampionPoints"]],false],["text"," / "],["append",["unknown",["masteryData","formattedMasteryGoal"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["showPoints"]]],null,13],["block",["if"],[["get",["showTokens"]]],null,12]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(38);
        const { RunMixin: i } = o.EmberAddons.EmberLifeline;
        e.exports = o.Ember.Component.extend(i, {
          classNames: ["rcp-fe-lol-champion-details-series-component"],
          classNameBindings: ["hasEternals:has-eternals:no-eternals"],
          layout: n(39),
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
          id: "B9aTIs9q",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-series-info-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasStatstoneData"]]],null,6,2],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["uikit-spinner"],null,[["class"],["cdp-series-info-spinner"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","cdp-series-timeout-message"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_load_error"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isTimeout"]]],null,1,0]],"locals":[]},{"statements":[["text","        "],["append",["helper",["series-info"],null,[["series","hoveredStatstone"],[["get",["series"]],["get",["hoveredStatstone"]]]]],false],["text","\\n"]],"locals":["series"]},{"statements":[["text","    "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","cdp-series-scrollable"],["static-attr","overflow-masks","bottom"],["flush-element"],["text","\\n"],["block",["each"],[["get",["statstonesSeries"]]],null,3],["text","    "],["close-element"],["text","\\n    "],["append",["unknown",["hover"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","cdp-series-no-statstones"],["flush-element"],["append",["unknown",["tra","cdp_progression_no_statstones_for_champ"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["hasNoStatstones"]]],null,5,4]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(41),
          (e.exports = o.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-showcase-section"],
            layout: n(42),
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
          id: "s5Cki84n",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\showcase-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\showcase-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\showcase-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-progression-showcase-component"],["flush-element"],["text","\\n"],["block",["each"],[["get",["featuredStatstones"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["showcase-item"],null,[["showcaseItem"],[["get",["showcaseItem"]]]]],false],["text","\\n"]],"locals":["showcaseItem"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(44),
          i = n(1),
          s = n(62);
        n(63),
          (e.exports = i.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-series-info-component"],
            layout: n(64),
            catalogService: i.Ember.inject.service("catalog"),
            statstonesService: i.Ember.inject.service("statstones"),
            series: null,
            hoveredStatstone: null,
            seriesLength: i.Ember.computed.alias("series.statstones.length"),
            statstonesOwned: i.Ember.computed.alias("series.stonesOwned"),
            ownedFromPacks: i.Ember.computed.alias("series.ownedFromPacks"),
            milestonesPassed: i.Ember.computed.alias("series.milestonesPassed"),
            setCompleted: i.Ember.computed(
              "totalMilestones",
              "milestonesPassed",
              function () {
                const e = this.get("totalMilestones");
                return this.get("milestonesPassed") >= e;
              },
            ),
            totalMilestones: i.Ember.computed("seriesLength", function () {
              return s.MILESTONE_COMPLETION_LEVEL * this.get("seriesLength");
            }),
            seriesCompleted: i.Ember.computed(
              "statstonesCompleted",
              "seriesLength",
              function () {
                return (
                  this.get("statstonesCompleted") === this.get("seriesLength")
                );
              },
            ),
            seriesOwned: i.Ember.computed(
              "seriesLength",
              "statstonesOwned",
              function () {
                const e = this.get("seriesLength");
                return this.get("statstonesOwned") === e;
              },
            ),
            showUnlockAllButton: i.Ember.computed(
              "seriesLength",
              "statstonesOwned",
              function () {
                const e = this.get("seriesLength");
                return this.get("statstonesOwned") < e;
              },
            ),
            shouldRenderSale: i.Ember.computed(
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
            showStatstonesCompleted: i.Ember.computed.not(
              "showUnlockAllButton",
            ),
            showPAWChoiceModal() {
              const e = this.get("series"),
                t = this.getPackId(e),
                n = [e.itemId];
              t && n.push(t),
                i.PawPlugin.createPAWChoiceModal(
                  { itemIds: n, inventoryType: e.inventoryType },
                  s.CDP_PAW_ID,
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
              return i.default;
            },
          }),
          Object.defineProperty(t, "REWARD_TRACKER", {
            enumerable: !0,
            get: function () {
              return s.default;
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
        var o = u(n(45)),
          i = u(n(56)),
          s = u(n(57)),
          a = u(n(58)),
          r = u(n(59)),
          l = u(n(60)),
          c = u(n(61));
        function u(e) {
          return e && e.__esModule ? e : { default: e };
        }
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var o = m(n(46)),
          i = m(n(47)),
          s = m(n(48)),
          a = m(n(49)),
          r = m(n(50)),
          l = m(n(51)),
          c = m(n(52)),
          u = m(n(53)),
          p = m(n(54)),
          d = m(n(55));
        function m(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var f = {
          COMPONENT_TYPES: o.default,
          CURRENCY_TYPES: i.default,
          INVENTORY_TYPES: s.default,
          MEDIA_TYPES: a.default,
          MEDIA_LOAD_TYPES: r.default,
          MODAL_TYPES: l.default,
          OFFER_PURCHASE_STATES: c.default,
          OFFER_VALIDATION_STATES: u.default,
          SCROLL_LIST_DISPLAY_TYPES: p.default,
          TEMPLATE_TYPES: d.default,
        };
        t.default = f;
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
          i = "RANKED_FLEX_TT",
          s = "CHERRY",
          a = "RANKED_TFT",
          r = "RANKED_TFT_DOUBLE_UP",
          l = "RANKED_TFT_TURBO",
          c = "RANKED_TFT_PAIRS",
          u = [n, o],
          p = [...u, i],
          d = [s],
          m = [a, r],
          f = [l, c],
          h = [...m, ...f],
          _ = [...p, ...m],
          g = [...f, ...d];
        var v = {
          RANKED_SOLO_5x5_QUEUE_TYPE: n,
          RANKED_FLEX_SR_QUEUE_TYPE: o,
          RANKED_FLEX_TT_QUEUE_TYPE: i,
          RANKED_CHERRY_QUEUE_TYPE: s,
          RANKED_TFT_QUEUE_TYPE: a,
          RANKED_TFT_DOUBLE_UP_QUEUE_TYPE: r,
          RANKED_TFT_TURBO_QUEUE_TYPE: l,
          RANKED_TFT_PAIRS_QUEUE_TYPE: c,
          RANKED_LOL_QUEUE_TYPES: p,
          RANKED_SR_QUEUE_TYPES: u,
          RANKED_TFT_QUEUE_TYPES: m,
          RATED_TFT_QUEUE_TYPES: f,
          RANKED_AND_RATED_TFT_QUEUE_TYPES: h,
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
        var i = {
          ProfilePrivacyEnabledState: n,
          ProfilePrivacySetting: o,
          DEFAULT_PROFILE_PRIVACY: {
            enabledState: n.UNKNOWN,
            setting: o.PUBLIC,
          },
        };
        t.default = i;
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
          i = 864e5,
          s = 6048e5,
          a = {
            MILLISECONDS_IN_A_SECOND: 1e3,
            MILLISECONDS_IN_A_MINUTE: 6e4,
            MILLISECONDS_IN_A_HOUR: o,
            MILLISECONDS_IN_A_DAY: i,
            MILLISECONDS_IN_A_WEEK: s,
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
          id: "iRqq20TE",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\series-info\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\series-info\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\series-info\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-progression-series-component"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression-series-header"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showUnlockAllButton"]]],null,10,8],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression-series-overview"],["flush-element"],["text","\\n"],["block",["each"],[["get",["series","statstones"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["statstone-info"],null,[["statstone","hoveredStatstone"],[["get",["statstoneData"]],["get",["hoveredStatstone"]]]]],false],["text","\\n"]],"locals":["statstoneData"]},{"statements":[["text","              "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-logo"],["flush-element"],["close-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","cdp-progression-statstones-completed"],["flush-element"],["append",["unknown",["milestonesPassed"]],false],["text"," / "],["append",["unknown",["totalMilestones"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-logo"],["flush-element"],["close-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","cdp-progression-statstones-completed"],["flush-element"],["append",["unknown",["milestonesPassed"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n                  "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_progression_passed_milestones_tooltip"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n                    "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_progression_mastery_upgraded_tooltip"]],false],["close-element"],["text","\\n                  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","span",[]],["static-attr","class","cdp-progression-mastery-upgrade"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],4],["text","              "],["close-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","cdp-progression-separator"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["static-attr","class","style-tooltip"],["flush-element"],["text","\\n                    "],["open-element","p",[]],["flush-element"],["append",["helper",["dynamic-tra"],["cdp_progression_series_pass_tooltip",["get",["pack","name"]]],null],false],["close-element"],["text","\\n                  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","cdp-progression-owned-from-packs"],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","src","/fe/lol-champion-details/series-ticket.png"],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","class"],["top","tooltip"]],6],["text","              "],["close-element"],["text","\\n"]],"locals":["pack"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-progression-series-info"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-series-content"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-progression-series-left"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-progression-series-name"],["flush-element"],["append",["unknown",["series","name"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["ownedFromPacks"]]],null,7],["text","          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-progression-series-right"],["flush-element"],["text","\\n"],["block",["if"],[["get",["setCompleted"]]],null,5],["text","            "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-milestone-progression"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],3],["block",["if"],[["get",["setCompleted"]]],null,2,1],["text","            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-series-border"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","cdp-progression-series-sale"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","cdp-progression-series-sale-label"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_sale_flag_text"]],false],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","sale-box sale-blur"],["flush-element"],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","sale-box"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-progression-series-info incomplete"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-series-name"],["flush-element"],["append",["unknown",["series","name"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-series-border"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldRenderSale"]]],null,9],["text","      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-progression-series-unlock-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"unlockAll"],null],null],["flush-element"],["text","\\n        "],["append",["unknown",["tra","cdp_progression_statstones_series_unlock"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          i = n(62),
          s = n(66);
        n(67);
        const { RunMixin: a } = o.EmberAddons.EmberLifeline;
        e.exports = o.Ember.Component.extend(a, {
          classNames: ["rcp-fe-lol-champion-details-statstone-component"],
          layout: n(68),
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
                this.get("statstone.completionValue") * i.PROGRESS_BAR_WIDTH;
              return Math.min(e, i.PROGRESS_BAR_WIDTH);
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
              s.SFX.gridHover.play(), this.set("hoveredStatstone", e);
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
        const i = o.AudioPlugin.getChannel("sfx-ui"),
          s = o.AudioPlugin.getChannel("sfx-ambience");
        function a(e) {
          return i.createSound(e, { allowConcurrency: !1 });
        }
        function r(e) {
          return s.createSound(e, { isLoop: !0 });
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
          id: "IaGXXmdf",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\series-info\\\\statstone\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\series-info\\\\statstone\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\series-component\\\\series-info\\\\statstone\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-progression-statstone ",["unknown",["ownedClassName"]]]]],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"onMouseEnter",["get",["statstone"]]],null],null],["dynamic-attr","onmouseleave",["helper",["action"],[["get",[null]],"onMouseLeave"],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["isOwned"]]],null,8],["text","  "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-wrapper"],["flush-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","cdp-progression-statstone-image"],["dynamic-attr","src",["concat",[["unknown",["statstone","imageUrl"]]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isRetired"]]],null,7],["text","    "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-description"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isOwned"]]],null,6,1],["text","    "],["close-element"],["text","\\n"],["block",["unless"],[["get",["isOwned"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","statstone-locked"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-name"],["flush-element"],["append",["unknown",["statstone","name"]],false],["close-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-rarity"],["flush-element"],["append",["unknown",["statstoneRarity"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["dynamic-attr","class",["concat",["progress-marker ",["get",["progress"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["progress"]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-logo milestone-progress"],["flush-element"],["close-element"],["text","\\n            "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-milestone-progress"],["flush-element"],["text","\\n"],["block",["each"],[["get",["milestoneProgressStyleList"]]],null,2],["text","            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-milestone"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-milestone-bar"],["flush-element"],["text","\\n            "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-progression-statstone-milestone-bar-fill statstone-",["unknown",["statstoneCategoryLower"]]]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"],["block",["if"],[["get",["isStatstoneNotCompleted"]]],null,3],["text","        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-value-info"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-milestones-passed"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-logo milestones-passed"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-milestones-passed-value"],["flush-element"],["append",["unknown",["statstone","formattedMilestoneLevel"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-personal-best"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-personal-best-icon"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-personal-best-value"],["flush-element"],["append",["unknown",["statstone","formattedPersonalBest"]],false],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-header"],["flush-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-value"],["flush-element"],["append",["unknown",["statstone","formattedValue"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-progression-statstone-name-info"],["flush-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","cdp-progression-statstone-name-owned"],["flush-element"],["append",["unknown",["statstone","name"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["isStatstoneCompleted"]]],null,5],["text","        "],["close-element"],["text","\\n"],["block",["if"],[["get",["isNotRetired"]]],null,4],["text","        "],["open-element","div",[]],["dynamic-attr","class",["concat",["series-featured ",["helper",["if"],[["get",["isFeatured"]],"selected"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"toggleFeaturedFlyout"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-progression-retired-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-progression-magic-mograph-wrapper statstone-",["unknown",["statstoneCategoryLower"]]]]],["flush-element"],["text","\\n      "],["open-element","uikit-video",[]],["static-attr","class","cdp-progression-owned-magic-mograph"],["static-attr","src","/fe/lol-champion-details/video/champion-detail-owned-magic.webm"],["static-attr","cache-name","rcp-fe-lol-champion-details"],["static-attr","preload",""],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(70),
          (e.exports = o.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-showcase-item"],
            layout: n(71),
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
          id: "Y99mlISN",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\showcase-component\\\\showcase-item\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\showcase-component\\\\showcase-item\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\showcase-component\\\\showcase-item\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-progression-showcase-item"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression-showcase-item-logo"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-progression-showcase-star"],["flush-element"],["close-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","cdp-progression-showcase-item-image"],["dynamic-attr","src",["concat",[["unknown",["showcaseItem","imageUrl"]]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["showcaseItem","isRetired"]]],null,0],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression-showcase-item-value"],["flush-element"],["append",["unknown",["showcaseItem","formattedValue"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-progression-showcase-item-name"],["flush-element"],["append",["unknown",["showcaseItem","name"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-progression-retired-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(73),
          (e.exports = o.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-overview-section"],
            layout: n(74),
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
          id: "P0DwF4rW",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\root\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\root\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\root\\\\index.js\\" "],["text","\\n"],["open-element","section",[]],["static-attr","class","cdp-content-column"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-overview-stats"],["flush-element"],["text","\\n    "],["append",["unknown",["tactical-info"]],false],["text","\\n    "],["append",["unknown",["playstyle-info"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","class","cdp-overview-description"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","cdp-overview-short-bio"],["flush-element"],["append",["helper",["sanitize"],[["get",["shortBio"]]],null],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","cdp-button-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showStoreButton"]]],null,2],["text","  "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-learn-more-button"],["static-attr","type","external"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"learnMore",["get",["champion","alias"]],["get",["locale"]]],null],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","cdp_actions_learn_more"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"unlockChampion",["get",["champion","id"]]],null],null],["flush-element"],["text","\\n        "],["append",["unknown",["tra","cdp_actions_unlock"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n        "],["append",["unknown",["tra","cdp_store_owned_message"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["championOwned"]]],null,1,0]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(76),
          (e.exports = o.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-details-section"],
            layout: n(77),
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
          id: "PDFKTBw9",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\details-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\details-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\details-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-right-component"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-right-eternal-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["UXSettings","largeAreaAnimationsEnabled"]]],null,13,7],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-right-eternal-info"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-right-description"],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","cdp-right-statstone-value"],["flush-element"],["append",["unknown",["statstone","formattedValue"]],false],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","cdp-right-statstone-name"],["flush-element"],["append",["unknown",["statstone","name"]],false],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","cdp-right-statstone-rarity"],["flush-element"],["text","\\n"],["block",["if"],[["get",["statstone","isEpic"]]],null,4,3],["text","      "],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","cdp-right-statstone-purchase-date"],["flush-element"],["append",["unknown",["tra","cdp_progression_statstones_date_acquired_text"]],false],["text"," "],["append",["unknown",["formattedDate"]],false],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","cdp-right-statstone-description"],["flush-element"],["append",["unknown",["statstone","description"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-progression-content-divider-line"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cdp-right-progression-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isNotRetired"]]],null,2],["text","      "],["open-element","div",[]],["static-attr","class","cdp-right-progression"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","cdp-right-progression-header"],["flush-element"],["append",["unknown",["tra","cdp_progression_passed_milestones"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-right-value-wrapper"],["flush-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","cdp-right-milestone-icon"],["flush-element"],["close-element"],["text","\\n          "],["open-element","span",[]],["static-attr","class","cdp-right-progression-value"],["flush-element"],["append",["unknown",["statstone","formattedMilestoneLevel"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-right-progression"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isMilestonesCompleted"]]],null,1,0],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n  \\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","span",[]],["static-attr","class","cdp-right-progression-header"],["flush-element"],["append",["unknown",["tra","cdp_progression_personal_best"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-right-personal-best-description"],["flush-element"],["text","\\n              "],["open-element","span",[]],["static-attr","class","cdp-right-lock-icon"],["flush-element"],["close-element"],["text","\\n              "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_progression_unlock_personal_best"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","span",[]],["static-attr","class","cdp-right-progression-header"],["flush-element"],["append",["unknown",["tra","cdp_progression_personal_best"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","cdp-right-progression-value"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","cdp-right-personal-best-icon"],["flush-element"],["close-element"],["text","\\n              "],["open-element","span",[]],["flush-element"],["append",["unknown",["statstone","formattedPersonalBest"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-right-progression"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","cdp-right-progression-header"],["flush-element"],["append",["unknown",["tra","cdp_progression_next_milestone"]],false],["close-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","cdp-right-progression-value"],["flush-element"],["append",["unknown",["statstone","nextMilestone"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["unknown",["tra","cdp_progression_statstones_rarity_common"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["unknown",["tra","cdp_progression_statstones_rarity_unique"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","cdp-right-eternal-image common"],["dynamic-attr","src",["concat",[["unknown",["statstone","imageUrl"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","cdp-right-eternal-image"],["dynamic-attr","src",["concat",[["unknown",["statstone","imageUrl"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["statstone","isEpic"]]],null,6,5]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","cdp-right-eternal-background"],["flush-element"],["text","\\n          "],["open-element","uikit-video",[]],["dynamic-attr","class",["concat",["cdp-right-eternal-background-mograph statstone-",["unknown",["statstoneCategoryLower"]]]]],["static-attr","src","/fe/lol-champion-details/video/champion-detail-statstone-common-particle.webm"],["static-attr","preload",""],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","cdp-right-eternal-image common"],["dynamic-attr","src",["concat",["/fe/lol-champion-details/",["unknown",["statstoneCategoryLower"]],"-",["unknown",["statstoneRarityLower"]],"-bg-",["unknown",["completionLevel"]],".png"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-right-eternal-flame common ",["unknown",["statstoneCategoryLower"]]]]],["flush-element"],["text","\\n        "],["open-element","uikit-video",[]],["dynamic-attr","class",["concat",["cdp-right-eternal-flame-mograph statstone-",["unknown",["statstoneCategoryLower"]]]]],["dynamic-attr","src",["concat",["/fe/lol-champion-details/video/champion-detail-statstone-common-flame-",["unknown",["completionLevel"]],".webm"]]],["static-attr","preload",""],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","cdp-right-eternal-image common"],["dynamic-attr","src",["concat",["/fe/lol-champion-details/",["unknown",["statstoneCategoryLower"]],"-",["unknown",["statstoneRarityLower"]],"-object-",["unknown",["completionLevel"]],".png"]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isMilestonesCompleted"]]],null,8]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","cdp-right-eternal-background"],["flush-element"],["text","\\n          "],["open-element","uikit-video",[]],["dynamic-attr","class",["concat",["cdp-right-eternal-background-mograph statstone-",["unknown",["statstoneCategoryLower"]]]]],["static-attr","src","/fe/lol-champion-details/video/champion-detail-statstone-background.webm"],["static-attr","preload",""],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-right-orb statstone-",["unknown",["statstoneCategoryLower"]]," ",["unknown",["completionLevelString"]],"-orb"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["iterate"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","cdp-right-orb-rings"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-right-orb-wrapper"],["flush-element"],["text","\\n"],["block",["each"],[["get",["completionLevelArray"]]],null,11],["text","      "],["close-element"],["text","\\n"],["block",["if"],[["get",["isMilestonesCompleted"]]],null,10],["text","      "],["open-element","img",[]],["static-attr","class","cdp-right-eternal-image"],["dynamic-attr","src",["concat",["/fe/lol-champion-details/",["unknown",["statstoneCategoryLower"]],"-",["unknown",["statstoneRarityLower"]],"-",["unknown",["completionLevel"]],".png"]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["cdp-right-eternal-flame ",["unknown",["statstoneCategoryLower"]]]]],["flush-element"],["text","\\n        "],["open-element","uikit-video",[]],["dynamic-attr","class",["concat",["cdp-right-eternal-flame-mograph statstone-",["unknown",["statstoneCategoryLower"]]]]],["dynamic-attr","src",["concat",["/fe/lol-champion-details/video/champion-detail-statstone-flame-",["unknown",["completionLevel"]],".webm"]]],["static-attr","preload",""],["static-attr","autoplay",""],["static-attr","loop",""],["flush-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["statstone","isEpic"]]],null,12,9]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          i = n(28);
        n(79),
          (e.exports = o.Ember.Component.extend({
            layout: n(80),
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
                    (0, i.translate)(this, `cdp_tactical_damage_${e}`))
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
          id: "9sknuYV9",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\tactical-info\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\tactical-info\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\tactical-info\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","tactical-info-damage"],["flush-element"],["text","\\n  "],["open-element","h6",[]],["static-attr","class","damage-label"],["flush-element"],["append",["unknown",["tra","cdp_tactical_damage_tooltip_title"]],false],["text",":"],["close-element"],["text","\\n  "],["open-element","p",[]],["static-attr","class","damage-value"],["flush-element"],["append",["unknown",["damageType"]],false],["close-element"],["text","\\n\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","class"],["right","tooltip"]],2],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","tactical-info-style"],["flush-element"],["text","\\n  "],["open-element","h6",[]],["static-attr","class","style-label"],["flush-element"],["append",["unknown",["tra","cdp_tactical_style_tooltip_title"]],false],["text",":"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","continuum-graph-container"],["flush-element"],["text","\\n    "],["open-element","span",[]],["dynamic-attr","class",["concat",["continuum-graph-icon ",["unknown",["attacksIconClass"]]]]],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","continuum-graph"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","continuum-graph-pip-container"],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","continuum-graph-pip"],["dynamic-attr","style",["concat",["left:",["unknown",["stylePercent"]],"%"]]],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","span",[]],["dynamic-attr","class",["concat",["continuum-graph-icon ",["unknown",["abilityIconClass"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","class"],["right","tooltip"]],1],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","tactical-info-difficulty"],["flush-element"],["text","\\n  "],["open-element","h6",[]],["static-attr","class","difficulty-label"],["flush-element"],["append",["unknown",["tra","cdp_tactical_difficulty_tooltip_title"]],false],["text",":"],["close-element"],["text","\\n  "],["open-element","span",[]],["dynamic-attr","class",["concat",["difficulty-graph difficulty-level-",["unknown",["difficultyLevel"]]]]],["flush-element"],["close-element"],["text","\\n\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","class"],["right","tooltip"]],0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","difficulty-tooltip"],["flush-element"],["text","\\n      "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_tactical_difficulty_tooltip_title"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_tactical_difficulty_tooltip"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","style-tooltip"],["flush-element"],["text","\\n      "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_tactical_style_tooltip_title"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_tactical_style_tooltip"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","damage-tooltip"],["flush-element"],["text","\\n      "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_tactical_damage_tooltip_title"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_tactical_damage_tooltip"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(82),
          (e.exports = o.Ember.Component.extend({
            classNames: ["cdp-playstyle-info-component"],
            layout: n(83),
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
          id: "PK2wNVn2",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\playstyle-info\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\playstyle-info\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\overview-section\\\\playstyle-info\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-graph-background"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","stat-segment damage"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tooltip-anchor"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","showEvent","hideEvent","class"],["top","show","hide","tooltip"]],4],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hover-event-mask"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["segment-fill level-",["unknown",["champion","playstyleInfo","damage"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","stat-segment toughness"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tooltip-anchor"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","showEvent","hideEvent","class"],["top","show","hide","tooltip"]],3],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hover-event-mask"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["segment-fill level-",["unknown",["champion","playstyleInfo","durability"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","stat-segment crowd-control"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tooltip-anchor"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","showEvent","hideEvent","class"],["bottom","show","hide","tooltip"]],2],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hover-event-mask"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["segment-fill level-",["unknown",["champion","playstyleInfo","crowdControl"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","stat-segment mobility"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tooltip-anchor"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","showEvent","hideEvent","class"],["bottom","show","hide","tooltip"]],1],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hover-event-mask"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["segment-fill level-",["unknown",["champion","playstyleInfo","mobility"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","stat-segment utility"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","tooltip-anchor"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","showEvent","hideEvent","class"],["top","show","hide","tooltip"]],0],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","hover-event-mask"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["segment-fill level-",["unknown",["champion","playstyleInfo","utility"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","utility-tt"],["flush-element"],["text","\\n          "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_utility_tooltip_title"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_utility_tooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","mobility-tt"],["flush-element"],["text","\\n          "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_mobility_tooltip_title"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_mobility_tooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","crowd-control-tt"],["flush-element"],["text","\\n          "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_crowd_control_tooltip_title"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_crowd_control_tooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","toughness-tt"],["flush-element"],["text","\\n          "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_toughness_tooltip_title"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_toughness_tooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["static-attr","class","damage-tt"],["flush-element"],["text","\\n          "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_damage_tooltip_title"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","cdp_playstyle_damage_tooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(85);
        const i = [
          { spellKey: "q", preload: "champion.spells.0.preload" },
          { spellKey: "w", preload: "champion.spells.1.preload" },
          { spellKey: "e", preload: "champion.spells.2.preload" },
          { spellKey: "r", preload: "champion.spells.3.preload" },
          { spellKey: "p", preload: "champion.passive.preload" },
        ];
        e.exports = o.Ember.Component.extend({
          layout: n(86),
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
              for (let t = 0; t < i.length - 1; t++)
                i[t].spellKey === e && this.set(i[t + 1].preload, "auto");
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
          id: "wM5c8sP+",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\root\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\root\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\root\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["champion","spells"]]],null,4]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","lol-uikit-section",[]],["dynamic-attr","section-id",["concat",["ability_",["unknown",["ability","spellKey"]]]]],["static-attr","class","cdp-ability-section-container"],["flush-element"],["text","\\n                "],["append",["helper",["ability-video"],null,[["ability","videoPreloadDone"],[["get",["ability"]],["helper",["action"],[["get",[null]],"videoPreloadDone"],null]]]],false],["text","\\n                "],["append",["helper",["ability-description"],null,[["ability","isOverride"],[["get",["ability"]],true]]],false],["text","\\n            "],["close-element"],["text","\\n"]],"locals":["ability"]},{"statements":[["block",["each"],[["get",["abilityOverride"]]],null,0]],"locals":["abilityOverride"]},{"statements":[["block",["each"],[["get",["spellbookOverride"]]],null,1]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-section",[]],["dynamic-attr","section-id",["concat",["ability_",["unknown",["ability","spellKey"]]]]],["static-attr","class","cdp-ability-section-container"],["flush-element"],["text","\\n        "],["append",["helper",["ability-video"],null,[["ability","videoPreloadDone"],[["get",["ability"]],["helper",["action"],[["get",[null]],"videoPreloadDone"],null]]]],false],["text","\\n        "],["append",["helper",["ability-description"],null,[["ability","isOverride"],[["get",["ability"]],["get",["ability","hasOverride"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["ability"]},{"statements":[["open-element","lol-uikit-section-controller",[]],["dynamic-attr","selected-item",["concat",[["unknown",["activeAbility"]]]]],["static-attr","class","cdp-abilities-section-controller"],["static-attr","animation","crossfade"],["flush-element"],["text","\\n"],["block",["each"],[["get",["champion","spells"]]],null,3],["block",["if"],[["get",["spellbookOverride"]]],null,2],["text","\\n    "],["open-element","lol-uikit-section",[]],["static-attr","section-id","ability_p"],["static-attr","class","cdp-ability-section-container"],["flush-element"],["text","\\n        "],["append",["helper",["ability-video"],null,[["ability","videoPreloadDone"],[["get",["champion","passive"]],["helper",["action"],[["get",[null]],"videoPreloadDone"],null]]]],false],["text","\\n        "],["append",["helper",["ability-description"],null,[["ability"],[["get",["champion","passive"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n  "],["append",["helper",["ability-picker"],null,[["changeAbility","abilitiesSectionShown"],[["helper",["action"],[["get",[null]],"changeAbility"],null],["get",["abilitiesSectionShown"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          i = n(28);
        n(88);
        const s = { q: 0, w: 1, e: 2, r: 3 };
        e.exports = o.Ember.Component.extend({
          classNames: ["rcp-fe-lol-champion-details-ability-picker"],
          layout: n(89),
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
                    e.spellKeyTra = (0, i.translate)(
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
                    e.spellKeyTra = (0, i.translate)(
                      this,
                      `cdp_ability_key_${e.spellKey}`,
                    );
                  }),
                  e
                );
            },
          ),
          getOverridesForSpellbook(e, t) {
            const n = s[e];
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
                i = this.getOverridesForSpellbook(t, n),
                s = e.substring(0, 1);
              i.findBy("spellKey", e).set("active", !0),
                i.findBy("spellKey", e).set("preload", "auto"),
                o.findBy("spellKey", s).set("active", !0),
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
          id: "BHvyALk2",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-picker\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-picker\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-picker\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","spellbook-wrapper"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","spellbook"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",[["unknown",["abilitiesPickerState"]]," ability ability-passive ",["helper",["if"],[["get",["champion","passive","active"]],"active"],null]]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","ability-icon-wrapper"],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","class","ability-icon"],["dynamic-attr","src",["concat",[["unknown",["champion","passive","abilityIconPath"]]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectAbility","p"],null],null],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["champion","passive","active"]]],null,4],["text","\\n            "],["open-element","div",[]],["static-attr","class","ability-key"],["flush-element"],["append",["unknown",["tra","cdp_ability_key_passive"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n\\n"],["block",["each"],[["get",["abilities"]]],null,3],["text","    "],["close-element"],["text","\\n\\n\\n"],["block",["if"],[["get",["spellbookOverride"]]],null,1],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["concat",["ability ability-",["unknown",["abilityOverride","spellKey"]]," ",["helper",["if"],[["get",["abilityOverride","active"]],"active"],null]]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","ability-icon-wrapper"],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","class","ability-icon"],["dynamic-attr","src",["concat",[["unknown",["abilityOverride","abilityIconPath"]]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectAbilityOverride",["get",["abilityOverride","spellKey"]]],null],null],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","ability-key"],["flush-element"],["append",["unknown",["abilityOverride","spellKeyTra"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["abilityOverride"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","spellbookOverride"],["flush-element"],["text","\\n"],["block",["each"],[["get",["spellbookOverride"]]],null,0],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","ability-video-progress"],["dynamic-attr","style",["concat",["width:",["unknown",["videoProgress"]],"%"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["concat",["ability ability-",["unknown",["ability","spellKey"]]," ",["helper",["if"],[["get",["ability","active"]],"active"],null]]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","ability-icon-wrapper"],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","class","ability-icon"],["dynamic-attr","src",["concat",[["unknown",["ability","abilityIconPath"]]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectAbility",["get",["ability","spellKey"]]],null],null],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["ability","active"]]],null,2],["text","\\n            "],["open-element","div",[]],["static-attr","class","ability-key"],["flush-element"],["append",["unknown",["ability","spellKeyTra"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["ability"]},{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","ability-video-progress"],["dynamic-attr","style",["concat",["width:",["unknown",["videoProgress"]],"%"]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(91);
        const i = "https://d28xe8vt774jo5.cloudfront.net/";
        e.exports = o.Ember.Component.extend({
          classNames: ["rcp-fe-lol-champion-details-ability-video"],
          layout: n(92),
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
                i = this.get("championService.audioSettings.data.sfxVolume");
              const s = !1 === t || !1 === n;
              void 0 === o && (o = e), void 0 === i && (i = e);
              const a = parseFloat((o / e) * (i / e));
              return s ? 0 : a;
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
                      : i
                : i;
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
          id: "xYjacMDl",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-video\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-video\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-video\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["ability","abilityVideoPath"]]],null,1,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["append",["unknown",["champion-backdrop"]],false],["text","\\n"]],"locals":[]},{"statements":[["open-element","div",[]],["static-attr","class","cdp-ability-video"],["flush-element"],["text","\\n  "],["open-element","video",[]],["dynamic-attr","class",["concat",["ability-video-",["helper",["if"],[["get",["ability","spellKey"]],["get",["ability","spellKey"]],"p"],null]]]],["dynamic-attr","preload",["concat",[["unknown",["preloadVideo"]]]]],["dynamic-attr","src",["concat",[["unknown",["abilityVideoBasePath"]],["unknown",["ability","abilityVideoPath"]]]]],["dynamic-attr","poster",["concat",[["unknown",["abilityVideoBasePath"]],["unknown",["ability","abilityVideoImagePath"]]]]],["static-attr","width","100%"],["static-attr","height","100%"],["dynamic-attr","volume",["unknown",["audioVolume"]],null],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","loading-spinner"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.slashifyArray = r);
        var o = n(1),
          i = n(28);
        n(94);
        var s,
          a = (s = n(95)) && s.__esModule ? s : { default: s };
        function r(e) {
          return e.every((t) => t === e[0]) ? e[0].toString() : e.join("/");
        }
        e.exports = o.Ember.Component.extend({
          classNames: ["rcp-fe-lol-champion-details-ability-description"],
          classNameBindings: ["isOverride"],
          layout: n(96),
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
              (e, n, o, i) => {
                if (i && t[n]) {
                  i = parseFloat(i);
                  let e = t[n];
                  return (
                    (e = e.slice(1).map((e) => Math.round(e * i))),
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
                const o = (e, n, o, i = 1) => {
                  i = parseFloat(i);
                  return this.prettyFloat(t * i * 100) + "%";
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
            const i = this.get("ability.effectAmounts");
            let s;
            if (/^Effect[0-9]+$/.test(t)) {
              const e = i[`${t}Amount`];
              e && (t = this.formatAbilityTokenValues(e.slice(1)));
            }
            if (t.includes("/"))
              s = t
                .split("/")
                .map((e) => this.prettyFloat(parseFloat(e) * n))
                .join("/");
            else {
              if (isNaN(parseFloat(t))) return o;
              s = this.prettyFloat(parseFloat(t) * n);
            }
            return s;
          },
          replaceFormulas(e) {
            const t = this.get("ability.formulas") || {};
            return (e = e.replace(
              /@\s?(f[0-9]+)(\*(-?[0-9]*\.?[0-9]+))?\s?@%?/g,
              (e, n, o, s = 1) => {
                const a = t[n];
                if (!a || "" === a.link || "" === a.coefficient) return "0";
                s = parseFloat(s);
                const { link: r, coefficient: l } = t[n];
                if ("@" === r[0]) return this.replaceFormula(r, l, s, e);
                {
                  const t = this.replaceFormula(r, l, 100 * s, e);
                  return (0, i.translate)(this, `cdp_ability_formula_${r}`, {
                    value: t,
                  });
                }
              },
            ));
          },
          replaceFormulaExpression(e, t, n, o, i) {
            const s = /Effect[0-9]+/.exec(t);
            if (!s) return t;
            const a = s[0] + "Amount",
              r = i[a];
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
                (e, o, i, s = 1) => {
                  s = parseFloat(s);
                  const { link: a, coefficient: r } = t[o];
                  let l;
                  return (
                    (l = this.replaceFormulaExpression(a, r, s, e, n)),
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
            var i,
              s = "Expected a function",
              a = "__lodash_hash_undefined__",
              r = "__lodash_placeholder__",
              l = 16,
              c = 32,
              u = 64,
              p = 128,
              d = 256,
              m = 1 / 0,
              f = 9007199254740991,
              h = NaN,
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
                ["rearg", d],
              ],
              v = "[object Arguments]",
              y = "[object Array]",
              b = "[object Boolean]",
              E = "[object Date]",
              k = "[object Error]",
              S = "[object Function]",
              x = "[object GeneratorFunction]",
              w = "[object Map]",
              T = "[object Number]",
              C = "[object Object]",
              O = "[object Promise]",
              I = "[object RegExp]",
              L = "[object Set]",
              P = "[object String]",
              R = "[object Symbol]",
              A = "[object WeakMap]",
              N = "[object ArrayBuffer]",
              D = "[object DataView]",
              M = "[object Float32Array]",
              j = "[object Float64Array]",
              F = "[object Int8Array]",
              U = "[object Int16Array]",
              V = "[object Int32Array]",
              B = "[object Uint8Array]",
              H = "[object Uint8ClampedArray]",
              W = "[object Uint16Array]",
              K = "[object Uint32Array]",
              q = /\b__p \+= '';/g,
              $ = /\b(__p \+=) '' \+/g,
              G = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
              z = /&(?:amp|lt|gt|quot|#39);/g,
              Y = /[&<>"']/g,
              Q = RegExp(z.source),
              X = RegExp(Y.source),
              Z = /<%-([\s\S]+?)%>/g,
              J = /<%([\s\S]+?)%>/g,
              ee = /<%=([\s\S]+?)%>/g,
              te = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
              ne = /^\w*$/,
              oe =
                /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
              ie = /[\\^$.*+?()[\]{}|]/g,
              se = RegExp(ie.source),
              ae = /^\s+|\s+$/g,
              re = /^\s+/,
              le = /\s+$/,
              ce = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
              ue = /\{\n\/\* \[wrapped with (.+)\] \*/,
              pe = /,? & /,
              de = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
              me = /\\(\\)?/g,
              fe = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
              he = /\w*$/,
              _e = /^[-+]0x[0-9a-f]+$/i,
              ge = /^0b[01]+$/i,
              ve = /^\[object .+?Constructor\]$/,
              ye = /^0o[0-7]+$/i,
              be = /^(?:0|[1-9]\d*)$/,
              Ee = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
              ke = /($^)/,
              Se = /['\n\r\u2028\u2029\\]/g,
              xe = "\\ud800-\\udfff",
              we = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff",
              Te = "\\u2700-\\u27bf",
              Ce = "a-z\\xdf-\\xf6\\xf8-\\xff",
              Oe = "A-Z\\xc0-\\xd6\\xd8-\\xde",
              Ie = "\\ufe0e\\ufe0f",
              Le =
                "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
              Pe = "['’]",
              Re = "[" + xe + "]",
              Ae = "[" + Le + "]",
              Ne = "[" + we + "]",
              De = "\\d+",
              Me = "[" + Te + "]",
              je = "[" + Ce + "]",
              Fe = "[^" + xe + Le + De + Te + Ce + Oe + "]",
              Ue = "\\ud83c[\\udffb-\\udfff]",
              Ve = "[^" + xe + "]",
              Be = "(?:\\ud83c[\\udde6-\\uddff]){2}",
              He = "[\\ud800-\\udbff][\\udc00-\\udfff]",
              We = "[" + Oe + "]",
              Ke = "\\u200d",
              qe = "(?:" + je + "|" + Fe + ")",
              $e = "(?:" + We + "|" + Fe + ")",
              Ge = "(?:['’](?:d|ll|m|re|s|t|ve))?",
              ze = "(?:['’](?:D|LL|M|RE|S|T|VE))?",
              Ye = "(?:" + Ne + "|" + Ue + ")" + "?",
              Qe = "[" + Ie + "]?",
              Xe =
                Qe +
                Ye +
                ("(?:" +
                  Ke +
                  "(?:" +
                  [Ve, Be, He].join("|") +
                  ")" +
                  Qe +
                  Ye +
                  ")*"),
              Ze = "(?:" + [Me, Be, He].join("|") + ")" + Xe,
              Je = "(?:" + [Ve + Ne + "?", Ne, Be, He, Re].join("|") + ")",
              et = RegExp(Pe, "g"),
              tt = RegExp(Ne, "g"),
              nt = RegExp(Ue + "(?=" + Ue + ")|" + Je + Xe, "g"),
              ot = RegExp(
                [
                  We +
                    "?" +
                    je +
                    "+" +
                    Ge +
                    "(?=" +
                    [Ae, We, "$"].join("|") +
                    ")",
                  $e + "+" + ze + "(?=" + [Ae, We + qe, "$"].join("|") + ")",
                  We + "?" + qe + "+" + Ge,
                  We + "+" + ze,
                  "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
                  "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
                  De,
                  Ze,
                ].join("|"),
                "g",
              ),
              it = RegExp("[" + Ke + xe + we + Ie + "]"),
              st =
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
            (lt[M] =
              lt[j] =
              lt[F] =
              lt[U] =
              lt[V] =
              lt[B] =
              lt[H] =
              lt[W] =
              lt[K] =
                !0),
              (lt[v] =
                lt[y] =
                lt[N] =
                lt[b] =
                lt[D] =
                lt[E] =
                lt[k] =
                lt[S] =
                lt[w] =
                lt[T] =
                lt[C] =
                lt[I] =
                lt[L] =
                lt[P] =
                lt[A] =
                  !1);
            var ct = {};
            (ct[v] =
              ct[y] =
              ct[N] =
              ct[D] =
              ct[b] =
              ct[E] =
              ct[M] =
              ct[j] =
              ct[F] =
              ct[U] =
              ct[V] =
              ct[w] =
              ct[T] =
              ct[C] =
              ct[I] =
              ct[L] =
              ct[P] =
              ct[R] =
              ct[B] =
              ct[H] =
              ct[W] =
              ct[K] =
                !0),
              (ct[k] = ct[S] = ct[A] = !1);
            var ut = {
                "\\": "\\",
                "'": "'",
                "\n": "n",
                "\r": "r",
                "\u2028": "u2028",
                "\u2029": "u2029",
              },
              pt = parseFloat,
              dt = parseInt,
              mt =
                "object" == typeof n.g && n.g && n.g.Object === Object && n.g,
              ft =
                "object" == typeof self &&
                self &&
                self.Object === Object &&
                self,
              ht = mt || ft || Function("return this")(),
              _t = t && !t.nodeType && t,
              gt = _t && e && !e.nodeType && e,
              vt = gt && gt.exports === _t,
              yt = vt && mt.process,
              bt = (function () {
                try {
                  var e = gt && gt.require && gt.require("util").types;
                  return e || (yt && yt.binding && yt.binding("util"));
                } catch (e) {}
              })(),
              Et = bt && bt.isArrayBuffer,
              kt = bt && bt.isDate,
              St = bt && bt.isMap,
              xt = bt && bt.isRegExp,
              wt = bt && bt.isSet,
              Tt = bt && bt.isTypedArray;
            function Ct(e, t, n) {
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
            function Ot(e, t, n, o) {
              for (var i = -1, s = null == e ? 0 : e.length; ++i < s; ) {
                var a = e[i];
                t(o, a, n(a), e);
              }
              return o;
            }
            function It(e, t) {
              for (
                var n = -1, o = null == e ? 0 : e.length;
                ++n < o && !1 !== t(e[n], n, e);

              );
              return e;
            }
            function Lt(e, t) {
              for (
                var n = null == e ? 0 : e.length;
                n-- && !1 !== t(e[n], n, e);

              );
              return e;
            }
            function Pt(e, t) {
              for (var n = -1, o = null == e ? 0 : e.length; ++n < o; )
                if (!t(e[n], n, e)) return !1;
              return !0;
            }
            function Rt(e, t) {
              for (
                var n = -1, o = null == e ? 0 : e.length, i = 0, s = [];
                ++n < o;

              ) {
                var a = e[n];
                t(a, n, e) && (s[i++] = a);
              }
              return s;
            }
            function At(e, t) {
              return !!(null == e ? 0 : e.length) && Wt(e, t, 0) > -1;
            }
            function Nt(e, t, n) {
              for (var o = -1, i = null == e ? 0 : e.length; ++o < i; )
                if (n(t, e[o])) return !0;
              return !1;
            }
            function Dt(e, t) {
              for (
                var n = -1, o = null == e ? 0 : e.length, i = Array(o);
                ++n < o;

              )
                i[n] = t(e[n], n, e);
              return i;
            }
            function Mt(e, t) {
              for (var n = -1, o = t.length, i = e.length; ++n < o; )
                e[i + n] = t[n];
              return e;
            }
            function jt(e, t, n, o) {
              var i = -1,
                s = null == e ? 0 : e.length;
              for (o && s && (n = e[++i]); ++i < s; ) n = t(n, e[i], i, e);
              return n;
            }
            function Ft(e, t, n, o) {
              var i = null == e ? 0 : e.length;
              for (o && i && (n = e[--i]); i--; ) n = t(n, e[i], i, e);
              return n;
            }
            function Ut(e, t) {
              for (var n = -1, o = null == e ? 0 : e.length; ++n < o; )
                if (t(e[n], n, e)) return !0;
              return !1;
            }
            var Vt = Gt("length");
            function Bt(e, t, n) {
              var o;
              return (
                n(e, function (e, n, i) {
                  if (t(e, n, i)) return (o = n), !1;
                }),
                o
              );
            }
            function Ht(e, t, n, o) {
              for (var i = e.length, s = n + (o ? 1 : -1); o ? s-- : ++s < i; )
                if (t(e[s], s, e)) return s;
              return -1;
            }
            function Wt(e, t, n) {
              return t == t
                ? (function (e, t, n) {
                    var o = n - 1,
                      i = e.length;
                    for (; ++o < i; ) if (e[o] === t) return o;
                    return -1;
                  })(e, t, n)
                : Ht(e, qt, n);
            }
            function Kt(e, t, n, o) {
              for (var i = n - 1, s = e.length; ++i < s; )
                if (o(e[i], t)) return i;
              return -1;
            }
            function qt(e) {
              return e != e;
            }
            function $t(e, t) {
              var n = null == e ? 0 : e.length;
              return n ? Qt(e, t) / n : h;
            }
            function Gt(e) {
              return function (t) {
                return null == t ? i : t[e];
              };
            }
            function zt(e) {
              return function (t) {
                return null == e ? i : e[t];
              };
            }
            function Yt(e, t, n, o, i) {
              return (
                i(e, function (e, i, s) {
                  n = o ? ((o = !1), e) : t(n, e, i, s);
                }),
                n
              );
            }
            function Qt(e, t) {
              for (var n, o = -1, s = e.length; ++o < s; ) {
                var a = t(e[o]);
                a !== i && (n = n === i ? a : n + a);
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
            var on = zt({
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
              sn = zt({
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
              return it.test(e);
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
              for (var n = -1, o = e.length, i = 0, s = []; ++n < o; ) {
                var a = e[n];
                (a !== t && a !== r) || ((e[n] = r), (s[i++] = n));
              }
              return s;
            }
            function pn(e, t) {
              return "__proto__" == t ? i : e[t];
            }
            function dn(e) {
              var t = -1,
                n = Array(e.size);
              return (
                e.forEach(function (e) {
                  n[++t] = e;
                }),
                n
              );
            }
            function mn(e) {
              var t = -1,
                n = Array(e.size);
              return (
                e.forEach(function (e) {
                  n[++t] = [e, e];
                }),
                n
              );
            }
            function fn(e) {
              return rn(e)
                ? (function (e) {
                    var t = (nt.lastIndex = 0);
                    for (; nt.test(e); ) ++t;
                    return t;
                  })(e)
                : Vt(e);
            }
            function hn(e) {
              return rn(e)
                ? (function (e) {
                    return e.match(nt) || [];
                  })(e)
                : (function (e) {
                    return e.split("");
                  })(e);
            }
            var _n = zt({
              "&amp;": "&",
              "&lt;": "<",
              "&gt;": ">",
              "&quot;": '"',
              "&#39;": "'",
            });
            var gn = (function e(t) {
              var n,
                o = (t =
                  null == t ? ht : gn.defaults(ht.Object(), t, gn.pick(ht, at)))
                  .Array,
                xe = t.Date,
                we = t.Error,
                Te = t.Function,
                Ce = t.Math,
                Oe = t.Object,
                Ie = t.RegExp,
                Le = t.String,
                Pe = t.TypeError,
                Re = o.prototype,
                Ae = Te.prototype,
                Ne = Oe.prototype,
                De = t["__core-js_shared__"],
                Me = Ae.toString,
                je = Ne.hasOwnProperty,
                Fe = 0,
                Ue = (n = /[^.]+$/.exec(
                  (De && De.keys && De.keys.IE_PROTO) || "",
                ))
                  ? "Symbol(src)_1." + n
                  : "",
                Ve = Ne.toString,
                Be = Me.call(Oe),
                He = ht._,
                We = Ie(
                  "^" +
                    Me.call(je)
                      .replace(ie, "\\$&")
                      .replace(
                        /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                        "$1.*?",
                      ) +
                    "$",
                ),
                Ke = vt ? t.Buffer : i,
                qe = t.Symbol,
                $e = t.Uint8Array,
                Ge = Ke ? Ke.allocUnsafe : i,
                ze = cn(Oe.getPrototypeOf, Oe),
                Ye = Oe.create,
                Qe = Ne.propertyIsEnumerable,
                Xe = Re.splice,
                Ze = qe ? qe.isConcatSpreadable : i,
                Je = qe ? qe.iterator : i,
                nt = qe ? qe.toStringTag : i,
                it = (function () {
                  try {
                    var e = ms(Oe, "defineProperty");
                    return e({}, "", {}), e;
                  } catch (e) {}
                })(),
                ut = t.clearTimeout !== ht.clearTimeout && t.clearTimeout,
                mt = xe && xe.now !== ht.Date.now && xe.now,
                ft = t.setTimeout !== ht.setTimeout && t.setTimeout,
                _t = Ce.ceil,
                gt = Ce.floor,
                yt = Oe.getOwnPropertySymbols,
                bt = Ke ? Ke.isBuffer : i,
                Vt = t.isFinite,
                zt = Re.join,
                vn = cn(Oe.keys, Oe),
                yn = Ce.max,
                bn = Ce.min,
                En = xe.now,
                kn = t.parseInt,
                Sn = Ce.random,
                xn = Re.reverse,
                wn = ms(t, "DataView"),
                Tn = ms(t, "Map"),
                Cn = ms(t, "Promise"),
                On = ms(t, "Set"),
                In = ms(t, "WeakMap"),
                Ln = ms(Oe, "create"),
                Pn = In && new In(),
                Rn = {},
                An = Fs(wn),
                Nn = Fs(Tn),
                Dn = Fs(Cn),
                Mn = Fs(On),
                jn = Fs(In),
                Fn = qe ? qe.prototype : i,
                Un = Fn ? Fn.valueOf : i,
                Vn = Fn ? Fn.toString : i;
              function Bn(e) {
                if (tr(e) && !Ka(e) && !(e instanceof qn)) {
                  if (e instanceof Kn) return e;
                  if (je.call(e, "__wrapped__")) return Us(e);
                }
                return new Kn(e);
              }
              var Hn = (function () {
                function e() {}
                return function (t) {
                  if (!er(t)) return {};
                  if (Ye) return Ye(t);
                  e.prototype = t;
                  var n = new e();
                  return (e.prototype = i), n;
                };
              })();
              function Wn() {}
              function Kn(e, t) {
                (this.__wrapped__ = e),
                  (this.__actions__ = []),
                  (this.__chain__ = !!t),
                  (this.__index__ = 0),
                  (this.__values__ = i);
              }
              function qn(e) {
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
              function zn(e) {
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
                for (this.__data__ = new zn(); ++t < n; ) this.add(e[t]);
              }
              function Qn(e) {
                var t = (this.__data__ = new Gn(e));
                this.size = t.size;
              }
              function Xn(e, t) {
                var n = Ka(e),
                  o = !n && Wa(e),
                  i = !n && !o && za(e),
                  s = !n && !o && !i && cr(e),
                  a = n || o || i || s,
                  r = a ? Xt(e.length, Le) : [],
                  l = r.length;
                for (var c in e)
                  (!t && !je.call(e, c)) ||
                    (a &&
                      ("length" == c ||
                        (i && ("offset" == c || "parent" == c)) ||
                        (s &&
                          ("buffer" == c ||
                            "byteLength" == c ||
                            "byteOffset" == c)) ||
                        bs(c, l))) ||
                    r.push(c);
                return r;
              }
              function Zn(e) {
                var t = e.length;
                return t ? e[Qo(0, t - 1)] : i;
              }
              function Jn(e, t) {
                return Ds(Pi(e), lo(t, 0, e.length));
              }
              function eo(e) {
                return Ds(Pi(e));
              }
              function to(e, t, n) {
                ((n !== i && !Va(e[t], n)) || (n === i && !(t in e))) &&
                  ao(e, t, n);
              }
              function no(e, t, n) {
                var o = e[t];
                (je.call(e, t) && Va(o, n) && (n !== i || t in e)) ||
                  ao(e, t, n);
              }
              function oo(e, t) {
                for (var n = e.length; n--; ) if (Va(e[n][0], t)) return n;
                return -1;
              }
              function io(e, t, n, o) {
                return (
                  fo(e, function (e, i, s) {
                    t(o, e, n(e), s);
                  }),
                  o
                );
              }
              function so(e, t) {
                return e && Ri(t, Pr(t), e);
              }
              function ao(e, t, n) {
                "__proto__" == t && it
                  ? it(e, t, {
                      configurable: !0,
                      enumerable: !0,
                      value: n,
                      writable: !0,
                    })
                  : (e[t] = n);
              }
              function ro(e, t) {
                for (
                  var n = -1, s = t.length, a = o(s), r = null == e;
                  ++n < s;

                )
                  a[n] = r ? i : Tr(e, t[n]);
                return a;
              }
              function lo(e, t, n) {
                return (
                  e == e &&
                    (n !== i && (e = e <= n ? e : n),
                    t !== i && (e = e >= t ? e : t)),
                  e
                );
              }
              function co(e, t, n, o, s, a) {
                var r,
                  l = 1 & t,
                  c = 2 & t,
                  u = 4 & t;
                if ((n && (r = s ? n(e, o, s, a) : n(e)), r !== i)) return r;
                if (!er(e)) return e;
                var p = Ka(e);
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
                    return Pi(e, r);
                } else {
                  var d = _s(e),
                    m = d == S || d == x;
                  if (za(e)) return wi(e, l);
                  if (d == C || d == v || (m && !s)) {
                    if (((r = c || m ? {} : vs(e)), !l))
                      return c
                        ? (function (e, t) {
                            return Ri(e, hs(e), t);
                          })(
                            e,
                            (function (e, t) {
                              return e && Ri(t, Rr(t), e);
                            })(r, e),
                          )
                        : (function (e, t) {
                            return Ri(e, fs(e), t);
                          })(e, so(r, e));
                  } else {
                    if (!ct[d]) return s ? e : {};
                    r = (function (e, t, n) {
                      var o = e.constructor;
                      switch (t) {
                        case N:
                          return Ti(e);
                        case b:
                        case E:
                          return new o(+e);
                        case D:
                          return (function (e, t) {
                            var n = t ? Ti(e.buffer) : e.buffer;
                            return new e.constructor(
                              n,
                              e.byteOffset,
                              e.byteLength,
                            );
                          })(e, n);
                        case M:
                        case j:
                        case F:
                        case U:
                        case V:
                        case B:
                        case H:
                        case W:
                        case K:
                          return Ci(e, n);
                        case w:
                          return new o();
                        case T:
                        case P:
                          return new o(e);
                        case I:
                          return (function (e) {
                            var t = new e.constructor(e.source, he.exec(e));
                            return (t.lastIndex = e.lastIndex), t;
                          })(e);
                        case L:
                          return new o();
                        case R:
                          return (i = e), Un ? Oe(Un.call(i)) : {};
                      }
                      var i;
                    })(e, d, l);
                  }
                }
                a || (a = new Qn());
                var f = a.get(e);
                if (f) return f;
                if ((a.set(e, r), ar(e)))
                  return (
                    e.forEach(function (o) {
                      r.add(co(o, t, n, o, e, a));
                    }),
                    r
                  );
                if (nr(e))
                  return (
                    e.forEach(function (o, i) {
                      r.set(i, co(o, t, n, i, e, a));
                    }),
                    r
                  );
                var h = p ? i : (u ? (c ? as : ss) : c ? Rr : Pr)(e);
                return (
                  It(h || e, function (o, i) {
                    h && (o = e[(i = o)]), no(r, i, co(o, t, n, i, e, a));
                  }),
                  r
                );
              }
              function uo(e, t, n) {
                var o = n.length;
                if (null == e) return !o;
                for (e = Oe(e); o--; ) {
                  var s = n[o],
                    a = t[s],
                    r = e[s];
                  if ((r === i && !(s in e)) || !a(r)) return !1;
                }
                return !0;
              }
              function po(e, t, n) {
                if ("function" != typeof e) throw new Pe(s);
                return Ps(function () {
                  e.apply(i, n);
                }, t);
              }
              function mo(e, t, n, o) {
                var i = -1,
                  s = At,
                  a = !0,
                  r = e.length,
                  l = [],
                  c = t.length;
                if (!r) return l;
                n && (t = Dt(t, Zt(n))),
                  o
                    ? ((s = Nt), (a = !1))
                    : t.length >= 200 && ((s = en), (a = !1), (t = new Yn(t)));
                e: for (; ++i < r; ) {
                  var u = e[i],
                    p = null == n ? u : n(u);
                  if (((u = o || 0 !== u ? u : 0), a && p == p)) {
                    for (var d = c; d--; ) if (t[d] === p) continue e;
                    l.push(u);
                  } else s(t, p, o) || l.push(u);
                }
                return l;
              }
              (Bn.templateSettings = {
                escape: Z,
                evaluate: J,
                interpolate: ee,
                variable: "",
                imports: { _: Bn },
              }),
                (Bn.prototype = Wn.prototype),
                (Bn.prototype.constructor = Bn),
                (Kn.prototype = Hn(Wn.prototype)),
                (Kn.prototype.constructor = Kn),
                (qn.prototype = Hn(Wn.prototype)),
                (qn.prototype.constructor = qn),
                ($n.prototype.clear = function () {
                  (this.__data__ = Ln ? Ln(null) : {}), (this.size = 0);
                }),
                ($n.prototype.delete = function (e) {
                  var t = this.has(e) && delete this.__data__[e];
                  return (this.size -= t ? 1 : 0), t;
                }),
                ($n.prototype.get = function (e) {
                  var t = this.__data__;
                  if (Ln) {
                    var n = t[e];
                    return n === a ? i : n;
                  }
                  return je.call(t, e) ? t[e] : i;
                }),
                ($n.prototype.has = function (e) {
                  var t = this.__data__;
                  return Ln ? t[e] !== i : je.call(t, e);
                }),
                ($n.prototype.set = function (e, t) {
                  var n = this.__data__;
                  return (
                    (this.size += this.has(e) ? 0 : 1),
                    (n[e] = Ln && t === i ? a : t),
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
                  return n < 0 ? i : t[n][1];
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
                (zn.prototype.clear = function () {
                  (this.size = 0),
                    (this.__data__ = {
                      hash: new $n(),
                      map: new (Tn || Gn)(),
                      string: new $n(),
                    });
                }),
                (zn.prototype.delete = function (e) {
                  var t = ps(this, e).delete(e);
                  return (this.size -= t ? 1 : 0), t;
                }),
                (zn.prototype.get = function (e) {
                  return ps(this, e).get(e);
                }),
                (zn.prototype.has = function (e) {
                  return ps(this, e).has(e);
                }),
                (zn.prototype.set = function (e, t) {
                  var n = ps(this, e),
                    o = n.size;
                  return n.set(e, t), (this.size += n.size == o ? 0 : 1), this;
                }),
                (Yn.prototype.add = Yn.prototype.push =
                  function (e) {
                    return this.__data__.set(e, a), this;
                  }),
                (Yn.prototype.has = function (e) {
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
                    if (!Tn || o.length < 199)
                      return o.push([e, t]), (this.size = ++n.size), this;
                    n = this.__data__ = new zn(o);
                  }
                  return n.set(e, t), (this.size = n.size), this;
                });
              var fo = Di(ko),
                ho = Di(So, !0);
              function _o(e, t) {
                var n = !0;
                return (
                  fo(e, function (e, o, i) {
                    return (n = !!t(e, o, i));
                  }),
                  n
                );
              }
              function go(e, t, n) {
                for (var o = -1, s = e.length; ++o < s; ) {
                  var a = e[o],
                    r = t(a);
                  if (null != r && (l === i ? r == r && !lr(r) : n(r, l)))
                    var l = r,
                      c = a;
                }
                return c;
              }
              function vo(e, t) {
                var n = [];
                return (
                  fo(e, function (e, o, i) {
                    t(e, o, i) && n.push(e);
                  }),
                  n
                );
              }
              function yo(e, t, n, o, i) {
                var s = -1,
                  a = e.length;
                for (n || (n = ys), i || (i = []); ++s < a; ) {
                  var r = e[s];
                  t > 0 && n(r)
                    ? t > 1
                      ? yo(r, t - 1, n, o, i)
                      : Mt(i, r)
                    : o || (i[i.length] = r);
                }
                return i;
              }
              var bo = Mi(),
                Eo = Mi(!0);
              function ko(e, t) {
                return e && bo(e, t, Pr);
              }
              function So(e, t) {
                return e && Eo(e, t, Pr);
              }
              function xo(e, t) {
                return Rt(t, function (t) {
                  return Xa(e[t]);
                });
              }
              function wo(e, t) {
                for (var n = 0, o = (t = Ei(t, e)).length; null != e && n < o; )
                  e = e[js(t[n++])];
                return n && n == o ? e : i;
              }
              function To(e, t, n) {
                var o = t(e);
                return Ka(e) ? o : Mt(o, n(e));
              }
              function Co(e) {
                return null == e
                  ? e === i
                    ? "[object Undefined]"
                    : "[object Null]"
                  : nt && nt in Oe(e)
                    ? (function (e) {
                        var t = je.call(e, nt),
                          n = e[nt];
                        try {
                          e[nt] = i;
                          var o = !0;
                        } catch (e) {}
                        var s = Ve.call(e);
                        o && (t ? (e[nt] = n) : delete e[nt]);
                        return s;
                      })(e)
                    : (function (e) {
                        return Ve.call(e);
                      })(e);
              }
              function Oo(e, t) {
                return e > t;
              }
              function Io(e, t) {
                return null != e && je.call(e, t);
              }
              function Lo(e, t) {
                return null != e && t in Oe(e);
              }
              function Po(e, t, n) {
                for (
                  var s = n ? Nt : At,
                    a = e[0].length,
                    r = e.length,
                    l = r,
                    c = o(r),
                    u = 1 / 0,
                    p = [];
                  l--;

                ) {
                  var d = e[l];
                  l && t && (d = Dt(d, Zt(t))),
                    (u = bn(d.length, u)),
                    (c[l] =
                      !n && (t || (a >= 120 && d.length >= 120))
                        ? new Yn(l && d)
                        : i);
                }
                d = e[0];
                var m = -1,
                  f = c[0];
                e: for (; ++m < a && p.length < u; ) {
                  var h = d[m],
                    _ = t ? t(h) : h;
                  if (
                    ((h = n || 0 !== h ? h : 0), !(f ? en(f, _) : s(p, _, n)))
                  ) {
                    for (l = r; --l; ) {
                      var g = c[l];
                      if (!(g ? en(g, _) : s(e[l], _, n))) continue e;
                    }
                    f && f.push(_), p.push(h);
                  }
                }
                return p;
              }
              function Ro(e, t, n) {
                var o = null == (e = Is(e, (t = Ei(t, e)))) ? e : e[js(Qs(t))];
                return null == o ? i : Ct(o, e, n);
              }
              function Ao(e) {
                return tr(e) && Co(e) == v;
              }
              function No(e, t, n, o, s) {
                return (
                  e === t ||
                  (null == e || null == t || (!tr(e) && !tr(t))
                    ? e != e && t != t
                    : (function (e, t, n, o, s, a) {
                        var r = Ka(e),
                          l = Ka(t),
                          c = r ? y : _s(e),
                          u = l ? y : _s(t),
                          p = (c = c == v ? C : c) == C,
                          d = (u = u == v ? C : u) == C,
                          m = c == u;
                        if (m && za(e)) {
                          if (!za(t)) return !1;
                          (r = !0), (p = !1);
                        }
                        if (m && !p)
                          return (
                            a || (a = new Qn()),
                            r || cr(e)
                              ? os(e, t, n, o, s, a)
                              : (function (e, t, n, o, i, s, a) {
                                  switch (n) {
                                    case D:
                                      if (
                                        e.byteLength != t.byteLength ||
                                        e.byteOffset != t.byteOffset
                                      )
                                        return !1;
                                      (e = e.buffer), (t = t.buffer);
                                    case N:
                                      return !(
                                        e.byteLength != t.byteLength ||
                                        !s(new $e(e), new $e(t))
                                      );
                                    case b:
                                    case E:
                                    case T:
                                      return Va(+e, +t);
                                    case k:
                                      return (
                                        e.name == t.name &&
                                        e.message == t.message
                                      );
                                    case I:
                                    case P:
                                      return e == t + "";
                                    case w:
                                      var r = ln;
                                    case L:
                                      var l = 1 & o;
                                      if (
                                        (r || (r = dn), e.size != t.size && !l)
                                      )
                                        return !1;
                                      var c = a.get(e);
                                      if (c) return c == t;
                                      (o |= 2), a.set(e, t);
                                      var u = os(r(e), r(t), o, i, s, a);
                                      return a.delete(e), u;
                                    case R:
                                      if (Un) return Un.call(e) == Un.call(t);
                                  }
                                  return !1;
                                })(e, t, c, n, o, s, a)
                          );
                        if (!(1 & n)) {
                          var f = p && je.call(e, "__wrapped__"),
                            h = d && je.call(t, "__wrapped__");
                          if (f || h) {
                            var _ = f ? e.value() : e,
                              g = h ? t.value() : t;
                            return a || (a = new Qn()), s(_, g, n, o, a);
                          }
                        }
                        if (!m) return !1;
                        return (
                          a || (a = new Qn()),
                          (function (e, t, n, o, s, a) {
                            var r = 1 & n,
                              l = ss(e),
                              c = l.length,
                              u = ss(t),
                              p = u.length;
                            if (c != p && !r) return !1;
                            var d = c;
                            for (; d--; ) {
                              var m = l[d];
                              if (!(r ? m in t : je.call(t, m))) return !1;
                            }
                            var f = a.get(e);
                            if (f && a.get(t)) return f == t;
                            var h = !0;
                            a.set(e, t), a.set(t, e);
                            var _ = r;
                            for (; ++d < c; ) {
                              var g = e[(m = l[d])],
                                v = t[m];
                              if (o)
                                var y = r
                                  ? o(v, g, m, t, e, a)
                                  : o(g, v, m, e, t, a);
                              if (
                                !(y === i ? g === v || s(g, v, n, o, a) : y)
                              ) {
                                h = !1;
                                break;
                              }
                              _ || (_ = "constructor" == m);
                            }
                            if (h && !_) {
                              var b = e.constructor,
                                E = t.constructor;
                              b == E ||
                                !("constructor" in e) ||
                                !("constructor" in t) ||
                                ("function" == typeof b &&
                                  b instanceof b &&
                                  "function" == typeof E &&
                                  E instanceof E) ||
                                (h = !1);
                            }
                            return a.delete(e), a.delete(t), h;
                          })(e, t, n, o, s, a)
                        );
                      })(e, t, n, o, No, s))
                );
              }
              function Do(e, t, n, o) {
                var s = n.length,
                  a = s,
                  r = !o;
                if (null == e) return !a;
                for (e = Oe(e); s--; ) {
                  var l = n[s];
                  if (r && l[2] ? l[1] !== e[l[0]] : !(l[0] in e)) return !1;
                }
                for (; ++s < a; ) {
                  var c = (l = n[s])[0],
                    u = e[c],
                    p = l[1];
                  if (r && l[2]) {
                    if (u === i && !(c in e)) return !1;
                  } else {
                    var d = new Qn();
                    if (o) var m = o(u, p, c, e, t, d);
                    if (!(m === i ? No(p, u, 3, o, d) : m)) return !1;
                  }
                }
                return !0;
              }
              function Mo(e) {
                return (
                  !(!er(e) || ((t = e), Ue && Ue in t)) &&
                  (Xa(e) ? We : ve).test(Fs(e))
                );
                var t;
              }
              function jo(e) {
                return "function" == typeof e
                  ? e
                  : null == e
                    ? ol
                    : "object" == typeof e
                      ? Ka(e)
                        ? Wo(e[0], e[1])
                        : Ho(e)
                      : dl(e);
              }
              function Fo(e) {
                if (!ws(e)) return vn(e);
                var t = [];
                for (var n in Oe(e))
                  je.call(e, n) && "constructor" != n && t.push(n);
                return t;
              }
              function Uo(e) {
                if (!er(e))
                  return (function (e) {
                    var t = [];
                    if (null != e) for (var n in Oe(e)) t.push(n);
                    return t;
                  })(e);
                var t = ws(e),
                  n = [];
                for (var o in e)
                  ("constructor" != o || (!t && je.call(e, o))) && n.push(o);
                return n;
              }
              function Vo(e, t) {
                return e < t;
              }
              function Bo(e, t) {
                var n = -1,
                  i = $a(e) ? o(e.length) : [];
                return (
                  fo(e, function (e, o, s) {
                    i[++n] = t(e, o, s);
                  }),
                  i
                );
              }
              function Ho(e) {
                var t = ds(e);
                return 1 == t.length && t[0][2]
                  ? Cs(t[0][0], t[0][1])
                  : function (n) {
                      return n === e || Do(n, e, t);
                    };
              }
              function Wo(e, t) {
                return ks(e) && Ts(t)
                  ? Cs(js(e), t)
                  : function (n) {
                      var o = Tr(n, e);
                      return o === i && o === t ? Cr(n, e) : No(t, o, 3);
                    };
              }
              function Ko(e, t, n, o, s) {
                e !== t &&
                  bo(
                    t,
                    function (a, r) {
                      if (er(a))
                        s || (s = new Qn()),
                          (function (e, t, n, o, s, a, r) {
                            var l = pn(e, n),
                              c = pn(t, n),
                              u = r.get(c);
                            if (u) return void to(e, n, u);
                            var p = a ? a(l, c, n + "", e, t, r) : i,
                              d = p === i;
                            if (d) {
                              var m = Ka(c),
                                f = !m && za(c),
                                h = !m && !f && cr(c);
                              (p = c),
                                m || f || h
                                  ? Ka(l)
                                    ? (p = l)
                                    : Ga(l)
                                      ? (p = Pi(l))
                                      : f
                                        ? ((d = !1), (p = wi(c, !0)))
                                        : h
                                          ? ((d = !1), (p = Ci(c, !0)))
                                          : (p = [])
                                  : ir(c) || Wa(c)
                                    ? ((p = l),
                                      Wa(l)
                                        ? (p = gr(l))
                                        : (!er(l) || (o && Xa(l))) &&
                                          (p = vs(c)))
                                    : (d = !1);
                            }
                            d && (r.set(c, p), s(p, c, o, a, r), r.delete(c));
                            to(e, n, p);
                          })(e, t, r, n, Ko, o, s);
                      else {
                        var l = o ? o(pn(e, r), a, r + "", e, t, s) : i;
                        l === i && (l = a), to(e, r, l);
                      }
                    },
                    Rr,
                  );
              }
              function qo(e, t) {
                var n = e.length;
                if (n) return bs((t += t < 0 ? n : 0), n) ? e[t] : i;
              }
              function $o(e, t, n) {
                var o = -1;
                t = Dt(t.length ? t : [ol], Zt(us()));
                var i = Bo(e, function (e, n, i) {
                  var s = Dt(t, function (t) {
                    return t(e);
                  });
                  return { criteria: s, index: ++o, value: e };
                });
                return (function (e, t) {
                  var n = e.length;
                  for (e.sort(t); n--; ) e[n] = e[n].value;
                  return e;
                })(i, function (e, t) {
                  return (function (e, t, n) {
                    var o = -1,
                      i = e.criteria,
                      s = t.criteria,
                      a = i.length,
                      r = n.length;
                    for (; ++o < a; ) {
                      var l = Oi(i[o], s[o]);
                      if (l) return o >= r ? l : l * ("desc" == n[o] ? -1 : 1);
                    }
                    return e.index - t.index;
                  })(e, t, n);
                });
              }
              function Go(e, t, n) {
                for (var o = -1, i = t.length, s = {}; ++o < i; ) {
                  var a = t[o],
                    r = wo(e, a);
                  n(r, a) && ti(s, Ei(a, e), r);
                }
                return s;
              }
              function zo(e, t, n, o) {
                var i = o ? Kt : Wt,
                  s = -1,
                  a = t.length,
                  r = e;
                for (e === t && (t = Pi(t)), n && (r = Dt(e, Zt(n))); ++s < a; )
                  for (
                    var l = 0, c = t[s], u = n ? n(c) : c;
                    (l = i(r, u, l, o)) > -1;

                  )
                    r !== e && Xe.call(r, l, 1), Xe.call(e, l, 1);
                return e;
              }
              function Yo(e, t) {
                for (var n = e ? t.length : 0, o = n - 1; n--; ) {
                  var i = t[n];
                  if (n == o || i !== s) {
                    var s = i;
                    bs(i) ? Xe.call(e, i, 1) : mi(e, i);
                  }
                }
                return e;
              }
              function Qo(e, t) {
                return e + gt(Sn() * (t - e + 1));
              }
              function Xo(e, t) {
                var n = "";
                if (!e || t < 1 || t > f) return n;
                do {
                  t % 2 && (n += e), (t = gt(t / 2)) && (e += e);
                } while (t);
                return n;
              }
              function Zo(e, t) {
                return Rs(Os(e, t, ol), e + "");
              }
              function Jo(e) {
                return Zn(Vr(e));
              }
              function ei(e, t) {
                var n = Vr(e);
                return Ds(n, lo(t, 0, n.length));
              }
              function ti(e, t, n, o) {
                if (!er(e)) return e;
                for (
                  var s = -1, a = (t = Ei(t, e)).length, r = a - 1, l = e;
                  null != l && ++s < a;

                ) {
                  var c = js(t[s]),
                    u = n;
                  if (s != r) {
                    var p = l[c];
                    (u = o ? o(p, c, l) : i) === i &&
                      (u = er(p) ? p : bs(t[s + 1]) ? [] : {});
                  }
                  no(l, c, u), (l = l[c]);
                }
                return e;
              }
              var ni = Pn
                  ? function (e, t) {
                      return Pn.set(e, t), e;
                    }
                  : ol,
                oi = it
                  ? function (e, t) {
                      return it(e, "toString", {
                        configurable: !0,
                        enumerable: !1,
                        value: el(t),
                        writable: !0,
                      });
                    }
                  : ol;
              function ii(e) {
                return Ds(Vr(e));
              }
              function si(e, t, n) {
                var i = -1,
                  s = e.length;
                t < 0 && (t = -t > s ? 0 : s + t),
                  (n = n > s ? s : n) < 0 && (n += s),
                  (s = t > n ? 0 : (n - t) >>> 0),
                  (t >>>= 0);
                for (var a = o(s); ++i < s; ) a[i] = e[i + t];
                return a;
              }
              function ai(e, t) {
                var n;
                return (
                  fo(e, function (e, o, i) {
                    return !(n = t(e, o, i));
                  }),
                  !!n
                );
              }
              function ri(e, t, n) {
                var o = 0,
                  i = null == e ? o : e.length;
                if ("number" == typeof t && t == t && i <= 2147483647) {
                  for (; o < i; ) {
                    var s = (o + i) >>> 1,
                      a = e[s];
                    null !== a && !lr(a) && (n ? a <= t : a < t)
                      ? (o = s + 1)
                      : (i = s);
                  }
                  return i;
                }
                return li(e, t, ol, n);
              }
              function li(e, t, n, o) {
                t = n(t);
                for (
                  var s = 0,
                    a = null == e ? 0 : e.length,
                    r = t != t,
                    l = null === t,
                    c = lr(t),
                    u = t === i;
                  s < a;

                ) {
                  var p = gt((s + a) / 2),
                    d = n(e[p]),
                    m = d !== i,
                    f = null === d,
                    h = d == d,
                    _ = lr(d);
                  if (r) var g = o || h;
                  else
                    g = u
                      ? h && (o || m)
                      : l
                        ? h && m && (o || !f)
                        : c
                          ? h && m && !f && (o || !_)
                          : !f && !_ && (o ? d <= t : d < t);
                  g ? (s = p + 1) : (a = p);
                }
                return bn(a, 4294967294);
              }
              function ci(e, t) {
                for (var n = -1, o = e.length, i = 0, s = []; ++n < o; ) {
                  var a = e[n],
                    r = t ? t(a) : a;
                  if (!n || !Va(r, l)) {
                    var l = r;
                    s[i++] = 0 === a ? 0 : a;
                  }
                }
                return s;
              }
              function ui(e) {
                return "number" == typeof e ? e : lr(e) ? h : +e;
              }
              function pi(e) {
                if ("string" == typeof e) return e;
                if (Ka(e)) return Dt(e, pi) + "";
                if (lr(e)) return Vn ? Vn.call(e) : "";
                var t = e + "";
                return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
              }
              function di(e, t, n) {
                var o = -1,
                  i = At,
                  s = e.length,
                  a = !0,
                  r = [],
                  l = r;
                if (n) (a = !1), (i = Nt);
                else if (s >= 200) {
                  var c = t ? null : Xi(e);
                  if (c) return dn(c);
                  (a = !1), (i = en), (l = new Yn());
                } else l = t ? [] : r;
                e: for (; ++o < s; ) {
                  var u = e[o],
                    p = t ? t(u) : u;
                  if (((u = n || 0 !== u ? u : 0), a && p == p)) {
                    for (var d = l.length; d--; ) if (l[d] === p) continue e;
                    t && l.push(p), r.push(u);
                  } else i(l, p, n) || (l !== r && l.push(p), r.push(u));
                }
                return r;
              }
              function mi(e, t) {
                return (
                  null == (e = Is(e, (t = Ei(t, e)))) || delete e[js(Qs(t))]
                );
              }
              function fi(e, t, n, o) {
                return ti(e, t, n(wo(e, t)), o);
              }
              function hi(e, t, n, o) {
                for (
                  var i = e.length, s = o ? i : -1;
                  (o ? s-- : ++s < i) && t(e[s], s, e);

                );
                return n
                  ? si(e, o ? 0 : s, o ? s + 1 : i)
                  : si(e, o ? s + 1 : 0, o ? i : s);
              }
              function _i(e, t) {
                var n = e;
                return (
                  n instanceof qn && (n = n.value()),
                  jt(
                    t,
                    function (e, t) {
                      return t.func.apply(t.thisArg, Mt([e], t.args));
                    },
                    n,
                  )
                );
              }
              function gi(e, t, n) {
                var i = e.length;
                if (i < 2) return i ? di(e[0]) : [];
                for (var s = -1, a = o(i); ++s < i; )
                  for (var r = e[s], l = -1; ++l < i; )
                    l != s && (a[s] = mo(a[s] || r, e[l], t, n));
                return di(yo(a, 1), t, n);
              }
              function vi(e, t, n) {
                for (
                  var o = -1, s = e.length, a = t.length, r = {};
                  ++o < s;

                ) {
                  var l = o < a ? t[o] : i;
                  n(r, e[o], l);
                }
                return r;
              }
              function yi(e) {
                return Ga(e) ? e : [];
              }
              function bi(e) {
                return "function" == typeof e ? e : ol;
              }
              function Ei(e, t) {
                return Ka(e) ? e : ks(e, t) ? [e] : Ms(vr(e));
              }
              var ki = Zo;
              function Si(e, t, n) {
                var o = e.length;
                return (n = n === i ? o : n), !t && n >= o ? e : si(e, t, n);
              }
              var xi =
                ut ||
                function (e) {
                  return ht.clearTimeout(e);
                };
              function wi(e, t) {
                if (t) return e.slice();
                var n = e.length,
                  o = Ge ? Ge(n) : new e.constructor(n);
                return e.copy(o), o;
              }
              function Ti(e) {
                var t = new e.constructor(e.byteLength);
                return new $e(t).set(new $e(e)), t;
              }
              function Ci(e, t) {
                var n = t ? Ti(e.buffer) : e.buffer;
                return new e.constructor(n, e.byteOffset, e.length);
              }
              function Oi(e, t) {
                if (e !== t) {
                  var n = e !== i,
                    o = null === e,
                    s = e == e,
                    a = lr(e),
                    r = t !== i,
                    l = null === t,
                    c = t == t,
                    u = lr(t);
                  if (
                    (!l && !u && !a && e > t) ||
                    (a && r && c && !l && !u) ||
                    (o && r && c) ||
                    (!n && c) ||
                    !s
                  )
                    return 1;
                  if (
                    (!o && !a && !u && e < t) ||
                    (u && n && s && !o && !a) ||
                    (l && n && s) ||
                    (!r && s) ||
                    !c
                  )
                    return -1;
                }
                return 0;
              }
              function Ii(e, t, n, i) {
                for (
                  var s = -1,
                    a = e.length,
                    r = n.length,
                    l = -1,
                    c = t.length,
                    u = yn(a - r, 0),
                    p = o(c + u),
                    d = !i;
                  ++l < c;

                )
                  p[l] = t[l];
                for (; ++s < r; ) (d || s < a) && (p[n[s]] = e[s]);
                for (; u--; ) p[l++] = e[s++];
                return p;
              }
              function Li(e, t, n, i) {
                for (
                  var s = -1,
                    a = e.length,
                    r = -1,
                    l = n.length,
                    c = -1,
                    u = t.length,
                    p = yn(a - l, 0),
                    d = o(p + u),
                    m = !i;
                  ++s < p;

                )
                  d[s] = e[s];
                for (var f = s; ++c < u; ) d[f + c] = t[c];
                for (; ++r < l; ) (m || s < a) && (d[f + n[r]] = e[s++]);
                return d;
              }
              function Pi(e, t) {
                var n = -1,
                  i = e.length;
                for (t || (t = o(i)); ++n < i; ) t[n] = e[n];
                return t;
              }
              function Ri(e, t, n, o) {
                var s = !n;
                n || (n = {});
                for (var a = -1, r = t.length; ++a < r; ) {
                  var l = t[a],
                    c = o ? o(n[l], e[l], l, n, e) : i;
                  c === i && (c = e[l]), s ? ao(n, l, c) : no(n, l, c);
                }
                return n;
              }
              function Ai(e, t) {
                return function (n, o) {
                  var i = Ka(n) ? Ot : io,
                    s = t ? t() : {};
                  return i(n, e, us(o, 2), s);
                };
              }
              function Ni(e) {
                return Zo(function (t, n) {
                  var o = -1,
                    s = n.length,
                    a = s > 1 ? n[s - 1] : i,
                    r = s > 2 ? n[2] : i;
                  for (
                    a = e.length > 3 && "function" == typeof a ? (s--, a) : i,
                      r && Es(n[0], n[1], r) && ((a = s < 3 ? i : a), (s = 1)),
                      t = Oe(t);
                    ++o < s;

                  ) {
                    var l = n[o];
                    l && e(t, l, o, a);
                  }
                  return t;
                });
              }
              function Di(e, t) {
                return function (n, o) {
                  if (null == n) return n;
                  if (!$a(n)) return e(n, o);
                  for (
                    var i = n.length, s = t ? i : -1, a = Oe(n);
                    (t ? s-- : ++s < i) && !1 !== o(a[s], s, a);

                  );
                  return n;
                };
              }
              function Mi(e) {
                return function (t, n, o) {
                  for (var i = -1, s = Oe(t), a = o(t), r = a.length; r--; ) {
                    var l = a[e ? r : ++i];
                    if (!1 === n(s[l], l, s)) break;
                  }
                  return t;
                };
              }
              function ji(e) {
                return function (t) {
                  var n = rn((t = vr(t))) ? hn(t) : i,
                    o = n ? n[0] : t.charAt(0),
                    s = n ? Si(n, 1).join("") : t.slice(1);
                  return o[e]() + s;
                };
              }
              function Fi(e) {
                return function (t) {
                  return jt(Xr(Wr(t).replace(et, "")), e, "");
                };
              }
              function Ui(e) {
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
              function Vi(e) {
                return function (t, n, o) {
                  var s = Oe(t);
                  if (!$a(t)) {
                    var a = us(n, 3);
                    (t = Pr(t)),
                      (n = function (e) {
                        return a(s[e], e, s);
                      });
                  }
                  var r = e(t, n, o);
                  return r > -1 ? s[a ? t[r] : r] : i;
                };
              }
              function Bi(e) {
                return is(function (t) {
                  var n = t.length,
                    o = n,
                    a = Kn.prototype.thru;
                  for (e && t.reverse(); o--; ) {
                    var r = t[o];
                    if ("function" != typeof r) throw new Pe(s);
                    if (a && !l && "wrapper" == ls(r)) var l = new Kn([], !0);
                  }
                  for (o = l ? o : n; ++o < n; ) {
                    var c = ls((r = t[o])),
                      u = "wrapper" == c ? rs(r) : i;
                    l =
                      u && Ss(u[0]) && 424 == u[1] && !u[4].length && 1 == u[9]
                        ? l[ls(u[0])].apply(l, u[3])
                        : 1 == r.length && Ss(r)
                          ? l[c]()
                          : l.thru(r);
                  }
                  return function () {
                    var e = arguments,
                      o = e[0];
                    if (l && 1 == e.length && Ka(o)) return l.plant(o).value();
                    for (var i = 0, s = n ? t[i].apply(this, e) : o; ++i < n; )
                      s = t[i].call(this, s);
                    return s;
                  };
                });
              }
              function Hi(e, t, n, s, a, r, l, c, u, d) {
                var m = t & p,
                  f = 1 & t,
                  h = 2 & t,
                  _ = 24 & t,
                  g = 512 & t,
                  v = h ? i : Ui(e);
                return function p() {
                  for (var y = arguments.length, b = o(y), E = y; E--; )
                    b[E] = arguments[E];
                  if (_)
                    var k = cs(p),
                      S = (function (e, t) {
                        for (var n = e.length, o = 0; n--; ) e[n] === t && ++o;
                        return o;
                      })(b, k);
                  if (
                    (s && (b = Ii(b, s, a, _)),
                    r && (b = Li(b, r, l, _)),
                    (y -= S),
                    _ && y < d)
                  ) {
                    var x = un(b, k);
                    return Yi(e, t, Hi, p.placeholder, n, b, x, c, u, d - y);
                  }
                  var w = f ? n : this,
                    T = h ? w[e] : e;
                  return (
                    (y = b.length),
                    c
                      ? (b = (function (e, t) {
                          var n = e.length,
                            o = bn(t.length, n),
                            s = Pi(e);
                          for (; o--; ) {
                            var a = t[o];
                            e[o] = bs(a, n) ? s[a] : i;
                          }
                          return e;
                        })(b, c))
                      : g && y > 1 && b.reverse(),
                    m && u < y && (b.length = u),
                    this &&
                      this !== ht &&
                      this instanceof p &&
                      (T = v || Ui(T)),
                    T.apply(w, b)
                  );
                };
              }
              function Wi(e, t) {
                return function (n, o) {
                  return (function (e, t, n, o) {
                    return (
                      ko(e, function (e, i, s) {
                        t(o, n(e), i, s);
                      }),
                      o
                    );
                  })(n, e, t(o), {});
                };
              }
              function Ki(e, t) {
                return function (n, o) {
                  var s;
                  if (n === i && o === i) return t;
                  if ((n !== i && (s = n), o !== i)) {
                    if (s === i) return o;
                    "string" == typeof n || "string" == typeof o
                      ? ((n = pi(n)), (o = pi(o)))
                      : ((n = ui(n)), (o = ui(o))),
                      (s = e(n, o));
                  }
                  return s;
                };
              }
              function qi(e) {
                return is(function (t) {
                  return (
                    (t = Dt(t, Zt(us()))),
                    Zo(function (n) {
                      var o = this;
                      return e(t, function (e) {
                        return Ct(e, o, n);
                      });
                    })
                  );
                });
              }
              function $i(e, t) {
                var n = (t = t === i ? " " : pi(t)).length;
                if (n < 2) return n ? Xo(t, e) : t;
                var o = Xo(t, _t(e / fn(t)));
                return rn(t) ? Si(hn(o), 0, e).join("") : o.slice(0, e);
              }
              function Gi(e) {
                return function (t, n, s) {
                  return (
                    s && "number" != typeof s && Es(t, n, s) && (n = s = i),
                    (t = mr(t)),
                    n === i ? ((n = t), (t = 0)) : (n = mr(n)),
                    (function (e, t, n, i) {
                      for (
                        var s = -1, a = yn(_t((t - e) / (n || 1)), 0), r = o(a);
                        a--;

                      )
                        (r[i ? a : ++s] = e), (e += n);
                      return r;
                    })(t, n, (s = s === i ? (t < n ? 1 : -1) : mr(s)), e)
                  );
                };
              }
              function zi(e) {
                return function (t, n) {
                  return (
                    ("string" == typeof t && "string" == typeof n) ||
                      ((t = _r(t)), (n = _r(n))),
                    e(t, n)
                  );
                };
              }
              function Yi(e, t, n, o, s, a, r, l, p, d) {
                var m = 8 & t;
                (t |= m ? c : u), 4 & (t &= ~(m ? u : c)) || (t &= -4);
                var f = [
                    e,
                    t,
                    s,
                    m ? a : i,
                    m ? r : i,
                    m ? i : a,
                    m ? i : r,
                    l,
                    p,
                    d,
                  ],
                  h = n.apply(i, f);
                return Ss(e) && Ls(h, f), (h.placeholder = o), As(h, e, t);
              }
              function Qi(e) {
                var t = Ce[e];
                return function (e, n) {
                  if (((e = _r(e)), (n = null == n ? 0 : bn(fr(n), 292)))) {
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
              var Xi =
                On && 1 / dn(new On([, -0]))[1] == m
                  ? function (e) {
                      return new On(e);
                    }
                  : ll;
              function Zi(e) {
                return function (t) {
                  var n = _s(t);
                  return n == w
                    ? ln(t)
                    : n == L
                      ? mn(t)
                      : (function (e, t) {
                          return Dt(t, function (t) {
                            return [t, e[t]];
                          });
                        })(t, e(t));
                };
              }
              function Ji(e, t, n, a, m, f, h, _) {
                var g = 2 & t;
                if (!g && "function" != typeof e) throw new Pe(s);
                var v = a ? a.length : 0;
                if (
                  (v || ((t &= -97), (a = m = i)),
                  (h = h === i ? h : yn(fr(h), 0)),
                  (_ = _ === i ? _ : fr(_)),
                  (v -= m ? m.length : 0),
                  t & u)
                ) {
                  var y = a,
                    b = m;
                  a = m = i;
                }
                var E = g ? i : rs(e),
                  k = [e, t, n, a, m, y, b, f, h, _];
                if (
                  (E &&
                    (function (e, t) {
                      var n = e[1],
                        o = t[1],
                        i = n | o,
                        s = i < 131,
                        a =
                          (o == p && 8 == n) ||
                          (o == p && n == d && e[7].length <= t[8]) ||
                          (384 == o && t[7].length <= t[8] && 8 == n);
                      if (!s && !a) return e;
                      1 & o && ((e[2] = t[2]), (i |= 1 & n ? 0 : 4));
                      var l = t[3];
                      if (l) {
                        var c = e[3];
                        (e[3] = c ? Ii(c, l, t[4]) : l),
                          (e[4] = c ? un(e[3], r) : t[4]);
                      }
                      (l = t[5]) &&
                        ((c = e[5]),
                        (e[5] = c ? Li(c, l, t[6]) : l),
                        (e[6] = c ? un(e[5], r) : t[6]));
                      (l = t[7]) && (e[7] = l);
                      o & p && (e[8] = null == e[8] ? t[8] : bn(e[8], t[8]));
                      null == e[9] && (e[9] = t[9]);
                      (e[0] = t[0]), (e[1] = i);
                    })(k, E),
                  (e = k[0]),
                  (t = k[1]),
                  (n = k[2]),
                  (a = k[3]),
                  (m = k[4]),
                  !(_ = k[9] =
                    k[9] === i ? (g ? 0 : e.length) : yn(k[9] - v, 0)) &&
                    24 & t &&
                    (t &= -25),
                  t && 1 != t)
                )
                  S =
                    8 == t || t == l
                      ? (function (e, t, n) {
                          var s = Ui(e);
                          return function a() {
                            for (
                              var r = arguments.length,
                                l = o(r),
                                c = r,
                                u = cs(a);
                              c--;

                            )
                              l[c] = arguments[c];
                            var p =
                              r < 3 && l[0] !== u && l[r - 1] !== u
                                ? []
                                : un(l, u);
                            return (r -= p.length) < n
                              ? Yi(
                                  e,
                                  t,
                                  Hi,
                                  a.placeholder,
                                  i,
                                  l,
                                  p,
                                  i,
                                  i,
                                  n - r,
                                )
                              : Ct(
                                  this && this !== ht && this instanceof a
                                    ? s
                                    : e,
                                  this,
                                  l,
                                );
                          };
                        })(e, t, _)
                      : (t != c && 33 != t) || m.length
                        ? Hi.apply(i, k)
                        : (function (e, t, n, i) {
                            var s = 1 & t,
                              a = Ui(e);
                            return function t() {
                              for (
                                var r = -1,
                                  l = arguments.length,
                                  c = -1,
                                  u = i.length,
                                  p = o(u + l),
                                  d =
                                    this && this !== ht && this instanceof t
                                      ? a
                                      : e;
                                ++c < u;

                              )
                                p[c] = i[c];
                              for (; l--; ) p[c++] = arguments[++r];
                              return Ct(d, s ? n : this, p);
                            };
                          })(e, t, n, a);
                else
                  var S = (function (e, t, n) {
                    var o = 1 & t,
                      i = Ui(e);
                    return function t() {
                      return (
                        this && this !== ht && this instanceof t ? i : e
                      ).apply(o ? n : this, arguments);
                    };
                  })(e, t, n);
                return As((E ? ni : Ls)(S, k), e, t);
              }
              function es(e, t, n, o) {
                return e === i || (Va(e, Ne[n]) && !je.call(o, n)) ? t : e;
              }
              function ts(e, t, n, o, s, a) {
                return (
                  er(e) &&
                    er(t) &&
                    (a.set(t, e), Ko(e, t, i, ts, a), a.delete(t)),
                  e
                );
              }
              function ns(e) {
                return ir(e) ? i : e;
              }
              function os(e, t, n, o, s, a) {
                var r = 1 & n,
                  l = e.length,
                  c = t.length;
                if (l != c && !(r && c > l)) return !1;
                var u = a.get(e);
                if (u && a.get(t)) return u == t;
                var p = -1,
                  d = !0,
                  m = 2 & n ? new Yn() : i;
                for (a.set(e, t), a.set(t, e); ++p < l; ) {
                  var f = e[p],
                    h = t[p];
                  if (o) var _ = r ? o(h, f, p, t, e, a) : o(f, h, p, e, t, a);
                  if (_ !== i) {
                    if (_) continue;
                    d = !1;
                    break;
                  }
                  if (m) {
                    if (
                      !Ut(t, function (e, t) {
                        if (!en(m, t) && (f === e || s(f, e, n, o, a)))
                          return m.push(t);
                      })
                    ) {
                      d = !1;
                      break;
                    }
                  } else if (f !== h && !s(f, h, n, o, a)) {
                    d = !1;
                    break;
                  }
                }
                return a.delete(e), a.delete(t), d;
              }
              function is(e) {
                return Rs(Os(e, i, qs), e + "");
              }
              function ss(e) {
                return To(e, Pr, fs);
              }
              function as(e) {
                return To(e, Rr, hs);
              }
              var rs = Pn
                ? function (e) {
                    return Pn.get(e);
                  }
                : ll;
              function ls(e) {
                for (
                  var t = e.name + "",
                    n = Rn[t],
                    o = je.call(Rn, t) ? n.length : 0;
                  o--;

                ) {
                  var i = n[o],
                    s = i.func;
                  if (null == s || s == e) return i.name;
                }
                return t;
              }
              function cs(e) {
                return (je.call(Bn, "placeholder") ? Bn : e).placeholder;
              }
              function us() {
                var e = Bn.iteratee || il;
                return (
                  (e = e === il ? jo : e),
                  arguments.length ? e(arguments[0], arguments[1]) : e
                );
              }
              function ps(e, t) {
                var n,
                  o,
                  i = e.__data__;
                return (
                  "string" == (o = typeof (n = t)) ||
                  "number" == o ||
                  "symbol" == o ||
                  "boolean" == o
                    ? "__proto__" !== n
                    : null === n
                )
                  ? i["string" == typeof t ? "string" : "hash"]
                  : i.map;
              }
              function ds(e) {
                for (var t = Pr(e), n = t.length; n--; ) {
                  var o = t[n],
                    i = e[o];
                  t[n] = [o, i, Ts(i)];
                }
                return t;
              }
              function ms(e, t) {
                var n = (function (e, t) {
                  return null == e ? i : e[t];
                })(e, t);
                return Mo(n) ? n : i;
              }
              var fs = yt
                  ? function (e) {
                      return null == e
                        ? []
                        : ((e = Oe(e)),
                          Rt(yt(e), function (t) {
                            return Qe.call(e, t);
                          }));
                    }
                  : hl,
                hs = yt
                  ? function (e) {
                      for (var t = []; e; ) Mt(t, fs(e)), (e = ze(e));
                      return t;
                    }
                  : hl,
                _s = Co;
              function gs(e, t, n) {
                for (var o = -1, i = (t = Ei(t, e)).length, s = !1; ++o < i; ) {
                  var a = js(t[o]);
                  if (!(s = null != e && n(e, a))) break;
                  e = e[a];
                }
                return s || ++o != i
                  ? s
                  : !!(i = null == e ? 0 : e.length) &&
                      Ja(i) &&
                      bs(a, i) &&
                      (Ka(e) || Wa(e));
              }
              function vs(e) {
                return "function" != typeof e.constructor || ws(e)
                  ? {}
                  : Hn(ze(e));
              }
              function ys(e) {
                return Ka(e) || Wa(e) || !!(Ze && e && e[Ze]);
              }
              function bs(e, t) {
                var n = typeof e;
                return (
                  !!(t = null == t ? f : t) &&
                  ("number" == n || ("symbol" != n && be.test(e))) &&
                  e > -1 &&
                  e % 1 == 0 &&
                  e < t
                );
              }
              function Es(e, t, n) {
                if (!er(n)) return !1;
                var o = typeof t;
                return (
                  !!("number" == o
                    ? $a(n) && bs(t, n.length)
                    : "string" == o && t in n) && Va(n[t], e)
                );
              }
              function ks(e, t) {
                if (Ka(e)) return !1;
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
                  (null != t && e in Oe(t))
                );
              }
              function Ss(e) {
                var t = ls(e),
                  n = Bn[t];
                if ("function" != typeof n || !(t in qn.prototype)) return !1;
                if (e === n) return !0;
                var o = rs(n);
                return !!o && e === o[0];
              }
              ((wn && _s(new wn(new ArrayBuffer(1))) != D) ||
                (Tn && _s(new Tn()) != w) ||
                (Cn && _s(Cn.resolve()) != O) ||
                (On && _s(new On()) != L) ||
                (In && _s(new In()) != A)) &&
                (_s = function (e) {
                  var t = Co(e),
                    n = t == C ? e.constructor : i,
                    o = n ? Fs(n) : "";
                  if (o)
                    switch (o) {
                      case An:
                        return D;
                      case Nn:
                        return w;
                      case Dn:
                        return O;
                      case Mn:
                        return L;
                      case jn:
                        return A;
                    }
                  return t;
                });
              var xs = De ? Xa : _l;
              function ws(e) {
                var t = e && e.constructor;
                return e === (("function" == typeof t && t.prototype) || Ne);
              }
              function Ts(e) {
                return e == e && !er(e);
              }
              function Cs(e, t) {
                return function (n) {
                  return null != n && n[e] === t && (t !== i || e in Oe(n));
                };
              }
              function Os(e, t, n) {
                return (
                  (t = yn(t === i ? e.length - 1 : t, 0)),
                  function () {
                    for (
                      var i = arguments,
                        s = -1,
                        a = yn(i.length - t, 0),
                        r = o(a);
                      ++s < a;

                    )
                      r[s] = i[t + s];
                    s = -1;
                    for (var l = o(t + 1); ++s < t; ) l[s] = i[s];
                    return (l[t] = n(r)), Ct(e, this, l);
                  }
                );
              }
              function Is(e, t) {
                return t.length < 2 ? e : wo(e, si(t, 0, -1));
              }
              var Ls = Ns(ni),
                Ps =
                  ft ||
                  function (e, t) {
                    return ht.setTimeout(e, t);
                  },
                Rs = Ns(oi);
              function As(e, t, n) {
                var o = t + "";
                return Rs(
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
                        It(g, function (n) {
                          var o = "_." + n[0];
                          t & n[1] && !At(e, o) && e.push(o);
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
              function Ns(e) {
                var t = 0,
                  n = 0;
                return function () {
                  var o = En(),
                    s = 16 - (o - n);
                  if (((n = o), s > 0)) {
                    if (++t >= 800) return arguments[0];
                  } else t = 0;
                  return e.apply(i, arguments);
                };
              }
              function Ds(e, t) {
                var n = -1,
                  o = e.length,
                  s = o - 1;
                for (t = t === i ? o : t; ++n < t; ) {
                  var a = Qo(n, s),
                    r = e[a];
                  (e[a] = e[n]), (e[n] = r);
                }
                return (e.length = t), e;
              }
              var Ms = (function (e) {
                var t = Na(e, function (e) {
                    return 500 === n.size && n.clear(), e;
                  }),
                  n = t.cache;
                return t;
              })(function (e) {
                var t = [];
                return (
                  46 === e.charCodeAt(0) && t.push(""),
                  e.replace(oe, function (e, n, o, i) {
                    t.push(o ? i.replace(me, "$1") : n || e);
                  }),
                  t
                );
              });
              function js(e) {
                if ("string" == typeof e || lr(e)) return e;
                var t = e + "";
                return "0" == t && 1 / e == -1 / 0 ? "-0" : t;
              }
              function Fs(e) {
                if (null != e) {
                  try {
                    return Me.call(e);
                  } catch (e) {}
                  try {
                    return e + "";
                  } catch (e) {}
                }
                return "";
              }
              function Us(e) {
                if (e instanceof qn) return e.clone();
                var t = new Kn(e.__wrapped__, e.__chain__);
                return (
                  (t.__actions__ = Pi(e.__actions__)),
                  (t.__index__ = e.__index__),
                  (t.__values__ = e.__values__),
                  t
                );
              }
              var Vs = Zo(function (e, t) {
                  return Ga(e) ? mo(e, yo(t, 1, Ga, !0)) : [];
                }),
                Bs = Zo(function (e, t) {
                  var n = Qs(t);
                  return (
                    Ga(n) && (n = i),
                    Ga(e) ? mo(e, yo(t, 1, Ga, !0), us(n, 2)) : []
                  );
                }),
                Hs = Zo(function (e, t) {
                  var n = Qs(t);
                  return (
                    Ga(n) && (n = i), Ga(e) ? mo(e, yo(t, 1, Ga, !0), i, n) : []
                  );
                });
              function Ws(e, t, n) {
                var o = null == e ? 0 : e.length;
                if (!o) return -1;
                var i = null == n ? 0 : fr(n);
                return i < 0 && (i = yn(o + i, 0)), Ht(e, us(t, 3), i);
              }
              function Ks(e, t, n) {
                var o = null == e ? 0 : e.length;
                if (!o) return -1;
                var s = o - 1;
                return (
                  n !== i &&
                    ((s = fr(n)), (s = n < 0 ? yn(o + s, 0) : bn(s, o - 1))),
                  Ht(e, us(t, 3), s, !0)
                );
              }
              function qs(e) {
                return (null == e ? 0 : e.length) ? yo(e, 1) : [];
              }
              function $s(e) {
                return e && e.length ? e[0] : i;
              }
              var Gs = Zo(function (e) {
                  var t = Dt(e, yi);
                  return t.length && t[0] === e[0] ? Po(t) : [];
                }),
                zs = Zo(function (e) {
                  var t = Qs(e),
                    n = Dt(e, yi);
                  return (
                    t === Qs(n) ? (t = i) : n.pop(),
                    n.length && n[0] === e[0] ? Po(n, us(t, 2)) : []
                  );
                }),
                Ys = Zo(function (e) {
                  var t = Qs(e),
                    n = Dt(e, yi);
                  return (
                    (t = "function" == typeof t ? t : i) && n.pop(),
                    n.length && n[0] === e[0] ? Po(n, i, t) : []
                  );
                });
              function Qs(e) {
                var t = null == e ? 0 : e.length;
                return t ? e[t - 1] : i;
              }
              var Xs = Zo(Zs);
              function Zs(e, t) {
                return e && e.length && t && t.length ? zo(e, t) : e;
              }
              var Js = is(function (e, t) {
                var n = null == e ? 0 : e.length,
                  o = ro(e, t);
                return (
                  Yo(
                    e,
                    Dt(t, function (e) {
                      return bs(e, n) ? +e : e;
                    }).sort(Oi),
                  ),
                  o
                );
              });
              function ea(e) {
                return null == e ? e : xn.call(e);
              }
              var ta = Zo(function (e) {
                  return di(yo(e, 1, Ga, !0));
                }),
                na = Zo(function (e) {
                  var t = Qs(e);
                  return Ga(t) && (t = i), di(yo(e, 1, Ga, !0), us(t, 2));
                }),
                oa = Zo(function (e) {
                  var t = Qs(e);
                  return (
                    (t = "function" == typeof t ? t : i),
                    di(yo(e, 1, Ga, !0), i, t)
                  );
                });
              function ia(e) {
                if (!e || !e.length) return [];
                var t = 0;
                return (
                  (e = Rt(e, function (e) {
                    if (Ga(e)) return (t = yn(e.length, t)), !0;
                  })),
                  Xt(t, function (t) {
                    return Dt(e, Gt(t));
                  })
                );
              }
              function sa(e, t) {
                if (!e || !e.length) return [];
                var n = ia(e);
                return null == t
                  ? n
                  : Dt(n, function (e) {
                      return Ct(t, i, e);
                    });
              }
              var aa = Zo(function (e, t) {
                  return Ga(e) ? mo(e, t) : [];
                }),
                ra = Zo(function (e) {
                  return gi(Rt(e, Ga));
                }),
                la = Zo(function (e) {
                  var t = Qs(e);
                  return Ga(t) && (t = i), gi(Rt(e, Ga), us(t, 2));
                }),
                ca = Zo(function (e) {
                  var t = Qs(e);
                  return (
                    (t = "function" == typeof t ? t : i), gi(Rt(e, Ga), i, t)
                  );
                }),
                ua = Zo(ia);
              var pa = Zo(function (e) {
                var t = e.length,
                  n = t > 1 ? e[t - 1] : i;
                return (
                  (n = "function" == typeof n ? (e.pop(), n) : i), sa(e, n)
                );
              });
              function da(e) {
                var t = Bn(e);
                return (t.__chain__ = !0), t;
              }
              function ma(e, t) {
                return t(e);
              }
              var fa = is(function (e) {
                var t = e.length,
                  n = t ? e[0] : 0,
                  o = this.__wrapped__,
                  s = function (t) {
                    return ro(t, e);
                  };
                return !(t > 1 || this.__actions__.length) &&
                  o instanceof qn &&
                  bs(n)
                  ? ((o = o.slice(n, +n + (t ? 1 : 0))).__actions__.push({
                      func: ma,
                      args: [s],
                      thisArg: i,
                    }),
                    new Kn(o, this.__chain__).thru(function (e) {
                      return t && !e.length && e.push(i), e;
                    }))
                  : this.thru(s);
              });
              var ha = Ai(function (e, t, n) {
                je.call(e, n) ? ++e[n] : ao(e, n, 1);
              });
              var _a = Vi(Ws),
                ga = Vi(Ks);
              function va(e, t) {
                return (Ka(e) ? It : fo)(e, us(t, 3));
              }
              function ya(e, t) {
                return (Ka(e) ? Lt : ho)(e, us(t, 3));
              }
              var ba = Ai(function (e, t, n) {
                je.call(e, n) ? e[n].push(t) : ao(e, n, [t]);
              });
              var Ea = Zo(function (e, t, n) {
                  var i = -1,
                    s = "function" == typeof t,
                    a = $a(e) ? o(e.length) : [];
                  return (
                    fo(e, function (e) {
                      a[++i] = s ? Ct(t, e, n) : Ro(e, t, n);
                    }),
                    a
                  );
                }),
                ka = Ai(function (e, t, n) {
                  ao(e, n, t);
                });
              function Sa(e, t) {
                return (Ka(e) ? Dt : Bo)(e, us(t, 3));
              }
              var xa = Ai(
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
                    n > 1 && Es(e, t[0], t[1])
                      ? (t = [])
                      : n > 2 && Es(t[0], t[1], t[2]) && (t = [t[0]]),
                    $o(e, yo(t, 1), [])
                  );
                }),
                Ta =
                  mt ||
                  function () {
                    return ht.Date.now();
                  };
              function Ca(e, t, n) {
                return (
                  (t = n ? i : t),
                  (t = e && null == t ? e.length : t),
                  Ji(e, p, i, i, i, i, t)
                );
              }
              function Oa(e, t) {
                var n;
                if ("function" != typeof t) throw new Pe(s);
                return (
                  (e = fr(e)),
                  function () {
                    return (
                      --e > 0 && (n = t.apply(this, arguments)),
                      e <= 1 && (t = i),
                      n
                    );
                  }
                );
              }
              var Ia = Zo(function (e, t, n) {
                  var o = 1;
                  if (n.length) {
                    var i = un(n, cs(Ia));
                    o |= c;
                  }
                  return Ji(e, o, t, n, i);
                }),
                La = Zo(function (e, t, n) {
                  var o = 3;
                  if (n.length) {
                    var i = un(n, cs(La));
                    o |= c;
                  }
                  return Ji(t, o, e, n, i);
                });
              function Pa(e, t, n) {
                var o,
                  a,
                  r,
                  l,
                  c,
                  u,
                  p = 0,
                  d = !1,
                  m = !1,
                  f = !0;
                if ("function" != typeof e) throw new Pe(s);
                function h(t) {
                  var n = o,
                    s = a;
                  return (o = a = i), (p = t), (l = e.apply(s, n));
                }
                function _(e) {
                  var n = e - u;
                  return u === i || n >= t || n < 0 || (m && e - p >= r);
                }
                function g() {
                  var e = Ta();
                  if (_(e)) return v(e);
                  c = Ps(
                    g,
                    (function (e) {
                      var n = t - (e - u);
                      return m ? bn(n, r - (e - p)) : n;
                    })(e),
                  );
                }
                function v(e) {
                  return (c = i), f && o ? h(e) : ((o = a = i), l);
                }
                function y() {
                  var e = Ta(),
                    n = _(e);
                  if (((o = arguments), (a = this), (u = e), n)) {
                    if (c === i)
                      return (function (e) {
                        return (p = e), (c = Ps(g, t)), d ? h(e) : l;
                      })(u);
                    if (m) return (c = Ps(g, t)), h(u);
                  }
                  return c === i && (c = Ps(g, t)), l;
                }
                return (
                  (t = _r(t) || 0),
                  er(n) &&
                    ((d = !!n.leading),
                    (r = (m = "maxWait" in n) ? yn(_r(n.maxWait) || 0, t) : r),
                    (f = "trailing" in n ? !!n.trailing : f)),
                  (y.cancel = function () {
                    c !== i && xi(c), (p = 0), (o = u = a = c = i);
                  }),
                  (y.flush = function () {
                    return c === i ? l : v(Ta());
                  }),
                  y
                );
              }
              var Ra = Zo(function (e, t) {
                  return po(e, 1, t);
                }),
                Aa = Zo(function (e, t, n) {
                  return po(e, _r(t) || 0, n);
                });
              function Na(e, t) {
                if (
                  "function" != typeof e ||
                  (null != t && "function" != typeof t)
                )
                  throw new Pe(s);
                var n = function () {
                  var o = arguments,
                    i = t ? t.apply(this, o) : o[0],
                    s = n.cache;
                  if (s.has(i)) return s.get(i);
                  var a = e.apply(this, o);
                  return (n.cache = s.set(i, a) || s), a;
                };
                return (n.cache = new (Na.Cache || zn)()), n;
              }
              function Da(e) {
                if ("function" != typeof e) throw new Pe(s);
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
              Na.Cache = zn;
              var Ma = ki(function (e, t) {
                  var n = (t =
                    1 == t.length && Ka(t[0])
                      ? Dt(t[0], Zt(us()))
                      : Dt(yo(t, 1), Zt(us()))).length;
                  return Zo(function (o) {
                    for (var i = -1, s = bn(o.length, n); ++i < s; )
                      o[i] = t[i].call(this, o[i]);
                    return Ct(e, this, o);
                  });
                }),
                ja = Zo(function (e, t) {
                  var n = un(t, cs(ja));
                  return Ji(e, c, i, t, n);
                }),
                Fa = Zo(function (e, t) {
                  var n = un(t, cs(Fa));
                  return Ji(e, u, i, t, n);
                }),
                Ua = is(function (e, t) {
                  return Ji(e, d, i, i, i, t);
                });
              function Va(e, t) {
                return e === t || (e != e && t != t);
              }
              var Ba = zi(Oo),
                Ha = zi(function (e, t) {
                  return e >= t;
                }),
                Wa = Ao(
                  (function () {
                    return arguments;
                  })(),
                )
                  ? Ao
                  : function (e) {
                      return (
                        tr(e) && je.call(e, "callee") && !Qe.call(e, "callee")
                      );
                    },
                Ka = o.isArray,
                qa = Et
                  ? Zt(Et)
                  : function (e) {
                      return tr(e) && Co(e) == N;
                    };
              function $a(e) {
                return null != e && Ja(e.length) && !Xa(e);
              }
              function Ga(e) {
                return tr(e) && $a(e);
              }
              var za = bt || _l,
                Ya = kt
                  ? Zt(kt)
                  : function (e) {
                      return tr(e) && Co(e) == E;
                    };
              function Qa(e) {
                if (!tr(e)) return !1;
                var t = Co(e);
                return (
                  t == k ||
                  "[object DOMException]" == t ||
                  ("string" == typeof e.message &&
                    "string" == typeof e.name &&
                    !ir(e))
                );
              }
              function Xa(e) {
                if (!er(e)) return !1;
                var t = Co(e);
                return (
                  t == S ||
                  t == x ||
                  "[object AsyncFunction]" == t ||
                  "[object Proxy]" == t
                );
              }
              function Za(e) {
                return "number" == typeof e && e == fr(e);
              }
              function Ja(e) {
                return "number" == typeof e && e > -1 && e % 1 == 0 && e <= f;
              }
              function er(e) {
                var t = typeof e;
                return null != e && ("object" == t || "function" == t);
              }
              function tr(e) {
                return null != e && "object" == typeof e;
              }
              var nr = St
                ? Zt(St)
                : function (e) {
                    return tr(e) && _s(e) == w;
                  };
              function or(e) {
                return "number" == typeof e || (tr(e) && Co(e) == T);
              }
              function ir(e) {
                if (!tr(e) || Co(e) != C) return !1;
                var t = ze(e);
                if (null === t) return !0;
                var n = je.call(t, "constructor") && t.constructor;
                return (
                  "function" == typeof n && n instanceof n && Me.call(n) == Be
                );
              }
              var sr = xt
                ? Zt(xt)
                : function (e) {
                    return tr(e) && Co(e) == I;
                  };
              var ar = wt
                ? Zt(wt)
                : function (e) {
                    return tr(e) && _s(e) == L;
                  };
              function rr(e) {
                return "string" == typeof e || (!Ka(e) && tr(e) && Co(e) == P);
              }
              function lr(e) {
                return "symbol" == typeof e || (tr(e) && Co(e) == R);
              }
              var cr = Tt
                ? Zt(Tt)
                : function (e) {
                    return tr(e) && Ja(e.length) && !!lt[Co(e)];
                  };
              var ur = zi(Vo),
                pr = zi(function (e, t) {
                  return e <= t;
                });
              function dr(e) {
                if (!e) return [];
                if ($a(e)) return rr(e) ? hn(e) : Pi(e);
                if (Je && e[Je])
                  return (function (e) {
                    for (var t, n = []; !(t = e.next()).done; ) n.push(t.value);
                    return n;
                  })(e[Je]());
                var t = _s(e);
                return (t == w ? ln : t == L ? dn : Vr)(e);
              }
              function mr(e) {
                return e
                  ? (e = _r(e)) === m || e === -1 / 0
                    ? 17976931348623157e292 * (e < 0 ? -1 : 1)
                    : e == e
                      ? e
                      : 0
                  : 0 === e
                    ? e
                    : 0;
              }
              function fr(e) {
                var t = mr(e),
                  n = t % 1;
                return t == t ? (n ? t - n : t) : 0;
              }
              function hr(e) {
                return e ? lo(fr(e), 0, _) : 0;
              }
              function _r(e) {
                if ("number" == typeof e) return e;
                if (lr(e)) return h;
                if (er(e)) {
                  var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                  e = er(t) ? t + "" : t;
                }
                if ("string" != typeof e) return 0 === e ? e : +e;
                e = e.replace(ae, "");
                var n = ge.test(e);
                return n || ye.test(e)
                  ? dt(e.slice(2), n ? 2 : 8)
                  : _e.test(e)
                    ? h
                    : +e;
              }
              function gr(e) {
                return Ri(e, Rr(e));
              }
              function vr(e) {
                return null == e ? "" : pi(e);
              }
              var yr = Ni(function (e, t) {
                  if (ws(t) || $a(t)) Ri(t, Pr(t), e);
                  else for (var n in t) je.call(t, n) && no(e, n, t[n]);
                }),
                br = Ni(function (e, t) {
                  Ri(t, Rr(t), e);
                }),
                Er = Ni(function (e, t, n, o) {
                  Ri(t, Rr(t), e, o);
                }),
                kr = Ni(function (e, t, n, o) {
                  Ri(t, Pr(t), e, o);
                }),
                Sr = is(ro);
              var xr = Zo(function (e, t) {
                  e = Oe(e);
                  var n = -1,
                    o = t.length,
                    s = o > 2 ? t[2] : i;
                  for (s && Es(t[0], t[1], s) && (o = 1); ++n < o; )
                    for (
                      var a = t[n], r = Rr(a), l = -1, c = r.length;
                      ++l < c;

                    ) {
                      var u = r[l],
                        p = e[u];
                      (p === i || (Va(p, Ne[u]) && !je.call(e, u))) &&
                        (e[u] = a[u]);
                    }
                  return e;
                }),
                wr = Zo(function (e) {
                  return e.push(i, ts), Ct(Nr, i, e);
                });
              function Tr(e, t, n) {
                var o = null == e ? i : wo(e, t);
                return o === i ? n : o;
              }
              function Cr(e, t) {
                return null != e && gs(e, t, Lo);
              }
              var Or = Wi(function (e, t, n) {
                  null != t &&
                    "function" != typeof t.toString &&
                    (t = Ve.call(t)),
                    (e[t] = n);
                }, el(ol)),
                Ir = Wi(function (e, t, n) {
                  null != t &&
                    "function" != typeof t.toString &&
                    (t = Ve.call(t)),
                    je.call(e, t) ? e[t].push(n) : (e[t] = [n]);
                }, us),
                Lr = Zo(Ro);
              function Pr(e) {
                return $a(e) ? Xn(e) : Fo(e);
              }
              function Rr(e) {
                return $a(e) ? Xn(e, !0) : Uo(e);
              }
              var Ar = Ni(function (e, t, n) {
                  Ko(e, t, n);
                }),
                Nr = Ni(function (e, t, n, o) {
                  Ko(e, t, n, o);
                }),
                Dr = is(function (e, t) {
                  var n = {};
                  if (null == e) return n;
                  var o = !1;
                  (t = Dt(t, function (t) {
                    return (t = Ei(t, e)), o || (o = t.length > 1), t;
                  })),
                    Ri(e, as(e), n),
                    o && (n = co(n, 7, ns));
                  for (var i = t.length; i--; ) mi(n, t[i]);
                  return n;
                });
              var Mr = is(function (e, t) {
                return null == e
                  ? {}
                  : (function (e, t) {
                      return Go(e, t, function (t, n) {
                        return Cr(e, n);
                      });
                    })(e, t);
              });
              function jr(e, t) {
                if (null == e) return {};
                var n = Dt(as(e), function (e) {
                  return [e];
                });
                return (
                  (t = us(t)),
                  Go(e, n, function (e, n) {
                    return t(e, n[0]);
                  })
                );
              }
              var Fr = Zi(Pr),
                Ur = Zi(Rr);
              function Vr(e) {
                return null == e ? [] : Jt(e, Pr(e));
              }
              var Br = Fi(function (e, t, n) {
                return (t = t.toLowerCase()), e + (n ? Hr(t) : t);
              });
              function Hr(e) {
                return Qr(vr(e).toLowerCase());
              }
              function Wr(e) {
                return (e = vr(e)) && e.replace(Ee, on).replace(tt, "");
              }
              var Kr = Fi(function (e, t, n) {
                  return e + (n ? "-" : "") + t.toLowerCase();
                }),
                qr = Fi(function (e, t, n) {
                  return e + (n ? " " : "") + t.toLowerCase();
                }),
                $r = ji("toLowerCase");
              var Gr = Fi(function (e, t, n) {
                return e + (n ? "_" : "") + t.toLowerCase();
              });
              var zr = Fi(function (e, t, n) {
                return e + (n ? " " : "") + Qr(t);
              });
              var Yr = Fi(function (e, t, n) {
                  return e + (n ? " " : "") + t.toUpperCase();
                }),
                Qr = ji("toUpperCase");
              function Xr(e, t, n) {
                return (
                  (e = vr(e)),
                  (t = n ? i : t) === i
                    ? (function (e) {
                        return st.test(e);
                      })(e)
                      ? (function (e) {
                          return e.match(ot) || [];
                        })(e)
                      : (function (e) {
                          return e.match(de) || [];
                        })(e)
                    : e.match(t) || []
                );
              }
              var Zr = Zo(function (e, t) {
                  try {
                    return Ct(e, i, t);
                  } catch (e) {
                    return Qa(e) ? e : new we(e);
                  }
                }),
                Jr = is(function (e, t) {
                  return (
                    It(t, function (t) {
                      (t = js(t)), ao(e, t, Ia(e[t], e));
                    }),
                    e
                  );
                });
              function el(e) {
                return function () {
                  return e;
                };
              }
              var tl = Bi(),
                nl = Bi(!0);
              function ol(e) {
                return e;
              }
              function il(e) {
                return jo("function" == typeof e ? e : co(e, 1));
              }
              var sl = Zo(function (e, t) {
                  return function (n) {
                    return Ro(n, e, t);
                  };
                }),
                al = Zo(function (e, t) {
                  return function (n) {
                    return Ro(e, n, t);
                  };
                });
              function rl(e, t, n) {
                var o = Pr(t),
                  i = xo(t, o);
                null != n ||
                  (er(t) && (i.length || !o.length)) ||
                  ((n = t), (t = e), (e = this), (i = xo(t, Pr(t))));
                var s = !(er(n) && "chain" in n && !n.chain),
                  a = Xa(e);
                return (
                  It(i, function (n) {
                    var o = t[n];
                    (e[n] = o),
                      a &&
                        (e.prototype[n] = function () {
                          var t = this.__chain__;
                          if (s || t) {
                            var n = e(this.__wrapped__);
                            return (
                              (n.__actions__ = Pi(this.__actions__)).push({
                                func: o,
                                args: arguments,
                                thisArg: e,
                              }),
                              (n.__chain__ = t),
                              n
                            );
                          }
                          return o.apply(e, Mt([this.value()], arguments));
                        });
                  }),
                  e
                );
              }
              function ll() {}
              var cl = qi(Dt),
                ul = qi(Pt),
                pl = qi(Ut);
              function dl(e) {
                return ks(e)
                  ? Gt(js(e))
                  : (function (e) {
                      return function (t) {
                        return wo(t, e);
                      };
                    })(e);
              }
              var ml = Gi(),
                fl = Gi(!0);
              function hl() {
                return [];
              }
              function _l() {
                return !1;
              }
              var gl = Ki(function (e, t) {
                  return e + t;
                }, 0),
                vl = Qi("ceil"),
                yl = Ki(function (e, t) {
                  return e / t;
                }, 1),
                bl = Qi("floor");
              var El,
                kl = Ki(function (e, t) {
                  return e * t;
                }, 1),
                Sl = Qi("round"),
                xl = Ki(function (e, t) {
                  return e - t;
                }, 0);
              return (
                (Bn.after = function (e, t) {
                  if ("function" != typeof t) throw new Pe(s);
                  return (
                    (e = fr(e)),
                    function () {
                      if (--e < 1) return t.apply(this, arguments);
                    }
                  );
                }),
                (Bn.ary = Ca),
                (Bn.assign = yr),
                (Bn.assignIn = br),
                (Bn.assignInWith = Er),
                (Bn.assignWith = kr),
                (Bn.at = Sr),
                (Bn.before = Oa),
                (Bn.bind = Ia),
                (Bn.bindAll = Jr),
                (Bn.bindKey = La),
                (Bn.castArray = function () {
                  if (!arguments.length) return [];
                  var e = arguments[0];
                  return Ka(e) ? e : [e];
                }),
                (Bn.chain = da),
                (Bn.chunk = function (e, t, n) {
                  t = (n ? Es(e, t, n) : t === i) ? 1 : yn(fr(t), 0);
                  var s = null == e ? 0 : e.length;
                  if (!s || t < 1) return [];
                  for (var a = 0, r = 0, l = o(_t(s / t)); a < s; )
                    l[r++] = si(e, a, (a += t));
                  return l;
                }),
                (Bn.compact = function (e) {
                  for (
                    var t = -1, n = null == e ? 0 : e.length, o = 0, i = [];
                    ++t < n;

                  ) {
                    var s = e[t];
                    s && (i[o++] = s);
                  }
                  return i;
                }),
                (Bn.concat = function () {
                  var e = arguments.length;
                  if (!e) return [];
                  for (var t = o(e - 1), n = arguments[0], i = e; i--; )
                    t[i - 1] = arguments[i];
                  return Mt(Ka(n) ? Pi(n) : [n], yo(t, 1));
                }),
                (Bn.cond = function (e) {
                  var t = null == e ? 0 : e.length,
                    n = us();
                  return (
                    (e = t
                      ? Dt(e, function (e) {
                          if ("function" != typeof e[1]) throw new Pe(s);
                          return [n(e[0]), e[1]];
                        })
                      : []),
                    Zo(function (n) {
                      for (var o = -1; ++o < t; ) {
                        var i = e[o];
                        if (Ct(i[0], this, n)) return Ct(i[1], this, n);
                      }
                    })
                  );
                }),
                (Bn.conforms = function (e) {
                  return (function (e) {
                    var t = Pr(e);
                    return function (n) {
                      return uo(n, e, t);
                    };
                  })(co(e, 1));
                }),
                (Bn.constant = el),
                (Bn.countBy = ha),
                (Bn.create = function (e, t) {
                  var n = Hn(e);
                  return null == t ? n : so(n, t);
                }),
                (Bn.curry = function e(t, n, o) {
                  var s = Ji(t, 8, i, i, i, i, i, (n = o ? i : n));
                  return (s.placeholder = e.placeholder), s;
                }),
                (Bn.curryRight = function e(t, n, o) {
                  var s = Ji(t, l, i, i, i, i, i, (n = o ? i : n));
                  return (s.placeholder = e.placeholder), s;
                }),
                (Bn.debounce = Pa),
                (Bn.defaults = xr),
                (Bn.defaultsDeep = wr),
                (Bn.defer = Ra),
                (Bn.delay = Aa),
                (Bn.difference = Vs),
                (Bn.differenceBy = Bs),
                (Bn.differenceWith = Hs),
                (Bn.drop = function (e, t, n) {
                  var o = null == e ? 0 : e.length;
                  return o
                    ? si(e, (t = n || t === i ? 1 : fr(t)) < 0 ? 0 : t, o)
                    : [];
                }),
                (Bn.dropRight = function (e, t, n) {
                  var o = null == e ? 0 : e.length;
                  return o
                    ? si(
                        e,
                        0,
                        (t = o - (t = n || t === i ? 1 : fr(t))) < 0 ? 0 : t,
                      )
                    : [];
                }),
                (Bn.dropRightWhile = function (e, t) {
                  return e && e.length ? hi(e, us(t, 3), !0, !0) : [];
                }),
                (Bn.dropWhile = function (e, t) {
                  return e && e.length ? hi(e, us(t, 3), !0) : [];
                }),
                (Bn.fill = function (e, t, n, o) {
                  var s = null == e ? 0 : e.length;
                  return s
                    ? (n &&
                        "number" != typeof n &&
                        Es(e, t, n) &&
                        ((n = 0), (o = s)),
                      (function (e, t, n, o) {
                        var s = e.length;
                        for (
                          (n = fr(n)) < 0 && (n = -n > s ? 0 : s + n),
                            (o = o === i || o > s ? s : fr(o)) < 0 && (o += s),
                            o = n > o ? 0 : hr(o);
                          n < o;

                        )
                          e[n++] = t;
                        return e;
                      })(e, t, n, o))
                    : [];
                }),
                (Bn.filter = function (e, t) {
                  return (Ka(e) ? Rt : vo)(e, us(t, 3));
                }),
                (Bn.flatMap = function (e, t) {
                  return yo(Sa(e, t), 1);
                }),
                (Bn.flatMapDeep = function (e, t) {
                  return yo(Sa(e, t), m);
                }),
                (Bn.flatMapDepth = function (e, t, n) {
                  return (n = n === i ? 1 : fr(n)), yo(Sa(e, t), n);
                }),
                (Bn.flatten = qs),
                (Bn.flattenDeep = function (e) {
                  return (null == e ? 0 : e.length) ? yo(e, m) : [];
                }),
                (Bn.flattenDepth = function (e, t) {
                  return (null == e ? 0 : e.length)
                    ? yo(e, (t = t === i ? 1 : fr(t)))
                    : [];
                }),
                (Bn.flip = function (e) {
                  return Ji(e, 512);
                }),
                (Bn.flow = tl),
                (Bn.flowRight = nl),
                (Bn.fromPairs = function (e) {
                  for (
                    var t = -1, n = null == e ? 0 : e.length, o = {};
                    ++t < n;

                  ) {
                    var i = e[t];
                    o[i[0]] = i[1];
                  }
                  return o;
                }),
                (Bn.functions = function (e) {
                  return null == e ? [] : xo(e, Pr(e));
                }),
                (Bn.functionsIn = function (e) {
                  return null == e ? [] : xo(e, Rr(e));
                }),
                (Bn.groupBy = ba),
                (Bn.initial = function (e) {
                  return (null == e ? 0 : e.length) ? si(e, 0, -1) : [];
                }),
                (Bn.intersection = Gs),
                (Bn.intersectionBy = zs),
                (Bn.intersectionWith = Ys),
                (Bn.invert = Or),
                (Bn.invertBy = Ir),
                (Bn.invokeMap = Ea),
                (Bn.iteratee = il),
                (Bn.keyBy = ka),
                (Bn.keys = Pr),
                (Bn.keysIn = Rr),
                (Bn.map = Sa),
                (Bn.mapKeys = function (e, t) {
                  var n = {};
                  return (
                    (t = us(t, 3)),
                    ko(e, function (e, o, i) {
                      ao(n, t(e, o, i), e);
                    }),
                    n
                  );
                }),
                (Bn.mapValues = function (e, t) {
                  var n = {};
                  return (
                    (t = us(t, 3)),
                    ko(e, function (e, o, i) {
                      ao(n, o, t(e, o, i));
                    }),
                    n
                  );
                }),
                (Bn.matches = function (e) {
                  return Ho(co(e, 1));
                }),
                (Bn.matchesProperty = function (e, t) {
                  return Wo(e, co(t, 1));
                }),
                (Bn.memoize = Na),
                (Bn.merge = Ar),
                (Bn.mergeWith = Nr),
                (Bn.method = sl),
                (Bn.methodOf = al),
                (Bn.mixin = rl),
                (Bn.negate = Da),
                (Bn.nthArg = function (e) {
                  return (
                    (e = fr(e)),
                    Zo(function (t) {
                      return qo(t, e);
                    })
                  );
                }),
                (Bn.omit = Dr),
                (Bn.omitBy = function (e, t) {
                  return jr(e, Da(us(t)));
                }),
                (Bn.once = function (e) {
                  return Oa(2, e);
                }),
                (Bn.orderBy = function (e, t, n, o) {
                  return null == e
                    ? []
                    : (Ka(t) || (t = null == t ? [] : [t]),
                      Ka((n = o ? i : n)) || (n = null == n ? [] : [n]),
                      $o(e, t, n));
                }),
                (Bn.over = cl),
                (Bn.overArgs = Ma),
                (Bn.overEvery = ul),
                (Bn.overSome = pl),
                (Bn.partial = ja),
                (Bn.partialRight = Fa),
                (Bn.partition = xa),
                (Bn.pick = Mr),
                (Bn.pickBy = jr),
                (Bn.property = dl),
                (Bn.propertyOf = function (e) {
                  return function (t) {
                    return null == e ? i : wo(e, t);
                  };
                }),
                (Bn.pull = Xs),
                (Bn.pullAll = Zs),
                (Bn.pullAllBy = function (e, t, n) {
                  return e && e.length && t && t.length
                    ? zo(e, t, us(n, 2))
                    : e;
                }),
                (Bn.pullAllWith = function (e, t, n) {
                  return e && e.length && t && t.length ? zo(e, t, i, n) : e;
                }),
                (Bn.pullAt = Js),
                (Bn.range = ml),
                (Bn.rangeRight = fl),
                (Bn.rearg = Ua),
                (Bn.reject = function (e, t) {
                  return (Ka(e) ? Rt : vo)(e, Da(us(t, 3)));
                }),
                (Bn.remove = function (e, t) {
                  var n = [];
                  if (!e || !e.length) return n;
                  var o = -1,
                    i = [],
                    s = e.length;
                  for (t = us(t, 3); ++o < s; ) {
                    var a = e[o];
                    t(a, o, e) && (n.push(a), i.push(o));
                  }
                  return Yo(e, i), n;
                }),
                (Bn.rest = function (e, t) {
                  if ("function" != typeof e) throw new Pe(s);
                  return Zo(e, (t = t === i ? t : fr(t)));
                }),
                (Bn.reverse = ea),
                (Bn.sampleSize = function (e, t, n) {
                  return (
                    (t = (n ? Es(e, t, n) : t === i) ? 1 : fr(t)),
                    (Ka(e) ? Jn : ei)(e, t)
                  );
                }),
                (Bn.set = function (e, t, n) {
                  return null == e ? e : ti(e, t, n);
                }),
                (Bn.setWith = function (e, t, n, o) {
                  return (
                    (o = "function" == typeof o ? o : i),
                    null == e ? e : ti(e, t, n, o)
                  );
                }),
                (Bn.shuffle = function (e) {
                  return (Ka(e) ? eo : ii)(e);
                }),
                (Bn.slice = function (e, t, n) {
                  var o = null == e ? 0 : e.length;
                  return o
                    ? (n && "number" != typeof n && Es(e, t, n)
                        ? ((t = 0), (n = o))
                        : ((t = null == t ? 0 : fr(t)),
                          (n = n === i ? o : fr(n))),
                      si(e, t, n))
                    : [];
                }),
                (Bn.sortBy = wa),
                (Bn.sortedUniq = function (e) {
                  return e && e.length ? ci(e) : [];
                }),
                (Bn.sortedUniqBy = function (e, t) {
                  return e && e.length ? ci(e, us(t, 2)) : [];
                }),
                (Bn.split = function (e, t, n) {
                  return (
                    n && "number" != typeof n && Es(e, t, n) && (t = n = i),
                    (n = n === i ? _ : n >>> 0)
                      ? (e = vr(e)) &&
                        ("string" == typeof t || (null != t && !sr(t))) &&
                        !(t = pi(t)) &&
                        rn(e)
                        ? Si(hn(e), 0, n)
                        : e.split(t, n)
                      : []
                  );
                }),
                (Bn.spread = function (e, t) {
                  if ("function" != typeof e) throw new Pe(s);
                  return (
                    (t = null == t ? 0 : yn(fr(t), 0)),
                    Zo(function (n) {
                      var o = n[t],
                        i = Si(n, 0, t);
                      return o && Mt(i, o), Ct(e, this, i);
                    })
                  );
                }),
                (Bn.tail = function (e) {
                  var t = null == e ? 0 : e.length;
                  return t ? si(e, 1, t) : [];
                }),
                (Bn.take = function (e, t, n) {
                  return e && e.length
                    ? si(e, 0, (t = n || t === i ? 1 : fr(t)) < 0 ? 0 : t)
                    : [];
                }),
                (Bn.takeRight = function (e, t, n) {
                  var o = null == e ? 0 : e.length;
                  return o
                    ? si(
                        e,
                        (t = o - (t = n || t === i ? 1 : fr(t))) < 0 ? 0 : t,
                        o,
                      )
                    : [];
                }),
                (Bn.takeRightWhile = function (e, t) {
                  return e && e.length ? hi(e, us(t, 3), !1, !0) : [];
                }),
                (Bn.takeWhile = function (e, t) {
                  return e && e.length ? hi(e, us(t, 3)) : [];
                }),
                (Bn.tap = function (e, t) {
                  return t(e), e;
                }),
                (Bn.throttle = function (e, t, n) {
                  var o = !0,
                    i = !0;
                  if ("function" != typeof e) throw new Pe(s);
                  return (
                    er(n) &&
                      ((o = "leading" in n ? !!n.leading : o),
                      (i = "trailing" in n ? !!n.trailing : i)),
                    Pa(e, t, { leading: o, maxWait: t, trailing: i })
                  );
                }),
                (Bn.thru = ma),
                (Bn.toArray = dr),
                (Bn.toPairs = Fr),
                (Bn.toPairsIn = Ur),
                (Bn.toPath = function (e) {
                  return Ka(e) ? Dt(e, js) : lr(e) ? [e] : Pi(Ms(vr(e)));
                }),
                (Bn.toPlainObject = gr),
                (Bn.transform = function (e, t, n) {
                  var o = Ka(e),
                    i = o || za(e) || cr(e);
                  if (((t = us(t, 4)), null == n)) {
                    var s = e && e.constructor;
                    n = i
                      ? o
                        ? new s()
                        : []
                      : er(e) && Xa(s)
                        ? Hn(ze(e))
                        : {};
                  }
                  return (
                    (i ? It : ko)(e, function (e, o, i) {
                      return t(n, e, o, i);
                    }),
                    n
                  );
                }),
                (Bn.unary = function (e) {
                  return Ca(e, 1);
                }),
                (Bn.union = ta),
                (Bn.unionBy = na),
                (Bn.unionWith = oa),
                (Bn.uniq = function (e) {
                  return e && e.length ? di(e) : [];
                }),
                (Bn.uniqBy = function (e, t) {
                  return e && e.length ? di(e, us(t, 2)) : [];
                }),
                (Bn.uniqWith = function (e, t) {
                  return (
                    (t = "function" == typeof t ? t : i),
                    e && e.length ? di(e, i, t) : []
                  );
                }),
                (Bn.unset = function (e, t) {
                  return null == e || mi(e, t);
                }),
                (Bn.unzip = ia),
                (Bn.unzipWith = sa),
                (Bn.update = function (e, t, n) {
                  return null == e ? e : fi(e, t, bi(n));
                }),
                (Bn.updateWith = function (e, t, n, o) {
                  return (
                    (o = "function" == typeof o ? o : i),
                    null == e ? e : fi(e, t, bi(n), o)
                  );
                }),
                (Bn.values = Vr),
                (Bn.valuesIn = function (e) {
                  return null == e ? [] : Jt(e, Rr(e));
                }),
                (Bn.without = aa),
                (Bn.words = Xr),
                (Bn.wrap = function (e, t) {
                  return ja(bi(t), e);
                }),
                (Bn.xor = ra),
                (Bn.xorBy = la),
                (Bn.xorWith = ca),
                (Bn.zip = ua),
                (Bn.zipObject = function (e, t) {
                  return vi(e || [], t || [], no);
                }),
                (Bn.zipObjectDeep = function (e, t) {
                  return vi(e || [], t || [], ti);
                }),
                (Bn.zipWith = pa),
                (Bn.entries = Fr),
                (Bn.entriesIn = Ur),
                (Bn.extend = br),
                (Bn.extendWith = Er),
                rl(Bn, Bn),
                (Bn.add = gl),
                (Bn.attempt = Zr),
                (Bn.camelCase = Br),
                (Bn.capitalize = Hr),
                (Bn.ceil = vl),
                (Bn.clamp = function (e, t, n) {
                  return (
                    n === i && ((n = t), (t = i)),
                    n !== i && (n = (n = _r(n)) == n ? n : 0),
                    t !== i && (t = (t = _r(t)) == t ? t : 0),
                    lo(_r(e), t, n)
                  );
                }),
                (Bn.clone = function (e) {
                  return co(e, 4);
                }),
                (Bn.cloneDeep = function (e) {
                  return co(e, 5);
                }),
                (Bn.cloneDeepWith = function (e, t) {
                  return co(e, 5, (t = "function" == typeof t ? t : i));
                }),
                (Bn.cloneWith = function (e, t) {
                  return co(e, 4, (t = "function" == typeof t ? t : i));
                }),
                (Bn.conformsTo = function (e, t) {
                  return null == t || uo(e, t, Pr(t));
                }),
                (Bn.deburr = Wr),
                (Bn.defaultTo = function (e, t) {
                  return null == e || e != e ? t : e;
                }),
                (Bn.divide = yl),
                (Bn.endsWith = function (e, t, n) {
                  (e = vr(e)), (t = pi(t));
                  var o = e.length,
                    s = (n = n === i ? o : lo(fr(n), 0, o));
                  return (n -= t.length) >= 0 && e.slice(n, s) == t;
                }),
                (Bn.eq = Va),
                (Bn.escape = function (e) {
                  return (e = vr(e)) && X.test(e) ? e.replace(Y, sn) : e;
                }),
                (Bn.escapeRegExp = function (e) {
                  return (e = vr(e)) && se.test(e) ? e.replace(ie, "\\$&") : e;
                }),
                (Bn.every = function (e, t, n) {
                  var o = Ka(e) ? Pt : _o;
                  return n && Es(e, t, n) && (t = i), o(e, us(t, 3));
                }),
                (Bn.find = _a),
                (Bn.findIndex = Ws),
                (Bn.findKey = function (e, t) {
                  return Bt(e, us(t, 3), ko);
                }),
                (Bn.findLast = ga),
                (Bn.findLastIndex = Ks),
                (Bn.findLastKey = function (e, t) {
                  return Bt(e, us(t, 3), So);
                }),
                (Bn.floor = bl),
                (Bn.forEach = va),
                (Bn.forEachRight = ya),
                (Bn.forIn = function (e, t) {
                  return null == e ? e : bo(e, us(t, 3), Rr);
                }),
                (Bn.forInRight = function (e, t) {
                  return null == e ? e : Eo(e, us(t, 3), Rr);
                }),
                (Bn.forOwn = function (e, t) {
                  return e && ko(e, us(t, 3));
                }),
                (Bn.forOwnRight = function (e, t) {
                  return e && So(e, us(t, 3));
                }),
                (Bn.get = Tr),
                (Bn.gt = Ba),
                (Bn.gte = Ha),
                (Bn.has = function (e, t) {
                  return null != e && gs(e, t, Io);
                }),
                (Bn.hasIn = Cr),
                (Bn.head = $s),
                (Bn.identity = ol),
                (Bn.includes = function (e, t, n, o) {
                  (e = $a(e) ? e : Vr(e)), (n = n && !o ? fr(n) : 0);
                  var i = e.length;
                  return (
                    n < 0 && (n = yn(i + n, 0)),
                    rr(e)
                      ? n <= i && e.indexOf(t, n) > -1
                      : !!i && Wt(e, t, n) > -1
                  );
                }),
                (Bn.indexOf = function (e, t, n) {
                  var o = null == e ? 0 : e.length;
                  if (!o) return -1;
                  var i = null == n ? 0 : fr(n);
                  return i < 0 && (i = yn(o + i, 0)), Wt(e, t, i);
                }),
                (Bn.inRange = function (e, t, n) {
                  return (
                    (t = mr(t)),
                    n === i ? ((n = t), (t = 0)) : (n = mr(n)),
                    (function (e, t, n) {
                      return e >= bn(t, n) && e < yn(t, n);
                    })((e = _r(e)), t, n)
                  );
                }),
                (Bn.invoke = Lr),
                (Bn.isArguments = Wa),
                (Bn.isArray = Ka),
                (Bn.isArrayBuffer = qa),
                (Bn.isArrayLike = $a),
                (Bn.isArrayLikeObject = Ga),
                (Bn.isBoolean = function (e) {
                  return !0 === e || !1 === e || (tr(e) && Co(e) == b);
                }),
                (Bn.isBuffer = za),
                (Bn.isDate = Ya),
                (Bn.isElement = function (e) {
                  return tr(e) && 1 === e.nodeType && !ir(e);
                }),
                (Bn.isEmpty = function (e) {
                  if (null == e) return !0;
                  if (
                    $a(e) &&
                    (Ka(e) ||
                      "string" == typeof e ||
                      "function" == typeof e.splice ||
                      za(e) ||
                      cr(e) ||
                      Wa(e))
                  )
                    return !e.length;
                  var t = _s(e);
                  if (t == w || t == L) return !e.size;
                  if (ws(e)) return !Fo(e).length;
                  for (var n in e) if (je.call(e, n)) return !1;
                  return !0;
                }),
                (Bn.isEqual = function (e, t) {
                  return No(e, t);
                }),
                (Bn.isEqualWith = function (e, t, n) {
                  var o = (n = "function" == typeof n ? n : i) ? n(e, t) : i;
                  return o === i ? No(e, t, i, n) : !!o;
                }),
                (Bn.isError = Qa),
                (Bn.isFinite = function (e) {
                  return "number" == typeof e && Vt(e);
                }),
                (Bn.isFunction = Xa),
                (Bn.isInteger = Za),
                (Bn.isLength = Ja),
                (Bn.isMap = nr),
                (Bn.isMatch = function (e, t) {
                  return e === t || Do(e, t, ds(t));
                }),
                (Bn.isMatchWith = function (e, t, n) {
                  return (
                    (n = "function" == typeof n ? n : i), Do(e, t, ds(t), n)
                  );
                }),
                (Bn.isNaN = function (e) {
                  return or(e) && e != +e;
                }),
                (Bn.isNative = function (e) {
                  if (xs(e))
                    throw new we(
                      "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",
                    );
                  return Mo(e);
                }),
                (Bn.isNil = function (e) {
                  return null == e;
                }),
                (Bn.isNull = function (e) {
                  return null === e;
                }),
                (Bn.isNumber = or),
                (Bn.isObject = er),
                (Bn.isObjectLike = tr),
                (Bn.isPlainObject = ir),
                (Bn.isRegExp = sr),
                (Bn.isSafeInteger = function (e) {
                  return Za(e) && e >= -9007199254740991 && e <= f;
                }),
                (Bn.isSet = ar),
                (Bn.isString = rr),
                (Bn.isSymbol = lr),
                (Bn.isTypedArray = cr),
                (Bn.isUndefined = function (e) {
                  return e === i;
                }),
                (Bn.isWeakMap = function (e) {
                  return tr(e) && _s(e) == A;
                }),
                (Bn.isWeakSet = function (e) {
                  return tr(e) && "[object WeakSet]" == Co(e);
                }),
                (Bn.join = function (e, t) {
                  return null == e ? "" : zt.call(e, t);
                }),
                (Bn.kebabCase = Kr),
                (Bn.last = Qs),
                (Bn.lastIndexOf = function (e, t, n) {
                  var o = null == e ? 0 : e.length;
                  if (!o) return -1;
                  var s = o;
                  return (
                    n !== i &&
                      (s = (s = fr(n)) < 0 ? yn(o + s, 0) : bn(s, o - 1)),
                    t == t
                      ? (function (e, t, n) {
                          for (var o = n + 1; o--; ) if (e[o] === t) return o;
                          return o;
                        })(e, t, s)
                      : Ht(e, qt, s, !0)
                  );
                }),
                (Bn.lowerCase = qr),
                (Bn.lowerFirst = $r),
                (Bn.lt = ur),
                (Bn.lte = pr),
                (Bn.max = function (e) {
                  return e && e.length ? go(e, ol, Oo) : i;
                }),
                (Bn.maxBy = function (e, t) {
                  return e && e.length ? go(e, us(t, 2), Oo) : i;
                }),
                (Bn.mean = function (e) {
                  return $t(e, ol);
                }),
                (Bn.meanBy = function (e, t) {
                  return $t(e, us(t, 2));
                }),
                (Bn.min = function (e) {
                  return e && e.length ? go(e, ol, Vo) : i;
                }),
                (Bn.minBy = function (e, t) {
                  return e && e.length ? go(e, us(t, 2), Vo) : i;
                }),
                (Bn.stubArray = hl),
                (Bn.stubFalse = _l),
                (Bn.stubObject = function () {
                  return {};
                }),
                (Bn.stubString = function () {
                  return "";
                }),
                (Bn.stubTrue = function () {
                  return !0;
                }),
                (Bn.multiply = kl),
                (Bn.nth = function (e, t) {
                  return e && e.length ? qo(e, fr(t)) : i;
                }),
                (Bn.noConflict = function () {
                  return ht._ === this && (ht._ = He), this;
                }),
                (Bn.noop = ll),
                (Bn.now = Ta),
                (Bn.pad = function (e, t, n) {
                  e = vr(e);
                  var o = (t = fr(t)) ? fn(e) : 0;
                  if (!t || o >= t) return e;
                  var i = (t - o) / 2;
                  return $i(gt(i), n) + e + $i(_t(i), n);
                }),
                (Bn.padEnd = function (e, t, n) {
                  e = vr(e);
                  var o = (t = fr(t)) ? fn(e) : 0;
                  return t && o < t ? e + $i(t - o, n) : e;
                }),
                (Bn.padStart = function (e, t, n) {
                  e = vr(e);
                  var o = (t = fr(t)) ? fn(e) : 0;
                  return t && o < t ? $i(t - o, n) + e : e;
                }),
                (Bn.parseInt = function (e, t, n) {
                  return (
                    n || null == t ? (t = 0) : t && (t = +t),
                    kn(vr(e).replace(re, ""), t || 0)
                  );
                }),
                (Bn.random = function (e, t, n) {
                  if (
                    (n && "boolean" != typeof n && Es(e, t, n) && (t = n = i),
                    n === i &&
                      ("boolean" == typeof t
                        ? ((n = t), (t = i))
                        : "boolean" == typeof e && ((n = e), (e = i))),
                    e === i && t === i
                      ? ((e = 0), (t = 1))
                      : ((e = mr(e)),
                        t === i ? ((t = e), (e = 0)) : (t = mr(t))),
                    e > t)
                  ) {
                    var o = e;
                    (e = t), (t = o);
                  }
                  if (n || e % 1 || t % 1) {
                    var s = Sn();
                    return bn(
                      e + s * (t - e + pt("1e-" + ((s + "").length - 1))),
                      t,
                    );
                  }
                  return Qo(e, t);
                }),
                (Bn.reduce = function (e, t, n) {
                  var o = Ka(e) ? jt : Yt,
                    i = arguments.length < 3;
                  return o(e, us(t, 4), n, i, fo);
                }),
                (Bn.reduceRight = function (e, t, n) {
                  var o = Ka(e) ? Ft : Yt,
                    i = arguments.length < 3;
                  return o(e, us(t, 4), n, i, ho);
                }),
                (Bn.repeat = function (e, t, n) {
                  return (
                    (t = (n ? Es(e, t, n) : t === i) ? 1 : fr(t)), Xo(vr(e), t)
                  );
                }),
                (Bn.replace = function () {
                  var e = arguments,
                    t = vr(e[0]);
                  return e.length < 3 ? t : t.replace(e[1], e[2]);
                }),
                (Bn.result = function (e, t, n) {
                  var o = -1,
                    s = (t = Ei(t, e)).length;
                  for (s || ((s = 1), (e = i)); ++o < s; ) {
                    var a = null == e ? i : e[js(t[o])];
                    a === i && ((o = s), (a = n)), (e = Xa(a) ? a.call(e) : a);
                  }
                  return e;
                }),
                (Bn.round = Sl),
                (Bn.runInContext = e),
                (Bn.sample = function (e) {
                  return (Ka(e) ? Zn : Jo)(e);
                }),
                (Bn.size = function (e) {
                  if (null == e) return 0;
                  if ($a(e)) return rr(e) ? fn(e) : e.length;
                  var t = _s(e);
                  return t == w || t == L ? e.size : Fo(e).length;
                }),
                (Bn.snakeCase = Gr),
                (Bn.some = function (e, t, n) {
                  var o = Ka(e) ? Ut : ai;
                  return n && Es(e, t, n) && (t = i), o(e, us(t, 3));
                }),
                (Bn.sortedIndex = function (e, t) {
                  return ri(e, t);
                }),
                (Bn.sortedIndexBy = function (e, t, n) {
                  return li(e, t, us(n, 2));
                }),
                (Bn.sortedIndexOf = function (e, t) {
                  var n = null == e ? 0 : e.length;
                  if (n) {
                    var o = ri(e, t);
                    if (o < n && Va(e[o], t)) return o;
                  }
                  return -1;
                }),
                (Bn.sortedLastIndex = function (e, t) {
                  return ri(e, t, !0);
                }),
                (Bn.sortedLastIndexBy = function (e, t, n) {
                  return li(e, t, us(n, 2), !0);
                }),
                (Bn.sortedLastIndexOf = function (e, t) {
                  if (null == e ? 0 : e.length) {
                    var n = ri(e, t, !0) - 1;
                    if (Va(e[n], t)) return n;
                  }
                  return -1;
                }),
                (Bn.startCase = zr),
                (Bn.startsWith = function (e, t, n) {
                  return (
                    (e = vr(e)),
                    (n = null == n ? 0 : lo(fr(n), 0, e.length)),
                    (t = pi(t)),
                    e.slice(n, n + t.length) == t
                  );
                }),
                (Bn.subtract = xl),
                (Bn.sum = function (e) {
                  return e && e.length ? Qt(e, ol) : 0;
                }),
                (Bn.sumBy = function (e, t) {
                  return e && e.length ? Qt(e, us(t, 2)) : 0;
                }),
                (Bn.template = function (e, t, n) {
                  var o = Bn.templateSettings;
                  n && Es(e, t, n) && (t = i),
                    (e = vr(e)),
                    (t = Er({}, t, o, es));
                  var s,
                    a,
                    r = Er({}, t.imports, o.imports, es),
                    l = Pr(r),
                    c = Jt(r, l),
                    u = 0,
                    p = t.interpolate || ke,
                    d = "__p += '",
                    m = Ie(
                      (t.escape || ke).source +
                        "|" +
                        p.source +
                        "|" +
                        (p === ee ? fe : ke).source +
                        "|" +
                        (t.evaluate || ke).source +
                        "|$",
                      "g",
                    ),
                    f =
                      "//# sourceURL=" +
                      ("sourceURL" in t
                        ? t.sourceURL
                        : "lodash.templateSources[" + ++rt + "]") +
                      "\n";
                  e.replace(m, function (t, n, o, i, r, l) {
                    return (
                      o || (o = i),
                      (d += e.slice(u, l).replace(Se, an)),
                      n && ((s = !0), (d += "' +\n__e(" + n + ") +\n'")),
                      r && ((a = !0), (d += "';\n" + r + ";\n__p += '")),
                      o &&
                        (d +=
                          "' +\n((__t = (" + o + ")) == null ? '' : __t) +\n'"),
                      (u = l + t.length),
                      t
                    );
                  }),
                    (d += "';\n");
                  var h = t.variable;
                  h || (d = "with (obj) {\n" + d + "\n}\n"),
                    (d = (a ? d.replace(q, "") : d)
                      .replace($, "$1")
                      .replace(G, "$1;")),
                    (d =
                      "function(" +
                      (h || "obj") +
                      ") {\n" +
                      (h ? "" : "obj || (obj = {});\n") +
                      "var __t, __p = ''" +
                      (s ? ", __e = _.escape" : "") +
                      (a
                        ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n"
                        : ";\n") +
                      d +
                      "return __p\n}");
                  var _ = Zr(function () {
                    return Te(l, f + "return " + d).apply(i, c);
                  });
                  if (((_.source = d), Qa(_))) throw _;
                  return _;
                }),
                (Bn.times = function (e, t) {
                  if ((e = fr(e)) < 1 || e > f) return [];
                  var n = _,
                    o = bn(e, _);
                  (t = us(t)), (e -= _);
                  for (var i = Xt(o, t); ++n < e; ) t(n);
                  return i;
                }),
                (Bn.toFinite = mr),
                (Bn.toInteger = fr),
                (Bn.toLength = hr),
                (Bn.toLower = function (e) {
                  return vr(e).toLowerCase();
                }),
                (Bn.toNumber = _r),
                (Bn.toSafeInteger = function (e) {
                  return e ? lo(fr(e), -9007199254740991, f) : 0 === e ? e : 0;
                }),
                (Bn.toString = vr),
                (Bn.toUpper = function (e) {
                  return vr(e).toUpperCase();
                }),
                (Bn.trim = function (e, t, n) {
                  if ((e = vr(e)) && (n || t === i)) return e.replace(ae, "");
                  if (!e || !(t = pi(t))) return e;
                  var o = hn(e),
                    s = hn(t);
                  return Si(o, tn(o, s), nn(o, s) + 1).join("");
                }),
                (Bn.trimEnd = function (e, t, n) {
                  if ((e = vr(e)) && (n || t === i)) return e.replace(le, "");
                  if (!e || !(t = pi(t))) return e;
                  var o = hn(e);
                  return Si(o, 0, nn(o, hn(t)) + 1).join("");
                }),
                (Bn.trimStart = function (e, t, n) {
                  if ((e = vr(e)) && (n || t === i)) return e.replace(re, "");
                  if (!e || !(t = pi(t))) return e;
                  var o = hn(e);
                  return Si(o, tn(o, hn(t))).join("");
                }),
                (Bn.truncate = function (e, t) {
                  var n = 30,
                    o = "...";
                  if (er(t)) {
                    var s = "separator" in t ? t.separator : s;
                    (n = "length" in t ? fr(t.length) : n),
                      (o = "omission" in t ? pi(t.omission) : o);
                  }
                  var a = (e = vr(e)).length;
                  if (rn(e)) {
                    var r = hn(e);
                    a = r.length;
                  }
                  if (n >= a) return e;
                  var l = n - fn(o);
                  if (l < 1) return o;
                  var c = r ? Si(r, 0, l).join("") : e.slice(0, l);
                  if (s === i) return c + o;
                  if ((r && (l += c.length - l), sr(s))) {
                    if (e.slice(l).search(s)) {
                      var u,
                        p = c;
                      for (
                        s.global || (s = Ie(s.source, vr(he.exec(s)) + "g")),
                          s.lastIndex = 0;
                        (u = s.exec(p));

                      )
                        var d = u.index;
                      c = c.slice(0, d === i ? l : d);
                    }
                  } else if (e.indexOf(pi(s), l) != l) {
                    var m = c.lastIndexOf(s);
                    m > -1 && (c = c.slice(0, m));
                  }
                  return c + o;
                }),
                (Bn.unescape = function (e) {
                  return (e = vr(e)) && Q.test(e) ? e.replace(z, _n) : e;
                }),
                (Bn.uniqueId = function (e) {
                  var t = ++Fe;
                  return vr(e) + t;
                }),
                (Bn.upperCase = Yr),
                (Bn.upperFirst = Qr),
                (Bn.each = va),
                (Bn.eachRight = ya),
                (Bn.first = $s),
                rl(
                  Bn,
                  ((El = {}),
                  ko(Bn, function (e, t) {
                    je.call(Bn.prototype, t) || (El[t] = e);
                  }),
                  El),
                  { chain: !1 },
                ),
                (Bn.VERSION = "4.17.10"),
                It(
                  [
                    "bind",
                    "bindKey",
                    "curry",
                    "curryRight",
                    "partial",
                    "partialRight",
                  ],
                  function (e) {
                    Bn[e].placeholder = Bn;
                  },
                ),
                It(["drop", "take"], function (e, t) {
                  (qn.prototype[e] = function (n) {
                    n = n === i ? 1 : yn(fr(n), 0);
                    var o =
                      this.__filtered__ && !t ? new qn(this) : this.clone();
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
                    (qn.prototype[e + "Right"] = function (t) {
                      return this.reverse()[e](t).reverse();
                    });
                }),
                It(["filter", "map", "takeWhile"], function (e, t) {
                  var n = t + 1,
                    o = 1 == n || 3 == n;
                  qn.prototype[e] = function (e) {
                    var t = this.clone();
                    return (
                      t.__iteratees__.push({ iteratee: us(e, 3), type: n }),
                      (t.__filtered__ = t.__filtered__ || o),
                      t
                    );
                  };
                }),
                It(["head", "last"], function (e, t) {
                  var n = "take" + (t ? "Right" : "");
                  qn.prototype[e] = function () {
                    return this[n](1).value()[0];
                  };
                }),
                It(["initial", "tail"], function (e, t) {
                  var n = "drop" + (t ? "" : "Right");
                  qn.prototype[e] = function () {
                    return this.__filtered__ ? new qn(this) : this[n](1);
                  };
                }),
                (qn.prototype.compact = function () {
                  return this.filter(ol);
                }),
                (qn.prototype.find = function (e) {
                  return this.filter(e).head();
                }),
                (qn.prototype.findLast = function (e) {
                  return this.reverse().find(e);
                }),
                (qn.prototype.invokeMap = Zo(function (e, t) {
                  return "function" == typeof e
                    ? new qn(this)
                    : this.map(function (n) {
                        return Ro(n, e, t);
                      });
                })),
                (qn.prototype.reject = function (e) {
                  return this.filter(Da(us(e)));
                }),
                (qn.prototype.slice = function (e, t) {
                  e = fr(e);
                  var n = this;
                  return n.__filtered__ && (e > 0 || t < 0)
                    ? new qn(n)
                    : (e < 0 ? (n = n.takeRight(-e)) : e && (n = n.drop(e)),
                      t !== i &&
                        (n = (t = fr(t)) < 0 ? n.dropRight(-t) : n.take(t - e)),
                      n);
                }),
                (qn.prototype.takeRightWhile = function (e) {
                  return this.reverse().takeWhile(e).reverse();
                }),
                (qn.prototype.toArray = function () {
                  return this.take(_);
                }),
                ko(qn.prototype, function (e, t) {
                  var n = /^(?:filter|find|map|reject)|While$/.test(t),
                    o = /^(?:head|last)$/.test(t),
                    s = Bn[o ? "take" + ("last" == t ? "Right" : "") : t],
                    a = o || /^find/.test(t);
                  s &&
                    (Bn.prototype[t] = function () {
                      var t = this.__wrapped__,
                        r = o ? [1] : arguments,
                        l = t instanceof qn,
                        c = r[0],
                        u = l || Ka(t),
                        p = function (e) {
                          var t = s.apply(Bn, Mt([e], r));
                          return o && d ? t[0] : t;
                        };
                      u &&
                        n &&
                        "function" == typeof c &&
                        1 != c.length &&
                        (l = u = !1);
                      var d = this.__chain__,
                        m = !!this.__actions__.length,
                        f = a && !d,
                        h = l && !m;
                      if (!a && u) {
                        t = h ? t : new qn(this);
                        var _ = e.apply(t, r);
                        return (
                          _.__actions__.push({
                            func: ma,
                            args: [p],
                            thisArg: i,
                          }),
                          new Kn(_, d)
                        );
                      }
                      return f && h
                        ? e.apply(this, r)
                        : ((_ = this.thru(p)),
                          f ? (o ? _.value()[0] : _.value()) : _);
                    });
                }),
                It(
                  ["pop", "push", "shift", "sort", "splice", "unshift"],
                  function (e) {
                    var t = Re[e],
                      n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru",
                      o = /^(?:pop|shift)$/.test(e);
                    Bn.prototype[e] = function () {
                      var e = arguments;
                      if (o && !this.__chain__) {
                        var i = this.value();
                        return t.apply(Ka(i) ? i : [], e);
                      }
                      return this[n](function (n) {
                        return t.apply(Ka(n) ? n : [], e);
                      });
                    };
                  },
                ),
                ko(qn.prototype, function (e, t) {
                  var n = Bn[t];
                  if (n) {
                    var o = n.name + "";
                    (Rn[o] || (Rn[o] = [])).push({ name: t, func: n });
                  }
                }),
                (Rn[Hi(i, 2).name] = [{ name: "wrapper", func: i }]),
                (qn.prototype.clone = function () {
                  var e = new qn(this.__wrapped__);
                  return (
                    (e.__actions__ = Pi(this.__actions__)),
                    (e.__dir__ = this.__dir__),
                    (e.__filtered__ = this.__filtered__),
                    (e.__iteratees__ = Pi(this.__iteratees__)),
                    (e.__takeCount__ = this.__takeCount__),
                    (e.__views__ = Pi(this.__views__)),
                    e
                  );
                }),
                (qn.prototype.reverse = function () {
                  if (this.__filtered__) {
                    var e = new qn(this);
                    (e.__dir__ = -1), (e.__filtered__ = !0);
                  } else (e = this.clone()).__dir__ *= -1;
                  return e;
                }),
                (qn.prototype.value = function () {
                  var e = this.__wrapped__.value(),
                    t = this.__dir__,
                    n = Ka(e),
                    o = t < 0,
                    i = n ? e.length : 0,
                    s = (function (e, t, n) {
                      var o = -1,
                        i = n.length;
                      for (; ++o < i; ) {
                        var s = n[o],
                          a = s.size;
                        switch (s.type) {
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
                    })(0, i, this.__views__),
                    a = s.start,
                    r = s.end,
                    l = r - a,
                    c = o ? r : a - 1,
                    u = this.__iteratees__,
                    p = u.length,
                    d = 0,
                    m = bn(l, this.__takeCount__);
                  if (!n || (!o && i == l && m == l))
                    return _i(e, this.__actions__);
                  var f = [];
                  e: for (; l-- && d < m; ) {
                    for (var h = -1, _ = e[(c += t)]; ++h < p; ) {
                      var g = u[h],
                        v = g.iteratee,
                        y = g.type,
                        b = v(_);
                      if (2 == y) _ = b;
                      else if (!b) {
                        if (1 == y) continue e;
                        break e;
                      }
                    }
                    f[d++] = _;
                  }
                  return f;
                }),
                (Bn.prototype.at = fa),
                (Bn.prototype.chain = function () {
                  return da(this);
                }),
                (Bn.prototype.commit = function () {
                  return new Kn(this.value(), this.__chain__);
                }),
                (Bn.prototype.next = function () {
                  this.__values__ === i && (this.__values__ = dr(this.value()));
                  var e = this.__index__ >= this.__values__.length;
                  return {
                    done: e,
                    value: e ? i : this.__values__[this.__index__++],
                  };
                }),
                (Bn.prototype.plant = function (e) {
                  for (var t, n = this; n instanceof Wn; ) {
                    var o = Us(n);
                    (o.__index__ = 0),
                      (o.__values__ = i),
                      t ? (s.__wrapped__ = o) : (t = o);
                    var s = o;
                    n = n.__wrapped__;
                  }
                  return (s.__wrapped__ = e), t;
                }),
                (Bn.prototype.reverse = function () {
                  var e = this.__wrapped__;
                  if (e instanceof qn) {
                    var t = e;
                    return (
                      this.__actions__.length && (t = new qn(this)),
                      (t = t.reverse()).__actions__.push({
                        func: ma,
                        args: [ea],
                        thisArg: i,
                      }),
                      new Kn(t, this.__chain__)
                    );
                  }
                  return this.thru(ea);
                }),
                (Bn.prototype.toJSON =
                  Bn.prototype.valueOf =
                  Bn.prototype.value =
                    function () {
                      return _i(this.__wrapped__, this.__actions__);
                    }),
                (Bn.prototype.first = Bn.prototype.head),
                Je &&
                  (Bn.prototype[Je] = function () {
                    return this;
                  }),
                Bn
              );
            })();
            (ht._ = gn),
              (o = function () {
                return gn;
              }.call(t, n, t, e)) === i || (e.exports = o);
          }.call(this);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "QlH4Hz9I",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-description\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-description\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\abilities-section\\\\ability-description\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-content-column"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-ability-description-wrapper"],["flush-element"],["text","\\n      "],["open-element","h4",[]],["static-attr","class","cdp-ability-name"],["flush-element"],["append",["unknown",["ability","name"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-ability-info-wrapper"],["flush-element"],["text","\\n"],["text","      "],["close-element"],["text","\\n\\n      "],["open-element","lol-uikit-content-block",[]],["static-attr","class","cdp-ability-description"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["text","          "],["open-element","p",[]],["static-attr","class","cdp-ability-dynamic-desc"],["flush-element"],["append",["helper",["sanitize"],[["get",["ability","description"]]],null],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          i = n(98),
          s = n(66);
        n(99);
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
          layout: n(100),
          clientConfig: o.Ember.inject.service("client-config"),
          tieredSkinsConfig: o.Ember.computed.alias("clientConfig.tieredSkins"),
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
          isTieredSkinEventActive: o.Ember.computed.alias(
            "tieredSkinsConfig.eventActive",
          ),
          isTieredSkinEventPurchased: o.Ember.computed.alias(
            "tieredSkinsConfig.eventPassPurchased",
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
            "isTieredSkinEventActive",
            "isTieredSkin",
          ),
          isTieredSkinWithEventOff: o.Ember.computed(
            "hasQuestForms",
            "isTieredSkinEventActive",
            "isTieredSkin",
            function () {
              return (
                this.get("hasQuestForms") &&
                !this.get("isTieredSkinEventActive") &&
                this.get("isTieredSkin")
              );
            },
          ),
          showTieredSkinEventPurchaseButton: o.Ember.computed.or(
            "isTieredSkinWithEventOff",
            "isTieredSkinWithEventOn",
          ),
          isCDPButtonDisabled: o.Ember.computed(
            "isTieredSkinEventActive",
            "isTieredSkinEventPurchased",
            function () {
              return (
                !this.get("isTieredSkinEventActive") ||
                this.get("isTieredSkinEventPurchased")
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
                  this.overrideSkinDescription(t.description),
                  this.overrideSplashVideoPath(t.collectionSplashVideoPath);
              }
            },
          ),
          sendTelemetryEvent(e) {
            o.Telemetry.sendCustomData("cdp_skins_section_event", {
              puuid: this.get("puuid"),
              event: e,
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
              i = {
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
            r.assignFlyout(e, t, n, i),
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
              s.SFX.flyoutCloseClick.play();
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
              s.SFX.flyoutOpenClick.play();
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
          resetSkinOverrides() {
            this.set("activeSkinObject.skinSplashOverride", null),
              this.set("activeSkinObject.skinSplashVideoOverride", null),
              this.set("activeSkinObject.skinDescriptionOverride", null),
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
                    i.TELEMETRY_EVENTS.CLICK_ON_QUEST_FORMS_FLYOUT,
                  ));
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
        };
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const o = n(1).Ember;
        e.exports = o.HTMLBars.template({
          id: "VzM5MwEt",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\root\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\root\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\root\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["skins"]]],null,22],["text","\\n\\n\\n"],["block",["if"],[["get",["showTieredSkinEventPurchaseButton"]]],null,16,9]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_actions_unavailable"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"unlockSkin",["get",["skinInfo"]]],null],null],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_actions_unlock"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isPurchasable"]]],null,1,0]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_store_owned_message"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["skinOwned"]]],null,3,2]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"unlockChampion",["get",["champion","id"]]],null],null],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_actions_unlock"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_store_owned_message"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["championOwned"]]],null,6,5]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","cdp-unlock-button-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["activeSkinObject","isBase"]]],null,7,4],["text","  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["showStoreButton"]]],null,8]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_actions_unavailable"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_store_owned_message"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["selectedSkinTier","ownership","owned"]]],null,11,10]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","cdp-unlock-button-content"],["flush-element"],["text","\\n            "],["open-element","img",[]],["static-attr","src","/fe/lol-static-assets/images/skin-viewer/tiered/purchase-pass-icon.svg"],["flush-element"],["close-element"],["text","\\n            "],["append",["unknown",["tra","cdp_actions_purchase_pass"]],false],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","cdp-unlock-button"],["static-attr","disabled",""],["flush-element"],["text","\\n          "],["append",["unknown",["tra","cdp_pass_purchased"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isTieredSkinEventPurchased"]]],null,14,13]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","cdp-unlock-button-wrapper"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isTieredSkinWithEventOn"]]],null,15,12],["text","  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["tiered-transformations"],null,[["showcaseComponent","skinTiers"],[["get",[null]],["get",["questSkinTiers"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","class",["concat",["quest-forms ",["helper",["unless"],[["get",["hasQuestForms"]],"hidden"],null]," ",["helper",["if"],[["get",["isTieredSkin"]],"hidden"],null]]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"toggleFlyout"],null],null],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","icon"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","quest-forms"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"toggleFlyout"],null],null],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","icon tiered"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","theme-features"],["flush-element"],["text","\\n        "],["open-element","h4",[]],["flush-element"],["append",["unknown",["tra","cdp_theme_features"]],false],["close-element"],["text","\\n        "],["append",["helper",["sanitize"],[["get",["currentSkinDescription"]]],null],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-section",[]],["dynamic-attr","section-id",["concat",["skin_",["get",["index"]]]]],["static-attr","class","cdp-skin-overlay-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["currentSkinDescription"]]],null,20],["text","    "],["close-element"],["text","\\n"]],"locals":["skin","index"]},{"statements":[["text","  "],["append",["helper",["uikit-background-switcher"],null,[["src"],[["get",["currentBackgroundPath"]]]]],false],["text","\\n  "],["open-element","div",[]],["static-attr","class","cdp-skin-overlay"],["flush-element"],["close-element"],["text","\\n  "],["open-element","lol-uikit-section-controller",[]],["dynamic-attr","selected-item",["concat",[["unknown",["activeSkin"]]]]],["static-attr","animation","crossfade"],["static-attr","class","cdp-skins-section-controller"],["flush-element"],["text","\\n"],["block",["each"],[["get",["skins"]]],null,21],["text","  "],["close-element"],["text","\\n\\n  "],["append",["helper",["skins-carousel"],null,[["storeSkinInfo","champion","championSkins","activeSkinIndex","updateActiveSkin"],[["get",["skinInfo"]],["get",["champion"]],["get",["skins"]],["get",["activeSkinIndex"]],["helper",["action"],[["get",[null]],"updateActiveSkin"],null]]]],false],["text","\\n  "],["open-element","div",[]],["static-attr","class","related"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isTieredSkinWithEventOff"]]],null,19,18],["text","  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isTieredSkinWithEventOn"]]],null,17]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        n(102);
        const i = 97,
          s =
            "/fe/lol-champion-details/audio/sfx-champselect-button-arrowback-click.ogg",
          a =
            "/fe/lol-champion-details/audio/sfx-champselect-button-arrowfwd-click.ogg",
          r =
            "/lol-client-config/v3/client-config/lol.client_settings.navigation.enableRewardsProgram",
          l = o.DataBinding.bindTo((0, o.getProvider)().getSocket());
        e.exports = o.Ember.Component.extend({
          classNames: ["cdp-skins-carousel-container"],
          layout: n(103),
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
            const i = this.get("initialOffset");
            let s = this.get("offset");
            "right" === t && e < n
              ? ((s -= -97 * o), this.resetCarousel(s))
              : "left" === t &&
                e > n &&
                ((s += -97 * o), this.resetCarousel(s));
            const a = i + -97 * e;
            this.set("offset", a);
            const r = 0.9 * -(s - a),
              l = { duration: 70, fill: "forwards" },
              c = { duration: 400, fill: "forwards" },
              u = {
                first: [
                  {
                    transform: `translateX(${s}px)`,
                    easing: "cubic-bezier(1, 0, 1, 1)",
                  },
                  { transform: `translateX(${s + r}px)` },
                ],
                second: [
                  {
                    transform: `translateX(${s + r}px)`,
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
          activeSkinName: o.Ember.computed(
            "skins",
            "activeSkinIndex",
            function () {
              const e = this.get("skins"),
                t = this.get("activeSkinIndex");
              return e ? e[t].name : "";
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
                        const t = e.questSkinInfo.tiers.reduce(
                          (e, t) => (t.ownership.owned ? t.tilePath : e),
                          e.questSkinInfo?.tiers?.[0]?.tilePath,
                        );
                        o.Ember.set(e, "customTilePath", t);
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
            return e > 5 ? 513 : 125 + (e - 1) * i;
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
                  (o.AudioPlugin.getChannel("sfx-ui").playSound(s),
                  this.moveCarousel(e, "left"));
            },
            skinThumbnailClicked: function (e, t) {
              const n = this.get("activeSkinIndex");
              let i,
                r,
                l = e;
              if ("right" === t) (i = "right"), (r = a);
              else if ("left" === t) {
                const t = this.get("bufferSize");
                (l = this.get("skins.length") - t + e), (i = "left"), (r = s);
              } else if (n < e) (i = "right"), (r = a);
              else {
                if (!(n > e)) return;
                (i = "left"), (r = s);
              }
              o.AudioPlugin.getChannel("sfx-ui").playSound(r),
                this.moveCarousel(l, i);
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
          id: "9H6QdZcJ",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\skins-carousel\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\skins-carousel\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\skins-carousel\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","cdp-emblem-overlay"],["flush-element"],["text","\\n"],["block",["if"],[["get",["activeSkinEmblems"]]],null,10],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["champion-skin-name ",["helper",["if"],[["get",["isBaseSkin"]],"base-skin","skin-name"],null]]]],["flush-element"],["text","\\n  "],["append",["unknown",["activeSkinName"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","skins-carousel"],["flush-element"],["text","\\n"],["block",["if"],[["get",["longCarousel"]]],null,8],["text","\\n  "],["open-element","div",[]],["static-attr","class","carousel-track-container"],["dynamic-attr","style",["concat",["width:",["unknown",["carouselWidth"]],"px"]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","carousel-track"],["dynamic-attr","style",["concat",["transform: translateX(",["unknown",["initialOffset"]],"px)"]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["leftCarouselBuffer"]]],null,7],["text","\\n"],["block",["each"],[["get",["skins"]]],null,5],["text","\\n"],["block",["each"],[["get",["rightCarouselBuffer"]]],null,3],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["longCarousel"]]],null,1],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","skin-selection-indicator"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","line line-left"],["flush-element"],["close-element"],["text","\\n  "],["open-element","ul",[]],["static-attr","class","skin-selection-indicator-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["skins"]]],null,0],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","line line-right"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","li",[]],["dynamic-attr","class",["concat",["skin-pip ",["helper",["if"],[["get",["skin","isViewed"]],"skin-pip-selected"],null]]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"skinPipClicked",["get",["index"]]],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":["skin","index"]},{"statements":[["text","    "],["open-element","lol-uikit-arrow-button",[]],["static-attr","direction","right"],["static-attr","class","next-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"nextSkin"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","cdp-skin-thumbnail-gem-overlay"],["flush-element"],["text","\\n            "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["skin","rarityGemPath"]]]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["buffer-wrapper\\n        ",["helper",["if"],[["get",["skin","ownership","owned"]],"owned"],null],"\\n        ",["helper",["unless"],[["get",["skin","ownership","owned"]],"not-owned"],null],"\\n        ",["unknown",["skin","ftpStyleClassName"]],"\\n        ",["helper",["if"],[["get",["skin","isViewed"]],"active-buffer"],null]]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","skin-thumbnail-buffer"],["dynamic-attr","style",["concat",["background-image:url(",["helper",["if"],[["get",["skin","customTilePath"]],["get",["skin","customTilePath"]],["get",["skin","tilePath"]]],null],")"]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"skinThumbnailClicked",["get",["index"]],"right"],null],null],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["skin","rarityGemPath"]]],null,2],["text","      "],["close-element"],["text","\\n"]],"locals":["skin","index"]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","cdp-skin-thumbnail-gem-overlay"],["flush-element"],["text","\\n            "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["skin","rarityGemPath"]]]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["thumbnail-wrapper\\n        ",["helper",["if"],[["get",["skin","ownership","owned"]],"owned"],null],"\\n        ",["helper",["unless"],[["get",["skin","ownership","owned"]],"not-owned"],null],"\\n        ",["unknown",["skin","ftpStyleClassName"]],"\\n        ",["helper",["if"],[["get",["skin","isViewed"]],"active-skin"],null]]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-skin-thumbnail-img"],["dynamic-attr","style",["concat",["background-image:url(",["helper",["if"],[["get",["skin","customTilePath"]],["get",["skin","customTilePath"]],["get",["skin","tilePath"]]],null],")"]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"skinThumbnailClicked",["get",["index"]],"center"],null],null],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["skin","rarityGemPath"]]],null,4],["text","      "],["close-element"],["text","\\n"]],"locals":["skin","index"]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","cdp-skin-thumbnail-gem-overlay"],["flush-element"],["text","\\n            "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["skin","rarityGemPath"]]]]],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["buffer-wrapper\\n        ",["helper",["unless"],[["get",["skin","playable"]],"not-owned"],null],"\\n        ",["unknown",["skin","ftpStyleClassName"]],"\\n        ",["helper",["if"],[["get",["skin","isViewed"]],"active-buffer"],null]]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","skin-thumbnail-buffer"],["dynamic-attr","style",["concat",["background-image:url(",["helper",["if"],[["get",["skin","customTilePath"]],["get",["skin","customTilePath"]],["get",["skin","tilePath"]]],null],")"]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"skinThumbnailClicked",["get",["index"]],"left"],null],null],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["skin","rarityGemPath"]]],null,6],["text","      "],["close-element"],["text","\\n"]],"locals":["skin","index"]},{"statements":[["text","    "],["open-element","lol-uikit-arrow-button",[]],["static-attr","direction","left"],["static-attr","class","prev-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"prevSkin"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["emblem","emblemPath","large"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["emblem"]},{"statements":[["block",["each"],[["get",["activeSkinEmblems"]]],null,9]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          i = n(66);
        n(105),
          (e.exports = o.Ember.Component.extend({
            classNames: ["tiered-transformations"],
            layout: n(106),
            showcaseComponent: null,
            selectedSkinIndex: o.Ember.computed.alias(
              "showcaseComponent.selectedQuestFormIndex",
            ),
            actions: {
              tierClicked(e) {
                i.SFX.gridClick.play(),
                  this.get("showcaseComponent").setSelectedQuestForm(e);
              },
              onMouseEnterTier(e) {
                const t = this.get("skinTiers");
                this.get("showcaseComponent").overrideSplashPath(
                  t[e].uncenteredSplashPath,
                ),
                  this.get("showcaseComponent").overrideSkinDescription(
                    t[e].description,
                  ),
                  this.get("showcaseComponent").overrideSplashVideoPath(
                    t[e].collectionSplashVideoPath,
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
                  this.get("showcaseComponent").overrideSkinDescription(
                    e.description,
                  ),
                  this.get("showcaseComponent").overrideSplashVideoPath(
                    e.collectionSplashVideoPath,
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
          id: "0tL7HPRl",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\tiered-transformations\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\tiered-transformations\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\tiered-transformations\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","tiered-transformations__container"],["flush-element"],["text","\\n  "],["open-element","hr",[]],["static-attr","class","tiered-transformations__bar"],["flush-element"],["close-element"],["text","\\n"],["block",["each"],[["get",["skinTiers"]]],null,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","tiered-transformations__item"],["flush-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["image ",["helper",["if"],[["get",["tier","ownership","owned"]]," obtained"],null]," ",["helper",["if"],[["helper",["eq"],[["get",["selectedSkinIndex"]],["get",["index"]]],null],"selected"],null]]]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"tierClicked",["get",["index"]]],null],null],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"onMouseEnterTier",["get",["index"]]],null],null],["dynamic-attr","onmouseleave",["helper",["action"],[["get",[null]],"onMouseLeaveTier"],null],null],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":["tier","index"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1);
        const i = "/lol-store",
          s = "v1/catalog/sales",
          a = o.DataBinding.bindTo((0, o.getProvider)().getSocket());
        e.exports = o.Ember.Service.extend({
          init: function () {
            this._super(...arguments),
              this.set("salesData", []),
              this.observeSalesData();
          },
          willDestroy() {
            this._super(...arguments), a.removeObserver(`${i}/${s}`, this);
          },
          observeSalesData: function () {
            a.observe(`${i}/${s}`, this, (e) => {
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
          i = n(62),
          s = n(98),
          a = n(44);
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
              ? e.tags && e.tags.includes(s.StoreSkinTypes.QUEST_SKIN_TAG)
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
              i.CDP_PAW_ID,
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
              i.CDP_PAW_ID,
            ).then(() => {
              o.PawPlugin.getBaseSkinLineData(e.offerId).then((e) => {
                o.PawPlugin.populatePawTemplateModal(e);
              });
            });
          },
          openPawSkinModal(e) {
            o.PawPlugin.createPAWModal(
              { itemId: e, inventoryType: a.PAW.INVENTORY_TYPES.CHAMPION_SKIN },
              i.CDP_PAW_ID,
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
        const i = (0, o.EmberDataBinding)({
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
        e.exports = o.Ember.Service.extend(i, {
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
          i = n(62),
          s = n(66);
        const a = "/lol-statstones",
          r = "v2/player-statstones-self",
          l = "v1/featured-champion-statstones";
        e.exports = o.Ember.Service.extend({
          championService: o.Ember.inject.service("champion"),
          championId: o.Ember.computed.alias("championService.championId"),
          milestoneCompletionLevel: i.MILESTONE_COMPLETION_LEVEL,
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
            const i = { index: n, existingFeatured: e };
            return (
              this.binding
                .get("/lol-summoner/v1/current-summoner")
                .then((e) => {
                  const i = {
                    puuid: e.puuid,
                    statstoneId: t.statstoneId,
                    index: n,
                    type: "eternal_featured",
                  };
                  o.Telemetry.sendCustomData("eternals_telemetry_event", i);
                }),
              this.binding.post(
                `${a}/${l}/${t.boundChampionItemId}/${t.statstoneId}`,
                i,
              )
            );
          },
          stripRarityFromCategory(e) {
            const t = e.indexOf("_");
            return -1 !== t && (e = e.substring(0, t)), e;
          },
          isMilestonesCompleted: (e) => e >= i.MILESTONE_COMPLETION_LEVEL,
          playSoundForStatstone(e) {
            s.SFX[e].play();
          },
          pauseSoundForStatstone(e) {
            s.SFX[e].stop();
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
            return e ? i.UNIQUE_NAME : i.COMMON_NAME;
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
        const i = [
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
              i.forEach((e) => {
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
              i.forEach((e) => {
                const t = `v3/client-config/${e.path}`;
                this.clientConfigDataBinding.unobserve(t, this);
              });
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var o = n(1),
          i = n(66);
        n(114),
          (e.exports = o.Ember.Component.extend({
            classNames: ["rcp-fe-lol-champion-details-featured-statstones"],
            layout: n(115),
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
                  s = this.get("caller");
                return (
                  i.SFX.buttonGoldClick.play(),
                  this.get("statstonesService")
                    .setFeaturedStatstone(n, t, e)
                    .catch((e) => {
                      this.createFeatureErrorToast();
                    })
                    .finally(() => {
                      o.FlyoutManager.sendEvent(s, "hide");
                    })
                );
              },
              mouseOver() {
                i.SFX.gridHover.play();
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
          id: "B9k8wvLl",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\feature-flyout\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\feature-flyout\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\progression-section\\\\feature-flyout\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-dialog-frame",[]],["static-attr","class","cdp-feature-flyout"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","class","cdp-feature-flyout-content"],["flush-element"],["text","\\n  "],["open-element","h5",[]],["static-attr","class","cdp-feature-flyout-title"],["flush-element"],["append",["unknown",["tra","cdp_statstones_feature_title"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["featuredStatstones"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","cdp-feature-flyout-item"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"setFeatured",["get",["index"]]],null],null],["dynamic-attr","onmouseover",["helper",["action"],[["get",[null]],"mouseOver"],null],null],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-feature-flyout-statstone-image"],["flush-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","cdp-feature-flyout-statstone-statue"],["dynamic-attr","src",["unknown",["statstone","imageUrl"]],null],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","cdp-feature-flyout-featured"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-feature-flyout-statstone-info"],["flush-element"],["text","\\n        "],["open-element","h5",[]],["static-attr","class","cdp-feature-flyout-statstone-value"],["flush-element"],["append",["unknown",["statstone","formattedValue"]],false],["close-element"],["text","\\n        "],["open-element","p",[]],["static-attr","class","cdp-feature-flyout-statstone-name"],["flush-element"],["append",["unknown",["statstone","name"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","cdp-feature-flyout-statstone-slot-numbner"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["statstone","index"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var o = n(1),
          i = n(66);
        n(117);
        const s = o.UIKit.getFlyoutManager();
        var a = o.Ember.Component.extend({
          classNames: ["quest-forms-flyout"],
          isShow: !1,
          layout: n(118),
          selectedSkinIndex: o.Ember.computed.alias(
            "showcaseComponent.selectedQuestFormIndex",
          ),
          skinTiers: null,
          caller: null,
          showcaseComponent: null,
          isTieredSkin: !1,
          didInsertElement() {
            const e = this.element.querySelectorAll(".quest-form-tier");
            this.bindHoverEvents(e), this._super(...arguments);
          },
          willDestroyElement() {
            const e = this.element.querySelectorAll(".quest-form-tier");
            this.removeHoverEvents(e), this._super(...arguments);
          },
          getFormIndexFromClassList(e) {
            let t = -1;
            return (
              e.forEach((e) => {
                e.startsWith("form-") && (t = e.substring(e.indexOf("-") + 1));
              }),
              t
            );
          },
          overrideTargetSplashPath(e) {
            const t = this.get("skinTiers");
            this.get("showcaseComponent").overrideSplashPath(
              t[e].uncenteredSplashPath,
            ),
              this.get("showcaseComponent").overrideSkinDescription(
                t[e].description,
              ),
              this.get("showcaseComponent").overrideSplashVideoPath(
                t[e].collectionSplashVideoPath,
              );
          },
          onMouseEnter(e) {
            const t = this.getFormIndexFromClassList(e.classList);
            this.overrideTargetSplashPath(t), i.SFX.gridHover.play();
          },
          onMouseLeave() {
            const e =
              this.get("skinTiers")[
                this.get("showcaseComponent.lastSelectedSkinIndex")
              ] ?? this.get("showcaseComponent.questSkinInfo");
            this.get("showcaseComponent").overrideSplashPath(
              e.uncenteredSplashPath,
            ),
              this.get("showcaseComponent").overrideSkinDescription(
                e.description,
              ),
              this.get("showcaseComponent").overrideSplashVideoPath(
                e.collectionSplashVideoPath,
              );
          },
          bindHoverEvents(e) {
            e &&
              e.forEach((e) => {
                e.addEventListener(
                  "mouseenter",
                  this.onMouseEnter.bind(this, e),
                ),
                  e.addEventListener(
                    "mouseleave",
                    this.onMouseLeave.bind(this),
                  );
              });
          },
          removeHoverEvents(e) {
            e &&
              e.forEach((e) => {
                e.removeEventListener(
                  "mouseenter",
                  this.onMouseEnter.bind(this, e),
                ),
                  e.removeEventListener(
                    "mouseleave",
                    this.onMouseLeave.bind(this),
                  );
              });
          },
          actions: {
            tierClicked(e) {
              if (
                !this.get("skinTiers")[e].ownership.owned &&
                !this.get("isTieredSkin")
              )
                return;
              i.SFX.gridClick.play();
              const t = this.get("caller");
              s.sendEvent(t, "hide"),
                this.get("showcaseComponent").setSelectedQuestForm(e),
                this.get("showcaseComponent").hideFlyoutModal();
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
          id: "cuOhZnw5",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\quest-forms-popup\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\quest-forms-popup\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champion-details\\\\src\\\\app\\\\champion-details\\\\skins-section\\\\quest-forms-popup\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["quest-forms ",["helper",["if"],[["get",["isTieredSkin"]],"tiered"],null]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["skinTiers"]]],null,4],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","span",[]],["static-attr","class","quest-form-tier-lock"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","span",[]],["static-attr","class","quest-form-tier-number"],["flush-element"],["append",["helper",["concat-tra"],["cdp_skins_quest_form_stage_",["get",["tier","stage"]]],null],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["tier","ownership","owned"]]],null,1,0]],"locals":[]},{"statements":[["text","            "],["open-element","span",[]],["static-attr","class","quest-form-tier-emblem"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["quest-form-tier form-",["get",["index"]],"  ",["helper",["if"],[["helper",["eq"],[["get",["selectedSkinIndex"]],["get",["index"]]],null],"selected"],null]," ",["helper",["if"],[["get",["tier","ownership","owned"]],"unlocked"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"tierClicked",["get",["index"]]],null],null],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","quest-form-tier-name"],["flush-element"],["append",["unknown",["tier","shortName"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["isTieredSkin"]]],null,3,2],["text","      "],["close-element"],["text","\\n"]],"locals":["tier","index"]}],"hasPartials":false}',
          meta: {},
        });
      },
    ],
    t = {};
  function n(o) {
    var i = t[o];
    if (void 0 !== i) return i.exports;
    var s = (t[o] = { id: o, loaded: !1, exports: {} });
    return e[o].call(s.exports, s, s.exports, n), (s.loaded = !0), s.exports;
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
        i = document.currentScript.ownerDocument;
      const s = window.getPluginAnnounceEventName(o);
      i.addEventListener(
        s,
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
