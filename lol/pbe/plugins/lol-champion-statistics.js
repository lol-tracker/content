(() => {
  "use strict";
  var e = [
      ,
      (e, t, n) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = function () {
            return (
              (function () {
                Object.keys(r).forEach((e) => {
                  Object.keys(r[e]).forEach((t) => {
                    const n = r[e][t],
                      c = { pos: e, rate: n };
                    o[t] ? o[t].push(c) : (o[t] = [c]);
                  });
                }),
                  Object.keys(o).forEach((e) => {
                    o[e].sort((e, t) => e - t);
                  });
              })(),
              {
                getPlayRates: function () {
                  return r;
                },
                getPreferredPosition: function (e) {
                  const t = o[e] || [];
                  return t.length > 0 ? t[0].pos : "NONE";
                },
              }
            );
          });
        const r = n(2),
          o = {};
      },
      (e) => {
        e.exports = JSON.parse(
          '{"SUPPORT":{"12":0.01918,"16":0.02281,"22":0.02159,"25":0.02457,"26":0.01163,"37":0.01428,"40":0.03029,"43":0.02782,"44":0.0067,"50":0.01133,"53":0.03434,"57":0.00958,"63":0.02124,"80":0.01209,"89":0.02764,"99":0.04327,"101":0.01703,"111":0.05049,"117":0.05334,"143":0.02345,"147":0.01853,"161":0.01224,"164":0.01007,"201":0.02233,"235":0.03348,"267":0.05381,"350":0.02562,"412":0.07323,"432":0.0133,"497":0.02616,"518":0.01156,"526":0.01492,"555":0.0384,"888":0.01205,"902":0.03593,"910":0.01295},"JUNGLE":{"5":0.02676,"9":0.01301,"11":0.02574,"19":0.01554,"20":0.01204,"24":0.01538,"28":0.01646,"30":0.01529,"32":0.01909,"33":0.01242,"35":0.02998,"56":0.02443,"59":0.02429,"60":0.01032,"62":0.01086,"63":0.01495,"64":0.10476,"72":0.02502,"76":0.02052,"77":0.0114,"78":0.01216,"79":0.01735,"102":0.00859,"104":0.02782,"106":0.01464,"107":0.01441,"113":0.01789,"120":0.01547,"121":0.03699,"131":0.0297,"141":0.03321,"154":0.0176,"163":0.01533,"200":0.01738,"203":0.0196,"233":0.0186,"234":0.07045,"245":0.01839,"254":0.03202,"421":0.01553,"427":0.00792,"517":0.01564,"876":0.01644},"TOP":{"2":0.00802,"6":0.01491,"10":0.0256,"14":0.01612,"17":0.01671,"23":0.01447,"24":0.0255,"27":0.00741,"31":0.00893,"36":0.01841,"39":0.01855,"41":0.01644,"48":0.01807,"54":0.02432,"58":0.02782,"67":0.01812,"68":0.01343,"72":0.0148,"74":0.00441,"75":0.0224,"79":0.01796,"80":0.01005,"82":0.03505,"83":0.01447,"84":0.01379,"85":0.01145,"86":0.03041,"92":0.01952,"98":0.01806,"106":0.0159,"114":0.01979,"122":0.0465,"126":0.01887,"133":0.00701,"150":0.01359,"154":0.01062,"157":0.01202,"164":0.03048,"223":0.01368,"240":0.00768,"266":0.04665,"420":0.0153,"516":0.01824,"777":0.03021,"875":0.03425,"887":0.01416,"897":0.02477},"MIDDLE":{"1":0.00918,"3":0.018,"4":0.02773,"7":0.02357,"8":0.01401,"13":0.00911,"18":0.01801,"34":0.00999,"38":0.01616,"39":0.01739,"42":0.01096,"45":0.02607,"54":0.01338,"55":0.03335,"61":0.02314,"63":0.01557,"69":0.00737,"84":0.04042,"90":0.02009,"91":0.00992,"99":0.02546,"101":0.01252,"103":0.05432,"105":0.01797,"112":0.01537,"115":0.00368,"127":0.01342,"131":0.01588,"134":0.02102,"136":0.03121,"142":0.01103,"157":0.0463,"163":0.01888,"166":0.01193,"238":0.03607,"245":0.01144,"246":0.01127,"268":0.01972,"517":0.03982,"711":0.01735,"777":0.03269,"910":0.03748,"950":0.00648},"BOTTOM":{"15":0.01633,"18":0.02162,"21":0.02658,"22":0.05419,"29":0.03053,"51":0.06886,"67":0.03611,"81":0.063,"96":0.01932,"110":0.04446,"115":0.0046,"119":0.03676,"145":0.06774,"157":0.01046,"202":0.0809,"221":0.02938,"222":0.10432,"236":0.07862,"360":0.03797,"429":0.02328,"498":0.02297,"523":0.02805,"895":0.00963,"901":0.03293}}',
        );
      },
      (e, t, n) => {
        n.r(t);
      },
    ],
    t = {};
  function n(r) {
    var o = t[r];
    if (void 0 !== o) return o.exports;
    var c = (t[r] = { exports: {} });
    return e[r](c, c.exports, n), c.exports;
  }
  (n.r = (e) => {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
      Object.defineProperty(e, "__esModule", { value: !0 });
  }),
    (() => {
      var e,
        t = (e = n(1)) && e.__esModule ? e : { default: e };
      n(3);
      const r = document.currentScript.ownerDocument;
      const o = window.getPluginAnnounceEventName(
        "rcp-fe-lol-champion-statistics",
      );
      r.addEventListener(
        o,
        function (e) {
          (0, e.registrationHandler)(function () {
            return (0, t.default)();
          });
        },
        { once: !0 },
      );
    })();
})();
