"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const JwtService_1 = require("../../infrastructure/services/JwtService");
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token não enviado" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = JwtService_1.JwtService.verifyToken(token);
        req.user = payload;
        next();
    }
    catch {
        return res.status(401).json({ message: "Token inválido ou expirado" });
    }
}
