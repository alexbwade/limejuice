import Form      from "./core";
import countries from "./countries";

const [ $, __ ] = [ window.jQuery, window.Method ];


Form.prototype.initDigitalProduct = function () {

    const billingCountrySelect   = this.get("billingCountry");
    const billingCountryListHTML = buildCountryListHTML(this.sellToCountries);
    $(billingCountrySelect).html(billingCountryListHTML);

    // we still need to populate shipping countries based upon sellTo countries (though hidden), for "sameship copy" to work
    const shippingCountrySelect   = this.get("shippingCountry");
    const shippingCountryListHTML = buildCountryListHTML(this.sellToCountries);
    $(shippingCountrySelect).html(shippingCountryListHTML);

    this.handleStateless();
    this.sameshipCopyStart();
    this.$billingSameAsShippingSection.attr("hidden", true);

    if (this.config.defaultCountry !== null) {
        $(billingCountrySelect).val(this.config.defaultCountry).change();
    }
};

Form.prototype.initPhysicalProduct = function () {

    const invalidShipTo = this.shipToCountries.filter(country => !this.sellToCountries.includes(country));
    if (invalidShipTo.length) {
        __.log.error(`You have added one or more 'shipTo' countries that are not in the 'sellTo' list: ${invalidShipTo.map(v => countries[v].name).join(", ")}`);
    }

    const shippingCountrySelect   = this.getAll("shippingCountry");
    const shippingCountryListHTML = buildCountryListHTML(this.shipToCountries);
    $(shippingCountrySelect).html(shippingCountryListHTML);

    // billing country list is generated in the opener() function

    this.$billingSameAsShippingBox
        .on("click", () => this.sameship.call(this));

    this.autofillShippingInfo();
    this.initSameship();
    this.handleStateless();

    if (this.config.defaultCountry !== null) {
        const billingCountrySelect = this.get("billingCountry");
        $(billingCountrySelect).val(this.config.defaultCountry).change();
    }
};

Form.prototype.autofillShippingInfo = function () {
    const cdata = this.mode.data;
    if (cdata && __.typeof(cdata.formData) === "object") {
        const shippingAddress = ["shippingAddress1", "shippingAddress2", "shippingCity", "shippingState", "shippingCountry", "shippingZip"];
        const autofillData = __(this.mode.data.formData).keep(["billingSameAsShipping", ...shippingAddress]).get();
        this.populateAll(autofillData); // fill internal fields AND proxies
        this.save(shippingAddress, "shippingA");
    }
};

Form.prototype.initSameship = function () {
    const billingSameAsShipping = this.$billingSameAsShipping.val();
    if (billingSameAsShipping === "YES") { // this is "backwards" because sameship() below will toggleClass() at start
        this.$billingSameAsShippingBox.addClass("active"); // (normally an "active" shipping dropdown happens when billing is NOT same as shipping)
    } else {
        this.$billingSameAsShippingBox.removeClass("active");
    }
    this.sameship();
};

Form.prototype.sameship = function () {
    this.$billingSameAsShippingBox.toggleClass("active");
    const active = this.$billingSameAsShippingBox.hasClass("active");
    if (active) {
        opener.call(this);
    } else {
        closer.call(this);
    }
};

Form.prototype.handleStateless = function () {
    const $billingState    = $(this.get("billingState"));
    const $billingCountry  = $(this.get("billingCountry"));
    const $shippingState   = $(this.getAll("shippingState"));
    const $shippingCountry = $(this.getAll("shippingCountry"));

    disableStateOnStateless($billingState, $billingCountry);
    if ($shippingState.length && $shippingCountry.length) {
        disableStateOnStateless($shippingState, $shippingCountry);
    }
};

const evts = "change keyup"
    .split(" ").map(v => v + ".sameshipCopy").join(" ");

Form.prototype.sameshipCopyStart = function () {
    this.sameshipCopy();
    this.$billingAddressFields.on(evts, () => this.sameshipCopy()); // keep () => {}, as this.sameshipCopy will not retain 'this' context
    this.on("presubmit.sameshipCopy", () => {
        if (this.$billingSameAsShipping.val() === "YES") {
            this.sameshipCopy();
        }
    });
};

Form.prototype.sameshipCopyStop = function () {
    this.$billingAddressFields.off(evts);
    this.off("presubmit.sameshipCopy");
};

Form.prototype.sameshipCopy = function () {
    const thisForm = this;
    this.$billingAddressFields.get()
        .forEach(field => {
            const fieldName = $(field).attr("name");
            const billingValue = $(thisForm.get(fieldName)).val();
            if (billingValue) {
                const $shippingField = $(thisForm.get(fieldName.replace("billing", "shipping")));
                $shippingField.val(billingValue);
            }
        });
};

function disableStateOnStateless ($stateInput, $countrySelect) {
    const statePlaceholder = $stateInput.attr("placeholder");
    const stateLabel = $stateInput.parent().children("label").text();

    $countrySelect.on("change", function () {
        const countryCode = $(this).val();
        if (countryCode && !countries[countryCode].hasOwnProperty("states")) {
            $stateInput.val("")
                .attr("disabled", true).attr("placeholder", "N/A")
                .parent().children("label").text("N/A");
        } else {
            $stateInput.attr("disabled", false).attr("placeholder", statePlaceholder)
                .parent().children("label").text(stateLabel);
        }
    });
}

