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
            e.exports = JSON.parse('{"BOTTOM":{"15":0.01991,"18":0.01974,"21":0.03654,"22":0.05046,"29":0.02485,"51":0.0801,"67":0.05397,"81":0.10561,"96":0.0078,"110":0.04817,"115":0.01853,"119":0.03038,"145":0.09588,"157":0.01106,"202":0.07062,"221":0.01344,"222":0.05987,"236":0.03169,"360":0.03989,"429":0.02405,"498":0.04849,"523":0.03803,"895":0.01378},"MIDDLE":{"1":0.00625,"3":0.00659,"4":0.02017,"7":0.0172,"8":0.01676,"13":0.00883,"34":0.00915,"38":0.01375,"39":0.01768,"42":0.00363,"45":0.01969,"55":0.02953,"61":0.06707,"69":0.00756,"80":0.00968,"84":0.04787,"90":0.01799,"91":0.01608,"99":0.02131,"101":0.0178,"103":0.03735,"105":0.02434,"112":0.01815,"126":0.01996,"127":0.01528,"134":0.04706,"136":0.01349,"142":0.01279,"157":0.04171,"166":0.0101,"238":0.03856,"245":0.01209,"246":0.00961,"268":0.0349,"517":0.05087,"518":0.01284,"711":0.01822,"777":0.04938,"910":0.00067,"950":0.01296},"TOP":{"2":0.01086,"6":0.01017,"10":0.01506,"14":0.01833,"17":0.01487,"23":0.0129,"24":0.04753,"27":0.00922,"31":0.0097,"36":0.01024,"39":0.01955,"41":0.02024,"48":0.01458,"54":0.02567,"58":0.02707,"68":0.01487,"75":0.02294,"80":0.01188,"82":0.01871,"83":0.01228,"84":0.01504,"85":0.00751,"86":0.03595,"92":0.0274,"98":0.01127,"106":0.01592,"114":0.02856,"122":0.03716,"126":0.02548,"133":0.00719,"150":0.01552,"157":0.01101,"164":0.02058,"223":0.01282,"240":0.00695,"266":0.07061,"420":0.02105,"516":0.01896,"777":0.0596,"875":0.02759,"887":0.02463,"897":0.03772},"JUNGLE":{"5":0.00936,"9":0.01607,"11":0.02723,"19":0.0117,"20":0.01379,"28":0.02017,"30":0.01207,"32":0.01228,"33":0.01438,"35":0.02739,"56":0.04093,"57":0.01718,"59":0.04965,"60":0.00977,"62":0.0096,"64":0.08485,"72":0.00335,"76":0.01751,"77":0.01095,"78":0.0155,"79":0.01382,"102":0.00941,"104":0.05341,"107":0.01524,"113":0.0135,"120":0.02257,"121":0.03412,"131":0.02152,"141":0.05662,"154":0.01688,"163":0.01637,"200":0.02207,"203":0.01237,"233":0.04029,"234":0.03584,"245":0.02576,"254":0.02565,"421":0.00618,"427":0.01135,"517":0.01555,"876":0.02057},"SUPPORT":{"12":0.02319,"16":0.02566,"22":0.02404,"25":0.02827,"26":0.01172,"37":0.01086,"40":0.02611,"43":0.02667,"44":0.0067,"50":0.01585,"53":0.04077,"63":0.01755,"74":0.00549,"80":0.00951,"89":0.02243,"99":0.04764,"101":0.02735,"111":0.0446,"117":0.03318,"143":0.02482,"147":0.0153,"161":0.01014,"201":0.01281,"235":0.06415,"267":0.02858,"350":0.02281,"412":0.06895,"432":0.02923,"497":0.04849,"518":0.01213,"526":0.02059,"555":0.036,"888":0.03096,"902":0.02506}}')
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