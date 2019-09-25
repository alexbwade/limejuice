/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _countries = __webpack_require__(1);

var _countries2 = _interopRequireDefault(_countries);

var _gdpr = __webpack_require__(14);

var _gdpr2 = _interopRequireDefault(_gdpr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


var forms = []; // this will be a property on the Form prototype that contains all initialized forms

function Form() {
    var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    var _raw = void 0; // raw DOM structure
    var _init = void 0; // ordered list of initialization actions (each action returns a bool)
    var _submit = void 0; // ordered list of submission actions (each action returns a bool)
    var _process = void 0; // ordered list of processing actions (each action returns a bool)
    var _requireCVV = void 0; // boolean, ONLY APPLIES to 'upsell' mode (changes between 'upsell' & 'upsell-cvv'.) CVV always required on new_order modes
    var _captcha = void 0; // boolean, determines whether to load Google reCAPTCHA and require on submit
    var _defaultCountry = void 0; // string - single country name
    var _sellTo = void 0; // comma-separated string of sellable countries
    var _shipTo = void 0; // comma-separated string of shippable countries, defaults to "null" for digital products.
    var _proxies = void 0; // object mapping proxy fields to "entity" (or constituent) fields for visual validation/autocopying of values
    var _externalSameship = void 0; // jQuery selector identifying the whole "sameship" box including billingSameAsShipping and shippingDropdown
    var _externalErrors = void 0; // jQuery selector identifying additional external validation error output boxes
    var _actionButton = void 0; // jQuery selector identifying primary "action" button which either (a) opens form/CVV box, or (b) submits form, depending on mode
    var _submitButton = void 0; // jQuery selector identifying secondary "submit" button which submits form IF action button opens form
    var _order = void 0; // object containing LimeLight order data
    var _nextPage = void 0; // string containing URL of "next page" if customer purchased
    var _kountSessionId = void 0; // string containing Kount (anti-fraud) session ID
    var _campaignId = void 0; // number containing Everflow campaign ID

    var that = this;

    Object.defineProperties(this, {
        "config": {
            "writable": false,
            "value": {
                get init() {
                    return _init;
                },
                set init(v) {
                    _init = enforceType(v, "array");
                },
                get submit() {
                    return _submit;
                },
                set submit(v) {
                    _submit = enforceType(v, "array");
                },
                get process() {
                    return _process;
                },
                set process(v) {
                    _process = enforceType(v, "array");
                },
                get requireCVV() {
                    return _requireCVV;
                },
                set requireCVV(v) {
                    _requireCVV = enforceType(v, "boolean");
                },
                get captcha() {
                    return _captcha;
                },
                set captcha(v) {
                    _captcha = enforceType(v, "boolean");
                },
                get defaultCountry() {
                    return _defaultCountry;
                },
                set defaultCountry(v) {
                    enforceType(v, "string,null");
                    _defaultCountry = typeof v === "string" ? validateCountry(v) : v;
                },
                get sellTo() {
                    return _sellTo;
                },
                set sellTo(v) {
                    enforceType(v, "array,null");
                    _sellTo = v === null || Array.isArray(v) && v.length === 0 ? null : v; // empty arrays are set to 'null'
                    that.sellToCountries = _sellTo ? parseCountryList(_sellTo, "sellTo") : [];
                },
                get shipTo() {
                    return _shipTo;
                },
                set shipTo(v) {
                    enforceType(v, "array,null");
                    _shipTo = v === null || Array.isArray(v) && v.length === 0 ? null : v; // empty arrays are set to 'null'
                    that.productType = _shipTo ? "physical" : "digital";
                    that.shipToCountries = _shipTo ? parseCountryList(_shipTo, "shipTo") : [];
                },
                get proxies() {
                    return _proxies;
                },
                set proxies(v) {
                    if (checkType(v, "object,null", true) && __.typeof(v) === "object" && Object.values(v).every(function (y) {
                        return checkType(y, "array", true);
                    }) || __.typeof(v) === "null") {
                        _proxies = v;
                    }
                },
                get externalSameship() {
                    return _externalSameship;
                },
                set externalSameship(v) {
                    if (checkType(v, "string,null") && jQuerySelector(v, "externalSameship")) {
                        _externalSameship = v;
                    }
                },
                get externalErrors() {
                    return _externalErrors;
                },
                set externalErrors(v) {
                    if (checkType(v, "string,null") && jQuerySelector(v, "externalErrors")) {
                        if (!v) {
                            // null, false, undefined
                            _externalErrors = v;
                        } else {
                            // simply add the selector to existing selectors
                            _externalErrors = _externalErrors ? _externalErrors + ", " + v : v;
                        }
                    }
                },
                get actionButton() {
                    return _actionButton;
                },
                set actionButton(v) {
                    _actionButton = enforceType(v, "string,null");
                },
                get submitButton() {
                    return _submitButton;
                },
                set submitButton(v) {
                    _submitButton = enforceType(v, "string,null");
                },
                get order() {
                    return _order;
                },
                set order(v) {
                    // _order = __.deepFreeze(enforceType(v, "object"));
                    _order = enforceType(v, "object");
                },
                get nextPage() {
                    return _nextPage;
                },
                set nextPage(v) {
                    _nextPage = enforceType(v, "string"); // add 'is relative-url' check?
                },
                get kountSessionId() {
                    return _kountSessionId;
                },
                set kountSessionId(v) {
                    _kountSessionId = enforceType(v, "string");
                },
                get campaignId() {
                    return _campaignId;
                },
                set campaignId(v) {
                    _campaignId = enforceType(v, "number");
                }
            }
        },

        "raw": {
            get: function get() {
                return _raw;
            },
            set: function set(val) {
                var isForm = val.nodeName === "FORM";
                var containsForm = $(val).find("form").length === 1;

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
    this.config.init = settings.init || ["attachForm", "assess", "modalize", "buttons", "proxies", "captcha", "countrySelect", "autocomplete", "autofill", "kount", "misc"];
    this.config.submit = settings.submit || ["autoformat", "validate", "checkForDups", "captcha", "beforeSubmit", "submitForm" /* ,"testSubmit" */];
    this.config.process = settings.process || ["preventDups", "saveOrder", "alertDone", "tracking", "redirect"];
    this.config.requireCVV = settings.requireCVV || false;
    this.config.captcha = settings.captcha || false; // this will be auto-assessed during initialization
    this.config.defaultCountry = settings.defaultCountry || null;
    this.config.sellTo = settings.sellTo || ["all", "!GDPR"];
    this.config.shipTo = settings.shipTo || null;
    this.config.proxies = settings.proxies || null;
    this.config.externalSameship = settings.externalSameship || null;
    this.config.externalErrors = settings.externalErrors || null;
    this.config.actionButton = settings.actionButton || null;
    this.config.submitButton = settings.submitButton || null;
    this.config.order = settings.order || {};
    this.config.nextPage = settings.nextPage || "autoregister.php";
    this.config.kountSessionId = settings.kountSessionId || "";
    this.config.campaignId = settings.campaignId || 1;
    this.config.formTemplatesDirPath = settings.formTemplatesDirPath || "/assets/libs/tequila/templates/"; // no type enforcement or conversion
    this.config.recaptchaScriptFilePath = settings.recaptchaScriptFilePath || "/assets/components/recaptcha.php"; // no type enforcement or conversion
    this.config.limelightScriptFilePath = settings.limelightScriptFilePath || "/assets/libs/tequila/scripts/limelight-api-call.php"; // no type enforcement or conversion
    this.config.limelightAccountName = settings.limelightAccountName || "gofitera"; // no type enforcement or conversion

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
        throw new Error("Invalid preset name. \nValid options: " + Object.keys(this.presets).map(function (v) {
            return "'" + v + "'";
        }));
    }
    this.config.preset = presetName;
    this.settings(this.presets[presetName]);
    return this;
};

Form.prototype.settings = function () {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (typeof data === "string" && arguments.length === 2) {
        data = _defineProperty({}, arguments[0], arguments[1]);
    }
    var config = this.config;
    Object.keys(data).forEach(function (key) {
        var value = data[key];
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
        "campaignId": campaignId
    });
    return this;
};

Form.prototype.setNextPage = function (page) {
    this.settings("nextPage", page);
    return this;
};

exports.default = Form;


function enforceType(value, type) {
    try {
        __.enforce(value, type);
        return value;
    } catch (e) {
        throw new TypeError(e);
    }
}

function checkType(value, type) {
    try {
        __.enforce(value, type);
        return true;
    } catch (e) {
        throw new TypeError(e);
    }
}

function jQuerySelector(value, configName) {
    if (value === null) {
        return true;
    }
    var $selector = $(value);
    if ($selector.length) {
        return true;
    } else {
        __.log.error(value + " is not a valid jQuery selector. Check your " + configName + " configuration.");
    }
}

var countryCodes = Object.keys(_countries2.default);
var countryNames = countryCodes.map(function (countryCode) {
    return _countries2.default[countryCode].name;
});
var shortcuts = {
    "all": countryNames,
    "gdpr": _gdpr2.default
};

function validateCountry(str) {
    if (countryCodes.includes(str)) {
        return str;
    } else if (countryNames.includes(str)) {
        return __(_countries2.default).seek(str).get()[0];
    } else {
        throw new TypeError("Invalid defaultCountry specified.");
    }
}

function parseCountryList(arr, type) {

    Object.keys(shortcuts).forEach(function (shortcut) {
        var regex = new RegExp("^!?" + shortcut + "$", "i");
        var matchIndex = arr.findIndex(function (v) {
            return regex.test(v);
        });
        if (matchIndex > -1) {
            var match = arr.splice(matchIndex, 1)[0]; // remove occurrence of shortcut
            arr = match.startsWith("!") ? arr.concat(shortcuts[shortcut].map(function (v) {
                return "!" + v;
            })) : arr.concat(shortcuts[shortcut]);
        }
    });

    var exclude = arr.filter(function (v) {
        return v.startsWith("!");
    }).map(function (v) {
        return v.substr(1);
    });

    var include = arr.filter(function (v) {
        return !exclude.includes(v) && !exclude.includes(v.substr(1));
    });

    var valid = isValid(include, exclude);
    if (!valid) {
        __.log.error("Please check your '" + type + "' configuration.");
        return false;
    }

    // translate countryNames to countryCodes
    var shipToCountryCodes = include.map(function (v) {
        return __(_countries2.default).seek(v).get()[0];
    });

    return shipToCountryCodes;

    function isValid() {
        for (var _len = arguments.length, arrays = Array(_len), _key = 0; _key < _len; _key++) {
            arrays[_key] = arguments[_key];
        }

        return arrays.every(function (arr) {
            return arr.every(function (v) {
                var valid = countryNames.includes(v);
                return valid || __.log.error("Invalid country specified in '" + type + "' config: " + v);
            });
        });
    }
}

Form.prototype.presets = {
    "opt-in": {
        "sellTo": null,
        "init": ["attachForm", "assess", "modalize", "buttons" /*, "proxies", "countrySelect", "autocomplete", "autofill"*/, "misc"],
        "submit": ["autoformat", "validate" /*, "checkForDups"*/, "beforeSubmit", "submitForm" /*,"testSubmit" */],
        "process": [/* "preventDups", "saveOrder",*/"alertDone"]
    },
    "digital": {
        "defaultCountry": "United States"
    },
    "physical-US": {
        "shipTo": ["United States"],
        "defaultCountry": "United States"
    },
    "physical-NA": {
        "shipTo": ["United States", "Canada"],
        "defaultCountry": "United States"
    },
    "physical-INTL": {
        "shipTo": ["all", "!GDPR"],
        "defaultCountry": "United States"
    },
    "external-sameship": {
        "externalSameship": ".externalSameship",
        "externalErrors": ".externalSameshipErrors",
        "proxies": {
            "sameshipCheckbox": ["proxy-sameshipCheckbox"],
            "shippingAddress1": ["proxy-shippingAddress1"],
            "shippingAddress2": ["proxy-shippingAddress2"],
            "shippingCity": ["proxy-shippingCity"],
            "shippingState": ["proxy-shippingState"],
            "shippingZip": ["proxy-shippingZip"],
            "shippingCountry": ["proxy-shippingCountry"]
        }
    },
    "test-mode": {
        "submit": ["autoformat", "validate", "checkForDups", "beforeSubmit" /*, "submitForm"*/, "testSubmit"]
    },
    "test-physical-intl": {
        "shipTo": ["United States", "Bosnia and Herzegowina", "Bermuda"],
        "defaultCountry": "United States",
        "externalSameship": ".externalSameship",
        "externalErrors": ".externalSameshipErrors",
        "proxies": {
            "sameshipCheckbox": ["proxy-sameshipCheckbox"],
            "shippingAddress1": ["proxy-shippingAddress1"],
            "shippingAddress2": ["proxy-shippingAddress2"],
            "shippingCity": ["proxy-shippingCity"],
            "shippingState": ["proxy-shippingState"],
            "shippingZip": ["proxy-shippingZip"],
            "shippingCountry": ["proxy-shippingCountry"]
        }
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    "AX": {
        "code": "AX",
        "name": "Aaland Islands",
        "zone": 0,
        "states": {}
    },

    "AF": {
        "code": "AF",
        "name": "Afghanistan",
        "zone": 0,
        "states": {
            "Badakhshan": "AF-BDS",
            "Badghis": "AF-BDG",
            "Baghlan": "AF-BGL",
            "Balkh": "AF-BAL",
            "Bamian": "AF-BAM",
            "Daykondi": "AF-DAY",
            "Farah": "AF-FRA",
            "Faryab": "AF-FYB",
            "Ghazni": "AF-GHA",
            "Ghowr": "AF-GHO",
            "Helmand": "AF-HEL",
            "Herat": "AF-HER",
            "Jowzjan": "AF-JOW",
            "Kabul": "AF-KAB",
            "Kandahar": "AF-KAN",
            "Kapisa": "AF-KAP",
            "Khowst": "AF-KHO",
            "Konar": "AF-KNR",
            "Kondoz": "AF-KDZ",
            "Laghman": "AF-LAG",
            "Lowgar": "AF-LOW",
            "Nangrahar": "AF-NAN",
            "Nimruz": "AF-NIM",
            "Nurestan": "AF-NUR",
            "Oruzgan": "AF-ORU",
            "Paktia": "AF-PIA",
            "Paktika": "AF-PKA",
            "Panjshir": "AF-PAN",
            "Parwan": "AF-PAR",
            "Samangan": "AF-SAM",
            "Sar-e Pol": "AF-SAR",
            "Takhar": "AF-TAK",
            "Wardak": "AF-WAR",
            "Zabol": "AF-ZAB"
        }
    },

    "AL": {
        "code": "AL",
        "name": "Albania",
        "zone": 0,
        "states": {
            "Berat": "AL-BR",
            "Bulqiz�": "AL-BU",
            "Delvin�": "AL-DL",
            "Devoll": "AL-DV",
            "Dib�r": "AL-DI",
            "Durr�s": "AL-DR",
            "Elbasan": "AL-EL",
            "Fier": "AL-FR",
            "Gjirokast�r": "AL-GJ",
            "Gramsh": "AL-GR",
            "Has": "AL-HA",
            "Kavaj�": "AL-KA",
            "Kolonj�": "AL-ER",
            "Kor��": "AL-KO",
            "Kruj�": "AL-KR",
            "Ku�ov�": "AL-KC",
            "Kuk�s": "AL-KU",
            "Kurbin": "AL-KB",
            "Lezh�": "AL-LE",
            "Librazhd": "AL-LB",
            "Lushnj�": "AL-LU",
            "Mal�si e Madhe": "AL-MM",
            "Mallakast�r": "AL-MK",
            "Mat": "AL-MT",
            "Mirdit�": "AL-MR",
            "Peqin": "AL-PQ",
            "P�rmet": "AL-PR",
            "Pogradec": "AL-PG",
            "Puk�": "AL-PU",
            "Sarand�": "AL-SR",
            "Shkod�r": "AL-SH",
            "Skrapar": "AL-SK",
            "Tepelen�": "AL-TE",
            "Tiran�": "AL-TR",
            "Tropoj�": "AL-TP",
            "Vlor�": "AL-VL"
        }
    },

    "DZ": {
        "code": "DZ",
        "name": "Algeria",
        "zone": 0,
        "states": {
            "Adrar": "DZ-01",
            "A�n Defla": "DZ-44",
            "A�n T�mouchent": "DZ-46",
            "Alger": "DZ-16",
            "Annaba": "DZ-23",
            "Batna": "DZ-05",
            "B�char": "DZ-08",
            "B�ja�a": "DZ-06",
            "Biskra": "DZ-07",
            "Blida": "DZ-09",
            "Bordj Bou Arr�ridj": "DZ-34",
            "Bouira": "DZ-10",
            "Boumerd�s": "DZ-35",
            "Chlef": "DZ-02",
            "Constantine": "DZ-25",
            "Djelfa": "DZ-17",
            "El Bayadh": "DZ-32",
            "El Oued": "DZ-39",
            "El Tarf": "DZ-36",
            "Gharda�a": "DZ-47",
            "Guelma": "DZ-24",
            "Illizi": "DZ-33",
            "Jijel": "DZ-18",
            "Khenchela": "DZ-40",
            "Laghouat": "DZ-03",
            "Mascara": "DZ-29",
            "M�d�a": "DZ-26",
            "Mila": "DZ-43",
            "Mostaganem": "DZ-27",
            "Msila": "DZ-28",
            "Naama": "DZ-45",
            "Oran": "DZ-31",
            "Ouargla": "DZ-30",
            "Oum el Bouaghi": "DZ-04",
            "Relizane": "DZ-48",
            "Sa�da": "DZ-20",
            "S�tif": "DZ-19",
            "Sidi Bel Abb�s": "DZ-22",
            "Skikda": "DZ-21",
            "Souk Ahras": "DZ-41",
            "Tamanghasset": "DZ-11",
            "T�bessa": "DZ-12",
            "Tiaret": "DZ-14",
            "Tindouf": "DZ-37",
            "Tipaza": "DZ-42",
            "Tissemsilt": "DZ-38",
            "Tizi Ouzou": "DZ-15",
            "Tlemcen": "DZ-13"
        }
    },

    "AS": {
        "code": "AS",
        "name": "American Samoa",
        "zone": 0,
        "states": {}
    },

    "AD": {
        "code": "AD",
        "name": "Andorra",
        "zone": 0,
        "states": {
            "Andorra la Vella": "AD-07",
            "Canillo": "AD-02",
            "Encamp": "AD-03",
            "Escaldes-Engordany": "AD-08",
            "La Massana": "AD-04",
            "Ordino": "AD-05",
            "Sant Juli� de L�ria": "AD-06"
        }
    },

    "AO": {
        "code": "AO",
        "name": "Angola",
        "zone": 0,
        "states": {
            "Bengo": "AO-BGO",
            "Benguela": "AO-BGU",
            "Bi�": "AO-BIE",
            "Cabinda": "AO-CAB",
            "Cuando-Cubango": "AO-CCU",
            "Cuanza Norte": "AO-CNO",
            "Cuanza Sul": "AO-CUS",
            "Cunene": "AO-CNN",
            "Huambo": "AO-HUA",
            "Hu�la": "AO-HUI",
            "Luanda": "AO-LUA",
            "Lunda Norte": "AO-LNO",
            "Lunda Sul": "AO-LSU",
            "Malange": "AO-MAL",
            "Moxico": "AO-MOX",
            "Namibe": "AO-NAM",
            "U�ge": "AO-UIG",
            "Zaire": "AO-ZAI"
        }
    },

    "AI": {
        "code": "AI",
        "name": "Anguilla",
        "zone": 0,
        "states": {}
    },

    "AQ": {
        "code": "AQ",
        "name": "Antarctica",
        "zone": 0,
        "states": {}
    },

    "AG": {
        "code": "AG",
        "name": "Antigua and Barbuda",
        "zone": 0,
        "states": {
            "Barbuda": "AG-10",
            "Redonda": "AG-11",
            "Saint George": "AG-03",
            "Saint John's": "AG-04",
            "Saint Mary": "AG-05",
            "Saint Paul": "AG-06",
            "Saint Peter": "AG-07",
            "Saint Philip": "AG-08"
        }
    },

    "AR": {
        "code": "AR",
        "name": "Argentina",
        "zone": 0,
        "states": {
            "Buenos Aires": "AR-B",
            "Catamarca": "AR-K",
            "Chaco": "AR-H",
            "Chubut": "AR-U",
            "Ciudad Aut�noma de Buenos Aires": "AR-C",
            "C�rdoba": "AR-X",
            "Corrientes": "AR-W",
            "Entre R�os": "AR-E",
            "Formosa": "AR-P",
            "Jujuy": "AR-Y",
            "La Pampa": "AR-L",
            "La Rioja": "AR-F",
            "Mendoza": "AR-M",
            "Misiones": "AR-N",
            "Neuqu�n": "AR-Q",
            "R�o Negro": "AR-R",
            "Salta": "AR-A",
            "San Juan": "AR-J",
            "San Luis": "AR-D",
            "Santa Cruz": "AR-Z",
            "Santa Fe": "AR-S",
            "Santiago del Estero": "AR-G",
            "Tierra del Fuego": "AR-V",
            "Tucum�n": "AR-T"
        }
    },

    "AM": {
        "code": "AM",
        "name": "Armenia",
        "zone": 0,
        "states": {
            "Aragatsotn": "AM-AG",
            "Ararat": "AM-AR",
            "Armavir": "AM-AV",
            "Erevan": "AM-ER",
            "Gegharkunik": "AM-GR",
            "Kotayk": "AM-KT",
            "Lori": "AM-LO",
            "Shirak": "AM-SH",
            "Syunik": "AM-SU",
            "Tavush": "AM-TV",
            "Vayots Dzor": "AM-VD"
        }
    },

    "AW": {
        "code": "AW",
        "name": "Aruba",
        "zone": 0,
        "states": {}
    },

    "AU": {
        "code": "AU",
        "name": "Australia",
        "zone": 0,
        "states": {
            "Australian Capital Territory": "AU-ACT",
            "New South Wales": "AU-NSW",
            "Northern Territory": "AU-NT",
            "Queensland": "AU-QLD",
            "South Australia": "AU-SA",
            "Tasmania": "AU-TAS",
            "Victoria": "AU-VIC",
            "Western Australia": "AU-WA"
        }
    },

    "AT": {
        "code": "AT",
        "name": "Austria",
        "zone": 0,
        "states": {
            "Burgenland": "AT-1",
            "K�rnten": "AT-2",
            "Nieder�sterreich": "AT-3",
            "Ober�sterreich": "AT-4",
            "Salzburg": "AT-5",
            "Steiermark": "AT-6",
            "Tirol": "AT-7",
            "Vorarlberg": "AT-8",
            "Wien": "AT-9"
        }
    },

    "AZ": {
        "code": "AZ",
        "name": "Azerbaijan",
        "zone": 0,
        "states": {
            "Abseron": "AZ-ABS",
            "Agcab�di": "AZ-AGC",
            "Agdam": "AZ-AGM",
            "Agdas": "AZ-AGS",
            "Agstafa": "AZ-AGA",
            "Agsu": "AZ-AGU",
            "�li Bayramli": "AZ-AB",
            "Astara": "AZ-AST",
            "Bab�k": "AZ-BAB",
            "Baki": "AZ-BA",
            "Balak�n": "AZ-BAL",
            "B�rd�": "AZ-BAR",
            "Beyl�qan": "AZ-BEY",
            "Bil�suvar": "AZ-BIL",
            "C�brayil": "AZ-CAB",
            "C�lilabab": "AZ-CAL",
            "Culfa": "AZ-CUL",
            "Dask�s�n": "AZ-DAS",
            "D�v��i": "AZ-DAV",
            "F�zuli": "AZ-FUZ",
            "G�d�b�y": "AZ-GAD",
            "G�nc�": "AZ-GA",
            "Goranboy": "AZ-GOR",
            "G�y�ay": "AZ-GOY",
            "Haciqabul": "AZ-HAC",
            "Imisli": "AZ-IMI",
            "Ismayilli": "AZ-ISM",
            "K�lb�c�r": "AZ-KAL",
            "K�rd�mir": "AZ-KUR",
            "La�in": "AZ-LAC",
            "L�nk�ran": "AZ-LAN",
            "L�nk�ran City": "AZ-LA",
            "Lerik": "AZ-LER",
            "Masalli": "AZ-MAS",
            "Ming��evir": "AZ-MI",
            "Naftalan": "AZ-NA",
            "Nax�ivan": "AZ-NX",
            "Neft�ala": "AZ-NEF",
            "Oguz": "AZ-OGU",
            "Ordubad": "AZ-ORD",
            "Q�b�l�": "AZ-QAB",
            "Qax": "AZ-QAX",
            "Qazax": "AZ-QAZ",
            "Qobustan": "AZ-QOB",
            "Quba": "AZ-QBA",
            "Qubadli": "AZ-QBI",
            "Qusar": "AZ-QUS",
            "Saatli": "AZ-SAT",
            "Sabirabad": "AZ-SAB",
            "S�d�r�k": "AZ-SAD",
            "Sahbuz": "AZ-SAH",
            "S�ki": "AZ-SAK",
            "S�ki City": "AZ-SA",
            "Salyan": "AZ-SAL",
            "Samaxi": "AZ-SMI",
            "S�mkir": "AZ-SKR",
            "Samux": "AZ-SMX",
            "S�rur": "AZ-SAR",
            "Siy�z�n": "AZ-SIY",
            "Sumqayit": "AZ-SM",
            "Susa": "AZ-SUS",
            "Susa City": "AZ-SS",
            "T�rt�r": "AZ-TAR",
            "Tovuz": "AZ-TOV",
            "Ucar": "AZ-UCA",
            "Xa�maz": "AZ-XAC",
            "Xank�ndi": "AZ-XA",
            "Xanlar": "AZ-XAN",
            "Xizi": "AZ-XIZ",
            "Xocali": "AZ-XCI",
            "Xocav�nd": "AZ-XVD",
            "Yardimli": "AZ-YAR",
            "Yevlax": "AZ-YEV",
            "Yevlax City": "AZ-YE",
            "Z�ngilan": "AZ-ZAN",
            "Zaqatala": "AZ-ZAQ",
            "Z�rdab": "AZ-ZAR"
        }
    },

    "BS": {
        "code": "BS",
        "name": "Bahamas",
        "zone": 0,
        "states": {
            "Acklins Islands": "BS-AK",
            "Berry Islands": "BS-BY",
            "Bimini and Cat Cay": "BS-BI",
            "Black Point": "BS-BP",
            "Cat Island": "BS-CI",
            "Central Abaco": "BS-CO",
            "Central Andros": "BS-CS",
            "Central Eleuthera": "BS-CE",
            "City of Freeport": "BS-FP",
            "Crooked Island and Long Cay": "BS-CK",
            "East Grand Bahama": "BS-EG",
            "Exuma": "BS-EX",
            "Grand Cay": "BS-GC",
            "Green Turtle Cay": "BS-GT",
            "Harbour Island": "BS-HI",
            "Hope Town": "BS-HT",
            "Inagua": "BS-IN",
            "Long Island": "BS-LI",
            "Mangrove Cay": "BS-MC",
            "Mayaguana": "BS-MG",
            "Moore's Island": "BS-MI",
            "New Providence": "BS-NP",
            "North Abaco": "BS-NO",
            "North Andros": "BS-NS",
            "North Eleuthera": "BS-NE",
            "Ragged Island": "BS-RI",
            "Rum Cay": "BS-RC",
            "San Salvador": "BS-SS",
            "South Abaco": "BS-SO",
            "South Andros": "BS-SA",
            "South Eleuthera": "BS-SE",
            "Spanish Wells": "BS-SW",
            "West Grand Bahama": "BS-WG"
        }
    },

    "BH": {
        "code": "BH",
        "name": "Bahrain",
        "zone": 0,
        "states": {
            "Al Janubiyah": "BH-14",
            "Al Manamah (Al Asimah)": "BH-13",
            "Al Muharraq": "BH-15",
            "Al Wust�": "BH-16",
            "Ash Shamaliyah": "BH-17"
        }
    },

    "BD": {
        "code": "BD",
        "name": "Bangladesh",
        "zone": 0,
        "states": {
            "Bagerhat zila": "BD-05",
            "Bandarban zila": "BD-01",
            "Barguna zila": "BD-02",
            "Barisal zila": "BD-06",
            "Bhola zila": "BD-07",
            "Bogra zila": "BD-03",
            "Brahmanbaria zila": "BD-04",
            "Chandpur zila": "BD-09",
            "Chittagong zila": "BD-10",
            "Chuadanga zila": "BD-12",
            "Comilla zila": "BD-08",
            "Cox's Bazar zila": "BD-11",
            "Dhaka zila": "BD-13",
            "Dinajpur zila": "BD-14",
            "Faridpur zila": "BD-15",
            "Feni zila": "BD-16",
            "Gaibandha zila": "BD-19",
            "Gazipur zila": "BD-18",
            "Gopalganj zila": "BD-17",
            "Habiganj zila": "BD-20",
            "Jaipurhat zila": "BD-24",
            "Jamalpur zila": "BD-21",
            "Jessore zila": "BD-22",
            "Jhalakati zila": "BD-25",
            "Jhenaidah zila": "BD-23",
            "Khagrachari zila": "BD-29",
            "Khulna zila": "BD-27",
            "Kishoreganj zila": "BD-26",
            "Kurigram zila": "BD-28",
            "Kushtia zila": "BD-30",
            "Lakshmipur zila": "BD-31",
            "Lalmonirhat zila": "BD-32",
            "Madaripur zila": "BD-36",
            "Magura zila": "BD-37",
            "Manikganj zila": "BD-33",
            "Meherpur zila": "BD-39",
            "Moulvibazar zila": "BD-38",
            "Munshiganj zila": "BD-35",
            "Mymensingh zila": "BD-34",
            "Naogaon zila": "BD-48",
            "Narail zila": "BD-43",
            "Narayanganj zila": "BD-40",
            "Narsingdi zila": "BD-42",
            "Natore zila": "BD-44",
            "Nawabganj zila": "BD-45",
            "Netrakona zila": "BD-41",
            "Nilphamari zila": "BD-46",
            "Noakhali zila": "BD-47",
            "Pabna zila": "BD-49",
            "Panchagarh zila": "BD-52",
            "Patuakhali zila": "BD-51",
            "Pirojpur zila": "BD-50",
            "Rajbari zila": "BD-53",
            "Rajshahi zila": "BD-54",
            "Rangamati zila": "BD-56",
            "Rangpur zila": "BD-55",
            "Satkhira zila": "BD-58",
            "Shariatpur zila": "BD-62",
            "Sherpur zila": "BD-57",
            "Sirajganj zila": "BD-59",
            "Sunamganj zila": "BD-61",
            "Sylhet zila": "BD-60",
            "Tangail zila": "BD-63",
            "Thakurgaon zila": "BD-64"
        }
    },

    "BB": {
        "code": "BB",
        "name": "Barbados",
        "zone": 0,
        "states": {
            "Christ Church": "BB-01",
            "Saint Andrew": "BB-02",
            "Saint George": "BB-03",
            "Saint James": "BB-04",
            "Saint John": "BB-05",
            "Saint Joseph": "BB-06",
            "Saint Lucy": "BB-07",
            "Saint Michael": "BB-08",
            "Saint Peter": "BB-09",
            "Saint Philip": "BB-10",
            "Saint Thomas": "BB-11"
        }
    },

    "BY": {
        "code": "BY",
        "name": "Belarus",
        "zone": 0,
        "states": {
            "Brestskaya voblasts": "BY-BR",
            "Homyel'skaya voblasts": "BY-HO",
            "Horad Minsk": "BY-HM",
            "Hrodzenskaya voblasts": "BY-HR",
            "Mahilyowskaya voblasts": "BY-MA",
            "Minskaya voblasts": "BY-MI",
            "Vitsyebskaya voblasts": "BY-VI"
        }
    },

    "BE": {
        "code": "BE",
        "name": "Belgium",
        "zone": 0,
        "states": {
            "Antwerpen": "BE-VAN",
            "Brabant Wallon": "BE-WBR",
            "Brussels": "BE-BRU",
            "Hainaut": "BE-WHT",
            "Li�ge": "BE-WLG",
            "Limburg": "BE-VLI",
            "Luxembourg": "BE-WLX",
            "Namur": "BE-WNA",
            "Oost-Vlaanderen": "BE-VOV",
            "Vlaams Brabant": "BE-VBR",
            "West-Vlaanderen": "BE-VWV"
        }
    },

    "BZ": {
        "code": "BZ",
        "name": "Belize",
        "zone": 0,
        "states": {
            "Belize": "BZ-BZ",
            "Cayo": "BZ-CY",
            "Corozal": "BZ-CZL",
            "Orange Walk": "BZ-OW",
            "Stann Creek": "BZ-SC",
            "Toledo": "BZ-TOL"
        }
    },

    "BJ": {
        "code": "BJ",
        "name": "Benin",
        "zone": 0,
        "states": {
            "Alibori": "BJ-AL",
            "Atakora": "BJ-AK",
            "Atlantique": "BJ-AQ",
            "Borgou": "BJ-BO",
            "Collines": "BJ-CO",
            "Donga": "BJ-DO",
            "Kouffo": "BJ-KO",
            "Littoral": "BJ-LI",
            "Mono": "BJ-MO",
            "Ou�m�": "BJ-OU",
            "Plateau": "BJ-PL",
            "Zou": "BJ-ZO"
        }
    },

    "BM": {
        "code": "BM",
        "name": "Bermuda",
        "zone": 0,
        "states": {}
    },

    "BT": {
        "code": "BT",
        "name": "Bhutan",
        "zone": 0,
        "states": {
            "Bumthang": "BT-33",
            "Chhukha": "BT-12",
            "Dagana": "BT-22",
            "Gasa": "BT-GA",
            "Ha": "BT-13",
            "Lhuentse": "BT-44",
            "Monggar": "BT-42",
            "Paro": "BT-11",
            "Pemagatshel": "BT-43",
            "Punakha": "BT-23",
            "Samdrup Jongkha": "BT-45",
            "Samtse": "BT-14",
            "Sarpang": "BT-31",
            "Thimphu": "BT-15",
            "Trashi Yangtse": "BT-TY",
            "Trashigang": "BT-41",
            "Trongsa": "BT-32",
            "Tsirang": "BT-21",
            "Wangdue Phodrang": "BT-24",
            "Zhemgang": "BT-34"
        }
    },

    "BO": {
        "code": "BO",
        "name": "Bolivia",
        "zone": 0,
        "states": {
            "Chuquisaca": "BO-H",
            "Cochabamba": "BO-C",
            "El Beni": "BO-B",
            "La Paz": "BO-L",
            "Oruro": "BO-O",
            "Pando": "BO-N",
            "Potos�": "BO-P",
            "Santa Cruz": "BO-S",
            "Tarija": "BO-T"
        }
    },

    "BA": {
        "code": "BA",
        "name": "Bosnia and Herzegowina",
        "zone": 0
    },

    "BW": {
        "code": "BW",
        "name": "Botswana",
        "zone": 0,
        "states": {
            "Central": "BW-CE",
            "Ghanzi": "BW-GH",
            "Kgalagadi": "BW-KG",
            "Kgatleng": "BW-KL",
            "Kweneng": "BW-KW",
            "North-East": "BW-NE",
            "North-West": "BW-NW",
            "South-East": "BW-SE",
            "Southern": "BW-SO"
        }
    },

    "BV": {
        "code": "BV",
        "name": "Bouvet Island",
        "zone": 0,
        "states": {}
    },

    "BR": {
        "code": "BR",
        "name": "Brazil",
        "zone": 0,
        "states": {
            "Acre": "BR-AC",
            "Alagoas": "BR-AL",
            "Amap�": "BR-AP",
            "Amazonas": "BR-AM",
            "Bahia": "BR-BA",
            "Cear�": "BR-CE",
            "Distrito Federal": "BR-DF",
            "Esp�rito Santo": "BR-ES",
            "Goi�s": "BR-GO",
            "Maranh�o": "BR-MA",
            "Mato Grosso": "BR-MT",
            "Mato Grosso do Sul": "BR-MS",
            "Minas Gerais": "BR-MG",
            "Par�": "BR-PA",
            "Para�ba": "BR-PB",
            "Paran�": "BR-PR",
            "Pernambuco": "BR-PE",
            "Piau�": "BR-PI",
            "Rio de Janeiro": "BR-RJ",
            "Rio Grande do Norte": "BR-RN",
            "Rio Grande do Sul": "BR-RS",
            "Rond�nia": "BR-RO",
            "Roraima": "BR-RR",
            "Santa Catarina": "BR-SC",
            "S�o Paulo": "BR-SP",
            "Sergipe": "BR-SE",
            "Tocantins": "BR-TO"
        }
    },

    "IO": {
        "code": "IO",
        "name": "British Indian Ocean Territory",
        "zone": 0,
        "states": {}
    },

    "BN": {
        "code": "BN",
        "name": "Brunei Darussalam",
        "zone": 0,
        "states": {
            "Belait": "BN-BE",
            "Brunei-Muara": "BN-BM",
            "Temburong": "BN-TE",
            "Tutong": "BN-TU"
        }
    },

    "BG": {
        "code": "BG",
        "name": "Bulgaria",
        "zone": 0,
        "states": {
            "Blagoevgrad": "BG-01",
            "Burgas": "BG-02",
            "Dobrich": "BG-08",
            "Gabrovo": "BG-07",
            "Haskovo": "BG-26",
            "Kardzhali": "BG-09",
            "Kjustendil": "BG-10",
            "Lovech": "BG-11",
            "Montana": "BG-12",
            "Pazardzhik": "BG-13",
            "Pernik": "BG-14",
            "Pleven": "BG-15",
            "Plovdiv": "BG-16",
            "Razgrad": "BG-17",
            "Ruse": "BG-18",
            "Shumen": "BG-27",
            "Silistra": "BG-19",
            "Sliven": "BG-20",
            "Smolyan": "BG-21",
            "Sofia": "BG-23",
            "Sofia-Grad": "BG-22",
            "Stara Zagora": "BG-24",
            "Targovishte": "BG-25",
            "Varna": "BG-03",
            "Veliko Tarnovo": "BG-04",
            "Vidin": "BG-05",
            "Vratsa": "BG-06",
            "Yambol": "BG-28"
        }
    },

    "BF": {
        "code": "BF",
        "name": "Burkina Faso",
        "zone": 0,
        "states": {
            "Bal�": "BF-BAL",
            "Bam": "BF-BAM",
            "Banwa": "BF-BAN",
            "Baz�ga": "BF-BAZ",
            "Boucle du Mouhoun": "BF-01",
            "Bougouriba": "BF-BGR",
            "Boulgou": "BF-BLG",
            "Boulkiemd�": "BF-BLK",
            "Cascades": "BF-02",
            "Centre": "BF-03",
            "Centre-Est": "BF-04",
            "Centre-Nord": "BF-05",
            "Centre-Ouest": "BF-06",
            "Centre-Sud": "BF-07",
            "Como�": "BF-COM",
            "Est": "BF-08",
            "Ganzourgou": "BF-GAN",
            "Gnagna": "BF-GNA",
            "Gourma": "BF-GOU",
            "Hauts-Bassins": "BF-09",
            "Houet": "BF-HOU",
            "Ioba": "BF-IOB",
            "Kadiogo": "BF-KAD",
            "K�n�dougou": "BF-KEN",
            "Komondjari": "BF-KMD",
            "Kompienga": "BF-KMP",
            "Kossi": "BF-KOS",
            "Koulp�logo": "BF-KOP",
            "Kouritenga": "BF-KOT",
            "Kourw�ogo": "BF-KOW",
            "L�raba": "BF-LER",
            "Loroum": "BF-LOR",
            "Mouhoun": "BF-MOU",
            "Nahouri": "BF-NAO",
            "Namentenga": "BF-NAM",
            "Nayala": "BF-NAY",
            "Nord": "BF-10",
            "Noumbiel": "BF-NOU",
            "Oubritenga": "BF-OUB",
            "Oudalan": "BF-OUD",
            "Passor�": "BF-PAS",
            "Plateau-Central": "BF-11",
            "Poni": "BF-PON",
            "Sahel": "BF-12",
            "Sangui�": "BF-SNG",
            "Sanmatenga": "BF-SMT",
            "S�no": "BF-SEN",
            "Sissili": "BF-SIS",
            "Soum": "BF-SOM",
            "Sourou": "BF-SOR",
            "Sud-Ouest": "BF-13",
            "Tapoa": "BF-TAP",
            "Tui": "BF-TUI",
            "Yagha": "BF-YAG",
            "Yatenga": "BF-YAT",
            "Ziro": "BF-ZIR",
            "Zondoma": "BF-ZON",
            "Zoundw�ogo": "BF-ZOU"
        }
    },

    "BI": {
        "code": "BI",
        "name": "Burundi",
        "zone": 0,
        "states": {
            "Bubanza": "BI-BB",
            "Bujumbura Mairie": "BI-BM",
            "Bujumbura Rural": "BI-BL",
            "Bururi": "BI-BR",
            "Cankuzo": "BI-CA",
            "Cibitoke": "BI-CI",
            "Gitega": "BI-GI",
            "Karuzi": "BI-KR",
            "Kayanza": "BI-KY",
            "Kirundo": "BI-KI",
            "Makamba": "BI-MA",
            "Muramvya": "BI-MU",
            "Muyinga": "BI-MY",
            "Mwaro": "BI-MW",
            "Ngozi": "BI-NG",
            "Rutana": "BI-RT",
            "Ruyigi": "BI-RY"
        }
    },

    "KH": {
        "code": "KH",
        "name": "Cambodia",
        "zone": 0,
        "states": {
            "Baat Dambang": "KH-2",
            "Banteay Mean Chey": "KH-1",
            "Kampong Chaam": "KH-3",
            "Kampong Chhnang": "KH-4",
            "Kampong Spueu": "KH-5",
            "Kampong Thum": "KH-6",
            "Kampot": "KH-7",
            "Kandaal": "KH-8",
            "Kaoh Kong": "KH-9",
            "Kracheh": "KH-10",
            "Krong Kaeb": "KH-23",
            "Krong Pailin": "KH-24",
            "Krong Preah Sihanouk": "KH-18",
            "Mondol Kiri": "KH-11",
            "Otdar Mean Chey": "KH-22",
            "Phnom Penh": "KH-12",
            "Pousaat": "KH-15",
            "Preah Vihear": "KH-13",
            "Prey Veaen": "KH-14",
            "Rotanak Kiri": "KH-16",
            "Siem Reab": "KH-17",
            "Stueng Traeng": "KH-19",
            "Svaay Rien": "KH-20",
            "Taakae": "KH-21"
        }
    },

    "CM": {
        "code": "CM",
        "name": "Cameroon",
        "zone": 0,
        "states": {
            "Adamaoua": "CM-AD",
            "Centre": "CM-CE",
            "East": "CM-ES",
            "Far North": "CM-EN",
            "Littoral": "CM-LT",
            "North": "CM-NO",
            "North-West": "CM-NW",
            "South": "CM-SU",
            "South-West": "CM-SW",
            "West": "CM-OU"
        }
    },

    "CA": {
        "code": "CA",
        "name": "Canada",
        "zone": 0,
        "states": {
            "Alberta": "AB",
            "British Columbia": "BC",
            "Manitoba": "MB",
            "New Brunswick": "NB",
            "Newfoundland and Labrador": "NL",
            "Northwest Territories": "NT",
            "Nova Scotia": "NS",
            "Nunavut": "NU",
            "Ontario": "ON",
            "Prince Edward Island": "PE",
            "Quebec": "QC",
            "Saskatchewan": "SK",
            "Yukon": "YT"
        }
    },

    "CV": {
        "code": "CV",
        "name": "Cape Verde",
        "zone": 0,
        "states": {
            "Boa Vista": "CV-BV",
            "Brava": "CV-BR",
            "Ilhas de Barlavento": "CV-B",
            "Ilhas de Sotavento": "CV-S",
            "Maio": "CV-MA",
            "Mosteiros": "CV-MO",
            "Paul": "CV-PA",
            "Porto Novo": "CV-PN",
            "Praia": "CV-PR",
            "Ribeira Brava": "CV-RB",
            "Ribeira Grande": "CV-RG",
            "Ribeira Grande de Santiago": "CV-RS",
            "Santa Catarina": "CV-CA",
            "Santa Catarina do Fogo": "CV-CF",
            "Santa Cruz": "CV-CR",
            "S�o Domingos": "CV-SD",
            "S�o Filipe": "CV-SF",
            "S�o Louren�o dos �rg�os": "CV-SL",
            "S�o Miguel": "CV-SM",
            "S�o Salvador do Mundo": "CV-SS",
            "S�o Vicente": "CV-SV",
            "Tarrafal": "CV-TA",
            "Tarrafal de S�o Nicolau": "CV-TS"
        }
    },

    "KY": {
        "code": "KY",
        "name": "Cayman Islands",
        "zone": 0,
        "states": {
            "Bodden Town": "KY-01",
            "Cayman Brac": "KY-02",
            "East End": "KY-03",
            "George Town": "KY-04",
            // "Little Cayman": "Ky-05",
            "Little Cayman": "KY-05",
            "North Side": "KY-06",
            "West Bay": "KY-07"
        }
    },

    "CF": {
        "code": "CF",
        "name": "Central African Republic",
        "zone": 0,
        "states": {
            "Bamingui-Bangoran": "CF-BB",
            "Bangui": "CF-BGF",
            "Basse-Kotto": "CF-BK",
            "Gribingui": "CF-KB",
            "Haut-Mbomou": "CF-HM",
            "Haute-Kotto": "CF-HK",
            "Haute-Sangha / Mamb�r�-Kad��": "CF-HS",
            "K�mo-Gribingui": "CF-KG",
            "Lobaye": "CF-LB",
            "Mbomou": "CF-MB",
            "Nana-Mamb�r�": "CF-NM",
            "Ombella-Mpoko": "CF-MP",
            "Ouaka": "CF-UK",
            "Ouham": "CF-AC",
            "Ouham-Pend�": "CF-OP",
            "Sangha": "CF-SE",
            "Vakaga": "CF-VK"
        }
    },

    "TD": {
        "code": "TD",
        "name": "Chad",
        "zone": 0
    },

    "CL": {
        "code": "CL",
        "name": "Chile",
        "zone": 0,
        "states": {
            "Ais�n del General Carlos Ib��ez del Campo": "CL-AI",
            "Antofagasta": "CL-AN",
            "Araucan�a": "CL-AR",
            "Arica y Parinacota": "CL-AP",
            "Atacama": "CL-AT",
            "B�o-B�o": "CL-BI",
            "Coquimbo": "CL-CO",
            "Libertador General Bernardo O'Higgins": "CL-LI",
            "Los Lagos": "CL-LL",
            "Los R�os": "CL-LR",
            "Magallanes": "CL-MA",
            "Maule": "CL-ML",
            "Regi�n Metropolitana de Santiago": "CL-RM",
            "Tarapac�": "CL-TA",
            "Valpara�so": "CL-VS"
        }
    },

    "CN": {
        "code": "CN",
        "name": "China",
        "zone": 0,
        "states": {
            "Anhui": "CN-34",
            "Aomen": "CN-92",
            "Beijing": "CN-11",
            "Chongqing": "CN-50",
            "Fujian": "CN-35",
            "Gansu": "CN-62",
            "Guangdong": "CN-44",
            "Guangxi": "CN-45",
            "Guizhou": "CN-52",
            "Hainan": "CN-46",
            "Hebei": "CN-13",
            "Heilongjiang": "CN-23",
            "Henan": "CN-41",
            "Hubei": "CN-42",
            "Hunan": "CN-43",
            "Jiangsu": "CN-32",
            "Jiangxi": "CN-36",
            "Jilin": "CN-22",
            "Liaoning": "CN-21",
            "Nei Mongol": "CN-15",
            "Ningxia": "CN-64",
            "Qinghai": "CN-63",
            "Shaanxi": "CN-61",
            "Shandong": "CN-37",
            "Shanghai": "CN-31",
            "Shanxi": "CN-14",
            "Sichuan": "CN-51",
            "Taiwan": "CN-71",
            "Tianjin": "CN-12",
            "Xianggang": "CN-91",
            "Xinjiang": "CN-65",
            "Xizang": "CN-54",
            "Yunnan": "CN-53",
            "Zhejiang": "CN-33"
        }
    },

    "CX": {
        "code": "CX",
        "name": "Christmas Island",
        "zone": 0,
        "states": {}
    },

    "CC": {
        "code": "CC",
        "name": "Cocos (Keeling) Islands",
        "zone": 0,
        "states": {}
    },

    "CO": {
        "code": "CO",
        "name": "Colombia",
        "zone": 0,
        "states": {
            "Amazonas": "CO-AMA",
            "Antioquia": "CO-ANT",
            "Arauca": "CO-ARA",
            "Atl�ntico": "CO-ATL",
            "Bol�var": "CO-BOL",
            "Boyac�": "CO-BOY",
            "Caldas": "CO-CAL",
            "Caquet�": "CO-CAQ",
            "Casanare": "CO-CAS",
            "Cauca": "CO-CAU",
            "Cesar": "CO-CES",
            "Choc�": "CO-CHO",
            "C�rdoba": "CO-COR",
            "Cundinamarca": "CO-CUN",
            "Distrito Capital de Bogot�": "CO-DC",
            "Guain�a": "CO-GUA",
            "Guaviare": "CO-GUV",
            "Huila": "CO-HUI",
            "La Guajira": "CO-LAG",
            "Magdalena": "CO-MAG",
            "Meta": "CO-MET",
            "Nari�o": "CO-NAR",
            "Norte de Santander": "CO-NSA",
            "Putumayo": "CO-PUT",
            "Quind�o": "CO-QUI",
            "Risaralda": "CO-RIS",
            "San Andr�s, Providencia y Santa Catalina": "CO-SAP",
            "Santander": "CO-SAN",
            "Sucre": "CO-SUC",
            "Tolima": "CO-TOL",
            "Valle del Cauca": "CO-VAC",
            "Vaup�s": "CO-VAU",
            "Vichada": "CO-VID"
        }
    },

    "KM": {
        "code": "KM",
        "name": "Comoros",
        "zone": 0,
        "states": {
            "Andjaz�dja": "KM-G",
            "Andjou�n": "KM-A",
            "Mo�h�l�": "KM-M"
        }
    },

    "CG": {
        "code": "CG",
        "name": "Congo",
        "zone": 0,
        "states": {
            "Bouenza": "CG-11",
            "Brazzaville": "CG-BZV",
            "Cuvette": "CG-8",
            "Cuvette-Ouest": "CG-15",
            "Kouilou": "CG-5",
            "L�koumou": "CG-2",
            "Likouala": "CG-7",
            "Niari": "CG-9",
            "Plateaux": "CG-14",
            "Pool": "CG-12",
            "Sangha": "CG-13"
        }
    },

    "CK": {
        "code": "CK",
        "name": "Cook Islands",
        "zone": 0,
        "states": {}
    },

    "CR": {
        "code": "CR",
        "name": "Costa Rica",
        "zone": 0,
        "states": {
            "Alajuela": "CR-A",
            "Cartago": "CR-C",
            "Guanacaste": "CR-G",
            "Heredia": "CR-H",
            "Lim�n": "CR-L",
            "Puntarenas": "CR-P",
            "San Jos�": "CR-SJ"
        }
    },

    "CI": {
        "code": "CI",
        "name": "Cote D'Ivoire",
        "zone": 0,
        "states": {
            "18 Montagnes": "CI-06",
            "Agn�bi": "CI-16",
            "Bafing": "CI-17",
            "Bas-Sassandra": "CI-09",
            "Dengu�l�": "CI-10",
            "Fromager": "CI-18",
            "Haut-Sassandra": "CI-02",
            "Lacs": "CI-07",
            "Lagunes": "CI-01",
            "Marahou�": "CI-12",
            "Moyen-Cavally": "CI-19",
            "Moyen-Como�": "CI-05",
            "Nzi-Como�": "CI-11",
            "Savanes": "CI-03",
            "Sud-Bandama": "CI-15",
            "Sud-Como�": "CI-13",
            "Vall�e du Bandama": "CI-04",
            "Worodougou": "CI-14",
            "Zanzan": "CI-08"
        }
    },

    "HR": {
        "code": "HR",
        "name": "Croatia",
        "zone": 0
    },

    "CU": {
        "code": "CU",
        "name": "Cuba",
        "zone": 0,
        "states": {
            "Camag�ey": "CU-09",
            "Ciego de �vila": "CU-08",
            "Cienfuegos": "CU-06",
            "Ciudad de La Habana": "CU-03",
            "Granma": "CU-12",
            "Guant�namo": "CU-14",
            "Holgu�n": "CU-11",
            "Isla de la Juventud": "CU-99",
            "La Habana": "CU-02",
            "Las Tunas": "CU-10",
            "Matanzas": "CU-04",
            "Pinar del R�o": "CU-01",
            "Sancti Sp�ritus": "CU-07",
            "Santiago de Cuba": "CU-13",
            "Villa Clara": "CU-05"
        }
    },

    "CY": {
        "code": "CY",
        "name": "Cyprus",
        "zone": 0,
        "states": {
            "Ammochostos": "CY-04",
            "Keryneia": "CY-06",
            "Larnaka": "CY-03",
            "Lefkosia": "CY-01",
            "Lemesos": "CY-02",
            "Pafos": "CY-05"
        }
    },

    "CZ": {
        "code": "CZ",
        "name": "Czech Republic",
        "zone": 0,
        "states": {
            "Jihocesk� kraj": "CZ-JC",
            "Jihomoravsk� kraj": "CZ-JM",
            "Karlovarsk� kraj": "CZ-KA",
            "Kr�lov�hradeck� kraj": "CZ-KR",
            "Libereck� kraj": "CZ-LI",
            "Moravskoslezsk� kraj": "CZ-MO",
            "Olomouck� kraj": "CZ-OL",
            "Pardubick� kraj": "CZ-PA",
            "Plzensk� kraj": "CZ-PL",
            "Praha, hlavn� mesto": "CZ-PR",
            "Stredocesk� kraj": "CZ-ST",
            "�steck� kraj": "CZ-US",
            "Vysocina": "CZ-VY",
            "Zl�nsk� kraj": "CZ-ZL"
        }
    },

    "DK": {
        "code": "DK",
        "name": "Denmark",
        "zone": 0,
        "states": {
            "�rhus": "DK-070",
            "Bornholm": "DK-040",
            "Capital": "DK-84",
            "Central Jutland": "DK-82",
            "Frederiksberg City": "DK-147",
            "Frederiksborg": "DK-020",
            "Fyn": "DK-042",
            "K�benhavn": "DK-015",
            "K�benhavn City": "DK-101",
            "Nordjylland": "DK-080",
            "North Jutland": "DK-81",
            "Ribe": "DK-055",
            "Ringk�bing": "DK-065",
            "Roskilde": "DK-025",
            "South Denmark": "DK-83",
            "Storstr�m": "DK-035",
            "S�nderjylland": "DK-050",
            "Vejle": "DK-060",
            "Vestsj�lland": "DK-030",
            "Viborg": "DK-076",
            "Zeeland": "DK-85"
        }
    },

    "DJ": {
        "code": "DJ",
        "name": "Djibouti",
        "zone": 0,
        "states": {
            "Ali Sabieh": "DJ-AS",
            "Arta": "DJ-AR",
            "Dikhil": "DJ-DI",
            "Djibouti": "DJ-DJ",
            "Obock": "DJ-OB",
            "Tadjourah": "DJ-TA"
        }
    },

    "DM": {
        "code": "DM",
        "name": "Dominica",
        "zone": 0,
        "states": {
            "Saint Andrew": "DM-02",
            "Saint David": "DM-03",
            "Saint George": "DM-04",
            "Saint John": "DM-05",
            "Saint Joseph": "DM-06",
            "Saint Luke": "DM-07",
            "Saint Mark": "DM-08",
            "Saint Patrick": "DM-09",
            "Saint Paul": "DM-10",
            "Saint Peter": "DM-11"
        }
    },

    "DO": {
        "code": "DO",
        "name": "Dominican Republic",
        "zone": 0,
        "states": {
            "Azua": "DO-02",
            "Bahoruco": "DO-03",
            "Barahona": "DO-04",
            "Dajab�n": "DO-05",
            "Distrito Nacional (Santo Domingo)": "DO-01",
            "Duarte": "DO-06",
            "El Seybo": "DO-08",
            "Espaillat": "DO-09",
            "Hato Mayor": "DO-30",
            "Independencia": "DO-10",
            "La Altagracia": "DO-11",
            "La Estrellet": "DO-07",
            "La Romana": "DO-12",
            "La Vega": "DO-13",
            "Mar�a Trinidad S�nchez": "DO-14",
            "Monse�or Nouel": "DO-28",
            "Monte Cristi": "DO-15",
            "Monte Plata": "DO-29",
            "Pedernales": "DO-16",
            "Peravia": "DO-17",
            "Puerto Plata": "DO-18",
            "Salcedo": "DO-19",
            "Saman�": "DO-20",
            "San Crist�bal": "DO-21",
            "San Jose de Ocoa": "DO-31",
            "San Juan": "DO-22",
            "San Pedro de Macor�s": "DO-23",
            "S�nchez Ram�rez": "DO-24",
            "Santiago": "DO-25",
            "Santiago Rodr�guez": "DO-26",
            "Valverde": "DO-27"
        }
    },

    "TP": {
        "code": "TP",
        "name": "East Timor",
        "zone": 0,
        "states": {}
    },

    "EC": {
        "code": "EC",
        "name": "Ecuador",
        "zone": 0,
        "states": {
            "Azuay": "EC-A",
            "Bol�var": "EC-B",
            "Ca�ar": "EC-F",
            "Carchi": "EC-C",
            "Chimborazo": "EC-H",
            "Cotopaxi": "EC-X",
            "El Oro": "EC-O",
            "Esmeraldas": "EC-E",
            "Gal�pagos": "EC-W",
            "Guayas": "EC-G",
            "Imbabura": "EC-I",
            "Loja": "EC-L",
            "Los R�os": "EC-R",
            "Manab�": "EC-M",
            "Morona-Santiago": "EC-S",
            "Napo": "EC-N",
            "Orellana": "EC-D",
            "Pastaza": "EC-Y",
            "Pichincha": "EC-P",
            "Santa Elena": "EC-SE",
            "Santo Domingo de los Tsachilas": "EC-SD",
            "Sucumb�os": "EC-U",
            "Tungurahua": "EC-T",
            "Zamora-Chinchipe": "EC-Z"
        }
    },

    "EG": {
        "code": "EG",
        "name": "Egypt",
        "zone": 0,
        "states": {
            "": ""
        }
    },

    "SV": {
        "code": "SV",
        "name": "El Salvador",
        "zone": 0,
        "states": {
            "Ahuachap�n": "SV-AH",
            "Caba�as": "SV-CA",
            "Chalatenango": "SV-CH",
            "Cuscatl�n": "SV-CU",
            "La Libertad": "SV-LI",
            "La Paz": "SV-PA",
            "La Uni�n": "SV-UN",
            "Moraz�n": "SV-MO",
            "San Miguel": "SV-SM",
            "San Salvador": "SV-SS",
            "San Vicente": "SV-SV",
            "Santa Ana": "SV-SA",
            "Sonsonate": "SV-SO",
            "Usulut�n": "SV-US"
        }
    },

    "GQ": {
        "code": "GQ",
        "name": "Equatorial Guinea",
        "zone": 0,
        "states": {
            "Annob�n": "GQ-AN",
            "Bioko Norte": "GQ-BN",
            "Bioko Sur": "GQ-BS",
            "Centro Sur": "GQ-CS",
            "Kie-Ntem": "GQ-KN",
            "Litoral": "GQ-LI",
            "Regi�n Continental": "GQ-C",
            "Regi�n Insular": "GQ-I",
            "Wele-Nz�s": "GQ-WN"
        }
    },

    "ER": {
        "code": "ER",
        "name": "Eritrea",
        "zone": 0,
        "states": {
            "Anseba": "ER-AN",
            "Debub": "ER-DU",
            "Debubawi Keyih Bahari": "ER-DK",
            "Gash-Barka": "ER-GB",
            "Maakel": "ER-MA",
            "Semenawi Keyih Bahari": "ER-SK"
        }
    },

    "EE": {
        "code": "EE",
        "name": "Estonia",
        "zone": 0,
        "states": {
            "Harjumaa": "EE-37",
            "Hiiumaa": "EE-39",
            "Ida-Virumaa": "EE-44",
            "J�rvamaa": "EE-51",
            "J�gevamaa": "EE-49",
            "L��ne-Virumaa": "EE-59",
            "L��nemaa": "EE-57",
            "P�rnumaa": "EE-67",
            "P�lvamaa": "EE-65",
            "Raplamaa": "EE-70",
            "Saaremaa": "EE-74",
            "Tartumaa": "EE-78",
            "Valgamaa": "EE-82",
            "Viljandimaa": "EE-84",
            "V�rumaa": "EE-86"
        }
    },

    "ET": {
        "code": "ET",
        "name": "Ethiopia",
        "zone": 0,
        "states": {
            "Adis Abeba": "ET-AA",
            "Afar": "ET-AF",
            "Amara": "ET-AM",
            "Binshangul Gumuz": "ET-BE",
            "Dire Dawa": "ET-DD",
            "Gambela Hizboch": "ET-GA",
            "Hareri Hizb": "ET-HA",
            "Oromiya": "ET-OR",
            "Sumale": "ET-SO",
            "Tigray": "ET-TI",
            "YeDebub Biheroch Bihereseboch na Hizboch": "ET-SN"
        }
    },

    "FK": {
        "code": "FK",
        "name": "Falkland Islands (Malvinas)",
        "zone": 0,
        "states": {}
    },

    "FO": {
        "code": "FO",
        "name": "Faroe Islands",
        "zone": 0,
        "states": {}
    },

    "FJ": {
        "code": "FJ",
        "name": "Fiji",
        "zone": 0,
        "states": {
            "Central": "FJ-C",
            "Eastern": "FJ-E",
            "Northern": "FJ-N",
            "Rotuma": "FJ-R",
            "Western": "FJ-W"
        }
    },

    "FI": {
        "code": "FI",
        "name": "Finland",
        "zone": 0,
        "states": {
            "Ahvenanmaan l��ni": "FI-AL",
            "Etel�-Suomen l��ni": "FI-ES",
            "It�-Suomen l��ni": "FI-IS",
            "L�nsi-Suomen l��ni": "FI-LS",
            "Lapin l��ni": "FI-LL",
            "Oulun l��ni": "FI-OL"
        }
    },

    "FR": {
        "code": "FR",
        "name": "France",
        "zone": 0,
        "states": {
            "Ain": "FR-01",
            "Aisne": "FR-02",
            "Allier": "FR-03",
            "Alpes-de-Haute-Provence": "FR-04",
            "Alpes-Maritimes": "FR-06",
            "Ard�che": "FR-07",
            "Ardennes": "FR-08",
            "Ari�ge": "FR-09",
            "Aube": "FR-10",
            "Aude": "FR-11",
            "Aveyron": "FR-12",
            "Bas-Rhin": "FR-67",
            "Bouches-du-Rh�ne": "FR-13",
            "Calvados": "FR-14",
            "Cantal": "FR-15",
            "Charente": "FR-16",
            "Charente-Maritime": "FR-17",
            "Cher": "FR-18",
            "Clipperton": "FR-CP",
            "Corr�ze": "FR-19",
            "Corse-du-Sud": "FR-2A",
            "C�te-d'Or": "FR-21",
            "C�tes-d'Armor": "FR-22",
            "Creuse": "FR-23",
            "Deux-S�vres": "FR-79",
            "Dordogne": "FR-24",
            "Doubs": "FR-25",
            "Dr�me": "FR-26",
            "Essonne": "FR-91",
            "Eure": "FR-27",
            "Eure-et-Loir": "FR-28",
            "Finist�re": "FR-29",
            "Gard": "FR-30",
            "Gers": "FR-32",
            "Gironde": "FR-33",
            "Haut-Rhin": "FR-68",
            "Haute-Corse": "FR-2B",
            "Haute-Garonne": "FR-31",
            "Haute-Loire": "FR-43",
            "Haute-Marne": "FR-52",
            "Haute-Sa�ne": "FR-70",
            "Haute-Savoie": "FR-74",
            "Haute-Vienne": "FR-87",
            "Hautes-Alpes": "FR-05",
            "Hautes-Pyr�n�es": "FR-65",
            "Hauts-de-Seine": "FR-92",
            "H�rault": "FR-34",
            "Ille-et-Vilaine": "FR-35",
            "Indre": "FR-36",
            "Indre-et-Loire": "FR-37",
            "Is�re": "FR-38",
            "Jura": "FR-39",
            "Landes": "FR-40",
            "Loir-et-Cher": "FR-41",
            "Loire": "FR-42",
            "Loire-Atlantique": "FR-44",
            "Loiret": "FR-45",
            "Lot": "FR-46",
            "Lot-et-Garonne": "FR-47",
            "Loz�re": "FR-48",
            "Maine-et-Loire": "FR-49",
            "Manche": "FR-50",
            "Marne": "FR-51",
            "Mayenne": "FR-53",
            "Mayotte": "FR-YT",
            "Meurthe-et-Moselle": "FR-54",
            "Meuse": "FR-55",
            "Morbihan": "FR-56",
            "Moselle": "FR-57",
            "Ni�vre": "FR-58",
            "Nord": "FR-59",
            "Nouvelle-Cal�donie": "FR-NC",
            "Oise": "FR-60",
            "Orne": "FR-61",
            "Paris": "FR-75",
            "Pas-de-Calais": "FR-62",
            "Polyn�sie fran�aise": "FR-PF",
            "Puy-de-D�me": "FR-63",
            "Pyr�n�es-Atlantiques": "FR-64",
            "Pyr�n�es-Orientales": "FR-66",
            "Rh�ne": "FR-69",
            "Saint-Barth�lemy": "FR-BL",
            "Saint-Martin": "FR-MF",
            "Saint-Pierre-et-Miquelon": "FR-PM",
            "Sa�ne-et-Loire": "FR-71",
            "Sarthe": "FR-72",
            "Savoie": "FR-73",
            "Seine-et-Marne": "FR-77",
            "Seine-Maritime": "FR-76",
            "Seine-Saint-Denis": "FR-93",
            "Somme": "FR-80",
            "Tarn": "FR-81",
            "Tarn-et-Garonne": "FR-82",
            "Terres Australes Fran�aises": "FR-TF",
            "Territoire de Belfort": "FR-90",
            "Val-d'Oise": "FR-95",
            "Val-de-Marne": "FR-94",
            "Var": "FR-83",
            "Vaucluse": "FR-84",
            "Vend�e": "FR-85",
            "Vienne": "FR-86",
            "Vosges": "FR-88",
            "Wallis et Futuna": "FR-WF",
            "Yonne": "FR-89",
            "Yvelines": "FR-78"
        }
    },

    "FX": {
        "code": "FX",
        "name": "France, Metropolitan",
        "zone": 0,
        "states": {}
    },

    "GF": {
        "code": "GF",
        "name": "French Guiana",
        "zone": 0,
        "states": {}
    },

    "PF": {
        "code": "PF",
        "name": "French Polynesia",
        "zone": 0,
        "states": {}
    },

    "TF": {
        "code": "TF",
        "name": "French Southern Territories",
        "zone": 0,
        "states": {
            "Crozet Islands": "TF-X2",
            "Ile Saint-Paul et Ile Amsterdam": "TF-X1",
            "Iles Eparses": "TF-X4",
            "Kerguelen": "TF-X3"
        }
    },

    "GA": {
        "code": "GA",
        "name": "Gabon",
        "zone": 0,
        "states": {
            "Estuaire": "GA-1",
            "Haut-Ogoou�": "GA-2",
            "Moyen-Ogoou�": "GA-3",
            "Ngouni�": "GA-4",
            "Nyanga": "GA-5",
            "Ogoou�-Ivindo": "GA-6",
            "Ogoou�-Lolo": "GA-7",
            "Ogoou�-Maritime": "GA-8",
            "Woleu-Ntem": "GA-9"
        }
    },

    "GM": {
        "code": "GM",
        "name": "Gambia",
        "zone": 0,
        "states": {
            "Banjul": "GM-B",
            "Lower River": "GM-L",
            "MacCarthy Island": "GM-M",
            "North Bank": "GM-N",
            "Upper River": "GM-U",
            "Western": "GM-W"
        }
    },

    "GE": {
        "code": "GE",
        "name": "Georgia",
        "zone": 0,
        "states": {
            "Abkhazia": "GE-AB",
            "Ajaria": "GE-AJ",
            "Guria": "GE-GU",
            "Imereti": "GE-IM",
            "Kakheti": "GE-KA",
            "Kvemo Kartli": "GE-KK",
            "Mtskheta-Mtianeti": "GE-MM",
            "Racha-Lechkhumi": "GE-RL",
            "Samegrelo-Zemo Svaneti": "GE-SZ",
            "Samtskhe-Javakheti": "GE-SJ",
            "Shida Kartli": "GE-SK",
            "Tbilisi": "GE-TB"
        }
    },

    "DE": {
        "code": "DE",
        "name": "Germany",
        "zone": 0,
        "states": {
            "Baden-W�rttemberg": "DE-BW",
            "Bayern": "DE-BY",
            "Berlin": "DE-BE",
            "Brandenburg": "DE-BB",
            "Bremen": "DE-HB",
            "Hamburg": "DE-HH",
            "Hessen": "DE-HE",
            "Mecklenburg-Vorpommern": "DE-MV",
            "Niedersachsen": "DE-NI",
            "Nordrhein-Westfalen": "DE-NW",
            "Rheinland-Pfalz": "DE-RP",
            "Saarland": "DE-SL",
            "Sachsen": "DE-SN",
            "Sachsen-Anhalt": "DE-ST",
            "Schleswig-Holstein": "DE-SH",
            "Th�ringen": "DE-TH"
        }
    },

    "GH": {
        "code": "GH",
        "name": "Ghana",
        "zone": 0,
        "states": {
            "Ashanti": "GH-AH",
            "Brong-Ahafo": "GH-BA",
            "Central": "GH-CP",
            "Eastern": "GH-EP",
            "Greater Accra": "GH-AA",
            "Northern": "GH-NP",
            "Upper East": "GH-UE",
            "Upper West": "GH-UW",
            "Volta": "GH-TV",
            "Western": "GH-WP"
        }
    },

    "GI": {
        "code": "GI",
        "name": "Gibraltar",
        "zone": 0,
        "states": {}
    },

    "GR": {
        "code": "GR",
        "name": "Greece",
        "zone": 0,
        "states": {
            "Acha�a": "GR-13",
            "Agio Oros": "GR-69",
            "Aitolia kai Akarnania": "GR-01",
            "Argolida": "GR-11",
            "Arkadia": "GR-12",
            "Arta": "GR-31",
            "Attiki": "GR-A1",
            "Chalkidiki": "GR-64",
            "Chania": "GR-94",
            "Chios": "GR-85",
            "Dodekanisos": "GR-81",
            "Drama": "GR-52",
            "Evros": "GR-71",
            "Evrytania": "GR-05",
            "Evvoia": "GR-04",
            "Florina": "GR-63",
            "Fokida": "GR-07",
            "Fthiotida": "GR-06",
            "Grevena": "GR-51",
            "Ileia": "GR-14",
            "Imathia": "GR-53",
            "Ioannina": "GR-33",
            "Irakleio": "GR-91",
            "Karditsa": "GR-41",
            "Kastoria": "GR-56",
            "Kavala": "GR-55",
            "Kefallonia": "GR-23",
            "Kerkyra": "GR-22",
            "Kilkis": "GR-57",
            "Korinthia": "GR-15",
            "Kozani": "GR-58",
            "Kyklades": "GR-82",
            "Lakonia": "GR-16",
            "Larisa": "GR-42",
            "Lasithi": "GR-92",
            "Lefkada": "GR-24",
            "Lesvos": "GR-83",
            "Magnisia": "GR-43",
            "Messinia": "GR-17",
            "Pella": "GR-59",
            "Pieria": "GR-61",
            "Preveza": "GR-34",
            "Rethymno": "GR-93",
            "Rodopi": "GR-73",
            "Samos": "GR-84",
            "Serres": "GR-62",
            "Thesprotia": "GR-32",
            "Thessaloniki": "GR-54",
            "Trikala": "GR-44",
            "Voiotia": "GR-03",
            "Xanthi": "GR-72",
            "Zakynthos": "GR-21"
        }
    },

    "GL": {
        "code": "GL",
        "name": "Greenland",
        "zone": 0,
        "states": {
            "Kommune Kujalleq": "GL-KU",
            "Kommuneqarfik Sermersooq": "GL-SM",
            "Qaasuitsup Kommunia": "GL-QA",
            "Qeqqata Kommunia": "GL-QE"
        }
    },

    "GD": {
        "code": "GD",
        "name": "Grenada",
        "zone": 0,
        "states": {
            "Saint Andrew": "GD-01",
            "Saint David": "GD-02",
            "Saint George": "GD-03",
            "Saint John": "GD-04",
            "Saint Mark": "GD-05",
            "Saint Patrick": "GD-06",
            "Southern Grenadine Islands": "GD-10"
        }
    },

    "GP": {
        "code": "GP",
        "name": "Guadeloupe",
        "zone": 0,
        "states": {}
    },

    "GU": {
        "code": "GU",
        "name": "Guam",
        "zone": 0,
        "states": {}
    },

    "GT": {
        "code": "GT",
        "name": "Guatemala",
        "zone": 0,
        "states": {
            "Alta Verapaz": "GT-AV",
            "Baja Verapaz": "GT-BV",
            "Chimaltenango": "GT-CM",
            "Chiquimula": "GT-CQ",
            "El Progreso": "GT-PR",
            "Escuintla": "GT-ES",
            "Guatemala": "GT-GU",
            "Huehuetenango": "GT-HU",
            "Izabal": "GT-IZ",
            "Jalapa": "GT-JA",
            "Jutiapa": "GT-JU",
            "Pet�n": "GT-PE",
            "Quetzaltenango": "GT-QZ",
            "Quich�": "GT-QC",
            "Retalhuleu": "GT-RE",
            "Sacatep�quez": "GT-SA",
            "San Marcos": "GT-SM",
            "Santa Rosa": "GT-SR",
            "Solol�": "GT-SO",
            "Suchitep�quez": "GT-SU",
            "Totonicap�n": "GT-TO",
            "Zacapa": "GT-ZA"
        }
    },

    "GG": {
        "code": "GG",
        "name": "Guernsey",
        "zone": 0,
        "states": {
            // "Guernsey": "GGY-GGY"
        }
    },

    "GN": {
        "code": "GN",
        "name": "Guinea",
        "zone": 0,
        "states": {
            "Beyla": "GN-BE",
            "Boffa": "GN-BF",
            "Bok�": "GN-BK",
            "Conakry": "GN-C",
            "Coyah": "GN-CO",
            "Dabola": "GN-DB",
            "Dalaba": "GN-DL",
            "Dinguiraye": "GN-DI",
            "Dubr�ka": "GN-DU",
            "Faranah": "GN-FA",
            "For�cariah": "GN-FO",
            "Fria": "GN-FR",
            "Gaoual": "GN-GA",
            "Gu�k�dou": "GN-GU",
            "Kankan": "GN-KA",
            "K�rouan�": "GN-KE",
            "Kindia": "GN-KD",
            "Kissidougou": "GN-KS",
            "Koubia": "GN-KB",
            "Koundara": "GN-KN",
            "Kouroussa": "GN-KO",
            "Lab�": "GN-LA",
            "L�louma": "GN-LE",
            "Lola": "GN-LO",
            "Macenta": "GN-MC",
            "Mali": "GN-ML",
            "Mamou": "GN-MM",
            "Mandiana": "GN-MD",
            "Nz�r�kor�": "GN-NZ",
            "Pita": "GN-PI",
            "Siguiri": "GN-SI",
            "T�lim�l�": "GN-TE",
            "Tougu�": "GN-TO",
            "Yomou": "GN-YO"
        }
    },

    "GW": {
        "code": "GW",
        "name": "Guinea-bissau",
        "zone": 0,
        "states": {
            "Bafat�": "GW-BA",
            "Biombo": "GW-BM",
            "Bissau": "GW-BS",
            "Bolama": "GW-BL",
            "Cacheu": "GW-CA",
            "Gab�": "GW-GA",
            "Oio": "GW-OI",
            "Quinara": "GW-QU",
            "Tombali": "GW-TO"
        }
    },

    "GY": {
        "code": "GY",
        "name": "Guyana",
        "zone": 0,
        "states": {
            "Barima-Waini": "GY-BA",
            "Cuyuni-Mazaruni": "GY-CU",
            "Demerara-Mahaica": "GY-DE",
            "East Berbice-Corentyne": "GY-EB",
            "Essequibo Islands-West Demerara": "GY-ES",
            "Mahaica-Berbice": "GY-MA",
            "Pomeroon-Supenaam": "GY-PM",
            "Potaro-Siparuni": "GY-PT",
            "Upper Demerara-Berbice": "GY-UD",
            "Upper Takutu-Upper Essequibo": "GY-UT"
        }
    },

    "HT": {
        "code": "HT",
        "name": "Haiti",
        "zone": 0,
        "states": {
            "Artibonite": "HT-AR",
            "Centre": "HT-CE",
            "Grande-Anse": "HT-GA",
            "Nord": "HT-ND",
            "Nord-Est": "HT-NE",
            "Nord-Ouest": "HT-NO",
            "Ouest": "HT-OU",
            "Sud": "HT-SD",
            "Sud-Est": "HT-SE"
        }
    },

    "HM": {
        "code": "HM",
        "name": "Heard and Mc Donald Islands",
        "zone": 0,
        "states": {}
    },

    "HN": {
        "code": "HN",
        "name": "Honduras",
        "zone": 0,
        "states": {
            "Atl�ntida": "HN-AT",
            "Choluteca": "HN-CH",
            "Col�n": "HN-CL",
            "Comayagua": "HN-CM",
            "Cop�n": "HN-CP",
            "Cort�s": "HN-CR",
            "El Para�so": "HN-EP",
            "Francisco Moraz�n": "HN-FM",
            "Gracias a Dios": "HN-GD",
            "Intibuc�": "HN-IN",
            "Islas de la Bah�a": "HN-IB",
            "La Paz": "HN-LP",
            "Lempira": "HN-LE",
            "Ocotepeque": "HN-OC",
            "Olancho": "HN-OL",
            "Santa B�rbara": "HN-SB",
            "Valle": "HN-VA",
            "Yoro": "HN-YO"
        }
    },

    "HK": {
        "code": "HK",
        "name": "Hong Kong",
        "zone": 0,
        "states": {}
    },

    "HU": {
        "code": "HU",
        "name": "Hungary",
        "zone": 0,
        "states": {
            "B�cs-Kiskun": "HU-BK",
            "Baranya": "HU-BA",
            "B�k�s": "HU-BE",
            "B�k�scsaba": "HU-BC",
            "Borsod-Aba�j-Zempl�n": "HU-BZ",
            "Budapest": "HU-BU",
            "Csongr�d": "HU-CS",
            "Debrecen": "HU-DE",
            "Duna�jv�ros": "HU-DU",
            "Eger": "HU-EG",
            "Erd": "HU-ER",
            "Fej�r": "HU-FE",
            "Gyor": "HU-GY",
            "Gyor-Moson-Sopron": "HU-GS",
            "Hajd�-Bihar": "HU-HB",
            "Heves": "HU-HE",
            "H�dmezov�s�rhely": "HU-HV",
            "J�sz-Nagykun-Szolnok": "HU-JN",
            "Kaposv�r": "HU-KV",
            "Kecskem�t": "HU-KM",
            "Kom�rom-Esztergom": "HU-KE",
            "Miskolc": "HU-MI",
            "Nagykanizsa": "HU-NK",
            "N�gr�d": "HU-NO",
            "Ny�regyh�za": "HU-NY",
            "P�cs": "HU-PS",
            "Pest": "HU-PE",
            "Salg�tarj�n": "HU-ST",
            "Somogy": "HU-SO",
            "Sopron": "HU-SN",
            "Szabolcs-Szatm�r-Bereg": "HU-SZ",
            "Szeged": "HU-SD",
            "Sz�kesfeh�rv�r": "HU-SF",
            "Szeksz�rd": "HU-SS",
            "Szolnok": "HU-SK",
            "Szombathely": "HU-SH",
            "Tatab�nya": "HU-TB",
            "Tolna": "HU-TO",
            "Vas": "HU-VA",
            "Veszpr�m": "HU-VE",
            "Veszpr�m City": "HU-VM",
            "Zala": "HU-ZA",
            "Zalaegerszeg": "HU-ZE"
        }
    },

    "IS": {
        "code": "IS",
        "name": "Iceland",
        "zone": 0,
        "states": {
            "Austurland": "IS-7",
            "H�fu�borgarsv��i utan Reykjav�kur": "IS-1",
            "Nor�urland eystra": "IS-6",
            "Nor�urland vestra": "IS-5",
            "Reykjav�k": "IS-0",
            "Su�urland": "IS-8",
            "Su�urnes": "IS-2",
            "Vestfir�ir": "IS-4",
            "Vesturland": "IS-3"
        }
    },

    "IN": {
        "code": "IN",
        "name": "India",
        "zone": 0,
        "states": {
            "Andaman and Nicobar Islands": "IN-AN",
            "Andhra Pradesh": "IN-AP",
            "Arunachal Pradesh": "IN-AR",
            "Assam": "IN-AS",
            "Bihar": "IN-BR",
            "Chandigarh": "IN-CH",
            "Chhattisgarh": "IN-CT",
            "Dadra and Nagar Haveli": "IN-DN",
            "Daman and Diu": "IN-DD",
            "Delhi": "IN-DL",
            "Goa": "IN-GA",
            "Gujarat": "IN-GJ",
            "Haryana": "IN-HR",
            "Himachal Pradesh": "IN-HP",
            "Jammu and Kashmir": "IN-JK",
            "Jharkhand": "IN-JH",
            "Karnataka": "IN-KA",
            "Kerala": "IN-KL",
            "Lakshadweep": "IN-LD",
            "Madhya Pradesh": "IN-MP",
            "Maharashtra": "IN-MH",
            "Manipur": "IN-MN",
            "Meghalaya": "IN-ML",
            "Mizoram": "IN-MZ",
            "Nagaland": "IN-NL",
            "Orissa": "IN-OR",
            "Pondicherry": "IN-PY",
            "Punjab": "IN-PB",
            "Rajasthan": "IN-RJ",
            "Sikkim": "IN-SK",
            "Tamil Nadu": "IN-TN",
            "Tripura": "IN-TR",
            "Uttar Pradesh": "IN-UP",
            "Uttarakhand": "IN-UT",
            "Uttaranchal": "IN-UL",
            "West Bengal": "IN-WB"
        }
    },

    "ID": {
        "code": "ID",
        "name": "Indonesia",
        "zone": 0,
        "states": {
            "Aceh": "ID-AC",
            "Bali": "ID-BA",
            "Bangka Belitung": "ID-BB",
            "Banten": "ID-BT",
            "Bengkulu": "ID-BE",
            "Gorontalo": "ID-GO",
            "Jakarta Raya": "ID-JK",
            "Jambi": "ID-JA",
            "Jawa Barat": "ID-JB",
            "Jawa Tengah": "ID-JT",
            "Jawa Timur": "ID-JI",
            "Kalimantan Barat": "ID-KB",
            "Kalimantan Selatan": "ID-KS",
            "Kalimantan Tengah": "ID-KT",
            "Kalimantan Timur": "ID-KI",
            "Kepulauan Riau": "ID-KR",
            "Lampung": "ID-LA",
            "Maluku": "ID-MA",
            "Maluku Utara": "ID-MU",
            "Nusa Tenggara Barat": "ID-NB",
            "Nusa Tenggara Timur": "ID-NT",
            "Papua": "ID-PA",
            "Papua Barat": "ID-PB",
            "Riau": "ID-RI",
            "Sulawesi Barat": "ID-SR",
            "Sulawesi Selatan": "ID-SN",
            "Sulawesi Tengah": "ID-ST",
            "Sulawesi Tenggara": "ID-SG",
            "Sulawesi Utara": "ID-SA",
            "Sumatera Barat": "ID-SB",
            "Sumatera Selatan": "ID-SS",
            "Sumatera Utara": "ID-SU",
            "Yogyakarta": "ID-YO"
        }
    },

    "IR": {
        "code": "IR",
        "name": "Iran (Islamic Republic of)",
        "zone": 0,
        "states": {
            "Ardabil": "IR-03",
            "Az�arbayjan-e Gharbi": "IR-02",
            "Az�arbayjan-e Sharqi": "IR-01",
            "Bushehr": "IR-06",
            "Chahar Mah�all va Bakhtiari": "IR-08",
            "Esfahan": "IR-04",
            "Fars": "IR-14",
            "Gilan": "IR-19",
            "Golestan": "IR-27",
            "Hamadan": "IR-24",
            "Hormozgan": "IR-23",
            "Ilam": "IR-05",
            "Kerman": "IR-15",
            "Kermanshah": "IR-17",
            "Khorasan": "IR-09",
            "Khorasan-e Janubi": "IR-29",
            "Khorasan-e Razavi": "IR-30",
            "Khorasan-e Shemali": "IR-31",
            "Khuzestan": "IR-10",
            "Kohkiluyeh va Buyer Ahmad": "IR-18",
            "Kordestan": "IR-16",
            "Lorestan": "IR-20",
            "Markazi": "IR-22",
            "Mazandaran": "IR-21",
            "Qazvin": "IR-28",
            "Qom": "IR-26",
            "Semnan": "IR-12",
            "Sistan va Baluchestan": "IR-13",
            "Tehran": "IR-07",
            "Yazd": "IR-25",
            "Zanjan": "IR-11"
        }
    },

    "IQ": {
        "code": "IQ",
        "name": "Iraq",
        "zone": 0,
        "states": {
            "Al Anbar": "IQ-AN",
            "Al Basrah": "IQ-BA",
            "Al Muthann�": "IQ-MU",
            "Al Qadisiyah": "IQ-QA",
            "An Najaf": "IQ-NA",
            "Arbil": "IQ-AR",
            "As Sulaymaniyah": "IQ-SU",
            "At Ta'mim": "IQ-TS",
            "Babil": "IQ-BB",
            "Baghdad": "IQ-BG",
            "Dahuk": "IQ-DA",
            "Dhi Qar": "IQ-DQ",
            "Diyal�": "IQ-DI",
            "Karbala'": "IQ-KA",
            "Maysan": "IQ-MA",
            "Ninaw�": "IQ-NI",
            "Salah ad Din": "IQ-SD",
            "Wasit": "IQ-WA"
        }
    },

    "IE": {
        "code": "IE",
        "name": "Ireland",
        "zone": 0,
        "states": {
            "Carlow": "IE-CW",
            "Cavan": "IE-CN",
            "Clare": "IE-CE",
            "Cork": "IE-C",
            "Donegal": "IE-DL",
            "Dublin": "IE-D",
            "Galway": "IE-G",
            "Kerry": "IE-KY",
            "Kildare": "IE-KE",
            "Kilkenny": "IE-KK",
            "Laois": "IE-LS",
            "Leitrim": "IE-LM",
            "Limerick": "IE-LK",
            "Longford": "IE-LD",
            "Louth": "IE-LH",
            "Mayo": "IE-MO",
            "Meath": "IE-MH",
            "Monaghan": "IE-MN",
            "Offaly": "IE-OY",
            "Roscommon": "IE-RN",
            "Sligo": "IE-SO",
            "Tipperary": "IE-TA",
            "Waterford": "IE-WD",
            "Westmeath": "IE-WH",
            "Wexford": "IE-WX",
            "Wicklow": "IE-WW"
        }
    },

    "IM": {
        "code": "IM",
        "name": "Isle of Man",
        "zone": 0,
        "states": {
            // "Isle of Man": "IMN-IOM"
        }
    },

    "IL": {
        "code": "IL",
        "name": "Israel",
        "zone": 0,
        "states": {
            "HaDarom": "IL-D",
            "Haifa": "IL-HA",
            "HaMerkaz": "IL-M",
            "HaZafon": "IL-Z",
            "Tel-Aviv": "IL-TA",
            "Yerushalayim": "IL-JM"
        }
    },

    "IT": {
        "code": "IT",
        "name": "Italy",
        "zone": 0,
        "states": {
            "Abruzzo": "IT-65",
            "Agrigento": "IT-AG",
            "Alessandria": "IT-AL",
            "Ancona": "IT-AN",
            "Aosta": "IT-AO",
            "Arezzo": "IT-AR",
            "Ascoli Piceno": "IT-AP",
            "Asti": "IT-AT",
            "Avellino": "IT-AV",
            "Bari": "IT-BA",
            "Barletta-Andria-Trani": "IT-BT",
            "Basilicata": "IT-77",
            "Belluno": "IT-BL",
            "Benevento": "IT-BN",
            "Bergamo": "IT-BG",
            "Biella": "IT-BI",
            "Bologna": "IT-BO",
            "Bolzano": "IT-BZ",
            "Brescia": "IT-BS",
            "Brindisi": "IT-BR",
            "Cagliari": "IT-CA",
            "Calabria": "IT-78",
            "Caltanissetta": "IT-CL",
            "Campania": "IT-72",
            "Campobasso": "IT-CB",
            "Carbonia-Iglesias": "IT-CI",
            "Caserta": "IT-CE",
            "Catania": "IT-CT",
            "Catanzaro": "IT-CZ",
            "Chieti": "IT-CH",
            "Como": "IT-CO",
            "Cosenza": "IT-CS",
            "Cremona": "IT-CR",
            "Crotone": "IT-KR",
            "Cuneo": "IT-CN",
            "Emilia-Romagna": "IT-45",
            "Enna": "IT-EN",
            "Fermo": "IT-FM",
            "Ferrara": "IT-FE",
            "Firenze": "IT-FI",
            "Foggia": "IT-FG",
            "Forli-Cesena": "IT-FC",
            "Friuli-Venezia Giulia": "IT-36",
            "Frosinone": "IT-FR",
            "Genova": "IT-GE",
            "Gorizia": "IT-GO",
            "Grosseto": "IT-GR",
            "Imperia": "IT-IM",
            "Isernia": "IT-IS",
            "L'Aquila": "IT-AQ",
            "La Spezia": "IT-SP",
            "Latina": "IT-LT",
            "Lazio": "IT-62",
            "Lecce": "IT-LE",
            "Lecco": "IT-LC",
            "Liguria": "IT-42",
            "Livorno": "IT-LI",
            "Lodi": "IT-LO",
            "Lombardia": "IT-25",
            "Lucca": "IT-LU",
            "Macerata": "IT-MC",
            "Mantova": "IT-MN",
            "Marche": "IT-57",
            "Massa-Carrara": "IT-MS",
            "Matera": "IT-MT",
            "Medio Campidano": "IT-VS",
            "Messina": "IT-ME",
            "Milano": "IT-MI",
            "Modena": "IT-MO",
            "Molise": "IT-67",
            "Monza e Brianza": "IT-MB",
            "Napoli": "IT-NA",
            "Novara": "IT-NO",
            "Nuoro": "IT-NU",
            "Ogliastra": "IT-OG",
            "Olbia-Tempio": "IT-OT",
            "Oristano": "IT-OR",
            "Padova": "IT-PD",
            "Palermo": "IT-PA",
            "Parma": "IT-PR",
            "Pavia": "IT-PV",
            "Perugia": "IT-PG",
            "Pesaro e Urbino": "IT-PU",
            "Pescara": "IT-PE",
            "Piacenza": "IT-PC",
            "Piemonte": "IT-21",
            "Pisa": "IT-PI",
            "Pistoia": "IT-PT",
            "Pordenone": "IT-PN",
            "Potenza": "IT-PZ",
            "Prato": "IT-PO",
            "Puglia": "IT-75",
            "Ragusa": "IT-RG",
            "Ravenna": "IT-RA",
            "Reggio Calabria": "IT-RC",
            "Reggio Emilia": "IT-RE",
            "Rieti": "IT-RI",
            "Rimini": "IT-RN",
            "Roma": "IT-RM",
            "Rovigo": "IT-RO",
            "Salerno": "IT-SA",
            "Sardegna": "IT-88",
            "Sassari": "IT-SS",
            "Savona": "IT-SV",
            "Sicilia": "IT-82",
            "Siena": "IT-SI",
            "Siracusa": "IT-SR",
            "Sondrio": "IT-SO",
            "Taranto": "IT-TA",
            "Teramo": "IT-TE",
            "Terni": "IT-TR",
            "Torino": "IT-TO",
            "Toscana": "IT-52",
            "Trapani": "IT-TP",
            "Trentino-Alto Adige": "IT-32",
            "Trento": "IT-TN",
            "Treviso": "IT-TV",
            "Trieste": "IT-TS",
            "Udine": "IT-UD",
            "Umbria": "IT-55",
            "Valle d'Aosta": "IT-23",
            "Varese": "IT-VA",
            "Veneto": "IT-34",
            "Venezia": "IT-VE",
            "Verbano-Cusio-Ossola": "IT-VB",
            "Vercelli": "IT-VC",
            "Verona": "IT-VR",
            "Vibo Valentia": "IT-VV",
            "Vicenza": "IT-VI",
            "Viterbo": "IT-VT"
        }
    },

    "JM": {
        "code": "JM",
        "name": "Jamaica",
        "zone": 0,
        "states": {
            "Clarendon": "JM-13",
            "Hanover": "JM-09",
            "Kingston": "JM-01",
            "Manchester": "JM-12",
            "Portland": "JM-04",
            "Saint Andrew": "JM-02",
            "Saint Ann": "JM-06",
            "Saint Catherine": "JM-14",
            "Saint Elizabeth": "JM-11",
            "Saint James": "JM-08",
            "Saint Mary": "JM-05",
            "Saint Thomas": "JM-03",
            "Trelawny": "JM-07",
            "Westmoreland": "JM-10"
        }
    },

    "JP": {
        "code": "JP",
        "name": "Japan",
        "zone": 0,
        "states": {
            "Aiti": "JP-23",
            "Akita": "JP-05",
            "Aomori": "JP-02",
            "Ehime": "JP-38",
            "Gihu": "JP-21",
            "Gunma": "JP-10",
            "Hirosima": "JP-34",
            "Hokkaid�": "JP-01",
            "Hukui": "JP-18",
            "Hukuoka": "JP-40",
            "Hukusima": "JP-07",
            "Hy�go": "JP-28",
            "Ibaraki": "JP-08",
            "Isikawa": "JP-17",
            "Iwate": "JP-03",
            "Kagawa": "JP-37",
            "Kagosima": "JP-46",
            "Kanagawa": "JP-14",
            "K�ti": "JP-39",
            "Kumamoto": "JP-43",
            "Ky�to": "JP-26",
            "Mie": "JP-24",
            "Miyagi": "JP-04",
            "Miyazaki": "JP-45",
            "Nagano": "JP-20",
            "Nagasaki": "JP-42",
            "Nara": "JP-29",
            "Niigata": "JP-15",
            "�ita": "JP-44",
            "Okayama": "JP-33",
            "Okinawa": "JP-47",
            "�saka": "JP-27",
            "Saga": "JP-41",
            "Saitama": "JP-11",
            "Siga": "JP-25",
            "Simane": "JP-32",
            "Sizuoka": "JP-22",
            "Tiba": "JP-12",
            "Tokusima": "JP-36",
            "T�ky�": "JP-13",
            "Totigi": "JP-09",
            "Tottori": "JP-31",
            "Toyama": "JP-16",
            "Wakayama": "JP-30",
            "Yamagata": "JP-06",
            "Yamaguti": "JP-35",
            "Yamanasi": "JP-19"
        }
    },

    "JY": {
        "code": "JY",
        "name": "Jersey",
        "zone": 0,
        "states": {
            // "Jersey": "JEY-JEY"
        }
    },

    "JO": {
        "code": "JO",
        "name": "Jordan",
        "zone": 0
    },

    "KZ": {
        "code": "KZ",
        "name": "Kazakhstan",
        "zone": 0,
        "states": {
            "Almaty": "KZ-ALA",
            "Almaty oblysy": "KZ-ALM",
            "Aqmola oblysy": "KZ-AKM",
            "Aqt�be oblysy": "KZ-AKT",
            "Astana": "KZ-AST",
            "Atyrau oblysy": "KZ-ATY",
            "Batys Qazaqstan oblysy": "KZ-ZAP",
            "Bayqongyr": "KZ-BAY",
            "Mangghystau oblysy": "KZ-MAN",
            "Ongt�stik Qazaqstan oblysy": "KZ-YUZ",
            "Pavlodar oblysy": "KZ-PAV",
            "Qaraghandy oblysy": "KZ-KAR",
            "Qostanay oblysy": "KZ-KUS",
            "Qyzylorda oblysy": "KZ-KZY",
            "Shyghys Qazaqstan oblysy": "KZ-VOS",
            "Solt�stik Qazaqstan oblysy": "KZ-SEV",
            "Zhambyl oblysy": "KZ-ZHA"
        }
    },

    "KE": {
        "code": "KE",
        "name": "Kenya",
        "zone": 0,
        "states": {
            "Central": "KE-200",
            "Coast": "KE-300",
            "Eastern": "KE-400",
            "Nairobi": "KE-110",
            "North-Eastern": "KE-500",
            "Nyanza": "KE-600",
            "Rift Valley": "KE-700",
            "Western": "KE-900"
        }
    },

    "KI": {
        "code": "KI",
        "name": "Kiribati",
        "zone": 0,
        "states": {
            "Gilbert Islands": "KI-G",
            "Line Islands": "KI-L",
            "Phoenix Islands": "KI-P"
        }
    },

    "KP": {
        "code": "KP",
        "name": "Korea, Democratic People's Republic of",
        "zone": 0,
        "states": {
            "Chagang-do": "KP-04",
            "Hamgyong-bukdo": "KP-09",
            "Hamgyong-namdo": "KP-08",
            "Hwanghae-bukto": "KP-06",
            "Hwanghae-namdo": "KP-05",
            "Kangwon-do": "KP-07",
            "Nason": "KP-13",
            "Pyongan-bukdo": "KP-03",
            "Pyongan-namdo": "KP-02",
            "Pyongyang": "KP-01",
            "Yanggang-do": "KP-10"
        }
    },

    "KR": {
        "code": "KR",
        "name": "Korea, Republic of",
        "zone": 0,
        "states": {
            "Busan Gwang'yeogs": "KR-26",
            "Chungcheongbugdo": "KR-43",
            "Chungcheongnamdo": "KR-44",
            "Daegu Gwang'yeogs": "KR-27",
            "Daejeon Gwang'yeog": "KR-30",
            "Gang'weondo": "KR-42",
            "Gwangju Gwang'yeogs": "KR-29",
            "Gyeonggido": "KR-41",
            "Gyeongsangbugdo": "KR-47",
            "Gyeongsangnamdo": "KR-48",
            "Incheon Gwang'yeog": "KR-28",
            "Jejudo": "KR-49",
            "Jeonrabugdo": "KR-45",
            "Jeonranamdo": "KR-46",
            "Seoul Teugbyeolsi": "KR-11",
            "Ulsan Gwang'yeogs": "KR-31"
        }
    },

    "KW": {
        "code": "KW",
        "name": "Kuwait",
        "zone": 0,
        "states": {
            "Al Ahmadi": "KW-AH",
            "Al Farwaniyah": "KW-FA",
            "Al Jahrah": "KW-JA",
            "Al Kuwayt": "KW-KU",
            "Hawalli": "KW-HA",
            "Mubarak al-Kabir": "KW-MU"
        }
    },

    "KG": {
        "code": "KG",
        "name": "Kyrgyzstan",
        "zone": 0,
        "states": {
            "Batken": "KG-B",
            "Bishkek": "KG-GB",
            "Ch�": "KG-C",
            "Jalal-Abad": "KG-J",
            "Naryn": "KG-N",
            "Osh": "KG-O",
            "Talas": "KG-T",
            "Ysyk-K�l": "KG-Y"
        }
    },

    "LA": {
        "code": "LA",
        "name": "Lao People's Democratic Republic",
        "zone": 0,
        "states": {
            "Attapu": "LA-AT",
            "Bok�o": "LA-BK",
            "Bolikhamx": "LA-BL",
            "Champasak": "LA-CH",
            "Houaphan": "LA-HO",
            "Khammouan": "LA-KH",
            "Louang Namtha": "LA-LM",
            "Louangphabang": "LA-LP",
            "Oud�mxai": "LA-OU",
            "Ph�ngsali": "LA-PH",
            "Salavan": "LA-SL",
            "Savannakh�t": "LA-SV",
            "Vientiane": "LA-VI",
            "Vientiane Prefecture": "LA-VT",
            "Xaignabou": "LA-XA",
            "Xais�mboun": "LA-XN",
            "X�kong": "LA-XE",
            "Xiangkhoang": "LA-XI"
        }
    },

    "LV": {
        "code": "LV",
        "name": "Latvia",
        "zone": 0,
        "states": {
            "Aizkraukles Aprinkis": "LV-AI",
            "Aluksnes Aprinkis": "LV-AL",
            "Balvu Aprinkis": "LV-BL",
            "Bauskas Aprinkis": "LV-BU",
            "Cesu Aprinkis": "LV-CE",
            "Daugavpils": "LV-DGV",
            "Daugavpils Aprinkis": "LV-DA",
            "Dobeles Aprinkis": "LV-DO",
            "Gulbenes Aprinkis": "LV-GU",
            "Jekabpils Aprinkis": "LV-JK",
            "Jelgava": "LV-JEL",
            "Jelgavas Aprinkis": "LV-JL",
            "Jurmala": "LV-JUR",
            "Kraslavas Aprinkis": "LV-KR",
            "Kuldigas Aprinkis": "LV-KU",
            "Liepaja": "LV-LPX",
            "Liepajas Aprinkis": "LV-LE",
            "Limbazu Aprinkis": "LV-LM",
            "Ludzas Aprinkis": "LV-LU",
            "Madonas Aprinkis": "LV-MA",
            "Ogres Aprinkis": "LV-OG",
            "Preilu Aprinkis": "LV-PR",
            "Rezekne": "LV-REZ",
            "Rezeknes Aprinkis": "LV-RE",
            "Riga": "LV-RIX",
            "Rigas Aprinkis": "LV-RI",
            "Saldus Aprinkis": "LV-SA",
            "Talsu Aprinkis": "LV-TA",
            "Tukuma Aprinkis": "LV-TU",
            "Valkas Aprinkis": "LV-VK",
            "Valmieras Aprinkis": "LV-VM",
            "Ventspils": "LV-VEN",
            "Ventspils Aprinkis": "LV-VE"
        }
    },

    "LB": {
        "code": "LB",
        "name": "Lebanon",
        "zone": 0,
        "states": {
            "Beirut": "LB-BA",
            "El B�qaa": "LB-BI",
            "Jabal Loubn�ne": "LB-JL",
            "Loubn�ne ech Chem�li": "LB-AS",
            "Loubn�ne ej Jno�bi": "LB-JA",
            "Nabat�y�": "LB-NA"
        }
    },

    "LS": {
        "code": "LS",
        "name": "Lesotho",
        "zone": 0,
        "states": {
            "Berea": "LS-D",
            "Butha-Buthe": "LS-B",
            "Leribe": "LS-C",
            "Mafeteng": "LS-E",
            "Maseru": "LS-A",
            "Mohale's Hoek": "LS-F",
            "Mokhotlong": "LS-J",
            "Qacha's Nek": "LS-H",
            "Quthing": "LS-G",
            "Thaba-Tseka": "LS-K"
        }
    },

    "LR": {
        "code": "LR",
        "name": "Liberia",
        "zone": 0,
        "states": {
            "Bomi": "LR-BM",
            "Bong": "LR-BG",
            "Gbarpolu": "LR-X1",
            "Grand Bassa": "LR-GB",
            "Grand Cape Mount": "LR-CM",
            "Grand Gedeh": "LR-GG",
            "Grand Kru": "LR-GK",
            "Lofa": "LR-LO",
            "Margibi": "LR-MG",
            "Maryland": "LR-MY",
            "Montserrado": "LR-MO",
            "Nimba": "LR-NI",
            "River Gee": "LR-X2",
            "Rivercess": "LR-RI",
            "Sinoe": "LR-SI"
        }
    },

    "LY": {
        "code": "LY",
        "name": "Libyan Arab Jamahiriya",
        "zone": 0
    },

    "LI": {
        "code": "LI",
        "name": "Liechtenstein",
        "zone": 0,
        "states": {
            "Balzers": "LI-01",
            "Eschen": "LI-02",
            "Gamprin": "LI-03",
            "Mauren": "LI-04",
            "Planken": "LI-05",
            "Ruggell": "LI-06",
            "Schaan": "LI-07",
            "Schellenberg": "LI-08",
            "Triesen": "LI-09",
            "Triesenberg": "LI-10",
            "Vaduz": "LI-11"
        }
    },

    "LT": {
        "code": "LT",
        "name": "Lithuania",
        "zone": 0
    },

    "LU": {
        "code": "LU",
        "name": "Luxembourg",
        "zone": 0,
        "states": {
            "Diekirch": "LU-D",
            "Grevenmacher": "LU-G",
            "Luxembourg": "LU-L"
        }
    },

    "MO": {
        "code": "MO",
        "name": "Macau",
        "zone": 0,
        "states": {}
    },

    "MK": {
        "code": "MK",
        "name": "Macedonia, The Former Yugoslav Republic of",
        "zone": 0
    },

    "MG": {
        "code": "MG",
        "name": "Madagascar",
        "zone": 0,
        "states": {
            "Antananarivo": "MG-T",
            "Antsiranana": "MG-D",
            "Fianarantsoa": "MG-F",
            "Mahajanga": "MG-M",
            "Toamasina": "MG-A",
            "Toliara": "MG-U"
        }
    },

    "MW": {
        "code": "MW",
        "name": "Malawi",
        "zone": 0,
        "states": {
            "Balaka": "MW-BA",
            "Blantyre": "MW-BL",
            "Central Region": "MW-C",
            "Chikwawa": "MW-CK",
            "Chiradzulu": "MW-CR",
            "Chitipa": "MW-CT",
            "Dedza": "MW-DE",
            "Dowa": "MW-DO",
            "Karonga": "MW-KR",
            "Kasungu": "MW-KS",
            "Likoma": "MW-LK",
            "Lilongwe": "MW-LI",
            "Machinga": "MW-MH",
            "Mangochi": "MW-MG",
            "Mchinji": "MW-MC",
            "Mulanje": "MW-MU",
            "Mwanza": "MW-MW",
            "Mzimba": "MW-MZ",
            "Neno": "MW-NE",
            "Nkhata Bay": "MW-NB",
            "Nkhotakota": "MW-NK",
            "Northern Region": "MW-N",
            "Nsanje": "MW-NS",
            "Ntcheu": "MW-NU",
            "Ntchisi": "MW-NI",
            "Phalombe": "MW-PH",
            "Rumphi": "MW-RU",
            "Salima": "MW-SA",
            "Southern Region": "MW-S",
            "Thyolo": "MW-TH",
            "Zomba": "MW-ZO"
        }
    },

    "MY": {
        "code": "MY",
        "name": "Malaysia",
        "zone": 0,
        "states": {
            "Johor": "MY-01",
            "Kedah": "MY-02",
            "Kelantan": "MY-03",
            "Melaka": "MY-04",
            "Negeri Sembilan": "MY-05",
            "Pahang": "MY-06",
            "Perak": "MY-08",
            "Perlis": "MY-09",
            "Pulau Pinang": "MY-07",
            "Sabah": "MY-12",
            "Sarawak": "MY-13",
            "Selangor": "MY-10",
            "Terengganu": "MY-11",
            "Wilayah Persekutuan Kuala Lumpur": "MY-14",
            "Wilayah Persekutuan Labuan": "MY-15",
            "Wilayah Persekutuan Putrajaya": "MY-16"
        }
    },

    "MV": {
        "code": "MV",
        "name": "Maldives",
        "zone": 0,
        "states": {
            "Alif": "MV-02",
            "Alif Dhaal": "MV-X1",
            "Baa": "MV-20",
            "Dhaalu": "MV-17",
            "Faafu": "MV-14",
            "Gaaf Alif": "MV-27",
            "Gaafu Dhaalu": "MV-28",
            "Gnaviyani": "MV-29",
            "Haa Alif": "MV-07",
            "Haa Dhaalu": "MV-23",
            "Kaafu": "MV-26",
            "Laamu": "MV-05",
            "Lhaviyani": "MV-03",
            "Male": "MV-MLE",
            "Meemu": "MV-12",
            "Noonu": "MV-25",
            "Raa": "MV-13",
            "Seenu": "MV-01",
            "Shaviyani": "MV-24",
            "Thaa": "MV-08",
            "Vaavu": "MV-04"
        }
    },

    "ML": {
        "code": "ML",
        "name": "Mali",
        "zone": 0,
        "states": {
            "Bamako": "ML-BKO",
            "Gao": "ML-7",
            "Kayes": "ML-1",
            "Kidal": "ML-8",
            "Koulikoro": "ML-2",
            "Mopti": "ML-5",
            "S�gou": "ML-4",
            "Sikasso": "ML-3",
            "Tombouctou": "ML-6"
        }
    },

    "MT": {
        "code": "MT",
        "name": "Malta",
        "zone": 0,
        "states": {}
    },

    "MH": {
        "code": "MH",
        "name": "Marshall Islands",
        "zone": 0,
        "states": {
            "Ailinglaplap": "MH-ALL",
            "Ailuk": "MH-ALK",
            "Arno": "MH-ARN",
            "Aur": "MH-AUR",
            "Ebon": "MH-EBO",
            "Enewetak": "MH-ENI",
            "Jabat": "MH-JAB",
            "Jaluit": "MH-JAL",
            "Kili": "MH-KIL",
            "Kwajalein": "MH-KWA",
            "Lae": "MH-LAE",
            "Lib": "MH-LIB",
            "Likiep": "MH-LIK",
            "Majuro": "MH-MAJ",
            "Maloelap": "MH-MAL",
            "Mejit": "MH-MEJ",
            "Mili": "MH-MIL",
            "Namdrik": "MH-NMK",
            "Namu": "MH-NMU",
            "Rongelap": "MH-RON",
            "Ujae": "MH-UJA",
            "Utirik": "MH-UTI",
            "Wotho": "MH-WTH",
            "Wotje": "MH-WTJ"
        }
    },

    "MQ": {
        "code": "MQ",
        "name": "Martinique",
        "zone": 0,
        "states": {}
    },

    "MR": {
        "code": "MR",
        "name": "Mauritania",
        "zone": 0,
        "states": {
            "Adrar": "MR-07",
            "Assaba": "MR-03",
            "Brakna": "MR-05",
            "Dakhlet Nou�dhibou": "MR-08",
            "Gorgol": "MR-04",
            "Guidimaka": "MR-10",
            "Hodh ech Chargui": "MR-01",
            "Hodh el Gharbi": "MR-02",
            "Inchiri": "MR-12",
            "Nouakchott": "MR-NKC",
            "Tagant": "MR-09",
            "Tiris Zemmour": "MR-11",
            "Trarza": "MR-06"
        }
    },

    "MU": {
        "code": "MU",
        "name": "Mauritius",
        "zone": 0,
        "states": {
            "Agalega Islands": "MU-AG",
            "Beau Bassin-Rose Hill": "MU-BR",
            "Black River": "MU-BL",
            "Cargados Carajos Shoals": "MU-CC",
            "Curepipe": "MU-CU",
            "Flacq": "MU-FL",
            "Grand Port": "MU-GP",
            "Moka": "MU-MO",
            "Pamplemousses": "MU-PA",
            "Plaines Wilhems": "MU-PW",
            "Port Louis City": "MU-PL",
            "Port Louis District": "MU-PU",
            "Quatre Bornes": "MU-QB",
            "Rivi�re du Rempart": "MU-RR",
            "Rodrigues Island": "MU-RO",
            "Savanne": "MU-SA",
            "Vacoas-Phoenix": "MU-VP"
        }
    },

    "YT": {
        "code": "YT",
        "name": "Mayotte",
        "zone": 0,
        "states": {}
    },

    "MX": {
        "code": "MX",
        "name": "Mexico",
        "zone": 0,
        "states": {
            "Aguascalientes": "MX-AGU",
            "Baja California": "MX-BCN",
            "Baja California Sur": "MX-BCS",
            "Campeche": "MX-CAM",
            "Chiapas": "MX-CHP",
            "Chihuahua": "MX-CHH",
            "Coahuila": "MX-COA",
            "Colima": "MX-COL",
            "Distrito Federal": "MX-DIF",
            "Durango": "MX-DUR",
            "Guanajuato": "MX-GUA",
            "Guerrero": "MX-GRO",
            "Hidalgo": "MX-HID",
            "Jalisco": "MX-JAL",
            "M�xico": "MX-MEX",
            "Michoac�n": "MX-MIC",
            "Morelos": "MX-MOR",
            "Nayarit": "MX-NAY",
            "Nuevo Le�n": "MX-NLE",
            "Oaxaca": "MX-OAX",
            "Puebla": "MX-PUE",
            "Quer�taro": "MX-QUE",
            "Quintana Roo": "MX-ROO",
            "San Luis Potos�": "MX-SLP",
            "Sinaloa": "MX-SIN",
            "Sonora": "MX-SON",
            "Tabasco": "MX-TAB",
            "Tamaulipas": "MX-TAM",
            "Tlaxcala": "MX-TLA",
            "Veracruz": "MX-VER",
            "Yucat�n": "MX-YUC",
            "Zacatecas": "MX-ZAC"
        }
    },

    "FM": {
        "code": "FM",
        "name": "Micronesia, Federated States of",
        "zone": 0,
        "states": {
            "Chuuk": "FM-TRK",
            "Kosrae": "FM-KSA",
            "Pohnpei": "FM-PNI",
            "Yap": "FM-YAP"
        }
    },

    "MD": {
        "code": "MD",
        "name": "Moldova, Republic of",
        "zone": 0
    },

    "MC": {
        "code": "MC",
        "name": "Monaco",
        "zone": 0,
        "states": {}
    },

    "MN": {
        "code": "MN",
        "name": "Mongolia",
        "zone": 0,
        "states": {
            "Arhangay": "MN-073",
            "Bayan-�lgiy": "MN-071",
            "Bayanhongor": "MN-069",
            "Bulgan": "MN-067",
            "Darhan uul": "MN-037",
            "Dornod": "MN-061",
            "Dornogovi": "MN-063",
            "Dundgovi": "MN-059",
            "Dzavhan": "MN-057",
            "Govi-Altay": "MN-065",
            "Govi-S�mber": "MN-064",
            "Hentiy": "MN-039",
            "Hovd": "MN-043",
            "H�vsg�l": "MN-041",
            "�mn�govi": "MN-053",
            "Orhon": "MN-035",
            "�v�rhangay": "MN-055",
            "Selenge": "MN-049",
            "S�hbaatar": "MN-051",
            "T�v": "MN-047",
            "Ulaanbaatar": "MN-1",
            "Uvs": "MN-046"
        }
    },

    "MS": {
        "code": "MS",
        "name": "Montserrat",
        "zone": 0,
        "states": {}
    },

    "MA": {
        "code": "MA",
        "name": "Morocco",
        "zone": 0,
        "states": {
            "Al Haouz": "MA-HAO",
            "Al Hoce�ma": "MA-HOC",
            "Assa-Zag": "MA-ASZ",
            "Azilal": "MA-AZI",
            "Ben Slimane": "MA-BES",
            "Beni Mellal": "MA-BEM",
            "Berkane": "MA-BER",
            "Boujdour (EH)": "MA-BOD",
            "Boulemane": "MA-BOM",
            "Chefchaouen": "MA-CHE",
            "Chichaoua": "MA-CHI",
            "Chtouka-Ait Baha": "MA-CHT",
            "El Hajeb": "MA-HAJ",
            "El Jadida": "MA-JDI",
            "Errachidia": "MA-ERR",
            "Es Smara (EH)": "MA-ESM",
            "Essaouira": "MA-ESI",
            "Figuig": "MA-FIG",
            "Guelmim": "MA-GUE",
            "Ifrane": "MA-IFR",
            "Jrada": "MA-JRA",
            "Kelaat es Sraghna": "MA-KES",
            "K�nitra": "MA-KEN",
            "Khemisset": "MA-KHE",
            "Khenifra": "MA-KHN",
            "Khouribga": "MA-KHO",
            "La�youne": "MA-LAA",
            "Laayoune-Boujdour-Sakia El Hamra": "MA-X1",
            "Larache": "MA-LAR",
            "Mediouna": "MA-MED",
            "Moulay Yacoub": "MA-MOU",
            "Nador": "MA-NAD",
            "Nouaceur": "MA-NOU",
            "Ouarzazate": "MA-OUA",
            "Oued ed Dahab (EH)": "MA-OUD",
            "Safi": "MA-SAF",
            "Sefrou": "MA-SEF",
            "Settat": "MA-SET",
            "Sidi Kacem": "MA-SIK",
            "Tan-Tan": "MA-TNT",
            "Taounate": "MA-TAO",
            "Taourirt": "MA-TAI",
            "Taroudant": "MA-TAR",
            "Tata": "MA-TAT",
            "Taza": "MA-TAZ",
            "Tiznit": "MA-TIZ",
            "Zagora": "MA-ZAG"
        }
    },

    "MZ": {
        "code": "MZ",
        "name": "Mozambique",
        "zone": 0,
        "states": {
            "Cabo Delgado": "MZ-P",
            "Gaza": "MZ-G",
            "Inhambane": "MZ-I",
            "Manica": "MZ-B",
            "Maputo": "MZ-L",
            "Maputo City": "MZ-MPM",
            "Nampula": "MZ-N",
            "Niassa": "MZ-A",
            "Sofala": "MZ-S",
            "Tete": "MZ-T",
            "Zamb�zia": "MZ-Q"
        }
    },

    "MM": {
        "code": "MM",
        "name": "Myanmar",
        "zone": 0,
        "states": {
            "Ayeyarwady": "MM-07",
            "Bago": "MM-02",
            "Chin": "MM-14",
            "Kachin": "MM-11",
            "Kayah": "MM-12",
            "Kayin": "MM-13",
            "Magway": "MM-03",
            "Mandalay": "MM-04",
            "Mon": "MM-15",
            "Rakhine": "MM-16",
            "Sagaing": "MM-01",
            "Shan": "MM-17",
            "Tanintharyi": "MM-05",
            "Yangon": "MM-06"
        }
    },

    "NA": {
        "code": "NA",
        "name": "Namibia",
        "zone": 0,
        "states": {
            "Caprivi": "NA-CA",
            "Erongo": "NA-ER",
            "Hardap": "NA-HA",
            "Karas": "NA-KA",
            "Khomas": "NA-KH",
            "Kunene": "NA-KU",
            "Ohangwena": "NA-OW",
            "Okavango": "NA-OK",
            "Omaheke": "NA-OH",
            "Omusati": "NA-OS",
            "Oshana": "NA-ON",
            "Oshikoto": "NA-OT",
            "Otjozondjupa": "NA-OD"
        }
    },

    "NR": {
        "code": "NR",
        "name": "Nauru",
        "zone": 0,
        "states": {
            "Aiwo": "NR-01",
            "Anabar": "NR-02",
            "Anetan": "NR-03",
            "Anibare": "NR-04",
            "Baiti": "NR-05",
            "Boe": "NR-06",
            "Buada": "NR-07",
            "Denigomodu": "NR-08",
            "Ewa": "NR-09",
            "Ijuw": "NR-10",
            "Meneng": "NR-11",
            "Nibok": "NR-12",
            "Uaboe": "NR-13",
            "Yaren": "NR-14"
        }
    },

    "NP": {
        "code": "NP",
        "name": "Nepal",
        "zone": 0,
        "states": {
            "Bagmati": "NP-BA",
            "Bheri": "NP-BH",
            "Dhawalagiri": "NP-DH",
            "Gandaki": "NP-GA",
            "Janakpur": "NP-JA",
            "Karnali": "NP-KA",
            "Kosi": "NP-KO",
            "Lumbini": "NP-LU",
            "Mahakali": "NP-MA",
            "Mechi": "NP-ME",
            "Narayani": "NP-NA",
            "Rapti": "NP-RA",
            "Sagarmatha": "NP-SA",
            "Seti": "NP-SE"
        }
    },

    "NL": {
        "code": "NL",
        "name": "Netherlands",
        "zone": 0,
        "states": {
            "Drenthe": "NL-DR",
            "Flevoland": "NL-FL",
            "Friesland": "NL-FR",
            "Gelderland": "NL-GE",
            "Groningen": "NL-GR",
            "Limburg": "NL-LI",
            "Noord-Brabant": "NL-NB",
            "Noord-Holland": "NL-NH",
            "Overijssel": "NL-OV",
            "Utrecht": "NL-UT",
            "Zeeland": "NL-ZE",
            "Zuid-Holland": "NL-ZH"
        }
    },

    "AN": {
        "code": "AN",
        "name": "Netherlands Antilles",
        "zone": 0,
        "states": {}
    },

    "NC": {
        "code": "NC",
        "name": "New Caledonia",
        "zone": 0,
        "states": {}
    },

    "NZ": {
        "code": "NZ",
        "name": "New Zealand",
        "zone": 0,
        "states": {
            "Auckland": "NZ-AUK",
            "Bay of Plenty": "NZ-BOP",
            "Canterbury": "NZ-CAN",
            "Chatham Islands Territory": "NZ-CIT",
            "Gisborne District": "NZ-GIS",
            "Hawkes's Bay": "NZ-HKB",
            "Manawatu-Wanganui": "NZ-MWT",
            "Marlborough District": "NZ-MBH",
            "Nelson City": "NZ-NSN",
            "North Island": "NZ-N",
            "Northland": "NZ-NTL",
            "Otago": "NZ-OTA",
            "South Island": "NZ-S",
            "Southland": "NZ-STL",
            "Taranaki": "NZ-TKI",
            "Tasman District": "NZ-TAS",
            "Waikato": "NZ-WKO",
            "Wellington": "NZ-WGN",
            "West Coast": "NZ-WTC"
        }
    },

    "NI": {
        "code": "NI",
        "name": "Nicaragua",
        "zone": 0,
        "states": {
            "Atl�ntico Norte": "NI-AN",
            "Atl�ntico Sur": "NI-AS",
            "Boaco": "NI-BO",
            "Carazo": "NI-CA",
            "Chinandega": "NI-CI",
            "Chontales": "NI-CO",
            "Estel�": "NI-ES",
            "Granada": "NI-GR",
            "Jinotega": "NI-JI",
            "Le�n": "NI-LE",
            "Madriz": "NI-MD",
            "Managua": "NI-MN",
            "Masaya": "NI-MS",
            "Matagalpa": "NI-MT",
            "Nueva Segovia": "NI-NS",
            "R�o San Juan": "NI-SJ",
            "Rivas": "NI-RI"
        }
    },

    "NE": {
        "code": "NE",
        "name": "Niger",
        "zone": 0,
        "states": {
            "Agadez": "NE-1",
            "Diffa": "NE-2",
            "Dosso": "NE-3",
            "Maradi": "NE-4",
            "Niamey": "NE-8",
            "Tahoua": "NE-5",
            "Tillab�ri": "NE-6",
            "Zinder": "NE-7"
        }
    },

    "NG": {
        "code": "NG",
        "name": "Nigeria",
        "zone": 0,
        "states": {
            "Abia": "NG-AB",
            "Abuja Federal Capital Territory": "NG-FC",
            "Adamawa": "NG-AD",
            "Akwa Ibom": "NG-AK",
            "Anambra": "NG-AN",
            "Bauchi": "NG-BA",
            "Bayelsa": "NG-BY",
            "Benue": "NG-BE",
            "Borno": "NG-BO",
            "Cross River": "NG-CR",
            "Delta": "NG-DE",
            "Ebonyi": "NG-EB",
            "Edo": "NG-ED",
            "Ekiti": "NG-EK",
            "Enugu": "NG-EN",
            "Gombe": "NG-GO",
            "Imo": "NG-IM",
            "Jigawa": "NG-JI",
            "Kaduna": "NG-KD",
            "Kano": "NG-KN",
            "Katsina": "NG-KT",
            "Kebbi": "NG-KE",
            "Kogi": "NG-KO",
            "Kwara": "NG-KW",
            "Lagos": "NG-LA",
            "Nassarawa": "NG-NA",
            "Niger": "NG-NI",
            "Ogun": "NG-OG",
            "Ondo": "NG-ON",
            "Osun": "NG-OS",
            "Oyo": "NG-OY",
            "Plateau": "NG-PL",
            "Rivers": "NG-RI",
            "Sokoto": "NG-SO",
            "Taraba": "NG-TA",
            "Yobe": "NG-YO",
            "Zamfara": "NG-ZA"
        }
    },

    "NU": {
        "code": "NU",
        "name": "Niue",
        "zone": 0,
        "states": {}
    },

    "NF": {
        "code": "NF",
        "name": "Norfolk Island",
        "zone": 0,
        "states": {}
    },

    "ND": {
        "code": "ND",
        "name": "Northern Ireland",
        "zone": 0,
        "states": {
            "Antrim": "NIR-ANT",
            "Ards": "NIR-ARD",
            "Armagh, County of": "NIR-ARM",
            "Ballymena": "NIR-BLA",
            "Ballymoney": "NIR-BLY",
            "Banbridge": "NIR-BNB",
            "Belfast": "NIR-BFS",
            "Carrickfergus": "NIR-CKF",
            "Castlereagh": "NIR-CSR",
            "Coleraine": "NIR-CLR",
            "Cookstown": "NIR-CKT",
            "Craigavon": "NIR-CGV",
            "Derry": "NIR-DRY",
            "Down": "NIR-DOW",
            "Dungannon": "NIR-DGN",
            "Fermanagh, County of": "NIR-FER",
            "Larne": "NIR-LRN",
            "Limavady": "NIR-LMV",
            "Lisburn": "NIR-LSB",
            "Magherafelt": "NIR-MFT",
            "Moyle": "NIR-MYL",
            "Newry and Mourne": "NIR-NYM",
            "Newtownabbey": "NIR-NTA",
            "North Down": "NIR-NDN",
            "Omagh": "NIR-OMH",
            "Strabane": "NIR-STB"
        }
    },

    "MP": {
        "code": "MP",
        "name": "Northern Mariana Islands",
        "zone": 0,
        "states": {}
    },

    "NO": {
        "code": "NO",
        "name": "Norway",
        "zone": 0,
        "states": {
            "Akershus": "NO-02",
            "Aust-Agder": "NO-09",
            "Buskerud": "NO-06",
            "Finnmark": "NO-20",
            "Hedmark": "NO-04",
            "Hordaland": "NO-12",
            "Jan Mayen": "NO-22",
            "M�re og Romsdal": "NO-15",
            "Nord-Tr�ndelag": "NO-17",
            "Nordland": "NO-18",
            "Oppland": "NO-05",
            "Oslo": "NO-03",
            "Rogaland": "NO-11",
            "Sogn og Fjordane": "NO-14",
            "Svalbard": "NO-21",
            "S�r-Tr�ndelag": "NO-16",
            "Telemark": "NO-08",
            "Troms": "NO-19",
            "Vest-Agder": "NO-10",
            "Vestfold": "NO-07",
            "�stfold": "NO-01"
        }
    },

    "OM": {
        "code": "OM",
        "name": "Oman",
        "zone": 0
    },

    "PK": {
        "code": "PK",
        "name": "Pakistan",
        "zone": 0,
        "states": {
            "Azad Kashmir": "PK-JK",
            "Baluchistan (en)": "PK-BA",
            "Federally Administered Tribal Areas": "PK-TA",
            "Islamabad": "PK-IS",
            "North-West Frontier": "PK-NW",
            "Northern Areas": "PK-NA",
            "Punjab": "PK-PB",
            "Sind (en)": "PK-SD"
        }
    },

    "PW": {
        "code": "PW",
        "name": "Palau",
        "zone": 0,
        "states": {
            "Aimeliik": "PW-002",
            "Airai": "PW-004",
            "Angaur": "PW-010",
            "Hatobohei": "PW-050",
            "Kayangel": "PW-100",
            "Koror": "PW-150",
            "Melekeok": "PW-212",
            "Ngaraard": "PW-214",
            "Ngarchelong": "PW-218",
            "Ngardmau": "PW-222",
            "Ngatpang": "PW-224",
            "Ngchesar": "PW-226",
            "Ngeremlengui": "PW-227",
            "Ngiwal": "PW-228",
            "Peleliu": "PW-350",
            "Sonsorol": "PW-370"
        }
    },

    "PA": {
        "code": "PA",
        "name": "Panama",
        "zone": 0,
        "states": {
            "Bocas del Toro": "PA-1",
            "Chiriqu�": "PA-4",
            "Cocl�": "PA-2",
            "Col�n": "PA-3",
            "Dari�n": "PA-5",
            "Ember�": "PA-EM",
            "Herrera": "PA-6",
            "Kuna Yala": "PA-KY",
            "Los Santos": "PA-7",
            "Ng�be-Bugl�": "PA-NB",
            "Panam�": "PA-8",
            "Veraguas": "PA-9"
        }
    },

    "PG": {
        "code": "PG",
        "name": "Papua New Guinea",
        "zone": 0,
        "states": {
            "Central": "PG-CPM",
            "Chimbu": "PG-CPK",
            "East New Britain": "PG-EBR",
            "East Sepik": "PG-ESW",
            "Eastern Highlands": "PG-EHG",
            "Enga": "PG-EPW",
            "Gulf": "PG-GPK",
            "Madang": "PG-MPM",
            "Manus": "PG-MRL",
            "Milne Bay": "PG-MBA",
            "Morobe": "PG-MPL",
            "National Capital District (Port Moresby)": "PG-NCD",
            "New Ireland": "PG-NIK",
            "North Solomons": "PG-NSA",
            "Northern": "PG-NPP",
            "Sandaun": "PG-SAN",
            "Southern Highlands": "PG-SHM",
            "West New Britain": "PG-WBK",
            "Western": "PG-WPD",
            "Western Highlands": "PG-WHM"
        }
    },

    "PY": {
        "code": "PY",
        "name": "Paraguay",
        "zone": 0,
        "states": {
            "Alto Paraguay": "PY-16",
            "Alto Paran�": "PY-10",
            "Amambay": "PY-13",
            "Asunci�n": "PY-ASU",
            "Boquer�n": "PY-19",
            "Caaguaz�": "PY-5",
            "Caazap�": "PY-6",
            "Canindey�": "PY-14",
            "Central": "PY-11",
            "Concepci�n": "PY-1",
            "Cordillera": "PY-3",
            "Guair�": "PY-4",
            "Itap�a": "PY-7",
            "Misiones": "PY-8",
            "�eembuc�": "PY-12",
            "Paraguar�": "PY-9",
            "Presidente Hayes": "PY-15",
            "San Pedro": "PY-2"
        }
    },

    "PE": {
        "code": "PE",
        "name": "Peru",
        "zone": 0,
        "states": {
            "Amazonas": "PE-AMA",
            "Ancash": "PE-ANC",
            "Apur�mac": "PE-APU",
            "Arequipa": "PE-ARE",
            "Ayacucho": "PE-AYA",
            "Cajamarca": "PE-CAJ",
            "Cusco": "PE-CUS",
            "El Callao": "PE-CAL",
            "Huancavelica": "PE-HUV",
            "Hu�nuco": "PE-HUC",
            "Ica": "PE-ICA",
            "Jun�n": "PE-JUN",
            "La Libertad": "PE-LAL",
            "Lambayeque": "PE-LAM",
            "Lima": "PE-LIM",
            "Loreto": "PE-LOR",
            "Madre de Dios": "PE-MDD",
            "Moquegua": "PE-MOQ",
            "Municipalidad Metropolitana de Lima": "PE-LMA",
            "Pasco": "PE-PAS",
            "Piura": "PE-PIU",
            "Puno": "PE-PUN",
            "San Mart�n": "PE-SAM",
            "Tacna": "PE-TAC",
            "Tumbes": "PE-TUM",
            "Ucayali": "PE-UCA"
        }
    },

    "PH": {
        "code": "PH",
        "name": "Philippines",
        "zone": 0,
        "states": {
            "Abra": "PH-ABR",
            "Agusan del Norte": "PH-AGN",
            "Agusan del Sur": "PH-AGS",
            "Aklan": "PH-AKL",
            "Albay": "PH-ALB",
            "Antique": "PH-ANT",
            "Apayao": "PH-APA",
            "Aurora": "PH-AUR",
            "Autonomous Region in Muslim Mindanao (ARMM)": "PH-14",
            "Basilan": "PH-BAS",
            "Bataan": "PH-BAN",
            "Batanes": "PH-BTN",
            "Batangas": "PH-BTG",
            "Benguet": "PH-BEN",
            "Bicol (Region V)": "PH-05",
            "Biliran": "PH-BIL",
            "Bohol": "PH-BOH",
            "Bukidnon": "PH-BUK",
            "Bulacan": "PH-BUL",
            "Cagayan": "PH-CAG",
            "Cagayan Valley (Region II)": "PH-02",
            "CALABARZON (Region IV-A)": "PH-40",
            "Camarines Norte": "PH-CAN",
            "Camarines Sur": "PH-CAS",
            "Camiguin": "PH-CAM",
            "Capiz": "PH-CAP",
            "Caraga (Region XIII)": "PH-13",
            "Catanduanes": "PH-CAT",
            "Cavite": "PH-CAV",
            "Cebu": "PH-CEB",
            "Central Luzon (Region III)": "PH-03",
            "Central Visayas (Region VII)": "PH-07",
            "Compostela Valley": "PH-COM",
            "Cordillera Administrative Region (CAR)": "PH-15",
            "Davao (Region XI)": "PH-11",
            "Davao del Norte": "PH-DAV",
            "Davao del Sur": "PH-DAS",
            "Davao Oriental": "PH-DAO",
            "Dinagat Islands": "PH-DIN",
            "Eastern Samar": "PH-EAS",
            "Eastern Visayas (Region VIII)": "PH-08",
            "Guimaras": "PH-GUI",
            "Ifugao": "PH-IFU",
            "Ilocos (Region I)": "PH-01",
            "Ilocos Norte": "PH-ILN",
            "Ilocos Sur": "PH-ILS",
            "Iloilo": "PH-ILI",
            "Isabela": "PH-ISA",
            "Kalinga": "PH-KAL",
            "La Union": "PH-LUN",
            "Laguna": "PH-LAG",
            "Lanao del Norte": "PH-LAN",
            "Lanao del Sur": "PH-LAS",
            "Leyte": "PH-LEY",
            "Maguindanao": "PH-MAG",
            "Marinduque": "PH-MAD",
            "Masbate": "PH-MAS",
            "MIMAROPA (Region IV-B)": "PH-41",
            "Mindoro Occidental": "PH-MDC",
            "Mindoro Oriental": "PH-MDR",
            "Misamis Occidental": "PH-MSC",
            "Misamis Oriental": "PH-MSR",
            "Mountain Province": "PH-MOU",
            "National Capital Region": "PH-00",
            "Negros Occidental": "PH-NEC",
            "Negros Oriental": "PH-NER",
            "North Cotabato": "PH-NCO",
            "Northern Mindanao (Region X)": "PH-10",
            "Northern Samar": "PH-NSA",
            "Nueva Ecija": "PH-NUE",
            "Nueva Vizcaya": "PH-NUV",
            "Palawan": "PH-PLW",
            "Pampanga": "PH-PAM",
            "Pangasinan": "PH-PAN",
            "Quezon": "PH-QUE",
            "Quirino": "PH-QUI",
            "Rizal": "PH-RIZ",
            "Romblon": "PH-ROM",
            "Sarangani": "PH-SAR",
            "Shariff Kabunsuan": "PH-X2",
            "Siquijor": "PH-SIG",
            "Soccsksargen (Region XII)": "PH-12",
            "Sorsogon": "PH-SOR",
            "South Cotabato": "PH-SCO",
            "Southern Leyte": "PH-SLE",
            "Sultan Kudarat": "PH-SUK",
            "Sulu": "PH-SLU",
            "Surigao del Norte": "PH-SUN",
            "Surigao del Sur": "PH-SUR",
            "Tarlac": "PH-TAR",
            "Tawi-Tawi": "PH-TAW",
            "Western Samar": "PH-WSA",
            "Western Visayas (Region VI)": "PH-06",
            "Zambales": "PH-ZMB",
            "Zamboanga del Norte": "PH-ZAN",
            "Zamboanga del Sur": "PH-ZAS",
            "Zamboanga Peninsula (Region IX)": "PH-09",
            "Zamboanga Sibugue": "PH-ZSI"
        }
    },

    "PN": {
        "code": "PN",
        "name": "Pitcairn",
        "zone": 0,
        "states": {}
    },

    "PL": {
        "code": "PL",
        "name": "Poland",
        "zone": 0,
        "states": {
            "Dolnoslaskie": "PL-DS",
            "Kujawsko-pomorskie": "PL-KP",
            "L�dzkie": "PL-LD",
            "Lubelskie": "PL-LU",
            "Lubuskie": "PL-LB",
            "Malopolskie": "PL-MA",
            "Mazowieckie": "PL-MZ",
            "Opolskie": "PL-OP",
            "Podkarpackie": "PL-PK",
            "Podlaskie": "PL-PD",
            "Pomorskie": "PL-PM",
            "Slaskie": "PL-SL",
            "Swietokrzyskie": "PL-SK",
            "Warminsko-mazurskie": "PL-WN",
            "Wielkopolskie": "PL-WP",
            "Zachodniopomorskie": "PL-ZP"
        }
    },

    "PT": {
        "code": "PT",
        "name": "Portugal",
        "zone": 0,
        "states": {
            "Aveiro": "PT-01",
            "Beja": "PT-02",
            "Braga": "PT-03",
            "Bragan�a": "PT-04",
            "Castelo Branco": "PT-05",
            "Coimbra": "PT-06",
            "�vora": "PT-07",
            "Faro": "PT-08",
            "Guarda": "PT-09",
            "Leiria": "PT-10",
            "Lisboa": "PT-11",
            "Portalegre": "PT-12",
            "Porto": "PT-13",
            "Regi�o Aut�noma da Madeira": "PT-30",
            "Regi�o Aut�noma dos A�ores": "PT-20",
            "Santar�m": "PT-14",
            "Set�bal": "PT-15",
            "Viana do Castelo": "PT-16",
            "Vila Real": "PT-17",
            "Viseu": "PT-18"
        }
    },

    "PR": {
        "code": "PR",
        "name": "Puerto Rico",
        "zone": 0,
        "states": {}
    },

    "QA": {
        "code": "QA",
        "name": "Qatar",
        "zone": 0,
        "states": {
            "Ad Dawhah": "QA-DA",
            "Al Ghuwayriyah": "QA-GH",
            "Al Jumayliyah": "QA-JU",
            "Al Khawr": "QA-KH",
            "Al Wakrah": "QA-WA",
            "Ar Rayyan": "QA-RA",
            "Jariyan al Batnah": "QA-JB",
            "Madinat ash Shamal": "QA-MS",
            "Umm Sa'id": "QA-X1",
            "Umm Salal": "QA-US"
        }
    },

    "RE": {
        "code": "RE",
        "name": "Reunion",
        "zone": 0,
        "states": {}
    },

    "RO": {
        "code": "RO",
        "name": "Romania",
        "zone": 0,
        "states": {}
    },

    "RU": {
        "code": "RU",
        "name": "Russian Federation",
        "zone": 0,
        "states": {
            "Adygeya, Respublika": "RU-AD",
            "Altay, Respublika": "RU-AL",
            "Altayskiy kray": "RU-ALT",
            "Amurskaya oblast'": "RU-AMU",
            "Arkhangel'skaya oblast'": "RU-ARK",
            "Astrakhanskaya oblast'": "RU-AST",
            "Bashkortostan, Respublika": "RU-BA",
            "Belgorodskaya oblast'": "RU-BEL",
            "Bryanskaya oblast'": "RU-BRY",
            "Buryatiya, Respublika": "RU-BU",
            "Chechenskaya Respublika": "RU-CE",
            "Chelyabinskaya oblast'": "RU-CHE",
            "Chukotskiy avtonomnyy okrug": "RU-CHU",
            "Chuvashskaya Respublika": "RU-CU",
            "Dagestan, Respublika": "RU-DA",
            "Ingushskaya Respublika": "RU-IN",
            "Irkutskaya oblast'": "RU-IRK",
            "Ivanovskaya oblast'": "RU-IVA",
            "Kabardino-Balkarskaya Respublika": "RU-KB",
            "Kaliningradskaya oblast'": "RU-KGD",
            "Kalmykiya, Respublika": "RU-KL",
            "Kaluzhskaya oblast'": "RU-KLU",
            "Kamchatskaya oblast'": "RU-KAM",
            "Karachayevo-Cherkesskaya Respublika": "RU-KC",
            "Kareliya, Respublika": "RU-KR",
            "Kemerovskaya oblast'": "RU-KEM",
            "Khabarovskiy kray": "RU-KHA",
            "Khakasiya, Respublika": "RU-KK",
            "Khant": "RU-KHM",
            "Kirovskaya oblast'": "RU-KIR",
            "Komi, Respublika": "RU-KO",
            "Komi-Permyak": "RU-X1",
            "Kostromskaya oblast'": "RU-KOS",
            "Krasnodarskiy kray": "RU-KDA",
            "Krasnoyarskiy kray": "RU-KYA",
            "Kurganskaya oblast'": "RU-KGN",
            "Kurskaya oblast'": "RU-KRS",
            "Leningradskaya oblast'": "RU-LEN",
            "Lipetskaya oblast'": "RU-LIP",
            "Magadanskaya oblast'": "RU-MAG",
            "Mariy El, Respublika": "RU-ME",
            "Mordoviya, Respublika": "RU-MO",
            "Moskovskaya oblast'": "RU-MOS",
            "Moskva": "RU-MOW",
            "Murmanskaya oblast'": "RU-MUR",
            "Nenetskiy avtonomnyy okrug": "RU-NEN",
            "Nizhegorodskaya oblast'": "RU-NIZ",
            "Novgorodskaya oblast'": "RU-NGR",
            "Novosibirskaya oblast'": "RU-NVS",
            "Omskaya oblast'": "RU-OMS",
            "Orenburgskaya oblast'": "RU-ORE",
            "Orlovskaya oblast'": "RU-ORL",
            "Penzenskaya oblast'": "RU-PNZ",
            "Perm": "RU-PER",
            "Primorskiy kray": "RU-PRI",
            "Pskovskaya oblast'": "RU-PSK",
            "Rostovskaya oblast'": "RU-ROS",
            "Ryazanskaya oblast'": "RU-RYA",
            "Sakha, R": "RU-SA",
            "Sakhalinskaya oblast'": "RU-SAK",
            "Samarskaya oblast'": "RU-SAM",
            "Sankt-Peterburg": "RU-SPE",
            "Saratovskaya oblast'": "RU-SAR",
            "Severnaya Osetiya, Respublika": "RU-SE",
            "Smolenskaya oblast'": "RU-SMO",
            "Stavropol'skiy kray": "RU-STA",
            "Sverdlovskaya oblast'": "RU-SVE",
            "Tambovskaya oblast'": "RU-TAM",
            "Tatarstan, Respublika": "RU-TA",
            "Tomskaya oblast'": "RU-TOM",
            "Tul'skaya oblast'": "RU-TUL",
            "Tverskaya oblast'": "RU-TVE",
            "Tyumenskaya oblast'": "RU-TYU",
            "Tyva": "RU-TY",
            "Udmurtskaya Respublika": "RU-UD",
            "Ul'yanovskaya oblast'": "RU-ULY",
            "Vladimirskaya oblast'": "RU-VLA",
            "Volgogradskaya oblast'": "RU-VGG",
            "Vologodskaya oblast'": "RU-VLG",
            "Voronezhskaya oblast'": "RU-VOR",
            "Yamalo-Nenetskiy avtonomnyy okrug": "RU-YAN",
            "Yaroslavskaya oblast'": "RU-YAR",
            "Yevreyskaya avtonomnaya oblast'": "RU-YEV",
            "Zabajkal'skij kraj": "RU-ZAB"
        }
    },

    "RW": {
        "code": "RW",
        "name": "Rwanda",
        "zone": 0,
        "states": {
            "Est": "RW-02",
            "Nord": "RW-03",
            "Ouest": "RW-04",
            "Sud": "RW-05",
            "Ville de Kigali": "RW-01"
        }
    },

    "KN": {
        "code": "KN",
        "name": "Saint Kitts and Nevis",
        "zone": 0,
        "states": {
            "Christ Church Nichola Town": "KN-01",
            "Saint Anne Sandy Point": "KN-02",
            "Saint George Basseterre": "KN-03",
            "Saint George Gingerland": "KN-04",
            "Saint James Windward": "KN-05",
            "Saint John Capisterre": "KN-06",
            "Saint John Figtree": "KN-07",
            "Saint Mary Cayon": "KN-08",
            "Saint Paul Capisterre": "KN-09",
            "Saint Paul Charlestown": "KN-10",
            "Saint Peter Basseterre": "KN-11",
            "Saint Thomas Lowland": "KN-12",
            "Saint Thomas Middle Island": "KN-13",
            "Trinity Palmetto Point": "KN-15"
        }
    },

    "LC": {
        "code": "LC",
        "name": "Saint Lucia",
        "zone": 0,
        "states": {}
    },

    "VC": {
        "code": "VC",
        "name": "Saint Vincent and the Grenadines",
        "zone": 0,
        "states": {
            "Charlotte": "VC-01",
            "Grenadines": "VC-06",
            "Saint Andrew": "VC-02",
            "Saint David": "VC-03",
            "Saint George": "VC-04",
            "Saint Patrick": "VC-05"
        }
    },

    "WS": {
        "code": "WS",
        "name": "Samoa",
        "zone": 0,
        "states": {
            "A'ana": "WS-AA",
            "Aiga-i-le-Tai": "WS-AL",
            "Atua": "WS-AT",
            "Fa'asaleleaga": "WS-FA",
            "Gaga'emauga": "WS-GE",
            "Gagaifomauga": "WS-GI",
            "Palauli": "WS-PA",
            "Satupa'itea": "WS-SA",
            "Tuamasaga": "WS-TU",
            "Va'a-o-Fonoti": "WS-VF",
            "Vaisigano": "WS-VS"
        }
    },

    "SM": {
        "code": "SM",
        "name": "San Marino",
        "zone": 0,
        "states": {
            "Acquaviva": "SM-01",
            "Borgo Maggiore": "SM-06",
            "Chiesanuova": "SM-02",
            "Domagnano": "SM-03",
            "Faetano": "SM-04",
            "Fiorentino": "SM-05",
            "Montegiardino": "SM-08",
            "San Marino": "SM-07",
            "Serravalle": "SM-09"
        }
    },

    "ST": {
        "code": "ST",
        "name": "Sao Tome and Principe",
        "zone": 0,
        "states": {
            "Pr�ncipe": "ST-P",
            "S�o Tom�": "ST-S"
        }
    },

    "SA": {
        "code": "SA",
        "name": "Saudi Arabia",
        "zone": 0
    },

    "SS": {
        "code": "SS",
        "name": "Scotland",
        "zone": 0,
        "states": {
            "Aberdeen City": "SCT-ABE",
            "Aberdeenshire": "SCT-ABD",
            "Angus": "SCT-ANS",
            "Argyll and Bute": "SCT-AGB",
            "Clackmannanshire": "SCT-CLK",
            "Dumfries and Galloway": "SCT-DGY",
            "Dundee City": "SCT-DND",
            "East Ayrshire": "SCT-EAY",
            "East Dunbartonshire": "SCT-EDU",
            "East Lothian": "SCT-ELN",
            "East Renfrewshire": "SCT-ERW",
            "Edinburgh, City of": "SCT-EDH",
            "Eilean Siar": "SCT-ELS",
            "Falkirk": "SCT-FAL",
            "Fife": "SCT-FIF",
            "Glasgow City": "SCT-GLG",
            "Highland": "SCT-HLD",
            "Inverclyde": "SCT-IVC",
            "Midlothian": "SCT-MLN",
            "Moray": "SCT-MRY",
            "North Ayrshire": "SCT-NAY",
            "North Lanarkshire": "SCT-NLK",
            "Northumberland": "SCT-NBL",
            "Orkney Islands": "SCT-ORK",
            "Perth and Kinross": "SCT-PKN",
            "Renfrewshire": "SCT-RFW",
            "Scottish Borders, The": "SCT-SCB",
            "Shetland Islands": "SCT-ZET",
            "South Ayrshire": "SCT-SAY",
            "South Lanarkshire": "SCT-SLK",
            "Stirling": "SCT-STG",
            "West Dunbartonshire": "SCT-WDU",
            "West Lothian": "SCT-WLN"
        }
    },

    "SN": {
        "code": "SN",
        "name": "Senegal",
        "zone": 0,
        "states": {
            "Dakar": "SN-DK",
            "Diourbel": "SN-DB",
            "Fatick": "SN-FK",
            "Kaffrine": "SN-KA",
            "Kaolack": "SN-KL",
            "K�dougou": "SN-KE",
            "Kolda": "SN-KD",
            "Louga": "SN-LG",
            "Matam": "SN-MT",
            "Saint-Louis": "SN-SL",
            "S�dhiou": "SN-SE",
            "Tambacounda": "SN-TC",
            "Thi�s": "SN-TH",
            "Ziguinchor": "SN-ZG"
        }
    },

    "SC": {
        "code": "SC",
        "name": "Seychelles",
        "zone": 0,
        "states": {
            "Anse aux Pins": "SC-01",
            "Anse Boileau": "SC-02",
            "Anse �toile": "SC-03",
            "Anse Royale": "SC-05",
            "Au Cap": "SC-04",
            "Baie Lazare": "SC-06",
            "Baie Sainte Anne": "SC-07",
            "Beau Vallon": "SC-08",
            "Bel Air": "SC-09",
            "Bel Ombre": "SC-10",
            "Cascade": "SC-11",
            "English River": "SC-16",
            "Glacis": "SC-12",
            "Grand Anse Mahe": "SC-13",
            "Grand Anse Praslin": "SC-14",
            "La Digue": "SC-15",
            "Les Mamelles": "SC-24",
            "Mont Buxton": "SC-17",
            "Mont Fleuri": "SC-18",
            "Plaisance": "SC-19",
            "Pointe La Rue": "SC-20",
            "Port Glaud": "SC-21",
            "Roche Caiman": "SC-25",
            "Saint Louis": "SC-22",
            "Takamaka": "SC-23"
        }
    },

    "SL": {
        "code": "SL",
        "name": "Sierra Leone",
        "zone": 0,
        "states": {
            "Eastern": "SL-E",
            "Northern": "SL-N",
            "Southern": "SL-S",
            "Western Area (Freetown)": "SL-W"
        }
    },

    "SG": {
        "code": "SG",
        "name": "Singapore",
        "zone": 0
    },

    "SK": {
        "code": "SK",
        "name": "Slovakia (Slovak Republic)",
        "zone": 0
    },

    "SI": {
        "code": "SI",
        "name": "Slovenia",
        "zone": 0
    },

    "SB": {
        "code": "SB",
        "name": "Solomon Islands",
        "zone": 0,
        "states": {
            "Capital Territory (Honiara)": "SB-CT",
            "Central": "SB-CE",
            "Choiseul": "SB-CH",
            "Guadalcanal": "SB-GU",
            "Isabel": "SB-IS",
            "Makira": "SB-MK",
            "Malaita": "SB-ML",
            "Rennell and Bellona": "SB-RB",
            "Temotu": "SB-TE",
            "Western": "SB-WE"
        }
    },

    "SO": {
        "code": "SO",
        "name": "Somalia",
        "zone": 0,
        "states": {
            "Awdal": "SO-AW",
            "Bakool": "SO-BK",
            "Banaadir": "SO-BN",
            "Bari": "SO-BR",
            "Bay": "SO-BY",
            "Galguduud": "SO-GA",
            "Gedo": "SO-GE",
            "Hiiraan": "SO-HI",
            "Jubbada Dhexe": "SO-JD",
            "Jubbada Hoose": "SO-JH",
            "Mudug": "SO-MU",
            "Nugaal": "SO-NU",
            "Sanaag": "SO-SA",
            "Shabeellaha Dhexe": "SO-SD",
            "Shabeellaha Hoose": "SO-SH",
            "Sool": "SO-SO",
            "Togdheer": "SO-TO",
            "Woqooyi Galbeed": "SO-WO"
        }
    },

    "ZA": {
        "code": "ZA",
        "name": "South Africa",
        "zone": 0,
        "states": {
            "Eastern Cape": "ZA-EC",
            "Free State": "ZA-FS",
            "Gauteng": "ZA-GT",
            "Kwazulu-Natal": "ZA-NL",
            "Limpopo": "ZA-LP",
            "Mpumalanga": "ZA-MP",
            "North-West": "ZA-NW",
            "Northern Cape": "ZA-NC",
            "Western Cape": "ZA-WC"
        }
    },

    "GS": {
        "code": "GS",
        "name": "South Georgia and the South Sandwich Islands",
        "zone": 0,
        "states": {}
    },

    "ES": {
        "code": "ES",
        "name": "Spain",
        "zone": 0,
        "states": {
            "A Coru�a": "ES-C",
            "�lava": "ES-VI",
            "Albacete": "ES-AB",
            "Alicante": "ES-A",
            "Almer�a": "ES-AL",
            "Asturias": "ES-O",
            "�vila": "ES-AV",
            "Badajoz": "ES-BA",
            "Baleares": "ES-PM",
            "Barcelona": "ES-B",
            "Burgos": "ES-BU",
            "C�ceres": "ES-CC",
            "C�diz": "ES-CA",
            "Cantabria": "ES-S",
            "Castell�n": "ES-CS",
            "Ceuta": "ES-CE",
            "Ciudad Real": "ES-CR",
            "C�rdoba": "ES-CO",
            "Cuenca": "ES-CU",
            "Girona": "ES-GI",
            "Granada": "ES-GR",
            "Guadalajara": "ES-GU",
            "Guip�zcoa": "ES-SS",
            "Huelva": "ES-H",
            "Huesca": "ES-HU",
            "Ja�n": "ES-J",
            "La Rioja": "ES-LO",
            "Las Palmas": "ES-GC",
            "Le�n": "ES-LE",
            "Lleida": "ES-L",
            "Lugo": "ES-LU",
            "Madrid": "ES-M",
            "M�laga": "ES-MA",
            "Melilla": "ES-ML",
            "Murcia": "ES-MU",
            "Navarra": "ES-NA",
            "Ourense": "ES-OR",
            "Palencia": "ES-P",
            "Pontevedra": "ES-PO",
            "Salamanca": "ES-SA",
            "Santa Cruz de Tenerife": "ES-TF",
            "Segovia": "ES-SG",
            "Sevilla": "ES-SE",
            "Soria": "ES-SO",
            "Tarragona": "ES-T",
            "Teruel": "ES-TE",
            "Toledo": "ES-TO",
            "Valencia": "ES-V",
            "Valladolid": "ES-VA",
            "Vizcaya": "ES-BI",
            "Zamora": "ES-ZA",
            "Zaragoza": "ES-Z"
        }
    },

    "LK": {
        "code": "LK",
        "name": "Sri Lanka",
        "zone": 0
    },

    "SH": {
        "code": "SH",
        "name": "St. Helena",
        "zone": 0,
        "states": {
            "Ascension": "SH-AC",
            "Saint Helena": "SH-SH",
            "Tristan da Cunha": "SH-TA"
        }
    },

    "PM": {
        "code": "PM",
        "name": "St. Pierre and Miquelon",
        "zone": 0,
        "states": {}
    },

    "SD": {
        "code": "SD",
        "name": "Sudan",
        "zone": 0
    },

    "SR": {
        "code": "SR",
        "name": "Suriname",
        "zone": 0,
        "states": {
            "Brokopondo": "SR-BR",
            "Commewijne": "SR-CM",
            "Coronie": "SR-CR",
            "Marowijne": "SR-MA",
            "Nickerie": "SR-NI",
            "Para": "SR-PR",
            "Paramaribo": "SR-PM",
            "Saramacca": "SR-SA",
            "Sipaliwini": "SR-SI",
            "Wanica": "SR-WA"
        }
    },

    "SJ": {
        "code": "SJ",
        "name": "Svalbard and Jan Mayen Islands",
        "zone": 0,
        "states": {}
    },

    "SZ": {
        "code": "SZ",
        "name": "Swaziland",
        "zone": 0,
        "states": {
            "Hhohho": "SZ-HH",
            "Lubombo": "SZ-LU",
            "Manzini": "SZ-MA",
            "Shiselweni": "SZ-SH"
        }
    },

    "SE": {
        "code": "SE",
        "name": "Sweden",
        "zone": 0,
        "states": {
            "Blekinge l�n": "SE-K",
            "Dalarnas l�n": "SE-W",
            "G�vleborgs l�n": "SE-X",
            "Gotlands l�n": "SE-I",
            "Hallands l�n": "SE-N",
            "J�mtlands l�n": "SE-Z",
            "J�nk�pings l�n": "SE-F",
            "Kalmar l�n": "SE-H",
            "Kronobergs l�n": "SE-G",
            "Norrbottens l�n": "SE-BD",
            "�rebro l�n": "SE-T",
            "�sterg�tlands l�n": "SE-E",
            "Sk�ne l�n": "SE-M",
            "S�dermanlands l�n": "SE-D",
            "Stockholms l�n": "SE-AB",
            "Uppsala l�n": "SE-C",
            "V�rmlands l�n": "SE-S",
            "V�sterbottens l�n": "SE-AC",
            "V�sternorrlands l�n": "SE-Y",
            "V�stmanlands l�n": "SE-U",
            "V�stra G�talands l�n": "SE-O"
        }
    },

    "CH": {
        "code": "CH",
        "name": "Switzerland",
        "zone": 0,
        "states": {
            "Aargau (de)": "CH-AG",
            "Appenzell Ausserrhoden (de)": "CH-AR",
            "Appenzell Innerrhoden (de)": "CH-AI",
            "Basel-Landschaft (de)": "CH-BL",
            "Basel-Stadt (de)": "CH-BS",
            "Bern (de)": "CH-BE",
            "Fribourg (fr)": "CH-FR",
            "Gen�ve (fr)": "CH-GE",
            "Glarus (de)": "CH-GL",
            "Graub�nden (de)": "CH-GR",
            "Jura (fr)": "CH-JU",
            "Luzern (de)": "CH-LU",
            "Neuch�tel (fr)": "CH-NE",
            "Nidwalden (de)": "CH-NW",
            "Obwalden (de)": "CH-OW",
            "Sankt Gallen (de)": "CH-SG",
            "Schaffhausen (de)": "CH-SH",
            "Schwyz (de)": "CH-SZ",
            "Solothurn (de)": "CH-SO",
            "Thurgau (de)": "CH-TG",
            "Ticino (it)": "CH-TI",
            "Uri (de)": "CH-UR",
            "Valais (fr)": "CH-VS",
            "Vaud (fr)": "CH-VD",
            "Zug (de)": "CH-ZG",
            "Z�rich (de)": "CH-ZH"
        }
    },

    "SY": {
        "code": "SY",
        "name": "Syrian Arab Republic",
        "zone": 0
    },

    "TW": {
        "code": "TW",
        "name": "Taiwan",
        "zone": 0,
        "states": {
            "Changhua": "TW-CHA",
            "Chiayi": "TW-CYQ",
            "Chiayi Municipality": "TW-CYI",
            "Hsinchu": "TW-HSQ",
            "Hsinchu Municipality": "TW-HSZ",
            "Hualien": "TW-HUA",
            "Ilan": "TW-ILA",
            "Kaohsiung": "TW-KHQ",
            "Kaohsiung Special Municipality": "TW-KHH",
            "Keelung Municipality": "TW-KEE",
            "Miaoli": "TW-MIA",
            "Nantou": "TW-NAN",
            "Penghu": "TW-PEN",
            "Pingtung": "TW-PIF",
            "Taichung": "TW-TXQ",
            "Taichung Municipality": "TW-TXG",
            "Tainan": "TW-TNQ",
            "Tainan Municipality": "TW-TNN",
            "Taipei": "TW-TPQ",
            "Taipei Special Municipality": "TW-TPE",
            "Taitung": "TW-TTT",
            "Taoyuan": "TW-TAO",
            "Yunlin": "TW-YUN"
        }
    },

    "TJ": {
        "code": "TJ",
        "name": "Tajikistan",
        "zone": 0,
        "states": {
            "Gorno-Badakhshan": "TJ-GB",
            "Khatlon": "TJ-KT",
            "Sughd": "TJ-SU"
        }
    },

    "TZ": {
        "code": "TZ",
        "name": "Tanzania, United Republic of",
        "zone": 0,
        "states": {
            "Arusha": "TZ-01",
            "Dar es Salaam": "TZ-02",
            "Dodoma": "TZ-03",
            "Iringa": "TZ-04",
            "Kagera": "TZ-05",
            "Kaskazini Pemba": "TZ-06",
            "Kaskazini Unguja": "TZ-07",
            "Kigoma": "TZ-08",
            "Kilimanjaro": "TZ-09",
            "Kusini Pemba": "TZ-10",
            "Kusini Unguja": "TZ-11",
            "Lindi": "TZ-12",
            "Manyara": "TZ-26",
            "Mara": "TZ-13",
            "Mbeya": "TZ-14",
            "Mjini Magharibi": "TZ-15",
            "Morogoro": "TZ-16",
            "Mtwara": "TZ-17",
            "Mwanza": "TZ-18",
            "Pwani": "TZ-19",
            "Rukwa": "TZ-20",
            "Ruvuma": "TZ-21",
            "Shinyanga": "TZ-22",
            "Singida": "TZ-23",
            "Tabora": "TZ-24",
            "Tanga": "TZ-25"
        }
    },

    "TH": {
        "code": "TH",
        "name": "Thailand",
        "zone": 0,
        "states": {
            "Amnat Charoen": "TH-37",
            "Ang Thong": "TH-15",
            "Buri Ram": "TH-31",
            "Chachoengsao": "TH-24",
            "Chai Nat": "TH-18",
            "Chaiyaphum": "TH-36",
            "Chanthaburi": "TH-22",
            "Chiang Mai": "TH-50",
            "Chiang Rai": "TH-57",
            "Chon Buri": "TH-20",
            "Chumphon": "TH-86",
            "Kalasin": "TH-46",
            "Kamphaeng Phet": "TH-62",
            "Kanchanaburi": "TH-71",
            "Khon Kaen": "TH-40",
            "Krabi": "TH-81",
            "Krung T": "TH-10",
            "Lampang": "TH-52",
            "Lamphun": "TH-51",
            "Loei": "TH-42",
            "Lop Buri": "TH-16",
            "Mae Hong Son": "TH-58",
            "Maha Sarakham": "TH-44",
            "Mukdahan": "TH-49",
            "Nakhon Nayok": "TH-26",
            "Nakhon Pathom": "TH-73",
            "Nakhon Phanom": "TH-48",
            "Nakhon Ratchasima": "TH-30",
            "Nakhon Sawan": "TH-60",
            "Nakhon Si Thammarat": "TH-80",
            "Nan": "TH-55",
            "Narathiwat": "TH-96",
            "Nong Bua Lam Phu": "TH-39",
            "Nong Khai": "TH-43",
            "Nonthaburi": "TH-12",
            "Pathum Thani": "TH-13",
            "Pattani": "TH-94",
            "Phangnga": "TH-82",
            "Phatthalung": "TH-93",
            "Phatthaya": "TH-S",
            "Phayao": "TH-56",
            "Phetchabun": "TH-67",
            "Phetchaburi": "TH-76",
            "Phichit": "TH-66",
            "Phitsanulok": "TH-65",
            "Phra Nakhon Si Ayutthaya": "TH-14",
            "Phrae": "TH-54",
            "Phuket": "TH-83",
            "Prachin Buri": "TH-25",
            "Prachuap Khiri Khan": "TH-77",
            "Ranong": "TH-85",
            "Ratchaburi": "TH-70",
            "Rayong": "TH-21",
            "Roi Et": "TH-45",
            "Sa Kaeo": "TH-27",
            "Sakon Nakhon": "TH-47",
            "Samut Prakan": "TH-11",
            "Samut Sakhon": "TH-74",
            "Samut Songkhram": "TH-75",
            "Saraburi": "TH-19",
            "Satun": "TH-91",
            "Si Sa Ket": "TH-33",
            "Sing Buri": "TH-17",
            "Songkhla": "TH-90",
            "Sukhothai": "TH-64",
            "Suphan Buri": "TH-72",
            "Surat Thani": "TH-84",
            "Surin": "TH-32",
            "Tak": "TH-63",
            "Trang": "TH-92",
            "Trat": "TH-23",
            "Ubon Ratchathani": "TH-34",
            "Udon Thani": "TH-41",
            "Uthai Thani": "TH-61",
            "Uttaradit": "TH-53",
            "Yala": "TH-95",
            "Yasothon": "TH-35"
        }
    },

    "TG": {
        "code": "TG",
        "name": "Togo",
        "zone": 0,
        "states": {
            "Centre": "TG-C",
            "Kara": "TG-K",
            "Maritime (R�gion)": "TG-M",
            "Plateaux": "TG-P",
            "Savannes": "TG-S"
        }
    },

    "TK": {
        "code": "TK",
        "name": "Tokelau",
        "zone": 0,
        "states": {}
    },

    "TO": {
        "code": "TO",
        "name": "Tonga",
        "zone": 0,
        "states": {
            "'Eua": "TO-01",
            "Ha'apai": "TO-02",
            "Niuas": "TO-03",
            "Tongatapu": "TO-04",
            "Vava'u": "TO-05"
        }
    },

    "TT": {
        "code": "TT",
        "name": "Trinidad and Tobago",
        "zone": 0,
        "states": {
            "Arima": "TT-ARI",
            "Chaguanas": "TT-CHA",
            "Couva-Tabaquite-Talparo": "TT-CTT",
            "Diego Martin": "TT-DMN",
            "Eastern Tobago": "TT-ETO",
            "Penal-Debe": "TT-PED",
            "Point Fortin": "TT-PTF",
            "Port of Spain": "TT-POS",
            "Princes Town": "TT-PRT",
            "Rio Claro-Mayaro": "TT-RCM",
            "San Fernando": "TT-SFO",
            "San Juan-Laventille": "TT-SJL",
            "Sangre Grande": "TT-SGE",
            "Siparia": "TT-SIP",
            "Tunapuna-Piarco": "TT-TUP",
            "Western Tobago": "TT-WTO"
        }
    },

    "TN": {
        "code": "TN",
        "name": "Tunisia",
        "zone": 0,
        "states": {
            "B�ja": "TN-31",
            "Ben Arous": "TN-13",
            "Bizerte": "TN-23",
            "Gab�s": "TN-81",
            "Gafsa": "TN-71",
            "Jendouba": "TN-32",
            "Kairouan": "TN-41",
            "Kasserine": "TN-42",
            "Kebili": "TN-73",
            "L'Ariana": "TN-12",
            "La Manouba": "TN-14",
            "Le Kef": "TN-33",
            "Mahdia": "TN-53",
            "Medenine": "TN-82",
            "Monastir": "TN-52",
            "Nabeul": "TN-21",
            "Sfax": "TN-61",
            "Sidi Bouzid": "TN-43",
            "Siliana": "TN-34",
            "Sousse": "TN-51",
            "Tataouine": "TN-83",
            "Tozeur": "TN-72",
            "Tunis": "TN-11",
            "Zaghouan": "TN-22"
        }
    },

    "TR": {
        "code": "TR",
        "name": "Turkey",
        "zone": 0,
        "states": {
            "Adana": "TR-01",
            "Adiyaman": "TR-02",
            "Afyon": "TR-03",
            "Agri": "TR-04",
            "Aksaray": "TR-68",
            "Amasya": "TR-05",
            "Ankara": "TR-06",
            "Antalya": "TR-07",
            "Ardahan": "TR-75",
            "Artvin": "TR-08",
            "Aydin": "TR-09",
            "Balikesir": "TR-10",
            "Bartin": "TR-74",
            "Batman": "TR-72",
            "Bayburt": "TR-69",
            "Bilecik": "TR-11",
            "Bing�l": "TR-12",
            "Bitlis": "TR-13",
            "Bolu": "TR-14",
            "Burdur": "TR-15",
            "Bursa": "TR-16",
            "�anakkale": "TR-17",
            "�ankiri": "TR-18",
            "�orum": "TR-19",
            "Denizli": "TR-20",
            "Diyarbakir": "TR-21",
            "D�zce": "TR-81",
            "Edirne": "TR-22",
            "Elazig": "TR-23",
            "Erzincan": "TR-24",
            "Erzurum": "TR-25",
            "Eskisehir": "TR-26",
            "Gaziantep": "TR-27",
            "Giresun": "TR-28",
            "G�m�shane": "TR-29",
            "Hakk�ri": "TR-30",
            "Hatay": "TR-31",
            "I�el": "TR-33",
            "Igdir": "TR-76",
            "Isparta": "TR-32",
            "Istanbul": "TR-34",
            "Izmir": "TR-35",
            "Kahramanmaras": "TR-46",
            "Karab�k": "TR-78",
            "Karaman": "TR-70",
            "Kars": "TR-36",
            "Kastamonu": "TR-37",
            "Kayseri": "TR-38",
            "Kilis": "TR-79",
            "Kirikkale": "TR-71",
            "Kirklareli": "TR-39",
            "Kirsehir": "TR-40",
            "Kocaeli": "TR-41",
            "Konya": "TR-42",
            "K�tahya": "TR-43",
            "Malatya": "TR-44",
            "Manisa": "TR-45",
            "Mardin": "TR-47",
            "Mugla": "TR-48",
            "Mus": "TR-49",
            "Nevsehir": "TR-50",
            "Nigde": "TR-51",
            "Ordu": "TR-52",
            "Osmaniye": "TR-80",
            "Rize": "TR-53",
            "Sakarya": "TR-54",
            "Samsun": "TR-55",
            "Sanliurfa": "TR-63",
            "Siirt": "TR-56",
            "Sinop": "TR-57",
            "Sirnak": "TR-73",
            "Sivas": "TR-58",
            "Tekirdag": "TR-59",
            "Tokat": "TR-60",
            "Trabzon": "TR-61",
            "Tunceli": "TR-62",
            "Usak": "TR-64",
            "Van": "TR-65",
            "Yalova": "TR-77",
            "Yozgat": "TR-66",
            "Zonguldak": "TR-67"
        }
    },

    "TM": {
        "code": "TM",
        "name": "Turkmenistan",
        "zone": 0,
        "states": {
            "Ahal": "TM-A",
            "Balkan": "TM-B",
            "Dasoguz": "TM-D",
            "Lebap": "TM-L",
            "Mary": "TM-M"
        }
    },

    "TC": {
        "code": "TC",
        "name": "Turks and Caicos Islands",
        "zone": 0,
        "states": {}
    },

    "TV": {
        "code": "TV",
        "name": "Tuvalu",
        "zone": 0,
        "states": {
            "Funafuti": "TV-FUN",
            "Nanumanga": "TV-NMG",
            "Nanumea": "TV-NMA",
            "Niutao": "TV-NIT",
            "Nui": "TV-NIU",
            "Nukufetau": "TV-NKF",
            "Nukulaelae": "TV-NKL",
            "Vaitupu": "TV-VAI"
        }
    },

    "UG": {
        "code": "UG",
        "name": "Uganda",
        "zone": 0,
        "states": {
            "Abim": "UG-317",
            "Adjumani": "UG-301",
            "Amolatar": "UG-314",
            "Amuria": "UG-216",
            "Amuru": "UG-319",
            "Apac": "UG-302",
            "Arua": "UG-303",
            "Budaka": "UG-217",
            "Bududa": "UG-223",
            "Bugiri": "UG-201",
            "Bukedea": "UG-224",
            "Bukwa": "UG-218",
            "Buliisa": "UG-419",
            "Bundibugyo": "UG-401",
            "Bushenyi": "UG-402",
            "Busia": "UG-202",
            "Butaleja": "UG-219",
            "Dokolo": "UG-318",
            "Gulu": "UG-304",
            "Hoima": "UG-403",
            "Ibanda": "UG-416",
            "Iganga": "UG-203",
            "Isingiro": "UG-417",
            "Jinja": "UG-204",
            "Kaabong": "UG-315",
            "Kabale": "UG-404",
            "Kabarole": "UG-405",
            "Kaberamaido": "UG-213",
            "Kalangala": "UG-101",
            "Kaliro": "UG-220",
            "Kampala": "UG-102",
            "Kamuli": "UG-205",
            "Kamwenge": "UG-413",
            "Kanungu": "UG-414",
            "Kapchorwa": "UG-206",
            "Kasese": "UG-406",
            "Katakwi": "UG-207",
            "Kayunga": "UG-112",
            "Kibaale": "UG-407",
            "Kiboga": "UG-103",
            "Kiruhura": "UG-418",
            "Kisoro": "UG-408",
            "Kitgum": "UG-305",
            "Koboko": "UG-316",
            "Kotido": "UG-306",
            "Kumi": "UG-208",
            "Kyenjojo": "UG-415",
            "Lira": "UG-307",
            "Luwero": "UG-104",
            "Lyantonde": "UG-116",
            "Manafwa": "UG-221",
            "Maracha": "UG-320",
            "Masaka": "UG-105",
            "Masindi": "UG-409",
            "Mayuge": "UG-214",
            "Mbale": "UG-209",
            "Mbarara": "UG-410",
            "Mityana": "UG-114",
            "Moroto": "UG-308",
            "Moyo": "UG-309",
            "Mpigi": "UG-106",
            "Mubende": "UG-107",
            "Mukono": "UG-108",
            "Nakapiripirit": "UG-311",
            "Nakaseke": "UG-115",
            "Nakasongola": "UG-109",
            "Namutumba": "UG-222",
            "Nebbi": "UG-310",
            "Ntungamo": "UG-411",
            "Oyam": "UG-321",
            "Pader": "UG-312",
            "Pallisa": "UG-210",
            "Rakai": "UG-110",
            "Rukungiri": "UG-412",
            "Sembabule": "UG-111",
            "Sironko": "UG-215",
            "Soroti": "UG-211",
            "Tororo": "UG-212",
            "Wakiso": "UG-113",
            "Yumbe": "UG-313"
        }
    },

    "UA": {
        "code": "UA",
        "name": "Ukraine",
        "zone": 0,
        "states": {
            "Cherkas'ka Oblast'": "UA-71",
            "Chernihivs'ka Oblast'": "UA-74",
            "Chernivets'ka Oblast'": "UA-77",
            "Dnipropetrovs'ka Oblast'": "UA-12",
            "Donets'ka Oblast'": "UA-14",
            "Ivano-Frankivs'ka Oblast'": "UA-26",
            "Kharkivs'ka Oblast'": "UA-63",
            "Khersons'ka Oblast'": "UA-65",
            "Khmel'nyts'ka Oblast'": "UA-68",
            "Kirovohrads'ka Oblast'": "UA-35",
            "Ky�v": "UA-30",
            "Ky�vs'ka Oblast'": "UA-32",
            "L'vivs'ka Oblast'": "UA-46",
            "Luhans'ka Oblast'": "UA-09",
            "Mykola�vs'ka Oblast'": "UA-48",
            "Odes'ka Oblast'": "UA-51",
            "Poltavs'ka Oblast'": "UA-53",
            "Respublika Krym": "UA-43",
            "Rivnens'ka Oblast'": "UA-56",
            "Sevastopol'": "UA-40",
            "Sums'ka Oblast'": "UA-59",
            "Ternopil's'ka Oblast'": "UA-61",
            "Vinnyts'ka Oblast'": "UA-05",
            "Volyns'ka Oblast'": "UA-07",
            "Zakarpats'ka Oblast'": "UA-21",
            "Zaporiz'ka Oblast'": "UA-23",
            "Zhytomyrs'ka Oblast'": "UA-18"
        }
    },

    "AE": {
        "code": "AE",
        "name": "United Arab Emirates",
        "zone": 0,
        "states": {
            "Abu Dhabi": "AE-AD",
            "Ajman": "AE-AJ",
            "Fujairah": "AE-FU",
            "Sharjah": "AE-SH",
            "Dubai": "AE-DU",
            "Ras al-Khaimah": "AE-RK",
            "Umm al-Qaiwain": "AE-UQ"
        }
    },

    "GB": {
        "code": "GB",
        "name": "United Kingdom",
        "zone": 0,
        "states": {
            "Aberdeen City": "GB-ABE",
            "Aberdeenshire": "GB-ABD",
            "Angus": "GB-ANS",
            "Antrim": "GB-ANT",
            "Ards": "GB-ARD",
            "Argyll and Bute": "GB-AGB",
            "Armagh": "GB-ARM",
            "Ballymena": "GB-BLA",
            "Ballymoney": "GB-BLY",
            "Banbridge": "GB-BNB",
            "Barking and Dagenham": "GB-BDG",
            "Barnet": "GB-BNE",
            "Barnsley": "GB-BNS",
            "Bath and North East Somerset": "GB-BAS",
            "Bedford Borough": "GB-BBO",
            "Bedfordshire": "GB-BDF",
            "Belfast": "GB-BFS",
            "Bexley": "GB-BEX",
            "Birmingham": "GB-BIR",
            "Blackburn with Darwen": "GB-BBD",
            "Blackpool": "GB-BPL",
            "Blaenau Gwent": "GB-BGW",
            "Bolton": "GB-BOL",
            "Bournemouth": "GB-BMH",
            "Bracknell Forest": "GB-BRC",
            "Bradford": "GB-BRD",
            "Brent": "GB-BEN",
            "Bridgend": "GB-BGE",
            "Brighton and Hove": "GB-BNH",
            "Bristol, City of": "GB-BST",
            "Bromley": "GB-BRY",
            "Buckingham": "GB-BUC",
            "Buckinghamshire": "GB-BKM",
            "Bury": "GB-BUR",
            "Caerphilly": "GB-CAY",
            "Calderdale": "GB-CLD",
            "Cambridgeshire": "GB-CAM",
            "Camden": "GB-CMD",
            "Cardiff": "GB-CRF",
            "Carmarthenshire": "GB-CMN",
            "Carrickfergus": "GB-CKF",
            "Castlereagh": "GB-CSR",
            "Ceredigion": "GB-CGN",
            "Cheshire": "GB-CHS",
            "Cheshire East": "GB-CHE",
            "Cheshire West and Chester": "GB-CWC",
            "Clackmannanshire": "GB-CLK",
            "Coleraine": "GB-CLR",
            "Conwy": "GB-CWY",
            "Cookstown": "GB-CKT",
            "Cornwall": "GB-CON",
            "Coventry": "GB-COV",
            "Craigavon": "GB-CGV",
            "Croydon": "GB-CRY",
            "Cumbria": "GB-CMA",
            "Darlington": "GB-DAL",
            "DenbighshireD": "GB-DEN",
            "Derby": "GB-DER",
            "Derbyshire": "GB-DBY",
            "Derry": "GB-DRY",
            "Devon": "GB-DEV",
            "Doncaster": "GB-DNC",
            "Dorset": "GB-DOR",
            "Down": "GB-DOW",
            "Dudley": "GB-DUD",
            "Dumfries and Galloway": "GB-DGY",
            "Dundee City": "GB-DND",
            "Dungannon": "GB-DGN",
            "Durham": "GB-DUR",
            "Ealing": "GB-EAL",
            "East Ayrshire": "GB-EAY",
            "East Dunbartonshire": "GB-EDU",
            "East Lothian": "GB-ELN",
            "East Renfrewshire": "GB-ERW",
            "East Riding of Yorkshire": "GB-ERY",
            "East Sussex": "GB-ESX",
            "Edinburgh, City of": "GB-EDH",
            "Eilean Siar": "GB-ELS",
            "Enfield": "GB-ENF",
            "Essex": "GB-ESS",
            "Falkirk": "GB-FAL",
            "Fermanagh": "GB-FER",
            "Fife": "GB-FIF",
            "Flintshire": "GB-FLN",
            "Gateshead": "GB-GAT",
            "Glasgow City": "GB-GLG",
            "Gloucestershire": "GB-GLS",
            "Greater London": "GB-GLO",
            "Greenwich": "GB-GRE",
            "Guernsey": "GB-GGY",
            "Gwynedd": "GB-GWN",
            "Hackney": "GB-HCK",
            "Halton": "GB-HAL",
            "Hammersmith and Fulham": "GB-HMF",
            "Hampshire": "GB-HAM",
            "Haringey": "GB-HRY",
            "Harrow": "GB-HRW",
            "Hartlepool": "GB-HPL",
            "Havering": "GB-HAV",
            "Herefordshire, County of": "GB-HEF",
            "Hertfordshire": "GB-HRT",
            "Highland": "GB-HLD",
            "Hillingdon": "GB-HIL",
            "Hounslow": "GB-HNS",
            "Inverclyde": "GB-IVC",
            "Isle of Anglesey": "GB-AGY",
            "Isle of Man": "GB-IOM",
            "Isle of Wight": "GB-IOW",
            "Isles of Scilly": "GB-IOS",
            "Islington": "GB-ISL",
            "Jersey": "GB-JEY",
            "Kensington and Chelsea": "GB-KEC",
            "Kent": "GB-KEN",
            "Kingston upon Hull, City of": "GB-KHL",
            "Kingston upon Thames": "GB-KTT",
            "Kirklees": "GB-KIR",
            "Knowsley": "GB-KWL",
            "Lambeth": "GB-LBH",
            "Lancashire": "GB-LAN",
            "Larne": "GB-LRN",
            "Leeds": "GB-LDS",
            "Leicester": "GB-LCE",
            "Leicestershire": "GB-LEC",
            "Lewisham": "GB-LEW",
            "Limavady": "GB-LMV",
            "Lincolnshire": "GB-LIN",
            "Lisburn": "GB-LSB",
            "Liverpool": "GB-LIV",
            "London, City of": "GB-LND",
            "Luton": "GB-LUT",
            "Magherafelt": "GB-MFT",
            "Manchester": "GB-MAN",
            "Medway": "GB-MDW",
            "Merthyr Tydfil": "GB-MTY",
            "Merton": "GB-MRT",
            "Middlesbrough": "GB-MDB",
            "Midlothian": "GB-MLN",
            "Milton Keynes": "GB-MIK",
            "Monmouthshire": "GB-MON",
            "Moray": "GB-MRY",
            "Moyle": "GB-MYL",
            "Neath Port Talbot": "GB-NTL",
            "Newcastle upon Tyne": "GB-NET",
            "Newham": "GB-NWM",
            "Newport": "GB-NWP",
            "Newry and Mourne": "GB-NYM",
            "Newtownabbey": "GB-NTA",
            "Norfolk": "GB-NFK",
            "North Ayrshire": "GB-NAY",
            "North Down": "GB-NDN",
            "North East Lincolnshire": "GB-NEL",
            "North Lanarkshire": "GB-NLK",
            "North Lincolnshire": "GB-NLN",
            "North Somerset": "GB-NSM",
            "North Tyneside": "GB-NTY",
            "North Yorkshire": "GB-NYK",
            "Northamptonshire": "GB-NTH",
            "Northumberland": "GB-NBL",
            "Nottingham": "GB-NGM",
            "Nottinghamshire": "GB-NTT",
            "Oldham": "GB-OLD",
            "Omagh": "GB-OMH",
            "Orkney Islands": "GB-ORK",
            "Oxfordshire": "GB-OXF",
            "Pembrokeshire": "GB-PEM",
            "Perth and Kinross": "GB-PKN",
            "Peterborough": "GB-PTE",
            "Plymouth": "GB-PLY",
            "Poole": "GB-POL",
            "Portsmouth": "GB-POR",
            "Powys": "GB-POW",
            "Reading": "GB-RDG",
            "Redbridge": "GB-RDB",
            "Redcar and Cleveland": "GB-RCC",
            "Renfrewshire": "GB-RFW",
            "Rhondda, Cynon, Ta": "GB-RCT",
            "Richmond upon Thames": "GB-RIC",
            "Rochdale": "GB-RCH",
            "Rotherham": "GB-ROT",
            "Rutland": "GB-RUT",
            "Salford": "GB-SLF",
            "Sandwell": "GB-SAW",
            "Scottish Borders, The": "GB-SCB",
            "Sefton": "GB-SFT",
            "Sheffield": "GB-SHF",
            "Shetland Islands": "GB-ZET",
            "Shropshire": "GB-SHR",
            "Slough": "GB-SLG",
            "Solihull": "GB-SOL",
            "Somerset": "GB-SOM",
            "South Ayrshire": "GB-SAY",
            "South Gloucestershire": "GB-SGC",
            "South Lanarkshire": "GB-SLK",
            "South Tyneside": "GB-STY",
            "South Yorkshire": "GB-SYK",
            "Southampton": "GB-STH",
            "Southend-on-Sea": "GB-SOS",
            "Southwark": "GB-SWK",
            "St. Helens": "GB-SHN",
            "Staffordshire": "GB-STS",
            "Stirling": "GB-STG",
            "Stockport": "GB-SKP",
            "Stockton-on-Tees": "GB-STT",
            "Stoke-on-Trent": "GB-STE",
            "Strabane": "GB-STB",
            "Suffolk": "GB-SFK",
            "Sunderland": "GB-SND",
            "Surrey": "GB-SRY",
            "Sutton": "GB-STN",
            "Swansea": "GB-SWA",
            "Swindon": "GB-SWD",
            "Tameside": "GB-TAM",
            "Telford and Wrekin": "GB-TFW",
            "Thurrock": "GB-THR",
            "Torbay": "GB-TOB",
            "Torfaen": "GB-TOF",
            "Tower Hamlets": "GB-TWH",
            "Trafford": "GB-TRF",
            "Vale of Glamorgan, T": "GB-VGL",
            "Wakefield": "GB-WKF",
            "Walsall": "GB-WLL",
            "Waltham Forest": "GB-WFT",
            "Wandsworth": "GB-WND",
            "Warrington": "GB-WRT",
            "Warwickshire": "GB-WAR",
            "West Berkshire": "GB-WBK",
            "West Dunbartonshire": "GB-WDU",
            "West Lothian": "GB-WLN",
            "West Midlands": "GB-WMD",
            "West Sussex": "GB-WSX",
            "West Yorkshire": "GB-WYK",
            "Westminster": "GB-WSM",
            "Wigan": "GB-WGN",
            "Wiltshire": "GB-WIL",
            "Windsor and Maidenhead": "GB-WNM",
            "Wirral": "GB-WRL",
            "Wokingham": "GB-WOK",
            "Wolverhampton": "GB-WLV",
            "Worcester": "GB-WOC",
            "Worcestershire": "GB-WOR",
            "Wrexham": "GB-WRX",
            "York": "GB-YOR"
        }
    },

    "US": {
        "code": "US",
        "name": "United States",
        "zone": 0,
        "states": {
            "Alabama": "AL",
            "Alaska": "AK",
            "American Samoa": "AS",
            "Arizona": "AZ",
            "Arkansas": "AR",
            "Armed Forces Africa": "AE-A",
            "Armed Forces Americas": "AA",
            "Armed Forces Canada": "AE-C",
            "Armed Forces Europe": "AE-E",
            "Armed Forces Middle East": "AE-M",
            "Armed Forces Pacific": "AP",
            "California": "CA",
            "Colorado": "CO",
            "Connecticut": "CT",
            "Delaware": "DE",
            "District of Columbia": "DC",
            "Federated States of Micronesia": "FM",
            "Florida": "FL",
            "Georgia": "GA",
            "Guam": "GU",
            "Hawaii": "HI",
            "Idaho": "ID",
            "Illinois": "IL",
            "Indiana": "IN",
            "Iowa": "IA",
            "Kansas": "KS",
            "Kentucky": "KY",
            "Louisiana": "LA",
            "Maine": "ME",
            "Maryland": "MD",
            "Massachusetts": "MA",
            "Michigan": "MI",
            "Minnesota": "MN",
            "Mississippi": "MS",
            "Missouri": "MO",
            "Montana": "MT",
            "Nebraska": "NE",
            "Nevada": "NV",
            "New Hampshire": "NH",
            "New Jersey": "NJ",
            "New Mexico": "NM",
            "New York": "NY",
            "North Carolina": "NC",
            "North Dakota": "ND",
            "Northern Mariana Islands": "MP",
            "Ohio": "OH",
            "Oklahoma": "OK",
            "Oregon": "OR",
            "Pennsylvania": "PA",
            "Puerto Rico": "PR",
            "Republic of Marshall Islands": "MH",
            "Rhode Island": "RI",
            "South Carolina": "SC",
            "South Dakota": "SD",
            "Tennessee": "TN",
            "Texas": "TX",
            "Utah": "UT",
            "Vermont": "VT",
            "Virgin Islands of the U.S.": "VI",
            "Virginia": "VA",
            "Washington": "WA",
            "West Virginia": "WV",
            "Wisconsin": "WI",
            "Wyoming": "WY"
        }
    },

    "UM": {
        "code": "UM",
        "name": "United States Minor Outlying Islands",
        "zone": 0,
        "states": {}
    },

    "UY": {
        "code": "UY",
        "name": "Uruguay",
        "zone": 0,
        "states": {
            "Artigas": "UY-AR",
            "Canelones": "UY-CA",
            "Cerro Largo": "UY-CL",
            "Colonia": "UY-CO",
            "Durazno": "UY-DU",
            "Flores": "UY-FS",
            "Florida": "UY-FD",
            "Lavalleja": "UY-LA",
            "Maldonado": "UY-MA",
            "Montevideo": "UY-MO",
            "Paysand�": "UY-PA",
            "R�o Negro": "UY-RN",
            "Rivera": "UY-RV",
            "Rocha": "UY-RO",
            "Salto": "UY-SA",
            "San Jos�": "UY-SJ",
            "Soriano": "UY-SO",
            "Tacuaremb�": "UY-TA",
            "Treinta y Tres": "UY-TT"
        }
    },

    "UZ": {
        "code": "UZ",
        "name": "Uzbekistan",
        "zone": 0,
        "states": {
            "Andijon": "UZ-AN",
            "Buxoro": "UZ-BU",
            "Farg'ona": "UZ-FA",
            "Jizzax": "UZ-JI",
            "Namangan": "UZ-NG",
            "Navoiy": "UZ-NW",
            "Qashqadaryo": "UZ-QA",
            "Qoraqalpog'iston Respublikasi": "UZ-QR",
            "Samarqand": "UZ-SA",
            "Sirdaryo": "UZ-SI",
            "Surxondaryo": "UZ-SU",
            "Toshkent": "UZ-TO",
            "Toshkent City": "UZ-TK",
            "Xorazm": "UZ-XO"
        }
    },

    "VU": {
        "code": "VU",
        "name": "Vanuatu",
        "zone": 0,
        "states": {
            "Malampa": "VU-MAP",
            "P�nama": "VU-PAM",
            "Sanma": "VU-SAM",
            "Sh�fa": "VU-SEE",
            "Taf�a": "VU-TAE",
            "Torba": "VU-TOB"
        }
    },

    "VA": {
        "code": "VA",
        "name": "Vatican City State (Holy See)",
        "zone": 0,
        "states": {}
    },

    "VE": {
        "code": "VE",
        "name": "Venezuela",
        "zone": 0,
        "states": {
            "Amazonas": "VE-Z",
            "Anzo�tegui": "VE-B",
            "Apure": "VE-C",
            "Aragua": "VE-D",
            "Barinas": "VE-E",
            "Bol�var": "VE-F",
            "Carabobo": "VE-G",
            "Cojedes": "VE-H",
            "Delta Amacuro": "VE-Y",
            "Dependencias Federales": "VE-W",
            "Distrito Federal": "VE-A",
            "Falc�n": "VE-I",
            "Gu�rico": "VE-J",
            "Lara": "VE-K",
            "M�rida": "VE-L",
            "Miranda": "VE-M",
            "Monagas": "VE-N",
            "Nueva Esparta": "VE-O",
            "Portuguesa": "VE-P",
            "Sucre": "VE-R",
            "T�chira": "VE-S",
            "Trujillo": "VE-T",
            "Vargas": "VE-X",
            "Yaracuy": "VE-U",
            "Zulia": "VE-V"
        }
    },

    "VN": {
        "code": "VN",
        "name": "Viet Nam",
        "zone": 0,
        "states": {
            "An Giang": "VN-44",
            "Ba Ria - Vung Tau": "VN-43",
            "Bac Can": "VN-53",
            "Bac Giang": "VN-54",
            "Bac Lieu": "VN-55",
            "Bac Ninh": "VN-56",
            "Ben Tre": "VN-50",
            "Binh Dinh": "VN-31",
            "Binh Duong": "VN-57",
            "Binh Phuoc": "VN-58",
            "Binh Thuan": "VN-40",
            "Ca Mau": "VN-59",
            "Can Tho": "VN-48",
            "Cao Bang": "VN-04",
            "Da Nang, thanh pho": "VN-60",
            "Dac Lac": "VN-33",
            "Dak Nong": "VN-72",
            "Dien Bien": "VN-71",
            "Dong Nai": "VN-39",
            "Dong Thap": "VN-45",
            "Gia Lai": "VN-30",
            "Ha Giang": "VN-03",
            "Ha Nam": "VN-63",
            "Ha Noi, thu do": "VN-64",
            "Ha Tay": "VN-15",
            "Ha Tinh": "VN-23",
            "Hai Duong": "VN-61",
            "Hai Phong, thanh pho": "VN-62",
            "Hau Giang": "VN-73",
            "Ho Chi": "VN-65",
            "Hoa Binh": "VN-14",
            "Hung Yen": "VN-66",
            "Khanh Hoa": "VN-34",
            "Kien Giang": "VN-47",
            "Kon Tum": "VN-28",
            "Lai Chau": "VN-01",
            "Lam Dong": "VN-35",
            "Lang Son": "VN-09",
            "Lao Cai": "VN-02",
            "Long An": "VN-41",
            "Nam Dinh": "VN-67",
            "Nghe An": "VN-22",
            "Ninh Binh": "VN-18",
            "Ninh Thuan": "VN-36",
            "Phu Tho": "VN-68",
            "Phu Yen": "VN-32",
            "Quang Binh": "VN-24",
            "Quang Nam": "VN-27",
            "Quang Ngai": "VN-29",
            "Quang Ninh": "VN-13",
            "Quang Tri": "VN-25",
            "Soc Trang": "VN-52",
            "Son La": "VN-05",
            "Tay Ninh": "VN-37",
            "Thai Binh": "VN-20",
            "Thai Nguyen": "VN-69",
            "Thanh Hoa": "VN-21",
            "Thua Thien-Hue": "VN-26",
            "Tien Giang": "VN-46",
            "Tra Vinh": "VN-51",
            "Tuyen Quang": "VN-07",
            "Vinh Long": "VN-49",
            "Vinh Phuc": "VN-70",
            "Yen Bai": "VN-06"
        }
    },

    "VG": {
        "code": "VG",
        "name": "Virgin Islands (British)",
        "zone": 0,
        "states": {}
    },

    "VI": {
        "code": "VI",
        "name": "Virgin Islands (U.S.)",
        "zone": 0,
        "states": {}
    },

    "WL": {
        "code": "WL",
        "name": "Wales",
        "zone": 0,
        "states": {
            "Blaenau Gwent": "WLS-BGW",
            "Bridgend": "WLS-BGE",
            "Caerphilly": "WLS-CAY",
            "Cardiff": "WLS-CRF",
            "Carmarthenshire": "WLS-CMN",
            "Ceredigion": "WLS-CGN",
            "Conwy": "WLS-CWY",
            "Denbighshire": "WLS-DEN",
            "Gwynedd": "WLS-GWN",
            "Isle of Anglesey": "WLS-AGY",
            "Merthyr Tydfil": "WLS-MTY",
            "Monmouthshire": "WLS-MON",
            "Neath Port Talbot": "WLS-NTL",
            "Newport": "WLS-NWP",
            "Pembrokeshire": "WLS-PEM",
            "Powys": "WLS-POW",
            "Rhondda Cynon Taff": "WLS-RCT",
            "Swansea": "WLS-SWA",
            "Torfaen": "WLS-TOF",
            "Vale of Glamorgan, The": "WLS-VGL",
            "Wrexham": "WLS-WRX"
        }
    },

    "WF": {
        "code": "WF",
        "name": "Wallis and Futuna Islands",
        "zone": 0,
        "states": {}
    },

    "EH": {
        "code": "EH",
        "name": "Western Sahara",
        "zone": 0,
        "states": {
            "Boujdour": "EH-BOD",
            "Es Semara": "EH-ESM",
            "Laayoune": "EH-LAA",
            "Oued el Dahab": "EH-OUD"
        }
    },

    "YE": {
        "code": "YE",
        "name": "Yemen",
        "zone": 0
    },

    "YU": {
        "code": "YU",
        "name": "Yugoslavia",
        "zone": 0,
        "states": {}
    },

    "ZR": {
        "code": "ZR",
        "name": "Zaire",
        "zone": 0,
        "states": {}
    },

    "ZM": {
        "code": "ZM",
        "name": "Zambia",
        "zone": 0,
        "states": {
            "Central": "ZM-02",
            "Copperbelt": "ZM-08",
            "Eastern": "ZM-03",
            "Luapula": "ZM-04",
            "Lusaka": "ZM-09",
            "North-Western": "ZM-06",
            "Northern": "ZM-05",
            "Southern": "ZM-07",
            "Western": "ZM-01"
        }
    },

    "ZW": {
        "code": "ZW",
        "name": "Zimbabwe",
        "zone": 0,
        "states": {
            "Bulawayo": "ZW-BU",
            "Harare": "ZW-HA",
            "Manicaland": "ZW-MA",
            "Mashonaland Central": "ZW-MC",
            "Mashonaland East": "ZW-ME",
            "Mashonaland West": "ZW-MW",
            "Masvingo": "ZW-MV",
            "Matabeleland North": "ZW-MN",
            "Matabeleland South": "ZW-MS",
            "Midlands": "ZW-MI"
        }
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


var modals = [];

function Modal(modalSelector) {
    var underlayId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "modal-underlay";


    __.enforce([modalSelector, underlayId], ["string,element", "string"]);

    if (typeof modalSelector === "string" && $(modalSelector).length !== 1) {
        __.log.error("The Modal() selector '" + modalSelector + "' does not match a unique element. Please provide a unique identifier.");
    }

    createUnderlay(underlayId); // if not already present, create underlay

    var nickname = typeof modalSelector === "string" ? "-" + modalSelector : "";

    this.id = String(modals.length + 1) + nickname;
    this.modal = $(modalSelector).get(0);
    this.underlay = $("#" + underlayId).get(0);

    modals.push(this);
}

Modal.modals = modals;

Modal.prototype.dispatchEvent = function (evt) {
    evt = __.createEvent(evt + "-modal-" + this.id);
    window.dispatchEvent(evt);
};

Modal.prototype.get = function () {
    return this.modal;
};

Modal.prototype.on = function (e, fn) {
    var _this = this;

    var events = e.split(" ").map(function (v) {
        return v + "-modal-" + _this.id;
    }).join(" ");
    $(window).on(events, fn);
    return this;
};

Modal.prototype.off = function (e, fn) {
    var _this2 = this;

    var events = e.split(" ").map(function (v) {
        return v + "-modal-" + _this2.id;
    }).join(" ");
    $(window).off(events, fn);
    return this;
};

Modal.prototype.addHandlers = function () {
    var $closeBtns = $(this.modal).find(".modal-close, .btn-close-modal");
    var $underlay = $(this.modal); // due to z-index, underlay handler must be the modal container (excluding children), rather than the actual underlay div
    var that = this;

    $closeBtns.on("click.modalClose", function () {
        return that.hide();
    });
    $underlay.on("click.modalClose", function (e) {
        if (e.target === this) that.hide();
    });
    $(document).on("keyup.modalClose", function (e) {
        return e.keyCode === 27 && that.hide();
    }); // Esc key
};

Modal.prototype.removeHandlers = function () {
    var $closeBtns = $(this.modal).find(".modal-close, .btn-close-modal");
    var $underlay = $(this.modal); // due to z-index, underlay handler must be the modal container (excluding children), rather than the actual underlay div

    $closeBtns.off("click.modalClose");
    $underlay.off("click.modalClose");
    $(document).off("keyup.modalClose");
};

var $html = $("html");

Modal.active = false; // shared state

Modal.prototype.show = function () {
    if (this.active === true) {
        return false;
    }

    if (Modal.active === true) {
        __.log.warning("Another modal window is already open.");
        return false;
    }

    if (this.hiding === true) {
        __.log.error("Cannot show modal while hiding animation is not complete. Allow 200 ms.");
        return false;
    }

    var $modal = $(this.modal);
    var $underlay = $(this.underlay);

    // $underlay.fadeIn(100);
    $underlay.show(function () {
        return $underlay.addClass("show");
    });
    $html.addClass("modal-open"); // prevents scrolling
    $modal.show(function () {
        return $modal.addClass("show");
    });

    this.addHandlers();

    this.active = true;
    Modal.active = true; // set shared state so that no other modals can open

    this.dispatchEvent("show");
    // $("header, main, footer, section, nav").not(".modal").addClass("modal-blur");
    return this;
};

Modal.prototype.hide = function () {
    var _this3 = this;

    if (this.active === false) {
        return false; // already hidden
    }

    var $modal = $(this.modal);
    var $underlay = $(this.underlay);

    // $underlay.fadeOut(200);
    $underlay.removeClass("show");
    $html.removeClass("modal-open");
    $modal.removeClass("show");
    this.hiding = true;
    __.wait(200).then(function () {
        $modal.hide();
        $underlay.hide();
        _this3.hiding = false;
        _this3.dispatchEvent("hidden");
    });

    this.removeHandlers();

    this.active = false;
    Modal.active = false;

    this.dispatchEvent("hide");
    // $("header, main, footer, section, nav").not(".modal").removeClass("modal-blur");
    return this;
};

exports.default = Modal;


function createUnderlay(underlayId) {
    // check for existing underlay, else generate underlay
    if ($("#" + underlayId).length === 0) {
        $("<div></div>").attr("id", underlayId).addClass("modal-backdrop fade").css("display", "none")
        // .css({
        //     "position"        : "fixed",
        //     "top"             : 0,
        //     "bottom"          : 0,
        //     "left"            : 0,
        //     "right"           : 0,
        //     "z-index"         : 1040,
        //     "background-color": "rgba(0, 0, 0, .6)",
        //     "display"         : "none"
        // })
        .appendTo("body");
    }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

__webpack_require__(5);

__webpack_require__(6);

__webpack_require__(7);

__webpack_require__(8);

__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(11);

__webpack_require__(12);

__webpack_require__(13);

__webpack_require__(15);

__webpack_require__(16);

__webpack_require__(17);

__webpack_require__(18);

__webpack_require__(19);

__webpack_require__(20);

__webpack_require__(21);

__webpack_require__(22);

__webpack_require__(23);

__webpack_require__(24);

__webpack_require__(25);

__webpack_require__(26);

__webpack_require__(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// validation config and methods

// submission process
// raw, form, fields, modal, valid, etc.
// "Kount" antifraud
// common-use methods for API
// less-common methods / useful debugging tools
var LimeJuice = _core2.default; // tracking code for "sale" events
// for use in "hooking up" external inputs to form api
// post-processing of submitted data
// initialization process


LimeJuice.version = "1.0.0";
LimeJuice.author = "Alex Wade";

window.LimeJuice = LimeJuice;

exports.default = LimeJuice;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(3);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _index2.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

var _countries = __webpack_require__(1);

var _countries2 = _interopRequireDefault(_countries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


_core2.default.prototype.autocomplete = function () {
    this.autocompleteState();
};

_core2.default.prototype.autocompleteState = function () {
    var $billingState = $(this.getAll("billingState")); // this.billingStateFields
    var $billingCountry = $(this.getAll("billingCountry"));
    var $shippingState = $(this.getAll("shippingState"));
    var $shippingCountry = $(this.getAll("shippingCountry"));

    initStateAutocomplete($billingState, $billingCountry);
    initStateAutocomplete($shippingState, $shippingCountry);
    disableBrowserAutocomplete($billingState, $shippingState);
};

function disableBrowserAutocomplete() {
    for (var _len = arguments.length, $fields = Array(_len), _key = 0; _key < _len; _key++) {
        $fields[_key] = arguments[_key];
    }

    $fields.forEach(function (field) {
        var $field = $(field);
        var autocompleteVal = $field.attr("autocomplete") || "on";
        $field.on("focus", function () {
            $field.attr("autocomplete", "off-" + __.rand(1, 1000)); // can't just use "off" as browsers ignore this
        }).on("blur", function () {
            $field.attr("autocomplete", autocompleteVal);
        });
    });
}

function initStateAutocomplete($stateInput, $countrySelect) {

    var $container = $stateInput.parent();
    var $dropdown = $container.find(".input-autofill");

    $container.css("z-index", parseInt($container.css("z-index")) + 1); // add 1 z-index to fix dropdown falling below other inputs
    $dropdown.css("top", parseInt($stateInput.css("height"))); // adjust positioning of dropdown relative to input height

    $stateInput.on("blur", function () {
        __.wait(100).then(function () {
            // needs time to potentially handle "click" evt on a dropdown list item
            $dropdown.hide(); // before we hide the dropdown content (thereby precluding a "click")
        });
    }).on("keyup", function () {
        var countryCode = $countrySelect.val();
        if (countryCode === "") {
            return;
        }
        var stateValue = $(this).val().toLowerCase();
        var matchTypes = {};
        var matches = Object.entries(_countries2.default[countryCode].states).filter(function (v) {
            var stateNameMatch = v[0].toLowerCase().startsWith(stateValue);
            var stateCodeMatch = v[1].includes("-") ? v[1].split("-")[1].toLowerCase().startsWith(stateValue) : v[1].toLowerCase().startsWith(stateValue);
            if (stateNameMatch || stateCodeMatch) {
                matchTypes.stateName = stateNameMatch;
                matchTypes.stateCode = stateCodeMatch;
                return true;
            }
        });
        // .filter(v => v[0].match(stateValue) || v[1].match(stateValue));
        if (matches.length === 0) {
            $dropdown.hide();
        } else {
            if (matches.length > 5) {
                matches.length = 5;
            }
            $dropdown.html("").show();
            matches.forEach(function (v) {
                var amendedCode = v[1].includes("-") ? v[1].split("-")[1] : v[1];
                var stateNameHTML = processMatchingText(v[0], matchTypes.stateName, stateValue.length);
                var stateCodeHTML = "<em>(" + processMatchingText(amendedCode, matchTypes.stateCode, stateValue.length) + ")</em>";
                var $li = $("<li></li>").attr("data-value", v[0]).html(stateNameHTML + " " + stateCodeHTML).on("mousedown", function () {
                    var value = $(this).attr("data-value");
                    $stateInput.val(value).change();
                    $dropdown.hide();
                });
                $li.appendTo($dropdown);
            });
        }
    });
}

function processMatchingText(str, hasMatch, matchLen) {
    return hasMatch ? str.substr(matchLen).replace(/^/g, "<strong>" + str.slice(0, matchLen) + "</strong>") : str;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


_core2.default.prototype.autofillStart = function () {
    this.autoCardType();
    this.autoExpDate();
    this.autoName();
};

_core2.default.prototype.autofillStop = function () {
    this.autofill.intervals.forEach(function (v) {
        return v.cancel();
    });
    this.autofill.intervals = [];
};

_core2.default.prototype.autoName = function () {
    var $firstName = $(this.get("firstName"));
    var $lastName = $(this.get("lastName"));
    var $billingFirstName = $(this.get("billingFirstName"));
    var $billingLastName = $(this.get("billingLastName"));

    this.autofill.intervals.push(__.repeat(autoCopyNames).every(500));

    function autoCopyNames() {
        var firstName = $billingFirstName.val();
        var lastName = $billingLastName.val();
        if (firstName) {
            $firstName.val(firstName);
        }
        if (lastName) {
            $lastName.val(lastName);
        }
    }
};

_core2.default.prototype.autoExpDate = function () {
    var $expirationMonth = $(this.get("expirationMonth"));
    var $expirationYear = $(this.get("expirationYear"));
    var $expirationDate = $(this.get("expirationDate"));

    this.autofill.intervals.push(__.repeat(convertToDate).every(500));

    function convertToDate() {
        var monthVal = $expirationMonth.val() || "00";
        var yearVal = $expirationYear.val().substr(2) || "00";
        $expirationDate.val(monthVal + yearVal);
    }
};

_core2.default.prototype.autoCardType = function () {
    var $creditCardType = $(this.get("creditCardType"));
    var $creditCardNumber = $(this.get("creditCardNumber"));
    var $creditCardImages = function (that) {
        var imgs = $(that.get()).find(".cc-imgs").children("img");
        return imgs.length ? {
            "color": imgs.filter(".is"),
            "grey": imgs.filter(".not")
        } : undefined;
    }(this);

    typeSelect();
    this.autofill.intervals.push(__.repeat(typeSelect).every(500));

    function typeSelect() {
        if (!$creditCardNumber.length) {
            return false;
        }
        var ccNum = $creditCardNumber.val();
        if (ccNum.startsWith("144444444444444")) {
            // for LL testing
            return setCardType("visa", "visa");
        }
        switch (ccNum.substring(0, 1)) {
            case "4":
                setCardType("visa", "visa");break;
            case "5":
                setCardType("master", "master");break;
            case "6":
                setCardType("discover", "discover");break;
            case "3":
                setCardType("amex", "amex");break;
            // default: setCardType("none", "");
        }
    }

    function setCardType(type, val) {
        if (type === "none") {
            if ($creditCardImages && $creditCardImages.color.length && $creditCardImages.grey.length) {
                $creditCardImages.color.show();
                $creditCardImages.grey.hide();
            }
            if ($creditCardType.length) {
                $creditCardType.val("");
            }
        } else {
            if ($creditCardImages && $creditCardImages.color.length && $creditCardImages.grey.length) {
                $creditCardImages.color.hide();
                $creditCardImages.grey.show();
                $creditCardImages.grey.filter("." + type).hide();
                $creditCardImages.color.filter("." + type).show();
            }
            if ($creditCardType.length) {
                $creditCardType.val(val);
            }
        }
    }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

var _countries = __webpack_require__(1);

var _countries2 = _interopRequireDefault(_countries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


_core2.default.prototype.autoformat = function () {
    this.autoformatCCNum();
    this.autoformatState();
    // this.autoformatName();
    return true;
};

_core2.default.prototype.autoformatCCNum = function () {
    var $creditCardNumber = $(this.get("creditCardNumber"));
    var formattedVal = $creditCardNumber.val().replace(/-|\s/g, "");
    $creditCardNumber.val(formattedVal);
};

_core2.default.prototype.autoformatState = function () {
    var $billingState = $(this.get("billingState"));
    var $billingCountry = $(this.get("billingCountry"));
    var $shippingState = $(this.get("shippingState"));
    var $shippingCountry = $(this.get("shippingCountry"));

    initStateAutoformat($billingState, $billingCountry);
    initStateAutoformat($shippingState, $shippingCountry);
};

function initStateAutoformat($stateInput, $countrySelect) {
    var stateValue = $stateInput.val();
    var countryCode = $countrySelect.val();

    if (countryCode !== "") {
        var validStates = _countries2.default[countryCode].states;

        if (!validStates) {
            // stateless country
            $stateInput.val(""); // must be empty
            return true;
        }

        if (!Object.keys(validStates).length) {
            // country with no known states
            var capitalized = __(stateValue).ucfirst().get();
            $stateInput.val(capitalized); // any state is fine, but capitalize it
            return true;
        }

        var stateCode = Object.values(validStates).find(function (stateCode) {
            var isStateCode = function () {
                var formattedStateValue = stateValue.toUpperCase();
                return stateCode === stateValue || (stateCode.includes("-") ? stateCode.split("-")[1].toUpperCase() === formattedStateValue : stateCode === formattedStateValue);
            }();
            var isStateName = function () {
                var stateName = __(validStates).search(stateCode).get()[0];
                return stateName === stateValue || stateName.toLowerCase() === stateValue.trim().toLowerCase();
            }();
            return isStateCode || isStateName;
        });

        if (stateCode) {
            $stateInput.val(stateCode);
        }
    }
}

_core2.default.prototype.autoformatName = function () {
    var $firstName = $(this.get("billingFirstName"));
    var $lastName = $(this.get("billingLastName"));

    initNameAutoformat($firstName, $lastName);

    function initNameAutoformat() {
        for (var _len = arguments.length, $names = Array(_len), _key = 0; _key < _len; _key++) {
            $names[_key] = arguments[_key];
        }

        $names.forEach(function ($name) {
            var name = $name.val();
            var customerAttemptedValidCapitalization = contains1to3Capitals(name);
            if (name && !customerAttemptedValidCapitalization) {
                var formattedName = __(name).toTitleCase().get();
                $name.val(formattedName);
            }
        });
    }

    function contains1to3Capitals(str) {
        var numCapitals = str.replace(/[^A-Z]/g, "").length;
        return numCapitals >= 1 && numCapitals <= 4;
    }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


_core2.default.prototype.initButtons = function () {

    if (this.config.actionButton) {
        var $actionBtn = $(this.config.actionButton);
        if ($actionBtn.length) {
            this.assign($actionBtn, "action");
        } else {
            __.log.error(assignmentError(this.config.actionButton, "action"));
            return false;
        }
    }

    if (this.config.submitButton) {
        var $submitBtn = $(this.config.submitButton);
        if ($submitBtn.length) {
            this.assign($submitBtn, "submit");
        } else {
            __.log.error(assignmentError(this.config.submitButton, "submit"));
            return false;
        }
    }

    if (this.imported) {
        // templates have a default submit button
        var $defaultSubmitBtn = $(this.find(".btn-submit"));
        if ($defaultSubmitBtn.length) {
            this.assign($defaultSubmitBtn, "submit");
        } else {
            __.log.error("Something appears to be wrong with your form HTML. No '.btn-submit' class found within form.");
            return false;
        }
    }

    return true;
};

function createLoader(height, margin) {
    // const margin = (height - 40) / 2;
    return "\n    <div style=\"height: " + height + "px; margin: " + margin + ";\">\n        <div class=\"vcenter\">\n            <svg class=\"loader center-block\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"40px\" height=\"40px\" viewBox=\"0 0 66 66\">\n                <circle class=\"loader-path\" fill=\"none\" stroke-width=\"6\" stroke-linecap=\"round\" cx=\"33\" cy=\"33\" r=\"30\"></circle>\n            </svg>\n        </div>\n    </div>\n    ";
}

_core2.default.prototype.disableButton = function () {
    this.$buttons.get().forEach(function (button) {
        if (!$(button).next().is("svg.loader")) {
            var height = $(button).outerHeight();
            var margin = $(button).css("margin");
            $(button).after(createLoader(height, margin));
        }
        $(button).hide().next().show();
    });
};

_core2.default.prototype.enableButton = function () {
    this.$buttons.get().forEach(function (button) {
        $(button).show().next().hide();
    });
};

Object.defineProperties(_core2.default.prototype, {
    "$actionButton": {
        get: function get() {
            var $actionBtn = $(this.config.actionButton);
            if ($actionBtn.length) {
                return $actionBtn;
            } else return null;
        }
    },
    "$submitButton": {
        get: function get() {
            var $submitBtns = $();
            var $configSubmitBtn = $(this.config.submitButton);
            if ($configSubmitBtn.length) {
                $submitBtns = $submitBtns.add($configSubmitBtn);
            }
            var $defaultSubmitBtn = $(this.find(".btn-submit"));
            if ($defaultSubmitBtn.length) {
                $submitBtns = $submitBtns.add($defaultSubmitBtn);
            }
            return $submitBtns.length ? $submitBtns : null;
        }
    },
    "$buttons": {
        get: function get() {
            var $btns = $();
            if (this.$actionButton) {
                $btns = $btns.add(this.$actionButton);
            }
            if (this.$submitButton) {
                $btns = $btns.add(this.$submitButton);
            }
            return $btns.length ? $btns : null;
        }
    }
});

function assignmentError(selector, behaviour) {
    return "Could not find '" + selector + "' to assign \"" + behaviour + "\" behaviour.\nEither add this element, OR disable buttons() in initialization settings and manually assign() a button to the \"" + behaviour + "\" behaviour.";
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


_core2.default.prototype.captcha = function () {

    var response = window.grecaptcha.getResponse();

    if (!response) {
        window.alert("Please verify that you are not a robot by completing the CAPTCHA.");
        return false;
    }

    var data = {
        "response": response,
        "remoteip": ""
    };

    return $.post(this.config.recaptchaScriptFilePath, data).promise().then(function (result) {
        var verified = JSON.parse(result).success;
        if (!verified) {
            window.alert("Please verify that you are not a robot by completing the CAPTCHA.");
            return false;
        } else return true;
    });
};

_core2.default.prototype.initCaptcha = function () {

    var loadedApi = new Promise(function (resolve) {
        $.getScript("https://www.google.com/recaptcha/api.js").done(function () {
            // __.log.success("Loaded Google reCAPTCHA.");
            resolve(true);
        }).fail(function () {
            __.log.error("Unable to load Google reCAPTCHA. Trying again...");
        });
    });

    var captchaReady = new Promise(function (resolve) {
        grecaptchaLoaded();
        function grecaptchaLoaded() {
            var grecaptcha = window.grecaptcha;
            if (!!grecaptcha && typeof grecaptcha.getResponse === "function") {
                // __.log.success("Captcha ready.");
                resolve(true);
                return true;
            } else {
                __.wait(100).then(grecaptchaLoaded);
                return false;
            }
        }
    });

    return Promise.all([loadedApi, captchaReady]);
};

_core2.default.prototype.containsCaptcha = function () {
    return !!this.find(".g-recaptcha");
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

var _countries = __webpack_require__(1);

var _countries2 = _interopRequireDefault(_countries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


_core2.default.prototype.initDigitalProduct = function () {

    var billingCountrySelect = this.get("billingCountry");
    var billingCountryListHTML = buildCountryListHTML(this.sellToCountries);
    $(billingCountrySelect).html(billingCountryListHTML);

    // we still need to populate shipping countries based upon sellTo countries (though hidden), for "sameship copy" to work
    var shippingCountrySelect = this.get("shippingCountry");
    var shippingCountryListHTML = buildCountryListHTML(this.sellToCountries);
    $(shippingCountrySelect).html(shippingCountryListHTML);

    this.handleStateless();
    this.sameshipCopyStart();
    this.$billingSameAsShippingSection.attr("hidden", true);

    if (this.config.defaultCountry !== null) {
        $(billingCountrySelect).val(this.config.defaultCountry).change();
    }
};

_core2.default.prototype.initPhysicalProduct = function () {
    var _this = this;

    var invalidShipTo = this.shipToCountries.filter(function (country) {
        return !_this.sellToCountries.includes(country);
    });
    if (invalidShipTo.length) {
        __.log.error("You have added one or more 'shipTo' countries that are not in the 'sellTo' list: " + invalidShipTo.map(function (v) {
            return _countries2.default[v].name;
        }).join(", "));
    }

    var shippingCountrySelect = this.getAll("shippingCountry");
    var shippingCountryListHTML = buildCountryListHTML(this.shipToCountries);
    $(shippingCountrySelect).html(shippingCountryListHTML);

    // billing country list is generated in the opener() function

    this.$billingSameAsShippingBox.on("click", function () {
        return _this.sameship.call(_this);
    });

    this.autofillShippingInfo();
    this.initSameship();
    this.handleStateless();

    if (this.config.defaultCountry !== null) {
        var billingCountrySelect = this.get("billingCountry");
        $(billingCountrySelect).val(this.config.defaultCountry).change();
    }
};

_core2.default.prototype.autofillShippingInfo = function () {
    var cdata = this.mode.data;
    if (cdata && __.typeof(cdata.formData) === "object") {
        var shippingAddress = ["shippingAddress1", "shippingAddress2", "shippingCity", "shippingState", "shippingCountry", "shippingZip"];
        var autofillData = __(this.mode.data.formData).keep(["billingSameAsShipping"].concat(shippingAddress)).get();
        this.populateAll(autofillData); // fill internal fields AND proxies
        this.save(shippingAddress, "shippingA");
    }
};

_core2.default.prototype.initSameship = function () {
    var billingSameAsShipping = this.$billingSameAsShipping.val();
    if (billingSameAsShipping === "YES") {
        // this is "backwards" because sameship() below will toggleClass() at start
        this.$billingSameAsShippingBox.addClass("active"); // (normally an "active" shipping dropdown happens when billing is NOT same as shipping)
    } else {
        this.$billingSameAsShippingBox.removeClass("active");
    }
    this.sameship();
};

_core2.default.prototype.sameship = function () {
    this.$billingSameAsShippingBox.toggleClass("active");
    var active = this.$billingSameAsShippingBox.hasClass("active");
    if (active) {
        opener.call(this);
    } else {
        closer.call(this);
    }
};

_core2.default.prototype.handleStateless = function () {
    var $billingState = $(this.get("billingState"));
    var $billingCountry = $(this.get("billingCountry"));
    var $shippingState = $(this.getAll("shippingState"));
    var $shippingCountry = $(this.getAll("shippingCountry"));

    disableStateOnStateless($billingState, $billingCountry);
    if ($shippingState.length && $shippingCountry.length) {
        disableStateOnStateless($shippingState, $shippingCountry);
    }
};

var evts = "change keyup".split(" ").map(function (v) {
    return v + ".sameshipCopy";
}).join(" ");

_core2.default.prototype.sameshipCopyStart = function () {
    var _this2 = this;

    this.sameshipCopy();
    this.$billingAddressFields.on(evts, function () {
        return _this2.sameshipCopy();
    }); // keep () => {}, as this.sameshipCopy will not retain 'this' context
    this.on("presubmit.sameshipCopy", function () {
        if (_this2.$billingSameAsShipping.val() === "YES") {
            _this2.sameshipCopy();
        }
    });
};

_core2.default.prototype.sameshipCopyStop = function () {
    this.$billingAddressFields.off(evts);
    this.off("presubmit.sameshipCopy");
};

_core2.default.prototype.sameshipCopy = function () {
    var thisForm = this;
    this.$billingAddressFields.get().forEach(function (field) {
        var fieldName = $(field).attr("name");
        var billingValue = $(thisForm.get(fieldName)).val();
        if (billingValue) {
            var $shippingField = $(thisForm.get(fieldName.replace("billing", "shipping")));
            $shippingField.val(billingValue);
        }
    });
};

function disableStateOnStateless($stateInput, $countrySelect) {
    var statePlaceholder = $stateInput.attr("placeholder");
    var stateLabel = $stateInput.parent().children("label").text();

    $countrySelect.on("change", function () {
        var countryCode = $(this).val();
        if (countryCode && !_countries2.default[countryCode].hasOwnProperty("states")) {
            $stateInput.val("").attr("disabled", true).attr("placeholder", "N/A").parent().children("label").text("N/A");
        } else {
            $stateInput.attr("disabled", false).attr("placeholder", statePlaceholder).parent().children("label").text(stateLabel);
        }
    });
}

function opener() {
    this.$shippingPanel.show(); // show the panel
    this.$billingSameAsShipping.val("NO");
    this.$billingSameAsShippingCheckbox.prop("checked", false); // if there is a checkbox, uncheck it

    this.sameshipCopyStop();
    if (this._checkpoints["shippingA"] !== undefined) {
        // check for saved shipping address
        var shippingAddress = "shippingAddress1, shippingAddress2, shippingCity, shippingState, shippingCountry, shippingZip";
        this.resetAll(shippingAddress, "shippingA"); // use saved shipping address if present
    }

    var billingSaveFields = "billingState, billingCountry";
    this.save(billingSaveFields, "billingC"); // save the country before we nuke the list
    var billingCountrySelect = this.get("billingCountry");
    var billingCountryListHTML = buildCountryListHTML(this.sellToCountries);
    $(billingCountrySelect).html(billingCountryListHTML);
    this.reset(billingSaveFields, "billingC"); // put it back in there
    this.dispatchEvent("countrylistupdate"); // this is particularly useful if using jQuery.selectmenu or a similar <select> replacement

    var requiredShippingFields = "shippingAddress1, shippingCity, shippingState, shippingCountry, shippingZip";
    this.setRequired(requiredShippingFields, true); // since the panel is open, shipping fields now MUST be filled out
    this.dispatchEvent("sameshipopen");
}

function closer() {
    this.$shippingPanel.hide(); // hide the panel
    this.$billingSameAsShipping.val("YES");
    this.$billingSameAsShippingCheckbox.prop("checked", true); // if there is a checkbox, check it

    var shippingAddress = "shippingAddress1, shippingAddress2, shippingCity, shippingState, shippingCountry, shippingZip";
    this.save(shippingAddress, "shippingA"); // save shipping address at present

    var billingAddress = "billingAddress1, billingAddress2, billingCity, billingState, billingCountry, billingZip";
    this.save(billingAddress, "billingA"); // save the full billing address, before nuke

    var billingCountrySelect = this.get("billingCountry");
    var billingCountryListHTML = buildCountryListHTML(this.shipToCountries);
    $(billingCountrySelect).html(billingCountryListHTML);
    this.reset(billingAddress, "billingA"); // reset to that save point
    if (this.get("billingCountry").value === "") {
        // if country is "", that means the address is no longer valid
        this.reset(billingAddress, "default"); // so we clear the whole thing, to make sure the customer reviews
    }
    this.dispatchEvent("countrylistupdate"); // this is particularly useful if using jQuery.selectmenu or a similar <select> replacement
    this.sameshipCopyStart(); // while closed, billing fields copy automatically to shipping fields

    var requiredShippingFields = "shippingAddress1, shippingCity, shippingState, shippingCountry, shippingZip";
    this.setRequired(requiredShippingFields, false); // since the panel is closed, shipping fields have been cleared and are not required for validation
    this.dispatchEvent("sameshipclose");
}

function buildCountryListHTML(list) {
    var nullCase = "<option value=\"\" selected>Please select a country</option>";
    var specialCases = ["US", "CA"].map(function (countryCode) {
        return list.includes(countryCode) && list.length > 5 ? "<option value=\"" + countryCode + "\">" + _countries2.default[countryCode].name + "</option>" : "";
    });
    var mainList = list.sort(sortByName).reduce(function (acc, countryCode) {
        acc += "<option value=\"" + countryCode + "\">" + _countries2.default[countryCode].name + "</option>";
        return acc;
    }, "");
    return nullCase + specialCases + mainList;
}

function sortByName(a, b) {
    var aName = _countries2.default[a].name;
    var bName = _countries2.default[b].name;
    return aName > bName ? 1 : aName < bName ? -1 : 0;
}

Object.defineProperties(_core2.default.prototype, {
    "$billingSameAsShipping": {
        get: function get() {
            return $(this.get("billingSameAsShipping")); // the input that LimeLight uses
        }
    },
    "$billingSameAsShippingBox": {
        get: function get() {
            return this.$billingSameAsShippingCheckbox.parent(); // the box surrounding the checkbox and including text
        }
    },
    "$billingSameAsShippingCheckbox": {
        get: function get() {
            return $(this.getAll("sameshipCheckbox")); // the visible checkbox
        }
    },
    "$billingSameAsShippingSection": {
        get: function get() {
            return this.$billingSameAsShippingBox.parent(); // the visible checkbox
        }
    },
    "$shippingPanel": {
        get: function get() {
            return this.$billingSameAsShippingCheckbox.parent().next(); // the panel that drops down with shipping fields
        }
    },
    "$billingAddressFields": {
        get: function get() {
            var _this3 = this;

            return $(["Address1", "Address2", "City", "State", "Country", "Zip"].map(function (v) {
                return _this3.get("billing" + v);
            }));
        }
    },
    "$shippingAddressFields": {
        get: function get() {
            var _this4 = this;

            return $(["Address1", "Address2", "City", "State", "Country", "Zip"].map(function (v) {
                return _this4.get("shipping" + v);
            }));
        }
    }
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

var _modal = __webpack_require__(2);

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = window.jQuery;

_core2.default.prototype.createCVVBox = function () {
    if (this.CVVBox === undefined) {
        this.CVVBox = new CVVBox(this);
        this.cbox = this.CVVBox;
    }
    return this.CVVBox;
};

function CVVBox(form) {
    this.form = form; // 'this' form API, for reference
    this.raw = $(CVVBoxHTML(form.id)).get(0);
    this.modal = new _modal2.default(this.raw);
}

CVVBox.prototype.get = function () {
    return this.raw;
};

CVVBox.prototype.getField = function () {
    return $(this.get()).find("input").get(0);
};

Object.defineProperties(CVVBox.prototype, {
    "field": {
        get: function get() {
            return this.getField();
        }
    },
    "cvv": {
        get: function get() {
            return this.getField();
        }
    }
});

CVVBox.prototype.inject = function () {
    $("body").append(this.get());
    this._initialize();
    return this;
};

CVVBox.prototype.show = function () {
    this.modal.show();
    return this;
};

CVVBox.prototype.hide = function () {
    this.modal.hide();
    return this;
};

// CVVBox.prototype.copyToForm = function () {
//     this.form.copy(this.field, "CVV");
//     return this;
// };

CVVBox.prototype._initialize = function () {
    // this.copyToForm();
    var cbox = this;
    var form = this.form;

    var last4 = form.mode.data ? form.mode.data.ccLast4 : null;
    if (last4) {
        $(cbox.get()).find(".cvv-last4").removeAttr("hidden").find("strong").text(last4);
    }

    var $btn = $(cbox.get()).find(".btn-cvv-submit");
    form.assign($btn, "submit").proxy("CVV", ["proxy-CVV"]);
};

function CVVBoxHTML(formId) {
    // .. better to have this at the bottom of the page
    return "\n<section class=\"modal fade text-center\">\n    <style>\n        .modal .modal-dialog.vcenter {\n            -webkit-transform: translate(0, -95%);\n            -ms-transform: translate(0, -95%);\n            transform: translate(0, -95%);\n        }\n        .modal.show .modal-dialog.vcenter {\n            -webkit-transform: translate(0, -50%);\n            -ms-transform: translate(0, -50%);\n            transform: translate(0, -50%);\n            margin: 0 auto;\n        }\n    </style>\n    <div class=\"modal-dialog dib vcenter\">\n        <div class=\"modal-content border alert-success\">\n            <div class=\"modal-header desktop--p40 mobile--p20 bg-white border-bottom\">\n                <h3 class=\"fw-normal text-center mb0 mt10\">Please <strong class=\"text-success\">confirm your security code</strong>:</h3>\n                <div class=\"cvv-last4\" class=\"text-center\" hidden>\n                    <p class=\"mb0\">(for card ending in <strong></strong>)</p>\n                </div>\n            </div>\n            <div class=\"modal-body desktop--p40 mobile--p20 bg-white\">\n                <div class=\"row\">\n                    <div class=\"col-sm-6 form-group-lg\">\n                        <div class=\"input-default last-input center-block\" style=\"width: 150px;\">\n                            <label for=\"proxy-CVV\" class=\"dn\">CVV code</label>\n                            <input type=\"text\" name=\"proxy-CVV\" placeholder=\"CVV code\" required>\n                            <i class=\"material-icons input-inline-icon\">lock_outline</i>\n                            <a class=\"cvvhelp\" style=\"top: 7px;\" title=\"What's a CVV code?\" href=\"https://www.fasttracktofatloss.com/exclusive/cvv.html\" onclick=\"javascript:void window.open('https://www.fasttracktofatloss.com/exclusive/cvv.html','1461796629683','width=700,height=250,toolbar=0,menubar=0,location=0,status=0,scrollbars=0,resizable=1,left=0,top=0');return false;\">\n                                <svg style=\"width:24px;height:24px;margin-top:7px;\" viewBox=\"0 0 24 24\">\n                                    <path fill=\"#2962ff\" d=\"M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z\">\n                                </svg>\n                            </a>\n                        </div>\n                    </div>\n                    <div class=\"col-sm-6\">\n                        <button type=\"button\" class=\"btn-cvv-submit btn-default btn-success desktop--my0\">Confirm</button>\n                    </div>\n                </div>\n                <div class=\"limejuice-errors limejuice-errors-" + formId + "\"></div>\n            </div>\n        </div>\n    </div>\n</section>\n";
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


_core2.default.prototype.submitForm = function () {
    __.log.success("Submitting form...");
    $(this.form).submit();
    return this;
};

_core2.default.prototype.fill = function () {
    this.populate("billingCountry", this.testValues.billingCountry);
    $(this.get("billingCountry")).change();
    if (this.testValues.shippingCountry) {
        this.populate("shippingCountry", this.testValues.shippingCountry);
        $(this.get("shippingCountry")).change();
    }
    this.populate(this.testValues);
    return this;
};

_core2.default.prototype.deleteCookies = function () {
    var modeCookieName = this.mode.cname;
    var dupsCookieName = this.dups.cname;
    __.setCookie(modeCookieName, "", new Date());
    __.setCookie(dupsCookieName, "", new Date());
    return this;
};

_core2.default.prototype.testMode = function () {
    this.config.submit = __(this.config.submit).replace("submitForm", "testSubmit").get();
};

_core2.default.prototype.materialize = function () {
    this.inject();
    this.modalize();
    this.show();
    return this;
};

_core2.default.prototype.append = function (html) {
    $(this.form).append(html);
    return this;
};

_core2.default.prototype.serialize = function (fieldNames) {
    var sanitize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ["CVV"];

    var fields = function (that) {
        if (!fieldNames) return that.fields;
        var fields = that.get(fieldNames);
        return __.typeof(fields) === "element" ? [fields] : fields;
    }(this);
    if (!sanitize) {
        sanitize = [];
    }
    return fields.filter(function (v) {
        return !sanitize.includes(v.name);
    }).reduce(function (acc, v) {
        var name = window.encodeURIComponent(v.name);
        var value = window.encodeURIComponent(v.value);
        acc += name + "=" + value + "&";
        return acc;
    }, "").slice(0, -1);
};

_core2.default.prototype.toObject = function (fieldNames) {
    var sanitize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ["CVV"];

    var fields = function (that) {
        if (!fieldNames) return that.fields;
        var fields = that.get(fieldNames);
        return __.typeof(fields) === "element" ? [fields] : fields;
    }(this);
    if (!sanitize) {
        sanitize = [];
    }
    return fields.filter(function (v) {
        return !sanitize.includes(v.name);
    }).reduce(function (acc, v) {
        acc[v.name] = v.value;
        return acc;
    }, {});
};

_core2.default.prototype.clear = function () {
    var fieldNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var fields = function (that) {
        if (!fieldNames) return that.fields;
        var fields = that.get(fieldNames);
        return __.typeof(fields) === "element" ? [fields] : fields;
    }(this);
    fields.forEach(function (field) {
        return field.value = "";
    });
    return this;
};

_core2.default.prototype.testValues = {
    "billingFirstName": "Alex",
    "billingLastName": "Wade",
    "email": "alex@globalfitnessnetwork.com",
    "phone": "503-956-5078",
    "billingAddress1": "11111 SE 93rd Ave",
    "billingAddress2": "Apt 20",
    "billingCity": "Clackamas",
    "billingState": "OR",
    "billingZip": "97015",
    "billingCountry": "US",

    "shippingAddress1": "11111 SE 93rd Ave",
    "shippingAddress2": "Apt 20",
    "shippingCity": "Clackamas",
    "shippingState": "OR",
    "shippingZip": "97015",
    "shippingCountry": "US",

    // "creditCardNumber": "1444444444444440", // success
    "creditCardNumber": "1444444444444441", // decline
    "expirationMonth": "01",
    "expirationYear": "2026",
    "CVV": "123"
};

_core2.default.prototype.ref = ["infusion_xid", "Order0_Campaign0", "Order0_Platform", "Order0_SalesFunnel", "Order0_OrderURL", "JobRecurring0_Campaign0", "JobRecurring0_Platform", "JobRecurring0_SalesFunnel", "JobRecurring0_OrderURL", "Contact0LeadSourceId", "Contact0_RecentCampaign", "Contact0_AdSource", "Contact0_AdCampaign", "Contact0_AdName"];

// Form.prototype._checkpoints = {
//     "default": undefined
// };

_core2.default.prototype.save = function () {
    var fieldNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var checkpoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "default";

    this._checkpoints[checkpoint] = this.serialize(fieldNames, null);
    return this;
};

_core2.default.prototype.reset = function () {
    var fieldNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var checkpoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "default";
    var clearRemaining = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var fields = function (that) {
        if (!fieldNames) return that.fields;
        var fields = that.get(fieldNames);
        return __.typeof(fields) === "element" ? [fields] : fields;
    }(this);
    checkpoint = this._checkpoints[checkpoint];
    if (!checkpoint) {
        __.log.warning("No checkpoint by that name.");
        return this;
    }
    checkpoint = __(checkpoint).parse().get(); // convert serialized string to object
    fields.forEach(function (field) {
        if (checkpoint.hasOwnProperty(field.name)) {
            var value = checkpoint[field.name];
            $(field).val(value).change();
        } else if (clearRemaining === true) {
            $(field).val("").change();
        }
    });
    return this;
};

_core2.default.prototype.resetAll = function () {
    var fieldNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _this = this;

    var checkpoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "default";
    var clearRemaining = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var fields = function (that) {
        if (!fieldNames) return that.fields;
        var fields = that.get(fieldNames);
        return __.typeof(fields) === "element" ? [fields] : fields;
    }(this);
    checkpoint = this._checkpoints[checkpoint];
    if (!checkpoint) {
        __.log.warning("No checkpoint by that name.");
        return this;
    }
    checkpoint = __(checkpoint).parse().get(); // convert serialized string to object
    fields.forEach(function (field) {
        var allFields = _this.getAll(field.name);
        if (checkpoint.hasOwnProperty(field.name)) {
            var value = checkpoint[field.name];
            allFields.forEach(function (v) {
                return $(v).val(value).change();
            });
        } else if (clearRemaining === true) {
            allFields.forEach(function (v) {
                return $(v).val("").change();
            });
        }
    });
    return this;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


_core2.default.prototype.dispatchEvent = function (eventName) {
    var name = getEventNames.call(this, eventName);
    // const evt = __.createEvent(name);
    // window.dispatchEvent(evt);
    $(window).trigger(name);
};

function getEventNames(eventNames) {
    var _this = this;

    return eventNames.split(" ").map(function (eventName) {
        return eventName.includes(".") ? eventName.split(".")[0] + "-form-" + _this.id + "." + eventName.split(".")[1] : eventName + "-form-" + _this.id;
    }).join(" ");
}

_core2.default.prototype.on = function (e, fn) {
    var events = getEventNames.call(this, e);
    $(window).on(events, fn);
};

_core2.default.prototype.off = function (e, fn) {
    var events = getEventNames.call(this, e);
    $(window).off(events, fn);
};

_core2.default.prototype.inject = function () {
    this.attach();
    this.injected = true;
    this.dispatchEvent("inject");
    return this;
};

_core2.default.prototype.attach = function () {
    $("body").append(this.get());
    this.dispatchEvent("attach");
    return this;
};

_core2.default.prototype.detach = function () {
    if (!!this.modal && this.modal.active === true) {
        this.hide();
    }
    $(this.get()).detach();
    this.dispatchEvent("detach");
    return this;
};

/*
form.assign(".btn-1", "behaviour-1", "click");
form.dismiss(".btn-1")
*/

_core2.default.prototype.assign = function () {
    return this.createAssignment.apply(this, arguments);
};

_core2.default.prototype.dismiss = function () {
    return this.removeAssignment.apply(this, arguments);
};

_core2.default.prototype.action = function () {
    var status = this.mode.status;
    var thisForm = this;
    var map = {
        "opt-in": function optIn() {
            return thisForm.submit();
        },
        "upfront": function upfront() {
            return thisForm.submit();
        },
        "standalone": function standalone() {
            return thisForm.show();
        },
        "upsell": function upsell() {
            return thisForm.submit();
        },
        "upsell-cvv": function upsellCvv() {
            return thisForm.CVVBox.show();
        }
    };
    return map[status]();
};

_core2.default.prototype.behaviours = {
    "action": function action(that) {
        return that.action();
    },
    "submit": function submit(that) {
        return that.submit();
    }
};

_core2.default.prototype.createAssignment = function (selector, behaviour) {
    var evt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "click";


    __.enforce([[selector, "string,element"], [behaviour, "string,function"], [evt, "string"]]);

    var behaviourName = behaviour;

    if (typeof behaviour === "function") {
        var behaviourNum = Object.keys(this.behaviours).length + 1;
        behaviourName = "behaviour-" + behaviourNum.toString();
        this.behaviours[behaviourName] = behaviour;
    }

    var fn = this.behaviours[behaviourName];
    var $btn = $(selector).on(evt, function (e) {
        return e.preventDefault();
    });

    var that = this;
    $btn.on(evt + "." + behaviourName, function () {
        return fn(that);
    });

    this.assignments.push([$btn, behaviourName, evt]);

    return this;
};

_core2.default.prototype.removeAssignment = function (selector, behaviourName) {
    var _this2 = this;

    var evt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "click";


    __.enforce([[selector, "string,element"], [behaviourName, "string,undefined"], [evt, "string"]]);

    var $btn = $(selector);

    this.assignments.filter(function (v) {
        return v[0].is($btn);
    }).filter(function (v) {
        return behaviourName ? v[1] === behaviourName : true;
    }).filter(function (v) {
        return v[2] === evt;
    }).forEach(function (v) {
        var _ref2 = [v[0], v[1], v[2]],
            $btn = _ref2[0],
            behaviourName = _ref2[1],
            evt = _ref2[2];

        $btn.off(evt + "." + behaviourName);

        var index = _this2.assignments.indexOf(function (x) {
            return x[0].is($btn) && x[1] === behaviourName && x[2] === evt;
        }); // same as filters above, roughly
        _this2.assignments.splice(index, 1);
    });

    return this;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ["Aaland Islands", "Albania", "Andorra", "Anguilla", "Aruba", "Austria", "Azerbaijan", "Belgium", "Bermuda", "Bosnia and Herzegowina", "Bouvet Island", "British Indian Ocean Territory", "Bulgaria", "Cayman Islands", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Falkland Islands (Malvinas)", "Faroe Islands", "Finland", "France", "France, Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Germany", "Gibraltar", "Greece", "Greenland", "Guadeloupe", "Guernsey", "Heard and Mc Donald Islands", "Hungary", "Iceland", "Ireland", "Isle of Man", "Italy", "Jersey", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia, The Former Yugoslav Republic of", "Malta", "Martinique", "Mayotte", "Moldova, Republic of", "Monaco", "Montserrat", "Netherlands", "Netherlands Antilles", "New Caledonia", "Niue", "Northern Ireland", "Norway", "Pitcairn", "Poland", "Portugal", "Reunion", "Romania", "San Marino", "Scotland", "Slovakia (Slovak Republic)", "Slovenia", "South Georgia and the South Sandwich Islands", "Spain", "St. Helena", "St. Pierre and Miquelon", "Svalbard and Jan Mayen Islands", "Sweden", "Switzerland", "Turkey", "United Kingdom", "Vatican City State (Holy See)", "Virgin Islands (British)", "Wales", "Wallis and Futuna Islands"];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


_core2.default.prototype.ingredients = function () {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (typeof data === "string" && arguments.length === 2) {
        data = _defineProperty({}, arguments[0], arguments[1]);
    }
    var that = this;
    Object.keys(data).forEach(function (key) {
        var value = data[key];
        $(that.get()).find("[data-ingredient='" + key + "']").html(value);
    });
    return this;
};

_core2.default.prototype.exists = function (fieldName) {
    if (!fieldName) {
        return false;
    }
    var field = this.fields.find(function (field) {
        return field.name === fieldName;
    });
    return !!field;
};

_core2.default.prototype.get = function (fieldNames) {
    if (fieldNames === undefined) {
        return this.raw;
    }
    if (typeof fieldNames === "string") {
        fieldNames = fieldNames.split(",").map(function (v) {
            return v.trim();
        });
    }
    var fields = this.fields;
    var result = fieldNames.map(function (fieldName) {
        var field = fields.find(function (field) {
            return field.name === fieldName;
        });
        if (!field) {
            __.log.error("Tried to get() invalid field name: " + fieldName + ".");
            return false;
        }
        return field;
    });
    return result.length === 1 ? result[0] : __(result).unique().get();
};
_core2.default.prototype.export = _core2.default.prototype.get;

_core2.default.prototype.set = function () {
    var _this = this;

    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (typeof data === "string" && arguments.length === 2) {
        data = _defineProperty({}, arguments[0], arguments[1]);
    }
    Object.keys(data).forEach(function (key) {
        var $field = $(_this.get(key));
        if ($field.length) {
            $field.val(data[key]).change();
        }
        // const field = fields.find(field => field.name === key);
        // if (field) {
        //     field.value = data[key];
        // }
    });
    return this;
};
_core2.default.prototype.populate = _core2.default.prototype.set;

_core2.default.prototype.add = function () {
    var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (typeof fields === "string" && arguments.length === 2) {
        fields = _defineProperty({}, arguments[0], arguments[1]);
    }
    var $form = $(this.form);
    Object.keys(fields).forEach(function (name) {
        $form.append("<input type=\"hidden\" name=\"" + name + "\" value=\"" + fields[name] + "\">");
    });
    return this;
};

_core2.default.prototype.copy = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    copyValues.apply(undefined, [this].concat(args));

    function copyValues(paraform, input, output) {
        __.enforce([[paraform, "object"], [input, "string,element,object,array"], [output, "string,element,undefined"]]);
        if (arguments.length === 3) {
            // resolve input names
            var $input = resolveInputNames(input);
            var $output = resolveInputNames(output, paraform);
            $input.on("change keyup", function () {
                var value = $input.val();
                $output.val(value);
            });
        } else if (__.typeof(input) === "object") {
            Object.keys(input).forEach(function (v) {
                return copyValues(paraform, v, input[v]);
            });
        } else if (__.typeof(input) === "array") {
            input.forEach(function (v) {
                return copyValues(paraform, v[0], v[1]);
            });
        }
        function resolveInputNames(x, pf) {
            if (typeof x === "string" && $(x).length === 0) {
                return pf !== undefined ? $(pf.form).find("[name='" + x + "']") : $("[name='" + x + "']");
            } else return $(x);
        }
    }

    return this;
};

_core2.default.prototype.getJSONCookie = function (cname) {
    var cookie = __.getCookie(cname);
    var cookieData = void 0;
    if (!cookie) {
        cookieData = null;
    } else if (!__.isJSON(cookie)) {
        cookieData = null;
        __.log.error("Invalid JSON in " + cname + " cookie.");
    } else {
        cookieData = JSON.parse(cookie);
    }
    return cookieData;
};

_core2.default.prototype.find = function (selector) {
    var $result = $(this.get()).find(selector);
    if ($result.length) {
        return $result.length === 1 ? $result.get(0) : $result.get();
    } else {
        return null;
    }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


var defaultInitActions = {
    attachForm: function attachForm() {
        return this.imported ? this.importTemplate() : this.hijackExistingForm();
    },
    assess: function assess() {
        this.save(); // save initial state of form, used in reset() in countrySelect
        this.assessMode(); // determine which: opt-in, upfront, standalone, upsell, upsell-cvv
        $(this.form).attr("data-limejuice-form-id", this.id);
        return true;
    },
    modalize: function modalize() {
        return this.imported ? this.modalize() // wrap in a modal
        : true;
    },
    buttons: function buttons() {
        return this.initButtons();
    },
    proxies: function proxies() {
        return this.imported // there should be no proxies on hijacked forms
        ? this.initProxies() : true;
    },
    captcha: function captcha() {
        if (this.hijacked && this.containsCaptcha()) {
            this.config.captcha = true;
        }
        return this.config.captcha ? this.initCaptcha() : true;
    },
    countrySelect: function countrySelect() {
        return this.config.shipTo !== null ? this.initPhysicalProduct() : this.initDigitalProduct();
    },
    autocomplete: function autocomplete() {
        return this.autocomplete();
    },
    autofill: function autofill() {
        return this.autofillStart();
    },
    kount: function kount() {
        return this.initKount();
    },
    misc: function misc() {
        return this.misc();
    }
};

_core2.default.prototype.defineInitActions = function () {
    this.defineInternalProperty("initActions", defaultInitActions);
};

_core2.default.prototype.init = function (str) {

    if (typeof str !== "string") {
        throw new TypeError("Form.prototype.init() will only accept a valid form ID or template name.");
    }

    return str.startsWith("#") ? this.hijack(str) // hijacked form already in DOM
    : this.import(str); // imported from template / html
};

_core2.default.prototype.hijack = function (formId) {

    if (typeof formId !== "string" || !formId.startsWith("#")) {
        throw new TypeError("Form.prototype.hijack() will only accept a valid form ID (preceded by '#'.)");
    }

    if (!document.getElementById(formId.substr(1))) {
        throw new Error("\"" + formId + "\" is not a valid form ID.");
    }

    this.config.formIdentifier = formId;

    this.hijacked = true;
    this.imported = false;

    return initialize.call(this); // run initialization actions
};

_core2.default.prototype.import = function (templateName) {

    if (typeof templateName !== "string") {
        throw new TypeError("Form.prototype.import() will only accept a valid template name or HTML string.");
    }

    this.config.formIdentifier = templateName;

    this.hijacked = false;
    this.imported = true;

    return initialize.call(this); // run initialization actions
};

function initialize() {

    var thisForm = this;
    var initActionConf = this.config.init;

    this.dispatchEvent("preinit");

    return __(initActionConf).queue(function (actionName, lastResult, i) {
        // async iterator, returns promise

        if (lastResult === false) {
            window.alert(thisForm.errorMsg);
            throw new Error("Form " + thisForm.id + ": an init action returned false: '" + initActionConf[i - 1] + "'");
        }

        if (!thisForm.initActions.hasOwnProperty(actionName)) {
            window.alert(thisForm.errorMsg);
            throw new Error("The following init action has not been defined: '" + initActionConf[i] + "'");
        }

        __.log.info("Form " + thisForm.id + " attempting: ", actionName);

        return thisForm.initActions[actionName].call(thisForm);
    }).then(function () {

        thisForm.dispatchEvent("init");

        __.log.success("All init actions completed successfully.");

        return thisForm;
    });
}

_core2.default.prototype.errorMsg = "\nWe're sorry - something went wrong with this web page.\n\nA report has already been sent to our technical support team so that we can get this resolved ASAP.\n\nWe apologize for any inconvenience.\n";

_core2.default.prototype.sendErrorReport = function (category, fn, err) {

    var typeErr = "none";

    try {
        __.enforce([[category, "string"], [fn, "string"], [err, "string,undefined"]]);
    } catch (e) {
        typeErr = "Attempted error report failed type checking with the following error: " + e;
    }

    category = String(category);
    fn = String(fn);
    err = String(err);

    var data = {
        "category": category,
        "fn": fn,
        "err": err,
        "typeErr": typeErr,
        "dateTime": new Date(),
        "browser": __.browser,
        "os": __.os,
        "screen": __.screen
    };

    return data;
};

_core2.default.prototype.importTemplate = function () {
    var _this = this;

    var templateName = this.config.formIdentifier;
    var isValidTemplateName = /^[a-zA-Z0-9_-]*$/gi.test(templateName);

    if (!isValidTemplateName) {
        throw new TypeError("Argument passed to Form.prototype.importTemplate could not be parsed as a valid template name or HTML string.");
    }

    var templateURL = createTemplateURL(templateName, this);

    return $.get(templateURL).then(function (html) {

        var form = parseHTML(html);
        var script = extractScripts(form);

        _this.on("inject", function () {
            return window.eval(script);
        }); // "inject" fires when form first is attached to DOM

        _this.raw = form;

        return true;
    });

    function parseHTML(html) {
        return $("<div>").append(html).get(0);
    }

    function extractScripts(form) {
        return $(form).find("script").detach().get().map(function (v) {
            return $(v).html();
        }).join("");
    }

    function createTemplateURL(templateName, that) {
        var scheme = window.location.protocol + "//";
        var host = window.location.hostname;
        var prefix = scheme + host + that.config.formTemplatesDirPath;

        var extension = ".php";
        var query = "?" + __({
            "fetchTemplate": "true",
            "cacheBust": __.rand(1, 1000).toString()
        }).http_build_query().get();
        var suffix = extension + query;

        return prefix + templateName + suffix;
    }
};

_core2.default.prototype.hijackExistingForm = function () {
    this.raw = document.getElementById(this.config.formIdentifier.substr(1));
    return true;
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


_core2.default.prototype.initKount = function () {
    var _config = this.config,
        kountSessionId = _config.kountSessionId,
        campaignId = _config.campaignId;


    if (!kountSessionId || !campaignId) {
        __.log.warning("Invalid Kount info: " + kountSessionId + " (Kount session ID), " + campaignId + " (campaign ID.)");
        return true;
    }

    this.add("sessionId", kountSessionId);

    var html = createKountPixel(kountSessionId, campaignId);
    $(this.form).append(html);

    return true;
};

function createKountPixel(kountSessionId, campaignId) {
    return "\n     <iframe style=\"display: none;\" width=\"1\" height=\"1\" frameborder=\"0\" scrolling=\"no\" src=\"https://gofitera.limelightcrm.com/pixel.php?t=htm&campaign_id=" + campaignId + "&sessionId=" + kountSessionId + "\"></iframe>\n     <img style=\"display: none;\" width=\"1\" height=\"1\" src=\"https://gofitera.limelightcrm.com/pixel.php?t=gif&campaign_id=" + campaignId + "&sessionId=" + kountSessionId + "\" />";
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


_core2.default.prototype.misc = function () {
    this.placeholderSupport(); // mimic placeholders on browsers that don't support "placeholder" attr
    this.completedCheckmarks(); // add checkmarks to "completed" fields
    this.mobileInputFocus(); // force scroll position to currently-focused input (to fix android keyboard bug)

    if (["upfront", "standalone"].includes(this.mode.status)) {
        this.bindEnterAndReturn();
    }
};

_core2.default.prototype.bindEnterAndReturn = function () {
    var form = this;

    $(document).on("keyup", function (e) {
        if (!__(form.get()).isVisible()) {
            return false;
        }
        var pressedEnterOrReturn = typeof e.key === "string" && ["enter", "return"].includes(e.key.toLowerCase());
        if (pressedEnterOrReturn) {
            var focusedElement = window.document.activeElement ? $(window.document.activeElement) : $(":focused");
            var isWithinForm = focusedElement.length && $(form.get()).find(focusedElement).length;
            if (isWithinForm) {
                if (form.mode.status === "standalone") {
                    form.submit();
                } else {
                    form.action();
                }
            }
        }
    });
};

_core2.default.prototype.placeholderSupport = function () {
    var supported = "placeholder" in document.createElement("input");

    if (!supported) {
        __.log.warning("Placeholders are not supported in this browser.");
        mimicPlaceholders();
    }

    function mimicPlaceholders() {
        var $labels = $(this.fields).filter("input").parent().find("label");
        var $textInputs = $(this.fields).filter("input").not("[type='radio'], [type='checkbox'], [type='hidden']");

        $labels.addClass("placeholder-label").removeClass("dn hidden").show().removeAttr("hidden"); // cover all bases in terms of element being hidden

        $textInputs.removeAttr("placeholder").on("change keyup", function () {
            if ($(this).val().trim() !== "") {
                $(this).prev().hide();
            } else {
                $(this).prev().show();
            }
        });
    }
};

_core2.default.prototype.completedCheckmarks = function () {
    var $textInputs = $(this.fields).filter("input").not("[type='radio'], [type='checkbox'], [type='hidden']");
    var checkmark = "<i class=\"material-icons input-success-icon\" style=\"display: none;\">checkmark</i>";

    $textInputs.parent().append(checkmark);

    $textInputs.on("change keyup", handleCheckmarks);

    function handleCheckmarks() {
        var inputValue = $(this).val();
        var $inputBox = $(this).parent();
        if (inputValue !== "") {
            $inputBox.children(".cvvhelp").hide();
            $inputBox.children(".input-success-icon").show();
        } else {
            $inputBox.children(".input-success-icon").hide();
            $inputBox.children(".cvvhelp").show();
        }
    }
};

_core2.default.prototype.mobileInputFocus = function () {
    // if (__.deviceType === "mobile") {
    //     $(this.fields).on("focus", function () {
    //         const $focusedElement = $(this);
    //         __.log("resize event: ", $focusedElement);
    //         __.wait(500).then(() => refocus($focusedElement));
    //     });
    //     function refocus ($focusedElement) {
    //         const pos = $focusedElement.position().top + "px";
    //         __.log("pos: ", pos);
    //         $(".modal").scrollTop(pos);
    //     }
    // }
};

// function offsetFrom ($decendant, $ancestor) {
//     let distance = 0;

// }

// $("element1").offsetFrom("element2").


// function goTo ($elem) {
//     $(".modal").animate({
//         // "scrollTop": $("[name='billingFirstName']").offset().top + "px"
//         "scrollTop": $("[name='billingFirstName']").position().top + "px"
//     }, 1);
// }


// goTo: function (elem_offset=0, speed="slow", complete) {
//     if (typeof elem_offset === "function") {
//         complete = elem_offset;
//         elem_offset = 0;
//     } else if (typeof speed === "function") {
//         complete = speed;
//         speed = "slow";
//     } // this allows you to pass in the callback at any point without having to specify the first two parameters
//     if (elem_offset === "center") {
//         const elem_height = this.outerHeight();
//         elem_offset = -((window.innerHeight - elem_height) / 2);
//     }
//     $("html, body").animate({
//         "scrollTop": this.offset().top + elem_offset + "px"
//     }, speed).promise().then(complete);
//     return this;
// },

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

var _modal = __webpack_require__(2);

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = window.jQuery;

var modalHTML = "\n<section class=\"modal fade\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n        </div>\n    </div>\n</section>\n".trim();

_core2.default.prototype.modalize = function () {
    var $modal = $(modalHTML);

    this.detach();

    $modal.find(".modal-content").append(this.get());

    this.raw = $modal.get(0);

    this.modal = new _modal2.default(this.get());

    this.attach();

    return true;
};

_core2.default.prototype.show = function () {
    return this.modal ? this.modal.show() : false;
};

_core2.default.prototype.hide = function () {
    return this.modal ? this.modal.hide() : false;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


var defaultModeData = {
    "cname": "fiteraContactData",
    "data": null,
    "status": "standalone" // ["opt-in", "upfront", "standalone", "upsell", "upsell-cvv"]
};

var modes = {
    // hardcoded form / "needs name/email"
    "opt-in": function optIn() {
        this.setRequired(Object.keys(this.validation.fields), false).setRequired(["billingFirstName", "email"], true); // require no fields EXCEPT opt-in fields
        __.delCookie(this.mode.cname); // delete "mode" cookie (previous order info)
    },
    // hardcoded form / "needs everything"
    "upfront": function upfront() {
        this.setRequired(this.proxies.map(function (v) {
            return v.name;
        }), false); // require no proxies - all other validation requirements normal
        this.add("tranType", "Sale"); // only required in new_order modes (upfront, standalone)
        __.delCookie(this.mode.cname); // delete "mode" cookie (previous order info)
    },
    // no form / "ready, needs nothing"
    "upsell": function upsell() {
        this.setRequired(Object.keys(this.validation.fields), false); // require no fields
    },
    // template CVV box / "needs cvv"
    "upsell-cvv": function upsellCvv() {
        this.setRequired(Object.keys(this.validation.fields), false).setRequired("CVV", true) // require no fields EXCEPT CVV
        .createCVVBox().inject(); // then inject proxy CVV box
    },
    // template form / "needs everything"
    "standalone": function standalone() {
        this.setRequired(this.proxies.map(function (v) {
            return v.name;
        }), false); // require no proxies - all other validation requirements normal
        this.add("tranType", "Sale"); // only required in new_order modes (upfront, standalone)
        $(this.config.externalSameship).attr("hidden", true); // external sameship is hidden, internal one will be used if applicable
        this.inject(); // inject form template
    }
};

_core2.default.prototype.defineMode = function () {
    this.defineInternalProperty("mode", defaultModeData);
};

_core2.default.prototype.getMode = function () {
    return this.mode.status;
};

_core2.default.prototype.setMode = function (mode) {
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
_core2.default.prototype.getDebugMode = function () {
    this.debugMode = function () {
        var params = __(window.location.search || "").parse().get();
        if (params.hasOwnProperty("customer_service")) {
            // special case (shorthand for CS)
            return "cs_standalone";
        }
        return params.ljdebug || null;
    }();
    if (this.debugMode === "new_order" || this.debugMode === "cs_standalone") {
        __.delCookie(this.dups.cname); // don't catch duplicates on this setting
    }
};

_core2.default.prototype.assessMode = function () {

    var thisForm = this;

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
            "ccLast4": 1234,
            "formData": __(thisForm.testValues).remove("creditCardNumber", "CVV").get()
        };
    }

    var cdata = this.mode.data;
    var previousOrderId = cdata ? cdata.previousOrderId : null;
    var requireCVV = this.config.requireCVV;

    if (previousOrderId && !requireCVV) {
        this.setMode("upsell");
    } else if (previousOrderId && requireCVV) {
        this.setMode("upsell-cvv");
    } else {
        this.setMode("standalone");
    }

    return true;
};

_core2.default.prototype.saveOrder = function () {
    var thisForm = this;

    var cname = this.mode.cname;
    var cdata = {
        "previousOrderId": thisForm.LimeLightResponseData.order_id,
        "ccLast4": thisForm.get("creditCardNumber").value.slice(-4),
        "formData": __(thisForm.LimeLightFormData) // data is already stripped of proxies and one-off fields
        .remove("creditCardNumber", "CVV").get() // also sanitize CC number and CVV
    };
    var cdate = 7; // num days until expires

    __.setCookie(cname, JSON.stringify(cdata), cdate);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __ = window.Method;

_core2.default.prototype.dups = {
    "cname": function () {
        var url = window.location.href;
        var dir = function () {
            var fullDir = __(url).dirname().get(); // e.g. http://fasttracktofatloss.com/main
            return fullDir.substr(fullDir.lastIndexOf("/") + 1); // "main"
        }();
        var file = __(url).filebasename().get();
        // const formId = this.form.id ? `_${this.form.id}` : "";
        var formId = "";
        var cname = __("__ftsale_" + dir + "_" + file + formId).replace("-", "_").get();
        return cname;
    }()
};

_core2.default.prototype.checkForDups = function () {

    if (this.config.order.campaignId === 1) {
        // test mode
        return true;
    }

    var cname = this.dups.cname;
    var cookie = __.getCookie(cname);

    if (cookie === "true") {

        var message = "Our records indicate that you purchased this item recently, and that this order may be a duplicate.\n\nIf you think there has been a mistake, please contact Customer Service at support@fitera.com or call us at 866-796-7204.";

        window.alert(message);
        return false;
    } else {

        return true;
    }
};

_core2.default.prototype.preventDups = function () {

    if (this.config.order.campaignId === 1) {
        // test mode
        return true;
    }

    var cname = this.dups.cname;

    __.setCookie(cname, "true", 1);

    return true;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __ = window.Method;

var defaultProcessActions = {
    preventDups: function preventDups() {
        return this.preventDups(); // set dups cookie
    },
    saveOrder: function saveOrder() {
        return this.saveOrder(); // sets the fitera_previous_order_id cookie
    },
    alertDone: function alertDone() {
        __.log.success("The form processed successfully.");
        return true;
    },
    tracking: function tracking() {
        return this.GAsale() && this.VWOsale();
    },
    redirect: function redirect() {
        var _this = this;

        __.wait("1 sec").then(function () {
            return window.location.assign(_this.config.nextPage);
        }); // gives a bit of time for tracking code
        return true;
    }
};

_core2.default.prototype.defineProcessActions = function () {
    this.defineInternalProperty("processActions", defaultProcessActions);
};

_core2.default.prototype.process = function () {

    var fns = this.config.process;

    for (var i = 0; i < fns.length; i++) {
        var fn = fns[i];
        try {
            var process = this.processActions[fn].call(this);
            __.log.info("Attempting: ", fn);
            if (process === false) {
                __.log.error("A process action returned false: ", fn);
                return false;
            }
        } catch (e) {
            __.log.error("Process actions failed at: ", fn, " with error: ", e);
            return false;
        }
    }

    return this;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


Object.defineProperties(_core2.default.prototype, {

    "form": {
        get: function get() {
            return this.getForm();
        }
    },

    "fields": {
        get: function get() {
            // return this.entities;
            return [].concat(_toConsumableArray(this.entities), _toConsumableArray(this.proxies));
        }
    },

    "entities": {
        get: function get() {
            return this.getInternalFormFields();
        }
    },

    "data": {
        get: function get() {
            return this.getData();
        }
    },

    "attributes": {
        get: function get() {
            return this.getAttributes();
        }
    },

    "filled": {
        get: function get() {
            return $(this.fields).filter(":visible").get().every(function (v) {
                return $(v).val().trim() !== "";
            });
        }
    },

    "valid": { // in validate module
        get: function get() {
            return this.isValid();
        }
    },

    "cookies": {
        get: function get() {
            var _ref2;

            var modeCookieName = this.mode.cname;
            var dupsCookieName = this.dups.cname;
            return _ref2 = {}, _defineProperty(_ref2, modeCookieName, __.getCookie(modeCookieName)), _defineProperty(_ref2, dupsCookieName, __.getCookie(dupsCookieName)), _ref2;
        }
    },

    "cvv": {
        get: function get() {
            return this.get("CVV");
        }
    }
});

_core2.default.prototype.getForm = function () {
    // aliased as this.form
    if (this.get() === undefined) {
        return null;
    }
    return this.get().nodeName === "FORM" ? this.get() : $(this.get()).find("form").get(0);
};

_core2.default.prototype.getInternalFormFields = function () {
    // aliased as this.fields
    if (this.get() === undefined) {
        return null;
    }
    return Array.from(this.form.elements).filter(function (node) {
        var element = node.nodeName.toLowerCase();
        return element === "input" || element === "select";
    });
};

_core2.default.prototype.getData = function () {
    if (this.get() === undefined) {
        return null;
    }
    return this.getInternalFormFields().reduce(function (acc, field) {
        acc[field.name] = field.value;
        return acc;
    }, {});
};

_core2.default.prototype.getAttributes = function () {
    if (this.get() === undefined) {
        return null;
    }
    return Array.from(this.getForm().attributes).reduce(function (acc, attr) {
        acc[attr.name] = attr.value;
        return acc;
    }, {});
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


_core2.default.prototype.defineProxyProperties = function () {
    this.defineInternalProperty("proxies", []); // list of actual elements
    this.defineInternalProperty("proxyMap", {}); // { entityName: [proxyName1, proxyName2...] }
};

_core2.default.prototype.initProxies = function () {
    if (this.config.proxies !== null) {
        this.proxy(this.config.proxies);
    }
    return true;
};

_core2.default.prototype.proxy = function () {
    var _this = this;

    var maps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var proxyList = arguments[1];


    if (arguments.length === 2) {
        // if passed as single entity -> proxyList pair
        maps = _defineProperty({}, maps, proxyList); // convert to object
    }

    var invalids = [];

    Object.keys(maps).forEach(function (entityName) {

        var $entity = $(_this.get(entityName));
        if (!$entity.length) {
            invalids.push("\"" + entityName + "\"");
        }

        var proxies = maps[entityName] // (proxyList)
        .map(function (proxyName) {
            var proxy = $("[name='" + proxyName + "']").get(0);
            if (!proxy) {
                invalids.push("\"" + proxyName + "\"");
                return null;
            }
            _this.proxies.push(proxy); // each proxy goes into a generic array that is included in "this" form's "fields" property
            if (_this.validation.fields.hasOwnProperty(entityName)) {
                // if entity has validation criteria
                _this.validation.fields[proxyName] = _this.validation.fields[entityName]; // assign same validation tests, errors, etc. to the proxy
            }
            $(proxy).on("keyup change", function () {
                return $entity.val($(proxy).val());
            });
            return proxyName;
        }).filter(function (proxyName) {
            return !!proxyName;
        });

        if (!_this.proxyMap[entityName]) {
            _this.proxyMap[entityName] = proxies;
        } else {
            proxies.forEach(function (proxy) {
                return _this.proxyMap[entityName].push(proxy);
            });
        }
        // this.proxyMap[entityName] = proxies;
    });

    if (invalids.length) {
        __.log.error("You have invalid input names in your proxy() map definition: " + invalids.join(", ") + ".");
    }
}; // maps proxy fields to target fields within form; values will be copied to targets before submit, and proxies will be visually validated


_core2.default.prototype.getAll = function (fieldName) {
    return !this.proxyMap.hasOwnProperty(fieldName) ? [this.get(fieldName)] : [this.get(fieldName)].concat(_toConsumableArray(this.proxyMap[fieldName].map(function (v) {
        return $("[name=\"" + v + "\"]").get(0);
    })));
};

_core2.default.prototype.setAll = function () {
    var _this2 = this;

    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (typeof data === "string" && arguments.length === 2) {
        data = _defineProperty({}, arguments[0], arguments[1]);
    }
    Object.keys(data).forEach(function (fieldName) {
        var fields = _this2.getAll(fieldName);
        if (fields.length && fields.every(function (field) {
            return !!field;
        })) {
            $(fields).val(data[fieldName]).change();
        }
    });
    return this;
};

_core2.default.prototype.populateAll = _core2.default.prototype.setAll;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


var defaultSubmitActions = {
    autoformat: function autoformat() {
        return this.autoformat();
    },
    validate: function validate() {
        return !this.valid ? this.liveValidationStart() && false : true;
    },
    checkForDups: function checkForDups() {
        return this.checkForDups();
    },
    captcha: function captcha() {
        return this.config.captcha ? this.captcha() : true;
    },
    beforeSubmit: function beforeSubmit() {
        this.dispatchEvent("beforesubmit");
        return true;
    },
    submitForm: function submitForm() {
        __.log.success("Submitting form...");
        this.disableButton(); // is re-enabled if form submit has errors
        return this.submitForm();
    },
    testSubmit: function testSubmit() {
        __.log.success("Pretending to submit form...");
        this.disableButton(); // is re-enabled if form submit has errors
        return this.testSubmit();
    }
};

_core2.default.prototype.defineSubmitActions = function () {
    this.defineInternalProperty("submitActions", defaultSubmitActions);
};

_core2.default.prototype.submit = function () {

    var thisForm = this;
    var submitActionConf = this.config.submit;

    this.dispatchEvent("presubmit");

    return __(submitActionConf).queue(function (actionName, lastResult, i) {
        // async iterator, returns promise

        if (lastResult === false) {
            throw new Error("Form " + thisForm.id + ": a submit action returned false: '" + submitActionConf[i - 1] + "'");
        }

        if (!thisForm.submitActions.hasOwnProperty(actionName)) {
            throw new Error("The following submit action has not been defined: '" + submitActionConf[i] + "'");
        }

        __.log.info("Form " + thisForm.id + " attempting: ", actionName);

        return thisForm.submitActions[actionName].call(thisForm);
    }).then(function () {

        thisForm.dispatchEvent("submit");

        __.log.success("All submit actions completed successfully.");

        return thisForm;
    });
};

_core2.default.prototype.testSubmit = function () {
    var formData = __(this.toObject(null, false)) // all fields, do not sanitize
    .keep(this.apiFields) // keep only legitimate LimeLight properties
    .removeValues("").get(); // scrub all empty values
    __.log.info("Outgoing form data: ", formData);
    this.LimeLightResponseData = this.fakeLimeLightResponse;
    this.LimeLightFormData = formData;
    this.process();
};

_core2.default.prototype.fakeLimeLightResponse = {
    "authId": "Not Available",
    "customerId": "4",
    "data": "{\"tranType\":\"Sale\",\"firstName\":\"Alex\",\"billingFirstName\":\"Alex\",\"lastName\":\"Wade\",\"billingLastName\":\"Wade\",\"email\":\"alex@globalfitnessnetwork.com\",\"phone\":\"503-956-5078\",\"billingAddress1\":\"11111 SE 93rd Ave\",\"billingAddress2\":\"Apt 20\",\"billingCity\":\"Clackamas\",\"billingState\":\"OR\",\"billingZip\":\"97015\",\"billingCountry\":\"US\",\"billingSameAsShipping\":\"YES\",\"shippingAddress1\":\"9999 SE Fake Ave\",\"shippingAddress2\":\"Apt 20\",\"shippingCity\":\"Clackamas\",\"shippingState\":\"OR\",\"shippingZip\":\"97015\",\"shippingCountry\":\"US\",\"creditCardType\":\"visa\",\"creditCardNumber\":\"1444444444444440\",\"expirationDate\":\"0126\",\"expirationMonth\":\"01\",\"expirationYear\":\"2026\",\"CVV\":\"123\",\"notes\":\"http://localhost.fitera.com/offers/500f/ftflhc.php, Chrome 72, Windows 10, 1920x1080\",\"ipAddress\":\"127.0.0.1\",\"shippingId\":\"10\",\"campaignId\":\"2\",\"offers\":[{\"product_id\":\"3\",\"billing_model_id\":\"2\",\"offer_id\":\"2\",\"step_num\":\"2\",\"price\":\"0.00\",\"quantity\":\"1\"}]}",
    "error_found": "0",
    "gateway_id": "1",
    "orderSalesTaxAmount": "0.00",
    "orderSalesTaxPercent": "0.00",
    "orderTotal": "6.95",
    "order_id": "10008",
    "prepaid_match": "0",
    "resp_msg": "Approved",
    "response_code": "100",
    "subscription_id": { "3": "deb9bed0be20f494f8f6363c01a59264" },
    "test": "1",
    "transactionID": "Not Available"
};

_core2.default.prototype.submitForm = function () {
    var thisForm = this;

    var apiBaseUrl = "https://" + this.config.limelightAccountName + ".limelightcrm.com/api/v1/";
    var apiMethods = {
        "opt-in": "new_prospect",
        "upfront": "new_order",
        "standalone": "new_order",
        "upsell": "new_order_card_on_file",
        "upsell-cvv": "new_order_card_on_file"
    };
    var apiUrl = apiBaseUrl + apiMethods[this.mode.status];

    var formData = this.mode.data ? this.mode.data.formData : function (thisForm) {
        var postableFields = __(thisForm.toObject(null, false)) // all fields, do not sanitize
        .keep(thisForm.apiFields).get(); // keep only legitimate LimeLight properties
        if (!postableFields.phone) {
            // if 'phone' field is empty
            postableFields.phone = "0123456789"; // use fallback (LimeLight required)
        }
        return __(postableFields).removeValues("").get(); // scrub all empty values
    }(this);

    var orderData = this.mode.status.startsWith("upsell") // add "previousOrderId" to new_order_card_on_file payload
    ? Object.assign({ "previousOrderId": thisForm.mode.data.previousOrderId }, this.config.order) : this.config.order;

    var postData = {
        "apiUrl": apiUrl,
        "data": Object.assign({}, formData, orderData)
    };

    __.log.info("Posting data to LimeLight...", postData);

    $.ajax({
        "url": thisForm.config.limelightScriptFilePath,
        "type": "POST",
        "data": postData,
        "dataType": "json",
        "success": function success(response) {
            thisForm.apiPost.success.call(thisForm, response, formData);
        },
        "error": function error(response) {
            thisForm.apiPost.error.call(thisForm, response);
        }
    });

    return true;
};

_core2.default.prototype.apiPost = {
    "success": function success(response, formData) {
        __.log.success("Success! Response received from LimeLight.", response);

        if (response.response_code === "100") {
            // transaction completed!
            this.LimeLightResponseData = response;
            this.LimeLightFormData = formData;
            this.process();
            return true;
        }

        var errorMessage = response.error_message || "This transaction has been declined.";
        var errorCode = response.response_code || "unknown error";

        if (this.getMode() === "upsell" && !this.CVVprompted) {

            window.alert(errorMessage + ". (code: " + errorCode + ") \n\nYou may try again using your CVV.");
            this.setMode("upsell-cvv");
            this.CVVprompted = true;
        } else {
            window.alert(errorMessage + ". (code: " + errorCode + ") \n\nPlease contact Customer Service.");
        }

        this.enableButton();
    },

    "error": function error(response) {
        __.log.error("Something went wrong with API call to LimeLight.", response);
        window.alert("Something went wrong with this purchase.\n\nPlease contact Customer Service.");
        this.enableButton();
    }
};

_core2.default.prototype.apiFields = ["firstName", "lastName", "email", "phone", "billingFirstName", "billingLastName", "billingAddress1", "billingAddress2", "billingCity", "billingState", "billingZip", "billingCountry", "billingSameAsShipping", "shippingAddress1", "shippingAddress2", "shippingCity", "shippingState", "shippingZip", "shippingCountry", "creditCardType", "creditCardNumber", "expirationDate", "CVV", "offers", "shippingId", "campaignId", "tranType", "notes", "website", "ipAddress", "sessionId", "device_category", "click_id", "AFFID", "AFID", "SID", "C1", "C2", "C3", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processPageUrl = window.location.href + "-process";

var googleAccountId = "UA-44141922-2";

_core2.default.prototype.GAsale = function () {
    window.gtag("config", googleAccountId, {
        "page_location": processPageUrl
    });
    return true;
};

_core2.default.prototype.VWOsale = function () {
    window.VWO = window.VWO || [];
    window.VWO.push(["activate", {
        "virtualPageUrl": processPageUrl
    }]);
    return true;
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _core = __webpack_require__(0);

var _core2 = _interopRequireDefault(_core);

var _countries = __webpack_require__(1);

var _countries2 = _interopRequireDefault(_countries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = [window.jQuery, window.Method],
    $ = _ref[0],
    __ = _ref[1];


var defaultValidationConfig = {
    // IDENTITY
    "billingFirstName": {
        "required": true, // input must exist and have a value
        "tests": [],
        "error": "Please enter your first name."
    },
    "billingLastName": {
        "required": true,
        "tests": [],
        "error": "Please enter your last name."
    },
    "email": {
        "required": true,
        "tests": ["isEmail"],
        "error": "Please enter a valid email address."
    },
    "phone": {
        "required": false,
        "tests": ["isPhone"]
    },
    // BILLING
    "billingAddress1": {
        "required": true,
        "tests": [],
        "error": "Please enter your (billing) street address."
    },
    "billingAddress2": {
        "required": false,
        "tests": []
    },
    "billingCity": {
        "required": true,
        "tests": [],
        "error": "Please enter a valid city for your billing address."
    },
    "billingState": {
        "required": true,
        "tests": ["isState::(billingCountry)"],
        "error": "Please enter a valid state / province for your billing address."
    },
    "billingCountry": {
        "required": true,
        "tests": [],
        "error": "Please enter a valid country for your billing address."
    },
    "billingZip": {
        "required": true,
        "tests": [],
        "error": "Please enter a valid zip / postal code for your billing address."
    },
    // SHIPPING
    "shippingAddress1": {
        "required": true,
        "tests": [],
        "error": "Please enter your (shipping) street address.",
        "errorIf": fieldIsVisible
    },
    "shippingAddress2": {
        "required": false,
        "tests": []
    },
    "shippingCity": {
        "required": true,
        "tests": [],
        "error": "Please enter a valid city for your shipping address.",
        "errorIf": fieldIsVisible
    },
    "shippingState": {
        "required": true,
        "tests": ["isState::(shippingCountry)"],
        "error": "Please enter a valid state / province for your shipping address.",
        "errorIf": fieldIsVisible
    },
    "shippingCountry": {
        "required": true,
        "tests": [],
        "error": "Please enter a valid country for your shipping address.",
        "errorIf": fieldIsVisible
    },
    "shippingZip": {
        "required": true,
        "tests": [],
        "error": "Please enter a valid zip / postal code for your shipping address.",
        "errorIf": fieldIsVisible
    },
    // PAYMENT
    "creditCardType": {
        "required": true,
        "tests": []
    },
    "creditCardNumber": {
        "required": true,
        "tests": ["isCCNum"],
        "error": "Please enter a valid credit card number from an approved card association (Visa, MasterCard, etc.)"
    },
    "expirationMonth": {
        "required": true,
        "tests": [],
        "error": "Please select an expiration month for your credit card."
    },
    "expirationYear": {
        "required": true,
        "tests": [],
        "error": "Please select an expiration year for your credit card."
    },
    "expirationDate": {
        "required": true,
        "tests": []
    },
    "CVV": {
        "required": true,
        "tests": ["isCVV::(creditCardType)"],
        "error": "Please enter a valid CVV/CVC (security code.)"
    }
};

function fieldIsVisible() {
    return $(this).is(":visible");
}

var defaultValidationTests = {
    hasValue: function hasValue(val) {
        __.enforce(val, "string");
        var invalidEntries = ["", "Month", "Year", "Please select a country"];
        return !invalidEntries.some(function (v) {
            return v === val.trim();
        });
    },
    isState: function isState(stateValue, countryCode) {
        if (typeof countryCode === "undefined") {
            // __.log("No country specified; could not validate state.");
            return true;
        }
        __.enforce([stateValue, countryCode], ["string", "string"]);

        var validStates = _countries2.default[countryCode].states;

        if (!validStates) {
            // stateless country
            return stateValue === ""; // must be empty (handled in 'autoformat')
        }

        if (!Object.keys(validStates).length) {
            // country with no known states
            return true; // any state is fine
        }

        var isValidState = Object.values(validStates).some(function (stateCode) {
            var isStateCode = function () {
                var formattedStateValue = stateValue.toUpperCase();
                return stateCode === stateValue || (stateCode.includes("-") ? stateCode.split("-")[1].toUpperCase() === formattedStateValue : stateCode === formattedStateValue);
            }();
            var isStateName = function () {
                var stateName = __(validStates).search(stateCode).get()[0];
                return stateName === stateValue || stateName.toLowerCase() === stateValue.trim().toLowerCase();
            }();
            return isStateCode || isStateName;
        });

        return isValidState;
    },
    isEmail: function isEmail(val) {
        __.enforce(val, "string");
        return __.valid_email(val);
    },
    isCCNum: function isCCNum(val) {
        __.enforce(val, "string");
        var cardTypes = {
            "test": /^144444444444444([0-9]{1}$)/,
            "amex": /^3([0-9]{14}$)/,
            "discover": /^6([0-9]{15}$)/,
            "mastercard": /^5([0-9]{15}$)/,
            "visa": /^4([0-9]{15}$)/
        };
        // 1444444444444441    Default Global Test Card Decline
        // 1444444444444440    Default Global Test Card Success
        var formattedVal = val.replace(/-|\s/g, ""); // remove whitespace and hyphens
        return Object.keys(cardTypes).some(function (cardType) {
            return cardTypes[cardType].test(formattedVal);
        });
    },
    isCVV: function isCVV(cvv, ccType) {
        __.enforce(cvv, "string");
        if (!ccType) {
            return (/^[0-9]{3,4}$/.test(cvv)
            );
        } else {
            return ccType === "amex" ? /^[0-9]{4}$/.test(cvv) : /^[0-9]{3}$/.test(cvv);
        }
    },
    isPhone: function isPhone(val) {
        __.enforce(val, "string");
        return (/^[^a-zA-Z]*$/gi.test(val)
        );
    }
};

_core2.default.prototype.defineValidationProperties = function () {
    this.defineInternalProperty("validation", {});
    this.validation.errors = [];
    this.validation.fields = defaultValidationConfig;
    this.validation.tests = defaultValidationTests;

    this.defineInternalProperty("liveValidationCollections", {});
};

_core2.default.prototype.isValid = function (data) {
    var results = this.validate(data); // note: data may be "undefined", in which case "this" is validated
    var isValid = Object.values(results).every(function (v) {
        return v === true;
    });
    if (!isValid) {
        __.log.error(results);
    }
    return isValid;
};

_core2.default.prototype.validate = function () {
    var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.fields;
    // can take array of elements or element-like objects, or object of key/value pairs
    var that = this;

    if (__.typeof(fields) === "object") {
        fields = Object.keys(fields).map(function (name) {
            return { "name": name, "value": fields[name] };
        });
    }

    var result = Object.keys(this.validation.fields).reduce(function (acc, fieldName) {
        var vfield = that.validation.fields[fieldName]; // "validation" field in config
        var afield = fields.find(function (v) {
            return v.name === fieldName;
        }); // "actual" field in dataset
        var passed = void 0;
        if (!vfield.required && (afield === undefined || afield.value === "")) {
            passed = true;
            // } else if (vfield.required && (afield === undefined || afield.value === "")) {
        } else if (vfield.required && afield === undefined) {
            passed = null;
        } else {
            if (vfield.required && vfield.tests.length === 0) {
                // if field is required and no special test is assigned
                vfield.tests.unshift("hasValue"); // require a value
            }
            passed = vfield.tests.every(function (test) {
                var _that$validation$test;

                var testArguments = []; // dynamic # of args
                testArguments.push(afield.value); // first arg is always "this" field value
                if (test.includes("::")) {
                    // additional field values specified for test
                    test.split("::(")[1].split(")")[0] // regex would make more sense here
                    .split(",").map(function (v) {
                        return v.trim();
                    }).forEach(function (addlFieldName) {
                        var field = fields.find(function (v) {
                            return v.name === addlFieldName;
                        });
                        var fieldVal = field && field.value ? field.value : undefined;
                        testArguments.push(fieldVal);
                    });
                    test = test.split("::")[0];
                }
                return (_that$validation$test = that.validation.tests)[test].apply(_that$validation$test, testArguments);
            });
        }
        if (passed) {
            if ($(afield).hasClass("limejuice-input-error")) {
                // if it previously had an error message
                $(afield).addClass("limejuice-input-success"); // we want to change it explicitly to "success"
            }
            $(afield).removeClass("limejuice-input-error").removeAttr("data-limejuice-input-error-message");
        } else {
            $(afield).addClass("limejuice-input-error").removeClass("limejuice-input-success").attr("data-limejuice-input-error-message", vfield.error);
        }

        // testName = decamelize(v.name.substr(v.name.indexOf("0") + 1));
        acc[fieldName] = passed;
        return acc;
    }, {});

    this.dispatchEvent("validate");

    if (fields.every(function (field) {
        return __.typeof(field) === "element";
    })) {
        this.showValidationErrors(fields);
    }

    return result;
};

_core2.default.prototype.liveValidationStart = function () {
    var _this = this;

    var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.fields;
    var collectionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "default";

    var fieldEvents = "keyup change".split(" ").map(function (v) {
        return v + "." + collectionName;
    }).join(" ");
    var formEvents = "sameshipopen sameshipclose".split(" ").map(function (v) {
        return v + "." + collectionName;
    }).join(" ");

    $(fields).on(fieldEvents, function () {
        return _this.validate(fields);
    });
    this.on(formEvents, function () {
        return _this.validate(fields);
    });

    this.liveValidationCollections[collectionName] = fields;

    return this;
};

_core2.default.prototype.liveValidationStop = function () {
    var collectionName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "default";

    var fieldEvents = "keyup change".split(" ").map(function (v) {
        return v + "." + collectionName;
    }).join(" ");
    var formEvents = "sameshipopen sameshipclose".split(" ").map(function (v) {
        return v + "." + collectionName;
    }).join(" ");

    var fields = this.liveValidationCollections[collectionName];
    fields.forEach(function (field) {
        var $field = $(field);
        $field.removeClass("limejuice-input-error limejuice-input-success").removeAttr("data-limejuice-input-error-message");
    });
    var $errorPanel = this.$validationErrorOutputs;
    $errorPanel.empty().hide();

    $(fields).off(fieldEvents);
    this.off(formEvents);

    delete this.liveValidationCollections[collectionName];

    return this;
};

Object.defineProperties(_core2.default.prototype, {
    "$errorOutputs": {
        get: function get() {
            var defaultOutput = $(this.get()).find(".limejuice-errors").get(0);
            var moduleOutput = $(".limejuice-errors-" + this.id).get(0);
            var externalOutput = $(this.config.externalErrors).get(0);
            var outputs = [defaultOutput, moduleOutput, externalOutput].filter(function (v) {
                return !!v;
            });
            return $(outputs);
        }
    },
    "$validationErrorOutputs": {
        get: function get() {
            var $outputs = this.$errorOutputs;
            if (!$outputs.find(".limejuice-validation-errors").length) {
                $outputs.append("<div class='limejuice-validation-errors'></div>");
            }
            return $outputs.find(".limejuice-validation-errors");
        }
    },
    "$transactionErrorOutputs": {
        get: function get() {
            var $outputs = this.$errorOutputs;
            if (!$outputs.find(".limejuice-transaction-errors").length) {
                $outputs.append("<div class='limejuice-transaction-errors'></div>");
            }
            return $outputs.find(".limejuice-transaction-errors");
        }
    }
});

_core2.default.prototype.showValidationErrors = function (fields) {
    var _this2 = this;

    this.validation.errors = []; // clear existing errors
    fields.forEach(function (field) {
        var $field = $(field);
        var hasError = $field.hasClass("limejuice-input-error");
        var errorMessage = $field.attr("data-limejuice-input-error-message");
        var notDuplicate = !_this2.validation.errors.includes(errorMessage);
        var showable = errorMessage && function (thisForm) {
            var hasCondition = typeof thisForm.validation.fields[field.name].errorIf === "function";
            return hasCondition ? thisForm.validation.fields[field.name].errorIf.call(field) : true;
        }(_this2);
        if (hasError && errorMessage && notDuplicate && showable) {
            _this2.validation.errors.push(errorMessage);
        }
    });
    var $errorPanel = this.$validationErrorOutputs;
    $errorPanel.empty();
    if (this.validation.errors.length) {
        var errors = "<ul>" + this.validation.errors.map(function (v) {
            return "<li>" + v + "</li>";
        }).join("") + "</ul>";
        $errorPanel.append(errors).show();
    } else {
        $errorPanel.hide();
    }
};

_core2.default.prototype.setRequired = function (fieldNames) {
    var bool = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var that = this;
    if (typeof fieldNames === "string") {
        fieldNames = fieldNames.split(",").map(function (v) {
            return v.trim();
        });
    }
    fieldNames.forEach(function (fieldName) {
        that.validation.fields[fieldName].required = bool;
    });
    return this;
};

_core2.default.prototype.createTest = function (testName, fn) {
    if (typeof this.validation.tests[testName] === "undefined") {
        this.validation.tests[testName] = fn;
    } else {
        __.log.error("That test name is already taken. (" + testName + ")");
    }
};

/***/ })
/******/ ]);