import Form from "./core";

const [ $, __ ] = [ window.jQuery, window.Method ];


Object.defineProperties(Form.prototype, {

    "form": {
        get () {
            return this.getForm();
        }
    },

    "fields": {
        get: function () {
            // return this.entities;
            return [...this.entities, ...this.proxies];
        }
    },

    "entities": {
        get: function () {
            return this.getInternalFormFields();
        }
    },

    "data": {
        get: function () {
            return this.getData();
        }
    },

    "attributes": {
        get: function () {
            return this.getAttributes();
        }
    },

    "filled": {
        get: function () {
            return $(this.fields).filter(":visible").get().every(v => $(v).val().trim() !== "");
        }
    },

    "valid": { // in validate module
        get: function () {
            return this.isValid();
        }
    },

    "cookies": {
        get () {
            const modeCookieName = this.mode.cname;
            const dupsCookieName = this.dups.cname;
            return {
                [modeCookieName]: __.getCookie(modeCookieName),
                [dupsCookieName]: __.getCookie(dupsCookieName),
            };
        }
    },

    "cvv": {
        get () {
            return this.get("CVV");
        }
    }
});

Form.prototype.getForm = function () { // aliased as this.form
    if (this.get() === undefined) {
        return null;
    }
    return this.get().nodeName === "FORM"
        ? this.get()
        : $(this.get()).find("form").get(0);
};

Form.prototype.getInternalFormFields = function () { // aliased as this.fields
    if (this.get() === undefined) {
        return null;
    }
    return Array.from(this.form.elements)
        .filter(node => {
            const element = node.nodeName.toLowerCase();
            return element === "input" || element === "select";
        });
};

Form.prototype.getData = function () {
    if (this.get() === undefined) {
        return null;
    }
    return this.getInternalFormFields()
        .reduce(function (acc, field) {
            acc[field.name] = field.value;
            return acc;
        }, {});
};

Form.prototype.getAttributes = function () {
    if (this.get() === undefined) {
        return null;
    }
    return Array.from(this.getForm().attributes)
        .reduce(function (acc, attr) {
            acc[attr.name] = attr.value;
            return acc;
        }, {});
};
