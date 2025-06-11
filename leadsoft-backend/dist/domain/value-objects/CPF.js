"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CPF = void 0;
const cpfValidator_1 = require("../../utils/cpfValidator");
class CPF {
    constructor(value) {
        if (!(0, cpfValidator_1.validateCPF)(value)) {
            throw new Error('CPF inválido');
        }
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
exports.CPF = CPF;
