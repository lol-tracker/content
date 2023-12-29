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
        const i = {
          init: function (e, n) {
            return (t = e), this.add(n);
          },
          _getValue: function (e, n) {
            let i;
            return (
              "function" == typeof n
                ? ((i = n(t)),
                  i ||
                    console.warn(
                      "The function for key " + e + " returned a falsy value: ",
                      i,
                    ))
                : "string" == typeof n
                  ? ((i = t.get(n)),
                    i ||
                      console.warn(
                        "The provider `get` invocation for the key " +
                          e +
                          " returned a falsy value: ",
                        i,
                      ))
                  : "object" == typeof n && (i = n),
              i
            );
          },
          add: function (e) {
            e = e || {};
            const t = [],
              n = this;
            return (
              Object.keys(e).forEach(function (i) {
                const s = e[i],
                  o = n._getValue(i, s);
                o && o.then
                  ? (o.then(function (e) {
                      e ||
                        console.warn(
                          "The promise for the key " +
                            i +
                            " resolved with a falsy value: ",
                          e,
                        ),
                        n._addValue(i, e);
                    }),
                    t.push(o))
                  : n._addValue(i, o);
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
        e.exports = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = (function (e, t) {
            if (!t && e && e.__esModule) return e;
            if (null === e || ("object" != typeof e && "function" != typeof e))
              return { default: e };
            var n = u(t);
            if (n && n.has(e)) return n.get(e);
            var i = {},
              s = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e)
              if (
                "default" !== o &&
                Object.prototype.hasOwnProperty.call(e, o)
              ) {
                var a = s ? Object.getOwnPropertyDescriptor(e, o) : null;
                a && (a.get || a.set)
                  ? Object.defineProperty(i, o, a)
                  : (i[o] = e[o]);
              }
            (i.default = e), n && n.set(e, i);
            return i;
          })(n(3)),
          s = m(n(58)),
          o = n(59),
          a = n(63),
          r = m(n(64)),
          l = n(60),
          c = m(n(65));
        function m(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function u(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (u = function (e) {
            return e ? n : t;
          })(e);
        }
        const p = n(1),
          { ViewportPlugin: d } = p,
          { DataBinding: h } = p,
          { UXSettings: g } = p,
          f = p.Lodash,
          { EmberHelpers: S } = p,
          { Telemetry: _ } = p,
          b = o.PositionAssignmentPreloadVideos;
        var y = new (class {
          constructor() {
            const e = p.getProvider();
            this.champSelectVideoCache =
              p.UiKitPlugin.getVideoCache().createCache(
                "rcp-fe-lol-champ-select",
              );
            const t = p.l10n.tra().overlay("/fe/lol-champ-select/trans.json");
            Promise.all([
              t.getAsync("dodge_header"),
              t.getAsync("dodge_body"),
              t.getAsync("clash_dodge_body"),
            ]).then(
              function (e) {
                (this._dodgeMessage = { header: e[0], body: e[1] }),
                  (this._clashDodgeMessage = { header: e[0], body: e[2] });
              }.bind(this),
            ),
              (this._isShown = !1),
              (this.uxSettingsObserver = function (e) {
                e &&
                  (this.largeAreaAnimationsEnabled =
                    e.largeAreaAnimationsEnabled);
              }.bind(this)),
              (this.showPromise = Promise.resolve()),
              (this.appControls = e.get("rcp-fe-lol-navigation")),
              (this.screenRoot = d
                .fullScreen()
                .getScreenRoot("rcp-fe-lol-champ-select")),
              (this.champSelectHandlers = [
                {
                  show: this.champSelectShowHandler.bind(this),
                  hide: this.champSelectHideHandler.bind(this),
                  shouldShow: () => !0,
                },
              ]),
              g.addObserver(this.uxSettingsObserver),
              (this.gameflowBinding = h("/lol-gameflow", e.getSocket())),
              this.gameflowBinding.observe(
                "/v1/session",
                this,
                function (e) {
                  this._changePhase(e && e.phase);
                  const t = e && e.gameData;
                  (this._isCustomGame = t && e.gameData.isCustomGame),
                    (this._isClashGame =
                      t &&
                      e.gameData.queue &&
                      "CLASH" === e.gameData.queue.type);
                }.bind(this),
              ),
              (this.champSelectBinding = h("/lol-champ-select", e.getSocket())),
              this.champSelectBinding.observe(
                "/v1/session",
                this,
                function (e) {
                  this._champSelectSession = e;
                }.bind(this),
              );
            const n = d.getApiKey(
                "rcp-fe-lol-champ-select-skip - bump/release champ-select-skip",
              ),
              i = d
                .fullScreen()
                .getScreenRoot(n, "rcp-fe-lol-champ-select-skip");
            this._champSelectSkipApi = new r.default(i, this);
          }
          _handleVideoCache(e, t) {
            "Lobby" === e &&
              "Lobby" !== t &&
              this.largeAreaAnimationsEnabled &&
              (this.champSelectVideoCache.release(),
              b.forEach(
                function (e) {
                  this.champSelectVideoCache.cache(e);
                }.bind(this),
              ));
          }
          _changePhase(e) {
            (this.previousPhase = this.phase),
              (this.phase = e),
              e &&
                "None" !== e &&
                (this._perksPreloaded ||
                  ((this._perksPreloaded = !0),
                  (0, a.usePerksApi)((e) => e.preload()))),
              "Lobby" === e && this.preload(),
              "ChampSelect" === e && "ChampSelect" !== this.previousPhase
                ? this.show()
                : "ChampSelect" !== e &&
                  "ChampSelect" === this.previousPhase &&
                  this.hide(),
              this._handleVideoCache(e, this.previousPhase),
              !this.previousPhase ||
                (e && "None" !== e) ||
                this.champSelectVideoCache.release();
          }
          champSelectShowHandler() {
            return (
              (this.showPromise = this.showPromise
                .then(
                  function () {
                    return (
                      _.startTracingEvent("champ-select-init"),
                      this.preload(),
                      this.applicationDataPromise
                    );
                  }.bind(this),
                )
                .then(function (e) {
                  return e.emberAppInstancePromise;
                })
                .then(function (e) {
                  return S.afterRender(e.app);
                })
                .then(
                  function () {
                    this._isClashGame
                      ? this.appControls.addMessage(this._clashDodgeMessage)
                      : this._isCustomGame ||
                        this.appControls.addMessage(this._dodgeMessage),
                      this.screenRoot.bump(),
                      (this._isShown = !0),
                      _.endTracingEvent("champ-select-init"),
                      Promise.all([
                        this.gameflowBinding.get("/v1/session"),
                        this.champSelectBinding.get("/v1/session"),
                        h("/lol-summoner/v1/current-summoner").get(),
                        h("/lol-inventory/v2/inventory/WARD_SKIN").get(),
                        h("/lol-inventory/v2/inventory/CHAMPION").get(),
                      ]).then(([e, t, n, s, o]) => {
                        _.recordTracingStepEvent("UI_entered-champ-select");
                        if (!this.previousPhase) return;
                        const {
                            totalTimeInPhase: a,
                            phase: r,
                            adjustedTimeLeftInPhase: c,
                            internalNowInEpochMs: m,
                          } = t.timer,
                          {
                            isRanked: u,
                            id: p,
                            category: d,
                          } = e.gameData.queue,
                          h = u && r !== l.TIMER_PHASES.planning,
                          g = c - (Date.now() - m),
                          f = c - g >= 0.2 * c,
                          { accountId: S, puuid: b, summonerId: y } = n,
                          v = Array.isArray(s) ? s.length : 0,
                          x = Array.isArray(o)
                            ? o.filter((e) => e.owned).length
                            : 0,
                          k = JSON.stringify({
                            internalNowInEpochMs: m,
                            timeRemainingForPlayerInMS: g,
                            accountId: S,
                            puuid: b,
                            summonerId: y,
                            totalTimeInPhase: a,
                            phase: r,
                            queueId: p,
                            queueCategory: d,
                            adjustedTimeLeftInPhase: c,
                            isRanked: u,
                            previousPhase: this.previousPhase,
                            numOfOwnedWardSkins: v,
                            numOfOwnedChamps: x,
                          });
                        "GAME_STARTING" === r
                          ? (_.recordTracingStepEvent(
                              "UI_entered-champ-select-in-phase-game-starting",
                            ),
                            _.invokeWithLowProbability(function () {
                              i.captureEvent({
                                message:
                                  "entered-champ-select-in-phase-game-starting",
                              }),
                                _.sendEvent(
                                  "entered-champ-select-in-phase-game-starting",
                                  k,
                                ),
                                _.recordNonTimingTracingEvent(
                                  "entered-champ-select-in-phase-game-starting",
                                  1,
                                  "event",
                                );
                            }))
                          : "" === r
                            ? (_.recordTracingStepEvent(
                                "UI_entered-champ-select-in-phase-empty-string",
                              ),
                              _.invokeWithLowProbability(function () {
                                i.captureEvent({
                                  message:
                                    "entered-champ-select-in-phase-empty-string",
                                }),
                                  _.sendEvent(
                                    "entered-champ-select-in-phase-empty-string",
                                    k,
                                  ),
                                  _.recordNonTimingTracingEvent(
                                    "entered-champ-select-in-phase-empty-string",
                                    1,
                                    "event",
                                  );
                              }))
                            : h
                              ? (_.recordTracingStepEvent(
                                  "UI_entered-ranked-champ-select-after-initial-phase",
                                ),
                                _.invokeWithLowProbability(function () {
                                  i.captureEvent({
                                    message:
                                      "entered-ranked-champ-select-after-initial-phase",
                                  }),
                                    _.sendEvent(
                                      "entered-ranked-champ-select-after-initial-phase",
                                      k,
                                    ),
                                    _.recordNonTimingTracingEvent(
                                      "entered-ranked-champ-select-after-initial-phase",
                                      1,
                                      "event",
                                    );
                                }))
                              : f &&
                                (_.recordTracingStepEvent(
                                  "UI_entered-champ-select-late",
                                ),
                                _.invokeWithLowProbability(function () {
                                  i.captureEvent({
                                    message: "entered-champ-select-late",
                                  }),
                                    _.sendEvent("entered-champ-select-late", k),
                                    _.recordNonTimingTracingEvent(
                                      "entered-champ-select-late",
                                      1,
                                      "event",
                                    );
                                }));
                      });
                  }.bind(this),
                )),
              !0
            );
          }
          champSelectHideHandler() {
            return (this.showPromise = this.showPromise.then(() => {
              if (this._isShown)
                return (
                  this._isClashGame
                    ? this.appControls.removeMessage(this._clashDodgeMessage)
                    : this._isCustomGame ||
                      this.appControls.removeMessage(this._dodgeMessage),
                  this.screenRoot.release({ animate: !1 }).then(() => {
                    this._isShown = !1;
                  })
                );
            }));
          }
          show() {
            for (let e = this.champSelectHandlers.length - 1; e >= 0; e--) {
              if (
                this.champSelectHandlers[e].shouldShow(this._champSelectSession)
              ) {
                this.champSelectHandlers[e].show();
                break;
              }
            }
          }
          preload() {
            if (this.applicationDataPromise) return;
            const e = this.screenRoot.getElement(),
              t = (0, c.default)(e);
            (this.applicationDataPromise = Promise.resolve().then(function () {
              return t;
            })),
              h("/lol-summoner/v1/current-summoner").get(),
              h("/lol-inventory/v2/inventory/WARD_SKIN").get(),
              h("/lol-inventory/v2/inventory/CHAMPION").get();
            const n = t.renderPromise;
            p.getProvider()
              .get("rcp-fe-lol-lock-and-load")
              .lockAndLoad({
                promise: n,
                lockName: "rcp-fe-lol-champ-select:preload",
              });
          }
          hide() {
            for (let e = this.champSelectHandlers.length - 1; e >= 0; e--)
              this.champSelectHandlers[e].hide();
          }
          addEventListener(e, t) {
            this.screenRoot.on(e, t);
          }
          removeEventListener(e, t) {
            this.screenRoot.off(e, t);
          }
          unload() {
            this.applicationDataPromise &&
              (this.applicationDataPromise.then(
                function (e) {
                  this.screenRoot.getElement().removeChild(e.domNode),
                    Promise.all([
                      e.emberAppInstancePromise,
                      e.renderPromise,
                    ]).then(
                      function (e) {
                        e[0].app.destroy(),
                          (this.applicationDataPromise = void 0),
                          s.default.dispose();
                      }.bind(this),
                    );
                }.bind(this),
              ),
              g.removeObserver(this.uxSettingsObserver));
          }
          getElementSelector(e) {
            const t = ".champion-select ";
            switch (f.isString(e) ? e : e.name) {
              case "champion":
                return t + '.grid-champion[data-id="' + e.championId + '"]';
              case "champion-grid":
                return t + "lol-uikit-scrollable.champions";
              case "chat":
                return t + ".pregame-chat-box";
              case "configuration":
                return t + ".champion-config-container";
              case "lock-in":
                return t + ".lock-in";
              case "pick-phase":
                return t + ".pick-phase";
              case "main-container":
                return t + ".champion-select-main-container";
              case "skin-carousel":
                return t + ".skin-selection-carousel-container";
              case "summoner-party-array":
                return t + ".summoner-array.your-party .party";
              case "summoner-spell-container":
                return t + ".summoner-spell-container";
              case "timer-number":
                return t + ".timer";
            }
          }
          registerReplacementChampSelectHandler(e, t, n) {
            this.champSelectHandlers.push({ shouldShow: e, show: t, hide: n });
          }
          getElement(e) {
            return this.screenRoot
              .getElement()
              .querySelector(this.getElementSelector(e));
          }
          _isVisible() {
            return this._isShown;
          }
        })();
        t.default = y;
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            BrowserClient: () => s.BrowserClient,
            Hub: () => s.Hub,
            Integrations: () => u,
            SDK_NAME: () => s.SDK_NAME,
            SDK_VERSION: () => s.SDK_VERSION,
            Scope: () => s.Scope,
            Severity: () => s.Severity,
            Status: () => s.Status,
            Transports: () => l,
            addBreadcrumb: () => s.addBreadcrumb,
            addGlobalEventProcessor: () => s.addGlobalEventProcessor,
            captureEvent: () => s.captureEvent,
            captureException: () => s.captureException,
            captureMessage: () => s.captureMessage,
            close: () => s.close,
            configureScope: () => s.configureScope,
            defaultIntegrations: () => s.defaultIntegrations,
            eventFromException: () => s.eventFromException,
            eventFromMessage: () => s.eventFromMessage,
            flush: () => s.flush,
            forceLoad: () => s.forceLoad,
            getCurrentHub: () => s.getCurrentHub,
            getHubFromCarrier: () => s.getHubFromCarrier,
            init: () => s.init,
            injectReportDialog: () => s.injectReportDialog,
            lastEventId: () => s.lastEventId,
            makeMain: () => s.makeMain,
            onLoad: () => s.onLoad,
            setContext: () => s.setContext,
            setExtra: () => s.setExtra,
            setExtras: () => s.setExtras,
            setTag: () => s.setTag,
            setTags: () => s.setTags,
            setUser: () => s.setUser,
            showReportDialog: () => s.showReportDialog,
            startTransaction: () => s.startTransaction,
            withScope: () => s.withScope,
            wrap: () => s.wrap,
          });
        var i = n(8),
          s = n(4),
          o = n(55),
          a = n(11),
          r = n(56),
          l = n(57),
          c = {},
          m = (0, a.getGlobalObject)();
        m.Sentry && m.Sentry.Integrations && (c = m.Sentry.Integrations);
        var u = (0, i.__assign)((0, i.__assign)((0, i.__assign)({}, c), o), r);
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            BrowserClient: () => l.BrowserClient,
            Hub: () => r.Hub,
            SDK_NAME: () => p.SDK_NAME,
            SDK_VERSION: () => p.SDK_VERSION,
            Scope: () => o.Scope,
            Severity: () => i.Severity,
            Status: () => s.Status,
            addBreadcrumb: () => a.addBreadcrumb,
            addGlobalEventProcessor: () => o.addGlobalEventProcessor,
            captureEvent: () => a.captureEvent,
            captureException: () => a.captureException,
            captureMessage: () => a.captureMessage,
            close: () => u.close,
            configureScope: () => a.configureScope,
            defaultIntegrations: () => u.defaultIntegrations,
            eventFromException: () => m.eventFromException,
            eventFromMessage: () => m.eventFromMessage,
            flush: () => u.flush,
            forceLoad: () => u.forceLoad,
            getCurrentHub: () => r.getCurrentHub,
            getHubFromCarrier: () => r.getHubFromCarrier,
            init: () => u.init,
            injectReportDialog: () => c.injectReportDialog,
            lastEventId: () => u.lastEventId,
            makeMain: () => r.makeMain,
            onLoad: () => u.onLoad,
            setContext: () => a.setContext,
            setExtra: () => a.setExtra,
            setExtras: () => a.setExtras,
            setTag: () => a.setTag,
            setTags: () => a.setTags,
            setUser: () => a.setUser,
            showReportDialog: () => u.showReportDialog,
            startTransaction: () => a.startTransaction,
            withScope: () => a.withScope,
            wrap: () => u.wrap,
          });
        var i = n(5),
          s = n(6),
          o = n(7),
          a = n(19),
          r = n(20),
          l = n(24),
          c = n(41),
          m = n(26),
          u = n(47),
          p = n(42);
      },
      (e, t, n) => {
        "use strict";
        var i;
        n.r(t),
          n.d(t, { Severity: () => i }),
          (function (e) {
            (e.Fatal = "fatal"),
              (e.Error = "error"),
              (e.Warning = "warning"),
              (e.Log = "log"),
              (e.Info = "info"),
              (e.Debug = "debug"),
              (e.Critical = "critical");
          })(i || (i = {})),
          (function (e) {
            e.fromString = function (t) {
              switch (t) {
                case "debug":
                  return e.Debug;
                case "info":
                  return e.Info;
                case "warn":
                case "warning":
                  return e.Warning;
                case "error":
                  return e.Error;
                case "fatal":
                  return e.Fatal;
                case "critical":
                  return e.Critical;
                default:
                  return e.Log;
              }
            };
          })(i || (i = {}));
      },
      (e, t, n) => {
        "use strict";
        var i;
        n.r(t),
          n.d(t, { Status: () => i }),
          (function (e) {
            (e.Unknown = "unknown"),
              (e.Skipped = "skipped"),
              (e.Success = "success"),
              (e.RateLimit = "rate_limit"),
              (e.Invalid = "invalid"),
              (e.Failed = "failed");
          })(i || (i = {})),
          (function (e) {
            e.fromHttpCode = function (t) {
              return t >= 200 && t < 300
                ? e.Success
                : 429 === t
                  ? e.RateLimit
                  : t >= 400 && t < 500
                    ? e.Invalid
                    : t >= 500
                      ? e.Failed
                      : e.Unknown;
            };
          })(i || (i = {}));
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { Scope: () => l, addGlobalEventProcessor: () => m });
        var i = n(8),
          s = n(9),
          o = n(10),
          a = n(18),
          r = n(11),
          l = (function () {
            function e() {
              (this._notifyingListeners = !1),
                (this._scopeListeners = []),
                (this._eventProcessors = []),
                (this._breadcrumbs = []),
                (this._user = {}),
                (this._tags = {}),
                (this._extra = {}),
                (this._contexts = {});
            }
            return (
              (e.clone = function (t) {
                var n = new e();
                return (
                  t &&
                    ((n._breadcrumbs = (0, i.__spread)(t._breadcrumbs)),
                    (n._tags = (0, i.__assign)({}, t._tags)),
                    (n._extra = (0, i.__assign)({}, t._extra)),
                    (n._contexts = (0, i.__assign)({}, t._contexts)),
                    (n._user = t._user),
                    (n._level = t._level),
                    (n._span = t._span),
                    (n._session = t._session),
                    (n._transactionName = t._transactionName),
                    (n._fingerprint = t._fingerprint),
                    (n._eventProcessors = (0, i.__spread)(t._eventProcessors))),
                  n
                );
              }),
              (e.prototype.addScopeListener = function (e) {
                this._scopeListeners.push(e);
              }),
              (e.prototype.addEventProcessor = function (e) {
                return this._eventProcessors.push(e), this;
              }),
              (e.prototype.setUser = function (e) {
                return (
                  (this._user = e || {}),
                  this._session && this._session.update({ user: e }),
                  this._notifyScopeListeners(),
                  this
                );
              }),
              (e.prototype.getUser = function () {
                return this._user;
              }),
              (e.prototype.setTags = function (e) {
                return (
                  (this._tags = (0, i.__assign)(
                    (0, i.__assign)({}, this._tags),
                    e,
                  )),
                  this._notifyScopeListeners(),
                  this
                );
              }),
              (e.prototype.setTag = function (e, t) {
                var n;
                return (
                  (this._tags = (0, i.__assign)(
                    (0, i.__assign)({}, this._tags),
                    (((n = {})[e] = t), n),
                  )),
                  this._notifyScopeListeners(),
                  this
                );
              }),
              (e.prototype.setExtras = function (e) {
                return (
                  (this._extra = (0, i.__assign)(
                    (0, i.__assign)({}, this._extra),
                    e,
                  )),
                  this._notifyScopeListeners(),
                  this
                );
              }),
              (e.prototype.setExtra = function (e, t) {
                var n;
                return (
                  (this._extra = (0, i.__assign)(
                    (0, i.__assign)({}, this._extra),
                    (((n = {})[e] = t), n),
                  )),
                  this._notifyScopeListeners(),
                  this
                );
              }),
              (e.prototype.setFingerprint = function (e) {
                return (
                  (this._fingerprint = e), this._notifyScopeListeners(), this
                );
              }),
              (e.prototype.setLevel = function (e) {
                return (this._level = e), this._notifyScopeListeners(), this;
              }),
              (e.prototype.setTransactionName = function (e) {
                return (
                  (this._transactionName = e),
                  this._notifyScopeListeners(),
                  this
                );
              }),
              (e.prototype.setTransaction = function (e) {
                return this.setTransactionName(e);
              }),
              (e.prototype.setContext = function (e, t) {
                var n;
                return (
                  null === t
                    ? delete this._contexts[e]
                    : (this._contexts = (0, i.__assign)(
                        (0, i.__assign)({}, this._contexts),
                        (((n = {})[e] = t), n),
                      )),
                  this._notifyScopeListeners(),
                  this
                );
              }),
              (e.prototype.setSpan = function (e) {
                return (this._span = e), this._notifyScopeListeners(), this;
              }),
              (e.prototype.getSpan = function () {
                return this._span;
              }),
              (e.prototype.getTransaction = function () {
                var e,
                  t,
                  n,
                  i,
                  s = this.getSpan();
                return (
                  null === (e = s) || void 0 === e ? void 0 : e.transaction
                )
                  ? null === (t = s) || void 0 === t
                    ? void 0
                    : t.transaction
                  : (
                        null ===
                          (i =
                            null === (n = s) || void 0 === n
                              ? void 0
                              : n.spanRecorder) || void 0 === i
                          ? void 0
                          : i.spans[0]
                      )
                    ? s.spanRecorder.spans[0]
                    : void 0;
              }),
              (e.prototype.setSession = function (e) {
                return (
                  e ? (this._session = e) : delete this._session,
                  this._notifyScopeListeners(),
                  this
                );
              }),
              (e.prototype.getSession = function () {
                return this._session;
              }),
              (e.prototype.update = function (t) {
                if (!t) return this;
                if ("function" == typeof t) {
                  var n = t(this);
                  return n instanceof e ? n : this;
                }
                return (
                  t instanceof e
                    ? ((this._tags = (0, i.__assign)(
                        (0, i.__assign)({}, this._tags),
                        t._tags,
                      )),
                      (this._extra = (0, i.__assign)(
                        (0, i.__assign)({}, this._extra),
                        t._extra,
                      )),
                      (this._contexts = (0, i.__assign)(
                        (0, i.__assign)({}, this._contexts),
                        t._contexts,
                      )),
                      t._user &&
                        Object.keys(t._user).length &&
                        (this._user = t._user),
                      t._level && (this._level = t._level),
                      t._fingerprint && (this._fingerprint = t._fingerprint))
                    : (0, s.isPlainObject)(t) &&
                      ((this._tags = (0, i.__assign)(
                        (0, i.__assign)({}, this._tags),
                        t.tags,
                      )),
                      (this._extra = (0, i.__assign)(
                        (0, i.__assign)({}, this._extra),
                        t.extra,
                      )),
                      (this._contexts = (0, i.__assign)(
                        (0, i.__assign)({}, this._contexts),
                        t.contexts,
                      )),
                      t.user && (this._user = t.user),
                      t.level && (this._level = t.level),
                      t.fingerprint && (this._fingerprint = t.fingerprint)),
                  this
                );
              }),
              (e.prototype.clear = function () {
                return (
                  (this._breadcrumbs = []),
                  (this._tags = {}),
                  (this._extra = {}),
                  (this._user = {}),
                  (this._contexts = {}),
                  (this._level = void 0),
                  (this._transactionName = void 0),
                  (this._fingerprint = void 0),
                  (this._span = void 0),
                  (this._session = void 0),
                  this._notifyScopeListeners(),
                  this
                );
              }),
              (e.prototype.addBreadcrumb = function (e, t) {
                var n = (0, i.__assign)(
                  { timestamp: (0, o.dateTimestampInSeconds)() },
                  e,
                );
                return (
                  (this._breadcrumbs =
                    void 0 !== t && t >= 0
                      ? (0, i.__spread)(this._breadcrumbs, [n]).slice(-t)
                      : (0, i.__spread)(this._breadcrumbs, [n])),
                  this._notifyScopeListeners(),
                  this
                );
              }),
              (e.prototype.clearBreadcrumbs = function () {
                return (
                  (this._breadcrumbs = []), this._notifyScopeListeners(), this
                );
              }),
              (e.prototype.applyToEvent = function (e, t) {
                var n;
                if (
                  (this._extra &&
                    Object.keys(this._extra).length &&
                    (e.extra = (0, i.__assign)(
                      (0, i.__assign)({}, this._extra),
                      e.extra,
                    )),
                  this._tags &&
                    Object.keys(this._tags).length &&
                    (e.tags = (0, i.__assign)(
                      (0, i.__assign)({}, this._tags),
                      e.tags,
                    )),
                  this._user &&
                    Object.keys(this._user).length &&
                    (e.user = (0, i.__assign)(
                      (0, i.__assign)({}, this._user),
                      e.user,
                    )),
                  this._contexts &&
                    Object.keys(this._contexts).length &&
                    (e.contexts = (0, i.__assign)(
                      (0, i.__assign)({}, this._contexts),
                      e.contexts,
                    )),
                  this._level && (e.level = this._level),
                  this._transactionName &&
                    (e.transaction = this._transactionName),
                  this._span)
                ) {
                  e.contexts = (0, i.__assign)(
                    { trace: this._span.getTraceContext() },
                    e.contexts,
                  );
                  var s =
                    null === (n = this._span.transaction) || void 0 === n
                      ? void 0
                      : n.name;
                  s && (e.tags = (0, i.__assign)({ transaction: s }, e.tags));
                }
                return (
                  this._applyFingerprint(e),
                  (e.breadcrumbs = (0, i.__spread)(
                    e.breadcrumbs || [],
                    this._breadcrumbs,
                  )),
                  (e.breadcrumbs =
                    e.breadcrumbs.length > 0 ? e.breadcrumbs : void 0),
                  this._notifyEventProcessors(
                    (0, i.__spread)(c(), this._eventProcessors),
                    e,
                    t,
                  )
                );
              }),
              (e.prototype._notifyEventProcessors = function (e, t, n, o) {
                var r = this;
                return (
                  void 0 === o && (o = 0),
                  new a.SyncPromise(function (a, l) {
                    var c = e[o];
                    if (null === t || "function" != typeof c) a(t);
                    else {
                      var m = c((0, i.__assign)({}, t), n);
                      (0, s.isThenable)(m)
                        ? m
                            .then(function (t) {
                              return r
                                ._notifyEventProcessors(e, t, n, o + 1)
                                .then(a);
                            })
                            .then(null, l)
                        : r
                            ._notifyEventProcessors(e, m, n, o + 1)
                            .then(a)
                            .then(null, l);
                    }
                  })
                );
              }),
              (e.prototype._notifyScopeListeners = function () {
                var e = this;
                this._notifyingListeners ||
                  ((this._notifyingListeners = !0),
                  this._scopeListeners.forEach(function (t) {
                    t(e);
                  }),
                  (this._notifyingListeners = !1));
              }),
              (e.prototype._applyFingerprint = function (e) {
                (e.fingerprint = e.fingerprint
                  ? Array.isArray(e.fingerprint)
                    ? e.fingerprint
                    : [e.fingerprint]
                  : []),
                  this._fingerprint &&
                    (e.fingerprint = e.fingerprint.concat(this._fingerprint)),
                  e.fingerprint &&
                    !e.fingerprint.length &&
                    delete e.fingerprint;
              }),
              e
            );
          })();
        function c() {
          var e = (0, r.getGlobalObject)();
          return (
            (e.__SENTRY__ = e.__SENTRY__ || {}),
            (e.__SENTRY__.globalEventProcessors =
              e.__SENTRY__.globalEventProcessors || []),
            e.__SENTRY__.globalEventProcessors
          );
        }
        function m(e) {
          c().push(e);
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            __assign: () => o,
            __asyncDelegator: () => y,
            __asyncGenerator: () => b,
            __asyncValues: () => v,
            __await: () => _,
            __awaiter: () => m,
            __classPrivateFieldGet: () => T,
            __classPrivateFieldSet: () => w,
            __createBinding: () => p,
            __decorate: () => r,
            __exportStar: () => d,
            __extends: () => s,
            __generator: () => u,
            __importDefault: () => E,
            __importStar: () => k,
            __makeTemplateObject: () => x,
            __metadata: () => c,
            __param: () => l,
            __read: () => g,
            __rest: () => a,
            __spread: () => f,
            __spreadArrays: () => S,
            __values: () => h,
          });
        var i = function (e, t) {
          return (
            (i =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
              }),
            i(e, t)
          );
        };
        function s(e, t) {
          function n() {
            this.constructor = e;
          }
          i(e, t),
            (e.prototype =
              null === t
                ? Object.create(t)
                : ((n.prototype = t.prototype), new n()));
        }
        var o = function () {
          return (
            (o =
              Object.assign ||
              function (e) {
                for (var t, n = 1, i = arguments.length; n < i; n++)
                  for (var s in (t = arguments[n]))
                    Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
                return e;
              }),
            o.apply(this, arguments)
          );
        };
        function a(e, t) {
          var n = {};
          for (var i in e)
            Object.prototype.hasOwnProperty.call(e, i) &&
              t.indexOf(i) < 0 &&
              (n[i] = e[i]);
          if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var s = 0;
            for (i = Object.getOwnPropertySymbols(e); s < i.length; s++)
              t.indexOf(i[s]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, i[s]) &&
                (n[i[s]] = e[i[s]]);
          }
          return n;
        }
        function r(e, t, n, i) {
          var s,
            o = arguments.length,
            a =
              o < 3
                ? t
                : null === i
                  ? (i = Object.getOwnPropertyDescriptor(t, n))
                  : i;
          if (
            "object" == typeof Reflect &&
            "function" == typeof Reflect.decorate
          )
            a = Reflect.decorate(e, t, n, i);
          else
            for (var r = e.length - 1; r >= 0; r--)
              (s = e[r]) &&
                (a = (o < 3 ? s(a) : o > 3 ? s(t, n, a) : s(t, n)) || a);
          return o > 3 && a && Object.defineProperty(t, n, a), a;
        }
        function l(e, t) {
          return function (n, i) {
            t(n, i, e);
          };
        }
        function c(e, t) {
          if (
            "object" == typeof Reflect &&
            "function" == typeof Reflect.metadata
          )
            return Reflect.metadata(e, t);
        }
        function m(e, t, n, i) {
          return new (n || (n = Promise))(function (s, o) {
            function a(e) {
              try {
                l(i.next(e));
              } catch (e) {
                o(e);
              }
            }
            function r(e) {
              try {
                l(i.throw(e));
              } catch (e) {
                o(e);
              }
            }
            function l(e) {
              var t;
              e.done
                ? s(e.value)
                : ((t = e.value),
                  t instanceof n
                    ? t
                    : new n(function (e) {
                        e(t);
                      })).then(a, r);
            }
            l((i = i.apply(e, t || [])).next());
          });
        }
        function u(e, t) {
          var n,
            i,
            s,
            o,
            a = {
              label: 0,
              sent: function () {
                if (1 & s[0]) throw s[1];
                return s[1];
              },
              trys: [],
              ops: [],
            };
          return (
            (o = { next: r(0), throw: r(1), return: r(2) }),
            "function" == typeof Symbol &&
              (o[Symbol.iterator] = function () {
                return this;
              }),
            o
          );
          function r(o) {
            return function (r) {
              return (function (o) {
                if (n) throw new TypeError("Generator is already executing.");
                for (; a; )
                  try {
                    if (
                      ((n = 1),
                      i &&
                        (s =
                          2 & o[0]
                            ? i.return
                            : o[0]
                              ? i.throw || ((s = i.return) && s.call(i), 0)
                              : i.next) &&
                        !(s = s.call(i, o[1])).done)
                    )
                      return s;
                    switch (((i = 0), s && (o = [2 & o[0], s.value]), o[0])) {
                      case 0:
                      case 1:
                        s = o;
                        break;
                      case 4:
                        return a.label++, { value: o[1], done: !1 };
                      case 5:
                        a.label++, (i = o[1]), (o = [0]);
                        continue;
                      case 7:
                        (o = a.ops.pop()), a.trys.pop();
                        continue;
                      default:
                        if (
                          !((s = a.trys),
                          (s = s.length > 0 && s[s.length - 1]) ||
                            (6 !== o[0] && 2 !== o[0]))
                        ) {
                          a = 0;
                          continue;
                        }
                        if (
                          3 === o[0] &&
                          (!s || (o[1] > s[0] && o[1] < s[3]))
                        ) {
                          a.label = o[1];
                          break;
                        }
                        if (6 === o[0] && a.label < s[1]) {
                          (a.label = s[1]), (s = o);
                          break;
                        }
                        if (s && a.label < s[2]) {
                          (a.label = s[2]), a.ops.push(o);
                          break;
                        }
                        s[2] && a.ops.pop(), a.trys.pop();
                        continue;
                    }
                    o = t.call(e, a);
                  } catch (e) {
                    (o = [6, e]), (i = 0);
                  } finally {
                    n = s = 0;
                  }
                if (5 & o[0]) throw o[1];
                return { value: o[0] ? o[1] : void 0, done: !0 };
              })([o, r]);
            };
          }
        }
        function p(e, t, n, i) {
          void 0 === i && (i = n), (e[i] = t[n]);
        }
        function d(e, t) {
          for (var n in e)
            "default" === n || t.hasOwnProperty(n) || (t[n] = e[n]);
        }
        function h(e) {
          var t = "function" == typeof Symbol && Symbol.iterator,
            n = t && e[t],
            i = 0;
          if (n) return n.call(e);
          if (e && "number" == typeof e.length)
            return {
              next: function () {
                return (
                  e && i >= e.length && (e = void 0),
                  { value: e && e[i++], done: !e }
                );
              },
            };
          throw new TypeError(
            t ? "Object is not iterable." : "Symbol.iterator is not defined.",
          );
        }
        function g(e, t) {
          var n = "function" == typeof Symbol && e[Symbol.iterator];
          if (!n) return e;
          var i,
            s,
            o = n.call(e),
            a = [];
          try {
            for (; (void 0 === t || t-- > 0) && !(i = o.next()).done; )
              a.push(i.value);
          } catch (e) {
            s = { error: e };
          } finally {
            try {
              i && !i.done && (n = o.return) && n.call(o);
            } finally {
              if (s) throw s.error;
            }
          }
          return a;
        }
        function f() {
          for (var e = [], t = 0; t < arguments.length; t++)
            e = e.concat(g(arguments[t]));
          return e;
        }
        function S() {
          for (var e = 0, t = 0, n = arguments.length; t < n; t++)
            e += arguments[t].length;
          var i = Array(e),
            s = 0;
          for (t = 0; t < n; t++)
            for (var o = arguments[t], a = 0, r = o.length; a < r; a++, s++)
              i[s] = o[a];
          return i;
        }
        function _(e) {
          return this instanceof _ ? ((this.v = e), this) : new _(e);
        }
        function b(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var i,
            s = n.apply(e, t || []),
            o = [];
          return (
            (i = {}),
            a("next"),
            a("throw"),
            a("return"),
            (i[Symbol.asyncIterator] = function () {
              return this;
            }),
            i
          );
          function a(e) {
            s[e] &&
              (i[e] = function (t) {
                return new Promise(function (n, i) {
                  o.push([e, t, n, i]) > 1 || r(e, t);
                });
              });
          }
          function r(e, t) {
            try {
              (n = s[e](t)).value instanceof _
                ? Promise.resolve(n.value.v).then(l, c)
                : m(o[0][2], n);
            } catch (e) {
              m(o[0][3], e);
            }
            var n;
          }
          function l(e) {
            r("next", e);
          }
          function c(e) {
            r("throw", e);
          }
          function m(e, t) {
            e(t), o.shift(), o.length && r(o[0][0], o[0][1]);
          }
        }
        function y(e) {
          var t, n;
          return (
            (t = {}),
            i("next"),
            i("throw", function (e) {
              throw e;
            }),
            i("return"),
            (t[Symbol.iterator] = function () {
              return this;
            }),
            t
          );
          function i(i, s) {
            t[i] = e[i]
              ? function (t) {
                  return (n = !n)
                    ? { value: _(e[i](t)), done: "return" === i }
                    : s
                      ? s(t)
                      : t;
                }
              : s;
          }
        }
        function v(e) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var t,
            n = e[Symbol.asyncIterator];
          return n
            ? n.call(e)
            : ((e = h(e)),
              (t = {}),
              i("next"),
              i("throw"),
              i("return"),
              (t[Symbol.asyncIterator] = function () {
                return this;
              }),
              t);
          function i(n) {
            t[n] =
              e[n] &&
              function (t) {
                return new Promise(function (i, s) {
                  (function (e, t, n, i) {
                    Promise.resolve(i).then(function (t) {
                      e({ value: t, done: n });
                    }, t);
                  })(i, s, (t = e[n](t)).done, t.value);
                });
              };
          }
        }
        function x(e, t) {
          return (
            Object.defineProperty
              ? Object.defineProperty(e, "raw", { value: t })
              : (e.raw = t),
            e
          );
        }
        function k(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          return (t.default = e), t;
        }
        function E(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function T(e, t) {
          if (!t.has(e))
            throw new TypeError(
              "attempted to get private field on non-instance",
            );
          return t.get(e);
        }
        function w(e, t, n) {
          if (!t.has(e))
            throw new TypeError(
              "attempted to set private field on non-instance",
            );
          return t.set(e, n), n;
        }
      },
      (e, t, n) => {
        "use strict";
        function i(e) {
          switch (Object.prototype.toString.call(e)) {
            case "[object Error]":
            case "[object Exception]":
            case "[object DOMException]":
              return !0;
            default:
              return g(e, Error);
          }
        }
        function s(e) {
          return "[object ErrorEvent]" === Object.prototype.toString.call(e);
        }
        function o(e) {
          return "[object DOMError]" === Object.prototype.toString.call(e);
        }
        function a(e) {
          return "[object DOMException]" === Object.prototype.toString.call(e);
        }
        function r(e) {
          return "[object String]" === Object.prototype.toString.call(e);
        }
        function l(e) {
          return null === e || ("object" != typeof e && "function" != typeof e);
        }
        function c(e) {
          return "[object Object]" === Object.prototype.toString.call(e);
        }
        function m(e) {
          return "undefined" != typeof Event && g(e, Event);
        }
        function u(e) {
          return "undefined" != typeof Element && g(e, Element);
        }
        function p(e) {
          return "[object RegExp]" === Object.prototype.toString.call(e);
        }
        function d(e) {
          return Boolean(e && e.then && "function" == typeof e.then);
        }
        function h(e) {
          return (
            c(e) &&
            "nativeEvent" in e &&
            "preventDefault" in e &&
            "stopPropagation" in e
          );
        }
        function g(e, t) {
          try {
            return e instanceof t;
          } catch (e) {
            return !1;
          }
        }
        n.r(t),
          n.d(t, {
            isDOMError: () => o,
            isDOMException: () => a,
            isElement: () => u,
            isError: () => i,
            isErrorEvent: () => s,
            isEvent: () => m,
            isInstanceOf: () => g,
            isPlainObject: () => c,
            isPrimitive: () => l,
            isRegExp: () => p,
            isString: () => r,
            isSyntheticEvent: () => h,
            isThenable: () => d,
          });
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            browserPerformanceTimeOrigin: () => p,
            dateTimestampInSeconds: () => l,
            timestampInSeconds: () => c,
            timestampWithMs: () => m,
            usingPerformanceAPI: () => u,
          });
        var i = n(11),
          s = n(12);
        e = n.hmd(e);
        var o = {
          nowSeconds: function () {
            return Date.now() / 1e3;
          },
        };
        var a = (0, s.isNodeEnv)()
            ? (function () {
                try {
                  return (0, s.dynamicRequire)(e, "perf_hooks").performance;
                } catch (e) {
                  return;
                }
              })()
            : (function () {
                var e = (0, i.getGlobalObject)().performance;
                if (e && e.now)
                  return {
                    now: function () {
                      return e.now();
                    },
                    timeOrigin: Date.now() - e.now(),
                  };
              })(),
          r =
            void 0 === a
              ? o
              : {
                  nowSeconds: function () {
                    return (a.timeOrigin + a.now()) / 1e3;
                  },
                },
          l = o.nowSeconds.bind(o),
          c = r.nowSeconds.bind(r),
          m = c,
          u = void 0 !== a,
          p = (function () {
            var e = (0, i.getGlobalObject)().performance;
            if (e)
              return e.timeOrigin
                ? e.timeOrigin
                : (e.timing && e.timing.navigationStart) || Date.now();
          })();
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            addContextToFrame: () => _,
            addExceptionMechanism: () => p,
            addExceptionTypeValue: () => u,
            consoleSandbox: () => m,
            getEventDescription: () => c,
            getGlobalObject: () => a,
            getLocationHref: () => d,
            parseRetryAfterHeader: () => S,
            parseSemver: () => g,
            parseUrl: () => l,
            stripUrlQueryAndFragment: () => b,
            uuid4: () => r,
          });
        var i = n(12),
          s = n(17),
          o = {};
        function a() {
          return (0, i.isNodeEnv)()
            ? n.g
            : "undefined" != typeof window
              ? window
              : "undefined" != typeof self
                ? self
                : o;
        }
        function r() {
          var e = a(),
            t = e.crypto || e.msCrypto;
          if (void 0 !== t && t.getRandomValues) {
            var n = new Uint16Array(8);
            t.getRandomValues(n),
              (n[3] = (4095 & n[3]) | 16384),
              (n[4] = (16383 & n[4]) | 32768);
            var i = function (e) {
              for (var t = e.toString(16); t.length < 4; ) t = "0" + t;
              return t;
            };
            return (
              i(n[0]) +
              i(n[1]) +
              i(n[2]) +
              i(n[3]) +
              i(n[4]) +
              i(n[5]) +
              i(n[6]) +
              i(n[7])
            );
          }
          return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(
            /[xy]/g,
            function (e) {
              var t = (16 * Math.random()) | 0;
              return ("x" === e ? t : (3 & t) | 8).toString(16);
            },
          );
        }
        function l(e) {
          if (!e) return {};
          var t = e.match(
            /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/,
          );
          if (!t) return {};
          var n = t[6] || "",
            i = t[8] || "";
          return {
            host: t[4],
            path: t[5],
            protocol: t[2],
            relative: t[5] + n + i,
          };
        }
        function c(e) {
          if (e.message) return e.message;
          if (e.exception && e.exception.values && e.exception.values[0]) {
            var t = e.exception.values[0];
            return t.type && t.value
              ? t.type + ": " + t.value
              : t.type || t.value || e.event_id || "<unknown>";
          }
          return e.event_id || "<unknown>";
        }
        function m(e) {
          var t = a();
          if (!("console" in t)) return e();
          var n = t.console,
            i = {};
          ["debug", "info", "warn", "error", "log", "assert"].forEach(
            function (e) {
              e in t.console &&
                n[e].__sentry_original__ &&
                ((i[e] = n[e]), (n[e] = n[e].__sentry_original__));
            },
          );
          var s = e();
          return (
            Object.keys(i).forEach(function (e) {
              n[e] = i[e];
            }),
            s
          );
        }
        function u(e, t, n) {
          (e.exception = e.exception || {}),
            (e.exception.values = e.exception.values || []),
            (e.exception.values[0] = e.exception.values[0] || {}),
            (e.exception.values[0].value =
              e.exception.values[0].value || t || ""),
            (e.exception.values[0].type =
              e.exception.values[0].type || n || "Error");
        }
        function p(e, t) {
          void 0 === t && (t = {});
          try {
            (e.exception.values[0].mechanism =
              e.exception.values[0].mechanism || {}),
              Object.keys(t).forEach(function (n) {
                e.exception.values[0].mechanism[n] = t[n];
              });
          } catch (e) {}
        }
        function d() {
          try {
            return document.location.href;
          } catch (e) {
            return "";
          }
        }
        var h =
          /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
        function g(e) {
          var t = e.match(h) || [],
            n = parseInt(t[1], 10),
            i = parseInt(t[2], 10),
            s = parseInt(t[3], 10);
          return {
            buildmetadata: t[5],
            major: isNaN(n) ? void 0 : n,
            minor: isNaN(i) ? void 0 : i,
            patch: isNaN(s) ? void 0 : s,
            prerelease: t[4],
          };
        }
        var f = 6e4;
        function S(e, t) {
          if (!t) return f;
          var n = parseInt("" + t, 10);
          if (!isNaN(n)) return 1e3 * n;
          var i = Date.parse("" + t);
          return isNaN(i) ? f : i - e;
        }
        function _(e, t, n) {
          void 0 === n && (n = 5);
          var i = t.lineno || 0,
            o = e.length,
            a = Math.max(Math.min(o, i - 1), 0);
          (t.pre_context = e.slice(Math.max(0, a - n), a).map(function (e) {
            return (0, s.snipLine)(e, 0);
          })),
            (t.context_line = (0, s.snipLine)(
              e[Math.min(o - 1, a)],
              t.colno || 0,
            )),
            (t.post_context = e
              .slice(Math.min(a + 1, o), a + 1 + n)
              .map(function (e) {
                return (0, s.snipLine)(e, 0);
              }));
        }
        function b(e) {
          return e.split(/[\?#]/, 1)[0];
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            dynamicRequire: () => a,
            extractNodeRequestData: () => l,
            isNodeEnv: () => o,
          });
        var i = n(9),
          s = n(13);
        function o() {
          return (
            "[object process]" ===
            Object.prototype.toString.call(
              "undefined" != typeof process ? process : 0,
            )
          );
        }
        function a(e, t) {
          return e.require(t);
        }
        e = n.hmd(e);
        var r = ["cookies", "data", "headers", "method", "query_string", "url"];
        function l(t, n) {
          if ((void 0 === n && (n = r), !o()))
            throw new Error(
              "Can't get node request data outside of a node environment",
            );
          var l = {},
            c = t.headers || t.header || {},
            m = t.method,
            u = t.hostname || t.host || c.host || "<no host>",
            p =
              "https" === t.protocol || t.secure || (t.socket || {}).encrypted
                ? "https"
                : "http",
            d = t.originalUrl || t.url || "",
            h = p + "://" + u + d;
          return (
            n.forEach(function (n) {
              switch (n) {
                case "headers":
                  l.headers = c;
                  break;
                case "method":
                  l.method = m;
                  break;
                case "url":
                  l.url = h;
                  break;
                case "cookies":
                  l.cookies = t.cookies || a(e, "cookie").parse(c.cookie || "");
                  break;
                case "query_string":
                  l.query_string = a(e, "url").parse(d || "", !1).query;
                  break;
                case "data":
                  if ("GET" === m || "HEAD" === m) break;
                  void 0 !== t.body &&
                    (l.data = (0, i.isString)(t.body)
                      ? t.body
                      : JSON.stringify((0, s.normalize)(t.body)));
                  break;
                default:
                  ({}).hasOwnProperty.call(t, n) && (l[n] = t[n]);
              }
            }),
            l
          );
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            dropUndefinedKeys: () => _,
            extractExceptionKeysForMessage: () => S,
            fill: () => c,
            normalize: () => f,
            normalizeToSize: () => d,
            urlEncode: () => m,
            walk: () => g,
          });
        var i = n(8),
          s = n(14),
          o = n(9),
          a = n(16),
          r = n(15),
          l = n(17);
        function c(e, t, n) {
          if (t in e) {
            var i = e[t],
              s = n(i);
            if ("function" == typeof s)
              try {
                (s.prototype = s.prototype || {}),
                  Object.defineProperties(s, {
                    __sentry_original__: { enumerable: !1, value: i },
                  });
              } catch (e) {}
            e[t] = s;
          }
        }
        function m(e) {
          return Object.keys(e)
            .map(function (t) {
              return encodeURIComponent(t) + "=" + encodeURIComponent(e[t]);
            })
            .join("&");
        }
        function u(e) {
          if ((0, o.isError)(e)) {
            var t = e,
              n = { message: t.message, name: t.name, stack: t.stack };
            for (var i in t)
              Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i]);
            return n;
          }
          if ((0, o.isEvent)(e)) {
            var a = e,
              r = {};
            r.type = a.type;
            try {
              r.target = (0, o.isElement)(a.target)
                ? (0, s.htmlTreeAsString)(a.target)
                : Object.prototype.toString.call(a.target);
            } catch (e) {
              r.target = "<unknown>";
            }
            try {
              r.currentTarget = (0, o.isElement)(a.currentTarget)
                ? (0, s.htmlTreeAsString)(a.currentTarget)
                : Object.prototype.toString.call(a.currentTarget);
            } catch (e) {
              r.currentTarget = "<unknown>";
            }
            for (var i in ("undefined" != typeof CustomEvent &&
              (0, o.isInstanceOf)(e, CustomEvent) &&
              (r.detail = a.detail),
            a))
              Object.prototype.hasOwnProperty.call(a, i) && (r[i] = a);
            return r;
          }
          return e;
        }
        function p(e) {
          return (function (e) {
            return ~-encodeURI(e).split(/%..|./).length;
          })(JSON.stringify(e));
        }
        function d(e, t, n) {
          void 0 === t && (t = 3), void 0 === n && (n = 102400);
          var i = f(e, t);
          return p(i) > n ? d(e, t - 1, n) : i;
        }
        function h(e, t) {
          return "domain" === t && e && "object" == typeof e && e._events
            ? "[Domain]"
            : "domainEmitter" === t
              ? "[DomainEmitter]"
              : void 0 !== n.g && e === n.g
                ? "[Global]"
                : "undefined" != typeof window && e === window
                  ? "[Window]"
                  : "undefined" != typeof document && e === document
                    ? "[Document]"
                    : (0, o.isSyntheticEvent)(e)
                      ? "[SyntheticEvent]"
                      : "number" == typeof e && e != e
                        ? "[NaN]"
                        : void 0 === e
                          ? "[undefined]"
                          : "function" == typeof e
                            ? "[Function: " + (0, r.getFunctionName)(e) + "]"
                            : "symbol" == typeof e
                              ? "[" + String(e) + "]"
                              : "bigint" == typeof e
                                ? "[BigInt: " + String(e) + "]"
                                : e;
        }
        function g(e, t, n, i) {
          if (
            (void 0 === n && (n = 1 / 0),
            void 0 === i && (i = new a.Memo()),
            0 === n)
          )
            return (function (e) {
              var t = Object.prototype.toString.call(e);
              if ("string" == typeof e) return e;
              if ("[object Object]" === t) return "[Object]";
              if ("[object Array]" === t) return "[Array]";
              var n = h(e);
              return (0, o.isPrimitive)(n) ? n : t;
            })(t);
          if (null != t && "function" == typeof t.toJSON) return t.toJSON();
          var s = h(t, e);
          if ((0, o.isPrimitive)(s)) return s;
          var r = u(t),
            l = Array.isArray(t) ? [] : {};
          if (i.memoize(t)) return "[Circular ~]";
          for (var c in r)
            Object.prototype.hasOwnProperty.call(r, c) &&
              (l[c] = g(c, r[c], n - 1, i));
          return i.unmemoize(t), l;
        }
        function f(e, t) {
          try {
            return JSON.parse(
              JSON.stringify(e, function (e, n) {
                return g(e, n, t);
              }),
            );
          } catch (e) {
            return "**non-serializable**";
          }
        }
        function S(e, t) {
          void 0 === t && (t = 40);
          var n = Object.keys(u(e));
          if ((n.sort(), !n.length)) return "[object has no keys]";
          if (n[0].length >= t) return (0, l.truncate)(n[0], t);
          for (var i = n.length; i > 0; i--) {
            var s = n.slice(0, i).join(", ");
            if (!(s.length > t))
              return i === n.length ? s : (0, l.truncate)(s, t);
          }
          return "";
        }
        function _(e) {
          var t, n;
          if ((0, o.isPlainObject)(e)) {
            var s = e,
              a = {};
            try {
              for (
                var r = (0, i.__values)(Object.keys(s)), l = r.next();
                !l.done;
                l = r.next()
              ) {
                var c = l.value;
                void 0 !== s[c] && (a[c] = _(s[c]));
              }
            } catch (e) {
              t = { error: e };
            } finally {
              try {
                l && !l.done && (n = r.return) && n.call(r);
              } finally {
                if (t) throw t.error;
              }
            }
            return a;
          }
          return Array.isArray(e) ? e.map(_) : e;
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { htmlTreeAsString: () => s });
        var i = n(9);
        function s(e) {
          try {
            for (
              var t = e, n = [], i = 0, s = 0, a = void 0;
              t &&
              i++ < 5 &&
              !(
                "html" === (a = o(t)) ||
                (i > 1 && s + 3 * n.length + a.length >= 80)
              );

            )
              n.push(a), (s += a.length), (t = t.parentNode);
            return n.reverse().join(" > ");
          } catch (e) {
            return "<unknown>";
          }
        }
        function o(e) {
          var t,
            n,
            s,
            o,
            a,
            r = e,
            l = [];
          if (!r || !r.tagName) return "";
          if (
            (l.push(r.tagName.toLowerCase()),
            r.id && l.push("#" + r.id),
            (t = r.className) && (0, i.isString)(t))
          )
            for (n = t.split(/\s+/), a = 0; a < n.length; a++)
              l.push("." + n[a]);
          var c = ["type", "name", "title", "alt"];
          for (a = 0; a < c.length; a++)
            (s = c[a]),
              (o = r.getAttribute(s)) && l.push("[" + s + '="' + o + '"]');
          return l.join("");
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { getFunctionName: () => s });
        var i = "<anonymous>";
        function s(e) {
          try {
            return (e && "function" == typeof e && e.name) || i;
          } catch (e) {
            return i;
          }
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { Memo: () => i });
        var i = (function () {
          function e() {
            (this._hasWeakSet = "function" == typeof WeakSet),
              (this._inner = this._hasWeakSet ? new WeakSet() : []);
          }
          return (
            (e.prototype.memoize = function (e) {
              if (this._hasWeakSet)
                return !!this._inner.has(e) || (this._inner.add(e), !1);
              for (var t = 0; t < this._inner.length; t++) {
                if (this._inner[t] === e) return !0;
              }
              return this._inner.push(e), !1;
            }),
            (e.prototype.unmemoize = function (e) {
              if (this._hasWeakSet) this._inner.delete(e);
              else
                for (var t = 0; t < this._inner.length; t++)
                  if (this._inner[t] === e) {
                    this._inner.splice(t, 1);
                    break;
                  }
            }),
            e
          );
        })();
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            isMatchingPattern: () => r,
            safeJoin: () => a,
            snipLine: () => o,
            truncate: () => s,
          });
        var i = n(9);
        function s(e, t) {
          return (
            void 0 === t && (t = 0),
            "string" != typeof e || 0 === t || e.length <= t
              ? e
              : e.substr(0, t) + "..."
          );
        }
        function o(e, t) {
          var n = e,
            i = n.length;
          if (i <= 150) return n;
          t > i && (t = i);
          var s = Math.max(t - 60, 0);
          s < 5 && (s = 0);
          var o = Math.min(s + 140, i);
          return (
            o > i - 5 && (o = i),
            o === i && (s = Math.max(o - 140, 0)),
            (n = n.slice(s, o)),
            s > 0 && (n = "'{snip} " + n),
            o < i && (n += " {snip}"),
            n
          );
        }
        function a(e, t) {
          if (!Array.isArray(e)) return "";
          for (var n = [], i = 0; i < e.length; i++) {
            var s = e[i];
            try {
              n.push(String(s));
            } catch (e) {
              n.push("[value cannot be serialized]");
            }
          }
          return n.join(t);
        }
        function r(e, t) {
          return (
            !!(0, i.isString)(e) &&
            ((0, i.isRegExp)(t)
              ? t.test(e)
              : "string" == typeof t && -1 !== e.indexOf(t))
          );
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { SyncPromise: () => o });
        var i,
          s = n(9);
        !(function (e) {
          (e.PENDING = "PENDING"),
            (e.RESOLVED = "RESOLVED"),
            (e.REJECTED = "REJECTED");
        })(i || (i = {}));
        var o = (function () {
          function e(e) {
            var t = this;
            (this._state = i.PENDING),
              (this._handlers = []),
              (this._resolve = function (e) {
                t._setResult(i.RESOLVED, e);
              }),
              (this._reject = function (e) {
                t._setResult(i.REJECTED, e);
              }),
              (this._setResult = function (e, n) {
                t._state === i.PENDING &&
                  ((0, s.isThenable)(n)
                    ? n.then(t._resolve, t._reject)
                    : ((t._state = e), (t._value = n), t._executeHandlers()));
              }),
              (this._attachHandler = function (e) {
                (t._handlers = t._handlers.concat(e)), t._executeHandlers();
              }),
              (this._executeHandlers = function () {
                if (t._state !== i.PENDING) {
                  var e = t._handlers.slice();
                  (t._handlers = []),
                    e.forEach(function (e) {
                      e.done ||
                        (t._state === i.RESOLVED &&
                          e.onfulfilled &&
                          e.onfulfilled(t._value),
                        t._state === i.REJECTED &&
                          e.onrejected &&
                          e.onrejected(t._value),
                        (e.done = !0));
                    });
                }
              });
            try {
              e(this._resolve, this._reject);
            } catch (e) {
              this._reject(e);
            }
          }
          return (
            (e.resolve = function (t) {
              return new e(function (e) {
                e(t);
              });
            }),
            (e.reject = function (t) {
              return new e(function (e, n) {
                n(t);
              });
            }),
            (e.all = function (t) {
              return new e(function (n, i) {
                if (Array.isArray(t))
                  if (0 !== t.length) {
                    var s = t.length,
                      o = [];
                    t.forEach(function (t, a) {
                      e.resolve(t)
                        .then(function (e) {
                          (o[a] = e), 0 === (s -= 1) && n(o);
                        })
                        .then(null, i);
                    });
                  } else n([]);
                else
                  i(new TypeError("Promise.all requires an array as input."));
              });
            }),
            (e.prototype.then = function (t, n) {
              var i = this;
              return new e(function (e, s) {
                i._attachHandler({
                  done: !1,
                  onfulfilled: function (n) {
                    if (t)
                      try {
                        return void e(t(n));
                      } catch (e) {
                        return void s(e);
                      }
                    else e(n);
                  },
                  onrejected: function (t) {
                    if (n)
                      try {
                        return void e(n(t));
                      } catch (e) {
                        return void s(e);
                      }
                    else s(t);
                  },
                });
              });
            }),
            (e.prototype.catch = function (e) {
              return this.then(function (e) {
                return e;
              }, e);
            }),
            (e.prototype.finally = function (t) {
              var n = this;
              return new e(function (e, i) {
                var s, o;
                return n
                  .then(
                    function (e) {
                      (o = !1), (s = e), t && t();
                    },
                    function (e) {
                      (o = !0), (s = e), t && t();
                    },
                  )
                  .then(function () {
                    o ? i(s) : e(s);
                  });
              });
            }),
            (e.prototype.toString = function () {
              return "[object SyncPromise]";
            }),
            e
          );
        })();
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            _callOnClient: () => _,
            addBreadcrumb: () => m,
            captureEvent: () => l,
            captureException: () => a,
            captureMessage: () => r,
            configureScope: () => c,
            setContext: () => u,
            setExtra: () => h,
            setExtras: () => p,
            setTag: () => g,
            setTags: () => d,
            setUser: () => f,
            startTransaction: () => b,
            withScope: () => S,
          });
        var i = n(8),
          s = n(20);
        function o(e) {
          for (var t = [], n = 1; n < arguments.length; n++)
            t[n - 1] = arguments[n];
          var o = (0, s.getCurrentHub)();
          if (o && o[e]) return o[e].apply(o, (0, i.__spread)(t));
          throw new Error(
            "No hub defined or " +
              e +
              " was not found on the hub, please open a bug report.",
          );
        }
        function a(e, t) {
          var n;
          try {
            throw new Error("Sentry syntheticException");
          } catch (e) {
            n = e;
          }
          return o("captureException", e, {
            captureContext: t,
            originalException: e,
            syntheticException: n,
          });
        }
        function r(e, t) {
          var n;
          try {
            throw new Error(e);
          } catch (e) {
            n = e;
          }
          var s = "string" != typeof t ? { captureContext: t } : void 0;
          return o(
            "captureMessage",
            e,
            "string" == typeof t ? t : void 0,
            (0, i.__assign)({ originalException: e, syntheticException: n }, s),
          );
        }
        function l(e) {
          return o("captureEvent", e);
        }
        function c(e) {
          o("configureScope", e);
        }
        function m(e) {
          o("addBreadcrumb", e);
        }
        function u(e, t) {
          o("setContext", e, t);
        }
        function p(e) {
          o("setExtras", e);
        }
        function d(e) {
          o("setTags", e);
        }
        function h(e, t) {
          o("setExtra", e, t);
        }
        function g(e, t) {
          o("setTag", e, t);
        }
        function f(e) {
          o("setUser", e);
        }
        function S(e) {
          o("withScope", e);
        }
        function _(e) {
          for (var t = [], n = 1; n < arguments.length; n++)
            t[n - 1] = arguments[n];
          o.apply(void 0, (0, i.__spread)(["_invokeClient", e], t));
        }
        function b(e, t) {
          return o("startTransaction", (0, i.__assign)({}, e), t);
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            API_VERSION: () => m,
            Hub: () => u,
            getActiveDomain: () => g,
            getCurrentHub: () => h,
            getHubFromCarrier: () => S,
            getMainCarrier: () => p,
            makeMain: () => d,
            setHubOnCarrier: () => _,
          });
        var i = n(8),
          s = n(11),
          o = n(10),
          a = n(21),
          r = n(12),
          l = n(7),
          c = n(22),
          m = 3,
          u = (function () {
            function e(e, t, n) {
              void 0 === t && (t = new l.Scope()),
                void 0 === n && (n = m),
                (this._version = n),
                (this._stack = [{}]),
                (this.getStackTop().scope = t),
                this.bindClient(e);
            }
            return (
              (e.prototype.isOlderThan = function (e) {
                return this._version < e;
              }),
              (e.prototype.bindClient = function (e) {
                (this.getStackTop().client = e),
                  e && e.setupIntegrations && e.setupIntegrations();
              }),
              (e.prototype.pushScope = function () {
                var e = l.Scope.clone(this.getScope());
                return (
                  this.getStack().push({ client: this.getClient(), scope: e }),
                  e
                );
              }),
              (e.prototype.popScope = function () {
                return (
                  !(this.getStack().length <= 1) && !!this.getStack().pop()
                );
              }),
              (e.prototype.withScope = function (e) {
                var t = this.pushScope();
                try {
                  e(t);
                } finally {
                  this.popScope();
                }
              }),
              (e.prototype.getClient = function () {
                return this.getStackTop().client;
              }),
              (e.prototype.getScope = function () {
                return this.getStackTop().scope;
              }),
              (e.prototype.getStack = function () {
                return this._stack;
              }),
              (e.prototype.getStackTop = function () {
                return this._stack[this._stack.length - 1];
              }),
              (e.prototype.captureException = function (e, t) {
                var n = (this._lastEventId = (0, s.uuid4)()),
                  o = t;
                if (!t) {
                  var a = void 0;
                  try {
                    throw new Error("Sentry syntheticException");
                  } catch (e) {
                    a = e;
                  }
                  o = { originalException: e, syntheticException: a };
                }
                return (
                  this._invokeClient(
                    "captureException",
                    e,
                    (0, i.__assign)((0, i.__assign)({}, o), { event_id: n }),
                  ),
                  n
                );
              }),
              (e.prototype.captureMessage = function (e, t, n) {
                var o = (this._lastEventId = (0, s.uuid4)()),
                  a = n;
                if (!n) {
                  var r = void 0;
                  try {
                    throw new Error(e);
                  } catch (e) {
                    r = e;
                  }
                  a = { originalException: e, syntheticException: r };
                }
                return (
                  this._invokeClient(
                    "captureMessage",
                    e,
                    t,
                    (0, i.__assign)((0, i.__assign)({}, a), { event_id: o }),
                  ),
                  o
                );
              }),
              (e.prototype.captureEvent = function (e, t) {
                var n = (this._lastEventId = (0, s.uuid4)());
                return (
                  this._invokeClient(
                    "captureEvent",
                    e,
                    (0, i.__assign)((0, i.__assign)({}, t), { event_id: n }),
                  ),
                  n
                );
              }),
              (e.prototype.lastEventId = function () {
                return this._lastEventId;
              }),
              (e.prototype.addBreadcrumb = function (e, t) {
                var n = this.getStackTop(),
                  a = n.scope,
                  r = n.client;
                if (a && r) {
                  var l = (r.getOptions && r.getOptions()) || {},
                    c = l.beforeBreadcrumb,
                    m = void 0 === c ? null : c,
                    u = l.maxBreadcrumbs,
                    p = void 0 === u ? 100 : u;
                  if (!(p <= 0)) {
                    var d = (0, o.dateTimestampInSeconds)(),
                      h = (0, i.__assign)({ timestamp: d }, e),
                      g = m
                        ? (0, s.consoleSandbox)(function () {
                            return m(h, t);
                          })
                        : h;
                    null !== g && a.addBreadcrumb(g, Math.min(p, 100));
                  }
                }
              }),
              (e.prototype.setUser = function (e) {
                var t = this.getScope();
                t && t.setUser(e);
              }),
              (e.prototype.setTags = function (e) {
                var t = this.getScope();
                t && t.setTags(e);
              }),
              (e.prototype.setExtras = function (e) {
                var t = this.getScope();
                t && t.setExtras(e);
              }),
              (e.prototype.setTag = function (e, t) {
                var n = this.getScope();
                n && n.setTag(e, t);
              }),
              (e.prototype.setExtra = function (e, t) {
                var n = this.getScope();
                n && n.setExtra(e, t);
              }),
              (e.prototype.setContext = function (e, t) {
                var n = this.getScope();
                n && n.setContext(e, t);
              }),
              (e.prototype.configureScope = function (e) {
                var t = this.getStackTop(),
                  n = t.scope,
                  i = t.client;
                n && i && e(n);
              }),
              (e.prototype.run = function (e) {
                var t = d(this);
                try {
                  e(this);
                } finally {
                  d(t);
                }
              }),
              (e.prototype.getIntegration = function (e) {
                var t = this.getClient();
                if (!t) return null;
                try {
                  return t.getIntegration(e);
                } catch (t) {
                  return (
                    a.logger.warn(
                      "Cannot retrieve integration " +
                        e.id +
                        " from the current Hub",
                    ),
                    null
                  );
                }
              }),
              (e.prototype.startSpan = function (e) {
                return this._callExtensionMethod("startSpan", e);
              }),
              (e.prototype.startTransaction = function (e, t) {
                return this._callExtensionMethod("startTransaction", e, t);
              }),
              (e.prototype.traceHeaders = function () {
                return this._callExtensionMethod("traceHeaders");
              }),
              (e.prototype.startSession = function (e) {
                this.endSession();
                var t = this.getStackTop(),
                  n = t.scope,
                  s = t.client,
                  o = (s && s.getOptions()) || {},
                  a = o.release,
                  r = o.environment,
                  l = new c.Session(
                    (0, i.__assign)(
                      (0, i.__assign)(
                        { release: a, environment: r },
                        n && { user: n.getUser() },
                      ),
                      e,
                    ),
                  );
                return n && n.setSession(l), l;
              }),
              (e.prototype.endSession = function () {
                var e = this.getStackTop(),
                  t = e.scope,
                  n = e.client;
                if (t) {
                  var i = t.getSession && t.getSession();
                  i &&
                    (i.close(),
                    n && n.captureSession && n.captureSession(i),
                    t.setSession());
                }
              }),
              (e.prototype._invokeClient = function (e) {
                for (var t, n = [], s = 1; s < arguments.length; s++)
                  n[s - 1] = arguments[s];
                var o = this.getStackTop(),
                  a = o.scope,
                  r = o.client;
                r && r[e] && (t = r)[e].apply(t, (0, i.__spread)(n, [a]));
              }),
              (e.prototype._callExtensionMethod = function (e) {
                for (var t = [], n = 1; n < arguments.length; n++)
                  t[n - 1] = arguments[n];
                var i = p().__SENTRY__;
                if (i && i.extensions && "function" == typeof i.extensions[e])
                  return i.extensions[e].apply(this, t);
                a.logger.warn(
                  "Extension method " +
                    e +
                    " couldn't be found, doing nothing.",
                );
              }),
              e
            );
          })();
        function p() {
          var e = (0, s.getGlobalObject)();
          return (
            (e.__SENTRY__ = e.__SENTRY__ || { extensions: {}, hub: void 0 }), e
          );
        }
        function d(e) {
          var t = p(),
            n = S(t);
          return _(t, e), n;
        }
        function h() {
          var e = p();
          return (
            (f(e) && !S(e).isOlderThan(m)) || _(e, new u()),
            (0, r.isNodeEnv)()
              ? (function (e) {
                  try {
                    var t = g();
                    if (!t) return S(e);
                    if (!f(t) || S(t).isOlderThan(m)) {
                      var n = S(e).getStackTop();
                      _(t, new u(n.client, l.Scope.clone(n.scope)));
                    }
                    return S(t);
                  } catch (t) {
                    return S(e);
                  }
                })(e)
              : S(e)
          );
        }
        function g() {
          var e = p().__SENTRY__;
          return (
            e &&
            e.extensions &&
            e.extensions.domain &&
            e.extensions.domain.active
          );
        }
        function f(e) {
          return !!(e && e.__SENTRY__ && e.__SENTRY__.hub);
        }
        function S(e) {
          return (
            (e && e.__SENTRY__ && e.__SENTRY__.hub) ||
              ((e.__SENTRY__ = e.__SENTRY__ || {}),
              (e.__SENTRY__.hub = new u())),
            e.__SENTRY__.hub
          );
        }
        function _(e, t) {
          return (
            !!e &&
            ((e.__SENTRY__ = e.__SENTRY__ || {}), (e.__SENTRY__.hub = t), !0)
          );
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { logger: () => r });
        var i = n(11),
          s = (0, i.getGlobalObject)(),
          o = "Sentry Logger ",
          a = (function () {
            function e() {
              this._enabled = !1;
            }
            return (
              (e.prototype.disable = function () {
                this._enabled = !1;
              }),
              (e.prototype.enable = function () {
                this._enabled = !0;
              }),
              (e.prototype.log = function () {
                for (var e = [], t = 0; t < arguments.length; t++)
                  e[t] = arguments[t];
                this._enabled &&
                  (0, i.consoleSandbox)(function () {
                    s.console.log(o + "[Log]: " + e.join(" "));
                  });
              }),
              (e.prototype.warn = function () {
                for (var e = [], t = 0; t < arguments.length; t++)
                  e[t] = arguments[t];
                this._enabled &&
                  (0, i.consoleSandbox)(function () {
                    s.console.warn(o + "[Warn]: " + e.join(" "));
                  });
              }),
              (e.prototype.error = function () {
                for (var e = [], t = 0; t < arguments.length; t++)
                  e[t] = arguments[t];
                this._enabled &&
                  (0, i.consoleSandbox)(function () {
                    s.console.error(o + "[Error]: " + e.join(" "));
                  });
              }),
              e
            );
          })();
        s.__SENTRY__ = s.__SENTRY__ || {};
        var r = s.__SENTRY__.logger || (s.__SENTRY__.logger = new a());
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { Session: () => a });
        var i = n(23),
          s = n(11),
          o = n(13),
          a = (function () {
            function e(e) {
              (this.errors = 0),
                (this.sid = (0, s.uuid4)()),
                (this.timestamp = Date.now()),
                (this.started = Date.now()),
                (this.duration = 0),
                (this.status = i.SessionStatus.Ok),
                e && this.update(e);
            }
            return (
              (e.prototype.update = function (e) {
                void 0 === e && (e = {}),
                  e.user &&
                    (e.user.ip_address && (this.ipAddress = e.user.ip_address),
                    e.did ||
                      (this.did =
                        e.user.id || e.user.email || e.user.username)),
                  (this.timestamp = e.timestamp || Date.now()),
                  e.sid &&
                    (this.sid = 32 === e.sid.length ? e.sid : (0, s.uuid4)()),
                  e.did && (this.did = "" + e.did),
                  "number" == typeof e.started && (this.started = e.started),
                  "number" == typeof e.duration
                    ? (this.duration = e.duration)
                    : (this.duration = this.timestamp - this.started),
                  e.release && (this.release = e.release),
                  e.environment && (this.environment = e.environment),
                  e.ipAddress && (this.ipAddress = e.ipAddress),
                  e.userAgent && (this.userAgent = e.userAgent),
                  "number" == typeof e.errors && (this.errors = e.errors),
                  e.status && (this.status = e.status);
              }),
              (e.prototype.close = function (e) {
                e
                  ? this.update({ status: e })
                  : this.status === i.SessionStatus.Ok
                    ? this.update({ status: i.SessionStatus.Exited })
                    : this.update();
              }),
              (e.prototype.toJSON = function () {
                return (0, o.dropUndefinedKeys)({
                  sid: "" + this.sid,
                  init: !0,
                  started: new Date(this.started).toISOString(),
                  timestamp: new Date(this.timestamp).toISOString(),
                  status: this.status,
                  errors: this.errors,
                  did:
                    "number" == typeof this.did || "string" == typeof this.did
                      ? "" + this.did
                      : void 0,
                  duration: this.duration,
                  attrs: (0, o.dropUndefinedKeys)({
                    release: this.release,
                    environment: this.environment,
                    ip_address: this.ipAddress,
                    user_agent: this.userAgent,
                  }),
                });
              }),
              e
            );
          })();
      },
      (e, t, n) => {
        "use strict";
        var i;
        n.r(t),
          n.d(t, { SessionStatus: () => i }),
          (function (e) {
            (e.Ok = "ok"),
              (e.Exited = "exited"),
              (e.Crashed = "crashed"),
              (e.Abnormal = "abnormal");
          })(i || (i = {}));
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { BrowserClient: () => u });
        var i = n(8),
          s = n(45),
          o = n(11),
          a = n(21),
          r = n(25),
          l = n(41),
          c = n(43),
          m = n(42),
          u = (function (e) {
            function t(t) {
              return (
                void 0 === t && (t = {}),
                e.call(this, r.BrowserBackend, t) || this
              );
            }
            return (
              (0, i.__extends)(t, e),
              (t.prototype.showReportDialog = function (e) {
                void 0 === e && (e = {}),
                  (0, o.getGlobalObject)().document &&
                    (this._isEnabled()
                      ? (0, l.injectReportDialog)(
                          (0, i.__assign)((0, i.__assign)({}, e), {
                            dsn: e.dsn || this.getDsn(),
                          }),
                        )
                      : a.logger.error(
                          "Trying to call showReportDialog with Sentry Client disabled",
                        ));
              }),
              (t.prototype._prepareEvent = function (t, n, s) {
                return (
                  (t.platform = t.platform || "javascript"),
                  (t.sdk = (0, i.__assign)((0, i.__assign)({}, t.sdk), {
                    name: m.SDK_NAME,
                    packages: (0, i.__spread)((t.sdk && t.sdk.packages) || [], [
                      { name: "npm:@sentry/browser", version: m.SDK_VERSION },
                    ]),
                    version: m.SDK_VERSION,
                  })),
                  e.prototype._prepareEvent.call(this, t, n, s)
                );
              }),
              (t.prototype._sendEvent = function (t) {
                var n = this.getIntegration(c.Breadcrumbs);
                n && n.addSentryBreadcrumb(t),
                  e.prototype._sendEvent.call(this, t);
              }),
              t
            );
          })(s.BaseClient);
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { BrowserBackend: () => m });
        var i = n(8),
          s = n(39),
          o = n(5),
          a = n(29),
          r = n(26),
          l = n(30),
          c = n(38),
          m = (function (e) {
            function t() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              (0, i.__extends)(t, e),
              (t.prototype.eventFromException = function (e, t) {
                return (0, r.eventFromException)(this._options, e, t);
              }),
              (t.prototype.eventFromMessage = function (e, t, n) {
                return (
                  void 0 === t && (t = o.Severity.Info),
                  (0, r.eventFromMessage)(this._options, e, t, n)
                );
              }),
              (t.prototype._setupTransport = function () {
                if (!this._options.dsn)
                  return e.prototype._setupTransport.call(this);
                var t = (0, i.__assign)(
                  (0, i.__assign)({}, this._options.transportOptions),
                  { dsn: this._options.dsn },
                );
                return this._options.transport
                  ? new this._options.transport(t)
                  : (0, a.supportsFetch)()
                    ? new l.FetchTransport(t)
                    : new c.XHRTransport(t);
              }),
              t
            );
          })(s.BaseBackend);
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            eventFromException: () => m,
            eventFromMessage: () => u,
            eventFromString: () => d,
            eventFromUnknownInput: () => p,
          });
        var i = n(8),
          s = n(5),
          o = n(11),
          a = n(18),
          r = n(9),
          l = n(27),
          c = n(28);
        function m(e, t, n) {
          var i = p(t, (n && n.syntheticException) || void 0, {
            attachStacktrace: e.attachStacktrace,
          });
          return (
            (0, o.addExceptionMechanism)(i, { handled: !0, type: "generic" }),
            (i.level = s.Severity.Error),
            n && n.event_id && (i.event_id = n.event_id),
            a.SyncPromise.resolve(i)
          );
        }
        function u(e, t, n, i) {
          void 0 === n && (n = s.Severity.Info);
          var o = d(t, (i && i.syntheticException) || void 0, {
            attachStacktrace: e.attachStacktrace,
          });
          return (
            (o.level = n),
            i && i.event_id && (o.event_id = i.event_id),
            a.SyncPromise.resolve(o)
          );
        }
        function p(e, t, n) {
          var s;
          if ((void 0 === n && (n = {}), (0, r.isErrorEvent)(e) && e.error))
            return (
              (e = e.error),
              (s = (0, l.eventFromStacktrace)((0, c.computeStackTrace)(e)))
            );
          if ((0, r.isDOMError)(e) || (0, r.isDOMException)(e)) {
            var a = e,
              m =
                a.name || ((0, r.isDOMError)(a) ? "DOMError" : "DOMException"),
              u = a.message ? m + ": " + a.message : m;
            return (
              (s = d(u, t, n)),
              (0, o.addExceptionTypeValue)(s, u),
              "code" in a &&
                (s.tags = (0, i.__assign)((0, i.__assign)({}, s.tags), {
                  "DOMException.code": "" + a.code,
                })),
              s
            );
          }
          if ((0, r.isError)(e))
            return (s = (0, l.eventFromStacktrace)(
              (0, c.computeStackTrace)(e),
            ));
          if ((0, r.isPlainObject)(e) || (0, r.isEvent)(e)) {
            var p = e;
            return (
              (s = (0, l.eventFromPlainObject)(p, t, n.rejection)),
              (0, o.addExceptionMechanism)(s, { synthetic: !0 }),
              s
            );
          }
          return (
            (s = d(e, t, n)),
            (0, o.addExceptionTypeValue)(s, "" + e, void 0),
            (0, o.addExceptionMechanism)(s, { synthetic: !0 }),
            s
          );
        }
        function d(e, t, n) {
          void 0 === n && (n = {});
          var i = { message: e };
          if (n.attachStacktrace && t) {
            var s = (0, c.computeStackTrace)(t),
              o = (0, l.prepareFramesForEvent)(s.stack);
            i.stacktrace = { frames: o };
          }
          return i;
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            eventFromPlainObject: () => l,
            eventFromStacktrace: () => c,
            exceptionFromStacktrace: () => r,
            prepareFramesForEvent: () => m,
          });
        var i = n(9),
          s = n(13),
          o = n(28),
          a = 50;
        function r(e) {
          var t = m(e.stack),
            n = { type: e.name, value: e.message };
          return (
            t && t.length && (n.stacktrace = { frames: t }),
            void 0 === n.type &&
              "" === n.value &&
              (n.value = "Unrecoverable error caught"),
            n
          );
        }
        function l(e, t, n) {
          var a = {
            exception: {
              values: [
                {
                  type: (0, i.isEvent)(e)
                    ? e.constructor.name
                    : n
                      ? "UnhandledRejection"
                      : "Error",
                  value:
                    "Non-Error " +
                    (n ? "promise rejection" : "exception") +
                    " captured with keys: " +
                    (0, s.extractExceptionKeysForMessage)(e),
                },
              ],
            },
            extra: { __serialized__: (0, s.normalizeToSize)(e) },
          };
          if (t) {
            var r = m((0, o.computeStackTrace)(t).stack);
            a.stacktrace = { frames: r };
          }
          return a;
        }
        function c(e) {
          return { exception: { values: [r(e)] } };
        }
        function m(e) {
          if (!e || !e.length) return [];
          var t = e,
            n = t[0].func || "",
            i = t[t.length - 1].func || "";
          return (
            (-1 === n.indexOf("captureMessage") &&
              -1 === n.indexOf("captureException")) ||
              (t = t.slice(1)),
            -1 !== i.indexOf("sentryWrapped") && (t = t.slice(0, -1)),
            t
              .slice(0, a)
              .map(function (e) {
                return {
                  colno: null === e.column ? void 0 : e.column,
                  filename: e.url || t[0].url,
                  function: e.func || "?",
                  in_app: !0,
                  lineno: null === e.line ? void 0 : e.line,
                };
              })
              .reverse()
          );
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { computeStackTrace: () => u });
        var i = n(8),
          s = "?",
          o =
            /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
          a =
            /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
          r =
            /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
          l = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
          c = /\((\S*)(?::(\d+))(?::(\d+))\)/,
          m = /Minified React error #\d+;/i;
        function u(e) {
          var t = null,
            n = 0;
          e &&
            ("number" == typeof e.framesToPop
              ? (n = e.framesToPop)
              : m.test(e.message) && (n = 1));
          try {
            if (
              ((t = (function (e) {
                if (!e || !e.stacktrace) return null;
                for (
                  var t,
                    n = e.stacktrace,
                    i =
                      / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i,
                    o =
                      / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\((.*)\))? in (.*):\s*$/i,
                    a = n.split("\n"),
                    r = [],
                    l = 0;
                  l < a.length;
                  l += 2
                ) {
                  var c = null;
                  (t = i.exec(a[l]))
                    ? (c = {
                        url: t[2],
                        func: t[3],
                        args: [],
                        line: +t[1],
                        column: null,
                      })
                    : (t = o.exec(a[l])) &&
                      (c = {
                        url: t[6],
                        func: t[3] || t[4],
                        args: t[5] ? t[5].split(",") : [],
                        line: +t[1],
                        column: +t[2],
                      }),
                    c && (!c.func && c.line && (c.func = s), r.push(c));
                }
                if (!r.length) return null;
                return { message: d(e), name: e.name, stack: r };
              })(e)),
              t)
            )
              return p(t, n);
          } catch (e) {}
          try {
            if (
              ((t = (function (e) {
                if (!e || !e.stack) return null;
                for (
                  var t, n, i, m = [], u = e.stack.split("\n"), p = 0;
                  p < u.length;
                  ++p
                ) {
                  if ((n = o.exec(u[p]))) {
                    var h = n[2] && 0 === n[2].indexOf("native");
                    n[2] &&
                      0 === n[2].indexOf("eval") &&
                      (t = c.exec(n[2])) &&
                      ((n[2] = t[1]), (n[3] = t[2]), (n[4] = t[3])),
                      (i = {
                        url:
                          n[2] && 0 === n[2].indexOf("address at ")
                            ? n[2].substr(11)
                            : n[2],
                        func: n[1] || s,
                        args: h ? [n[2]] : [],
                        line: n[3] ? +n[3] : null,
                        column: n[4] ? +n[4] : null,
                      });
                  } else if ((n = r.exec(u[p])))
                    i = {
                      url: n[2],
                      func: n[1] || s,
                      args: [],
                      line: +n[3],
                      column: n[4] ? +n[4] : null,
                    };
                  else {
                    if (!(n = a.exec(u[p]))) continue;
                    n[3] && n[3].indexOf(" > eval") > -1 && (t = l.exec(n[3]))
                      ? ((n[1] = n[1] || "eval"),
                        (n[3] = t[1]),
                        (n[4] = t[2]),
                        (n[5] = ""))
                      : 0 !== p ||
                        n[5] ||
                        void 0 === e.columnNumber ||
                        (m[0].column = e.columnNumber + 1),
                      (i = {
                        url: n[3],
                        func: n[1] || s,
                        args: n[2] ? n[2].split(",") : [],
                        line: n[4] ? +n[4] : null,
                        column: n[5] ? +n[5] : null,
                      });
                  }
                  !i.func && i.line && (i.func = s), m.push(i);
                }
                if (!m.length) return null;
                return { message: d(e), name: e.name, stack: m };
              })(e)),
              t)
            )
              return p(t, n);
          } catch (e) {}
          return { message: d(e), name: e && e.name, stack: [], failed: !0 };
        }
        function p(e, t) {
          try {
            return (0, i.__assign)((0, i.__assign)({}, e), {
              stack: e.stack.slice(t),
            });
          } catch (t) {
            return e;
          }
        }
        function d(e) {
          var t = e && e.message;
          return t
            ? t.error && "string" == typeof t.error.message
              ? t.error.message
              : t
            : "No error message";
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            supportsDOMError: () => a,
            supportsDOMException: () => r,
            supportsErrorEvent: () => o,
            supportsFetch: () => l,
            supportsHistory: () => d,
            supportsNativeFetch: () => m,
            supportsReferrerPolicy: () => p,
            supportsReportingObserver: () => u,
          });
        var i = n(21),
          s = n(11);
        function o() {
          try {
            return new ErrorEvent(""), !0;
          } catch (e) {
            return !1;
          }
        }
        function a() {
          try {
            return new DOMError(""), !0;
          } catch (e) {
            return !1;
          }
        }
        function r() {
          try {
            return new DOMException(""), !0;
          } catch (e) {
            return !1;
          }
        }
        function l() {
          if (!("fetch" in (0, s.getGlobalObject)())) return !1;
          try {
            return new Headers(), new Request(""), new Response(), !0;
          } catch (e) {
            return !1;
          }
        }
        function c(e) {
          return (
            e &&
            /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(
              e.toString(),
            )
          );
        }
        function m() {
          if (!l()) return !1;
          var e = (0, s.getGlobalObject)();
          if (c(e.fetch)) return !0;
          var t = !1,
            n = e.document;
          if (n && "function" == typeof n.createElement)
            try {
              var o = n.createElement("iframe");
              (o.hidden = !0),
                n.head.appendChild(o),
                o.contentWindow &&
                  o.contentWindow.fetch &&
                  (t = c(o.contentWindow.fetch)),
                n.head.removeChild(o);
            } catch (e) {
              i.logger.warn(
                "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
                e,
              );
            }
          return t;
        }
        function u() {
          return "ReportingObserver" in (0, s.getGlobalObject)();
        }
        function p() {
          if (!l()) return !1;
          try {
            return new Request("_", { referrerPolicy: "origin" }), !0;
          } catch (e) {
            return !1;
          }
        }
        function d() {
          var e = (0, s.getGlobalObject)(),
            t = e.chrome,
            n = t && t.app && t.app.runtime,
            i =
              "history" in e &&
              !!e.history.pushState &&
              !!e.history.replaceState;
          return !n && i;
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { FetchTransport: () => m });
        var i = n(8),
          s = n(31),
          o = n(11),
          a = n(29),
          r = n(18),
          l = n(32),
          c = (0, o.getGlobalObject)(),
          m = (function (e) {
            function t() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              (0, i.__extends)(t, e),
              (t.prototype.sendEvent = function (e) {
                return this._sendRequest(
                  (0, s.eventToSentryRequest)(e, this._api),
                  e,
                );
              }),
              (t.prototype.sendSession = function (e) {
                return this._sendRequest(
                  (0, s.sessionToSentryRequest)(e, this._api),
                  e,
                );
              }),
              (t.prototype._sendRequest = function (e, t) {
                var n = this;
                if (this._isRateLimited(e.type))
                  return Promise.reject({
                    event: t,
                    type: e.type,
                    reason:
                      "Transport locked till " +
                      this._disabledUntil(e.type) +
                      " due to too many requests.",
                    status: 429,
                  });
                var i = {
                  body: e.body,
                  method: "POST",
                  referrerPolicy: (0, a.supportsReferrerPolicy)()
                    ? "origin"
                    : "",
                };
                return (
                  void 0 !== this.options.fetchParameters &&
                    Object.assign(i, this.options.fetchParameters),
                  void 0 !== this.options.headers &&
                    (i.headers = this.options.headers),
                  this._buffer.add(
                    new r.SyncPromise(function (t, s) {
                      c.fetch(e.url, i)
                        .then(function (i) {
                          var o = {
                            "x-sentry-rate-limits": i.headers.get(
                              "X-Sentry-Rate-Limits",
                            ),
                            "retry-after": i.headers.get("Retry-After"),
                          };
                          n._handleResponse({
                            requestType: e.type,
                            response: i,
                            headers: o,
                            resolve: t,
                            reject: s,
                          });
                        })
                        .catch(s);
                    }),
                  )
                );
              }),
              t
            );
          })(l.BaseTransport);
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            eventToSentryRequest: () => o,
            sessionToSentryRequest: () => s,
          });
        var i = n(8);
        function s(e, t) {
          return {
            body:
              JSON.stringify({ sent_at: new Date().toISOString() }) +
              "\n" +
              JSON.stringify({ type: "session" }) +
              "\n" +
              JSON.stringify(e),
            type: "session",
            url: t.getEnvelopeEndpointWithUrlEncodedAuth(),
          };
        }
        function o(e, t) {
          var n = e.tags || {},
            s = n.__sentry_samplingMethod,
            o = n.__sentry_sampleRate,
            a = (0, i.__rest)(n, [
              "__sentry_samplingMethod",
              "__sentry_sampleRate",
            ]);
          e.tags = a;
          var r = "transaction" === e.type,
            l = {
              body: JSON.stringify(e),
              type: e.type || "event",
              url: r
                ? t.getEnvelopeEndpointWithUrlEncodedAuth()
                : t.getStoreEndpointWithUrlEncodedAuth(),
            };
          if (r) {
            var c =
              JSON.stringify({
                event_id: e.event_id,
                sent_at: new Date().toISOString(),
              }) +
              "\n" +
              JSON.stringify({
                type: e.type,
                sample_rates: [{ id: s, rate: o }],
              }) +
              "\n" +
              l.body;
            l.body = c;
          }
          return l;
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { BaseTransport: () => m });
        var i = n(8),
          s = n(36),
          o = n(6),
          a = n(33),
          r = n(34),
          l = n(21),
          c = n(11),
          m = (function () {
            function e(e) {
              (this.options = e),
                (this._buffer = new a.PromiseBuffer(30)),
                (this._rateLimits = {}),
                (this._api = new s.API(this.options.dsn)),
                (this.url = this._api.getStoreEndpointWithUrlEncodedAuth());
            }
            return (
              (e.prototype.sendEvent = function (e) {
                throw new r.SentryError(
                  "Transport Class has to implement `sendEvent` method",
                );
              }),
              (e.prototype.close = function (e) {
                return this._buffer.drain(e);
              }),
              (e.prototype._handleResponse = function (e) {
                var t = e.requestType,
                  n = e.response,
                  i = e.headers,
                  s = e.resolve,
                  a = e.reject,
                  r = o.Status.fromHttpCode(n.status);
                this._handleRateLimit(i) &&
                  l.logger.warn(
                    "Too many requests, backing off until: " +
                      this._disabledUntil(t),
                  ),
                  r !== o.Status.Success ? a(n) : s({ status: r });
              }),
              (e.prototype._disabledUntil = function (e) {
                return this._rateLimits[e] || this._rateLimits.all;
              }),
              (e.prototype._isRateLimited = function (e) {
                return this._disabledUntil(e) > new Date(Date.now());
              }),
              (e.prototype._handleRateLimit = function (e) {
                var t,
                  n,
                  s,
                  o,
                  a = Date.now(),
                  r = e["x-sentry-rate-limits"],
                  l = e["retry-after"];
                if (r) {
                  try {
                    for (
                      var m = (0, i.__values)(r.trim().split(",")),
                        u = m.next();
                      !u.done;
                      u = m.next()
                    ) {
                      var p = u.value.split(":", 2),
                        d = parseInt(p[0], 10),
                        h = 1e3 * (isNaN(d) ? 60 : d);
                      try {
                        for (
                          var g =
                              ((s = void 0), (0, i.__values)(p[1].split(";"))),
                            f = g.next();
                          !f.done;
                          f = g.next()
                        ) {
                          var S = f.value;
                          this._rateLimits[S || "all"] = new Date(a + h);
                        }
                      } catch (e) {
                        s = { error: e };
                      } finally {
                        try {
                          f && !f.done && (o = g.return) && o.call(g);
                        } finally {
                          if (s) throw s.error;
                        }
                      }
                    }
                  } catch (e) {
                    t = { error: e };
                  } finally {
                    try {
                      u && !u.done && (n = m.return) && n.call(m);
                    } finally {
                      if (t) throw t.error;
                    }
                  }
                  return !0;
                }
                return (
                  !!l &&
                  ((this._rateLimits.all = new Date(
                    a + (0, c.parseRetryAfterHeader)(a, l),
                  )),
                  !0)
                );
              }),
              e
            );
          })();
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { PromiseBuffer: () => o });
        var i = n(34),
          s = n(18),
          o = (function () {
            function e(e) {
              (this._limit = e), (this._buffer = []);
            }
            return (
              (e.prototype.isReady = function () {
                return void 0 === this._limit || this.length() < this._limit;
              }),
              (e.prototype.add = function (e) {
                var t = this;
                return this.isReady()
                  ? (-1 === this._buffer.indexOf(e) && this._buffer.push(e),
                    e
                      .then(function () {
                        return t.remove(e);
                      })
                      .then(null, function () {
                        return t.remove(e).then(null, function () {});
                      }),
                    e)
                  : s.SyncPromise.reject(
                      new i.SentryError(
                        "Not adding Promise due to buffer limit reached.",
                      ),
                    );
              }),
              (e.prototype.remove = function (e) {
                return this._buffer.splice(this._buffer.indexOf(e), 1)[0];
              }),
              (e.prototype.length = function () {
                return this._buffer.length;
              }),
              (e.prototype.drain = function (e) {
                var t = this;
                return new s.SyncPromise(function (n) {
                  var i = setTimeout(function () {
                    e && e > 0 && n(!1);
                  }, e);
                  s.SyncPromise.all(t._buffer)
                    .then(function () {
                      clearTimeout(i), n(!0);
                    })
                    .then(null, function () {
                      n(!0);
                    });
                });
              }),
              e
            );
          })();
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { SentryError: () => o });
        var i = n(8),
          s = n(35),
          o = (function (e) {
            function t(t) {
              var n = this.constructor,
                i = e.call(this, t) || this;
              return (
                (i.message = t),
                (i.name = n.prototype.constructor.name),
                (0, s.setPrototypeOf)(i, n.prototype),
                i
              );
            }
            return (0, i.__extends)(t, e), t;
          })(Error);
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { setPrototypeOf: () => i });
        var i =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array
            ? function (e, t) {
                return (e.__proto__ = t), e;
              }
            : function (e, t) {
                for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n]);
                return e;
              });
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { API: () => o });
        var i = n(37),
          s = n(13),
          o = (function () {
            function e(e) {
              (this.dsn = e), (this._dsnObject = new i.Dsn(e));
            }
            return (
              (e.prototype.getDsn = function () {
                return this._dsnObject;
              }),
              (e.prototype.getBaseApiEndpoint = function () {
                var e = this._dsnObject,
                  t = e.protocol ? e.protocol + ":" : "",
                  n = e.port ? ":" + e.port : "";
                return (
                  t + "//" + e.host + n + (e.path ? "/" + e.path : "") + "/api/"
                );
              }),
              (e.prototype.getStoreEndpoint = function () {
                return this._getIngestEndpoint("store");
              }),
              (e.prototype.getStoreEndpointWithUrlEncodedAuth = function () {
                return this.getStoreEndpoint() + "?" + this._encodedAuth();
              }),
              (e.prototype.getEnvelopeEndpointWithUrlEncodedAuth = function () {
                return this._getEnvelopeEndpoint() + "?" + this._encodedAuth();
              }),
              (e.prototype.getStoreEndpointPath = function () {
                var e = this._dsnObject;
                return (
                  (e.path ? "/" + e.path : "") +
                  "/api/" +
                  e.projectId +
                  "/store/"
                );
              }),
              (e.prototype.getRequestHeaders = function (e, t) {
                var n = this._dsnObject,
                  i = ["Sentry sentry_version=7"];
                return (
                  i.push("sentry_client=" + e + "/" + t),
                  i.push("sentry_key=" + n.user),
                  n.pass && i.push("sentry_secret=" + n.pass),
                  {
                    "Content-Type": "application/json",
                    "X-Sentry-Auth": i.join(", "),
                  }
                );
              }),
              (e.prototype.getReportDialogEndpoint = function (e) {
                void 0 === e && (e = {});
                var t = this._dsnObject,
                  n = this.getBaseApiEndpoint() + "embed/error-page/",
                  i = [];
                for (var s in (i.push("dsn=" + t.toString()), e))
                  if ("dsn" !== s)
                    if ("user" === s) {
                      if (!e.user) continue;
                      e.user.name &&
                        i.push("name=" + encodeURIComponent(e.user.name)),
                        e.user.email &&
                          i.push("email=" + encodeURIComponent(e.user.email));
                    } else
                      i.push(
                        encodeURIComponent(s) + "=" + encodeURIComponent(e[s]),
                      );
                return i.length ? n + "?" + i.join("&") : n;
              }),
              (e.prototype._getEnvelopeEndpoint = function () {
                return this._getIngestEndpoint("envelope");
              }),
              (e.prototype._getIngestEndpoint = function (e) {
                return (
                  "" +
                  this.getBaseApiEndpoint() +
                  this._dsnObject.projectId +
                  "/" +
                  e +
                  "/"
                );
              }),
              (e.prototype._encodedAuth = function () {
                var e = {
                  sentry_key: this._dsnObject.user,
                  sentry_version: "7",
                };
                return (0, s.urlEncode)(e);
              }),
              e
            );
          })();
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { Dsn: () => r });
        var i = n(8),
          s = n(34),
          o = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/,
          a = "Invalid Dsn",
          r = (function () {
            function e(e) {
              "string" == typeof e
                ? this._fromString(e)
                : this._fromComponents(e),
                this._validate();
            }
            return (
              (e.prototype.toString = function (e) {
                void 0 === e && (e = !1);
                var t = this,
                  n = t.host,
                  i = t.path,
                  s = t.pass,
                  o = t.port,
                  a = t.projectId;
                return (
                  t.protocol +
                  "://" +
                  t.user +
                  (e && s ? ":" + s : "") +
                  "@" +
                  n +
                  (o ? ":" + o : "") +
                  "/" +
                  (i ? i + "/" : i) +
                  a
                );
              }),
              (e.prototype._fromString = function (e) {
                var t = o.exec(e);
                if (!t) throw new s.SentryError(a);
                var n = (0, i.__read)(t.slice(1), 6),
                  r = n[0],
                  l = n[1],
                  c = n[2],
                  m = void 0 === c ? "" : c,
                  u = n[3],
                  p = n[4],
                  d = void 0 === p ? "" : p,
                  h = "",
                  g = n[5],
                  f = g.split("/");
                if (
                  (f.length > 1 &&
                    ((h = f.slice(0, -1).join("/")), (g = f.pop())),
                  g)
                ) {
                  var S = g.match(/^\d+/);
                  S && (g = S[0]);
                }
                this._fromComponents({
                  host: u,
                  pass: m,
                  path: h,
                  projectId: g,
                  port: d,
                  protocol: r,
                  user: l,
                });
              }),
              (e.prototype._fromComponents = function (e) {
                (this.protocol = e.protocol),
                  (this.user = e.user),
                  (this.pass = e.pass || ""),
                  (this.host = e.host),
                  (this.port = e.port || ""),
                  (this.path = e.path || ""),
                  (this.projectId = e.projectId);
              }),
              (e.prototype._validate = function () {
                var e = this;
                if (
                  (["protocol", "user", "host", "projectId"].forEach(
                    function (t) {
                      if (!e[t])
                        throw new s.SentryError(a + ": " + t + " missing");
                    },
                  ),
                  !this.projectId.match(/^\d+$/))
                )
                  throw new s.SentryError(
                    a + ": Invalid projectId " + this.projectId,
                  );
                if ("http" !== this.protocol && "https" !== this.protocol)
                  throw new s.SentryError(
                    a + ": Invalid protocol " + this.protocol,
                  );
                if (this.port && isNaN(parseInt(this.port, 10)))
                  throw new s.SentryError(a + ": Invalid port " + this.port);
              }),
              e
            );
          })();
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { XHRTransport: () => a });
        var i = n(8),
          s = n(31),
          o = n(18),
          a = (function (e) {
            function t() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              (0, i.__extends)(t, e),
              (t.prototype.sendEvent = function (e) {
                return this._sendRequest(
                  (0, s.eventToSentryRequest)(e, this._api),
                  e,
                );
              }),
              (t.prototype.sendSession = function (e) {
                return this._sendRequest(
                  (0, s.sessionToSentryRequest)(e, this._api),
                  e,
                );
              }),
              (t.prototype._sendRequest = function (e, t) {
                var n = this;
                return this._isRateLimited(e.type)
                  ? Promise.reject({
                      event: t,
                      type: e.type,
                      reason:
                        "Transport locked till " +
                        this._disabledUntil(e.type) +
                        " due to too many requests.",
                      status: 429,
                    })
                  : this._buffer.add(
                      new o.SyncPromise(function (t, i) {
                        var s = new XMLHttpRequest();
                        for (var o in ((s.onreadystatechange = function () {
                          if (4 === s.readyState) {
                            var o = {
                              "x-sentry-rate-limits": s.getResponseHeader(
                                "X-Sentry-Rate-Limits",
                              ),
                              "retry-after": s.getResponseHeader("Retry-After"),
                            };
                            n._handleResponse({
                              requestType: e.type,
                              response: s,
                              headers: o,
                              resolve: t,
                              reject: i,
                            });
                          }
                        }),
                        s.open("POST", e.url),
                        n.options.headers))
                          n.options.headers.hasOwnProperty(o) &&
                            s.setRequestHeader(o, n.options.headers[o]);
                        s.send(e.body);
                      }),
                    );
              }),
              t
            );
          })(n(32).BaseTransport);
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { BaseBackend: () => a });
        var i = n(21),
          s = n(34),
          o = n(40),
          a = (function () {
            function e(e) {
              (this._options = e),
                this._options.dsn ||
                  i.logger.warn(
                    "No DSN provided, backend will not do anything.",
                  ),
                (this._transport = this._setupTransport());
            }
            return (
              (e.prototype.eventFromException = function (e, t) {
                throw new s.SentryError(
                  "Backend has to implement `eventFromException` method",
                );
              }),
              (e.prototype.eventFromMessage = function (e, t, n) {
                throw new s.SentryError(
                  "Backend has to implement `eventFromMessage` method",
                );
              }),
              (e.prototype.sendEvent = function (e) {
                this._transport.sendEvent(e).then(null, function (e) {
                  i.logger.error("Error while sending event: " + e);
                });
              }),
              (e.prototype.sendSession = function (e) {
                this._transport.sendSession
                  ? this._transport.sendSession(e).then(null, function (e) {
                      i.logger.error("Error while sending session: " + e);
                    })
                  : i.logger.warn(
                      "Dropping session because custom transport doesn't implement sendSession",
                    );
              }),
              (e.prototype.getTransport = function () {
                return this._transport;
              }),
              (e.prototype._setupTransport = function () {
                return new o.NoopTransport();
              }),
              e
            );
          })();
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { NoopTransport: () => o });
        var i = n(6),
          s = n(18),
          o = (function () {
            function e() {}
            return (
              (e.prototype.sendEvent = function (e) {
                return s.SyncPromise.resolve({
                  reason:
                    "NoopTransport: Event has been skipped because no Dsn is configured.",
                  status: i.Status.Skipped,
                });
              }),
              (e.prototype.close = function (e) {
                return s.SyncPromise.resolve(!0);
              }),
              e
            );
          })();
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            ignoreNextOnError: () => m,
            injectReportDialog: () => p,
            shouldIgnoreOnError: () => c,
            wrap: () => u,
          });
        var i = n(8),
          s = n(19),
          o = n(36),
          a = n(11),
          r = n(21),
          l = 0;
        function c() {
          return l > 0;
        }
        function m() {
          (l += 1),
            setTimeout(function () {
              l -= 1;
            });
        }
        function u(e, t, n) {
          if ((void 0 === t && (t = {}), "function" != typeof e)) return e;
          try {
            if (e.__sentry__) return e;
            if (e.__sentry_wrapped__) return e.__sentry_wrapped__;
          } catch (t) {
            return e;
          }
          var o = function () {
            var o = Array.prototype.slice.call(arguments);
            try {
              n && "function" == typeof n && n.apply(this, arguments);
              var r = o.map(function (e) {
                return u(e, t);
              });
              return e.handleEvent
                ? e.handleEvent.apply(this, r)
                : e.apply(this, r);
            } catch (e) {
              throw (
                (m(),
                (0, s.withScope)(function (n) {
                  n.addEventProcessor(function (e) {
                    var n = (0, i.__assign)({}, e);
                    return (
                      t.mechanism &&
                        ((0, a.addExceptionTypeValue)(n, void 0, void 0),
                        (0, a.addExceptionMechanism)(n, t.mechanism)),
                      (n.extra = (0, i.__assign)((0, i.__assign)({}, n.extra), {
                        arguments: o,
                      })),
                      n
                    );
                  }),
                    (0, s.captureException)(e);
                }),
                e)
              );
            }
          };
          try {
            for (var r in e)
              Object.prototype.hasOwnProperty.call(e, r) && (o[r] = e[r]);
          } catch (e) {}
          (e.prototype = e.prototype || {}),
            (o.prototype = e.prototype),
            Object.defineProperty(e, "__sentry_wrapped__", {
              enumerable: !1,
              value: o,
            }),
            Object.defineProperties(o, {
              __sentry__: { enumerable: !1, value: !0 },
              __sentry_original__: { enumerable: !1, value: e },
            });
          try {
            Object.getOwnPropertyDescriptor(o, "name").configurable &&
              Object.defineProperty(o, "name", {
                get: function () {
                  return e.name;
                },
              });
          } catch (e) {}
          return o;
        }
        function p(e) {
          if ((void 0 === e && (e = {}), e.eventId))
            if (e.dsn) {
              var t = document.createElement("script");
              (t.async = !0),
                (t.src = new o.API(e.dsn).getReportDialogEndpoint(e)),
                e.onLoad && (t.onload = e.onLoad),
                (document.head || document.body).appendChild(t);
            } else
              r.logger.error("Missing dsn option in showReportDialog call");
          else
            r.logger.error("Missing eventId option in showReportDialog call");
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { SDK_NAME: () => i, SDK_VERSION: () => s });
        var i = "sentry.javascript.browser",
          s = "5.30.0";
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { Breadcrumbs: () => m });
        var i = n(8),
          s = n(20),
          o = n(5),
          a = n(11),
          r = n(44),
          l = n(17),
          c = n(14),
          m = (function () {
            function e(t) {
              (this.name = e.id),
                (this._options = (0, i.__assign)(
                  {
                    console: !0,
                    dom: !0,
                    fetch: !0,
                    history: !0,
                    sentry: !0,
                    xhr: !0,
                  },
                  t,
                ));
            }
            return (
              (e.prototype.addSentryBreadcrumb = function (e) {
                this._options.sentry &&
                  (0, s.getCurrentHub)().addBreadcrumb(
                    {
                      category:
                        "sentry." +
                        ("transaction" === e.type ? "transaction" : "event"),
                      event_id: e.event_id,
                      level: e.level,
                      message: (0, a.getEventDescription)(e),
                    },
                    { event: e },
                  );
              }),
              (e.prototype.setupOnce = function () {
                var e = this;
                this._options.console &&
                  (0, r.addInstrumentationHandler)({
                    callback: function () {
                      for (var t = [], n = 0; n < arguments.length; n++)
                        t[n] = arguments[n];
                      e._consoleBreadcrumb.apply(e, (0, i.__spread)(t));
                    },
                    type: "console",
                  }),
                  this._options.dom &&
                    (0, r.addInstrumentationHandler)({
                      callback: function () {
                        for (var t = [], n = 0; n < arguments.length; n++)
                          t[n] = arguments[n];
                        e._domBreadcrumb.apply(e, (0, i.__spread)(t));
                      },
                      type: "dom",
                    }),
                  this._options.xhr &&
                    (0, r.addInstrumentationHandler)({
                      callback: function () {
                        for (var t = [], n = 0; n < arguments.length; n++)
                          t[n] = arguments[n];
                        e._xhrBreadcrumb.apply(e, (0, i.__spread)(t));
                      },
                      type: "xhr",
                    }),
                  this._options.fetch &&
                    (0, r.addInstrumentationHandler)({
                      callback: function () {
                        for (var t = [], n = 0; n < arguments.length; n++)
                          t[n] = arguments[n];
                        e._fetchBreadcrumb.apply(e, (0, i.__spread)(t));
                      },
                      type: "fetch",
                    }),
                  this._options.history &&
                    (0, r.addInstrumentationHandler)({
                      callback: function () {
                        for (var t = [], n = 0; n < arguments.length; n++)
                          t[n] = arguments[n];
                        e._historyBreadcrumb.apply(e, (0, i.__spread)(t));
                      },
                      type: "history",
                    });
              }),
              (e.prototype._consoleBreadcrumb = function (e) {
                var t = {
                  category: "console",
                  data: { arguments: e.args, logger: "console" },
                  level: o.Severity.fromString(e.level),
                  message: (0, l.safeJoin)(e.args, " "),
                };
                if ("assert" === e.level) {
                  if (!1 !== e.args[0]) return;
                  (t.message =
                    "Assertion failed: " +
                    ((0, l.safeJoin)(e.args.slice(1), " ") ||
                      "console.assert")),
                    (t.data.arguments = e.args.slice(1));
                }
                (0, s.getCurrentHub)().addBreadcrumb(t, {
                  input: e.args,
                  level: e.level,
                });
              }),
              (e.prototype._domBreadcrumb = function (e) {
                var t;
                try {
                  t = e.event.target
                    ? (0, c.htmlTreeAsString)(e.event.target)
                    : (0, c.htmlTreeAsString)(e.event);
                } catch (e) {
                  t = "<unknown>";
                }
                0 !== t.length &&
                  (0, s.getCurrentHub)().addBreadcrumb(
                    { category: "ui." + e.name, message: t },
                    { event: e.event, name: e.name },
                  );
              }),
              (e.prototype._xhrBreadcrumb = function (e) {
                if (e.endTimestamp) {
                  if (e.xhr.__sentry_own_request__) return;
                  var t = e.xhr.__sentry_xhr__ || {},
                    n = t.method,
                    i = t.url,
                    o = t.status_code,
                    a = t.body;
                  (0, s.getCurrentHub)().addBreadcrumb(
                    {
                      category: "xhr",
                      data: { method: n, url: i, status_code: o },
                      type: "http",
                    },
                    { xhr: e.xhr, input: a },
                  );
                } else;
              }),
              (e.prototype._fetchBreadcrumb = function (e) {
                e.endTimestamp &&
                  ((e.fetchData.url.match(/sentry_key/) &&
                    "POST" === e.fetchData.method) ||
                    (e.error
                      ? (0, s.getCurrentHub)().addBreadcrumb(
                          {
                            category: "fetch",
                            data: e.fetchData,
                            level: o.Severity.Error,
                            type: "http",
                          },
                          { data: e.error, input: e.args },
                        )
                      : (0, s.getCurrentHub)().addBreadcrumb(
                          {
                            category: "fetch",
                            data: (0, i.__assign)(
                              (0, i.__assign)({}, e.fetchData),
                              { status_code: e.response.status },
                            ),
                            type: "http",
                          },
                          { input: e.args, response: e.response },
                        )));
              }),
              (e.prototype._historyBreadcrumb = function (e) {
                var t = (0, a.getGlobalObject)(),
                  n = e.from,
                  i = e.to,
                  o = (0, a.parseUrl)(t.location.href),
                  r = (0, a.parseUrl)(n),
                  l = (0, a.parseUrl)(i);
                r.path || (r = o),
                  o.protocol === l.protocol &&
                    o.host === l.host &&
                    (i = l.relative),
                  o.protocol === r.protocol &&
                    o.host === r.host &&
                    (n = r.relative),
                  (0, s.getCurrentHub)().addBreadcrumb({
                    category: "navigation",
                    data: { from: n, to: i },
                  });
              }),
              (e.id = "Breadcrumbs"),
              e
            );
          })();
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { addInstrumentationHandler: () => g });
        var i,
          s = n(8),
          o = n(9),
          a = n(21),
          r = n(11),
          l = n(13),
          c = n(15),
          m = n(29),
          u = (0, r.getGlobalObject)(),
          p = {},
          d = {};
        function h(e) {
          if (!d[e])
            switch (((d[e] = !0), e)) {
              case "console":
                !(function () {
                  if (!("console" in u)) return;
                  ["debug", "info", "warn", "error", "log", "assert"].forEach(
                    function (e) {
                      e in u.console &&
                        (0, l.fill)(u.console, e, function (t) {
                          return function () {
                            for (var n = [], i = 0; i < arguments.length; i++)
                              n[i] = arguments[i];
                            f("console", { args: n, level: e }),
                              t &&
                                Function.prototype.apply.call(t, u.console, n);
                          };
                        });
                    },
                  );
                })();
                break;
              case "dom":
                !(function () {
                  if (!("document" in u)) return;
                  u.document.addEventListener(
                    "click",
                    k("click", f.bind(null, "dom")),
                    !1,
                  ),
                    u.document.addEventListener(
                      "keypress",
                      E(f.bind(null, "dom")),
                      !1,
                    ),
                    ["EventTarget", "Node"].forEach(function (e) {
                      var t = u[e] && u[e].prototype;
                      t &&
                        t.hasOwnProperty &&
                        t.hasOwnProperty("addEventListener") &&
                        ((0, l.fill)(t, "addEventListener", function (e) {
                          return function (t, n, i) {
                            return (
                              n && n.handleEvent
                                ? ("click" === t &&
                                    (0, l.fill)(n, "handleEvent", function (e) {
                                      return function (t) {
                                        return (
                                          k("click", f.bind(null, "dom"))(t),
                                          e.call(this, t)
                                        );
                                      };
                                    }),
                                  "keypress" === t &&
                                    (0, l.fill)(n, "handleEvent", function (e) {
                                      return function (t) {
                                        return (
                                          E(f.bind(null, "dom"))(t),
                                          e.call(this, t)
                                        );
                                      };
                                    }))
                                : ("click" === t &&
                                    k("click", f.bind(null, "dom"), !0)(this),
                                  "keypress" === t &&
                                    E(f.bind(null, "dom"))(this)),
                              e.call(this, t, n, i)
                            );
                          };
                        }),
                        (0, l.fill)(t, "removeEventListener", function (e) {
                          return function (t, n, i) {
                            try {
                              e.call(this, t, n.__sentry_wrapped__, i);
                            } catch (e) {}
                            return e.call(this, t, n, i);
                          };
                        }));
                    });
                })();
                break;
              case "xhr":
                !(function () {
                  if (!("XMLHttpRequest" in u)) return;
                  var e = [],
                    t = [],
                    n = XMLHttpRequest.prototype;
                  (0, l.fill)(n, "open", function (n) {
                    return function () {
                      for (var i = [], s = 0; s < arguments.length; s++)
                        i[s] = arguments[s];
                      var a = this,
                        r = i[1];
                      (a.__sentry_xhr__ = {
                        method: (0, o.isString)(i[0])
                          ? i[0].toUpperCase()
                          : i[0],
                        url: i[1],
                      }),
                        (0, o.isString)(r) &&
                          "POST" === a.__sentry_xhr__.method &&
                          r.match(/sentry_key/) &&
                          (a.__sentry_own_request__ = !0);
                      var c = function () {
                        if (4 === a.readyState) {
                          try {
                            a.__sentry_xhr__ &&
                              (a.__sentry_xhr__.status_code = a.status);
                          } catch (e) {}
                          try {
                            var n = e.indexOf(a);
                            if (-1 !== n) {
                              e.splice(n);
                              var s = t.splice(n)[0];
                              a.__sentry_xhr__ &&
                                void 0 !== s[0] &&
                                (a.__sentry_xhr__.body = s[0]);
                            }
                          } catch (e) {}
                          f("xhr", {
                            args: i,
                            endTimestamp: Date.now(),
                            startTimestamp: Date.now(),
                            xhr: a,
                          });
                        }
                      };
                      return (
                        "onreadystatechange" in a &&
                        "function" == typeof a.onreadystatechange
                          ? (0, l.fill)(a, "onreadystatechange", function (e) {
                              return function () {
                                for (
                                  var t = [], n = 0;
                                  n < arguments.length;
                                  n++
                                )
                                  t[n] = arguments[n];
                                return c(), e.apply(a, t);
                              };
                            })
                          : a.addEventListener("readystatechange", c),
                        n.apply(a, i)
                      );
                    };
                  }),
                    (0, l.fill)(n, "send", function (n) {
                      return function () {
                        for (var i = [], s = 0; s < arguments.length; s++)
                          i[s] = arguments[s];
                        return (
                          e.push(this),
                          t.push(i),
                          f("xhr", {
                            args: i,
                            startTimestamp: Date.now(),
                            xhr: this,
                          }),
                          n.apply(this, i)
                        );
                      };
                    });
                })();
                break;
              case "fetch":
                !(function () {
                  if (!(0, m.supportsNativeFetch)()) return;
                  (0, l.fill)(u, "fetch", function (e) {
                    return function () {
                      for (var t = [], n = 0; n < arguments.length; n++)
                        t[n] = arguments[n];
                      var i = {
                        args: t,
                        fetchData: { method: S(t), url: _(t) },
                        startTimestamp: Date.now(),
                      };
                      return (
                        f("fetch", (0, s.__assign)({}, i)),
                        e.apply(u, t).then(
                          function (e) {
                            return (
                              f(
                                "fetch",
                                (0, s.__assign)((0, s.__assign)({}, i), {
                                  endTimestamp: Date.now(),
                                  response: e,
                                }),
                              ),
                              e
                            );
                          },
                          function (e) {
                            throw (
                              (f(
                                "fetch",
                                (0, s.__assign)((0, s.__assign)({}, i), {
                                  endTimestamp: Date.now(),
                                  error: e,
                                }),
                              ),
                              e)
                            );
                          },
                        )
                      );
                    };
                  });
                })();
                break;
              case "history":
                !(function () {
                  if (!(0, m.supportsHistory)()) return;
                  var e = u.onpopstate;
                  function t(e) {
                    return function () {
                      for (var t = [], n = 0; n < arguments.length; n++)
                        t[n] = arguments[n];
                      var s = t.length > 2 ? t[2] : void 0;
                      if (s) {
                        var o = i,
                          a = String(s);
                        (i = a), f("history", { from: o, to: a });
                      }
                      return e.apply(this, t);
                    };
                  }
                  (u.onpopstate = function () {
                    for (var t = [], n = 0; n < arguments.length; n++)
                      t[n] = arguments[n];
                    var s = u.location.href,
                      o = i;
                    if (((i = s), f("history", { from: o, to: s }), e))
                      return e.apply(this, t);
                  }),
                    (0, l.fill)(u.history, "pushState", t),
                    (0, l.fill)(u.history, "replaceState", t);
                })();
                break;
              case "error":
                (T = u.onerror),
                  (u.onerror = function (e, t, n, i, s) {
                    return (
                      f("error", {
                        column: i,
                        error: s,
                        line: n,
                        msg: e,
                        url: t,
                      }),
                      !!T && T.apply(this, arguments)
                    );
                  });
                break;
              case "unhandledrejection":
                (w = u.onunhandledrejection),
                  (u.onunhandledrejection = function (e) {
                    return (
                      f("unhandledrejection", e), !w || w.apply(this, arguments)
                    );
                  });
                break;
              default:
                a.logger.warn("unknown instrumentation type:", e);
            }
        }
        function g(e) {
          e &&
            "string" == typeof e.type &&
            "function" == typeof e.callback &&
            ((p[e.type] = p[e.type] || []),
            p[e.type].push(e.callback),
            h(e.type));
        }
        function f(e, t) {
          var n, i;
          if (e && p[e])
            try {
              for (
                var o = (0, s.__values)(p[e] || []), r = o.next();
                !r.done;
                r = o.next()
              ) {
                var l = r.value;
                try {
                  l(t);
                } catch (t) {
                  a.logger.error(
                    "Error while triggering instrumentation handler.\nType: " +
                      e +
                      "\nName: " +
                      (0, c.getFunctionName)(l) +
                      "\nError: " +
                      t,
                  );
                }
              }
            } catch (e) {
              n = { error: e };
            } finally {
              try {
                r && !r.done && (i = o.return) && i.call(o);
              } finally {
                if (n) throw n.error;
              }
            }
        }
        function S(e) {
          return (
            void 0 === e && (e = []),
            "Request" in u && (0, o.isInstanceOf)(e[0], Request) && e[0].method
              ? String(e[0].method).toUpperCase()
              : e[1] && e[1].method
                ? String(e[1].method).toUpperCase()
                : "GET"
          );
        }
        function _(e) {
          return (
            void 0 === e && (e = []),
            "string" == typeof e[0]
              ? e[0]
              : "Request" in u && (0, o.isInstanceOf)(e[0], Request)
                ? e[0].url
                : String(e[0])
          );
        }
        var b,
          y,
          v = 1e3,
          x = 0;
        function k(e, t, n) {
          return (
            void 0 === n && (n = !1),
            function (i) {
              (b = void 0),
                i &&
                  y !== i &&
                  ((y = i),
                  x && clearTimeout(x),
                  n
                    ? (x = setTimeout(function () {
                        t({ event: i, name: e });
                      }))
                    : t({ event: i, name: e }));
            }
          );
        }
        function E(e) {
          return function (t) {
            var n;
            try {
              n = t.target;
            } catch (e) {
              return;
            }
            var i = n && n.tagName;
            i &&
              ("INPUT" === i || "TEXTAREA" === i || n.isContentEditable) &&
              (b || k("input", e)(t),
              clearTimeout(b),
              (b = setTimeout(function () {
                b = void 0;
              }, v)));
          };
        }
        var T = null;
        var w = null;
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { BaseClient: () => f });
        var i = n(8),
          s = n(7),
          o = n(23),
          a = n(37),
          r = n(9),
          l = n(21),
          c = n(18),
          m = n(11),
          u = n(10),
          p = n(13),
          d = n(17),
          h = n(34),
          g = n(46),
          f = (function () {
            function e(e, t) {
              (this._integrations = {}),
                (this._processing = 0),
                (this._backend = new e(t)),
                (this._options = t),
                t.dsn && (this._dsn = new a.Dsn(t.dsn));
            }
            return (
              (e.prototype.captureException = function (e, t, n) {
                var i = this,
                  s = t && t.event_id;
                return (
                  this._process(
                    this._getBackend()
                      .eventFromException(e, t)
                      .then(function (e) {
                        return i._captureEvent(e, t, n);
                      })
                      .then(function (e) {
                        s = e;
                      }),
                  ),
                  s
                );
              }),
              (e.prototype.captureMessage = function (e, t, n, i) {
                var s = this,
                  o = n && n.event_id,
                  a = (0, r.isPrimitive)(e)
                    ? this._getBackend().eventFromMessage(String(e), t, n)
                    : this._getBackend().eventFromException(e, n);
                return (
                  this._process(
                    a
                      .then(function (e) {
                        return s._captureEvent(e, n, i);
                      })
                      .then(function (e) {
                        o = e;
                      }),
                  ),
                  o
                );
              }),
              (e.prototype.captureEvent = function (e, t, n) {
                var i = t && t.event_id;
                return (
                  this._process(
                    this._captureEvent(e, t, n).then(function (e) {
                      i = e;
                    }),
                  ),
                  i
                );
              }),
              (e.prototype.captureSession = function (e) {
                e.release
                  ? this._sendSession(e)
                  : l.logger.warn(
                      "Discarded session because of missing release",
                    );
              }),
              (e.prototype.getDsn = function () {
                return this._dsn;
              }),
              (e.prototype.getOptions = function () {
                return this._options;
              }),
              (e.prototype.flush = function (e) {
                var t = this;
                return this._isClientProcessing(e).then(function (n) {
                  return t
                    ._getBackend()
                    .getTransport()
                    .close(e)
                    .then(function (e) {
                      return n && e;
                    });
                });
              }),
              (e.prototype.close = function (e) {
                var t = this;
                return this.flush(e).then(function (e) {
                  return (t.getOptions().enabled = !1), e;
                });
              }),
              (e.prototype.setupIntegrations = function () {
                this._isEnabled() &&
                  (this._integrations = (0, g.setupIntegrations)(
                    this._options,
                  ));
              }),
              (e.prototype.getIntegration = function (e) {
                try {
                  return this._integrations[e.id] || null;
                } catch (t) {
                  return (
                    l.logger.warn(
                      "Cannot retrieve integration " +
                        e.id +
                        " from the current Client",
                    ),
                    null
                  );
                }
              }),
              (e.prototype._updateSessionFromEvent = function (e, t) {
                var n,
                  s,
                  a,
                  r = !1,
                  l = !1,
                  c = t.exception && t.exception.values;
                if (c) {
                  l = !0;
                  try {
                    for (
                      var m = (0, i.__values)(c), u = m.next();
                      !u.done;
                      u = m.next()
                    ) {
                      var p = u.value.mechanism;
                      if (p && !1 === p.handled) {
                        r = !0;
                        break;
                      }
                    }
                  } catch (e) {
                    n = { error: e };
                  } finally {
                    try {
                      u && !u.done && (s = m.return) && s.call(m);
                    } finally {
                      if (n) throw n.error;
                    }
                  }
                }
                var d = t.user;
                if (!e.userAgent) {
                  var h = t.request ? t.request.headers : {};
                  for (var g in h)
                    if ("user-agent" === g.toLowerCase()) {
                      a = h[g];
                      break;
                    }
                }
                e.update(
                  (0, i.__assign)(
                    (0, i.__assign)(
                      {},
                      r && { status: o.SessionStatus.Crashed },
                    ),
                    {
                      user: d,
                      userAgent: a,
                      errors: e.errors + Number(l || r),
                    },
                  ),
                );
              }),
              (e.prototype._sendSession = function (e) {
                this._getBackend().sendSession(e);
              }),
              (e.prototype._isClientProcessing = function (e) {
                var t = this;
                return new c.SyncPromise(function (n) {
                  var i = 0,
                    s = setInterval(function () {
                      0 == t._processing
                        ? (clearInterval(s), n(!0))
                        : ((i += 1), e && i >= e && (clearInterval(s), n(!1)));
                    }, 1);
                });
              }),
              (e.prototype._getBackend = function () {
                return this._backend;
              }),
              (e.prototype._isEnabled = function () {
                return !1 !== this.getOptions().enabled && void 0 !== this._dsn;
              }),
              (e.prototype._prepareEvent = function (e, t, n) {
                var o = this,
                  a = this.getOptions().normalizeDepth,
                  r = void 0 === a ? 3 : a,
                  l = (0, i.__assign)((0, i.__assign)({}, e), {
                    event_id:
                      e.event_id ||
                      (n && n.event_id ? n.event_id : (0, m.uuid4)()),
                    timestamp: e.timestamp || (0, u.dateTimestampInSeconds)(),
                  });
                this._applyClientOptions(l), this._applyIntegrationsMetadata(l);
                var p = t;
                n &&
                  n.captureContext &&
                  (p = s.Scope.clone(p).update(n.captureContext));
                var d = c.SyncPromise.resolve(l);
                return (
                  p && (d = p.applyToEvent(l, n)),
                  d.then(function (e) {
                    return "number" == typeof r && r > 0
                      ? o._normalizeEvent(e, r)
                      : e;
                  })
                );
              }),
              (e.prototype._normalizeEvent = function (e, t) {
                if (!e) return null;
                var n = (0, i.__assign)(
                  (0, i.__assign)(
                    (0, i.__assign)(
                      (0, i.__assign)(
                        (0, i.__assign)({}, e),
                        e.breadcrumbs && {
                          breadcrumbs: e.breadcrumbs.map(function (e) {
                            return (0, i.__assign)(
                              (0, i.__assign)({}, e),
                              e.data && { data: (0, p.normalize)(e.data, t) },
                            );
                          }),
                        },
                      ),
                      e.user && { user: (0, p.normalize)(e.user, t) },
                    ),
                    e.contexts && { contexts: (0, p.normalize)(e.contexts, t) },
                  ),
                  e.extra && { extra: (0, p.normalize)(e.extra, t) },
                );
                return (
                  e.contexts &&
                    e.contexts.trace &&
                    (n.contexts.trace = e.contexts.trace),
                  n
                );
              }),
              (e.prototype._applyClientOptions = function (e) {
                var t = this.getOptions(),
                  n = t.environment,
                  i = t.release,
                  s = t.dist,
                  o = t.maxValueLength,
                  a = void 0 === o ? 250 : o;
                "environment" in e ||
                  (e.environment = "environment" in t ? n : "production"),
                  void 0 === e.release && void 0 !== i && (e.release = i),
                  void 0 === e.dist && void 0 !== s && (e.dist = s),
                  e.message && (e.message = (0, d.truncate)(e.message, a));
                var r =
                  e.exception && e.exception.values && e.exception.values[0];
                r && r.value && (r.value = (0, d.truncate)(r.value, a));
                var l = e.request;
                l && l.url && (l.url = (0, d.truncate)(l.url, a));
              }),
              (e.prototype._applyIntegrationsMetadata = function (e) {
                var t = e.sdk,
                  n = Object.keys(this._integrations);
                t && n.length > 0 && (t.integrations = n);
              }),
              (e.prototype._sendEvent = function (e) {
                this._getBackend().sendEvent(e);
              }),
              (e.prototype._captureEvent = function (e, t, n) {
                return this._processEvent(e, t, n).then(
                  function (e) {
                    return e.event_id;
                  },
                  function (e) {
                    l.logger.error(e);
                  },
                );
              }),
              (e.prototype._processEvent = function (e, t, n) {
                var i = this,
                  s = this.getOptions(),
                  o = s.beforeSend,
                  a = s.sampleRate;
                if (!this._isEnabled())
                  return c.SyncPromise.reject(
                    new h.SentryError("SDK not enabled, will not send event."),
                  );
                var l = "transaction" === e.type;
                return !l && "number" == typeof a && Math.random() > a
                  ? c.SyncPromise.reject(
                      new h.SentryError(
                        "Discarding event because it's not included in the random sample (sampling rate = " +
                          a +
                          ")",
                      ),
                    )
                  : this._prepareEvent(e, n, t)
                      .then(function (e) {
                        if (null === e)
                          throw new h.SentryError(
                            "An event processor returned null, will not send event.",
                          );
                        if (
                          (t && t.data && !0 === t.data.__sentry__) ||
                          l ||
                          !o
                        )
                          return e;
                        var n = o(e, t);
                        if (void 0 === n)
                          throw new h.SentryError(
                            "`beforeSend` method has to return `null` or a valid event.",
                          );
                        return (0, r.isThenable)(n)
                          ? n.then(
                              function (e) {
                                return e;
                              },
                              function (e) {
                                throw new h.SentryError(
                                  "beforeSend rejected with " + e,
                                );
                              },
                            )
                          : n;
                      })
                      .then(function (e) {
                        if (null === e)
                          throw new h.SentryError(
                            "`beforeSend` returned `null`, will not send event.",
                          );
                        var t = n && n.getSession && n.getSession();
                        return (
                          !l && t && i._updateSessionFromEvent(t, e),
                          i._sendEvent(e),
                          e
                        );
                      })
                      .then(null, function (e) {
                        if (e instanceof h.SentryError) throw e;
                        throw (
                          (i.captureException(e, {
                            data: { __sentry__: !0 },
                            originalException: e,
                          }),
                          new h.SentryError(
                            "Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: " +
                              e,
                          ))
                        );
                      });
              }),
              (e.prototype._process = function (e) {
                var t = this;
                (this._processing += 1),
                  e.then(
                    function (e) {
                      return (t._processing -= 1), e;
                    },
                    function (e) {
                      return (t._processing -= 1), e;
                    },
                  );
              }),
              e
            );
          })();
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            getIntegrationsToSetup: () => l,
            installedIntegrations: () => r,
            setupIntegration: () => c,
            setupIntegrations: () => m,
          });
        var i = n(8),
          s = n(7),
          o = n(20),
          a = n(21),
          r = [];
        function l(e) {
          var t =
              (e.defaultIntegrations &&
                (0, i.__spread)(e.defaultIntegrations)) ||
              [],
            n = e.integrations,
            s = [];
          if (Array.isArray(n)) {
            var o = n.map(function (e) {
                return e.name;
              }),
              a = [];
            t.forEach(function (e) {
              -1 === o.indexOf(e.name) &&
                -1 === a.indexOf(e.name) &&
                (s.push(e), a.push(e.name));
            }),
              n.forEach(function (e) {
                -1 === a.indexOf(e.name) && (s.push(e), a.push(e.name));
              });
          } else
            "function" == typeof n
              ? ((s = n(t)), (s = Array.isArray(s) ? s : [s]))
              : (s = (0, i.__spread)(t));
          var r = s.map(function (e) {
              return e.name;
            }),
            l = "Debug";
          return (
            -1 !== r.indexOf(l) &&
              s.push.apply(s, (0, i.__spread)(s.splice(r.indexOf(l), 1))),
            s
          );
        }
        function c(e) {
          -1 === r.indexOf(e.name) &&
            (e.setupOnce(s.addGlobalEventProcessor, o.getCurrentHub),
            r.push(e.name),
            a.logger.log("Integration installed: " + e.name));
        }
        function m(e) {
          var t = {};
          return (
            l(e).forEach(function (e) {
              (t[e.name] = e), c(e);
            }),
            t
          );
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            close: () => k,
            defaultIntegrations: () => f,
            flush: () => x,
            forceLoad: () => y,
            init: () => S,
            lastEventId: () => b,
            onLoad: () => v,
            showReportDialog: () => _,
            wrap: () => E,
          });
        var i = n(48),
          s = n(49),
          o = n(54),
          a = n(20),
          r = n(11),
          l = n(18),
          c = n(24),
          m = n(41),
          u = n(50),
          p = n(43),
          d = n(51),
          h = n(52),
          g = n(53),
          f = [
            new i.InboundFilters(),
            new s.FunctionToString(),
            new u.TryCatch(),
            new p.Breadcrumbs(),
            new d.GlobalHandlers(),
            new h.LinkedErrors(),
            new g.UserAgent(),
          ];
        function S(e) {
          if (
            (void 0 === e && (e = {}),
            void 0 === e.defaultIntegrations && (e.defaultIntegrations = f),
            void 0 === e.release)
          ) {
            var t = (0, r.getGlobalObject)();
            t.SENTRY_RELEASE &&
              t.SENTRY_RELEASE.id &&
              (e.release = t.SENTRY_RELEASE.id);
          }
          void 0 === e.autoSessionTracking && (e.autoSessionTracking = !1),
            (0, o.initAndBind)(c.BrowserClient, e),
            e.autoSessionTracking &&
              (function () {
                var e = (0, r.getGlobalObject)(),
                  t = (0, a.getCurrentHub)(),
                  n = "complete" === document.readyState,
                  i = !1,
                  s = function () {
                    i && n && t.endSession();
                  },
                  o = function () {
                    (n = !0), s(), e.removeEventListener("load", o);
                  };
                t.startSession(), n || e.addEventListener("load", o);
                try {
                  var l = new PerformanceObserver(function (e, t) {
                      e.getEntries().forEach(function (e) {
                        "first-contentful-paint" === e.name &&
                          e.startTime < c &&
                          (t.disconnect(), (i = !0), s());
                      });
                    }),
                    c = "hidden" === document.visibilityState ? 0 : 1 / 0;
                  document.addEventListener(
                    "visibilitychange",
                    function (e) {
                      c = Math.min(c, e.timeStamp);
                    },
                    { once: !0 },
                  ),
                    l.observe({ type: "paint", buffered: !0 });
                } catch (e) {
                  (i = !0), s();
                }
              })();
        }
        function _(e) {
          void 0 === e && (e = {}),
            e.eventId || (e.eventId = (0, a.getCurrentHub)().lastEventId());
          var t = (0, a.getCurrentHub)().getClient();
          t && t.showReportDialog(e);
        }
        function b() {
          return (0, a.getCurrentHub)().lastEventId();
        }
        function y() {}
        function v(e) {
          e();
        }
        function x(e) {
          var t = (0, a.getCurrentHub)().getClient();
          return t ? t.flush(e) : l.SyncPromise.reject(!1);
        }
        function k(e) {
          var t = (0, a.getCurrentHub)().getClient();
          return t ? t.close(e) : l.SyncPromise.reject(!1);
        }
        function E(e) {
          return (0, m.wrap)(e)();
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { InboundFilters: () => m });
        var i = n(8),
          s = n(7),
          o = n(20),
          a = n(21),
          r = n(11),
          l = n(17),
          c = [
            /^Script error\.?$/,
            /^Javascript error: Script error\.? on line 0$/,
          ],
          m = (function () {
            function e(t) {
              void 0 === t && (t = {}), (this._options = t), (this.name = e.id);
            }
            return (
              (e.prototype.setupOnce = function () {
                (0, s.addGlobalEventProcessor)(function (t) {
                  var n = (0, o.getCurrentHub)();
                  if (!n) return t;
                  var i = n.getIntegration(e);
                  if (i) {
                    var s = n.getClient(),
                      a = s ? s.getOptions() : {},
                      r = i._mergeOptions(a);
                    if (i._shouldDropEvent(t, r)) return null;
                  }
                  return t;
                });
              }),
              (e.prototype._shouldDropEvent = function (e, t) {
                return this._isSentryError(e, t)
                  ? (a.logger.warn(
                      "Event dropped due to being internal Sentry Error.\nEvent: " +
                        (0, r.getEventDescription)(e),
                    ),
                    !0)
                  : this._isIgnoredError(e, t)
                    ? (a.logger.warn(
                        "Event dropped due to being matched by `ignoreErrors` option.\nEvent: " +
                          (0, r.getEventDescription)(e),
                      ),
                      !0)
                    : this._isDeniedUrl(e, t)
                      ? (a.logger.warn(
                          "Event dropped due to being matched by `denyUrls` option.\nEvent: " +
                            (0, r.getEventDescription)(e) +
                            ".\nUrl: " +
                            this._getEventFilterUrl(e),
                        ),
                        !0)
                      : !this._isAllowedUrl(e, t) &&
                        (a.logger.warn(
                          "Event dropped due to not being matched by `allowUrls` option.\nEvent: " +
                            (0, r.getEventDescription)(e) +
                            ".\nUrl: " +
                            this._getEventFilterUrl(e),
                        ),
                        !0);
              }),
              (e.prototype._isSentryError = function (e, t) {
                if (!t.ignoreInternal) return !1;
                try {
                  return (
                    (e &&
                      e.exception &&
                      e.exception.values &&
                      e.exception.values[0] &&
                      "SentryError" === e.exception.values[0].type) ||
                    !1
                  );
                } catch (e) {
                  return !1;
                }
              }),
              (e.prototype._isIgnoredError = function (e, t) {
                return (
                  !(!t.ignoreErrors || !t.ignoreErrors.length) &&
                  this._getPossibleEventMessages(e).some(function (e) {
                    return t.ignoreErrors.some(function (t) {
                      return (0, l.isMatchingPattern)(e, t);
                    });
                  })
                );
              }),
              (e.prototype._isDeniedUrl = function (e, t) {
                if (!t.denyUrls || !t.denyUrls.length) return !1;
                var n = this._getEventFilterUrl(e);
                return (
                  !!n &&
                  t.denyUrls.some(function (e) {
                    return (0, l.isMatchingPattern)(n, e);
                  })
                );
              }),
              (e.prototype._isAllowedUrl = function (e, t) {
                if (!t.allowUrls || !t.allowUrls.length) return !0;
                var n = this._getEventFilterUrl(e);
                return (
                  !n ||
                  t.allowUrls.some(function (e) {
                    return (0, l.isMatchingPattern)(n, e);
                  })
                );
              }),
              (e.prototype._mergeOptions = function (e) {
                return (
                  void 0 === e && (e = {}),
                  {
                    allowUrls: (0, i.__spread)(
                      this._options.whitelistUrls || [],
                      this._options.allowUrls || [],
                      e.whitelistUrls || [],
                      e.allowUrls || [],
                    ),
                    denyUrls: (0, i.__spread)(
                      this._options.blacklistUrls || [],
                      this._options.denyUrls || [],
                      e.blacklistUrls || [],
                      e.denyUrls || [],
                    ),
                    ignoreErrors: (0, i.__spread)(
                      this._options.ignoreErrors || [],
                      e.ignoreErrors || [],
                      c,
                    ),
                    ignoreInternal:
                      void 0 === this._options.ignoreInternal ||
                      this._options.ignoreInternal,
                  }
                );
              }),
              (e.prototype._getPossibleEventMessages = function (e) {
                if (e.message) return [e.message];
                if (e.exception)
                  try {
                    var t = (e.exception.values && e.exception.values[0]) || {},
                      n = t.type,
                      i = void 0 === n ? "" : n,
                      s = t.value,
                      o = void 0 === s ? "" : s;
                    return ["" + o, i + ": " + o];
                  } catch (t) {
                    return (
                      a.logger.error(
                        "Cannot extract message for event " +
                          (0, r.getEventDescription)(e),
                      ),
                      []
                    );
                  }
                return [];
              }),
              (e.prototype._getEventFilterUrl = function (e) {
                try {
                  if (e.stacktrace) {
                    var t = e.stacktrace.frames;
                    return (t && t[t.length - 1].filename) || null;
                  }
                  if (e.exception) {
                    var n =
                      e.exception.values &&
                      e.exception.values[0].stacktrace &&
                      e.exception.values[0].stacktrace.frames;
                    return (n && n[n.length - 1].filename) || null;
                  }
                  return null;
                } catch (t) {
                  return (
                    a.logger.error(
                      "Cannot extract url for event " +
                        (0, r.getEventDescription)(e),
                    ),
                    null
                  );
                }
              }),
              (e.id = "InboundFilters"),
              e
            );
          })();
      },
      (e, t, n) => {
        "use strict";
        var i;
        n.r(t), n.d(t, { FunctionToString: () => s });
        var s = (function () {
          function e() {
            this.name = e.id;
          }
          return (
            (e.prototype.setupOnce = function () {
              (i = Function.prototype.toString),
                (Function.prototype.toString = function () {
                  for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                  var n = this.__sentry_original__ || this;
                  return i.apply(n, e);
                });
            }),
            (e.id = "FunctionToString"),
            e
          );
        })();
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { TryCatch: () => c });
        var i = n(8),
          s = n(11),
          o = n(13),
          a = n(15),
          r = n(41),
          l = [
            "EventTarget",
            "Window",
            "Node",
            "ApplicationCache",
            "AudioTrackList",
            "ChannelMergerNode",
            "CryptoOperation",
            "EventSource",
            "FileReader",
            "HTMLUnknownElement",
            "IDBDatabase",
            "IDBRequest",
            "IDBTransaction",
            "KeyOperation",
            "MediaController",
            "MessagePort",
            "ModalWindow",
            "Notification",
            "SVGElementInstance",
            "Screen",
            "TextTrack",
            "TextTrackCue",
            "TextTrackList",
            "WebSocket",
            "WebSocketWorker",
            "Worker",
            "XMLHttpRequest",
            "XMLHttpRequestEventTarget",
            "XMLHttpRequestUpload",
          ],
          c = (function () {
            function e(t) {
              (this.name = e.id),
                (this._options = (0, i.__assign)(
                  {
                    XMLHttpRequest: !0,
                    eventTarget: !0,
                    requestAnimationFrame: !0,
                    setInterval: !0,
                    setTimeout: !0,
                  },
                  t,
                ));
            }
            return (
              (e.prototype.setupOnce = function () {
                var e = (0, s.getGlobalObject)();
                (this._options.setTimeout &&
                  (0, o.fill)(
                    e,
                    "setTimeout",
                    this._wrapTimeFunction.bind(this),
                  ),
                this._options.setInterval &&
                  (0, o.fill)(
                    e,
                    "setInterval",
                    this._wrapTimeFunction.bind(this),
                  ),
                this._options.requestAnimationFrame &&
                  (0, o.fill)(
                    e,
                    "requestAnimationFrame",
                    this._wrapRAF.bind(this),
                  ),
                this._options.XMLHttpRequest &&
                  "XMLHttpRequest" in e &&
                  (0, o.fill)(
                    XMLHttpRequest.prototype,
                    "send",
                    this._wrapXHR.bind(this),
                  ),
                this._options.eventTarget) &&
                  (Array.isArray(this._options.eventTarget)
                    ? this._options.eventTarget
                    : l
                  ).forEach(this._wrapEventTarget.bind(this));
              }),
              (e.prototype._wrapTimeFunction = function (e) {
                return function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  var i = t[0];
                  return (
                    (t[0] = (0, r.wrap)(i, {
                      mechanism: {
                        data: { function: (0, a.getFunctionName)(e) },
                        handled: !0,
                        type: "instrument",
                      },
                    })),
                    e.apply(this, t)
                  );
                };
              }),
              (e.prototype._wrapRAF = function (e) {
                return function (t) {
                  return e.call(
                    this,
                    (0, r.wrap)(t, {
                      mechanism: {
                        data: {
                          function: "requestAnimationFrame",
                          handler: (0, a.getFunctionName)(e),
                        },
                        handled: !0,
                        type: "instrument",
                      },
                    }),
                  );
                };
              }),
              (e.prototype._wrapEventTarget = function (e) {
                var t = (0, s.getGlobalObject)(),
                  n = t[e] && t[e].prototype;
                n &&
                  n.hasOwnProperty &&
                  n.hasOwnProperty("addEventListener") &&
                  ((0, o.fill)(n, "addEventListener", function (t) {
                    return function (n, i, s) {
                      try {
                        "function" == typeof i.handleEvent &&
                          (i.handleEvent = (0, r.wrap)(i.handleEvent.bind(i), {
                            mechanism: {
                              data: {
                                function: "handleEvent",
                                handler: (0, a.getFunctionName)(i),
                                target: e,
                              },
                              handled: !0,
                              type: "instrument",
                            },
                          }));
                      } catch (e) {}
                      return t.call(
                        this,
                        n,
                        (0, r.wrap)(i, {
                          mechanism: {
                            data: {
                              function: "addEventListener",
                              handler: (0, a.getFunctionName)(i),
                              target: e,
                            },
                            handled: !0,
                            type: "instrument",
                          },
                        }),
                        s,
                      );
                    };
                  }),
                  (0, o.fill)(n, "removeEventListener", function (e) {
                    return function (t, n, i) {
                      var s,
                        o = n;
                      try {
                        var a =
                          null === (s = o) || void 0 === s
                            ? void 0
                            : s.__sentry_wrapped__;
                        a && e.call(this, t, a, i);
                      } catch (e) {}
                      return e.call(this, t, o, i);
                    };
                  }));
              }),
              (e.prototype._wrapXHR = function (e) {
                return function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  var i = this;
                  return (
                    [
                      "onload",
                      "onerror",
                      "onprogress",
                      "onreadystatechange",
                    ].forEach(function (e) {
                      e in i &&
                        "function" == typeof i[e] &&
                        (0, o.fill)(i, e, function (t) {
                          var n = {
                            mechanism: {
                              data: {
                                function: e,
                                handler: (0, a.getFunctionName)(t),
                              },
                              handled: !0,
                              type: "instrument",
                            },
                          };
                          return (
                            t.__sentry_original__ &&
                              (n.mechanism.data.handler = (0,
                              a.getFunctionName)(t.__sentry_original__)),
                            (0, r.wrap)(t, n)
                          );
                        });
                    }),
                    e.apply(this, t)
                  );
                };
              }),
              (e.id = "TryCatch"),
              e
            );
          })();
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { GlobalHandlers: () => p });
        var i = n(8),
          s = n(20),
          o = n(5),
          a = n(21),
          r = n(44),
          l = n(9),
          c = n(11),
          m = n(26),
          u = n(41),
          p = (function () {
            function e(t) {
              (this.name = e.id),
                (this._onErrorHandlerInstalled = !1),
                (this._onUnhandledRejectionHandlerInstalled = !1),
                (this._options = (0, i.__assign)(
                  { onerror: !0, onunhandledrejection: !0 },
                  t,
                ));
            }
            return (
              (e.prototype.setupOnce = function () {
                (Error.stackTraceLimit = 50),
                  this._options.onerror &&
                    (a.logger.log("Global Handler attached: onerror"),
                    this._installGlobalOnErrorHandler()),
                  this._options.onunhandledrejection &&
                    (a.logger.log(
                      "Global Handler attached: onunhandledrejection",
                    ),
                    this._installGlobalOnUnhandledRejectionHandler());
              }),
              (e.prototype._installGlobalOnErrorHandler = function () {
                var t = this;
                this._onErrorHandlerInstalled ||
                  ((0, r.addInstrumentationHandler)({
                    callback: function (n) {
                      var i = n.error,
                        o = (0, s.getCurrentHub)(),
                        a = o.getIntegration(e),
                        r = i && !0 === i.__sentry_own_request__;
                      if (a && !(0, u.shouldIgnoreOnError)() && !r) {
                        var p = o.getClient(),
                          d = (0, l.isPrimitive)(i)
                            ? t._eventFromIncompleteOnError(
                                n.msg,
                                n.url,
                                n.line,
                                n.column,
                              )
                            : t._enhanceEventWithInitialFrame(
                                (0, m.eventFromUnknownInput)(i, void 0, {
                                  attachStacktrace:
                                    p && p.getOptions().attachStacktrace,
                                  rejection: !1,
                                }),
                                n.url,
                                n.line,
                                n.column,
                              );
                        (0, c.addExceptionMechanism)(d, {
                          handled: !1,
                          type: "onerror",
                        }),
                          o.captureEvent(d, { originalException: i });
                      }
                    },
                    type: "error",
                  }),
                  (this._onErrorHandlerInstalled = !0));
              }),
              (e.prototype._installGlobalOnUnhandledRejectionHandler =
                function () {
                  var t = this;
                  this._onUnhandledRejectionHandlerInstalled ||
                    ((0, r.addInstrumentationHandler)({
                      callback: function (n) {
                        var i = n;
                        try {
                          "reason" in n
                            ? (i = n.reason)
                            : "detail" in n &&
                              "reason" in n.detail &&
                              (i = n.detail.reason);
                        } catch (e) {}
                        var a = (0, s.getCurrentHub)(),
                          r = a.getIntegration(e),
                          p = i && !0 === i.__sentry_own_request__;
                        if (!r || (0, u.shouldIgnoreOnError)() || p) return !0;
                        var d = a.getClient(),
                          h = (0, l.isPrimitive)(i)
                            ? t._eventFromRejectionWithPrimitive(i)
                            : (0, m.eventFromUnknownInput)(i, void 0, {
                                attachStacktrace:
                                  d && d.getOptions().attachStacktrace,
                                rejection: !0,
                              });
                        (h.level = o.Severity.Error),
                          (0, c.addExceptionMechanism)(h, {
                            handled: !1,
                            type: "onunhandledrejection",
                          }),
                          a.captureEvent(h, { originalException: i });
                      },
                      type: "unhandledrejection",
                    }),
                    (this._onUnhandledRejectionHandlerInstalled = !0));
                }),
              (e.prototype._eventFromIncompleteOnError = function (e, t, n, i) {
                var s,
                  o = (0, l.isErrorEvent)(e) ? e.message : e;
                if ((0, l.isString)(o)) {
                  var a = o.match(
                    /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i,
                  );
                  a && ((s = a[1]), (o = a[2]));
                }
                var r = {
                  exception: { values: [{ type: s || "Error", value: o }] },
                };
                return this._enhanceEventWithInitialFrame(r, t, n, i);
              }),
              (e.prototype._eventFromRejectionWithPrimitive = function (e) {
                return {
                  exception: {
                    values: [
                      {
                        type: "UnhandledRejection",
                        value:
                          "Non-Error promise rejection captured with value: " +
                          String(e),
                      },
                    ],
                  },
                };
              }),
              (e.prototype._enhanceEventWithInitialFrame = function (
                e,
                t,
                n,
                i,
              ) {
                (e.exception = e.exception || {}),
                  (e.exception.values = e.exception.values || []),
                  (e.exception.values[0] = e.exception.values[0] || {}),
                  (e.exception.values[0].stacktrace =
                    e.exception.values[0].stacktrace || {}),
                  (e.exception.values[0].stacktrace.frames =
                    e.exception.values[0].stacktrace.frames || []);
                var s = isNaN(parseInt(i, 10)) ? void 0 : i,
                  o = isNaN(parseInt(n, 10)) ? void 0 : n,
                  a =
                    (0, l.isString)(t) && t.length > 0
                      ? t
                      : (0, c.getLocationHref)();
                return (
                  0 === e.exception.values[0].stacktrace.frames.length &&
                    e.exception.values[0].stacktrace.frames.push({
                      colno: s,
                      filename: a,
                      function: "?",
                      in_app: !0,
                      lineno: o,
                    }),
                  e
                );
              }),
              (e.id = "GlobalHandlers"),
              e
            );
          })();
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { LinkedErrors: () => c });
        var i = n(8),
          s = n(7),
          o = n(20),
          a = n(9),
          r = n(27),
          l = n(28),
          c = (function () {
            function e(t) {
              void 0 === t && (t = {}),
                (this.name = e.id),
                (this._key = t.key || "cause"),
                (this._limit = t.limit || 5);
            }
            return (
              (e.prototype.setupOnce = function () {
                (0, s.addGlobalEventProcessor)(function (t, n) {
                  var i = (0, o.getCurrentHub)().getIntegration(e);
                  return i ? i._handler(t, n) : t;
                });
              }),
              (e.prototype._handler = function (e, t) {
                if (
                  !(
                    e.exception &&
                    e.exception.values &&
                    t &&
                    (0, a.isInstanceOf)(t.originalException, Error)
                  )
                )
                  return e;
                var n = this._walkErrorTree(t.originalException, this._key);
                return (
                  (e.exception.values = (0, i.__spread)(n, e.exception.values)),
                  e
                );
              }),
              (e.prototype._walkErrorTree = function (e, t, n) {
                if (
                  (void 0 === n && (n = []),
                  !(0, a.isInstanceOf)(e[t], Error) ||
                    n.length + 1 >= this._limit)
                )
                  return n;
                var s = (0, l.computeStackTrace)(e[t]),
                  o = (0, r.exceptionFromStacktrace)(s);
                return this._walkErrorTree(e[t], t, (0, i.__spread)([o], n));
              }),
              (e.id = "LinkedErrors"),
              e
            );
          })();
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { UserAgent: () => r });
        var i = n(8),
          s = n(7),
          o = n(20),
          a = (0, n(11).getGlobalObject)(),
          r = (function () {
            function e() {
              this.name = e.id;
            }
            return (
              (e.prototype.setupOnce = function () {
                (0, s.addGlobalEventProcessor)(function (t) {
                  var n, s, r;
                  if ((0, o.getCurrentHub)().getIntegration(e)) {
                    if (!a.navigator && !a.location && !a.document) return t;
                    var l =
                        (null === (n = t.request) || void 0 === n
                          ? void 0
                          : n.url) ||
                        (null === (s = a.location) || void 0 === s
                          ? void 0
                          : s.href),
                      c = (a.document || {}).referrer,
                      m = (a.navigator || {}).userAgent,
                      u = (0, i.__assign)(
                        (0, i.__assign)(
                          (0, i.__assign)(
                            {},
                            null === (r = t.request) || void 0 === r
                              ? void 0
                              : r.headers,
                          ),
                          c && { Referer: c },
                        ),
                        m && { "User-Agent": m },
                      ),
                      p = (0, i.__assign)(
                        (0, i.__assign)({}, l && { url: l }),
                        { headers: u },
                      );
                    return (0, i.__assign)((0, i.__assign)({}, t), {
                      request: p,
                    });
                  }
                  return t;
                });
              }),
              (e.id = "UserAgent"),
              e
            );
          })();
      },
      (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { initAndBind: () => o });
        var i = n(20),
          s = n(21);
        function o(e, t) {
          !0 === t.debug && s.logger.enable();
          var n = (0, i.getCurrentHub)(),
            o = new e(t);
          n.bindClient(o);
        }
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            FunctionToString: () => i.FunctionToString,
            InboundFilters: () => s.InboundFilters,
          });
        var i = n(49),
          s = n(48);
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            Breadcrumbs: () => o.Breadcrumbs,
            GlobalHandlers: () => i.GlobalHandlers,
            LinkedErrors: () => a.LinkedErrors,
            TryCatch: () => s.TryCatch,
            UserAgent: () => r.UserAgent,
          });
        var i = n(51),
          s = n(50),
          o = n(43),
          a = n(52),
          r = n(53);
      },
      (e, t, n) => {
        "use strict";
        n.r(t),
          n.d(t, {
            BaseTransport: () => i.BaseTransport,
            FetchTransport: () => s.FetchTransport,
            XHRTransport: () => o.XHRTransport,
          });
        var i = n(32),
          s = n(30),
          o = n(38);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i,
          s = (i = n(1)) && i.__esModule ? i : { default: i };
        t.default = class {
          static getAudioManager() {
            if (!this._audioManager) {
              const e = s.default.getProvider().get("rcp-fe-audio");
              this._audioManager = e.createAudioManager(
                "rcp-fe-lol-champ-select",
              );
            }
            return this._audioManager;
          }
          static createSound(e, t, n) {
            return this.getAudioManager().createSound(e, t, n);
          }
          static playSound(e, t, n) {
            return this.getAudioManager().playSound(e, t, n);
          }
          static dispose() {
            this._audioManager &&
              (this._audioManager.dispose(), (this._audioManager = null));
          }
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default =
            t.PositionAssignmentPreloadVideos =
            t.PositionAssignmentPinVideos =
            t.MapVideos =
              void 0);
        var i = n(1),
          s = n(60);
        const { RunMixin: o } = i.EmberAddons.EmberLifeline;
        n(61);
        const a = {
          redIntro:
            "/fe/lol-champ-select/video/position-assignment-intro/map-north-intro.webm",
          blueIntro:
            "/fe/lol-champ-select/video/position-assignment-intro/map-south-intro.webm",
        };
        t.MapVideos = a;
        const r = {
          me: "/fe/lol-champ-select/video/position-assignment/Pin_Me_Intro(Fixed).webm",
          everyone:
            "/fe/lol-champ-select/video/position-assignment/Pin_Intro(Fixed).webm",
        };
        t.PositionAssignmentPinVideos = r;
        const l = [a.redIntro, a.blueIntro, r.me, r.everyone];
        t.PositionAssignmentPreloadVideos = l;
        var c = i.Ember.Component.extend(o, {
          classNames: ["position-assignment"],
          classNameBindings: [
            "isOnRedSide:top-right:bottom-left",
            "shouldPlayVideos:animation-enabled",
            "splashDefocus:defocussed:focussed",
            "hidePins",
          ],
          layout: n(62),
          champSelectSfxService: i.Ember.inject.service("champ-select-sfx"),
          _laneVideoTimeouts: [],
          _pinIntroVideoTimeouts: [],
          didReceiveAttrs: function () {
            if ((this._super(...arguments), this.element)) {
              const e = this.get("showPositionAssignment"),
                t = void 0 !== this.get("localSummoner");
              t && !this._wasInChampSelect && e
                ? (this._startVideoTimeout = this.runTask(
                    this.startPositionAssignment,
                    10,
                  ))
                : this._wasInChampSelect &&
                  !t &&
                  this.cleanupPositionAssignmentVideos(),
                (this._wasInChampSelect = t);
            }
          },
          startPositionAssignment: function () {
            const e = this.get("pinDropSummoners") || [];
            this.schedulePinDropSounds(e),
              this.get("shouldPlayVideos") &&
                this.element.querySelector(".map-intro-video").play(),
              e.forEach((e) => {
                if (!e.get("isPlaceholder")) {
                  const t = e.get("slotId"),
                    n = e.get("lane"),
                    i = (t + 1) * s.DURATIONS.pinAnimation + 130,
                    o = (t + 1) * s.DURATIONS.pinAnimation;
                  this._laneVideoTimeouts.push(
                    this.runTask(() => this.playLaneVideo(n), o),
                  ),
                    this._pinIntroVideoTimeouts.push(
                      this.runTask(() => this.playPinIntroVideo(t), i),
                    );
                }
              });
          },
          schedulePinDropSounds(e) {
            const t = e.map((e) => {
              const t = e.get("slotId");
              return {
                eventType: e.get("isLocalSummoner")
                  ? "pin-drop-local-player"
                  : `pin-drop-ally-${t}`,
                delayMillis: 700 * (t + 1) + 10,
              };
            });
            this.get("champSelectSfxService").handleSfxNotifications(t);
          },
          playLaneVideo(e) {
            if (!this.get("shouldPlayVideos")) return;
            const t = this.get("mapSide"),
              n = this.element.querySelector(`.lane-intro-video.${t}-${e}`);
            n && ((n.currentTime = 0), n.play());
          },
          playPinIntroVideo(e) {
            if (this.get("shouldPlayVideos")) {
              const t = this.element.querySelector(
                `.position-assignment-pin.slot-${e} .pin-intro-video`,
              );
              t && ((t.style.visibility = "visible"), t.play());
            } else {
              const t = this.element.querySelector(
                `.position-assignment-pin.slot-${e} .pin-static-image`,
              );
              t && (t.style.visibility = "visible");
            }
            const t = this.element.querySelector(
              `.position-assignment-pin.slot-${e} .pin-position-icon`,
            );
            t && (t.style.visibility = "visible");
          },
          cleanupPositionAssignmentVideos: function () {
            this.cancelTask(this._startVideoTimeout),
              this._laneVideoTimeouts.forEach((e) => this.cancelTask(e)),
              this._pinIntroVideoTimeouts.forEach((e) => this.cancelTask(e)),
              (this._laneVideoTimeouts = []),
              (this._pinIntroVideoTimeouts = []),
              (this.get("pinDropSummoners") || []).forEach((e) => {
                const t = e.get("slotId"),
                  n = this.element.querySelector(
                    `.position-assignment-pin.slot-${t} .pin-intro-video`,
                  );
                n && (n.style.visibility = "hidden");
                const i = this.element.querySelector(
                  `.position-assignment-pin.slot-${t} .pin-static-image`,
                );
                i && (i.style.visibility = "hidden");
                const s = this.element.querySelector(
                  `.position-assignment-pin.slot-${t} .pin-position-icon`,
                );
                s && (s.style.visibility = "hidden");
              });
          },
          isOnRedSide: i.Ember.computed("mapSide", function () {
            return "red" === this.get("mapSide");
          }),
          mapIntroPath: i.Ember.computed("isOnRedSide", function () {
            return this.get("isOnRedSide") ? a.redIntro : a.blueIntro;
          }),
          localSummoner: i.Ember.computed(
            "pinDropSummoners.@each.isLocalSummoner",
            function () {
              return (this.get("pinDropSummoners") || []).find((e) =>
                e.get("isLocalSummoner"),
              );
            },
          ),
          localSummonerSlotClass: i.Ember.computed(
            "localSummoner.slotId",
            function () {
              return `slot-id-${this.get("localSummoner.slotId")}`;
            },
          ),
          assignedPositionLabel: i.Ember.computed(
            "localSummoner.position",
            function () {
              const e = this.get("localSummoner.position");
              return this.get(`tra.summoner_assigned_position_${e}`);
            },
          ),
          isMapIntroVisible: i.Ember.computed(
            "shouldPlayVideos",
            "showPositionAssignment",
            function () {
              return (
                this.get("showPositionAssignment") &&
                this.get("shouldPlayVideos")
              );
            },
          ),
        });
        t.default = c;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.skinProductTypes =
            t.VOTE_MAJORITY_THRESHOLD =
            t.TIMER_PHASES =
            t.SUMMONER_OBJECT_SIZE =
            t.STANDARD_MAX_TEAM_SIZE =
            t.SOUNDS_PATH =
            t.SFX_CHANNEL =
            t.SCREENS =
            t.RUNES =
            t.RANDOM_CHAMP =
            t.QUEST_SKIN_TAG =
            t.POSITION_TOP =
            t.POSITION_SUPPORT =
            t.POSITION_NONE =
            t.POSITION_MIDDLE =
            t.POSITION_JUNGLE =
            t.POSITION_BOTTOM =
            t.POSITION_ANY =
            t.POSITIONS =
            t.NONE_CHAMP_ID =
            t.NEXUS_BLITZ_QUEUE_IDS =
            t.NAME_VISIBILITY_TYPE =
            t.MINUTE_SECOND_TIME_DISPLAY_THRESHOLD_MS =
            t.INVALID_SPELL_ID =
            t.GAME_MODES_WITH_SUBTEAMS =
            t.GAME_MODES_WITH_NO_BAN_DELAY_TIMERS =
            t.GAME_MODES_WITH_COMPANIONS =
            t.GAME_MODES_WITH_CHEST_AVAILABILITY_ENABLED =
            t.GAMEFLOW_PHASE_CHAMP_SELECT =
            t.FINALIZATION_PHASE_CEREMONIES =
            t.DURATIONS =
            t.DRAFT_PICK_MODES =
            t.DISCONNECT_ERROR_INDICATORS =
            t.DEFAULT_DISCONNECT_SHOULD_EXIT_DELAY_MS =
            t.DEFAULT_DISCONNECT_DELAY_MS =
            t.CHAMP_SELECT_PAW_SOURCE =
            t.CHAMPION_BENCH_SWAP_COOLDOWN_MS =
            t.CHAMPION_BENCH_SOUND_COOLDOWN_MS =
            t.CHAMPION_BENCH_SIZE =
            t.CHAMPION_BENCH_NON_PRIORITISED_PREFILL_COOLDOWN_MS =
            t.CHAMPION_BENCH_ALLY_SWAP_COOLDOWN_MS =
            t.CEREMONIES =
              void 0);
        t.SCREENS = {
          pick: "pick-screen",
          banShowcase: "ban-showcase-screen",
          selected: "selected-screen",
          positionAssignment: "position-assignment-screen",
          gameStarting: "game-starting-screen",
        };
        t.TIMER_PHASES = {
          planning: "PLANNING",
          banPick: "BAN_PICK",
          finalization: "FINALIZATION",
          gameStarting: "GAME_STARTING",
        };
        t.GAMEFLOW_PHASE_CHAMP_SELECT = "ChampSelect";
        t.DURATIONS = {
          teamBansAnimationDelayBeforeBanItem: 1750,
          tenBansReveal: 6400,
          tenBansAnimationDelayBetweenEnemyBans: 650,
          tenBansAnimationDelayBeforeEnemyBans: 500,
          tenBansAnimationDelayBeforePickSnipeSound: 750,
          pinAnimation: 630,
          pickPhaseChangeTransition: 1e3,
          pickIntentSeconds: 15,
          actionSoundThreshold: 10,
          showLockedInSplash: 1700,
          timeBeforeShowingReportingTooltipSec: 3,
          timeBeforeHidingReportingTooltipSec: 8,
        };
        const n = {
          tenBansReveal: "ten_bans_reveal",
          tenBansRevealOld: "TEN_BANS_REVEAL",
          phaseTransition: "phase_transition",
          voteTransition: "vote_transition",
          voteReveal: "team_vote_reveal",
        };
        t.CEREMONIES = n;
        const i = [n.voteTransition, n.voteReveal];
        t.FINALIZATION_PHASE_CEREMONIES = i;
        t.RANDOM_CHAMP = { championId: -2 };
        t.NONE_CHAMP_ID = -1;
        t.NEXUS_BLITZ_QUEUE_IDS = [1300, 1301, 1302, 1303, 1304];
        const s = Object.freeze({ ARAM: !0, KINGPORO: !0 });
        t.GAME_MODES_WITH_COMPANIONS = s;
        t.GAME_MODES_WITH_CHEST_AVAILABILITY_ENABLED = ["ARAM"];
        const o = Object.freeze({ CHERRY: !0 });
        t.GAME_MODES_WITH_NO_BAN_DELAY_TIMERS = o;
        t.GAME_MODES_WITH_SUBTEAMS = {
          CHERRY: {
            teamSize: 2,
            teamSizeLabel: "cherry_map_size_label",
            subteams: [
              {
                cellIds: [0, 1],
                display: {
                  label: "cherry_subteam_display_name_poro",
                  icon: "/fe/lol-champ-select/images/subteams/Poro.png",
                },
              },
              {
                cellIds: [2, 3],
                display: {
                  label: "cherry_subteam_display_name_minion",
                  icon: "/fe/lol-champ-select/images/subteams/Minion.png",
                },
              },
              {
                cellIds: [4, 5],
                display: {
                  label: "cherry_subteam_display_name_scuttle",
                  icon: "/fe/lol-champ-select/images/subteams/Scuttle.png",
                },
              },
              {
                cellIds: [6, 7],
                display: {
                  label: "cherry_subteam_display_name_krug",
                  icon: "/fe/lol-champ-select/images/subteams/Krug.png",
                },
              },
            ],
          },
        };
        t.INVALID_SPELL_ID = -1;
        t.SUMMONER_OBJECT_SIZE = 80;
        t.MINUTE_SECOND_TIME_DISPLAY_THRESHOLD_MS = 1e5;
        t.POSITION_TOP = "top";
        const a = "jungle";
        t.POSITION_JUNGLE = a;
        const r = "middle";
        t.POSITION_MIDDLE = r;
        const l = "bottom";
        t.POSITION_BOTTOM = l;
        const c = "support";
        t.POSITION_SUPPORT = c;
        const m = ["top", a, r, l, c];
        t.POSITIONS = m;
        t.POSITION_NONE = "NONE";
        t.POSITION_ANY = "any";
        t.DRAFT_PICK_MODES = [
          "DraftModeSinglePickStrategy",
          "TeamBuilderSimulBanStrategy",
          "TeamBuilderDraftPickStrategy",
          "TournamentPickStrategy",
        ];
        t.RUNES = {
          minChooseRunesEnabledLevel: 8,
          maxTutorialHighlightSeenCount: 9,
          tutorialHighlightActionSeenCountIncrement: 2,
          tutorialHighlightDelay: 5e3,
        };
        t.SOUNDS_PATH = "/fe/lol-champ-select/sounds";
        t.SFX_CHANNEL = "sfx-ui";
        t.STANDARD_MAX_TEAM_SIZE = 5;
        t.VOTE_MAJORITY_THRESHOLD = 0.6;
        t.CHAMP_SELECT_PAW_SOURCE = "champSelect";
        t.CHAMPION_BENCH_SIZE = 10;
        t.CHAMPION_BENCH_SWAP_COOLDOWN_MS = 3e3;
        t.CHAMPION_BENCH_NON_PRIORITISED_PREFILL_COOLDOWN_MS = 1e4;
        t.CHAMPION_BENCH_ALLY_SWAP_COOLDOWN_MS = 600;
        t.CHAMPION_BENCH_SOUND_COOLDOWN_MS = 3e3;
        t.QUEST_SKIN_TAG = "quest-skin";
        t.DISCONNECT_ERROR_INDICATORS = [
          "Failed to deserialize response payload",
          ": GROUP_NOT_FOUND",
          ": Timeout",
          ": SERVICE UNAVAILABLE",
        ];
        t.DEFAULT_DISCONNECT_DELAY_MS = 6e3;
        t.DEFAULT_DISCONNECT_SHOULD_EXIT_DELAY_MS = 4e4;
        t.NAME_VISIBILITY_TYPE = {
          VISIBLE: "VISIBLE",
          HIDDEN: "HIDDEN",
          UNHIDDEN: "UNHIDDEN",
        };
        t.skinProductTypes = {
          kQuestSkin: "kQuestSkin",
          kTieredSkin: "kTieredSkin",
        };
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "q1qeHa9G",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\position-assignment-intro-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\position-assignment-intro-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\position-assignment-intro-component\\\\index.js\\" "],["text","\\n\\n"],["open-element","img",[]],["static-attr","class","map-static-image"],["dynamic-attr","src",["concat",[["unknown",["mapStaticPath"]]]]],["flush-element"],["close-element"],["text","\\n"],["open-element","video",[]],["dynamic-attr","class",["concat",["map-intro-video ",["helper",["if"],[["get",["isMapIntroVisible"]],"visible","hidden"],null]]]],["dynamic-attr","src",["unknown",["mapIntroPath"]],null],["static-attr","preload","auto"],["flush-element"],["close-element"],["text","\\n\\n"],["open-element","video",[]],["static-attr","class","lane-intro-video blue-top"],["static-attr","src","/fe/lol-champ-select/video/position-assignment/Path_South_Top.webm"],["static-attr","preload","auto"],["flush-element"],["close-element"],["text","\\n"],["open-element","video",[]],["static-attr","class","lane-intro-video blue-jungle"],["static-attr","src","/fe/lol-champ-select/video/position-assignment/Path_South_Jungle.webm"],["static-attr","preload","auto"],["flush-element"],["close-element"],["text","\\n"],["open-element","video",[]],["static-attr","class","lane-intro-video blue-middle"],["static-attr","src","/fe/lol-champ-select/video/position-assignment/Path_South_Mid.webm"],["static-attr","preload","auto"],["flush-element"],["close-element"],["text","\\n"],["open-element","video",[]],["static-attr","class","lane-intro-video blue-bottom"],["static-attr","src","/fe/lol-champ-select/video/position-assignment/Path_South_Bot.webm"],["static-attr","preload","auto"],["flush-element"],["close-element"],["text","\\n"],["open-element","video",[]],["static-attr","class","lane-intro-video red-top"],["static-attr","src","/fe/lol-champ-select/video/position-assignment/Path_North_Top.webm"],["static-attr","preload","auto"],["flush-element"],["close-element"],["text","\\n"],["open-element","video",[]],["static-attr","class","lane-intro-video red-jungle"],["static-attr","src","/fe/lol-champ-select/video/position-assignment/Path_North_Jungle.webm"],["static-attr","preload","auto"],["flush-element"],["close-element"],["text","\\n"],["open-element","video",[]],["static-attr","class","lane-intro-video red-middle"],["static-attr","src","/fe/lol-champ-select/video/position-assignment/Path_North_Mid.webm"],["static-attr","preload","auto"],["flush-element"],["close-element"],["text","\\n"],["open-element","video",[]],["static-attr","class","lane-intro-video red-bottom"],["static-attr","src","/fe/lol-champ-select/video/position-assignment/Path_North_Bot.webm"],["static-attr","preload","auto"],["flush-element"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["position-text ",["helper",["if"],[["get",["showPositionAssignment"]],"visible","hidden"],null]," ",["unknown",["localSummonerSlotClass"]]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","position-assignment-title"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","assigned_position_title"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","position-assignment-label"],["flush-element"],["text","\\n    "],["append",["unknown",["assignedPositionLabel"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["unless"],[["get",["hidePins"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["position-assignment-pin slot-",["unknown",["summoner","slotId"]]," ",["helper",["if"],[["get",["summoner","isLocalSummoner"]],"is-self"],null]," ",["unknown",["mapSide"]]," ",["helper",["if"],[["get",["summoner","isPlaceholder"]],"hidden","visible"],null]," ",["unknown",["summoner","lane"]],"-",["unknown",["summoner","lanePosition"]]]]],["flush-element"],["text","\\n        "],["open-element","video",[]],["static-attr","class","pin-intro-video"],["dynamic-attr","src",["helper",["if"],[["get",["summoner","isLocalSummoner"]],"/fe/lol-champ-select/video/position-assignment/Pin_Me_Intro(Fixed).webm","/fe/lol-champ-select/video/position-assignment/Pin_Intro(Fixed).webm"],null],null],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","pin-container"],["flush-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["pin-static-image ",["helper",["unless"],[["get",["showPositionAssignment"]],"static"],null]]]],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["pin-position-icon ",["unknown",["summoner","position"]]]]],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":["summoner"]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","position-assignment-pins"],["flush-element"],["text","\\n"],["block",["each"],[["get",["pinDropSummoners"]]],null,0],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.useEmotesApi = function (e) {
            return i.default
              .getProvider()
              .getOptional("rcp-fe-lol-collections")
              .then(
                (t) => e(t.getEmotePanelApi()),
                (e) => i.logger.error("Provider getOptional failure", e),
              );
          }),
          (t.usePerksApi = function (e) {
            return i.default
              .getProvider()
              .getOptional("rcp-fe-lol-collections")
              .then(
                (t) => e(t.perksApi()),
                (e) => i.logger.error("Provider getOptional failure", e),
              );
          });
        var i = (function (e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var n = s(t);
          if (n && n.has(e)) return n.get(e);
          var i = {},
            o = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var a in e)
            if ("default" !== a && Object.prototype.hasOwnProperty.call(e, a)) {
              var r = o ? Object.getOwnPropertyDescriptor(e, a) : null;
              r && (r.get || r.set)
                ? Object.defineProperty(i, a, r)
                : (i[a] = e[a]);
            }
          (i.default = e), n && n.set(e, i);
          return i;
        })(n(1));
        function s(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (s = function (e) {
            return e ? n : t;
          })(e);
        }
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = n(1);
        t.default = class {
          constructor(e, t) {
            (this._screenRoot = e),
              (this._gameflowBinding = (0, i.DataBinding)(
                "/lol-gameflow",
                (0, i.getProvider)().getSocket(),
              )),
              t.registerReplacementChampSelectHandler(
                (e) => e && e.skipChampionSelect,
                this.show.bind(this),
                this.hide.bind(this),
              ),
              (this._bgElement = document.createElement("div")),
              this._screenRoot.getElement().appendChild(this._bgElement);
          }
          show() {
            this.isShown ||
              this._getModeBgPath().then((e) => {
                (this._bgElement.style = `background-image: url(${e}); width: 1280px; height: 720px; top: 0; left: 0;`),
                  this._screenRoot.bump(),
                  (this.isShown = !0);
              });
          }
          hide() {
            return (
              this.isShown && (this._screenRoot.release(), (this.isShown = !1)),
              !0
            );
          }
          _getModeBgPath() {
            return this._gameflowBinding
              .get("/v1/session")
              .then(
                (e) =>
                  (e &&
                    e.map &&
                    e.map.assets &&
                    e.map.assets["champ-select-skip-bg"]) ||
                  "",
              );
          }
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.createRootComponent = l),
          (t.default = function (e) {
            const t = s.default
                .getProvider()
                .get("rcp-fe-lol-l10n")
                .tra()
                .overlay("/fe/lol-l10n/trans.json")
                .overlay("/fe/lol-champ-select/trans.json"),
              n = (0, s.EmberL10n)(s.Ember, t);
            return o.default.useTra(t), l(n, e);
          });
        var i,
          s = (function (e, t) {
            if (!t && e && e.__esModule) return e;
            if (null === e || ("object" != typeof e && "function" != typeof e))
              return { default: e };
            var n = r(t);
            if (n && n.has(e)) return n.get(e);
            var i = {},
              s = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e)
              if (
                "default" !== o &&
                Object.prototype.hasOwnProperty.call(e, o)
              ) {
                var a = s ? Object.getOwnPropertyDescriptor(e, o) : null;
                a && (a.get || a.set)
                  ? Object.defineProperty(i, o, a)
                  : (i[o] = e[o]);
              }
            (i.default = e), n && n.set(e, i);
            return i;
          })(n(1)),
          o = (i = n(66)) && i.__esModule ? i : { default: i },
          a = n(67);
        function r(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (r = function (e) {
            return e ? n : t;
          })(e);
        }
        s.Lodash;
        function l(e, t) {
          const n = (0, a.getEmberApplicationArguments)(e, t);
          return s.default.EmberApplicationFactory.create(
            a.EMBER_APP_NAME,
            null,
            n,
            e,
            { EMBER_CLI_COMPAT: !0 },
          );
        }
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        const i = n(1),
          { Ember: s, logger: o } = i,
          a = i.UiKitPlugin.getModalManager();
        var r = new (class {
          constructor() {
            this._errorsShown = {};
          }
          _requestErrorHandler(e, t, n) {
            if (((e = e || "error_generic"), !this._errorsShown[e])) {
              this._errorsShown[e] = !0;
              const { tra: n } = this;
              if (n && n.get) {
                let i = n.get(e);
                0 === t.statusCode().readyState
                  ? (i += " " + n.get("error_network_try_again"))
                  : (i += " " + n.get("error_unknown_try_again"));
                a.add({
                  type: "DialogAlert",
                  data: {
                    contents: i,
                    okText: n.get("lib_ui_dialog_alert_ok"),
                  },
                }).okPromise.then(() => {
                  delete this._errorsShown[e];
                });
              }
            }
            o.error("Failed request, url=" + n.url, t);
          }
          _run(e, t) {
            let n;
            "object" == typeof t[0]
              ? (o.trace("_run request", t[0]),
                (n = t[0].errorMessage),
                delete t[0].errorMessage)
              : "object" == typeof t[1] &&
                (o.trace("_run request", t[1]),
                (n = t[1].errorMessage),
                delete t[1].errorMessage);
            const i = function (e, t) {
              this._requestErrorHandler(n, e, t);
            }.bind(this);
            return Promise.resolve(
              s.$.when(e(...t))
                .then(function (e, t, n) {
                  return (
                    n &&
                      (e
                        ? o.trace("_run response", {
                            url: this.url,
                            status: n.status,
                            data: e,
                          })
                        : o.trace("_run response", {
                            url: this.url,
                            status: n.status,
                          })),
                    e
                  );
                })
                .fail(function (e) {
                  2 !== Math.floor(e.status / 100)
                    ? i(e, this)
                    : o.trace("_run response fail", {
                        url: this.url,
                        status: e.status,
                      });
                }),
            );
          }
          ajax() {
            return this._run(s.$.ajax, arguments);
          }
          post() {
            return this._run(s.$.post, arguments);
          }
          useTra(e) {
            this.tra = e;
          }
        })();
        t.default = r;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.EMBER_APP_NAME = void 0),
          (t.getEmberApplicationArguments = function (e, t = null) {
            return (function (e, t = null) {
              const l = i.Navigation.getMissionsButton();
              let h = {
                name: d,
                rootElement: t,
                tra: e,
                componentFactory: i.ComponentFactory,
                Router: n(92),
                ApplicationRoute: o.default,
                IndexRoute: a.default,
                ApplicationController: s.default,
                ChampSelectRootComponent: r.default,
                ActionButtonComponent: n(93),
                BanShowcaseComponent: n(96),
                BansContainerComponent: n(99),
                BoostNotificationComponent: n(80),
                ButtonMaskIconComponent: c,
                ChampionShowcaseTeamComponent: n(102),
                ChampionShowcaseItemComponent: n(105),
                ChampionBenchComponent: n(107),
                ChampionBenchItemComponent: n(110),
                ChampionChestAvailabilityComponent: n(113),
                ChampionGridComponent: n(116),
                ChampionGridChampionComponent: n(126),
                ChampionSplashBackgroundComponent: n(128),
                ChampionSplashRingComponent: n(132),
                ChromaModalComponent: n(135),
                DisconnectNotificationComponent: n(138),
                EmotesEditComponent: n(141),
                FramedIconButtonComponent: m,
                FlyoutSelectorPopupButtonComponent: n(146),
                FlyoutSelectorTriggerButtonComponent: n(149),
                FullScreenModalComponent: n(142),
                GameEventInfoCardComponent: n(152).default,
                GameInfoComponent: n(155),
                LockInButtonComponent: n(158),
                LoadoutsEditComponent: n(161).default,
                PerkPageTooltipComponent: u,
                PerksPageDropdownComponent: n(164),
                PerksPageDropdownOptionComponent: n(167),
                PhaseTransitionComponent: n(170),
                PickBanRingComponent: n(173),
                PickPhaseComponent: n(176),
                PlayerNameComponent: p,
                PlayerNameWrapperComponent: n(179),
                PositionAssignmentIntroComponent: n(59).default,
                QuitButtonComponent: n(181),
                RerollButtonComponent: n(184),
                RingGearComponent: n(187),
                RuneRecommenderButtonComponent: n(190).default,
                SkinButtonComponent: n(192),
                SkinCarouselComponent: n(195),
                SkinNameComponent: n(198),
                SkinPurchaseButtonComponent: n(201),
                SkinSelectComponent: n(204),
                SummonerArrayComponent: n(207),
                SummonerOverlayComponent: n(210),
                SummonerObjectComponent: n(216),
                SummonerSpellPopupComponent: n(220),
                SummonerSpellSelectComponent: n(222),
                SummonerTimerComponent: n(225),
                TeamBansComponent: n(228),
                TeamBansItemComponent: n(231),
                TeamBoostButtonComponent: n(234),
                TeamBoostModalComponent: n(237),
                TimerStatusComponent: n(240),
                TradeButtonComponent: n(243),
                TradeDialogComponent: n(84).default,
                SwapButtonComponent: n(246),
                SwapDialogComponent: n(249).default,
                WardSkinPopupComponent: n(252),
                WardSkinSelectComponent: n(255),
                MissionsButtonComponent: l.MissionsButtonComponent,
                MissionsTrackerComponent: n(258),
                VoteRevealComponent: n(261),
                AnimationDispatcherService: n(129).default,
                ChampSelectSfxService: n(264).default,
                ChampSelectDisconnectService: n(266).default,
                ChampSelectInventoryService: n(267).default,
                ChatPublisherService: n(268).default,
                LoadoutsService: n(269).default,
                SkinPurchaseService: n(270).default,
                SummonerInfoService: n(289).default,
                PlayerReportService: n(290).default,
                MissionsService: l.MissionsService,
                TEMPLATES: { application: n(291), index: n(292) },
              };
              return (
                (h =
                  i.SharedEmberComponents.EmberCollectionApi.registerToFactoryDefinition(
                    h,
                  )),
                h
              );
            })(e, t);
          });
        var i = n(1),
          s = l(n(68)),
          o = l(n(69)),
          a = l(n(70)),
          r = l(n(71));
        function l(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const {
            ButtonMaskIconComponent: c,
            FramedIconButtonComponent: m,
            PerkPageTooltipComponent: u,
            PlayerNameComponent: p,
          } = i.SharedComponents.getSharedEmberComponents(),
          d = "rcp-fe-lol-champ-select";
        t.EMBER_APP_NAME = d;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = n(1).Ember.Controller.extend({
          init: function () {
            this._super(...arguments);
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = n(1);
        const s = [
          (0, i.DataBinding)("/lol-gameflow/v1/session").get(),
          (0, i.DataBinding)("/lol-champ-select/v1/session").get(),
          (0, i.DataBinding)(
            "/lol-champ-select/v1/pickable-champion-ids",
          ).get(),
          (0, i.DataBinding)("/lol-champ-select/v1/team-boost").get(),
          (0, i.DataBinding)("/lol-summoner/v1/current-summoner").get(),
          (0, i.DataBinding)("/lol-inventory/v1/wallet/RP").get(),
          (0, i.DataBinding)("/lol-inventory/v2/inventory/WARD_SKIN").get(),
          (0, i.DataBinding)("/lol-login/v1/session").get(),
          (0, i.DataBinding)("/lol-lobby/v2/comms/members").get(),
          (0, i.DataBinding)(
            "/lol-game-data/assets/v1/summoner-spells.json",
          ).get(),
          (0, i.DataBinding)("/lol-game-data/assets/v1/ward-skins.json").get(),
          (0, i.DataBinding)("/lol-platform-config/v1/namespaces").get(),
          (0, i.DataBinding)("/lol-perks/v1/perks").get(),
          (0, i.DataBinding)("/lol-perks/v1/pages").get(),
          (0, i.DataBinding)("/lol-perks/v1/styles").get(),
          (0, i.DataBinding)("/lol-perks/v1/currentpage").get(),
          (0, i.DataBinding)("/lol-perks/v1/settings").get(),
          (0, i.DataBinding)("/lol-chat/v1/conversations").get(),
          (0, i.DataBinding)("/entitlements/v1/token").get(),
          (0, i.DataBinding)("/lol-settings/v1/account/lol-tutorial").get(),
          (0, i.DataBinding)("/lol-loadouts/v4/loadouts/scope/account").get(),
        ];
        var o = i.Ember.Route.extend({
          model() {
            const e = Promise.all(s),
              t = new Promise((e) => {
                setTimeout(function () {
                  e();
                }, 1e3);
              });
            return Promise.race([e, t])
              .then(() => null)
              .catch(() => null);
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = n(1).Ember.Route.extend({ model() {} });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = n(1),
          s = c(n(72)),
          o = c(n(58)),
          a = c(n(83)),
          r = n(60),
          l = n(84);
        function c(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const { RunMixin: m, DomMixin: u } = i.EmberAddons.EmberLifeline,
          p = i.UiKitPlugin.getModalManager(),
          d = i.PremadeVoice.voiceButton({ position: "left" }),
          h = i.ViewportPlugin.fullScreen().getScreenRoot(
            "rcp-fe-lol-champ-select",
          );
        n(87), n(88);
        const g = n(89),
          f = i.Lodash,
          S = [0, 1, 2, 3, 4],
          _ = S.concat([5, 6, 7, 8, 9]),
          b = [
            "name_visibility_type_team_hidden_gromp",
            "name_visibility_type_team_hidden_krug",
            "name_visibility_type_team_hidden_murk_wolf",
            "name_visibility_type_team_hidden_raptor",
            "name_visibility_type_team_hidden_scuttle_crab",
          ];
        var y = i.Ember.Component.extend(m, u, s.default, a.default, {
          classNames: ["champion-select"],
          classNameBindings: [
            "showEntryAnimation:entry-animation",
            "showPreAnimation:pre-animation",
            "champSelectScreen",
            "sessionActions.hasBans:has-bans",
            "currentSummoner.isActingNow:is-acting-now",
            "currentSummoner.isPickingNow:is-picking-now",
            "currentSummoner.isExclusivelyPickIntenting:is-pick-intenting-now",
            "showCurrentSummonerBanning:is-banning-now",
            "sessionActions.currentBanAction:is-current-action",
            "isShowingGrid:is-showing-grid",
            "isSpectating",
            "session.timer.timerLessThan11Seconds:timer-less-than-11-seconds",
            "uxSettings.largeAreaAnimationsEnabled:large-area-animations:no-large-area-animations",
          ],
          layout: n(90),
          isShown: !1,
          isAnimatingIntro: !1,
          showChestAvailabilityHintedPortraits: !1,
          sentGameStartingMessageId: null,
          animationDispatcher: i.Ember.inject.service("animation-dispatcher"),
          chatPublisherService: i.Ember.inject.service("chat-publisher"),
          champSelectSfxService: i.Ember.inject.service("champ-select-sfx"),
          champSelectDisconnectService: i.Ember.inject.service(
            "champ-select-disconnect",
          ),
          summonerInfoService: i.Ember.inject.service("summoner-info"),
          myTeamSummonerIdsToNames: {},
          myTeamObfuscatedSummonerIdsSet: {},
          boostToastOpen: i.Ember.computed.alias("teamBoost.boostToastOpen"),
          boostToastData: i.Ember.computed.alias("teamBoost.boostToastData"),
          boosterSummonerId: i.Ember.computed.alias("teamBoost.summonerId"),
          model: null,
          tra: i.Ember.inject.service(),
          root: null,
          init: function () {
            this._super(...arguments),
              (this._playerNames = i.playerNames),
              this.uxSettingsInit(),
              (this.recordDidRequestSucceed =
                this._recordDidRequestSucceed.bind(this));
            this.set("sessionActions", n(91).create({ root: this })),
              i.Telemetry.startTracingEvent(
                "champ-select-init-ember-app-settle",
              ),
              this.get("chatPublisherService").registerSessionChangeCallback(
                "game-starting",
                this.gameStartDelayedSysMessage.bind(this),
              ),
              this.get("champSelectSfxService").initDataBindings(),
              this.initChatBindings(),
              this.initChampSelectBindings();
          },
          didReceiveAttrs() {
            this._super(...arguments);
          },
          didInsertElement: function () {
            this._super(...arguments), this.setupShowHandler();
          },
          didRender() {
            this._super(...arguments),
              this._endPerformanceMeasurement &&
                this.debounceTask("_endPerformanceMeasurement", 250);
          },
          willDestroyElement: function () {
            this._super(...arguments),
              this.uxSettingsDestroy(),
              this.set("isShown", !1),
              this._hideDisconnectNotification(),
              this._deleteDelayedShowDisconnectNotificationIfExists(),
              h.off("show", this._showHandler),
              h.off("hide", this._hideHandler);
          },
          _endPerformanceMeasurement() {
            i.Telemetry.endTracingEvent("champ-select-init-ember-app-settle"),
              (this._endPerformanceMeasurement = null);
          },
          initChatBindings: function () {
            (this._chatBinding = (0, i.DataBinding)(
              "/lol-chat",
              (0, i.getProvider)().getSocket(),
            )),
              this._chatBinding.observe(
                "v1/obfuscated-summoner-ids",
                this,
                this.handleChatObfuscatedSummonerIds,
              );
          },
          initChampSelectBindings: function () {
            (this._champSelectBinding = (0, i.DataBinding)(
              "/lol-champ-select",
              (0, i.getProvider)().getSocket(),
            )),
              this._champSelectBinding.observe(
                "/v1/ongoing-trade",
                this,
                this.handleOngoingTrade,
              ),
              this._champSelectBinding.observe(
                "/v1/ongoing-swap",
                this,
                this.handleOngoingSwap,
              ),
              this._champSelectBinding.observe(
                "/v1/pin-drop-notification",
                this,
                this.handlePinDropNotification,
              ),
              this._champSelectBinding.observe(
                "/v1/all-grid-champions",
                this,
                this.handleGridChampionsUpdated,
              ),
              this._initSummonerObservers();
          },
          handleChatObfuscatedSummonerIds(e) {
            i.logger.info(
              "champSelect received chatObfuscatedSummonerIds: " + e,
            ),
              this.set(
                "chatObfuscatedSummonerIds",
                (e || []).map((e) => e.toString()),
              ),
              this._checkIfShouldShowChatRoom();
          },
          _initSummonerObservers: function () {
            (this.summonerBySlotId = {}),
              _.forEach((e) => {
                (this.summonerBySlotId[e] = i.Ember.Object.create()),
                  this._champSelectBinding.observe(
                    `/v1/summoners/${e}`,
                    this,
                    (t) => this.handleSummoner(t, e),
                  );
              });
          },
          myTeamSummoners: i.Ember.computed("gameModeSubteamData", function () {
            const e = _.filter((e) => this._isSummonerSlotIdInMyTeam(e)).map(
              (e) => this.summonerBySlotId[e],
            );
            return i.Ember.A(e);
          }),
          theirTeamSummoners: i.Ember.computed(
            "gameModeSubteamData",
            function () {
              const e = _.filter((e) => !this._isSummonerSlotIdInMyTeam(e)).map(
                (e) => this.summonerBySlotId[e],
              );
              return i.Ember.A(e);
            },
          ),
          _isSummonerSlotIdInMyTeam: function (e) {
            const t = this.get("gameModeSubteamData");
            if (!t) return S.includes(e);
            const n = t.find((t) => t.cellIds.includes(e));
            return !!n && n.isLocalSubteam;
          },
          _getHiddenName: function (e, t, n) {
            const i = this.get("tra");
            if (!n) return this._getEnemyName(i, e.slotId);
            if (
              t === r.NAME_VISIBILITY_TYPE.HIDDEN ||
              t === r.NAME_VISIBILITY_TYPE.UNHIDDEN
            ) {
              const t = (e.slotId || 0) % b.length,
                n = b[t] || "";
              return i.get(n) || "";
            }
            return "";
          },
          handleSummoner: function (e, t) {
            if (e) {
              this.summonerBySlotId[t].setProperties(e);
              const n = this._isSummonerSlotIdInMyTeam(
                  t,
                  this.get("session.localPlayerCellId"),
                ),
                i =
                  e.nameVisibilityType && e.nameVisibilityType.length > 0
                    ? e.nameVisibilityType
                    : r.NAME_VISIBILITY_TYPE.VISIBLE,
                s = this._getDisplayNamePromise(e, n, i),
                o = this._getHiddenName(e, i, n),
                a = this._getPuuidPromise(e, n, i);
              this.summonerBySlotId[t].set("isSummonerInMyTeam", n),
                this.summonerBySlotId[t].set("nameVisibilityType", i),
                this.summonerBySlotId[t].set("hiddenName", o),
                Promise.all([s, a]).then((s) => {
                  const o = s[0],
                    a = s[1];
                  if (
                    (this.summonerBySlotId[t].set("displayName", o),
                    this.summonerBySlotId[t].set("puuid", a),
                    n)
                  ) {
                    if (!e.obfuscatedSummonerId && !e.summonerId) return;
                    e.obfuscatedSummonerId
                      ? ((this.myTeamObfuscatedSummonerIdsSet[
                          e.obfuscatedSummonerId
                        ] = !0),
                        (this.myTeamSummonerIdsToNames[e.obfuscatedSummonerId] =
                          o))
                      : (this.myTeamSummonerIdsToNames[e.summonerId] = o),
                      this._checkIfShouldShowChatRoom(i);
                  }
                });
            }
          },
          _getDisplayNamePromise: async function (e, t, n) {
            const i = this.get("tra"),
              s =
                this.myTeamSummonerIdsToNames[e.obfuscatedSummonerId] ||
                this.myTeamSummonerIdsToNames[e.summonerId];
            if (s && s.length > 0) return s;
            if (!t) {
              return this._getEnemyName(i, e.slotId);
            }
            if (
              n !== r.NAME_VISIBILITY_TYPE.HIDDEN &&
              n !== r.NAME_VISIBILITY_TYPE.UNHIDDEN
            ) {
              let t;
              if (e.summonerId) {
                const n = await this.get(
                  "_playerNames",
                ).getDisplayNameBySummonerId(e.summonerId);
                t = n?.playerNameFull;
              }
              return t;
            }
            {
              const s = this._getHiddenName(e, n, t);
              if (n === r.NAME_VISIBILITY_TYPE.HIDDEN) return s;
              if (n === r.NAME_VISIBILITY_TYPE.UNHIDDEN) {
                let t;
                if (e.summonerId) {
                  const n = await this.get(
                    "_playerNames",
                  ).getDisplayNameBySummonerId(e.summonerId);
                  t = n?.playerNameFull;
                }
                return i.formatString("name_visibility_type_team_unhidden", {
                  summonerName: t,
                  hiddenName: s,
                });
              }
            }
          },
          _getPuuidPromise: function (e) {
            return new Promise((t) =>
              e.puuid
                ? t(e.puuid)
                : this.get("summonerInfoService")
                    .getSummonerInfo(e.summonerId)
                    .then(({ puuid: e }) => t(e)),
            );
          },
          _getEnemyName: function (e, t) {
            const n = e.formatString("name_visibility_type_enemy", {
                summonerNumber: ((t || 0) % 5) + 1,
              }),
              i = this.get("gameModeSubteamData");
            if (!i) return n;
            const s = i.find((e) => e.cellIds.includes(t));
            return s
              ? e.formatString("name_visibility_type_subteam_enemy", {
                  subTeam: e.get(s.display.label),
                  summonerNumber: (s.cellIds || []).indexOf(t) + 1,
                })
              : n;
          },
          _checkIfShouldShowChatRoom: function (e) {
            const t = this.get("queue");
            if (!t) return;
            if (e === r.NAME_VISIBILITY_TYPE.VISIBLE)
              return void this._showChatRoomIfNotShownYet();
            if (
              Object.keys(this.myTeamSummonerIdsToNames).length !==
              t.numPlayersPerTeam
            )
              return;
            const n = this.get("chatObfuscatedSummonerIds"),
              i = Object.keys(this.myTeamObfuscatedSummonerIdsSet);
            if (n && i && n.length === i.length) {
              for (let e = 0; e < i.length; e++) {
                const t = i[e];
                if (!n.includes(t)) return;
              }
              this._showChatRoomIfNotShownYet();
            }
          },
          _showChatRoomIfNotShownYet: function () {
            this.get("showChatRoom") ||
              (Object.keys(this.myTeamSummonerIdsToNames).length > 0 &&
                this.set(
                  "myTeamSummonerIdsToNameOverridesJson",
                  JSON.stringify(this.myTeamSummonerIdsToNames),
                ),
              this.set("showChatRoom", !0));
          },
          handleOngoingTrade: function (e) {
            this.set("activeTrade", e);
          },
          handleOngoingSwap: function (e) {
            this.set("activeSwap", e);
          },
          handlePinDropNotification: function (e) {
            if (this.get("pinDropSummoners")) {
              const t = this.get("pinDropSummoners");
              e.pinDropSummoners.forEach((e, n) => {
                t[n].setProperties(e);
              });
            } else {
              const t = e.pinDropSummoners.map((e) => i.Ember.Object.create(e));
              this.set("pinDropSummoners", i.Ember.A(t));
            }
            this.set("pinDropNotification", e);
          },
          setupShowHandler: function () {
            (this._showHandler = () => {
              if (
                !this.isDestroyed &&
                !this.isDestroying &&
                (this.set("isShown", !0),
                this.resetBanAnimations(),
                this.get("showEntryAnimation"))
              ) {
                this.set("isAnimatingIntro", !0);
                const e = () => {
                  this.set("isAnimatingIntro", !1),
                    this.removeEventListener(this.element, "transitionend", e);
                };
                this.addEventListener(this.element, "transitionend", e),
                  this.runTask(function () {
                    e();
                  }, 2e3);
              }
            }),
              h.on("show", this._showHandler),
              (this._hideHandler = () => {
                this.isDestroyed ||
                  this.isDestroying ||
                  (this.set("isShown", !1), this._hideChatRoom());
              }),
              h.on("hide", this._hideHandler),
              this.set("isShown", document.contains(this.get("element")));
          },
          _hideChatRoom: function () {
            (this.myTeamSummonerIdsToNames = {}),
              (this.myTeamObfuscatedSummonerIdsSet = {}),
              this.set("myTeamSummonerIdsToNameOverridesJson", ""),
              this.set("chatObfuscatedSummonerIds"),
              this.set("showChatRoom", !1);
          },
          showCurrentSummonerBanning: i.Ember.computed(
            "currentSummoner.isBanningNow",
            "waitingForBanAnimation",
            function () {
              return (
                (this.get("currentSummoner.isBanningNow") &&
                  !this.get("waitingForBanAnimation")) ||
                (this.get("currentSummoner.isBanningNow") &&
                  this.get("sessionActions.isSimultaneousBans"))
              );
            },
          ),
          pickOrderSwapDisabledConfigurationInSeconds: i.Ember.computed(
            "jmxSettings.LcuChampionSelect.timeLeftToDisablePickOrderSwap",
            function () {
              const e = this.get(
                "jmxSettings.LcuChampionSelect.timeLeftToDisablePickOrderSwap",
              );
              return e || 5;
            },
          ),
          timerDisabledPickOrderSwap: i.Ember.computed(
            "session.timer.timeRemaining",
            "session.timer.isInfinite",
            "session.timer.inPlanningPhase",
            "pickOrderSwapDisabledConfigurationInSeconds",
            function () {
              return (
                !this.get("session.timer.inPlanningPhase") &&
                this.get("session.timer.timeRemaining") <
                  this.get("pickOrderSwapDisabledConfigurationInSeconds") &&
                !this.get("session.timer.isInfinite")
              );
            },
          ),
          delayedLastCompletedActionId: i.EmberHelpers.delayed(
            "sessionActions.lastCompletedAction.id",
            r.DURATIONS.showLockedInSplash,
          ),
          actionWasJustCompleted: i.Ember.computed(
            "delayedLastCompletedActionId",
            "sessionActions.lastCompletedAction.id",
            "sessionActions.lastCompletedAction.isPickOrBanOrVote",
            function () {
              return (
                this.get(
                  "sessionActions.lastCompletedAction.isPickOrBanOrVote",
                ) &&
                this.get("delayedLastCompletedActionId") !==
                  this.get("sessionActions.lastCompletedAction.id")
              );
            },
          ),
          waitingForPickAnimation: i.Ember.computed(
            "actionWasJustCompleted",
            "sessionActions.lastCompletedAction.isPick",
            function () {
              return (
                this.get("actionWasJustCompleted") &&
                this.get("sessionActions.lastCompletedAction.isPick")
              );
            },
          ),
          waitingForBanAnimation: i.Ember.computed(
            "actionWasJustCompleted",
            "sessionActions.lastCompletedAction.isBan",
            function () {
              return (
                this.get("actionWasJustCompleted") &&
                this.get("sessionActions.lastCompletedAction.isBan")
              );
            },
          ),
          leavingChampSelect: i.Ember.computed(
            "isShown",
            "isUILockedForGameStart",
            function () {
              return !this.get("isShown") || this.get("isUILockedForGameStart");
            },
          ),
          showEntryAnimation: i.Ember.computed("isShown", function () {
            return (
              this.get("isShown") &&
              this.get("uxSettings.largeAreaAnimationsEnabled")
            );
          }),
          voiceButton: i.Ember.computed("isShown", function () {
            return this.get("isShown") ? d : "";
          }),
          shouldPlaySplashRingAnimation: i.Ember.computed(
            "isShowingVoteCeremonies",
            "sessionActions.completedVoteRevealActions.length",
            function () {
              return (
                !this.get("isShowingVoteCeremonies") &&
                0 ===
                  this.get("sessionActions.completedVoteRevealActions.length")
              );
            },
          ),
          showPreAnimation: i.Ember.computed("isShown", function () {
            return (
              !this.get("isShown") &&
              this.get("uxSettings.largeAreaAnimationsEnabled")
            );
          }),
          skinSplashUnlocked: i.Ember.computed(
            "viewSkin.unlocked",
            "session.allowSkinSelection",
            function () {
              return (
                !1 === this.get("session.allowSkinSelection") ||
                this.get("viewSkin.unlocked")
              );
            },
          ),
          splashUnlocked: i.Ember.computed(
            "champSelectScreen",
            "showPositionAssignmentBackground",
            "skinSplashUnlocked",
            "pickSplashUnlocked",
            function () {
              if (
                void 0 !== this.get("champSelectScreen") &&
                this.get("showPositionAssignmentBackground")
              )
                return !0;
              if (this.get("champSelectScreen") === r.SCREENS.selected)
                return this.get("skinSplashUnlocked");
              const e = this.get("pickSplashUnlocked");
              return null === e || e;
            },
          ),
          splashDefocus: i.Ember.computed(
            "pickSplashDefocus",
            "champSelectScreen",
            "isShowingGrid",
            "showVoteShowcase",
            function () {
              const e = this.get("champSelectScreen");
              return (
                this.get("pickSplashDefocus") &&
                (e === r.SCREENS.pick ||
                  e === r.SCREENS.banShowcase ||
                  (e === r.SCREENS.selected &&
                    (this.get("isShowingGrid") ||
                      this.get("showVoteShowcase"))))
              );
            },
          ),
          skinSplashPath: i.Ember.computed(
            "viewSkin.splashVideoPath",
            "viewSkin.splashPath",
            "viewSkin.unlocked",
            "viewSkin.groupSplash",
            "uxSettings.largeAreaAnimationsEnabled",
            function () {
              const e = this.get("viewSkin");
              return e
                ? !e.unlocked && e.groupSplash
                  ? e.groupSplash
                  : e.splashVideoPath &&
                      this.get("uxSettings.largeAreaAnimationsEnabled")
                    ? e.splashVideoPath
                    : e.splashPath || ""
                : null;
            },
          ),
          splashPath: i.Ember.computed(
            "showSkinSelectComponent",
            "skinSplashPath",
            "showPositionAssignmentBackground",
            "session.timer.inPlanningPhase",
            "pickSplashPath",
            "showPickPhaseComponent",
            "champSelectBackground",
            "isShowingVoteReveal",
            function () {
              return this.get("isShowingVoteReveal") &&
                this.get("currentSummoner.champion.skins.length")
                ? this.get("currentSummoner.champion.skins")[0].splashPath
                : this.get("showSkinSelectComponent")
                  ? this.get("skinSplashPath")
                  : this.get("showPositionAssignmentBackground")
                    ? this.get("session.timer.inPlanningPhase")
                      ? null
                      : this.get("pickSplashPath")
                    : (this.get("showPickPhaseComponent") &&
                        this.get("pickSplashPath")) ||
                      this.get("champSelectBackground");
            },
          ),
          resetBanAnimations: function () {
            this.get("animationDispatcher").stopAnimation("banSlashAnimation"),
              this.get("animationDispatcher").stopAnimation(
                "banLockedInAnimation",
              ),
              this.get("animationDispatcher").stopAnimation(
                "banOutroAnimation",
              ),
              this.get("animationDispatcher").stopAnimation(
                "banRotationAnimation",
              ),
              this.get("animationDispatcher").stopAnimation("fullBanAnimation");
          },
          playHighSpecBanAnimation: function () {
            const e = this.get("sessionActions.lastCompletedBanAction");
            this.get("animationDispatcher").playAnimation(
              "banLockedInAnimation",
            ),
              this.runTask(function () {
                this.get("sessionActions.lastCompletedBanAction") === e &&
                  this.get("animationDispatcher").playAnimation(
                    "banRotationAnimation",
                  );
              }, 800),
              this.get("animationDispatcher")
                .playAnimation("banSlashAnimation")
                .then(() => {
                  if (
                    this.get("sessionActions.lastCompletedBanAction") === e &&
                    !this.isDestroying &&
                    !this.isDestroyed
                  )
                    return (
                      this.runTask(function () {
                        this.get("sessionActions.lastCompletedBanAction") ===
                          e &&
                          (this.get("animationDispatcher").stopAnimation(
                            "banLockedInAnimation",
                          ),
                          this.get("animationDispatcher").stopAnimation(
                            "banOutroAnimation",
                          ),
                          this.get("animationDispatcher").stopAnimation(
                            "banRotationAnimation",
                          ),
                          this.get("animationDispatcher").stopAnimation(
                            "fullBanAnimation",
                          ));
                      }, 600),
                      this.get("animationDispatcher").playAnimation(
                        "banOutroAnimation",
                      )
                    );
                });
          },
          shouldShowChestFilter: i.Ember.computed(
            "queue.queueRewards.isChampionPointsEnabled",
            "queue.isRanked",
            function () {
              return (
                this.get("queue.queueRewards.isChampionPointsEnabled") &&
                !this.get("queue.isRanked")
              );
            },
          ),
          shouldShowChestAvailability: i.Ember.computed(
            "shouldShowChestFilter",
            "queue.gameMode",
            "session.timer.inFinalizationPhase",
            "gameflow.gameData.isCustomGame",
            function () {
              return (
                this.get("session.timer.inFinalizationPhase") &&
                this.get("shouldShowChestFilter") &&
                r.GAME_MODES_WITH_CHEST_AVAILABILITY_ENABLED.indexOf(
                  this.get("queue.gameMode"),
                ) > -1 &&
                !this.get("gameflow.gameData.isCustomGame")
              );
            },
          ),
          handleGridChampionsUpdated: function (e) {
            if (this.get("championChestAvailabilityMap")) {
              const t = this.get("championChestAvailabilityMap");
              e.forEach((e) => {
                t.set(e.id + "", !e.masteryChestGranted && e.owned);
              });
            } else {
              const t = i.Ember.Object.create({});
              e.forEach((e) => {
                t.set(e.id + "", !e.masteryChestGranted && e.owned);
              }),
                this.set("championChestAvailabilityMap", t);
            }
          },
          isPlayingCeremony: i.Ember.computed.readOnly(
            "sessionActions.activeAction.isCeremony",
          ),
          dispatchBanSelectedAction: i.EmberHelpers.observeChange(
            "sessionActions.lastCompletedBanAction",
            function () {
              this.get("sessionActions.lastCompletedBanAction") &&
                !this.get("isShowingBanShowcase") &&
                (this.resetBanAnimations(),
                this.runTask(() => {
                  this.get("animationDispatcher").playAnimation(
                    "fullBanAnimation",
                  ),
                    this.get("uxSettings.largeAreaAnimationsEnabled")
                      ? this.playHighSpecBanAnimation()
                      : this.get("animationDispatcher").playAnimation(
                          "lowSpecBanLockedInAnimation",
                        );
                }, 1));
            },
          ),
          isShowingBanShowcase: i.Ember.computed(
            "champSelectScreen",
            function () {
              return this.get("champSelectScreen") === r.SCREENS.banShowcase;
            },
          ),
          isShowingVoteReveal: i.Ember.computed.and(
            "sessionActions.activeAction.isVoteReveal",
            "session.timer.inFinalizationPhase",
          ),
          isShowingVoteTransition: i.Ember.computed.and(
            "sessionActions.activeAction.isVoteTransition",
            "session.timer.inFinalizationPhase",
          ),
          isShowingVoteCeremonies: i.Ember.computed.or(
            "isShowingVoteReveal",
            "isShowingVoteTransition",
          ),
          showVoteShowcase: i.Ember.computed.and(
            "sessionActions.activeAction.isVote",
            "currentSummoner.voteAction.completed",
            "session.timer.inBanPickPhase",
          ),
          timerNotAvailable: i.Ember.computed.not(
            "session.timer.timerAvailable",
          ),
          isUILockedForGameStart: i.Ember.computed.equal(
            "session.timer.phase",
            r.TIMER_PHASES.gameStarting,
          ),
          rerollsDisabled: i.Ember.computed.or(
            "isUILockedForGameStart",
            "hasSentOrReceivedTradeProposal",
          ),
          showRerollButton: i.Ember.computed.and(
            "session.allowRerolling",
            "session.timer.inFinalizationPhase",
          ),
          showChampionBench: i.Ember.computed.and(
            "session.benchEnabled",
            "session.timer.inFinalizationPhase",
          ),
          lockedEventsEnabledForQueue: i.Ember.computed.alias(
            "session.allowLockedEvents",
          ),
          lockedEventIndex: i.Ember.computed.alias("session.lockedEventIndex"),
          isHeaderExpanded: i.Ember.computed("showChampionBench", function () {
            return this.get("showChampionBench");
          }),
          benchChampions: i.Ember.computed(
            "session.benchChampions.@each.championId",
            function () {
              const e = this.get("session.benchChampions") || [];
              return i.Ember.A(e.map((e) => i.Ember.Object.create(e)));
            },
          ),
          boostableSkinCount: i.Ember.computed.alias(
            "session.boostableSkinCount",
          ),
          gameStartDelayedSysMessage: function (e) {
            const t = i.Ember.get(e, "timer.phase"),
              n = this.get("chatPublisherService.conversationId"),
              s = this.get("sentGameStartingMessageId");
            t === r.TIMER_PHASES.gameStarting &&
              s !== n &&
              (this.sendDelayedChatMessage(
                this.get("tra.system_message_starting_soon"),
                4e3,
              ),
              this.set("sentGameStartingMessageId", n));
          },
          champSelectScreen: i.EmberHelpers.computedGate(
            "showPositionAssignment",
            "showFinalization",
            "showBanShowcase",
            "sessionActions.activeAction.isPhaseTransition",
            "session.timer.inBanPickPhase",
            "session.timer.inPlanningPhase",
            "session.timer.inGameStartingPhase",
            function () {
              let e;
              return (
                this.get("showPositionAssignment")
                  ? (e = r.SCREENS.positionAssignment)
                  : this.get("showFinalization")
                    ? (e = r.SCREENS.selected)
                    : this.get("showBanShowcase")
                      ? (e = r.SCREENS.banShowcase)
                      : this.get("session.timer.inBanPickPhase") ||
                          this.get("session.timer.inPlanningPhase") ||
                          this.get(
                            "sessionActions.activeAction.isPhaseTransition",
                          )
                        ? (e = r.SCREENS.pick)
                        : this.get("session.timer.inGameStartingPhase") &&
                          (e = r.SCREENS.gameStarting),
                e
              );
            },
          ),
          isPlayingSimulBanOutro: i.Ember.computed.readOnly(
            "sessionActions.activeAction.isBanShowcase",
          ),
          playPickIntentSound: i.EmberHelpers.observeChange(
            "champSelectScreen",
            function (e, t) {
              if (
                this.get("isDraftMode") &&
                t === r.SCREENS.positionAssignment &&
                e === r.SCREENS.pick
              ) {
                const e =
                  "/fe/lol-champ-select/sounds/sfx-cs-draft-intent-champgrid-open.ogg";
                o.default.playSound("sfx-ui", e);
              }
            },
          ),
          hasSentOrReceivedTradeProposal: i.Ember.computed(
            "session.trades.@each.state",
            function () {
              return !!(this.get("session.trades") || []).find(
                (e) => e.state === l.TRADE_SENT || e.state === l.TRADE_RECEIVED,
              );
            },
          ),
          showQuitButton: i.Ember.computed(
            "gameflow.gameData.isCustomGame",
            "isNotSpectating",
            function () {
              return (
                this.get("gameflow.gameData.isCustomGame") &&
                this.get("isNotSpectating")
              );
            },
          ),
          disableQuitButton: i.Ember.computed(
            "session.timer.timerAvailable",
            "session.timer.inFinalizationPhase",
            "isUILockedForGameStart",
            function () {
              return (
                this.get("isUILockedForGameStart") ||
                (!this.get("session.timer.timerAvailable") &&
                  this.get("session.timer.inFinalizationPhase"))
              );
            },
          ),
          disableSpectatorQuitButton: i.EmberHelpers.computedGate.immediate(
            "session.timer.inGameStartingPhase",
            "session.timer.timeRemaining",
            function () {
              return (
                this.get("session.timer.inGameStartingPhase") &&
                this.get("session.timer.timeRemaining") < 3
              );
            },
          ),
          isNexusBlitz: i.Ember.computed("queue.id", function () {
            return r.NEXUS_BLITZ_QUEUE_IDS.includes(
              Number(this.get("queue.id")),
            );
          }),
          isGameModeWithCompanions: i.Ember.computed("gameMode", function () {
            return this.get("gameMode") in r.GAME_MODES_WITH_COMPANIONS;
          }),
          perPositionRequiredSummonerSpells: i.Ember.computed(
            "sessionPerPositionRequiredSummonerSpells",
            function () {
              try {
                const e = this.get("sessionPerPositionRequiredSummonerSpells");
                return JSON.parse(e);
              } catch (e) {
                return {};
              }
            },
          ),
          perPositionDisallowedSummonerSpells: i.Ember.computed(
            "sessionPerPositionDisallowedSummonerSpells",
            function () {
              try {
                const e = this.get(
                  "sessionPerPositionDisallowedSummonerSpells",
                );
                return JSON.parse(e);
              } catch (e) {
                return {};
              }
            },
          ),
          showPositionAssignment: i.EmberHelpers.computedGate.immediate(
            "session.timer.inPlanningPhase",
            "session.timer.inBanPickPhase",
            "session.timer.timeRemaining",
            "session.timer.totalTimeInPhase",
            "currentSummoner.hasPosition",
            "isBlindWithBans",
            "isNexusBlitz",
            function () {
              if (this.get("isNexusBlitz"))
                return this._shouldShowPositionAssignmentNexusBlitz();
              if (
                this.get("session.timer.inPlanningPhase") &&
                this.get("currentSummoner.hasPosition")
              ) {
                const e =
                  this.get(
                    "jmxSettings.LcuChampionSelect.MinPickIntentDuration",
                  ) || r.DURATIONS.pickIntentSeconds;
                return this.get("session.timer.timeRemaining") > e;
              }
              return !1;
            },
          ),
          _shouldShowPositionAssignmentNexusBlitz: function () {
            if (this.get("isBlindWithBans")) {
              if (this.get("session.timer.inPlanningPhase")) {
                const e =
                  this.get(
                    "jmxSettings.LcuChampionSelect.PositionAssignmentDuration",
                  ) || 7;
                return (
                  this.get("session.timer.totalTimeInPhase") / 1e3 -
                    this.get("session.timer.timeRemaining") <
                  e
                );
              }
            } else if (this.get("session.timer.inBanPickPhase")) {
              const e =
                this.get(
                  "jmxSettings.LcuChampionSelect.PositionAssignmentDuration",
                ) || 8;
              return (
                this.get("session.timer.totalTimeInPhase") / 1e3 -
                  this.get("session.timer.timeRemaining") <
                e
              );
            }
            return !1;
          },
          showPositionAssignmentBackground: i.Ember.computed(
            "currentSummoner.hasPosition",
            "session.timer.inPlanningPhase",
            "session.timer.inBanPickPhase",
            "pickSplashPath",
            function () {
              return (
                this.get("currentSummoner.hasPosition") &&
                (this.get("session.timer.inPlanningPhase") ||
                  this.get("session.timer.inBanPickPhase"))
              );
            },
          ),
          showFinalization: i.Ember.computed(
            "currentSummoner.pickAction.completed",
            "sessionActions.allPlayersPickTogether",
            "session.timer.inFinalizationPhase",
            "sessionActions.activeAction.isPhaseTransition",
            function () {
              const e = this.get("currentSummoner.pickAction.completed"),
                t =
                  this.get("session.timer.inFinalizationPhase") &&
                  !this.get("sessionActions.activeAction.isPhaseTransition");
              return (
                (e && !this.get("currentSummoner.hasUncompletedAction")) || t
              );
            },
          ),
          showBanShowcase: i.Ember.computed(
            "session.timer.inBanPickPhase",
            "sessionActions.isSimultaneousBans",
            "isPlayingSimulBanOutro",
            function () {
              return (
                this.get("isPlayingSimulBanOutro") ||
                (this.get("session.timer.inBanPickPhase") &&
                  this.get("sessionActions.isSimultaneousBans"))
              );
            },
          ),
          showPickPhaseComponent: i.Ember.computed(
            "isShown",
            "champSelectScreen",
            "transitioningToSelectedScreen",
            "session.timer.inFinalizationPhase",
            "sessionActions.allPlayersPickTogether",
            function () {
              if (!this.get("isShown")) return !0;
              const e = this.get("champSelectScreen");
              return (
                this.get("transitioningToSelectedScreen") ||
                e === r.SCREENS.pick ||
                e === r.SCREENS.banShowcase ||
                (e === r.SCREENS.selected &&
                  !this.get("session.timer.inFinalizationPhase") &&
                  !this.get("sessionActions.allPlayersPickTogether"))
              );
            },
          ),
          showSkinSelectComponent: i.Ember.computed(
            "isShown",
            "champSelectScreen",
            "isSpectating",
            "isShowingVoteCeremonies",
            function () {
              return (
                !this.get("isShown") ||
                (this.get("champSelectScreen") === r.SCREENS.selected &&
                  !this.get("isSpectating") &&
                  !this.get("isShowingVoteCeremonies"))
              );
            },
          ),
          showGameEventInfoCard: i.Ember.computed(
            "lockedEventsEnabledForQueue",
            "champSelectScreen",
            function () {
              return (
                this.get("champSelectScreen") !== r.SCREENS.gameStarting &&
                this.get("lockedEventsEnabledForQueue")
              );
            },
          ),
          shiftGameEventInfoCard: i.Ember.computed(
            "champSelectScreen",
            function () {
              const e = this.get("champSelectScreen");
              return (
                e === r.SCREENS.pick ||
                e === r.SCREENS.banShowcase ||
                e === r.SCREENS.selected
              );
            },
          ),
          currentSideMapImage: i.Ember.computed(
            "map.id",
            "currentSummoner.side",
            "map.assets.map-north",
            "map.assets.map-south",
            function () {
              if (11 !== this.get("map.id")) return null;
              const e =
                "red" === this.get("currentSummoner.side") ? "north" : "south";
              return this.get(`map.assets.map-${e}`);
            },
          ),
          champSelectBackground: i.Ember.computed(
            "currentSideMapImage",
            "map.assets.gameflow-background",
            function () {
              return (
                this.get("currentSideMapImage") ||
                this.get("map.assets.gameflow-background")
              );
            },
          ),
          sendDelayedChatMessage: function (e, t) {
            this.runTask(() => {
              this.get("chatPublisherService")
                .sendChatMessage(e)
                .catch((e) => {});
            }, t);
          },
          transitionScreenState: i.Ember.observer(
            "champSelectScreen",
            "isShown",
            function () {
              if (!this.get("isShown")) return;
              const e = this.get("previousChampSelectScreen"),
                t = this.get("champSelectScreen");
              this.set("previousChampSelectScreen", t),
                e === r.SCREENS.pick &&
                  t === r.SCREENS.selected &&
                  (this.set("transitioningToSelectedScreen", !0),
                  this.runTask(() => {
                    this.set("transitioningToSelectedScreen", !1);
                  }, r.DURATIONS.pickPhaseChangeTransition));
            },
          ),
          hasTwoTeams: i.Ember.computed(
            "session.myTeam.length",
            "session.theirTeam.length",
            function () {
              const e = this.get("session.myTeam.length"),
                t = this.get("session.theirTeam.length");
              return e > 0 && t > 0;
            },
          ),
          shouldShowFirstPick: i.Ember.computed(
            "sessionActions.pickActions.length",
            "sessionActions.allPlayersPickTogether",
            "sessionActions.pickActionsHaveBegun",
            "hasTwoTeams",
            function () {
              return (
                this.get("sessionActions.pickActions.length") &&
                !this.get("sessionActions.allPlayersPickTogether") &&
                !this.get("sessionActions.pickActionsHaveBegun") &&
                this.get("hasTwoTeams")
              );
            },
          ),
          showLeftSideFirstPick: i.Ember.computed(
            "shouldShowFirstPick",
            "sessionActions.leftSideFirstPick",
            function () {
              return (
                this.get("shouldShowFirstPick") &&
                this.get("sessionActions.leftSideFirstPick")
              );
            },
          ),
          teamSizeText: i.Ember.computed(
            "queue.numPlayersPerTeam",
            "queue.gameMode",
            function () {
              const e = r.GAME_MODES_WITH_SUBTEAMS[this.get("queue.gameMode")];
              return e
                ? this.get("tra").formatString(e.teamSizeLabel, {
                    size: e.teamSize,
                  })
                : this.get("tra").formatString("map_size", {
                    size: this.get("queue.numPlayersPerTeam"),
                  });
            },
          ),
          isShowingPerksModal: i.Ember.computed.readOnly("isShowingPerks"),
          queueNameText: i.Ember.computed.alias("queue.description"),
          showRightSideFirstPick: i.Ember.computed(
            "shouldShowFirstPick",
            "sessionActions.leftSideFirstPick",
            function () {
              return (
                this.get("shouldShowFirstPick") &&
                !this.get("sessionActions.leftSideFirstPick")
              );
            },
          ),
          randomChampionRateLimitConfig: i.Ember.computed(
            "jmxSettings.LcuChampionSelect.RandomChampionRateLimitMaxActions",
            "jmxSettings.LcuChampionSelect.RandomChampionRateLimitInterval",
            function () {
              const e = this.get(
                  "jmxSettings.LcuChampionSelect.RandomChampionRateLimitMaxActions",
                ),
                t = this.get(
                  "jmxSettings.LcuChampionSelect.RandomChampionRateLimitInterval",
                );
              return e && t
                ? i.Ember.Object.create({ maxActions: e, interval: t })
                : null;
            },
          ),
          isRandomChampionEnabled: i.Ember.computed(
            "queue",
            "jmxSettings.LcuChampionSelect.RandomChampionEnabledGameQueues",
            "sessionActions.activeAction.isBan",
            function () {
              const e = this.get(
                  "jmxSettings.LcuChampionSelect.RandomChampionEnabledGameQueues",
                ),
                t = this.get("queue"),
                n = this.get("sessionActions.activeAction.isBan");
              return !(!e || !t || n) && e.includes(t.id);
            },
          ),
          isCompanionsEnabled: i.Ember.computed.and(
            "isGameModeWithCompanions",
            "jmxSettings.Companions.SelectorInChampSelectEnabled",
          ),
          initialLoadTelemetryObserver: i.Ember.observer(
            "session.timer.phase",
            function () {
              this.get("session.timer.phase") &&
              !this._initialLoadTelemetryTracked
                ? ((this._initialLoadTelemetryTracked = !0),
                  i.Telemetry.waitForGoodFps().then((e) => {
                    this._initialLoadTelemetryFirstLoopCompleted
                      ? i.Telemetry.sendEvent(
                          "timer_champ-select-entry-subsequent-loop",
                          e,
                        )
                      : ((this._initialLoadTelemetryFirstLoopCompleted = !0),
                        i.Telemetry.sendEvent(
                          "timer_champ-select-entry-first-loop",
                          e,
                        ));
                  }))
                : this.get("session.timer.phase") ||
                  (this._initialLoadTelemetryTracked = !1);
            },
          ),
          formattedTime: i.Ember.computed(
            "session.timer.timeRemaining",
            "isSpectating",
            "session.timer.phase",
            function () {
              if (!(this.get("session.timer.timeRemaining") < 0))
                return this.get("displayTimeAsMinuteSecond")
                  ? this.get("minuteSecondTime")
                  : this.get("session.timer.timeRemaining");
            },
          ),
          displayTimeAsMinuteSecond: i.Ember.computed(
            "session.timer.totalTimeInPhase",
            function () {
              return (
                this.get("session.timer.totalTimeInPhase") >=
                r.MINUTE_SECOND_TIME_DISPLAY_THRESHOLD_MS
              );
            },
          ),
          minuteSecondTime: i.Ember.computed(
            "session.timer.timeRemaining",
            function () {
              const e = this.get("session.timer.timeRemaining");
              let t = e % 60;
              return t < 10 && (t = "0" + t), Math.floor(e / 60) + ":" + t;
            },
          ),
          actions: {
            selectViewSkin(e) {
              this.set("viewSkin", e);
            },
            showingPerksModalChanged: function (e) {
              const t = this.get("isShown");
              if (
                (this.set("isShowingPerks", e),
                !(this.isDestroying || this.isDestroyed || e) &&
                  t &&
                  this.get("currentPerksPage.hasError"))
              ) {
                const e = this.get("currentPerksPage.isValid")
                  ? "error_could_not_set_perks_page"
                  : "error_perks_page_contains_invalid_choices";
                p.add({
                  type: "DialogAlert",
                  data: {
                    contents: this.get("tra.service").formatString(e, {
                      page_name: this.get("currentPerksPage.name"),
                    }),
                    okText: this.get("tra.lib_ui_dialog_alert_ok"),
                  },
                  show: !0,
                });
              }
            },
            clickChat() {
              i.Telemetry.recordNonTimingTracingEvent(
                "champ-select-chat-button-click",
                1,
                "click",
              );
            },
            closeBoostNotificationToast() {
              this.get("teamBoost").set("boostToastOpen", !1);
            },
            updateChestAvailabilityHintedPortraits(e = !1) {
              this.set("showChestAvailabilityHintedPortraits", e);
            },
          },
          _recordDidRequestSucceed: function (e, t = null) {
            this.get(
              "jmxSettings.LcuChampionSelect.IsDisconnectNotificationEnabled",
            ) &&
              (e
                ? this.get(
                    "champSelectDisconnectService",
                  ).receivedServiceCallResponse(null)
                : this.get(
                    "champSelectDisconnectService",
                  ).receivedServiceCallResponse(t));
          },
          shouldShowDisconnectNotification: i.Ember.computed(
            "login",
            "login.connected",
            "jmxSettings.LcuChampionSelect.IsDisconnectNotificationEnabled",
            "champSelectDisconnectService.isDisconnected",
            "isShown",
            "session.timer.inGameStartingPhase",
            function () {
              const e = this.get("login"),
                t = !e || !0 !== e.connected,
                n = this.get(
                  "jmxSettings.LcuChampionSelect.IsDisconnectNotificationEnabled",
                ),
                i = this.get("champSelectDisconnectService.isDisconnected"),
                s = this.get("isShown"),
                o = this.get("session.timer.inGameStartingPhase");
              return n && i && s && !t && !o;
            },
          ),
          isSpectating: i.Ember.computed(
            "currentSummoner",
            "session.myTeam.length",
            "session.theirTeam.length",
            function () {
              return !(
                this.get("currentSummoner") ||
                (!this.get("session.myTeam.length") &&
                  !this.get("session.theirTeam.length"))
              );
            },
          ),
          isNotSpectating: i.Ember.computed.bool("currentSummoner"),
          loggedInPlayer: i.Ember.computed("login.summonerId", function () {
            if (
              this.get("login.summonerId") &&
              this.get("login.summonerId") > 0
            )
              return this.get("login.summonerId");
          }),
          playerId: i.Ember.computed.alias("login.summonerId"),
          currentSummoner: i.Ember.computed(
            "session.myTeam",
            "session.myTeam.@each.isSelf",
            function () {
              const e = this.get("session.myTeam");
              return e && e.findBy("isSelf", !0);
            },
          ),
          accountLoadout: i.Ember.computed.readOnly(
            "accountLoadouts.firstObject",
          ),
          selectedWardSkin: i.Ember.computed(
            "jmxSettings.WardSkinConfig.UseLoadouts",
            "accountLoadout.loadout.WARD_SKIN_SLOT.itemId",
            "currentSummoner.selectedWardSkin",
            "wardSkins",
            function () {
              if (this.get("jmxSettings.WardSkinConfig.UseLoadouts")) {
                const e = 0,
                  t =
                    this.get("accountLoadout.loadout.WARD_SKIN_SLOT.itemId") ||
                    e;
                return (this.get("wardSkins") || i.Ember.A()).findBy("id", t);
              }
              return this.get("currentSummoner.selectedWardSkin");
            },
          ),
          summoners: i.Ember.computed.union(
            "session.myTeam",
            "session.theirTeam",
          ),
          wardSkins: i.Ember.computed(
            "wardSkinsInventory.@each.itemId",
            "wardSkinsCatalog.@each.id",
            function () {
              const e = this.get("wardSkinsInventory"),
                t = this.get("wardSkinsCatalog");
              if (!f.isEmpty(e) || !f.isEmpty(t)) {
                const n = e.map((e) => ({ id: e.itemId })),
                  s = f
                    .intersectionBy(t, n, "id")
                    .map((e) => ((e.ownership = { owned: !0 }), e));
                return i.Ember.A(s.map((e) => new g(e)));
              }
            },
          ),
          championToSummonerMap: i.Ember.computed(
            "summoners.@each.champion",
            function () {
              const e = new Map();
              return (
                this.get("summoners").forEach(function (t) {
                  e.set(t.get("champion.id"), t);
                }),
                e
              );
            },
          ),
          availableSpells: i.Ember.computed(
            "spells.@each.available",
            function () {
              const e = this.get("spells");
              return i.Ember.A((e && e.filterBy("available")) || []);
            },
          ),
          queue: i.Ember.computed.alias("gameflow.gameData.queue"),
          map: i.Ember.computed.alias("gameflow.map"),
          gameMode: i.Ember.computed.alias("gameflow.gameData.queue.gameMode"),
          gameModeSupportsPerks: i.Ember.computed.not(
            "gameflow.map.properties.suppressRunesMasteriesPerks",
          ),
          gameModeSubteamData: i.Ember.computed(
            "gameMode",
            "session.localPlayerCellId",
            function () {
              const e = this.get("gameMode"),
                t = r.GAME_MODES_WITH_SUBTEAMS[e];
              if (t) {
                const e = this.get("session.localPlayerCellId");
                return t.subteams.map((t) => ({
                  ...t,
                  isLocalSubteam: t.cellIds.includes(e),
                }));
              }
              return null;
            },
          ),
          disabledSpellIds: i.Ember.computed(
            "queue.gameMode",
            "jmxSettings.ClientSystemStates.gameModeToInactiveSpellIds",
            function () {
              const e = this.get("queue.gameMode"),
                t = this.get(
                  "jmxSettings.ClientSystemStates.gameModeToInactiveSpellIds",
                );
              if (!e || !t) return [];
              let n =
                i.Ember.get(t, "ALL_GAME_MODES_DISABLED_SPELLS_KEY") || [];
              return (
                (n = n.concat(i.Ember.get(t, e) || [])),
                n.map(function (e) {
                  return parseInt(e);
                })
              );
            },
          ),
          rp: i.Ember.computed("walletRP.RP", function () {
            return this.get("walletRP.RP") || 0;
          }),
          uxSettingsInit: function () {
            this.set("uxSettingsListener", this.uxSettingsObserver.bind(this)),
              i.UXSettings.addObserver(this.get("uxSettingsListener"));
          },
          uxSettingsDestroy: function () {
            i.UXSettings.removeObserver(this.get("uxSettingsListener"));
          },
          uxSettingsObserver: function (e) {
            this.set(
              "uxSettings",
              i.Ember.ObjectProxy.extend({
                largeAreaAnimationsEnabled: i.Ember.computed(
                  "root.jmxSettings.LcuChampionSelect.PotatoModeForced",
                  "content.largeAreaAnimationsEnabled",
                  function () {
                    return (
                      !this.get(
                        "root.jmxSettings.LcuChampionSelect.PotatoModeForced",
                      ) && this.get("content.largeAreaAnimationsEnabled")
                    );
                  },
                ),
              }).create({ content: e, root: this }),
            );
          },
          _debugLoggedInPlayerObserver: i.EmberHelpers.observeChange(
            "loggedInPlayer",
            function () {
              i.logger.trace(
                "logged in playerID is " + this.get("loggedInPlayer"),
              );
            },
          ),
          _debugPickableChampionsObserver: i.EmberHelpers.observeChange(
            "pickableChampionIds.length",
            function () {
              i.logger.trace(
                "pickable champions changed, length is " +
                  (this.get("pickableChampionIds") || []).length,
              );
            },
          ),
          _debugInventoryObserver: i.EmberHelpers.observeChange(
            "inventory.length",
            function () {
              i.logger.trace(
                "champion inventory changed, length is " +
                  (this.get("inventory") || []).length,
              );
            },
          ),
          _debugAvailableSpellsObserver: i.EmberHelpers.observeChange(
            "availableSpells.[]",
            function () {
              i.logger.trace(
                "availableSpells changed, length is " +
                  (this.get("availableSpells") || []).length,
              );
            },
          ),
        });
        t.default = y;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = (function (e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var n = s(t);
          if (n && n.has(e)) return n.get(e);
          var i = {},
            o = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var a in e)
            if ("default" !== a && Object.prototype.hasOwnProperty.call(e, a)) {
              var r = o ? Object.getOwnPropertyDescriptor(e, a) : null;
              r && (r.get || r.set)
                ? Object.defineProperty(i, a, r)
                : (i[a] = e[a]);
            }
          (i.default = e), n && n.set(e, i);
          return i;
        })(n(1));
        function s(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (s = function (e) {
            return e ? n : t;
          })(e);
        }
        var o = i.default.EmberDataBinding({
          Ember: i.Ember,
          websocket: i.default.getProvider().getSocket(),
          logPrefix: "rcp-fe-lol-champ-select",
          defaultPropertyValue: {},
          boundProperties: {
            gameflow: "/lol-gameflow/v1/session",
            sessionPerPositionRequiredSummonerSpells: {
              path: "/lol-gameflow/v1/session/per-position-summoner-spells/required/as-string",
              default: "{}",
            },
            sessionPerPositionDisallowedSummonerSpells: {
              path: "/lol-gameflow/v1/session/per-position-summoner-spells/disallowed/as-string",
              default: "{}",
            },
            localSummoner: "/lol-summoner/v1/current-summoner",
            login: "/lol-login/v1/session",
            walletRP: "/lol-inventory/v1/wallet/RP",
            commsMembers: "/lol-lobby/v2/comms/members",
            inventory: {
              path: "/lol-champions/v1/inventories/{{loggedInPlayer}}/champions",
              objectTypes: { "[]": n(73) },
              default: [],
            },
            pickableChampionIds: {
              path: "/lol-champ-select/v1/pickable-champion-ids",
              default: [],
            },
            jmxSettings: "/lol-platform-config/v1/namespaces",
            ChampTradingTooltipEnabled: {
              path: "/lol-platform-config/v1/namespaces/LcuChampionSelect/ChampTradingTooltipEnabled",
              default: !0,
            },
            PickOrderSwappingTooltipEnabled: {
              path: "/lol-platform-config/v1/namespaces/LcuChampionSelect/PickOrderSwappingTooltipEnabled",
              default: !0,
            },
            UseNewLoyaltyIcon: {
              path: "/client-config/v2/config/lol.client_settings.navigation.enableRewardsProgram",
              default: !1,
            },
            runeRecommenderEnabled: {
              path: "/client-config/v2/config/lol.client_settings.perks.runeRecommenderEnabled",
              default: !1,
            },
            unlockAllRunePageFunctionality: {
              path: "/client-config/v2/config/lol.client_settings.perks.unlockAllRunePageFunctionality",
              default: !1,
            },
            spells: {
              path: "/lol-game-data/assets/v1/summoner-spells.json",
              objectTypes: { "[]": n(74) },
              default: [],
            },
            wardSkinsInventory: {
              path: "/lol-inventory/v2/inventory/WARD_SKIN",
              default: [],
            },
            wardSkinsCatalog: {
              path: "/lol-game-data/assets/v1/ward-skins.json",
              default: [],
            },
            perksPages: {
              path: "/lol-perks/v1/pages",
              objectTypes: { "[]": n(75) },
              default: [],
            },
            currentPerksPage: {
              path: "/lol-perks/v1/currentpage",
              default: {},
            },
            perksSettings: {
              path: "/lol-perks/v1/settings",
              default: { showPresetPages: !0 },
            },
            useRuneRecommenderAutoSelect: {
              path: "/lol-perks/v1/rune-recommender-auto-select",
              default: !1,
            },
            conversations: "/lol-chat/v1/conversations",
            session: {
              path: "/lol-champ-select/v1/session",
              objectTypes: {
                "myTeam[]": n(76),
                "theirTeam[]": n(76),
                timer: n(77),
                "actions:flatten[]": n(78),
              },
              default: {},
            },
            teamBoost: {
              path: "/lol-champ-select/v1/team-boost",
              objectTypes: { "": n(79) },
              default: void 0,
            },
            entitlements: { path: "/entitlements/v1/token", default: null },
            tutorial: {
              path: "/lol-settings/v1/account/lol-tutorial",
              default: {},
            },
            accountLoadouts: {
              path: "/lol-loadouts/v4/loadouts/scope/account",
              default: [],
            },
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        var i = n(1),
          s = n(60);
        const o = i.Ember.Object.extend({
          selectedByMe: i.Ember.computed.alias("selectedBy.isSelf"),
          selected: i.Ember.computed.bool("selectedBy"),
          selectedBy: i.Ember.computed(
            "root.championToSummonerMap",
            "root.currentSummoner.champion.id",
            "id",
            function () {
              if (
                this.get("root.currentSummoner.champion.id") === this.get("id")
              )
                return this.get("root.currentSummoner");
              const e = this.get("root.championToSummonerMap");
              return e ? e.get(this.get("id")) : void 0;
            },
          ),
          preloadSkinTileImages: i.Ember.observer("selectedByMe", function () {
            if (this.get("selectedByMe")) {
              const e = this.get("skins");
              e &&
                e.forEach(function (e) {
                  const t = e.get("tilePath");
                  if (t) {
                    new Image().src = t;
                  }
                });
            }
          }),
          banAction: i.Ember.computed(
            "id",
            "root.sessionActions.completedBanActions.@each.championId",
            function () {
              const e = this.get("root.sessionActions.completedBanActions");
              return (
                i.Lodash.find(
                  e,
                  (e) =>
                    e.get("championId") === this.get("id") &&
                    !e.get("actor.isOnPlayersTeam"),
                ) ||
                i.Lodash.find(e, (e) => e.get("championId") === this.get("id"))
              );
            },
          ),
          banned: i.Ember.computed.bool("banAction"),
          picked: i.Ember.computed(
            "selectedBy.pickAction.completed",
            "selectedBy.voteAction",
            function () {
              return (
                !this.get("selectedBy.voteAction") &&
                this.get("selectedBy") &&
                (this.get("selectedBy.pickAction.completed") ||
                  !this.get("selectedBy.pickAction"))
              );
            },
          ),
          hovered: i.Ember.computed(
            "selectedBy.pickAction.isActive",
            function () {
              return (
                this.get("selectedBy") &&
                this.get("selectedBy.pickAction.isActive")
              );
            },
          ),
          voted: i.Ember.computed(
            "selectedBy.voteAction.isActive",
            function () {
              return (
                this.get("selectedBy") &&
                this.get("selectedBy.voteAction.isActive")
              );
            },
          ),
          pickedByOtherOrBanned: i.Ember.computed(
            "picked",
            "selectedByMe",
            "root.currentSummoner.isBanningNow",
            "root.session.allowDuplicatePicks",
            "hovered",
            "banned",
            function () {
              return (
                !(
                  !this.get("banned") &&
                  this.get("root.session.allowDuplicatePicks")
                ) &&
                ((this.get("picked") &&
                  (!this.get("selectedByMe") ||
                    this.get("root.currentSummoner.isBanningNow"))) ||
                  (this.get("root.currentSummoner.isBanningNow") &&
                    this.get("banned") &&
                    this.get("id") !== s.NONE_CHAMP_ID) ||
                  (this.get("hovered") && !this.get("selectedByMe")) ||
                  (!this.get("root.currentSummoner.isBanningNow") &&
                    this.get("banned")))
              );
            },
          ),
          baseSkin: i.Ember.computed("skins.@each.isBase", function () {
            return i.Lodash.find(this.get("skins"), function (e) {
              return i.Ember.get(e, "isBase");
            });
          }),
        });
        e.exports = o;
      },
      (e, t, n) => {
        "use strict";
        var i = n(60);
        const s = n(1),
          { Ember: o } = s,
          a = o.Object.extend({
            soundPath: o.computed("id", function () {
              return `${i.SOUNDS_PATH}/sfx-spellchoose-${this.get("id")}.ogg`;
            }),
            available: o.computed(
              "gameModes.[]",
              "root.queue.gameMode",
              function () {
                const e = this.get("root.queue.gameMode");
                return this.get("gameModes").indexOf(e) > -1;
              },
            ),
            locked: o.computed.bool("lockedReason"),
            lockedReason: o.computed("canUse", "disabled", function () {
              return this.get("canUse")
                ? this.get("disabled")
                  ? "DISABLED"
                  : void 0
                : "LEVEL";
            }),
            canUse: o.computed(
              "summonerLevel",
              "root.localSummoner.summonerLevel",
              function () {
                return (
                  this.get("summonerLevel") <=
                    this.get("root.localSummoner.summonerLevel") ||
                  !this.get("root.localSummoner.summonerLevel")
                );
              },
            ),
            disabled: o.computed("id", "root.disabledSpellIds", function () {
              return (
                -1 !==
                (this.get("root.disabledSpellIds") || []).indexOf(
                  this.get("id"),
                )
              );
            }),
          });
        e.exports = a;
      },
      (e, t, n) => {
        "use strict";
        var i = n(1);
        const s = i.Ember.Object.extend({
          isPresetPage: i.Ember.computed("id", function () {
            const e = this.get("id");
            return e >= 50 && e <= 59;
          }),
          hasError: i.Ember.computed(
            "isValid",
            "current",
            "isActive",
            function () {
              return (
                !this.get("isValid") ||
                (this.get("current") && !this.get("isActive"))
              );
            },
          ),
        });
        e.exports = s;
      },
      (e, t, n) => {
        "use strict";
        var i = n(1);
        const s = i.Ember.Object.extend({
          summonerIdObserver: i.EmberHelpers.observeChange(
            "summonerId",
            function () {
              const e = this.get("summonerId");
              e &&
                (0, i.DataBinding)("/lol-summoner")
                  .get(`/v1/summoners/${e}`)
                  .then((e) => {
                    if (!e) return;
                    const {
                      playerNameFull: t,
                      gameName: n,
                      tagLine: s,
                    } = i.playerNames.formatPlayerName(e);
                    (this.isDestroying && this.isDestroyed) ||
                      (this.set("displayName", t),
                      this.set("gameName", n),
                      this.set("tagLine", s));
                  });
            },
          ),
          name: i.Ember.computed("displayName", "summonerIndex", function () {
            if (this.get("displayName")) return this.get("displayName");
            let e;
            e =
              void 0 === this.get("summonerIndex")
                ? 1
                : this.get("summonerIndex") + 1;
            const t = this.get("root.tra");
            return t
              ? t.formatString("obfuscated_summoner_name", {
                  summonerNumber: e,
                })
              : "";
          }),
          lastPickSnipedChampion: null,
          champion: i.Ember.computed(
            "isSelf",
            "isPickingNow",
            "isVotingNow",
            "requestedChampionId",
            "championId",
            "pickAction.championId",
            "voteAction.championId",
            "root.inventory.@each.id",
            function () {
              let e;
              return (
                this.get("isSelf") &&
                  (this.get("isPickingNow") || this.get("isVotingNow")) &&
                  (e = this.get("requestedChampionId")),
                e ||
                  (e =
                    this.get("championId") ||
                    this.get("pickAction.championId") ||
                    this.get("voteAction.championId")),
                (this.get("root.inventory") || i.Ember.A()).findBy("id", e)
              );
            },
          ),
          isBanSniping: i.Ember.computed.and(
            "isBanningNow",
            "activeAction.champion.selected",
          ),
          checkForPickSnipe: i.EmberHelpers.observeChange(
            "champion",
            function (e, t) {
              !this.get("champion") &&
              this.get("pickAction") &&
              t &&
              t.get("pickedByOtherOrBanned")
                ? (this.set("lastPickSnipedChampion", t),
                  this.set("requestedChampionId", null))
                : this.set("lastPickSnipedChampion", null);
            },
          ),
          isSelf: i.Ember.computed(
            "root.session.localPlayerCellId",
            "cellId",
            function () {
              return (
                this.get("root.session.localPlayerCellId") ===
                this.get("cellId")
              );
            },
          ),
          isOnPlayersTeam: i.Ember.computed(
            "team",
            "root.currentSummoner.team",
            function () {
              return this.get("team") === this.get("root.currentSummoner.team");
            },
          ),
          isOnLeftSide: i.Ember.computed(
            "root.isSpectating",
            "isOnPlayersTeam",
            "side",
            function () {
              return this.get("root.isSpectating")
                ? "blue" === this.get("side")
                : this.get("isOnPlayersTeam");
            },
          ),
          side: i.Ember.computed("team", function () {
            switch (this.get("team")) {
              case 1:
                return "blue";
              case 2:
                return "red";
              default:
                return "spectator";
            }
          }),
          hasPosition: i.Ember.computed("assignedPosition", function () {
            return !!this.get("assignedPosition");
          }),
          uncompletedAction: i.Ember.computed(
            "actions.@each.completed",
            function () {
              return this.get("actions").findBy("completed", !1);
            },
          ),
          activeAction: i.EmberHelpers.computedGate(
            "actions.@each.isActive",
            function () {
              return this.get("actions").findBy("isActive", !0);
            },
          ),
          changingAction: i.Ember.computed(
            "activeAction.id",
            "isPickIntenting",
            "pickAction",
            function () {
              let e = this.get("activeAction");
              return (
                (e && void 0 !== e.get("id")) ||
                  !this.get("isPickIntenting") ||
                  (e = this.get("pickAction")),
                e
              );
            },
          ),
          nextAction: i.EmberHelpers.computedGate(
            "root.sessionActions.nextActions.@each.id",
            "actions.@each.isNext",
            function () {
              return this.get("actions").findBy("isNext", !0);
            },
          ),
          isExclusivelyPickIntenting: i.Ember.computed.readOnly(
            "root.session.timer.inPlanningPhase",
          ),
          isPickIntenting: i.Ember.computed(
            "isExclusivelyPickIntenting",
            "pickAction",
            "pickAction.completed",
            "isPickingNow",
            "isBanningNow",
            function () {
              return (
                this.get("isExclusivelyPickIntenting") ||
                (this.get("pickAction") &&
                  !this.get("pickAction.completed") &&
                  !this.get("isPickingNow") &&
                  !this.get("isBanningNow"))
              );
            },
          ),
          isBanningNow: i.Ember.computed.bool("activeAction.isBan"),
          isBanningNext: i.Ember.computed.bool("nextAction.isBan"),
          isPickingNow: i.Ember.computed.bool("activeAction.isPick"),
          isVotingNow: i.Ember.computed.bool("activeAction.isVote"),
          isPickingOrVotingNow: i.Ember.computed.or(
            "isPickingNow",
            "isVotingNow",
          ),
          isActingNow: i.Ember.computed.bool("activeAction"),
          actions: i.Ember.computed(
            "root.sessionActions.allActions.@each.actorCellId",
            "cellId",
            function () {
              const e =
                this.get("root.sessionActions.allActions") || i.Ember.A();
              return i.Ember.A(e.filterBy("actorCellId", this.get("cellId")));
            },
          ),
          hasUncompletedAction: i.Ember.computed(
            "uncompletedAction",
            function () {
              return !!this.get("uncompletedAction");
            },
          ),
          pickAction: i.Ember.computed("actions.@each.type", function () {
            return this.get("actions").findBy("type", "pick");
          }),
          voteAction: i.Ember.computed("actions.@each.type", function () {
            return this.get("actions").findBy("type", "vote");
          }),
          isDonePicking: i.Ember.computed(
            "pickAction.completed",
            "pickAction",
            "champion",
            function () {
              return (
                this.get("pickAction.completed") ||
                (!this.get("pickAction") && !!this.get("champion"))
              );
            },
          ),
          banActions: i.Ember.computed("actions.@each.type", function () {
            return i.Ember.A(this.get("actions").filterBy("type", "ban"));
          }),
          allyIndex: i.Ember.computed("root.session.myTeam.[]", function () {
            const e = (this.get("root.session.myTeam") || []).indexOf(this);
            if (e > -1) return e;
          }),
          enemyIndex: i.Ember.computed(
            "root.session.theirTeam.[]",
            function () {
              const e = (this.get("root.session.theirTeam") || []).indexOf(
                this,
              );
              if (e > -1) return e;
            },
          ),
          summonerIndex: i.Ember.computed(
            "enemyIndex",
            "allyIndex",
            function () {
              return void 0 !== this.get("enemyIndex")
                ? this.get("enemyIndex")
                : void 0 !== this.get("allyIndex")
                  ? this.get("allyIndex")
                  : void 0;
            },
          ),
          spell1: i.Ember.computed(
            "root.spells.@each.id",
            "spell1Id",
            function () {
              return (this.get("root.spells") || i.Ember.A()).findBy(
                "id",
                this.get("spell1Id"),
              );
            },
          ),
          spell2: i.Ember.computed(
            "root.spells.@each.id",
            "spell2Id",
            function () {
              return (this.get("root.spells") || i.Ember.A()).findBy(
                "id",
                this.get("spell2Id"),
              );
            },
          ),
          selectedWardSkin: i.Ember.computed(
            "root.wardSkins.@each.id",
            "wardSkinId",
            function () {
              return (this.get("root.wardSkins") || i.Ember.A()).findBy(
                "id",
                this.get("wardSkinId"),
              );
            },
          ),
          trade: i.Ember.computed(
            "cellId",
            "root.session.trades.@each.cellId",
            function () {
              return (this.get("root.session.trades") || i.Ember.A()).findBy(
                "cellId",
                this.get("cellId"),
              );
            },
          ),
          _preloadSelectedSkinSplash: i.Ember.observer(
            "selectedSkinId",
            function () {
              if (this.get("selectedSkinId") && this.get("champion.skins")) {
                const e = this.get("champion.skins").findBy(
                  "id",
                  this.get("selectedSkinId"),
                );
                if (e) {
                  new Image().src = e.get("splashPath");
                }
              }
            },
          ),
        });
        e.exports = s;
      },
      (e, t, n) => {
        "use strict";
        var i = n(60);
        const s = n(1),
          { Ember: o, EmberAddons: a } = s,
          { EmberHelpers: r } = s,
          { RunMixin: l } = a.EmberLifeline,
          c = o.Object.extend(l, {
            timeRemaining: r.computedGate.immediate(
              "timeRemainingInMs",
              function () {
                const e = this.get("timeRemainingInMs");
                if (void 0 !== e) return Math.floor(e / 1e3);
              },
            ),
            timeRemainingInMs: o.computed(
              "internalNowInEpochMs",
              "adjustedTimeLeftInPhase",
              function () {
                if ((this.updateTimer(), this.get("internalNowInEpochMs"))) {
                  const e =
                    new Date().getTime() -
                    parseFloat(this.get("internalNowInEpochMs"));
                  return Math.max(this.get("adjustedTimeLeftInPhase") - e, 0);
                }
                return this.get("adjustedTimeLeftInPhase");
              },
            ),
            timerAvailable: o.computed.gt("timeRemaining", 0),
            updateTimer: function () {
              this.isDestroyed ||
                this.isDestroying ||
                this.timerRunning ||
                ((this.timerRunning = !0),
                this.get("timeRemainingInMs") > 0
                  ? (this.notifyPropertyChange("timeRemainingInMs"),
                    this.runTask(function () {
                      (this.timerRunning = !1), this.updateTimer();
                    }, 333))
                  : (this.timerRunning = !1));
            },
            inPlanningPhase: o.computed.equal("phase", i.TIMER_PHASES.planning),
            notInPlanningPhase: o.computed.not("inPlanningPhase"),
            inBanPickPhase: o.computed.equal("phase", i.TIMER_PHASES.banPick),
            notInBanPickPhase: o.computed.not("inBanPickPhase"),
            inFinalizationPhase: o.computed.equal(
              "phase",
              i.TIMER_PHASES.finalization,
            ),
            notInFinalizationPhase: o.computed.not("inFinalizationPhase"),
            inGameStartingPhase: o.computed.equal(
              "phase",
              i.TIMER_PHASES.gameStarting,
            ),
            notInGameStartingPhase: o.computed.not("inGameStartingPhase"),
            timerLessThan11Seconds: o.computed(
              "timeRemaining",
              "isInfinite",
              function () {
                return (
                  this.get("timeRemaining") < 11 && !this.get("isInfinite")
                );
              },
            ),
            exists: r.computedGate.immediate("timeRemaining", function () {
              return void 0 !== this.get("timeRemaining");
            }),
          });
        e.exports = c;
      },
      (e, t, n) => {
        "use strict";
        var i = n(60);
        const s = n(1),
          { Ember: o } = s,
          { EmberHelpers: a } = s,
          r = s.Lodash,
          l = o.Object.extend({
            champion: o.computed(
              "root.inventory.@each.id",
              "championId",
              function () {
                return (this.get("root.inventory") || o.A()).findBy(
                  "id",
                  this.get("championId"),
                );
              },
            ),
            actor: o.computed(
              "actorCellId",
              "root.summoners.@each.cellId",
              function () {
                return (this.get("root.summoners") || o.A()).findBy(
                  "cellId",
                  this.get("actorCellId"),
                );
              },
            ),
            isOnLeftSide: o.computed.alias("actor.isOnLeftSide"),
            isCeremony: o.computed("type", function () {
              return Object.keys(i.CEREMONIES).some(
                (e) => i.CEREMONIES[e] === this.get("type"),
              );
            }),
            isBanShowcase: o.computed.equal("type", i.CEREMONIES.tenBansReveal),
            isPhaseTransition: o.computed("type", function () {
              return (
                this.get("type") === i.CEREMONIES.phaseTransition ||
                this.get("type") === i.CEREMONIES.voteTransition
              );
            }),
            isVoteReveal: o.computed.equal("type", i.CEREMONIES.voteReveal),
            isVoteTransition: o.computed.equal(
              "type",
              i.CEREMONIES.voteTransition,
            ),
            isBan: o.computed("type", function () {
              return "ban" === this.get("type");
            }),
            isPick: o.computed("type", function () {
              return "pick" === this.get("type");
            }),
            isVote: o.computed("type", function () {
              return "vote" === this.get("type");
            }),
            isPickOrBanOrVote: o.computed.or("isBan", "isPick", "isVote"),
            isActive: a.computedGate(
              "root.sessionActions.activeActions.@each.id",
              "id",
              function () {
                return !!this.get("root.sessionActions.activeActions").findBy(
                  "id",
                  this.get("id"),
                );
              },
            ),
            isCurrent: a.computedGate(
              "root.sessionActions.currentActions.@each.id",
              "id",
              function () {
                return !!this.get("root.sessionActions.currentActions").findBy(
                  "id",
                  this.get("id"),
                );
              },
            ),
            isNext: a.computedGate(
              "root.sessionActions.nextActions.@each.id",
              "id",
              function () {
                return !!this.get("root.sessionActions.nextActions").findBy(
                  "id",
                  this.get("id"),
                );
              },
            ),
            indexInActionSet: o.computed(
              "root.session.actions.[]",
              function () {
                const e = this.get("root.session.actions");
                return (r.find(e, (e) => e.contains(this)) || []).indexOf(this);
              },
            ),
            snipedPlayerPick: o.computed(
              "root.currentSummoner",
              "root.currentSummoner.lastPickSnipedChampion",
              "champion",
              "actor",
              function () {
                return (
                  this.get("actor") !== this.get("root.currentSummoner") &&
                  this.get("champion") ===
                    this.get("root.currentSummoner.lastPickSnipedChampion")
                );
              },
            ),
          });
        e.exports = l;
      },
      (e, t, n) => {
        "use strict";
        var i,
          s = n(1),
          o = (i = n(58)) && i.__esModule ? i : { default: i };
        const a = n(1),
          { Ember: r } = a,
          { EmberHelpers: l } = (a.UiKitPlugin.getToastManager(), a);
        n(80);
        const c = r.Object.extend({
            summonerName: r.computed.alias(
              "parentComponent.computedDisplayName",
            ),
            tra: r.computed.alias("parentComponent.root.tra"),
            boostedSkinsMessage: r.computed.alias(
              "parentComponent.toastBodyText",
            ),
          }),
          m = r.Object.extend({
            _alreadySentChatMessagesChampionIds: [],
            _chatBinding: null,
            init() {
              this._super(...arguments),
                (this._chatBinding = (0, s.DataBinding)(
                  "/lol-chat",
                  (0, s.getProvider)().getSocket(),
                ));
            },
            computedDisplayName: r.computed(
              "root.session.myTeam.@each.gameName",
              "root.session.myTeam.@each.displayName",
              "root._playerNames",
              "summonerId",
              function () {
                const e = this.get("root.session.myTeam"),
                  t = this.get("root._playerNames");
                if (e && t) {
                  const n = e.findBy("summonerId", this.get("summonerId"));
                  return n ? t.formatPlayerName(n).playerNameFull : "";
                }
                return "";
              },
            ),
            onPhaseChange: l.observer(
              "root.session.timer.inFinalizationPhase",
              function () {
                this.get("root.session.timer.inFinalizationPhase") &&
                  ((this._showedTeamBoostNotification = !1),
                  (this._alreadySentChatMessagesChampionIds = []));
              },
            ),
            boostToastOpen: !1,
            boostToastData: null,
            boostToastClosed() {
              this.set("boostToastOpen", !1);
            },
            onTeamBoost: l.observer("boostedSkins.[]", "unlocked", function () {
              const e = this.get("unlocked");
              if (!e || !this.get("boostedSkins.length")) return;
              const t = this.get("conversationId"),
                n = e && !this._showedTeamBoostNotification;
              this._showedTeamBoostNotification ||
                (this.playTeamBoostSound(),
                this.displayBoostNotification(),
                (this._showedTeamBoostNotification = !0)),
                t &&
                  (n
                    ? this.displayBoostGeneralMessage(t).then(() => {
                        this.displayBoostIpMessage(t).then(() => {
                          this.displayBoostSkinMessages(t);
                        });
                      })
                    : this.displayBoostSkinMessages(t));
            }),
            displayBoostNotification: function () {
              this.setProperties({
                boostToastData: c.create({ parentComponent: this }),
                boostToastOpen: !0,
              });
            },
            boostPurchaserIsSelf: r.computed(
              "root.currentSummoner.summonerId",
              "summonerId",
              function () {
                return (
                  this.get("root.currentSummoner.summonerId") ===
                  this.get("summonerId")
                );
              },
            ),
            boostableSkinCount: r.computed.readOnly(
              "root.session.boostableSkinCount",
            ),
            boostedSkins: r.computed(
              "boostedSkinIds.[]",
              "root.currentSummoner.champion.skins.@each.id",
              function () {
                const e = this.get("boostedSkinIds"),
                  t = this.get("root.currentSummoner.champion.skins") || [];
                return r.A(
                  t.filter(function (t) {
                    return e.indexOf(r.get(t, "id")) >= 0;
                  }),
                );
              },
            ),
            boostedSkinIds: r.computed(
              "availableSkins.[]",
              "root.currentSummoner.champion.id",
              function () {
                return r.A(this.get("availableSkins"));
              },
            ),
            toastBodyText: r.computed(
              "boostedSkins.[]",
              "computedDisplayName",
              "ipAmount",
              "root.tra",
              "root.tra.boost_you_unlocked_message",
              "boostPurchaserIsSelf",
              function () {
                const e = this.get("boostPurchaserIsSelf")
                  ? "boost_you_unlocked_message"
                  : "boost_summoner_unlocked_message";
                return this.getTranslatedListMessage(e, !0);
              },
            ),
            skinsChatText: r.computed(
              "boostedSkins.[]",
              "computedDisplayName",
              "ipAmount",
              "root.tra",
              "root.tra.boost_success_skin_chat_message",
              function () {
                return this.getTranslatedListMessage(
                  "boost_success_skin_chat_message",
                  !1,
                );
              },
            ),
            getTranslatedListMessage(e, t) {
              const n = this.get("boostedSkins.length"),
                i = this.get("root.tra");
              return (0 === n && !t) || !i
                ? ""
                : n <= 1
                  ? ((e += 1 === n ? "_single" : "_noskins"),
                    i.formatString(e, {
                      summonerName: this.get("computedDisplayName"),
                      skinName: this.get("boostedSkins.firstObject.name"),
                      ip: this.get("ipAmount"),
                    }))
                  : 2 === n
                    ? ((e += "_double"),
                      i.formatString(e, {
                        summonerName: this.get("computedDisplayName"),
                        ip: this.get("ipAmount"),
                        skinName1: this.get("boostedSkins")[0].name,
                        skinName2: this.get("boostedSkins")[1].name,
                      }))
                    : ((e += "_multi"),
                      i.formatString(e, {
                        summonerName: this.get("computedDisplayName"),
                        ip: this.get("ipAmount"),
                        skinNameList: this.joinWithoutLast(
                          this.get("boostedSkins").map((e) => e.get("name")),
                          ", ",
                        ),
                        lastSkinName: this.get("boostedSkins.lastObject.name"),
                      }));
            },
            joinWithoutLast: function (e, t) {
              return e.splice(0, e.length - 1).join(t);
            },
            ipAmount: r.computed(
              "ipReward",
              "ipRewardForPurchaser",
              "boostPurchaserIsSelf",
              function () {
                return this.get("boostPurchaserIsSelf")
                  ? this.get(
                      "root.jmxSettings.TeamBuilderDraft.BattleBoostPurchaserRewardBE",
                    ) || 200
                  : this.get(
                      "root.jmxSettings.TeamBuilderDraft.BattleBoostedPlayerRewardBE",
                    ) || 100;
              },
            ),
            playSfxUISound: function (e) {
              const t = "/fe/lol-champ-select/sounds/" + e;
              o.default.playSound("sfx-notifications", t);
            },
            playTeamBoostSound: function () {
              this.playSfxUISound("sfx-cs-notif-boost-unlocked.ogg");
            },
            conversationId: r.computed(
              "root.conversations.@each.id",
              "root.conversations.@each.type",
              function () {
                if (!this.get("root.conversations.length")) return;
                const e = this.get("root.conversations").findBy(
                  "type",
                  "championSelect",
                );
                if (e) {
                  const t = e.get("id");
                  if (t) return encodeURIComponent(t);
                }
              },
            ),
            displayBoostGeneralMessage: function (e) {
              const t = this.get("root.tra");
              let n;
              n = this.get("boostPurchaserIsSelf")
                ? t.formatString("boost_success_general_chat_message_self")
                : t.formatString("boost_success_general_chat_message_other", {
                    summonerName: this.get("computedDisplayName"),
                  });
              const i = { body: n, type: "celebration" };
              return this._chatBinding.post(
                `/v1/conversations/${e}/messages`,
                i,
              );
            },
            displayBoostIpMessage: function (e) {
              const t = this.get("root.tra"),
                n = this.get("ipAmount"),
                i = {
                  body: t.formatString("boost_success_ip_chat_message", {
                    amount: n,
                  }),
                  type: "celebration",
                };
              return this._chatBinding.post(
                `/v1/conversations/${e}/messages`,
                i,
              );
            },
            displayBoostSkinMessages: function (e) {
              const t = this.get("boostedSkins.firstObject.championId");
              if (-1 !== this._alreadySentChatMessagesChampionIds.indexOf(t))
                return;
              const n = this.get("skinsChatText");
              if (!n) return;
              const i = { body: n, type: "celebration" };
              this._chatBinding.post(`/v1/conversations/${e}/messages`, i),
                this._alreadySentChatMessagesChampionIds.push(t);
            },
          });
        e.exports = m;
      },
      (e, t, n) => {
        "use strict";
        var i = (function (e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var n = s(t);
          if (n && n.has(e)) return n.get(e);
          var i = {},
            o = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var a in e)
            if ("default" !== a && Object.prototype.hasOwnProperty.call(e, a)) {
              var r = o ? Object.getOwnPropertyDescriptor(e, a) : null;
              r && (r.get || r.set)
                ? Object.defineProperty(i, a, r)
                : (i[a] = e[a]);
            }
          (i.default = e), n && n.set(e, i);
          return i;
        })(n(1));
        function s(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (s = function (e) {
            return e ? n : t;
          })(e);
        }
        n(81);
        const o = i.Ember.Component.extend({
          classNames: ["boost-notification-container"],
          layout: n(82),
          bodyText: i.Ember.computed.alias("boostedSkinsMessage"),
        });
        e.exports = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "DVlrzM6b",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\boost-notification-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\boost-notification-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\boost-notification-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-content-block",[]],["static-attr","type","notification"],["flush-element"],["text","\\n  "],["open-element","h4",[]],["static-attr","class","boost-notification-title"],["flush-element"],["append",["unknown",["tra","boost_unlocked_title"]],false],["close-element"],["text","\\n  "],["open-element","p",[]],["static-attr","class","boost-body"],["flush-element"],["append",["helper",["sanitize"],[["get",["bodyText"]]],null],false],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = n(60);
        const s = n(1),
          { Ember: o, EmberAddons: a } = s,
          r = s.Lodash,
          { RunMixin: l } = a.EmberLifeline,
          c = s
            .getProvider()
            .get("rcp-fe-audio")
            .getChannel("music-champ-selection"),
          m = s.getProvider().get("rcp-fe-audio").getChannel("sfx-ui"),
          u = [
            "/fe/lol-champ-select/sounds/music-cs-draft-pick-base-layer-01.ogg",
            "/fe/lol-champ-select/sounds/music-cs-draft-pick-intensity-layer-01.ogg",
            "/fe/lol-champ-select/sounds/music-cs-draft-pick-intensity-layer-02.ogg",
            "/fe/lol-champ-select/sounds/music-cs-draft-pick-intensity-layer-03.ogg",
            "/fe/lol-champ-select/sounds/music-cs-draft-pick-intensity-layer-04.ogg",
          ];
        var p = o.Mixin.create(l, {
          champSelectMusicFile: o.computed.alias(
            "map.assets.champ-select-background-sound",
          ),
          startMusicSyncedToEndOfChampSelect: function (e) {
            const t = this.get("champSelectMusic"),
              n = this.get("champSelectMusicFile"),
              i = () => {
                this.runTask(() => {
                  if (this.get("champSelectMusicFile") !== n || t.isPlaying())
                    return void this.removeObserver(
                      "session.timer.timeRemaining",
                      this,
                      i,
                    );
                  const s = this.get("session.timer.timeRemaining");
                  s &&
                    (this.removeObserver(
                      "session.timer.timeRemaining",
                      this,
                      i,
                    ),
                    t.play({
                      offset: Math.max(e / 1e3 - s, 0),
                      when: Math.max(s - e / 1e3, 0),
                    }));
                }, 1);
              };
            this.addObserver("session.timer.timeRemaining", this, i), i();
          },
          startDraftMusic: function () {
            const e = this.get("champSelectMusicFile");
            let t;
            this.draftMusicTracks || (this.draftMusicTracks = new Map()),
              this.draftPlayingTracks || (this.draftPlayingTracks = []);
            const n = function () {
              if (
                !this.isDestroying &&
                !this.isDestroyed &&
                this.draftMusicTracks
              )
                return this.get("champSelectMusicFile") === e &&
                  (this.get("isDraftMode") ||
                    this.get("isBlindWithBans") ||
                    this.get("isRandomWithBans"))
                  ? void this.processDraftMusicChange()
                  : (this.removeObserver(
                      "sessionActions.activeAction",
                      this,
                      t,
                    ),
                    this.removeObserver(
                      "sessionActions.numBanActionsCompleted",
                      this,
                      t,
                    ),
                    this.removeObserver(
                      "sessionActions.numPickActionsCompleted",
                      this,
                      t,
                    ),
                    void this.removeObserver("session.timer.phase", this, t));
            }.bind(this);
            (t = function () {
              o.run.once(this, n);
            }.bind(this)),
              this.addObserver("sessionActions.activeAction", this, t),
              this.addObserver(
                "sessionActions.numBanActionsCompleted",
                this,
                t,
              ),
              this.addObserver(
                "sessionActions.numPickActionsCompleted",
                this,
                t,
              ),
              this.addObserver("session.timer.phase", this, t),
              t();
          },
          isDraftMode: o.computed("queue.gameTypeConfig.pickMode", function () {
            return i.DRAFT_PICK_MODES.includes(
              this.get("queue.gameTypeConfig.pickMode"),
            );
          }),
          isBlindWithBans: o.computed(
            "sessionActions.hasBans",
            "sessionActions.allPlayersPickTogether",
            "sessionActions.allPlayersVoteTogether",
            function () {
              const e = this.get("sessionActions.hasBans"),
                t =
                  this.get("sessionActions.allPlayersPickTogether") ||
                  this.get("sessionActions.allPlayersVoteTogether");
              return e && t;
            },
          ),
          isRandomWithBans: o.computed(
            "sessionActions.hasBans",
            "sessionActions.hasPicksOrVotes",
            "gameflow.gameData.isCustomGame",
            function () {
              const e = this.get("sessionActions.hasBans"),
                t = !this.get("sessionActions.hasPicksOrVotes");
              return !this.get("gameflow.gameData.isCustomGame") && e && t;
            },
          ),
          preloadDraftPickPhaseMusicTracks: function () {
            this.draftMusicTracks &&
              u.forEach((e) => {
                if (!this.draftMusicTracks.get(e)) {
                  const t = c.createSound(e);
                  t.ready(), this.draftMusicTracks.set(e, t);
                }
              });
          },
          processDraftMusicChange: function () {
            const e = this.get("sessionActions.activeAction"),
              t =
                this.get("sessionActions.nextActions") &&
                this.get("sessionActions.nextActions.length") &&
                this.get("sessionActions.nextActions.firstObject"),
              n = e && t && e.get("isPhaseTransition"),
              i = this.get("sessionActions.isSimultaneousBans")
                ? 4
                : this.get("sessionActions.numBanActionsCompleted"),
              s = this.get("isBlindWithBans")
                ? 10
                : this.get("sessionActions.numPickActionsCompleted"),
              o =
                (e && (e.get("isBan") || e.get("isBanShowcase"))) ||
                (!e && 0 === s) ||
                (n && t.get("isBan")),
              a =
                (e && (e.get("isPick") || e.get("isVote"))) ||
                (!e && s > 0) ||
                (n && (t.get("isPick") || t.get("isVote"))),
              r =
                this.get("sessionActions.finalizationPhaseActions.length") > 0,
              l =
                this.get("session.timer.inFinalizationPhase") &&
                (!r || (r && !t)),
              c = [];
            if (this.get("session.timer.inPlanningPhase"))
              (this.planningToBanTransitionSoundPlayed = !1),
                i >= 0 &&
                  c.push({
                    path: "/fe/lol-champ-select/sounds/music-cs-draft-pickintent-01.ogg",
                    volume: 0.37,
                    isMasterTrack: !0,
                    delayBeforeStop: 1578,
                  }),
                window.setTimeout(() => {
                  this.preloadDraftPickPhaseMusicTracks();
                }, 8e3);
            else if (this.get("session.timer.inBanPickPhase") && o)
              if (
                (0 !== s ||
                  this.planningToBanTransitionSoundPlayed ||
                  (m.playSound(
                    "/fe/lol-champ-select/sounds/music-cs-draft-pickintent-to-ban-trans-01.ogg",
                  ),
                  (this.planningToBanTransitionSoundPlayed = !0)),
                (this.banToPickTransitionSoundPlayed = !1),
                (this.finalizationTransitionSoundPlayed = !1),
                this.get("isRandomWithBans"))
              ) {
                const e = this.get(
                  "map.assets.champ-select-banphase-background-sound",
                );
                c.push({ path: e, volume: 0.37, isMasterTrack: !0 });
              } else
                i >= 0 &&
                  c.push({
                    path: "/fe/lol-champ-select/sounds/music-cs-draft-ban-base-layer-01.ogg",
                    volume: 0.37,
                    delay: 1578,
                    isMasterTrack: !0,
                  }),
                  i >= 1 &&
                    c.push({
                      path: "/fe/lol-champ-select/sounds/music-cs-draft-ban-intensity-layer-01.ogg",
                      volume: 0.185,
                    }),
                  i >= 2 &&
                    (c.push({
                      path: "/fe/lol-champ-select/sounds/music-cs-draft-ban-intensity-layer-01.ogg",
                      volume: 0.27749999999999997,
                    }),
                    c.push({
                      path: "/fe/lol-champ-select/sounds/music-cs-draft-ban-intensity-layer-02.ogg",
                      volume: 0.185,
                    })),
                  i >= 3 &&
                    (c.push({
                      path: "/fe/lol-champ-select/sounds/music-cs-draft-ban-intensity-layer-01.ogg",
                      volume: 0.37,
                    }),
                    c.push({
                      path: "/fe/lol-champ-select/sounds/music-cs-draft-ban-intensity-layer-02.ogg",
                      volume: 0.27749999999999997,
                    })),
                  i >= 4 &&
                    c.push({
                      path: "/fe/lol-champ-select/sounds/music-cs-draft-ban-intensity-layer-02.ogg",
                      volume: 0.37,
                    });
            else if (this.get("session.timer.inBanPickPhase") && a)
              (0 !== s && !this.get("isBlindWithBans")) ||
                this.banToPickTransitionSoundPlayed ||
                (m.playSound(
                  "/fe/lol-champ-select/sounds/music-cs-draft-ban-to-pick-trans-01.ogg",
                ),
                (this.banToPickTransitionSoundPlayed = !0)),
                s >= 0 &&
                  c.push({
                    path: "/fe/lol-champ-select/sounds/music-cs-draft-pick-base-layer-01.ogg",
                    volume: 0.37,
                    isMasterTrack: !0,
                  }),
                s >= 1 &&
                  c.push({
                    path: "/fe/lol-champ-select/sounds/music-cs-draft-pick-intensity-layer-01.ogg",
                    volume: 0.185,
                  }),
                s >= 2 &&
                  c.push({
                    path: "/fe/lol-champ-select/sounds/music-cs-draft-pick-intensity-layer-02.ogg",
                    volume: 0.185,
                  }),
                s >= 3 &&
                  c.push({
                    path: "/fe/lol-champ-select/sounds/music-cs-draft-pick-intensity-layer-01.ogg",
                    volume: 0.27749999999999997,
                  }),
                s >= 4 &&
                  (c.push({
                    path: "/fe/lol-champ-select/sounds/music-cs-draft-pick-intensity-layer-02.ogg",
                    volume: 0.27749999999999997,
                  }),
                  c.push({
                    path: "/fe/lol-champ-select/sounds/music-cs-draft-pick-intensity-layer-03.ogg",
                    volume: 0.185,
                  })),
                s >= 5 &&
                  c.push({
                    path: "/fe/lol-champ-select/sounds/music-cs-draft-pick-intensity-layer-01.ogg",
                    volume: 0.37,
                  }),
                s >= 6 &&
                  (c.push({
                    path: "/fe/lol-champ-select/sounds/music-cs-draft-pick-intensity-layer-02.ogg",
                    volume: 0.37,
                  }),
                  c.push({
                    path: "/fe/lol-champ-select/sounds/music-cs-draft-pick-intensity-layer-03.ogg",
                    volume: 0.27749999999999997,
                  }),
                  c.push({
                    path: "/fe/lol-champ-select/sounds/music-cs-draft-pick-intensity-layer-04.ogg",
                    volume: 0.185,
                  })),
                s >= 7 &&
                  (c.push({
                    path: "/fe/lol-champ-select/sounds/music-cs-draft-pick-intensity-layer-03.ogg",
                    volume: 0.37,
                  }),
                  c.push({
                    path: "/fe/lol-champ-select/sounds/music-cs-draft-pick-intensity-layer-04.ogg",
                    volume: 0.27749999999999997,
                  })),
                s >= 8 &&
                  c.push({
                    path: "/fe/lol-champ-select/sounds/music-cs-draft-pick-intensity-layer-04.ogg",
                    volume: 0.37,
                  });
            else if (l) {
              const e =
                60 - this.get("session.timer.timeRemaining") < 0
                  ? 0
                  : 60 - this.get("session.timer.timeRemaining");
              !this.finalizationTransitionSoundPlayed &&
                e > 0 &&
                (m.playSound(
                  "/fe/lol-champ-select/sounds/music-cs-draft-ban-to-pick-trans-01.ogg",
                ),
                (this.finalizationTransitionSoundPlayed = !0));
              let t =
                "/fe/lol-champ-select/sounds/music-cs-draft-finalization-60sec-01.ogg";
              this.get("isRandomWithBans") &&
                (t = this.get("champSelectMusicFile")),
                c.push({
                  path: t,
                  volume: 0.37,
                  loop: !1,
                  offset: e,
                  isMasterTrack: !0,
                });
            }
            let u = [];
            return (
              c.length && (u = this.startOrContinueDraftMusicTracks(c)),
              this.stopDraftMusicTracks(u),
              c
            );
          },
          playMusicTrack: function (e, t) {
            return (
              this.draftMasterTrack && !t.isMasterTrack
                ? (e.audioElement.currentTime =
                    this.draftMasterTrack.audioElement.currentTime)
                : (e.audioElement.currentTime = 0),
              e.ready().then(() => {
                const n = e.play({ offset: t.offset || !1 });
                if (this.draftMasterTrack && !t.isMasterTrack) {
                  e.audioElement.currentTime =
                    this.draftMasterTrack.audioElement.currentTime;
                  const t = window.setInterval(() => {
                    if (
                      !(
                        e &&
                        e.audioElement &&
                        this.draftMasterTrack &&
                        this.draftMasterTrack.audioElement
                      )
                    )
                      return void window.clearInterval(t);
                    const n =
                      e.audioElement.currentTime -
                      this.draftMasterTrack.audioElement.currentTime;
                    (n > 0.05 || n < -0.05) &&
                      (e.audioElement.currentTime =
                        this.draftMasterTrack.audioElement.currentTime);
                  }, 1e3);
                }
                return (
                  t.fadeIn
                    ? e.fade(0, t.volume, t.fadeIn || 1e3)
                    : this.draftMasterTrack &&
                      !t.isMasterTrack &&
                      e.setVolume(t.volume),
                  n
                );
              })
            );
          },
          scheduleMusicTrackPlay: function (e, t) {
            const n = this.draftMasterTrack && !t.isMasterTrack;
            if (e && !e.playbackScheduled) {
              e.playbackScheduled = !0;
              const i = window.performance.now();
              let s = 0;
              if (
                (e.options.delayedUntilTime &&
                  (s = e.options.delayedUntilTime - i),
                n && this.draftMasterTrack.options.delayedUntilTime)
              ) {
                const e = this.draftMasterTrack.options.delayedUntilTime - i;
                e > s && (s = e);
              }
              if (!(s > 0)) return this.playMusicTrack(e, t);
              window.setTimeout(() => {
                if (e) return this.playMusicTrack(e, t);
              }, s);
            }
          },
          startOrContinueDraftMusicTracks: function (e) {
            const t = {};
            return (
              e.forEach((e) => {
                let n = this.draftMusicTracks.get(e.path);
                if (
                  (n && this.draftPlayingTracks.indexOf(e.path) >= 0) ||
                  void 0 !== t[e.path]
                )
                  t[e.path] = e.volume || 1;
                else {
                  const i = {
                    isLoop: void 0 === e.loop || e.loop,
                    fadeOut: void 0 === e.fadeOut ? 1263 : e.fadeOut,
                    delayedUntilTime: e.delay
                      ? window.performance.now() + e.delay
                      : void 0,
                    delayBeforeStop: e.delayBeforeStop,
                    offset: e.offset || !1,
                  };
                  n
                    ? (n.audioElement &&
                        (n.audioElement.loop = void 0 === e.loop || e.loop),
                      Object.assign(n.options, i))
                    : (n = c.createSound(e.path, i)),
                    (t[e.path] = e.volume);
                  ((this.draftMasterTrack && !e.isMasterTrack) || e.fadeIn) &&
                    (n.setVolume(0), (t[e.path] = 0)),
                    n
                      .ready()
                      .then(
                        () => (
                          (n.playbackScheduled = !1),
                          this.scheduleMusicTrackPlay(n, e)
                        ),
                      ),
                    this.draftMusicTracks.set(e.path, n),
                    e.isMasterTrack && (this.draftMasterTrack = n);
                }
              }),
              e.forEach((e) => {
                -1 === this.draftPlayingTracks.indexOf(e.path) &&
                  this.draftPlayingTracks.push(e.path);
              }),
              r.forEach(t, (e, t) => {
                const n = this.draftMusicTracks.get(t);
                n.ready().then(() => {
                  n.setVolume(e);
                });
              }),
              r.keys(t) || []
            );
          },
          stopDraftMusicTracks: function (e) {
            this.draftPlayingTracks &&
              (this.draftPlayingTracks = this.draftPlayingTracks.filter((t) => {
                if (-1 === e.indexOf(t)) {
                  const e = this.draftMusicTracks.get(t);
                  this.draftMusicTracks.delete(t);
                  const n = () => {
                      e.ready().then(
                        () => (
                          (e.audioElement.src = ""),
                          setTimeout(() => {
                            e && e.dispose();
                          }, 5e3),
                          null
                        ),
                      );
                    },
                    i = () => {
                      e.options.fadeOut
                        ? (e.fadeOut(e.options.fadeOut, { stop: !0 }),
                          e.on("stop", () => {
                            n();
                          }))
                        : (e.setVolume(0),
                          e
                            .ready()
                            .then(() => (e.stop(), null))
                            .then(() => (n(), null)));
                    };
                  return (
                    e.options.delayBeforeStop
                      ? window.setTimeout(() => {
                          i();
                        }, e.options.delayBeforeStop)
                      : i(),
                    this.draftMasterTrack === t &&
                      (this.draftMasterTrack = null),
                    !1
                  );
                }
                return !0;
              }));
          },
          startChampSelectMusic: o.observer(
            "champSelectMusicFile",
            "queue.gameTypeConfig.pickMode",
            "isDraftMode",
            "isBlindWithBans",
            "isShown",
            o.on("init", function () {
              o.run.once(this, function () {
                if (
                  !this.get("isShown") ||
                  !this.get("queue.gameTypeConfig.pickMode") ||
                  this.get("musicStarted")
                )
                  return;
                const e = this.get("champSelectMusicFile");
                this.get("isDraftMode") ||
                this.get("isBlindWithBans") ||
                this.get("isRandomWithBans")
                  ? (this.startDraftMusic(), this.set("musicStarted", !0))
                  : e &&
                    (this.set(
                      "champSelectMusic",
                      c.createSound(e, { fadeIn: !0 }),
                    ),
                    this.get("champSelectMusic")
                      .ready()
                      .then(
                        function () {
                          return this.get("champSelectMusicFile") === e &&
                            this.get("isShown")
                            ? ("AllRandomPickStrategy" ===
                              this.get("queue.gameTypeConfig.pickMode")
                                ? this.startMusicSyncedToEndOfChampSelect(76831)
                                : this.get("champSelectMusic").play(),
                              null)
                            : null;
                        }.bind(this),
                      ),
                    this.set("musicStarted", !0));
              });
            }),
          ),
          stopAllTracks: function () {
            this.draftPlayingTracks &&
              this.draftPlayingTracks.length &&
              (this.stopDraftMusicTracks([]),
              delete this.draftMusicTracks,
              delete this.draftPlayingTracks);
            const e = this.get("champSelectMusic");
            e && e.isPlaying() && e.stop(),
              e && (e.dispose(), this.set("champSelectMusic", null)),
              this.set("musicStarted", !1);
          },
          stopChampSelectMusicOnHide: o.observer("isShown", function () {
            this.get("isShown") || this.stopAllTracks();
          }),
        });
        t.default = p;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default =
            t.TRADE_STATES =
            t.TRADE_RESOLVED_STATES =
            t.TRADE_CREATED_STATES =
            t.TRADE_CLEAR_TIMEOUT_MS =
            t.TRADE_CANCEL_TIMEOUT_MS =
            t.ACCEPTED_TIMEOUT_MS =
              void 0);
        var i = (function (e, t) {
            if (!t && e && e.__esModule) return e;
            if (null === e || ("object" != typeof e && "function" != typeof e))
              return { default: e };
            var n = r(t);
            if (n && n.has(e)) return n.get(e);
            var i = {},
              s = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e)
              if (
                "default" !== o &&
                Object.prototype.hasOwnProperty.call(e, o)
              ) {
                var a = s ? Object.getOwnPropertyDescriptor(e, o) : null;
                a && (a.get || a.set)
                  ? Object.defineProperty(i, o, a)
                  : (i[o] = e[o]);
              }
            (i.default = e), n && n.set(e, i);
            return i;
          })(n(1)),
          s = a(n(66)),
          o = a(n(58));
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function r(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (r = function (e) {
            return e ? n : t;
          })(e);
        }
        const { RunMixin: l } = i.EmberAddons.EmberLifeline;
        n(85);
        const c = {
          RECEIVED: "RECEIVED",
          AVAILABLE: "AVAILABLE",
          SENT: "SENT",
          BUSY: "BUSY",
          DECLINED: "DECLINED",
          ACCEPTED: "ACCEPTED",
          CANCELLED: "CANCELLED",
        };
        t.TRADE_STATES = c;
        const m = [c.ACCEPTED, c.DECLINED, c.CANCELLED, c.BUSY];
        t.TRADE_RESOLVED_STATES = m;
        const u = [c.RECEIVED, c.SENT, c.BUSY];
        t.TRADE_CREATED_STATES = u;
        t.TRADE_CANCEL_TIMEOUT_MS = 15e3;
        t.TRADE_CLEAR_TIMEOUT_MS = 1700;
        t.ACCEPTED_TIMEOUT_MS = 200;
        const p = "session/trades",
          d = "cancel",
          h = "accept",
          g = "decline",
          f = "clear";
        var S = i.Ember.Component.extend(l, {
          layout: n(86),
          init: function () {
            this._super(...arguments),
              (this.audioPool = o.default),
              this.set("isAnimated", !0);
          },
          didRender: function () {
            this._super(...arguments),
              this.cancelTask(this._tradeCancelTimeout),
              this.cancelTask(this._tradeClearTimeout);
            const e = this.get("trade");
            e.state === c.SENT && this.scheduleTradeCancel(e.id),
              u.includes(e.state) &&
                (this.set("isDisplayed", !0),
                this.setSummonerName(e.otherSummonerIndex),
                this.positionTradeDialog(e.otherSummonerIndex)),
              m.includes(e.state) && this.scheduleTradeClear(e.id, e.state),
              this.prevTradeState !== e.state && this.playTradeSfx(e.state),
              (this.prevTradeState = e.state);
          },
          positionTradeDialog: function (e) {
            const t = [
                ...document.querySelectorAll(
                  ".your-party .champion-icon-container",
                ),
              ][e].getBoundingClientRect(),
              n = this.element.querySelector(".trade-dialog");
            (n.style.top = t.top - 5 + "px"),
              (n.style.left = `${t.left + t.width + 15}px`);
          },
          setSummonerName: function (e) {
            const t = this.get("summoners");
            t &&
              e >= 0 &&
              t[e] &&
              t[e].displayName &&
              this.set("otherSummonerName", t[e].displayName);
          },
          playTradeSfx: function (e) {
            let t = "";
            switch (e) {
              case c.SENT:
              case c.RECEIVED:
                t =
                  "/fe/lol-champ-select/sounds/sfx-cs-notif-traderequest-rcvd.ogg";
                break;
              case c.ACCEPTED:
                t =
                  "/fe/lol-champ-select/sounds/sfx-cs-notif-traderequest-accepted.ogg";
                break;
              case c.DECLINED:
                t =
                  "/fe/lol-champ-select/sounds/sfx-cs-notif-traderequest-declined.ogg";
            }
            t && this.audioPool.playSound("sfx-notifications", t);
          },
          scheduleTradeCancel: function (e) {
            this._tradeCancelTimeout = this.runTask(
              () => this.tradeServiceCall(e, p, d),
              15e3,
            );
          },
          scheduleTradeClear: function (e, t) {
            const n = t === c.ACCEPTED ? 200 : 1700;
            this._tradeClearTimeout = this.runTask(
              () => (
                this.set("isDisplayed", !1),
                this.tradeServiceCall(e, "ongoing-trade", f)
              ),
              n,
            );
          },
          showCancelTradeButton: i.Ember.computed.equal("trade.state", c.SENT),
          showAcceptTradeButton: i.Ember.computed.equal(
            "trade.state",
            c.RECEIVED,
          ),
          isCloseButtonDisabled: i.Ember.computed("trade.state", function () {
            return m.includes(this.get("trade.state"));
          }),
          tradeStateClass: i.Ember.computed("trade.state", function () {
            return this.get("trade.state").toLowerCase();
          }),
          isTradeInProgress: i.Ember.computed("trade.state", function () {
            const e = this.get("trade.state");
            return e === c.SENT || e === c.RECEIVED;
          }),
          tradeMessageString: i.Ember.computed(
            "trade.state",
            "tradeWaitingString",
            "tradeCanceledString",
            "tradeDeclinedString",
            "tradeErrorString",
            function () {
              switch (this.get("trade.state")) {
                case c.SENT:
                case c.RECEIVED:
                  return this.get("tradeWaitingString");
                case c.CANCELLED:
                  return this.get("tra.pregame_trade_canceled");
                case c.DECLINED:
                  return this.get("tra.pregame_trade_declined");
                case c.BUSY:
                  return this.get("tradeBusyString");
                case c.ACCEPTED:
                  return "";
                default:
                  return this.get("tra.pregame_trade_error");
              }
            },
          ),
          tradeWaitingString: i.Ember.computed(
            "trade.initiatedByLocalPlayer",
            "trade.requesterChampionName",
            "otherSummonerName",
            "tra.pregame_trade_requested",
            "tra.pregame_trade_waiting",
            function () {
              const e = this.get("trade.initiatedByLocalPlayer"),
                t = this.get("otherSummonerName");
              return e
                ? this.get("tra.service").formatString(
                    "pregame_trade_waiting",
                    { actor: t },
                  )
                : this.get("tra.service").formatString(
                    "pregame_trade_requested",
                    {
                      actor: t,
                      entity1: this.get("trade.requesterChampionName"),
                      entity2: this.get("trade.responderChampionName"),
                    },
                  );
            },
          ),
          tradeBusyString: i.Ember.computed(
            "otherSummonerName",
            "tra.pregame_trade_error",
            function () {
              return this.get("tra.service").formatString(
                "pregame_trade_busy",
                { actor: this.get("otherSummonerName") },
              );
            },
          ),
          tradeServiceCall: function (e, t, n) {
            const o = `/lol-champ-select/v1/${t}/${e}/${n}`;
            return s.default
              .ajax({
                type: "POST",
                url: o,
                errorMessage: "error_could_not_trade",
              })
              .then(() => {
                this.recordDidRequestSucceed &&
                  this.recordDidRequestSucceed(!0),
                  i.Telemetry.invokeWithLowProbability(function () {
                    switch (n) {
                      case h:
                        i.Telemetry.recordNonTimingTracingEvent(
                          "champ-trade-accept-success",
                          1,
                          "event",
                        );
                        break;
                      case d:
                        i.Telemetry.recordNonTimingTracingEvent(
                          "champ-trade-cancel-success",
                          1,
                          "event",
                        );
                        break;
                      case g:
                        i.Telemetry.recordNonTimingTracingEvent(
                          "champ-trade-decline-success",
                          1,
                          "event",
                        );
                        break;
                      case f:
                        i.Telemetry.recordNonTimingTracingEvent(
                          "champ-trade-clear-success",
                          1,
                          "event",
                        );
                    }
                  });
              })
              .catch((e) => {
                this.recordDidRequestSucceed &&
                  this.recordDidRequestSucceed(!1, e);
                i.DataBinding.bindTo(i.default.getProvider().getSocket())
                  .get("/lol-summoner/v1/current-summoner")
                  .then(function (t) {
                    const { accountId: s, puuid: o, summonerId: a } = t;
                    i.Telemetry.invokeWithLowProbability(function () {
                      const t = e && e.responseText ? e.responseText : "",
                        r = JSON.stringify({
                          accountId: s,
                          clientDateISOString: new Date().toISOString(),
                          puuid: o,
                          responseText: t,
                          summonerId: a,
                        });
                      switch (n) {
                        case h:
                          i.Telemetry.sendEvent("champ-trade-accept-fail", r),
                            i.Telemetry.recordNonTimingTracingEvent(
                              "champ-trade-accept-fail",
                              1,
                              "event",
                            );
                          break;
                        case d:
                          i.Telemetry.sendEvent("champ-trade-cancel-fail", r),
                            i.Telemetry.recordNonTimingTracingEvent(
                              "champ-trade-cancel-fail",
                              1,
                              "event",
                            );
                          break;
                        case g:
                          i.Telemetry.sendEvent("champ-trade-decline-fail", r),
                            i.Telemetry.recordNonTimingTracingEvent(
                              "champ-trade-decline-fail",
                              1,
                              "event",
                            );
                          break;
                        case f:
                          i.Telemetry.sendEvent("champ-trade-clear-fail", r),
                            i.Telemetry.recordNonTimingTracingEvent(
                              "champ-trade-clear-fail",
                              1,
                              "event",
                            );
                      }
                    });
                  });
              });
          },
          actions: {
            acceptTrade: function (e) {
              return (
                i.Telemetry.startTracingEvent("champ-select-trade-accept"),
                this.tradeServiceCall(e, p, h).finally(() => {
                  window.requestAnimationFrame(() => {
                    i.Telemetry.endTracingEvent("champ-select-trade-accept");
                  });
                })
              );
            },
            closeTrade: function (e, t) {
              return t === c.SENT
                ? this.tradeServiceCall(e, p, d)
                : t === c.RECEIVED
                  ? this.tradeServiceCall(e, p, g)
                  : void 0;
            },
          },
        });
        t.default = S;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "6NcPjYco",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\trade-dialog-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\trade-dialog-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\trade-dialog-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["trade-dialog animated ",["helper",["unless"],[["get",["showAcceptTradeButton"]],"not-received"],null]," ",["unknown",["tradeStateClass"]]," ",["helper",["if"],[["get",["isDisplayed"]],"active"],null]]]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-flyout-frame",[]],["static-attr","orientation","right"],["dynamic-attr","show",["unknown",["isDisplayed"]],null],["dynamic-attr","animated",["unknown",["isAnimated"]],null],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","trade-wrapper"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","trade-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","champion-bg-container"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","champion-bg"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["trade","requesterChampionSplashPath"]],");"]]],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","champion-bg-overlay"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","trade-content-container"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","trade-message"],["flush-element"],["append",["unknown",["tradeMessageString"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","button-group"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showAcceptTradeButton"]]],null,2],["block",["if"],[["get",["showCancelTradeButton"]]],null,1],["text","          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"],["block",["if"],[["get",["isTradeInProgress"]]],null,0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","trade-timer-wrapper"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","trade-timer"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","action-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"closeTrade",["get",["trade","id"]],["get",["trade","state"]]],null],null],["flush-element"],["text","\\n               "],["open-element","div",[]],["static-attr","class","action-button-inner-container"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","decline-icon"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","action-text"],["flush-element"],["text","\\n                  "],["append",["unknown",["tra","pregame_trade_cancel"]],false],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","action-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"acceptTrade",["get",["trade","id"]]],null],null],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","action-button-inner-container"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","action-icon"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","action-text"],["flush-element"],["text","\\n                  "],["append",["unknown",["tra","pregame_trade_accept"]],false],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n             "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","action-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"closeTrade",["get",["trade","id"]],["get",["trade","state"]]],null],null],["flush-element"],["text","\\n               "],["open-element","div",[]],["static-attr","class","action-button-inner-container"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","decline-icon"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","action-text"],["flush-element"],["text","\\n                  "],["append",["unknown",["tra","pregame_trade_decline"]],false],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        const i = n(1),
          { Ember: s } = i,
          o = s.Object.extend({
            iconPath: s.computed.alias("wardImagePath"),
            locked: s.computed.not("ownership.owned"),
          });
        e.exports = o;
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "BRzf5Bk3",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["position-assignment-intro-container ",["helper",["if"],[["get",["showPositionAssignmentBackground"]],"visible","hidden"],null]]]],["flush-element"],["text","\\n  "],["append",["helper",["position-assignment-intro"],null,[["map","mapStaticPath","isShown","hidePins","shouldPlayVideos","showPositionAssignment","pinDropSummoners","mapSide","splashDefocus"],[["get",["map"]],["get",["champSelectBackground"]],["get",["isShown"]],["get",["isNexusBlitz"]],["get",["uxSettings","largeAreaAnimationsEnabled"]],["get",["showPositionAssignment"]],["get",["pinDropSummoners"]],["get",["pinDropNotification","mapSide"]],["get",["splashDefocus"]]]]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["append",["helper",["champion-splash-background"],null,[["pickJustLockedIn","splashUnlocked","splashDefocus","hasBans","splashPath","showPositionAssignment","sessionActions","currentSummoner","champSelectScreen","isDraftMode","isShowingGrid","emblems","uxSettings","jmxSettings","isShowingVoteReveal"],[["get",["pickJustLockedIn"]],["get",["splashUnlocked"]],["get",["splashDefocus"]],["get",["sessionActions","hasBans"]],["get",["splashPath"]],["get",["showPositionAssignment"]],["get",["sessionActions"]],["get",["currentSummoner"]],["get",["champSelectScreen"]],["get",["isDraftMode"]],["get",["isShowingGrid"]],["get",["viewSkin","emblems"]],["get",["uxSettings"]],["get",["jmxSettings"]],["get",["isShowingVoteReveal"]]]]],false],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","top-darken"],["flush-element"],["close-element"],["text","\\n\\n"],["append",["helper",["champion-splash-ring"],null,[["currentActions","champSelectScreen","uxSettings","isHeaderExpanded","shouldPlayIntroAnimation"],[["get",["sessionActions","currentActions"]],["get",["champSelectScreen"]],["get",["uxSettings"]],["get",["isHeaderExpanded"]],["get",["shouldPlaySplashRingAnimation"]]]]],false],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["champion-select-summoner-array-container ",["helper",["if"],[["get",["session","timer","inFinalizationPhase"]],"in-finalization"],null]]]],["flush-element"],["text","\\n  "],["append",["helper",["summoner-array"],null,[["summoners","sessionActions","isUILockedForGameStart","uxSettings","showPositionAssignment","isLeft","showFirstPick","timer","currentSummoner","gameModeSubteamData","timerDisabledPickOrderSwap","activeSwap","activeTrade","formattedTime","isPlayingSimulBanOutro","team","viewSkin","championChestAvailabilityMap","shouldShowChestAvailability","showChestAvailabilityHintedPortraits","boosterSummonerId","jmxSettings","PickOrderSwappingTooltipEnabled","ChampTradingTooltipEnabled","isCustomGame","recordDidRequestSucceed"],[["get",["myTeamSummoners"]],["get",["sessionActions"]],["get",["isUILockedForGameStart"]],["get",["uxSettings"]],["get",["showPositionAssignment"]],true,["get",["showLeftSideFirstPick"]],["get",["session","timer"]],["get",["currentSummoner"]],["get",["gameModeSubteamData"]],["get",["timerDisabledPickOrderSwap"]],["get",["activeSwap"]],["get",["activeTrade"]],["get",["formattedTime"]],["get",["isPlayingSimulBanOutro"]],["get",["session","myTeam"]],["get",["viewSkin"]],["get",["championChestAvailabilityMap"]],["get",["shouldShowChestAvailability"]],["get",["showChestAvailabilityHintedPortraits"]],["get",["boosterSummonerId"]],["get",["jmxSettings"]],["get",["PickOrderSwappingTooltipEnabled"]],["get",["ChampTradingTooltipEnabled"]],["get",["gameflow","gameData","isCustomGame"]],["get",["recordDidRequestSucceed"]]]]],false],["text","\\n\\n  "],["append",["helper",["summoner-array"],null,[["summoners","sessionActions","isUILockedForGameStart","uxSettings","showPositionAssignment","isLeft","showFirstPick","timer","currentSummoner","gameModeSubteamData","timerDisabledPickOrderSwap","formattedTime","isPlayingSimulBanOutro","team","jmxSettings","isCustomGame","recordDidRequestSucceed"],[["get",["theirTeamSummoners"]],["get",["sessionActions"]],["get",["isUILockedForGameStart"]],["get",["uxSettings"]],["get",["showPositionAssignment"]],false,["get",["showRightSideFirstPick"]],["get",["session","timer"]],["get",["currentSummoner"]],["get",["gameModeSubteamData"]],["get",["timerDisabledPickOrderSwap"]],["get",["formattedTime"]],["get",["isPlayingSimulBanOutro"]],["get",["session","theirTeam"]],["get",["jmxSettings"]],["get",["gameflow","gameData","isCustomGame"]],["get",["recordDidRequestSucceed"]]]]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","champion-select-main-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["showPositionAssignment"]],"hidden","visible"],null]]]],["flush-element"],["text","\\n    "],["append",["helper",["bans-container"],null,[["hasSimultaneousBans","myTeamBanActions","theirTeamBanActions","numBans","gameMode"],[["get",["session","hasSimultaneousBans"]],["get",["sessionActions","myTeamBanActions"]],["get",["sessionActions","theirTeamBanActions"]],["get",["session","bans","numBans"]],["get",["gameMode"]]]]],false],["text","\\n    "],["append",["helper",["timer-status"],null,[["timer","summoner","isDraftMode","activeAction","enemyActiveAction","alliedActiveAction","allPlayersActTogether","currentActions","activeActions","champSelectScreen","isShowingPositionAssignment","isSpectating","isPlayingCeremony","inFinalizationPhase","isShowingVoteCeremonies","isTeamBuilderGame","formattedTime","displayTimeAsMinuteSecond","minuteSecondTime","isHeaderExpanded","showChampionBench","inventory","benchChampions","championChestAvailabilityMap","shouldShowChestAvailability","showChestAvailabilityHintedPortraits","allowBattleBoost","isUILockedForGameStart","jmxSettings","isShowingPerksModal","boostableSkinCount","recordDidRequestSucceed"],[["get",["session","timer"]],["get",["currentSummoner"]],["get",["isDraftMode"]],["get",["sessionActions","activeAction"]],["get",["sessionActions","enemyActiveAction"]],["get",["sessionActions","alliedActiveAction"]],["get",["sessionActions","allPlayersActTogether"]],["get",["sessionActions","currentActions"]],["get",["sessionActions","activeActions"]],["get",["champSelectScreen"]],["get",["showPositionAssignment"]],["get",["isSpectating"]],["get",["isPlayingCeremony"]],["get",["session","timer","inFinalizationPhase"]],["get",["isShowingVoteCeremonies"]],["get",["queue","isTeamBuilderManaged"]],["get",["formattedTime"]],["get",["displayTimeAsMinuteSecond"]],["get",["minuteSecondTime"]],["get",["isHeaderExpanded"]],["get",["showChampionBench"]],["get",["inventory"]],["get",["benchChampions"]],["get",["championChestAvailabilityMap"]],["get",["shouldShowChestAvailability"]],["get",["showChestAvailabilityHintedPortraits"]],["get",["session","allowBattleBoost"]],["get",["isUILockedForGameStart"]],["get",["jmxSettings"]],["get",["isShowingPerksModal"]],["get",["boostableSkinCount"]],["get",["recordDidRequestSucceed"]]]]],false],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["showPickPhaseComponent"]],"visible","hidden"],null]]]],["flush-element"],["text","\\n      "],["append",["helper",["pick-phase"],null,[["summoner","sessionActions","actionWasJustCompleted","waitingForBanAnimation","waitingForPickAnimation","map","isDraftMode","isSpectating","isPlayingSimulBanOutro","isPlayingCeremony","showVoteShowcase","champSelectScreen","splashPath","splashDefocus","splashUnlocked","timer","myTeam","theirTeam","gameId","uxSettings","jmxSettings","updateIsShowingGrid","updatePickJustLockedIn","shouldShowChestFilter","isRandomChampionEnabled","randomChampionRateLimitConfig","transitioningToSelectedScreen","recordDidRequestSucceed","UseNewLoyaltyIcon"],[["get",["currentSummoner"]],["get",["sessionActions"]],["get",["actionWasJustCompleted"]],["get",["waitingForBanAnimation"]],["get",["waitingForPickAnimation"]],["get",["map"]],["get",["isDraftMode"]],["get",["isSpectating"]],["get",["isPlayingSimulBanOutro"]],["get",["isPlayingCeremony"]],["get",["showVoteShowcase"]],["get",["champSelectScreen"]],["get",["pickSplashPath"]],["get",["pickSplashDefocus"]],["get",["pickSplashUnlocked"]],["get",["session","timer"]],["get",["session","myTeam"]],["get",["session","theirTeam"]],["get",["session","gameId"]],["get",["uxSettings"]],["get",["jmxSettings"]],["helper",["action"],[["get",[null]],["helper",["mut"],[["get",["isShowingGrid"]]],null]],null],["helper",["action"],[["get",[null]],["helper",["mut"],[["get",["pickJustLockedIn"]]],null]],null],["get",["shouldShowChestFilter"]],["get",["isRandomChampionEnabled"]],["get",["randomChampionRateLimitConfig"]],["get",["transitioningToSelectedScreen"]],["get",["recordDidRequestSucceed"]],["get",["UseNewLoyaltyIcon"]]]]],false],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["vote-showcase-visibility-wrapper ",["helper",["if"],[["get",["showVoteShowcase"]],"visible","hidden"],null]]]],["flush-element"],["text","\\n    "],["append",["helper",["champion-showcase-team"],null,[["showcaseActions","introAnimation"],[["get",["sessionActions","myTeamVoteActions"]],["get",["localSummonerActionComplete"]]]]],false],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["vote-reveal-visibility-wrapper ",["helper",["if"],[["get",["isShowingVoteReveal"]],"visible","hidden"],null]]]],["flush-element"],["text","\\n      "],["append",["helper",["vote-reveal"],null,[["visible","activeAction","summoner"],[["get",["isShowingVoteReveal"]],["get",["sessionActions","activeAction"]],["get",["currentSummoner"]]]]],false],["text","\\n    "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["shouldShowChestAvailability"]]],null,8],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["showSkinSelectComponent"]],"visible","hidden"],null]]]],["flush-element"],["text","\\n      "],["append",["helper",["skin-select"],null,[["summoner","map","timeRemaining","inFinalization","rootViewSkin","selectViewSkin","allActions","rerollsDisabled","showRerollButton","tbAllowRerolling","tbRerollsRemaining","uxSettings","jmxSettings","rootComponentShown","allowSkinSelection","ip","rp","timer","isSkinSelectVisible","isShowingGrid","shouldShowChestAvailability","championChestAvailabilityMap","isUILockedForGameStart","recordDidRequestSucceed","UseNewLoyaltyIcon"],[["get",["currentSummoner"]],["get",["map"]],["get",["session","timer","timeRemaining"]],["get",["session","timer","inFinalizationPhase"]],["get",["viewSkin"]],"selectViewSkin",["get",["sessionActions","allActions"]],["get",["rerollsDisabled"]],["get",["showRerollButton"]],["get",["session","allowRerolling"]],["get",["session","rerollsRemaining"]],["get",["uxSettings"]],["get",["jmxSettings"]],["get",["isShown"]],["get",["session","allowSkinSelection"]],["get",["ip"]],["get",["rp"]],["get",["session","timer"]],["get",["showSkinSelectComponent"]],["get",["isShowingGrid"]],["get",["shouldShowChestAvailability"]],["get",["championChestAvailabilityMap"]],["get",["isUILockedForGameStart"]],["get",["recordDidRequestSucceed"]],["get",["UseNewLoyaltyIcon"]]]]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["loadouts-edit-wrapper ",["helper",["if"],[["get",["isSpectating"]],"hidden","visible"],null]]]],["flush-element"],["text","\\n      "],["append",["helper",["loadouts-edit"],null,[["localSummonerLevel","currentSummoner","champOrPickIntent","isUILockedForGameStart","showingPerksModalChanged","currentPerksPage","perksPages","perksSettings","perksTutorialSettings","gameModeSupportsPerks","map","queue","timer","jmxSettings","recordDidRequestSucceed","uxSettings","showPositionAssignment","availableSpells","perPositionRequiredSummonerSpells","perPositionDisallowedSummonerSpells","wardSkins","selectedWardSkin","accountLoadout","isCompanionsEnabled","isRuneRecommenderEnabled","unlockAllRunePageFunctionality","useRuneRecommenderAutoSelect"],[["get",["localSummoner","summonerLevel"]],["get",["currentSummoner"]],["get",["currentSummoner","champion","id"]],["get",["isUILockedForGameStart"]],"showingPerksModalChanged",["get",["currentPerksPage"]],["get",["perksPages"]],["get",["perksSettings"]],["get",["tutorial"]],["get",["gameModeSupportsPerks"]],["get",["map"]],["get",["queue"]],["get",["session","timer"]],["get",["jmxSettings"]],["get",["recordDidRequestSucceed"]],["get",["uxSettings"]],["get",["showPositionAssignment"]],["get",["availableSpells"]],["get",["perPositionRequiredSummonerSpells"]],["get",["perPositionDisallowedSummonerSpells"]],["get",["wardSkins"]],["get",["selectedWardSkin"]],["get",["accountLoadout"]],["get",["isCompanionsEnabled"]],["get",["runeRecommenderEnabled"]],["get",["unlockAllRunePageFunctionality"]],["get",["useRuneRecommenderAutoSelect"]]]]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["game-info-container ",["helper",["if"],[["get",["isSpectating"]],"visible","hidden"],null]]]],["flush-element"],["text","\\n        "],["append",["helper",["game-info"],null,[["teamSize","mutatorName"],[["get",["queue","numPlayersPerTeam"]],["get",["queue","gameTypeConfig","name"]]]]],false],["text","\\n        "],["append",["helper",["quit-button"],null,[["disabled","isSpectating","recordDidRequestSucceed"],[["get",["disableSpectatorQuitButton"]],["get",["isSpectating"]],["get",["recordDidRequestSucceed"]]]]],false],["text","\\n      "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["showGameEventInfoCard"]]],null,7],["text","\\n"],["block",["if"],[["get",["showChatRoom"]]],null,6],["text","\\n"],["open-element","div",[]],["static-attr","class","bottom-right-buttons"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showQuitButton"]]],null,5,4],["text","  "],["open-element","lol-social-chat-toggle-button",[]],["static-attr","position","inside"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"clickChat"],[["on"],["click"]]],null],["flush-element"],["close-element"],["text","\\n  "],["append",["helper",["missions-tracker"],null,[["jmxSettings","entitlements"],[["get",["jmxSettings"]],["get",["entitlements"]]]]],false],["text","\\n  "],["open-element","div",[]],["static-attr","class","champ-select-voice-button-wrapper"],["flush-element"],["append",["unknown",["voiceButton"]],false],["close-element"],["text","\\n\\n  "],["open-element","lc-toast",[]],["dynamic-attr","open",["unknown",["boostToastOpen"]],null],["dynamic-attr","onHide",["helper",["action"],[["get",[null]],"closeBoostNotificationToast"],null],null],["flush-element"],["text","\\n    "],["open-element","lc-toast-content",[]],["flush-element"],["text","\\n      "],["append",["helper",["boost-notification"],null,[["boostedSkinsMessage"],[["get",["boostToastData","boostedSkinsMessage"]]]]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["activeTrade"]]],null,2],["text","\\n"],["block",["if"],[["get",["activeSwap"]]],null,1],["text","\\n"],["block",["if"],[["get",["shouldShowDisconnectNotification"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["unknown",["disconnect-notification"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lc-layer",[]],["static-attr","index","0"],["dynamic-attr","open",true,null],["flush-element"],["text","\\n      "],["open-element","lc-layer-content",[]],["flush-element"],["text","\\n        "],["append",["helper",["swap-dialog"],null,[["swap","summoners","gameModeSubteamData","timeRemaining","inPlanningPhase","pickOrderSwapDisabledConfigurationInSeconds","recordDidRequestSucceed"],[["get",["activeSwap"]],["get",["myTeamSummoners"]],["get",["gameModeSubteamData"]],["get",["session","timer","timeRemaining"]],["get",["session","timer","inPlanningPhase"]],["get",["pickOrderSwapDisabledConfigurationInSeconds"]],["get",["recordDidRequestSucceed"]]]]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lc-layer",[]],["static-attr","index","0"],["dynamic-attr","open",true,null],["flush-element"],["text","\\n      "],["open-element","lc-layer-content",[]],["flush-element"],["text","\\n        "],["append",["helper",["trade-dialog"],null,[["trade","summoners","recordDidRequestSucceed"],[["get",["activeTrade"]],["get",["myTeamSummoners"]],["get",["recordDidRequestSucceed"]]]]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","corner-game-info-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-size"],["flush-element"],["text","\\n        "],["append",["unknown",["teamSizeText"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","queue-name"],["flush-element"],["text","\\n        "],["append",["unknown",["queueNameText"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "]],"locals":[]},{"statements":[["block",["if"],[["get",["queueNameText"]]],null,3]],"locals":[]},{"statements":[["text","    "],["append",["helper",["quit-button"],null,[["isSpectating","disabled","recordDidRequestSucceed"],[["get",["isSpectating"]],["get",["disableQuitButton"]],["get",["recordDidRequestSucceed"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["pregame-chat-box ",["helper",["if"],[["get",["isSpectating"]],"hidden","visible"],null]]]],["flush-element"],["text","\\n    "],["open-element","lol-social-chat-room",[]],["static-attr","type","championSelect"],["dynamic-attr","summoner-ids-to-name-overrides-json",["unknown",["myTeamSummonerIdsToNameOverridesJson"]],null],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","game-event-info-card-container"],["flush-element"],["text","\\n    "],["append",["helper",["game-event-info-card"],null,[["map","eventIndex","shiftedToSide"],[["get",["map"]],["get",["lockedEventIndex"]],["get",["shiftGameEventInfoCard"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["champion-chest-availability"],null,[["championId","championChestAvailabilityMap","updateChestAvailabilityHintedPortraits","isShowingPerksModal","myTeamSummoners","benchChampions"],[["get",["currentSummoner","championId"]],["get",["championChestAvailabilityMap"]],"updateChestAvailabilityHintedPortraits",["get",["isShowingPerksModal"]],["get",["myTeamSummoners"]],["get",["benchChampions"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(60);
        const s = n(1),
          { EmberHelpers: o } = s,
          { Ember: a } = s,
          r = s.Lodash,
          l = a.Object.extend({
            allActions: a.computed("root.session.actions.[]", function () {
              const e = [],
                t = this.get("root.session.actions");
              return (
                t &&
                  t.forEach(function (t) {
                    t.forEach(function (t) {
                      e.push(t);
                    });
                  }, this),
                a.A(e)
              );
            }),
            finalizationPhaseActions: a.computed("allActions", function () {
              const e = this.get("allActions").filter((e) =>
                i.FINALIZATION_PHASE_CEREMONIES.includes(e.get("type")),
              );
              return a.A(e);
            }),
            pickActionSet: a.computed(
              "root.session.actions.[]",
              "allActions.@each.isPick",
              function () {
                const e = this.get("root.session.actions");
                return e
                  ? r.find(e, function (e) {
                      return r.every(e, function (e) {
                        return e.get("isPick");
                      });
                    })
                  : [];
              },
            ),
            voteActionSet: a.computed(
              "root.session.actions.[]",
              "allActions.@each.isVote",
              function () {
                const e = this.get("root.session.actions");
                if (e)
                  return r.find(e, function (e) {
                    return r.every(e, function (e) {
                      return e.get("isVote");
                    });
                  });
              },
            ),
            lastCompletedActionSetIndex: -1,
            currentActionSetIndex: -1,
            currentActions: a.computed(
              "allActions.@each.completed",
              "root.session.actions.[]",
              "currentPhaseHasActions",
              function () {
                const e = this.get("root.session.actions"),
                  t = this.get("currentPhaseHasActions");
                let n = -1;
                if (e && t)
                  for (let t = 0; t < e.length; t++) {
                    const i = e[t];
                    if (i && i.length && !r.every(i.mapBy("completed")))
                      return (
                        this.set("lastCompletedActionSetIndex", n),
                        this.set("currentActionSetIndex", t),
                        i
                      );
                    n = t;
                  }
                return this.set("currentActionSetIndex", -1), a.A();
              },
            ),
            currentActingCells: a.computed(
              "currentActions.@each.actorCellId",
              function () {
                const e = this.get("currentActions");
                return e
                  ? [
                      ...e.reduce(
                        (e, t) => (e.add(t.get("actorCellId")), e),
                        new Set(),
                      ),
                    ]
                  : [];
              },
            ),
            nextActions: a.computed(
              "root.session.actions.[]",
              "currentActions",
              "currentActionSetIndex",
              function () {
                if (!this.get("root.session.actions")) return a.A();
                const e = this.get("currentActions")
                  ? this.get("currentActionSetIndex")
                  : -1;
                return -1 === e
                  ? a.A()
                  : this.get("root.session.actions")[e + 1] || a.A();
              },
            ),
            nextAction: a.computed(
              "nextActions.[]",
              "nextActions.@each.actor",
              function () {
                const e = this.get("nextActions");
                return e
                  ? e.findBy("actor.isSelf", !0) || e.get("firstObject")
                  : null;
              },
            ),
            activeActions: a.computed(
              "currentActions.@each.completed",
              "currentPhaseHasActions",
              function () {
                return this.get("currentPhaseHasActions")
                  ? a.A(this.get("currentActions").filterBy("completed", !1))
                  : a.A();
              },
            ),
            activeAction: a.computed(
              "activeActions.[]",
              "activeActions.@each.actor",
              function () {
                const e = this.get("activeActions");
                return e
                  ? e.findBy("actor.isSelf", !0) || e.get("firstObject")
                  : null;
              },
            ),
            enemyActiveAction: a.computed("activeActions.[]", function () {
              return this.get("activeActions").findBy(
                "actor.isOnPlayersTeam",
                !1,
              );
            }),
            alliedActiveAction: a.computed("activeActions.[]", function () {
              return this.get("activeActions").findBy(
                "actor.isOnPlayersTeam",
                !0,
              );
            }),
            completedActions: a.computed(
              "allActions.@each.completed",
              function () {
                return a.A(this.get("allActions").filterBy("completed", !0));
              },
            ),
            lastCompletedAction: a.computed("completedActions", function () {
              return this.get("completedActions.lastObject");
            }),
            banActions: a.computed(
              "allActions.@each.id",
              "allActions.@each.type",
              function () {
                return a.A(this.get("allActions").filterBy("type", "ban"));
              },
            ),
            completedBanActions: a.computed(
              "banActions.@each.completed",
              function () {
                return a.A(this.get("banActions").filterBy("completed", !0));
              },
            ),
            lastCompletedBanAction: a.computed(
              "completedBanActions.@each.id",
              function () {
                return this.get("completedBanActions.lastObject");
              },
            ),
            pickActions: a.computed(
              "allActions.@each.id",
              "allActions.@each.type",
              function () {
                return a.A(this.get("allActions").filterBy("type", "pick"));
              },
            ),
            completedPickActions: a.computed(
              "pickActions.@each.completed",
              function () {
                return a.A(this.get("pickActions").filterBy("completed", !0));
              },
            ),
            pickActionsHaveBegun: a.computed(
              "activeAction.type",
              "completedPickActions",
              function () {
                return (
                  "pick" === this.get("activeAction.type") ||
                  this.get("completedPickActions").length
                );
              },
            ),
            voteActions: a.computed(
              "allActions.@each.id",
              "allActions.@each.type",
              function () {
                return a.A(this.get("allActions").filterBy("type", "vote"));
              },
            ),
            voteRevealActions: a.computed("allActions.@each.id", function () {
              return a.A(this.get("allActions").filterBy("isVoteReveal", !0));
            }),
            completedVoteRevealActions: a.computed(
              "voteRevealActions.@each.completed",
              function () {
                return a.A(
                  this.get("voteRevealActions").filterBy("completed", !0),
                );
              },
            ),
            myTeamVoteActions: a.computed(
              "allActions.@each.id",
              "voteActions.@each.actor",
              function () {
                return a.A(
                  this.get("voteActions").filterBy("actor.isOnLeftSide", !0),
                );
              },
            ),
            enemyTeamVoteActions: a.computed(
              "allActions.@each.id",
              "voteActions.@each.actor",
              function () {
                return a.A(
                  this.get("voteActions").filterBy("actor.isOnLeftSide", !1),
                );
              },
            ),
            currentPhaseHasActions: a.computed(
              "root.session.timer.inBanPickPhase",
              "root.session.timer.inFinalizationPhase",
              "finalizationPhaseActions.length",
              function () {
                const e = this.get("root.session.timer.inBanPickPhase"),
                  t = this.get("root.session.timer.inFinalizationPhase"),
                  n = this.get("finalizationPhaseActions.length") > 0;
                return e || (t && n);
              },
            ),
            leftSideFirstPick: a.computed(
              "pickActions.@each.isOnLeftSide",
              function () {
                const e = this.get("pickActions");
                return !(!e || !e[0]) && e[0].get("isOnLeftSide");
              },
            ),
            myTeamBanActions: a.computed(
              "banActions.@each.id",
              "banActions.@each.actor",
              "root.queue.gameMode",
              "root.session.localPlayerCellId",
              function () {
                const e = this.get("banActions"),
                  t =
                    i.GAME_MODES_WITH_SUBTEAMS[this.get("root.queue.gameMode")];
                if (t) {
                  const n = this.get("root.session.localPlayerCellId"),
                    i = t.subteams.find((e) => e.cellIds.includes(n));
                  return a.A(
                    e.filter((e) => !!i && i.cellIds.includes(e.actorCellId)),
                  );
                }
                return a.A(e.filterBy("actor.isOnLeftSide", !0));
              },
            ),
            myTeamUncompletedBanActions: a.computed(
              "myTeamBanActions.@each.id",
              "myTeamBanActions.@each.completed",
              function () {
                return a.A(
                  this.get("myTeamBanActions").filterBy("completed", !1),
                );
              },
            ),
            theirTeamBanActions: a.computed(
              "banActions.@each.id",
              "banActions.@each.actor",
              "root.queue.gameMode",
              "root.session.localPlayerCellId",
              function () {
                const e = this.get("banActions"),
                  t =
                    i.GAME_MODES_WITH_SUBTEAMS[this.get("root.queue.gameMode")];
                if (t) {
                  const n = this.get("root.session.localPlayerCellId"),
                    i = t.subteams.find((e) => e.cellIds.includes(n));
                  return a.A(
                    e.filter((e) => !i || !i.cellIds.includes(e.actorCellId)),
                  );
                }
                return a.A(e.filterBy("actor.isOnLeftSide", !1));
              },
            ),
            hasBans: a.computed("allActions.@each.type", function () {
              return !!this.get("allActions").find(function (e) {
                return "ban" === e.get("type");
              });
            }),
            hasPicks: a.computed("allActions.@each.type", function () {
              return !!this.get("allActions").find(function (e) {
                return "pick" === e.get("type");
              });
            }),
            hasVotes: a.computed("allActions.@each.type", function () {
              return !!this.get("allActions").find(function (e) {
                return "vote" === e.get("type");
              });
            }),
            hasPicksOrVotes: a.computed.or("hasPicks", "hasVotes"),
            someoneIsBanning: o.computedGate(
              "activeActions.@each.type",
              function () {
                return (
                  this.get("activeActions") &&
                  !!this.get("activeActions").find(function (e) {
                    return "ban" === e.get("type");
                  })
                );
              },
            ),
            isSimultaneousBans: o.computedGate(
              "currentActions.@each.isBan",
              function () {
                const e = this.get("currentActions");
                return (
                  !(!e || !e.length || e.length <= 1) &&
                  e.filterBy("isBan", !0).length > 1
                );
              },
            ),
            areSimultaneousBans: a.computed(
              "root.sessionActions.allActions.[]",
              function () {
                const e = this.get("root.session.actions");
                let t;
                if (e)
                  for (let n = 0; n < e.length; n++)
                    if (
                      ((t = e[n]),
                      t &&
                        t.length > 1 &&
                        t.filter((e) => e.get("isBan")).length > 1)
                    )
                      return !0;
                return !1;
              },
            ),
            currentBanAction: a.computed(
              "currentActions.@each.type",
              "someoneIsBanning",
              function () {
                return this.get("someoneIsBanning")
                  ? this.get("currentActions").findBy("type", "ban")
                  : null;
              },
            ),
            numBanActionsCompleted: a.computed.readOnly(
              "completedBanActions.length",
            ),
            numPickActionsCompleted: a.computed.readOnly(
              "completedPickActions.length",
            ),
            allPlayersPickTogether: a.computed(
              "pickActionSet.length",
              "root.session.myTeam.length",
              "root.session.theirTeam.length",
              "root.queue.gameTypeConfig.pickMode",
              function () {
                const e = this.get("root.session.myTeam.length"),
                  t = this.get("root.session.theirTeam.length"),
                  n = this.get("pickActionSet.length"),
                  i = this.get("root.queue.gameTypeConfig.pickMode");
                return 1 === e && 0 === t
                  ? "SimulPickStrategy" === i
                  : e + t === n;
              },
            ),
            allPlayersVoteTogether: a.computed(
              "voteActionSet.length",
              "root.session.myTeam.length",
              "root.session.theirTeam.length",
              function () {
                return (
                  this.get("root.session.myTeam.length") +
                    this.get("root.session.theirTeam.length") ===
                  this.get("voteActionSet.length")
                );
              },
            ),
            allPlayersActTogether: a.computed(
              "currentActions.length",
              "root.session.myTeam.length",
              "root.session.theirTeam.length",
              function () {
                return (
                  this.get("currentActions.length") ===
                  this.get("root.session.myTeam.length") +
                    this.get("root.session.theirTeam.length")
                );
              },
            ),
            phaseTransitionStringsByActionId: a.computed(
              "allActions.[]",
              function () {
                const e = this.get("allActions");
                let t,
                  n = "",
                  i = "";
                const s = { pick: 0, ban: 0, vote: 0, team_vote_reveal: 0 },
                  o = { pick: 0, ban: 0 },
                  a = {};
                for (let o = 0; o < e.length; o++)
                  (t = e[o]),
                    (i = t.get("type")),
                    i !== n && ((n = i), (s[i] = s[i] + 1));
                let r,
                  l = "";
                for (let n = 0; n < e.length; n++)
                  if (((t = e[n]), t.get("isPhaseTransition"))) {
                    if (
                      ((l = ""),
                      (r = null),
                      n + 1 < e.length && (r = e[n + 1]),
                      !r || !r.get("type"))
                    ) {
                      a[t.get("id")] = "finalization";
                      break;
                    }
                    (l = r.get("type")),
                      1 === s[l]
                        ? (a[t.get("id")] = "one_" + l + "_phase")
                        : ((o[l] = o[l] + 1),
                          (a[t.get("id")] = l + "_" + o[l]));
                  }
                return a;
              },
            ),
          });
        e.exports = l;
      },
      (e, t, n) => {
        "use strict";
        var i = n(1);
        const { Router: s } = i.Ember,
          o = s.extend({ location: "none" });
        o.map(function () {}), (e.exports = o);
      },
      (e, t, n) => {
        "use strict";
        var i,
          s = (i = n(58)) && i.__esModule ? i : { default: i };
        n(94);
        const o = n(1),
          { Ember: a } = o,
          r = "sfx-ui";
        e.exports = a.Component.extend({
          classNames: ["action-button-container"],
          layout: n(95),
          audioPool: s.default,
          mouseEnter: function () {
            this.get("disabled") ||
              this.audioPool.playSound(
                r,
                "/fe/lol-champ-select/sounds/sfx-cs-lockin-button-hover.ogg",
              );
          },
          click: function () {
            this.get("disabled") ||
              this.audioPool.playSound(
                r,
                "/fe/lol-champ-select/sounds/sfx-cs-lockin-button-click.ogg",
              );
          },
          actions: {
            click: function () {
              this.sendAction("click");
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "AgvIBjQQ",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\action-button-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\action-button-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\action-button-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","action-button"],["dynamic-attr","disabled",["helper",["if"],[["get",["disabled"]],"true"],null],null],["modifier",["action"],[["get",[null]],"click"]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","action-button-background"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","action-button-inner"],["flush-element"],["yield","default"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i,
          s = (i = n(58)) && i.__esModule ? i : { default: i };
        n(97);
        const o = n(1),
          { Ember: a, EmberAddons: r } = o,
          { DomMixin: l } = r.EmberLifeline;
        e.exports = a.Component.extend(l, {
          classNames: ["ban-showcase"],
          classNameBindings: [
            "visible::removed",
            "waitingForBans::enemy-team-visible",
            "hideWaitingForTheirBansLabel::waiting-for-their-team-bans",
          ],
          layout: n(98),
          waitingForBans: a.computed.or(
            "waitingForMyTeamBans",
            "waitingForTheirTeamBans",
          ),
          waitingForMyTeamBans: a.computed.and(
            "isSimultaneousBans",
            "myTeamIsBanning",
          ),
          waitingForTheirTeamBans: a.computed.and(
            "isSimultaneousBans",
            "theirTeamIsBanning",
          ),
          myTeamIsBanning: a.computed(
            "myTeamBans.@each.completed",
            function () {
              return (
                this.get("myTeamBans").filterBy("completed", !1).length > 0
              );
            },
          ),
          theirTeamIsBanning: a.computed(
            "theirTeamBans.@each.completed",
            function () {
              return (
                this.get("theirTeamBans").filterBy("completed", !1).length > 0
              );
            },
          ),
          hideWaitingForTheirBansLabel: a.computed(
            "waitingForMyTeamBans",
            "waitingForTheirTeamBans",
            function () {
              return (
                this.get("waitingForMyTeamBans") ||
                !this.get("waitingForTheirTeamBans")
              );
            },
          ),
          localSummonerActionComplete: a.computed(
            "myTeamBans.@each.completed",
            function () {
              const e = this.get("myTeamBans"),
                t = e && e.findBy("actor.isSelf");
              return t && t.get("completed");
            },
          ),
          playAllBansLockedAudio: function (e) {
            "banShowcaseAnnouncementLabelZoomIntro" === e.animationName &&
              s.default.playSound(
                "sfx-notifications",
                "/fe/lol-champ-select/sounds/sfx-cs-draft-10ban-team-bans-locked.ogg",
              );
          },
          didInsertElement: function () {
            this._super(...arguments),
              this.addEventListener(
                this.element,
                "animationstart",
                this.playAllBansLockedAudio,
              );
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "0JKlAbqx",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\ban-showcase-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\ban-showcase-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\ban-showcase-component\\\\index.js\\" "],["text","\\n"],["append",["helper",["champion-showcase-team"],null,[["showcaseActions","enemyBansHidden","myTeamBanning","introAnimation"],[["get",["myTeamBans"]],["get",["waitingForBans"]],["get",["waitingForMyTeamBans"]],["get",["localSummonerActionComplete"]]]]],false],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","waiting-for-their-bans-label"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","waiting-for-their-bans-text"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","ban_component_waiting_for_their_bans"]],false],["text","\\n    "],["open-element","div",[]],["static-attr","class","waiting-for-their-bans-glow"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","ban_component_waiting_for_their_bans"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["enemy-bans-wrapper ",["helper",["if"],[["get",["waitingForBans"]],"removed","visible"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ban-announcement-label"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","ban-announcement-bg-glow"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","ban-announcement-text"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","ban_component_ban_announcement"]],false],["text","\\n      "],["open-element","div",[]],["static-attr","class","ban-announcement-label-glow"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","ban_component_ban_announcement"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["append",["helper",["champion-showcase-team"],null,[["showcaseActions","theirTeam"],[["get",["theirTeamBans"]],true]]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(1);
        n(100),
          (e.exports = i.Ember.Component.extend({
            classNames: ["bans-container-component"],
            classNameBindings: ["gameModeClass"],
            layout: n(101),
            showBanHeader: i.Ember.computed("gameMode", function () {
              return "CHERRY" === this.get("gameMode");
            }),
            gameModeClass: i.Ember.computed("gameMode", function () {
              return "CHERRY" === this.get("gameMode")
                ? "left-anchored-combined-bans"
                : null;
            }),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "ZLn/Lzc2",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\bans-container-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\bans-container-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\bans-container-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["showBanHeader"]]],null,0],["append",["helper",["team-bans"],null,[["hasSimultaneousBans","banActions","numBans","isMyTeam","gameMode"],[["get",["hasSimultaneousBans"]],["get",["myTeamBanActions"]],["get",["numBans"]],true,["get",["gameMode"]]]]],false],["text","\\n"],["append",["helper",["team-bans"],null,[["hasSimultaneousBans","banActions","numBans","isMyTeam","gameMode"],[["get",["session","hasSimultaneousBans"]],["get",["theirTeamBanActions"]],["get",["numBans"]],false,["get",["gameMode"]]]]],false]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","bans-wrapper-header"],["flush-element"],["append",["unknown",["tra","bans_header"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n(103);
        const i = n(1),
          { Ember: s } = i;
        e.exports = s.Component.extend({
          classNames: ["ban-showcase-team"],
          classNameBindings: [
            "theirTeam:their-team:my-team",
            "enemyBansHidden::enemy-bans-visible",
            "introAnimation",
            "type",
            "myTeamBanning",
          ],
          layout: n(104),
          type: s.computed("showcaseActions.firstObject.type", function () {
            return this.get("showcaseActions.firstObject.type") || "";
          }),
          label: s.computed("type", "bansLabel", "voteLabel", function () {
            return "vote" === this.get("type")
              ? this.get("voteLabel")
              : this.get("bansLabel");
          }),
          voteLabel: s.computed.readOnly("tra.ban_component_your_team_votes"),
          bansLabel: s.computed(
            "theirTeam",
            "tra.ban_component_your_team_bans",
            "tra.ban_component_enemy_team_bans",
            function () {
              return this.get("theirTeam")
                ? this.get("tra.ban_component_enemy_team_bans")
                : this.get("tra.ban_component_your_team_bans");
            },
          ),
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "P7b4sTVY",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-showcase-team-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-showcase-team-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-showcase-team-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","bans-label"],["flush-element"],["append",["unknown",["label"]],false],["text","\\n  "],["open-element","div",[]],["static-attr","class","bans-label-glow"],["flush-element"],["text","\\n    "],["append",["unknown",["bansLabel"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","bans-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["showcaseActions"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["champion-showcase-item"],null,[["type","showcaseAction","theirTeam"],[["get",["type"]],["get",["showcaseAction"]],["get",["theirTeam"]]]]],false],["text","\\n"]],"locals":["showcaseAction"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i,
          s = (i = n(58)) && i.__esModule ? i : { default: i };
        n(103);
        const o = n(1),
          { Ember: a, EmberAddons: r } = o,
          { DomMixin: l } = r.EmberLifeline;
        e.exports = a.Component.extend(l, {
          classNames: ["ban-champion"],
          classNameBindings: [
            "showcaseAction.champion:selected",
            "showcaseAction.completed:locked-in",
            "showcaseAction.snipedPlayerPick:sniped-player-pick",
            "type",
          ],
          layout: n(106),
          showBanOverlays: a.computed("type", function () {
            return "ban" === this.get("type");
          }),
          didInsertElement: function () {
            this._super(...arguments),
              this.addEventListener(
                this.element,
                "animationstart",
                this.playBanLockInSound,
              );
          },
          playBanLockInSound: function (e) {
            this.get("theirTeam") &&
              "banChampionLockedInPositionShakeAndGlow" === e.animationName &&
              s.default.playSound(
                "sfx-notifications",
                "/fe/lol-champ-select/sounds/sfx-cs-draft-10ban-enemy-ban.ogg",
              );
          },
        });
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "Kp6HTeaC",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-showcase-item-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-showcase-item-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["ban-champion-shake-container ",["unknown",["type"]]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ban-gradient-background"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ban-marching-border-background-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","ban-marching-border-background"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ban-champion-thumbnail"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showBanOverlays"]]],null,1],["text","    "],["open-element","img",[]],["dynamic-attr","class",["concat",["champion-background-image ",["helper",["unless"],[["get",["showcaseAction","champion"]],"hidden"],null]," ",["helper",["unless"],[["get",["showcaseAction","completed"]],"grayed-out"],null]]]],["dynamic-attr","src",["unknown",["showcaseAction","champion","squarePortraitPath"]],null],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["showBanOverlays"]]],null,0],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","champion-name"],["flush-element"],["append",["unknown",["showcaseAction","champion","name"]],false],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["circle-x-overlay ",["helper",["if"],[["get",["showcaseAction","champion"]],"visible","hidden"],null]," ",["helper",["unless"],[["get",["showcaseAction","completed"]],"red"],null]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","thumbnail-circle-x-background"],["static-attr","src","/fe/lol-champ-select/images/ban-showcase/icon-ban.png"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = (function (e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var n = l(t);
          if (n && n.has(e)) return n.get(e);
          var i = {},
            s = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var o in e)
            if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
              var a = s ? Object.getOwnPropertyDescriptor(e, o) : null;
              a && (a.get || a.set)
                ? Object.defineProperty(i, o, a)
                : (i[o] = e[o]);
            }
          (i.default = e), n && n.set(e, i);
          return i;
        })(n(1));
        n(108);
        var s = r(n(66)),
          o = n(60),
          a = r(n(58));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function l(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (l = function (e) {
            return e ? n : t;
          })(e);
        }
        const { EmberHelpers: c } = i.default,
          { RunMixin: m } = i.EmberAddons.EmberLifeline;
        e.exports = i.Ember.Component.extend(m, {
          classNames: ["champion-bench"],
          classNameBindings: [
            "showChestAvailabilityHintedPortraits:show-chest-availability-hinted-portraits",
          ],
          layout: n(109),
          pendingRequest: !1,
          isPlayingSound: !1,
          benchChampionsSize: i.Ember.computed(function () {
            const e = [];
            for (let t = 0; t < o.CHAMPION_BENCH_SIZE; t++) e.push(t);
            return i.Ember.A(e);
          }),
          benchLabel: i.Ember.computed.alias("tra.champion_bench_label"),
          benchInfoTooltip: i.Ember.computed.alias(
            "tra.champion_bench_label_tooltip",
          ),
          playSoundOnAllySwap: c.observeMultiChange(
            "summoner.champion.id",
            "benchChampions.[]",
            function (e) {
              if (
                void 0 === e["summoner.champion.id"] &&
                void 0 !== e["benchChampions.[]"] &&
                e["benchChampions.[]"].length > 0 &&
                !this.get("benchSoundOnCooldown")
              ) {
                this.set("benchSoundOnCooldown", !0);
                a.default
                  .createSound(
                    "sfx-notifications",
                    "/fe/lol-champ-select/sounds/sfx-champ-select-bench-update.ogg",
                    { maxConcurrent: 1 },
                  )
                  .play(),
                  this.runTask(function () {
                    this.set("benchSoundOnCooldown", !1);
                  }, o.CHAMPION_BENCH_SOUND_COOLDOWN_MS);
              }
            },
          ),
          actions: {
            championClicked(e) {
              this.get("pendingRequest") ||
                this.get("benchSwapOnCooldown") ||
                (this.set("pendingRequest", !0),
                s.default
                  .ajax({
                    type: "POST",
                    url: "/lol-champ-select/v1/session/bench/swap/" + e,
                    errorMessage: "error_could_not_swap_bench_champion",
                  })
                  .then(() => {
                    this.recordDidRequestSucceed &&
                      this.recordDidRequestSucceed(!0);
                  })
                  .catch((e) => {
                    this.recordDidRequestSucceed &&
                      this.recordDidRequestSucceed(!1, e);
                  })
                  .finally(() => {
                    this.set("pendingRequest", !1),
                      this.set("benchSwapOnCooldown", !0),
                      this.runTask(function () {
                        this.set("benchSwapOnCooldown", !1);
                      }, o.CHAMPION_BENCH_SWAP_COOLDOWN_MS);
                  }));
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "IAkOPkcR",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-bench-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-bench-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-bench-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","bench-label"],["flush-element"],["text","\\n  "],["append",["unknown",["benchLabel"]],false],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","restrictArea"],["bottom","whole-window"]],1],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","bench-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["benchChampionsSize"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["champion-bench-item"],null,[["benchChampions","index","championClicked","benchSwapOnCooldown","inventory","championChestAvailabilityMap","shouldShowChestAvailability"],[["get",["benchChampions"]],["get",["champIndex"]],"championClicked",["get",["benchSwapOnCooldown"]],["get",["inventory"]],["get",["championChestAvailabilityMap"]],["get",["shouldShowChestAvailability"]]]]],false],["text","\\n"]],"locals":["champIndex"]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["static-attr","padding","small"],["flush-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["benchInfoTooltip"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = (function (e, t) {
            if (!t && e && e.__esModule) return e;
            if (null === e || ("object" != typeof e && "function" != typeof e))
              return { default: e };
            var n = o(t);
            if (n && n.has(e)) return n.get(e);
            var i = {},
              s = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var a in e)
              if (
                "default" !== a &&
                Object.prototype.hasOwnProperty.call(e, a)
              ) {
                var r = s ? Object.getOwnPropertyDescriptor(e, a) : null;
                r && (r.get || r.set)
                  ? Object.defineProperty(i, a, r)
                  : (i[a] = e[a]);
              }
            (i.default = e), n && n.set(e, i);
            return i;
          })(n(1)),
          s = n(60);
        function o(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (o = function (e) {
            return e ? n : t;
          })(e);
        }
        n(111);
        const { EmberHelpers: a } = i.default,
          { RunMixin: r } = i.EmberAddons.EmberLifeline;
        e.exports = i.Ember.Component.extend(r, {
          classNames: ["champion-bench-item"],
          layout: n(112),
          classNameBindings: [
            "isEmpty:empty-bench-item",
            "benchSwapOnCooldown:on-cooldown",
            "onCooldownFromNonPrioritizedBenchPrefill:on-cooldown",
            "onCooldownFromNonPrioritizedBenchPrefill:from-non-prioritized-prefill",
            "canPlay::grayed-out",
          ],
          champSelectInventory: i.Ember.inject.service(),
          previousChampionId: -1,
          onCooldownFromAllySwap: !1,
          onCooldownFromNonPrioritizedBenchPrefill: !1,
          pickableChampionSet: i.Ember.computed.alias(
            "champSelectInventory.pickableChampionSet",
          ),
          init: function () {
            this._super(...arguments);
            const e = this.get("index"),
              t = this.get("benchChampions");
            e < t.length &&
              !t[e].isPriority &&
              (this.set("onCooldownFromNonPrioritizedBenchPrefill", !0),
              this.runTask(function () {
                this.set("onCooldownFromNonPrioritizedBenchPrefill", !1);
              }, s.CHAMPION_BENCH_NON_PRIORITISED_PREFILL_COOLDOWN_MS));
          },
          champion: a.computedGate(
            "inventory.length",
            "benchChampions.[]",
            function () {
              const e = this.get("index"),
                t = this.get("benchChampions");
              if (e < t.length)
                return this.get("inventory").findBy("id", t[e].championId);
            },
          ),
          allySwapCooldownObserver: a.observer("champion.id", function () {
            const e = this.get("previousChampionId"),
              t = this.get("champion.id");
            t &&
              t !== e &&
              (-1 !== e &&
                (this.set("onCooldownFromAllySwap", !0),
                this.runTask(function () {
                  this.set("onCooldownFromAllySwap", !1);
                }, s.CHAMPION_BENCH_ALLY_SWAP_COOLDOWN_MS)),
              this.set("previousChampionId", t));
          }),
          isEmpty: i.Ember.computed.not("champion.id"),
          canPlay: i.Ember.computed(
            "pickableChampionSet",
            "champion.id",
            function () {
              return (this.get("pickableChampionSet") || new Set()).has(
                this.get("champion.id"),
              );
            },
          ),
          championName: i.Ember.computed.alias("champion.name"),
          showTooltip: i.Ember.computed("isEmpty", "canPlay", function () {
            return !this.get("isEmpty") && this.get("canPlay");
          }),
          tooltipText: i.Ember.computed("championName", function () {
            return this.get("tra.service").formatString(
              "champion_bench_item_tooltip",
              { championName: this.get("championName") },
            );
          }),
          showChampionChestAvailable: i.Ember.computed(
            "shouldShowChestAvailability",
            "champion.id",
            "championChestAvailabilityMap",
            function () {
              const e = this.get("champion.id"),
                t = this.get("championChestAvailabilityMap");
              return (
                !!(this.get("shouldShowChestAvailability") && e && t) &&
                t.get(e + "")
              );
            },
          ),
          click() {
            this.get("isEmpty") ||
              !this.get("canPlay") ||
              this.get("onCooldownFromAllySwap") ||
              this.get("onCooldownFromNonPrioritizedBenchPrefill") ||
              this.sendAction("championClicked", this.get("champion.id"));
          },
          backgroundStyle: i.Ember.computed(
            "champion.squarePortraitPath",
            function () {
              return (
                "background-image: url('" +
                this.get("champion.squarePortraitPath") +
                "');"
              );
            },
          ),
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "xOoVPdZ2",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-bench-component\\\\champion-bench-item\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-bench-component\\\\champion-bench-item\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-bench-component\\\\champion-bench-item\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["showChampionChestAvailable"]]],null,3],["open-element","div",[]],["static-attr","class","bench-champion-icon"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","bench-champion-background"],["dynamic-attr","style",["helper",["sanitize"],[["get",["backgroundStyle"]]],null],null],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["showTooltip"]]],null,2],["text","  "],["open-element","div",[]],["static-attr","class","cooldown-mask"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","cooldown"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","left-half-mask"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","left-half"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","right-half"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","tooltip-champion-chest-available"],["flush-element"],["append",["unknown",["tra","tooltip_champion_chest_available"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["tooltipText"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["showChampionChestAvailable"]]],null,0],["text","      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","restrictArea"],["bottom","whole-window"]],1]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","bench-champion-icon-chest-available-glow"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(1);
        n(114),
          (e.exports = i.Ember.Component.extend({
            classNames: ["champion-chest-availability"],
            classNameBindings: [
              "chestAvailable:available:unavailable",
              "isShowingPerksModal:hidden",
            ],
            layout: n(115),
            mouseEnter: function () {
              this.sendAction("updateChestAvailabilityHintedPortraits", !0);
            },
            mouseLeave: function () {
              this.sendAction("updateChestAvailabilityHintedPortraits", !1);
            },
            chestAvailable: i.Ember.computed(
              "championId",
              "championChestAvailabilityMap",
              function () {
                const e = this.get("championId"),
                  t = this.get("championChestAvailabilityMap");
                return !(!e || !t) && t.get(e + "");
              },
            ),
            anyChampionsChestAvailable: i.Ember.computed(
              "myTeamSummoners.@each.championId",
              "benchChampions.[]",
              "championChestAvailabilityMap",
              function () {
                if (this.get("chestAvailable")) return !0;
                const e = this.get("championChestAvailabilityMap");
                for (let t = 0; t < this.get("myTeamSummoners.length"); t++)
                  if (e.get(this.get(`myTeamSummoners.${t}.championId`) + ""))
                    return !0;
                for (let t = 0; t < this.get("benchChampions.length"); t++)
                  if (e.get(this.get(`benchChampions.${t}.championId`) + ""))
                    return !0;
                return !1;
              },
            ),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "W4daj0Gu",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-chest-availability-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-chest-availability-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-chest-availability-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","champion-chest-available-glow"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","champion-chest-available-icon"],["flush-element"],["text","\\n  "],["open-element","svg",[]],["static-attr","width","16"],["static-attr","height","16"],["static-attr","viewBox","0 0 16 16"],["static-attr","fill","none"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["flush-element"],["text","\\n    "],["open-element","path",[]],["static-attr","fill-rule","evenodd"],["static-attr","clip-rule","evenodd"],["static-attr","d","M15 16H1L0 15V1L1 0H15L16 1V15L15 16ZM10 5L8 3L6 5V7L8 9L10 7V5ZM14 2L12 4V8L8 12L4 8V4L2 2V14H14V2Z"],["static-attr","fill","#5B5A56"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","restrictArea"],["bottom","whole-window"]],2],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","tooltip_mastery_chest_no_champs_available_icon"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","tooltip_mastery_chest_available_icon"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["static-attr","padding","small"],["flush-element"],["text","\\n"],["block",["if"],[["get",["anyChampionsChestAvailable"]]],null,1,0],["text","    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(1),
          s = u(n(58)),
          o = u(n(66)),
          a = n(60),
          r = n(117),
          l = n(118),
          c = n(120),
          m = u(n(121));
        function u(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const { RunMixin: p, DomMixin: d } = i.EmberAddons.EmberLifeline,
          h = "championFilterPreferenceKey";
        n(122),
          n(123),
          n(124),
          (e.exports = i.Ember.Component.extend(p, d, {
            classNames: ["champion-grid"],
            classNameBindings: [
              "visible:champion-grid-visible:champion-grid-hidden",
              "gridSoftSelected:champion-grid-selected",
              "hasChampionPicked:champion-grid-picked",
              "summoner.isBanningNow:champion-grid-banning",
              "sortByFavorites:sort-by-favorites",
              "isAnimating:champion-grid-animating",
            ],
            layout: n(125),
            gridEstimatedClientWidth: 622,
            gridEstimatedClientHeight: 440,
            largeAreaAnimationsEnabled: i.Ember.computed.bool(
              "uxSettings.largeAreaAnimationsEnabled",
            ),
            isNotPickIntenting: i.Ember.computed.not(
              "summoner.isPickIntenting",
            ),
            isNotVisible: i.Ember.computed.not("visible"),
            isChampionGridDisabled: i.Ember.computed.or(
              "requestInProgress",
              "isNotVisible",
            ),
            disabledTooltipElementByChampionId: {},
            rateLimitData: [],
            favoritesEnabled: i.Ember.computed.bool(
              "jmxSettings.LcuChampionSelect.EnableFavorites",
            ),
            gridSortDisabled: i.Ember.computed.bool(
              "jmxSettings.LcuChampionSelect.DisableGridSort",
            ),
            chestFilterDisabled: i.Ember.computed.bool(
              "jmxSettings.LcuChampionSelect.DisableChestFilter",
            ),
            hasChampionPicked: i.Ember.computed.alias(
              "summoner.pickAction.completed",
            ),
            hasSelectedChampion_: i.Ember.computed.or(
              "summoner.activeAction.championId",
              "summoner.requestedChampionId",
            ),
            hasSelectedChampion: i.EmberHelpers.computedGate(
              "hasSelectedChampion_",
              function () {
                return this.get("hasSelectedChampion_");
              },
            ),
            gridSoftSelected: i.Ember.computed.and(
              "hasSelectedChampion",
              "isNotPickIntenting",
            ),
            champSelectInventory: i.Ember.inject.service(
              "champ-select-inventory",
            ),
            pickableChampionSet: i.Ember.computed.alias(
              "champSelectInventory.pickableChampionSet",
            ),
            bannableChampionSet: i.Ember.computed.alias(
              "champSelectInventory.bannableChampionSet",
            ),
            init: function () {
              this._super(...arguments),
                this.set("isAnimating", !1),
                this.set("gridChampionLayout", new m.default(101, 96)),
                this.set(
                  "randomChampionConfiguration",
                  this.createRandomViewChampion(),
                ),
                (this.csBinding = (0, i.DataBinding)(
                  "/lol-champ-select",
                  (0, i.getProvider)().getSocket(),
                )),
                this.csBinding.observe(
                  "/v1/all-grid-champions",
                  this,
                  this.handleGridChampionsUpdated,
                ),
                this.getPreferredSortingMethod();
            },
            didInsertElement: function () {
              this._super(...arguments), this.bindChampIconSounds();
            },
            willDestroyElement() {
              this._super(...arguments),
                this._clearDebounceGridUpdateTimer(),
                this._resetAnimation(!1);
            },
            bindChampIconSounds: function () {
              const e = (e, t) => {
                !t.target.classList.contains(
                  "champion-grid-champion-thumbnail",
                ) ||
                  t.target.classList.contains("waiting") ||
                  t.target.getAttribute("disabled") ||
                  s.default.playSound(
                    a.SFX_CHANNEL,
                    a.SOUNDS_PATH + "/sfx-uikit-grid-" + e + ".ogg",
                  );
              };
              this.addEventListener(
                this.element,
                "mouseover",
                e.bind(this, "hover"),
              ),
                this.addEventListener(
                  this.element,
                  "mousedown",
                  e.bind(this, "click"),
                ),
                this.addEventListener(
                  this.element,
                  "mouseup",
                  e.bind(this, "release"),
                );
            },
            handleGridChampionsUpdated: function (e) {
              const t = this.createChampionConfigurations(e);
              this.set("championConfigurations", i.Ember.A(t));
            },
            createChampionConfigurations: function (e) {
              this.championConfigurationsCache ||
                (this.championConfigurationsCache = {});
              const t = [];
              return (
                (e || []).forEach((e) => {
                  this.championConfigurationsCache[e.id]
                    ? this.championConfigurationsCache[e.id].set("champion", e)
                    : (this.championConfigurationsCache[e.id] =
                        this.createChampionConfiguration(e)),
                    t.push(this.championConfigurationsCache[e.id]);
                }),
                t
              );
            },
            createChampionConfiguration: function (e) {
              return (
                this.csBinding.observe(
                  `/v1/grid-champions/${e.id}`,
                  this,
                  this.handleGridChampionUpdated,
                ),
                l.ViewChampionClass.create({
                  champion: e,
                  grid: this,
                  tra: this.get("tra"),
                })
              );
            },
            handleGridChampionUpdated: function (e) {
              if (e) {
                const t = this.championConfigurationsCache[e.id];
                t &&
                  (t.set("champion", e),
                  e.id === this.get("summoner.requestedChampionId") &&
                    e.selectionStatus.pickIntentedByMe &&
                    this._finishSelectChampionTelemetryTimer());
              }
            },
            createRandomViewChampion: function () {
              return l.ViewChampionClass.create({
                grid: this,
                tra: this.get("tra"),
                champion: i.Ember.Object.create({
                  id: a.RANDOM_CHAMP.championId,
                  name: this.get("tra.random_icon_label"),
                  positionsFavorited: [],
                  searchMatchingTerms: [
                    this.get("tra.random_icon_search_matching_terms"),
                  ],
                  squarePortraitPath:
                    "/fe/lol-champ-select/images/champion-grid/random-champion.png",
                }),
              });
            },
            clearChampionIdBetweenBans: i.EmberHelpers.observeMultiChange(
              "summoner.isBanningNow",
              "summoner.banActions.@each.completed",
              function () {
                this.clearChampionId();
              },
            ),
            clearChampionId: function () {
              this.get("summoner") &&
                this.set("summoner.requestedChampionId", void 0);
            },
            clearFiltersAfterPickOrBan: i.EmberHelpers.observeMultiChange(
              "summoner.banActions.@each.completed",
              "summoner.pickAction.completed",
              function () {
                this.clearFilters();
              },
            ),
            clearFilters: function () {
              this.get("filters").forEach((e) => {
                e.set("value", !1);
              }),
                this.set("searchText", "");
            },
            getPreferredSortingMethod: function () {
              (0, c.getAccountSetting)(h).then((e) => {
                "name" === e
                  ? this.set("sortByName", !0)
                  : "mastery" === e
                    ? this.set("sortByMastery", !0)
                    : this.set("sortByFavorite", !0);
              });
            },
            positionFilters: i.Ember.computed(function () {
              const e = a.POSITIONS.map((e) =>
                r.PositionFilter.create({ name: e, tra: this.get("tra") }),
              );
              return i.Ember.A(e);
            }),
            chestFilter: i.Ember.computed(function () {
              return i.Ember.Object.create({
                name: "chest",
                value: !1,
                displayName:
                  this.get("tra.service").formatString("filter_by_chest"),
                favoriteName:
                  this.get("tra.service").formatString("favorite_by_chest"),
                unfavoriteName: this.get("tra.service").formatString(
                  "unfavorite_by_chest",
                ),
                canFavorite: !1,
                matches: function (e) {
                  return (
                    !!e &&
                    (e.id === a.RANDOM_CHAMP.championId ||
                      (!e.masteryChestGranted && e.owned))
                  );
                },
              });
            }),
            filters: i.Ember.computed(
              "positionFilters",
              "chestFilter",
              "chestFilterDisabled",
              "shouldShowChestFilter",
              function () {
                const e = [].concat(this.get("positionFilters") || []);
                return (
                  !this.get("chestFilterDisabled") &&
                    this.get("shouldShowChestFilter") &&
                    e.push(this.get("chestFilter")),
                  i.Ember.A(e)
                );
              },
            ),
            activePositionFilter: i.Ember.computed(
              "positionFilters.@each.value",
              function () {
                return (this.get("positionFilters") || []).find((e) =>
                  e.get("value"),
                );
              },
            ),
            selectedFilter: i.Ember.computed(
              "filters.@each.value",
              function () {
                const e = (this.get("filters") || i.Ember.A()).filterBy(
                  "value",
                  !0,
                );
                return !e || e.length < 1
                  ? () => !0
                  : (t) => {
                      for (let n = 0; n < e.length; n++) {
                        if (!e[n].matches(t)) return !1;
                      }
                      return !0;
                    };
              },
            ),
            canPlayFilter: i.EmberHelpers.computedGate(
              "summoner.isBanningNow",
              "pickableChampionSet",
              "bannableChampionSet",
              function () {
                let e = this.get("summoner.isBanningNow")
                  ? this.get("bannableChampionSet")
                  : this.get("pickableChampionSet");
                return (e = e || new Set([])), (t) => e.has(t.id);
              },
            ),
            championFilters: i.Ember.computed.collect(
              "selectedFilter",
              "canPlayFilter",
            ),
            searchText: "",
            debouncedSearchText: i.EmberHelpers.customDebounce(
              "searchText",
              5,
              1500,
            ),
            currentLocale: i.Ember.computed(
              "tra.metadata.locale.id",
              function () {
                const e = this.get("tra.metadata.locale.id"),
                  t = e ? e.substr(0, 2).toLowerCase() : "en";
                return "cz" === t ? "en" : t;
              },
            ),
            sortCollator: i.Ember.computed("currentLocale", function () {
              return new Intl.Collator(this.get("currentLocale"));
            }),
            filterAndSortChampionConfigurations:
              i.EmberHelpers.observeMultiChange(
                "selectedFilter",
                "canPlayFilter",
                "debouncedSearchText",
                "currentLocale",
                "pickableChampionSet",
                "championConfigurations",
                "championConfigurations.@each.favorite",
                "isRandomChampionEnabled",
                function (e, t, n) {
                  const i = (e && Object.keys(e)) || [],
                    s = this.get("championConfigurations");
                  if (!s || 0 === i.length) return;
                  const o = i.some(
                    (e) =>
                      "selectedFilter" === e || "debouncedSearchText" === e,
                  );
                  this._filterAndSortChampionConfigurations(s.toArray(), o);
                },
              ),
            _filterAndSortChampionConfigurations: function (e, t) {
              const n = this.get("sortByMastery"),
                i = this.get("sortByFavorite"),
                s = this.get("sortCollator"),
                o = new Map(),
                r = new Map(),
                l = e.filter((e) => {
                  const t = e.get("searchScore");
                  return (
                    !(t < 0) && (o.set(e, t), r.set(e, e.get("champion")), !0)
                  );
                });
              if (
                (l.sort((e, t) => {
                  const l = o.get(e),
                    c = o.get(t),
                    m = r.get(e),
                    u = r.get(t);
                  if (l === c) {
                    if (l < 0) return 0;
                    if (m.id === a.NONE_CHAMP_ID) return -1;
                    if (u.id === a.NONE_CHAMP_ID) return 1;
                    if (i && e.get("favorite") !== t.get("favorite"))
                      return e.get("favorite") ? -1 : 1;
                    if (n) {
                      const e = (u.masteryLevel || 0) - (m.masteryLevel || 0);
                      if (0 !== e) return e > 0 ? 1 : -1;
                      {
                        const e =
                          (u.masteryPoints || 0) - (m.masteryPoints || 0);
                        if (0 !== e) return e > 0 ? 1 : -1;
                      }
                    }
                    return s.compare(m.name, u.name);
                  }
                  return l > c ? -1 : 1;
                }),
                this.get("isRandomChampionEnabled") && l.length > 1)
              ) {
                const e = this.get("randomChampionConfiguration");
                l.unshift(e);
              }
              return this._onDebounceGridUpdate(l, t), l;
            },
            _onDebounceGridUpdate: function (e, t) {
              this._clearDebounceGridUpdateTimer(),
                (this._onDebounceGridUpdateTimer = this.runTask(() => {
                  this._applyGridUpdate(e, t);
                }, 50));
            },
            _clearDebounceGridUpdateTimer: function () {
              this._onDebounceGridUpdateTimer &&
                (this.cancelTask(this._onDebounceGridUpdateTimer),
                (this._onDebounceGridUpdateTimer = null));
            },
            _applyGridUpdate: function (e, t) {
              this.set("gridScrollTop", void 0),
                this._resetAnimation(t),
                this.set("championConfigurationsSorted", e);
            },
            _resetAnimation: function (e) {
              this._onAnimatingUpdateTimer &&
                (this.cancelTask(this._onAnimatingUpdateTimer),
                (this._onAnimatingUpdateTimer = null));
              const t = e && this.get("largeAreaAnimationsEnabled");
              this.set("isAnimating", t),
                t &&
                  (this._onAnimatingUpdateTimer = this.runTask(() => {
                    this.set("isAnimating", !1);
                  }, 500));
            },
            hasChampionConfigurationsSorted: i.Ember.computed.notEmpty(
              "championConfigurationsSorted",
            ),
            scrollToPickIntent: i.EmberHelpers.observeChange(
              "summoner.isPickingNow",
              function () {
                if (
                  this.get("summoner.isPickingNow") &&
                  !this.get("gridRequested")
                ) {
                  const e =
                      this.championConfigurationsCache[
                        this.get("summoner.pickAction.champion.id")
                      ],
                    t = this.get("championConfigurationsSorted"),
                    n = t ? t.indexOf(e) : -1;
                  if (n < 0) return;
                  const i = 96 * Math.floor(n / 6);
                  this.set("gridScrollTop", void 0),
                    this.set("gridScrollTop", i);
                }
              },
            ),
            _createDisabledTooltip: function () {
              const e = document.createElement("lol-uikit-tooltip");
              e.setAttribute("type", "system");
              const t = document.createElement("lol-uikit-content-block");
              t.setAttribute("padding", "small"),
                t.setAttribute("type", "tooltip-system");
              const n = document.createElement("p");
              return (
                t.appendChild(n), e.appendChild(t), { tooltip: e, textNode: n }
              );
            },
            disabledTooltipRenderDelegate: function (e, t) {
              const n = t.gridComponent;
              n._cachedTooltipAndTextNode ||
                (n._cachedTooltipAndTextNode = n._createDisabledTooltip());
              const { tooltip: i, textNode: s } = n._cachedTooltipAndTextNode;
              return (
                (s.innerText =
                  t.championConfiguration.get("disabledReason") || ""),
                i
              );
            },
            _selectableRandomChampions: function (e) {
              const t = this.get("hasSelectedChampion")
                ? this.get("summoner.activeAction.championId") ||
                  this.get("summoner.requestedChampionId")
                : null;
              return e.filter(
                (e) =>
                  e.get("searchScore") > -1 &&
                  !e.get("champion.selectionStatus.pickedByOtherOrBanned") &&
                  !e.get("champion.disabled") &&
                  e.get("champion.id") !== a.RANDOM_CHAMP.championId &&
                  (!t || e.get("champion.id") !== t),
              );
            },
            _updateRandomChampionsRateLimit: function (e, t, n) {
              if (t && e.length > 0 && e.length >= t.get("maxActions")) {
                if (!(n - e[0] > t.get("interval"))) return !1;
                e.shift(), e.push(n);
              } else e.push(n);
              return !0;
            },
            _finishSelectChampionTelemetryTimer: function () {
              this._isRecordingSelectChampionTime &&
                window.requestAnimationFrame(() => {
                  window.requestAnimationFrame(() => {
                    i.Telemetry.endTracingEvent(
                      "champ-select-select-champion-v2",
                    ),
                      (this._isRecordingSelectChampionTime = !1);
                  });
                });
            },
            _findRandomChampion: function () {
              const e = this.get("rateLimitData"),
                t = this.get("randomChampionRateLimitConfig");
              if (t && !this._updateRandomChampionsRateLimit(e, t, Date.now()))
                return null;
              const n = this.get("championConfigurations"),
                i = this._selectableRandomChampions(n);
              if (i.length >= 1) {
                return i[Math.floor(Math.random() * i.length)];
              }
            },
            actions: {
              handleInputValueChanged() {
                this.get("filters").forEach((e) => {
                  e.set("value", !1);
                });
              },
              sort: function (e) {
                this.setProperties({
                  sortByMastery: "mastery" === e,
                  sortByFavorite: "favorite" === e,
                  sortByName: "name" === e,
                }),
                  ("mastery" !== e && "favorite" !== e) ||
                    i.Telemetry.sendEvent("champ-select-grid-sort", e),
                  (0, c.saveAccountSetting)(h, e),
                  this._filterAndSortChampionConfigurations(
                    this.get("championConfigurations").toArray(),
                    !0,
                  );
              },
              toggleFavorite: function (e, t) {
                if (!this.get("favoritesEnabled")) return;
                i.Telemetry.recordNonTimingTracingEvent(
                  "champ-select-favorite",
                  1,
                  "click",
                );
                const n = i.Ember.get(e, "id");
                return this.csBinding.post(`/v1/toggle-favorite/${n}/${t}`);
              },
              select: function (e) {
                if (
                  e.get("champion.id") === a.RANDOM_CHAMP.championId &&
                  !(e = this._findRandomChampion())
                )
                  return;
                const t = e.get("champion.id"),
                  n = e.get("champion.disabled");
                if (
                  e.get("champion.selectionStatus.pickedByOtherOrBanned") ||
                  n
                )
                  return;
                const s = this.get("summoner.changingAction");
                if (!s || void 0 === s.get("id") || t === s.get("championId"))
                  return;
                (!this._lastSelectChampionTelemetrySample ||
                  Date.now() - 1e4 > this._lastSelectChampionTelemetrySample) &&
                  (i.Telemetry.startTracingEvent(
                    "champ-select-select-champion-v2",
                  ),
                  i.Telemetry.startTracingEvent("champ-select-pick-intent"),
                  (this._isRecordingSelectChampionTime = !0),
                  (this._isRecordingPickIntentTime = !0),
                  (this._lastSelectChampionTelemetrySample = Date.now()));
                const r = o.default
                  .ajax({
                    url: "/lol-champ-select/v1/session/actions/" + s.get("id"),
                    contentType: "application/json",
                    data: JSON.stringify({ championId: t }),
                    errorMessage: "error_could_not_select_champion",
                    method: "PATCH",
                  })
                  .then(() => {
                    this._isRecordingPickIntentTime &&
                      window.requestAnimationFrame(() => {
                        i.Telemetry.endTracingEvent("champ-select-pick-intent"),
                          (this._isRecordingPickIntentTime = !1);
                      }),
                      this.recordDidRequestSucceed &&
                        this.recordDidRequestSucceed(!0);
                  })
                  .catch((e) => {
                    this.recordDidRequestSucceed &&
                      this.recordDidRequestSucceed(!1, e),
                      this.get("pendingRequest") === r &&
                        (this.set(
                          "summoner.requestedChampionId",
                          s.get("championId"),
                        ),
                        i.Telemetry.sendEvent(
                          "champ-select-could-not-select-champion",
                        ),
                        this._isRecordingSelectChampionTime &&
                          (i.Telemetry.endTracingEvent(
                            "champ-select-select-champion-v2",
                          ),
                          (this._isRecordingSelectChampionTime = !1)),
                        this._isRecordingPickIntentTime &&
                          (i.Telemetry.endTracingEvent(
                            "champ-select-pick-intent",
                          ),
                          (this._isRecordingPickIntentTime = !1)));
                  });
                this.set("pendingRequest", r),
                  this.set("summoner.requestedChampionId", t);
              },
              handleFilterMouseOver: function () {
                s.default.playSound(
                  a.SFX_CHANNEL,
                  a.SOUNDS_PATH + "/sfx-uikit-grid-hover.ogg",
                );
              },
              toggleFilter: function (e) {
                s.default.playSound(
                  a.SFX_CHANNEL,
                  a.SOUNDS_PATH + "/sfx-uikit-generic-click-small.ogg",
                ),
                  this.get("filters").forEach((t) => {
                    t === e
                      ? t.set("value", !t.get("value"))
                      : t.set("value", !1);
                  });
              },
              showDisabledTooltip: function (e) {
                const t = e.get("champion.id");
                if (!e || !t) return;
                const n = event.target,
                  s = this.get("disabledTooltipElementByChampionId");
                if (!e.get("disabledAttr"))
                  return void (
                    s &&
                    s.hasOwnProperty(t) &&
                    (i.TooltipManager.disable(s[t]), delete s[t])
                  );
                const o = { gridComponent: this, championConfiguration: e };
                i.TooltipManager.assign(
                  n,
                  this.disabledTooltipRenderDelegate,
                  o,
                  {
                    type: "system",
                    restrictArea: "whole-window",
                    targetAnchor: { x: "center", y: "top" },
                  },
                ),
                  (s[t] = n);
              },
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.PositionFilter = void 0);
        var i = n(60);
        const s = n(1),
          { Ember: o } = s,
          a = s.ChampionStatistics.getPlayRates() || {},
          r = o.Object.extend({
            name: null,
            value: !1,
            canFavorite: !0,
            displayName: o.computed.apply(
              o,
              ["name"]
                .concat(
                  i.POSITIONS.map(function (e) {
                    return "tra.filter_by_position_" + e;
                  }),
                )
                .concat([
                  function () {
                    const e = this.get("tra.service"),
                      t = "filter_by_position_" + this.get("name");
                    return e.formatString(t);
                  },
                ]),
            ),
            favoriteName: o.computed.apply(
              o,
              ["name"]
                .concat(
                  i.POSITIONS.map(function (e) {
                    return "tra.favorite_by_position_" + e;
                  }),
                )
                .concat([
                  function () {
                    const e = this.get("tra.service"),
                      t = "favorite_by_position_" + this.get("name");
                    return e.formatString(t);
                  },
                ]),
            ),
            unfavoriteName: o.computed.apply(
              o,
              ["name"]
                .concat(
                  i.POSITIONS.map(function (e) {
                    return "tra.unfavorite_by_position_" + e;
                  }),
                )
                .concat([
                  function () {
                    const e = this.get("tra.service"),
                      t = "unfavorite_by_position_" + this.get("name");
                    return e.formatString(t);
                  },
                ]),
            ),
            matches: function (e) {
              if (!e) return !1;
              if (e.id === i.RANDOM_CHAMP.championId) return !0;
              const t = this.get("name"),
                n = a[t.toUpperCase()] || {};
              return e.id + "" in n || (e.positionsFavorited || []).includes(t);
            },
          });
        t.PositionFilter = r;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.ViewChampionClass = void 0);
        var i = n(1),
          s = n(60);
        const o = n(119),
          a = i.Ember.Object.extend({
            id: i.Ember.computed.alias("champion.id"),
            favoritesEnabled: i.Ember.computed.alias("grid.favoritesEnabled"),
            favorite: i.EmberHelpers.computedGate(
              "favoritesEnabled",
              "champion.positionsFavorited.length",
              "grid.activePositionFilter.name",
              function () {
                if (!this.get("favoritesEnabled")) return !1;
                const e = this.get("grid.activePositionFilter.name"),
                  t = this.get("champion.positionsFavorited");
                return e ? t.includes(e) : t.length > 0;
              },
            ),
            searchScore: i.Ember.computed(
              "champion",
              "_searchScore",
              "grid.championFilters",
              "grid.debouncedSearchText",
              function () {
                const e = this.get("champion"),
                  t = this.get("grid.championFilters");
                if (e.id === s.RANDOM_CHAMP.championId) return 90;
                return t.find((t) => {
                  if ("function" == typeof t) return !t(e);
                })
                  ? -1
                  : this.get("grid.debouncedSearchText").trim().length < 1
                    ? 0
                    : this.get("_searchScore");
              },
            ),
            _searchScore: i.Ember.computed(
              "grid.debouncedSearchText",
              "searchMatchingTerms",
              function () {
                let e = -1;
                const t = this.get("grid.debouncedSearchText").trim(),
                  n = this.get("searchMatchingTerms");
                if (!n || n.length < 1) return 0;
                const i = o.filter(t, n);
                return (
                  i.length > 0 &&
                    i[0].score &&
                    ((e += i[0].score), n.indexOf(t) >= 0 && (e += 100)),
                  e
                );
              },
            ),
            searchMatchingTerms: i.Ember.computed(
              "champion.id",
              "tra",
              function () {
                const e = this.get("tra"),
                  t = `champion_local_search_colloq_${this.get("id")}`;
                let n = [this.get("champion.name").toLocaleLowerCase()];
                return (
                  e.exists(t) &&
                    (n = i.Lodash.uniq(
                      n.concat(
                        (e.get(t) || "")
                          .split(";")
                          .filter((e) => e.length > 0)
                          .map((e) => e.toLocaleLowerCase()),
                      ),
                    )),
                  i.Lodash.uniq(n)
                );
              },
            ),
            disabledAttr: i.Ember.computed(
              "champion.selectionStatus.pickedByOtherOrBanned",
              "champion.disabled",
              function () {
                if (
                  this.get("champion.selectionStatus.pickedByOtherOrBanned") ||
                  this.get("champion.disabled")
                )
                  return !0;
              },
            ),
            hideDisabledTooltip: i.Ember.computed.not("disabledAttr"),
            disabledReason: i.Ember.computed(
              "champion.disabled",
              "champion.isBanned",
              "champion.pickedByOtherOrBanned",
              "tra.champion_unselectable_because_picked",
              "tra.champion_unselectable_because_disabled",
              "tra.champion_unselectable_because_banned",
              function () {
                return this.get("champion.disabled")
                  ? this.get("tra.champion_unselectable_because_disabled")
                  : this.get("champion.selectionStatus.isBanned")
                    ? this.get("tra.champion_unselectable_because_banned")
                    : this.get("champion.selectionStatus.pickedByOtherOrBanned")
                      ? this.get("tra.champion_unselectable_because_picked")
                      : void 0;
              },
            ),
          });
        t.ViewChampionClass = a;
      },
      (e) => {
        var t;
        (t = {}),
          (e.exports = t),
          (t.simpleFilter = function (e, n) {
            return n.filter(function (n) {
              return t.test(e, n);
            });
          }),
          (t.test = function (e, n) {
            return null !== t.match(e, n);
          }),
          (t.match = function (e, t, n) {
            n = n || {};
            var i,
              s = 0,
              o = [],
              a = t.length,
              r = 0,
              l = 0,
              c = n.pre || "",
              m = n.post || "",
              u = (n.caseSensitive && t) || t.toLowerCase();
            e = (n.caseSensitive && e) || e.toLowerCase();
            for (var p = 0; p < a; p++)
              (i = t[p]),
                u[p] === e[s]
                  ? ((i = c + i + m), (s += 1), (l += 1 + l))
                  : (l = 0),
                (r += l),
                (o[o.length] = i);
            return s === e.length
              ? ((r = u === e ? 1 / 0 : r), { rendered: o.join(""), score: r })
              : null;
          }),
          (t.filter = function (e, n, i) {
            return n && 0 !== n.length
              ? "string" != typeof e
                ? n
                : ((i = i || {}),
                  n
                    .reduce(function (n, s, o, a) {
                      var r = s;
                      i.extract && (r = i.extract(s));
                      var l = t.match(e, r, i);
                      return (
                        null != l &&
                          (n[n.length] = {
                            string: l.rendered,
                            score: l.score,
                            index: o,
                            original: s,
                          }),
                        n
                      );
                    }, [])
                    .sort(function (e, t) {
                      var n = t.score - e.score;
                      return n || e.index - t.index;
                    }))
              : [];
          });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.saveAccountSetting = t.getAccountSetting = void 0);
        var i = n(1);
        const s = "/v2/account/LCUPreferences/lol-champ-select";
        let o = 0;
        t.getAccountSetting = function (e) {
          return (0, i.DataBinding)("/lol-settings")
            .get(s)
            .then((t) => {
              const n = t && t.data && t.data[e];
              return (o = t && t.schemaVersion), n;
            });
        };
        t.saveAccountSetting = function (e, t) {
          if (void 0 === o || o < 0)
            return Promise.reject(
              "Schema version invalid, settings not updated.",
            );
          const n = { [e]: t };
          return (0, i.DataBinding)("/lol-settings").patch(s, {
            data: n,
            schemaVersion: o,
          });
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        const i =
          n(1).SharedEmberComponents.EmberCollectionApi.Layouts.GridLayout;
        t.default = class extends i {
          constructor(e, t) {
            super(e, t),
              (this._csCellWidth = e),
              (this._csCellHeight = t),
              (this._animationEnabled = !1);
          }
          widthAt(e) {
            return this._csCellWidth;
          }
          heightAt(e) {
            return this._csCellHeight;
          }
        };
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "ECgFh9Nm",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-grid-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-grid-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-grid-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","champion-grid-header"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","filter-icons"],["flush-element"],["text","\\n"],["block",["each"],[["get",["filters"]]],null,5],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","spacer"],["flush-element"],["close-element"],["text","\\n"],["block",["unless"],[["get",["gridSortDisabled"]]],null,3],["text","  "],["open-element","lol-uikit-flat-input",[]],["flush-element"],["text","\\n    "],["append",["helper",["input"],null,[["class","type","maxlength","value","key-press","name","placeholder"],["champion-input","search",25,["get",["searchText"]],"handleInputValueChanged","searchText",["get",["tra","search"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["champions ",["helper",["if"],[["get",["isChampionGridDisabled"]],"champions-disabled"],null]]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["hasChampionConfigurationsSorted"]]],null,1],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["champion-grid-champion"],null,[["championConfiguration","isRGM","UseNewLoyaltyIcon","showDisabledTooltip","select","toggleFavorite"],[["get",["championConfiguration"]],["get",["isRGM"]],["get",["UseNewLoyaltyIcon"]],"showDisabledTooltip","select","toggleFavorite"]]],false],["text","\\n"]],"locals":["championConfiguration","index"]},{"statements":[["block",["ember-collection"],null,[["class","estimated-width","estimated-height","scroll-top","items","cell-layout"],["champion-container",["get",["gridEstimatedClientWidth"]],["get",["gridEstimatedClientHeight"]],["get",["gridScrollTop"]],["get",["championConfigurationsSorted"]],["get",["gridChampionLayout"]]]],0]],"locals":[]},{"statements":[["text","    "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","selected",["unknown",["sortByFavorite"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"sort","favorite"],null],null],["flush-element"],["text","\\n      "],["append",["unknown",["tra","sort_by_favorite"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","lol-uikit-framed-dropdown",[]],["static-attr","class","champ-select-sort-dropdown"],["flush-element"],["text","\\n"],["block",["if"],[["get",["favoritesEnabled"]]],null,2],["text","    "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","class","sort-by-name"],["dynamic-attr","selected",["unknown",["sortByName"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"sort","name"],null],null],["flush-element"],["text","\\n      "],["append",["unknown",["tra","sort_by_name"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","selected",["unknown",["sortByMastery"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"sort","mastery"],null],null],["flush-element"],["text","\\n      "],["append",["unknown",["tra","sort_by_mastery"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","lol-uikit-content-block",[]],["static-attr","padding","small"],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n            "],["open-element","p",[]],["static-attr","class","filter-label"],["flush-element"],["append",["unknown",["filter","displayName"]],false],["close-element"],["text","\\n          "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["dynamic-attr","class",["concat",["filter ",["unknown",["filter","name"]]," ",["helper",["if"],[["get",["filter","value"]],"active"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"toggleFilter",["get",["filter"]]],null],null],["dynamic-attr","onmouseover",["helper",["action"],[["get",[null]],"handleFilterMouseOver"],null],null],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","restrictArea","type","offsetY"],["top","whole-window","system",-5]],4],["text","      "],["close-element"],["text","\\n"]],"locals":["filter"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(1),
          s = n(60);
        const o = i.UiKitPlugin.getContextMenuManager();
        e.exports = i.Ember.Component.extend({
          classNames: ["grid-champion"],
          classNameBindings: [
            "championConfiguration.champion.selectionStatus.selectedByMe:grid-champion-selected",
            "championConfiguration.champion.selectionStatus.banIntentedByMe:grid-champion-ban-selected",
            "championConfiguration.champion.selectionStatus.banIntented",
            "championConfiguration.champion.selectionStatus.pickIntented",
            "championConfiguration.champion.selectionStatus.pickIntentedPosition",
            "championConfiguration.champion.selectionStatus.pickIntentedByMe:self-pick-intented",
            "favoriteIcon:grid-champion-favorite",
            "loyaltyIconClass",
            "championConfiguration.champion.freeToPlay:grid-champion-free-to-play",
            "freeToPlayForQueueClass",
            "championConfiguration.champion.rented:grid-champion-rented",
            "championConfiguration.champion.selectionStatus.isBanned:grid-champion-banned",
          ],
          attributeBindings: [
            "championConfiguration.champion.id:data-id",
            "championConfiguration.disabledAttr:disabled",
          ],
          layout: n(127),
          mouseEnter: function () {
            this.sendAction(
              "showDisabledTooltip",
              this.get("championConfiguration"),
            );
          },
          click: function () {
            const e = this.get("championConfiguration");
            this.sendAction("select", e);
          },
          contextMenu: function (e) {
            if ((e.preventDefault(), !this.get("favoritesEnabled"))) return;
            const t = this.get("contextMenuModel");
            t && t.length && (o.setMenuItems(t), o.openAtEvent(e));
          },
          favoritesEnabled: i.Ember.computed(
            "championConfiguration.favoritesEnabled",
            "championConfiguration.id",
            function () {
              const e = this.get("championConfiguration.favoritesEnabled"),
                t = this.get("championConfiguration.id");
              return (
                !(t === s.RANDOM_CHAMP.championId || t === s.NONE_CHAMP_ID) && e
              );
            },
          ),
          favoriteIcon: i.Ember.computed.alias(
            "championConfiguration.favorite",
          ),
          contextMenuModel: i.Ember.computed(
            "championConfiguration.champion",
            "championConfiguration.champion.positionsFavorited",
            "championConfiguration.grid.filters",
            "championConfiguration.grid.filters.@each.favoriteName",
            "championConfiguration.grid.filters.@each.canFavorite",
            "championConfiguration.grid.filters.@each.unfavoriteName",
            function () {
              const e =
                  this.get(
                    "championConfiguration.champion.positionsFavorited",
                  ) || [],
                t = [],
                n = this.get("championConfiguration.grid.filters");
              for (let i = 0; i < n.length; i++) {
                const s = n[i];
                if (!s.get("canFavorite")) continue;
                const o = s.get("name");
                t.push({
                  action: (function (e) {
                    return function () {
                      this.sendAction(
                        "toggleFavorite",
                        this.get("championConfiguration.champion"),
                        e,
                      );
                    };
                  })(o),
                  target: this,
                  label: e.includes(o)
                    ? s.get("unfavoriteName")
                    : s.get("favoriteName"),
                });
              }
              return t;
            },
          ),
          loyaltyIconClass: i.Ember.computed(
            "championConfiguration.champion.loyaltyReward",
            "championConfiguration.champion.xboxGPReward",
            "UseNewLoyaltyIcon",
            function () {
              const e = this.get(
                  "championConfiguration.champion.loyaltyReward",
                ),
                t = this.get("championConfiguration.champion.xboxGPReward"),
                n = this.get("UseNewLoyaltyIcon");
              return e || t
                ? n
                  ? "grid-champion-loyalty-reward-new"
                  : "grid-champion-loyalty-reward"
                : "";
            },
          ),
          freeToPlayForQueueClass: i.Ember.computed(
            "championConfiguration.champion.freeToPlayForQueue",
            "isRGM",
            function () {
              let e = "";
              return (
                this.get("championConfiguration.champion.freeToPlayForQueue") &&
                  this.get("isRGM") &&
                  (e = "grid-champion-free-to-play-rgm"),
                e
              );
            },
          ),
        });
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "orG6alOC",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-grid-champion-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-grid-champion-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","grid-champion-hitbox"],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","disabled",["unknown",["championConfiguration","disabledAttr"]],null],["static-attr","class","champion-grid-champion-thumbnail"],["flush-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","champion-background-image"],["dynamic-attr","src",["unknown",["championConfiguration","champion","squarePortraitPath"]],null],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","lol-uikit-resizing-text-field",[]],["static-attr","class","champion-name"],["static-attr","data-max-width","100"],["flush-element"],["append",["unknown",["championConfiguration","champion","name"]],false],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","grid-champion-overlay"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(60),
          s = n(129);
        const o = n(1),
          { Ember: a, EmberAddons: r } = o,
          { EmberHelpers: l } = o,
          { RunMixin: c } = r.EmberLifeline;
        n(130),
          (e.exports = a.Component.extend(c, {
            classNames: ["champion-splash-background"],
            classNameBindings: [
              "champSelectScreen",
              "largeAreaAnimationsEnabled:large-area-animations-enabled:large-area-animations-disabled",
              "isAnimating:is-animating:is-pending",
              "lastCompletedBanIsPlayerTeam:is-player-team:is-enemy-team",
              "isRotating:is-rotating:is-not-rotating",
              "isShowingGrid:is-showing-grid:is-not-showing-grid",
              "newOutroLeft:new-pick-outro-left",
              "newOutroRight:new-pick-outro-right",
              "isNotPickingAndNotSelectedScreen:mask-splash",
              "currentNotification",
            ],
            layout: n(131),
            animationDispatcher: a.inject.service("animation-dispatcher"),
            banLockedInAnimationState: a.computed.alias(
              "animationDispatcher.states.banLockedInAnimation",
            ),
            banRotationAnimationState: a.computed.alias(
              "animationDispatcher.states.banRotationAnimation",
            ),
            banOutroAnimationState: a.computed.alias(
              "animationDispatcher.states.banOutroAnimation",
            ),
            lowSpecBanLockedInAnimationState: a.computed.alias(
              "animationDispatcher.states.lowSpecBanLockedInAnimation",
            ),
            newOutroLeft: a.computed.equal("pickJustLockedIn", "left"),
            newOutroRight: a.computed.equal("pickJustLockedIn", "right"),
            isAnimating: a.computed.equal(
              "banLockedInAnimationState",
              s.ANIMATION_STATES.STARTED,
            ),
            isRotating: a.computed.equal(
              "banRotationAnimationState",
              s.ANIMATION_STATES.STARTED,
            ),
            lastSelectedSplash: "",
            lastCompletedBanSplash: a.computed.alias(
              "sessionActions.lastCompletedBanAction.champion.skins.firstObject.splashPath",
            ),
            lastCompletedBanIsPlayerTeam: a.computed.alias(
              "sessionActions.lastCompletedBanAction.actor.isOnLeftSide",
            ),
            throttledSplashPath: l.throttled("splashPath", 300),
            backgroundSwitcherClasses: a.computed(
              "splashUnlocked",
              function () {
                return (
                  "champ-select-bg " +
                  (this.get("splashUnlocked") ? "unlocked" : "locked")
                );
              },
            ),
            isNotPickingAndNotSelectedScreen: a.computed(
              "currentSummoner.isPickingNow",
              "champSelectScreen",
              function () {
                return (
                  !this.get("currentSummoner.isPickingNow") &&
                  this.get("champSelectScreen") !== i.SCREENS.selected
                );
              },
            ),
            isBanPhase: a.computed.or("hasBans", "isAnimating"),
            isNotBanPhase: a.computed.not("isBanPhase"),
            largeAreaAnimationsEnabled: a.computed.alias(
              "uxSettings.largeAreaAnimationsEnabled",
            ),
            isShowingSelectedScreen: a.computed.equal(
              "champSelectScreen",
              i.SCREENS.selected,
            ),
            showEmblems: a.computed(
              "champSelectScreen",
              "emblems",
              function () {
                return (
                  this.get("emblems") &&
                  this.get("champSelectScreen") === i.SCREENS.selected
                );
              },
            ),
            hideSplashBackground: a.computed(
              "throttledSplashPath",
              function () {
                return !this.get("throttledSplashPath");
              },
            ),
            startedInSelected: a.computed.not("isDraftMode"),
            hasShownVoteReveal: a.computed(
              "isShowingVoteReveal",
              "sessionActions.completedVoteRevealActions.length",
              function () {
                return (
                  this.get("isShowingVoteReveal") ||
                  this.get("sessionActions.completedVoteRevealActions.length") >
                    0
                );
              },
            ),
            selectedScreenTransitionType: a.computed(
              "hasShownVoteReveal",
              "startedInSelected",
              function () {
                return this.get("hasShownVoteReveal") ||
                  !this.get("startedInSelected")
                  ? "fade"
                  : "pop-in-fade";
              },
            ),
            transitionType: a.computed(
              "largeAreaAnimationsEnabled",
              "champSelectScreen",
              "isShowingVoteReveal",
              "selectedScreenTransitionType",
              function () {
                let e = "none";
                if (this.get("largeAreaAnimationsEnabled")) {
                  const t = this.get("champSelectScreen");
                  this.get("isShowingVoteReveal")
                    ? (e = "pop-in-fade")
                    : t === i.SCREENS.selected
                      ? (e = this.get("selectedScreenTransitionType"))
                      : (t !== i.SCREENS.pick && t !== i.SCREENS.banShowcase) ||
                        (e = "small-pop");
                }
                return e;
              },
            ),
            currentNotification: a.computed(
              "currentSummoner.lastPickSnipedChampion",
              function () {
                return this.get("currentSummoner.lastPickSnipedChampion")
                  ? "pick-snipe-notification"
                  : "";
              },
            ),
            pickSnipeBanEnemyActionIndexClass: a.computed(
              "sessionActions.theirTeamBanActions.@each",
              "currentSummoner.lastPickSnipedChampion.banAction.actor.isOnPlayersTeam",
              function () {
                const e = this.get(
                    "currentSummoner.lastPickSnipedChampion.banAction",
                  ),
                  t = (
                    this.get("sessionActions.theirTeamBanActions") || []
                  ).indexOf(e);
                return t ? "pick-snipe-banned-by-enemy-index-" + t : "";
              },
            ),
            playLowSpecBanAnimation: function () {
              let e;
              const t = this.get("lastCompletedBanSplash");
              this.set(
                "lastSelectedSplash",
                this.get("lastCompletedBanSplash"),
              ),
                new Promise((t) => (e = t)).then(() => {
                  this.isDestroying ||
                    this.isDestroyed ||
                    this.get("lastCompletedBanSplash") !== t ||
                    (this.get("animationDispatcher").stopAnimation(
                      "lowSpecBanLockedInAnimation",
                    ),
                    this.get("animationDispatcher").stopAnimation(
                      "fullBanAnimation",
                    ));
                });
              const n = this.$("#champion-splash-ban-image");
              n.one("animationend", e),
                n.addClass("champselect-ban-lowspec-animation"),
                this.runTask(e, 1270);
            },
            setSlashImageOnSVGComponent: function () {
              const e = this.get("lastSelectedSplash") || "",
                t = this.element.querySelector(
                  "#champion-splash-ban-component",
                ),
                n = t && t.querySelector("#champion-splash-image");
              n &&
                n.setAttributeNS(
                  "http://www.w3.org/1999/xlink",
                  "xlink:href",
                  e,
                );
            },
            playLowSpecBanLockedInAnimation: l.observeChange(
              "lowSpecBanLockedInAnimationState",
              function () {
                if (
                  this.get("lowSpecBanLockedInAnimationState") ===
                  s.ANIMATION_STATES.STARTED
                )
                  this.playLowSpecBanAnimation(
                    this.get("lastCompletedBanSplash"),
                  );
                else {
                  this.set("lastSelectedSplash", "");
                  this.$("#champion-splash-ban-image").removeClass(
                    "champselect-ban-lowspec-animation",
                  );
                }
              },
            ),
            playBanLockedInAnimation: l.observeChange(
              "banLockedInAnimationState",
              function () {
                this.get("banLockedInAnimationState") ===
                s.ANIMATION_STATES.STARTED
                  ? (this.scaleAnimation && this.scaleAnimation.cancel(),
                    this.fadeOutAnimation && this.fadeOutAnimation.cancel(),
                    this.set(
                      "lastSelectedSplash",
                      this.get("lastCompletedBanSplash"),
                    ),
                    this.setSlashImageOnSVGComponent())
                  : (this.set("lastSelectedSplash", ""),
                    this.setSlashImageOnSVGComponent(),
                    this.set(
                      "banLockedInAnimationState",
                      s.ANIMATION_STATES.STOPPED,
                    ),
                    this.set(
                      "banRotationAnimationState",
                      s.ANIMATION_STATES.STOPPED,
                    ));
              },
            ),
            playBanOutroAnimation: l.observeChange(
              "banOutroAnimationState",
              function () {
                if (
                  this.get("banOutroAnimationState") ===
                  s.ANIMATION_STATES.STARTED
                ) {
                  const e = this.element.querySelector(
                    "#champion-splash-ban-component",
                  );
                  e && this.get("largeAreaAnimationsEnabled")
                    ? ((this.fadeOutAnimation = this.fadeOutElement(e, 300, 0)),
                      (this.scaleAnimation = this.scaleDownElement(e, 400, 0)),
                      (this.scaleAnimation.onfinish =
                        this.banAnimationComplete.bind(this)))
                    : this.banAnimationComplete();
                }
              },
            ),
            banAnimationComplete: function () {
              this.set("banLockedInAnimationState", s.ANIMATION_STATES.STOPPED);
            },
            fadeOutElement: function (e, t, n) {
              if (!e) return;
              return e.animate(
                [
                  { opacity: 1, display: "block" },
                  { opacity: 0, display: "none" },
                ],
                { duration: t, delay: n, fill: "both" },
              );
            },
            scaleDownElement: function (e, t, n) {
              if (!e) return;
              const i = window.getComputedStyle(e);
              return e.animate(
                [
                  { transform: i.transform + " scale(1)" },
                  { transform: i.transform + " scale(0.8)" },
                ],
                { duration: t, delay: n, fill: "both" },
              );
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = t.ANIMATION_STATES = void 0);
        const i = n(1),
          { Ember: s } = i,
          o = { STOPPED: "stopped", STARTED: "started", DONE: "done" };
        t.ANIMATION_STATES = o;
        var a = s.Service.extend({
          states: s.Object.create(),
          playAnimation: function (e) {
            const t = "states." + e;
            let n = null;
            const i = new Promise((e) => {
                n = e;
              }),
              s = () => {
                const e = this.get(t);
                (e !== o.DONE && e !== o.STOPPED) ||
                  (n(), this.removeObserver(t, this, s));
              };
            return this.addObserver(t, this, s), this.set(t, o.STARTED), i;
          },
          stopAnimation: function (e) {
            const t = "states." + e;
            this.set(t, o.DONE);
          },
        });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "AJXHbBWR",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-splash-background-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-splash-background-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-splash-background-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["background-vignette-container\\n  ",["helper",["if"],[["get",["splashDefocus"]],"defocussed","focussed"],null],"\\n  ",["helper",["if"],[["get",["largeAreaAnimationsEnabled"]],"animated","static"],null],"\\n  ",["helper",["if"],[["get",["hideSplashBackground"]],"hidden","visible"],null]]]],["flush-element"],["text","\\n  "],["append",["helper",["uikit-background-switcher"],null,[["class","src","transitionType"],[["get",["backgroundSwitcherClasses"]],["get",["throttledSplashPath"]],["get",["transitionType"]]]]],false],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["throttledSplashPath"]],"champ-select-bg-darken"],null]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["showEmblems"]]],null,1],["text","\\n"],["open-element","div",[]],["static-attr","id","champion-splash-ban-container"],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["isShowingSelectedScreen"]],"removed"],null]]]],["flush-element"],["text","\\n  "],["open-element","img",[]],["static-attr","id","champion-splash-ban-image"],["dynamic-attr","src",["unknown",["lastSelectedSplash"]],null],["flush-element"],["close-element"],["text","\\n  "],["open-element","svg",[]],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["static-attr","xmlns:xlink","http://www.w3.org/1999/xlink","http://www.w3.org/2000/xmlns/"],["static-attr","id","champion-splash-ban-component"],["static-attr","width","538"],["static-attr","height","538"],["static-attr","viewBox","0 0 538 538"],["flush-element"],["text","\\n    "],["open-element","defs",[]],["flush-element"],["text","\\n      "],["open-element","style",[]],["flush-element"],["text","\\n        @keyframes rotatePlayer {\\n          from { transform: rotate(0deg); }\\n          to { transform: rotate(45deg); }\\n        }\\n\\n        @keyframes rotateEnemy {\\n          from { transform: rotate(0deg); }\\n          to { transform: rotate(-45deg); }\\n        }\\n\\n        @keyframes fadeToGrayscale {\\n          from { -webkit-filter: grayscale(0); }\\n          to { -webkit-filter: grayscale(100%); }\\n        }\\n\\n        @keyframes sliceMaskPlayer {\\n          from { transform: translateX(-100%); }\\n          to { transform: translateX(0); }\\n        }\\n\\n        @keyframes sliceMaskEnemy {\\n          from { transform: translateX(100%); }\\n          to { transform: translateX(0); }\\n        }\\n\\n        @keyframes sliceRight {\\n          from { transform: translateX(0); }\\n          to { transform: translateX(35px); }\\n        }\\n\\n        @keyframes sliceLeft {\\n          from { transform: translateX(0); }\\n          to { transform: translateX(-35px); }\\n        }\\n      "],["close-element"],["text","\\n\\n      "],["open-element","mask",[]],["static-attr","id","slash-ban-circle-container-mask"],["static-attr","maskUnits","userSpaceOnUse"],["static-attr","x","0"],["static-attr","y","0"],["static-attr","width","100%"],["static-attr","height","100%"],["flush-element"],["text","\\n        "],["open-element","circle",[]],["static-attr","cx","269"],["static-attr","cy","269"],["static-attr","r","269"],["static-attr","fill","#fff"],["flush-element"],["close-element"],["text","\\n        "],["open-element","g",[]],["static-attr","class","container-slice-rotation"],["flush-element"],["text","\\n          "],["open-element","rect",[]],["static-attr","id","rect-container-slice"],["static-attr","x","-2"],["static-attr","y","264"],["static-attr","width","542"],["static-attr","height","12"],["static-attr","fill","#000"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n\\n      "],["open-element","mask",[]],["static-attr","id","rect-container-mask-top"],["static-attr","maskUnits","userSpaceOnUse"],["static-attr","x","0"],["static-attr","y","0"],["static-attr","width","100%"],["static-attr","height","100%"],["flush-element"],["text","\\n        "],["open-element","g",[]],["static-attr","class","container-slice-rotation"],["flush-element"],["text","\\n          "],["open-element","rect",[]],["static-attr","x","0"],["static-attr","y","0"],["static-attr","width","100%"],["static-attr","height","50%"],["static-attr","fill","#fff"],["flush-element"],["close-element"],["text","\\n          "],["open-element","rect",[]],["static-attr","x","0"],["static-attr","y","50%"],["static-attr","width","100%"],["static-attr","height","50%"],["static-attr","fill","#000"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n\\n      "],["open-element","mask",[]],["static-attr","id","rect-container-mask-bottom"],["static-attr","maskUnits","userSpaceOnUse"],["static-attr","x","0"],["static-attr","y","0"],["static-attr","width","100%"],["static-attr","height","100%"],["flush-element"],["text","\\n        "],["open-element","g",[]],["static-attr","class","container-slice-rotation"],["flush-element"],["text","\\n          "],["open-element","rect",[]],["static-attr","x","0"],["static-attr","y","50%"],["static-attr","width","100%"],["static-attr","height","50%"],["static-attr","fill","#fff"],["flush-element"],["close-element"],["text","\\n          "],["open-element","rect",[]],["static-attr","x","0"],["static-attr","y","0"],["static-attr","width","100%"],["static-attr","height","50%"],["static-attr","fill","#000"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n\\n      "],["open-element","image",[]],["static-attr","id","champion-splash-image"],["static-attr","xlink:href","","http://www.w3.org/1999/xlink"],["static-attr","x","-371"],["static-attr","y","-21"],["static-attr","width","1280"],["static-attr","height","720"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","g",[]],["static-attr","mask","url(#slash-ban-circle-container-mask)"],["flush-element"],["text","\\n      "],["open-element","g",[]],["static-attr","mask","url(#rect-container-mask-top)"],["flush-element"],["text","\\n        "],["open-element","use",[]],["static-attr","id","image-top"],["static-attr","xlink:href","#champion-splash-image","http://www.w3.org/1999/xlink"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","g",[]],["static-attr","mask","url(#rect-container-mask-bottom)"],["flush-element"],["text","\\n        "],["open-element","use",[]],["static-attr","id","image-bottom"],["static-attr","xlink:href","#champion-splash-image","http://www.w3.org/1999/xlink"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","ban-background-overlay-container"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["background-edge-backlight ",["unknown",["pickSnipeBanEnemyActionIndexClass"]]]]],["flush-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["emblem","emblemPath","large"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":["emblem"]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","champion-splash-emblem-overlay"],["flush-element"],["text","\\n"],["block",["each"],[["get",["emblems"]]],null,0],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n(133);
        const i = n(1),
          { Ember: s } = i;
        e.exports = s.Component.extend({
          classNames: ["champion-splash-ring"],
          classNameBindings: [
            "champSelectScreen",
            "actingSummonerCellClass",
            "largeAreaAnimationsEnabled:animation-enabled",
            "shouldPlayIntroAnimation:should-play-intro",
            "isHeaderExpanded:expanded-header",
          ],
          layout: n(134),
          largeAreaAnimationsEnabled: s.computed.equal(
            "uxSettings.largeAreaAnimationsEnabled",
            !0,
          ),
          actingSummonerCellClass: s.computed(
            "actingSummonerCell",
            function () {
              return "summoner-acting-now-" + this.get("actingSummonerCell");
            },
          ),
          actingSummonerCell: s.computed(
            "currentActions.@each.type",
            "currentActions.@each.completed",
            function () {
              if (this.get("currentActions")) {
                const e = this.get("currentActions").findBy("completed", !1);
                if (e) return e.get("actorCellId");
              }
              return null;
            },
          ),
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "1jqhrJ4e",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-splash-ring-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-splash-ring-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\champion-splash-ring-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","ring-splash-dashed"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","ring-splash-outer"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","left-ring"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","right-ring"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","ring-splash-inner"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","left-ring"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","right-ring"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(1);
        n(136);
        const s = i.Ember.Component.extend({
          classNames: ["champ-select-chroma-modal"],
          classNameBindings: ["baseSkin.chromaPreviewPath:chroma-view"],
          layout: n(137),
          didReceiveAttrs: function () {
            this._super(...arguments);
            const e = this.get("baseSkin"),
              t = this.get("hoverSkin");
            if (!t || !e) return;
            const n = t.id === e.id,
              i = t.championId === e.championId && t.parentSkinId === e.id;
            n || i || this.set("hoverSkin", void 0);
          },
          didRender: function () {
            this._super(...arguments);
            const e = this.get("selectedSkinId");
            this.element
              .querySelectorAll(".chroma-list-item")
              .forEach(function (t) {
                t.classList.contains(`id-${e}`)
                  ? t.classList.add("selected")
                  : t.classList.remove("selected");
              });
          },
          doesSkinHaveChromas: i.Ember.computed.bool(
            "baseSkin.chromaPreviewPath",
          ),
          doesSkinHaveForms: i.Ember.computed(
            "doesSkinHaveChromas",
            function () {
              return (
                !this.get("doesSkinHaveChromas") &&
                "kQuestSkin" === this.get("baseSkin.productType")
              );
            },
          ),
          displayedSkin: i.Ember.computed(
            "baseSkin.childSkins",
            "selectedSkinId",
            "hoverSkin",
            function () {
              const e = this.get("selectedSkinId"),
                t = (this.get("baseSkin.childSkins") || []).find(
                  (t) => t.id === e,
                ),
                n = this.get("hoverSkin");
              return n && !n.isDestroying ? n : t || this.get("baseSkin");
            },
          ),
          sortedChromas: i.Ember.computed(
            "baseSkin.childSkins.[]",
            "disabledChromas",
            function () {
              const e = this.get("disabledChromas") || [];
              return (this.get("baseSkin.childSkins") || [])
                .filter((t) => !e.includes(t.id))
                .sort((e, t) =>
                  e.ownership.owned === t.ownership.owned
                    ? e.id < t.id
                      ? -1
                      : 1
                    : e.ownership.owned
                      ? -1
                      : 1,
                );
            },
          ),
          actions: {
            setSkin: function (e) {
              this.sendAction("setSkinThroughChromaModal", e);
            },
            showPreview: function (e) {
              this.set("hoverSkin", e);
            },
            closePreview: function () {
              this.set("hoverSkin", void 0);
            },
          },
        });
        e.exports = s;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "gxj71HED",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\chroma-modal-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\chroma-modal-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\chroma-modal-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["doesSkinHaveChromas"]]],null,3],["text","\\n"],["block",["if"],[["get",["doesSkinHaveForms"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["chroma-list-item id-",["unknown",["chroma","id"]]," ",["helper",["unless"],[["get",["chroma","unlocked"]],"locked"],null]]]],["dynamic-attr","onmouseup",["helper",["action"],[["get",[null]],"setSkin",["get",["chroma"]]],null],null],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","chroma-list-item-highlight-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","chroma-list-item-highlight"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","chroma-list-item-content"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","chroma-list-item-name"],["flush-element"],["append",["unknown",["chroma","shortName"]],false],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","chroma-list-item-status-icon"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["chroma"]},{"statements":[["block",["each"],[["get",["sortedChromas"]]],null,0]],"locals":[]},{"statements":[["text","      "],["append",["helper",["skin-button"],null,[["skin","selectedSkinId","baseSkin","onClick","onEnter","onLeave","setSkin","showPreview","closePreview","jmxSettings","timeRemaining","inFinalizationPhase"],[["get",["chroma"]],["get",["selectedSkinId"]],["get",["skin"]],["helper",["action"],[["get",[null]],"setSkin"],null],["helper",["action"],[["get",[null]],"showPreview"],null],["helper",["action"],[["get",[null]],"closePreview"],null],"setSkin","showPreview","closePreview",["get",["jmxSettings"]],["get",["timeRemaining"]],["get",["inFinalizationPhase"]]]]],false],["text","\\n"]],"locals":["chroma"]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","chroma-information"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["currentMapChromaPath"]],"\')"]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","chroma-information-image"],["dynamic-attr","style",["concat",["background-image: url(\'",["unknown",["displayedSkin","chromaPreviewPath"]],"\')"]]],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","child-skin-name"],["flush-element"],["text","\\n      "],["append",["unknown",["displayedSkin","name"]],false],["text","\\n      "],["open-element","div",[]],["static-attr","class","child-skin-disabled-notification"],["flush-element"],["append",["helper",["if"],[["get",["displayedSkin","disabled"]],["get",["tra","skin_unselectable_because_disabled"]]],null],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","chroma-selection"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n    "],["append",["helper",["skin-button"],null,[["skin","selectedSkinId","onClick","onEnter","onLeave","setSkin","showPreview","closePreview","jmxSettings","timeRemaining","inFinalizationPhase"],[["get",["baseSkin"]],["get",["selectedSkinId"]],["helper",["action"],[["get",[null]],"setSkin"],null],["helper",["action"],[["get",[null]],"showPreview"],null],["helper",["action"],[["get",[null]],"closePreview"],null],"setSkin","showPreview","closePreview",["get",["jmxSettings"]],["get",["timeRemaining"]],["get",["inFinalizationPhase"]]]]],false],["text","\\n"],["block",["each"],[["get",["sortedChromas"]]],null,2],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(1);
        n(139),
          (e.exports = i.Ember.Component.extend({
            layout: n(140),
            classNames: ["disconnect-notification"],
            champSelectDisconnectService: i.Ember.inject.service(
              "champ-select-disconnect",
            ),
            init: function () {
              this._super(...arguments),
                this.get(
                  "champSelectDisconnectService",
                ).setDisconnectShouldExitCallback(
                  this._handleDisconnectShouldExit.bind(this),
                );
            },
            didInsertElement: function () {
              this._super(...arguments);
              const e = this.element.querySelector(
                ".champ-select-disconnect-notification-content",
              );
              e &&
                (this.set("disconnectNotificationContent", e),
                this._showDisconnectNotification());
            },
            willDestroyElement: function () {
              this._super(...arguments),
                this._hideDisconnectNotification(),
                this._hideDisconnectShouldExitDialog();
            },
            _showDisconnectNotification: function () {
              const e = this.get("disconnectNotificationContent");
              if (this.get("disconnectNotification") || !e) return;
              const t = i.ContextualNotificationManager.add(
                this.get("disconnectNotificationContent"),
                { dismissable: !1, position: { top: 40, right: 30 } },
              );
              this.set("disconnectNotification", t);
            },
            _hideDisconnectNotification: function () {
              const e = this.get("disconnectNotification");
              e &&
                (i.ContextualNotificationManager.remove(e),
                this.set("disconnectNotification", null));
            },
            _handleDisconnectShouldExit: function (e) {
              const t = !!this.get("disconnectNotification");
              e && t
                ? this._showDisconnectShouldExitDialog()
                : this._hideDisconnectShouldExitDialog();
            },
            _showDisconnectShouldExitDialog: function () {
              if (!this.get("disconnectShouldExitDialog")) {
                const e = i.ModalManager.add({
                  type: "DialogAlert",
                  data: {
                    contents: i.TemplateHelper.contentBlockDialog(
                      this.get("tra.disconnect_should_exit_dialog_title"),
                      this.get("tra.disconnect_should_exit_dialog_body"),
                      "dialog-small",
                    ),
                    okText: this.get(
                      "tra.disconnect_should_exit_dialog_button",
                    ),
                    dismissable: !1,
                  },
                });
                e.okPromise.then(() => {
                  window.riotInvoke &&
                    window.riotInvoke({
                      request: JSON.stringify({
                        name: "RiotClient.Exit",
                        params: [],
                      }),
                    });
                }),
                  this.set("disconnectShouldExitDialog", e);
              }
            },
            _hideDisconnectShouldExitDialog: function () {
              const e = this.get("disconnectShouldExitDialog");
              e &&
                (i.ModalManager.remove(e),
                this.set("disconnectShouldExitDialog", null));
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "sTa48tUo",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\disconnect-notification-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\disconnect-notification-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\disconnect-notification-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-content-block",[]],["static-attr","class","champ-select-disconnect-notification-content"],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","spinner-container"],["flush-element"],["text","\\n        "],["append",["helper",["uikit-spinner"],null,[["width","height"],["40px","40px"]]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","text-container"],["flush-element"],["text","\\n        "],["open-element","h5",[]],["static-attr","class","title-text-container"],["flush-element"],["append",["unknown",["tra","disconnect_notification_title"]],false],["close-element"],["text","\\n        "],["open-element","p",[]],["static-attr","class","body-text-container"],["flush-element"],["append",["unknown",["tra","disconnect_notification_body"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i,
          s = n(1),
          o = (i = n(58)) && i.__esModule ? i : { default: i },
          a = n(142),
          r = n(63),
          l = n(60);
        n(144);
        const { DomMixin: c } = s.EmberAddons.EmberLifeline,
          m = s.UiKitPlugin.getLayerManager(),
          u = s.ViewportPlugin.fullScreen().getScreenRoot(
            "rcp-fe-lol-champ-select",
          );
        e.exports = s.Ember.Component.extend(c, {
          layout: n(145),
          classNames: ["emotes-edit-button-container"],
          classNameBindings: ["disabled", "showingEmotes"],
          showingEmotes: !1,
          _screenRootHideCallback: null,
          disabled: s.Ember.computed(
            "isDonePicking",
            "lockedAtEndOfChampSelect",
            "showingEmotes",
            function () {
              return (
                !this.get("isDonePicking") ||
                this.get("lockedAtEndOfChampSelect") ||
                this.get("showingEmotes")
              );
            },
          ),
          noWardSkins: s.Ember.computed.not("wardSkinsAvailable"),
          emotesButtonTooltipString: s.Ember.computed(
            "disabled",
            "tra.ready",
            "tra.emotes_edit_button",
            "tra.emotes_edit_button_disabled",
            function () {
              return this.get("disabled")
                ? this.get("tra.emotes_edit_button_disabled")
                : this.get("tra.emotes_edit_button");
            },
          ),
          actions: {
            onEmotesButtonHover: function () {
              this.get("disabled") ||
                o.default.playSound(
                  l.SFX_CHANNEL,
                  l.SOUNDS_PATH + "/sfx-uikit-grid-hover.ogg",
                );
            },
            openEmotesPanel: function () {
              this.get("disabled") ||
                this.get("showingEmotes") ||
                (o.default.playSound(
                  "sfx-ui",
                  "/fe/lol-champ-select/sounds/sfx-uikit-edit-click.ogg",
                ),
                s.Telemetry.recordNonTimingTracingEvent(
                  "emote-panel-opened",
                  1,
                  "click",
                ),
                this.set("emotesModalComponent", null),
                this.set("emotePanelApplication", null),
                this.initEmotePanel().then(
                  function () {
                    this.showEmoteModal();
                  }.bind(this),
                ));
            },
          },
          initEmotePanel: function () {
            return (0, r.useEmotesApi)((e) =>
              e.getCurrentPlayerEmotePanel().then((e) => {
                this.setEmotesModalComponent(e), this.addModalCloseListener();
              }),
            );
          },
          setEmotesModalComponent: function (e) {
            if (!this.get("emotesModalComponent")) {
              const t = (0, a.createFullScreenModal)(e.domNode, "emotes-modal");
              this.set("emotesModalComponent", t),
                this.set("emotePanelApplication", e);
            }
          },
          addModalCloseListener: function () {
            const e = function () {
              this.onEditEmoteModalClosing();
            }.bind(this);
            this.set("closingModalCallback", e),
              this.addEventListener(
                this.get("emotesModalComponent"),
                "closeButtonClick",
                e,
              );
          },
          onEditEmoteModalClosing: function () {
            this.hideEmoteModal(!1);
          },
          showEmoteModal: function () {
            this.get("showingEmotes") ||
              (m.addLayer(this.get("emotesModalComponent")),
              this.set("showingEmotes", !0),
              this.set("_screenRootHideCallback", () => {
                this.get("showingEmotes") &&
                  this.get("emotesModalComponent") &&
                  this.hideEmoteModal(!1),
                  u.off("hide", this.get("_screenRootHideCallback"));
              }),
              u.on("hide", this.get("_screenRootHideCallback")));
          },
          hideEmoteModal: function () {
            this.get("showingEmotes") && this._removeEmotesModalLayer();
          },
          _removeEmotesModalLayer: function () {
            if (this.get("emotesModalComponent")) {
              const e = this.get("emotePanelApplication");
              this.get("emotesModalComponent").removeEventListener(
                "closeButtonClick",
                this.get("closingModalCallback"),
              ),
                m.removeLayer(this.get("emotesModalComponent")),
                e && e.onRemove && e.onRemove(),
                this.isDestroyed ||
                  this.isDestroying ||
                  (this.set("showingEmotes", !1),
                  this.set("emotesModalComponent", null),
                  this.set("emotePanelApplication", null));
            }
          },
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.createFullScreenModal = function (e, t) {
            return i.ComponentFactory.create("FullScreenModal", {
              elementClassName: t,
              domNode: e,
            });
          });
        var i = n(1);
        n(143);
        i.ComponentFactory.setFactory("FullScreenModal", function (e) {
          const t = document.createElement("div");
          t.className = e.elementClassName;
          const n = document.createElement("lol-uikit-dialog-frame");
          return (
            n.setAttribute("dismissable", ""),
            n.setAttribute("dismissable-type", "outside"),
            t.appendChild(n),
            n.appendChild(e.domNode),
            t
          );
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "jqwFN2lT",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\emotes-edit-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\emotes-edit-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\emotes-edit-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["emotes-edit-button ",["helper",["if"],[["get",["disabled"]],"disabled"],null]," ",["helper",["if"],[["get",["showingEmotes"]],"showing-emotes"],null]," ",["helper",["if"],[["get",["noWardSkins"]],"no-ward-skins"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openEmotesPanel"],null],null],["dynamic-attr","onmouseover",["helper",["action"],[["get",[null]],"onEmotesButtonHover"],null],null],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type","offsetY"],["top","system",16]],0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","champ-select-edit-emotes-button-tooltip"],["flush-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["emotesButtonTooltipString"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(1);
        n(147);
        const { RunMixin: s } = i.EmberAddons.EmberLifeline;
        let o;
        e.exports = i.Ember.Component.extend(s, {
          classNames: ["flyout-selector-button-container"],
          classNameBindings: [
            "item.locked:disabled",
            "isSelectedItem:selected-item",
          ],
          attributeBindings: ["data-id"],
          layout: n(148),
          isItemVisible: !1,
          "data-id": i.Ember.computed.alias("item.id"),
          isSelectedItem: i.Ember.computed("selectedItem", "item", function () {
            return (
              !!this.get("selectedItem") &&
              this.get("selectedItem.id") === this.get("item.id")
            );
          }),
          willDestroyElement() {
            this.cancelTask(o);
          },
          displayItemHoverInfo(e) {
            o && this.cancelTask(o), this.onFlyoutItemHover(e);
          },
          clearItemHoverInfo() {
            o = this.runTask(this._clearHover, 100);
          },
          _clearHover() {
            this.onFlyoutItemHover(null);
          },
          actions: {
            itemSelected: function (e) {
              this.onFlyoutItemSelected(e);
            },
            displayItemHoverInfo: function (e) {
              this.displayItemHoverInfo(e);
            },
            clearItemHoverInfo: function () {
              this.clearItemHoverInfo();
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "W4jdIc9Z",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\flyout-selector-popup-button\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\flyout-selector-popup-button\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\flyout-selector-popup-button\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","flyout-selector-button-icon"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"itemSelected",["get",["item"]]],null],null],["dynamic-attr","onmouseover",["helper",["action"],[["get",[null]],"displayItemHoverInfo",["get",["item"]]],null],null],["dynamic-attr","onmouseout",["helper",["action"],[["get",[null]],"clearItemHoverInfo"],null],null],["flush-element"],["text","\\n  "],["open-element","button",[]],["static-attr","class","flyout-selector-button"],["flush-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["item","iconPath"]]]]],["static-attr","class","flyout-selector-button-image"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i,
          s = n(1),
          o = n(60),
          a = (i = n(58)) && i.__esModule ? i : { default: i };
        const { RunMixin: r, DomMixin: l } = s.EmberAddons.EmberLifeline;
        n(150),
          (e.exports = s.Ember.Component.extend(r, l, {
            layout: n(151),
            classNames: ["flyout-selector-trigger-button"],
            classNameBindings: ["disabled:disabled:enabled", "animateButton"],
            disabled: !1,
            animateButton: !1,
            init() {
              this._super(...arguments),
                (this.onAnimationEnd = this.onAnimationEnd.bind(this));
            },
            didReceiveAttrs() {
              this._super(...arguments),
                this.get("lastSelectedItem") !== this.get("selectedItem") &&
                  (this.get("didUserChangeItem") &&
                    (this._runAfterRender = s.Ember.run.scheduleOnce(
                      "afterRender",
                      this,
                      () => {
                        this.set("animateButton", !0),
                          this.afterUserChangedItemAnimation();
                      },
                    )),
                  this.set("lastSelectedItem", this.get("selectedItem")));
            },
            didRender: function () {
              this._super(...arguments), this.initAnimationEnd();
            },
            willDestroyElement() {
              this._super(...arguments), this.cancelTask(this._runAfterRender);
            },
            onAnimationEnd: function () {
              this.isDestroying ||
                this.isDestroyed ||
                this.set("animateButton", !1);
            },
            initAnimationEnd: function () {
              if (this.animationEndEventHandled) return;
              const e = this.element.querySelector(".animated-border-overlay");
              e &&
                (this.addEventListener(e, "animationend", this.onAnimationEnd),
                (this.animationEndEventHandled = !0));
            },
            actions: {
              onHover: function () {
                this.get("disabled") ||
                  a.default.playSound(
                    o.SFX_CHANNEL,
                    `${o.SOUNDS_PATH}/sfx-uikit-grid-hover.ogg`,
                  );
              },
              toggleFlyout: function () {
                this.get("disabled") ||
                  this.get("temporarilyDisabled") ||
                  (this.set("animateButton", !0), this.toggleFlyout(this));
              },
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "sPTr2pm/",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\flyout-selector-trigger-button\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\flyout-selector-trigger-button\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\flyout-selector-trigger-button\\\\index.js\\" "],["text","\\n"],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["selectedItem","iconPath"]]]]],["static-attr","class","selection-button-image"],["dynamic-attr","style",["unknown",["imageStyle"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"toggleFlyout"],null],null],["dynamic-attr","onmouseover",["helper",["action"],[["get",[null]],"onHover"],null],null],["flush-element"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","animated-border-overlay"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","animated-gradient-overlay"],["flush-element"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0),
          n(153);
        const i = n(1),
          { Ember: s, EmberAddons: o } = i,
          { RunMixin: a } = o.EmberLifeline,
          { gsap: r } = i;
        var l = s.Component.extend(a, {
          classNames: ["game-event-info-card"],
          layout: n(154),
          animationTimeline: null,
          didInsertElement: function () {
            const e = this.get("element"),
              t = e.querySelector(".game-event-info-card-icon-subtext"),
              n = e.querySelector(".game-event-info-card-left"),
              i = e.querySelector(".game-event-info-card-icon"),
              s = e.querySelector(".game-event-info-card-title"),
              o = e.querySelector(".game-event-info-card-description");
            this.animationTimeline ||
              ((this.animationTimeline = new r.TimelineMax({ paused: !0 })),
              this.animationTimeline
                .to(e, 1, { x: 0, ease: r.Power3.easeInOut })
                .to(t, 0.3, { autoAlpha: 0, ease: r.Power3.easeOut }, "-=0.8")
                .to(i, 0.3, { autoAlpha: 0, ease: r.Power3.easeOut }, "-=0.8")
                .to(n, 0.3, { autoAlpha: 1, ease: r.Power3.easeOut }, "-=0.3")
                .to(i, 0.3, { autoAlpha: 1, ease: r.Power3.easeOut }, "-=0.3")
                .to(
                  s,
                  0.2,
                  { autoAlpha: 1, x: 0, ease: r.Power3.easeOut },
                  "-=0.25",
                )
                .to(
                  o,
                  0.2,
                  { autoAlpha: 1, x: 0, ease: r.Power3.easeOut },
                  "-=0.2",
                ));
          },
          didUpdateAttrs: function () {
            this._super(...arguments);
            const e = this.get("oldShiftedToSide"),
              t = this.get("shiftedToSide");
            e !== t &&
              this.runTask(function () {
                this.shiftElement(!this.get("shiftedToSide"));
              }, 0),
              this.set("oldShiftedToSide", t);
          },
          title: s.computed(
            "map.categorizedContentBundles.GameEventInfoCards",
            "eventIndex",
            function () {
              const e = this.get("eventIndex");
              return this.get(
                `map.categorizedContentBundles.GameEventInfoCards.${e}.header`,
              );
            },
          ),
          description: s.computed(
            "map.categorizedContentBundles.GameEventInfoCards",
            "eventIndex",
            function () {
              const e = this.get("eventIndex");
              return this.get(
                `map.categorizedContentBundles.GameEventInfoCards.${e}.body`,
              );
            },
          ),
          iconSubtext: s.computed(
            "map.categorizedContentBundles.GameEventInfoCards",
            function () {
              return this.get(
                "map.categorizedContentBundles.GameEventInfoCards.IconSubtext.header",
              );
            },
          ),
          iconSrc: s.computed(
            "map.categorizedContentBundles.GameEventInfoCards",
            "eventIndex",
            function () {
              const e = this.get("eventIndex");
              return this.get(
                `map.categorizedContentBundles.GameEventInfoCards.${e}.imagePath`,
              );
            },
          ),
          shiftElement: function (e) {
            e ? this.animationTimeline.pause(0) : this.animationTimeline.play();
          },
        });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "cq7H0X8I",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\game-event-info-card-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\game-event-info-card-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\game-event-info-card-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","game-event-info-card-left"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","game-event-info-card-title"],["flush-element"],["text","\\n    "],["append",["unknown",["title"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","game-event-info-card-description"],["flush-element"],["text","\\n    "],["append",["unknown",["description"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","game-event-info-card-right"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","game-event-info-card-icon"],["flush-element"],["text","\\n    "],["open-element","img",[]],["dynamic-attr","src",["unknown",["iconSrc"]],null],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","game-event-info-card-icon-subtext"],["flush-element"],["text","\\n    "],["append",["unknown",["iconSubtext"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        const i = n(1),
          { Ember: s } = i,
          o = {
            GAME_CFG_DRAFT_TOURNAMENT: "tournament_draft",
            GAME_CFG_PICK_RANDOM: "random",
            GAME_CFG_DRAFT_STD: "draft",
            GAME_CFG_PICK_BLIND: "blind",
            GAME_CFG_TEAM_BUILDER_BLIND: "blind",
            GAME_CFG_TEAM_BUILDER_DRAFT: "draft",
            GAME_CFG_COUNTER_PICK: "counter",
            GAME_CFG_PICK_SIMUL_TD: "simultaneous",
            GAME_CFG_PICK_SIMUL: "simultaneous",
            GAME_CFG_BLIND_DUPE: "all_for_one",
            GAME_CFG_BLIND_DRAFT_ST: "blind_draft",
            GAME_MUTATOR_OVERRIDE_SHOWDOWN: "showdown",
          };
        n(156),
          (e.exports = s.Component.extend({
            layout: n(157),
            classNameBindings: ["mutatorName::hidden"],
            teamSizeText: s.computed("teamSize", function () {
              return this.get("tra").formatString("map_size", {
                size: this.get("teamSize"),
              });
            }),
            pickModeText: s.computed("mutatorName", function () {
              const e =
                "custom_game_mutator_type_" + o[this.get("mutatorName")];
              return this.get("tra").formatString(e);
            }),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "iqwEYkku",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\game-info-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\game-info-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\game-info-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","team-size"],["flush-element"],["text","\\n  "],["append",["unknown",["teamSizeText"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","pick-mode"],["flush-element"],["text","\\n  "],["append",["unknown",["pickModeText"]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(1),
          s = a(n(58)),
          o = a(n(66));
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        n(159);
        const r = "sfx-ui",
          l = s.default.createSound(
            r,
            "/fe/lol-champ-select/sounds/sfx-cs-draft-ban-button-hover.ogg",
          ),
          c = s.default.createSound(
            r,
            "/fe/lol-champ-select/sounds/sfx-cs-lockin-button-hover.ogg",
          ),
          m = [l, c],
          u = i.ViewportPlugin.fullScreen().getScreenRoot(
            "rcp-fe-lol-champ-select",
          );
        e.exports = i.Ember.Component.extend({
          classNames: ["lock-in"],
          classNameBindings: [
            "visible:visible:hidden",
            "summoner.isPickingNow:picking",
            "summoner.isVotingNow:picking",
            "summoner.isBanningNow:banning",
          ],
          layout: n(160),
          requestPending: !1,
          disabled: i.EmberHelpers.computedGate(
            "summoner.activeAction.championId",
            "requestPending",
            function () {
              if (
                !this.get("summoner.activeAction.championId") ||
                this.get("requestPending")
              )
                return !0;
            },
          ),
          shouldShowButtonText: i.Ember.computed.or(
            "summoner.isPickingOrVotingNow",
            "summoner.isBanningNow",
          ),
          buttonText: i.Ember.computed(
            "summoner.isPickingOrVotingNow",
            "summoner.isBanningNow",
            function () {
              return this.get("summoner.isPickingNow")
                ? this.get("tra.lock_in")
                : this.get("summoner.isVotingNow")
                  ? this.get("tra.vote_button")
                  : this.get("summoner.isBanningNow")
                    ? this.get("tra.ban_button")
                    : void 0;
            },
          ),
          mouseEnter: function () {
            !this.get("disabled") &&
              this.get("visible") &&
              (m.forEach(function (e) {
                e.stop().catch(function () {});
              }),
              this.get("summoner.isBanningNow") ? c.play() : l.play());
          },
          lockInCompletedObserver: i.Ember.observer(
            "summoner.isActingNow",
            function () {
              (!this._isRecordingLockInTime && !this._isRecordingBanTime) ||
                this.get("summoner.isActingNow") ||
                requestAnimationFrame(() => {
                  this.isDestroying ||
                    this.isDestroyed ||
                    (this._isRecordingBanTime
                      ? (i.Telemetry.endTracingEvent("champ-select-ban"),
                        (this._isRecordingBanTime = !1))
                      : this._isRecordingLockInTime &&
                        (i.Telemetry.endTracingEvent("champ-select-lock-in"),
                        (this._isRecordingLockInTime = !1)));
                });
            },
          ),
          sendLCUReqeust: function (e, t) {
            this.set("requestPending", !0);
            const n = this.get("summoner.isBanningNow");
            n
              ? (i.Telemetry.startTracingEvent("champ-select-ban"),
                (this._isRecordingBanTime = !0))
              : (i.Telemetry.startTracingEvent("champ-select-lock-in"),
                (this._isRecordingLockInTime = !0)),
              o.default
                .ajax({
                  type: "PATCH",
                  url: "/lol-champ-select/v1/session/actions/" + e.get("id"),
                  contentType: "application/json",
                  data: JSON.stringify({ completed: !0, championId: t }),
                  errorMessage: "error_could_not_lock_in",
                })
                .then(() => {
                  this.recordDidRequestSucceed &&
                    this.recordDidRequestSucceed(!0);
                })
                .catch((e) => {
                  this.recordDidRequestSucceed &&
                    this.recordDidRequestSucceed(!1, e);
                  const t = e && e.responseText ? e.responseText : "";
                  this._isRecordingLockInTime
                    ? (i.Telemetry.endTracingEvent("champ-select-lock-in"),
                      i.Telemetry.sendEvent("champ-select-lock-in-failure", t),
                      i.Telemetry.recordNonTimingTracingEvent(
                        "champ-select-lock-in-failure",
                        1,
                        "event",
                      ),
                      (this._isRecordingLockInTime = !1))
                    : this._isRecordingBanTime &&
                      (i.Telemetry.endTracingEvent("champ-select-ban"),
                      i.Telemetry.sendEvent("champ-select-ban-failure", t),
                      i.Telemetry.recordNonTimingTracingEvent(
                        "champ-select-ban-failure",
                        1,
                        "event",
                      ),
                      (this._isRecordingBanTime = !1));
                })
                .finally(
                  function () {
                    this.set("requestPending", !1);
                  }.bind(this),
                ),
              n
                ? s.default.playSound(
                    r,
                    "/fe/lol-champ-select/sounds/sfx-cs-draft-ban-button-click.ogg",
                  )
                : s.default.playSound(
                    r,
                    "/fe/lol-champ-select/sounds/sfx-cs-lockin-button-click.ogg",
                  );
          },
          summonerInfoService: i.Ember.inject.service("summoner-info"),
          buildBanIntentModal: function (e, t) {
            const n = i.UiKitPlugin.getModalManager(),
              s = i.UiKitPlugin.getTemplateHelper(),
              o = e.get("champion.selectedByMe"),
              a = o
                ? this.get("tra.ban_intent_modal_title_self")
                : this.get("tra.ban_intent_modal_title"),
              r = o
                ? this.get("tra.ban_intent_modal_description_self")
                : this.get("tra").formatString("ban_intent_modal_description", {
                    name: e.get("champion.selectedBy.displayName"),
                  }),
              l = n.add({
                type: "DialogConfirm",
                data: {
                  contents: s.contentBlockDialog(a, r),
                  acceptText: this.get("tra.ban_button"),
                  declineText: this.get("tra.ban_intent_modal_cancel_button"),
                  primaryButton: "accept",
                },
              });
            u.once("hide", () => {
              n.remove(l);
            });
            const c = () => {
              n.remove(l),
                this.removeObserver("summoner.isBanSniping", this, c);
            };
            this.addObserver("summoner.isBanSniping", this, c),
              l.acceptPromise
                .then(
                  () => {
                    this.sendLCUReqeust(e, t);
                    const n = this.get("summoner.summonerId"),
                      s = e.get("champion.selectedBy.summonerId");
                    let o, a;
                    this.get("summonerInfoService")
                      .getSummonerInfo(n)
                      .then(
                        (e) => (
                          (o = e.puuid),
                          this.get("summonerInfoService").getSummonerInfo(s)
                        ),
                      )
                      .then((e) => {
                        a = e.puuid;
                        const t = {
                          gameId: this.get("gameId"),
                          playerBanSniping: o,
                          playerBanSniped: a,
                        };
                        i.Telemetry.sendCustomData(
                          "champ-select-ban-intent-modal-confirm",
                          t,
                        );
                      });
                  },
                  () => {
                    i.Telemetry.sendEvent(
                      "champ-select-ban-intent-modal-cancel",
                    );
                  },
                )
                .finally(() => {
                  c();
                });
          },
          actions: {
            lockIn: function () {
              if (this.get("disabled")) return;
              const e = this.get("summoner.activeAction"),
                t = e.get("championId");
              this.get("summoner.isBanSniping")
                ? (i.Telemetry.sendEvent(
                    "champ-select-ban-intent-modal-generate",
                  ),
                  this.buildBanIntentModal(e, t))
                : this.sendLCUReqeust(e, t);
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "qVPYeaEg",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\lock-in-button-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\lock-in-button-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\lock-in-button-component\\\\index.js\\" "],["text","\\n"],["block",["action-button"],null,[["disabled","click"],[["get",["disabled"]],"lockIn"]],0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["shouldShowButtonText"]],"visible","removed"],null]]]],["flush-element"],["text","\\n    "],["append",["unknown",["buttonText"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = n(1),
          s = n(120),
          o = n(63),
          a = n(60);
        n(162);
        const r = [11, 21];
        var l = i.Ember.Component.extend({
          layout: n(163),
          classNames: ["loadouts-edit-component"],
          init: function () {
            this._super(...arguments),
              this.retrieveRuneRecommenderTutorialSetting();
          },
          didUpdateAttrs: function () {
            this._super(...arguments),
              this.get("isPerkSelectionDisabled") && this.hidePerksModal();
          },
          willDestroyElement: function () {
            this._super(...arguments), this.hidePerksModal();
          },
          retrieveRuneRecommenderTutorialSetting: function () {
            return (0, s.getAccountSetting)(
              "runeRecommenderTutorialTipSeen",
            ).then((e) => {
              this.set("runeRecommenderTutorialTipSeen", e);
            });
          },
          showRuneRecommenderButton: i.Ember.computed.alias(
            "isRuneRecommenderEnabled",
          ),
          isRuneRecommenderButtonDisabled: i.Ember.computed(
            "champOrPickIntent",
            "isUILockedForGameStart",
            function () {
              return (
                !this.get("champOrPickIntent") ||
                this.get("isUILockedForGameStart")
              );
            },
          ),
          runeRecommenderButtonDisabledText: i.Ember.computed(
            "champOrPickIntent",
            function () {
              return this.get("champOrPickIntent")
                ? this.get("tra.perks_selection_disabled")
                : this.get(
                    "tra.rune_recommender_disabled_no_champion_selected",
                  );
            },
          ),
          showRuneRecommenderTutorialTooltip: i.Ember.computed(
            "isRuneRecommenderEnabled",
            "isPerkSelectionUnlocked",
            "champOrPickIntent",
            "runeRecommenderTutorialTipSeen",
            function () {
              const e = this.get("isPerkSelectionUnlocked"),
                t = this.get("isRuneRecommenderEnabled"),
                n = !!this.get("champOrPickIntent"),
                i = this.get("runeRecommenderTutorialTipSeen");
              return e && t && n && !i;
            },
          ),
          isPerkSelectionDisabled: i.Ember.computed.alias(
            "isUILockedForGameStart",
          ),
          showPerksSelectionControls: i.Ember.computed.and(
            "gameModeSupportsPerks",
            "isPerkSelectionUnlocked",
          ),
          isPerkSelectionUnlocked: i.Ember.computed(
            "localSummonerLevel",
            "unlockAllRunePageFunctionality",
            function () {
              const e = a.RUNES.minChooseRunesEnabledLevel,
                t = this.get("localSummonerLevel");
              return this.get("unlockAllRunePageFunctionality") || t >= e;
            },
          ),
          showWardSkinSelector: i.Ember.computed(
            "map.id",
            "jmxSettings.WardSkinConfig.WardSkinSelection",
            function () {
              const e = this.get(
                  "jmxSettings.WardSkinConfig.WardSkinSelection",
                ),
                t = parseInt(this.get("map.id"));
              return e && r.includes(t);
            },
          ),
          isWardSkinSelectionDisabled: i.Ember.computed(
            "isUILockedForGameStart",
            "currentSummoner.isDonePicking",
            function () {
              return (
                this.get("isUILockedForGameStart") ||
                !this.get("currentSummoner.isDonePicking")
              );
            },
          ),
          shouldShowEmoteButton: i.Ember.computed(
            "jmxSettings.LcuChampionSelect.ShowEmoteButton",
            "jmxSettings.Emotes.IsEmotePanelEnabled",
            function () {
              return (
                !!this.get("jmxSettings.LcuChampionSelect.ShowEmoteButton") &&
                !!this.get("jmxSettings.Emotes.IsEmotePanelEnabled")
              );
            },
          ),
          hidePerksModal() {
            (0, o.usePerksApi)((e) => e.hide()),
              this.isDestroyed ||
                this.isDestroying ||
                this.sendAction("showingPerksModalChanged", !1);
          },
          setRecommendedPage(e, t) {
            const [n, s] = t;
            return (0, i.DataBinding)("/lol-champ-select").patch(
              "v1/session/my-selection",
              { spell1Id: n, spell2Id: s },
            );
          },
          getRuneRecommenderContext() {
            const e =
                this.get("currentSummoner.assignedPosition") || a.POSITION_NONE,
              t = this.get("champOrPickIntent"),
              n = this.get("map.id") || 11,
              i = [
                this.get("currentSummoner.spell1Id"),
                this.get("currentSummoner.spell2Id"),
              ];
            return {
              position: e,
              champId: t,
              mapId: n,
              setRecommendedPage: this.setRecommendedPage.bind(this),
              spellIds: i,
            };
          },
          actions: {
            acknowledgeTutorialTooltip(e) {
              return (0, s.saveAccountSetting)(e, !0).then(() => {
                this.set("runeRecommenderTutorialTipSeen", !0);
              });
            },
            showPerksModal() {
              this._perksModalShownOnce ||
                ((this._perksModalShownOnce = !0),
                i.Telemetry.startTracingEvent("champ-select-runes-init"));
              const e = this.getRuneRecommenderContext();
              (0, o.usePerksApi)((t) =>
                t.edit(
                  this.get("currentPerksPage.id"),
                  !0,
                  () => this.hidePerksModal(),
                  e,
                ),
              ),
                this.sendAction("showingPerksModalChanged", !0);
            },
            showRuneRecommender: function () {
              const e = this.getRuneRecommenderContext();
              (0, o.usePerksApi)((t) =>
                t.runeRecommender(!0, () => this.hidePerksModal(), e),
              ),
                this.sendAction("showingPerksModalChanged", !0);
            },
          },
        });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "ftkcXON9",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\loadouts-edit-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\loadouts-edit-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\loadouts-edit-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","loadout-edit-controls"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showPerksSelectionControls"]]],null,4],["close-element"],["text","\\n"],["append",["helper",["summoner-spell-select"],null,[["spells","spell1","spell2","disabled","uxSettings","queue","currentSummoner","timer","showPositionAssignment","assignedPosition","perPositionRequiredSummonerSpells","perPositionDisallowedSummonerSpells","recordDidRequestSucceed"],[["get",["availableSpells"]],["get",["currentSummoner","spell1"]],["get",["currentSummoner","spell2"]],["get",["isUILockedForGameStart"]],["get",["uxSettings"]],["get",["queue"]],["get",["currentSummoner"]],["get",["timer"]],["get",["showPositionAssignment"]],["get",["currentSummoner","assignedPosition"]],["get",["perPositionRequiredSummonerSpells"]],["get",["perPositionDisallowedSummonerSpells"]],["get",["recordDidRequestSucceed"]]]]],false],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","loadoutsSpacer"],["flush-element"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["showWardSkinSelector"]]],null,2,1],["open-element","div",[]],["dynamic-attr","class",["concat",["emotes-visibility-wrapper ",["helper",["if"],[["get",["shouldShowEmoteButton"]],"visible","removed"],null]]]],["flush-element"],["text","\\n  "],["append",["helper",["emotes-edit"],null,[["isDonePicking","lockedAtEndOfChampSelect","wardSkinsAvailable"],[["get",["currentSummoner","isDonePicking"]],["get",["isUILockedForGameStart"]],["get",["showWardSkinSelector"]]]]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","lol-parties-cosmetics-picker",[]],["static-attr","type","companions"],["static-attr","set-name","default"],["static-attr","orientation","top"],["static-attr","show-none",""],["flush-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["isCompanionsEnabled"]]],null,0]],"locals":[]},{"statements":[["text","  "],["append",["helper",["ward-skin-select"],null,[["wardSkins","selectedWardSkin","disabled","isDonePicking","map","uxSettings","useLoadouts","accountLoadout","recordDidRequestSucceed"],[["get",["wardSkins"]],["get",["selectedWardSkin"]],["get",["isWardSkinSelectionDisabled"]],["get",["currentSummoner","isDonePicking"]],["get",["map"]],["get",["uxSettings"]],["get",["jmxSettings","WardSkinConfig","UseLoadouts"]],["get",["accountLoadout"]],["get",["recordDidRequestSucceed"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["rune-recommender-button"],null,[["isDisabled","disabledTooltipText","handleClick","timedTooltipText","shouldShowTimedTooltip","acknowledgeTutorialTooltip"],[["get",["isRuneRecommenderButtonDisabled"]],["get",["runeRecommenderButtonDisabledText"]],"showRuneRecommender",["get",["tra","rune_recommender_tutorial_tooltip"]],["get",["showRuneRecommenderTutorialTooltip"]],["helper",["action"],[["get",[null]],"acknowledgeTutorialTooltip","runeRecommenderTutorialTipSeen"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","loadout-edit-controls-row"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showRuneRecommenderButton"]]],null,3],["text","      "],["append",["helper",["framed-icon-button"],null,[["disabled","iconPath","clickSfxPath","hoverSfxPath","onButtonClick"],[["get",["isPerkSelectionDisabled"]],"/fe/lol-champ-select/images/config/edit-perks-button.png","/fe/lol-champ-select/sounds/sfx-uikit-edit-click.ogg","/fe/lol-champ-select/sounds/sfx-uikit-grid-hover.ogg",["helper",["action"],[["get",[null]],"showPerksModal"],null]]]],false],["text","\\n      "],["open-element","div",[]],["static-attr","class","dropdowns"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","perks-dropdowns"],["flush-element"],["text","\\n          "],["append",["helper",["perks-page-dropdown"],null,[["perksPages","perksSettings","currentPerksPage","useRuneRecommenderAutoSelect","timer","isPerkSelectionUnlocked","showPerksSelectionControls","disabled","localSummonerLevel","tutorial","jmxSettings","recordDidRequestSucceed"],[["get",["perksPages"]],["get",["perksSettings"]],["get",["currentPerksPage"]],["get",["useRuneRecommenderAutoSelect"]],["get",["timer"]],["get",["isPerkSelectionUnlocked"]],["get",["showPerksSelectionControls"]],["get",["isPerkSelectionDisabled"]],["get",["localSummonerLevel"]],["get",["perksTutorialSettings"]],["get",["jmxSettings"]],["get",["recordDidRequestSucceed"]]]]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i,
          s = n(60),
          o = (i = n(66)) && i.__esModule ? i : { default: i },
          a = n(63);
        const r = n(1),
          { DataBinding: l } = r,
          { Ember: c, EmberAddons: m } = r,
          { EmberHelpers: u } = r,
          { getProvider: p } = r,
          d = r.UiKitPlugin.getContextualNotificationManager(),
          h = r.ViewportPlugin.fullScreen().getScreenRoot(
            "rcp-fe-lol-champ-select",
          ),
          { RunMixin: g } = m.EmberLifeline,
          f = l("/lol-perks", p().getSocket());
        n(165),
          (e.exports = c.Component.extend(g, {
            layout: n(166),
            classNames: ["perks-page-dropdown-container"],
            classNameBindings: ["currentPerksPageInvalid"],
            shouldShowDropdownHighlight: !1,
            tutorialTooltipShown: !1,
            tutorial: {},
            sortedPages: c.computed(
              "perksPages.[]",
              "perksPages.@each.order",
              function () {
                const e = this.get("perksPages");
                return e ? e.sortBy("order") : null;
              },
            ),
            hasCustomPages: c.computed(
              "perksPages.@each.isPresetPage",
              function () {
                return this.get("perksPages").any(
                  (e) => !e.get("isPresetPage"),
                );
              },
            ),
            hasPages: c.computed.gte("perksPages.length", 1),
            showPresetPages: c.computed(
              "perksSettings.showPresetPages",
              "hasCustomPages",
              function () {
                const e = this.get("perksSettings.showPresetPages");
                return !this.get("hasCustomPages") || (null !== e && !1 !== e);
              },
            ),
            init: function () {
              this._super(...arguments),
                this.set("_screenRootHideHandler", () => {
                  this.get("tutorialTooltipNotification") &&
                    d.remove(this.get("tutorialTooltipNotification")),
                    this.set("tutorialTooltipShown", !1),
                    this.set("shouldShowDropdownHighlight", !1),
                    this.dropdownHighlightTimer &&
                      this.cancelTask(this.dropdownHighlightTimer);
                }),
                h.on("hide", this.get("_screenRootHideHandler"));
            },
            willDestroyElement: function () {
              this._super(...arguments),
                h.off("hide", this.get("_screenRootHideHandler"));
            },
            runesTutorialSeenCount: c.computed(
              "tutorial.data.championSelectRunesTooltipSeenCount",
              function () {
                return (
                  this.get(
                    "tutorial.data.championSelectRunesTooltipSeenCount",
                  ) || 0
                );
              },
            ),
            tutorialTooltip: c.computed(
              "runesTutorialSeenCount",
              "localSummonerLevel",
              function () {
                return this.get("runesTutorialSeenCount") >=
                  s.RUNES.maxTutorialHighlightSeenCount
                  ? null
                  : this.get("localSummonerLevel") ===
                      s.RUNES.minChooseRunesEnabledLevel
                    ? "runes_newly_unlocked_tooltip"
                    : "runes_existing_player_tutorial_tooltip";
              },
            ),
            setTooltipSeenCount: function (e) {
              c.$.ajax({
                url: "/lol-settings/v1/account/lol-tutorial",
                data: JSON.stringify({
                  data: { championSelectRunesTooltipSeenCount: e },
                  schemaVersion: 1,
                }),
                contentType: "application/json",
                type: "PATCH",
              });
            },
            displayRuneSwapNotification: function () {
              if (this.isDestroying || this.isDestroyed) return;
              const e = r.UiKitPlugin.getTemplateHelper();
              (0, a.usePerksApi)((t) => {
                const n = t.getRuneSwapAndNotifyString(),
                  i = e.contentBlockNotification(
                    n,
                    "champ-select-runes-tutorial-tooltip",
                  ),
                  s = d.add(i, {
                    target: {
                      domNode: this.element,
                      anchor: { x: "center", y: "top" },
                    },
                    orientation: "top",
                    anchor: { x: "center", y: "bottom" },
                    offset: { y: -18 },
                    dismissOnTargetHide: !0,
                  });
                s.onRemove.then(() => {
                  this.set("runeSwapNotification", null),
                    f.post("/v1/show-auto-modified-pages-notification", {});
                }),
                  this.set("runeSwapNotification", s);
              });
            },
            displayTutorialTooltipNotification: function (e) {
              if (
                this.isDestroying ||
                this.isDestroyed ||
                !this.element.offsetWidth
              )
                return;
              const t =
                  r.UiKitPlugin.getTemplateHelper().contentBlockNotification(
                    this.get("tra." + e),
                    "champ-select-runes-tutorial-tooltip",
                  ),
                n = d.add(t, {
                  target: {
                    domNode: this.element,
                    anchor: { x: "center", y: "top" },
                  },
                  orientation: "top",
                  anchor: { x: "center", y: "bottom" },
                  offset: { y: -18 },
                });
              this.set("tutorialTooltipNotification", n),
                n.onCloseButtonClick.then(() => {
                  this.set("shouldShowDropdownHighlight", !1),
                    this.setTooltipSeenCount(
                      this.get("runesTutorialSeenCount") +
                        s.RUNES.tutorialHighlightActionSeenCountIncrement,
                    );
                }),
                n.onRemove.then(() => {
                  this.set("tutorialTooltipNotification", null);
                });
            },
            shouldShowPerksTutorial: c.computed(
              "jmxSettings.Perks.TutorialPopupsEnabled",
              "runesTutorialSeenCount",
              function () {
                const e = this.get("jmxSettings.Perks.TutorialPopupsEnabled"),
                  t = this.get("runesTutorialSeenCount");
                return (null == e || e) && 0 === t;
              },
            ),
            restrictedPageNamesEnabled: c.computed.alias(
              "jmxSettings.Perks.RestrictedPageNamesEnabled",
            ),
            pageRenamingDisabled: c.computed.alias(
              "jmxSettings.Perks.PageRenamingDisabled",
            ),
            checkShouldShowNotifications: u.observer(
              "timer.inBanPickPhase",
              "timer.inFinalizationPhase",
              function () {
                if (
                  this.get("showPerksSelectionControls") &&
                  (this.get("timer.inBanPickPhase") ||
                    this.get("timer.inFinalizationPhase"))
                ) {
                  l("/lol-perks")
                    .get("/v1/show-auto-modified-pages-notification")
                    .then((e) => {
                      e &&
                        this.runTask(() => {
                          this.displayRuneSwapNotification();
                        }, 1e3);
                    });
                  const e = this.get("tutorialTooltip");
                  if (!this.get("tutorialTooltipShown") && e) {
                    this.set("tutorialTooltipShown", !0);
                    const t = this.get("runesTutorialSeenCount"),
                      n = this.get("shouldShowPerksTutorial");
                    (this.dropdownHighlightTimer = this.runTask(() => {
                      0 === this.$("lol-uikit-framed-dropdown.active").length &&
                        (this.set("shouldShowDropdownHighlight", !0),
                        n && this.displayTutorialTooltipNotification(e));
                    }, s.RUNES.tutorialHighlightDelay)),
                      this.setTooltipSeenCount(t + 1);
                  }
                }
              },
            ),
            selectedPageId: c.computed(
              "currentPerksPage.id",
              "useRuneRecommenderAutoSelect",
              function () {
                return this.get("useRuneRecommenderAutoSelect")
                  ? 1
                  : this.get("currentPerksPage.id");
              },
            ),
            currentPerksPageInvalid: c.computed.not("currentPerksPage.isValid"),
            haveRuneRecommenderPage: c.computed(
              "perksPages.@each.isTemporary",
              function () {
                return !!(this.get("perksPages") || []).find(
                  (e) => e.isTemporary,
                );
              },
            ),
            actions: {
              dropdownClicked: function () {
                this.get("shouldShowDropdownHighlight") &&
                  (this.set("shouldShowDropdownHighlight", !1),
                  this.setTooltipSeenCount(
                    this.get("runesTutorialSeenCount") +
                      s.RUNES.tutorialHighlightActionSeenCountIncrement,
                  )),
                  this.get("runeSwapNotification") &&
                    d.remove(this.get("runeSwapNotification")),
                  this.get("tutorialTooltipNotification") &&
                    d.remove(this.get("tutorialTooltipNotification"));
              },
              setRuneRecommenderAutoSelect: function () {
                return l("/lol-perks").post("/v1/rune-recommender-auto-select");
              },
              selectPage: function (e) {
                o.default
                  .ajax({
                    url: "/lol-perks/v1/currentpage",
                    contentType: "application/json",
                    data: JSON.stringify(e.get("id")),
                    dataType: "text",
                    method: "PUT",
                    errorMessage: "error_could_not_set_perks_page",
                  })
                  .then(() => {
                    this.recordDidRequestSucceed &&
                      this.recordDidRequestSucceed(!0);
                  })
                  .catch((e) => {
                    this.recordDidRequestSucceed &&
                      this.recordDidRequestSucceed(!1, e),
                      this.isDestroying ||
                        this.isDestroyed ||
                        (this.set("setSelectedError", !0),
                        this.set("parentComponent.requestInProgress", !0));
                  });
              },
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "XKYvjieU",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\perks-page-dropdown-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\perks-page-dropdown-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\perks-page-dropdown-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-framed-dropdown",[]],["static-attr","stylablecontent",""],["static-attr","direction","upward"],["dynamic-attr","disabled",["unknown",["disabled"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"dropdownClicked"],null],null],["static-attr","class","perks-page-dropdown"],["flush-element"],["text","\\n"],["block",["unless"],[["get",["haveRuneRecommenderPage"]]],null,2],["text","  \\n"],["block",["each"],[["get",["sortedPages"]]],[["key"],["id"]],1],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["shouldShowDropdownHighlight"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","framed-highlight-overlay"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","framed-highlight-overlay-shadow"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","framed-highlight-overlay-border"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","framed-highlight-overlay-background"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["perks-page-dropdown-option"],null,[["showPresetPages","page","currentPageId","index","restrictedPageNamesEnabled","pageRenamingDisabled","click"],[["get",["showPresetPages"]],["get",["page"]],["get",["selectedPageId"]],["get",["index"]],["get",["restrictedPageNamesEnabled"]],["get",["pageRenamingDisabled"]],["helper",["action"],[["get",[null]],"selectPage",["get",["page"]]],null]]]],false],["text","\\n"]],"locals":["page","index"]},{"statements":[["text","    "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"setRuneRecommenderAutoSelect"],null],null],["dynamic-attr","selected",["unknown",["useRuneRecommenderAutoSelect"]],null],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","perks-page-dropdown-option-content"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","rune_recommender_auto_select_option"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        const i = n(1),
          { Ember: s } = i;
        n(168);
        e.exports = s.Component.extend({
          layout: n(169),
          tagName: "lol-uikit-dropdown-option",
          classNames: ["perks-page-dropdown-option"],
          attributeBindings: ["isSelected:selected", "tagName:slot"],
          classNameBindings: ["isHidden:removed"],
          currentPageId: -1,
          tooltipConfig: {
            targetAnchor: { x: "right", y: "center" },
            tooltipAnchor: { x: "left", y: "center" },
            showDelay: 175,
          },
          index: 0,
          restrictedPageNamesEnabled: !1,
          pageRenamingDisabled: !1,
          isCustomPage: s.computed.alias("page.isEditable"),
          defaultCustomPageName: s.computed("tra", "index", function () {
            return this.get("tra").formatString(
              "runes_default_custom_page_name",
              { count: this.get("index") + 1 },
            );
          }),
          pageName: s.computed(
            "restrictedPageNamesEnabled",
            "pageRenamingDisabled",
            "isCustomPage",
            "defaultCustomPageName",
            "page.name",
            function () {
              return this.get("restrictedPageNamesEnabled") &&
                this.get("pageRenamingDisabled") &&
                this.get("isCustomPage")
                ? this.get("defaultCustomPageName")
                : this.get("page.name");
            },
          ),
          isSelected: s.computed("page.id", "currentPageId", function () {
            const e = this.get("page.id"),
              t = this.get("currentPageId");
            return t > 0 && e === t ? "true" : null;
          }),
          isHidden: s.computed(
            "showPresetPages",
            "isSelected",
            "page.isPresetPage",
            function () {
              const e = this.get("showPresetPages"),
                t = this.get("isSelected"),
                n = this.get("page.isPresetPage");
              return !t && n && !e;
            },
          ),
          iconClassName: s.computed(
            "page.isValid",
            "page.isTemporary",
            "page.autoModifiedSelections.length",
            function () {
              return this.get("page.isValid")
                ? this.get("page.isTemporary")
                  ? "recommended-page"
                  : this.get("page.autoModifiedSelections.length")
                    ? "modified"
                    : "removed"
                : "invalid";
            },
          ),
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "iQPf98y4",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\perks-page-dropdown-option-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\perks-page-dropdown-option-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\perks-page-dropdown-option-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","perks-page-dropdown-option-content"],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["perks-page-dropdown-option-icon ",["unknown",["iconClassName"]]]]],["flush-element"],["text","\\n    "],["open-element","lol-perks-glowing-dot",[]],["static-attr","class","perks-page-dropdown-option-dot"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","perks-page-name"],["flush-element"],["text","\\n    "],["append",["unknown",["pageName"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipConfig"],[["get",["tooltipConfig"]]]],0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["perk-page-tooltip"],null,[["page"],[["get",["page"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i,
          s = (i = n(58)) && i.__esModule ? i : { default: i };
        n(171);
        const o = n(1),
          { Ember: a, EmberAddons: r } = o,
          { DomMixin: l } = r.EmberLifeline;
        e.exports = a.Component.extend(l, {
          classNames: ["phase-transition"],
          classNameBindings: ["visible:visible:removed"],
          layout: n(172),
          phaseTransitionLabel: a.computed(
            "ceremonyStringSuffix",
            "tra.phase_transition_finalization",
            "tra.phase_transition_one_ban_phase",
            "tra.phase_transition_one_pick_phase",
            "tra.phase_transition_one_vote_phase",
            "tra.phase_transition_ban_1",
            "tra.phase_transition_ban_2",
            "tra.phase_transition_pick_1",
            "tra.phase_transition_pick_2",
            function () {
              const e = `tra.phase_transition_${this.get(
                "ceremonyStringSuffix",
              )}`;
              return this.get(e);
            },
          ),
          ceremonyStringSuffix: a.computed(
            "phaseTransitionStringsByActionId",
            "activeAction.id",
            function () {
              const e = this.get("phaseTransitionStringsByActionId");
              return e ? e[this.get("activeAction.id")] : "";
            },
          ),
          playPhaseTransitionTextAudio: function (e) {
            "scaleDownTextIntro" === e.animationName &&
              s.default.playSound(
                "sfx-notifications",
                "/fe/lol-champ-select/sounds/sfx-cs-draft-10ban-team-bans-locked.ogg",
              );
          },
          didInsertElement: function () {
            this._super(...arguments),
              this.addEventListener(
                this.element,
                "animationstart",
                this.playPhaseTransitionTextAudio,
              );
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "EZQftzzS",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\phase-transition-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\phase-transition-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\phase-transition-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","phase-transition-label"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","phase-transition-text"],["flush-element"],["text","\\n    "],["append",["unknown",["phaseTransitionLabel"]],false],["text","\\n    "],["open-element","div",[]],["static-attr","class","phase-transition-text-glow"],["flush-element"],["text","\\n      "],["append",["unknown",["phaseTransitionLabel"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i,
          s = (i = n(58)) && i.__esModule ? i : { default: i },
          o = n(129),
          a = n(60);
        n(174);
        const r = n(1),
          { Ember: l, EmberAddons: c } = r,
          { EmberHelpers: m } = r,
          { RunMixin: u } = c.EmberLifeline;
        e.exports = l.Component.extend(u, {
          classNames: ["pick-ban-ring"],
          classNameBindings: [
            "champSelectScreen",
            "isInit:is-init:is-waiting",
            "isAnimating:is-animating:is-pending",
            "isTeamBan:is-player-team:is-enemy-team",
            "shouldShowExpandedRing:expanded-ring",
            "largeAreaAnimationsEnabled:large-area-animations-enabled:large-area-animations-disabled",
          ],
          layout: n(175),
          isAnimating: l.computed.equal(
            "banSlashAnimationState",
            o.ANIMATION_STATES.STARTED,
          ),
          banSlashAnimating: !1,
          isInit: !1,
          isTeamBan: l.computed.alias(
            "sessionActions.lastCompletedBanAction.actor.isOnLeftSide",
          ),
          slashRotationDegrees: 0,
          animationDispatcher: l.inject.service("animation-dispatcher"),
          banSlashAnimationState: l.computed.alias(
            "animationDispatcher.states.banSlashAnimation",
          ),
          banRotationAnimationState: l.computed.alias(
            "animationDispatcher.states.banRotationAnimation",
          ),
          largeAreaAnimationsEnabled: l.computed.equal(
            "uxSettings.largeAreaAnimationsEnabled",
            !0,
          ),
          isShowingSelectedScreen: l.computed.equal(
            "champSelectScreen",
            a.SCREENS.selected,
          ),
          listenForStateMachineState: m.observer(
            "largeAreaAnimationsEnabled",
            l.on("didInsertElement", function () {
              if (
                this.get("largeAreaAnimationsEnabled") &&
                !this.slashStateMachineListenerAttached
              ) {
                const e = this.element.querySelector(
                  ".ban-slash-state-machine",
                );
                e &&
                  e.subscribeParameterChanged &&
                  ((this.handleStateMachineAttributeChange = function (
                    e,
                    t,
                    n,
                  ) {
                    "state" !== e ||
                      "done" !== n ||
                      !this.get("banSlashAnimating") ||
                      this.isDestroying ||
                      this.isDestroyed ||
                      this.banAnimationComplete();
                  }.bind(this)),
                  (this.slashStateMachineListenerAttached = !0),
                  e.subscribeParameterChanged(
                    this.handleStateMachineAttributeChange,
                  ));
              }
            }),
          ),
          activeActionType: l.computed.alias("activeAction.type"),
          activeActionTypeChanged: m.observeChange(
            "activeActionType",
            function (e) {
              const t = this.get("sessionActions.banActions.firstObject");
              this.get("activeAction.id") === (t && t.get("id"))
                ? (this.get("isSimultaneousBans") ||
                    s.default.playSound(
                      "sfx-ui",
                      "/fe/lol-champ-select/sounds/sfx-cs-draft-ban-ring-intro.ogg",
                    ),
                  this.runTask(function () {
                    this.set("isInit", !0);
                  }, 400))
                : void 0 === e
                  ? this.set("isInit", !1)
                  : "pick" === e && this.set("isInit", !0);
            },
          ),
          actionsToPointTo: l.computed(
            "allPlayersActTogether",
            "activeAction.actor.isSelf",
            "activeAction",
            "activeActions.[]",
            function () {
              return this.get("allPlayersActTogether")
                ? this.get("activeAction.actor.isSelf")
                  ? l.A([this.get("activeAction")])
                  : l.A()
                : this.get("activeActions");
            },
          ),
          hideCurrentActionPointer: m.computedGate(
            "activeAction.actor.isSelf",
            "isPlayingCeremony",
            "allPlayersActTogether",
            function () {
              return (
                (this.get("allPlayersActTogether") &&
                  !this.get("activeAction.actor.isSelf")) ||
                this.get("isPlayingCeremony")
              );
            },
          ),
          hideNextActionPointer: m.computedGate(
            "allPlayersActTogether",
            "isPlayingCeremony",
            function () {
              return (
                this.get("allPlayersActTogether") ||
                this.get("isPlayingCeremony")
              );
            },
          ),
          playBanSlashAnimation: m.observeChange(
            "banSlashAnimationState",
            function () {
              this.get("banSlashAnimationState") === o.ANIMATION_STATES.STARTED
                ? this.runTask(function () {
                    this.set("banSlashAnimating", !0);
                  }, 400)
                : (this.set("banSlashAnimating", !1),
                  this.set("slashRotationDegrees", 0));
            },
          ),
          banAnimationComplete: function () {
            this.get("animationDispatcher").stopAnimation("banSlashAnimation");
          },
          slashRingRotation: l.computed("slashRotationDegrees", function () {
            return (
              "transform: rotate(" + this.get("slashRotationDegrees") + "deg);"
            );
          }),
          startRotationAnimation: m.observeChange(
            "banRotationAnimationState",
            function () {
              this.get("banRotationAnimationState") ===
                o.ANIMATION_STATES.STARTED &&
                this.setRotation("slashRotationDegrees");
            },
          ),
          setRotation: function (e) {
            let t = this.get(e);
            (t += this.get("isTeamBan") ? 45 : -45), this.set(e, t);
          },
          animatedActiveActions: m.delayed("actionsToPointTo", 800),
          animatedNextActions: m.delayed("nextActions", 800),
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "g0c5jKOz",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\pick-ban-ring-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\pick-ban-ring-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\pick-ban-ring-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","ring-inner-mask"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ring-inner-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","ring-gear-component-container"],["flush-element"],["text","\\n      "],["append",["helper",["ring-gear"],null,[["lastCompletedBanAction","activeAction","shouldShowExpandedRing","uxSettings"],[["get",["sessionActions","lastCompletedBanAction"]],["get",["animatedActiveAction"]],["get",["shouldShowExpandedRing"]],["get",["uxSettings"]]]]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","style",["unknown",["slashRingRotation"]],null],["dynamic-attr","class",["concat",["ban-slash-wrapper ",["helper",["if"],[["get",["isShowingSelectedScreen"]],"removed"],null]]]],["flush-element"],["text","\\n      "],["open-element","uikit-state-machine",[]],["static-attr","class","ban-slash-state-machine"],["static-attr","state","unloaded"],["dynamic-attr","animation-team",["helper",["if"],[["get",["isTeamBan"]],"player-team","enemy-team"],null],null],["dynamic-attr","is-visible",["helper",["if"],[["get",["banSlashAnimating"]],"visible","hidden"],null],null],["dynamic-attr","style",["unknown",["slashRingRotation"]],null],["flush-element"],["text","\\n        "],["open-element","uikit-states",[]],["flush-element"],["text","\\n          "],["open-element","uikit-state",[]],["static-attr","name","unloaded"],["flush-element"],["text","\\n            "],["open-element","uikit-behavior-media",[]],["static-attr","selector",".slash-video.red"],["static-attr","preloading",""],["flush-element"],["close-element"],["text","\\n            "],["open-element","uikit-behavior-media",[]],["static-attr","selector",".slash-video.blue"],["static-attr","preloading",""],["flush-element"],["close-element"],["text","\\n\\n            "],["open-element","uikit-transition",[]],["static-attr","next-state","blue-ban-video"],["flush-element"],["text","\\n              "],["open-element","uikit-condition-media",[]],["static-attr","selector",".blue-ban-video"],["static-attr","can-play",""],["flush-element"],["close-element"],["text","\\n              "],["open-element","uikit-condition-parameter",[]],["static-attr","name","is-visible"],["static-attr","value","visible"],["flush-element"],["close-element"],["text","\\n              "],["open-element","uikit-condition-parameter",[]],["static-attr","name","animation-team"],["static-attr","value","player-team"],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n\\n            "],["open-element","uikit-transition",[]],["static-attr","next-state","red-ban-video"],["flush-element"],["text","\\n              "],["open-element","uikit-condition-media",[]],["static-attr","selector",".red-ban-video"],["static-attr","can-play",""],["flush-element"],["close-element"],["text","\\n              "],["open-element","uikit-condition-parameter",[]],["static-attr","name","is-visible"],["static-attr","value","visible"],["flush-element"],["close-element"],["text","\\n              "],["open-element","uikit-condition-parameter",[]],["static-attr","name","animation-team"],["static-attr","value","enemy-team"],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n\\n          "],["open-element","uikit-state",[]],["static-attr","name","blue-ban-video"],["flush-element"],["text","\\n            "],["open-element","uikit-behavior-media",[]],["static-attr","selector",".blue-ban-video"],["static-attr","playing",""],["flush-element"],["close-element"],["text","\\n\\n            "],["open-element","uikit-transition",[]],["static-attr","next-state","done"],["flush-element"],["text","\\n              "],["open-element","uikit-condition-media",[]],["static-attr","selector",".blue-ban-video"],["static-attr","ended",""],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n\\n            "],["open-element","uikit-transition",[]],["static-attr","next-state","unloaded"],["flush-element"],["text","\\n              "],["open-element","uikit-condition-parameter",[]],["static-attr","name","is-visible"],["static-attr","value","hidden"],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n\\n          "],["open-element","uikit-state",[]],["static-attr","name","red-ban-video"],["flush-element"],["text","\\n            "],["open-element","uikit-behavior-media",[]],["static-attr","selector",".red-ban-video"],["static-attr","playing",""],["flush-element"],["close-element"],["text","\\n\\n            "],["open-element","uikit-transition",[]],["static-attr","next-state","done"],["flush-element"],["text","\\n              "],["open-element","uikit-condition-media",[]],["static-attr","selector",".red-ban-video"],["static-attr","ended",""],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n\\n            "],["open-element","uikit-transition",[]],["static-attr","next-state","unloaded"],["flush-element"],["text","\\n              "],["open-element","uikit-condition-parameter",[]],["static-attr","name","is-visible"],["static-attr","value","hidden"],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n\\n          "],["open-element","uikit-state",[]],["static-attr","name","done"],["flush-element"],["text","\\n            "],["open-element","uikit-transition",[]],["static-attr","next-state","unloaded"],["flush-element"],["text","\\n              "],["open-element","uikit-condition-parameter",[]],["static-attr","name","is-visible"],["static-attr","value","hidden"],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n\\n        "],["open-element","user-experience-perf-switch",[]],["static-attr","class","blue-ban-video"],["static-attr","visible-state","blue-ban-video"],["static-attr","default-visibility","hidden"],["flush-element"],["text","\\n          "],["open-element","uikit-video",[]],["static-attr","src","/fe/lol-champ-select/video/champion-ring/ban-circle-slash-blue.webm"],["static-attr","cache-name","rcp-fe-lol-champ-select"],["static-attr","class","slash-video blue"],["static-attr","perf-flags","largeAreaAnimationsEnabled"],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","hidden"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","user-experience-perf-switch",[]],["static-attr","visible-state","red-ban-video"],["static-attr","default-visibility","hidden"],["static-attr","class","red-ban-video"],["flush-element"],["text","\\n          "],["open-element","uikit-video",[]],["static-attr","src","/fe/lol-champ-select/video/champion-ring/ban-circle-slash-red.webm"],["static-attr","cache-name","rcp-fe-lol-champ-select"],["static-attr","class","slash-video red"],["static-attr","perf-flags","largeAreaAnimationsEnabled"],["flush-element"],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","hidden"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(60);
        n(177);
        const s = n(1),
          { Ember: o, EmberAddons: a } = s,
          { EmberHelpers: r } = s,
          { RunMixin: l } = a.EmberLifeline,
          c = "/fe/lol-champ-select/sounds";
        e.exports = o.Component.extend(l, {
          classNames: ["pick-phase"],
          classNameBindings: [
            "shouldShow:pick-phase-visible:pick-phase-hidden",
            "shouldShowGrid:champion-grid-visible:champion-grid-hidden",
          ],
          layout: n(178),
          gridRequested: void 0,
          shouldShowExpandedRing: o.computed.or(
            "shouldShowGrid",
            "shouldShowBanShowcase",
            "isPlayingCeremony",
            "showVoteShowcase",
          ),
          myTeamSize: o.computed.readOnly("myTeam.length"),
          theirTeamSize: o.computed.readOnly("theirTeam.length"),
          isRGM: o.computed.alias("map.isRGM"),
          largeAreaAnimationsEnabled: o.computed.equal(
            "uxSettings.largeAreaAnimationsEnabled",
            !0,
          ),
          selectedChampSplash: o.computed(
            "sessionActions.activeAction.champion",
            "sessionActions.activeAction.champion.skins.firstObject.splashPath",
            function () {
              const e = this.get("sessionActions.activeAction.champion");
              return e ? e.get("skins.firstObject.splashPath") : null;
            },
          ),
          inSelectedScreen: o.computed.equal(
            "champSelectScreen",
            i.SCREENS.selected,
          ),
          notInSelectedScreen: o.computed.not("inSelectedScreen"),
          lastActionNotVote: o.computed.not(
            "sessionActions.lastCompletedAction.isVote",
          ),
          shouldShowLockedName: o.computed.and(
            "actionWasJustCompleted",
            "notShowingGrid",
            "notInSelectedScreen",
            "notShowingBanShowcase",
            "lastActionNotVote",
          ),
          shouldShowLockedSplash: o.computed.and(
            "shouldShowLockedName",
            "sessionActions.lastCompletedAction.isPick",
          ),
          lockedInSplash: o.computed(
            "shouldShowLockedSplash",
            "sessionActions.lastCompletedAction.champion.skins.firstObject.splashPath",
            function () {
              return this.get("shouldShowLockedSplash")
                ? this.get(
                    "sessionActions.lastCompletedAction.champion.skins.firstObject.splashPath",
                  )
                : null;
            },
          ),
          currentBackground: o.computed(
            "selectedChampSplash",
            "lockedInSplash",
            "shouldShowSplashBackground",
            "summoner.isPickingNow",
            function () {
              if (this.get("shouldShowSplashBackground")) {
                const e = this.get("lockedInSplash");
                if (e) return e;
                if (this.get("summoner.isPickingNow")) {
                  const e = this.get("selectedChampSplash");
                  if (e) return e;
                }
              }
              return null;
            },
          ),
          shouldShowSplashBackground: o.computed(
            "largeAreaAnimationsEnabled",
            "summoner.isActingNow",
            "notShowingGrid",
            "shouldShowBanShowcase",
            function () {
              return (
                (!this.get("shouldShowBanShowcase") ||
                  this.get("summoner.isActingNow")) &&
                (this.get("largeAreaAnimationsEnabled") ||
                  this.get("notShowingGrid"))
              );
            },
          ),
          shouldShowChampionName: o.computed(
            "shouldShowLockedSplash",
            "notShowingGrid",
            "sessionActions.lastCompletedAction.isBan",
            "shouldShowBanShowcase",
            function () {
              return (
                this.get("shouldShowLockedSplash") ||
                (this.get("notShowingGrid") &&
                  this.get("sessionActions.lastCompletedAction.isBan") &&
                  !this.get("shouldShowBanShowcase"))
              );
            },
          ),
          shouldShowGrid: o.computed(
            "shouldShow",
            "summoner.isActingNow",
            "sessionActions.isSimultaneousBans",
            "isPlayingCeremony",
            "waitingForBanAnimation",
            "gridRequested",
            "timer.inPlanningPhase",
            "timer.inFinalizationPhase",
            function () {
              const e = !this.get("timer.inFinalizationPhase");
              if (!this.get("shouldShow") && e) return !0;
              const t = this.get("summoner.isActingNow"),
                n = this.get("sessionActions.isSimultaneousBans"),
                i = this.get("isPlayingCeremony"),
                s = this.get("waitingForBanAnimation"),
                o = this.get("gridRequested"),
                a = this.get("timer.inPlanningPhase");
              return (
                (t && !i && !s) || (t && n) || (!1 !== o && a) || (!!o && e)
              );
            },
          ),
          notShowingGrid: o.computed.not("shouldShowGrid"),
          shouldShowBanShowcase: o.computed.equal(
            "champSelectScreen",
            i.SCREENS.banShowcase,
          ),
          notShowingBanShowcase: o.computed.not("shouldShowBanShowcase"),
          shouldShowPhaseTransition: o.computed(
            "sessionActions.activeAction.isPhaseTransition",
            "waitingForBanAnimation",
            "waitingForPickAnimation",
            "champSelectScreen",
            function () {
              return (
                this.get("sessionActions.activeAction.isPhaseTransition") &&
                !this.get("waitingForBanAnimation") &&
                !this.get("waitingForPickAnimation") &&
                (this.get("champSelectScreen") !== i.SCREENS.selected ||
                  this.get("sessionActions.activeAction.isVoteTransition"))
              );
            },
          ),
          dispatchLockinEvent: r.observeChange(
            "shouldShowLockedSplash",
            function () {
              const e = this.get("shouldShowLockedSplash")
                ? this.get(
                    "sessionActions.lastCompletedAction.actor.isOnLeftSide",
                  )
                  ? "left"
                  : "right"
                : null;
              this.get("updatePickJustLockedIn")(e);
            },
          ),
          dispatchGridEvent: r.observeChange("shouldShowGrid", function () {
            this.get("updateIsShowingGrid")(this.get("shouldShowGrid"));
          }),
          shouldShowLockIn: r.computedGate.immediate(
            "summoner.isActingNow",
            "shouldShowGrid",
            function () {
              return (
                this.get("summoner.isActingNow") && this.get("shouldShowGrid")
              );
            },
          ),
          notShowingLockIn: o.computed.not("shouldShowLockIn"),
          isNotSpectating: o.computed.not("isSpectating"),
          shouldShowFooter: o.computed.and(
            "shouldShowGrid",
            "notShowingLockIn",
            "isNotSpectating",
          ),
          shouldShow: r.computedGate.immediate(
            "champSelectScreen",
            "timer.inFinalizationPhase",
            function () {
              const e = this.get("champSelectScreen");
              return (
                e === i.SCREENS.pick ||
                e === i.SCREENS.banShowcase ||
                (e === i.SCREENS.selected &&
                  !this.get("timer.inFinalizationPhase"))
              );
            },
          ),
          gridIsToggleable: o.computed(
            "summoner.isActingNow",
            "timer.inFinalizationPhase",
            "isPlayingCeremony",
            "isNotSpectating",
            "transitioningToSelectedScreen",
            "showVoteShowcase",
            function () {
              return (
                !this.get("summoner.isActingNow") &&
                !this.get("timer.inFinalizationPhase") &&
                !this.get("isPlayingCeremony") &&
                this.get("isNotSpectating") &&
                !this.get("transitioningToSelectedScreen") &&
                !this.get("showVoteShowcase")
              );
            },
          ),
          setPropertiesForMediaFader: r.observeMultiChange(
            "shouldShow",
            "activeAction.champion",
            "activeAction.champion.skins.firstObject.splashPath",
            "currentBackground",
            "shouldShowGrid",
            "shouldShowPhaseTransition",
            "showVoteShowcase",
            function () {
              this.get("shouldShow") &&
                (this.set("splashPath", this.get("currentBackground")),
                this.set("splashUnlocked", !0),
                this.set(
                  "splashDefocus",
                  this.get("shouldShowGrid") ||
                    this.get("shouldShowPhaseTransition") ||
                    this.get("showVoteShowcase"),
                ));
            },
          ),
          untoggleGridOnBanPick: o.observer("timer.phase", function () {
            this.runTask(function () {
              const e = this.get("previousPhase"),
                t = this.get("timer.phase");
              t !== e && this.set("gridRequested", void 0),
                this.set("previousPhase", t);
            }, 1);
          }),
          untoggleGridOnCeremony: o.observer("isPlayingCeremony", function () {
            this.get("isPlayingCeremony") && this.set("gridRequested", void 0);
          }),
          gridToggleClickSfx: o.computed("shouldShowGrid", function () {
            return this.get("shouldShowGrid")
              ? `${c}/sfx-cs-champgrid-button-close.ogg`
              : `${c}/sfx-cs-champgrid-button-open.ogg`;
          }),
          onActiveActionChanged: r.observeMultiChange(
            "sessionActions.activeAction",
            function (e, t) {
              if ("sessionActions.activeAction" in e) {
                const e = t ? t["sessionActions.activeAction"] : void 0;
                this.untoggleGridAfterActing(e);
              }
            },
          ),
          untoggleGridAfterActing: function (e) {
            e &&
              e.get("actor.isSelf") &&
              e.get("completed") &&
              this.set("gridRequested", void 0);
          },
          actions: {
            toggleGrid: function () {
              const e = !this.get("shouldShowGrid");
              this.set("gridRequested", e);
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "r47WHlor",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\pick-phase-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\pick-phase-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\pick-phase-component\\\\index.js\\" "],["text","\\n\\n"],["append",["helper",["pick-ban-ring"],null,[["sessionActions","activeActions","activeAction","nextActions","allActions","currentActions","isSimultaneousBans","champSelectScreen","shouldShowExpandedRing","isPlayingCeremony","allPlayersActTogether","isShowingBanShowcase","uxSettings","myTeamSize","theirTeamSize"],[["get",["sessionActions"]],["get",["sessionActions","activeActions"]],["get",["sessionActions","activeAction"]],["get",["sessionActions","nextActions"]],["get",["sessionActions","allActions"]],["get",["sessionActions","currentActions"]],["get",["sessionActions","isSimultaneousBans"]],["get",["champSelectScreen"]],["get",["shouldShowExpandedRing"]],["get",["isPlayingCeremony"]],["get",["sessionActions","allPlayersActTogether"]],["get",["shouldShowBanShowcase"]],["get",["uxSettings"]],["get",["myTeamSize"]],["get",["theirTeamSize"]]]]],false],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["ban-showcase-visibility-wrapper ",["helper",["if"],[["get",["shouldShowGrid"]],"hidden","visible"],null]]]],["flush-element"],["text","\\n  "],["append",["helper",["ban-showcase"],null,[["visible","myTeamBans","theirTeamBans","isSimultaneousBans"],[["get",["shouldShowBanShowcase"]],["get",["sessionActions","myTeamBanActions"]],["get",["sessionActions","theirTeamBanActions"]],["get",["sessionActions","isSimultaneousBans"]]]]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["phase-transition-visibility-wrapper ",["helper",["if"],[["get",["shouldShowGrid"]],"hidden","visible"],null]]]],["flush-element"],["text","\\n  "],["append",["helper",["phase-transition"],null,[["visible","activeAction","nextActions","phaseTransitionStringsByActionId","allActions"],[["get",["shouldShowPhaseTransition"]],["get",["sessionActions","activeAction"]],["get",["sessionActions","nextActions"]],["get",["sessionActions","phaseTransitionStringsByActionId"]],["get",["sessionActions","allActions"]]]]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["append",["helper",["champion-grid"],null,[["requestInProgress","summoner","isRGM","visible","gridRequested","uxSettings","jmxSettings","shouldShowChestFilter","isRandomChampionEnabled","randomChampionRateLimitConfig","recordDidRequestSucceed","UseNewLoyaltyIcon"],[["get",["requestInProgress"]],["get",["summoner"]],["get",["isRGM"]],["get",["shouldShowGrid"]],["get",["gridRequested"]],["get",["uxSettings"]],["get",["jmxSettings"]],["get",["shouldShowChestFilter"]],["get",["isRandomChampionEnabled"]],["get",["randomChampionRateLimitConfig"]],["get",["recordDidRequestSucceed"]],["get",["UseNewLoyaltyIcon"]]]]],false],["text","\\n"],["append",["helper",["lock-in-button"],null,[["requestInProgress","summoner","visible","gameId"],[["get",["requestInProgress"]],["get",["summoner"]],["get",["shouldShowLockIn"]],["get",["gameId"]]]]],false],["text","\\n"],["block",["if"],[["get",["shouldShowFooter"]]],null,0],["open-element","div",[]],["dynamic-attr","class",["concat",["champion-name-wrapper ",["helper",["if"],[["get",["shouldShowLockedName"]],"visible","hidden"],null]," ",["helper",["if"],[["get",["shouldShowLockedName"]],"just-locked"],null]]]],["flush-element"],["text","\\n    "],["append",["helper",["skin-name"],null,[["skin"],[["get",["sessionActions","lastCompletedAction","champion","baseSkin"]]]]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","class",["concat",["champion-grid-toggle ",["helper",["unless"],[["get",["gridIsToggleable"]],"hidden"],null]]]],["dynamic-attr","click-sfx-src",["concat",[["unknown",["gridToggleClickSfx"]]]]],["static-attr","remove-min-height",""],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"toggleGrid"],null],null],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","toggle-button-content"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","champion-grid-footer"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(1),
          s = n(60);
        e.exports = i.Ember.Component.extend({
          layout: n(180),
          classNames: ["player-name-wrapper"],
          classNameBindings: [],
          summonerInfoService: i.Ember.inject.service("summoner-info"),
          didReceiveAttrs: function () {
            this._super(...arguments);
          },
          isNameUnhidden: i.Ember.computed("nameVisibilityType", function () {
            return (
              this.get("nameVisibilityType") === s.NAME_VISIBILITY_TYPE.UNHIDDEN
            );
          }),
          shouldShowDisplayName: i.Ember.computed(
            "isSummonerInMyTeam",
            "nameVisibilityType",
            function () {
              return (
                !this.get("isSummonerInMyTeam") ||
                this.get("nameVisibilityType") === s.NAME_VISIBILITY_TYPE.HIDDEN
              );
            },
          ),
        });
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "8lUroK2u",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\player-name-wrapper-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\player-name-wrapper-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["shouldShowDisplayName"]]],null,2,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    ("],["append",["unknown",["hiddenName"]],false],["text",")\\n"]],"locals":[]},{"statements":[["text","  "],["append",["helper",["player-name"],null,[["format","puuid"],["tooltip",["get",["puuid"]]]]],false],["text","\\n"],["block",["if"],[["get",["isNameUnhidden"]]],null,0]],"locals":[]},{"statements":[["text","  "],["append",["unknown",["displayName"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i,
          s = (i = n(66)) && i.__esModule ? i : { default: i };
        const o = n(1),
          { Ember: a } = o;
        n(182),
          (e.exports = a.Component.extend({
            classNameBindings: [
              "isSpectating:quit-spectate-button:quit-button",
            ],
            layout: n(183),
            actions: {
              quitCustom: function () {
                s.default
                  .ajax({
                    type: "POST",
                    url: "/lol-lobby/v1/lobby/custom/cancel-champ-select",
                  })
                  .then(() => {
                    this.recordDidRequestSucceed &&
                      this.recordDidRequestSucceed(!0);
                  })
                  .catch((e) => {
                    this.recordDidRequestSucceed &&
                      this.recordDidRequestSucceed(!1, e);
                  });
              },
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "gc9sCYa7",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\quit-button-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\quit-button-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\quit-button-component\\\\index.js\\" "],["text","\\n"],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"quitCustom"],null],null],["dynamic-attr","disabled",["unknown",["disabled"]],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["isSpectating"]]],null,1,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["unknown",["tra","quit"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["unknown",["tra","quit_spectating"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(1),
          s = a(n(66)),
          o = a(n(58));
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        n(185);
        const r = i.ViewportPlugin.fullScreen().getScreenRoot(
            "rcp-fe-lol-champ-select",
          ),
          l = "sfx-ui";
        e.exports = i.Ember.Component.extend({
          layout: n(186),
          classNameBindings: [":reroll-button"],
          didInsertElement() {
            this._super(...arguments), this.setupResetHandler();
          },
          willDestroyElement() {
            this._super(...arguments), r.off("show", this.get("showHandler"));
          },
          setupResetHandler: function () {
            this.set("showHandler", () => {
              this.isDestroyed ||
                this.isDestroying ||
                this.set("rerollInProgress", !1);
            }),
              r.on("show", this.get("showHandler"));
          },
          rerolls: i.Ember.computed(
            "tbAllowRerolling",
            "tbRerollsRemaining",
            function () {
              if (this.get("tbAllowRerolling"))
                return this.get("tbRerollsRemaining");
            },
          ),
          rerollInProgress: !1,
          rerollsDisabled: i.Ember.computed(
            "rerollInProgress",
            "rerolls",
            "disabled",
            function () {
              const e =
                this.get("disabled") ||
                0 === this.get("rerolls") ||
                this.get("rerollInProgress");
              return e || void 0;
            },
          ),
          championUpdated: i.Ember.observer("summoner.champion", function () {
            if (this.get("rerollInProgress")) {
              const e = this.get("rerollId");
              setTimeout(
                function () {
                  this.isDestroyed ||
                    this.isDestroying ||
                    (this.get("rerollId") === e &&
                      (this.set("rerollInProgress", !1),
                      i.Telemetry.sendEvent("champ-select-reroll"),
                      i.Telemetry.stopAndRecordTimer(this.get("timerId")),
                      this.set("timerId", null)));
                }.bind(this),
                1e3,
              );
            }
          }),
          rerollTooltipText: i.Ember.computed("rerolls", function () {
            return this.get("tra").formatString("reroll_tooltip", {
              rerolls: this.get("rerolls"),
            });
          }),
          mouseEnter: function () {
            this.get("rerollsDisabled") ||
              o.default.playSound(
                l,
                "/fe/lol-champ-select/sounds/sfx-cs-button-reroll-hover.ogg",
              );
          },
          actions: {
            reroll: function () {
              if (
                !this.get("rerollInProgress") &&
                !this.get("rerollsDisabled")
              ) {
                o.default.playSound(
                  l,
                  "/fe/lol-champ-select/sounds/sfx-cs-button-reroll-click.ogg",
                ),
                  this.set("rerollInProgress", !0);
                const e = Date.now();
                this.set("rerollId", e),
                  this.get("timerId") &&
                    i.Telemetry.cancelTimer(this.get("timerId")),
                  this.set(
                    "timerId",
                    i.Telemetry.startTimer("champ-select-reroll"),
                  ),
                  s.default
                    .ajax({
                      type: "POST",
                      url: "/lol-champ-select/v1/session/my-selection/reroll",
                      errorMessage: "error_could_not_reroll",
                    })
                    .then(() => {
                      this.recordDidRequestSucceed &&
                        this.recordDidRequestSucceed(!0);
                    })
                    .catch((t) => {
                      this.recordDidRequestSucceed &&
                        this.recordDidRequestSucceed(!1, t),
                        this.isDestroyed ||
                          this.isDestroying ||
                          (this.get("rerollId") === e &&
                            this.set("rerollInProgress", !1));
                    });
              }
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "q7Q4m5nI",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\reroll-button-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\reroll-button-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\reroll-button-component\\\\index.js\\" "],["text","\\n"],["block",["action-button"],null,[["disabled","click"],[["get",["rerollsDisabled"]],"reroll"]],0],["text","\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","h4",[]],["flush-element"],["append",["unknown",["rerolls"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(129);
        n(188);
        const s = n(1),
          { Ember: o } = s,
          { EmberHelpers: a } = s;
        e.exports = o.Component.extend({
          classNames: ["ring-gear-component"],
          classNameBindings: [
            "champSelectScreen",
            "isInit:is-init:is-waiting",
            "shouldShowExpandedRing:expanded-ring:default-ring",
            "isAnimating:is-animating:is-pending",
            "isTeamBan:is-player-team:is-enemy-team",
            "isActive:is-active",
            "isRotating:is-rotating:is-not-rotating",
            "isBanCompleted:is-ban-completed",
            "largeAreaAnimationsEnabled:large-area-animations-enabled:large-area-animations-disabled",
          ],
          layout: n(189),
          animationDispatcher: o.inject.service("animation-dispatcher"),
          isAnimating: o.computed.equal(
            "banLockedInAnimationState",
            i.ANIMATION_STATES.STARTED,
          ),
          isRotating: o.computed.equal(
            "banRotationAnimationState",
            i.ANIMATION_STATES.STARTED,
          ),
          isBanCompleted: o.computed.equal(
            "banOutroAnimationState",
            i.ANIMATION_STATES.STARTED,
          ),
          isTeamBan: o.computed.alias(
            "lastCompletedBanAction.actor.isOnLeftSide",
          ),
          ringRotationDegress: 0,
          banLockedInAnimationState: o.computed.alias(
            "animationDispatcher.states.banLockedInAnimation",
          ),
          banRotationAnimationState: o.computed.alias(
            "animationDispatcher.states.banRotationAnimation",
          ),
          banOutroAnimationState: o.computed.alias(
            "animationDispatcher.states.banOutroAnimation",
          ),
          largeAreaAnimationsEnabled: o.computed.equal(
            "uxSettings.largeAreaAnimationsEnabled",
            !0,
          ),
          startRotationAnimation: a.observeChange(
            "banRotationAnimationState",
            function () {
              this.get("isRotating") &&
                (this.setRotation("ringRotationDegress"),
                this.element.style.removeProperty("--rotatePrimaryDeg"),
                this.element.style.setProperty(
                  "--rotatePrimaryDeg",
                  this.get("ringRotationDegress") + "deg",
                ));
            },
          ),
          activeActionType: o.computed.alias("activeAction.type"),
          activeActionTypeChanged: a.observeChange(
            "activeActionType",
            function (e) {
              const t = this.get("sessionActions.banActions.firstObject");
              this.get("activeAction.id") === (t && t.get("id"))
                ? this.set("isInit", !0)
                : void 0 === e
                  ? this.set("isInit", !1)
                  : "pick" === e && this.set("isInit", !0);
            },
          ),
          setRotation: function (e) {
            let t = this.get(e);
            (t += this.get("isTeamBan") ? 45 : -45), this.set(e, t);
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "qvT293jE",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\ring-gear-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\ring-gear-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\ring-gear-component\\\\index.js\\" "],["text","\\n"],["open-element","svg",[]],["static-attr","width","0"],["static-attr","height","0"],["static-attr","xmlns:xlink","http://www.w3.org/1999/xlink","http://www.w3.org/2000/xmlns/"],["flush-element"],["text","\\n  "],["open-element","defs",[]],["flush-element"],["text","\\n    "],["open-element","linearGradient",[]],["static-attr","id","linear-gradient"],["static-attr","x1","0"],["static-attr","y1","0"],["static-attr","x2","0"],["static-attr","y2","550"],["static-attr","gradientUnits","userSpaceOnUse"],["flush-element"],["text","\\n      "],["open-element","stop",[]],["static-attr","offset","0.18"],["static-attr","stop-color","#785a28"],["flush-element"],["close-element"],["text","\\n      "],["open-element","stop",[]],["static-attr","offset","0.213"],["static-attr","stop-color","#785a28"],["flush-element"],["close-element"],["text","\\n      "],["open-element","stop",[]],["static-attr","offset","0.467"],["static-attr","stop-color","#765c29"],["flush-element"],["close-element"],["text","\\n      "],["open-element","stop",[]],["static-attr","offset","0.547"],["static-attr","stop-color","#6b5424"],["flush-element"],["close-element"],["text","\\n      "],["open-element","stop",[]],["static-attr","offset","0.82"],["static-attr","stop-color","#463714"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","symbol",[]],["static-attr","id","dashed-ring-symbol"],["static-attr","viewBox","0 0 550 550"],["flush-element"],["text","\\n      "],["open-element","circle",[]],["static-attr","id","svg-ring-dashed-circle"],["static-attr","fill","none"],["static-attr","stroke","#cdbe91"],["static-attr","stroke-width","15"],["static-attr","stroke-miterlimit","10"],["static-attr","stroke-dasharray","1.002,6.011"],["static-attr","cx","275"],["static-attr","cy","275"],["static-attr","r","234.5"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","symbol",[]],["static-attr","id","ban-gear-ring-symbol"],["static-attr","viewBox","0 0 550 550"],["flush-element"],["text","\\n      "],["open-element","g",[]],["flush-element"],["text","\\n        "],["open-element","path",[]],["static-attr","id","svg-ring-gear-inner-path"],["static-attr","fill","none"],["static-attr","stroke","#685c41"],["static-attr","stroke-width","2"],["static-attr","stroke-miterlimit","10"],["static-attr","d","M546.432,290.565\\n            v-31.131l-6.086,6.09c-1.457-41.448-12.401-80.471-30.741-114.972l8.246,2.21L502.286,125.8l-2.217,8.274\\n            c-21.334-33.995-50.145-62.815-84.148-84.145l8.279-2.216l-26.959-15.565l2.21,8.247\\n            c-34.511-18.34-73.528-29.289-114.972-30.742l6.086-6.09h-31.131l6.09,6.09c-41.448,1.453-80.471,12.402-114.972,30.742\\n            l2.21-8.247L125.8,47.714l8.274,2.216C100.08,71.26,71.26,100.08,49.93,134.075l-2.216-8.274l-15.565,26.963l8.247-2.21\\n            c-18.34,34.501-29.289,73.524-30.742,114.972l-6.09-6.09v31.131l6.09-6.086c1.453,41.443,12.402,80.461,30.742,114.972\\n            l-8.247-2.21L47.714,424.2l2.216-8.279c21.33,34.004,50.15,62.814,84.145,84.148l-8.274,2.217l26.963,15.564l-2.21-8.246\\n            c34.501,18.34,73.524,29.284,114.972,30.742l-6.09,6.085h31.131l-6.086-6.085c41.443-1.458,80.461-12.402,114.972-30.742\\n            l-2.21,8.246l26.959-15.564l-8.279-2.217c34.004-21.334,62.814-50.145,84.148-84.148l2.217,8.279l15.564-26.959l-8.246,2.21\\n            c18.34-34.511,29.284-73.528,30.741-114.972L546.432,290.565z"],["flush-element"],["close-element"],["text","\\n        "],["open-element","circle",[]],["static-attr","cx","275"],["static-attr","cy","275"],["static-attr","r","273"],["static-attr","fill","none"],["static-attr","stroke","#685c41"],["static-attr","stroke-width","4"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","main-ring-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","id","center-ring"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","id","center-ring-container"],["flush-element"],["text","\\n      "],["open-element","svg",[]],["static-attr","id","ban-bar-svg"],["static-attr","width","550"],["static-attr","height","550"],["static-attr","class","slash-line-rotation"],["flush-element"],["text","\\n        "],["open-element","defs",[]],["flush-element"],["text","\\n          "],["open-element","clipPath",[]],["static-attr","id","circle-container-mask"],["flush-element"],["text","\\n            "],["open-element","circle",[]],["static-attr","cx","275"],["static-attr","cy","275"],["static-attr","r","275"],["static-attr","fill","#000"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","g",[]],["static-attr","class","ban-bar-container"],["static-attr","clip-path","url(#circle-container-mask)"],["flush-element"],["text","\\n          "],["open-element","line",[]],["static-attr","class","ban-line top"],["static-attr","fill","none"],["static-attr","stroke","#685c41"],["static-attr","stroke-width","4"],["static-attr","stroke-miterlimit","10"],["static-attr","x1","10"],["static-attr","y1","270"],["static-attr","x2","546"],["static-attr","y2","270"],["flush-element"],["close-element"],["text","\\n          "],["open-element","line",[]],["static-attr","class","ban-line bottom"],["static-attr","fill","none"],["static-attr","stroke","#685c41"],["static-attr","stroke-width","4"],["static-attr","stroke-miterlimit","10"],["static-attr","x1","4"],["static-attr","y1","282"],["static-attr","x2","540"],["static-attr","y2","282"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","main-gear-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","ring-position"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","dashed-ring-rotation"],["flush-element"],["text","\\n            "],["open-element","svg",[]],["static-attr","width","550"],["static-attr","height","550"],["flush-element"],["text","\\n              "],["open-element","use",[]],["static-attr","xlink:href","#dashed-ring-symbol","http://www.w3.org/1999/xlink"],["static-attr","class","dashed-ring-circle"],["static-attr","x","0"],["static-attr","y","0"],["static-attr","width","550"],["static-attr","height","550"],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","ring-position"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","slash-ring-rotation"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","gear-ring-rotation"],["flush-element"],["text","\\n              "],["open-element","svg",[]],["static-attr","width","550"],["static-attr","height","550"],["flush-element"],["text","\\n                "],["open-element","use",[]],["static-attr","xlink:href","#ban-gear-ring-symbol","http://www.w3.org/1999/xlink"],["static-attr","class","ban-gear-ring-symbol"],["static-attr","x","0"],["static-attr","y","0"],["static-attr","width","550"],["static-attr","height","550"],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","id","intro-ring"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","id","intro-dashed-container"],["static-attr","class","ring-position"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","dashed-ring-rotation"],["flush-element"],["text","\\n        "],["open-element","svg",[]],["static-attr","id","dashed-ring-intro"],["static-attr","width","550"],["static-attr","height","550"],["flush-element"],["text","\\n          "],["open-element","use",[]],["static-attr","xlink:href","#dashed-ring-symbol","http://www.w3.org/1999/xlink"],["static-attr","class","dashed-ring-circle"],["static-attr","x","0"],["static-attr","y","0"],["static-attr","width","550"],["static-attr","height","550"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","id","intro-gear-container"],["static-attr","class","ring-position"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","slash-ring-rotation"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","gear-ring-rotation"],["flush-element"],["text","\\n          "],["open-element","svg",[]],["static-attr","id","ban-gear-ring-intro"],["static-attr","width","550"],["static-attr","height","550"],["flush-element"],["text","\\n            "],["open-element","use",[]],["static-attr","xlink:href","#ban-gear-ring-symbol","http://www.w3.org/1999/xlink"],["static-attr","class","ban-gear-ring-symbol"],["static-attr","x","0"],["static-attr","y","0"],["static-attr","width","550"],["static-attr","height","550"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","expanded-ring-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","id","left-ring"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","clip-box"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ring-position ring-offset"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","dashed-ring-rotation"],["flush-element"],["text","\\n          "],["open-element","svg",[]],["static-attr","width","600"],["static-attr","height","600"],["static-attr","viewBox","0 0 600 600"],["flush-element"],["text","\\n            "],["open-element","circle",[]],["static-attr","class","dashed-ring-circle"],["static-attr","fill","none"],["static-attr","stroke","#cdbe91"],["static-attr","stroke-width","15"],["static-attr","stroke-miterlimit","10"],["static-attr","stroke-dasharray","1.002,6.011"],["static-attr","cx","300"],["static-attr","cy","300"],["static-attr","r","234.5"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ring-position ring-offset"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","slash-ring-rotation"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","gear-ring-rotation"],["flush-element"],["text","\\n            "],["open-element","svg",[]],["static-attr","width","550"],["static-attr","height","550"],["static-attr","viewBox","0 0 550 550"],["flush-element"],["text","\\n              "],["open-element","use",[]],["static-attr","xlink:href","#ban-gear-ring-symbol","http://www.w3.org/1999/xlink"],["static-attr","class","ban-gear-ring-symbol left"],["static-attr","x","0"],["static-attr","y","0"],["static-attr","width","550"],["static-attr","height","550"],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","id","right-ring"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","clip-box"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ring-position ring-offset"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","dashed-ring-rotation"],["flush-element"],["text","\\n          "],["open-element","svg",[]],["static-attr","width","600"],["static-attr","height","600"],["static-attr","viewBox","0 0 600 600"],["flush-element"],["text","\\n            "],["open-element","circle",[]],["static-attr","class","dashed-ring-circle"],["static-attr","fill","none"],["static-attr","stroke","#cdbe91"],["static-attr","stroke-width","15"],["static-attr","stroke-miterlimit","10"],["static-attr","stroke-dasharray","1.002,6.011"],["static-attr","cx","300"],["static-attr","cy","300"],["static-attr","r","234.5"],["flush-element"],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ring-position ring-offset"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","slash-ring-rotation"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","gear-ring-rotation"],["flush-element"],["text","\\n            "],["open-element","svg",[]],["static-attr","width","550"],["static-attr","height","550"],["static-attr","viewBox","0 0 550 550"],["flush-element"],["text","\\n              "],["open-element","use",[]],["static-attr","xlink:href","#ban-gear-ring-symbol","http://www.w3.org/1999/xlink"],["static-attr","class","ban-gear-ring-symbol left"],["static-attr","x","0"],["static-attr","y","0"],["static-attr","width","550"],["static-attr","height","550"],["flush-element"],["close-element"],["text","\\n            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = n(1);
        const { RunMixin: s } = i.EmberAddons.EmberLifeline,
          o = i.UiKitPlugin.getTemplateHelper();
        var a = i.Ember.Component.extend(s, {
          layout: n(191),
          classNames: ["rune-recommender-button-component"],
          didUpdateAttrs: function () {
            this._super(...arguments);
            const e = this._showTimedTooltip,
              t = this.get("shouldShowTimedTooltip");
            !e && t && this.showTimedTooltip(), (this._showTimedTooltip = t);
          },
          showTimedTooltip: function () {
            const e = this.get("timedTooltipText"),
              t = document.createElement("lol-uikit-tooltip");
            t.appendChild(o.contentBlockTooltipAttention(e));
            const n = 1e3 * (this.get("timedTooltipDurationSeconds") || 7);
            i.TooltipManager.assign(this.element, t, null, {
              type: "attention",
              targetAnchor: { x: "center", y: "top" },
              tooltipAnchor: { x: "center", y: "bottom" },
            }),
              this.sendAction("acknowledgeTutorialTooltip"),
              this.runTask(() => {
                i.TooltipManager.unassign(this.element);
              }, n);
          },
          actions: {
            onButtonClick: function () {
              this.sendAction("handleClick");
            },
          },
        });
        t.default = a;
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "x4Sx5/3V",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\rune-recommender-button-component\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\rune-recommender-button-component\\\\index.js\\" "],["text","\\n"],["append",["helper",["framed-icon-button"],null,[["disabled","disabledTooltipText","iconPath","clickSfxPath","hoverSfxPath","onButtonClick"],[["get",["isDisabled"]],["get",["disabledTooltipText"]],"/fe/lol-champ-select/images/perks/rune-recommender-icon.png","/fe/lol-champ-select/sounds/sfx-uikit-edit-click.ogg","/fe/lol-champ-select/sounds/sfx-uikit-grid-hover.ogg",["helper",["action"],[["get",[null]],"onButtonClick"],null]]]],false],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i,
          s = (i = n(58)) && i.__esModule ? i : { default: i };
        const o = n(1),
          { Ember: a } = o,
          { EmberHelpers: r } = o;
        n(193);
        const l = o.EmberDataBinding({
          Ember: a,
          websocket: o.getProvider().getSocket(),
          boundProperties: { skinInfo: "/lol-store/v1/skins/{{skin.id}}" },
        });
        e.exports = a.Component.extend(l, {
          tagName: "div",
          layout: n(194),
          skinPurchaseService: a.inject.service("skin-purchase"),
          meetsChampionRequirement: a.computed.alias("skin.isChampionUnlocked"),
          isSelected: a.computed("skin.id", "selectedSkinId", function () {
            return this.get("skin.id") === this.get("selectedSkinId");
          }),
          meetsBaseSkinRequirement: a.computed(
            "baseSkin",
            "baseSkin.ownership.owned",
            function () {
              const e = this.get("baseSkin"),
                t = this.get("baseSkin.ownership.owned");
              return !e || t;
            },
          ),
          invalidPriceData: a.computed(
            "skin.id",
            "skinInfo",
            "skinInfo.itemId",
            "skinInfo.prices",
            "skinInfo.sale",
            "skinInfo.sale.prices",
            function () {
              const e = this.get("skinInfo"),
                t = this.get("skin.id");
              if (!e || e.get("itemId") !== t) return !0;
              const n = this._getPricesFromSkinInfo(e);
              return !n || 0 === Object.getOwnPropertyNames(n).length;
            },
          ),
          purchaseDisabled: r.computedGate(
            "jmxSettings.LcuChampionSelect.SkinPurchaseEnabled",
            "meetsChampionRequirement",
            "meetsBaseSkinRequirement",
            "timeRemaining",
            "jmxSettings.LcuChampionSelect.SkinPurchaseTime",
            "inFinalizationPhase",
            "skinInfo.active",
            "invalidPriceData",
            function () {
              return (
                !this.get(
                  "jmxSettings.LcuChampionSelect.SkinPurchaseEnabled",
                ) ||
                !(
                  this.get("meetsChampionRequirement") &&
                  this.get("meetsBaseSkinRequirement") &&
                  !(
                    this.get("timeRemaining") <
                      this.get(
                        "jmxSettings.LcuChampionSelect.SkinPurchaseTime",
                      ) && this.get("inFinalizationPhase")
                  ) &&
                  this.get("skinInfo.active") &&
                  !this.get("invalidPriceData")
                )
              );
            },
          ),
          color: a.computed("skin.colors.[]", function () {
            const e = this.get("skin.colors");
            if (e)
              return 1 !== e.length && e[1]
                ? "linear-gradient(135deg, " +
                    e[0] +
                    " 0%, " +
                    e[0] +
                    " 50%, " +
                    e[1] +
                    " 50%, " +
                    e[1] +
                    " 100%)"
                : e[0];
          }),
          actions: {
            onEnter() {
              s.default.playSound(
                "sfx-ui",
                "/fe/lol-champ-select/sounds/sfx-uikit-grid-hover.ogg",
              ),
                this.get("onEnter")(this.get("skin"));
            },
            onLeave() {
              this.get("onLeave")(this.get("skin"));
            },
            onClick() {
              if (this.get("skin.unlocked"))
                s.default.playSound(
                  "sfx-ui",
                  "/fe/lol-champ-select/sounds/sfx-uikit-grid-click.ogg",
                ),
                  this.get("onClick")(this.get("skin"));
              else if (!this.get("purchaseDisabled")) {
                s.default.playSound(
                  "sfx-ui",
                  "/fe/lol-champ-select/sounds/sfx-uikit-grid-click.ogg",
                );
                const e = this.get("skinInfo");
                this.get("skinPurchaseService").openPAWModal(
                  e,
                  this.recordDidRequestSucceed,
                );
              }
            },
          },
          _getPricesFromSkinInfo: function (e) {
            if (!e) return {};
            const t = (e.sale && e.sale.prices) || [],
              n = (e, t) => (
                e.cost && e.cost > 0 && e.currency && (t[e.currency] = e.cost),
                t
              ),
              i = (e.prices || []).reduce(n, {});
            return t.reduce(n, i);
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "S29Qx5vq",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\chroma-modal-component\\\\skin-button\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\chroma-modal-component\\\\skin-button\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\chroma-modal-component\\\\skin-button\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["chroma-skin-button \\n\\t",["helper",["unless"],[["get",["skin","unlocked"]],"locked"],null]," \\n\\t",["helper",["if"],[["get",["purchaseDisabled"]],"purchase-disabled"],null]," \\n\\t",["helper",["if"],[["get",["isSelected"]],"selected"],null]]]],["dynamic-attr","onmouseover",["helper",["action"],[["get",[null]],"onEnter"],null],null],["dynamic-attr","onmouseout",["helper",["action"],[["get",[null]],"onLeave"],null],null],["dynamic-attr","onmouseup",["helper",["action"],[["get",[null]],"onClick"],null],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["skin","unlocked"]]],null,2,1],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","\\t"],["open-element","div",[]],["static-attr","class","contents"],["dynamic-attr","style",["concat",["background:",["unknown",["color"]]]]],["flush-element"],["close-element"],["text","\\n\\t"]],"locals":[]},{"statements":[["block",["if"],[["get",["isSelected"]]],null,0]],"locals":[]},{"statements":[["text","\\t"],["open-element","div",[]],["static-attr","class","contents"],["dynamic-attr","style",["concat",["background:",["unknown",["color"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i,
          s = n(1),
          o = (i = n(58)) && i.__esModule ? i : { default: i },
          a = n(60);
        const r = s.UiKitPlugin.getFlyoutManager(),
          { RunMixin: l } = s.EmberAddons.EmberLifeline;
        n(135), n(196);
        const c = s.Ember.Object.extend({
            containerStyle: s.Ember.computed("offset", "faded", function () {
              const e = this.get("offset");
              let t = 37.5;
              return (
                e < 2
                  ? (t = 37.5 - 18.5 * (2 - e))
                  : e > 2 && (t = 47.5 + 18.5 * (e - 2)),
                "left: " +
                  t +
                  "%;opacity: " +
                  (this.get("faded") ? "0;" : "1;") +
                  (this.get("unclickable") ? "pointer-events: none;" : "")
              );
            }),
            isCentered: s.Ember.computed("offset", function () {
              return 2 === this.get("offset");
            }),
            selectedChildSkin: s.Ember.computed(
              "selectedChildSkinId",
              "skin.childSkins.[]",
              function () {
                return (this.get("skin.childSkins") || []).find(
                  (e) => e.id === this.get("selectedChildSkinId"),
                );
              },
            ),
            showSelected: s.Ember.computed(
              "skin.id",
              "skinCarousel.selectedSkinId",
              "selectedChildSkin",
              function () {
                return (
                  this.get("skinCarousel.selectedSkinId") ===
                    this.get("skin.id") || this.get("selectedChildSkin")
                );
              },
            ),
            selectedChromaStyle: s.Ember.computed(
              "selectedChildSkin.colors",
              function () {
                const e = this.get("selectedChildSkin.colors");
                if (e && 0 !== e.length)
                  return 1 !== e.length && e[1]
                    ? "linear-gradient(135deg, " +
                        e[0] +
                        " 0%, " +
                        e[0] +
                        " 50%, " +
                        e[1] +
                        " 50%, " +
                        e[1] +
                        " 100%)"
                    : e[0];
              },
            ),
          }),
          m = s.Ember.Object.extend({
            skin: null,
            skinCarousel: null,
            isViewed: s.Ember.computed(
              "skin.id",
              "skinCarousel.viewSkin.id",
              "skinCarousel.viewSkin.parentSkinId",
              function () {
                return (
                  this.get("skin.id") ===
                    this.get("skinCarousel.viewSkin.id") ||
                  this.get("skin.id") ===
                    this.get("skinCarousel.viewSkin.parentSkinId")
                );
              },
            ),
          });
        e.exports = s.Ember.Component.extend(l, {
          layout: n(197),
          classNames: ["skin-carousel"],
          classNameBindings: ["willTransition"],
          willTransition: !1,
          maxSkinsToDisplay: 5,
          skinCarouselItems: null,
          isFlyoutOpen: !1,
          init: function () {
            this._super(...arguments),
              this.set("skinCarouselItems", new s.Ember.A());
            for (let e = 0; e < this.maxSkinsToDisplay + 4; e++)
              this.get("skinCarouselItems").pushObject(
                c.create({ placeholder: !0, skinCarousel: this, skin: {} }),
              );
            this.get("isShowingGrid") && this.setSkinCarouselItems();
            const e = {
              targetAnchor: { x: "center", y: "top" },
              tooltipAnchor: { x: "center", y: "bottom" },
              offset: { x: -1, y: 44 },
              orientation: "top",
              animated: this.get("largeAreaAnimationsEnabled"),
              backdropCutout: !1,
            };
            this.set("flyoutSettings", e);
          },
          didReceiveAttrs: function () {
            this._super(...arguments);
            const e = this.get("isSkinGrantedFromBoost");
            if (e && e !== this._prevSkinGrantedFromBoost) {
              const e = this.get("viewSkinIndex"),
                t = this.getIndexBySkinId(
                  this.get("carouselSkins"),
                  this.get("selectedSkinId"),
                );
              this.scroll(e, t);
            }
            this._prevSkinGrantedFromBoost = e;
          },
          timeRemaining: s.Ember.computed.alias("timer.timeRemaining"),
          inFinalizationPhase: s.Ember.computed.alias(
            "timer.inFinalizationPhase",
          ),
          currentMapChromaPath: s.Ember.computed.alias(
            "map.assets.champ-select-flyout-background",
          ),
          largeAreaAnimationsEnabled: s.Ember.computed.readOnly(
            "uxSettings.largeAreaAnimationsEnabled",
          ),
          skinPips: s.Ember.computed("carouselSkins.[]", function () {
            const e = this.get("carouselSkins");
            return e && e.length
              ? s.Ember.A(
                  e.map((e) => m.create({ skin: e, skinCarousel: this })),
                )
              : [];
          }),
          disabled: !1,
          disabledAttr: s.Ember.computed("disabled", function () {
            return !!this.get("disabled") || null;
          }),
          handleDisabledState: s.Ember.observer("disabled", function () {
            this.get("disabled") && this.hideChromaFlyout();
          }),
          sanitizedSkinName: s.Ember.computed(
            "viewSkin",
            "championName",
            function () {
              let e = this.get("viewSkin.name") || "";
              const t = this.get("championName");
              return (e = e.replace(" " + t, "")), (e = e.replace(t, "")), e;
            },
          ),
          viewSkinIndex: s.Ember.computed(
            "carouselSkins.[]",
            "viewSkin.parentSkinId",
            "viewSkin.id",
            function () {
              const e =
                  this.get("viewSkin.parentSkinId") || this.get("viewSkin.id"),
                t = this.get("carouselSkins") || [];
              return this.getIndexBySkinId(t, e);
            },
          ),
          disabledChromas: s.Ember.computed.readOnly(
            "jmxSettings.DisabledChampionSkins.DisabledChromas",
          ),
          _isOffsetHidden: function (e, t, n) {
            let i = Math.min(
              this.maxSkinsToDisplay,
              this.get("carouselSkins.length") || 0,
            );
            if ((4 === i && (i = 5), 2 === i && 2 !== e)) {
              if (t && 0 === n && e < 2) return !0;
              if (!t && 1 === n && e < 2) return !0;
              if (t && 1 === n && e > 2) return !0;
              if (!t && 0 === n && e > 2) return !0;
            }
            const s = Math.floor(i / 2);
            return e < 2 - s || e > 2 + s;
          },
          setSkinCarouselItems: s.Ember.observer(
            "viewSkin.id",
            "isShowingGrid",
            "carouselSkins.@each.unlocked",
            "disabledChromas",
            function () {
              if (this.get("isShowingGrid")) return;
              const e = this.get("viewSkinIndex"),
                t = s.Ember.A(this.get("carouselSkins") || void 0);
              if (t && e > -1) {
                let n = t.get("length"),
                  i = this.get("carouselTransitionOffset") || 0;
                4 === n &&
                  (n++, -1 === i && 3 === e ? i-- : 1 === i && 0 === e && i++);
                const o = (n + e - 2) % n;
                for (let r = -2; r < this.maxSkinsToDisplay + 2; r++) {
                  const l = r + 2,
                    c = (r + o + n) % n;
                  let m = t.objectAt(c),
                    u = !1;
                  m || ((u = !0), (m = {}));
                  const p = r + i,
                    d = this.get("disabledChromas");
                  let h,
                    g,
                    f = !u && s.Ember.get(m, "childSkins.length");
                  f &&
                    d &&
                    (f =
                      void 0 !== m.childSkins.find((e) => !d.includes(e.id))),
                    m?.productType === a.skinProductTypes.kTieredSkin &&
                      ((h = m.childSkins?.reduce(
                        (e, t) => (t.ownership.owned ? t : e),
                        m.childSkins[0],
                      )),
                      (g = h?.tilePath)),
                    this.get("skinCarouselItems")
                      .objectAt(l)
                      .setProperties({
                        placeholder: u,
                        offsetClass: "skin-carousel-offset-" + p,
                        offset: p,
                        hasChildSkins: f,
                        alternativeTilePath: g,
                        isTieredSkin:
                          m?.productType === a.skinProductTypes.kTieredSkin,
                        skin: m,
                        selectedChildSkinId:
                          this.parentSkinIdToSelectedChromaIdMap[m.id],
                        unlocked: m.unlocked,
                        unclickable: this._isOffsetHidden(r, !0, e),
                        faded: this._isOffsetHidden(p, !i, e),
                      });
                }
                i &&
                  (this.set("willTransition", !0),
                  this.runTask(() => {
                    this._resolveSkinCarouselTransition(e);
                  }, 1));
              }
            },
          ),
          _resolveSkinCarouselTransition: function (e) {
            this.set("willTransition", !1),
              (this.get("skinCarouselItems") || s.Ember.A()).forEach(function (
                t,
                n,
              ) {
                const i = n - 2;
                t.set("offsetClass", "skin-carousel-offset-" + i),
                  t.set("offset", i),
                  t.set("faded", this._isOffsetHidden(i, !0, e));
              }, this),
              this.set("carouselTransitionOffset", 0);
          },
          playSfxUISound: function (e) {
            const t = "/fe/lol-champ-select/sounds/" + e;
            o.default.playSound("sfx-ui", t);
          },
          playSkinCarouselSound: function (e) {
            const t =
              e > 0 ? "sfx-cs-splash-forward.ogg" : "sfx-cs-splash-back.ogg";
            this.playSfxUISound(t);
          },
          hideChromaFlyout: function () {
            r.isActive() &&
              this.$(".skin-selection-item .chroma-button").each((e, t) => {
                r.sendEvent(t, "toggle");
              });
          },
          getIndexBySkinId(e, t) {
            for (let n = 0; n < e.length; n++) if (e[n].id === t) return n;
            return -1;
          },
          calculateCarouselScrollMagnitude(e, t) {
            const n = this.get("carouselSkins.length"),
              i = t - e;
            let s = 0;
            if (Math.abs(i) <= n / 2) s = i;
            else {
              s = (i > 0 ? -1 : 1) * (n - Math.abs(i));
            }
            return (s = Math.min(s, 2)), (s = Math.max(s, -2)), s;
          },
          scroll: function (e, t, n) {
            if (!this.get("disabled") && e !== t) {
              const i = this.calculateCarouselScrollMagnitude(e, t);
              this.set("carouselTransitionOffset", i),
                this.playSkinCarouselSound(i);
              const s = this.get("carouselSkins")[t];
              this.sendAction("setSkinThroughScroll", s),
                n && this.playSfxUISound(n);
            }
          },
          actions: {
            skinScrollBy1: function (e) {
              const t = this.get("carouselSkins.length"),
                n = this.get("viewSkinIndex"),
                i = (n + e + t) % t;
              this.scroll(n, i);
            },
            skinButtonClicked: function (e, t) {
              const n = this.get("carouselSkins"),
                i = this.get("viewSkinIndex"),
                s = this.getIndexBySkinId(n, e.id);
              this.scroll(i, s, t);
            },
            chromaButtonClicked: function (e) {
              e.get("isCentered") &&
                !this.get("disabled") &&
                (this.set("baseSkin", e.get("skin")),
                this.get("isFlyoutOpen") ||
                  this.playSfxUISound("sfx-cs-button-chromas-open.ogg"),
                this.set("isFlyoutOpen", !this.get("isFlyoutOpen")));
            },
            hideChromaFlyout: function () {
              this.set("isFlyoutOpen", !1);
            },
            skinButtonMouseEnter: function (e) {
              this.get("disabled") ||
                e ||
                this.playSfxUISound("sfx-uikit-grid-hover.ogg");
            },
            setSkinThroughChromaModal: function (e) {
              this.sendAction("setSkinThroughChromaModal", e),
                this.playSfxUISound("sfx-cs-button-chromas-click.ogg"),
                this.set("isFlyoutOpen", !1);
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "2sqnCmY2",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\skin-carousel-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\skin-carousel-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\skin-carousel-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["skin-selection-indicator ",["helper",["if"],[["get",["disabled"]],"disabled","enabled"],null]]]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","line line-left"],["flush-element"],["close-element"],["text","\\n  "],["open-element","ul",[]],["static-attr","class","skin-selection-indicator-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["skinPips"]]],null,9],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","line line-right"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","skin-selection-button-container"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-arrow-button",[]],["dynamic-attr","disabled",["unknown",["disabledAttr"]],null],["static-attr","direction","left"],["static-attr","class","skin-selection-button left"],["static-attr","click-sfx-src","/fe/lol-champ-select/sounds/sfx-uikit-button-arrowback-click.ogg"],["static-attr","hover-sfx-src","/fe/lol-champ-select/sounds/sfx-uikit-button-gold-hover.ogg"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"skinScrollBy1",-1],null],null],["flush-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","skin-selection-carousel-container"],["flush-element"],["text","\\n    "],["open-element","ul",[]],["dynamic-attr","class",["concat",["skin-selection-carousel ",["helper",["if"],[["get",["disabled"]],"disabled","enabled"],null]," ",["helper",["if"],[["get",["willTransition"]],"will-transition","did-transition"],null]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["skinCarouselItems"]]],null,8],["text","      "],["open-element","lc-flyout",[]],["dynamic-attr","open",["unknown",["isFlyoutOpen"]],null],["dynamic-attr","onHide",["helper",["action"],[["get",[null]],"hideChromaFlyout"],null],null],["dynamic-attr","uiKitOptionOverrides",["unknown",["flyoutSettings"]],null],["flush-element"],["text","\\n        "],["open-element","lc-flyout-content",[]],["flush-element"],["text","\\n          "],["append",["helper",["chroma-modal"],null,[["selectedSkinId","timeRemaining","inFinalizationPhase","disabledChromas","currentMapChromaPath","baseSkin","jmxSettings","setSkinThroughChromaModal","recordDidRequestSucceed"],[["get",["selectedSkinId"]],["get",["timeRemaining"]],["get",["inFinalizationPhase"]],["get",["disabledChromas"]],["get",["currentMapChromaPath"]],["get",["baseSkin"]],["get",["jmxSettings"]],["helper",["action"],[["get",[null]],"setSkinThroughChromaModal"],null],["get",["recordDidRequestSucceed"]]]]],false],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["append",["helper",["skin-purchase-button"],null,[["jmxSettings","viewSkin","isShown","ip","rp","isSkinSelectVisible","timeRemaining","inFinalizationPhase"],[["get",["jmxSettings"]],["get",["rootViewSkin"]],["get",["rootComponentShown"]],["get",["ip"]],["get",["rp"]],["get",["isSkinSelectVisible"]],["get",["timer","timeRemaining"]],["get",["timer","inFinalizationPhase"]]]]],false],["text","\\n\\n  "],["open-element","lol-uikit-arrow-button",[]],["dynamic-attr","disabled",["unknown",["disabledAttr"]],null],["static-attr","direction","right"],["static-attr","class","skin-selection-button right"],["static-attr","hover-sfx-src","/fe/lol-champ-select/sounds/sfx-uikit-button-gold-hover.ogg"],["static-attr","click-sfx-src","/fe/lol-champ-select/sounds/sfx-uikit-button-arrowfwd-click.ogg"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"skinScrollBy1",1],null],null],["flush-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                      "],["open-element","div",[]],["static-attr","class","chroma-button-2 chroma-selection"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"chromaButtonClicked",["get",["item"]]],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["unless"],[["get",["item","isTieredSkin"]]],null,0]],"locals":[]},{"statements":[["text","                        "],["open-element","div",[]],["static-attr","class","content"],["dynamic-attr","style",["concat",["background: ",["unknown",["item","selectedChromaStyle"]]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-framed-icon"],null,[["disabled","class","onclick","interactive","borderWidth"],[["get",["disabledAttr"]],"chroma-button chroma-selection {{if item.selectedChildSkin \'selected\'}}",["helper",["action"],[["get",[null]],"chromaButtonClicked",["get",["item"]]],null],true,2]],2]],"locals":[]},{"statements":[["block",["if"],[["get",["item","skin","chromaPreviewPath"]]],null,3,1]],"locals":[]},{"statements":[["block",["if"],[["get",["item","hasChildSkins"]]],null,4]],"locals":[]},{"statements":[["block",["if"],[["get",["item","unlocked"]]],null,5]],"locals":[]},{"statements":[["text","              "],["open-element","div",[]],["static-attr","class","skin-selection-thumbnail-gem-overlay"],["flush-element"],["text","\\n                "],["open-element","img",[]],["dynamic-attr","src",["concat",[["unknown",["item","skin","rarityGemPath"]]]]],["flush-element"],["close-element"],["text","\\n              "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","li",[]],["dynamic-attr","class",["concat",["skin-selection-item\\n            skin-selection-item-visible\\n            ",["helper",["if"],[["get",["item","placeholder"]],"skin-selection-item-placeholder"],null],"\\n            ",["unknown",["item","offsetClass"]],"\\n            ",["helper",["if"],[["get",["item","showSelected"]],"skin-selection-item-selected"],null],"\\n            ",["helper",["if"],[["get",["item","unlocked"]],"enabled","disabled"],null]]]],["dynamic-attr","style",["unknown",["item","containerStyle"]],null],["flush-element"],["text","\\n\\n          "],["open-element","div",[]],["static-attr","class","skin-selection-thumbnail"],["dynamic-attr","onmouseenter",["helper",["action"],[["get",[null]],"skinButtonMouseEnter",["get",["item","unclickable"]]],null],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"skinButtonClicked",["get",["item","skin"]],"sfx-cs-button-thumbnail-click.ogg"],null],null],["dynamic-attr","style",["concat",["background-image:url(",["helper",["if"],[["get",["item","isTieredSkin"]],["get",["item","alternativeTilePath"]],["get",["item","skin","tilePath"]]],null],")"]]],["flush-element"],["text","\\n"],["block",["if"],[["get",["item","skin","rarityGemPath"]]],null,7],["text","\\n"],["block",["unless"],[["get",["item","unclickable"]]],null,6],["text","          "],["close-element"],["text","\\n          "],["open-element","div",[]],["dynamic-attr","class",["concat",["skin-selection-item-information\\n            ",["helper",["if"],[["get",["item","skin","ownership","rental","rented"]],"rental-icon"],null],"\\n            ",["helper",["if"],[["get",["item","skin","ownership","loyaltyReward"]],"loyalty-reward-icon"],null],"\\n            ",["helper",["if"],[["get",["UseNewLoyaltyIcon"]],"loyalty-reward-icon--rewards"],null]]]],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["item"]},{"statements":[["text","      "],["open-element","li",[]],["dynamic-attr","class",["concat",["skin-selection-indicator-selector ",["helper",["if"],[["get",["skinPip","isViewed"]],"skin-selection-indicator-selector-viewed"],null]]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"skinButtonClicked",["get",["skinPip","skin"]],"sfx-uikit-button-pip-click.ogg"],null],null],["flush-element"],["close-element"],["text","\\n"]],"locals":["skinPip","index"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        const i = n(1),
          { Ember: s } = i,
          { EmberHelpers: o } = i;
        n(199),
          (e.exports = s.Component.extend({
            classNames: ["champion-skin-name"],
            layout: n(200),
            skinName: o.throttled("skin.name", 300),
            showChampionChestAvailable: s.computed(
              "skin.championId",
              "shouldShowChestAvailability",
              "championChestAvailabilityMap",
              function () {
                const e = this.get("skin.championId"),
                  t = this.get("championChestAvailabilityMap");
                return (
                  !!(this.get("shouldShowChestAvailability") && e && t) &&
                  t.get(e + "")
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
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "9AvsZoMz",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\skin-name-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\skin-name-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\skin-name-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","skin-name-text"],["flush-element"],["text","\\n  "],["append",["unknown",["skinName"]],false],["text","\\n"],["close-element"],["text","\\n"],["block",["if"],[["get",["showChampionChestAvailable"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","tooltip_skin_name_chest_available"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","skin-name-chest-available"],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","restrictArea"],["right","whole-window"]],0],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n(202);
        const i = n(1),
          { Ember: s } = i,
          { EmberHelpers: o } = i,
          a = i.EmberDataBinding({
            Ember: s,
            websocket: i.getProvider().getSocket(),
            boundProperties: {
              skinInfo: "/lol-store/v1/skins/{{viewSkin.id}}",
            },
          });
        e.exports = s.Component.extend(a, {
          classNames: ["skin-purchase"],
          layout: n(203),
          skinPurchaseService: s.inject.service("skin-purchase"),
          disabled: o.computedGate(
            "skinInfo.active",
            "invalidPriceData",
            "viewSkin.isChampionUnlocked",
            "jmxSettings.LcuChampionSelect.SkinPurchaseEnabled",
            "jmxSettings.LcuChampionSelect.SkinPurchaseTime",
            "timeRemaining",
            "inFinalizationPhase",
            "invalidSkinInfoTag",
            function () {
              return (
                !this.get(
                  "jmxSettings.LcuChampionSelect.SkinPurchaseEnabled",
                ) ||
                !!(
                  !this.get("viewSkin.isChampionUnlocked") ||
                  !this.get("skinInfo.active") ||
                  (this.get("timeRemaining") <
                    this.get(
                      "jmxSettings.LcuChampionSelect.SkinPurchaseTime",
                    ) &&
                    this.get("inFinalizationPhase")) ||
                  this.get("invalidSkinInfoTag") ||
                  this.get("invalidPriceData")
                )
              );
            },
          ),
          invalidPriceData: s.computed(
            "skinInfo",
            "skinInfo.itemId",
            "viewSkin.id",
            function () {
              const e = this.get("skinInfo"),
                t = this.get("viewSkin.id");
              if (!e || e.get("itemId") !== t) return !0;
              const n = this._getPricesFromSkinInfo(e);
              return !n || 0 === Object.getOwnPropertyNames(n).length;
            },
          ),
          invalidSkinInfoTag: s.computed(
            "skinInfo",
            "skinInfo.tags.[]",
            function () {
              return (
                this.get("skinInfo.tags") &&
                this.get("skinInfo.tags").includes("paw_item_purchase_disabled")
              );
            },
          ),
          _getPricesFromSkinInfo: function (e) {
            if (!e) return {};
            const t = (e.sale && e.sale.prices) || [],
              n = e.prices || [],
              i = {},
              s = (e) => {
                e.cost && e.cost > 0 && e.currency && (i[e.currency] = e.cost);
              };
            return n.forEach(s), t.forEach(s), i;
          },
          showSkinPurchaseButton: s.computed(
            "viewSkin.unlocked",
            "viewSkin.isBase",
            function () {
              return (
                !this.get("viewSkin.unlocked") && !this.get("viewSkin.isBase")
              );
            },
          ),
          actions: {
            showSkinPurchaseModal: function () {
              if (this.get("disabled")) return;
              const e = this.get("skinInfo");
              this.get("skinPurchaseService").openPAWModal(
                e,
                this.recordDidRequestSucceed,
              );
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "+dAh0S8P",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\skin-purchase-button-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\skin-purchase-button-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\skin-purchase-button-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","unlock-skin-hit-area"],["dynamic-attr","class",["concat",[["helper",["unless"],[["get",["showSkinPurchaseButton"]],"hidden"],null]," ",["helper",["if"],[["get",["disabled"]],"disabled","enabled"],null]," ",["helper",["unless"],[["get",["isSkinSelectVisible"]],"skin-select-not-visible"],null]]]],["modifier",["action"],[["get",[null]],"showSkinPurchaseModal"]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","locked-state"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["disabled"]]],null,1],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","champ-select-skin-purchase-unavailable-tooltip"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","skin_purchase_unavailable_tooltip"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],0]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i,
          s = n(1),
          o = (i = n(66)) && i.__esModule ? i : { default: i },
          a = n(60);
        const { RunMixin: r } = s.EmberAddons.EmberLifeline;
        n(205),
          (e.exports = s.Ember.Component.extend(r, {
            classNames: ["skin-select"],
            classNameBindings: ["showRerollButton:has-reroll"],
            layout: n(206),
            skinCarouselViewSkinId: void 0,
            parentSkinIdToSelectedChromaIdMap: {},
            skinLocked: s.Ember.computed("viewSkin.unlocked", function () {
              return !this.get("viewSkin.unlocked");
            }),
            init() {
              this._super(...arguments), this.initDataBindings();
            },
            didUpdateAttrs: function () {
              this._super(...arguments),
                this.get("timeRemaining") <
                  this.get("jmxSettings.LcuChampionSelect.SkinPurchaseTime") &&
                  this.get("inFinalization") &&
                  (s.sharedPayments.closePaymentsModal(),
                  s.PurchaseAnywhereApi.closePawModal());
            },
            initDataBindings: function () {
              (this._champSelectBinding = (0, s.DataBinding)(
                "/lol-champ-select",
                (0, s.getProvider)().getSocket(),
              )),
                this._champSelectBinding.observe(
                  "/v1/skin-selector-info",
                  this,
                  this.handleSkinSelectorInfo,
                ),
                this._champSelectBinding.observe(
                  "/v1/skin-carousel-skins",
                  this,
                  this.handleSkinCarouselSkins,
                );
            },
            handleSkinCarouselSkins: function (e) {
              this.set(
                "carouselSkins",
                (e || []).filter((e) => !e.disabled),
              );
              const t = this.get("viewSkin.id")
                ? this.get("viewSkin.id")
                : this.get("selectedSkinId");
              let n = this.getSkin(t);
              n?.productType === a.skinProductTypes.kTieredSkin &&
                (n = this.getMostProgressedSkin(n)),
                this.setViewSkin(n),
                this.updateParentSkinIdToSelectedChromaIdMap(n);
            },
            handleSkinSelectorInfo: function (e) {
              const t = this.getSkin(e && e.selectedSkinId);
              this.setProperties(e),
                this.setViewSkin(t),
                this.updateParentSkinIdToSelectedChromaIdMap(t);
            },
            getSkin: function (e) {
              const t = this.get("carouselSkins") || [];
              for (let n = 0; n < t.length; n++) {
                const i = t[n];
                if (i.id === e) return i;
                const s = (i.childSkins || []).find((t) => t.id === e);
                if (s && s.id) return s;
              }
            },
            setViewSkin: function (e) {
              this.set("viewSkin", e),
                e !== this.get("rootViewSkin") &&
                  this.sendAction("selectViewSkin", e);
            },
            requestSetSkin: function (e) {
              o.default
                .ajax({
                  url: "/lol-champ-select/v1/session/my-selection",
                  contentType: "application/json",
                  data: JSON.stringify({ selectedSkinId: e.id }),
                  method: "PATCH",
                  errorMessage: "error_could_not_set_skin",
                })
                .then(() => {
                  this.recordDidRequestSucceed &&
                    this.recordDidRequestSucceed(!0),
                    s.Telemetry.endTracingEvent("champ-select-skin-select");
                })
                .catch((e) => {
                  this.recordDidRequestSucceed &&
                    this.recordDidRequestSucceed(!1, e);
                });
            },
            updateParentSkinIdToSelectedChromaIdMap(e) {
              if (!e) return;
              const t = e.parentSkinId || e.id;
              this.parentSkinIdToSelectedChromaIdMap[t] = e.id;
            },
            getSelectedChromaForSkin: function (e) {
              return e &&
                this.parentSkinIdToSelectedChromaIdMap[e.id] &&
                this.parentSkinIdToSelectedChromaIdMap[e.id] !== e.id
                ? this.getSkin(this.parentSkinIdToSelectedChromaIdMap[e.id])
                : e;
            },
            setSkin: function (e) {
              this.get("allowSkinSelection") &&
                (s.Telemetry.startTracingEvent("champ-select-skin-select"),
                this.setViewSkin(e),
                e.unlocked &&
                  e.id !== this.get("selectedSkinId") &&
                  this.debounceTask("requestSetSkin", e, 500));
            },
            getMostProgressedSkin: function (e) {
              return e?.childSkins?.reduce?.(
                (e, t) => (t.ownership.owned ? t : e),
                e.childSkins[0],
              );
            },
            actions: {
              setSkinThroughChromaModal: function (e) {
                e.productType === a.skinProductTypes.kTieredSkin
                  ? (e = this.getMostProgressedSkin(e))
                  : this.updateParentSkinIdToSelectedChromaIdMap(e),
                  this.setSkin(e);
              },
              setSkinThroughScroll: function (e) {
                (e =
                  e.productType === a.skinProductTypes.kTieredSkin
                    ? this.getMostProgressedSkin(e)
                    : this.getSelectedChromaForSkin(e)),
                  this.setSkin(e);
              },
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "DWSWXgXj",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\skin-select-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\skin-select-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\skin-select-component\\\\index.js\\" "],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",[["helper",["if"],[["get",["isShowingGrid"]],"hidden"],null]]]],["flush-element"],["text","\\n  "],["append",["helper",["skin-name"],null,[["skin","shouldShowChestAvailability","championChestAvailabilityMap"],[["get",["viewSkin"]],["get",["shouldShowChestAvailability"]],["get",["championChestAvailabilityMap"]]]]],false],["text","\\n\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["skin-carousel-visibility-wrapper ",["helper",["if"],[["get",["skinSelectionDisabled"]],"hidden","visible"],null]]]],["flush-element"],["text","\\n    "],["append",["helper",["skin-carousel"],null,[["carouselSkins","selectedSkinId","selectedChampionId","championName","allowSkinSelection","isSkinGrantedFromBoost","disabled","jmxSettings","map","rootComponentShown","rootViewSkin","setSkinThroughScroll","setSkinThroughChromaModal","uxSettings","viewSkin","ip","rp","timer","isSkinSelectVisible","UseNewLoyaltyIcon","parentSkinIdToSelectedChromaIdMap"],[["get",["carouselSkins"]],["get",["selectedSkinId"]],["get",["selectedChampionId"]],["get",["championName"]],["get",["allowSkinSelection"]],["get",["isSkinGrantedFromBoost"]],["get",["isUILockedForGameStart"]],["get",["jmxSettings"]],["get",["map"]],["get",["rootComponentShown"]],["get",["rootViewSkin"]],"setSkinThroughScroll","setSkinThroughChromaModal",["get",["uxSettings"]],["get",["viewSkin"]],["get",["ip"]],["get",["rp"]],["get",["timer"]],["get",["isSkinSelectVisible"]],["get",["UseNewLoyaltyIcon"]],["get",["parentSkinIdToSelectedChromaIdMap"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["showRerollButton"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["reroll-button"],null,[["summoner","tbAllowRerolling","tbRerollsRemaining","disabled","recordDidRequestSucceed"],[["get",["summoner"]],["get",["tbAllowRerolling"]],["get",["tbRerollsRemaining"]],["get",["rerollsDisabled"]],["get",["recordDidRequestSucceed"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(1),
          s = n(120),
          o = n(60);
        n(208);
        const { RunMixin: a } = i.EmberAddons.EmberLifeline,
          r = i.UiKitPlugin.getTemplateHelper(),
          l = "championTradeToggleTooltipSeen",
          c = ".summoner-object.left:not(.is-self) .champion-icons .svg-icon",
          m = "positionSwapToggleTooltipSeen",
          u = ".position-swap-button";
        e.exports = i.Ember.Component.extend(a, {
          layout: n(209),
          classNames: ["summoner-array"],
          classNameBindings: [
            "isLeft:your-party:enemy-party",
            "showChestAvailabilityHintedPortraits:show-chest-availability-hinted-portraits",
            "shouldAlignTop:align-summoners-top",
          ],
          settingsService: (0, i.DataBinding)(
            "/lol-settings",
            (0, i.getProvider)().getSocket(),
          ),
          init: function () {
            this._super(...arguments),
              this.get("settingsService").observe(
                "/v2/ready",
                this,
                this.handleSettingsReady,
              );
          },
          didUpdateAttrs: function () {
            this._super(...arguments),
              this.tooltipSettingsReady &&
                this.shouldShowReportAndMutingTooltip() &&
                this.maybeShowReportAndMutingTooltip(),
              this.tooltipSettingsReady &&
                this.shouldShowChampTradeTooltip() &&
                this.initChampTradeTooltip(),
              this.tooltipSettingsReady &&
                this.get("pickOrderSwappingEnabled") &&
                this.shouldShowPickOrderSwapTooltip() &&
                this.initPickOrderSwapTooltip();
          },
          shouldShowChampTradeTooltip: function () {
            return (
              this.get("isLeft") &&
              !this.champTradeTooltipShown &&
              this.get("timer.inFinalizationPhase") &&
              !this.get("isCustomGame") &&
              !this.get("showPositionAssignment") &&
              this.get("ChampTradingTooltipEnabled") &&
              this.get("team.length") > 1
            );
          },
          shouldShowPickOrderSwapTooltip: function () {
            return (
              this.get("isLeft") &&
              !this.positionSwapTooltipShown &&
              this.get("timer.inBanPickPhase") &&
              !this.get("isCustomGame") &&
              !this.get("showPositionAssignment") &&
              this.get("PickOrderSwappingTooltipEnabled") &&
              this.get("team.length") > 1
            );
          },
          handleChampSelectSummoner: function (e, t) {
            this.summonerBySlotId[t].setProperties(e);
          },
          handleSettingsReady: function (e) {
            this.tooltipSettingsReady = e;
          },
          initChampTradeTooltip: function () {
            return (0, s.getAccountSetting)(l).then((e) => {
              const t = Boolean(e && e.value);
              if (
                (this.assignChampTradeTooltip(),
                (this.champTradeTooltipShown = !0),
                !t)
              )
                return (
                  this.showChampTradeTooltip(), (0, s.saveAccountSetting)(l, !0)
                );
            });
          },
          showChampTradeTooltip: function () {
            const e = this.element.querySelector(c);
            e &&
              (i.TooltipManager.show(e),
              this.runTask(() => {
                i.TooltipManager.hide(e),
                  this.runTask(() => {
                    const e = this.get("tooltipTitleElement");
                    e && e.classList.add("hidden");
                  }, 500);
              }, 1e4));
          },
          assignChampTradeTooltip: function () {
            const e = this.element.querySelector(c);
            if (!e) return;
            this.set("tooltipContainerElement", e);
            const t = document.createElement("lol-uikit-tooltip"),
              n = r.contentBlockTooltipAttention(
                this.get("tra.champ_trade_new_tooltip"),
              ),
              s = document.createElement("div");
            (s.innerHTML = this.get("tra.champ_trade_tooltip_header")),
              (s.className = ".champ-trade-tooltip-title"),
              this.set("tooltipTitleElement", s),
              n.prepend(s),
              t.appendChild(n),
              i.TooltipManager.assign(e, t, null, {
                type: "attention",
                targetAnchor: { x: "right", y: "center" },
                tooltipAnchor: { x: "left", y: "center" },
                offset: { x: 14, y: 0 },
              }),
              i.TooltipManager.hide(e);
          },
          initPickOrderSwapTooltip: function () {
            return (0, s.getAccountSetting)(m).then((e) => {
              const t = Boolean(e && e.value);
              if (
                (this.assignPickOrderSwapTooltip(),
                (this.positionSwapTooltipShown = !0),
                !t)
              )
                return (
                  this.showPickOrderSwapTooltip(),
                  (0, s.saveAccountSetting)(m, !0)
                );
            });
          },
          showPickOrderSwapTooltip: function () {
            const e = this.element.querySelector(u);
            e &&
              (i.TooltipManager.show(e),
              this.runTask(() => {
                i.TooltipManager.hide(e),
                  this.runTask(() => {
                    const e = this.get("tooltipTitleElement");
                    e && e.classList.add("hidden");
                  }, 500);
              }, 1e4));
          },
          assignPickOrderSwapTooltip: function () {
            const e = this.element.querySelector(u);
            if (!e) return;
            this.set("tooltipContainerElement", e);
            const t = document.createElement("lol-uikit-tooltip"),
              n = r.contentBlockTooltipAttention(
                this.get("tra.position_swap_new_tooltip"),
              ),
              s = document.createElement("div");
            (s.innerHTML = this.get("tra.pick_order_swap_tooltip_header")),
              (s.className = ".pick-order-swapping-tooltip-title"),
              this.set("tooltipTitleElement", s),
              n.prepend(s),
              t.appendChild(n),
              i.TooltipManager.assign(e, t, null, {
                type: "attention",
                targetAnchor: { x: "right", y: "center" },
                tooltipAnchor: { x: "left", y: "center" },
                offset: { x: 14, y: 0 },
              }),
              i.TooltipManager.hide(e);
          },
          maybeShowReportAndMutingTooltip() {
            return (0, s.getAccountSetting)("reportAndMutingTooltipShown").then(
              (e) => {
                if (((this._reportAndMutingTooltipShown = !0), !e))
                  return (
                    window.requestAnimationFrame(() =>
                      this.showReportAndMutingTooltip(),
                    ),
                    (0, s.saveAccountSetting)("reportAndMutingTooltipShown", !0)
                  );
              },
            );
          },
          shouldShowReportAndMutingTooltip: function () {
            const e =
              this.get("timer.totalTimeInPhase") / 1e3 -
                this.get("timer.timeRemaining") >
              this.get("timeBeforeShowingReportingTooltipSeconds");
            return (
              this.get("isLeft") &&
              !this._reportAndMutingTooltipShown &&
              (this.get("timer.inBanPickPhase") ||
                this.get("timer.inPlanningPhase") ||
                this.get("timer.inFinalizationPhase")) &&
              e &&
              !this.get("isCustomGame") &&
              !this.get("showPositionAssignment") &&
              this.get("team.length") > 1 &&
              this.get(
                "jmxSettings.LcuChampionSelect.ChampSelectMutingEnabled",
              ) &&
              this.get("jmxSettings.LcuChampionSelect.ReportingEnabled")
            );
          },
          showReportAndMutingTooltip: function () {
            const e = this.element.querySelector(
              ".summoner-object.left:not(.is-self) .summoner-overlay-buttons-container",
            );
            if (!e) return;
            const t = document.createElement("lol-uikit-tooltip");
            t.appendChild(
              r.contentBlockTooltipAttention(
                this.get("tra.csr_report_and_mute_in_cs_tooltip"),
              ),
            );
            const n = 1e3 * this.get("timeBeforeHidingReportingTooltipSeconds");
            i.TooltipManager.assign(e, t, null, {
              type: "attention",
              targetAnchor: { x: "right", y: "center" },
              tooltipAnchor: { x: "left", y: "center" },
            }),
              this.runTask(() => {
                i.TooltipManager.unassign(e);
              }, n);
          },
          timeBeforeShowingReportingTooltipSeconds: i.Ember.computed(
            "jmxSettings.LcuChampionSelect.TimeBeforeShowingReportingTooltipSeconds",
            function () {
              const e = this.get(
                "jmxSettings.LcuChampionSelect.TimeBeforeShowingReportingTooltipSeconds",
              );
              return e || o.DURATIONS.timeBeforeShowingReportingTooltipSec;
            },
          ),
          timeBeforeHidingReportingTooltipSeconds: i.Ember.computed(
            "jmxSettings.LcuChampionSelect.TimeBeforeHidingReportingTooltipSeconds",
            function () {
              const e = this.get(
                "jmxSettings.LcuChampionSelect.TimeBeforeHidingReportingTooltipSeconds",
              );
              return e || o.DURATIONS.timeBeforeHidingReportingTooltipSec;
            },
          ),
          shouldShow: i.Ember.computed.or("isLeft", "timer.notInPlanningPhase"),
          timerCellId: i.Ember.computed(
            "timer.inPlanningPhase",
            "currentSummoner.cellId",
            "sessionActions.allPlayersActTogether",
            "sessionActions.currentActingCells",
            "thisTeamActiveCells",
            function () {
              const e = this.get("timer.inPlanningPhase"),
                t = this.get("thisTeamMinCellId");
              if (e || this.get("sessionActions.allPlayersActTogether"))
                return this.get("currentSummoner.cellId") - t;
              const n = this.get("thisTeamActiveCells");
              if (!n || !n.length) return 0;
              return n.map((e) => e - t).reduce((e, t) => e + t, 0) / n.length;
            },
          ),
          hasActiveAction: i.Ember.computed.notEmpty(
            "sessionActions.activeAction",
          ),
          inFinalizationPhase: i.Ember.computed.alias(
            "timer.inFinalizationPhase",
          ),
          notMyTeam: i.Ember.computed.not("isLeft"),
          thisTeamCellIds: i.Ember.computed.map("team", function (e) {
            return e.get("cellId");
          }),
          thisTeamMinCellId: i.Ember.computed("thisTeamCellIds", function () {
            return Math.min.apply(null, this.get("thisTeamCellIds"));
          }),
          thisTeamActiveCells: i.Ember.computed(
            "sessionActions.currentActingCells",
            "thisTeamCellIds",
            function () {
              const e = this.get("thisTeamCellIds"),
                t = this.get("sessionActions.currentActingCells");
              return e && t ? t.filter((t) => e.includes(t)) : [];
            },
          ),
          pickOrderSwappingEnabled: i.Ember.computed(
            "timer.inPlanningPhase",
            "timer.inBanPickPhase",
            "timerDisabledPickOrderSwap",
            "showPositionAssignment",
            "currentSummoner.isDonePicking",
            function () {
              return (
                (this.get("timer.inPlanningPhase") ||
                  this.get("timer.inBanPickPhase")) &&
                !this.get("timerDisabledPickOrderSwap") &&
                !this.get("showPositionAssignment") &&
                !this.get("currentSummoner.isDonePicking")
              );
            },
          ),
          inPlanningButNotMyTeam: i.Ember.computed.and(
            "timer.inPlanningPhase",
            "notMyTeam",
          ),
          inBanPickSimulButNotMyTeam: i.Ember.computed.and(
            "timer.inBanPickPhase",
            "notMyTeam",
            "sessionActions.allPlayersActTogether",
          ),
          thisTeamHasNoActiveAction: i.Ember.computed(
            "timer.inBanPickPhase",
            "thisTeamActiveCells.length",
            "hasActiveAction",
            function () {
              return (
                this.get("timer.inBanPickPhase") &&
                (!this.get("thisTeamActiveCells.length") ||
                  !this.get("hasActiveAction"))
              );
            },
          ),
          simulActAndMyActionComplete: i.Ember.computed(
            "sessionActions.allPlayersActTogether",
            "currentSummoner.isActingNow",
            function () {
              return (
                this.get("sessionActions.allPlayersActTogether") &&
                !this.get("currentSummoner.isActingNow")
              );
            },
          ),
          hideSummonerTimer: i.Ember.computed(
            "showPositionAssignment",
            "isPlayingSimulBanOutro",
            "timer.inBanPickPhase",
            "timer.inPlanningPhase",
            "inPlanningButNotMyTeam",
            "inBanPickSimulButNotMyTeam",
            "thisTeamHasNoActiveAction",
            "simulActAndMyActionComplete",
            function () {
              return (
                this.get("showPositionAssignment") ||
                this.get("isPlayingSimulBanOutro") ||
                !(
                  this.get("timer.inBanPickPhase") ||
                  this.get("timer.inPlanningPhase")
                ) ||
                this.get("inPlanningButNotMyTeam") ||
                this.get("inBanPickSimulButNotMyTeam") ||
                this.get("thisTeamHasNoActiveAction") ||
                this.get("simulActAndMyActionComplete") ||
                !!this.get("gameModeSubteamData")
              );
            },
          ),
          shouldAlignTop: i.Ember.computed(
            "summoners.length",
            "summoners.@each.isPlaceholder",
            function () {
              return (
                this.get("summoners").filter((e) => !e.isPlaceholder).length >
                o.STANDARD_MAX_TEAM_SIZE
              );
            },
          ),
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "ePGvMsGT",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\summoner-array-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\summoner-array-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\summoner-array-component\\\\index.js\\" "],["text","\\n"],["open-element","span",[]],["dynamic-attr","class",["concat",["first-pick ",["helper",["if"],[["get",["showFirstPick"]],"visible","removed"],null]]]],["flush-element"],["append",["unknown",["tra","first_pick"]],false],["close-element"],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["party ",["helper",["if"],[["get",["shouldShow"]],"visible","hidden"],null]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["summoners"]]],null,0],["text","  "],["open-element","div",[]],["static-attr","class","summoner-timer-wrapper"],["flush-element"],["text","\\n    "],["append",["helper",["summoner-timer"],null,[["isInfinite","timerCellId","hideSummonerTimer","formattedTime","isMyTeam"],[["get",["timer","isInfinite"]],["get",["timerCellId"]],["get",["hideSummonerTimer"]],["get",["formattedTime"]],["get",["isLeft"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["summoner-wrapper ",["helper",["if"],[["get",["summoner","isPlaceholder"]],"removed","visible"],null]," ",["helper",["if"],[["get",["isLeft"]],"left","right"],null]]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["lines ",["helper",["if"],[["get",["showPositionAssignment"]],"hidden","visible"],null]]]],["flush-element"],["close-element"],["text","\\n      "],["append",["helper",["summoner-object"],null,[["team","summoner","currentSummonerChampionName","pickOrderSwappingEnabled","inFinalizationPhase","activeSwap","activeTrade","summonerId","gameModeSubteamData","uxSettings","jmxSettings","showPositionAssignment","isLeft","viewSkin","championChestAvailabilityMap","shouldShowChestAvailability","boosterSummonerId","isUILockedForGameStart","isCustomGame","recordDidRequestSucceed"],[["get",["team"]],["get",["summoner"]],["get",["currentSummoner","champion","name"]],["get",["pickOrderSwappingEnabled"]],["get",["inFinalizationPhase"]],["get",["activeSwap"]],["get",["activeTrade"]],["get",["summoner","summonerId"]],["get",["gameModeSubteamData"]],["get",["uxSettings"]],["get",["jmxSettings"]],["get",["showPositionAssignment"]],["get",["isLeft"]],["get",["viewSkin"]],["get",["championChestAvailabilityMap"]],["get",["shouldShowChestAvailability"]],["get",["boosterSummonerId"]],["get",["isUILockedForGameStart"]],["get",["isCustomGame"]],["get",["recordDidRequestSucceed"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["summoner"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(1),
          s = a(n(66)),
          o = a(n(72));
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        n(211);
        const { DomMixin: r } = i.EmberAddons.EmberLifeline,
          l = "COMMS_ABUSE_TEXT",
          c = [l, "SABOTAGING_TEAM", "DISRESPECTFUL_BEHAVIOR", "OTHER"],
          m = n(212)[0][1],
          u = i.UiKitPlugin.getContextMenuManager();
        e.exports = i.Ember.Component.extend(r, o.default, {
          layout: n(215),
          classNames: ["summoner-overlay"],
          classNameBindings: ["isContextMenuOpened:show"],
          chatPublisherService: i.Ember.inject.service("chat-publisher"),
          playerReportService: i.Ember.inject.service("player-report"),
          hasReported: !1,
          isContextMenuOpened: !1,
          init: function () {
            this._super(...arguments),
              (this._contextMenuCloseListener = () =>
                this.set("isContextMenuOpened", !1)),
              u.addCloseListener(this._contextMenuCloseListener);
          },
          willDestroyElement() {
            this._super(...arguments),
              u.removeCloseListener(this._contextMenuCloseListener);
          },
          didReceiveAttrs: function () {
            this._super(...arguments);
            const e = this.get("displayName"),
              t = this.get("puuid"),
              n = this.get("obfuscatedPuuid");
            (e === this._prevDisplayName &&
              t === this._prevPuuid &&
              n === this._prevObfuscatedPuuid) ||
              this.set("hasReported", !1),
              (this._prevDisplayName = e),
              (this._prevPuuid = t),
              (this._prevObfuscatedPuuid = n);
          },
          reportButtonTooltipDescription: i.Ember.computed(
            "hasReported",
            function () {
              return this.get("hasReported")
                ? this.get("tra.csr_button_report_sent")
                : this.get("tra.csr_button_report_description");
            },
          ),
          reportMenuItems: i.Ember.computed(
            "displayName",
            "puuid",
            "obfuscatedPuuid",
            "jmxSettings.LcuChampionSelect.ReportCategories",
            function () {
              const e = [],
                t =
                  this.get("jmxSettings.LcuChampionSelect.ReportCategories") ||
                  c;
              e.push({
                element: this._createMenuHeaderElement(this.get("displayName")),
                disabled: !0,
              });
              for (let n = 0; n < t.length; n++)
                e.push({
                  action: function () {
                    this.send("submitReport", t[n]);
                  },
                  target: this,
                  element: this._createMenuItemElement(
                    t[n],
                    n === t.length - 1,
                  ),
                });
              return e;
            },
          ),
          _createMenuHeaderElement(e) {
            const t = document.createElement("div");
            t.classList.add("context-menu-header");
            const n = document.createElement("div");
            n.classList.add("title"),
              (n.innerHTML = this.get("tra").formatString(
                "csr_context_menu_header",
                { name: e },
              ));
            const i = document.createElement("div");
            return (
              i.classList.add("separator"),
              t.appendChild(n),
              t.appendChild(i),
              t
            );
          },
          _createMenuItemElement(e, t) {
            const n = document.createElement("div");
            n.classList.add("context-menu-item");
            const i = document.createElement("div");
            i.classList.add("title");
            const s = (e || "").toLowerCase();
            if (
              ((i.innerHTML = this.get(`tra.csr_report_category_${s}`)),
              n.appendChild(i),
              !t)
            ) {
              const e = document.createElement("div");
              e.classList.add("separator"), n.appendChild(e);
            }
            return n;
          },
          actions: {
            toggleMute() {
              const e = this.get("isMuted"),
                t = e ? "csr_unmuted" : "csr_muted",
                n = this.get("tra").formatString(t, {
                  name: this.get("displayName"),
                });
              this.get("chatPublisherService").sendChatMessage(n);
              const o = this.get("summonerId"),
                a = this.get("puuid") || "",
                r = this.get("obfuscatedSummonerId"),
                l = this.get("obfuscatedPuuid") || "";
              return (
                i.Telemetry.sendEvent(
                  "champ_select_toggle_player_muted_clicked",
                  e ? 1 : 0,
                ),
                s.default
                  .ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: "/lol-champ-select/v1/toggle-player-muted",
                    data: JSON.stringify({
                      summonerId: o,
                      puuid: a,
                      obfuscatedSummonerId: r,
                      obfuscatedPuuid: l,
                    }),
                    errorMessage: t + "_error",
                  })
                  .then(() => {
                    this.recordDidRequestSucceed &&
                      this.recordDidRequestSucceed(!0);
                  })
                  .catch((e) => {
                    this.recordDidRequestSucceed &&
                      this.recordDidRequestSucceed(!1, e);
                  })
              );
            },
            showReportContextMenu() {
              if (this.get("hasReported")) return;
              const e = this.get("reportMenuItems");
              e &&
                e.length &&
                (u.setCustomMenuItems(e, {
                  css: m,
                  menuClass: "champ-select-reporting-menu",
                }),
                u.openAtEvent(event),
                this.set("isContextMenuOpened", !0));
            },
            submitReport(e) {
              const t = this.get("playerReportService"),
                n = this.get("isMuted");
              if (!t || !t.sendPlayerReport) return;
              const i = this.get("tra").formatString("csr_report_submitted", {
                  name: this.get("displayName"),
                }),
                s = {
                  offenderPuuid: this.get("puuid"),
                  obfuscatedOffenderPuuid: this.get("obfuscatedPuuid"),
                  gameId: this.get("session.gameId"),
                  categories: [e],
                  offenderSummonerId: this.get("summonerId"),
                };
              t.sendPlayerReport(s).then(
                () => {
                  this.recordDidRequestSucceed &&
                    this.recordDidRequestSucceed(!0),
                    this.get("chatPublisherService").sendChatMessage(i),
                    this.set("hasReported", !0);
                },
                (e) => {
                  this.recordDidRequestSucceed &&
                    this.recordDidRequestSucceed(!1, e);
                },
              ),
                e !== l || n || this.send("toggleMute");
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        var i = n(213),
          s = n(214)(i);
        s.push([
          e.id,
          '.champ-select-reporting-menu .context-menu-header .title h5 {\n  font-family: var(--font-display);\n}\n.champ-select-reporting-menu .context-menu-header,\n.champ-select-reporting-menu .context-menu-item {\n  font-family: var(--font-body);\n}\n.champ-select-reporting-menu .context-menu-header,\n.champ-select-reporting-menu .context-menu-header .title h5,\n.champ-select-reporting-menu .context-menu-item {\n  -webkit-user-select: none;\n}\n.champ-select-reporting-menu .context-menu-header,\n.champ-select-reporting-menu .context-menu-header .title h5,\n.champ-select-reporting-menu .context-menu-item {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n.champ-select-reporting-menu .context-menu-header .title h5 {\n  text-transform: uppercase;\n}\n.champ-select-reporting-menu .context-menu-header .title h5:lang(ko-kr),\n.champ-select-reporting-menu .context-menu-header .title h5:lang(ja-jp),\n.champ-select-reporting-menu .context-menu-header .title h5:lang(tr-tr),\n.champ-select-reporting-menu .context-menu-header .title h5:lang(el-gr),\n.champ-select-reporting-menu .context-menu-header .title h5:lang(th-th),\n.champ-select-reporting-menu .context-menu-header .title h5:lang(zh-tw) {\n  text-transform: none;\n}\n.champ-select-reporting-menu .context-menu-header .title h5 {\n  color: #f0e6d2;\n  font-size: 14px;\n  font-weight: 700;\n  line-height: 18px;\n  letter-spacing: 0.075em;\n}\n.champ-select-reporting-menu .context-menu-header .title h5:lang(ar-ae) {\n  letter-spacing: 0;\n}\n.champ-select-reporting-menu .context-menu-header,\n.champ-select-reporting-menu .context-menu-item {\n  color: #a09b8c;\n  font-size: 12px;\n  font-weight: normal;\n  line-height: 16px;\n  letter-spacing: 0.025em;\n  -webkit-font-smoothing: subpixel-antialiased;\n}\n.champ-select-reporting-menu .context-menu-header:lang(ja-jp),\n.champ-select-reporting-menu .context-menu-item:lang(ja-jp) {\n  font-size: 13px;\n}\n.champ-select-reporting-menu .context-menu-header:lang(ar-ae),\n.champ-select-reporting-menu .context-menu-item:lang(ar-ae) {\n  letter-spacing: 0;\n}\n.champ-select-reporting-menu {\n  user-select: none;\n  -webkit-user-select: none;\n  cursor: default;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  min-width: 127px;\n  z-index: 10;\n  box-sizing: border-box;\n  background-color: #010a13;\n  box-shadow: 0 0 1px #000, 0 0 1px #000;\n  border: 1px solid #463714;\n  outline: none;\n}\n.champ-select-reporting-menu:lang(ar-ae) {\n  direction: rtl;\n}\n.champ-select-reporting-menu .context-menu-header {\n  padding-left: 10px;\n  min-width: calc(100% - 10px);\n  width: -webkit-max-content;\n}\n.champ-select-reporting-menu .context-menu-header:lang(ar-ae) {\n  padding-left: 0px;\n  padding-right: 10px;\n}\n.champ-select-reporting-menu .context-menu-header .title {\n  color: #f0e6d2;\n  display: inline-block;\n  padding: 10px 10px 2px 0;\n}\n.champ-select-reporting-menu .context-menu-header .title:lang(ar-ae) {\n  padding: 10px 0px 2px 10px;\n}\n.champ-select-reporting-menu .context-menu-header .title h5 {\n  margin: 0;\n  white-space: nowrap;\n}\n.champ-select-reporting-menu .context-menu-header .separator {\n  border: 0;\n  height: 1px;\n  background-color: #1e2328;\n  margin: 5px 0 0 -10px;\n}\n.champ-select-reporting-menu .context-menu-header .separator:lang(ar-ae) {\n  margin: 5px -10px 0 0;\n}\n.champ-select-reporting-menu .context-menu-item {\n  display: block;\n  outline: none;\n  min-width: 100%;\n  width: -webkit-max-content;\n  height: 30px;\n  line-height: 30px;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0 10px;\n  border: none;\n  background: none;\n  white-space: nowrap;\n  overflow: visible;\n  text-overflow: ellipsis;\n  text-align: left;\n  position: relative;\n}\n.champ-select-reporting-menu .context-menu-item:lang(ar-ae) {\n  text-align: right;\n}\n.champ-select-reporting-menu .context-menu-item .title {\n  color: #a09b8c;\n}\n.champ-select-reporting-menu .context-menu-item div {\n  vertical-align: middle;\n}\n.champ-select-reporting-menu .context-menu-item .separator {\n  border: 0;\n  height: 1px;\n  background-color: #1e2328;\n  margin: 0 -10px 0 -10px;\n}\n.champ-select-reporting-menu .context-menu-item:not(.disabled):hover {\n  background: #1e2328;\n  color: #f0e6d2;\n  cursor: pointer;\n}\n.champ-select-reporting-menu .context-menu-item:active {\n  color: #cdbe91;\n}\n',
          "",
        ]),
          (e.exports = s);
      },
      (e) => {
        "use strict";
        e.exports = function (e) {
          return e[1];
        };
      },
      (e) => {
        "use strict";
        e.exports = function (e) {
          var t = [];
          return (
            (t.toString = function () {
              return this.map(function (t) {
                var n = "",
                  i = void 0 !== t[5];
                return (
                  t[4] && (n += "@supports (".concat(t[4], ") {")),
                  t[2] && (n += "@media ".concat(t[2], " {")),
                  i &&
                    (n += "@layer".concat(
                      t[5].length > 0 ? " ".concat(t[5]) : "",
                      " {",
                    )),
                  (n += e(t)),
                  i && (n += "}"),
                  t[2] && (n += "}"),
                  t[4] && (n += "}"),
                  n
                );
              }).join("");
            }),
            (t.i = function (e, n, i, s, o) {
              "string" == typeof e && (e = [[null, e, void 0]]);
              var a = {};
              if (i)
                for (var r = 0; r < this.length; r++) {
                  var l = this[r][0];
                  null != l && (a[l] = !0);
                }
              for (var c = 0; c < e.length; c++) {
                var m = [].concat(e[c]);
                (i && a[m[0]]) ||
                  (void 0 !== o &&
                    (void 0 === m[5] ||
                      (m[1] = "@layer"
                        .concat(m[5].length > 0 ? " ".concat(m[5]) : "", " {")
                        .concat(m[1], "}")),
                    (m[5] = o)),
                  n &&
                    (m[2]
                      ? ((m[1] = "@media "
                          .concat(m[2], " {")
                          .concat(m[1], "}")),
                        (m[2] = n))
                      : (m[2] = n)),
                  s &&
                    (m[4]
                      ? ((m[1] = "@supports ("
                          .concat(m[4], ") {")
                          .concat(m[1], "}")),
                        (m[4] = s))
                      : (m[4] = "".concat(s))),
                  t.push(m));
              }
            }),
            t
          );
        };
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "Eh0XeQpK",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\summoner-overlay-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\summoner-overlay-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\summoner-overlay-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","summoner-overlay-background"],["flush-element"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","summoner-overlay-buttons-container"],["flush-element"],["text","\\n  "],["open-element","button",[]],["dynamic-attr","class",["concat",["overlay-button ",["helper",["unless"],[["get",["jmxSettings","LcuChampionSelect","ChampSelectMutingEnabled"]],"removed"],null]," ",["helper",["if"],[["get",["isMuted"]],"unmute","mute"],null]]]],["modifier",["action"],[["get",[null]],"toggleMute"]],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],1],["text","  "],["close-element"],["text","\\n\\n  "],["open-element","button",[]],["dynamic-attr","class",["concat",["overlay-button report ",["helper",["unless"],[["get",["isReportingEnabled"]],"removed"],null]," ",["helper",["if"],[["get",["hasReported"]],"disabled"],null]]]],["modifier",["action"],[["get",[null]],"showReportContextMenu"]],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["reportButtonTooltipDescription"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["helper",["if"],[["get",["isMuted"]],["get",["tra","csr_button_unmute_description"]],["get",["tra","csr_button_mute_description"]]],null],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i,
          s = n(1),
          o = (i = n(217)) && i.__esModule ? i : { default: i };
        n(218);
        e.exports = s.Ember.Component.extend({
          layout: n(219),
          classNames: ["summoner-object"],
          classNameBindings: [
            "isLeft:left:right",
            "isPickingNow:is-picking-now",
            "summoner.isSelf",
            "isBanningNow:is-banning-now",
            "summoner.areSummonerActionsComplete:actions-complete",
            "showIntroAnimation:intro-animation",
            "summoner.pickSnipedClass",
            "summoner.shouldShowSelectedSkin:skin-showcase-active",
            "slotIdClass",
            "showSubteamSeparator:showing-subteam-separator",
          ],
          summonerInfoService: s.Ember.inject.service("summoner-info"),
          didReceiveAttrs: function () {
            this._super(...arguments);
          },
          displayName: s.Ember.computed.alias("summoner.displayName"),
          summonerId: s.Ember.computed.alias("summoner.summonerId"),
          isPickingNow: s.Ember.computed.equal(
            "summoner.activeActionType",
            "pick",
          ),
          isBanningNow: s.Ember.computed.equal(
            "summoner.activeActionType",
            "ban",
          ),
          slotIdClass: s.Ember.computed("summoner.slotId", function () {
            return `slot-id-${this.get("summoner.slotId")}`;
          }),
          showIntroAnimation: s.Ember.computed(
            "summoner.isPlaceholder",
            "isLeft",
            "showPositionAssignment",
            function () {
              return (
                this.get("isLeft") &&
                !this.get("summoner.isPlaceholder") &&
                this.get("showPositionAssignment")
              );
            },
          ),
          animateActingNowIntro: s.EmberHelpers.delayed(
            "summoner.isActingNow",
            600,
          ),
          showSummonerActing: s.Ember.computed(
            "animateActingNowIntro",
            "summoner.isActingNow",
            function () {
              return (
                this.get("animateActingNowIntro") &&
                this.get("summoner.isActingNow")
              );
            },
          ),
          summonerHasActiveSwap: s.Ember.computed(
            "activeSwap",
            "summoner.swapId",
            function () {
              const e = this.get("activeSwap");
              return (
                e && e.id && -1 !== e.id && e.id === this.get("summoner.swapId")
              );
            },
          ),
          summonerHasActiveTrade: s.Ember.computed(
            "activeTrade",
            "summoner.tradeId",
            function () {
              const e = this.get("activeTrade");
              return (
                e &&
                e.id &&
                -1 !== e.id &&
                e.id === this.get("summoner.tradeId")
              );
            },
          ),
          showPickOrderSwapButton: s.Ember.computed(
            "pickOrderSwappingEnabled",
            "summoner.showSwaps",
            "summoner.isDonePicking",
            "summonerHasActiveSwap",
            "isLeft",
            function () {
              return (
                (this.get("pickOrderSwappingEnabled") &&
                  this.get("summoner.showSwaps") &&
                  !this.get("summoner.isDonePicking") &&
                  this.get("isLeft")) ||
                this.get("summonerHasActiveSwap")
              );
            },
          ),
          showChampionTradeButton: s.Ember.computed(
            "summoner.isSelf",
            "inFinalizationPhase",
            function () {
              return (
                !this.get("summoner.isSelf") && this.get("inFinalizationPhase")
              );
            },
          ),
          voteProjectionText: s.Ember.computed(
            "summoner.currentChampionVotePercentInteger",
            function () {
              const e = this.get("summoner.currentChampionVotePercentInteger");
              return -1 === e
                ? ""
                : 100 === e
                  ? this.get("tra.summoner_team_vote_majority")
                  : this.get("tra").formatString(
                      "summoner_team_vote_percentage",
                      { percentage: e },
                    );
            },
          ),
          positionIconPath: s.Ember.computed(
            "summoner.assignedPosition",
            function () {
              const e = this.get("summoner.assignedPosition");
              if (e) {
                return `/fe/lol-champ-select/svg/position-${e}.svg`;
              }
              return null;
            },
          ),
          isDonePicking: s.Ember.computed.alias("summoner.isDonePicking"),
          statusText: s.Ember.computed(
            "summoner.statusMessageKey",
            function () {
              const e = this.get("summoner.statusMessageKey");
              return e ? this.get(`tra.${e}`) : "";
            },
          ),
          assignedPositionText: s.Ember.computed(
            "summoner.assignedPosition",
            function () {
              const e = this.get("summoner.assignedPosition");
              return e ? this.get(`tra.summoner_assigned_position_${e}`) : "";
            },
          ),
          summonerPrimaryText: s.Ember.computed(
            "isLeft",
            "statusText",
            "assignedPositionText",
            "isDonePicking",
            "summoner.championName",
            function () {
              const e = this.get("assignedPositionText"),
                t = this.get("summoner.championName") || "";
              return this.get("isDonePicking")
                ? t
                : this.get("isLeft")
                  ? "" !== e
                    ? e
                    : t
                  : "";
            },
          ),
          summonerSecondaryText: s.Ember.computed(
            "isLeft",
            "assignedPositionText",
            "statusText",
            "isDonePicking",
            function () {
              return this.get("isDonePicking")
                ? this.get("isLeft")
                  ? this.get("assignedPositionText")
                  : ""
                : this.get("statusText");
            },
          ),
          banMagicVideo: s.Ember.computed(
            "isLeft",
            "summoner.isSelf",
            function () {
              return this.get("summoner.isSelf")
                ? {
                    intro:
                      "fe/lol-champ-select/video/summoner-object/summoner-object-magic-action-gold-intro.webm",
                    idle: "fe/lol-champ-select/video/summoner-object/summoner-object-magic-action-gold-idle.webm",
                    outro:
                      "fe/lol-champ-select/video/summoner-object/summoner-object-magic-action-gold-outro.webm",
                  }
                : this.get("isLeft")
                  ? {
                      intro:
                        "fe/lol-champ-select/video/summoner-object/summoner-object-magic-action-blue-intro.webm",
                      idle: "fe/lol-champ-select/video/summoner-object/summoner-object-magic-action-blue-idle.webm",
                      outro:
                        "fe/lol-champ-select/video/summoner-object/summoner-object-magic-action-blue-outro.webm",
                    }
                  : {
                      intro:
                        "fe/lol-champ-select/video/summoner-object/summoner-object-magic-action-red-intro.webm",
                      idle: "fe/lol-champ-select/video/summoner-object/summoner-object-magic-action-red-idle.webm",
                      outro:
                        "fe/lol-champ-select/video/summoner-object/summoner-object-magic-action-red-outro.webm",
                    };
            },
          ),
          bright: s.Ember.computed(
            "showIntroAnimation",
            "summoner.isDonePicking",
            "isPickingNow",
            function () {
              return (
                this.get("showIntroAnimation") ||
                this.get("summoner.isDonePicking") ||
                this.get("isPickingNow")
              );
            },
          ),
          selectedSkin: s.Ember.computed(
            "summoner.skinId",
            "summoner.skinSplashPath",
            function () {
              return {
                splashPath: this.get("summoner.skinSplashPath"),
                id: this.get("summoner.skinId"),
              };
            },
          ),
          selfThrottledSelectedSkin: s.Ember.computed(
            "viewSkin.unlocked",
            "viewSkin",
            "selectedSkin",
            function () {
              return this.get("viewSkin.unlocked")
                ? this.get("viewSkin")
                : this.get("selectedSkin");
            },
          ),
          otherThrottledSelectedSkin: s.EmberHelpers.throttled(
            "selectedSkin",
            1e3,
          ),
          throttledSelectedSkin: s.Ember.computed(
            "summoner.isSelf",
            "selfThrottledSelectedSkin",
            "otherThrottledSelectedSkin",
            function () {
              return this.get("summoner.isSelf")
                ? this.get("selfThrottledSelectedSkin")
                : this.get("otherThrottledSelectedSkin");
            },
          ),
          skinShowcaseStyle: s.Ember.computed(
            "summoner.shouldShowSelectedSkin",
            "throttledSelectedSkin.id",
            "throttledSelectedSkin.splashPath",
            "summoner.cellId",
            "team.length",
            function () {
              const e = this.get("throttledSelectedSkin.splashPath");
              if (!this.get("summoner.shouldShowSelectedSkin")) return "";
              const t = (function (e, t) {
                const n = 80,
                  i = ((t - 1) * n) / 2 - 256 - e * n;
                return `-webkit-mask-position: 0 0, -1px ${i}px`;
              })(
                this.get("summoner.cellId") || 0,
                (this.get("team") || [null]).length,
              );
              return `${`background-image: url(${e})`}; ${t};${(function (e) {
                let t = "";
                const n = o.default[e];
                n &&
                  (n.x && (t += ` background-position-x: ${n.x};`),
                  n.y && (t += ` background-position-y: ${n.y};`));
                return t;
              })(this.get("throttledSelectedSkin.id"))}`;
            },
          ),
          isReportingEnabled: s.Ember.computed(
            "jmxSettings.LcuChampionSelect.ReportingEnabled",
            "isCustomGame",
            function () {
              return (
                this.get("jmxSettings.LcuChampionSelect.ReportingEnabled") &&
                !this.get("isCustomGame")
              );
            },
          ),
          shouldShowOverlay: s.Ember.computed(
            "jmxSettings.LcuChampionSelect.ChampSelectMutingEnabled",
            "isReportingEnabled",
            "summoner.isSelf",
            "summoner.isOnPlayersTeam",
            "summoner.cellId",
            "gameModeSubteamData",
            function () {
              const e =
                this.get(
                  "jmxSettings.LcuChampionSelect.ChampSelectMutingEnabled",
                ) || this.get("isReportingEnabled");
              let t =
                !this.get("summoner.isSelf") &&
                this.get("summoner.isOnPlayersTeam") &&
                e;
              const n = this._getSubteamData(
                this.get("gameModeSubteamData"),
                this.get("summoner.cellId"),
              );
              return n && (t &= n && n.isLocalSubteam), t;
            },
          ),
          championIconStyle: s.Ember.computed(
            "summoner.championIconStyle",
            function () {
              return this.get("summoner.championIconStyle");
            },
          ),
          showTeamBoostIcon: s.Ember.computed(
            "summonerId",
            "boosterSummonerId",
            function () {
              return (
                this.get("boosterSummonerId") &&
                this.get("summonerId") === this.get("boosterSummonerId")
              );
            },
          ),
          showChampionChestAvailable: s.Ember.computed(
            "shouldShowChestAvailability",
            "summoner.championId",
            "championChestAvailabilityMap",
            function () {
              const e = this.get("summoner.championId"),
                t = this.get("championChestAvailabilityMap");
              return (
                !!(this.get("shouldShowChestAvailability") && e && t) &&
                t.get(e + "")
              );
            },
          ),
          _getSubteamData: function (e, t) {
            if (!e) return !1;
            const n = e.find((e) => e.cellIds.includes(t));
            return n || !1;
          },
          showSubteamSeparator: s.Ember.computed(
            "summoner.cellId",
            "gameModeSubteamData",
            function () {
              const e = this.get("summoner.cellId"),
                t = this._getSubteamData(this.get("gameModeSubteamData"), e);
              return !!t && 0 === t.cellIds.indexOf(e);
            },
          ),
          showSubteamIcon: s.Ember.computed(
            "summoner.cellId",
            "gameModeSubteamData",
            function () {
              const e = this.get("summoner.cellId"),
                t = this._getSubteamData(this.get("gameModeSubteamData"), e);
              return !!t && t.cellIds.indexOf(e) === t.cellIds.length - 1;
            },
          ),
          subteamIconPath: s.Ember.computed(
            "summoner.cellId",
            "gameModeSubteamData",
            function () {
              const e = this._getSubteamData(
                this.get("gameModeSubteamData"),
                this.get("summoner.cellId"),
              );
              return e ? e.display.icon : "";
            },
          ),
        });
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = {
          1e3: { x: "0px", y: "-45px" },
          3003: { x: "0px", y: "-55px" },
          5e3: { x: "0px", y: "-55px" },
          5006: { x: "0px", y: "-45px" },
          6001: { x: "0px", y: "-50px" },
          9e3: { x: "0px", y: "-45px" },
          11001: { x: "0px", y: "-50px" },
          11009: { x: "0px", y: "-50px" },
          11010: { x: "0px", y: "-55px" },
          12e3: { x: "0px", y: "-50px" },
          12008: { x: "0px", y: "-60px" },
          12009: { x: "0px", y: "-60px" },
          13e3: { x: "0px", y: "-55px" },
          13001: { x: "0px", y: "-50px" },
          13003: { x: "0px", y: "-60px" },
          13010: { x: "0px", y: "-50px" },
          16007: { x: "0px", y: "-50px" },
          17004: { x: "0px", y: "-55px" },
          17005: { x: "0px", y: "-50px" },
          17008: { x: "0px", y: "-55px" },
          17015: { x: "0px", y: "-55px" },
          17016: { x: "0px", y: "-55px" },
          17017: { x: "0px", y: "-55px" },
          18e3: { x: "0px", y: "-50px" },
          18001: { x: "0px", y: "-55px" },
          18002: { x: "0px", y: "-50px" },
          18005: { x: "0px", y: "-55px" },
          18011: { x: "0px", y: "-55px" },
          19e3: { x: "0px", y: "-55px" },
          19006: { x: "0px", y: "-45px" },
          19008: { x: "0px", y: "-60px" },
          20002: { x: "0px", y: "-50px" },
          24012: { x: "0px", y: "-65px" },
          24013: { x: "0px", y: "-65px" },
          28002: { x: "0px", y: "-60px" },
          29001: { x: "0px", y: "-55px" },
          29003: { x: "0px", y: "-55px" },
          29006: { x: "0px", y: "-55px" },
          29007: { x: "0px", y: "-55px" },
          29008: { x: "0px", y: "-55px" },
          31006: { x: "0px", y: "-50px" },
          32007: { x: "0px", y: "-55px" },
          33e3: { x: "-25px", y: "-50px" },
          33007: { x: "20px", y: "-55px" },
          34e3: { x: "0px", y: "-60px" },
          34002: { x: "0px", y: "-55px" },
          34007: { x: "0px", y: "-50px" },
          37007: { x: "0px", y: "-55px" },
          41002: { x: "0px", y: "-50px" },
          41008: { x: "0px", y: "-45px" },
          44e3: { x: "0px", y: "-50px" },
          45009: { x: "0px", y: "-45px" },
          51011: { x: "0px", y: "-55px" },
          53020: { x: "0px", y: "-70px" },
          53021: { x: "0px", y: "-70px" },
          54e3: { x: "0px", y: "-65px" },
          54006: { x: "0px", y: "-55px" },
          54007: { x: "0px", y: "-65px" },
          56006: { x: "0px", y: "-45px" },
          57e3: { x: "0px", y: "-45px" },
          57001: { x: "0px", y: "-50px" },
          57002: { x: "0px", y: "-60px" },
          57004: { x: "0px", y: "-55px" },
          57005: { x: "0px", y: "-60px" },
          57006: { x: "0px", y: "-60px" },
          57007: { x: "0px", y: "-55px" },
          58e3: { x: "0px", y: "-45px" },
          58005: { x: "0px", y: "-50px" },
          58006: { x: "0px", y: "-50px" },
          58007: { x: "0px", y: "-45px" },
          58008: { x: "0px", y: "-50px" },
          58009: { x: "0px", y: "-65px" },
          60004: { x: "0px", y: "-55px" },
          60005: { x: "0px", y: "-45px" },
          61006: { x: "0px", y: "-50px" },
          63005: { x: "0px", y: "-45px" },
          63006: { x: "0px", y: "-50px" },
          68002: { x: "0px", y: "-50px" },
          68003: { x: "0px", y: "-50px" },
          69004: { x: "0px", y: "-50px" },
          72002: { x: "0px", y: "-55px" },
          74001: { x: "0px", y: "-50px" },
          74005: { x: "0px", y: "-55px" },
          76005: { x: "0px", y: "-75px" },
          78002: { x: "0px", y: "-55px" },
          78005: { x: "0px", y: "-60px" },
          80006: { x: "0px", y: "-60px" },
          80008: { x: "0px", y: "-50px" },
          83e3: { x: "0px", y: "-50px" },
          85006: { x: "0px", y: "-75px" },
          86e3: { x: "0px", y: "-55px" },
          86001: { x: "0px", y: "-50px" },
          86011: { x: "0px", y: "-60px" },
          89e3: { x: "0px", y: "-50px" },
          89003: { x: "0px", y: "-50px" },
          89004: { x: "0px", y: "-50px" },
          89008: { x: "0px", y: "-70px" },
          89009: { x: "0px", y: "-55px" },
          90006: { x: "0px", y: "-50px" },
          91005: { x: "0px", y: "-60px" },
          92006: { x: "0px", y: "-55px" },
          92016: { x: "0px", y: "-60px" },
          96e3: { x: "0px", y: "-65px" },
          96001: { x: "0px", y: "-65px" },
          96002: { x: "0px", y: "-60px" },
          96007: { x: "0px", y: "-50px" },
          96008: { x: "0px", y: "-60px" },
          96009: { x: "0px", y: "-45px" },
          96010: { x: "0px", y: "-55px" },
          98e3: { x: "0px", y: "-50px" },
          98003: { x: "0px", y: "-55px" },
          102003: { x: "0px", y: "-50px" },
          103004: { x: "0px", y: "-55px" },
          103005: { x: "0px", y: "-50px" },
          103007: { x: "0px", y: "-55px" },
          104007: { x: "0px", y: "-55px" },
          105001: { x: "0px", y: "-50px" },
          105008: { x: "0px", y: "-55px" },
          105009: { x: "0px", y: "-60px" },
          105010: { x: "0px", y: "-80px" },
          106005: { x: "0px", y: "-55px" },
          107008: { x: "0px", y: "-60px" },
          110006: { x: "0px", y: "-55px" },
          111003: { x: "0px", y: "-50px" },
          111004: { x: "0px", y: "-60px" },
          112004: { x: "0px", y: "-60px" },
          114002: { x: "0px", y: "-40px" },
          115e3: { x: "0px", y: "-55px" },
          115001: { x: "0px", y: "-50px" },
          115005: { x: "0px", y: "-60px" },
          117006: { x: "0px", y: "-60px" },
          119006: { x: "0px", y: "-60px" },
          121e3: { x: "0px", y: "-50px" },
          121001: { x: "0px", y: "-50px" },
          121003: { x: "0px", y: "-75px" },
          121004: { x: "0px", y: "-45px" },
          122001: { x: "0px", y: "-50px" },
          126004: { x: "0px", y: "-65px" },
          131003: { x: "0px", y: "-65px" },
          131011: { x: "0px", y: "-50px" },
          133001: { x: "0px", y: "-50px" },
          133004: { x: "0px", y: "-65px" },
          15e4: { x: "0px", y: "-60px" },
          150003: { x: "0px", y: "-60px" },
          157003: { x: "0px", y: "-65px" },
          157009: { x: "0px", y: "-65px" },
          161e3: { x: "0px", y: "-55px" },
          161001: { x: "0px", y: "-50px" },
          161002: { x: "0px", y: "-55px" },
          161003: { x: "0px", y: "-55px" },
          163001: { x: "0px", y: "-55px" },
          164e3: { x: "0px", y: "-60px" },
          201003: { x: "0px", y: "-50px" },
          202001: { x: "0px", y: "-55px" },
          203e3: { x: "0px", y: "-55px" },
          203001: { x: "0px", y: "-65px" },
          222002: { x: "0px", y: "-50px" },
          222004: { x: "0px", y: "-50px" },
          222012: { x: "0px", y: "-60px" },
          223e3: { x: "0px", y: "-50px" },
          223001: { x: "0px", y: "-50px" },
          236006: { x: "0px", y: "-50px" },
          236007: { x: "0px", y: "-55px" },
          238002: { x: "0px", y: "-50px" },
          238003: { x: "0px", y: "-60px" },
          245002: { x: "0px", y: "-60px" },
          245011: { x: "0px", y: "-50px" },
          254005: { x: "0px", y: "-60px" },
          254011: { x: "0px", y: "-60px" },
          267003: { x: "0px", y: "-50px" },
          267007: { x: "0px", y: "-50px" },
          267008: { x: "0px", y: "-55px" },
          268001: { x: "0px", y: "-55px" },
          412e3: { x: "0px", y: "-50px" },
          421001: { x: "0px", y: "-60px" },
          421002: { x: "0px", y: "-55px" },
          429e3: { x: "0px", y: "-50px" },
          429001: { x: "0px", y: "-50px" },
          429002: { x: "0px", y: "-55px" },
          429003: { x: "0px", y: "-55px" },
          432e3: { x: "0px", y: "-55px" },
          479001: { x: "0px", y: "-55px" },
        };
        t.default = n;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "WKOAy41H",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\summoner-object-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\summoner-object-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\summoner-object-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["showSubteamIcon"]]],null,9],["block",["if"],[["get",["uxSettings","largeAreaAnimationsEnabled"]]],null,8,7],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["active-bar ",["helper",["if"],[["get",["summoner","shouldShowActingBar"]],"","hidden"],null]]]],["flush-element"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["static-attr","class","active-bar-spacer"],["flush-element"],["close-element"],["text","\\n"],["block",["unless"],[["get",["isUILockedForGameStart"]]],null,6],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["summoner-container-wrapper ",["helper",["if"],[["get",["showPickOrderSwapButton"]],"expanded","collapsed"],null]]]],["flush-element"],["text","\\n\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["summoner-spells ",["helper",["if"],[["get",["summoner","shouldShowSpells"]],"","removed"],null]," ",["helper",["unless"],[["get",["bright"]],"dim"],null]]]],["flush-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","spell spell1"],["dynamic-attr","src",["unknown",["summoner","spell1IconPath"]],null],["flush-element"],["close-element"],["text","\\n    "],["open-element","img",[]],["static-attr","class","spell spell2"],["dynamic-attr","src",["unknown",["summoner","spell2IconPath"]],null],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["summoner-ban-item ",["helper",["if"],[["get",["summoner","shouldShowBanIntentIcon"]],"visible","removed"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","champ-ban-icon"],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["summoner","banIntentSquarePortratPath"]],")"]]],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","ban-icon-overlay"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","summoner-container-spacer"],["flush-element"],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["summoner-container ",["helper",["if"],[["get",["summoner","shouldShowExpanded"]],"expanded","collapsed"],null]]]],["flush-element"],["text","\\n    "],["open-element","lol-parties-comm-halo",[]],["dynamic-attr","puuid",["unknown",["summoner","puuid"]],null],["static-attr","size","medium"],["flush-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["champion-icon-container ",["helper",["unless"],[["get",["bright"]],"dim"],null]," "]]],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["champion-ring-pop-animation ",["helper",["if"],[["get",["summoner","shouldShowRingAnimations"]],"visible","removed"],null]]]],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["champion-ring-shine-animation ",["helper",["if"],[["get",["summoner","shouldShowRingAnimations"]],"visible","removed"],null]]]],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","champion-icon-pick-snipe-glow-animation"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","champion-icon-pick-snipe-magic-animation"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["showChampionChestAvailable"]]],null,5],["text","        "],["open-element","div",[]],["static-attr","class","champion-icons"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","champion-icons-bg"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["positionIconPath"]]],null,4],["text","          "],["open-element","div",[]],["static-attr","class","portrait-icon fit-icon"],["dynamic-attr","style",["helper",["sanitize"],[["get",["championIconStyle"]]],null],null],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n\\n        "],["open-element","div",[]],["static-attr","class","champion-ring"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["showChampionChestAvailable"]]],null,3],["text","\\n        "],["open-element","div",[]],["static-attr","class","champion-icon-pick-snipe-ring-animation"],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","champion-icon-pick-snipe-magic-animation"],["flush-element"],["close-element"],["text","\\n\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["champion-ring-magic-animation-inner ",["helper",["if"],[["get",["summoner","shouldShowRingAnimations"]],"visible","removed"],null]]]],["flush-element"],["close-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["champion-ring-magic-animation-outer ",["helper",["if"],[["get",["summoner","shouldShowRingAnimations"]],"visible","removed"],null]]]],["flush-element"],["close-element"],["text","\\n\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["image-ring-spinner  ",["helper",["if"],[["get",["showSummonerActing"]],"visible","removed"],null]," ",["helper",["if"],[["get",["isLeft"]],"left-side","right-side"],null]," ",["helper",["if"],[["get",["summoner","isSelf"]],"is-self"],null]," ",["helper",["if"],[["get",["uxSettings","largeAreaAnimationsEnabled"]],"animated","not-animated"],null]]]],["flush-element"],["close-element"],["text","        \\n        "],["open-element","img",[]],["dynamic-attr","class",["concat",["summoner-muted-icon ",["helper",["unless"],[["get",["summoner","showMuted"]],"removed"],null]]]],["static-attr","src","/fe/lol-champ-select/images/summoner-object/button-mute.svg"],["flush-element"],["close-element"],["text","\\n"],["block",["unless"],[["get",["isUILockedForGameStart"]]],null,2],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","player-details-spacer"],["flush-element"],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","player-details"],["dynamic-attr","style",["unknown",["playerDetailsStyle"]],null],["flush-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["champion-vote-projection ",["helper",["unless"],[["get",["voteProjectionText"]],"no-vote-percent"],null]]]],["flush-element"],["text","\\n        "],["append",["unknown",["voteProjectionText"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["summoner-secondary-text ",["helper",["unless"],[["get",["summonerSecondaryText"]],"removed"],null]]]],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","summoner-secondary-text-inner"],["flush-element"],["append",["unknown",["summonerSecondaryText"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["summoner-primary-text ",["helper",["unless"],[["get",["summonerPrimaryText"]],"hidden"],null]]]],["flush-element"],["text","\\n        "],["append",["unknown",["summonerPrimaryText"]],false],["text","\\n"],["text","        "],["open-element","div",[]],["static-attr","class","summoner-primary-text-glow"],["flush-element"],["append",["unknown",["summonerPrimaryText"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["dynamic-attr","class",["concat",["summoner-name ",["helper",["if"],[["get",["showTeamBoostIcon"]],"showing-summoner-booster-icon"],null]]]],["flush-element"],["text","\\n        "],["open-element","span",[]],["static-attr","class","name-text"],["flush-element"],["text","\\n          "],["append",["helper",["player-name-wrapper"],null,[["displayName","hiddenName","isSummonerInMyTeam","isOnPlayersTeam","nameVisibilityType","puuid"],[["get",["summoner","displayName"]],["get",["summoner","hiddenName"]],["get",["summoner","isSummonerInMyTeam"]],["get",["summoner","isOnPlayersTeam"]],["get",["summoner","nameVisibilityType"]],["get",["summoner","puuid"]]]]],false],["text","\\n        "],["close-element"],["text","\\n"],["block",["if"],[["get",["showTeamBoostIcon"]]],null,1],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldShowOverlay"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["summoner-overlay"],null,[["displayName","puuid","summonerId","obfuscatedPuuid","obfuscatedSummonerId","isMuted","isReportingEnabled","jmxSettings","recordDidRequestSucceed"],[["get",["displayName"]],["get",["summoner","puuid"]],["get",["summoner","summonerId"]],["get",["summoner","obfuscatedPuuid"]],["get",["summoner","obfuscatedSummonerId"]],["get",["summoner","showMuted"]],["get",["isReportingEnabled"]],["get",["jmxSettings"]],["get",["recordDidRequestSucceed"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","summoner-name-booster-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["append",["helper",["trade-button"],null,[["tradeId","summonerToTradeChampionName","currentSummonerChampionName","uxSettings","displayName","recordDidRequestSucceed","summonerHasActiveTrade","showChampionTradeButton","showValidTrade","showChampionChestAvailable"],[["get",["summoner","tradeId"]],["get",["summoner","championName"]],["get",["currentSummonerChampionName"]],["get",["uxSettings"]],["get",["displayName"]],["get",["recordDidRequestSucceed"]],["get",["summonerHasActiveTrade"]],["get",["showChampionTradeButton"]],["get",["summoner","showTrades"]],["get",["showChampionChestAvailable"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","champion-ring-chest-available-glow"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","img",[]],["dynamic-attr","src",["unknown",["positionIconPath"]],null],["static-attr","class","svg-icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","          "],["open-element","div",[]],["static-attr","class","champion-icon-pick-chest-available-glow"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["swap-button-spacing ",["helper",["if"],[["get",["showPickOrderSwapButton"]],"","collapsed"],null]]]],["flush-element"],["text","\\n    "],["append",["helper",["swap-button"],null,[["swapId","uxSettings","summonerHasActiveSwap","displayName","recordDidRequestSucceed","showPickOrderSwapButton"],[["get",["summoner","swapId"]],["get",["uxSettings"]],["get",["summonerHasActiveSwap"]],["get",["displayName"]],["get",["recordDidRequestSucceed"]],["get",["showPickOrderSwapButton"]]]]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["image-magic-background ",["unknown",["summoner","actingBackgroundAnimationState"]]," skin-showcase"]]],["dynamic-attr","style",["unknown",["skinShowcaseStyle"]],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","uikit-state-machine",[]],["static-attr","state","not-acting"],["dynamic-attr","acting-state",["unknown",["summoner","actingBackgroundAnimationState"]],null],["static-attr","class","video-magic-background-state-machine skin-showcase"],["dynamic-attr","style",["unknown",["skinShowcaseStyle"]],null],["flush-element"],["text","\\n    "],["open-element","uikit-states",[]],["flush-element"],["text","\\n      "],["open-element","uikit-state",[]],["static-attr","name","not-acting"],["flush-element"],["text","\\n        "],["open-element","uikit-behavior-media",[]],["static-attr","selector",".bg-intro-vid"],["static-attr","preloading",""],["flush-element"],["close-element"],["text","\\n        "],["open-element","uikit-behavior-media",[]],["static-attr","selector",".bg-idle-vid"],["static-attr","preloading",""],["flush-element"],["close-element"],["text","\\n        "],["open-element","uikit-behavior-media",[]],["static-attr","selector",".bg-outro-vid"],["static-attr","preloading",""],["flush-element"],["close-element"],["text","\\n\\n        "],["open-element","uikit-transition",[]],["static-attr","next-state","intro"],["flush-element"],["text","\\n          "],["open-element","uikit-condition-media",[]],["static-attr","selector",".bg-intro-vid"],["static-attr","can-play",""],["flush-element"],["close-element"],["text","\\n          "],["open-element","uikit-condition-media",[]],["static-attr","selector",".bg-idle-vid"],["static-attr","can-play",""],["flush-element"],["close-element"],["text","\\n          "],["open-element","uikit-condition-parameter",[]],["static-attr","name","acting-state"],["static-attr","value","is-acting-background"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n\\n      "],["open-element","uikit-state",[]],["static-attr","name","intro"],["flush-element"],["text","\\n        "],["open-element","uikit-behavior-media",[]],["static-attr","selector",".bg-intro-vid"],["static-attr","playing",""],["flush-element"],["close-element"],["text","\\n\\n        "],["open-element","uikit-transition",[]],["static-attr","next-state","idle"],["flush-element"],["text","\\n          "],["open-element","uikit-condition-media",[]],["static-attr","selector",".bg-intro-vid"],["static-attr","ended",""],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n\\n        "],["open-element","uikit-transition",[]],["static-attr","next-state","outro"],["flush-element"],["text","\\n          "],["open-element","uikit-condition-parameter",[]],["static-attr","name","acting-state"],["static-attr","value","not-acting-background"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n\\n      "],["open-element","uikit-state",[]],["static-attr","name","idle"],["flush-element"],["text","\\n        "],["open-element","uikit-behavior-media",[]],["static-attr","selector",".bg-idle-vid"],["static-attr","playing",""],["flush-element"],["close-element"],["text","\\n\\n        "],["open-element","uikit-transition",[]],["static-attr","next-state","outro"],["flush-element"],["text","\\n          "],["open-element","uikit-condition-parameter",[]],["static-attr","name","acting-state"],["static-attr","value","not-acting-background"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n\\n      "],["open-element","uikit-state",[]],["static-attr","name","outro"],["flush-element"],["text","\\n        "],["open-element","uikit-behavior-media",[]],["static-attr","selector",".bg-idle-vid"],["static-attr","playing",""],["flush-element"],["close-element"],["text","\\n        "],["open-element","uikit-behavior-media",[]],["static-attr","selector",".bg-outro-vid"],["static-attr","playing",""],["flush-element"],["close-element"],["text","\\n\\n        "],["open-element","uikit-transition",[]],["static-attr","next-state","not-acting"],["flush-element"],["text","\\n          "],["open-element","uikit-condition-media",[]],["static-attr","selector",".bg-outro-vid"],["static-attr","ended",""],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n\\n        "],["open-element","uikit-transition",[]],["static-attr","next-state","not-acting"],["flush-element"],["text","\\n          "],["open-element","uikit-condition-parameter",[]],["static-attr","name","acting-state"],["static-attr","value","not-acting-background"],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","uikit-video",[]],["dynamic-attr","class",["concat",["bg-intro-vid video-magic-background ",["helper",["unless"],[["get",["isLeft"]],"right"],null]]]],["static-attr","visible-state","intro"],["dynamic-attr","src",["concat",[["unknown",["banMagicVideo","intro"]]]]],["static-attr","cache-name","rcp-fe-lol-champ-select"],["flush-element"],["close-element"],["text","\\n    "],["open-element","uikit-video",[]],["dynamic-attr","class",["concat",["bg-idle-vid video-magic-background ",["helper",["unless"],[["get",["isLeft"]],"right"],null]]]],["static-attr","visible-state","idle"],["dynamic-attr","src",["concat",[["unknown",["banMagicVideo","idle"]]]]],["static-attr","loop","loop"],["static-attr","cache-name","rcp-fe-lol-champ-select"],["flush-element"],["close-element"],["text","\\n    "],["open-element","uikit-video",[]],["dynamic-attr","class",["concat",["bg-outro-vid video-magic-background ",["helper",["unless"],[["get",["isLeft"]],"right"],null]]]],["static-attr","visible-state","outro"],["dynamic-attr","src",["concat",[["unknown",["banMagicVideo","outro"]]]]],["static-attr","cache-name","rcp-fe-lol-champ-select"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","subteam-icon-wrapper"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","subteam-icon-arrow"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","subteam-icon"],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["subteamIconPath"]],");"]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        const i = n(1),
          { Ember: s } = i,
          o = s.Component.extend({
            layout: n(221),
            classNames: ["spell-select-flyout"],
            spells: null,
            hoveredSpell: null,
            targetedSpell: null,
            contextSpellLocked: s.computed.and(
              "contextSpell",
              "contextSpell.locked",
            ),
            contextSpellLockedDescription: s.computed(
              "contextSpell",
              "contextSpell.lockedReason",
              "tra.spell_modal_requires_level",
              "tra.spell_modal_disabled",
              function () {
                let e;
                switch (this.get("contextSpell.lockedReason")) {
                  case "LEVEL":
                    e = "spell_modal_requires_level";
                    break;
                  case "DISABLED":
                    e = "spell_modal_disabled";
                }
                return this.get("tra.service").formatString(e, {
                  level: this.get("contextSpell.summonerLevel"),
                });
              },
            ),
            contextSpellCooldownDescription: s.computed(
              "contextSpell",
              "contextSpell.cooldown",
              "tra.spell_modal_cooldown",
              function () {
                const e = this.get("contextSpell.cooldown");
                if (e)
                  return this.get("tra.service").formatString(
                    "spell_modal_cooldown",
                    { cooldown: e },
                  );
              },
            ),
            contextSpell: s.computed(
              "hoveredSpell",
              "targetedSpell",
              function () {
                const e = this.get("hoveredSpell"),
                  t = this.get("targetedSpell");
                return e || t;
              },
            ),
            actions: {
              onFlyoutSpellHover(e) {
                this.set("hoveredSpell", e);
              },
            },
          });
        e.exports = o;
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "mJO9FWB/",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\summoner-spell-popup\\\\layout.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\summoner-spell-popup\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","spell-information"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","spell-title"],["flush-element"],["text","\\n    "],["append",["unknown",["contextSpell","name"]],false],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["contextSpellLocked"]]],null,1],["text","  "],["open-element","div",[]],["static-attr","class","spell-description"],["flush-element"],["text","\\n    "],["append",["unknown",["contextSpell","description"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","spell-cooldown"],["flush-element"],["text","\\n    "],["append",["unknown",["contextSpellCooldownDescription"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","spell-divider"],["flush-element"],["close-element"],["text","\\n "],["open-element","lol-uikit-scrollable",[]],["static-attr","class","summoner-spells"],["flush-element"],["text","\\n"],["block",["each"],[["get",["spells"]]],null,0],["text","  "],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["flyout-selector-popup-button"],null,[["item","selectedItem","onFlyoutItemSelected","onFlyoutItemHover"],[["get",["spell"]],["get",["targetedSpell"]],["get",["onFlyoutSpellSelected"]],["helper",["action"],[["get",[null]],"onFlyoutSpellHover"],null]]]],false],["text","\\n"]],"locals":["spell"]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","spell-locked-description"],["flush-element"],["text","\\n    "],["append",["unknown",["contextSpellLockedDescription"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = (function (e, t) {
            if (!t && e && e.__esModule) return e;
            if (null === e || ("object" != typeof e && "function" != typeof e))
              return { default: e };
            var n = l(t);
            if (n && n.has(e)) return n.get(e);
            var i = {},
              s = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e)
              if (
                "default" !== o &&
                Object.prototype.hasOwnProperty.call(e, o)
              ) {
                var a = s ? Object.getOwnPropertyDescriptor(e, o) : null;
                a && (a.get || a.set)
                  ? Object.defineProperty(i, o, a)
                  : (i[o] = e[o]);
              }
            (i.default = e), n && n.set(e, i);
            return i;
          })(n(1)),
          s = n(60),
          o = r(n(58)),
          a = r(n(66));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function l(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (l = function (e) {
            return e ? n : t;
          })(e);
        }
        n(223);
        const { DataBinding: c } = i.default,
          { Telemetry: m } = i.default,
          u = i.UiKitPlugin.getFlyoutManager(),
          { RunMixin: p } = i.EmberAddons.EmberLifeline,
          d = i.UiKitPlugin.getContextualNotificationManager();
        e.exports = i.Ember.Component.extend(p, {
          layout: n(224),
          classNames: ["summoner-spell-container"],
          disabled: !1,
          requestInProgress: !1,
          smiteAssignmentNotification: null,
          smiteAssignmentNotificationAlreadyShown: !1,
          didUserChangeItem: !1,
          targetSummonerSpellIndex: s.INVALID_SPELL_ID,
          hoveredSpell: null,
          targetedSpell: null,
          init() {
            this._super(...arguments);
            this.set("flyoutOptions", {
              targetAnchor: { x: "center", y: "top" },
              tooltipAnchor: { x: "center", y: "bottom" },
              offset: { x: 0, y: -20 },
              backdropCutout: null,
              orientation: "top",
              animated: !1,
            });
          },
          didUpdateAttrs: function () {
            this._super(...arguments);
            const e = this.get("showPositionAssignment"),
              t = this.get("timer.inPlanningPhase"),
              n = this.get("timer.inBanPickPhase");
            if (!t || e || this.smiteAssignmentNotificationAlreadyShown)
              n &&
                this.smiteAssignmentNotification &&
                d.remove(this.smiteAssignmentNotification);
            else {
              c("/lol-lobby-team-builder/champ-select")
                .get("/v1/has-auto-assigned-smite", { skipCache: !0 })
                .then((e) => {
                  e &&
                    (this.runTask(() => {
                      this.displaySmiteAssignmentNotification();
                    }, 1e3),
                    (this.smiteAssignmentNotificationAlreadyShown = !0));
                });
            }
          },
          displaySmiteAssignmentNotification: function () {
            if (this.smiteAssignmentNotification) return;
            const e = d.add(this.get("tra.smite_assignment_message"), {
              target: {
                domNode: this.element,
                anchor: { x: "center", y: "top" },
              },
              dismissOnTargetHide: !0,
            });
            (this.smiteAssignmentNotification = e),
              e.onRemove.then(() => {
                this.smiteAssignmentNotification = null;
              });
          },
          summonerSpells: i.Ember.computed("spell1", "spell2", function () {
            return i.Ember.A([this.get("spell1"), this.get("spell2")]);
          }),
          clearRequestInProgress: i.Ember.observer(
            "spell1",
            "spell2",
            function () {
              this.set("requestInProgress", !1),
                this.cancelTask(this.requestInProgressTimeout);
            },
          ),
          autoClearRequestInProgress: i.Ember.observer(
            "requestInProgress",
            function () {
              this.get("requestInProgress") &&
                (this.cancelTask(this.requestInProgressTimeout),
                (this.requestInProgressTimeout = this.runTask(() => {
                  this.clearRequestInProgress();
                }, 1e4)));
            },
          ),
          getSummonerSpellIdsFromPositionTable: function (e, t) {
            return e
              ? t && t in e
                ? e[t].spells
                : s.POSITION_ANY in e
                  ? e[s.POSITION_ANY].spells
                  : []
              : [];
          },
          requiredSummonerSpells: i.Ember.computed(
            "assignedPosition",
            "perPositionRequiredSummonerSpells",
            function () {
              const e = this.get("assignedPosition"),
                t = this.get("perPositionRequiredSummonerSpells");
              return this.getSummonerSpellIdsFromPositionTable(t, e);
            },
          ),
          disallowedSummonerSpells: i.Ember.computed(
            "assignedPosition",
            "perPositionDisallowedSummonerSpells",
            function () {
              const e = this.get("assignedPosition"),
                t = this.get("perPositionDisallowedSummonerSpells");
              return this.getSummonerSpellIdsFromPositionTable(t, e);
            },
          ),
          filteredSpells: i.Ember.computed(
            "spells",
            "requiredSummonerSpells",
            "disallowedSummonerSpells",
            function () {
              const e = this.get("requiredSummonerSpells");
              if (e && e.length > 1)
                return this.get("spells").filter((t) => e.includes(t.id));
              const t = this.get("disallowedSummonerSpells");
              return t && t.length > 0
                ? this.get("spells").filter((e) => !t.includes(e.id))
                : this.get("spells");
            },
          ),
          _calculateSpellCaretPosition(e) {
            let t = 0;
            if (e.element && e.element.parentElement) {
              const n = e.element.parentElement.clientWidth / 2;
              t = e.element.offsetWidth / 2 - n + e.element.offsetLeft;
            }
            this.set("spellCaretOffset", t);
          },
          _hideFlyout() {
            this.set("isFlyoutOpen", !1),
              this.set("hoveredSpell", null),
              this.set("targetedSpell", null);
          },
          _setSpells: function (e) {
            const t = this.get("summonerSpells").mapBy("id");
            ((void 0 !== e.spell1Id && e.spell1Id !== t[0]) ||
              (void 0 !== e.spell2Id && e.spell2Id !== t[1])) &&
              (m.startTimer("champ-select-spell-selected"),
              this._sendSpellRequestData(e));
          },
          _playSpellSound: function (e) {
            o.default.playSound("sfx-ui", e.get("soundPath"));
          },
          _show: function (e) {
            this._playSpellSound(e),
              m.sendEvent("champ-select-spell-popup-shown");
          },
          _sendSpellRequestData(e) {
            this.set("requestInProgress", !0),
              a.default
                .ajax({
                  url: "/lol-champ-select/v1/session/my-selection",
                  contentType: "application/json",
                  data: JSON.stringify(e),
                  method: "PATCH",
                  errorMessage: "error_could_not_set_spells",
                })
                .then(() => {
                  this.recordDidRequestSucceed &&
                    this.recordDidRequestSucceed(!0),
                    this.set("requestInProgress", !1);
                })
                .catch((e) => {
                  this.recordDidRequestSucceed &&
                    this.recordDidRequestSucceed(!1, e),
                    this.isDestroying ||
                      this.isDestroyed ||
                      this.set("requestInProgress", !1);
                });
          },
          _onSpellConfirm() {
            this.set("isFlyoutOpen", !1), this.set("didUserChangeItem", !0);
          },
          actions: {
            onFlyoutSpellSelected(e) {
              if (i.Ember.get(e, "locked")) return;
              const t = this.get("summonerSpells").mapBy("id"),
                n = this.get("targetedSpell"),
                o = i.Ember.get(n, "id"),
                a = i.Ember.get(e, "id"),
                r = this.get("requiredSummonerSpells") || [],
                l = 1 === r.length ? r[0] : s.INVALID_SPELL_ID;
              let c,
                m = {};
              o === t[0]
                ? ((c = t[1]),
                  (m = { spell1Id: a }),
                  o === l && ((m.spell2Id = l), (c = l)))
                : ((c = t[0]),
                  (m = { spell2Id: a }),
                  o === l && ((m.spell1Id = l), (c = l))),
                a === c && (m = { spell1Id: t[1], spell2Id: t[0] }),
                this._show(e),
                this._setSpells(m),
                this._onSpellConfirm();
            },
            toggleFlyout(e) {
              const t = e.selectedItem,
                n = this.get("summonerSpells").indexOf(t),
                i = this.get("targetSummonerSpellIndex"),
                a = this.get("isFlyoutOpen");
              if (n === s.INVALID_SPELL_ID || (a && i === n))
                this._hideFlyout();
              else {
                this._calculateSpellCaretPosition(e),
                  this.set("targetSummonerSpellIndex", n),
                  this.set("hoveredSpell", t),
                  this.set("targetedSpell", t);
                a && i !== n
                  ? this.send("repositionCaret")
                  : (o.default.playSound(
                      "sfx-ui",
                      `${s.SOUNDS_PATH}/sfx-cs-spells-open.ogg`,
                    ),
                    this.set("isFlyoutOpen", !0));
              }
            },
            repositionCaret() {
              u.repositionCaret(this.get("spellCaretOffset"));
            },
            afterUserChangedItemAnimation() {
              this.set("didUserChangeItem", !1);
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "B/cn03Xu",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\summoner-spell-select-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\summoner-spell-select-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\summoner-spell-select-component\\\\index.js\\" "],["text","\\n"],["append",["helper",["flyout-selector-trigger-button"],null,[["selectedItem","toggleFlyout","disabled","temporarilyDisabled","didUserChangeItem","afterUserChangedItemAnimation"],[["get",["spell1"]],["helper",["action"],[["get",[null]],"toggleFlyout"],null],["get",["disabled"]],["get",["requestInProgress"]],["get",["didUserChangeItem"]],["helper",["action"],[["get",[null]],"afterUserChangedItemAnimation"],null]]]],false],["text","\\n"],["append",["helper",["flyout-selector-trigger-button"],null,[["selectedItem","toggleFlyout","disabled","temporarilyDisabled","didUserChangeItem","afterUserChangedItemAnimation"],[["get",["spell2"]],["helper",["action"],[["get",[null]],"toggleFlyout"],null],["get",["disabled"]],["get",["requestInProgress"]],["get",["didUserChangeItem"]],["helper",["action"],[["get",[null]],"afterUserChangedItemAnimation"],null]]]],false],["text","\\n"],["open-element","lc-flyout",[]],["dynamic-attr","open",["unknown",["isFlyoutOpen"]],null],["dynamic-attr","onHide",["helper",["action"],[["get",[null]],"toggleFlyout"],null],null],["dynamic-attr","didShow",["helper",["action"],[["get",[null]],"repositionCaret"],null],null],["dynamic-attr","uiKitOptionOverrides",["unknown",["flyoutOptions"]],null],["flush-element"],["text","\\n  "],["open-element","lc-flyout-content",[]],["flush-element"],["text","\\n    "],["append",["helper",["summoner-spell-popup"],null,[["spells","hoveredSpell","targetedSpell","onFlyoutSpellSelected"],[["get",["filteredSpells"]],["get",["hoveredSpell"]],["get",["targetedSpell"]],["helper",["action"],[["get",[null]],"onFlyoutSpellSelected"],null]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(60);
        n(226);
        const s = n(1),
          { Ember: o } = s;
        e.exports = o.Component.extend({
          classNames: ["summoner-timer"],
          layout: n(227),
          summonerTimerStyle: o.computed("timerCellId", function () {
            const e = this.get("timerCellId");
            return this.calculateAndFormatStyleFromCellId(e);
          }),
          calculateAndFormatStyleFromCellId: function (e) {
            return `transform: translateY(${e * i.SUMMONER_OBJECT_SIZE}px);`;
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "txcySHUl",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\summoner-timer-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\summoner-timer-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\summoner-timer-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["timer ",["helper",["if"],[["get",["hideSummonerTimer"]],"hidden"],null]," ",["helper",["unless"],[["get",["isMyTeam"]],"right"],null]]]],["dynamic-attr","data-time",["unknown",["formattedTime"]],null],["dynamic-attr","style",["unknown",["summonerTimerStyle"]],null],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["action-pointer ",["helper",["if"],[["get",["isMyTeam"]],"left","right"],null]]]],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["isInfinite"]]],null,1,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["unknown",["formattedTime"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    ∞\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(1);
        n(229);
        var s = n(60);
        e.exports = i.Ember.Component.extend({
          classNames: ["team-bans"],
          classNameBindings: [
            "isMyTeam:left:right",
            "hasSimultaneousBans:flip-my-team-bans",
            "numBanActionItemsClass",
          ],
          layout: n(230),
          banActionItems: i.Ember.computed(
            "numBans",
            "banActions.[]",
            function () {
              const e = Math.floor(this.get("numBans") / 2),
                t = this.get("banActions"),
                n = [].concat(t);
              for (; e > n.length; ) n.push(i.Ember.Object.create());
              return n;
            },
          ),
          numBanActionItemsClass: i.Ember.computed(
            "banActionItems.length",
            function () {
              return this.get("banActionItems.length") >
                s.STANDARD_MAX_TEAM_SIZE
                ? "has-extra-bans"
                : "";
            },
          ),
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "FyhVjhzM",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\team-bans-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\team-bans-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\team-bans-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","bans-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["banActionItems"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["team-bans-item"],null,[["banAction","actionIndex","isMyTeam","hasSimultaneousBans","gameMode"],[["get",["banAction"]],["get",["index"]],["get",["isMyTeam"]],["get",["hasSimultaneousBans"]],["get",["gameMode"]]]]],false],["text","\\n"]],"locals":["banAction","index"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n(232);
        var i = n(1),
          s = n(60);
        e.exports = i.Ember.Component.extend({
          classNames: ["team-bans-item"],
          classNameBindings: ["indexClass"],
          layout: n(233),
          indexClass: i.Ember.computed(
            "actionIndex",
            "isMyTeam",
            "hasSimultaneousBans",
            "gameMode",
            function () {
              if (
                this.get("hasSimultaneousBans") &&
                !this.get("isMyTeam") &&
                !s.GAME_MODES_WITH_NO_BAN_DELAY_TIMERS[this.get("gameMode")]
              )
                return `enemy-ban-index-${this.get("actionIndex")}`;
            },
          ),
          bannedChampIconPath: i.Ember.computed(
            "banAction.completed",
            "banAction.champion",
            function () {
              return this.get("banAction.completed")
                ? this.get("banAction.champion.squarePortraitPath")
                : "";
            },
          ),
          championIsNotBanned: i.Ember.computed(
            "banAction.completed",
            function () {
              return !this.get("banAction.completed");
            },
          ),
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "6YVG+fPz",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\team-bans-component\\\\team-bans-item\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\team-bans-component\\\\team-bans-item\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\team-bans-component\\\\team-bans-item\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["team-bans-champion-icon ",["helper",["if"],[["get",["banAction","completed"]],"is-completed"],null]]]],["dynamic-attr","style",["concat",["background-image:url(",["unknown",["bannedChampIconPath"]],")"]]],["flush-element"],["close-element"],["text","\\n\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type","disabled"],["bottom","system",["get",["championIsNotBanned"]]]],0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["append",["unknown",["banAction","champion","name"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i,
          s = (i = n(66)) && i.__esModule ? i : { default: i };
        n(235);
        const o = n(1),
          { Ember: a } = o,
          r =
            (o.ViewportPlugin.fullScreen().getScreenRoot(
              "rcp-fe-lol-champ-select",
            ),
            o.EmberDataBinding({
              Ember: a,
              websocket: o.getProvider().getSocket(),
              basePaths: {
                teamBoosts: "/lol-champ-select",
                login: "/lol-login",
                lolInventory: "/lol-inventory",
              },
              boundProperties: {
                teamBoost: { api: "teamBoosts", path: "/v1/team-boost" },
                walletRP: { api: "lolInventory", path: "/v1/wallet/RP" },
              },
            }));
        e.exports = a.Component.extend(r, {
          classNames: ["team-boost"],
          layout: n(236),
          isBoostPurchaseModalShown: !1,
          rp: a.computed("walletRP.RP", function () {
            return this.get("walletRP.RP") || 0;
          }),
          disabled: a.computed(
            "isUILockedForGameStart",
            "canAffordBoost",
            "disabledViaTime",
            function () {
              return !(
                !this.get("isUILockedForGameStart") &&
                this.get("canAffordBoost") &&
                !this.get("disabledViaTime")
              );
            },
          ),
          showBoostButton: a.computed(
            "teamBoost.unlocked",
            "allowBattleBoost",
            "inFinalizationPhase",
            "isShowingVoteCeremonies",
            function () {
              return (
                !this.get("teamBoost.unlocked") &&
                this.get("allowBattleBoost") &&
                this.get("inFinalizationPhase") &&
                !this.get("isShowingVoteCeremonies")
              );
            },
          ),
          canAffordBoost: a.computed("rp", "teamBoost.price", function () {
            return this.get("rp") >= this.get("teamBoost.price");
          }),
          disabledViaTime: a.computed(
            "timeRemaining",
            "jmxSettings.LcuChampionSelect.SkinPurchaseTime",
            "inFinalizationPhase",
            function () {
              return !!(
                this.get("inFinalizationPhase") &&
                this.get("timeRemaining") <
                  this.get("jmxSettings.LcuChampionSelect.SkinPurchaseTime")
              );
            },
          ),
          boostButtonText: a.computed(
            "boostableSkinCount",
            "tra.service",
            "tra.service.boost_button_double_skin",
            "tra.service.pregame_boost",
            function () {
              return 2 === this.get("boostableSkinCount")
                ? this.get("tra.service").get("boost_button_double_skin")
                : this.get("tra.service").get("pregame_boost");
            },
          ),
          boostTooltipMessage: a.computed("canAffordBoost", function () {
            return this.get("canAffordBoost")
              ? this.get("tra.service").formatString("boost_tooltip_message", {
                  boostableSkinCount: this.get("boostableSkinCount"),
                })
              : this.get("tra.service").get("boost_tooltip_insufficient_rp");
          }),
          boostPurchaseModalShowing: a.computed(
            "isBoostPurchaseModalShown",
            "disabled",
            function () {
              return (
                this.get("isBoostPurchaseModalShown") && !this.get("disabled")
              );
            },
          ),
          actions: {
            showBoostPurchaseModal() {
              this.get("disabled") || this.set("isBoostPurchaseModalShown", !0);
            },
            closePurchaseBoostModal() {
              this.set("isBoostPurchaseModalShown", !1);
            },
            executePurchaseBoost() {
              s.default
                .ajax({
                  type: "POST",
                  url: "/lol-champ-select/v1/team-boost/purchase",
                  errorMessage: "error_could_not_purchase_boost",
                })
                .then(() => {
                  this.recordDidRequestSucceed &&
                    this.recordDidRequestSucceed(!0);
                })
                .catch((e) => {
                  this.recordDidRequestSucceed &&
                    this.recordDidRequestSucceed(!1, e);
                })
                .finally(() => {
                  this.set("isBoostPurchaseModalShown", !1);
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
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "G/YjPJ2J",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\team-boost-button-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\team-boost-button-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\team-boost-button-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["showBoostButton"]]],null,2],["text","\\n"],["open-element","lc-confirm-modal",[]],["dynamic-attr","acceptText",["unknown",["tra","unlock"]],null],["dynamic-attr","closeButton",true,null],["dynamic-attr","onYes",["helper",["action"],[["get",[null]],"executePurchaseBoost"],null],null],["dynamic-attr","onHide",["helper",["action"],[["get",[null]],"closePurchaseBoostModal"],null],null],["dynamic-attr","open",["unknown",["boostPurchaseModalShowing"]],null],["flush-element"],["text","\\n  "],["open-element","lc-modal-content",[]],["flush-element"],["text","\\n    "],["append",["helper",["team-boost-modal"],null,[["price","rp","boostableSkinCount"],[["get",["teamBoost","price"]],["get",["rp"]],["get",["boostableSkinCount"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-large"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["boostTooltipMessage"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","restrictArea"],["bottom","whole-window"]],0]],"locals":[]},{"statements":[["text","  "],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showBoostPurchaseModal"],null],null],["dynamic-attr","disabled",["unknown",["disabled"]],null],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","team-boost-content-wrapper"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","team-boost-rp-icon"],["flush-element"],["close-element"],["text","\\n      "],["append",["unknown",["boostButtonText"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["unless"],[["get",["disabledViaTime"]]],null,1]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = (function (e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var n = s(t);
          if (n && n.has(e)) return n.get(e);
          var i = {},
            o = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var a in e)
            if ("default" !== a && Object.prototype.hasOwnProperty.call(e, a)) {
              var r = o ? Object.getOwnPropertyDescriptor(e, a) : null;
              r && (r.get || r.set)
                ? Object.defineProperty(i, a, r)
                : (i[a] = e[a]);
            }
          (i.default = e), n && n.set(e, i);
          return i;
        })(n(1));
        function s(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (s = function (e) {
            return e ? n : t;
          })(e);
        }
        n(238);
        const o = i.Ember.Component.extend({
          layout: n(239),
          boostModalMessage: i.Ember.computed(
            "price",
            "tra.boost_modal_message",
            function () {
              return this.get("tra.service").formatString(
                "boost_modal_message",
                { price: this.get("price") },
              );
            },
          ),
          currentRpMessage: i.Ember.computed(
            "rp",
            "tra.rp_amount",
            function () {
              return this.get("tra.service").formatString("rp_amount", {
                amount: this.get("rp"),
              });
            },
          ),
          costRpMessage: i.Ember.computed(
            "price",
            "tra.rp_amount",
            function () {
              return this.get("tra.service").formatString("rp_amount", {
                amount: this.get("price"),
              });
            },
          ),
          balanceRpMessage: i.Ember.computed(
            "rpRemaining",
            "tra.rp_amount",
            function () {
              return this.get("tra.service").formatString("rp_amount", {
                amount: this.get("rpRemaining"),
              });
            },
          ),
          numSkinsMessage: i.Ember.computed(
            "boostableSkinCount",
            "tra.boost_modal_list_item_1",
            function () {
              return this.get("tra.service").formatString(
                "boost_modal_list_item_1",
                { boostableSkinCount: this.get("boostableSkinCount") },
              );
            },
          ),
          rpRemaining: i.Ember.computed("price", "rp", function () {
            return this.get("rp") - this.get("price");
          }),
        });
        e.exports = o;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "qnjslPik",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\team-boost-modal-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\team-boost-modal-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\team-boost-modal-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","team-boost-notification"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","padding","large"],["static-attr","class","boost-description"],["flush-element"],["text","\\n    "],["open-element","h3",[]],["flush-element"],["append",["unknown",["tra","boost_modal_title"]],false],["close-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["append",["unknown",["boostModalMessage"]],false],["close-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["text","- "],["append",["unknown",["numSkinsMessage"]],false],["close-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["text","- "],["append",["unknown",["tra","boost_modal_list_item_2"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","hr",[]],["flush-element"],["close-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","padding","large"],["static-attr","class","boost-details"],["flush-element"],["text","\\n    "],["open-element","table",[]],["static-attr","cellspacing","0"],["flush-element"],["text","\\n      "],["open-element","tr",[]],["flush-element"],["text","\\n        "],["open-element","td",[]],["static-attr","class","label"],["flush-element"],["append",["unknown",["tra","current_rp"]],false],["close-element"],["text","\\n        "],["open-element","td",[]],["static-attr","class","value"],["flush-element"],["append",["unknown",["currentRpMessage"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","tr",[]],["flush-element"],["text","\\n        "],["open-element","td",[]],["static-attr","class","label"],["flush-element"],["append",["unknown",["tra","cost"]],false],["close-element"],["text","\\n        "],["open-element","td",[]],["static-attr","class","value"],["flush-element"],["append",["unknown",["costRpMessage"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","tr",[]],["static-attr","class","total"],["flush-element"],["text","\\n        "],["open-element","td",[]],["static-attr","class","label"],["flush-element"],["append",["unknown",["tra","balance"]],false],["close-element"],["text","\\n        "],["open-element","td",[]],["static-attr","class","value"],["flush-element"],["append",["unknown",["balanceRpMessage"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i,
          s = n(60),
          o = (i = n(58)) && i.__esModule ? i : { default: i };
        n(241);
        const a = n(1),
          { Ember: r } = a,
          { EmberHelpers: l } = a,
          c = "sfx-ui",
          m = "sfx-notifications";
        e.exports = r.Component.extend({
          classNames: ["timer-status"],
          layout: n(242),
          classNameBindings: ["isHeaderExpanded:expanded-header"],
          inPlanningOrFinalization: r.computed.or(
            "timer.inPlanningPhase",
            "timer.inFinalizationPhase",
          ),
          alliedTeamActive: r.computed(
            "alliedActiveAction",
            "inPlanningOrFinalization",
            "isTeamBuilderGame",
            function () {
              return (
                this.get("isTeamBuilderGame") &&
                (this.get("alliedActiveAction") ||
                  this.get("inPlanningOrFinalization"))
              );
            },
          ),
          enemyTeamActive: r.computed(
            "enemyActiveAction",
            "inPlanningOrFinalization",
            "isTeamBuilderGame",
            function () {
              return (
                this.get("isTeamBuilderGame") &&
                (this.get("enemyActiveAction") ||
                  this.get("inPlanningOrFinalization"))
              );
            },
          ),
          displayAlternateTimer: r.computed.and(
            "isHeaderExpanded",
            "isShowingPerksModal",
          ),
          useBurnoutAnimation1: !0,
          burnoutBarAnimationTriggerObserver: l.observer(
            "currentActions.[]",
            "isShowingPositionAssignment",
            function () {
              if (
                0 === this.get("currentActions.length") &&
                !this.get("inPlanningOrFinalization")
              )
                return;
              const e = this.element.querySelector(
                  ".burnout-timer.left .burnout-timer-bar",
                ),
                t = this.element.querySelector(
                  ".burnout-timer.left .burnout-timer-glow",
                ),
                n = this.element.querySelector(
                  ".burnout-timer.right .burnout-timer-bar",
                ),
                i = this.element.querySelector(
                  ".burnout-timer.right .burnout-timer-glow",
                );
              if (!(e && t && n && i)) return;
              const s = `${
                this.useBurnoutAnimation1
                  ? "burnoutTimerBackgroundSize"
                  : "burnoutTimerBackgroundSize2"
              } ${this.get("timer.timeRemaining")}s linear 0s`;
              (e.style.animation = s),
                (t.style.animation = s),
                (n.style.animation = s),
                (i.style.animation = s),
                (this.useBurnoutAnimation1 = !this.useBurnoutAnimation1);
            },
          ),
          timerTickObserver: r.observer("timer.timeRemaining", function () {
            r.run.once(this, function () {
              if (this.isDestroying || this.isDestroyed) return;
              const e = this.get("timer.timeRemaining");
              if (this.get("timeSeen") === e) return;
              this.set("timeSeen", e);
              const { classList: t } = this.$()[0];
              if (
                (t.remove("timer-pulse"),
                (e <= 5 && this.get("timer.inPlanningPhase")) ||
                  (e <= 10 && this.get("timer.inFinalizationPhase")))
              )
                o.default.playSound(
                  m,
                  "/fe/lol-champ-select/sounds/sfx-cs-timer-tick-small.ogg",
                );
              else {
                let n = s.DURATIONS.actionSoundThreshold;
                if (this.get("isDraftMode")) {
                  const e = this.get(
                    "jmxSettings.LcuChampionSelect.DraftActionTickSoundThreshold",
                  );
                  e && (n = e);
                }
                const i =
                  this.get("timer.inBanPickPhase") &&
                  this.get("activeAction.actor.isSelf");
                e <= n &&
                  i &&
                  (o.default.playSound(
                    m,
                    "/fe/lol-champ-select/sounds/sfx-cs-timer-tick.ogg",
                  ),
                  this.element.offsetWidth,
                  t.add("timer-pulse"));
              }
            });
          }),
          playActionTypeTransitionSounds: l.observeChange(
            "activeAction.type",
            r.on("init", function () {
              if (!this.get("isDraftMode")) return;
              const e = this.get("activeAction.type");
              "pick" === e
                ? o.default.playSound(
                    c,
                    "/fe/lol-champ-select/sounds/sfx-cs-draft-pick-intro.ogg",
                  )
                : "ban" !== e ||
                  this.get("activeAction.actor.isSelf") ||
                  o.default.playSound(
                    c,
                    "/fe/lol-champ-select/sounds/sfx-cs-draft-10ban-intro.ogg",
                  );
            }),
          ),
          localPlayerActive: r.computed(
            "activeAction.actor.isSelf",
            "champSelectScreen",
            "timer.inPlanningPhase",
            "summoner.champion",
            function () {
              return (
                this.get("activeAction.actor.isSelf") ||
                (this.get("champSelectScreen") === s.SCREENS.selected &&
                  !this.get("isShowingVoteCeremonies")) ||
                (this.get("timer.inPlanningPhase") &&
                  !this.get("summoner.champion"))
              );
            },
          ),
          blueTeamIsChoosing: r.computed("activeActions.[]", function () {
            return (
              this.get("activeActions") &&
              this.get("activeActions").filterBy("isOnLeftSide", !0).length > 1
            );
          }),
          redTeamIsChoosing: r.computed("activeActions.[]", function () {
            return (
              this.get("activeActions") &&
              this.get("activeActions").filterBy("isOnLeftSide", !1).length > 1
            );
          }),
          shouldHideMessage: r.computed(
            "activeAction.isVoteReveal",
            "isPlayingCeremony",
            function () {
              return (
                !this.get("activeAction.isVoteReveal") &&
                this.get("isPlayingCeremony")
              );
            },
          ),
          message: l.computedGate(
            "timer.phase",
            "activeAction.actor.isSelf",
            "activeAction.isBan",
            "activeAction.isPick",
            "activeAction.isVote",
            "activeAction.championId",
            "activeAction.actor.name",
            "activeAction.isVoteReveal",
            "allPlayersActTogether",
            "blueTeamIsChoosing",
            "redTeamIsChoosing",
            "champSelectScreen",
            "isSpectating",
            "alliedTeamActive",
            "enemyTeamActive",
            "tra.timer_phase_ban_pick_choose_message",
            "tra.timer_phase_ban_pick_lock_message",
            "tra.timer_phase_ban_pick_blue_team_choosing_message",
            "tra.timer_phase_ban_pick_red_team_choosing_message",
            "tra.timer_phase_ban_pick_waiting_message",
            "tra.timer_phase_finalization_message",
            "tra.timer_phase_ban_pick_ban_message",
            "tra.timer_phase_ban_pick_other_pick_message",
            "tra.timer_phase_ban_pick_other_ban_message",
            "tra.timer_phase_game_starting_message",
            "tra.timer_phase_vote_choose_message",
            "tra.spectator_delay_message",
            function () {
              switch (this.get("timer.phase")) {
                case s.TIMER_PHASES.planning:
                  return this.get("localPlayerActive")
                    ? this.get("tra.timer_phase_ban_pick_intent_message")
                    : this.get("tra.timer_phase_ban_pick_waiting_message");
                case s.TIMER_PHASES.banPick:
                  return this.get("champSelectScreen") === s.SCREENS.selected
                    ? this.get("tra.timer_phase_finalization_message")
                    : this.get("activeAction.actor.isSelf")
                      ? this.get("activeAction.isPick")
                        ? this.get("tra.timer_phase_ban_pick_choose_message")
                        : this.get("activeAction.isVote")
                          ? this.get("tra.timer_phase_vote_choose_message")
                          : this.get("tra.timer_phase_ban_pick_ban_message")
                      : this.get("allPlayersActTogether")
                        ? this.get("tra.timer_phase_ban_pick_waiting_message")
                        : this.get("blueTeamIsChoosing") &&
                            this.get("isSpectating")
                          ? this.get(
                              "tra.timer_phase_ban_pick_blue_team_choosing_message",
                            )
                          : this.get("redTeamIsChoosing") &&
                              this.get("isSpectating")
                            ? this.get(
                                "tra.timer_phase_ban_pick_red_team_choosing_message",
                              )
                            : this.get("alliedTeamActive")
                              ? this.get(
                                  "tra.timer_phase_ban_pick_allied_team_choosing_message",
                                )
                              : this.get("enemyTeamActive")
                                ? this.get(
                                    "tra.timer_phase_ban_pick_enemy_team_choosing_message",
                                  )
                                : this.get("activeAction.isPick")
                                  ? this.get("tra.service").formatString(
                                      "timer_phase_ban_pick_other_pick_message",
                                      {
                                        summonerName: this.get(
                                          "activeAction.actor.name",
                                        ),
                                      },
                                    )
                                  : this.get("activeAction.isBan")
                                    ? this.get("tra.service").formatString(
                                        "timer_phase_ban_pick_other_ban_message",
                                        {
                                          summonerName: this.get(
                                            "activeAction.actor.name",
                                          ),
                                        },
                                      )
                                    : "";
                case s.TIMER_PHASES.finalization:
                  return this.get("activeAction.isVoteReveal")
                    ? this.get("tra.timer_phase_vote_reveal_message")
                    : this.get("tra.timer_phase_finalization_message");
                case s.TIMER_PHASES.gameStarting:
                  return this.get("isSpectating")
                    ? this.get("tra.spectator_delay_message")
                    : this.get("tra.timer_phase_game_starting_message");
                default:
                  return "";
              }
            },
          ),
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "GP1/FplO",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\timer-status-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\timer-status-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\timer-status-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["isHeaderExpanded"]]],null,7,2],["text","\\n"],["open-element","div",[]],["static-attr","class","timer-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["burnout-timer left ",["helper",["unless"],[["get",["alliedTeamActive"]],"hidden"],null]," ",["helper",["if"],[["get",["alliedActiveAction","isBan"]],"red","blue"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","burnout-timer-glow"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","burnout-timer-bar"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["timer ",["helper",["if"],[["get",["isPlayingCeremony"]],"hidden"],null]," ",["helper",["if"],[["get",["displayAlternateTimer"]],"hidden"],null]]]],["dynamic-attr","data-time",["unknown",["formattedTime"]],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["timer","isInfinite"]]],null,1,0],["text","  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["burnout-timer right ",["helper",["unless"],[["get",["enemyTeamActive"]],"hidden"],null]," ",["helper",["if"],[["get",["inPlanningOrFinalization"]],"blue","red"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","burnout-timer-glow"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","burnout-timer-bar"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","svg",[]],["static-attr","class","metal-work left"],["static-attr","id","Layer_1"],["static-attr","data-name","Layer 1"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["static-attr","viewBox","0 0 1360 140.04"],["static-attr","width","340"],["static-attr","height","35.01"],["flush-element"],["text","\\n    "],["open-element","defs",[]],["flush-element"],["text","\\n      "],["open-element","linearGradient",[]],["static-attr","id","Gradient1"],["flush-element"],["text","\\n        "],["open-element","stop",[]],["static-attr","class","stop1"],["static-attr","offset","0%"],["flush-element"],["close-element"],["text","\\n        "],["open-element","stop",[]],["static-attr","class","stop2"],["static-attr","offset","55%"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","style",[]],["static-attr","type","text/css"],["flush-element"],["text",".cls-1 { fill: url(#Gradient1); }\\n      .stop1 { stop-color: #463714; }\\n      .stop2 { stop-color: #785A28; }\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","path",[]],["static-attr","class","cls-1"],["static-attr","transform","translate(615.5 6.54)"],["static-attr","d","M-261.55,112.3v9.45h10.79V101.37h-5.4c-47,0-87.17-36-93.48-83.75l-2.71-7.84H-583.08L-595.5-2.5h212c-.08,1.83,0,10.14,0,12h4v-16l-236,0v4h4l23,23.14h225.34C-354.46,69.64-310,109.74-261.55,112.3Zm6,17.2c-57.68,0-107.69-40.62-120-96h-4c12.41,58.46,63.33,100,124,100h996l4-4Z"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","svg",[]],["static-attr","class","metal-work right"],["static-attr","id","Layer_2"],["static-attr","data-name","Layer 1"],["static-attr","xmlns","http://www.w3.org/2000/svg","http://www.w3.org/2000/xmlns/"],["static-attr","viewBox","0 0 1360 140.04"],["static-attr","width","340"],["static-attr","height","35.01"],["flush-element"],["text","\\n    "],["open-element","path",[]],["static-attr","class","cls-1"],["static-attr","transform","translate(615.5 6.54)"],["static-attr","d","M-261.55,112.3v9.45h10.79V101.37h-5.4c-47,0-87.17-36-93.48-83.75l-2.71-7.84H-583.08L-595.5-2.5h212c-.08,1.83,0,10.14,0,12h4v-16l-236,0v4h4l23,23.14h225.34C-354.46,69.64-310,109.74-261.55,112.3Zm6,17.2c-57.68,0-107.69-40.62-120-96h-4c12.41,58.46,63.33,100,124,100h996l4-4Z"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["append",["helper",["team-boost-button"],null,[["allowBattleBoost","isUILockedForGameStart","jmxSettings","inFinalizationPhase","isShowingVoteCeremonies","boostableSkinCount","recordDidRequestSucceed","timeRemaining"],[["get",["allowBattleBoost"]],["get",["isUILockedForGameStart"]],["get",["jmxSettings"]],["get",["inFinalizationPhase"]],["get",["isShowingVoteCeremonies"]],["get",["boostableSkinCount"]],["get",["recordDidRequestSucceed"]],["get",["timer","timeRemaining"]]]]],false],["text","\\n\\n\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["unknown",["formattedTime"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      ∞\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["message ",["helper",["if"],[["get",["shouldHideMessage"]],"hidden"],null]," ",["helper",["if"],[["get",["localPlayerActive"]],"local-player-acting"],null]]]],["flush-element"],["text","\\n    "],["append",["unknown",["message"]],false],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["champion-bench"],null,[["benchChampions","championChestAvailabilityMap","shouldShowChestAvailability","showChestAvailabilityHintedPortraits","inventory","summoner","recordDidRequestSucceed"],[["get",["benchChampions"]],["get",["championChestAvailabilityMap"]],["get",["shouldShowChestAvailability"]],["get",["showChestAvailabilityHintedPortraits"]],["get",["inventory"]],["get",["summoner"]],["get",["recordDidRequestSucceed"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["unknown",["formattedTime"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        ∞\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["small-timer ",["helper",["if"],[["get",["isPlayingCeremony"]],"hidden"],null]]]],["dynamic-attr","data-time",["unknown",["formattedTime"]],null],["flush-element"],["text","\\n"],["block",["if"],[["get",["timer","isInfinite"]]],null,5,4],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["displayAlternateTimer"]]],null,6],["block",["if"],[["get",["showChampionBench"]]],null,3]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = (function (e, t) {
            if (!t && e && e.__esModule) return e;
            if (null === e || ("object" != typeof e && "function" != typeof e))
              return { default: e };
            var n = r(t);
            if (n && n.has(e)) return n.get(e);
            var i = {},
              s = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e)
              if (
                "default" !== o &&
                Object.prototype.hasOwnProperty.call(e, o)
              ) {
                var a = s ? Object.getOwnPropertyDescriptor(e, o) : null;
                a && (a.get || a.set)
                  ? Object.defineProperty(i, o, a)
                  : (i[o] = e[o]);
              }
            (i.default = e), n && n.set(e, i);
            return i;
          })(n(1)),
          s = a(n(66)),
          o = a(n(58));
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function r(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (r = function (e) {
            return e ? n : t;
          })(e);
        }
        n(244),
          (e.exports = i.Ember.Component.extend({
            layout: n(245),
            classNames: ["trade-button"],
            requestInProgress: !1,
            disabled: i.Ember.computed("requestInProgress", function () {
              return !!this.get("requestInProgress") || null;
            }),
            tradeTooltipText: i.Ember.computed(
              "displayName",
              "tradeId",
              "showValidTrade",
              "summonerToTradeChampionName",
              "currentSummonerChampionName",
              function () {
                return this.get("showValidTrade")
                  ? this.get("tra.service").formatString(
                      "pregame_trade_tooltip",
                      {
                        entity1: this.get("currentSummonerChampionName"),
                        entity2: this.get("summonerToTradeChampionName"),
                      },
                    )
                  : this.get("tra.error_trade_is_unavailable");
              },
            ),
            actions: {
              trade: function () {
                return (
                  o.default.playSound(
                    "sfx-ui",
                    "/fe/lol-champ-select/sounds/sfx-cs-button-trade-click.ogg",
                  ),
                  i.Telemetry.startTracingEvent("champ-select-trade-propose"),
                  this.set("requestInProgress", !0),
                  s.default
                    .ajax({
                      type: "POST",
                      url:
                        "/lol-champ-select/v1/session/trades/" +
                        this.get("tradeId") +
                        "/request",
                      errorMessage: "error_could_not_request_trade",
                    })
                    .then(() => {
                      this.recordDidRequestSucceed &&
                        this.recordDidRequestSucceed(!0),
                        i.Telemetry.invokeWithLowProbability(function () {
                          i.Telemetry.recordNonTimingTracingEvent(
                            "champ-trade-propose-success",
                            1,
                            "event",
                          );
                        });
                    })
                    .catch((e) => {
                      this.recordDidRequestSucceed &&
                        this.recordDidRequestSucceed(!1, e),
                        i.Telemetry.invokeWithLowProbability(function () {
                          const t = e && e.responseText ? e.responseText : "";
                          i.DataBinding.bindTo(
                            i.default.getProvider().getSocket(),
                          )
                            .get("/lol-summoner/v1/current-summoner")
                            .then(function (e) {
                              const {
                                  accountId: n,
                                  puuid: s,
                                  summonerId: o,
                                } = e,
                                a = JSON.stringify({
                                  accountId: n,
                                  clientDateISOString: new Date().toISOString(),
                                  puuid: s,
                                  responseText: t,
                                  summonerId: o,
                                });
                              i.Telemetry.sendEvent(
                                "champ-trade-propose-fail",
                                a,
                              ),
                                i.Telemetry.recordNonTimingTracingEvent(
                                  "champ-trade-propose-fail",
                                  1,
                                  "event",
                                );
                            });
                        });
                    })
                    .finally(() => {
                      window.requestAnimationFrame(() => {
                        i.Telemetry.endTracingEvent(
                          "champ-select-trade-propose",
                        );
                      }),
                        this.set("requestInProgress", !1);
                    })
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
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "RRSI+oe9",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\trade-button-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\trade-button-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\trade-button-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["showChampionTradeButton"]]],null,7]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","            "],["open-element","div",[]],["static-attr","class","tooltip-champion-chest-available"],["flush-element"],["append",["unknown",["tra","tooltip_champion_chest_available"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","champ-select-trade-button-tooltip"],["flush-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tradeTooltipText"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["showChampionChestAvailable"]]],null,0],["text","        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","icon"],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type"],["top","system"]],1]],"locals":[]},{"statements":[["block",["uikit-framed-icon"],null,[["onclick","class","interactive","borderWidth","disabled"],[["helper",["action"],[["get",[null]],"trade"],null],"champion-trade-button",true,2,["get",["disabled"]]]],2],["text","    "],["open-element","div",[]],["static-attr","class","champion-trade-ring-background"],["flush-element"],["close-element"],["text","\\n  "]],"locals":[]},{"statements":[["block",["if"],[["get",["showValidTrade"]]],null,3]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-framed-icon"],null,[["class","interactive","borderWidth","disabled"],["champion-trade-button-active-trade",true,2,["get",["disabled"]]]],5],["text","    "],["open-element","div",[]],["static-attr","class","champion-trade-ring-background"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["champion-trade-ring-spinner ",["helper",["if"],[["get",["uxSettings","largeAreaAnimationsEnabled"]],"animated","not-animated"],null]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["summonerHasActiveTrade"]]],null,6,4]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = (function (e, t) {
            if (!t && e && e.__esModule) return e;
            if (null === e || ("object" != typeof e && "function" != typeof e))
              return { default: e };
            var n = r(t);
            if (n && n.has(e)) return n.get(e);
            var i = {},
              s = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e)
              if (
                "default" !== o &&
                Object.prototype.hasOwnProperty.call(e, o)
              ) {
                var a = s ? Object.getOwnPropertyDescriptor(e, o) : null;
                a && (a.get || a.set)
                  ? Object.defineProperty(i, o, a)
                  : (i[o] = e[o]);
              }
            (i.default = e), n && n.set(e, i);
            return i;
          })(n(1)),
          s = a(n(66)),
          o = a(n(58));
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function r(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (r = function (e) {
            return e ? n : t;
          })(e);
        }
        n(247),
          (e.exports = i.Ember.Component.extend({
            layout: n(248),
            classNames: ["swap-button"],
            requestInProgress: !1,
            disabled: i.Ember.computed("requestInProgress", function () {
              return !!this.get("requestInProgress") || null;
            }),
            swapTooltipText: i.Ember.computed("displayName", function () {
              return this.get("tra.service").formatString(
                "pregame_swap_tooltip",
                { actor: this.get("displayName") },
              );
            }),
            actions: {
              swap: function () {
                return (
                  o.default.playSound(
                    "sfx-ui",
                    "/fe/lol-champ-select/sounds/sfx-cs-button-swap-click.ogg",
                  ),
                  i.Telemetry.startTracingEvent("postition-swap-propose"),
                  this.set("requestInProgress", !0),
                  s.default
                    .ajax({
                      type: "POST",
                      url:
                        "/lol-champ-select/v1/session/swaps/" +
                        this.get("swapId") +
                        "/request",
                      errorMessage: "error_could_not_request_swap",
                    })
                    .then(() => {
                      this.recordDidRequestSucceed &&
                        this.recordDidRequestSucceed(!0),
                        i.Telemetry.invokeWithLowProbability(function () {
                          i.Telemetry.recordNonTimingTracingEvent(
                            "postition-swap-propose-success",
                            1,
                            "event",
                          );
                        });
                    })
                    .catch((e) => {
                      this.recordDidRequestSucceed &&
                        this.recordDidRequestSucceed(!1, e),
                        i.Telemetry.invokeWithLowProbability(function () {
                          const t = e && e.responseText ? e.responseText : "";
                          i.DataBinding.bindTo(
                            i.default.getProvider().getSocket(),
                          )
                            .get("/lol-summoner/v1/current-summoner")
                            .then(function (e) {
                              const {
                                  accountId: n,
                                  puuid: s,
                                  summonerId: o,
                                } = e,
                                a = JSON.stringify({
                                  accountId: n,
                                  clientDateISOString: new Date().toISOString(),
                                  puuid: s,
                                  responseText: t,
                                  summonerId: o,
                                });
                              i.Telemetry.sendEvent(
                                "postition-swap-propose-fail",
                                a,
                              ),
                                i.Telemetry.recordNonTimingTracingEvent(
                                  "postition-swap-propose-fail",
                                  1,
                                  "event",
                                );
                            });
                        });
                    })
                    .finally(() => {
                      window.requestAnimationFrame(() => {
                        i.Telemetry.endTracingEvent("postition-swap-propose");
                      }),
                        this.set("requestInProgress", !1);
                    })
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
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "QfP0y/HV",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\swap-button-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\swap-button-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\swap-button-component\\\\index.js\\" "],["text","\\n\\n"],["block",["if"],[["get",["summonerHasActiveSwap"]]],null,5,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","class","champ-select-swap-button-tooltip"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["swapTooltipText"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","icon"],["flush-element"],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","type","restrictArea"],["top","system","whole-window"]],0]],"locals":[]},{"statements":[["block",["uikit-framed-icon"],null,[["onclick","class","interactive","borderWidth","disabled"],[["helper",["action"],[["get",[null]],"swap"],null],"position-swap-button",true,2,["get",["disabled"]]]],1]],"locals":[]},{"statements":[["block",["if"],[["get",["showPickOrderSwapButton"]]],null,2]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","icon"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-framed-icon"],null,[["class","interactive","borderWidth","disabled"],["position-swap-button-active-swap",true,2,["get",["disabled"]]]],4],["text","  "],["open-element","div",[]],["dynamic-attr","class",["concat",["pick-order-swap-ring-spinner ",["helper",["if"],[["get",["uxSettings","largeAreaAnimationsEnabled"]],"animated","not-animated"],null]]]],["flush-element"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default =
            t.SWAP_STATES =
            t.SWAP_RESOLVED_STATES =
            t.SWAP_CREATED_STATES =
            t.SWAP_CLEAR_TIMEOUT_MS =
            t.SWAP_CANCEL_TIMEOUT_MS =
            t.SWAP_ACCEPTED_TIMEOUT_MS =
              void 0);
        var i = (function (e, t) {
            if (!t && e && e.__esModule) return e;
            if (null === e || ("object" != typeof e && "function" != typeof e))
              return { default: e };
            var n = r(t);
            if (n && n.has(e)) return n.get(e);
            var i = {},
              s = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e)
              if (
                "default" !== o &&
                Object.prototype.hasOwnProperty.call(e, o)
              ) {
                var a = s ? Object.getOwnPropertyDescriptor(e, o) : null;
                a && (a.get || a.set)
                  ? Object.defineProperty(i, o, a)
                  : (i[o] = e[o]);
              }
            (i.default = e), n && n.set(e, i);
            return i;
          })(n(1)),
          s = a(n(66)),
          o = a(n(58));
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function r(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (r = function (e) {
            return e ? n : t;
          })(e);
        }
        const { RunMixin: l } = i.EmberAddons.EmberLifeline;
        n(250);
        const c = {
          RECEIVED: "RECEIVED",
          AVAILABLE: "AVAILABLE",
          SENT: "SENT",
          BUSY: "BUSY",
          DECLINED: "DECLINED",
          ACCEPTED: "ACCEPTED",
          CANCELLED: "CANCELLED",
        };
        t.SWAP_STATES = c;
        const m = [c.ACCEPTED, c.DECLINED, c.CANCELLED, c.BUSY];
        t.SWAP_RESOLVED_STATES = m;
        const u = [c.RECEIVED, c.SENT, c.BUSY];
        t.SWAP_CREATED_STATES = u;
        const p = 1e4;
        t.SWAP_CANCEL_TIMEOUT_MS = p;
        t.SWAP_CLEAR_TIMEOUT_MS = 1700;
        t.SWAP_ACCEPTED_TIMEOUT_MS = 200;
        const d = "session/swaps",
          h = "cancel",
          g = "accept",
          f = "decline",
          S = "clear";
        var _ = i.Ember.Component.extend(l, {
          layout: n(251),
          init: function () {
            this._super(...arguments),
              (this.audioPool = o.default),
              this.set("isAnimated", !0);
          },
          didRender: function () {
            this._super(...arguments);
            const e = this.get("swap"),
              t = this.get("summoners");
            this.prevSwapState !== e.state
              ? (this.cancelTask(this._swapCancelTimeout),
                this.cancelTask(this._swapClearTimeout),
                e.state === c.SENT && this.scheduleSwapCancel(e.id),
                u.includes(e.state) &&
                  (this.set("isDisplayed", !0),
                  this.setSummonerName(
                    this.get("swapRequestorIndex"),
                    "requestor",
                  ),
                  this.setSummonerName(
                    this.get("swapResponderIndex"),
                    "responder",
                  ),
                  this.positionSwapDialog(this.get("swapOtherSummonerIndex"))),
                m.includes(e.state) && this.scheduleSwapClear(e.id, e.state),
                this.playSwapSfx(e.state))
              : t &&
                t[this.get("swapRequestorIndex")] &&
                t[this.get("swapResponderIndex")] &&
                (t[this.get("swapRequestorIndex")].isDonePicking ||
                  t[this.get("swapResponderIndex")].isDonePicking) &&
                this.swapServiceCall(e.id, d, h),
              (this.prevSwapState = e.state);
          },
          swapRequestorIndex: i.Ember.computed(
            "swap.requestorIndex",
            "gameModeSubteamData",
            function () {
              return this.getCellIndex(
                this.get("swap.requestorIndex"),
                this.get("gameModeSubteamData"),
              );
            },
          ),
          swapResponderIndex: i.Ember.computed(
            "swap.responderIndex",
            "gameModeSubteamData",
            function () {
              return this.getCellIndex(
                this.get("swap.responderIndex"),
                this.get("gameModeSubteamData"),
              );
            },
          ),
          swapOtherSummonerIndex: i.Ember.computed(
            "swap.otherSummonerIndex",
            "gameModeSubteamData",
            function () {
              return this.getCellIndex(
                this.get("swap.otherSummonerIndex"),
                this.get("gameModeSubteamData"),
              );
            },
          ),
          getCellIndex(e, t) {
            if (!t) return e;
            const n = t.find((e) => e.isLocalSubteam),
              i = n ? n.cellIds.indexOf(e) : -1;
            return i > -1 ? i : e;
          },
          setSummonerName: function (e, t) {
            const n = this.get("summoners");
            n &&
              e >= 0 &&
              n[e] &&
              n[e].displayName &&
              this.set(t, n[e].displayName);
          },
          positionSwapDialog: function (e) {
            const t = [
                ...document.querySelectorAll(
                  ".your-party .champion-icon-container",
                ),
              ][e].getBoundingClientRect(),
              n = this.element.querySelector(".swap-dialog");
            (n.style.top = t.top - 5 + "px"),
              (n.style.left = `${t.left + t.width + 15}px`);
          },
          playSwapSfx: function (e) {
            let t = "";
            switch (e) {
              case c.SENT:
              case c.RECEIVED:
                t =
                  "/fe/lol-champ-select/sounds/sfx-cs-notif-swaprequest-rcvd.ogg";
                break;
              case c.ACCEPTED:
                t =
                  "/fe/lol-champ-select/sounds/sfx-cs-notif-swaprequest-accepted.ogg";
                break;
              case c.DECLINED:
                t =
                  "/fe/lol-champ-select/sounds/sfx-cs-notif-swaprequest-declined.ogg";
            }
            t && this.audioPool.playSound("sfx-notifications", t);
          },
          pickOrderSwapTimeRemaining: i.Ember.computed(
            "pickOrderSwapDisabledConfigurationInSeconds",
            "timeRemaining",
            "inPlanningPhase",
            function () {
              return this.get("inPlanningPhase")
                ? p
                : Math.min(
                    1e3 *
                      (this.get("timeRemaining") -
                        this.get(
                          "pickOrderSwapDisabledConfigurationInSeconds",
                        )),
                    p,
                  );
            },
          ),
          scheduleSwapCancel: function (e) {
            const t =
              this.get("pickOrderSwapTimeRemaining") > 0
                ? this.get("pickOrderSwapTimeRemaining")
                : 0;
            this._swapCancelTimeout = this.runTask(
              () => this.swapServiceCall(e, d, h),
              t,
            );
          },
          scheduleSwapClear: function (e, t) {
            const n = t === c.ACCEPTED ? 200 : 1700;
            this._swapClearTimeout = this.runTask(
              () => (
                this.set("isDisplayed", !1),
                this.swapServiceCall(e, "ongoing-swap", S)
              ),
              n,
            );
          },
          showAcceptSwapButton: i.Ember.computed.equal(
            "swap.state",
            c.RECEIVED,
          ),
          showCancelSwapButton: i.Ember.computed.equal("swap.state", c.SENT),
          isCloseButtonDisabled: i.Ember.computed("swap.state", function () {
            return m.includes(this.get("swap.state"));
          }),
          swapStateClass: i.Ember.computed("swap.state", function () {
            return this.get("swap.state").toLowerCase();
          }),
          isSwapInProgress: i.Ember.computed("swap.state", function () {
            const e = this.get("swap.state");
            return e === c.SENT || e === c.RECEIVED;
          }),
          swapMessageString: i.Ember.computed(
            "swap.state",
            "swapWaitingString",
            "swapCanceledString",
            "swapDeclinedString",
            "swapErrorString",
            function () {
              switch (this.get("swap.state")) {
                case c.SENT:
                case c.RECEIVED:
                  return this.get("swapWaitingString");
                case c.CANCELLED:
                  return this.get("tra.pregame_swap_canceled");
                case c.DECLINED:
                  return this.get("swapDeclinedString");
                case c.BUSY:
                  return this.get("swapBusyString");
                case c.ACCEPTED:
                  return "";
                default:
                  return this.get("tra.pregame_swap_error");
              }
            },
          ),
          swapDeclinedString: i.Ember.computed(
            "responder",
            "tra.pregame_swap_declined",
            function () {
              return this.get("tra.service").formatString(
                "pregame_swap_declined",
                { actor: this.get("responder") },
              );
            },
          ),
          swapWaitingString: i.Ember.computed(
            "swap.initiatedByLocalPlayer",
            "requestor",
            "responder",
            "tra.pregame_swap_requested",
            "tra.pregame_swap_waiting",
            function () {
              const e = this.get("swap.initiatedByLocalPlayer"),
                t = this.get("requestor"),
                n = this.get("responder");
              return e
                ? this.get("tra.service").formatString("pregame_swap_waiting", {
                    actor: n,
                  })
                : this.get("tra.service").formatString(
                    "pregame_swap_requested",
                    { actor: t },
                  );
            },
          ),
          swapBusyString: i.Ember.computed(
            "responder",
            "tra.pregame_swap_error",
            function () {
              return this.get("tra.service").formatString("pregame_swap_busy", {
                actor: this.get("responder"),
              });
            },
          ),
          swapServiceCall: function (e, t, n) {
            const o = `/lol-champ-select/v1/${t}/${e}/${n}`;
            return s.default
              .ajax({
                type: "POST",
                url: o,
                errorMessage: "error_could_not_swap",
              })
              .then(() => {
                this.recordDidRequestSucceed &&
                  this.recordDidRequestSucceed(!0),
                  i.Telemetry.invokeWithLowProbability(function () {
                    switch (n) {
                      case g:
                        i.Telemetry.recordNonTimingTracingEvent(
                          "champ-swap-accept-success",
                          1,
                          "event",
                        );
                        break;
                      case h:
                        i.Telemetry.recordNonTimingTracingEvent(
                          "champ-swap-cancel-success",
                          1,
                          "event",
                        );
                        break;
                      case f:
                        i.Telemetry.recordNonTimingTracingEvent(
                          "champ-swap-decline-success",
                          1,
                          "event",
                        );
                        break;
                      case S:
                        i.Telemetry.recordNonTimingTracingEvent(
                          "champ-swap-clear-success",
                          1,
                          "event",
                        );
                    }
                  });
              })
              .catch((e) => {
                this.recordDidRequestSucceed &&
                  this.recordDidRequestSucceed(!1, e);
                i.DataBinding.bindTo(i.default.getProvider().getSocket())
                  .get("/lol-summoner/v1/current-summoner")
                  .then(function (t) {
                    const { accountId: s, puuid: o, summonerId: a } = t;
                    i.Telemetry.invokeWithLowProbability(function () {
                      const t = e && e.responseText ? e.responseText : "",
                        r = JSON.stringify({
                          accountId: s,
                          clientDateISOString: new Date().toISOString(),
                          puuid: o,
                          responseText: t,
                          summonerId: a,
                        });
                      switch (n) {
                        case g:
                          i.Telemetry.sendEvent("champ-swap-accept-fail", r),
                            i.Telemetry.recordNonTimingTracingEvent(
                              "champ-swap-accept-fail",
                              1,
                              "event",
                            );
                          break;
                        case h:
                          i.Telemetry.sendEvent("champ-swap-cancel-fail", r),
                            i.Telemetry.recordNonTimingTracingEvent(
                              "champ-swap-cancel-fail",
                              1,
                              "event",
                            );
                          break;
                        case f:
                          i.Telemetry.sendEvent("champ-swap-decline-fail", r),
                            i.Telemetry.recordNonTimingTracingEvent(
                              "champ-swap-decline-fail",
                              1,
                              "event",
                            );
                          break;
                        case S:
                          i.Telemetry.sendEvent("champ-swap-clear-fail", r),
                            i.Telemetry.recordNonTimingTracingEvent(
                              "champ-swap-clear-fail",
                              1,
                              "event",
                            );
                      }
                    });
                  });
              });
          },
          actions: {
            acceptSwap: function (e) {
              return (
                i.Telemetry.startTracingEvent("champ-select-swap-accept"),
                this.swapServiceCall(e, d, g).finally(() => {
                  window.requestAnimationFrame(() => {
                    i.Telemetry.endTracingEvent("champ-select-swap-accept");
                  });
                })
              );
            },
            closeSwap: function (e, t) {
              return t === c.SENT
                ? this.swapServiceCall(e, d, h)
                : t === c.RECEIVED
                  ? this.swapServiceCall(e, d, f)
                  : void 0;
            },
          },
        });
        t.default = _;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "qH237EqE",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\swap-dialog-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\swap-dialog-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\swap-dialog-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["swap-dialog animated ",["helper",["unless"],[["get",["showAcceptSwapButton"]],"not-received"],null]," ",["unknown",["swapStateClass"]]," ",["helper",["if"],[["get",["isDisplayed"]],"active"],null]]]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-flyout-frame",[]],["static-attr","orientation","right"],["dynamic-attr","show",["unknown",["isDisplayed"]],null],["dynamic-attr","animated",["unknown",["isAnimated"]],null],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","swap-wrapper"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","swap-container"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","swap-content-container"],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","swap-message"],["flush-element"],["append",["unknown",["swapMessageString"]],false],["close-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","button-group"],["flush-element"],["text","\\n"],["block",["if"],[["get",["showAcceptSwapButton"]]],null,2],["block",["if"],[["get",["showCancelSwapButton"]]],null,1],["text","          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n"],["block",["if"],[["get",["isSwapInProgress"]]],null,0],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","swap-timer-wrapper"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","swap-timer"],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","action-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"closeSwap",["get",["swap","id"]],["get",["swap","state"]]],null],null],["flush-element"],["text","\\n               "],["open-element","div",[]],["static-attr","class","action-button-inner-container"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","decline-icon"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","action-text"],["flush-element"],["text","\\n                  "],["append",["unknown",["tra","pregame_swap_cancel"]],false],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","action-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"acceptSwap",["get",["swap","id"]]],null],null],["flush-element"],["text","\\n              "],["open-element","div",[]],["static-attr","class","action-button-inner-container"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","action-icon"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","action-text"],["flush-element"],["text","\\n                  "],["append",["unknown",["tra","pregame_swap_accept"]],false],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n             "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","action-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"closeSwap",["get",["swap","id"]],["get",["swap","state"]]],null],null],["flush-element"],["text","\\n               "],["open-element","div",[]],["static-attr","class","action-button-inner-container"],["flush-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","decline-icon"],["flush-element"],["close-element"],["text","\\n                "],["open-element","div",[]],["static-attr","class","action-text"],["flush-element"],["text","\\n                  "],["append",["unknown",["tra","pregame_swap_decline"]],false],["text","\\n                "],["close-element"],["text","\\n              "],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(1);
        n(253);
        const s = i.Ember.Component.extend({
          layout: n(254),
          classNames: ["ward-skin-select-flyout"],
          contextWardSkin: i.Ember.computed(
            "hoveredWardSkin",
            "selectedWardSkin",
            function () {
              return (
                this.get("hoveredWardSkin") || this.get("selectedWardSkin")
              );
            },
          ),
          imageStyle: i.Ember.computed(
            "map.assets.champ-select-flyout-background",
            function () {
              return (
                'background-image: url("' +
                this.get("map.assets.champ-select-flyout-background") +
                '")'
              );
            },
          ),
          actions: {
            onFlyoutWardHover(e) {
              this.set("hoveredWardSkin", e);
            },
          },
        });
        e.exports = s;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "U4dWJgYm",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\ward-skin-popup\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\ward-skin-popup\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\ward-skin-popup\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","ward-skin-details"],["dynamic-attr","style",["unknown",["imageStyle"]],null],["flush-element"],["text","\\n  "],["open-element","img",[]],["static-attr","class","ward-skin-shadow"],["dynamic-attr","src",["concat",[["unknown",["contextWardSkin","wardShadowImagePath"]]]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","img",[]],["static-attr","class","ward-skin-image"],["dynamic-attr","src",["concat",[["unknown",["contextWardSkin","wardImagePath"]]]]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","ward-skin-name"],["flush-element"],["text","\\n    "],["append",["unknown",["contextWardSkin","name"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","class","ward-skins"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["block",["each"],[["get",["wardSkins"]]],null,1],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["flyout-selector-popup-button"],null,[["item","selectedItem","onFlyoutItemSelected","onFlyoutItemHover"],[["get",["wardSkin"]],["get",["selectedWardSkin"]],["get",["onWardSkinConfirmed"]],["helper",["action"],[["get",[null]],"onFlyoutWardHover"],null]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["unless"],[["get",["wardSkin","locked"]]],null,0]],"locals":["wardSkin"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(1),
          s = n(60),
          o = r(n(58));
        n(256);
        var a = r(n(66));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const l = i.UiKitPlugin.getFlyoutManager();
        e.exports = i.Ember.Component.extend({
          layout: n(257),
          classNames: ["ward-skin-container"],
          loadoutsService: i.Ember.inject.service("loadouts"),
          wardSkinIndex: 0,
          disabled: !1,
          useLoadouts: !1,
          isFlyoutOpen: !1,
          didUserChangeItem: !1,
          flyoutImageStyle: i.Ember.computed(
            "map.assets.champ-select-flyout-background",
            function () {
              return (
                'background-image: url("' +
                this.get("map.assets.champ-select-flyout-background") +
                '")'
              );
            },
          ),
          wardSkinDisabledTooltipText: i.Ember.computed(
            "isDonePicking",
            function () {
              return this.get("isDonePicking")
                ? this.get("tra.ward_skin_button_disabled")
                : this.get("tra.ward_skin_button_disabled_not_done_picking");
            },
          ),
          init: function () {
            this._super(...arguments);
            this.set("flyoutOptions", {
              targetAnchor: { x: "center", y: "top" },
              tooltipAnchor: { x: "center", y: "bottom" },
              offset: { x: 0, y: -20 },
              backdropCutout: null,
              orientation: "top",
              animated: !1,
            });
          },
          setWardSkinViaPlatform: function (e) {
            a.default
              .ajax({
                url: "/lol-champ-select/v1/session/my-selection",
                contentType: "application/json",
                data: JSON.stringify({ wardSkinId: e.get("id") }),
                method: "PATCH",
                errorMessage: "error_could_not_set_ward_skin",
              })
              .then(() => {
                this.recordDidRequestSucceed &&
                  this.recordDidRequestSucceed(!0);
              })
              .catch((e) => {
                this.recordDidRequestSucceed &&
                  this.recordDidRequestSucceed(!1, e);
              });
          },
          actions: {
            toggleFlyout(e) {
              const t = this.get("wardSkins").indexOf(e.selectedItem);
              -1 === t
                ? this.set("isFlyoutOpen", !1)
                : (l.repositionCaret(0),
                  this.get("isFlyoutOpen") ||
                    o.default.playSound(
                      s.SFX_CHANNEL,
                      `${s.SOUNDS_PATH}/sfx-cs-spells-open.ogg`,
                    ),
                  this.set("wardSkinIndex", t),
                  this.set("isFlyoutOpen", !this.get("isFlyoutOpen")));
            },
            onWardSkinConfirmed(e) {
              i.Ember.get(e, "locked") ||
                (i.Telemetry.startTimer("champ-select-ward-skin-selected"),
                i.Telemetry.sendEvent("champ-select-ward-skin-selected"),
                o.default.playSound(
                  s.SFX_CHANNEL,
                  `${s.SOUNDS_PATH}/sfx-cs-ward-select.ogg`,
                ),
                this.get("useLoadouts")
                  ? this.get("loadoutsService").setWardSkinViaLoadouts(
                      e,
                      this.get("accountLoadout.id"),
                      this.recordDidRequestSucceed,
                    )
                  : this.setWardSkinViaPlatform(e),
                this.set("isFlyoutOpen", !1),
                this.set("didUserChangeItem", !0));
            },
            afterUserChangedItemAnimation() {
              this.set("didUserChangeItem", !1);
            },
          },
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "8Ye2WOLh",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\ward-skin-select-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\ward-skin-select-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\ward-skin-select-component\\\\index.js\\" "],["text","\\n"],["append",["helper",["flyout-selector-trigger-button"],null,[["selectedItem","toggleFlyout","disabled","imageStyle","didUserChangeItem","afterUserChangedItemAnimation"],[["get",["selectedWardSkin"]],["helper",["action"],[["get",[null]],"toggleFlyout"],null],["get",["disabled"]],["get",["flyoutImageStyle"]],["get",["didUserChangeItem"]],["helper",["action"],[["get",[null]],"afterUserChangedItemAnimation"],null]]]],false],["text","\\n"],["open-element","lc-flyout",[]],["dynamic-attr","open",["unknown",["isFlyoutOpen"]],null],["dynamic-attr","onHide",["helper",["action"],[["get",[null]],"toggleFlyout"],null],null],["dynamic-attr","uiKitOptionOverrides",["unknown",["flyoutOptions"]],null],["flush-element"],["text","\\n  "],["open-element","lc-flyout-content",[]],["flush-element"],["text","\\n    "],["append",["helper",["ward-skin-popup"],null,[["selectedWardSkin","wardSkins","map","onWardSkinConfirmed"],[["get",["selectedWardSkin"]],["get",["wardSkins"]],["get",["map"]],["helper",["action"],[["get",[null]],"onWardSkinConfirmed"],null]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["block",["if"],[["get",["disabled"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["static-attr","class","champ-select-edit-ward-skin-tooltip"],["flush-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["wardSkinDisabledTooltipText"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition","type","offsetY"],["top","system",22]],0]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(1);
        n(259),
          (e.exports = i.Ember.Component.extend({
            layout: n(260),
            classNames: ["missions-tracker-button-component"],
            missionsButton: null,
            missionsButtonEnabled: i.Ember.computed(
              "jmxSettings",
              "jmxSettings.Missions.MissionsEnabled",
              "jmxSettings.Missions.MissionsFrontEndEnabled",
              "entitlements.entitlements.[]",
              function () {
                let e = !1,
                  t = !1;
                this.get("jmxSettings") &&
                  ((e =
                    !1 !== this.get("jmxSettings.Missions.MissionsEnabled")),
                  (t =
                    !1 !==
                    this.get("jmxSettings.Missions.MissionsFrontEndEnabled")));
                const n = this.get("entitlements.entitlements"),
                  i =
                    n &&
                    n.includes("urn:entitlement:globalriot.missions.enabled");
                return e && (t || i);
              },
            ),
            click() {
              i.Telemetry.recordNonTimingTracingEvent(
                "champ-select-missions-button-click",
                1,
                "click",
              );
            },
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "Ok+mF9j9",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\missions-tracker-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\missions-tracker-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\missions-tracker-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["missionsButtonEnabled"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["unknown",["missions-button"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        n(262);
        const i = n(1),
          { Ember: s } = i;
        e.exports = s.Component.extend({
          classNames: ["vote-reveal"],
          classNameBindings: ["visible:visible:removed"],
          layout: n(263),
          voteRevealLabel: s.computed.readOnly("tra.vote_reveal_message"),
          championName: s.computed.readOnly("summoner.champion.name"),
        });
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "K9xCuqRz",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\vote-reveal-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\vote-reveal-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\vote-reveal-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","vote-reveal-label"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","vote-reveal-text"],["flush-element"],["text","\\n    "],["append",["unknown",["voteRevealLabel"]],false],["text","\\n    "],["open-element","div",[]],["static-attr","class","text-glow"],["flush-element"],["text","\\n      "],["append",["unknown",["voteRevealLabel"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","vote-reveal-champion-name-wrapper"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","line line-left"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","vote-reveal-champion-name-text vote-reveal-champion-name"],["flush-element"],["text","\\n      "],["append",["unknown",["championName"]],false],["text","\\n      "],["open-element","div",[]],["static-attr","class","text-glow vote-reveal-champion-name"],["flush-element"],["text","\\n        "],["append",["unknown",["championName"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","line line-right"],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i,
          s = n(1),
          o = n(265),
          a = (i = n(58)) && i.__esModule ? i : { default: i };
        const { RunMixin: r } = s.EmberAddons.EmberLifeline,
          l = new Set([
            "champion-ban-vo",
            "champion-pick-vo",
            "champion-stinger-sfx",
          ]);
        var c = s.Ember.Service.extend(r, {
          audioPool: a.default,
          init() {
            this._super(...arguments),
              (this._champVoChannelByName = {}),
              (this._sfxTimeoutByPath = {}),
              (this._champSelectScreenRoot =
                s.ViewportPlugin.fullScreen().getScreenRoot(
                  "rcp-fe-lol-champ-select",
                )),
              this.setupScreenRootListeners();
          },
          willDestroy() {
            this._super(...arguments),
              this._champSelectBinding.unobserve("/v1/sfx-notifications", this),
              this.stopAllAudio();
          },
          initDataBindings() {
            (this._champSelectBinding = (0, s.DataBinding)(
              "/lol-champ-select",
              (0, s.getProvider)().getSocket(),
            )),
              this._champSelectBinding.observe(
                "/v1/sfx-notifications",
                this,
                this.handleSfxNotifications.bind(this),
              );
          },
          setupScreenRootListeners() {
            this._champSelectScreenRoot.on("hide", () => this.stopAllAudio());
          },
          getChampVoChannel(e) {
            return (
              this._champVoChannelByName[e] ||
                (this._champVoChannelByName[e] = s.AudioPlugin.getChannel(e)),
              this._champVoChannelByName[e]
            );
          },
          handleSfxNotifications(e) {
            (e || []).forEach((e) => {
              const { eventType: t } = e;
              l.has(t) ? this.playChampionSfx(e) : this.playChampSelectSfx(e);
            });
          },
          playChampSelectSfx(e) {
            const { delayMillis: t, eventType: n } = e,
              { path: i, playOptions: s } = o.soundOptionsByEventType[n];
            this._sfxTimeoutByPath[i] = this.runTask(() => {
              this.audioPool.playSound(o.defaultSfxChannel, i, s),
                delete this._sfxTimeoutByPath[i];
            }, t);
          },
          playChampionSfx(e) {
            const { path: t, eventType: n, delayMillis: i } = e,
              { channelName: s, playOptions: a } = o.soundOptionsByEventType[n],
              r = this.getChampVoChannel(s);
            this._sfxTimeoutByPath[t] = this.runTask(() => {
              a.shouldStopChannelAudio && this.stopChannelAudio(r),
                r.playSound(t, a),
                delete this._sfxTimeoutByPath[t];
            }, i);
          },
          stopChannelAudio: (e) =>
            Promise.all(
              e.playingSounds.map((e) => e.stop().then(() => e.dispose())),
            ),
          stopAllAudio: function () {
            return (
              Object.keys(this._sfxTimeoutByPath).forEach((e) => {
                this.cancelTask(this._sfxTimeoutByPath[e]);
              }),
              (this._sfxTimeoutByPath = {}),
              Promise.all(
                Object.keys(this._champVoChannelByName).map((e) => {
                  const t = this._champVoChannelByName[e];
                  return this.stopChannelAudio(t);
                }),
              )
            );
          },
        });
        t.default = c;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.soundOptionsByEventType = t.defaultSfxChannel = void 0);
        t.defaultSfxChannel = "sfx-notifications";
        const n = { shouldStopChannelAudio: !0, shouldDuckOtherChannels: !0 },
          i = {
            "draft-my-team-first-pick-notif": {
              path: "/fe/lol-champ-select/sounds/sfx-cs-draft-left-first-pick.ogg",
            },
            "draft-their-team-first-pick-notif": {
              path: "/fe/lol-champ-select/sounds/sfx-cs-draft-right-first-pick.ogg",
            },
            "draft-my-pick-sniped": {
              path: "/fe/lol-champ-select/sounds/sfx-cs-draft-10ban-your-pick-denied.ogg",
            },
            "draft-pick-locked-in-my-team-single": {
              path: "/fe/lol-champ-select/sounds/sfx-cs-draft-left-pick-single.ogg",
            },
            "draft-pick-locked-in-their-team-single": {
              path: "/fe/lol-champ-select/sounds/sfx-cs-draft-right-pick-single.ogg",
            },
            "ten-bans-my-ban-completed": {
              path: "/fe/lol-champ-select/sounds/sfx-cs-draft-10ban-your-ban.ogg",
            },
            "ten-bans-ally-ban-completed": {
              path: "/fe/lol-champ-select/sounds/sfx-cs-draft-10ban-ally-ban.ogg",
              playOptions: { maxConcurrent: 5 },
            },
            "my-turn-to-ban": {
              path: "/fe/lol-champ-select/sounds/sfx-cs-draft-notif-yourban.ogg",
            },
            "my-turn-to-pick": {
              path: "/fe/lol-champ-select/sounds/sfx-cs-draft-notif-yourpick.ogg",
            },
            "serial-bans-ally-ban-completed": {
              path: "/fe/lol-champ-select/sounds/sfx-cs-draft-ban-your-team.ogg",
            },
            "serial-bans-enemy-ban-completed": {
              path: "/fe/lol-champ-select/sounds/sfx-cs-draft-ban-enemy-team.ogg",
            },
            "champion-ban-vo": {
              path: "",
              channelName: "vo-ban-champion",
              playOptions: n,
            },
            "champion-pick-vo": {
              path: "",
              channelName: "vo-pick-champion",
              playOptions: n,
            },
            "champion-stinger-sfx": {
              path: "",
              channelName: "sfx-champions",
              playOptions: { duckOtherChannels: !0 },
            },
            "pin-drop-local-player": {
              path: "/fe/lol-champ-select/sounds/sfx-cs-draft-posassign-player.ogg",
            },
            "pin-drop-ally-0": {
              path: "/fe/lol-champ-select/sounds/sfx-cs-draft-posassign-ally-0.ogg",
            },
            "pin-drop-ally-1": {
              path: "/fe/lol-champ-select/sounds/sfx-cs-draft-posassign-ally-1.ogg",
            },
            "pin-drop-ally-2": {
              path: "/fe/lol-champ-select/sounds/sfx-cs-draft-posassign-ally-2.ogg",
            },
            "pin-drop-ally-3": {
              path: "/fe/lol-champ-select/sounds/sfx-cs-draft-posassign-ally-3.ogg",
            },
            "pin-drop-ally-4": {
              path: "/fe/lol-champ-select/sounds/sfx-cs-draft-posassign-ally-4.ogg",
            },
          };
        t.soundOptionsByEventType = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i,
          s = n(1),
          o = n(60),
          a = (i = n(72)) && i.__esModule ? i : { default: i };
        const { RunMixin: r } = s.EmberAddons.EmberLifeline;
        var l = s.Ember.Service.extend(r, a.default, {
          init: function () {
            this._super(...arguments),
              (this.champSelectBinding = (0, s.DataBinding)(
                "/lol-champ-select",
                (0, s.getProvider)().getSocket(),
              )),
              this.champSelectBinding.observe(
                "/v1/session",
                this,
                this._handleChampSelectSession,
              );
          },
          _handleChampSelectSession: function (e) {
            e &&
              (this._setToConnected(),
              this._cancelDisconnectTimeouts(),
              this._createDisconnectTimeout(
                e.timer.adjustedTimeLeftInPhase + this._getDisconnectDelayMs(),
              ),
              this._createDisconnectShouldExitTimeout(
                e.timer.adjustedTimeLeftInPhase +
                  this._getDisconnectShouldExitDelayMs(),
              ),
              (this._session = e));
          },
          _setToConnected: function () {
            this.set("isDisconnected", !1), this._setDisconnectShouldExit(!1);
          },
          _getDisconnectDelayMs: function () {
            const e = this.get(
              "jmxSettings.LcuChampionSelect.DisconnectDelayMs",
            );
            return e || o.DEFAULT_DISCONNECT_DELAY_MS;
          },
          _getDisconnectShouldExitDelayMs: function () {
            const e = this.get(
              "jmxSettings.LcuChampionSelect.DisconnectShouldExitDelayMs",
            );
            return e || o.DEFAULT_DISCONNECT_SHOULD_EXIT_DELAY_MS;
          },
          _cancelDisconnectTimeouts: function () {
            this.cancelTask(this._setDisconnectTimeout),
              this.cancelTask(this._setDisconnectShouldExitTimeout),
              (this._setDisconnectTimeout = null),
              (this._setDisconnectShouldExitTimeout = null);
          },
          _createDisconnectTimeout: function (e) {
            this._setDisconnectTimeout = this.runTask(() => {
              this.set("isDisconnected", !0);
            }, e);
          },
          _createDisconnectShouldExitTimeout: function (e) {
            this._setDisconnectShouldExitTimeout = this.runTask(() => {
              this._setDisconnectShouldExit(!0);
            }, e);
          },
          _setDisconnectShouldExit: function (e) {
            this.set("disconnectShouldExit", e);
            const t = this._disconnectShouldExitCallback;
            t && t(e);
          },
          setDisconnectShouldExitCallback: function (e) {
            this._disconnectShouldExitCallback = e;
          },
          receivedServiceCallResponse: function (e = null) {
            if (!this._session) return;
            const t = this.get("isDisconnected");
            t && !e
              ? (this._cancelDisconnectTimeouts(),
                this._setToConnected(),
                this._createDisconnectTimeout(
                  this._session.timer.adjustedTimeLeftInPhase +
                    this._getDisconnectDelayMs(),
                ),
                this._createDisconnectShouldExitTimeout(
                  this._session.timer.adjustedTimeLeftInPhase +
                    this._getDisconnectShouldExitDelayMs(),
                ))
              : !t &&
                this._isDisconnectError(e) &&
                (this._cancelDisconnectTimeouts(),
                this._createDisconnectTimeout(0),
                this._createDisconnectShouldExitTimeout(
                  this._session.timer.adjustedTimeLeftInPhase +
                    this._getDisconnectShouldExitDelayMs(),
                ));
          },
          _isDisconnectError: function (e) {
            if (e && e.responseJSON && e.responseJSON.message) {
              const t = e.responseJSON.message;
              for (const e in o.DISCONNECT_ERROR_INDICATORS)
                if (t.includes(e)) return !0;
            }
            return !1;
          },
        });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = n(1),
          s = i.Ember.Service.extend({
            init: function () {
              this._super(...arguments),
                (this.champSelectBinding = (0, i.DataBinding)(
                  "/lol-champ-select",
                  (0, i.getProvider)().getSocket(),
                )),
                this.champSelectBinding.observe(
                  "/v1/pickable-champion-ids",
                  this,
                  this.handlePickableChampionIds,
                ),
                this.champSelectBinding.observe(
                  "/v1/bannable-champion-ids",
                  this,
                  this.handleBannableChampionIds,
                );
            },
            handlePickableChampionIds: function (e) {
              this.set("pickableChampionSet", new Set(e || []));
            },
            handleBannableChampionIds: function (e) {
              this.set("bannableChampionSet", new Set(e || []));
            },
          });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = n(1),
          s = i.Ember.Service.extend({
            _chatBinding: null,
            _champSelectBinding: null,
            _loginBinding: null,
            _gameflowBinding: null,
            _callbacks: null,
            conversationId: null,
            summonerId: 0,
            currentPhase: null,
            init() {
              this._super(...arguments),
                (this._callbacks = new Map()),
                (this._chatBinding = (0, i.DataBinding)(
                  "/lol-chat",
                  (0, i.getProvider)().getSocket(),
                )),
                (this._champSelectBinding = (0, i.DataBinding)(
                  "/lol-champ-select",
                  (0, i.getProvider)().getSocket(),
                )),
                (this._loginBinding = (0, i.DataBinding)(
                  "/lol-login",
                  (0, i.getProvider)().getSocket(),
                )),
                (this._gameflowBinding = (0, i.DataBinding)(
                  "/lol-gameflow",
                  (0, i.getProvider)().getSocket(),
                )),
                this._loginBinding.observe("/v1/session", this, (e) => {
                  e && e.summonerId && this.set("summonerId", e.summonerId);
                }),
                this._gameflowBinding.observe("/v1/session", this, (e) => {
                  if (e && e.phase) {
                    const t = this.get("currentPhase");
                    "ChampSelect" === e.phase && "ChampSelect" !== t
                      ? this._chatBinding.observe(
                          "/v1/conversations",
                          this,
                          this._handleChatConversationUpdate.bind(this),
                        )
                      : "ChampSelect" !== e.phase &&
                        "ChampSelect" === t &&
                        this._unobserveSessionBindings(),
                      this.set("currentPhase", e.phase);
                  }
                });
            },
            _getParticipantsUrl: function () {
              return `/v1/conversations/${this.get(
                "conversationId",
              )}/participants`;
            },
            _handleChatConversationUpdate: function (e) {
              if (!e || !e.length) return;
              const t = e.find((e) => "championSelect" === e.type);
              if (t && t.id) {
                const e = encodeURIComponent(t.id);
                this.set("conversationId", e),
                  this._chatBinding.observe(
                    this._getParticipantsUrl(),
                    this,
                    this._handleChatParticipantsUpdate.bind(this),
                  );
              }
            },
            _handleChatParticipantsUpdate: function (e) {
              if (e) {
                e.find((e) => e.summonerId === this.get("summonerId")) &&
                  this._champSelectBinding.observe(
                    "/v1/session",
                    this,
                    this._handleChampSelectSessionUpdate.bind(this),
                  );
              }
            },
            _handleChampSelectSessionUpdate: function (e) {
              for (const t of this._callbacks.values()) t(e);
            },
            registerSessionChangeCallback: function (e, t) {
              this._callbacks.set(e, t);
            },
            _unobserveSessionBindings: function () {
              this._chatBinding &&
                (this._chatBinding.unobserve("/v1/conversations", this),
                this.get("conversationId") &&
                  (this._chatBinding.unobserve(
                    this._getParticipantsUrl(),
                    this,
                  ),
                  this.set("conversationId", void 0))),
                this._champSelectBinding &&
                  this._champSelectBinding.unobserve("/v1/session", this);
            },
            removeSessionChangeCallback: function (e) {
              this._callbacks.has(e) && this._callbacks.delete(e);
            },
            sendChatMessage: function (e, t = "celebration") {
              const n = this.get("conversationId");
              if (!n || !this.get("summonerId"))
                return Promise.reject(
                  "Unresolved conversationId or summonerId",
                );
              const i = { body: e, type: t };
              return this._chatBinding.post(
                `/v1/conversations/${n}/messages`,
                i,
              );
            },
          });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i,
          s = (i = n(66)) && i.__esModule ? i : { default: i };
        const o = n(1),
          { Ember: a } = o,
          { Telemetry: r } = o;
        var l = a.Service.extend({
          setWardSkinViaLoadouts: function (e, t, n) {
            const i = r.startTimer("champ-select-ward-skin-selected");
            t
              ? this.updateLoadout({
                  wardSkinId: e.get("id"),
                  accountLoadoutId: t,
                  timerId: i,
                  recordDidRequestSucceed: n,
                })
              : this.createNewAccountLoadout({
                  wardSkinId: e.get("id"),
                  timerId: i,
                  recordDidRequestSucceed: n,
                });
          },
          updateLoadout: function ({
            accountLoadoutId: e,
            wardSkinId: t,
            timerId: n,
            recordDidRequestSucceed: i,
          }) {
            const o = {
              id: e,
              loadout: {
                WARD_SKIN_SLOT: { inventoryType: "WARD_SKIN", itemId: t },
              },
            };
            s.default
              .ajax({
                url: `/lol-loadouts/v4/loadouts/${e}`,
                contentType: "application/json",
                data: JSON.stringify(o),
                method: "PATCH",
                errorMessage: "error_could_not_set_ward_skin",
              })
              .catch((e) => {
                i && i(!1, e),
                  this.isDestroying ||
                    this.isDestroyed ||
                    this.set("setSelectedError", !0);
              })
              .then(() => {
                i && i(!0), r.stopAndRecordTimer(n);
              });
          },
          createNewAccountLoadout: function ({
            wardSkinId: e,
            timerId: t,
            recordDidRequestSucceed: n,
          }) {
            const i = {
              scope: "ACCOUNT",
              loadout: {
                WARD_SKIN_SLOT: { inventoryType: "WARD_SKIN", itemId: e },
              },
            };
            s.default
              .ajax({
                url: "/lol-loadouts/v4/loadouts",
                contentType: "application/json",
                data: JSON.stringify(i),
                method: "POST",
                errorMessage: "error_could_not_set_ward_skin",
              })
              .catch((e) => {
                n && n(!1, e),
                  this.isDestroying ||
                    this.isDestroyed ||
                    this.set("setSelectedError", !0);
              })
              .then(() => {
                n && n(!0), r.stopAndRecordTimer(t);
              });
          },
        });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i,
          s = n(1),
          o = n(60),
          a = (i = n(66)) && i.__esModule ? i : { default: i },
          r = n(271);
        var l = s.Ember.Service.extend({
          init: function () {
            this._super(...arguments),
              (this.binding = s.DataBinding.bindTo(
                (0, s.getProvider)().getSocket(),
              )),
              this.binding.observe(
                "/lol-inventory/v2/inventory/CHAMPION_SKIN",
                this,
                this.handleSkinInventoryUpdate,
              ),
              this.binding.observe(
                "/lol-gameflow/v1/session",
                this,
                this.handleGameflowSessionUpdate,
              );
          },
          getSkinPurchaseCallback(e) {
            return () => {
              s.logger.trace(
                `Skin purchase successful. Setting last purchased skin to: ${e}`,
              ),
                (this._lastPurchasedSkinId = e);
            };
          },
          openPAWModal: function (e, t) {
            t && (this._recordDidRequestSucceed = t);
            const n = this.getSkinPurchaseCallback(e && e.itemId);
            if (e && e.tags && e.tags.includes(o.QUEST_SKIN_TAG)) {
              const t = {
                templateType: r.PAW.TEMPLATE_TYPES.LARGE_TWO_COLUMN_LANDSCAPE,
              };
              s.PurchaseAnywhereApi.createPawTemplateModalAsync(
                e.offerId,
                t,
                o.CHAMP_SELECT_PAW_SOURCE,
              ).then(() => {
                s.PurchaseAnywhereApi.getBaseSkinLineData(e.offerId).then(
                  (e) => {
                    (e.onPurchaseComplete = n),
                      s.PurchaseAnywhereApi.populatePawTemplateModal(e);
                  },
                );
              });
            } else
              s.PurchaseAnywhereApi.createPAWModal(
                {
                  itemId: e.itemId,
                  inventoryType: r.PAW.INVENTORY_TYPES.CHAMPION_SKIN,
                },
                o.CHAMP_SELECT_PAW_SOURCE,
                r.PAW.MODAL_TYPES.CHROMA_MODAL,
                null,
                n,
              );
          },
          handleSkinInventoryUpdate: function (e) {
            if (
              this.gameflowPhase === o.GAMEFLOW_PHASE_CHAMP_SELECT &&
              this._lastPurchasedSkinId
            ) {
              const t = (e || []).find(
                (e) => e.itemId === this._lastPurchasedSkinId,
              );
              return t
                ? this.updateInventoryAndSelectSkin(t.itemId)
                : (s.logger.trace(
                    `Inventory update did not contain skin that was purchased in champ select ${this._lastPurchasedSkinId}`,
                  ),
                  this.updateSimpleInventory());
            }
          },
          handleGameflowSessionUpdate: function (e) {
            const { phase: t } = e;
            t !== o.GAMEFLOW_PHASE_CHAMP_SELECT &&
              (this._lastPurchasedSkinId = void 0),
              (this.gameflowPhase = t);
          },
          updateInventoryAndSelectSkin(e) {
            return this.updateSimpleInventory().then(
              () => {
                this.setSkin(e);
              },
              () => {
                this.setSkin(e);
              },
            );
          },
          updateSimpleInventory: function () {
            return (
              s.logger.trace("Updating inventory."),
              this.binding.post("/lol-champ-select/v1/session/simple-inventory")
            );
          },
          setSkin: function (e) {
            const t = this._recordDidRequestSucceed;
            return a.default
              .ajax({
                url: "/lol-champ-select/v1/session/my-selection",
                contentType: "application/json",
                data: JSON.stringify({ selectedSkinId: e }),
                method: "PATCH",
                errorMessage: "error_could_not_set_skin",
              })
              .then(() => {
                t && t(!0);
              })
              .catch((e) => {
                t && t(!1, e);
              });
          },
        });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "PAW", {
            enumerable: !0,
            get: function () {
              return i.default;
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
              return o.default;
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
        var i = m(n(272)),
          s = m(n(283)),
          o = m(n(284)),
          a = m(n(285)),
          r = m(n(286)),
          l = m(n(287)),
          c = m(n(288));
        function m(e) {
          return e && e.__esModule ? e : { default: e };
        }
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = d(n(273)),
          s = d(n(274)),
          o = d(n(275)),
          a = d(n(276)),
          r = d(n(277)),
          l = d(n(278)),
          c = d(n(279)),
          m = d(n(280)),
          u = d(n(281)),
          p = d(n(282));
        function d(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var h = {
          COMPONENT_TYPES: i.default,
          CURRENCY_TYPES: s.default,
          INVENTORY_TYPES: o.default,
          MEDIA_TYPES: a.default,
          MEDIA_LOAD_TYPES: r.default,
          MODAL_TYPES: l.default,
          OFFER_PURCHASE_STATES: c.default,
          OFFER_VALIDATION_STATES: m.default,
          SCROLL_LIST_DISPLAY_TYPES: u.default,
          TEMPLATE_TYPES: p.default,
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
          i = "RANKED_FLEX_SR",
          s = "RANKED_FLEX_TT",
          o = "CHERRY",
          a = "RANKED_TFT",
          r = "RANKED_TFT_DOUBLE_UP",
          l = "RANKED_TFT_TURBO",
          c = "RANKED_TFT_PAIRS",
          m = [n, i],
          u = [...m, s],
          p = [o],
          d = [a, r],
          h = [l, c],
          g = [...d, ...h],
          f = [...u, ...d],
          S = [...h, ...p];
        var _ = {
          RANKED_SOLO_5x5_QUEUE_TYPE: n,
          RANKED_FLEX_SR_QUEUE_TYPE: i,
          RANKED_FLEX_TT_QUEUE_TYPE: s,
          RANKED_CHERRY_QUEUE_TYPE: o,
          RANKED_TFT_QUEUE_TYPE: a,
          RANKED_TFT_DOUBLE_UP_QUEUE_TYPE: r,
          RANKED_TFT_TURBO_QUEUE_TYPE: l,
          RANKED_TFT_PAIRS_QUEUE_TYPE: c,
          RANKED_LOL_QUEUE_TYPES: u,
          RANKED_SR_QUEUE_TYPES: m,
          RANKED_TFT_QUEUE_TYPES: d,
          RATED_TFT_QUEUE_TYPES: h,
          RANKED_AND_RATED_TFT_QUEUE_TYPES: g,
          ALL_RANKED_QUEUE_TYPES: f,
          ALL_RATED_QUEUE_TYPES: S,
          ALL_RANKED_AND_RATED_QUEUE_TYPES: [...f, ...S],
        };
        t.default = _;
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
          i = { PRIVATE: "PRIVATE", PUBLIC: "PUBLIC" };
        var s = {
          ProfilePrivacyEnabledState: n,
          ProfilePrivacySetting: i,
          DEFAULT_PROFILE_PRIVACY: {
            enabledState: n.UNKNOWN,
            setting: i.PUBLIC,
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
        const i = 36e5,
          s = 864e5,
          o = 6048e5,
          a = {
            MILLISECONDS_IN_A_SECOND: 1e3,
            MILLISECONDS_IN_A_MINUTE: 6e4,
            MILLISECONDS_IN_A_HOUR: i,
            MILLISECONDS_IN_A_DAY: s,
            MILLISECONDS_IN_A_WEEK: o,
            MILLISECONDS_IN_A_YEAR: 314496e5,
          };
        t.TIME_CONVERSIONS = a;
        var r = { TIME_UNITS: n, TIME_CONVERSIONS: a };
        t.default = r;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = n(1),
          s = i.Ember.Service.extend({
            init: function () {
              this._super(...arguments), (this.summonerInfoById = new Map());
            },
            getSummonerInfo: function (e) {
              return e
                ? this.summonerInfoById.has(e)
                  ? Promise.resolve(this.summonerInfoById.get(e))
                  : this._fetchSummonerInfo(e)
                : Promise.resolve({});
            },
            _fetchSummonerInfo: function (e) {
              return (0, i.DataBinding)("/lol-summoner")
                .get(`/v1/summoners/${e}`)
                .then((t) => {
                  if (!t)
                    return {
                      summonerName: void 0,
                      gameName: void 0,
                      tagLine: void 0,
                      puuid: void 0,
                    };
                  const {
                      displayName: n,
                      gameName: i,
                      tagLine: s,
                      puuid: o,
                    } = t,
                    a = { summonerName: n, gameName: i, tagLine: s, puuid: o };
                  return n && this.summonerInfoById.set(e, a), a;
                });
            },
          });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var i = n(1),
          s = i.Ember.Service.extend({
            playerReportSenderBasePath: "/lol-player-report-sender",
            champSelectReportPath: "/v1/champ-select-reports",
            init() {
              this._super(...arguments), this.initDataBindings();
            },
            willDestroy() {
              this.removeDataBindings();
            },
            initDataBindings() {
              this.playerReportSenderBinding = (0, i.DataBinding)(
                this.get("playerReportSenderBasePath"),
                i.socket,
              );
            },
            removeDataBindings() {
              this.playerReportSenderBinding = null;
            },
            sendPlayerReport: function (e) {
              return this.playerReportSenderBinding.post(
                this.get("champSelectReportPath"),
                e,
              );
            },
          });
        t.default = s;
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "FSBnUwZq",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\templates\\\\application.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["append",["helper",["champ-select-root"],null,[["model"],[["get",["model"]]]]],false],["text","\\n\\n"],["append",["unknown",["outlet"]],false],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "xoKb0f4f",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-champ-select\\\\src\\\\app\\\\templates\\\\index.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
    ],
    t = {};
  function n(i) {
    var s = t[i];
    if (void 0 !== s) return s.exports;
    var o = (t[i] = { id: i, loaded: !1, exports: {} });
    return e[i](o, o.exports, n), (o.loaded = !0), o.exports;
  }
  (n.d = (e, t) => {
    for (var i in t)
      n.o(t, i) &&
        !n.o(e, i) &&
        Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
  }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.hmd = (e) => (
      (e = Object.create(e)).children || (e.children = []),
      Object.defineProperty(e, "exports", {
        enumerable: !0,
        set: () => {
          throw new Error(
            "ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: " +
              e.id,
          );
        },
      }),
      e
    )),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (() => {
      "use strict";
      var e,
        t = (e = n(1)) && e.__esModule ? e : { default: e };
      const i = "rcp-fe-lol-champ-select",
        s = document.currentScript.ownerDocument;
      const o = window.getPluginAnnounceEventName(i);
      s.addEventListener(
        o,
        function (e) {
          (0, e.registrationHandler)(function (e) {
            return t.default
              .init(e, {
                AudioPlugin: (e) => e.get("rcp-fe-audio"),
                ChampionStatistics: (e) =>
                  e.get("rcp-fe-lol-champion-statistics"),
                ComponentFactory: (e) =>
                  e.get("rcp-fe-common-libs").getComponentFactory(1),
                ContextualNotificationManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getContextualNotificationManager(),
                DataBinding: (e) =>
                  e
                    .get("rcp-fe-common-libs")
                    .getDataBinding("rcp-fe-lol-champ-select"),
                Ember: (e) => e.get("rcp-fe-ember-libs").getEmber(),
                EmberAddons: (e) =>
                  e.get("rcp-fe-ember-libs").getSharedEmberAddons(),
                EmberApplicationFactory: (e) =>
                  e.get("rcp-fe-ember-libs").getEmberApplicationFactory(),
                EmberDataBinding: (e) =>
                  e
                    .get("rcp-fe-ember-libs")
                    .getEmberDataBinding("rcp-fe-lol-champ-select"),
                EmberL10n: (e) => e.get("rcp-fe-ember-libs").getEmberL10n(1),
                gsap: (e) => e.get("rcp-fe-common-libs").getGsap("1"),
                l10n: (e) => e.get("rcp-fe-lol-l10n"),
                Lodash: (e) => e.get("rcp-fe-common-libs").getLodash(4),
                logger: (e) => e.get("rcp-fe-common-libs").logging.create(i),
                ModalManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getModalManager(),
                Navigation: (e) => e.get("rcp-fe-lol-navigation"),
                playerNames: (e) => e.get("rcp-fe-common-libs").playerNames,
                PremadeVoice: (e) => e.get("rcp-fe-lol-premade-voice"),
                PurchaseAnywhereApi: (e) => e.get("rcp-fe-lol-paw"),
                sharedPayments: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Payments(),
                SharedComponents: (e) => e.get("rcp-fe-lol-shared-components"),
                SharedEmberComponents: (e) =>
                  e
                    .get("rcp-fe-lol-shared-components")
                    .getSharedEmberComponents(),
                Telemetry: (e) => e.get("rcp-fe-common-libs").getTelemetry(1),
                TemplateHelper: (e) =>
                  e.get("rcp-fe-lol-uikit").getTemplateHelper(),
                TooltipManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getTooltipManager(),
                UiKitPlugin: (e) => e.get("rcp-fe-lol-uikit"),
                UXSettings: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_UXSettings(),
                ViewportPlugin: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Viewport(),
              })
              .then(function () {
                return t.default.add({
                  EmberHelpers: (e) =>
                    e.get("rcp-fe-ember-libs").getEmberHelpers(),
                });
              })
              .then(function () {
                return n(2).default;
              });
          });
        },
        { once: !0 },
      );
    })();
})();
