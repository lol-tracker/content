(() => {
    "use strict";
    var e = [, (e, t, n) => {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = function() {
                return function() {
                    Object.keys(r).forEach((e => {
                        Object.keys(r[e]).forEach((t => {
                            const n = r[e][t],
                                c = {
                                    pos: e,
                                    rate: n
                                };
                            o[t] ? o[t].push(c) : o[t] = [c]
                        }))
                    })), Object.keys(o).forEach((e => {
                        o[e].sort(((e, t) => e - t))
                    }))
                }(), {
                    getPlayRates: function() {
                        return r
                    },
                    getPreferredPosition: function(e) {
                        const t = o[e] || [];
                        return t.length > 0 ? t[0].pos : "NONE"
                    }
                }
            };
            const r = n(2),
                o = {}
        }, e => {
            e.exports = JSON.parse('{"BOTTOM":{"15":0.01736,"18":0.02038,"21":0.03836,"22":0.05072,"29":0.02875,"51":0.08425,"67":0.05385,"81":0.11077,"96":0.00896,"110":0.04765,"115":0.01146,"119":0.03085,"145":0.08225,"157":0.01238,"202":0.08134,"221":0.01515,"222":0.05107,"236":0.06444,"360":0.04317,"429":0.01614,"498":0.03237,"523":0.02647,"895":0.01119},"JUNGLE":{"5":0.01025,"9":0.01569,"11":0.03072,"19":0.01473,"20":0.01639,"28":0.02226,"30":0.01287,"32":0.01282,"33":0.01647,"35":0.03058,"56":0.04501,"57":0.01045,"59":0.03006,"60":0.01009,"62":0.00699,"63":0.02265,"64":0.08044,"72":0.00349,"76":0.0183,"77":0.01141,"78":0.01344,"79":0.01859,"102":0.0093,"104":0.05577,"107":0.01897,"113":0.01151,"120":0.02753,"121":0.04217,"131":0.02209,"141":0.05133,"154":0.01707,"163":0.01319,"200":0.02053,"203":0.01512,"233":0.03637,"234":0.03674,"245":0.02845,"254":0.02284,"421":0.00678,"427":0.00825,"517":0.01269,"876":0.01815},"MIDDLE":{"1":0.00709,"3":0.01047,"4":0.02607,"7":0.02242,"8":0.01781,"13":0.00806,"34":0.00935,"38":0.01326,"39":0.02059,"42":0.00469,"45":0.01947,"55":0.03308,"61":0.03383,"69":0.00688,"80":0.01077,"84":0.04129,"90":0.01877,"91":0.02217,"99":0.02104,"101":0.018,"103":0.03372,"105":0.02958,"112":0.01839,"126":0.01551,"127":0.01577,"134":0.03719,"136":0.01096,"142":0.0123,"157":0.04849,"166":0.01177,"238":0.0421,"245":0.01409,"246":0.01309,"268":0.0168,"517":0.0419,"518":0.01109,"711":0.01716,"777":0.04126,"910":0.06311,"950":0.00854},"TOP":{"2":0.01059,"6":0.00969,"10":0.01503,"14":0.01799,"17":0.01785,"23":0.01343,"24":0.04793,"27":0.0091,"31":0.01027,"36":0.01033,"39":0.02168,"41":0.02078,"48":0.03864,"54":0.02867,"58":0.02428,"68":0.01078,"75":0.02385,"80":0.01314,"82":0.02186,"83":0.01262,"84":0.01455,"85":0.00792,"86":0.03426,"92":0.03041,"98":0.01117,"106":0.02027,"114":0.02626,"122":0.03756,"126":0.02489,"133":0.00878,"150":0.01562,"157":0.01222,"164":0.02584,"223":0.01134,"240":0.0072,"266":0.05937,"420":0.02096,"516":0.01735,"777":0.04348,"875":0.02519,"887":0.01904,"897":0.02008},"SUPPORT":{"12":0.02335,"16":0.02659,"22":0.02249,"25":0.03016,"26":0.01125,"37":0.01125,"40":0.02722,"43":0.02859,"44":0.00626,"50":0.01578,"53":0.04203,"63":0.01949,"74":0.00504,"80":0.01069,"89":0.02784,"99":0.04872,"101":0.02995,"111":0.0454,"117":0.03371,"143":0.02647,"147":0.01499,"161":0.00975,"201":0.01484,"235":0.05506,"267":0.03188,"350":0.02723,"412":0.07011,"432":0.02131,"497":0.03979,"518":0.01185,"526":0.01534,"555":0.03745,"888":0.01655,"902":0.02751,"910":0.01446}}')
        }, (e, t, n) => {
            n.r(t)
        }],
        t = {};

    function n(r) {
        var o = t[r];
        if (void 0 !== o) return o.exports;
        var c = t[r] = {
            exports: {}
        };
        return e[r](c, c.exports, n), c.exports
    }
    n.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, (() => {
        var e, t = (e = n(1)) && e.__esModule ? e : {
            default: e
        };
        n(3);
        const r = document.currentScript.ownerDocument;
        const o = window.getPluginAnnounceEventName("rcp-fe-lol-champion-statistics");
        r.addEventListener(o, (function(e) {
            (0, e.registrationHandler)((function() {
                return (0, t.default)()
            }))
        }), {
            once: !0
        })
    })()
})();