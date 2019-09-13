import Form from "./core";

const __ = window.Method;


Form.prototype.dups = {
    "cname": (function () {
        const url = window.location.href;
        const dir = (function () {
            const fullDir = __(url).dirname().get(); // e.g. http://fasttracktofatloss.com/main
            return fullDir.substr(fullDir.lastIndexOf("/") + 1); // "main"
        }());
        const file = __(url).filebasename().get();
        // const formId = this.form.id ? `_${this.form.id}` : "";
        const formId = "";
        const cname = __(`__ftsale_${dir}_${file}${formId}`)
            .replace("-", "_").get();
        return cname;
    }())
};


Form.prototype.checkForDups = function () {

    if (this.config.order.campaignId === 1) { // test mode
        return true;
    }

    const cname = this.dups.cname;
    const cookie = __.getCookie(cname);

    if (cookie === "true") {

        const message =
`Our records indicate that you purchased this item recently, and that this order may be a duplicate.\n
If you think there has been a mistake, please contact Customer Service at support@fitera.com or call us at 866-796-7204.`;

        window.alert(message);
        return false;

    } else {

        return true;
    }
};

Form.prototype.preventDups = function () {

    if (this.config.order.campaignId === 1) { // test mode
        return true;
    }

    const cname = this.dups.cname;

    __.setCookie(cname, "true", 1);

    return true;
};
