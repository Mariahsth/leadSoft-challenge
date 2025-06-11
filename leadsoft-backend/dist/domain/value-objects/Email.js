"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const emailValidator_1 = require("../../utils/emailValidator");
class Email {
    constructor(value) {
        if (!(0, emailValidator_1.validateEmail)(value)) {
            throw new Error('E-mail inválido');
        }
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
exports.Email = Email;
