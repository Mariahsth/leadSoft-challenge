"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Caption = void 0;
const captionValidator_1 = require("../../utils/captionValidator");
class Caption {
    constructor(value) {
        if (!(0, captionValidator_1.validateCaption)(value)) {
            throw new Error('Legenda inválida');
        }
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
exports.Caption = Caption;
