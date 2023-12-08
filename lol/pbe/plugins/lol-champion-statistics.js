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
            e.exports = JSON.parse('{"BOTTOM":{"15":0.01917,"18":0.01956,"21":0.03722,"22":0.05042,"29":0.02639,"51":0.08085,"67":0.05372,"81":0.11174,"96":0.00762,"110":0.04965,"115":0.01518,"119":0.03131,"145":0.09449,"157":0.01157,"202":0.07399,"221":0.01348,"222":0.05805,"236":0.03572,"360":0.04023,"429":0.01992,"498":0.04458,"523":0.03465,"895":0.0125},"JUNGLE":{"5":0.00953,"9":0.01649,"11":0.02776,"19":0.01162,"20":0.01398,"28":0.02064,"30":0.01311,"32":0.01219,"33":0.01492,"35":0.02756,"48":0.01012,"56":0.04339,"57":0.01478,"59":0.03871,"60":0.00941,"62":0.00862,"63":0.01549,"64":0.08502,"72":0.00314,"76":0.01763,"77":0.01075,"78":0.01481,"79":0.01463,"102":0.00885,"104":0.05741,"107":0.01718,"113":0.01252,"120":0.02304,"121":0.03731,"131":0.02115,"141":0.05595,"154":0.01741,"163":0.01553,"200":0.01952,"203":0.01299,"233":0.04061,"234":0.03692,"245":0.02644,"254":0.02495,"421":0.00638,"427":0.01056,"517":0.01566,"876":0.01924},"MIDDLE":{"1":0.00663,"3":0.00694,"4":0.02186,"7":0.018,"8":0.01724,"13":0.00873,"34":0.00949,"38":0.01393,"39":0.018,"42":0.00344,"45":0.02002,"55":0.02933,"61":0.0599,"69":0.00772,"80":0.01043,"84":0.0472,"90":0.01833,"91":0.01707,"99":0.02133,"101":0.01814,"103":0.03653,"105":0.02542,"112":0.018,"126":0.02043,"127":0.01549,"134":0.05049,"136":0.01282,"142":0.01253,"157":0.04215,"166":0.01038,"238":0.03949,"245":0.01316,"246":0.01064,"268":0.02518,"517":0.05198,"518":0.01196,"711":0.01842,"777":0.04679,"910":0.01297,"950":0.00925},"SUPPORT":{"12":0.02307,"16":0.02567,"22":0.02556,"25":0.0285,"26":0.01219,"37":0.01075,"40":0.03255,"43":0.02766,"44":0.0065,"50":0.0162,"53":0.04162,"63":0.01792,"74":0.00549,"80":0.01014,"89":0.0233,"99":0.04816,"101":0.02768,"111":0.04328,"117":0.03291,"143":0.02555,"147":0.01519,"161":0.01046,"201":0.01336,"235":0.06124,"267":0.02816,"350":0.02345,"412":0.06923,"432":0.02541,"497":0.04521,"518":0.01198,"526":0.01898,"555":0.03547,"888":0.02573,"902":0.02395},"TOP":{"2":0.01086,"6":0.00989,"10":0.01421,"14":0.01905,"17":0.0151,"23":0.01293,"24":0.04893,"27":0.00901,"31":0.00957,"36":0.01002,"39":0.01994,"41":0.02025,"48":0.03348,"54":0.0266,"58":0.02521,"68":0.01151,"75":0.02135,"80":0.01288,"82":0.01971,"83":0.01256,"84":0.01536,"85":0.0076,"86":0.03449,"92":0.03151,"98":0.01106,"106":0.01714,"114":0.0292,"122":0.03634,"126":0.02835,"133":0.00705,"150":0.01597,"157":0.01114,"164":0.02158,"223":0.01262,"240":0.00689,"266":0.06659,"420":0.02195,"516":0.01864,"777":0.05393,"875":0.02691,"887":0.0223,"897":0.02277}}')
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