"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCaption = validateCaption;
function validateCaption(caption) {
    return caption.length >= 3 && caption.length <= 300;
}
