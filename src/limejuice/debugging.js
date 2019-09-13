import Form from "./core";

const [ $, __ ] = [ window.jQuery, window.Method ];


Form.prototype.submitForm = function () {
    __.log.success("Submitting form...");
    $(this.form).submit();
    return this;
};

Form.prototype.fill = function () {
    this.populate("billingCountry", this.testValues.billingCountry);
    $(this.get("billingCountry")).change();
    if (this.testValues.shippingCountry) {
        this.populate("shippingCountry", this.testValues.shippingCountry);
        $(this.get("shippingCountry")).change();
    }
    this.populate(this.testValues);
    return this;
};

Form.prototype.deleteCookies = function () {
    const modeCookieName = this.mode.cname;
    const dupsCookieName = this.dups.cname;
    __.setCookie(modeCookieName, "", new Date());
    __.setCookie(dupsCookieName, "", new Date());
    return this;
};

Form.prototype.testMode = function () {
    this.config.submit = __(this.config.submit).replace("submitForm", "testSubmit").get();
};

Form.prototype.materialize = function () {
    this.inject();
    this.modalize();
    this.show();
    return this;
};

Form.prototype.append = function (html) {
    $(this.form).append(html);
    return this;
};

Form.prototype.serialize = function (fieldNames, sanitize=["CVV"]) {
    const fields = (function (that) {
        if (!fieldNames) return that.fields;
        const fields = that.get(fieldNames);
        return __.typeof(fields) === "element" ? [fields] : fields;
    }(this));
    if (!sanitize) {
        sanitize = [];
    }
    return fields
        .filter(v => !sanitize.includes(v.name))
        .reduce((acc, v) => {
            const name  = window.encodeURIComponent(v.name);
            const value = window.encodeURIComponent(v.value);
            acc += `${name}=${value}&`;
            return acc;
        }, "")
        .slice(0, -1);
};

Form.prototype.toObject = function (fieldNames, sanitize=["CVV"]) {
    const fields = (function (that) {
        if (!fieldNames) return that.fields;
        const fields = that.get(fieldNames);
        return __.typeof(fields) === "element" ? [fields] : fields;
    }(this));
    if (!sanitize) {
        sanitize = [];
    }
    return fields
        .filter(v => !sanitize.includes(v.name))
        .reduce((acc, v) => {
            acc[v.name] = v.value;
            return acc;
        }, {});
};

Form.prototype.clear = function (fieldNames=null) {
    const fields = (function (that) {
        if (!fieldNames) return that.fields;
        const fields = that.get(fieldNames);
        return __.typeof(fields) === "element" ? [fields] : fields;
    }(this));
    fields.forEach(field => field.value = "");
    return this;
};


Form.prototype.testValues = {
    "billingFirstName": "Alex",
    "billingLastName" : "Wade",
    "email"           : "alex@globalfitnessnetwork.com",
    "phone"           : "503-956-5078",
    "billingAddress1" : "11111 SE 93rd Ave",
    "billingAddress2" : "Apt 20",
    "billingCity"     : "Clackamas",
    "billingState"    : "OR",
    "billingZip"      : "97015",
    "billingCountry"  : "US",

    "shippingAddress1" : "11111 SE 93rd Ave",
    "shippingAddress2" : "Apt 20",
    "shippingCity"     : "Clackamas",
    "shippingState"    : "OR",
    "shippingZip"      : "97015",
    "shippingCountry"  : "US",

    // "creditCardNumber": "1444444444444440", // success
    "creditCardNumber": "1444444444444441", // decline
    "expirationMonth" : "01",
    "expirationYear"  : "2026",
    "CVV"             : "123",
};

Form.prototype.ref = [
    "infusion_xid",
    "Order0_Campaign0",
    "Order0_Platform",
    "Order0_SalesFunnel",
    "Order0_OrderURL",
    "JobRecurring0_Campaign0",
    "JobRecurring0_Platform",
    "JobRecurring0_SalesFunnel",
    "JobRecurring0_OrderURL",
    "Contact0LeadSourceId",
    "Contact0_RecentCampaign",
    "Contact0_AdSource",
    "Contact0_AdCampaign",
    "Contact0_AdName",
];

// Form.prototype._checkpoints = {
//     "default": undefined
// };

Form.prototype.save = function (fieldNames=null, checkpoint="default") {
    this._checkpoints[checkpoint] = this.serialize(fieldNames, null);
    return this;
};

Form.prototype.reset = function (fieldNames=null, checkpoint="default", clearRemaining=false) {
    const fields = (function (that) {
        if (!fieldNames) return that.fields;
        const fields = that.get(fieldNames);
        return __.typeof(fields) === "element" ? [fields] : fields;
    }(this));
    checkpoint = this._checkpoints[checkpoint];
    if (!checkpoint) {
        __.log.warning("No checkpoint by that name.");
        return this;
    }
    checkpoint = __(checkpoint).parse().get(); // convert serialized string to object
    fields.forEach(field => {
        if (checkpoint.hasOwnProperty(field.name)) {
            const value = checkpoint[field.name];
            $(field).val(value).change();
        } else if (clearRemaining === true) {
            $(field).val("").change();
        }
    });
    return this;
};

Form.prototype.resetAll = function (fieldNames=null, checkpoint="default", clearRemaining=false) {
    const fields = (function (that) {
        if (!fieldNames) return that.fields;
        const fields = that.get(fieldNames);
        return __.typeof(fields) === "element" ? [fields] : fields;
    }(this));
    checkpoint = this._checkpoints[checkpoint];
    if (!checkpoint) {
        __.log.warning("No checkpoint by that name.");
        return this;
    }
    checkpoint = __(checkpoint).parse().get(); // convert serialized string to object
    fields.forEach(field => {
        const allFields = this.getAll(field.name);
        if (checkpoint.hasOwnProperty(field.name)) {
            const value = checkpoint[field.name];
            allFields.forEach(v => $(v).val(value).change());
        } else if (clearRemaining === true) {
            allFields.forEach(v => $(v).val("").change());
        }
    });
    return this;
};
