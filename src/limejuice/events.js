import Form from "./core";

const [ $, __ ] = [ window.jQuery, window.Method ];


Form.prototype.dispatchEvent = function (eventName) {
    const name = getEventNames.call(this, eventName);
    // const evt = __.createEvent(name);
    // window.dispatchEvent(evt);
    $(window).trigger(name);
};

function getEventNames (eventNames) {
    return eventNames.split(" ")
        .map(eventName => {
            return eventName.includes(".")
                ? eventName.split(".")[0] + "-form-" + this.id + "." + eventName.split(".")[1]
                : eventName + "-form-" + this.id;
        }).join(" ");
}

Form.prototype.on = function (e, fn) {
    const events = getEventNames.call(this, e);
    $(window).on(events, fn);
};

Form.prototype.off = function (e, fn) {
    const events = getEventNames.call(this, e);
    $(window).off(events, fn);
};

Form.prototype.inject = function () {
    this.attach();
    this.injected = true;
    this.dispatchEvent("inject");
    return this;
};

Form.prototype.attach = function () {
    $("body").append(this.get());
    this.dispatchEvent("attach");
    return this;
};

Form.prototype.detach = function () {
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

Form.prototype.assign = function (...args) {
    return this.createAssignment(...args);
};

Form.prototype.dismiss = function (...args) {
    return this.removeAssignment(...args);
};

Form.prototype.action = function () {
    const status = this.mode.status;
    const thisForm = this;
    const map = {
        "opt-in"    : () => thisForm.submit(),
        "upfront"   : () => thisForm.submit(),
        "standalone": () => thisForm.show(),
        "upsell"    : () => thisForm.submit(),
        "upsell-cvv": () => thisForm.CVVBox.show()
    };
    return map[status]();
};

Form.prototype.behaviours = {
    "action": function (that) {
        return that.action();
    },
    "submit": function (that) {
        return that.submit();
    }
};


Form.prototype.createAssignment = function (selector, behaviour, evt="click") {

    __.enforce([
        [selector, "string,element"],
        [behaviour, "string,function"],
        [evt, "string"]
    ]);

    let behaviourName = behaviour;

    if (typeof behaviour === "function") {
        const behaviourNum  = Object.keys(this.behaviours).length + 1;
        behaviourName = "behaviour-" + behaviourNum.toString();
        this.behaviours[behaviourName] = behaviour;
    }

    const fn   = this.behaviours[behaviourName];
    const $btn = $(selector)
        .on(evt, e => e.preventDefault());

    const that = this;
    $btn.on(`${evt}.${behaviourName}`, () => fn(that));

    this.assignments.push([$btn, behaviourName, evt]);

    return this;
};

Form.prototype.removeAssignment = function (selector, behaviourName, evt="click") {

    __.enforce([
        [selector, "string,element"],
        [behaviourName, "string,undefined"],
        [evt, "string"]
    ]);

    const $btn = $(selector);

    this.assignments
        .filter(v => v[0].is($btn))
        .filter(v => behaviourName ? v[1] === behaviourName : true)
        .filter(v => v[2] === evt)
        .forEach(v => {

            const [$btn, behaviourName, evt] = [v[0], v[1], v[2]];
            $btn.off(`${evt}.${behaviourName}`);

            const index = this.assignments
                .indexOf(x => x[0].is($btn) && x[1] === behaviourName && x[2] === evt); // same as filters above, roughly
            this.assignments.splice(index, 1);
        });

    return this;
};
