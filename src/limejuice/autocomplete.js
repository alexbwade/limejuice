import Form      from "./core";
import countries from "./countries";

const [ $, __ ] = [ window.jQuery, window.Method ];


Form.prototype.autocomplete = function () {
    this.autocompleteState();
};

Form.prototype.autocompleteState = function () {
    const $billingState    = $(this.getAll("billingState"));   // this.billingStateFields
    const $billingCountry  = $(this.getAll("billingCountry"));
    const $shippingState   = $(this.getAll("shippingState"));
    const $shippingCountry = $(this.getAll("shippingCountry"));

    initStateAutocomplete($billingState, $billingCountry);
    initStateAutocomplete($shippingState, $shippingCountry);
    disableBrowserAutocomplete($billingState, $shippingState);
};

function disableBrowserAutocomplete (...$fields) {
    $fields.forEach(function (field) {
        const $field = $(field);
        const autocompleteVal = $field.attr("autocomplete") || "on";
        $field.on("focus", function () {
            $field.attr("autocomplete", "off-" + __.rand(1, 1000)); // can't just use "off" as browsers ignore this
        }).on("blur", function () {
            $field.attr("autocomplete", autocompleteVal);
        });
    });
}

function initStateAutocomplete ($stateInput, $countrySelect) {

    const $container = $stateInput.parent();
    const $dropdown = $container.find(".input-autofill");

    $container.css("z-index", parseInt($container.css("z-index")) + 1); // add 1 z-index to fix dropdown falling below other inputs
    $dropdown.css("top", parseInt($stateInput.css("height"))); // adjust positioning of dropdown relative to input height

    $stateInput
        .on("blur", function () {
            __.wait(100).then(function () { // needs time to potentially handle "click" evt on a dropdown list item
                $dropdown.hide(); // before we hide the dropdown content (thereby precluding a "click")
            });
        })
        .on("keyup", function () {
            const countryCode = $countrySelect.val();
            if (countryCode === "") {
                return;
            }
            const stateValue = $(this).val().toLowerCase();
            const matchTypes = {};
            const matches = Object.entries(countries[countryCode].states)
                .filter(v => {
                    const stateNameMatch = v[0].toLowerCase().startsWith(stateValue);
                    const stateCodeMatch = v[1].includes("-")
                        ? v[1].split("-")[1].toLowerCase().startsWith(stateValue)
                        : v[1].toLowerCase().startsWith(stateValue);
                    if (stateNameMatch || stateCodeMatch) {
                        matchTypes.stateName = stateNameMatch;
                        matchTypes.stateCode = stateCodeMatch;
                        return true;
                    }
                });
                // .filter(v => v[0].match(stateValue) || v[1].match(stateValue));
            if (matches.length === 0) {
                $dropdown.hide();
            } else {
                if (matches.length > 5) {
                    matches.length = 5;
                }
                $dropdown.html("").show();
                matches.forEach(v => {
                    const amendedCode = v[1].includes("-") ? v[1].split("-")[1] : v[1];
                    const stateNameHTML = processMatchingText(v[0], matchTypes.stateName, stateValue.length);
                    const stateCodeHTML = "<em>(" + processMatchingText(amendedCode, matchTypes.stateCode, stateValue.length) + ")</em>";
                    const $li = $("<li></li>")
                        .attr("data-value", v[0])
                        .html(stateNameHTML + " " + stateCodeHTML)
                        .on("mousedown", function () {
                            var value = $(this).attr("data-value");
                            $stateInput.val(value).change();
                            $dropdown.hide();
                        });
                    $li.appendTo($dropdown);
                });
            }
        });
}

function processMatchingText (str, hasMatch, matchLen) {
    return hasMatch ? str.substr(matchLen).replace(/^/g, "<strong>" + str.slice(0, matchLen) + "</strong>") : str;
}
