import Form      from "./core";
import countries from "./countries";

const [ $, __ ] = [ window.jQuery, window.Method ];


const defaultValidationConfig = {
    // IDENTITY
    "billingFirstName": {
        "required": true, // input must exist and have a value
        "tests"   : [],
        "error"   : "Please enter your first name."
    },
    "billingLastName": {
        "required": true,
        "tests"   : [],
        "error"   : "Please enter your last name."
    },
    "email": {
        "required": true,
        "tests"   : ["isEmail"],
        "error"   : "Please enter a valid email address."
    },
    "phone": {
        "required": false,
        "tests"   : ["isPhone"]
    },
    // BILLING
    "billingAddress1": {
        "required": true,
        "tests"   : [],
        "error"   : "Please enter your (billing) street address."
    },
    "billingAddress2": {
        "required": false,
        "tests"   : []
    },
    "billingCity": {
        "required": true,
        "tests"   : [],
        "error"   : "Please enter a valid city for your billing address."
    },
    "billingState": {
        "required": true,
        "tests"   : ["isState::(billingCountry)"],
        "error"   : "Please enter a valid state / province for your billing address."
    },
    "billingCountry": {
        "required": true,
        "tests"   : [],
        "error"   : "Please enter a valid country for your billing address."
    },
    "billingZip": {
        "required": true,
        "tests"   : [],
        "error"   : "Please enter a valid zip / postal code for your billing address."
    },
    // SHIPPING
    "shippingAddress1": {
        "required": true,
        "tests"   : [],
        "error"   : "Please enter your (shipping) street address.",
        "errorIf" : fieldIsVisible
    },
    "shippingAddress2": {
        "required": false,
        "tests"   : []
    },
    "shippingCity": {
        "required": true,
        "tests"   : [],
        "error"   : "Please enter a valid city for your shipping address.",
        "errorIf" : fieldIsVisible
    },
    "shippingState": {
        "required": true,
        "tests"   : ["isState::(shippingCountry)"],
        "error"   : "Please enter a valid state / province for your shipping address.",
        "errorIf" : fieldIsVisible
    },
    "shippingCountry": {
        "required": true,
        "tests"   : [],
        "error"   : "Please enter a valid country for your shipping address.",
        "errorIf" : fieldIsVisible
    },
    "shippingZip": {
        "required": true,
        "tests"   : [],
        "error"   : "Please enter a valid zip / postal code for your shipping address.",
        "errorIf" : fieldIsVisible
    },
    // PAYMENT
    "creditCardType": {
        "required": true,
        "tests"   : []
    },
    "creditCardNumber": {
        "required": true,
        "tests"   : ["isCCNum"],
        "error"   : "Please enter a valid credit card number from an approved card association (Visa, MasterCard, etc.)"
    },
    "expirationMonth": {
        "required": true,
        "tests"   : [],
        "error"   : "Please select an expiration month for your credit card."
    },
    "expirationYear": {
        "required": true,
        "tests"   : [],
        "error"   : "Please select an expiration year for your credit card."
    },
    "expirationDate": {
        "required": true,
        "tests"   : []
    },
    "CVV": {
        "required": true,
        "tests"   : ["isCVV::(creditCardType)"],
        "error"   : "Please enter a valid CVV/CVC (security code.)"
    }
};

function fieldIsVisible () {
    return $(this).is(":visible");
}


