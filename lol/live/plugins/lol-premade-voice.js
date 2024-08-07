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
                const l = e[a],
                  i = n._getValue(a, l);
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
      (e, t, n) => {
        "use strict";
        n.r(t);
      },
      (e, t, n) => {
        "use strict";
        var a = c(n(5)),
          l = c(n(49)),
          i = c(n(53)),
          o = c(n(62)),
          r = c(n(67)),
          s = n(1);
        function c(e) {
          return e && e.__esModule ? e : { default: e };
        }
        e.exports = function (e = document) {
          if (e.premadeVoiceElementsRegistered) return;
          const { registerCustomElementV1: t } = s.webComponents;
          t(l.default),
            t(a.default),
            t(o.default),
            t(i.default),
            t(r.default),
            (e.premadeVoiceElementsRegistered = !0);
        };
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = g(n(6)),
          l = n(1),
          i = g(n(7)),
          o = g(n(9)),
          r = g(n(10)),
          s = g(n(11)),
          c = g(n(12)),
          p = g(n(13)),
          d = g(n(14)),
          h = n(15),
          m = n(16),
          u = n(17),
          A = n(18),
          v = g(n(19));
        function g(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const C = "chatParticipantsKey";
        class b extends a.default {
          templateMarkup() {
            return n(20);
          }
          stylesheetMarkup() {
            return n(21);
          }
          constructor() {
            super(),
              (this._participants = []),
              (this._participantMap = new Map()),
              (this._multiUserChatId = null),
              (this._gameflowPhase = ""),
              (this._isGameClientRunning = !1),
              (this._lastVolumeUpdate = 0),
              (this._lockOutMemberJoinSound = !1),
              (this._clashRoster = null),
              (this._headerType = A.HEADER_LOBBY),
              (this._selectors = {
                voicePanel: ".lol-premade-voice-panel",
                currentPlayerChatIcon: ".lol-premade-voice-panel-cp-chat-icon",
                headerText: ".lol-premade-voice-panel-header-text",
                headerDefault: ".lol-premade-voice-panel-header-default",
                headerClash: ".lol-premade-voice-panel-header-clash",
                headerClashLogo: ".lol-premade-voice-panel-header-clash-logo",
                headerClashShortName:
                  ".lol-premade-voice-panel-header-clash-shortName",
                headerClashName: ".lol-premade-voice-panel-header-clash-name",
                currentPlayerContent:
                  ".lol-premade-voice-panel-current-player-content",
                currentPlayerVolume:
                  ".lol-premade-voice-panel-current-player-volume",
                currentPlayerVolumeLabel:
                  ".lol-premade-voice-panel-current-player-volume-label",
                currentPlayerName:
                  ".lol-premade-voice-panel-current-player-name lol-uikit-player-name",
                participants: ".lol-premade-voice-panel-participants",
                participantElement: "lol-parties-comm-participant",
                currentPlayerMic: ".lol-premade-voice-panel-current-player-mic",
                sliderElement: "lol-uikit-slider",
                connectionState: ".lol-premade-voice-panel-connection-state",
                connectionBar: ".lol-premade-voice-panel-connection-bar",
                connectionIcon: ".lol-premade-voice-panel-connection-icon",
                settingsButton:
                  ".lol-premade-voice-panel-current-player-settings",
                haloElement: ".voice-panel-current-player-halo",
                availability: ".lol-premade-voice-panel-availability",
                availabilityMessage: ".lol-premade-voice-panel-message",
              }),
              (this._listeners = {
                micLevelSlideChange: this._micLevelSlideChange.bind(this),
                micLevelSlideEnd: this._micLevelSlideEnd.bind(this),
                micLevelSlideStart: this._micLevelSlideStart.bind(this),
                mute: this._toggleMute.bind(this),
                connectionBarClicked: this._connectionClick.bind(this),
                connectionBarMouseEnter: this._connectionMouseEnter.bind(this),
                connectionBarMouseLeave: this._connectionMouseLeave.bind(this),
                settingsClicked: this._settingsClicked.bind(this),
                willShow: this._willShow.bind(this),
                willHide: this._willHide.bind(this),
                voiceButtonEnabled: this._voiceButtonEnabled.bind(this),
              }),
              this._initDataBinding();
          }
          connectedCallback() {
            if (
              (super.connectedCallback(),
              this._attachSliderTooltipDelegate(),
              this._refreshConnectionState(),
              this._setupHeader(),
              this.attachListener(
                "change",
                this._listeners.micLevelSlideChange,
                this._selectors.currentPlayerVolume,
              ),
              this.attachListener(
                "slideEnd",
                this._listeners.micLevelSlideEnd,
                this._selectors.currentPlayerVolume,
              ),
              this.attachListener(
                "slideStart",
                this._listeners.micLevelSlideStart,
                this._selectors.currentPlayerVolume,
              ),
              this.attachListener(
                "click",
                this._listeners.mute,
                this._selectors.currentPlayerMic,
              ),
              this._currentPlayerPuuid)
            ) {
              const e = this.shadowRoot.querySelector(
                this._selectors.currentPlayerName,
              );
              e && e.setAttribute("puuid", this._currentPlayerPuuid);
            }
            this.attachListener(
              "click",
              this._listeners.connectionBarClicked,
              this._selectors.connectionIcon,
            ),
              this.attachListener(
                "mouseover",
                this._listeners.connectionBarMouseEnter,
                this._selectors.connectionIcon,
              ),
              this.attachListener(
                "mouseout",
                this._listeners.connectionBarMouseLeave,
                this._selectors.connectionIcon,
              ),
              this.attachListener(
                "click",
                this._listeners.settingsClicked,
                this._selectors.settingsButton,
              ),
              this.addEventListener(
                "willShowVoicePanel",
                this._listeners.willShow,
              ),
              this.addEventListener(
                "willHideVoicePanel",
                this._listeners.willHide,
              ),
              this.addEventListener(
                "voiceButtonEnabled",
                this._listeners.voiceButtonEnabled,
              );
          }
          _setupHeader() {
            this.hide(this._selectors.headerClash),
              this.hide(this._selectors.headerDefault),
              this._headerType === A.HEADER_CLASH && this._clashRoster
                ? (this.addImg(
                    this._clashRoster.logoUrl,
                    this._selectors.headerClashLogo,
                  ),
                  this.addInnerHtml(
                    this._clashRoster.shortName,
                    this._selectors.headerClashShortName,
                  ),
                  this.addInnerHtml(
                    this._clashRoster.name,
                    this._selectors.headerClashName,
                  ),
                  this.show(this._selectors.headerClash))
                : (this.addInnerHtml(
                    l.tra.get("parties_comm_panel_header_text"),
                    this._selectors.headerText,
                  ),
                  this.show(this._selectors.headerDefault));
          }
          disconnectedCallback() {
            super.disconnectedCallback(),
              this.detachListener(
                "slideEnd",
                this._listeners.micLevelSlideEnd,
                this._selectors.currentPlayerVolume,
              ),
              this.detachListener(
                "click",
                this._listeners.mute,
                this._selectors.currentPlayerMic,
              ),
              this.detachListener(
                "click",
                this._listeners.connectionBarClicked,
                this._selectors.connectionIcon,
              ),
              this.detachListener(
                "mouseover",
                this._listeners.connectionBarMouseEnter,
                this._selectors.connectionIcon,
              ),
              this.detachListener(
                "mouseout",
                this._listeners.connectionBarMouseLeave,
                this._selectors.connectionIcon,
              ),
              this.detachListener(
                "click",
                this._listeners.settingsClicked,
                this._selectors.settingsButton,
              ),
              this.detachListener(
                "willShowVoicePanel",
                this._listeners.willShow,
              ),
              this.detachListener(
                "willHideVoicePanel",
                this._listeners.willHide,
              );
          }
          getComponentFolderPath() {
            return super.getComponentFolderPath(), "voice-panel";
          }
          _playJoinSound() {
            this._playSound(
              "/fe/lol-premade-voice/sfx-voicechat-notif-join.ogg",
            );
          }
          _playLeaveSound() {
            this._playSound(
              "/fe/lol-premade-voice/sfx-voicechat-notif-leave.ogg",
            );
          }
          _playDelayedJoinSound() {
            this._memberJoinTimeout = setTimeout(() => {
              this._playJoinSound(), (this._lockOutMemberJoinSound = !1);
            }, 1500);
          }
          availabilityUpdated(e) {
            (this._availability = e || {}),
              this._checkAvailabilityMessaging(),
              this._handleDisconnectedState(
                this._availability.showDisconnectedState,
              );
          }
          _handleDisconnectedState(e) {
            const t = this.shadowRoot.querySelector(
              this._selectors.currentPlayerVolume,
            );
            e
              ? (this._updateConnectionState(h.VOICE_DISCONNECTED_STATE),
                t && t.setAttribute("disabled", ""),
                this.addClass("disabled", this._selectors.currentPlayerContent))
              : (t && t.removeAttribute("disabled"),
                this.removeClass(
                  "disabled",
                  this._selectors.currentPlayerContent,
                )),
              this._updateCurrentPlayerMuteButton();
          }
          _showPanelMessage(e) {
            this.addInnerHtml(e, this._selectors.availabilityMessage),
              this.removeClass("hide", this._selectors.availability),
              this.addClass("hide", this._selectors.participants);
          }
          _hidePanelMessage() {
            this.removeClass("hide", this._selectors.participants),
              this.addClass("hide", this._selectors.availability);
          }
          _checkAvailabilityMessaging() {
            let e = null;
            if (!this._availability) return e;
            (e = this._outsideVoiceChannelMessaging()),
              e || (e = this._insideVoiceChannelMessaging()),
              this._availability.showDisconnectedState &&
                (e = l.tra.get("parties_comm_panel_error")),
              e ? this._showPanelMessage(e) : this._hidePanelMessage();
          }
          _outsideVoiceChannelMessaging() {
            let e = null;
            return (
              this._availability &&
                this._availability.voiceChannelAvailable &&
                0 === this._participants.length &&
                (e = l.tra.get("parties_comm_panel_msg_disconnected")),
              e
            );
          }
          _insideVoiceChannelMessaging() {
            let e = null;
            return (
              this._availability &&
                this._availability.voiceChannelAvailable &&
                this._participantMap.get(this._currentPlayerPuuid) &&
                1 === this._participants.length &&
                (e = l.tra.get("parties_comm_panel_msg_premade_no_channel")),
              e
            );
          }
          participantsUpdated(e) {
            (this._participants = e || []),
              (this._participantMap = new Map(
                this._participants.map((e) => [e.puuid, e]),
              )),
              this._removeOldParticipants(),
              this._updateParticipants(),
              this._refreshConnectionState();
          }
          _refreshConnectionState() {
            this._participants.length > 0
              ? this._updateConnectionState(h.VOICE_CONNECTED_STATE)
              : this._updateConnectionState(h.VOICE_DISCONNECTED_STATE),
              this._checkAvailabilityMessaging();
          }
          settingsUpdated(e) {
            (this._settings = e), this._updateCurrentParticipant();
          }
          lobbyUpdated(e) {
            const t = e || {};
            t.multiUserChatId &&
              t.multiUserChatId !== this._multiUserChatId &&
              (this._conversations &&
                this._chatParticipantsObserver(t.multiUserChatId),
              (this._headerType = A.HEADER_LOBBY)),
              (this._multiUserChatId = t.multiUserChatId);
          }
          clashRostersUpdated(e) {
            const t = (e || []).find(
              (e) => e.tournamentState !== m.CLASH_ROSTER_STATE.IDLE,
            );
            t &&
              t.multiUserChatId &&
              (t.multiUserChatId !== this._multiUserChatId &&
                (this._conversations &&
                  this._chatParticipantsObserver(t.multiUserChatId),
                (this._headerType = A.HEADER_CLASH),
                (this._clashRoster = t)),
              (this._multiUserChatId = t.multiUserChatId));
          }
          postgameStatsUpdated(e) {
            if (e && e.multiUserChatId) {
              const t = c.default.parseChatId(e.multiUserChatId);
              t !== this._multiUserChatId &&
                this._conversations &&
                this._chatParticipantsObserver(t),
                (this._multiUserChatId = t);
            }
          }
          gameflowSessionUpdated(e) {
            e &&
              e.gameClient &&
              ((this._isGameClientRunning = e.gameClient.running),
              this._updateSettingsButton());
          }
          sessionUpdated(e) {
            if (!e || "ERROR" === e.state) return;
            const t = !this._currentPlayerPuuid;
            if (
              ((this._currentPlayerPuuid = e.puuid),
              this._setVoiceHaloPuuid(this._currentPlayerPuuid),
              this._currentPlayerSummonerId !== e.summonerId)
            ) {
              this._currentPlayerSummonerId = e.summonerId;
              const t = this.shadowRoot.querySelector(
                this._selectors.currentPlayerName,
              );
              t && t.setAttribute("puuid", this._currentPlayerPuuid);
            }
            t && this._updateParticipants();
          }
          chatParticipantsUpdated(e) {
            (this._chatParticipants = e),
              e &&
                e.length > 0 &&
                e.forEach((e) => {
                  const t = this.shadowRoot.querySelector(
                    `[summoner-id="${e.summonerId}"]`,
                  );
                  t && t.updateChatParticipant(e);
                });
          }
          currentPlayerChatInfoUpdated(e) {
            if (!e) return;
            const { availability: t } = e,
              n = e.icon,
              a = this.shadowRoot.querySelector(
                this._selectors.currentPlayerChatIcon,
              );
            a &&
              t &&
              n &&
              (a.setAttribute("availability", t), a.setAttribute("icon-id", n));
          }
          conversationsUpdated(e) {
            (this._conversations = e),
              this._chatParticipantsObserver(this._multiUserChatId);
          }
          _chatParticipantsObserver(e) {
            if ((p.default.removeObservers(C), this._conversations && e)) {
              const t = this._conversations.find((t) => t.id.indexOf(e) > -1);
              t &&
                (p.default.createObserver(
                  C,
                  `/v1/conversations/${encodeURIComponent(t.id)}/participants`,
                ),
                p.default.observe(C, this.chatParticipantsUpdated.bind(this)));
            }
          }
          _chatParticipant(e) {
            let t = null;
            return (
              this._chatParticipants &&
                this._chatParticipants.length > 0 &&
                (t = this._chatParticipants.find((t) => t.summonerId === e)),
              t
            );
          }
          _getTranslatedString(e) {
            return l.tra.get(`parties_comm_panel_state_${e}`);
          }
          _updateConnectionState(e) {
            const t = this._connectionState;
            t !== e &&
              ((this._connectionState = e),
              this.removeClass(t, this._selectors.connectionBar),
              this.addClass(
                this._connectionState,
                this._selectors.connectionBar,
              ),
              this.addInnerHtml(
                this._getTranslatedString(this._connectionState),
                this._selectors.connectionState,
              ));
          }
          _isVoiceEligible() {
            return 0 !== this._participants.length;
          }
          _connectionMouseEnter() {
            this._connectionState === h.VOICE_DISCONNECTED_STATE
              ? this.addInnerHtml(
                  l.tra.get("parties_comm_panel_connect_text"),
                  this._selectors.connectionState,
                )
              : this._connectionState === h.VOICE_CONNECTED_STATE &&
                this.addInnerHtml(
                  l.tra.get("parties_comm_panel_disconnect_text"),
                  this._selectors.connectionState,
                ),
              this.addClass("button-hover", this._selectors.connectionBar);
          }
          _connectionMouseLeave() {
            this.addClass(this._connectionState),
              this.removeClass("button-hover", this._selectors.connectionBar),
              this.addInnerHtml(
                this._getTranslatedString(this._connectionState),
                this._selectors.connectionState,
              );
          }
          _connectionClick() {
            return (
              this._lockConnectionButton(),
              setTimeout(() => {
                this._unlockConnectionButton();
              }, 1e3),
              this._connectionState === h.VOICE_DISCONNECTED_STATE
                ? (this._updateConnectionState(h.VOICE_CONNECTING_STATE),
                  (this._lockOutMemberJoinSound = !0),
                  i.default
                    .connect()
                    .then(this._joinVoiceSessionSuccess.bind(this))
                    .catch(this._joinVoiceSessionFailed.bind(this)))
                : this._connectionState === h.VOICE_CONNECTED_STATE
                  ? i.default
                      .disconnect()
                      .then(this._leaveVoiceSessionSuccess.bind(this))
                  : void 0
            );
          }
          _lockConnectionButton() {
            this.addClass("locked", this._selectors.connectionIcon);
          }
          _unlockConnectionButton() {
            this.removeClass("locked", this._selectors.connectionIcon);
          }
          _leaveVoiceSessionSuccess() {
            this._updateConnectionState(h.VOICE_DISCONNECTED_STATE),
              this._playLeaveSound();
          }
          _joinVoiceSessionSuccess() {
            this._updateConnectionState(h.VOICE_CONNECTED_STATE),
              this._playJoinSound(),
              clearTimeout(this._memberJoinTimeout),
              (this._memberJoinTimeout = setTimeout(() => {
                this._lockOutMemberJoinSound = !1;
              }, 500));
          }
          _joinVoiceSessionFailed(e) {
            if (e && e.data) {
              this._lockOutMemberJoinSound = !1;
              const t = e.data.message;
              l.logger.warning(`Failed to join voice channel: ${t}`),
                this._updateConnectionState(h.VOICE_DISCONNECTED_STATE);
            }
          }
          _removeOldParticipants() {
            const e = this.shadowRoot.querySelectorAll(
              this._selectors.participantElement,
            );
            if (e && e.length > 0) {
              const t = Array.from(e);
              let n = !1;
              t.forEach((e) => {
                const t = e.getAttribute("participant-id");
                this._participantMap.get(t) || (e.remove(), (n = !0));
              }),
                n && this._playLeaveSound();
            }
          }
          _updateParticipants() {
            if (
              this._participants &&
              this._participants.length > 0 &&
              this._currentPlayerPuuid
            ) {
              let e = 0;
              this._participants.forEach((t) => {
                if (t.puuid !== this._currentPlayerPuuid) {
                  this._updateMemberParticipant(t) || (e += 1);
                }
              }),
                e > 0 &&
                  !this._lockOutMemberJoinSound &&
                  this._playDelayedJoinSound();
            }
          }
          _updateMemberParticipant(e) {
            const t = this.shadowRoot.querySelector(
              `[participant-id="${e.puuid}"]`,
            );
            return t
              ? (t.updateSelf(e), !0)
              : (this.addChildElement(
                  this._createParticipantElement(e),
                  this._selectors.participants,
                ),
                !1);
          }
          _updateCurrentParticipant() {
            this._updateCurrentPlayerMuteButton();
            let e = 0;
            this._settings &&
              this._settings.micLevel &&
              this._settings.micLevel > 0 &&
              (e = this._settings.micLevel),
              this._updateCurrentPlayerVolume(e, !this._micLevelUpdating);
          }
          _updateCurrentPlayerVolume(e, t = !0) {
            const n = this.shadowRoot.querySelector(
              this._selectors.sliderElement,
            );
            if (
              (n && !this._micLevelUpdating && n.setAttribute("value", e), t)
            ) {
              const t = l.tra.formatString(
                "parties_comm_panel_slider_percentage",
                { percentage: e },
              );
              this.addInnerHtml(t, this._selectors.currentPlayerVolumeLabel);
            }
          }
          _updateSettingsButton() {
            this._isGameClientRunning
              ? this.addClass("disabled", this._selectors.settingsButton)
              : this.removeClass("disabled", this._selectors.settingsButton),
              this._attachSettingsTooltip();
          }
          _micLevelSlideEnd(e) {
            (this._micLevelUpdating = !1), this._micLevelSlideChange(e, !0);
          }
          _micLevelSlideStart() {
            this._micLevelUpdating = !0;
          }
          _micLevelSlideChange(e, t = !1) {
            if ((this._updateCurrentPlayerVolume(e.value), !t)) {
              const e = new Date().getTime();
              if (e - this._lastVolumeUpdate < 250) return;
              this._lastVolumeUpdate = e;
            }
            i.default.changeMicLevelSelf(e.value);
          }
          _updateCurrentPlayerMuteButton() {
            this._availability &&
              this._settings &&
              (this._availability.showDisconnectedState ||
              this._settings.inputMode === u.INPUT_MODE_PUSH_TO_TALK
                ? (this.addClass("disabled", this._selectors.currentPlayerMic),
                  this.removeClass("muted", this._selectors.currentPlayerMic))
                : (this.removeClass(
                    "disabled",
                    this._selectors.currentPlayerMic,
                  ),
                  this._settings && this._settings.localMicMuted
                    ? this.addClass("muted", this._selectors.currentPlayerMic)
                    : this.removeClass(
                        "muted",
                        this._selectors.currentPlayerMic,
                      )),
              this._attachMuteSelfTooltip());
          }
          _createParticipantElement(e) {
            const t = document.createElement(
              this._selectors.participantElement,
            );
            t.setAttribute("participant-id", e.puuid),
              t.setAttribute("summoner-id", e.summonerId),
              t.updateSelf(e);
            const n = this._chatParticipant(e.summonerId);
            return t.updateChatParticipant(n), t;
          }
          _initDataBinding() {
            (this.lobbyDataListener = this.lobbyUpdated.bind(this)),
              s.default.observe("lobby", this.lobbyDataListener),
              s.default.lobby().then(this.lobbyDataListener),
              (this.clashChatListener = this.clashRostersUpdated.bind(this)),
              d.default.observe("rosters", this.clashChatListener),
              d.default.clashRosters().then(this.clashChatListener),
              (this.gameflowSessionListener =
                this.gameflowSessionUpdated.bind(this)),
              o.default.observe("session", this.gameflowSessionListener),
              o.default.session().then(this.gameflowSessionListener),
              (this.postgameStatsListener =
                this.postgameStatsUpdated.bind(this)),
              c.default.observe("stats", this.postgameStatsListener),
              c.default.stats().then(this.postgameStatsListener),
              (this.availabilityDataListener =
                this.availabilityUpdated.bind(this)),
              i.default.observe("availability", this.availabilityDataListener),
              i.default.availability().then(this.availabilityDataListener),
              (this.participantsDataListener =
                this.participantsUpdated.bind(this)),
              i.default.observe("participants", this.participantsDataListener),
              i.default.participants().then(this.participantsDataListener),
              (this.settingsDataListener = this.settingsUpdated.bind(this)),
              i.default.observe("settings", this.settingsDataListener),
              i.default.settings().then(this.settingsDataListener),
              (this.sessionDataListener = this.sessionUpdated.bind(this)),
              r.default.observe("session", this.sessionDataListener),
              r.default.session().then(this.sessionDataListener),
              (this.currentPlayerChatInfoListener =
                this.currentPlayerChatInfoUpdated.bind(this)),
              p.default.observe("me", this.currentPlayerChatInfoListener),
              p.default.me().then(this.currentPlayerChatInfoListener),
              (this.conversationsListener =
                this.conversationsUpdated.bind(this)),
              p.default.observe("conversations", this.conversationsListener),
              p.default.conversations().then(this.conversationsListener);
          }
          _toggleMute() {
            this._settings &&
              this._settings.inputMode !== u.INPUT_MODE_PUSH_TO_TALK &&
              i.default.muteSelf(!this._settings.localMicMuted);
          }
          _settingsClicked() {
            this._isGameClientRunning ||
              l.SettingsApi.show(u.SETTINGS_CATEGORY_NAME);
          }
          _setVoiceHaloPuuid(e) {
            const t = e || "",
              n = this.shadowRoot.querySelector(this._selectors.haloElement);
            n && n.setAttribute("puuid", t);
          }
          _attachMuteSelfTooltip() {
            if (!this._settings || !this._settings.inputMode) return;
            const e = this.shadowRoot.querySelector(
              this._selectors.currentPlayerMic,
            );
            let t;
            (t =
              this._settings.inputMode === u.INPUT_MODE_PUSH_TO_TALK
                ? l.tra.get("parties_comm_panel_tooltip_mute_disabled")
                : this._settings.localMicMuted
                  ? l.tra.get("parties_comm_panel_tooltip_unmute_self")
                  : l.tra.get("parties_comm_panel_tooltip_mute_self")),
              v.default.attachSmallTooltip(e, t);
          }
          _attachSettingsTooltip() {
            const e = this.shadowRoot.querySelector(
              this._selectors.settingsButton,
            );
            let t;
            (t = this._isGameClientRunning
              ? l.tra.get("parties_comm_panel_tooltip_settings_disabled")
              : l.tra.get("parties_comm_panel_tooltip_settings")),
              v.default.attachSmallTooltip(e, t);
          }
          _willHide() {
            this.removeClass("show", this._selectors.voicePanel),
              this._playSound(
                "/fe/lol-premade-voice/sfx-soc-ui-chatwindow-close.ogg",
              );
          }
          _willShow() {
            this.addClass("show", this._selectors.voicePanel);
          }
          _voiceButtonEnabled() {
            this._participants.length > 0 &&
              ((this._lockOutMemberJoinSound = !0),
              this._playDelayedJoinSound());
          }
          _attachSliderTooltipDelegate() {
            const e = this.shadowRoot.querySelector(
              this._selectors.sliderElement,
            );
            e &&
              e.setTooltipContentDelegate(function (e) {
                return l.tra.formatString(
                  "parties_comm_panel_tooltip_mic_level",
                  { value: e },
                );
              });
          }
        }
        b.tagName = "lol-parties-comm-panel";
        var _ = b;
        t.default = _;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        class l extends a.webComponents.ShadowElement {
          addClass(e, t) {
            const n = t ? this.shadowRoot.querySelector(t) : this;
            n && !n.classList.contains(e) && n.classList.add(e);
          }
          removeClass(e, t) {
            const n = t ? this.shadowRoot.querySelector(t) : this;
            n && n.classList.contains(e) && n.classList.remove(e);
          }
          attachListener(e, t, n) {
            const a = n ? this.shadowRoot.querySelector(n) : this;
            a && a.addEventListener(e, t);
          }
          detachListener(e, t, n) {
            const a = n ? this.shadowRoot.querySelector(n) : this;
            a && a.removeEventListener(e, t);
          }
          addInnerHtml(e, t) {
            const n = t ? this.shadowRoot.querySelector(t) : this;
            n && (n.innerHTML = e);
          }
          addImg(e, t) {
            const n = t ? this.shadowRoot.querySelector(t) : this;
            n && (n.src = e);
          }
          show(e) {
            const t = e ? this.shadowRoot.querySelector(e) : this;
            t && t.style && (t.style.display = "");
          }
          hide(e) {
            const t = e ? this.shadowRoot.querySelector(e) : this;
            t && t.style && (t.style.display = "none");
          }
          addChildElement(e, t) {
            const n = t ? this.shadowRoot.querySelector(t) : this;
            n && n.appendChild(e);
          }
          _playSound(e) {
            if (!1 === e) return;
            a.Audio.getChannel("sfx-ui").createSound(e).play();
          }
        }
        var i = l;
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a,
          l = (a = n(8)) && a.__esModule ? a : { default: a };
        class i extends l.default {
          constructor() {
            super(),
              (this._voiceBinding = this.dataBinding("/lol-premade-voice")),
              this.createObserver("availability", "/v1/availability"),
              this.createObserver("participants", "/v1/participants"),
              this.createObserver("settings", "/v1/settings"),
              this.createObserver("mictest", "/v1/mic-test"),
              this.createObserver("firstExperience", "/v1/first-experience");
          }
          availability() {
            return this._voiceBinding.get("/v1/availability");
          }
          participants() {
            return this._voiceBinding.get("/v1/participants");
          }
          settings() {
            return this._voiceBinding.get("/v1/settings");
          }
          firstExperience() {
            return this._voiceBinding.get("/v1/first-experience");
          }
          mute(e, t) {
            const n = `/v1/participants/${e}/mute`;
            return this._voiceBinding.put(n, t ? 1 : 0);
          }
          changeVolume(e, t) {
            const n = `/v1/participants/${e}/volume`;
            return this._voiceBinding.put(n, t);
          }
          muteSelf(e) {
            return this._voiceBinding.put("/v1/self/mute", e ? 1 : 0);
          }
          changeMicLevelSelf(e) {
            return this._voiceBinding.put("/v1/self/micLevel", e);
          }
          connect() {
            return this._voiceBinding.post("/v1/session");
          }
          disconnect() {
            return this._voiceBinding.delete("/v1/session");
          }
          startMicTest() {
            return this._voiceBinding.post("/v1/mic-test");
          }
          stopMicTest() {
            return this._voiceBinding.delete("/v1/mic-test");
          }
          firstExperienceCompleted() {
            return this._voiceBinding.post("/v1/first-experience/lcu");
          }
        }
        var o = new i();
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = (function (e, t) {
          if (!t && e && e.__esModule) return e;
          if (null === e || ("object" != typeof e && "function" != typeof e))
            return { default: e };
          var n = l(t);
          if (n && n.has(e)) return n.get(e);
          var a = {},
            i = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var o in e)
            if ("default" !== o && Object.prototype.hasOwnProperty.call(e, o)) {
              var r = i ? Object.getOwnPropertyDescriptor(e, o) : null;
              r && (r.get || r.set)
                ? Object.defineProperty(a, o, r)
                : (a[o] = e[o]);
            }
          (a.default = e), n && n.set(e, a);
          return a;
        })(n(1));
        function l(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (l = function (e) {
            return e ? n : t;
          })(e);
        }
        var i = class {
          constructor() {
            (this._observers = {}), (this._binding = null);
          }
          dataBinding(e) {
            return (
              (this._binding = (0, a.dataBinding)(
                e,
                a.default.getProvider().getSocket(),
              )),
              this._binding
            );
          }
          createObserver(e, t) {
            e &&
              t &&
              ((this._observers[e] = { path: t, callbacks: [] }),
              this._binding &&
                this._binding.observe(t, this, (t) => {
                  this._publishToObserver(this._observers[e], t);
                }));
          }
          observe(e, t) {
            t &&
              e &&
              this._observers[e] &&
              this._observers[e].callbacks.push(t);
          }
          removeObservers(e) {
            if (!e) return;
            const t = this._observers[e];
            t &&
              (this._binding && this._binding.unobserve(t.path, this),
              delete this._observers[e]);
          }
          _publishToObserver(e, t) {
            const { callbacks: n } = e;
            n &&
              n.length > 0 &&
              n.forEach((e) => {
                "function" == typeof e && e(t);
              });
          }
        };
        t.default = i;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a,
          l = (a = n(8)) && a.__esModule ? a : { default: a };
        class i extends l.default {
          constructor() {
            super(),
              (this._gameflowBinding = this.dataBinding("/lol-gameflow")),
              this.createObserver("session", "/v1/session");
          }
          session() {
            return this._gameflowBinding.get("/v1/session");
          }
        }
        var o = new i();
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a,
          l = (a = n(8)) && a.__esModule ? a : { default: a };
        class i extends l.default {
          constructor() {
            super(),
              (this._loginBinding = this.dataBinding("/lol-login")),
              this.createObserver("session", "/v1/session");
          }
          session() {
            return this._loginBinding.get("v1/session");
          }
        }
        var o = new i();
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a,
          l = (a = n(8)) && a.__esModule ? a : { default: a };
        class i extends l.default {
          constructor() {
            super(),
              (this._lobbyBinding = this.dataBinding("/lol-lobby")),
              this.createObserver("lobby", "/v2/lobby");
          }
          lobby() {
            return this._lobbyBinding.get("/v2/lobby");
          }
        }
        var o = new i();
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a,
          l = (a = n(8)) && a.__esModule ? a : { default: a };
        class i extends l.default {
          constructor() {
            super(),
              (this._postgameBinding = this.dataBinding("/lol-end-of-game")),
              this.createObserver("stats", "/v1/eog-stats-block");
          }
          stats() {
            return this._postgameBinding.get("/v1/eog-stats-block");
          }
          parseChatId(e) {
            return e ? e.replace(/@.*$/, "").toLowerCase() : "";
          }
        }
        var o = new i();
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a,
          l = (a = n(8)) && a.__esModule ? a : { default: a };
        class i extends l.default {
          constructor() {
            super(),
              (this._chatBinding = this.dataBinding("/lol-chat")),
              this.createObserver("me", "/v1/me"),
              this.createObserver("conversations", "/v1/conversations");
          }
          me() {
            return this._chatBinding.get("/v1/me");
          }
          conversations() {
            return this._chatBinding.get("/v1/conversations");
          }
        }
        var o = new i();
        t.default = o;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a,
          l = (a = n(8)) && a.__esModule ? a : { default: a };
        class i extends l.default {
          constructor() {
            super(),
              (this._clashBinding = this.dataBinding("/lol-clash")),
              this.createObserver("rosters", "/v1/player/chat-rosters");
          }
          clashRosters() {
            return this._clashBinding.get("/v1/player/chat-rosters");
          }
        }
        var o = new i();
        t.default = o;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.VOICE_DISCONNECTED_STATE =
            t.VOICE_CONNECTING_STATE =
            t.VOICE_CONNECTED_STATE =
              void 0);
        t.VOICE_CONNECTED_STATE = "connected";
        t.VOICE_DISCONNECTED_STATE = "disconnected";
        t.VOICE_CONNECTING_STATE = "connecting";
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.CLASH_ROSTER_STATE = void 0);
        t.CLASH_ROSTER_STATE = {
          IDLE: "IDLE",
          LOCK_IN: "LOCK_IN",
          IN_GAME: "IN_GAME",
          RESULTS: "RESULTS",
        };
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.SETTINGS_CATEGORY_NAME =
            t.INPUT_MODE_VOICE =
            t.INPUT_MODE_PUSH_TO_TALK =
              void 0);
        t.SETTINGS_CATEGORY_NAME = "lol-premade-voice";
        t.INPUT_MODE_VOICE = "voiceActivity";
        t.INPUT_MODE_PUSH_TO_TALK = "pushToTalk";
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.HEADER_LOBBY = t.HEADER_CLASH = void 0);
        t.HEADER_LOBBY = "header-lobby";
        t.HEADER_CLASH = "header-clash";
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1);
        var l = {
          attachSmallTooltip: function (e, t, n, l, i) {
            if (!e || !t) return;
            (n = n || { x: "center", y: "top" }),
              (l = l || { x: "center", y: "bottom" }),
              (i = 0 === i || i ? i : 400),
              a.TooltipManager.unassign(e);
            const o = document.createElement("lol-uikit-tooltip"),
              r = document.createElement("lol-uikit-content-block");
            r.setAttribute("type", "tooltip-system");
            const s = document.createElement("p");
            (s.innerHTML = t),
              r.appendChild(s),
              o.appendChild(r),
              a.TooltipManager.assign(e, o, null, {
                targetAnchor: n,
                tooltipAnchor: l,
                showDelay: i,
              });
          },
          removeTooltip: function (e) {
            a.TooltipManager.unassign(e);
          },
        };
        t.default = l;
      },
      (e) => {
        "use strict";
        e.exports =
          '<template>\r\n  <div class="lol-premade-voice-panel">\r\n    <div class="lol-premade-voice-panel-header">\r\n      <div class="lol-premade-voice-panel-header-default">\r\n        <div class="lol-premade-voice-panel-header-text"></div>\r\n      </div>\r\n      <div class="lol-premade-voice-panel-header-clash">\r\n          <img class="lol-premade-voice-panel-header-clash-logo"></img>\r\n          <div class="lol-premade-voice-panel-header-clash-title">\r\n            <div class="lol-premade-voice-panel-header-clash-shortName"></div>\r\n            <div class="lol-premade-voice-panel-header-clash-name"></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    <lol-uikit-scrollable class="lol-premade-voice-panel-participants lol-premade-voice-panel-content">\r\n    </lol-uikit-scrollable>\r\n    <div class="lol-premade-voice-panel-availability lol-premade-voice-panel-content hide">\r\n      <div class="lol-premade-voice-panel-poro"></div>\r\n      <div class="lol-premade-voice-panel-message"></div>\r\n    </div>\r\n    <div class="lol-premade-voice-panel-connection-bar">\r\n      <div class="lol-premade-voice-panel-connection-state"></div>\r\n      <div class="lol-premade-voice-panel-connection-icon"></div>\r\n    </div>\r\n    <div class="lol-premade-voice-panel-current-player">\r\n      <div class="lol-premade-voice-panel-player-highlight"></div>\r\n      <div class="voice-panel-avatar-wrapper">\r\n        <lol-parties-comm-halo class="voice-panel-current-player-halo" size="small">\r\n          <lol-social-avatar-icon\r\n            class="lol-premade-voice-panel-cp-chat-icon"\r\n            icon-id=""\r\n            availability=""\r\n            show-availability="true">\r\n          </lol-social-avatar-icon>\r\n        </lol-parties-comm-halo>\r\n      </div>\r\n      <div class="lol-premade-voice-panel-current-player-content">\r\n        <div class="lol-premade-voice-panel-current-player-row">\r\n          <div class="lol-premade-voice-panel-current-player-name">\r\n            <lol-uikit-player-name format="tooltip" puuid=""/>\r\n          </div>\r\n          <div class="lol-premade-voice-panel-current-player-volume-label"></div>\r\n        </div>\r\n        <lol-uikit-slider\r\n          for="currentPlayerVolume"\r\n          percentage\r\n          value="0"\r\n          class="lol-premade-voice-panel-current-player-volume"\r\n          clickset="true">\r\n        </lol-uikit-slider>\r\n      </div>\r\n      <div class="lol-premade-voice-panel-current-player-buttons">\r\n        <div class="lol-premade-voice-panel-current-player-mic"></div>\r\n        <div class="lol-premade-voice-panel-current-player-deafen"></div>\r\n        <div class="lol-premade-voice-panel-current-player-settings"></div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <slot></slot>\r\n</template>\r\n';
      },
      (e, t, n) => {
        var a = n(22),
          l = n(23),
          i = n(24),
          o = n(25),
          r = n(26),
          s = n(27),
          c = n(28),
          p = n(29),
          d = n(30),
          h = n(31),
          m = n(32),
          u = n(33),
          A = n(34),
          v = n(35),
          g = n(36),
          C = n(37),
          b = n(38),
          _ = n(39),
          f = n(40),
          E = n(41),
          y = n(42),
          B = n(43),
          x = n(44),
          k = n(45),
          w = n(46),
          S = n(47),
          T = n(48),
          D = l(a),
          P = i(o),
          L = i(r),
          O = i(s),
          M = i(c),
          I = i(p),
          N = i(d),
          U = i(h),
          R = i(m),
          V = i(u),
          j = i(A),
          Y = i(v),
          H = i(g),
          z = i(C),
          F = i(b),
          W = i(_),
          q = i(f),
          G = i(E),
          Z = i(y),
          X = i(B),
          J = i(x),
          $ = i(k),
          K = i(w),
          Q = i(S),
          ee = i(T);
        D.push([
          e.id,
          '.lol-premade-voice-panel .lol-premade-voice-panel-header,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName {\n  font-family: var(--font-display);\n}\n.lol-premade-voice-panel,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash,\n.lol-premade-voice-panel .lol-premade-voice-panel-availability .lol-premade-voice-panel-message {\n  font-family: var(--font-body);\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName {\n  font-family: var(--font-display);\n}\n.lol-premade-voice-panel,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash,\n.lol-premade-voice-panel .lol-premade-voice-panel-availability .lol-premade-voice-panel-message {\n  font-family: var(--font-body);\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName {\n  -webkit-user-select: none;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName {\n  text-transform: uppercase;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text:lang(ko-kr),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName:lang(ko-kr),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text:lang(ja-jp),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName:lang(ja-jp),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text:lang(tr-tr),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName:lang(tr-tr),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text:lang(el-gr),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName:lang(el-gr),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text:lang(th-th),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName:lang(th-th),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text:lang(zh-tw),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName:lang(zh-tw) {\n  text-transform: none;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName {\n  color: #f0e6d2;\n  font-size: 18px;\n  font-weight: 700;\n  line-height: 22px;\n  letter-spacing: 0.05em;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName:lang(ar-ae) {\n  letter-spacing: 0;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text {\n  color: #f0e6d2;\n  font-size: 14px;\n  font-weight: 700;\n  line-height: 18px;\n  letter-spacing: 0.075em;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text:lang(ar-ae) {\n  letter-spacing: 0;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash {\n  color: #a09b8c;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 20px;\n  letter-spacing: 0.025em;\n  -webkit-font-smoothing: subpixel-antialiased;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash:lang(ar-ae) {\n  letter-spacing: 0;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash {\n  color: #f0e6d2;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player-content lol-uikit-slider {\n  width: 155px;\n  height: 15px;\n  --slider-base-before-top: 7px;\n  --slider-btn-cursor: pointer;\n  --slider-btn-width: 15px;\n  --slider-btn-height: 15px;\n  --slider-btn-hover-background-position: 0 -15px;\n  --slider-btn-active-background-position: 0 -30px;\n  --slider-fill-top: 6px;\n}\n:host {\n  width: 288px;\n  overflow: hidden;\n}\n.lol-premade-voice-panel {\n  display: flex;\n  flex-direction: column;\n  background: #010a13;\n  border: thin solid #1e2328;\n  cursor: default;\n  opacity: 0;\n  transform: translateY(350px);\n  transform-origin: center bottom;\n  transition: transform 500ms cubic-bezier(0.02, 0.85, 0.08, 0.99), opacity 300ms ease;\n  position: relative;\n}\n.lol-premade-voice-panel:lang(ar-ae) {\n  direction: rtl;\n}\n.lol-premade-voice-panel.show {\n  opacity: 1;\n  transform: translateY(0);\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  width: 100%;\n  height: 47px;\n  border-bottom: thin solid #463714;\n  align-items: center;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text {\n  display: flex;\n  flex-direction: column;\n  font-size: 14px;\n  color: #f0e6d2;\n  margin: 0 0 0 8px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text:lang(ar-ae) {\n  margin: 0 8px 0 0;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash {\n  display: none;\n  color: #f0e6d2;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  height: 47px;\n  padding-left: 8px;\n  box-sizing: border-box;\n  flex-shrink: 0;\n  overflow: hidden;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-logo {\n  display: inline;\n  height: 32px;\n  width: 32px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName {\n  color: #c8aa6e;\n  flex-direction: row;\n  margin-left: 7px;\n  margin-right: 7px;\n  display: inline;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-name {\n  text-overflow: ellipsis;\n  max-width: 150px;\n  flex-direction: row;\n  display: inline;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-content {\n  display: flex;\n  height: 216px;\n  padding: 0px 11px;\n  box-sizing: border-box;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-participants {\n  flex-direction: column;\n  visibility: visible;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-participants lol-parties-comm-participant {\n  height: 54px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-participants.hide {\n  visibility: hidden;\n  margin: 0px;\n  height: 0px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-availability {\n  flex-direction: column;\n  align-items: center;\n  color: #3c3c41;\n  justify-content: center;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-availability .lol-premade-voice-panel-poro {\n  background-image: url(' +
            P +
            ");\n  background-size: cover;\n  width: 128px;\n  height: 128px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-availability .lol-premade-voice-panel-message {\n  width: 180px;\n  text-align: center;\n  font-size: 14px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-availability.hide {\n  display: none;\n  margin: 0px;\n  height: 0px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar {\n  display: flex;\n  justify-content: space-between;\n  height: 32px;\n  width: 100%;\n  align-items: center;\n  background: linear-gradient(to top, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);\n  border-bottom: thin solid #1e2328;\n  cursor: default;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar:hover {\n  background: rgba(255,255,255,0.1);\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.connected {\n  color: #3cb44b;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.connected.button-hover {\n  color: #f0e6d2;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.connected .lol-premade-voice-panel-connection-icon {\n  background-image: url(" +
            L +
            ");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.connected .lol-premade-voice-panel-connection-icon:hover {\n  background-image: url(" +
            O +
            ");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.connected .lol-premade-voice-panel-connection-icon:active {\n  background-image: url(" +
            M +
            ");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.disconnected {\n  color: #a09b8c;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.disconnected.button-hover {\n  color: #f0e6d2;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.disconnected .lol-premade-voice-panel-connection-icon {\n  background-image: url(" +
            I +
            ");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.disconnected .lol-premade-voice-panel-connection-icon:hover {\n  background-image: url(" +
            N +
            ");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.disconnected .lol-premade-voice-panel-connection-icon:active {\n  background-image: url(" +
            U +
            ");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.connecting {\n  color: #cdbe91;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar .lol-premade-voice-panel-connection-state {\n  font-size: 14px;\n  flex-grow: 1;\n  margin: 0 0 0 7px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar .lol-premade-voice-panel-connection-state:lang(ar-ae) {\n  margin: 0 7px 0 0;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar .lol-premade-voice-panel-connection-icon {\n  background-size: cover;\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n  margin: 0 7px 0 0;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar .lol-premade-voice-panel-connection-icon:lang(ar-ae) {\n  margin: 0 0 0 7px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar .lol-premade-voice-panel-connection-icon.locked {\n  pointer-events: none;\n  opacity: 0.3;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player {\n  display: flex;\n  flex-direction: row;\n  height: 54px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player:hover {\n  background: linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-player-highlight {\n  display: flex;\n  width: 7px;\n  background-color: #785a28;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-buttons {\n  display: flex;\n  position: absolute;\n  bottom: 11px;\n  right: 11px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-buttons:lang(ar-ae) {\n  right: auto;\n  left: 11px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-mic {\n  background-image: url(" +
            R +
            ");\n  background-size: cover;\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-mic:hover {\n  background-image: url(" +
            V +
            ");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-mic:active {\n  background-image: url(" +
            j +
            ");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-mic.muted {\n  background-image: url(" +
            Y +
            ");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-mic.muted:hover {\n  background-image: url(" +
            H +
            ");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-mic.muted:active {\n  background-image: url(" +
            z +
            ");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-mic.disabled {\n  background-image: url(" +
            F +
            ");\n  cursor: default;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-deafen {\n  background-image: url(" +
            W +
            ");\n  background-size: cover;\n  width: 18px;\n  height: 18px;\n  margin: 0 5px 0 5px;\n  cursor: pointer;\n  display: none;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-deafen:hover {\n  background-image: url(" +
            q +
            ");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-deafen:active {\n  background-image: url(" +
            G +
            ");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-deafen.deafened {\n  background-image: url(" +
            Z +
            ");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-deafen.deafened:hover {\n  background-image: url(" +
            X +
            ");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-deafen.deafened:active {\n  background-image: url(" +
            J +
            ");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-settings {\n  background-image: url(" +
            $ +
            ");\n  background-size: cover;\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-settings:hover {\n  background-image: url(" +
            K +
            ");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-settings:active {\n  background-image: url(" +
            Q +
            ");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-settings.disabled,\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-settings .disabled:hover,\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-settings .disabled:active {\n  background-image: url(" +
            ee +
            ");\n  cursor: default;\n}\n.lol-premade-voice-panel .voice-panel-avatar-wrapper {\n  align-self: center;\n  margin: 0 8px 0 4px;\n}\n.lol-premade-voice-panel .voice-panel-avatar-wrapper:lang(ar-ae) {\n  margin: 0 4px 0 8px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player-content {\n  display: flex;\n  flex-direction: column;\n  font-size: 14px;\n  color: #cdbe91;\n  margin: 11px 0 11px 3px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player-content:lang(ar-ae) {\n  margin: 11px 3px 11px 0;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player-content .lol-premade-voice-panel-current-player-row {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player-content .lol-premade-voice-panel-current-player-row .lol-premade-voice-panel-current-player-name {\n  max-width: 130px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player-content .lol-premade-voice-panel-current-player-row .lol-premade-voice-panel-current-player-volume-label {\n  margin: 0 2px 0 0;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player-content .lol-premade-voice-panel-current-player-row .lol-premade-voice-panel-current-player-volume-label:lang(ar-ae) {\n  margin: 0 0 0 2px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player-content.disabled {\n  color: #3c3c41;\n}\n",
          "",
          {
            version: 3,
            sources: [
              "webpack://./fe/rcp-fe-lol-premade-voice/src/elements/voice-panel/style.styl",
            ],
            names: [],
            mappings:
              "AAAA;;;EAGE,gCAAgC;AAClC;AACA;;;EAGE,6BAA6B;AAC/B;AACA;;;EAGE,gCAAgC;AAClC;AACA;;;EAGE,6BAA6B;AAC/B;AACA;;;EAGE,yBAAyB;AAC3B;AACA;;;EAGE,oBAAoB;EACpB,uCAAuC;EACvC,mCAAmC;AACrC;AACA;;EAEE,yBAAyB;AAC3B;AACA;;;;;;;;;;;;EAYE,oBAAoB;AACtB;AACA;EACE,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,iBAAiB;EACjB,sBAAsB;AACxB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,cAAc;EACd,eAAe;EACf,gBAAgB;EAChB,iBAAiB;EACjB,uBAAuB;AACzB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,cAAc;EACd,eAAe;EACf,mBAAmB;EACnB,iBAAiB;EACjB,uBAAuB;EACvB,4CAA4C;AAC9C;AACA;EACE,iBAAiB;AACnB;AACA;EACE,cAAc;AAChB;AACA;EACE,YAAY;EACZ,YAAY;EACZ,6BAA6B;EAC7B,4BAA4B;EAC5B,wBAAwB;EACxB,yBAAyB;EACzB,+CAA+C;EAC/C,gDAAgD;EAChD,sBAAsB;AACxB;AACA;EACE,YAAY;EACZ,gBAAgB;AAClB;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,0BAA0B;EAC1B,eAAe;EACf,UAAU;EACV,4BAA4B;EAC5B,+BAA+B;EAC/B,oFAAoF;EACpF,kBAAkB;AACpB;AACA;EACE,cAAc;AAChB;AACA;EACE,UAAU;EACV,wBAAwB;AAC1B;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,WAAW;EACX,YAAY;EACZ,iCAAiC;EACjC,mBAAmB;AACrB;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,eAAe;EACf,cAAc;EACd,iBAAiB;AACnB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,aAAa;EACb,cAAc;EACd,aAAa;EACb,mBAAmB;EACnB,yBAAyB;EACzB,YAAY;EACZ,iBAAiB;EACjB,sBAAsB;EACtB,cAAc;EACd,gBAAgB;AAClB;AACA;EACE,eAAe;EACf,YAAY;EACZ,WAAW;AACb;AACA;EACE,cAAc;EACd,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,eAAe;AACjB;AACA;EACE,uBAAuB;EACvB,gBAAgB;EAChB,mBAAmB;EACnB,eAAe;AACjB;AACA;EACE,aAAa;EACb,aAAa;EACb,iBAAiB;EACjB,sBAAsB;AACxB;AACA;EACE,sBAAsB;EACtB,mBAAmB;AACrB;AACA;EACE,YAAY;AACd;AACA;EACE,kBAAkB;EAClB,WAAW;EACX,WAAW;AACb;AACA;EACE,sBAAsB;EACtB,mBAAmB;EACnB,cAAc;EACd,uBAAuB;AACzB;AACA;EACE,yDAAoD;EACpD,sBAAsB;EACtB,YAAY;EACZ,aAAa;AACf;AACA;EACE,YAAY;EACZ,kBAAkB;EAClB,eAAe;AACjB;AACA;EACE,aAAa;EACb,WAAW;EACX,WAAW;AACb;AACA;EACE,aAAa;EACb,8BAA8B;EAC9B,YAAY;EACZ,WAAW;EACX,mBAAmB;EACnB,uFAAuF;EACvF,iCAAiC;EACjC,eAAe;AACjB;AACA;EACE,iCAAiC;AACnC;AACA;EACE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;EACE,yDAA4D;AAC9D;AACA;EACE,yDAA0D;AAC5D;AACA;EACE,yDAA0D;AAC5D;AACA;EACE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;EACE,yDAA2D;AAC7D;AACA;EACE,yDAAyD;AAC3D;AACA;EACE,yDAAyD;AAC3D;AACA;EACE,cAAc;AAChB;AACA;EACE,eAAe;EACf,YAAY;EACZ,iBAAiB;AACnB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,sBAAsB;EACtB,WAAW;EACX,YAAY;EACZ,eAAe;EACf,iBAAiB;AACnB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,oBAAoB;EACpB,YAAY;AACd;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,YAAY;AACd;AACA;EACE,yFAAyF;AAC3F;AACA;EACE,aAAa;EACb,UAAU;EACV,yBAAyB;AAC3B;AACA;EACE,aAAa;EACb,kBAAkB;EAClB,YAAY;EACZ,WAAW;AACb;AACA;EACE,WAAW;EACX,UAAU;AACZ;AACA;EACE,yDAAqD;EACrD,sBAAsB;EACtB,WAAW;EACX,YAAY;EACZ,eAAe;AACjB;AACA;EACE,yDAAmD;AACrD;AACA;EACE,yDAAmD;AACrD;AACA;EACE,0DAA2D;AAC7D;AACA;EACE,0DAAyD;AAC3D;AACA;EACE,0DAAyD;AAC3D;AACA;EACE,0DAAsD;EACtD,eAAe;AACjB;AACA;EACE,0DAAwD;EACxD,sBAAsB;EACtB,WAAW;EACX,YAAY;EACZ,mBAAmB;EACnB,eAAe;EACf,aAAa;AACf;AACA;EACE,0DAAsD;AACxD;AACA;EACE,0DAAsD;AACxD;AACA;EACE,0DAA0D;AAC5D;AACA;EACE,0DAAwD;AAC1D;AACA;EACE,0DAAwD;AAC1D;AACA;EACE,0DAA0D;EAC1D,sBAAsB;EACtB,WAAW;EACX,YAAY;EACZ,eAAe;AACjB;AACA;EACE,0DAAwD;AAC1D;AACA;EACE,0DAAwD;AAC1D;AACA;;;EAGE,0DAA2D;EAC3D,eAAe;AACjB;AACA;EACE,kBAAkB;EAClB,mBAAmB;AACrB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,eAAe;EACf,cAAc;EACd,uBAAuB;AACzB;AACA;EACE,uBAAuB;AACzB;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;AAChC;AACA;EACE,gBAAgB;EAChB,mBAAmB;EACnB,uBAAuB;EACvB,gBAAgB;AAClB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,cAAc;AAChB",
            sourcesContent: [
              '.lol-premade-voice-panel .lol-premade-voice-panel-header,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName {\n  font-family: var(--font-display);\n}\n.lol-premade-voice-panel,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash,\n.lol-premade-voice-panel .lol-premade-voice-panel-availability .lol-premade-voice-panel-message {\n  font-family: var(--font-body);\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName {\n  font-family: var(--font-display);\n}\n.lol-premade-voice-panel,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash,\n.lol-premade-voice-panel .lol-premade-voice-panel-availability .lol-premade-voice-panel-message {\n  font-family: var(--font-body);\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName {\n  -webkit-user-select: none;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text,\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName {\n  text-transform: uppercase;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text:lang(ko-kr),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName:lang(ko-kr),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text:lang(ja-jp),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName:lang(ja-jp),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text:lang(tr-tr),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName:lang(tr-tr),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text:lang(el-gr),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName:lang(el-gr),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text:lang(th-th),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName:lang(th-th),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text:lang(zh-tw),\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName:lang(zh-tw) {\n  text-transform: none;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName {\n  color: #f0e6d2;\n  font-size: 18px;\n  font-weight: 700;\n  line-height: 22px;\n  letter-spacing: 0.05em;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName:lang(ar-ae) {\n  letter-spacing: 0;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text {\n  color: #f0e6d2;\n  font-size: 14px;\n  font-weight: 700;\n  line-height: 18px;\n  letter-spacing: 0.075em;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text:lang(ar-ae) {\n  letter-spacing: 0;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash {\n  color: #a09b8c;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 20px;\n  letter-spacing: 0.025em;\n  -webkit-font-smoothing: subpixel-antialiased;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash:lang(ar-ae) {\n  letter-spacing: 0;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash {\n  color: #f0e6d2;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player-content lol-uikit-slider {\n  width: 155px;\n  height: 15px;\n  --slider-base-before-top: 7px;\n  --slider-btn-cursor: pointer;\n  --slider-btn-width: 15px;\n  --slider-btn-height: 15px;\n  --slider-btn-hover-background-position: 0 -15px;\n  --slider-btn-active-background-position: 0 -30px;\n  --slider-fill-top: 6px;\n}\n:host {\n  width: 288px;\n  overflow: hidden;\n}\n.lol-premade-voice-panel {\n  display: flex;\n  flex-direction: column;\n  background: #010a13;\n  border: thin solid #1e2328;\n  cursor: default;\n  opacity: 0;\n  transform: translateY(350px);\n  transform-origin: center bottom;\n  transition: transform 500ms cubic-bezier(0.02, 0.85, 0.08, 0.99), opacity 300ms ease;\n  position: relative;\n}\n.lol-premade-voice-panel:lang(ar-ae) {\n  direction: rtl;\n}\n.lol-premade-voice-panel.show {\n  opacity: 1;\n  transform: translateY(0);\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  width: 100%;\n  height: 47px;\n  border-bottom: thin solid #463714;\n  align-items: center;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text {\n  display: flex;\n  flex-direction: column;\n  font-size: 14px;\n  color: #f0e6d2;\n  margin: 0 0 0 8px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-default .lol-premade-voice-panel-header-text:lang(ar-ae) {\n  margin: 0 8px 0 0;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash {\n  display: none;\n  color: #f0e6d2;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  height: 47px;\n  padding-left: 8px;\n  box-sizing: border-box;\n  flex-shrink: 0;\n  overflow: hidden;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-logo {\n  display: inline;\n  height: 32px;\n  width: 32px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-shortName {\n  color: #c8aa6e;\n  flex-direction: row;\n  margin-left: 7px;\n  margin-right: 7px;\n  display: inline;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-header .lol-premade-voice-panel-header-clash .lol-premade-voice-panel-header-clash-title .lol-premade-voice-panel-header-clash-name {\n  text-overflow: ellipsis;\n  max-width: 150px;\n  flex-direction: row;\n  display: inline;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-content {\n  display: flex;\n  height: 216px;\n  padding: 0px 11px;\n  box-sizing: border-box;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-participants {\n  flex-direction: column;\n  visibility: visible;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-participants lol-parties-comm-participant {\n  height: 54px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-participants.hide {\n  visibility: hidden;\n  margin: 0px;\n  height: 0px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-availability {\n  flex-direction: column;\n  align-items: center;\n  color: #3c3c41;\n  justify-content: center;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-availability .lol-premade-voice-panel-poro {\n  background-image: url("../../images/voice-poro.png");\n  background-size: cover;\n  width: 128px;\n  height: 128px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-availability .lol-premade-voice-panel-message {\n  width: 180px;\n  text-align: center;\n  font-size: 14px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-availability.hide {\n  display: none;\n  margin: 0px;\n  height: 0px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar {\n  display: flex;\n  justify-content: space-between;\n  height: 32px;\n  width: 100%;\n  align-items: center;\n  background: linear-gradient(to top, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);\n  border-bottom: thin solid #1e2328;\n  cursor: default;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar:hover {\n  background: rgba(255,255,255,0.1);\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.connected {\n  color: #3cb44b;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.connected.button-hover {\n  color: #f0e6d2;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.connected .lol-premade-voice-panel-connection-icon {\n  background-image: url("../../images/disconnect-default.png");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.connected .lol-premade-voice-panel-connection-icon:hover {\n  background-image: url("../../images/disconnect-hover.png");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.connected .lol-premade-voice-panel-connection-icon:active {\n  background-image: url("../../images/disconnect-click.png");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.disconnected {\n  color: #a09b8c;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.disconnected.button-hover {\n  color: #f0e6d2;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.disconnected .lol-premade-voice-panel-connection-icon {\n  background-image: url("../../images/reconnect-default.png");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.disconnected .lol-premade-voice-panel-connection-icon:hover {\n  background-image: url("../../images/reconnect-hover.png");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.disconnected .lol-premade-voice-panel-connection-icon:active {\n  background-image: url("../../images/reconnect-click.png");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar.connecting {\n  color: #cdbe91;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar .lol-premade-voice-panel-connection-state {\n  font-size: 14px;\n  flex-grow: 1;\n  margin: 0 0 0 7px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar .lol-premade-voice-panel-connection-state:lang(ar-ae) {\n  margin: 0 7px 0 0;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar .lol-premade-voice-panel-connection-icon {\n  background-size: cover;\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n  margin: 0 7px 0 0;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar .lol-premade-voice-panel-connection-icon:lang(ar-ae) {\n  margin: 0 0 0 7px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-connection-bar .lol-premade-voice-panel-connection-icon.locked {\n  pointer-events: none;\n  opacity: 0.3;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player {\n  display: flex;\n  flex-direction: row;\n  height: 54px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player:hover {\n  background: linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-player-highlight {\n  display: flex;\n  width: 7px;\n  background-color: #785a28;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-buttons {\n  display: flex;\n  position: absolute;\n  bottom: 11px;\n  right: 11px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-buttons:lang(ar-ae) {\n  right: auto;\n  left: 11px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-mic {\n  background-image: url("../../images/mic-default.png");\n  background-size: cover;\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-mic:hover {\n  background-image: url("../../images/mic-hover.png");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-mic:active {\n  background-image: url("../../images/mic-click.png");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-mic.muted {\n  background-image: url("../../images/mic-muted-default.png");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-mic.muted:hover {\n  background-image: url("../../images/mic-muted-hover.png");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-mic.muted:active {\n  background-image: url("../../images/mic-muted-click.png");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-mic.disabled {\n  background-image: url("../../images/mic-disabled.png");\n  cursor: default;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-deafen {\n  background-image: url("../../images/deafen-default.png");\n  background-size: cover;\n  width: 18px;\n  height: 18px;\n  margin: 0 5px 0 5px;\n  cursor: pointer;\n  display: none;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-deafen:hover {\n  background-image: url("../../images/deafen-hover.png");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-deafen:active {\n  background-image: url("../../images/deafen-click.png");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-deafen.deafened {\n  background-image: url("../../images/deafened-default.png");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-deafen.deafened:hover {\n  background-image: url("../../images/deafened-hover.png");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-deafen.deafened:active {\n  background-image: url("../../images/deafened-click.png");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-settings {\n  background-image: url("../../images/settings-default.png");\n  background-size: cover;\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-settings:hover {\n  background-image: url("../../images/settings-hover.png");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-settings:active {\n  background-image: url("../../images/settings-click.png");\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-settings.disabled,\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-settings .disabled:hover,\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player .lol-premade-voice-panel-current-player-settings .disabled:active {\n  background-image: url("../../images/settings-disabled.png");\n  cursor: default;\n}\n.lol-premade-voice-panel .voice-panel-avatar-wrapper {\n  align-self: center;\n  margin: 0 8px 0 4px;\n}\n.lol-premade-voice-panel .voice-panel-avatar-wrapper:lang(ar-ae) {\n  margin: 0 4px 0 8px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player-content {\n  display: flex;\n  flex-direction: column;\n  font-size: 14px;\n  color: #cdbe91;\n  margin: 11px 0 11px 3px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player-content:lang(ar-ae) {\n  margin: 11px 3px 11px 0;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player-content .lol-premade-voice-panel-current-player-row {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player-content .lol-premade-voice-panel-current-player-row .lol-premade-voice-panel-current-player-name {\n  max-width: 130px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player-content .lol-premade-voice-panel-current-player-row .lol-premade-voice-panel-current-player-volume-label {\n  margin: 0 2px 0 0;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player-content .lol-premade-voice-panel-current-player-row .lol-premade-voice-panel-current-player-volume-label:lang(ar-ae) {\n  margin: 0 0 0 2px;\n}\n.lol-premade-voice-panel .lol-premade-voice-panel-current-player-content.disabled {\n  color: #3c3c41;\n}\n',
            ],
            sourceRoot: "",
          },
        ]),
          (e.exports = D);
      },
      (e) => {
        "use strict";
        e.exports = function (e) {
          var t = e[1],
            n = e[3];
          if (!n) return t;
          if ("function" == typeof btoa) {
            var a = btoa(unescape(encodeURIComponent(JSON.stringify(n)))),
              l =
                "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(
                  a,
                ),
              i = "/*# ".concat(l, " */");
            return [t].concat([i]).join("\n");
          }
          return [t].join("\n");
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
                  a = void 0 !== t[5];
                return (
                  t[4] && (n += "@supports (".concat(t[4], ") {")),
                  t[2] && (n += "@media ".concat(t[2], " {")),
                  a &&
                    (n += "@layer".concat(
                      t[5].length > 0 ? " ".concat(t[5]) : "",
                      " {",
                    )),
                  (n += e(t)),
                  a && (n += "}"),
                  t[2] && (n += "}"),
                  t[4] && (n += "}"),
                  n
                );
              }).join("");
            }),
            (t.i = function (e, n, a, l, i) {
              "string" == typeof e && (e = [[null, e, void 0]]);
              var o = {};
              if (a)
                for (var r = 0; r < this.length; r++) {
                  var s = this[r][0];
                  null != s && (o[s] = !0);
                }
              for (var c = 0; c < e.length; c++) {
                var p = [].concat(e[c]);
                (a && o[p[0]]) ||
                  (void 0 !== i &&
                    (void 0 === p[5] ||
                      (p[1] = "@layer"
                        .concat(p[5].length > 0 ? " ".concat(p[5]) : "", " {")
                        .concat(p[1], "}")),
                    (p[5] = i)),
                  n &&
                    (p[2]
                      ? ((p[1] = "@media "
                          .concat(p[2], " {")
                          .concat(p[1], "}")),
                        (p[2] = n))
                      : (p[2] = n)),
                  l &&
                    (p[4]
                      ? ((p[1] = "@supports ("
                          .concat(p[4], ") {")
                          .concat(p[1], "}")),
                        (p[4] = l))
                      : (p[4] = "".concat(l))),
                  t.push(p));
              }
            }),
            t
          );
        };
      },
      (e) => {
        "use strict";
        e.exports = function (e, t) {
          return (
            t || (t = {}),
            e
              ? ((e = String(e.__esModule ? e.default : e)),
                /^['"].*['"]$/.test(e) && (e = e.slice(1, -1)),
                t.hash && (e += t.hash),
                /["'() \t\n]|(%20)/.test(e) || t.needQuotes
                  ? '"'.concat(
                      e.replace(/"/g, '\\"').replace(/\n/g, "\\n"),
                      '"',
                    )
                  : e)
              : e
          );
        };
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "voice-poro.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "disconnect-default.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "disconnect-hover.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "disconnect-click.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "reconnect-default.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "reconnect-hover.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "reconnect-click.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "mic-default.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "mic-hover.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "mic-click.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "mic-muted-default.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "mic-muted-hover.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "mic-muted-click.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "mic-disabled.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "deafen-default.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "deafen-hover.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "deafen-click.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "deafened-default.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "deafened-hover.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "deafened-click.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "settings-default.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "settings-hover.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "settings-click.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "settings-disabled.png";
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = (function (e, t) {
            if (!t && e && e.__esModule) return e;
            if (null === e || ("object" != typeof e && "function" != typeof e))
              return { default: e };
            var n = p(t);
            if (n && n.has(e)) return n.get(e);
            var a = {},
              l = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var i in e)
              if (
                "default" !== i &&
                Object.prototype.hasOwnProperty.call(e, i)
              ) {
                var o = l ? Object.getOwnPropertyDescriptor(e, i) : null;
                o && (o.get || o.set)
                  ? Object.defineProperty(a, i, o)
                  : (a[i] = e[i]);
              }
            (a.default = e), n && n.set(e, a);
            return a;
          })(n(1)),
          l = c(n(6)),
          i = c(n(7)),
          o = c(n(9)),
          r = c(n(11)),
          s = n(50);
        function c(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function p(e) {
          if ("function" != typeof WeakMap) return null;
          var t = new WeakMap(),
            n = new WeakMap();
          return (p = function (e) {
            return e ? n : t;
          })(e);
        }
        class d extends l.default {
          templateMarkup() {
            return n(51);
          }
          stylesheetMarkup() {
            return n(52);
          }
          constructor() {
            super(),
              (this._listeners = {
                showPanel: this._showPanel.bind(this),
                willHide: this._willHide.bind(this),
              }),
              (this._voiceDisabled = null),
              (this._buttonDisabled = !1),
              (this._disabledAfterLogin = !1),
              (this._isInCustomGame = !1),
              (this._tooltip = null),
              (this._firstExperienceContextualNotification = null),
              (this._parentNode = null),
              (this._elements = { voiceButton: ".lol-premade-voice-button" }),
              this._initDataBinding();
          }
          connectedCallback() {
            super.connectedCallback(),
              this._handleVoiceDisabled(),
              this.attachListener(
                "click",
                this._listeners.showPanel,
                this._elements.voiceButton,
              ),
              this.attachListener("willHide", this._listeners.willHide);
            const e = this._offset();
            a.FlyoutManager.assignFlyout(this, "lol-parties-comm-panel", null, {
              showEvent: "showVoicePanel",
              hideEvent: "hideVoicePanel",
              targetAnchor: { x: "left", y: "bottom" },
              tooltipAnchor: { x: "right", y: "bottom" },
              animated: "false",
              offset: e,
              orientation: "right",
              backdropCutout: !1,
              caretOffset: -600,
              ComponentFactory: a.default.ComponentFactory,
              borderless: "true",
            }),
              this._checkIfFirstExperience(),
              this._checkIfTooltipNeeded();
          }
          disconnectedCallback() {
            super.disconnectedCallback(),
              this._voiceDisabled &&
                this._parentNode &&
                this._parentNode.style &&
                (this._parentNode.style.display = "inherit"),
              this.detachListener(
                "click",
                this._listeners.showPanel,
                this._elements.voiceButton,
              ),
              this.detachListener("willHide", this._listeners.willHide),
              this._removeFirstExperienceContextualNotification();
          }
          static get observedAttributes() {
            return ["social"];
          }
          attributeChangedCallback(e, t, n) {
            if ((super.attributeChangedCallback(), "social" === e))
              this._isSocial = n;
          }
          getComponentFolderPath() {
            return super.getComponentFolderPath(), "voice-button";
          }
          setVoicePanel(e) {
            this._voicePanelElement = e;
          }
          _offset() {
            return "left" === this.getAttribute("position")
              ? { x: -79, y: 0 }
              : { x: -(this.offsetLeft + 3), y: -4 };
          }
          availabilityUpdated(e) {
            a.logger.trace("Voice availability: " + JSON.stringify(e)),
              (this._voiceDisabled = !e || !e.showUI),
              this._handleVoiceDisabled(),
              (this._disabledAfterLogin = e && e.disabledAfterLogin),
              (this._disabledAfterLogin || (e && !e.voiceChannelAvailable)) &&
              !this._buttonDisabled
                ? ((this._buttonDisabled = !0),
                  this.addClass("button-disabled", this._elements.voiceButton),
                  this._checkIfTooltipNeeded(),
                  this._hidePanel())
                : e &&
                  e.voiceChannelAvailable &&
                  this._buttonDisabled &&
                  ((this._buttonDisabled = !1),
                  this.removeClass(
                    "button-disabled",
                    this._elements.voiceButton,
                  ),
                  this._voicePanelElement.dispatchEvent(
                    new Event("voiceButtonEnabled"),
                  ),
                  this._detachDisabledTooltip());
          }
          lobbyUpdated(e) {
            const t = e && e.gameConfig,
              n = t && e.members && e.members.length > 1;
            (this._isInCustomGame = t && e.gameConfig.isCustom),
              (this._isInPremade = n && !e.gameConfig.isCustom),
              this._checkIfFirstExperience(),
              this._checkIfTooltipNeeded();
          }
          _initDataBinding() {
            (this.lobbyDataListener = this.lobbyUpdated.bind(this)),
              r.default.observe("lobby", this.lobbyDataListener),
              r.default.lobby().then(this.lobbyDataListener),
              (this.availabilityDataListener =
                this.availabilityUpdated.bind(this)),
              i.default.observe("availability", this.availabilityDataListener),
              i.default.availability().then(this.availabilityDataListener),
              (this._voiceFirstExperienceListener =
                this._voiceFirstExperienceUpdated.bind(this)),
              i.default.observe(
                "firstExperience",
                this._voiceFirstExperienceListener,
              ),
              i.default
                .firstExperience()
                .then(this._voiceFirstExperienceListener),
              (this.gameflowSessionListener =
                this.gameflowSessionUpdated.bind(this)),
              o.default.observe("session", this.gameflowSessionListener),
              o.default.session().then(this.gameflowSessionListener);
          }
          gameflowSessionUpdated(e) {
            e && e.phase && "ReadyCheck" === e.phase && this._hidePanel();
          }
          _showPanel(e = !0) {
            this._buttonDisabled ||
              (this.addClass("active", this._elements.voiceButton),
              a.FlyoutManager.sendEvent(this, "showVoicePanel"),
              this._voicePanelElement &&
                (this._voicePanelElement.dispatchEvent(
                  new Event("willShowVoicePanel"),
                ),
                e &&
                  this._playSound(
                    "/fe/lol-premade-voice/sfx-soc-ui-chatwindow-open.ogg",
                  )));
          }
          _hidePanel() {
            a.FlyoutManager.sendEvent(this, "hideVoicePanel");
          }
          _willHide() {
            this._showedFirstExperience && a.TooltipManager.unassign(this),
              this.removeClass("active", this._elements.voiceButton),
              this._voicePanelElement &&
                this._voicePanelElement.dispatchEvent(
                  new Event("willHideVoicePanel"),
                );
          }
          _handleVoiceDisabled() {
            this.parentNode &&
              (this.parentNode.style &&
                (this._voiceDisabled
                  ? (this.addClass(
                      "voice-disabled",
                      this._elements.voiceButton,
                    ),
                    (this.parentNode.style.display = "none"))
                  : (this.removeClass(
                      "voice-disabled",
                      this._elements.voiceButton,
                    ),
                    (this.parentNode.style.display = "inherit"))),
              (this._parentNode = this.parentNode));
          }
          _checkIfTooltipNeeded() {
            this._buttonDisabled &&
              (this._disabledAfterLogin
                ? this._tooltipType !== s.VOICE_BUTTON_TOOLTIP_TYPES.DISABLED &&
                  this._attachDisabledTooltip(
                    s.VOICE_BUTTON_TOOLTIP_TYPES.DISABLED,
                  )
                : this._isInCustomGame
                  ? this._tooltipType !==
                      s.VOICE_BUTTON_TOOLTIP_TYPES.CUSTOM_GAME &&
                    this._attachDisabledTooltip(
                      s.VOICE_BUTTON_TOOLTIP_TYPES.CUSTOM_GAME,
                    )
                  : this._tooltipType !==
                      s.VOICE_BUTTON_TOOLTIP_TYPES.NO_PARTY &&
                    this._attachDisabledTooltip(
                      s.VOICE_BUTTON_TOOLTIP_TYPES.NO_PARTY,
                    ));
          }
          _attachDisabledTooltip(e) {
            this._tooltipType && this._detachDisabledTooltip(),
              (this._tooltipType = e);
            const t = document.createElement("lol-uikit-tooltip");
            let n;
            switch (e) {
              case s.VOICE_BUTTON_TOOLTIP_TYPES.CUSTOM_GAME:
                n = a.tra.get("parties_comm_button_error_in_custom_game");
                break;
              case s.VOICE_BUTTON_TOOLTIP_TYPES.NO_PARTY:
                n = a.tra.get("parties_comm_button_error_not_in_party");
                break;
              case s.VOICE_BUTTON_TOOLTIP_TYPES.DISABLED:
                n = a.tra.get("parties_comm_button_error_disabled");
            }
            const l = this._tooltipContentBlock(n);
            t.appendChild(l),
              a.TooltipManager.assign(this, t, null, {
                targetAnchor: { x: "center", y: "top" },
                tooltipAnchor: { x: "center", y: "bottom" },
              }),
              this._removeFirstExperienceContextualNotification();
          }
          _detachDisabledTooltip() {
            this._tooltipType &&
              (a.TooltipManager.unassign(this), (this._tooltipType = null));
          }
          _voiceFirstExperienceUpdated(e) {
            (this._showFirstExperience = e ? e.showFirstExperienceInLCU : null),
              this._checkIfFirstExperience();
          }
          _checkIfFirstExperience() {
            this._isSocial &&
              this._showFirstExperience &&
              this._isInPremade &&
              !this._showedFirstExperience &&
              this.parentNode &&
              (this._showPanel(!1),
              this._attachFirstExperienceTooltip(),
              i.default.firstExperienceCompleted(),
              (this._showedFirstExperience = !0));
          }
          _attachFirstExperienceTooltip() {
            const e = this._tooltipContentBlock(
              a.tra.get("parties_comm_panel_tooltip_first_experience"),
            );
            (this._firstExperienceContextualNotification =
              a.ContextualNotificationManager.add(e, {
                target: { domNode: this },
                offset: { x: 12, y: -29 },
                dismissable: !0,
              })),
              this._firstExperienceContextualNotification.onRemove.then(() => {
                this._firstExperienceContextualNotification = null;
              });
          }
          _tooltipContentBlock(e) {
            const t = document.createElement("lol-uikit-content-block");
            t.setAttribute("type", "tooltip-small"),
              t.classList.add("lol-premade-voice-button-tooltip");
            const n = document.createElement("p");
            return (n.innerHTML = e), t.appendChild(n), t;
          }
          _removeFirstExperienceContextualNotification() {
            this._firstExperienceContextualNotification &&
              a.ContextualNotificationManager.remove(
                this._firstExperienceContextualNotification,
              );
          }
        }
        d.tagName = "lol-parties-comm-button";
        var h = d;
        t.default = h;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.VOICE_BUTTON_TOOLTIP_TYPES = void 0);
        t.VOICE_BUTTON_TOOLTIP_TYPES = {
          NO_PARTY: "noParty",
          CUSTOM_GAME: "customGame",
          DISABLED: "disabled",
        };
      },
      (e) => {
        "use strict";
        e.exports =
          '<template>\r\n  <div class="lol-premade-voice-button"></div>\r\n  <slot></slot>\r\n</template>\r\n';
      },
      (e, t, n) => {
        var a = n(22),
          l = n(23)(a);
        l.push([
          e.id,
          '.lol-premade-voice-button {\n  display: flex;\n  width: 38px;\n  height: 32px;\n  background-image: url("/fe/lol-premade-voice/voice-button.png");\n  background-position-y: 0px;\n  background-size: cover;\n  cursor: pointer;\n}\n.lol-premade-voice-button:hover:not(.button-disabled) {\n  background-position-y: -32px;\n}\n.lol-premade-voice-button:active:not(.button-disabled) {\n  background-position-y: -64px;\n}\n.lol-premade-voice-button.button-disabled {\n  background-position-y: -160px;\n  cursor: default;\n}\n.lol-premade-voice-button.active {\n  background-position-y: -96px;\n}\n.lol-premade-voice-button.voice-disabled {\n  display: none;\n}\nlol-uikit-content-block.lol-premade-voice-button-tooltip[type=tooltip-small] {\n  padding: 9px;\n}\n',
          "",
          {
            version: 3,
            sources: [
              "webpack://./fe/rcp-fe-lol-premade-voice/src/elements/voice-button/style.styl",
            ],
            names: [],
            mappings:
              "AAAA;EACE,aAAa;EACb,WAAW;EACX,YAAY;EACZ,+DAA+D;EAC/D,0BAA0B;EAC1B,sBAAsB;EACtB,eAAe;AACjB;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,6BAA6B;EAC7B,eAAe;AACjB;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,aAAa;AACf;AACA;EACE,YAAY;AACd",
            sourcesContent: [
              '.lol-premade-voice-button {\n  display: flex;\n  width: 38px;\n  height: 32px;\n  background-image: url("/fe/lol-premade-voice/voice-button.png");\n  background-position-y: 0px;\n  background-size: cover;\n  cursor: pointer;\n}\n.lol-premade-voice-button:hover:not(.button-disabled) {\n  background-position-y: -32px;\n}\n.lol-premade-voice-button:active:not(.button-disabled) {\n  background-position-y: -64px;\n}\n.lol-premade-voice-button.button-disabled {\n  background-position-y: -160px;\n  cursor: default;\n}\n.lol-premade-voice-button.active {\n  background-position-y: -96px;\n}\n.lol-premade-voice-button.voice-disabled {\n  display: none;\n}\nlol-uikit-content-block.lol-premade-voice-button-tooltip[type=tooltip-small] {\n  padding: 9px;\n}\n',
            ],
            sourceRoot: "",
          },
        ]),
          (e.exports = l);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = r(n(6)),
          l = r(n(7)),
          i = n(1),
          o = r(n(19));
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        class s extends a.default {
          templateMarkup() {
            return n(54);
          }
          stylesheetMarkup() {
            return n(55);
          }
          constructor() {
            super(),
              (this._lastSliderUpdate = 0),
              (this._listeners = {
                muteListener: this._toggleMute.bind(this),
                volumeSliderChange: this._volumeSliderChange.bind(this),
                volumeSliderEnd: this._volumeSliderEnd.bind(this),
                volumeSliderStart: this._volumeSliderStart.bind(this),
              }),
              (this._selectors = {
                mute: ".lol-premade-voice-panel-participant-mute",
                participant: ".lol-premade-voice-participant",
                sliderElement: "lol-uikit-slider",
                playerName:
                  ".lol-premade-voice-panel-participant-name lol-uikit-player-name",
                chatIcon: ".lol-premade-voice-panel-chat-icon",
                haloElement: "lol-parties-comm-halo",
                volumeText: ".lol-premade-voice-panel-participant-volume",
              });
          }
          async connectedCallback() {
            super.connectedCallback(),
              this._attachSliderTooltipDelegate(),
              await this.updateSelf(this._participant),
              this.attachListener(
                "click",
                this._listeners.muteListener,
                this._selectors.mute,
              ),
              this.attachListener(
                "slideEnd",
                this._listeners.volumeSliderEnd,
                this._selectors.sliderElement,
              ),
              this.attachListener(
                "slideStart",
                this._listeners.volumeSliderStart,
                this._selectors.sliderElement,
              ),
              this.attachListener(
                "change",
                this._listeners.volumeSliderChange,
                this._selectors.sliderElement,
              );
          }
          disconnectedCallback() {
            super.disconnectedCallback(),
              this.detachListener(
                "click",
                this._listeners.muteListener,
                this._selectors.mute,
              ),
              this.detachListener(
                "slideEnd",
                this._listeners.volumeSliderEnd,
                this._selectors.sliderElement,
              ),
              this.detachListener(
                "slideStart",
                this._listeners.volumeSliderStart,
                this._selectors.sliderElement,
              ),
              this.detachListener(
                "change",
                this._listeners.volumeSliderChange,
                this._selectors.sliderElement,
              );
          }
          getComponentFolderPath() {
            return (
              super.getComponentFolderPath(), "voice-panel/voice-participant"
            );
          }
          updateSelf(e) {
            (this._participant = e),
              this._updateVolume(e.volume, !this._volumeUpdating),
              this._muted(e.isMuted),
              this._updateVoiceHalo(e.puuid);
            const t = this.shadowRoot.querySelector(this._selectors.playerName);
            t &&
              (t.setAttribute("puuid", e.puuid),
              t.setAttribute("summoner-id", e.summonerId));
          }
          updateChatParticipant(e) {
            if (!e) return;
            const t = this.shadowRoot.querySelector(this._selectors.chatIcon);
            t &&
              (t.setAttribute("availability", e.availability),
              t.setAttribute("icon-id", e.icon));
          }
          _toggleMute() {
            l.default.mute(this._participant.puuid, !this._participant.isMuted);
          }
          _volumeSliderEnd(e) {
            (this._volumeUpdating = !1), this._volumeSliderChange(e, !0);
          }
          _volumeSliderStart() {
            this._volumeUpdating = !0;
          }
          _volumeSliderChange(e, t = !1) {
            if ((this._updateVolume(e.value), !t)) {
              const e = new Date().getTime();
              if (e - this._lastSliderUpdate < 200) return;
              this._lastSliderUpdate = e;
            }
            l.default.changeVolume(this._participant.puuid, e.value);
          }
          _muted(e) {
            this._attachMuteTooltip(e),
              e
                ? this.addClass("muted", this._selectors.mute)
                : this.removeClass("muted", this._selectors.mute);
          }
          _updateVolume(e, t = !0) {
            const n = this.shadowRoot.querySelector(
              this._selectors.sliderElement,
            );
            if ((n && !this._volumeUpdating && n.setAttribute("value", e), t)) {
              const t = i.tra.formatString(
                "parties_comm_panel_slider_percentage",
                { percentage: e },
              );
              this.addInnerHtml(t, this._selectors.volumeText);
            }
          }
          _updateVoiceHalo(e) {
            const t = this.shadowRoot.querySelector(
              this._selectors.haloElement,
            );
            t && t.setAttribute("puuid", e);
          }
          _attachMuteTooltip(e) {
            const t = this.shadowRoot.querySelector(this._selectors.mute);
            let n;
            (n = e
              ? i.tra.get("parties_comm_panel_tooltip_unmute_participant")
              : i.tra.get("parties_comm_panel_tooltip_mute_participant")),
              o.default.attachSmallTooltip(
                t,
                n,
                { x: "right", y: "center" },
                { x: "left", y: "center" },
              );
          }
          _attachSliderTooltipDelegate() {
            const e = this.shadowRoot.querySelector(
              this._selectors.sliderElement,
            );
            e &&
              e.setTooltipContentDelegate(function (e) {
                return i.tra.formatString(
                  "parties_comm_panel_tooltip_participant_volume",
                  { value: e },
                );
              });
          }
        }
        s.tagName = "lol-parties-comm-participant";
        var c = s;
        t.default = c;
      },
      (e) => {
        "use strict";
        e.exports =
          '<template>\r\n  <div class="lol-premade-voice-participant">\r\n    <lol-parties-comm-halo size="small">\r\n      <lol-social-avatar-icon\r\n        class="lol-premade-voice-panel-chat-icon"\r\n        icon-id=""\r\n        availability=""\r\n        show-availability="true">\r\n      </lol-social-avatar-icon>\r\n    </lol-parties-comm-halo>\r\n    <div class="lol-premade-voice-panel-participant-content">\r\n      <div class="lol-premade-voice-panel-participant-volume-row">\r\n        <div class="lol-premade-voice-panel-participant-name">\r\n          <lol-uikit-player-name format="tooltip" puuid="" summoner-id="" />\r\n        </div>\r\n        <div class="lol-premade-voice-panel-participant-volume"></div>\r\n      </div>\r\n      <lol-uikit-slider\r\n        for="participantVolume"\r\n        percentage\r\n        value="0"\r\n        clickset="true">\r\n      </lol-uikit-slider>\r\n    </div>\r\n    <div class="lol-premade-voice-panel-participant-mute"></div>\r\n  </div>\r\n  <slot></slot>\r\n</template>\r\n';
      },
      (e, t, n) => {
        var a = n(22),
          l = n(23),
          i = n(24),
          o = n(56),
          r = n(57),
          s = n(58),
          c = n(59),
          p = n(60),
          d = n(61),
          h = l(a),
          m = i(o),
          u = i(r),
          A = i(s),
          v = i(c),
          g = i(p),
          C = i(d);
        h.push([
          e.id,
          ".lol-premade-voice-participant .lol-premade-voice-panel-participant-content lol-uikit-slider {\n  width: 155px;\n  height: 15px;\n  --slider-base-before-top: 7px;\n  --slider-btn-cursor: pointer;\n  --slider-btn-width: 15px;\n  --slider-btn-height: 15px;\n  --slider-btn-hover-background-position: 0 -15px;\n  --slider-btn-active-background-position: 0 -30px;\n  --slider-fill-top: 6px;\n}\n.lol-premade-voice-participant {\n  display: flex;\n  flex-direction: row;\n  height: 100%;\n  width: 100%;\n  align-items: center;\n  position: relative;\n}\n.lol-premade-voice-participant.speaking {\n  background: linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-chat-icon {\n  align-self: center;\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-mute {\n  background-image: url(" +
            m +
            ");\n  background-position: center;\n  background-size: cover;\n  background-repeat: no-repeat;\n  width: 18px;\n  height: 18px;\n  margin-top: 14px;\n  cursor: pointer;\n  position: relative;\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-mute:hover {\n  background-image: url(" +
            u +
            ");\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-mute:active {\n  background-image: url(" +
            A +
            ");\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-mute.muted {\n  background-image: url(" +
            v +
            ");\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-mute.muted:hover {\n  background-image: url(" +
            g +
            ");\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-mute.muted:active {\n  background-image: url(" +
            C +
            ");\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-content {\n  display: flex;\n  flex-direction: column;\n  width: 205px;\n  color: #a09b8c;\n  font-size: 14px;\n  margin: 11px 0 11px 9px;\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-content:lang(ar-ae) {\n  margin: 11px 9px 11px 0;\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-content .lol-premade-voice-panel-participant-volume-row {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  width: 155px;\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-content .lol-premade-voice-panel-participant-volume-row .lol-premade-voice-panel-participant-name {\n  max-width: 130px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-content .lol-premade-voice-panel-participant-volume-row .lol-premade-voice-panel-participant-volume {\n  margin: 0 2px 0 0;\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-content .lol-premade-voice-panel-participant-volume-row .lol-premade-voice-panel-participant-volume:lang(ar-ae) {\n  margin: 0 0 0 2px;\n}\n",
          "",
          {
            version: 3,
            sources: [
              "webpack://./fe/rcp-fe-lol-premade-voice/src/elements/voice-panel/voice-participant/style.styl",
            ],
            names: [],
            mappings:
              "AAAA;EACE,YAAY;EACZ,YAAY;EACZ,6BAA6B;EAC7B,4BAA4B;EAC5B,wBAAwB;EACxB,yBAAyB;EACzB,+CAA+C;EAC/C,gDAAgD;EAChD,sBAAsB;AACxB;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,mBAAmB;EACnB,kBAAkB;AACpB;AACA;EACE,yFAAyF;AAC3F;AACA;EACE,kBAAkB;AACpB;AACA;EACE,yDAAyD;EACzD,2BAA2B;EAC3B,sBAAsB;EACtB,4BAA4B;EAC5B,WAAW;EACX,YAAY;EACZ,gBAAgB;EAChB,eAAe;EACf,kBAAkB;AACpB;AACA;EACE,yDAAuD;AACzD;AACA;EACE,yDAAuD;AACzD;AACA;EACE,yDAA0D;AAC5D;AACA;EACE,yDAAwD;AAC1D;AACA;EACE,yDAAwD;AAC1D;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,cAAc;EACd,eAAe;EACf,uBAAuB;AACzB;AACA;EACE,uBAAuB;AACzB;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,YAAY;AACd;AACA;EACE,gBAAgB;EAChB,mBAAmB;EACnB,uBAAuB;EACvB,gBAAgB;AAClB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,iBAAiB;AACnB",
            sourcesContent: [
              '.lol-premade-voice-participant .lol-premade-voice-panel-participant-content lol-uikit-slider {\n  width: 155px;\n  height: 15px;\n  --slider-base-before-top: 7px;\n  --slider-btn-cursor: pointer;\n  --slider-btn-width: 15px;\n  --slider-btn-height: 15px;\n  --slider-btn-hover-background-position: 0 -15px;\n  --slider-btn-active-background-position: 0 -30px;\n  --slider-fill-top: 6px;\n}\n.lol-premade-voice-participant {\n  display: flex;\n  flex-direction: row;\n  height: 100%;\n  width: 100%;\n  align-items: center;\n  position: relative;\n}\n.lol-premade-voice-participant.speaking {\n  background: linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-chat-icon {\n  align-self: center;\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-mute {\n  background-image: url("../../../images/mute-default.png");\n  background-position: center;\n  background-size: cover;\n  background-repeat: no-repeat;\n  width: 18px;\n  height: 18px;\n  margin-top: 14px;\n  cursor: pointer;\n  position: relative;\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-mute:hover {\n  background-image: url("../../../images/mute-hover.png");\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-mute:active {\n  background-image: url("../../../images/mute-click.png");\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-mute.muted {\n  background-image: url("../../../images/muted-default.png");\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-mute.muted:hover {\n  background-image: url("../../../images/muted-hover.png");\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-mute.muted:active {\n  background-image: url("../../../images/muted-click.png");\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-content {\n  display: flex;\n  flex-direction: column;\n  width: 205px;\n  color: #a09b8c;\n  font-size: 14px;\n  margin: 11px 0 11px 9px;\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-content:lang(ar-ae) {\n  margin: 11px 9px 11px 0;\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-content .lol-premade-voice-panel-participant-volume-row {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  width: 155px;\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-content .lol-premade-voice-panel-participant-volume-row .lol-premade-voice-panel-participant-name {\n  max-width: 130px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-content .lol-premade-voice-panel-participant-volume-row .lol-premade-voice-panel-participant-volume {\n  margin: 0 2px 0 0;\n}\n.lol-premade-voice-participant .lol-premade-voice-panel-participant-content .lol-premade-voice-panel-participant-volume-row .lol-premade-voice-panel-participant-volume:lang(ar-ae) {\n  margin: 0 0 0 2px;\n}\n',
            ],
            sourceRoot: "",
          },
        ]),
          (e.exports = h);
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "mute-default.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "mute-hover.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "mute-click.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "muted-default.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "muted-hover.png";
      },
      (e, t, n) => {
        "use strict";
        e.exports = n.p + "muted-click.png";
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = r(n(6)),
          l = r(n(7)),
          i = n(63),
          o = n(64);
        function r(e) {
          return e && e.__esModule ? e : { default: e };
        }
        class s extends a.default {
          templateMarkup() {
            return n(65);
          }
          stylesheetMarkup() {
            return n(66);
          }
          constructor() {
            super(),
              (this._selectors = { halo: ".lol-premade-voice-comm-halo" }),
              this._initDataBinding();
          }
          static get observedAttributes() {
            return ["puuid", "size"];
          }
          attributeChangedCallback(e, t, n) {
            switch ((super.attributeChangedCallback(), e)) {
              case "puuid":
                this._puuid = n;
                break;
              case "size":
                (this._sizeAttribute = n),
                  this._sizeAttribute &&
                    this._sizeAttribute in o.SIZES &&
                    this.addClass(this._sizeAttribute, this._selectors.halo);
            }
          }
          _isParticipant(e) {
            return e.puuid === this._puuid;
          }
          _updateHalo(e, t) {
            const n = this.shadowRoot.querySelector(this._selectors.halo),
              a = this._calculateBlurRadius(t);
            (0, i.applyBlur)(n, e, a);
          }
          _calculateBlurRadius(e) {
            const t = this._sizeAttribute || "small";
            return (0, i.calculateBlurRadius)(t, e);
          }
          _disconnectHalo() {
            this._updateHalo(!1, 0);
          }
          _handleParticipantsChanged(e) {
            const t = (e || []).find(this._isParticipant, this);
            if (t) {
              const { isSpeaking: e } = t,
                { energy: n } = t;
              this._updateHalo(e, n);
            } else this._disconnectHalo();
          }
          getComponentFolderPath() {
            return super.getComponentFolderPath(), "voice-halo";
          }
          _initDataBinding() {
            (this.participantsDataListener =
              this._handleParticipantsChanged.bind(this)),
              l.default.observe("participants", this.participantsDataListener),
              l.default.participants().then(this.participantsDataListener);
          }
        }
        s.tagName = "lol-parties-comm-halo";
        var c = s;
        t.default = c;
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.applyBlur = function (e, t, n) {
            t
              ? (e.classList.add("speaking"),
                n &&
                  e.style.setProperty("box-shadow", `0 0 ${n}px 1px #36D987`))
              : (e.classList.remove("speaking"),
                e.style.setProperty("box-shadow", "none"));
          }),
          (t.calculateBlurRadius = function (e, t) {
            const n = a.SIZES[e],
              l = a.MAX_BLUR_MULTIPLIERS[e];
            if (!t || !n || !l) return 0;
            const i = t / 100,
              o = n * l,
              r = n * a.MIN_BLUR_MULTIPLIER;
            return (o - r) * i + ("small" === e ? 1 : 2);
          });
        var a = n(64);
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.SIZES = t.MIN_BLUR_MULTIPLIER = t.MAX_BLUR_MULTIPLIERS = void 0);
        t.SIZES = { small: 32, medium: 58, large: 100 };
        t.MIN_BLUR_MULTIPLIER = 1.2;
        t.MAX_BLUR_MULTIPLIERS = { small: 1.5, medium: 1.5, large: 1.6 };
      },
      (e) => {
        "use strict";
        e.exports =
          '<template>\r\n  <div class="lol-premade-voice-comm-halo">\r\n      <slot></slot>\r\n  </div>\r\n</template>';
      },
      (e, t, n) => {
        var a = n(22),
          l = n(23)(a);
        l.push([
          e.id,
          ":host .lol-premade-voice-comm-halo {\n  transition: box-shadow 0.15s ease-in-out;\n  position: relative;\n}\n:host .lol-premade-voice-comm-halo:before {\n  content: '';\n  opacity: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  transition: opacity 0.15s ease-in-out;\n  box-shadow: 0 0 0 2px #4bb44b;\n}\n:host .lol-premade-voice-comm-halo.speaking:before {\n  opacity: 1;\n}\n:host .lol-premade-voice-comm-halo.small:before {\n  box-shadow: 0 0 0 1px #4bb44b;\n}\n:host .lol-premade-voice-comm-halo {\n  border-radius: 50%;\n}\n:host .lol-premade-voice-comm-halo:before {\n  border-radius: 50%;\n}\n:host {\n  --premade-voice-halo-margin: 0 0 0 0;\n  --premade-voice-halo-width: auto;\n  --premade-voice-halo-height: auto;\n  --premade-voice-halobefore-box-shadow: none;\n}\n:host .lol-premade-voice-comm-halo {\n  margin: var(--premade-voice-halo-margin);\n  width: var(--premade-voice-halo-width);\n  height: var(--premade-voice-halo-height);\n}\n:host .lol-premade-voice-comm-halo:before {\n  box-shadow: var(--premade-voice-halobefore-box-shadow);\n}\n",
          "",
          {
            version: 3,
            sources: [
              "webpack://./fe/rcp-fe-lol-premade-voice/src/elements/voice-halo/style.styl",
            ],
            names: [],
            mappings:
              "AAAA;EACE,wCAAwC;EACxC,kBAAkB;AACpB;AACA;EACE,WAAW;EACX,UAAU;EACV,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,qCAAqC;EACrC,6BAA6B;AAC/B;AACA;EACE,UAAU;AACZ;AACA;EACE,6BAA6B;AAC/B;AACA;EACE,kBAAkB;AACpB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,oCAAoC;EACpC,gCAAgC;EAChC,iCAAiC;EACjC,2CAA2C;AAC7C;AACA;EACE,wCAAwC;EACxC,sCAAsC;EACtC,wCAAwC;AAC1C;AACA;EACE,sDAAsD;AACxD",
            sourcesContent: [
              ":host .lol-premade-voice-comm-halo {\n  transition: box-shadow 0.15s ease-in-out;\n  position: relative;\n}\n:host .lol-premade-voice-comm-halo:before {\n  content: '';\n  opacity: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  transition: opacity 0.15s ease-in-out;\n  box-shadow: 0 0 0 2px #4bb44b;\n}\n:host .lol-premade-voice-comm-halo.speaking:before {\n  opacity: 1;\n}\n:host .lol-premade-voice-comm-halo.small:before {\n  box-shadow: 0 0 0 1px #4bb44b;\n}\n:host .lol-premade-voice-comm-halo {\n  border-radius: 50%;\n}\n:host .lol-premade-voice-comm-halo:before {\n  border-radius: 50%;\n}\n:host {\n  --premade-voice-halo-margin: 0 0 0 0;\n  --premade-voice-halo-width: auto;\n  --premade-voice-halo-height: auto;\n  --premade-voice-halobefore-box-shadow: none;\n}\n:host .lol-premade-voice-comm-halo {\n  margin: var(--premade-voice-halo-margin);\n  width: var(--premade-voice-halo-width);\n  height: var(--premade-voice-halo-height);\n}\n:host .lol-premade-voice-comm-halo:before {\n  box-shadow: var(--premade-voice-halobefore-box-shadow);\n}\n",
            ],
            sourceRoot: "",
          },
        ]),
          (e.exports = l);
      },
      (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var a = n(1),
          l = s(n(6)),
          i = s(n(7)),
          o = n(63),
          r = s(n(19));
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        class c extends l.default {
          templateMarkup() {
            return n(68);
          }
          stylesheetMarkup() {
            return n(69);
          }
          constructor() {
            super(),
              (this._listeners = {
                testDataChanged: this._handleVoiceTest.bind(this),
                settingsChanged: this._handleSettingsChanged.bind(this),
                participantsChanged: this._handleParticipantsChanged.bind(this),
                click: this._clickHandler.bind(this),
              }),
              (this._inVoiceChannel = !1),
              (this._pttActive = !1),
              (this._pttButtonPressed = !1),
              (this._testIsRunning = !1),
              (this._micEnergy = 0),
              (this._elements = {
                label: ".lol-voice-mic-test-label",
                button: ".lol-voice-mic-test-button",
              }),
              this._initDataBinding();
          }
          connectedCallback() {
            super.connectedCallback(),
              i.default
                .participants()
                .then(this._listeners.participantsChanged),
              i.default.settings().then(this._listeners.settingsChanged),
              this.attachListener(
                "click",
                this._listeners.click,
                this._elements.button,
              );
          }
          disconnectedCallback() {
            super.disconnectedCallback(),
              this.detachListener(
                "click",
                this._listeners.click,
                this._elements.button,
              ),
              this._testIsRunning && i.default.stopMicTest();
          }
          getComponentFolderPath() {
            return super.getComponentFolderPath(), "mic-test-button";
          }
          _clickHandler() {
            this._inVoiceChannel ||
              (this._testIsRunning
                ? i.default.stopMicTest()
                : i.default.startMicTest());
          }
          _handleVoiceTest(e) {
            const t = e.isLoopbackEnabled !== this._testIsRunning;
            (this._testIsRunning = e.isLoopbackEnabled),
              t && this._updateState();
            const n = e.micEnergy !== this._micEnergy;
            (this._micEnergy = e.micEnergy), n && this._updateHalo();
          }
          _handleParticipantsChanged(e) {
            const t = !!e.length,
              n = t !== this._inVoiceChannel;
            (this._inVoiceChannel = t), n && this._updateState();
          }
          _handleSettingsChanged(e) {
            (this._pttActive = !!e.pttActive),
              this._pttActive
                ? (this._pttButtonPressed = !e.localMicMuted)
                : (this._pttButtonPressed = !1),
              this._updateHalo();
          }
          _updateHalo() {
            const e = this.shadowRoot.querySelector(this._elements.button);
            if (!e) return;
            const t = (0, o.calculateBlurRadius)("large", this._micEnergy);
            let n = this._micEnergy > 0;
            this._pttActive && !this._pttButtonPressed && (n = !1),
              (0, o.applyBlur)(e, n, t);
          }
          _updateState() {
            if (this._inVoiceChannel) return void this._updateEnabled(!1);
            let e;
            this._updateEnabled(!0),
              this._testIsRunning
                ? ((e = a.tra.get("mic_test_button_label_testing")),
                  this.addClass("active", this._elements.button))
                : ((e = a.tra.get("mic_test_button_label_test")),
                  this.removeClass("active", this._elements.button)),
              this.addInnerHtml(e, this._elements.label);
          }
          _updateEnabled(e) {
            const t = this.shadowRoot.querySelector(this._elements.button);
            e
              ? (this.removeClass("button-disabled", this._elements.button),
                r.default.removeTooltip(t))
              : (this.addInnerHtml("&nbsp;", this._elements.label),
                this.addClass("button-disabled", this._elements.button),
                r.default.attachSmallTooltip(
                  t,
                  a.tra.get("mic_test_button_tooltip_disabled"),
                ));
          }
          _initDataBinding() {
            i.default.observe("mictest", this._listeners.testDataChanged),
              i.default.observe(
                "participants",
                this._listeners.participantsChanged,
              ),
              i.default.observe("settings", this._listeners.settingsChanged);
          }
        }
        c.tagName = "lol-parties-mic-test-button";
        var p = c;
        t.default = p;
      },
      (e) => {
        "use strict";
        e.exports =
          '<template>\r\n  <div class="lol-voice-mic-test-label"></div>\r\n  <div class="lol-voice-mic-test-button"></div>\r\n  <slot></slot>\r\n</template>\r\n';
      },
      (e, t, n) => {
        var a = n(22),
          l = n(23)(a);
        l.push([
          e.id,
          '.lol-voice-mic-test-label {\n  font-family: var(--font-body);\n}\n.lol-voice-mic-test-label {\n  font-family: var(--font-body);\n}\n.lol-voice-mic-test-label {\n  -webkit-user-select: none;\n}\n.lol-voice-mic-test-label {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n.lol-voice-mic-test-label {\n  color: #a09b8c;\n  font-size: 12px;\n  font-weight: normal;\n  line-height: 16px;\n  letter-spacing: 0.025em;\n  -webkit-font-smoothing: subpixel-antialiased;\n}\n.lol-voice-mic-test-label:lang(ja-jp) {\n  font-size: 13px;\n}\n.lol-voice-mic-test-label:lang(ar-ae) {\n  letter-spacing: 0;\n}\n.lol-voice-mic-test-button {\n  display: flex;\n  width: 38px;\n  height: 32px;\n  background-image: url("/fe/lol-premade-voice/voice-button.png");\n  background-position-y: 0px;\n  background-size: cover;\n  cursor: pointer;\n}\n.lol-voice-mic-test-button:hover:not(.button-disabled) {\n  background-position-y: -32px;\n}\n.lol-voice-mic-test-button:active:not(.button-disabled) {\n  background-position-y: -64px;\n}\n.lol-voice-mic-test-button.button-disabled {\n  background-position-y: -160px;\n  cursor: default;\n}\n.lol-voice-mic-test-button.active {\n  background-position-y: -96px;\n}\n.lol-voice-mic-test-button {\n  transition: box-shadow 0.15s ease-in-out;\n  position: relative;\n}\n.lol-voice-mic-test-button:before {\n  content: \'\';\n  opacity: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  transition: opacity 0.15s ease-in-out;\n  box-shadow: 0 0 0 2px #4bb44b;\n}\n.lol-voice-mic-test-button.speaking:before {\n  opacity: 1;\n}\n.lol-voice-mic-test-button.small:before {\n  box-shadow: 0 0 0 1px #4bb44b;\n}\n.lol-voice-mic-test-label {\n  min-height: 16px;\n  margin-bottom: 5px;\n}\n.lol-voice-mic-test-button.active {\n  background-position-y: -96px;\n}\n',
          "",
          {
            version: 3,
            sources: [
              "webpack://./fe/rcp-fe-lol-premade-voice/src/elements/mic-test-button/style.styl",
            ],
            names: [],
            mappings:
              "AAAA;EACE,6BAA6B;AAC/B;AACA;EACE,6BAA6B;AAC/B;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,oBAAoB;EACpB,uCAAuC;EACvC,mCAAmC;AACrC;AACA;EACE,cAAc;EACd,eAAe;EACf,mBAAmB;EACnB,iBAAiB;EACjB,uBAAuB;EACvB,4CAA4C;AAC9C;AACA;EACE,eAAe;AACjB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,aAAa;EACb,WAAW;EACX,YAAY;EACZ,+DAA+D;EAC/D,0BAA0B;EAC1B,sBAAsB;EACtB,eAAe;AACjB;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,6BAA6B;EAC7B,eAAe;AACjB;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,wCAAwC;EACxC,kBAAkB;AACpB;AACA;EACE,WAAW;EACX,UAAU;EACV,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,qCAAqC;EACrC,6BAA6B;AAC/B;AACA;EACE,UAAU;AACZ;AACA;EACE,6BAA6B;AAC/B;AACA;EACE,gBAAgB;EAChB,kBAAkB;AACpB;AACA;EACE,4BAA4B;AAC9B",
            sourcesContent: [
              '.lol-voice-mic-test-label {\n  font-family: var(--font-body);\n}\n.lol-voice-mic-test-label {\n  font-family: var(--font-body);\n}\n.lol-voice-mic-test-label {\n  -webkit-user-select: none;\n}\n.lol-voice-mic-test-label {\n  font-kerning: normal;\n  -webkit-font-feature-settings: "kern" 1;\n  -webkit-font-smoothing: antialiased;\n}\n.lol-voice-mic-test-label {\n  color: #a09b8c;\n  font-size: 12px;\n  font-weight: normal;\n  line-height: 16px;\n  letter-spacing: 0.025em;\n  -webkit-font-smoothing: subpixel-antialiased;\n}\n.lol-voice-mic-test-label:lang(ja-jp) {\n  font-size: 13px;\n}\n.lol-voice-mic-test-label:lang(ar-ae) {\n  letter-spacing: 0;\n}\n.lol-voice-mic-test-button {\n  display: flex;\n  width: 38px;\n  height: 32px;\n  background-image: url("/fe/lol-premade-voice/voice-button.png");\n  background-position-y: 0px;\n  background-size: cover;\n  cursor: pointer;\n}\n.lol-voice-mic-test-button:hover:not(.button-disabled) {\n  background-position-y: -32px;\n}\n.lol-voice-mic-test-button:active:not(.button-disabled) {\n  background-position-y: -64px;\n}\n.lol-voice-mic-test-button.button-disabled {\n  background-position-y: -160px;\n  cursor: default;\n}\n.lol-voice-mic-test-button.active {\n  background-position-y: -96px;\n}\n.lol-voice-mic-test-button {\n  transition: box-shadow 0.15s ease-in-out;\n  position: relative;\n}\n.lol-voice-mic-test-button:before {\n  content: \'\';\n  opacity: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  transition: opacity 0.15s ease-in-out;\n  box-shadow: 0 0 0 2px #4bb44b;\n}\n.lol-voice-mic-test-button.speaking:before {\n  opacity: 1;\n}\n.lol-voice-mic-test-button.small:before {\n  box-shadow: 0 0 0 1px #4bb44b;\n}\n.lol-voice-mic-test-label {\n  min-height: 16px;\n  margin-bottom: 5px;\n}\n.lol-voice-mic-test-button.active {\n  background-position-y: -96px;\n}\n',
            ],
            sourceRoot: "",
          },
        ]),
          (e.exports = l);
      },
      (e, t, n) => {
        "use strict";
        var a = n(1);
        e.exports = class {
          constructor() {
            this._registerComponents(), this._addVoiceSocialButton();
          }
          voiceButton(e) {
            const t = document.createElement("lol-parties-comm-button");
            if (e)
              for (const n in e) e.hasOwnProperty(n) && t.setAttribute(n, e[n]);
            const n = this._voicePanel();
            return t.setVoicePanel(n), t;
          }
          _addVoiceSocialButton() {
            a.Social.addSocialButton(
              this.voiceButton({ social: "true" }),
              "CommButton",
              1,
            );
          }
          _voicePanel() {
            let e = this._panelInstance;
            return (
              e ||
                ((e = document.createElement("lol-parties-comm-panel")),
                (this._panelInstance = e)),
              e
            );
          }
          _registerComponents() {
            a.ComponentFactory.setFactory("lol-parties-comm-panel", () =>
              this._voicePanel(),
            );
          }
        };
      },
    ],
    t = {};
  function n(a) {
    var l = t[a];
    if (void 0 !== l) return l.exports;
    var i = (t[a] = { id: a, exports: {} });
    return e[a](i, i.exports, n), i.exports;
  }
  (n.r = (e) => {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
      Object.defineProperty(e, "__esModule", { value: !0 });
  }),
    (n.p = "/fe/lol-premade-voice/"),
    (() => {
      "use strict";
      var e = a(n(1)),
        t = a(n(2));
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      n(3);
      const l = "rcp-fe-lol-premade-voice",
        i = document.currentScript.ownerDocument;
      const o = window.getPluginAnnounceEventName(l);
      i.addEventListener(
        o,
        function (a) {
          const o = a.registrationHandler;
          t.default.set(i),
            o((t) =>
              e.default
                .init(t, {
                  Audio: (e) => e.get("rcp-fe-audio"),
                  ComponentFactory: (e) =>
                    e.get("rcp-fe-common-libs").getComponentFactory("1"),
                  ContextualNotificationManager: (e) =>
                    e
                      .get("rcp-fe-lol-uikit")
                      .getContextualNotificationManager(),
                  dataBinding: (e) =>
                    e
                      .get("rcp-fe-common-libs")
                      .getDataBinding("rcp-fe-lol-premade-voice"),
                  FlyoutManager: (e) =>
                    e.get("rcp-fe-lol-uikit").getFlyoutManager(),
                  logger: (e) => e.get("rcp-fe-common-libs").logging.create(l),
                  SettingsApi: (e) => e.get("rcp-fe-lol-settings"),
                  Social: (e) => e.get("rcp-fe-lol-social"),
                  TooltipManager: (e) =>
                    e.get("rcp-fe-lol-uikit").getTooltipManager(),
                  tra: (e) =>
                    e
                      .get("rcp-fe-lol-l10n")
                      .tra()
                      .overlay("/fe/lol-l10n/trans.json")
                      .overlay("/fe/lol-premade-voice/trans.json"),
                  webComponents: (e) =>
                    e.get("rcp-fe-common-libs").getWebComponents(i),
                })
                .then(() => e.default.tra.ready())
                .then(() => {
                  n(4)();
                  return new (n(70))();
                }),
            );
        },
        { once: !0 },
      );
    })();
})();
