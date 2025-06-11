"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name = void 0;
const nameValidator_1 = require("../../utils/nameValidator");
class Name {
    constructor(value) {
        if (!(0, nameValidator_1.validateName)(value)) {
            throw new Error('Nome inválido');
        }
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
exports.Name = Name;
