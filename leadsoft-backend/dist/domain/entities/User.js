"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    constructor(email, passwordHash, id) {
        this.id = id ?? (0, uuid_1.v4)();
        this.email = email;
        this.passwordHash = passwordHash;
    }
}
exports.User = User;
