import Form from "./core";

const [ $, __ ] = [ window.jQuery, window.Method ];


const defaultSubmitActions = {
    autoformat () {
        return this.autoformat();
    },
    validate () {
        return !this.valid
            ? this.liveValidationStart() && false
            : true;
    },
    checkForDups () {
        return this.checkForDups();
    },
    captcha () {
        return this.config.captcha
            ? this.captcha()
            : true;
    },
    beforeSubmit () {
        this.dispatchEvent("beforesubmit");
        return true;
    },
    submitForm () {
        __.log.success("Submitting form...");
        this.disableButton(); // is re-enabled if form submit has errors
        return this.submitForm();
    },
    testSubmit () {
        __.log.success("Pretending to submit form...");
        this.disableButton(); // is re-enabled if form submit has errors
        return this.testSubmit();
    }
};

Form.prototype.defineSubmitActions = function () {
    this.defineInternalProperty("submitActions", defaultSubmitActions);
};

Form.prototype.submit = function () {

    const thisForm = this;
    const submitActionConf = this.config.submit;

    this.dispatchEvent("presubmit");

    return __(submitActionConf)
        .queue((actionName, lastResult, i) => { // async iterator, returns promise

            if (lastResult === false) {
                throw new Error(`Form ${thisForm.id}: a submit action returned false: '${submitActionConf[i - 1]}'`);
            }

            if (!thisForm.submitActions.hasOwnProperty(actionName)) {
                throw new Error(`The following submit action has not been defined: '${submitActionConf[i]}'`);
            }

            __.log.info(`Form ${thisForm.id} attempting: `, actionName);

            return thisForm.submitActions[actionName].call(thisForm);
        })
        .then(() => {

            thisForm.dispatchEvent("submit");

            __.log.success("All submit actions completed successfully.");

            return thisForm;
        });

};

Form.prototype.testSubmit = function () {
    const formData  = __(this.toObject(null, false)) // all fields, do not sanitize
        .keep(this.apiFields) // keep only legitimate LimeLight properties
        .removeValues("").get(); // scrub all empty values
    __.log.info("Outgoing form data: ", formData);
    this.LimeLightResponseData = this.fakeLimeLightResponse;
    this.LimeLightFormData = formData;
    this.process();
};

Form.prototype.fakeLimeLightResponse = {
    "authId": "Not Available",
    "customerId": "4",
    "data": `{"tranType":"Sale","firstName":"Alex","billingFirstName":"Alex","lastName":"Wade","billingLastName":"Wade","email":"alex@globalfitnessnetwork.com","phone":"503-956-5078","billingAddress1":"11111 SE 93rd Ave","billingAddress2":"Apt 20","billingCity":"Clackamas","billingState":"OR","billingZip":"97015","billingCountry":"US","billingSameAsShipping":"YES","shippingAddress1":"9999 SE Fake Ave","shippingAddress2":"Apt 20","shippingCity":"Clackamas","shippingState":"OR","shippingZip":"97015","shippingCountry":"US","creditCardType":"visa","creditCardNumber":"1444444444444440","expirationDate":"0126","expirationMonth":"01","expirationYear":"2026","CVV":"123","notes":"http:\/\/localhost.fitera.com\/offers\/500f\/ftflhc.php, Chrome 72, Windows 10, 1920x1080","ipAddress":"127.0.0.1","shippingId":"10","campaignId":"2","offers":[{"product_id":"3","billing_model_id":"2","offer_id":"2","step_num":"2","price":"0.00","quantity":"1"}]}`,
    "error_found": "0",
    "gateway_id": "1",
    "orderSalesTaxAmount": "0.00",
    "orderSalesTaxPercent": "0.00",
    "orderTotal": "6.95",
    "order_id": "10008",
    "prepaid_match": "0",
    "resp_msg": "Approved",
    "response_code": "100",
    "subscription_id": {"3": "deb9bed0be20f494f8f6363c01a59264"},
    "test": "1",
    "transactionID": "Not Available"
};


Form.prototype.submitForm = function () {
    const thisForm = this;

    const apiBaseUrl = "https://" + this.config.limelightAccountName + ".limelightcrm.com/api/v1/";
    const apiMethods = {
        "opt-in"    : "new_prospect",
        "upfront"   : "new_order",
        "standalone": "new_order",
        "upsell"    : "new_order_card_on_file",
        "upsell-cvv": "new_order_card_on_file",
    };
    const apiUrl = apiBaseUrl + apiMethods[this.mode.status];

    const formData = this.mode.data ? this.mode.data.formData : (function (thisForm) {
        const postableFields = __(thisForm.toObject(null, false)) // all fields, do not sanitize
            .keep(thisForm.apiFields).get(); // keep only legitimate LimeLight properties
        if (!postableFields.phone) { // if 'phone' field is empty
            postableFields.phone = "0123456789"; // use fallback (LimeLight required)
        }
        return __(postableFields).removeValues("").get(); // scrub all empty values
    }(this));

    const orderData = this.mode.status.startsWith("upsell") // add "previousOrderId" to new_order_card_on_file payload
        ? Object.assign({"previousOrderId" : thisForm.mode.data.previousOrderId}, this.config.order)
        : this.config.order;

    const postData  = {
        "apiUrl"     : apiUrl,
        "data": Object.assign({}, formData, orderData)
    };

    __.log.info("Posting data to LimeLight...", postData);

    $.ajax({
        "url" : thisForm.config.limelightScriptFilePath,
        "type": "POST",
        "data": postData,
        "dataType": "json",
        "success": function (response) {
            thisForm.apiPost.success.call(thisForm, response, formData);
        },
        "error": function (response) {
            thisForm.apiPost.error.call(thisForm, response);
        }
    });

    return true;
};

Form.prototype.apiPost = {
    "success": function (response, formData) {
        __.log.success("Success! Response received from LimeLight.", response);

        if (response.response_code === "100") { // transaction completed!
            this.LimeLightResponseData = response;
            this.LimeLightFormData = formData;
            this.process();
            return true;
        }

        const errorMessage = response.error_message || "This transaction has been declined.";
        const errorCode    = response.response_code || "unknown error";

        if (this.getMode() === "upsell" && !this.CVVprompted) {

            window.alert(`${errorMessage}. (code: ${errorCode}) \n\nYou may try again using your CVV.`);
            this.setMode("upsell-cvv");
            this.CVVprompted = true;

        } else {
            window.alert(`${errorMessage}. (code: ${errorCode}) \n\nPlease contact Customer Service.`);
        }

        this.enableButton();
    },

    "error": function (response) {
        __.log.error("Something went wrong with API call to LimeLight.", response);
        window.alert("Something went wrong with this purchase.\n\nPlease contact Customer Service.");
        this.enableButton();
    }
};

Form.prototype.apiFields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "billingFirstName",
    "billingLastName",
    "billingAddress1",
    "billingAddress2",
    "billingCity",
    "billingState",
    "billingZip",
    "billingCountry",
    "billingSameAsShipping",
    "shippingAddress1",
    "shippingAddress2",
    "shippingCity",
    "shippingState",
    "shippingZip",
    "shippingCountry",
    "creditCardType",
    "creditCardNumber",
    "expirationDate",
    "CVV",
    "offers",
    "shippingId",
    "campaignId",
    "tranType",
    "notes",
    "website",
    "ipAddress",
    "sessionId",
    "device_category",
    "click_id",
    "AFFID",
    "AFID",
    "SID",
    "C1",
    "C2",
    "C3",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term"
];