const defaultValidationTests = {
    hasValue (val) {
        __.enforce(val, "string");
        const invalidEntries = ["", "Month", "Year", "Please select a country"];
        return !invalidEntries.some(v => v === val.trim());
    },
    isState (stateValue, countryCode) {
        if (typeof countryCode === "undefined") {
            // __.log("No country specified; could not validate state.");
            return true;
        }
        __.enforce([stateValue, countryCode], ["string", "string"]);

        const validStates = countries[countryCode].states;

        if (!validStates) { // stateless country
            return stateValue === ""; // must be empty (handled in 'autoformat')
        }

        if (!Object.keys(validStates).length) { // country with no known states
            return true; // any state is fine
        }

        const isValidState = Object.values(validStates).some(stateCode => {
            const isStateCode = (function () {
                const formattedStateValue = stateValue.toUpperCase();
                return stateCode === stateValue || (stateCode.includes("-") ? stateCode.split("-")[1].toUpperCase() === formattedStateValue : stateCode === formattedStateValue);
            }());
            const isStateName = (function () {
                const stateName = __(validStates).search(stateCode).get()[0];
                return stateName === stateValue || stateName.toLowerCase() === stateValue.trim().toLowerCase();
            }());
            return isStateCode || isStateName;
        });

        return isValidState;
    },
    isEmail (val) {
        __.enforce(val, "string");
        return __.valid_email(val);
    },
    isCCNum (val) {
        __.enforce(val, "string");
        const cardTypes = {
            "test"          : /^144444444444444([0-9]{1}$)/,
            "amex"          : /^3([0-9]{14}$)/,
            "discover"      : /^6([0-9]{15}$)/,
            "mastercard"    : /^5([0-9]{15}$)/,
            "visa"          : /^4([0-9]{15}$)/,
        };
        // 1444444444444441    Default Global Test Card Decline
        // 1444444444444440    Default Global Test Card Success
        const formattedVal = val.replace(/-|\s/g, ""); // remove whitespace and hyphens
        return Object.keys(cardTypes).some(cardType => cardTypes[cardType].test(formattedVal));
    },
    isCVV (cvv, ccType) {
        __.enforce(cvv, "string");
        if (!ccType) {
            return /^[0-9]{3,4}$/.test(cvv);
        } else {
            return ccType === "amex"
                ? /^[0-9]{4}$/.test(cvv)
                : /^[0-9]{3}$/.test(cvv);
        }
    },
    isPhone (val) {
        __.enforce(val, "string");
        return (/^[^a-zA-Z]*$/gi).test(val);
    },
};


Form.prototype.defineValidationProperties = function () {
    this.defineInternalProperty("validation", {});
    this.validation.errors = [];
    this.validation.fields = defaultValidationConfig;
    this.validation.tests = defaultValidationTests;

    this.defineInternalProperty("liveValidationCollections", {});
};


Form.prototype.isValid = function (data) {
    const results = this.validate(data); // note: data may be "undefined", in which case "this" is validated
    const isValid = Object.values(results).every(v => v === true);
    if (!isValid) {
        __.log.error(results);
    }
    return isValid;
};


Form.prototype.validate = function (fields=this.fields) { // can take array of elements or element-like objects, or object of key/value pairs
    const that = this;

    if (__.typeof(fields) === "object") {
        fields = Object.keys(fields).map(name => ({ "name": name, "value": fields[name] }));
    }

    const result = Object.keys(this.validation.fields)
        .reduce((acc, fieldName) => {
            const vfield = that.validation.fields[fieldName]; // "validation" field in config
            const afield = fields.find(v => v.name === fieldName); // "actual" field in dataset
            let passed;
            if (!vfield.required && (afield === undefined || afield.value === "")) {
                passed = true;
            // } else if (vfield.required && (afield === undefined || afield.value === "")) {
            } else if (vfield.required && afield === undefined) {
                passed = null;
            } else {
                if (vfield.required && vfield.tests.length === 0) { // if field is required and no special test is assigned
                    vfield.tests.unshift("hasValue"); // require a value
                }
                passed = vfield.tests
                    .every(test => {
                        const testArguments = []; // dynamic # of args
                        testArguments.push(afield.value); // first arg is always "this" field value
                        if (test.includes("::")) { // additional field values specified for test
                            test.split("::(")[1].split(")")[0] // regex would make more sense here
                                .split(",")
                                .map(v => v.trim())
                                .forEach(addlFieldName => {
                                    const field = fields.find(v => v.name === addlFieldName);
                                    const fieldVal = field && field.value ? field.value : undefined;
                                    testArguments.push(fieldVal);
                                });
                            test = test.split("::")[0];
                        }
                        return that.validation.tests[test](...testArguments);
                    });
            }
            if (passed) {
                if ($(afield).hasClass("limejuice-input-error")) { // if it previously had an error message
                    $(afield).addClass("limejuice-input-success"); // we want to change it explicitly to "success"
                }
                $(afield).removeClass("limejuice-input-error")
                    .removeAttr("data-limejuice-input-error-message");
            } else {
                $(afield).addClass("limejuice-input-error")
                    .removeClass("limejuice-input-success")
                    .attr("data-limejuice-input-error-message", vfield.error);
            }

            // testName = decamelize(v.name.substr(v.name.indexOf("0") + 1));
            acc[fieldName] = passed;
            return acc;
        }, {});

    this.dispatchEvent("validate");

    if (fields.every(field => __.typeof(field) === "element")) {
        this.showValidationErrors(fields);
    }

    return result;
};


