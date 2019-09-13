import Form      from "./core";
import countries from "./countries";

const [ $, __ ] = [ window.jQuery, window.Method ];


Form.prototype.autoformat = function () {
    this.autoformatCCNum();
    this.autoformatState();
    // this.autoformatName();
    return true;
};

Form.prototype.autoformatCCNum = function () {
    const $creditCardNumber = $(this.get("creditCardNumber"));
    const formattedVal = $creditCardNumber.val().replace(/-|\s/g, "");
    $creditCardNumber.val(formattedVal);
};

Form.prototype.autoformatState = function () {
    const $billingState    = $(this.get("billingState"));
    const $billingCountry  = $(this.get("billingCountry"));
    const $shippingState   = $(this.get("shippingState"));
    const $shippingCountry = $(this.get("shippingCountry"));

    initStateAutoformat($billingState, $billingCountry);
    initStateAutoformat($shippingState, $shippingCountry);
};

function initStateAutoformat ($stateInput, $countrySelect) {
    const stateValue  = $stateInput.val();
    const countryCode = $countrySelect.val();

    if (countryCode !== "") {
        const validStates = countries[countryCode].states;

        if (!validStates) { // stateless country
            $stateInput.val(""); // must be empty
            return true;
        }

        if (!Object.keys(validStates).length) { // country with no known states
            const capitalized = __(stateValue).ucfirst().get();
            $stateInput.val(capitalized); // any state is fine, but capitalize it
            return true;
        }

        const stateCode = Object.values(validStates).find(stateCode => {
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

        if (stateCode) {
            $stateInput.val(stateCode);
        }
    }
}

Form.prototype.autoformatName = function () {
    const $firstName = $(this.get("billingFirstName"));
    const $lastName  = $(this.get("billingLastName"));

    initNameAutoformat($firstName, $lastName);

    function initNameAutoformat (...$names) {
        $names.forEach(function ($name) {
            const name = $name.val();
            const customerAttemptedValidCapitalization = contains1to3Capitals(name);
            if (name && !customerAttemptedValidCapitalization) {
                const formattedName = __(name).toTitleCase().get();
                $name.val(formattedName);
            }
        });
    }

    function contains1to3Capitals (str) {
        const numCapitals = str.replace(/[^A-Z]/g, "").length;
        return numCapitals >= 1 && numCapitals <= 4;
    }
};
