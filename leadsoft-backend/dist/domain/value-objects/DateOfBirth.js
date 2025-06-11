"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateOfBirth = void 0;
const dateValidator_1 = require("../../utils/dateValidator");
class DateOfBirth {
    constructor(value) {
        if (!(0, dateValidator_1.validateDateOfBirth)(value)) {
            throw new Error('Data de nascimento inválida');
        }
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
exports.DateOfBirth = DateOfBirth;