function opener () {
    this.$shippingPanel.show(); // show the panel
    this.$billingSameAsShipping.val("NO");
    this.$billingSameAsShippingCheckbox.prop("checked", false); // if there is a checkbox, uncheck it

    this.sameshipCopyStop();
    if (this._checkpoints["shippingA"] !== undefined) { // check for saved shipping address
        const shippingAddress = "shippingAddress1, shippingAddress2, shippingCity, shippingState, shippingCountry, shippingZip";
        this.resetAll(shippingAddress, "shippingA"); // use saved shipping address if present
    }

    const billingSaveFields = "billingState, billingCountry";
    this.save(billingSaveFields, "billingC"); // save the country before we nuke the list
    const billingCountrySelect   = this.get("billingCountry");
    const billingCountryListHTML = buildCountryListHTML(this.sellToCountries);
    $(billingCountrySelect).html(billingCountryListHTML);
    this.reset(billingSaveFields, "billingC"); // put it back in there
    this.dispatchEvent("countrylistupdate"); // this is particularly useful if using jQuery.selectmenu or a similar <select> replacement

    const requiredShippingFields = "shippingAddress1, shippingCity, shippingState, shippingCountry, shippingZip";
    this.setRequired(requiredShippingFields, true); // since the panel is open, shipping fields now MUST be filled out
    this.dispatchEvent("sameshipopen");
}

function closer () {
    this.$shippingPanel.hide(); // hide the panel
    this.$billingSameAsShipping.val("YES");
    this.$billingSameAsShippingCheckbox.prop("checked", true); // if there is a checkbox, check it

    const shippingAddress = "shippingAddress1, shippingAddress2, shippingCity, shippingState, shippingCountry, shippingZip";
    this.save(shippingAddress, "shippingA"); // save shipping address at present

    const billingAddress = "billingAddress1, billingAddress2, billingCity, billingState, billingCountry, billingZip";
    this.save(billingAddress, "billingA"); // save the full billing address, before nuke

    const billingCountrySelect = this.get("billingCountry");
    const billingCountryListHTML = buildCountryListHTML(this.shipToCountries);
    $(billingCountrySelect).html(billingCountryListHTML);
    this.reset(billingAddress, "billingA"); // reset to that save point
    if (this.get("billingCountry").value === "") { // if country is "", that means the address is no longer valid
        this.reset(billingAddress, "default"); // so we clear the whole thing, to make sure the customer reviews
    }
    this.dispatchEvent("countrylistupdate"); // this is particularly useful if using jQuery.selectmenu or a similar <select> replacement
    this.sameshipCopyStart(); // while closed, billing fields copy automatically to shipping fields

    const requiredShippingFields  = "shippingAddress1, shippingCity, shippingState, shippingCountry, shippingZip";
    this.setRequired(requiredShippingFields, false); // since the panel is closed, shipping fields have been cleared and are not required for validation
    this.dispatchEvent("sameshipclose");
}

function buildCountryListHTML (list) {
    const nullCase = `<option value="" selected>Please select a country</option>`;
    const specialCases = ["US", "CA"]
        .map(countryCode => list.includes(countryCode) && list.length > 5 ? `<option value="${countryCode}">${countries[countryCode].name}</option>` : "");
    const mainList = list.sort(sortByName)
        .reduce((acc, countryCode) => {
            acc += `<option value="${countryCode}">${countries[countryCode].name}</option>`;
            return acc;
        }, "");
    return nullCase + specialCases + mainList;
}

function sortByName (a, b) {
    const aName = countries[a].name;
    const bName = countries[b].name;
    return (aName > bName) ? 1 : ((aName < bName) ? -1 : 0);
}


Object.defineProperties(Form.prototype, {
    "$billingSameAsShipping": {
        get () {
            return $(this.get("billingSameAsShipping")); // the input that LimeLight uses
        }
    },
    "$billingSameAsShippingBox": {
        get () {
            return this.$billingSameAsShippingCheckbox.parent(); // the box surrounding the checkbox and including text
        }
    },
    "$billingSameAsShippingCheckbox": {
        get () {
            return $(this.getAll("sameshipCheckbox")); // the visible checkbox
        }
    },
    "$billingSameAsShippingSection": {
        get () {
            return this.$billingSameAsShippingBox.parent(); // the visible checkbox
        }
    },
    "$shippingPanel": {
        get () {
            return this.$billingSameAsShippingCheckbox.parent().next(); // the panel that drops down with shipping fields
        }
    },
    "$billingAddressFields": {
        get () {
            return $(["Address1", "Address2", "City", "State", "Country", "Zip"].map(v => this.get("billing" + v)));
        }
    },
    "$shippingAddressFields": {
        get () {
            return $(["Address1", "Address2", "City", "State", "Country", "Zip"].map(v => this.get("shipping" + v)));
        }
    }
});
