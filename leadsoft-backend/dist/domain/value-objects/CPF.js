"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CPF = void 0;
const cpfValidator_1 = require("../../utils/cpfValidator");
class CPF {
    constructor(value) {
        const cleanedValue = value.replace(/\D/g, '');
        if (!(0, cpfValidator_1.validateCPF)(cleanedValue)) {
            throw new Error('CPF inválido');
        }
        this.value = cleanedValue;
    }
    getValue() {
        return this.value;
    }
}
exports.CPF = CPF;
