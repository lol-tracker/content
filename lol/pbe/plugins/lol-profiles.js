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
        const a = {
          init: function (e, n) {
            return (t = e), this.add(n);
          },
          _getValue: function (e, n) {
            let a;
            return (
              "function" == typeof n
                ? ((a = n(t)),
                  a ||
                    console.warn(
                      "The function for key " + e + " returned a falsy value: ",
                      a,
                    ))
                : "string" == typeof n
                  ? ((a = t.get(n)),
                    a ||
                      console.warn(
                        "The provider `get` invocation for the key " +
                          e +
                          " returned a falsy value: ",
                        a,
                      ))
                  : "object" == typeof n && (a = n),
              a
            );
          },
          add: function (e) {
            e = e || {};
            const t = [],
              n = this;
            return (
              Object.keys(e).forEach(function (a) {
                const s = e[a],
                  i = n._getValue(a, s);
                i && i.then
                  ? (i.then(function (e) {
                      e ||
                        console.warn(
                          "The promise for the key " +
                            a +
                            " resolved with a falsy value: ",
                          e,
                        ),
                        n._addValue(a, e);
                    }),
                    t.push(i))
                  : n._addValue(a, i);
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
        e.exports = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          s = l(n(3)),
          i = l(n(4)),
          r = l(n(5)),
          o = n(7);
        function l(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const { ProfilePrivacySetting: d, ProfilePrivacyEnabledState: m } =
          o.PROFILE_PRIVACY;
        t.default = class {
          constructor() {
            (this._profilesEnabled = !0),
              (this._isMatchHistoryInitialized = !1),
              (this._isChallengesCollectionInitialized = !1),
              (this._componentRegistrations = {}),
              (this._platformConfigListeners = new Set()),
              (this._isPrivacyEnabled = !1),
              (this._platformConfigBinding = (0, a.DataBinding)(
                "/lol-platform-config",
                (0, a.getProvider)().getSocket(),
              )),
              (this._summonerBinding = (0, a.DataBinding)(
                "/lol-summoner",
                (0, a.getProvider)().getSocket(),
              )),
              this._createComponents(),
              (this._challengesManager = new r.default()),
              (this._matchHistoryManager = new i.default()),
              this._registerProfilesEnabledListeners(),
              this._registerPrivacyEnabledListener();
          }
          _createComponents() {
            const e = n(25),
              t = n(241),
              a = n(259);
            e(),
              (this._modalProfile = t()),
              (this._mainProfile = a(this)),
              this._initializeModalObservers();
          }
          _initializeModalObservers() {
            this._rankedReferenceModalObserver = new s.default();
          }
          _registerProfilesEnabledListeners() {
            this._platformConfigBinding.observe(
              "/v1/namespaces/LcuProfiles",
              (e) => {
                const t = Object.assign({}, e);
                (t.Enabled =
                  a.Lodash.isNil(e) || a.Lodash.isNil(e.Enabled) || e.Enabled),
                  (this._profilesEnabled = t.Enabled);
                try {
                  a.Navigation.setItemEnabled(
                    this._mainProfile.mainNavigationItem,
                    this._profilesEnabled,
                  ),
                    this._isMatchHistoryInitialized ||
                      (this._matchHistoryManager.init(),
                      (this._isMatchHistoryInitialized = !0)),
                    this._isChallengesCollectionInitialized ||
                      (this._challengesManager.init(),
                      (this._isChallengesCollectionInitialized = !0));
                } catch (e) {
                  const t = e && e.message ? e.message : "unknown";
                  a.logger.error("PrivateAPI initialization error: " + t);
                }
                for (const e of this._platformConfigListeners) e(t);
              },
            );
          }
          _registerPrivacyEnabledListener() {
            this._summonerBinding.observe(
              "/v1/profile-privacy-enabled",
              (e) => {
                this._isPrivacyEnabled = e === m.ENABLED;
              },
            );
          }
          getRankedReferenceModalButton() {
            return {
              RankedReferenceModalButtonComponent: n(218),
              RankedReferenceModalButtonComponentStyles: n(219),
              RankedReferenceModalButtonComponentTemplate: n(220),
            };
          }
          get profilesEnabled() {
            return this._profilesEnabled;
          }
          get componentRegistrations() {
            return this._componentRegistrations;
          }
          get platformConfigListeners() {
            return this._platformConfigListeners;
          }
          registerComponent(e, t, n) {
            if (!e || !t) return;
            let a = this._componentRegistrations[e];
            a || (a = {}),
              n ? (a[t] = n) : delete a[t],
              (this._componentRegistrations[e] = a);
          }
          get mainProfile() {
            return this._mainProfile;
          }
          get modalProfile() {
            return this._modalProfile;
          }
          showOverlay(e) {
            if (!this._profilesEnabled) return;
            let t;
            (t = e.puuid
              ? this._summonerBinding.get("/v2/summoners/puuid/" + e.puuid)
              : this._summonerBinding.get("/v1/summoners/" + e.summonerId)),
              t
                .then((e) => {
                  this.showOverlayForSummoner(e);
                })
                .catch((e) => {
                  a.logger.error("Error showing summoner profile", e);
                });
          }
          showOverlayForSummoner(e) {
            this._profilesEnabled &&
              (this._isSummonerPrivate(e)
                ? this.showAlertSummonerIsPrivate(e.displayName)
                : this._modalProfile.overviewSection.show(e));
          }
          _isSummonerPrivate(e) {
            return !!this._isPrivacyEnabled && e.privacy === d.PRIVATE;
          }
          showAlertSummonerIsPrivate(e) {
            const t = a.tra.get("profile_private_hint_text"),
              n = a.tra.formatString("profile_private_cannot_view", {
                name: e,
              }),
              s = a.tra.get("lib_ui_dialog_alert_ok"),
              i = a.TemplateHelper.contentBlockDialog(
                t,
                n,
                "dialog-small",
                "profile-private-alert",
              );
            a.ModalManager.add({
              type: "DialogAlert",
              data: { contents: i, okText: s },
            });
          }
          async hasPrivateProfile(e) {
            if (
              (await this._summonerBinding.get(
                "/v1/profile-privacy-enabled",
              )) === m.ENABLED
            ) {
              const t = await this._summonerBinding.get(`/v1/summoners/${e}`);
              if (t && t.privacy === d.PRIVATE) return !0;
            }
            return !1;
          }
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        const s = "/lol-login/v1/session",
          i =
            "/lol-platform-config/v1/namespaces/LeagueConfig/RankedReferenceModalEnabled",
          r =
            "/lol-platform-config/v1/namespaces/ClientSystemStates/currentSeason",
          o = "/lol-settings/v2/ready",
          l = "/lol-settings/v1/account/lol-profiles",
          d = "/lol-summoner/v1/current-summoner",
          m = "ranked-reference-modal-login-seen-for-season";
        t.default = class {
          constructor() {
            (this._requirements = {
              login: !1,
              enabled: !1,
              settingsReady: !1,
              settingsExist: !1,
              isNamedSummoner: !1,
              summonerLevel: null,
              currentSeason: null,
              seenForSeason: null,
              fullyLoaded: !1,
            }),
              (this._binding = a.DataBinding.bindTo(
                (0, a.getProvider)().getSocket(),
              )),
              this._binding.addObserver(s, this, this._updateLogin),
              this._binding.addObserver(i, this, this._updateEnabledConfig),
              this._binding.addObserver(o, this, this._updateSettingsReady),
              this._binding.addObserver(d, this, this._updateSummoner),
              this._binding.addObserver(r, this, this._updateCurrentSeason),
              a.lockAndLoadPlugin.addEventListener(
                "unlock",
                this._setLoadingScreenLock,
                this,
              );
          }
          _setLoadingScreenLock() {
            this._updateRequirements({ fullyLoaded: !0 }),
              a.lockAndLoadPlugin.removeEventListener(
                "unlock",
                this._setLoadingScreenLock,
                this,
              );
          }
          _updateCurrentSeason(e) {
            e && this._updateRequirements({ currentSeason: e });
          }
          _updateLogin(e) {
            const t = e && "SUCCEEDED" === e.state;
            this._updateRequirements({ login: t });
          }
          _updateEnabledConfig(e) {
            (e = Boolean(e)), this._updateRequirements({ enabled: e });
          }
          _updateSummoner(e) {
            if (e && e.summonerLevel) {
              const { summonerLevel: t } = e;
              this._updateRequirements({ summonerLevel: t });
            }
            const t = e && !e.unnamed && !e.nameChangeFlag;
            this._updateRequirements({ isNamedSummoner: t });
          }
          _updateSettingsReady(e) {
            (e = Boolean(e)),
              this._updateRequirements({ settingsReady: e }),
              e && this._binding.addObserver(l, this, this._updateSettings);
          }
          _updateSettings(e) {
            const t = void 0 !== e,
              { settingsReady: n } = this._requirements,
              a = { settingsExist: t };
            if (t && n) {
              const t = e && e.data && e.data[m];
              a.seenForSeason = t ? e.data[m] : 9;
            }
            this._updateRequirements(a);
          }
          _updateRequirements(e) {
            (this._requirements = a.Lodash.assign(this._requirements, e)),
              this._requirements.login &&
                this._requirements.enabled &&
                this._requirements.settingsExist &&
                this._requirements.isNamedSummoner &&
                this._requirements.summonerLevel &&
                this._requirements.fullyLoaded &&
                (this._requirements.summonerLevel >= 30 &&
                  this._requirements.seenForSeason &&
                  this._requirements.currentSeason &&
                  this._requirements.currentSeason >= 9 &&
                  this._requirements.currentSeason >
                    this._requirements.seenForSeason &&
                  (this._showLoginModal(),
                  this._binding.removeObserver(l, this),
                  this._binding.removeObserver(r, this)),
                this._binding.removeObserver(d, this),
                this._binding.removeObserver(s, this),
                this._binding.removeObserver(i, this),
                this._binding.removeObserver(o, this));
          }
          _showLoginModal() {
            this._shownThisSession ||
              ((this._shownThisSession = !0), this.showLoginModal());
          }
          showLoginModal() {
            const e = () => this._closeModal();
            return a.LeagueTierNames.getTiersForQueue("RANKED_SOLO_5x5").then(
              (t) => {
                (this._app = a.ComponentFactory.create(
                  "RankedReferenceModalComponent",
                  { closeCallback: e, tiers: t },
                )),
                  (this._modal = a.ModalManager.add({
                    type: "DialogAlert",
                    data: {
                      contents: this._app.domNode,
                      okText: a.tra.get("ranked_reference_modal_queue_up_text"),
                      dismissible: !0,
                      dismissibleType: "inside",
                    },
                    show: !0,
                  })),
                  this._modal.okPromise
                    .then((e) => {
                      "ok-button" === e
                        ? (a.Parties.showGameSelectPreselected(123),
                          this._closeModal())
                        : "close-button" === e && this._closeModal();
                    })
                    .catch(() => {});
              },
            );
          }
          _closeModal() {
            a.ModalManager.remove(this._modal),
              a.Util.destroyEmberApp(this._app),
              (this._modal = null),
              (this._app = null);
          }
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        const s = () => a.traService.get("profile_navigation_match_history");
        t.default = class {
          constructor() {
            this._isSectionRegistered = !1;
          }
          init() {
            const e = (0, a.DataBinding)(
              "/lol-platform-config",
              (0, a.getProvider)().getSocket(),
            );
            e.addObserver(
              "/v1/namespaces/NewMatchHistory/Enabled",
              this,
              (t) => {
                t &&
                  (e.removeObserver(
                    "/v1/namespaces/NewMatchHistory/Enabled",
                    this,
                  ),
                  this._isSectionRegistered ||
                    (this._registerSection(
                      "profile-main",
                      a.PrivateAPI.mainProfile,
                    ),
                    this._registerSection(
                      "profile-overlay",
                      a.PrivateAPI.modalProfile,
                    ),
                    a.PrivateAPI.modalProfile.subnavigationApi.addEventListener(
                      "showSubsection",
                      (e) => {
                        (0, a.getProvider)()
                          .getOptional("rcp-fe-lol-match-history")
                          .then(
                            (e) => e.hideMatchDetails(),
                            (e) =>
                              a.logger.error("Provider getOptional failure", e),
                          );
                      },
                    ),
                    (this._isSectionRegistered = !0)));
              },
            );
          }
          _registerSection(e, t) {
            const n = ((e) => {
                const t = document.createElement("div");
                return (
                  (t.className = "match-summary-" + e),
                  (t.type = "MatchSummaryComponent"),
                  t
                );
              })(e),
              i = t.subnavigationApi.registerSection({
                id: e + "-match-history",
                title: s(),
                priority: 2,
                render: () => n,
                enabled: !0,
              }),
              r = { matchHistorySection: i, rootElement: n },
              o = (e) => ((e = e || {}), Object.assign(e, r), e);
            i.addEventListener("willShow", (e) => {
              (0, a.getProvider)()
                .getOptional("rcp-fe-lol-match-history")
                .then(
                  (t) => t.displayMatchSummary(o(e)),
                  (e) => a.logger.error("Provider getOptional failure", e),
                );
            }),
              i.addEventListener("hide", (e) => {
                (0, a.getProvider)()
                  .getOptional("rcp-fe-lol-match-history")
                  .then(
                    (t) => t.hideMatchSummary(o(e)),
                    (e) => a.logger.error("Provider getOptional failure", e),
                  );
              }),
              t.subnavigationApi.addEventListener("screenHidden", (e) => {
                (0, a.getProvider)()
                  .getOptional("rcp-fe-lol-match-history")
                  .then(
                    (t) => t.hideMatchSummary(o(e)),
                    (e) => a.logger.error("Provider getOptional failure", e),
                  );
              }),
              a.tra.observe(() => {
                i.set("title", s());
              });
          }
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          s = n(6);
        const i = () => a.traService.get("profile_navigation_challenges"),
          r = "/v2/account/LCUPreferences/lol-challenges",
          o = "challenges-collection",
          l = "seasonal-tooltip-";
        t.default = class {
          constructor() {
            (this._section = null),
              (this._clientState = s.CHALLENGES_CLIENT_STATES.HIDDEN),
              (this._tabEnabledState = !1),
              (this._isSectionRegistered = !1),
              (this._isObservingSettings = !1),
              (this._application = null),
              (this._seasonalTooltipEnabledState = !1),
              (this._seasonalTooltipSeenState = !0),
              (this._isSeasonalTooltipShowing = !1),
              (this._currentChallengeSeason = null),
              (this._platformConfigBinding = (0, a.DataBinding)(
                "/lol-platform-config",
                (0, a.getProvider)().getSocket(),
              )),
              (this._challengesBinding = (0, a.DataBinding)(
                "/lol-challenges",
                (0, a.getProvider)().getSocket(),
              )),
              (this._settingsBinding = (0, a.DataBinding)(
                "/lol-settings",
                (0, a.getProvider)().getSocket(),
              )),
              (this._lolseasonsBinding = (0, a.DataBinding)(
                "/lol-seasons",
                (0, a.getProvider)().getSocket(),
              ));
          }
          init() {
            this._platformConfigBinding.addObserver(
              "/v1/namespaces/Challenges/CollectionEnabled",
              this,
              this.handleCollectionEnabled,
            ),
              this._challengesBinding.addObserver(
                "/v1/client-state",
                this,
                this.handleChallengesClientState,
              ),
              this._platformConfigBinding.addObserver(
                "/v1/namespaces/Challenges/SeasonalTooltipEnabled",
                this,
                this.handleSeasonalTooltipEnabled,
              ),
              this._settingsBinding.addObserver(
                "/v2/ready",
                this,
                this.handleSettingsReady,
              ),
              this._lolseasonsBinding
                .get("/v1/season/recent-final-split")
                .then((e) => {
                  (this._currentChallengeSeason = e),
                    this._tryInitializeSettingsObserver(),
                    this._updateSeasonalTooltip();
                });
          }
          handleCollectionEnabled(e) {
            (this._tabEnabledState =
              a.SharedChallengesConstants.getFlagValueOrDefault(
                a.SharedChallengesConstants.CHALLENGE_FLAG_NAMES
                  .COLLECTION_ENABLED,
                e,
              )),
              this._isSectionRegistered
                ? this.setSectionEnabled(this._tabEnabledState)
                : this._tryRegisterSection(o, a.PrivateAPI.mainProfile);
          }
          handleSeasonalTooltipEnabled(e) {
            (this._seasonalTooltipEnabledState = null != e && !!e),
              this._updateSeasonalTooltip();
          }
          handleChallengesClientState(e) {
            if (null != e)
              if (((this._clientState = e), this._isSectionRegistered)) {
                const e =
                  this._clientState === s.CHALLENGES_CLIENT_STATES.DISABLED ||
                  this._clientState === s.CHALLENGES_CLIENT_STATES.HIDDEN;
                this.setSectionEnabled(!e);
              } else this._tryRegisterSection(o, a.PrivateAPI.mainProfile);
          }
          handleSettingsReady(e) {
            (this._isSettingsReady = Boolean(e)),
              this._tryInitializeSettingsObserver();
          }
          _tryInitializeSettingsObserver() {
            this._isSettingsReady &&
              this._currentChallengeSeason &&
              !this._isObservingSettings &&
              (this._settingsBinding.addObserver(
                r,
                this,
                this.handleSettingsUpdate,
              ),
              (this._isObservingSettings = !0));
          }
          handleSettingsUpdate(e) {
            null == e
              ? (this._seasonalTooltipSeenState = !0)
              : this._currentChallengeSeason &&
                (this._seasonalTooltipSeenState =
                  !!e.data &&
                  !!e.data[l + this._currentChallengeSeason.seasonId]),
              this._isSeasonalTooltipShowing || this._updateSeasonalTooltip();
          }
          _tryRegisterSection(e, t) {
            !this._isSectionRegistered &&
              this._clientState !== s.CHALLENGES_CLIENT_STATES.HIDDEN &&
              this._tabEnabledState &&
              (this._registerSection(e, t), (this._isSectionRegistered = !0));
          }
          _registerSection(e, t) {
            (this._section = t.subnavigationApi.registerSection({
              id: e,
              title: i(),
              priority: 1,
              render: () => {
                if ((this._destroyApp(), !this._application)) {
                  const e =
                    a.SharedComponents.getApi_SharedChallengesApps().createCollectionApp();
                  return (
                    e.componentPromise.then((e) => {
                      this._application = e;
                    }),
                    e.domNode
                  );
                }
                return this._application.rootElement;
              },
              enabled:
                this._clientState !== s.CHALLENGES_CLIENT_STATES.DISABLED,
            })),
              t.subnavigationApi.addEventListener("screenHidden", () => {
                this._destroyApp();
              }),
              t.subnavigationApi.addEventListener("screenShown", () => {
                this._isSeasonalTooltipShowing &&
                  this._disableSeasonalTooltip();
              }),
              this._section.addEventListener("hide", () => {
                this._destroyApp();
              }),
              a.tra.observe(() => {
                this._section.set("title", i());
              });
          }
          setSectionEnabled(e) {
            this._section.setEnabled(e),
              e
                ? this._section.setTooltip("")
                : this._section.setTooltip(
                    a.traService.get(
                      "profile_navigation_challenges_tooltip_disabled",
                    ),
                  );
          }
          _updateSeasonalTooltip() {
            !this._isSeasonalTooltipShowing &&
            this._seasonalTooltipEnabledState &&
            !this._seasonalTooltipSeenState &&
            this._shouldShowSeasonalTooltip()
              ? this._enableSeasonalTooltip()
              : !this._isSeasonalTooltipShowing ||
                (!this._seasonalTooltipSeenState &&
                  this._seasonalTooltipEnabledState &&
                  this._shouldShowSeasonalTooltip()) ||
                this._disableSeasonalTooltip();
          }
          _shouldShowSeasonalTooltip() {
            if (
              !this._currentChallengeSeason ||
              !this._currentChallengeSeason.seasonId
            )
              return !1;
            const e = Date.now();
            return (this._currentChallengeSeason.seasonEnd - e) / 864e5 <= 45;
          }
          _enableSeasonalTooltip() {
            if (
              !(
                this._currentChallengeSeason &&
                this._currentChallengeSeason.seasonId &&
                this._currentChallengeSeason.seasonStart &&
                this._currentChallengeSeason.seasonEnd
              )
            )
              return;
            const { year: e } = this._currentChallengeSeason.metadata,
              t = new Date(this._currentChallengeSeason.seasonEnd),
              n = new Date(this._currentChallengeSeason.seasonStart),
              s = e || n.getFullYear(),
              i = s + 1;
            a.Navigation.setItemAlert(
              a.PrivateAPI.mainProfile.mainNavigationItem,
              !0,
            ),
              a.Navigation.setAttentionTooltip(
                a.PrivateAPI.mainProfile.mainNavigationItem,
                {
                  title: a.traService.formatString(
                    "profile_navigation_challenges_seasonal_attention_tooltip_title",
                    { year: s },
                  ),
                  description: a.traService.formatString(
                    "profile_navigation_challenges_seasonal_attention_tooltip_description",
                    {
                      currentYear: s,
                      date: t.toLocaleDateString(),
                      nextYear: i,
                    },
                  ),
                  iconUrl:
                    "/fe/lol-static-assets/images/challenges-shared/challenge-diamond.png",
                },
                !0,
              ),
              (this._isSeasonalTooltipShowing = !0),
              this._settingsBinding.patch(r, {
                schemaVersion: 1,
                data: { [l + this._currentChallengeSeason.seasonId]: !0 },
              });
          }
          _disableSeasonalTooltip() {
            a.Navigation.setItemAlert(
              a.PrivateAPI.mainProfile.mainNavigationItem,
              !1,
            ),
              a.Navigation.setAttentionTooltip(
                a.PrivateAPI.mainProfile.mainNavigationItem,
                {},
                !1,
              ),
              (this._isSeasonalTooltipShowing = !1);
          }
          _destroyApp() {
            this._application &&
              this._application.app &&
              (this._application.app.destroy(), (this._application = null));
          }
        };
      },
      (e) => {
        "use strict";
        e.exports = {
          CHALLENGES_CLIENT_STATES: {
            HIDDEN: "Hidden",
            DISABLED: "Disabled",
            ENABLED: "Enabled",
          },
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "PAW", {
            enumerable: !0,
            get: function () {
              return a.default;
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
              return o.default;
            },
          }),
          Object.defineProperty(t, "SOCIAL", {
            enumerable: !0,
            get: function () {
              return r.default;
            },
          }),
          Object.defineProperty(t, "TIME", {
            enumerable: !0,
            get: function () {
              return d.default;
            },
          });
        var a = m(n(8)),
          s = m(n(19)),
          i = m(n(20)),
          r = m(n(21)),
          o = m(n(22)),
          l = m(n(23)),
          d = m(n(24));
        function m(e) {
          return e && e.__esModule ? e : { default: e };
        }
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = c(n(9)),
          s = c(n(10)),
          i = c(n(11)),
          r = c(n(12)),
          o = c(n(13)),
          l = c(n(14)),
          d = c(n(15)),
          m = c(n(16)),
          _ = c(n(17)),
          u = c(n(18));
        function c(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var p = {
          COMPONENT_TYPES: a.default,
          CURRENCY_TYPES: s.default,
          INVENTORY_TYPES: i.default,
          MEDIA_TYPES: r.default,
          MEDIA_LOAD_TYPES: o.default,
          MODAL_TYPES: l.default,
          OFFER_PURCHASE_STATES: d.default,
          OFFER_VALIDATION_STATES: m.default,
          SCROLL_LIST_DISPLAY_TYPES: _.default,
          TEMPLATE_TYPES: u.default,
        };
        t.default = p;
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
          a = "RANKED_FLEX_SR",
          s = "RANKED_FLEX_TT",
          i = "CHERRY",
          r = "RANKED_TFT",
          o = "RANKED_TFT_DOUBLE_UP",
          l = "RANKED_TFT_TURBO",
          d = "RANKED_TFT_PAIRS",
          m = [n, a],
          _ = [...m, s],
          u = [i],
          c = [r, o],
          p = [l, d],
          h = [...c, ...p],
          f = [..._, ...c],
          y = [...p, ...u];
        var M = {
          RANKED_SOLO_5x5_QUEUE_TYPE: n,
          RANKED_FLEX_SR_QUEUE_TYPE: a,
          RANKED_FLEX_TT_QUEUE_TYPE: s,
          RANKED_CHERRY_QUEUE_TYPE: i,
          RANKED_TFT_QUEUE_TYPE: r,
          RANKED_TFT_DOUBLE_UP_QUEUE_TYPE: o,
          RANKED_TFT_TURBO_QUEUE_TYPE: l,
          RANKED_TFT_PAIRS_QUEUE_TYPE: d,
          RANKED_LOL_QUEUE_TYPES: _,
          RANKED_SR_QUEUE_TYPES: m,
          RANKED_TFT_QUEUE_TYPES: c,
          RATED_TFT_QUEUE_TYPES: p,
          RANKED_AND_RATED_TFT_QUEUE_TYPES: h,
          ALL_RANKED_QUEUE_TYPES: f,
          ALL_RATED_QUEUE_TYPES: y,
          ALL_RANKED_AND_RATED_QUEUE_TYPES: [...f, ...y],
        };
        t.default = M;
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
          a = { PRIVATE: "PRIVATE", PUBLIC: "PUBLIC" };
        var s = {
          ProfilePrivacyEnabledState: n,
          ProfilePrivacySetting: a,
          DEFAULT_PROFILE_PRIVACY: {
            enabledState: n.UNKNOWN,
            setting: a.PUBLIC,
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
        const a = 36e5,
          s = 864e5,
          i = 6048e5,
          r = {
            MILLISECONDS_IN_A_SECOND: 1e3,
            MILLISECONDS_IN_A_MINUTE: 6e4,
            MILLISECONDS_IN_A_HOUR: a,
            MILLISECONDS_IN_A_DAY: s,
            MILLISECONDS_IN_A_WEEK: i,
            MILLISECONDS_IN_A_YEAR: 314496e5,
          };
        t.TIME_CONVERSIONS = r;
        var o = { TIME_UNITS: n, TIME_CONVERSIONS: r };
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        e.exports = function () {
          const { PlayerNameInputApi: e } = a.SharedEmberComponents;
          a.EmberApplicationFactory.setFactoryDefinition({
            name: "rcp-fe-lol-profiles-overview",
            ComponentFactory: a.ComponentFactory,
            tra: a.traService,
            ProfileWrapperComponent: n(26),
            ProfileSummonerInfoComponent: n(30),
            SummonerNamingsComponent: n(33),
            SummonerXpRadialComponent: n(36),
            SummonerLevelBarComponent: n(40),
            ProfileEmblemRankedComponent: n(43).default,
            RankedDemotionWarningComponent: n(47).default,
            RankedIconComponent: n(50).default,
            RankedIconTooltipComponent: n(53).default,
            RankedLastSeasonTooltipComponent: n(56).default,
            ProfileEmblemHonorComponent: n(59).default,
            ProfileEmblemLegendaryChampionMasteryComponent: n(63).default,
            LegendaryMasteryIconComponent: n(66).default,
            LegendaryMasteryTooltipComponent: n(69).default,
            ProfileEmblemClashTrophyComponent: n(72).default,
            ProfileEmblemClashBannerComponent: n(75).default,
            EternalsTooltipComponent: n(80).default,
            ProfileBoostsComponent: n(83),
            PlayerRestrictionInfoComponent:
              a.SharedEmberComponents.PlayerRestrictionInfoComponent,
            PlayerNameComponent: a.SharedEmberComponents.PlayerNameComponent,
            RenderTelemetrySenderComponent:
              a.SharedEmberComponents.RenderTelemetrySenderComponent,
            ChallengeBannerTitleComponent:
              a.SharedChallengesComponents.ChallengeBannerTitleComponent,
            ChallengeBannerTokenComponent:
              a.SharedChallengesComponents.ChallengeBannerTokenComponent,
            ChallengeBannerTokenContainerComponent:
              a.SharedChallengesComponents
                .ChallengeBannerTokenContainerComponent,
            ChallengeItemTooltipComponent:
              a.SharedChallengesComponents.ChallengeItemTooltipComponent,
            ChallengeItemFooterComponent:
              a.SharedChallengesComponents.ChallengeItemFooterComponent,
            MasteryCrestComponent:
              a.SharedChampionMasteryComponents.MasteryCrestComponent,
            ProfileService: n(215),
            EternalsService: n(216),
            NotificationsService: n(217),
            RiotclientService: a.SharedChallengesComponents.RiotclientService,
            GameDataService: a.SharedChallengesComponents.GameDataService,
            SharedNotificationsService:
              a.SharedChallengesComponents.SharedNotificationsService,
            SummonerService: a.SharedChallengesComponents.SummonerService,
            CallToActionPipComponent:
              a.SharedEmberComponents.CallToActionPipComponent,
            RankedReferenceModalButtonComponent: n(218),
          }),
            a.EmberApplicationFactory.setFactoryDefinition({
              name: "RankedReferenceModalComponent",
              tra: a.traService,
              ComponentFactory: a.ComponentFactory,
              RankedReferenceModalComponent: n(221),
            }),
            a.EmberApplicationFactory.setFactoryDefinition({
              ComponentFactory: a.ComponentFactory,
              name: "ClashBannerPickerComponent",
              tra: a.traService,
              ClashBannerPickerComponent: n(226).default,
            }),
            a.EmberApplicationFactory.setFactoryDefinition({
              ComponentFactory: a.ComponentFactory,
              name: "rcp-fe-lol-profiles-backdrop",
              tra: a.traService,
              ProfileBackdropComponent: n(229),
              ProfileService: n(215),
            }),
            a.EmberApplicationFactory.setFactoryDefinition({
              ComponentFactory: a.ComponentFactory,
              name: "rcp-fe-lol-profiles-backdrop-picker",
              tra: a.traService,
              ProfileBackdropPickerComponent: n(232),
            }),
            a.EmberApplicationFactory.setFactoryDefinition({
              ComponentFactory: a.ComponentFactory,
              name: "rcp-fe-lol-profiles-search-input",
              tra: a.traService,
              ProfileSearchInputComponent: n(235).default,
              ...e.fetchPlayerNameInputAndDependencies(),
            }),
            a.EmberApplicationFactory.setFactoryDefinition({
              ComponentFactory: a.ComponentFactory,
              name: "rcp-fe-lol-profiles-search-trail",
              tra: a.traService,
              ProfileSearchTrailComponent: n(238),
              ProfileService: n(215),
              PlayerNameComponent: a.SharedEmberComponents.PlayerNameComponent,
            });
        };
      },
      (e, t, n) => {
        "use strict";
        var a,
          s = n(1),
          i = (a = n(27)) && a.__esModule ? a : { default: a };
        n(28),
          (e.exports = s.Ember.Component.extend(i.default, {
            classNames: ["style-profile-overview-component"],
            classNameBindings: ["loadingComplete:loaded:loading"],
            layout: n(29),
            notificationsService: s.Ember.inject.service("notifications"),
            profileService: s.Ember.inject.service("profile"),
            loadingComplete: s.Ember.computed.alias(
              "profileService.loadingComplete",
            ),
            shouldShowUnreadNotifications: s.Ember.computed(
              "isSearched",
              "notificationsService.hasUnreadNotifications",
              function () {
                return (
                  !this.get("isSearched") &&
                  this.get("notificationsService.hasUnreadNotifications")
                );
              },
            ),
          }));
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        e.exports = a.Ember.Mixin.create({
          profileMode: a.Ember.computed.alias("profileService.profileMode"),
          summoner: a.Ember.computed.alias("profileService.summoner"),
          hasSummoner: a.Ember.computed.bool("summoner"),
          isSearched: a.Ember.computed.alias("profileService.isSearched"),
          isMe: a.Ember.computed.not("isSearched"),
          setOnlyIfGet: function (e, t) {
            const n = this.get(t),
              a = this.get(e);
            Boolean(n) && n !== a && this.set(e, n);
          },
          onSummonerComponentInit: a.Ember.on("init", function () {
            this.get("profileService") ||
              a.logger.error(
                "No profileService! Found Component failing to inject profile service!",
              ),
              this.setOnlyIfGet("profileService.profileMode", "profileMode"),
              this.setOnlyIfGet("profileService.summonerId", "summonerId");
          }),
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "90fKxqGb",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-overview-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-overview-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-overview-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","style-profile-loading-spinner"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","style-profile-overview-content"],["flush-element"],["text","\\n"],["block",["render-telemetry-sender"],null,[["renderEventName"],["profile-overview-rendered"]],1],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","style-profile-call-to-action"],["flush-element"],["text","\\n      "],["append",["unknown",["call-to-action-pip"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","\\n    "],["append",["helper",["profile-summoner-info"],null,[["isSearched"],[["get",["isSearched"]]]]],false],["text","\\n\\n"],["block",["if"],[["get",["shouldShowUnreadNotifications"]]],null,0],["text","\\n    "],["open-element","div",[]],["static-attr","class","style-profile-emblems-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","style-profile-emblem-slot"],["flush-element"],["append",["unknown",["profile-emblem-ranked"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","style-profile-emblem-slot"],["flush-element"],["append",["unknown",["profile-emblem-honor"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","style-profile-emblem-slot"],["flush-element"],["append",["unknown",["profile-emblem-legendary-champion-mastery"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","style-profile-emblem-slot"],["flush-element"],["append",["unknown",["profile-emblem-clash-trophy"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","style-profile-emblem-slot"],["flush-element"],["append",["unknown",["profile-emblem-clash-banner"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a,
          s = n(1),
          i = (a = n(27)) && a.__esModule ? a : { default: a };
        n(31),
          (e.exports = s.Ember.Component.extend(i.default, {
            classNames: ["style-profile-summoner-info-component"],
            layout: n(32),
            profileService: s.Ember.inject.service("profile"),
            isLocalPlayer: s.Ember.computed.not("isSearched"),
            challengesConfig: s.Ember.computed.alias(
              "profileService.challengesConfig",
            ),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "nho3OXdT",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-summoner-info-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-summoner-info-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-summoner-info-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["flush-element"],["text","\\n  "],["open-element","lol-regalia-profile-v2-element",[]],["dynamic-attr","summoner-id",["unknown",["summoner","summonerId"]],null],["dynamic-attr","is-searched",["concat",[["unknown",["isSearched"]]]]],["dynamic-attr","puuid",["concat",[["unknown",["summoner","puuid"]]]]],["flush-element"],["text","\\n    "],["append",["unknown",["summoner-namings"]],false],["text","\\n    "],["append",["unknown",["summoner-xp-radial"]],false],["text","\\n    "],["open-element","div",[]],["static-attr","class","style-profile-summoner-status-icons"],["flush-element"],["block",["if"],[["get",["isLocalPlayer"]]],null,1],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","player-restriction-info-outer-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","player-restriction-info-inner-container"],["flush-element"],["text","\\n        "],["block",["if"],[["get",["isLocalPlayer"]]],null,0],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","profile-challenge-banner-tokens"],["flush-element"],["text","\\n    "],["append",["helper",["challenge-banner-token-container"],null,[["puuid","isLocalPlayer"],[["get",["summoner","puuid"]],true]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["append",["unknown",["player-restriction-info"]],false]],"locals":[]},{"statements":[["append",["unknown",["profile-boosts"]],false]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a,
          s = n(1),
          i = (a = n(27)) && a.__esModule ? a : { default: a };
        n(34),
          (e.exports = s.Ember.Component.extend(i.default, {
            classNames: ["style-profile-summoner-namings-component"],
            layout: n(35),
            profileService: s.Ember.inject.service("profile"),
            puuid: s.Ember.computed.alias("summoner.puuid"),
            gameName: s.Ember.computed("summoner.gameName", function () {
              return this.get("summoner.gameName") || null;
            }),
            tagLine: s.Ember.computed("summoner.tagLine", function () {
              return this.get("summoner.tagLine") || null;
            }),
            summonerName: s.Ember.computed("summoner.displayName", function () {
              return this.get("summoner.displayName") || null;
            }),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "84LWhJ8j",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-summoner-info-component\\\\summoner-namings-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-summoner-info-component\\\\summoner-namings-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-summoner-info-component\\\\summoner-namings-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-resizing-text-field",[]],["static-attr","class","style-profile-summoner-name"],["static-attr","data-max-width","155"],["flush-element"],["text","\\n  "],["append",["helper",["player-name"],null,[["format","puuid","gameName","tagLine","summonerName","isCopyEnabled"],["tooltip",["get",["puuid"]],["get",["gameName"]],["get",["tagLine"]],["get",["summonerName"]],true]]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a,
          s = n(1),
          i = (a = n(27)) && a.__esModule ? a : { default: a },
          r = n(37);
        n(38),
          (e.exports = s.Ember.Component.extend(i.default, {
            classNames: ["style-summoner-xp-radial-component"],
            layout: n(39),
            profileService: s.Ember.inject.service("profile"),
            circlePercentFill: 2,
            circleDiameter: 13,
            circlePositionXY: 6.5,
            circleRadius: 5,
            circleCircumference: s.Ember.computed("circleRadius", function () {
              return 2 * this.get("circleRadius") * Math.PI;
            }),
            progressPercent: s.Ember.computed(
              "circlePercentFill",
              "circleCircumference",
              function () {
                return (
                  this.get("circleCircumference") -
                  (this.get("circlePercentFill") / 100) *
                    this.get("circleCircumference")
                );
              },
            ),
            xpProgressNumbersDisplay: s.Ember.computed(
              "summoner.xpSinceLastLevel",
              "summoner.xpUntilNextLevel",
              function () {
                const e = this.sanitizeInt(
                    this.get("summoner.xpUntilNextLevel"),
                  ),
                  t = this.sanitizeInt(this.get("summoner.xpSinceLastLevel"));
                return (0, r.translate)(
                  this,
                  "profile_summoner_info_experience_progress_tooltip_message",
                  { xpSinceLastLevel: t, xpUntilNextLevel: e },
                );
              },
            ),
            onPercentCompleteForNextLevelChange: s.Ember.on(
              "didInsertElement",
              s.Ember.observer(
                "summoner.percentCompleteForNextLevel",
                function () {
                  s.Ember.run.once(this, "updateXpProgressBar");
                },
              ),
            ),
            updateXpProgressBar() {
              let e = this.sanitizePercent(
                this.get("summoner.percentCompleteForNextLevel"),
              );
              e > 0 && e < 2 && (e = 2), this.set("circlePercentFill", e);
            },
            sanitizeInt: (e) =>
              e ? ((e = Number.parseInt(e)), isNaN(e) ? 0 : e) : 0,
            clamp: (e, t, n) => Math.min(Math.max(e, t), n),
            sanitizePercent(e) {
              return this.clamp(this.sanitizeInt(e), 0, 100);
            },
          }));
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.translate = function (e, t, n) {
            const a = e.get("tra");
            return a.get("formatString")(t, n);
          });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "ShNfjuo7",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-summoner-info-component\\\\summoner-xp-radial-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-summoner-info-component\\\\summoner-xp-radial-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-summoner-info-component\\\\summoner-xp-radial-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","summoner-xp-radial-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","summoner-xp-radial"],["flush-element"],["text","\\n    "],["open-element","svg",[]],["static-attr","class","summoner-xp-radial-progress"],["dynamic-attr","width",["concat",[["unknown",["circleDiameter"]]]]],["dynamic-attr","height",["concat",[["unknown",["circleDiameter"]]]]],["flush-element"],["text","\\n"],["text","      "],["open-element","circle",[]],["static-attr","class","summoner-xp-radial-progress-circle summoner-xp-radial-progress-circle-bg"],["static-attr","stroke-width","2"],["dynamic-attr","stroke-dasharray",["concat",[["unknown",["circleCircumference"]]," ",["unknown",["circleCircumference"]]]]],["static-attr","stroke-dashoffset","0"],["static-attr","fill","transparent"],["dynamic-attr","r",["concat",[["unknown",["circleRadius"]]]]],["dynamic-attr","cx",["concat",[["unknown",["circlePositionXY"]]]]],["dynamic-attr","cy",["concat",[["unknown",["circlePositionXY"]]]]],["flush-element"],["close-element"],["text","\\n"],["text","      "],["open-element","circle",[]],["static-attr","class","summoner-xp-radial-progress-circle"],["static-attr","stroke-width","2"],["dynamic-attr","stroke-dasharray",["concat",[["unknown",["circleCircumference"]]," ",["unknown",["circleCircumference"]]]]],["dynamic-attr","stroke-dashoffset",["concat",[["unknown",["progressPercent"]]]]],["static-attr","fill","transparent"],["dynamic-attr","r",["concat",[["unknown",["circleRadius"]]]]],["dynamic-attr","cx",["concat",[["unknown",["circlePositionXY"]]]]],["dynamic-attr","cy",["concat",[["unknown",["circlePositionXY"]]]]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","summoner-xp-radial-numbers"],["flush-element"],["append",["unknown",["summoner","summonerLevel"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","summoner-xp-radial-hover-text"],["flush-element"],["append",["unknown",["xpProgressNumbersDisplay"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["right"]],0],["close-element"],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n      "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","profile_summoner_info_experience_description_tooltip_title"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","profile_summoner_info_experience_description_tooltip_message"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a,
          s = n(1),
          i = (a = n(27)) && a.__esModule ? a : { default: a },
          r = n(37);
        function o(e) {
          return e ? ((e = Number.parseInt(e)), isNaN(e) ? 0 : e) : 0;
        }
        function l(e) {
          return (t = o(e)), (n = 0), (a = 100), Math.min(Math.max(t, n), a);
          var t, n, a;
        }
        n(41),
          (e.exports = s.Ember.Component.extend(i.default, {
            classNames: ["style-profile-summoner-level-bar-component"],
            layout: n(42),
            profileService: s.Ember.inject.service("profile"),
            challengesConfig: s.Ember.computed.alias(
              "profileService.challengesConfig",
            ),
            onPercentCompleteForNextLevelChange: s.Ember.on(
              "didInsertElement",
              s.Ember.observer(
                "summoner.percentCompleteForNextLevel",
                function () {
                  s.Ember.run.once(this, "updateXpProgressBar");
                },
              ),
            ),
            updateXpProgressBar() {
              const e = this.get("element");
              if (!e) return;
              const t = e.querySelector(
                ".style-profile-summoner-level-bar-xp-progress-fill",
              );
              if (!t) return;
              let n = l(this.get("summoner.percentCompleteForNextLevel"));
              n > 0 && n < 2 && (n = 2), (t.style.width = n + "%");
            },
            xpProgressNumbersDisplay: s.Ember.computed(
              "summoner.xpSinceLastLevel",
              "summoner.xpUntilNextLevel",
              function () {
                const e = o(this.get("summoner.xpUntilNextLevel")),
                  t = o(this.get("summoner.xpSinceLastLevel"));
                return (0, r.translate)(
                  this,
                  "profile_summoner_info_experience_progress_tooltip_message",
                  { xpSinceLastLevel: t, xpUntilNextLevel: e },
                );
              },
            ),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "Z/xeEB2O",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-summoner-info-component\\\\summoner-level-bar-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-summoner-info-component\\\\summoner-level-bar-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-summoner-info-component\\\\summoner-level-bar-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","style-profile-summoner-level-bar-xp-progress-background"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","style-profile-summoner-level-bar-xp-progress-fill-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","style-profile-summoner-level-bar-xp-progress-fill-preloader"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","style-profile-summoner-level-bar-xp-progress-fill"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","style-profile-summoner-level-bar-number-plate"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","style-profile-summoner-level-bar-number-value"],["flush-element"],["append",["unknown",["summoner","summonerLevel"]],false],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","style-profile-summoner-level-bar-xp-progress-numbers-display"],["flush-element"],["text","\\n  "],["append",["unknown",["xpProgressNumbersDisplay"]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["right"]],0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n    "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","profile_summoner_info_experience_description_tooltip_title"]],false],["close-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","profile_summoner_info_experience_description_tooltip_message"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a,
          s = n(1),
          i = n(37),
          r = (a = n(27)) && a.__esModule ? a : { default: a },
          o = (function (e, t) {
            if (!t && e && e.__esModule) return e;
            if (null === e || ("object" != typeof e && "function" != typeof e))
              return { default: e };
            var n = l(t);
            if (n && n.has(e)) return n.get(e);
            var a = {},
              s = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var i in e)
              if (
                "default" !== i &&
                Object.prototype.hasOwnProperty.call(e, i)
              ) {
                var r = s ? Object.getOwnPropertyDescriptor(e, i) : null;
                r && (r.get || r.set)
                  ? Object.defineProperty(a, i, r)
                  : (a[i] = e[i]);
              }
            (a.default = e), n && n.set(e, a);
            return a;
          })(n(44));
        function l(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (l = function (e) {
            return e ? n : t;
          })(e);
        }
        n(45);
        const d = "UNRANKED";
        var m = s.Ember.Component.extend(r.default, {
          classNames: ["style-profile-ranked-component"],
          layout: n(46),
          profileService: s.Ember.inject.service("profile"),
          rankedData: s.Ember.computed.alias("profileService.rankedData"),
          challengesConfig: s.Ember.computed.alias(
            "profileService.challengesConfig",
          ),
          computedQueueInfos: s.Ember.computed(
            "summoner.puuid",
            "rankedData.queues",
            function () {
              const e = this.get("rankedData");
              if (s.Lodash.isNil(e)) return;
              const t = e.queues ? e.queues : [],
                n = o.getRankedQueues(t);
              return this.buildQueueInfos(n);
            },
          ),
          mostValuableQueueInfo: s.Ember.computed(
            "computedQueueInfos",
            "computedQueueInfos.[]",
            function () {
              const e = this.get("computedQueueInfos");
              if (e && e.length > 0) return e[0];
              return {
                queueLabel: this.get("tra").get("ranked_unranked"),
                queue: { isUnranked: !0 },
              };
            },
          ),
          splitReward: s.Ember.computed(
            "rankedData.rankedRegaliaLevel",
            function () {
              const e = this.get("rankedData.rankedRegaliaLevel");
              return e || 0;
            },
          ),
          buildQueueInfos(e) {
            const t = [];
            for (const n of e) {
              const e = { queue: n };
              (e.tier = n.tier),
                (e.division = n.division),
                (e.position = n.position),
                (e.warnings = n.warnings),
                (e.queueLabel = this.buildQueueLabel(n)),
                (e.tierDivisionLabel = this.buildTierDivisionLabel(n)),
                (e.subtitleLabel = this.buildSubtitleLabel(n)),
                (e.demotionWarning = this.getHighestWarning([e])),
                t.push(e);
            }
            return t;
          },
          buildQueueLabel: (e) =>
            e ? s.LeagueTierNames.getRankedQueueName(e.queueType) : "",
          buildTierDivisionLabel(e) {
            if (!e) return "";
            const { tier: t, division: n, isProvisional: a } = e,
              r = s.LeagueTierNames.getFullTierDivisionName(t, n);
            return a
              ? (0, i.translate)(this, "ranked_subtitle_provisional_rank", {
                  tierDivisionLoc: r,
                })
              : s.LeagueTierNames.getFullTierDivisionName(t, n);
          },
          buildSubtitleLabel(e) {
            return e.tier && e.tier !== d
              ? (0, i.translate)(this, "ranked_tooltip_wins_and_lp", {
                  lp: e.leaguePoints,
                  wins: e.wins,
                })
              : "";
          },
          getHighestWarning: function (e) {
            let t = 0;
            for (const n of e)
              n.warnings &&
                n.warnings.demotionWarning &&
                (t = Math.max(t, n.warnings.demotionWarning));
            return t;
          },
          warningAnyQueue: s.Ember.computed(
            "computedQueueInfos",
            "computedQueueInfos.[]",
            function () {
              const e = this.get("computedQueueInfos");
              return e ? this.getHighestWarning(e) : 0;
            },
          ),
          lastSeasonTier: s.Ember.computed(
            "summoner.puuid",
            "rankedData.{highestPreviousSeasonEndTier,highestPreviousSeasonEndDivision}",
            function () {
              if (!this.get("summoner.puuid") || !this.get("rankedData"))
                return d;
              let e = this.get("rankedData.highestPreviousSeasonEndTier");
              return (e && "NONE" !== e) || (e = d), e;
            },
          ),
          lastSeasonTierText: s.Ember.computed("lastSeasonTier", function () {
            return s.LeagueTierNames.getTierName(this.get("lastSeasonTier"));
          }),
        });
        t.default = m;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.getRankedQueues = function (e = []) {
            const t = [];
            for (const n of e) {
              const e = i(n);
              s.QUEUES.ALL_RATED_QUEUE_TYPES.includes(e.queueType) || t.push(e);
            }
            return t;
          });
        var a = n(1),
          s = n(7);
        function i(e) {
          const t = {};
          return (
            (t.queueType = e.queueType),
            (t.tier = a.Lodash.get(e, "tier", "UNRANKED")),
            "NONE" === t.tier && (t.tier = "UNRANKED"),
            (t.isUnranked = "UNRANKED" === String(t.tier).toUpperCase()),
            (t.leaguePoints = e.leaguePoints),
            (t.division = a.Lodash.get(e, "division", "IV")),
            (t.wins = e.wins),
            (t.warnings = e.warnings),
            (t.isProvisional = e.isProvisional),
            t
          );
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "Cj3XKe1O",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-ranked-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-ranked-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-ranked-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","style-profile-emblem-wrapper"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","style-profile-emblem-header"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","style-profile-emblem-header-title"],["flush-element"],["append",["unknown",["mostValuableQueueInfo","queueLabel"]],false],["close-element"],["text","\\n"],["block",["unless"],[["get",["mostValuableQueueInfo","isUnranked"]]],null,5],["text","  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","style-profile-emblem-content-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","style-profile-emblem-content"],["flush-element"],["text","\\n      "],["append",["helper",["ranked-icon"],null,[["queueInfo","splitReward"],[["get",["mostValuableQueueInfo"]],["get",["splitReward"]]]]],false],["text","\\n      "],["open-element","div",[]],["static-attr","class","style-profile-ranked-reference-modal-button"],["flush-element"],["text","\\n        "],["append",["helper",["ranked-reference-modal-button"],null,[["queueType"],[["get",["mostValuableQueueInfo","queue","queueType"]]]]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","style-profile-demotion-shield-warning"],["flush-element"],["text","\\n        "],["append",["helper",["ranked-demotion-warning"],null,[["computedQueueInfos","demotionWarning"],[["get",["computedQueueInfos"]],["get",["mostValuableQueueInfo","demotionWarning"]]]]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","positioningStrategy","offsetX"],["top","preserve",287]],3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","profile-ranked-emblem-tooltip-warning"],["flush-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["profile-ranked-emblem-tooltip-warning-icon icon-warning-",["unknown",["warningAnyQueue"]]]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","profile-ranked-emblem-tooltip-warning-message"],["flush-element"],["append",["unknown",["tra","ranked_demotion_shield_expiring"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","div",[]],["dynamic-attr","class",["concat",["profile-ranked-emblem-tooltip-warning-icon icon-warning-",["unknown",["queueInfo","demotionWarning"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","ranked-tooltip-queue"],["flush-element"],["text","\\n          "],["open-element","lol-regalia-emblem-element",[]],["dynamic-attr","ranked-tier",["helper",["if"],[["get",["queue","isUnranked"]],"unranked",["get",["queueInfo","tier"]]],null],null],["flush-element"],["text","\\n          "],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","ranked-tooltip-queue-name"],["flush-element"],["append",["unknown",["queueInfo","queueLabel"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","ranked-tooltip-queue-tier"],["flush-element"],["append",["unknown",["queueInfo","tierDivisionLabel"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","style-profile-ranked-crest-tooltip-lp"],["flush-element"],["append",["helper",["sanitize"],[["get",["queueInfo","subtitleLabel"]]],null],false],["close-element"],["text","\\n"],["block",["if"],[["get",["queueInfo","demotionWarning"]]],null,1],["text","        "],["close-element"],["text","\\n"]],"locals":["queueInfo"]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","profile-ranked-emblem-tooltip-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","profile-ranked-emblem-tooltip-queues"],["flush-element"],["text","\\n"],["block",["each"],[["get",["computedQueueInfos"]]],null,2],["text","      "],["open-element","div",[]],["static-attr","class","ranked-tooltip-last-season"],["flush-element"],["text","\\n          "],["open-element","lol-regalia-emblem-element",[]],["dynamic-attr","ranked-tier",["unknown",["lastSeasonTier"]],null],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","ranked-tooltip-queue-name"],["flush-element"],["append",["unknown",["tra","ranked_tooltip_past_highest_rank"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","ranked-tooltip-queue-tier"],["flush-element"],["append",["unknown",["lastSeasonTierText"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["warningAnyQueue"]]],null,0],["text","  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","style-profile-emblem-subheader-position"],["dynamic-attr","src",["concat",[["unknown",["mostValuablePositionIcon"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","style-profile-emblem-subheader-ranked"],["flush-element"],["text","\\n"],["block",["if"],[["get",["mostValuablePositionIcon"]]],null,4],["text","      "],["open-element","div",[]],["static-attr","class","style-profile-emblem-header-subtitle"],["flush-element"],["append",["unknown",["mostValuableQueueInfo","tierDivisionLabel"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a,
          s = n(1),
          i = (a = n(27)) && a.__esModule ? a : { default: a };
        n(48);
        var r = s.Ember.Component.extend(i.default, {
          layout: n(49),
          profileService: s.Ember.inject.service("profile"),
          computedQueueInfos: null,
          demotionWarning: null,
          computedWarnings: s.Ember.computed("computedQueueInfos", function () {
            const e = {};
            return (
              s.Lodash.toPairs(this.get("computedQueueInfos")).forEach(
                ([t, n]) => {
                  const a = [];
                  n.demotionWarning > 0 &&
                    a.push({ severity: n.demotionWarning }),
                    a.length && (e[t] = a);
                },
              ),
              e
            );
          }),
          computedWarningsMaxSeverity: s.Ember.computed(
            "computedWarnings",
            function () {
              const e = this.get("computedWarnings"),
                t = s.Lodash.flatMap(s.Lodash.values(e), (e) =>
                  e.map((e) => e.severity),
                );
              return t.length ? s.Lodash.max(t) : 0;
            },
          ),
        });
        t.default = r;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "8RpwPnxC",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-ranked-component\\\\ranked-demotion-warning-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-ranked-component\\\\ranked-demotion-warning-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-ranked-component\\\\ranked-demotion-warning-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["computedWarningsMaxSeverity"]]],null,2,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["style-profile-ranked-demotion-warning warning-",["unknown",["demotionWarning"]]]]],["flush-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["demotionWarning"]]],null,0]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["style-profile-ranked-demotion-warning warning-",["unknown",["computedWarningsMaxSeverity"]]]]],["flush-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        n(51);
        var s = a.Ember.Component.extend({
          classNames: ["style-profile-ranked-icon-component"],
          layout: n(52),
          queueInfo: null,
          splitReward: 0,
          profileService: a.Ember.inject.service("profile"),
          challengesConfig: a.Ember.computed.alias(
            "profileService.challengesConfig",
          ),
          queue: a.Ember.computed.alias("queueInfo.queue"),
          isUnranked: a.Ember.computed.alias("queue.isUnranked"),
          isProvisional: a.Ember.computed.alias("queue.isProvisional"),
          tier: a.Ember.computed.alias("queue.tier"),
          division: a.Ember.computed.alias("queue.division"),
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "tL3kUaMt",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-ranked-component\\\\ranked-icon-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-ranked-component\\\\ranked-icon-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-ranked-component\\\\ranked-icon-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","style-profile-ranked-crest-wrapper"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","style-profile-ranked-crest-ranked"],["flush-element"],["text","\\n    "],["open-element","lol-regalia-emblem-element",[]],["dynamic-attr","ranked-tier",["helper",["if"],[["get",["isUnranked"]],"unranked",["get",["tier"]]],null],null],["flush-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a,
          s = n(1),
          i = (a = n(27)) && a.__esModule ? a : { default: a };
        n(54);
        var r = s.Ember.Component.extend(i.default, {
          classNames: ["style-profile-ranked-icon-tooltip-component"],
          layout: n(55),
          profileService: s.Ember.inject.service("profile"),
          queueInfo: null,
          splitReward: 0,
          queue: s.Ember.computed.alias("queueInfo.queue"),
          isUnranked: s.Ember.computed.alias("queue.isUnranked"),
          isProvisional: s.Ember.computed.alias("queue.isProvisional"),
          tier: s.Ember.computed.alias("queue.tier"),
          division: s.Ember.computed.alias("queue.division"),
          queueLabel: s.Ember.computed.alias("queueInfo.queueLabel"),
          tierDivisionLabel: s.Ember.computed.alias(
            "queueInfo.tierDivisionLabel",
          ),
          subtitleLabel: s.Ember.computed.alias("queueInfo.subtitleLabel"),
          demotionWarning: s.Ember.computed.alias("queueInfo.demotionWarning"),
        });
        t.default = r;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "1surwru4",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-ranked-component\\\\ranked-icon-tooltip-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-ranked-component\\\\ranked-icon-tooltip-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-ranked-component\\\\ranked-icon-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","style-profile-ranked-crest-tooltip-crest-inner"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isUnranked"]]],null,2,1],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","class","style-profile-ranked-crest-tooltip-queue-and-division"],["flush-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["style-profile-ranked-crest-tooltip-queue ",["helper",["if"],[["get",["isUnranked"]],"unranked"],null]]]],["flush-element"],["text","\\n      "],["append",["unknown",["queueLabel"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["style-profile-ranked-crest-tooltip-tier-division ",["helper",["if"],[["get",["isUnranked"]],"unranked"],null]]]],["flush-element"],["text","\\n      "],["append",["unknown",["tierDivisionLabel"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["style-profile-ranked-crest-tooltip-crest-dividing-line ",["helper",["if"],[["get",["isUnranked"]],"unranked"],null]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","class","style-profile-ranked-crest-tooltip-stats-wrapper"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","style-profile-ranked-crest-tooltip-lp"],["flush-element"],["append",["helper",["sanitize"],[["get",["subtitleLabel"]]],null],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["dynamic-attr","class",["concat",["style-profile-ranked-crest-tooltip-warning-",["unknown",["demotionWarning"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["style-profile-ranked-crest-tooltip-ranked ",["helper",["if"],[["get",["isProvisional"]],"provisional"],null]]]],["flush-element"],["text","\\n      "],["open-element","lol-regalia-crest-element",[]],["static-attr","animations","false"],["dynamic-attr","ranked-tier",["concat",[["unknown",["tier"]]]]],["dynamic-attr","ranked-division",["concat",[["unknown",["division"]]]]],["static-attr","visor-down","true"],["dynamic-attr","ranked-split-reward",["concat",[["unknown",["splitReward"]]]]],["static-attr","crest-type","ranked"],["flush-element"],["text","\\n      "],["close-element"],["text","\\n"],["block",["if"],[["get",["demotionWarning"]]],null,0],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","style-profile-ranked-crest-tooltip-unranked"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a,
          s = n(1),
          i = (a = n(27)) && a.__esModule ? a : { default: a };
        n(57);
        var r = s.Ember.Component.extend(i.default, {
          classNames: ["style-profile-ranked-last-season-tooltip-component"],
          layout: n(58),
          profileService: s.Ember.inject.service("profile"),
          rankedData: null,
          lastSeasonTier: s.Ember.computed(
            "summoner.puuid",
            "rankedData.{highestPreviousSeasonEndTier,highestPreviousSeasonEndDivision}",
            function () {
              if (!this.get("summoner.puuid") || !this.get("rankedData"))
                return;
              let e = this.get("rankedData.highestPreviousSeasonEndTier");
              return (e && "NONE" !== e) || (e = "UNRANKED"), e;
            },
          ),
          lastSeasonIsUnranked: s.Ember.computed("lastSeasonTier", function () {
            const e = this.get("lastSeasonTier");
            return Boolean(!e || "UNRANKED" === e);
          }),
          tooltipLastSeasonLabel: s.Ember.computed(
            "lastSeasonTier",
            "rankedData.{highestPreviousSeasonEndDivision}",
            function () {
              const e = this.get("lastSeasonTier");
              if (!e) return;
              const t = this.get("rankedData.highestPreviousSeasonEndDivision");
              return s.LeagueTierNames.getFullTierDivisionName(e, t);
            },
          ),
        });
        t.default = r;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "6Pg875dv",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-ranked-component\\\\ranked-last-season-tooltip-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-ranked-component\\\\ranked-last-season-tooltip-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-ranked-component\\\\ranked-last-season-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","style-profile-ranked-tooltip-last-trim"],["flush-element"],["text","\\n  "],["open-element","lol-regalia-banner-element",[]],["static-attr","animations","false"],["dynamic-attr","banner-rank",["concat",[["unknown",["lastSeasonTier"]]]]],["static-attr","banner-type","lastSeasonHighestRank"],["flush-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["style-profile-ranked-tooltip-last-title ",["helper",["if"],[["get",["lastSeasonIsUnranked"]],"unranked"],null]]]],["flush-element"],["text","\\n  "],["append",["unknown",["tra","ranked_tooltip_past_highest_rank"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["style-profile-ranked-tooltip-last-rank ",["helper",["if"],[["get",["lastSeasonIsUnranked"]],"unranked"],null]]]],["flush-element"],["text","\\n  "],["append",["unknown",["tooltipLastSeasonLabel"]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a,
          s = n(1),
          i = (a = n(27)) && a.__esModule ? a : { default: a };
        n(60);
        var r = n(61);
        var o = s.Ember.Component.extend(i.default, {
          classNames: ["style-profile-honor-component"],
          layout: n(62),
          profileService: s.Ember.inject.service("profile"),
          honorLockImageUrl: r.HONOR_LOCK_IMAGE_URL,
          init: function () {
            this._super(...arguments), this.initHonorConfig();
          },
          initHonorConfig: function () {
            this.set("shouldShowHonor", !1);
            const e = (0, s.DataBinding)(
              "/lol-honor-v2",
              (0, s.getProvider)().getSocket(),
            );
            e.get("/v1/config").then(
              ((t) => {
                const n = t && t.Enabled;
                n &&
                  this.get("isMe") &&
                  e.get("/v1/profile").then(this.handleHonorProfile.bind(this)),
                  this.set("honorEnabled", n);
              }).bind(this),
            );
          },
          handleHonorProfile: function (e) {
            if (e) {
              const { honorLevel: t } = e;
              t >= 0 &&
                t <= 5 &&
                (this.set("honorProfile", e), this.set("shouldShowHonor", !0));
            }
          },
          shouldShowOtherSummonerTooltip: s.Ember.computed(
            "honorEnabled",
            "isMe",
            function () {
              if (!this.get("honorEnabled")) return !1;
              return !this.get("isMe");
            },
          ),
          honorProfileImageUrl: s.Ember.computed(
            "honorProfile.honorLevel",
            "honorProfile.checkpoint",
            "honorProfile.rewardsLocked",
            function () {
              const e = this.get("honorProfile.honorLevel"),
                t = Math.min(
                  Math.max(this.get("honorProfile.checkpoint"), 0),
                  3,
                ),
                n = this.get("honorProfile.rewardsLocked");
              let a;
              r.HONOR_IMAGES[e] &&
                (a = n
                  ? r.HONOR_IMAGES[e].LOCKED
                  : 5 === e
                    ? r.HONOR_IMAGES[e]
                    : r.HONOR_IMAGES[e][t]),
                a || (a = r.HONOR_IMAGES.UNKNOWN);
              return `${r.HONOR_IMAGES_PATH}/${a}`;
            },
          ),
          honorProfileLevel: s.Ember.computed(
            "honorProfile.honorLevel",
            "honorProfile.checkpoint",
            function () {
              const e = this.get("honorProfile.honorLevel"),
                t = this.get("honorProfile.checkpoint");
              return this.get("tra").formatString("honor_profile_level", {
                honorLevel: e,
                honorCheckpoint: t,
              });
            },
          ),
          shouldShowHonorLockIcon: s.Ember.computed(
            "shouldShowHonor",
            "honorProfile.honorLevel",
            "honorProfile.rewardsLocked",
            function () {
              const e = this.get("shouldShowHonor"),
                t = this.get("honorProfile.honorLevel"),
                n = this.get("honorProfile.rewardsLocked");
              return e && (n || 0 === t || 1 === t);
            },
          ),
          profileTooltipText: s.Ember.computed(
            "honorProfile.honorLevel",
            "honorProfile.checkpoint",
            "honorProfile.rewardsLocked",
            function () {
              const e = this.get("honorProfile.rewardsLocked"),
                t = this.get("honorProfile.checkpoint"),
                n = this.get("honorProfile.honorLevel");
              let a, s;
              if (
                (e
                  ? (a = r.HONOR_TRA_KEYS.LOCKED)
                  : n >= 5
                    ? (a = r.HONOR_TRA_KEYS.MAX_LEVEL)
                    : ((a = r.HONOR_TRA_KEYS.CHECKPOINT[t]),
                      (s = r.HONOR_TRA_KEYS.LEVEL_APPEND.NORMAL[n])),
                a)
              ) {
                let e = this.get("tra").formatString(a, {
                  nextLevel: n + 1,
                  honorCheckpoint: t,
                });
                return s && (e = e + " " + this.get("tra").get(s)), e;
              }
              return "";
            },
          ),
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.HONOR_TRA_KEYS =
            t.HONOR_LOCK_IMAGE_URL =
            t.HONOR_IMAGES_PATH =
            t.HONOR_IMAGES =
              void 0);
        const n = "/fe/lol-honor/assets/profile";
        t.HONOR_IMAGES_PATH = n;
        const a = n + "/Honor_Lock.png";
        t.HONOR_LOCK_IMAGE_URL = a;
        t.HONOR_IMAGES = {
          UNKNOWN: "Emblem_Generic.png",
          0: {
            LOCKED: "Emblem_0_Locked.png",
            0: "Emblem_0.png",
            1: "Emblem_0.png",
            2: "Emblem_0.png",
            3: "Emblem_0.png",
          },
          1: {
            LOCKED: "Emblem_1_Locked.png",
            0: "Emblem_1.png",
            1: "Emblem_1.png",
            2: "Emblem_1.png",
            3: "Emblem_1.png",
          },
          2: {
            LOCKED: "Emblem_2-0.png",
            0: "Emblem_2-0.png",
            1: "Emblem_2-1.png",
            2: "Emblem_2-2.png",
            3: "Emblem_2-3.png",
          },
          3: {
            LOCKED: "Emblem_3-0.png",
            0: "Emblem_3-0.png",
            1: "Emblem_3-1.png",
            2: "Emblem_3-2.png",
            3: "Emblem_3-3.png",
          },
          4: {
            LOCKED: "Emblem_4-0.png",
            0: "Emblem_4-0.png",
            1: "Emblem_4-1.png",
            2: "Emblem_4-2.png",
            3: "Emblem_4-3.png",
          },
          5: "Emblem_5.png",
        };
        t.HONOR_TRA_KEYS = {
          LOCKED: "honor_profile_checkpoint_locked_tooltip",
          LOCKED_CLASH: "honor_profile_checkpoint_locked_clash_tooltip",
          MAX_LEVEL: "honor_profile_checkpoint_max_tooltip",
          CHECKPOINT: {
            0: "honor_profile_checkpoint_tooltip",
            1: "honor_profile_checkpoint_tooltip",
            2: "honor_profile_checkpoint_tooltip",
            3: "honor_profile_checkpoint_last_tooltip",
          },
          LEVEL_APPEND: {
            NORMAL: {
              0: "honor_profile_checkpoint_append_0_tooltip",
              1: "honor_profile_checkpoint_append_1_tooltip",
            },
            CLASH: {
              0: "honor_profile_checkpoint_append_0_clash_tooltip",
              1: "honor_profile_checkpoint_append_1_clash_tooltip",
            },
          },
        };
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "6cWhrBX1",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-honor-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-honor-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-honor-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","style-profile-emblem-wrapper"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","style-profile-emblem-header"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","style-profile-emblem-header-title"],["flush-element"],["append",["unknown",["tra","honor_profile_header"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldShowHonor"]]],null,8],["text","  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","style-honor-lock-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["shouldShowHonorLockIcon"]]],null,7],["text","  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","style-profile-emblem-content-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","style-profile-emblem-content"],["flush-element"],["text","\\n"],["block",["if"],[["get",["shouldShowHonor"]]],null,6,5],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["shouldShowHonor"]]],null,4,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","honor_profile_other_player_tooltip"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],0]],"locals":[]},{"statements":[["block",["if"],[["get",["shouldShowOtherSummonerTooltip"]]],null,1]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["helper",["sanitize"],[["get",["profileTooltipText"]]],null],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],3]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","style-profile-honor-empty"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","img",[]],["static-attr","class","style-profile-honor-icon"],["dynamic-attr","src",["concat",[["unknown",["honorProfileImageUrl"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","style-profile-honor-lock"],["dynamic-attr","src",["concat",[["unknown",["honorLockImageUrl"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","style-profile-emblem-header-subtitle"],["flush-element"],["append",["unknown",["honorProfileLevel"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a,
          s = n(1),
          i = (a = n(27)) && a.__esModule ? a : { default: a };
        n(64);
        var r = s.Ember.Component.extend(i.default, {
          classNames: ["profile-legendary-champion-mastery-component"],
          layout: n(65),
          profileService: s.Ember.inject.service("profile"),
          eternalsService: s.Ember.inject.service("eternals"),
          championMasteryData: s.Ember.computed.alias(
            "profileService.championMasteries",
          ),
          championMasteryScore: s.Ember.computed.alias(
            "championMasteryData.score",
          ),
          computedEternals: s.Ember.computed.alias("eternalsService.summary"),
          shouldShowEternals: s.Ember.computed.and(
            "eternalsEnabled",
            "computedEternals.length",
          ),
          eternalsEnabled: s.Ember.computed.alias("eternalsService.enabled"),
          computedMasteries: s.Ember.computed(
            "championMasteryData.masteries",
            function () {
              const e = this.get("championMasteryData.masteries");
              if (e) {
                if (e.length < 3) {
                  const t = e,
                    n = 3 - t.length;
                  for (let e = 0; e < n; e++) t.push(null);
                  return t;
                }
                return e;
              }
            },
          ),
          totalScore: s.Ember.computed("championMasteryScore", function () {
            const e = this.get("championMasteryScore") || 0,
              t = (this.get("tra.metadata.locale.id") || "en_US").replace(
                "_",
                "-",
              );
            return e.toLocaleString(t);
          }),
        });
        t.default = r;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "zlB8eH32",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-legendary-champion-mastery-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-legendary-champion-mastery-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-legendary-champion-mastery-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","style-profile-emblem-wrapper"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","style-profile-emblem-header"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","style-profile-emblem-header-title"],["flush-element"],["append",["unknown",["tra","champmastery_score_label"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","style-profile-champion-mastery-score"],["flush-element"],["append",["unknown",["totalScore"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","style-profile-emblem-content-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","style-profile-emblem-content"],["flush-element"],["text","\\n      "],["append",["helper",["legendary-mastery-icon"],null,[["mastery","emphasis"],[["get",["computedMasteries","0"]],"primary"]]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["unless"],[["get",["masteryDisabled"]]],null,4]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                "],["append",["helper",["eternals-tooltip"],null,[["eternal","index"],[["get",["eternal"]],["get",["index"]]]]],false],["text","\\n"]],"locals":["eternal","index"]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","style-profile-tooltip-divider"],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","style-profile-eternals-section"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","style-profile-eternals-title"],["flush-element"],["append",["unknown",["tra","profile_mastery_tooltip_eternals_title"]],false],["close-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","style-profile-eternals-tripple-tooltip"],["flush-element"],["text","\\n"],["block",["each"],[["get",["computedEternals"]]],null,0],["text","            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","profile-legendary-champion-mastery-section"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","style-profile-mastery-section"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","style-profile-mastery-title"],["flush-element"],["append",["unknown",["tra","profile_mastery_tooltip_mastery_title"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","style-profile-legendary-champion-mastery-triple-tooltip"],["flush-element"],["text","\\n            "],["append",["helper",["legendary-mastery-tooltip"],null,[["mastery","emphasis"],[["get",["computedMasteries","1"]],"secondary"]]],false],["text","\\n            "],["append",["helper",["legendary-mastery-tooltip"],null,[["mastery","emphasis"],[["get",["computedMasteries","0"]],"primary"]]],false],["text","\\n            "],["append",["helper",["legendary-mastery-tooltip"],null,[["mastery","emphasis"],[["get",["computedMasteries","2"]],"secondary"]]],false],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldShowEternals"]]],null,1],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","positioningStrategy","offsetX"],["top","preserve",0]],2]],"locals":[]},{"statements":[["block",["if"],[["get",["computedMasteries"]]],null,3]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        n(67);
        var s = a.Ember.Component.extend({
          classNames: [
            "style-profile-legendary-champion-mastery-icon-component",
          ],
          layout: n(68),
          mastery: {},
          emphasis: "",
          masteryDisabled: a.Ember.computed.empty("mastery"),
          masteryLevel: a.Ember.computed.alias("mastery.championLevel"),
          championInfoObserver: a.Ember.on(
            "init",
            a.Ember.observer("mastery.championId", function () {
              const e = parseInt(this.get("mastery.championId"));
              e &&
                a.GameDataChampionSummary.getChampionSummaryPromise(e).then(
                  (e) => {
                    this.set("championInfo", e);
                  },
                );
            }),
          ),
          masteryLevelCss: a.Ember.computed("masteryLevel", function () {
            const e =
              this.get("masteryLevel") ||
              a.SharedChampionMasteryConstants.MINIMUM_MASTERY_LEVEL;
            return Math.min(
              e,
              a.SharedChampionMasteryConstants.MASTERY_CREST_INFINITE_THRESHOLD,
            );
          }),
          masteryBannerPath: a.Ember.computed("masteryLevel", function () {
            const e = this.get("masteryLevel");
            return a.SharedChampionMasteryConstants.getMasteryBannerAsset(e);
          }),
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "9mmjgiiY",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-legendary-champion-mastery-component\\\\legendary-mastery-icon-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-legendary-champion-mastery-component\\\\legendary-mastery-icon-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-legendary-champion-mastery-component\\\\legendary-mastery-icon-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["style-profile-champion-icon ",["unknown",["emphasis"]]]]],["flush-element"],["text","\\n\\n"],["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["style-profile-champion-icon-banner-layer ",["unknown",["emphasis"]]]]],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","style-profile-banner-image"],["dynamic-attr","src",["unknown",["masteryBannerPath"]],null],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["text","  "],["open-element","div",[]],["static-attr","class","style-profile-champion-icon-layer"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","style-profile-champion-icon-masked"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["masteryDisabled"]]],null,2],["text","    "],["close-element"],["text","\\n\\n"],["block",["unless"],[["get",["masteryDisabled"]]],null,1],["text","  "],["close-element"],["text","\\n\\n"],["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["style-profile-champion-icon-accent-layer ",["unknown",["emphasis"]]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["style-profile-accent-image level-",["unknown",["masteryLevelCss"]]]]],["flush-element"],["text","\\n"],["block",["unless"],[["get",["masteryDisabled"]]],null,0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["helper",["mastery-crest"],null,[["masteryLevel"],[["get",["masteryLevel"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","style-profile-champion-icon-top-frame"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["championInfo","squarePortraitPath"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        n(70);
        var s = a.Ember.Component.extend({
          classNames: ["profile-legendary-champion-mastery-tooltip-component"],
          layout: n(71),
          mastery: {},
          emphasis: "",
          profileService: a.Ember.inject.service("profile"),
          championMasteryConfig: a.Ember.computed.alias(
            "profileService.championMasteryConfig",
          ),
          masteryDisabled: a.Ember.computed.empty("mastery"),
          championInfoObserver: a.Ember.on(
            "init",
            a.Ember.observer("mastery.championId", function () {
              const e = parseInt(this.get("mastery.championId"));
              e &&
                a.GameDataChampionSummary.getChampionSummaryPromise(e).then(
                  (e) => {
                    this.set("championInfo", e);
                  },
                );
            }),
          ),
          masteryLevelTxt: a.Ember.computed(
            "mastery.championLevel",
            function () {
              const e = this.get("mastery.championLevel");
              return this.get("tra").formatString(
                "champmastery_mastery_level",
                { level: e },
              );
            },
          ),
          highestGradeTxt: a.Ember.computed(
            "mastery.highestGrade",
            function () {
              const e =
                this.get("mastery.highestGrade") ||
                this.get("tra.champmastery_season_no_grade");
              return this.get("tra").formatString(
                "champmastery_season_highest_grade",
                { grade: e },
              );
            },
          ),
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "5z9sYSGP",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-legendary-champion-mastery-component\\\\legendary-mastery-tooltip-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-legendary-champion-mastery-component\\\\legendary-mastery-tooltip-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-legendary-champion-mastery-component\\\\legendary-mastery-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["profile-champion-icon-inner-container ",["unknown",["emphasis"]]]]],["flush-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","profile-lcm-tooltip-icon-container"],["flush-element"],["text","\\n    "],["append",["helper",["legendary-mastery-icon"],null,[["mastery","emphasis"],[["get",["mastery"]],["get",["emphasis"]]]]],false],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["unless"],[["get",["masteryDisabled"]]],null,0],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","profile-lcm-tooltip-contents"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","profile-lcm-tooltip-contents-title"],["flush-element"],["text","\\n        "],["append",["unknown",["championInfo","name"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","profile-lcm-tooltip-contents-hr"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","profile-lcm-tooltip-contents-level"],["flush-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","profile-lcm-tooltip-contents-level-icon"],["static-attr","src","/fe/lol-static-assets/images/champion-mastery/icon-mastery.svg"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","profile-lcm-tooltip-contents-level-text"],["flush-element"],["text","\\n          "],["append",["unknown",["masteryLevelTxt"]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","profile-lcm-tooltip-contents-best-grade"],["flush-element"],["text","\\n        "],["append",["unknown",["highestGradeTxt"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0),
          (t.validateTrophy = l);
        var a,
          s = n(1),
          i = (a = n(27)) && a.__esModule ? a : { default: a };
        n(73);
        const r = (0, s.EmberDataBinding)({
          Ember: s.Ember,
          websocket: (0, s.getProvider)().getSocket(),
          basePaths: { trophies: "/lol-trophies" },
          boundProperties: {
            trophiesConfigNamespace:
              "/lol-platform-config/v1/namespaces/Trophies",
          },
        });
        var o = s.Ember.Component.extend(i.default, r, {
          classNames: ["style-profile-trophy-component"],
          layout: n(74),
          profileService: s.Ember.inject.service("profile"),
          puuid: s.Ember.computed.alias("summoner.puuid"),
          isEnabledOnProfile: s.Ember.computed.bool(
            "trophiesConfigNamespace.IsEnabledOnProfile",
          ),
          hasTrophyImgAssets: s.Ember.computed.and(
            "pedestalImgSrc",
            "cupgemImgSrc",
          ),
          hasNoTrophy: s.Ember.computed.equal("trophy", null),
          hasTrophy: s.Ember.computed.not("hasNoTrophy"),
          trophyImgObserver: s.Ember.on(
            "init",
            s.Ember.observer("trophy", function () {
              const e = this.get("trophy");
              if (!(e && e.theme && e.tier && e.bracket))
                return (
                  this.set("cupgemImgSrc", ""),
                  void this.set("pedestalImgSrc", "")
                );
              s.GameDataClashTrophies.getTrophyPromise(e.theme, e.bracket).then(
                (e) => {
                  let t = "";
                  e && e.profileIcon && (t = e.profileIcon),
                    this.set("cupgemImgSrc", t);
                },
              ),
                s.GameDataClashTrophies.getPedestalPromise(e.tier).then((e) => {
                  let t = "";
                  e && e.profileIcon && (t = e.profileIcon),
                    this.set("pedestalImgSrc", t);
                });
            }),
          ),
          fetchTrophyProfileObserver: s.Ember.on(
            "init",
            s.Ember.observer(
              "isEnabledOnProfile",
              "isMe",
              "hasSummoner",
              "puuid",
              "trophiesConfigNamespace.IsOtherSummonersProfileEnabled",
              function () {
                this.get("isEnabledOnProfile") &&
                  this.get("hasSummoner") &&
                  s.Ember.run.once(this, "fetchTrophyProfile");
              },
            ),
          ),
          fetchTrophyProfile() {
            const e = this.get("_getTrophyProfilePromise"),
              t = this.get("trophy");
            if (e || t) return;
            const n = this.get("isMe");
            if (s.Lodash.isNil(n)) return;
            if (!n) {
              if (
                !this.get(
                  "trophiesConfigNamespace.IsOtherSummonersProfileEnabled",
                )
              )
                return;
            }
            const a = this.get("api.trophies");
            let i;
            if (n)
              i = a
                .get("/v1/current-summoner/trophies/profile", { skipCache: !0 })
                .catch((e) => {
                  404 === e.status
                    ? s.logger.trace(
                        "Current summoner has no profile trophy",
                        e,
                      )
                    : s.logger.warning(
                        "Failed to get current summoner's profile trophy",
                        e,
                      );
                });
            else {
              const e = this.get("puuid");
              if (s.Lodash.isNil(e))
                return void s.logger.warning(
                  "No puuid passed in when requesting other player's profile trophy",
                );
              i = a
                .get(`/v1/players/${e}/trophies/profile`, { skipCache: !0 })
                .catch((t) => {
                  const { message: n, status: a, text: i } = t;
                  404 === a
                    ? s.logger.trace("Summoner has no profile trophy", {
                        puuid: e,
                        message: n,
                        status: a,
                        text: i,
                      })
                    : s.logger.warning(
                        "Failed to get other player's profile trophy",
                        { puuid: e, message: n, status: a, text: i },
                      );
                });
            }
            this.set("_getTrophyProfilePromise", i),
              i
                .then((e) => {
                  this.isDestroyed || this.set("trophy", l(e));
                })
                .finally(() => {
                  this.isDestroyed ||
                    this.set("_getTrophyProfilePromise", null);
                });
          },
          tournamentHeader: s.Ember.computed("trophy", function () {
            let e = null;
            const t = this.get("trophy");
            return (
              t &&
                t.theme &&
                (e = this.get("tra").get(
                  "clash_tournament_name_" + t.theme.toLowerCase(),
                )),
              e || this.get("tra").get("trophies_profile_header")
            );
          }),
          tierText: s.Ember.computed("trophy", function () {
            const e = this.get("trophy");
            if (!e || !e.tier) return "";
            const t = this.get("tra").get("clash_roster_tier_name_" + e.tier);
            return this.get("tra").formatString("trophies_tier_name_display", {
              tier: t,
            });
          }),
          bracketText: s.Ember.computed("trophy", function () {
            const e = this.get("trophy");
            return e && e.bracket
              ? this.get("tra").formatString("trophies_bracket_size_display", {
                  bracketSize: e.bracket,
                })
              : "";
          }),
        });
        function l(e) {
          return s.Lodash.isNil(e) ||
            ["theme", "tier", "bracket", "seasonId"].some(
              (t) => !e.hasOwnProperty(t),
            )
            ? null
            : e;
        }
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "ccDHdmQG",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-clash-trophy-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-clash-trophy-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-clash-trophy-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","style-profile-emblem-wrapper"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","style-profile-emblem-header"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","style-profile-emblem-header-title"],["flush-element"],["append",["unknown",["tournamentHeader"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["hasTrophy"]]],null,5],["text","  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","style-profile-emblem-content-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","style-profile-emblem-content"],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasTrophyImgAssets"]]],null,4,3],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["isEnabledOnProfile"]]],null,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","trophies_tournament_blank_tooltip"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],0]],"locals":[]},{"statements":[["block",["if"],[["get",["hasNoTrophy"]]],null,1]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","style-profile-trophy-empty"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","style-profile-trophy-container"],["flush-element"],["text","\\n          "],["open-element","img",[]],["static-attr","class","style-profile-trophy-pedestal"],["dynamic-attr","src",["concat",[["unknown",["pedestalImgSrc"]]]]],["flush-element"],["close-element"],["text","\\n          "],["open-element","img",[]],["static-attr","class","style-profile-trophy-cupgem"],["dynamic-attr","src",["concat",[["unknown",["cupgemImgSrc"]]]]],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","style-profile-emblem-header-subtitle"],["flush-element"],["append",["unknown",["tierText"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","style-profile-emblem-header-subtitle"],["flush-element"],["append",["unknown",["bracketText"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0),
          (t.validateFlag = m);
        var a,
          s = n(1),
          i = (a = n(27)) && a.__esModule ? a : { default: a },
          r = n(76);
        n(77);
        var o = n(78);
        const l = (0, s.EmberDataBinding)({
          Ember: s.Ember,
          websocket: (0, s.getProvider)().getSocket(),
          basePaths: { banners: "/lol-banners" },
          boundProperties: {
            bannersConfigNamespace:
              "/lol-platform-config/v1/namespaces/Banners",
          },
        });
        var d = s.Ember.Component.extend(i.default, l, {
          classNames: ["style-profile-clash-banner-component"],
          classNameBindings: [
            "isBannerClickable:clickable",
            "isBannerPickDisabled:pick-disabled",
          ],
          layout: n(79),
          profileService: s.Ember.inject.service("profile"),
          puuid: s.Ember.computed.alias("summoner.puuid"),
          isEnabledOnProfile: s.Ember.computed.bool(
            "bannersConfigNamespace.IsEnabledOnProfile",
          ),
          bannerImgSrcObserver: s.Ember.on(
            "init",
            s.Ember.observer("equippedFlag.{theme,level}", function () {
              const e = this.get("equippedFlag");
              if (void 0 !== e) {
                const t = !!e;
                this.set("hasEquippedFlag", t),
                  this.set("hasNoEquippedFlag", !t);
              }
              e && e.theme && e.level
                ? (s.GameDataClashBanners.getDefaultBannerFramePromise().then(
                    (e) => {
                      let t = "";
                      e && e.inventoryIcon && (t = e.inventoryIcon),
                        this.set("frameImgSrc", t);
                    },
                  ),
                  s.GameDataClashBanners.getBannerFlagPromise(
                    e.theme,
                    e.level,
                  ).then((e) => {
                    let t = "";
                    e && e.inventoryIcon && (t = e.inventoryIcon),
                      this.set("bannerImgSrc", t);
                  }))
                : this.set("bannerImgSrc", "");
            }),
          ),
          _getEquippedFlag(e) {
            return s.Lodash.isNil(e)
              ? Promise.reject(
                  new Error("Null parameter given to getEquippedFlag"),
                )
              : this.get("api.banners").get(`v1/players/${e}/flags/equipped`, {
                  skipCache: !0,
                });
          },
          fetchEquippedFlagObserver: s.Ember.on(
            "init",
            s.Ember.observer(
              "isEnabledOnProfile",
              "isMe",
              "hasSummoner",
              "puuid",
              "bannersConfigNamespace.IsOtherSummonersProfileEnabled",
              function () {
                this.get("isEnabledOnProfile") &&
                  this.get("hasSummoner") &&
                  s.Ember.run.once(this, "fetchEquippedFlag");
              },
            ),
          ),
          fetchEquippedFlag() {
            const e = this.get("_getEquippedFlagPromise"),
              t = this.get("equippedFlag");
            if (e || t) return;
            const n = this.get("isMe");
            if (!s.Lodash.isNil(n)) {
              if (!n) {
                if (
                  !this.get(
                    "bannersConfigNamespace.IsOtherSummonersProfileEnabled",
                  )
                )
                  return;
              }
              if (n)
                this.dataBindProperty(
                  "banners",
                  "/v1/current-summoner/flags/equipped",
                  "equippedFlag",
                );
              else {
                const e = this.get("puuid");
                if (s.Lodash.isNil(e))
                  return void s.logger.warning(
                    "Fetching other summoner flag: no puuid",
                  );
                const t = this._getEquippedFlag(e).catch((t) => {
                  const { message: n, status: a, text: i } = t;
                  404 === a
                    ? s.logger.trace("Summoner has no flag", {
                        puuid: e,
                        message: n,
                        status: a,
                        text: i,
                      })
                    : s.logger.warning("Failed to fetch other summoner flag", {
                        puuid: e,
                        message: n,
                        status: a,
                        text: i,
                      });
                });
                this.set("_getEquippedFlagPromise", t),
                  t
                    .then((e) => {
                      this.isDestroyed || this.set("equippedFlag", m(e));
                    })
                    .finally(() => {
                      this.isDestroyed ||
                        this.set("_getEquippedFlagPromise", null);
                    });
              }
            }
          },
          bannerTournamentTitle: s.Ember.computed(
            "equippedFlag.theme",
            function () {
              const e = this.get("equippedFlag.theme");
              return e
                ? this.get("tra").get(
                    "clash_tournament_simplename_" + e.toLowerCase(),
                  )
                : "";
            },
          ),
          bannerTooltipTournamentText: s.Ember.computed(
            "equippedFlag.theme",
            function () {
              const e = this.get("equippedFlag.theme");
              return e
                ? this.get("tra").get(
                    "clash_tournament_name_" + e.toLowerCase(),
                  )
                : "";
            },
          ),
          bannerTooltipLevelText: s.Ember.computed(
            "equippedFlag.level",
            "equippedFlag.theme",
            function () {
              const e = this.get("equippedFlag.level");
              if (!e) return "";
              let t = "banners_update_flag_level_" + e;
              const n = this.get("equippedFlag.theme");
              return (
                t && o.CLASH_THEMES_EOS.includes(n) && (t += "_eos"),
                t ? this.get("tra").get(t) : ""
              );
            },
          ),
          bannerTooltipEarnedDateText: s.Ember.computed(
            "equippedFlag.earnedDateIso8601",
            function () {
              const e = this.get("equippedFlag.earnedDateIso8601"),
                t = this.get("tra.metadata.locale.id", "en-US");
              return e ? this.get("tra").moment(e).locale(t).format("LL") : "";
            },
          ),
          _isEquipEnabled: s.Ember.computed.bool(
            "bannersConfigNamespace.IsEquipEnabled",
          ),
          _isEquipDisabled: s.Ember.computed.not("_isEquipEnabled"),
          isBannerClickable: s.Ember.computed.and(
            "_isEquipEnabled",
            "isMe",
            "hasEquippedFlag",
          ),
          isBannerPickDisabled: s.Ember.computed.and(
            "_isEquipDisabled",
            "isMe",
            "hasEquippedFlag",
          ),
          actions: {
            clickBanner() {
              s.AudioPlugin.getChannel("sfx-ui").playSound(
                "/fe/lol-uikit/sfx-uikit-click-generic.ogg",
              ),
                s.logger.trace("Displaying banner update modal"),
                r.ClashBannerPickerHandler.showModal(),
                s.Telemetry.sendCustomData("profile-overview-events", {
                  event: "show-banners-update-modal",
                });
            },
          },
          onWillDestroyElement: s.Ember.on("willDestroyElement", function () {
            this.get("isBannerClickable") &&
              r.ClashBannerPickerHandler.hideModal();
          }),
        });
        function m(e) {
          return s.Lodash.isNil(e) ||
            ["level", "theme", "seasonId"].some((t) => !e.hasOwnProperty(t))
            ? null
            : e;
        }
        t.default = d;
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const s = new (class {
          constructor() {
            this._bannerPickerModalInstance = null;
          }
          showModal() {
            this._bannerPickerModalInstance = a.ModalManager.add({
              type: "ClashBannerPickerComponent",
              ComponentFactory: a.ComponentFactory,
              show: !0,
            });
          }
          hideModal() {
            this._bannerPickerModalInstance &&
              a.ModalManager.remove(this._bannerPickerModalInstance, () => {
                this._bannerPickerModalInstance = void 0;
              });
          }
        })();
        e.exports = { ClashBannerPickerHandler: s };
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.CLASH_THEMES_EOS = void 0);
        t.CLASH_THEMES_EOS = ["EOS2020", "EOS2021", "EOS2022", "EOS2023"];
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "nUC3qhG/",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-clash-banner-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-clash-banner-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-clash-banner-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","style-profile-emblem-wrapper"],["dynamic-attr","onclick",["helper",["if"],[["get",["isBannerClickable"]],["helper",["action"],[["get",[null]],"clickBanner"],null]],null],null],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","style-profile-emblem-header"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","style-profile-emblem-header-title"],["flush-element"],["append",["unknown",["tra","banners_profile_header"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["bannerImgSrc"]]],null,8],["text","  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","style-profile-emblem-content-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","style-profile-emblem-content"],["flush-element"],["text","\\n"],["block",["if"],[["get",["bannerImgSrc"]]],null,7,6],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["comment"," This if/elseif pattern is used so that toooltip creation doesn\'t get confused on initialization, when it temporarily appears that there isn\'t a flag  "],["text","\\n"],["block",["if"],[["get",["hasEquippedFlag"]]],null,5,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","banners_profile_blank_tooltip_message"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],0]],"locals":[]},{"statements":[["block",["if"],[["get",["hasNoEquippedFlag"]]],null,1]],"locals":[]},{"statements":[["text","          "],["open-element","hr",[]],["static-attr","class","style-profile-clash-banner-tooltip-call-to-action-separator"],["flush-element"],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","banners_profile_tooltip_message"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","style-profile-clash-banner-tooltip-details-group"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","style-profile-clash-banner-tooltip-details-theme"],["flush-element"],["append",["unknown",["bannerTooltipTournamentText"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","style-profile-clash-banner-tooltip-details-level"],["flush-element"],["append",["unknown",["bannerTooltipLevelText"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","style-profile-clash-banner-tooltip-details-earned-date"],["flush-element"],["append",["unknown",["bannerTooltipEarnedDateText"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["isBannerClickable"]]],null,3],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition"],["top"]],4]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","style-profile-clash-banner-empty"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","img",[]],["static-attr","class","style-profile-clash-banner-image"],["dynamic-attr","src",["concat",[["unknown",["bannerImgSrc"]]]]],["flush-element"],["close-element"],["text","\\n        "],["open-element","img",[]],["static-attr","class","style-profile-clash-banner-frame"],["dynamic-attr","src",["concat",[["unknown",["frameImgSrc"]]]]],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","style-profile-clash-banner-picker-preloader"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","style-profile-clash-banner-picker-button"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","style-profile-emblem-header-subtitle"],["flush-element"],["append",["unknown",["bannerTournamentTitle"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        n(81);
        var s = a.Ember.Component.extend({
          classNames: ["style-profile-eternals-component"],
          classNameBindings: ["emphasis"],
          layout: n(82),
          eternal: null,
          index: null,
          championInfo: null,
          emphasis: a.Ember.computed("index", function () {
            switch (this.get("index")) {
              case 0:
                return "primary";
              case 1:
                return "secondary";
              default:
                return "tertiary";
            }
          }),
          championId: a.Ember.computed("eternal.championId", function () {
            const e = this.get("eternal.championId");
            return (
              e &&
                a.GameDataChampionSummary.getChampionSummaryPromise(e).then(
                  (e) => {
                    this.set("championInfo", e);
                  },
                ),
              e
            );
          }),
          categoryLower: a.Ember.computed("eternal.category", function () {
            return this.get("eternal.category").toLowerCase();
          }),
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "ZxWbZNbc",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\eternals-tooltip-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\eternals-tooltip-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\eternals-tooltip-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["profile-eternals-image ",["unknown",["emphasis"]]]]],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["eternal","imageUrl"]],");"]]],["flush-element"],["close-element"],["text","\\n"],["open-element","span",[]],["static-attr","class","profile-eternals-value"],["flush-element"],["append",["unknown",["eternal","value"]],false],["close-element"],["text","\\n"],["open-element","span",[]],["static-attr","class","profile-eternals-name"],["flush-element"],["append",["unknown",["eternal","name"]],false],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["profile-eternals-champion ",["unknown",["championId"]]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","profile-eternals-champion-framing"],["flush-element"],["close-element"],["text","\\n  "],["open-element","img",[]],["static-attr","class","profile-eternals-champion-icon"],["dynamic-attr","src",["concat",[["unknown",["championInfo","squarePortraitPath"]]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a = n(1),
          s = n(37),
          i = o(n(84)),
          r = o(n(27));
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        n(213);
        const { RunMixin: l } = a.EmberAddons.EmberLifeline;
        const d = (0, a.EmberDataBinding)({
          Ember: a.Ember,
          websocket: (0, a.getProvider)().getSocket(),
          basePaths: {
            honor: "/lol-honor-v2",
            settings: "/lol-settings",
            platformConfig: "/lol-platform-config",
          },
          boundProperties: {
            honorConfig: { api: "honor", path: "/v1/config" },
            honorProfile: { api: "honor", path: "/v1/profile" },
            settingsReady: { api: "settings", path: "/v2/ready" },
          },
        });
        e.exports = a.Ember.Component.extend(l, d, r.default, {
          classNames: ["style-profile-boosts-component"],
          layout: n(214),
          tooltipManager: a.TooltipManager,
          profileService: a.Ember.inject.service("profile"),
          boosts: a.Ember.computed.alias("profileService.boosts"),
          honorEnabled: a.Ember.computed.bool("honorConfig.Enabled"),
          shouldShowHonor: a.Ember.computed.and("honorEnabled", "isMe"),
          boostActive: a.Ember.computed("xpBoostActive", "boosts", function () {
            if (this.get("boosts")) {
              if (this.get("xpBoostActive")) return !0;
              a.Ember.run.scheduleOnce("afterRender", this, function () {
                this.$(".boost .boost-tooltip").addClass("inactive");
              });
            }
            return !1;
          }),
          xpBoostActive: a.Ember.computed(
            "boosts.xpBoostEndDate",
            "boosts.xpBoostPerWinCount",
            function () {
              const e = this.get("boosts");
              if (e) {
                const t = Date.now(),
                  n = new Date(e.xpBoostEndDate).getTime() > t,
                  a = e.xpBoostPerWinCount > 0;
                return n || a;
              }
              return !1;
            },
          ),
          xpBoostWinCountString: a.Ember.computed(
            "boosts.xpBoostPerWinCount",
            "tra.profile_perks_boost_tooltip_message_xp_wins",
            "tra.profile_perks_boost_tooltip_message_xp_wins_single",
            function () {
              const e = this.get("boosts");
              if (e) {
                const t = e.xpBoostPerWinCount;
                if (0 === t);
                else {
                  if (1 === t)
                    return (0, s.translate)(
                      this,
                      "profile_perks_boost_tooltip_message_xp_wins_single",
                      { xpBoostPerWinCount: t },
                    );
                  if (t > 1)
                    return (0, s.translate)(
                      this,
                      "profile_perks_boost_tooltip_message_xp_wins",
                      { xpBoostPerWinCount: t },
                    );
                }
              }
            },
          ),
          xpExpireString: a.Ember.computed(
            "boosts.xpBoostEndDate",
            "tra.profile_perks_boost_tooltip_message_xp_time",
            "tra.profile_perks_boost_tooltip_message_xp_time_single",
            function () {
              const e = this.get("boosts");
              if (e) {
                const t = (function (e) {
                  const t = new Date().toISOString(),
                    n = Math.ceil(
                      (0, i.default)(e).diff((0, i.default)(t), "days", !0),
                    );
                  return Math.max(n, 0);
                })(e.xpBoostEndDate);
                return t < 1
                  ? ""
                  : 1 === t
                    ? (0, s.translate)(
                        this,
                        "profile_perks_boost_tooltip_message_xp_time_single",
                        { xpExpireDays: t },
                      )
                    : (0, s.translate)(
                        this,
                        "profile_perks_boost_tooltip_message_xp_time",
                        { xpExpireDays: t },
                      );
              }
            },
          ),
          rerollsMoreThanMax: a.Ember.computed(
            "summoner.rerollPoints.numberOfRolls",
            "summoner.rerollPoints.maxRolls",
            function () {
              const e = this.get("summoner");
              return (
                !(!e || !e.rerollPoints) &&
                e.rerollPoints.numberOfRolls >= e.rerollPoints.maxRolls
              );
            },
          ),
          aramRerollCount: a.Ember.computed(
            "summoner.rerollPoints.numberOfRolls",
            "summoner.rerollPoints.maxRolls",
            function () {
              const e = this.get("summoner");
              if (e && e.rerollPoints) {
                const t = this.get("rerollsMoreThanMax"),
                  { rerollPoints: n } = e;
                return t ? n.maxRolls : n.numberOfRolls;
              }
              return 0;
            },
          ),
          pointsTowardReroll: a.Ember.computed(
            "summoner.rerollPoints.currentPoints",
            "summoner.rerollPoints.pointsCostToRoll",
            function () {
              const e = this.get("summoner");
              if (e && e.rerollPoints) {
                const { currentPoints: t } = e.rerollPoints,
                  { pointsCostToRoll: n } = e.rerollPoints;
                return t % n;
              }
              return 0;
            },
          ),
          rerollsMoreThanMaxString: a.Ember.computed(
            "aramRerollCount",
            "tra.profile_perks_aram_reroll_tooltip_message_full",
            function () {
              const e = this.get("aramRerollCount");
              return (0, s.translate)(
                this,
                "profile_perks_aram_reroll_tooltip_message_full",
                { aramRerollCount: e },
              );
            },
          ),
          rerollsProgressPercentage: a.Ember.computed(
            "summoner.rerollPoints.currentPoints",
            "summoner.rerollPoints.pointsCostToRoll",
            function () {
              const e = this.get("summoner");
              if (e && e.rerollPoints) {
                const t = this.get("rerollsMoreThanMax"),
                  { rerollPoints: n } = e;
                if (t) return 100;
                return (
                  (this.get("pointsTowardReroll") /
                    parseInt(n.pointsCostToRoll)) *
                  100
                );
              }
              return 0;
            },
          ),
          rerollsProgressString: a.Ember.computed(
            "summoner.rerollPoints.currentPoints",
            "summoner.rerollPoints.pointsCostToRoll",
            "aramRerollCount",
            "tra.profile_perks_aram_reroll_tooltip_message_progress",
            function () {
              const e = this.get("summoner");
              if (e) {
                const t = this.get("pointsTowardReroll");
                return (0, s.translate)(
                  this,
                  "profile_perks_aram_reroll_tooltip_message_progress",
                  {
                    rerollProgress: t,
                    rerollTotal: e.rerollPoints.pointsCostToRoll,
                  },
                );
              }
            },
          ),
          actions: {},
        });
      },
      function (e, t, n) {
        (e = n.nmd(e)).exports = (function () {
          "use strict";
          var t, a;
          function s() {
            return t.apply(null, arguments);
          }
          function i(e) {
            t = e;
          }
          function r(e) {
            return (
              e instanceof Array ||
              "[object Array]" === Object.prototype.toString.call(e)
            );
          }
          function o(e) {
            return (
              null != e &&
              "[object Object]" === Object.prototype.toString.call(e)
            );
          }
          function l(e) {
            if (Object.getOwnPropertyNames)
              return 0 === Object.getOwnPropertyNames(e).length;
            var t;
            for (t in e) if (e.hasOwnProperty(t)) return !1;
            return !0;
          }
          function d(e) {
            return void 0 === e;
          }
          function m(e) {
            return (
              "number" == typeof e ||
              "[object Number]" === Object.prototype.toString.call(e)
            );
          }
          function _(e) {
            return (
              e instanceof Date ||
              "[object Date]" === Object.prototype.toString.call(e)
            );
          }
          function u(e, t) {
            var n,
              a = [];
            for (n = 0; n < e.length; ++n) a.push(t(e[n], n));
            return a;
          }
          function c(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }
          function p(e, t) {
            for (var n in t) c(t, n) && (e[n] = t[n]);
            return (
              c(t, "toString") && (e.toString = t.toString),
              c(t, "valueOf") && (e.valueOf = t.valueOf),
              e
            );
          }
          function h(e, t, n, a) {
            return qn(e, t, n, a, !0).utc();
          }
          function f() {
            return {
              empty: !1,
              unusedTokens: [],
              unusedInput: [],
              overflow: -2,
              charsLeftOver: 0,
              nullInput: !1,
              invalidMonth: null,
              invalidFormat: !1,
              userInvalidated: !1,
              iso: !1,
              parsedDateParts: [],
              meridiem: null,
              rfc2822: !1,
              weekdayMismatch: !1,
            };
          }
          function y(e) {
            return null == e._pf && (e._pf = f()), e._pf;
          }
          function M(e) {
            if (null == e._isValid) {
              var t = y(e),
                n = a.call(t.parsedDateParts, function (e) {
                  return null != e;
                }),
                s =
                  !isNaN(e._d.getTime()) &&
                  t.overflow < 0 &&
                  !t.empty &&
                  !t.invalidMonth &&
                  !t.invalidWeekday &&
                  !t.weekdayMismatch &&
                  !t.nullInput &&
                  !t.invalidFormat &&
                  !t.userInvalidated &&
                  (!t.meridiem || (t.meridiem && n));
              if (
                (e._strict &&
                  (s =
                    s &&
                    0 === t.charsLeftOver &&
                    0 === t.unusedTokens.length &&
                    void 0 === t.bigHour),
                null != Object.isFrozen && Object.isFrozen(e))
              )
                return s;
              e._isValid = s;
            }
            return e._isValid;
          }
          function g(e) {
            var t = h(NaN);
            return null != e ? p(y(t), e) : (y(t).userInvalidated = !0), t;
          }
          a = Array.prototype.some
            ? Array.prototype.some
            : function (e) {
                for (
                  var t = Object(this), n = t.length >>> 0, a = 0;
                  a < n;
                  a++
                )
                  if (a in t && e.call(this, t[a], a, t)) return !0;
                return !1;
              };
          var L = (s.momentProperties = []);
          function k(e, t) {
            var n, a, s;
            if (
              (d(t._isAMomentObject) ||
                (e._isAMomentObject = t._isAMomentObject),
              d(t._i) || (e._i = t._i),
              d(t._f) || (e._f = t._f),
              d(t._l) || (e._l = t._l),
              d(t._strict) || (e._strict = t._strict),
              d(t._tzm) || (e._tzm = t._tzm),
              d(t._isUTC) || (e._isUTC = t._isUTC),
              d(t._offset) || (e._offset = t._offset),
              d(t._pf) || (e._pf = y(t)),
              d(t._locale) || (e._locale = t._locale),
              L.length > 0)
            )
              for (n = 0; n < L.length; n++)
                d((s = t[(a = L[n])])) || (e[a] = s);
            return e;
          }
          var v = !1;
          function b(e) {
            k(this, e),
              (this._d = new Date(null != e._d ? e._d.getTime() : NaN)),
              this.isValid() || (this._d = new Date(NaN)),
              !1 === v && ((v = !0), s.updateOffset(this), (v = !1));
          }
          function Y(e) {
            return e instanceof b || (null != e && null != e._isAMomentObject);
          }
          function T(e) {
            return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
          }
          function D(e) {
            var t = +e,
              n = 0;
            return 0 !== t && isFinite(t) && (n = T(t)), n;
          }
          function S(e, t, n) {
            var a,
              s = Math.min(e.length, t.length),
              i = Math.abs(e.length - t.length),
              r = 0;
            for (a = 0; a < s; a++)
              ((n && e[a] !== t[a]) || (!n && D(e[a]) !== D(t[a]))) && r++;
            return r + i;
          }
          function w(e) {
            !1 === s.suppressDeprecationWarnings &&
              "undefined" != typeof console &&
              console.warn &&
              console.warn("Deprecation warning: " + e);
          }
          function E(e, t) {
            var n = !0;
            return p(function () {
              if (
                (null != s.deprecationHandler && s.deprecationHandler(null, e),
                n)
              ) {
                for (var a, i = [], r = 0; r < arguments.length; r++) {
                  if (((a = ""), "object" == typeof arguments[r])) {
                    for (var o in ((a += "\n[" + r + "] "), arguments[0]))
                      a += o + ": " + arguments[0][o] + ", ";
                    a = a.slice(0, -2);
                  } else a = arguments[r];
                  i.push(a);
                }
                w(
                  e +
                    "\nArguments: " +
                    Array.prototype.slice.call(i).join("") +
                    "\n" +
                    new Error().stack,
                ),
                  (n = !1);
              }
              return t.apply(this, arguments);
            }, t);
          }
          var x,
            P = {};
          function H(e, t) {
            null != s.deprecationHandler && s.deprecationHandler(e, t),
              P[e] || (w(t), (P[e] = !0));
          }
          function O(e) {
            return (
              e instanceof Function ||
              "[object Function]" === Object.prototype.toString.call(e)
            );
          }
          function C(e) {
            var t, n;
            for (n in e) O((t = e[n])) ? (this[n] = t) : (this["_" + n] = t);
            (this._config = e),
              (this._dayOfMonthOrdinalParseLenient = new RegExp(
                (this._dayOfMonthOrdinalParse.source ||
                  this._ordinalParse.source) +
                  "|" +
                  /\d{1,2}/.source,
              ));
          }
          function j(e, t) {
            var n,
              a = p({}, e);
            for (n in t)
              c(t, n) &&
                (o(e[n]) && o(t[n])
                  ? ((a[n] = {}), p(a[n], e[n]), p(a[n], t[n]))
                  : null != t[n]
                    ? (a[n] = t[n])
                    : delete a[n]);
            for (n in e) c(e, n) && !c(t, n) && o(e[n]) && (a[n] = p({}, a[n]));
            return a;
          }
          function I(e) {
            null != e && this.set(e);
          }
          (s.suppressDeprecationWarnings = !1),
            (s.deprecationHandler = null),
            (x = Object.keys
              ? Object.keys
              : function (e) {
                  var t,
                    n = [];
                  for (t in e) c(e, t) && n.push(t);
                  return n;
                });
          var N = {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L",
          };
          function A(e, t, n) {
            var a = this._calendar[e] || this._calendar.sameElse;
            return O(a) ? a.call(t, n) : a;
          }
          var R = {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A",
          };
          function W(e) {
            var t = this._longDateFormat[e],
              n = this._longDateFormat[e.toUpperCase()];
            return t || !n
              ? t
              : ((this._longDateFormat[e] = n.replace(
                  /MMMM|MM|DD|dddd/g,
                  function (e) {
                    return e.slice(1);
                  },
                )),
                this._longDateFormat[e]);
          }
          var F = "Invalid date";
          function B() {
            return this._invalidDate;
          }
          var U = "%d",
            z = /\d{1,2}/;
          function V(e) {
            return this._ordinal.replace("%d", e);
          }
          var G = {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            ss: "%d seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years",
          };
          function J(e, t, n, a) {
            var s = this._relativeTime[n];
            return O(s) ? s(e, t, n, a) : s.replace(/%d/i, e);
          }
          function q(e, t) {
            var n = this._relativeTime[e > 0 ? "future" : "past"];
            return O(n) ? n(t) : n.replace(/%s/i, t);
          }
          var K = {};
          function Q(e, t) {
            var n = e.toLowerCase();
            K[n] = K[n + "s"] = K[t] = e;
          }
          function $(e) {
            return "string" == typeof e ? K[e] || K[e.toLowerCase()] : void 0;
          }
          function Z(e) {
            var t,
              n,
              a = {};
            for (n in e) c(e, n) && (t = $(n)) && (a[t] = e[n]);
            return a;
          }
          var X = {};
          function ee(e, t) {
            X[e] = t;
          }
          function te(e) {
            var t = [];
            for (var n in e) t.push({ unit: n, priority: X[n] });
            return (
              t.sort(function (e, t) {
                return e.priority - t.priority;
              }),
              t
            );
          }
          function ne(e, t, n) {
            var a = "" + Math.abs(e),
              s = t - a.length;
            return (
              (e >= 0 ? (n ? "+" : "") : "-") +
              Math.pow(10, Math.max(0, s)).toString().substr(1) +
              a
            );
          }
          var ae =
              /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
            se = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
            ie = {},
            re = {};
          function oe(e, t, n, a) {
            var s = a;
            "string" == typeof a &&
              (s = function () {
                return this[a]();
              }),
              e && (re[e] = s),
              t &&
                (re[t[0]] = function () {
                  return ne(s.apply(this, arguments), t[1], t[2]);
                }),
              n &&
                (re[n] = function () {
                  return this.localeData().ordinal(s.apply(this, arguments), e);
                });
          }
          function le(e) {
            return e.match(/\[[\s\S]/)
              ? e.replace(/^\[|\]$/g, "")
              : e.replace(/\\/g, "");
          }
          function de(e) {
            var t,
              n,
              a = e.match(ae);
            for (t = 0, n = a.length; t < n; t++)
              re[a[t]] ? (a[t] = re[a[t]]) : (a[t] = le(a[t]));
            return function (t) {
              var s,
                i = "";
              for (s = 0; s < n; s++) i += O(a[s]) ? a[s].call(t, e) : a[s];
              return i;
            };
          }
          function me(e, t) {
            return e.isValid()
              ? ((t = _e(t, e.localeData())),
                (ie[t] = ie[t] || de(t)),
                ie[t](e))
              : e.localeData().invalidDate();
          }
          function _e(e, t) {
            var n = 5;
            function a(e) {
              return t.longDateFormat(e) || e;
            }
            for (se.lastIndex = 0; n >= 0 && se.test(e); )
              (e = e.replace(se, a)), (se.lastIndex = 0), (n -= 1);
            return e;
          }
          var ue = /\d/,
            ce = /\d\d/,
            pe = /\d{3}/,
            he = /\d{4}/,
            fe = /[+-]?\d{6}/,
            ye = /\d\d?/,
            Me = /\d\d\d\d?/,
            ge = /\d\d\d\d\d\d?/,
            Le = /\d{1,3}/,
            ke = /\d{1,4}/,
            ve = /[+-]?\d{1,6}/,
            be = /\d+/,
            Ye = /[+-]?\d+/,
            Te = /Z|[+-]\d\d:?\d\d/gi,
            De = /Z|[+-]\d\d(?::?\d\d)?/gi,
            Se = /[+-]?\d+(\.\d{1,3})?/,
            we =
              /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
            Ee = {};
          function xe(e, t, n) {
            Ee[e] = O(t)
              ? t
              : function (e, a) {
                  return e && n ? n : t;
                };
          }
          function Pe(e, t) {
            return c(Ee, e) ? Ee[e](t._strict, t._locale) : new RegExp(He(e));
          }
          function He(e) {
            return Oe(
              e
                .replace("\\", "")
                .replace(
                  /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
                  function (e, t, n, a, s) {
                    return t || n || a || s;
                  },
                ),
            );
          }
          function Oe(e) {
            return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
          }
          var Ce = {};
          function je(e, t) {
            var n,
              a = t;
            for (
              "string" == typeof e && (e = [e]),
                m(t) &&
                  (a = function (e, n) {
                    n[t] = D(e);
                  }),
                n = 0;
              n < e.length;
              n++
            )
              Ce[e[n]] = a;
          }
          function Ie(e, t) {
            je(e, function (e, n, a, s) {
              (a._w = a._w || {}), t(e, a._w, a, s);
            });
          }
          function Ne(e, t, n) {
            null != t && c(Ce, e) && Ce[e](t, n._a, n, e);
          }
          var Ae = 0,
            Re = 1,
            We = 2,
            Fe = 3,
            Be = 4,
            Ue = 5,
            ze = 6,
            Ve = 7,
            Ge = 8;
          function Je(e) {
            return qe(e) ? 366 : 365;
          }
          function qe(e) {
            return (e % 4 == 0 && e % 100 != 0) || e % 400 == 0;
          }
          oe("Y", 0, 0, function () {
            var e = this.year();
            return e <= 9999 ? "" + e : "+" + e;
          }),
            oe(0, ["YY", 2], 0, function () {
              return this.year() % 100;
            }),
            oe(0, ["YYYY", 4], 0, "year"),
            oe(0, ["YYYYY", 5], 0, "year"),
            oe(0, ["YYYYYY", 6, !0], 0, "year"),
            Q("year", "y"),
            ee("year", 1),
            xe("Y", Ye),
            xe("YY", ye, ce),
            xe("YYYY", ke, he),
            xe("YYYYY", ve, fe),
            xe("YYYYYY", ve, fe),
            je(["YYYYY", "YYYYYY"], Ae),
            je("YYYY", function (e, t) {
              t[Ae] = 2 === e.length ? s.parseTwoDigitYear(e) : D(e);
            }),
            je("YY", function (e, t) {
              t[Ae] = s.parseTwoDigitYear(e);
            }),
            je("Y", function (e, t) {
              t[Ae] = parseInt(e, 10);
            }),
            (s.parseTwoDigitYear = function (e) {
              return D(e) + (D(e) > 68 ? 1900 : 2e3);
            });
          var Ke,
            Qe = Ze("FullYear", !0);
          function $e() {
            return qe(this.year());
          }
          function Ze(e, t) {
            return function (n) {
              return null != n
                ? (et(this, e, n), s.updateOffset(this, t), this)
                : Xe(this, e);
            };
          }
          function Xe(e, t) {
            return e.isValid()
              ? e._d["get" + (e._isUTC ? "UTC" : "") + t]()
              : NaN;
          }
          function et(e, t, n) {
            e.isValid() &&
              !isNaN(n) &&
              ("FullYear" === t &&
              qe(e.year()) &&
              1 === e.month() &&
              29 === e.date()
                ? e._d["set" + (e._isUTC ? "UTC" : "") + t](
                    n,
                    e.month(),
                    st(n, e.month()),
                  )
                : e._d["set" + (e._isUTC ? "UTC" : "") + t](n));
          }
          function tt(e) {
            return O(this[(e = $(e))]) ? this[e]() : this;
          }
          function nt(e, t) {
            if ("object" == typeof e)
              for (var n = te((e = Z(e))), a = 0; a < n.length; a++)
                this[n[a].unit](e[n[a].unit]);
            else if (O(this[(e = $(e))])) return this[e](t);
            return this;
          }
          function at(e, t) {
            return ((e % t) + t) % t;
          }
          function st(e, t) {
            if (isNaN(e) || isNaN(t)) return NaN;
            var n = at(t, 12);
            return (
              (e += (t - n) / 12),
              1 === n ? (qe(e) ? 29 : 28) : 31 - ((n % 7) % 2)
            );
          }
          (Ke = Array.prototype.indexOf
            ? Array.prototype.indexOf
            : function (e) {
                var t;
                for (t = 0; t < this.length; ++t) if (this[t] === e) return t;
                return -1;
              }),
            oe("M", ["MM", 2], "Mo", function () {
              return this.month() + 1;
            }),
            oe("MMM", 0, 0, function (e) {
              return this.localeData().monthsShort(this, e);
            }),
            oe("MMMM", 0, 0, function (e) {
              return this.localeData().months(this, e);
            }),
            Q("month", "M"),
            ee("month", 8),
            xe("M", ye),
            xe("MM", ye, ce),
            xe("MMM", function (e, t) {
              return t.monthsShortRegex(e);
            }),
            xe("MMMM", function (e, t) {
              return t.monthsRegex(e);
            }),
            je(["M", "MM"], function (e, t) {
              t[Re] = D(e) - 1;
            }),
            je(["MMM", "MMMM"], function (e, t, n, a) {
              var s = n._locale.monthsParse(e, a, n._strict);
              null != s ? (t[Re] = s) : (y(n).invalidMonth = e);
            });
          var it = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
            rt =
              "January_February_March_April_May_June_July_August_September_October_November_December".split(
                "_",
              );
          function ot(e, t) {
            return e
              ? r(this._months)
                ? this._months[e.month()]
                : this._months[
                    (this._months.isFormat || it).test(t)
                      ? "format"
                      : "standalone"
                  ][e.month()]
              : r(this._months)
                ? this._months
                : this._months.standalone;
          }
          var lt = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
          function dt(e, t) {
            return e
              ? r(this._monthsShort)
                ? this._monthsShort[e.month()]
                : this._monthsShort[it.test(t) ? "format" : "standalone"][
                    e.month()
                  ]
              : r(this._monthsShort)
                ? this._monthsShort
                : this._monthsShort.standalone;
          }
          function mt(e, t, n) {
            var a,
              s,
              i,
              r = e.toLocaleLowerCase();
            if (!this._monthsParse)
              for (
                this._monthsParse = [],
                  this._longMonthsParse = [],
                  this._shortMonthsParse = [],
                  a = 0;
                a < 12;
                ++a
              )
                (i = h([2e3, a])),
                  (this._shortMonthsParse[a] = this.monthsShort(
                    i,
                    "",
                  ).toLocaleLowerCase()),
                  (this._longMonthsParse[a] = this.months(
                    i,
                    "",
                  ).toLocaleLowerCase());
            return n
              ? "MMM" === t
                ? -1 !== (s = Ke.call(this._shortMonthsParse, r))
                  ? s
                  : null
                : -1 !== (s = Ke.call(this._longMonthsParse, r))
                  ? s
                  : null
              : "MMM" === t
                ? -1 !== (s = Ke.call(this._shortMonthsParse, r)) ||
                  -1 !== (s = Ke.call(this._longMonthsParse, r))
                  ? s
                  : null
                : -1 !== (s = Ke.call(this._longMonthsParse, r)) ||
                    -1 !== (s = Ke.call(this._shortMonthsParse, r))
                  ? s
                  : null;
          }
          function _t(e, t, n) {
            var a, s, i;
            if (this._monthsParseExact) return mt.call(this, e, t, n);
            for (
              this._monthsParse ||
                ((this._monthsParse = []),
                (this._longMonthsParse = []),
                (this._shortMonthsParse = [])),
                a = 0;
              a < 12;
              a++
            ) {
              if (
                ((s = h([2e3, a])),
                n &&
                  !this._longMonthsParse[a] &&
                  ((this._longMonthsParse[a] = new RegExp(
                    "^" + this.months(s, "").replace(".", "") + "$",
                    "i",
                  )),
                  (this._shortMonthsParse[a] = new RegExp(
                    "^" + this.monthsShort(s, "").replace(".", "") + "$",
                    "i",
                  ))),
                n ||
                  this._monthsParse[a] ||
                  ((i =
                    "^" + this.months(s, "") + "|^" + this.monthsShort(s, "")),
                  (this._monthsParse[a] = new RegExp(i.replace(".", ""), "i"))),
                n && "MMMM" === t && this._longMonthsParse[a].test(e))
              )
                return a;
              if (n && "MMM" === t && this._shortMonthsParse[a].test(e))
                return a;
              if (!n && this._monthsParse[a].test(e)) return a;
            }
          }
          function ut(e, t) {
            var n;
            if (!e.isValid()) return e;
            if ("string" == typeof t)
              if (/^\d+$/.test(t)) t = D(t);
              else if (!m((t = e.localeData().monthsParse(t)))) return e;
            return (
              (n = Math.min(e.date(), st(e.year(), t))),
              e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n),
              e
            );
          }
          function ct(e) {
            return null != e
              ? (ut(this, e), s.updateOffset(this, !0), this)
              : Xe(this, "Month");
          }
          function pt() {
            return st(this.year(), this.month());
          }
          var ht = we;
          function ft(e) {
            return this._monthsParseExact
              ? (c(this, "_monthsRegex") || gt.call(this),
                e ? this._monthsShortStrictRegex : this._monthsShortRegex)
              : (c(this, "_monthsShortRegex") || (this._monthsShortRegex = ht),
                this._monthsShortStrictRegex && e
                  ? this._monthsShortStrictRegex
                  : this._monthsShortRegex);
          }
          var yt = we;
          function Mt(e) {
            return this._monthsParseExact
              ? (c(this, "_monthsRegex") || gt.call(this),
                e ? this._monthsStrictRegex : this._monthsRegex)
              : (c(this, "_monthsRegex") || (this._monthsRegex = yt),
                this._monthsStrictRegex && e
                  ? this._monthsStrictRegex
                  : this._monthsRegex);
          }
          function gt() {
            function e(e, t) {
              return t.length - e.length;
            }
            var t,
              n,
              a = [],
              s = [],
              i = [];
            for (t = 0; t < 12; t++)
              (n = h([2e3, t])),
                a.push(this.monthsShort(n, "")),
                s.push(this.months(n, "")),
                i.push(this.months(n, "")),
                i.push(this.monthsShort(n, ""));
            for (a.sort(e), s.sort(e), i.sort(e), t = 0; t < 12; t++)
              (a[t] = Oe(a[t])), (s[t] = Oe(s[t]));
            for (t = 0; t < 24; t++) i[t] = Oe(i[t]);
            (this._monthsRegex = new RegExp("^(" + i.join("|") + ")", "i")),
              (this._monthsShortRegex = this._monthsRegex),
              (this._monthsStrictRegex = new RegExp(
                "^(" + s.join("|") + ")",
                "i",
              )),
              (this._monthsShortStrictRegex = new RegExp(
                "^(" + a.join("|") + ")",
                "i",
              ));
          }
          function Lt(e, t, n, a, s, i, r) {
            var o;
            return (
              e < 100 && e >= 0
                ? ((o = new Date(e + 400, t, n, a, s, i, r)),
                  isFinite(o.getFullYear()) && o.setFullYear(e))
                : (o = new Date(e, t, n, a, s, i, r)),
              o
            );
          }
          function kt(e) {
            var t;
            if (e < 100 && e >= 0) {
              var n = Array.prototype.slice.call(arguments);
              (n[0] = e + 400),
                (t = new Date(Date.UTC.apply(null, n))),
                isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e);
            } else t = new Date(Date.UTC.apply(null, arguments));
            return t;
          }
          function vt(e, t, n) {
            var a = 7 + t - n;
            return (-(7 + kt(e, 0, a).getUTCDay() - t) % 7) + a - 1;
          }
          function bt(e, t, n, a, s) {
            var i,
              r,
              o = 1 + 7 * (t - 1) + ((7 + n - a) % 7) + vt(e, a, s);
            return (
              o <= 0
                ? (r = Je((i = e - 1)) + o)
                : o > Je(e)
                  ? ((i = e + 1), (r = o - Je(e)))
                  : ((i = e), (r = o)),
              { year: i, dayOfYear: r }
            );
          }
          function Yt(e, t, n) {
            var a,
              s,
              i = vt(e.year(), t, n),
              r = Math.floor((e.dayOfYear() - i - 1) / 7) + 1;
            return (
              r < 1
                ? (a = r + Tt((s = e.year() - 1), t, n))
                : r > Tt(e.year(), t, n)
                  ? ((a = r - Tt(e.year(), t, n)), (s = e.year() + 1))
                  : ((s = e.year()), (a = r)),
              { week: a, year: s }
            );
          }
          function Tt(e, t, n) {
            var a = vt(e, t, n),
              s = vt(e + 1, t, n);
            return (Je(e) - a + s) / 7;
          }
          function Dt(e) {
            return Yt(e, this._week.dow, this._week.doy).week;
          }
          oe("w", ["ww", 2], "wo", "week"),
            oe("W", ["WW", 2], "Wo", "isoWeek"),
            Q("week", "w"),
            Q("isoWeek", "W"),
            ee("week", 5),
            ee("isoWeek", 5),
            xe("w", ye),
            xe("ww", ye, ce),
            xe("W", ye),
            xe("WW", ye, ce),
            Ie(["w", "ww", "W", "WW"], function (e, t, n, a) {
              t[a.substr(0, 1)] = D(e);
            });
          var St = { dow: 0, doy: 6 };
          function wt() {
            return this._week.dow;
          }
          function Et() {
            return this._week.doy;
          }
          function xt(e) {
            var t = this.localeData().week(this);
            return null == e ? t : this.add(7 * (e - t), "d");
          }
          function Pt(e) {
            var t = Yt(this, 1, 4).week;
            return null == e ? t : this.add(7 * (e - t), "d");
          }
          function Ht(e, t) {
            return "string" != typeof e
              ? e
              : isNaN(e)
                ? "number" == typeof (e = t.weekdaysParse(e))
                  ? e
                  : null
                : parseInt(e, 10);
          }
          function Ot(e, t) {
            return "string" == typeof e
              ? t.weekdaysParse(e) % 7 || 7
              : isNaN(e)
                ? null
                : e;
          }
          function Ct(e, t) {
            return e.slice(t, 7).concat(e.slice(0, t));
          }
          oe("d", 0, "do", "day"),
            oe("dd", 0, 0, function (e) {
              return this.localeData().weekdaysMin(this, e);
            }),
            oe("ddd", 0, 0, function (e) {
              return this.localeData().weekdaysShort(this, e);
            }),
            oe("dddd", 0, 0, function (e) {
              return this.localeData().weekdays(this, e);
            }),
            oe("e", 0, 0, "weekday"),
            oe("E", 0, 0, "isoWeekday"),
            Q("day", "d"),
            Q("weekday", "e"),
            Q("isoWeekday", "E"),
            ee("day", 11),
            ee("weekday", 11),
            ee("isoWeekday", 11),
            xe("d", ye),
            xe("e", ye),
            xe("E", ye),
            xe("dd", function (e, t) {
              return t.weekdaysMinRegex(e);
            }),
            xe("ddd", function (e, t) {
              return t.weekdaysShortRegex(e);
            }),
            xe("dddd", function (e, t) {
              return t.weekdaysRegex(e);
            }),
            Ie(["dd", "ddd", "dddd"], function (e, t, n, a) {
              var s = n._locale.weekdaysParse(e, a, n._strict);
              null != s ? (t.d = s) : (y(n).invalidWeekday = e);
            }),
            Ie(["d", "e", "E"], function (e, t, n, a) {
              t[a] = D(e);
            });
          var jt =
            "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
              "_",
            );
          function It(e, t) {
            var n = r(this._weekdays)
              ? this._weekdays
              : this._weekdays[
                  e && !0 !== e && this._weekdays.isFormat.test(t)
                    ? "format"
                    : "standalone"
                ];
            return !0 === e ? Ct(n, this._week.dow) : e ? n[e.day()] : n;
          }
          var Nt = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
          function At(e) {
            return !0 === e
              ? Ct(this._weekdaysShort, this._week.dow)
              : e
                ? this._weekdaysShort[e.day()]
                : this._weekdaysShort;
          }
          var Rt = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
          function Wt(e) {
            return !0 === e
              ? Ct(this._weekdaysMin, this._week.dow)
              : e
                ? this._weekdaysMin[e.day()]
                : this._weekdaysMin;
          }
          function Ft(e, t, n) {
            var a,
              s,
              i,
              r = e.toLocaleLowerCase();
            if (!this._weekdaysParse)
              for (
                this._weekdaysParse = [],
                  this._shortWeekdaysParse = [],
                  this._minWeekdaysParse = [],
                  a = 0;
                a < 7;
                ++a
              )
                (i = h([2e3, 1]).day(a)),
                  (this._minWeekdaysParse[a] = this.weekdaysMin(
                    i,
                    "",
                  ).toLocaleLowerCase()),
                  (this._shortWeekdaysParse[a] = this.weekdaysShort(
                    i,
                    "",
                  ).toLocaleLowerCase()),
                  (this._weekdaysParse[a] = this.weekdays(
                    i,
                    "",
                  ).toLocaleLowerCase());
            return n
              ? "dddd" === t
                ? -1 !== (s = Ke.call(this._weekdaysParse, r))
                  ? s
                  : null
                : "ddd" === t
                  ? -1 !== (s = Ke.call(this._shortWeekdaysParse, r))
                    ? s
                    : null
                  : -1 !== (s = Ke.call(this._minWeekdaysParse, r))
                    ? s
                    : null
              : "dddd" === t
                ? -1 !== (s = Ke.call(this._weekdaysParse, r)) ||
                  -1 !== (s = Ke.call(this._shortWeekdaysParse, r)) ||
                  -1 !== (s = Ke.call(this._minWeekdaysParse, r))
                  ? s
                  : null
                : "ddd" === t
                  ? -1 !== (s = Ke.call(this._shortWeekdaysParse, r)) ||
                    -1 !== (s = Ke.call(this._weekdaysParse, r)) ||
                    -1 !== (s = Ke.call(this._minWeekdaysParse, r))
                    ? s
                    : null
                  : -1 !== (s = Ke.call(this._minWeekdaysParse, r)) ||
                      -1 !== (s = Ke.call(this._weekdaysParse, r)) ||
                      -1 !== (s = Ke.call(this._shortWeekdaysParse, r))
                    ? s
                    : null;
          }
          function Bt(e, t, n) {
            var a, s, i;
            if (this._weekdaysParseExact) return Ft.call(this, e, t, n);
            for (
              this._weekdaysParse ||
                ((this._weekdaysParse = []),
                (this._minWeekdaysParse = []),
                (this._shortWeekdaysParse = []),
                (this._fullWeekdaysParse = [])),
                a = 0;
              a < 7;
              a++
            ) {
              if (
                ((s = h([2e3, 1]).day(a)),
                n &&
                  !this._fullWeekdaysParse[a] &&
                  ((this._fullWeekdaysParse[a] = new RegExp(
                    "^" + this.weekdays(s, "").replace(".", "\\.?") + "$",
                    "i",
                  )),
                  (this._shortWeekdaysParse[a] = new RegExp(
                    "^" + this.weekdaysShort(s, "").replace(".", "\\.?") + "$",
                    "i",
                  )),
                  (this._minWeekdaysParse[a] = new RegExp(
                    "^" + this.weekdaysMin(s, "").replace(".", "\\.?") + "$",
                    "i",
                  ))),
                this._weekdaysParse[a] ||
                  ((i =
                    "^" +
                    this.weekdays(s, "") +
                    "|^" +
                    this.weekdaysShort(s, "") +
                    "|^" +
                    this.weekdaysMin(s, "")),
                  (this._weekdaysParse[a] = new RegExp(
                    i.replace(".", ""),
                    "i",
                  ))),
                n && "dddd" === t && this._fullWeekdaysParse[a].test(e))
              )
                return a;
              if (n && "ddd" === t && this._shortWeekdaysParse[a].test(e))
                return a;
              if (n && "dd" === t && this._minWeekdaysParse[a].test(e))
                return a;
              if (!n && this._weekdaysParse[a].test(e)) return a;
            }
          }
          function Ut(e) {
            if (!this.isValid()) return null != e ? this : NaN;
            var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != e
              ? ((e = Ht(e, this.localeData())), this.add(e - t, "d"))
              : t;
          }
          function zt(e) {
            if (!this.isValid()) return null != e ? this : NaN;
            var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return null == e ? t : this.add(e - t, "d");
          }
          function Vt(e) {
            if (!this.isValid()) return null != e ? this : NaN;
            if (null != e) {
              var t = Ot(e, this.localeData());
              return this.day(this.day() % 7 ? t : t - 7);
            }
            return this.day() || 7;
          }
          var Gt = we;
          function Jt(e) {
            return this._weekdaysParseExact
              ? (c(this, "_weekdaysRegex") || Zt.call(this),
                e ? this._weekdaysStrictRegex : this._weekdaysRegex)
              : (c(this, "_weekdaysRegex") || (this._weekdaysRegex = Gt),
                this._weekdaysStrictRegex && e
                  ? this._weekdaysStrictRegex
                  : this._weekdaysRegex);
          }
          var qt = we;
          function Kt(e) {
            return this._weekdaysParseExact
              ? (c(this, "_weekdaysRegex") || Zt.call(this),
                e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
              : (c(this, "_weekdaysShortRegex") ||
                  (this._weekdaysShortRegex = qt),
                this._weekdaysShortStrictRegex && e
                  ? this._weekdaysShortStrictRegex
                  : this._weekdaysShortRegex);
          }
          var Qt = we;
          function $t(e) {
            return this._weekdaysParseExact
              ? (c(this, "_weekdaysRegex") || Zt.call(this),
                e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
              : (c(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Qt),
                this._weekdaysMinStrictRegex && e
                  ? this._weekdaysMinStrictRegex
                  : this._weekdaysMinRegex);
          }
          function Zt() {
            function e(e, t) {
              return t.length - e.length;
            }
            var t,
              n,
              a,
              s,
              i,
              r = [],
              o = [],
              l = [],
              d = [];
            for (t = 0; t < 7; t++)
              (n = h([2e3, 1]).day(t)),
                (a = this.weekdaysMin(n, "")),
                (s = this.weekdaysShort(n, "")),
                (i = this.weekdays(n, "")),
                r.push(a),
                o.push(s),
                l.push(i),
                d.push(a),
                d.push(s),
                d.push(i);
            for (r.sort(e), o.sort(e), l.sort(e), d.sort(e), t = 0; t < 7; t++)
              (o[t] = Oe(o[t])), (l[t] = Oe(l[t])), (d[t] = Oe(d[t]));
            (this._weekdaysRegex = new RegExp("^(" + d.join("|") + ")", "i")),
              (this._weekdaysShortRegex = this._weekdaysRegex),
              (this._weekdaysMinRegex = this._weekdaysRegex),
              (this._weekdaysStrictRegex = new RegExp(
                "^(" + l.join("|") + ")",
                "i",
              )),
              (this._weekdaysShortStrictRegex = new RegExp(
                "^(" + o.join("|") + ")",
                "i",
              )),
              (this._weekdaysMinStrictRegex = new RegExp(
                "^(" + r.join("|") + ")",
                "i",
              ));
          }
          function Xt() {
            return this.hours() % 12 || 12;
          }
          function en() {
            return this.hours() || 24;
          }
          function tn(e, t) {
            oe(e, 0, 0, function () {
              return this.localeData().meridiem(
                this.hours(),
                this.minutes(),
                t,
              );
            });
          }
          function nn(e, t) {
            return t._meridiemParse;
          }
          function an(e) {
            return "p" === (e + "").toLowerCase().charAt(0);
          }
          oe("H", ["HH", 2], 0, "hour"),
            oe("h", ["hh", 2], 0, Xt),
            oe("k", ["kk", 2], 0, en),
            oe("hmm", 0, 0, function () {
              return "" + Xt.apply(this) + ne(this.minutes(), 2);
            }),
            oe("hmmss", 0, 0, function () {
              return (
                "" +
                Xt.apply(this) +
                ne(this.minutes(), 2) +
                ne(this.seconds(), 2)
              );
            }),
            oe("Hmm", 0, 0, function () {
              return "" + this.hours() + ne(this.minutes(), 2);
            }),
            oe("Hmmss", 0, 0, function () {
              return (
                "" +
                this.hours() +
                ne(this.minutes(), 2) +
                ne(this.seconds(), 2)
              );
            }),
            tn("a", !0),
            tn("A", !1),
            Q("hour", "h"),
            ee("hour", 13),
            xe("a", nn),
            xe("A", nn),
            xe("H", ye),
            xe("h", ye),
            xe("k", ye),
            xe("HH", ye, ce),
            xe("hh", ye, ce),
            xe("kk", ye, ce),
            xe("hmm", Me),
            xe("hmmss", ge),
            xe("Hmm", Me),
            xe("Hmmss", ge),
            je(["H", "HH"], Fe),
            je(["k", "kk"], function (e, t, n) {
              var a = D(e);
              t[Fe] = 24 === a ? 0 : a;
            }),
            je(["a", "A"], function (e, t, n) {
              (n._isPm = n._locale.isPM(e)), (n._meridiem = e);
            }),
            je(["h", "hh"], function (e, t, n) {
              (t[Fe] = D(e)), (y(n).bigHour = !0);
            }),
            je("hmm", function (e, t, n) {
              var a = e.length - 2;
              (t[Fe] = D(e.substr(0, a))),
                (t[Be] = D(e.substr(a))),
                (y(n).bigHour = !0);
            }),
            je("hmmss", function (e, t, n) {
              var a = e.length - 4,
                s = e.length - 2;
              (t[Fe] = D(e.substr(0, a))),
                (t[Be] = D(e.substr(a, 2))),
                (t[Ue] = D(e.substr(s))),
                (y(n).bigHour = !0);
            }),
            je("Hmm", function (e, t, n) {
              var a = e.length - 2;
              (t[Fe] = D(e.substr(0, a))), (t[Be] = D(e.substr(a)));
            }),
            je("Hmmss", function (e, t, n) {
              var a = e.length - 4,
                s = e.length - 2;
              (t[Fe] = D(e.substr(0, a))),
                (t[Be] = D(e.substr(a, 2))),
                (t[Ue] = D(e.substr(s)));
            });
          var sn = /[ap]\.?m?\.?/i;
          function rn(e, t, n) {
            return e > 11 ? (n ? "pm" : "PM") : n ? "am" : "AM";
          }
          var on,
            ln = Ze("Hours", !0),
            dn = {
              calendar: N,
              longDateFormat: R,
              invalidDate: F,
              ordinal: U,
              dayOfMonthOrdinalParse: z,
              relativeTime: G,
              months: rt,
              monthsShort: lt,
              week: St,
              weekdays: jt,
              weekdaysMin: Rt,
              weekdaysShort: Nt,
              meridiemParse: sn,
            },
            mn = {},
            _n = {};
          function un(e) {
            return e ? e.toLowerCase().replace("_", "-") : e;
          }
          function cn(e) {
            for (var t, n, a, s, i = 0; i < e.length; ) {
              for (
                t = (s = un(e[i]).split("-")).length,
                  n = (n = un(e[i + 1])) ? n.split("-") : null;
                t > 0;

              ) {
                if ((a = pn(s.slice(0, t).join("-")))) return a;
                if (n && n.length >= t && S(s, n, !0) >= t - 1) break;
                t--;
              }
              i++;
            }
            return on;
          }
          function pn(t) {
            var a = null;
            if (!mn[t] && e && e.exports)
              try {
                (a = on._abbr), n(85)("./" + t), hn(a);
              } catch (e) {}
            return mn[t];
          }
          function hn(e, t) {
            var n;
            return (
              e &&
                ((n = d(t) ? Mn(e) : fn(e, t))
                  ? (on = n)
                  : "undefined" != typeof console &&
                    console.warn &&
                    console.warn(
                      "Locale " + e + " not found. Did you forget to load it?",
                    )),
              on._abbr
            );
          }
          function fn(e, t) {
            if (null !== t) {
              var n,
                a = dn;
              if (((t.abbr = e), null != mn[e]))
                H(
                  "defineLocaleOverride",
                  "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.",
                ),
                  (a = mn[e]._config);
              else if (null != t.parentLocale)
                if (null != mn[t.parentLocale]) a = mn[t.parentLocale]._config;
                else {
                  if (null == (n = pn(t.parentLocale)))
                    return (
                      _n[t.parentLocale] || (_n[t.parentLocale] = []),
                      _n[t.parentLocale].push({ name: e, config: t }),
                      null
                    );
                  a = n._config;
                }
              return (
                (mn[e] = new I(j(a, t))),
                _n[e] &&
                  _n[e].forEach(function (e) {
                    fn(e.name, e.config);
                  }),
                hn(e),
                mn[e]
              );
            }
            return delete mn[e], null;
          }
          function yn(e, t) {
            if (null != t) {
              var n,
                a,
                s = dn;
              null != (a = pn(e)) && (s = a._config),
                ((n = new I((t = j(s, t)))).parentLocale = mn[e]),
                (mn[e] = n),
                hn(e);
            } else
              null != mn[e] &&
                (null != mn[e].parentLocale
                  ? (mn[e] = mn[e].parentLocale)
                  : null != mn[e] && delete mn[e]);
            return mn[e];
          }
          function Mn(e) {
            var t;
            if (
              (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
            )
              return on;
            if (!r(e)) {
              if ((t = pn(e))) return t;
              e = [e];
            }
            return cn(e);
          }
          function gn() {
            return x(mn);
          }
          function Ln(e) {
            var t,
              n = e._a;
            return (
              n &&
                -2 === y(e).overflow &&
                ((t =
                  n[Re] < 0 || n[Re] > 11
                    ? Re
                    : n[We] < 1 || n[We] > st(n[Ae], n[Re])
                      ? We
                      : n[Fe] < 0 ||
                          n[Fe] > 24 ||
                          (24 === n[Fe] &&
                            (0 !== n[Be] || 0 !== n[Ue] || 0 !== n[ze]))
                        ? Fe
                        : n[Be] < 0 || n[Be] > 59
                          ? Be
                          : n[Ue] < 0 || n[Ue] > 59
                            ? Ue
                            : n[ze] < 0 || n[ze] > 999
                              ? ze
                              : -1),
                y(e)._overflowDayOfYear && (t < Ae || t > We) && (t = We),
                y(e)._overflowWeeks && -1 === t && (t = Ve),
                y(e)._overflowWeekday && -1 === t && (t = Ge),
                (y(e).overflow = t)),
              e
            );
          }
          function kn(e, t, n) {
            return null != e ? e : null != t ? t : n;
          }
          function vn(e) {
            var t = new Date(s.now());
            return e._useUTC
              ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()]
              : [t.getFullYear(), t.getMonth(), t.getDate()];
          }
          function bn(e) {
            var t,
              n,
              a,
              s,
              i,
              r = [];
            if (!e._d) {
              for (
                a = vn(e),
                  e._w && null == e._a[We] && null == e._a[Re] && Yn(e),
                  null != e._dayOfYear &&
                    ((i = kn(e._a[Ae], a[Ae])),
                    (e._dayOfYear > Je(i) || 0 === e._dayOfYear) &&
                      (y(e)._overflowDayOfYear = !0),
                    (n = kt(i, 0, e._dayOfYear)),
                    (e._a[Re] = n.getUTCMonth()),
                    (e._a[We] = n.getUTCDate())),
                  t = 0;
                t < 3 && null == e._a[t];
                ++t
              )
                e._a[t] = r[t] = a[t];
              for (; t < 7; t++)
                e._a[t] = r[t] = null == e._a[t] ? (2 === t ? 1 : 0) : e._a[t];
              24 === e._a[Fe] &&
                0 === e._a[Be] &&
                0 === e._a[Ue] &&
                0 === e._a[ze] &&
                ((e._nextDay = !0), (e._a[Fe] = 0)),
                (e._d = (e._useUTC ? kt : Lt).apply(null, r)),
                (s = e._useUTC ? e._d.getUTCDay() : e._d.getDay()),
                null != e._tzm &&
                  e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
                e._nextDay && (e._a[Fe] = 24),
                e._w &&
                  void 0 !== e._w.d &&
                  e._w.d !== s &&
                  (y(e).weekdayMismatch = !0);
            }
          }
          function Yn(e) {
            var t, n, a, s, i, r, o, l;
            if (null != (t = e._w).GG || null != t.W || null != t.E)
              (i = 1),
                (r = 4),
                (n = kn(t.GG, e._a[Ae], Yt(Kn(), 1, 4).year)),
                (a = kn(t.W, 1)),
                ((s = kn(t.E, 1)) < 1 || s > 7) && (l = !0);
            else {
              (i = e._locale._week.dow), (r = e._locale._week.doy);
              var d = Yt(Kn(), i, r);
              (n = kn(t.gg, e._a[Ae], d.year)),
                (a = kn(t.w, d.week)),
                null != t.d
                  ? ((s = t.d) < 0 || s > 6) && (l = !0)
                  : null != t.e
                    ? ((s = t.e + i), (t.e < 0 || t.e > 6) && (l = !0))
                    : (s = i);
            }
            a < 1 || a > Tt(n, i, r)
              ? (y(e)._overflowWeeks = !0)
              : null != l
                ? (y(e)._overflowWeekday = !0)
                : ((o = bt(n, a, s, i, r)),
                  (e._a[Ae] = o.year),
                  (e._dayOfYear = o.dayOfYear));
          }
          var Tn =
              /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            Dn =
              /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            Sn = /Z|[+-]\d\d(?::?\d\d)?/,
            wn = [
              ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
              ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
              ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
              ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
              ["YYYY-DDD", /\d{4}-\d{3}/],
              ["YYYY-MM", /\d{4}-\d\d/, !1],
              ["YYYYYYMMDD", /[+-]\d{10}/],
              ["YYYYMMDD", /\d{8}/],
              ["GGGG[W]WWE", /\d{4}W\d{3}/],
              ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
              ["YYYYDDD", /\d{7}/],
            ],
            En = [
              ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
              ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
              ["HH:mm:ss", /\d\d:\d\d:\d\d/],
              ["HH:mm", /\d\d:\d\d/],
              ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
              ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
              ["HHmmss", /\d\d\d\d\d\d/],
              ["HHmm", /\d\d\d\d/],
              ["HH", /\d\d/],
            ],
            xn = /^\/?Date\((\-?\d+)/i;
          function Pn(e) {
            var t,
              n,
              a,
              s,
              i,
              r,
              o = e._i,
              l = Tn.exec(o) || Dn.exec(o);
            if (l) {
              for (y(e).iso = !0, t = 0, n = wn.length; t < n; t++)
                if (wn[t][1].exec(l[1])) {
                  (s = wn[t][0]), (a = !1 !== wn[t][2]);
                  break;
                }
              if (null == s) return void (e._isValid = !1);
              if (l[3]) {
                for (t = 0, n = En.length; t < n; t++)
                  if (En[t][1].exec(l[3])) {
                    i = (l[2] || " ") + En[t][0];
                    break;
                  }
                if (null == i) return void (e._isValid = !1);
              }
              if (!a && null != i) return void (e._isValid = !1);
              if (l[4]) {
                if (!Sn.exec(l[4])) return void (e._isValid = !1);
                r = "Z";
              }
              (e._f = s + (i || "") + (r || "")), Fn(e);
            } else e._isValid = !1;
          }
          var Hn =
            /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;
          function On(e, t, n, a, s, i) {
            var r = [
              Cn(e),
              lt.indexOf(t),
              parseInt(n, 10),
              parseInt(a, 10),
              parseInt(s, 10),
            ];
            return i && r.push(parseInt(i, 10)), r;
          }
          function Cn(e) {
            var t = parseInt(e, 10);
            return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
          }
          function jn(e) {
            return e
              .replace(/\([^)]*\)|[\n\t]/g, " ")
              .replace(/(\s\s+)/g, " ")
              .replace(/^\s\s*/, "")
              .replace(/\s\s*$/, "");
          }
          function In(e, t, n) {
            return (
              !e ||
              Nt.indexOf(e) === new Date(t[0], t[1], t[2]).getDay() ||
              ((y(n).weekdayMismatch = !0), (n._isValid = !1), !1)
            );
          }
          var Nn = {
            UT: 0,
            GMT: 0,
            EDT: -240,
            EST: -300,
            CDT: -300,
            CST: -360,
            MDT: -360,
            MST: -420,
            PDT: -420,
            PST: -480,
          };
          function An(e, t, n) {
            if (e) return Nn[e];
            if (t) return 0;
            var a = parseInt(n, 10),
              s = a % 100;
            return ((a - s) / 100) * 60 + s;
          }
          function Rn(e) {
            var t = Hn.exec(jn(e._i));
            if (t) {
              var n = On(t[4], t[3], t[2], t[5], t[6], t[7]);
              if (!In(t[1], n, e)) return;
              (e._a = n),
                (e._tzm = An(t[8], t[9], t[10])),
                (e._d = kt.apply(null, e._a)),
                e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
                (y(e).rfc2822 = !0);
            } else e._isValid = !1;
          }
          function Wn(e) {
            var t = xn.exec(e._i);
            null === t
              ? (Pn(e),
                !1 === e._isValid &&
                  (delete e._isValid,
                  Rn(e),
                  !1 === e._isValid &&
                    (delete e._isValid, s.createFromInputFallback(e))))
              : (e._d = new Date(+t[1]));
          }
          function Fn(e) {
            if (e._f !== s.ISO_8601)
              if (e._f !== s.RFC_2822) {
                (e._a = []), (y(e).empty = !0);
                var t,
                  n,
                  a,
                  i,
                  r,
                  o = "" + e._i,
                  l = o.length,
                  d = 0;
                for (
                  a = _e(e._f, e._locale).match(ae) || [], t = 0;
                  t < a.length;
                  t++
                )
                  (i = a[t]),
                    (n = (o.match(Pe(i, e)) || [])[0]) &&
                      ((r = o.substr(0, o.indexOf(n))).length > 0 &&
                        y(e).unusedInput.push(r),
                      (o = o.slice(o.indexOf(n) + n.length)),
                      (d += n.length)),
                    re[i]
                      ? (n ? (y(e).empty = !1) : y(e).unusedTokens.push(i),
                        Ne(i, n, e))
                      : e._strict && !n && y(e).unusedTokens.push(i);
                (y(e).charsLeftOver = l - d),
                  o.length > 0 && y(e).unusedInput.push(o),
                  e._a[Fe] <= 12 &&
                    !0 === y(e).bigHour &&
                    e._a[Fe] > 0 &&
                    (y(e).bigHour = void 0),
                  (y(e).parsedDateParts = e._a.slice(0)),
                  (y(e).meridiem = e._meridiem),
                  (e._a[Fe] = Bn(e._locale, e._a[Fe], e._meridiem)),
                  bn(e),
                  Ln(e);
              } else Rn(e);
            else Pn(e);
          }
          function Bn(e, t, n) {
            var a;
            return null == n
              ? t
              : null != e.meridiemHour
                ? e.meridiemHour(t, n)
                : null != e.isPM
                  ? ((a = e.isPM(n)) && t < 12 && (t += 12),
                    a || 12 !== t || (t = 0),
                    t)
                  : t;
          }
          function Un(e) {
            var t, n, a, s, i;
            if (0 === e._f.length)
              return (y(e).invalidFormat = !0), void (e._d = new Date(NaN));
            for (s = 0; s < e._f.length; s++)
              (i = 0),
                (t = k({}, e)),
                null != e._useUTC && (t._useUTC = e._useUTC),
                (t._f = e._f[s]),
                Fn(t),
                M(t) &&
                  ((i += y(t).charsLeftOver),
                  (i += 10 * y(t).unusedTokens.length),
                  (y(t).score = i),
                  (null == a || i < a) && ((a = i), (n = t)));
            p(e, n || t);
          }
          function zn(e) {
            if (!e._d) {
              var t = Z(e._i);
              (e._a = u(
                [
                  t.year,
                  t.month,
                  t.day || t.date,
                  t.hour,
                  t.minute,
                  t.second,
                  t.millisecond,
                ],
                function (e) {
                  return e && parseInt(e, 10);
                },
              )),
                bn(e);
            }
          }
          function Vn(e) {
            var t = new b(Ln(Gn(e)));
            return t._nextDay && (t.add(1, "d"), (t._nextDay = void 0)), t;
          }
          function Gn(e) {
            var t = e._i,
              n = e._f;
            return (
              (e._locale = e._locale || Mn(e._l)),
              null === t || (void 0 === n && "" === t)
                ? g({ nullInput: !0 })
                : ("string" == typeof t && (e._i = t = e._locale.preparse(t)),
                  Y(t)
                    ? new b(Ln(t))
                    : (_(t) ? (e._d = t) : r(n) ? Un(e) : n ? Fn(e) : Jn(e),
                      M(e) || (e._d = null),
                      e))
            );
          }
          function Jn(e) {
            var t = e._i;
            d(t)
              ? (e._d = new Date(s.now()))
              : _(t)
                ? (e._d = new Date(t.valueOf()))
                : "string" == typeof t
                  ? Wn(e)
                  : r(t)
                    ? ((e._a = u(t.slice(0), function (e) {
                        return parseInt(e, 10);
                      })),
                      bn(e))
                    : o(t)
                      ? zn(e)
                      : m(t)
                        ? (e._d = new Date(t))
                        : s.createFromInputFallback(e);
          }
          function qn(e, t, n, a, s) {
            var i = {};
            return (
              (!0 !== n && !1 !== n) || ((a = n), (n = void 0)),
              ((o(e) && l(e)) || (r(e) && 0 === e.length)) && (e = void 0),
              (i._isAMomentObject = !0),
              (i._useUTC = i._isUTC = s),
              (i._l = n),
              (i._i = e),
              (i._f = t),
              (i._strict = a),
              Vn(i)
            );
          }
          function Kn(e, t, n, a) {
            return qn(e, t, n, a, !1);
          }
          (s.createFromInputFallback = E(
            "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
            function (e) {
              e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
            },
          )),
            (s.ISO_8601 = function () {}),
            (s.RFC_2822 = function () {});
          var Qn = E(
              "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
              function () {
                var e = Kn.apply(null, arguments);
                return this.isValid() && e.isValid()
                  ? e < this
                    ? this
                    : e
                  : g();
              },
            ),
            $n = E(
              "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
              function () {
                var e = Kn.apply(null, arguments);
                return this.isValid() && e.isValid()
                  ? e > this
                    ? this
                    : e
                  : g();
              },
            );
          function Zn(e, t) {
            var n, a;
            if ((1 === t.length && r(t[0]) && (t = t[0]), !t.length))
              return Kn();
            for (n = t[0], a = 1; a < t.length; ++a)
              (t[a].isValid() && !t[a][e](n)) || (n = t[a]);
            return n;
          }
          function Xn() {
            return Zn("isBefore", [].slice.call(arguments, 0));
          }
          function ea() {
            return Zn("isAfter", [].slice.call(arguments, 0));
          }
          var ta = function () {
              return Date.now ? Date.now() : +new Date();
            },
            na = [
              "year",
              "quarter",
              "month",
              "week",
              "day",
              "hour",
              "minute",
              "second",
              "millisecond",
            ];
          function aa(e) {
            for (var t in e)
              if (-1 === Ke.call(na, t) || (null != e[t] && isNaN(e[t])))
                return !1;
            for (var n = !1, a = 0; a < na.length; ++a)
              if (e[na[a]]) {
                if (n) return !1;
                parseFloat(e[na[a]]) !== D(e[na[a]]) && (n = !0);
              }
            return !0;
          }
          function sa() {
            return this._isValid;
          }
          function ia() {
            return Sa(NaN);
          }
          function ra(e) {
            var t = Z(e),
              n = t.year || 0,
              a = t.quarter || 0,
              s = t.month || 0,
              i = t.week || t.isoWeek || 0,
              r = t.day || 0,
              o = t.hour || 0,
              l = t.minute || 0,
              d = t.second || 0,
              m = t.millisecond || 0;
            (this._isValid = aa(t)),
              (this._milliseconds = +m + 1e3 * d + 6e4 * l + 1e3 * o * 60 * 60),
              (this._days = +r + 7 * i),
              (this._months = +s + 3 * a + 12 * n),
              (this._data = {}),
              (this._locale = Mn()),
              this._bubble();
          }
          function oa(e) {
            return e instanceof ra;
          }
          function la(e) {
            return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e);
          }
          function da(e, t) {
            oe(e, 0, 0, function () {
              var e = this.utcOffset(),
                n = "+";
              return (
                e < 0 && ((e = -e), (n = "-")),
                n + ne(~~(e / 60), 2) + t + ne(~~e % 60, 2)
              );
            });
          }
          da("Z", ":"),
            da("ZZ", ""),
            xe("Z", De),
            xe("ZZ", De),
            je(["Z", "ZZ"], function (e, t, n) {
              (n._useUTC = !0), (n._tzm = _a(De, e));
            });
          var ma = /([\+\-]|\d\d)/gi;
          function _a(e, t) {
            var n = (t || "").match(e);
            if (null === n) return null;
            var a = ((n[n.length - 1] || []) + "").match(ma) || ["-", 0, 0],
              s = 60 * a[1] + D(a[2]);
            return 0 === s ? 0 : "+" === a[0] ? s : -s;
          }
          function ua(e, t) {
            var n, a;
            return t._isUTC
              ? ((n = t.clone()),
                (a =
                  (Y(e) || _(e) ? e.valueOf() : Kn(e).valueOf()) - n.valueOf()),
                n._d.setTime(n._d.valueOf() + a),
                s.updateOffset(n, !1),
                n)
              : Kn(e).local();
          }
          function ca(e) {
            return 15 * -Math.round(e._d.getTimezoneOffset() / 15);
          }
          function pa(e, t, n) {
            var a,
              i = this._offset || 0;
            if (!this.isValid()) return null != e ? this : NaN;
            if (null != e) {
              if ("string" == typeof e) {
                if (null === (e = _a(De, e))) return this;
              } else Math.abs(e) < 16 && !n && (e *= 60);
              return (
                !this._isUTC && t && (a = ca(this)),
                (this._offset = e),
                (this._isUTC = !0),
                null != a && this.add(a, "m"),
                i !== e &&
                  (!t || this._changeInProgress
                    ? Ha(this, Sa(e - i, "m"), 1, !1)
                    : this._changeInProgress ||
                      ((this._changeInProgress = !0),
                      s.updateOffset(this, !0),
                      (this._changeInProgress = null))),
                this
              );
            }
            return this._isUTC ? i : ca(this);
          }
          function ha(e, t) {
            return null != e
              ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this)
              : -this.utcOffset();
          }
          function fa(e) {
            return this.utcOffset(0, e);
          }
          function ya(e) {
            return (
              this._isUTC &&
                (this.utcOffset(0, e),
                (this._isUTC = !1),
                e && this.subtract(ca(this), "m")),
              this
            );
          }
          function Ma() {
            if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);
            else if ("string" == typeof this._i) {
              var e = _a(Te, this._i);
              null != e ? this.utcOffset(e) : this.utcOffset(0, !0);
            }
            return this;
          }
          function ga(e) {
            return (
              !!this.isValid() &&
              ((e = e ? Kn(e).utcOffset() : 0),
              (this.utcOffset() - e) % 60 == 0)
            );
          }
          function La() {
            return (
              this.utcOffset() > this.clone().month(0).utcOffset() ||
              this.utcOffset() > this.clone().month(5).utcOffset()
            );
          }
          function ka() {
            if (!d(this._isDSTShifted)) return this._isDSTShifted;
            var e = {};
            if ((k(e, this), (e = Gn(e))._a)) {
              var t = e._isUTC ? h(e._a) : Kn(e._a);
              this._isDSTShifted = this.isValid() && S(e._a, t.toArray()) > 0;
            } else this._isDSTShifted = !1;
            return this._isDSTShifted;
          }
          function va() {
            return !!this.isValid() && !this._isUTC;
          }
          function ba() {
            return !!this.isValid() && this._isUTC;
          }
          function Ya() {
            return !!this.isValid() && this._isUTC && 0 === this._offset;
          }
          s.updateOffset = function () {};
          var Ta = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
            Da =
              /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
          function Sa(e, t) {
            var n,
              a,
              s,
              i = e,
              r = null;
            return (
              oa(e)
                ? (i = { ms: e._milliseconds, d: e._days, M: e._months })
                : m(e)
                  ? ((i = {}), t ? (i[t] = e) : (i.milliseconds = e))
                  : (r = Ta.exec(e))
                    ? ((n = "-" === r[1] ? -1 : 1),
                      (i = {
                        y: 0,
                        d: D(r[We]) * n,
                        h: D(r[Fe]) * n,
                        m: D(r[Be]) * n,
                        s: D(r[Ue]) * n,
                        ms: D(la(1e3 * r[ze])) * n,
                      }))
                    : (r = Da.exec(e))
                      ? ((n = "-" === r[1] ? -1 : 1),
                        (i = {
                          y: wa(r[2], n),
                          M: wa(r[3], n),
                          w: wa(r[4], n),
                          d: wa(r[5], n),
                          h: wa(r[6], n),
                          m: wa(r[7], n),
                          s: wa(r[8], n),
                        }))
                      : null == i
                        ? (i = {})
                        : "object" == typeof i &&
                          ("from" in i || "to" in i) &&
                          ((s = xa(Kn(i.from), Kn(i.to))),
                          ((i = {}).ms = s.milliseconds),
                          (i.M = s.months)),
              (a = new ra(i)),
              oa(e) && c(e, "_locale") && (a._locale = e._locale),
              a
            );
          }
          function wa(e, t) {
            var n = e && parseFloat(e.replace(",", "."));
            return (isNaN(n) ? 0 : n) * t;
          }
          function Ea(e, t) {
            var n = {};
            return (
              (n.months = t.month() - e.month() + 12 * (t.year() - e.year())),
              e.clone().add(n.months, "M").isAfter(t) && --n.months,
              (n.milliseconds = +t - +e.clone().add(n.months, "M")),
              n
            );
          }
          function xa(e, t) {
            var n;
            return e.isValid() && t.isValid()
              ? ((t = ua(t, e)),
                e.isBefore(t)
                  ? (n = Ea(e, t))
                  : (((n = Ea(t, e)).milliseconds = -n.milliseconds),
                    (n.months = -n.months)),
                n)
              : { milliseconds: 0, months: 0 };
          }
          function Pa(e, t) {
            return function (n, a) {
              var s;
              return (
                null === a ||
                  isNaN(+a) ||
                  (H(
                    t,
                    "moment()." +
                      t +
                      "(period, number) is deprecated. Please use moment()." +
                      t +
                      "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.",
                  ),
                  (s = n),
                  (n = a),
                  (a = s)),
                Ha(this, Sa((n = "string" == typeof n ? +n : n), a), e),
                this
              );
            };
          }
          function Ha(e, t, n, a) {
            var i = t._milliseconds,
              r = la(t._days),
              o = la(t._months);
            e.isValid() &&
              ((a = null == a || a),
              o && ut(e, Xe(e, "Month") + o * n),
              r && et(e, "Date", Xe(e, "Date") + r * n),
              i && e._d.setTime(e._d.valueOf() + i * n),
              a && s.updateOffset(e, r || o));
          }
          (Sa.fn = ra.prototype), (Sa.invalid = ia);
          var Oa = Pa(1, "add"),
            Ca = Pa(-1, "subtract");
          function ja(e, t) {
            var n = e.diff(t, "days", !0);
            return n < -6
              ? "sameElse"
              : n < -1
                ? "lastWeek"
                : n < 0
                  ? "lastDay"
                  : n < 1
                    ? "sameDay"
                    : n < 2
                      ? "nextDay"
                      : n < 7
                        ? "nextWeek"
                        : "sameElse";
          }
          function Ia(e, t) {
            var n = e || Kn(),
              a = ua(n, this).startOf("day"),
              i = s.calendarFormat(this, a) || "sameElse",
              r = t && (O(t[i]) ? t[i].call(this, n) : t[i]);
            return this.format(r || this.localeData().calendar(i, this, Kn(n)));
          }
          function Na() {
            return new b(this);
          }
          function Aa(e, t) {
            var n = Y(e) ? e : Kn(e);
            return (
              !(!this.isValid() || !n.isValid()) &&
              ("millisecond" === (t = $(t) || "millisecond")
                ? this.valueOf() > n.valueOf()
                : n.valueOf() < this.clone().startOf(t).valueOf())
            );
          }
          function Ra(e, t) {
            var n = Y(e) ? e : Kn(e);
            return (
              !(!this.isValid() || !n.isValid()) &&
              ("millisecond" === (t = $(t) || "millisecond")
                ? this.valueOf() < n.valueOf()
                : this.clone().endOf(t).valueOf() < n.valueOf())
            );
          }
          function Wa(e, t, n, a) {
            var s = Y(e) ? e : Kn(e),
              i = Y(t) ? t : Kn(t);
            return (
              !!(this.isValid() && s.isValid() && i.isValid()) &&
              ("(" === (a = a || "()")[0]
                ? this.isAfter(s, n)
                : !this.isBefore(s, n)) &&
              (")" === a[1] ? this.isBefore(i, n) : !this.isAfter(i, n))
            );
          }
          function Fa(e, t) {
            var n,
              a = Y(e) ? e : Kn(e);
            return (
              !(!this.isValid() || !a.isValid()) &&
              ("millisecond" === (t = $(t) || "millisecond")
                ? this.valueOf() === a.valueOf()
                : ((n = a.valueOf()),
                  this.clone().startOf(t).valueOf() <= n &&
                    n <= this.clone().endOf(t).valueOf()))
            );
          }
          function Ba(e, t) {
            return this.isSame(e, t) || this.isAfter(e, t);
          }
          function Ua(e, t) {
            return this.isSame(e, t) || this.isBefore(e, t);
          }
          function za(e, t, n) {
            var a, s, i;
            if (!this.isValid()) return NaN;
            if (!(a = ua(e, this)).isValid()) return NaN;
            switch (
              ((s = 6e4 * (a.utcOffset() - this.utcOffset())), (t = $(t)))
            ) {
              case "year":
                i = Va(this, a) / 12;
                break;
              case "month":
                i = Va(this, a);
                break;
              case "quarter":
                i = Va(this, a) / 3;
                break;
              case "second":
                i = (this - a) / 1e3;
                break;
              case "minute":
                i = (this - a) / 6e4;
                break;
              case "hour":
                i = (this - a) / 36e5;
                break;
              case "day":
                i = (this - a - s) / 864e5;
                break;
              case "week":
                i = (this - a - s) / 6048e5;
                break;
              default:
                i = this - a;
            }
            return n ? i : T(i);
          }
          function Va(e, t) {
            var n = 12 * (t.year() - e.year()) + (t.month() - e.month()),
              a = e.clone().add(n, "months");
            return (
              -(
                n +
                (t - a < 0
                  ? (t - a) / (a - e.clone().add(n - 1, "months"))
                  : (t - a) / (e.clone().add(n + 1, "months") - a))
              ) || 0
            );
          }
          function Ga() {
            return this.clone()
              .locale("en")
              .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
          }
          function Ja(e) {
            if (!this.isValid()) return null;
            var t = !0 !== e,
              n = t ? this.clone().utc() : this;
            return n.year() < 0 || n.year() > 9999
              ? me(
                  n,
                  t
                    ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
                    : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ",
                )
              : O(Date.prototype.toISOString)
                ? t
                  ? this.toDate().toISOString()
                  : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3)
                      .toISOString()
                      .replace("Z", me(n, "Z"))
                : me(
                    n,
                    t
                      ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
                      : "YYYY-MM-DD[T]HH:mm:ss.SSSZ",
                  );
          }
          function qa() {
            if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
            var e = "moment",
              t = "";
            this.isLocal() ||
              ((e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone"),
              (t = "Z"));
            var n = "[" + e + '("]',
              a = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
              s = "-MM-DD[T]HH:mm:ss.SSS",
              i = t + '[")]';
            return this.format(n + a + s + i);
          }
          function Ka(e) {
            e || (e = this.isUtc() ? s.defaultFormatUtc : s.defaultFormat);
            var t = me(this, e);
            return this.localeData().postformat(t);
          }
          function Qa(e, t) {
            return this.isValid() && ((Y(e) && e.isValid()) || Kn(e).isValid())
              ? Sa({ to: this, from: e }).locale(this.locale()).humanize(!t)
              : this.localeData().invalidDate();
          }
          function $a(e) {
            return this.from(Kn(), e);
          }
          function Za(e, t) {
            return this.isValid() && ((Y(e) && e.isValid()) || Kn(e).isValid())
              ? Sa({ from: this, to: e }).locale(this.locale()).humanize(!t)
              : this.localeData().invalidDate();
          }
          function Xa(e) {
            return this.to(Kn(), e);
          }
          function es(e) {
            var t;
            return void 0 === e
              ? this._locale._abbr
              : (null != (t = Mn(e)) && (this._locale = t), this);
          }
          (s.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ"),
            (s.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]");
          var ts = E(
            "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
            function (e) {
              return void 0 === e ? this.localeData() : this.locale(e);
            },
          );
          function ns() {
            return this._locale;
          }
          var as = 1e3,
            ss = 60 * as,
            is = 60 * ss,
            rs = 3506328 * is;
          function os(e, t) {
            return ((e % t) + t) % t;
          }
          function ls(e, t, n) {
            return e < 100 && e >= 0
              ? new Date(e + 400, t, n) - rs
              : new Date(e, t, n).valueOf();
          }
          function ds(e, t, n) {
            return e < 100 && e >= 0
              ? Date.UTC(e + 400, t, n) - rs
              : Date.UTC(e, t, n);
          }
          function ms(e) {
            var t;
            if (void 0 === (e = $(e)) || "millisecond" === e || !this.isValid())
              return this;
            var n = this._isUTC ? ds : ls;
            switch (e) {
              case "year":
                t = n(this.year(), 0, 1);
                break;
              case "quarter":
                t = n(this.year(), this.month() - (this.month() % 3), 1);
                break;
              case "month":
                t = n(this.year(), this.month(), 1);
                break;
              case "week":
                t = n(this.year(), this.month(), this.date() - this.weekday());
                break;
              case "isoWeek":
                t = n(
                  this.year(),
                  this.month(),
                  this.date() - (this.isoWeekday() - 1),
                );
                break;
              case "day":
              case "date":
                t = n(this.year(), this.month(), this.date());
                break;
              case "hour":
                (t = this._d.valueOf()),
                  (t -= os(t + (this._isUTC ? 0 : this.utcOffset() * ss), is));
                break;
              case "minute":
                (t = this._d.valueOf()), (t -= os(t, ss));
                break;
              case "second":
                (t = this._d.valueOf()), (t -= os(t, as));
            }
            return this._d.setTime(t), s.updateOffset(this, !0), this;
          }
          function _s(e) {
            var t;
            if (void 0 === (e = $(e)) || "millisecond" === e || !this.isValid())
              return this;
            var n = this._isUTC ? ds : ls;
            switch (e) {
              case "year":
                t = n(this.year() + 1, 0, 1) - 1;
                break;
              case "quarter":
                t =
                  n(this.year(), this.month() - (this.month() % 3) + 3, 1) - 1;
                break;
              case "month":
                t = n(this.year(), this.month() + 1, 1) - 1;
                break;
              case "week":
                t =
                  n(
                    this.year(),
                    this.month(),
                    this.date() - this.weekday() + 7,
                  ) - 1;
                break;
              case "isoWeek":
                t =
                  n(
                    this.year(),
                    this.month(),
                    this.date() - (this.isoWeekday() - 1) + 7,
                  ) - 1;
                break;
              case "day":
              case "date":
                t = n(this.year(), this.month(), this.date() + 1) - 1;
                break;
              case "hour":
                (t = this._d.valueOf()),
                  (t +=
                    is -
                    os(t + (this._isUTC ? 0 : this.utcOffset() * ss), is) -
                    1);
                break;
              case "minute":
                (t = this._d.valueOf()), (t += ss - os(t, ss) - 1);
                break;
              case "second":
                (t = this._d.valueOf()), (t += as - os(t, as) - 1);
            }
            return this._d.setTime(t), s.updateOffset(this, !0), this;
          }
          function us() {
            return this._d.valueOf() - 6e4 * (this._offset || 0);
          }
          function cs() {
            return Math.floor(this.valueOf() / 1e3);
          }
          function ps() {
            return new Date(this.valueOf());
          }
          function hs() {
            var e = this;
            return [
              e.year(),
              e.month(),
              e.date(),
              e.hour(),
              e.minute(),
              e.second(),
              e.millisecond(),
            ];
          }
          function fs() {
            var e = this;
            return {
              years: e.year(),
              months: e.month(),
              date: e.date(),
              hours: e.hours(),
              minutes: e.minutes(),
              seconds: e.seconds(),
              milliseconds: e.milliseconds(),
            };
          }
          function ys() {
            return this.isValid() ? this.toISOString() : null;
          }
          function Ms() {
            return M(this);
          }
          function gs() {
            return p({}, y(this));
          }
          function Ls() {
            return y(this).overflow;
          }
          function ks() {
            return {
              input: this._i,
              format: this._f,
              locale: this._locale,
              isUTC: this._isUTC,
              strict: this._strict,
            };
          }
          function vs(e, t) {
            oe(0, [e, e.length], 0, t);
          }
          function bs(e) {
            return Ss.call(
              this,
              e,
              this.week(),
              this.weekday(),
              this.localeData()._week.dow,
              this.localeData()._week.doy,
            );
          }
          function Ys(e) {
            return Ss.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
          }
          function Ts() {
            return Tt(this.year(), 1, 4);
          }
          function Ds() {
            var e = this.localeData()._week;
            return Tt(this.year(), e.dow, e.doy);
          }
          function Ss(e, t, n, a, s) {
            var i;
            return null == e
              ? Yt(this, a, s).year
              : (t > (i = Tt(e, a, s)) && (t = i),
                ws.call(this, e, t, n, a, s));
          }
          function ws(e, t, n, a, s) {
            var i = bt(e, t, n, a, s),
              r = kt(i.year, 0, i.dayOfYear);
            return (
              this.year(r.getUTCFullYear()),
              this.month(r.getUTCMonth()),
              this.date(r.getUTCDate()),
              this
            );
          }
          function Es(e) {
            return null == e
              ? Math.ceil((this.month() + 1) / 3)
              : this.month(3 * (e - 1) + (this.month() % 3));
          }
          oe(0, ["gg", 2], 0, function () {
            return this.weekYear() % 100;
          }),
            oe(0, ["GG", 2], 0, function () {
              return this.isoWeekYear() % 100;
            }),
            vs("gggg", "weekYear"),
            vs("ggggg", "weekYear"),
            vs("GGGG", "isoWeekYear"),
            vs("GGGGG", "isoWeekYear"),
            Q("weekYear", "gg"),
            Q("isoWeekYear", "GG"),
            ee("weekYear", 1),
            ee("isoWeekYear", 1),
            xe("G", Ye),
            xe("g", Ye),
            xe("GG", ye, ce),
            xe("gg", ye, ce),
            xe("GGGG", ke, he),
            xe("gggg", ke, he),
            xe("GGGGG", ve, fe),
            xe("ggggg", ve, fe),
            Ie(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, n, a) {
              t[a.substr(0, 2)] = D(e);
            }),
            Ie(["gg", "GG"], function (e, t, n, a) {
              t[a] = s.parseTwoDigitYear(e);
            }),
            oe("Q", 0, "Qo", "quarter"),
            Q("quarter", "Q"),
            ee("quarter", 7),
            xe("Q", ue),
            je("Q", function (e, t) {
              t[Re] = 3 * (D(e) - 1);
            }),
            oe("D", ["DD", 2], "Do", "date"),
            Q("date", "D"),
            ee("date", 9),
            xe("D", ye),
            xe("DD", ye, ce),
            xe("Do", function (e, t) {
              return e
                ? t._dayOfMonthOrdinalParse || t._ordinalParse
                : t._dayOfMonthOrdinalParseLenient;
            }),
            je(["D", "DD"], We),
            je("Do", function (e, t) {
              t[We] = D(e.match(ye)[0]);
            });
          var xs = Ze("Date", !0);
          function Ps(e) {
            var t =
              Math.round(
                (this.clone().startOf("day") - this.clone().startOf("year")) /
                  864e5,
              ) + 1;
            return null == e ? t : this.add(e - t, "d");
          }
          oe("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
            Q("dayOfYear", "DDD"),
            ee("dayOfYear", 4),
            xe("DDD", Le),
            xe("DDDD", pe),
            je(["DDD", "DDDD"], function (e, t, n) {
              n._dayOfYear = D(e);
            }),
            oe("m", ["mm", 2], 0, "minute"),
            Q("minute", "m"),
            ee("minute", 14),
            xe("m", ye),
            xe("mm", ye, ce),
            je(["m", "mm"], Be);
          var Hs = Ze("Minutes", !1);
          oe("s", ["ss", 2], 0, "second"),
            Q("second", "s"),
            ee("second", 15),
            xe("s", ye),
            xe("ss", ye, ce),
            je(["s", "ss"], Ue);
          var Os,
            Cs = Ze("Seconds", !1);
          for (
            oe("S", 0, 0, function () {
              return ~~(this.millisecond() / 100);
            }),
              oe(0, ["SS", 2], 0, function () {
                return ~~(this.millisecond() / 10);
              }),
              oe(0, ["SSS", 3], 0, "millisecond"),
              oe(0, ["SSSS", 4], 0, function () {
                return 10 * this.millisecond();
              }),
              oe(0, ["SSSSS", 5], 0, function () {
                return 100 * this.millisecond();
              }),
              oe(0, ["SSSSSS", 6], 0, function () {
                return 1e3 * this.millisecond();
              }),
              oe(0, ["SSSSSSS", 7], 0, function () {
                return 1e4 * this.millisecond();
              }),
              oe(0, ["SSSSSSSS", 8], 0, function () {
                return 1e5 * this.millisecond();
              }),
              oe(0, ["SSSSSSSSS", 9], 0, function () {
                return 1e6 * this.millisecond();
              }),
              Q("millisecond", "ms"),
              ee("millisecond", 16),
              xe("S", Le, ue),
              xe("SS", Le, ce),
              xe("SSS", Le, pe),
              Os = "SSSS";
            Os.length <= 9;
            Os += "S"
          )
            xe(Os, be);
          function js(e, t) {
            t[ze] = D(1e3 * ("0." + e));
          }
          for (Os = "S"; Os.length <= 9; Os += "S") je(Os, js);
          var Is = Ze("Milliseconds", !1);
          function Ns() {
            return this._isUTC ? "UTC" : "";
          }
          function As() {
            return this._isUTC ? "Coordinated Universal Time" : "";
          }
          oe("z", 0, 0, "zoneAbbr"), oe("zz", 0, 0, "zoneName");
          var Rs = b.prototype;
          function Ws(e) {
            return Kn(1e3 * e);
          }
          function Fs() {
            return Kn.apply(null, arguments).parseZone();
          }
          function Bs(e) {
            return e;
          }
          (Rs.add = Oa),
            (Rs.calendar = Ia),
            (Rs.clone = Na),
            (Rs.diff = za),
            (Rs.endOf = _s),
            (Rs.format = Ka),
            (Rs.from = Qa),
            (Rs.fromNow = $a),
            (Rs.to = Za),
            (Rs.toNow = Xa),
            (Rs.get = tt),
            (Rs.invalidAt = Ls),
            (Rs.isAfter = Aa),
            (Rs.isBefore = Ra),
            (Rs.isBetween = Wa),
            (Rs.isSame = Fa),
            (Rs.isSameOrAfter = Ba),
            (Rs.isSameOrBefore = Ua),
            (Rs.isValid = Ms),
            (Rs.lang = ts),
            (Rs.locale = es),
            (Rs.localeData = ns),
            (Rs.max = $n),
            (Rs.min = Qn),
            (Rs.parsingFlags = gs),
            (Rs.set = nt),
            (Rs.startOf = ms),
            (Rs.subtract = Ca),
            (Rs.toArray = hs),
            (Rs.toObject = fs),
            (Rs.toDate = ps),
            (Rs.toISOString = Ja),
            (Rs.inspect = qa),
            (Rs.toJSON = ys),
            (Rs.toString = Ga),
            (Rs.unix = cs),
            (Rs.valueOf = us),
            (Rs.creationData = ks),
            (Rs.year = Qe),
            (Rs.isLeapYear = $e),
            (Rs.weekYear = bs),
            (Rs.isoWeekYear = Ys),
            (Rs.quarter = Rs.quarters = Es),
            (Rs.month = ct),
            (Rs.daysInMonth = pt),
            (Rs.week = Rs.weeks = xt),
            (Rs.isoWeek = Rs.isoWeeks = Pt),
            (Rs.weeksInYear = Ds),
            (Rs.isoWeeksInYear = Ts),
            (Rs.date = xs),
            (Rs.day = Rs.days = Ut),
            (Rs.weekday = zt),
            (Rs.isoWeekday = Vt),
            (Rs.dayOfYear = Ps),
            (Rs.hour = Rs.hours = ln),
            (Rs.minute = Rs.minutes = Hs),
            (Rs.second = Rs.seconds = Cs),
            (Rs.millisecond = Rs.milliseconds = Is),
            (Rs.utcOffset = pa),
            (Rs.utc = fa),
            (Rs.local = ya),
            (Rs.parseZone = Ma),
            (Rs.hasAlignedHourOffset = ga),
            (Rs.isDST = La),
            (Rs.isLocal = va),
            (Rs.isUtcOffset = ba),
            (Rs.isUtc = Ya),
            (Rs.isUTC = Ya),
            (Rs.zoneAbbr = Ns),
            (Rs.zoneName = As),
            (Rs.dates = E(
              "dates accessor is deprecated. Use date instead.",
              xs,
            )),
            (Rs.months = E(
              "months accessor is deprecated. Use month instead",
              ct,
            )),
            (Rs.years = E(
              "years accessor is deprecated. Use year instead",
              Qe,
            )),
            (Rs.zone = E(
              "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
              ha,
            )),
            (Rs.isDSTShifted = E(
              "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
              ka,
            ));
          var Us = I.prototype;
          function zs(e, t, n, a) {
            var s = Mn(),
              i = h().set(a, t);
            return s[n](i, e);
          }
          function Vs(e, t, n) {
            if ((m(e) && ((t = e), (e = void 0)), (e = e || ""), null != t))
              return zs(e, t, n, "month");
            var a,
              s = [];
            for (a = 0; a < 12; a++) s[a] = zs(e, a, n, "month");
            return s;
          }
          function Gs(e, t, n, a) {
            "boolean" == typeof e
              ? (m(t) && ((n = t), (t = void 0)), (t = t || ""))
              : ((n = t = e),
                (e = !1),
                m(t) && ((n = t), (t = void 0)),
                (t = t || ""));
            var s,
              i = Mn(),
              r = e ? i._week.dow : 0;
            if (null != n) return zs(t, (n + r) % 7, a, "day");
            var o = [];
            for (s = 0; s < 7; s++) o[s] = zs(t, (s + r) % 7, a, "day");
            return o;
          }
          function Js(e, t) {
            return Vs(e, t, "months");
          }
          function qs(e, t) {
            return Vs(e, t, "monthsShort");
          }
          function Ks(e, t, n) {
            return Gs(e, t, n, "weekdays");
          }
          function Qs(e, t, n) {
            return Gs(e, t, n, "weekdaysShort");
          }
          function $s(e, t, n) {
            return Gs(e, t, n, "weekdaysMin");
          }
          (Us.calendar = A),
            (Us.longDateFormat = W),
            (Us.invalidDate = B),
            (Us.ordinal = V),
            (Us.preparse = Bs),
            (Us.postformat = Bs),
            (Us.relativeTime = J),
            (Us.pastFuture = q),
            (Us.set = C),
            (Us.months = ot),
            (Us.monthsShort = dt),
            (Us.monthsParse = _t),
            (Us.monthsRegex = Mt),
            (Us.monthsShortRegex = ft),
            (Us.week = Dt),
            (Us.firstDayOfYear = Et),
            (Us.firstDayOfWeek = wt),
            (Us.weekdays = It),
            (Us.weekdaysMin = Wt),
            (Us.weekdaysShort = At),
            (Us.weekdaysParse = Bt),
            (Us.weekdaysRegex = Jt),
            (Us.weekdaysShortRegex = Kt),
            (Us.weekdaysMinRegex = $t),
            (Us.isPM = an),
            (Us.meridiem = rn),
            hn("en", {
              dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
              ordinal: function (e) {
                var t = e % 10;
                return (
                  e +
                  (1 === D((e % 100) / 10)
                    ? "th"
                    : 1 === t
                      ? "st"
                      : 2 === t
                        ? "nd"
                        : 3 === t
                          ? "rd"
                          : "th")
                );
              },
            }),
            (s.lang = E(
              "moment.lang is deprecated. Use moment.locale instead.",
              hn,
            )),
            (s.langData = E(
              "moment.langData is deprecated. Use moment.localeData instead.",
              Mn,
            ));
          var Zs = Math.abs;
          function Xs() {
            var e = this._data;
            return (
              (this._milliseconds = Zs(this._milliseconds)),
              (this._days = Zs(this._days)),
              (this._months = Zs(this._months)),
              (e.milliseconds = Zs(e.milliseconds)),
              (e.seconds = Zs(e.seconds)),
              (e.minutes = Zs(e.minutes)),
              (e.hours = Zs(e.hours)),
              (e.months = Zs(e.months)),
              (e.years = Zs(e.years)),
              this
            );
          }
          function ei(e, t, n, a) {
            var s = Sa(t, n);
            return (
              (e._milliseconds += a * s._milliseconds),
              (e._days += a * s._days),
              (e._months += a * s._months),
              e._bubble()
            );
          }
          function ti(e, t) {
            return ei(this, e, t, 1);
          }
          function ni(e, t) {
            return ei(this, e, t, -1);
          }
          function ai(e) {
            return e < 0 ? Math.floor(e) : Math.ceil(e);
          }
          function si() {
            var e,
              t,
              n,
              a,
              s,
              i = this._milliseconds,
              r = this._days,
              o = this._months,
              l = this._data;
            return (
              (i >= 0 && r >= 0 && o >= 0) ||
                (i <= 0 && r <= 0 && o <= 0) ||
                ((i += 864e5 * ai(ri(o) + r)), (r = 0), (o = 0)),
              (l.milliseconds = i % 1e3),
              (e = T(i / 1e3)),
              (l.seconds = e % 60),
              (t = T(e / 60)),
              (l.minutes = t % 60),
              (n = T(t / 60)),
              (l.hours = n % 24),
              (r += T(n / 24)),
              (o += s = T(ii(r))),
              (r -= ai(ri(s))),
              (a = T(o / 12)),
              (o %= 12),
              (l.days = r),
              (l.months = o),
              (l.years = a),
              this
            );
          }
          function ii(e) {
            return (4800 * e) / 146097;
          }
          function ri(e) {
            return (146097 * e) / 4800;
          }
          function oi(e) {
            if (!this.isValid()) return NaN;
            var t,
              n,
              a = this._milliseconds;
            if ("month" === (e = $(e)) || "quarter" === e || "year" === e)
              switch (
                ((t = this._days + a / 864e5), (n = this._months + ii(t)), e)
              ) {
                case "month":
                  return n;
                case "quarter":
                  return n / 3;
                case "year":
                  return n / 12;
              }
            else
              switch (((t = this._days + Math.round(ri(this._months))), e)) {
                case "week":
                  return t / 7 + a / 6048e5;
                case "day":
                  return t + a / 864e5;
                case "hour":
                  return 24 * t + a / 36e5;
                case "minute":
                  return 1440 * t + a / 6e4;
                case "second":
                  return 86400 * t + a / 1e3;
                case "millisecond":
                  return Math.floor(864e5 * t) + a;
                default:
                  throw new Error("Unknown unit " + e);
              }
          }
          function li() {
            return this.isValid()
              ? this._milliseconds +
                  864e5 * this._days +
                  (this._months % 12) * 2592e6 +
                  31536e6 * D(this._months / 12)
              : NaN;
          }
          function di(e) {
            return function () {
              return this.as(e);
            };
          }
          var mi = di("ms"),
            _i = di("s"),
            ui = di("m"),
            ci = di("h"),
            pi = di("d"),
            hi = di("w"),
            fi = di("M"),
            yi = di("Q"),
            Mi = di("y");
          function gi() {
            return Sa(this);
          }
          function Li(e) {
            return (e = $(e)), this.isValid() ? this[e + "s"]() : NaN;
          }
          function ki(e) {
            return function () {
              return this.isValid() ? this._data[e] : NaN;
            };
          }
          var vi = ki("milliseconds"),
            bi = ki("seconds"),
            Yi = ki("minutes"),
            Ti = ki("hours"),
            Di = ki("days"),
            Si = ki("months"),
            wi = ki("years");
          function Ei() {
            return T(this.days() / 7);
          }
          var xi = Math.round,
            Pi = { ss: 44, s: 45, m: 45, h: 22, d: 26, M: 11 };
          function Hi(e, t, n, a, s) {
            return s.relativeTime(t || 1, !!n, e, a);
          }
          function Oi(e, t, n) {
            var a = Sa(e).abs(),
              s = xi(a.as("s")),
              i = xi(a.as("m")),
              r = xi(a.as("h")),
              o = xi(a.as("d")),
              l = xi(a.as("M")),
              d = xi(a.as("y")),
              m = (s <= Pi.ss && ["s", s]) ||
                (s < Pi.s && ["ss", s]) ||
                (i <= 1 && ["m"]) ||
                (i < Pi.m && ["mm", i]) ||
                (r <= 1 && ["h"]) ||
                (r < Pi.h && ["hh", r]) ||
                (o <= 1 && ["d"]) ||
                (o < Pi.d && ["dd", o]) ||
                (l <= 1 && ["M"]) ||
                (l < Pi.M && ["MM", l]) ||
                (d <= 1 && ["y"]) || ["yy", d];
            return (m[2] = t), (m[3] = +e > 0), (m[4] = n), Hi.apply(null, m);
          }
          function Ci(e) {
            return void 0 === e ? xi : "function" == typeof e && ((xi = e), !0);
          }
          function ji(e, t) {
            return (
              void 0 !== Pi[e] &&
              (void 0 === t
                ? Pi[e]
                : ((Pi[e] = t), "s" === e && (Pi.ss = t - 1), !0))
            );
          }
          function Ii(e) {
            if (!this.isValid()) return this.localeData().invalidDate();
            var t = this.localeData(),
              n = Oi(this, !e, t);
            return e && (n = t.pastFuture(+this, n)), t.postformat(n);
          }
          var Ni = Math.abs;
          function Ai(e) {
            return (e > 0) - (e < 0) || +e;
          }
          function Ri() {
            if (!this.isValid()) return this.localeData().invalidDate();
            var e,
              t,
              n = Ni(this._milliseconds) / 1e3,
              a = Ni(this._days),
              s = Ni(this._months);
            (e = T(n / 60)), (t = T(e / 60)), (n %= 60), (e %= 60);
            var i = T(s / 12),
              r = (s %= 12),
              o = a,
              l = t,
              d = e,
              m = n ? n.toFixed(3).replace(/\.?0+$/, "") : "",
              _ = this.asSeconds();
            if (!_) return "P0D";
            var u = _ < 0 ? "-" : "",
              c = Ai(this._months) !== Ai(_) ? "-" : "",
              p = Ai(this._days) !== Ai(_) ? "-" : "",
              h = Ai(this._milliseconds) !== Ai(_) ? "-" : "";
            return (
              u +
              "P" +
              (i ? c + i + "Y" : "") +
              (r ? c + r + "M" : "") +
              (o ? p + o + "D" : "") +
              (l || d || m ? "T" : "") +
              (l ? h + l + "H" : "") +
              (d ? h + d + "M" : "") +
              (m ? h + m + "S" : "")
            );
          }
          var Wi = ra.prototype;
          return (
            (Wi.isValid = sa),
            (Wi.abs = Xs),
            (Wi.add = ti),
            (Wi.subtract = ni),
            (Wi.as = oi),
            (Wi.asMilliseconds = mi),
            (Wi.asSeconds = _i),
            (Wi.asMinutes = ui),
            (Wi.asHours = ci),
            (Wi.asDays = pi),
            (Wi.asWeeks = hi),
            (Wi.asMonths = fi),
            (Wi.asQuarters = yi),
            (Wi.asYears = Mi),
            (Wi.valueOf = li),
            (Wi._bubble = si),
            (Wi.clone = gi),
            (Wi.get = Li),
            (Wi.milliseconds = vi),
            (Wi.seconds = bi),
            (Wi.minutes = Yi),
            (Wi.hours = Ti),
            (Wi.days = Di),
            (Wi.weeks = Ei),
            (Wi.months = Si),
            (Wi.years = wi),
            (Wi.humanize = Ii),
            (Wi.toISOString = Ri),
            (Wi.toString = Ri),
            (Wi.toJSON = Ri),
            (Wi.locale = es),
            (Wi.localeData = ns),
            (Wi.toIsoString = E(
              "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
              Ri,
            )),
            (Wi.lang = ts),
            oe("X", 0, 0, "unix"),
            oe("x", 0, 0, "valueOf"),
            xe("x", Ye),
            xe("X", Se),
            je("X", function (e, t, n) {
              n._d = new Date(1e3 * parseFloat(e, 10));
            }),
            je("x", function (e, t, n) {
              n._d = new Date(D(e));
            }),
            (s.version = "2.24.0"),
            i(Kn),
            (s.fn = Rs),
            (s.min = Xn),
            (s.max = ea),
            (s.now = ta),
            (s.utc = h),
            (s.unix = Ws),
            (s.months = Js),
            (s.isDate = _),
            (s.locale = hn),
            (s.invalid = g),
            (s.duration = Sa),
            (s.isMoment = Y),
            (s.weekdays = Ks),
            (s.parseZone = Fs),
            (s.localeData = Mn),
            (s.isDuration = oa),
            (s.monthsShort = qs),
            (s.weekdaysMin = $s),
            (s.defineLocale = fn),
            (s.updateLocale = yn),
            (s.locales = gn),
            (s.weekdaysShort = Qs),
            (s.normalizeUnits = $),
            (s.relativeTimeRounding = Ci),
            (s.relativeTimeThreshold = ji),
            (s.calendarFormat = ja),
            (s.prototype = Rs),
            (s.HTML5_FMT = {
              DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
              DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
              DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
              DATE: "YYYY-MM-DD",
              TIME: "HH:mm",
              TIME_SECONDS: "HH:mm:ss",
              TIME_MS: "HH:mm:ss.SSS",
              WEEK: "GGGG-[W]WW",
              MONTH: "YYYY-MM",
            }),
            s
          );
        })();
      },
      (e, t, n) => {
        var a = {
          "./af": 86,
          "./af.js": 86,
          "./ar": 87,
          "./ar-dz": 88,
          "./ar-dz.js": 88,
          "./ar-kw": 89,
          "./ar-kw.js": 89,
          "./ar-ly": 90,
          "./ar-ly.js": 90,
          "./ar-ma": 91,
          "./ar-ma.js": 91,
          "./ar-sa": 92,
          "./ar-sa.js": 92,
          "./ar-tn": 93,
          "./ar-tn.js": 93,
          "./ar.js": 87,
          "./az": 94,
          "./az.js": 94,
          "./be": 95,
          "./be.js": 95,
          "./bg": 96,
          "./bg.js": 96,
          "./bm": 97,
          "./bm.js": 97,
          "./bn": 98,
          "./bn.js": 98,
          "./bo": 99,
          "./bo.js": 99,
          "./br": 100,
          "./br.js": 100,
          "./bs": 101,
          "./bs.js": 101,
          "./ca": 102,
          "./ca.js": 102,
          "./cs": 103,
          "./cs.js": 103,
          "./cv": 104,
          "./cv.js": 104,
          "./cy": 105,
          "./cy.js": 105,
          "./da": 106,
          "./da.js": 106,
          "./de": 107,
          "./de-at": 108,
          "./de-at.js": 108,
          "./de-ch": 109,
          "./de-ch.js": 109,
          "./de.js": 107,
          "./dv": 110,
          "./dv.js": 110,
          "./el": 111,
          "./el.js": 111,
          "./en-SG": 112,
          "./en-SG.js": 112,
          "./en-au": 113,
          "./en-au.js": 113,
          "./en-ca": 114,
          "./en-ca.js": 114,
          "./en-gb": 115,
          "./en-gb.js": 115,
          "./en-ie": 116,
          "./en-ie.js": 116,
          "./en-il": 117,
          "./en-il.js": 117,
          "./en-nz": 118,
          "./en-nz.js": 118,
          "./eo": 119,
          "./eo.js": 119,
          "./es": 120,
          "./es-do": 121,
          "./es-do.js": 121,
          "./es-us": 122,
          "./es-us.js": 122,
          "./es.js": 120,
          "./et": 123,
          "./et.js": 123,
          "./eu": 124,
          "./eu.js": 124,
          "./fa": 125,
          "./fa.js": 125,
          "./fi": 126,
          "./fi.js": 126,
          "./fo": 127,
          "./fo.js": 127,
          "./fr": 128,
          "./fr-ca": 129,
          "./fr-ca.js": 129,
          "./fr-ch": 130,
          "./fr-ch.js": 130,
          "./fr.js": 128,
          "./fy": 131,
          "./fy.js": 131,
          "./ga": 132,
          "./ga.js": 132,
          "./gd": 133,
          "./gd.js": 133,
          "./gl": 134,
          "./gl.js": 134,
          "./gom-latn": 135,
          "./gom-latn.js": 135,
          "./gu": 136,
          "./gu.js": 136,
          "./he": 137,
          "./he.js": 137,
          "./hi": 138,
          "./hi.js": 138,
          "./hr": 139,
          "./hr.js": 139,
          "./hu": 140,
          "./hu.js": 140,
          "./hy-am": 141,
          "./hy-am.js": 141,
          "./id": 142,
          "./id.js": 142,
          "./is": 143,
          "./is.js": 143,
          "./it": 144,
          "./it-ch": 145,
          "./it-ch.js": 145,
          "./it.js": 144,
          "./ja": 146,
          "./ja.js": 146,
          "./jv": 147,
          "./jv.js": 147,
          "./ka": 148,
          "./ka.js": 148,
          "./kk": 149,
          "./kk.js": 149,
          "./km": 150,
          "./km.js": 150,
          "./kn": 151,
          "./kn.js": 151,
          "./ko": 152,
          "./ko.js": 152,
          "./ku": 153,
          "./ku.js": 153,
          "./ky": 154,
          "./ky.js": 154,
          "./lb": 155,
          "./lb.js": 155,
          "./lo": 156,
          "./lo.js": 156,
          "./lt": 157,
          "./lt.js": 157,
          "./lv": 158,
          "./lv.js": 158,
          "./me": 159,
          "./me.js": 159,
          "./mi": 160,
          "./mi.js": 160,
          "./mk": 161,
          "./mk.js": 161,
          "./ml": 162,
          "./ml.js": 162,
          "./mn": 163,
          "./mn.js": 163,
          "./mr": 164,
          "./mr.js": 164,
          "./ms": 165,
          "./ms-my": 166,
          "./ms-my.js": 166,
          "./ms.js": 165,
          "./mt": 167,
          "./mt.js": 167,
          "./my": 168,
          "./my.js": 168,
          "./nb": 169,
          "./nb.js": 169,
          "./ne": 170,
          "./ne.js": 170,
          "./nl": 171,
          "./nl-be": 172,
          "./nl-be.js": 172,
          "./nl.js": 171,
          "./nn": 173,
          "./nn.js": 173,
          "./pa-in": 174,
          "./pa-in.js": 174,
          "./pl": 175,
          "./pl.js": 175,
          "./pt": 176,
          "./pt-br": 177,
          "./pt-br.js": 177,
          "./pt.js": 176,
          "./ro": 178,
          "./ro.js": 178,
          "./ru": 179,
          "./ru.js": 179,
          "./sd": 180,
          "./sd.js": 180,
          "./se": 181,
          "./se.js": 181,
          "./si": 182,
          "./si.js": 182,
          "./sk": 183,
          "./sk.js": 183,
          "./sl": 184,
          "./sl.js": 184,
          "./sq": 185,
          "./sq.js": 185,
          "./sr": 186,
          "./sr-cyrl": 187,
          "./sr-cyrl.js": 187,
          "./sr.js": 186,
          "./ss": 188,
          "./ss.js": 188,
          "./sv": 189,
          "./sv.js": 189,
          "./sw": 190,
          "./sw.js": 190,
          "./ta": 191,
          "./ta.js": 191,
          "./te": 192,
          "./te.js": 192,
          "./tet": 193,
          "./tet.js": 193,
          "./tg": 194,
          "./tg.js": 194,
          "./th": 195,
          "./th.js": 195,
          "./tl-ph": 196,
          "./tl-ph.js": 196,
          "./tlh": 197,
          "./tlh.js": 197,
          "./tr": 198,
          "./tr.js": 198,
          "./tzl": 199,
          "./tzl.js": 199,
          "./tzm": 200,
          "./tzm-latn": 201,
          "./tzm-latn.js": 201,
          "./tzm.js": 200,
          "./ug-cn": 202,
          "./ug-cn.js": 202,
          "./uk": 203,
          "./uk.js": 203,
          "./ur": 204,
          "./ur.js": 204,
          "./uz": 205,
          "./uz-latn": 206,
          "./uz-latn.js": 206,
          "./uz.js": 205,
          "./vi": 207,
          "./vi.js": 207,
          "./x-pseudo": 208,
          "./x-pseudo.js": 208,
          "./yo": 209,
          "./yo.js": 209,
          "./zh-cn": 210,
          "./zh-cn.js": 210,
          "./zh-hk": 211,
          "./zh-hk.js": 211,
          "./zh-tw": 212,
          "./zh-tw.js": 212,
        };
        function s(e) {
          var t = i(e);
          return n(t);
        }
        function i(e) {
          if (!n.o(a, e)) {
            var t = new Error("Cannot find module '" + e + "'");
            throw ((t.code = "MODULE_NOT_FOUND"), t);
          }
          return a[e];
        }
        (s.keys = function () {
          return Object.keys(a);
        }),
          (s.resolve = i),
          (e.exports = s),
          (s.id = 85);
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("af", {
            months:
              "Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split(
                "_",
              ),
            monthsShort:
              "Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),
            weekdays:
              "Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split(
                "_",
              ),
            weekdaysShort: "Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),
            weekdaysMin: "So_Ma_Di_Wo_Do_Vr_Sa".split("_"),
            meridiemParse: /vm|nm/i,
            isPM: function (e) {
              return /^nm$/i.test(e);
            },
            meridiem: function (e, t, n) {
              return e < 12 ? (n ? "vm" : "VM") : n ? "nm" : "NM";
            },
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Vandag om] LT",
              nextDay: "[Môre om] LT",
              nextWeek: "dddd [om] LT",
              lastDay: "[Gister om] LT",
              lastWeek: "[Laas] dddd [om] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "oor %s",
              past: "%s gelede",
              s: "'n paar sekondes",
              ss: "%d sekondes",
              m: "'n minuut",
              mm: "%d minute",
              h: "'n uur",
              hh: "%d ure",
              d: "'n dag",
              dd: "%d dae",
              M: "'n maand",
              MM: "%d maande",
              y: "'n jaar",
              yy: "%d jaar",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
            ordinal: function (e) {
              return e + (1 === e || 8 === e || e >= 20 ? "ste" : "de");
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "١",
              2: "٢",
              3: "٣",
              4: "٤",
              5: "٥",
              6: "٦",
              7: "٧",
              8: "٨",
              9: "٩",
              0: "٠",
            },
            n = {
              "١": "1",
              "٢": "2",
              "٣": "3",
              "٤": "4",
              "٥": "5",
              "٦": "6",
              "٧": "7",
              "٨": "8",
              "٩": "9",
              "٠": "0",
            },
            a = function (e) {
              return 0 === e
                ? 0
                : 1 === e
                  ? 1
                  : 2 === e
                    ? 2
                    : e % 100 >= 3 && e % 100 <= 10
                      ? 3
                      : e % 100 >= 11
                        ? 4
                        : 5;
            },
            s = {
              s: [
                "أقل من ثانية",
                "ثانية واحدة",
                ["ثانيتان", "ثانيتين"],
                "%d ثوان",
                "%d ثانية",
                "%d ثانية",
              ],
              m: [
                "أقل من دقيقة",
                "دقيقة واحدة",
                ["دقيقتان", "دقيقتين"],
                "%d دقائق",
                "%d دقيقة",
                "%d دقيقة",
              ],
              h: [
                "أقل من ساعة",
                "ساعة واحدة",
                ["ساعتان", "ساعتين"],
                "%d ساعات",
                "%d ساعة",
                "%d ساعة",
              ],
              d: [
                "أقل من يوم",
                "يوم واحد",
                ["يومان", "يومين"],
                "%d أيام",
                "%d يومًا",
                "%d يوم",
              ],
              M: [
                "أقل من شهر",
                "شهر واحد",
                ["شهران", "شهرين"],
                "%d أشهر",
                "%d شهرا",
                "%d شهر",
              ],
              y: [
                "أقل من عام",
                "عام واحد",
                ["عامان", "عامين"],
                "%d أعوام",
                "%d عامًا",
                "%d عام",
              ],
            },
            i = function (e) {
              return function (t, n, i, r) {
                var o = a(t),
                  l = s[e][a(t)];
                return 2 === o && (l = l[n ? 0 : 1]), l.replace(/%d/i, t);
              };
            },
            r = [
              "يناير",
              "فبراير",
              "مارس",
              "أبريل",
              "مايو",
              "يونيو",
              "يوليو",
              "أغسطس",
              "سبتمبر",
              "أكتوبر",
              "نوفمبر",
              "ديسمبر",
            ];
          e.defineLocale("ar", {
            months: r,
            monthsShort: r,
            weekdays:
              "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
            weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "D/‏M/‏YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            meridiemParse: /ص|م/,
            isPM: function (e) {
              return "م" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "ص" : "م";
            },
            calendar: {
              sameDay: "[اليوم عند الساعة] LT",
              nextDay: "[غدًا عند الساعة] LT",
              nextWeek: "dddd [عند الساعة] LT",
              lastDay: "[أمس عند الساعة] LT",
              lastWeek: "dddd [عند الساعة] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "بعد %s",
              past: "منذ %s",
              s: i("s"),
              ss: i("s"),
              m: i("m"),
              mm: i("m"),
              h: i("h"),
              hh: i("h"),
              d: i("d"),
              dd: i("d"),
              M: i("M"),
              MM: i("M"),
              y: i("y"),
              yy: i("y"),
            },
            preparse: function (e) {
              return e
                .replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (e) {
                  return n[e];
                })
                .replace(/،/g, ",");
            },
            postformat: function (e) {
              return e
                .replace(/\d/g, function (e) {
                  return t[e];
                })
                .replace(/,/g, "،");
            },
            week: { dow: 6, doy: 12 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ar-dz", {
            months:
              "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split(
                "_",
              ),
            monthsShort:
              "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split(
                "_",
              ),
            weekdays:
              "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort: "احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),
            weekdaysMin: "أح_إث_ثلا_أر_خم_جم_سب".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[اليوم على الساعة] LT",
              nextDay: "[غدا على الساعة] LT",
              nextWeek: "dddd [على الساعة] LT",
              lastDay: "[أمس على الساعة] LT",
              lastWeek: "dddd [على الساعة] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "في %s",
              past: "منذ %s",
              s: "ثوان",
              ss: "%d ثانية",
              m: "دقيقة",
              mm: "%d دقائق",
              h: "ساعة",
              hh: "%d ساعات",
              d: "يوم",
              dd: "%d أيام",
              M: "شهر",
              MM: "%d أشهر",
              y: "سنة",
              yy: "%d سنوات",
            },
            week: { dow: 0, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ar-kw", {
            months:
              "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split(
                "_",
              ),
            monthsShort:
              "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split(
                "_",
              ),
            weekdays:
              "الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort: "احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),
            weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[اليوم على الساعة] LT",
              nextDay: "[غدا على الساعة] LT",
              nextWeek: "dddd [على الساعة] LT",
              lastDay: "[أمس على الساعة] LT",
              lastWeek: "dddd [على الساعة] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "في %s",
              past: "منذ %s",
              s: "ثوان",
              ss: "%d ثانية",
              m: "دقيقة",
              mm: "%d دقائق",
              h: "ساعة",
              hh: "%d ساعات",
              d: "يوم",
              dd: "%d أيام",
              M: "شهر",
              MM: "%d أشهر",
              y: "سنة",
              yy: "%d سنوات",
            },
            week: { dow: 0, doy: 12 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "1",
              2: "2",
              3: "3",
              4: "4",
              5: "5",
              6: "6",
              7: "7",
              8: "8",
              9: "9",
              0: "0",
            },
            n = function (e) {
              return 0 === e
                ? 0
                : 1 === e
                  ? 1
                  : 2 === e
                    ? 2
                    : e % 100 >= 3 && e % 100 <= 10
                      ? 3
                      : e % 100 >= 11
                        ? 4
                        : 5;
            },
            a = {
              s: [
                "أقل من ثانية",
                "ثانية واحدة",
                ["ثانيتان", "ثانيتين"],
                "%d ثوان",
                "%d ثانية",
                "%d ثانية",
              ],
              m: [
                "أقل من دقيقة",
                "دقيقة واحدة",
                ["دقيقتان", "دقيقتين"],
                "%d دقائق",
                "%d دقيقة",
                "%d دقيقة",
              ],
              h: [
                "أقل من ساعة",
                "ساعة واحدة",
                ["ساعتان", "ساعتين"],
                "%d ساعات",
                "%d ساعة",
                "%d ساعة",
              ],
              d: [
                "أقل من يوم",
                "يوم واحد",
                ["يومان", "يومين"],
                "%d أيام",
                "%d يومًا",
                "%d يوم",
              ],
              M: [
                "أقل من شهر",
                "شهر واحد",
                ["شهران", "شهرين"],
                "%d أشهر",
                "%d شهرا",
                "%d شهر",
              ],
              y: [
                "أقل من عام",
                "عام واحد",
                ["عامان", "عامين"],
                "%d أعوام",
                "%d عامًا",
                "%d عام",
              ],
            },
            s = function (e) {
              return function (t, s, i, r) {
                var o = n(t),
                  l = a[e][n(t)];
                return 2 === o && (l = l[s ? 0 : 1]), l.replace(/%d/i, t);
              };
            },
            i = [
              "يناير",
              "فبراير",
              "مارس",
              "أبريل",
              "مايو",
              "يونيو",
              "يوليو",
              "أغسطس",
              "سبتمبر",
              "أكتوبر",
              "نوفمبر",
              "ديسمبر",
            ];
          e.defineLocale("ar-ly", {
            months: i,
            monthsShort: i,
            weekdays:
              "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
            weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "D/‏M/‏YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            meridiemParse: /ص|م/,
            isPM: function (e) {
              return "م" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "ص" : "م";
            },
            calendar: {
              sameDay: "[اليوم عند الساعة] LT",
              nextDay: "[غدًا عند الساعة] LT",
              nextWeek: "dddd [عند الساعة] LT",
              lastDay: "[أمس عند الساعة] LT",
              lastWeek: "dddd [عند الساعة] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "بعد %s",
              past: "منذ %s",
              s: s("s"),
              ss: s("s"),
              m: s("m"),
              mm: s("m"),
              h: s("h"),
              hh: s("h"),
              d: s("d"),
              dd: s("d"),
              M: s("M"),
              MM: s("M"),
              y: s("y"),
              yy: s("y"),
            },
            preparse: function (e) {
              return e.replace(/،/g, ",");
            },
            postformat: function (e) {
              return e
                .replace(/\d/g, function (e) {
                  return t[e];
                })
                .replace(/,/g, "،");
            },
            week: { dow: 6, doy: 12 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ar-ma", {
            months:
              "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split(
                "_",
              ),
            monthsShort:
              "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split(
                "_",
              ),
            weekdays:
              "الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort: "احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),
            weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[اليوم على الساعة] LT",
              nextDay: "[غدا على الساعة] LT",
              nextWeek: "dddd [على الساعة] LT",
              lastDay: "[أمس على الساعة] LT",
              lastWeek: "dddd [على الساعة] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "في %s",
              past: "منذ %s",
              s: "ثوان",
              ss: "%d ثانية",
              m: "دقيقة",
              mm: "%d دقائق",
              h: "ساعة",
              hh: "%d ساعات",
              d: "يوم",
              dd: "%d أيام",
              M: "شهر",
              MM: "%d أشهر",
              y: "سنة",
              yy: "%d سنوات",
            },
            week: { dow: 6, doy: 12 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "١",
              2: "٢",
              3: "٣",
              4: "٤",
              5: "٥",
              6: "٦",
              7: "٧",
              8: "٨",
              9: "٩",
              0: "٠",
            },
            n = {
              "١": "1",
              "٢": "2",
              "٣": "3",
              "٤": "4",
              "٥": "5",
              "٦": "6",
              "٧": "7",
              "٨": "8",
              "٩": "9",
              "٠": "0",
            };
          e.defineLocale("ar-sa", {
            months:
              "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split(
                "_",
              ),
            monthsShort:
              "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split(
                "_",
              ),
            weekdays:
              "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
            weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            meridiemParse: /ص|م/,
            isPM: function (e) {
              return "م" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "ص" : "م";
            },
            calendar: {
              sameDay: "[اليوم على الساعة] LT",
              nextDay: "[غدا على الساعة] LT",
              nextWeek: "dddd [على الساعة] LT",
              lastDay: "[أمس على الساعة] LT",
              lastWeek: "dddd [على الساعة] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "في %s",
              past: "منذ %s",
              s: "ثوان",
              ss: "%d ثانية",
              m: "دقيقة",
              mm: "%d دقائق",
              h: "ساعة",
              hh: "%d ساعات",
              d: "يوم",
              dd: "%d أيام",
              M: "شهر",
              MM: "%d أشهر",
              y: "سنة",
              yy: "%d سنوات",
            },
            preparse: function (e) {
              return e
                .replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (e) {
                  return n[e];
                })
                .replace(/،/g, ",");
            },
            postformat: function (e) {
              return e
                .replace(/\d/g, function (e) {
                  return t[e];
                })
                .replace(/,/g, "،");
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ar-tn", {
            months:
              "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split(
                "_",
              ),
            monthsShort:
              "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split(
                "_",
              ),
            weekdays:
              "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
            weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
            weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[اليوم على الساعة] LT",
              nextDay: "[غدا على الساعة] LT",
              nextWeek: "dddd [على الساعة] LT",
              lastDay: "[أمس على الساعة] LT",
              lastWeek: "dddd [على الساعة] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "في %s",
              past: "منذ %s",
              s: "ثوان",
              ss: "%d ثانية",
              m: "دقيقة",
              mm: "%d دقائق",
              h: "ساعة",
              hh: "%d ساعات",
              d: "يوم",
              dd: "%d أيام",
              M: "شهر",
              MM: "%d أشهر",
              y: "سنة",
              yy: "%d سنوات",
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
            1: "-inci",
            5: "-inci",
            8: "-inci",
            70: "-inci",
            80: "-inci",
            2: "-nci",
            7: "-nci",
            20: "-nci",
            50: "-nci",
            3: "-üncü",
            4: "-üncü",
            100: "-üncü",
            6: "-ncı",
            9: "-uncu",
            10: "-uncu",
            30: "-uncu",
            60: "-ıncı",
            90: "-ıncı",
          };
          e.defineLocale("az", {
            months:
              "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split(
                "_",
              ),
            monthsShort:
              "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),
            weekdays:
              "Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split(
                "_",
              ),
            weekdaysShort: "Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"),
            weekdaysMin: "Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[bugün saat] LT",
              nextDay: "[sabah saat] LT",
              nextWeek: "[gələn həftə] dddd [saat] LT",
              lastDay: "[dünən] LT",
              lastWeek: "[keçən həftə] dddd [saat] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s sonra",
              past: "%s əvvəl",
              s: "birneçə saniyə",
              ss: "%d saniyə",
              m: "bir dəqiqə",
              mm: "%d dəqiqə",
              h: "bir saat",
              hh: "%d saat",
              d: "bir gün",
              dd: "%d gün",
              M: "bir ay",
              MM: "%d ay",
              y: "bir il",
              yy: "%d il",
            },
            meridiemParse: /gecə|səhər|gündüz|axşam/,
            isPM: function (e) {
              return /^(gündüz|axşam)$/.test(e);
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "gecə"
                : e < 12
                  ? "səhər"
                  : e < 17
                    ? "gündüz"
                    : "axşam";
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
            ordinal: function (e) {
              if (0 === e) return e + "-ıncı";
              var n = e % 10,
                a = (e % 100) - n,
                s = e >= 100 ? 100 : null;
              return e + (t[n] || t[a] || t[s]);
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t) {
            var n = e.split("_");
            return t % 10 == 1 && t % 100 != 11
              ? n[0]
              : t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 10 || t % 100 >= 20)
                ? n[1]
                : n[2];
          }
          function n(e, n, a) {
            return "m" === a
              ? n
                ? "хвіліна"
                : "хвіліну"
              : "h" === a
                ? n
                  ? "гадзіна"
                  : "гадзіну"
                : e +
                  " " +
                  t(
                    {
                      ss: n
                        ? "секунда_секунды_секунд"
                        : "секунду_секунды_секунд",
                      mm: n
                        ? "хвіліна_хвіліны_хвілін"
                        : "хвіліну_хвіліны_хвілін",
                      hh: n
                        ? "гадзіна_гадзіны_гадзін"
                        : "гадзіну_гадзіны_гадзін",
                      dd: "дзень_дні_дзён",
                      MM: "месяц_месяцы_месяцаў",
                      yy: "год_гады_гадоў",
                    }[a],
                    +e,
                  );
          }
          e.defineLocale("be", {
            months: {
              format:
                "студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня".split(
                  "_",
                ),
              standalone:
                "студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань".split(
                  "_",
                ),
            },
            monthsShort:
              "студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж".split(
                "_",
              ),
            weekdays: {
              format:
                "нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу".split(
                  "_",
                ),
              standalone:
                "нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота".split(
                  "_",
                ),
              isFormat: /\[ ?[Ууў] ?(?:мінулую|наступную)? ?\] ?dddd/,
            },
            weekdaysShort: "нд_пн_ат_ср_чц_пт_сб".split("_"),
            weekdaysMin: "нд_пн_ат_ср_чц_пт_сб".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY г.",
              LLL: "D MMMM YYYY г., HH:mm",
              LLLL: "dddd, D MMMM YYYY г., HH:mm",
            },
            calendar: {
              sameDay: "[Сёння ў] LT",
              nextDay: "[Заўтра ў] LT",
              lastDay: "[Учора ў] LT",
              nextWeek: function () {
                return "[У] dddd [ў] LT";
              },
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                  case 3:
                  case 5:
                  case 6:
                    return "[У мінулую] dddd [ў] LT";
                  case 1:
                  case 2:
                  case 4:
                    return "[У мінулы] dddd [ў] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "праз %s",
              past: "%s таму",
              s: "некалькі секунд",
              m: n,
              mm: n,
              h: n,
              hh: n,
              d: "дзень",
              dd: n,
              M: "месяц",
              MM: n,
              y: "год",
              yy: n,
            },
            meridiemParse: /ночы|раніцы|дня|вечара/,
            isPM: function (e) {
              return /^(дня|вечара)$/.test(e);
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "ночы"
                : e < 12
                  ? "раніцы"
                  : e < 17
                    ? "дня"
                    : "вечара";
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(і|ы|га)/,
            ordinal: function (e, t) {
              switch (t) {
                case "M":
                case "d":
                case "DDD":
                case "w":
                case "W":
                  return (e % 10 != 2 && e % 10 != 3) ||
                    e % 100 == 12 ||
                    e % 100 == 13
                    ? e + "-ы"
                    : e + "-і";
                case "D":
                  return e + "-га";
                default:
                  return e;
              }
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("bg", {
            months:
              "януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split(
                "_",
              ),
            monthsShort:
              "янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),
            weekdays:
              "неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split(
                "_",
              ),
            weekdaysShort: "нед_пон_вто_сря_чет_пет_съб".split("_"),
            weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "D.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY H:mm",
              LLLL: "dddd, D MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[Днес в] LT",
              nextDay: "[Утре в] LT",
              nextWeek: "dddd [в] LT",
              lastDay: "[Вчера в] LT",
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                  case 3:
                  case 6:
                    return "[В изминалата] dddd [в] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[В изминалия] dddd [в] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "след %s",
              past: "преди %s",
              s: "няколко секунди",
              ss: "%d секунди",
              m: "минута",
              mm: "%d минути",
              h: "час",
              hh: "%d часа",
              d: "ден",
              dd: "%d дни",
              M: "месец",
              MM: "%d месеца",
              y: "година",
              yy: "%d години",
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
            ordinal: function (e) {
              var t = e % 10,
                n = e % 100;
              return 0 === e
                ? e + "-ев"
                : 0 === n
                  ? e + "-ен"
                  : n > 10 && n < 20
                    ? e + "-ти"
                    : 1 === t
                      ? e + "-ви"
                      : 2 === t
                        ? e + "-ри"
                        : 7 === t || 8 === t
                          ? e + "-ми"
                          : e + "-ти";
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("bm", {
            months:
              "Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_Mɛkalo_Zuwɛnkalo_Zuluyekalo_Utikalo_Sɛtanburukalo_ɔkutɔburukalo_Nowanburukalo_Desanburukalo".split(
                "_",
              ),
            monthsShort: "Zan_Few_Mar_Awi_Mɛ_Zuw_Zul_Uti_Sɛt_ɔku_Now_Des".split(
              "_",
            ),
            weekdays: "Kari_Ntɛnɛn_Tarata_Araba_Alamisa_Juma_Sibiri".split("_"),
            weekdaysShort: "Kar_Ntɛ_Tar_Ara_Ala_Jum_Sib".split("_"),
            weekdaysMin: "Ka_Nt_Ta_Ar_Al_Ju_Si".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "MMMM [tile] D [san] YYYY",
              LLL: "MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm",
              LLLL: "dddd MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm",
            },
            calendar: {
              sameDay: "[Bi lɛrɛ] LT",
              nextDay: "[Sini lɛrɛ] LT",
              nextWeek: "dddd [don lɛrɛ] LT",
              lastDay: "[Kunu lɛrɛ] LT",
              lastWeek: "dddd [tɛmɛnen lɛrɛ] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s kɔnɔ",
              past: "a bɛ %s bɔ",
              s: "sanga dama dama",
              ss: "sekondi %d",
              m: "miniti kelen",
              mm: "miniti %d",
              h: "lɛrɛ kelen",
              hh: "lɛrɛ %d",
              d: "tile kelen",
              dd: "tile %d",
              M: "kalo kelen",
              MM: "kalo %d",
              y: "san kelen",
              yy: "san %d",
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "১",
              2: "২",
              3: "৩",
              4: "৪",
              5: "৫",
              6: "৬",
              7: "৭",
              8: "৮",
              9: "৯",
              0: "০",
            },
            n = {
              "১": "1",
              "২": "2",
              "৩": "3",
              "৪": "4",
              "৫": "5",
              "৬": "6",
              "৭": "7",
              "৮": "8",
              "৯": "9",
              "০": "0",
            };
          e.defineLocale("bn", {
            months:
              "জানুয়ারী_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split(
                "_",
              ),
            monthsShort:
              "জানু_ফেব_মার্চ_এপ্র_মে_জুন_জুল_আগ_সেপ্ট_অক্টো_নভে_ডিসে".split(
                "_",
              ),
            weekdays:
              "রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার".split(
                "_",
              ),
            weekdaysShort: "রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি".split("_"),
            weekdaysMin: "রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি".split("_"),
            longDateFormat: {
              LT: "A h:mm সময়",
              LTS: "A h:mm:ss সময়",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, A h:mm সময়",
              LLLL: "dddd, D MMMM YYYY, A h:mm সময়",
            },
            calendar: {
              sameDay: "[আজ] LT",
              nextDay: "[আগামীকাল] LT",
              nextWeek: "dddd, LT",
              lastDay: "[গতকাল] LT",
              lastWeek: "[গত] dddd, LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s পরে",
              past: "%s আগে",
              s: "কয়েক সেকেন্ড",
              ss: "%d সেকেন্ড",
              m: "এক মিনিট",
              mm: "%d মিনিট",
              h: "এক ঘন্টা",
              hh: "%d ঘন্টা",
              d: "এক দিন",
              dd: "%d দিন",
              M: "এক মাস",
              MM: "%d মাস",
              y: "এক বছর",
              yy: "%d বছর",
            },
            preparse: function (e) {
              return e.replace(/[১২৩৪৫৬৭৮৯০]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                ("রাত" === t && e >= 4) ||
                ("দুপুর" === t && e < 5) ||
                "বিকাল" === t
                  ? e + 12
                  : e
              );
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "রাত"
                : e < 10
                  ? "সকাল"
                  : e < 17
                    ? "দুপুর"
                    : e < 20
                      ? "বিকাল"
                      : "রাত";
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "༡",
              2: "༢",
              3: "༣",
              4: "༤",
              5: "༥",
              6: "༦",
              7: "༧",
              8: "༨",
              9: "༩",
              0: "༠",
            },
            n = {
              "༡": "1",
              "༢": "2",
              "༣": "3",
              "༤": "4",
              "༥": "5",
              "༦": "6",
              "༧": "7",
              "༨": "8",
              "༩": "9",
              "༠": "0",
            };
          e.defineLocale("bo", {
            months:
              "ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split(
                "_",
              ),
            monthsShort:
              "ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split(
                "_",
              ),
            weekdays:
              "གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་".split(
                "_",
              ),
            weekdaysShort:
              "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),
            weekdaysMin:
              "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),
            longDateFormat: {
              LT: "A h:mm",
              LTS: "A h:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, A h:mm",
              LLLL: "dddd, D MMMM YYYY, A h:mm",
            },
            calendar: {
              sameDay: "[དི་རིང] LT",
              nextDay: "[སང་ཉིན] LT",
              nextWeek: "[བདུན་ཕྲག་རྗེས་མ], LT",
              lastDay: "[ཁ་སང] LT",
              lastWeek: "[བདུན་ཕྲག་མཐའ་མ] dddd, LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s ལ་",
              past: "%s སྔན་ལ",
              s: "ལམ་སང",
              ss: "%d སྐར་ཆ།",
              m: "སྐར་མ་གཅིག",
              mm: "%d སྐར་མ",
              h: "ཆུ་ཚོད་གཅིག",
              hh: "%d ཆུ་ཚོད",
              d: "ཉིན་གཅིག",
              dd: "%d ཉིན་",
              M: "ཟླ་བ་གཅིག",
              MM: "%d ཟླ་བ",
              y: "ལོ་གཅིག",
              yy: "%d ལོ",
            },
            preparse: function (e) {
              return e.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                ("མཚན་མོ" === t && e >= 4) ||
                ("ཉིན་གུང" === t && e < 5) ||
                "དགོང་དག" === t
                  ? e + 12
                  : e
              );
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "མཚན་མོ"
                : e < 10
                  ? "ཞོགས་ཀས"
                  : e < 17
                    ? "ཉིན་གུང"
                    : e < 20
                      ? "དགོང་དག"
                      : "མཚན་མོ";
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n) {
            return (
              e + " " + s({ mm: "munutenn", MM: "miz", dd: "devezh" }[n], e)
            );
          }
          function n(e) {
            switch (a(e)) {
              case 1:
              case 3:
              case 4:
              case 5:
              case 9:
                return e + " bloaz";
              default:
                return e + " vloaz";
            }
          }
          function a(e) {
            return e > 9 ? a(e % 10) : e;
          }
          function s(e, t) {
            return 2 === t ? i(e) : e;
          }
          function i(e) {
            var t = { m: "v", b: "v", d: "z" };
            return void 0 === t[e.charAt(0)]
              ? e
              : t[e.charAt(0)] + e.substring(1);
          }
          e.defineLocale("br", {
            months:
              "Genver_C'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split(
                "_",
              ),
            monthsShort:
              "Gen_C'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),
            weekdays: "Sul_Lun_Meurzh_Merc'her_Yaou_Gwener_Sadorn".split("_"),
            weekdaysShort: "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),
            weekdaysMin: "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "h[e]mm A",
              LTS: "h[e]mm:ss A",
              L: "DD/MM/YYYY",
              LL: "D [a viz] MMMM YYYY",
              LLL: "D [a viz] MMMM YYYY h[e]mm A",
              LLLL: "dddd, D [a viz] MMMM YYYY h[e]mm A",
            },
            calendar: {
              sameDay: "[Hiziv da] LT",
              nextDay: "[Warc'hoazh da] LT",
              nextWeek: "dddd [da] LT",
              lastDay: "[Dec'h da] LT",
              lastWeek: "dddd [paset da] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "a-benn %s",
              past: "%s 'zo",
              s: "un nebeud segondennoù",
              ss: "%d eilenn",
              m: "ur vunutenn",
              mm: t,
              h: "un eur",
              hh: "%d eur",
              d: "un devezh",
              dd: t,
              M: "ur miz",
              MM: t,
              y: "ur bloaz",
              yy: n,
            },
            dayOfMonthOrdinalParse: /\d{1,2}(añ|vet)/,
            ordinal: function (e) {
              return e + (1 === e ? "añ" : "vet");
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n) {
            var a = e + " ";
            switch (n) {
              case "ss":
                return (a +=
                  1 === e
                    ? "sekunda"
                    : 2 === e || 3 === e || 4 === e
                      ? "sekunde"
                      : "sekundi");
              case "m":
                return t ? "jedna minuta" : "jedne minute";
              case "mm":
                return (a +=
                  1 === e
                    ? "minuta"
                    : 2 === e || 3 === e || 4 === e
                      ? "minute"
                      : "minuta");
              case "h":
                return t ? "jedan sat" : "jednog sata";
              case "hh":
                return (a +=
                  1 === e
                    ? "sat"
                    : 2 === e || 3 === e || 4 === e
                      ? "sata"
                      : "sati");
              case "dd":
                return (a += 1 === e ? "dan" : "dana");
              case "MM":
                return (a +=
                  1 === e
                    ? "mjesec"
                    : 2 === e || 3 === e || 4 === e
                      ? "mjeseca"
                      : "mjeseci");
              case "yy":
                return (a +=
                  1 === e
                    ? "godina"
                    : 2 === e || 3 === e || 4 === e
                      ? "godine"
                      : "godina");
            }
          }
          e.defineLocale("bs", {
            months:
              "januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar".split(
                "_",
              ),
            monthsShort:
              "jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split(
                "_",
              ),
            weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
            weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm",
              LLLL: "dddd, D. MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[danas u] LT",
              nextDay: "[sutra u] LT",
              nextWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[u] [nedjelju] [u] LT";
                  case 3:
                    return "[u] [srijedu] [u] LT";
                  case 6:
                    return "[u] [subotu] [u] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[u] dddd [u] LT";
                }
              },
              lastDay: "[jučer u] LT",
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                  case 3:
                    return "[prošlu] dddd [u] LT";
                  case 6:
                    return "[prošle] [subote] [u] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[prošli] dddd [u] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "za %s",
              past: "prije %s",
              s: "par sekundi",
              ss: t,
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: "dan",
              dd: t,
              M: "mjesec",
              MM: t,
              y: "godinu",
              yy: t,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ca", {
            months: {
              standalone:
                "gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre".split(
                  "_",
                ),
              format:
                "de gener_de febrer_de març_d'abril_de maig_de juny_de juliol_d'agost_de setembre_d'octubre_de novembre_de desembre".split(
                  "_",
                ),
              isFormat: /D[oD]?(\s)+MMMM/,
            },
            monthsShort:
              "gen._febr._març_abr._maig_juny_jul._ag._set._oct._nov._des.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte".split(
                "_",
              ),
            weekdaysShort: "dg._dl._dt._dc._dj._dv._ds.".split("_"),
            weekdaysMin: "dg_dl_dt_dc_dj_dv_ds".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM [de] YYYY",
              ll: "D MMM YYYY",
              LLL: "D MMMM [de] YYYY [a les] H:mm",
              lll: "D MMM YYYY, H:mm",
              LLLL: "dddd D MMMM [de] YYYY [a les] H:mm",
              llll: "ddd D MMM YYYY, H:mm",
            },
            calendar: {
              sameDay: function () {
                return (
                  "[avui a " + (1 !== this.hours() ? "les" : "la") + "] LT"
                );
              },
              nextDay: function () {
                return (
                  "[demà a " + (1 !== this.hours() ? "les" : "la") + "] LT"
                );
              },
              nextWeek: function () {
                return (
                  "dddd [a " + (1 !== this.hours() ? "les" : "la") + "] LT"
                );
              },
              lastDay: function () {
                return (
                  "[ahir a " + (1 !== this.hours() ? "les" : "la") + "] LT"
                );
              },
              lastWeek: function () {
                return (
                  "[el] dddd [passat a " +
                  (1 !== this.hours() ? "les" : "la") +
                  "] LT"
                );
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "d'aquí %s",
              past: "fa %s",
              s: "uns segons",
              ss: "%d segons",
              m: "un minut",
              mm: "%d minuts",
              h: "una hora",
              hh: "%d hores",
              d: "un dia",
              dd: "%d dies",
              M: "un mes",
              MM: "%d mesos",
              y: "un any",
              yy: "%d anys",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(r|n|t|è|a)/,
            ordinal: function (e, t) {
              var n =
                1 === e
                  ? "r"
                  : 2 === e
                    ? "n"
                    : 3 === e
                      ? "r"
                      : 4 === e
                        ? "t"
                        : "è";
              return ("w" !== t && "W" !== t) || (n = "a"), e + n;
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
              "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split(
                "_",
              ),
            n = "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_"),
            a = [
              /^led/i,
              /^úno/i,
              /^bře/i,
              /^dub/i,
              /^kvě/i,
              /^(čvn|červen$|června)/i,
              /^(čvc|červenec|července)/i,
              /^srp/i,
              /^zář/i,
              /^říj/i,
              /^lis/i,
              /^pro/i,
            ],
            s =
              /^(leden|únor|březen|duben|květen|červenec|července|červen|června|srpen|září|říjen|listopad|prosinec|led|úno|bře|dub|kvě|čvn|čvc|srp|zář|říj|lis|pro)/i;
          function i(e) {
            return e > 1 && e < 5 && 1 != ~~(e / 10);
          }
          function r(e, t, n, a) {
            var s = e + " ";
            switch (n) {
              case "s":
                return t || a ? "pár sekund" : "pár sekundami";
              case "ss":
                return t || a
                  ? s + (i(e) ? "sekundy" : "sekund")
                  : s + "sekundami";
              case "m":
                return t ? "minuta" : a ? "minutu" : "minutou";
              case "mm":
                return t || a
                  ? s + (i(e) ? "minuty" : "minut")
                  : s + "minutami";
              case "h":
                return t ? "hodina" : a ? "hodinu" : "hodinou";
              case "hh":
                return t || a
                  ? s + (i(e) ? "hodiny" : "hodin")
                  : s + "hodinami";
              case "d":
                return t || a ? "den" : "dnem";
              case "dd":
                return t || a ? s + (i(e) ? "dny" : "dní") : s + "dny";
              case "M":
                return t || a ? "měsíc" : "měsícem";
              case "MM":
                return t || a ? s + (i(e) ? "měsíce" : "měsíců") : s + "měsíci";
              case "y":
                return t || a ? "rok" : "rokem";
              case "yy":
                return t || a ? s + (i(e) ? "roky" : "let") : s + "lety";
            }
          }
          e.defineLocale("cs", {
            months: t,
            monthsShort: n,
            monthsRegex: s,
            monthsShortRegex: s,
            monthsStrictRegex:
              /^(leden|ledna|února|únor|březen|března|duben|dubna|květen|května|červenec|července|červen|června|srpen|srpna|září|říjen|října|listopadu|listopad|prosinec|prosince)/i,
            monthsShortStrictRegex:
              /^(led|úno|bře|dub|kvě|čvn|čvc|srp|zář|říj|lis|pro)/i,
            monthsParse: a,
            longMonthsParse: a,
            shortMonthsParse: a,
            weekdays: "neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split(
              "_",
            ),
            weekdaysShort: "ne_po_út_st_čt_pá_so".split("_"),
            weekdaysMin: "ne_po_út_st_čt_pá_so".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm",
              LLLL: "dddd D. MMMM YYYY H:mm",
              l: "D. M. YYYY",
            },
            calendar: {
              sameDay: "[dnes v] LT",
              nextDay: "[zítra v] LT",
              nextWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[v neděli v] LT";
                  case 1:
                  case 2:
                    return "[v] dddd [v] LT";
                  case 3:
                    return "[ve středu v] LT";
                  case 4:
                    return "[ve čtvrtek v] LT";
                  case 5:
                    return "[v pátek v] LT";
                  case 6:
                    return "[v sobotu v] LT";
                }
              },
              lastDay: "[včera v] LT",
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[minulou neděli v] LT";
                  case 1:
                  case 2:
                    return "[minulé] dddd [v] LT";
                  case 3:
                    return "[minulou středu v] LT";
                  case 4:
                  case 5:
                    return "[minulý] dddd [v] LT";
                  case 6:
                    return "[minulou sobotu v] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "za %s",
              past: "před %s",
              s: r,
              ss: r,
              m: r,
              mm: r,
              h: r,
              hh: r,
              d: r,
              dd: r,
              M: r,
              MM: r,
              y: r,
              yy: r,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("cv", {
            months:
              "кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав".split(
                "_",
              ),
            monthsShort:
              "кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш".split("_"),
            weekdays:
              "вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун".split(
                "_",
              ),
            weekdaysShort: "выр_тун_ытл_юн_кӗҫ_эрн_шӑм".split("_"),
            weekdaysMin: "вр_тн_ыт_юн_кҫ_эр_шм".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD-MM-YYYY",
              LL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]",
              LLL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm",
              LLLL: "dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm",
            },
            calendar: {
              sameDay: "[Паян] LT [сехетре]",
              nextDay: "[Ыран] LT [сехетре]",
              lastDay: "[Ӗнер] LT [сехетре]",
              nextWeek: "[Ҫитес] dddd LT [сехетре]",
              lastWeek: "[Иртнӗ] dddd LT [сехетре]",
              sameElse: "L",
            },
            relativeTime: {
              future: function (e) {
                return (
                  e +
                  (/сехет$/i.exec(e) ? "рен" : /ҫул$/i.exec(e) ? "тан" : "ран")
                );
              },
              past: "%s каялла",
              s: "пӗр-ик ҫеккунт",
              ss: "%d ҫеккунт",
              m: "пӗр минут",
              mm: "%d минут",
              h: "пӗр сехет",
              hh: "%d сехет",
              d: "пӗр кун",
              dd: "%d кун",
              M: "пӗр уйӑх",
              MM: "%d уйӑх",
              y: "пӗр ҫул",
              yy: "%d ҫул",
            },
            dayOfMonthOrdinalParse: /\d{1,2}-мӗш/,
            ordinal: "%d-мӗш",
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("cy", {
            months:
              "Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split(
                "_",
              ),
            monthsShort:
              "Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),
            weekdays:
              "Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split(
                "_",
              ),
            weekdaysShort: "Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),
            weekdaysMin: "Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Heddiw am] LT",
              nextDay: "[Yfory am] LT",
              nextWeek: "dddd [am] LT",
              lastDay: "[Ddoe am] LT",
              lastWeek: "dddd [diwethaf am] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "mewn %s",
              past: "%s yn ôl",
              s: "ychydig eiliadau",
              ss: "%d eiliad",
              m: "munud",
              mm: "%d munud",
              h: "awr",
              hh: "%d awr",
              d: "diwrnod",
              dd: "%d diwrnod",
              M: "mis",
              MM: "%d mis",
              y: "blwyddyn",
              yy: "%d flynedd",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
            ordinal: function (e) {
              var t = "";
              return (
                e > 20
                  ? (t =
                      40 === e || 50 === e || 60 === e || 80 === e || 100 === e
                        ? "fed"
                        : "ain")
                  : e > 0 &&
                    (t = [
                      "",
                      "af",
                      "il",
                      "ydd",
                      "ydd",
                      "ed",
                      "ed",
                      "ed",
                      "fed",
                      "fed",
                      "fed",
                      "eg",
                      "fed",
                      "eg",
                      "eg",
                      "fed",
                      "eg",
                      "eg",
                      "fed",
                      "eg",
                      "fed",
                    ][e]),
                e + t
              );
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("da", {
            months:
              "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split(
                "_",
              ),
            monthsShort:
              "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
            weekdays:
              "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
            weekdaysShort: "søn_man_tir_ons_tor_fre_lør".split("_"),
            weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY HH:mm",
              LLLL: "dddd [d.] D. MMMM YYYY [kl.] HH:mm",
            },
            calendar: {
              sameDay: "[i dag kl.] LT",
              nextDay: "[i morgen kl.] LT",
              nextWeek: "på dddd [kl.] LT",
              lastDay: "[i går kl.] LT",
              lastWeek: "[i] dddd[s kl.] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "om %s",
              past: "%s siden",
              s: "få sekunder",
              ss: "%d sekunder",
              m: "et minut",
              mm: "%d minutter",
              h: "en time",
              hh: "%d timer",
              d: "en dag",
              dd: "%d dage",
              M: "en måned",
              MM: "%d måneder",
              y: "et år",
              yy: "%d år",
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n, a) {
            var s = {
              m: ["eine Minute", "einer Minute"],
              h: ["eine Stunde", "einer Stunde"],
              d: ["ein Tag", "einem Tag"],
              dd: [e + " Tage", e + " Tagen"],
              M: ["ein Monat", "einem Monat"],
              MM: [e + " Monate", e + " Monaten"],
              y: ["ein Jahr", "einem Jahr"],
              yy: [e + " Jahre", e + " Jahren"],
            };
            return t ? s[n][0] : s[n][1];
          }
          e.defineLocale("de", {
            months:
              "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split(
                "_",
              ),
            monthsShort:
              "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split(
                "_",
              ),
            weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
            weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY HH:mm",
              LLLL: "dddd, D. MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[heute um] LT [Uhr]",
              sameElse: "L",
              nextDay: "[morgen um] LT [Uhr]",
              nextWeek: "dddd [um] LT [Uhr]",
              lastDay: "[gestern um] LT [Uhr]",
              lastWeek: "[letzten] dddd [um] LT [Uhr]",
            },
            relativeTime: {
              future: "in %s",
              past: "vor %s",
              s: "ein paar Sekunden",
              ss: "%d Sekunden",
              m: t,
              mm: "%d Minuten",
              h: t,
              hh: "%d Stunden",
              d: t,
              dd: t,
              M: t,
              MM: t,
              y: t,
              yy: t,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n, a) {
            var s = {
              m: ["eine Minute", "einer Minute"],
              h: ["eine Stunde", "einer Stunde"],
              d: ["ein Tag", "einem Tag"],
              dd: [e + " Tage", e + " Tagen"],
              M: ["ein Monat", "einem Monat"],
              MM: [e + " Monate", e + " Monaten"],
              y: ["ein Jahr", "einem Jahr"],
              yy: [e + " Jahre", e + " Jahren"],
            };
            return t ? s[n][0] : s[n][1];
          }
          e.defineLocale("de-at", {
            months:
              "Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split(
                "_",
              ),
            monthsShort:
              "Jän._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split(
                "_",
              ),
            weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
            weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY HH:mm",
              LLLL: "dddd, D. MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[heute um] LT [Uhr]",
              sameElse: "L",
              nextDay: "[morgen um] LT [Uhr]",
              nextWeek: "dddd [um] LT [Uhr]",
              lastDay: "[gestern um] LT [Uhr]",
              lastWeek: "[letzten] dddd [um] LT [Uhr]",
            },
            relativeTime: {
              future: "in %s",
              past: "vor %s",
              s: "ein paar Sekunden",
              ss: "%d Sekunden",
              m: t,
              mm: "%d Minuten",
              h: t,
              hh: "%d Stunden",
              d: t,
              dd: t,
              M: t,
              MM: t,
              y: t,
              yy: t,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n, a) {
            var s = {
              m: ["eine Minute", "einer Minute"],
              h: ["eine Stunde", "einer Stunde"],
              d: ["ein Tag", "einem Tag"],
              dd: [e + " Tage", e + " Tagen"],
              M: ["ein Monat", "einem Monat"],
              MM: [e + " Monate", e + " Monaten"],
              y: ["ein Jahr", "einem Jahr"],
              yy: [e + " Jahre", e + " Jahren"],
            };
            return t ? s[n][0] : s[n][1];
          }
          e.defineLocale("de-ch", {
            months:
              "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split(
                "_",
              ),
            monthsShort:
              "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split(
                "_",
              ),
            weekdaysShort: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
            weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY HH:mm",
              LLLL: "dddd, D. MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[heute um] LT [Uhr]",
              sameElse: "L",
              nextDay: "[morgen um] LT [Uhr]",
              nextWeek: "dddd [um] LT [Uhr]",
              lastDay: "[gestern um] LT [Uhr]",
              lastWeek: "[letzten] dddd [um] LT [Uhr]",
            },
            relativeTime: {
              future: "in %s",
              past: "vor %s",
              s: "ein paar Sekunden",
              ss: "%d Sekunden",
              m: t,
              mm: "%d Minuten",
              h: t,
              hh: "%d Stunden",
              d: t,
              dd: t,
              M: t,
              MM: t,
              y: t,
              yy: t,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = [
              "ޖެނުއަރީ",
              "ފެބްރުއަރީ",
              "މާރިޗު",
              "އޭޕްރީލު",
              "މޭ",
              "ޖޫން",
              "ޖުލައި",
              "އޯގަސްޓު",
              "ސެޕްޓެމްބަރު",
              "އޮކްޓޯބަރު",
              "ނޮވެމްބަރު",
              "ޑިސެމްބަރު",
            ],
            n = [
              "އާދިއްތަ",
              "ހޯމަ",
              "އަންގާރަ",
              "ބުދަ",
              "ބުރާސްފަތި",
              "ހުކުރު",
              "ހޮނިހިރު",
            ];
          e.defineLocale("dv", {
            months: t,
            monthsShort: t,
            weekdays: n,
            weekdaysShort: n,
            weekdaysMin: "އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "D/M/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            meridiemParse: /މކ|މފ/,
            isPM: function (e) {
              return "މފ" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "މކ" : "މފ";
            },
            calendar: {
              sameDay: "[މިއަދު] LT",
              nextDay: "[މާދަމާ] LT",
              nextWeek: "dddd LT",
              lastDay: "[އިއްޔެ] LT",
              lastWeek: "[ފާއިތުވި] dddd LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "ތެރޭގައި %s",
              past: "ކުރިން %s",
              s: "ސިކުންތުކޮޅެއް",
              ss: "d% ސިކުންތު",
              m: "މިނިޓެއް",
              mm: "މިނިޓު %d",
              h: "ގަޑިއިރެއް",
              hh: "ގަޑިއިރު %d",
              d: "ދުވަހެއް",
              dd: "ދުވަސް %d",
              M: "މަހެއް",
              MM: "މަސް %d",
              y: "އަހަރެއް",
              yy: "އަހަރު %d",
            },
            preparse: function (e) {
              return e.replace(/،/g, ",");
            },
            postformat: function (e) {
              return e.replace(/,/g, "،");
            },
            week: { dow: 7, doy: 12 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e) {
            return (
              e instanceof Function ||
              "[object Function]" === Object.prototype.toString.call(e)
            );
          }
          e.defineLocale("el", {
            monthsNominativeEl:
              "Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split(
                "_",
              ),
            monthsGenitiveEl:
              "Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου".split(
                "_",
              ),
            months: function (e, t) {
              return e
                ? "string" == typeof t &&
                  /D/.test(t.substring(0, t.indexOf("MMMM")))
                  ? this._monthsGenitiveEl[e.month()]
                  : this._monthsNominativeEl[e.month()]
                : this._monthsNominativeEl;
            },
            monthsShort:
              "Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ".split("_"),
            weekdays:
              "Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split(
                "_",
              ),
            weekdaysShort: "Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),
            weekdaysMin: "Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),
            meridiem: function (e, t, n) {
              return e > 11 ? (n ? "μμ" : "ΜΜ") : n ? "πμ" : "ΠΜ";
            },
            isPM: function (e) {
              return "μ" === (e + "").toLowerCase()[0];
            },
            meridiemParse: /[ΠΜ]\.?Μ?\.?/i,
            longDateFormat: {
              LT: "h:mm A",
              LTS: "h:mm:ss A",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY h:mm A",
              LLLL: "dddd, D MMMM YYYY h:mm A",
            },
            calendarEl: {
              sameDay: "[Σήμερα {}] LT",
              nextDay: "[Αύριο {}] LT",
              nextWeek: "dddd [{}] LT",
              lastDay: "[Χθες {}] LT",
              lastWeek: function () {
                return 6 === this.day()
                  ? "[το προηγούμενο] dddd [{}] LT"
                  : "[την προηγούμενη] dddd [{}] LT";
              },
              sameElse: "L",
            },
            calendar: function (e, n) {
              var a = this._calendarEl[e],
                s = n && n.hours();
              return (
                t(a) && (a = a.apply(n)),
                a.replace("{}", s % 12 == 1 ? "στη" : "στις")
              );
            },
            relativeTime: {
              future: "σε %s",
              past: "%s πριν",
              s: "λίγα δευτερόλεπτα",
              ss: "%d δευτερόλεπτα",
              m: "ένα λεπτό",
              mm: "%d λεπτά",
              h: "μία ώρα",
              hh: "%d ώρες",
              d: "μία μέρα",
              dd: "%d μέρες",
              M: "ένας μήνας",
              MM: "%d μήνες",
              y: "ένας χρόνος",
              yy: "%d χρόνια",
            },
            dayOfMonthOrdinalParse: /\d{1,2}η/,
            ordinal: "%dη",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("en-SG", {
            months:
              "January_February_March_April_May_June_July_August_September_October_November_December".split(
                "_",
              ),
            monthsShort:
              "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            weekdays:
              "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                "_",
              ),
            weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Today at] LT",
              nextDay: "[Tomorrow at] LT",
              nextWeek: "dddd [at] LT",
              lastDay: "[Yesterday at] LT",
              lastWeek: "[Last] dddd [at] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "in %s",
              past: "%s ago",
              s: "a few seconds",
              ss: "%d seconds",
              m: "a minute",
              mm: "%d minutes",
              h: "an hour",
              hh: "%d hours",
              d: "a day",
              dd: "%d days",
              M: "a month",
              MM: "%d months",
              y: "a year",
              yy: "%d years",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e) {
              var t = e % 10;
              return (
                e +
                (1 == ~~((e % 100) / 10)
                  ? "th"
                  : 1 === t
                    ? "st"
                    : 2 === t
                      ? "nd"
                      : 3 === t
                        ? "rd"
                        : "th")
              );
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("en-au", {
            months:
              "January_February_March_April_May_June_July_August_September_October_November_December".split(
                "_",
              ),
            monthsShort:
              "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            weekdays:
              "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                "_",
              ),
            weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            longDateFormat: {
              LT: "h:mm A",
              LTS: "h:mm:ss A",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY h:mm A",
              LLLL: "dddd, D MMMM YYYY h:mm A",
            },
            calendar: {
              sameDay: "[Today at] LT",
              nextDay: "[Tomorrow at] LT",
              nextWeek: "dddd [at] LT",
              lastDay: "[Yesterday at] LT",
              lastWeek: "[Last] dddd [at] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "in %s",
              past: "%s ago",
              s: "a few seconds",
              ss: "%d seconds",
              m: "a minute",
              mm: "%d minutes",
              h: "an hour",
              hh: "%d hours",
              d: "a day",
              dd: "%d days",
              M: "a month",
              MM: "%d months",
              y: "a year",
              yy: "%d years",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e) {
              var t = e % 10;
              return (
                e +
                (1 == ~~((e % 100) / 10)
                  ? "th"
                  : 1 === t
                    ? "st"
                    : 2 === t
                      ? "nd"
                      : 3 === t
                        ? "rd"
                        : "th")
              );
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("en-ca", {
            months:
              "January_February_March_April_May_June_July_August_September_October_November_December".split(
                "_",
              ),
            monthsShort:
              "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            weekdays:
              "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                "_",
              ),
            weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            longDateFormat: {
              LT: "h:mm A",
              LTS: "h:mm:ss A",
              L: "YYYY-MM-DD",
              LL: "MMMM D, YYYY",
              LLL: "MMMM D, YYYY h:mm A",
              LLLL: "dddd, MMMM D, YYYY h:mm A",
            },
            calendar: {
              sameDay: "[Today at] LT",
              nextDay: "[Tomorrow at] LT",
              nextWeek: "dddd [at] LT",
              lastDay: "[Yesterday at] LT",
              lastWeek: "[Last] dddd [at] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "in %s",
              past: "%s ago",
              s: "a few seconds",
              ss: "%d seconds",
              m: "a minute",
              mm: "%d minutes",
              h: "an hour",
              hh: "%d hours",
              d: "a day",
              dd: "%d days",
              M: "a month",
              MM: "%d months",
              y: "a year",
              yy: "%d years",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e) {
              var t = e % 10;
              return (
                e +
                (1 == ~~((e % 100) / 10)
                  ? "th"
                  : 1 === t
                    ? "st"
                    : 2 === t
                      ? "nd"
                      : 3 === t
                        ? "rd"
                        : "th")
              );
            },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("en-gb", {
            months:
              "January_February_March_April_May_June_July_August_September_October_November_December".split(
                "_",
              ),
            monthsShort:
              "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            weekdays:
              "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                "_",
              ),
            weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Today at] LT",
              nextDay: "[Tomorrow at] LT",
              nextWeek: "dddd [at] LT",
              lastDay: "[Yesterday at] LT",
              lastWeek: "[Last] dddd [at] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "in %s",
              past: "%s ago",
              s: "a few seconds",
              ss: "%d seconds",
              m: "a minute",
              mm: "%d minutes",
              h: "an hour",
              hh: "%d hours",
              d: "a day",
              dd: "%d days",
              M: "a month",
              MM: "%d months",
              y: "a year",
              yy: "%d years",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e) {
              var t = e % 10;
              return (
                e +
                (1 == ~~((e % 100) / 10)
                  ? "th"
                  : 1 === t
                    ? "st"
                    : 2 === t
                      ? "nd"
                      : 3 === t
                        ? "rd"
                        : "th")
              );
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("en-ie", {
            months:
              "January_February_March_April_May_June_July_August_September_October_November_December".split(
                "_",
              ),
            monthsShort:
              "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            weekdays:
              "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                "_",
              ),
            weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Today at] LT",
              nextDay: "[Tomorrow at] LT",
              nextWeek: "dddd [at] LT",
              lastDay: "[Yesterday at] LT",
              lastWeek: "[Last] dddd [at] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "in %s",
              past: "%s ago",
              s: "a few seconds",
              ss: "%d seconds",
              m: "a minute",
              mm: "%d minutes",
              h: "an hour",
              hh: "%d hours",
              d: "a day",
              dd: "%d days",
              M: "a month",
              MM: "%d months",
              y: "a year",
              yy: "%d years",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e) {
              var t = e % 10;
              return (
                e +
                (1 == ~~((e % 100) / 10)
                  ? "th"
                  : 1 === t
                    ? "st"
                    : 2 === t
                      ? "nd"
                      : 3 === t
                        ? "rd"
                        : "th")
              );
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("en-il", {
            months:
              "January_February_March_April_May_June_July_August_September_October_November_December".split(
                "_",
              ),
            monthsShort:
              "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            weekdays:
              "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                "_",
              ),
            weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Today at] LT",
              nextDay: "[Tomorrow at] LT",
              nextWeek: "dddd [at] LT",
              lastDay: "[Yesterday at] LT",
              lastWeek: "[Last] dddd [at] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "in %s",
              past: "%s ago",
              s: "a few seconds",
              m: "a minute",
              mm: "%d minutes",
              h: "an hour",
              hh: "%d hours",
              d: "a day",
              dd: "%d days",
              M: "a month",
              MM: "%d months",
              y: "a year",
              yy: "%d years",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e) {
              var t = e % 10;
              return (
                e +
                (1 == ~~((e % 100) / 10)
                  ? "th"
                  : 1 === t
                    ? "st"
                    : 2 === t
                      ? "nd"
                      : 3 === t
                        ? "rd"
                        : "th")
              );
            },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("en-nz", {
            months:
              "January_February_March_April_May_June_July_August_September_October_November_December".split(
                "_",
              ),
            monthsShort:
              "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            weekdays:
              "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
                "_",
              ),
            weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
            longDateFormat: {
              LT: "h:mm A",
              LTS: "h:mm:ss A",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY h:mm A",
              LLLL: "dddd, D MMMM YYYY h:mm A",
            },
            calendar: {
              sameDay: "[Today at] LT",
              nextDay: "[Tomorrow at] LT",
              nextWeek: "dddd [at] LT",
              lastDay: "[Yesterday at] LT",
              lastWeek: "[Last] dddd [at] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "in %s",
              past: "%s ago",
              s: "a few seconds",
              ss: "%d seconds",
              m: "a minute",
              mm: "%d minutes",
              h: "an hour",
              hh: "%d hours",
              d: "a day",
              dd: "%d days",
              M: "a month",
              MM: "%d months",
              y: "a year",
              yy: "%d years",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e) {
              var t = e % 10;
              return (
                e +
                (1 == ~~((e % 100) / 10)
                  ? "th"
                  : 1 === t
                    ? "st"
                    : 2 === t
                      ? "nd"
                      : 3 === t
                        ? "rd"
                        : "th")
              );
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("eo", {
            months:
              "januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split(
                "_",
              ),
            monthsShort:
              "jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),
            weekdays:
              "dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato".split("_"),
            weekdaysShort: "dim_lun_mard_merk_ĵaŭ_ven_sab".split("_"),
            weekdaysMin: "di_lu_ma_me_ĵa_ve_sa".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "YYYY-MM-DD",
              LL: "D[-a de] MMMM, YYYY",
              LLL: "D[-a de] MMMM, YYYY HH:mm",
              LLLL: "dddd, [la] D[-a de] MMMM, YYYY HH:mm",
            },
            meridiemParse: /[ap]\.t\.m/i,
            isPM: function (e) {
              return "p" === e.charAt(0).toLowerCase();
            },
            meridiem: function (e, t, n) {
              return e > 11
                ? n
                  ? "p.t.m."
                  : "P.T.M."
                : n
                  ? "a.t.m."
                  : "A.T.M.";
            },
            calendar: {
              sameDay: "[Hodiaŭ je] LT",
              nextDay: "[Morgaŭ je] LT",
              nextWeek: "dddd [je] LT",
              lastDay: "[Hieraŭ je] LT",
              lastWeek: "[pasinta] dddd [je] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "post %s",
              past: "antaŭ %s",
              s: "sekundoj",
              ss: "%d sekundoj",
              m: "minuto",
              mm: "%d minutoj",
              h: "horo",
              hh: "%d horoj",
              d: "tago",
              dd: "%d tagoj",
              M: "monato",
              MM: "%d monatoj",
              y: "jaro",
              yy: "%d jaroj",
            },
            dayOfMonthOrdinalParse: /\d{1,2}a/,
            ordinal: "%da",
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
              "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split(
                "_",
              ),
            n = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
            a = [
              /^ene/i,
              /^feb/i,
              /^mar/i,
              /^abr/i,
              /^may/i,
              /^jun/i,
              /^jul/i,
              /^ago/i,
              /^sep/i,
              /^oct/i,
              /^nov/i,
              /^dic/i,
            ],
            s =
              /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
          e.defineLocale("es", {
            months:
              "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split(
                "_",
              ),
            monthsShort: function (e, a) {
              return e ? (/-MMM-/.test(a) ? n[e.month()] : t[e.month()]) : t;
            },
            monthsRegex: s,
            monthsShortRegex: s,
            monthsStrictRegex:
              /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
            monthsShortStrictRegex:
              /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
            monthsParse: a,
            longMonthsParse: a,
            shortMonthsParse: a,
            weekdays:
              "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
            weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
            weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D [de] MMMM [de] YYYY",
              LLL: "D [de] MMMM [de] YYYY H:mm",
              LLLL: "dddd, D [de] MMMM [de] YYYY H:mm",
            },
            calendar: {
              sameDay: function () {
                return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT";
              },
              nextDay: function () {
                return (
                  "[mañana a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                );
              },
              nextWeek: function () {
                return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT";
              },
              lastDay: function () {
                return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT";
              },
              lastWeek: function () {
                return (
                  "[el] dddd [pasado a la" +
                  (1 !== this.hours() ? "s" : "") +
                  "] LT"
                );
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "en %s",
              past: "hace %s",
              s: "unos segundos",
              ss: "%d segundos",
              m: "un minuto",
              mm: "%d minutos",
              h: "una hora",
              hh: "%d horas",
              d: "un día",
              dd: "%d días",
              M: "un mes",
              MM: "%d meses",
              y: "un año",
              yy: "%d años",
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
              "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split(
                "_",
              ),
            n = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
            a = [
              /^ene/i,
              /^feb/i,
              /^mar/i,
              /^abr/i,
              /^may/i,
              /^jun/i,
              /^jul/i,
              /^ago/i,
              /^sep/i,
              /^oct/i,
              /^nov/i,
              /^dic/i,
            ],
            s =
              /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
          e.defineLocale("es-do", {
            months:
              "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split(
                "_",
              ),
            monthsShort: function (e, a) {
              return e ? (/-MMM-/.test(a) ? n[e.month()] : t[e.month()]) : t;
            },
            monthsRegex: s,
            monthsShortRegex: s,
            monthsStrictRegex:
              /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
            monthsShortStrictRegex:
              /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
            monthsParse: a,
            longMonthsParse: a,
            shortMonthsParse: a,
            weekdays:
              "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
            weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
            weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "h:mm A",
              LTS: "h:mm:ss A",
              L: "DD/MM/YYYY",
              LL: "D [de] MMMM [de] YYYY",
              LLL: "D [de] MMMM [de] YYYY h:mm A",
              LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A",
            },
            calendar: {
              sameDay: function () {
                return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT";
              },
              nextDay: function () {
                return (
                  "[mañana a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                );
              },
              nextWeek: function () {
                return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT";
              },
              lastDay: function () {
                return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT";
              },
              lastWeek: function () {
                return (
                  "[el] dddd [pasado a la" +
                  (1 !== this.hours() ? "s" : "") +
                  "] LT"
                );
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "en %s",
              past: "hace %s",
              s: "unos segundos",
              ss: "%d segundos",
              m: "un minuto",
              mm: "%d minutos",
              h: "una hora",
              hh: "%d horas",
              d: "un día",
              dd: "%d días",
              M: "un mes",
              MM: "%d meses",
              y: "un año",
              yy: "%d años",
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
              "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split(
                "_",
              ),
            n = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
            a = [
              /^ene/i,
              /^feb/i,
              /^mar/i,
              /^abr/i,
              /^may/i,
              /^jun/i,
              /^jul/i,
              /^ago/i,
              /^sep/i,
              /^oct/i,
              /^nov/i,
              /^dic/i,
            ],
            s =
              /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
          e.defineLocale("es-us", {
            months:
              "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split(
                "_",
              ),
            monthsShort: function (e, a) {
              return e ? (/-MMM-/.test(a) ? n[e.month()] : t[e.month()]) : t;
            },
            monthsRegex: s,
            monthsShortRegex: s,
            monthsStrictRegex:
              /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
            monthsShortStrictRegex:
              /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
            monthsParse: a,
            longMonthsParse: a,
            shortMonthsParse: a,
            weekdays:
              "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
            weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
            weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "h:mm A",
              LTS: "h:mm:ss A",
              L: "MM/DD/YYYY",
              LL: "D [de] MMMM [de] YYYY",
              LLL: "D [de] MMMM [de] YYYY h:mm A",
              LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A",
            },
            calendar: {
              sameDay: function () {
                return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT";
              },
              nextDay: function () {
                return (
                  "[mañana a la" + (1 !== this.hours() ? "s" : "") + "] LT"
                );
              },
              nextWeek: function () {
                return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT";
              },
              lastDay: function () {
                return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT";
              },
              lastWeek: function () {
                return (
                  "[el] dddd [pasado a la" +
                  (1 !== this.hours() ? "s" : "") +
                  "] LT"
                );
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "en %s",
              past: "hace %s",
              s: "unos segundos",
              ss: "%d segundos",
              m: "un minuto",
              mm: "%d minutos",
              h: "una hora",
              hh: "%d horas",
              d: "un día",
              dd: "%d días",
              M: "un mes",
              MM: "%d meses",
              y: "un año",
              yy: "%d años",
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week: { dow: 0, doy: 6 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n, a) {
            var s = {
              s: ["mõne sekundi", "mõni sekund", "paar sekundit"],
              ss: [e + "sekundi", e + "sekundit"],
              m: ["ühe minuti", "üks minut"],
              mm: [e + " minuti", e + " minutit"],
              h: ["ühe tunni", "tund aega", "üks tund"],
              hh: [e + " tunni", e + " tundi"],
              d: ["ühe päeva", "üks päev"],
              M: ["kuu aja", "kuu aega", "üks kuu"],
              MM: [e + " kuu", e + " kuud"],
              y: ["ühe aasta", "aasta", "üks aasta"],
              yy: [e + " aasta", e + " aastat"],
            };
            return t ? (s[n][2] ? s[n][2] : s[n][1]) : a ? s[n][0] : s[n][1];
          }
          e.defineLocale("et", {
            months:
              "jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split(
                "_",
              ),
            monthsShort:
              "jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split(
                "_",
              ),
            weekdays:
              "pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split(
                "_",
              ),
            weekdaysShort: "P_E_T_K_N_R_L".split("_"),
            weekdaysMin: "P_E_T_K_N_R_L".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm",
              LLLL: "dddd, D. MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[Täna,] LT",
              nextDay: "[Homme,] LT",
              nextWeek: "[Järgmine] dddd LT",
              lastDay: "[Eile,] LT",
              lastWeek: "[Eelmine] dddd LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s pärast",
              past: "%s tagasi",
              s: t,
              ss: t,
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: t,
              dd: "%d päeva",
              M: t,
              MM: t,
              y: t,
              yy: t,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("eu", {
            months:
              "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split(
                "_",
              ),
            monthsShort:
              "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split(
                "_",
              ),
            weekdaysShort: "ig._al._ar._az._og._ol._lr.".split("_"),
            weekdaysMin: "ig_al_ar_az_og_ol_lr".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "YYYY-MM-DD",
              LL: "YYYY[ko] MMMM[ren] D[a]",
              LLL: "YYYY[ko] MMMM[ren] D[a] HH:mm",
              LLLL: "dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",
              l: "YYYY-M-D",
              ll: "YYYY[ko] MMM D[a]",
              lll: "YYYY[ko] MMM D[a] HH:mm",
              llll: "ddd, YYYY[ko] MMM D[a] HH:mm",
            },
            calendar: {
              sameDay: "[gaur] LT[etan]",
              nextDay: "[bihar] LT[etan]",
              nextWeek: "dddd LT[etan]",
              lastDay: "[atzo] LT[etan]",
              lastWeek: "[aurreko] dddd LT[etan]",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s barru",
              past: "duela %s",
              s: "segundo batzuk",
              ss: "%d segundo",
              m: "minutu bat",
              mm: "%d minutu",
              h: "ordu bat",
              hh: "%d ordu",
              d: "egun bat",
              dd: "%d egun",
              M: "hilabete bat",
              MM: "%d hilabete",
              y: "urte bat",
              yy: "%d urte",
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "۱",
              2: "۲",
              3: "۳",
              4: "۴",
              5: "۵",
              6: "۶",
              7: "۷",
              8: "۸",
              9: "۹",
              0: "۰",
            },
            n = {
              "۱": "1",
              "۲": "2",
              "۳": "3",
              "۴": "4",
              "۵": "5",
              "۶": "6",
              "۷": "7",
              "۸": "8",
              "۹": "9",
              "۰": "0",
            };
          e.defineLocale("fa", {
            months:
              "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split(
                "_",
              ),
            monthsShort:
              "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split(
                "_",
              ),
            weekdays:
              "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
            weekdaysShort:
              "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
            weekdaysMin: "ی_د_س_چ_پ_ج_ش".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            meridiemParse: /قبل از ظهر|بعد از ظهر/,
            isPM: function (e) {
              return /بعد از ظهر/.test(e);
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "قبل از ظهر" : "بعد از ظهر";
            },
            calendar: {
              sameDay: "[امروز ساعت] LT",
              nextDay: "[فردا ساعت] LT",
              nextWeek: "dddd [ساعت] LT",
              lastDay: "[دیروز ساعت] LT",
              lastWeek: "dddd [پیش] [ساعت] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "در %s",
              past: "%s پیش",
              s: "چند ثانیه",
              ss: "ثانیه d%",
              m: "یک دقیقه",
              mm: "%d دقیقه",
              h: "یک ساعت",
              hh: "%d ساعت",
              d: "یک روز",
              dd: "%d روز",
              M: "یک ماه",
              MM: "%d ماه",
              y: "یک سال",
              yy: "%d سال",
            },
            preparse: function (e) {
              return e
                .replace(/[۰-۹]/g, function (e) {
                  return n[e];
                })
                .replace(/،/g, ",");
            },
            postformat: function (e) {
              return e
                .replace(/\d/g, function (e) {
                  return t[e];
                })
                .replace(/,/g, "،");
            },
            dayOfMonthOrdinalParse: /\d{1,2}م/,
            ordinal: "%dم",
            week: { dow: 6, doy: 12 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
              "nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän".split(
                " ",
              ),
            n = [
              "nolla",
              "yhden",
              "kahden",
              "kolmen",
              "neljän",
              "viiden",
              "kuuden",
              t[7],
              t[8],
              t[9],
            ];
          function a(e, t, n, a) {
            var i = "";
            switch (n) {
              case "s":
                return a ? "muutaman sekunnin" : "muutama sekunti";
              case "ss":
                return a ? "sekunnin" : "sekuntia";
              case "m":
                return a ? "minuutin" : "minuutti";
              case "mm":
                i = a ? "minuutin" : "minuuttia";
                break;
              case "h":
                return a ? "tunnin" : "tunti";
              case "hh":
                i = a ? "tunnin" : "tuntia";
                break;
              case "d":
                return a ? "päivän" : "päivä";
              case "dd":
                i = a ? "päivän" : "päivää";
                break;
              case "M":
                return a ? "kuukauden" : "kuukausi";
              case "MM":
                i = a ? "kuukauden" : "kuukautta";
                break;
              case "y":
                return a ? "vuoden" : "vuosi";
              case "yy":
                i = a ? "vuoden" : "vuotta";
            }
            return (i = s(e, a) + " " + i);
          }
          function s(e, a) {
            return e < 10 ? (a ? n[e] : t[e]) : e;
          }
          e.defineLocale("fi", {
            months:
              "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split(
                "_",
              ),
            monthsShort:
              "tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split(
                "_",
              ),
            weekdays:
              "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split(
                "_",
              ),
            weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"),
            weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"),
            longDateFormat: {
              LT: "HH.mm",
              LTS: "HH.mm.ss",
              L: "DD.MM.YYYY",
              LL: "Do MMMM[ta] YYYY",
              LLL: "Do MMMM[ta] YYYY, [klo] HH.mm",
              LLLL: "dddd, Do MMMM[ta] YYYY, [klo] HH.mm",
              l: "D.M.YYYY",
              ll: "Do MMM YYYY",
              lll: "Do MMM YYYY, [klo] HH.mm",
              llll: "ddd, Do MMM YYYY, [klo] HH.mm",
            },
            calendar: {
              sameDay: "[tänään] [klo] LT",
              nextDay: "[huomenna] [klo] LT",
              nextWeek: "dddd [klo] LT",
              lastDay: "[eilen] [klo] LT",
              lastWeek: "[viime] dddd[na] [klo] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s päästä",
              past: "%s sitten",
              s: a,
              ss: a,
              m: a,
              mm: a,
              h: a,
              hh: a,
              d: a,
              dd: a,
              M: a,
              MM: a,
              y: a,
              yy: a,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("fo", {
            months:
              "januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split(
                "_",
              ),
            monthsShort:
              "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
            weekdays:
              "sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split(
                "_",
              ),
            weekdaysShort: "sun_mán_týs_mik_hós_frí_ley".split("_"),
            weekdaysMin: "su_má_tý_mi_hó_fr_le".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D. MMMM, YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Í dag kl.] LT",
              nextDay: "[Í morgin kl.] LT",
              nextWeek: "dddd [kl.] LT",
              lastDay: "[Í gjár kl.] LT",
              lastWeek: "[síðstu] dddd [kl] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "um %s",
              past: "%s síðani",
              s: "fá sekund",
              ss: "%d sekundir",
              m: "ein minuttur",
              mm: "%d minuttir",
              h: "ein tími",
              hh: "%d tímar",
              d: "ein dagur",
              dd: "%d dagar",
              M: "ein mánaður",
              MM: "%d mánaðir",
              y: "eitt ár",
              yy: "%d ár",
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("fr", {
            months:
              "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split(
                "_",
              ),
            monthsShort:
              "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
            weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
            weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Aujourd’hui à] LT",
              nextDay: "[Demain à] LT",
              nextWeek: "dddd [à] LT",
              lastDay: "[Hier à] LT",
              lastWeek: "dddd [dernier à] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "dans %s",
              past: "il y a %s",
              s: "quelques secondes",
              ss: "%d secondes",
              m: "une minute",
              mm: "%d minutes",
              h: "une heure",
              hh: "%d heures",
              d: "un jour",
              dd: "%d jours",
              M: "un mois",
              MM: "%d mois",
              y: "un an",
              yy: "%d ans",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
            ordinal: function (e, t) {
              switch (t) {
                case "D":
                  return e + (1 === e ? "er" : "");
                default:
                case "M":
                case "Q":
                case "DDD":
                case "d":
                  return e + (1 === e ? "er" : "e");
                case "w":
                case "W":
                  return e + (1 === e ? "re" : "e");
              }
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("fr-ca", {
            months:
              "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split(
                "_",
              ),
            monthsShort:
              "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
            weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
            weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "YYYY-MM-DD",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Aujourd’hui à] LT",
              nextDay: "[Demain à] LT",
              nextWeek: "dddd [à] LT",
              lastDay: "[Hier à] LT",
              lastWeek: "dddd [dernier à] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "dans %s",
              past: "il y a %s",
              s: "quelques secondes",
              ss: "%d secondes",
              m: "une minute",
              mm: "%d minutes",
              h: "une heure",
              hh: "%d heures",
              d: "un jour",
              dd: "%d jours",
              M: "un mois",
              MM: "%d mois",
              y: "un an",
              yy: "%d ans",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
            ordinal: function (e, t) {
              switch (t) {
                default:
                case "M":
                case "Q":
                case "D":
                case "DDD":
                case "d":
                  return e + (1 === e ? "er" : "e");
                case "w":
                case "W":
                  return e + (1 === e ? "re" : "e");
              }
            },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("fr-ch", {
            months:
              "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split(
                "_",
              ),
            monthsShort:
              "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
            weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
            weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Aujourd’hui à] LT",
              nextDay: "[Demain à] LT",
              nextWeek: "dddd [à] LT",
              lastDay: "[Hier à] LT",
              lastWeek: "dddd [dernier à] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "dans %s",
              past: "il y a %s",
              s: "quelques secondes",
              ss: "%d secondes",
              m: "une minute",
              mm: "%d minutes",
              h: "une heure",
              hh: "%d heures",
              d: "un jour",
              dd: "%d jours",
              M: "un mois",
              MM: "%d mois",
              y: "un an",
              yy: "%d ans",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
            ordinal: function (e, t) {
              switch (t) {
                default:
                case "M":
                case "Q":
                case "D":
                case "DDD":
                case "d":
                  return e + (1 === e ? "er" : "e");
                case "w":
                case "W":
                  return e + (1 === e ? "re" : "e");
              }
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
              "jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split(
                "_",
              ),
            n = "jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_");
          e.defineLocale("fy", {
            months:
              "jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split(
                "_",
              ),
            monthsShort: function (e, a) {
              return e ? (/-MMM-/.test(a) ? n[e.month()] : t[e.month()]) : t;
            },
            monthsParseExact: !0,
            weekdays:
              "snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split(
                "_",
              ),
            weekdaysShort: "si._mo._ti._wo._to._fr._so.".split("_"),
            weekdaysMin: "Si_Mo_Ti_Wo_To_Fr_So".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD-MM-YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[hjoed om] LT",
              nextDay: "[moarn om] LT",
              nextWeek: "dddd [om] LT",
              lastDay: "[juster om] LT",
              lastWeek: "[ôfrûne] dddd [om] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "oer %s",
              past: "%s lyn",
              s: "in pear sekonden",
              ss: "%d sekonden",
              m: "ien minút",
              mm: "%d minuten",
              h: "ien oere",
              hh: "%d oeren",
              d: "ien dei",
              dd: "%d dagen",
              M: "ien moanne",
              MM: "%d moannen",
              y: "ien jier",
              yy: "%d jierren",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
            ordinal: function (e) {
              return e + (1 === e || 8 === e || e >= 20 ? "ste" : "de");
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = [
              "Eanáir",
              "Feabhra",
              "Márta",
              "Aibreán",
              "Bealtaine",
              "Méitheamh",
              "Iúil",
              "Lúnasa",
              "Meán Fómhair",
              "Deaireadh Fómhair",
              "Samhain",
              "Nollaig",
            ],
            n = [
              "Eaná",
              "Feab",
              "Márt",
              "Aibr",
              "Beal",
              "Méit",
              "Iúil",
              "Lúna",
              "Meán",
              "Deai",
              "Samh",
              "Noll",
            ],
            a = [
              "Dé Domhnaigh",
              "Dé Luain",
              "Dé Máirt",
              "Dé Céadaoin",
              "Déardaoin",
              "Dé hAoine",
              "Dé Satharn",
            ],
            s = ["Dom", "Lua", "Mái", "Céa", "Déa", "hAo", "Sat"],
            i = ["Do", "Lu", "Má", "Ce", "Dé", "hA", "Sa"];
          e.defineLocale("ga", {
            months: t,
            monthsShort: n,
            monthsParseExact: !0,
            weekdays: a,
            weekdaysShort: s,
            weekdaysMin: i,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Inniu ag] LT",
              nextDay: "[Amárach ag] LT",
              nextWeek: "dddd [ag] LT",
              lastDay: "[Inné aig] LT",
              lastWeek: "dddd [seo caite] [ag] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "i %s",
              past: "%s ó shin",
              s: "cúpla soicind",
              ss: "%d soicind",
              m: "nóiméad",
              mm: "%d nóiméad",
              h: "uair an chloig",
              hh: "%d uair an chloig",
              d: "lá",
              dd: "%d lá",
              M: "mí",
              MM: "%d mí",
              y: "bliain",
              yy: "%d bliain",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/,
            ordinal: function (e) {
              return e + (1 === e ? "d" : e % 10 == 2 ? "na" : "mh");
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = [
              "Am Faoilleach",
              "An Gearran",
              "Am Màrt",
              "An Giblean",
              "An Cèitean",
              "An t-Ògmhios",
              "An t-Iuchar",
              "An Lùnastal",
              "An t-Sultain",
              "An Dàmhair",
              "An t-Samhain",
              "An Dùbhlachd",
            ],
            n = [
              "Faoi",
              "Gear",
              "Màrt",
              "Gibl",
              "Cèit",
              "Ògmh",
              "Iuch",
              "Lùn",
              "Sult",
              "Dàmh",
              "Samh",
              "Dùbh",
            ],
            a = [
              "Didòmhnaich",
              "Diluain",
              "Dimàirt",
              "Diciadain",
              "Diardaoin",
              "Dihaoine",
              "Disathairne",
            ],
            s = ["Did", "Dil", "Dim", "Dic", "Dia", "Dih", "Dis"],
            i = ["Dò", "Lu", "Mà", "Ci", "Ar", "Ha", "Sa"];
          e.defineLocale("gd", {
            months: t,
            monthsShort: n,
            monthsParseExact: !0,
            weekdays: a,
            weekdaysShort: s,
            weekdaysMin: i,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[An-diugh aig] LT",
              nextDay: "[A-màireach aig] LT",
              nextWeek: "dddd [aig] LT",
              lastDay: "[An-dè aig] LT",
              lastWeek: "dddd [seo chaidh] [aig] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "ann an %s",
              past: "bho chionn %s",
              s: "beagan diogan",
              ss: "%d diogan",
              m: "mionaid",
              mm: "%d mionaidean",
              h: "uair",
              hh: "%d uairean",
              d: "latha",
              dd: "%d latha",
              M: "mìos",
              MM: "%d mìosan",
              y: "bliadhna",
              yy: "%d bliadhna",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/,
            ordinal: function (e) {
              return e + (1 === e ? "d" : e % 10 == 2 ? "na" : "mh");
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("gl", {
            months:
              "xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro".split(
                "_",
              ),
            monthsShort:
              "xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays: "domingo_luns_martes_mércores_xoves_venres_sábado".split(
              "_",
            ),
            weekdaysShort: "dom._lun._mar._mér._xov._ven._sáb.".split("_"),
            weekdaysMin: "do_lu_ma_mé_xo_ve_sá".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D [de] MMMM [de] YYYY",
              LLL: "D [de] MMMM [de] YYYY H:mm",
              LLLL: "dddd, D [de] MMMM [de] YYYY H:mm",
            },
            calendar: {
              sameDay: function () {
                return "[hoxe " + (1 !== this.hours() ? "ás" : "á") + "] LT";
              },
              nextDay: function () {
                return "[mañá " + (1 !== this.hours() ? "ás" : "á") + "] LT";
              },
              nextWeek: function () {
                return "dddd [" + (1 !== this.hours() ? "ás" : "a") + "] LT";
              },
              lastDay: function () {
                return "[onte " + (1 !== this.hours() ? "á" : "a") + "] LT";
              },
              lastWeek: function () {
                return (
                  "[o] dddd [pasado " +
                  (1 !== this.hours() ? "ás" : "a") +
                  "] LT"
                );
              },
              sameElse: "L",
            },
            relativeTime: {
              future: function (e) {
                return 0 === e.indexOf("un") ? "n" + e : "en " + e;
              },
              past: "hai %s",
              s: "uns segundos",
              ss: "%d segundos",
              m: "un minuto",
              mm: "%d minutos",
              h: "unha hora",
              hh: "%d horas",
              d: "un día",
              dd: "%d días",
              M: "un mes",
              MM: "%d meses",
              y: "un ano",
              yy: "%d anos",
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n, a) {
            var s = {
              s: ["thodde secondanim", "thodde second"],
              ss: [e + " secondanim", e + " second"],
              m: ["eka mintan", "ek minute"],
              mm: [e + " mintanim", e + " mintam"],
              h: ["eka voran", "ek vor"],
              hh: [e + " voranim", e + " voram"],
              d: ["eka disan", "ek dis"],
              dd: [e + " disanim", e + " dis"],
              M: ["eka mhoinean", "ek mhoino"],
              MM: [e + " mhoineanim", e + " mhoine"],
              y: ["eka vorsan", "ek voros"],
              yy: [e + " vorsanim", e + " vorsam"],
            };
            return t ? s[n][0] : s[n][1];
          }
          e.defineLocale("gom-latn", {
            months:
              "Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr".split(
                "_",
              ),
            monthsShort:
              "Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son'var".split("_"),
            weekdaysShort: "Ait._Som._Mon._Bud._Bre._Suk._Son.".split("_"),
            weekdaysMin: "Ai_Sm_Mo_Bu_Br_Su_Sn".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "A h:mm [vazta]",
              LTS: "A h:mm:ss [vazta]",
              L: "DD-MM-YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY A h:mm [vazta]",
              LLLL: "dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]",
              llll: "ddd, D MMM YYYY, A h:mm [vazta]",
            },
            calendar: {
              sameDay: "[Aiz] LT",
              nextDay: "[Faleam] LT",
              nextWeek: "[Ieta to] dddd[,] LT",
              lastDay: "[Kal] LT",
              lastWeek: "[Fatlo] dddd[,] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s",
              past: "%s adim",
              s: t,
              ss: t,
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: t,
              dd: t,
              M: t,
              MM: t,
              y: t,
              yy: t,
            },
            dayOfMonthOrdinalParse: /\d{1,2}(er)/,
            ordinal: function (e, t) {
              return "D" === t ? e + "er" : e;
            },
            week: { dow: 1, doy: 4 },
            meridiemParse: /rati|sokalli|donparam|sanje/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "rati" === t
                  ? e < 4
                    ? e
                    : e + 12
                  : "sokalli" === t
                    ? e
                    : "donparam" === t
                      ? e > 12
                        ? e
                        : e + 12
                      : "sanje" === t
                        ? e + 12
                        : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "rati"
                : e < 12
                  ? "sokalli"
                  : e < 16
                    ? "donparam"
                    : e < 20
                      ? "sanje"
                      : "rati";
            },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "૧",
              2: "૨",
              3: "૩",
              4: "૪",
              5: "૫",
              6: "૬",
              7: "૭",
              8: "૮",
              9: "૯",
              0: "૦",
            },
            n = {
              "૧": "1",
              "૨": "2",
              "૩": "3",
              "૪": "4",
              "૫": "5",
              "૬": "6",
              "૭": "7",
              "૮": "8",
              "૯": "9",
              "૦": "0",
            };
          e.defineLocale("gu", {
            months:
              "જાન્યુઆરી_ફેબ્રુઆરી_માર્ચ_એપ્રિલ_મે_જૂન_જુલાઈ_ઑગસ્ટ_સપ્ટેમ્બર_ઑક્ટ્બર_નવેમ્બર_ડિસેમ્બર".split(
                "_",
              ),
            monthsShort:
              "જાન્યુ._ફેબ્રુ._માર્ચ_એપ્રિ._મે_જૂન_જુલા._ઑગ._સપ્ટે._ઑક્ટ્._નવે._ડિસે.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "રવિવાર_સોમવાર_મંગળવાર_બુધ્વાર_ગુરુવાર_શુક્રવાર_શનિવાર".split(
                "_",
              ),
            weekdaysShort: "રવિ_સોમ_મંગળ_બુધ્_ગુરુ_શુક્ર_શનિ".split("_"),
            weekdaysMin: "ર_સો_મં_બુ_ગુ_શુ_શ".split("_"),
            longDateFormat: {
              LT: "A h:mm વાગ્યે",
              LTS: "A h:mm:ss વાગ્યે",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, A h:mm વાગ્યે",
              LLLL: "dddd, D MMMM YYYY, A h:mm વાગ્યે",
            },
            calendar: {
              sameDay: "[આજ] LT",
              nextDay: "[કાલે] LT",
              nextWeek: "dddd, LT",
              lastDay: "[ગઇકાલે] LT",
              lastWeek: "[પાછલા] dddd, LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s મા",
              past: "%s પેહલા",
              s: "અમુક પળો",
              ss: "%d સેકંડ",
              m: "એક મિનિટ",
              mm: "%d મિનિટ",
              h: "એક કલાક",
              hh: "%d કલાક",
              d: "એક દિવસ",
              dd: "%d દિવસ",
              M: "એક મહિનો",
              MM: "%d મહિનો",
              y: "એક વર્ષ",
              yy: "%d વર્ષ",
            },
            preparse: function (e) {
              return e.replace(/[૧૨૩૪૫૬૭૮૯૦]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            meridiemParse: /રાત|બપોર|સવાર|સાંજ/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "રાત" === t
                  ? e < 4
                    ? e
                    : e + 12
                  : "સવાર" === t
                    ? e
                    : "બપોર" === t
                      ? e >= 10
                        ? e
                        : e + 12
                      : "સાંજ" === t
                        ? e + 12
                        : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "રાત"
                : e < 10
                  ? "સવાર"
                  : e < 17
                    ? "બપોર"
                    : e < 20
                      ? "સાંજ"
                      : "રાત";
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("he", {
            months:
              "ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split(
                "_",
              ),
            monthsShort:
              "ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳".split(
                "_",
              ),
            weekdays: "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
            weekdaysShort: "א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),
            weekdaysMin: "א_ב_ג_ד_ה_ו_ש".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D [ב]MMMM YYYY",
              LLL: "D [ב]MMMM YYYY HH:mm",
              LLLL: "dddd, D [ב]MMMM YYYY HH:mm",
              l: "D/M/YYYY",
              ll: "D MMM YYYY",
              lll: "D MMM YYYY HH:mm",
              llll: "ddd, D MMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[היום ב־]LT",
              nextDay: "[מחר ב־]LT",
              nextWeek: "dddd [בשעה] LT",
              lastDay: "[אתמול ב־]LT",
              lastWeek: "[ביום] dddd [האחרון בשעה] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "בעוד %s",
              past: "לפני %s",
              s: "מספר שניות",
              ss: "%d שניות",
              m: "דקה",
              mm: "%d דקות",
              h: "שעה",
              hh: function (e) {
                return 2 === e ? "שעתיים" : e + " שעות";
              },
              d: "יום",
              dd: function (e) {
                return 2 === e ? "יומיים" : e + " ימים";
              },
              M: "חודש",
              MM: function (e) {
                return 2 === e ? "חודשיים" : e + " חודשים";
              },
              y: "שנה",
              yy: function (e) {
                return 2 === e
                  ? "שנתיים"
                  : e % 10 == 0 && 10 !== e
                    ? e + " שנה"
                    : e + " שנים";
              },
            },
            meridiemParse:
              /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
            isPM: function (e) {
              return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(e);
            },
            meridiem: function (e, t, n) {
              return e < 5
                ? "לפנות בוקר"
                : e < 10
                  ? "בבוקר"
                  : e < 12
                    ? n
                      ? 'לפנה"צ'
                      : "לפני הצהריים"
                    : e < 18
                      ? n
                        ? 'אחה"צ'
                        : "אחרי הצהריים"
                      : "בערב";
            },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "१",
              2: "२",
              3: "३",
              4: "४",
              5: "५",
              6: "६",
              7: "७",
              8: "८",
              9: "९",
              0: "०",
            },
            n = {
              "१": "1",
              "२": "2",
              "३": "3",
              "४": "4",
              "५": "5",
              "६": "6",
              "७": "7",
              "८": "8",
              "९": "9",
              "०": "0",
            };
          e.defineLocale("hi", {
            months:
              "जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split(
                "_",
              ),
            monthsShort:
              "जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
            weekdaysShort: "रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),
            weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"),
            longDateFormat: {
              LT: "A h:mm बजे",
              LTS: "A h:mm:ss बजे",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, A h:mm बजे",
              LLLL: "dddd, D MMMM YYYY, A h:mm बजे",
            },
            calendar: {
              sameDay: "[आज] LT",
              nextDay: "[कल] LT",
              nextWeek: "dddd, LT",
              lastDay: "[कल] LT",
              lastWeek: "[पिछले] dddd, LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s में",
              past: "%s पहले",
              s: "कुछ ही क्षण",
              ss: "%d सेकंड",
              m: "एक मिनट",
              mm: "%d मिनट",
              h: "एक घंटा",
              hh: "%d घंटे",
              d: "एक दिन",
              dd: "%d दिन",
              M: "एक महीने",
              MM: "%d महीने",
              y: "एक वर्ष",
              yy: "%d वर्ष",
            },
            preparse: function (e) {
              return e.replace(/[१२३४५६७८९०]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            meridiemParse: /रात|सुबह|दोपहर|शाम/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "रात" === t
                  ? e < 4
                    ? e
                    : e + 12
                  : "सुबह" === t
                    ? e
                    : "दोपहर" === t
                      ? e >= 10
                        ? e
                        : e + 12
                      : "शाम" === t
                        ? e + 12
                        : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "रात"
                : e < 10
                  ? "सुबह"
                  : e < 17
                    ? "दोपहर"
                    : e < 20
                      ? "शाम"
                      : "रात";
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n) {
            var a = e + " ";
            switch (n) {
              case "ss":
                return (a +=
                  1 === e
                    ? "sekunda"
                    : 2 === e || 3 === e || 4 === e
                      ? "sekunde"
                      : "sekundi");
              case "m":
                return t ? "jedna minuta" : "jedne minute";
              case "mm":
                return (a +=
                  1 === e
                    ? "minuta"
                    : 2 === e || 3 === e || 4 === e
                      ? "minute"
                      : "minuta");
              case "h":
                return t ? "jedan sat" : "jednog sata";
              case "hh":
                return (a +=
                  1 === e
                    ? "sat"
                    : 2 === e || 3 === e || 4 === e
                      ? "sata"
                      : "sati");
              case "dd":
                return (a += 1 === e ? "dan" : "dana");
              case "MM":
                return (a +=
                  1 === e
                    ? "mjesec"
                    : 2 === e || 3 === e || 4 === e
                      ? "mjeseca"
                      : "mjeseci");
              case "yy":
                return (a +=
                  1 === e
                    ? "godina"
                    : 2 === e || 3 === e || 4 === e
                      ? "godine"
                      : "godina");
            }
          }
          e.defineLocale("hr", {
            months: {
              format:
                "siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split(
                  "_",
                ),
              standalone:
                "siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split(
                  "_",
                ),
            },
            monthsShort:
              "sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split(
                "_",
              ),
            weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
            weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm",
              LLLL: "dddd, D. MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[danas u] LT",
              nextDay: "[sutra u] LT",
              nextWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[u] [nedjelju] [u] LT";
                  case 3:
                    return "[u] [srijedu] [u] LT";
                  case 6:
                    return "[u] [subotu] [u] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[u] dddd [u] LT";
                }
              },
              lastDay: "[jučer u] LT",
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                  case 3:
                    return "[prošlu] dddd [u] LT";
                  case 6:
                    return "[prošle] [subote] [u] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[prošli] dddd [u] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "za %s",
              past: "prije %s",
              s: "par sekundi",
              ss: t,
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: "dan",
              dd: t,
              M: "mjesec",
              MM: t,
              y: "godinu",
              yy: t,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
            "vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton".split(
              " ",
            );
          function n(e, t, n, a) {
            var s = e;
            switch (n) {
              case "s":
                return a || t ? "néhány másodperc" : "néhány másodperce";
              case "ss":
                return s + (a || t) ? " másodperc" : " másodperce";
              case "m":
                return "egy" + (a || t ? " perc" : " perce");
              case "mm":
                return s + (a || t ? " perc" : " perce");
              case "h":
                return "egy" + (a || t ? " óra" : " órája");
              case "hh":
                return s + (a || t ? " óra" : " órája");
              case "d":
                return "egy" + (a || t ? " nap" : " napja");
              case "dd":
                return s + (a || t ? " nap" : " napja");
              case "M":
                return "egy" + (a || t ? " hónap" : " hónapja");
              case "MM":
                return s + (a || t ? " hónap" : " hónapja");
              case "y":
                return "egy" + (a || t ? " év" : " éve");
              case "yy":
                return s + (a || t ? " év" : " éve");
            }
            return "";
          }
          function a(e) {
            return (e ? "" : "[múlt] ") + "[" + t[this.day()] + "] LT[-kor]";
          }
          e.defineLocale("hu", {
            months:
              "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split(
                "_",
              ),
            monthsShort:
              "jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),
            weekdays:
              "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),
            weekdaysShort: "vas_hét_kedd_sze_csüt_pén_szo".split("_"),
            weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "YYYY.MM.DD.",
              LL: "YYYY. MMMM D.",
              LLL: "YYYY. MMMM D. H:mm",
              LLLL: "YYYY. MMMM D., dddd H:mm",
            },
            meridiemParse: /de|du/i,
            isPM: function (e) {
              return "u" === e.charAt(1).toLowerCase();
            },
            meridiem: function (e, t, n) {
              return e < 12 ? (!0 === n ? "de" : "DE") : !0 === n ? "du" : "DU";
            },
            calendar: {
              sameDay: "[ma] LT[-kor]",
              nextDay: "[holnap] LT[-kor]",
              nextWeek: function () {
                return a.call(this, !0);
              },
              lastDay: "[tegnap] LT[-kor]",
              lastWeek: function () {
                return a.call(this, !1);
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "%s múlva",
              past: "%s",
              s: n,
              ss: n,
              m: n,
              mm: n,
              h: n,
              hh: n,
              d: n,
              dd: n,
              M: n,
              MM: n,
              y: n,
              yy: n,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("hy-am", {
            months: {
              format:
                "հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split(
                  "_",
                ),
              standalone:
                "հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր".split(
                  "_",
                ),
            },
            monthsShort:
              "հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_"),
            weekdays:
              "կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split(
                "_",
              ),
            weekdaysShort: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
            weekdaysMin: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY թ.",
              LLL: "D MMMM YYYY թ., HH:mm",
              LLLL: "dddd, D MMMM YYYY թ., HH:mm",
            },
            calendar: {
              sameDay: "[այսօր] LT",
              nextDay: "[վաղը] LT",
              lastDay: "[երեկ] LT",
              nextWeek: function () {
                return "dddd [օրը ժամը] LT";
              },
              lastWeek: function () {
                return "[անցած] dddd [օրը ժամը] LT";
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "%s հետո",
              past: "%s առաջ",
              s: "մի քանի վայրկյան",
              ss: "%d վայրկյան",
              m: "րոպե",
              mm: "%d րոպե",
              h: "ժամ",
              hh: "%d ժամ",
              d: "օր",
              dd: "%d օր",
              M: "ամիս",
              MM: "%d ամիս",
              y: "տարի",
              yy: "%d տարի",
            },
            meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
            isPM: function (e) {
              return /^(ցերեկվա|երեկոյան)$/.test(e);
            },
            meridiem: function (e) {
              return e < 4
                ? "գիշերվա"
                : e < 12
                  ? "առավոտվա"
                  : e < 17
                    ? "ցերեկվա"
                    : "երեկոյան";
            },
            dayOfMonthOrdinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
            ordinal: function (e, t) {
              switch (t) {
                case "DDD":
                case "w":
                case "W":
                case "DDDo":
                  return 1 === e ? e + "-ին" : e + "-րդ";
                default:
                  return e;
              }
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("id", {
            months:
              "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split(
                "_",
              ),
            monthsShort:
              "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des".split("_"),
            weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
            weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
            weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
            longDateFormat: {
              LT: "HH.mm",
              LTS: "HH.mm.ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY [pukul] HH.mm",
              LLLL: "dddd, D MMMM YYYY [pukul] HH.mm",
            },
            meridiemParse: /pagi|siang|sore|malam/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "pagi" === t
                  ? e
                  : "siang" === t
                    ? e >= 11
                      ? e
                      : e + 12
                    : "sore" === t || "malam" === t
                      ? e + 12
                      : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 11
                ? "pagi"
                : e < 15
                  ? "siang"
                  : e < 19
                    ? "sore"
                    : "malam";
            },
            calendar: {
              sameDay: "[Hari ini pukul] LT",
              nextDay: "[Besok pukul] LT",
              nextWeek: "dddd [pukul] LT",
              lastDay: "[Kemarin pukul] LT",
              lastWeek: "dddd [lalu pukul] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "dalam %s",
              past: "%s yang lalu",
              s: "beberapa detik",
              ss: "%d detik",
              m: "semenit",
              mm: "%d menit",
              h: "sejam",
              hh: "%d jam",
              d: "sehari",
              dd: "%d hari",
              M: "sebulan",
              MM: "%d bulan",
              y: "setahun",
              yy: "%d tahun",
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e) {
            return e % 100 == 11 || e % 10 != 1;
          }
          function n(e, n, a, s) {
            var i = e + " ";
            switch (a) {
              case "s":
                return n || s ? "nokkrar sekúndur" : "nokkrum sekúndum";
              case "ss":
                return t(e)
                  ? i + (n || s ? "sekúndur" : "sekúndum")
                  : i + "sekúnda";
              case "m":
                return n ? "mínúta" : "mínútu";
              case "mm":
                return t(e)
                  ? i + (n || s ? "mínútur" : "mínútum")
                  : n
                    ? i + "mínúta"
                    : i + "mínútu";
              case "hh":
                return t(e)
                  ? i + (n || s ? "klukkustundir" : "klukkustundum")
                  : i + "klukkustund";
              case "d":
                return n ? "dagur" : s ? "dag" : "degi";
              case "dd":
                return t(e)
                  ? n
                    ? i + "dagar"
                    : i + (s ? "daga" : "dögum")
                  : n
                    ? i + "dagur"
                    : i + (s ? "dag" : "degi");
              case "M":
                return n ? "mánuður" : s ? "mánuð" : "mánuði";
              case "MM":
                return t(e)
                  ? n
                    ? i + "mánuðir"
                    : i + (s ? "mánuði" : "mánuðum")
                  : n
                    ? i + "mánuður"
                    : i + (s ? "mánuð" : "mánuði");
              case "y":
                return n || s ? "ár" : "ári";
              case "yy":
                return t(e)
                  ? i + (n || s ? "ár" : "árum")
                  : i + (n || s ? "ár" : "ári");
            }
          }
          e.defineLocale("is", {
            months:
              "janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split(
                "_",
              ),
            monthsShort:
              "jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),
            weekdays:
              "sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split(
                "_",
              ),
            weekdaysShort: "sun_mán_þri_mið_fim_fös_lau".split("_"),
            weekdaysMin: "Su_Má_Þr_Mi_Fi_Fö_La".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY [kl.] H:mm",
              LLLL: "dddd, D. MMMM YYYY [kl.] H:mm",
            },
            calendar: {
              sameDay: "[í dag kl.] LT",
              nextDay: "[á morgun kl.] LT",
              nextWeek: "dddd [kl.] LT",
              lastDay: "[í gær kl.] LT",
              lastWeek: "[síðasta] dddd [kl.] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "eftir %s",
              past: "fyrir %s síðan",
              s: n,
              ss: n,
              m: n,
              mm: n,
              h: "klukkustund",
              hh: n,
              d: n,
              dd: n,
              M: n,
              MM: n,
              y: n,
              yy: n,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("it", {
            months:
              "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split(
                "_",
              ),
            monthsShort:
              "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
            weekdays:
              "domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split(
                "_",
              ),
            weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"),
            weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Oggi alle] LT",
              nextDay: "[Domani alle] LT",
              nextWeek: "dddd [alle] LT",
              lastDay: "[Ieri alle] LT",
              lastWeek: function () {
                return 0 === this.day()
                  ? "[la scorsa] dddd [alle] LT"
                  : "[lo scorso] dddd [alle] LT";
              },
              sameElse: "L",
            },
            relativeTime: {
              future: function (e) {
                return (/^[0-9].+$/.test(e) ? "tra" : "in") + " " + e;
              },
              past: "%s fa",
              s: "alcuni secondi",
              ss: "%d secondi",
              m: "un minuto",
              mm: "%d minuti",
              h: "un'ora",
              hh: "%d ore",
              d: "un giorno",
              dd: "%d giorni",
              M: "un mese",
              MM: "%d mesi",
              y: "un anno",
              yy: "%d anni",
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("it-ch", {
            months:
              "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split(
                "_",
              ),
            monthsShort:
              "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
            weekdays:
              "domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split(
                "_",
              ),
            weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"),
            weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Oggi alle] LT",
              nextDay: "[Domani alle] LT",
              nextWeek: "dddd [alle] LT",
              lastDay: "[Ieri alle] LT",
              lastWeek: function () {
                return 0 === this.day()
                  ? "[la scorsa] dddd [alle] LT"
                  : "[lo scorso] dddd [alle] LT";
              },
              sameElse: "L",
            },
            relativeTime: {
              future: function (e) {
                return (/^[0-9].+$/.test(e) ? "tra" : "in") + " " + e;
              },
              past: "%s fa",
              s: "alcuni secondi",
              ss: "%d secondi",
              m: "un minuto",
              mm: "%d minuti",
              h: "un'ora",
              hh: "%d ore",
              d: "un giorno",
              dd: "%d giorni",
              M: "un mese",
              MM: "%d mesi",
              y: "un anno",
              yy: "%d anni",
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ja", {
            months:
              "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
                "_",
              ),
            monthsShort:
              "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
            weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split(
              "_",
            ),
            weekdaysShort: "日_月_火_水_木_金_土".split("_"),
            weekdaysMin: "日_月_火_水_木_金_土".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "YYYY/MM/DD",
              LL: "YYYY年M月D日",
              LLL: "YYYY年M月D日 HH:mm",
              LLLL: "YYYY年M月D日 dddd HH:mm",
              l: "YYYY/MM/DD",
              ll: "YYYY年M月D日",
              lll: "YYYY年M月D日 HH:mm",
              llll: "YYYY年M月D日(ddd) HH:mm",
            },
            meridiemParse: /午前|午後/i,
            isPM: function (e) {
              return "午後" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "午前" : "午後";
            },
            calendar: {
              sameDay: "[今日] LT",
              nextDay: "[明日] LT",
              nextWeek: function (e) {
                return e.week() < this.week() ? "[来週]dddd LT" : "dddd LT";
              },
              lastDay: "[昨日] LT",
              lastWeek: function (e) {
                return this.week() < e.week() ? "[先週]dddd LT" : "dddd LT";
              },
              sameElse: "L",
            },
            dayOfMonthOrdinalParse: /\d{1,2}日/,
            ordinal: function (e, t) {
              switch (t) {
                case "d":
                case "D":
                case "DDD":
                  return e + "日";
                default:
                  return e;
              }
            },
            relativeTime: {
              future: "%s後",
              past: "%s前",
              s: "数秒",
              ss: "%d秒",
              m: "1分",
              mm: "%d分",
              h: "1時間",
              hh: "%d時間",
              d: "1日",
              dd: "%d日",
              M: "1ヶ月",
              MM: "%dヶ月",
              y: "1年",
              yy: "%d年",
            },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("jv", {
            months:
              "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split(
                "_",
              ),
            monthsShort:
              "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),
            weekdays: "Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),
            weekdaysShort: "Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),
            weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),
            longDateFormat: {
              LT: "HH.mm",
              LTS: "HH.mm.ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY [pukul] HH.mm",
              LLLL: "dddd, D MMMM YYYY [pukul] HH.mm",
            },
            meridiemParse: /enjing|siyang|sonten|ndalu/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "enjing" === t
                  ? e
                  : "siyang" === t
                    ? e >= 11
                      ? e
                      : e + 12
                    : "sonten" === t || "ndalu" === t
                      ? e + 12
                      : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 11
                ? "enjing"
                : e < 15
                  ? "siyang"
                  : e < 19
                    ? "sonten"
                    : "ndalu";
            },
            calendar: {
              sameDay: "[Dinten puniko pukul] LT",
              nextDay: "[Mbenjang pukul] LT",
              nextWeek: "dddd [pukul] LT",
              lastDay: "[Kala wingi pukul] LT",
              lastWeek: "dddd [kepengker pukul] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "wonten ing %s",
              past: "%s ingkang kepengker",
              s: "sawetawis detik",
              ss: "%d detik",
              m: "setunggal menit",
              mm: "%d menit",
              h: "setunggal jam",
              hh: "%d jam",
              d: "sedinten",
              dd: "%d dinten",
              M: "sewulan",
              MM: "%d wulan",
              y: "setaun",
              yy: "%d taun",
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ka", {
            months: {
              standalone:
                "იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split(
                  "_",
                ),
              format:
                "იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს".split(
                  "_",
                ),
            },
            monthsShort:
              "იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),
            weekdays: {
              standalone:
                "კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split(
                  "_",
                ),
              format:
                "კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს".split(
                  "_",
                ),
              isFormat: /(წინა|შემდეგ)/,
            },
            weekdaysShort: "კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),
            weekdaysMin: "კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),
            longDateFormat: {
              LT: "h:mm A",
              LTS: "h:mm:ss A",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY h:mm A",
              LLLL: "dddd, D MMMM YYYY h:mm A",
            },
            calendar: {
              sameDay: "[დღეს] LT[-ზე]",
              nextDay: "[ხვალ] LT[-ზე]",
              lastDay: "[გუშინ] LT[-ზე]",
              nextWeek: "[შემდეგ] dddd LT[-ზე]",
              lastWeek: "[წინა] dddd LT-ზე",
              sameElse: "L",
            },
            relativeTime: {
              future: function (e) {
                return /(წამი|წუთი|საათი|წელი)/.test(e)
                  ? e.replace(/ი$/, "ში")
                  : e + "ში";
              },
              past: function (e) {
                return /(წამი|წუთი|საათი|დღე|თვე)/.test(e)
                  ? e.replace(/(ი|ე)$/, "ის წინ")
                  : /წელი/.test(e)
                    ? e.replace(/წელი$/, "წლის წინ")
                    : void 0;
              },
              s: "რამდენიმე წამი",
              ss: "%d წამი",
              m: "წუთი",
              mm: "%d წუთი",
              h: "საათი",
              hh: "%d საათი",
              d: "დღე",
              dd: "%d დღე",
              M: "თვე",
              MM: "%d თვე",
              y: "წელი",
              yy: "%d წელი",
            },
            dayOfMonthOrdinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
            ordinal: function (e) {
              return 0 === e
                ? e
                : 1 === e
                  ? e + "-ლი"
                  : e < 20 || (e <= 100 && e % 20 == 0) || e % 100 == 0
                    ? "მე-" + e
                    : e + "-ე";
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
            0: "-ші",
            1: "-ші",
            2: "-ші",
            3: "-ші",
            4: "-ші",
            5: "-ші",
            6: "-шы",
            7: "-ші",
            8: "-ші",
            9: "-шы",
            10: "-шы",
            20: "-шы",
            30: "-шы",
            40: "-шы",
            50: "-ші",
            60: "-шы",
            70: "-ші",
            80: "-ші",
            90: "-шы",
            100: "-ші",
          };
          e.defineLocale("kk", {
            months:
              "қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан".split(
                "_",
              ),
            monthsShort:
              "қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел".split("_"),
            weekdays:
              "жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі".split(
                "_",
              ),
            weekdaysShort: "жек_дүй_сей_сәр_бей_жұм_сен".split("_"),
            weekdaysMin: "жк_дй_сй_ср_бй_жм_сн".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Бүгін сағат] LT",
              nextDay: "[Ертең сағат] LT",
              nextWeek: "dddd [сағат] LT",
              lastDay: "[Кеше сағат] LT",
              lastWeek: "[Өткен аптаның] dddd [сағат] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s ішінде",
              past: "%s бұрын",
              s: "бірнеше секунд",
              ss: "%d секунд",
              m: "бір минут",
              mm: "%d минут",
              h: "бір сағат",
              hh: "%d сағат",
              d: "бір күн",
              dd: "%d күн",
              M: "бір ай",
              MM: "%d ай",
              y: "бір жыл",
              yy: "%d жыл",
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(ші|шы)/,
            ordinal: function (e) {
              var n = e % 10,
                a = e >= 100 ? 100 : null;
              return e + (t[e] || t[n] || t[a]);
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "១",
              2: "២",
              3: "៣",
              4: "៤",
              5: "៥",
              6: "៦",
              7: "៧",
              8: "៨",
              9: "៩",
              0: "០",
            },
            n = {
              "១": "1",
              "២": "2",
              "៣": "3",
              "៤": "4",
              "៥": "5",
              "៦": "6",
              "៧": "7",
              "៨": "8",
              "៩": "9",
              "០": "0",
            };
          e.defineLocale("km", {
            months:
              "មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split(
                "_",
              ),
            monthsShort:
              "មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split(
                "_",
              ),
            weekdays: "អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split(
              "_",
            ),
            weekdaysShort: "អា_ច_អ_ព_ព្រ_សុ_ស".split("_"),
            weekdaysMin: "អា_ច_អ_ព_ព្រ_សុ_ស".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            meridiemParse: /ព្រឹក|ល្ងាច/,
            isPM: function (e) {
              return "ល្ងាច" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "ព្រឹក" : "ល្ងាច";
            },
            calendar: {
              sameDay: "[ថ្ងៃនេះ ម៉ោង] LT",
              nextDay: "[ស្អែក ម៉ោង] LT",
              nextWeek: "dddd [ម៉ោង] LT",
              lastDay: "[ម្សិលមិញ ម៉ោង] LT",
              lastWeek: "dddd [សប្តាហ៍មុន] [ម៉ោង] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%sទៀត",
              past: "%sមុន",
              s: "ប៉ុន្មានវិនាទី",
              ss: "%d វិនាទី",
              m: "មួយនាទី",
              mm: "%d នាទី",
              h: "មួយម៉ោង",
              hh: "%d ម៉ោង",
              d: "មួយថ្ងៃ",
              dd: "%d ថ្ងៃ",
              M: "មួយខែ",
              MM: "%d ខែ",
              y: "មួយឆ្នាំ",
              yy: "%d ឆ្នាំ",
            },
            dayOfMonthOrdinalParse: /ទី\d{1,2}/,
            ordinal: "ទី%d",
            preparse: function (e) {
              return e.replace(/[១២៣៤៥៦៧៨៩០]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "೧",
              2: "೨",
              3: "೩",
              4: "೪",
              5: "೫",
              6: "೬",
              7: "೭",
              8: "೮",
              9: "೯",
              0: "೦",
            },
            n = {
              "೧": "1",
              "೨": "2",
              "೩": "3",
              "೪": "4",
              "೫": "5",
              "೬": "6",
              "೭": "7",
              "೮": "8",
              "೯": "9",
              "೦": "0",
            };
          e.defineLocale("kn", {
            months:
              "ಜನವರಿ_ಫೆಬ್ರವರಿ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂಬರ್_ಅಕ್ಟೋಬರ್_ನವೆಂಬರ್_ಡಿಸೆಂಬರ್".split(
                "_",
              ),
            monthsShort:
              "ಜನ_ಫೆಬ್ರ_ಮಾರ್ಚ್_ಏಪ್ರಿಲ್_ಮೇ_ಜೂನ್_ಜುಲೈ_ಆಗಸ್ಟ್_ಸೆಪ್ಟೆಂ_ಅಕ್ಟೋ_ನವೆಂ_ಡಿಸೆಂ".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "ಭಾನುವಾರ_ಸೋಮವಾರ_ಮಂಗಳವಾರ_ಬುಧವಾರ_ಗುರುವಾರ_ಶುಕ್ರವಾರ_ಶನಿವಾರ".split(
                "_",
              ),
            weekdaysShort: "ಭಾನು_ಸೋಮ_ಮಂಗಳ_ಬುಧ_ಗುರು_ಶುಕ್ರ_ಶನಿ".split("_"),
            weekdaysMin: "ಭಾ_ಸೋ_ಮಂ_ಬು_ಗು_ಶು_ಶ".split("_"),
            longDateFormat: {
              LT: "A h:mm",
              LTS: "A h:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, A h:mm",
              LLLL: "dddd, D MMMM YYYY, A h:mm",
            },
            calendar: {
              sameDay: "[ಇಂದು] LT",
              nextDay: "[ನಾಳೆ] LT",
              nextWeek: "dddd, LT",
              lastDay: "[ನಿನ್ನೆ] LT",
              lastWeek: "[ಕೊನೆಯ] dddd, LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s ನಂತರ",
              past: "%s ಹಿಂದೆ",
              s: "ಕೆಲವು ಕ್ಷಣಗಳು",
              ss: "%d ಸೆಕೆಂಡುಗಳು",
              m: "ಒಂದು ನಿಮಿಷ",
              mm: "%d ನಿಮಿಷ",
              h: "ಒಂದು ಗಂಟೆ",
              hh: "%d ಗಂಟೆ",
              d: "ಒಂದು ದಿನ",
              dd: "%d ದಿನ",
              M: "ಒಂದು ತಿಂಗಳು",
              MM: "%d ತಿಂಗಳು",
              y: "ಒಂದು ವರ್ಷ",
              yy: "%d ವರ್ಷ",
            },
            preparse: function (e) {
              return e.replace(/[೧೨೩೪೫೬೭೮೯೦]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            meridiemParse: /ರಾತ್ರಿ|ಬೆಳಿಗ್ಗೆ|ಮಧ್ಯಾಹ್ನ|ಸಂಜೆ/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "ರಾತ್ರಿ" === t
                  ? e < 4
                    ? e
                    : e + 12
                  : "ಬೆಳಿಗ್ಗೆ" === t
                    ? e
                    : "ಮಧ್ಯಾಹ್ನ" === t
                      ? e >= 10
                        ? e
                        : e + 12
                      : "ಸಂಜೆ" === t
                        ? e + 12
                        : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "ರಾತ್ರಿ"
                : e < 10
                  ? "ಬೆಳಿಗ್ಗೆ"
                  : e < 17
                    ? "ಮಧ್ಯಾಹ್ನ"
                    : e < 20
                      ? "ಸಂಜೆ"
                      : "ರಾತ್ರಿ";
            },
            dayOfMonthOrdinalParse: /\d{1,2}(ನೇ)/,
            ordinal: function (e) {
              return e + "ನೇ";
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ko", {
            months: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split(
              "_",
            ),
            monthsShort:
              "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
            weekdays: "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split(
              "_",
            ),
            weekdaysShort: "일_월_화_수_목_금_토".split("_"),
            weekdaysMin: "일_월_화_수_목_금_토".split("_"),
            longDateFormat: {
              LT: "A h:mm",
              LTS: "A h:mm:ss",
              L: "YYYY.MM.DD.",
              LL: "YYYY년 MMMM D일",
              LLL: "YYYY년 MMMM D일 A h:mm",
              LLLL: "YYYY년 MMMM D일 dddd A h:mm",
              l: "YYYY.MM.DD.",
              ll: "YYYY년 MMMM D일",
              lll: "YYYY년 MMMM D일 A h:mm",
              llll: "YYYY년 MMMM D일 dddd A h:mm",
            },
            calendar: {
              sameDay: "오늘 LT",
              nextDay: "내일 LT",
              nextWeek: "dddd LT",
              lastDay: "어제 LT",
              lastWeek: "지난주 dddd LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s 후",
              past: "%s 전",
              s: "몇 초",
              ss: "%d초",
              m: "1분",
              mm: "%d분",
              h: "한 시간",
              hh: "%d시간",
              d: "하루",
              dd: "%d일",
              M: "한 달",
              MM: "%d달",
              y: "일 년",
              yy: "%d년",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(일|월|주)/,
            ordinal: function (e, t) {
              switch (t) {
                case "d":
                case "D":
                case "DDD":
                  return e + "일";
                case "M":
                  return e + "월";
                case "w":
                case "W":
                  return e + "주";
                default:
                  return e;
              }
            },
            meridiemParse: /오전|오후/,
            isPM: function (e) {
              return "오후" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "오전" : "오후";
            },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "١",
              2: "٢",
              3: "٣",
              4: "٤",
              5: "٥",
              6: "٦",
              7: "٧",
              8: "٨",
              9: "٩",
              0: "٠",
            },
            n = {
              "١": "1",
              "٢": "2",
              "٣": "3",
              "٤": "4",
              "٥": "5",
              "٦": "6",
              "٧": "7",
              "٨": "8",
              "٩": "9",
              "٠": "0",
            },
            a = [
              "کانونی دووەم",
              "شوبات",
              "ئازار",
              "نیسان",
              "ئایار",
              "حوزەیران",
              "تەمموز",
              "ئاب",
              "ئەیلوول",
              "تشرینی یەكەم",
              "تشرینی دووەم",
              "كانونی یەکەم",
            ];
          e.defineLocale("ku", {
            months: a,
            monthsShort: a,
            weekdays:
              "یه‌كشه‌ممه‌_دووشه‌ممه‌_سێشه‌ممه‌_چوارشه‌ممه‌_پێنجشه‌ممه‌_هه‌ینی_شه‌ممه‌".split(
                "_",
              ),
            weekdaysShort:
              "یه‌كشه‌م_دووشه‌م_سێشه‌م_چوارشه‌م_پێنجشه‌م_هه‌ینی_شه‌ممه‌".split(
                "_",
              ),
            weekdaysMin: "ی_د_س_چ_پ_ه_ش".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            meridiemParse: /ئێواره‌|به‌یانی/,
            isPM: function (e) {
              return /ئێواره‌/.test(e);
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "به‌یانی" : "ئێواره‌";
            },
            calendar: {
              sameDay: "[ئه‌مرۆ كاتژمێر] LT",
              nextDay: "[به‌یانی كاتژمێر] LT",
              nextWeek: "dddd [كاتژمێر] LT",
              lastDay: "[دوێنێ كاتژمێر] LT",
              lastWeek: "dddd [كاتژمێر] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "له‌ %s",
              past: "%s",
              s: "چه‌ند چركه‌یه‌ك",
              ss: "چركه‌ %d",
              m: "یه‌ك خوله‌ك",
              mm: "%d خوله‌ك",
              h: "یه‌ك كاتژمێر",
              hh: "%d كاتژمێر",
              d: "یه‌ك ڕۆژ",
              dd: "%d ڕۆژ",
              M: "یه‌ك مانگ",
              MM: "%d مانگ",
              y: "یه‌ك ساڵ",
              yy: "%d ساڵ",
            },
            preparse: function (e) {
              return e
                .replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (e) {
                  return n[e];
                })
                .replace(/،/g, ",");
            },
            postformat: function (e) {
              return e
                .replace(/\d/g, function (e) {
                  return t[e];
                })
                .replace(/,/g, "،");
            },
            week: { dow: 6, doy: 12 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
            0: "-чү",
            1: "-чи",
            2: "-чи",
            3: "-чү",
            4: "-чү",
            5: "-чи",
            6: "-чы",
            7: "-чи",
            8: "-чи",
            9: "-чу",
            10: "-чу",
            20: "-чы",
            30: "-чу",
            40: "-чы",
            50: "-чү",
            60: "-чы",
            70: "-чи",
            80: "-чи",
            90: "-чу",
            100: "-чү",
          };
          e.defineLocale("ky", {
            months:
              "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split(
                "_",
              ),
            monthsShort:
              "янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),
            weekdays:
              "Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби".split(
                "_",
              ),
            weekdaysShort: "Жек_Дүй_Шей_Шар_Бей_Жум_Ише".split("_"),
            weekdaysMin: "Жк_Дй_Шй_Шр_Бй_Жм_Иш".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Бүгүн саат] LT",
              nextDay: "[Эртең саат] LT",
              nextWeek: "dddd [саат] LT",
              lastDay: "[Кечээ саат] LT",
              lastWeek: "[Өткөн аптанын] dddd [күнү] [саат] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s ичинде",
              past: "%s мурун",
              s: "бирнече секунд",
              ss: "%d секунд",
              m: "бир мүнөт",
              mm: "%d мүнөт",
              h: "бир саат",
              hh: "%d саат",
              d: "бир күн",
              dd: "%d күн",
              M: "бир ай",
              MM: "%d ай",
              y: "бир жыл",
              yy: "%d жыл",
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
            ordinal: function (e) {
              var n = e % 10,
                a = e >= 100 ? 100 : null;
              return e + (t[e] || t[n] || t[a]);
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n, a) {
            var s = {
              m: ["eng Minutt", "enger Minutt"],
              h: ["eng Stonn", "enger Stonn"],
              d: ["een Dag", "engem Dag"],
              M: ["ee Mount", "engem Mount"],
              y: ["ee Joer", "engem Joer"],
            };
            return t ? s[n][0] : s[n][1];
          }
          function n(e) {
            return s(e.substr(0, e.indexOf(" "))) ? "a " + e : "an " + e;
          }
          function a(e) {
            return s(e.substr(0, e.indexOf(" "))) ? "viru " + e : "virun " + e;
          }
          function s(e) {
            if (((e = parseInt(e, 10)), isNaN(e))) return !1;
            if (e < 0) return !0;
            if (e < 10) return 4 <= e && e <= 7;
            if (e < 100) {
              var t = e % 10;
              return s(0 === t ? e / 10 : t);
            }
            if (e < 1e4) {
              for (; e >= 10; ) e /= 10;
              return s(e);
            }
            return s((e /= 1e3));
          }
          e.defineLocale("lb", {
            months:
              "Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split(
                "_",
              ),
            monthsShort:
              "Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split(
                "_",
              ),
            weekdaysShort: "So._Mé._Dë._Më._Do._Fr._Sa.".split("_"),
            weekdaysMin: "So_Mé_Dë_Më_Do_Fr_Sa".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "H:mm [Auer]",
              LTS: "H:mm:ss [Auer]",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm [Auer]",
              LLLL: "dddd, D. MMMM YYYY H:mm [Auer]",
            },
            calendar: {
              sameDay: "[Haut um] LT",
              sameElse: "L",
              nextDay: "[Muer um] LT",
              nextWeek: "dddd [um] LT",
              lastDay: "[Gëschter um] LT",
              lastWeek: function () {
                switch (this.day()) {
                  case 2:
                  case 4:
                    return "[Leschten] dddd [um] LT";
                  default:
                    return "[Leschte] dddd [um] LT";
                }
              },
            },
            relativeTime: {
              future: n,
              past: a,
              s: "e puer Sekonnen",
              ss: "%d Sekonnen",
              m: t,
              mm: "%d Minutten",
              h: t,
              hh: "%d Stonnen",
              d: t,
              dd: "%d Deeg",
              M: t,
              MM: "%d Méint",
              y: t,
              yy: "%d Joer",
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("lo", {
            months:
              "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split(
                "_",
              ),
            monthsShort:
              "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split(
                "_",
              ),
            weekdays: "ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),
            weekdaysShort: "ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),
            weekdaysMin: "ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "ວັນdddd D MMMM YYYY HH:mm",
            },
            meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
            isPM: function (e) {
              return "ຕອນແລງ" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "ຕອນເຊົ້າ" : "ຕອນແລງ";
            },
            calendar: {
              sameDay: "[ມື້ນີ້ເວລາ] LT",
              nextDay: "[ມື້ອື່ນເວລາ] LT",
              nextWeek: "[ວັນ]dddd[ໜ້າເວລາ] LT",
              lastDay: "[ມື້ວານນີ້ເວລາ] LT",
              lastWeek: "[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "ອີກ %s",
              past: "%sຜ່ານມາ",
              s: "ບໍ່ເທົ່າໃດວິນາທີ",
              ss: "%d ວິນາທີ",
              m: "1 ນາທີ",
              mm: "%d ນາທີ",
              h: "1 ຊົ່ວໂມງ",
              hh: "%d ຊົ່ວໂມງ",
              d: "1 ມື້",
              dd: "%d ມື້",
              M: "1 ເດືອນ",
              MM: "%d ເດືອນ",
              y: "1 ປີ",
              yy: "%d ປີ",
            },
            dayOfMonthOrdinalParse: /(ທີ່)\d{1,2}/,
            ordinal: function (e) {
              return "ທີ່" + e;
            },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
            ss: "sekundė_sekundžių_sekundes",
            m: "minutė_minutės_minutę",
            mm: "minutės_minučių_minutes",
            h: "valanda_valandos_valandą",
            hh: "valandos_valandų_valandas",
            d: "diena_dienos_dieną",
            dd: "dienos_dienų_dienas",
            M: "mėnuo_mėnesio_mėnesį",
            MM: "mėnesiai_mėnesių_mėnesius",
            y: "metai_metų_metus",
            yy: "metai_metų_metus",
          };
          function n(e, t, n, a) {
            return t
              ? "kelios sekundės"
              : a
                ? "kelių sekundžių"
                : "kelias sekundes";
          }
          function a(e, t, n, a) {
            return t ? i(n)[0] : a ? i(n)[1] : i(n)[2];
          }
          function s(e) {
            return e % 10 == 0 || (e > 10 && e < 20);
          }
          function i(e) {
            return t[e].split("_");
          }
          function r(e, t, n, r) {
            var o = e + " ";
            return 1 === e
              ? o + a(e, t, n[0], r)
              : t
                ? o + (s(e) ? i(n)[1] : i(n)[0])
                : r
                  ? o + i(n)[1]
                  : o + (s(e) ? i(n)[1] : i(n)[2]);
          }
          e.defineLocale("lt", {
            months: {
              format:
                "sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split(
                  "_",
                ),
              standalone:
                "sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split(
                  "_",
                ),
              isFormat:
                /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/,
            },
            monthsShort:
              "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
            weekdays: {
              format:
                "sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį".split(
                  "_",
                ),
              standalone:
                "sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split(
                  "_",
                ),
              isFormat: /dddd HH:mm/,
            },
            weekdaysShort: "Sek_Pir_Ant_Tre_Ket_Pen_Šeš".split("_"),
            weekdaysMin: "S_P_A_T_K_Pn_Š".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "YYYY-MM-DD",
              LL: "YYYY [m.] MMMM D [d.]",
              LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
              LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
              l: "YYYY-MM-DD",
              ll: "YYYY [m.] MMMM D [d.]",
              lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
              llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]",
            },
            calendar: {
              sameDay: "[Šiandien] LT",
              nextDay: "[Rytoj] LT",
              nextWeek: "dddd LT",
              lastDay: "[Vakar] LT",
              lastWeek: "[Praėjusį] dddd LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "po %s",
              past: "prieš %s",
              s: n,
              ss: r,
              m: a,
              mm: r,
              h: a,
              hh: r,
              d: a,
              dd: r,
              M: a,
              MM: r,
              y: a,
              yy: r,
            },
            dayOfMonthOrdinalParse: /\d{1,2}-oji/,
            ordinal: function (e) {
              return e + "-oji";
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
            ss: "sekundes_sekundēm_sekunde_sekundes".split("_"),
            m: "minūtes_minūtēm_minūte_minūtes".split("_"),
            mm: "minūtes_minūtēm_minūte_minūtes".split("_"),
            h: "stundas_stundām_stunda_stundas".split("_"),
            hh: "stundas_stundām_stunda_stundas".split("_"),
            d: "dienas_dienām_diena_dienas".split("_"),
            dd: "dienas_dienām_diena_dienas".split("_"),
            M: "mēneša_mēnešiem_mēnesis_mēneši".split("_"),
            MM: "mēneša_mēnešiem_mēnesis_mēneši".split("_"),
            y: "gada_gadiem_gads_gadi".split("_"),
            yy: "gada_gadiem_gads_gadi".split("_"),
          };
          function n(e, t, n) {
            return n
              ? t % 10 == 1 && t % 100 != 11
                ? e[2]
                : e[3]
              : t % 10 == 1 && t % 100 != 11
                ? e[0]
                : e[1];
          }
          function a(e, a, s) {
            return e + " " + n(t[s], e, a);
          }
          function s(e, a, s) {
            return n(t[s], e, a);
          }
          function i(e, t) {
            return t ? "dažas sekundes" : "dažām sekundēm";
          }
          e.defineLocale("lv", {
            months:
              "janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split(
                "_",
              ),
            monthsShort:
              "jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),
            weekdays:
              "svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split(
                "_",
              ),
            weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"),
            weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY.",
              LL: "YYYY. [gada] D. MMMM",
              LLL: "YYYY. [gada] D. MMMM, HH:mm",
              LLLL: "YYYY. [gada] D. MMMM, dddd, HH:mm",
            },
            calendar: {
              sameDay: "[Šodien pulksten] LT",
              nextDay: "[Rīt pulksten] LT",
              nextWeek: "dddd [pulksten] LT",
              lastDay: "[Vakar pulksten] LT",
              lastWeek: "[Pagājušā] dddd [pulksten] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "pēc %s",
              past: "pirms %s",
              s: i,
              ss: a,
              m: s,
              mm: a,
              h: s,
              hh: a,
              d: s,
              dd: a,
              M: s,
              MM: a,
              y: s,
              yy: a,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
            words: {
              ss: ["sekund", "sekunda", "sekundi"],
              m: ["jedan minut", "jednog minuta"],
              mm: ["minut", "minuta", "minuta"],
              h: ["jedan sat", "jednog sata"],
              hh: ["sat", "sata", "sati"],
              dd: ["dan", "dana", "dana"],
              MM: ["mjesec", "mjeseca", "mjeseci"],
              yy: ["godina", "godine", "godina"],
            },
            correctGrammaticalCase: function (e, t) {
              return 1 === e ? t[0] : e >= 2 && e <= 4 ? t[1] : t[2];
            },
            translate: function (e, n, a) {
              var s = t.words[a];
              return 1 === a.length
                ? n
                  ? s[0]
                  : s[1]
                : e + " " + t.correctGrammaticalCase(e, s);
            },
          };
          e.defineLocale("me", {
            months:
              "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split(
                "_",
              ),
            monthsShort:
              "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split(
                "_",
              ),
            weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
            weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm",
              LLLL: "dddd, D. MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[danas u] LT",
              nextDay: "[sjutra u] LT",
              nextWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[u] [nedjelju] [u] LT";
                  case 3:
                    return "[u] [srijedu] [u] LT";
                  case 6:
                    return "[u] [subotu] [u] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[u] dddd [u] LT";
                }
              },
              lastDay: "[juče u] LT",
              lastWeek: function () {
                return [
                  "[prošle] [nedjelje] [u] LT",
                  "[prošlog] [ponedjeljka] [u] LT",
                  "[prošlog] [utorka] [u] LT",
                  "[prošle] [srijede] [u] LT",
                  "[prošlog] [četvrtka] [u] LT",
                  "[prošlog] [petka] [u] LT",
                  "[prošle] [subote] [u] LT",
                ][this.day()];
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "za %s",
              past: "prije %s",
              s: "nekoliko sekundi",
              ss: t.translate,
              m: t.translate,
              mm: t.translate,
              h: t.translate,
              hh: t.translate,
              d: "dan",
              dd: t.translate,
              M: "mjesec",
              MM: t.translate,
              y: "godinu",
              yy: t.translate,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("mi", {
            months:
              "Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea".split(
                "_",
              ),
            monthsShort:
              "Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki".split(
                "_",
              ),
            monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
            monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
            monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
            monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,
            weekdays: "Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei".split(
              "_",
            ),
            weekdaysShort: "Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"),
            weekdaysMin: "Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY [i] HH:mm",
              LLLL: "dddd, D MMMM YYYY [i] HH:mm",
            },
            calendar: {
              sameDay: "[i teie mahana, i] LT",
              nextDay: "[apopo i] LT",
              nextWeek: "dddd [i] LT",
              lastDay: "[inanahi i] LT",
              lastWeek: "dddd [whakamutunga i] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "i roto i %s",
              past: "%s i mua",
              s: "te hēkona ruarua",
              ss: "%d hēkona",
              m: "he meneti",
              mm: "%d meneti",
              h: "te haora",
              hh: "%d haora",
              d: "he ra",
              dd: "%d ra",
              M: "he marama",
              MM: "%d marama",
              y: "he tau",
              yy: "%d tau",
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("mk", {
            months:
              "јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split(
                "_",
              ),
            monthsShort:
              "јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"),
            weekdays:
              "недела_понеделник_вторник_среда_четврток_петок_сабота".split(
                "_",
              ),
            weekdaysShort: "нед_пон_вто_сре_чет_пет_саб".split("_"),
            weekdaysMin: "нe_пo_вт_ср_че_пе_сa".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "D.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY H:mm",
              LLLL: "dddd, D MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[Денес во] LT",
              nextDay: "[Утре во] LT",
              nextWeek: "[Во] dddd [во] LT",
              lastDay: "[Вчера во] LT",
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                  case 3:
                  case 6:
                    return "[Изминатата] dddd [во] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[Изминатиот] dddd [во] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "после %s",
              past: "пред %s",
              s: "неколку секунди",
              ss: "%d секунди",
              m: "минута",
              mm: "%d минути",
              h: "час",
              hh: "%d часа",
              d: "ден",
              dd: "%d дена",
              M: "месец",
              MM: "%d месеци",
              y: "година",
              yy: "%d години",
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
            ordinal: function (e) {
              var t = e % 10,
                n = e % 100;
              return 0 === e
                ? e + "-ев"
                : 0 === n
                  ? e + "-ен"
                  : n > 10 && n < 20
                    ? e + "-ти"
                    : 1 === t
                      ? e + "-ви"
                      : 2 === t
                        ? e + "-ри"
                        : 7 === t || 8 === t
                          ? e + "-ми"
                          : e + "-ти";
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ml", {
            months:
              "ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split(
                "_",
              ),
            monthsShort:
              "ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split(
                "_",
              ),
            weekdaysShort: "ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split(
              "_",
            ),
            weekdaysMin: "ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"),
            longDateFormat: {
              LT: "A h:mm -നു",
              LTS: "A h:mm:ss -നു",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, A h:mm -നു",
              LLLL: "dddd, D MMMM YYYY, A h:mm -നു",
            },
            calendar: {
              sameDay: "[ഇന്ന്] LT",
              nextDay: "[നാളെ] LT",
              nextWeek: "dddd, LT",
              lastDay: "[ഇന്നലെ] LT",
              lastWeek: "[കഴിഞ്ഞ] dddd, LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s കഴിഞ്ഞ്",
              past: "%s മുൻപ്",
              s: "അൽപ നിമിഷങ്ങൾ",
              ss: "%d സെക്കൻഡ്",
              m: "ഒരു മിനിറ്റ്",
              mm: "%d മിനിറ്റ്",
              h: "ഒരു മണിക്കൂർ",
              hh: "%d മണിക്കൂർ",
              d: "ഒരു ദിവസം",
              dd: "%d ദിവസം",
              M: "ഒരു മാസം",
              MM: "%d മാസം",
              y: "ഒരു വർഷം",
              yy: "%d വർഷം",
            },
            meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                ("രാത്രി" === t && e >= 4) ||
                "ഉച്ച കഴിഞ്ഞ്" === t ||
                "വൈകുന്നേരം" === t
                  ? e + 12
                  : e
              );
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "രാത്രി"
                : e < 12
                  ? "രാവിലെ"
                  : e < 17
                    ? "ഉച്ച കഴിഞ്ഞ്"
                    : e < 20
                      ? "വൈകുന്നേരം"
                      : "രാത്രി";
            },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n, a) {
            switch (n) {
              case "s":
                return t ? "хэдхэн секунд" : "хэдхэн секундын";
              case "ss":
                return e + (t ? " секунд" : " секундын");
              case "m":
              case "mm":
                return e + (t ? " минут" : " минутын");
              case "h":
              case "hh":
                return e + (t ? " цаг" : " цагийн");
              case "d":
              case "dd":
                return e + (t ? " өдөр" : " өдрийн");
              case "M":
              case "MM":
                return e + (t ? " сар" : " сарын");
              case "y":
              case "yy":
                return e + (t ? " жил" : " жилийн");
              default:
                return e;
            }
          }
          e.defineLocale("mn", {
            months:
              "Нэгдүгээр сар_Хоёрдугаар сар_Гуравдугаар сар_Дөрөвдүгээр сар_Тавдугаар сар_Зургадугаар сар_Долдугаар сар_Наймдугаар сар_Есдүгээр сар_Аравдугаар сар_Арван нэгдүгээр сар_Арван хоёрдугаар сар".split(
                "_",
              ),
            monthsShort:
              "1 сар_2 сар_3 сар_4 сар_5 сар_6 сар_7 сар_8 сар_9 сар_10 сар_11 сар_12 сар".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays: "Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба".split("_"),
            weekdaysShort: "Ням_Дав_Мяг_Лха_Пүр_Баа_Бям".split("_"),
            weekdaysMin: "Ня_Да_Мя_Лх_Пү_Ба_Бя".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "YYYY-MM-DD",
              LL: "YYYY оны MMMMын D",
              LLL: "YYYY оны MMMMын D HH:mm",
              LLLL: "dddd, YYYY оны MMMMын D HH:mm",
            },
            meridiemParse: /ҮӨ|ҮХ/i,
            isPM: function (e) {
              return "ҮХ" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "ҮӨ" : "ҮХ";
            },
            calendar: {
              sameDay: "[Өнөөдөр] LT",
              nextDay: "[Маргааш] LT",
              nextWeek: "[Ирэх] dddd LT",
              lastDay: "[Өчигдөр] LT",
              lastWeek: "[Өнгөрсөн] dddd LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s дараа",
              past: "%s өмнө",
              s: t,
              ss: t,
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: t,
              dd: t,
              M: t,
              MM: t,
              y: t,
              yy: t,
            },
            dayOfMonthOrdinalParse: /\d{1,2} өдөр/,
            ordinal: function (e, t) {
              switch (t) {
                case "d":
                case "D":
                case "DDD":
                  return e + " өдөр";
                default:
                  return e;
              }
            },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "१",
              2: "२",
              3: "३",
              4: "४",
              5: "५",
              6: "६",
              7: "७",
              8: "८",
              9: "९",
              0: "०",
            },
            n = {
              "१": "1",
              "२": "2",
              "३": "3",
              "४": "4",
              "५": "5",
              "६": "6",
              "७": "7",
              "८": "8",
              "९": "9",
              "०": "0",
            };
          function a(e, t, n, a) {
            var s = "";
            if (t)
              switch (n) {
                case "s":
                  s = "काही सेकंद";
                  break;
                case "ss":
                  s = "%d सेकंद";
                  break;
                case "m":
                  s = "एक मिनिट";
                  break;
                case "mm":
                  s = "%d मिनिटे";
                  break;
                case "h":
                  s = "एक तास";
                  break;
                case "hh":
                  s = "%d तास";
                  break;
                case "d":
                  s = "एक दिवस";
                  break;
                case "dd":
                  s = "%d दिवस";
                  break;
                case "M":
                  s = "एक महिना";
                  break;
                case "MM":
                  s = "%d महिने";
                  break;
                case "y":
                  s = "एक वर्ष";
                  break;
                case "yy":
                  s = "%d वर्षे";
              }
            else
              switch (n) {
                case "s":
                  s = "काही सेकंदां";
                  break;
                case "ss":
                  s = "%d सेकंदां";
                  break;
                case "m":
                  s = "एका मिनिटा";
                  break;
                case "mm":
                  s = "%d मिनिटां";
                  break;
                case "h":
                  s = "एका तासा";
                  break;
                case "hh":
                  s = "%d तासां";
                  break;
                case "d":
                  s = "एका दिवसा";
                  break;
                case "dd":
                  s = "%d दिवसां";
                  break;
                case "M":
                  s = "एका महिन्या";
                  break;
                case "MM":
                  s = "%d महिन्यां";
                  break;
                case "y":
                  s = "एका वर्षा";
                  break;
                case "yy":
                  s = "%d वर्षां";
              }
            return s.replace(/%d/i, e);
          }
          e.defineLocale("mr", {
            months:
              "जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर".split(
                "_",
              ),
            monthsShort:
              "जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
            weekdaysShort: "रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि".split("_"),
            weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"),
            longDateFormat: {
              LT: "A h:mm वाजता",
              LTS: "A h:mm:ss वाजता",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, A h:mm वाजता",
              LLLL: "dddd, D MMMM YYYY, A h:mm वाजता",
            },
            calendar: {
              sameDay: "[आज] LT",
              nextDay: "[उद्या] LT",
              nextWeek: "dddd, LT",
              lastDay: "[काल] LT",
              lastWeek: "[मागील] dddd, LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%sमध्ये",
              past: "%sपूर्वी",
              s: a,
              ss: a,
              m: a,
              mm: a,
              h: a,
              hh: a,
              d: a,
              dd: a,
              M: a,
              MM: a,
              y: a,
              yy: a,
            },
            preparse: function (e) {
              return e.replace(/[१२३४५६७८९०]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "रात्री" === t
                  ? e < 4
                    ? e
                    : e + 12
                  : "सकाळी" === t
                    ? e
                    : "दुपारी" === t
                      ? e >= 10
                        ? e
                        : e + 12
                      : "सायंकाळी" === t
                        ? e + 12
                        : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "रात्री"
                : e < 10
                  ? "सकाळी"
                  : e < 17
                    ? "दुपारी"
                    : e < 20
                      ? "सायंकाळी"
                      : "रात्री";
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ms", {
            months:
              "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split(
                "_",
              ),
            monthsShort:
              "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
            weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
            weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
            weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
            longDateFormat: {
              LT: "HH.mm",
              LTS: "HH.mm.ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY [pukul] HH.mm",
              LLLL: "dddd, D MMMM YYYY [pukul] HH.mm",
            },
            meridiemParse: /pagi|tengahari|petang|malam/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "pagi" === t
                  ? e
                  : "tengahari" === t
                    ? e >= 11
                      ? e
                      : e + 12
                    : "petang" === t || "malam" === t
                      ? e + 12
                      : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 11
                ? "pagi"
                : e < 15
                  ? "tengahari"
                  : e < 19
                    ? "petang"
                    : "malam";
            },
            calendar: {
              sameDay: "[Hari ini pukul] LT",
              nextDay: "[Esok pukul] LT",
              nextWeek: "dddd [pukul] LT",
              lastDay: "[Kelmarin pukul] LT",
              lastWeek: "dddd [lepas pukul] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "dalam %s",
              past: "%s yang lepas",
              s: "beberapa saat",
              ss: "%d saat",
              m: "seminit",
              mm: "%d minit",
              h: "sejam",
              hh: "%d jam",
              d: "sehari",
              dd: "%d hari",
              M: "sebulan",
              MM: "%d bulan",
              y: "setahun",
              yy: "%d tahun",
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ms-my", {
            months:
              "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split(
                "_",
              ),
            monthsShort:
              "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
            weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
            weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
            weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
            longDateFormat: {
              LT: "HH.mm",
              LTS: "HH.mm.ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY [pukul] HH.mm",
              LLLL: "dddd, D MMMM YYYY [pukul] HH.mm",
            },
            meridiemParse: /pagi|tengahari|petang|malam/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "pagi" === t
                  ? e
                  : "tengahari" === t
                    ? e >= 11
                      ? e
                      : e + 12
                    : "petang" === t || "malam" === t
                      ? e + 12
                      : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 11
                ? "pagi"
                : e < 15
                  ? "tengahari"
                  : e < 19
                    ? "petang"
                    : "malam";
            },
            calendar: {
              sameDay: "[Hari ini pukul] LT",
              nextDay: "[Esok pukul] LT",
              nextWeek: "dddd [pukul] LT",
              lastDay: "[Kelmarin pukul] LT",
              lastWeek: "dddd [lepas pukul] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "dalam %s",
              past: "%s yang lepas",
              s: "beberapa saat",
              ss: "%d saat",
              m: "seminit",
              mm: "%d minit",
              h: "sejam",
              hh: "%d jam",
              d: "sehari",
              dd: "%d hari",
              M: "sebulan",
              MM: "%d bulan",
              y: "setahun",
              yy: "%d tahun",
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("mt", {
            months:
              "Jannar_Frar_Marzu_April_Mejju_Ġunju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Diċembru".split(
                "_",
              ),
            monthsShort:
              "Jan_Fra_Mar_Apr_Mej_Ġun_Lul_Aww_Set_Ott_Nov_Diċ".split("_"),
            weekdays:
              "Il-Ħadd_It-Tnejn_It-Tlieta_L-Erbgħa_Il-Ħamis_Il-Ġimgħa_Is-Sibt".split(
                "_",
              ),
            weekdaysShort: "Ħad_Tne_Tli_Erb_Ħam_Ġim_Sib".split("_"),
            weekdaysMin: "Ħa_Tn_Tl_Er_Ħa_Ġi_Si".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Illum fil-]LT",
              nextDay: "[Għada fil-]LT",
              nextWeek: "dddd [fil-]LT",
              lastDay: "[Il-bieraħ fil-]LT",
              lastWeek: "dddd [li għadda] [fil-]LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "f’ %s",
              past: "%s ilu",
              s: "ftit sekondi",
              ss: "%d sekondi",
              m: "minuta",
              mm: "%d minuti",
              h: "siegħa",
              hh: "%d siegħat",
              d: "ġurnata",
              dd: "%d ġranet",
              M: "xahar",
              MM: "%d xhur",
              y: "sena",
              yy: "%d sni",
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "၁",
              2: "၂",
              3: "၃",
              4: "၄",
              5: "၅",
              6: "၆",
              7: "၇",
              8: "၈",
              9: "၉",
              0: "၀",
            },
            n = {
              "၁": "1",
              "၂": "2",
              "၃": "3",
              "၄": "4",
              "၅": "5",
              "၆": "6",
              "၇": "7",
              "၈": "8",
              "၉": "9",
              "၀": "0",
            };
          e.defineLocale("my", {
            months:
              "ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ".split(
                "_",
              ),
            monthsShort:
              "ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ".split("_"),
            weekdays:
              "တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ".split(
                "_",
              ),
            weekdaysShort: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),
            weekdaysMin: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[ယနေ.] LT [မှာ]",
              nextDay: "[မနက်ဖြန်] LT [မှာ]",
              nextWeek: "dddd LT [မှာ]",
              lastDay: "[မနေ.က] LT [မှာ]",
              lastWeek: "[ပြီးခဲ့သော] dddd LT [မှာ]",
              sameElse: "L",
            },
            relativeTime: {
              future: "လာမည့် %s မှာ",
              past: "လွန်ခဲ့သော %s က",
              s: "စက္ကန်.အနည်းငယ်",
              ss: "%d စက္ကန့်",
              m: "တစ်မိနစ်",
              mm: "%d မိနစ်",
              h: "တစ်နာရီ",
              hh: "%d နာရီ",
              d: "တစ်ရက်",
              dd: "%d ရက်",
              M: "တစ်လ",
              MM: "%d လ",
              y: "တစ်နှစ်",
              yy: "%d နှစ်",
            },
            preparse: function (e) {
              return e.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("nb", {
            months:
              "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split(
                "_",
              ),
            monthsShort:
              "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
            weekdaysShort: "sø._ma._ti._on._to._fr._lø.".split("_"),
            weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY [kl.] HH:mm",
              LLLL: "dddd D. MMMM YYYY [kl.] HH:mm",
            },
            calendar: {
              sameDay: "[i dag kl.] LT",
              nextDay: "[i morgen kl.] LT",
              nextWeek: "dddd [kl.] LT",
              lastDay: "[i går kl.] LT",
              lastWeek: "[forrige] dddd [kl.] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "om %s",
              past: "%s siden",
              s: "noen sekunder",
              ss: "%d sekunder",
              m: "ett minutt",
              mm: "%d minutter",
              h: "en time",
              hh: "%d timer",
              d: "en dag",
              dd: "%d dager",
              M: "en måned",
              MM: "%d måneder",
              y: "ett år",
              yy: "%d år",
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "१",
              2: "२",
              3: "३",
              4: "४",
              5: "५",
              6: "६",
              7: "७",
              8: "८",
              9: "९",
              0: "०",
            },
            n = {
              "१": "1",
              "२": "2",
              "३": "3",
              "४": "4",
              "५": "5",
              "६": "6",
              "७": "7",
              "८": "8",
              "९": "9",
              "०": "0",
            };
          e.defineLocale("ne", {
            months:
              "जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split(
                "_",
              ),
            monthsShort:
              "जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split(
                "_",
              ),
            weekdaysShort: "आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),
            weekdaysMin: "आ._सो._मं._बु._बि._शु._श.".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "Aको h:mm बजे",
              LTS: "Aको h:mm:ss बजे",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, Aको h:mm बजे",
              LLLL: "dddd, D MMMM YYYY, Aको h:mm बजे",
            },
            preparse: function (e) {
              return e.replace(/[१२३४५६७८९०]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "राति" === t
                  ? e < 4
                    ? e
                    : e + 12
                  : "बिहान" === t
                    ? e
                    : "दिउँसो" === t
                      ? e >= 10
                        ? e
                        : e + 12
                      : "साँझ" === t
                        ? e + 12
                        : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 3
                ? "राति"
                : e < 12
                  ? "बिहान"
                  : e < 16
                    ? "दिउँसो"
                    : e < 20
                      ? "साँझ"
                      : "राति";
            },
            calendar: {
              sameDay: "[आज] LT",
              nextDay: "[भोलि] LT",
              nextWeek: "[आउँदो] dddd[,] LT",
              lastDay: "[हिजो] LT",
              lastWeek: "[गएको] dddd[,] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%sमा",
              past: "%s अगाडि",
              s: "केही क्षण",
              ss: "%d सेकेण्ड",
              m: "एक मिनेट",
              mm: "%d मिनेट",
              h: "एक घण्टा",
              hh: "%d घण्टा",
              d: "एक दिन",
              dd: "%d दिन",
              M: "एक महिना",
              MM: "%d महिना",
              y: "एक बर्ष",
              yy: "%d बर्ष",
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
              "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split(
                "_",
              ),
            n = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
            a = [
              /^jan/i,
              /^feb/i,
              /^maart|mrt.?$/i,
              /^apr/i,
              /^mei$/i,
              /^jun[i.]?$/i,
              /^jul[i.]?$/i,
              /^aug/i,
              /^sep/i,
              /^okt/i,
              /^nov/i,
              /^dec/i,
            ],
            s =
              /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
          e.defineLocale("nl", {
            months:
              "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split(
                "_",
              ),
            monthsShort: function (e, a) {
              return e ? (/-MMM-/.test(a) ? n[e.month()] : t[e.month()]) : t;
            },
            monthsRegex: s,
            monthsShortRegex: s,
            monthsStrictRegex:
              /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,
            monthsShortStrictRegex:
              /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
            monthsParse: a,
            longMonthsParse: a,
            shortMonthsParse: a,
            weekdays:
              "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split(
                "_",
              ),
            weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
            weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD-MM-YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[vandaag om] LT",
              nextDay: "[morgen om] LT",
              nextWeek: "dddd [om] LT",
              lastDay: "[gisteren om] LT",
              lastWeek: "[afgelopen] dddd [om] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "over %s",
              past: "%s geleden",
              s: "een paar seconden",
              ss: "%d seconden",
              m: "één minuut",
              mm: "%d minuten",
              h: "één uur",
              hh: "%d uur",
              d: "één dag",
              dd: "%d dagen",
              M: "één maand",
              MM: "%d maanden",
              y: "één jaar",
              yy: "%d jaar",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
            ordinal: function (e) {
              return e + (1 === e || 8 === e || e >= 20 ? "ste" : "de");
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
              "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split(
                "_",
              ),
            n = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
            a = [
              /^jan/i,
              /^feb/i,
              /^maart|mrt.?$/i,
              /^apr/i,
              /^mei$/i,
              /^jun[i.]?$/i,
              /^jul[i.]?$/i,
              /^aug/i,
              /^sep/i,
              /^okt/i,
              /^nov/i,
              /^dec/i,
            ],
            s =
              /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
          e.defineLocale("nl-be", {
            months:
              "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split(
                "_",
              ),
            monthsShort: function (e, a) {
              return e ? (/-MMM-/.test(a) ? n[e.month()] : t[e.month()]) : t;
            },
            monthsRegex: s,
            monthsShortRegex: s,
            monthsStrictRegex:
              /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,
            monthsShortStrictRegex:
              /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
            monthsParse: a,
            longMonthsParse: a,
            shortMonthsParse: a,
            weekdays:
              "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split(
                "_",
              ),
            weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
            weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[vandaag om] LT",
              nextDay: "[morgen om] LT",
              nextWeek: "dddd [om] LT",
              lastDay: "[gisteren om] LT",
              lastWeek: "[afgelopen] dddd [om] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "over %s",
              past: "%s geleden",
              s: "een paar seconden",
              ss: "%d seconden",
              m: "één minuut",
              mm: "%d minuten",
              h: "één uur",
              hh: "%d uur",
              d: "één dag",
              dd: "%d dagen",
              M: "één maand",
              MM: "%d maanden",
              y: "één jaar",
              yy: "%d jaar",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
            ordinal: function (e) {
              return e + (1 === e || 8 === e || e >= 20 ? "ste" : "de");
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("nn", {
            months:
              "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split(
                "_",
              ),
            monthsShort:
              "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
            weekdays:
              "sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),
            weekdaysShort: "sun_mån_tys_ons_tor_fre_lau".split("_"),
            weekdaysMin: "su_må_ty_on_to_fr_lø".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY [kl.] H:mm",
              LLLL: "dddd D. MMMM YYYY [kl.] HH:mm",
            },
            calendar: {
              sameDay: "[I dag klokka] LT",
              nextDay: "[I morgon klokka] LT",
              nextWeek: "dddd [klokka] LT",
              lastDay: "[I går klokka] LT",
              lastWeek: "[Føregåande] dddd [klokka] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "om %s",
              past: "%s sidan",
              s: "nokre sekund",
              ss: "%d sekund",
              m: "eit minutt",
              mm: "%d minutt",
              h: "ein time",
              hh: "%d timar",
              d: "ein dag",
              dd: "%d dagar",
              M: "ein månad",
              MM: "%d månader",
              y: "eit år",
              yy: "%d år",
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "੧",
              2: "੨",
              3: "੩",
              4: "੪",
              5: "੫",
              6: "੬",
              7: "੭",
              8: "੮",
              9: "੯",
              0: "੦",
            },
            n = {
              "੧": "1",
              "੨": "2",
              "੩": "3",
              "੪": "4",
              "੫": "5",
              "੬": "6",
              "੭": "7",
              "੮": "8",
              "੯": "9",
              "੦": "0",
            };
          e.defineLocale("pa-in", {
            months:
              "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split(
                "_",
              ),
            monthsShort:
              "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split(
                "_",
              ),
            weekdays:
              "ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ".split(
                "_",
              ),
            weekdaysShort: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"),
            weekdaysMin: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"),
            longDateFormat: {
              LT: "A h:mm ਵਜੇ",
              LTS: "A h:mm:ss ਵਜੇ",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, A h:mm ਵਜੇ",
              LLLL: "dddd, D MMMM YYYY, A h:mm ਵਜੇ",
            },
            calendar: {
              sameDay: "[ਅਜ] LT",
              nextDay: "[ਕਲ] LT",
              nextWeek: "[ਅਗਲਾ] dddd, LT",
              lastDay: "[ਕਲ] LT",
              lastWeek: "[ਪਿਛਲੇ] dddd, LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s ਵਿੱਚ",
              past: "%s ਪਿਛਲੇ",
              s: "ਕੁਝ ਸਕਿੰਟ",
              ss: "%d ਸਕਿੰਟ",
              m: "ਇਕ ਮਿੰਟ",
              mm: "%d ਮਿੰਟ",
              h: "ਇੱਕ ਘੰਟਾ",
              hh: "%d ਘੰਟੇ",
              d: "ਇੱਕ ਦਿਨ",
              dd: "%d ਦਿਨ",
              M: "ਇੱਕ ਮਹੀਨਾ",
              MM: "%d ਮਹੀਨੇ",
              y: "ਇੱਕ ਸਾਲ",
              yy: "%d ਸਾਲ",
            },
            preparse: function (e) {
              return e.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "ਰਾਤ" === t
                  ? e < 4
                    ? e
                    : e + 12
                  : "ਸਵੇਰ" === t
                    ? e
                    : "ਦੁਪਹਿਰ" === t
                      ? e >= 10
                        ? e
                        : e + 12
                      : "ਸ਼ਾਮ" === t
                        ? e + 12
                        : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "ਰਾਤ"
                : e < 10
                  ? "ਸਵੇਰ"
                  : e < 17
                    ? "ਦੁਪਹਿਰ"
                    : e < 20
                      ? "ਸ਼ਾਮ"
                      : "ਰਾਤ";
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
              "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split(
                "_",
              ),
            n =
              "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split(
                "_",
              );
          function a(e) {
            return e % 10 < 5 && e % 10 > 1 && ~~(e / 10) % 10 != 1;
          }
          function s(e, t, n) {
            var s = e + " ";
            switch (n) {
              case "ss":
                return s + (a(e) ? "sekundy" : "sekund");
              case "m":
                return t ? "minuta" : "minutę";
              case "mm":
                return s + (a(e) ? "minuty" : "minut");
              case "h":
                return t ? "godzina" : "godzinę";
              case "hh":
                return s + (a(e) ? "godziny" : "godzin");
              case "MM":
                return s + (a(e) ? "miesiące" : "miesięcy");
              case "yy":
                return s + (a(e) ? "lata" : "lat");
            }
          }
          e.defineLocale("pl", {
            months: function (e, a) {
              return e
                ? "" === a
                  ? "(" + n[e.month()] + "|" + t[e.month()] + ")"
                  : /D MMMM/.test(a)
                    ? n[e.month()]
                    : t[e.month()]
                : t;
            },
            monthsShort:
              "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
            weekdays:
              "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split(
                "_",
              ),
            weekdaysShort: "ndz_pon_wt_śr_czw_pt_sob".split("_"),
            weekdaysMin: "Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Dziś o] LT",
              nextDay: "[Jutro o] LT",
              nextWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[W niedzielę o] LT";
                  case 2:
                    return "[We wtorek o] LT";
                  case 3:
                    return "[W środę o] LT";
                  case 6:
                    return "[W sobotę o] LT";
                  default:
                    return "[W] dddd [o] LT";
                }
              },
              lastDay: "[Wczoraj o] LT",
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[W zeszłą niedzielę o] LT";
                  case 3:
                    return "[W zeszłą środę o] LT";
                  case 6:
                    return "[W zeszłą sobotę o] LT";
                  default:
                    return "[W zeszły] dddd [o] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "za %s",
              past: "%s temu",
              s: "kilka sekund",
              ss: s,
              m: s,
              mm: s,
              h: s,
              hh: s,
              d: "1 dzień",
              dd: "%d dni",
              M: "miesiąc",
              MM: s,
              y: "rok",
              yy: s,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("pt", {
            months:
              "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
                "_",
              ),
            monthsShort:
              "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
            weekdays:
              "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split(
                "_",
              ),
            weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
            weekdaysMin: "Do_2ª_3ª_4ª_5ª_6ª_Sá".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D [de] MMMM [de] YYYY",
              LLL: "D [de] MMMM [de] YYYY HH:mm",
              LLLL: "dddd, D [de] MMMM [de] YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Hoje às] LT",
              nextDay: "[Amanhã às] LT",
              nextWeek: "dddd [às] LT",
              lastDay: "[Ontem às] LT",
              lastWeek: function () {
                return 0 === this.day() || 6 === this.day()
                  ? "[Último] dddd [às] LT"
                  : "[Última] dddd [às] LT";
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "em %s",
              past: "há %s",
              s: "segundos",
              ss: "%d segundos",
              m: "um minuto",
              mm: "%d minutos",
              h: "uma hora",
              hh: "%d horas",
              d: "um dia",
              dd: "%d dias",
              M: "um mês",
              MM: "%d meses",
              y: "um ano",
              yy: "%d anos",
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("pt-br", {
            months:
              "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
                "_",
              ),
            monthsShort:
              "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
            weekdays:
              "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split(
                "_",
              ),
            weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
            weekdaysMin: "Do_2ª_3ª_4ª_5ª_6ª_Sá".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D [de] MMMM [de] YYYY",
              LLL: "D [de] MMMM [de] YYYY [às] HH:mm",
              LLLL: "dddd, D [de] MMMM [de] YYYY [às] HH:mm",
            },
            calendar: {
              sameDay: "[Hoje às] LT",
              nextDay: "[Amanhã às] LT",
              nextWeek: "dddd [às] LT",
              lastDay: "[Ontem às] LT",
              lastWeek: function () {
                return 0 === this.day() || 6 === this.day()
                  ? "[Último] dddd [às] LT"
                  : "[Última] dddd [às] LT";
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "em %s",
              past: "há %s",
              s: "poucos segundos",
              ss: "%d segundos",
              m: "um minuto",
              mm: "%d minutos",
              h: "uma hora",
              hh: "%d horas",
              d: "um dia",
              dd: "%d dias",
              M: "um mês",
              MM: "%d meses",
              y: "um ano",
              yy: "%d anos",
            },
            dayOfMonthOrdinalParse: /\d{1,2}º/,
            ordinal: "%dº",
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n) {
            var a = " ";
            return (
              (e % 100 >= 20 || (e >= 100 && e % 100 == 0)) && (a = " de "),
              e +
                a +
                {
                  ss: "secunde",
                  mm: "minute",
                  hh: "ore",
                  dd: "zile",
                  MM: "luni",
                  yy: "ani",
                }[n]
            );
          }
          e.defineLocale("ro", {
            months:
              "ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie".split(
                "_",
              ),
            monthsShort:
              "ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays: "duminică_luni_marți_miercuri_joi_vineri_sâmbătă".split(
              "_",
            ),
            weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
            weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY H:mm",
              LLLL: "dddd, D MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[azi la] LT",
              nextDay: "[mâine la] LT",
              nextWeek: "dddd [la] LT",
              lastDay: "[ieri la] LT",
              lastWeek: "[fosta] dddd [la] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "peste %s",
              past: "%s în urmă",
              s: "câteva secunde",
              ss: t,
              m: "un minut",
              mm: t,
              h: "o oră",
              hh: t,
              d: "o zi",
              dd: t,
              M: "o lună",
              MM: t,
              y: "un an",
              yy: t,
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t) {
            var n = e.split("_");
            return t % 10 == 1 && t % 100 != 11
              ? n[0]
              : t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 10 || t % 100 >= 20)
                ? n[1]
                : n[2];
          }
          function n(e, n, a) {
            return "m" === a
              ? n
                ? "минута"
                : "минуту"
              : e +
                  " " +
                  t(
                    {
                      ss: n
                        ? "секунда_секунды_секунд"
                        : "секунду_секунды_секунд",
                      mm: n ? "минута_минуты_минут" : "минуту_минуты_минут",
                      hh: "час_часа_часов",
                      dd: "день_дня_дней",
                      MM: "месяц_месяца_месяцев",
                      yy: "год_года_лет",
                    }[a],
                    +e,
                  );
          }
          var a = [
            /^янв/i,
            /^фев/i,
            /^мар/i,
            /^апр/i,
            /^ма[йя]/i,
            /^июн/i,
            /^июл/i,
            /^авг/i,
            /^сен/i,
            /^окт/i,
            /^ноя/i,
            /^дек/i,
          ];
          e.defineLocale("ru", {
            months: {
              format:
                "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split(
                  "_",
                ),
              standalone:
                "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split(
                  "_",
                ),
            },
            monthsShort: {
              format:
                "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split(
                  "_",
                ),
              standalone:
                "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split(
                  "_",
                ),
            },
            weekdays: {
              standalone:
                "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split(
                  "_",
                ),
              format:
                "воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split(
                  "_",
                ),
              isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/,
            },
            weekdaysShort: "вс_пн_вт_ср_чт_пт_сб".split("_"),
            weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
            monthsParse: a,
            longMonthsParse: a,
            shortMonthsParse: a,
            monthsRegex:
              /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
            monthsShortRegex:
              /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
            monthsStrictRegex:
              /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,
            monthsShortStrictRegex:
              /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY г.",
              LLL: "D MMMM YYYY г., H:mm",
              LLLL: "dddd, D MMMM YYYY г., H:mm",
            },
            calendar: {
              sameDay: "[Сегодня, в] LT",
              nextDay: "[Завтра, в] LT",
              lastDay: "[Вчера, в] LT",
              nextWeek: function (e) {
                if (e.week() === this.week())
                  return 2 === this.day()
                    ? "[Во] dddd, [в] LT"
                    : "[В] dddd, [в] LT";
                switch (this.day()) {
                  case 0:
                    return "[В следующее] dddd, [в] LT";
                  case 1:
                  case 2:
                  case 4:
                    return "[В следующий] dddd, [в] LT";
                  case 3:
                  case 5:
                  case 6:
                    return "[В следующую] dddd, [в] LT";
                }
              },
              lastWeek: function (e) {
                if (e.week() === this.week())
                  return 2 === this.day()
                    ? "[Во] dddd, [в] LT"
                    : "[В] dddd, [в] LT";
                switch (this.day()) {
                  case 0:
                    return "[В прошлое] dddd, [в] LT";
                  case 1:
                  case 2:
                  case 4:
                    return "[В прошлый] dddd, [в] LT";
                  case 3:
                  case 5:
                  case 6:
                    return "[В прошлую] dddd, [в] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "через %s",
              past: "%s назад",
              s: "несколько секунд",
              ss: n,
              m: n,
              mm: n,
              h: "час",
              hh: n,
              d: "день",
              dd: n,
              M: "месяц",
              MM: n,
              y: "год",
              yy: n,
            },
            meridiemParse: /ночи|утра|дня|вечера/i,
            isPM: function (e) {
              return /^(дня|вечера)$/.test(e);
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "ночи"
                : e < 12
                  ? "утра"
                  : e < 17
                    ? "дня"
                    : "вечера";
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
            ordinal: function (e, t) {
              switch (t) {
                case "M":
                case "d":
                case "DDD":
                  return e + "-й";
                case "D":
                  return e + "-го";
                case "w":
                case "W":
                  return e + "-я";
                default:
                  return e;
              }
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = [
              "جنوري",
              "فيبروري",
              "مارچ",
              "اپريل",
              "مئي",
              "جون",
              "جولاءِ",
              "آگسٽ",
              "سيپٽمبر",
              "آڪٽوبر",
              "نومبر",
              "ڊسمبر",
            ],
            n = ["آچر", "سومر", "اڱارو", "اربع", "خميس", "جمع", "ڇنڇر"];
          e.defineLocale("sd", {
            months: t,
            monthsShort: t,
            weekdays: n,
            weekdaysShort: n,
            weekdaysMin: n,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd، D MMMM YYYY HH:mm",
            },
            meridiemParse: /صبح|شام/,
            isPM: function (e) {
              return "شام" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "صبح" : "شام";
            },
            calendar: {
              sameDay: "[اڄ] LT",
              nextDay: "[سڀاڻي] LT",
              nextWeek: "dddd [اڳين هفتي تي] LT",
              lastDay: "[ڪالهه] LT",
              lastWeek: "[گزريل هفتي] dddd [تي] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s پوء",
              past: "%s اڳ",
              s: "چند سيڪنڊ",
              ss: "%d سيڪنڊ",
              m: "هڪ منٽ",
              mm: "%d منٽ",
              h: "هڪ ڪلاڪ",
              hh: "%d ڪلاڪ",
              d: "هڪ ڏينهن",
              dd: "%d ڏينهن",
              M: "هڪ مهينو",
              MM: "%d مهينا",
              y: "هڪ سال",
              yy: "%d سال",
            },
            preparse: function (e) {
              return e.replace(/،/g, ",");
            },
            postformat: function (e) {
              return e.replace(/,/g, "،");
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("se", {
            months:
              "ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu".split(
                "_",
              ),
            monthsShort:
              "ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov".split(
                "_",
              ),
            weekdays:
              "sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat".split(
                "_",
              ),
            weekdaysShort: "sotn_vuos_maŋ_gask_duor_bear_láv".split("_"),
            weekdaysMin: "s_v_m_g_d_b_L".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "MMMM D. [b.] YYYY",
              LLL: "MMMM D. [b.] YYYY [ti.] HH:mm",
              LLLL: "dddd, MMMM D. [b.] YYYY [ti.] HH:mm",
            },
            calendar: {
              sameDay: "[otne ti] LT",
              nextDay: "[ihttin ti] LT",
              nextWeek: "dddd [ti] LT",
              lastDay: "[ikte ti] LT",
              lastWeek: "[ovddit] dddd [ti] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s geažes",
              past: "maŋit %s",
              s: "moadde sekunddat",
              ss: "%d sekunddat",
              m: "okta minuhta",
              mm: "%d minuhtat",
              h: "okta diimmu",
              hh: "%d diimmut",
              d: "okta beaivi",
              dd: "%d beaivvit",
              M: "okta mánnu",
              MM: "%d mánut",
              y: "okta jahki",
              yy: "%d jagit",
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("si", {
            months:
              "ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්".split(
                "_",
              ),
            monthsShort:
              "ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ".split(
                "_",
              ),
            weekdays:
              "ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා".split(
                "_",
              ),
            weekdaysShort: "ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන".split("_"),
            weekdaysMin: "ඉ_ස_අ_බ_බ්‍ර_සි_සෙ".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "a h:mm",
              LTS: "a h:mm:ss",
              L: "YYYY/MM/DD",
              LL: "YYYY MMMM D",
              LLL: "YYYY MMMM D, a h:mm",
              LLLL: "YYYY MMMM D [වැනි] dddd, a h:mm:ss",
            },
            calendar: {
              sameDay: "[අද] LT[ට]",
              nextDay: "[හෙට] LT[ට]",
              nextWeek: "dddd LT[ට]",
              lastDay: "[ඊයේ] LT[ට]",
              lastWeek: "[පසුගිය] dddd LT[ට]",
              sameElse: "L",
            },
            relativeTime: {
              future: "%sකින්",
              past: "%sකට පෙර",
              s: "තත්පර කිහිපය",
              ss: "තත්පර %d",
              m: "මිනිත්තුව",
              mm: "මිනිත්තු %d",
              h: "පැය",
              hh: "පැය %d",
              d: "දිනය",
              dd: "දින %d",
              M: "මාසය",
              MM: "මාස %d",
              y: "වසර",
              yy: "වසර %d",
            },
            dayOfMonthOrdinalParse: /\d{1,2} වැනි/,
            ordinal: function (e) {
              return e + " වැනි";
            },
            meridiemParse: /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
            isPM: function (e) {
              return "ප.ව." === e || "පස් වරු" === e;
            },
            meridiem: function (e, t, n) {
              return e > 11
                ? n
                  ? "ප.ව."
                  : "පස් වරු"
                : n
                  ? "පෙ.ව."
                  : "පෙර වරු";
            },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t =
              "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split(
                "_",
              ),
            n = "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_");
          function a(e) {
            return e > 1 && e < 5;
          }
          function s(e, t, n, s) {
            var i = e + " ";
            switch (n) {
              case "s":
                return t || s ? "pár sekúnd" : "pár sekundami";
              case "ss":
                return t || s
                  ? i + (a(e) ? "sekundy" : "sekúnd")
                  : i + "sekundami";
              case "m":
                return t ? "minúta" : s ? "minútu" : "minútou";
              case "mm":
                return t || s
                  ? i + (a(e) ? "minúty" : "minút")
                  : i + "minútami";
              case "h":
                return t ? "hodina" : s ? "hodinu" : "hodinou";
              case "hh":
                return t || s
                  ? i + (a(e) ? "hodiny" : "hodín")
                  : i + "hodinami";
              case "d":
                return t || s ? "deň" : "dňom";
              case "dd":
                return t || s ? i + (a(e) ? "dni" : "dní") : i + "dňami";
              case "M":
                return t || s ? "mesiac" : "mesiacom";
              case "MM":
                return t || s
                  ? i + (a(e) ? "mesiace" : "mesiacov")
                  : i + "mesiacmi";
              case "y":
                return t || s ? "rok" : "rokom";
              case "yy":
                return t || s ? i + (a(e) ? "roky" : "rokov") : i + "rokmi";
            }
          }
          e.defineLocale("sk", {
            months: t,
            monthsShort: n,
            weekdays:
              "nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),
            weekdaysShort: "ne_po_ut_st_št_pi_so".split("_"),
            weekdaysMin: "ne_po_ut_st_št_pi_so".split("_"),
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm",
              LLLL: "dddd D. MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[dnes o] LT",
              nextDay: "[zajtra o] LT",
              nextWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[v nedeľu o] LT";
                  case 1:
                  case 2:
                    return "[v] dddd [o] LT";
                  case 3:
                    return "[v stredu o] LT";
                  case 4:
                    return "[vo štvrtok o] LT";
                  case 5:
                    return "[v piatok o] LT";
                  case 6:
                    return "[v sobotu o] LT";
                }
              },
              lastDay: "[včera o] LT",
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[minulú nedeľu o] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[minulý] dddd [o] LT";
                  case 3:
                    return "[minulú stredu o] LT";
                  case 6:
                    return "[minulú sobotu o] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "za %s",
              past: "pred %s",
              s,
              ss: s,
              m: s,
              mm: s,
              h: s,
              hh: s,
              d: s,
              dd: s,
              M: s,
              MM: s,
              y: s,
              yy: s,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n, a) {
            var s = e + " ";
            switch (n) {
              case "s":
                return t || a ? "nekaj sekund" : "nekaj sekundami";
              case "ss":
                return (s +=
                  1 === e
                    ? t
                      ? "sekundo"
                      : "sekundi"
                    : 2 === e
                      ? t || a
                        ? "sekundi"
                        : "sekundah"
                      : e < 5
                        ? t || a
                          ? "sekunde"
                          : "sekundah"
                        : "sekund");
              case "m":
                return t ? "ena minuta" : "eno minuto";
              case "mm":
                return (s +=
                  1 === e
                    ? t
                      ? "minuta"
                      : "minuto"
                    : 2 === e
                      ? t || a
                        ? "minuti"
                        : "minutama"
                      : e < 5
                        ? t || a
                          ? "minute"
                          : "minutami"
                        : t || a
                          ? "minut"
                          : "minutami");
              case "h":
                return t ? "ena ura" : "eno uro";
              case "hh":
                return (s +=
                  1 === e
                    ? t
                      ? "ura"
                      : "uro"
                    : 2 === e
                      ? t || a
                        ? "uri"
                        : "urama"
                      : e < 5
                        ? t || a
                          ? "ure"
                          : "urami"
                        : t || a
                          ? "ur"
                          : "urami");
              case "d":
                return t || a ? "en dan" : "enim dnem";
              case "dd":
                return (s +=
                  1 === e
                    ? t || a
                      ? "dan"
                      : "dnem"
                    : 2 === e
                      ? t || a
                        ? "dni"
                        : "dnevoma"
                      : t || a
                        ? "dni"
                        : "dnevi");
              case "M":
                return t || a ? "en mesec" : "enim mesecem";
              case "MM":
                return (s +=
                  1 === e
                    ? t || a
                      ? "mesec"
                      : "mesecem"
                    : 2 === e
                      ? t || a
                        ? "meseca"
                        : "mesecema"
                      : e < 5
                        ? t || a
                          ? "mesece"
                          : "meseci"
                        : t || a
                          ? "mesecev"
                          : "meseci");
              case "y":
                return t || a ? "eno leto" : "enim letom";
              case "yy":
                return (s +=
                  1 === e
                    ? t || a
                      ? "leto"
                      : "letom"
                    : 2 === e
                      ? t || a
                        ? "leti"
                        : "letoma"
                      : e < 5
                        ? t || a
                          ? "leta"
                          : "leti"
                        : t || a
                          ? "let"
                          : "leti");
            }
          }
          e.defineLocale("sl", {
            months:
              "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split(
                "_",
              ),
            monthsShort:
              "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),
            weekdaysShort: "ned._pon._tor._sre._čet._pet._sob.".split("_"),
            weekdaysMin: "ne_po_to_sr_če_pe_so".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm",
              LLLL: "dddd, D. MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[danes ob] LT",
              nextDay: "[jutri ob] LT",
              nextWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[v] [nedeljo] [ob] LT";
                  case 3:
                    return "[v] [sredo] [ob] LT";
                  case 6:
                    return "[v] [soboto] [ob] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[v] dddd [ob] LT";
                }
              },
              lastDay: "[včeraj ob] LT",
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[prejšnjo] [nedeljo] [ob] LT";
                  case 3:
                    return "[prejšnjo] [sredo] [ob] LT";
                  case 6:
                    return "[prejšnjo] [soboto] [ob] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[prejšnji] dddd [ob] LT";
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "čez %s",
              past: "pred %s",
              s: t,
              ss: t,
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: t,
              dd: t,
              M: t,
              MM: t,
              y: t,
              yy: t,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("sq", {
            months:
              "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split(
                "_",
              ),
            monthsShort:
              "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),
            weekdays:
              "E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split(
                "_",
              ),
            weekdaysShort: "Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),
            weekdaysMin: "D_H_Ma_Më_E_P_Sh".split("_"),
            weekdaysParseExact: !0,
            meridiemParse: /PD|MD/,
            isPM: function (e) {
              return "M" === e.charAt(0);
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "PD" : "MD";
            },
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Sot në] LT",
              nextDay: "[Nesër në] LT",
              nextWeek: "dddd [në] LT",
              lastDay: "[Dje në] LT",
              lastWeek: "dddd [e kaluar në] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "në %s",
              past: "%s më parë",
              s: "disa sekonda",
              ss: "%d sekonda",
              m: "një minutë",
              mm: "%d minuta",
              h: "një orë",
              hh: "%d orë",
              d: "një ditë",
              dd: "%d ditë",
              M: "një muaj",
              MM: "%d muaj",
              y: "një vit",
              yy: "%d vite",
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
            words: {
              ss: ["sekunda", "sekunde", "sekundi"],
              m: ["jedan minut", "jedne minute"],
              mm: ["minut", "minute", "minuta"],
              h: ["jedan sat", "jednog sata"],
              hh: ["sat", "sata", "sati"],
              dd: ["dan", "dana", "dana"],
              MM: ["mesec", "meseca", "meseci"],
              yy: ["godina", "godine", "godina"],
            },
            correctGrammaticalCase: function (e, t) {
              return 1 === e ? t[0] : e >= 2 && e <= 4 ? t[1] : t[2];
            },
            translate: function (e, n, a) {
              var s = t.words[a];
              return 1 === a.length
                ? n
                  ? s[0]
                  : s[1]
                : e + " " + t.correctGrammaticalCase(e, s);
            },
          };
          e.defineLocale("sr", {
            months:
              "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split(
                "_",
              ),
            monthsShort:
              "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota".split(
                "_",
              ),
            weekdaysShort: "ned._pon._uto._sre._čet._pet._sub.".split("_"),
            weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm",
              LLLL: "dddd, D. MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[danas u] LT",
              nextDay: "[sutra u] LT",
              nextWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[u] [nedelju] [u] LT";
                  case 3:
                    return "[u] [sredu] [u] LT";
                  case 6:
                    return "[u] [subotu] [u] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[u] dddd [u] LT";
                }
              },
              lastDay: "[juče u] LT",
              lastWeek: function () {
                return [
                  "[prošle] [nedelje] [u] LT",
                  "[prošlog] [ponedeljka] [u] LT",
                  "[prošlog] [utorka] [u] LT",
                  "[prošle] [srede] [u] LT",
                  "[prošlog] [četvrtka] [u] LT",
                  "[prošlog] [petka] [u] LT",
                  "[prošle] [subote] [u] LT",
                ][this.day()];
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "za %s",
              past: "pre %s",
              s: "nekoliko sekundi",
              ss: t.translate,
              m: t.translate,
              mm: t.translate,
              h: t.translate,
              hh: t.translate,
              d: "dan",
              dd: t.translate,
              M: "mesec",
              MM: t.translate,
              y: "godinu",
              yy: t.translate,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
            words: {
              ss: ["секунда", "секунде", "секунди"],
              m: ["један минут", "једне минуте"],
              mm: ["минут", "минуте", "минута"],
              h: ["један сат", "једног сата"],
              hh: ["сат", "сата", "сати"],
              dd: ["дан", "дана", "дана"],
              MM: ["месец", "месеца", "месеци"],
              yy: ["година", "године", "година"],
            },
            correctGrammaticalCase: function (e, t) {
              return 1 === e ? t[0] : e >= 2 && e <= 4 ? t[1] : t[2];
            },
            translate: function (e, n, a) {
              var s = t.words[a];
              return 1 === a.length
                ? n
                  ? s[0]
                  : s[1]
                : e + " " + t.correctGrammaticalCase(e, s);
            },
          };
          e.defineLocale("sr-cyrl", {
            months:
              "јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар".split(
                "_",
              ),
            monthsShort:
              "јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "недеља_понедељак_уторак_среда_четвртак_петак_субота".split("_"),
            weekdaysShort: "нед._пон._уто._сре._чет._пет._суб.".split("_"),
            weekdaysMin: "не_по_ут_ср_че_пе_су".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM YYYY",
              LLL: "D. MMMM YYYY H:mm",
              LLLL: "dddd, D. MMMM YYYY H:mm",
            },
            calendar: {
              sameDay: "[данас у] LT",
              nextDay: "[сутра у] LT",
              nextWeek: function () {
                switch (this.day()) {
                  case 0:
                    return "[у] [недељу] [у] LT";
                  case 3:
                    return "[у] [среду] [у] LT";
                  case 6:
                    return "[у] [суботу] [у] LT";
                  case 1:
                  case 2:
                  case 4:
                  case 5:
                    return "[у] dddd [у] LT";
                }
              },
              lastDay: "[јуче у] LT",
              lastWeek: function () {
                return [
                  "[прошле] [недеље] [у] LT",
                  "[прошлог] [понедељка] [у] LT",
                  "[прошлог] [уторка] [у] LT",
                  "[прошле] [среде] [у] LT",
                  "[прошлог] [четвртка] [у] LT",
                  "[прошлог] [петка] [у] LT",
                  "[прошле] [суботе] [у] LT",
                ][this.day()];
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "за %s",
              past: "пре %s",
              s: "неколико секунди",
              ss: t.translate,
              m: t.translate,
              mm: t.translate,
              h: t.translate,
              hh: t.translate,
              d: "дан",
              dd: t.translate,
              M: "месец",
              MM: t.translate,
              y: "годину",
              yy: t.translate,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ss", {
            months:
              "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split(
                "_",
              ),
            monthsShort:
              "Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"),
            weekdays:
              "Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split(
                "_",
              ),
            weekdaysShort: "Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"),
            weekdaysMin: "Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "h:mm A",
              LTS: "h:mm:ss A",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY h:mm A",
              LLLL: "dddd, D MMMM YYYY h:mm A",
            },
            calendar: {
              sameDay: "[Namuhla nga] LT",
              nextDay: "[Kusasa nga] LT",
              nextWeek: "dddd [nga] LT",
              lastDay: "[Itolo nga] LT",
              lastWeek: "dddd [leliphelile] [nga] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "nga %s",
              past: "wenteka nga %s",
              s: "emizuzwana lomcane",
              ss: "%d mzuzwana",
              m: "umzuzu",
              mm: "%d emizuzu",
              h: "lihora",
              hh: "%d emahora",
              d: "lilanga",
              dd: "%d emalanga",
              M: "inyanga",
              MM: "%d tinyanga",
              y: "umnyaka",
              yy: "%d iminyaka",
            },
            meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
            meridiem: function (e, t, n) {
              return e < 11
                ? "ekuseni"
                : e < 15
                  ? "emini"
                  : e < 19
                    ? "entsambama"
                    : "ebusuku";
            },
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "ekuseni" === t
                  ? e
                  : "emini" === t
                    ? e >= 11
                      ? e
                      : e + 12
                    : "entsambama" === t || "ebusuku" === t
                      ? 0 === e
                        ? 0
                        : e + 12
                      : void 0
              );
            },
            dayOfMonthOrdinalParse: /\d{1,2}/,
            ordinal: "%d",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("sv", {
            months:
              "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split(
                "_",
              ),
            monthsShort:
              "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
            weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split(
              "_",
            ),
            weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"),
            weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "YYYY-MM-DD",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY [kl.] HH:mm",
              LLLL: "dddd D MMMM YYYY [kl.] HH:mm",
              lll: "D MMM YYYY HH:mm",
              llll: "ddd D MMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Idag] LT",
              nextDay: "[Imorgon] LT",
              lastDay: "[Igår] LT",
              nextWeek: "[På] dddd LT",
              lastWeek: "[I] dddd[s] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "om %s",
              past: "för %s sedan",
              s: "några sekunder",
              ss: "%d sekunder",
              m: "en minut",
              mm: "%d minuter",
              h: "en timme",
              hh: "%d timmar",
              d: "en dag",
              dd: "%d dagar",
              M: "en månad",
              MM: "%d månader",
              y: "ett år",
              yy: "%d år",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(e|a)/,
            ordinal: function (e) {
              var t = e % 10;
              return (
                e +
                (1 == ~~((e % 100) / 10) ? "e" : 1 === t || 2 === t ? "a" : "e")
              );
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("sw", {
            months:
              "Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split(
                "_",
              ),
            monthsShort:
              "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"),
            weekdays:
              "Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split(
                "_",
              ),
            weekdaysShort: "Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"),
            weekdaysMin: "J2_J3_J4_J5_Al_Ij_J1".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[leo saa] LT",
              nextDay: "[kesho saa] LT",
              nextWeek: "[wiki ijayo] dddd [saat] LT",
              lastDay: "[jana] LT",
              lastWeek: "[wiki iliyopita] dddd [saat] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s baadaye",
              past: "tokea %s",
              s: "hivi punde",
              ss: "sekunde %d",
              m: "dakika moja",
              mm: "dakika %d",
              h: "saa limoja",
              hh: "masaa %d",
              d: "siku moja",
              dd: "masiku %d",
              M: "mwezi mmoja",
              MM: "miezi %d",
              y: "mwaka mmoja",
              yy: "miaka %d",
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
              1: "௧",
              2: "௨",
              3: "௩",
              4: "௪",
              5: "௫",
              6: "௬",
              7: "௭",
              8: "௮",
              9: "௯",
              0: "௦",
            },
            n = {
              "௧": "1",
              "௨": "2",
              "௩": "3",
              "௪": "4",
              "௫": "5",
              "௬": "6",
              "௭": "7",
              "௮": "8",
              "௯": "9",
              "௦": "0",
            };
          e.defineLocale("ta", {
            months:
              "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split(
                "_",
              ),
            monthsShort:
              "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split(
                "_",
              ),
            weekdays:
              "ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split(
                "_",
              ),
            weekdaysShort:
              "ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"),
            weekdaysMin: "ஞா_தி_செ_பு_வி_வெ_ச".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, HH:mm",
              LLLL: "dddd, D MMMM YYYY, HH:mm",
            },
            calendar: {
              sameDay: "[இன்று] LT",
              nextDay: "[நாளை] LT",
              nextWeek: "dddd, LT",
              lastDay: "[நேற்று] LT",
              lastWeek: "[கடந்த வாரம்] dddd, LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s இல்",
              past: "%s முன்",
              s: "ஒரு சில விநாடிகள்",
              ss: "%d விநாடிகள்",
              m: "ஒரு நிமிடம்",
              mm: "%d நிமிடங்கள்",
              h: "ஒரு மணி நேரம்",
              hh: "%d மணி நேரம்",
              d: "ஒரு நாள்",
              dd: "%d நாட்கள்",
              M: "ஒரு மாதம்",
              MM: "%d மாதங்கள்",
              y: "ஒரு வருடம்",
              yy: "%d ஆண்டுகள்",
            },
            dayOfMonthOrdinalParse: /\d{1,2}வது/,
            ordinal: function (e) {
              return e + "வது";
            },
            preparse: function (e) {
              return e.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function (e) {
                return n[e];
              });
            },
            postformat: function (e) {
              return e.replace(/\d/g, function (e) {
                return t[e];
              });
            },
            meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
            meridiem: function (e, t, n) {
              return e < 2
                ? " யாமம்"
                : e < 6
                  ? " வைகறை"
                  : e < 10
                    ? " காலை"
                    : e < 14
                      ? " நண்பகல்"
                      : e < 18
                        ? " எற்பாடு"
                        : e < 22
                          ? " மாலை"
                          : " யாமம்";
            },
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "யாமம்" === t
                  ? e < 2
                    ? e
                    : e + 12
                  : "வைகறை" === t ||
                      "காலை" === t ||
                      ("நண்பகல்" === t && e >= 10)
                    ? e
                    : e + 12
              );
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("te", {
            months:
              "జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జులై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్".split(
                "_",
              ),
            monthsShort:
              "జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జులై_ఆగ._సెప్._అక్టో._నవ._డిసె.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం".split(
                "_",
              ),
            weekdaysShort: "ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని".split("_"),
            weekdaysMin: "ఆ_సో_మం_బు_గు_శు_శ".split("_"),
            longDateFormat: {
              LT: "A h:mm",
              LTS: "A h:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY, A h:mm",
              LLLL: "dddd, D MMMM YYYY, A h:mm",
            },
            calendar: {
              sameDay: "[నేడు] LT",
              nextDay: "[రేపు] LT",
              nextWeek: "dddd, LT",
              lastDay: "[నిన్న] LT",
              lastWeek: "[గత] dddd, LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s లో",
              past: "%s క్రితం",
              s: "కొన్ని క్షణాలు",
              ss: "%d సెకన్లు",
              m: "ఒక నిమిషం",
              mm: "%d నిమిషాలు",
              h: "ఒక గంట",
              hh: "%d గంటలు",
              d: "ఒక రోజు",
              dd: "%d రోజులు",
              M: "ఒక నెల",
              MM: "%d నెలలు",
              y: "ఒక సంవత్సరం",
              yy: "%d సంవత్సరాలు",
            },
            dayOfMonthOrdinalParse: /\d{1,2}వ/,
            ordinal: "%dవ",
            meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "రాత్రి" === t
                  ? e < 4
                    ? e
                    : e + 12
                  : "ఉదయం" === t
                    ? e
                    : "మధ్యాహ్నం" === t
                      ? e >= 10
                        ? e
                        : e + 12
                      : "సాయంత్రం" === t
                        ? e + 12
                        : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "రాత్రి"
                : e < 10
                  ? "ఉదయం"
                  : e < 17
                    ? "మధ్యాహ్నం"
                    : e < 20
                      ? "సాయంత్రం"
                      : "రాత్రి";
            },
            week: { dow: 0, doy: 6 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("tet", {
            months:
              "Janeiru_Fevereiru_Marsu_Abril_Maiu_Juñu_Jullu_Agustu_Setembru_Outubru_Novembru_Dezembru".split(
                "_",
              ),
            monthsShort:
              "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
            weekdays: "Domingu_Segunda_Tersa_Kuarta_Kinta_Sesta_Sabadu".split(
              "_",
            ),
            weekdaysShort: "Dom_Seg_Ters_Kua_Kint_Sest_Sab".split("_"),
            weekdaysMin: "Do_Seg_Te_Ku_Ki_Ses_Sa".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Ohin iha] LT",
              nextDay: "[Aban iha] LT",
              nextWeek: "dddd [iha] LT",
              lastDay: "[Horiseik iha] LT",
              lastWeek: "dddd [semana kotuk] [iha] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "iha %s",
              past: "%s liuba",
              s: "minutu balun",
              ss: "minutu %d",
              m: "minutu ida",
              mm: "minutu %d",
              h: "oras ida",
              hh: "oras %d",
              d: "loron ida",
              dd: "loron %d",
              M: "fulan ida",
              MM: "fulan %d",
              y: "tinan ida",
              yy: "tinan %d",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
            ordinal: function (e) {
              var t = e % 10;
              return (
                e +
                (1 == ~~((e % 100) / 10)
                  ? "th"
                  : 1 === t
                    ? "st"
                    : 2 === t
                      ? "nd"
                      : 3 === t
                        ? "rd"
                        : "th")
              );
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
            0: "-ум",
            1: "-ум",
            2: "-юм",
            3: "-юм",
            4: "-ум",
            5: "-ум",
            6: "-ум",
            7: "-ум",
            8: "-ум",
            9: "-ум",
            10: "-ум",
            12: "-ум",
            13: "-ум",
            20: "-ум",
            30: "-юм",
            40: "-ум",
            50: "-ум",
            60: "-ум",
            70: "-ум",
            80: "-ум",
            90: "-ум",
            100: "-ум",
          };
          e.defineLocale("tg", {
            months:
              "январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split(
                "_",
              ),
            monthsShort:
              "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
            weekdays:
              "якшанбе_душанбе_сешанбе_чоршанбе_панҷшанбе_ҷумъа_шанбе".split(
                "_",
              ),
            weekdaysShort: "яшб_дшб_сшб_чшб_пшб_ҷум_шнб".split("_"),
            weekdaysMin: "яш_дш_сш_чш_пш_ҷм_шб".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Имрӯз соати] LT",
              nextDay: "[Пагоҳ соати] LT",
              lastDay: "[Дирӯз соати] LT",
              nextWeek: "dddd[и] [ҳафтаи оянда соати] LT",
              lastWeek: "dddd[и] [ҳафтаи гузашта соати] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "баъди %s",
              past: "%s пеш",
              s: "якчанд сония",
              m: "як дақиқа",
              mm: "%d дақиқа",
              h: "як соат",
              hh: "%d соат",
              d: "як рӯз",
              dd: "%d рӯз",
              M: "як моҳ",
              MM: "%d моҳ",
              y: "як сол",
              yy: "%d сол",
            },
            meridiemParse: /шаб|субҳ|рӯз|бегоҳ/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "шаб" === t
                  ? e < 4
                    ? e
                    : e + 12
                  : "субҳ" === t
                    ? e
                    : "рӯз" === t
                      ? e >= 11
                        ? e
                        : e + 12
                      : "бегоҳ" === t
                        ? e + 12
                        : void 0
              );
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "шаб"
                : e < 11
                  ? "субҳ"
                  : e < 16
                    ? "рӯз"
                    : e < 19
                      ? "бегоҳ"
                      : "шаб";
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(ум|юм)/,
            ordinal: function (e) {
              var n = e % 10,
                a = e >= 100 ? 100 : null;
              return e + (t[e] || t[n] || t[a]);
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("th", {
            months:
              "มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split(
                "_",
              ),
            monthsShort:
              "ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split(
              "_",
            ),
            weekdaysShort: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split(
              "_",
            ),
            weekdaysMin: "อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "H:mm",
              LTS: "H:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY เวลา H:mm",
              LLLL: "วันddddที่ D MMMM YYYY เวลา H:mm",
            },
            meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
            isPM: function (e) {
              return "หลังเที่ยง" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "ก่อนเที่ยง" : "หลังเที่ยง";
            },
            calendar: {
              sameDay: "[วันนี้ เวลา] LT",
              nextDay: "[พรุ่งนี้ เวลา] LT",
              nextWeek: "dddd[หน้า เวลา] LT",
              lastDay: "[เมื่อวานนี้ เวลา] LT",
              lastWeek: "[วัน]dddd[ที่แล้ว เวลา] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "อีก %s",
              past: "%sที่แล้ว",
              s: "ไม่กี่วินาที",
              ss: "%d วินาที",
              m: "1 นาที",
              mm: "%d นาที",
              h: "1 ชั่วโมง",
              hh: "%d ชั่วโมง",
              d: "1 วัน",
              dd: "%d วัน",
              M: "1 เดือน",
              MM: "%d เดือน",
              y: "1 ปี",
              yy: "%d ปี",
            },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("tl-ph", {
            months:
              "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split(
                "_",
              ),
            monthsShort:
              "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),
            weekdays:
              "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split(
                "_",
              ),
            weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),
            weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "MM/D/YYYY",
              LL: "MMMM D, YYYY",
              LLL: "MMMM D, YYYY HH:mm",
              LLLL: "dddd, MMMM DD, YYYY HH:mm",
            },
            calendar: {
              sameDay: "LT [ngayong araw]",
              nextDay: "[Bukas ng] LT",
              nextWeek: "LT [sa susunod na] dddd",
              lastDay: "LT [kahapon]",
              lastWeek: "LT [noong nakaraang] dddd",
              sameElse: "L",
            },
            relativeTime: {
              future: "sa loob ng %s",
              past: "%s ang nakalipas",
              s: "ilang segundo",
              ss: "%d segundo",
              m: "isang minuto",
              mm: "%d minuto",
              h: "isang oras",
              hh: "%d oras",
              d: "isang araw",
              dd: "%d araw",
              M: "isang buwan",
              MM: "%d buwan",
              y: "isang taon",
              yy: "%d taon",
            },
            dayOfMonthOrdinalParse: /\d{1,2}/,
            ordinal: function (e) {
              return e;
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = "pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut".split("_");
          function n(e) {
            var t = e;
            return (t =
              -1 !== e.indexOf("jaj")
                ? t.slice(0, -3) + "leS"
                : -1 !== e.indexOf("jar")
                  ? t.slice(0, -3) + "waQ"
                  : -1 !== e.indexOf("DIS")
                    ? t.slice(0, -3) + "nem"
                    : t + " pIq");
          }
          function a(e) {
            var t = e;
            return (t =
              -1 !== e.indexOf("jaj")
                ? t.slice(0, -3) + "Hu’"
                : -1 !== e.indexOf("jar")
                  ? t.slice(0, -3) + "wen"
                  : -1 !== e.indexOf("DIS")
                    ? t.slice(0, -3) + "ben"
                    : t + " ret");
          }
          function s(e, t, n, a) {
            var s = i(e);
            switch (n) {
              case "ss":
                return s + " lup";
              case "mm":
                return s + " tup";
              case "hh":
                return s + " rep";
              case "dd":
                return s + " jaj";
              case "MM":
                return s + " jar";
              case "yy":
                return s + " DIS";
            }
          }
          function i(e) {
            var n = Math.floor((e % 1e3) / 100),
              a = Math.floor((e % 100) / 10),
              s = e % 10,
              i = "";
            return (
              n > 0 && (i += t[n] + "vatlh"),
              a > 0 && (i += ("" !== i ? " " : "") + t[a] + "maH"),
              s > 0 && (i += ("" !== i ? " " : "") + t[s]),
              "" === i ? "pagh" : i
            );
          }
          e.defineLocale("tlh", {
            months:
              "tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’".split(
                "_",
              ),
            monthsShort:
              "jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split(
                "_",
              ),
            weekdaysShort:
              "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split(
                "_",
              ),
            weekdaysMin:
              "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split(
                "_",
              ),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[DaHjaj] LT",
              nextDay: "[wa’leS] LT",
              nextWeek: "LLL",
              lastDay: "[wa’Hu’] LT",
              lastWeek: "LLL",
              sameElse: "L",
            },
            relativeTime: {
              future: n,
              past: a,
              s: "puS lup",
              ss: s,
              m: "wa’ tup",
              mm: s,
              h: "wa’ rep",
              hh: s,
              d: "wa’ jaj",
              dd: s,
              M: "wa’ jar",
              MM: s,
              y: "wa’ DIS",
              yy: s,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = {
            1: "'inci",
            5: "'inci",
            8: "'inci",
            70: "'inci",
            80: "'inci",
            2: "'nci",
            7: "'nci",
            20: "'nci",
            50: "'nci",
            3: "'üncü",
            4: "'üncü",
            100: "'üncü",
            6: "'ncı",
            9: "'uncu",
            10: "'uncu",
            30: "'uncu",
            60: "'ıncı",
            90: "'ıncı",
          };
          e.defineLocale("tr", {
            months:
              "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split(
                "_",
              ),
            monthsShort:
              "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
            weekdays:
              "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split(
                "_",
              ),
            weekdaysShort: "Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),
            weekdaysMin: "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[bugün saat] LT",
              nextDay: "[yarın saat] LT",
              nextWeek: "[gelecek] dddd [saat] LT",
              lastDay: "[dün] LT",
              lastWeek: "[geçen] dddd [saat] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s sonra",
              past: "%s önce",
              s: "birkaç saniye",
              ss: "%d saniye",
              m: "bir dakika",
              mm: "%d dakika",
              h: "bir saat",
              hh: "%d saat",
              d: "bir gün",
              dd: "%d gün",
              M: "bir ay",
              MM: "%d ay",
              y: "bir yıl",
              yy: "%d yıl",
            },
            ordinal: function (e, n) {
              switch (n) {
                case "d":
                case "D":
                case "Do":
                case "DD":
                  return e;
                default:
                  if (0 === e) return e + "'ıncı";
                  var a = e % 10,
                    s = (e % 100) - a,
                    i = e >= 100 ? 100 : null;
                  return e + (t[a] || t[s] || t[i]);
              }
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t, n, a) {
            var s = {
              s: ["viensas secunds", "'iensas secunds"],
              ss: [e + " secunds", e + " secunds"],
              m: ["'n míut", "'iens míut"],
              mm: [e + " míuts", e + " míuts"],
              h: ["'n þora", "'iensa þora"],
              hh: [e + " þoras", e + " þoras"],
              d: ["'n ziua", "'iensa ziua"],
              dd: [e + " ziuas", e + " ziuas"],
              M: ["'n mes", "'iens mes"],
              MM: [e + " mesen", e + " mesen"],
              y: ["'n ar", "'iens ar"],
              yy: [e + " ars", e + " ars"],
            };
            return a || t ? s[n][0] : s[n][1];
          }
          e.defineLocale("tzl", {
            months:
              "Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar".split(
                "_",
              ),
            monthsShort:
              "Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec".split("_"),
            weekdays:
              "Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi".split("_"),
            weekdaysShort: "Súl_Lún_Mai_Már_Xhú_Vié_Sát".split("_"),
            weekdaysMin: "Sú_Lú_Ma_Má_Xh_Vi_Sá".split("_"),
            longDateFormat: {
              LT: "HH.mm",
              LTS: "HH.mm.ss",
              L: "DD.MM.YYYY",
              LL: "D. MMMM [dallas] YYYY",
              LLL: "D. MMMM [dallas] YYYY HH.mm",
              LLLL: "dddd, [li] D. MMMM [dallas] YYYY HH.mm",
            },
            meridiemParse: /d\'o|d\'a/i,
            isPM: function (e) {
              return "d'o" === e.toLowerCase();
            },
            meridiem: function (e, t, n) {
              return e > 11 ? (n ? "d'o" : "D'O") : n ? "d'a" : "D'A";
            },
            calendar: {
              sameDay: "[oxhi à] LT",
              nextDay: "[demà à] LT",
              nextWeek: "dddd [à] LT",
              lastDay: "[ieiri à] LT",
              lastWeek: "[sür el] dddd [lasteu à] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "osprei %s",
              past: "ja%s",
              s: t,
              ss: t,
              m: t,
              mm: t,
              h: t,
              hh: t,
              d: t,
              dd: t,
              M: t,
              MM: t,
              y: t,
              yy: t,
            },
            dayOfMonthOrdinalParse: /\d{1,2}\./,
            ordinal: "%d.",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("tzm", {
            months:
              "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split(
                "_",
              ),
            monthsShort:
              "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split(
                "_",
              ),
            weekdays: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split(
              "_",
            ),
            weekdaysShort:
              "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
            weekdaysMin:
              "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[ⴰⵙⴷⵅ ⴴ] LT",
              nextDay: "[ⴰⵙⴽⴰ ⴴ] LT",
              nextWeek: "dddd [ⴴ] LT",
              lastDay: "[ⴰⵚⴰⵏⵜ ⴴ] LT",
              lastWeek: "dddd [ⴴ] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",
              past: "ⵢⴰⵏ %s",
              s: "ⵉⵎⵉⴽ",
              ss: "%d ⵉⵎⵉⴽ",
              m: "ⵎⵉⵏⵓⴺ",
              mm: "%d ⵎⵉⵏⵓⴺ",
              h: "ⵙⴰⵄⴰ",
              hh: "%d ⵜⴰⵙⵙⴰⵄⵉⵏ",
              d: "ⴰⵙⵙ",
              dd: "%d oⵙⵙⴰⵏ",
              M: "ⴰⵢoⵓⵔ",
              MM: "%d ⵉⵢⵢⵉⵔⵏ",
              y: "ⴰⵙⴳⴰⵙ",
              yy: "%d ⵉⵙⴳⴰⵙⵏ",
            },
            week: { dow: 6, doy: 12 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("tzm-latn", {
            months:
              "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split(
                "_",
              ),
            monthsShort:
              "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split(
                "_",
              ),
            weekdays: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split(
              "_",
            ),
            weekdaysShort:
              "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
            weekdaysMin:
              "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[asdkh g] LT",
              nextDay: "[aska g] LT",
              nextWeek: "dddd [g] LT",
              lastDay: "[assant g] LT",
              lastWeek: "dddd [g] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "dadkh s yan %s",
              past: "yan %s",
              s: "imik",
              ss: "%d imik",
              m: "minuḍ",
              mm: "%d minuḍ",
              h: "saɛa",
              hh: "%d tassaɛin",
              d: "ass",
              dd: "%d ossan",
              M: "ayowr",
              MM: "%d iyyirn",
              y: "asgas",
              yy: "%d isgasn",
            },
            week: { dow: 6, doy: 12 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("ug-cn", {
            months:
              "يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر".split(
                "_",
              ),
            monthsShort:
              "يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر".split(
                "_",
              ),
            weekdays:
              "يەكشەنبە_دۈشەنبە_سەيشەنبە_چارشەنبە_پەيشەنبە_جۈمە_شەنبە".split(
                "_",
              ),
            weekdaysShort: "يە_دۈ_سە_چا_پە_جۈ_شە".split("_"),
            weekdaysMin: "يە_دۈ_سە_چا_پە_جۈ_شە".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "YYYY-MM-DD",
              LL: "YYYY-يىلىM-ئاينىڭD-كۈنى",
              LLL: "YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm",
              LLLL: "dddd، YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm",
            },
            meridiemParse: /يېرىم كېچە|سەھەر|چۈشتىن بۇرۇن|چۈش|چۈشتىن كېيىن|كەچ/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "يېرىم كېچە" === t || "سەھەر" === t || "چۈشتىن بۇرۇن" === t
                  ? e
                  : "چۈشتىن كېيىن" === t || "كەچ" === t
                    ? e + 12
                    : e >= 11
                      ? e
                      : e + 12
              );
            },
            meridiem: function (e, t, n) {
              var a = 100 * e + t;
              return a < 600
                ? "يېرىم كېچە"
                : a < 900
                  ? "سەھەر"
                  : a < 1130
                    ? "چۈشتىن بۇرۇن"
                    : a < 1230
                      ? "چۈش"
                      : a < 1800
                        ? "چۈشتىن كېيىن"
                        : "كەچ";
            },
            calendar: {
              sameDay: "[بۈگۈن سائەت] LT",
              nextDay: "[ئەتە سائەت] LT",
              nextWeek: "[كېلەركى] dddd [سائەت] LT",
              lastDay: "[تۆنۈگۈن] LT",
              lastWeek: "[ئالدىنقى] dddd [سائەت] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s كېيىن",
              past: "%s بۇرۇن",
              s: "نەچچە سېكونت",
              ss: "%d سېكونت",
              m: "بىر مىنۇت",
              mm: "%d مىنۇت",
              h: "بىر سائەت",
              hh: "%d سائەت",
              d: "بىر كۈن",
              dd: "%d كۈن",
              M: "بىر ئاي",
              MM: "%d ئاي",
              y: "بىر يىل",
              yy: "%d يىل",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(-كۈنى|-ئاي|-ھەپتە)/,
            ordinal: function (e, t) {
              switch (t) {
                case "d":
                case "D":
                case "DDD":
                  return e + "-كۈنى";
                case "w":
                case "W":
                  return e + "-ھەپتە";
                default:
                  return e;
              }
            },
            preparse: function (e) {
              return e.replace(/،/g, ",");
            },
            postformat: function (e) {
              return e.replace(/,/g, "،");
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          function t(e, t) {
            var n = e.split("_");
            return t % 10 == 1 && t % 100 != 11
              ? n[0]
              : t % 10 >= 2 && t % 10 <= 4 && (t % 100 < 10 || t % 100 >= 20)
                ? n[1]
                : n[2];
          }
          function n(e, n, a) {
            return "m" === a
              ? n
                ? "хвилина"
                : "хвилину"
              : "h" === a
                ? n
                  ? "година"
                  : "годину"
                : e +
                  " " +
                  t(
                    {
                      ss: n
                        ? "секунда_секунди_секунд"
                        : "секунду_секунди_секунд",
                      mm: n
                        ? "хвилина_хвилини_хвилин"
                        : "хвилину_хвилини_хвилин",
                      hh: n ? "година_години_годин" : "годину_години_годин",
                      dd: "день_дні_днів",
                      MM: "місяць_місяці_місяців",
                      yy: "рік_роки_років",
                    }[a],
                    +e,
                  );
          }
          function a(e, t) {
            var n = {
              nominative:
                "неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split(
                  "_",
                ),
              accusative:
                "неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split(
                  "_",
                ),
              genitive:
                "неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split(
                  "_",
                ),
            };
            return !0 === e
              ? n.nominative.slice(1, 7).concat(n.nominative.slice(0, 1))
              : e
                ? n[
                    /(\[[ВвУу]\]) ?dddd/.test(t)
                      ? "accusative"
                      : /\[?(?:минулої|наступної)? ?\] ?dddd/.test(t)
                        ? "genitive"
                        : "nominative"
                  ][e.day()]
                : n.nominative;
          }
          function s(e) {
            return function () {
              return e + "о" + (11 === this.hours() ? "б" : "") + "] LT";
            };
          }
          e.defineLocale("uk", {
            months: {
              format:
                "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split(
                  "_",
                ),
              standalone:
                "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split(
                  "_",
                ),
            },
            monthsShort:
              "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split(
                "_",
              ),
            weekdays: a,
            weekdaysShort: "нд_пн_вт_ср_чт_пт_сб".split("_"),
            weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD.MM.YYYY",
              LL: "D MMMM YYYY р.",
              LLL: "D MMMM YYYY р., HH:mm",
              LLLL: "dddd, D MMMM YYYY р., HH:mm",
            },
            calendar: {
              sameDay: s("[Сьогодні "),
              nextDay: s("[Завтра "),
              lastDay: s("[Вчора "),
              nextWeek: s("[У] dddd ["),
              lastWeek: function () {
                switch (this.day()) {
                  case 0:
                  case 3:
                  case 5:
                  case 6:
                    return s("[Минулої] dddd [").call(this);
                  case 1:
                  case 2:
                  case 4:
                    return s("[Минулого] dddd [").call(this);
                }
              },
              sameElse: "L",
            },
            relativeTime: {
              future: "за %s",
              past: "%s тому",
              s: "декілька секунд",
              ss: n,
              m: n,
              mm: n,
              h: "годину",
              hh: n,
              d: "день",
              dd: n,
              M: "місяць",
              MM: n,
              y: "рік",
              yy: n,
            },
            meridiemParse: /ночі|ранку|дня|вечора/,
            isPM: function (e) {
              return /^(дня|вечора)$/.test(e);
            },
            meridiem: function (e, t, n) {
              return e < 4
                ? "ночі"
                : e < 12
                  ? "ранку"
                  : e < 17
                    ? "дня"
                    : "вечора";
            },
            dayOfMonthOrdinalParse: /\d{1,2}-(й|го)/,
            ordinal: function (e, t) {
              switch (t) {
                case "M":
                case "d":
                case "DDD":
                case "w":
                case "W":
                  return e + "-й";
                case "D":
                  return e + "-го";
                default:
                  return e;
              }
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          var t = [
              "جنوری",
              "فروری",
              "مارچ",
              "اپریل",
              "مئی",
              "جون",
              "جولائی",
              "اگست",
              "ستمبر",
              "اکتوبر",
              "نومبر",
              "دسمبر",
            ],
            n = ["اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ"];
          e.defineLocale("ur", {
            months: t,
            monthsShort: t,
            weekdays: n,
            weekdaysShort: n,
            weekdaysMin: n,
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd، D MMMM YYYY HH:mm",
            },
            meridiemParse: /صبح|شام/,
            isPM: function (e) {
              return "شام" === e;
            },
            meridiem: function (e, t, n) {
              return e < 12 ? "صبح" : "شام";
            },
            calendar: {
              sameDay: "[آج بوقت] LT",
              nextDay: "[کل بوقت] LT",
              nextWeek: "dddd [بوقت] LT",
              lastDay: "[گذشتہ روز بوقت] LT",
              lastWeek: "[گذشتہ] dddd [بوقت] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s بعد",
              past: "%s قبل",
              s: "چند سیکنڈ",
              ss: "%d سیکنڈ",
              m: "ایک منٹ",
              mm: "%d منٹ",
              h: "ایک گھنٹہ",
              hh: "%d گھنٹے",
              d: "ایک دن",
              dd: "%d دن",
              M: "ایک ماہ",
              MM: "%d ماہ",
              y: "ایک سال",
              yy: "%d سال",
            },
            preparse: function (e) {
              return e.replace(/،/g, ",");
            },
            postformat: function (e) {
              return e.replace(/,/g, "،");
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("uz", {
            months:
              "январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split(
                "_",
              ),
            monthsShort:
              "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
            weekdays:
              "Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),
            weekdaysShort: "Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),
            weekdaysMin: "Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "D MMMM YYYY, dddd HH:mm",
            },
            calendar: {
              sameDay: "[Бугун соат] LT [да]",
              nextDay: "[Эртага] LT [да]",
              nextWeek: "dddd [куни соат] LT [да]",
              lastDay: "[Кеча соат] LT [да]",
              lastWeek: "[Утган] dddd [куни соат] LT [да]",
              sameElse: "L",
            },
            relativeTime: {
              future: "Якин %s ичида",
              past: "Бир неча %s олдин",
              s: "фурсат",
              ss: "%d фурсат",
              m: "бир дакика",
              mm: "%d дакика",
              h: "бир соат",
              hh: "%d соат",
              d: "бир кун",
              dd: "%d кун",
              M: "бир ой",
              MM: "%d ой",
              y: "бир йил",
              yy: "%d йил",
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("uz-latn", {
            months:
              "Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr".split(
                "_",
              ),
            monthsShort:
              "Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek".split("_"),
            weekdays:
              "Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba".split(
                "_",
              ),
            weekdaysShort: "Yak_Dush_Sesh_Chor_Pay_Jum_Shan".split("_"),
            weekdaysMin: "Ya_Du_Se_Cho_Pa_Ju_Sha".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "D MMMM YYYY, dddd HH:mm",
            },
            calendar: {
              sameDay: "[Bugun soat] LT [da]",
              nextDay: "[Ertaga] LT [da]",
              nextWeek: "dddd [kuni soat] LT [da]",
              lastDay: "[Kecha soat] LT [da]",
              lastWeek: "[O'tgan] dddd [kuni soat] LT [da]",
              sameElse: "L",
            },
            relativeTime: {
              future: "Yaqin %s ichida",
              past: "Bir necha %s oldin",
              s: "soniya",
              ss: "%d soniya",
              m: "bir daqiqa",
              mm: "%d daqiqa",
              h: "bir soat",
              hh: "%d soat",
              d: "bir kun",
              dd: "%d kun",
              M: "bir oy",
              MM: "%d oy",
              y: "bir yil",
              yy: "%d yil",
            },
            week: { dow: 1, doy: 7 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("vi", {
            months:
              "tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split(
                "_",
              ),
            monthsShort:
              "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split(
                "_",
              ),
            weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
            weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
            weekdaysParseExact: !0,
            meridiemParse: /sa|ch/i,
            isPM: function (e) {
              return /^ch$/i.test(e);
            },
            meridiem: function (e, t, n) {
              return e < 12 ? (n ? "sa" : "SA") : n ? "ch" : "CH";
            },
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "DD/MM/YYYY",
              LL: "D MMMM [năm] YYYY",
              LLL: "D MMMM [năm] YYYY HH:mm",
              LLLL: "dddd, D MMMM [năm] YYYY HH:mm",
              l: "DD/M/YYYY",
              ll: "D MMM YYYY",
              lll: "D MMM YYYY HH:mm",
              llll: "ddd, D MMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[Hôm nay lúc] LT",
              nextDay: "[Ngày mai lúc] LT",
              nextWeek: "dddd [tuần tới lúc] LT",
              lastDay: "[Hôm qua lúc] LT",
              lastWeek: "dddd [tuần rồi lúc] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "%s tới",
              past: "%s trước",
              s: "vài giây",
              ss: "%d giây",
              m: "một phút",
              mm: "%d phút",
              h: "một giờ",
              hh: "%d giờ",
              d: "một ngày",
              dd: "%d ngày",
              M: "một tháng",
              MM: "%d tháng",
              y: "một năm",
              yy: "%d năm",
            },
            dayOfMonthOrdinalParse: /\d{1,2}/,
            ordinal: function (e) {
              return e;
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("x-pseudo", {
            months:
              "J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér".split(
                "_",
              ),
            monthsShort:
              "J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc".split(
                "_",
              ),
            monthsParseExact: !0,
            weekdays:
              "S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý".split(
                "_",
              ),
            weekdaysShort: "S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát".split("_"),
            weekdaysMin: "S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá".split("_"),
            weekdaysParseExact: !0,
            longDateFormat: {
              LT: "HH:mm",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY HH:mm",
              LLLL: "dddd, D MMMM YYYY HH:mm",
            },
            calendar: {
              sameDay: "[T~ódá~ý át] LT",
              nextDay: "[T~ómó~rró~w át] LT",
              nextWeek: "dddd [át] LT",
              lastDay: "[Ý~ést~érdá~ý át] LT",
              lastWeek: "[L~ást] dddd [át] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "í~ñ %s",
              past: "%s á~gó",
              s: "á ~féw ~sécó~ñds",
              ss: "%d s~écóñ~ds",
              m: "á ~míñ~úté",
              mm: "%d m~íñú~tés",
              h: "á~ñ hó~úr",
              hh: "%d h~óúrs",
              d: "á ~dáý",
              dd: "%d d~áýs",
              M: "á ~móñ~th",
              MM: "%d m~óñt~hs",
              y: "á ~ýéár",
              yy: "%d ý~éárs",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
            ordinal: function (e) {
              var t = e % 10;
              return (
                e +
                (1 == ~~((e % 100) / 10)
                  ? "th"
                  : 1 === t
                    ? "st"
                    : 2 === t
                      ? "nd"
                      : 3 === t
                        ? "rd"
                        : "th")
              );
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("yo", {
            months:
              "Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀".split(
                "_",
              ),
            monthsShort:
              "Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀".split("_"),
            weekdays: "Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta".split("_"),
            weekdaysShort: "Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá".split("_"),
            weekdaysMin: "Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb".split("_"),
            longDateFormat: {
              LT: "h:mm A",
              LTS: "h:mm:ss A",
              L: "DD/MM/YYYY",
              LL: "D MMMM YYYY",
              LLL: "D MMMM YYYY h:mm A",
              LLLL: "dddd, D MMMM YYYY h:mm A",
            },
            calendar: {
              sameDay: "[Ònì ni] LT",
              nextDay: "[Ọ̀la ni] LT",
              nextWeek: "dddd [Ọsẹ̀ tón'bọ] [ni] LT",
              lastDay: "[Àna ni] LT",
              lastWeek: "dddd [Ọsẹ̀ tólọ́] [ni] LT",
              sameElse: "L",
            },
            relativeTime: {
              future: "ní %s",
              past: "%s kọjá",
              s: "ìsẹjú aayá die",
              ss: "aayá %d",
              m: "ìsẹjú kan",
              mm: "ìsẹjú %d",
              h: "wákati kan",
              hh: "wákati %d",
              d: "ọjọ́ kan",
              dd: "ọjọ́ %d",
              M: "osù kan",
              MM: "osù %d",
              y: "ọdún kan",
              yy: "ọdún %d",
            },
            dayOfMonthOrdinalParse: /ọjọ́\s\d{1,2}/,
            ordinal: "ọjọ́ %d",
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("zh-cn", {
            months:
              "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
                "_",
              ),
            monthsShort:
              "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
            weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split(
              "_",
            ),
            weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
            weekdaysMin: "日_一_二_三_四_五_六".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "YYYY/MM/DD",
              LL: "YYYY年M月D日",
              LLL: "YYYY年M月D日Ah点mm分",
              LLLL: "YYYY年M月D日ddddAh点mm分",
              l: "YYYY/M/D",
              ll: "YYYY年M月D日",
              lll: "YYYY年M月D日 HH:mm",
              llll: "YYYY年M月D日dddd HH:mm",
            },
            meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "凌晨" === t || "早上" === t || "上午" === t
                  ? e
                  : "下午" === t || "晚上" === t
                    ? e + 12
                    : e >= 11
                      ? e
                      : e + 12
              );
            },
            meridiem: function (e, t, n) {
              var a = 100 * e + t;
              return a < 600
                ? "凌晨"
                : a < 900
                  ? "早上"
                  : a < 1130
                    ? "上午"
                    : a < 1230
                      ? "中午"
                      : a < 1800
                        ? "下午"
                        : "晚上";
            },
            calendar: {
              sameDay: "[今天]LT",
              nextDay: "[明天]LT",
              nextWeek: "[下]ddddLT",
              lastDay: "[昨天]LT",
              lastWeek: "[上]ddddLT",
              sameElse: "L",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
            ordinal: function (e, t) {
              switch (t) {
                case "d":
                case "D":
                case "DDD":
                  return e + "日";
                case "M":
                  return e + "月";
                case "w":
                case "W":
                  return e + "周";
                default:
                  return e;
              }
            },
            relativeTime: {
              future: "%s内",
              past: "%s前",
              s: "几秒",
              ss: "%d 秒",
              m: "1 分钟",
              mm: "%d 分钟",
              h: "1 小时",
              hh: "%d 小时",
              d: "1 天",
              dd: "%d 天",
              M: "1 个月",
              MM: "%d 个月",
              y: "1 年",
              yy: "%d 年",
            },
            week: { dow: 1, doy: 4 },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("zh-hk", {
            months:
              "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
                "_",
              ),
            monthsShort:
              "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
            weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split(
              "_",
            ),
            weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"),
            weekdaysMin: "日_一_二_三_四_五_六".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "YYYY/MM/DD",
              LL: "YYYY年M月D日",
              LLL: "YYYY年M月D日 HH:mm",
              LLLL: "YYYY年M月D日dddd HH:mm",
              l: "YYYY/M/D",
              ll: "YYYY年M月D日",
              lll: "YYYY年M月D日 HH:mm",
              llll: "YYYY年M月D日dddd HH:mm",
            },
            meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "凌晨" === t || "早上" === t || "上午" === t
                  ? e
                  : "中午" === t
                    ? e >= 11
                      ? e
                      : e + 12
                    : "下午" === t || "晚上" === t
                      ? e + 12
                      : void 0
              );
            },
            meridiem: function (e, t, n) {
              var a = 100 * e + t;
              return a < 600
                ? "凌晨"
                : a < 900
                  ? "早上"
                  : a < 1130
                    ? "上午"
                    : a < 1230
                      ? "中午"
                      : a < 1800
                        ? "下午"
                        : "晚上";
            },
            calendar: {
              sameDay: "[今天]LT",
              nextDay: "[明天]LT",
              nextWeek: "[下]ddddLT",
              lastDay: "[昨天]LT",
              lastWeek: "[上]ddddLT",
              sameElse: "L",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
            ordinal: function (e, t) {
              switch (t) {
                case "d":
                case "D":
                case "DDD":
                  return e + "日";
                case "M":
                  return e + "月";
                case "w":
                case "W":
                  return e + "週";
                default:
                  return e;
              }
            },
            relativeTime: {
              future: "%s內",
              past: "%s前",
              s: "幾秒",
              ss: "%d 秒",
              m: "1 分鐘",
              mm: "%d 分鐘",
              h: "1 小時",
              hh: "%d 小時",
              d: "1 天",
              dd: "%d 天",
              M: "1 個月",
              MM: "%d 個月",
              y: "1 年",
              yy: "%d 年",
            },
          });
        })(n(84));
      },
      function (e, t, n) {
        !(function (e) {
          "use strict";
          e.defineLocale("zh-tw", {
            months:
              "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split(
                "_",
              ),
            monthsShort:
              "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
            weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split(
              "_",
            ),
            weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"),
            weekdaysMin: "日_一_二_三_四_五_六".split("_"),
            longDateFormat: {
              LT: "HH:mm",
              LTS: "HH:mm:ss",
              L: "YYYY/MM/DD",
              LL: "YYYY年M月D日",
              LLL: "YYYY年M月D日 HH:mm",
              LLLL: "YYYY年M月D日dddd HH:mm",
              l: "YYYY/M/D",
              ll: "YYYY年M月D日",
              lll: "YYYY年M月D日 HH:mm",
              llll: "YYYY年M月D日dddd HH:mm",
            },
            meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
            meridiemHour: function (e, t) {
              return (
                12 === e && (e = 0),
                "凌晨" === t || "早上" === t || "上午" === t
                  ? e
                  : "中午" === t
                    ? e >= 11
                      ? e
                      : e + 12
                    : "下午" === t || "晚上" === t
                      ? e + 12
                      : void 0
              );
            },
            meridiem: function (e, t, n) {
              var a = 100 * e + t;
              return a < 600
                ? "凌晨"
                : a < 900
                  ? "早上"
                  : a < 1130
                    ? "上午"
                    : a < 1230
                      ? "中午"
                      : a < 1800
                        ? "下午"
                        : "晚上";
            },
            calendar: {
              sameDay: "[今天] LT",
              nextDay: "[明天] LT",
              nextWeek: "[下]dddd LT",
              lastDay: "[昨天] LT",
              lastWeek: "[上]dddd LT",
              sameElse: "L",
            },
            dayOfMonthOrdinalParse: /\d{1,2}(日|月|週)/,
            ordinal: function (e, t) {
              switch (t) {
                case "d":
                case "D":
                case "DDD":
                  return e + "日";
                case "M":
                  return e + "月";
                case "w":
                case "W":
                  return e + "週";
                default:
                  return e;
              }
            },
            relativeTime: {
              future: "%s內",
              past: "%s前",
              s: "幾秒",
              ss: "%d 秒",
              m: "1 分鐘",
              mm: "%d 分鐘",
              h: "1 小時",
              hh: "%d 小時",
              d: "1 天",
              dd: "%d 天",
              M: "1 個月",
              MM: "%d 個月",
              y: "1 年",
              yy: "%d 年",
            },
          });
        })(n(84));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "MNFGkT80",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-boosts-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-boosts-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-boosts-component\\\\index.js\\" "],["text","\\n"],["open-element","span",[]],["dynamic-attr","class",["concat",["style-profile-perks-icon style-profile-boost ",["helper",["if"],[["get",["boostActive"]],"","disabled"],null]]]],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["bottom"]],8],["close-element"],["text","\\n\\n"],["open-element","span",[]],["dynamic-attr","class",["concat",["style-profile-perks-icon style-profile-reroll ",["helper",["if"],[["get",["aramRerollCount"]],"","disabled"],null]]]],["flush-element"],["text","\\n  "],["open-element","span",[]],["static-attr","class","style-profile-val"],["flush-element"],["append",["unknown",["aramRerollCount"]],false],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["bottom"]],2],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","profile_perks_aram_reroll_tooltip_title_progress"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["rerollsProgressString"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","h6",[]],["flush-element"],["append",["unknown",["tra","profile_perks_aram_reroll_tooltip_title_full"]],false],["close-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["rerollsMoreThanMaxString"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","style-profile-reroll-tooltip"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","style-profile-small-progress-radial-container"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-radial-progress",[]],["static-attr","type","blue"],["dynamic-attr","percent",["unknown",["rerollsProgressPercentage"]],null],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","slot","top"],["static-attr","class","top"],["flush-element"],["text","\\n            "],["open-element","h5",[]],["flush-element"],["append",["unknown",["aramRerollCount"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","style-profile-small-progress-radial-desc"],["flush-element"],["text","\\n"],["block",["if"],[["get",["rerollsMoreThanMax"]]],null,1,0],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","profile_perks_boost_tooltip_message_none"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","span",[]],["static-attr","class","lol-typekit-label"],["flush-element"],["text","\\n                    "],["append",["unknown",["xpBoostWinCountString"]],false],["text","\\n                  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","span",[]],["static-attr","class","lol-typekit-label"],["flush-element"],["text","\\n                    "],["append",["unknown",["xpExpireString"]],false],["text","\\n                  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","tr",[]],["flush-element"],["text","\\n                "],["open-element","td",[]],["flush-element"],["text","\\n                  "],["open-element","span",[]],["static-attr","class","lol-typekit-value"],["flush-element"],["text","\\n                    "],["append",["unknown",["tra","profile_perks_boost_tooltip_message_xp_subtitle"]],false],["text","\\n                  "],["close-element"],["text","\\n                "],["close-element"],["text","\\n                "],["open-element","td",[]],["flush-element"],["text","\\n"],["block",["if"],[["get",["xpExpireString"]]],null,5],["block",["if"],[["get",["xpBoostWinCountString"]]],null,4],["text","                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","table",[]],["static-attr","class","lol-uikit-list-table"],["flush-element"],["text","\\n"],["block",["if"],[["get",["xpBoostActive"]]],null,6],["text","        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["static-attr","class","style-profile-boosts-tooltip"],["flush-element"],["text","\\n      "],["open-element","h6",[]],["dynamic-attr","class",["concat",["style-profile-boosts-tooltip-title ",["helper",["if"],[["get",["boostActive"]],"left",""],null]]]],["flush-element"],["append",["unknown",["tra","profile_perks_boost_tooltip_title"]],false],["close-element"],["text","\\n      "],["open-element","hr",[]],["static-attr","class","heading-spacer"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["boostActive"]]],null,7,3],["text","    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        const { RunMixin: s } = a.EmberAddons.EmberLifeline,
          i = (0, a.EmberDataBinding)({
            Ember: a.Ember,
            websocket: (0, a.getProvider)().getSocket(),
            basePaths: {
              login: "/lol-login",
              summoner: "/lol-summoner",
              ranked: "/lol-ranked",
              boosts: "/lol-active-boosts",
              collections: "/lol-collections",
              championMastery: "/lol-champion-mastery",
              platformConfig: "/lol-platform-config",
              lolAccountSettings: "/lol-settings",
              riotClient: "/riotclient",
              chat: "/lol-chat",
              clientConfig: "/lol-client-config",
            },
            boundProperties: {
              session: { api: "login", path: "/v1/session" },
              regionLocale: { api: "riotClient", path: "/region-locale" },
              championMasteryConfig: {
                api: "platformConfig",
                path: "/v1/namespaces/ChampionMasteryConfig",
              },
              challengesConfig: {
                api: "platformConfig",
                path: "/v1/namespaces/Challenges",
              },
              potatoModeSettings: {
                api: "lolAccountSettings",
                path: "/v2/local/lol-user-experience",
              },
              friends: { api: "chat", path: "/v1/friends" },
            },
          });
        e.exports = a.Ember.Service.extend(i, s, {
          friends: a.Ember.A(),
          init: function () {
            this._super(...arguments),
              this.runTask(() => {
                a.logger.trace("PROFILEREADY: force set ready"),
                  this.set("loadingComplete", !0);
              }, 3e3);
          },
          locale: a.Ember.computed("regionLocale.locale", function () {
            return (this.get("regionLocale.locale") || "").replace("_", "-");
          }),
          onProfileModeObserver: a.Ember.on(
            "init",
            a.Ember.observer("summonerId", "profileMode", function () {
              const e = this.get("profileMode");
              if (!e) return;
              const t = "searched" === e;
              this.get("isSearched") !== t && this.set("isSearched", t),
                t
                  ? this.calculateSearchedSummoner()
                  : this.dataBindProperty(
                      "summoner",
                      "/v1/current-summoner",
                      "summoner",
                    );
            }),
          ),
          calculateSearchedSummoner: function () {
            const e = this.get("summonerId");
            if (!e) return;
            e !== this.get("summoner.summonerId") &&
              this.get("api.summoner")
                .get("/v1/summoners/" + e)
                .then((e) => {
                  this.set("summoner", e);
                });
          },
          friend: a.Ember.computed(
            "summoner.summonerId",
            "isSearched",
            "friends.[]",
            function () {
              const e = this.get("summoner.summonerId");
              if (!e) return;
              const t = Boolean(this.get("profileMode")),
                n = Boolean(this.get("isSearched"));
              return !(!t || !n) && this.get("friends").isAny("summonerId", e);
            },
          ),
          boosts: a.Ember.computed("isSearched", function () {
            const e = Boolean(this.get("profileMode")),
              t = Boolean(this.get("isSearched"));
            e &&
              !t &&
              this.dataBindProperty("boosts", "/v1/active-boosts", "boosts");
          }),
          rankedData: a.Ember.computed("summoner.puuid", function () {
            const e = this.get("summoner.puuid");
            if (!e) return;
            this.get("api.ranked")
              .get(`/v1/ranked-stats/${e}`, { skipCache: !0 })
              .then((t) => {
                t || (t = {}), (t.puuid = e), this.set("rankedData", t);
              });
          }),
          championMasteries: a.Ember.computed("summoner.puuid", function () {
            const e = this.get("summoner.puuid");
            if (!e) return;
            this.get("api.championMastery")
              .post(`/v1/${e}/champion-mastery/top?count=3`, { skipCache: !0 })
              .then((e) => {
                this.set("championMasteries", e);
              });
          }),
          backdropObserver: a.Ember.observer(
            "summoner.summonerId",
            function () {
              const e = this.get("summoner.summonerId");
              e &&
                this.dataBindProperty(
                  "collections",
                  `/v1/inventories/${e}/backdrop`,
                  "backdrop",
                  { skipCache: !0 },
                );
            },
          ),
          loadingComplete: a.Ember.computed(
            "backdrop.summonerId",
            "championMasteries.puuid",
            "rankedData.summonerId",
            function () {
              const e = Boolean(this.get("backdrop.summonerId")),
                t = Boolean(this.get("championMasteries.puuid")),
                n = Boolean(this.get("rankedData.puuid")),
                s = e && t && n;
              return (
                a.logger.trace("PROFILEREADY", {
                  backdrop: e,
                  mastery: t,
                  ranked: n,
                  ready: s,
                }),
                s
              );
            },
          ),
        });
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        e.exports = a.Ember.Service.extend({
          summary: [],
          enabled: !1,
          profileService: a.Ember.inject.service("profile"),
          puuid: a.Ember.computed.alias("profileService.summoner.puuid"),
          init() {
            this._super(...arguments),
              (this.binding = a.DataBinding.bindTo(a.socket)),
              this.initDatabindings();
          },
          willDestroy() {
            this._super(...arguments),
              this.binding.removeObserver(
                "/lol-platform-config/v1/namespaces/Eternals/Enabled",
                this,
              );
          },
          initDatabindings() {
            this.binding.addObserver(
              "/lol-platform-config/v1/namespaces/Eternals/Enabled",
              this,
              (e) => {
                this.initData(e);
              },
            );
          },
          initData(e) {
            const t = this.get("puuid");
            return (
              (e = e || !1),
              this.set("enabled", e),
              e || this.set("summary", []),
              t
                ? this.binding
                    .get(`/lol-statstones/v1/profile-summary/${t}`, {
                      skipCache: !0,
                    })
                    .then((e) => {
                      this.set("summary", e);
                    })
                : Promise.resolve()
            );
          },
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.CUSTOMIZER_TITLES_SETTINGS_VERSION = void 0);
        var a = n(1);
        t.CUSTOMIZER_TITLES_SETTINGS_VERSION = 1;
        const s = "/v2/account/LCUPreferences/lol-notifications",
          i = "/v1/latest-challenge-level-up",
          r = "/v2/account/LCUPreferences/lol-customizer-tokens",
          o = "/lol-challenges-latest-level-up",
          l = `/v2/account/LCUPreferences${o}`;
        e.exports = a.Ember.Service.extend({
          sharedNotificationsService: a.Ember.inject.service(
            "shared-notifications",
          ),
          tokenSettings: {},
          lastChallengeLevelUpTimestamp: 0,
          init() {
            this._super(...arguments),
              (this.settingsBinding = (0, a.DataBinding)(
                "/lol-settings",
                a.socket,
              )),
              (this.inventoryBinding = (0, a.DataBinding)(
                "/lol-inventory",
                a.socket,
              )),
              (this.challengesBinding = (0, a.DataBinding)(
                "/lol-challenges",
                a.socket,
              )),
              (this.accountPreferences = (0, a.DataBinding)(
                "/lol-settings/v2/account/LCUPreferences",
                a.socket,
              )),
              this.settingsBinding.addObserver(
                s,
                this,
                this._handleNotificationPreferences.bind(this),
              ),
              this.settingsBinding.addObserver(
                r,
                this,
                this._handleCustomizerTokenSettings.bind(this),
              ),
              this.settingsBinding.addObserver(
                l,
                this,
                this._handleChallengesLatestLevelUpSettings.bind(this),
              );
          },
          willDestroy() {
            this._super(...arguments),
              this._destroyObservers(),
              this.settingsBinding.removeObserver(s, this),
              this.settingsBinding.removeObserver(r, this),
              this.settingsBinding.removeObserver(l, this);
          },
          hasUnreadNotifications: a.Ember.computed(
            "sharedNotificationsService.hasUnreadTitleNotification",
            "sharedNotificationsService.hasUnreadIconNotification",
            "hasUnreadTokens",
            function () {
              const e = this.get(
                  "sharedNotificationsService.hasUnreadTitleNotification",
                ),
                t = this.get(
                  "sharedNotificationsService.hasUnreadIconNotification",
                ),
                n = this.get("hasUnreadTokens");
              return e || t || n;
            },
          ),
          hasUnreadTokens: a.Ember.computed(
            "tokenSettings",
            "lastChallengeLevelUpTimestamp",
            "challengeLevelUpSettings",
            function () {
              const e = this.get("tokenSettings");
              if (!e || !e.lastVisitTime) return !1;
              const t = this.get("challengeLevelUpSettings"),
                n = t ? t.lastLevelUpTime : 0,
                a = this.get("lastChallengeLevelUpTimestamp");
              if (!a && !n) return !1;
              const s = e.lastVisitTime;
              return a > s || (n && n > s);
            },
          ),
          _initObservers() {
            this.challengesBinding.addObserver(
              i,
              this,
              this._setLatestChallengeLevelUp.bind(this),
            );
          },
          _destroyObservers() {
            this.challengesBinding.removeObserver(i, this);
          },
          _handleNotificationPreferences(e) {
            e && e.data && e.data.disableCollectionsNotifications
              ? this._destroyObservers()
              : this._initObservers();
          },
          _handleCustomizerTokenSettings(e) {
            e && e.data && this.set("tokenSettings", e.data);
          },
          _setLatestChallengeLevelUp(e) {
            e &&
              (this.set("lastChallengeLevelUpTimestamp", e),
              this.accountPreferences
                .get("/lol-customizer-tokens")
                .then((t) => {
                  if (t && t.data) {
                    const n = t.data,
                      a = n.lastVisitTime;
                    a && a < e && this._saveTokenUpdateTimestamp(e),
                      this.set("tokenSettings", n);
                  }
                }));
          },
          _saveTokenUpdateTimestamp(e) {
            this.accountPreferences.put(o, {
              schemaVersion: 1,
              data: { lastLevelUpTime: e },
            });
          },
          _handleChallengesLatestLevelUpSettings(e) {
            e && e.data && this.set("challengeLevelUpSettings", e.data);
          },
        });
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        n(219);
        var s = n(7);
        const i = (0, a.EmberDataBinding)({
          Ember: a.Ember,
          websocket: (0, a.getProvider)().getSocket(),
          basePaths: {
            platformConfig: "/lol-platform-config",
            summoner: "/lol-summoner",
          },
          boundProperties: {
            RankedReferenceModalEnabled: {
              api: "platformConfig",
              path: "/v1/namespaces/LeagueConfig/RankedReferenceModalEnabled",
              default: !1,
            },
            currentSummoner: { api: "summoner", path: "/v1/current-summoner" },
          },
        });
        e.exports = a.Ember.Component.extend(i, {
          classNames: ["ranked-reference-modal-button-component"],
          layout: n(220),
          isRankedEligible: a.Ember.computed("currentSummoner", function () {
            return this.get("currentSummoner.summonerLevel") >= 30;
          }),
          showingRankedReference: a.Ember.computed(
            "RankedReferenceModalEnabled",
            "isRankedEligible",
            "queueType",
            function () {
              return (
                this.get("RankedReferenceModalEnabled") &&
                this.get("isRankedEligible") &&
                !s.QUEUES.RANKED_AND_RATED_TFT_QUEUE_TYPES.includes(
                  this.get("queueType"),
                )
              );
            },
          ),
          actions: {
            OpenRankedReferenceModal: function () {
              const e = this.get("queueType");
              return a.LeagueTierNames.getTiersForQueue(e).then((e) => {
                a.AudioPlugin.getChannel("sfx-ui").playSound(
                  "/fe/lol-uikit/sfx-uikit-click-generic.ogg",
                );
                const t = a.ComponentFactory.create(
                  "RankedReferenceModalComponent",
                  { queueType: this.get("queueType"), tiers: e },
                );
                a.ModalManager.add({
                  type: "DialogAlert",
                  data: {
                    contents: t.domNode,
                    okText: this.get(
                      "tra.ranked_reference_modal_queue_up_text",
                    ),
                    dismissible: !0,
                    dismissibleType: "inside",
                  },
                }).okPromise.then((e) => {
                  "ok-button" === e && a.Parties.showGameSelectPreselected(420);
                });
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
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "cCR9KKI0",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\ranked-reference-modal-button-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\ranked-reference-modal-button-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\ranked-reference-modal-button-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["showingRankedReference"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","lol-uikit-info-icon",[]],["static-attr","class","ranked-reference-modal-question-mark"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"OpenRankedReferenceModal"],null],null],["flush-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a = n(1),
          s = n(7);
        n(222);
        var i = n(223);
        const r = 628,
          o = (0, a.DataBinding)(
            "/lol-ranked",
            (0, a.getProvider)().getSocket(),
          ),
          l = (0, a.DataBinding)(
            "/lol-platform-config",
            (0, a.getProvider)().getSocket(),
          ),
          d = (0, a.DataBinding)(
            "/lol-settings",
            (0, a.getProvider)().getSocket(),
          ),
          m = (0, a.DataBinding)(
            "/riotclient",
            (0, a.getProvider)().getSocket(),
          ),
          _ = "/v1/account/lol-profiles",
          u = s.QUEUES.RANKED_SOLO_5x5_QUEUE_TYPE;
        e.exports = a.Ember.Component.extend({
          classNames: ["ranked-reference-modal-component"],
          layout: n(224),
          pageIndex: 0,
          numPages: 0,
          isScrolling: !1,
          isOnProvisionalMatches: !1,
          rankedStatsEntry: void 0,
          rankedRewardConfig: void 0,
          init() {
            this._super(...arguments),
              this.set("pageIndex", 0),
              this.set("numPages", Math.ceil(this.get("tiers").length / 3)),
              this.set("isScrolling", !1),
              this.set("rankedRewardConfig", n(225).SR_REWARDS);
            const e = this.get("queueType") ? this.get("queueType") : u,
              t = o.get("/v1/current-ranked-stats").then((t) => {
                this.getRankedStats(t, e);
              }),
              a = o.get("/v1/splits-config").then((e) => {
                Boolean(e) && this.set("splitsConfig", e);
              }),
              s = l
                .get("/v1/namespaces/LeagueConfig/RankedRewardConfig")
                .then((e) => {
                  this.getRewardConfig(e);
                }),
              i = m.get("/region-locale").then((e) => {
                this.set("regionLocale", e);
              });
            Promise.all([t, a, s, i]).then(() => {
              d.get("/v2/ready").then((e) => {
                this.updateSettingsReady(e);
              });
            });
          },
          titleText: a.Ember.computed(
            "splitsConfig",
            "splitsConfig.currentSplitId",
            "splitsConfig.currentSplit.startTimeMillis",
            function () {
              const e = this.get("splitsConfig.currentSplit.startTimeMillis"),
                t = Boolean(e)
                  ? (0, i.convertDateMillisToString)(
                      e,
                      this.get("regionLocale"),
                      { year: "numeric" },
                    )
                  : new Date().getFullYear(),
                n = this.get("splitsConfig.currentSplitId");
              return this.get("tra").formatString(
                "ranked_reference_modal_title",
                { year: t, split: n || "" },
              );
            },
          ),
          victoriousRewardSplitPointRequirements: a.Ember.computed(
            "splitsConfig",
            "splitsConfig.currentSeasonId",
            "splitsConfig.splits.@each.victoriousSkinRewardGroup.splitPointsByHighestSeasonEndTier",
            function () {
              const e = this.get("splitsConfig.splits") || [],
                t = this.get("splitsConfig.currentSeasonId"),
                n = e.find((e) => e.seasonId === t);
              return Boolean(n)
                ? n.victoriousSkinRewardGroup.splitPointsByHighestSeasonEndTier
                : {};
            },
          ),
          getRankedStats: function (e, t) {
            if (!e || !e.queueMap[t]) return;
            const n = e.queueMap[t];
            this.setProperties({
              rankedStatsEntry: n,
              isOnProvisionalMatches: n.isProvisional,
            }),
              window.requestAnimationFrame(() => {
                this.setInitialPage(n.tier);
              });
          },
          getRewardConfig: function (e) {
            if (!e) return;
            const t = JSON.parse(e);
            t &&
              0 !== t.SR_REWARDS.length &&
              this.setProperties({ rankedRewardConfig: t.SR_REWARDS });
          },
          getVictoriousSplitPointsByRequirementTier(e) {
            if (!Boolean(e)) return;
            return this.get("victoriousRewardSplitPointRequirements")[e];
          },
          newCards: a.Ember.computed(
            "rankedStatsEntry",
            "rankedRewardConfig",
            "splitsConfig",
            function () {
              const e = [],
                t = this.get("rankedRewardConfig");
              return t && 0 !== t.length && this.get("rankedStatsEntry")
                ? ((this.get("tiers") || []).forEach((n) => {
                    const s = [],
                      i = [],
                      r = t.find((e) => e.tier.toUpperCase() === n);
                    if (r) {
                      r.reward.forEach((e, t) => {
                        const r = this.get("splitsConfig");
                        if ("icon" === e && r && r.currentSplitId < 3) return;
                        const o = this.get("tra").formatString(
                          "ranked_reward_data_" + e,
                          {
                            rank: a.LeagueTierNames.getTierName(n),
                            spAmount:
                              this.getVictoriousSplitPointsByRequirementTier(
                                n,
                              ) || "",
                          },
                        );
                        t < 3 ? s.push(o) : i.push(o);
                      });
                      const t = {
                        ranked_tier: n,
                        ranked_tra_tier: a.LeagueTierNames.getTierName(n),
                        rewards_after_hovered: i,
                        rewards_before_hovered: s,
                        total_num_of_rewards: r.reward.length,
                        has_extra_rewards: i.length > 0,
                        extra_rewards_text: this.get("tra").formatString(
                          "ranked_reference_modal_extra_reward_text",
                          { number: r.reward.length - 3 },
                        ),
                        is_current_rank:
                          this.get("rankedStatsEntry.tier") === n.toUpperCase(),
                        is_apex_tier:
                          a.LeagueTierNames.getConstants().APEX_TIERS.includes(
                            n,
                          ),
                        division_indicator: this.getDivisionContentArray(
                          n,
                          this.get("rankedStatsEntry.tier"),
                          this.get("rankedStatsEntry.division"),
                        ),
                        lp_points_text: this.getLPContent(
                          n,
                          this.get("rankedStatsEntry.tier"),
                          this.get("rankedStatsEntry.leaguePoints"),
                        ),
                      };
                      e.push(t);
                    }
                  }),
                  e)
                : [];
            },
          ),
          setInitialPage: function (e) {
            const t = document.querySelector(".carousel-body"),
              n = this.get("tiers") || [];
            if (!n.includes(e) || !t) return;
            let a = 0;
            for (let t = 0; t < n.length; t++) {
              if ((t > 0 && t % 3 == 0 && a++, e === n[t])) break;
            }
            let s = r * a;
            this.get("numPages") - 1 === a && (s -= 20),
              (t.style.transform = `translateX(-${s}px)`),
              this.set("pageIndex", a);
          },
          getDivisionContentArray: function (e, t, n) {
            const s = [],
              i = this.get("tiers") || [];
            if (a.LeagueTierNames.getConstants().APEX_TIERS.includes(e))
              return s;
            if (t === e) {
              const e = a.LeagueTierNames.getConstants().DIVISION_TO_ORDINAL[n],
                t = a.LeagueTierNames.getConstants().DIVISIONS.length - e - 1;
              for (let t = 0; t < e + 1; t++) s.push("current");
              for (let e = 0; e < t; e++) s.push("future");
            } else if (i.indexOf(t) > i.indexOf(e))
              for (
                let e = 0;
                e < a.LeagueTierNames.getConstants().DIVISIONS.length;
                e++
              )
                s.push("completed");
            else if (i.indexOf(t) < i.indexOf(e) || "NONE" === t)
              for (
                let e = 0;
                e < a.LeagueTierNames.getConstants().DIVISIONS.length;
                e++
              )
                s.push("future");
            return s;
          },
          getLPContent: function (e, t, n) {
            return a.LeagueTierNames.getConstants().APEX_TIERS.includes(e) &&
              t === e
              ? this.get("tra").formatString("ranked_subtitle_lp", { lp: n })
              : "";
          },
          setScrollingFalse: function () {
            this.set("isScrolling", !1);
          },
          showLeftArrowButton: a.Ember.computed("pageIndex", function () {
            return 0 !== this.get("pageIndex");
          }),
          showRightArrowButton: a.Ember.computed(
            "pageIndex",
            "numPages",
            function () {
              return this.get("pageIndex") < this.get("numPages") - 1;
            },
          ),
          actions: {
            navigatePage: function (e) {
              if (this.get("isScrolling")) return;
              const t = this.get("pageIndex");
              let n,
                s = r * t;
              -1 === e
                ? ((n = r * (t - 1)), this.set("pageIndex", t - 1))
                : 1 === e && ((n = r * (t + 1)), this.set("pageIndex", t + 1)),
                1 === e && t + 1 === this.get("numPages") - 1
                  ? (n -= 20)
                  : -1 === e && t === this.get("numPages") - 1 && (s -= 20),
                this.set("isScrolling", !0);
              (document
                .getElementById("carousel-body")
                .animate(
                  [
                    { transform: `translateX(-${s}px)` },
                    { transform: `translateX(-${n}px)` },
                  ],
                  {
                    duration: 800,
                    iterations: 1,
                    easing: "ease",
                    fill: "forwards",
                  },
                ).onfinish = this.setScrollingFalse.bind(this)),
                a.AudioPlugin.getChannel("sfx-ui").playSound(
                  "/fe/lol-uikit/sfx-uikit-click-and-slide.ogg",
                ),
                a.Telemetry.sendCustomData("ranked-reference-modal-events", {
                  event: "press-arrow-buttons",
                });
            },
            playHoverSound: function () {
              a.AudioPlugin.getChannel("sfx-ui").playSound(
                "/fe/lol-uikit/sfx-uikit-arrow-button-hover.ogg",
              );
            },
          },
          _markSettingsSeen(e, t) {
            const n = e && void 0 !== e.schemaVersion ? e.schemaVersion : 0,
              s = {};
            return (
              (s["ranked-reference-modal-login-seen-for-season"] = t),
              a.Telemetry.sendCustomData("ranked-reference-modal-events", {
                event: "show-modal",
              }),
              d.patch(_, { data: s, schemaVersion: n }).then(
                () =>
                  a.logger.trace(
                    "ranked-reference-modal -- updated settings successfully",
                  ),
                () =>
                  a.logger.trace(
                    "ranked-reference-modal -- failed to update settings",
                  ),
              )
            );
          },
          updateSettingsReady: function (e) {
            if ((e = Boolean(e))) {
              const e = this.get("splitsConfig");
              if (!Boolean(e)) return;
              d.get(_).then((t) => {
                this._markSettingsSeen(t, e.currentSeasonId);
              });
            }
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.convertDateMillisToString = function (
            e,
            t,
            n = { month: "long", day: "numeric", year: "numeric" },
          ) {
            const a = ((t && t.locale) || "en_US").replace("_", "-");
            return new Date(e).toLocaleString(a, n);
          });
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "Ir0o9+HL",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\ranked-reference-modal-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\ranked-reference-modal-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\ranked-reference-modal-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-content-block",[]],["static-attr","class","ranked-reference-modal-container"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","class","ranked-reference-modal-background"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","title-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","title-wing-left"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","title-text"],["flush-element"],["append",["unknown",["titleText"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","title-wing-right"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","summary-body"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","summary-title"],["flush-element"],["append",["unknown",["tra","ranked_reference_modal_summary_title"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","summary-content"],["flush-element"],["append",["unknown",["tra","ranked_reference_modal_summary_content"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["isOnProvisionalMatches"]]],null,9],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","visual"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","visual_caption_division"],["flush-element"],["append",["unknown",["tra","ranked_reference_modal_visual_divisions"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","visual_content_container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","visual_tier"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","visual_regalia_emblem_container"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","visual_regalia_emblem_sizer"],["flush-element"],["text","\\n            "],["open-element","lol-regalia-emblem-element",[]],["static-attr","ranked-tier","SILVER"],["flush-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","visual_caption"],["flush-element"],["append",["unknown",["tra","ranked_reference_modal_visual_tier"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","visual_tier"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","visual_regalia_emblem_container"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","visual_regalia_emblem_sizer"],["flush-element"],["text","\\n            "],["open-element","lol-regalia-emblem-element",[]],["static-attr","ranked-tier","GOLD"],["flush-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","visual_caption"],["flush-element"],["append",["unknown",["tra","ranked_reference_modal_visual_tier"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","id","carousel-container"],["static-attr","class","carousel-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","id","carousel-body"],["static-attr","class","carousel-body"],["flush-element"],["text","\\n"],["block",["each"],[["get",["newCards"]]],null,8],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["carousel-left-arrow-mask ",["helper",["if"],[["get",["showLeftArrowButton"]],"reveal","hidden"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","carousel-left-arrow"],["modifier",["action"],[["get",[null]],"navigatePage",-1]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["carousel-right-arrow-mask ",["helper",["if"],[["get",["showRightArrowButton"]],"reveal","hidden"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","carousel-right-arrow"],["modifier",["action"],[["get",[null]],"navigatePage",1]],["flush-element"],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","current-rank-overlay"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","current-rank-text"],["flush-element"],["append",["unknown",["tra","ranked_reference_modal_current_rank_text"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["open-element","div",[]],["static-attr","class","more-rewards-text"],["flush-element"],["append",["unknown",["item","extra_rewards_text"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","span",[]],["static-attr","class","reward-text-line"],["flush-element"],["text","\\n                    "],["open-element","font",[]],["static-attr","color","#F0E6D2"],["flush-element"],["text","•"],["close-element"],["text"," "],["append",["helper",["sanitize"],[["get",["reward"]]],null],false],["text","\\n                  "],["close-element"],["text","\\n"]],"locals":["reward"]},{"statements":[["text","                  "],["open-element","div",[]],["static-attr","class","reward-text-line"],["flush-element"],["text","\\n                    "],["open-element","font",[]],["static-attr","color","#F0E6D2"],["flush-element"],["text","•"],["close-element"],["text"," "],["append",["helper",["sanitize"],[["get",["reward"]]],null],false],["text","\\n                  "],["close-element"],["text","\\n"]],"locals":["reward"]},{"statements":[["text","                    "],["open-element","div",[]],["dynamic-attr","class",["concat",["division-icon ",["get",["indicator"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["indicator"]},{"statements":[["block",["each"],[["get",["item","division_indicator"]]],null,4]],"locals":[]},{"statements":[["text","                    "],["open-element","div",[]],["static-attr","class","apex-lp-text"],["flush-element"],["append",["unknown",["item","lp_points_text"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["item","is_current_rank"]]],null,6]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","carousel-item-container"],["static-attr","id","carousel-item-container"],["modifier",["action"],[["get",[null]],"playHoverSound"],[["on"],["mouseEnter"]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["regalia-crest-container ",["unknown",["item","ranked_tier"]]]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","regalia-crest-emblem-container"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","regalia-emblem-sizer"],["flush-element"],["text","\\n                "],["open-element","lol-regalia-emblem-element",[]],["dynamic-attr","ranked-tier",["unknown",["item","ranked_tier"]],null],["flush-element"],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","carousel-item-text-container"],["flush-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["anchor-",["unknown",["item","total_num_of_rewards"]]]]],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","carousel-item-text-anchor"],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","rank-tier-title-text"],["flush-element"],["text","\\n                "],["append",["unknown",["item","ranked_tra_tier"]],false],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","rank-division-indicator"],["flush-element"],["text","\\n"],["block",["if"],[["get",["item","is_apex_tier"]]],null,7,5],["text","              "],["close-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","reward-text-container"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","reward-title"],["flush-element"],["append",["unknown",["tra","ranked_reference_modal_reward_text"]],false],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","reward-text-container-upper-half"],["flush-element"],["text","\\n"],["block",["each"],[["get",["item","rewards_before_hovered"]]],null,3],["text","                "],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","reward-text-container-bottom-half"],["flush-element"],["text","\\n"],["block",["each"],[["get",["item","rewards_after_hovered"]]],null,2],["text","                "],["close-element"],["text","\\n"],["block",["if"],[["get",["item","has_extra_rewards"]]],null,1],["text","              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n\\n        "],["close-element"],["text","\\n"],["block",["if"],[["get",["item","is_current_rank"]]],null,0],["text","      "],["close-element"],["text","\\n"]],"locals":["item"]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","provisional-warning-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","provisional-warning-icon"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","provisional-warning-text"],["flush-element"],["append",["unknown",["tra","ranked_reference_modal_unranked_warning"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e) => {
        "use strict";
        e.exports = JSON.parse(
          '{"SR_REWARDS":[{"tier":"iron","reward":["icon","banner_trim"]},{"tier":"bronze","reward":["icon","banner_trim"]},{"tier":"silver","reward":["icon","banner_trim","border"]},{"tier":"gold","reward":["icon","banner_trim","border","victorious_skin"]},{"tier":"platinum","reward":["icon","banner_trim","border","victorious_skin","victorious_chroma"]},{"tier":"emerald","reward":["icon","banner_trim","border","victorious_skin","victorious_chroma"]},{"tier":"diamond","reward":["icon","banner_trim","border","victorious_skin","victorious_chroma"]},{"tier":"master","reward":["icon","banner_trim","border","victorious_skin","victorious_chroma"]},{"tier":"grandmaster","reward":["icon","banner_trim","border","victorious_skin","victorious_chroma"]},{"tier":"challenger","reward":["icon","banner_trim","border","victorious_skin","victorious_chroma","challenger_recall"]}]}',
        );
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t._makeBannerDataFlagKey = d),
          (t.default = void 0);
        var a = n(1),
          s = n(76);
        n(227);
        var i = n(78);
        const r = (0, a.EmberDataBinding)({
          Ember: a.Ember,
          websocket: (0, a.getProvider)().getSocket(),
          basePaths: { banners: "/lol-banners" },
          boundProperties: {
            bannersConfigNamespace:
              "/lol-platform-config/v1/namespaces/Banners",
          },
        });
        var o = a.Ember.Component.extend(r, {
          layout: n(228),
          classNames: ["style-profile-clash-banner-picker-component"],
          isInitialized: !1,
          init: function () {
            this._super.apply(this, arguments),
              (this.initializedPromise = Promise.all([
                a.GameDataClashBanners.getBannerGameDataPromise().then((e) => {
                  var t, n;
                  !this.isDestroyed &&
                    e.BannerFlags &&
                    (this.set(
                      "bannerDataFlagMap",
                      ((n = e.BannerFlags),
                      new Map(a.Lodash.map(n, (e) => [d(e), e]))),
                    ),
                    this.set(
                      "bannerDataFrameMap",
                      ((t = e.BannerFrames),
                      new Map(
                        a.Lodash.map(t, (e) => [parseInt(e.level, 10), e]),
                      )),
                    ));
                }),
                this.get("api.banners")
                  .get("/v1/current-summoner/flags/equipped", { skipCache: !0 })
                  .then((e) => {
                    this.isDestroyed || this._setSelectedFlag(e);
                  }),
                this.get("api.banners")
                  .get("/v1/current-summoner/flags", { skipCache: !0 })
                  .then((e) => {
                    this.isDestroyed || this.set("ownedFlags", e);
                  }),
                this.get("api.banners")
                  .get("/v1/current-summoner/frames/equipped", {
                    skipCache: !0,
                  })
                  .then((e) => {
                    this.isDestroyed || this.set("equippedFrame", e);
                  }),
              ])),
              this.initializedPromise
                .then(() => {
                  this.isDestroyed || this.set("isInitialized", !0);
                })
                .catch((e) => {
                  a.logger.warning("Failed to load flag selection modal", e);
                  a.ModalManager.add({
                    type: "DialogAlert",
                    data: {
                      contents: this.get(
                        "tra.banners_update_error_dialog_text",
                      ),
                      okText: this.get(
                        "tra.banners_update_error_dialog_ok_button",
                      ),
                    },
                    owner: this.get("element"),
                  }).okPromise.then(() => {
                    s.ClashBannerPickerHandler.hideModal();
                  });
                }),
              (this._boundOnDialogDismissEvent =
                this._handleDialogDismissEvent.bind(this));
          },
          _setSelectedFlag: function (e) {
            a.logger.trace("Updating flag selection to", e),
              this.set("selectedFlag", e);
          },
          onDidInsertElement: a.Ember.on("didInsertElement", function () {
            this.element.addEventListener(
              "dialogFrameDismissed",
              this._boundOnDialogDismissEvent,
            );
          }),
          onWillDestroyElement: a.Ember.on("willDestroyElement", function () {
            this.element.removeEventListener(
              "dialogFrameDismissed",
              this._boundOnDialogDismissEvent,
            );
          }),
          flags: a.Ember.computed(
            "ownedFlags",
            "selectedFlag",
            "bannerDataFlagMap",
            function () {
              const e = this.get("ownedFlags"),
                t = this.get("selectedFlag"),
                n = this.get("bannerDataFlagMap");
              if (!e || !t || !n) return a.Ember.A([]);
              const s = a.Lodash.chain(e)
                .map((e) => ({ ownedFlag: e, bannerDataFlag: l(e, n) }))
                .filter(({ bannerDataFlag: e }) => a.Lodash.isObject(e))
                .map(({ ownedFlag: e, bannerDataFlag: n }) => ({
                  itemId: parseInt(e.itemId, 10),
                  theme: e.theme,
                  level: parseInt(e.level, 10),
                  seasonId: e.seasonId,
                  earnedDateIso8601: e.earnedDateIso8601,
                  imgSrc: n.inventoryIcon,
                  tournamentText: this._themeToTournamentText(e.theme),
                  levelText: this._levelToLevelText(
                    parseInt(e.level, 10),
                    e.theme,
                  ),
                  earnedDateText: this._earnedDateIso8601ToEarnedDateText(
                    e.earnedDateIso8601,
                  ),
                  isSelected: parseInt(e.itemId, 10) === parseInt(t.itemId, 10),
                }))
                .value();
              return a.Ember.A(s);
            },
          ),
          frame: a.Ember.computed(
            "equippedFrame",
            "bannerDataFrameMap",
            function () {
              const e = this.get("equippedFrame"),
                t = this.get("bannerDataFrameMap");
              if (!e || !t) return null;
              const n = t.get(parseInt(e.level, 10));
              return n
                ? { level: parseInt(n.level, 10), imgSrc: n.inventoryIcon }
                : null;
            },
          ),
          _themeToTournamentText: function (e) {
            if (!e) return "";
            return (
              this.get("tra").get("clash_tournament_name_" + e.toLowerCase()) ||
              ""
            );
          },
          _levelToLevelText: function (e, t) {
            if (!a.Lodash.inRange(e, 1, 5)) return "";
            let n = "banners_update_flag_level_" + e;
            return (
              n && i.CLASH_THEMES_EOS.includes(t) && (n += "_eos"),
              n ? this.get("tra").get(n) : ""
            );
          },
          _earnedDateIso8601ToEarnedDateText: function (e) {
            const t = this.get("tra.metadata.locale.id", "en-US");
            return e ? this.get("tra").moment(e).locale(t).format("LL") : "";
          },
          _handleDialogDismissEvent: function () {
            a.logger.trace("Dismissing banner update modal"),
              s.ClashBannerPickerHandler.hideModal();
          },
          _saveSelectedBanner: function () {
            const e = this.get("selectedFlag");
            a.logger.trace("Saving selected flag", e);
            const t = Object.assign({ event: "selected-clash-flag" }, e);
            return (
              a.Telemetry.sendCustomData("profile-overview-events", t),
              this.get("api.banners").put(
                "/v1/current-summoner/flags/equipped",
                e,
              )
            );
          },
          isCurrentlySaving: !1,
          actions: {
            hoverFlag() {
              a.AudioPlugin.getChannel("sfx-ui").playSound(
                "/fe/lol-profiles/sounds/sfx-banners-update-list-item-hover.ogg",
              );
            },
            selectFlag(e, t, n, s, i) {
              const r = {
                itemId: e,
                theme: t,
                level: n,
                seasonId: s,
                earnedDateIso8601: i,
              };
              this._setSelectedFlag(r),
                a.AudioPlugin.getChannel("sfx-ui").playSound(
                  "/fe/lol-profiles/sounds/sfx-banners-update-list-item-select.ogg",
                );
            },
            save() {
              this.get("isCurrentlySaving")
                ? a.logger.trace("Flag selection is already being updated")
                : (this.set("isCurrentlySaving", !0),
                  a.logger.trace(
                    "Updating flag selection and dismissing banner update modal",
                  ),
                  this._saveSelectedBanner().then(
                    (e) => {
                      this.set("isCurrentlySaving", !1),
                        a.logger.trace("Successfully saved flag", e),
                        s.ClashBannerPickerHandler.hideModal();
                    },
                    (e) => {
                      this.set("isCurrentlySaving", !1),
                        a.logger.warning("Failed to save flag", e),
                        a.ModalManager.add({
                          type: "DialogAlert",
                          data: {
                            contents: this.get(
                              "tra.banners_update_error_dialog_text",
                            ),
                            okText: this.get(
                              "tra.banners_update_error_dialog_ok_button",
                            ),
                          },
                          owner: this.get("element"),
                        });
                    },
                  ));
            },
          },
        });
        function l(e, t) {
          return t.get(d(e));
        }
        function d(e) {
          return JSON.stringify([e.theme, parseInt(e.level, 10)]);
        }
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "xoy3hMeG",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-clash-banner-component\\\\clash-banner-picker-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-clash-banner-component\\\\clash-banner-picker-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-emblems\\\\profile-emblem-clash-banner-component\\\\clash-banner-picker-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-dialog-frame",[]],["static-attr","class","dialog-frame"],["static-attr","dismissable",""],["static-attr","orientation","bottom"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","dialog-content style-profile-clash-banner-picker-container"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-content-block",[]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","style-profile-clash-banner-picker-title"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","banners_update_title"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","style-profile-clash-banner-picker-list"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isInitialized"]]],null,5,2],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["isCurrentlySaving"]]],null,1],["text","  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-flat-button-group",[]],["static-attr","type","dialog-frame"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","button-accept"],["dynamic-attr","disabled",["unknown",["isCurrentlySaving"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"save"],null],null],["flush-element"],["text","\\n      "],["append",["helper",["if"],[["get",["isCurrentlySaving"]],["get",["tra","banners_update_save_button_saving"]],["get",["tra","banners_update_save_button"]]],null],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isCurrentlySaving"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","style-profile-clash-banner-picker-saving-spinner"],["flush-element"],["text","\\n      "],["append",["unknown",["uikit-spinner"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-full-page-backdrop",[]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","style-profile-clash-banner-picker-loading-spinner"],["flush-element"],["text","\\n            "],["append",["unknown",["uikit-spinner"]],false],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","                  "],["open-element","img",[]],["static-attr","class","style-profile-clash-banner-picker-frame-img"],["dynamic-attr","src",["concat",[["unknown",["frame","imgSrc"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","              "],["open-element","div",[]],["dynamic-attr","class",["concat",["style-profile-clash-banner-picker-list-item ",["helper",["if"],[["get",["flag","isSelected"]],"list-item-selected"],null]]]],["modifier",["action"],[["get",[null]],"hoverFlag"],[["on"],["mouseEnter"]]],["modifier",["action"],[["get",[null]],"selectFlag",["get",["flag","itemId"]],["get",["flag","theme"]],["get",["flag","level"]],["get",["flag","seasonId"]],["get",["flag","earnedDateIso8601"]]],[["on"],["click"]]],["flush-element"],["text","\\n                "],["open-element","img",[]],["static-attr","class","style-profile-clash-banner-picker-flag-img"],["dynamic-attr","src",["concat",[["unknown",["flag","imgSrc"]]]]],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","style-profile-clash-banner-picker-list-item-details-group"],["flush-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","style-profile-clash-banner-picker-list-item-theme"],["flush-element"],["append",["unknown",["flag","tournamentText"]],false],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","style-profile-clash-banner-picker-list-item-level"],["flush-element"],["append",["unknown",["flag","levelText"]],false],["close-element"],["text","\\n                  "],["open-element","div",[]],["static-attr","class","style-profile-clash-banner-picker-list-item-earned-date"],["flush-element"],["append",["unknown",["flag","earnedDateText"]],false],["close-element"],["text","\\n                "],["close-element"],["text","\\n"],["block",["if"],[["get",["flag","isSelected"]]],null,3],["text","              "],["close-element"],["text","\\n"]],"locals":["flag"]},{"statements":[["text","          "],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["block",["each"],[["get",["flags"]]],null,4],["text","          "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a,
          s = n(1),
          i = (a = n(27)) && a.__esModule ? a : { default: a };
        n(230),
          (e.exports = s.Ember.Component.extend(i.default, {
            classNames: ["style-profile-backdrop-component"],
            layout: n(231),
            profileService: s.Ember.inject.service("profile"),
            backdrop: s.Ember.computed.alias("profileService.backdrop"),
            potatoModeSettings: s.Ember.computed.alias(
              "profileService.potatoModeSettings",
            ),
            animationsDisabled: s.Ember.computed.bool(
              "profileService.potatoModeSettings.data.potatoModeEnabled",
            ),
            defaultBackdrop: s.Ember.computed.equal(
              "backdrop.backdropType",
              "default",
            ),
            sectionIdObserver: s.Ember.on(
              "init",
              s.Ember.observer(
                "subnavigationState.shownSectionId",
                function () {
                  s.Ember.run.once(this, "playVideoIfOnOverview");
                },
              ),
            ),
            playVideoIfOnOverview: function () {
              if (
                this.get("subnavigationState.shownSectionId") ===
                this.overviewSectionId
              ) {
                const e = this.$("#backdrop-video");
                if (e && e.length > 0) {
                  const t = e.get(0);
                  t && t.play();
                }
              }
            },
            overlays: s.Ember.computed(
              "profileService.backdrop.backdropAugments.@each",
              function () {
                return (
                  this.get("profileService.backdrop.backdropAugments") || []
                ).map((e) => e.centeredLCOverlayPath);
              },
            ),
            isOverviewSection: s.Ember.computed(
              "subnavigationState.shownSectionId",
              function () {
                const e = this.get("subnavigationState.shownSectionId");
                return null === e || e === this.overviewSectionId;
              },
            ),
            shouldShowVideo: s.Ember.computed(
              "potatoModeSettings",
              "animationsDisabled",
              "isOverviewSection",
              "backdrop.backdropType",
              "backdrop.backdropVideo",
              function () {
                if (!0 === this.get("animationsDisabled")) return !1;
                if (!this.get("isOverviewSection")) return !1;
                const e = this.get("backdrop.backdropType");
                return (
                  "recently-played" !== e &&
                  "highest-mastery" !== e &&
                  Boolean(this.get("backdrop.backdropVideo"))
                );
              },
            ),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "cKxqySFU",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-backdrop-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-backdrop-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-backdrop-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["style-profile-backdrop-container ",["helper",["unless"],[["get",["isOverviewSection"]],"style-profile-backdrop-dimmed"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","style-profile-masked-image"],["flush-element"],["text","\\n    "],["append",["helper",["uikit-background-switcher"],null,[["class","src","overlays"],["style-profile-background-image",["helper",["if"],[["get",["shouldShowVideo"]],["get",["backdrop","backdropVideo"]],["get",["backdrop","backdropImage"]]],null],["get",["overlays"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["defaultBackdrop"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","style-profile-backdrop-container"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-backdrop-magic",[]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        n(233);
        const s = (0, a.EmberDataBinding)({
          Ember: a.Ember,
          websocket: (0, a.getProvider)().getSocket(),
          basePaths: {
            login: "/lol-login",
            platformConfig: "/lol-platform-config",
            collections: "/lol-collections",
            summoner: "/lol-summoner",
          },
          boundProperties: {
            session: { api: "login", path: "/v1/session" },
            jmxSkinsPickerEnabled: {
              api: "platformConfig",
              path: "/v1/namespaces/Profiles/SkinsPickerEnabled",
            },
            savedBackdrop: {
              api: "collections",
              path: "/v1/inventories/{{session.summonerId}}/backdrop",
            },
          },
        });
        e.exports = a.Ember.Component.extend(s, {
          classNames: ["style-profile-backdrop-picker-component"],
          layout: n(234),
          isOnOverviewPage: a.Ember.computed(
            "subnavigationState.shownSectionId",
            "overviewSectionId",
            function () {
              return (
                this.get("overviewSectionId") ===
                this.get("subnavigationState.shownSectionId")
              );
            },
          ),
          isOnModalView: a.Ember.computed.equal("profileMode", "searched"),
          isNotOnModalView: a.Ember.computed.not("isOnModalView"),
          skinsPickerDisabled: a.Ember.computed.equal(
            "jmxSkinsPickerEnabled",
            !1,
          ),
          skinsPickerEnabled: a.Ember.computed.not("skinsPickerDisabled"),
          showSkinsPickerButton: a.Ember.computed.and(
            "skinsPickerEnabled",
            "isOnOverviewPage",
            "isNotOnModalView",
          ),
          init() {
            this._super(...arguments);
            const e = this._onSelectedSkinChange.bind(this);
            this.set("selectedSkinUpdateHandler", e);
            const t = this._onBackdropReset.bind(this);
            this.set("resetBackdropHandler", t);
            const n = this._onSkinsPickerReady.bind(this);
            this.set("skinsPickerReadyHandler", n);
          },
          didInsertElement() {
            this._super(...arguments);
            const e = this.element.querySelector(
              ".style-profile-skin-picker-button",
            );
            e && this.set("skinsPickerButton", e);
          },
          willDestroyElement() {
            this.get("skinsPickerButton") &&
              this.set("skinsPickerButton", null),
              this._super(...arguments);
          },
          willDestroy() {
            a.SkinsPicker.destroy(), this._super(...arguments);
          },
          actions: {
            toggleSkinsPicker() {
              const e = this.get("skinsPickerButton");
              e && this._showSkinsPicker(e);
            },
          },
          _showSkinsPicker(e) {
            if (e) {
              const e = this.get("selectedSkinUpdateHandler"),
                t = this.get("resetBackdropHandler"),
                n = this.get("skinsPickerReadyHandler");
              a.SkinsPicker.selectSkin(e, t, n);
            }
          },
          _onSelectedSkinChange(e, t) {
            (e = parseInt(e, 10)) && e > 0 && this._saveBackgroundSkinId(e, t);
          },
          _onBackdropReset() {
            const e = this.get("savedBackdrop");
            (e && "specified-skin" !== e.backdropType) ||
              this._saveBackgroundSkinId(0);
          },
          _onSkinsPickerReady() {},
          _saveBackgroundSkinId(e, t) {
            const n = this.get("api.summoner").post(
                "/v1/current-summoner/summoner-profile",
                { key: "backgroundSkinId", value: e },
              ),
              a = this.get("api.summoner").post(
                "/v1/current-summoner/summoner-profile",
                { key: "backgroundSkinAugments", value: t ?? "" },
              );
            return Promise.all([n, a]);
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "IH2IPcHo",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-backdrop-picker-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-backdrop-picker-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-backdrop-picker-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["style-profile-skin-picker-button ",["helper",["unless"],[["get",["showSkinsPickerButton"]],"hide"],null]]]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-close-button",[]],["static-attr","button-type","cog"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"toggleSkinsPicker"],null],null],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["bottom"]],0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","profile_backdrop_picker_button_tooltip"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a,
          s = n(1),
          i = (a = n(236)) && a.__esModule ? a : { default: a },
          r = n(37);
        n(237);
        const o = (0, s.EmberDataBinding)({
          Ember: s.Ember,
          websocket: (0, s.getProvider)().getSocket(),
          basePaths: { summoner: "/lol-summoner" },
        });
        var l = s.Ember.Component.extend(o, {
          classNames: ["style-profile-search-input-component"],
          layout: i.default,
          disabled: !1,
          isOnOverviewPage: s.Ember.computed(
            "subnavigationState.shownSectionId",
            "overviewSectionId",
            function () {
              return (
                this.get("overviewSectionId") ===
                this.get("subnavigationState.shownSectionId")
              );
            },
          ),
          init() {
            this._super(...arguments), (this._playerNames = s.playerNames);
          },
          _showAlertSummonerNotFound(e) {
            const t = this.$("<div>").text(e).html(),
              n = this.get("tra.profile_search_hint_text"),
              a = (0, r.translate)(this, "profile_search_error_not_found", {
                name: t,
              }),
              i = this.get("tra.lib_ui_dialog_alert_ok"),
              o = s.TemplateHelper.contentBlockDialog(
                n,
                a,
                "dialog-small",
                "profile-search-alert",
              );
            s.ModalManager.add({
              type: "DialogAlert",
              data: { contents: o, okText: i },
            });
          },
          _getPlayerName: ({ gameName: e, tagLine: t, summonerName: n }) =>
            n ||
            (e && t
              ? `${e}#${t}`
              : (s.logger.error(
                  "Profile Search received an empty gameName and tagLine or summonerName from the player name input component",
                ),
                !1)),
          actions: {
            async enterKeyPressHandler(e) {
              this.set("disabled", !0);
              const t = this._getPlayerName(e);
              if (t) {
                try {
                  const n = await this.get("api.summoner").get(
                    "/v1/summoners?name=" + encodeURIComponent(t),
                  );
                  n
                    ? this.privateApi.showOverlayForSummoner(n)
                    : this._showAlertSummonerNotFound(
                        this.get("_playerNames").formatPlayerName(e)
                          .playerNameFull,
                      );
                  const a = {
                    event: "search-for-summoner",
                    summonerName: t,
                    ...(n?.summonerId && { summonerId: n.summonerId }),
                  };
                  s.Telemetry.sendCustomData("profile-overview-events", a);
                } catch (e) {
                  s.logger.error("Error searching for summoner", e);
                }
                this.set("disabled", !1);
              }
            },
          },
        });
        t.default = l;
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "KR41lyjQ",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-search-input-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-search-input-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-search-input-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["isOnOverviewPage"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["player-name-input"],null,[["enterKeyPressHandler","disabled"],[["helper",["action"],[["get",[null]],"enterKeyPressHandler"],null],["get",["disabled"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a,
          s = n(1),
          i = (a = n(27)) && a.__esModule ? a : { default: a };
        n(239),
          (e.exports = s.Ember.Component.extend(i.default, {
            classNames: ["style-profile-search-trail-component"],
            layout: n(240),
            profileService: s.Ember.inject.service("profile"),
            bannerEnabled: s.Ember.computed.alias(
              "profileService.bannerEnabled",
            ),
            friend: s.Ember.computed.alias("profileService.friend"),
            summonerIconPathObserver: s.Ember.on(
              "init",
              s.Ember.observer(
                "summoner.profileIconId",
                "friend.icon",
                function () {
                  let e = this.get("friend.icon");
                  (Number.isInteger(e) && -1 !== e) ||
                    (e = this.get("summoner.profileIconId")),
                    s.GameDataProfileIcons.getIconUrlPromise(e).then((e) => {
                      this.set("summonerIconPath", e);
                    });
                },
              ),
            ),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const a = n(1).Ember;
        e.exports = a.HTMLBars.template({
          id: "K9V81aRL",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-search-trail-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-search-trail-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-profiles\\\\src\\\\app\\\\components\\\\profile-search-trail-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","style-profile-search-trail-summoner-icon"],["flush-element"],["text","\\n"],["block",["if"],[["get",["summonerIconPath"]]],null,1],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","style-profile-search-trail-summoner-name"],["flush-element"],["text","\\n  "],["append",["helper",["player-name"],null,[["format","puuid"],["short",["get",["summoner","puuid"]]]]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["summonerIconPath"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-framed-icon"],null,null,0]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var a,
          s = n(1),
          i = n(242),
          r = n(256),
          o = (a = n(257)) && a.__esModule ? a : { default: a };
        n(258),
          (e.exports = function () {
            const e = new i.FullPageModalMediator({ Navigation: s.Navigation }),
              t = e.getScreenNode(),
              n = document.createElement("div");
            n.classList.add("rcp-fe-lol-profiles-modal"), t.appendChild(n);
            const {
                subnavigationApi: a,
                screenRoot: l,
                subnavigationModel: d,
                rootElement: m,
                overviewSection: _,
              } = (0, r.createOverviewSubnavigation)("searched", e, n),
              u = new o.default();
            return (
              a.addEventListener("screenHidden", () => {
                u.destroyWrapper("rcp-fe-lol-profiles-overview"),
                  u.destroyWrapper("rcp-fe-lol-profiles-backdrop"),
                  u.destroyWrapper("rcp-fe-lol-profiles-search-trail");
              }),
              a.addEventListener("showSubsection", (e, t) => {
                if (e !== r.overviewSectionId) return;
                d.summonerId = t.summonerId;
                const n = u.createWrapper(
                    "rcp-fe-lol-profiles-overview",
                    Object.assign({}, d),
                    m,
                  ),
                  a = u.createWrapper(
                    "rcp-fe-lol-profiles-backdrop",
                    Object.assign({}, d),
                  );
                l.insertBefore(a.domNode, l.firstChild);
                const s = u.createWrapper(
                  "rcp-fe-lol-profiles-search-trail",
                  Object.assign({}, d),
                );
                l.appendChild(s.domNode), m.appendChild(n.domNode);
              }),
              { subnavigationApi: a, overviewSection: _ }
            );
          });
      },
      (e, t, n) => {
        "use strict";
        var a = d(n(243)),
          s = d(n(249)),
          i = d(n(250)),
          r = d(n(253)),
          o = d(n(254)),
          l = d(n(255));
        function d(e) {
          return e && e.__esModule ? e : { default: e };
        }
        e.exports = {
          SubnavigationApi: a.default,
          NavigationBarMediator: s.default,
          SectionControllerMediator: i.default,
          FullPageModalMediator: r.default,
          DialogFrameMediator: o.default,
          MainNavigationMediator: l.default,
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var a = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var a = t[n];
                (a.enumerable = a.enumerable || !1),
                  (a.configurable = !0),
                  "value" in a && (a.writable = !0),
                  Object.defineProperty(e, a.key, a);
              }
            }
            return function (t, n, a) {
              return n && e(t.prototype, n), a && e(t, a), t;
            };
          })(),
          s = d(n(244)),
          i = d(n(245)),
          r = d(n(247)),
          o = n(248),
          l = n(246);
        function d(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var m = "riotclient-lib-subnavigation",
          _ = (function (e) {
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
              a(t, [
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
                                m +
                                  " _validateMediators: Expected mediator to be an instance of Mediator",
                              );
                          }),
                          e
                        );
                      if (!(e instanceof i.default))
                        throw new Error(
                          m +
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
                        m + " registerSection: properties is mandatory",
                      );
                    if (
                      (e.hasOwnProperty("id") ||
                        (console.warn(
                          m +
                            " registerSection: properties.id is mandatory. Using properties.title in it's place",
                        ),
                        (e.id = e.title.replace(" ", "_"))),
                      !e.hasOwnProperty("title"))
                    )
                      throw new Error(
                        m + " registerSection: properties.title is mandatory",
                      );
                    if (!e.hasOwnProperty("render"))
                      throw new Error(
                        m + " registerSection: properties.render is mandatory",
                      );
                    return (
                      (e.priority = (0, o.sanitizeInteger)(
                        e.priority,
                        Number.MAX_SAFE_INTEGER,
                      )),
                      (e.enabled = (0, o.sanitizeBoolean)(e.enabled, !0)),
                      this.dispatchEvent(l.EVENT_OUT_REGISTER_SUBSECTION, e),
                      new r.default(this, e.id)
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
        t.default = _;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var n = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var a = t[n];
              (a.enumerable = a.enumerable || !1),
                (a.configurable = !0),
                "value" in a && (a.writable = !0),
                Object.defineProperty(e, a.key, a);
            }
          }
          return function (t, n, a) {
            return n && e(t.prototype, n), a && e(t, a), t;
          };
        })();
        var a = (function () {
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
                    a = void 0;
                  return (
                    !!(n && n.length && (a = n.indexOf(t)) > -1) &&
                    (n.splice(a, 1), this._listeners.set(e, n), !0)
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
                      a = 1;
                    a < t;
                    a++
                  )
                    n[a - 1] = arguments[a];
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
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var a,
          s = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var a = t[n];
                (a.enumerable = a.enumerable || !1),
                  (a.configurable = !0),
                  "value" in a && (a.writable = !0),
                  Object.defineProperty(e, a.key, a);
              }
            }
            return function (t, n, a) {
              return n && e(t.prototype, n), a && e(t, a), t;
            };
          })(),
          i = n(244),
          r = (a = i) && a.__esModule ? a : { default: a },
          o = n(246);
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
                  if (!(e instanceof r.default))
                    throw new Error(
                      "Mediator expects lib to be an instance of Evented",
                    );
                  (this._library = e),
                    this._library.addEventListener(
                      o.EVENT_OUT_SHOW_SUBSECTION,
                      function () {
                        return t._onApiShowSubsection.apply(t, arguments);
                      },
                    ),
                    this._library.addEventListener(
                      o.EVENT_OUT_REGISTER_SUBSECTION,
                      function () {
                        var e = (
                          (arguments.length <= 0 ? void 0 : arguments[0]) || {}
                        ).registerWithMediators;
                        (Array.isArray(e) && !e.includes(t.constructor.name)) ||
                          t._onApiRegisterSubsection.apply(t, arguments);
                      },
                    ),
                    this._library.addEventListener(
                      o.EVENT_OUT_SET_ENABLE_SUBSECTION,
                      function () {
                        return t._onApiSetEnableSubsection.apply(t, arguments);
                      },
                    ),
                    this._library.addEventListener(
                      o.EVENT_OUT_SET_TITLE_SUBSECTION,
                      function () {
                        return t._onApiSetTitleSubsection.apply(t, arguments);
                      },
                    ),
                    this._library.addEventListener(
                      o.EVENT_OUT_SET_TOOLTIP_SUBSECTION,
                      function () {
                        return t._onApiSetTooltipSubsection.apply(t, arguments);
                      },
                    ),
                    this._library.addEventListener(
                      o.EVENT_OUT_SET_SHOW_ALERT_SUBSECTION,
                      function () {
                        return t._onApiSetShowAlertSubsection.apply(
                          t,
                          arguments,
                        );
                      },
                    ),
                    this._library.addEventListener(
                      o.EVENT_OUT_SCREEN_SHOWN,
                      function () {
                        return t._onApiScreenShow.apply(t, arguments);
                      },
                    ),
                    this._library.addEventListener(
                      o.EVENT_OUT_DESTROY,
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
        var a = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var a = t[n];
                (a.enumerable = a.enumerable || !1),
                  (a.configurable = !0),
                  "value" in a && (a.writable = !0),
                  Object.defineProperty(e, a.key, a);
              }
            }
            return function (t, n, a) {
              return n && e(t.prototype, n), a && e(t, a), t;
            };
          })(),
          s = o(n(244)),
          i = o(n(243)),
          r = n(246);
        function o(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var l = "riotclient-lib-subnavigation",
          d = (function (e) {
            function t(e, n) {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError("Cannot call a class as a function");
              })(this, t);
              var a = (function (e, t) {
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
                (a._libRef = e),
                (a._sectionId = n),
                (a._showing = !1),
                a._libRef.addEventListener(
                  r.EVENT_OUT_SHOW_SUBSECTION,
                  a._showSubsection.bind(a),
                ),
                a._libRef.addEventListener(
                  r.EVENT_OUT_SCREEN_HIDDEN,
                  a._deselected.bind(a),
                ),
                a._libRef.addEventListener(
                  r.EVENT_OUT_SECTION_WILL_SHOW,
                  a._sectionWillShow.bind(a),
                ),
                a._libRef.addEventListener(
                  r.EVENT_OUT_SECTION_SHOW,
                  a._sectionShow.bind(a),
                ),
                a._libRef.addEventListener(
                  r.EVENT_OUT_SECTION_WILL_HIDE,
                  a._sectionWillHide.bind(a),
                ),
                a._libRef.addEventListener(
                  r.EVENT_OUT_SECTION_HIDE,
                  a._sectionHide.bind(a),
                ),
                a._libRef.addEventListener(
                  r.EVENT_OUT_DESTROY,
                  a._onDestroy.bind(a),
                ),
                a
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
              a(t, [
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
        t.default = d;
      },
      (e, t) => {
        "use strict";
        function n(e, t) {
          return e ? (isNaN(e) ? t : parseInt(e, 10)) : t;
        }
        function a(e, t) {
          return null == e ? t : !0 === e;
        }
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.sanitizeInteger = n),
          (t.sanitizeBoolean = a);
        var s = { sanitizeInteger: n, sanitizeBoolean: a };
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
        var a,
          s = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var a = t[n];
                (a.enumerable = a.enumerable || !1),
                  (a.configurable = !0),
                  "value" in a && (a.writable = !0),
                  Object.defineProperty(e, a.key, a);
              }
            }
            return function (t, n, a) {
              return n && e(t.prototype, n), a && e(t, a), t;
            };
          })(),
          i = function e(t, n, a) {
            null === t && (t = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === s) {
              var i = Object.getPrototypeOf(t);
              return null === i ? void 0 : e(i, n, a);
            }
            if ("value" in s) return s.value;
            var r = s.get;
            return void 0 !== r ? r.call(a) : void 0;
          },
          r = n(245),
          o = (a = r) && a.__esModule ? a : { default: a },
          l = n(246),
          d = n(248);
        var m = (t.EVENT_NAVIGATION_CLICKED =
            "lol-uikit-navigation-item-click-event"),
          _ = (t.NAVIGATION_ITEM_ATTR_ID = "item-id"),
          u = (t.NAVIGATION_ITEM_ATTR_PRIORITY = "priority"),
          c = (t.NAVIGATION_ITEM_ATTR_DISABLED = "disabled"),
          p = (t.NAVIGATION_ITEM_ATTR_ALERT = "alert"),
          h = (t.NAVIGATION_BAR_INDEX_ATTR = "selectedindex"),
          f = (function (e) {
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
              var a = (function (e, t) {
                if (!e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !t || ("object" != typeof t && "function" != typeof t)
                  ? e
                  : t;
              })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n));
              return (a._options = e), a;
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
                    var t = e.target.getAttribute(_);
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
                    this._component.addEventListener(m, function (t) {
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
                      var a = t[n];
                      if (a.getAttribute(_) === e)
                        return { element: a, index: n };
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
                    t.setAttribute(_, e.id),
                      t.setAttribute(u, e.priority),
                      (t.innerHTML = e.title),
                      !1 === e.enabled && t.setAttribute(c, "");
                    for (
                      var n = this._component.childNodes, a = 0;
                      a < n.length;
                      a++
                    ) {
                      var s = n[a];
                      if ("LOL-UIKIT-NAVIGATION-ITEM" === s.tagName)
                        if (
                          (0, d.sanitizeInteger)(s.getAttribute(u), 1) >
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
                        ? n.element.removeAttribute(c)
                        : n.element.setAttribute(c, ""));
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
                      a = n.TooltipManager,
                      s = n.TemplateHelper;
                    if (a && s) {
                      var i = this._getSectionDataById(e);
                      if (i)
                        if ("string" == typeof t && t.length > 0) {
                          var r = s.contentBlockTooltipSystem(t),
                            o = document.createElement("lol-uikit-tooltip");
                          o.appendChild(r);
                          a.assign(i.element, o, null, {
                            type: "system",
                            targetAnchor: { x: "center", y: "bottom" },
                            tooltipAnchor: { x: "center", y: "top" },
                          });
                        } else a.unassign(i.element);
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
                        ? n.element.setAttribute(p, "")
                        : n.element.removeAttribute(p));
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
          })(o.default);
        t.default = f;
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
        var a = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var a = t[n];
                (a.enumerable = a.enumerable || !1),
                  (a.configurable = !0),
                  "value" in a && (a.writable = !0),
                  Object.defineProperty(e, a.key, a);
              }
            }
            return function (t, n, a) {
              return n && e(t.prototype, n), a && e(t, a), t;
            };
          })(),
          s = function e(t, n, a) {
            null === t && (t = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === s) {
              var i = Object.getPrototypeOf(t);
              return null === i ? void 0 : e(i, n, a);
            }
            if ("value" in s) return s.value;
            var r = s.get;
            return void 0 !== r ? r.call(a) : void 0;
          },
          i = l(n(245)),
          r = l(n(251)),
          o = n(246);
        function l(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var d = (t.EVENT_SECTION_WILL_SHOW = "elementWillShow"),
          m = (t.EVENT_SECTION_SHOW = "elementShow"),
          _ = (t.EVENT_SECTION_WILL_HIDE = "elementWillHide"),
          u = (t.EVENT_SECTION_HIDE = "elementHide"),
          c = (t.SECTION_CONTROLLER_ATTR_SELECTED_ITEM = "selected-item"),
          p = (t.SECTION_ATTR_DISABLED = "disabled"),
          h = (t.SECTION_ATTR_ID = "section-id"),
          f = (function (e) {
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
              var a = (function (e, t) {
                if (!e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called",
                  );
                return !t || ("object" != typeof t && "function" != typeof t)
                  ? e
                  : t;
              })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, n));
              return (
                (a._options = e),
                (a.sectionsRenders = {}),
                (a._currentSectionId = a._component.getAttribute(c)),
                a
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
              a(t, [
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
                    var e = this._component.getAttribute(c);
                    e &&
                      ((this._currentSectionId = e),
                      this._library.dispatchEvent(
                        o.EVENT_IN_SECTION_WILL_SHOW,
                        e,
                      ));
                  },
                },
                {
                  key: "_onSectionShow",
                  value: function () {
                    var e = this._component.getAttribute(c);
                    e &&
                      ((this._currentSectionId = e),
                      this._library.dispatchEvent(o.EVENT_IN_SECTION_SHOW, e));
                  },
                },
                {
                  key: "_onSectionWillHide",
                  value: function () {
                    this._currentSectionId &&
                      this._library.dispatchEvent(
                        o.EVENT_IN_SECTION_WILL_HIDE,
                        this._currentSectionId,
                      );
                  },
                },
                {
                  key: "_onSectionHide",
                  value: function () {
                    this._currentSectionId &&
                      this._library.dispatchEvent(
                        o.EVENT_IN_SECTION_HIDE,
                        this._currentSectionId,
                      );
                  },
                },
                {
                  key: "_setComponentListeners",
                  value: function () {
                    this._component.addEventListener(
                      d,
                      this._onSectionWillShow.bind(this),
                    ),
                      this._component.addEventListener(
                        m,
                        this._onSectionShow.bind(this),
                      ),
                      this._component.addEventListener(
                        _,
                        this._onSectionWillHide.bind(this),
                      ),
                      this._component.addEventListener(
                        u,
                        this._onSectionHide.bind(this),
                      );
                  },
                },
                {
                  key: "_renderSection",
                  value: function (e, t, n) {
                    for (
                      var a = this.sectionsRenders[t],
                        s = r.default.create(a, n),
                        i = r.default.getDOMNode(s);
                      e.firstChild;

                    )
                      e.removeChild(e.firstChild);
                    e.appendChild(i);
                  },
                },
                {
                  key: "_onApiShowSubsection",
                  value: function (e, t) {
                    if (this._component.getAttribute(c) !== e) {
                      var n = this._getSectionById(e);
                      if (n)
                        this.sectionsRenders.hasOwnProperty(e) &&
                          !this._options.preload &&
                          this._renderSection(n, e, t),
                          this._component.setAttribute(c, e);
                    }
                  },
                },
                {
                  key: "_onApiRegisterSubsection",
                  value: function (e) {
                    var t = document.createElement("lol-uikit-section");
                    t.setAttribute(h, e.id),
                      e.enabled || t.setAttribute(p, ""),
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
                    n && (t ? n.removeAttribute(p) : n.setAttribute(p, ""));
                  },
                },
              ]),
              t
            );
          })(i.default);
        t.default = f;
      },
      (e, t, n) => {
        "use strict";
        const a = n(252);
        e.exports = new a();
      },
      (e) => {
        "use strict";
        const t = "use_public_only",
          n = new WeakMap();
        function a(e) {
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
            let a = e.name ? e.name : Object.keys(e)[0];
            (t = e.create ? e.create : e[a]),
              -1 !== a.indexOf(n, a.length - n.length) &&
                (a = a.substring(0, a.length - n.length)),
              (e = a);
          } else if ("function" == typeof e) {
            throw new Error(
              "ComponentFactory.setFactory: type needs to be an object or a string, not a function!",
            );
          }
          this.factories[e] = t;
        }),
          (i.prototype.setPrivateFactory = function (e, t) {
            a(this)[e] = t;
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
            return a(this)[e];
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
              (s((a = e)) && a instanceof HTMLElement && 1 === a.nodeType) ||
              e.domNode
            )
              return e;
            var a;
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
            const a = this.findFactory(e, n);
            return a ? this.create(a, t) : this.buildDummy(e);
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
              create: function (n, a) {
                return e.create(n, a, t);
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
        var a,
          s = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var a = t[n];
                (a.enumerable = a.enumerable || !1),
                  (a.configurable = !0),
                  "value" in a && (a.writable = !0),
                  Object.defineProperty(e, a.key, a);
              }
            }
            return function (t, n, a) {
              return n && e(t.prototype, n), a && e(t, a), t;
            };
          })(),
          i = function e(t, n, a) {
            null === t && (t = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === s) {
              var i = Object.getPrototypeOf(t);
              return null === i ? void 0 : e(i, n, a);
            }
            if ("value" in s) return s.value;
            var r = s.get;
            return void 0 !== r ? r.call(a) : void 0;
          },
          r = n(245),
          o = (a = r) && a.__esModule ? a : { default: a },
          l = n(246);
        var d = ["Navigation"],
          m = (function (e) {
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
                d.forEach(function (t) {
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
          })(o.default);
        t.default = m;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var a,
          s = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var a = t[n];
                (a.enumerable = a.enumerable || !1),
                  (a.configurable = !0),
                  "value" in a && (a.writable = !0),
                  Object.defineProperty(e, a.key, a);
              }
            }
            return function (t, n, a) {
              return n && e(t.prototype, n), a && e(t, a), t;
            };
          })(),
          i = function e(t, n, a) {
            null === t && (t = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === s) {
              var i = Object.getPrototypeOf(t);
              return null === i ? void 0 : e(i, n, a);
            }
            if ("value" in s) return s.value;
            var r = s.get;
            return void 0 !== r ? r.call(a) : void 0;
          },
          r = n(245),
          o = (a = r) && a.__esModule ? a : { default: a },
          l = n(246);
        var d = ["UIKit"],
          m = (function (e) {
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
                d.forEach(function (t) {
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
          })(o.default);
        t.default = m;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 });
        var a,
          s = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var a = t[n];
                (a.enumerable = a.enumerable || !1),
                  (a.configurable = !0),
                  "value" in a && (a.writable = !0),
                  Object.defineProperty(e, a.key, a);
              }
            }
            return function (t, n, a) {
              return n && e(t.prototype, n), a && e(t, a), t;
            };
          })(),
          i = function e(t, n, a) {
            null === t && (t = Function.prototype);
            var s = Object.getOwnPropertyDescriptor(t, n);
            if (void 0 === s) {
              var i = Object.getPrototypeOf(t);
              return null === i ? void 0 : e(i, n, a);
            }
            if ("value" in s) return s.value;
            var r = s.get;
            return void 0 !== r ? r.call(a) : void 0;
          },
          r = n(245),
          o = (a = r) && a.__esModule ? a : { default: a },
          l = n(246);
        var d = [
            "screenName",
            "displayPriority",
            "displayNameLocKey",
            "Viewport",
            "Navigation",
          ],
          m = (function (e) {
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
              d.forEach(function (t) {
                if (!e.hasOwnProperty(t))
                  throw new Error(
                    "MainNavigationMediator options[" + t + "] is mandatory",
                  );
              }),
                (n._options = Object.assign({ alignment: "left" }, e));
              var a = e.Viewport,
                s = e.Navigation;
              return (
                e.defaultSectionIdOnShow &&
                  (n.defaultSectionIdOnShow = e.defaultSectionIdOnShow),
                (n.screenRoot = a.main().getScreenRoot(e.screenName)),
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
          })(o.default);
        t.default = m;
      },
      (e, t, n) => {
        "use strict";
        var a = n(1),
          s = n(242);
        const i = "profile_overview_subsection";
        e.exports = {
          overviewSectionId: i,
          createOverviewSubnavigation: function (e, t, n) {
            const {
                subnavigationApi: r,
                screenRoot: o,
                subnavigationModel: l,
              } = (function (e, t, n) {
                const r = document.createElement(
                  "lol-uikit-section-controller",
                );
                r.setAttribute("animation", "crossfade"), n.appendChild(r);
                const o = document.createElement("lol-uikit-navigation-bar");
                o.setAttribute("type", "nav-bar-secondary"),
                  o.classList.add("style-profile-sub-nav"),
                  n.appendChild(o);
                const l = new s.NavigationBarMediator({
                    TooltipManager: a.TooltipManager,
                    TemplateHelper: a.TemplateHelper,
                    component: o,
                  }),
                  d = new s.SectionControllerMediator({ component: r }),
                  m = new s.SubnavigationApi([t, l, d]),
                  _ = a.Ember.Object.create({ shownSectionId: null }),
                  u = {
                    profileMode: e,
                    subnavigationState: _,
                    overviewSectionId: i,
                  };
                return (
                  m.addEventListener("showSubsection", (t, n) => {
                    _.set("shownSectionId", t);
                    const s = {};
                    e && (s.profileMode = e),
                      t && (s.sectionId = t),
                      n && n.summonerId && (s.summonerId = n.summonerId),
                      a.Telemetry.sendCustomData("profiles-subnav", s);
                  }),
                  { subnavigationApi: m, screenRoot: n, subnavigationModel: u }
                );
              })(e, t, n),
              d = document.createElement("div"),
              m = (function (e, t) {
                const n = () =>
                    a.traService.get("profile_navigation_overview") || "_",
                  s = e.registerSection({
                    id: i,
                    title: n(),
                    priority: 1,
                    render: t,
                    enabled: !0,
                  });
                return (
                  a.tra.observe(() => {
                    s.setTitle(n());
                  }),
                  s
                );
              })(r, d);
            return {
              subnavigationApi: r,
              screenRoot: o,
              subnavigationModel: l,
              rootElement: d,
              overviewSection: m,
            };
          },
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        t.default = class {
          constructor() {
            this._wrapperInstances = {};
          }
          _getInstance(e) {
            return this._wrapperInstances[e];
          }
          _setInstance(e, t) {
            this._wrapperInstances[e] = t;
          }
          createWrapper(e, t, n) {
            this.destroyWrapper(e);
            const s = a.ComponentFactory.create(e, t);
            return this._setInstance(e, s), n && (s.parentElement = n), s;
          }
          destroyWrapper(e) {
            const t = this._getInstance(e);
            if (t) {
              if ((t.onRemove(), t.domNode.remove(), t.parentElement)) {
                const { parentElement: e } = t;
                for (; e.firstChild; ) e.removeChild(e.firstChild);
              }
              this._setInstance(e, null);
            }
          }
        };
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a,
          s = n(1),
          i = n(242),
          r = n(256),
          o = (a = n(257)) && a.__esModule ? a : { default: a };
        n(258),
          (e.exports = function (e) {
            const t = new i.MainNavigationMediator({
                Navigation: s.Navigation,
                Viewport: s.Viewport,
                screenName: "rcp-fe-lol-profiles-main",
                displayPriority: 20,
                displayNameLocKey: "navbar_profile",
                defaultSectionIdOnShow: r.overviewSectionId,
                alignment: "right",
                iconPath: "/fe/lol-static-assets/images/nav-icon-profile.svg",
              }),
              n = t.getScreenNode(),
              a = document.createElement("div");
            a.classList.add("rcp-fe-lol-profiles-main"), n.appendChild(a);
            const {
                subnavigationApi: l,
                screenRoot: d,
                subnavigationModel: m,
                rootElement: _,
                overviewSection: u,
              } = (0, r.createOverviewSubnavigation)("main", t, a),
              c = new o.default();
            let p = null;
            return (
              l.addEventListener("screenShown", () => {
                p ||
                  ((p = c.createWrapper(
                    "rcp-fe-lol-profiles-search-input",
                    Object.assign({ privateApi: e }, m),
                  )),
                  d.appendChild(p.domNode));
                const t = c.createWrapper(
                  "rcp-fe-lol-profiles-backdrop",
                  Object.assign({}, m),
                );
                d.insertBefore(t.domNode, d.firstChild);
                const n = c.createWrapper(
                  "rcp-fe-lol-profiles-backdrop-picker",
                  Object.assign({}, m),
                );
                d.appendChild(n.domNode);
              }),
              l.addEventListener("screenHidden", () => {
                c.destroyWrapper("rcp-fe-lol-profiles-backdrop"),
                  c.destroyWrapper("rcp-fe-lol-profiles-backdrop-picker"),
                  c.destroyWrapper("rcp-fe-lol-profiles-overview");
              }),
              l.addEventListener("showSubsection", (e) => {
                if (e !== r.overviewSectionId)
                  return void c.destroyWrapper("rcp-fe-lol-profiles-overview");
                s.Telemetry.startTracingEvent("profile-overview-rendered");
                const t = c.createWrapper(
                  "rcp-fe-lol-profiles-overview",
                  Object.assign({}, m),
                  _,
                );
                _.appendChild(t.domNode);
              }),
              {
                subnavigationApi: l,
                overviewSection: u,
                mainNavigationItem: t.getMainNavigationItem(),
              }
            );
          });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        t.default = class {
          constructor() {
            let e = null;
            (this.dataPromise = new Promise((t) => {
              e = t;
            })),
              (this._gameDataBinding = (0, a.DataBinding)(
                "/lol-game-data",
                (0, a.getProvider)().getSocket(),
              )),
              this._gameDataBinding
                .get("assets/v1/champion-summary.json")
                .then((t) => {
                  e(t);
                });
          }
          getChampionSummaryPromise(e) {
            return this.dataPromise.then((t) => t.find((t) => t.id === e));
          }
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        t.default = class {
          constructor() {
            let e = null;
            (this.dataPromise = new Promise((t) => {
              e = t;
            })),
              (this._gameDataBinding = (0, a.DataBinding)(
                "/lol-game-data",
                (0, a.getProvider)().getSocket(),
              )),
              this._gameDataBinding
                .get("assets/v1/summoner-banners.json")
                .then((t) => {
                  e(t);
                });
          }
          getBannerGameDataPromise() {
            return this.dataPromise;
          }
          getBannerFlagPromise(e, t) {
            return this.dataPromise.then((n) => {
              let s = null;
              return (
                n &&
                  (s = a.Lodash.find(
                    n.BannerFlags,
                    (n) =>
                      n.theme.toLowerCase() === e.toLowerCase() &&
                      parseInt(n.level, 10) === parseInt(t, 10),
                  )),
                s
              );
            });
          }
          getDefaultBannerFramePromise() {
            return this.dataPromise.then((e) => {
              let t = null;
              return (
                e &&
                  (t = a.Lodash.find(
                    e.BannerFrames,
                    (e) => 1 === parseInt(e.level, 10),
                  )),
                t
              );
            });
          }
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        t.default = class {
          constructor() {
            let e = null;
            (this.dataPromise = new Promise((t) => {
              e = t;
            })),
              (this._gameDataBinding = (0, a.DataBinding)(
                "/lol-game-data",
                (0, a.getProvider)().getSocket(),
              )),
              this._gameDataBinding
                .get("assets/v1/summoner-trophies.json")
                .then((t) => {
                  e(t);
                });
          }
          getTrophyPromise(e, t) {
            return this.dataPromise.then((n) => {
              let s = null;
              return (
                n &&
                  (s = a.Lodash.find(
                    n.Trophies,
                    (n) =>
                      n.theme.toLowerCase() === e.toLowerCase() &&
                      parseInt(n.bracket, 10) === parseInt(t, 10),
                  )),
                s
              );
            });
          }
          getPedestalPromise(e) {
            return this.dataPromise.then((t) => {
              let n = null;
              return (
                t &&
                  (n = a.Lodash.find(
                    t.TrophyPedestals,
                    (t) => parseInt(t.tier, 10) === parseInt(e, 10),
                  )),
                n
              );
            });
          }
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        t.default = class {
          constructor() {
            (this._gameDataBinding = (0, a.DataBinding)(
              "/lol-game-data",
              (0, a.getProvider)().getSocket(),
            )),
              (this.dataPromise = new Promise((e) => {
                this._gameDataBinding
                  .get("assets/v1/summoner-icons.json")
                  .then(e);
              }));
          }
          _lookupProfileIconPath(e, t) {
            if (!Number.isInteger(e) || !t) return "";
            const n = (e) => t.find((t) => t.id === e),
              a = n(e) || n(0);
            return a ? a.imagePath : "";
          }
          getIconUrlPromise(e) {
            return this.dataPromise.then((t) =>
              this._lookupProfileIconPath(e, t),
            );
          }
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        t.default = class {
          constructor() {
            let e = null;
            (this.dataPromise = new Promise((t) => {
              e = t;
            })),
              (this._gameDataBinding = (0, a.DataBinding)(
                "/lol-game-data",
                (0, a.getProvider)().getSocket(),
              )),
              this._gameDataBinding.get("assets/v1/skins.json").then((t) => {
                e(t);
              });
          }
          getSkinPromise(e) {
            return this.dataPromise.then((t) => t[e]);
          }
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        t.default = class {
          constructor() {}
          mainSection() {
            return a.PrivateAPI.mainProfile.subnavigationApi;
          }
          overlaySection() {
            return a.PrivateAPI.modalProfile.subnavigationApi;
          }
          showOverlay(e) {
            a.PrivateAPI.showOverlay(e);
          }
          showOverlayForSummoner(e) {
            a.PrivateAPI.showOverlayForSummoner(e);
          }
          setActive(e) {
            return a.Navigation.setActive(
              a.PrivateAPI.mainProfile.mainNavigationItem,
              e,
            );
          }
          setShowAlert(e) {
            return a.Navigation.setItemAlert(
              a.PrivateAPI.mainProfile.mainNavigationItem,
              e,
            );
          }
          enabled() {
            return a.PrivateAPI.profilesEnabled;
          }
          addConfigObserver(e) {
            "function" == typeof e &&
              (a.PrivateAPI.platformConfigListeners.add(e),
              e({ Enabled: a.PrivateAPI.profilesEnabled }));
          }
          removeConfigObserver(e) {
            a.PrivateAPI.platformConfigListeners.delete(e);
          }
          registerComponent(e, t, n) {
            return a.PrivateAPI.registerComponent(e, t, n);
          }
          getRankedReferenceButton() {
            return a.PrivateAPI.getRankedReferenceModalButton();
          }
          showAlertSummonerIsPrivate(e) {
            a.PrivateAPI.showAlertSummonerIsPrivate(e);
          }
          hasPrivateProfile(e) {
            return a.PrivateAPI.hasPrivateProfile(e);
          }
        };
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        t.default = class {
          constructor() {}
          get componentRegistrations() {
            return {};
          }
          mainSection() {
            return {};
          }
          overlaySection() {
            return {};
          }
          showOverlay() {}
          setActive() {}
          setShowAlert() {}
          enabled() {
            return !1;
          }
          addConfigObserver() {}
          removeConfigObserver() {}
          registerComponent() {}
          getRankedReferenceButton() {}
        };
      },
    ],
    t = {};
  function n(a) {
    var s = t[a];
    if (void 0 !== s) return s.exports;
    var i = (t[a] = { id: a, loaded: !1, exports: {} });
    return e[a].call(i.exports, i, i.exports, n), (i.loaded = !0), i.exports;
  }
  (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
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
      const a = "rcp-fe-lol-profiles",
        s = document.currentScript.ownerDocument;
      const i = window.getPluginAnnounceEventName(a);
      s.addEventListener(
        i,
        function (e) {
          (0, e.registrationHandler)(function (e) {
            return t.default
              .init(e, {
                AudioPlugin: (e) => e.get("rcp-fe-audio"),
                ComponentFactory: (e) =>
                  e.get("rcp-fe-common-libs").getComponentFactory(1),
                DataBinding: (e) =>
                  e
                    .get("rcp-fe-common-libs")
                    .getDataBinding("rcp-fe-lol-profiles"),
                Ember: (e) => e.get("rcp-fe-ember-libs").getEmber(),
                EmberAddons: (e) =>
                  e.get("rcp-fe-ember-libs").getSharedEmberAddons(),
                EmberDataBinding: (e) =>
                  e
                    .get("rcp-fe-ember-libs")
                    .getEmberDataBinding("rcp-fe-lol-profiles"),
                emberl10n: (e) => e.get("rcp-fe-ember-libs").getEmberL10n("1"),
                l10n: (e) => e.get("rcp-fe-lol-l10n"),
                LeagueTierNames: (e) =>
                  e
                    .get("rcp-fe-lol-shared-components")
                    .getApi_LeagueTierNames(),
                lockAndLoadPlugin: (e) => e.get("rcp-fe-lol-lock-and-load"),
                Lodash: (e) => e.get("rcp-fe-common-libs").getLodash(4),
                logger: (e) => e.get("rcp-fe-common-libs").logging.create(a),
                ModalManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getModalManager(),
                moment: (e) => e.get("rcp-fe-lol-l10n").moment(),
                Navigation: (e) => e.get("rcp-fe-lol-navigation"),
                Parties: (e) => e.get("rcp-fe-lol-parties"),
                playerNames: (e) => e.get("rcp-fe-common-libs").playerNames,
                Ramda: (e) => e.get("rcp-fe-common-libs").getRamda("0.19"),
                Regalia: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Regalia(),
                SharedComponents: (e) => e.get("rcp-fe-lol-shared-components"),
                SharedChallengesComponents: (e) =>
                  e
                    .get("rcp-fe-lol-shared-components")
                    .getApi_SharedChallengesComponents(),
                SharedChallengesConstants: (e) =>
                  e
                    .get("rcp-fe-lol-shared-components")
                    .getApi_SharedChallengesConstants(),
                SharedChampionMasteryComponents: (e) =>
                  e
                    .get("rcp-fe-lol-shared-components")
                    .getApi_SharedChampionMasteryComponents(),
                SharedChampionMasteryConstants: (e) =>
                  e
                    .get("rcp-fe-lol-shared-components")
                    .getApi_SharedChampionMasteryConstants(),
                SharedEmberComponents: (e) =>
                  e
                    .get("rcp-fe-lol-shared-components")
                    .getSharedEmberComponents(),
                SkinsPicker: (e) => e.get("rcp-fe-lol-skins-picker"),
                socket: (e) => e.getSocket(),
                Telemetry: (e) => e.get("rcp-fe-common-libs").getTelemetry(1),
                TemplateHelper: (e) =>
                  e.get("rcp-fe-lol-uikit").getTemplateHelper(),
                TooltipManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getTooltipManager(),
                UIKit: (e) => e.get("rcp-fe-lol-uikit"),
                Viewport: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Viewport(),
              })
              .then(() =>
                t.default.add({
                  EmberApplicationFactory: (e) =>
                    e.get("rcp-fe-ember-libs").getEmberApplicationFactory(),
                }),
              )
              .then(() => {
                const n = e
                    .get("rcp-fe-lol-l10n")
                    .tra()
                    .overlay("/fe/lol-l10n/trans.json")
                    .overlay("/fe/lol-clash/trans.json")
                    .overlay("/fe/lol-profiles/trans.json")
                    .overlay("/fe/lol-shared-components/trans.json")
                    .overlay("/fe/lol-shared-components/trans-challenges.json"),
                  a = t.default.emberl10n(t.default.Ember, n);
                return t.default.add({ tra: n, traService: a });
              })
              .then(() => {
                const e = n(2).default;
                t.default.add({ PrivateAPI: () => new e() });
                const a = n(260).default,
                  s = n(261).default,
                  i = n(262).default,
                  r = n(263).default,
                  o = n(264).default,
                  l = new a(),
                  d = new s(),
                  m = new i(),
                  _ = new r(),
                  u = new o();
                t.default.add({
                  GameDataChampionSummary: l,
                  GameDataClashBanners: d,
                  GameDataClashTrophies: m,
                  GameDataProfileIcons: _,
                  GameDataSkins: u,
                });
                const c = new (0, n(265).default)();
                return (
                  t.default.Regalia.registerProfilesApi &&
                    t.default.Regalia.registerProfilesApi(c),
                  c
                );
              })
              .catch((e) => {
                const a = n(266).default,
                  s = e && e.message ? e.message : "unknown";
                return (
                  t.default.logger.error(`init API creation error: ${s}`),
                  t.default.add({ PrivateAPI: () => new a() }),
                  new a()
                );
              });
          });
        },
        { once: !0 },
      );
    })();
})();
