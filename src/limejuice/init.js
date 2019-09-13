import Form from "./core";

const [ $, __ ] = [ window.jQuery, window.Method ];


const defaultInitActions = {
    attachForm () {
        return this.imported
            ? this.importTemplate()
            : this.hijackExistingForm();
    },
    assess () {
        this.save(); // save initial state of form, used in reset() in countrySelect
        this.assessMode(); // determine which: opt-in, upfront, standalone, upsell, upsell-cvv
        $(this.form).attr("data-limejuice-form-id", this.id);
        return true;
    },
    modalize () {
        return this.imported
            ? this.modalize() // wrap in a modal
            : true;
    },
    buttons () {
        return this.initButtons();
    },
    proxies () {
        return this.imported // there should be no proxies on hijacked forms
            ? this.initProxies()
            : true;
    },
    captcha () {
        if (this.hijacked && this.containsCaptcha()) {
            this.config.captcha = true;
        }
        return this.config.captcha
            ? this.initCaptcha()
            : true;
    },
    countrySelect () {
        return this.config.shipTo !== null
            ? this.initPhysicalProduct()
            : this.initDigitalProduct();
    },
    autocomplete () {
        return this.autocomplete();
    },
    autofill () {
        return this.autofillStart();
    },
    kount () {
        return this.initKount();
    },
    misc () {
        return this.misc();
    }
};

Form.prototype.defineInitActions = function () {
    this.defineInternalProperty("initActions", defaultInitActions);
};

Form.prototype.init = function (str) {

    if (typeof str !== "string") {
        throw new TypeError("Form.prototype.init() will only accept a valid form ID or template name.");
    }

    return str.startsWith("#")
        ? this.hijack(str) // hijacked form already in DOM
        : this.import(str); // imported from template / html
};

Form.prototype.hijack = function (formId) {

    if (typeof formId !== "string" || !formId.startsWith("#")) {
        throw new TypeError("Form.prototype.hijack() will only accept a valid form ID (preceded by '#'.)");
    }

    if (!document.getElementById(formId.substr(1))) {
        throw new Error(`"${formId}" is not a valid form ID.`);
    }

    this.config.formIdentifier = formId;

    this.hijacked = true;
    this.imported = false;

    return initialize.call(this); // run initialization actions
};

Form.prototype.import = function (templateName) {

    if (typeof templateName !== "string") {
        throw new TypeError("Form.prototype.import() will only accept a valid template name or HTML string.");
    }

    this.config.formIdentifier = templateName;

    this.hijacked = false;
    this.imported = true;

    return initialize.call(this); // run initialization actions
};

function initialize () {

    const thisForm = this;
    const initActionConf = this.config.init;

    this.dispatchEvent("preinit");

    return __(initActionConf)
        .queue((actionName, lastResult, i) => { // async iterator, returns promise

            if (lastResult === false) {
                window.alert(thisForm.errorMsg);
                throw new Error(`Form ${thisForm.id}: an init action returned false: '${initActionConf[i - 1]}'`);
            }

            if (!thisForm.initActions.hasOwnProperty(actionName)) {
                window.alert(thisForm.errorMsg);
                throw new Error(`The following init action has not been defined: '${initActionConf[i]}'`);
            }

            __.log.info(`Form ${thisForm.id} attempting: `, actionName);

            return thisForm.initActions[actionName].call(thisForm);
        })
        .then(() => {

            thisForm.dispatchEvent("init");

            __.log.success("All init actions completed successfully.");

            return thisForm;
        });
}

Form.prototype.errorMsg = `
We're sorry - something went wrong with this web page.

A report has already been sent to our technical support team so that we can get this resolved ASAP.

We apologize for any inconvenience.
`;

Form.prototype.sendErrorReport = function (category, fn, err) {

    let typeErr = "none";

    try {
        __.enforce([
            [category, "string"],
            [fn, "string"],
            [err, "string,undefined"]
        ]);
    } catch (e) {
        typeErr = `Attempted error report failed type checking with the following error: ${e}`;
    }

    category = String(category);
    fn       = String(fn);
    err      = String(err);

    const data = {
        "category": category,
        "fn"      : fn,
        "err"     : err,
        "typeErr" : typeErr,
        "dateTime": new Date(),
        "browser" : __.browser,
        "os"      : __.os,
        "screen"  : __.screen,
    };

    return data;
};

Form.prototype.importTemplate = function () {

    const templateName = this.config.formIdentifier;
    const isValidTemplateName = (/^[a-zA-Z0-9_-]*$/gi).test(templateName);

    if (!isValidTemplateName) {
        throw new TypeError("Argument passed to Form.prototype.importTemplate could not be parsed as a valid template name or HTML string.");
    }

    const templateURL  = createTemplateURL(templateName, this);

    return $.get(templateURL)
        .then(html => {

            const form   = parseHTML(html);
            const script = extractScripts(form);

            this.on("inject", () => window.eval(script)); // "inject" fires when form first is attached to DOM

            this.raw = form;

            return true;
        });

    function parseHTML (html) {
        return $("<div>").append(html).get(0);
    }

    function extractScripts (form) {
        return $(form).find("script")
            .detach()
            .get()
            .map(v => $(v).html())
            .join("");
    }

    function createTemplateURL (templateName, that) {
        const scheme    = window.location.protocol + "//";
        const host      = window.location.hostname;
        const prefix    = scheme + host + that.config.formTemplatesDirPath;

        const extension = ".php";
        const query     = "?" + __({
            "fetchTemplate": "true",
            "cacheBust"    : __.rand(1, 1000).toString()
        }).http_build_query().get();
        const suffix    = extension + query;

        return prefix + templateName + suffix;
    }
};

Form.prototype.hijackExistingForm = function () {
    this.raw = document.getElementById(this.config.formIdentifier.substr(1));
    return true;
};
