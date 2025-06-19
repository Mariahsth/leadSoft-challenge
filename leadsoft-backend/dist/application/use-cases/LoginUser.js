"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const JwtService_1 = require("../../infrastructure/services/JwtService");
class LoginUser {
    constructor(userRepository, recaptchaVerifier) {
        this.userRepository = userRepository;
        this.recaptchaVerifier = recaptchaVerifier;
    }
    async execute(user, password, recaptchaToken) {
        const isHuman = await this.recaptchaVerifier.verify(recaptchaToken, "login");
        if (!isHuman) {
            throw { field: "recaptcha", message: "Verificação reCAPTCHA falhou" };
        }
        const existingUser = await this.userRepository.findByEmail(user);
        if (!existingUser) {
            throw { field: "user", message: "Usuário não encontrado" };
        }
        const isMatch = await bcrypt_1.default.compare(password, existingUser.passwordHash);
        if (!isMatch) {
            throw { field: "password", message: "Senha incorreta" };
        }
        return JwtService_1.JwtService.generateToken({ id: existingUser.id, user: existingUser });
    }
}
exports.LoginUser = LoginUser;
