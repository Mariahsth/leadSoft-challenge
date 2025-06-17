import { Request, Response } from "express";
import { RavenUserRepository } from "../../infrastructure/database/RavenUserRepository";
import { LoginUser } from "../../application/use-cases/LoginUser";
import { GoogleRecaptchaVerifier } from "../../infrastructure/services/GoogleRecaptchaVerifier";

export async function loginController(req: Request, res: Response) {
  const { user, password, recaptchaToken } = req.body;

  if (!user || !password || !recaptchaToken) {
    return res.status(400).json({ field: "user", message: "Dados incompletos" });
  }
  const repo = new RavenUserRepository();
  const secret = process.env.RECAPTCHA_SECRET_KEY!;
  const loginUseCase = new LoginUser(repo, new GoogleRecaptchaVerifier(secret));

  try {
    const token = await loginUseCase.execute(user, password, recaptchaToken);
    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(400).json(error);
  }
}
