(() => {
    var t = [, t => {
            "use strict";
            let e;

            function n() {
                return e || (console.error("The `provider` object has not been set, please do so by calling the `init` method."), null)
            }
            const i = {
                init: function(t, n) {
                    return e = t, this.add(n)
                },
                _getValue: function(t, n) {
                    let i;
                    return "function" == typeof n ? (i = n(e), i || console.warn("The function for key " + t + " returned a falsy value: ", i)) : "string" == typeof n ? (i = e.get(n), i || console.warn("The provider `get` invocation for the key " + t + " returned a falsy value: ", i)) : "object" == typeof n && (i = n), i
                },
                add: function(t) {
                    t = t || {};
                    const e = [],
                        n = this;
                    return Object.keys(t).forEach((function(i) {
                        const r = t[i],
                            o = n._getValue(i, r);
                        o && o.then ? (o.then((function(t) {
                            t || console.warn("The promise for the key " + i + " resolved with a falsy value: ", t), n._addValue(i, t)
                        })), e.push(o)) : n._addValue(i, o)
                    })), Promise.all(e)
                },
                _addValue: function(t, e) {
                    this[t] = e
                },
                provider: function() {
                    return console.error("The function `provider` has been deprecated, please use `getProvider`", (new Error).stack), n()
                },
                getProvider: function() {
                    return n()
                }
            };
            t.exports = i
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1),
                r = h(n(3)),
                o = l(n(4)),
                s = h(n(9)),
                a = h(n(10)),
                u = l(n(11));

            function c(t) {
                if ("function" != typeof WeakMap) return null;
                var e = new WeakMap,
                    n = new WeakMap;
                return (c = function(t) {
                    return t ? n : e
                })(t)
            }

            function l(t, e) {
                if (!e && t && t.__esModule) return t;
                if (null === t || "object" != typeof t && "function" != typeof t) return {
                    default: t
                };
                var n = c(e);
                if (n && n.has(t)) return n.get(t);
                var i = {},
                    r = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (var o in t)
                    if ("default" !== o && Object.prototype.hasOwnProperty.call(t, o)) {
                        var s = r ? Object.getOwnPropertyDescriptor(t, o) : null;
                        s && (s.get || s.set) ? Object.defineProperty(i, o, s) : i[o] = t[o]
                    } return i.default = t, n && n.set(t, i), i
            }

            function h(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const f = function() {
                this.audioContext = new AudioContext, this.channels = new Map, this._initMasterGainNode(), this._initializeDefaultChannels(), this._initializeChannelInteraction(), this._audioSettingsObserver = null
            };
            Object.assign(f.prototype, {
                initDataBindings(t) {
                    this._audioSettingsObserver && this._audioSettingsObserver.disconnect(), this._audioSettingsObserver = new a.default(t, this)
                },
                getChannel: function(t) {
                    return this.channels.get(t) || !1
                },
                createAudioManager: function(t) {
                    return new s.default(t, this)
                },
                _getAudioContext: function() {
                    return this.audioContext
                },
                close: function() {
                    return this._audioSettingsObserver && this._audioSettingsObserver.disconnect(), this.audioContext.close().then((() => {
                        this.audioContext = null
                    }))
                },
                muteAll: function() {
                    this.setMasterVolume(0)
                },
                unmuteAll: function() {
                    this.setMasterVolume(1)
                },
                setMasterVolume(t) {
                    Number.isFinite(t) ? (t < 0 ? t = 0 : t > 1 && (t = 1), this._masterGainNode.gain.value = t) : i.logger.warning("Attempted to set invalid volume for sound.", t)
                },
                _initMasterGainNode() {
                    this._masterGainNode = this.audioContext.createGain(), this._masterGainNode.connect(this.audioContext.destination)
                },
                _initializeDefaultChannels: function() {
                    const t = {
                            name: u.MUSIC_CHANNEL_NAME,
                            volume: 1,
                            maxConcurrent: 6,
                            playbackStrategy: "large_file"
                        },
                        e = this._createChannel(t);
                    this.channels.set(e.name, e), this._initializeMusicSubChannels(e);
                    const n = {
                            name: u.VOICE_CHANNEL_NAME,
                            volume: .5,
                            maxConcurrent: 2
                        },
                        i = this._createChannel(n);
                    this.channels.set(i.name, i), this._initializeVoiceSubChannels(i);
                    const r = {
                            name: u.SFX_CHANNEL_NAME,
                            volume: 1,
                            maxConcurrent: 2
                        },
                        o = this._createChannel(r);
                    this.channels.set(o.name, o), this._initializeSfxSubChannels(o)
                },
                _initializeMusicSubChannels: function(t) {
                    const e = {
                            name: u.MUSIC_SUB_CHANNEL_LOGIN_NAME,
                            volume: 1,
                            maxConcurrent: 2,
                            playbackStrategy: "large_file"
                        },
                        n = this._createChannel(e, t);
                    this.channels.set(n.name, n);
                    const i = {
                            name: u.MUSIC_SUB_CHANNEL_CHAMPIONS_NAME,
                            volume: 1,
                            maxConcurrent: 6,
                            playbackStrategy: "large_file"
                        },
                        r = this._createChannel(i, t);
                    this.channels.set(r.name, r);
                    const o = {
                            name: u.MUSIC_SUB_CHANNEL_AMBIENCE_NAME,
                            volume: 1,
                            maxConcurrent: 1,
                            playbackStrategy: "large_file"
                        },
                        s = this._createChannel(o, t);
                    this.channels.set(s.name, s)
                },
                _initializeVoiceSubChannels: function(t) {
                    const e = {
                            name: u.VOICE_SUB_CHANNEL_PICK_CHAMP_NAME,
                            volume: 1,
                            maxConcurrent: 2
                        },
                        n = this._createChannel(e, t);
                    this.channels.set(n.name, n);
                    const i = {
                            name: u.VOICE_SUB_CHANNEL_BAN_CHAMP_NAME,
                            volume: 1,
                            maxConcurrent: 2
                        },
                        r = this._createChannel(i, t);
                    this.channels.set(r.name, r)
                },
                _initializeSfxSubChannels: function(t) {
                    const e = {
                            name: u.SFX_SUB_CHANNEL_CHAMPIONS_NAME,
                            volume: .5,
                            maxConcurrent: 5
                        },
                        n = this._createChannel(e, t);
                    this.channels.set(n.name, n);
                    const i = {
                            name: u.SFX_SUB_CHANNEL_NOTIFICATIONS_NAME,
                            volume: 1,
                            maxConcurrent: 5
                        },
                        r = this._createChannel(i, t);
                    this.channels.set(r.name, r);
                    const s = {
                            name: u.SFX_SUB_CHANNEL_UI_NAME,
                            volume: 1,
                            maxConcurrent: 8
                        },
                        a = this._createChannel(s, t);
                    this.channels.set(a.name, a);
                    const c = {
                            name: u.SFX_SUB_CHANNEL_AMBIENCE_NAME,
                            volume: 1,
                            maxConcurrent: 1,
                            concurrentSoundCullingStrategy: o.CULLING_STRATEGY_FADE,
                            playbackStrategy: "large_file"
                        },
                        l = this._createChannel(c, t);
                    this.channels.set(l.name, l);
                    const h = {
                            name: u.SFX_SUB_CHANNEL_AMBIENCE_PERKS_NAME,
                            volume: 1,
                            maxConcurrent: 2,
                            playbackStrategy: "large_file"
                        },
                        f = this._createChannel(h, l);
                    this.channels.set(f.name, f);
                    const p = {
                            name: u.SFX_SUB_CHANNEL_AMBIENCE_INTERRUPTABLE_NAME,
                            volume: 1,
                            maxConcurrent: 1,
                            playbackStrategy: "large_file"
                        },
                        d = this._createChannel(p, t);
                    this.channels.set(p.name, d)
                },
                _initializeChannelInteraction: function() {
                    const t = this.channels.get(u.MUSIC_CHANNEL_NAME),
                        e = this.channels.get(u.VOICE_SUB_CHANNEL_PICK_CHAMP_NAME),
                        n = this.channels.get(u.VOICE_SUB_CHANNEL_BAN_CHAMP_NAME),
                        i = this.channels.get(u.SFX_SUB_CHANNEL_CHAMPIONS_NAME);
                    t.addDuckKeyChannel(e), t.addDuckKeyChannel(n), t.addDuckKeyChannel(i)
                },
                _createChannel: function(t, e) {
                    return e ? e.createSubChannel(this.audioContext, t) : ((t = t || {}).parentGainNodeGetter = () => this._masterGainNode, new o.default(this.audioContext, t))
                },
                getChannelsNames: function() {
                    return u
                }
            }), Object.assign(f.prototype, r.default);
            var p = f;
            e.default = p
        }, (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var n = {
                events: function() {
                    return this._events || (this._events = new Map), this._events
                },
                on: function(t, e) {
                    this.events().has(t) || this.events().set(t, new Map), this.events().get(t).set(e, !0)
                },
                off: function(t, e) {
                    this.events().has(t) && this.events().get(t).delete(e)
                },
                trigger: function(t, e) {
                    this.events().has(t) && this.events().get(t).forEach(((t, n) => {
                        n(this, e)
                    }))
                },
                purgeEvents: function() {
                    this.events().clear(), this._events = null
                },
                get: function(t) {
                    return this.options && void 0 !== this.options[t] ? this.options[t] : null
                },
                set: function(t, e) {
                    this.options && (this.options[t] = e, this.trigger("changed:" + t))
                }
            };
            e.default = n
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = e.CULLING_STRATEGY_STOP = e.CULLING_STRATEGY_FADE = void 0;
            var i = n(1),
                r = a(n(3)),
                o = a(n(5)),
                s = a(n(8));

            function a(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const u = "stop";
            e.CULLING_STRATEGY_STOP = u;
            const c = "fade";
            e.CULLING_STRATEGY_FADE = c;
            const l = {
                    analyserFftSize: 256,
                    crossfade: !1,
                    duckAttackMilliseconds: 200,
                    duckProcessingInterval: 50,
                    duckReleaseMilliseconds: 2e3,
                    duckThreshold: .1,
                    duckVolumePercent: .4,
                    maxConcurrent: 1,
                    concurrentSoundCullingStrategy: u,
                    playbackStrategy: "small_file",
                    volume: 1
                },
                h = function(t, e) {
                    if (this.audioContext = t, !(this.audioContext instanceof AudioContext)) {
                        throw new Error("this.audioContext must be an instance of AudioContext.")
                    }
                    this.options = Object.assign({}, l, e), this.options.name && (this.name = this.options.name), this.playingSounds = [], this.duckKeyTriggered = !1, this.duckCount = 0, this._currentDuckVolume = 1, this._duckVolumeTargetPercent = 1, this._currentActiveConnectedChannels = new Set, this.on("changed:volume", this._processDuckGain.bind(this)), this.set("gainNode", void 0), this._initVolume()
                };
            Object.assign(h.prototype, {
                _initVolume: function() {
                    const t = this.get("volume");
                    this.set("defaultVolume", t)
                },
                _initAnalyser: function() {
                    this.analyser = this.audioContext.createAnalyser(), this.analyser.fftSize = this.get("analyserFftSize"), this.analyserDataArray = new Float32Array(this.analyser.frequencyBinCount), this.analyser.connect(this.get("gainNode"))
                },
                createSound: function(t, e = {}) {
                    const n = {
                        duckOtherChannels: !1
                    };
                    (this.get("crossfade") || e.crossfade) && (n.fadeIn = !0, n.fadeOut = !0), e = e ? Object.assign(n, e) : n;
                    const i = this._createSoundObject(t, e);
                    return this._attachListeners(i), i
                },
                _attachListeners: function(t) {
                    t.on("play", this._onSoundPlay.bind(this)), t.on("pause", this._onSoundHalt.bind(this)), t.on("stop", this._onSoundHalt.bind(this)), t.on("end", this._onSoundHalt.bind(this))
                },
                playSound: function(t, e, n) {
                    return this.createSound(t, e).play(n).then((function(t) {
                        return t ? t.dispose() : t
                    }))
                },
                mute: function() {
                    this.set("volume", 0)
                },
                unmute: function() {
                    this.set("volume", this.get("defaultVolume"))
                },
                addDuckKeyChannel: function(t) {
                    t.on("duckTriggerStart", (() => this.addDuck())), t.on("duckTriggerEnd", (() => this.removeDuck()))
                },
                addDuck: function() {
                    return this.duckCount++, 1 === this.duckCount && (this._duckVolumeStartPercent = this._currentDuckVolume, this._duckVolumeTargetPercent = this.get("duckVolumePercent"), this._duckFadeStartTime = (new Date).getTime(), this._duckFadeEndTime = this.get("duckAttackMilliseconds") + this._duckFadeStartTime, this._processDuckGain()), this.duckCount
                },
                removeDuck: function() {
                    return this.duckCount--, 0 === this.duckCount && (this._duckVolumeStartPercent = this._currentDuckVolume, this._duckVolumeTargetPercent = 1, this._duckFadeStartTime = (new Date).getTime(), this._duckFadeEndTime = this.get("duckReleaseMilliseconds") + this._duckFadeStartTime, this._processDuckGain()), this.duckCount
                },
                createSubChannel: function(t, e) {
                    (e = e || {}).parentGainNodeGetter = t => (this._currentActiveConnectedChannels.add(t), this._checkOrInitializeGainNode());
                    const n = new h(t, e);
                    return n.on("gainNodeDestroyed", (t => {
                        this._currentActiveConnectedChannels.delete(t), this._cleanupGainNodeIfNoInputs()
                    })), n
                },
                _processDuckGain: function() {
                    const t = (new Date).getTime(),
                        e = this.get("gainNode");
                    if (!e) return;
                    let n = e.gain.value;
                    if (!this._duckFadeEndTime || t > this._duckFadeEndTime) n = this.get("volume") * this._duckVolumeTargetPercent;
                    else {
                        const e = (t - this._duckFadeStartTime) / (this._duckFadeEndTime - this._duckFadeStartTime),
                            i = this._duckVolumeStartPercent + e * (this._duckVolumeTargetPercent - this._duckVolumeStartPercent);
                        this._currentDuckVolume = i, n = this.get("volume") * i, setTimeout(this._processDuckGain.bind(this), this.get("duckProcessingInterval"))
                    }
                    return n = Math.min(1, n), n = Math.max(0, n), e.gain.value = n, e.gain.value
                },
                _multiplexCheck: function() {
                    const t = this.playingSounds.length,
                        e = this.get("maxConcurrent"),
                        n = this.get("concurrentSoundCullingStrategy");
                    if (t <= e) return;
                    let r;
                    switch (n) {
                        case u:
                            r = !0;
                            break;
                        case c:
                            r = !1;
                            break;
                        default:
                            r = !0, i.logger.error(`Invalid concurrentSoundCullingStrategy ${n}. Defaulting to stop.`)
                    }
                    let o = 0;
                    for (let n = t - 1; n >= 0; n--) this.playingSounds[n].isFadingOut() || (o < e ? o += 1 : r ? this.playingSounds[n].stop() : this.playingSounds[n].fadeOut(void 0, {
                        stop: !0
                    }))
                },
                _max: function(t) {
                    if (!t) return null;
                    let e = 0;
                    for (let n = 0; n < t.length; n++) {
                        const i = t[n];
                        i > e && (e = i)
                    }
                    return e
                },
                _doesAnySoundWantsToDuckOtherChannels: function(t) {
                    return !!t.find((function(t) {
                        return !!t.options.duckOtherChannels
                    }))
                },
                _duckTriggerCheck: function() {
                    if (!this.analyser) return;
                    this.analyser.getFloatTimeDomainData(this.analyserDataArray);
                    const t = this._max(this.analyserDataArray) > this.get("duckThreshold");
                    t && !this.duckKeyTriggered ? (this.duckKeyTriggered = !0, this.trigger("duckTriggerStart")) : !t && this.duckKeyTriggered && (this.duckKeyTriggered = !1, this.trigger("duckTriggerEnd")), this._checkDuckKeyInterval && !this._doesAnySoundWantsToDuckOtherChannels(this.playingSounds) && clearInterval(this._checkDuckKeyInterval)
                },
                _onSoundPlay: function(t) {
                    if (-1 !== this.playingSounds.indexOf(t)) return;
                    const e = t.get("gainNode");
                    this._checkOrInitializeGainNode(), t.options.duckOtherChannels && this.options.duckOtherChannels ? (e.connect(this.analyser), this._duckTriggerCheck(), this._checkDuckKeyInterval && clearInterval(this._checkDuckKeyInterval), this._checkDuckKeyInterval = setInterval(this._duckTriggerCheck.bind(this), this.get("duckProcessingInterval"))) : e.connect(this.get("gainNode")), this.playingSounds.push(t), 1 === this.playingSounds.length && this.trigger("play", t), this._multiplexCheck()
                },
                _onSoundHalt: function(t) {
                    const e = this.playingSounds.indexOf(t); - 1 !== e && this.playingSounds.splice(e, 1), 0 === this.playingSounds.length && this.trigger("end", t), t.options.duckOtherChannels && this._duckTriggerCheck(), this._cleanupGainNodeIfNoInputs()
                },
                _cleanupGainNodeIfNoInputs: function() {
                    const t = this.get("gainNode");
                    t && (this.analyser && 0 === this.playingSounds.length && (this.analyser.disconnect(), this.analyser = null), 0 === this._currentActiveConnectedChannels.size && 0 === this.playingSounds.length && (t.disconnect(), this.set("gainNode", void 0), this.trigger("gainNodeDestroyed", t)))
                },
                _createSoundObject: function(t, e) {
                    const n = this.get("playbackStrategy");
                    switch (n) {
                        case "large_file":
                            return new s.default(this.audioContext, t, e);
                        case "small_file":
                            return new o.default(this.audioContext, t, e);
                        default:
                            return i.logger.warning("Invalid playbackStrategy, defaulting to small_file", {
                                channelPlaybackStrategy: n,
                                url: t
                            }), new o.default(this.audioContext, t, e)
                    }
                },
                _createGainNode: function() {
                    return this.audioContext.createGain()
                },
                _checkOrInitializeGainNode: function() {
                    if (!this.get("gainNode")) {
                        const t = this._createGainNode();
                        this.set("gainNode", t), t.gain.value = this.get("volume"), this.options.duckOtherChannels && (this._initAnalyser(), this._processDuckGain()), this.options.parentGainNodeGetter && t.connect(this.options.parentGainNodeGetter(this))
                    }
                    return this.get("gainNode")
                }
            }), Object.assign(h.prototype, r.default);
            var f = h;
            e.default = f
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1),
                r = a(n(6)),
                o = a(n(3)),
                s = a(n(7));

            function a(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const u = function(t, e, n) {
                if (this.audioContext = t, !(this.audioContext instanceof AudioContext)) throw new Error("this.audioContext must be an instance of AudioContext.");
                this.options = {
                    url: "",
                    isLoop: !1,
                    allowConcurrency: !0
                }, Object.assign(this.options, n), this.audioBuffer = null, this.audioBufferSourceNode = null, this._isPlaybackPaused = !1, this._pendingPlaybacks = 0, this._playbackSettings = {}, e = e || null, this.set("url", e), this.set("gainNode", this._createGainNode())
            };
            Object.assign(u.prototype, {
                _readyPromise: null,
                _bufferSoundFile: function(t) {
                    return this.audioBuffer ? r.default.resolve(this) : this._loadAudioFile(t).then((t => (this.audioBuffer = t, this)))
                },
                ready: function() {
                    return this._readyPromise || (this._readyPromise = this._bufferSoundFile(this.get("url"))), this._readyPromise
                },
                isPlaying: function() {
                    return !!this.audioBufferSourceNode
                },
                play: function(t) {
                    const {
                        nTimes: e = 1,
                        when: n,
                        offset: i = 0,
                        duration: o
                    } = t || {};
                    return this.ready().then((() => !1 === this.options.allowConcurrency && this.isPlaying() ? this.stop().then((() => this._play(e, n, i, o))) : this._play(e, n, i, o))).catch((t => (this.dispose(), r.default.reject(t))))
                },
                _play: function(t, e, n, i) {
                    if (this._playbackSettings = {
                            when: e,
                            offset: n,
                            duration: i
                        }, this._isPlaybackPaused) {
                        const t = "Playback is not done, either resume or stop it.";
                        return r.default.reject(new Error(t))
                    }
                    return this.isPlaying = () => !0, this._pendingPlaybacks = t, this._replaysQueue(e, n, i)
                },
                _replaysQueue: function(t, e, n) {
                    return this._pendingPlaybacks > 0 ? this._playOnce(t, e, n) : (this.isPlaying = () => !1, r.default.resolve(this))
                },
                _playOnce: function(t = this.audioContext.currentTime, e = 0, n) {
                    return this._playbackStartTime = t, this.audioBufferSourceNode && this._destroyBufferSourceNode(), this.audioBufferSourceNode = this._createBufferSourceNode(), new r.default((i => {
                        this.audioBufferSourceNode.loop || (this.audioBufferSourceNode.onended = () => {
                            this._destroyBufferSourceNode(), 1 === this._pendingPlaybacks ? this.trigger("end", this) : this._pendingPlaybacks > 1 && this.trigger("endreplay", this), this._pendingPlaybacks = this._pendingPlaybacks - 1, i(this._replaysQueue(t, e, n))
                        }, this.audioBufferResolve = i), null !== n && n >= 0 ? this.audioBufferSourceNode.start(t, e, n) : this.audioBufferSourceNode.start(t, e), this.trigger("play", this)
                    }))
                },
                resume: function() {
                    if (!this._isPlaybackPaused) {
                        const t = "A pause has not been made, can not resume.";
                        return r.default.reject(new Error(t))
                    }
                    return this.ready().then((() => {
                        const {
                            offset: t,
                            duration: e
                        } = this._playbackSettings;
                        let {
                            when: n
                        } = this._playbackSettings;
                        this._isPlaybackPaused = !1, n || (n = this.audioContext.currentTime);
                        const i = n + this._playbackTimePassed;
                        return this._playbackTimePassed = 0, this._pendingPlaybacks = this._pendingPlaybacks + 1, this._playOnce(i, t, e).then((() => this._replaysQueue(n, t, e)))
                    }))
                },
                pause: function() {
                    return this._stop().then((() => {
                        const {
                            currentTime: t
                        } = this.audioContext;
                        return this._playbackTimePassed = t - this._playbackStartTime, this._isPlaybackPaused = !0, this.isPlaying = () => !1, this.trigger("stop", this), this
                    })).catch((() => {
                        i.logger.warning("Start playback before trying to pause it.")
                    }))
                },
                stop: function() {
                    return this._stop().then((() => this.trigger("stop", this)))
                },
                _stop: function() {
                    return new r.default(((t, e) => {
                        if (this.audioBufferSourceNode) try {
                            this.audioBufferSourceNode.onended = null, this.audioBufferResolve && (this.audioBufferResolve(), this.audioBufferResolve = null), this.audioBufferSourceNode.stop(), this._destroyBufferSourceNode(), this._isPlaybackPaused = !1, this.isPlaying = () => !1, this._pendingPlaybacks = this._pendingPlaybacks - 1, t(this)
                        } catch (t) {
                            e(t)
                        }
                    }))
                },
                dispose: function() {
                    if (this.audioBufferSourceNode) try {
                        this.audioBufferSourceNode.stop()
                    } catch (t) {
                        this._destroyBufferSourceNode()
                    }
                    return this.get("gainNode").disconnect(), this.purgeEvents(), r.default.resolve(this)
                },
                setVolume: function(t) {
                    Number.isFinite(t) ? this.get("gainNode").gain.value = t : i.logger.warning("Attempted to set invalid volume for sound.", t)
                },
                getVolume: function() {
                    return this.get("gainNode").gain.value
                },
                fadeIn: function(t) {
                    const {
                        fadeFrom: e,
                        fadeTo: n,
                        fadeTime: i,
                        fadeShape: o
                    } = this._computeFadeOptions(t, "in");
                    return this.fade(e, n, i, o), this.isFadingOut() && (clearTimeout(this._fadeOutStopTimer), delete this._fadeOutStopTimer), setTimeout((() => {
                        this.isPlaying() || this.play()
                    })), r.default.delay(i, this)
                },
                fadeOut: function(t) {
                    if (!this.isPlaying()) return r.default.resolve(this);
                    const {
                        fadeFrom: e,
                        fadeTo: n,
                        fadeTime: i,
                        fadeShape: o
                    } = this._computeFadeOptions(t, "out");
                    return this._fadeOutStopTimer = setTimeout((() => this.stop()), i), this.fade(e, n, i, o), r.default.delay(i, this)
                },
                isFadingOut: function() {
                    return void 0 !== this._fadeOutStopTimer
                },
                _computeFadeOptions: function(t, e) {
                    const n = t && "exponential" === t.fadeShape,
                        i = {
                            fadeFrom: "in" !== e || n ? this.get("gainNode").gain.value : 0,
                            fadeTo: "in" === e ? 1 : 0,
                            fadeTime: "in" === e ? 3e3 : 500,
                            fadeShape: "linear"
                        };
                    if (t = "number" == typeof t ? Object.assign({}, i, {
                            fadeTime: t
                        }) : "object" == typeof t ? Object.assign({}, i, t) : i, ["fadeTo", "fadeFrom"].forEach((e => {
                            "current" === t[e] && (t[e] = this.get("gainNode").gain.value)
                        })), "exponential" === t.fadeShape && 0 === t.fadeFrom) throw new Error("when using exponential fadein start volume must be greater then 0");
                    if ("linear" === t.fadeShape) t.fadeShape = {
                        isLinear: !0
                    };
                    else {
                        if ("exponential" !== t.fadeShape) throw new Error(`Unknown fade shape '${t.fadeShape}'. Must be either 'linear' or 'exponential'`);
                        t.fadeShape = {
                            isExponential: !0
                        }
                    }
                    return t
                },
                fade: function(t, e, n, i) {
                    const {
                        isLinear: r = !0,
                        isExponential: o = !1
                    } = i || {}, s = this.get("gainNode").gain, {
                        currentTime: a
                    } = this.audioContext;
                    s.setValueAtTime(t, a);
                    const u = a + n / 1e3;
                    r && !o ? s.linearRampToValueAtTime(e, u) : o && s.exponentialRampToValueAtTime(e, u)
                },
                _loadAudioFile: function(t) {
                    return s.default.xmlHttpAudioRequest(t).then((t => this.audioContext.decodeAudioData(t)))
                },
                _createGainNode: function() {
                    return this.audioContext.createGain()
                },
                _createBufferSourceNode: function() {
                    if (!(this.audioBuffer instanceof AudioBuffer)) throw new Error("SoundAudioBuffer.audioBuffer is not an instance of AudioBuffer.");
                    const t = this.audioContext.createBufferSource();
                    return t.buffer = this.audioBuffer, t.connect(this.get("gainNode")), t.loop = this.get("isLoop"), t
                },
                _destroyBufferSourceNode: function() {
                    this.audioBufferSourceNode && (this.audioBufferSourceNode.onended = null, this.audioBufferSourceNode.disconnect(), this.audioBufferSourceNode = null)
                }
            }), Object.assign(u.prototype, o.default), Object.defineProperty(u.prototype, "_isPlaying", {
                get: function() {
                    return i.logger.warning("_isPlaying has been depreciated, please use isPlaying instead"), this.isPlaying()
                }
            });
            var c = u;
            e.default = c
        }, (t, e, n) => {
            var i;
            i = function() {
                var t, e, i;
                return function t(e, n, i) {
                    function r(s, a) {
                        if (!n[s]) {
                            if (!e[s]) {
                                var u = "function" == typeof _dereq_ && _dereq_;
                                if (!a && u) return u(s, !0);
                                if (o) return o(s, !0);
                                var c = new Error("Cannot find module '" + s + "'");
                                throw c.code = "MODULE_NOT_FOUND", c
                            }
                            var l = n[s] = {
                                exports: {}
                            };
                            e[s][0].call(l.exports, (function(t) {
                                var n = e[s][1][t];
                                return r(n || t)
                            }), l, l.exports, t, e, n, i)
                        }
                        return n[s].exports
                    }
                    for (var o = "function" == typeof _dereq_ && _dereq_, s = 0; s < i.length; s++) r(i[s]);
                    return r
                }({
                    1: [function(t, e, n) {
                        "use strict";
                        e.exports = function(t) {
                            var e = t._SomePromiseArray;

                            function n(t) {
                                var n = new e(t),
                                    i = n.promise();
                                return n.setHowMany(1), n.setUnwrap(), n.init(), i
                            }
                            t.any = function(t) {
                                return n(t)
                            }, t.prototype.any = function() {
                                return n(this)
                            }
                        }
                    }, {}],
                    2: [function(t, e, n) {
                        "use strict";
                        var i;
                        try {
                            throw new Error
                        } catch (t) {
                            i = t
                        }
                        var r = t("./schedule"),
                            o = t("./queue"),
                            s = t("./util");

                        function a() {
                            this._isTickUsed = !1, this._lateQueue = new o(16), this._normalQueue = new o(16), this._haveDrainedQueues = !1, this._trampolineEnabled = !0;
                            var t = this;
                            this.drainQueues = function() {
                                t._drainQueues()
                            }, this._schedule = r
                        }

                        function u(t, e, n) {
                            this._lateQueue.push(t, e, n), this._queueTick()
                        }

                        function c(t, e, n) {
                            this._normalQueue.push(t, e, n), this._queueTick()
                        }

                        function l(t) {
                            this._normalQueue._pushOne(t), this._queueTick()
                        }
                        a.prototype.enableTrampoline = function() {
                            this._trampolineEnabled = !0
                        }, a.prototype.disableTrampolineIfNecessary = function() {
                            s.hasDevTools && (this._trampolineEnabled = !1)
                        }, a.prototype.haveItemsQueued = function() {
                            return this._isTickUsed || this._haveDrainedQueues
                        }, a.prototype.fatalError = function(t, e) {
                            e ? (process.stderr.write("Fatal " + (t instanceof Error ? t.stack : t) + "\n"), process.exit(2)) : this.throwLater(t)
                        }, a.prototype.throwLater = function(t, e) {
                            if (1 === arguments.length && (e = t, t = function() {
                                    throw e
                                }), "undefined" != typeof setTimeout) setTimeout((function() {
                                t(e)
                            }), 0);
                            else try {
                                this._schedule((function() {
                                    t(e)
                                }))
                            } catch (t) {
                                throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")
                            }
                        }, s.hasDevTools ? (a.prototype.invokeLater = function(t, e, n) {
                            this._trampolineEnabled ? u.call(this, t, e, n) : this._schedule((function() {
                                setTimeout((function() {
                                    t.call(e, n)
                                }), 100)
                            }))
                        }, a.prototype.invoke = function(t, e, n) {
                            this._trampolineEnabled ? c.call(this, t, e, n) : this._schedule((function() {
                                t.call(e, n)
                            }))
                        }, a.prototype.settlePromises = function(t) {
                            this._trampolineEnabled ? l.call(this, t) : this._schedule((function() {
                                t._settlePromises()
                            }))
                        }) : (a.prototype.invokeLater = u, a.prototype.invoke = c, a.prototype.settlePromises = l), a.prototype.invokeFirst = function(t, e, n) {
                            this._normalQueue.unshift(t, e, n), this._queueTick()
                        }, a.prototype._drainQueue = function(t) {
                            for (; t.length() > 0;) {
                                var e = t.shift();
                                if ("function" == typeof e) {
                                    var n = t.shift(),
                                        i = t.shift();
                                    e.call(n, i)
                                } else e._settlePromises()
                            }
                        }, a.prototype._drainQueues = function() {
                            this._drainQueue(this._normalQueue), this._reset(), this._haveDrainedQueues = !0, this._drainQueue(this._lateQueue)
                        }, a.prototype._queueTick = function() {
                            this._isTickUsed || (this._isTickUsed = !0, this._schedule(this.drainQueues))
                        }, a.prototype._reset = function() {
                            this._isTickUsed = !1
                        }, e.exports = a, e.exports.firstLineError = i
                    }, {
                        "./queue": 26,
                        "./schedule": 29,
                        "./util": 36
                    }],
                    3: [function(t, e, n) {
                        "use strict";
                        e.exports = function(t, e, n, i) {
                            var r = !1,
                                o = function(t, e) {
                                    this._reject(e)
                                },
                                s = function(t, e) {
                                    e.promiseRejectionQueued = !0, e.bindingPromise._then(o, o, null, this, t)
                                },
                                a = function(t, e) {
                                    0 == (50397184 & this._bitField) && this._resolveCallback(e.target)
                                },
                                u = function(t, e) {
                                    e.promiseRejectionQueued || this._reject(t)
                                };
                            t.prototype.bind = function(o) {
                                r || (r = !0, t.prototype._propagateFrom = i.propagateFromFunction(), t.prototype._boundValue = i.boundValueFunction());
                                var c = n(o),
                                    l = new t(e);
                                l._propagateFrom(this, 1);
                                var h = this._target();
                                if (l._setBoundTo(c), c instanceof t) {
                                    var f = {
                                        promiseRejectionQueued: !1,
                                        promise: l,
                                        target: h,
                                        bindingPromise: c
                                    };
                                    h._then(e, s, void 0, l, f), c._then(a, u, void 0, l, f), l._setOnCancel(c)
                                } else l._resolveCallback(h);
                                return l
                            }, t.prototype._setBoundTo = function(t) {
                                void 0 !== t ? (this._bitField = 2097152 | this._bitField, this._boundTo = t) : this._bitField = -2097153 & this._bitField
                            }, t.prototype._isBound = function() {
                                return 2097152 == (2097152 & this._bitField)
                            }, t.bind = function(e, n) {
                                return t.resolve(n).bind(e)
                            }
                        }
                    }, {}],
                    4: [function(t, e, n) {
                        "use strict";
                        var i;
                        "undefined" != typeof Promise && (i = Promise);
                        var r = t("./promise")();
                        r.noConflict = function() {
                            try {
                                Promise === r && (Promise = i)
                            } catch (t) {}
                            return r
                        }, e.exports = r
                    }, {
                        "./promise": 22
                    }],
                    5: [function(t, e, n) {
                        "use strict";
                        var i = Object.create;
                        if (i) {
                            var r = i(null),
                                o = i(null);
                            r[" size"] = o[" size"] = 0
                        }
                        e.exports = function(e) {
                            var n = t("./util"),
                                i = n.canEvaluate;

                            function r(t) {
                                var i = function(t, i) {
                                    var r;
                                    if (null != t && (r = t[i]), "function" != typeof r) {
                                        var o = "Object " + n.classString(t) + " has no method '" + n.toString(i) + "'";
                                        throw new e.TypeError(o)
                                    }
                                    return r
                                }(t, this.pop());
                                return i.apply(t, this)
                            }

                            function o(t) {
                                return t[this]
                            }

                            function s(t) {
                                var e = +this;
                                return e < 0 && (e = Math.max(0, e + t.length)), t[e]
                            }
                            n.isIdentifier, e.prototype.call = function(t) {
                                var e = [].slice.call(arguments, 1);
                                return e.push(t), this._then(r, void 0, void 0, e, void 0)
                            }, e.prototype.get = function(t) {
                                var e;
                                if ("number" == typeof t) e = s;
                                else if (i) {
                                    var n = (void 0)(t);
                                    e = null !== n ? n : o
                                } else e = o;
                                return this._then(e, void 0, void 0, t, void 0)
                            }
                        }
                    }, {
                        "./util": 36
                    }],
                    6: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e, n, i, r) {
                            var o = t("./util"),
                                s = o.tryCatch,
                                a = o.errorObj,
                                u = e._async;
                            e.prototype.break = e.prototype.cancel = function() {
                                if (!r.cancellation()) return this._warn("cancellation is disabled");
                                for (var t = this, e = t; t.isCancellable();) {
                                    if (!t._cancelBy(e)) {
                                        e._isFollowing() ? e._followee().cancel() : e._cancelBranched();
                                        break
                                    }
                                    var n = t._cancellationParent;
                                    if (null == n || !n.isCancellable()) {
                                        t._isFollowing() ? t._followee().cancel() : t._cancelBranched();
                                        break
                                    }
                                    t._isFollowing() && t._followee().cancel(), e = t, t = n
                                }
                            }, e.prototype._branchHasCancelled = function() {
                                this._branchesRemainingToCancel--
                            }, e.prototype._enoughBranchesHaveCancelled = function() {
                                return void 0 === this._branchesRemainingToCancel || this._branchesRemainingToCancel <= 0
                            }, e.prototype._cancelBy = function(t) {
                                return t === this ? (this._branchesRemainingToCancel = 0, this._invokeOnCancel(), !0) : (this._branchHasCancelled(), !!this._enoughBranchesHaveCancelled() && (this._invokeOnCancel(), !0))
                            }, e.prototype._cancelBranched = function() {
                                this._enoughBranchesHaveCancelled() && this._cancel()
                            }, e.prototype._cancel = function() {
                                this.isCancellable() && (this._setCancelled(), u.invoke(this._cancelPromises, this, void 0))
                            }, e.prototype._cancelPromises = function() {
                                this._length() > 0 && this._settlePromises()
                            }, e.prototype._unsetOnCancel = function() {
                                this._onCancelField = void 0
                            }, e.prototype.isCancellable = function() {
                                return this.isPending() && !this.isCancelled()
                            }, e.prototype._doInvokeOnCancel = function(t, e) {
                                if (o.isArray(t))
                                    for (var n = 0; n < t.length; ++n) this._doInvokeOnCancel(t[n], e);
                                else if (void 0 !== t)
                                    if ("function" == typeof t) {
                                        if (!e) {
                                            var i = s(t).call(this._boundValue());
                                            i === a && (this._attachExtraTrace(i.e), u.throwLater(i.e))
                                        }
                                    } else t._resultCancelled(this)
                            }, e.prototype._invokeOnCancel = function() {
                                var t = this._onCancel();
                                this._unsetOnCancel(), u.invoke(this._doInvokeOnCancel, this, t)
                            }, e.prototype._invokeInternalOnCancel = function() {
                                this.isCancellable() && (this._doInvokeOnCancel(this._onCancel(), !0), this._unsetOnCancel())
                            }, e.prototype._resultCancelled = function() {
                                this.cancel()
                            }
                        }
                    }, {
                        "./util": 36
                    }],
                    7: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e) {
                            var n = t("./util"),
                                i = t("./es5").keys,
                                r = n.tryCatch,
                                o = n.errorObj;
                            return function(t, s, a) {
                                return function(u) {
                                    var c = a._boundValue();
                                    t: for (var l = 0; l < t.length; ++l) {
                                        var h = t[l];
                                        if (h === Error || null != h && h.prototype instanceof Error) {
                                            if (u instanceof h) return r(s).call(c, u)
                                        } else if ("function" == typeof h) {
                                            var f = r(h).call(c, u);
                                            if (f === o) return f;
                                            if (f) return r(s).call(c, u)
                                        } else if (n.isObject(u)) {
                                            for (var p = i(h), d = 0; d < p.length; ++d) {
                                                var _ = p[d];
                                                if (h[_] != u[_]) continue t
                                            }
                                            return r(s).call(c, u)
                                        }
                                    }
                                    return e
                                }
                            }
                        }
                    }, {
                        "./es5": 13,
                        "./util": 36
                    }],
                    8: [function(t, e, n) {
                        "use strict";
                        e.exports = function(t) {
                            var e = !1,
                                n = [];

                            function i() {
                                this._trace = new i.CapturedTrace(r())
                            }

                            function r() {
                                var t = n.length - 1;
                                if (t >= 0) return n[t]
                            }
                            return t.prototype._promiseCreated = function() {}, t.prototype._pushContext = function() {}, t.prototype._popContext = function() {
                                return null
                            }, t._peekContext = t.prototype._peekContext = function() {}, i.prototype._pushContext = function() {
                                void 0 !== this._trace && (this._trace._promiseCreated = null, n.push(this._trace))
                            }, i.prototype._popContext = function() {
                                if (void 0 !== this._trace) {
                                    var t = n.pop(),
                                        e = t._promiseCreated;
                                    return t._promiseCreated = null, e
                                }
                                return null
                            }, i.CapturedTrace = null, i.create = function() {
                                if (e) return new i
                            }, i.deactivateLongStackTraces = function() {}, i.activateLongStackTraces = function() {
                                var n = t.prototype._pushContext,
                                    o = t.prototype._popContext,
                                    s = t._peekContext,
                                    a = t.prototype._peekContext,
                                    u = t.prototype._promiseCreated;
                                i.deactivateLongStackTraces = function() {
                                    t.prototype._pushContext = n, t.prototype._popContext = o, t._peekContext = s, t.prototype._peekContext = a, t.prototype._promiseCreated = u, e = !1
                                }, e = !0, t.prototype._pushContext = i.prototype._pushContext, t.prototype._popContext = i.prototype._popContext, t._peekContext = t.prototype._peekContext = r, t.prototype._promiseCreated = function() {
                                    var t = this._peekContext();
                                    t && null == t._promiseCreated && (t._promiseCreated = this)
                                }
                            }, i
                        }
                    }, {}],
                    9: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e, n) {
                            var i, r, o, s = e._getDomain,
                                a = e._async,
                                u = t("./errors").Warning,
                                c = t("./util"),
                                l = c.canAttachTrace,
                                h = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/,
                                f = null,
                                p = null,
                                d = !1,
                                _ = !(0 == c.env("BLUEBIRD_DEBUG")),
                                g = !(0 == c.env("BLUEBIRD_WARNINGS") || !_ && !c.env("BLUEBIRD_WARNINGS")),
                                v = !(0 == c.env("BLUEBIRD_LONG_STACK_TRACES") || !_ && !c.env("BLUEBIRD_LONG_STACK_TRACES")),
                                y = 0 != c.env("BLUEBIRD_W_FORGOTTEN_RETURN") && (g || !!c.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
                            e.prototype.suppressUnhandledRejections = function() {
                                var t = this._target();
                                t._bitField = -1048577 & t._bitField | 524288
                            }, e.prototype._ensurePossibleRejectionHandled = function() {
                                0 == (524288 & this._bitField) && (this._setRejectionIsUnhandled(), a.invokeLater(this._notifyUnhandledRejection, this, void 0))
                            }, e.prototype._notifyUnhandledRejectionIsHandled = function() {
                                V("rejectionHandled", i, void 0, this)
                            }, e.prototype._setReturnedNonUndefined = function() {
                                this._bitField = 268435456 | this._bitField
                            }, e.prototype._returnedNonUndefined = function() {
                                return 0 != (268435456 & this._bitField)
                            }, e.prototype._notifyUnhandledRejection = function() {
                                if (this._isRejectionUnhandled()) {
                                    var t = this._settledValue();
                                    this._setUnhandledRejectionIsNotified(), V("unhandledRejection", r, t, this)
                                }
                            }, e.prototype._setUnhandledRejectionIsNotified = function() {
                                this._bitField = 262144 | this._bitField
                            }, e.prototype._unsetUnhandledRejectionIsNotified = function() {
                                this._bitField = -262145 & this._bitField
                            }, e.prototype._isUnhandledRejectionNotified = function() {
                                return (262144 & this._bitField) > 0
                            }, e.prototype._setRejectionIsUnhandled = function() {
                                this._bitField = 1048576 | this._bitField
                            }, e.prototype._unsetRejectionIsUnhandled = function() {
                                this._bitField = -1048577 & this._bitField, this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(), this._notifyUnhandledRejectionIsHandled())
                            }, e.prototype._isRejectionUnhandled = function() {
                                return (1048576 & this._bitField) > 0
                            }, e.prototype._warn = function(t, e, n) {
                                return R(t, e, n || this)
                            }, e.onPossiblyUnhandledRejection = function(t) {
                                var e = s();
                                r = "function" == typeof t ? null === e ? t : e.bind(t) : void 0
                            }, e.onUnhandledRejectionHandled = function(t) {
                                var e = s();
                                i = "function" == typeof t ? null === e ? t : e.bind(t) : void 0
                            };
                            var m = function() {};
                            e.longStackTraces = function() {
                                if (a.haveItemsQueued() && !Q.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                                if (!Q.longStackTraces && D()) {
                                    var t = e.prototype._captureStackTrace,
                                        i = e.prototype._attachExtraTrace;
                                    Q.longStackTraces = !0, m = function() {
                                        if (a.haveItemsQueued() && !Q.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                                        e.prototype._captureStackTrace = t, e.prototype._attachExtraTrace = i, n.deactivateLongStackTraces(), a.enableTrampoline(), Q.longStackTraces = !1
                                    }, e.prototype._captureStackTrace = M, e.prototype._attachExtraTrace = I, n.activateLongStackTraces(), a.disableTrampolineIfNecessary()
                                }
                            }, e.hasLongStackTraces = function() {
                                return Q.longStackTraces && D()
                            };
                            var C = function() {
                                    try {
                                        var t = document.createEvent("CustomEvent");
                                        return t.initCustomEvent("testingtheevent", !1, !0, {}), c.global.dispatchEvent(t),
                                            function(t, e) {
                                                var n = document.createEvent("CustomEvent");
                                                return n.initCustomEvent(t.toLowerCase(), !1, !0, e), !c.global.dispatchEvent(n)
                                            }
                                    } catch (t) {}
                                    return function() {
                                        return !1
                                    }
                                }(),
                                b = c.isNode ? function() {
                                    return process.emit.apply(process, arguments)
                                } : c.global ? function(t) {
                                    var e = "on" + t.toLowerCase(),
                                        n = c.global[e];
                                    return !!n && (n.apply(c.global, [].slice.call(arguments, 1)), !0)
                                } : function() {
                                    return !1
                                };

                            function E(t, e) {
                                return {
                                    promise: e
                                }
                            }
                            var S = {
                                    promiseCreated: E,
                                    promiseFulfilled: E,
                                    promiseRejected: E,
                                    promiseResolved: E,
                                    promiseCancelled: E,
                                    promiseChained: function(t, e, n) {
                                        return {
                                            promise: e,
                                            child: n
                                        }
                                    },
                                    warning: function(t, e) {
                                        return {
                                            warning: e
                                        }
                                    },
                                    unhandledRejection: function(t, e, n) {
                                        return {
                                            reason: e,
                                            promise: n
                                        }
                                    },
                                    rejectionHandled: E
                                },
                                N = function(t) {
                                    var e = !1;
                                    try {
                                        e = b.apply(null, arguments)
                                    } catch (t) {
                                        a.throwLater(t), e = !0
                                    }
                                    var n = !1;
                                    try {
                                        n = C(t, S[t].apply(null, arguments))
                                    } catch (t) {
                                        a.throwLater(t), n = !0
                                    }
                                    return n || e
                                };

                            function k() {
                                return !1
                            }

                            function w(t, e, n) {
                                var i = this;
                                try {
                                    t(e, n, (function(t) {
                                        if ("function" != typeof t) throw new TypeError("onCancel must be a function, got: " + c.toString(t));
                                        i._attachCancellationCallback(t)
                                    }))
                                } catch (t) {
                                    return t
                                }
                            }

                            function A(t) {
                                if (!this.isCancellable()) return this;
                                var e = this._onCancel();
                                void 0 !== e ? c.isArray(e) ? e.push(t) : this._setOnCancel([e, t]) : this._setOnCancel(t)
                            }

                            function T() {
                                return this._onCancelField
                            }

                            function F(t) {
                                this._onCancelField = t
                            }

                            function j() {
                                this._cancellationParent = void 0, this._onCancelField = void 0
                            }

                            function P(t, e) {
                                if (0 != (1 & e)) {
                                    this._cancellationParent = t;
                                    var n = t._branchesRemainingToCancel;
                                    void 0 === n && (n = 0), t._branchesRemainingToCancel = n + 1
                                }
                                0 != (2 & e) && t._isBound() && this._setBoundTo(t._boundTo)
                            }
                            e.config = function(t) {
                                if ("longStackTraces" in (t = Object(t)) && (t.longStackTraces ? e.longStackTraces() : !t.longStackTraces && e.hasLongStackTraces() && m()), "warnings" in t) {
                                    var n = t.warnings;
                                    Q.warnings = !!n, y = Q.warnings, c.isObject(n) && "wForgottenReturn" in n && (y = !!n.wForgottenReturn)
                                }
                                if ("cancellation" in t && t.cancellation && !Q.cancellation) {
                                    if (a.haveItemsQueued()) throw new Error("cannot enable cancellation after promises are in use");
                                    e.prototype._clearCancellationData = j, e.prototype._propagateFrom = P, e.prototype._onCancel = T, e.prototype._setOnCancel = F, e.prototype._attachCancellationCallback = A, e.prototype._execute = w, x = P, Q.cancellation = !0
                                }
                                "monitoring" in t && (t.monitoring && !Q.monitoring ? (Q.monitoring = !0, e.prototype._fireEvent = N) : !t.monitoring && Q.monitoring && (Q.monitoring = !1, e.prototype._fireEvent = k))
                            }, e.prototype._fireEvent = k, e.prototype._execute = function(t, e, n) {
                                try {
                                    t(e, n)
                                } catch (t) {
                                    return t
                                }
                            }, e.prototype._onCancel = function() {}, e.prototype._setOnCancel = function(t) {}, e.prototype._attachCancellationCallback = function(t) {}, e.prototype._captureStackTrace = function() {}, e.prototype._attachExtraTrace = function() {}, e.prototype._clearCancellationData = function() {}, e.prototype._propagateFrom = function(t, e) {};
                            var x = function(t, e) {
                                0 != (2 & e) && t._isBound() && this._setBoundTo(t._boundTo)
                            };

                            function O() {
                                var t = this._boundTo;
                                return void 0 !== t && t instanceof e ? t.isFulfilled() ? t.value() : void 0 : t
                            }

                            function M() {
                                this._trace = new z(this._peekContext())
                            }

                            function I(t, e) {
                                if (l(t)) {
                                    var n = this._trace;
                                    if (void 0 !== n && e && (n = n._parent), void 0 !== n) n.attachExtraTrace(t);
                                    else if (!t.__stackCleaned__) {
                                        var i = L(t);
                                        c.notEnumerableProp(t, "stack", i.message + "\n" + i.stack.join("\n")), c.notEnumerableProp(t, "__stackCleaned__", !0)
                                    }
                                }
                            }

                            function R(t, n, i) {
                                if (Q.warnings) {
                                    var r, o = new u(t);
                                    if (n) i._attachExtraTrace(o);
                                    else if (Q.longStackTraces && (r = e._peekContext())) r.attachExtraTrace(o);
                                    else {
                                        var s = L(o);
                                        o.stack = s.message + "\n" + s.stack.join("\n")
                                    }
                                    N("warning", o) || H(o, "", !0)
                                }
                            }

                            function B(t) {
                                for (var e = [], n = 0; n < t.length; ++n) {
                                    var i = t[n],
                                        r = "    (No stack trace)" === i || f.test(i),
                                        o = r && G(i);
                                    r && !o && (d && " " !== i.charAt(0) && (i = "    " + i), e.push(i))
                                }
                                return e
                            }

                            function L(t) {
                                var e = t.stack,
                                    n = t.toString();
                                return e = "string" == typeof e && e.length > 0 ? function(t) {
                                    for (var e = t.stack.replace(/\s+$/g, "").split("\n"), n = 0; n < e.length; ++n) {
                                        var i = e[n];
                                        if ("    (No stack trace)" === i || f.test(i)) break
                                    }
                                    return n > 0 && (e = e.slice(n)), e
                                }(t) : ["    (No stack trace)"], {
                                    message: n,
                                    stack: B(e)
                                }
                            }

                            function H(t, e, n) {
                                if ("undefined" != typeof console) {
                                    var i;
                                    if (c.isObject(t)) {
                                        var r = t.stack;
                                        i = e + p(r, t)
                                    } else i = e + String(t);
                                    "function" == typeof o ? o(i, n) : "function" != typeof console.log && "object" != typeof console.log || console.log(i)
                                }
                            }

                            function V(t, e, n, i) {
                                var r = !1;
                                try {
                                    "function" == typeof e && (r = !0, "rejectionHandled" === t ? e(i) : e(n, i))
                                } catch (t) {
                                    a.throwLater(t)
                                }
                                "unhandledRejection" === t ? N(t, n, i) || r || H(n, "Unhandled rejection ") : N(t, i)
                            }

                            function U(t) {
                                var e;
                                if ("function" == typeof t) e = "[function " + (t.name || "anonymous") + "]";
                                else {
                                    if (e = t && "function" == typeof t.toString ? t.toString() : c.toString(t), /\[object [a-zA-Z0-9$_]+\]/.test(e)) try {
                                        e = JSON.stringify(t)
                                    } catch (t) {}
                                    0 === e.length && (e = "(empty array)")
                                }
                                return "(<" + function(t) {
                                    var e = 41;
                                    return t.length < e ? t : t.substr(0, e - 3) + "..."
                                }(e) + ">, no stack trace)"
                            }

                            function D() {
                                return "function" == typeof $
                            }
                            var G = function() {
                                    return !1
                                },
                                X = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;

                            function q(t) {
                                var e = t.match(X);
                                if (e) return {
                                    fileName: e[1],
                                    line: parseInt(e[2], 10)
                                }
                            }

                            function z(t) {
                                this._parent = t, this._promisesCreated = 0;
                                var e = this._length = 1 + (void 0 === t ? 0 : t._length);
                                $(this, z), e > 32 && this.uncycle()
                            }
                            c.inherits(z, Error), n.CapturedTrace = z, z.prototype.uncycle = function() {
                                var t = this._length;
                                if (!(t < 2)) {
                                    for (var e = [], n = {}, i = 0, r = this; void 0 !== r; ++i) e.push(r), r = r._parent;
                                    for (i = (t = this._length = i) - 1; i >= 0; --i) {
                                        var o = e[i].stack;
                                        void 0 === n[o] && (n[o] = i)
                                    }
                                    for (i = 0; i < t; ++i) {
                                        var s = n[e[i].stack];
                                        if (void 0 !== s && s !== i) {
                                            s > 0 && (e[s - 1]._parent = void 0, e[s - 1]._length = 1), e[i]._parent = void 0, e[i]._length = 1;
                                            var a = i > 0 ? e[i - 1] : this;
                                            s < t - 1 ? (a._parent = e[s + 1], a._parent.uncycle(), a._length = a._parent._length + 1) : (a._parent = void 0, a._length = 1);
                                            for (var u = a._length + 1, c = i - 2; c >= 0; --c) e[c]._length = u, u++;
                                            return
                                        }
                                    }
                                }
                            }, z.prototype.attachExtraTrace = function(t) {
                                if (!t.__stackCleaned__) {
                                    this.uncycle();
                                    for (var e = L(t), n = e.message, i = [e.stack], r = this; void 0 !== r;) i.push(B(r.stack.split("\n"))), r = r._parent;
                                    ! function(t) {
                                        for (var e = t[0], n = 1; n < t.length; ++n) {
                                            for (var i = t[n], r = e.length - 1, o = e[r], s = -1, a = i.length - 1; a >= 0; --a)
                                                if (i[a] === o) {
                                                    s = a;
                                                    break
                                                } for (a = s; a >= 0; --a) {
                                                var u = i[a];
                                                if (e[r] !== u) break;
                                                e.pop(), r--
                                            }
                                            e = i
                                        }
                                    }(i),
                                    function(t) {
                                        for (var e = 0; e < t.length; ++e)(0 === t[e].length || e + 1 < t.length && t[e][0] === t[e + 1][0]) && (t.splice(e, 1), e--)
                                    }(i), c.notEnumerableProp(t, "stack", function(t, e) {
                                        for (var n = 0; n < e.length - 1; ++n) e[n].push("From previous event:"), e[n] = e[n].join("\n");
                                        return n < e.length && (e[n] = e[n].join("\n")), t + "\n" + e.join("\n")
                                    }(n, i)), c.notEnumerableProp(t, "__stackCleaned__", !0)
                                }
                            };
                            var $ = function() {
                                var t = /^\s*at\s*/,
                                    e = function(t, e) {
                                        return "string" == typeof t ? t : void 0 !== e.name && void 0 !== e.message ? e.toString() : U(e)
                                    };
                                if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace) {
                                    Error.stackTraceLimit += 6, f = t, p = e;
                                    var n = Error.captureStackTrace;
                                    return G = function(t) {
                                            return h.test(t)
                                        },
                                        function(t, e) {
                                            Error.stackTraceLimit += 6, n(t, e), Error.stackTraceLimit -= 6
                                        }
                                }
                                var i, r = new Error;
                                if ("string" == typeof r.stack && r.stack.split("\n")[0].indexOf("stackDetection@") >= 0) return f = /@/, p = e, d = !0,
                                    function(t) {
                                        t.stack = (new Error).stack
                                    };
                                try {
                                    throw new Error
                                } catch (t) {
                                    i = "stack" in t
                                }
                                return !("stack" in r) && i && "number" == typeof Error.stackTraceLimit ? (f = t, p = e, function(t) {
                                    Error.stackTraceLimit += 6;
                                    try {
                                        throw new Error
                                    } catch (e) {
                                        t.stack = e.stack
                                    }
                                    Error.stackTraceLimit -= 6
                                }) : (p = function(t, e) {
                                    return "string" == typeof t ? t : "object" != typeof e && "function" != typeof e || void 0 === e.name || void 0 === e.message ? U(e) : e.toString()
                                }, null)
                            }();
                            "undefined" != typeof console && void 0 !== console.warn && (o = function(t) {
                                console.warn(t)
                            }, c.isNode && process.stderr.isTTY ? o = function(t, e) {
                                var n = e ? "[33m" : "[31m";
                                console.warn(n + t + "[0m\n")
                            } : c.isNode || "string" != typeof(new Error).stack || (o = function(t, e) {
                                console.warn("%c" + t, e ? "color: darkorange" : "color: red")
                            }));
                            var Q = {
                                warnings: g,
                                longStackTraces: !1,
                                cancellation: !1,
                                monitoring: !1
                            };
                            return v && e.longStackTraces(), {
                                longStackTraces: function() {
                                    return Q.longStackTraces
                                },
                                warnings: function() {
                                    return Q.warnings
                                },
                                cancellation: function() {
                                    return Q.cancellation
                                },
                                monitoring: function() {
                                    return Q.monitoring
                                },
                                propagateFromFunction: function() {
                                    return x
                                },
                                boundValueFunction: function() {
                                    return O
                                },
                                checkForgottenReturns: function(t, e, n, i, r) {
                                    if (void 0 === t && null !== e && y) {
                                        if (void 0 !== r && r._returnedNonUndefined()) return;
                                        n && (n += " ");
                                        var o = "a promise was created in a " + n + "handler but was not returned from it";
                                        i._warn(o, !0, e)
                                    }
                                },
                                setBounds: function(t, e) {
                                    if (D()) {
                                        for (var n, i, r = t.stack.split("\n"), o = e.stack.split("\n"), s = -1, a = -1, u = 0; u < r.length; ++u)
                                            if (c = q(r[u])) {
                                                n = c.fileName, s = c.line;
                                                break
                                            } for (u = 0; u < o.length; ++u) {
                                            var c;
                                            if (c = q(o[u])) {
                                                i = c.fileName, a = c.line;
                                                break
                                            }
                                        }
                                        s < 0 || a < 0 || !n || !i || n !== i || s >= a || (G = function(t) {
                                            if (h.test(t)) return !0;
                                            var e = q(t);
                                            return !!(e && e.fileName === n && s <= e.line && e.line <= a)
                                        })
                                    }
                                },
                                warn: R,
                                deprecated: function(t, e) {
                                    var n = t + " is deprecated and will be removed in a future version.";
                                    return e && (n += " Use " + e + " instead."), R(n)
                                },
                                CapturedTrace: z,
                                fireDomEvent: C,
                                fireGlobalEvent: b
                            }
                        }
                    }, {
                        "./errors": 12,
                        "./util": 36
                    }],
                    10: [function(t, e, n) {
                        "use strict";
                        e.exports = function(t) {
                            function e() {
                                return this.value
                            }

                            function n() {
                                throw this.reason
                            }
                            t.prototype.return = t.prototype.thenReturn = function(n) {
                                return n instanceof t && n.suppressUnhandledRejections(), this._then(e, void 0, void 0, {
                                    value: n
                                }, void 0)
                            }, t.prototype.throw = t.prototype.thenThrow = function(t) {
                                return this._then(n, void 0, void 0, {
                                    reason: t
                                }, void 0)
                            }, t.prototype.catchThrow = function(t) {
                                if (arguments.length <= 1) return this._then(void 0, n, void 0, {
                                    reason: t
                                }, void 0);
                                var e = arguments[1];
                                return this.caught(t, (function() {
                                    throw e
                                }))
                            }, t.prototype.catchReturn = function(n) {
                                if (arguments.length <= 1) return n instanceof t && n.suppressUnhandledRejections(), this._then(void 0, e, void 0, {
                                    value: n
                                }, void 0);
                                var i = arguments[1];
                                return i instanceof t && i.suppressUnhandledRejections(), this.caught(n, (function() {
                                    return i
                                }))
                            }
                        }
                    }, {}],
                    11: [function(t, e, n) {
                        "use strict";
                        e.exports = function(t, e) {
                            var n = t.reduce,
                                i = t.all;

                            function r() {
                                return i(this)
                            }

                            function o(t, i) {
                                return n(t, i, e, e)
                            }
                            t.prototype.each = function(t) {
                                return this.mapSeries(t)._then(r, void 0, void 0, this, void 0)
                            }, t.prototype.mapSeries = function(t) {
                                return n(this, t, e, e)
                            }, t.each = function(t, e) {
                                return o(t, e)._then(r, void 0, void 0, t, void 0)
                            }, t.mapSeries = o
                        }
                    }, {}],
                    12: [function(t, e, n) {
                        "use strict";
                        var i, r, o = t("./es5"),
                            s = o.freeze,
                            a = t("./util"),
                            u = a.inherits,
                            c = a.notEnumerableProp;

                        function l(t, e) {
                            function n(i) {
                                if (!(this instanceof n)) return new n(i);
                                c(this, "message", "string" == typeof i ? i : e), c(this, "name", t), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this)
                            }
                            return u(n, Error), n
                        }
                        var h = l("Warning", "warning"),
                            f = l("CancellationError", "cancellation error"),
                            p = l("TimeoutError", "timeout error"),
                            d = l("AggregateError", "aggregate error");
                        try {
                            i = TypeError, r = RangeError
                        } catch (t) {
                            i = l("TypeError", "type error"), r = l("RangeError", "range error")
                        }
                        for (var _ = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), g = 0; g < _.length; ++g) "function" == typeof Array.prototype[_[g]] && (d.prototype[_[g]] = Array.prototype[_[g]]);
                        o.defineProperty(d.prototype, "length", {
                            value: 0,
                            configurable: !1,
                            writable: !0,
                            enumerable: !0
                        }), d.prototype.isOperational = !0;
                        var v = 0;

                        function y(t) {
                            if (!(this instanceof y)) return new y(t);
                            c(this, "name", "OperationalError"), c(this, "message", t), this.cause = t, this.isOperational = !0, t instanceof Error ? (c(this, "message", t.message), c(this, "stack", t.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor)
                        }
                        d.prototype.toString = function() {
                            var t = Array(4 * v + 1).join(" "),
                                e = "\n" + t + "AggregateError of:\n";
                            v++, t = Array(4 * v + 1).join(" ");
                            for (var n = 0; n < this.length; ++n) {
                                for (var i = this[n] === this ? "[Circular AggregateError]" : this[n] + "", r = i.split("\n"), o = 0; o < r.length; ++o) r[o] = t + r[o];
                                e += (i = r.join("\n")) + "\n"
                            }
                            return v--, e
                        }, u(y, Error);
                        var m = Error.__BluebirdErrorTypes__;
                        m || (m = s({
                            CancellationError: f,
                            TimeoutError: p,
                            OperationalError: y,
                            RejectionError: y,
                            AggregateError: d
                        }), o.defineProperty(Error, "__BluebirdErrorTypes__", {
                            value: m,
                            writable: !1,
                            enumerable: !1,
                            configurable: !1
                        })), e.exports = {
                            Error,
                            TypeError: i,
                            RangeError: r,
                            CancellationError: m.CancellationError,
                            OperationalError: m.OperationalError,
                            TimeoutError: m.TimeoutError,
                            AggregateError: m.AggregateError,
                            Warning: h
                        }
                    }, {
                        "./es5": 13,
                        "./util": 36
                    }],
                    13: [function(t, e, n) {
                        var i = function() {
                            "use strict";
                            return void 0 === this
                        }();
                        if (i) e.exports = {
                            freeze: Object.freeze,
                            defineProperty: Object.defineProperty,
                            getDescriptor: Object.getOwnPropertyDescriptor,
                            keys: Object.keys,
                            names: Object.getOwnPropertyNames,
                            getPrototypeOf: Object.getPrototypeOf,
                            isArray: Array.isArray,
                            isES5: i,
                            propertyIsWritable: function(t, e) {
                                var n = Object.getOwnPropertyDescriptor(t, e);
                                return !(n && !n.writable && !n.set)
                            }
                        };
                        else {
                            var r = {}.hasOwnProperty,
                                o = {}.toString,
                                s = {}.constructor.prototype,
                                a = function(t) {
                                    var e = [];
                                    for (var n in t) r.call(t, n) && e.push(n);
                                    return e
                                };
                            e.exports = {
                                isArray: function(t) {
                                    try {
                                        return "[object Array]" === o.call(t)
                                    } catch (t) {
                                        return !1
                                    }
                                },
                                keys: a,
                                names: a,
                                defineProperty: function(t, e, n) {
                                    return t[e] = n.value, t
                                },
                                getDescriptor: function(t, e) {
                                    return {
                                        value: t[e]
                                    }
                                },
                                freeze: function(t) {
                                    return t
                                },
                                getPrototypeOf: function(t) {
                                    try {
                                        return Object(t).constructor.prototype
                                    } catch (t) {
                                        return s
                                    }
                                },
                                isES5: i,
                                propertyIsWritable: function() {
                                    return !0
                                }
                            }
                        }
                    }, {}],
                    14: [function(t, e, n) {
                        "use strict";
                        e.exports = function(t, e) {
                            var n = t.map;
                            t.prototype.filter = function(t, i) {
                                return n(this, t, i, e)
                            }, t.filter = function(t, i, r) {
                                return n(t, i, r, e)
                            }
                        }
                    }, {}],
                    15: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e, n) {
                            var i = t("./util"),
                                r = e.CancellationError,
                                o = i.errorObj;

                            function s(t, e, n) {
                                this.promise = t, this.type = e, this.handler = n, this.called = !1, this.cancelPromise = null
                            }

                            function a(t) {
                                this.finallyHandler = t
                            }

                            function u(t, e) {
                                return null != t.cancelPromise && (arguments.length > 1 ? t.cancelPromise._reject(e) : t.cancelPromise._cancel(), t.cancelPromise = null, !0)
                            }

                            function c() {
                                return h.call(this, this.promise._target()._settledValue())
                            }

                            function l(t) {
                                if (!u(this, t)) return o.e = t, o
                            }

                            function h(t) {
                                var i = this.promise,
                                    s = this.handler;
                                if (!this.called) {
                                    this.called = !0;
                                    var h = this.isFinallyHandler() ? s.call(i._boundValue()) : s.call(i._boundValue(), t);
                                    if (void 0 !== h) {
                                        i._setReturnedNonUndefined();
                                        var f = n(h, i);
                                        if (f instanceof e) {
                                            if (null != this.cancelPromise) {
                                                if (f.isCancelled()) {
                                                    var p = new r("late cancellation observer");
                                                    return i._attachExtraTrace(p), o.e = p, o
                                                }
                                                f.isPending() && f._attachCancellationCallback(new a(this))
                                            }
                                            return f._then(c, l, void 0, this, void 0)
                                        }
                                    }
                                }
                                return i.isRejected() ? (u(this), o.e = t, o) : (u(this), t)
                            }
                            return s.prototype.isFinallyHandler = function() {
                                return 0 === this.type
                            }, a.prototype._resultCancelled = function() {
                                u(this.finallyHandler)
                            }, e.prototype._passThrough = function(t, e, n, i) {
                                return "function" != typeof t ? this.then() : this._then(n, i, void 0, new s(this, e, t), void 0)
                            }, e.prototype.lastly = e.prototype.finally = function(t) {
                                return this._passThrough(t, 0, h, h)
                            }, e.prototype.tap = function(t) {
                                return this._passThrough(t, 1, h)
                            }, s
                        }
                    }, {
                        "./util": 36
                    }],
                    16: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e, n, i, r, o, s) {
                            var a = t("./errors").TypeError,
                                u = t("./util"),
                                c = u.errorObj,
                                l = u.tryCatch,
                                h = [];

                            function f(t, n, r, o) {
                                var s = this._promise = new e(i);
                                s._captureStackTrace(), s._setOnCancel(this), this._stack = o, this._generatorFunction = t, this._receiver = n, this._generator = void 0, this._yieldHandlers = "function" == typeof r ? [r].concat(h) : h, this._yieldedPromise = null
                            }
                            u.inherits(f, o), f.prototype._isResolved = function() {
                                return null === this._promise
                            }, f.prototype._cleanup = function() {
                                this._promise = this._generator = null
                            }, f.prototype._promiseCancelled = function() {
                                if (!this._isResolved()) {
                                    var t;
                                    if (void 0 !== this._generator.return) this._promise._pushContext(), t = l(this._generator.return).call(this._generator, void 0), this._promise._popContext();
                                    else {
                                        var n = new e.CancellationError("generator .return() sentinel");
                                        e.coroutine.returnSentinel = n, this._promise._attachExtraTrace(n), this._promise._pushContext(), t = l(this._generator.throw).call(this._generator, n), this._promise._popContext(), t === c && t.e === n && (t = null)
                                    }
                                    var i = this._promise;
                                    this._cleanup(), t === c ? i._rejectCallback(t.e, !1) : i.cancel()
                                }
                            }, f.prototype._promiseFulfilled = function(t) {
                                this._yieldedPromise = null, this._promise._pushContext();
                                var e = l(this._generator.next).call(this._generator, t);
                                this._promise._popContext(), this._continue(e)
                            }, f.prototype._promiseRejected = function(t) {
                                this._yieldedPromise = null, this._promise._attachExtraTrace(t), this._promise._pushContext();
                                var e = l(this._generator.throw).call(this._generator, t);
                                this._promise._popContext(), this._continue(e)
                            }, f.prototype._resultCancelled = function() {
                                if (this._yieldedPromise instanceof e) {
                                    var t = this._yieldedPromise;
                                    this._yieldedPromise = null, t.cancel()
                                }
                            }, f.prototype.promise = function() {
                                return this._promise
                            }, f.prototype._run = function() {
                                this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = void 0, this._promiseFulfilled(void 0)
                            }, f.prototype._continue = function(t) {
                                var n = this._promise;
                                if (t === c) return this._cleanup(), n._rejectCallback(t.e, !1);
                                var i = t.value;
                                if (!0 === t.done) return this._cleanup(), n._resolveCallback(i);
                                var o = r(i, this._promise);
                                if (o instanceof e || (o = function(t, n, i) {
                                        for (var o = 0; o < n.length; ++o) {
                                            i._pushContext();
                                            var s = l(n[o])(t);
                                            if (i._popContext(), s === c) {
                                                i._pushContext();
                                                var a = e.reject(c.e);
                                                return i._popContext(), a
                                            }
                                            var u = r(s, i);
                                            if (u instanceof e) return u
                                        }
                                        return null
                                    }(o, this._yieldHandlers, this._promise), null !== o)) {
                                    var s = (o = o._target())._bitField;
                                    0 == (50397184 & s) ? (this._yieldedPromise = o, o._proxy(this, null)) : 0 != (33554432 & s) ? this._promiseFulfilled(o._value()) : 0 != (16777216 & s) ? this._promiseRejected(o._reason()) : this._promiseCancelled()
                                } else this._promiseRejected(new a("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", i) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")))
                            }, e.coroutine = function(t, e) {
                                if ("function" != typeof t) throw new a("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                                var n = Object(e).yieldHandler,
                                    i = f,
                                    r = (new Error).stack;
                                return function() {
                                    var e = t.apply(this, arguments),
                                        o = new i(void 0, void 0, n, r),
                                        s = o.promise();
                                    return o._generator = e, o._promiseFulfilled(void 0), s
                                }
                            }, e.coroutine.addYieldHandler = function(t) {
                                if ("function" != typeof t) throw new a("expecting a function but got " + u.classString(t));
                                h.push(t)
                            }, e.spawn = function(t) {
                                if (s.deprecated("Promise.spawn()", "Promise.coroutine()"), "function" != typeof t) return n("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                                var i = new f(t, this),
                                    r = i.promise();
                                return i._run(e.spawn), r
                            }
                        }
                    }, {
                        "./errors": 12,
                        "./util": 36
                    }],
                    17: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e, n, i, r) {
                            var o = t("./util");
                            o.canEvaluate, o.tryCatch, o.errorObj, e.join = function() {
                                var t, e = arguments.length - 1;
                                e > 0 && "function" == typeof arguments[e] && (t = arguments[e]);
                                var i = [].slice.call(arguments);
                                t && i.pop();
                                var r = new n(i).promise();
                                return void 0 !== t ? r.spread(t) : r
                            }
                        }
                    }, {
                        "./util": 36
                    }],
                    18: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e, n, i, r, o, s) {
                            var a = e._getDomain,
                                u = t("./util"),
                                c = u.tryCatch,
                                l = u.errorObj,
                                h = [];

                            function f(t, e, n, i) {
                                this.constructor$(t), this._promise._captureStackTrace();
                                var r = a();
                                this._callback = null === r ? e : r.bind(e), this._preservedValues = i === o ? new Array(this.length()) : null, this._limit = n, this._inFlight = 0, this._queue = n >= 1 ? [] : h, this._init$(void 0, -2)
                            }

                            function p(t, e, n, r) {
                                if ("function" != typeof e) return i("expecting a function but got " + u.classString(e));
                                var o = "object" == typeof n && null !== n ? n.concurrency : 0;
                                return new f(t, e, o = "number" == typeof o && isFinite(o) && o >= 1 ? o : 0, r).promise()
                            }
                            u.inherits(f, n), f.prototype._init = function() {}, f.prototype._promiseFulfilled = function(t, n) {
                                var i = this._values,
                                    o = this.length(),
                                    a = this._preservedValues,
                                    u = this._limit;
                                if (n < 0) {
                                    if (i[n = -1 * n - 1] = t, u >= 1 && (this._inFlight--, this._drainQueue(), this._isResolved())) return !0
                                } else {
                                    if (u >= 1 && this._inFlight >= u) return i[n] = t, this._queue.push(n), !1;
                                    null !== a && (a[n] = t);
                                    var h = this._promise,
                                        f = this._callback,
                                        p = h._boundValue();
                                    h._pushContext();
                                    var d = c(f).call(p, t, n, o),
                                        _ = h._popContext();
                                    if (s.checkForgottenReturns(d, _, null !== a ? "Promise.filter" : "Promise.map", h), d === l) return this._reject(d.e), !0;
                                    var g = r(d, this._promise);
                                    if (g instanceof e) {
                                        var v = (g = g._target())._bitField;
                                        if (0 == (50397184 & v)) return u >= 1 && this._inFlight++, i[n] = g, g._proxy(this, -1 * (n + 1)), !1;
                                        if (0 == (33554432 & v)) return 0 != (16777216 & v) ? (this._reject(g._reason()), !0) : (this._cancel(), !0);
                                        d = g._value()
                                    }
                                    i[n] = d
                                }
                                return ++this._totalResolved >= o && (null !== a ? this._filter(i, a) : this._resolve(i), !0)
                            }, f.prototype._drainQueue = function() {
                                for (var t = this._queue, e = this._limit, n = this._values; t.length > 0 && this._inFlight < e;) {
                                    if (this._isResolved()) return;
                                    var i = t.pop();
                                    this._promiseFulfilled(n[i], i)
                                }
                            }, f.prototype._filter = function(t, e) {
                                for (var n = e.length, i = new Array(n), r = 0, o = 0; o < n; ++o) t[o] && (i[r++] = e[o]);
                                i.length = r, this._resolve(i)
                            }, f.prototype.preservedValues = function() {
                                return this._preservedValues
                            }, e.prototype.map = function(t, e) {
                                return p(this, t, e, null)
                            }, e.map = function(t, e, n, i) {
                                return p(t, e, n, i)
                            }
                        }
                    }, {
                        "./util": 36
                    }],
                    19: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e, n, i, r, o) {
                            var s = t("./util"),
                                a = s.tryCatch;
                            e.method = function(t) {
                                if ("function" != typeof t) throw new e.TypeError("expecting a function but got " + s.classString(t));
                                return function() {
                                    var i = new e(n);
                                    i._captureStackTrace(), i._pushContext();
                                    var r = a(t).apply(this, arguments),
                                        s = i._popContext();
                                    return o.checkForgottenReturns(r, s, "Promise.method", i), i._resolveFromSyncValue(r), i
                                }
                            }, e.attempt = e.try = function(t) {
                                if ("function" != typeof t) return r("expecting a function but got " + s.classString(t));
                                var i, u = new e(n);
                                if (u._captureStackTrace(), u._pushContext(), arguments.length > 1) {
                                    o.deprecated("calling Promise.try with more than 1 argument");
                                    var c = arguments[1],
                                        l = arguments[2];
                                    i = s.isArray(c) ? a(t).apply(l, c) : a(t).call(l, c)
                                } else i = a(t)();
                                var h = u._popContext();
                                return o.checkForgottenReturns(i, h, "Promise.try", u), u._resolveFromSyncValue(i), u
                            }, e.prototype._resolveFromSyncValue = function(t) {
                                t === s.errorObj ? this._rejectCallback(t.e, !1) : this._resolveCallback(t, !0)
                            }
                        }
                    }, {
                        "./util": 36
                    }],
                    20: [function(t, e, n) {
                        "use strict";
                        var i = t("./util"),
                            r = i.maybeWrapAsError,
                            o = t("./errors").OperationalError,
                            s = t("./es5"),
                            a = /^(?:name|message|stack|cause)$/;

                        function u(t) {
                            var e;
                            if (function(t) {
                                    return t instanceof Error && s.getPrototypeOf(t) === Error.prototype
                                }(t)) {
                                (e = new o(t)).name = t.name, e.message = t.message, e.stack = t.stack;
                                for (var n = s.keys(t), r = 0; r < n.length; ++r) {
                                    var u = n[r];
                                    a.test(u) || (e[u] = t[u])
                                }
                                return e
                            }
                            return i.markAsOriginatingFromRejection(t), t
                        }
                        e.exports = function(t, e) {
                            return function(n, i) {
                                if (null !== t) {
                                    if (n) {
                                        var o = u(r(n));
                                        t._attachExtraTrace(o), t._reject(o)
                                    } else if (e) {
                                        var s = [].slice.call(arguments, 1);
                                        t._fulfill(s)
                                    } else t._fulfill(i);
                                    t = null
                                }
                            }
                        }
                    }, {
                        "./errors": 12,
                        "./es5": 13,
                        "./util": 36
                    }],
                    21: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e) {
                            var n = t("./util"),
                                i = e._async,
                                r = n.tryCatch,
                                o = n.errorObj;

                            function s(t, e) {
                                if (!n.isArray(t)) return a.call(this, t, e);
                                var s = r(e).apply(this._boundValue(), [null].concat(t));
                                s === o && i.throwLater(s.e)
                            }

                            function a(t, e) {
                                var n = this._boundValue(),
                                    s = void 0 === t ? r(e).call(n, null) : r(e).call(n, null, t);
                                s === o && i.throwLater(s.e)
                            }

                            function u(t, e) {
                                if (!t) {
                                    var n = new Error(t + "");
                                    n.cause = t, t = n
                                }
                                var s = r(e).call(this._boundValue(), t);
                                s === o && i.throwLater(s.e)
                            }
                            e.prototype.asCallback = e.prototype.nodeify = function(t, e) {
                                if ("function" == typeof t) {
                                    var n = a;
                                    void 0 !== e && Object(e).spread && (n = s), this._then(n, u, void 0, this, t)
                                }
                                return this
                            }
                        }
                    }, {
                        "./util": 36
                    }],
                    22: [function(t, e, n) {
                        "use strict";
                        e.exports = function() {
                            var e = function() {
                                    return new f("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n")
                                },
                                n = function() {
                                    return new A.PromiseInspection(this._target())
                                },
                                i = function(t) {
                                    return A.reject(new f(t))
                                };

                            function r() {}
                            var o, s = {},
                                a = t("./util");
                            o = a.isNode ? function() {
                                var t = process.domain;
                                return void 0 === t && (t = null), t
                            } : function() {
                                return null
                            }, a.notEnumerableProp(A, "_getDomain", o);
                            var u = t("./es5"),
                                c = t("./async"),
                                l = new c;
                            u.defineProperty(A, "_async", {
                                value: l
                            });
                            var h = t("./errors"),
                                f = A.TypeError = h.TypeError;
                            A.RangeError = h.RangeError;
                            var p = A.CancellationError = h.CancellationError;
                            A.TimeoutError = h.TimeoutError, A.OperationalError = h.OperationalError, A.RejectionError = h.OperationalError, A.AggregateError = h.AggregateError;
                            var d = function() {},
                                _ = {},
                                g = {},
                                v = t("./thenables")(A, d),
                                y = t("./promise_array")(A, d, v, i, r),
                                m = t("./context")(A),
                                C = m.create,
                                b = t("./debuggability")(A, m),
                                E = (b.CapturedTrace, t("./finally")(A, v)),
                                S = t("./catch_filter")(g),
                                N = t("./nodeback"),
                                k = a.errorObj,
                                w = a.tryCatch;

                            function A(t) {
                                this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, this._promise0 = void 0, this._receiver0 = void 0, t !== d && (function(t, e) {
                                    if ("function" != typeof e) throw new f("expecting a function but got " + a.classString(e));
                                    if (t.constructor !== A) throw new f("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n")
                                }(this, t), this._resolveFromExecutor(t)), this._promiseCreated(), this._fireEvent("promiseCreated", this)
                            }

                            function T(t) {
                                this.promise._resolveCallback(t)
                            }

                            function F(t) {
                                this.promise._rejectCallback(t, !1)
                            }

                            function j(t) {
                                var e = new A(d);
                                e._fulfillmentHandler0 = t, e._rejectionHandler0 = t, e._promise0 = t, e._receiver0 = t
                            }
                            return A.prototype.toString = function() {
                                return "[object Promise]"
                            }, A.prototype.caught = A.prototype.catch = function(t) {
                                var e = arguments.length;
                                if (e > 1) {
                                    var n, r = new Array(e - 1),
                                        o = 0;
                                    for (n = 0; n < e - 1; ++n) {
                                        var s = arguments[n];
                                        if (!a.isObject(s)) return i("expecting an object but got " + a.classString(s));
                                        r[o++] = s
                                    }
                                    return r.length = o, t = arguments[n], this.then(void 0, S(r, t, this))
                                }
                                return this.then(void 0, t)
                            }, A.prototype.reflect = function() {
                                return this._then(n, n, void 0, this, void 0)
                            }, A.prototype.then = function(t, e) {
                                if (b.warnings() && arguments.length > 0 && "function" != typeof t && "function" != typeof e) {
                                    var n = ".then() only accepts functions but was passed: " + a.classString(t);
                                    arguments.length > 1 && (n += ", " + a.classString(e)), this._warn(n)
                                }
                                return this._then(t, e, void 0, void 0, void 0)
                            }, A.prototype.done = function(t, e) {
                                this._then(t, e, void 0, void 0, void 0)._setIsFinal()
                            }, A.prototype.spread = function(t) {
                                return "function" != typeof t ? i("expecting a function but got " + a.classString(t)) : this.all()._then(t, void 0, void 0, _, void 0)
                            }, A.prototype.toJSON = function() {
                                var t = {
                                    isFulfilled: !1,
                                    isRejected: !1,
                                    fulfillmentValue: void 0,
                                    rejectionReason: void 0
                                };
                                return this.isFulfilled() ? (t.fulfillmentValue = this.value(), t.isFulfilled = !0) : this.isRejected() && (t.rejectionReason = this.reason(), t.isRejected = !0), t
                            }, A.prototype.all = function() {
                                return arguments.length > 0 && this._warn(".all() was passed arguments but it does not take any"), new y(this).promise()
                            }, A.prototype.error = function(t) {
                                return this.caught(a.originatesFromRejection, t)
                            }, A.is = function(t) {
                                return t instanceof A
                            }, A.fromNode = A.fromCallback = function(t) {
                                var e = new A(d);
                                e._captureStackTrace();
                                var n = arguments.length > 1 && !!Object(arguments[1]).multiArgs,
                                    i = w(t)(N(e, n));
                                return i === k && e._rejectCallback(i.e, !0), e._isFateSealed() || e._setAsyncGuaranteed(), e
                            }, A.all = function(t) {
                                return new y(t).promise()
                            }, A.cast = function(t) {
                                var e = v(t);
                                return e instanceof A || ((e = new A(d))._captureStackTrace(), e._setFulfilled(), e._rejectionHandler0 = t), e
                            }, A.resolve = A.fulfilled = A.cast, A.reject = A.rejected = function(t) {
                                var e = new A(d);
                                return e._captureStackTrace(), e._rejectCallback(t, !0), e
                            }, A.setScheduler = function(t) {
                                if ("function" != typeof t) throw new f("expecting a function but got " + a.classString(t));
                                var e = l._schedule;
                                return l._schedule = t, e
                            }, A.prototype._then = function(t, e, n, i, r) {
                                var s = void 0 !== r,
                                    a = s ? r : new A(d),
                                    u = this._target(),
                                    c = u._bitField;
                                s || (a._propagateFrom(this, 3), a._captureStackTrace(), void 0 === i && 0 != (2097152 & this._bitField) && (i = 0 != (50397184 & c) ? this._boundValue() : u === this ? void 0 : this._boundTo), this._fireEvent("promiseChained", this, a));
                                var h = o();
                                if (0 != (50397184 & c)) {
                                    var f, _, g = u._settlePromiseCtx;
                                    0 != (33554432 & c) ? (_ = u._rejectionHandler0, f = t) : 0 != (16777216 & c) ? (_ = u._fulfillmentHandler0, f = e, u._unsetRejectionIsUnhandled()) : (g = u._settlePromiseLateCancellationObserver, _ = new p("late cancellation observer"), u._attachExtraTrace(_), f = e), l.invoke(g, u, {
                                        handler: null === h ? f : "function" == typeof f && h.bind(f),
                                        promise: a,
                                        receiver: i,
                                        value: _
                                    })
                                } else u._addCallbacks(t, e, a, i, h);
                                return a
                            }, A.prototype._length = function() {
                                return 65535 & this._bitField
                            }, A.prototype._isFateSealed = function() {
                                return 0 != (117506048 & this._bitField)
                            }, A.prototype._isFollowing = function() {
                                return 67108864 == (67108864 & this._bitField)
                            }, A.prototype._setLength = function(t) {
                                this._bitField = -65536 & this._bitField | 65535 & t
                            }, A.prototype._setFulfilled = function() {
                                this._bitField = 33554432 | this._bitField, this._fireEvent("promiseFulfilled", this)
                            }, A.prototype._setRejected = function() {
                                this._bitField = 16777216 | this._bitField, this._fireEvent("promiseRejected", this)
                            }, A.prototype._setFollowing = function() {
                                this._bitField = 67108864 | this._bitField, this._fireEvent("promiseResolved", this)
                            }, A.prototype._setIsFinal = function() {
                                this._bitField = 4194304 | this._bitField
                            }, A.prototype._isFinal = function() {
                                return (4194304 & this._bitField) > 0
                            }, A.prototype._unsetCancelled = function() {
                                this._bitField = -65537 & this._bitField
                            }, A.prototype._setCancelled = function() {
                                this._bitField = 65536 | this._bitField, this._fireEvent("promiseCancelled", this)
                            }, A.prototype._setAsyncGuaranteed = function() {
                                this._bitField = 134217728 | this._bitField
                            }, A.prototype._receiverAt = function(t) {
                                var e = 0 === t ? this._receiver0 : this[4 * t - 4 + 3];
                                if (e !== s) return void 0 === e && this._isBound() ? this._boundValue() : e
                            }, A.prototype._promiseAt = function(t) {
                                return this[4 * t - 4 + 2]
                            }, A.prototype._fulfillmentHandlerAt = function(t) {
                                return this[4 * t - 4 + 0]
                            }, A.prototype._rejectionHandlerAt = function(t) {
                                return this[4 * t - 4 + 1]
                            }, A.prototype._boundValue = function() {}, A.prototype._migrateCallback0 = function(t) {
                                t._bitField;
                                var e = t._fulfillmentHandler0,
                                    n = t._rejectionHandler0,
                                    i = t._promise0,
                                    r = t._receiverAt(0);
                                void 0 === r && (r = s), this._addCallbacks(e, n, i, r, null)
                            }, A.prototype._migrateCallbackAt = function(t, e) {
                                var n = t._fulfillmentHandlerAt(e),
                                    i = t._rejectionHandlerAt(e),
                                    r = t._promiseAt(e),
                                    o = t._receiverAt(e);
                                void 0 === o && (o = s), this._addCallbacks(n, i, r, o, null)
                            }, A.prototype._addCallbacks = function(t, e, n, i, r) {
                                var o = this._length();
                                if (o >= 65531 && (o = 0, this._setLength(0)), 0 === o) this._promise0 = n, this._receiver0 = i, "function" == typeof t && (this._fulfillmentHandler0 = null === r ? t : r.bind(t)), "function" == typeof e && (this._rejectionHandler0 = null === r ? e : r.bind(e));
                                else {
                                    var s = 4 * o - 4;
                                    this[s + 2] = n, this[s + 3] = i, "function" == typeof t && (this[s + 0] = null === r ? t : r.bind(t)), "function" == typeof e && (this[s + 1] = null === r ? e : r.bind(e))
                                }
                                return this._setLength(o + 1), o
                            }, A.prototype._proxy = function(t, e) {
                                this._addCallbacks(void 0, void 0, e, t, null)
                            }, A.prototype._resolveCallback = function(t, n) {
                                if (0 == (117506048 & this._bitField)) {
                                    if (t === this) return this._rejectCallback(e(), !1);
                                    var i = v(t, this);
                                    if (!(i instanceof A)) return this._fulfill(t);
                                    n && this._propagateFrom(i, 2);
                                    var r = i._target();
                                    if (r !== this) {
                                        var o = r._bitField;
                                        if (0 == (50397184 & o)) {
                                            var s = this._length();
                                            s > 0 && r._migrateCallback0(this);
                                            for (var a = 1; a < s; ++a) r._migrateCallbackAt(this, a);
                                            this._setFollowing(), this._setLength(0), this._setFollowee(r)
                                        } else if (0 != (33554432 & o)) this._fulfill(r._value());
                                        else if (0 != (16777216 & o)) this._reject(r._reason());
                                        else {
                                            var u = new p("late cancellation observer");
                                            r._attachExtraTrace(u), this._reject(u)
                                        }
                                    } else this._reject(e())
                                }
                            }, A.prototype._rejectCallback = function(t, e, n) {
                                var i = a.ensureErrorObject(t),
                                    r = i === t;
                                if (!r && !n && b.warnings()) {
                                    var o = "a promise was rejected with a non-error: " + a.classString(t);
                                    this._warn(o, !0)
                                }
                                this._attachExtraTrace(i, !!e && r), this._reject(t)
                            }, A.prototype._resolveFromExecutor = function(t) {
                                var e = this;
                                this._captureStackTrace(), this._pushContext();
                                var n = !0,
                                    i = this._execute(t, (function(t) {
                                        e._resolveCallback(t)
                                    }), (function(t) {
                                        e._rejectCallback(t, n)
                                    }));
                                n = !1, this._popContext(), void 0 !== i && e._rejectCallback(i, !0)
                            }, A.prototype._settlePromiseFromHandler = function(t, e, n, i) {
                                var r = i._bitField;
                                if (0 == (65536 & r)) {
                                    var o;
                                    i._pushContext(), e === _ ? n && "number" == typeof n.length ? o = w(t).apply(this._boundValue(), n) : (o = k).e = new f("cannot .spread() a non-array: " + a.classString(n)) : o = w(t).call(e, n);
                                    var s = i._popContext();
                                    0 == (65536 & (r = i._bitField)) && (o === g ? i._reject(n) : o === k ? i._rejectCallback(o.e, !1) : (b.checkForgottenReturns(o, s, "", i, this), i._resolveCallback(o)))
                                }
                            }, A.prototype._target = function() {
                                for (var t = this; t._isFollowing();) t = t._followee();
                                return t
                            }, A.prototype._followee = function() {
                                return this._rejectionHandler0
                            }, A.prototype._setFollowee = function(t) {
                                this._rejectionHandler0 = t
                            }, A.prototype._settlePromise = function(t, e, i, o) {
                                var s = t instanceof A,
                                    a = this._bitField,
                                    u = 0 != (134217728 & a);
                                0 != (65536 & a) ? (s && t._invokeInternalOnCancel(), i instanceof E && i.isFinallyHandler() ? (i.cancelPromise = t, w(e).call(i, o) === k && t._reject(k.e)) : e === n ? t._fulfill(n.call(i)) : i instanceof r ? i._promiseCancelled(t) : s || t instanceof y ? t._cancel() : i.cancel()) : "function" == typeof e ? s ? (u && t._setAsyncGuaranteed(), this._settlePromiseFromHandler(e, i, o, t)) : e.call(i, o, t) : i instanceof r ? i._isResolved() || (0 != (33554432 & a) ? i._promiseFulfilled(o, t) : i._promiseRejected(o, t)) : s && (u && t._setAsyncGuaranteed(), 0 != (33554432 & a) ? t._fulfill(o) : t._reject(o))
                            }, A.prototype._settlePromiseLateCancellationObserver = function(t) {
                                var e = t.handler,
                                    n = t.promise,
                                    i = t.receiver,
                                    r = t.value;
                                "function" == typeof e ? n instanceof A ? this._settlePromiseFromHandler(e, i, r, n) : e.call(i, r, n) : n instanceof A && n._reject(r)
                            }, A.prototype._settlePromiseCtx = function(t) {
                                this._settlePromise(t.promise, t.handler, t.receiver, t.value)
                            }, A.prototype._settlePromise0 = function(t, e, n) {
                                var i = this._promise0,
                                    r = this._receiverAt(0);
                                this._promise0 = void 0, this._receiver0 = void 0, this._settlePromise(i, t, r, e)
                            }, A.prototype._clearCallbackDataAtIndex = function(t) {
                                var e = 4 * t - 4;
                                this[e + 2] = this[e + 3] = this[e + 0] = this[e + 1] = void 0
                            }, A.prototype._fulfill = function(t) {
                                var n = this._bitField;
                                if (!((117506048 & n) >>> 16)) {
                                    if (t === this) {
                                        var i = e();
                                        return this._attachExtraTrace(i), this._reject(i)
                                    }
                                    this._setFulfilled(), this._rejectionHandler0 = t, (65535 & n) > 0 && (0 != (134217728 & n) ? this._settlePromises() : l.settlePromises(this))
                                }
                            }, A.prototype._reject = function(t) {
                                var e = this._bitField;
                                if (!((117506048 & e) >>> 16)) {
                                    if (this._setRejected(), this._fulfillmentHandler0 = t, this._isFinal()) return l.fatalError(t, a.isNode);
                                    (65535 & e) > 0 ? l.settlePromises(this) : this._ensurePossibleRejectionHandled()
                                }
                            }, A.prototype._fulfillPromises = function(t, e) {
                                for (var n = 1; n < t; n++) {
                                    var i = this._fulfillmentHandlerAt(n),
                                        r = this._promiseAt(n),
                                        o = this._receiverAt(n);
                                    this._clearCallbackDataAtIndex(n), this._settlePromise(r, i, o, e)
                                }
                            }, A.prototype._rejectPromises = function(t, e) {
                                for (var n = 1; n < t; n++) {
                                    var i = this._rejectionHandlerAt(n),
                                        r = this._promiseAt(n),
                                        o = this._receiverAt(n);
                                    this._clearCallbackDataAtIndex(n), this._settlePromise(r, i, o, e)
                                }
                            }, A.prototype._settlePromises = function() {
                                var t = this._bitField,
                                    e = 65535 & t;
                                if (e > 0) {
                                    if (0 != (16842752 & t)) {
                                        var n = this._fulfillmentHandler0;
                                        this._settlePromise0(this._rejectionHandler0, n, t), this._rejectPromises(e, n)
                                    } else {
                                        var i = this._rejectionHandler0;
                                        this._settlePromise0(this._fulfillmentHandler0, i, t), this._fulfillPromises(e, i)
                                    }
                                    this._setLength(0)
                                }
                                this._clearCancellationData()
                            }, A.prototype._settledValue = function() {
                                var t = this._bitField;
                                return 0 != (33554432 & t) ? this._rejectionHandler0 : 0 != (16777216 & t) ? this._fulfillmentHandler0 : void 0
                            }, A.defer = A.pending = function() {
                                return b.deprecated("Promise.defer", "new Promise"), {
                                    promise: new A(d),
                                    resolve: T,
                                    reject: F
                                }
                            }, a.notEnumerableProp(A, "_makeSelfResolutionError", e), t("./method")(A, d, v, i, b), t("./bind")(A, d, v, b), t("./cancel")(A, y, i, b), t("./direct_resolve")(A), t("./synchronous_inspection")(A), t("./join")(A, y, v, d, b), A.Promise = A, t("./map.js")(A, y, i, v, d, b), t("./using.js")(A, i, v, C, d, b), t("./timers.js")(A, d, b), t("./generators.js")(A, i, d, v, r, b), t("./nodeify.js")(A), t("./call_get.js")(A), t("./props.js")(A, y, v, i), t("./race.js")(A, d, v, i), t("./reduce.js")(A, y, i, v, d, b), t("./settle.js")(A, y, b), t("./some.js")(A, y, i), t("./promisify.js")(A, d), t("./any.js")(A), t("./each.js")(A, d), t("./filter.js")(A, d), a.toFastProperties(A), a.toFastProperties(A.prototype), j({
                                a: 1
                            }), j({
                                b: 2
                            }), j({
                                c: 3
                            }), j(1), j((function() {})), j(void 0), j(!1), j(new A(d)), b.setBounds(c.firstLineError, a.lastLineError), A
                        }
                    }, {
                        "./any.js": 1,
                        "./async": 2,
                        "./bind": 3,
                        "./call_get.js": 5,
                        "./cancel": 6,
                        "./catch_filter": 7,
                        "./context": 8,
                        "./debuggability": 9,
                        "./direct_resolve": 10,
                        "./each.js": 11,
                        "./errors": 12,
                        "./es5": 13,
                        "./filter.js": 14,
                        "./finally": 15,
                        "./generators.js": 16,
                        "./join": 17,
                        "./map.js": 18,
                        "./method": 19,
                        "./nodeback": 20,
                        "./nodeify.js": 21,
                        "./promise_array": 23,
                        "./promisify.js": 24,
                        "./props.js": 25,
                        "./race.js": 27,
                        "./reduce.js": 28,
                        "./settle.js": 30,
                        "./some.js": 31,
                        "./synchronous_inspection": 32,
                        "./thenables": 33,
                        "./timers.js": 34,
                        "./using.js": 35,
                        "./util": 36
                    }],
                    23: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e, n, i, r, o) {
                            var s = t("./util");

                            function a(t) {
                                var i = this._promise = new e(n);
                                t instanceof e && i._propagateFrom(t, 3), i._setOnCancel(this), this._values = t, this._length = 0, this._totalResolved = 0, this._init(void 0, -2)
                            }
                            return s.isArray, s.inherits(a, o), a.prototype.length = function() {
                                return this._length
                            }, a.prototype.promise = function() {
                                return this._promise
                            }, a.prototype._init = function t(n, o) {
                                var a = i(this._values, this._promise);
                                if (a instanceof e) {
                                    var u = (a = a._target())._bitField;
                                    if (this._values = a, 0 == (50397184 & u)) return this._promise._setAsyncGuaranteed(), a._then(t, this._reject, void 0, this, o);
                                    if (0 == (33554432 & u)) return 0 != (16777216 & u) ? this._reject(a._reason()) : this._cancel();
                                    a = a._value()
                                }
                                if (null !== (a = s.asArray(a))) 0 !== a.length ? this._iterate(a) : -5 === o ? this._resolveEmptyArray() : this._resolve(function(t) {
                                    switch (t) {
                                        case -2:
                                            return [];
                                        case -3:
                                            return {}
                                    }
                                }(o));
                                else {
                                    var c = r("expecting an array or an iterable object but got " + s.classString(a)).reason();
                                    this._promise._rejectCallback(c, !1)
                                }
                            }, a.prototype._iterate = function(t) {
                                var n = this.getActualLength(t.length);
                                this._length = n, this._values = this.shouldCopyValues() ? new Array(n) : this._values;
                                for (var r = this._promise, o = !1, s = null, a = 0; a < n; ++a) {
                                    var u = i(t[a], r);
                                    s = u instanceof e ? (u = u._target())._bitField : null, o ? null !== s && u.suppressUnhandledRejections() : null !== s ? 0 == (50397184 & s) ? (u._proxy(this, a), this._values[a] = u) : o = 0 != (33554432 & s) ? this._promiseFulfilled(u._value(), a) : 0 != (16777216 & s) ? this._promiseRejected(u._reason(), a) : this._promiseCancelled(a) : o = this._promiseFulfilled(u, a)
                                }
                                o || r._setAsyncGuaranteed()
                            }, a.prototype._isResolved = function() {
                                return null === this._values
                            }, a.prototype._resolve = function(t) {
                                this._values = null, this._promise._fulfill(t)
                            }, a.prototype._cancel = function() {
                                !this._isResolved() && this._promise.isCancellable() && (this._values = null, this._promise._cancel())
                            }, a.prototype._reject = function(t) {
                                this._values = null, this._promise._rejectCallback(t, !1)
                            }, a.prototype._promiseFulfilled = function(t, e) {
                                return this._values[e] = t, ++this._totalResolved >= this._length && (this._resolve(this._values), !0)
                            }, a.prototype._promiseCancelled = function() {
                                return this._cancel(), !0
                            }, a.prototype._promiseRejected = function(t) {
                                return this._totalResolved++, this._reject(t), !0
                            }, a.prototype._resultCancelled = function() {
                                if (!this._isResolved()) {
                                    var t = this._values;
                                    if (this._cancel(), t instanceof e) t.cancel();
                                    else
                                        for (var n = 0; n < t.length; ++n) t[n] instanceof e && t[n].cancel()
                                }
                            }, a.prototype.shouldCopyValues = function() {
                                return !0
                            }, a.prototype.getActualLength = function(t) {
                                return t
                            }, a
                        }
                    }, {
                        "./util": 36
                    }],
                    24: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e, n) {
                            var i = {},
                                r = t("./util"),
                                o = t("./nodeback"),
                                s = r.withAppended,
                                a = r.maybeWrapAsError,
                                u = r.canEvaluate,
                                c = t("./errors").TypeError,
                                l = {
                                    __isPromisified__: !0
                                },
                                h = new RegExp("^(?:" + ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"].join("|") + ")$"),
                                f = function(t) {
                                    return r.isIdentifier(t) && "_" !== t.charAt(0) && "constructor" !== t
                                };

                            function p(t) {
                                return !h.test(t)
                            }

                            function d(t) {
                                try {
                                    return !0 === t.__isPromisified__
                                } catch (t) {
                                    return !1
                                }
                            }

                            function _(t, e, n) {
                                var i = r.getDataPropertyOrDefault(t, e + n, l);
                                return !!i && d(i)
                            }

                            function g(t, e, n, i) {
                                for (var o = r.inheritedDataKeys(t), s = [], a = 0; a < o.length; ++a) {
                                    var u = o[a],
                                        l = t[u],
                                        h = i === f || f(u, l, t);
                                    "function" != typeof l || d(l) || _(t, u, e) || !i(u, l, t, h) || s.push(u, l)
                                }
                                return function(t, e, n) {
                                    for (var i = 0; i < t.length; i += 2) {
                                        var r = t[i];
                                        if (n.test(r))
                                            for (var o = r.replace(n, ""), s = 0; s < t.length; s += 2)
                                                if (t[s] === o) throw new c("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", e))
                                    }
                                }(s, e, n), s
                            }
                            var v = u ? void 0 : function(t, u, c, l, h, f) {
                                var p = function() {
                                        return this
                                    }(),
                                    d = t;

                                function _() {
                                    var r = u;
                                    u === i && (r = this);
                                    var c = new e(n);
                                    c._captureStackTrace();
                                    var l = "string" == typeof d && this !== p ? this[d] : t,
                                        h = o(c, f);
                                    try {
                                        l.apply(r, s(arguments, h))
                                    } catch (t) {
                                        c._rejectCallback(a(t), !0, !0)
                                    }
                                    return c._isFateSealed() || c._setAsyncGuaranteed(), c
                                }
                                return "string" == typeof d && (t = l), r.notEnumerableProp(_, "__isPromisified__", !0), _
                            };

                            function y(t, e, n, o, s) {
                                for (var a = new RegExp(e.replace(/([$])/, "\\$") + "$"), u = g(t, e, a, n), c = 0, l = u.length; c < l; c += 2) {
                                    var h = u[c],
                                        f = u[c + 1],
                                        p = h + e;
                                    if (o === v) t[p] = v(h, i, h, f, e, s);
                                    else {
                                        var d = o(f, (function() {
                                            return v(h, i, h, f, e, s)
                                        }));
                                        r.notEnumerableProp(d, "__isPromisified__", !0), t[p] = d
                                    }
                                }
                                return r.toFastProperties(t), t
                            }
                            e.promisify = function(t, e) {
                                if ("function" != typeof t) throw new c("expecting a function but got " + r.classString(t));
                                if (d(t)) return t;
                                var n = function(t, e, n) {
                                    return v(t, e, void 0, t, null, n)
                                }(t, void 0 === (e = Object(e)).context ? i : e.context, !!e.multiArgs);
                                return r.copyDescriptors(t, n, p), n
                            }, e.promisifyAll = function(t, e) {
                                if ("function" != typeof t && "object" != typeof t) throw new c("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
                                var n = !!(e = Object(e)).multiArgs,
                                    i = e.suffix;
                                "string" != typeof i && (i = "Async");
                                var o = e.filter;
                                "function" != typeof o && (o = f);
                                var s = e.promisifier;
                                if ("function" != typeof s && (s = v), !r.isIdentifier(i)) throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");
                                for (var a = r.inheritedDataKeys(t), u = 0; u < a.length; ++u) {
                                    var l = t[a[u]];
                                    "constructor" !== a[u] && r.isClass(l) && (y(l.prototype, i, o, s, n), y(l, i, o, s, n))
                                }
                                return y(t, i, o, s, n)
                            }
                        }
                    }, {
                        "./errors": 12,
                        "./nodeback": 20,
                        "./util": 36
                    }],
                    25: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e, n, i, r) {
                            var o, s = t("./util"),
                                a = s.isObject,
                                u = t("./es5");
                            "function" == typeof Map && (o = Map);
                            var c = function() {
                                var t = 0,
                                    e = 0;

                                function n(n, i) {
                                    this[t] = n, this[t + e] = i, t++
                                }
                                return function(i) {
                                    e = i.size, t = 0;
                                    var r = new Array(2 * i.size);
                                    return i.forEach(n, r), r
                                }
                            }();

                            function l(t) {
                                var e, n = !1;
                                if (void 0 !== o && t instanceof o) e = c(t), n = !0;
                                else {
                                    var i = u.keys(t),
                                        r = i.length;
                                    e = new Array(2 * r);
                                    for (var s = 0; s < r; ++s) {
                                        var a = i[s];
                                        e[s] = t[a], e[s + r] = a
                                    }
                                }
                                this.constructor$(e), this._isMap = n, this._init$(void 0, -3)
                            }

                            function h(t) {
                                var n, o = i(t);
                                return a(o) ? (n = o instanceof e ? o._then(e.props, void 0, void 0, void 0, void 0) : new l(o).promise(), o instanceof e && n._propagateFrom(o, 2), n) : r("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n")
                            }
                            s.inherits(l, n), l.prototype._init = function() {}, l.prototype._promiseFulfilled = function(t, e) {
                                if (this._values[e] = t, ++this._totalResolved >= this._length) {
                                    var n;
                                    if (this._isMap) n = function(t) {
                                        for (var e = new o, n = t.length / 2 | 0, i = 0; i < n; ++i) {
                                            var r = t[n + i],
                                                s = t[i];
                                            e.set(r, s)
                                        }
                                        return e
                                    }(this._values);
                                    else {
                                        n = {};
                                        for (var i = this.length(), r = 0, s = this.length(); r < s; ++r) n[this._values[r + i]] = this._values[r]
                                    }
                                    return this._resolve(n), !0
                                }
                                return !1
                            }, l.prototype.shouldCopyValues = function() {
                                return !1
                            }, l.prototype.getActualLength = function(t) {
                                return t >> 1
                            }, e.prototype.props = function() {
                                return h(this)
                            }, e.props = function(t) {
                                return h(t)
                            }
                        }
                    }, {
                        "./es5": 13,
                        "./util": 36
                    }],
                    26: [function(t, e, n) {
                        "use strict";

                        function i(t) {
                            this._capacity = t, this._length = 0, this._front = 0
                        }
                        i.prototype._willBeOverCapacity = function(t) {
                            return this._capacity < t
                        }, i.prototype._pushOne = function(t) {
                            var e = this.length();
                            this._checkCapacity(e + 1), this[this._front + e & this._capacity - 1] = t, this._length = e + 1
                        }, i.prototype._unshiftOne = function(t) {
                            var e = this._capacity;
                            this._checkCapacity(this.length() + 1);
                            var n = (this._front - 1 & e - 1 ^ e) - e;
                            this[n] = t, this._front = n, this._length = this.length() + 1
                        }, i.prototype.unshift = function(t, e, n) {
                            this._unshiftOne(n), this._unshiftOne(e), this._unshiftOne(t)
                        }, i.prototype.push = function(t, e, n) {
                            var i = this.length() + 3;
                            if (this._willBeOverCapacity(i)) return this._pushOne(t), this._pushOne(e), void this._pushOne(n);
                            var r = this._front + i - 3;
                            this._checkCapacity(i);
                            var o = this._capacity - 1;
                            this[r + 0 & o] = t, this[r + 1 & o] = e, this[r + 2 & o] = n, this._length = i
                        }, i.prototype.shift = function() {
                            var t = this._front,
                                e = this[t];
                            return this[t] = void 0, this._front = t + 1 & this._capacity - 1, this._length--, e
                        }, i.prototype.length = function() {
                            return this._length
                        }, i.prototype._checkCapacity = function(t) {
                            this._capacity < t && this._resizeTo(this._capacity << 1)
                        }, i.prototype._resizeTo = function(t) {
                            var e = this._capacity;
                            this._capacity = t,
                                function(t, e, n, i, r) {
                                    for (var o = 0; o < r; ++o) n[o + i] = t[o + e], t[o + e] = void 0
                                }(this, 0, this, e, this._front + this._length & e - 1)
                        }, e.exports = i
                    }, {}],
                    27: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e, n, i, r) {
                            var o = t("./util");

                            function s(t, a) {
                                var u, c = i(t);
                                if (c instanceof e) return (u = c).then((function(t) {
                                    return s(t, u)
                                }));
                                if (null === (t = o.asArray(t))) return r("expecting an array or an iterable object but got " + o.classString(t));
                                var l = new e(n);
                                void 0 !== a && l._propagateFrom(a, 3);
                                for (var h = l._fulfill, f = l._reject, p = 0, d = t.length; p < d; ++p) {
                                    var _ = t[p];
                                    (void 0 !== _ || p in t) && e.cast(_)._then(h, f, void 0, l, null)
                                }
                                return l
                            }
                            e.race = function(t) {
                                return s(t, void 0)
                            }, e.prototype.race = function() {
                                return s(this, void 0)
                            }
                        }
                    }, {
                        "./util": 36
                    }],
                    28: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e, n, i, r, o, s) {
                            var a = e._getDomain,
                                u = t("./util"),
                                c = u.tryCatch;

                            function l(t, n, i, r) {
                                this.constructor$(t);
                                var s = a();
                                this._fn = null === s ? n : s.bind(n), void 0 !== i && (i = e.resolve(i))._attachCancellationCallback(this), this._initialValue = i, this._currentCancellable = null, this._eachValues = r === o ? [] : void 0, this._promise._captureStackTrace(), this._init$(void 0, -5)
                            }

                            function h(t, e) {
                                this.isFulfilled() ? e._resolve(t) : e._reject(t)
                            }

                            function f(t, e, n, r) {
                                return "function" != typeof e ? i("expecting a function but got " + u.classString(e)) : new l(t, e, n, r).promise()
                            }

                            function p(t) {
                                this.accum = t, this.array._gotAccum(t);
                                var n = r(this.value, this.array._promise);
                                return n instanceof e ? (this.array._currentCancellable = n, n._then(d, void 0, void 0, this, void 0)) : d.call(this, n)
                            }

                            function d(t) {
                                var n, i = this.array,
                                    r = i._promise,
                                    o = c(i._fn);
                                r._pushContext(), (n = void 0 !== i._eachValues ? o.call(r._boundValue(), t, this.index, this.length) : o.call(r._boundValue(), this.accum, t, this.index, this.length)) instanceof e && (i._currentCancellable = n);
                                var a = r._popContext();
                                return s.checkForgottenReturns(n, a, void 0 !== i._eachValues ? "Promise.each" : "Promise.reduce", r), n
                            }
                            u.inherits(l, n), l.prototype._gotAccum = function(t) {
                                void 0 !== this._eachValues && t !== o && this._eachValues.push(t)
                            }, l.prototype._eachComplete = function(t) {
                                return this._eachValues.push(t), this._eachValues
                            }, l.prototype._init = function() {}, l.prototype._resolveEmptyArray = function() {
                                this._resolve(void 0 !== this._eachValues ? this._eachValues : this._initialValue)
                            }, l.prototype.shouldCopyValues = function() {
                                return !1
                            }, l.prototype._resolve = function(t) {
                                this._promise._resolveCallback(t), this._values = null
                            }, l.prototype._resultCancelled = function(t) {
                                if (t === this._initialValue) return this._cancel();
                                this._isResolved() || (this._resultCancelled$(), this._currentCancellable instanceof e && this._currentCancellable.cancel(), this._initialValue instanceof e && this._initialValue.cancel())
                            }, l.prototype._iterate = function(t) {
                                var n, i;
                                this._values = t;
                                var r = t.length;
                                if (void 0 !== this._initialValue ? (n = this._initialValue, i = 0) : (n = e.resolve(t[0]), i = 1), this._currentCancellable = n, !n.isRejected())
                                    for (; i < r; ++i) {
                                        var o = {
                                            accum: null,
                                            value: t[i],
                                            index: i,
                                            length: r,
                                            array: this
                                        };
                                        n = n._then(p, void 0, void 0, o, void 0)
                                    }
                                void 0 !== this._eachValues && (n = n._then(this._eachComplete, void 0, void 0, this, void 0)), n._then(h, h, void 0, n, this)
                            }, e.prototype.reduce = function(t, e) {
                                return f(this, t, e, null)
                            }, e.reduce = function(t, e, n, i) {
                                return f(t, e, n, i)
                            }
                        }
                    }, {
                        "./util": 36
                    }],
                    29: [function(t, e, i) {
                        "use strict";
                        var r, o, s, a, u, c = t("./util");
                        if (c.isNode && "undefined" == typeof MutationObserver) {
                            var l = n.g.setImmediate,
                                h = process.nextTick;
                            r = c.isRecentNode ? function(t) {
                                l.call(n.g, t)
                            } : function(t) {
                                h.call(process, t)
                            }
                        } else r = "undefined" == typeof MutationObserver || "undefined" != typeof window && window.navigator && window.navigator.standalone ? "undefined" != typeof setImmediate ? function(t) {
                            setImmediate(t)
                        } : "undefined" != typeof setTimeout ? function(t) {
                            setTimeout(t, 0)
                        } : function() {
                            throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")
                        } : (o = document.createElement("div"), s = {
                            attributes: !0
                        }, a = !1, u = document.createElement("div"), new MutationObserver((function() {
                            o.classList.toggle("foo"), a = !1
                        })).observe(u, s), function(t) {
                            var e = new MutationObserver((function() {
                                e.disconnect(), t()
                            }));
                            e.observe(o, s), a || (a = !0, u.classList.toggle("foo"))
                        });
                        e.exports = r
                    }, {
                        "./util": 36
                    }],
                    30: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e, n, i) {
                            var r = e.PromiseInspection;

                            function o(t) {
                                this.constructor$(t)
                            }
                            t("./util").inherits(o, n), o.prototype._promiseResolved = function(t, e) {
                                return this._values[t] = e, ++this._totalResolved >= this._length && (this._resolve(this._values), !0)
                            }, o.prototype._promiseFulfilled = function(t, e) {
                                var n = new r;
                                return n._bitField = 33554432, n._settledValueField = t, this._promiseResolved(e, n)
                            }, o.prototype._promiseRejected = function(t, e) {
                                var n = new r;
                                return n._bitField = 16777216, n._settledValueField = t, this._promiseResolved(e, n)
                            }, e.settle = function(t) {
                                return i.deprecated(".settle()", ".reflect()"), new o(t).promise()
                            }, e.prototype.settle = function() {
                                return e.settle(this)
                            }
                        }
                    }, {
                        "./util": 36
                    }],
                    31: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e, n, i) {
                            var r = t("./util"),
                                o = t("./errors").RangeError,
                                s = t("./errors").AggregateError,
                                a = r.isArray,
                                u = {};

                            function c(t) {
                                this.constructor$(t), this._howMany = 0, this._unwrap = !1, this._initialized = !1
                            }

                            function l(t, e) {
                                if ((0 | e) !== e || e < 0) return i("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
                                var n = new c(t),
                                    r = n.promise();
                                return n.setHowMany(e), n.init(), r
                            }
                            r.inherits(c, n), c.prototype._init = function() {
                                if (this._initialized)
                                    if (0 !== this._howMany) {
                                        this._init$(void 0, -5);
                                        var t = a(this._values);
                                        !this._isResolved() && t && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()))
                                    } else this._resolve([])
                            }, c.prototype.init = function() {
                                this._initialized = !0, this._init()
                            }, c.prototype.setUnwrap = function() {
                                this._unwrap = !0
                            }, c.prototype.howMany = function() {
                                return this._howMany
                            }, c.prototype.setHowMany = function(t) {
                                this._howMany = t
                            }, c.prototype._promiseFulfilled = function(t) {
                                return this._addFulfilled(t), this._fulfilled() === this.howMany() && (this._values.length = this.howMany(), 1 === this.howMany() && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values), !0)
                            }, c.prototype._promiseRejected = function(t) {
                                return this._addRejected(t), this._checkOutcome()
                            }, c.prototype._promiseCancelled = function() {
                                return this._values instanceof e || null == this._values ? this._cancel() : (this._addRejected(u), this._checkOutcome())
                            }, c.prototype._checkOutcome = function() {
                                if (this.howMany() > this._canPossiblyFulfill()) {
                                    for (var t = new s, e = this.length(); e < this._values.length; ++e) this._values[e] !== u && t.push(this._values[e]);
                                    return t.length > 0 ? this._reject(t) : this._cancel(), !0
                                }
                                return !1
                            }, c.prototype._fulfilled = function() {
                                return this._totalResolved
                            }, c.prototype._rejected = function() {
                                return this._values.length - this.length()
                            }, c.prototype._addRejected = function(t) {
                                this._values.push(t)
                            }, c.prototype._addFulfilled = function(t) {
                                this._values[this._totalResolved++] = t
                            }, c.prototype._canPossiblyFulfill = function() {
                                return this.length() - this._rejected()
                            }, c.prototype._getRangeError = function(t) {
                                var e = "Input array must contain at least " + this._howMany + " items but contains only " + t + " items";
                                return new o(e)
                            }, c.prototype._resolveEmptyArray = function() {
                                this._reject(this._getRangeError(0))
                            }, e.some = function(t, e) {
                                return l(t, e)
                            }, e.prototype.some = function(t) {
                                return l(this, t)
                            }, e._SomePromiseArray = c
                        }
                    }, {
                        "./errors": 12,
                        "./util": 36
                    }],
                    32: [function(t, e, n) {
                        "use strict";
                        e.exports = function(t) {
                            function e(t) {
                                void 0 !== t ? (t = t._target(), this._bitField = t._bitField, this._settledValueField = t._isFateSealed() ? t._settledValue() : void 0) : (this._bitField = 0, this._settledValueField = void 0)
                            }
                            e.prototype._settledValue = function() {
                                return this._settledValueField
                            };
                            var n = e.prototype.value = function() {
                                    if (!this.isFulfilled()) throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
                                    return this._settledValue()
                                },
                                i = e.prototype.error = e.prototype.reason = function() {
                                    if (!this.isRejected()) throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
                                    return this._settledValue()
                                },
                                r = e.prototype.isFulfilled = function() {
                                    return 0 != (33554432 & this._bitField)
                                },
                                o = e.prototype.isRejected = function() {
                                    return 0 != (16777216 & this._bitField)
                                },
                                s = e.prototype.isPending = function() {
                                    return 0 == (50397184 & this._bitField)
                                },
                                a = e.prototype.isResolved = function() {
                                    return 0 != (50331648 & this._bitField)
                                };
                            e.prototype.isCancelled = t.prototype._isCancelled = function() {
                                return 65536 == (65536 & this._bitField)
                            }, t.prototype.isCancelled = function() {
                                return this._target()._isCancelled()
                            }, t.prototype.isPending = function() {
                                return s.call(this._target())
                            }, t.prototype.isRejected = function() {
                                return o.call(this._target())
                            }, t.prototype.isFulfilled = function() {
                                return r.call(this._target())
                            }, t.prototype.isResolved = function() {
                                return a.call(this._target())
                            }, t.prototype.value = function() {
                                return n.call(this._target())
                            }, t.prototype.reason = function() {
                                var t = this._target();
                                return t._unsetRejectionIsUnhandled(), i.call(t)
                            }, t.prototype._value = function() {
                                return this._settledValue()
                            }, t.prototype._reason = function() {
                                return this._unsetRejectionIsUnhandled(), this._settledValue()
                            }, t.PromiseInspection = e
                        }
                    }, {}],
                    33: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e, n) {
                            var i = t("./util"),
                                r = i.errorObj,
                                o = i.isObject,
                                s = {}.hasOwnProperty;
                            return function(t, a) {
                                if (o(t)) {
                                    if (t instanceof e) return t;
                                    var u = function(t) {
                                        try {
                                            return function(t) {
                                                return t.then
                                            }(t)
                                        } catch (t) {
                                            return r.e = t, r
                                        }
                                    }(t);
                                    if (u === r) {
                                        a && a._pushContext();
                                        var c = e.reject(u.e);
                                        return a && a._popContext(), c
                                    }
                                    if ("function" == typeof u) return function(t) {
                                        return s.call(t, "_promise0")
                                    }(t) ? (c = new e(n), t._then(c._fulfill, c._reject, void 0, c, null), c) : function(t, o, s) {
                                        var a = new e(n),
                                            u = a;
                                        s && s._pushContext(), a._captureStackTrace(), s && s._popContext();
                                        var c = !0,
                                            l = i.tryCatch(o).call(t, h, f);

                                        function h(t) {
                                            a && (a._resolveCallback(t), a = null)
                                        }

                                        function f(t) {
                                            a && (a._rejectCallback(t, c, !0), a = null)
                                        }
                                        return c = !1, a && l === r && (a._rejectCallback(l.e, !0, !0), a = null), u
                                    }(t, u, a)
                                }
                                return t
                            }
                        }
                    }, {
                        "./util": 36
                    }],
                    34: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e, n, i) {
                            var r = t("./util"),
                                o = e.TimeoutError;

                            function s(t) {
                                this.handle = t
                            }
                            s.prototype._resultCancelled = function() {
                                clearTimeout(this.handle)
                            };
                            var a = function(t) {
                                    return u(+this).thenReturn(t)
                                },
                                u = e.delay = function(t, r) {
                                    var o, u;
                                    return void 0 !== r ? (o = e.resolve(r)._then(a, null, null, t, void 0), i.cancellation() && r instanceof e && o._setOnCancel(r)) : (o = new e(n), u = setTimeout((function() {
                                        o._fulfill()
                                    }), +t), i.cancellation() && o._setOnCancel(new s(u))), o._setAsyncGuaranteed(), o
                                };

                            function c(t) {
                                return clearTimeout(this.handle), t
                            }

                            function l(t) {
                                throw clearTimeout(this.handle), t
                            }
                            e.prototype.delay = function(t) {
                                return u(t, this)
                            }, e.prototype.timeout = function(t, e) {
                                var n, a;
                                t = +t;
                                var u = new s(setTimeout((function() {
                                    n.isPending() && function(t, e, n) {
                                        var i;
                                        i = "string" != typeof e ? e instanceof Error ? e : new o("operation timed out") : new o(e), r.markAsOriginatingFromRejection(i), t._attachExtraTrace(i), t._reject(i), null != n && n.cancel()
                                    }(n, e, a)
                                }), t));
                                return i.cancellation() ? (a = this.then(), (n = a._then(c, l, void 0, u, void 0))._setOnCancel(u)) : n = this._then(c, l, void 0, u, void 0), n
                            }
                        }
                    }, {
                        "./util": 36
                    }],
                    35: [function(t, e, n) {
                        "use strict";
                        e.exports = function(e, n, i, r, o, s) {
                            var a = t("./util"),
                                u = t("./errors").TypeError,
                                c = t("./util").inherits,
                                l = a.errorObj,
                                h = a.tryCatch;

                            function f(t) {
                                setTimeout((function() {
                                    throw t
                                }), 0)
                            }

                            function p(t, n) {
                                var r = 0,
                                    s = t.length,
                                    a = new e(o);
                                return function o() {
                                    if (r >= s) return a._fulfill();
                                    var u = function(t) {
                                        var e = i(t);
                                        return e !== t && "function" == typeof t._isDisposable && "function" == typeof t._getDisposer && t._isDisposable() && e._setDisposable(t._getDisposer()), e
                                    }(t[r++]);
                                    if (u instanceof e && u._isDisposable()) {
                                        try {
                                            u = i(u._getDisposer().tryDispose(n), t.promise)
                                        } catch (t) {
                                            return f(t)
                                        }
                                        if (u instanceof e) return u._then(o, f, null, null, null)
                                    }
                                    o()
                                }(), a
                            }

                            function d(t, e, n) {
                                this._data = t, this._promise = e, this._context = n
                            }

                            function _(t, e, n) {
                                this.constructor$(t, e, n)
                            }

                            function g(t) {
                                return d.isDisposer(t) ? (this.resources[this.index]._setDisposable(t), t.promise()) : t
                            }

                            function v(t) {
                                this.length = t, this.promise = null, this[t - 1] = null
                            }
                            d.prototype.data = function() {
                                return this._data
                            }, d.prototype.promise = function() {
                                return this._promise
                            }, d.prototype.resource = function() {
                                return this.promise().isFulfilled() ? this.promise().value() : null
                            }, d.prototype.tryDispose = function(t) {
                                var e = this.resource(),
                                    n = this._context;
                                void 0 !== n && n._pushContext();
                                var i = null !== e ? this.doDispose(e, t) : null;
                                return void 0 !== n && n._popContext(), this._promise._unsetDisposable(), this._data = null, i
                            }, d.isDisposer = function(t) {
                                return null != t && "function" == typeof t.resource && "function" == typeof t.tryDispose
                            }, c(_, d), _.prototype.doDispose = function(t, e) {
                                return this.data().call(t, t, e)
                            }, v.prototype._resultCancelled = function() {
                                for (var t = this.length, n = 0; n < t; ++n) {
                                    var i = this[n];
                                    i instanceof e && i.cancel()
                                }
                            }, e.using = function() {
                                var t = arguments.length;
                                if (t < 2) return n("you must pass at least 2 arguments to Promise.using");
                                var r, o = arguments[t - 1];
                                if ("function" != typeof o) return n("expecting a function but got " + a.classString(o));
                                var u = !0;
                                2 === t && Array.isArray(arguments[0]) ? (t = (r = arguments[0]).length, u = !1) : (r = arguments, t--);
                                for (var c = new v(t), f = 0; f < t; ++f) {
                                    var _ = r[f];
                                    if (d.isDisposer(_)) {
                                        var y = _;
                                        (_ = _.promise())._setDisposable(y)
                                    } else {
                                        var m = i(_);
                                        m instanceof e && (_ = m._then(g, null, null, {
                                            resources: c,
                                            index: f
                                        }, void 0))
                                    }
                                    c[f] = _
                                }
                                var C = new Array(c.length);
                                for (f = 0; f < C.length; ++f) C[f] = e.resolve(c[f]).reflect();
                                var b = e.all(C).then((function(t) {
                                        for (var e = 0; e < t.length; ++e) {
                                            var n = t[e];
                                            if (n.isRejected()) return l.e = n.error(), l;
                                            if (!n.isFulfilled()) return void b.cancel();
                                            t[e] = n.value()
                                        }
                                        E._pushContext(), o = h(o);
                                        var i = u ? o.apply(void 0, t) : o(t),
                                            r = E._popContext();
                                        return s.checkForgottenReturns(i, r, "Promise.using", E), i
                                    })),
                                    E = b.lastly((function() {
                                        var t = new e.PromiseInspection(b);
                                        return p(c, t)
                                    }));
                                return c.promise = E, E._setOnCancel(c), E
                            }, e.prototype._setDisposable = function(t) {
                                this._bitField = 131072 | this._bitField, this._disposer = t
                            }, e.prototype._isDisposable = function() {
                                return (131072 & this._bitField) > 0
                            }, e.prototype._getDisposer = function() {
                                return this._disposer
                            }, e.prototype._unsetDisposable = function() {
                                this._bitField = -131073 & this._bitField, this._disposer = void 0
                            }, e.prototype.disposer = function(t) {
                                if ("function" == typeof t) return new _(t, this, r());
                                throw new u
                            }
                        }
                    }, {
                        "./errors": 12,
                        "./util": 36
                    }],
                    36: [function(t, e, i) {
                        "use strict";
                        var r = t("./es5"),
                            o = "undefined" == typeof navigator,
                            s = {
                                e: {}
                            },
                            a, u = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== n.g ? n.g : void 0 !== this ? this : null;

                        function c() {
                            try {
                                var t = a;
                                return a = null, t.apply(this, arguments)
                            } catch (t) {
                                return s.e = t, s
                            }
                        }

                        function l(t) {
                            return a = t, c
                        }
                        var h = function(t, e) {
                            var n = {}.hasOwnProperty;

                            function i() {
                                for (var i in this.constructor = t, this.constructor$ = e, e.prototype) n.call(e.prototype, i) && "$" !== i.charAt(i.length - 1) && (this[i + "$"] = e.prototype[i])
                            }
                            return i.prototype = e.prototype, t.prototype = new i, t.prototype
                        };

                        function f(t) {
                            return null == t || !0 === t || !1 === t || "string" == typeof t || "number" == typeof t
                        }

                        function p(t) {
                            return "function" == typeof t || "object" == typeof t && null !== t
                        }

                        function d(t) {
                            return f(t) ? new Error(w(t)) : t
                        }

                        function _(t, e) {
                            var n, i = t.length,
                                r = new Array(i + 1);
                            for (n = 0; n < i; ++n) r[n] = t[n];
                            return r[n] = e, r
                        }

                        function g(t, e, n) {
                            if (!r.isES5) return {}.hasOwnProperty.call(t, e) ? t[e] : void 0;
                            var i = Object.getOwnPropertyDescriptor(t, e);
                            return null != i ? null == i.get && null == i.set ? i.value : n : void 0
                        }

                        function v(t, e, n) {
                            if (f(t)) return t;
                            var i = {
                                value: n,
                                configurable: !0,
                                enumerable: !1,
                                writable: !0
                            };
                            return r.defineProperty(t, e, i), t
                        }

                        function y(t) {
                            throw t
                        }
                        var m = function() {
                                var t = [Array.prototype, Object.prototype, Function.prototype],
                                    e = function(e) {
                                        for (var n = 0; n < t.length; ++n)
                                            if (t[n] === e) return !0;
                                        return !1
                                    };
                                if (r.isES5) {
                                    var n = Object.getOwnPropertyNames;
                                    return function(t) {
                                        for (var i = [], o = Object.create(null); null != t && !e(t);) {
                                            var s;
                                            try {
                                                s = n(t)
                                            } catch (t) {
                                                return i
                                            }
                                            for (var a = 0; a < s.length; ++a) {
                                                var u = s[a];
                                                if (!o[u]) {
                                                    o[u] = !0;
                                                    var c = Object.getOwnPropertyDescriptor(t, u);
                                                    null != c && null == c.get && null == c.set && i.push(u)
                                                }
                                            }
                                            t = r.getPrototypeOf(t)
                                        }
                                        return i
                                    }
                                }
                                var i = {}.hasOwnProperty;
                                return function(n) {
                                    if (e(n)) return [];
                                    var r = [];
                                    t: for (var o in n)
                                        if (i.call(n, o)) r.push(o);
                                        else {
                                            for (var s = 0; s < t.length; ++s)
                                                if (i.call(t[s], o)) continue t;
                                            r.push(o)
                                        }
                                    return r
                                }
                            }(),
                            C = /this\s*\.\s*\S+\s*=/;

                        function b(t) {
                            try {
                                if ("function" == typeof t) {
                                    var e = r.names(t.prototype),
                                        n = r.isES5 && e.length > 1,
                                        i = e.length > 0 && !(1 === e.length && "constructor" === e[0]),
                                        o = C.test(t + "") && r.names(t).length > 0;
                                    if (n || i || o) return !0
                                }
                                return !1
                            } catch (t) {
                                return !1
                            }
                        }

                        function E(t) {
                            function e() {}
                            e.prototype = t;
                            for (var n = 8; n--;) new e;
                            return t
                        }
                        var S = /^[a-z$_][a-z$_0-9]*$/i;

                        function N(t) {
                            return S.test(t)
                        }

                        function k(t, e, n) {
                            for (var i = new Array(t), r = 0; r < t; ++r) i[r] = e + r + n;
                            return i
                        }

                        function w(t) {
                            try {
                                return t + ""
                            } catch (t) {
                                return "[no string representation]"
                            }
                        }

                        function A(t) {
                            return null !== t && "object" == typeof t && "string" == typeof t.message && "string" == typeof t.name
                        }

                        function T(t) {
                            try {
                                v(t, "isOperational", !0)
                            } catch (t) {}
                        }

                        function F(t) {
                            return null != t && (t instanceof Error.__BluebirdErrorTypes__.OperationalError || !0 === t.isOperational)
                        }

                        function j(t) {
                            return A(t) && r.propertyIsWritable(t, "stack")
                        }
                        var P = "stack" in new Error ? function(t) {
                            return j(t) ? t : new Error(w(t))
                        } : function(t) {
                            if (j(t)) return t;
                            try {
                                throw new Error(w(t))
                            } catch (t) {
                                return t
                            }
                        };

                        function x(t) {
                            return {}.toString.call(t)
                        }

                        function O(t, e, n) {
                            for (var i = r.names(t), o = 0; o < i.length; ++o) {
                                var s = i[o];
                                if (n(s)) try {
                                    r.defineProperty(e, s, r.getDescriptor(t, s))
                                } catch (t) {}
                            }
                        }
                        var M = function(t) {
                            return r.isArray(t) ? t : null
                        };
                        if ("undefined" != typeof Symbol && Symbol.iterator) {
                            var I = "function" == typeof Array.from ? function(t) {
                                return Array.from(t)
                            } : function(t) {
                                for (var e, n = [], i = t[Symbol.iterator](); !(e = i.next()).done;) n.push(e.value);
                                return n
                            };
                            M = function(t) {
                                return r.isArray(t) ? t : null != t && "function" == typeof t[Symbol.iterator] ? I(t) : null
                            }
                        }
                        var R = "undefined" != typeof process && "[object process]" === x(process).toLowerCase();

                        function B(t, e) {
                            return R ? "production" [t] : e
                        }
                        var L = {
                                isClass: b,
                                isIdentifier: N,
                                inheritedDataKeys: m,
                                getDataPropertyOrDefault: g,
                                thrower: y,
                                isArray: r.isArray,
                                asArray: M,
                                notEnumerableProp: v,
                                isPrimitive: f,
                                isObject: p,
                                isError: A,
                                canEvaluate: o,
                                errorObj: s,
                                tryCatch: l,
                                inherits: h,
                                withAppended: _,
                                maybeWrapAsError: d,
                                toFastProperties: E,
                                filledRange: k,
                                toString: w,
                                canAttachTrace: j,
                                ensureErrorObject: P,
                                originatesFromRejection: F,
                                markAsOriginatingFromRejection: T,
                                classString: x,
                                copyDescriptors: O,
                                hasDevTools: "undefined" != typeof chrome && chrome && "function" == typeof chrome.loadTimes,
                                isNode: R,
                                env: B,
                                global: u
                            },
                            H;
                        L.isRecentNode = L.isNode && (H = process.versions.node.split(".").map(Number), 0 === H[0] && H[1] > 10 || H[0] > 0), L.isNode && L.toFastProperties(process);
                        try {
                            throw new Error
                        } catch (t) {
                            L.lastLineError = t
                        }
                        e.exports = L
                    }, {
                        "./es5": 13
                    }]
                }, {}, [4])(4)
            }, t.exports = i(), "undefined" != typeof window && null !== window ? window.P = window.Promise : "undefined" != typeof self && null !== self && (self.P = self.Promise)
        }, (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var n = {
                xmlHttpAudioRequest: function(t) {
                    const e = new XMLHttpRequest;
                    e.open("GET", t, !0), e.responseType = "arraybuffer";
                    const n = new Promise((function(n, i) {
                        e.onload = function() {
                            200 !== e.status ? i(new Error(`"Received non-ok status code ${e.status} for url ${t}."`)) : n(e.response)
                        }, e.onerror = ({
                            loaded: e,
                            total: n
                        }) => {
                            i(new Error(`Error loading ${t}. Loaded ${e} bytes out of ${n}.`))
                        }
                    }));
                    return e.send(), n
                }
            };
            e.default = n
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1),
                r = s(n(6)),
                o = s(n(3));

            function s(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }
            const a = function(t, e, n) {
                if (this.audioContext = t, !(this.audioContext instanceof AudioContext)) throw new Error("this.audioContext must be an instance of AudioContext.");
                this._startingToPlay = !1, this._startedPlaying = !1, this._shouldStop = !1, this.options = {
                    url: "",
                    isLoop: !1,
                    fadeIn: !1,
                    fadeOut: !1,
                    fadeFrom: 0,
                    fadeTo: 1,
                    fadeTime: 3e3,
                    fadeShape: "linear",
                    allowConcurrency: !0
                }, Object.assign(this.options, n), e = e || null, this.set("url", e), this.audioElement = null, this.audioElementSource = null, this.set("gainNode", this._createGainNode())
            };
            Object.assign(a.prototype, {
                _readyPromise: null,
                ready: function() {
                    return this._readyPromise || (this._readyPromise = new r.default(((t, e) => {
                        try {
                            this.audioElement = new Audio(this.get("url")), this.audioElement.controls = !0, this.audioElement.loop = this.get("isLoop"), this._attachListeners(), this.audioElementSource = this.audioContext.createMediaElementSource(this.audioElement), this.audioElementSource.connect(this.get("gainNode")), t(this)
                        } catch (t) {
                            e(t)
                        }
                    }))), this._readyPromise
                },
                play: function(t) {
                    this._startingToPlay = !0;
                    const {
                        when: e = 0,
                        offset: n = !1
                    } = t || {};
                    return new r.default(((t, i) => this.ready().then((() => {
                        if (e) return new r.default((t => {
                            window.setTimeout(t, 1e3 * e)
                        }))
                    })).then((() => {
                        const e = () => (!1 !== n && (this.audioElement.currentTime = n), this._play().then(t));
                        return !1 === this.options.allowConcurrency && this.isPlaying() ? this.stop().then((() => e())) : e()
                    })).catch((t => {
                        i(t)
                    }))))
                },
                _play: function() {
                    return new r.default(((t, e) => {
                        try {
                            if (this._shouldStop) return t(this), void(this._shouldStop = !1);
                            if (this.audioElement.play(), this.options.fadeIn) return this.fadeIn(this.options, !0);
                            this.on("end", (() => t(this)))
                        } catch (t) {
                            e(t)
                        }
                    }))
                },
                pause: function() {
                    return new r.default((t => {
                        this.audioElement && this.isPlaying() ? (this.audioElement.pause(), t(this)) : i.logger.warning("Start playback before trying to pause it.")
                    }))
                },
                _stop: function() {
                    return new r.default((t => {
                        if (!this.audioElement || !this.isPlaying()) return this._startingToPlay ? (this._shouldStop = !0, t(this)) : void 0;
                        this.audioElement.pause(), this.audioElement.currentTime = 0, t(this)
                    }))
                },
                stop: function() {
                    return this._stop().then((() => (this.trigger("stop", this), null)))
                },
                fadeIn: function(t, e = !1) {
                    const {
                        fadeFrom: n,
                        fadeTo: i,
                        fadeTime: o,
                        fadeShape: s
                    } = this._computeFadeOptions(t, "in");
                    return this.fade(n, i, o, s), this.isFadingOut() && (clearTimeout(this._fadeOutStopTimer), delete this._fadeOutStopTimer), e || setTimeout((() => {
                        this.isPlaying() || this.play()
                    })), r.default.delay(o, this)
                },
                fadeOut: function(t) {
                    if (!this.isPlaying()) return this._startingToPlay && (this._shouldStop = !0), r.default.resolve(this);
                    const {
                        fadeFrom: e,
                        fadeTo: n,
                        fadeTime: i,
                        fadeShape: o
                    } = this._computeFadeOptions(t, "out");
                    return this._fadeOutStopTimer = setTimeout((() => this.stop()), i), this.fade(e, n, i, o), r.default.delay(i, this)
                },
                isFadingOut: function() {
                    return void 0 !== this._fadeOutStopTimer
                },
                _computeFadeOptions: function(t, e) {
                    const n = t && "exponential" === t.fadeShape,
                        i = {
                            fadeFrom: "in" !== e || n ? this.get("gainNode").gain.value : 0,
                            fadeTo: "in" === e ? 1 : 0,
                            fadeTime: 3e3,
                            fadeShape: "linear"
                        };
                    if (t = "number" == typeof t ? Object.assign({}, i, {
                            fadeTime: t
                        }) : "object" == typeof t ? Object.assign({}, i, t) : i, ["fadeTo", "fadeFrom"].forEach((e => {
                            "current" === t[e] && (t[e] = this.get("gainNode").gain.value)
                        })), "exponential" === t.fadeShape && 0 === t.fadeFrom) throw new Error("when using exponential fadein start volume must be greater then 0");
                    if ("linear" === t.fadeShape) t.fadeShape = {
                        isLinear: !0
                    };
                    else {
                        if ("exponential" !== t.fadeShape) throw new Error(`Unknown fade shape '${t.fadeShape}'. Must be either 'linear' or 'exponential'`);
                        t.fadeShape = {
                            isExponential: !0
                        }
                    }
                    return t
                },
                fade: function(t, e, n, i) {
                    const {
                        isLinear: r = !0,
                        isExponential: o = !1
                    } = i || {}, s = this.get("gainNode").gain, {
                        currentTime: a
                    } = this.audioContext;
                    s.setValueAtTime(t, a);
                    const u = a + n / 1e3;
                    r && !o ? s.linearRampToValueAtTime(e, u) : o && s.exponentialRampToValueAtTime(e, u)
                },
                dispose: function() {
                    return this.audioElement && (this.audioElement.src = "", this.audioElement = null, this.audioElementSource = null), this.get("gainNode") && (this.get("gainNode").disconnect(), this.set("gainNode", null)), this.purgeEvents(), r.default.resolve(this)
                },
                setVolume: function(t) {
                    Number.isFinite(t) ? this.get("gainNode").gain.value = t : i.logger.warning("Attempted to set invalid volume for sound.", t)
                },
                getVolume: function() {
                    return this.get("gainNode").gain.value
                },
                _createGainNode: function() {
                    return this.audioContext.createGain()
                },
                _attachListeners: function() {
                    this.audioElement && (this.audioElement.addEventListener("pause", this._onPause.bind(this)), this.audioElement.addEventListener("ended", this._onEnded.bind(this)), this.audioElement.addEventListener("play", this._onPlay.bind(this)))
                },
                isPlaying: function() {
                    return this.audioElement && !this.audioElement.paused && !this.audioElement.ended && this._startedPlaying
                },
                _isPlaying: function() {
                    return i.logger.warning("_isPlaying has been depreciated, please use isPlaying instead"), this.isPlaying()
                },
                _onPause: function() {
                    if (this.audioElement && !this.audioElement.ended) {
                        const {
                            currentTime: t
                        } = this.audioElement;
                        0 === t ? this.trigger("stop") : this.trigger("pause")
                    }
                },
                _onEnded: function() {
                    this.trigger("end")
                },
                _onPlay: function() {
                    this._startingToPlay = !1, this._startedPlaying = !0, this.trigger("play")
                }
            }), Object.assign(a.prototype, o.default);
            var u = a;
            e.default = u
        }, (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            e.default = class {
                constructor(t, e) {
                    this._name = t, this._api = e, this.soundByUrlMapByChannel = new Map, this._allSounds = new Set
                }
                createSound(t, e, n) {
                    const i = this._channelArg(t);
                    this.soundByUrlMapByChannel.has(i) || this.soundByUrlMapByChannel.set(i, new Map);
                    const r = this.soundByUrlMapByChannel.get(i);
                    if (!r.has(e)) {
                        const t = i.createSound(e, n);
                        this._allSounds.add(t), r.set(e, t)
                    }
                    return r.get(e)
                }
                playSound(...t) {
                    this.createSound(...t).play()
                }
                dispose() {
                    this._allSounds.forEach((t => t.dispose())), delete this._allSounds, delete this.soundByUrlMapByChannel
                }
                _channelArg(t) {
                    return "string" == typeof t ? this._api.getChannel(t) : t
                }
            }
        }, (t, e, n) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = void 0;
            var i = n(1),
                r = n(11);
            const o = "/lol-settings/v1/local/lol-audio",
                s = function(t, e) {
                    this._audioPlugin = e, this._dataBinding = i.dataBinding.bindTo(t), this._dataBinding.addObserver(o, this, this._changeSettings.bind(this))
                };
            Object.assign(s.prototype, {
                disconnect() {
                    this._dataBinding.delete(o)
                },
                _changeSettings: function(t) {
                    if (!t || !t.data) return;
                    const {
                        data: e
                    } = t;
                    this._changeMasterGainNodeSettings(e), this._changeSFXSettings(e), this._changeMusicSettings(e), this._changeVoiceSettings(e)
                },
                _muteChannel: function(t) {
                    const e = this._audioPlugin.getChannel(t);
                    e && e.mute()
                },
                _unmuteChannel: function(t) {
                    const e = this._audioPlugin.getChannel(t);
                    e && e.unmute()
                },
                _setChannelVolume: function(t, e) {
                    const n = this._audioPlugin.getChannel(t);
                    n && n.set("volume", e)
                },
                _changeMasterGainNodeSettings(t) {
                    !1 === t.masterSoundEnabled ? this._audioPlugin.muteAll() : void 0 !== t.masterVolume ? this._audioPlugin.setMasterVolume(t.masterVolume / 100) : this._audioPlugin.unmuteAll()
                },
                _changeSFXSettings(t) {
                    !1 === t.sfxEnabled ? this._muteChannel(r.SFX_CHANNEL_NAME) : void 0 !== t.sfxVolume ? this._setChannelVolume(r.SFX_CHANNEL_NAME, t.sfxVolume / 100) : this._unmuteChannel(r.SFX_CHANNEL_NAME), this._changeAmbientSfxSettings(t)
                },
                _changeAmbientSfxSettings(t) {
                    !1 === t.ambientSfxEnabled ? this._muteChannel(r.SFX_SUB_CHANNEL_AMBIENCE_NAME) : this._unmuteChannel(r.SFX_SUB_CHANNEL_AMBIENCE_NAME)
                },
                _changeMusicSettings(t) {
                    !1 === t.musicEnabled ? this._muteChannel(r.MUSIC_CHANNEL_NAME) : (void 0 !== t.musicVolume ? this._setChannelVolume(r.MUSIC_CHANNEL_NAME, t.musicVolume / 100) : this._unmuteChannel(r.MUSIC_CHANNEL_NAME), this._changeChampionSelectSettings(t), this._changeLoginMusicSettings(t), this._changeAmbienceMusicSettings(t))
                },
                _changeChampionSelectSettings(t) {
                    !1 === t.championSelectionMusicEnabled ? this._muteChannel(r.MUSIC_SUB_CHANNEL_CHAMPIONS_NAME) : this._unmuteChannel(r.MUSIC_SUB_CHANNEL_CHAMPIONS_NAME)
                },
                _changeLoginMusicSettings(t) {
                    !1 === t.loginMusicEnabled ? this._muteChannel(r.MUSIC_SUB_CHANNEL_LOGIN_NAME) : this._unmuteChannel(r.MUSIC_SUB_CHANNEL_LOGIN_NAME)
                },
                _changeAmbienceMusicSettings(t) {
                    !1 === t.ambienceMusicEnabled ? this._muteChannel(r.MUSIC_SUB_CHANNEL_AMBIENCE_NAME) : this._unmuteChannel(r.MUSIC_SUB_CHANNEL_AMBIENCE_NAME)
                },
                _changeVoiceSettings(t) {
                    !1 === t.voiceEnabled ? this._muteChannel(r.VOICE_CHANNEL_NAME) : (void 0 !== t.voiceVolume ? this._setChannelVolume(r.VOICE_CHANNEL_NAME, t.voiceVolume / 100) : this._unmuteChannel(r.VOICE_CHANNEL_NAME), this._changePickChampVoSettings(t), this._changeBanChampVoSettings(t))
                },
                _changePickChampVoSettings(t) {
                    !1 === t.pickChampVoEnabled ? this._muteChannel(r.VOICE_SUB_CHANNEL_PICK_CHAMP_NAME) : this._unmuteChannel(r.VOICE_SUB_CHANNEL_PICK_CHAMP_NAME)
                },
                _changeBanChampVoSettings(t) {
                    !1 === t.banChampVoEnabled ? this._muteChannel(r.VOICE_SUB_CHANNEL_BAN_CHAMP_NAME) : this._unmuteChannel(r.VOICE_SUB_CHANNEL_BAN_CHAMP_NAME)
                }
            });
            var a = s;
            e.default = a
        }, (t, e) => {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.VOICE_SUB_CHANNEL_PICK_CHAMP_NAME = e.VOICE_SUB_CHANNEL_BAN_CHAMP_NAME = e.VOICE_CHANNEL_NAME = e.SFX_SUB_CHANNEL_UI_NAME = e.SFX_SUB_CHANNEL_NOTIFICATIONS_NAME = e.SFX_SUB_CHANNEL_CHAMPIONS_NAME = e.SFX_SUB_CHANNEL_AMBIENCE_PERKS_NAME = e.SFX_SUB_CHANNEL_AMBIENCE_NAME = e.SFX_SUB_CHANNEL_AMBIENCE_INTERRUPTABLE_NAME = e.SFX_CHANNEL_NAME = e.MUSIC_SUB_CHANNEL_LOGIN_NAME = e.MUSIC_SUB_CHANNEL_CHAMPIONS_NAME = e.MUSIC_SUB_CHANNEL_AMBIENCE_NAME = e.MUSIC_CHANNEL_NAME = void 0;
            e.SFX_CHANNEL_NAME = "sfx";
            e.SFX_SUB_CHANNEL_NOTIFICATIONS_NAME = "sfx-notifications";
            e.SFX_SUB_CHANNEL_UI_NAME = "sfx-ui";
            e.SFX_SUB_CHANNEL_CHAMPIONS_NAME = "sfx-champions";
            e.SFX_SUB_CHANNEL_AMBIENCE_NAME = "sfx-ambience";
            e.SFX_SUB_CHANNEL_AMBIENCE_PERKS_NAME = "sfx-ambience-perks";
            e.SFX_SUB_CHANNEL_AMBIENCE_INTERRUPTABLE_NAME = "sfx-ambience-interruptable";
            e.MUSIC_CHANNEL_NAME = "music";
            e.MUSIC_SUB_CHANNEL_CHAMPIONS_NAME = "music-champ-selection";
            e.MUSIC_SUB_CHANNEL_LOGIN_NAME = "music-login";
            e.MUSIC_SUB_CHANNEL_AMBIENCE_NAME = "music-ambience";
            e.VOICE_CHANNEL_NAME = "voice";
            e.VOICE_SUB_CHANNEL_PICK_CHAMP_NAME = "vo-pick-champion";
            e.VOICE_SUB_CHANNEL_BAN_CHAMP_NAME = "vo-ban-champion"
        }],
        e = {};

    function n(i) {
        var r = e[i];
        if (void 0 !== r) return r.exports;
        var o = e[i] = {
            exports: {}
        };
        return t[i](o, o.exports, n), o.exports
    }
    n.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (t) {
            if ("object" == typeof window) return window
        }
    }();
    var i = {};
    (() => {
        "use strict";
        var t, e = (t = n(1)) && t.__esModule ? t : {
            default: t
        };
        const i = "rcp-fe-audio",
            r = document.currentScript.ownerDocument;
        const o = window.getPluginAnnounceEventName(i);
        r.addEventListener(o, (function(t) {
            const o = t.registrationHandler,
                s = r.getElementById("rcp-fe-audio-harness-tmpl"),
                a = document.importNode(s.content, !0);
            document.body.appendChild(a), o((function(t) {
                const r = t.getSocket();
                return e.default.init(t, {
                    dataBinding: t => t.get("rcp-fe-common-libs").getDataBinding("rcp-fe-audio"),
                    logger: t => t.get("rcp-fe-common-libs").logging.create(i)
                }).then((() => {
                    const t = new(0, n(2).default);
                    return t.initDataBindings(r), t
                }))
            }))
        }), {
            once: !0
        })
    })()
})();