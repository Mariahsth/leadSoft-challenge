import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../infrastructure/services/JwtService";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não enviado" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = JwtService.verifyToken(token);
    (req as any).user = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}
