(() => {
    "use strict";
    var e = [, e => {
            let t;

            function n() {
                return t || (console.error("The `provider` object has not been set, please do so by calling the `init` method."), null)
            }
            const r = {
                init: function(e, n) {
                    return t = e, this.add(n)
                },
                _getValue: function(e, n) {
                    let r;
                    return "function" == typeof n ? (r = n(t), r || console.warn("The function for key " + e + " returned a falsy value: ", r)) : "string" == typeof n ? (r = t.get(n), r || console.warn("The provider `get` invocation for the key " + e + " returned a falsy value: ", r)) : "object" == typeof n && (r = n), r
                },
                add: function(e) {
                    e = e || {};
                    const t = [],
                        n = this;
                    return Object.keys(e).forEach((function(r) {
                        const i = e[r],
                            o = n._getValue(r, i);
                        o && o.then ? (o.then((function(e) {
                            e || console.warn("The promise for the key " + r + " resolved with a falsy value: ", e), n._addValue(r, e)
                        })), t.push(o)) : n._addValue(r, o)
                    })), Promise.all(t)
                },
                _addValue: function(e, t) {
                    this[e] = t
                },
                provider: function() {
                    return console.error("The function `provider` has been deprecated, please use `getProvider`", (new Error).stack), n()
                },
                getProvider: function() {
                    return n()
                }
            };
            e.exports = r
        }, (e, t, n) => {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var r, i = n(1),
                o = (r = n(3)) && r.__esModule ? r : {
                    default: r
                };
            t.default = class {
                constructor(e) {
                    this._layerManager = e, this._dialogFrame = null, this._surveyDOM = null, this._removeSurvey = this._removeSurvey.bind(this)
                }
                _buildSurvey(e) {
                    if (!e) throw new Error("surveyModel cannot be null");
                    const t = i.ComponentFactory.getDOMNode(i.ComponentFactory.create("survey", e));
                    if (!t.classList.contains("pft-survey")) throw new Error("Something went wrong with constructing a pft survey");
                    this._surveyDOM = t
                }
                addSurvey(e) {
                    this._buildSurvey(e), this._dialogFrame = document.createElement("lol-uikit-dialog-frame"), this._dialogFrame.setAttribute("style", "position: absolute; bottom: 30px; right: 240px;"), this._dialogFrame.setAttribute("dismissable", ""), this._dialogFrame.setAttribute("dismissable-type", "inside"), this._dialogFrame.appendChild(this._surveyDOM), this._layerManager.addLayer(this._dialogFrame), "internal" === e.type.toLowerCase() ? this._surveyDOM.addEventListener("pft.event.survey.submit", this._removeSurvey) : "external" === e.type.toLowerCase() && this._surveyDOM.addEventListener("pft.event.survey.popout", this._removeSurvey), this._dialogFrame.addEventListener("dialogFrameDismissed", this._removeSurvey)
                }
                _removeSurvey(e) {
                    this._dialogFrame.removeEventListener("dialogFrameDissmissed", this.removeSurvey), this._surveyDOM.removeEventListener("pft.event.survey.popout", this.removeSurvey), this._surveyDOM.removeEventListener("pft.event.survey.submit", this.removeSurvey), this._layerManager.removeLayer(this._dialogFrame), o.default.dequeue(), "dialogFrameDismissed" === e.type && document.dispatchEvent(new CustomEvent("pft.event.survey.close", {
                        detail: {
                            action: "close",
                            playerSurveyId: this._surveyDOM.dataset.id
                        }
                    })), this._dialogFrame = null, this._surveyDOM = null
                }
            }
        }, (e, t) => {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            t.default = {
                _store: [],
                list: function() {
                    return this._store
                },
                enqueue: function(e) {
                    this._store.push(e)
                },
                dequeue: function() {
                    let e = null;
                    return this._store.length > 0 && (e = this._store.shift(1)), e
                },
                peek: function() {
                    let e = null;
                    return this._store.length > 0 && (e = this._store[0]), e
                }
            }
        }, (e, t, n) => {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var r = o(n(5)),
                i = o(n(3));

            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n(6);
            const s = {
                name: "checkboxes",
                _className: "pft-checkboxes",
                templateId: "pft-template-checkboxes",
                _validateOne: function(e, t, n) {
                    if (!(e in n) || typeof n[e] !== t) return new Error("missing or invalid fields")
                },
                _validateDataFields: function(e) {
                    const t = {
                        questionPosition: "number",
                        questionId: "number",
                        question: "string",
                        options: "object"
                    };
                    if (!e || "object" != typeof e) return new Error("invalid data");
                    for (const n in t) {
                        const r = this._validateOne(n, t[n], e);
                        if (r) return r
                    }
                    return null
                },
                _buildCheckbox: function(e, t, n) {
                    const r = document.createElement("lol-uikit-flat-checkbox");
                    r.classList.add(this._className);
                    const i = document.createElement("input");
                    i.classList.add("pft-survey-input"), i.id = n, i.type = "checkbox", i.slot = "input";
                    const o = document.createElement("label");
                    o.innerHTML = t, o.slot = "label", r.appendChild(i), r.appendChild(o);
                    const s = document.createElement("li");
                    return s.appendChild(r), s
                },
                _build: function(e, t) {
                    t.querySelector(".checkboxes-question").innerHTML = e.question;
                    const n = t.querySelector(".checkboxes-input");
                    for (const t in e.options) {
                        const r = this._buildCheckbox(e.questionId, t, e.options[t]);
                        n.appendChild(r)
                    }
                    return t.addEventListener("checkboxToggle", (function(n) {
                        const r = i.default.peek()[e.questionPosition],
                            o = r.value ? r.value : {};
                        !0 === n.checked.checked ? o[n.checked.id] = n.target.querySelector("label").innerHTML : o[n.checked.id] = void 0, Object.assign(i.default.peek()[e.questionPosition], {
                            value: o
                        }), t.dispatchEvent(new CustomEvent("pft.event.survey.update", {
                            bubbles: !0,
                            detail: {
                                action: "update",
                                playerSurveyId: i.default.peek()[0].playerSurveyId
                            }
                        }))
                    })), {
                        domNode: t
                    }
                }
            };
            var a = Object.assign({}, r.default, s);
            t.default = a
        }, (e, t) => {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var n = {
                name: null,
                _className: null,
                templateId: null,
                _template: null,
                setTemplate: function(e) {
                    if (!(e instanceof HTMLElement)) throw new Error("template must be an instance of HTMLElement");
                    this._template = e
                },
                build: function(e) {
                    if (!this._template) throw new Error("this._template is not defined, set by invoking `setTemplate`.");
                    const t = this._validateDataFields(e);
                    if (t) throw t;
                    const n = document.createElement("div");
                    return n.classList.add(this._className), n.innerHTML = this._template.innerHTML, this._build(e, n)
                },
                _build: null,
                _validateDataFields: null
            };
            t.default = n
        }, (e, t, n) => {
            n.r(t)
        }, (e, t, n) => {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var r = o(n(5)),
                i = o(n(3));

            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n(8);
            const s = {
                name: "free_response",
                _className: "pft-free-response",
                templateId: "pft-template-free-response",
                _validateOne: function(e, t, n) {
                    if (!(e in n) || typeof n[e] !== t) return new Error("missing or invalid fields")
                },
                _validateDataFields: function(e) {
                    const t = {
                        questionPosition: "number",
                        questionId: "number",
                        question: "string"
                    };
                    if (!e || "object" != typeof e) return new Error("invalid data");
                    for (const n in t) {
                        const r = this._validateOne(n, t[n], e);
                        if (r) return r
                    }
                },
                _build: function(e, t) {
                    return t.querySelector(".free-response-question").innerHTML = e.question, t.querySelector("textarea").addEventListener("change", (function() {
                        Object.assign(i.default.peek()[e.questionPosition], {
                            value: t.querySelector("textarea").value
                        }), t.dispatchEvent(new CustomEvent("pft.event.survey.update", {
                            bubbles: !0,
                            detail: {
                                action: "update",
                                playerSurveyId: i.default.peek()[0].playerSurveyId
                            }
                        }))
                    })), {
                        domNode: t
                    }
                }
            };
            var a = Object.assign({}, r.default, s);
            t.default = a
        }, (e, t, n) => {
            n.r(t)
        }, (e, t, n) => {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var r = s(n(5)),
                i = s(n(3)),
                o = n(1);

            function s(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n(10);
            const a = {
                name: "likert",
                _className: "pft-likert",
                templateId: "pft-template-likert",
                _validateOne: function(e, t, n) {
                    if (!(e in n) || typeof n[e] !== t) return new Error("missing or invalid fields")
                },
                _validateDataFields: function(e) {
                    const t = {
                        questionPosition: "number",
                        questionId: "number",
                        question: "string"
                    };
                    if (!e || "object" != typeof e) return new Error("invalid data");
                    for (const n in t) {
                        const r = this._validateOne(n, t[n], e);
                        if (r) return r
                    }
                },
                _build: function(e, t) {
                    t.querySelector(".likert-question").innerHTML = e.question;
                    const n = t.querySelectorAll(".likert-input-option");
                    for (let e = 0; e < n.length; e++) n[e].id = e;
                    return t.querySelector(".likert-strongly-disagree").innerHTML = o.tra.get("pft_likert_strongly_disagree"), t.querySelector(".likert-disagree").innerHTML = o.tra.get("pft_likert_disagree"), t.querySelector(".likert-neither").innerHTML = o.tra.get("pft_likert_neither"), t.querySelector(".likert-agree").innerHTML = o.tra.get("pft_likert_agree"), t.querySelector(".likert-strongly-agree").innerHTML = o.tra.get("pft_likert_strongly_agree"), t.addEventListener("selected", (function(n) {
                        const r = {};
                        r[n.selected.id] = n.selected.innerHTML, Object.assign(i.default.peek()[e.questionPosition], {
                            value: r
                        }), t.dispatchEvent(new CustomEvent("pft.event.survey.update", {
                            bubbles: !0,
                            detail: {
                                action: "update",
                                playerSurveyId: i.default.peek()[0].playerSurveyId
                            }
                        }))
                    })), {
                        domNode: t
                    }
                }
            };
            var u = Object.assign({}, r.default, a);
            t.default = u
        }, (e, t, n) => {
            n.r(t)
        }, (e, t, n) => {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var r = o(n(5)),
                i = o(n(3));

            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n(12);
            const s = {
                name: "multiple_choice",
                _className: "pft-multiple-choice",
                templateId: "pft-template-multiple-choice",
                _validateOne: function(e, t, n) {
                    if (!(e in n) || typeof n[e] !== t) return new Error("missing or invalid fields")
                },
                _validateDataFields: function(e) {
                    const t = {
                        questionPosition: "number",
                        questionId: "number",
                        question: "string",
                        options: "object"
                    };
                    if (!e || "object" != typeof e) return new Error("invalid data");
                    for (const n in t) {
                        const r = this._validateOne(n, t[n], e);
                        if (r) return r
                    }
                },
                _buildRadioButton: function(e, t, n) {
                    const r = document.createElement("lol-uikit-radio-input-option");
                    return r.classList.add("pft-survey-input"), r.id = n, r.innerHTML = t, r
                },
                _build: function(e, t) {
                    t.querySelector(".multiple-choice-question").innerHTML = e.question;
                    const n = t.querySelector(".multiple-choice-input");
                    for (const t in e.options) n.appendChild(this._buildRadioButton(e.questionId, t, e.options[t]));
                    return t.addEventListener("selected", (function(n) {
                        const r = {};
                        r[n.selected.id] = n.selected.innerHTML, Object.assign(i.default.peek()[e.questionPosition], {
                            value: r
                        }), t.dispatchEvent(new CustomEvent("pft.event.survey.update", {
                            bubbles: !0,
                            detail: {
                                action: "update",
                                playerSurveyId: i.default.peek()[0].playerSurveyId
                            }
                        }))
                    })), {
                        domNode: t
                    }
                }
            };
            var a = Object.assign({}, r.default, s);
            t.default = a
        }, (e, t, n) => {
            n.r(t)
        }, (e, t, n) => {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.default = void 0;
            var r = n(1),
                i = s(n(5)),
                o = s(n(3));

            function s(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            n(14);
            const a = {
                name: "survey",
                _className: "pft-survey",
                templateId: "pft-template-survey",
                _validateOne: function(e, t, n) {
                    if (!(e in n) || typeof n[e] !== t) return new Error("missing or invalid fields")
                },
                _validateDataFields: function(e) {
                    const t = {
                        id: "number",
                        title: "string",
                        caption: "string",
                        type: "string",
                        data: "object"
                    };
                    if (!e || "object" != typeof e) return new Error("invalid data");
                    for (const n in t) {
                        const r = this._validateOne(n, t[n], e);
                        if (r) return r
                    }
                    if ("internal" === e.type) {
                        if (!Array.isArray(e.data.questions) || 0 === e.data.questions.length) return new Error("missing or invalid fields")
                    } else if ("string" != typeof e.data.url) return new Error("missing or invalid fields")
                },
                _createExternalSurvey: function(e, t, n) {
                    const r = e.querySelector(".survey-form");
                    r.parentNode.removeChild(r), e.classList.add("hoverable");
                    const i = function() {
                        e.removeEventListener("click", i), window.open(n), e.dispatchEvent(new CustomEvent("pft.event.survey.popout", {
                            bubbles: !0,
                            detail: {
                                action: "popout",
                                playerSurveyId: t
                            }
                        }))
                    };
                    return e.addEventListener("click", i), {
                        domNode: e
                    }
                },
                _hideContents: function(e, t) {
                    e.classList.add("hoverable"), e.querySelector(".survey-form").style.display = "none";
                    const n = function() {
                        e.removeEventListener("click", n), e.classList.remove("hoverable"), (0, r.jQuery)(e.querySelector(".survey-form")).slideDown(), e.dispatchEvent(new CustomEvent("pft.event.survey.expand", {
                            bubbles: !0,
                            detail: {
                                action: "expand",
                                playerSurveyId: t
                            }
                        }))
                    };
                    return e.addEventListener("click", n), e
                },
                _appendQuestions: function(e, t) {
                    const {
                        questions: n
                    } = t.data;
                    if (!n) return null;
                    const i = [];
                    for (let o = 0; o < n.length; o++) {
                        i.push({
                            playerSurveyId: t.id,
                            type: n[o].type,
                            questionId: n[o].data.questionId,
                            question: n[o].data.question,
                            value: null
                        });
                        const s = r.ComponentFactory.create(n[o].type, n[o].data),
                            a = r.ComponentFactory.getDOMNode(s);
                        e.querySelector(".survey-content").appendChild(a)
                    }
                    return o.default.enqueue(i), e
                },
                _getEmptyRequiredResponses: function(e) {
                    const t = {
                            checkboxes: !1,
                            multiple_choice: !0,
                            free_response: !0,
                            likert: !0
                        },
                        n = function(e) {
                            return "" === e.value || null === e.value || e.value === {}
                        },
                        r = [];
                    for (const i of e) t[i.type] && n(i) && r.push(i);
                    return r
                },
                _build: function(e, t) {
                    if (t.dataset.id = e.id, t.querySelector(".survey-title").innerHTML = e.title, t.querySelector(".survey-caption").innerHTML = e.caption, t.querySelector(".survey-submit-button").innerHTML = r.tra.get("pft_submit_button"), e.caption.length || t.querySelector(".survey-title").classList.add("vertically-centered"), "external" === e.type) return this._createExternalSurvey(t, e.id, e.data.url);
                    "collapsed" === e.display && (t = this._hideContents(t, e.id)), t = this._appendQuestions(t, e);
                    const n = () => {
                        t.removeEventListener("click", n);
                        const i = o.default.peek();
                        this._getEmptyRequiredResponses(i).length > 0 ? (t.querySelector(".survey-error").innerHTML = r.tra.get("pft_survey_error_multiple_required"), t.querySelector(".survey-error").classList.add("show"), t.querySelector(".survey-error").classList.remove("hide")) : t.dispatchEvent(new CustomEvent("pft.event.survey.submit", {
                            bubbles: !0,
                            detail: {
                                action: "submit",
                                data: i,
                                playerSurveyId: e.id
                            }
                        }))
                    };
                    return t.querySelector(".survey-submit-button").addEventListener("click", n), {
                        domNode: t
                    }
                }
            };
            var u = Object.assign({}, i.default, a);
            t.default = u
        }, (e, t, n) => {
            n.r(t)
        }],
        t = {};

    function n(r) {
        var i = t[r];
        if (void 0 !== i) return i.exports;
        var o = t[r] = {
            exports: {}
        };
        return e[r](o, o.exports, n), o.exports
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
        const r = "rcp-fe-lol-pft",
            i = document.currentScript.ownerDocument;

        function o(e) {
            const n = i.getElementById(e.templateId);
            e.setTemplate(n), t.default.ComponentFactory.setFactory(e.name, (function(t) {
                return e.build(t)
            }))
        }
        const s = window.getPluginAnnounceEventName(r);
        i.addEventListener(s, (function(e) {
            (0, e.registrationHandler)((function(e) {
                return t.default.init(e, {
                    ComponentFactory: e => e.get("rcp-fe-common-libs").getComponentFactory(1),
                    dataBinding: e => e.get("rcp-fe-common-libs").getDataBinding("rcp-fe-lol-pft"),
                    jQuery: e => e.get("rcp-fe-common-libs").getJquery(2),
                    LayerManager: e => e.get("rcp-fe-lol-uikit").getLayerManager(),
                    logger: e => e.get("rcp-fe-common-libs").logging.create(r),
                    tra: e => e.get("rcp-fe-lol-l10n").tra().overlay("/fe/lol-l10n/trans.json").overlay("/fe/lol-pft/trans.json")
                }).then((() => t.default.tra.ready())).then((() => {
                    const {
                        dataBinding: r,
                        LayerManager: i
                    } = t.default, s = new(0, n(2).default)(i), a = r("/lol-pft", e.getSocket()), u = function(e) {
                        a.post("/v2/events", e.detail)
                    };
                    document.addEventListener("pft.event.survey.submit", u), document.addEventListener("pft.event.survey.expand", u), document.addEventListener("pft.event.survey.popout", u), document.addEventListener("pft.event.survey.update", u), document.addEventListener("pft.event.survey.close", u);
                    const l = n(4).default,
                        d = n(7).default,
                        c = n(9).default,
                        f = n(11).default,
                        p = n(13).default;
                    return o(l), o(d), o(c), o(f), o(p), {
                        addSurvey: e => {
                            e && s.addSurvey(e)
                        }
                    }
                }))
            }))
        }), {
            once: !0
        })
    })()
})();