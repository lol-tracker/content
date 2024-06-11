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
        const l = {
          init: function (e, n) {
            return (t = e), this.add(n);
          },
          _getValue: function (e, n) {
            let l;
            return (
              "function" == typeof n
                ? ((l = n(t)),
                  l ||
                    console.warn(
                      "The function for key " + e + " returned a falsy value: ",
                      l,
                    ))
                : "string" == typeof n
                  ? ((l = t.get(n)),
                    l ||
                      console.warn(
                        "The provider `get` invocation for the key " +
                          e +
                          " returned a falsy value: ",
                        l,
                      ))
                  : "object" == typeof n && (l = n),
              l
            );
          },
          add: function (e) {
            e = e || {};
            const t = [],
              n = this;
            return (
              Object.keys(e).forEach(function (l) {
                const a = e[l],
                  s = n._getValue(l, a);
                s && s.then
                  ? (s.then(function (e) {
                      e ||
                        console.warn(
                          "The promise for the key " +
                            l +
                            " resolved with a falsy value: ",
                          e,
                        ),
                        n._addValue(l, e);
                    }),
                    t.push(s))
                  : n._addValue(l, s);
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
        e.exports = l;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = new (class {
          constructor() {
            this.subDoc = document;
          }
          set(e) {
            this.subDoc = e;
          }
          get() {
            return this.subDoc;
          }
        })();
        t.default = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = {
          init(e) {
            const t = e.getChannel("sfx-ui");
            (this.unblockSuccess = t.createSound(
              "/fe/lol-static-assets/sounds/sfx-settings-block-list-unblock-success.ogg",
            )),
              (this.repairClick = t.createSound(
                "/fe/lol-static-assets/sounds/sfx-full-repair-button-click.ogg",
                { allowConcurrency: !1 },
              ));
          },
        };
        t.default = n;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = function () {
            const e = a.emberApplicationFactory
              .factoryDefinitionBuilder()
              .setName("rcp-fe-lol-settings")
              .setRoot(document.createElement("div"))
              .setComponentFactory(a.ComponentFactory)
              .setRouter(s.default)
              .setEmber(a.Ember)
              .setL10n(a.emberL10n)
              .setTra(a.tra)
              .setFeatureFlag("EMBER_CLI_COMPAT", !0)
              .addRoute("Application", n(10).default)
              .addRoute("General", n(11).default)
              .addRoute("Notifications", n(12).default)
              .addRoute("Chat", n(13).default)
              .addRoute("Sound", n(14).default)
              .addRoute("Voice", n(15).default)
              .addRoute("BlockList", n(16).default)
              .addRoute("GameHotkeys", n(17).default)
              .addRoute("GameSound", n(18).default)
              .addRoute("GameInterface", n(20).default)
              .addRoute("GameGameplay", n(21).default)
              .addRoute("Replays", n(22).default)
              .addRoute("PrivacyNotice", n(23).default)
              .addRoute("TermsOfUse", n(24).default)
              .addRoute("ThirdpartyLicenses", n(25).default)
              .addRoute("Version", n(26).default)
              .addRoute("LegalStatements", n(27).default)
              .addController("Application", n(28).default)
              .addController("General", n(29).default)
              .addController("Notifications", n(49).default)
              .addController("Chat", n(50).default)
              .addController("Sound", n(51).default)
              .addController("Voice", n(52).default)
              .addController("BlockList", n(53).default)
              .addController("GameHotkeys", n(54).default)
              .addController("GameSound", n(55).default)
              .addController("GameInterface", n(57).default)
              .addController("GameGameplay", n(58).default)
              .addController("Replays", n(59).default)
              .addController("PrivacyNotice", n(60).default)
              .addController("TermsOfUse", n(61).default)
              .addController("ThirdpartyLicenses", n(62).default)
              .addController("Version", n(63).default)
              .addController("LegalStatements", n(64).default)
              .addComponent("ModalHeader", n(65).default)
              .addComponent("ModalFooter", n(66).default)
              .addComponent("NavigationBarGroup", n(67).default)
              .addComponent("NavigationBarGroupItem", n(68).default)
              .addComponent("BlockedPlayer", n(69).default)
              .addComponent("BlockListError", n(70).default)
              .addComponent("GameSoundContent", n(71).default)
              .addComponent("GameInterfaceContent", n(72).default)
              .addComponent("GameGameplayContent", n(73).default)
              .addComponent("GameHotkeysAdditionalSection", n(74).default)
              .addComponent("GameHotkeysAdditional", n(75).default)
              .addComponent("GameHotkeysPrimaryButton", n(78).default)
              .addComponent("GameHotkeysPrimary", n(79).default)
              .addComponent("GameHotkeysQuickcast", n(81).default)
              .addComponent("GameHotkeysContent", n(82).default)
              .addComponent("RepairGameButton", n(83).default)
              .addComponent("PublishingLocale", n(84).default)
              .addComponent("AccountVerification", n(85).default)
              .addComponent("SettingsSlider", n(86).default)
              .addComponent("PushToTalkKey", n(87).default)
              .addComponent("VngPublisherSettings", n(90).default)
              .addComponent("HoneyfruitSettingsErrors", n(92).default)
              .addComponent("PlayerName", i)
              .addService("Honeyfruit", n(94).default)
              .addService("ModalManager", n(95).default)
              .addService("Patch", n(96).default)
              .addService("Persistence", n(97).default)
              .addService("Voice", n(99).default)
              .addHelper(
                "FormatKeyBindings",
                a.Ember.Helper.helper(o.formatAdditionalKeyBindings),
              )
              .addHelper(
                "GetKeyBindingsModifier",
                a.Ember.Helper.helper(o.getPrimaryModifierDisplay),
              )
              .addHelper(
                "GetKeyBindingsMainKey",
                a.Ember.Helper.helper(o.getPrimaryMainKeyDisplay),
              )
              .addTemplate("application", n(100))
              .addTemplate("index", n(101))
              .addTemplate("general", n(102))
              .addTemplate("notifications", n(103))
              .addTemplate("chat", n(104))
              .addTemplate("sound", n(105))
              .addTemplate("voice", n(106))
              .addTemplate("block-list", n(107))
              .addTemplate("game-hotkeys", n(108))
              .addTemplate("game-sound", n(109))
              .addTemplate("game-interface", n(110))
              .addTemplate("game-gameplay", n(111))
              .addTemplate("replays", n(112))
              .addTemplate("privacy-notice", n(113))
              .addTemplate("terms-of-use", n(114))
              .addTemplate("thirdparty-licenses", n(115))
              .addTemplate("loading", n(116))
              .addTemplate("version", n(117))
              .addTemplate("legal-statements", n(118))
              .addTemplate("components/modal-header", n(119))
              .addTemplate("components/modal-footer", n(120))
              .addTemplate("components/navigation-bar-group", n(121))
              .addTemplate("components/navigation-bar-group-item", n(122))
              .addTemplate("components/blocked-player", n(123))
              .addTemplate("components/block-list-error", n(124))
              .addTemplate("components/repair-game-button", n(125))
              .addTemplate("components/publishing-locale", n(126))
              .addTemplate("components/account-verification", n(127))
              .addTemplate("components/settings-slider", n(128))
              .addTemplate("components/push-to-talk-key", n(129))
              .addTemplate("components/game-sound-content", n(130))
              .addTemplate("components/game-interface-content", n(131))
              .addTemplate("components/game-gameplay-content", n(132))
              .addTemplate("components/game-hotkeys-additional-section", n(133))
              .addTemplate("components/game-hotkeys-additional", n(134))
              .addTemplate("components/game-hotkeys-primary-button", n(135))
              .addTemplate("components/game-hotkeys-primary", n(136))
              .addTemplate("components/game-hotkeys-quickcast", n(137))
              .addTemplate("components/game-hotkeys-content", n(138))
              .addTemplate("components/vng-publisher-settings", n(139))
              .addTemplate("components/honeyfruit-settings-error", n(140));
            return r.registerOnAppBuilder(e), e;
          });
        var l,
          a = n(1),
          s = (l = n(6)) && l.__esModule ? l : { default: l },
          o = n(9);
        const { PlayerNameComponent: i, PlayerNameInputApi: r } =
          a.SharedComponents.getSharedEmberComponents();
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = n(7);
        const s = l.Ember.Router.extend({ location: "none" });
        s.map(function () {
          this.route(a.Category.GENERAL),
            this.route(a.Category.NOTIFICATIONS),
            this.route(a.Category.CHAT),
            this.route(a.Category.SOUND),
            this.route(a.Category.VOICE),
            this.route(a.Category.BLOCK_LIST),
            this.route(a.Category.GAME_HOTKEYS),
            this.route(a.Category.GAME_SOUND),
            this.route(a.Category.GAME_INTERFACE),
            this.route(a.Category.GAME_GAMEPLAY),
            this.route(a.Category.REPLAYS),
            this.route(a.Category.PRIVACY_NOTICE),
            this.route(a.Category.TERMS_OF_USE),
            this.route(a.Category.THIRDPARTY_LICENSES),
            this.route(a.Category.VERSION),
            this.route(a.Category.LEGAL_STATEMENTS);
        });
        var o = s;
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.Category = void 0),
          (t.default = function () {
            const e = (function () {
                const e = {
                  name: "client",
                  titleKey: "lol_settings_group_title_client",
                  capitalTitleKey: "lol_settings_group_title_client_capital",
                  categories: null,
                };
                e.categories = [
                  new s.default(
                    o.GENERAL,
                    "lol-general",
                    "lol_settings_nav_title_general",
                    !0,
                    !0,
                    e,
                  ),
                  new s.default(
                    o.NOTIFICATIONS,
                    "lol-notifications",
                    "lol_settings_nav_title_notifications",
                    e,
                  ),
                  new s.default(
                    o.CHAT,
                    "lol-chat",
                    "lol_settings_nav_title_chat_and_friends",
                    !0,
                    !0,
                    e,
                  ),
                  new s.default(
                    o.SOUND,
                    "lol-sound",
                    "lol_settings_nav_title_sound",
                    !1,
                    !0,
                    e,
                  ),
                  new s.default(
                    o.VOICE,
                    "lol-premade-voice",
                    "lol_settings_nav_title_voice",
                    !1,
                    !0,
                    e,
                  ),
                  new s.default(
                    o.BLOCK_LIST,
                    "lol-block-list",
                    "lol_settings_nav_title_block_list",
                    !0,
                    !1,
                    e,
                  ),
                ];
                const t = {
                  name: "ingame",
                  titleKey: "lol_settings_group_title_ingame",
                  capitalTitleKey: "lol_settings_group_title_ingame_capital",
                  categories: null,
                };
                t.categories = [
                  new s.default(
                    o.GAME_HOTKEYS,
                    "lol-in-game-hotkeys",
                    "lol_settings_nav_title_hotkeys",
                    !0,
                    !0,
                    t,
                  ),
                  new s.default(
                    o.GAME_SOUND,
                    "lol-in-game-sound",
                    "lol_settings_nav_title_in_game_sound",
                    !0,
                    !0,
                    t,
                  ),
                  new s.default(
                    o.GAME_INTERFACE,
                    "lol-in-game-interface",
                    "lol_settings_nav_title_interface",
                    !0,
                    !0,
                    t,
                  ),
                  new s.default(
                    o.GAME_GAMEPLAY,
                    "lol-in-game-gameplay",
                    "lol_settings_nav_title_game",
                    !0,
                    !0,
                    t,
                  ),
                  new s.default(
                    o.REPLAYS,
                    "lol-in-game-replays",
                    "lol_settings_nav_title_replays",
                    !0,
                    !0,
                    t,
                  ),
                ];
                const n = {
                  name: "about",
                  titleKey: "lol_settings_group_title_about",
                  capitalTitleKey: "lol_settings_group_title_about_capital",
                  categories: null,
                };
                n.categories = [
                  new s.default(
                    o.PRIVACY_NOTICE,
                    "lol-privacy-notice",
                    "lol_settings_nav_title_privacy_notice",
                    !1,
                    !1,
                    n,
                  ),
                  new s.default(
                    o.TERMS_OF_USE,
                    "lol-tou",
                    "lol_settings_nav_title_tou",
                    !1,
                    !1,
                    n,
                  ),
                  new s.default(
                    o.THIRDPARTY_LICENSES,
                    "lol-third-party-license",
                    "lol_settings_nav_title_third_party_license",
                    !1,
                    !1,
                    n,
                  ),
                  new s.default(
                    o.VERSION,
                    "lol-version",
                    "lol_settings_nav_title_version",
                    !0,
                    !0,
                    n,
                  ),
                  new s.default(
                    o.LEGAL_STATEMENTS,
                    "lol-legal-statements",
                    "lol_settings_nav_title_legal_statements",
                    !1,
                    !1,
                    n,
                  ),
                ];
                const l = [e, t, n],
                  a = new Map(
                    [...e.categories, ...t.categories, ...n.categories].map(
                      (e) => [e.routeName, e],
                    ),
                  );
                return { list: l, byRouteName: a };
              })(),
              t = (n) => {
                n &&
                  (i.unobserve(
                    "/lol-platform-config/v1/initial-configuration-complete",
                    t,
                  ),
                  (function (e) {
                    i.observe("/lol-settings/v2/config", (t) => {
                      t
                        ? (r(e, o.GAME_HOTKEYS, t.isHotkeysEnabled),
                          r(e, o.GAME_SOUND, t.isSoundEnabled),
                          r(e, o.GAME_INTERFACE, t.isInterfaceEnabled),
                          r(e, o.GAME_GAMEPLAY, t.isGameplayEnabled),
                          r(e, o.REPLAYS, t.isReplaysEnabled),
                          r(e, o.TERMS_OF_USE, t.isTermsEnabled),
                          r(e, o.PRIVACY_NOTICE, t.isPrivacyNoticeEnabled),
                          r(e, o.LEGAL_STATEMENTS, t.isLegalStatementsEnabled))
                        : a.logger.warning("Failed to receive settings config");
                    });
                  })(e));
              };
            return (
              i.observe(
                "/lol-platform-config/v1/initial-configuration-complete",
                t,
              ),
              e.list
            );
          });
        var l,
          a = n(1),
          s = (l = n(8)) && l.__esModule ? l : { default: l };
        const o = {
          GENERAL: "general",
          NOTIFICATIONS: "notifications",
          CHAT: "chat",
          SOUND: "sound",
          VOICE: "voice",
          BLOCK_LIST: "block-list",
          GAME_HOTKEYS: "game-hotkeys",
          GAME_SOUND: "game-sound",
          GAME_INTERFACE: "game-interface",
          GAME_GAMEPLAY: "game-gameplay",
          REPLAYS: "replays",
          PRIVACY_NOTICE: "privacy-notice",
          TERMS_OF_USE: "terms-of-use",
          LEGAL_STATEMENTS: "legal-statements",
          THIRDPARTY_LICENSES: "thirdparty-licenses",
          VERSION: "version",
        };
        t.Category = o;
        const i = a.dataBinding.bindTo(a.socket);
        function r(e, t, n) {
          e.byRouteName.has(t) && e.byRouteName.get(t).updateForceDisabled(!n);
        }
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        var a = class {
          constructor(e, t, n, a, s, o) {
            (this.routeName = e),
              (this.name = t),
              (this.titleKey = n),
              (this.requireLogin = a),
              (this.canReset = s),
              (this.group = o),
              (this.loginStatus = !1),
              (this.forceDisabled = !1),
              (this.computeds = l.Ember.Object.create({ disabled: !1 }));
          }
          updateLoginStatus(e) {
            (this.loginStatus = e),
              this.computeds.set("disabled", !this.isEnabled());
          }
          updateForceDisabled(e) {
            (this.forceDisabled = e),
              this.computeds.set("disabled", !this.isEnabled());
          }
          isEnabled() {
            return (
              (!this.requireLogin || this.loginStatus) && !this.forceDisabled
            );
          }
        };
        t.default = a;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.formatAdditionalKeyBindings = function (e) {
            if (void 0 === e || void 0 === e[0]) return "";
            if (void 0 === e[1]) return u(e[0]);
            return u(r(e[0])[e[1] - 1]);
          }),
          (t.fromKeyToSaved = function (e) {
            let t;
            t = i() ? s[e.code] : a[e.code];
            return void 0 !== t ? c(e) + t : void 0;
          }),
          (t.fromSavedToArray = r),
          (t.getModifiersPrefix = c),
          (t.getPrimaryMainKeyDisplay = function (e) {
            const [t] = e || [];
            if (t === n || void 0 === t) return "";
            const l = t.slice(t.lastIndexOf("[", t.length - 3));
            return o[l];
          }),
          (t.getPrimaryModifierDisplay = function (e) {
            if (void 0 === e || void 0 === e[0]) return "";
            const t = e[0];
            return m(t.slice(0, t.lastIndexOf("[", t.length - 3)), " ");
          }),
          (t.isWindows = i),
          (t.normalizeKeybindingString = function (e) {
            let t = e;
            t = t.toLowerCase();
            const n = (function (e) {
              const t = [];
              let n = e.indexOf("[");
              for (; -1 !== n; ) {
                let l = e.indexOf("]", n + 1);
                if (-1 === l) return "";
                l + 1 < e.length && "]" === e.charAt(l + 1) && (l += 1);
                const a = e.substr(n, l - n + 1);
                t.push(a), (n = e.indexOf("[", l + 1));
              }
              return t;
            })(t);
            n.length > 2 && n.sort(d);
            let l = "";
            for (let e = 0; e < n.length; e++) l += n[e];
            return l;
          });
        const n = "null";
        let l;
        const a = {
            Escape: "[Esc]",
            Digit1: "[1]",
            Digit2: "[2]",
            Digit3: "[3]",
            Digit4: "[4]",
            Digit5: "[5]",
            Digit6: "[6]",
            Digit7: "[7]",
            Digit8: "[8]",
            Digit9: "[9]",
            Digit0: "[0]",
            Minus: "[-]",
            Equal: "[=]",
            Backspace: "[Back]",
            Tab: "[Tab]",
            KeyQ: "[q]",
            KeyW: "[w]",
            KeyE: "[e]",
            KeyR: "[r]",
            KeyT: "[t]",
            KeyY: "[y]",
            KeyU: "[u]",
            KeyI: "[i]",
            KeyO: "[o]",
            KeyP: "[p]",
            BracketLeft: "[[]",
            BracketRight: "[]]",
            Enter: "[Return]",
            KeyA: "[a]",
            KeyS: "[s]",
            KeyD: "[d]",
            KeyF: "[f]",
            KeyG: "[g]",
            KeyH: "[h]",
            KeyJ: "[j]",
            KeyK: "[k]",
            KeyL: "[l]",
            Semicolon: "[Semicolon]",
            Quote: "[']",
            Backquote: "[`]",
            Backslash: "[Backslash]",
            KeyZ: "[z]",
            KeyX: "[x]",
            KeyC: "[c]",
            KeyV: "[v]",
            KeyB: "[b]",
            KeyN: "[n]",
            KeyM: "[m]",
            Comma: "[,]",
            Period: "[.]",
            Slash: "[/]",
            NumpadMultiply: "[*]",
            Space: "[Space]",
            CapsLock: "[CapsLock]",
            F1: "[F1]",
            F2: "[F2]",
            F3: "[F3]",
            F4: "[F4]",
            F5: "[F5]",
            F6: "[F6]",
            F7: "[F7]",
            F8: "[F8]",
            F9: "[F9]",
            F10: "[F10]",
            NumLock: "[NumLock]",
            Numpad7: "[Num7]",
            Numpad8: "[Num8]",
            Numpad9: "[Num9]",
            NumpadSubtract: "[Num-]",
            Numpad4: "[Num4]",
            Numpad5: "[Num5]",
            Numpad6: "[Num6]",
            NumpadAdd: "[Num+]",
            Numpad1: "[Num1]",
            Numpad2: "[Num2]",
            Numpad3: "[Num3]",
            Numpad0: "[Num0]",
            NumpadDecimal: "[Num.]",
            F11: "[F11]",
            F12: "[F12]",
            IntlYen: "[jYen]",
            NumpadEqual: "[Num=]",
            NumpadEnter: "[NumEnter]",
            AudioVolumeMute: "[Mute]",
            AudioVolumeDown: "[Vol-]",
            AudioVolumeUp: "[Vol+]",
            NumpadComma: "[Num,]",
            NumpadDivide: "[Num/]",
            Home: "[Home]",
            ArrowUp: "[Up Arrow]",
            PageUp: "[PgUp]",
            ArrowLeft: "[Left Arrow]",
            ArrowRight: "[Right Arrow]",
            End: "[End]",
            ArrowDown: "[Down Arrow]",
            PageDown: "[PgDn]",
            Delete: "[Del]",
          },
          s = {
            Escape: "[Esc]",
            Digit1: "[1]",
            Digit2: "[2]",
            Digit3: "[3]",
            Digit4: "[4]",
            Digit5: "[5]",
            Digit6: "[6]",
            Digit7: "[7]",
            Digit8: "[8]",
            Digit9: "[9]",
            Digit0: "[0]",
            Minus: "[-]",
            Equal: "[=]",
            Backspace: "[Back]",
            Tab: "[Tab]",
            KeyQ: "[q]",
            KeyW: "[w]",
            KeyE: "[e]",
            KeyR: "[r]",
            KeyT: "[t]",
            KeyY: "[y]",
            KeyU: "[u]",
            KeyI: "[i]",
            KeyO: "[o]",
            KeyP: "[p]",
            BracketLeft: "[[]",
            BracketRight: "[]]",
            Enter: "[Return]",
            KeyA: "[a]",
            KeyS: "[s]",
            KeyD: "[d]",
            KeyF: "[f]",
            KeyG: "[g]",
            KeyH: "[h]",
            KeyJ: "[j]",
            KeyK: "[k]",
            KeyL: "[l]",
            Semicolon: "[Semicolon]",
            Quote: "[']",
            Backquote: "[`]",
            Backslash: "[Backslash]",
            KeyZ: "[z]",
            KeyX: "[x]",
            KeyC: "[c]",
            KeyV: "[v]",
            KeyB: "[b]",
            KeyN: "[n]",
            KeyM: "[m]",
            Comma: "[,]",
            Period: "[.]",
            Slash: "[/]",
            NumpadMultiply: "[*]",
            Space: "[Space]",
            CapsLock: "[CapsLock]",
            F1: "[F1]",
            F2: "[F2]",
            F3: "[F3]",
            F4: "[F4]",
            F5: "[F5]",
            F6: "[F6]",
            F7: "[F7]",
            F8: "[F8]",
            F9: "[F9]",
            F10: "[F10]",
            NumLock: "[NumLock]",
            ScrollLock: "[ScrollLock]",
            Numpad7: "[Num7]",
            Numpad8: "[Num8]",
            Numpad9: "[Num9]",
            NumpadSubtract: "[Num-]",
            Numpad4: "[Num4]",
            Numpad5: "[Num5]",
            Numpad6: "[Num6]",
            NumpadAdd: "[Num+]",
            Numpad1: "[Num1]",
            Numpad2: "[Num2]",
            Numpad3: "[Num3]",
            Numpad0: "[Num0]",
            NumpadDecimal: "[Num.]",
            F11: "[F11]",
            F12: "[F12]",
            IntlYen: "[jYen]",
            NumpadEnter: "[NumEnter]",
            AudioVolumeMute: "[Mute]",
            AudioVolumeDown: "[Vol-]",
            AudioVolumeUp: "[Vol+]",
            NumpadDivide: "[Num/]",
            Home: "[Home]",
            ArrowUp: "[Up Arrow]",
            PageUp: "[PgUp]",
            ArrowLeft: "[Left Arrow]",
            ArrowRight: "[Right Arrow]",
            End: "[End]",
            ArrowDown: "[Down Arrow]",
            PageDown: "[PgDn]",
            Delete: "[Del]",
            OSLeft: "[L Win]",
            OSRight: "[R Win]",
          },
          o = {
            "[Esc]": "Esc",
            "[1]": "1",
            "[2]": "2",
            "[3]": "3",
            "[4]": "4",
            "[5]": "5",
            "[6]": "6",
            "[7]": "7",
            "[8]": "8",
            "[9]": "9",
            "[0]": "0",
            "[-]": "-",
            "[=]": "=",
            "[Back]": "Bk",
            "[Tab]": "Tab",
            "[TAB]": "Tab",
            "[q]": "Q",
            "[w]": "W",
            "[e]": "E",
            "[r]": "R",
            "[t]": "T",
            "[y]": "Y",
            "[u]": "U",
            "[i]": "I",
            "[o]": "O",
            "[p]": "P",
            "[[]": "[",
            "[]]": "]",
            "[Return]": "Rtn",
            "[a]": "A",
            "[s]": "S",
            "[d]": "D",
            "[f]": "F",
            "[g]": "G",
            "[h]": "H",
            "[j]": "J",
            "[k]": "K",
            "[l]": "L",
            "[Semicolon]": ";",
            "[']": "'",
            "[`]": "`",
            "[Backslash]": "Bkslash",
            "[z]": "Z",
            "[x]": "X",
            "[c]": "C",
            "[v]": "V",
            "[b]": "B",
            "[n]": "N",
            "[m]": "M",
            "[,]": ",",
            "[.]": ".",
            "[/]": "/",
            "[*]": "*",
            "[Space]": "Spce",
            "[CapsLock]": "CapsLk",
            "[F1]": "F1",
            "[F2]": "F2",
            "[F3]": "F3",
            "[F4]": "F4",
            "[F5]": "F5",
            "[F6]": "F6",
            "[F7]": "F7",
            "[F8]": "F8",
            "[F9]": "F9",
            "[F10]": "F10",
            "[NumLock]": "NumLk",
            "[ScrollLock]": "ScrollLk",
            "[Num7]": "Num7",
            "[Num8]": "Num8",
            "[Num9]": "Num9",
            "[Num-]": "Num-",
            "[Num4]": "Num4",
            "[Num5]": "Num5",
            "[Num6]": "Num6",
            "[Num+]": "Num+",
            "[Num1]": "Num1",
            "[Num2]": "Num2",
            "[Num3]": "Num3",
            "[Num0]": "Num0",
            "[Num.]": "Num.",
            "[F11]": "F11",
            "[F12]": "F12",
            "[jYen]": "jKana",
            "[Num=]": "Num=",
            "[NumEnter]": "NumEnter",
            "[Mute]": "Mute",
            "[Vol-]": "Vol-",
            "[Vol+]": "Vol+",
            "[Num,]": "Num,",
            "[Num/]": "Num/",
            "[Home]": "webHome",
            "[Up Arrow]": "Up",
            "[PgUp]": "PgUp",
            "[Left Arrow]": "Left",
            "[Right Arrow]": "Rght",
            "[End]": "End",
            "[Down Arrow]": "Down",
            "[PgDn]": "PgDn",
            "[Ins]": "Ins",
            "[Del]": "Del",
            "[L Win]": "Win",
            "[R Win]": "Win",
            "[Button 1]": "MB1",
            "[Button 2]": "MB2",
            "[Button 3]": "MB3",
            "[Button 4]": "MB4",
            "[Button 5]": "MB5",
            "[Button 6]": "MB6",
            "[Button 7]": "MB7",
            "[Button 8]": "MB8",
            "[<Unbound>]": "",
          };
        function i() {
          return void 0 === l && (l = "Win32" === navigator.platform), l;
        }
        function r(e) {
          const t = e.split(",");
          return -1 === e.indexOf("[,]")
            ? t
            : (function (e) {
                let t,
                  n = e.indexOf(",");
                for (; -1 !== n; ) {
                  if (0 === n) {
                    t = ["", e.slice(1)];
                    break;
                  }
                  if ("[" !== e.charAt(n - 1)) {
                    t = [e.slice(0, n), e.slice(n + 1)];
                    break;
                  }
                  n = e.indexOf(",", n + 1);
                }
                return -1 === n && (t = [e]), t;
              })(e);
        }
        function c(e) {
          return (
            (function (e) {
              if (e.metaKey) return i() ? "[Win]" : "[Cmd]";
              return "";
            })(e) +
            (e.shiftKey ? "[Shift]" : "") +
            (e.ctrlKey ? "[Ctrl]" : "") +
            (e.altKey ? "[Alt]" : "")
          );
        }
        function m(e, t = " ") {
          if (0 === e.length) return "";
          let n = e.replace("[Cmd]", "Cmd" + t).replace("[Alt]", "Alt" + t);
          return (
            (n = n.replace("[alt]", "Alt" + t).replace("[ctrl]", "Ctrl" + t)),
            (n = n
              .replace("[Shift]", "Shift" + t)
              .replace("[Ctrl]", "Ctrl" + t)),
            n
          );
        }
        function u(e) {
          if (e === n || void 0 === e) return "";
          const t = e.slice(e.lastIndexOf("[", e.length - 3)),
            l = e.slice(0, e.lastIndexOf("[", e.length - 3)),
            a = o[t];
          return void 0 === a ? e : m(l, " + ") + a;
        }
        function d(e, t) {
          return p(e) - p(t);
        }
        function p(e) {
          return "[ctrl]" === e
            ? 1
            : "[alt]" === e
              ? 2
              : "[shift]" === e
                ? 3
                : "[cmd]" === e || "[win]" === e
                  ? 4
                  : 5;
        }
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1).Ember.Route.extend({
          actions: {
            resetToDefaultOnCurrentRoute(e) {
              const t = this.controllerFor(e);
              return t && t.resetToDefault && t.resetToDefault(), !0;
            },
          },
        });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        const a = l.dataBinding.bindTo(l.socket);
        var s = l.Ember.Route.extend({
          persistenceService: l.Ember.inject.service("persistence"),
          model() {
            const e = this.get("persistenceService"),
              t = [];
            return (
              t.push(e.getDefaultSettingPromise("account", "lol-general")),
              t.push(e.getDefaultSettingPromise("local", "video")),
              t.push(
                l.SharedComponents.getApi_UXSettings().getUXSettingsReadyPromise(),
              ),
              t.push(
                e.getDefaultSettingPromise("account", "lol-publishing-content"),
              ),
              t.push(
                a.get("/lol-platform-config/v1/namespaces/PublishingContent"),
              ),
              t.push(
                a.get("/lol-platform-config/v1/namespaces/AccountVerification"),
              ),
              t.push(
                a.get(
                  "/lol-platform-config/v1/namespaces/PlayerBehavior/CodeOfConductEnabled",
                ),
              ),
              Promise.all(t).then((e) => ({
                generalSettings: e[0],
                videoSettings: e[1],
                uxSettings:
                  l.SharedComponents.getApi_UXSettings().getUXSettings(),
                publishingContentSettings: e[3],
                publishingContentConfig: e[4],
                accountVerificationConfig: e[5],
                codeOfConductEnabled: e[6],
                potatoOverrides:
                  l.SharedComponents.getApi_UXSettings().getPotatoModeOverrides(),
              }))
            );
          },
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = l.Ember.Route.extend({
            persistenceService: l.Ember.inject.service("persistence"),
            model() {
              return this.get("persistenceService")
                .getDefaultSettingPromise("account", "lol-notifications")
                .then((e) => ({ notificationsSettings: e }));
            },
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        const a = l.dataBinding.bindTo(l.socket);
        var s = l.Ember.Route.extend({
          persistenceService: l.Ember.inject.service("persistence"),
          model() {
            const e = this.get("persistenceService"),
              t = [];
            return (
              t.push(e.getDefaultSettingPromise("account", "lol-chat")),
              t.push(a.get("/lol-platform-config/v1/namespaces/LcuSocial")),
              Promise.all(t).then((e) => ({
                chatSettings: e[0],
                socialToggles: e[1],
              }))
            );
          },
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        l.dataBinding.bindTo(l.socket);
        var a = l.Ember.Route.extend({
          persistenceService: l.Ember.inject.service("persistence"),
          model() {
            return this.get("persistenceService")
              .getDefaultSettingPromise("local", "lol-audio")
              .then((e) => ({ soundSettings: e }));
          },
        });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = l.Ember.Route.extend({
            persistenceService: l.Ember.inject.service("persistence"),
            model() {
              const e = this.get("persistenceService"),
                t = [
                  e.getDefaultSettingPromise("local", "lol-premade-voice"),
                  e.getDefaultSettingPromise("account", "lol-premade-voice"),
                ];
              return Promise.all(t).then((e) => ({
                localVoiceSettings: e[0],
                accountVoiceSettings: e[1],
              }));
            },
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        const a = l.dataBinding.bindTo(l.socket);
        var s = l.Ember.Route.extend({
          model: () =>
            Promise.all([
              a.get("/lol-chat/v1/me"),
              a.get("/lol-chat/v1/blocked-players"),
            ]).then((e) => {
              const [t, n] = e;
              return { me: t, blockedPlayers: n };
            }),
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        const a = l.dataBinding.bindTo(l.socket);
        var s = l.Ember.Route.extend({
          persistenceService: l.Ember.inject.service("persistence"),
          model() {
            const e = this.get("persistenceService");
            return e.get("gameSettingsReadyPromise").then(() => {
              const t = [];
              return (
                t.push(
                  e.getSettingPromise(
                    "GamePreferences",
                    "account",
                    "input-settings",
                  ),
                ),
                t.push(a.get("/lol-game-settings/v1/input-settings-schema")),
                t.push(a.get("/lol-game-settings/v1/game-settings-schema")),
                t.push(a.get("/lol-game-settings/v1/game-settings")),
                Promise.all(t).then((e) => ({
                  accountInputSettings: e[0],
                  inputSettingsSchema: e[1],
                  gameSettingsSchema: e[2],
                  gameSettingsRemote: e[3],
                }))
              );
            });
          },
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l,
          a = n(1),
          s = (l = n(19)) && l.__esModule ? l : { default: l };
        var o = a.Ember.Route.extend(s.default);
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        const a = l.dataBinding.bindTo(l.socket);
        var s = {
          persistenceService: l.Ember.inject.service("persistence"),
          model() {
            const e = this.get("persistenceService");
            return e.get("gameSettingsReadyPromise").then(() => {
              const t = [];
              return (
                t.push(
                  e.getSettingPromise(
                    "GamePreferences",
                    "account",
                    "game-settings",
                  ),
                ),
                t.push(a.get("/lol-game-settings/v1/game-settings-schema")),
                Promise.all(t).then((e) => ({
                  accountGameSettings: e[0],
                  gameSettingsSchema: e[1],
                }))
              );
            });
          },
        };
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l,
          a = n(1),
          s = (l = n(19)) && l.__esModule ? l : { default: l };
        var o = a.Ember.Route.extend(s.default);
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l,
          a = n(1),
          s = (l = n(19)) && l.__esModule ? l : { default: l };
        var o = a.Ember.Route.extend(s.default);
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        const a = l.dataBinding.bindTo(l.socket);
        var s = l.Ember.Route.extend({
          persistenceService: l.Ember.inject.service("persistence"),
          model() {
            const e = this.get("persistenceService"),
              t = [];
            return (
              t.push(e.getDefaultSettingPromise("local", "lol-replays")),
              t.push(a.get("/lol-replays/v1/rofls/path/default")),
              t.push(
                a.get("/lol-highlights/v1/highlights-folder-path/default"),
              ),
              t.push(a.get("/lol-replays/v1/configuration")),
              Promise.all(t).then((e) => ({
                replaysSettings: e[0],
                replaysDefaultValue: e[1],
                highlightsDefaultValue: e[2],
                replaysConfig: e[3],
              }))
            );
          },
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        const a = l.dataBinding.bindTo(l.socket);
        var s = l.Ember.Route.extend({
          model: () =>
            a
              .get("/lol-license-agreement/v1/privacy-policy")
              .then((e) => ({ privacyPolicyText: e })),
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        const a = l.dataBinding.bindTo(l.socket);
        var s = l.Ember.Route.extend({
          model: () =>
            a
              .get("/lol-license-agreement/v1/agreement")
              .then((e) => ({ licenseAgreementText: e })),
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = t.binding = void 0);
        var l = n(1);
        const a = l.dataBinding.bindTo(l.socket);
        t.binding = a;
        var s = l.Ember.Route.extend({
          async model() {
            const [e, t, n] = await Promise.all([
              a.get("/system/v1/builds"),
              a
                .get("/lol-settings/v2/config")
                .then(({ localizedLicensesURL: e }) => (e ? a.get(e) : "")),
              a.get("/fe/lol-settings/licenses/licenses.txt"),
            ]);
            return { versionInfo: e, licenseText: t ? `${t}\n${n}` : n };
          },
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        const a = l.dataBinding.bindTo(l.socket);
        var s = l.Ember.Route.extend({
          model: () =>
            a
              .get("/system/v1/builds")
              .then((e) => ({ leagueClientVersion: e.version })),
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        l.dataBinding.bindTo(l.socket);
        var a = l.Ember.Route.extend({ model: () => ({}) });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = l.Ember.Controller.extend({
            modalManager: l.Ember.inject.service("modal-manager"),
            currentGroups: l.Ember.computed.alias("modalManager.currentGroups"),
            actions: {
              goToSection(e) {
                this.get("modalManager").updateCurrentCategory(e),
                  this.transitionToRoute(e.routeName);
              },
              handleResetToDefaultButtonClick() {
                return (
                  this.send(
                    "resetToDefaultOnCurrentRoute",
                    this.currentRouteName,
                  ),
                  !0
                );
              },
            },
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l,
          a = n(1),
          s = (l = n(30)) && l.__esModule ? l : { default: l },
          o = n(31);
        const {
            DEFAULT_PROFILE_PRIVACY: i,
            ProfilePrivacyEnabledState: r,
            ProfilePrivacySetting: c,
          } = o.PROFILE_PRIVACY,
          m = {
            model: "uxSettings",
            namespace: "lol-user-experience",
            schemaVersion: 3,
            property: "potatoModeEnabled",
            scope: "local",
            defaultValue: !1,
            originalDefaultValue: !1,
          },
          u = {
            model: "uxSettings",
            namespace: "lol-user-experience",
            schemaVersion: 3,
            property: "unloadLeagueClientUx",
            scope: "local",
            defaultValue: o.SETTINGS.AUTO,
          },
          d = {
            model: "generalSettings",
            namespace: "lol-general",
            schemaVersion: 1,
            property: "uploadCrashReports",
            scope: "account",
            defaultValue: !0,
          },
          p = {
            model: "videoSettings",
            namespace: "video",
            schemaVersion: 1,
            property: "ZoomScale",
            scope: "local",
            defaultValue: 1,
          },
          _ = {
            model: "publishingContentSettings",
            namespace: "lol-publishing-content",
            schemaVersion: 1,
            property: "publishingLocale",
            scope: "account",
            defaultValue: "auto",
          };
        var g = a.Ember.Controller.extend(s.default, {
          modalManager: a.Ember.inject.service("modal-manager"),
          generalSettings: a.Ember.computed.alias("model.generalSettings"),
          videoSettings: a.Ember.computed.alias("model.videoSettings"),
          uxSettings: a.Ember.computed.alias("model.uxSettings"),
          publishingContentSettings: a.Ember.computed.alias(
            "model.publishingContentSettings",
          ),
          publishingContentConfig: a.Ember.computed.alias(
            "model.publishingContentConfig",
          ),
          accountVerificationConfig: a.Ember.computed.alias(
            "model.accountVerificationConfig",
          ),
          accountVerificationEnabled: a.Ember.computed.alias(
            "accountVerificationConfig.SettingsEnabled",
          ),
          profilePrivacyEnabled: a.Ember.computed.equal(
            "persistenceService.profilePrivacy.enabledState",
            r.ENABLED,
          ),
          isProfilePrivate: a.Ember.computed.equal(
            "persistenceService.profilePrivacy.setting",
            c.PRIVATE,
          ),
          profilePrivacyObserver: a.Ember.observer(
            "isProfilePrivate",
            async function (e, t) {
              try {
                const e = this.get(t) ? c.PRIVATE : c.PUBLIC;
                await this.get("persistenceService").setProfilePrivacy(e);
              } catch (e) {
                a.logger.error("Couldn't set profile privacy", e);
              }
            },
          ),
          potatoOverrides: a.Ember.computed.alias("model.potatoOverrides"),
          persistenceService: a.Ember.inject.service("persistence"),
          regionLocale: a.Ember.computed.alias(
            "persistenceService.regionLocale",
          ),
          gameRepairEnabled: a.Ember.computed.alias(
            "persistenceService.gameRepairEnabled",
          ),
          vanguardSystemCheckModalEnabled: a.Ember.computed.alias(
            "persistenceService.vanguardSystemCheckModalEnabled",
          ),
          computedSizeInfos: a.Ember.computed(
            "validWindowSizes",
            p.property,
            function () {
              const e = [],
                t = this.get("validWindowSizes");
              if (t) {
                const n = this.get(p.property);
                t.forEach((t) => {
                  const l = `${t.width} x ${t.height}`,
                    a = t.scale === n,
                    s = { scale: t.scale, text: l, selected: a };
                  e.push(s);
                });
              }
              return e;
            },
          ),
          potatoSettingDisabled: a.Ember.computed(
            "potatoOverrides",
            function () {
              const e = this.get("potatoOverrides");
              return (
                !!e &&
                ((m.defaultValue =
                  !!e.defaultToPotato || m.originalDefaultValue),
                e.disabled)
              );
            },
          ),
          clientShutdownOptions: a.Ember.computed(
            "tra",
            u.property,
            function () {
              const e = this.get("tra"),
                t = this.get(u.property);
              return [o.SETTINGS.ALWAYS, o.SETTINGS.AUTO, o.SETTINGS.NEVER].map(
                (n) => {
                  const l = e.get(`ux_settings_unload_in_game_setting_${n}`),
                    a = e.get(
                      `ux_settings_unload_in_game_setting_tooltip_${n}`,
                    );
                  return { value: n, text: l, selected: n === t, tooltip: a };
                },
              );
            },
          ),
          honeyfruit: a.Ember.inject.service("honeyfruit"),
          isVngPublisherSettingsVisible: a.Ember.computed.alias(
            "honeyfruit.vngPublisherSettings.visible",
          ),
          init() {
            this._super(...arguments);
            "TENCENT" === this.get("regionLocale").region.toUpperCase() &&
              (d.defaultValue = !1),
              this.bindSetting(m),
              this.bindSetting(u),
              this.bindSetting(d),
              this.bindSetting(p),
              this.bindSetting(_),
              a.WindowManager.getValidWindowSizes().then((e) => {
                this.set("validWindowSizes", e);
              });
          },
          resetToDefault: function () {
            this.set("isProfilePrivate", i.setting === c.PRIVATE),
              this.changeSetting(m.property, m.defaultValue),
              this.changeSetting(u.property, u.defaultValue),
              this.changeSetting(d.property, d.defaultValue),
              this.changeSetting(p.property, p.defaultValue),
              this.changeSetting(_.property, _.defaultValue);
          },
          actions: {
            reload: function () {
              a.Navigation.reload();
            },
            selectWindowSize: function (e) {
              const t = parseFloat(e);
              this.changeSetting(p.property, t);
            },
            selectClientShutdown: function (e) {
              this.changeSetting(u.property, e);
            },
            selectPublishingLocale: function (e) {
              this.changeSetting(_.property, e);
            },
            handleHoneyfruitLinkingOpened: function () {
              this.get("modalManager").close();
            },
            openVanguardSystemCheckModal: function () {
              const e = { systemCheckLastSeen: 0, systemCheckPassed: !1 };
              this.get("persistenceService").saveSetting(
                e,
                null,
                "local",
                "lol-vanguard",
                1,
              ),
                this.get("modalManager").close();
            },
          },
        });
        t.default = g;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = l.Ember.Mixin.create({
            persistenceService: l.Ember.inject.service("persistence"),
            bindSetting(e, t = !0) {
              const { model: n, property: a, defaultValue: s } = e,
                o = this;
              o.set(
                a,
                l.Ember.computed(t ? `${n}.data.${a}` : `${n}.${a}`, {
                  get: () => l.lodash.get(o.get(n), t ? `data.${a}` : a, s),
                  set: (s, i) => (
                    l.lodash.set(o, t ? `${n}.data.${a}` : `${n}.${a}`, i),
                    o._saveSetting(e, i)
                  ),
                }),
              );
            },
            changeSetting: function (e, t) {
              this.set(e, t);
            },
            onSaveSetting: function (e, t) {},
            doSaveSetting: function (e, t, n, l, a) {
              const s = {};
              (s[e] = t),
                this.get("persistenceService").saveDefaultSetting(s, n, l, a);
            },
            _saveSetting: function (e, t) {
              const {
                property: n,
                scope: l,
                namespace: a,
                schemaVersion: s,
              } = e;
              return (
                this.doSaveSetting(n, t, l, a, s), this.onSaveSetting(n, t), t
              );
            },
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          Object.defineProperty(t, "PAW", {
            enumerable: !0,
            get: function () {
              return l.default;
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
              return a.default;
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
              return i.default;
            },
          }),
          Object.defineProperty(t, "SOCIAL", {
            enumerable: !0,
            get: function () {
              return o.default;
            },
          }),
          Object.defineProperty(t, "TIME", {
            enumerable: !0,
            get: function () {
              return c.default;
            },
          });
        var l = m(n(32)),
          a = m(n(43)),
          s = m(n(44)),
          o = m(n(45)),
          i = m(n(46)),
          r = m(n(47)),
          c = m(n(48));
        function m(e) {
          return e && e.__esModule ? e : { default: e };
        }
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = p(n(33)),
          a = p(n(34)),
          s = p(n(35)),
          o = p(n(36)),
          i = p(n(37)),
          r = p(n(38)),
          c = p(n(39)),
          m = p(n(40)),
          u = p(n(41)),
          d = p(n(42));
        function p(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var _ = {
          COMPONENT_TYPES: l.default,
          CURRENCY_TYPES: a.default,
          INVENTORY_TYPES: s.default,
          MEDIA_TYPES: o.default,
          MEDIA_LOAD_TYPES: i.default,
          MODAL_TYPES: r.default,
          OFFER_PURCHASE_STATES: c.default,
          OFFER_VALIDATION_STATES: m.default,
          SCROLL_LIST_DISPLAY_TYPES: u.default,
          TEMPLATE_TYPES: d.default,
        };
        t.default = _;
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
          l = "RANKED_FLEX_SR",
          a = "RANKED_FLEX_TT",
          s = "CHERRY",
          o = "RANKED_TFT",
          i = "RANKED_TFT_DOUBLE_UP",
          r = "RANKED_TFT_TURBO",
          c = "RANKED_TFT_PAIRS",
          m = [n, l],
          u = [...m, a],
          d = [s],
          p = [o, i],
          _ = [r, c],
          g = [...p, ..._],
          E = [...u, ...p],
          h = [..._, ...d];
        var S = {
          RANKED_SOLO_5x5_QUEUE_TYPE: n,
          RANKED_FLEX_SR_QUEUE_TYPE: l,
          RANKED_FLEX_TT_QUEUE_TYPE: a,
          RANKED_CHERRY_QUEUE_TYPE: s,
          RANKED_TFT_QUEUE_TYPE: o,
          RANKED_TFT_DOUBLE_UP_QUEUE_TYPE: i,
          RANKED_TFT_TURBO_QUEUE_TYPE: r,
          RANKED_TFT_PAIRS_QUEUE_TYPE: c,
          RANKED_LOL_QUEUE_TYPES: u,
          RANKED_SR_QUEUE_TYPES: m,
          RANKED_TFT_QUEUE_TYPES: p,
          RATED_TFT_QUEUE_TYPES: _,
          RANKED_AND_RATED_TFT_QUEUE_TYPES: g,
          ALL_RANKED_QUEUE_TYPES: E,
          ALL_RATED_QUEUE_TYPES: h,
          ALL_RANKED_AND_RATED_QUEUE_TYPES: [...E, ...h],
        };
        t.default = S;
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
          l = { PRIVATE: "PRIVATE", PUBLIC: "PUBLIC" };
        var a = {
          ProfilePrivacyEnabledState: n,
          ProfilePrivacySetting: l,
          DEFAULT_PROFILE_PRIVACY: {
            enabledState: n.UNKNOWN,
            setting: l.PUBLIC,
          },
        };
        t.default = a;
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
        const l = 36e5,
          a = 864e5,
          s = 6048e5,
          o = {
            MILLISECONDS_IN_A_SECOND: 1e3,
            MILLISECONDS_IN_A_MINUTE: 6e4,
            MILLISECONDS_IN_A_HOUR: l,
            MILLISECONDS_IN_A_DAY: a,
            MILLISECONDS_IN_A_WEEK: s,
            MILLISECONDS_IN_A_YEAR: 314496e5,
          };
        t.TIME_CONVERSIONS = o;
        var i = { TIME_UNITS: n, TIME_CONVERSIONS: o };
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l,
          a = n(1),
          s = (l = n(30)) && l.__esModule ? l : { default: l };
        const o = {
            model: "notificationsSettings",
            namespace: "lol-notifications",
            schemaVersion: 1,
            property: "disableEsportsNotifications",
            scope: "account",
            defaultValue: !1,
          },
          i = {
            model: "notificationsSettings",
            namespace: "lol-notifications",
            schemaVersion: 1,
            property: "blockNonFriendGameInvites",
            scope: "account",
            defaultValue: !1,
          },
          r = {
            model: "notificationsSettings",
            namespace: "lol-notifications",
            schemaVersion: 1,
            property: "disableCollectionsNotifications",
            scope: "account",
            defaultValue: !1,
          };
        var c = a.Ember.Controller.extend(s.default, {
          notificationsSettings: a.Ember.computed.alias(
            "model.notificationsSettings",
          ),
          persistenceService: a.Ember.inject.service("persistence"),
          init() {
            this._super(...arguments),
              this.bindSetting(o),
              this.bindSetting(i),
              this.bindSetting(r);
          },
          resetToDefault() {
            this.changeSetting(o.property, o.defaultValue),
              this.changeSetting(i.property, i.defaultValue),
              this.changeSetting(r.property, r.defaultValue);
          },
        });
        t.default = c;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l,
          a = n(1),
          s = (l = n(30)) && l.__esModule ? l : { default: l };
        const o = {
            model: "chatSettings",
            namespace: "lol-chat",
            schemaVersion: 1,
            property: "chatFilterDisabled",
            scope: "account",
            defaultValue: !1,
          },
          i = {
            model: "chatSettings",
            namespace: "lol-chat",
            schemaVersion: 1,
            property: "linkClickWarningEnabled",
            scope: "account",
            defaultValue: !0,
          },
          r = {
            model: "chatSettings",
            namespace: "lol-chat",
            schemaVersion: 1,
            property: "moreUnreadsEnabled",
            scope: "account",
            defaultValue: !0,
          },
          c = {
            model: "chatSettings",
            namespace: "lol-chat",
            schemaVersion: 1,
            property: "friendRequestToastsDisabled",
            scope: "account",
            defaultValue: !0,
          };
        var m = a.Ember.Controller.extend(s.default, {
          chatSettings: a.Ember.computed.alias("model.chatSettings"),
          socialToggles: a.Ember.computed.alias("model.socialToggles"),
          negatedChatFilter: a.Ember.computed.not("chatFilterDisabled"),
          hideChatFilterToggle: a.Ember.computed.bool(
            "socialToggles.ForceChatFilter",
          ),
          hideFriendRequestToastsToggle: a.Ember.computed.bool(
            "socialToggles.FriendRequestToastsDisabled",
          ),
          hideMoreUnreadsToggle: a.Ember.computed(
            "socialToggles.MoreUnreadsEnabled",
            function () {
              const e = this.get("socialToggles.MoreUnreadsEnabled");
              return null != e && !Boolean(e);
            },
          ),
          persistenceService: a.Ember.inject.service("persistence"),
          init() {
            this._super(...arguments),
              this.bindSetting(o),
              this.bindSetting(i),
              this.bindSetting(r),
              this.bindSetting(c),
              this.addObserver(
                "negatedChatFilter",
                this,
                this.negatedChatFilterObserver,
              );
          },
          negatedChatFilterObserver: function () {
            const e = Boolean(this.get("negatedChatFilter"));
            if (Boolean(this.get(o.property)) === e) {
              this.changeSetting(o.property, !e);
              const t = { Chat: { EnableChatFilter: e ? 1 : 0 } };
              this.get("persistenceService").saveSetting(
                t,
                "GamePreferences",
                "account",
                "game-settings",
                1,
              );
            }
          },
          willDestroy() {
            this._super(...arguments),
              this.removeObserver(
                "negatedChatFilter",
                this,
                this.negatedChatFilterObserver,
              );
          },
          resetToDefault: function () {
            this.set("negatedChatFilter", !o.defaultValue),
              this.changeSetting(i.property, i.defaultValue),
              this.changeSetting(r.property, r.defaultValue),
              this.changeSetting(c.property, c.defaultValue);
          },
        });
        t.default = m;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l,
          a = n(1),
          s = (l = n(30)) && l.__esModule ? l : { default: l };
        const o = {
            model: "soundSettings",
            namespace: "lol-audio",
            schemaVersion: 5,
            property: "masterSoundEnabled",
            scope: "local",
            defaultValue: !0,
          },
          i = {
            model: "soundSettings",
            namespace: "lol-audio",
            schemaVersion: 5,
            property: "masterVolume",
            scope: "local",
            defaultValue: 100,
          },
          r = {
            model: "soundSettings",
            namespace: "lol-audio",
            schemaVersion: 5,
            property: "sfxEnabled",
            scope: "local",
            defaultValue: !0,
            voiceAliasProperty: "voiceEnabled",
          },
          c = {
            model: "soundSettings",
            namespace: "lol-audio",
            schemaVersion: 5,
            property: "sfxVolume",
            scope: "local",
            defaultValue: 100,
            voiceAliasProperty: "voiceVolume",
          },
          m = {
            model: "soundSettings",
            namespace: "lol-audio",
            schemaVersion: 5,
            property: "ambientSfxEnabled",
            scope: "local",
            defaultValue: !0,
          },
          u = {
            model: "soundSettings",
            namespace: "lol-audio",
            schemaVersion: 5,
            property: "pickChampVoEnabled",
            scope: "local",
            defaultValue: !0,
          },
          d = {
            model: "soundSettings",
            namespace: "lol-audio",
            schemaVersion: 5,
            property: "banChampVoEnabled",
            scope: "local",
            defaultValue: !0,
          },
          p = {
            model: "soundSettings",
            namespace: "lol-audio",
            schemaVersion: 5,
            property: "musicEnabled",
            scope: "local",
            defaultValue: !0,
          },
          _ = {
            model: "soundSettings",
            namespace: "lol-audio",
            schemaVersion: 5,
            property: "musicVolume",
            scope: "local",
            defaultValue: 100,
          },
          g = {
            model: "soundSettings",
            namespace: "lol-audio",
            schemaVersion: 5,
            property: "championSelectionMusicEnabled",
            scope: "local",
            defaultValue: !0,
          },
          E = {
            model: "soundSettings",
            namespace: "lol-audio",
            schemaVersion: 5,
            property: "ambienceMusicEnabled",
            scope: "local",
            defaultValue: !0,
          },
          h = {
            model: "soundSettings",
            namespace: "lol-audio",
            schemaVersion: 5,
            property: "loginMusicEnabled",
            scope: "local",
            defaultValue: !0,
          };
        var S = a.Ember.Controller.extend(s.default, {
          soundSettings: a.Ember.computed.alias("model.soundSettings"),
          currentSchemaVersion: a.Ember.computed.alias(
            "soundSettings.schemaVersion",
          ),
          soundDisabled: a.Ember.computed.not("masterSoundEnabled"),
          sfxNotEnabled: a.Ember.computed.not("sfxEnabled"),
          musicNotEnabled: a.Ember.computed.not("musicEnabled"),
          sfxDisabled: a.Ember.computed.or("soundDisabled", "sfxNotEnabled"),
          musicDisabled: a.Ember.computed.or(
            "soundDisabled",
            "musicNotEnabled",
          ),
          masterVolumeLabel: a.Ember.computed(i.property, function () {
            const e = Number.isInteger(this.get(i.property))
              ? this.get(i.property)
              : i.defaultValue;
            return this.get("tra").formatString(
              "lol_settings_sound_master_volume_label",
              { value: e },
            );
          }),
          sfxVolumeLabel: a.Ember.computed(c.property, function () {
            const e = Number.isInteger(this.get(c.property))
              ? this.get(c.property)
              : c.defaultValue;
            return this.get("tra").formatString(
              "lol_settings_sound_sfx_volume_label",
              { value: e },
            );
          }),
          musicVolumeLabel: a.Ember.computed(_.property, function () {
            const e = Number.isInteger(this.get(_.property))
              ? this.get(_.property)
              : _.defaultValue;
            return this.get("tra").formatString(
              "lol_settings_sound_music_volume_label",
              { value: e },
            );
          }),
          persistenceService: a.Ember.inject.service("persistence"),
          init() {
            this._super(...arguments),
              this.bindSetting(o),
              this.bindSetting(i),
              this.bindSetting(r),
              this.bindSetting(c),
              this.bindSetting(m),
              this.bindSetting(u),
              this.bindSetting(d),
              this.bindSetting(p),
              this.bindSetting(_),
              this.bindSetting(g),
              this.bindSetting(E),
              this.bindSetting(h);
            const e = this.get("currentSchemaVersion");
            Number.isInteger(e) && e < 5 && this.resetToDefault();
          },
          resetToDefault: function () {
            this.changeSetting(o.property, o.defaultValue),
              this.changeSetting(i.property, i.defaultValue),
              this.changeSetting(r.property, r.defaultValue),
              this.changeSetting(c.property, c.defaultValue),
              this.changeSetting(m.property, m.defaultValue),
              this.changeSetting(u.property, u.defaultValue),
              this.changeSetting(d.property, d.defaultValue),
              this.changeSetting(p.property, p.defaultValue),
              this.changeSetting(_.property, _.defaultValue),
              this.changeSetting(g.property, g.defaultValue),
              this.changeSetting(E.property, E.defaultValue),
              this.changeSetting(h.property, h.defaultValue);
          },
          onSaveSetting: function (e, t) {
            if (e === r.property) {
              const e = {};
              (e[r.voiceAliasProperty] = t),
                this.get("persistenceService").saveDefaultSetting(
                  e,
                  r.scope,
                  r.namespace,
                  r.schemaVersion,
                );
            } else if (e === c.property) {
              const e = {};
              (e[c.voiceAliasProperty] = 0.5 * t),
                this.get("persistenceService").saveDefaultSetting(
                  e,
                  c.scope,
                  c.namespace,
                  c.schemaVersion,
                );
            }
          },
          actions: {
            onSliderSlideEnd: function (e, t) {
              this.changeSetting(e, t);
            },
          },
        });
        t.default = S;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l,
          a = n(1),
          s = (l = n(30)) && l.__esModule ? l : { default: l };
        const o = {
            model: "accountVoiceSettings",
            namespace: "lol-premade-voice",
            schemaVersion: 1,
            property: "autoJoin",
            scope: "account",
            defaultValue: !1,
          },
          i = {
            model: "accountVoiceSettings",
            namespace: "lol-premade-voice",
            schemaVersion: 1,
            property: "muteOnConnect",
            scope: "account",
            defaultValue: !1,
          },
          r = {
            model: "localVoiceSettings",
            namespace: "lol-premade-voice",
            schemaVersion: 1,
            property: "currentCaptureDeviceHandle",
            scope: "local",
            defaultValue: "Default System Device",
          },
          c = {
            model: "localVoiceSettings",
            namespace: "lol-premade-voice",
            schemaVersion: 1,
            property: "inputVolume",
            scope: "local",
            defaultValue: 50,
          },
          m = "voiceActivity",
          u = "pushToTalk",
          d = {
            model: "accountVoiceSettings",
            namespace: "lol-premade-voice",
            schemaVersion: 1,
            property: "inputMode",
            scope: "account",
            defaultValue: m,
          },
          p = {
            model: "localVoiceSettings",
            namespace: "lol-premade-voice",
            schemaVersion: 1,
            property: "vadSensitivity",
            scope: "local",
            defaultValue: 65,
          },
          _ = {
            model: "accountVoiceSettings",
            namespace: "lol-premade-voice",
            schemaVersion: 1,
            property: "pushToTalkKey",
            scope: "account",
          };
        var g = a.Ember.Controller.extend(s.default, {
          localVoiceSettings: a.Ember.computed.alias(
            "model.localVoiceSettings",
          ),
          accountVoiceSettings: a.Ember.computed.alias(
            "model.accountVoiceSettings",
          ),
          persistenceService: a.Ember.inject.service("persistence"),
          voiceService: a.Ember.inject.service("voice"),
          captureDevices: a.Ember.computed(
            "voiceService.captureDevices",
            r.property,
            function () {
              const e = this.get("voiceService.captureDevices") || [],
                t =
                  this.get(r.property) ||
                  a.lodash.get(
                    a.lodash.first(e.filter((e) => e.is_current_device)),
                    "handle",
                  );
              return e.map((e) => {
                const n =
                  e.handle === r.defaultValue
                    ? this.get("tra.voice_settings_default_input_device")
                    : e.name;
                return { handle: e.handle, name: n, selected: e.handle === t };
              });
            },
          ),
          inputVolumeLabel: a.Ember.computed(c.property, function () {
            const e = Number.isInteger(this.get(c.property))
              ? this.get(c.property)
              : c.defaultValue;
            return this.get("tra.formatString")("voice_settings_input_gain", {
              inputVolume: e,
            });
          }),
          inputModes: a.Ember.computed(d.property, function () {
            return [
              {
                name: m,
                label: this.get("tra.voice_settings_input_activity"),
                selected: this.get("isInputModeVoice"),
              },
              {
                name: u,
                label: this.get("tra.voice_settings_push_to_talk"),
                selected: this.get("isInputModePushToTalk"),
              },
            ];
          }),
          isInputModeVoice: a.Ember.computed(d.property, function () {
            return this.get(d.property) === m;
          }),
          isInputModePushToTalk: a.Ember.computed(d.property, function () {
            return this.get(d.property) === u;
          }),
          inputModeVoiceSensitivityLabel: a.Ember.computed(
            p.property,
            function () {
              const e = Number.isInteger(this.get(p.property))
                ? this.get(p.property)
                : p.defaultValue;
              return this.get("tra.formatString")(
                "voice_settings_input_sensitivity",
                { sensitivity: e },
              );
            },
          ),
          init() {
            this._super(...arguments),
              this.bindSetting(o),
              this.bindSetting(i),
              this.bindSetting(r),
              this.bindSetting(c),
              this.bindSetting(d),
              this.bindSetting(p),
              this.bindSetting(_);
          },
          willDestroy() {
            this._super(...arguments);
          },
          resetToDefault: function () {
            this.changeSetting(o.property, o.defaultValue),
              this.changeSetting(i.property, i.defaultValue),
              this.changeSetting(r.property, r.defaultValue),
              this.changeSetting(c.property, c.defaultValue),
              this.changeSetting(d.property, d.defaultValue),
              this.changeSetting(p.property, p.defaultValue),
              this.changeSetting(_.property, _.defaultValue);
          },
          _showPTTPermissionsModal() {
            this.changeSetting(d.property, m);
            const e = this.get("tra.voice_settings_push_to_talk_modal_header"),
              t = this.get("tra.voice_settings_push_to_talk_modal_body"),
              n = {
                type: "DialogAlert",
                data: {
                  contents: a.templateHelper.contentBlockDialog(
                    e,
                    t,
                    "dialog-small",
                    "voice-settings-push-to-talk-alert",
                  ),
                  okText: this.get(
                    "tra.voice_settings_push_to_talk_modal_confirm",
                  ),
                },
                show: !0,
              };
            a.ModalManager.add(n);
          },
          actions: {
            selectPushToTalkKey: function (e) {
              this.changeSetting(_.property, e);
            },
            selectInputMode: function (e) {
              this.changeSetting(d.property, e),
                e === u &&
                  this.get("voiceService")
                    .isPushToTalkAvailable(!0)
                    .then((e) => {
                      e || this._showPTTPermissionsModal();
                    })
                    .catch(() => {
                      this._showPTTPermissionsModal();
                    });
            },
            selectCaptureDevice: function (e) {
              this.changeSetting(r.property, e);
            },
            onSliderChange: function (e, t) {
              this.changeSetting(e, t);
            },
          },
        });
        t.default = g;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l,
          a = n(1),
          s = (l = n(3)) && l.__esModule ? l : { default: l };
        const o = a.dataBinding.bindTo(a.socket),
          i = "/lol-chat/v1/blocked-players",
          r = (e, t) =>
            "string" == typeof e &&
            "string" == typeof t &&
            e.toUpperCase() === t.toUpperCase();
        var c = a.Ember.Controller.extend({
          blockedPlayers: a.Ember.computed.alias("model.blockedPlayers"),
          me: a.Ember.computed.alias("model.me"),
          delay: 2e3,
          working: !1,
          async blockPlayer({ gameName: e, tagLine: t, summonerName: n }) {
            let l;
            l = a.playerNames.isUsingAlias ? `${e} #${t}` : n;
            const s = this.showBlockPlayerModal(l);
            return await s.acceptPromise
              .then(async () => await this.executeBlockPlayer(l))
              .catch(() => null);
          },
          showBlockPlayerModal(e) {
            const t = a.templateHelper.contentBlockDialog(
              a.tra.formatString("blocked_summoners_block_confirm_title"),
              a.tra.formatString("blocked_summoners_block_confirm_text", {
                name: e,
              }),
              "dialog-medium",
              "confirm-friend-actions",
            );
            return a.ModalManager.add({
              type: "DialogConfirm",
              owner: this.namespace.rootElement,
              data: {
                contents: t,
                acceptText: a.tra.get("blocked_summoners_block_button"),
                declineText: a.tra.get("blocked_summoners_block_cancel"),
                closeButton: !1,
              },
            });
          },
          async executeBlockPlayer(e) {
            const t = { isSuccessful: !1, error: null };
            try {
              const n = await o.get(
                `/lol-summoner/v1/summoners?name=${encodeURIComponent(e)}`,
              );
              await o.post(i, { summonerId: n.summonerId });
              const l = await o.get(i, { skipCache: !0 });
              this.set("model.blockedPlayers", l), (t.isSuccessful = !0);
            } catch (e) {
              t.error = e;
            }
            return t;
          },
          validateGameNameAndTagLine(e, t) {
            if (e.length < 3)
              return {
                text: this.get("tra.block_system_message_name_too_short"),
                displayOnGameName: !0,
                isError: !0,
              };
            const n = this.get("me");
            if (r(e, n.gameName) && r(t, n.gameTag))
              return {
                text: this.get("tra.block_system_message_cannot_block_self"),
                displayOnGameName: !0,
                isError: !0,
              };
            return (this.get("blockedPlayers") || []).find(
              (n) => r(n.gameName, e) && r(n.gameTag, t),
            )
              ? {
                  text: this.get("tra").formatString(
                    "block_system_message_already_blocked",
                    { name: `${e} #${t}` },
                  ),
                  displayOnGameName: !0,
                  isError: !0,
                }
              : null;
          },
          validateSummonerName: function (e) {
            if (e.length < 3)
              return {
                text: this.get("tra.block_system_message_name_too_short"),
                displayOnGameName: !0,
                isError: !0,
              };
            const t = this.get("me");
            if (r(e, t.name))
              return {
                text: this.get("tra.block_system_message_cannot_block_self"),
                displayOnGameName: !0,
                isError: !0,
              };
            return (this.get("blockedPlayers") || []).find(
              (t) => t.name && t.name.toUpperCase() === e.toUpperCase(),
            )
              ? {
                  text: this.get("tra").formatString(
                    "block_system_message_already_blocked",
                    { name: e },
                  ),
                  displayOnGameName: !0,
                  isError: !0,
                }
              : null;
          },
          actions: {
            async enterKeyPressHandler(e) {
              this.set("working", !0);
              const t = await this.blockPlayer(e);
              return this.set("working", !1), t;
            },
            validationHandler({ gameName: e, tagLine: t, summonerName: n }) {
              return a.playerNames.isUsingAlias
                ? this.validateGameNameAndTagLine(e, t)
                : this.validateSummonerName(n);
            },
            successHandler() {
              return {
                text: this.get("tra.block_system_message_success_text"),
                displayOnGameName: !0,
                isError: !1,
              };
            },
            errorHandler({ gameName: e, tagLine: t, summonerName: n }, l) {
              if (!l) return null;
              let s = "";
              return (
                (s = a.playerNames.isUsingAlias ? `${e} #${t}` : n),
                {
                  text: this.get("tra").formatString(
                    "block_system_message_summoner_dne",
                    { name: s },
                  ),
                  displayOnGameName: !0,
                  isError: !0,
                }
              );
            },
            unblock(e) {
              return o
                .delete(i + "/" + e)
                .then(() => o.get(i, { skipCache: !0 }))
                .then((e) => {
                  s.default.unblockSuccess.play(),
                    this.set("model.blockedPlayers", e);
                });
            },
          },
        });
        t.default = c;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = l.Ember.Controller.extend({
            inputSettings: l.Ember.computed.alias(
              "model.accountInputSettings.data",
            ),
            inputSettingsSchema: l.Ember.computed.alias(
              "model.inputSettingsSchema",
            ),
            gameSettingsSchema: l.Ember.computed.alias(
              "model.gameSettingsSchema",
            ),
            gameSettingsRemote: l.Ember.computed.alias(
              "model.gameSettingsRemote",
            ),
            contentComponent: null,
            resetToDefault: function () {
              this.get("contentComponent") &&
                this.get("contentComponent").resetToDefault();
            },
            actions: {
              handleComponentInitialized: function (e) {
                this.set("contentComponent", e);
              },
            },
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l,
          a = n(1),
          s = (l = n(56)) && l.__esModule ? l : { default: l };
        var o = a.Ember.Controller.extend(s.default);
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = {
            gameSettings: l.Ember.computed.alias(
              "model.accountGameSettings.data",
            ),
            gameSettingsSchema: l.Ember.computed.alias(
              "model.gameSettingsSchema",
            ),
            contentComponent: null,
            resetToDefault: function () {
              this.get("contentComponent") &&
                this.get("contentComponent").resetToDefault();
            },
            actions: {
              handleComponentInitialized: function (e) {
                this.set("contentComponent", e);
              },
            },
          };
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l,
          a = n(1),
          s = (l = n(56)) && l.__esModule ? l : { default: l };
        var o = a.Ember.Controller.extend(s.default);
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l,
          a = n(1),
          s = (l = n(56)) && l.__esModule ? l : { default: l };
        var o = a.Ember.Controller.extend(s.default);
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l,
          a = n(1),
          s = (l = n(30)) && l.__esModule ? l : { default: l };
        const o = {
            model: "replaysSettings",
            namespace: "lol-replays",
            schemaVersion: 1,
            property: "replays-folder-path",
            scope: "local",
            defaultValue: "",
          },
          i = {
            model: "replaysSettings",
            namespace: "lol-replays",
            schemaVersion: 1,
            property: "highlights-folder-path",
            scope: "local",
            defaultValue: "",
          };
        var r = a.Ember.Controller.extend(s.default, {
          replaysSettings: a.Ember.computed.alias("model.replaysSettings"),
          replaysDefaultValue: a.Ember.computed.alias(
            "model.replaysDefaultValue",
          ),
          highlightsDefaultValue: a.Ember.computed.alias(
            "model.highlightsDefaultValue",
          ),
          replaysConfig: a.Ember.computed.alias("model.replaysConfig"),
          persistenceService: a.Ember.inject.service("persistence"),
          replaysPath: a.Ember.computed(
            o.property,
            "replaysDefaultValue",
            function () {
              return this.get(o.property)
                ? this.get(o.property)
                : this.get("replaysDefaultValue");
            },
          ),
          highlightsPath: a.Ember.computed(
            i.property,
            "highlightsDefaultValue",
            function () {
              return this.get(i.property)
                ? this.get(i.property)
                : this.get("highlightsDefaultValue");
            },
          ),
          isSettingsEnabled: a.Ember.computed("replaysConfig", function () {
            return a.lodash.get(
              this.get("replaysConfig"),
              "isReplaysEnabled",
              !1,
            );
          }),
          init() {
            this._super(...arguments),
              (o.defaultValue = this.get("replaysDefaultValue")),
              (i.defaultValue = this.get("highlightsDefaultValue")),
              this.bindSetting(o),
              this.bindSetting(i);
          },
          resetToDefault: function () {
            this.changeSetting(o.property, o.defaultValue),
              this.changeSetting(i.property, i.defaultValue);
          },
          _onChooserClick(e, t) {
            const n = this;
            window.riotInvoke({
              request: JSON.stringify({
                name: "File.RequestDirectoryPath",
                params: [
                  t,
                  n.get("tra.label_replays_chooser_dialog_title"),
                  n.get("tra.label_replays_chooser_dialog_button"),
                ],
              }),
              onSuccess: function (t) {
                n.changeSetting(e, JSON.parse(t).result);
              },
              onFailure: function (e, t) {
                a.logger.error("RequestDirectoryPath error", {
                  errorCode: e,
                  errorMessage: t,
                });
              },
            });
          },
          actions: {
            changeReplaysFolderPath: function () {
              this._onChooserClick(o.property, this.get("replaysPath"));
            },
            changeHighlightsFolderPath: function () {
              this._onChooserClick(i.property, this.get("highlightsPath"));
            },
          },
        });
        t.default = r;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = l.Ember.Controller.extend({
            privacyPolicyText: l.Ember.computed.alias(
              "model.privacyPolicyText",
            ),
            actions: {
              handleUrlClick(e) {
                let t = e.target;
                for (; t !== e.currentTarget; ) {
                  if (t.hasAttribute("href"))
                    return (
                      e.preventDefault(),
                      void window.open(t.getAttribute("href"), "_blank")
                    );
                  t = t.parentNode;
                }
              },
            },
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = l.Ember.Controller.extend({
            licenseAgreementText: l.Ember.computed.alias(
              "model.licenseAgreementText",
            ),
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = l.Ember.Controller.extend({
            versionInfo: l.Ember.computed.alias("model.versionInfo"),
            licenseText: l.Ember.computed.alias("model.licenseText"),
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        l.dataBinding.bindTo(l.socket);
        var a = l.Ember.Controller.extend({
          patchService: l.Ember.inject.service("patch"),
          leagueClientVersion: l.Ember.computed.alias(
            "model.leagueClientVersion",
          ),
          gameClientVersion: l.Ember.computed.alias(
            "patchService.gameClientVersion",
          ),
          checkingForPatchesDisabled: l.Ember.computed.not(
            "patchService.checkingForPatchesEnabled",
          ),
          clickCount: 0,
          supportedGameReleasesEnabled: !1,
          allSupportedGameReleases: {},
          filteredSupportedGameReleases: {},
          selectedRelease: null,
          gamePatchWarning: "",
          supportedGameSearchTerm: "",
          init() {
            const e = this.get(
              "tra.lol_settings_version_game_client_start_patching",
            );
            this.set(
              "gamePatchWarning",
              this.get("tra").formatString(
                "lol_settings_version_game_client_patching_warning",
                { value: e },
              ),
            );
          },
          _getReleases() {
            this.get("patchService")
              .getSupportedGameReleases()
              .then((e) => {
                this.set("allSupportedGameReleases", e.supported_game_releases),
                  this.set(
                    "filteredSupportedGameReleases",
                    e.supported_game_releases,
                  );
              });
          },
          actions: {
            onGameClientVersionClick() {
              const e = this.get("clickCount") + 1;
              e > 4 && !this.get("supportedGameReleasesEnabled")
                ? (this._getReleases(),
                  this.set("supportedGameReleasesEnabled", !0))
                : this.set("clickCount", e);
            },
            onSearch() {
              const e = this.get("supportedGameReleaseSearchTerm"),
                t = this.get("allSupportedGameReleases").filter((t) =>
                  t.artifact_id.includes(e),
                );
              this.set("filteredSupportedGameReleases", t);
            },
            startPatchingRelease() {
              const e = this.get("selectedRelease");
              e &&
                this.get("patchService")
                  .putGamePatchUrl(e.download.url)
                  .then(() => {
                    this._getReleases();
                  });
            },
            refreshReleases() {
              this._getReleases();
            },
            selectRelease(e) {
              this.set("selectedRelease", e);
            },
          },
        });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = l.Ember.Controller.extend({
            persistence: l.Ember.inject.service(),
            jpLegalStatementsRequired: l.Ember.computed(
              "persistence.settingsConfig.isLegalStatementsEnabled",
              function () {
                return this.get(
                  "persistence.settingsConfig.isLegalStatementsEnabled",
                );
              },
            ),
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = l.Ember.Component.extend({
            tagName: "",
            modalManager: l.Ember.inject.service("modal-manager"),
            currentCategory: l.Ember.computed.alias(
              "modalManager.currentCategory",
            ),
            groupName: l.Ember.computed("currentCategory", function () {
              const e = this.get("currentCategory");
              return e ? l.tra.get(e.group.capitalTitleKey) : "";
            }),
            categoryName: l.Ember.computed("currentCategory", function () {
              const e = this.get("currentCategory");
              return e ? l.tra.get(e.titleKey) : "";
            }),
            canReset: l.Ember.computed("currentCategory", function () {
              const e = this.get("currentCategory");
              return !(!e || !e.canReset);
            }),
            actions: {
              showResetConfirmDialog(e) {
                e.preventDefault();
                const t = this.get("currentCategory");
                if (t && t.canReset) {
                  l.ModalManager.add({
                    type: "DialogConfirm",
                    data: {
                      contents: this._createConfirmDialog(),
                      acceptText: l.tra.get(
                        "settings_restore_default_accept_button",
                      ),
                      declineText: l.tra.get(
                        "settings_restore_default_decline_button",
                      ),
                      closeButton: !1,
                    },
                    owner: this.get("modalManager").rootElement,
                  }).acceptPromise.then(
                    () => {
                      l.logger.trace("reset defaults"),
                        this.get("handleResetToDefaultButtonClick")();
                    },
                    () => l.logger.trace("cancel reset defaults"),
                  );
                }
              },
            },
            _createConfirmDialog() {
              const e = document.createElement("lol-uikit-content-block");
              e.setAttribute("type", "dialog-small");
              const t = document.createElement("h6");
              (t.textContent = l.tra.get("settings_restore_default_title")),
                e.appendChild(t);
              const n = document.createElement("p");
              return (
                (n.textContent = l.tra.get("settings_restore_default_text")),
                e.appendChild(n),
                e
              );
            },
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = l.Ember.Component.extend({
            classNames: ["lol-settings-footer"],
            modalManager: l.Ember.inject.service("modal-manager"),
            actions: {
              closeButtonClick() {
                this.get("modalManager").close();
              },
            },
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = l.Ember.Component.extend({
            tagName: "",
            group: null,
            modalManager: l.Ember.inject.service("modal-manager"),
            groupName: l.Ember.computed("group.titleKey", function () {
              const e = this.get("group.titleKey");
              return this.get("tra").get(e);
            }),
            selectedIndex: l.Ember.computed(
              "modalManager.currentCategory",
              "group",
              function () {
                const e = this.get("modalManager.currentCategory"),
                  t = this.get("group");
                let n = -1;
                return (
                  t.categories.forEach((t, l) => {
                    t.name === e.name && (n = l);
                  }),
                  n
                );
              },
            ),
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = l.Ember.Component.extend({
            tagName: "",
            category: null,
            isDisabled: l.Ember.computed(
              "category.computeds.disabled",
              function () {
                return !0 === this.get("category.computeds.disabled");
              },
            ),
            categoryTitleKeyTra: l.Ember.computed(
              "category.titleKey",
              function () {
                const e = this.get("category.titleKey");
                return this.get("tra").get(e);
              },
            ),
            actions: {
              selectItem(e) {
                this.get("goToSection")(e);
              },
            },
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = l.Ember.Component.extend({
            classNames: ["lol-blocked-player"],
            player: null,
            summonerName: l.Ember.computed.alias("player.name"),
            gameName: l.Ember.computed.alias("player.gameName"),
            gameTag: l.Ember.computed.alias("player.gameTag"),
            unblocking: !1,
            shouldDisplayRiotId: l.Ember.computed(
              "gameName",
              "gameTag",
              function () {
                return ["gameName", "gameTag"]
                  .map((e) => this.get(e))
                  .every((e) => e);
              },
            ),
            actions: {
              remove(e) {
                this.get("unblocking") ||
                  (this.set("unblocking", !0),
                  Promise.resolve(this.get("unblock")(e)).then(() => {
                    this.set("unblocking", !1);
                  }));
              },
            },
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        const a = {
          targetAnchor: { x: "center", y: "bottom" },
          tooltipAnchor: { x: "center", y: "top" },
          offset: { y: 5 },
          showEvent: "nothing",
          hideEvent: "nothing",
          showDelay: 150,
          transitionSpeed: 150,
        };
        var s = l.Ember.Component.extend({
          didInsertElement() {
            this._super(...arguments),
              (this.tooltipTarget = this.element.parentElement.querySelector(
                ".block-list-settings-summoner-input",
              )),
              l.TooltipManager.assign(
                this.tooltipTarget,
                this.element.querySelector("lol-uikit-tooltip"),
                null,
                a,
              ),
              this.sync();
          },
          didUpdateAttrs() {
            this._super(...arguments), this.sync();
          },
          sync() {
            if (
              (this.hideTooltipTimer &&
                l.Ember.run.cancel(this.hideTooltipTimer),
              this.hidingTooltipTimer)
            )
              this.deferredSet = !0;
            else if (
              (this.set("_errorPacketLocal", this.get("errorPacket")),
              this.get("errorPacket"))
            ) {
              const e = this.get("delay") || 2e3;
              l.TooltipManager.show(this.tooltipTarget),
                (this.hideTooltipTimer = l.Ember.run.later(
                  this,
                  () => this.hideTooltip(),
                  e,
                ));
            } else this.hideTooltip();
          },
          hideTooltip() {
            l.TooltipManager.hide(this.tooltipTarget),
              (this.hidingTooltipTimer = l.Ember.run.later(
                this,
                () => {
                  (this.hidingTooltipTimer = null),
                    this.deferredSet && ((this.deferredSet = !1), this.sync());
                },
                150,
              ));
          },
          willDestroyElement() {
            this._super(...arguments),
              this.hideTooltipTimer &&
                l.Ember.run.cancel(this.hideTooltipTimer),
              l.TooltipManager.unassign(this.tooltipTarget);
          },
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        const a = "Volume",
          s = "General",
          o = "int",
          i = "boolean",
          r = "string",
          c = {
            slider: {
              propertyName: "MasterVolume",
              dataSection: a,
              dataType: o,
            },
            checkbox: {
              propertyName: "MasterMute",
              dataSection: a,
              dataType: i,
            },
          },
          m = [
            {
              slider: {
                propertyName: "MusicVolume",
                dataSection: a,
                dataType: o,
              },
              checkbox: {
                propertyName: "MusicMute",
                dataSection: a,
                dataType: i,
              },
            },
            {
              slider: {
                propertyName: "AnnouncerVolume",
                dataSection: a,
                dataType: o,
              },
              checkbox: {
                propertyName: "AnnouncerMute",
                dataSection: a,
                dataType: i,
              },
            },
            {
              slider: {
                propertyName: "VoiceVolume",
                dataSection: a,
                dataType: o,
              },
              checkbox: {
                propertyName: "VoiceMute",
                dataSection: a,
                dataType: i,
              },
            },
            {
              slider: {
                propertyName: "SfxVolume",
                dataSection: a,
                dataType: o,
              },
              checkbox: {
                propertyName: "SfxMute",
                dataSection: a,
                dataType: i,
              },
            },
            {
              slider: {
                propertyName: "AmbienceVolume",
                dataSection: a,
                dataType: o,
              },
              checkbox: {
                propertyName: "AmbienceMute",
                dataSection: a,
                dataType: i,
              },
            },
            {
              slider: {
                propertyName: "PingsVolume",
                dataSection: a,
                dataType: o,
              },
              checkbox: {
                propertyName: "PingsMute",
                dataSection: a,
                dataType: i,
              },
            },
          ],
          u = {
            propertyName: "EnableAudio",
            dataSection: s,
            reverse: !0,
            dataType: i,
            defaultValue: !0,
          },
          d = { propertyName: "ThemeMusic", dataSection: s, dataType: r };
        var p = l.Ember.Component.extend({
          classNames: ["lol-settings-game-sound-content-component"],
          persistenceService: l.Ember.inject.service("persistence"),
          init() {
            this._super(...arguments),
              this._registerSliderAndCheckbox(c),
              l.lodash.forEach(m, (e) => {
                l.logger.trace("register property " + e.slider.propertyName),
                  this._registerSliderAndCheckbox(e);
              }),
              this._registerComputedProperty(u),
              this.get("handleComponentInitialized") &&
                this.get("handleComponentInitialized")(this);
          },
          resetToDefault() {
            const e = {};
            this._resetSlider(c.slider, e),
              this._resetCheckbox(c.checkbox, e),
              m.forEach((t) => {
                this._resetSlider(t.slider, e),
                  this._resetCheckbox(t.checkbox, e);
              }),
              this._resetCheckbox(u, e),
              this._saveGameSettings(e);
          },
          _resetSlider(e, t) {
            const { propertyName: n, dataSection: l, dataType: a } = e,
              s = this._getCurrentValueKey(n),
              o = this._getGameSettingSchemaKey(l, n);
            let i;
            void 0 !== this.get(o) &&
              null !== this.get(o) &&
              (i = this._getDisplayValue(this.get(o), a)),
              this.set(s, i);
            this.$(`lol-uikit-slider[for=${n}]`)[0].setAttribute("value", i),
              this._appendSaveData(t, e, i);
          },
          _resetCheckbox(e, t) {
            const {
                propertyName: n,
                dataSection: l,
                dataType: a,
                reverse: s,
                defaultValue: o,
              } = e,
              i = this._getCurrentValueKey(n),
              r = this._getGameSettingSchemaKey(l, n);
            let c;
            void 0 !== this.get(r) && null !== this.get(r)
              ? (c = this._getDisplayValue(this.get(r), a))
              : void 0 !== o && (c = o),
              this._appendSaveData(t, e, c),
              !0 === s && (c = !c),
              this.set(i, c);
            this.$(`input[name='${n}']`)[0].checked = c;
          },
          _registerSliderAndCheckbox(e) {
            this._registerComputedProperty(e.slider),
              this._registerComputedProperty(e.checkbox);
          },
          _registerComputedProperty(e) {
            const {
                propertyName: t,
                dataSection: n,
                dataType: a,
                reverse: s,
              } = e,
              o = this._getCurrentValueKey(t),
              r = this._getGameSettingsKey(n, t),
              c = this._getGameSettingSchemaKey(n, t);
            this.set(
              t,
              l.Ember.computed(r, c, () => {
                let e;
                return (
                  void 0 !== this.get(r) && null !== this.get(r)
                    ? (e = this._getDisplayValue(this.get(r), a))
                    : void 0 !== this.get(c) &&
                      null !== this.get(c) &&
                      (e = this._getDisplayValue(this.get(c), a)),
                  a === i && !0 === s && (e = !e),
                  this.set(o, e),
                  l.logger.trace(`set ${t} value to ${e}`),
                  e
                );
              }),
            );
          },
          _bindEventListeners: l.Ember.on("didInsertElement", function () {
            this._bindMasterVolumeSliderAndCheckboxListeners(c),
              l.lodash.forEach(m, (e) => {
                this._bindSubVolumeSliderAndCheckboxListeners(e);
              }),
              this._bindDisableAllAudioCheckboxListener(u),
              this._bindSRThemeMusicDropdown(d);
          }),
          _bindMasterVolumeSliderAndCheckboxListeners(e) {
            this._bindSliderListener(e),
              this._bindMasterVolumeCheckboxListener(e.checkbox);
          },
          _bindSubVolumeSliderAndCheckboxListeners(e) {
            this._bindSliderListener(e),
              this._bindSubVolumeCheckboxListener(e.checkbox);
          },
          _bindSliderListener(e) {
            const t = e.slider.propertyName,
              n = e.checkbox.propertyName,
              l = this._getCurrentValueKey(t),
              a = this._getCurrentValueKey(n),
              s = this.$(`lol-uikit-slider[for='${t}']`)[0];
            this.addObserver(a, this, () => {
              this.get(a)
                ? s.setAttribute("disabled", "")
                : s.removeAttribute("disabled");
            }),
              s.addEventListener("slideEnd", (t) => {
                void 0 !== t.value &&
                  (this.set(l, t.value), this._saveProperty(e.slider, t.value));
              }),
              s.addEventListener("change", (e) => {
                void 0 !== e.value && this.set(l, e.value);
              });
          },
          _bindMasterVolumeCheckboxListener(e) {
            const t = e.propertyName,
              n = this._getCurrentValueKey(t),
              a = this.$(`input[name='${t}']`)[0],
              s = this.$(`label[for='${t}'] > span`)[0];
            this.addObserver(t, this, () => {
              (a.checked = this.get(t)),
                l.logger.trace(
                  `update ${t} value to ${this.get(t)} by property update.`,
                );
            }),
              s.addEventListener("click", () => {
                a.checked = !a.checked;
                const { checked: s } = a;
                l.logger.trace(`update ${t} value to ${s} by clicking.`),
                  this.set(n, s);
                const o = {};
                this._appendSaveData(o, e, s),
                  m.forEach((e) => {
                    const { propertyName: t } = e.checkbox,
                      n = this._getCurrentValueKey(t),
                      l = this.$(`input[name='${t}']`)[0];
                    l.checked !== s &&
                      ((l.checked = s),
                      this._appendSaveData(o, e.checkbox, s),
                      this.set(n, s));
                  }),
                  this._saveGameSettings(o);
              }),
              (a.checked = this.get(t));
          },
          _bindSubVolumeCheckboxListener(e) {
            const t = e.propertyName,
              n = this._getCurrentValueKey(t),
              a = this.$(`input[name='${t}']`)[0],
              s = this.$(`label[for='${t}'] > span`)[0];
            this.addObserver(t, this, () => {
              (a.checked = this.get(t)),
                l.logger.trace(
                  `update ${t} value to ${this.get(t)} by property update.`,
                );
            }),
              s.addEventListener("click", () => {
                a.checked = !a.checked;
                const { checked: s } = a;
                l.logger.trace(`update ${t} value to ${s} by clicking.`),
                  this.set(n, s),
                  this._saveProperty(e, s),
                  this._checkMasterVolumeStatus();
              }),
              (a.checked = this.get(t));
          },
          _bindDisableAllAudioCheckboxListener(e) {
            const t = e.propertyName,
              n = this._getCurrentValueKey(t),
              a = this.$(`input[name='${t}']`)[0];
            this.addObserver(t, this, () => {
              (a.checked = this.get(t)),
                l.logger.trace(
                  `update ${t} value to ${this.get(t)} by property update.`,
                );
            }),
              a.addEventListener("change", () => {
                const { checked: s } = a;
                l.logger.trace(`update ${t} value to ${s} by clicking.`),
                  this.set(n, s),
                  this._saveProperty(e, !s);
              }),
              (a.checked = this.get(t));
          },
          _bindSRThemeMusicDropdown(e) {
            const t = e.dataSection,
              n = e.propertyName,
              l = `#${n}`,
              a = this.$(l)[0],
              s = 0 | this.get(`gameSettings.${t}.${n}`);
            null != s && a.select && a.select(s.toString()),
              this.addObserver(`gameSettings.${t}.${n}`, this, () => {
                const e = 0 | this.get(`gameSettings.${t}.${n}`);
                null != e && a.select && a.select(e.toString());
              }),
              a.addEventListener("selected", (t) => {
                this._saveProperty(
                  e,
                  Number(t.selected.attributes.value.value),
                );
              });
          },
          _checkMasterVolumeStatus() {
            const e = c.checkbox.propertyName,
              t = this._getCurrentValueKey(e),
              n = this.$(`input[name='${e}']`)[0];
            let a = !0;
            m.forEach((e) => {
              this.$(`input[name='${e.checkbox.propertyName}']`)[0].checked ||
                (a = !1);
            }),
              ((a && !n.checked) || (!a && n.checked)) &&
                ((n.checked = !n.checked),
                this.set(t, n.checked),
                this._saveProperty(c.checkbox, n.checked),
                l.logger.trace(
                  `Update overall volume to ${n.checked}, because should disable is ${a}`,
                ));
          },
          _saveProperty(e, t) {
            const n = this._getSaveValue(t, e.dataType),
              l = {};
            (l[e.propertyName] = n),
              this._savePropertyWithSection(e.dataSection, l);
          },
          _savePropertyWithSection(e, t) {
            const n = {};
            (n[e] = t), this._saveGameSettings(n);
          },
          _appendSaveData(e, t, n) {
            void 0 === e[t.dataSection] && (e[t.dataSection] = {}),
              (e[t.dataSection][t.propertyName] = this._getSaveValue(
                n,
                t.dataType,
              ));
          },
          _getSaveValue: (e, t) =>
            t === i
              ? e
                ? 1
                : 0
              : t === o
                ? e / 100
                : t === r
                  ? e
                  : void l.logger.error(
                      `Unknown data type ${t} with value ${e}`,
                    ),
          _getDisplayValue: (e, t) =>
            t === i
              ? l.lodash.isBoolean(e)
                ? e
                : 0 !== e
              : t === o
                ? parseInt(100 * e)
                : void l.logger.error(`Unknown data type ${t} with value ${e}`),
          _getGameSettingsKey: (e, t) => `gameSettings.${e}.${t}`,
          _getGameSettingSchemaKey: (e, t) =>
            `gameSettingsSchema.${e}.${t}.default`,
          _getCurrentValueKey: (e) => `${e}CurrentValue`,
          _saveGameSettings(e) {
            this.get("persistenceService").saveGameSettings(e);
          },
        });
        t.default = p;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        const a = [
            {
              propertyName: "LOL_SETTINGS_INGAME_INTERFACE_HUD_SCALE",
              section: "HUD",
              dataKey: "GlobalScale",
              scale: 100,
            },
            {
              propertyName: "LOL_SETTINGS_INGAME_INTERFACE_CHAT_SCALE",
              section: "HUD",
              dataKey: "ChatScale",
              scale: 1,
            },
            {
              propertyName: "LOL_SETTINGS_INGAME_INTERFACE_MINIMAP_SCALE",
              section: "HUD",
              dataKey: "MinimapScale",
              scale: 100,
            },
            {
              propertyName:
                "LOL_SETTINGS_INGAME_INTERFACE_OBJECTIVE_PLANNING_SCALE",
              section: "HUD",
              dataKey: "ObjectiveVoteScale",
              scale: 100,
            },
          ],
          s = [
            {
              sectionName:
                "LOL_SETTINGS_INGAME_INTERFACE_RESOURCE_BARS_SECTION_TITLE",
              options: [
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_SHOW_HEALTH_BARS",
                  section: "HUD",
                  dataKey: "DrawHealthBars",
                  leftColumn: !0,
                },
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_SHOW_LOSS_OF_CONTROL_UI",
                  section: "LossOfControl",
                  dataKey: "LossOfControlEnabled",
                  leftColumn: !1,
                },
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_ENABLE_HUD_ANIMATIONS",
                  section: "Performance",
                  dataKey: "EnableHUDAnimations",
                  leftColumn: !0,
                },
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_SHOW_HEALTH_BAR_SHAKE",
                  section: "HUD",
                  dataKey: "ShowHealthBarShake",
                  leftColumn: !1,
                },
              ],
              dropdowns: [
                {
                  title:
                    "LOL_SETTINGS_INGAME_INTERFACE_SHOW_NAMES_ABOVE_HEALTHBAR",
                  section: "HUD",
                  dataKey: "ShowSummonerNames",
                  options: [
                    {
                      title:
                        "LOL_SETTINGS_INGAME_INTERFACE_SHOW_NAMES_ABOVE_HEALTHBAR_NONE",
                    },
                    {
                      title:
                        "LOL_SETTINGS_INGAME_INTERFACE_SHOW_NAMES_ABOVE_HEALTHBAR_SUMMONER_NAME",
                    },
                    {
                      title:
                        "LOL_SETTINGS_INGAME_INTERFACE_SHOW_NAMES_ABOVE_HEALTHBAR_CHAMPION_NAME",
                    },
                  ],
                },
              ],
            },
            {
              sectionName:
                "LOL_SETTINGS_INGAME_INTERFACE_NOTIFICATIONS_SECTION_TITLE",
              options: [
                {
                  propertyName: "LOL_SETTINGS_INGAME_INTERFACE_SCREEN_FLASH",
                  section: "HUD",
                  dataKey: "FlashScreenWhenDamaged",
                  leftColumn: !0,
                },
                {
                  propertyName: "LOL_SETTINGS_INGAME_INTERFACE_SHOW_FLASH",
                  section: "HUD",
                  dataKey: "FlashScreenWhenStunned",
                  leftColumn: !0,
                },
                {
                  propertyName: "LOL_SETTINGS_INGAME_INTERFACE_SHOW_GODRAY",
                  section: "General",
                  dataKey: "ShowGodray",
                  leftColumn: !1,
                },
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_SHOW_OFF_SCREEN_POINTS_OF_INTEREST",
                  section: "HUD",
                  dataKey: "ShowOffScreenPointsOfInterest",
                  leftColumn: !1,
                },
              ],
            },
            {
              sectionName:
                "LOL_SETTINGS_INGAME_INTERFACE_ABILITY_DISPLAY_SECTION_TITLE",
              options: [
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_AUTO_DISPLAY_TARGET",
                  section: "HUD",
                  dataKey: "AutoDisplayTarget",
                  leftColumn: !0,
                },
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_ENABLE_LINE_MISSILE_MIS",
                  section: "HUD",
                  dataKey: "EnableLineMissileVis",
                  leftColumn: !1,
                },
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_SHOW_ATTACK_RADIUS",
                  section: "HUD",
                  dataKey: "ShowAttackRadius",
                  leftColumn: !0,
                },
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_DISABLE_HUD_SPELL_CLICK",
                  section: "HUD",
                  dataKey: "DisableHudSpellClick",
                  leftColumn: !1,
                },
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_SHOW_SPELL_COSTS",
                  section: "HUD",
                  dataKey: "ShowSpellCosts",
                  leftColumn: !0,
                },
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_SHOW_SPELL_RECOMMENDATIONS",
                  section: "HUD",
                  dataKey: "ShowSpellRecommendations",
                  leftColumn: !1,
                },
              ],
              dropdowns: [
                {
                  title:
                    "LOL_SETTINGS_INGAME_INTERFACE_ABILITY_COOLDOWN_DISPLAY",
                  section: "HUD",
                  dataKey: "NumericCooldownFormat",
                  options: [
                    {
                      title:
                        "LOL_SETTINGS_INGAME_INTERFACE_NUMERIC_COOLDOWN_NONE",
                    },
                    {
                      title:
                        "LOL_SETTINGS_INGAME_INTERFACE_NUMERIC_COOLDOWN_SECONDS",
                    },
                    {
                      title:
                        "LOL_SETTINGS_INGAME_INTERFACE_NUMERIC_COOLDOWN_MINUTES_SECONDS",
                    },
                    {
                      title:
                        "LOL_SETTINGS_INGAME_INTERFACE_NUMERIC_COOLDOWN_MINUTES",
                    },
                  ],
                },
              ],
            },
            {
              sectionName:
                "LOL_SETTINGS_INGAME_INTERFACE_MINIMAP_SECTION_TITLE",
              options: [
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_SHOW_NEUTRAL_CAMPS",
                  section: "HUD",
                  dataKey: "ShowNeutralCamps",
                  leftColumn: !0,
                },
                {
                  propertyName: "LOL_SETTINGS_INGAME_INTERFACE_FLIP_MINI_MAP",
                  section: "HUD",
                  dataKey: "FlipMiniMap",
                  leftColumn: !1,
                },
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_MINIMAP_MOVE_SELF",
                  section: "HUD",
                  dataKey: "MinimapMoveSelf",
                  leftColumn: !0,
                },
              ],
            },
            {
              sectionName:
                "LOL_SETTINGS_INGAME_INTERFACE_SCOREBOARD_SECTION_TITLE",
              options: [
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_MIRRORED_SCOREBOARD",
                  section: "HUD",
                  dataKey: "MirroredScoreboard",
                  leftColumn: !0,
                },
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_SHOW_SUMMONER_NAMES_IN_SCOREBOARD",
                  section: "HUD",
                  dataKey: "ShowSummonerNamesInScoreboard",
                  leftColumn: !1,
                },
              ],
            },
            {
              sectionName:
                "LOL_SETTINGS_INGAME_INTERFACE_TEAM_FRAMES_SECTION_TITLE",
              options: [
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_SHOW_TEAM_FRAMES_ON_LEFT",
                  section: "HUD",
                  dataKey: "ShowTeamFramesOnLeft",
                  leftColumn: !0,
                },
              ],
            },
            {
              sectionName: "LOL_SETTINGS_INGAME_INTERFACE_CHAT_SECTION_TITLE",
              dropdowns: [
                {
                  title: "LOL_SETTINGS_INGAME_INTERFACE_CHANGE_CHAT_VISIBILITY",
                  section: "HUD",
                  dataKey: "ChatChannelVisibility",
                  leftColumn: !0,
                  options: [
                    {
                      title:
                        "LOL_SETTINGS_INGAME_INTERFACE_CHAT_VISIBILITY_PREMADE",
                    },
                    {
                      title:
                        "LOL_SETTINGS_INGAME_INTERFACE_CHAT_VISIBILITY_ALLY",
                    },
                    {
                      title:
                        "LOL_SETTINGS_INGAME_INTERFACE_CHAT_VISIBILITY_ALL",
                    },
                  ],
                },
              ],
              options: [
                {
                  propertyName: "LOL_SETTINGS_INGAME_INTERFACE_SHOW_TIMESTAMPS",
                  section: "HUD",
                  dataKey: "ShowTimestamps",
                  leftColumn: !1,
                },
              ],
            },
            {
              sectionName: "LOL_SETTINGS_INGAME_INTERFACE_EMOTES_SECTION_TITLE",
              dropdowns: [
                {
                  title: "LOL_SETTINGS_INGAME_INTERFACE_EMOTE_BUBBLE_DISPLAY",
                  section: "HUD",
                  dataKey: "EmotePopupUIDisplayMode",
                  options: [
                    {
                      title:
                        "LOL_SETTINGS_INGAME_INTERFACE_EMOTE_BUBBLE_DISPLAY_ON",
                    },
                    {
                      title:
                        "LOL_SETTINGS_INGAME_INTERFACE_EMOTE_BUBBLE_DISPLAY_MUTE_SOUND",
                    },
                    {
                      title:
                        "LOL_SETTINGS_INGAME_INTERFACE_EMOTE_BUBBLE_DISPLAY_OFF",
                    },
                  ],
                },
                {
                  title: "LOL_SETTINGS_INGAME_INTERFACE_EMOTE_SIZE",
                  section: "HUD",
                  dataKey: "EmoteSize",
                  options: [
                    {
                      title: "LOL_SETTINGS_INGAME_INTERFACE_EMOTE_SIZE_NORMAL",
                    },
                    { title: "LOL_SETTINGS_INGAME_INTERFACE_EMOTE_SIZE_SMALL" },
                  ],
                },
              ],
              options: [
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_MUTE_ENEMY_EMOTES",
                  section: "HUD",
                  dataKey: "HideEnemySummonerEmotes",
                  leftColumn: !0,
                },
              ],
            },
            {
              sectionName:
                "LOL_SETTINGS_INGAME_INTERFACE_FIST_BUMP_SECTION_TITLE",
              options: [
                {
                  propertyName: "LOL_SETTINGS_INGAME_INTERFACE_MUTE_FIST_BUMPS",
                  section: "HUD",
                  dataKey: "HideReciprocityFist",
                  leftColumn: !1,
                },
              ],
            },
            {
              sectionName:
                "LOL_SETTINGS_INGAME_INTERFACE_ETERNALS_SECTION_TITLE",
              dropdowns: [
                {
                  title: "LOL_SETTINGS_INGAME_INTERFACE_ETERNALS_DISPLAY",
                  section: "HUD",
                  dataKey: "EternalsMilestoneDisplayMode",
                  options: [
                    { title: "LOL_SETTINGS_INGAME_INTERFACE_ETERNALS_ALL" },
                    {
                      title:
                        "LOL_SETTINGS_INGAME_INTERFACE_ETERNALS_SELF_AND_TEAM_ONLY",
                    },
                    { title: "LOL_SETTINGS_INGAME_INTERFACE_ETERNALS_NONE" },
                  ],
                },
              ],
            },
            {
              sectionName:
                "LOL_SETTINGS_INGAME_INTERFACE_COMBAT_TEXT_SECTION_TITLE",
              options: [
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_PHYSICAL_DAMAGE_ENABLED",
                  section: "FloatingText",
                  dataKey: "Damage_Enabled",
                  leftColumn: !0,
                },
                {
                  propertyName: "LOL_SETTINGS_INGAME_INTERFACE_HEAL_ENABLED",
                  section: "FloatingText",
                  dataKey: "Heal_Enabled",
                  leftColumn: !1,
                },
                {
                  propertyName: "LOL_SETTINGS_INGAME_INTERFACE_GOLD_ENABLED",
                  section: "FloatingText",
                  dataKey: "Gold_Enabled",
                  leftColumn: !0,
                },
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_INVULNERABLE_ENABLED",
                  section: "FloatingText",
                  dataKey: "Invulnerable_Enabled",
                  leftColumn: !1,
                },
                {
                  propertyName: "LOL_SETTINGS_INGAME_INTERFACE_QUEST_ENABLED",
                  section: "FloatingText",
                  dataKey: "QuestReceived_Enabled",
                  leftColumn: !0,
                },
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_MANA_DAMAGE_ENABLED",
                  section: "FloatingText",
                  dataKey: "ManaDamage_Enabled",
                  leftColumn: !1,
                },
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_ENEMY_PHYSICAL_DAMAGE_ENABLED",
                  section: "FloatingText",
                  dataKey: "EnemyDamage_Enabled",
                  leftColumn: !0,
                },
                {
                  propertyName: "LOL_SETTINGS_INGAME_INTERFACE_DODGE_ENABLED",
                  section: "FloatingText",
                  dataKey: "Dodge_Enabled",
                  leftColumn: !1,
                },
                {
                  propertyName: "LOL_SETTINGS_INGAME_INTERFACE_LEVEL_ENABLED",
                  section: "FloatingText",
                  dataKey: "Level_Enabled",
                  leftColumn: !0,
                },
                {
                  propertyName: "LOL_SETTINGS_INGAME_INTERFACE_SPECIAL_ENABLED",
                  section: "FloatingText",
                  dataKey: "Special_Enabled",
                  leftColumn: !1,
                },
                {
                  propertyName: "LOL_SETTINGS_INGAME_INTERFACE_SCORE_ENABLED",
                  section: "FloatingText",
                  dataKey: "Score_Enabled",
                  leftColumn: !0,
                },
                {
                  propertyName:
                    "LOL_SETTINGS_INGAME_INTERFACE_EXPERIENCE_ENABLED",
                  section: "FloatingText",
                  dataKey: "Experience_Enabled",
                  leftColumn: !1,
                },
              ],
            },
          ];
        var o = l.Ember.Component.extend({
          classNames: ["lol-settings-game-interface-content-component"],
          persistenceService: l.Ember.inject.service("persistence"),
          scaleDisplays: l.Ember.Object.create(),
          checkBoxGroups: l.Ember.A(s),
          init() {
            this._super(...arguments),
              this.get("handleComponentInitialized") &&
                this.get("handleComponentInitialized")(this);
          },
          resetToDefault() {
            const e = {
              HUD: {},
              LossOfControl: {},
              Performance: {},
              General: {},
              FloatingText: {},
            };
            l.lodash.forEach(a, (t) => {
              const n = this._getGameSettingSchemaKey(t.section, t.dataKey);
              (e[t.section][t.dataKey] = this.get(n)),
                this.set(
                  `gameSettings.${t.section}.${t.dataKey}`,
                  e[t.section][t.dataKey],
                );
            }),
              l.lodash.forEach(s, (t) => {
                l.lodash.forEach(t.options, (t) => {
                  const n = this._getGameSettingSchemaKey(t.section, t.dataKey);
                  (e[t.section][t.dataKey] = this.get(n)),
                    this.set(
                      `gameSettings.${t.section}.${t.dataKey}`,
                      e[t.section][t.dataKey],
                    );
                }),
                  l.lodash.forEach(t.dropdowns, (t) => {
                    const n = this._getGameSettingSchemaKey(
                      t.section,
                      t.dataKey,
                    );
                    (e[t.section][t.dataKey] = this.get(n)),
                      this.set(
                        `gameSettings.${t.section}.${t.dataKey}`,
                        e[t.section][t.dataKey],
                      );
                  });
              }),
              this._saveGameSettings(e);
          },
          _getGameSettingSchemaKey: (e, t) =>
            `gameSettingsSchema.${e}.${t}.default`,
          addListenersOnInserted: l.Ember.on("didInsertElement", function () {
            l.lodash.forEach(a, (e) => {
              this.setUpSlider(e);
            }),
              l.lodash.forEach(s, (e) => {
                l.lodash.forEach(e.options, (e) => {
                  this.setUpComputedProperty(e);
                }),
                  l.lodash.forEach(e.dropdowns, (e) => {
                    this.setUpDropdown(e);
                  });
              });
          }),
          setUpSlider(e) {
            l.Ember.addObserver(
              this,
              `gameSettings.${e.section}.${e.dataKey}`,
              this,
              () => {
                const t = this.get(`gameSettings.${e.section}.${e.dataKey}`);
                this.get("scaleDisplays").set(
                  e.dataKey,
                  Math.round(t * e.scale),
                );
              },
            );
            const t = this.get(`gameSettings.${e.section}.${e.dataKey}`);
            this.get("scaleDisplays").set(e.dataKey, Math.round(t * e.scale));
            const n = this.$(`lol-uikit-slider[for="${e.dataKey}"]`)[0];
            (e.slider = n),
              n.addEventListener("slideEnd", (t) => {
                if (void 0 !== t.value) {
                  const n = {};
                  n[e.dataKey] = t.value / (1 * e.scale);
                  const l = {};
                  (l[e.section] = n),
                    this.set(
                      `gameSettings.${e.section}.${e.dataKey}`,
                      t.value / (1 * e.scale),
                    ),
                    this._saveGameSettings(l);
                }
              }),
              n.addEventListener("change", (t) => {
                void 0 !== t.value &&
                  this.get("scaleDisplays").set(e.dataKey, Math.round(t.value));
              });
          },
          saveChange(e, t, n) {
            const l = {};
            l[t] = n;
            const a = {};
            (a[e] = l), this._saveGameSettings(a);
          },
          setUpComputedProperty(e) {
            const t = this;
            this.set(
              e.dataKey,
              l.Ember.computed(`gameSettings.${e.section}.${e.dataKey}`, {
                get: () => t.get(`gameSettings.${e.section}.${e.dataKey}`),
                set: (n, l) => (
                  t.set(`gameSettings.${e.section}.${e.dataKey}`, l),
                  t.saveChange(e.section, e.dataKey, l),
                  l
                ),
              }),
            );
          },
          setUpDropdown(e) {
            const t = "#" + e.dataKey,
              n = this.$(t)[0],
              a = this.get(`gameSettings.${e.section}.${e.dataKey}`);
            null != a && n.select(a.toString()),
              l.Ember.addObserver(
                this,
                `gameSettings.${e.section}.${e.dataKey}`,
                this,
                () => {
                  const t = this.get(`gameSettings.${e.section}.${e.dataKey}`);
                  null != t && n.select(t.toString());
                },
              ),
              n.addEventListener("selected", (t) => {
                this.set(
                  `gameSettings.${e.section}.${e.dataKey}`,
                  t.selected.attributes.value.value,
                ),
                  this.saveChange(
                    e.section,
                    e.dataKey,
                    t.selected.attributes.value.value,
                  );
              });
          },
          _saveGameSettings(e) {
            this.get("persistenceService").saveGameSettings(e);
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = n(9);
        const s = [
            {
              roundToFive: function (e) {
                if (void 0 === e || isNaN(e) || 0 === e) return e;
                for (; e % 5 != 0; ) e++;
                return e > 100 && (e = 100), e;
              },
              transformMouseRange: function (e, t, n) {
                const l = Math.floor(((e - 1) / (t - 1)) * (n - 1) + 1);
                return l < 0 ? 0 : l;
              },
              section: "General",
              dataKey: "GameMouseSpeed",
              transformSet: function (e) {
                return this.transformMouseRange(e, 100, 20);
              },
              transformGet: function (e) {
                return this.roundToFive(this.transformMouseRange(e, 20, 100));
              },
            },
            {
              section: "HUD",
              dataKey: "MapScrollSpeed",
              transformSet: function (e) {
                return e / 100;
              },
              transformGet: function (e) {
                return Math.round(100 * e);
              },
            },
            {
              section: "HUD",
              dataKey: "KeyboardScrollSpeed",
              transformSet: function (e) {
                return e / 100;
              },
              transformGet: function (e) {
                return Math.round(100 * e);
              },
            },
          ],
          o = [
            { section: "General", dataKey: "OSXMouseAcceleration" },
            { section: "General", dataKey: "SnapCameraOnRespawn" },
            { section: "HUD", dataKey: "ScrollSmoothingEnabled" },
            { section: "HUD", dataKey: "MiddleClickDragScrollEnabled" },
            { section: "General", dataKey: "AutoAcquireTarget" },
            { section: "General", dataKey: "PredictMovement" },
            { section: "General", dataKey: "ShowTurretRangeIndicators" },
            { section: "General", dataKey: "EnableTargetedAttackMove" },
            { section: "General", dataKey: "PreferOpenGLLegacyMode" },
            { section: "General", dataKey: "RecommendJunglePaths" },
            {
              section: "General",
              dataKey: "ClampCastTargetLocationWithinMaxRange",
            },
            { section: "General", dataKey: "TargetChampionsOnlyAsToggle" },
          ];
        var i = l.Ember.Component.extend({
          classNames: ["lol-settings-game-gameplay-content-component"],
          persistenceService: l.Ember.inject.service("persistence"),
          namespace: "lol-in-game-gameplay",
          category: "lol-in-game-gameplay",
          sliders: l.Ember.Object.create(),
          _roundToFive: s[0].roundToFive,
          _transformMouseRange: s[0].transformMouseRange,
          init() {
            this._super(...arguments),
              this.get("handleComponentInitialized") &&
                this.get("handleComponentInitialized")(this);
          },
          resetToDefault() {
            const e = {};
            (e.General = this.resetGeneralContent()),
              (e.HUD = this.resetHudContent()),
              this._saveGameSettings(e);
          },
          addListenersOnInserted: l.Ember.on("didInsertElement", function () {
            l.lodash.forEach(o, (e) => {
              this.setUpCheckbox(e);
            }),
              l.lodash.forEach(s, (e) => {
                this.setUpSlider(e);
              });
            const e = this.$("#CameraLockMode")[0],
              t = this.get("gameSettings.HUD.CameraLockMode");
            null != t && e.select && e.select(t.toString()),
              l.Ember.addObserver(
                this,
                "gameSettings.HUD.CameraLockMode",
                this,
                () => {
                  const t = this.get("gameSettings.HUD.CameraLockMode");
                  null != t && e.select && e.select(t.toString());
                },
              ),
              e.addEventListener("selected", (e) => {
                this.set(
                  "gameSettings.HUD.CameraLockMode",
                  e.selected.attributes.value.value,
                ),
                  this.saveSetting(
                    "HUD",
                    "CameraLockMode",
                    Number(e.selected.attributes.value.value),
                  );
              });
          }),
          setUpSlider(e) {
            const t = this.get(`gameSettings.${e.section}.${e.dataKey}`);
            this.get("sliders").set(e.dataKey, e.transformGet(t));
            const n = this.$(`lol-uikit-slider[for="${e.dataKey}"]`)[0];
            (e.slider = n),
              n.addEventListener("slideEnd", (t) => {
                if (void 0 !== t.value) {
                  const n = {};
                  n[e.dataKey] = e.transformSet(t.value);
                  const l = {};
                  (l[e.section] = n),
                    this.set(
                      `gameSettings.${e.section}.${e.dataKey}`,
                      e.transformSet(t.value),
                    ),
                    this._saveGameSettings(l);
                }
              }),
              n.addEventListener("change", (t) => {
                void 0 !== t.value &&
                  this.get("sliders").set(e.dataKey, Math.round(t.value));
              });
          },
          setUpCheckbox(e) {
            const t = this;
            this.set(
              e.dataKey,
              l.Ember.computed(`gameSettings.${e.section}.${e.dataKey}`, {
                get: () => t.get(`gameSettings.${e.section}.${e.dataKey}`),
                set: (n, l) => t.saveSetting(e.section, e.dataKey, l),
              }),
            );
          },
          resetGeneralContent() {
            const e = {};
            return (
              (e.OSXMouseAcceleration = this.get(
                "gameSettingsSchema.General.OSXMouseAcceleration.default",
              )),
              this.set(
                "gameSettings.General.OSXMouseAcceleration",
                e.OSXMouseAcceleration,
              ),
              (e.GameMouseSpeed = this.get(
                "gameSettingsSchema.General.GameMouseSpeed.default",
              )),
              this.set("gameSettings.General.GameMouseSpeed", e.GameMouseSpeed),
              this.get("sliders").set(
                s[0].dataKey,
                s[0].transformGet(e.GameMouseSpeed),
              ),
              (e.SnapCameraOnRespawn = this.get(
                "gameSettingsSchema.General.SnapCameraOnRespawn.default",
              )),
              this.set(
                "gameSettings.General.SnapCameraOnRespawn",
                e.SnapCameraOnRespawn,
              ),
              (e.AutoAcquireTarget = this.get(
                "gameSettingsSchema.General.AutoAcquireTarget.default",
              )),
              this.set(
                "gameSettings.General.AutoAcquireTarget",
                e.AutoAcquireTarget,
              ),
              (e.PredictMovement = this.get(
                "gameSettingsSchema.General.PredictMovement.default",
              )),
              this.set(
                "gameSettings.General.PredictMovement",
                e.PredictMovement,
              ),
              (e.ShowTurretRangeIndicators = this.get(
                "gameSettingsSchema.General.ShowTurretRangeIndicators.default",
              )),
              this.set(
                "gameSettings.General.ShowTurretRangeIndicators",
                e.ShowTurretRangeIndicators,
              ),
              (e.EnableTargetedAttackMove = this.get(
                "gameSettingsSchema.General.EnableTargetedAttackMove.default",
              )),
              this.set(
                "gameSettings.General.EnableTargetedAttackMove",
                e.EnableTargetedAttackMove,
              ),
              (e.ClampCastTargetLocationWithinMaxRange = this.get(
                "gameSettingsSchema.General.ClampCastTargetLocationWithinMaxRange.default",
              )),
              this.set(
                "gameSettings.General.ClampCastTargetLocationWithinMaxRange",
                e.ClampCastTargetLocationWithinMaxRange,
              ),
              (e.TargetChampionsOnlyAsToggle = this.get(
                "gameSettingsSchema.General.TargetChampionsOnlyAsToggle.default",
              )),
              this.set(
                "gameSettings.General.TargetChampionsOnlyAsToggle",
                e.TargetChampionsOnlyAsToggle,
              ),
              e
            );
          },
          resetHudContent() {
            const e = {};
            return (
              (e.MapScrollSpeed = this.get(
                "gameSettingsSchema.HUD.MapScrollSpeed.default",
              )),
              this.set("gameSettings.HUD.MapScrollSpeed", e.MapScrollSpeed),
              this.get("sliders").set(
                s[1].dataKey,
                s[1].transformGet(e.MapScrollSpeed),
              ),
              (e.KeyboardScrollSpeed = this.get(
                "gameSettingsSchema.HUD.KeyboardScrollSpeed.default",
              )),
              this.set(
                "gameSettings.HUD.KeyboardScrollSpeed",
                e.KeyboardScrollSpeed,
              ),
              this.get("sliders").set(
                s[2].dataKey,
                s[2].transformGet(e.KeyboardScrollSpeed),
              ),
              (e.ScrollSmoothingEnabled = this.get(
                "gameSettingsSchema.HUD.ScrollSmoothingEnabled.default",
              )),
              this.set(
                "gameSettings.HUD.ScrollSmoothingEnabled",
                e.ScrollSmoothingEnabled,
              ),
              (e.MiddleClickDragScrollEnabled = this.get(
                "gameSettingsSchema.HUD.MiddleClickDragScrollEnabled.default",
              )),
              this.set(
                "gameSettings.HUD.MiddleClickDragScrollEnabled",
                e.MiddleClickDragScrollEnabled,
              ),
              (e.CameraLockMode = this.get(
                "gameSettingsSchema.HUD.CameraLockMode.default",
              )),
              this.set("gameSettings.HUD.CameraLockMode", e.CameraLockMode),
              e
            );
          },
          showUseSoftwareMouse: !(0, a.isWindows)(),
          isWindows: (0, a.isWindows)(),
          isOSX: !(0, a.isWindows)(),
          saveSetting: function (e, t, n) {
            const l = {};
            l[t] = n;
            const a = {};
            return (
              (a[e] = l),
              this.set(`gameSettings.${e}.${t}`, n),
              this._saveGameSettings(a),
              n
            );
          },
          _saveGameSettings(e) {
            this.get("persistenceService").saveGameSettings(e);
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = l.Ember.Component.extend({
            classNameBindings: ["openStyle"],
            classNames: ["additional-hotkeys-section"],
            tab: null,
            isOpen: !1,
            openStyle: l.Ember.computed("isOpen", function () {
              return this.get("isOpen") ? "open" : "";
            }),
            headerText: l.Ember.computed("tab.name", function () {
              return this.get("tra." + this.get("tab.name"));
            }),
            actions: {
              toggle: function () {
                this.set("isOpen", !this.get("isOpen"));
              },
              showKeybindingDialog: function (e, t, n) {
                this.get("showKeybindingDialog")(e, t, n);
              },
            },
          });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l,
          a = n(1),
          s = (l = n(76)) && l.__esModule ? l : { default: l };
        var o = a.Ember.Component.extend(s.default, {
          namespace: "lol-in-game-hotkeys",
          category: "lol-in-game-hotkeys",
          additionalHotkeyGroups: a.Ember.A(n(77)),
          actions: {
            showKeybindingDialog(e, t, n) {
              this.showKeybindingDialog(e, t, n);
            },
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = n(9);
        var s = l.Ember.Mixin.create({
          persistenceService: l.Ember.inject.service("persistence"),
          tempSavedValue: void 0,
          saveKeybinding: function (e, t, n, l) {
            if ((this._removeDuplicateKeybindings(e, t, n, l), 0 === n))
              this._saveInputSettings(e, t, l);
            else {
              const a = this._getKeyArrayForTwoKeySets(e, t);
              a[n - 1] = l;
              const s = (a[0] ? a[0] : "") + "," + (a[1] ? a[1] : "");
              this._saveInputSettings(e, t, s);
            }
          },
          _saveInputSettings: function (e, t, n) {
            const l = {};
            l[t] = n;
            const a = {};
            (a[e] = l),
              this.set(`inputSettings.${e}.${t}`, n),
              this.get("persistenceService").saveGameInputSettings(a);
          },
          _getKeyArrayForTwoKeySets: function (e, t) {
            const n = this.get(`inputSettings.${e}.${t}`);
            let l = [];
            return (
              void 0 !== n &&
                ((l = (0, a.fromSavedToArray)(n)),
                1 === l.length && (l[1] = "")),
              l
            );
          },
          _removeDuplicateKeybindings: function (e, t, n, l) {
            const s = this.get("keyToActionReverseMap"),
              o = (0, a.normalizeKeybindingString)(l);
            if ("[<unbound>]" !== o && "" !== o) {
              const i = s[o];
              if (i) {
                const e = this.get(`inputSettings.${i}`);
                let t = [];
                void 0 !== e && (t = (0, a.fromSavedToArray)(e)),
                  this._removeDuplicateInSet(t, l),
                  this.set(`inputSettings.${i}`, this._combineKeyArray(t));
              }
              (s[o] = `${e}.${t}`),
                this._cleanupKeyToActionReverseMap(s, e, t, n);
            }
          },
          _cleanupKeyToActionReverseMap: function (e, t, n, l) {
            const s = this.get(`inputSettings.${t}.${n}`);
            if (s) {
              let t = "";
              if (0 === l) t = s;
              else {
                let e = [];
                (e = (0, a.fromSavedToArray)(s)),
                  1 === e.length && (e[1] = ""),
                  (t = e[l - 1]);
              }
              const n = (0, a.normalizeKeybindingString)(t);
              "[<unbound>]" !== n && "" !== n && delete e[n];
            }
          },
          _combineKeyArray: function (e) {
            return 1 === e.length
              ? e[0]
                ? e[0]
                : ""
              : (e[0] ? e[0] : "") + "," + (e[1] ? e[1] : "");
          },
          _removeDuplicateInSet: function (e, t) {
            const n = (0, a.normalizeKeybindingString)(t);
            for (let t = 0; t < e.length; t++)
              (0, a.normalizeKeybindingString)(e[t]) === n && (e[t] = "");
          },
          _keyDisplayForDialog: function (e) {
            return (
              e || this.get("tra.LOL_SETTINGS_INGAME_HOTKEYS_UNBIND_BUTTON")
            );
          },
          _createDialogContentDiv: function (e, t, n, l) {
            const s = document.createElement("lol-uikit-content-block");
            s.setAttribute("type", "dialog-small");
            const o = document.createElement("div");
            o.classList.add("lol-settings-ingame-section-title"),
              (o.textContent = this.get(
                "tra.LOL_INGAME_SETTINGS_KB_DIALOG_TITLE",
              ));
            const i = document.createElement("div");
            i.textContent = l;
            const r = document.createElement("p");
            r.appendChild(o), r.appendChild(i);
            const c = document.createElement("div");
            c.classList.add("lol-settings-ingame-keybind-dialog-key-label");
            const m = [];
            (m[0] = this.get(`inputSettings.${e}.${t}`)),
              null === m[0] && (m[0] = "[<Unbound>]"),
              0 !== n && (m[1] = n),
              (c.textContent = (0, a.formatAdditionalKeyBindings)(m));
            const u = document.createElement("button");
            return (
              u.classList.add(
                "lol-settings-ingame-keybind-dialog-unbind-button",
              ),
              (u.innerHTML = this.get(
                "tra.LOL_SETTINGS_INGAME_HOTKEYS_UNBIND_BUTTON",
              )),
              c.textContent
                ? (c.setAttribute("empty", !1), (u.disabled = !1))
                : (c.setAttribute("empty", !0),
                  (c.textContent = this.get(
                    "tra.LOL_SETTINGS_INGAME_HOTKEYS_EMPTY",
                  )),
                  (u.disabled = !0)),
              r.appendChild(c),
              r.appendChild(u),
              s.appendChild(r),
              { contentDiv: s, keybindDiv: c, unbindButton: u }
            );
          },
          showKeybindingDialog: function (e, t, n) {
            let s = "";
            if ((this.set("tempSavedValue", void 0), 0 === n)) {
              const e = this.get("tra.formatString");
              s = e("LOL_INGAME_SETTINGS_KB_DIALOG_PRIMARY", {
                action: this.get(
                  `tra.LOL_INGAME_SETTINGS_KB_KEY_${t.toUpperCase()}`,
                ),
              });
            } else
              s = this.get(`tra.LOL_INGAME_SETTINGS_KB_KEY_${t.toUpperCase()}`);
            const o = this._createDialogContentDiv(e, t, n, s),
              { keybindDiv: i } = o,
              { unbindButton: r } = o,
              c = l.ModalManager.add({
                type: "DialogConfirm",
                data: {
                  contents: o.contentDiv,
                  acceptText: this.get(
                    "tra.LOL_SETTINGS_INGAME_HOTKEYS_SAVE_BUTTON",
                  ),
                  declineText: this.get(
                    "tra.LOL_SETTINGS_INGAME_HOTKEYS_CANCEL_BUTTON",
                  ),
                },
                owner: this.element,
              }),
              m = (e) => {
                let t = e.button;
                if (0 === e.button) {
                  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey))
                    return;
                  t = 1;
                } else
                  1 === e.button
                    ? (t = 3)
                    : 3 === e.button
                      ? (t = 4)
                      : 4 === e.button && (t = 5);
                const n = (0, a.getModifiersPrefix)(e) + "[Button " + t + "]";
                this.set("tempSavedValue", n),
                  (i.textContent = (0, a.formatAdditionalKeyBindings)([n])),
                  i.setAttribute("empty", !1),
                  (r.disabled = !1),
                  c.enableAcceptButton();
              };
            c.disableAcceptButton(),
              c.acceptPromise.then(
                () => {
                  document.removeEventListener("mousedown", m),
                    void 0 !== this.get("tempSavedValue") &&
                      this.saveKeybinding(
                        e,
                        t,
                        n,
                        this.get("tempSavedValue"),
                        s,
                      );
                },
                () => {
                  document.removeEventListener("mousedown", m);
                },
              ),
              c.domNode.setAttribute("tabindex", 0),
              c.domNode.focus(),
              (r.onclick = () => {
                this.set("tempSavedValue", "[<Unbound>]"),
                  i.setAttribute("empty", !0),
                  (i.textContent = this.get(
                    "tra.LOL_SETTINGS_INGAME_HOTKEYS_EMPTY",
                  )),
                  (r.disabled = !0),
                  c.enableAcceptButton(),
                  c.domNode.focus();
              }),
              (c.domNode.onkeydown = (e) => {
                const t = (0, a.fromKeyToSaved)(e);
                void 0 !== t &&
                  (e.preventDefault(),
                  this.set("tempSavedValue", t),
                  i.setAttribute("empty", !1),
                  (i.textContent = (0, a.formatAdditionalKeyBindings)([t])),
                  (r.disabled = !1),
                  c.enableAcceptButton());
              }),
              document.addEventListener("mousedown", m);
          },
        });
        t.default = s;
      },
      (e) => {
        "use strict";
        e.exports = JSON.parse(
          '[{"groupName":"LOL_INGAME_SETTINGS_KB_KEY_SECTION_ABILITIESANDSUMMONERS","subgroups":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_SUBSECTION_NORMALCAST","twoSets":false,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTNORMALCASTSPELL1","section":"GameEvents","dataKey":"evtNormalCastSpell1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTNORMALCASTSPELL2","section":"GameEvents","dataKey":"evtNormalCastSpell2"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTNORMALCASTSPELL3","section":"GameEvents","dataKey":"evtNormalCastSpell3"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTNORMALCASTSPELL4","section":"GameEvents","dataKey":"evtNormalCastSpell4"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTNORMALCASTAVATARSPELL1","section":"GameEvents","dataKey":"evtNormalCastAvatarSpell1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTNORMALCASTAVATARSPELL2","section":"GameEvents","dataKey":"evtNormalCastAvatarSpell2"}]},{"name":"LOL_INGAME_SETTINGS_KB_KEY_SUBSECTION_SMARTCAST","twoSets":false,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTSPELL1","section":"GameEvents","dataKey":"evtSmartCastSpell1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTSPELL2","section":"GameEvents","dataKey":"evtSmartCastSpell2"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTSPELL3","section":"GameEvents","dataKey":"evtSmartCastSpell3"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTSPELL4","section":"GameEvents","dataKey":"evtSmartCastSpell4"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTAVATARSPELL1","section":"GameEvents","dataKey":"evtSmartCastAvatarSpell1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTAVATARSPELL2","section":"GameEvents","dataKey":"evtSmartCastAvatarSpell2"}]},{"name":"LOL_INGAME_SETTINGS_KB_KEY_SUBSECTION_SMARTCASTWITHINDICATOR","twoSets":false,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTWITHINDICATORSPELL1","section":"GameEvents","dataKey":"evtSmartCastWithIndicatorSpell1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTWITHINDICATORSPELL2","section":"GameEvents","dataKey":"evtSmartCastWithIndicatorSpell2"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTWITHINDICATORSPELL3","section":"GameEvents","dataKey":"evtSmartCastWithIndicatorSpell3"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTWITHINDICATORSPELL4","section":"GameEvents","dataKey":"evtSmartCastWithIndicatorSpell4"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTWITHINDICATORAVATARSPELL1","section":"GameEvents","dataKey":"evtSmartCastWithIndicatorAvatarSpell1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTWITHINDICATORAVATARSPELL2","section":"GameEvents","dataKey":"evtSmartCastWithIndicatorAvatarSpell2"}]},{"name":"LOL_INGAME_SETTINGS_KB_KEY_SUBSECTION_SELFCAST","twoSets":true,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSELFCASTSPELL1","section":"GameEvents","dataKey":"evtSelfCastSpell1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSELFCASTSPELL2","section":"GameEvents","dataKey":"evtSelfCastSpell2"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSELFCASTSPELL3","section":"GameEvents","dataKey":"evtSelfCastSpell3"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSELFCASTSPELL4","section":"GameEvents","dataKey":"evtSelfCastSpell4"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSELFCASTAVATARSPELL1","section":"GameEvents","dataKey":"evtSelfCastAvatarSpell1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSELFCASTAVATARSPELL2","section":"GameEvents","dataKey":"evtSelfCastAvatarSpell2"}]},{"name":"LOL_INGAME_SETTINGS_KB_KEY_SUBSECTION_SMARTPLUSSELFCAST","twoSets":true,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTSPELL1","section":"GameEvents","dataKey":"evtSmartPlusSelfCastSpell1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTSPELL2","section":"GameEvents","dataKey":"evtSmartPlusSelfCastSpell2"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTSPELL3","section":"GameEvents","dataKey":"evtSmartPlusSelfCastSpell3"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTSPELL4","section":"GameEvents","dataKey":"evtSmartPlusSelfCastSpell4"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTAVATARSPELL1","section":"GameEvents","dataKey":"evtSmartPlusSelfCastAvatarSpell1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTAVATARSPELL2","section":"GameEvents","dataKey":"evtSmartPlusSelfCastAvatarSpell2"}]},{"name":"LOL_INGAME_SETTINGS_KB_KEY_SUBSECTION_SMARTPLUSSELFCASTWITHINDICATOR","twoSets":true,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTWITHINDICATORSPELL1","section":"GameEvents","dataKey":"evtSmartPlusSelfCastWithIndicatorSpell1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTWITHINDICATORSPELL2","section":"GameEvents","dataKey":"evtSmartPlusSelfCastWithIndicatorSpell2"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTWITHINDICATORSPELL3","section":"GameEvents","dataKey":"evtSmartPlusSelfCastWithIndicatorSpell3"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTWITHINDICATORSPELL4","section":"GameEvents","dataKey":"evtSmartPlusSelfCastWithIndicatorSpell4"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTWITHINDICATORAVATARSPELL1","section":"GameEvents","dataKey":"evtSmartPlusSelfCastWithIndicatorAvatarSpell1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTWITHINDICATORAVATARSPELL2","section":"GameEvents","dataKey":"evtSmartPlusSelfCastWithIndicatorAvatarSpell2"}]},{"name":"LOL_INGAME_SETTINGS_KB_KEY_SUBSECTION_OTHER","twoSets":true,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTLEVELSPELL1","section":"GameEvents","dataKey":"evtLevelSpell1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTLEVELSPELL2","section":"GameEvents","dataKey":"evtLevelSpell2"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTLEVELSPELL3","section":"GameEvents","dataKey":"evtLevelSpell3"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTLEVELSPELL4","section":"GameEvents","dataKey":"evtLevelSpell4"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTCHAMPIONONLY","section":"GameEvents","dataKey":"evtChampionOnly"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTUSEITEM7","section":"GameEvents","dataKey":"evtUseItem7"}]}]},{"groupName":"LOL_INGAME_SETTINGS_KB_KEY_SECTION_ITEMS","subgroups":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_SUBSECTION_ITEMNORMALCAST","twoSets":false,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTNORMALCASTVISIONITEM","section":"GameEvents","dataKey":"evtNormalCastVisionItem"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTNORMALCASTITEM1","section":"GameEvents","dataKey":"evtNormalCastItem1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTNORMALCASTITEM2","section":"GameEvents","dataKey":"evtNormalCastItem2"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTNORMALCASTITEM3","section":"GameEvents","dataKey":"evtNormalCastItem3"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTNORMALCASTITEM4","section":"GameEvents","dataKey":"evtNormalCastItem4"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTNORMALCASTITEM5","section":"GameEvents","dataKey":"evtNormalCastItem5"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTNORMALCASTITEM6","section":"GameEvents","dataKey":"evtNormalCastItem6"}]},{"name":"LOL_INGAME_SETTINGS_KB_KEY_SUBSECTION_ITEMSMARTCAST","twoSets":false,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTVISIONITEM","section":"GameEvents","dataKey":"evtSmartCastVisionItem"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTITEM1","section":"GameEvents","dataKey":"evtSmartCastItem1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTITEM2","section":"GameEvents","dataKey":"evtSmartCastItem2"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTITEM3","section":"GameEvents","dataKey":"evtSmartCastItem3"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTITEM4","section":"GameEvents","dataKey":"evtSmartCastItem4"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTITEM5","section":"GameEvents","dataKey":"evtSmartCastItem5"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTITEM6","section":"GameEvents","dataKey":"evtSmartCastItem6"}]},{"name":"LOL_INGAME_SETTINGS_KB_KEY_SUBSECTION_ITEMSMARTCASTWITHINDICATOR","twoSets":false,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTWITHINDICATORVISIONITEM","section":"GameEvents","dataKey":"evtSmartCastWithIndicatorVisionItem"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTWITHINDICATORITEM1","section":"GameEvents","dataKey":"evtSmartCastWithIndicatorItem1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTWITHINDICATORITEM2","section":"GameEvents","dataKey":"evtSmartCastWithIndicatorItem2"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTWITHINDICATORITEM3","section":"GameEvents","dataKey":"evtSmartCastWithIndicatorItem3"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTWITHINDICATORITEM4","section":"GameEvents","dataKey":"evtSmartCastWithIndicatorItem4"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTWITHINDICATORITEM5","section":"GameEvents","dataKey":"evtSmartCastWithIndicatorItem5"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTCASTWITHINDICATORITEM6","section":"GameEvents","dataKey":"evtSmartCastWithIndicatorItem6"}]},{"name":"LOL_INGAME_SETTINGS_KB_KEY_SUBSECTION_ITEMSELFCAST","twoSets":true,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSELFCASTVISIONITEM","section":"GameEvents","dataKey":"evtSelfCastVisionItem"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSELFCASTITEM1","section":"GameEvents","dataKey":"evtSelfCastItem1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSELFCASTITEM2","section":"GameEvents","dataKey":"evtSelfCastItem2"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSELFCASTITEM3","section":"GameEvents","dataKey":"evtSelfCastItem3"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSELFCASTITEM4","section":"GameEvents","dataKey":"evtSelfCastItem4"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSELFCASTITEM5","section":"GameEvents","dataKey":"evtSelfCastItem5"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSELFCASTITEM6","section":"GameEvents","dataKey":"evtSelfCastItem6"}]},{"name":"LOL_INGAME_SETTINGS_KB_KEY_SUBSECTION_ITEMSMARTPLUSSELFCAST","twoSets":true,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTVISIONITEM","section":"GameEvents","dataKey":"evtSmartPlusSelfCastVisionItem"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTITEM1","section":"GameEvents","dataKey":"evtSmartPlusSelfCastItem1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTITEM2","section":"GameEvents","dataKey":"evtSmartPlusSelfCastItem2"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTITEM3","section":"GameEvents","dataKey":"evtSmartPlusSelfCastItem3"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTITEM4","section":"GameEvents","dataKey":"evtSmartPlusSelfCastItem4"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTITEM5","section":"GameEvents","dataKey":"evtSmartPlusSelfCastItem5"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTITEM6","section":"GameEvents","dataKey":"evtSmartPlusSelfCastItem6"}]},{"name":"LOL_INGAME_SETTINGS_KB_KEY_SUBSECTION_ITEMSMARTPLUSSELFCASTWITHINDICATOR","twoSets":false,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTWITHINDICATORVISIONITEM","section":"GameEvents","dataKey":"evtSmartPlusSelfCastWithIndicatorVisionItem"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTWITHINDICATORITEM1","section":"GameEvents","dataKey":"evtSmartPlusSelfCastWithIndicatorItem1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTWITHINDICATORITEM2","section":"GameEvents","dataKey":"evtSmartPlusSelfCastWithIndicatorItem2"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTWITHINDICATORITEM3","section":"GameEvents","dataKey":"evtSmartPlusSelfCastWithIndicatorItem3"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTWITHINDICATORITEM4","section":"GameEvents","dataKey":"evtSmartPlusSelfCastWithIndicatorItem4"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTWITHINDICATORITEM5","section":"GameEvents","dataKey":"evtSmartPlusSelfCastWithIndicatorItem5"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSMARTPLUSSELFCASTWITHINDICATORITEM6","section":"GameEvents","dataKey":"evtSmartPlusSelfCastWithIndicatorItem6"}]}]},{"groupName":"LOL_INGAME_SETTINGS_KB_KEY_SECTION_PLAYERMOVEMENT","subgroups":[{"name":null,"twoSets":true,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTPLAYERMOVECLICK","section":"GameEvents","dataKey":"evtPlayerMoveClick"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTPLAYERATTACKMOVECLICK","section":"GameEvents","dataKey":"evtPlayerAttackMoveClick"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTPLAYERATTACKONLYCLICK","section":"GameEvents","dataKey":"evtPlayerAttackOnlyClick"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTPLAYERATTACKMOVE","section":"GameEvents","dataKey":"evtPlayerAttackMove"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTPLAYERHOLDPOSITION","section":"GameEvents","dataKey":"evtPlayerHoldPosition"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTPLAYERSTOPPOSITION","section":"GameEvents","dataKey":"evtPlayerStopPosition"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTPETMOVECLICK","section":"GameEvents","dataKey":"evtPetMoveClick"}]}]},{"groupName":"LOL_INGAME_SETTINGS_KB_KEY_SECTION_CAMERACONTROL","subgroups":[{"name":null,"twoSets":true,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTCAMERASNAP","section":"GameEvents","dataKey":"evtCameraSnap"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSELECTSELF","section":"GameEvents","dataKey":"evtSelectSelf"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSELECTALLY1","section":"GameEvents","dataKey":"evtSelectAlly1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSELECTALLY2","section":"GameEvents","dataKey":"evtSelectAlly2"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSELECTALLY3","section":"GameEvents","dataKey":"evtSelectAlly3"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSELECTALLY4","section":"GameEvents","dataKey":"evtSelectAlly4"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTCAMERALOCKTOGGLE","section":"GameEvents","dataKey":"evtCameraLockToggle"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSCROLLUP","section":"GameEvents","dataKey":"evtScrollUp"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSCROLLDOWN","section":"GameEvents","dataKey":"evtScrollDown"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSCROLLLEFT","section":"GameEvents","dataKey":"evtScrollLeft"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSCROLLRIGHT","section":"GameEvents","dataKey":"evtScrollRight"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTONUIMOUSE4PAN","section":"GameEvents","dataKey":"evtOnUIMouse4Pan"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTDRAGSCROLLLOCK","section":"GameEvents","dataKey":"evtDragScrollLock"}]}]},{"groupName":"LOL_INGAME_SETTINGS_KB_KEY_SECTION_DISPLAY","subgroups":[{"name":null,"twoSets":true,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSHOWHEALTHBARS","section":"GameEvents","dataKey":"evtShowHealthBars"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTTOGGLEMINIONHEALTHBARS","section":"GameEvents","dataKey":"evtToggleMinionHealthBars"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSHOWSUMMONERNAMES","section":"GameEvents","dataKey":"evtShowSummonerNames"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTDRAWHUD","section":"GameEvents","dataKey":"evtDrawHud"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTTOGGLEFPSANDLATENCY","section":"HUDEvents","dataKey":"evtToggleFPSAndLatency"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTTOGGLEDEATHRECAPSHOWCASE","section":"HUDEvents","dataKey":"evtToggleDeathRecapShowcase"}]}]},{"groupName":"LOL_INGAME_SETTINGS_KB_KEY_SECTION_COMMUNICATION","subgroups":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_SUBSECTION_OPENTACTICALWHEEL","twoSets":true,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVNTPLAYERPINGCURSOR","section":"GameEvents","dataKey":"evntPlayerPingCursor"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVNTPLAYERPING","section":"GameEvents","dataKey":"evntPlayerPing"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVNTPLAYERPINGDANGER","section":"GameEvents","dataKey":"evntPlayerPingDanger"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVNTPLAYERPINGCURSORDANGER","section":"GameEvents","dataKey":"evntPlayerPingCursorDanger"}]},{"name":"LOL_INGAME_SETTINGS_KB_KEY_SUBSECTION_INDIVIDUALPINGS","twoSets":true,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTPLAYERPINGOMW","section":"GameEvents","dataKey":"evtPlayerPingOMW"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTPLAYERPINGMIA","section":"GameEvents","dataKey":"evtPlayerPingMIA"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTPLAYERPINGRADIALDANGER","section":"GameEvents","dataKey":"evtPlayerPingRadialDanger"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTPLAYERPINGCOMEHERE","section":"GameEvents","dataKey":"evtPlayerPingComeHere"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTPLAYERPINGPUSH","section":"GameEvents","dataKey":"evtPlayerPingPush"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTPLAYERPINGALLIN","section":"GameEvents","dataKey":"evtPlayerPingAllIn"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTPLAYERPINGVISIONNEEDED","section":"GameEvents","dataKey":"evtPlayerPingVisionNeeded"}]},{"name":"LOL_INGAME_SETTINGS_KB_KEY_SUBSECTION_EXPRESSION","twoSets":true,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTEMOTEJOKE","section":"GameEvents","dataKey":"evtEmoteJoke"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTEMOTETAUNT","section":"GameEvents","dataKey":"evtEmoteTaunt"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTEMOTEDANCE","section":"GameEvents","dataKey":"evtEmoteDance"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTEMOTELAUGH","section":"GameEvents","dataKey":"evtEmoteLaugh"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTEMOTETOGGLE","section":"GameEvents","dataKey":"evtEmoteToggle"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTCHAMPMASTERYDISPLAY","section":"GameEvents","dataKey":"evtChampMasteryDisplay"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTRECIPROCITYTRIGGER","section":"GameEvents","dataKey":"evtReciprocityTrigger"}]},{"name":"LOL_INGAME_SETTINGS_KB_KEY_SUBSECTION_EMOTE","twoSets":true,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTRADIALEMOTEOPEN","section":"GameEvents","dataKey":"evtRadialEmoteOpen"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTRADIALEMOTEINSTANTOPEN","section":"GameEvents","dataKey":"evtRadialEmoteInstantOpen"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTRADIALEMOTEPLAYSLOT0","section":"GameEvents","dataKey":"evtRadialEmotePlaySlot0"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTRADIALEMOTEPLAYSLOT1","section":"GameEvents","dataKey":"evtRadialEmotePlaySlot1"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTRADIALEMOTEPLAYSLOT2","section":"GameEvents","dataKey":"evtRadialEmotePlaySlot2"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTRADIALEMOTEPLAYSLOT3","section":"GameEvents","dataKey":"evtRadialEmotePlaySlot3"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTRADIALEMOTEPLAYSLOT4","section":"GameEvents","dataKey":"evtRadialEmotePlaySlot4"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTRADIALEMOTEPLAYSLOT5","section":"GameEvents","dataKey":"evtRadialEmotePlaySlot5"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTRADIALEMOTEPLAYSLOT6","section":"GameEvents","dataKey":"evtRadialEmotePlaySlot6"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTRADIALEMOTEPLAYSLOT7","section":"GameEvents","dataKey":"evtRadialEmotePlaySlot7"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTRADIALEMOTEPLAYSLOT8","section":"GameEvents","dataKey":"evtRadialEmotePlaySlot8"}]},{"name":"LOL_INGAME_SETTINGS_KB_KEY_SUBSECTION_OTHER","twoSets":true,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTCHATHISTORY","section":"GameEvents","dataKey":"evtChatHistory"}]}]},{"groupName":"LOL_INGAME_SETTINGS_KB_KEY_SECTION_MENUS","subgroups":[{"name":null,"twoSets":true,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSHOWSCOREBOARD","section":"GameEvents","dataKey":"evtShowScoreBoard"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTHOLDSHOWSCOREBOARD","section":"HUDEvents","dataKey":"evtHoldShowScoreBoard"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTTOGGLEMOUSECLIP","section":"HUDEvents","dataKey":"evtToggleMouseClip"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSYSMENU","section":"GameEvents","dataKey":"evtSysMenu"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSHOWCHARACTERMENU","section":"GameEvents","dataKey":"evtShowCharacterMenu"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTTOGGLEPLAYERSTATS","section":"HUDEvents","dataKey":"evtTogglePlayerStats"}]}]},{"groupName":"LOL_INGAME_SETTINGS_KB_KEY_SECTION_ITEMSHOP","subgroups":[{"name":null,"twoSets":true,"controls":[{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTOPENSHOP","section":"GameEvents","dataKey":"evtOpenShop"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSHOPFOCUSSEARCH","section":"ShopEvents","dataKey":"evtShopFocusSearch"},{"name":"LOL_INGAME_SETTINGS_KB_KEY_EVTSHOPSWITCHTABS","section":"ShopEvents","dataKey":"evtShopSwitchTabs"}]}]}]',
        );
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = n(9),
          s = l.Ember.Component.extend({
            classNames: ["lol-settings-ingame-hotkeys-keybinding-button"],
            classNameBindings: ["quickcast"],
            assignTooltip() {
              l.TooltipManager.unassign(this.element),
                l.TooltipManager.assign(
                  this.element,
                  (e, t) => {
                    const n = document.createElement("lol-uikit-tooltip"),
                      l = document.createElement("lol-uikit-content-block");
                    l.setAttribute("type", "tooltip-system");
                    const s = document.createElement("div");
                    s.classList.add("lol-game-settings-hotkeys-tooltip");
                    const o = document.createElement("div");
                    return (
                      o.classList.add("lol-game-settings-hotkeys-description"),
                      (o.innerHTML = t
                        ? (0, a.formatAdditionalKeyBindings)([
                            t.get("keybinding"),
                          ])
                        : ""),
                      s.appendChild(o),
                      l.appendChild(s),
                      n.appendChild(l),
                      n
                    );
                  },
                  this,
                  {
                    type: "tooltip-system",
                    targetAnchor: { x: "center", y: "top" },
                    tooltipAnchor: { x: "center", y: "bottom" },
                    showDelay: "long",
                    offset: { x: 0, y: 10 },
                  },
                );
            },
            keyBindingChanged: l.Ember.observer("keybinding", function () {
              let e = 30;
              const t = (0, a.getPrimaryMainKeyDisplay)([
                this.get("keybinding"),
              ]);
              if (void 0 !== t) {
                const n = t.length;
                n > 2 && (e = 69 / n), this.assignTooltip();
              }
              const n = this.$(
                ".lol-settings-ingame-hotkeys-keybinding-button-content",
              );
              void 0 !== n && n.css("font-size", e);
            }),
            didInsertElement: function () {
              this._super(...arguments),
                this.assignTooltip(),
                this.keyBindingChanged();
            },
            willDestroyElement: function () {
              this._super(...arguments),
                this.element && l.TooltipManager.unassign(this.element);
            },
            actions: {
              showKeybindingDialog: function (e, t) {
                this.get("showKeybindingDialog")(e, t, 0);
              },
              toggleQuickCast: function (e) {
                this.get("toggleQuickCast")(e);
              },
            },
          });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l,
          a = n(1),
          s = (l = n(76)) && l.__esModule ? l : { default: l };
        var o = a.Ember.Component.extend(s.default, {
          persistenceService: a.Ember.inject.service("persistence"),
          namespace: "lol-in-game-hotkeys",
          category: "lol-in-game-hotkeys",
          primaryHotkeys: a.Ember.A(n(80)),
          abilities: a.Ember.computed("primaryHotkeys", function () {
            return a.Ember.A(
              this.get("primaryHotkeys").objectAt(0).controls.slice(0, 4),
            );
          }),
          summonerSpells: a.Ember.computed("primaryHotkeys", function () {
            return a.Ember.A(
              this.get("primaryHotkeys").objectAt(0).controls.slice(4, 6),
            );
          }),
          trinket: a.Ember.computed("primaryHotkeys", function () {
            return this.get("primaryHotkeys").objectAt(1).controls[0];
          }),
          items: a.Ember.computed("primaryHotkeys", function () {
            return a.Ember.A(
              this.get("primaryHotkeys").objectAt(1).controls.slice(1, 7),
            );
          }),
          setAndSaveQuickbind: function (e, t) {
            const n = {};
            (n[e] = t), this.saveGameInputSettings({ Quickbinds: n });
          },
          saveGameInputSettings(e) {
            this.get("persistenceService").saveGameInputSettings(e);
          },
          actions: {
            showKeybindingDialog(e, t, n) {
              this.showKeybindingDialog(e, t, n);
            },
            changeCastAll(e) {
              const t = {};
              this.get("primaryHotkeys").forEach((n) => {
                n.controls.forEach((n) => {
                  n.quickCast &&
                    (this.set(`inputSettings.Quickbinds.${n.quickCast}`, e),
                    (t[n.quickCast] = e));
                });
              }),
                this.saveGameInputSettings({ Quickbinds: t });
            },
            toggleQuickCast(e) {
              const t = `inputSettings.Quickbinds.${e}`,
                n = !this.get(t);
              this.set(t, n), this.setAndSaveQuickbind(e, n);
            },
          },
        });
        t.default = o;
      },
      (e) => {
        "use strict";
        e.exports = JSON.parse(
          '[{"name":"LOL_INGAME_SETTINGS_ABILITIES_AND_SUMMONER_SPELLS_TITLE","twoSets":false,"controls":[{"name":"LOL_INGAME_SETTINGS_ABILITY1","section":"GameEvents","dataKey1":"evtCastSpell1","quickCast":"evtCastSpell1smart"},{"name":"LOL_INGAME_SETTINGS_ABILITY2","section":"GameEvents","dataKey1":"evtCastSpell2","quickCast":"evtCastSpell2smart"},{"name":"LOL_INGAME_SETTINGS_ABILITY3","section":"GameEvents","dataKey1":"evtCastSpell3","quickCast":"evtCastSpell3smart"},{"name":"LOL_INGAME_SETTINGS_ABILITY4","section":"GameEvents","dataKey1":"evtCastSpell4","quickCast":"evtCastSpell4smart"},{"name":"LOL_INGAME_SETTINGS_SUMMONER_SPELL1","section":"GameEvents","dataKey1":"evtCastAvatarSpell1","quickCast":"evtCastAvatarSpell1smart"},{"name":"LOL_INGAME_SETTINGS_SUMMONER_SPELL2","section":"GameEvents","dataKey1":"evtCastAvatarSpell2","quickCast":"evtCastAvatarSpell2smart"}]},{"name":"LOL_INGAME_SETTINGS_ITEMS_TITLE","twoSets":false,"controls":[{"name":"LOL_INGAME_SETTINGS_TRINKET","section":"GameEvents","dataKey1":"evtUseVisionItem","quickCast":"evtUseVisionItemsmart"},{"name":"LOL_INGAME_SETTINGS_ITEM1","section":"GameEvents","dataKey1":"evtUseItem1","quickCast":"evtUseItem1smart"},{"name":"LOL_INGAME_SETTINGS_ITEM2","section":"GameEvents","dataKey1":"evtUseItem2","quickCast":"evtUseItem2smart"},{"name":"LOL_INGAME_SETTINGS_ITEM3","section":"GameEvents","dataKey1":"evtUseItem3","quickCast":"evtUseItem3smart"},{"name":"LOL_INGAME_SETTINGS_ITEM4","section":"GameEvents","dataKey1":"evtUseItem4","quickCast":"evtUseItem4smart"},{"name":"LOL_INGAME_SETTINGS_ITEM5","section":"GameEvents","dataKey1":"evtUseItem5","quickCast":"evtUseItem5smart"},{"name":"LOL_INGAME_SETTINGS_ITEM6","section":"GameEvents","dataKey1":"evtUseItem6","quickCast":"evtUseItem6smart"}]}]',
        );
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l,
          a = n(1),
          s = (l = n(30)) && l.__esModule ? l : { default: l };
        const o = {
            model: "gameSettingsRemote.HUD",
            property: "SmartCastOnKeyRelease",
            defaultValue: !0,
          },
          i = {
            model: "gameSettingsRemote.HUD",
            property: "SmartCastWithIndicator_CastWhenNewSpellSelected",
            defaultValue: !1,
          };
        var r = a.Ember.Component.extend(s.default, {
          persistenceService: a.Ember.inject.service("persistence"),
          init() {
            this._super(...arguments),
              this.get("handleQuickcastInitialized") &&
                this.get("handleQuickcastInitialized")(this),
              (o.defaultValue = this._getSchemaValue(o.property)),
              (i.defaultValue = this._getSchemaValue(i.property)),
              this.bindSetting(o, !1),
              this.bindSetting(i, !1);
          },
          resetToDefault() {
            this.changeSetting(o.property, o.defaultValue),
              this.changeSetting(i.property, i.defaultValue);
          },
          _getSchemaValue(e) {
            return this.get(`gameSettingsSchema.HUD.${e}.default`);
          },
          doSaveSetting: function (e, t) {
            const n = {};
            (n[e] = t),
              this.get("persistenceService").saveGameSettingsRemote({ HUD: n });
          },
        });
        t.default = r;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = n(9);
        const s = "Quickbinds",
          o = "GameEvents",
          i = "HUDEvents",
          r = "ShopEvents";
        var c = l.Ember.Component.extend({
          persistenceService: l.Ember.inject.service("persistence"),
          quickcastComponent: null,
          keyToActionReverseMap: void 0,
          init() {
            this._super(...arguments),
              this.get("handleComponentInitialized") &&
                this.get("handleComponentInitialized")(this),
              this.initialiseKeyToActionMap();
          },
          initialiseKeyToActionMap: function () {
            const e = {};
            [o, i, r].map((t) => {
              const n = this.get(`inputSettings.${t}`);
              for (const l in n)
                if (n.hasOwnProperty(l)) {
                  const s = n[l];
                  if (s) {
                    (0, a.fromSavedToArray)(s).forEach((n) => {
                      const s = (0, a.normalizeKeybindingString)(n);
                      "[<unbound>]" !== s && "" !== s && (e[s] = `${t}.${l}`);
                    });
                  }
                }
            }),
              this.set("keyToActionReverseMap", e);
          },
          resetToDefault: function () {
            const e = {};
            (e[s] = this.resetEventsContent(s)),
              (e[o] = this.resetEventsContent(o)),
              (e[i] = this.resetEventsContent(i)),
              (e[r] = this.resetEventsContent(r)),
              this.initialiseKeyToActionMap(),
              this._saveInputSettings(e),
              this.get("quickcastComponent") &&
                this.get("quickcastComponent").resetToDefault();
          },
          resetEventsContent: function (e) {
            const t = {},
              n = this.get(`inputSettingsSchema.${e}`);
            for (const l in n)
              n.hasOwnProperty(l) &&
                ((t[l] = n[l].default),
                this.set(`inputSettings.${e}.${l}`, t[l]));
            return t;
          },
          _saveInputSettings(e) {
            this.get("persistenceService").saveGameInputSettings(e);
          },
          actions: {
            handleQuickcastInitialized: function (e) {
              this.set("quickcastComponent", e);
            },
          },
        });
        t.default = c;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l,
          a = n(1),
          s = (l = n(3)) && l.__esModule ? l : { default: l };
        var o = a.Ember.Component.extend({
          classNames: "lol-settings-repair-row",
          _generateRepairConfirmDialog() {
            const e = document.createElement("lol-uikit-content-block");
            e.setAttribute("type", "dialog-small");
            const t = document.createElement("h6");
            t.textContent = this.get(
              "tra.lol_general_settings_game_repair_dialog_title",
            );
            const n = document.createElement("p");
            return (
              (n.textContent = this.get(
                "tra.lol_general_settings_game_repair_dialog_content",
              )),
              e.appendChild(t),
              e.appendChild(n),
              e
            );
          },
          actions: {
            initiateRepairClick() {
              s.default.repairClick.play();
              a.ModalManager.add({
                type: "DialogConfirm",
                data: {
                  contents: this._generateRepairConfirmDialog(),
                  acceptText: this.get(
                    "tra.lol_general_settings_game_repair_dialog_accept_button",
                  ),
                  declineText: this.get(
                    "tra.lol_general_settings_game_repair_dialog_decline_button",
                  ),
                  closeButton: !1,
                },
                owner: this.element,
              }).acceptPromise.then(() => {
                (0, a.dataBinding)("/lol-patch").post(
                  "/v1/products/league_of_legends/partial-repair-request",
                );
              });
            },
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        const a = {
          ar_AE: "اللغة العربية",
          cs_CZ: "Čeština",
          de_DE: "Deutsch",
          el_GR: "Ελληνικά",
          en_AU: "English",
          en_GB: "English",
          en_PH: "English",
          en_SG: "English",
          en_US: "English",
          es_AR: "Español (Latinoamérica)",
          es_ES: "Español",
          es_MX: "Español (Latinoamérica)",
          fr_FR: "Français",
          hu_HU: "Magyar",
          it_IT: "Italiano",
          ja_JP: "日本語",
          ko_KR: "한국어",
          pl_PL: "Polski",
          pt_BR: "Português",
          ro_RO: "Română",
          ru_RU: "Русский",
          th_TH: "ภาษาไทย",
          tr_TR: "Türkçe",
          vi_VN: "Tiếng Việt",
          zh_CN: "繁體中文",
          zh_MY: "中文(简体)",
          zh_TW: "中文(繁體)",
        };
        var s = l.Ember.Component.extend({
          classNames: ["lol-publishing-locale-preference-row"],
          publishingLocale: null,
          publishingContentConfig: null,
          persistenceService: l.Ember.inject.service("persistence"),
          regionLocale: l.Ember.computed.alias(
            "persistenceService.regionLocale",
          ),
          _previousLocale: null,
          localePreferenceEnabled: l.Ember.computed.bool(
            "publishingContentConfig.LocalePreferenceEnabled",
          ),
          availableLocales: l.Ember.computed(
            "publishingContentConfig",
            function () {
              return this.getWithDefault(
                "publishingContentConfig.LocalePreferenceOptions",
                "",
              )
                .split(",")
                .map((e) => e.trim())
                .filter((e) => e);
            },
          ),
          showDropdown: l.Ember.computed(
            "localePreferenceEnabled",
            "availableLocales",
            function () {
              return !(
                !this.get("localePreferenceEnabled") ||
                !this.get("availableLocales.length")
              );
            },
          ),
          autoLocaleOption: l.Ember.computed(
            "regionLocale",
            "publishingLocale",
            "tra",
            function () {
              const e = this.get("regionLocale"),
                t = "auto",
                n = this.get("publishingLocale") === t,
                l = a[e.locale];
              return {
                value: t,
                label: this.get("tra").formatString(
                  "lol_publishing_locale_settings_dropdown_option_auto",
                  { language: l },
                ),
                selected: n,
              };
            },
          ),
          getLocaleOptionLabel(e) {
            const t = this.get("regionLocale"),
              n = a[e];
            return "RIOT" === t.region ? `${e}: ${n}` : n;
          },
          dropdownOptions: l.Ember.computed(
            "availableLocales",
            "autoLocaleOption",
            "publishingLocale",
            function () {
              const e = this.get("availableLocales"),
                t = this.get("publishingLocale"),
                n = e.map((e) => ({
                  value: e,
                  label: this.getLocaleOptionLabel(e),
                  selected: e === t,
                }));
              return [this.get("autoLocaleOption"), ...n];
            },
          ),
          actions: {
            onPublishingLocaleSelected: function (e) {
              this.get("selectPublishingLocale")(e);
            },
          },
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        const a = l.dataBinding.bindTo(l.socket);
        var s = l.Ember.Component.extend({
          classNames: ["lol-settings-account-verification-row"],
          accountVerificationConfig: null,
          canVerify: l.Ember.computed.bool(
            "accountVerificationConfig.SettingsVerifyEnabled",
          ),
          cannotVerify: l.Ember.computed.not("canVerify"),
          isVerified: !1,
          init() {
            this._super(...arguments),
              a.observe(
                "/lol-account-verification/v1/is-verified",
                this,
                (e) => {
                  e &&
                    (this.set("isVerified", e.success),
                    l.logger.trace(
                      e.success
                        ? "Updated to verified state."
                        : "Updated to unverified state.",
                    ));
                },
              );
          },
          willDestroyElement() {
            this._super(...arguments),
              a.unobserve("/lol-account-verification/v1/is-verified", this);
          },
          actions: {
            showVerificationProcess() {
              this.get("cannotVerify") ||
                (l.AccountVerification.show("phone-entry", this.element),
                l.Telemetry.sendCustomData("rcp-fe-lol-account-verification", {
                  event_name: "account_verification_settings_verify",
                  screen_id: "settings",
                  message: "Player clicked Verify button.",
                }));
            },
            showRemoveProcess() {
              l.AccountVerification.show("phone-remove", this.element),
                l.Telemetry.sendCustomData("rcp-fe-lol-account-verification", {
                  event_name: "account_verification_settings_remove",
                  screen_id: "settings",
                  message: "Player clicked Remove button.",
                });
            },
          },
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1).Ember.Component.extend({
          classNames: ["lol-settings-slider-component"],
          property: "",
          value: 0,
          percentage: !1,
          showTooltip: !0,
          disabled: !1,
          clickset: !1,
          didInsertElement() {
            this._super(...arguments);
            const e = this.element.querySelector("lol-uikit-slider");
            e.addEventListener("change", this.onChange.bind(this)),
              e.addEventListener("slideEnd", this.onSlideEnd.bind(this));
          },
          willDestroyElement() {
            this._super(...arguments);
            const e = this.element.querySelector("lol-uikit-slider");
            e.removeEventListener("change", this.onChange),
              e.removeEventListener("slideEnd", this.onSlideEnd);
          },
          onChange(e) {
            void 0 !== e.value &&
              this.get("handleOnChange") &&
              this.get("handleOnChange")(this.get("property"), e.value);
          },
          onSlideEnd(e) {
            void 0 !== e.value &&
              this.get("handleOnSlideEnd") &&
              this.get("handleOnSlideEnd")(this.get("property"), e.value);
          },
        });
        t.default = l;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = n(88),
          s = n(89),
          o = l.Ember.Component.extend({
            key: void 0,
            onChange: void 0,
            _tempSaveValue: void 0,
            _keybindDiv: void 0,
            _unbindButton: void 0,
            _pttModal: void 0,
            pushToTalkKey: l.Ember.computed("key", function () {
              return this._getPrimaryMainKeyDisplay(this.get("key")) || "";
            }),
            pushToTalkKeyFontSize: l.Ember.computed(
              "pushToTalkKey",
              function () {
                const e = this.get("pushToTalkKey")
                  ? this.get("pushToTalkKey").length
                  : 0;
                let t = 30;
                return e > 2 && (t = 69 / e), `${t}px`;
              },
            ),
            pushToTalkKeyModifier: l.Ember.computed("key", function () {
              return this._getPrimaryModifierDisplay(this.get("key")) || "";
            }),
            displayKey: l.Ember.computed("key", function () {
              return this._fromSavedToDisplay(this.get("key")) || "";
            }),
            _getPrimaryMainKeyDisplay(e) {
              if (!e) return "";
              const t = e.slice(e.lastIndexOf("[", e.length - 3));
              return a.KEYCODE_DISPLAY_MAP[t];
            },
            _getPrimaryModifierDisplay(e) {
              if (!e) return "";
              const t = e.slice(0, e.lastIndexOf("[", e.length - 3));
              return this._fromModifierToDisplay(t, " ");
            },
            _fromModifierToDisplay(e, t = " ") {
              if (0 === e.length) return "";
              let n = e.replace("[Cmd]", "Cmd" + t).replace("[Alt]", "Alt" + t);
              return (
                (n = n
                  .replace("[alt]", "Alt" + t)
                  .replace("[ctrl]", "Ctrl" + t)),
                (n = n
                  .replace("[Shift]", "Shift" + t)
                  .replace("[Ctrl]", "Ctrl" + t)),
                n
              );
            },
            _isWindows() {
              return (
                null === this._isWindowsCache &&
                  (-1 !== navigator.appVersion.indexOf("Win")
                    ? (this._isWindowsCache = !0)
                    : (this._isWindowsCache = !1)),
                this._isWindowsCache
              );
            },
            _getPttModalContent(e) {
              const t = document.createElement("lol-uikit-content-block");
              t.setAttribute("type", "dialog-small"),
                t.classList.add("lol-settings-voice-ptt-modal");
              const n = this._createModalTitleDiv();
              (this._keybindDiv = this._createModalKeybindDiv()),
                (this._unbindButton = this._createModalUnbindButton());
              const l = this._fromSavedToDisplay(e);
              return (
                l
                  ? ((this._keybindDiv.textContent = l),
                    (this._unbindButton.disabled = !1))
                  : ((this._keybindDiv.textContent = this.get(
                      "tra.voice_settings_push_to_talk_empty",
                    )),
                    (this._unbindButton.disabled = !0)),
                t.appendChild(n),
                t.appendChild(this._keybindDiv),
                t.appendChild(this._unbindButton),
                t
              );
            },
            _createModalTitleDiv() {
              const e = document.createElement("div");
              return (
                e.classList.add("lol-settings-voice-ptt-modal-title"),
                (e.textContent = this.get(
                  "tra.voice_settings_push_to_talk_modal_title",
                )),
                e
              );
            },
            _fromSavedToDisplay(e) {
              if (!e) return "";
              const t = e.slice(e.lastIndexOf("[", e.length - 3)),
                n = e.slice(0, e.lastIndexOf("[", e.length - 3)),
                l = a.KEYCODE_DISPLAY_MAP[t];
              return void 0 === l
                ? e
                : this._fromModifierToDisplay(n, " + ") + l;
            },
            _createModalKeybindDiv() {
              const e = document.createElement("div");
              return e.classList.add("lol-settings-voice-ptt-modal-key"), e;
            },
            _createModalUnbindButton() {
              const e = document.createElement("button");
              return (
                e.classList.add(
                  "lol-settings-voice-keybind-dialog-unbind-button",
                ),
                (e.innerHTML = this.get(
                  "tra.voice_settings_push_to_talk_unbind",
                )),
                (e.onclick = this._unbindButtonClickHandler.bind(this)),
                e
              );
            },
            _unbindButtonClickHandler() {
              (this._tempSaveValue = "[<Unbound>]"),
                (this._unbindButton.disabled = !0),
                (this._keybindDiv.textContent = this.get(
                  "tra.voice_settings_push_to_talk_empty",
                )),
                this._pttModal.enableAcceptButton(),
                this._pttModal.domNode.focus();
            },
            _registerPttModal(e) {
              (this._pttModal = l.ModalManager.add({
                type: "DialogConfirm",
                data: {
                  contents: e,
                  acceptText: this.get("tra.voice_settings_push_to_talk_save"),
                  declineText: this.get(
                    "tra.voice_settings_push_to_talk_cancel",
                  ),
                },
                show: !0,
              })),
                this._pttModal.disableAcceptButton(),
                this._pttModal.acceptPromise.then(
                  this._acceptPttModal.bind(this),
                  this._cancelPttModal.bind(this),
                ),
                this._pttModal.domNode.setAttribute("tabindex", 0),
                this._pttModal.domNode.focus(),
                (this._pttModal.domNode.onkeydown =
                  this._pttModalKeyDownHandler.bind(this)),
                document.addEventListener(
                  "mousedown",
                  this._handleMouseKeySet.bind(this),
                );
            },
            _pttModalKeyDownHandler(e) {
              const t = this._fromKeyDownEventToSaved(e);
              t &&
                (e.preventDefault(),
                (this._tempSaveValue = t),
                (this._keybindDiv.textContent = this._fromSavedToDisplay(t)),
                (this._unbindButton.disabled = !1),
                this._pttModal.enableAcceptButton());
            },
            _fromKeyDownEventToSaved(e) {
              let t = null;
              return (
                (t = this._isWindows()
                  ? a.WIN_KEYCODE_SAVE_MAP[e.code]
                  : a.MAC_KEYCODE_SAVE_MAP[e.code]),
                t ? this._getModifiersPrefix(e) + t : null
              );
            },
            _getModifiersPrefix(e) {
              return (
                this._getMetaPrefix(e) +
                (e.shiftKey ? "[Shift]" : "") +
                (e.ctrlKey ? "[Ctrl]" : "") +
                (e.altKey ? "[Alt]" : "")
              );
            },
            _getMetaPrefix(e) {
              return e.metaKey ? (this._isWindows() ? "[Win]" : "[Cmd]") : "";
            },
            _handleMouseKeySet(e) {
              let t = e.button;
              if (e.button === s.WEB_EVENT_LEFT_MOUSE_BUTTON) {
                if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)) return;
                t = s.GAME_CLIENT_LEFT_MOUSE_BUTTON;
              } else
                e.button === s.WEB_EVENT_MIDDLE_MOUSE_BUTTON
                  ? (t = s.GAME_CLIENT_MIDDLE_MOUSE_BUTTON)
                  : e.button === s.WEB_EVENT_BROWSER_BACK_MOUSE_BUTTON
                    ? (t = s.GAME_CLIENT_BROWSER_BACK_MOUSE_BUTTON)
                    : e.button === s.WEB_EVENT_BROWSER_FORWARD_MOUSE_BUTTON &&
                      (t = s.GAME_CLIENT_BROWSER_FORWARD_MOUSE_BUTTON);
              const n = this._getModifiersPrefix(e) + "[Button " + t + "]";
              (this._tempSaveValue = n),
                (this._keybindDiv.textContent = this._fromSavedToDisplay(n)),
                (this._unbindButton.disabled = !1),
                this._pttModal.enableAcceptButton();
            },
            _acceptPttModal() {
              document.removeEventListener(
                "mousedown",
                this._handleMouseKeySet.bind(this),
              ),
                this._tempSaveValue &&
                  this.get("onChange") &&
                  this.get("onChange")(this._tempSaveValue);
            },
            _cancelPttModal() {
              document.removeEventListener(
                "mousedown",
                this._handleMouseKeySet.bind(this),
              );
            },
            actions: {
              openModal: function () {
                this._tempSaveValue = null;
                const e = this._getPttModalContent(this.get("key"));
                this._registerPttModal(e);
              },
            },
          });
        t.default = o;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.WIN_KEYCODE_SAVE_MAP =
            t.MAC_KEYCODE_SAVE_MAP =
            t.KEYCODE_DISPLAY_MAP =
              void 0);
        t.MAC_KEYCODE_SAVE_MAP = {
          Escape: "[Esc]",
          Digit1: "[1]",
          Digit2: "[2]",
          Digit3: "[3]",
          Digit4: "[4]",
          Digit5: "[5]",
          Digit6: "[6]",
          Digit7: "[7]",
          Digit8: "[8]",
          Digit9: "[9]",
          Digit0: "[0]",
          Minus: "[-]",
          Equal: "[=]",
          Backspace: "[Back]",
          Tab: "[Tab]",
          KeyQ: "[q]",
          KeyW: "[w]",
          KeyE: "[e]",
          KeyR: "[r]",
          KeyT: "[t]",
          KeyY: "[y]",
          KeyU: "[u]",
          KeyI: "[i]",
          KeyO: "[o]",
          KeyP: "[p]",
          BracketLeft: "[[]",
          BracketRight: "[]]",
          Enter: "[Return]",
          KeyA: "[a]",
          KeyS: "[s]",
          KeyD: "[d]",
          KeyF: "[f]",
          KeyG: "[g]",
          KeyH: "[h]",
          KeyJ: "[j]",
          KeyK: "[k]",
          KeyL: "[l]",
          Semicolon: "[Semicolon]",
          Quote: "[']",
          Backquote: "[`]",
          Backslash: "[Backslash]",
          KeyZ: "[z]",
          KeyX: "[x]",
          KeyC: "[c]",
          KeyV: "[v]",
          KeyB: "[b]",
          KeyN: "[n]",
          KeyM: "[m]",
          Comma: "[,]",
          Period: "[.]",
          Slash: "[/]",
          NumpadMultiply: "[*]",
          Space: "[Space]",
          CapsLock: "[CapsLock]",
          F1: "[F1]",
          F2: "[F2]",
          F3: "[F3]",
          F4: "[F4]",
          F5: "[F5]",
          F6: "[F6]",
          F7: "[F7]",
          F8: "[F8]",
          F9: "[F9]",
          F10: "[F10]",
          NumLock: "[NumLock]",
          Numpad7: "[Num7]",
          Numpad8: "[Num8]",
          Numpad9: "[Num9]",
          NumpadSubtract: "[Num-]",
          Numpad4: "[Num4]",
          Numpad5: "[Num5]",
          Numpad6: "[Num6]",
          NumpadAdd: "[Num+]",
          Numpad1: "[Num1]",
          Numpad2: "[Num2]",
          Numpad3: "[Num3]",
          Numpad0: "[Num0]",
          NumpadDecimal: "[Num.]",
          F11: "[F11]",
          F12: "[F12]",
          IntlYen: "[jYen]",
          NumpadEqual: "[Num=]",
          NumpadEnter: "[NumEnter]",
          AudioVolumeMute: "[Mute]",
          AudioVolumeDown: "[Vol-]",
          AudioVolumeUp: "[Vol+]",
          NumpadComma: "[Num,]",
          NumpadDivide: "[Num/]",
          Home: "[Home]",
          ArrowUp: "[Up Arrow]",
          PageUp: "[PgUp]",
          ArrowLeft: "[Left Arrow]",
          ArrowRight: "[Right Arrow]",
          End: "[End]",
          ArrowDown: "[Down Arrow]",
          PageDown: "[PgDn]",
          Delete: "[Del]",
        };
        t.WIN_KEYCODE_SAVE_MAP = {
          Escape: "[Esc]",
          Digit1: "[1]",
          Digit2: "[2]",
          Digit3: "[3]",
          Digit4: "[4]",
          Digit5: "[5]",
          Digit6: "[6]",
          Digit7: "[7]",
          Digit8: "[8]",
          Digit9: "[9]",
          Digit0: "[0]",
          Minus: "[-]",
          Equal: "[=]",
          Backspace: "[Back]",
          Tab: "[Tab]",
          KeyQ: "[q]",
          KeyW: "[w]",
          KeyE: "[e]",
          KeyR: "[r]",
          KeyT: "[t]",
          KeyY: "[y]",
          KeyU: "[u]",
          KeyI: "[i]",
          KeyO: "[o]",
          KeyP: "[p]",
          BracketLeft: "[[]",
          BracketRight: "[]]",
          Enter: "[Return]",
          KeyA: "[a]",
          KeyS: "[s]",
          KeyD: "[d]",
          KeyF: "[f]",
          KeyG: "[g]",
          KeyH: "[h]",
          KeyJ: "[j]",
          KeyK: "[k]",
          KeyL: "[l]",
          Semicolon: "[Semicolon]",
          Quote: "[']",
          Backquote: "[`]",
          Backslash: "[Backslash]",
          KeyZ: "[z]",
          KeyX: "[x]",
          KeyC: "[c]",
          KeyV: "[v]",
          KeyB: "[b]",
          KeyN: "[n]",
          KeyM: "[m]",
          Comma: "[,]",
          Period: "[.]",
          Slash: "[/]",
          NumpadMultiply: "[*]",
          Space: "[Space]",
          CapsLock: "[CapsLock]",
          F1: "[F1]",
          F2: "[F2]",
          F3: "[F3]",
          F4: "[F4]",
          F5: "[F5]",
          F6: "[F6]",
          F7: "[F7]",
          F8: "[F8]",
          F9: "[F9]",
          F10: "[F10]",
          NumLock: "[NumLock]",
          ScrollLock: "[ScrollLock]",
          Numpad7: "[Num7]",
          Numpad8: "[Num8]",
          Numpad9: "[Num9]",
          NumpadSubtract: "[Num-]",
          Numpad4: "[Num4]",
          Numpad5: "[Num5]",
          Numpad6: "[Num6]",
          NumpadAdd: "[Num+]",
          Numpad1: "[Num1]",
          Numpad2: "[Num2]",
          Numpad3: "[Num3]",
          Numpad0: "[Num0]",
          NumpadDecimal: "[Num.]",
          F11: "[F11]",
          F12: "[F12]",
          IntlYen: "[jYen]",
          NumpadEnter: "[NumEnter]",
          AudioVolumeMute: "[Mute]",
          AudioVolumeDown: "[Vol-]",
          AudioVolumeUp: "[Vol+]",
          NumpadDivide: "[Num/]",
          Home: "[Home]",
          ArrowUp: "[Up Arrow]",
          PageUp: "[PgUp]",
          ArrowLeft: "[Left Arrow]",
          ArrowRight: "[Right Arrow]",
          End: "[End]",
          ArrowDown: "[Down Arrow]",
          PageDown: "[PgDn]",
          Delete: "[Del]",
          OSLeft: "[L Win]",
          OSRight: "[R Win]",
        };
        t.KEYCODE_DISPLAY_MAP = {
          "[Esc]": "Esc",
          "[1]": "1",
          "[2]": "2",
          "[3]": "3",
          "[4]": "4",
          "[5]": "5",
          "[6]": "6",
          "[7]": "7",
          "[8]": "8",
          "[9]": "9",
          "[0]": "0",
          "[-]": "-",
          "[=]": "=",
          "[Back]": "Bk",
          "[Tab]": "Tab",
          "[TAB]": "Tab",
          "[q]": "Q",
          "[w]": "W",
          "[e]": "E",
          "[r]": "R",
          "[t]": "T",
          "[y]": "Y",
          "[u]": "U",
          "[i]": "I",
          "[o]": "O",
          "[p]": "P",
          "[[]": "[",
          "[]]": "]",
          "[Return]": "Rtn",
          "[a]": "A",
          "[s]": "S",
          "[d]": "D",
          "[f]": "F",
          "[g]": "G",
          "[h]": "H",
          "[j]": "J",
          "[k]": "K",
          "[l]": "L",
          "[Semicolon]": ";",
          "[']": "'",
          "[`]": "`",
          "[Backslash]": "Bkslash",
          "[z]": "Z",
          "[x]": "X",
          "[c]": "C",
          "[v]": "V",
          "[b]": "B",
          "[n]": "N",
          "[m]": "M",
          "[,]": ",",
          "[.]": ".",
          "[/]": "/",
          "[*]": "*",
          "[Space]": "Spce",
          "[CapsLock]": "CapsLk",
          "[F1]": "F1",
          "[F2]": "F2",
          "[F3]": "F3",
          "[F4]": "F4",
          "[F5]": "F5",
          "[F6]": "F6",
          "[F7]": "F7",
          "[F8]": "F8",
          "[F9]": "F9",
          "[F10]": "F10",
          "[NumLock]": "NumLk",
          "[ScrollLock]": "ScrollLk",
          "[Num7]": "Num7",
          "[Num8]": "Num8",
          "[Num9]": "Num9",
          "[Num-]": "Num-",
          "[Num4]": "Num4",
          "[Num5]": "Num5",
          "[Num6]": "Num6",
          "[Num+]": "Num+",
          "[Num1]": "Num1",
          "[Num2]": "Num2",
          "[Num3]": "Num3",
          "[Num0]": "Num0",
          "[Num.]": "Num.",
          "[F11]": "F11",
          "[F12]": "F12",
          "[jYen]": "jKana",
          "[Num=]": "Num=",
          "[NumEnter]": "NumEnter",
          "[Mute]": "Mute",
          "[Vol-]": "Vol-",
          "[Vol+]": "Vol+",
          "[Num,]": "Num,",
          "[Num/]": "Num/",
          "[Home]": "webHome",
          "[Up Arrow]": "Up",
          "[PgUp]": "PgUp",
          "[Left Arrow]": "Left",
          "[Right Arrow]": "Rght",
          "[End]": "End",
          "[Down Arrow]": "Down",
          "[PgDn]": "PgDn",
          "[Ins]": "Ins",
          "[Del]": "Del",
          "[L Win]": "Win",
          "[R Win]": "Win",
          "[Button 1]": "MB1",
          "[Button 2]": "MB2",
          "[Button 3]": "MB3",
          "[Button 4]": "MB4",
          "[Button 5]": "MB5",
          "[Button 6]": "MB6",
          "[Button 7]": "MB7",
          "[Button 8]": "MB8",
          "[<Unbound>]": "",
        };
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.WEB_EVENT_MIDDLE_MOUSE_BUTTON =
            t.WEB_EVENT_LEFT_MOUSE_BUTTON =
            t.WEB_EVENT_BROWSER_FORWARD_MOUSE_BUTTON =
            t.WEB_EVENT_BROWSER_BACK_MOUSE_BUTTON =
            t.GAME_CLIENT_MIDDLE_MOUSE_BUTTON =
            t.GAME_CLIENT_LEFT_MOUSE_BUTTON =
            t.GAME_CLIENT_BROWSER_FORWARD_MOUSE_BUTTON =
            t.GAME_CLIENT_BROWSER_BACK_MOUSE_BUTTON =
              void 0);
        t.WEB_EVENT_LEFT_MOUSE_BUTTON = 0;
        t.WEB_EVENT_MIDDLE_MOUSE_BUTTON = 1;
        t.WEB_EVENT_BROWSER_BACK_MOUSE_BUTTON = 3;
        t.WEB_EVENT_BROWSER_FORWARD_MOUSE_BUTTON = 4;
        t.GAME_CLIENT_LEFT_MOUSE_BUTTON = 1;
        t.GAME_CLIENT_MIDDLE_MOUSE_BUTTON = 3;
        t.GAME_CLIENT_BROWSER_BACK_MOUSE_BUTTON = 4;
        t.GAME_CLIENT_BROWSER_FORWARD_MOUSE_BUTTON = 5;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        n(91);
        var a = l.Ember.Component.extend({
          classNames: ["vng-publisher-settings"],
          honeyfruit: l.Ember.inject.service("honeyfruit"),
          isError: !1,
          isHidden: l.Ember.computed.not(
            "honeyfruit.vngPublisherSettings.isVisible",
          ),
          isLoading: !1,
          logger: l.Ember.inject.service("honeyfruit-logger"),
          isVngReady: !1,
          actions: {
            async handleButtonClick(e) {
              if ((e.preventDefault(), !this.get("isLoading"))) {
                this.set("isLoading", !0), this.set("isError", !1);
                try {
                  await this.get("honeyfruit").postVNGSettingsAction(),
                    this.set("isLoading", !1);
                } catch (e) {
                  this.get("logger").error(
                    `Error launching vng account settings ${e.message}`,
                  ),
                    this.set("isLoading", !1),
                    this.set("isError", !0);
                }
              }
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
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        n(93);
        var a = l.Ember.Component.extend({
          classNames: ["honeyfruit-settings__error"],
        });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        var a = l.SharedComponents.getDataBoundEmberService({
          dataBindingInstance: (0, l.dataBinding)("/lol-honeyfruit", l.socket),
          propertiesToBind: [
            {
              propertyName: "vngPublisherSettings",
              defaultValue: { isVisible: !1 },
              observedPath: "/v1/vng-publisher-settings",
            },
          ],
          serviceMethods: {
            postVNGSettingsAction: () =>
              (0, l.dataBinding)("/lol-honeyfruit", l.socket).post(
                "/v1/vng-publisher-settings",
              ),
          },
        });
        t.default = a;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l,
          a = n(1),
          s = (l = n(7)) && l.__esModule ? l : { default: l };
        const o = a.dataBinding.bindTo(a.socket);
        var i = a.Ember.Service.extend({
          isVisible: !1,
          currentCategory: null,
          currentGroups: [],
          rootElement: null,
          init() {
            this._super(...arguments),
              (this._registeredCategoryGroups = (0, s.default)());
          },
          willDestroy() {
            this._super(...arguments),
              o.unobserve("/lol-login/v1/session", this);
          },
          initialize(e, t) {
            (this.rootElement = e), (this._routeSupport = t);
            const n = {};
            return (
              (n.domNode = e),
              (n.show = !0),
              (this._modal = n),
              o.get("/lol-login/v1/session").then((e) => {
                this._onLoginStatusUpdate(e),
                  o.observe(
                    "/lol-login/v1/session",
                    this,
                    this._onLoginStatusUpdate.bind(this),
                  );
              })
            );
          },
          show(e) {
            a.ModalManager.add(this._modal),
              this.set("isVisible", !0),
              this._setDefaultDisplayCategory(e, !0);
          },
          close() {
            this.get("isVisible") &&
              (this.set("isVisible", !1),
              this._persistAccountSettings(),
              a.ModalManager.remove(this._modal),
              this._setDefaultDisplayCategory(null, !1));
          },
          _persistAccountSettings() {
            o.post("/lol-settings/v1/account/save")
              .then(() => {
                a.logger.trace("Persist account settings successful");
              })
              .catch((e) => {
                a.logger.error(
                  "Error happened when saving account settings: ",
                  e,
                );
              });
          },
          _getFlattenedCategories() {
            let e = [];
            return (
              a.lodash.forEach(this._registeredCategoryGroups, (t) => {
                e = a.lodash.concat(e, t.categories);
              }),
              e
            );
          },
          _setDefaultDisplayCategory(e, t) {
            const n = this._getFlattenedCategories();
            let l = null;
            Boolean(e) && (l = n.find((t) => t.name === e)),
              (l && l.isEnabled()) ||
                (l = a.lodash.find(n, (e) => e.isEnabled())),
              l && this.updateCurrentCategory(l, t);
          },
          updateCurrentCategory(e, t) {
            e &&
              (this.set("currentCategory", e),
              this._syncContainerElement(e, t));
          },
          _syncContainerElement(e, t) {
            this._routeSupport.syncToRoute(e.routeName, t);
          },
          _onLoginStatusUpdate(e) {
            a.lodash.isEqual(this._session, e) ||
              ((this._session = Object.assign({}, e)),
              this._updateCategoriesForLoginChange());
          },
          _updateCategoriesForLoginChange() {
            const e = Boolean(this._session && this._session.connected);
            this.set("currentCategory", null),
              a.lodash.forEach(this._registeredCategoryGroups, (t) => {
                a.lodash.forEach(t.categories, (t) => {
                  t.updateLoginStatus(e);
                });
              }),
              this._refreshCategoryGroups();
          },
          _refreshCategoryGroups() {
            const e = [];
            let t = [];
            this._registeredCategoryGroups.forEach((n) => {
              const l = n.categories.filter((e) => e.isEnabled());
              if (l.length > 0) {
                const a = {
                  titleKey: n.titleKey,
                  name: n.name,
                  capitalTitleKey: n.capitalTitleKey,
                };
                (a.categories = l), (t = t.concat(l)), e.push(a);
              }
            }),
              this.set("currentGroups", e),
              this.updateCurrentCategory(t[0], !0);
          },
        });
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        const a = l.dataBinding.bindTo(l.socket);
        var s = l.Ember.Service.extend({
          leagueClientVersion: null,
          gameClientVersion: null,
          checkingForPatchesEnabled: null,
          init() {
            a.observe("/lol-patch/v1/game-version", this, (e) => {
              e
                ? this.set("gameClientVersion", e)
                : this.set(
                    "gameClientVersion",
                    this.get("tra.lol_settings_version_game_client_pending"),
                  );
            }),
              a.observe("/lol-patch/v1/checking-enabled", this, (e) => {
                this.set("checkingForPatchesEnabled", e);
              });
          },
          getSupportedGameReleases: () =>
            a.get(
              "/lol-patch/v1/products/league_of_legends/supported-game-releases",
              { skipCache: !0 },
            ),
          putGamePatchUrl: (e) =>
            a.put(`/lol-patch/v1/game-patch-url?url=${e}`),
        });
        t.default = s;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = n(98),
          s = n(31);
        const { DEFAULT_PROFILE_PRIVACY: o } = s.PROFILE_PRIVACY,
          i = l.dataBinding.bindTo(l.socket),
          r = "/lol-summoner/v1/current-summoner/profile-privacy",
          c =
            "/lol-client-config/v3/client-config/lol.client_settings.full_repair_enabled",
          m =
            "/client-config/v2/config/lol.client_settings.vanguard.daysToReshowModal";
        var u = l.Ember.Service.extend({
          isLoggedIn: !1,
          regionLocale: null,
          settingsReady: !1,
          gameSettingsReady: !1,
          gameRepairEnabled: !1,
          loggedInPromise: null,
          regionLocalePromise: null,
          settingsReadyPromise: null,
          gameSettingsReadyPromise: null,
          vanguardSystemCheckModalEnabled: !1,
          settingsConfig: {
            isHotkeysEnabled: !1,
            isSoundEnabled: !1,
            isInterfaceEnabled: !1,
            isGameplayEnabled: !1,
            isReplaysEnabled: !1,
            isTermsEnabled: !1,
            isPrivacyNoticeEnabled: !1,
            isLegalStatementsEnabled: !1,
          },
          profilePrivacy: { ...o },
          init() {
            this._super(...arguments);
            let e = null;
            this.set(
              "loggedInPromise",
              new Promise((t) => {
                e = t;
              }),
            ),
              i.observe("/lol-login/v1/session", this, (t) => {
                this.set("isLoggedIn", t && t.connected), e();
              });
            let t = null;
            this.set(
              "regionLocalePromise",
              new Promise((e) => {
                t = e;
              }),
            ),
              i.observe("/riotclient/region-locale", this, (e) => {
                this.set("regionLocale", e), t();
              });
            let n = null;
            this.set(
              "settingsReadyPromise",
              new Promise((e) => {
                n = e;
              }),
            ),
              i.observe("/lol-settings/v2/ready", this, (e) => {
                e && (this.set("settingsReady", e), n());
              });
            let l = null;
            this.set(
              "gameSettingsReadyPromise",
              new Promise((e) => {
                l = e;
              }),
            ),
              i.observe("/lol-game-settings/v1/ready", this, (e) => {
                e && (this.set("gameSettingsReady", e), l());
              }),
              i.observe(c, (e) => {
                this.set("gameRepairEnabled", e && "false" !== e);
              }),
              i.observe(m, (e) => {
                this.set("vanguardSystemCheckModalEnabled", e > 0);
              }),
              i.observe(r, (e) => {
                this.set("profilePrivacy", e);
              }),
              i.observe("/lol-settings/v2/config", (e) => {
                this.set("settingsConfig", e);
              });
          },
          willDestroy() {
            i.unobserve("/lol-login/v1/session", this),
              i.unobserve("/riotclient/region-locale", this),
              i.unobserve("/lol-settings/v2/ready", this),
              i.unobserve("/lol-game-settings/v1/ready", this),
              i.unobserve(r, this),
              i.unobserve(c, this),
              i.unobserve(m, this);
          },
          _getEndpointUrl: (e, t, n) =>
            "local" === t
              ? `/lol-settings/v1/${t}/${n}`
              : `/lol-settings/v2/${t}/${e}/${n}`,
          getDefaultSettingPromise(e, t) {
            return this.getSettingPromise(a.DEFAULT_PP_KEY, e, t);
          },
          getSettingPromise(e, t, n) {
            return i.get(this._getEndpointUrl(e, t, n));
          },
          saveDefaultSetting(e, t, n, l) {
            return this.saveSetting(e, a.DEFAULT_PP_KEY, t, n, l);
          },
          saveSetting(e, t, n, a, s) {
            return (
              l.logger.trace(
                `save data ${e} with namespace ${a} and scope ${n} to ${t}`,
              ),
              i.patch(this._getEndpointUrl(t, n, a), {
                schemaVersion: s,
                data: e,
              })
            );
          },
          saveGameSettings(e) {
            this.saveSetting(
              e,
              "GamePreferences",
              "account",
              "game-settings",
              1,
            );
          },
          saveGameInputSettings(e) {
            this.saveSetting(
              e,
              "GamePreferences",
              "account",
              "input-settings",
              1,
            );
          },
          saveGameSettingsRemote(e) {
            i.patch("/lol-game-settings/v1/game-settings", e);
          },
          sendJSONTelemetryEvent(e, t = {}) {
            const n = Object.assign(t, { plugin: "rcp-fe-lol-settings" });
            for (const e in n)
              "string" != typeof n[e] && (n[e] = JSON.stringify(n[e]));
            i.post(`/telemetry/v1/events/${e}`, n);
          },
          setProfilePrivacy: (e) => i.put(r, e),
        });
        t.default = u;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.DEFAULT_PP_KEY = void 0),
          (t.isValidPPKey = function (e) {
            return l.has(e);
          });
        const n = "LCUPreferences";
        t.DEFAULT_PP_KEY = n;
        const l = new Set([
          n,
          "GamePreferences",
          "EsportsPreferences",
          "PerksPreferences",
        ]);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1);
        const a = "/lol-premade-voice",
          s = "/v1/capturedevices";
        var o = l.Ember.Service.extend({
          captureDevices: void 0,
          init() {
            this._super(...arguments),
              (0, l.dataBinding)(a, l.socket).observe(s, this, (e) => {
                this.set("captureDevices", e);
              });
          },
          isPushToTalkAvailable(e) {
            const t = e ? 1 : 0;
            return (0, l.dataBinding)(a, l.socket).post(
              "/v1/push-to-talk/check-available",
              t,
            );
          },
          willDestroy() {
            this._super(...arguments),
              (0, l.dataBinding)(a, l.socket).unobserve(s, this);
          },
        });
        t.default = o;
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "itHR9BqJ",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\application.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","lol-uikit-dialog-frame",[]],["static-attr","class","lol-settings-container"],["static-attr","orientation","bottom"],["static-attr","frame","bordered"],["flush-element"],["text","\\n  "],["append",["helper",["modal-header"],null,[["handleResetToDefaultButtonClick"],[["helper",["action"],[["get",[null]],"handleResetToDefaultButtonClick"],null]]]],false],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-content"],["flush-element"],["text","\\n    "],["open-element","settings-plugin-navigation-bar",[]],["static-attr","class","lol-settings-navs"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["static-attr","class","lol-settings-nav-scroller"],["flush-element"],["text","\\n        "],["open-element","div",[]],["flush-element"],["text","\\n"],["block",["each"],[["get",["currentGroups"]]],null,2],["text","        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-options"],["flush-element"],["text","\\n      "],["append",["unknown",["outlet"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["append",["unknown",["modal-footer"]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                "],["append",["helper",["navigation-bar-group-item"],null,[["category","goToSection"],[["get",["category"]],["helper",["action"],[["get",[null]],"goToSection"],null]]]],false],["text","\\n"]],"locals":["category"]},{"statements":[["block",["each"],[["get",["group","categories"]]],null,0]],"locals":[]},{"statements":[["block",["navigation-bar-group"],null,[["group","groupIdx"],[["get",["group"]],["get",["index"]]]],1]],"locals":["group","index"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "s259zr3j",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\index.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "tmiFYFdN",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\general.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\styles\\\\general.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n"],["block",["if"],[["get",["model","codeOfConductEnabled"]]],null,11],["text","\\n"],["block",["if"],[["get",["vanguardSystemCheckModalEnabled"]]],null,10],["text","\\n"],["block",["if"],[["get",["profilePrivacyEnabled"]]],null,9],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-general-row"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","potatoModeEnabled"],["flush-element"],["text","\\n      "],["append",["helper",["input"],null,[["slot","type","name","checked","disabled"],["input","checkbox","potatoModeEnabled",["helper",["mut"],[["get",["potatoModeEnabled"]]],null],["get",["potatoSettingDisabled"]]]]],false],["text","\\n      "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","potatoModeEnabled"],["flush-element"],["append",["unknown",["tra","ux_settings_enable_low_spec_mode"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["left"]],7],["text","  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-general-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-general-title"],["flush-element"],["append",["unknown",["tra","ux_settings_unload_in_game_resource_mode"]],false],["close-element"],["text","\\n    "],["open-element","lol-uikit-framed-dropdown",[]],["static-attr","class","lol-settings-general-dropdown"],["flush-element"],["text","\\n"],["block",["each"],[["get",["clientShutdownOptions"]]],null,6],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["isVngPublisherSettingsVisible"]]],null,4],["text","\\n"],["block",["if"],[["get",["accountVerificationEnabled"]]],null,3],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-general-row"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","uploadCrashReports"],["flush-element"],["text","\\n      "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","uploadCrashReports",["helper",["mut"],[["get",["uploadCrashReports"]]],null]]]],false],["text","\\n      "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","uploadCrashReports"],["flush-element"],["append",["unknown",["tra","lol_general_settings_label_auto_send_crash_reports"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["left"]],2],["text","  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-video-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-window-size-text"],["flush-element"],["append",["unknown",["tra","lol_general_settings_label_window_size"]],false],["close-element"],["text","\\n    "],["open-element","lol-uikit-framed-dropdown",[]],["static-attr","class","lol-settings-window-size-dropdown"],["flush-element"],["text","\\n"],["block",["each"],[["get",["computedSizeInfos"]]],null,1],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["gameRepairEnabled"]]],null,0],["text","\\n  "],["append",["helper",["publishing-locale"],null,[["publishingLocale","publishingContentConfig","selectPublishingLocale"],[["get",["publishingLocale"]],["get",["publishingContentConfig"]],["helper",["action"],[["get",[null]],"selectPublishingLocale"],null]]]],false],["text","\\n\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["unknown",["repair-game-button"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","scale",["unknown",["sizeInfo","scale"]],null],["dynamic-attr","selected",["unknown",["sizeInfo","selected"]],null],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"selectWindowSize",["get",["sizeInfo","scale"]]],null],null],["flush-element"],["text","\\n          "],["append",["unknown",["sizeInfo","text"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["sizeInfo"]},{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","notification"],["static-attr","class","general-settings-tooltip"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","lol_general_settings_tooltip_auto_send_crash_reports"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["account-verification"],null,[["accountVerificationConfig"],[["get",["accountVerificationConfig"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"handleHoneyfruitLinkingOpened"],null],null],["flush-element"],["text","\\n      "],["append",["unknown",["vng-publisher-settings"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","            "],["open-element","lol-uikit-content-block",[]],["static-attr","type","notification"],["static-attr","class","general-settings-tooltip"],["flush-element"],["text","\\n              "],["open-element","p",[]],["flush-element"],["append",["unknown",["shutdownOption","tooltip"]],false],["close-element"],["text","\\n            "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"selectClientShutdown",["get",["shutdownOption","value"]]],null],null],["dynamic-attr","selected",["unknown",["shutdownOption","selected"]],null],["flush-element"],["text","\\n          "],["append",["unknown",["shutdownOption","text"]],false],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["left"]],5],["text","        "],["close-element"],["text","\\n"]],"locals":["shutdownOption"]},{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","notification"],["static-attr","class","general-settings-tooltip"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","ux_settings_enable_low_spec_mode_tooltip"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","type","notification"],["static-attr","class","general-settings-tooltip"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","ux_settings_enable_private_profile_tooltip"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","lol-settings-general-row"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","isProfilePrivate"],["flush-element"],["text","\\n      "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","isProfilePrivate",["helper",["mut"],[["get",["isProfilePrivate"]]],null]]]],false],["text","\\n      "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","isProfilePrivate"],["flush-element"],["append",["unknown",["tra","ux_settings_enable_private_profile"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition"],["left"]],8],["text","  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-settings-general-row"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-general-title"],["flush-element"],["append",["unknown",["tra","lol_account_vanguard_system_check_button_title"]],false],["close-element"],["text","\\n      "],["open-element","lol-uikit-flat-button-secondary",[]],["static-attr","class","lol-settings-vanguard-system-check-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"openVanguardSystemCheckModal"],null],null],["flush-element"],["text","\\n          "],["append",["unknown",["tra","lol_account_vanguard_system_check_button_label"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-settings-general-row"],["flush-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","lol-settings-window-size-text"],["flush-element"],["append",["unknown",["tra","lol_general_settings_league_code_of_conduct_label"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["static-attr","class","lol-settings-code-of-conduct-link lol-settings-window-size-text"],["flush-element"],["append",["helper",["sanitize"],[["get",["tra","lol_general_settings_league_code_of_conduct_link"]]],null],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "uPRyVPVe",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\notifications.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\styles\\\\notifications.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-notifications-row"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","disableEsportsNotifications"],["flush-element"],["text","\\n    "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","disableEsportsNotifications",["helper",["mut"],[["get",["disableEsportsNotifications"]]],null]]]],false],["text","\\n    "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","disableEsportsNotifications"],["static-attr","class","lol-settings-notifications-label"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","lol_notification_settings_label_disable_esports_notifications"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-notifications-row"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","blockNonFriendGameInvites"],["flush-element"],["text","\\n    "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","blockNonFriendGameInvites",["helper",["mut"],[["get",["blockNonFriendGameInvites"]]],null]]]],false],["text","\\n    "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","blockNonFriendGameInvites"],["static-attr","class","lol-settings-notifications-label"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","lol_notification_settings_label_block_non_friend_game_invites"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-notifications-row"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","disableCollectionsNotifications"],["flush-element"],["text","\\n    "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","disableCollectionsNotifications",["helper",["mut"],[["get",["disableCollectionsNotifications"]]],null]]]],false],["text","\\n    "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","disableCollectionsNotifications"],["static-attr","class","lol-settings-notifications-label"],["flush-element"],["text","\\n      "],["append",["helper",["sanitize"],[["get",["tra","lol_notification_settings_label_disable_collections_notifications$html"]]],null],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "cQsvABtz",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\chat.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\styles\\\\chat.styl\\" js-path=\\"null\\" "],["text","\\n"],["block",["unless"],[["get",["hideChatFilterToggle"]]],null,2],["open-element","div",[]],["static-attr","class","lol-settings-chat-row"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","linkClickWarningEnabled"],["flush-element"],["text","\\n    "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","linkClickWarningEnabled",["helper",["mut"],[["get",["linkClickWarningEnabled"]]],null]]]],false],["text","\\n    "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","linkClickWarningEnabled"],["static-attr","class","lol-settings-chat-label"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","lol_general_settings_label_enable_link_click_warning"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["block",["unless"],[["get",["hideMoreUnreadsToggle"]]],null,1],["block",["unless"],[["get",["hideFriendRequestToastsToggle"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","lol-settings-chat-row"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","friendRequestToastsDisabled"],["flush-element"],["text","\\n      "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","friendRequestToastsDisabled",["helper",["mut"],[["get",["friendRequestToastsDisabled"]]],null]]]],false],["text","\\n      "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","friendRequestToastsDisabled"],["static-attr","class","lol-settings-chat-label"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","lol_chat_settings_label_enable_friend_request_toasts"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","lol-settings-chat-row"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","moreUnreadsEnabled"],["flush-element"],["text","\\n      "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","moreUnreadsEnabled",["helper",["mut"],[["get",["moreUnreadsEnabled"]]],null]]]],false],["text","\\n      "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","moreUnreadsEnabled"],["static-attr","class","lol-settings-chat-label"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","lol_chat_settings_label_enable_more_unreads"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","lol-settings-chat-row-top"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","negatedChatFilter"],["flush-element"],["text","\\n      "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","negatedChatFilter",["helper",["mut"],[["get",["negatedChatFilter"]]],null]]]],false],["text","\\n      "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","negatedChatFilter"],["static-attr","class","lol-settings-chat-label"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","lol_chat_settings_label_enable_language_filter"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "tFv72Cxm",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\sound.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\styles\\\\sound.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["flush-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-sound-row"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","masterSoundEnabled"],["flush-element"],["text","\\n      "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","masterSoundEnabled",["helper",["mut"],[["get",["masterSoundEnabled"]]],null]]]],false],["text","\\n      "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","masterSoundEnabled"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","lol_settings_sound_enable_master_label"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-sound-title"],["static-attr","for","masterVolume"],["flush-element"],["append",["unknown",["masterVolumeLabel"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-sound-row-slider"],["flush-element"],["text","\\n    "],["append",["helper",["settings-slider"],null,[["property","value","percentage","showTooltip","disabled","handleOnSlideEnd"],["masterVolume",["get",["masterVolume"]],true,true,["get",["soundDisabled"]],["helper",["action"],[["get",[null]],"onSliderSlideEnd"],null]]]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-sound-subsections"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-sound-row"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","sfxEnabled"],["flush-element"],["text","\\n        "],["append",["helper",["input"],null,[["slot","type","name","checked","disabled"],["input","checkbox","sfxEnabled",["helper",["mut"],[["get",["sfxEnabled"]]],null],["get",["soundDisabled"]]]]],false],["text","\\n        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","sfxEnabled"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","lol_settings_sound_enable_sfx_label"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-sound-subsection"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-sound-title"],["static-attr","for","sfxVolume"],["flush-element"],["append",["unknown",["sfxVolumeLabel"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-sound-subsection-row-slider"],["flush-element"],["text","\\n        "],["append",["helper",["settings-slider"],null,[["property","value","percentage","showTooltip","disabled","handleOnSlideEnd"],["sfxVolume",["get",["sfxVolume"]],true,true,["get",["sfxDisabled"]],["helper",["action"],[["get",[null]],"onSliderSlideEnd"],null]]]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-sound-subsection-row"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","ambientSfxEnabled"],["flush-element"],["text","\\n           "],["append",["helper",["input"],null,[["slot","type","name","checked","disabled"],["input","checkbox","ambientSfxEnabled",["helper",["mut"],[["get",["ambientSfxEnabled"]]],null],["get",["sfxDisabled"]]]]],false],["text","\\n          "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","ambientSfxEnabled"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","lol_settings_sound_enable_ambient_sound_label"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-sound-subsection-row"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","pickChampVoEnabled"],["flush-element"],["text","\\n          "],["append",["helper",["input"],null,[["slot","type","name","checked","disabled"],["input","checkbox","pickChampVoEnabled",["helper",["mut"],[["get",["pickChampVoEnabled"]]],null],["get",["sfxDisabled"]]]]],false],["text","\\n          "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","pickChampVoEnabled"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","lol_settings_sound_enable_pick_quote_label"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-sound-subsection-row"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","banChampVoEnabled"],["flush-element"],["text","\\n          "],["append",["helper",["input"],null,[["slot","type","name","checked","disabled"],["input","checkbox","banChampVoEnabled",["helper",["mut"],[["get",["banChampVoEnabled"]]],null],["get",["sfxDisabled"]]]]],false],["text","\\n          "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","banChampVoEnabled"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","lol_settings_sound_enable_ban_quote_label"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-sound-row"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","musicEnabled"],["flush-element"],["text","\\n        "],["append",["helper",["input"],null,[["slot","type","name","checked","disabled"],["input","checkbox","musicEnabled",["helper",["mut"],[["get",["musicEnabled"]]],null],["get",["soundDisabled"]]]]],false],["text","\\n        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","musicEnabled"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","lol_settings_sound_enable_music_label"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-sound-subsection"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-sound-title"],["static-attr","for","musicVolume"],["flush-element"],["append",["unknown",["musicVolumeLabel"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-sound-subsection-row-slider"],["flush-element"],["text","\\n        "],["append",["helper",["settings-slider"],null,[["property","value","percentage","showTooltip","disabled","handleOnSlideEnd"],["musicVolume",["get",["musicVolume"]],true,true,["get",["musicDisabled"]],["helper",["action"],[["get",[null]],"onSliderSlideEnd"],null]]]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-sound-subsection-row"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","championSelectionMusicEnabled"],["flush-element"],["text","\\n          "],["append",["helper",["input"],null,[["slot","type","name","checked","disabled"],["input","checkbox","championSelectionMusicEnabled",["helper",["mut"],[["get",["championSelectionMusicEnabled"]]],null],["get",["musicDisabled"]]]]],false],["text","\\n          "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","championSelectionMusicEnabled"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","lol_settings_sound_enable_champion_selection_music_label"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-sound-subsection-row"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","ambienceMusicEnabled"],["flush-element"],["text","\\n          "],["append",["helper",["input"],null,[["slot","type","name","checked","disabled"],["input","checkbox","ambienceMusicEnabled",["helper",["mut"],[["get",["ambienceMusicEnabled"]]],null],["get",["musicDisabled"]]]]],false],["text","\\n          "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","ambienceMusicEnabled"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","lol_settings_sound_enable_ambience_music_label"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-sound-subsection-row"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","for","loginMusicEnabled"],["flush-element"],["text","\\n          "],["append",["helper",["input"],null,[["slot","type","name","checked","disabled"],["input","checkbox","loginMusicEnabled",["helper",["mut"],[["get",["loginMusicEnabled"]]],null],["get",["musicDisabled"]]]]],false],["text","\\n          "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","loginMusicEnabled"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","lol_settings_sound_enable_login_music_label"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "Nu25Q8aL",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\voice.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\styles\\\\voice.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-voice-party-join"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-voice-section-title"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","voice_settings_party_join_title"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-voice-row"],["static-attr","for","autoJoin"],["flush-element"],["text","\\n      "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","autoJoin",["helper",["mut"],[["get",["autoJoin"]]],null]]]],false],["text","\\n      "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","autoJoin"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","voice_settings_party_auto_join"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-voice-row"],["static-attr","for","muteOnConnect"],["flush-element"],["text","\\n      "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","muteOnConnect",["helper",["mut"],[["get",["muteOnConnect"]]],null]]]],false],["text","\\n      "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","muteOnConnect"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["text","\\n        "],["append",["unknown",["tra","voice_settings_party_connect_mute"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-voice-input"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-voice-section-title"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","voice_settings_input_title"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-voice-row input-mode-row"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-voice-input-device-section"],["flush-element"],["text","\\n        "],["open-element","div",[]],["static-attr","class","lol-settings-voice-input-device-label"],["flush-element"],["text","\\n          "],["append",["unknown",["tra","voice_settings_input_device_label"]],false],["text","\\n        "],["close-element"],["text","\\n        "],["open-element","lol-uikit-framed-dropdown",[]],["flush-element"],["text","\\n"],["block",["each"],[["get",["captureDevices"]]],null,4],["text","        "],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-parties-mic-test-button",[]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-voice-row"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-voice-input-volume-label"],["flush-element"],["text","\\n        "],["append",["unknown",["inputVolumeLabel"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-input-volume-slider"],["flush-element"],["text","\\n        "],["append",["helper",["settings-slider"],null,[["property","value","percentage","showTooltip","clickset","handleOnChange"],["inputVolume",["get",["inputVolume"]],true,true,true,["helper",["action"],[["get",[null]],"onSliderChange"],null]]]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","hr",[]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-voice-input-mode"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-voice-section-title"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","voice_settings_input_mode_title"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","lol-uikit-radio-input",[]],["flush-element"],["text","\\n"],["block",["each"],[["get",["inputModes"]]],null,3],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isInputModeVoice"]]],null,2,1],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-settings-voice-push-to-talk"],["flush-element"],["text","\\n      "],["append",["helper",["push-to-talk-key"],null,[["key","onChange"],[["get",["pushToTalkKey"]],["helper",["action"],[["get",[null]],"selectPushToTalkKey"],null]]]],false],["text","\\n    "],["close-element"],["text","\\n  "]],"locals":[]},{"statements":[["block",["if"],[["get",["isInputModePushToTalk"]]],null,0]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-settings-voice-sensitivity"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-voice-sensitivity-label"],["flush-element"],["text","\\n        "],["append",["unknown",["inputModeVoiceSensitivityLabel"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","voice-sensitivity-slider-wrapper"],["flush-element"],["text","\\n        "],["append",["helper",["settings-slider"],null,[["property","value","percentage","showTooltip","clickset","handleOnChange"],["vadSensitivity",["get",["vadSensitivity"]],true,true,true,["helper",["action"],[["get",[null]],"onSliderChange"],null]]]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-radio-input-option",[]],["static-attr","class","lol-settings-voice-input-mode-option"],["dynamic-attr","selected",["unknown",["inputMode","selected"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectInputMode",["get",["inputMode","name"]]],null],null],["flush-element"],["text","\\n          "],["append",["unknown",["inputMode","label"]],false],["text","\\n        "],["close-element"],["text","\\n"]],"locals":["inputMode"]},{"statements":[["text","            "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","selected",["unknown",["deviceInfo","selected"]],null],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"selectCaptureDevice",["get",["deviceInfo","handle"]]],null],null],["flush-element"],["text","\\n              "],["append",["unknown",["deviceInfo","name"]],false],["text","\\n            "],["close-element"],["text","\\n"]],"locals":["deviceInfo"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "uJcyHfEO",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\block-list.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-blocked-summoners"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","block-summoner-text"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","blocked_players_block_text"]],false],["text","\\n  "],["close-element"],["text","\\n\\n  "],["append",["helper",["player-name-input"],null,[["enableSubmitButton","submitButtonText","disabled","enterKeyPressHandler","validationHandler","successHandler","errorHandler"],[true,["get",["tra","blocked_summoners_block_button"]],["get",["working"]],["helper",["action"],[["get",[null]],"enterKeyPressHandler"],null],["helper",["action"],[["get",[null]],"validationHandler"],null],["helper",["action"],[["get",[null]],"successHandler"],null],["helper",["action"],[["get",[null]],"errorHandler"],null]]]],false],["text","\\n\\n"],["block",["if"],[["get",["blockedPlayers","length"]]],null,2,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","no-blocked-summoners"],["flush-element"],["append",["unknown",["tra","blocked_summoners_empty"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["append",["helper",["blocked-player"],null,[["player","unblock"],[["get",["summoner"]],["helper",["action"],[["get",[null]],"unblock"],null]]]],false],["text","\\n"]],"locals":["summoner"]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","blocked-summoners-info"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","lol_block_list_settings_label_blocked_players"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","blocked-summoners-list"],["flush-element"],["text","\\n"],["block",["each"],[["get",["blockedPlayers"]]],[["key"],["summonerId"]],1],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "PtB7/0jW",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\game-hotkeys.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\styles\\\\game-hotkeys.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n\\n"],["append",["helper",["game-hotkeys-content"],null,[["inputSettings","inputSettingsSchema","gameSettingsRemote","gameSettingsSchema","handleComponentInitialized"],[["get",["inputSettings"]],["get",["inputSettingsSchema"]],["get",["gameSettingsRemote"]],["get",["gameSettingsSchema"]],["helper",["action"],[["get",[null]],"handleComponentInitialized"],null]]]],false],["text","\\n\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "cwE+Wwl7",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\game-sound.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\styles\\\\game-sound.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n\\n  "],["append",["helper",["game-sound-content"],null,[["gameSettings","gameSettingsSchema","handleComponentInitialized"],[["get",["gameSettings"]],["get",["gameSettingsSchema"]],["helper",["action"],[["get",[null]],"handleComponentInitialized"],null]]]],false],["text","\\n\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "ZqEGDJ17",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\game-interface.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\styles\\\\game-interface.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n\\n  "],["append",["helper",["game-interface-content"],null,[["gameSettings","gameSettingsSchema","handleComponentInitialized"],[["get",["gameSettings"]],["get",["gameSettingsSchema"]],["helper",["action"],[["get",[null]],"handleComponentInitialized"],null]]]],false],["text","\\n\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "ztkB8jcY",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\game-gameplay.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\styles\\\\game-gameplay.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n\\n  "],["append",["helper",["game-gameplay-content"],null,[["gameSettings","gameSettingsSchema","handleComponentInitialized"],[["get",["gameSettings"]],["get",["gameSettingsSchema"]],["helper",["action"],[["get",[null]],"handleComponentInitialized"],null]]]],false],["text","\\n\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "rqf3nwSu",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\replays.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\styles\\\\replays.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","replays-settings-root-title"],["flush-element"],["append",["unknown",["tra","label_replays_folder_locations_title"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","replays-settings-root-description"],["flush-element"],["append",["unknown",["tra","label_replays_folder_locations_description"]],false],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","replays-settings-folder-path-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","replays-settings-folder-path-title"],["flush-element"],["append",["unknown",["tra","label_replays_folder_path"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","replays-settings-folder-path-row"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","replays-settings-folder-path-value"],["flush-element"],["append",["unknown",["replaysPath"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","replays-settings-folder-path-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"changeReplaysFolderPath"],null],null],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","replays-settings-folder-path-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","replays-settings-folder-path-title"],["flush-element"],["append",["unknown",["tra","label_highlights_folder_path"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","replays-settings-folder-path-row"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","replays-settings-folder-path-value"],["flush-element"],["append",["unknown",["highlightsPath"]],false],["close-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","replays-settings-folder-path-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"changeHighlightsFolderPath"],null],null],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","replays-settings-hints-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","replays-settings-hints-title"],["flush-element"],["append",["unknown",["tra","label_hints_title"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","replays-settings-hints-description"],["flush-element"],["append",["unknown",["tra","label_hints_description"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "jnVnoSkY",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\privacy-notice.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","class","license-agreement-settings"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","license-agreement-settings-title"],["flush-element"],["append",["unknown",["tra","license_agreement_title_privacy_notice"]],false],["close-element"],["text","\\n  "],["open-element","hr",[]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","license-agreement-settings-content"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"handleUrlClick"],null],null],["flush-element"],["append",["helper",["sanitize"],[["get",["privacyPolicyText"]]],null],false],["close-element"],["text","\\n\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "W2BafUYC",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\terms-of-use.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","class","license-agreement-settings"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","license-agreement-settings-title"],["flush-element"],["append",["unknown",["tra","license_agreement_title_tou"]],false],["close-element"],["text","\\n  "],["open-element","hr",[]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","license-agreement-settings-content"],["flush-element"],["append",["unknown",["licenseAgreementText"]],false],["close-element"],["text","\\n\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "ZLqXbf0J",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\thirdparty-licenses.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","class","lol-settings-license"],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","license_title"]],false],["append",["unknown",["versionInfo","version"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","subtitle"],["flush-element"],["append",["unknown",["tra","third_party_software"]],false],["close-element"],["text","\\n  "],["open-element","hr",[]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","license-text-content"],["flush-element"],["text","\\n    "],["append",["unknown",["licenseText"]],false],["text","\\n  "],["close-element"],["text","\\n\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "F5KKnMSf",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\loading.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","style","display: flex; align-items: center; height: 100%;"],["flush-element"],["text","\\n  "],["append",["helper",["uikit-spinner"],null,[["style"],["margin-left: auto; margin-right: auto;"]]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "FfhjmHpT",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\version.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\styles\\\\version.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-version"],["flush-element"],["text","\\n\\t"],["open-element","div",[]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"onGameClientVersionClick"],null],null],["flush-element"],["text","\\n\\t\\t"],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["text","\\n\\t\\t\\t"],["append",["unknown",["tra","lol_settings_version_game_client"]],false],["text","\\n\\t\\t"],["close-element"],["text"," \\n\\t\\t"],["open-element","div",[]],["static-attr","class","subtitle"],["flush-element"],["text","\\n\\t\\t\\t"],["append",["unknown",["gameClientVersion"]],false],["text","\\n\\t\\t"],["close-element"],["text","\\n\\t"],["close-element"],["text","\\n"],["block",["if"],[["get",["supportedGameReleasesEnabled"]]],null,2],["text","\\t"],["open-element","hr",[]],["flush-element"],["close-element"],["text","\\n\\t"],["open-element","div",[]],["flush-element"],["text"," \\n\\t\\t"],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["text","\\n\\t\\t\\t"],["append",["unknown",["tra","lol_settings_version_league_client"]],false],["text","\\n\\t\\t"],["close-element"],["text","\\n\\n\\t\\t"],["open-element","div",[]],["static-attr","class","subtitle"],["flush-element"],["text","\\n\\t\\t\\t"],["append",["unknown",["leagueClientVersion"]],false],["text","\\n\\t\\t"],["close-element"],["text","\\n\\t"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","\\t\\t\\t"],["open-element","p",[]],["static-attr","class","error-box"],["flush-element"],["text","\\n\\t\\t\\t\\t"],["open-element","div",[]],["static-attr","class","lol-settings-icon-red-x-mark"],["flush-element"],["close-element"],["text","\\n\\t\\t\\t\\t"],["append",["unknown",["tra","lol_settings_version_game_client_patching_disabled"]],false],["text","\\n\\t\\t\\t"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","\\t\\t\\t\\t"],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"selectRelease",["get",["release"]]],null],null],["dynamic-attr","selected",["unknown",["release","selected"]],null],["flush-element"],["text","\\n\\t\\t\\t\\t\\t"],["append",["unknown",["release","artifact_id"]],false],["text","\\n\\t\\t\\t\\t"],["close-element"],["text","\\n"]],"locals":["release"]},{"statements":[["text","\\t\\t"],["open-element","lol-uikit-flat-input",[]],["static-attr","class","text-filter"],["flush-element"],["text","\\n\\t\\t\\t"],["append",["helper",["input"],null,[["type","class","value","input","placeholder"],["search","filter-input",["get",["supportedGameReleaseSearchTerm"]],["helper",["action"],[["get",[null]],"onSearch"],null],"Filter Supported Versions"]]],false],["text","\\n\\t\\t"],["close-element"],["text","\\n\\t\\t"],["open-element","lol-uikit-framed-dropdown",[]],["static-attr","class","dropdown"],["flush-element"],["text","\\n"],["block",["each"],[["get",["filteredSupportedGameReleases"]]],null,1],["text","\\t\\t"],["close-element"],["text","\\n"],["block",["if"],[["get",["checkingForPatchesDisabled"]]],null,0],["text","\\t\\t"],["open-element","p",[]],["static-attr","class","warning"],["flush-element"],["append",["unknown",["gamePatchWarning"]],false],["close-element"],["text","\\n\\n\\t\\t"],["open-element","lol-uikit-flat-button-group",[]],["static-attr","class","button-group"],["static-attr","type","dialog-frame"],["flush-element"],["text","\\n\\t\\t\\t"],["open-element","lol-uikit-flat-button",[]],["static-attr","class","button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"startPatchingRelease"],null],null],["dynamic-attr","disabled",["unknown",["checkingForPatchesDisabled"]],null],["flush-element"],["text","\\n\\t\\t\\t\\t"],["append",["unknown",["tra","lol_settings_version_game_client_start_patching"]],false],["text","\\n\\t\\t\\t"],["close-element"],["text","\\n\\t\\t\\t"],["open-element","lol-uikit-flat-button",[]],["static-attr","class","button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"refreshReleases"],null],null],["flush-element"],["text","\\n\\t\\t\\t\\t"],["append",["unknown",["tra","lol_settings_version_game_client_start_refresh"]],false],["text","\\n\\t\\t\\t"],["close-element"],["text","\\n\\t\\t"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "sayWDjw5",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\legal-statements.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\styles\\\\legal-statements.styl\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-legal-statements"],["flush-element"],["text","\\n"],["block",["if"],[["get",["jpLegalStatementsRequired"]]],null,1,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","div",[]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","title"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","lol_settings_legal_statements_no_additional"]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","title"],["dynamic-attr","lang",["unknown",["tra","lol_settings_legal_statements_lang"]],null],["flush-element"],["text","\\n      "],["append",["unknown",["tra","lol_settings_legal_statements_payment_check"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","subtitle lol-settings-legal-statements-link"],["flush-element"],["text","\\n      "],["append",["helper",["sanitize"],[["get",["tra","lol_settings_legal_statements_payment_check_link"]]],null],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","hr",[]],["flush-element"],["close-element"],["text","\\n  "],["open-element","div",[]],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","title"],["dynamic-attr","lang",["unknown",["tra","lol_settings_legal_statements_lang"]],null],["flush-element"],["text","\\n      "],["append",["unknown",["tra","lol_settings_legal_statements_commercial_transactions"]],false],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","subtitle lol-settings-legal-statements-link"],["flush-element"],["text","\\n      "],["append",["helper",["sanitize"],[["get",["tra","lol_settings_legal_statements_commercial_transactions_link"]]],null],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "Z528aXkf",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\modal-header.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\modal-header.js\\" "],["text","\\n"],["open-element","settings-plugin-header",[]],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-title-bar"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-title"],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","lol-settings-header-group-name"],["flush-element"],["append",["unknown",["groupName"]],false],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","lol-settings-title-break"],["flush-element"],["text","/"],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","lol-settings-title-current"],["flush-element"],["append",["unknown",["categoryName"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["canReset"]]],null,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-flat-button-secondary",[]],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"showResetConfirmDialog"],null],null],["static-attr","class","lol-settings-reset-button"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","lol_settings_restore_default_button"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "6yTkhnmB",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\modal-footer.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\modal-footer.js\\" "],["text","\\n"],["open-element","lol-uikit-flat-button-group",[]],["static-attr","type","window-popup"],["static-attr","class","lol-settings-close-container"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-flat-button",[]],["static-attr","class","lol-settings-close-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"closeButtonClick"],null],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","settings_done_button"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "kLIcsCkT",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\navigation-bar-group.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\navigation-bar-group.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-nav-title"],["flush-element"],["append",["unknown",["groupName"]],false],["close-element"],["text","\\n"],["open-element","lol-uikit-navigation-bar",[]],["static-attr","direction","down"],["static-attr","type","tabbed"],["dynamic-attr","selectedindex",["unknown",["selectedIndex"]],null],["flush-element"],["text","\\n  "],["yield","default"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "IIxZFLoM",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\navigation-bar-group-item.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\navigation-bar-group-item.js\\" "],["text","\\n"],["block",["unless"],[["get",["isDisabled"]]],null,0]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["open-element","lol-uikit-navigation-item",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectItem",["get",["category"]]],null],null],["static-attr","class","lol-settings-nav"],["dynamic-attr","name",["unknown",["category","name"]],null],["flush-element"],["text","\\n    "],["open-element","div",[]],["flush-element"],["append",["unknown",["categoryTitleKeyTra"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "pfQpPNuL",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\blocked-player.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\blocked-player.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-block-list-player"],["modifier",["action"],[["get",[null]],"remove",["get",["player","id"]]]],["flush-element"],["text","\\n  "],["open-element","lol-social-avatar",[]],["static-attr","class","icon"],["static-attr","hideindicator",""],["static-attr","disabled",""],["flush-element"],["close-element"],["text","\\n"],["block",["if"],[["get",["shouldDisplayRiotId"]]],null,3,2],["block",["if"],[["get",["unblocking"]]],null,1,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","blocked-player-unblock-button"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["append",["helper",["uikit-spinner"],null,[["width","height"],["20px","20px"]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","span",[]],["static-attr","class","blocked-player-game-name"],["flush-element"],["text","\\n      "],["append",["unknown",["summonerName"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","span",[]],["static-attr","class","blocked-player-game-name"],["flush-element"],["text","\\n      "],["append",["helper",["player-name"],null,[["format","gameName","tagLine"],["short",["get",["gameName"]],["get",["gameTag"]]]]],false],["text","\\n      "],["open-element","span",[]],["static-attr","class","blocked-player-game-name-tagline"],["flush-element"],["text","\\n        "],["append",["helper",["player-name"],null,[["format","gameName","tagLine"],["full",["get",["gameName"]],["get",["gameTag"]]]]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "FcZO+V9j",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\block-list-error.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\block-list-error.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["static-attr","class",""],["static-attr","type","tooltip-small"],["static-attr","style","width: 200px; white-space: normal;"],["flush-element"],["text","\\n"],["block",["if"],[["get",["_errorPacketLocal"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","h6",[]],["flush-element"],["append",["unknown",["_errorPacketLocal","title"]],false],["close-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["append",["unknown",["_errorPacketLocal","text"]],false],["close-element"],["text","    \\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "iGEcZQJZ",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\repair-game-button.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\repair-game-button.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-repair-title"],["flush-element"],["append",["unknown",["tra","lol_general_settings_troubleshooting_title"]],false],["close-element"],["text","\\n"],["open-element","lol-uikit-flat-button-secondary",[]],["static-attr","class","lol-settings-repair-button"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"initiateRepairClick"],null],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","lol_general_settings_button_init_game_repair"]],false],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "/mea+UAa",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\publishing-locale.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\publishing-locale.js\\" "],["text","\\n"],["block",["if"],[["get",["showDropdown"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","value",["unknown",["option","value"]],null],["dynamic-attr","selected",["unknown",["option","selected"]],null],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"onPublishingLocaleSelected",["get",["option","value"]]],null],null],["flush-element"],["text","\\n        "],["append",["unknown",["option","label"]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":["option"]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","lol-publishing-locale-preference-label"],["flush-element"],["append",["unknown",["tra","lol_publishing_locale_settings_dropdown_label"]],false],["close-element"],["text","\\n  "],["open-element","lol-uikit-framed-dropdown",[]],["static-attr","class","lol-publishing-locale-preference-dropdown"],["flush-element"],["text","\\n"],["block",["each"],[["get",["dropdownOptions"]]],null,0],["text","  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "KK1dgG4m",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\account-verification.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\account-verification.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-account-verification-row"],["flush-element"],["text","\\n\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-account-verification-title"],["flush-element"],["append",["unknown",["tra","lol_account_verification_settings_acc_ver_title"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-account-verification-icon-mobile"],["flush-element"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["isVerified"]]],null,4],["block",["unless"],[["get",["isVerified"]]],null,3],["text","\\n"],["block",["unless"],[["get",["isVerified"]]],null,2],["text","\\n"],["block",["if"],[["get",["isVerified"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-flat-button-secondary",[]],["static-attr","class","lol-settings-account-verification-button-change"],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"showRemoveProcess"],null],null],["flush-element"],["text","\\n      "],["append",["unknown",["tra","lol_account_verification_settings_button_sms_change"]],false],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","notification"],["static-attr","class","acc-ver-verify-tooltip"],["flush-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","lol_account_verification_settings_button_sms_verify_tooltip"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["flush-element"],["text","\\n      "],["open-element","lol-uikit-flat-button-secondary",[]],["static-attr","class","lol-settings-account-verification-button-verify"],["dynamic-attr","disabled",["unknown",["cannotVerify"]],null],["dynamic-attr","onClick",["helper",["action"],[["get",[null]],"showVerificationProcess"],null],null],["flush-element"],["text","\\n        "],["append",["unknown",["tra","lol_account_verification_settings_button_sms_verify"]],false],["text","\\n      "],["close-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["tooltipPosition","disabled"],["left",["get",["canVerify"]]]],1],["text","    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-settings-icon-red-x-mark"],["flush-element"],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-settings-icon-green-check-mark"],["flush-element"],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-account-verification-verified-label"],["flush-element"],["append",["unknown",["tra","lol_account_verification_settings_acc_ver_verified_label"]],false],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "RNvsVfdT",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\settings-slider.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\settings-slider.js\\" "],["text","\\n"],["open-element","lol-uikit-slider",[]],["static-attr","class","lol-settings-slider"],["dynamic-attr","value",["unknown",["value"]],null],["dynamic-attr","percentage",["unknown",["percentage"]],null],["dynamic-attr","disabled",["unknown",["disabled"]],null],["dynamic-attr","clickset",["unknown",["clickset"]],null],["flush-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "CYjpdRAr",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\push-to-talk-key.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\push-to-talk-key.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-voice-ptt"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"openModal"],null],null],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-voice-ptt-label"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","voice_settings_ptt_label"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-voice-ptt-icon"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-voice-ptt-modifier"],["flush-element"],["text","\\n      "],["append",["unknown",["pushToTalkKeyModifier"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-voice-ptt-key"],["dynamic-attr","style",["concat",["font-size: ",["unknown",["pushToTalkKeyFontSize"]],";"]]],["flush-element"],["text","\\n      "],["append",["unknown",["pushToTalkKey"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-voice-ptt-speaker-wrapper"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-voice-ptt-speaker"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["block",["if"],[["get",["displayKey"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-small"],["flush-element"],["text","\\n      "],["open-element","p",[]],["flush-element"],["text","\\n        "],["append",["unknown",["displayKey"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["uikit-tooltip"],null,[["tooltipPosition"],["left"]],0]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "xfjT5+2h",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\game-sound-content.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\game-sound-content.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-sound-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-sound-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_SOUND_MASTER_VOLUME"]],false],["text",": "],["append",["unknown",["MasterVolumeCurrentValue"]],false],["close-element"],["text","\\n    "],["open-element","lol-uikit-slider",[]],["static-attr","class","lol-settings-ingame-sound-slider"],["static-attr","for","MasterVolume"],["dynamic-attr","value",["concat",[["unknown",["MasterVolume"]]]]],["static-attr","percentage",""],["flush-element"],["close-element"],["text","\\n    "],["open-element","input",[]],["static-attr","type","checkbox"],["static-attr","name","MasterMute"],["static-attr","class","lol-settings-ingame-sound-mutebutton"],["flush-element"],["close-element"],["text","\\n    "],["open-element","label",[]],["static-attr","for","MasterMute"],["flush-element"],["open-element","span",[]],["flush-element"],["close-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-sound-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-sound-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_SOUND_MUSIC_VOLUME"]],false],["text",": "],["append",["unknown",["MusicVolumeCurrentValue"]],false],["close-element"],["text","\\n    "],["open-element","lol-uikit-slider",[]],["static-attr","class","lol-settings-ingame-sound-slider"],["static-attr","for","MusicVolume"],["dynamic-attr","value",["concat",[["unknown",["MusicVolume"]]]]],["static-attr","percentage",""],["flush-element"],["close-element"],["text","\\n    "],["open-element","input",[]],["static-attr","type","checkbox"],["static-attr","name","MusicMute"],["static-attr","class","lol-settings-ingame-sound-mutebutton"],["flush-element"],["close-element"],["text","\\n    "],["open-element","label",[]],["static-attr","for","MusicMute"],["flush-element"],["open-element","span",[]],["flush-element"],["close-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-sound-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-sound-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_SOUND_ANNOUNCER_VOLUME"]],false],["text",": "],["append",["unknown",["AnnouncerVolumeCurrentValue"]],false],["close-element"],["text","\\n    "],["open-element","lol-uikit-slider",[]],["static-attr","class","lol-settings-ingame-sound-slider"],["static-attr","for","AnnouncerVolume"],["dynamic-attr","value",["concat",[["unknown",["AnnouncerVolume"]]]]],["static-attr","percentage",""],["flush-element"],["close-element"],["text","\\n    "],["open-element","input",[]],["static-attr","type","checkbox"],["static-attr","name","AnnouncerMute"],["static-attr","class","lol-settings-ingame-sound-mutebutton"],["flush-element"],["close-element"],["text","\\n    "],["open-element","label",[]],["static-attr","for","AnnouncerMute"],["flush-element"],["open-element","span",[]],["flush-element"],["close-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-sound-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-sound-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_SOUND_VOICE_VOLUME"]],false],["text",": "],["append",["unknown",["VoiceVolumeCurrentValue"]],false],["close-element"],["text","\\n    "],["open-element","lol-uikit-slider",[]],["static-attr","class","lol-settings-ingame-sound-slider"],["static-attr","for","VoiceVolume"],["dynamic-attr","value",["concat",[["unknown",["VoiceVolume"]]]]],["static-attr","percentage",""],["flush-element"],["close-element"],["text","\\n    "],["open-element","input",[]],["static-attr","type","checkbox"],["static-attr","name","VoiceMute"],["static-attr","class","lol-settings-ingame-sound-mutebutton"],["flush-element"],["close-element"],["text","\\n    "],["open-element","label",[]],["static-attr","for","VoiceMute"],["flush-element"],["open-element","span",[]],["flush-element"],["close-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-sound-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-sound-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_SOUND_FX_VOLUME"]],false],["text",": "],["append",["unknown",["SfxVolumeCurrentValue"]],false],["close-element"],["text","\\n    "],["open-element","lol-uikit-slider",[]],["static-attr","class","lol-settings-ingame-sound-slider"],["static-attr","for","SfxVolume"],["dynamic-attr","value",["concat",[["unknown",["SfxVolume"]]]]],["static-attr","percentage",""],["flush-element"],["close-element"],["text","\\n    "],["open-element","input",[]],["static-attr","type","checkbox"],["static-attr","name","SfxMute"],["static-attr","class","lol-settings-ingame-sound-mutebutton"],["flush-element"],["close-element"],["text","\\n    "],["open-element","label",[]],["static-attr","for","SfxMute"],["flush-element"],["open-element","span",[]],["flush-element"],["close-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-sound-row"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-sound-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_SOUND_AMBIENCE_VOLUME"]],false],["text",": "],["append",["unknown",["AmbienceVolumeCurrentValue"]],false],["close-element"],["text","\\n  "],["open-element","lol-uikit-slider",[]],["static-attr","class","lol-settings-ingame-sound-slider"],["static-attr","for","AmbienceVolume"],["dynamic-attr","value",["concat",[["unknown",["AmbienceVolume"]]]]],["static-attr","percentage",""],["flush-element"],["close-element"],["text","\\n  "],["open-element","input",[]],["static-attr","type","checkbox"],["static-attr","name","AmbienceMute"],["static-attr","class","lol-settings-ingame-sound-mutebutton"],["flush-element"],["close-element"],["text","\\n  "],["open-element","label",[]],["static-attr","for","AmbienceMute"],["flush-element"],["open-element","span",[]],["flush-element"],["close-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-sound-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-sound-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_SOUND_PINGS_VOLUME"]],false],["text",": "],["append",["unknown",["PingsVolumeCurrentValue"]],false],["close-element"],["text","\\n    "],["open-element","lol-uikit-slider",[]],["static-attr","class","lol-settings-ingame-sound-slider"],["static-attr","for","PingsVolume"],["dynamic-attr","value",["concat",[["unknown",["PingsVolume"]]]]],["static-attr","percentage",""],["flush-element"],["close-element"],["text","\\n    "],["open-element","input",[]],["static-attr","type","checkbox"],["static-attr","name","PingsMute"],["static-attr","class","lol-settings-ingame-sound-mutebutton"],["flush-element"],["close-element"],["text","\\n    "],["open-element","label",[]],["static-attr","for","PingsMute"],["flush-element"],["open-element","span",[]],["flush-element"],["close-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-sound-dropdown-item lol-settings-ingame-row"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-dropdown-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_SOUND_SR_THEME_MUSIC_TITLE"]],false],["close-element"],["text","\\n  "],["open-element","lol-uikit-framed-dropdown",[]],["static-attr","class","lol-settings-ingame-dropdown"],["static-attr","id","ThemeMusic"],["flush-element"],["text","\\n  "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","value","0"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","LOL_SETTINGS_INGAME_SOUND_SR_THEME_MUSIC_UPDATED"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","value","1"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","LOL_SETTINGS_INGAME_SOUND_SR_THEME_MUSIC_CLASSIC"]],false],["text","\\n  "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-sound-checkbox lol-settings-ingame-row"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-checkbox lol-settings-video-checkbox"],["static-attr","name","EnableAudio"],["flush-element"],["text","\\n        "],["open-element","input",[]],["static-attr","slot","input"],["static-attr","type","checkbox"],["static-attr","name","EnableAudio"],["flush-element"],["close-element"],["text","\\n        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","name","EnableAudio"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_SOUND_DISABLE_SOUND_LABEL"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","label",[]],["static-attr","class","lol-settings-ingame-sound-description-text"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_SOUND_DISABLE_SOUND_DESC"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "J8EKBwro",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\game-interface-content.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\game-interface-content.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-section-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_INTERFACE_SIZE_TITLE"]],false],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-interface-row"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-interface-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_INTERFACE_HUD_SCALE"]],false],["text",": "],["append",["unknown",["scaleDisplays","GlobalScale"]],false],["close-element"],["text","\\n  "],["open-element","lol-uikit-slider",[]],["static-attr","class","lol-settings-ingame-interface-slider"],["static-attr","for","GlobalScale"],["dynamic-attr","value",["concat",[["unknown",["scaleDisplays","GlobalScale"]]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-interface-row"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-interface-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_INTERFACE_CHAT_SCALE"]],false],["text",": "],["append",["unknown",["scaleDisplays","ChatScale"]],false],["close-element"],["text","\\n  "],["open-element","lol-uikit-slider",[]],["static-attr","class","lol-settings-ingame-interface-slider"],["static-attr","for","ChatScale"],["dynamic-attr","value",["concat",[["unknown",["scaleDisplays","ChatScale"]]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-interface-row"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-interface-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_INTERFACE_MINIMAP_SCALE"]],false],["text",": "],["append",["unknown",["scaleDisplays","MinimapScale"]],false],["close-element"],["text","\\n  "],["open-element","lol-uikit-slider",[]],["static-attr","class","lol-settings-ingame-interface-slider"],["static-attr","for","MinimapScale"],["dynamic-attr","value",["concat",[["unknown",["scaleDisplays","MinimapScale"]]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-interface-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-interface-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_INTERFACE_OBJECTIVE_PLANNING_SCALE"]],false],["text",": "],["append",["unknown",["scaleDisplays","ObjectiveVoteScale"]],false],["close-element"],["text","\\n    "],["open-element","lol-uikit-slider",[]],["static-attr","class","lol-settings-ingame-interface-slider"],["static-attr","for","ObjectiveVoteScale"],["dynamic-attr","value",["concat",[["unknown",["scaleDisplays","ObjectiveVoteScale"]]]]],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["block",["each"],[["get",["checkBoxGroups"]]],null,6]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["dynamic-attr","value",["get",["index"]],null],["flush-element"],["append",["helper",["get"],[["get",["tra"]],["get",["dropdownOption","title"]]],null],false],["close-element"],["text","\\n"]],"locals":["dropdownOption","index"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","lol-settings-dropdown-item"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-section-title"],["flush-element"],["append",["helper",["get"],[["get",["tra"]],["get",["dropdown","title"]]],null],false],["close-element"],["text","\\n      "],["open-element","lol-uikit-framed-dropdown",[]],["static-attr","class","lol-settings-interface-dropdown"],["dynamic-attr","id",["concat",[["unknown",["dropdown","dataKey"]]]]],["flush-element"],["text","\\n"],["block",["each"],[["get",["dropdown","options"]]],null,0],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":["dropdown"]},{"statements":[["text","        "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-checkbox lol-settings-interface-checkbox"],["dynamic-attr","name",["unknown",["checkBoxOption","dataKey"]],null],["flush-element"],["text","\\n          "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox",["get",["checkBoxOption","dataKey"]],["helper",["mut"],[["helper",["get"],[["get",[null]],["get",["checkBoxOption","dataKey"]]],null]],null]]]],false],["text","\\n          "],["open-element","label",[]],["static-attr","slot","label"],["dynamic-attr","for",["concat",[["unknown",["checkBoxOption","dataKey"]]]]],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["helper",["get"],[["get",["tra"]],["get",["checkBoxOption","propertyName"]]],null],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["unless"],[["get",["checkBoxOption","leftColumn"]]],null,2]],"locals":["checkBoxOption"]},{"statements":[["text","        "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-checkbox lol-settings-interface-checkbox"],["dynamic-attr","name",["unknown",["checkBoxOption","dataKey"]],null],["flush-element"],["text","\\n          "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox",["get",["checkBoxOption","dataKey"]],["helper",["mut"],[["helper",["get"],[["get",[null]],["get",["checkBoxOption","dataKey"]]],null]],null]]]],false],["text","\\n          "],["open-element","label",[]],["static-attr","slot","label"],["dynamic-attr","for",["concat",[["unknown",["checkBoxOption","dataKey"]]]]],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["helper",["get"],[["get",["tra"]],["get",["checkBoxOption","propertyName"]]],null],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["checkBoxOption","leftColumn"]]],null,4]],"locals":["checkBoxOption"]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-section-title"],["flush-element"],["append",["helper",["get"],[["get",["tra"]],["get",["checkBoxGroup","sectionName"]]],null],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-interface-checkboxes"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-interface-checkbox-column"],["flush-element"],["text","\\n"],["block",["each"],[["get",["checkBoxGroup","options"]]],null,5],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-interface-checkbox-column"],["flush-element"],["text","\\n"],["block",["each"],[["get",["checkBoxGroup","options"]]],null,3],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["block",["each"],[["get",["checkBoxGroup","dropdowns"]]],null,1]],"locals":["checkBoxGroup"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "ArCkIAW4",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\game-gameplay-content.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\game-gameplay-content.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-gameplay-controls"],["flush-element"],["text","\\n"],["block",["if"],[["get",["isOSX"]]],null,1],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-gameplay-controls"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-section-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_CONTROLS_TITLE"]],false],["close-element"],["text","\\n"],["block",["if"],[["get",["showUseSoftwareMouse"]]],null,0],["text","  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-slider-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_MOUSE_SPEED"]],false],["text",": "],["append",["unknown",["sliders","GameMouseSpeed"]],false],["close-element"],["text","\\n    "],["open-element","lol-uikit-slider",[]],["static-attr","class","lol-settings-ingame-slider"],["static-attr","for","GameMouseSpeed"],["static-attr","step","5"],["dynamic-attr","value",["concat",[["unknown",["sliders","GameMouseSpeed"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-slider-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_CAMERA_MOVE_SPEED_MOUSE"]],false],["text",": "],["append",["unknown",["sliders","MapScrollSpeed"]],false],["close-element"],["text","\\n    "],["open-element","lol-uikit-slider",[]],["static-attr","class","lol-settings-ingame-slider"],["static-attr","for","MapScrollSpeed"],["dynamic-attr","value",["concat",[["unknown",["sliders","MapScrollSpeed"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-slider-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_CAMERA_MOVE_SPEED_KEYBOARD"]],false],["text",": "],["append",["unknown",["sliders","KeyboardScrollSpeed"]],false],["close-element"],["text","\\n    "],["open-element","lol-uikit-slider",[]],["static-attr","class","lol-settings-ingame-slider"],["static-attr","for","KeyboardScrollSpeed"],["dynamic-attr","value",["concat",[["unknown",["sliders","KeyboardScrollSpeed"]]]]],["flush-element"],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-column-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-column"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-checkbox lol-settings-ingame-checkbox"],["static-attr","name","SnapCameraOnRespawn"],["flush-element"],["text","\\n        "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","SnapCameraOnRespawn",["helper",["mut"],[["get",["SnapCameraOnRespawn"]]],null]]]],false],["text","\\n        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","SnapCameraOnRespawn"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_MOVE_CAM_ON_REVIVE"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-checkbox lol-settings-ingame-checkbox"],["static-attr","name","MiddleClickDragScrollEnabled"],["flush-element"],["text","\\n        "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","MiddleClickDragScrollEnabled",["helper",["mut"],[["get",["MiddleClickDragScrollEnabled"]]],null]]]],false],["text","\\n        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","MiddleClickDragScrollEnabled"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_MOUSE_BUTTON_DRAG_SCROLL"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-column"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-checkbox lol-settings-ingame-checkbox"],["static-attr","name","ScrollSmoothingEnabled"],["flush-element"],["text","\\n        "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","ScrollSmoothingEnabled",["helper",["mut"],[["get",["ScrollSmoothingEnabled"]]],null]]]],false],["text","\\n        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","ScrollSmoothingEnabled"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_ENABLE_SMOOTH_CAMERA"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-dropdown-item lol-settings-ingame-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-dropdown-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_CAMERA_LOCK_MODE_TITLE"]],false],["close-element"],["text","\\n    "],["open-element","lol-uikit-framed-dropdown",[]],["static-attr","class","lol-settings-ingame-dropdown"],["static-attr","id","CameraLockMode"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","value","0"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_CAMERA_LOCK_MODE_PER_SIDE"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","value","1"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_CAMERA_LOCK_MODE_FIXED"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","lol-uikit-dropdown-option",[]],["static-attr","slot","lol-uikit-dropdown-option"],["static-attr","value","2"],["flush-element"],["text","\\n      "],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_CAMERA_LOCK_MODE_SEMI_LOCKED"]],false],["text","\\n    "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-gameplay-controls"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-section-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_GAMEPLAY_TITLE"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-column-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-column"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-checkbox lol-settings-ingame-checkbox"],["static-attr","name","AutoAcquireTarget"],["flush-element"],["text","\\n        "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","AutoAcquireTarget",["helper",["mut"],[["get",["AutoAcquireTarget"]]],null]]]],false],["text","\\n        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","AutoAcquireTarget"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_AUTOATTACK"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-checkbox lol-settings-ingame-checkbox"],["static-attr","name","ShowTurretRangeIndicators"],["flush-element"],["text","\\n        "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","ShowTurretRangeIndicators",["helper",["mut"],[["get",["ShowTurretRangeIndicators"]]],null]]]],false],["text","\\n        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","ShowTurretRangeIndicators"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_SHOW_TURRET_RANGE_INDICATORS"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-checkbox lol-settings-ingame-checkbox"],["static-attr","name","RecommendJunglePaths"],["flush-element"],["text","\\n        "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","RecommendJunglePaths",["helper",["mut"],[["get",["RecommendJunglePaths"]]],null]]]],false],["text","\\n        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","RecommendJunglePaths"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_RECOMMEND_JUNGLE_PATHS"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-checkbox lol-settings-ingame-checkbox"],["static-attr","name","ClampCastTargetLocationWithinMaxRange"],["flush-element"],["text","\\n        "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","ClampCastTargetLocationWithinMaxRange",["helper",["mut"],[["get",["ClampCastTargetLocationWithinMaxRange"]]],null]]]],false],["text","\\n        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","ClampCastTargetLocationWithinMaxRange"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_CLAMP_CAST_TARGET_LOCATION_WITHIN_MAX_RANGE"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-column"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-checkbox lol-settings-ingame-checkbox"],["static-attr","name","PredictMovement"],["flush-element"],["text","\\n        "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","PredictMovement",["helper",["mut"],[["get",["PredictMovement"]]],null]]]],false],["text","\\n        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","PredictMovement"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_MOVEMENT_PREDICTION"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-checkbox lol-settings-ingame-checkbox"],["static-attr","name","EnableTargetedAttackMove"],["flush-element"],["text","\\n        "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","EnableTargetedAttackMove",["helper",["mut"],[["get",["EnableTargetedAttackMove"]]],null]]]],false],["text","\\n        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","EnableTargetedAttackMove"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_ATTACK_MOVE_ON_CURSOR"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-checkbox lol-settings-ingame-checkbox"],["static-attr","name","TargetChampionsOnlyAsToggle"],["flush-element"],["text","\\n        "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","TargetChampionsOnlyAsToggle",["helper",["mut"],[["get",["TargetChampionsOnlyAsToggle"]]],null]]]],false],["text","\\n        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","TargetChampionsOnlyAsToggle"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_TARGET_CHAMPIONS_ONLY_AS_TOGGLE"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-ingame-checkbox"],["static-attr","name","OSXMouseAcceleration"],["flush-element"],["text","\\n      "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","OSXMouseAcceleration",["helper",["mut"],[["get",["OSXMouseAcceleration"]]],null]]]],false],["text","\\n      "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","OSXMouseAcceleration"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_USE_SOFTWARE_MOUSE"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-section-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_GRAPHICS_TITLE"]],false],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-column-container"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-column"],["flush-element"],["text","\\n        "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-checkbox lol-settings-ingame-checkbox"],["static-attr","name","PreferOpenGLLegacyMode"],["flush-element"],["text","\\n        "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","PreferOpenGLLegacyMode",["helper",["mut"],[["get",["PreferOpenGLLegacyMode"]]],null]]]],false],["text","\\n        "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","PreferOpenGLLegacyMode"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_GAMEPLAY_PREFEROPENGLLEGACYMODE"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "elRplSFU",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\game-hotkeys-additional-section.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\game-hotkeys-additional-section.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","additional-hotkeys-header"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"toggle"],null],null],["flush-element"],["append",["helper",["get"],[["get",["tra"]],["get",["tab","groupName"]]],null],false],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","additional-hotkeys-main"],["flush-element"],["text","\\n"],["block",["each"],[["get",["tab","subgroups"]]],null,4],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","td",[]],["static-attr","class","td-normal"],["dynamic-attr","name",["concat",[["unknown",["control","dataKey"]],"_set2"]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showKeybindingDialog",["get",["control","section"]],["get",["control","dataKey"]],0],null],null],["flush-element"],["append",["helper",["format-key-bindings"],[["helper",["get"],[["helper",["get"],[["get",["inputSettings"]],["get",["control","section"]]],null],["get",["control","dataKey"]]],null]],null],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","td",[]],["static-attr","class","td-normal"],["dynamic-attr","name",["concat",[["unknown",["control","dataKey"]],"_set1"]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showKeybindingDialog",["get",["control","section"]],["get",["control","dataKey"]],1],null],null],["flush-element"],["append",["helper",["format-key-bindings"],[["helper",["get"],[["helper",["get"],[["get",["inputSettings"]],["get",["control","section"]]],null],["get",["control","dataKey"]]],null],1],null],false],["close-element"],["text","\\n        "],["open-element","td",[]],["static-attr","class","td-normal"],["dynamic-attr","name",["concat",[["unknown",["control","dataKey"]],"_set2"]]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showKeybindingDialog",["get",["control","section"]],["get",["control","dataKey"]],2],null],null],["flush-element"],["append",["helper",["format-key-bindings"],[["helper",["get"],[["helper",["get"],[["get",["inputSettings"]],["get",["control","section"]]],null],["get",["control","dataKey"]]],null],2],null],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","    "],["open-element","tr",[]],["flush-element"],["text","\\n      "],["open-element","td",[]],["static-attr","class","td-normal td-column-header"],["flush-element"],["append",["helper",["get"],[["get",["tra"]],["get",["control","name"]]],null],false],["close-element"],["text","\\n"],["block",["if"],[["get",["subgroup","twoSets"]]],null,1,0],["text","    "],["close-element"],["text","\\n"]],"locals":["control"]},{"statements":[["text","        "],["open-element","td",[]],["static-attr","class","td-no-border"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_HOTKEYS_SET_1"]],false],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","table",[]],["static-attr","class","additional-hotkeys-tb"],["static-attr","cellspacing","0"],["static-attr","cellpadding","0"],["static-attr","ondragstart","return false;"],["static-attr","ondrop","return false;"],["flush-element"],["text","\\n    "],["open-element","tr",[]],["flush-element"],["text","\\n      "],["open-element","td",[]],["static-attr","class","td-no-border td-column-header"],["flush-element"],["append",["helper",["get"],[["get",["tra"]],["get",["subgroup","name"]]],null],false],["close-element"],["text","\\n"],["block",["if"],[["get",["subgroup","twoSets"]]],null,3],["text","      "],["open-element","td",[]],["static-attr","class","td-no-border"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_HOTKEYS_SET_2"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n\\n"],["block",["each"],[["get",["subgroup","controls"]]],null,2],["text","  "],["close-element"],["text","\\n"]],"locals":["subgroup"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "4Eaq0WzE",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\game-hotkeys-additional.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\game-hotkeys-additional.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-hotkeys-additional"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-section-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_HOTKEYS_ADDITIONAL_HOTKEYS_TITLE"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["additionalHotkeyGroups"]]],null,0],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["helper",["game-hotkeys-additional-section"],null,[["tab","showKeybindingDialog","inputSettings"],[["get",["tab"]],["helper",["action"],[["get",[null]],"showKeybindingDialog"],null],["get",["inputSettings"]]]]],false],["text","\\n"]],"locals":["tab"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "CanWjHLx",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\game-hotkeys-primary-button.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\game-hotkeys-primary-button.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-hotkeys-keybinding-button-top"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"showKeybindingDialog",["get",["section"]],["get",["dataKey"]]],null],null],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-hotkeys-keybinding-button-modifier lol-settings-ingame-hotkeys-keybinding-button-colored-text"],["flush-element"],["append",["helper",["get-key-bindings-modifier"],[["get",["keybinding"]]],null],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-hotkeys-keybinding-button-content lol-settings-ingame-hotkeys-keybinding-button-colored-text"],["flush-element"],["append",["helper",["get-key-bindings-main-key"],[["get",["keybinding"]]],null],false],["close-element"],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-hotkeys-keybinding-button-bottom"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"toggleQuickCast",["get",["quickbindKey"]]],null],null],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-hotkeys-keybinding-button-bottom-icon"],["flush-element"],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "c/UppKrv",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\game-hotkeys-primary.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\game-hotkeys-primary.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-hotkeys-primary"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-section-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_HOTKEYS_PRIMARY_HOTKEYS"]],false],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-row"],["flush-element"],["text","\\n    "],["open-element","lol-uikit-flat-button-secondary",[]],["static-attr","class","lol-settings-ingame-hotkeys-castall-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"changeCastAll",true],null],null],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","lol-settings-ingame-hotkeys-castall-text"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_HOTKEYS_QUICK_CAST_ALL"]],false],["close-element"],["text","\\n    "],["close-element"],["text","  \\n    "],["open-element","lol-uikit-flat-button-secondary",[]],["static-attr","class","lol-settings-ingame-hotkeys-castall-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"changeCastAll",false],null],null],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","lol-settings-ingame-hotkeys-castall-text"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_HOTKEYS_NORMAL_CAST_ALL"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-hotkeys-abilities-block-left"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_HOTKEYS_ABILITIES_LABEL"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["abilities"]]],null,2],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-hotkeys-abilities-block-right"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_HOTKEYS_SUMMONER_SPELLS_LABEL"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["summonerSpells"]]],null,1],["text","    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-row"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-hotkeys-abilities-block-left"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_HOTKEYS_ITEMS_LABEL"]],false],["close-element"],["text","\\n"],["block",["each"],[["get",["items"]]],null,0],["text","    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-hotkeys-abilities-block-right"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_HOTKEYS_TRINKET_LABEL"]],false],["close-element"],["text","\\n      "],["append",["helper",["game-hotkeys-primary-button"],null,[["quickcast","keybinding","section","dataKey","quickbindKey","showKeybindingDialog","toggleQuickCast"],[["helper",["get"],[["get",["inputSettings","Quickbinds"]],["get",["trinket","quickCast"]]],null],["helper",["get"],[["get",["inputSettings","GameEvents"]],["get",["trinket","dataKey1"]]],null],["get",["trinket","section"]],["get",["trinket","dataKey1"]],["get",["trinket","quickCast"]],["helper",["action"],[["get",[null]],"showKeybindingDialog"],null],["helper",["action"],[["get",[null]],"toggleQuickCast"],null]]]],false],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["append",["helper",["game-hotkeys-primary-button"],null,[["quickcast","keybinding","section","dataKey","quickbindKey","showKeybindingDialog","toggleQuickCast"],[["helper",["get"],[["get",["inputSettings","Quickbinds"]],["get",["control","quickCast"]]],null],["helper",["get"],[["get",["inputSettings","GameEvents"]],["get",["control","dataKey1"]]],null],["get",["control","section"]],["get",["control","dataKey1"]],["get",["control","quickCast"]],["helper",["action"],[["get",[null]],"showKeybindingDialog"],null],["helper",["action"],[["get",[null]],"toggleQuickCast"],null]]]],false],["text","\\n"]],"locals":["control"]},{"statements":[["text","        "],["append",["helper",["game-hotkeys-primary-button"],null,[["quickcast","keybinding","section","dataKey","quickbindKey","showKeybindingDialog","toggleQuickCast"],[["helper",["get"],[["get",["inputSettings","Quickbinds"]],["get",["control","quickCast"]]],null],["helper",["get"],[["get",["inputSettings","GameEvents"]],["get",["control","dataKey1"]]],null],["get",["control","section"]],["get",["control","dataKey1"]],["get",["control","quickCast"]],["helper",["action"],[["get",[null]],"showKeybindingDialog"],null],["helper",["action"],[["get",[null]],"toggleQuickCast"],null]]]],false],["text","\\n"]],"locals":["control"]},{"statements":[["text","        "],["append",["helper",["game-hotkeys-primary-button"],null,[["quickcast","keybinding","section","dataKey","quickbindKey","showKeybindingDialog","toggleQuickCast"],[["helper",["get"],[["get",["inputSettings","Quickbinds"]],["get",["control","quickCast"]]],null],["helper",["get"],[["get",["inputSettings","GameEvents"]],["get",["control","dataKey1"]]],null],["get",["control","section"]],["get",["control","dataKey1"]],["get",["control","quickCast"]],["helper",["action"],[["get",[null]],"showKeybindingDialog"],null],["helper",["action"],[["get",[null]],"toggleQuickCast"],null]]]],false],["text","\\n"]],"locals":["control"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "F84ZNsZV",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\game-hotkeys-quickcast.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\game-hotkeys-quickcast.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-settings-ingame-quickcast-with-indicators"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-ingame-section-title"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_HOTKEYS_QUICKCAST_WITH_INDICATOR_TITLE"]],false],["close-element"],["text","\\n  "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-ingame-checkbox"],["flush-element"],["text","\\n    "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","quickCastWithIndicator",["helper",["mut"],[["get",["SmartCastOnKeyRelease"]]],null]]]],false],["text","\\n    "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","quickCastWithIndicator"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_HOTKEYS_QUICKCAST_WITH_INDICATOR"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-flat-checkbox",[]],["static-attr","class","lol-settings-ingame-checkbox"],["flush-element"],["text","\\n    "],["append",["helper",["input"],null,[["slot","type","name","checked"],["input","checkbox","castSpellUponAnother",["helper",["mut"],[["get",["SmartCastWithIndicator_CastWhenNewSpellSelected"]]],null]]]],false],["text","\\n    "],["open-element","label",[]],["static-attr","slot","label"],["static-attr","for","castSpellUponAnother"],["static-attr","class","lol-settings-checkbox-label"],["flush-element"],["append",["unknown",["tra","LOL_SETTINGS_INGAME_HOTKEYS_CAST_SPELL_UPON_ANOTHER"]],false],["close-element"],["text","\\n  "],["close-element"],["text","    \\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "kuzuYnEp",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\game-hotkeys-content.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\game-hotkeys-content.js\\" "],["text","\\n"],["append",["helper",["game-hotkeys-primary"],null,[["inputSettings","keyToActionReverseMap"],[["get",["inputSettings"]],["get",["keyToActionReverseMap"]]]]],false],["text","\\n"],["append",["helper",["game-hotkeys-quickcast"],null,[["gameSettingsRemote","gameSettingsSchema","handleQuickcastInitialized"],[["get",["gameSettingsRemote"]],["get",["gameSettingsSchema"]],["helper",["action"],[["get",[null]],"handleQuickcastInitialized"],null]]]],false],["text","\\n"],["append",["helper",["game-hotkeys-additional"],null,[["inputSettings","keyToActionReverseMap"],[["get",["inputSettings"]],["get",["keyToActionReverseMap"]]]]],false],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "6KZycyO3",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\vng-publisher-settings.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\vng-publisher-settings.js\\" "],["text","\\n"],["block",["if"],[["get",["isVngReady"]]],null,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["append",["unknown",["honeyfruit-settings-error"]],false],["text","\\n"]],"locals":[]},{"statements":[["open-element","div",[]],["static-attr","class","lol-settings-general-row"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-settings-general-title"],["flush-element"],["text","\\n    "],["append",["unknown",["tra","vng_settings_account"]],false],["text","\\n  "],["close-element"],["text","\\n"],["block",["if"],[["get",["isError"]]],null,0],["text","  "],["open-element","a",[]],["static-attr","class","vng-publisher-settings__button"],["static-attr","href","#"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"handleButtonClick"],null],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","vng_settings_edit_profile"]],false],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        const l = n(1).Ember;
        e.exports = l.HTMLBars.template({
          id: "yULiXAyR",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\templates\\\\components\\\\honeyfruit-settings-error.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\__MAIN__\\\\LeagueClientContent_Beta\\\\15692\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-settings\\\\src\\\\app\\\\components\\\\honeyfruit-settings-error.js\\" "],["text","\\n"],["append",["unknown",["tra","honeyfruit_settings_error"]],false],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = n(1),
          a = n(7);
        const s = new Set(Object.values(a.Category));
        var o = class {
          constructor(e) {
            this._modalManager = e;
          }
          getCategoryNames() {
            return { ...a.Category };
          }
          show(e) {
            e && !s.has(e) && l.logger.error("Invalid category name", e),
              this._modalManager.show(e);
          }
          close() {
            this._modalManager.close();
          }
        };
        t.default = o;
      },
    ],
    t = {};
  function n(l) {
    var a = t[l];
    if (void 0 !== a) return a.exports;
    var s = (t[l] = { exports: {} });
    return e[l](s, s.exports, n), s.exports;
  }
  (n.r = (e) => {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
      Object.defineProperty(e, "__esModule", { value: !0 });
  }),
    (() => {
      "use strict";
      var e = a(n(1)),
        t = a(n(2)),
        l = a(n(3));
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      n(4);
      const s = "rcp-fe-lol-settings",
        o = document.currentScript.ownerDocument;
      t.default.set(o);
      const i = window.getPluginAnnounceEventName(s);
      o.addEventListener(
        i,
        function (t) {
          (0, t.registrationHandler)(async function (t) {
            await e.default.init(t, {
              audioPlugin: (e) => e.get("rcp-fe-audio"),
              ComponentFactory: (e) =>
                e.get("rcp-fe-common-libs").getComponentFactory("1"),
              dataBinding: (e) =>
                e
                  .get("rcp-fe-common-libs")
                  .getDataBinding("rcp-fe-lol-settings"),
              Ember: (e) => e.get("rcp-fe-ember-libs").getEmber(),
              emberL10n: (e) => e.get("rcp-fe-ember-libs").getEmberL10n("1"),
              logger: (e) => e.get("rcp-fe-common-libs").logging.create(s),
              playerNames: (e) => e.get("rcp-fe-common-libs").playerNames,
              socket: (e) => e.getSocket(),
            }),
              await e.default.add({
                db: e.default.dataBinding.bindTo(e.default.socket),
              }),
              await e.default.add({
                tra: (t) =>
                  (async function (t) {
                    let n = t
                      .get("rcp-fe-lol-l10n")
                      .tra()
                      .overlay("/fe/lol-l10n/trans.json")
                      .overlay("/fe/lol-settings/trans.json")
                      .overlay("/fe/lol-shared-components/trans.json");
                    !0 ===
                      (await e.default.db.get(
                        "/lol-client-config/v3/client-config/lol.client_settings.legal_statements",
                      )) &&
                      (n = n.overlay(
                        "/fe/lol-settings/trans-legal-statements.json",
                      ));
                    return n;
                  })(t),
              }),
              await e.default.tra.ready(),
              await e.default.add({
                AccountVerification: (e) =>
                  e
                    .get("rcp-fe-lol-shared-components")
                    .getApi_AccountVerification(),
                emberApplicationFactory: (e) =>
                  e.get("rcp-fe-ember-libs").getEmberApplicationFactory(),
                jQuery: (e) => e.get("rcp-fe-common-libs").getJquery(2),
                lodash: (e) => e.get("rcp-fe-common-libs").getLodash(4),
                ModalManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getModalManager(),
                Navigation: (e) => e.get("rcp-fe-lol-navigation"),
                SharedComponents: (e) => e.get("rcp-fe-lol-shared-components"),
                sounds: l.default.init(e.default.audioPlugin),
                Telemetry: (e) => e.get("rcp-fe-common-libs").getTelemetry("1"),
                templateHelper: (e) =>
                  e.get("rcp-fe-lol-uikit").getTemplateHelper(),
                TooltipManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getTooltipManager(),
                WindowManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getWindowManager(),
              });
            const a = (0, n(5).default)();
            await a.build();
            const o = await e.default.ComponentFactory.create(a.getName())
                .emberAppInstancePromise,
              i = o.__container__.lookup("service:modal-manager"),
              r = new (0, n(141).default)(i);
            e.default.api = r;
            const c = e.default.SharedComponents.getApi_HomeRegistry();
            c.resolveOpenSettingsHandler((...e) => r.show(...e)),
              c.resolveCloseSettingsHandler(() => r.close());
            const m = o.__container__.lookup("router:main"),
              u = o.__container__.lookup("route:general"),
              d = {
                syncToRoute: (e, t) => {
                  t && u.refresh(), m.replaceWith(e);
                },
              };
            try {
              await i.initialize(o.rootElement, d);
            } catch (t) {
              e.default.logger.error(
                "Settings error during plugin initialization",
              );
            }
            return e.default.api;
          });
        },
        { once: !0 },
      );
    })();
})();
