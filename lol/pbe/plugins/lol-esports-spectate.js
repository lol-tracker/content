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
        const i = n(1),
          { ViewportPlugin: s } = i,
          { DataBinding: o } = i,
          c = i.Bluebird;
        i.Lodash;
        var a = new (class {
          constructor() {
            (this.initialized = !1),
              (this._isShown = !1),
              (this.screenRoot = void 0),
              (this.gameflowBinding = void 0),
              (this.applicationDataPromise = void 0);
          }
          init() {
            const e = i.getProvider();
            this.initialized ||
              ((this.initialized = !0),
              (this._isShown = !1),
              (this.screenRoot = s
                .fullScreen()
                .getScreenRoot("lol-esports-spectate")),
              (this.gameflowBinding = o("/lol-gameflow", e.getSocket())),
              i.ChampSelectPlugin.registerReplacementChampSelectHandler(
                (e) => e && e.isSpectating,
                this.show.bind(this),
                this.hide.bind(this),
              ));
          }
          show() {
            this._isShown ||
              (this.preload(), this.screenRoot.bump(), (this._isShown = !0));
          }
          preload() {
            this.applicationDataPromise ||
              ((this.applicationDataPromise = new c((e) => {
                c.resolve()
                  .then(
                    (() => {
                      const t = n(3);
                      e(t.default());
                    }).bind(null, n),
                  )
                  .catch(n.oe);
              })),
              this.applicationDataPromise.then((e) => {
                this.screenRoot.getElement().appendChild(e.domNode);
              }));
          }
          hide() {
            this._isShown &&
              (this.screenRoot.release(), (this._isShown = !1), this.unload());
          }
          unload() {
            this.applicationDataPromise &&
              this.applicationDataPromise.then(
                function (e) {
                  this.screenRoot.getElement().removeChild(e.domNode),
                    c.all([e.componentPromise, e.renderPromise]).then(
                      function (e) {
                        e[0].app.destroy(),
                          (this.applicationDataPromise = void 0);
                      }.bind(this),
                    );
                }.bind(this),
              );
          }
          _isVisible() {
            return this._isShown;
          }
        })();
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.createRootComponent = l),
          (t.default = function () {
            const e = i
                .getProvider()
                .get("rcp-fe-lol-l10n")
                .tra()
                .overlay("/fe/lol-l10n/trans.json")
                .overlay("/fe/lol-esports-spectate/trans.json"),
              t = c(o, e),
              a = d.create({ traService: t });
            return (
              a.set("sessionActions", n(17).create({ root: a })),
              s.resolve().then(function () {
                return l(a, t);
              })
            );
          });
        const i = n(1),
          { Bluebird: s, Ember: o, EmberL10n: c, SharedComponents: a } = i,
          { PlayerNameComponent: r } = a.getSharedEmberComponents();
        function l(e, t) {
          return i.EmberApplicationFactory.create(
            "SpectateRootComponent",
            e,
            {
              SpectateRootComponent: n(4),
              SummonerObjectComponent: n(8),
              PlayerNameComponent: r,
            },
            t,
          );
        }
        const m = i.EmberDataBinding({
            Ember: o,
            websocket: i.getProvider().getSocket(),
            defaultPropertyValue: {},
            boundProperties: {
              gameflow: "/lol-gameflow/v1/session",
              login: "/lol-login/v1/session",
              inventory: {
                path: "/lol-champions/v1/inventories/{{loggedInPlayer}}/champions",
                objectTypes: {
                  "[]": n(11),
                  "skins[]": n(12),
                  "skins.chromas[]": n(12),
                },
                default: [],
              },
              jmxSettings: "/lol-platform-config/v1/namespaces",
              spells: {
                path: "/lol-game-data/assets/v1/summoner-spells.json",
                objectTypes: { "[]": n(13) },
                default: [],
              },
              session: {
                path: "/lol-champ-select/v1/session",
                objectTypes: {
                  "myTeam[]": n(14),
                  "theirTeam[]": n(14),
                  timer: n(15),
                  "actions:flatten[]": n(16),
                },
              },
            },
          }),
          d = o.Object.extend(m, {
            summoners: o.computed.union("session.myTeam", "session.theirTeam"),
            isSpectating: !0,
            loggedInPlayer: o.computed("login.summonerId", function () {
              if (
                this.get("login.summonerId") &&
                this.get("login.summonerId") > 0
              )
                return this.get("login.summonerId");
            }),
          });
      },
      (e, t, n) => {
        "use strict";
        var i = n(1);
        n(5), n(6);
        let s = "#0b849e",
          o = "#be1e37";
        e.exports = i.Ember.Component.extend({
          classNameBindings: [
            "rightSideActing",
            "leftSideActing",
            "showBothTimers",
          ],
          classNames: ["champ-select-spectate-component"],
          layout: n(7),
          leftColor: s,
          rightColor: o,
          showColorSwitcher: !1,
          padBans: function (e) {
            const t = Math.floor(this.get("session.bans.numBans") / 2);
            if (t > e.length) {
              const n = Array.apply(null, Array(t - e.length));
              return i.Ember.A(e.concat(n));
            }
            return i.Ember.A(e);
          },
          initColorSwitcher: i.Ember.on("didInsertElement", function () {
            document.addEventListener("keypress", (e) => {
              "input" !== e.target.tagName.toLowerCase() &&
                ((99 !== e.keyCode && 67 !== e.keyCode) ||
                  this.toggleProperty("showColorSwitcher"));
            });
          }),
          myTeamBans: i.Ember.computed(
            "sessionActions.myTeamBanActions.@each.completed",
            "inventory.[]",
            function () {
              return this.padBans(this.get("sessionActions.myTeamBanActions"));
            },
          ),
          theirTeamBans: i.Ember.computed(
            "sessionActions.theirTeamBanActions.@each.completed",
            "inventory.[]",
            function () {
              return this.padBans(
                this.get("sessionActions.theirTeamBanActions"),
              );
            },
          ),
          leftSideTimer: i.Ember.computed(
            "session.timer.inBanPickPhase",
            "session.timer.timeRemainingFormatted",
            "session.timer.timerAvailable",
            "sessionActions.activeActions.@each.actor.isOnLeftSide",
            function () {
              return this.get("session.timer.timerAvailable")
                ? this.get("session.timer.inBanPickPhase")
                  ? this.get("sessionActions.activeActions").findBy(
                      "actor.isOnLeftSide",
                      !0,
                    )
                    ? this.get("session.timer.timeRemainingFormatted")
                    : null
                  : this.get("session.timer.timeRemainingFormatted")
                : null;
            },
          ),
          rightSideTimer: i.Ember.computed(
            "session.timer.inBanPickPhase",
            "session.timer.timeRemainingFormatted",
            "session.timer.timeAvailable",
            "sessionActions.activeActions.@each.actor.isOnLeftSide",
            function () {
              return this.get("session.timer.timerAvailable")
                ? this.get("session.timer.inBanPickPhase")
                  ? this.get("sessionActions.activeActions").findBy(
                      "actor.isOnLeftSide",
                      !1,
                    )
                    ? this.get("session.timer.timeRemainingFormatted")
                    : null
                  : this.get("session.timer.timeRemainingFormatted")
                : null;
            },
          ),
          rightSideActing: i.Ember.computed(
            "leftSideTimer",
            "rightSideTimer",
            function () {
              return (
                null === this.get("leftSideTimer") &&
                null !== this.get("rightSideTimer")
              );
            },
          ),
          leftSideActing: i.Ember.computed(
            "leftSideTimer",
            "rightSideTimer",
            function () {
              return (
                null !== this.get("leftSideTimer") &&
                null === this.get("rightSideTimer")
              );
            },
          ),
          showBothTimers: i.Ember.computed(
            "leftSideTimer",
            "rightSideTimer",
            function () {
              return this.get("leftSideTimer") === this.get("rightSideTimer");
            },
          ),
          setSideColors: i.Ember.on("didInsertElement", function () {
            this.element.style.setProperty("--left-side-color", s),
              this.element.style.setProperty("--right-side-color", o);
          }),
          actions: {
            updateColors: function () {
              i.Ember.run.next(() => {
                (s = this.get("leftColor")),
                  (o = this.get("rightColor")),
                  this.setSideColors();
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
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "dpqQ2KVI",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_12\\\\LeagueClientContent_Release\\\\15688\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-esports-spectate\\\\src\\\\app\\\\spectate-root-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_12\\\\LeagueClientContent_Release\\\\15688\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-esports-spectate\\\\src\\\\app\\\\spectate-root-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_12\\\\LeagueClientContent_Release\\\\15688\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-esports-spectate\\\\src\\\\app\\\\spectate-root-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","champion-select-header"],["flush-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["timer-left ",["helper",["if"],[["get",["leftSideTimer"]],"visible"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","timer-bg"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","timer-inner"],["flush-element"],["append",["unknown",["session","timer","timeRemainingFormatted"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","header-keystone"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","left-bg-section"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","right-bg-section"],["flush-element"],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","header-keystone-inner"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","left-bg-section"],["flush-element"],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","right-bg-section"],["flush-element"],["close-element"],["text","\\n\\n      "],["open-element","div",[]],["static-attr","class","header-keystone-inner-bg"],["flush-element"],["close-element"],["text","\\n\\n      "],["open-element","div",[]],["static-attr","class","phase"],["flush-element"],["text","\\n        "],["append",["unknown",["session","timer","displayedPhase"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["dynamic-attr","class",["concat",["timer-right ",["helper",["if"],[["get",["rightSideTimer"]],"visible"],null]]]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","timer-bg"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","timer-inner"],["flush-element"],["append",["unknown",["session","timer","timeRemainingFormatted"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["showColorSwitcher"]]],null,4],["text","\\n"],["open-element","div",[]],["static-attr","class","champion-select-summoner-array-container"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","summoner-array your-party"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","party"],["flush-element"],["text","\\n"],["block",["each"],[["get",["session","myTeam"]]],null,3],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","summoner-array enemy-party"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","party"],["flush-element"],["text","\\n"],["block",["each"],[["get",["session","theirTeam"]]],null,2],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","bans"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","my-bans"],["flush-element"],["text","\\n"],["block",["each"],[["get",["myTeamBans"]]],null,1],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","their-bans"],["flush-element"],["text","\\n"],["block",["each"],[["get",["theirTeamBans"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["ban-wrapper ",["helper",["if"],[["get",["ban","completed"]],"completed"],null]," ",["helper",["if"],[["get",["ban","isActive"]],"active"],null]]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ban-background"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["ban-container ",["helper",["unless"],[["get",["ban","delayedChampion"]],"no-champion"],null]]]],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","ban"],["dynamic-attr","data-id",["concat",[["unknown",["ban","champion","id"]]]]],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["ban","champion","skins","firstObject","splashPath"]],")"]]],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ban-icon"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["ban"]},{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","class",["concat",["ban-wrapper ",["helper",["if"],[["get",["ban","completed"]],"completed"],null]," ",["helper",["if"],[["get",["ban","isActive"]],"active"],null]]]],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ban-background"],["flush-element"],["text","\\n        "],["open-element","div",[]],["dynamic-attr","class",["concat",["ban-container ",["helper",["unless"],[["get",["ban","delayedChampion"]],"no-champion"],null]]]],["flush-element"],["text","\\n          "],["open-element","div",[]],["static-attr","class","ban"],["dynamic-attr","data-id",["concat",[["unknown",["ban","champion","id"]]]]],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["ban","champion","skins","firstObject","splashPath"]],")"]]],["flush-element"],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","ban-icon"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["ban"]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","summoner-wrapper"],["dynamic-attr","data-cell-id",["concat",[["unknown",["summoner","cellId"]]]]],["flush-element"],["text","\\n          "],["append",["helper",["summoner-object"],null,[["summoner","isLeft"],[["get",["summoner"]],false]]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["summoner"]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","summoner-wrapper"],["dynamic-attr","data-summoner-name",["concat",[["unknown",["summoner","displayName"]]]]],["dynamic-attr","data-cell-id",["concat",[["unknown",["summoner","cellId"]]]]],["flush-element"],["text","\\n          "],["append",["helper",["summoner-object"],null,[["summoner"],[["get",["summoner"]]]]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["summoner"]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","champion-select-color-switcher"],["flush-element"],["text","\\n  Color switcher"],["open-element","br",[]],["flush-element"],["close-element"],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n\\n  Left side: "],["append",["helper",["input"],null,[["type","value","key-up"],["text",["get",["leftColor"]],"updateColors"]]],false],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n  Right side: "],["append",["helper",["input"],null,[["type","value","key-up"],["text",["get",["rightColor"]],"updateColors"]]],false],["open-element","br",[]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        var i = n(1);
        n(9),
          (e.exports = i.Ember.Component.extend({
            classNames: ["summoner-object-component"],
            classNameBindings: [
              "summoner.champion:has-champion:no-champion",
              "summoner.isPickingNow:is-picking-now",
              "summoner.pickAction.completed:champion-locked:champion-not-locked",
            ],
            backgroundTransition: i.Ember.observer(
              "summoner.champion.skins.firstObject.splashPath",
              function () {
                this.set("oldBackground", this.get("oldSplashPath")),
                  this.set(
                    "oldSplashPath",
                    this.get("summoner.champion.skins.firstObject.splashPath"),
                  );
              },
            ),
            layout: n(10),
          }));
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        const i = n(1).Ember;
        e.exports = i.HTMLBars.template({
          id: "LuiBmfso",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_12\\\\LeagueClientContent_Release\\\\15688\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-esports-spectate\\\\src\\\\app\\\\summoner-object-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_12\\\\LeagueClientContent_Release\\\\15688\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-esports-spectate\\\\src\\\\app\\\\summoner-object-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_12\\\\LeagueClientContent_Release\\\\15688\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-esports-spectate\\\\src\\\\app\\\\summoner-object-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","summoner-object-wrapper"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","base-color-background"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","gradient-background-overlay"],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["oldBackground"]]],null,2],["text","  "],["open-element","div",[]],["static-attr","class","background-wrapper"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","background"],["dynamic-attr","data-id",["concat",[["unknown",["summoner","champion","id"]]]]],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["summoner","champion","skins","firstObject","splashPath"]],")"]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","edge-border"],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","action-text"],["flush-element"],["append",["unknown",["tra","picking"]],false],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","spells"],["flush-element"],["text","\\n"],["block",["if"],[["get",["summoner","spell1"]]],null,1],["block",["if"],[["get",["summoner","spell2"]]],null,0],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","summoner-name"],["flush-element"],["text","\\n    "],["append",["helper",["player-name"],null,[["format","summonerId","gameName","tagLine"],["short",["get",["summoner","summonerId"]],["get",["summoner","gameName"]],["get",["summoner","tagLine"]]]]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","spell spell2"],["dynamic-attr","src",["unknown",["summoner","spell2","iconPath"]],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","img",[]],["static-attr","class","spell spell1"],["dynamic-attr","src",["unknown",["summoner","spell1","iconPath"]],null],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","old-background"],["dynamic-attr","data-id",["concat",[["unknown",["summoner","champion","id"]]]]],["dynamic-attr","style",["concat",["background-image: url(",["unknown",["oldBackground"]],")"]]],["flush-element"],["close-element"],["text","\\n    }\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        const i = n(1),
          { Ember: s } = i,
          o = i.Lodash,
          c = s.Object.extend({
            selectedByMe: s.computed.alias("selectedBy.isSelf"),
            selected: s.computed.bool("selectedBy"),
            selectedBy: s.computed(
              "root.summoners.@each.champion.id",
              "root.summoners.@each.isSelf",
              "id",
              function () {
                let e = this.get("root.summoners");
                if (e && e.length) {
                  e = e.filterBy("champion.id", this.get("id"));
                  for (let t = 0; t < e.length; t++) {
                    const n = e[t];
                    if (n.get("isSelf")) return n;
                  }
                  return e[0];
                }
              },
            ),
            disabledByPlatform: s.computed(
              "active",
              "root.queue.gameMode",
              "disabledQueues.[]",
              function () {
                return (
                  !this.get("active") ||
                  (this.get("disabledQueues") || []).indexOf(
                    this.get("root.queue.gameMode"),
                  ) >= 0
                );
              },
            ),
            banned: s.computed(
              "id",
              "root.sessionActions.completedBanActions.@each.championId",
              function () {
                const e = this.get("root.sessionActions.completedBanActions"),
                  t = o.map(e, function (e) {
                    return e.get("championId");
                  });
                return o.includes(t, this.get("id"));
              },
            ),
            picked: s.computed(
              "selected",
              "selectedBy.pickAction.completed",
              function () {
                return (
                  this.get("selected") &&
                  this.get("selectedBy.pickAction.completed")
                );
              },
            ),
            unselectable: s.computed(
              "picked",
              "selectedByMe",
              "disabledByPlatform",
              "banned",
              function () {
                return (
                  (this.get("picked") && !this.get("selectedByMe")) ||
                  this.get("disabledByPlatform") ||
                  this.get("banned")
                );
              },
            ),
            canPlay: s.computed(
              "root.pickableChampions.championIds.[]",
              function () {
                return (
                  !!this.get("root.pickableChampions.championIds") &&
                  this.get("root.pickableChampions.championIds").indexOf(
                    this.get("id"),
                  ) >= 0
                );
              },
            ),
            lowerCaseName: s.computed("name", function () {
              const e = this.get("name");
              if (e) return e.toLowerCase();
            }),
            baseSkin: s.computed("skins.@each.isBaseSkin", function () {
              return o.find(this.get("skins"), function (e) {
                return s.get(e, "isBaseSkin");
              });
            }),
            searchMatchingTerms: s.computed.collect("lowerCaseName"),
          });
        e.exports = c;
      },
      (e, t, n) => {
        "use strict";
        const i = n(1),
          { Ember: s } = i,
          o = s.Object.extend({
            championSelectRoot: s.computed.or("root.root", "root"),
            skinName: s.computed.alias("name"),
            isSelected: s.computed(
              "championSelectRoot.currentSummoner.selectedSkinId",
              "id",
              "chroma.isSelected",
              function () {
                return (
                  this.get(
                    "championSelectRoot.currentSummoner.selectedSkinId",
                  ) === this.get("id") || this.get("chroma.isSelected")
                );
              },
            ),
            isViewed: s.computed(
              "championSelectRoot.view.viewSkinId",
              function () {
                return (
                  this.get("championSelectRoot.view.viewSkinId") ===
                  this.get("id")
                );
              },
            ),
            isChroma: s.computed("chromas.[]", function () {
              return (this.get("chromas") || []).length > 0;
            }),
            chroma: s.computed(
              "championSelectRoot.currentSummoner.selectedSkinId",
              "chromas.@each.id",
              function () {
                return s
                  .A(this.get("chromas") || [])
                  .findBy(
                    "id",
                    this.get(
                      "championSelectRoot.currentSummoner.selectedSkinId",
                    ),
                  );
              },
            ),
            chromaIds: s.computed(
              "chromas.@each.id",
              "chromas.[]",
              function () {
                return s.A(this.get("chromas") || []).mapBy("id");
              },
            ),
            ownsChroma: s.computed(
              "chromas.@each.id",
              "chromas.[]",
              "chromas.@each.ownership.owned",
              function () {
                const e = s.A(this.get("chromas") || []);
                return e.mapBy("ownership.owned").reduce(function (e, t) {
                  return t && e;
                }, e.length > 0);
              },
            ),
            unlocked: s.computed(
              "ownership.owned",
              "ownership.rental.rented",
              "ownership.loyaltyReward",
              "championSelectRoot.teamBoost.boostedSkinIds",
              function () {
                const e =
                  -1 !==
                  (
                    this.get("championSelectRoot.teamBoost.boostedSkinIds") ||
                    []
                  ).indexOf(this.get("id"));
                return (
                  this.get("ownership.owned") ||
                  this.get("ownership.rental.rented") ||
                  this.get("ownership.loyaltyReward") ||
                  e
                );
              },
            ),
            canUse: s.computed("disabled", "unlocked", function () {
              return !this.get("disabled") && this.get("unlocked");
            }),
            isBaseSkin: s.computed("id", function () {
              return this.get("id") % 1e3 == 0;
            }),
          });
        e.exports = o;
      },
      (e, t, n) => {
        "use strict";
        const i = n(1),
          { Ember: s } = i,
          o = s.Object.extend({
            available: s.computed(
              "gameModes.[]",
              "root.queue.gameMode",
              function () {
                const e = this.get("root.queue.gameMode");
                return this.get("gameModes").indexOf(e) > -1;
              },
            ),
            locked: s.computed.bool("lockedReason"),
            lockedReason: s.computed("canUse", "disabled", function () {
              return this.get("canUse")
                ? this.get("disabled")
                  ? "DISABLED"
                  : void 0
                : "LEVEL";
            }),
            canUse: s.computed(
              "summonerLevel",
              "root.localSummoner.summonerLevel",
              function () {
                return (
                  this.get("summonerLevel") <=
                  this.get("root.localSummoner.summonerLevel")
                );
              },
            ),
            disabled: s.computed("id", "root.disabledSpellIds", function () {
              return (
                -1 !==
                (this.get("root.disabledSpellIds") || []).indexOf(
                  this.get("id"),
                )
              );
            }),
          });
        e.exports = o;
      },
      (e, t, n) => {
        "use strict";
        const i = n(1),
          { Ember: s, DataBinding: o, socket: c } = i,
          a = s.Object.extend({
            summonerIdObserver: s.observer("summonerId", function () {
              if (
                (this._summonerDataBinding ||
                  (this._summonerDataBinding = o("/lol-summoner/v1", c)),
                this.get("summonerId"))
              ) {
                const e = "/summoners/" + this.get("summonerId");
                this._summonerDataBinding.get(e).then((e) => {
                  if (e) {
                    const { gameName: t, tagLine: n } = e;
                    this.set("displayName", t),
                      this.set("gameName", t),
                      this.set("tagLine", n);
                  }
                });
              }
            }),
            name: s.computed("displayName", "summonerIndex", function () {
              if (this.get("displayName")) return this.get("displayName");
              let e;
              return (
                (e =
                  void 0 === this.get("summonerIndex")
                    ? 1
                    : this.get("summonerIndex") + 1),
                this.get("root.traService").formatString(
                  "obfuscated_summoner_name",
                  { summonerNumber: e },
                )
              );
            }),
            champion: s.computed(
              "root.inventory.@each.id",
              "championId",
              "pickAction.championId",
              function () {
                const e =
                  this.get("championId") || this.get("pickAction.championId");
                return (this.get("root.inventory") || s.A()).findBy("id", e);
              },
            ),
            isSelf: s.computed(
              "root.session.localPlayerCellId",
              "cellId",
              function () {
                return (
                  this.get("root.session.localPlayerCellId") ===
                  this.get("cellId")
                );
              },
            ),
            isObfuscated: s.computed("championId", function () {
              return 0 === this.get("championId");
            }),
            isOnPlayersTeam: s.computed(
              "team",
              "root.currentSummoner.team",
              function () {
                return (
                  this.get("team") === this.get("root.currentSummoner.team")
                );
              },
            ),
            isOnLeftSide: s.computed(
              "root.isSpectating",
              "isOnPlayersTeam",
              "isOnBlueSide",
              function () {
                return this.get("root.isSpectating")
                  ? this.get("isOnBlueSide")
                  : this.get("isOnPlayersTeam");
              },
            ),
            isOnBlueSide: s.computed("team", function () {
              return 1 === this.get("team");
            }),
            isOnRedSide: s.computed("team", function () {
              return 2 === this.get("team");
            }),
            uncompletedAction: s.computed(
              "actions.@each.completed",
              function () {
                return this.get("actions").findBy("completed", !1);
              },
            ),
            activeAction: s.computed("actions.@each.isActive", function () {
              return this.get("actions").findBy("isActive", !0);
            }),
            nextAction: s.computed(
              "root.sessionActions.nextActions.@each.id",
              "actions.@each.isNext",
              function () {
                return this.get("actions").findBy("isNext", !0);
              },
            ),
            isExclusivelyPickIntenting: s.computed.readOnly(
              "root.session.timer.inPlanningPhase",
            ),
            isPickIntenting: s.computed(
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
            isBanningNow: s.computed.bool("activeAction.isBan"),
            isBanningNext: s.computed.bool("nextAction.isBan"),
            isPickingNow: s.computed.bool("activeAction.isPick"),
            isPickingNext: s.computed.bool("nextAction.isPick"),
            isActingNow: s.computed.bool("activeAction"),
            isActingNext: s.computed.bool("nextAction"),
            actions: s.computed(
              "root.sessionActions.allActions.@each.actorCellId",
              "cellId",
              function () {
                const e = this.get("root.sessionActions.allActions") || s.A();
                return s.A(e.filterBy("actorCellId", this.get("cellId")));
              },
            ),
            hasUncompletedAction: s.computed("uncompletedAction", function () {
              return !!this.get("uncompletedAction");
            }),
            pickAction: s.computed("actions.@each.type", function () {
              return this.get("actions").findBy("type", "pick");
            }),
            banActions: s.computed("actions.@each.type", function () {
              return s.A(this.get("actions").filterBy("type", "ban"));
            }),
            hasUncompletedBanAction: s.computed(
              "actions.@each.type",
              "actions.@each.completed",
              function () {
                return !!this.get("actions").find(function (e) {
                  return "ban" === e.get("type") && !e.get("completed");
                });
              },
            ),
            allyIndex: s.computed("root.session.myTeam.[]", function () {
              const e = this.get("root.session.myTeam").indexOf(this);
              if (e > -1) return e;
            }),
            enemyIndex: s.computed("root.session.theirTeam.[]", function () {
              const e = this.get("root.session.theirTeam").indexOf(this);
              if (e > -1) return e;
            }),
            summonerIndex: s.computed("enemyIndex", "allyIndex", function () {
              return void 0 !== this.get("enemyIndex")
                ? this.get("enemyIndex")
                : void 0 !== this.get("allyIndex")
                  ? this.get("allyIndex")
                  : void 0;
            }),
            spell1: s.computed("root.spells.@each.id", "spell1Id", function () {
              return (this.get("root.spells") || s.A()).findBy(
                "id",
                this.get("spell1Id"),
              );
            }),
            spell2: s.computed("root.spells.@each.id", "spell2Id", function () {
              return (this.get("root.spells") || s.A()).findBy(
                "id",
                this.get("spell2Id"),
              );
            }),
            selectedWardSkin: s.computed(
              "root.wardSkins.@each.id",
              "wardSkinId",
              function () {
                return (this.get("root.wardSkins") || s.A()).findBy(
                  "id",
                  this.get("wardSkinId"),
                );
              },
            ),
            trade: s.computed(
              "cellId",
              "root.session.trades.@each.cellId",
              function () {
                return (this.get("root.session.trades") || s.A()).findBy(
                  "cellId",
                  this.get("cellId"),
                );
              },
            ),
          });
        e.exports = a;
      },
      (e, t, n) => {
        "use strict";
        const i = n(1),
          { Ember: s } = i,
          o = s.Object.extend({
            timeRemaining: s.computed("timeRemainingInMs", function () {
              return Math.round(this.get("timeRemainingInMs") / 1e3);
            }),
            timeRemainingInMs: s.computed(
              "internalNowInEpochMs",
              "adjustedTimeLeftInPhase",
              function () {
                if ((this.updateTimer(), this.get("internalNowInEpochMs"))) {
                  const e =
                    new Date().getTime() -
                    parseFloat(this.get("internalNowInEpochMs"));
                  return this.get("adjustedTimeLeftInPhase") - e;
                }
                return this.get("adjustedTimeLeftInPhase");
              },
            ),
            timerAvailable: !0,
            updateTimer: function () {
              this.isDestroyed ||
                this.isDestroying ||
                this.timerRunning ||
                ((this.timerRunning = !0),
                this.get("timeRemainingInMs") > 0
                  ? (this.notifyPropertyChange("timeRemainingInMs"),
                    s.run.later(
                      this,
                      function () {
                        (this.timerRunning = !1), this.updateTimer();
                      },
                      100,
                    ))
                  : (this.timerRunning = !1));
            },
            timeRemainingFormatted: s.computed("timeRemaining", function () {
              return !this.get("timeRemaining") ||
                this.get("timeRemaining") <= 0
                ? ":00"
                : this.get("timeRemaining") >= 10
                  ? ":" + this.get("timeRemaining")
                  : ":0" + this.get("timeRemaining");
            }),
            displayedPhase: s.computed(
              "inBanPickPhase",
              "root.sessionActions.activeAction.type",
              "root.sessionActions.banActions.length",
              "root.sessionActions.numBanActionsCompleted",
              "root.sessionActions.numPickActionsCompleted",
              function () {
                const e = this.get("root.sessionActions.activeAction.type");
                return "ban" === e
                  ? this.get("root.sessionActions.numPickActionsCompleted") > 0
                    ? this.get("root.traService").formatString("ban_phase_2")
                    : this.get("root.traService").formatString("ban_phase_1")
                  : "pick" === e
                    ? this.get("root.sessionActions.numBanActionsCompleted") ===
                        this.get("root.session.bans.numBans") &&
                      this.get("root.sessionActions.numPickPhases") > 1
                      ? this.get("root.traService").formatString("pick_phase_2")
                      : this.get("root.traService").formatString("pick_phase_1")
                    : void 0;
              },
            ),
            inPlanningPhase: s.computed.equal("phase", "PLANNING"),
            notInPlanningPhase: s.computed.not("inPlanningPhase"),
            inBanPickPhase: s.computed.equal("phase", "BAN_PICK"),
            notInBanPickPhase: s.computed.not("inBanPickPhase"),
            inFinalizationPhase: s.computed.equal("phase", "FINALIZATION"),
            notInFinalizationPhase: s.computed.not("inFinalizationPhase"),
            inGameStartingPhase: s.computed.equal("phase", "GAME_STARTING"),
            notInGameStartingPhase: s.computed.not("inGameStartingPhase"),
          });
        e.exports = o;
      },
      (e, t, n) => {
        "use strict";
        const i = n(1),
          { Ember: s } = i,
          o = s.Object.extend({
            champion: s.computed(
              "root.inventory.@each.id",
              "championId",
              function () {
                return (this.get("root.inventory") || s.A()).findBy(
                  "id",
                  this.get("championId"),
                );
              },
            ),
            delayedChampionSetter: s.observer(
              "completed",
              "champion",
              s.on("init", function () {
                if (!this.get("completed") || !this.get("champion"))
                  return void this.set("delayedChampion", null);
                const e = this.get("champion");
                s.run.later(
                  function () {
                    this.isDestroyed ||
                      this.isDestroying ||
                      this.set("delayedChampion", e);
                  }.bind(this),
                  1,
                );
              }),
            ),
            actor: s.computed(
              "actorCellId",
              "root.summoners.@each.cellId",
              function () {
                return (this.get("root.summoners") || s.A()).findBy(
                  "cellId",
                  this.get("actorCellId"),
                );
              },
            ),
            isBan: s.computed("type", function () {
              return "ban" === this.get("type");
            }),
            isPick: s.computed("type", function () {
              return "pick" === this.get("type");
            }),
            isActive: s.computed(
              "root.sessionActions.activeActions.@each.id",
              "id",
              function () {
                return !!this.get("root.sessionActions.activeActions").findBy(
                  "id",
                  this.get("id"),
                );
              },
            ),
            isCurrent: s.computed(
              "root.sessionActions.currentActions.@each.id",
              "id",
              function () {
                return !!this.get("root.sessionActions.currentActions").findBy(
                  "id",
                  this.get("id"),
                );
              },
            ),
            isNext: s.computed(
              "root.sessionActions.nextActions.@each.id",
              "id",
              function () {
                return !!this.get("root.sessionActions.nextActions").findBy(
                  "id",
                  this.get("id"),
                );
              },
            ),
          });
        e.exports = o;
      },
      (e, t, n) => {
        "use strict";
        const i = n(1),
          { Ember: s } = i,
          o = i.Lodash,
          c = s.Object.extend({
            allActions: s.computed("root.session.actions.[]", function () {
              const e = [],
                t = this.get("root.session.actions");
              return (
                t &&
                  t.forEach(function (t) {
                    t.forEach(function (t) {
                      e.push(t);
                    });
                  }, this),
                s.A(e)
              );
            }),
            currentActions: s.computed(
              "allActions.@each.completed",
              "root.session.actions.[]",
              function () {
                const e = this.get("root.session.actions");
                if (e)
                  for (let t = 0; t < e.length; t++) {
                    const n = e[t];
                    if (n && n.length && !o.every(n.mapBy("completed")))
                      return n;
                  }
                return s.A();
              },
            ),
            nextActions: s.computed(
              "root.session.actions.[]",
              "currentActions",
              function () {
                if (!this.get("root.session.actions")) return s.A();
                const e = this.get("root.session.actions").indexOf(
                  this.get("currentActions"),
                );
                return -1 === e
                  ? s.A()
                  : this.get("root.session.actions")[e + 1] || s.A();
              },
            ),
            nextAction: s.computed(
              "nextActions.[]",
              "nextActions.@each.actor.isSelf",
              function () {
                const e = this.get("nextActions");
                return e
                  ? e.findBy("actor.isSelf", !0) || e.get("firstObject")
                  : null;
              },
            ),
            activeActions: s.computed(
              "root.session.timer.inBanPickPhase",
              "currentActions.@each.completed",
              function () {
                return this.get("root.session.timer.inBanPickPhase")
                  ? s.A(this.get("currentActions").filterBy("completed", !1))
                  : s.A();
              },
            ),
            activeAction: s.computed(
              "activeActions.[]",
              "activeActions.@each.actor.isSelf",
              function () {
                const e = this.get("activeActions");
                return e
                  ? e.findBy("actor.isSelf", !0) || e.get("firstObject")
                  : null;
              },
            ),
            banActions: s.computed(
              "allActions.id",
              "allActions.type",
              function () {
                return s.A(this.get("allActions").filterBy("type", "ban"));
              },
            ),
            completedBanActions: s.computed.filterBy(
              "banActions.@each.completed",
              "completed",
              !0,
            ),
            pickActions: s.computed(
              "allActions.id",
              "allActions.type",
              function () {
                return s.A(this.get("allActions").filterBy("type", "pick"));
              },
            ),
            numPickPhases: s.computed("allActions.@each.type", function () {
              let e = 0,
                t = null;
              return (
                this.get("allActions").forEach((n) => {
                  "pick" === n.get("type") && "pick" !== t && (e += 1),
                    (t = n.get("type"));
                }),
                e
              );
            }),
            myTeamBanActions: s.computed(
              "banActions.id",
              "banActions.actor.isOnLeftSide",
              function () {
                return s.A(
                  this.get("banActions").filterBy("actor.isOnLeftSide", !0),
                );
              },
            ),
            theirTeamBanActions: s.computed(
              "banActions.id",
              "banActions.actor.isOnLeftSide",
              function () {
                return s.A(
                  this.get("banActions").filterBy("actor.isOnLeftSide", !1),
                );
              },
            ),
            hasBans: s.computed("allActions.@each.type", function () {
              return !!this.get("allActions").find(function (e) {
                return "ban" === e.get("type");
              });
            }),
            someoneIsBanning: s.computed(
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
            currentBan: s.computed(
              "currentActions.@each.type",
              "someoneIsBanning",
              function () {
                return this.get("someoneIsBanning")
                  ? this.get("currentActions").findBy("type", "ban")
                  : null;
              },
            ),
            numBanActionsCompleted: s.computed(
              "banActions.@each.completed",
              function () {
                return this.get("banActions").filterBy("completed", !0).length;
              },
            ),
            numPickActionsCompleted: s.computed(
              "pickActions.@each.completed",
              function () {
                return this.get("pickActions").filterBy("completed", !0).length;
              },
            ),
          });
        e.exports = c;
      },
    ],
    t = {};
  function n(i) {
    var s = t[i];
    if (void 0 !== s) return s.exports;
    var o = (t[i] = { exports: {} });
    return e[i](o, o.exports, n), o.exports;
  }
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
      const i = "rcp-fe-lol-esports-spectate",
        s = document.currentScript.ownerDocument;
      const o = window.getPluginAnnounceEventName(i);
      s.addEventListener(
        o,
        function (e) {
          (0, e.registrationHandler)(function (e) {
            return t.default
              .init(e, {
                AudioPlugin: (e) => e.get("rcp-fe-audio"),
                Bluebird: (e) => e.get("rcp-fe-common-libs").getBluebird(3),
                ChampSelectPlugin: (e) => e.get("rcp-fe-lol-champ-select"),
                ComponentFactory: (e) =>
                  e.get("rcp-fe-common-libs").getComponentFactory(1),
                DataBinding: (e) =>
                  e
                    .get("rcp-fe-common-libs")
                    .getDataBinding("rcp-fe-lol-esports-spectate"),
                Ember: (e) => e.get("rcp-fe-ember-libs").getEmber(),
                EmberApplicationFactory: (e) =>
                  e.get("rcp-fe-ember-libs").getEmberApplicationFactory(),
                EmberDataBinding: (e) =>
                  e
                    .get("rcp-fe-ember-libs")
                    .getEmberDataBinding("rcp-fe-lol-esports-spectate"),
                EmberL10n: (e) => e.get("rcp-fe-ember-libs").getEmberL10n(1),
                l10n: (e) => e.get("rcp-fe-lol-l10n"),
                Lodash: (e) => e.get("rcp-fe-common-libs").getLodash(4),
                logger: (e) => e.get("rcp-fe-common-libs").logging.create(i),
                SharedComponents: (e) => e.get("rcp-fe-lol-shared-components"),
                socket: (e) => e.getSocket(),
                UiKitPlugin: (e) => e.get("rcp-fe-lol-uikit"),
                ViewportPlugin: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Viewport(),
              })
              .then(() => n(2).default);
          });
        },
        { once: !0 },
      );
    })();
})();
