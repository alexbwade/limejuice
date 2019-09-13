import countries        from "./countries";
import gdprCountryNames from "./gdpr";

const [ $, __ ] = [ window.jQuery, window.Method ];


const forms = []; // this will be a property on the Form prototype that contains all initialized forms

function Form (settings={}) {

    let _raw; // raw DOM structure
    let _init; // ordered list of initialization actions (each action returns a bool)
    let _submit; // ordered list of submission actions (each action returns a bool)
    let _process; // ordered list of processing actions (each action returns a bool)
    let _requireCVV; // boolean, ONLY APPLIES to 'upsell' mode (changes between 'upsell' & 'upsell-cvv'.) CVV always required on new_order modes
    let _captcha; // boolean, determines whether to load Google reCAPTCHA and require on submit
    let _defaultCountry; // string - single country name
    let _sellTo; // comma-separated string of sellable countries
    let _shipTo; // comma-separated string of shippable countries, defaults to "null" for digital products.
    let _proxies; // object mapping proxy fields to "entity" (or constituent) fields for visual validation/autocopying of values
    let _externalSameship; // jQuery selector identifying the whole "sameship" box including billingSameAsShipping and shippingDropdown
    let _externalErrors; // jQuery selector identifying additional external validation error output boxes
    let _actionButton; // jQuery selector identifying primary "action" button which either (a) opens form/CVV box, or (b) submits form, depending on mode
    let _submitButton; // jQuery selector identifying secondary "submit" button which submits form IF action button opens form
    let _order; // object containing LimeLight order data
    let _nextPage; // string containing URL of "next page" if customer purchased
    let _kountSessionId; // string containing Kount (anti-fraud) session ID
    let _campaignId; // number containing Everflow campaign ID

    const that = this;

    Object.defineProperties(this, {
        "config": {
            "writable": false,
            "value": {
                get init () {
                    return _init;
                },
                set init (v) {
                    _init = enforceType(v, "array");
                },
                get submit () {
                    return _submit;
                },
                set submit (v) {
                    _submit = enforceType(v, "array");
                },
                get process () {
                    return _process;
                },
                set process (v) {
                    _process = enforceType(v, "array");
                },
                get requireCVV () {
                    return _requireCVV;
                },
                set requireCVV (v) {
                    _requireCVV = enforceType(v, "boolean");
                },
                get captcha () {
                    return _captcha;
                },
                set captcha (v) {
                    _captcha = enforceType(v, "boolean");
                },
                get defaultCountry () {
                    return _defaultCountry;
                },
                set defaultCountry (v) {
                    enforceType(v, "string,null");
                    _defaultCountry = (typeof v === "string") ? validateCountry(v) : v;
                },
                get sellTo () {
                    return _sellTo;
                },
                set sellTo (v) {
                    enforceType(v, "array,null");
                    _sellTo = (v === null || (Array.isArray(v) && v.length === 0)) ? null : v; // empty arrays are set to 'null'
                    that.sellToCountries = _sellTo ? parseCountryList(_sellTo, "sellTo") : [];
                },
                get shipTo () {
                    return _shipTo;
                },
                set shipTo (v) {
                    enforceType(v, "array,null");
                    _shipTo = (v === null || (Array.isArray(v) && v.length === 0)) ? null : v; // empty arrays are set to 'null'
                    that.productType     = _shipTo ? "physical" : "digital";
                    that.shipToCountries = _shipTo ? parseCountryList(_shipTo, "shipTo") : [];
                },
                get proxies () {
                    return _proxies;
                },
                set proxies (v) {
                    if (
                        checkType(v, "object,null", true) &&
                        (__.typeof(v) === "object" && Object.values(v).every(y => checkType(y, "array", true))) || __.typeof(v) === "null"
                    ) {
                        _proxies = v;
                    }
                },
                get externalSameship () {
                    return _externalSameship;
                },
                set externalSameship (v) {
                    if (checkType(v, "string,null") && jQuerySelector(v, "externalSameship")) {
                        _externalSameship = v;
                    }
                },
                get externalErrors () {
                    return _externalErrors;
                },
                set externalErrors (v) {
                    if (checkType(v, "string,null") && jQuerySelector(v, "externalErrors")) {
                        if (!v) { // null, false, undefined
                            _externalErrors = v;
                        } else { // simply add the selector to existing selectors
                            _externalErrors = _externalErrors ? (_externalErrors + ", " + v) : v;
                        }
                    }
                },
                get actionButton () {
                    return _actionButton;
                },
                set actionButton (v) {
                    _actionButton = enforceType(v, "string,null");
                },
                get submitButton () {
                    return _submitButton;
                },
                set submitButton (v) {
                    _submitButton = enforceType(v, "string,null");
                },
                get order () {
                    return _order;
                },
                set order (v) {
                    // _order = __.deepFreeze(enforceType(v, "object"));
                    _order = enforceType(v, "object");
                },
                get nextPage () {
                    return _nextPage;
                },
                set nextPage (v) {
                    _nextPage = enforceType(v, "string"); // add 'is relative-url' check?
                },
                get kountSessionId () {
                    return _kountSessionId;
                },
                set kountSessionId (v) {
                    _kountSessionId = enforceType(v, "string");
                },
                get campaignId () {
                    return _campaignId;
                },
                set campaignId (v) {
                    _campaignId = enforceType(v, "number");
                }
            }
        },

        "raw": {
            get () {
                return _raw;
            },
            set (val) {
                const isForm       = val.nodeName === "FORM";
                const containsForm = $(val).find("form").length === 1;

                if (isForm || containsForm) {
                    _raw = val;
                } else {
                    throw new TypeError("ID or template must contain exactly one valid HTML Form Element.");
                }
            }
        }
    });


    // this.id = (Math.random() + 1).toString(36).substr(2, 5);
    this.id = forms.length + 1;

    // fallbacks
    this.config.init                    = settings.init                    || ["attachForm", "assess", "modalize", "buttons", "proxies", "captcha", "countrySelect", "autocomplete", "autofill", "kount", "misc"];
    this.config.submit                  = settings.submit                  || ["autoformat", "validate", "checkForDups", "captcha", "beforeSubmit", "submitForm"/* ,"testSubmit" */];
    this.config.process                 = settings.process                 || ["preventDups", "saveOrder", "alertDone", "tracking", "redirect"];
    this.config.requireCVV              = settings.requireCVV              || false;
    this.config.captcha                 = settings.captcha                 || false; // this will be auto-assessed during initialization
    this.config.defaultCountry          = settings.defaultCountry          || null;
    this.config.sellTo                  = settings.sellTo                  || ["all", "!GDPR"];
    this.config.shipTo                  = settings.shipTo                  || null;
    this.config.proxies                 = settings.proxies                 || null;
    this.config.externalSameship        = settings.externalSameship        || null;
    this.config.externalErrors          = settings.externalErrors          || null;
    this.config.actionButton            = settings.actionButton            || null;
    this.config.submitButton            = settings.submitButton            || null;
    this.config.order                   = settings.order                   || {};
    this.config.nextPage                = settings.nextPage                || "autoregister.php";
    this.config.kountSessionId          = settings.kountSessionId          || "";
    this.config.campaignId              = settings.campaignId              || 1;
    this.config.formTemplatesDirPath    = settings.formTemplatesDirPath    || "/assets/libs/tequila/templates/"; // no type enforcement or conversion
    this.config.recaptchaScriptFilePath = settings.recaptchaScriptFilePath || "/assets/components/recaptcha.php"; // no type enforcement or conversion
    this.config.limelightScriptFilePath = settings.limelightScriptFilePath || "/assets/libs/tequila/scripts/limelight-api-call.php"; // no type enforcement or conversion
    this.config.limelightAccountName    = settings.limelightAccountName    || "gofitera"; // no type enforcement or conversion

    // defaults
    this.assignments = []; // events.js (used for binding events to actions)
    this.modal = null; // modalize.js, refers to the form's modal wrapper
    this.debugMode = null; // mode.js
    this._checkpoints = {
        "default": undefined
    };
    this.autofill = {
        "intervals": []
    };

    // other default internal (private/unshared) properties
    this.defineMode();
    this.defineProxyProperties();
    this.defineValidationProperties();
    this.defineInitActions();
    this.defineSubmitActions();
    this.defineProcessActions();


    forms.push(this);
}

