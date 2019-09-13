import core from "./core";
import "./autocomplete";
import "./autofill";
import "./autoformat";
import "./buttons";
import "./captcha";
import "./country-select";
import "./cvvbox";
import "./debugging"; // less-common methods / useful debugging tools
import "./events";
import "./helpers"; // common-use methods for API
import "./init"; // initialization process
import "./kount"; // "Kount" antifraud
import "./misc";
import "./modalize";
import "./mode";
import "./prevent-dups";
import "./process"; // post-processing of submitted data
import "./properties"; // raw, form, fields, modal, valid, etc.
import "./proxies"; // for use in "hooking up" external inputs to form api
import "./submit"; // submission process
import "./tracking"; // tracking code for "sale" events
import "./validate"; // validation config and methods

const LimeJuice = core;

LimeJuice.version = "1.0.0";
LimeJuice.author  = "Alex Wade";

window.LimeJuice = LimeJuice;

export default LimeJuice;
