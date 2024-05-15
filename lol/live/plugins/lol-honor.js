(() => {
  var e = [
      ,
      (e) => {
        "use strict";
        let t;
        function o() {
          return (
            t ||
            (console.error(
              "The `provider` object has not been set, please do so by calling the `init` method.",
            ),
            null)
          );
        }
        const n = {
          init: function (e, o) {
            return (t = e), this.add(o);
          },
          _getValue: function (e, o) {
            let n;
            return (
              "function" == typeof o
                ? ((n = o(t)),
                  n ||
                    console.warn(
                      "The function for key " + e + " returned a falsy value: ",
                      n,
                    ))
                : "string" == typeof o
                  ? ((n = t.get(o)),
                    n ||
                      console.warn(
                        "The provider `get` invocation for the key " +
                          e +
                          " returned a falsy value: ",
                        n,
                      ))
                  : "object" == typeof o && (n = o),
              n
            );
          },
          add: function (e) {
            e = e || {};
            const t = [],
              o = this;
            return (
              Object.keys(e).forEach(function (n) {
                const r = e[n],
                  a = o._getValue(n, r);
                a && a.then
                  ? (a.then(function (e) {
                      e ||
                        console.warn(
                          "The promise for the key " +
                            n +
                            " resolved with a falsy value: ",
                          e,
                        ),
                        o._addValue(n, e);
                    }),
                    t.push(a))
                  : o._addValue(n, a);
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
              o()
            );
          },
          getProvider: function () {
            return o();
          },
        };
        e.exports = n;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.VALID_GAMEFLOW_DISPLAY_STATES =
            t.TRANSLATION_PATH =
            t.TRANSLATIONS =
            t.TIME_BEFORE_CAN_VOTE =
            t.TIMED_OUT =
            t.REWARD_TYPE_LOOT_ID_MAP =
            t.REWARD_TYPES =
            t.REWARDS_UNLOCKED =
            t.RECOGNITIONS_NEEDED_FOR_LEAF =
            t.RECLIMB_LEVEL_UP =
            t.RECLIMB_CHECKPOINT_REACHED =
            t.OPT_OUT =
            t.MIN_HONOR_UNLOCK_LEVEL =
            t.MIN_HONOR_LEVEL_WITH_CHECKPOINT =
            t.MIN_HONOR_CHECKPOINT =
            t.MIN_HONOR_CELEBRATION_LEVEL =
            t.MAX_HONOR_UNLOCK_LEVEL =
            t.MAX_HONOR_LEVEL_WITH_CHECKPOINT =
            t.MAX_HONOR_CHECKPOINT =
            t.MAX_HONOR_CELEBRATION_LEVEL =
            t.LEVEL_UP =
            t.KEY_FRAGMENT =
            t.DEFAULT_TIME_TO_VOTE =
            t.CONVERSATION_TYPE_POSTGAME =
            t.CHECKPOINT_REACHED =
            t.CELEBRATION_DOUBLE_CLICK_DELAY =
            t.CATEGORY_DATA =
            t.BASE_PATH =
            t.ASSET_PATH =
            t.ASSETS =
              void 0);
        const o = "fe/lol-honor/";
        t.BASE_PATH = o;
        const n = o + "assets/";
        t.ASSET_PATH = n;
        const r = o + "trans.json";
        t.TRANSLATION_PATH = r;
        t.RECOGNITIONS_NEEDED_FOR_LEAF = 3;
        t.KEY_FRAGMENT = "KEY_FRAGMENT";
        t.OPT_OUT = "OPT_OUT";
        t.TIMED_OUT = "TIMED_OUT";
        t.DEFAULT_TIME_TO_VOTE = "40000";
        t.TIME_BEFORE_CAN_VOTE = 300;
        t.CELEBRATION_DOUBLE_CLICK_DELAY = 500;
        t.MIN_HONOR_CELEBRATION_LEVEL = 1;
        t.MAX_HONOR_CELEBRATION_LEVEL = 5;
        t.MIN_HONOR_LEVEL_WITH_CHECKPOINT = 2;
        t.MAX_HONOR_LEVEL_WITH_CHECKPOINT = 4;
        t.MIN_HONOR_CHECKPOINT = 1;
        t.MAX_HONOR_CHECKPOINT = 3;
        t.MIN_HONOR_UNLOCK_LEVEL = 0;
        t.MAX_HONOR_UNLOCK_LEVEL = 2;
        t.LEVEL_UP = "LEVEL_UP";
        t.RECLIMB_LEVEL_UP = "RECLIMB_LEVEL_UP";
        t.CHECKPOINT_REACHED = "CHECKPOINT_REACHED";
        t.RECLIMB_CHECKPOINT_REACHED = "RECLIMB_CHECKPOINT_REACHED";
        t.REWARDS_UNLOCKED = "REWARDS_UNLOCKED";
        t.VALID_GAMEFLOW_DISPLAY_STATES = ["None", "Lobby", "EndOfGame"];
        t.REWARD_TYPES = [
          "KEY_FRAGMENT",
          "HONOR_CAPSULE_1",
          "HONOR_CAPSULE_2",
          "HONOR_CAPSULE_3",
        ];
        t.REWARD_TYPE_LOOT_ID_MAP = {
          KEY_FRAGMENT: "MATERIAL_key_fragment",
          FULL_KEY: "MATERIAL_key",
          HONOR_CAPSULE_1: "CHEST_96",
          HONOR_CAPSULE_2: "CHEST_97",
          HONOR_CAPSULE_3: "CHEST_98",
          HONOR_LEVEL_3_CAPSULE: "CHEST_206",
          HONOR_LEVEL_3_CHECKPOINT_ORB: "CHEST_209",
          HONOR_LEVEL_4_CAPSULE: "CHEST_207",
          HONOR_LEVEL_4_CHECKPOINT_ORB: "CHEST_210",
          HONOR_LEVEL_5_CAPSULE: "CHEST_208",
          HONOR_LEVEL_5_CHECKPOINT_ORB: "CHEST_211",
        };
        t.CONVERSATION_TYPE_POSTGAME = "postGame";
        t.CATEGORY_DATA = {
          COOL: {
            header: "honor_category_prompt_header_cool",
            body: "honor_category_prompt_body_cool",
            tooltip: "honor_postgame_category_tooltip_cool",
            iconUnselected: "Cool_Unselected.png",
            iconSelected: "Cool_Selected.png",
            postgameIcon: "Cool_MiniIcon.png",
            eog1: "EOG_Cool_1-2.webm",
            eog2: "EOG_Cool_1-2.webm",
            eog3: "EOG_Cool_3.webm",
            eog4: "EOG_Cool_4.webm",
            eog5: "EOG_Cool_4.webm",
            index: 1,
          },
          SHOTCALLER: {
            header: "honor_category_prompt_header_shotcaller",
            body: "honor_category_prompt_body_shotcaller",
            tooltip: "honor_postgame_category_tooltip_shotcaller",
            iconUnselected: "Shotcaller_Unselected.png",
            iconSelected: "Shotcaller_Selected.png",
            postgameIcon: "Shotcaller_MiniIcon.png",
            eog1: "EOG_Shotcaller_1-2.webm",
            eog2: "EOG_Shotcaller_1-2.webm",
            eog3: "EOG_Shotcaller_3.webm",
            eog4: "EOG_Shotcaller_4.webm",
            eog5: "EOG_Shotcaller_4.webm",
            index: 2,
          },
          HEART: {
            header: "honor_category_prompt_header_heart",
            body: "honor_category_prompt_body_heart",
            tooltip: "honor_postgame_category_tooltip_heart",
            iconUnselected: "Heart_Unselected.png",
            iconSelected: "Heart_Selected.png",
            postgameIcon: "Heart_MiniIcon.png",
            eog1: "EOG_Heart_1-2.webm",
            eog2: "EOG_Heart_1-2.webm",
            eog3: "EOG_Heart_3.webm",
            eog4: "EOG_Heart_4.webm",
            eog5: "EOG_Heart_4.webm",
            index: 3,
          },
        };
        t.ASSETS = {
          CELEBRATIONS: {
            0: {
              LOW_SPEC: "celebration/0_Levelup_Low_Spec_Shadowless.png",
              UNLOCK: "celebration/0_Unlock.webm",
              UNLOCK_AUDIO: "audio/sfx-honor-level-up-unlock.ogg",
              TOAST_EMBLEM: "celebration/0_Toast_Emblem.png",
            },
            1: {
              LEVEL_UP: "celebration/1_Levelup_Intro.webm",
              LEVEL_UP_AUDIO: "audio/sfx-honor-level-up-1.ogg",
              IDLE: "celebration/1_Levelup_Loop.webm",
              LOW_SPEC: "celebration/1_Levelup_Low_Spec_Shadowless.png",
              UNLOCK: "celebration/1_Unlock.webm",
              UNLOCK_AUDIO: "audio/sfx-honor-level-up-unlock.ogg",
              TOAST_EMBLEM: "celebration/1_Toast_Emblem.png",
            },
            2: {
              AMBIENCE_AUDIO: "audio/music-honor-level-2-ambience-loop.ogg",
              LEVEL_UP: "celebration/2_Levelup_Intro.webm",
              LEVEL_UP_AUDIO: "audio/sfx-honor-level-up-2.ogg",
              IDLE: "celebration/2_Levelup_Loop.webm",
              LOW_SPEC: "celebration/2_Levelup_Low_Spec_Shadowless.png",
              CHECKPOINT_AUDIO: "audio/sfx-honor-level-2-checkpoint.ogg",
              1: {
                INTRO: "celebration/2-1_Checkpoint_Intro.webm",
                LOOP: "celebration/2-1_Checkpoint_Loop.webm",
                LOW_SPEC: "celebration/2-1_Checkpoint_Low_Spec.png",
              },
              2: {
                INTRO: "celebration/2-2_Checkpoint_Intro.webm",
                LOOP: "celebration/2-2_Checkpoint_Loop.webm",
                LOW_SPEC: "celebration/2-2_Checkpoint_Low_Spec.png",
              },
              3: {
                INTRO: "celebration/2-3_Checkpoint_Intro.webm",
                LOOP: "celebration/2-3_Checkpoint_Loop.webm",
                LOW_SPEC: "celebration/2-3_Checkpoint_Low_Spec.png",
              },
              EMBELLISHMENT: {
                IMAGE: "celebration/2_Embellishment.png",
                AUDIO: "audio/sfx-honor-level-2-filigree.ogg",
              },
              FRAME: "celebration/2_Frame.png",
            },
            3: {
              AMBIENCE_AUDIO: "audio/music-honor-level-3-ambience-loop.ogg",
              LEVEL_UP: "celebration/3_Levelup_Intro.webm",
              LEVEL_UP_CHECKPOINT_OUTRO: "celebration/3_Checkpoint_Outro.webm",
              DISSOLVE_AUDIO: "audio/sfx-honor-checkpoints-dissolve.ogg",
              LEVEL_UP_AUDIO: "audio/sfx-honor-level-up-3.ogg",
              IDLE: "celebration/3_Levelup_Loop.webm",
              LOW_SPEC: "celebration/3_Levelup_Low_Spec_Shadowless.png",
              CHECKPOINT_AUDIO: "audio/sfx-honor-level-3-checkpoint.ogg",
              1: {
                INTRO: "celebration/3-1_Checkpoint_Intro.webm",
                LOOP: "celebration/3-1_Checkpoint_Loop.webm",
                LOW_SPEC: "celebration/3-1_Checkpoint_Low_Spec.png",
              },
              2: {
                INTRO: "celebration/3-2_Checkpoint_Intro.webm",
                LOOP: "celebration/3-2_Checkpoint_Loop.webm",
                LOW_SPEC: "celebration/3-2_Checkpoint_Low_Spec.png",
              },
              3: {
                INTRO: "celebration/3-3_Checkpoint_Intro.webm",
                LOOP: "celebration/3-3_Checkpoint_Loop.webm",
                LOW_SPEC: "celebration/3-3_Checkpoint_Low_Spec.png",
              },
              EMBELLISHMENT: {
                IMAGE: "celebration/3_Embellishment.png",
                AUDIO: "audio/sfx-honor-level-3-filigree.ogg",
              },
              FRAME: "celebration/3_Frame.png",
              SWIRLS: {
                INTRO: "celebration/3_Levelup_Swirls_Intro.webm",
                LOOP: "celebration/3_Levelup_Swirls_Loop.webm",
              },
            },
            4: {
              AMBIENCE_AUDIO: "audio/music-honor-level-4-ambience-loop.ogg",
              LEVEL_UP: "celebration/4_Levelup_Intro.webm",
              LEVEL_UP_CHECKPOINT_OUTRO: "celebration/4_Checkpoint_Outro.webm",
              DISSOLVE_AUDIO: "audio/sfx-honor-checkpoints-dissolve.ogg",
              LEVEL_UP_AUDIO: "audio/sfx-honor-level-up-4.ogg",
              IDLE: "celebration/4_Levelup_Loop.webm",
              LOW_SPEC: "celebration/4_Levelup_Low_Spec_Shadowless.png",
              CHECKPOINT_AUDIO: "audio/sfx-honor-level-4-checkpoint.ogg",
              1: {
                INTRO: "celebration/4-1_Checkpoint_Intro.webm",
                LOOP: "celebration/4-1_Checkpoint_Loop.webm",
                LOW_SPEC: "celebration/4-1_Checkpoint_Low_Spec.png",
              },
              2: {
                INTRO: "celebration/4-2_Checkpoint_Intro.webm",
                LOOP: "celebration/4-2_Checkpoint_Loop.webm",
                LOW_SPEC: "celebration/4-2_Checkpoint_Low_Spec.png",
              },
              3: {
                INTRO: "celebration/4-3_Checkpoint_Intro.webm",
                LOOP: "celebration/4-3_Checkpoint_Loop.webm",
                LOW_SPEC: "celebration/4-3_Checkpoint_Low_Spec.png",
              },
              EMBELLISHMENT: {
                IMAGE: "celebration/4_Embellishment.png",
                AUDIO: "audio/sfx-honor-level-4-filigree.ogg",
              },
              FRAME: "celebration/4_Frame.png",
              SWIRLS: {
                INTRO: "celebration/4_Levelup_Swirls_Intro.webm",
                LOOP: "celebration/4_Levelup_Swirls_Loop.webm",
              },
            },
            5: {
              AMBIENCE_AUDIO: "audio/music-honor-level-4-ambience-loop.ogg",
              LEVEL_UP: "celebration/5_Levelup_Intro.webm",
              LEVEL_UP_CHECKPOINT_OUTRO: "celebration/5_Checkpoint_Outro.webm",
              DISSOLVE_AUDIO: "audio/sfx-honor-checkpoints-dissolve.ogg",
              LEVEL_UP_AUDIO: "audio/sfx-honor-level-up-5.ogg",
              IDLE: "celebration/5_Levelup_Loop.webm",
              LOW_SPEC: "celebration/5_Levelup_Low_Spec_Shadowless.png",
              SWIRLS: {
                INTRO: "celebration/5_Levelup_Swirls_Intro.webm",
                LOOP: "celebration/5_Levelup_Swirls_Loop.webm",
              },
            },
            BACKGROUND: "celebration/Background.png",
            MIDGROUND: "celebration/Midground.png",
            FRACTAL_NOISE: "celebration/Fractal_Noise.png",
            OUTRO_SMOKE: "celebration/Transition_Green.webm",
            TRANSITION_AUDIO: "audio/sfx-honor-transition-magic.ogg",
          },
          LOCAL_LOOT: {
            HONOR_LEVEL_3_CAPSULE: "loot/Capsule_3.png",
            HONOR_LEVEL_3_CHECKPOINT_ORB: "loot/Orb_3.png",
            HONOR_LEVEL_4_CAPSULE: "loot/Capsule_4.png",
            HONOR_LEVEL_4_CHECKPOINT_ORB: "loot/Orb_4.png",
            HONOR_LEVEL_5_CAPSULE: "loot/Capsule_5.png",
            HONOR_LEVEL_5_CHECKPOINT_ORB: "loot/Orb_5.png",
          },
        };
        t.TRANSLATIONS = {
          CELEBRATIONS: {
            0: {
              REWARDS_UNLOCKED: {
                HEADER: "honor_celebration_unlock_0_header",
                BODY: "honor_celebration_unlock_0_body",
              },
              RECLIMB_CHECKPOINT_REACHED: {
                NOTIFICATION_HEADER: "honor_celebration_checkpoint_header",
                NOTIFICATION_BODY: "honor_celebration_checkpoint_body",
                NOTIFICATION_BODY_LAST:
                  "honor_celebration_checkpoint_body_last",
              },
            },
            1: {
              REWARDS_UNLOCKED: {
                HEADER: "honor_celebration_unlock_1_header",
                BODY: "honor_celebration_unlock_1_body",
              },
              RECLIMB_LEVEL_UP: {
                HEADER: "honor_celebration_levelup_header",
                BODY: "honor_celebration_levelup_reclimb_1_body",
                REWARD_HEADER:
                  "honor_celebration_levelup_reclimb_key_reward_header",
                REWARD_BODY:
                  "honor_celebration_levelup_reclimb_low_reward_body",
              },
              RECLIMB_CHECKPOINT_REACHED: {
                NOTIFICATION_HEADER: "honor_celebration_checkpoint_header",
                NOTIFICATION_BODY: "honor_celebration_checkpoint_body",
                NOTIFICATION_BODY_LAST:
                  "honor_celebration_checkpoint_body_last",
                REWARD_HEADER: "honor_celebration_checkpoint_1_reward_header",
                REWARD_BODY: "honor_celebration_checkpoint_reclimb_reward_body",
              },
            },
            2: {
              RECLIMB_LEVEL_UP: {
                HEADER: "honor_celebration_levelup_header",
                BODY: "honor_celebration_levelup_reclimb_2_body",
                BODY_CLASH: "honor_celebration_levelup_reclimb_2_clash_body",
                REWARD_HEADER:
                  "honor_celebration_levelup_reclimb_key_reward_header",
                REWARD_BODY:
                  "honor_celebration_levelup_reclimb_low_reward_body",
              },
              CHECKPOINT_REACHED: {
                HEADER: "honor_celebration_checkpoint_header",
                BODY: "honor_celebration_checkpoint_body",
                BODY_LAST: "honor_celebration_checkpoint_body_last",
                REWARD_HEADER: "honor_celebration_checkpoint_2_reward_header",
                REWARD_BODY: "honor_celebration_checkpoint_reward_body",
              },
              RECLIMB_CHECKPOINT_REACHED: {
                HEADER: "honor_celebration_checkpoint_header",
                BODY: "honor_celebration_checkpoint_body",
                BODY_LAST: "honor_celebration_checkpoint_body_last",
                REWARD_HEADER: "honor_celebration_checkpoint_2_reward_header",
                REWARD_BODY: "honor_celebration_checkpoint_reclimb_reward_body",
              },
            },
            3: {
              LEVEL_UP: {
                HEADER: "honor_celebration_levelup_header",
                BODY: "honor_celebration_levelup_3_body",
                REWARD_HEADER: "honor_celebration_levelup_3_reward_header",
                REWARD_BODY: "honor_celebration_levelup_reward_body",
              },
              RECLIMB_LEVEL_UP: {
                HEADER: "honor_celebration_levelup_header",
                BODY: "honor_celebration_levelup_reclimb_3_body",
                REWARD_HEADER:
                  "honor_celebration_levelup_reclimb_3_reward_header",
                REWARD_BODY: "honor_celebration_levelup_reclimb_3_reward_body",
              },
              CHECKPOINT_REACHED: {
                HEADER: "honor_celebration_checkpoint_header",
                BODY: "honor_celebration_checkpoint_body",
                BODY_LAST: "honor_celebration_checkpoint_body_last",
                REWARD_HEADER: "honor_celebration_checkpoint_3_reward_header",
                REWARD_BODY: "honor_celebration_checkpoint_reward_body",
              },
              RECLIMB_CHECKPOINT_REACHED: {
                HEADER: "honor_celebration_checkpoint_header",
                BODY: "honor_celebration_checkpoint_body",
                BODY_LAST: "honor_celebration_checkpoint_body_last",
                REWARD_HEADER: "honor_celebration_checkpoint_3_reward_header",
                REWARD_BODY: "honor_celebration_checkpoint_reclimb_reward_body",
              },
            },
            4: {
              LEVEL_UP: {
                HEADER: "honor_celebration_levelup_header",
                BODY: "honor_celebration_levelup_4_body",
                REWARD_HEADER: "honor_celebration_levelup_4_reward_header",
                REWARD_BODY: "honor_celebration_levelup_reward_body",
              },
              RECLIMB_LEVEL_UP: {
                HEADER: "honor_celebration_levelup_header",
                BODY: "honor_celebration_levelup_reclimb_4_body",
                REWARD_HEADER:
                  "honor_celebration_levelup_reclimb_4_reward_header",
                REWARD_BODY: "honor_celebration_levelup_reclimb_4_reward_body",
              },
              CHECKPOINT_REACHED: {
                HEADER: "honor_celebration_checkpoint_header",
                BODY: "honor_celebration_checkpoint_body",
                BODY_LAST: "honor_celebration_checkpoint_body_last",
                REWARD_HEADER: "honor_celebration_checkpoint_4_reward_header",
                REWARD_BODY: "honor_celebration_checkpoint_reward_body",
              },
              RECLIMB_CHECKPOINT_REACHED: {
                HEADER: "honor_celebration_checkpoint_header",
                BODY: "honor_celebration_checkpoint_body",
                BODY_LAST: "honor_celebration_checkpoint_body_last",
                REWARD_HEADER: "honor_celebration_checkpoint_4_reward_header",
                REWARD_BODY: "honor_celebration_checkpoint_reclimb_reward_body",
              },
            },
            5: {
              LEVEL_UP: {
                HEADER: "honor_celebration_levelup_header",
                EMBLEM_HEADER: "honor_celebration_levelup_5_body",
                EMBLEM_BODY: "honor_celebration_levelup_5_body_sub",
                REWARD_HEADER: "honor_celebration_levelup_5_reward_header",
                REWARD_BODY: "honor_celebration_levelup_reward_body",
              },
              RECLIMB_LEVEL_UP: {
                HEADER: "honor_celebration_levelup_header",
                EMBLEM_HEADER: "honor_celebration_levelup_reclimb_5_body",
                EMBLEM_BODY: "honor_celebration_levelup_reclimb_5_body_sub",
                REWARD_HEADER:
                  "honor_celebration_levelup_reclimb_5_reward_header",
                REWARD_BODY: "honor_celebration_levelup_reclimb_5_reward_body",
              },
              CHECKPOINT_REACHED: {
                HEADER: "honor_celebration_checkpoint_header",
                BODY: "honor_celebration_checkpoint_body_generic",
                REWARD_HEADER: "honor_celebration_checkpoint_5_reward_header",
                REWARD_BODY: "honor_celebration_checkpoint_reward_body",
              },
            },
          },
          DYNAMIC_LOOT_MESSAGES: {
            RECENT_COOL: "honor_reward_stat_recent_cool",
            RECENT_SHOTCALLER: "honor_reward_stat_recent_shotcaller",
            RECENT_HEART: "honor_reward_stat_recent_heart",
            PERCENT_RECENT_COOL: "honor_reward_stat_percent_recent_cool",
            PERCENT_RECENT_SHOTCALLER:
              "honor_reward_stat_percent_recent_shotcaller",
            PERCENT_RECENT_HEART: "honor_reward_stat_percent_recent_heart",
            PERCENT_SEASONAL_COOL: "honor_reward_stat_percent_seasonal_cool",
            PERCENT_SEASONAL_SHOTCALLER:
              "honor_reward_stat_percent_seasonal_shotcaller",
            PERCENT_SEASONAL_HEART: "honor_reward_stat_percent_seasonal_heart",
            COMPARE_COOL: "honor_reward_stat_compare_cool",
            COMPARE_SHOTCALLER: "honor_reward_stat_compare_shotcaller",
            COMPARE_HEART: "honor_reward_stat_compare_heart",
            STRANGER_SENT: "honor_reward_stat_stranger_sent",
            STRANGER_RECEIVED: "honor_reward_stat_stranger_received",
            STRANGER_MUTUAL: "honor_reward_stat_stranger_mutual",
          },
        };
      },
      (e, t, o) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n,
          r = o(1),
          a = (n = o(4)) && n.__esModule ? n : { default: n },
          i = o(5);
        t.default = class {
          constructor(e) {
            (this._screenRoot = e),
              (this._dataBinding = r.dataBinding.bindTo(
                (0, r.getProvider)().getSocket(),
              )),
              this._dataBinding.observe(
                "/lol-gameflow/v1/session",
                this,
                this._handleGameflowData.bind(this),
              );
          }
          _showHonor(e) {
            this._screenRoot.getElement().firstChild ||
              (this._screenRoot.once("show", () => {
                e && this._waitForUnlock(e);
              }),
              this._screenRoot
                .getElement()
                .appendChild(this._application.domNode),
              this._screenRoot.bump(),
              r.Telemetry.recordTracingStepEvent("UI_Honor: SHOW"),
              r.logger.info("rcp-fe-lol-honor: api: showHonor"));
          }
          _hideHonor() {
            if (!this._screenRoot.getElement().firstChild) return;
            this._screenRoot.release();
            const e = this._screenRoot.getElement();
            for (; e.hasChildNodes(); ) e.removeChild(e.lastChild);
            r.Telemetry.recordTracingStepEvent("UI_Honor: HIDE"),
              r.logger.info("rcp-fe-lol-honor: api: hideHonor");
          }
          _waitForUnlock(e) {
            if (r.LockAndLoad.getLockState()) {
              const t = function () {
                r.LockAndLoad.removeEventListener("unlock", t), e();
              };
              r.LockAndLoad.addEventListener("unlock", t);
            } else e();
          }
          _createApplication() {
            const e = (0, a.default)(r.Ember, r.tra);
            this._application = (0, i.createEmberApp)(e);
          }
          _handleGameflowData(e) {
            this._application ||
              !e ||
              ("GameStart" !== e.phase && "PreEndOfGame" !== e.phase) ||
              this._createApplication();
          }
        };
      },
      (e) => {
        "use strict";
        function t(e) {
          const o = {};
          for (const n in e)
            "object" == typeof e[n] ? (o[n] = t(e[n])) : (o[n] = e[n]);
          return o;
        }
        function o(e, t, o) {
          const { regions: n, region: r, locale: a } = e.metadata();
          if ((o = o.get("metadata." + t)) && "region" === t && o.id !== r.id) {
            const t = n[o.id],
              r = t.defaultLocale
                ? t.defaultLocale.id
                : t.availableLocales[0].id;
            e.setLocale(r, o.id);
          } else o && "locale" === t && o.id !== a.id && e.setLocale(o.id);
        }
        e.exports = function (e, n, r) {
          let a;
          const i = { metadata: !0, moment: !0 };
          return (
            (n = n.observe(() => {
              if (a) {
                const e = t(n.metadata());
                a.set("metadata", e),
                  a.beginPropertyChanges(),
                  Object.keys(i).forEach((e) => {
                    a.propertyWillChange(e), a.propertyDidChange(e);
                  }),
                  a.endPropertyChanges();
              }
            })),
            (a = e.Service.extend({
              _tra: null,
              init() {
                this.wrapTra(n);
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
                return (i[e] = !0), this._tra.get(e);
              },
              willDestroy: () => this._tra.unregister(),
              addOverlays: function (e) {
                let t = this._tra;
                for (const o of e) t = t.overlay(o);
                t && this.wrapTra(t);
              },
            }).create()),
            a.set("service", a),
            a.addObserver("metadata.region", o.bind(null, n, "region")),
            a.addObserver("metadata.locale", o.bind(null, n, "locale")),
            r &&
              (console.warning(
                "deprecated: pass a traService as a property of your Ember application definition",
              ),
              r.register("tra:main", a, { instantiate: !1 }),
              r.inject("component", "tra", "tra:main"),
              r.inject("controller", "tra", "tra:main"),
              r.inject("view", "tra", "tra:main"),
              r.inject("model", "tra", "tra:main"),
              r.inject("route", "tra", "tra:main"),
              r.inject("service", "tra", "tra:main")),
            a
          );
        };
      },
      (e, t, o) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.createEmberApp = function (e) {
            const {
              RenderTelemetrySenderComponent: t,
              PlayerNameComponent: r,
            } = n.SharedEmberComponents;
            return (
              n.emberApplicationFactory.setFactoryDefinition({
                name: "PromptedVotingComponent",
                tra: e,
                ComponentFactory: n.componentFactory,
                PromptedVotingComponent: o(6).default,
                PromptedVotingPlayerComponent: o(9).default,
                PromptedVotingCategorySelectComponent: o(13).default,
                HonorService: o(16).default,
                RenderTelemetrySenderComponent: t,
                PlayerNameComponent: r,
              }),
              n.componentFactory.create("PromptedVotingComponent")
            );
          });
        var n = o(1);
      },
      (e, t, o) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = o(1),
          r = o(2);
        o(7);
        var a,
          i = (a = o(8)) && a.__esModule ? a : { default: a };
        const { RunMixin: l } = n.EmberAddons.EmberLifeline;
        var s = n.Ember.Component.extend(l, {
          honor: n.Ember.inject.service(),
          classNameBindings: ["baseClassName", "selectionChosen:hidden"],
          baseClassName: "prompted-voting-component",
          attributeBindings: ["style"],
          style: n.Ember.computed(
            "gameflowSession.map.assets.gameflow-background",
            function () {
              return `background-image: url(${this.get("gameflowSession.map.assets.parties-background")})`;
            },
          ),
          layout: i.default,
          selectionChosen: !1,
          canVote: !1,
          hoveredCategory: null,
          hoveredPlayer: null,
          currentPhase: null,
          isShowing: !1,
          loginSession: n.Ember.computed.readOnly("honor.loginSession"),
          currentSequenceEvent: n.Ember.computed.readOnly(
            "honor.currentSequenceEvent",
          ),
          gameflowSession: n.Ember.computed.readOnly("honor.gameflowSession"),
          honorBallot: n.Ember.computed.readOnly("honor.honorBallot"),
          honorConfig: n.Ember.computed.readOnly("honor.honorConfig"),
          observersOnInit: n.Ember.on("init", function () {
            this.addObserver("honorBallot.gameId", this, "processBallot"),
              this.addObserver("honorConfig.Enabled", this, "processBallot"),
              this.addObserver(
                "currentSequenceEvent.name",
                this,
                "handlePreEndOfGameSequence",
              ),
              this.processBallot(),
              this.handlePreEndOfGameSequence();
          }),
          observersOnWillDestroy: n.Ember.on("willDestroyElement", function () {
            this.removeObserver("honorBallot.gameId", this, "processBallot"),
              this.removeObserver("honorConfig.Enabled", this, "processBallot"),
              this.removeObserver(
                "currentSequenceEvent.name",
                this,
                "handlePreEndOfGameSequence",
              );
          }),
          localSummonerId: n.Ember.computed.alias("loginSession.summonerId"),
          decrementTime: function () {
            this.runTask(function () {
              const e = this.get("timeRemaining");
              0 === e
                ? this.send("timeOutHonor")
                : e > 0 &&
                  (this.set("timeRemaining", Math.max(e - 1e3, 0)),
                  this.decrementTime());
            }, 1e3);
          },
          timerTextMinutes: n.Ember.computed("timeRemaining", function () {
            let e = Math.floor(this.get("timeRemaining") / 6e4);
            return (e = Math.max(e, 0)), this.padTimeDisplay(Math.floor(e));
          }),
          timerTextSeconds: n.Ember.computed("timeRemaining", function () {
            let e = Math.floor(this.get("timeRemaining") / 1e3);
            return (e = Math.max(e, 0)), this.padTimeDisplay(e % 60);
          }),
          padTimeDisplay: function (e) {
            let t = "";
            return e < 10 && (t = "0"), t + e;
          },
          promptedVotingHeaderText: n.Ember.computed(
            "tra.honor_prompted_voting_header",
            function () {
              return this.get("tra").formatString(
                "honor_prompted_voting_header",
              );
            },
          ),
          skipButtonTooltipText: n.Ember.computed(
            "tra.honor_prompted_voting_pass_tooltip",
            function () {
              return this.get("tra").formatString(
                "honor_prompted_voting_pass_tooltip",
              );
            },
          ),
          actions: {
            timeOutHonor() {
              if (
                (n.logger.info(
                  "rcp-fe-lol-honor: timeOutHonor: selectionChosen",
                  this.get("selectionChosen"),
                ),
                this.get("selectionChosen"))
              )
                return;
              this.set("selectionChosen", !0);
              const e = {
                gameId: this.get("gameId"),
                honorType: r.TIMED_OUT,
                summonerId: 0,
                puuid: "",
              };
              (0, n.dataBinding)("/lol-honor-v2").post("/v1/honor-player/", e);
            },
            optOutHonor() {
              if (
                (n.logger.info(
                  "rcp-fe-lol-honor: optOutHonor: selectionChosen",
                  this.get("selectionChosen"),
                ),
                this.get("selectionChosen"))
              )
                return;
              this.set("selectionChosen", !0);
              const e = {
                gameId: this.get("gameId"),
                honorType: r.OPT_OUT,
                summonerId: 0,
                puuid: "",
              };
              (0, n.dataBinding)("/lol-honor-v2").post("/v1/honor-player/", e);
            },
          },
          hideHonor: function () {
            n.logger.info("rcp-fe-lol-honor: hideHonor: Attempt to hideHonor"),
              n.api._hideHonor(),
              this.set("isShowing", !1);
          },
          handlePreEndOfGameSequence: function () {
            const e = this.get("currentSequenceEvent.name");
            n.logger.info(
              "rcp-fe-lol-honor: handlePreEndOfGameSequence: currentPhase",
              this.get("currentPhase"),
            ),
              n.logger.info(
                "rcp-fe-lol-honor: handlePreEndOfGameSequence: sequenceName",
                e,
              ),
              "honor-vote" === this.get("currentPhase") &&
                "honor-vote" !== e &&
                (this.hideHonor(), this.set("timeRemaining", -1)),
              this.set("currentPhase", e);
          },
          startCountdown: function () {
            n.logger.info("rcp-fe-lol-honor: startCountdown"),
              this.decrementTime(),
              this.runTask(function () {
                this.set("canVote", !0);
              }, r.TIME_BEFORE_CAN_VOTE);
          },
          renderEventName: "honor-voting-render",
          shouldSendTelemetry: !1,
          processBallot: function () {
            if (
              (n.logger.info(
                "rcp-fe-lol-honor: processBallot: honorEnabled",
                this.get("honorConfig.Enabled"),
              ),
              n.logger.info(
                "rcp-fe-lol-honor: processBallot: isShowing",
                this.get("isShowing"),
              ),
              !this.get("honorConfig.Enabled"))
            )
              return;
            const e = this.get("honorBallot"),
              t = this.get("isShowing");
            let o = this.get("honorConfig.SecondsToVote");
            if (
              (o ? (o *= 1e3) : (o = r.DEFAULT_TIME_TO_VOTE),
              e && e.eligiblePlayers && e.eligiblePlayers.length > 0 && !t)
            ) {
              let t = !1;
              n.Telemetry.invokeWithLowProbability(() => {
                (t = !0), n.Telemetry.startTracingEvent(this.renderEventName);
              }),
                this.setProperties({
                  eligiblePlayers: e.eligiblePlayers.slice(),
                  selectionChosen: !1,
                  canVote: !1,
                  hoveredCategory: null,
                  hoveredPlayer: null,
                  shouldSendTelemetry: t,
                  gameId: e.gameId,
                  timeRemaining: o,
                  isShowing: !0,
                }),
                n.logger.info(
                  "rcp-fe-lol-honor: processBallot: Attempt to showHonor",
                ),
                n.api._showHonor(this.startCountdown.bind(this));
            }
          },
        });
        t.default = s;
      },
      (e, t, o) => {
        "use strict";
        o.r(t);
      },
      (e, t, o) => {
        const n = o(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "7K1YPTWv",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honor\\\\src\\\\app\\\\components\\\\prompted-voting-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honor\\\\src\\\\app\\\\components\\\\prompted-voting-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honor\\\\src\\\\app\\\\components\\\\prompted-voting-component\\\\index.js\\" "],["text","\\n"],["block",["if"],[["get",["isShowing"]]],null,3]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","        "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["flush-element"],["text","\\n          "],["open-element","p",[]],["flush-element"],["append",["unknown",["skipButtonTooltipText"]],false],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["append",["helper",["prompted-voting-player"],null,[["candidate","index","totalCandidates","localSummonerId","hoveredPlayer","hoveredCategory","selectionChosen","canVote","gameId","submitHonor"],[["get",["candidate"]],["get",["index"]],["get",["eligiblePlayers","length"]],["get",["localSummonerId"]],["get",["hoveredPlayer"]],["get",["hoveredCategory"]],["get",["selectionChosen"]],["get",["canVote"]],["get",["gameId"]],"submitHonor"]]],false],["text","\\n"]],"locals":["candidate","index"]},{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","prompted-voting-player-container"],["flush-element"],["text","\\n"],["block",["each"],[["get",["eligiblePlayers"]]],null,1],["text","    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","prompted-voting-vignette top"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","prompted-voting-vignette-glow"],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","prompted-voting-vignette bottom"],["flush-element"],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["static-attr","class","prompted-voting-header"],["flush-element"],["text","\\n      "],["append",["unknown",["promptedVotingHeaderText"]],false],["text","\\n    "],["close-element"],["text","\\n\\n    "],["open-element","lol-uikit-close-button",[]],["static-attr","button-type","next"],["dynamic-attr","class",["concat",["prompted-voting-skip-button ",["helper",["if"],[["get",["selectionChosen"]],"hidden"],null]]]],["dynamic-attr","disabled",["unknown",["selectionChosen"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"optOutHonor"],null],null],["flush-element"],["text","\\n"],["block",["uikit-tooltip"],null,[["type","tooltipPosition"],["system","top"]],0],["text","    "],["close-element"],["text","\\n\\n    "],["open-element","div",[]],["dynamic-attr","class",["concat",["prompted-voting-timer ",["helper",["if"],[["get",["selectionChosen"]],"hidden"],null]]]],["flush-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","prompted-voting-timer-minutes"],["flush-element"],["text","\\n        "],["append",["unknown",["timerTextMinutes"]],false],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","prompted-voting-timer-colon"],["flush-element"],["text","\\n        :\\n      "],["close-element"],["text","\\n      "],["open-element","span",[]],["static-attr","class","prompted-voting-timer-seconds"],["flush-element"],["text","\\n        "],["append",["unknown",["timerTextSeconds"]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["block",["render-telemetry-sender"],null,[["renderEventName","shouldSendTelemetry"],[["get",["renderEventName"]],["get",["shouldSendTelemetry"]]]],2]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, o) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = o(1),
          r = o(2),
          a = l(o(10));
        o(11);
        var i = l(o(12));
        function l(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var s = n.Ember.Component.extend(a.default, {
          classNameBindings: [
            "baseClassName",
            "candidateBrightnessClass",
            "totalCandidatesClassName",
            "candidateClassName",
          ],
          attributeBindings: ["style"],
          style: n.Ember.computed("candidate.skinSplashPath", function () {
            return `background-image: url(${this.get("candidate.skinSplashPath")})`;
          }),
          baseClassName: "prompted-voting-player-component",
          candidateClassName: n.Ember.computed(
            "candidate.summonerId",
            function () {
              return `candidate-${this.get("candidate.summonerName").replace(/ /g, "_")}`;
            },
          ),
          totalCandidatesClassName: n.Ember.computed(
            "totalCandidates",
            function () {
              return `total${this.get("totalCandidates")}`;
            },
          ),
          honorCategories: r.CATEGORY_DATA,
          layout: i.default,
          candidateIsHovered: n.Ember.computed(
            "candidate.summonerId",
            "hoveredPlayer",
            "selectionChosen",
            function () {
              return (
                this.get("candidate.summonerId") ===
                  this.get("hoveredPlayer") && !this.get("selectionChosen")
              );
            },
          ),
          otherCandidateIsHovered: n.Ember.computed(
            "hoveredPlayer",
            "candidate.summonerId",
            function () {
              return (
                this.get("hoveredPlayer") &&
                !(
                  this.get("candidate.summonerId") === this.get("hoveredPlayer")
                )
              );
            },
          ),
          candidateIsSelected: n.Ember.computed(
            "candidate.summonerId",
            "hoveredPlayer",
            "selectionChosen",
            function () {
              return (
                this.get("candidate.summonerId") ===
                  this.get("hoveredPlayer") && this.get("selectionChosen")
              );
            },
          ),
          candidateBrightnessClass: n.Ember.computed(
            "otherCandidateIsHovered",
            "candidateIsHovered",
            "selectionChosen",
            function () {
              const e = this.get("otherCandidateIsHovered"),
                t = this.get("candidateIsHovered"),
                o = this.get("selectionChosen");
              return e && !o
                ? "dimmed"
                : e && o
                  ? "rejected"
                  : t
                    ? "active"
                    : "";
            },
          ),
          promptHeader: n.Ember.computed(
            "tra",
            "candidateIsHovered",
            "hoveredCategory",
            function () {
              const e = this.get("hoveredCategory");
              return this.get("candidateIsHovered") && e
                ? this.get("tra").formatString(r.CATEGORY_DATA[e].header)
                : "";
            },
          ),
          promptBody: n.Ember.computed(
            "tra",
            "candidateIsHovered",
            "hoveredCategory",
            function () {
              const e = this.get("hoveredCategory");
              return this.get("candidateIsHovered") && e
                ? this.get("tra").formatString(r.CATEGORY_DATA[e].body)
                : "";
            },
          ),
          mouseEnter: function () {
            this.get("selectionChosen") ||
              this.set("hoveredPlayer", this.get("candidate.summonerId"));
          },
          mouseLeave: function () {
            this.get("selectionChosen") ||
              (this.get("candidateIsHovered") &&
                this.set("hoveredPlayer", null));
          },
        });
        t.default = s;
      },
      (e, t, o) => {
        "use strict";
        var n = o(1);
        const r = "sfx-ui",
          a = "music-ambience";
        e.exports = n.Ember.Mixin.create({
          playSound: function (e) {
            if (!1 === e) return;
            const t = n.Audio.getChannel(r).createSound(e);
            return t.play(), t;
          },
          playAmbience: function (e) {
            if (!1 === e) return;
            const t = n.Audio.getChannel(a).createSound(e, {
              isLoop: !0,
              fadeIn: !0,
            });
            return t.play(), t;
          },
        });
      },
      (e, t, o) => {
        "use strict";
        o.r(t);
      },
      (e, t, o) => {
        const n = o(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "1vQVUuf5",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honor\\\\src\\\\app\\\\components\\\\prompted-voting-component\\\\player-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honor\\\\src\\\\app\\\\components\\\\prompted-voting-component\\\\player-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honor\\\\src\\\\app\\\\components\\\\prompted-voting-component\\\\player-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","prompted-voting-candidate-champ"],["flush-element"],["text","\\n  "],["append",["unknown",["candidate","championName"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","prompted-voting-candidate-name"],["flush-element"],["text","\\n  "],["append",["helper",["player-name"],null,[["format","puuid"],["short",["get",["candidate","puuid"]]]]],false],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["prompted-voting-candidate-overlay ",["unknown",["candidateBrightnessClass"]]]]],["flush-element"],["close-element"],["text","\\n\\n"],["block",["each"],[["helper",["-each-in"],[["get",["honorCategories"]]],null]],null,0],["text","\\n"],["open-element","div",[]],["static-attr","class","honor-category-prompt-header"],["flush-element"],["text","\\n  "],["append",["unknown",["promptHeader"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","honor-category-prompt-body"],["flush-element"],["text","\\n  "],["append",["unknown",["promptBody"]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["helper",["prompted-voting-category-select"],null,[["candidate","totalCandidates","candidateIsHovered","candidateIsSelected","honorCategory","honorCategoryKey","hoveredCategory","hoveredPlayer","selectionChosen","canVote","gameId"],[["get",["candidate"]],["get",["totalCandidates"]],["get",["candidateIsHovered"]],["get",["candidateIsSelected"]],["get",["honorCategory"]],["get",["honorCategoryKey"]],["get",["hoveredCategory"]],["get",["hoveredPlayer"]],["get",["selectionChosen"]],["get",["canVote"]],["get",["gameId"]]]]],false],["text","\\n"]],"locals":["honorCategoryKey","honorCategory"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, o) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = o(1),
          r = o(2),
          a = l(o(10));
        o(14);
        var i = l(o(15));
        function l(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const { RunMixin: s } = n.EmberAddons.EmberLifeline;
        var _ = n.Ember.Component.extend(s, a.default, {
          classNameBindings: [
            "baseClassName",
            "categoryPosition",
            "categoryClassName",
            "totalCandidatesClassName",
            "candidateIsHovered:visible",
            "candidateCategoryIsSelected:selected",
            "candidateCategoryIsRejected:rejected",
          ],
          baseClassName: "prompted-voting-category-select-component",
          lowSpecGlowPath: r.ASSET_PATH + "Honor_Voting_Selection_Glow.png",
          lowSpecOutroPath: r.ASSET_PATH + "Honor_Voting_Selection_Outro.png",
          categoryClassName: n.Ember.computed("honorCategoryKey", function () {
            return `category-${this.get("honorCategoryKey")}`;
          }),
          categoryPosition: n.Ember.computed("honorCategory", function () {
            return `position${this.get("honorCategory.index")}`;
          }),
          totalCandidatesClassName: n.Ember.computed(
            "totalCandidates",
            function () {
              return `total${this.get("totalCandidates")}`;
            },
          ),
          layout: i.default,
          categoryIcon: n.Ember.computed(
            "honorCategory",
            "candidateCategoryIsHovered",
            "candidateCategoryIsSelected",
            function () {
              return this.get("candidateCategoryIsHovered") ||
                this.get("candidateCategoryIsSelected")
                ? r.ASSET_PATH + this.get("honorCategory.iconSelected")
                : r.ASSET_PATH + this.get("honorCategory.iconUnselected");
            },
          ),
          candidateCategoryIsHovered: n.Ember.computed(
            "candidateIsHovered",
            "hoveredCategory",
            "honorCategoryKey",
            function () {
              return (
                this.get("candidateIsHovered") &&
                this.get("hoveredCategory") === this.get("honorCategoryKey")
              );
            },
          ),
          candidateCategoryIsSelected: n.Ember.computed(
            "candidateCategoryIsHovered",
            "hoveredCategory",
            "honorCategoryKey",
            function () {
              return (
                this.get("candidateIsSelected") &&
                this.get("hoveredCategory") === this.get("honorCategoryKey")
              );
            },
          ),
          candidateCategoryIsRejected: n.Ember.computed(
            "candidateIsHovered",
            "hoveredCategory",
            "honorCategoryKey",
            function () {
              return (
                this.get("candidateIsSelected") &&
                this.get("hoveredCategory") !== this.get("honorCategoryKey")
              );
            },
          ),
          playLowSpecAnimation: n.Ember.computed(
            "selectionChosen",
            "hoveredPlayer",
            "hoveredCategory",
            "candidate.summonerId",
            "honorCategoryKey",
            function () {
              return (
                this.get("selectionChosen") &&
                this.get("hoveredPlayer") ===
                  this.get("candidate.summonerId") &&
                this.get("hoveredCategory") === this.get("honorCategoryKey")
              );
            },
          ),
          submitHonorVote: function () {
            let e = this.get("candidate.summonerId"),
              t = this.get("honorCategoryKey"),
              o = this.get("candidate.puuid");
            const a = this.get("gameId");
            (e && 0 !== e && t && a) || ((t = r.OPT_OUT), (e = 0), (o = ""));
            const i = { gameId: a, honorType: t, summonerId: e, puuid: o };
            (0, n.dataBinding)("/lol-honor-v2").post("/v1/honor-player/", i);
          },
          beginTransition: function () {
            this.set("selectionChosen", !0),
              n.logger.info(
                "rcp-fe-lol-honor: beginTransition: selectionChosen",
                this.get("selectionChosen"),
              ),
              (this._beginTransitionTimer = null);
            this.playSound(
              r.ASSET_PATH + "audio/sfx-honor-vote-outro-low-spec.ogg",
            ),
              this.runTask(function () {
                this.submitHonorVote();
              }, 1500);
          },
          onWillDestroyElement: n.Ember.on("willDestroyElement", function () {
            this._beginTransitionTimer &&
              (n.Ember.run.cancel(this._beginTransitionTimer),
              (this._beginTransitionTimer = null));
          }),
          actions: {
            mouseEnter: function () {
              this.get("selectionChosen") ||
                (this.set("hoveredCategory", this.get("honorCategoryKey")),
                this.playSound(
                  "/fe/lol-honor/assets/audio/sfx-uikit-grid-hover.ogg",
                ));
            },
            mouseLeave: function () {
              this.get("selectionChosen") ||
                (this.get("candidateCategoryIsHovered") &&
                  this.set("hoveredCategory", null));
            },
            click: function () {
              !this.get("selectionChosen") &&
                this.get("canVote") &&
                (this._beginTransitionTimer = n.Ember.run.once(
                  this,
                  "beginTransition",
                ));
            },
          },
        });
        t.default = _;
      },
      (e, t, o) => {
        "use strict";
        o.r(t);
      },
      (e, t, o) => {
        const n = o(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "PnvFhd2n",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honor\\\\src\\\\app\\\\components\\\\prompted-voting-component\\\\category-select-component\\\\layout.hbs\\" style-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honor\\\\src\\\\app\\\\components\\\\prompted-voting-component\\\\category-select-component\\\\style.styl\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_14_10\\\\LeagueClientContent_Release\\\\15682\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-honor\\\\src\\\\app\\\\components\\\\prompted-voting-component\\\\category-select-component\\\\index.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["prompted-voting-honor-category-selector ",["helper",["if"],[["get",["candidateCategoryIsHovered"]],"active"],null]," ",["unknown",["totalCandidatesClassName"]]," ",["unknown",["categoryPosition"]]]]],["modifier",["action"],[["get",[null]],"mouseEnter"],[["on"],["mouseEnter"]]],["modifier",["action"],[["get",[null]],"mouseLeave"],[["on"],["mouseLeave"]]],["modifier",["action"],[["get",[null]],"click"],[["on"],["click"]]],["flush-element"],["text","\\n"],["close-element"],["text","\\n\\n"],["open-element","div",[]],["dynamic-attr","class",["concat",["prompted-voting-honor-category-image-container ",["unknown",["categoryPosition"]]," ",["unknown",["totalCandidatesClassName"]]," ",["helper",["if"],[["get",["candidateIsHovered"]],"active"],null]," ",["helper",["if"],[["get",["candidateCategoryIsSelected"]],"selected"],null]]]],["flush-element"],["text","\\n  "],["open-element","img",[]],["static-attr","class","prompted-voting-honor-category-image"],["dynamic-attr","src",["concat",[["unknown",["categoryIcon"]]]]],["flush-element"],["close-element"],["text","\\n\\n"],["block",["if"],[["get",["playLowSpecAnimation"]]],null,0],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","    "],["open-element","div",[]],["static-attr","class","prompted-voting-selection-animation-container"],["flush-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","prompted-voting-selection-glow"],["dynamic-attr","src",["concat",[["unknown",["lowSpecGlowPath"]]]]],["flush-element"],["close-element"],["text","\\n      "],["open-element","img",[]],["static-attr","class","prompted-voting-selection-outro"],["dynamic-attr","src",["concat",[["unknown",["lowSpecOutroPath"]]]]],["flush-element"],["close-element"],["text","\\n    "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, o) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = o(1);
        const r = n.dataBinding.bindTo((0, n.getProvider)().getSocket());
        var a = n.Ember.Service.extend({
          init() {
            this._super(...arguments), this.initDataBindingObservers();
          },
          willDestroy() {
            this._super(...arguments), this.tearDownDataBindingObservers();
          },
          initDataBindingObservers() {
            (this._observers = []),
              this._observers.push(
                this._addObservedProperty(
                  "/lol-login/v1/session",
                  "loginSession",
                ),
              ),
              this._observers.push(
                this._addObservedProperty(
                  "/lol-pre-end-of-game/v1/currentSequenceEvent",
                  "currentSequenceEvent",
                ),
              ),
              this._observers.push(
                this._addObservedProperty(
                  "/lol-gameflow/v1/session",
                  "gameflowSession",
                ),
              ),
              this._observers.push(
                this._addObservedProperty(
                  "/lol-honor-v2/v1/ballot",
                  "honorBallot",
                ),
              ),
              this._observers.push(
                this._addObservedProperty(
                  "/lol-honor-v2/v1/config",
                  "honorConfig",
                ),
              );
          },
          tearDownDataBindingObservers() {
            this._observers &&
              this._observers.forEach((e) => r.unobserve(e, this)),
              (this._observers = []);
          },
          _setPropertyValue(e, t) {
            this.isDestroying || this.isDestroyed || this.set(e, t);
          },
          _addObservedProperty(e, t) {
            return (
              r.observe(e, this, (e) => {
                this._setPropertyValue(t, e);
              }),
              e
            );
          },
        });
        t.default = a;
      },
    ],
    t = {};
  function o(n) {
    var r = t[n];
    if (void 0 !== r) return r.exports;
    var a = (t[n] = { exports: {} });
    return e[n](a, a.exports, o), a.exports;
  }
  (o.r = (e) => {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
      Object.defineProperty(e, "__esModule", { value: !0 });
  }),
    (() => {
      "use strict";
      var e,
        t = (e = o(1)) && e.__esModule ? e : { default: e },
        n = o(2);
      const r = "rcp-fe-lol-honor",
        a = document.currentScript.ownerDocument;
      const i = window.getPluginAnnounceEventName(r);
      a.addEventListener(
        i,
        function (e) {
          (0, e.registrationHandler)(function (e) {
            return t.default
              .init(e, {
                Audio: (e) => e.get("rcp-fe-audio"),
                componentFactory: (e) =>
                  e.get("rcp-fe-common-libs").getComponentFactory("1"),
                ContextualNotificationManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getContextualNotificationManager(),
                dataBinding: (e) =>
                  e
                    .get("rcp-fe-common-libs")
                    .getDataBinding("rcp-fe-lol-honor"),
                Ember: (e) => e.get("rcp-fe-ember-libs").getEmber(),
                emberDataBinding: (e) =>
                  e
                    .get("rcp-fe-ember-libs")
                    .getEmberDataBinding("rcp-fe-lol-honor"),
                LockAndLoad: (e) => e.get("rcp-fe-lol-lock-and-load"),
                logger: (e) => e.get("rcp-fe-common-libs").logging.create(r),
                ModalManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getModalManager(),
                Postgame: (e) => e.get("rcp-fe-lol-postgame"),
                SharedEmberComponents: (e) =>
                  e
                    .get("rcp-fe-lol-shared-components")
                    .getSharedEmberComponents(),
                Telemetry: (e) => e.get("rcp-fe-common-libs").getTelemetry("1"),
                ToastCelebrationManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getToastCelebrationManager(),
                ToastManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getToastManager(),
                TooltipManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getTooltipManager(),
                UIKit: (e) => e.get("rcp-fe-lol-uikit"),
                Viewport: (e) =>
                  e.get("rcp-fe-lol-shared-components").getApi_Viewport(),
                VignetteCelebrationManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getVignetteCelebrationManager(),
              })
              .then(() =>
                t.default.add({
                  EmberAddons: (e) =>
                    e.get("rcp-fe-ember-libs").getSharedEmberAddons(),
                  emberApplicationFactory: (e) =>
                    e.get("rcp-fe-ember-libs").getEmberApplicationFactory(),
                }),
              )
              .then(function () {
                const r = e
                  .get("rcp-fe-lol-l10n")
                  .tra()
                  .overlay("/fe/lol-l10n/trans.json")
                  .overlay(n.TRANSLATION_PATH);
                t.default.tra = r;
                const a =
                    t.default.Viewport.fullScreen().getScreenRoot(
                      "rcp-fe-lol-honor",
                    ),
                  i = new (0, o(3).default)(a);
                return (t.default.api = i), {};
              });
          });
        },
        { once: !0 },
      );
    })();
})();
