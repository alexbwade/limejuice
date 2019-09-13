import Form from "./core";

const [ $, __ ] = [ window.jQuery, window.Method ];


Form.prototype.autofillStart = function () {
    this.autoCardType();
    this.autoExpDate();
    this.autoName();
};

Form.prototype.autofillStop = function () {
    this.autofill.intervals.forEach(v => v.cancel());
    this.autofill.intervals = [];
};

Form.prototype.autoName = function () {
    const $firstName        = $(this.get("firstName"));
    const $lastName         = $(this.get("lastName"));
    const $billingFirstName = $(this.get("billingFirstName"));
    const $billingLastName  = $(this.get("billingLastName"));

    this.autofill.intervals.push(__.repeat(autoCopyNames).every(500));

    function autoCopyNames () {
        const firstName = $billingFirstName.val();
        const lastName = $billingLastName.val();
        if (firstName) {
            $firstName.val(firstName);
        }
        if (lastName) {
            $lastName.val(lastName);
        }
    }
};

Form.prototype.autoExpDate = function () {
    const $expirationMonth = $(this.get("expirationMonth"));
    const $expirationYear  = $(this.get("expirationYear"));
    const $expirationDate  = $(this.get("expirationDate"));

    this.autofill.intervals.push(__.repeat(convertToDate).every(500));

    function convertToDate () {
        const monthVal = $expirationMonth.val() || "00";
        const yearVal = $expirationYear.val().substr(2) || "00";
        $expirationDate.val(monthVal + yearVal);
    }
};

Form.prototype.autoCardType = function () {
    const $creditCardType   = $(this.get("creditCardType"));
    const $creditCardNumber = $(this.get("creditCardNumber"));
    const $creditCardImages = (function (that) {
        const imgs = $(that.get()).find(".cc-imgs").children("img");
        return (imgs.length) ? {
            "color": imgs.filter(".is"),
            "grey" : imgs.filter(".not")
        } : undefined;
    }(this));

    typeSelect();
    this.autofill.intervals.push(__.repeat(typeSelect).every(500));

    function typeSelect () {
        if (!$creditCardNumber.length) {
            return false;
        }
        const ccNum = $creditCardNumber.val();
        if (ccNum.startsWith("144444444444444")) { // for LL testing
            return setCardType("visa", "visa");
        }
        switch (ccNum.substring(0, 1)) {
        case "4": setCardType("visa", "visa"); break;
        case "5": setCardType("master", "master"); break;
        case "6": setCardType("discover", "discover"); break;
        case "3": setCardType("amex", "amex"); break;
            // default: setCardType("none", "");
        }
    }

    function setCardType (type, val) {
        if (type === "none") {
            if ($creditCardImages && $creditCardImages.color.length && $creditCardImages.grey.length) {
                $creditCardImages.color.show();
                $creditCardImages.grey.hide();
            }
            if ($creditCardType.length) {
                $creditCardType.val("");
            }
        } else {
            if ($creditCardImages && $creditCardImages.color.length && $creditCardImages.grey.length) {
                $creditCardImages.color.hide();
                $creditCardImages.grey.show();
                $creditCardImages.grey.filter("." + type).hide();
                $creditCardImages.color.filter("." + type).show();
            }
            if ($creditCardType.length) {
                $creditCardType.val(val);
            }
        }
    }
};
