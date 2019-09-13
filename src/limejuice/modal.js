const [ $, __ ] = [ window.jQuery, window.Method ];


const modals = [];

function Modal (modalSelector, underlayId="modal-underlay") {

    __.enforce(
        [modalSelector, underlayId],
        ["string,element", "string"]
    );

    if (typeof modalSelector === "string" && $(modalSelector).length !== 1) {
        __.log.error(`The Modal() selector '${modalSelector}' does not match a unique element. Please provide a unique identifier.`);
    }

    createUnderlay(underlayId); // if not already present, create underlay

    const nickname = (typeof modalSelector === "string") ? ("-" + modalSelector) : "";

    this.id       = String(modals.length + 1) + nickname;
    this.modal    = $(modalSelector).get(0);
    this.underlay = $("#" + underlayId).get(0);

    modals.push(this);
}

Modal.modals = modals;


Modal.prototype.dispatchEvent = function (evt) {
    evt = __.createEvent(evt + "-modal-" + this.id);
    window.dispatchEvent(evt);
};

Modal.prototype.get = function () {
    return this.modal;
};

Modal.prototype.on = function (e, fn) {
    const events = e.split(" ").map(v => v + "-modal-" + this.id).join(" ");
    $(window).on(events, fn);
    return this;
};

Modal.prototype.off = function (e, fn) {
    const events = e.split(" ").map(v => v + "-modal-" + this.id).join(" ");
    $(window).off(events, fn);
    return this;
};

Modal.prototype.addHandlers = function () {
    const $closeBtns = $(this.modal).find(".modal-close, .btn-close-modal");
    const $underlay  = $(this.modal); // due to z-index, underlay handler must be the modal container (excluding children), rather than the actual underlay div
    const that = this;

    $closeBtns.on("click.modalClose", () => that.hide());
    $underlay.on("click.modalClose", function (e) {
        if (e.target === this) that.hide();
    });
    $(document).on("keyup.modalClose", (e) => e.keyCode === 27 && that.hide()); // Esc key
};

Modal.prototype.removeHandlers = function () {
    const $closeBtns = $(this.modal).find(".modal-close, .btn-close-modal");
    const $underlay  = $(this.modal); // due to z-index, underlay handler must be the modal container (excluding children), rather than the actual underlay div

    $closeBtns.off("click.modalClose");
    $underlay.off("click.modalClose");
    $(document).off("keyup.modalClose");
};

const $html = $("html");

Modal.active = false; // shared state

Modal.prototype.show = function () {
    if (this.active === true) {
        return false;
    }

    if (Modal.active === true) {
        __.log.warning("Another modal window is already open.");
        return false;
    }

    if (this.hiding === true) {
        __.log.error("Cannot show modal while hiding animation is not complete. Allow 200 ms.");
        return false;
    }

    const $modal    = $(this.modal);
    const $underlay = $(this.underlay);

    // $underlay.fadeIn(100);
    $underlay.show(() => $underlay.addClass("show"));
    $html.addClass("modal-open"); // prevents scrolling
    $modal.show(() => $modal.addClass("show"));

    this.addHandlers();

    this.active  = true;
    Modal.active = true; // set shared state so that no other modals can open

    this.dispatchEvent("show");
    // $("header, main, footer, section, nav").not(".modal").addClass("modal-blur");
    return this;
};

Modal.prototype.hide = function () {
    if (this.active === false) {
        return false; // already hidden
    }

    const $modal    = $(this.modal);
    const $underlay = $(this.underlay);

    // $underlay.fadeOut(200);
    $underlay.removeClass("show");
    $html.removeClass("modal-open");
    $modal.removeClass("show");
    this.hiding = true;
    __.wait(200).then(() => {
        $modal.hide();
        $underlay.hide();
        this.hiding = false;
        this.dispatchEvent("hidden");
    });

    this.removeHandlers();

    this.active  = false;
    Modal.active = false;

    this.dispatchEvent("hide");
    // $("header, main, footer, section, nav").not(".modal").removeClass("modal-blur");
    return this;
};

export default Modal;

function createUnderlay (underlayId) {
    // check for existing underlay, else generate underlay
    if ($("#" + underlayId).length === 0) {
        $("<div></div>")
            .attr("id", underlayId)
            .addClass("modal-backdrop fade")
            .css("display", "none")
            // .css({
            //     "position"        : "fixed",
            //     "top"             : 0,
            //     "bottom"          : 0,
            //     "left"            : 0,
            //     "right"           : 0,
            //     "z-index"         : 1040,
            //     "background-color": "rgba(0, 0, 0, .6)",
            //     "display"         : "none"
            // })
            .appendTo("body");
    }
}
