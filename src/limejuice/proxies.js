import Form from "./core";

const [ $, __ ] = [ window.jQuery, window.Method ];


Form.prototype.defineProxyProperties = function () {
    this.defineInternalProperty("proxies", []); // list of actual elements
    this.defineInternalProperty("proxyMap", {}); // { entityName: [proxyName1, proxyName2...] }
};


Form.prototype.initProxies = function () {
    if (this.config.proxies !== null) {
        this.proxy(this.config.proxies);
    }
    return true;
};


Form.prototype.proxy = function (maps={}, proxyList) {

    if (arguments.length === 2) { // if passed as single entity -> proxyList pair
        maps = {[maps]: proxyList}; // convert to object
    }

    const invalids = [];

    Object.keys(maps).forEach(entityName => {

        const $entity = $(this.get(entityName));
        if (!$entity.length) {
            invalids.push("\"" + entityName + "\"");
        }

        const proxies = maps[entityName] // (proxyList)
            .map(proxyName => {
                const proxy = $("[name='" + proxyName + "']").get(0);
                if (!proxy) {
                    invalids.push("\"" + proxyName + "\"");
                    return null;
                }
                this.proxies.push(proxy); // each proxy goes into a generic array that is included in "this" form's "fields" property
                if (this.validation.fields.hasOwnProperty(entityName)) { // if entity has validation criteria
                    this.validation.fields[proxyName] = this.validation.fields[entityName]; // assign same validation tests, errors, etc. to the proxy
                }
                $(proxy).on("keyup change", () => $entity.val($(proxy).val()));
                return proxyName;
            })
            .filter(proxyName => !!proxyName);

        if (!this.proxyMap[entityName]) {
            this.proxyMap[entityName] = proxies;
        } else {
            proxies.forEach(proxy => this.proxyMap[entityName].push(proxy));
        }
        // this.proxyMap[entityName] = proxies;
    });

    if (invalids.length) {
        __.log.error(`You have invalid input names in your proxy() map definition: ${invalids.join(", ")}.`);
    }
}; // maps proxy fields to target fields within form; values will be copied to targets before submit, and proxies will be visually validated


Form.prototype.getAll = function (fieldName) {
    return !this.proxyMap.hasOwnProperty(fieldName)
        ? [this.get(fieldName)]
        : [this.get(fieldName), ...this.proxyMap[fieldName].map(v => $(`[name="${v}"]`).get(0))];
};

Form.prototype.setAll = function (data={}) {
    if (typeof data === "string" && arguments.length === 2) {
        data = {[arguments[0]]: arguments[1]};
    }
    Object.keys(data).forEach(fieldName => {
        const fields = this.getAll(fieldName);
        if (fields.length && fields.every(field => !!field)) {
            $(fields).val(data[fieldName]).change();
        }
    });
    return this;
};

Form.prototype.populateAll = Form.prototype.setAll;
