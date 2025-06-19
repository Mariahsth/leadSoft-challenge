"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleRecaptchaVerifier = void 0;
const axios_1 = __importDefault(require("axios"));
class GoogleRecaptchaVerifier {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    async verify(token, expectedAction = "submit") {
        try {
            const response = await axios_1.default.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
                params: {
                    secret: this.secretKey,
                    response: token,
                },
            });
            const data = response.data;
            console.log("🔍 Resultado reCAPTCHA:", data);
            const isValid = data.success === true &&
                data.action === expectedAction &&
                data.score >= 0.5;
            if (!isValid) {
                console.warn("❌ Verificação reCAPTCHA inválida:", {
                    success: data.success,
                    action: data.action,
                    score: data.score,
                    errors: data["error-codes"],
                });
            }
            return isValid;
        }
        catch (err) {
            console.error("❌ Erro ao verificar reCAPTCHA:", err);
            return false;
        }
    }
}
exports.GoogleRecaptchaVerifier = GoogleRecaptchaVerifier;