Form.prototype.liveValidationStart = function (fields=this.fields, collectionName="default") {
    const fieldEvents = "keyup change".split(" ").map(v => v + "." + collectionName).join(" ");
    const formEvents = "sameshipopen sameshipclose".split(" ").map(v => v + "." + collectionName).join(" ");

    $(fields).on(fieldEvents, () => this.validate(fields));
    this.on(formEvents, () => this.validate(fields));

    this.liveValidationCollections[collectionName] = fields;

    return this;
};


Form.prototype.liveValidationStop = function (collectionName="default") {
    const fieldEvents = "keyup change".split(" ").map(v => v + "." + collectionName).join(" ");
    const formEvents = "sameshipopen sameshipclose".split(" ").map(v => v + "." + collectionName).join(" ");

    const fields = this.liveValidationCollections[collectionName];
    fields.forEach(field => {
        const $field = $(field);
        $field.removeClass("limejuice-input-error limejuice-input-success")
            .removeAttr("data-limejuice-input-error-message");
    });
    const $errorPanel = this.$validationErrorOutputs;
    $errorPanel.empty().hide();

    $(fields).off(fieldEvents);
    this.off(formEvents);

    delete this.liveValidationCollections[collectionName];

    return this;
};


Object.defineProperties(Form.prototype, {
    "$errorOutputs": {
        get () {
            const defaultOutput  = $(this.get()).find(".limejuice-errors").get(0);
            const moduleOutput   = $(".limejuice-errors-" + this.id).get(0);
            const externalOutput = $(this.config.externalErrors).get(0);
            const outputs        = [defaultOutput, moduleOutput, externalOutput].filter(v => !!v);
            return $(outputs);
        }
    },
    "$validationErrorOutputs": {
        get () {
            const $outputs = this.$errorOutputs;
            if (!$outputs.find(".limejuice-validation-errors").length) {
                $outputs.append("<div class='limejuice-validation-errors'></div>");
            }
            return $outputs.find(".limejuice-validation-errors");
        }
    },
    "$transactionErrorOutputs": {
        get () {
            const $outputs = this.$errorOutputs;
            if (!$outputs.find(".limejuice-transaction-errors").length) {
                $outputs.append("<div class='limejuice-transaction-errors'></div>");
            }
            return $outputs.find(".limejuice-transaction-errors");
        }
    }
});

Form.prototype.showValidationErrors = function (fields) {
    this.validation.errors = []; // clear existing errors
    fields.forEach(field => {
        const $field       = $(field);
        const hasError     = $field.hasClass("limejuice-input-error");
        const errorMessage = $field.attr("data-limejuice-input-error-message");
        const notDuplicate = !this.validation.errors.includes(errorMessage);
        const showable = errorMessage && (function (thisForm) {
            const hasCondition = typeof thisForm.validation.fields[field.name].errorIf === "function";
            return hasCondition ? thisForm.validation.fields[field.name].errorIf.call(field) : true;
        }(this));
        if (hasError && errorMessage && notDuplicate && showable) {
            this.validation.errors.push(errorMessage);
        }
    });
    const $errorPanel = this.$validationErrorOutputs;
    $errorPanel.empty();
    if (this.validation.errors.length) {
        const errors = "<ul>" + this.validation.errors.map(v => "<li>" + v + "</li>").join("") + "</ul>";
        $errorPanel.append(errors).show();
    } else {
        $errorPanel.hide();
    }
};


Form.prototype.setRequired = function (fieldNames, bool=true) {
    const that = this;
    if (typeof fieldNames === "string") {
        fieldNames = fieldNames.split(",").map(v => v.trim());
    }
    fieldNames.forEach(fieldName => {
        that.validation.fields[fieldName].required = bool;
    });
    return this;
};


Form.prototype.createTest = function (testName, fn) {
    if (typeof this.validation.tests[testName] === "undefined") {
        this.validation.tests[testName] = fn;
    } else {
        __.log.error(`That test name is already taken. (${testName})`);
    }
};