Form.forms = forms;

Form.prototype.defineInternalProperty = function (prop, value) {
    if (!this.hasOwnProperty(prop)) {
        this[prop] = value;
    }
};

Form.prototype.preset = function (presetName) {
    if (!this.presets.hasOwnProperty(presetName)) {
        throw new Error("Invalid preset name. \nValid options: " + Object.keys(this.presets).map(v => `'${v}'`));
    }
    this.config.preset = presetName;
    this.settings(this.presets[presetName]);
    return this;
};

Form.prototype.settings = function (data={}) {
    if (typeof data === "string" && arguments.length === 2) {
        data = {[arguments[0]]: arguments[1]};
    }
    const config = this.config;
    Object.keys(data).forEach(key => {
        const value = data[key];
        config[key] = value;
    });
    return this;
};
Form.prototype.override = Form.prototype.settings;

Form.prototype.connect = function (btn) {
    this.settings("actionButton", btn);
    return this;
};

Form.prototype.order = function (orderInfo) {
    this.settings("order", orderInfo);
    return this;
};

Form.prototype.kount = function (kountSessionId, campaignId) {
    this.settings({
        "kountSessionId": kountSessionId,
        "campaignId"    : campaignId
    });
    return this;
};

Form.prototype.setNextPage = function (page) {
    this.settings("nextPage", page);
    return this;
};


