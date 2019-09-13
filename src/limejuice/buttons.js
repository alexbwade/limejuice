import Form from "./core";

const [ $, __ ] = [ window.jQuery, window.Method ];

Form.prototype.initButtons = function () {

    if (this.config.actionButton) {
        const $actionBtn = $(this.config.actionButton);
        if ($actionBtn.length) {
            this.assign($actionBtn, "action");
        } else {
            __.log.error(assignmentError(this.config.actionButton, "action"));
            return false;
        }
    }

    if (this.config.submitButton) {
        const $submitBtn = $(this.config.submitButton);
        if ($submitBtn.length) {
            this.assign($submitBtn, "submit");
        } else {
            __.log.error(assignmentError(this.config.submitButton, "submit"));
            return false;
        }
    }

    if (this.imported) { // templates have a default submit button
        const $defaultSubmitBtn = $(this.find(".btn-submit"));
        if ($defaultSubmitBtn.length) {
            this.assign($defaultSubmitBtn, "submit");
        } else {
            __.log.error("Something appears to be wrong with your form HTML. No '.btn-submit' class found within form.");
            return false;
        }
    }

    return true;
};

function createLoader (height, margin) {
    // const margin = (height - 40) / 2;
    return `
    <div style="height: ${height}px; margin: ${margin};">
        <div class="vcenter">
            <svg class="loader center-block" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="40px" height="40px" viewBox="0 0 66 66">
                <circle class="loader-path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
        </div>
    </div>
    `;
}


Form.prototype.disableButton = function () {
    this.$buttons.get().forEach(button => {
        if (!$(button).next().is("svg.loader")) {
            const height = $(button).outerHeight();
            const margin = $(button).css("margin");
            $(button).after(createLoader(height, margin));
        }
        $(button).hide()
            .next().show();
    });
};

Form.prototype.enableButton = function () {
    this.$buttons.get().forEach(button => {
        $(button).show().next().hide();
    });
};

Object.defineProperties(Form.prototype, {
    "$actionButton": {
        get () {
            const $actionBtn = $(this.config.actionButton);
            if ($actionBtn.length) {
                return $actionBtn;
            } else return null;
        }
    },
    "$submitButton": {
        get () {
            let $submitBtns = $();
            const $configSubmitBtn = $(this.config.submitButton);
            if ($configSubmitBtn.length) {
                $submitBtns = $submitBtns.add($configSubmitBtn);
            }
            const $defaultSubmitBtn = $(this.find(".btn-submit"));
            if ($defaultSubmitBtn.length) {
                $submitBtns = $submitBtns.add($defaultSubmitBtn);
            }
            return $submitBtns.length ? $submitBtns : null;
        }
    },
    "$buttons": {
        get () {
            let $btns = $();
            if (this.$actionButton) {
                $btns = $btns.add(this.$actionButton);
            }
            if (this.$submitButton) {
                $btns = $btns.add(this.$submitButton);
            }
            return $btns.length ? $btns : null;
        }
    }
});

function assignmentError (selector, behaviour) {
    return `Could not find '${selector}' to assign "${behaviour}" behaviour.
Either add this element, OR disable buttons() in initialization settings and manually assign() a button to the "${behaviour}" behaviour.`;
}
