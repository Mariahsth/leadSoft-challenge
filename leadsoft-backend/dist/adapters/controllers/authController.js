"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = loginController;
const RavenUserRepository_1 = require("../../infrastructure/database/RavenUserRepository");
const LoginUser_1 = require("../../application/use-cases/LoginUser");
const GoogleRecaptchaVerifier_1 = require("../../infrastructure/services/GoogleRecaptchaVerifier");
async function loginController(req, res) {
    const { user, password, recaptchaToken } = req.body;
    if (!user || !password || !recaptchaToken) {
        return res.status(400).json({ field: "user", message: "Dados incompletos" });
    }
    const repo = new RavenUserRepository_1.RavenUserRepository();
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const loginUseCase = new LoginUser_1.LoginUser(repo, new GoogleRecaptchaVerifier_1.GoogleRecaptchaVerifier(secret));
    try {
        const token = await loginUseCase.execute(user, password, recaptchaToken);
        return res.status(200).json({ token });
    }
    catch (error) {
        return res.status(400).json(error);
    }
}