export default Form;


function enforceType (value, type) {
    try {
        __.enforce(value, type);
        return value;
    } catch (e) {
        throw new TypeError(e);
    }
}

function checkType (value, type) {
    try {
        __.enforce(value, type);
        return true;
    } catch (e) {
        throw new TypeError(e);
    }
}

function jQuerySelector (value, configName) {
    if (value === null) {
        return true;
    }
    const $selector = $(value);
    if ($selector.length) {
        return true;
    } else {
        __.log.error(`${value} is not a valid jQuery selector. Check your ${configName} configuration.`);
    }
}

const countryCodes = Object.keys(countries);
const countryNames = countryCodes.map(countryCode => countries[countryCode].name);
const shortcuts = {
    "all" : countryNames,
    "gdpr": gdprCountryNames
};

function validateCountry (str) {
    if (countryCodes.includes(str)) {
        return str;
    } else if (countryNames.includes(str)) {
        return __(countries).seek(str).get()[0];
    } else {
        throw new TypeError("Invalid defaultCountry specified.");
    }
}

function parseCountryList (arr, type) {

    Object.keys(shortcuts).forEach(shortcut => {
        const regex = new RegExp(`^!?${shortcut}$`, "i");
        const matchIndex = arr.findIndex(v => regex.test(v));
        if (matchIndex > -1) {
            const match = arr.splice(matchIndex, 1)[0]; // remove occurrence of shortcut
            arr = match.startsWith("!")
                ? arr.concat(shortcuts[shortcut].map(v => "!" + v))
                : arr.concat(shortcuts[shortcut]);
        }
    });

    const exclude = arr
        .filter(v => v.startsWith("!"))
        .map(v => v.substr(1));

    const include = arr
        .filter(v => !exclude.includes(v) && !exclude.includes(v.substr(1)));

    const valid = isValid(include, exclude);
    if (!valid) {
        __.log.error(`Please check your '${type}' configuration.`);
        return false;
    }

    // translate countryNames to countryCodes
    const shipToCountryCodes = include.map(v => __(countries).seek(v).get()[0]);

    return shipToCountryCodes;

    function isValid (...arrays) {
        return arrays.every(arr => {
            return arr.every(v => {
                const valid = countryNames.includes(v);
                return valid || __.log.error(`Invalid country specified in '${type}' config: ` + v);
            });
        });
    }
}

Form.prototype.presets = {
    "opt-in": {
        "sellTo" : null,
        "init": ["attachForm", "assess", "modalize", "buttons"/*, "proxies", "countrySelect", "autocomplete", "autofill"*/, "misc"],
        "submit": ["autoformat", "validate" /*, "checkForDups"*/, "beforeSubmit", "submitForm" /*,"testSubmit" */],
        "process": [/* "preventDups", "saveOrder",*/ "alertDone"]
    },
    "digital": {
        "defaultCountry": "United States"
    },
    "physical-US": {
        "shipTo"        : ["United States"],
        "defaultCountry": "United States"
    },
    "physical-NA": {
        "shipTo"        : ["United States", "Canada"],
        "defaultCountry": "United States",
    },
    "physical-INTL": {
        "shipTo"        : ["all", "!GDPR"],
        "defaultCountry": "United States",
    },
    "external-sameship": {
        "externalSameship": ".externalSameship",
        "externalErrors"  : ".externalSameshipErrors",
        "proxies"         : {
            "sameshipCheckbox": ["proxy-sameshipCheckbox"],
            "shippingAddress1": ["proxy-shippingAddress1"],
            "shippingAddress2": ["proxy-shippingAddress2"],
            "shippingCity"    : ["proxy-shippingCity"],
            "shippingState"   : ["proxy-shippingState"],
            "shippingZip"     : ["proxy-shippingZip"],
            "shippingCountry" : ["proxy-shippingCountry"]
        }
    },
    "test-mode": {
        "submit": ["autoformat", "validate", "checkForDups", "beforeSubmit"/*, "submitForm"*/ ,"testSubmit"]
    },
    "test-physical-intl": {
        "shipTo"          : ["United States", "Bosnia and Herzegowina", "Bermuda"],
        "defaultCountry"  : "United States",
        "externalSameship": ".externalSameship",
        "externalErrors"  : ".externalSameshipErrors",
        "proxies"         : {
            "sameshipCheckbox": ["proxy-sameshipCheckbox"],
            "shippingAddress1": ["proxy-shippingAddress1"],
            "shippingAddress2": ["proxy-shippingAddress2"],
            "shippingCity"    : ["proxy-shippingCity"],
            "shippingState"   : ["proxy-shippingState"],
            "shippingZip"     : ["proxy-shippingZip"],
            "shippingCountry" : ["proxy-shippingCountry"]
        }
    }
};
