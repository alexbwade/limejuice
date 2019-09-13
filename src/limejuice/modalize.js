import Form  from "./core";
import Modal from "./modal";

const $ = window.jQuery;


const modalHTML = `
<section class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
        </div>
    </div>
</section>
`.trim();

Form.prototype.modalize = function () {
    const $modal = $(modalHTML);

    this.detach();

    $modal.find(".modal-content")
        .append(this.get());

    this.raw = $modal.get(0);

    this.modal = new Modal(this.get());

    this.attach();

    return true;
};

Form.prototype.show = function () {
    return this.modal ? this.modal.show() : false;
};

Form.prototype.hide = function () {
    return this.modal ? this.modal.hide() : false;
};
