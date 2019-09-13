import Form from "./core";

const [ $, __ ] = [ window.jQuery, window.Method ];


Form.prototype.ingredients = function (data={}) {
    if (typeof data === "string" && arguments.length === 2) {
        data = {[arguments[0]]: arguments[1]};
    }
    const that = this;
    Object.keys(data).forEach(key => {
        const value = data[key];
        $(that.get())
            .find("[data-ingredient='" + key + "']")
            .html(value);
    });
    return this;
};

Form.prototype.exists = function (fieldName) {
    if (!fieldName) {
        return false;
    }
    const field = this.fields.find(field => field.name === fieldName);
    return !!field;
};

Form.prototype.get = function (fieldNames) {
    if (fieldNames === undefined) {
        return this.raw;
    }
    if (typeof fieldNames === "string") {
        fieldNames = fieldNames.split(",").map(v => v.trim());
    }
    const fields = this.fields;
    const result = fieldNames.map(fieldName => {
        const field = fields.find(field => field.name === fieldName);
        if (!field) {
            __.log.error(`Tried to get() invalid field name: ${fieldName}.`);
            return false;
        }
        return field;
    });
    return (result.length === 1)
        ? result[0]
        : __(result).unique().get();
};
Form.prototype.export = Form.prototype.get;

Form.prototype.set = function (data={}) {
    if (typeof data === "string" && arguments.length === 2) {
        data = {[arguments[0]]: arguments[1]};
    }
    Object.keys(data).forEach(key => {
        const $field = $(this.get(key));
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
Form.prototype.populate = Form.prototype.set;

Form.prototype.add = function (fields={}) {
    if (typeof fields === "string" && arguments.length === 2) {
        fields = {[arguments[0]]: arguments[1]};
    }
    const $form = $(this.form);
    Object.keys(fields).forEach(name => {
        $form.append(`<input type="hidden" name="${name}" value="${fields[name]}">`);
    });
    return this;
};

Form.prototype.copy = function (...args) {

    copyValues(this, ...args);

    function copyValues (paraform, input, output) {
        __.enforce([
            [paraform, "object"],
            [input, "string,element,object,array"],
            [output, "string,element,undefined"]
        ]);
        if (arguments.length === 3) {
            // resolve input names
            const $input  = resolveInputNames(input);
            const $output = resolveInputNames(output, paraform);
            $input.on("change keyup", function () {
                const value = $input.val();
                $output.val(value);
            });
        } else if (__.typeof(input) === "object") {
            Object.keys(input)
                .forEach(v => copyValues(paraform, v, input[v]));
        } else if (__.typeof(input) === "array") {
            input.forEach(v => copyValues(paraform, v[0], v[1]));
        }
        function resolveInputNames (x, pf) {
            if (typeof x === "string" && $(x).length === 0) {
                return pf !== undefined
                    ? $(pf.form).find("[name='" + x + "']")
                    : $("[name='" + x + "']");
            } else return $(x);
        }
    }

    return this;
};

Form.prototype.getJSONCookie = function (cname) {
    const cookie = __.getCookie(cname);
    let cookieData;
    if (!cookie) {
        cookieData = null;
    } else if (!__.isJSON(cookie)) {
        cookieData = null;
        __.log.error(`Invalid JSON in ${cname} cookie.`);
    } else {
        cookieData = JSON.parse(cookie);
    }
    return cookieData;
};

Form.prototype.find = function (selector) {
    const $result = $(this.get()).find(selector);
    if ($result.length) {
        return ($result.length === 1)
            ? $result.get(0)
            : $result.get();
    } else {
        return null;
    }
};
