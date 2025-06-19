"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Candidate = void 0;
const uuid_1 = require("uuid");
class Candidate {
    constructor(name, email, caption, dateOfBirth, cpf, id) {
        this.id = id ?? `${(0, uuid_1.v4)()}`;
        this.name = name;
        this.email = email;
        this.caption = caption;
        this.dateOfBirth = dateOfBirth;
        this.cpf = cpf;
    }
}
exports.Candidate = Candidate;
