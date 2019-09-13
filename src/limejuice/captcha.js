import Form from "./core";

const [ $, __ ] = [ window.jQuery, window.Method ];

Form.prototype.captcha = function () {

    const response = window.grecaptcha.getResponse();

    if (!response) {
        window.alert("Please verify that you are not a robot by completing the CAPTCHA.");
        return false;
    }

    const data = {
        "response": response,
        "remoteip": ""
    };

    return $.post(this.config.recaptchaScriptFilePath, data).promise()
        .then(result => {
            const verified = JSON.parse(result).success;
            if (!verified) {
                window.alert("Please verify that you are not a robot by completing the CAPTCHA.");
                return false;
            } else return true;
        });
};

Form.prototype.initCaptcha = function () {

    const loadedApi = new Promise(function (resolve) {
        $.getScript("https://www.google.com/recaptcha/api.js")
            .done(() => {
                // __.log.success("Loaded Google reCAPTCHA.");
                resolve(true);
            }).fail(() => {
                __.log.error("Unable to load Google reCAPTCHA. Trying again...");
            });
    });

    const captchaReady = new Promise(function (resolve) {
        grecaptchaLoaded();
        function grecaptchaLoaded () {
            const grecaptcha = window.grecaptcha;
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

Form.prototype.containsCaptcha = function () {
    return !!this.find(".g-recaptcha");
};
