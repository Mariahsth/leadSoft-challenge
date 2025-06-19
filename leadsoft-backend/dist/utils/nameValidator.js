"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateName = validateName;
function validateName(name) {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿÇçÑñ\s~]+$/u;
    return regex.test(name) && name.length >= 3 && name.length <= 100;
}
