import Form from "./core";

const [ $, __ ] = [ window.jQuery, window.Method ];


Form.prototype.initKount = function () {
    const { kountSessionId, campaignId } = this.config;

    if (!kountSessionId || !campaignId) {
        __.log.warning(`Invalid Kount info: ${kountSessionId} (Kount session ID), ${campaignId} (campaign ID.)`);
        return true;
    }

    this.add("sessionId", kountSessionId);

    const html = createKountPixel(kountSessionId, campaignId);
    $(this.form).append(html);

    return true;
};

function createKountPixel (kountSessionId, campaignId) {
    return `
     <iframe style="display: none;" width="1" height="1" frameborder="0" scrolling="no" src="https://gofitera.limelightcrm.com/pixel.php?t=htm&campaign_id=${campaignId}&sessionId=${kountSessionId}"></iframe>
     <img style="display: none;" width="1" height="1" src="https://gofitera.limelightcrm.com/pixel.php?t=gif&campaign_id=${campaignId}&sessionId=${kountSessionId}" />`;
}
