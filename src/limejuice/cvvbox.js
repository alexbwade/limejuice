import Form  from "./core";
import Modal from "./modal";

const $ = window.jQuery;


Form.prototype.createCVVBox = function () {
    if (this.CVVBox === undefined) {
        this.CVVBox = new CVVBox(this);
        this.cbox = this.CVVBox;
    }
    return this.CVVBox;
};

function CVVBox (form) {
    this.form = form; // 'this' form API, for reference
    this.raw = $(CVVBoxHTML(form.id)).get(0);
    this.modal = new Modal(this.raw);
}


CVVBox.prototype.get = function () {
    return this.raw;
};

CVVBox.prototype.getField = function () {
    return $(this.get())
        .find("input").get(0);
};

Object.defineProperties(CVVBox.prototype, {
    "field": {
        get () {
            return this.getField();
        }
    },
    "cvv": {
        get () {
            return this.getField();
        }
    }
});

CVVBox.prototype.inject = function () {
    $("body").append(this.get());
    this._initialize();
    return this;
};

CVVBox.prototype.show = function () {
    this.modal.show();
    return this;
};

CVVBox.prototype.hide = function () {
    this.modal.hide();
    return this;
};

// CVVBox.prototype.copyToForm = function () {
//     this.form.copy(this.field, "CVV");
//     return this;
// };

CVVBox.prototype._initialize = function () {
    // this.copyToForm();
    const cbox = this;
    const form = this.form;

    const last4 = form.mode.data ? form.mode.data.ccLast4 : null;
    if (last4) {
        $(cbox.get()).find(".cvv-last4").removeAttr("hidden").find("strong").text(last4);
    }

    const $btn = $(cbox.get()).find(".btn-cvv-submit");
    form.assign($btn, "submit")
        .proxy("CVV", ["proxy-CVV"]);

};

function CVVBoxHTML (formId) { // .. better to have this at the bottom of the page
    return `
<section class="modal fade text-center">
    <style>
        .modal .modal-dialog.vcenter {
            -webkit-transform: translate(0, -95%);
            -ms-transform: translate(0, -95%);
            transform: translate(0, -95%);
        }
        .modal.show .modal-dialog.vcenter {
            -webkit-transform: translate(0, -50%);
            -ms-transform: translate(0, -50%);
            transform: translate(0, -50%);
            margin: 0 auto;
        }
    </style>
    <div class="modal-dialog dib vcenter">
        <div class="modal-content border alert-success">
            <div class="modal-header desktop--p40 mobile--p20 bg-white border-bottom">
                <h3 class="fw-normal text-center mb0 mt10">Please <strong class="text-success">confirm your security code</strong>:</h3>
                <div class="cvv-last4" class="text-center" hidden>
                    <p class="mb0">(for card ending in <strong></strong>)</p>
                </div>
            </div>
            <div class="modal-body desktop--p40 mobile--p20 bg-white">
                <div class="row">
                    <div class="col-sm-6 form-group-lg">
                        <div class="input-default last-input center-block" style="width: 150px;">
                            <label for="proxy-CVV" class="dn">CVV code</label>
                            <input type="text" name="proxy-CVV" placeholder="CVV code" required>
                            <i class="material-icons input-inline-icon">lock_outline</i>
                            <a class="cvvhelp" style="top: 7px;" title="What's a CVV code?" href="https://www.fasttracktofatloss.com/exclusive/cvv.html" onclick="javascript:void window.open('https://www.fasttracktofatloss.com/exclusive/cvv.html','1461796629683','width=700,height=250,toolbar=0,menubar=0,location=0,status=0,scrollbars=0,resizable=1,left=0,top=0');return false;">
                                <svg style="width:24px;height:24px;margin-top:7px;" viewBox="0 0 24 24">
                                    <path fill="#2962ff" d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z">
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <button type="button" class="btn-cvv-submit btn-default btn-success desktop--my0">Confirm</button>
                    </div>
                </div>
                <div class="limejuice-errors limejuice-errors-${formId}"></div>
            </div>
        </div>
    </div>
</section>
`;
}
