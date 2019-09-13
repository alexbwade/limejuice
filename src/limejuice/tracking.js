import Form from "./core";


const processPageUrl = window.location.href + "-process";

const googleAccountId = "UA-44141922-2";


Form.prototype.GAsale = function () {
    window.gtag("config", googleAccountId, {
        "page_location": processPageUrl
    });
    return true;
};

Form.prototype.VWOsale = function () {
    window.VWO = window.VWO || [];
    window.VWO.push(["activate", {
        "virtualPageUrl": processPageUrl
    }]);
    return true;
};
