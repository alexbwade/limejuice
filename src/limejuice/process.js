import Form from "./core";

const __ = window.Method;


const defaultProcessActions = {
    preventDups () {
        return this.preventDups(); // set dups cookie
    },
    saveOrder () {
        return this.saveOrder(); // sets the fitera_previous_order_id cookie
    },
    alertDone () {
        __.log.success("The form processed successfully.");
        return true;
    },
    tracking () {
        return this.GAsale() && this.VWOsale();
    },
    redirect () {
        __.wait("1 sec").then(() => window.location.assign(this.config.nextPage)); // gives a bit of time for tracking code
        return true;
    }
};

Form.prototype.defineProcessActions = function () {
    this.defineInternalProperty("processActions", defaultProcessActions);
};

Form.prototype.process = function () {

    const fns = this.config.process;

    for (let i = 0; i < fns.length; i++) {
        const fn = fns[i];
        try {
            const process = this.processActions[fn].call(this);
            __.log.info("Attempting: ", fn);
            if (process === false) {
                __.log.error("A process action returned false: ", fn);
                return false;
            }
        } catch (e) {
            __.log.error("Process actions failed at: ", fn, " with error: ", e);
            return false;
        }
    }

    return this;
};
