import Form from "./core";

const [ $, __ ] = [ window.jQuery, window.Method ];


const defaultModeData = {
    "cname" : "fiteraContactData",
    "data"  : null,
    "status": "standalone" // ["opt-in", "upfront", "standalone", "upsell", "upsell-cvv"]
};

const modes = {
    // hardcoded form / "needs name/email"
    "opt-in": function () {
        this.setRequired(Object.keys(this.validation.fields), false)
            .setRequired(["billingFirstName", "email"], true); // require no fields EXCEPT opt-in fields
        __.delCookie(this.mode.cname); // delete "mode" cookie (previous order info)
    },
    // hardcoded form / "needs everything"
    "upfront": function () {
        this.setRequired(this.proxies.map(v => v.name), false); // require no proxies - all other validation requirements normal
        this.add("tranType", "Sale"); // only required in new_order modes (upfront, standalone)
        __.delCookie(this.mode.cname); // delete "mode" cookie (previous order info)
    },
    // no form / "ready, needs nothing"
    "upsell": function () {
        this.setRequired(Object.keys(this.validation.fields), false); // require no fields
    },
    // template CVV box / "needs cvv"
    "upsell-cvv": function () {
        this.setRequired(Object.keys(this.validation.fields), false)
            .setRequired("CVV", true) // require no fields EXCEPT CVV
            .createCVVBox().inject(); // then inject proxy CVV box
    },
    // template form / "needs everything"
    "standalone": function () {
        this.setRequired(this.proxies.map(v => v.name), false); // require no proxies - all other validation requirements normal
        this.add("tranType", "Sale"); // only required in new_order modes (upfront, standalone)
        $(this.config.externalSameship).attr("hidden", true); // external sameship is hidden, internal one will be used if applicable
        this.inject(); // inject form template
    }
};

Form.prototype.defineMode = function () {
    this.defineInternalProperty("mode", defaultModeData);
};

Form.prototype.getMode = function () {
    return this.mode.status;
};

Form.prototype.setMode = function (mode) {
    this.mode.status = mode;
    modes[mode].call(this);
    return this;
};

/*
Debug modes:
cs_standalone: page will behave like a an upfront or standalone AND will hide all divs except those w/ ".cs-standalone-show" class
new_order    : page will behave like a an upfront or standalone
card_on_file : page will behave like an upsell using a fake previous order ID
*/
Form.prototype.getDebugMode = function () {
    this.debugMode = (function () {
        const params = __(window.location.search || "").parse().get();
        if (params.hasOwnProperty("customer_service")) { // special case (shorthand for CS)
            return "cs_standalone";
        }
        return params.ljdebug || null;
    }());
    if (this.debugMode === "new_order" || this.debugMode === "cs_standalone") {
        __.delCookie(this.dups.cname); // don't catch duplicates on this setting
    }
};

Form.prototype.assessMode = function () {

    const thisForm = this;

    this.getDebugMode();

    if (this.hijacked) {
        if (this.config.preset === "opt-in" || this.exists("creditCardNumber") === false) {
            this.setMode("opt-in");
        } else {
            this.setMode("upfront");
        }
        return true;
    }

    this.mode.data = this.getJSONCookie(this.mode.cname);

    if (this.debugMode === "cs_standalone") {
        this.mode.data = null;
        $("body").children().hide();
        $(".cs-standalone-show").clone().appendTo("body").show();
        $(".cs-standalone-hide").hide();
    } else if (this.debugMode === "new_order") {
        this.mode.data = null;
    } else if (this.debugMode === "card_on_file") {
        this.mode.data = {
            "previousOrderId": 123456,
            "ccLast4"        : 1234,
            "formData"       : __(thisForm.testValues).remove("creditCardNumber", "CVV").get()
        };
    }

    const cdata           = this.mode.data;
    const previousOrderId = cdata ? cdata.previousOrderId : null;
    const requireCVV      = this.config.requireCVV;

    if (previousOrderId && !requireCVV) {
        this.setMode("upsell");
    } else if (previousOrderId && requireCVV) {
        this.setMode("upsell-cvv");
    } else {
        this.setMode("standalone");
    }

    return true;
};

Form.prototype.saveOrder = function () {
    const thisForm = this;

    const cname = this.mode.cname;
    const cdata = {
        "previousOrderId": thisForm.LimeLightResponseData.order_id,
        "ccLast4"        : thisForm.get("creditCardNumber").value.slice(-4),
        "formData"       : __(thisForm.LimeLightFormData) // data is already stripped of proxies and one-off fields
            .remove("creditCardNumber", "CVV").get() // also sanitize CC number and CVV
    };
    const cdate = 7; // num days until expires

    __.setCookie(cname, JSON.stringify(cdata), cdate);
};
