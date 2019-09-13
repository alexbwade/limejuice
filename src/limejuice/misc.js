import Form from "./core";

const [ $, __ ] = [ window.jQuery, window.Method ];


Form.prototype.misc = function () {
    this.placeholderSupport(); // mimic placeholders on browsers that don't support "placeholder" attr
    this.completedCheckmarks(); // add checkmarks to "completed" fields
    this.mobileInputFocus(); // force scroll position to currently-focused input (to fix android keyboard bug)

    if (["upfront", "standalone"].includes(this.mode.status)) {
        this.bindEnterAndReturn();
    }
};

Form.prototype.bindEnterAndReturn = function () {
    const form = this;

    $(document).on("keyup", function (e) {
        if (!__(form.get()).isVisible()) {
            return false;
        }
        const pressedEnterOrReturn = typeof e.key === "string" && ["enter", "return"].includes(e.key.toLowerCase());
        if (pressedEnterOrReturn) {
            const focusedElement = window.document.activeElement
                ? $(window.document.activeElement)
                : $(":focused");
            const isWithinForm = focusedElement.length && $(form.get()).find(focusedElement).length;
            if (isWithinForm) {
                if (form.mode.status === "standalone") {
                    form.submit();
                } else {
                    form.action();
                }
            }
        }
    });
};

Form.prototype.placeholderSupport = function () {
    const supported = "placeholder" in document.createElement("input");

    if (!supported) {
        __.log.warning("Placeholders are not supported in this browser.");
        mimicPlaceholders();
    }

    function mimicPlaceholders () {
        const $labels = $(this.fields).filter("input").parent().find("label");
        const $textInputs = $(this.fields).filter("input").not("[type='radio'], [type='checkbox'], [type='hidden']");

        $labels
            .addClass("placeholder-label")
            .removeClass("dn hidden").show().removeAttr("hidden"); // cover all bases in terms of element being hidden

        $textInputs
            .removeAttr("placeholder")
            .on("change keyup", function () {
                if ($(this).val().trim() !== "") {
                    $(this).prev().hide();
                } else {
                    $(this).prev().show();
                }
            });
    }
};

Form.prototype.completedCheckmarks = function () {
    const $textInputs = $(this.fields).filter("input").not("[type='radio'], [type='checkbox'], [type='hidden']");
    const checkmark = `<i class="material-icons input-success-icon" style="display: none;">checkmark</i>`;

    $textInputs.parent().append(checkmark);

    $textInputs.on("change keyup", handleCheckmarks);

    function handleCheckmarks () {
        const inputValue = $(this).val();
        const $inputBox = $(this).parent();
        if (inputValue !== "") {
            $inputBox.children(".cvvhelp").hide();
            $inputBox.children(".input-success-icon").show();
        } else {
            $inputBox.children(".input-success-icon").hide();
            $inputBox.children(".cvvhelp").show();
        }
    }
};

Form.prototype.mobileInputFocus = function () {
    // if (__.deviceType === "mobile") {
    //     $(this.fields).on("focus", function () {
    //         const $focusedElement = $(this);
    //         __.log("resize event: ", $focusedElement);
    //         __.wait(500).then(() => refocus($focusedElement));
    //     });
    //     function refocus ($focusedElement) {
    //         const pos = $focusedElement.position().top + "px";
    //         __.log("pos: ", pos);
    //         $(".modal").scrollTop(pos);
    //     }
    // }
};



// function offsetFrom ($decendant, $ancestor) {
//     let distance = 0;

// }

// $("element1").offsetFrom("element2").


// function goTo ($elem) {
//     $(".modal").animate({
//         // "scrollTop": $("[name='billingFirstName']").offset().top + "px"
//         "scrollTop": $("[name='billingFirstName']").position().top + "px"
//     }, 1);
// }





// goTo: function (elem_offset=0, speed="slow", complete) {
//     if (typeof elem_offset === "function") {
//         complete = elem_offset;
//         elem_offset = 0;
//     } else if (typeof speed === "function") {
//         complete = speed;
//         speed = "slow";
//     } // this allows you to pass in the callback at any point without having to specify the first two parameters
//     if (elem_offset === "center") {
//         const elem_height = this.outerHeight();
//         elem_offset = -((window.innerHeight - elem_height) / 2);
//     }
//     $("html, body").animate({
//         "scrollTop": this.offset().top + elem_offset + "px"
//     }, speed).promise().then(complete);
//     return this;
// },