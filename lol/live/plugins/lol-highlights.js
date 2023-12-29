(() => {
  var e = [
      ,
      (e) => {
        "use strict";
        let t;
        function l() {
          return (
            t ||
            (console.error(
              "The `provider` object has not been set, please do so by calling the `init` method.",
            ),
            null)
          );
        }
        const n = {
          init: function (e, l) {
            return (t = e), this.add(l);
          },
          _getValue: function (e, l) {
            let n;
            return (
              "function" == typeof l
                ? ((n = l(t)),
                  n ||
                    console.warn(
                      "The function for key " + e + " returned a falsy value: ",
                      n,
                    ))
                : "string" == typeof l
                  ? ((n = t.get(l)),
                    n ||
                      console.warn(
                        "The provider `get` invocation for the key " +
                          e +
                          " returned a falsy value: ",
                        n,
                      ))
                  : "object" == typeof l && (n = l),
              n
            );
          },
          add: function (e) {
            e = e || {};
            const t = [],
              l = this;
            return (
              Object.keys(e).forEach(function (n) {
                const i = e[n],
                  s = l._getValue(n, i);
                s && s.then
                  ? (s.then(function (e) {
                      e ||
                        console.warn(
                          "The promise for the key " +
                            n +
                            " resolved with a falsy value: ",
                          e,
                        ),
                        l._addValue(n, e);
                    }),
                    t.push(s))
                  : l._addValue(n, s);
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
              l()
            );
          },
          getProvider: function () {
            return l();
          },
        };
        e.exports = n;
      },
      (e, t, l) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = function () {
            const { ComponentFactory: e, Home: t, dataBinding: n } = i.default;
            let a = !1,
              h = null,
              c = null;
            const g = function (n) {
              a !== n &&
                ((a = n),
                h
                  ? (h.setEnabled(n), !n && c && t.showHome())
                  : n &&
                    ((h = i.default.profilesApi
                      .mainSection()
                      .registerSection({
                        id: "profile-main-highlights",
                        title: i.default.tra.get("lol_highlights_profile_tab"),
                        priority: "5",
                        render: () => (
                          o || ((0, l(3).default)(), (o = !0)),
                          (c = e.create("rcp-fe-lol-highlights", {})),
                          c.domNode
                        ),
                        enabled: !0,
                      })),
                    h.addEventListener("deselected", () => {
                      c && (c.onRemove(), (c = null));
                    })));
            };
            n.observe(s, {}, (e) => {
              g(!(!e || !e.isHighlightsEnabled));
            });
          });
        var n,
          i = (n = l(1)) && n.__esModule ? n : { default: n };
        const s = "/lol-highlights/v1/config";
        let o = !1;
      },
      (e, t, l) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = function () {
            n.emberApplicationFactory.setFactoryDefinition(
              "rcp-fe-lol-highlights",
              {
                name: "rcp-fe-lol-highlights",
                ComponentFactory: n.ComponentFactory,
                Router: n.Ember.Router.extend({ location: "none" }),
                HighlightsPanelComponent: i.default,
                NoHighlightsPaneComponent: s.default,
                HighlightsLoadingComponent: o.default,
                HighlightsMainLayoutComponent: a.default,
                HighlightsListComponent: h.default,
                HighlightsListItemComponent: c.default,
                EditHighlightNameComponent: r.default,
                GenericTooltipComponent: m.default,
                TextTooltipComponent: p.default,
                SelectedHighlightNameComponent: g.default,
                HighlightsService: w.default,
                tra: n.traService,
                TEMPLATES: {
                  application: d.default,
                  index: u.default,
                  "components/highlights-panel": f.default,
                  "components/no-highlights-pane": _.default,
                  "components/highlights-loading": b.default,
                  "components/highlights-main-layout": x.default,
                  "components/highlights-list": v.default,
                  "components/highlights-list-item": y.default,
                  "components/edit-highlight-name": C.default,
                  "components/generic-tooltip": H.default,
                  "components/text-tooltip": E.default,
                  "components/selected-highlight-name": k.default,
                },
              },
              M,
            );
          });
        var n = l(1);
        l(4);
        var i = T(l(5)),
          s = T(l(6)),
          o = T(l(7)),
          a = T(l(8)),
          h = T(l(9)),
          c = T(l(10)),
          g = T(l(13)),
          r = T(l(14)),
          m = T(l(15)),
          p = T(l(16)),
          d = T(l(17)),
          u = T(l(18)),
          f = T(l(19)),
          _ = T(l(20)),
          b = T(l(21)),
          x = T(l(22)),
          v = T(l(23)),
          y = T(l(24)),
          k = T(l(25)),
          C = T(l(26)),
          H = T(l(27)),
          E = T(l(28)),
          w = T(l(29));
        function T(e) {
          return e && e.__esModule ? e : { default: e };
        }
        const M = { EMBER_CLI_COMPAT: !0 };
      },
      (e, t, l) => {
        "use strict";
        l.r(t);
      },
      (e, t, l) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = l(1),
          i = n.Ember.Component.extend({
            classNames: ["lol-highlights-panel"],
            highlights: n.Ember.inject.service(),
            highlightsArray: n.Ember.computed.alias("highlights.highlights"),
            isLoading: n.Ember.computed.alias("highlights.highlightsLoading"),
            hasHighlights: n.Ember.computed.notEmpty("highlights.highlights"),
          });
        t.default = i;
      },
      (e, t, l) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = l(1).Ember.Component.extend({
          classNames: [
            "lol-highlights-default-layout",
            "lol-highlights-panel-fade-in",
          ],
          sanitizerConfig: {
            allowedTags: ["p", "img"],
            allowedAttributes: { "*": ["class", "src"] },
          },
        });
        t.default = n;
      },
      (e, t, l) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = l(1).Ember.Component.extend({
          classNames: ["lol-highlights-loading-layout"],
        });
        t.default = n;
      },
      (e, t, l) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = l(1);
        const i = 2 * Math.pow(1024, 3);
        var s = n.Ember.Component.extend({
          highlights: null,
          classNames: [
            "lol-highlights-main-layout",
            "lol-highlights-panel-fade-in",
          ],
          selectedHighlight: null,
          selectedHighlightLastModDateStr: n.Ember.computed.alias(
            "selectedHighlight.lastModDateString",
          ),
          validHighlightSelected: n.Ember.computed(
            "selectedHighlight",
            function () {
              const e = this.get("selectedHighlight");
              return e && (e.fileSizeBytes || 0) <= i;
            },
          ),
          selectedHighlightId: n.Ember.computed.alias("selectedHighlight.id"),
          activeHighlightVideoSrc: n.Ember.computed(
            "validHighlightSelected",
            "selectedHighlight",
            function () {
              const e = this.get("validHighlightSelected"),
                t = this.get("selectedHighlight");
              return e ? t.url : "";
            },
          ),
          didInsertElement() {
            this._super(...arguments), this.syncSelectedHighlight();
          },
          didUpdateAttrs() {
            this._super(...arguments), this.syncSelectedHighlight();
          },
          syncSelectedHighlight() {
            const e = this.get("highlights") || [],
              t = this.get("selectedHighlight");
            e.length &&
              -1 === e.indexOf(t) &&
              (t
                ? this.set(
                    "selectedHighlight",
                    e.find((e) => e.id === t.id) || e[0],
                  )
                : this.set("selectedHighlight", e[0]));
          },
          actions: {
            selectHighlight(e) {
              this.set("selectedHighlight", e);
            },
          },
        });
        t.default = s;
      },
      (e, t, l) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = l(1).Ember.Component.extend({
          classNames: ["lol-highlights-list"],
          selectedHighlightId: "",
          highlights: null,
        });
        t.default = n;
      },
      (e, t, l) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n,
          i = l(1),
          s = (n = l(11)) && n.__esModule ? n : { default: n },
          o = l(12);
        var a = i.Ember.Component.extend({
          selectedHighlightId: "",
          highlight: null,
          highlights: i.Ember.inject.service(),
          highlightId: i.Ember.computed.alias("highlight.id"),
          isSelected: i.Ember.computed(
            "selectedHighlightId",
            "highlightId",
            function () {
              const e = this.get("selectedHighlightId");
              return this.get("highlightId") === e;
            },
          ),
          itemClasses: i.Ember.computed("isSelected", function () {
            const e = this.get("isSelected");
            return (0, s.default)("lol-highlights-list-item-inner", {
              "is-selected": e,
            });
          }),
          actions: {
            selectThisHighlight() {
              this.get("selectHighlight")(this.get("highlight"));
            },
            viewHighlightInFolder() {
              const e = this.get("highlight"),
                t = this.get("highlightId");
              this.get("highlights")
                .viewHighlightInFolder(t)
                .catch(() => {
                  const { filepath: t } = e,
                    l = this.get("tra").formatString(
                      "lol_highlights_toast_error_show_in_file_browser",
                      { filepath: t },
                    );
                  (0, o.showErrorModalWithMessage)(l);
                });
            },
            deleteHighlight() {
              this.get("highlight");
              const e = this.get("highlightId");
              i.UIKit.getModalManager()
                .add({
                  type: "DialogConfirm",
                  data: {
                    contents: this.get(
                      "tra.lol_highlights_delete_dialog_contents",
                    ),
                    acceptText: this.get(
                      "tra.lol_highlights_delete_dialog_accept_text",
                    ),
                    declineText: this.get(
                      "tra.lol_highlights_delete_dialog_decline_text",
                    ),
                    closeButton: !1,
                  },
                  show: !0,
                })
                .acceptPromise.then(() =>
                  this.get("highlights").deleteHighlight(e),
                )
                .catch(() => {});
            },
          },
        });
        t.default = a;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var l = (...e) =>
          e
            .reduce((e, t) => {
              return (
                "string" == typeof t
                  ? e.push(t)
                  : e.push(...((l = t), Object.keys(l).filter((e) => l[e]))),
                e
              );
              var l;
            }, [])
            .join(" ");
        t.default = l;
      },
      (e, t, l) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.showErrorModal = function (e, t) {
            const l =
              (((e && e.data && e.data.httpStatus) || -1) === i &&
                e &&
                e.data &&
                e.data.message) ||
              n.tra.get("lol_highlights_unknown_error_text");
            s(n.tra.formatString(t, { message: l }));
          }),
          (t.showErrorModalWithMessage = s);
        var n = l(1);
        const i = 550;
        function s(e) {
          const t = (function (e) {
              const t = document.createElement("lol-uikit-content-block");
              (t.style.maxWidth = "40em"),
                (t.style.padding = "1em"),
                (t.style.marginBottom = "2em");
              const l = document.createElement("p");
              return (
                t.appendChild(l),
                (l.style.overflowWrap = "break-word"),
                l.appendChild(document.createTextNode(e)),
                t
              );
            })(e),
            l = n.tra.get("lol_highlights_ok_button_text");
          n.UIKit.getModalManager().add({
            type: "DialogAlert",
            data: { contents: t, okText: l },
            show: !0,
          });
        }
      },
      (e, t, l) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = l(1),
          i = n.Ember.Component.extend({
            classNames: [
              "lol-highlights-selected-highlight-name",
              "lol-highlights-details-no-margin-bottom",
            ],
            highlights: n.Ember.inject.service(),
            selectedHighlight: null,
            isEditingName: !1,
            actions: {
              editName() {
                this.set(
                  "editingHighlightName",
                  this.get("selectedHighlight.name"),
                ),
                  this.set("isEditingName", !0);
              },
              exitEditingName() {
                this.set("isEditingName", !1);
              },
            },
          });
        t.default = i;
      },
      (e, t, l) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n,
          i = l(1),
          s = ((n = l(11)) && n.__esModule, l(12));
        var o = i.Ember.Component.extend({
          classNames: ["lol-highlights-name-edit-container"],
          highlights: i.Ember.inject.service(),
          highlight: {},
          maxNameCharacterLength: 64,
          editingHighlightName: "",
          saving: !1,
          savingDisabled: i.Ember.computed.empty("editingHighlightName"),
          init() {
            this._super(...arguments),
              this.set("editingHighlightName", this.get("highlight.name"));
          },
          didInsertElement() {
            this._super(...arguments);
            const e = this.element.querySelector(
              "input.lol-highlights-name-edit-input",
            );
            e.focus(), e.setSelectionRange(0, e.value.length);
          },
          badFilenameCharSet: i.Ember.computed(
            "highlights.config.invalidHighlightNameCharacters",
            function () {
              const e = this.get(
                "highlights.config.invalidHighlightNameCharacters",
              );
              return new Set(e);
            },
          ),
          badFilenameCharsForDisplay: i.Ember.computed(
            "highlights.config.invalidHighlightNameCharacters",
            function () {
              const e = this.get(
                "highlights.config.invalidHighlightNameCharacters",
              );
              return e ? [...e].join(" ") : "";
            },
          ),
          actions: {
            cancelEdit() {
              this.get("cancelEdit")();
            },
            saveHighlight() {
              const e = this.get("highlights"),
                t = this.get("editingHighlightName"),
                l = this.get("badFilenameCharSet"),
                n = this.get("badFilenameCharsForDisplay"),
                i = [...t].find((e) => l.has(e));
              null == i
                ? (this.set("savingDisabled", !0),
                  e
                    .updateHighlight({
                      ...this.get("highlight"),
                      name: this.get("editingHighlightName"),
                    })
                    .then(() => {
                      this.set("savingDisabled", !1), this.get("cancelEdit")();
                    }))
                : (0, s.showErrorModalWithMessage)(
                    this.get("tra").formatString(
                      "lol_highlights_toast_error_save_name_bad_character",
                      { foundBadChar: i, allBadChars: n },
                    ),
                  );
            },
          },
        });
        t.default = o;
      },
      (e, t, l) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = l(1);
        const i = {
          left: {
            targetAnchor: { x: "left", y: "center" },
            tooltipAnchor: { x: "right", y: "center" },
          },
          right: {
            targetAnchor: { x: "right", y: "center" },
            tooltipAnchor: { x: "left", y: "center" },
          },
          top: {
            targetAnchor: { x: "center", y: "top" },
            tooltipAnchor: { x: "center", y: "bottom" },
          },
          upperleft: {
            targetAnchor: { x: "left", y: "top" },
            tooltipAnchor: { x: "right", y: "center" },
            offset: { x: -15, y: -5 },
          },
          bottom: {
            targetAnchor: { x: "center", y: "bottom" },
            tooltipAnchor: { x: "center", y: "top" },
          },
        };
        var s = n.Ember.Component.extend({
          tagName: "template",
          type: "top",
          direction: "top",
          restrictArea: "whole-window",
          targetElement: null,
          clearOnClick: !1,
          tooltipType: "",
          uxSettingsService: n.Ember.inject.service("ux-settings"),
          disableAnimations: n.Ember.computed.alias(
            "uxSettingsService.disableAnimations",
          ),
          tooltipOptions: n.Ember.computed(
            "direction",
            "restrictArea",
            "disableAnimations",
            function () {
              const e = this.get("direction"),
                t = this.get("restrictArea");
              return {
                disableAnimations: this.get("disableAnimations"),
                tooltipOptions: { direction: e, restrictArea: t },
              };
            },
          ),
          clearTooltip() {
            n.tooltipManager.hide(this.targetElement);
          },
          setUpTooltip() {
            (this.targetElement = this.element.parentElement),
              (this.tooltipElement =
                this.element.querySelector("lol-uikit-tooltip"));
            const { disableAnimations: e, tooltipOptions: t } =
              this.get("tooltipOptions");
            Object.assign(t, i[t.direction]),
              e && (t.transitionSpeed = 0),
              n.tooltipManager.assign(
                this.targetElement,
                this.tooltipElement,
                null,
                t,
              ),
              this.get("clearOnClick") &&
                this.targetElement.addEventListener("click", this.clearTooltip);
          },
          actions: {
            clickHandler(e) {
              const t = this.get("onclick");
              t && t(e);
            },
          },
          didInsertElement() {
            this._super(...arguments),
              (this.clearTooltip = this.clearTooltip.bind(this)),
              this.setUpTooltip();
          },
          willDestroyElement() {
            this._super(...arguments),
              n.tooltipManager.unassign(this.targetElement),
              this.get("clearOnClick") &&
                this.targetElement.removeEventListener(
                  "click",
                  this.clearTooltip,
                );
          },
        });
        t.default = s;
      },
      (e, t, l) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = l(1).Ember.Component.extend({
          tagName: "",
          clearOnClick: !1,
          direction: "top",
          restrictArea: "whole-window",
        });
        t.default = n;
      },
      (e, t, l) => {
        const n = l(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "X08pD/Gs",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\templates\\\\application.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["append",["unknown",["outlet"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, l) => {
        const n = l(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "2t8iK/iS",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\templates\\\\index.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["append",["unknown",["highlights-panel"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, l) => {
        const n = l(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "LAiouOHl",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\templates\\\\components\\\\highlights-panel.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\components\\\\highlights-panel.js\\" "],["text","\\n"],["block",["if"],[["get",["isLoading"]]],null,3,2]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","  "],["append",["unknown",["no-highlights-pane"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["append",["helper",["highlights-main-layout"],null,[["highlights"],[["get",["highlightsArray"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["block",["if"],[["get",["hasHighlights"]]],null,1,0]],"locals":[]},{"statements":[["text","  "],["append",["unknown",["highlights-loading"]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, l) => {
        const n = l(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "OhYJxIzt",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\templates\\\\components\\\\no-highlights-pane.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\components\\\\no-highlights-pane.js\\" "],["text","\\n"],["open-element","div",[]],["flush-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["flush-element"],["text","\\n    "],["open-element","p",[]],["static-attr","class","lol-highlights-default-layout-warning-text"],["flush-element"],["open-element","img",[]],["static-attr","src","/fe/lol-highlights/icon-warning.png"],["static-attr","class","lol-highlights-default-layout-warning-img"],["flush-element"],["close-element"],["text","  "],["append",["unknown",["tra","lol_highlights_default_layout_warning_copy_highlights"]],false],["close-element"],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","lol-uikit-content-block",[]],["flush-element"],["text","\\n    "],["open-element","h2",[]],["flush-element"],["append",["unknown",["tra","lol_highlights_default_layout_heading"]],false],["close-element"],["text","\\n    "],["append",["helper",["sanitize"],[["get",["tra","lol_highlights_default_layout_text_html"]]],[["config"],[["get",["sanitizerConfig"]]]]],false],["text","\\n  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-highlights-default-layout-subsections-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-highlights-default-layout-subsection"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-content-block",[]],["flush-element"],["text","\\n        "],["open-element","h1",[]],["static-attr","class","lol-highlights-default-layout-steps-number"],["flush-element"],["append",["unknown",["tra","lol_highlights_default_layout_subsection1_step_number"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-content-block",[]],["static-attr","class","lol-highlights-default-layout-subsection-heading"],["flush-element"],["text","\\n        "],["open-element","h4",[]],["flush-element"],["append",["unknown",["tra","lol_highlights_default_layout_subsection1_heading"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-content-block",[]],["flush-element"],["text","\\n        "],["append",["helper",["sanitize"],[["get",["tra","lol_highlights_default_layout_subsection1_text_html"]]],[["config"],[["get",["sanitizerConfig"]]]]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-highlights-default-layout-subsection"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-content-block",[]],["flush-element"],["text","\\n        "],["open-element","h1",[]],["static-attr","class","lol-highlights-default-layout-steps-number"],["flush-element"],["append",["unknown",["tra","lol_highlights_default_layout_subsection2_step_number"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-content-block",[]],["static-attr","class","lol-highlights-default-layout-subsection-heading"],["flush-element"],["text","\\n        "],["open-element","h4",[]],["flush-element"],["append",["unknown",["tra","lol_highlights_default_layout_subsection2_heading"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-content-block",[]],["flush-element"],["text","\\n        "],["append",["helper",["sanitize"],[["get",["tra","lol_highlights_default_layout_subsection2_text_html"]]],[["config"],[["get",["sanitizerConfig"]]]]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-highlights-default-layout-subsection"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-content-block",[]],["flush-element"],["text","\\n        "],["open-element","h1",[]],["static-attr","class","lol-highlights-default-layout-steps-number"],["flush-element"],["append",["unknown",["tra","lol_highlights_default_layout_subsection3_step_number"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-content-block",[]],["static-attr","class","lol-highlights-default-layout-subsection-heading"],["flush-element"],["text","\\n        "],["open-element","h4",[]],["flush-element"],["append",["unknown",["tra","lol_highlights_default_layout_subsection3_heading"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n      "],["open-element","lol-uikit-content-block",[]],["flush-element"],["text","\\n        "],["append",["helper",["sanitize"],[["get",["tra","lol_highlights_default_layout_subsection3_text_html"]]],[["config"],[["get",["sanitizerConfig"]]]]],false],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, l) => {
        const n = l(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "e5RoNUvL",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\templates\\\\components\\\\highlights-loading.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\components\\\\highlights-loading.js\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","lol-highlights-loading-layout-text"],["flush-element"],["text","\\n  "],["comment","This div counterbalances the actual text and keeps the spinner vertically centered"],["text","\\n"],["close-element"],["text","\\n"],["append",["unknown",["uikit-spinner"]],false],["text","\\n"],["open-element","lol-uikit-content-block",[]],["static-attr","class","lol-highlights-loading-layout-text"],["flush-element"],["text","\\n  "],["open-element","p",[]],["flush-element"],["append",["unknown",["tra","lol_highlights_loading_text"]],false],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, l) => {
        const n = l(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "/Di1qXdd",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\templates\\\\components\\\\highlights-main-layout.hbs\\" style-path=\\"null\\" js-path=\\"null\\" "],["text","\\n"],["open-element","div",[]],["static-attr","class","highlights-main-layout-left-pane"],["flush-element"],["text","\\n  "],["append",["helper",["highlights-list"],null,[["highlights","selectedHighlightId","selectHighlight"],[["get",["highlights"]],["get",["selectedHighlightId"]],["helper",["action"],[["get",[null]],"selectHighlight"],null]]]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","div",[]],["static-attr","class","highlights-main-layout-right-pane"],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-highlights-video-player-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["validHighlightSelected"]]],null,2,1],["text","  "],["close-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","highlights-main-layout-details-container"],["flush-element"],["text","\\n"],["block",["if"],[["get",["selectedHighlight"]]],null,0],["text","    "],["open-element","img",[]],["static-attr","class","lol-highlights-decoration-line lol-highlights-details-no-margin-top"],["static-attr","src","/fe/lol-highlights/decoration_line.png"],["flush-element"],["close-element"],["text","\\n    "],["open-element","lol-uikit-content-block",[]],["flush-element"],["text","\\n        "],["open-element","h5",[]],["static-attr","class","lol-highlights-selected-highlight-modified-date"],["flush-element"],["append",["unknown",["selectedHighlightLastModDateStr"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["append",["helper",["selected-highlight-name"],null,[["selectedHighlight"],[["get",["selectedHighlight"]]]]],false],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","lol-uikit-content-block",[]],["static-attr","class","lol-highlights-video-too-large-error"],["flush-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["helper",["sanitize"],[["get",["tra","lol_highlights_highlight_too_large_error_html"]]],null],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","      "],["open-element","div",[]],["static-attr","class","lol-highlights-video-player"],["flush-element"],["text","\\n        "],["open-element","video",[]],["dynamic-attr","src",["unknown",["activeHighlightVideoSrc"]],null],["static-attr","controls",""],["flush-element"],["close-element"],["text","\\n      "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, l) => {
        const n = l(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "L+s5O9Jq",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\templates\\\\components\\\\highlights-list.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\components\\\\highlights-list.js\\" "],["text","\\n"],["open-element","lol-uikit-scrollable",[]],["static-attr","overflow-masks","enabled"],["flush-element"],["text","\\n  "],["open-element","ul",[]],["static-attr","direction","down"],["flush-element"],["text","\\n"],["block",["each"],[["get",["highlights"]]],null,0],["text","  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      "],["open-element","li",[]],["flush-element"],["text","\\n        "],["append",["helper",["highlights-list-item"],null,[["selectedHighlightId","highlight","selectHighlight"],[["get",["selectedHighlightId"]],["get",["highlight"]],["get",["selectHighlight"]]]]],false],["text","\\n      "],["close-element"],["text","\\n"]],"locals":["highlight"]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, l) => {
        const n = l(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "cCqSl6ow",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\templates\\\\components\\\\highlights-list-item.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\components\\\\highlights-list-item.js\\" "],["text","\\n"],["open-element","div",[]],["dynamic-attr","class",["unknown",["itemClasses"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"selectThisHighlight"],null],null],["flush-element"],["text","\\n  "],["open-element","div",[]],["static-attr","class","lol-highlights-list-item-contents"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-highlights-list-item-text"],["flush-element"],["text","\\n      "],["open-element","lol-uikit-content-block",[]],["static-attr","class","lol-highlights-list-item-text-container"],["flush-element"],["text","\\n        "],["open-element","h6",[]],["static-attr","class","lol-highlights-list-item-name preserve-case"],["flush-element"],["append",["unknown",["highlight","name"]],false],["close-element"],["text","\\n        "],["open-element","p",[]],["flush-element"],["append",["unknown",["highlight","lastModDateString"]],false],["close-element"],["text","\\n      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n"],["block",["if"],[["get",["isSelected"]]],null,2],["text","  "],["close-element"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","                "],["append",["unknown",["tra","lol_highlights_delete_button_tooltip"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","                "],["append",["unknown",["tra","lol_highlights_show_in_file_browser_tooltip"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","        "],["open-element","div",[]],["static-attr","class","lol-highlights-list-item-buttons"],["flush-element"],["text","\\n\\n          "],["open-element","div",[]],["static-attr","class","lol-highlights-show-in-file-browser-button"],["flush-element"],["text","\\n            "],["open-element","div",[]],["static-attr","class","lol-highlights-show-in-file-browser-button-inner"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"viewHighlightInFolder"],null],null],["flush-element"],["text","\\n"],["block",["text-tooltip"],null,[["tooltipType","direction"],["system","top"]],1],["text","            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n\\n          "],["open-element","div",[]],["static-attr","class","lol-highlights-delete-button"],["flush-element"],["text","\\n            "],["open-element","div",[]],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"deleteHighlight"],null],null],["static-attr","class","lol-highlights-delete-button-inner"],["flush-element"],["text","\\n"],["block",["text-tooltip"],null,[["tooltipType","direction"],["system","top"]],0],["text","            "],["close-element"],["text","\\n          "],["close-element"],["text","\\n        "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, l) => {
        const n = l(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "Xnt37TXq",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\templates\\\\components\\\\selected-highlight-name.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\components\\\\selected-highlight-name.js\\" "],["text","\\n"],["block",["if"],[["get",["isEditingName"]]],null,2,1]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","          "],["append",["unknown",["tra","lol_highlights_name_edit_button_tooltip"]],false],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["open-element","div",[]],["static-attr","class","lol-highlights-name-display-container"],["flush-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-highlights-edit-button-counter-weight"],["flush-element"],["close-element"],["text","\\n    "],["open-element","lol-uikit-content-block",[]],["flush-element"],["text","\\n      "],["open-element","h3",[]],["static-attr","class","preserve-case"],["flush-element"],["append",["unknown",["selectedHighlight","name"]],false],["close-element"],["text","\\n    "],["close-element"],["text","\\n    "],["open-element","div",[]],["static-attr","class","lol-highlights-edit-button-wrapper"],["flush-element"],["text","\\n      "],["open-element","div",[]],["static-attr","class","lol-highlights-edit-button"],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"editName"],null],null],["flush-element"],["text","\\n"],["block",["text-tooltip"],null,[["tooltipType","direction"],["system","top"]],0],["text","      "],["close-element"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]},{"statements":[["text","  "],["append",["helper",["edit-highlight-name"],null,[["cancelEdit","highlight"],[["helper",["action"],[["get",[null]],"exitEditingName"],null],["get",["selectedHighlight"]]]]],false],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, l) => {
        const n = l(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "o00V5WKl",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\templates\\\\components\\\\edit-highlight-name.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\components\\\\edit-highlight-name.js\\" "],["text","\\n"],["open-element","lol-uikit-flat-input",[]],["flush-element"],["text","\\n  "],["append",["helper",["input"],null,[["class","maxlength","escape-press","enter","value","disabled"],["lol-highlights-name-edit-input",["get",["maxNameCharacterLength"]],"cancelEdit","saveHighlight",["get",["editingHighlightName"]],["get",["saving"]]]]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","disabled",["unknown",["savingDisabled"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"saveHighlight"],null],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","lol_highlights_name_save_button_text"]],false],["text","\\n"],["close-element"],["text","\\n"],["open-element","lol-uikit-flat-button",[]],["dynamic-attr","disabled",["unknown",["savingDisabled"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"cancelEdit"],null],null],["flush-element"],["text","\\n    "],["append",["unknown",["tra","lol_highlights_name_cancel_button_text"]],false],["text","\\n"],["close-element"],["text","\\n"]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, l) => {
        const n = l(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "Fhn55MyT",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\templates\\\\components\\\\generic-tooltip.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\components\\\\generic-tooltip.js\\" "],["text","\\n"],["open-element","lol-uikit-tooltip",[]],["dynamic-attr","type",["unknown",["tooltipType"]],null],["dynamic-attr","onclick",["helper",["action"],[["get",[null]],"clickHandler"],null],null],["flush-element"],["text","\\n  "],["yield","default"],["text","\\n"],["close-element"]],"locals":[],"named":[],"yields":["default"],"blocks":[],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, l) => {
        const n = l(1).Ember;
        e.exports = n.HTMLBars.template({
          id: "S42CKC84",
          block:
            '{"statements":[["comment","#ember-component template-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\templates\\\\components\\\\text-tooltip.hbs\\" style-path=\\"null\\" js-path=\\"T:\\\\cid\\\\p4\\\\Releases_13_24\\\\LeagueClientContent_Release\\\\15690\\\\DevRoot\\\\Client\\\\fe\\\\rcp-fe-lol-highlights\\\\src\\\\app\\\\components\\\\text-tooltip.js\\" "],["text","\\n"],["block",["generic-tooltip"],null,[["tooltipType","direction","restrictArea","clearOnClick"],[["get",["tooltipType"]],["get",["direction"]],["get",["restrictArea"]],["get",["clearOnClick"]]]],0]],"locals":[],"named":[],"yields":["default"],"blocks":[{"statements":[["text","  "],["open-element","lol-uikit-content-block",[]],["static-attr","type","tooltip-system"],["static-attr","style","white-space: nowrap"],["flush-element"],["text","\\n    "],["open-element","p",[]],["flush-element"],["text","\\n      "],["yield","default"],["text","\\n    "],["close-element"],["text","\\n  "],["close-element"],["text","\\n"]],"locals":[]}],"hasPartials":false}',
          meta: {},
        });
      },
      (e, t, l) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.default = void 0);
        var n = l(1),
          i = l(30);
        const { moment: s } = n.tra,
          o = (e) =>
            e.map((e) => {
              const t = e.mtimeMsUtc || 0;
              return {
                ...e,
                lastModDateString:
                  0 === t
                    ? ""
                    : s(new Date(t)).format(
                        n.tra.get("lol_highlights_modified_date_format"),
                      ),
              };
            }),
          a = n.dataBinding,
          h = "/lol-highlights/v1/highlights",
          c = "/lol-highlights/v1/config";
        var g = n.Ember.Service.extend({
          highlightsLoading: !0,
          highlights: null,
          config: {},
          highlightsLookup: n.Ember.computed("highlights", function () {
            return (0, i.idMap)(this.get("mapBy"));
          }),
          init() {
            this._super(...arguments),
              this.set("highlights", []),
              this._initObservers();
          },
          _initObservers() {
            a.post(h),
              a.observe(h, this, (e) => {
                this.setProperties({
                  highlights: o(e || []),
                  highlightsLoading: !1,
                });
              }),
              a.observe(c, this, (e) => e && this.set("config", e));
          },
          updateHighlight: (e) =>
            a.put(`/lol-highlights/v1/highlights/${e.id}`, e),
          viewHighlightInFolder: (e) =>
            a.post(`/lol-highlights/v1/file-browser/${e}`),
          deleteHighlight: (e) => a.delete(`${h}/${e}`),
          willDestroy() {
            this._super(...arguments),
              a.unobserve(h, this),
              a.unobserve(c, this);
          },
        });
        t.default = g;
      },
      (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.summonerIdMap = t.mapBy = t.lowerCase = t.idMap = void 0);
        t.lowerCase = (e) => ("string" == typeof e ? e.toLowerCase() : e);
        const l = (e, t, l = (e) => e) => {
          const n = [];
          for (const i of e || []) i.hasOwnProperty(t) && n.push([l(i[t]), i]);
          return new Map(n);
        };
        t.mapBy = l;
        t.summonerIdMap = (e) => l(e, "summonerId");
        t.idMap = (e) => l(e, "id");
      },
    ],
    t = {};
  function l(n) {
    var i = t[n];
    if (void 0 !== i) return i.exports;
    var s = (t[n] = { exports: {} });
    return e[n](s, s.exports, l), s.exports;
  }
  (l.r = (e) => {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
      Object.defineProperty(e, "__esModule", { value: !0 });
  }),
    (() => {
      "use strict";
      var e,
        t = (e = l(1)) && e.__esModule ? e : { default: e };
      const n = "rcp-fe-lol-highlights",
        i = document.currentScript.ownerDocument;
      const s = window.getPluginAnnounceEventName(n);
      i.addEventListener(
        s,
        function (e) {
          (0, e.registrationHandler)(function (e) {
            return t.default
              .init(e, {
                Bluebird: (e) => e.get("rcp-fe-common-libs").getBluebird("3"),
                ComponentFactory: (e) =>
                  e.get("rcp-fe-common-libs").getComponentFactory("1"),
                dataBindingLib: (e) =>
                  e
                    .get("rcp-fe-common-libs")
                    .getDataBinding("rcp-fe-lol-highlights"),
                Ember: (e) => e.get("rcp-fe-ember-libs").getEmber(),
                emberL10n: (e) => e.get("rcp-fe-ember-libs").getEmberL10n("1"),
                Home: (e) => e.get("rcp-fe-lol-navigation"),
                lodash: (e) => e.get("rcp-fe-common-libs").getLodash("4"),
                logger: (e) => e.get("rcp-fe-common-libs").logging.create(n),
                profilesApi: (e) => e.get("rcp-fe-lol-profiles"),
                socket: (e) => e.getSocket(),
                tooltipManager: (e) =>
                  e.get("rcp-fe-lol-uikit").getTooltipManager(),
                tra: (e) =>
                  e
                    .get("rcp-fe-lol-l10n")
                    .tra()
                    .overlay("/fe/lol-l10n/trans.json")
                    .overlay("/fe/lol-highlights/trans.json"),
                UIKit: (e) => e.get("rcp-fe-lol-uikit"),
              })
              .then(function () {
                return (
                  (t.default.dataBinding = t.default.dataBindingLib.bindTo(
                    t.default.socket,
                  )),
                  t.default.tra.ready()
                );
              })
              .then(() => {
                const l = t.default.emberL10n(t.default.Ember, t.default.tra);
                return t.default.add({
                  emberApplicationFactory: e
                    .get("rcp-fe-ember-libs")
                    .getEmberApplicationFactory(),
                  traService: l,
                });
              })
              .then(() => {
                const e = l(2).default;
                return t.default.add({ lifecycleListener: e() });
              })
              .then(() => ({}));
          });
        },
        { once: !0 },
      );
    })();
})();
